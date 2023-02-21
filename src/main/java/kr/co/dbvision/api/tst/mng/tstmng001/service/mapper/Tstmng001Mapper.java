package kr.co.dbvision.api.tst.mng.tstmng001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 테스트관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.04.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.16          디비비전              최초 생성
 * </pre>
 */

@Mapper("Tstmng001Mapper")
public interface Tstmng001Mapper {
     /**
      * 테스트 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectTstmng001List(EgovMapForNull paramMap);
      /**
       * 테스트 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectTstmng001(EgovMapForNull paramMap);
      /**
       * 테스트 정보를 등록한다.
       * @param paramMap
       */
      public void saveTstmng001(EgovMapForNull paramMap);
      /**
       * 테스트 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteTstmng001(EgovMapForNull paramMap);
}
