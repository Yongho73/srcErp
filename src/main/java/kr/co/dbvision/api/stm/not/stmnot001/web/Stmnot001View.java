package kr.co.dbvision.api.stm.not.stmnot001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * ERP게시판관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.08.21
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.21          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="stmnot001")
public class Stmnot001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/not/stmnot001/stmnot001", paramMap);
    }
    
    @RequestMapping(value = "popup/stmmot001Popup/view")
    public ModelAndView findPjtMtaRequst(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/not/stmnot001/stmnot001PopupForm", paramMap);
    }
}
