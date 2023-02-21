package kr.co.dbvision.lib.ui.cmm.comCode.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 공통코드팝업에 관한 웹화면 (View)  클래스
 *
 * @author 디비비전
 * @since 2020.04.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.27          디비비전              최초 생성
 *
 * </pre>
 */
@Controller
@RequestMapping(value="pop")
public class ComCodeView {

    @RequestMapping(value = "comCode2/view")
    public ModelAndView searchComCode2(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("lib/comCode2", paramMap);
    }    
}
