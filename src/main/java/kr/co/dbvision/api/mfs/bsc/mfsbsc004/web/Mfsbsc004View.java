package kr.co.dbvision.api.mfs.bsc.mfsbsc004.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 법인카드관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mfsbsc004")
public class Mfsbsc004View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mfs/bsc/mfsbsc004/mfsbsc004", paramMap);
    }
    

    /**
     * 예금계좌 조회 
     * @param paramMap
     * @return
     */
    @RequestMapping(value="popup/deposit/view")
    public ModelAndView pop1(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("lib/deposit", paramMap); 
    }   
}
