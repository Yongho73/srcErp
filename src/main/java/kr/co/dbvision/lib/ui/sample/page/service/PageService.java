package kr.co.dbvision.lib.ui.sample.page.service;

import java.util.Map;

import egovframework.rte.fdl.cryptography.EgovCryptoService;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;


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
public interface PageService {
	/**
	 * 암복호화 샘플
	 * @param paramMap
	 * @return
	 * @throws Exceptions
	 */
	public EgovMapForNull getEncodeString(EgovCryptoService cryptoService, Map<String, String> paramMap) throws Exceptions; 
	
	/**
     * 인사기본 목록을 조회한다. : rowspan sample 용
     * @param paramMap
     * @return
     */
    public JSONObject searchMhsEmp_rowspanSample(EgovMapForNull paramMap);
	
	/**
     * colspan sample 용
     * @param paramMap
     * @return
     */
    public JSONObject searc_colSpanSample(EgovMapForNull paramMap);
	
	/**
     * 달력 sample 용
     * @param paramMap
     * @return
     */
    public JSONObject search_dateSample(EgovMapForNull paramMap);
}
