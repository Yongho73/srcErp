package kr.co.dbvision.api.mhs.edu.mhsedu004.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.edu.mhsedu004.entity.Mhsedu004;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 교육결과보고관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.10.07
 * @version 1.0
 * @sourceGen version 2020.09.13.01 (2020.10.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.10.07          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhsedu004Mapper")
public interface Mhsedu004Mapper {
     /**
      * 교육결과보고 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsedu004List(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectMhseduTime(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectMhseduTime2(EgovMapForNull paramMap);
      /**
       * 교육결과보고 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsedu004(EgovMapForNull paramMap);
      /**
       * 교육결과보고 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsedu004(Mhsedu004 entity);
      public void saveMhseduTime(Mhsedu004 entity);
      public void updateClosAt(Mhsedu004 entity);
      public void updateClos(Mhsedu004 entity);
      public int updateSttusMhsedu004(EgovMapForNull paramMap);
      public int updateSttusReturn(EgovMapForNull paramMap);
      /**
       * 교육결과보고 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsedu004(Mhsedu004 entity);
}
