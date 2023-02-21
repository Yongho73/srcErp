package kr.co.dbvision.api.mhs.hrd.mhshrd008.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 근태시간코드관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.06.08
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.08          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrd008")
public class Mhshrd008View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrd/mhshrd008/mhshrd008", paramMap);
    }
}
