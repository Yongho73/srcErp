package kr.co.dbvision.api.ynd.yta.yndyta009.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ynd.yta.yndyta009.entity.Yndyta009;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 과세기준관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.09.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.04          디비비전              최초 생성
 * </pre>
 */

@Mapper("Yndyta009Mapper")
public interface Yndyta009Mapper {
     /**
      * 과세기준 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectYndyta009List(EgovMapForNull paramMap);
      /**
       * 과세기준 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectYndyta009(EgovMapForNull paramMap);
      /**
       * 과세기준 정보를 등록한다.
       * @param paramMap
       */
      public void saveYndyta009(Yndyta009 entity);
      /**
       * 과세기준 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteYndyta009(Yndyta009 entity);
      /**
       * 전년도 과세기준 상세내용을 조회한다. / 저장한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull findSaveYndyta009(EgovMapForNull paramMap);
      public void insertCopyYndyta009(Yndyta009 entity);
}
