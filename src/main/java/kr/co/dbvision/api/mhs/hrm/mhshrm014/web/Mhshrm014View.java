package kr.co.dbvision.api.mhs.hrm.mhshrm014.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 직책관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.03.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.17          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrm014")
public class Mhshrm014View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrm/mhshrm014/mhshrm014", paramMap);
    }
}
