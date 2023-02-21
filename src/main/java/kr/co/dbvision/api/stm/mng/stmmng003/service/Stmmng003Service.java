package kr.co.dbvision.api.stm.mng.stmmng003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 공통코드관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.22
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.22          디비비전              최초 생성
 * </pre>
 */

public interface Stmmng003Service {
     /**
      * 공통코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmmng003(EgovMapForNull paramMap);
     /**
      * 공통코드 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmmng003ForExcel(EgovMapForNull paramMap);
     /**
      * 공통코드 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmmng003(EgovMapForNull paramMap);
     /**
      * 공통코드 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmmng003(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchCodeStmmng003(EgovMapForNull paramMap);
     /**
      * 코드 목록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findCodeStmmng003(EgovMapForNull paramMap);
     /**
      * 코드 목록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveCodeStmmng003(EgovMapForNull paramMap) throws Exceptions;
     

     public JSONObject searchStmCodeListAll(EgovMapForNull paramMap);
 }
