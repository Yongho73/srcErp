package kr.co.dbvision.api.mhs.hrb.mhshrb011.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb011.entity.Mhshrb011;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 생일자현황조회관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.05.21
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.05.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.05.21          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrb011Mapper")
public interface Mhshrb011Mapper {
     /**
      * 생일자현황조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrb011List(EgovMapForNull paramMap);
      /**
       * 생일자현황조회 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrb011(EgovMapForNull paramMap);
      /**
       * 생일자현황조회 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrb011(Mhshrb011 entity);
      /**
       * 생일자현황조회 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrb011(Mhshrb011 entity);
}
