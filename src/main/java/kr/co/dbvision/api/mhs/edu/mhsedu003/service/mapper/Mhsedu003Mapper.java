package kr.co.dbvision.api.mhs.edu.mhsedu003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.edu.mhsedu003.entity.Mhsedu003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 교육결과보고관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.09.09
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.09          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhsedu003Mapper")
public interface Mhsedu003Mapper {
     /**
      * 교육결과보고 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsedu003List(EgovMapForNull paramMap);
      /**
       * 교육결과보고 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsedu003(EgovMapForNull paramMap);
      /**
       * 교육결과보고 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsedu003(Mhsedu003 entity);
      /**
       * 교육결과보고 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsedu003(Mhsedu003 entity);
}
