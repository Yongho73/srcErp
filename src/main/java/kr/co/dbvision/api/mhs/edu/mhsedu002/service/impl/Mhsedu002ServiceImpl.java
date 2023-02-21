package kr.co.dbvision.api.mhs.edu.mhsedu002.service.impl;

import java.text.SimpleDateFormat;

import java.util.List;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.edu.mhsedu002.entity.Mhsedu002;
import kr.co.dbvision.api.mhs.edu.mhsedu002.service.Mhsedu002Service;
import kr.co.dbvision.api.mhs.edu.mhsedu002.service.mapper.Mhsedu002Mapper;
import kr.co.dbvision.api.mhs.flx.mhsflx002.entity.Mhsflx002;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
//import kr.co.dbvision.lib.message.service.MessageService;
import net.sf.json.JSONObject;

/**
 * 교육신청관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.09.02
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 * </pre>
 */
@Service("Mhsedu002Service")
@Transactional
public class Mhsedu002ServiceImpl extends EgovAbstractServiceImpl implements Mhsedu002Service {

    Logger logger = LogManager.getLogger(Mhsedu002ServiceImpl.class);

    @Resource(name="Mhsedu002Mapper")
    private Mhsedu002Mapper mhsedu002Mapper;
    
    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;
    
    //@Resource(name="MessageService")
    //private MessageService messageService;

    private int listRowNumber = 0; // 넘버링 

