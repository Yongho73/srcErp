package kr.co.dbvision.lib.ui.cmm.dept.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.ui.cmm.dept.service.DeptService;
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
@RequestMapping(value="dept")
public class DeptController {

    @Resource(name="DeptService")
    public DeptService service;

    public DeptController() {
        //
    }
    //부서
    @RequestMapping(value="searchDept", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsDept(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsDept(paramMap);
    }
    //부서
    @RequestMapping(value="searchTreeDept", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchTreeDept(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchTreeDept(paramMap);
    }
    //부서코드
    @RequestMapping(value="searchDeptCode", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsDeptCode(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsDeptCode(paramMap);
    }
    //직급
    @RequestMapping(value="searchMhsClsf", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsClsf(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsClsf(paramMap);
    }
}
