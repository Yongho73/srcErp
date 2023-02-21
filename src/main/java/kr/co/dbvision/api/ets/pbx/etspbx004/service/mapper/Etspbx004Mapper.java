package kr.co.dbvision.api.ets.pbx.etspbx004.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ets.pbx.etspbx004.entity.Etspbx004;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 수신문서관리에 관한 매퍼 클래스
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

@Mapper("Etspbx004Mapper")
public interface Etspbx004Mapper {
     /**
      * 수신문서 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectEtspbx004List(EgovMapForNull paramMap);
      /**
       * 수신문서 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtspbx004(EgovMapForNull paramMap);
      /**
       * 수신문서 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtspbx004(Etspbx004 entity);
      /**
       * 수신문서 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtspbx004(Etspbx004 entity);
}
