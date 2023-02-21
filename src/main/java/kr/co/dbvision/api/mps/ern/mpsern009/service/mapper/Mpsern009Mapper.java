package kr.co.dbvision.api.mps.ern.mpsern009.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.ern.mpsern009.entity.Mpsern009;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 소득자별원천징수영수증관리에 관한 매퍼 클래스
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

@Mapper("Mpsern009Mapper")
public interface Mpsern009Mapper {
     /**
      * 소득자별원천징수영수증 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsern009List(EgovMapForNull paramMap);
      /**
       * 소득자별원천징수영수증 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsern009(EgovMapForNull paramMap);
      /**
       * 소득자별원천징수영수증 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsern009(Mpsern009 entity);
      /**
       * 소득자별원천징수영수증 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsern009(Mpsern009 entity);
}
