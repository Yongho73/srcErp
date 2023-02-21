package kr.co.dbvision.api.mhs.hrm.mhshrm004.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm004.entity.Mhshrm004;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 직급코드관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.26
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.26)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.26          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrm004Mapper")
public interface Mhshrm004Mapper {
     /**
      * 직급코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm004List(EgovMapForNull paramMap);
      /**
       * 직급코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm004(EgovMapForNull paramMap);
      /**
       * 직급코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm004(Mhshrm004 entity);
      /**
       * 직급코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm004(Mhshrm004 entity);
      /**
       * 직급코드 사용여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull useCheckMhshrm004(EgovMapForNull paramMap);
      /**
       * 직급콤보 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMhshrb004ClsfCodeCombo(EgovMapForNull paramMap);
}
