package kr.co.dbvision.api.mtx.bsc.mtxbsc002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득자관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.06
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.06          디비비전              최초 생성
 * </pre>
 */

public interface Mtxbsc002Service {
    /**
     * 소득자 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchMtxbsc002(EgovMapForNull paramMap);
    /**
     * 소득자 조회 목록을 엑셀용으로 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchMtxbsc002ForExcel(EgovMapForNull paramMap);
    /**
     * 소득자 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject findMtxbsc002(EgovMapForNull paramMap);
    /**
     * 소득자 정보를 저장한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject saveMtxbsc002(EgovMapForNull paramMap);
}