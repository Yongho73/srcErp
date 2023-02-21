package kr.co.dbvision.api.mhs.hrm.mhshrm013.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 근태코드관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.08.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrm013")
public class Mhshrm013View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrm/mhshrm013/mhshrm013", paramMap);
    }
}
