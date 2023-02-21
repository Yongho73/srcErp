package kr.co.dbvision.api.pjt.pmg.pjtpmg002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트등록에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2020.01.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.15          디비비전              최초 생성
 *
 * </pre>
 */

public interface Pjtpmg002Service {
     /**
      * 프로젝트등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트등록 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPjtProjectForExcel(EgovMapForNull paramMap);
     /**
      * 프로젝트등록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트등록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트등록 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyPjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트등록 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removePjtProject(EgovMapForNull paramMap);
     
     public JSONObject searchPjtProjectBcncList(EgovMapForNull paramMap);
     
     public JSONObject modifyPjtProjectBcncList(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectBcncList(EgovMapForNull paramMap);
     
     public JSONObject removePjtProjectBcncList(EgovMapForNull paramMap);
 }
