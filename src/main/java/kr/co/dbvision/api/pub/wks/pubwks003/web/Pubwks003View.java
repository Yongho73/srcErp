package kr.co.dbvision.api.pub.wks.pubwks003.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 휴가신청관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.06.04
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.04          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pubwks003")
public class Pubwks003View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks003/pubwks003", paramMap);
    }
    
    @RequestMapping(value="popup/altHvofDePopup/view")
    public ModelAndView altHvofDePop(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks003/pubwks003AltHvofDePopup", paramMap);
    }

    @RequestMapping(value="popup/rewardHvofDePopup/view")
    public ModelAndView rewardHvofDePop(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks003/pubwks003RewardHvofDePopup", paramMap);
    }
}
