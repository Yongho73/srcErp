package kr.co.dbvision.api.mhs.hrm.mhshrm012.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm012.entity.Mhshrm012;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 상벌코드관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrm012Mapper")
public interface Mhshrm012Mapper {
     /**
      * 상벌코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm012List(EgovMapForNull paramMap);
      /**
       * 상벌코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm012(EgovMapForNull paramMap);
      /**
       * 상벌코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm012(Mhshrm012 entity);
      /**
       * 상벌코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm012(Mhshrm012 entity);
      /**
       * 상벌코드 사용여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull useCheckMhshrm012(EgovMapForNull paramMap);
}
