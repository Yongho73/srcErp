package kr.co.dbvision.api.mhs.hrm.mhshrm011.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 인사발령코드관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm011Service {
     /**
      * 인사발령코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm011(EgovMapForNull paramMap);
     /**
      * 인사발령코드 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm011ForExcel(EgovMapForNull paramMap);
     /**
      * 인사발령코드 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm011(EgovMapForNull paramMap);
     /**
      * 인사발령코드 사용여부를 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject deleteCheckMhshrm011(EgovMapForNull paramMap);
     /**
      * 인사발령코드 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm011(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 인사발령코드 목록을 조회한다. - 콤보용
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm011CodeCombo(EgovMapForNull paramMap);
     /**
      * 인사발령코드 사용여부를 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject useCheckMhshrm011(EgovMapForNull paramMap);
 }
