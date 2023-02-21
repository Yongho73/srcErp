package kr.co.dbvision.api.mps.cal.mpscal013.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여대상자생성관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.17          디비비전              최초 생성
 * </pre>
 */

public interface Mpscal013Service {
    /**
     * 직원목록조회
     * @param paramMap
     * @return
     */
    public JSONObject searchMpscalEmp(EgovMapForNull paramMap);
     /**
      * 급여대상자생성 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal013(EgovMapForNull paramMap);
     /**
      * 급여대상자생성 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpscal013ForExcel(EgovMapForNull paramMap);
     /**
      * 급여대상자생성 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscal013(EgovMapForNull paramMap);
     /**
      * 급여대상자생성 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscal013(EgovMapForNull paramMap);
     
     /**
      * 계좌조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchAcnutMpscal013(EgovMapForNull paramMap);
     
 }
