package kr.co.dbvision.api.pub.wks.pubwks022.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인휴무신청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.09.02
 * @version 1.0
 * @sourceGen version 2020.09.02.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 * </pre>
 */

public interface Pubwks022Service {
     /**
      * 개인휴무신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwks022(EgovMapForNull paramMap);
     /**
      * 개인휴무신청 사원 목록 을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchEmpPubwks022(EgovMapForNull paramMap);
     /**
      * 개인휴무신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwks022ForExcel(EgovMapForNull paramMap);
     /**
      * 개인휴무신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwks022(EgovMapForNull paramMap);
     /**
      * 달력 생성
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject makeCalendar(EgovMapForNull paramMap);
     /**
      * 개인휴무신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubwks022(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 개인휴무신청 정보를 일괄 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveBundlePubwks022(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 결재 상태 수정
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject sttusUpdatePubwks022(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 일괄 결재 상태 수정
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject bundleSttusUpdatePubwks022(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 개인휴무신청 정보를 삭제한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject deletePubwks022(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 반려 상태 데이터를 구분 순번 증가 시켜 복사한다
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject copyPubwks022(EgovMapForNull paramMap) throws Exceptions;
}
