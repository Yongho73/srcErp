package kr.co.dbvision.api.pub.wks.pubwks004.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wks.pubwks004.entity.Pubwks004;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 휴직신청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubwks004Mapper")
public interface Pubwks004Mapper {
    
     /**
     * 사용자 정보를 조회한다.
     * @param paramMap
     * @return
     */
     public EgovMapForNull userInformationPubwks004(EgovMapForNull paramMap);
     /**
      * 휴직신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubwks004List(EgovMapForNull paramMap);
      /**
       * 휴직신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubwks004(EgovMapForNull paramMap);
      /**
       * 휴직신청 정보를 등록한다.
       * @param paramMap
       */
      public void savePubwks004(Pubwks004 entity);
      /**
       * 휴직신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubwks004(Pubwks004 entity);
      /**
       * 휴직신청 목록 엘셀용 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> searchPubwks004ForExcel(EgovMapForNull paramMap);
       /**
        * 휴직신청 건 복사 전 진행중인 데이터 체크 
        * @param paramMap
        * @return
        */
        public Integer selectElctsctSeSnCnt(EgovMapForNull paramMap);
        /**
         * 휴직신청 정보를 복사한다.
         * @param paramMap
         */
        public void saveCopyPubwks004(EgovMapForNull paramMap);
        
}
