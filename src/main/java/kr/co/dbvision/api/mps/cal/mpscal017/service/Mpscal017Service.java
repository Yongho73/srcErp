package kr.co.dbvision.api.mps.cal.mpscal017.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여마감관리에 관한 서비스 인터페이스 클래스
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

public interface Mpscal017Service {
    public JSONObject searchComboYeayMpscal017(EgovMapForNull paramMap);

    public JSONObject searchMpscal017MonthList(EgovMapForNull paramMap);

    /**
     * 급여지급일자등록 목록을 조회한다.
     * 
     * @param paramMap
     * @return
     */

    public JSONObject searchMpscal017(EgovMapForNull paramMap);    

     /**
      * 급여마감 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpscal017ForExcel(EgovMapForNull paramMap);
     /**
      * 급여마감 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscal017(EgovMapForNull paramMap);
     /**
      * 급여마감 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscal017(EgovMapForNull paramMap);
     
 }