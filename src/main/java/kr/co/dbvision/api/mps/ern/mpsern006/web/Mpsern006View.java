package kr.co.dbvision.api.mps.ern.mpsern006.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 소득지급등록관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.08.12
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.12)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.12          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mpsern006")
public class Mpsern006View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mps/ern/mpsern006/mpsern006", paramMap);
    }
    
    @RequestMapping(value="popup/findPopupincomeKindList/view")
    public ModelAndView pop2(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("lib/incomeKind", paramMap); 
    }
}
