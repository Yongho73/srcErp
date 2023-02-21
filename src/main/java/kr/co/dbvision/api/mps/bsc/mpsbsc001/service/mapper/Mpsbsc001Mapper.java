package kr.co.dbvision.api.mps.bsc.mpsbsc001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc001.entity.Mpsbsc001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여항목관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.28
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.28          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc001Mapper")
public interface Mpsbsc001Mapper {
     /**
      * 급여항목 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc001List(EgovMapForNull paramMap);
      /**
       * 급여항목 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectMpsbsc001(EgovMapForNull paramMap);
      /**
       * 급여항목 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc001(Mpsbsc001 entity);
      
      public void updateMpsbsc001(Mpsbsc001 entity);
      public void updateMpsbsc002(Mpsbsc001 entity);
      
      public void updateUseEndDe(Mpsbsc001 entity);
      public void updateUseEndDeMpsbsc002(Mpsbsc001 entity);
      /**
       * 급여항목 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc001(Mpsbsc001 entity);
}
