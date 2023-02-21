package kr.co.dbvision.api.stm.mng.stmmng010.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.mng.stmmng010.entity.Stmmng010;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 프로그램 개발현황관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.10
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.10          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmmng010Mapper")
public interface Stmmng010Mapper {
     /**
      * 프로그램 개발현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmmng010List(EgovMapForNull paramMap);
      /**
       * 프로그램 개발현황 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmmng010(EgovMapForNull paramMap);
      /**
       * 프로그램 개발현황 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmmng010(Stmmng010 entity);
      /**
       * 프로그램 개발현황 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmmng010(Stmmng010 entity);
      
      public List<EgovMapForNull> selectStmmng010DayList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectStmmng010WeekList(EgovMapForNull paramMap);
}
