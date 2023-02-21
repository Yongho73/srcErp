package kr.co.dbvision.api.mfs.bsc.mfsbsc001.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 계정과목관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.04.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.21          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mfsbsc001")
public class Mfsbsc001View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mfs/bsc/mfsbsc001/mfsbsc001", paramMap);
    }
    

    /**
     * 계정코드 팝업 
     * @param paramMap
     * @return
     */
    @RequestMapping(value="popup/findPopupAcntCodeList/view")
    public ModelAndView pop1(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("lib/acntCode", paramMap); 
    }   
    
    
}
