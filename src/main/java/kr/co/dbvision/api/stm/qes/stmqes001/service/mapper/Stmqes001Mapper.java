package kr.co.dbvision.api.stm.qes.stmqes001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.qes.stmqes001.entity.Stmqes001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 설문관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.04          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmqes001Mapper")
public interface Stmqes001Mapper {
     /**
      * 설문 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmqes001List(EgovMapForNull paramMap);
      /**
       * 설문 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmqes001(EgovMapForNull paramMap);
      /**
       * 설문 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmqes001(Stmqes001 entity);
      /**
       * 설문 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmqes001(Stmqes001 entity);
}
