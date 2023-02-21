package kr.co.dbvision.lib.ui.cmm.juso.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 파일 업다운로드에 관한 웹화면 클래스
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
@RequestMapping(value = "pop")
public class JusoView {
 
	@RequestMapping(value = "juso/view")
	public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
		return new ModelAndView("lib/juso", paramMap);
	}
}
