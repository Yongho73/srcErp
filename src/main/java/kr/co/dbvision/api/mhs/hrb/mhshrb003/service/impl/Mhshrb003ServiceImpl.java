package kr.co.dbvision.api.mhs.hrb.mhshrb003.service.impl;

import java.util.List;


import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrb.mhshrb003.entity.Mhshrb003;

import kr.co.dbvision.api.mhs.hrb.mhshrb003.service.Mhshrb003Service;
import kr.co.dbvision.api.mhs.hrb.mhshrb003.service.mapper.Mhshrb003Mapper;
import kr.co.dbvision.api.pub.usr.pubusr002.entity.Pubusr002;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;

import net.sf.json.JSONObject;

/**
 * 개인정보변경승인관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.06.09
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.09          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrb003Service")
@Transactional
public class Mhshrb003ServiceImpl extends EgovAbstractServiceImpl implements Mhshrb003Service {

    Logger logger = LogManager.getLogger(Mhshrb003ServiceImpl.class);

    @Resource(name="Mhshrb003Mapper")
    private Mhshrb003Mapper mhshrb003Mapper;

    //@Resource(name="MessageService")
    //private MessageService messageService;
    
    private int listRowNumber = 0; // 넘버링 

    public Mhshrb003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrb003(EgovMapForNull paramMap) {
        try {

            Mhshrb003 entity = new Mhshrb003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrb003Mapper.selectMhshrb003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrb003ForExcel(EgovMapForNull paramMap) {

        return mhshrb003Mapper.selectMhshrb003List(paramMap);
    }

    @Override
    public JSONObject findMhshrb003(EgovMapForNull paramMap) {
        try {

            Mhshrb003 entity = new Mhshrb003(mhshrb003Mapper.selectMhshrb003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrb003(EgovMapForNull paramMap, String changeRequstIp) throws Exceptions {

        try {

            paramMap.put("changeSeHist","002");
            paramMap.put("changeMenuId","MHSHRB003");
            paramMap.put("changeRequstIp",changeRequstIp);
            paramMap.put("changeCauseSe","001"); //신규001,수정002,삭제003
            
            int cnt1 = 0 , cnt2 = 0;
           
            Mhshrb003 entity = new Mhshrb003(paramMap);
            EgovMapForNull returnMap = new EgovMapForNull();
            String changeSe = entity.getChangeSe();
            System.out.println(paramMap+"##############0000");
            mhshrb003Mapper.saveChangeData(entity);
            System.out.println(entity+"##############0");
            if(entity.getConfmSttusCode().equals("002") || entity.getConfmSttusCode().equals("004")) {
                if(changeSe.equals("001")) {
                    cnt1 = mhshrb003Mapper.changeDataTab1(entity);
                    System.out.println(entity+"##############1");
                    mhshrb003Mapper.changeDataTab01(entity);
                    System.out.println(entity+"##############1.5");
                    cnt2 = mhshrb003Mapper.saveEmpHist(entity);
                    System.out.println(entity+"##############2");
                    System.out.println(cnt2+"##############3");
                    
                } else if(changeSe.equals("002")) {
                    cnt1 = mhshrb003Mapper.changeDataTab2(entity);
                    cnt2 = mhshrb003Mapper.saveIndvdlInfoHist(entity);
                    
                } else if(changeSe.equals("003")) {
                    entity.setChangeCauseSe("003");
                    mhshrb003Mapper.saveFamilyHist(entity);
                    mhshrb003Mapper.deleteFamily(entity);
                    entity.setChangeCauseSe("001");
                    cnt1 = mhshrb003Mapper.changeDataTab3(entity);
                    cnt2 = mhshrb003Mapper.saveFamilyHist(entity);
                    
                } else if(changeSe.equals("004")) {
                    mhshrb003Mapper.deleteAcdmcr(entity);
                    cnt1 = mhshrb003Mapper.changeDataTab4(entity);
                  
                } else if(changeSe.equals("005")) {
                    entity.setChangeCauseSe("003");
                    mhshrb003Mapper.saveCrqfsHist(entity);
                    mhshrb003Mapper.deleteFamily(entity);
                    entity.setChangeCauseSe("001");
                    cnt1 = mhshrb003Mapper.changeDataTab5(entity);
                    cnt2 = mhshrb003Mapper.saveCrqfsHist(entity);
                    
                } else if(changeSe.equals("006")) {
                    mhshrb003Mapper.deleteAcnut(entity);
                    cnt1 = mhshrb003Mapper.changeDataTab6(entity);
                  
                } else if(changeSe.equals("007")){
                    mhshrb003Mapper.deleteFggg(entity);
                    cnt1 = mhshrb003Mapper.changeDataTab7(entity);
                    
                } else if("008".equals(changeSe)) {
                    entity.setChangeCauseSe("003");
                    mhshrb003Mapper.saveCareerHist(entity);
                    mhshrb003Mapper.deleteCareer(entity);
                    entity.setChangeCauseSe("001");
                    cnt1 = mhshrb003Mapper.changeDataTab8(entity);
                    cnt2 = mhshrb003Mapper.saveCareerHist(entity);
                }
                
                if(changeSe.equals("004") || changeSe.equals("006") || changeSe.equals("007")) {
                    if(cnt1 > 0) {
                        //return sendMsg(entity.getEmpno() , entity.getChangeSeNm() , "승인");
                    }
                    else {
                        returnMap.put("code", "999");
                        returnMap.put("message", "0건 적용 되었습니다. 신청 정보를 확인하여 주세요.");                        
                    }
                }
                else if(changeSe.equals("001") || changeSe.equals("002") || changeSe.equals("003") || changeSe.equals("005") || changeSe.equals("008")) {
                    if(cnt1 > 0 || cnt2 > 0) {
                        //return sendMsg(entity.getEmpno() , entity.getChangeSeNm() , "승인");
                    }
                    else {
                        returnMap.put("code", "999");
                        returnMap.put("message", "0건 적용 되었습니다. 신청 정보를 확인하여 주세요.");                        
                    }
                }
            }
            else {
                //return sendMsg(entity.getEmpno() , entity.getChangeSeNm() , "반려");
            }

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject receiptMhshrb003(EgovMapForNull paramMap) {
        try {
            
        	Mhshrb003 entity = new Mhshrb003(paramMap);
            EgovMapForNull returnMap = new EgovMapForNull();
            EgovMapForNull sendMsg;
            entity.setConfmSttusCode("004");
            int cnt = mhshrb003Mapper.applyMhshrb003(entity);
            if(cnt == 1) {
                //sendMsg = new EgovMapForNull();
                //sendMsg.put("systemKind", "MHS");  //시스템종류 : STM 시스템, MHS 인사, MPS 급여, MES 교육, YND 연말정산, COM 공통
                //sendMsg.put("noticeKind", "101");  //공지 종류  : 101  알림,      003 오류  001 일반, 002 일정, 901 기타
                //sendMsg.put("noticeTrgetSe", "004");  //공지 대상  : 001 전체. 002 개인, 003 부서(조직), 004 권한
                //sendMsg.put("noticeTit", "개인정보변경 승인신청 안내");    // 공지 타이틀
                //sendMsg.put("noticeCn", entity.getEmpNm() + "(" + entity.getEmpno() + ") " + "개인정보변경 [" + entity.getChangeSeNm() +"]" 
                 //           +" 승인신청 하였습니다. 개인정보변경을 확인하여 주세요.");    // 공지 내용
                //sendMsg.put("noticeTrgetIds", "ROLE_MHS");    // 대상자 ID : 바(|)를 구분자로 해서 여러 대상을 지정 가능  :공지대상이 전체이면 빈값, 공지대상이 개인이면 사번, 공지대상이 부서(조직)이면 부서(조직)코드, 공지대상이 특정 권한자이면 권한의 ID (ROLE_ADM  시스템관리자, ROLE_EDU  교육관리자, ROLE_GNR  일반사용자, ROLE_MHS  인사관리자, ROLE_MPS  급여관리자)
                //return messageService.saveNoticeBoard(sendMsg);
            	returnMap.put("code", "000");
            }
            else {
                returnMap.put("code", "999");
                returnMap.put("message", "0행이 적용되었습니다. <br> 재조회 후 시도하여 주세요.");
            }
            //returnMap.put("code", "000");
            //returnMap.put("message", "정상적으로 반영되었습니다.");
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
		//return null;
    }
    //public JSONObject sendMsg(String empno , String changeSeNm , String sttusNm) {
    //    EgovMapForNull sendMsg = new EgovMapForNull();
    //    sendMsg.put("systemKind", "MHS");  //시스템종류 : STM 시스템, MHS 인사, MPS 급여, MES 교육, YND 연말정산, COM 공통
    //    sendMsg.put("noticeKind", "101");  //공지 종류  : 101  알림,      003 오류  001 일반, 002 일정, 901 기타
    //    sendMsg.put("noticeTrgetSe", "002");  //공지 대상  : 001 전체. 002 개인, 003 부서(조직), 004 권한
     //   sendMsg.put("noticeTit", "개인정보변경신청 승인 관련 안내");    // 공지 타이틀
     //   sendMsg.put("noticeCn",  "개인정보변경신청 [" + changeSeNm + "] " + sttusNm + " 되었습니다. 개인정보를 확인하여 주세요.");    // 공지 내용
     //   sendMsg.put("noticeTrgetIds", empno);    // 대상자 ID : 바(|)를 구분자로 해서 여러 대상을 지정 가능  :공지대상이 전체이면 빈값, 공지대상이 개인이면 사번, 공지대상이 부서(조직)이면 부서(조직)코드, 공지대상이 특정 권한자이면 권한의 ID (ROLE_ADM  시스템관리자, ROLE_EDU  교육관리자, ROLE_GNR  일반사용자, ROLE_MHS  인사관리자, ROLE_MPS  급여관리자)
    //    return messageService.saveNoticeBoard(sendMsg);
    //}
    
    /* Tab2 */
    @Override
    public JSONObject searchMhshrb003Tab1(EgovMapForNull paramMap) {
        try {

            Mhshrb003 entity = new Mhshrb003(mhshrb003Mapper.searchMhshrb003Tab1(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

	//@Override
	//public JSONObject saveMhshrb003(EgovMapForNull paramMap) throws Exceptions {
		// TODO Auto-generated method stub
	//	return null;
	//}

}

