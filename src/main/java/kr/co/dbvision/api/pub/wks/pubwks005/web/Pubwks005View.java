package kr.co.dbvision.api.pub.wks.pubwks005.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 초과근무신청관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.24
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.24          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pubwks005")
public class Pubwks005View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks005/pubwks005", paramMap);
    }
}
