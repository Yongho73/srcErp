package kr.co.dbvision.api.mps.cal.mpscal005.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal005.entity.Mpscal005;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여계산/조정관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal005Mapper")
public interface Mpscal005Mapper {
    /**
     * 급여대상자생성 목록을 조회한다.
     * @param paramMap
     * @return
     */
     public List<EgovMapForNull> selectMpscalEmpList(EgovMapForNull paramMap);
     
     /**
      * 급여계산/조정 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscal005List(EgovMapForNull paramMap);
      /**
       * 급여계산/조정 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMpscal005ItemList(EgovMapForNull paramMap);
       /**
        * 급여계산/조정 합계을 조회한다.
        * @param paramMap
        * @return
        */
        public List<EgovMapForNull> selectMpscalSUM(EgovMapForNull paramMap);
      /**
       * 급여계산/조정 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal005(EgovMapForNull paramMap);
      /**
       * 급여계산/조정 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectMpscal005SUM(EgovMapForNull paramMap);
      /**
       * 급여계산/조정 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal005(Mpscal005 entity);
      /**
       * 급여계산/조정 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscalItem(Mpscal005 entity);
      /**
       * 급여계산/조정 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal005(Mpscal005 entity);
      /**
       * 급여계산/조정 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull MPS_PYMNTDE(EgovMapForNull paramMap);
      
}