package kr.co.dbvision.api.mps.cal.mpscal023.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal023.entity.Mpscal023;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 연차수당관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal023Mapper")
public interface Mpscal023Mapper {
     /**
      * 연차수당 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscal023List(EgovMapForNull paramMap);
      /**
       * 연차수당 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal023(EgovMapForNull paramMap);
      /**
       * 연차수당 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal023(Mpscal023 entity);
      /**
       * 연차수당 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal023(Mpscal023 entity);
      /**
       * 연차수당 재계산한 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMpscal023ReCalcList(EgovMapForNull paramMap);
}
