package kr.co.dbvision.api.mhs.hrb.mhshrb001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 인사기본에 관한 웹화면 (View)  클래스
 *
 * @author 디비비전
 * @since 2019.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.22          디비비전              최초 생성
 *
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrb001")
public class Mhshrb001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchMhsEmp/view", true));
        return mv;
    }

    @RequestMapping(value = "searchMhsEmp/view")
    public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmp", paramMap);
    }
    
    /*신상정보*/
    @RequestMapping(value = "searchMhsTab2IndvdlInfo/view")
    public ModelAndView searchMhsIndvdlInfo(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab2IndvdlInfo", paramMap);
    }
    
    /*가족*/
    @RequestMapping(value = "searchMhsTab3Family/view")
    public ModelAndView searchMhsFamily(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab3Family", paramMap);
    }
    
    /*발령*/
    @RequestMapping(value = "searchMhsTab4Gnfd/view")
    public ModelAndView searchMhsGnfd(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab4Gnfd", paramMap);
    }
    
    /*포상 Tab5*/
    @RequestMapping(value = "searchMhsTab5Rward/view")
    public ModelAndView searchMhsRward(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab5Rward", paramMap);
    }
    
    /*징계 Tab6*/
    @RequestMapping(value = "searchMhsTab6Dscpl/view")
    public ModelAndView searchMhsDscpl(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab6Dscpl", paramMap);
    }
    
    /*학력 Tab7*/
    @RequestMapping(value = "searchMhsTab7Acdmcr/view")
    public ModelAndView searchMhsAcdmcr(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab7Acdmcr", paramMap);
    }
    
    /*경력 Tab8*/
    @RequestMapping(value = "searchMhsTab8Career/view")
    public ModelAndView searchMhsCareer(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab8Career", paramMap);
    }
    
    /*자격 Tab9*/
    @RequestMapping(value = "searchMhsTab9Crqfs/view")
    public ModelAndView searchMhsCrqfs(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab9Crqfs", paramMap);
    }
    
    /*교육 Tab10*/
    @RequestMapping(value = "searchMhsTab10Edu/view")
    public ModelAndView searchMhsEdu(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab10Edu", paramMap);
    }
    
    /*계좌 Tab11*/
    @RequestMapping(value = "searchMhsTab11Acnut/view")
    public ModelAndView searchMhsAcnut(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab11Acnut", paramMap);
    }
    
    /*어학(외국어) Tab12*/
    @RequestMapping(value = "searchMhsTab12Fggg/view")
    public ModelAndView searchMhsFggg(@RequestParam Map<String, Object> paramMap) {
    	paramMap.put("empno", paramMap.get("empno"));
        return new ModelAndView("mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab12Fggg", paramMap);
    }
    

}
