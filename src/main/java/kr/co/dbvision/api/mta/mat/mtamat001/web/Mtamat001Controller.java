package kr.co.dbvision.api.mta.mat.mtamat001.web;

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

import kr.co.dbvision.api.mta.mat.mtamat001.entity.Mtamat001;
import kr.co.dbvision.api.mta.mat.mtamat001.service.Mtamat001Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 유지보수요청에 관한 웹화면 이벤트 클래스
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
 *     2019.12.16          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mtamat001")
public class Mtamat001Controller {

    @Resource(name="Mtamat001Service")
    public Mtamat001Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mtamat001Controller() {
        //
    }

    @RequestMapping(value="searchMtaRequst", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMtaRequst(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMtaRequst(paramMap);
    }

    @RequestMapping(value="findMtaRequst", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMtaRequst(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMtaRequst(paramMap);
    }

    @RequestMapping(value="saveMtaRequst", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMtaRequst(@ModelAttribute Mtamat001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMtaRequst(paramMap);
        }
    }

    @RequestMapping(value="modifyMtaRequst", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMtaRequst(@ModelAttribute Mtamat001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyMtaRequst(paramMap);
        }
    }

    @RequestMapping(value="removeMtaRequst", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMtaRequst(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMtaRequst(paramMap);
    }

    @RequestMapping(value="excelMtaRequst", method=RequestMethod.POST)
    public ModelAndView excelMtaRequst(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMtaRequstForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value="searchMtaCompany", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMtaCompany(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMtaCompany(paramMap);
    }
    
    @RequestMapping(value="searchMtaRequstOpert", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMtaRequstOpert(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMtaRequstOpert(paramMap);
    }
    
    @RequestMapping(value="removeMtaRequstOpert", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMtaRequstOpert(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMtaRequstOpert(paramMap);
    }
    
    @RequestMapping(value="findMtaRequstOpert", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMtaRequstOpert(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMtaRequstOpert(paramMap);
    }
    
    @RequestMapping(value="saveMtaRequstOpert", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMtaRequstOpert(@ModelAttribute Mtamat001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMtaRequstOpert(paramMap);
        }
    }

    @RequestMapping(value="modifyMtaRequstOpert", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMtaRequstOpert(@ModelAttribute Mtamat001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyMtaRequstOpert(paramMap);
        }
    }
    
    @RequestMapping(value="MtaRequstOpertDetail", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject MtaRequstOpertDetail(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.MtaRequstOpertDetail(paramMap);
    }
}
