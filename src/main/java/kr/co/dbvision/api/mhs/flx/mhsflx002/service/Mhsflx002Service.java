package kr.co.dbvision.api.mhs.flx.mhsflx002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인별근무유형선택관리에 관한 서비스 인터페이스 클래스
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

public interface Mhsflx002Service {
    /**
     * 근무유형코드를 조회한다
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject searchWorkTyCode(EgovMapForNull paramMap);
     /**
      * 개인별근무유형선택 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsflx002(EgovMapForNull paramMap);
     /**
      * 개인별근무유형선택 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhsflx002ForExcel(EgovMapForNull paramMap);
     /**
      * 개인별근무유형선택 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhsflx002(EgovMapForNull paramMap);
     /**
      * 개인별근무유형선택 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsflx002(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 개인별근무유형 승인 상태를 수정한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject updateSttusMhsflx002(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 개인별근무유형선택 정보를 삭제한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject deleteMhsflx002(EgovMapForNull paramMap) throws Exceptions;
     
 
}
