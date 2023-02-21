package kr.co.dbvision.api.mhs.hrm.mhshrm008.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 부서팝업에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.06.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.06.03          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mhshrm008Mapper")
public interface Mhshrm008Mapper {
     /**
      * 부서팝업 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsDeptList(EgovMapForNull paramMap);
      /**
       * 부서팝업 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsDept(EgovMapForNull paramMap);
      /**
       * 부서팝업 정보를 등록한다.
       * @param paramMap
       */
      public void insertMhsDept(EgovMapForNull paramMap);
      /**
       * 부서팝업 정보를 수정한다.
       * @param paramMap
       */
      public void updateMhsDept(EgovMapForNull paramMap);
      /**
       * 부서팝업 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsDept(EgovMapForNull paramMap);
}
