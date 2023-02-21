package kr.co.dbvision.api.mps.ern.mpsern009.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득자별원천징수영수증관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.18
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.18          디비비전              최초 생성
 * </pre>
 */

public interface Mpsern009Service {
     /**
      * 소득자별원천징수영수증 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsern009(EgovMapForNull paramMap);
     /**
      * 소득자별원천징수영수증 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsern009ForExcel(EgovMapForNull paramMap);
     /**
      * 소득자별원천징수영수증 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsern009(EgovMapForNull paramMap);
     /**
      * 소득자별원천징수영수증 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsern009(EgovMapForNull paramMap) throws Exceptions;
 }
