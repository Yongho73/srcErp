package kr.co.dbvision.api.mps.bsc.mpsbsc012.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc012.entity.Mpsbsc012;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 근로소득 간이세액표관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.04.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc012Mapper")
public interface Mpsbsc012Mapper {
     /**
      * 근로소득 간이세액표 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc012List(EgovMapForNull paramMap);
      /**
       * 근로소득 간이세액표 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc012(EgovMapForNull paramMap);
      /**
       * 근로소득 간이세액표 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc012(Mpsbsc012 entity);
      /**
       * 근로소득 간이세액표 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc012(Mpsbsc012 entity);
      

      // 전년도 데이터 삭제
      public void deleteMpsbsc012(EgovMapForNull paramMap);
      // 전년도 데이터 복사
      public void insertCopyApplcYyMpsbsc012(EgovMapForNull paramMap);
}
