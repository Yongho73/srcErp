package kr.co.dbvision.api.mhs.hrm.mhshrm007.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 학교코드관리에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.13
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.13          디비비전              최초 생성
 *
 * </pre>
 */

public interface Mhshrm007Service {
     /**
      * 학교코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsSchulCode(EgovMapForNull paramMap);
     /**
      * 학교코드 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhsSchulCodeForExcel(EgovMapForNull paramMap);
     /**
      * 학교코드 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhsSchulCode(EgovMapForNull paramMap);
     /**
      * 학교코드 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsSchulCode(EgovMapForNull paramMap);
     /**
      * 학교코드 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyMhsSchulCode(EgovMapForNull paramMap);
     /**
      * 학교코드 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhsSchulCode(EgovMapForNull paramMap);
 }
