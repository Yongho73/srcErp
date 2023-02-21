package kr.co.dbvision.api.mta.mat.mtamat002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 유지보수요청요약에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.12.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.12.16          디비비전              최초 생성
 *
 * </pre>
 */

public interface Mtamat002Service {
     /**
      * 유지보수요청요약 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMtaRequst(EgovMapForNull paramMap);
     /**
      * 유지보수요청요약 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMtaRequstForExcel(EgovMapForNull paramMap);
     /**
      * 유지보수요청요약 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMtaRequst(EgovMapForNull paramMap);
     /**
      * 유지보수요청요약 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMtaRequst(EgovMapForNull paramMap);
     /**
      * 유지보수요청요약 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyMtaRequst(EgovMapForNull paramMap);
     /**
      * 유지보수요청요약 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMtaRequst(EgovMapForNull paramMap);
 }
