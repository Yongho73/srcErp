package kr.co.dbvision.api.stm.mng.stmmng001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.mng.stmmng001.entity.Stmmng001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사용자관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.10
 * @version 1.0
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.10          디비비전              최초 생성
 *
 *      </pre>
 */

@Mapper("Stmmng001Mapper")
public interface Stmmng001Mapper {
    /**
     * 권한조회
     * 
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectCheckRole(EgovMapForNull paramMap);
    /**
     * 부서조회(콤보박스)
     */
    public List<EgovMapForNull> selectComboDept();
    /**
     * 사용자 목록을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectStmUsersList(EgovMapForNull paramMap);
    /**
     * 사용자 상세내용을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public EgovMapForNull selectStmUsers(EgovMapForNull paramMap);
    /**
     * 사용자 정보를 등록한다.
     * 
     * @param paramMap
     */
    public void saveStmUsers(Stmmng001 paramMap);
    /**
     * 사용자 정보를 삭제한다.
     * 
     * @param paramMap
     */
    public void deleteStmUsers(Stmmng001 paramMap);
    /**
     * 사용자한테 권한을 부여
     * 
     * @param paramMap
     */
    public void saveRoleUser(Stmmng001 paramMap);

    /**
     * 사용자권한 수정
     * 
     * @param paramMap
     */
    public void deleteRoleUser(Stmmng001 paramMap);
    /**
     * 사용자 메뉴 삭제
     * 
     * @param paramMap
     */
    public void deleteUsermenu(Stmmng001 paramMap);
    /**
     * 즐겨찾기등록된 메뉴 삭제
     * 
     * @param paramMap
     */
    public void deleteFavMenu(Stmmng001 paramMap);
}
