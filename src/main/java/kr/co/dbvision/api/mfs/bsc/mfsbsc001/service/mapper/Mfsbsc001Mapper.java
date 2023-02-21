package kr.co.dbvision.api.mfs.bsc.mfsbsc001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 계정과목관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.04.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.21          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mfsbsc001Mapper")
public interface Mfsbsc001Mapper {
     /**
      * 계정과목 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsbsc001List(EgovMapForNull paramMap);
      /**
       * 계정과목 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMfsbsc001(EgovMapForNull paramMap);
      /**
       * 계정과목 정보를 등록한다.
       * @param paramMap
       */
      public void saveMfsbsc001(EgovMapForNull paramMap);
      /**
       * 계정과목 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMfsbsc001(EgovMapForNull paramMap);
}
