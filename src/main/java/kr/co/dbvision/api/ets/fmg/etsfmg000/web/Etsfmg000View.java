package kr.co.dbvision.api.ets.fmg.etsfmg000.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 양식관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2021.03.18
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.18          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="etsfmg000")
public class Etsfmg000View {

    @RequestMapping(value="view")
    public ModelAndView main() {
        return new ModelAndView("ets/fmg/etsfmg000/etsfmg000");
    }
    
    @RequestMapping(value="popup/html/preview")
    public ModelAndView preview() {
        return new ModelAndView("ets/fmg/etsfmg000/preview");
    }    
}
