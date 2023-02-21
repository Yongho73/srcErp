package kr.co.dbvision.api.mps.cal.mpscal017.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.cal.mpscal017.entity.Mpscal017;
import kr.co.dbvision.api.mps.cal.mpscal017.service.Mpscal017Service;
import kr.co.dbvision.api.mps.cal.mpscal017.service.mapper.Mpscal017Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여마감관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */
@Service("Mpscal017Service")
@Transactional
public class Mpscal017ServiceImpl extends EgovAbstractServiceImpl implements Mpscal017Service {

    Logger logger = LogManager.getLogger(Mpscal017ServiceImpl.class);

    @Resource(name="Mpscal017Mapper")
    private Mpscal017Mapper mpscal017Mapper;

    public Mpscal017ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal017(EgovMapForNull paramMap) {
        try {

            Mpscal017 entity = new Mpscal017(paramMap);
            List<EgovMapForNull> list = mpscal017Mapper.selectMpscal017List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMpscal017ForExcel(EgovMapForNull paramMap) {

        return mpscal017Mapper.selectMpscal017List(paramMap);
    }

    @Override
    public JSONObject findMpscal017(EgovMapForNull paramMap) {
        try {

            Mpscal017 entity = new Mpscal017(mpscal017Mapper.selectMpscal017(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal017(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpscal017 entity = null;
            
            ///mpsbsc006Mapper.getPymntSnMpsbsc006()
            
            for(String ids : idsArr) {
                entity = new Mpscal017(paramMap, ids, "2");
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted": 
                    break;
                    
                case "updated":
                    if(entity.getPymntSn().equals("")) {
                        String  pymntSn = mpscal017Mapper.getPymntSnMpscal017(entity);
                        entity.setPymntSn(pymntSn);
                    }
                    mpscal017Mapper.saveMpscal017(entity);
                    break;
                    
                default:
                    break;
                }               
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
          
        } 
    }

    @Override
    public JSONObject searchComboYeayMpscal017(EgovMapForNull paramMap) {
        try {
            return new JsonMsgMng().makeJsonObject(mpscal017Mapper.selectComboYearMpscal017List(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();        
        }
    }
    @Override
    public JSONObject searchMpscal017MonthList(EgovMapForNull paramMap) {
        try {

            Mpscal017 entity = new Mpscal017(paramMap);
            List<EgovMapForNull> list = mpscal017Mapper.selectMpscal017MonthList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}