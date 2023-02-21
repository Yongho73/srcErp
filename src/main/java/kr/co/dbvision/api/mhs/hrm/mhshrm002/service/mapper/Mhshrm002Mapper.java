package kr.co.dbvision.api.mhs.hrm.mhshrm002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm002.entity.Mhshrm002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 부서코드등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrm002Mapper")
public interface Mhshrm002Mapper {
     /**
      * 부서코드등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm002List(EgovMapForNull paramMap);
      /**
       * 부서코드등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm002(EgovMapForNull paramMap);
      /**
       * 부서코드등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm002(Mhshrm002 entity);
      public void saveMhshrm003(Mhshrm002 entity);
      /**
       * 부서코드 정보를 수정한다.
       * @param paramMap
       */
      public void updateMhshrm002UseAtOff(Mhshrm002 entity);
      /**
       * 사용여부를 확인한다.
       */
      public EgovMapForNull findMhshrm003(EgovMapForNull paramMap);
      /**
       * 부서코드, 조직코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm003(Mhshrm002 entity);
      public void deleteMhshrm002(Mhshrm002 entity);
      /**
       * 부서콤보 목록을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectMhshrm002DeptCodeCombo(EgovMapForNull paramMap);
}
