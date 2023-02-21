package kr.co.dbvision.api.mhs.edu.mhsedu002.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 교육신청관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.09.02
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhsedu002")
public class Mhsedu002View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/edu/mhsedu002/mhsedu002", paramMap);
    }
    
    /**
     * 팝업창 view url
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/popupDtlRequest/view")
    public ModelAndView infoView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/edu/mhsedu002/mhsedu002DtlRequstPopup", paramMap);
    }
}
