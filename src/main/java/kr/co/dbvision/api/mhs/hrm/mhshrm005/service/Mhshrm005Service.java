package kr.co.dbvision.api.mhs.hrm.mhshrm005.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 부서조직관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.04.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.21          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm005Service {
     /**
      * 부서조직 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm005(EgovMapForNull paramMap);
     /**
      * 부서조직 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm005ForExcel(EgovMapForNull paramMap);
     /**
      * 부서조직 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm005(EgovMapForNull paramMap);
     /**
      * 부서조직 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm005(EgovMapForNull paramMap);
     /**
      * 부서조직 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhshrm005(EgovMapForNull paramMap);
     
     public JSONObject selectMhshrm005RspofcCodeCombo(EgovMapForNull paramMap);
 }
