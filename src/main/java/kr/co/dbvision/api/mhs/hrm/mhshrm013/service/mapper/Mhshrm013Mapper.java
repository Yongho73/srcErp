package kr.co.dbvision.api.mhs.hrm.mhshrm013.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm013.entity.Mhshrm013;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 근태코드관리에 관한 매퍼 클래스
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

@Mapper("Mhshrm013Mapper")
public interface Mhshrm013Mapper {
     /**
      * 개인정보조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm013List(EgovMapForNull paramMap);
      /**
       * 개인정보조회 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm013(EgovMapForNull paramMap);
      /**
       * 개인정보조회 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm013(Mhshrm013 entity);
      /**
       * 개인정보조회 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm013(Mhshrm013 entity);
      /**
       * 개인정보조회 목록을 엑셀용으로 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> searchMhshrm013ForExcel(EgovMapForNull paramMap);
}
