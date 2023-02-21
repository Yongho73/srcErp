package kr.co.dbvision.api.stm.sys.stmsys007.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.sys.stmsys007.entity.Stmsys007;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 전자결재환경관리관리에 관한 매퍼 클래스
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

@Mapper("Stmsys007Mapper")
public interface Stmsys007Mapper {
     /**
      * 전자결재환경 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmsys007List(EgovMapForNull paramMap);
      /**
       * 전자결재환경 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmsys007(EgovMapForNull paramMap);
      /**
       * 전자결재환경 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmsys007(EgovMapForNull paramMap);
      /**
       * 전자결재환경 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmsys007(Stmsys007 entity);
}
