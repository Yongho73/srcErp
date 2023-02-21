package kr.co.dbvision.lib.ui.cmm.emp.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.ui.cmm.emp.service.EmpService;
import net.sf.json.JSONObject;

/**
 * 부서팝업에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.21          디비비전              최초 생성
 *
 * </pre>
 */

@Controller
@RequestMapping(value="emp")
public class EmpController {

    @Resource(name="EmpService")
    public EmpService service;

    public EmpController() {
        //
    }
    
    //사원
    @RequestMapping(value="searchEmp", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmp(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmp(paramMap);
    }
    
    //부서별사원
    @RequestMapping(value="searchDeptEmp", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchDeptMhsEmp(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchDeptMhsEmp(paramMap);
    }
    
  //부서별사원
    @RequestMapping(value="searchOrgnztEmp", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchOrgnztEmp(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchOrgnztEmp(paramMap);
    }
}
