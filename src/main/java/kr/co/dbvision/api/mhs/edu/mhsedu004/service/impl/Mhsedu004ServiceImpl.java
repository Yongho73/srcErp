package kr.co.dbvision.api.mhs.edu.mhsedu004.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.edu.mhsedu002.entity.Mhsedu002;
import kr.co.dbvision.api.mhs.edu.mhsedu004.entity.Mhsedu004;
import kr.co.dbvision.api.mhs.edu.mhsedu004.service.Mhsedu004Service;
import kr.co.dbvision.api.mhs.edu.mhsedu004.service.mapper.Mhsedu004Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
//import kr.co.dbvision.lib.message.service.MessageService;
import net.sf.json.JSONObject;

/**
 * 교육결과보고관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.10.07
 * @version 1.0
 * @sourceGen version 2020.09.13.01 (2020.10.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.10.07          디비비전              최초 생성
 * </pre>
 */
@Service("Mhsedu004Service")
@Transactional
public class Mhsedu004ServiceImpl extends EgovAbstractServiceImpl implements Mhsedu004Service {

    Logger logger = LogManager.getLogger(Mhsedu004ServiceImpl.class);

    @Resource(name="Mhsedu004Mapper")
    private Mhsedu004Mapper mhsedu004Mapper;
    
    //@Resource(name="MessageService")
    ///private MessageService messageService;

    private int listRowNumber = 0; // 넘버링 

