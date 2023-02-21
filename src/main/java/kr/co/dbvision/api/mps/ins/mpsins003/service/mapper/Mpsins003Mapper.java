package kr.co.dbvision.api.mps.ins.mpsins003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.ins.mpsins003.entity.Mpsins003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사회보험 자격취득관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsins003Mapper")
public interface Mpsins003Mapper {
     /**
      * 사회보험 자격취득 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsins003List(EgovMapForNull paramMap);
      /**
       * 사회보험 자격취득 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsins003(EgovMapForNull paramMap);
      /**
       * 사회보험 자격취득 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsins003(Mpsins003 entity);
      /**
       * 사회보험 자격취득 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsins003(Mpsins003 entity);
}
