package kr.co.dbvision.api.mhs.edu.mhsedu001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 교육과정등록관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.08.26
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.26)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.26          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhsedu001")
public class Mhsedu001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/edu/mhsedu001/mhsedu001", paramMap);
    }
    
    
    @RequestMapping(value = "pop/popupQest/view")
    public ModelAndView popupDtlRequest(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/edu/mhsedu001/mhseduQestpopup", paramMap);
    }
}
