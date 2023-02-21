package kr.co.dbvision.api.pub.edu.pubedu001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 교육조회및신청관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.09.01
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.01)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.01          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pubedu001")
public class Pubedu001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/edu/pubedu001/pubedu001", paramMap);
    }
    
    @RequestMapping(value="popup/findPopupeducourseCodeList/view")
    public ModelAndView pop2(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("lib/educourseCode", paramMap); 
    }
    
}
