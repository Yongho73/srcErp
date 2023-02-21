package kr.co.dbvision.api.mps.bsc.mpsbsc009.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 연봉계약관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.06.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.11          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mpsbsc009")
public class Mpsbsc009View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/bsc/mpsbsc009/mpsbsc009", paramMap);
    }
}
