package kr.co.dbvision.api.ynd.yta.yndyta008.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 근로소득세액기준관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.09.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.09.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.03          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="yndyta008")
public class Yndyta008View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("ynd/yta/yndyta008/yndyta008", paramMap);
    }
}
