package kr.co.dbvision.api.ets.fmg.etsfmg000.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.ets.fmg.etsfmg000.entity.Etsfmg000;
import kr.co.dbvision.api.ets.fmg.etsfmg000.entity.Etsfmg000Item;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 양식관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.03.18
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.18          디비비전              최초 생성
 * </pre>
 */

@Mapper("Etsfmg000Mapper")
public interface Etsfmg000Mapper {
     /**
      * 양식 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectEtsfmg000List(Etsfmg000 entity);
      /**
       * 양식 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtsfmg000(Etsfmg000 entity);
      /**
       * 양식 정보를 등록한다.
       * @param paramMap
       */
      public void insertEtsfmg000(Etsfmg000 entity);
      public void updateEtsfmg000(Etsfmg000 entity);
      /**
       * 양식 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtsfmg000(Etsfmg000 entity);
      /**
       * 양식 항목을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectEtsfmg000Item(Etsfmg000 entity);
      /**
       * 양식 항목 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtsfmg000Item(Etsfmg000Item entity);
      /**
       * 양식 항목 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtsfmg000Item(Etsfmg000Item entity);
}
