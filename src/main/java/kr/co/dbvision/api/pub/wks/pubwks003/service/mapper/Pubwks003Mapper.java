package kr.co.dbvision.api.pub.wks.pubwks003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wks.pubwks003.entity.Pubwks003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 휴가신청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.04
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.04          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubwks003Mapper")
public interface Pubwks003Mapper {
    /**
     * 휴가구분을 조회한다.
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> WrycTime(EgovMapForNull paramMap);
    /**
     * 연차일수를 조회한다.
     * @param paramMap
     * @return
     */
    public EgovMapForNull searchWrycDaycntPubwks003(EgovMapForNull paramMap);
     /**
      * 휴가신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubwks003List(EgovMapForNull paramMap);
     
      /**
       * 휴가신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubwks003(EgovMapForNull paramMap);
      /**
       * 대체휴무 , 보상휴무 조회
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectAltRewardHvofDePubwks003(EgovMapForNull paramMap);
      /**
       * 휴가신청 정보를 등록한다.
       * @param paramMap
       */
      public void savePubwks003(Pubwks003 entity);
      /**
       * 휴가신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubwks003(Pubwks003 entity);
}
