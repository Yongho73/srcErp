package kr.co.dbvision.api.mhs.edu.mhsedu003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 교육결과보고관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.09.09
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.09          디비비전              최초 생성
 * </pre>
 */

public interface Mhsedu003Service {
     /**
      * 교육결과보고 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsedu003(EgovMapForNull paramMap);
     /**
      * 교육결과보고 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhsedu003ForExcel(EgovMapForNull paramMap);
     /**
      * 교육결과보고 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhsedu003(EgovMapForNull paramMap);
     /**
      * 교육결과보고 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsedu003(EgovMapForNull paramMap) throws Exceptions;
 }
