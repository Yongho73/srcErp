package kr.co.dbvision.api.mhs.hrm.mhshrm001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 사업장관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.15
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.15)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.15          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrm001")
public class Mhshrm001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrm/mhshrm001/mhshrm001", paramMap);
    }
    
    /*
     * @RequestMapping(value = "searchStmBizplc/view") public ModelAndView
     * search(@RequestParam Map<String, Object> paramMap) { return new
     * ModelAndView("mhs/hrm/mhshrm001/mhshrm001SearchStmBizplc", paramMap); }
     */
}
