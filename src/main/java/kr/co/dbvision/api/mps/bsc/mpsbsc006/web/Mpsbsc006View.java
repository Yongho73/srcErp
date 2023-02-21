package kr.co.dbvision.api.mps.bsc.mpsbsc006.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 급여지급일자등록관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mpsbsc006")
public class Mpsbsc006View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/bsc/mpsbsc006/mpsbsc006", paramMap);
    }
    

    @RequestMapping(value="popup/findMpsbsc006SalaryType/view")
    public ModelAndView pop1(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/bsc/mpsbsc006/mpsbsc006SalaryTypePopup", paramMap); 
    }    
    
    @RequestMapping(value="popup/findMpsbsc006SalItemList/view")
    public ModelAndView pop2(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/bsc/mpsbsc006/mpsbsc006SalItemPopup", paramMap); 
    }     
    
}
