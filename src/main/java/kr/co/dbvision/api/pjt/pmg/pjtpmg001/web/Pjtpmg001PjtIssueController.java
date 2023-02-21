package kr.co.dbvision.api.pjt.pmg.pjtpmg001.web;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import kr.co.dbvision.api.mhs.hrd.mhshrd008.entity.Mhshrd008;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.PjtIssue001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.PjtIssueact001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001PjtIssueService;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
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
public class Pjtpmg001PjtIssueController {

    @Resource(name="Pjtpmg001PjtIssueService")
    public Pjtpmg001PjtIssueService service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pjtpmg001PjtIssueController() {
        //
    }

    @RequestMapping(value="searchPjtIssue", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtIssue(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtIssue(paramMap);
    }

    @RequestMapping(value="findPjtIssue", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtIssue(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findPjtIssue(paramMap);
    }

    @RequestMapping(value="savePjtIssue", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtIssue(@ModelAttribute PjtIssue001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        beanValidator.validate(entity, bindingResult);
        
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return new JsonMsgMng().makeJsonObject(service.savePjtIssue(paramMap));
        }
    }
    
    @RequestMapping(value="removePjtIssue", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtIssue(@ModelAttribute PjtIssue001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.removePjtIssue(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @SuppressWarnings("unchecked")
    @RequestMapping(value="excelPjtIssue", method=RequestMethod.POST)
    public ModelAndView excelPjtIssue(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchPjtIssueForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value="searchPjtIssueact", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtIssueact(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtIssueact(paramMap);
    }
    
    @RequestMapping(value="savePjtIssueAct", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtIssueAct(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        beanValidator.validate(entity, bindingResult);
        
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return new JsonMsgMng().makeJsonObject(service.savePjtIssueAct(paramMap));
        }
    }
    
    @RequestMapping(value="findPjtIssueAct", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtIssueAct(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findPjtIssueAct(paramMap);
    }
    
    @RequestMapping(value="removePjtIssueAct", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtIssueAct(HttpServletRequest request, HttpServletResponse response) {
        
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.removePjtIssueAct(paramMap);
        
    }

}
