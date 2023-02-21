package kr.co.dbvision.api.tst.mng.tstmng001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 테스트관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.04.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.16          디비비전              최초 생성
 * </pre>
 */

public interface Tstmng001Service {
     /**
      * 테스트 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchTstmng001(EgovMapForNull paramMap);
     /**
      * 테스트 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchTstmng001ForExcel(EgovMapForNull paramMap);
     /**
      * 테스트 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findTstmng001(EgovMapForNull paramMap);
     /**
      * 테스트 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveTstmng001(EgovMapForNull paramMap);
     /**
      * 테스트 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeTstmng001(EgovMapForNull paramMap);
 }
