package kr.co.dbvision.api.pub.wks.pubwks005.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wks.pubwks005.entity.Pubwks005;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 초과근무신청관리에 관한 매퍼 클래스
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

@Mapper("Pubwks005Mapper")
public interface Pubwks005Mapper {
     /**
      * 초과근무신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubwks005List(EgovMapForNull paramMap);
      /**
       * 대상자의 정상 근무 시간 조회 - 시차 근무
       * @param paramMap
       * @return
       */
       public EgovMapForNull selectStanWorkTimeTmdiffPubwks005(EgovMapForNull paramMap);
       /**
        * 대상자의 정상 근무 시간 조회 - 개인별 근무 유형
        * @param paramMap
        * @return
        */
        public EgovMapForNull selectStanWorkTimeIndvdPubwks005(EgovMapForNull paramMap);
       /**
       * 대상자의 데이터 조회
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectThreeMonthDataPubwks005(Pubwks005 entity);
       /**
        * 대상자의 근무유형 데이터 조회
        * @param paramMap
        * @return
        */
        public List<EgovMapForNull> selectThreeMonthOvtimeDataPubwks005(Pubwks005 entity);
        /**
        * 대상자의 근무유형 데이터 조회
        * @param paramMap
        * @return
        */
        public int selectHolidayCnt(EgovMapForNull paramMap);
      /**
       * 초과근무신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubwks005(EgovMapForNull paramMap);
      /**
       * 신청일자 휴무일 체크 - 개인휴무신청테이블
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStanHvofDeIndvdHvofMgrtPubwks005(EgovMapForNull paramMap);
      /**
       * 신청일자 휴무일체크 - 영업일 테이블
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStanHvofDeStmJobdePubwks005(EgovMapForNull paramMap);      
      /**
       * 초과근무신청 정보를 등록한다.
       * @param paramMap
       */
      public void savePubwks005(Pubwks005 entity);
      /**
       * 초과근무신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubwks005(Pubwks005 entity);
      /**
       * 초과근무신청 정보를 복사한다.
       * @param paramMap
       */
      public void copyPubwks005(EgovMapForNull paramMap);

}