    public Mhsedu004ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhsedu004(EgovMapForNull paramMap) {
        try {

            Mhsedu004 entity = new Mhsedu004(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu004Mapper.selectMhsedu004List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhsedu004ForExcel(EgovMapForNull paramMap) {

        return mhsedu004Mapper.selectMhsedu004List(paramMap);
    }

    @Override
    public JSONObject findMhsedu004(EgovMapForNull paramMap) {
        try {

            Mhsedu004 entity = new Mhsedu004(mhsedu004Mapper.selectMhsedu004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhsedu004(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu004 entity = null;

            for(String ids : idsArr) {

                entity = new Mhsedu004(paramMap, ids , "1");

                switch(entity.getNativeeditorStatus()) {
                case "updated":
                        mhsedu004Mapper.saveMhsedu004(entity);
                        mhsedu004Mapper.updateClosAt(entity);
                    break;
                case "inserted":
                        mhsedu004Mapper.saveMhsedu004(entity);
                    break;
                case "deleted":
                    mhsedu004Mapper.updateClos(entity);
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
    public JSONObject searchMhseduTime(EgovMapForNull paramMap) {
        try {

            Mhsedu004 entity = new Mhsedu004(paramMap);
            List<EgovMapForNull> resultList;
            listRowNumber = 1;
            
            List<EgovMapForNull> list = mhsedu004Mapper.selectMhseduTime(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());
            
            List<EgovMapForNull> list2 = mhsedu004Mapper.selectMhseduTime2(paramMap);
            
            resultList = mergeList(list , list2);

            entity.setRecords(resultList);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    public List<EgovMapForNull> mergeList( List<EgovMapForNull> stanList,  List<EgovMapForNull> actualList){
        List<EgovMapForNull> newList = new ArrayList<EgovMapForNull>();
        EgovMapForNull newMap;
        Iterator<String> stanIter;
        Iterator<String> actualIter;
        if(actualList.size() <= 0) {
           return stanList; 
        }
        else {
            for(EgovMapForNull stanMap : stanList) {                                    
                stanIter = stanMap.keySet().iterator();                                 
                newMap = new EgovMapForNull();
                while(stanIter.hasNext()) {
                    String stanKey = stanIter.next();                                   
                    if(stanKey.equals("finishTime")) {
                        for(EgovMapForNull actualMap : actualList) {
                            actualIter = actualMap.keySet().iterator();
                            while(actualIter.hasNext()) {
                                String actualKey = actualIter.next();
                                if(actualKey.equals("finishTime") && actualMap.get("mustFinishEduSe").equals(stanMap.get("mustFinishEduSe"))) {
                                    newMap.put(actualKey, actualMap.get(actualKey));
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        newMap.put(stanKey, stanMap.get(stanKey));
                    }
                }
                newList.add(newMap); 
            }        
            return newList;
        }
    }
    
    @Override
    public JSONObject saveMhseduTime(EgovMapForNull paramMap) throws Exceptions {
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu004 entity = null;

            for(String ids : idsArr) {

                entity = new Mhsedu004(paramMap, ids, "2");
                
                switch(entity.getNativeeditorStatus()) {
                case "updated":
                    
                    mhsedu004Mapper.saveMhseduTime(entity);
                    
                    break;
                    
                default:
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
    public JSONObject saveMhseduSttusCode(EgovMapForNull paramMap) throws Exceptions {
        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            EgovMapForNull returnMap = new EgovMapForNull();
            EgovMapForNull sendMsg;
            String noticTit;
            String sttusNm;
            String userId = "";
            if (sessionMap == null) {
                return null;
            } 
            else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
            }
            Mhsedu004 entity = new Mhsedu004(paramMap);
    //        Date date = new Date();
    //        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
    //        entity.setElctsctDocNo(format.format(date));  
    //        entity.setElctsctEmpno(userId);
            noticTit = "사이버교육 승인 안내";
            sttusNm = "승인";
            
            int cnt = mhsedu004Mapper.updateSttusMhsedu004(paramMap);
            if(cnt == 1) {
                
                String empno = (String) paramMap.get("empno"); // 사원번호
                String korNm = (String) paramMap.get("korNm"); // 사원명
                String educourseNm = (String) paramMap.get("educourseNm"); // 교육과정명
                
                sendMsg = new EgovMapForNull();
                sendMsg.put("systemKind", "MES");  //시스템종류 : STM 시스템, MHS 인사, MPS 급여, MES 교육, YND 연말정산, COM 공통
                sendMsg.put("noticeKind", "101");  //공지 종류  : 101  알림,      003 오류  001 일반, 002 일정, 901 기타
                sendMsg.put("noticeTrgetSe", "002");  //공지 대상  : 001 전체. 002 개인, 003 부서(조직), 004 권한
                sendMsg.put("noticeTit", noticTit);    // 공지 타이틀
                sendMsg.put("noticeCn", korNm + "(" + empno + ")님이 사이버교육 교육과정명 : " + educourseNm + " 신청한 교육이 "+ sttusNm + "되었습니다. 교육신청을 확인하여 주세요.");    // 공지 내용
                sendMsg.put("noticeTrgetIds", empno);    // 대상자 ID : 바(|)를 구분자로 해서 여러 대상을 지정 가능  :공지대상이 전체이면 빈값, 공지대상이 개인이면 사번, 공지대상이 부서(조직)이면 부서(조직)코드, 공지대상이 특정 권한자이면 권한의 ID (ROLE_ADM  시스템관리자, ROLE_EDU  교육관리자, ROLE_GNR  일반사용자, ROLE_MHS  인사관리자, ROLE_MPS  급여관리자)
                //return messageService.saveNoticeBoard(sendMsg);
                
            }
            else {      // 1행 이상 적용 되었습니다.
                returnMap.put("code", "999");
                returnMap.put("message", "FAIL");
            }
    
            return new JsonMsgMng().makeJsonObject(returnMap);
        
            } catch (Exception e) {
                throw e;
            }
    }

    @Override
    public JSONObject saveMhseduReturn(EgovMapForNull paramMap) throws Exceptions {
        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            EgovMapForNull returnMap = new EgovMapForNull();
            EgovMapForNull sendMsg;
            String noticTit;
            String sttusNm;
            String userId = "";
            if (sessionMap == null) {
                return null;
            } 
            else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
            }
            Mhsedu004 entity = new Mhsedu004(paramMap);
//            Date date = new Date();
//            SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
//            entity.setElctsctDocNo(format.format(date));  
//            entity.setElctsctEmpno(userId);
            noticTit = "사이버교육 반려 안내";
            sttusNm = "반려";
            
            int cnt = mhsedu004Mapper.updateSttusReturn(paramMap);
            if(cnt == 1) {
                
                String empno = (String) paramMap.get("empno"); // 사원번호
                String korNm = (String) paramMap.get("korNm"); // 사원명
                String educourseNm = (String) paramMap.get("educourseNm"); // 교육과정명
                
                sendMsg = new EgovMapForNull();
                sendMsg.put("systemKind", "MES");  //시스템종류 : STM 시스템, MHS 인사, MPS 급여, MES 교육, YND 연말정산, COM 공통
                sendMsg.put("noticeKind", "101");  //공지 종류  : 101  알림,      003 오류  001 일반, 002 일정, 901 기타
                sendMsg.put("noticeTrgetSe", "002");  //공지 대상  : 001 전체. 002 개인, 003 부서(조직), 004 권한
                sendMsg.put("noticeTit", noticTit);    // 공지 타이틀
                sendMsg.put("noticeCn", korNm + "(" + empno + ")님이 사이버교육 교육과정명 : " + educourseNm + " 신청한 교육이 "+ sttusNm + "되었습니다. 교육신청을 확인하여 주세요.");    // 공지 내용
                sendMsg.put("noticeTrgetIds", empno);    // 대상자 ID : 바(|)를 구분자로 해서 여러 대상을 지정 가능  :공지대상이 전체이면 빈값, 공지대상이 개인이면 사번, 공지대상이 부서(조직)이면 부서(조직)코드, 공지대상이 특정 권한자이면 권한의 ID (ROLE_ADM  시스템관리자, ROLE_EDU  교육관리자, ROLE_GNR  일반사용자, ROLE_MHS  인사관리자, ROLE_MPS  급여관리자)
                //return messageService.saveNoticeBoard(sendMsg);
                
            }
            else {      // 1행 이상 적용 되었습니다.
                returnMap.put("code", "999");
                returnMap.put("message", "FAIL");
            }

            return new JsonMsgMng().makeJsonObject(returnMap);
        
            } catch (Exception e) {
                throw e;
            }
    }
}
