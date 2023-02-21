package kr.co.dbvision.api.mhs.hrd.mhshrd006.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 휴직신청관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.31          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrd006Service {
    /**
     * 사용자 정보를 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject userInformationMhshrd006(EgovMapForNull paramMap);
     /**
      * 휴직신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrd006(EgovMapForNull paramMap);
     /**
      * 휴직신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrd006ForExcel(EgovMapForNull paramMap);
     /**
      * 휴직신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrd006(EgovMapForNull paramMap);
     /**
      * 휴직신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrd006(EgovMapForNull paramMap);
     /**
      * 휴직신청 정보를 복사한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveCopyMhshrd006(EgovMapForNull paramMap);
     
 }
