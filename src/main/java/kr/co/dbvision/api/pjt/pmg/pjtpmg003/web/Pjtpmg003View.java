package kr.co.dbvision.api.pjt.pmg.pjtpmg003.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 프로젝트관리에 관한 웹화면 (View)  클래스
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
@Controller
@RequestMapping(value="pjtpmg003")
public class Pjtpmg003View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchPjtProject/view", true));
        return mv;
    }

    @RequestMapping(value = "searchPjtProject/view")
    public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg003/pjtpmg003SearchPjtProject", paramMap);
    }
}
