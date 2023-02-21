package kr.co.dbvision.api.stm.mng.stmmng006.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사용자권한관리에 관한 서비스 인터페이스
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

public interface Stmmng006Service {
	
	/**
	 * 사용자 조회
	 * @param paramMap
	 * @return
	 */
	public JSONObject searchUser(EgovMapForNull paramMap);
	/**
	 * 엑셀 저장 사용자 조회
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> searchUserForExcel(EgovMapForNull paramMap);
	/**
	 * 메뉴 조회
	 * @param paramMap
	 * @return
	 */
	public JSONObject searchMenu(EgovMapForNull paramMap);
	/**
	 * 사용자 메뉴 조회
	 * @param paramMap
	 * @return
	 */
	public JSONObject searchUserMenu(EgovMapForNull paramMap);
	/**
	 * 엑셀저장 사용자 메뉴 조회
	 * @param paramMap
	 * @return
	 * @throws Exceptions
	 */
	public List<EgovMapForNull> searchUserMenuForExcel(EgovMapForNull paramMap) throws Exceptions;
	/**
	 * 사용자 메뉴 저장
	 * @param paramMap
	 * @return
	 */
	public JSONObject addUserMenu(EgovMapForNull paramMap);
	/**
	 * 사용자 메뉴 수정
	 * @param paramMap
	 * @return
	 */
	public JSONObject modifyUserMenu(EgovMapForNull paramMap);
	/**
	 * 사용자 메뉴 삭제
	 * @param paramMap
	 * @return
	 */
	public JSONObject removeUserMenu(EgovMapForNull paramMap);
 }
