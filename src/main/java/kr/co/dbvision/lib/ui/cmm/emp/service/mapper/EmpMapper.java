package kr.co.dbvision.lib.ui.cmm.emp.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 부서팝업에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.21          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("EmpMapper")
public interface EmpMapper {
    
      /**
        * 직원 팝업 목록을 조회한다.
        * @param paramMap
        * @return
        */
      public List<EgovMapForNull> selectMhsEmpList(EgovMapForNull paramMap);
      
      /**
       * 부서별 직원 팝업 목록을 조회한다.
       * @param paramMap
       * @return
       */
     public List<EgovMapForNull> selectMhsEmpListDept(EgovMapForNull paramMap);
     public List<EgovMapForNull> searchOrgnztEmp(EgovMapForNull paramMap);
}
