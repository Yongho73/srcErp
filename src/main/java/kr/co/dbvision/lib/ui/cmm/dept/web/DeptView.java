package kr.co.dbvision.lib.ui.cmm.dept.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 부서팝업에 관한 웹화면 (View)  클래스
 *
 * @author 디비비전
 * @since 2019.05.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.21          디비비전              최초 생성
 *
 * </pre>
 */
@Controller
@RequestMapping(value="pop")
public class DeptView {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchDept/view", true));
        return mv;
    }

    @RequestMapping(value = "dept/view")
    public ModelAndView searchMhsDept(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("lib/dept", paramMap);
    }
   /* @RequestMapping(value = "pop/searchMhsClsf/view")
    public ModelAndView searchMhsClsf(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrm/mhshrm008/mhshrm008SearchMhsClsfPop", paramMap);
    }*/
    
}
