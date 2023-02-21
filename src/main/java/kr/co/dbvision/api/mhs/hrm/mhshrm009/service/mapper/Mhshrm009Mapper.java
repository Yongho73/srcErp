package kr.co.dbvision.api.mhs.hrm.mhshrm009.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm009.entity.Mhshrm009;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 자격증코드관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrm009Mapper")
public interface Mhshrm009Mapper {
     /**
      * 개인정보조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm009List(EgovMapForNull paramMap);
      /**
       * 개인정보조회 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm009(EgovMapForNull paramMap);
      /**
       * 개인정보조회 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm009(Mhshrm009 entity);
      /**
       * 개인정보조회 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm009(Mhshrm009 entity);
      
      public List<EgovMapForNull> selectMhshrm009Crqfs(EgovMapForNull paramMap);
      /**
       * 엑셀 개인정보조회 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMhshrm009ListForExcel(EgovMapForNull paramMap);
       /**
        * 개인정보조회 사용여부를 조회한다.
        * @param paramMap
        * @return
        */
       public EgovMapForNull checkDeleteMhshrm009(EgovMapForNull paramMap);
}
