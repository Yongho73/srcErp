package kr.co.dbvision.api.stm.mng.stmmng007.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로그램ID  관리에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2020.02.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.22          디비비전              최초 생성
 *
 * </pre>
 */

public interface Stmmng007Service {
     /**
      * 프로그램ID   목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmProgrm(EgovMapForNull paramMap);
     /**
      * 프로그램ID   조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmProgrmForExcel(EgovMapForNull paramMap);
     /**
      * 프로그램ID   상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmProgrm(EgovMapForNull paramMap);
     /**
      * 프로그램ID   정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmProgrm(EgovMapForNull paramMap);

     /**
      * 프로그램 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmProgrmNew(EgovMapForNull paramMap) throws Exceptions;    
     /**
      * 프로그램ID   정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeStmProgrm(EgovMapForNull paramMap);
 }
