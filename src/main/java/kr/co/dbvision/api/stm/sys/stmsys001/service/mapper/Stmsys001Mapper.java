package kr.co.dbvision.api.stm.sys.stmsys001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 시스템환경관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.03.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.16          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmsys001Mapper")
public interface Stmsys001Mapper {
     /**
      * 시스템환경 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmsys001List(EgovMapForNull paramMap);
      /**
       * 시스템환경 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmsys001(EgovMapForNull paramMap);
      /**
       * 시스템환경 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmsys001(EgovMapForNull paramMap);
      /**
       * 시스템환경 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtsStmsys001(EgovMapForNull paramMap);
      /**
       * 시스템환경 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtsStmsys001(EgovMapForNull paramMap);
      /**
       * 시스템환경 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmsys001(EgovMapForNull paramMap);
      /**
       * 모듈사용항목조회
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> searchCheck(EgovMapForNull paramMap);
}
