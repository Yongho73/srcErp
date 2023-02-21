package kr.co.dbvision.api.stm.mng.stmmng004.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 그룹권한관리에 관한 매퍼 클래스
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

@Mapper("Stmmng004Mapper")
public interface Stmmng004Mapper {
     /**
      * 그룹권한 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectRole(EgovMapForNull paramMap);
      /**
       * 메뉴 목록 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectMenu(EgovMapForNull paramMap);
      /**
       * 역활 메뉴 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectRoleMenu(EgovMapForNull paramMap);
      /**
       * 권한별 상세 메뉴를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectRoleMenuDetail(EgovMapForNull paramMap);
      /**
       * 사용자 권한을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectRoleUser(EgovMapForNull paramMap);
      /**
       * 사용자 메뉴만 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectUserMenuOnly(EgovMapForNull paramMap);
      /**
       * 사용자그룹권한 정보를 등록한다.
       * @param paramMap
       */
      public void insertUserMenu(EgovMapForNull paramMap);
      /**
       * 그룹권한 정보를 등록한다.
       * @param paramMap
       */
      public void insertRoleMenu(EgovMapForNull paramMap);
      /**
       * 그룹권한 정보를 수정한다.
       * @param paramMap
       */
      public void updateRoleMenu(EgovMapForNull paramMap);
      /**
       * 그룹권한 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteRoleMenu(EgovMapForNull paramMap);
      /**
       * 그룹권한 정보 모두 삭제
       * @param paramMap
       */
      public void deleteRoleMenuAll(EgovMapForNull paramMap);
}
