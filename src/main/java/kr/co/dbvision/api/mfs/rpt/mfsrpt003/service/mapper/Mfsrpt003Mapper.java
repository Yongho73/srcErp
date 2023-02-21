package kr.co.dbvision.api.mfs.rpt.mfsrpt003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 출장결의서에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.31          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mfsrpt003Mapper")
public interface Mfsrpt003Mapper {
     /**
      * 출장결의서 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsSlipCommList(EgovMapForNull paramMap);
      /**
       * 출장결의서 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMfsSlipComm(EgovMapForNull paramMap);
      /**
       * 출장결의서 정보를 등록한다.
       * @param paramMap
       */
      public void insertMfsSlipComm(EgovMapForNull paramMap);
      /**
       * 출장결의서 정보를 수정한다.
       * @param paramMap
       */
      public void updateMfsSlipComm(EgovMapForNull paramMap);
      /**
       * 출장결의서 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMfsSlipComm(EgovMapForNull paramMap);
      /**
       * 출장결의서 상세목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMfsBiztripSlipList(EgovMapForNull paramMap);
}
