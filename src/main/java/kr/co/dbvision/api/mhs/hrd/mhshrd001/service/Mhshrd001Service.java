package kr.co.dbvision.api.mhs.hrd.mhshrd001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 연차일수관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.10
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.10          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrd001Service {
     /**
      * 연차일수 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrd001(EgovMapForNull paramMap);
     /**
      * 연차일수 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrd001ForExcel(EgovMapForNull paramMap);
     /**
      * 연차일수 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrd001(EgovMapForNull paramMap);
     /**
      * 연차일수 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrd001(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 차기년도 연차 일수를 생성한다 (프로시저)
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject MHS_YEARCNT(EgovMapForNull paramMap) throws Exceptions;
 }
