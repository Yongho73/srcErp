package kr.co.dbvision.api.mps.cal.mpscal022.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 개인별급여기준등록관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mpscal022")
public class Mpscal022View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal022/mpscal022", paramMap);
    }
    
    @RequestMapping(value="searchMpsFamily/view")
    public ModelAndView Family(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal022/mpscalFamily", paramMap);
    }
    
    @RequestMapping(value="searchMpsAcnut/view")
    public ModelAndView Acnut(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal022/mpscalAcnut", paramMap);
    }
    
    @RequestMapping(value="searchMpsCrqfs/view")
    public ModelAndView Crqfs(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal022/mpscalCrqfs", paramMap);
    }
    
    @RequestMapping(value="searchMpsStdr/view")
    public ModelAndView Stdr(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal022/mpscalStdr", paramMap);
    }
}
