package kr.co.dbvision.api.mps.bsc.mpsbsc004.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc004.entity.Mpsbsc004;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 금액기준등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc004Mapper")
public interface Mpsbsc004Mapper {
    
    /**
     * 금액기준등록 목록을 조회한다.
     * @param paramMap
     * @return
     */
     public List<EgovMapForNull> selectMpsbsc004MasterList(EgovMapForNull paramMap);
     /**
      * 금액기준등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc004List(EgovMapForNull paramMap);
      /**
       * 금액기준등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc004(EgovMapForNull paramMap);
      /**
       * 금액기준등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc004(Mpsbsc004 entity);
      /**
       * 금액기준등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc004(Mpsbsc004 entity);
      /**
       * 금액기준등록 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectGradeCalcMpsbsc004List(EgovMapForNull paramMap);
       /**
        * @param paramMap
        */
       public void saveMpsbsc004calcStdr(Mpsbsc004 entity);
       

       /**
        * @param paramMap
        * @return
        */
       public List<EgovMapForNull> selectCalcMpsbsc004PopList(EgovMapForNull paramMap);
}