package kr.co.dbvision.api.mfs.bsc.mfsbsc007.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 계정별 관리항목관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.04.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.22          디비비전              최초 생성
 * </pre>
 */

public interface Mfsbsc007Service {
     /**
      * 계정별 항목 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMfsbsc007(EgovMapForNull paramMap);
     /**
      * 계정별 항목 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMfsbsc007ForExcel(EgovMapForNull paramMap);
     /**
      * 계정별 항목 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMfsbsc007(EgovMapForNull paramMap);
     /**
      * 계정별 항목 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMfsbsc007(EgovMapForNull paramMap);
     /**
      * 계정별 항목 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMfsbsc007(EgovMapForNull paramMap);
 }
