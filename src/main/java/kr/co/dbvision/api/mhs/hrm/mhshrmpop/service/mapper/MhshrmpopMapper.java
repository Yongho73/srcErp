package kr.co.dbvision.api.mhs.hrm.mhshrmpop.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 부서팝업에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.23          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("MhshrmpopMapper")
public interface MhshrmpopMapper {
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
}
