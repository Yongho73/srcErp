package kr.co.dbvision.api.mps.cal.mpscal010.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal010.entity.Mpscal010;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 초과근무수당관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.18
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.18          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal010Mapper")
public interface Mpscal010Mapper {
     /**
      * 초과근무수당 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscal010List(EgovMapForNull paramMap);
      /**
       * 초과근무수당 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal010(EgovMapForNull paramMap);
      /**
       * 초과근무수당 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal010(Mpscal010 entity);
      /**
       * 초과근무수당 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal010(Mpscal010 entity);
      
      
      /**
       * 초과근무수당을 계산하여  목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMpscal010OvtimeAllwncCalc(EgovMapForNull paramMap);
}
