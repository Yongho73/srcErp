package kr.co.dbvision.api.mps.bsc.mpsbsc006.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.math3.analysis.function.Add;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc006.entity.Mpsbsc006;
import kr.co.dbvision.api.mps.bsc.mpsbsc006.service.Mpsbsc006Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc006.service.mapper.Mpsbsc006Mapper;
import kr.co.dbvision.api.mps.cal.mpscal013.entity.Mpscal013;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여지급일자등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc006Service")
@Transactional
public class Mpsbsc006ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc006Service {

    Logger logger = LogManager.getLogger(Mpsbsc006ServiceImpl.class);

    @Resource(name="Mpsbsc006Mapper")
    private Mpsbsc006Mapper mpsbsc006Mapper;

    public Mpsbsc006ServiceImpl() {
        //
    }
    
    @Override
    public JSONObject searchComboYeayMpsbsc006(EgovMapForNull paramMap) {
        try {
            return new JsonMsgMng().makeJsonObject(mpsbsc006Mapper.selectComboYearMpsbsc006List(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();        
        }
    }
    
    

    @Override
    public JSONObject searchMpsbsc006MonthList(EgovMapForNull paramMap) {
        try {

            Mpsbsc006 entity = new Mpsbsc006(paramMap);
            List<EgovMapForNull> list = mpsbsc006Mapper.selectMpsbsc006MonthList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }    
    
    @Override
    public JSONObject searchMpsbsc006(EgovMapForNull paramMap) {
        try {

            Mpsbsc006 entity = new Mpsbsc006(paramMap);
            List<EgovMapForNull> list = mpsbsc006Mapper.selectMpsbsc006List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject searchItemListMpsbsc006(EgovMapForNull paramMap) {
        try {

            Mpsbsc006 entity = new Mpsbsc006(paramMap);
            List<EgovMapForNull> list = mpsbsc006Mapper.selectItemListMpsbsc006(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }    

    
    @Override
    public JSONObject searchNewItemListMpsbsc006(EgovMapForNull paramMap) {
        try {

            Mpsbsc006 entity = new Mpsbsc006(paramMap);
            List<EgovMapForNull> list = mpsbsc006Mapper.selectNewItemListMpsbsc006(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }  
    
    @Override
    public List<EgovMapForNull> searchMpsbsc006ForExcel(EgovMapForNull paramMap) {

        return mpsbsc006Mapper.selectMpsbsc006List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc006(EgovMapForNull paramMap) {
        try {

            Mpsbsc006 entity = new Mpsbsc006(mpsbsc006Mapper.selectMpsbsc006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMpsbsc006(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc006 entity = null;
            
            ///mpsbsc006Mapper.getPymntSnMpsbsc006()
            
            for(String ids : idsArr) {
                entity = new Mpsbsc006(paramMap, ids, "2");
                logger.debug("Mpsbsc006::"+entity.toString());
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted": 
                    break;
                default:
                    
                    if(entity.getPymntSn().equals("")) {
                        String  pymntSn = mpsbsc006Mapper.getPymntSnMpsbsc006(entity);
                        logger.debug("dddddddddddddd:"+pymntSn);
                        entity.setPymntSn(pymntSn);
                        paramMap.put("pymntSn", pymntSn);
                        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+entity.getPymntSn());
                        //mpsbsc006Mapper.saveMpsbsc006(entity);
                    }
                    
                    mpsbsc006Mapper.saveMpsbsc006(entity);
                    
                    break;
                }               
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
          
        }           
        
    }

    /**
     *급여항목저장 
     */
    @Override
    public JSONObject saveSalaryItemMpsbsc006(EgovMapForNull paramMap) {

        try {
            
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            
            Mpsbsc006 entity = new Mpsbsc006();
            
            for(String ids : idsArr) {
  
                entity = new Mpsbsc006(paramMap, ids, "3");
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted": 
                    mpsbsc006Mapper.deleteSalaryItemMpsbsc006(entity);
                    break;
                    
                case "updated":
                    String strcheckChk = entity.getChk(); // 체크 1번 을 가져온다.
                    String strcheckCh2 = entity.getCh2(); // 체크 2번을 가져온다.
                    int intcheckCh2 = Integer.parseInt(strcheckCh2); // 숫자형으로 변환
                    int intcheckChk = Integer.parseInt(strcheckChk); // 숫자형으로 변환
                    
                    // 만약 첫번째 체크된 값이 1 이고 두번째 체크된 값이 1 이라면 두개다 update
                    if ((intcheckCh2 == 1) && (intcheckChk == 1)) {
                        mpsbsc006Mapper.saveSalaryItemMpsbsc006(entity);
                        mpsbsc006Mapper.saveSalaryItem2Mpsbsc006(entity);
                    } else if ((intcheckCh2 == 1) && (intcheckChk == 0)) {
                        // 만약 첫번째 체크된 값이 0 이고 두번재 체크된 값이 1 이라면 첫번째는 delete and 두번째는 update 유지
                        mpsbsc006Mapper.saveSalaryItem2Mpsbsc006(entity);
                        mpsbsc006Mapper.deleteSalaryItemMpsbsc006(entity);
                    } else if ((intcheckCh2 == 0) && (intcheckChk == 1)) {
                        // 만약 첫번째 체크된 값이 1 이고 두번재 체크된 값이 0 이라면 두번째는 delete and 첫번째는 update 유지
                        mpsbsc006Mapper.saveSalaryItemMpsbsc006(entity);
                        mpsbsc006Mapper.deleteSalaryItem2Mpsbsc006(entity);
                    } else if ((intcheckCh2 == 0) && (intcheckChk == 0)) {
                        // 만약 첫번째 체크된 값이 0 이고 두번재 체크된 값이 0 이라면 첫번재 , 두번째 모두 delete
                        mpsbsc006Mapper.deleteSalaryItemMpsbsc006(entity);
                        mpsbsc006Mapper.deleteSalaryItem2Mpsbsc006(entity);
                    }
                    break;
                    
                case "inserted":
                    mpsbsc006Mapper.saveSalaryItemMpsbsc006(entity);
                    break;
                default: 
                   break;
                }               
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }        
        
    }
    
    @Override
    public JSONObject removeMpsbsc006(EgovMapForNull paramMap) {

        try {

            String applcYm = StringExpression.nullConvert(paramMap.get("applcYm"));
//            String[] applcYmArr = applcYms.split("\\,");
            String pymntSn = StringExpression.nullConvert(paramMap.get("pymntSn"));
//            String[] pymntSnArr = pymntSns.split("\\,");

//            int arrLength = (pymntSnArr == null) ? 0 : pymntSnArr.length;
            EgovMapForNull mapper = null;

//            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("applcYm", applcYm);
                mapper.put("pymntSn", pymntSn);

                mpsbsc006Mapper.deleteMpsbsc006(mapper);
//            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removeSalaryItemMpsbsc006(EgovMapForNull paramMap) {

        try {

            String applcYm = StringExpression.nullConvert(paramMap.get("applcYm"));
            String pymntSn = StringExpression.nullConvert(paramMap.get("pymntSn"));
            String salarytyCode = StringExpression.nullConvert(paramMap.get("salarytyCode"));
            String salaryitemCode = StringExpression.nullConvert(paramMap.get("salaryitemCode"));

            EgovMapForNull mapper = null;

            mapper = new EgovMapForNull();
            mapper.put("applcYm", applcYm);
            mapper.put("pymntSn", pymntSn);
            mapper.put("salarytyCode", salarytyCode);
            mapper.put("salaryitemCode", salaryitemCode);

            //mpsbsc006Mapper.deleteSalaryItemMpsbsc006(mapper);

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject selectMpsbscItemList(EgovMapForNull paramMap) {
        try {

            Mpsbsc006 entity = new Mpsbsc006(paramMap);
            List<EgovMapForNull> list = mpsbsc006Mapper.selectMpsbscItemList(paramMap);
            //List<EgovMapForNull> list2 = mpsbsc006Mapper.selectMpsbscItemList2(paramMap);
            entity.setRecords(list);
            //entity.setRecords(list2);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject saveCopyApplcYy(EgovMapForNull paramMap) {
        try {
            
            Mpsbsc006 entity = null;
            Mpscal013 en_tity = null;
            entity = new Mpsbsc006(paramMap);
            en_tity = new Mpscal013(paramMap);
            System.out.println("@@@@@@@@@@@@@@@@@@@@@"+en_tity);
            logger.debug("Mpsbsc006::"+entity.toString());
            
            //기존 데이터가 있으면 삭제후 저장 
            mpsbsc006Mapper.deleteApplcYyYear(entity);
            mpsbsc006Mapper.insertCopyApplcYy(entity);
            
            //기존 데이터가 있으면 삭제후 저장 
            mpsbsc006Mapper.deleteApplcTrgter(en_tity);
            mpsbsc006Mapper.insertCopyTrgter(en_tity);
            
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject searchMpsbsc006closAtList(EgovMapForNull paramMap) {
        try {

            Mpsbsc006 entity = new Mpsbsc006(paramMap);
            List<EgovMapForNull> list = mpsbsc006Mapper.selectMpsbsc006closAtList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
