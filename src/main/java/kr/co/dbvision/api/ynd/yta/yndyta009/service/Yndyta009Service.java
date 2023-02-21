package kr.co.dbvision.api.ynd.yta.yndyta009.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 과세기준관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.09.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.04          디비비전              최초 생성
 * </pre>
 */

public interface Yndyta009Service {
     /**
      * 과세기준 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchYndyta009(EgovMapForNull paramMap);
     /**
      * 과세기준 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchYndyta009ForExcel(EgovMapForNull paramMap);
     /**
      * 과세기준 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findYndyta009(EgovMapForNull paramMap);
     /**
      * 과세기준 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveYndyta009(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 전년도 과세기준 상세내용을 조회한다. / 복사한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findSaveYndyta009(EgovMapForNull paramMap);
     public JSONObject saveCopyYndTaxtStd(EgovMapForNull paramMap);
 }
