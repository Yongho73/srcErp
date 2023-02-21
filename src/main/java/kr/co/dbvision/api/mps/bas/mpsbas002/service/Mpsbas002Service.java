package kr.co.dbvision.api.mps.bas.mpsbas002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험율관리에 관한 서비스 인터페이스
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

public interface Mpsbas002Service {
     /**
      * 사회보험율 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsSnlrcTariff(EgovMapForNull paramMap);
     /**
      * 사회보험율 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsSnlrcTariffForExcel(EgovMapForNull paramMap);
     /**
      * 사회보험율 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsSnlrcTariff(EgovMapForNull paramMap);
     /**
      * 사회보험율 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsSnlrcTariff(EgovMapForNull paramMap);
     /**
      * 사회보험율 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyMpsSnlrcTariff(EgovMapForNull paramMap);
     /**
      * 사회보험율 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMpsSnlrcTariff(EgovMapForNull paramMap);
 }
