package kr.co.dbvision.api.stm.mng.stmmng005.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 그룹권한등록에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.16          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Stmmng005Mapper")
public interface Stmmng005Mapper {
     /**
      * 그룹권한등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmRoleList(EgovMapForNull paramMap);
      /**
       * 그룹권한등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmRole(EgovMapForNull paramMap);
      /**
       * 그룹권한등록 정보를 등록한다.
       * @param paramMap
       */
      public void insertStmRole(EgovMapForNull paramMap);
      /**
       * 그룹권한등록 정보를 수정한다.
       * @param paramMap
       */
      public void updateStmRole(EgovMapForNull paramMap);
      /**
       * 그룹권한등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmRole(EgovMapForNull paramMap);
}
