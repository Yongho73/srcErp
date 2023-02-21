package kr.co.dbvision.api.ynd.yta.yndyta008.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ynd.yta.yndyta008.entity.Yndyta008;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 근로소득세액기준관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.09.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.09.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Yndyta008Mapper")
public interface Yndyta008Mapper {
     /**
      * 근로소득세액기준 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectYndyta008List(EgovMapForNull paramMap);
      /**
       * 근로소득세액기준 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectYndyta008(EgovMapForNull paramMap);
      /**
       * 근로소득세액기준 정보를 등록한다.
       * @param paramMap
       */
      public void saveYndyta008(Yndyta008 entity);
      /**
       * 근로소득세액기준 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteYndyta008(Yndyta008 entity);

      /**
       * 전년도 근로소득세액기준 정보를 복사한다.
       * @param paramMap
       */
      public EgovMapForNull findSaveYndyta008(EgovMapForNull paramMap);
      public void insertCopyYndyta008(Yndyta008 entity);
}
