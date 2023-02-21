package kr.co.dbvision.lib.ui.sample.page.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 개발에 필요한 샘플 페이지
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
@RequestMapping(value = "sample")
public class PageView {
	/**
	 * 샘플화면
	 * @return
	 */
	@RequestMapping(value = "view")
	public ModelAndView main(@RequestParam Map<String, Object> paramMap) {		
		ModelAndView mv = new ModelAndView();
		mv.setView(new RedirectView("page/view", true));		
		return mv;
	}

	@RequestMapping(value = "page/view")
	public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("sample/page", paramMap);
	}
	
	@RequestMapping(value = "fileUpdown/view")
	public ModelAndView fileUpdown(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("sample/fileUpdown", paramMap);
	}
	
	@RequestMapping(value = "grid/view")
	public ModelAndView grid(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("sample/grid", paramMap);
	}
	
	@RequestMapping(value = "crypto/view")
	public ModelAndView crypto(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("sample/crypto", paramMap);
	}
	
	@RequestMapping(value = "date/view")
	public ModelAndView date(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("sample/date", paramMap);
	}
	
	@RequestMapping(value = "compopup/view")
	public ModelAndView compopup(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("sample/compopup", paramMap);
	}
	
	@RequestMapping(value = "combo/view")
    public ModelAndView combo(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("sample/combo", paramMap);
    }
	
	@RequestMapping(value = "radio/view")
    public ModelAndView radio(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("sample/radio", paramMap);
    }
    
    @RequestMapping(value = "excelUpload/view")
    public ModelAndView excelUpload(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("sample/excelUpload", paramMap);
    }
    
    /**
     * 유지보수 요청 API
     */
	@RequestMapping(value = "apiRequst/view")
	public ModelAndView requstApi(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("sample/apiRequst", paramMap);
	}
}
