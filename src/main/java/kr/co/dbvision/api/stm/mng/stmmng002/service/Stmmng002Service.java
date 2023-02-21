package kr.co.dbvision.api.stm.mng.stmmng002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 메뉴관리에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.16          디비비전              최초 생성
 *
 * </pre>
 */

public interface Stmmng002Service {
     /**
      * 메뉴 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmMenu(EgovMapForNull paramMap);
     /**
      * 메뉴 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmMenuForExcel(EgovMapForNull paramMap);
     /**
      * 메뉴 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmMenu(EgovMapForNull paramMap);
     /**
      * 메뉴 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmMenu(EgovMapForNull paramMap);
     /**
      * 메뉴 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyStmMenu(EgovMapForNull paramMap);
     /**
      * 메뉴 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeStmMenu(EgovMapForNull paramMap);
     /**
      * 순서수정
      * @param paramMap
      * @return
      */
     public JSONObject modifyOrder(EgovMapForNull paramMap);
     /**
      * 중복메뉴체크
      * @param paramMap
      * @return
      */
     public JSONObject findDupMenuId(EgovMapForNull paramMap);
     /**
      * 프로그램 목록
      * @return
      */
     public JSONObject searchProgm();
 }
