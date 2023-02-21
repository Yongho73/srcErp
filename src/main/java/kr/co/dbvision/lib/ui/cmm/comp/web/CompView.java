package kr.co.dbvision.lib.ui.cmm.comp.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;


@Controller
@RequestMapping(value="pop")
public class CompView {
	
	public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchComp/view", true));
        return mv;
    }

    @RequestMapping(value = "comp/view")
    public ModelAndView searchMhsDept(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("lib/comp", paramMap);
    }

}
