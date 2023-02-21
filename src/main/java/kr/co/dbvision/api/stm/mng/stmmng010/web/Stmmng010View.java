package kr.co.dbvision.api.stm.mng.stmmng010.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 프로그램 개발현황관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.10
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.10          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="stmmng010")
public class Stmmng010View {

    @RequestMapping(value="view") 
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng010/stmmngTab", paramMap);
    }
    
    @RequestMapping(value="pds/view")
    public ModelAndView pds(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng010/stmmng010", paramMap);
    }
    
    @RequestMapping(value="day/view")
    public ModelAndView day(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng010/stmmng010day", paramMap);
    }
    
    @RequestMapping(value="week/view")
    public ModelAndView week(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng010/stmmng010week", paramMap);
    }
}
