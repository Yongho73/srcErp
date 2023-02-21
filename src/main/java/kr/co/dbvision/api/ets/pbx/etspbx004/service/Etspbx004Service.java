package kr.co.dbvision.api.ets.pbx.etspbx004.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 수신문서관리에 관한 서비스 인터페이스 클래스
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

public interface Etspbx004Service {
     /**
      * 수신문서 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchEtspbx004(EgovMapForNull paramMap);
     /**
      * 수신문서 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchEtspbx004ForExcel(EgovMapForNull paramMap);
     /**
      * 수신문서 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findEtspbx004(EgovMapForNull paramMap);
     /**
      * 수신문서 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveEtspbx004(EgovMapForNull paramMap) throws Exceptions;
 }
