package kr.co.dbvision.api.mps.bsc.mpsbsc001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여항목관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.28
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.28          디비비전              최초 생성
 * </pre>
 */

public interface Mpsbsc001Service {
     /**
      * 급여항목 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsbsc001(EgovMapForNull paramMap);
     /**
      * 급여항목 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsbsc001ForExcel(EgovMapForNull paramMap);
     /**
      * 급여항목 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsbsc001(EgovMapForNull paramMap);
     /**
      * 급여항목 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbsc001(EgovMapForNull paramMap) throws Exceptions;
 }
