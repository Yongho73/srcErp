package kr.co.dbvision.api.mhs.hrm.mhshrm010.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 출장비기준코드관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.04.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.22          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm010Service {
     /**
      * 출장비기준코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm010(EgovMapForNull paramMap);
     /**
      * 출장비기준코드 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm010ForExcel(EgovMapForNull paramMap);
     /**
      * 출장비기준코드 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm010(EgovMapForNull paramMap);
     /**
      * 출장비기준코드 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm010(EgovMapForNull paramMap);
     /**
      * 출장비기준코드 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
//     public JSONObject removeMhshrm010(EgovMapForNull paramMap);
 }
