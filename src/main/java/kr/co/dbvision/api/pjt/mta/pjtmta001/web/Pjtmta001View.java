package kr.co.dbvision.api.pjt.mta.pjtmta001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 유지보수요청관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.08.06
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pjtmta001")
public class Pjtmta001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/mta/pjtmta001/pjtmta001", paramMap);
    }
    
    @RequestMapping(value = "popup/findPjtMtaRequst/view")
    public ModelAndView findPjtMtaRequst(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/mta/pjtmta001/pjtmta001RequstPopupForm", paramMap);
    }
    
    @RequestMapping(value = "popup/findPjtMtaSearch/view")
    public ModelAndView findPjtMtaSearch(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/mta/pjtmta001/pjtmta001SearchPopupForm", paramMap);
    }
    
    @RequestMapping(value = "popup/pjtmta001ProjectListPopup/view")
    public ModelAndView pjtmta001ProjectListPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/mta/pjtmta001/pjtmta001ProjectListPopup", paramMap);
    }
    
    @RequestMapping(value = "popup/pjtmta001OpertListPopup/view")
    public ModelAndView pjtmta001OpertListPopup(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/mta/pjtmta001/pjtmta001OpertPopupForm", paramMap);
    }
}
