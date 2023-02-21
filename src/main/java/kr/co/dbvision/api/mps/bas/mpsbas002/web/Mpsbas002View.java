package kr.co.dbvision.api.mps.bas.mpsbas002.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 사회보험율관리에 관한 웹화면 (View)  클래스
 *
 * @author 디비비전
 * @since 2019.12.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.12.16          디비비전              최초 생성
 *
 * </pre>
 */
@Controller
@RequestMapping(value="mpsbas002")
public class Mpsbas002View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchMpsSnlrcTariff/view", true));
        return mv;
    }

    @RequestMapping(value = "searchMpsSnlrcTariff/view")
    public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/bas/mpsbas002/mpsbas002SearchMpsSnlrcTariff", paramMap);
    }
}
