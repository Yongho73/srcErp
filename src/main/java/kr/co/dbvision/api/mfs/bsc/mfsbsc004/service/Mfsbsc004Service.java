package kr.co.dbvision.api.mfs.bsc.mfsbsc004.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 법인카드관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 * </pre>
 */

public interface Mfsbsc004Service {
     /**
      * 법인카드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMfsbsc004(EgovMapForNull paramMap);
     /**
      * 법인카드 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMfsbsc004ForExcel(EgovMapForNull paramMap);
     /**
      * 법인카드 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMfsbsc004(EgovMapForNull paramMap);
     /**
      * 법인카드 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMfsbsc004(EgovMapForNull paramMap);
     /**
      * 법인카드 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMfsbsc004(EgovMapForNull paramMap);
 }
