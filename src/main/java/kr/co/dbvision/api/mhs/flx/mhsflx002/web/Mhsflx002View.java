package kr.co.dbvision.api.mhs.flx.mhsflx002.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 개인별근무유형선택관리에 관한 뷰 클래스
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
@RequestMapping(value="mhsflx002")
public class Mhsflx002View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/flx/mhsflx002/mhsflx002", paramMap);
    }
    
    /**
     * 반려사유 view url
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/returnResn/view")
    public ModelAndView returnResnView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/flx/mhsflx002/mhsflx002ReturnResnPopup", paramMap);
    }
}
