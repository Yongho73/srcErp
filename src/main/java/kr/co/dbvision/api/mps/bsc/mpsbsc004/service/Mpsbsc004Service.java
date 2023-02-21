package kr.co.dbvision.api.mps.bsc.mpsbsc004.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 금액기준등록관리에 관한 서비스 인터페이스 클래스
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

public interface Mpsbsc004Service {
    /**
     * 금액기준등록 대상 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchMpsbsc004Master(EgovMapForNull paramMap);
     /**
      * 금액기준등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsbsc004(EgovMapForNull paramMap);
     /**
      * 금액기준등록 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsbsc004ForExcel(EgovMapForNull paramMap);
     /**
      * 금액기준등록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsbsc004(EgovMapForNull paramMap);
     /**
      * 금액기준등록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbsc004(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 금액기준 : 직급별 금액, 계산식 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchGradeCalcMpsbsc004(EgovMapForNull paramMap);
     
     
     public JSONObject searchCalcMpsbsc004PopList(EgovMapForNull paramMap);
 }
