package kr.co.dbvision.api.mps.cal.mpscal012.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal012.entity.Mpscal012;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 자녀학비보조금관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.29
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.29)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.29          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal012Mapper")
public interface Mpscal012Mapper {
     /**
      * 자녀학비보조금 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscal012List(EgovMapForNull paramMap);
      /**
       * 자녀학비보조금 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal012(EgovMapForNull paramMap);
      /**
       * 자녀학비보조금 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal012(Mpscal012 entity);
      /**
       * 자녀학비보조금 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal012(Mpscal012 entity);
}
