package kr.co.dbvision.api.pub.wks.pubwks022.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wks.pubwks022.entity.Pubwks022;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인휴무신청관리에 관한 매퍼 클래스
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

@Mapper("Pubwks022Mapper")
public interface Pubwks022Mapper {
     /**
      * 개인휴무신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubwks022List(EgovMapForNull paramMap);
      /**
       * 사원 그리드 조회 전 개인 휴무신청 테이블 조회
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectEmpnoElctsctSeSnPubwks022(EgovMapForNull paramMap);      
      /**
       * 사원 그리드 조회 전 개인 휴무신청 전자결재 상태 조회
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectElctsctSttusCodePubwks022(EgovMapForNull paramMap);
      /**
       * 개인휴무신청 사원 목록을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectEmpListPubwks022(EgovMapForNull paramMap);
      /**
       * 개인휴무신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubwks022(EgovMapForNull paramMap);
      /**
       * 개인휴무신청 정보를 등록한다.
       * @param paramMap
       */
      public void savePubwks022(Pubwks022 entity);
      /**
       * 개인휴무신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubwks022(Pubwks022 entity);
      /**
       * 달력 조회
       * @param paramMap
       */
      public List<EgovMapForNull> selectCalendar(EgovMapForNull paramMap);
      /**
       * 저장 전 승인 상태 체크
       * @param paramMap
       */
      public int saveBeforeCheckSttusCode(Pubwks022 entity);
      /**
       * 일괄 저장 전 승인 상태 체크
       * @param paramMap
       */
      public int bundleSaveBeforeCheckSttusCode(Pubwks022 entity);
      /**
       * 승인상태 수정
       * @param paramMap
       */
      public void updateBundleSttusPubwks022(Pubwks022 entity);
      /**
       * 일괄 저장 전 선택한 요일에 해당하는 일자 조회
       * @param paramMap
       */
      public List<EgovMapForNull> selectJobDeForBundleSave(EgovMapForNull paramMap);
      /**
       * 반려 요청 한 월의 구분 순번 체크
       * @param paramMap
       */
      public int copyBeforeElctsctSeSnCheck(EgovMapForNull paramMap);
      /**
       * 반려 상태인 데이터들 구분 순번 증갓하여 복사
       * @param paramMap
       */
      public void copyPubwks022(EgovMapForNull paramMap);
      
}
