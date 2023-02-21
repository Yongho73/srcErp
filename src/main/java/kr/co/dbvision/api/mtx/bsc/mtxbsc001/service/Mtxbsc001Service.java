package kr.co.dbvision.api.mtx.bsc.mtxbsc001.service;

import java.util.List;

import kr.co.dbvision.api.ynd.yta.yndyta008.entity.Combo;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득세율관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */

public interface Mtxbsc001Service {
    /**
     * 소득세율 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchMtxbsc001(EgovMapForNull paramMap);
    /**
     * 소득세율 조회 목록을 엑셀용으로 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchMtxbsc001ForExcel(EgovMapForNull paramMap);
    /**
     * 소득세율 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject findMtxbsc001(EgovMapForNull paramMap);
    /**
     * 소득세율 정보를 저장한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject saveMtxbsc001(EgovMapForNull paramMap);
    
 // 전년도 데이터 복사
    public JSONObject saveCopyApplcYy(EgovMapForNull paramMap);
    // 년도 별 리스트
    public JSONObject searchComboapplcYearList(EgovMapForNull paramMap) throws Exceptions;
    // 년도 별 리스트   
    public Combo searchapplcYearList(EgovMapForNull paramMap) throws Exceptions;
}
