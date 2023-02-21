package kr.co.dbvision.api.mhs.hrb.mhshrb003.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 개인정보변경승인관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2021.06.09
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.09          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrb003")
public class Mhshrb003View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrb/mhshrb003/mhshrb003", paramMap);
    }
    /**
     * 반려사유 view url
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/returnResn/view")
    public ModelAndView returnResnView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrb/mhshrb003/mhshrb003ReturnResnPopup", paramMap);
    }
}