    public Mhsedu002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhsedu002(EgovMapForNull paramMap) {
        try {

            Mhsedu002 entity = new Mhsedu002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu002Mapper.selectMhsedu002List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhsedu002ForExcel(EgovMapForNull paramMap) {

        return mhsedu002Mapper.selectMhsedu002List(paramMap);
    }

    @Override
    public JSONObject findMhsedu002(EgovMapForNull paramMap) {
        try {

            Mhsedu002 entity = new Mhsedu002(mhsedu002Mapper.selectMhsedu002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhsedu002(EgovMapForNull paramMap) throws Exceptions {

        try {

            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
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
            Date date = new Date();
            SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
                
                
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu002 entity = null;
            
            for(String ids : idsArr) {

                entity = new Mhsedu002(paramMap, ids, "1");
                entity.setConfmDe(format.format(date));
                entity.setConfmEmpno(userId);
                noticTit = "교육 승인 안내";
                sttusNm = "승인";
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhsedu002Mapper.deleteMhsedu002(entity);
                    break;
                    
                case "updated":
                    String stringMaxNumberingSn = "";
                    if (entity.getEducourseCode().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MHS_EDUCRSE");
                        paramMap2.put("relItemNm", "EDUCOURSE_CODE");
                        paramMap2.put("strMaxNumberingSn" , "");
                        stringMaxNumberingSn = stmbsc006Service.searchStmbsc006GetNumberingSn(paramMap2);
                        entity.setEducourseCode(stringMaxNumberingSn);
                    }
                    mhsedu002Mapper.saveMhsedu002(entity);
                    int cnt = mhsedu002Mapper.saveMhseduReqst(entity);
                    if(cnt == 1) {
                        String empno = entity.getEmpno(); // 사원번호
                        String korNm = entity.getKorNm(); // 사원명
                        String reqstDe = entity.getReqstDe(); // 교육신청일자
                        String educourseNm = entity.getEducourseNm(); // 교육과정명
                        sendMsg = new EgovMapForNull();
                        sendMsg.put("systemKind", "MES");  //시스템종류 : STM 시스템, MHS 인사, MPS 급여, MES 교육, YND 연말정산, COM 공통
                        sendMsg.put("noticeKind", "101");  //공지 종류  : 101  알림,      003 오류  001 일반, 002 일정, 901 기타
                        sendMsg.put("noticeTrgetSe", "002");  //공지 대상  : 001 전체. 002 개인, 003 부서(조직), 004 권한
                        sendMsg.put("noticeTit", noticTit);    // 공지 타이틀
                        sendMsg.put("noticeCn", korNm + "(" + empno + ")님이 교육과정명 : " + educourseNm + " " + reqstDe + "일에 신청한 교육이 "+ sttusNm + "되었습니다. 교육신청을 확인하여 주세요.");    // 공지 내용
                        sendMsg.put("noticeTrgetIds", empno);    // 대상자 ID : 바(|)를 구분자로 해서 여러 대상을 지정 가능  :공지대상이 전체이면 빈값, 공지대상이 개인이면 사번, 공지대상이 부서(조직)이면 부서(조직)코드, 공지대상이 특정 권한자이면 권한의 ID (ROLE_ADM  시스템관리자, ROLE_EDU  교육관리자, ROLE_GNR  일반사용자, ROLE_MHS  인사관리자, ROLE_MPS  급여관리자)
                        //messageService.saveNoticeBoard(sendMsg);
                    }
//                    mhsedu002Mapper.saveMhsedu002(entity);
                    mhsedu002Mapper.saveMhseduSelfAt(entity);
                    break;
                default:
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            returnMap.put("educourseCode", entity.getEducourseCode());
            returnMap.put("elctsctSeSn", entity.getElctsctSeSn());
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMhseduTime(EgovMapForNull paramMap) {
        try {

            Mhsedu002 entity = new Mhsedu002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu002Mapper.selectMhseduTime(paramMap).stream().map(mapper -> {
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
    public JSONObject searchMhseduEmp(EgovMapForNull paramMap) {
        try {

            Mhsedu002 entity = new Mhsedu002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu002Mapper.selectMhseduEmp(paramMap).stream().map(mapper -> {
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
    public JSONObject saveMhseduEmp(EgovMapForNull paramMap) throws Exceptions {
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu002 entity = null;

            for(String ids : idsArr) {

                entity = new Mhsedu002(paramMap, ids, "3");
                
                switch(entity.getNativeeditorStatus()) {
                case "inserted":
                    
                    mhsedu002Mapper.saveMhseduEmp(entity);
                    
                    break;
                    
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
    public JSONObject saveMhseduTime(EgovMapForNull paramMap) throws Exceptions {
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu002 entity = null;

            for(String ids : idsArr) {

                entity = new Mhsedu002(paramMap, ids, "2");
                
                switch(entity.getNativeeditorStatus()) {
                case "updated":
                    
                    mhsedu002Mapper.saveMhseduTime(entity);
                    
                    break;
                    
                default:
                    break;
                }
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            returnMap.put("educourseCode", entity.getEducourseCode());
            returnMap.put("elctsctSeSn", entity.getElctsctSeSn());

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhseduResn(EgovMapForNull paramMap) throws Exceptions {
        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            EgovMapForNull returnMap = new EgovMapForNull();
            EgovMapForNull sendMsg;
            String noticTit;
            String sttusNm;
            
            noticTit = "교육 반려 안내";
            sttusNm = "반려";
            int cnt = mhsedu002Mapper.updateSttusMhsedu002(paramMap);
            if(cnt == 1) {
                
                String empno = (String) paramMap.get("empno"); // 사원번호
                String korNm = (String) paramMap.get("korNm"); // 사원명
                String reqstDe = (String) paramMap.get("reqstDe"); // 신청일자
                String educourseNm = (String) paramMap.get("educourseNm"); // 교육과정명
                
                sendMsg = new EgovMapForNull();
                sendMsg.put("systemKind", "MES");  //시스템종류 : STM 시스템, MHS 인사, MPS 급여, MES 교육, YND 연말정산, COM 공통
                sendMsg.put("noticeKind", "101");  //공지 종류  : 101  알림,      003 오류  001 일반, 002 일정, 901 기타
                sendMsg.put("noticeTrgetSe", "002");  //공지 대상  : 001 전체. 002 개인, 003 부서(조직), 004 권한
                sendMsg.put("noticeTit", noticTit);    // 공지 타이틀
                sendMsg.put("noticeCn", korNm + "(" + empno + ")님이 교육과정명 : " + educourseNm + " " + reqstDe + "일에 신청한 교육이 "+ sttusNm + "되었습니다. 교육신청을 확인하여 주세요.");    // 공지 내용
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
	public JSONObject saveMhseduReqst(EgovMapForNull paramMap) throws Exceptions {
		// TODO Auto-generated method stub
		try {
			Mhsedu002 entity = new Mhsedu002(paramMap);
			mhsedu002Mapper.saveMhseduReqst(entity);
				
			EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
			return new JsonMsgMng().makeJsonObject(returnMap);
		} catch(Exception e) {
			throw e;
		}
		
	}

}
