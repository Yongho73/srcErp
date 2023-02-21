package kr.co.dbvision.api.stm.mng.stmmng001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사용자관리에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.10          디비비전              최초 생성
 *
 * </pre>
 */

public interface Stmmng001Service {
     /**
      * 사용자 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmUsers(EgovMapForNull paramMap);
     /**
      * 사용자 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmUsersForExcel(EgovMapForNull paramMap);
     /**
      * 사용자 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmUsers(EgovMapForNull paramMap);
     /**
      * 사용자 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmUsers(EgovMapForNull paramMap);     
     /**
      * 권한을 조회
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject searchCheckRole(EgovMapForNull paramMap);
     /**
      * 부서콤보박스
      * @param paramMap
      * @return
      */     
	 public JSONObject searchComboDeptNm(EgovMapForNull paramMap);
 }
