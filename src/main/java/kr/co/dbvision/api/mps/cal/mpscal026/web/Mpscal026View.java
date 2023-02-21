package kr.co.dbvision.api.mps.cal.mpscal026.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 통상임금관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mpscal026")
public class Mpscal026View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/cal/mpscal026/mpscal026", paramMap);
    }
}
