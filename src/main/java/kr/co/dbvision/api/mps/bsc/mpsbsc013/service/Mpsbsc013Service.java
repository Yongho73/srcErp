package kr.co.dbvision.api.mps.bsc.mpsbsc013.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험요율관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.12
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.12          디비비전              최초 생성
 * </pre>
 */

public interface Mpsbsc013Service {
     /**
      * 급여기초환경설정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsbsc013(EgovMapForNull paramMap);
     /**
      * 급여기초환경설정 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsbsc013ForExcel(EgovMapForNull paramMap);
     /**
      * 급여기초환경설정 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsbsc013(EgovMapForNull paramMap);
     /**
      * 급여기초환경설정 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbsc013(EgovMapForNull paramMap);
     /**
      * 급여기초환경설정 정보를 삭제한다.
      * @param paramMap
      * @return
      */
     public JSONObject deleteMpsbsc013(EgovMapForNull paramMap);
     
     

     /**
      * 사회보험요율 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject selectMpsbscTap2Tariff(EgovMapForNull paramMap);
     /**
      * 사회보험요율 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbscTap2Tariff(EgovMapForNull paramMap);
     
     

     /**
      * 퇴직금기초설정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject selectMpsbscTap3Rtrpay(EgovMapForNull paramMap);
     /**
      * 퇴직금기초설정 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbscTap3Rtrpay(EgovMapForNull paramMap);
 }
