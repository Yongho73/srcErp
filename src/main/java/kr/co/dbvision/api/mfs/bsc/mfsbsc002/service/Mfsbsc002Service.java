package kr.co.dbvision.api.mfs.bsc.mfsbsc002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 거래처관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.03.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.10          디비비전              최초 생성
 * </pre>
 */

public interface Mfsbsc002Service {
     /**
      * 거래처관리 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMfsbsc002(EgovMapForNull paramMap);
     /**
      * 거래처관리 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMfsbsc002ForExcel(EgovMapForNull paramMap);
     /**
      * 거래처관리 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMfsbsc002(EgovMapForNull paramMap);
     /**
      * 거래처관리 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMfsbsc002(EgovMapForNull paramMap);
     /**
      * 거래처관리 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMfsbsc002(EgovMapForNull paramMap);
 }
