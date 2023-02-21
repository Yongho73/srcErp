package kr.co.dbvision.api.mhs.hrm.mhshrm004.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm004.entity.Mhshrm004;
import kr.co.dbvision.api.mhs.hrm.mhshrm004.service.Mhshrm004Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm004.service.mapper.Mhshrm004Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 직급코드관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.26
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.26)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.26          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm004Service")
@Transactional
public class Mhshrm004ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm004Service {

    Logger logger = LogManager.getLogger(Mhshrm004ServiceImpl.class);

    @Resource(name="Mhshrm004Mapper")
    private Mhshrm004Mapper mhshrm004Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm004ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm004(EgovMapForNull paramMap) {
        try {

            Mhshrm004 entity = new Mhshrm004(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm004Mapper.selectMhshrm004List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm004ForExcel(EgovMapForNull paramMap) {

        return mhshrm004Mapper.selectMhshrm004List(paramMap);
    }

    @Override
    public JSONObject findMhshrm004(EgovMapForNull paramMap) {
        try {

            Mhshrm004 entity = new Mhshrm004(mhshrm004Mapper.selectMhshrm004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm004(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm004 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm004(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrm004Mapper.deleteMhshrm004(entity);
                    break;

                default:

                    mhshrm004Mapper.saveMhshrm004(entity);
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
    

    /* 사용여부 확인 */
    @Override
    public JSONObject useCheckMhshrm004(EgovMapForNull paramMap) {
        try {

            Mhshrm004 entity = new Mhshrm004(mhshrm004Mapper.useCheckMhshrm004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    

    
    //직급코드 콤보 목록을 조회한다.
    @Override
    public JSONObject searchMhshrb004ClsfCodeCombo(EgovMapForNull paramMap) {
        try {

            Mhshrm004 entity = new Mhshrm004(paramMap);
            List<EgovMapForNull> list = mhshrm004Mapper.selectMhshrb004ClsfCodeCombo(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
