package kr.co.dbvision.api.pub.wfs.pubwfs008.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wfs.pubwfs008.entity.Pubwfs008;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 자녀학비보조금신청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.27          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubwfs008Mapper")
public interface Pubwfs008Mapper {
     /**
      * 자녀학비보조금신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubwfs008List(EgovMapForNull paramMap);
      /**
       * 자녀 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public List<EgovMapForNull> selectPubwfsChldrnList(EgovMapForNull paramMap);
      /**
       * 자녀학비보조금신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubwfs008(EgovMapForNull paramMap);
      /**
       * 자녀학비보조금신청 정보를 등록한다.
       * @param paramMap
       */
      public void savePubwfs008(Pubwfs008 entity);
      /**
       * 자녀학비보조금신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubwfs008(Pubwfs008 entity);
      
      // 전년도 데이터 삭제
      public void deleteApplcYyYear(EgovMapForNull paramMap);
      // 전년도 데이터 복사
      public void insertCopyPubwfs008(EgovMapForNull paramMap);
}
