package kr.co.dbvision.api.pub.wks.pubwks020.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 시차근무관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.07.14
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.14)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.14          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="pubwks020")
public class Pubwks020View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks020/pubwks020", paramMap);
    }
    
    /**
     * 팝업창 view url
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/popupRequest/view")
    public ModelAndView infoView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks020/pubwks020RequstPopup", paramMap);
    }
    
    /**
     * 일괄등록 view url
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/bundleRequest/view")
    public ModelAndView bundleView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks020/pubwks020BundleRequstPopup", paramMap);
    }
    
    /**
     * 반려사유 view url
     * @param paramMap
     * @return
     */
    @RequestMapping(value = "popup/returnResn/view")
    public ModelAndView returnResnView(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("pub/wks/pubwks020/pubwks020ReturnResnPopup", paramMap);
    }
}
