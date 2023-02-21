package kr.co.dbvision.api.mps.cal.mpscal016.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여일괄등록관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.07
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.07          디비비전              최초 생성
 * </pre>
 */

public interface Mpscal016Service {
    /**
     * 급여일괄등록 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchMpscal016(EgovMapForNull paramMap);
    /**
     * 급여일괄등록 조회 목록을 엑셀용으로 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchMpscal016ForExcel(EgovMapForNull paramMap);
    /**
     * 급여일괄등록 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject findMpscal016(EgovMapForNull paramMap);
    /**
     * 급여일괄등록 정보를 저장한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject saveMpscal016(EgovMapForNull paramMap) throws Exceptions;
    
    public JSONObject searchpopMpscal016(EgovMapForNull paramMap);
    
    /**
     * 엑셀 업로드 데이터를 확인한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject checkDataMpscal016(EgovMapForNull paramMap, StringBuffer strBfReq);
}
