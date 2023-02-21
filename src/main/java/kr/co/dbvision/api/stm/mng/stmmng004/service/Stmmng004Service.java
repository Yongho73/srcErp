package kr.co.dbvision.api.stm.mng.stmmng004.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 그룹권한관리에 관한 서비스 인터페이스
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

public interface Stmmng004Service {
    /**
     * 그룹권한 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchRole(EgovMapForNull paramMap);
    /**
     * 메뉴를 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject searchMenu(EgovMapForNull paramMap);
    /**
     * 권한별 메뉴를 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject searchRoleMenu(EgovMapForNull paramMap);
    /**
     * 그룹권한 정보를 저장한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject addRoleMenu(EgovMapForNull paramMap);
    /**
     * 그룹권한 정보를 수정한다.
     * @param paramMap
     * @throws Exceptions
     */
    public JSONObject modifyRoleMenu(EgovMapForNull paramMap);
    /**
     * 그룹권한 정보를 삭제한다.
     * @param paramMap
     * @throws Exceptions
     */
    public JSONObject removeRoleMenu(EgovMapForNull paramMap);
    /**
     * 권한을 엑셀로 저장
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchRoleForExcel(EgovMapForNull paramMap);
    /**
     * 메뉴를 엑셀로 저장
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchRoleMenuForExcel(EgovMapForNull paramMap);
 }
