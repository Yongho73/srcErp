package kr.co.dbvision.api.pub.wks.pubwks004.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 휴직신청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.03          디비비전              최초 생성
 * </pre>
 */

public interface Pubwks004Service {
    /**
     * 사용자 정보를 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject userInformationPubwks004(EgovMapForNull paramMap);
     /**
      * 휴직신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwks004(EgovMapForNull paramMap);
     /**
      * 휴직신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwks004ForExcel(EgovMapForNull paramMap);
     /**
      * 휴직신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwks004(EgovMapForNull paramMap);
     /**
      * 휴직신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubwks004(EgovMapForNull paramMap);
     /**
      * 휴직신청 정보를 복사한다
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveCopyPubwks004(EgovMapForNull paramMap);
 }
