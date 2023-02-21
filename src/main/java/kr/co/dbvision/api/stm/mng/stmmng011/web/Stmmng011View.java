package kr.co.dbvision.api.stm.mng.stmmng011.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 프로그램개선요청관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="stmmng011")
public class Stmmng011View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng011/stmmng011", paramMap);
    }
    
    @RequestMapping(value = "popup/findStmPrgRequst/view")
    public ModelAndView infoView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng011/stmmng011StmPrgRequstPopupForm", paramMap);
    }
    
    @RequestMapping(value = "popup/findStmPrgSearch/view")
    public ModelAndView infoViewSearch(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng011/stmmng011StmPrgSearchPopupForm", paramMap);
    }
}
