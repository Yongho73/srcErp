package kr.co.dbvision.api.mhs.hrd.mhshrd006.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrd.mhshrd006.entity.Mhshrd006;
import kr.co.dbvision.api.mhs.hrd.mhshrd006.service.Mhshrd006Service;
import kr.co.dbvision.api.mhs.hrd.mhshrd006.service.mapper.Mhshrd006Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 휴직신청관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.31          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrd006Service")
@Transactional
public class Mhshrd006ServiceImpl extends EgovAbstractServiceImpl implements Mhshrd006Service {

    Logger logger = LogManager.getLogger(Mhshrd006ServiceImpl.class);

    @Resource(name="Mhshrd006Mapper")
    private Mhshrd006Mapper pubwks004Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrd006ServiceImpl() {
        //
    }
    
    @Override
    public JSONObject userInformationMhshrd006(EgovMapForNull paramMap) {
        try {

            Mhshrd006 entity = new Mhshrd006(pubwks004Mapper.userInformationMhshrd006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMhshrd006(EgovMapForNull paramMap) {
        try {

            Mhshrd006 entity = new Mhshrd006(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwks004Mapper.selectMhshrd006List(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMhshrd006ForExcel(EgovMapForNull paramMap) {

        return pubwks004Mapper.searchMhshrd006ForExcel(paramMap);
    }

    @Override
    public JSONObject findMhshrd006(EgovMapForNull paramMap) {
        try {

            Mhshrd006 entity = new Mhshrd006(pubwks004Mapper.selectMhshrd006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrd006(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrd006 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrd006(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pubwks004Mapper.deleteMhshrd006(entity);
                    break;

                default:

                    pubwks004Mapper.saveMhshrd006(entity);
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveCopyMhshrd006(EgovMapForNull paramMap) {
        try {
        EgovMapForNull returnMap = new EgovMapForNull();
        
        int cnt = pubwks004Mapper.selectElctsctSeSnCnt(paramMap);
        if(cnt >= 1) {
            returnMap.put("code", "999");
            returnMap.put("message", "FAIL");
        }
        else {
            pubwks004Mapper.saveCopyMhshrd006(paramMap);
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
        }
        
        return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
