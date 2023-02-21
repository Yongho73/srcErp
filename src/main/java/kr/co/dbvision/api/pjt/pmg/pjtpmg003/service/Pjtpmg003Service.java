package kr.co.dbvision.api.pjt.pmg.pjtpmg003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트관리에 관한 서비스 인터페이스
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

public interface Pjtpmg003Service {
     /**
      * 프로젝트 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPjtProjectForExcel(EgovMapForNull paramMap);
     /**
      * 프로젝트 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyPjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removePjtProject(EgovMapForNull paramMap);
 }
