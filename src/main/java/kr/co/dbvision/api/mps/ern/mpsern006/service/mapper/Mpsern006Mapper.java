package kr.co.dbvision.api.mps.ern.mpsern006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.ern.mpsern006.entity.Mpsern006;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 소득지급등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.12
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.12)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.12          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsern006Mapper")
public interface Mpsern006Mapper {
     /**
      * 소득지급등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsern006List(EgovMapForNull paramMap);
      /**
       * 소득지급등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsern006(EgovMapForNull paramMap);
      /**
       * 소득지급등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsern006(Mpsern006 entity);
      /**
       * 소득지급등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsern006(Mpsern006 entity);
}
