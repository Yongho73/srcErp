package kr.co.dbvision.api.mps.cal.mpscal013.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.co.dbvision.api.mps.cal.mpscal013.entity.Mpscal013;
import kr.co.dbvision.api.mps.cal.mpscal013.service.Mpscal013Service;
import kr.co.dbvision.api.mps.cal.mpscal013.service.mapper.Mpscal013Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 급여대상자생성관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.17          디비비전              최초 생성
 * </pre>
 */
@Service("Mpscal013Service")
@Transactional
public class Mpscal013ServiceImpl extends EgovAbstractServiceImpl implements Mpscal013Service {

    Logger logger = LogManager.getLogger(Mpscal013ServiceImpl.class);

    @Resource(name="Mpscal013Mapper")
    private Mpscal013Mapper mpscal013Mapper;

    public Mpscal013ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal013(EgovMapForNull paramMap) {
        try {

            Mpscal013 entity = new Mpscal013(paramMap);
            
            List<EgovMapForNull> list = mpscal013Mapper.selectMpscal013List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMpscal013ForExcel(EgovMapForNull paramMap) {

        return mpscal013Mapper.selectMpscal013List(paramMap);
    }

    @Override
    public JSONObject findMpscal013(EgovMapForNull paramMap) {
        try {

            Mpscal013 entity = new Mpscal013(mpscal013Mapper.selectMpscal013(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal013(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
//            String[] empnoArr = StringExpression.nullConvert(paramMap.get("empnos")).split("\\,");
//            String[] applcYmArr = StringExpression.nullConvert(paramMap.get("applcYms")).split("\\,");
//            String[] pymntSnArr = StringExpression.nullConvert(paramMap.get("pymntSns")).split("\\,");
            
            Mpscal013 entity = null;
            
            
            for(String ids : idsArr) {
                entity = new Mpscal013(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    
                    mpscal013Mapper.deletepymnt(entity);
                    mpscal013Mapper.deleteMpscal013(entity);
                    break;

                default:

                    mpscal013Mapper.saveMpscal013(entity);
                    break;
                }
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMpscalEmp(EgovMapForNull paramMap) {
        try {
            Mpscal013 entity = new Mpscal013(paramMap);
            List<EgovMapForNull> list = mpscal013Mapper.selectMpscalEmpList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchAcnutMpscal013(EgovMapForNull paramMap) {
        try {

            Mpscal013 entity = new Mpscal013(paramMap);
            List<EgovMapForNull> list = mpscal013Mapper.selectAcnutMpscal013(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
}
