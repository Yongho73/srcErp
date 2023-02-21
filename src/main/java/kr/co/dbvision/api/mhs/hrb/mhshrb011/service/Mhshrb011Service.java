package kr.co.dbvision.api.mhs.hrb.mhshrb011.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 생일자현황조회관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2021.05.21
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.05.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.05.21          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrb011Service {
     /**
      * 생일자현황조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrb011(EgovMapForNull paramMap);
     /**
      * 생일자현황조회 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrb011ForExcel(EgovMapForNull paramMap);
     /**
      * 생일자현황조회 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrb011(EgovMapForNull paramMap);
     /**
      * 생일자현황조회 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrb011(EgovMapForNull paramMap) throws Exceptions;
 }
