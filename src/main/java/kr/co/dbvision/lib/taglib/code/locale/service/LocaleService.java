package kr.co.dbvision.lib.taglib.code.locale.service;

import java.util.Map;

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
public interface LocaleService {	
	/**
	 * 다국어 사전 조회
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public String getLocaleCodeName(Map<String, Object> params) throws Exception;
	/**
	 * 다국어사전 메모리 refresh
	 * @throws Exception
	 */
	public boolean refreshLocaleCode() throws Exception;
}
