package kr.co.dbvision.api.mps.bsc.mpsbsc013.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc013.entity.Mpsbsc013;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사회보험요율관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.12
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.12          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc013Mapper")
public interface Mpsbsc013Mapper {
     /**
      * 급여기초환경설정 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc013List(EgovMapForNull paramMap);
      /**
       * 급여기초환경설정 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc013(EgovMapForNull paramMap);
      /**
       * 급여기초환경설정 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc013(EgovMapForNull paramMap);
      /**
       * 급여기초환경설정 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc013(EgovMapForNull paramMap);
      public void deleteMpsbsc013Tap2Tariff(EgovMapForNull paramMap);
      public void deleteMpsbsc013Tap3Rtrpay(EgovMapForNull paramMap);
      

      /**
       * 사회보험요율관리 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public EgovMapForNull selectMpsbscTap2Tariff(EgovMapForNull paramMap);
       /**
        * 사회보험요율관리 등록한다.
        * @param paramMap
        */
       public void saveMpsbscTap2Tariff(EgovMapForNull paramMap);
       

       /**
        * 퇴직금기초설정 목록을 조회한다.
        * @param paramMap
        * @return
        */
        public EgovMapForNull selectMpsbscTap3Rtrpay(EgovMapForNull paramMap);
        /**
         * 퇴직금기초설정 등록한다.
         * @param paramMap
         */
        public void saveMpsbscTap3Rtrpay(EgovMapForNull paramMap);
}
