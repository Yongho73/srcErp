package kr.co.dbvision.api.stm.mng.stmmng001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 사용자관리에 관한 웹화면 (View)  클래스
 *
 * @author 디비비전
 * @since 2019.05.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.10          디비비전              최초 생성
 *
 * </pre>
 */
@Controller
@RequestMapping(value="stmmng001")
public class Stmmng001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchStmUsers/view", true));
        return mv;
    }

    @RequestMapping(value = "searchStmUsers/view")
    public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng001/stmmng001", paramMap);
    }
}
