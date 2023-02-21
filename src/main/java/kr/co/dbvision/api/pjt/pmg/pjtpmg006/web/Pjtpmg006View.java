package kr.co.dbvision.api.pjt.pmg.pjtpmg006.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 프로젝트예산집행현황관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2021.04.21
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.04.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.04.21          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pjtpmg006")
public class Pjtpmg006View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pjt/pmg/pjtpmg006/pjtpmg006", paramMap);
    }
}
