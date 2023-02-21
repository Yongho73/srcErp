package kr.co.dbvision.api.mps.ins.mpsins001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험월별납부관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.11
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.11)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.11          디비비전              최초 생성
 * </pre>
 */

public interface Mpsins001Service {
     /**
      * 사회보험월별납부 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsins001(EgovMapForNull paramMap);
     /**
      * 사회보험월별납부 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsins001ForExcel(EgovMapForNull paramMap);
     /**
      * 사회보험월별납부 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsins001(EgovMapForNull paramMap);
     /**
      * 사회보험월별납부 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsins001(EgovMapForNull paramMap) throws Exceptions;
     
     /**
      * 엑셀 업로드 데이터를 확인한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject checkDataMpsins001(EgovMapForNull paramMap, StringBuffer strBfReq);
     
 }
