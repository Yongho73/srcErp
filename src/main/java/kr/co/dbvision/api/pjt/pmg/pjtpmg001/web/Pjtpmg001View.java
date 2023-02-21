package kr.co.dbvision.api.pjt.pmg.pjtpmg001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 프로젝트현황에 관한 웹화면 (View)  클래스
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
@Controller
@RequestMapping(value="pjtpmg001")
public class Pjtpmg001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchPjtProject/view", true));
        return mv;
    }

    @RequestMapping(value = "searchPjtProject/view")
    public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtProject", paramMap);
    }
    
    @RequestMapping(value = "searchPjtHnf/view")
    public ModelAndView searchHnf(@RequestParam Map<String, Object> paramMap) {     
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtHnf", paramMap);
    }
    
    @RequestMapping(value = "searchPjtHnfAcmslt/view")
    public ModelAndView searchPjtHnfAcmslt(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtHnfAcmslt", paramMap);
    }
    
    @RequestMapping(value = "searchPjtHnfPlanAcmslt/view")
    public ModelAndView searchPjtHnfPlanAcmslt(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtHnfPlanAcmslt", paramMap);
    }
    
    @RequestMapping(value = "searchPjtBugtPlan/view")
    public ModelAndView searchPjtBugtPlan(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtBugtPlan", paramMap);
    }
    
    @RequestMapping(value = "searchPjtBugtAcmslt/view")
    public ModelAndView searchPjtBugtAcmslt(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtBugtAcmslt", paramMap);
    }
    
    @RequestMapping(value = "searchPjtBugtPlanAcmslt/view")
    public ModelAndView searchPjtBugtPlanAcmslt(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtBugtPlanAcmslt", paramMap);
    }
    
    @RequestMapping(value = "searchPjtOutputs/view")
    public ModelAndView searchPjtOutput(@RequestParam Map<String, Object> paramMap) {       
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtOutputs", paramMap);
    }
    
    @RequestMapping(value = "searchPjtOutputM/view")
    public ModelAndView searchPjtOutputM(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtOutputM", paramMap);
    }
    
    @RequestMapping(value = "popup/searchPjtOutputs/view")
    public ModelAndView searchPjtOutputPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtOutputsPopup", paramMap);
    }
    
    @RequestMapping(value = "searchPjtIssue/view")
    public ModelAndView searchPjtIssue(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtIssue", paramMap);
    }
    
    @RequestMapping(value = "searchPjtCcpy/view")
    public ModelAndView searchPjtCcpy(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtCcpy", paramMap);
    }
    
    @RequestMapping(value = "searchPjtEnd/view")
    public ModelAndView searchPjtEnd(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001SearchPjtEnd", paramMap);
    }
    
    @RequestMapping(value = "popup/searchPjtCustomer/view")
    public ModelAndView searchPjtCustomer(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001CustomerPopup", paramMap);
    }
    
    @RequestMapping(value = "popup/pjtpmgCcpyPopup/view")
    public ModelAndView pjtpmgCcpyPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001CcpyPopup", paramMap);
    }
    
    @RequestMapping(value = "popup/pjtpmgIssueActPopup/view")
    public ModelAndView pjtpmgIssueActPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001IssueActPopup", paramMap);
    }
    
    @RequestMapping(value = "popup/pjtpmgApprovPopup/view")
    public ModelAndView pjtpmgApprovPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001ApprovPopup", paramMap);
    }
    
    @RequestMapping(value = "popup/pjtpmgEndApprovPopup/view")
    public ModelAndView pjtpmgEndApprovPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001EndApprovPopup", paramMap);
    }
    
    @RequestMapping(value = "popup/pjtpmgRepairPlanPopup/view")
    public ModelAndView pjtpmgRepairPlanPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001RepairPlanPopup", paramMap);
    }
    
    @RequestMapping(value = "popup/pjtpmgApprovalPopup/view")
    public ModelAndView pjtpmgApprovalPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg001/pjtpmg001ApprovalPopup", paramMap);
    }
}
