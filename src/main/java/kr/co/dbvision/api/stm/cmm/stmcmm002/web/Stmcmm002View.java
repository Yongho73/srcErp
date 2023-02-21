package kr.co.dbvision.api.stm.cmm.stmcmm002.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 메인에 관한 웹화면 클래스
 *
 * @author  디비비전
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        디비비전          최초 생성
 *
 * </pre>
 */ 
@Controller
@RequestMapping(value = "stmcmm002")
public class Stmcmm002View {
	/**
	 * 서브 폼
	 * @return
	 */
	@RequestMapping(value = "view")
	public ModelAndView main(@RequestParam Map<String, Object> paramMap) {		
		ModelAndView mv = new ModelAndView();
		mv.setView(new RedirectView("main/view", true));		
		return mv;
	}

	@RequestMapping(value = "main/view")
	public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("stm/cmm/stmcmm002/stmcmm002Main", paramMap);
	}

	@RequestMapping(value = "sub/view")
	public ModelAndView save(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("stm/cmm/stmcmm002/stmcmm002Sub", paramMap);
	}
}
