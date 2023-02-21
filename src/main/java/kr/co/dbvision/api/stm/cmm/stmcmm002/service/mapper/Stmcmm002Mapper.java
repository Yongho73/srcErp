package kr.co.dbvision.api.stm.cmm.stmcmm002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 메인 기능에 관한 데이터처리 매퍼 클래스
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
@Mapper("Stmcmm002Mapper")
public interface Stmcmm002Mapper {
	/**
	 * 메뉴명 조회
	 * @param paramMap
	 */
	public List<EgovMapForNull> selectMenuSearchList(EgovMapForNull paramMap);
	/**
	 * 즐겨찾기 메뉴
	 * @param paramMap
	 */
	public List<EgovMapForNull> selectFavMenuList(EgovMapForNull paramMap);
	/**
	 * 해당 메뉴의 제일 첫번째 프로그램 메뉴 ID
	 * @param paramMap
	 * @return
	 */
	public String selectFirstProgramMenuId(EgovMapForNull paramMap);
	/**
	 * 해당 메뉴의 PATH
	 * @param paramMap
	 * @return
	 */
	public EgovMapForNull selectMenuPath(EgovMapForNull paramMap);	
	/**
	 * 즐겨찾기 메뉴 추가
	 * @param paramMap
	 * @return
	 */
	public void insertFavMenu(EgovMapForNull paramMap);
	/**
	 * 즐겨찾기 메뉴 삭제
	 * @param paramMap
	 * @return
	 */
	public void deleteFavMenu(EgovMapForNull paramMap);
	/**
	 * 메뉴의 프로그램 id를 가져온다.
	 * @param paramMap
	 * @return
	 */
	public String selectProgrmId(EgovMapForNull paramMap);
	/**
	 * 메뉴의 connect by path 조회
	 * @param paramMap
	 * @return
	 */
	public String selectConnectByPath(EgovMapForNull paramMap);
}
