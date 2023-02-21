package kr.co.dbvision.api.ets.box.etsbox003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ets.box.etsbox003.entity.Etsbox003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 공람문서관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.03.26
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.26)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.26          디비비전              최초 생성
 * </pre>
 */

@Mapper("Etsbox003Mapper")
public interface Etsbox003Mapper {
     /**
      * 공람문서 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectEtsbox003List(EgovMapForNull paramMap);
      /**
       * 공람문서 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtsbox003(EgovMapForNull paramMap);
      /**
       * 공람문서 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtsbox003(Etsbox003 entity);
      /**
       * 공람문서 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtsbox003(Etsbox003 entity);
}
