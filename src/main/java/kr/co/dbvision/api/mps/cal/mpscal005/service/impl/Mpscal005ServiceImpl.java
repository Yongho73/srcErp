package kr.co.dbvision.api.mps.cal.mpscal005.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.cal.mpscal005.entity.Mpscal005;
import kr.co.dbvision.api.mps.cal.mpscal005.service.Mpscal005Service;
import kr.co.dbvision.api.mps.cal.mpscal005.service.mapper.Mpscal005Mapper;
import kr.co.dbvision.api.mps.cal.mpscal013.entity.Mpscal013;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여계산/조정관리에 관한 서비스 구현 클래스
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
@Service("Mpscal005Service")
@Transactional
public class Mpscal005ServiceImpl extends EgovAbstractServiceImpl implements Mpscal005Service {

    Logger logger = LogManager.getLogger(Mpscal005ServiceImpl.class);

    @Resource(name="Mpscal005Mapper")
    private Mpscal005Mapper mpscal005Mapper;
    
//    @Resource(name="Egov")
//    private EgovAbstractServiceImpl EgovAbstractServiceImpl;

    private int listRowNumber = 0; // 넘버링 

    public Mpscal005ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal005(EgovMapForNull paramMap) {
        try {

            Mpscal005 entity = new Mpscal005(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal005Mapper.selectMpscal005List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpscal005ForExcel(EgovMapForNull paramMap) {

        return mpscal005Mapper.selectMpscal005List(paramMap);
    }

    @Override
    public JSONObject findMpscal005(EgovMapForNull paramMap) {
        try {

            Mpscal005 entity = new Mpscal005(mpscal005Mapper.selectMpscal005(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal005(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpscal005 entity = null;

            for(String ids : idsArr) {

                entity = new Mpscal005(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscal005Mapper.deleteMpscal005(entity);
                    break;
                
                case "updated":
                    
                    mpscal005Mapper.saveMpscal005(entity);
                    mpscal005Mapper.saveMpscalItem(entity);
                
                default:

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
    public JSONObject searchMpscalEmp(EgovMapForNull paramMap) {
        try {
            Mpscal005 entity = new Mpscal005(paramMap);
            List<EgovMapForNull> list = mpscal005Mapper.selectMpscalEmpList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMpscal005Item(EgovMapForNull paramMap) {
        
        try {
            Mpscal005 entity = new Mpscal005(paramMap);
            List<EgovMapForNull> list = mpscal005Mapper.selectMpscal005ItemList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMpscalSUM(EgovMapForNull paramMap) {
        try {
            Mpscal005 entity = new Mpscal005(paramMap);
            List<EgovMapForNull> list = mpscal005Mapper.selectMpscalSUM(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMpscal005SUM(EgovMapForNull paramMap) {
        try {
            Mpscal013 entity = new Mpscal013(paramMap);
            List<EgovMapForNull> list = mpscal005Mapper.selectMpscal005SUM(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveMpscalItem(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpscal005 entity = null;

            for(String ids : idsArr) {

                entity = new Mpscal005(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscal005Mapper.deleteMpscal005(entity);
                    break;
                    
                case "updated":
                    
                    mpscal005Mapper.saveMpscalItem(entity);
                default:
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
    public JSONObject MPS_PYMNTDE(EgovMapForNull paramMap, List<String> empnos) {
        String Code = "";
        String returnStr = "";
        try {
//            String[] empnoArr = StringExpression.nullConvert(paramMap.get("empnos")).split("\\,");
            
            Mpscal005 entity = new Mpscal005(paramMap);
            List<EgovMapForNull> list = new ArrayList<EgovMapForNull>();
            for(String empno : empnos) {
                
                paramMap.put("empno", empno);
                EgovMapForNull result = mpscal005Mapper.MPS_PYMNTDE(paramMap);
                Code = paramMap.get("asReturnCode").toString();
                returnStr = paramMap.get("asReturnString").toString();
                list.add(result);
            }
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", Code);
            returnMap.put("message", returnStr);
            
            //entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(returnMap);
            //return new JSONObject();

        } catch (Exception e) {
            throw e;
        }
    }
    
}