package kr.co.dbvision.api.ets.bst.etsbst001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 전결규정관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2021.03.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.22          디비비전              최초 생성
 * </pre>
 */

public interface Etsbst001Service {
     /**
      * 전결규정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchEtsbst001(EgovMapForNull paramMap);
     /**
      * 전결규정 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchEtsbst001ForExcel(EgovMapForNull paramMap);
     /**
      * 전결규정 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findEtsbst001(EgovMapForNull paramMap);
     /**
      * 전결규정 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveEtsbst001(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 결재레벨을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject searchSanctnLvl(EgovMapForNull paramMap);
 }
