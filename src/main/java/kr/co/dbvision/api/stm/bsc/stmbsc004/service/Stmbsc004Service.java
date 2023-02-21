package kr.co.dbvision.api.stm.bsc.stmbsc004.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 영업일(공휴일관리)관리에 관한 서비스 인터페이스 클래스
*
* @author 디비비전
* @since 2020.03.16
* @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.15)
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

public interface Stmbsc004Service {
     /**
      * 영업일(공휴일관리) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmbsc004(EgovMapForNull paramMap);
     /**
      * 영업일(공휴일관리) 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmbsc004ForExcel(EgovMapForNull paramMap);
     /**
      * 영업일(공휴일관리) 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmbsc004(EgovMapForNull paramMap);
     /**
      * 영업일(공휴일관리) 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmbsc004(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 영업일(공휴일관리) 정보를 초기화한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject resetDeStmbsc004(EgovMapForNull paramMap);
 }
