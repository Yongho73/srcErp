package kr.co.dbvision.api.pub.wks.pubwks005.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 초과근무신청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.24
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.24          디비비전              최초 생성
 * </pre>
 */

public interface Pubwks005Service {
     /**
      * 초과근무신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwks005(EgovMapForNull paramMap);
     /**
      * 대상자의 일주일 데이터 조회
      * @param paramMap
      * @return
      */
     public JSONObject getThreeMonthDataPubwks005(EgovMapForNull paramMap) throws Exception;
     /**
      * 초과근무신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwks005ForExcel(EgovMapForNull paramMap);
     /**
      * 초과근무신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwks005(EgovMapForNull paramMap);
     /**
      * 초과근무신청 반려건을 복사한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject copyPubwks005(EgovMapForNull paramMap);
     /**
      * 초과근무신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubwks005(EgovMapForNull paramMap) throws Exception;
 }
