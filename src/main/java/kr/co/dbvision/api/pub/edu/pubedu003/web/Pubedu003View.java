package kr.co.dbvision.api.pub.edu.pubedu003.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 테스트관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2021.06.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.22          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pubedu003")
public class Pubedu003View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/edu/pubedu003/pubedu003", paramMap);
    }
}
