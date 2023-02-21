package kr.co.dbvision.api.stm.mng.stmmng004.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 그룹권한관리에 관한 웹화면 (View)  클래스
 *
 * @author 디비비전
 * @since 2019.05.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.16          디비비전              최초 생성
 *
 * </pre>
 */
@Controller
@RequestMapping(value="stmmng004")
public class Stmmng004View {

	@RequestMapping(value = "view")
	public ModelAndView view(@RequestParam Map<String, Object> paramMap) {		
		ModelAndView mv = new ModelAndView();
		mv.setView(new RedirectView("searchStmRolemenu/view", true));		
		return mv;
	}

//	@RequestMapping(value = "searchStmRolemenu/view")
//	public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
//		return new ModelAndView("stm/mng/stmmng004/stmmng004SearchStmRolemenu", paramMap);
//	}
	
	@RequestMapping(value = "searchStmRolemenu/view")
    public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng004/stmmng004", paramMap);
    }
	
	@RequestMapping(value = "popup/menu/view")
	public ModelAndView popupMenu(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("stm/mng/stmmng004/stmmng004PopupMenu", paramMap);
	}
}
