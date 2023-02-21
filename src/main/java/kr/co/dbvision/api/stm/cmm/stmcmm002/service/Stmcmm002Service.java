package kr.co.dbvision.api.stm.cmm.stmcmm002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;


/**
 * 메인 기능에 관한 서비스 인터페이스
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
public interface Stmcmm002Service {
	
	public List<EgovMapForNull> searchMenuNm(EgovMapForNull paramMap) throws Exceptions;

	public List<EgovMapForNull> searchFavMenu(EgovMapForNull paramMap) throws Exceptions;
	
	public String findFirstProgramMenuId(EgovMapForNull paramMap) throws Exceptions;
	
	public EgovMapForNull searchMenuInfo(EgovMapForNull paramMap) throws Exceptions;
	
	public String findProgrmId(EgovMapForNull paramMap) throws Exceptions;

	public boolean addFavMenu(EgovMapForNull paramMap) throws Exceptions;

	public boolean removeFavMenu(EgovMapForNull paramMap) throws Exceptions;
	
	public String getTopMenuId(EgovMapForNull paramMap) throws Exceptions;

    public EgovMapForNull getMenuAuth(EgovMapForNull paramMap) throws Exceptions;

}
