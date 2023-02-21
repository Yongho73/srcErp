package kr.co.dbvision.api.mps.bsc.mpsbsc017.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc017.entity.Mpsbsc017;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 직원계좌조회관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.06
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 * </pre>
 */ 

@Mapper("Mpsbsc017Mapper")
public interface Mpsbsc017Mapper {
     /**
      * 직원계좌조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpsbsc017List(EgovMapForNull paramMap);
      /**
       * 직원계좌조회 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpsbsc017(EgovMapForNull paramMap);
      /**
       * 직원계좌조회 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpsbsc017(Mpsbsc017 entity);
      /**
       * 직원계좌조회 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpsbsc017(Mpsbsc017 entity);
}
