package kr.co.dbvision.api.mhs.hrd.mhshrd032.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 개인휴무신청관리관리에 관한 뷰 클래스
 *
 * @author 디비비전
 * @since 2020.09.10
 * @version 1.0
 * @sourceGen version 2020.09.03.01 (2020.09.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.10          디비비전              최초 생성
 * </pre>
 */
@Controller
@RequestMapping(value="mhshrd032")
public class Mhshrd032View {

    @RequestMapping(value="view")
    public ModelAndView main(@RequestParam Map<String, Object> paramMap) {
        return new ModelAndView("mhs/hrd/mhshrd032/mhshrd032", paramMap);
    }
}
