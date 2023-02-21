package kr.co.dbvision.api.pub.wks.pubwks013.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 출장복명관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */

public interface Pubwks013Service {
    /**
     * 사용자를 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject userDataPubwks013(EgovMapForNull paramMap);
    /**
      * 출장복명 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwks013(EgovMapForNull paramMap);
     /**
      * 출장복명 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwks013ForExcel(EgovMapForNull paramMap);
     /**
      * 출장복명 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwks013(EgovMapForNull paramMap);
     /**
      * 출장복명 대상자를 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findDtlPubwks013(EgovMapForNull paramMap);
     /**
      * 출장복명 정산 테이블을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findDtl2Pubwks013(EgovMapForNull paramMap);     
     /**
      * 출장테이블 첨부파일 번호 수정
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject updateBsrpAtchflNo(EgovMapForNull paramMap);     
     /**
      * 반려 건 복사
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveCopyPubwks013(EgovMapForNull paramMap);     
     /**
      * 출장복명 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveExcclcPubwks013(EgovMapForNull paramMap) throws Exceptions;
 }
