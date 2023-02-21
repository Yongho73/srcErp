package kr.co.dbvision.api.mps.ins.mpsins006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.ins.mpsins006.entity.Mpsins006;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사회보험보수월액관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.22
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.22          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsins006Mapper")
public interface Mpsins006Mapper {
     /**
      * 사회보험보수월액 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsins006List(EgovMapForNull paramMap);
      /**
       * 사회보험보수월액 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsins006(EgovMapForNull paramMap);
      /**
       * 사회보험보수월액 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsins006(Mpsins006 entity);
      /**
       * 사회보험보수월액 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsins006(Mpsins006 entity);
      /**
       * 근로자, 사업자 합계 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> findMpsinsSUM(EgovMapForNull paramMap);
      
      /**
       * 엑셀 데이터를 검사한다.
       * @param paramMap
       */
      public List<EgovMapForNull> checkDataMpsins006(EgovMapForNull paramMap);
}
