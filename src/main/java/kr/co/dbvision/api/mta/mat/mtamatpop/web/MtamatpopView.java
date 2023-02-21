package kr.co.dbvision.api.mta.mat.mtamatpop.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping(value="mtamatpop")
public class MtamatpopView {
	
	@RequestMapping(value="view")
	public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
		ModelAndView mv = new ModelAndView();
		mv.setView(new RedirectView("saveMtaRequst/view", true));
		return mv;
	}
	
	@RequestMapping(value = "saveMtaRequst/view")
	public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("mta/mat/mtamatpop/mtamat001PopupForm", paramMap);
	}

}
