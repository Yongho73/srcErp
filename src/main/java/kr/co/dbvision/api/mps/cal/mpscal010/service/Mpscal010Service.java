package kr.co.dbvision.api.mps.cal.mpscal010.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 초과근무수당관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.18
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.18          디비비전              최초 생성
 * </pre>
 */

public interface Mpscal010Service {
     /**
      * 초과근무수당 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal010(EgovMapForNull paramMap);
     /**
      * 초과근무수당 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpscal010ForExcel(EgovMapForNull paramMap);
     /**
      * 초과근무수당 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscal010(EgovMapForNull paramMap);
     /**
      * 초과근무수당 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscal010(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 초과근무수당 재계산한  목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal010ReCalc(EgovMapForNull paramMap);
 }
