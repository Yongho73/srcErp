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
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001PjtOutputsService;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황 산출물에 관한 웹화면 이벤트 클래스
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
public class Pjtpmg001PjtOutputsController {

    @Resource(name="Pjtpmg001PjtOutputsService")
    public Pjtpmg001PjtOutputsService service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pjtpmg001PjtOutputsController() {
        //
    }

    @RequestMapping(value="searchPjtOutputs", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtOutputs(HttpServletRequest request, HttpServletResponse response) {
        
        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtOutputs(paramMap);
    }
    
    @RequestMapping(value="savePjtOutputs", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtOutputs(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return new JsonMsgMng().makeJsonObject(service.savePjtOutputs(paramMap));
        }
    }
    
    @RequestMapping(value="modifyPjtOutputs", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtOutputs(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return new JsonMsgMng().makeJsonObject(service.modifyPjtOutputs(paramMap));
        }
    }
    
    @RequestMapping(value="popup/searchPjtOutputsTree", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtOutputsTree(HttpServletRequest request, HttpServletResponse response) {
        
        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtOutputsTree(paramMap);
    }
}
