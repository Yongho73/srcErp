package kr.co.dbvision.api.pjt.osc.pjtosc001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pjt.osc.pjtosc001.entity.Pjtosc001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 아웃소싱 인력현황관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.06.24
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.24          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pjtosc001Mapper")
public interface Pjtosc001Mapper {
     /**
      * 아웃소싱 인력현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPjtosc001List(EgovMapForNull paramMap);
      /**
       * 아웃소싱 인력현황 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPjtosc001(EgovMapForNull paramMap);
      /**
       * 아웃소싱 인력현황 정보를 등록한다.
       * @param paramMap
       */
      public void savePjtosc001(Pjtosc001 entity);
      /**
       * 아웃소싱 인력현황 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePjtosc001(Pjtosc001 entity);
}
