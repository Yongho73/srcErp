package kr.co.dbvision.api.stm.mng.stmmng008.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 버튼관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.17          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Stmmng008Mapper")
public interface Stmmng008Mapper {
     /**
      * 버튼 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmBtnList(EgovMapForNull paramMap);
      /**
       * 버튼 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmBtn(EgovMapForNull paramMap);
      /**
       * 버튼 정보를 등록한다.
       * @param paramMap
       */
      public void insertStmBtn(EgovMapForNull paramMap);
      /**
       * 버튼 정보를 수정한다.
       * @param paramMap
       */
      public void updateStmBtn(EgovMapForNull paramMap);
      /**
       * 버튼 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmBtn(EgovMapForNull paramMap);
}
