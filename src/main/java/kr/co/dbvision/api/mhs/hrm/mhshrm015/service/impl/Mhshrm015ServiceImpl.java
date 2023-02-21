package kr.co.dbvision.api.mhs.hrm.mhshrm015.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm015.entity.Mhshrm015;
import kr.co.dbvision.api.mhs.hrm.mhshrm015.service.Mhshrm015Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm015.service.mapper.Mhshrm015Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 직위관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm015Service")
@Transactional
public class Mhshrm015ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm015Service {

    Logger logger = LogManager.getLogger(Mhshrm015ServiceImpl.class);

    @Resource(name="Mhshrm015Mapper")
    private Mhshrm015Mapper mhshrm015Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm015ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm015(EgovMapForNull paramMap) {
        try {

            Mhshrm015 entity = new Mhshrm015(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm015Mapper.selectMhshrm015List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm015ForExcel(EgovMapForNull paramMap) {

        return mhshrm015Mapper.searchMhshrm015ForExcel(paramMap);
    }

    @Override
    public JSONObject findMhshrm015(EgovMapForNull paramMap) {
        try {

            Mhshrm015 entity = new Mhshrm015(mhshrm015Mapper.selectMhshrm015(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm015(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm015 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm015(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrm015Mapper.deleteMhshrm015(entity);
                    break;

                default:

                    mhshrm015Mapper.saveMhshrm015(entity);
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
    
    //직급코드 콤보 목록을 조회한다.
    @Override
    public JSONObject selectMhshrm015OfcpsCodeCombo(EgovMapForNull paramMap) {
        try {

            Mhshrm015 entity = new Mhshrm015(paramMap);
            List<EgovMapForNull> list = mhshrm015Mapper.selectMhshrm015OfcpsCodeCombo(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    //직급코드 사용여부를 조회한다.
    @Override
    public JSONObject checkDeleteMhshrm015(EgovMapForNull paramMap) {
        try {

            Mhshrm015 entity = new Mhshrm015(mhshrm015Mapper.checkDeleteMhshrm015(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

}
