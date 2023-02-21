package kr.co.dbvision.api.mps.cal.mpscal012.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 자녀학비보조금관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.29
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.29)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.29          디비비전              최초 생성
 * </pre>
 */

public interface Mpscal012Service {
     /**
      * 자녀학비보조금 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpscal012(EgovMapForNull paramMap);
     /**
      * 자녀학비보조금 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpscal012ForExcel(EgovMapForNull paramMap);
     /**
      * 자녀학비보조금 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpscal012(EgovMapForNull paramMap);
     /**
      * 자녀학비보조금 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpscal012(EgovMapForNull paramMap) throws Exceptions;
 }
