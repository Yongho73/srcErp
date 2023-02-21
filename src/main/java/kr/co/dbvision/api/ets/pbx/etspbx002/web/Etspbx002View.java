package kr.co.dbvision.api.ets.pbx.etspbx002.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 결재문서관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2021.03.23
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.23)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.23          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="etspbx002")
public class Etspbx002View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("ets/pbx/etspbx002/etspbx002", paramMap);
    }
}
