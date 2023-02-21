package kr.co.dbvision.api.mps.cal.mpscal022.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인별급여기준등록관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */

public interface Mpscal022Service {
     /**
      * 개인별급여기준등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal022(EgovMapForNull paramMap);
     /**
      * 개인별급여기준등록 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpscal022ForExcel(EgovMapForNull paramMap);
     /**
      * 개인별급여기준등록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscal022(EgovMapForNull paramMap);
     /**
      * 개인별급여기준등록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscal022(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 개인별급여기준등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscalEmp(EgovMapForNull paramMap);
     /**
      * 인사기본 정보를 수정한다. : 기본 페이지 부분
      * @param paramMap 
      * @throws Exceptions
      */
     public JSONObject modifyMhsEmp(EgovMapForNull paramMap);
     
     /**
      * 급여_가족 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscalFamily(EgovMapForNull paramMap);
     /**
      * 급여_가족 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscalFamily(EgovMapForNull paramMap);
     /**
      * 급여_가족 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscalFamily(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 급여_계좌 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscalAcnut(EgovMapForNull paramMap);
     /**
      * 급여_계좌 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscalAcnut(EgovMapForNull paramMap);
     /**
      * 급여_계좌 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscalAcnut(EgovMapForNull paramMap) throws Exceptions;
     
     /**
      * 급여_자격 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscalCrqfs(EgovMapForNull paramMap);
     /**
      * 급여_자격 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscalCrqfs(EgovMapForNull paramMap);
     /**
      * 급여_자격 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscalCrqfs(EgovMapForNull paramMap) throws Exceptions;
     
     /**
      * 급여_지급 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscalStdr(EgovMapForNull paramMap);
     /**
      * 급여_지급 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscalStdr(EgovMapForNull paramMap);
     /**
      * 급여_지급 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscalStdr(EgovMapForNull paramMap) throws Exceptions;
     
 }
