package kr.co.dbvision.api.stm.mng.stmmng008.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 버튼관리에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.17          디비비전              최초 생성
 *
 * </pre>
 */

public interface Stmmng008Service {
     /**
      * 버튼 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmBtn(EgovMapForNull paramMap);
     /**
      * 버튼 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmBtnForExcel(EgovMapForNull paramMap);
     /**
      * 버튼 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmBtn(EgovMapForNull paramMap);
     /**
      * 버튼 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmBtn(EgovMapForNull paramMap);
     /**
      * 버튼 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyStmBtn(EgovMapForNull paramMap);
     /**
      * 버튼 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeStmBtn(EgovMapForNull paramMap);
 }
