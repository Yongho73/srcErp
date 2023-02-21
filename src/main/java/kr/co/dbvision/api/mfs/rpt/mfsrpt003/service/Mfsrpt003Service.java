package kr.co.dbvision.api.mfs.rpt.mfsrpt003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 출장결의서에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.31          디비비전              최초 생성
 *
 * </pre>
 */

public interface Mfsrpt003Service {
     /**
      * 출장결의서 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMfsSlipComm(EgovMapForNull paramMap);
     /**
      * 출장결의서 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMfsSlipCommForExcel(EgovMapForNull paramMap);
     /**
      * 출장결의서 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMfsSlipComm(EgovMapForNull paramMap);
     /**
      * 출장결의서 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMfsSlipComm(EgovMapForNull paramMap);
     /**
      * 출장결의서 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyMfsSlipComm(EgovMapForNull paramMap);
     /**
      * 출장결의서 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMfsSlipComm(EgovMapForNull paramMap);
     /**
      * 출장결의서 상세목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMfsBiztripSlip(EgovMapForNull paramMap);
     
 }
