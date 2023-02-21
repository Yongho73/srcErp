package kr.co.dbvision.api.pub.wks.pubwks016.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 국내출장신청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.29
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.06.29)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.29          디비비전              최초 생성
 * </pre>
 */

public interface Pubwks016Service {
    /**
     * 사용자 데이터를 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject userDataPubwks016(EgovMapForNull paramMap);
     /**
      * 국내출장신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwks016(EgovMapForNull paramMap);
     /**
      * 국내출장신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwks016ForExcel(EgovMapForNull paramMap);
     /**
      * 국내출장신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwks016(EgovMapForNull paramMap);
     /**
      * 국내출장신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findDtlPubwks016(EgovMapForNull paramMap);
     /**
      * 국내출장신청을 삭제한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject removePubwks016(EgovMapForNull paramMap);
     /**
      * 국내출장신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubwks016(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 전자결재순번 MAX값을 구한다 (복사 용)
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveCopyPubwks016(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 국내출장신청 상세 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveDtlPubwks016(EgovMapForNull paramMap) throws Exceptions;
 }
