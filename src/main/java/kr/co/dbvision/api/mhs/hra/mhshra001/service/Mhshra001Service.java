package kr.co.dbvision.api.mhs.hra.mhshra001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 인사발령관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.16
 * @version 1.0
 * @sourceGen version 2020.06.11.02 (2020.06.16)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.16          디비비전              최초 생성
 * </pre>
 */

public interface Mhshra001Service {
    /**
     * 발령구분 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject gnfdCodeData(EgovMapForNull paramMap);
     /**
      * 인사발령 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshra001(EgovMapForNull paramMap);
     /**
      * 인사발령 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshra001ForExcel(EgovMapForNull paramMap);
     /**
      * 인사발령 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshra001(EgovMapForNull paramMap);
     /**
      * 인사발령 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshra001(EgovMapForNull paramMap);
     /**
      * 엑셀 업로드 데이터를 확인한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject checkDataMhshra001(EgovMapForNull paramMap, StringBuffer strBfReq);
     /**
      * 승급대상자를 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject searchAdvanEmpMhshra001(EgovMapForNull paramMap);
 }
