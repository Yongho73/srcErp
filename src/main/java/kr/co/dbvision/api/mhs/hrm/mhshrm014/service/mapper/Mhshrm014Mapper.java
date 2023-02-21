package kr.co.dbvision.api.mhs.hrm.mhshrm014.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm014.entity.Mhshrm014;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 직책관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.03.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.17          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrm014Mapper")
public interface Mhshrm014Mapper {
     /**
      * 직책 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm014List(EgovMapForNull paramMap);
      /**
       * 직책 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm014(EgovMapForNull paramMap);
      /**
       * 직책 정보를 등록한다.
       * @param entity
       */
      public void saveMhshrm014(Mhshrm014 entity);
      /**
       * 직책 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm014(Mhshrm014 entity);
      /**
       * 직책 사용여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull useCheckMhshrm014(EgovMapForNull paramMap);
      /**
       * 직책콤보 목록을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectMhshrm014RspofcCodeCombo(EgovMapForNull paramMap);
}
