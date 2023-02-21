package kr.co.dbvision.api.mtx.bsc.mtxbsc002.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 소득자관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.06
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.06          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mtxbsc002")
public class Mtxbsc002View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mtx/bsc/mtxbsc002/mtxbsc002", paramMap);
    }
}
