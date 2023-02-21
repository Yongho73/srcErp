package kr.co.dbvision.api.stm.mng.stmmng002.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * 메뉴관리에 관한 웹화면 (View)  클래스
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
@RequestMapping(value="stmmng002")
public class Stmmng002View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        ModelAndView mv = new ModelAndView();
        mv.setView(new RedirectView("searchStmMenu/view", true));
        return mv;
    }

    @RequestMapping(value = "searchStmMenu/view")
    public ModelAndView search(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng002/stmmng002SearchStmMenu", paramMap);
    }
    
    /**
     * 메뉴목록 팝업 (2020.02.25. add by KLEE
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/stmMenuListPopup/view")
    public ModelAndView stmMenuLlistPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng011/stmMenuListPopup", paramMap);
    }
    
}
