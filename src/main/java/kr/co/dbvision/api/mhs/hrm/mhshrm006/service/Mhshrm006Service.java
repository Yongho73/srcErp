package kr.co.dbvision.api.mhs.hrm.mhshrm006.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 가족코드관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrm006Service {
     /**
      * 가족코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm006(EgovMapForNull paramMap);
     /**
      * 가족코드 목록을 조회한다. - 콤보용
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm006Code(EgovMapForNull paramMap);
     /**
      * 가족코드 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm006ForExcel(EgovMapForNull paramMap);
     /**
      * 가족코드 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm006(EgovMapForNull paramMap);
     /**
      * 가족코드 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm006(EgovMapForNull paramMap);
     /**
      * 가족코드 사용여부를 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject useCheckMhshrm006(EgovMapForNull paramMap);
 }
