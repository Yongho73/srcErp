package kr.co.dbvision.api.mhs.hrm.mhshrm015.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm015.entity.Mhshrm015;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 직위관리관리에 관한 매퍼 클래스
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

@Mapper("Mhshrm015Mapper")
public interface Mhshrm015Mapper {
     /**
      * 직위 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm015List(EgovMapForNull paramMap);
      /**
       * 직위 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm015(EgovMapForNull paramMap);
      /**
       * 직위 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm015(Mhshrm015 entity);
      /**
       * 직위 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm015(Mhshrm015 entity);
      /**
       * 개인정보조회 목록을 엑셀용으로 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> searchMhshrm015ForExcel(EgovMapForNull paramMap);
      /**
       * 직위콤보 목록을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectMhshrm015OfcpsCodeCombo(EgovMapForNull paramMap);

      /**
       * 직위 사용여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull checkDeleteMhshrm015(EgovMapForNull paramMap);
}
