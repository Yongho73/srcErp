package kr.co.dbvision.api.pub.edu.pubedu003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.edu.pubedu003.entity.Pubedu003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 테스트관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.06.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.22          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubedu003Mapper")
public interface Pubedu003Mapper {
     /**
      * 테스트 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubedu003List(EgovMapForNull paramMap);
      /**
       * 테스트 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubedu003(EgovMapForNull paramMap);
      /**
       * 테스트 정보를 등록한다.
       * @param paramMap
       */
      public void savePubedu003(Pubedu003 entity);
      /**
       * 테스트 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubedu003(Pubedu003 entity);
}
