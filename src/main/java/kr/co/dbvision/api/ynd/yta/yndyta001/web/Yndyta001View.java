package kr.co.dbvision.api.ynd.yta.yndyta001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 연말정산자료초기화관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.02.29
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.29          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="yndyta001")
public class Yndyta001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("ynd/yta/yndyta001/yndyta001", paramMap);
    }
}
