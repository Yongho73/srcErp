package kr.co.dbvision.api.mps.bsc.mpsbsc006.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여지급일자등록관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */

public interface Mpsbsc006Service {
    
    public JSONObject searchComboYeayMpsbsc006(EgovMapForNull paramMap);

    public JSONObject searchMpsbsc006MonthList(EgovMapForNull paramMap);

    /**
     * 급여지급일자등록 목록을 조회한다.
     * 
     * @param paramMap
     * @return
     */

    public JSONObject searchMpsbsc006(EgovMapForNull paramMap);

    
    public JSONObject searchItemListMpsbsc006(EgovMapForNull paramMap);    
    
    public JSONObject searchNewItemListMpsbsc006(EgovMapForNull paramMap);
    
    public JSONObject searchMpsbsc006closAtList(EgovMapForNull paramMap);    
    
    public JSONObject selectMpsbscItemList(EgovMapForNull paramMap);    
    // 전년도 데이터 복사
    public JSONObject saveCopyApplcYy(EgovMapForNull paramMap);
    
    /**
     * 급여지급일자등록 조회 목록을 엑셀용으로 조회한다.
     * 
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchMpsbsc006ForExcel(EgovMapForNull paramMap);

    /**
     * 급여지급일자등록 상세내용을 조회한다.
     * 
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject findMpsbsc006(EgovMapForNull paramMap);

    /**
     * 급여지급일자등록 정보를 저장한다.
     * 
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject saveMpsbsc006(EgovMapForNull paramMap);
    
    public JSONObject saveSalaryItemMpsbsc006(EgovMapForNull paramMap);

    /**
     * 급여지급일자등록 정보를 삭제한다.
     * 
     * @param paramMap
     * @throws Exceptions
     */
    public JSONObject removeMpsbsc006(EgovMapForNull paramMap);

    public JSONObject removeSalaryItemMpsbsc006(EgovMapForNull paramMap);
}
