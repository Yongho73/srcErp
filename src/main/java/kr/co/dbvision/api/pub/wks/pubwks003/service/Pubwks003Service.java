package kr.co.dbvision.api.pub.wks.pubwks003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 휴가신청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.04
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.04          디비비전              최초 생성
 * </pre>
 */

public interface Pubwks003Service {
    /**
     * 휴가구분을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject WrycTime(EgovMapForNull paramMap);
    /**
     * 연차일수를 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchWrycDaycntPubwks003(EgovMapForNull paramMap);
     /**
      * 휴가신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwks003(EgovMapForNull paramMap);
     
     /**
      * 대체 휴가 , 보상 휴가 목록을 조회한다
      * @param paramMap
      * @return
      */
     public JSONObject searchAltRewardHvofDePubwks003(EgovMapForNull paramMap);
     /**
      * 휴가신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwks003ForExcel(EgovMapForNull paramMap);
     /**
      * 휴가신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwks003(EgovMapForNull paramMap);
     /**
      * 휴가신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubwks003(EgovMapForNull paramMap);
 }
