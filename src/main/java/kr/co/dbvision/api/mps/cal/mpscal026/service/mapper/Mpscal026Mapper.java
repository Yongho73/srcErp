package kr.co.dbvision.api.mps.cal.mpscal026.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal026.entity.Mpscal026;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 통상임금관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal026Mapper")
public interface Mpscal026Mapper {
     /**
      * 통상임금 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscal026List(EgovMapForNull paramMap);
      
      
      /**
       * 통상임금 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMpscal026TitleList(EgovMapForNull paramMap);
      
      /**
       * 통상임금 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal026(EgovMapForNull paramMap);
      /**
       * 통상임금 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal026(Mpscal026 entity);
      /**
       * 통상임금 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal026(Mpscal026 entity);
      
      /**
       * 통상임금 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMpscal026OdysgCalc(EgovMapForNull paramMap);
}
