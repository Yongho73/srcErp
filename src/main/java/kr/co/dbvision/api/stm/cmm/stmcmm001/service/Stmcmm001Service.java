package kr.co.dbvision.api.stm.cmm.stmcmm001.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kr.co.dbvision.api.stm.cmm.stmcmm001.entity.Stmcmm001;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;


/**
 * 로그인에 관한 서비스 인터페이스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */ 
public interface Stmcmm001Service {
	/**
	 * 로그인시 사용자 정보 확인
	 * @param paramMap
	 * @return
	 * @throws Exceptions
	 */
	public Stmcmm001 findUser(Map<String, String> paramMap) throws Exceptions;
	/**
	 * 패스워드 검증
	 * @param stmcmm001
	 * @param session
	 * @return
	 * @throws Exceptions
	 */
	public EgovMapForNull findPassword(Stmcmm001 stmcmm001, HttpSession session) throws Exceptions;
	public EgovMapForNull findPasswordSSO(Stmcmm001 stmcmm001, HttpSession session) throws Exceptions;
	/**
	 * 사용자 탑메뉴
	 * @param userId
	 * @return
	 * @throws Exceptions
	 */
	public List<?> findTopMenu(List<EgovMapForNull> menuList, List<EgovMapForNull> roleMenuList, String authorSetting) throws Exceptions;
	/**
	 * 사용자 메뉴
	 * @param userId
	 * @param upMenuCd
	 * @param menuNm
	 * @return
	 * @throws Exceptions
	 */
	public List<?> findLeftMenu(List<EgovMapForNull> menuList, List<EgovMapForNull> roleMenuList, String upMenuId, String authorSetting) throws Exceptions;
	/**
	 * 메뉴전체
	 * @param menuList
	 * @param roleMenuList
	 * @return
	 * @throws Exceptions
	 */
	public List<?> findAuthMenuAll(List<EgovMapForNull> menuList, List<EgovMapForNull> roleMenuList, String authorSetting) throws Exceptions;
	/**
	 * 로그아웃
	 */
	public void logout(String multiLoginPermAt, String userId, HttpSession session) throws Exceptions;
	/**
	 * 로그인 히스토리 등록
	 * @param request
	 * @param userId
	 */
	public void insertStmUseHis(HttpServletRequest request, String userId) throws Exceptions;
	/**
	 * 메뉴 패스
	 * @param paramMap
	 * @return
	 * @throws Exceptions
	 */	
	public String getMenuPath(Map<String, String> paramMap) throws Exceptions;
}
