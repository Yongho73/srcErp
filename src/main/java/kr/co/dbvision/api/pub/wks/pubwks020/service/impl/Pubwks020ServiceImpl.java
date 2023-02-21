package kr.co.dbvision.api.pub.wks.pubwks020.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.wks.pubwks020.entity.Pubwks020;
import kr.co.dbvision.api.pub.wks.pubwks020.service.Pubwks020Service;
import kr.co.dbvision.api.pub.wks.pubwks020.service.mapper.Pubwks020Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 시차근무관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.14
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.14)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.14          디비비전              최초 생성
 * </pre>
 */
@Service("Pubwks020Service")
@Transactional
public class Pubwks020ServiceImpl extends EgovAbstractServiceImpl implements Pubwks020Service {

    Logger logger = LogManager.getLogger(Pubwks020ServiceImpl.class);

    @Resource(name="Pubwks020Mapper")
    private Pubwks020Mapper pubwks020Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pubwks020ServiceImpl() {
        //
    }

    @Override
    public JSONObject makeCalendar(EgovMapForNull paramMap) {
        try {
            Pubwks020 entity = new Pubwks020(paramMap);
            listRowNumber = 1;
            List<EgovMapForNull> calendar = new ArrayList<EgovMapForNull>();
            List<EgovMapForNull> tmdiff = new ArrayList<EgovMapForNull>();
            List<EgovMapForNull> indvd = new ArrayList<EgovMapForNull>();
            calendar = pubwks020Mapper.makeCalendar(paramMap);
            
            if("admin".equals(paramMap.get("flag"))) {
//                tmdiff = pubwks020Mapper.selectTmdiffForAdmin(paramMap);
//                관리자 조회 임시 주석 -> 승인상태가 없는 것들만 조회 시 최신 구분 순번 이전의 반려 건들의 상태를 수정할 수 있게됨 
                tmdiff = pubwks020Mapper.selectTmdiff(paramMap);    
            }
            else {
                tmdiff = pubwks020Mapper.selectTmdiff(paramMap);    
            }

            indvd = pubwks020Mapper.selectIndvd(paramMap);             // 개인별 근무유형

          int indvdBegin , indvdEnd;
          for(EgovMapForNull day : calendar) {
              for(EgovMapForNull tm : tmdiff) {
                  if(day.get("jobDe").equals(tm.get("workDay"))) {
                      day.put("empno", tm.get("empno"));
                      day.put("confmSeSn", tm.get("confmSeSn"));
                      day.put("workDay", tm.get("workDay"));
                      day.put("workBeginTime", tm.get("workBeginTime"));
                      day.put("workEndTime", tm.get("workEndTime"));
                      day.put("wrkplcNm", tm.get("wrkplcNm"));
                      day.put("shiftWorkAt", tm.get("shiftWorkAt"));
                      day.put("regDt", tm.get("regDt"));
                      day.put("regId", tm.get("regId"));
                      day.put("confmSttusCode", tm.get("confmSttusCode"));
                      day.put("confmSttusCodeNm", tm.get("confmSttusCodeNm"));
                      day.put("returnResn", tm.get("returnResn"));
                      day.put("regNm", tm.get("regNm"));
                  }
              }
              for(EgovMapForNull in : indvd) {
                  indvdBegin = (Integer) in.get("useBeginDe");
                  indvdEnd = (Integer) in.get("useEndDe");
                  for(int i = indvdBegin ; i <= indvdEnd ; i++) {
                      if(day.get("jobDe").equals(Integer.toString(i)) && (null == day.get("workDay")) && !("1".equals(day.get("hvofAt")))) {
                        day.put("workBeginTime", in.get("workBeginTime"));
                        day.put("workEndTime", in.get("workEndTime"));
                        day.put("empnm", in.get("empnm"));
                        day.put("empno" , in.get("empno"));
                      }
                  }
              }
          } 
//            System.out.println(calendar);
//            System.out.println(tmdiff);
//            System.out.println(indvd);
            
            entity.setRecords(calendar);
//            System.out.println(entity.toString());
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    
    @Override
    public JSONObject updateConfmSttusPubwks020(EgovMapForNull paramMap , List<String> empnoList) {
        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
                return null;
            } 
            else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
            }
            Pubwks020 entity = new Pubwks020(paramMap);
            Date date = new Date();
            SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
            for(String empno : empnoList) {
                if("002".equals(entity.getConfmSttusCode())) {
                    entity.setConfmDe(format.format(date));
                    entity.setConfmerEmpno(userId);
                }
                else {
                    entity.setConfmDe("");
                    entity.setConfmerEmpno("");
                }
                entity.setEmpno(empno);
                List<EgovMapForNull> list = pubwks020Mapper.selectForConfmSttusUpdate(entity);
                for(EgovMapForNull oneDay : list) {
                    entity.setWorkDay((String)oneDay.get("workDay"));
                    entity.setConfmSeSn((String)oneDay.get("confmSeSn"));
//                    System.out.println(entity.toString());
                    pubwks020Mapper.updateConfmSttusPubwks020(entity);
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
    public List<EgovMapForNull> searchPubwks020ForExcel(EgovMapForNull paramMap) {

        return pubwks020Mapper.selectPubwks020List(paramMap);
    }

    @Override
    public JSONObject findPubwks020(EgovMapForNull paramMap) {
        try {

            Pubwks020 entity = new Pubwks020(pubwks020Mapper.selectPubwks020(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubwks020(EgovMapForNull paramMap) throws Exceptions {

        try {

            pubwks020Mapper.savePubwks020(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject copyPubwks020(EgovMapForNull paramMap) throws Exceptions {

        try {
            pubwks020Mapper.copyPubwks020(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveBundlePubwks020(EgovMapForNull paramMap) throws Exceptions {

        try {
            String bStr = (String) paramMap.get("multiEmpno");
            String[] empnoArr = bStr.split("[|]");
            Pubwks020 empEntity = new Pubwks020();
//            Pubwks020 empEntity = new Pubwks020(paramMap);
            String holidayChk = (String)paramMap.get("holiWorkAt");         // 휴일포함 여부
            
            empEntity.setUseBeginDe((String)paramMap.get("useBeginDe"));
            empEntity.setUseEndDe((String)paramMap.get("useEndDe"));
            empEntity.setWorkBeginTime((String)paramMap.get("workBeginTime"));
            empEntity.setWorkEndTime((String)paramMap.get("workEndTime"));
            empEntity.setWrkplcNm((String)paramMap.get("wrkplcNm"));
            empEntity.setShiftWorkAt((String)paramMap.get("shiftWorkAt"));
            empEntity.setRegId((String)paramMap.get("regId"));
            empEntity.setUptId((String)paramMap.get("uptId"));
            
//            System.out.println(empEntity.toString());
            
            String strBeginDate = (String) paramMap.get("useBeginDe");
            String strEndDate = (String) paramMap.get("useEndDe");
            
            int intBeginDate = Integer.parseInt(strBeginDate);
            int intEndDate = Integer.parseInt(strEndDate);
            List<EgovMapForNull> hvofAtCheck = pubwks020Mapper.selectCalendarPubwks020(empEntity); // 근무 일자중 휴일 여부 확인 위해 데이터 조회
            for(String tmp : empnoArr) {
                int index = 0;
                empEntity.setEmpno(tmp);
                pubwks020Mapper.deleteBundlePubwks020(empEntity);           // 일괄 등록시 승인 상태 = NULL인 데이터들 미리 삭제 - 휴일 미포함으로 일괄 등록 시 휴일 건 중 승인상태가 없는 데이터 삭제 
                for(int i = intBeginDate ; i <= intEndDate ; i++) {
                    EgovMapForNull dateMap = hvofAtCheck.get(index);
                    String date = (String) dateMap.get("jobDe");
                    String hvofAtChk = (String) dateMap.get("hvofAt");
                    if("0".equals(holidayChk) && "1".equals(hvofAtChk)) {}      // 페이지 휴일 포함 미체크 && 달력 휴일은 저장 하지않음
                    else {
                        empEntity.setWorkDay(Integer.toString(i));
                        EgovMapForNull sttusCodeCheckMap = pubwks020Mapper.selectForSaveBundle(empEntity);  // 일괄 등록 하기 전 근무일의 MAX(구분 순번)의 승인 상태 구분 위함
                        if(null != sttusCodeCheckMap &&("001".equals(sttusCodeCheckMap.get("confmSttusCode")) || "002".equals(sttusCodeCheckMap.get("confmSttusCode")))) {}
                        else {
                            pubwks020Mapper.saveBundlePubwks020(empEntity);
                        }
//                        System.out.println(empEntity.toString());
                    }
                    index += 1;
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
    public JSONObject deletePubwks020(EgovMapForNull paramMap) throws Exceptions {

        try {
            pubwks020Mapper.deletePubwks020(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject deleteBundlePubwks020(EgovMapForNull paramMap) throws Exceptions {

        try {
            String bStr = (String) paramMap.get("multiEmpno");
            String[] empnoArr = bStr.split("[|]");
            Pubwks020 empEntity = new Pubwks020();
            
            empEntity.setUseBeginDe((String)paramMap.get("useBeginDe"));
            empEntity.setUseEndDe((String)paramMap.get("useEndDe"));
            
            for(String tmp : empnoArr) {
                empEntity.setEmpno(tmp);
                pubwks020Mapper.deleteBundlePubwks020(empEntity);
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
    public JSONObject searchHistoryPubwks020(EgovMapForNull paramMap) {
        try {
            List<EgovMapForNull> list = pubwks020Mapper.selectHistoryPubwks020(paramMap);
            Pubwks020 entity = new Pubwks020(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);
        } catch (Exception e) {
            throw e;
        }
    }
}
