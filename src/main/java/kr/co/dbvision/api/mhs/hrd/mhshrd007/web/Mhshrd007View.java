package kr.co.dbvision.api.mhs.hrd.mhshrd007.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 근태기준설정관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.22          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrd007")
public class Mhshrd007View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrd/mhshrd007/mhshrd007", paramMap);
    }
}
