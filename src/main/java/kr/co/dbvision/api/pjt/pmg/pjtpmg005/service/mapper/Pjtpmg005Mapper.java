package kr.co.dbvision.api.pjt.pmg.pjtpmg005.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pjt.pmg.pjtpmg005.entity.Pjtpmg005;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인별투입현황관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.02.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.02.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.02.22          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pjtpmg005Mapper")
public interface Pjtpmg005Mapper {
     /**
      * 개인별투입현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPjtpmg005List(EgovMapForNull paramMap);
      /**
       * 개인별투입현황 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectPjtpmg005(EgovMapForNull paramMap);
      /**
       * 개인별투입현황 정보를 등록한다.
       * @param paramMap
       */
      public void savePjtpmg005(Pjtpmg005 entity);
      /**
       * 개인별투입현황 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePjtpmg005(Pjtpmg005 entity);
      
      public List<EgovMapForNull> selectPjtpmg005ProjectList(EgovMapForNull paramMap);
}
