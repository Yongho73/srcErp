package kr.co.dbvision.api.mps.bsc.mpsbsc007.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 호봉테이블등록관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.09          디비비전              최초 생성
 * </pre>
 */

public interface Mpsbsc007Service {
     /**
      * 호봉테이블등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsbsc007(EgovMapForNull paramMap);
     /**
      * 호봉테이블등록 화면에서 그리드 직급 타이틀을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject selectMpsbsc007ClsfCode(EgovMapForNull paramMap);
     
     
     /**
      * 호봉테이블등록 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsbsc007ForExcel(EgovMapForNull paramMap);
     /**
      * 호봉테이블등록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsbsc007(EgovMapForNull paramMap);
     /**
      * 호봉테이블등록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbsc007(EgovMapForNull paramMap);
     
     
     
     public JSONObject searchMpsbsc007Master(EgovMapForNull paramMap);
     
     public JSONObject findMpsbsc007Master(EgovMapForNull paramMap);
     
     public JSONObject saveMpsbsc007Master(EgovMapForNull paramMap);
     
     public JSONObject removeMpsbsc007Master(EgovMapForNull paramMap);
     
     public JSONObject copyMpsbsc007(EgovMapForNull paramMap);
     
     
 }
