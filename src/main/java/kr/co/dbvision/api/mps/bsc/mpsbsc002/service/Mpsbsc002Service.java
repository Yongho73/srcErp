package kr.co.dbvision.api.mps.bsc.mpsbsc002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여항목기준관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.07          디비비전              최초 생성
 * </pre>
 */

public interface Mpsbsc002Service {
    
    public JSONObject searchComboMpsbsc002List(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 급여항목기준 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsbsc002(EgovMapForNull paramMap);
     /**
      * 급여항목기준 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsbsc002ForExcel(EgovMapForNull paramMap);
     /**
      * 급여항목기준 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsbsc002(EgovMapForNull paramMap);
     /**
      * 급여항목기준 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbsc002(EgovMapForNull paramMap) throws Exceptions;
 }
