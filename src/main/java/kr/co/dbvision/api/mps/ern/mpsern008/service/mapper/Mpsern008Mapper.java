package kr.co.dbvision.api.mps.ern.mpsern008.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.ern.mpsern008.entity.Mpsern008;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 소득자별소득현황관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.18
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.18          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsern008Mapper")
public interface Mpsern008Mapper {
     /**
      * 소득자별소득현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsern008List(EgovMapForNull paramMap);
      /**
       * 소득자별소득현황 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsern008(EgovMapForNull paramMap);
      /**
       * 소득자별소득현황 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsern008(Mpsern008 entity);
      /**
       * 소득자별소득현황 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsern008(Mpsern008 entity);
}
