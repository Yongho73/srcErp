package kr.co.dbvision.api.mhs.hrb.mhshrb000.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb000.entity.Mhshrb000;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사탭관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.09          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrb000Mapper")
public interface Mhshrb000Mapper {
     /**
      * 인사탭 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrb000List(EgovMapForNull paramMap);
      /**
       * 인사탭 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrb000(EgovMapForNull paramMap);
      /**
       * 인사탭 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrb000(Mhshrb000 entity);
      /**
       * 인사탭 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrb000(Mhshrb000 entity);
}
