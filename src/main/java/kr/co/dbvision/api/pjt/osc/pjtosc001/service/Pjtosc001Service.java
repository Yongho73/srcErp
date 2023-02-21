package kr.co.dbvision.api.pjt.osc.pjtosc001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 아웃소싱 인력현황관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2021.06.24
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.24          디비비전              최초 생성
 * </pre>
 */

public interface Pjtosc001Service {
     /**
      * 아웃소싱 인력현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPjtosc001(EgovMapForNull paramMap);
     /**
      * 아웃소싱 인력현황 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPjtosc001ForExcel(EgovMapForNull paramMap);
     /**
      * 아웃소싱 인력현황 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPjtosc001(EgovMapForNull paramMap);
     /**
      * 아웃소싱 인력현황 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePjtosc001(EgovMapForNull paramMap) throws Exceptions;
 }
