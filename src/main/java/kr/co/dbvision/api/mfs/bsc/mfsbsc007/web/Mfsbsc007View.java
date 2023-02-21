package kr.co.dbvision.api.mfs.bsc.mfsbsc007.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 계정별 관리항목관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.04.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.22          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mfsbsc007")
public class Mfsbsc007View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mfs/bsc/mfsbsc007/mfsbsc007", paramMap);
    }

    @RequestMapping(value="popup/findMfsbsc007MgitItemList/view")
    public ModelAndView pop(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mfs/bsc/mfsbsc007/mfsbsc007MgitItemPopup", paramMap); 
    } 
}