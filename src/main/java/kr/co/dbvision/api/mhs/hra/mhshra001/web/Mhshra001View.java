package kr.co.dbvision.api.mhs.hra.mhshra001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 인사발령관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.06.16
 * @version 1.0
 * @sourceGen version 2020.06.11.02 (2020.06.16)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.16          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhshra001")
public class Mhshra001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hra/mhshra001/mhshra001", paramMap);
    }
    
    /**
     * 카드번호 팝업 
     * @param paramMap
     * @return
     */
    @RequestMapping(value="popup/findPopupAdvanEmpList/view")
    public ModelAndView AdvanEmp(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hra/mhshra001/advanEmp", paramMap); 
    }  
}
