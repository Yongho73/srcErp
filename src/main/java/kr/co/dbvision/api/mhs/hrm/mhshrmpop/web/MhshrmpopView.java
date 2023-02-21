package kr.co.dbvision.api.mhs.hrm.mhshrmpop.web;

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
 * @since 2019.05.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.23          디비비전              최초 생성
 *
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrmpop")
public class MhshrmpopView {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchMhsDept/view", true));
        return mv;
    }

    @RequestMapping(value = "searchMhsDept/view")
    public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrm/mhshrmpop/mhshrmpopSearchMhsDept", paramMap);
    }
    
    @RequestMapping(value = "searchMhsPost/view")
    public ModelAndView searchPost(@RequestParam Map<String, Object> paramMap) {
    	System.out.println("ddddddddddddddddddd");
        return new ModelAndView("mhs/hrm/mhshrmpop/mhshrmpopSearchMhsPost", paramMap);
    }
}
