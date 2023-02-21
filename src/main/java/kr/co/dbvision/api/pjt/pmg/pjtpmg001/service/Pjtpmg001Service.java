package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2020.01.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */

public interface Pjtpmg001Service {
     /**
      * 프로젝트현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPjtProject(EgovMapForNull paramMap);
     
     public JSONObject searchPjtProjectApprv(EgovMapForNull paramMap);
     /**
      * 프로젝트현황 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPjtProjectForExcel(EgovMapForNull paramMap);
     /**
      * 프로젝트현황 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트현황 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트현황 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyPjtProject(EgovMapForNull paramMap);
     /**
      * 프로젝트현황 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removePjtProject(EgovMapForNull paramMap);
     
     public JSONObject searchPjtProjectBcncList(EgovMapForNull paramMap);
     
     public JSONObject modifyPjtProjectBcncList(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectBcncList(EgovMapForNull paramMap);
     
     public JSONObject removePjtProjectBcncList(EgovMapForNull paramMap);
     
     public JSONObject searchPjtProjectCustomerList(EgovMapForNull paramMap);
     
     public JSONObject searchPjtProjectBaseCustomerList(EgovMapForNull paramMap);
     
     public JSONObject findJobDay(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectNewApprov(EgovMapForNull paramMap);
     
     public JSONObject findNewApprov(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectNewApprovDe(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectEnd(EgovMapForNull paramMap);
     
     public JSONObject modifyPjtProjectEnd(EgovMapForNull paramMap);
     
     public JSONObject findPjtProjectEnd(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectEndApprov(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectEndApprovDe(EgovMapForNull paramMap);
     
     public JSONObject findPjtProjectPlanAcmsltCnt(EgovMapForNull paramMap);
     
     public JSONObject savePjtRepair(EgovMapForNull paramMap);
     
     public JSONObject findPjtRepair(EgovMapForNull paramMap);
     
     public JSONObject searchPjtRepairList(EgovMapForNull paramMap);
     
     public JSONObject removePjtRepair(EgovMapForNull paramMap);
 }
