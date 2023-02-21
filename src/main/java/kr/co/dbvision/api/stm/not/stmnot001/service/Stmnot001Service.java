package kr.co.dbvision.api.stm.not.stmnot001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * ERP게시판관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.21
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.21          디비비전              최초 생성
 * </pre>
 */

public interface Stmnot001Service {
     /**
      * ERP게시판 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmnot001(EgovMapForNull paramMap);
     /**
      * ERP게시판 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmnot001ForExcel(EgovMapForNull paramMap);
     /**
      * ERP게시판 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmnot001(EgovMapForNull paramMap);
     /**
      * ERP게시판 공지대상 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject gridStmnot001(EgovMapForNull paramMap);
     /**
      * ERP게시판 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmnot001(EgovMapForNull paramMap) throws Exceptions;
     /**
      * ERP게시판 공지대상 목록를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmnot001Popup(EgovMapForNull paramMap) throws Exceptions;
     /**
      * ERP게시판 상세 삭제
      * @param paramMap
      * @return
      */
     public JSONObject deleteStmnot001(EgovMapForNull paramMap);
 }
