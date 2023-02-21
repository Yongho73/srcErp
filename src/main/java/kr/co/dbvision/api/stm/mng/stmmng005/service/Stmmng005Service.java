package kr.co.dbvision.api.stm.mng.stmmng005.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 그룹권한등록에 관한 서비스 인터페이스
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

public interface Stmmng005Service {
     /**
      * 그룹권한등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmRole(EgovMapForNull paramMap);
     /**
      * 그룹권한등록 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmRoleForExcel(EgovMapForNull paramMap);
     /**
      * 그룹권한등록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmRole(EgovMapForNull paramMap);
     /**
      * 그룹권한등록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmRole(EgovMapForNull paramMap);
     /**
      * 그룹권한등록 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyStmRole(EgovMapForNull paramMap);
     /**
      * 그룹권한등록 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeStmRole(EgovMapForNull paramMap);
 }
