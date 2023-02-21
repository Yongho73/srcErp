package kr.co.dbvision.api.mps.bsc.mpsbsc003.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc003.entity.Mpsbsc003;
import kr.co.dbvision.api.mps.bsc.mpsbsc003.service.Mpsbsc003Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc003.service.mapper.Mpsbsc003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 월급여항목적용등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.03.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.03          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc003Service")
@Transactional
public class Mpsbsc003ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc003Service {

    Logger logger = LogManager.getLogger(Mpsbsc003ServiceImpl.class);

    @Resource(name="Mpsbsc003Mapper")
    private Mpsbsc003Mapper mpsbsc003Mapper;

    public Mpsbsc003ServiceImpl() {
        //
    }

    public JSONObject searchComboYeayMpsbsc003(EgovMapForNull paramMap) {

		try {
            return new JsonMsgMng().makeJsonObject(mpsbsc003Mapper.selectComboYearMpsbsc003List(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();    	
        }
    }    
    
    @Override
    public JSONObject searchMpsbsc003(EgovMapForNull paramMap) {
        try {

            Mpsbsc003 entity = new Mpsbsc003(paramMap);
            List<EgovMapForNull> list = mpsbsc003Mapper.selectMpsbsc003List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMpsbsc003ForExcel(EgovMapForNull paramMap) {

        return mpsbsc003Mapper.selectMpsbsc003List(paramMap);
    }

    /**
     * 대상복사 
     * @param paramMap
     * @return
     */
    @Override
    public JSONObject saveCopyApplyMonth(EgovMapForNull paramMap) {

        try {
        	mpsbsc003Mapper.deleteAllMpsbsc003(paramMap);
            mpsbsc003Mapper.saveCopyMpsbsc003(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }    

    
    @Override
    public JSONObject findMpsbsc003(EgovMapForNull paramMap) {
        try {

            Mpsbsc003 entity = new Mpsbsc003(mpsbsc003Mapper.selectMpsbsc003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMpsbsc003(EgovMapForNull paramMap) {
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
        
            Mpsbsc003 mpsbsc003 = null;
            String mon ="";  //월 
            
            for(String ids : idsArr) {
            	mpsbsc003 = new Mpsbsc003(paramMap, ids);

            	for (int i = 1; i <= 12; i++) {
        			if(i < 10) {
        				mon = "0" + i;
        			}else {          
        				mon = ""  + i;
        			}
        			mpsbsc003.setApplcYm(mpsbsc003.getApplcYy() + mon);
        			
        			    if (i== 1) { 
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt1At());
        			    }else if (i== 2) { 
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt2At());
        			    }else if (i== 3) {	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt3At());
        			    }else if (i== 4) { 	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt4At());     
        			    }else if (i== 5) { 	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt5At());     
        			    }else if (i== 6) {	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt6At());     
        			    }else if (i== 7) {	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt7At());     
        			    }else if (i== 8) { 	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt8At());     
        			    }else if (i== 9) {	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt9At());     
        			    }else if (i== 10) { 	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt10At());     
        			    }else if (i== 11) { 	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt11At());     
        			    }else if (i== 12) {	
        			    	mpsbsc003.setPymntAt(mpsbsc003.getPymnt12At());     
        			    }

        			 mpsbsc003Mapper.saveMpsbsc003(mpsbsc003);
            	}             
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");            
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }    
       


    @Override
    public JSONObject removeMpsbsc003(EgovMapForNull paramMap) {

        try {

            String salarytyCodes = StringExpression.nullConvert(paramMap.get("salarytyCodes"));
            String[] salarytyCodeArr = salarytyCodes.split("\\,");
            String salaryitemCodes = StringExpression.nullConvert(paramMap.get("salaryitemCodes"));
            String[] salaryitemCodeArr = salaryitemCodes.split("\\,");
            String applcYms = StringExpression.nullConvert(paramMap.get("applcYms"));
            String[] applcYmArr = applcYms.split("\\,");

            int arrLength = (applcYmArr == null) ? 0 : applcYmArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("salarytyCode", salarytyCodeArr[keyColumnIdx]);
                mapper.put("salaryitemCode", salaryitemCodeArr[keyColumnIdx]);
                mapper.put("applcYm", applcYmArr[keyColumnIdx]);

                mpsbsc003Mapper.deleteMpsbsc003(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
