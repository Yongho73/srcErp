package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 프로젝트현황에 관한 매퍼 클래스
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

@Mapper("Pjtpmg001Mapper")
public interface Pjtpmg001Mapper {
     /**
      * 프로젝트현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPjtProjectList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectApprvList(EgovMapForNull paramMap);
      /**
       * 프로젝트현황 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPjtProject(EgovMapForNull paramMap);
      /**
       * 프로젝트현황 정보를 등록한다.
       * @param paramMap
       */
      public void insertPjtProject(EgovMapForNull paramMap);
      /**
       * 프로젝트현황 정보를 수정한다.
       * @param paramMap
       */
      public void updatePjtProject(EgovMapForNull paramMap);
      /**
       * 프로젝트현황 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePjtProject(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectBcncList(EgovMapForNull paramMap);
      
      public void updatePjtProjectBcncList(EgovMapForNull paramMap);
      
      public void insertPjtProjectBcncList(EgovMapForNull paramMap);
      
      public void deletePjtProjectBcncList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectHnfPlanList(EgovMapForNull paramMap);
      
      public void updatePjtProjectHnfPlanList(EgovMapForNull paramMap);
      
      public void insertPjtProjectHnfPlanList(EgovMapForNull paramMap);
      
      public void deletePjtProjectHnfPlanList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectHnfPlanAcmsltList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectHnfPlanAcmsltAddList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectHnfAcmsltList(EgovMapForNull paramMap);
      
      public void updatePjtProjectHnfAcmsltList(EgovMapForNull paramMap);
      
      public void insertPjtProjectHnfAcmsltList(EgovMapForNull paramMap);
      
      public void deletePjtProjectHnfAcmsltList(EgovMapForNull paramMap);
      
      public void insertPjtProjectHnfAcmsltCopy(EgovMapForNull paramMap);
      
      public void insertPjtProjectHnfPlanCopy(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtBugtPlanList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtBugtPlanDtlList(EgovMapForNull paramMap);
      
      public void updatePjtBugtPlanDtlList(EgovMapForNull paramMap);
      
      public void insertPjtBugtPlanDtlList(EgovMapForNull paramMap);
      
      public void deletePjtBugtPlanDtlList(EgovMapForNull paramMap);
      
      public EgovMapForNull selectPjtProjectDe(EgovMapForNull paramMap);
      
      public String selectPjtProjectMonth(EgovMapForNull paramMap);
      
      public void deletePjtProjectBugtHnfPlan(EgovMapForNull paramMap);
      
      public void insertPjtProjectBugtHnfPlan(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtBugtAcmsltList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtBugtAcmsltDtlList(EgovMapForNull paramMap);
      
      public void updatePjtBugtAcmsltDtlList(EgovMapForNull paramMap);
      
      public void insertPjtBugtAcmsltDtlList(EgovMapForNull paramMap);
      
      public void deletePjtBugtAcmsltDtlList(EgovMapForNull paramMap);
      
      public void deletePjtProjectBugtHnfAcmslt(EgovMapForNull paramMap);
      
      public void insertPjtProjectBugtHnfAcmslt(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtBugtPlanAcmsltList(EgovMapForNull paramMap);
      
      public String selectPjtBugtBasisDt(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtBugtStmCode(EgovMapForNull paramMap);
      
      public EgovMapForNull selectPjtBugtAcmsltSum(EgovMapForNull paramMap);  
      
      public EgovMapForNull selectPjtBugtBaseDt(EgovMapForNull paramMap);  
      
      public String selectPjtProjectAmt(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtOutputList(EgovMapForNull paramMap);
      
      public void deletePjtProjectHnfAcmsltDeList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectCcpyList(EgovMapForNull paramMap);
      
      public EgovMapForNull selectPjtCcpy(EgovMapForNull paramMap);
      
      public void deletePjtCcpy(EgovMapForNull paramMap);
      
      public void savePjtCcpy(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectCustomerList(EgovMapForNull paramMap);

      public void updateIdsHnfAcmsltSnCnt(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectBaseCustomerList(EgovMapForNull paramMap);
      
      public int selectPjtCompAllCnt(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtBugtPlanAcmsltIndirectList(EgovMapForNull paramMap);
      
      public EgovMapForNull selectJobDay(EgovMapForNull paramMap);
      
      public void insertPjtProjectBugtHnfAcmsltCopy(EgovMapForNull paramMap);
      
      public void insertPjtProjectNewApprov(EgovMapForNull paramMap);
      
      public void updatePjtProjectNewApprovAt(EgovMapForNull paramMap);
      
      public EgovMapForNull selectNewApprov(EgovMapForNull paramMap);
      
      public void insertPjtProjectNewApprovDe(EgovMapForNull paramMap);
      
      public void insertPjtProjectEnd(EgovMapForNull paramMap);
      
      public void updatePjtProjectEnd(EgovMapForNull paramMap);
      
      public EgovMapForNull selectPjtProjectEnd(EgovMapForNull paramMap);
      
      public void insertPjtProjectEndApprov(EgovMapForNull paramMap);
      
      public void insertPjtProjectEndApprovDe(EgovMapForNull paramMap);
      
      public EgovMapForNull selectPjtProjectPlanAcmsltCnt(EgovMapForNull paramMap);
      
      public void savePjtRepair(EgovMapForNull paramMap);
      
      public EgovMapForNull selectPjtRepair(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtProjectRepairList(EgovMapForNull paramMap);
      
      public void deletePjtRepair(EgovMapForNull paramMap);
}
