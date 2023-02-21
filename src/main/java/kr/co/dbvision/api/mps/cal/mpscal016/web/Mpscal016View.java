package kr.co.dbvision.api.mps.cal.mpscal016.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 급여일괄등록관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.08.07
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.07          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mpscal016")
public class Mpscal016View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal016/mpscal016", paramMap);
    }
    
    @RequestMapping(value="popup/findPopupsalaryitemList/view")
    public ModelAndView pop2(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("lib/salaryitem", paramMap); 
    }
}