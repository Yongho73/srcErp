package kr.co.dbvision.api.mhs.hrd.mhshrd010.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrd.mhshrd010.entity.Mhshrd010;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 초과근무조회관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.30
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.30)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.30          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrd010Mapper")
public interface Mhshrd010Mapper {
     /**
      * 초과근무조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrd010List(EgovMapForNull paramMap);
      /**
       * 초과근무조회 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrd010(EgovMapForNull paramMap);
      /**
       * 초과근무조회 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrd010(Mhshrd010 entity);
      /**
       * 초과근무조회 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrd010(Mhshrd010 entity);
}
