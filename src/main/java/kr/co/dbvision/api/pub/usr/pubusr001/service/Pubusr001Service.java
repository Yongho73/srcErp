package kr.co.dbvision.api.pub.usr.pubusr001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인정보조회관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2021.05.28
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.05.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.05.28          디비비전              최초 생성
 * </pre>
 */

public interface Pubusr001Service {
     /**
      * 개인정보조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubusr001(EgovMapForNull paramMap);
     /**
      * 개인정보조회 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubusr001ForExcel(EgovMapForNull paramMap);
     /**
      * 개인정보조회 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubusr001(EgovMapForNull paramMap);
     /**
      * 개인정보조회 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubusr001(EgovMapForNull paramMap) throws Exceptions;
 }
