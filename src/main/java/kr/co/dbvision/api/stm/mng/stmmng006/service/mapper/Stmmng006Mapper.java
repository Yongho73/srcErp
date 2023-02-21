package kr.co.dbvision.api.stm.mng.stmmng006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사용자권한관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.14          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Stmmng006Mapper")
public interface Stmmng006Mapper {
     /**
      * 사용자권한 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectUser(EgovMapForNull paramMap);
      /**
       * 메뉴 조회
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectMenu(EgovMapForNull paramMap);
      /**
       * 사용자 메뉴 조회
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectUserMenu(EgovMapForNull paramMap);
      /**
       * 사용자 메뉴만 조회
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectUserMenuOnly(EgovMapForNull paramMap);
      /**
       * 사용자 메뉴 상세
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectUserMenuDetail(EgovMapForNull paramMap);
      /**
       * 사용자 메뉴 업데이트
       * @param paramMap
       */
      public void updateUserMenu(EgovMapForNull paramMap);
      /**
       * 사용자 메뉴 입력
       * @param paramMap
       */
      public void insertUserMenu(EgovMapForNull paramMap);
      /**
       * 사용자 메뉴 삭제
       * @param paramMap
       */
      public void deleteUserMenu(EgovMapForNull paramMap);
      /**
       * 사용자메뉴 모두 삭제
       * @param paramMap
       */
      public void deleteUserMenuAll(EgovMapForNull paramMap);
}
