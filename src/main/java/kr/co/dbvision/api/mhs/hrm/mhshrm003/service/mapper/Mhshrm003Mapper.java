package kr.co.dbvision.api.mhs.hrm.mhshrm003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm003.entity.Mhshrm003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 조직코드관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.20
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.20)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.20          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrm003Mapper")
public interface Mhshrm003Mapper {
     /**
      * 조직코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm003List(EgovMapForNull paramMap);
      /**
       * 조직코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm003(EgovMapForNull paramMap);
      /**
       * 조직코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm003(Mhshrm003 entity);
      public void saveMhshrm002(Mhshrm003 entity);
      /**
       * 조직코드 정보를 수정한다.
       * @param paramMap
       */
      public void updateMhshrm003UseAtOff(EgovMapForNull paramMap);
      public void updateMhshrm003UseAtOn(EgovMapForNull paramMap);
      public void updateMhshrm002UseAtOn(EgovMapForNull paramMap);
      /**
       * 조직코드 삭제전 사용여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull deleteCheckMhshrm003(EgovMapForNull paramMap);
      /**
       * 조직코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm003(Mhshrm003 entity);
}
