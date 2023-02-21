package kr.co.dbvision.api.mtx.bsc.mtxbsc001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mtx.bsc.mtxbsc001.entity.Mtxbsc001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 소득세율관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mtxbsc001Mapper")
public interface Mtxbsc001Mapper {
     /**
      * 소득세율 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMtxbsc001List(EgovMapForNull paramMap);
      /**
       * 소득세율 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMtxbsc001(EgovMapForNull paramMap);
      /**
       * 소득세율 정보를 등록한다.
       * @param paramMap
       */
      public void saveMtxbsc001(Mtxbsc001 entity);
      /**
       * 소득세율 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMtxbsc001(Mtxbsc001 entity);
      
      // 전년도 데이터 삭제
      public void deleteApplcYyYear(EgovMapForNull paramMap);
      // 전년도 데이터 복사
      public void insertCopyApplcYy(EgovMapForNull paramMap);
      // 년도 별 리스트
      public List<EgovMapForNull> searchapplcYearList(EgovMapForNull paramMap);
}
