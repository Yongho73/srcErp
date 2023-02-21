package kr.co.dbvision.api.pjt.pmg.pjtpmg001.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springmodules.validation.commons.DefaultBeanValidator;

import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001CcpyService;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황에 관한 웹화면 이벤트 클래스
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
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */

@Controller
@RequestMapping(value="pjtpmg001")
public class Pjtpmg001PjtCcpyController {


    @Resource(name="Pjtpmg001CcpyService")
    public Pjtpmg001CcpyService ccpyService;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pjtpmg001PjtCcpyController() {
        //
    }

    
    @RequestMapping(value="searchPjtProjectCcpyList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectCcpyList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return ccpyService.searchPjtProjectCcpyList(paramMap);
    }
    
    @RequestMapping(value="findPjtCcpy", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtCcpy(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return ccpyService.findPjtCcpy(paramMap);
    }
    
    @RequestMapping(value="removePjtCcpy", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtCcpy(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return ccpyService.removePjtCcpy(paramMap);
    }
    
    @RequestMapping(value="savePjtCcpy", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtCcpy(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        beanValidator.validate(entity, bindingResult);
        
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return new JsonMsgMng().makeJsonObject(ccpyService.savePjtCcpy(paramMap));
        }
    }
    
   
}
