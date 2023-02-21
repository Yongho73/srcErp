package kr.co.dbvision.api.stm.mng.stmmng009.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.mng.stmmng009.entity.Stmmng009;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 다국어관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.28
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.28          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmmng009Mapper")
public interface Stmmng009Mapper {
     /**
      * 다국어 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmmng009List(EgovMapForNull paramMap);
      /**
       * 다국어 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmmng009(EgovMapForNull paramMap);
      /**
       * 다국어 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmmng009(Stmmng009 entity);
      /**
       * 다국어 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmmng009(Stmmng009 entity);
}
