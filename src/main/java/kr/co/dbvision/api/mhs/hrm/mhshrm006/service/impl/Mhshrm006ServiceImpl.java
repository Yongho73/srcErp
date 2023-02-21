package kr.co.dbvision.api.mhs.hrm.mhshrm006.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm006.entity.Mhshrm006;
import kr.co.dbvision.api.mhs.hrm.mhshrm006.service.Mhshrm006Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm006.service.mapper.Mhshrm006Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 가족코드관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm006Service")
@Transactional
public class Mhshrm006ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm006Service {

    Logger logger = LogManager.getLogger(Mhshrm006ServiceImpl.class);

    @Resource(name="Mhshrm006Mapper")
    private Mhshrm006Mapper mhshrm006Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm006ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm006(EgovMapForNull paramMap) {
        try {

            Mhshrm006 entity = new Mhshrm006(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm006Mapper.selectMhshrm006List(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

	//가족코드 콤보 목록을 조회한다.
    @Override
    public JSONObject searchMhshrm006Code(EgovMapForNull paramMap) {
        try {

            Mhshrm006 entity = new Mhshrm006(paramMap);
            List<EgovMapForNull> list = mhshrm006Mapper.selectMhshrb006CodeCombo(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public List<EgovMapForNull> searchMhshrm006ForExcel(EgovMapForNull paramMap) {

        return mhshrm006Mapper.selectMhshrm006List(paramMap);
    }

    @Override
    public JSONObject findMhshrm006(EgovMapForNull paramMap) {
        try {

            Mhshrm006 entity = new Mhshrm006(mhshrm006Mapper.selectMhshrm006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm006(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm006 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm006(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrm006Mapper.deleteMhshrm006(entity);
                    break;

                default:

                    mhshrm006Mapper.saveMhshrm006(entity);
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
    public JSONObject useCheckMhshrm006(EgovMapForNull paramMap) {
        try {

            Mhshrm006 entity = new Mhshrm006(mhshrm006Mapper.useCheckMhshrm006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
}
