package kr.co.dbvision.api.mhs.hrm.mhshrm015.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 직위관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm015Service {
     /**
      * 직위 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm015(EgovMapForNull paramMap);
     /**
      * 직위 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm015ForExcel(EgovMapForNull paramMap);
     /**
      * 직위 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm015(EgovMapForNull paramMap);
     /**
      * 직위 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm015(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 직위콤보 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject selectMhshrm015OfcpsCodeCombo(EgovMapForNull paramMap);
     
     /**
      * 직위 사용여부를 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject checkDeleteMhshrm015(EgovMapForNull paramMap);
 }