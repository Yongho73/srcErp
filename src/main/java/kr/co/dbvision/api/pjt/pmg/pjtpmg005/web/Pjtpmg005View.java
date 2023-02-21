package kr.co.dbvision.api.pjt.pmg.pjtpmg005.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 개인별투입현황관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2021.02.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.02.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.02.22          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pjtpmg005")
public class Pjtpmg005View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg005/pjtpmg005", paramMap);
    }
    
    @RequestMapping(value="popup/pjtpmg005Popup/view")
    public ModelAndView pjtmng005Popup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg005/pjtpmg005Popup", paramMap);
    }
    
    @RequestMapping(value="popup/pjtpmg005ProjectListPopup/view")
    public ModelAndView pjtpmg005ProjectListPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg005/pjtpmg005ProjectListPopup", paramMap);
    }
}
