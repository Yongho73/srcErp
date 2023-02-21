package kr.co.dbvision.api.mhs.hrb.mhshrb001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 인사기본에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.22          디비비전              최초 생성
 *
 * </pre>
 */

public interface Mhshrb001Service {
     /**
      * 인사기본 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmp(EgovMapForNull paramMap);
     /**
      * 인사기본 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhsEmpForExcel(EgovMapForNull paramMap);
     /**
      * 인사기본 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhsEmp(EgovMapForNull paramMap);
     /**
      * 인사기본 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmp(EgovMapForNull paramMap);
     /**
      * 인사기본 정보를 수정한다.
      * @param paramMap 
      * @throws Exceptions
      */
     public JSONObject modifyMhsEmp(EgovMapForNull paramMap);
     /**
      * 인사기본 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhsEmp(EgovMapForNull paramMap);
     /**
      * 인사기본 정보를 수정한다. : 기본 페이지 부분
      * @param paramMap 
      * @throws Exceptions
      */
     public JSONObject modifyMhsEmpBase(EgovMapForNull paramMap);
     
     /*신상정보 Tab2*/
     /**
      * 인사기본 TAB2(신상정보) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpIndvdlInfo(EgovMapForNull paramMap);
     /**
      * 인사기본 : 개인정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmpIndvdlInfo(EgovMapForNull paramMap);
     
     /*가족정보 Tab3*/
     /**
      * 인사기본 TAB3(가족정보) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpFamily(EgovMapForNull paramMap);
     /**
      * 인사기본 : 가족정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmpFamily(EgovMapForNull paramMap);
     /**
      * 인사기본 : 가족정보 삭제한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject removeMhsEmpFamily(EgovMapForNull paramMap);
     
     /*발령 Tab4*/
     /**
      * 인사기본 TAB4(발령정보) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpGnfd(EgovMapForNull paramMap);
     /**
      * 인사기본 : 발령정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmpGnfd(EgovMapForNull paramMap);
     
     /*포상 Tab5*/
     /**
      * 인사기본 TAB5(포상정보) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpTab5Rward(EgovMapForNull paramMap);
     
     /*징계 Tab6*/
     /**
      * 인사기본 TAB6(징계정보) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpTab6Dscpl(EgovMapForNull paramMap);
     
     /*학력 Tab7*/
     /**
      * 인사기본 TAB7(학력) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpTab7Acdmcr(EgovMapForNull paramMap);
     /**
      * 학력 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmpTab7Acdmcr(EgovMapForNull paramMap);
     /**
      * 학력 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhsEmpTab7Acdmcr(EgovMapForNull paramMap);
     
     /*경력 Tab8*/
     /**
      * 인사기본 TAB8(경력) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpTab8Career(EgovMapForNull paramMap);
     /**
      * 경력 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmpTab8Career(EgovMapForNull paramMap);
     /**
      * 경력 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhsEmpTab8Career(EgovMapForNull paramMap);
     
     /*자격 Tab9*/
     /**
      * 인사기본 TAB9(자격) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpTab9Crqfs(EgovMapForNull paramMap);
     /**
      * 자격 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmpTab9Crqfs(EgovMapForNull paramMap);
     /**
      * 자격 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhsEmpTab9Crqfs(EgovMapForNull paramMap);
     
     /*교육 Tab10*/
     /**
      * 인사기본 TAB10(교육정보) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpTab10Edu(EgovMapForNull paramMap);
     
     /*계좌 Tab11*/
     /**
      * 인사기본 TAB11(계좌) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpTab11Acnut(EgovMapForNull paramMap);
     /**
      * 계좌 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmpTab11Acnut(EgovMapForNull paramMap);
     /**
      * 계좌 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhsEmpTab11Acnut(EgovMapForNull paramMap);
     
     /*어학 Tab12*/
     /**
      * 인사기본 TAB12(어학) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmpTab12Fggg(EgovMapForNull paramMap);
     /**
      * 어학 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsEmpTab12Fggg(EgovMapForNull paramMap);
     /**
      * 어학 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhsEmpTab12Fggg(EgovMapForNull paramMap);
     
     
     
     
     
     
     
     
     
     /**
      * 직위코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrb001OfcpsCode(EgovMapForNull paramMap);
     
     /**
      * 직책코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrb001RspofcCode(EgovMapForNull paramMap);
     
     /**
      * 직급 코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrb001ClsfCode(EgovMapForNull paramMap);

 }