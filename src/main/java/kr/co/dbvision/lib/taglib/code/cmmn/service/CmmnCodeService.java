package kr.co.dbvision.lib.taglib.code.cmmn.service;

import java.util.List;
import java.util.Map;

import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 다국어 지원 서비스 구현 인터페이스
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
public interface CmmnCodeService {	
	/**
	 * 공통코드조회
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<EgovMapForNull> getCmmnCode(Map<String, Object> params) throws Exception;
	/**
	 * 공통코드 메모리 refresh
	 * @throws Exception
	 */
	public boolean refreshCmmnCode() throws Exception;
}
