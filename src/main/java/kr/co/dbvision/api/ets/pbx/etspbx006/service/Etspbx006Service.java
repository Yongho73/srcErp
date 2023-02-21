package kr.co.dbvision.api.ets.pbx.etspbx006.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 공람문서관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2021.03.24
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.24          디비비전              최초 생성
 * </pre>
 */

public interface Etspbx006Service {
     /**
      * 공람문서 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchEtspbx006(EgovMapForNull paramMap);
     /**
      * 공람문서 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchEtspbx006ForExcel(EgovMapForNull paramMap);
     /**
      * 공람문서 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findEtspbx006(EgovMapForNull paramMap);
     /**
      * 공람문서 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveEtspbx006(EgovMapForNull paramMap) throws Exceptions;
 }
