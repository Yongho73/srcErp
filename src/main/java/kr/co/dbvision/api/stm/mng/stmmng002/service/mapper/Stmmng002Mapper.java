package kr.co.dbvision.api.stm.mng.stmmng002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 메뉴관리에 관한 매퍼 클래스
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

@Mapper("Stmmng002Mapper")
public interface Stmmng002Mapper {
    
	  /**
	   * 메뉴 갯수  
	   * @param paramMap
	   * @return
	   */
	  public int selectCount(EgovMapForNull paramMap);
	  /**
       * 메뉴 목록을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectStmMenuList(EgovMapForNull paramMap);
      /**
       * 메뉴 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmMenu(EgovMapForNull paramMap);
      /**
       * 메뉴 정보를 등록한다.
       * @param paramMap
       */
      public void insertStmMenu(EgovMapForNull paramMap);
      /**
       * 메뉴 정보를 수정한다.
       * @param paramMap
       */
      public void updateStmMenu(EgovMapForNull paramMap);
      /**
       * 메뉴 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmMenu(EgovMapForNull paramMap);
      /**
       * 순서 업데이트
       * @param paramMap
       */
      public void updateOrder(EgovMapForNull paramMap);
      /**
       * 대상 업데이트
       * @param paramMap
       */
      public void updateMenuTarget(EgovMapForNull paramMap);
      /**
       * 프로그램 콤보
       * @return
       */
      public List<EgovMapForNull> selectProgmList();
      /**
       * 상위메뉴의 메뉴구분이 프로그램인지 확인  
       * @param paramMap
       * @return
       */
      public int selectUpperMenuIdMenuSeCount(EgovMapForNull paramMap);
      /**
       * 메뉴 정보를 수정한다.
       * @param paramMap
       */
      public void updateStmMenuMenuUseAtOff(EgovMapForNull paramMap);
      /**
       * 메뉴 정보를 수정한다.
       * @param paramMap
       */
      public void updateStmMenuMenuUseAtOn(EgovMapForNull paramMap);
}
