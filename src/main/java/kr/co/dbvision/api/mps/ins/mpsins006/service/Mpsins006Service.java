package kr.co.dbvision.api.mps.ins.mpsins006.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험보수월액관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.22
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.22          디비비전              최초 생성
 * </pre>
 */

public interface Mpsins006Service {
     /**
      * 사회보험보수월액 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsins006(EgovMapForNull paramMap);
     /**
      * 사회보험보수월액 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsins006ForExcel(EgovMapForNull paramMap);
     /**
      * 사회보험보수월액 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsins006(EgovMapForNull paramMap);
     /**
      * 사회보험보수월액 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsins006(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 근로자/사업자 합계 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject findMpsinsSUM(EgovMapForNull paramMap);
     /**
      * 엑셀 업로드 데이터를 확인한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject checkDataMpsins006(EgovMapForNull paramMap, StringBuffer strBfReq);
 }
