package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service;

import kr.co.dbvision.lib.EgovMapForNull;
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

public interface Pjtpmg001HnfService {
     
     public JSONObject searchPjtProjectHnfPlanList(EgovMapForNull paramMap);
     
     public JSONObject modifyPjtProjectHnfPlanList(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectHnfPlanList(EgovMapForNull paramMap);
     
     public JSONObject removePjtProjectHnfPlanList(EgovMapForNull paramMap);
     
     public JSONObject searchPjtProjectHnfPlanAcmsltList(EgovMapForNull paramMap);
     
     public JSONObject searchPjtProjectHnfPlanAcmsltAddList(EgovMapForNull paramMap);
     
     public JSONObject searchPjtProjectHnfAcmsltList(EgovMapForNull paramMap);
     
     public JSONObject modifyPjtProjectHnfAcmsltList(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectHnfAcmsltList(EgovMapForNull paramMap);
     
     public JSONObject removePjtProjectHnfAcmsltList(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectHnfAcmsltCopy(EgovMapForNull paramMap);
     
     public JSONObject savePjtProjectHnfPlanCopy(EgovMapForNull paramMap);
     
     public JSONObject findPjtProjectDe(EgovMapForNull paramMap);
     
     public JSONObject modifyPjtProjectBugtHnfPlan(EgovMapForNull paramMap);
     
     public JSONObject removePjtProjectBugtHnfPlan(EgovMapForNull paramMap);
     
     public JSONObject modifyPjtProjectBugtHnfAcmslt(EgovMapForNull paramMap);
     
     public JSONObject removePjtProjectBugtHnfAcmslt(EgovMapForNull paramMap);
     
     
    
 }
