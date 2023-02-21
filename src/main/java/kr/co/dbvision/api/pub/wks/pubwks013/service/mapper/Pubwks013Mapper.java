package kr.co.dbvision.api.pub.wks.pubwks013.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wks.pubwks013.entity.Pubwks013;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 출장복명관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubwks013Mapper")
public interface Pubwks013Mapper {
    /**
     * 사용자 데이터를 조회한다.
     * @param paramMap
     * @return
     */
    public EgovMapForNull userDataPubwks013(EgovMapForNull paramMap);
     /**
      * 출장복명 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubwks013List(EgovMapForNull paramMap);
      /**
       * 출장복명 출장 대상자를 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectPubwks013DtlList(EgovMapForNull paramMap);
      /**
       * 출장복명 출장 정산을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectPubwks013Dtl2List(EgovMapForNull paramMap);
      /**
       * 출장복명 상세내용을 조회한다.
       * @param paramMap
       * @return
       */      
      public EgovMapForNull selectPubwks013(EgovMapForNull paramMap);
      /**
       * 출장테이블 첨부파일 업데이트
       * @param entity
       * @return
       */      
      public void updateBsrpAtchflNoPubwks013(Pubwks013 entity);
      /**
       * 반려 건 복사 전 체크
       * @param entity
       * @return
       */      
      public Integer selectExcclcSnCnt(EgovMapForNull paramMap);
      /**
       * 반려 건 출장_정산 테이블 복사
       * @param entity
       * @return
       */      
      public void saveExcclcCopyPubwks013(EgovMapForNull paramMap);
      /**
       * 반려 건 출장_정산_상세 테이블 복사
       * @param entity
       * @return
       */      
      public void saveExcclcDetailCopyPubwks013(EgovMapForNull paramMap);
      /**
       * 출장복명 정산 정보를 등록한다.
       * @param entity
       */
      public void saveExcclcPubwks013(Pubwks013 entity);
      /**
       * 출장 테이블 출장 전자 결재 구분 순번 업데이트
       * @param entity
       */
      public void updateBsrpExcclcSn(EgovMapForNull paramMap);
      

}
