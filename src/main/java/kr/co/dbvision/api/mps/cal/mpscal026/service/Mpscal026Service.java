package kr.co.dbvision.api.mps.cal.mpscal026.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 통상임금관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

public interface Mpscal026Service {
     /**
      * 통상임금 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal026(EgovMapForNull paramMap);
     
     /**
      * 통상임금 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal026Title(EgovMapForNull paramMap);
     /**
      * 통상임금 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpscal026ForExcel(EgovMapForNull paramMap);
     /**
      * 통상임금 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscal026(EgovMapForNull paramMap);
     /**
      * 통상임금 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscal026(EgovMapForNull paramMap) throws Exceptions;
     
     
     /**
      * 통상임금 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject  searchMpscal026OdysgCalc(EgovMapForNull paramMap);
     
     
 }
