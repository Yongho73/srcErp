package kr.co.dbvision.api.pub.wks.pubwks013.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 출장복명관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pubwks013")
public class Pubwks013View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks013/pubwks013", paramMap);
    }
    
    /**
     * 팝업창 view url
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/popupDtlRequest/view")
    public ModelAndView infoView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks013/pubwks013DtlRequstPopup", paramMap);
    }
}
