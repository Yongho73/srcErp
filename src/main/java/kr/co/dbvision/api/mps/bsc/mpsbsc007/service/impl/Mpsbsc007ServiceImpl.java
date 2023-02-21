package kr.co.dbvision.api.mps.bsc.mpsbsc007.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc007.entity.Mpsbsc007;
import kr.co.dbvision.api.mps.bsc.mpsbsc007.service.Mpsbsc007Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc007.service.mapper.Mpsbsc007Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 호봉테이블등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.09                   디비비전             최초 생성
 *     2020.06.23                   gho
 * </pre>
 */
@Service("Mpsbsc007Service")
@Transactional
public class Mpsbsc007ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc007Service {

    Logger logger = LogManager.getLogger(Mpsbsc007ServiceImpl.class);

    @Resource(name="Mpsbsc007Mapper")
    private Mpsbsc007Mapper mpsbsc007Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsbsc007ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsbsc007Master(EgovMapForNull paramMap) {
        try {

            Mpsbsc007 entity = new Mpsbsc007(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc007Mapper.selectMpsbsc007MasterList(paramMap).stream().map(mapper -> {
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
    public JSONObject findMpsbsc007Master(EgovMapForNull paramMap) {
        try {

            Mpsbsc007 entity = new Mpsbsc007(mpsbsc007Mapper.selectMpsbsc007Master(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveMpsbsc007Master(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc007 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsbsc007(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
//                    mpsbsc007Mapper.deleteMpsbsc007Master(entity);
                    break;
                case "inserted":
                    mpsbsc007Mapper.saveMpsbsc007Master(entity);
                    mpsbsc007Mapper.saveMpsbsc007Detail(entity);
                    
                    break;
                default:
                    mpsbsc007Mapper.saveMpsbsc007Master(entity);
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
    
    /**
    *
    *항목적용유형 삭제
    */
   @Override
   public JSONObject removeMpsbsc007Master(EgovMapForNull paramMap) {

       try {

           Mpsbsc007 entity = new Mpsbsc007(); 
           entity.setApplcYm((String)paramMap.get("applcYm")); 

           mpsbsc007Mapper.deleteMpsbsc007All(entity);
           mpsbsc007Mapper.deleteMpsbsc007Master(entity);
           
           return new JsonMsgMng().makeJsonObject(paramMap);

       } catch (Exception e) {
           return new Exceptions(new Throwable(), e).getResultStatus();
       }
   }
    
    
    
    @Override
    public JSONObject copyMpsbsc007(EgovMapForNull paramMap) {
        try {
            
            Mpsbsc007 entity = new Mpsbsc007(paramMap);

            mpsbsc007Mapper.copyMpsbsc007(entity);
                    
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    
    
    @Override
    public JSONObject searchMpsbsc007(EgovMapForNull paramMap) {
        try {

            Mpsbsc007 entity = new Mpsbsc007(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc007Mapper.selectMpsbsc007List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsbsc007ForExcel(EgovMapForNull paramMap) {

        return mpsbsc007Mapper.selectMpsbsc007List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc007(EgovMapForNull paramMap) {
        try {

            Mpsbsc007 entity = new Mpsbsc007(mpsbsc007Mapper.selectMpsbsc007(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsbsc007(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            
            Mpsbsc007 entity = new Mpsbsc007() ;

            
            String paramName = "";
            String sApplyYm = "";
            String sSrclscode = "";
            String sClsfCode = "";
            String sRegId = paramMap.get("regId").toString();
            for(int i = 0; i < paramMap.size();i++) {
                //System.out.println("paramMap" + paramMap.get(i).toString());
                //System.out.println("paramMap val" + paramMap.getValue(i).toString());
                paramName = paramMap.get(i).toString();
                if(paramName.toLowerCase().toString().indexOf("applcym") >0) {
                    sApplyYm = paramMap.getValue(i).toString();
                }
                if(paramName.toLowerCase().toString().indexOf("srclscode") >0) {
                    sSrclscode = paramMap.getValue(i).toString();
                }
                //저장
                if(paramName.toLowerCase().toString().indexOf("'") >0) {
                   // System.out.println("this>>>" + paramName.substring(paramName.toLowerCase().toString().indexOf("'")+1, paramName.length()-1));
                    sClsfCode =  paramName.substring(paramName.toLowerCase().toString().indexOf("'")+1, paramName.length()-1);
                  
                    entity.setApplcYm(sApplyYm);
                    entity.setSrclsCode(sSrclscode);
                    entity.setClsfCode(sClsfCode);                    
                    entity.setAmt(paramMap.getValue(i).toString());
                    entity.setRegId(sRegId);
                    entity.setUptId(sRegId);
                    mpsbsc007Mapper.saveMpsbsc007(entity);                                        
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
    public JSONObject selectMpsbsc007ClsfCode(EgovMapForNull paramMap) {
        try {

            Mpsbsc007 entity = new Mpsbsc007(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc007Mapper.selectMpsbsc007ClsfCodeList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());
            
            JSONObject resultList = new JSONObject();
            resultList.put("data", list ) ;
            resultList.put("code", "000");
            resultList.put("message", "SUCCESS");

            return resultList;

        } catch (Exception e) {
            throw e;
        }
    }
}
