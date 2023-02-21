package kr.co.dbvision.api.stm.cmm.stmcmm001.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 로그인에 관한 웹화면 클래스
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
@RequestMapping(value = "stmcmm001")
public class Stmcmm001View {
	/**
	 * 로그인 폼
	 * @return
	 */
	@RequestMapping(value = "view")
	public ModelAndView stmcmm01() {
		return new ModelAndView("stm/cmm/stmcmm001/stmcmm001");
	}
}
