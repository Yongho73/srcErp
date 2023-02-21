package kr.co.dbvision.api.mps.bsc.mpsbsc005.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 개인별급여기준일괄등록관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.05.12
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.12          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mpsbsc005")
public class Mpsbsc005View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/bsc/mpsbsc005/mpsbsc005", paramMap);
    }
}
