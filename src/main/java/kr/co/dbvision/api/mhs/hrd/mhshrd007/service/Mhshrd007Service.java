package kr.co.dbvision.api.mhs.hrd.mhshrd007.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근태기준설정관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.22          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrd007Service {
     /**
      * 근태기준설정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrd007(EgovMapForNull paramMap);
     /**
      * 근태기준설정 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrd007ForExcel(EgovMapForNull paramMap);
     /**
      * 근무 유형 코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public JSONObject selectMhshrd007WorkTyCode(EgovMapForNull paramMap);
     /**
      * 근태기준설정 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrd007(EgovMapForNull paramMap);
     /**
      * 근태기준설정 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrd007(EgovMapForNull paramMap);
     /**
      * 근태발생기준 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStandardMhshrd007(EgovMapForNull paramMap);
     /**
      * 근태발생기준 목록을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
    public JSONObject searchStandardMhshrd007(EgovMapForNull paramMap);
 }
