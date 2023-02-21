package kr.co.dbvision.api.ets.bst.etsbst001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ets.bst.etsbst001.entity.Etsbst001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 전결규정관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.03.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.22          디비비전              최초 생성
 * </pre>
 */

@Mapper("Etsbst001Mapper")
public interface Etsbst001Mapper {
     /**
      * 전결규정 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectEtsbst001List(EgovMapForNull paramMap);
      /**
       * 전결규정 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtsbst001(EgovMapForNull paramMap);
      /**
       * 전결규정 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtsbst001(Etsbst001 entity);
      /**
       * 전결규정 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtsbst001(Etsbst001 entity);
      /**
       * 전결결제레벨 조회
       */
      public List<EgovMapForNull> searchSanctnLvl();
}
