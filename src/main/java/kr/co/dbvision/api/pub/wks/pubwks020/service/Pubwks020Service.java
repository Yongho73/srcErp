package kr.co.dbvision.api.pub.wks.pubwks020.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 시차근무관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.14
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.14)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.14          디비비전              최초 생성
 * </pre>
 */

public interface Pubwks020Service {
    /**
     * 달력 생성
     * @param paramMap
     * @return
     */
    public JSONObject makeCalendar(EgovMapForNull paramMap);
     /**
      * 시차근무 이력을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchHistoryPubwks020(EgovMapForNull paramMap);
     /**
      * 시차근무 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwks020ForExcel(EgovMapForNull paramMap);
     /**
      * 시차근무 승인 상태를 수정한다
      * @param paramMap
      * @return
      */
     public JSONObject updateConfmSttusPubwks020(EgovMapForNull paramMap , List<String> empnoList) throws Exceptions;
     /**
      * 시차근무 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwks020(EgovMapForNull paramMap);
     /**
      * 시차근무 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubwks020(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 시차근무 정보를 복사한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject copyPubwks020(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 시차근무 정보를 일괄 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveBundlePubwks020(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 시차근무 정보를 삭제한다
      * @param paramMap
      * @return
      */
     public JSONObject deletePubwks020(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 시차근무 정보를 일괄 삭제한다
      * @param paramMap
      * @return
      */
     public JSONObject deleteBundlePubwks020(EgovMapForNull paramMap) throws Exceptions;
 }
