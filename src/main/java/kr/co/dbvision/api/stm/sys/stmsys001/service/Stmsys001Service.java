package kr.co.dbvision.api.stm.sys.stmsys001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 시스템환경관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.03.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.16          디비비전              최초 생성
 * </pre>
 */

public interface Stmsys001Service {
     /**
      * 시스템환경관리 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmsys001(EgovMapForNull paramMap);
     /**
      * 시스템환경관리 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmsys001(EgovMapForNull paramMap);
     /**
      * 시스템환경관리 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmsys001(EgovMapForNull paramMap);
     /**
      * 전자결재 시스템환경관리 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findEtsStmsys001(EgovMapForNull paramMap);
     /**
      * 전자결재 시스템환경관리 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveEtsStmsys001(EgovMapForNull paramMap);
     /**
      * 시스템환경관리 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeStmsys001(EgovMapForNull paramMap);
     /**
      * 모듈 사용 항목을 조회
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject searchCheck(EgovMapForNull paramMap);
 }
