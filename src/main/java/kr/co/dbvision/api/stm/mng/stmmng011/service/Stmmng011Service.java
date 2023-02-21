package kr.co.dbvision.api.stm.mng.stmmng011.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로그램개선요청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */

public interface Stmmng011Service {
     /**
      * 프로그램개선요청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmmng011(EgovMapForNull paramMap);
     /**
      * 프로그램개선요청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmmng011ForExcel(EgovMapForNull paramMap);
     /**
      * 프로그램개선요청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmmng011(EgovMapForNull paramMap);
     /**
      * 프로그램개선요청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmmng011(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 프로그램개선요청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmPrgRequst(EgovMapForNull paramMap);
     /**
      * 프로그램개선요청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmPrgRequst(EgovMapForNull paramMap);
     /**
      * 프로그램개선요청 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyStmPrgRequst(EgovMapForNull paramMap);
     /**
      * 프로그램개선요청 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeStmPrgRequst(EgovMapForNull paramMap);
     
     public JSONObject searchMenu(EgovMapForNull paramMap);
 }
