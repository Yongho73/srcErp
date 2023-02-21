package kr.co.dbvision.api.ets.pbx.etspbx006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ets.pbx.etspbx006.entity.Etspbx006;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 공람문서관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.03.24
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.24          디비비전              최초 생성
 * </pre>
 */

@Mapper("Etspbx006Mapper")
public interface Etspbx006Mapper {
     /**
      * 공람문서 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectEtspbx006List(EgovMapForNull paramMap);
      /**
       * 공람문서 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtspbx006(EgovMapForNull paramMap);
      /**
       * 공람문서 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtspbx006(Etspbx006 entity);
      /**
       * 공람문서 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtspbx006(Etspbx006 entity);
}
