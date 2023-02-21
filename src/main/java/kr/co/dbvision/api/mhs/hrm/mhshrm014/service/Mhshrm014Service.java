package kr.co.dbvision.api.mhs.hrm.mhshrm014.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 직책관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.03.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.17          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm014Service {
     /**
      * 직책관리 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm014(EgovMapForNull paramMap);
     /**
      * 직책관리 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm014ForExcel(EgovMapForNull paramMap);
     /**
      * 직책관리 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm014(EgovMapForNull paramMap);
     /**
      * 직책관리 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm014(EgovMapForNull paramMap);
     /**
      * 직책관리 사용여부를 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject useCheckMhshrm014(EgovMapForNull paramMap);
     
     public JSONObject selectMhshrm014RspofcCodeCombo(EgovMapForNull paramMap);
 }
