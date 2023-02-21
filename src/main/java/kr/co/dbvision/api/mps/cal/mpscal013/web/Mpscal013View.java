package kr.co.dbvision.api.mps.cal.mpscal013.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 급여대상자생성관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mpscal013")
public class Mpscal013View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal013/mpscal013", paramMap);
    }
    
    /**
     * 계좌번호 팝업 
     * @param paramMap
     * @return
     */
    @RequestMapping(value="popup/findPopupAcnutList/view")
    public ModelAndView Acnut(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal013/acnut", paramMap); 
    }  
    
}
