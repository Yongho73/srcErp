package kr.co.dbvision.api.mhs.hrm.mhshrm003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 조직코드관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.20
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.20)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.20          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm003Service {
     /**
      * 조직코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm003(EgovMapForNull paramMap);
     /**
      * 조직코드 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm003ForExcel(EgovMapForNull paramMap);
     /**
      * 조직코드 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm003(EgovMapForNull paramMap);
     /**
      * 조직코드 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm003(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 조직코드 삭제전 사용여부를 확인한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject deleteCheckMhshrm003(EgovMapForNull paramMap);
     /**
      * 조직코드 정보를 삭제한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject deleteMhshrm003(EgovMapForNull paramMap) throws Exceptions;
 }
