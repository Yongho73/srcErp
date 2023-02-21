package kr.co.dbvision.api.ets.pbx.etspbx001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ets.pbx.etspbx001.entity.Etspbx001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 기안문서관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.03.25
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.25)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.25          디비비전              최초 생성
 * </pre>
 */

@Mapper("Etspbx001Mapper")
public interface Etspbx001Mapper {
     /**
      * 기안문서 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectEtspbx001List(EgovMapForNull paramMap);
      /**
       * 기안문서 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtspbx001(EgovMapForNull paramMap);
      /**
       * 기안문서 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtspbx001(Etspbx001 entity);
      /**
       * 기안문서 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtspbx001(Etspbx001 entity);
}
