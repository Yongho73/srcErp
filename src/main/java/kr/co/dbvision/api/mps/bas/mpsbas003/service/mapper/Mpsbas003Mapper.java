package kr.co.dbvision.api.mps.bas.mpsbas003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 근로소득 간이세액표에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.11          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mpsbas003Mapper")
public interface Mpsbas003Mapper {
     /**
      * 근로소득 간이세액표 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsSimplctyTaxtblList(EgovMapForNull paramMap);
      /**
       * 근로소득 간이세액표 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsSimplctyTaxtbl(EgovMapForNull paramMap);
      /**
       * 근로소득 간이세액표 정보를 등록한다.
       * @param paramMap
       */
      public void insertMpsSimplctyTaxtbl(EgovMapForNull paramMap);
      /**
       * 근로소득 간이세액표 정보를 수정한다.
       * @param paramMap
       */
      public void updateMpsSimplctyTaxtbl(EgovMapForNull paramMap);
      /**
       * 근로소득 간이세액표 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsSimplctyTaxtbl(EgovMapForNull paramMap);
      /**
       * 근로소득 간이세액표 엑셀파일을 수정한다.
       * @param paramMap
       */
      public void excelUploadMpsSimplctyTaxtbl(EgovMapForNull paramMap);
      
      /**
       * 근로소득 간이세액표 엑셀파일을 수정한다.
       * @param paramMap
       */
      public void excelUploadMpsSimplctyTaxtbl2(EgovMapForNull paramMap);
      
}
