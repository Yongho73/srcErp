package kr.co.dbvision.api.mhs.hrm.mhshrmpop.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springmodules.validation.commons.DefaultBeanValidator;

import kr.co.dbvision.api.mhs.hrm.mhshrmpop.service.MhshrmpopService;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
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
 *     2019.05.23          디비비전              최초 생성
 *
 * </pre>
 */

@Controller
@RequestMapping(value="mhshrmpop")
public class MhshrmpopController {

    @Resource(name="MhshrmpopService")
    public MhshrmpopService service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public MhshrmpopController() {
        //
    }

    @RequestMapping(value="searchMhsDept", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsDept(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsDept(paramMap);
    }

    @RequestMapping(value="findMhsDept", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMhsDept(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMhsDept(paramMap);
    }
}
