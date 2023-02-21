package kr.co.dbvision.api.mps.cal.mpscal013.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal013.entity.Mpscal013;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여대상자생성관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.17          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal013Mapper")
public interface Mpscal013Mapper {
    /**
     * 급여대상자생성 목록을 조회한다.
     * @param paramMap
     * @return
     */
     public List<EgovMapForNull> selectMpscalEmpList(EgovMapForNull paramMap);
     /**
      * 급여대상자생성 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscal013List(EgovMapForNull paramMap);
      /**
       * 급여대상자생성 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal013(EgovMapForNull paramMap);
      /**
       * 급여대상자생성 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal013(Mpscal013 entity);
      /**
       * 급여대상자생성 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal013(Mpscal013 entity);
      public void deletepymnt(Mpscal013 entity);
      
      /**
       * 계좌조회 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectAcnutMpscal013(EgovMapForNull paramMap);
}
