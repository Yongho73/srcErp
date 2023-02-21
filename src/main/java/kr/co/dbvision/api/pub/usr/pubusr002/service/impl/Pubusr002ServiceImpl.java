package kr.co.dbvision.api.pub.usr.pubusr002.service.impl;

import java.util.List;



import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.usr.pubusr002.entity.Pubusr002;

import kr.co.dbvision.api.pub.usr.pubusr002.service.Pubusr002Service;
import kr.co.dbvision.api.pub.usr.pubusr002.service.mapper.Pubusr002Mapper;

import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인정보변경신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.09.22
 * @version 1.0
 * @param <MessageService>
 * @sourceGen version 2020.09.13.01 (2020.09.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.22          디비비전              최초 생성
 * </pre>
 */
@Service("Pubusr002Service")
@Transactional
public class Pubusr002ServiceImpl<MessageService> extends EgovAbstractServiceImpl implements Pubusr002Service {

    Logger logger = LogManager.getLogger(Pubusr002ServiceImpl.class);

    @Resource(name="Pubusr002Mapper")
    private Pubusr002Mapper pubusr002Mapper;
    

    
    @Resource(name="Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service; 


    private int listRowNumber = 0; // 넘버링 

    public Pubusr002ServiceImpl() {
        //
    }

    //개인정보변경신청 조회
    @Override
    public JSONObject searchPubusr002(EgovMapForNull paramMap) {
        try {

            Pubusr002 entity = new Pubusr002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubusr002Mapper.selectPubusr002List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubusr002ForExcel(EgovMapForNull paramMap) {

        return pubusr002Mapper.selectPubusr002List(paramMap);
    }
    
    @Override
    public JSONObject findPubusr002(EgovMapForNull paramMap) {
        try {

            Pubusr002 entity = new Pubusr002(pubusr002Mapper.selectPubusr002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    //tab1의 상세내용을 조회한다.
    @Override
    public JSONObject searchPubusr002Tab1(EgovMapForNull paramMap) {
        try {

            Pubusr002 entity = new Pubusr002(pubusr002Mapper.searchPubusr002Tab1(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    //기본정보 저장 or 새인정보 변경신청 삭제
    @Override
    public JSONObject savePubusr002(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubusr002 entity = null;
            EgovMapForNull returnMap = new EgovMapForNull();
            
            for(String ids : idsArr) {

                entity = new Pubusr002(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    if("001".equals(entity.getChangeSe())) pubusr002Mapper.deletePubusr002Tab1(entity);
                    else if("002".equals(entity.getChangeSe()))pubusr002Mapper.deletePubusr002Tab2(entity);
                    else if("003".equals(entity.getChangeSe()))pubusr002Mapper.deletePubusr002Tab3(entity);
                    else if("004".equals(entity.getChangeSe()))pubusr002Mapper.deletePubusr002Tab4(entity);
                    else if("005".equals(entity.getChangeSe()))pubusr002Mapper.deletePubusr002Tab5(entity);
                    else if("006".equals(entity.getChangeSe()))pubusr002Mapper.deletePubusr002Tab6(entity);
                    else if("007".equals(entity.getChangeSe()))pubusr002Mapper.deletePubusr002Tab7(entity);
                    else if("008".equals(entity.getChangeSe()))pubusr002Mapper.deletePubusr002Tab8(entity);
                    
                    pubusr002Mapper.deletePubusr002(entity);
                    returnMap.put("state", "delete");
                    break;

                default:

                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    //변경전 사용자 정보를 조회한다
    @Override
    public JSONObject nowUserInfo(EgovMapForNull paramMap) {
        try {

            Pubusr002 entity = new Pubusr002(pubusr002Mapper.nowUserInfo(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    //개인정보_기본 저장
    @Override
    public JSONObject savePubusr002Tab1(EgovMapForNull paramMap) throws Exceptions {

        try {
            Pubusr002 entity = new Pubusr002(paramMap);
            if(entity.getChangeReqstSn().equals("") || entity.getChangeReqstSn().equals(null) || entity.getChangeReqstSn().equals("자동채번")) {
            	//System.out.println("------1-------------");
                /** 신규 일련번호 받는 부분 **/
                //신규 일련번호 받기 위해 EgovMapForNull 를 하나 만들어서 값을 부여
                /*EgovMapForNull paramSpMap = new EgovMapForNull();
                paramSpMap.put("relTblNm", "MHS_EMP_CHANGE");  //테이블명 - 각자 필요한 테이블 명 : 자동채번설정에 입력한 테이블 명
                paramSpMap.put("relItemNm", "CHANGE_REQST_SN");   //컬럼명 - 자동채번설정에 입력한 컬럼 명
                paramSpMap.put("strMaxNumberingSn", ""); //리턴받을 빈 변수*/
                //System.out.println("------2-------------");

                //String strMaxNumberingSn = stmbsc006Service.searchStmbsc006GetNumberingSn(paramSpMap);  //<<== 신규 일련번호 받는 부분
                //System.out.println(">>>>>>>>> strMaxNumberingSn : " + strMaxNumberingSn);
                /** 신규 일련번호 받는 부분 **/

                //entity.setChangeReqstSn(strMaxNumberingSn);
               // System.out.println("@@@@@@@@@@@@@@@@@"+entity);
               // System.out.println("------3-------------");
                pubusr002Mapper.savePubusr002(entity);
               // System.out.println("------4-------------");
               // System.out.println("1111111111111"+ entity);
                entity.setBfchgAfchgSe("001");
                pubusr002Mapper.savePubusr002Tap1Before(entity);
                System.out.println("222222222222"+ entity);
            }

            entity.setBfchgAfchgSe("002");
            pubusr002Mapper.savePubusr002Tap1After(entity);
            System.out.println("33333333333333"+ entity);
            
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    

    
    /* 패스워드 변경 */
    @Override
    public JSONObject searchUserPassword(EgovMapForNull paramMap) {
        try {

            Pubusr002 entity = new Pubusr002(pubusr002Mapper.searchUserPassword(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    //저장
    @Override
    public JSONObject saveUserPassword(EgovMapForNull paramMap, String menuId, String changeRequstIp) {
        try {
            
            Pubusr002 entity = new Pubusr002(paramMap);
            
            //변경 이력 저장
            entity.setChangeCauseSe("001");
            entity.setChangeMenuId(menuId);
            entity.setChangeRequstIp(changeRequstIp);
            entity.setChangeSe("002");
            
            pubusr002Mapper.saveChangePw(entity);
            pubusr002Mapper.saveChangePwHist(entity);
            
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

  //개인정보 변경 승인요청
	@Override
    public JSONObject applyPubusr002(EgovMapForNull paramMap) {
        try {
            
            Pubusr002 entity = new Pubusr002(paramMap);
            EgovMapForNull returnMap = new EgovMapForNull();
            EgovMapForNull sendMsg;
            entity.setConfmSttusCode("001");
            int cnt = pubusr002Mapper.applyPubusr002(entity);
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
                //returnMap.put("code", "999");
                //returnMap.put("message", "0행 또는 2행 이상 적용되었습니다. <br> 재조회 후 시도하여 주세요.");
            }
            returnMap.put("code", "000");
            returnMap.put("message", "정상적으로 반영되었습니다.");
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
		//return null;
    }
}
