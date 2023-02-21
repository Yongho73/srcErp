package kr.co.dbvision.api.stm.cmm.stmcmm001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사용자에 관한 데이터처리 매퍼 클래스
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
@Mapper("Stmcmm001Mapper")
public interface Stmcmm001Mapper {
	/**
	 * 사용자 상세내용을 조회한다.
	 * @param paramMap
	 * @return
	 */
	public EgovMapForNull selectUser(String userId);
	/**
	 * 사용자 패스워드를 조회
	 * @param paramMap
	 */
	public EgovMapForNull selectUserDetail(String userId);
	/**
	 * 사용자 메뉴 조회
	 * @param paramMap
	 */
	public List<EgovMapForNull> selectMenuList(EgovMapForNull paramMap);
	/**
	 * 메뉴 패스
	 * @param paramMap
	 */
	public EgovMapForNull selectMenuPath(String menuId);
	/**
	 * 로그인 히스토리 등록
	 * @param paramMap
	 * @return
	 */
	public void insertStmUseHis(EgovMapForNull paramMap);
	/**
	 * 사용자 그룹권한
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectRoleMenuList(EgovMapForNull paramMap);
}
