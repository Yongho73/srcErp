package kr.co.dbvision.api.mps.cal.mpscal005.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여계산/조정관리에 관한 서비스 인터페이스 클래스
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

public interface Mpscal005Service {
    /**
     * 직원목록조회
     * @param paramMap
     * @return
     */
    public JSONObject searchMpscalEmp(EgovMapForNull paramMap);
    
     /**
      * 급여계산/조정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal005(EgovMapForNull paramMap);
     /**
      * 급여계산/조정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal005Item(EgovMapForNull paramMap);
     /**
      * 급여계산/조정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal005SUM(EgovMapForNull paramMap);
     /**
      * 급여계산/조정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscalSUM(EgovMapForNull paramMap);
     /**
      * 급여계산/조정 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpscal005ForExcel(EgovMapForNull paramMap);
     /**
      * 급여계산/조정 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscal005(EgovMapForNull paramMap);
     /**
      * 급여계산/조정 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscal005(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 급여계산/조정 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscalItem(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 급여계산/조정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject MPS_PYMNTDE(EgovMapForNull paramMap, List<String> empnos);
 }