package kr.co.dbvision.api.mhs.hrm.mhshrm002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 부서코드등록관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm002Service {
     /**
      * 부서코드등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm002(EgovMapForNull paramMap);
     /**
      * 부서코드등록 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm002ForExcel(EgovMapForNull paramMap);
     /**
      * 부서코드등록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm002(EgovMapForNull paramMap);
     /**
      * 부서 코드 사용여부를 확인한다.
      */
     public JSONObject findMhshrm003(EgovMapForNull paramMap);
     /**
      * 부서코드등록 정보를 삭제한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject deleteMhshrm002(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 부서코드등록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm002(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 부서코드을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject selectMhshrm002DeptCodeCombo(EgovMapForNull paramMap);
 }
