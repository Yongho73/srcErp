package kr.co.dbvision.api.stm.qes.stmqes001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 설문관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.04          디비비전              최초 생성
 * </pre>
 */

public interface Stmqes001Service {
     /**
      * 설문 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmqes001(EgovMapForNull paramMap);
     /**
      * 설문 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmqes001ForExcel(EgovMapForNull paramMap);
     /**
      * 설문 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmqes001(EgovMapForNull paramMap);
     /**
      * 설문 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmqes001(EgovMapForNull paramMap) throws Exceptions;
     
     /**
      * 설문 대상자 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject searchStmqesTrget(EgovMapForNull paramMap) throws Exceptions;
     public JSONObject saveStmqesTrget(EgovMapForNull paramMap) throws Exceptions;
     
     /**
      * 설문 내용 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject searchStmqestrnarCn(EgovMapForNull paramMap) throws Exceptions;
     public JSONObject saveStmqestrnarCn(EgovMapForNull paramMap) throws Exceptions;
     public JSONObject searchStmqesR(EgovMapForNull paramMap) throws Exceptions;
     public JSONObject saveStmqesR(EgovMapForNull paramMap) throws Exceptions;
     
 }
