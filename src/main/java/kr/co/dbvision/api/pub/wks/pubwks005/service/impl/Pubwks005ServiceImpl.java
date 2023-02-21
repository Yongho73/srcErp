package kr.co.dbvision.api.pub.wks.pubwks005.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.temporal.TemporalAccessor;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ibm.icu.util.Calendar;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.wks.pubwks005.entity.Pubwks005;
import kr.co.dbvision.api.pub.wks.pubwks005.service.Pubwks005Service;
import kr.co.dbvision.api.pub.wks.pubwks005.service.mapper.Pubwks005Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 초과근무신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.24
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.24          디비비전              최초 생성
 * </pre>
 */
@Service("Pubwks005Service")
@Transactional
public class Pubwks005ServiceImpl extends EgovAbstractServiceImpl implements Pubwks005Service {

    Logger logger = LogManager.getLogger(Pubwks005ServiceImpl.class);

    @Resource(name="Pubwks005Mapper")
    private Pubwks005Mapper pubwks005Mapper;
    
    @Resource(name="Stmbsc006Service")
    private Stmbsc006Service stmbsc006Service;

    private int listRowNumber = 0; // 넘버링 

    public Pubwks005ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPubwks005(EgovMapForNull paramMap) {
        try {

            Pubwks005 entity = new Pubwks005(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwks005Mapper.selectPubwks005List(paramMap).stream().map(mapper -> {
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
    public JSONObject getThreeMonthDataPubwks005(EgovMapForNull paramMap) throws Exception {
        try {
            EgovMapForNull returnMap = new EgovMapForNull();
            EgovMapForNull stanWorkTime = new EgovMapForNull();     // 정상 근무시간 조회
            EgovMapForNull stanHvofDe = new EgovMapForNull();       // 공휴일 조회 (신청일자가 공휴일인지 체크 - 개인휴무신청 조회 후 영업일 달력 조회)
            
            stanWorkTime = pubwks005Mapper.selectStanWorkTimeTmdiffPubwks005(paramMap); // 대상자의 시차근무로 신청한 정상 근무 시간 조회
            if(null == stanWorkTime) {
                stanWorkTime = pubwks005Mapper.selectStanWorkTimeIndvdPubwks005(paramMap); // 대상자의 개인별근무유형으로 신청한 정상 근무 시간 조회
            }

            stanHvofDe = pubwks005Mapper.selectStanHvofDeIndvdHvofMgrtPubwks005(paramMap); // 신청일자 휴무일 체크 - 개인휴무신청테이블
            if(null == stanHvofDe) {
                stanHvofDe = pubwks005Mapper.selectStanHvofDeStmJobdePubwks005(paramMap); // 신청일자 휴무일 체크 - 영얼입 테이블
//                System.out.println("영업일 테이블 " + stanHvofDe);
                returnMap.put("stanHvofDeCheck" , stanHvofDe.get("hvofAt"));
            }
            else {
//                System.out.println("개인휴무신청 테이블 " + stanHvofDe);
                returnMap.put("stanHvofDeCheck" , 1);
            }
            
            EgovMapForNull data = getThreeMonth(new Pubwks005(paramMap));
            
            returnMap.put("oneWeekMaxTime" , data.get("oneWeekMaxTime"));
            returnMap.put("totalRecogTime" , data.get("totalRecogTime"));
            returnMap.put("stanWorkTime" , stanWorkTime);
            returnMap.put("code" , "000");
            returnMap.put("message" , "SUCCESS");
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public List<EgovMapForNull> searchPubwks005ForExcel(EgovMapForNull paramMap) {

        return pubwks005Mapper.selectPubwks005List(paramMap);
    }

    @Override
    public JSONObject findPubwks005(EgovMapForNull paramMap) {
        try {

            Pubwks005 entity = new Pubwks005(pubwks005Mapper.selectPubwks005(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubwks005(EgovMapForNull paramMap) throws Exception {

        try {
            int checkWorkTime, hours ,minute;
            
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";            
            if (sessionMap == null) {
                return null;
            } else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
            }
            
            
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubwks005 entity = null;

            for(String ids : idsArr) {
                String newNumber ;
                entity = new Pubwks005(paramMap, ids);
                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pubwks005Mapper.deletePubwks005(entity);
                    break;

                default:
                    if("".equals(entity.getOvtimeWorkSn())) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MHS_OVTIME_WORK");
                        paramMap2.put("relItemNm", "OVTIME_WORK_SN");
                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        entity.setOvtimeWorkSn(newNumber); 
                    }
                    entity.setRegId(userId);
                    entity.setUptId(userId);
                    checkMaxOverworkTime(getThreeMonth(entity) , entity);
                    pubwks005Mapper.savePubwks005(entity);
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
    public JSONObject copyPubwks005(EgovMapForNull paramMap) {
        try {


            EgovMapForNull paramMap2 = new EgovMapForNull();
            paramMap2.put("relTblNm", "MHS_OVTIME_WORK");
            paramMap2.put("relItemNm", "OVTIME_WORK_SN");
            
            JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
            
            String newNumber = jsonObj.get("data").toString();
            paramMap.put("newOvtimeWorkSn" , newNumber); 
            
            pubwks005Mapper.copyPubwks005(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    public void checkMaxOverworkTime(EgovMapForNull paramMap , Pubwks005 entity) {
        int oneWeekMax = (Integer)paramMap.get("oneWeekMaxTime");   // 최대 초과근무시간
        String tmp = (String)paramMap.get("totalRecogTime");        // 신청일이 포함된 주 의 초과근무 누적 시간

        String[] totalTime = tmp.split(":");
        
        String[] dayRecogTime = entity.getDayRecogTime().split(":");
        String[] nightRecogTime = entity.getNightRecogTime().split(":");
        
        int totalHour = Integer.parseInt(totalTime[0]);
        int totalMinute = Integer.parseInt(totalTime[1]);
        
        int oneDayHour = 0;
        int oneDayMinute = 0;
        
        totalHour += (Integer.parseInt(dayRecogTime[0]) + Integer.parseInt(nightRecogTime[0]));     // 주간 최대 근무시간 체크
        totalMinute += (Integer.parseInt(dayRecogTime[1]) + Integer.parseInt(nightRecogTime[1]));
        
        oneDayHour += (Integer.parseInt(dayRecogTime[0]) + Integer.parseInt(nightRecogTime[0]));    // 하루 최대 근무시간 체크 (4시간)
        oneDayMinute += (Integer.parseInt(dayRecogTime[1]) + Integer.parseInt(nightRecogTime[1]));
        
        if(totalMinute >= 60) {
            totalHour += totalMinute / 60;
            totalMinute = totalMinute % 60;
        }
        
        if(oneDayMinute >= 60) {
            oneDayHour += oneDayMinute / 60;
            oneDayMinute = oneDayMinute % 60;
        }
        if((oneDayHour > 4) || (oneDayHour == 4 && oneDayMinute > 0)) {
            throw new Exceptions("초과근무시간(일) 을 초과하였습니다");
        }
        else if((oneWeekMax < totalHour) || (oneWeekMax == totalHour && totalMinute > 0)) {
            throw new Exceptions("초과근무시간(주) 을 초과하였습니다");
        }
        
    }

    public EgovMapForNull getThreeMonth(Pubwks005 entity) throws ParseException {
        int oneWeekMaxTime = 12;
        String reqstDe = StringExpression.nullConvert(entity.getReqstDe()).replaceAll("-", "");
        String reqstMonth = reqstDe.substring(0, 6);
        String totalRecogTime ;
        int oneWeekStart = 0;   // 신청 일자에 해당 하는 주의 시작일 
        int hour = 0,minute = 0;
        String strHour , strMinute;
        EgovMapForNull returnMap = new EgovMapForNull();
        
        entity.setBeforeReqstMonth(Integer.toString((Integer.parseInt(reqstMonth) - 1)));
        entity.setAfterReqstMonth(Integer.toString((Integer.parseInt(reqstMonth) + 2)));
        List<EgovMapForNull> threeMonthList = pubwks005Mapper.selectThreeMonthDataPubwks005(entity);
        Iterator<EgovMapForNull> iter = threeMonthList.iterator();
        EgovMapForNull day;
        while(iter.hasNext()) {             // 신청 일자에 해당하는 주 의 시작일 세팅
            day = iter.next();
            if(reqstDe.equals(day.get("jobDe"))) {
                oneWeekStart = Integer.parseInt((String)day.get("jobDe")) - Integer.parseInt((String)day.get("deSeCode"));
                break;
            }
        }
        List<EgovMapForNull> threeMonthOvtimeList = pubwks005Mapper.selectThreeMonthOvtimeDataPubwks005(entity);
        Iterator<EgovMapForNull> ovtimeIter = threeMonthOvtimeList.iterator();
        
        EgovMapForNull ovtimeDay;
        while(ovtimeIter.hasNext()) {             // 주 의 시작일 부터 일주일 간의 신청시간 합계 (totalRecogTime) 구함 -> 누적 시간
            ovtimeDay = ovtimeIter.next();
            for(int i = oneWeekStart ; i <= (oneWeekStart + 6) ; i++) {
                if(Integer.toString(i).equals(ovtimeDay.get("reqstDe"))) {
                    hour += Integer.parseInt(((String)ovtimeDay.get("dayRecogTime")).substring(0,2));
                    minute += Integer.parseInt(((String)ovtimeDay.get("dayRecogTime")).substring(2));
                    hour += Integer.parseInt(((String)ovtimeDay.get("nightRecogTime")).substring(0,2));
                    minute += Integer.parseInt(((String)ovtimeDay.get("nightRecogTime")).substring(2));
                }
            }
        }
        
        if(minute >= 60) {
            hour += minute / 60;
            minute = minute % 60;
        }
        
        strHour = (hour < 10) ? "0" + hour : "" + hour;
        strMinute = (minute < 10) ? "0" + minute : "" + minute;

        EgovMapForNull oneWeekMap = new EgovMapForNull();
        oneWeekMap.put("oneWeekStart", oneWeekStart);
        oneWeekMap.put("oneWeekEnd", (oneWeekStart + 6));
        
        int holidayCnt = pubwks005Mapper.selectHolidayCnt(oneWeekMap);
        if(holidayCnt != 0) {
            oneWeekMaxTime += (holidayCnt * 8);
        }
        
        totalRecogTime = strHour + ":" + strMinute;

        returnMap.put("oneWeekMaxTime" , oneWeekMaxTime);       // 주 - 최대 근무 시간
        returnMap.put("totalRecogTime" , totalRecogTime);       // 누적 시간
        
        return returnMap;
    }
}
