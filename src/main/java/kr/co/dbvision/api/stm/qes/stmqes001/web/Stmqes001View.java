package kr.co.dbvision.api.stm.qes.stmqes001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 설문관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.04          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="stmqes001")
public class Stmqes001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/qes/stmqes001/stmqes001", paramMap);
    }
    
    @RequestMapping(value = "searchStmqesTrget/view")
    public ModelAndView searchStmqesTrget(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/qes/stmqes001/stmqesTrget", paramMap);
    }
    
    @RequestMapping(value = "searchStmqestnarCn/view")
    public ModelAndView searchStmqestnarCn(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/qes/stmqes001/stmqestnarCn", paramMap);
    }

    @RequestMapping(value = "pop/popupDtlRequest/view")
    public ModelAndView popupDtlRequest(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/qes/stmqes001/stmqesTrgetRequestpopup", paramMap);
    }
    
}
