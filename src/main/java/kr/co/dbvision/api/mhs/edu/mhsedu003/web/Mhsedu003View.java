package kr.co.dbvision.api.mhs.edu.mhsedu003.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 교육결과보고관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.09.09
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.09          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhsedu003")
public class Mhsedu003View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/edu/mhsedu003/mhsedu003", paramMap);
    }
    
    /**
     * 팝업창 view url
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/popupDtlQest/view")
    public ModelAndView infoView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/edu/mhsedu003/mhsedu003DtlQestPopup", paramMap);
    }
    
}
