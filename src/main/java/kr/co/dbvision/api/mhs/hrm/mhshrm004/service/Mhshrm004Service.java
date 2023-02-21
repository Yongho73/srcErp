package kr.co.dbvision.api.mhs.hrm.mhshrm004.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 직급코드관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.26
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.26)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.26          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm004Service {
     /**
      * 직급코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm004(EgovMapForNull paramMap);
     /**
      * 직급코드 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm004ForExcel(EgovMapForNull paramMap);
     /**
      * 직급코드 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm004(EgovMapForNull paramMap);
     /**
      * 직급코드 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm004(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 직급코드 사용여부를 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject useCheckMhshrm004(EgovMapForNull paramMap);
     /**
      * 직급코드 콤보 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrb004ClsfCodeCombo(EgovMapForNull paramMap);
 }
