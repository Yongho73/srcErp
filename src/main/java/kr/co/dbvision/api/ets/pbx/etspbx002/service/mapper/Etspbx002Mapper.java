package kr.co.dbvision.api.ets.pbx.etspbx002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ets.pbx.etspbx002.entity.Etspbx002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 결재문서관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.03.23
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.23)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.23          디비비전              최초 생성
 * </pre>
 */

@Mapper("Etspbx002Mapper")
public interface Etspbx002Mapper {
     /**
      * 결재문서 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectEtspbx002List(EgovMapForNull paramMap);
      /**
       * 결재문서 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtspbx002(EgovMapForNull paramMap);
      /**
       * 결재문서 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtspbx002(Etspbx002 entity);
      /**
       * 결재문서 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtspbx002(Etspbx002 entity);
}
