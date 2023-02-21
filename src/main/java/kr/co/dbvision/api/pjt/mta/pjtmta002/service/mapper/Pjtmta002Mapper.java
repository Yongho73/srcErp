package kr.co.dbvision.api.pjt.mta.pjtmta002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pjt.mta.pjtmta002.entity.Pjtmta002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 유지보수요청요약관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.14
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.14)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.14          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pjtmta002Mapper")
public interface Pjtmta002Mapper {
     /**
      * 유지보수요청요약 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPjtmta002List(EgovMapForNull paramMap);
      /**
       * 유지보수요청요약 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPjtmta002(EgovMapForNull paramMap);
      /**
       * 유지보수요청요약 정보를 등록한다.
       * @param paramMap
       */
      public void savePjtmta002(Pjtmta002 entity);
      /**
       * 유지보수요청요약 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePjtmta002(Pjtmta002 entity);
}
