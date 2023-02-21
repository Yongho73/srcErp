package kr.co.dbvision.api.mps.ins.mpsins001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.ins.mpsins001.entity.Mpsins001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사회보험월별납부관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.11
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.11)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.11          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsins001Mapper")
public interface Mpsins001Mapper {
     /**
      * 사회보험월별납부 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsins001List(EgovMapForNull paramMap);
      /**
       * 사회보험월별납부 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsins001(EgovMapForNull paramMap);
      /**
       * 사회보험월별납부 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsins001(Mpsins001 entity);
      /**
       * 사회보험월별납부 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsins001(Mpsins001 entity);
      
      /**
       * 엑셀 데이터를 검사한다.
       * @param paramMap
       */
      public List<EgovMapForNull> checkDataMpsins001(EgovMapForNull paramMap);
      
}
