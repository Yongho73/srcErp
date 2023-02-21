package kr.co.dbvision.lib.ui.sample.page.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * sample
 *
 * @author 디비비전
 * @since 2020.02.18
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.18          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("PageMapper")
public interface PageMapper {
    
      /**
        * 직원 팝업 목록을 조회한다.
        * @param paramMap
        * @return
        */
      public List<EgovMapForNull> selectColSpanList(EgovMapForNull paramMap);
      
      /**
       * 달력 sample.
       * @param paramMap
       * @return
       */
     public List<EgovMapForNull> selectDateList(EgovMapForNull paramMap);
}
