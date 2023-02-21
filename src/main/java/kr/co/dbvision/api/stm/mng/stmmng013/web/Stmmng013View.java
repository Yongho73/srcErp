package kr.co.dbvision.api.stm.mng.stmmng013.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 명함관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.31
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.31)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.31          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="stmmng013")
public class Stmmng013View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("stm/mng/stmmng013/stmmng013", paramMap);
    }
}
