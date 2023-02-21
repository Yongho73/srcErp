package kr.co.dbvision.api.mhs.hrb.mhshrb001.web;

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

import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB3;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.Mhshrb001Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 인사기본에 관한 웹화면 이벤트 클래스
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
 *     2019.05.22          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mhshrb001")
public class Mhshrb001Controller {

    @Resource(name="Mhshrb001Service")
    public Mhshrb001Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mhshrb001Controller() {
        //
    }

    @RequestMapping(value="searchMhsEmp", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmp(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmp(paramMap);
    }

    @RequestMapping(value="findMhsEmp", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMhsEmp(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMhsEmp(paramMap);
    }

    @RequestMapping(value="saveMhsEmp", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmp(@ModelAttribute Mhshrb001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
    	//신규
        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmp(paramMap);
        }
    }

    @RequestMapping(value="modifyMhsEmp", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMhsEmp(@ModelAttribute Mhshrb001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyMhsEmp(paramMap);
        }
    }

    @RequestMapping(value="removeMhsEmp", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMhsEmp(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMhsEmp(paramMap);
    }

    @RequestMapping(value="excelMhsEmp", method=RequestMethod.POST)
    public ModelAndView excelMhsEmp(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMhsEmpForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    /*기본(개인정보 포함)*/
    @RequestMapping(value="modifyMhsEmpBase", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMhsEmpBase(@ModelAttribute Mhshrb001 entity, HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.modifyMhsEmpBase(paramMap);
    }
    
    /*신상정보 Tab2*/
    @RequestMapping(value="searchMhsEmpIndvdlInfo", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpIndvdlInfo(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpIndvdlInfo(paramMap);
    }
    @RequestMapping(value="saveMhsEmpIndvdlInfo", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmpIndvdlInfo(@ModelAttribute Mhshrb001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
    	//신규
        beanValidator.validate(entity, bindingResult);
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmpIndvdlInfo(paramMap);
        }
    }
    
    /*가족정보 Tab3*/
    @RequestMapping(value="searchMhsEmpFamily", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpFamily(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpFamily(paramMap);
    }
    @RequestMapping(value="saveMhsEmpFamily", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmpFamily(@ModelAttribute Mhshrb001_TAB3 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
    	//신규
        beanValidator.validate(entity, bindingResult);
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmpFamily(paramMap);
        }
    }
    @RequestMapping(value="excelMhsEmpFamily", method=RequestMethod.POST)
    public ModelAndView excelMhsEmpFamily(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMhsEmpFamily((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
        
    /*발령정보 Tab4*/
    @RequestMapping(value="searchMhsEmpGnfd", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpGnfd(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpGnfd(paramMap);
    }
    @RequestMapping(value="saveMhsEmpGnfd", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmpGnfd(@ModelAttribute Mhshrb001_TAB3 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
    	//신규
        beanValidator.validate(entity, bindingResult);
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmpFamily(paramMap);
        }
    }
    @RequestMapping(value="excelMhsEmpGnfd", method=RequestMethod.POST)
    public ModelAndView excelMhsEmpGnfd(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMhsEmpGnfd((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    /*포상정보 Tab5*/
    @RequestMapping(value="searchMhsEmpTab5Rward", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpTab5Rward(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpTab5Rward(paramMap);
    }
    
    /*징계정보 Tab6*/
    @RequestMapping(value="searchMhsEmpTab6Dscpl", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpTab6Dscpl(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpTab6Dscpl(paramMap);
    }
    
    
    /*학력 Tab7*/
    @RequestMapping(value="searchMhsEmpTab7Acdmcr", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpTab7Acdmcr(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpTab7Acdmcr(paramMap);
    }
    @RequestMapping(value="saveMhsEmpTab7Acdmcr", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmpTab7Acdmcr(@ModelAttribute Mhshrb001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmpTab7Acdmcr(paramMap);
        }
    }
    @RequestMapping(value="removeMhsEmpTab7Acdmcr", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMhsEmpTab7Acdmcr(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMhsEmpTab7Acdmcr(paramMap);
    }
    
    
    /*경력 Tab8*/
    @RequestMapping(value="searchMhsEmpTab8Career", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpTab8Career(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpTab8Career(paramMap);
    }
    @RequestMapping(value="saveMhsEmpTab8Career", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmpTab8Career(@ModelAttribute Mhshrb001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmpTab8Career(paramMap);
        }
    }
    @RequestMapping(value="removeMhsEmpTab8Career", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMhsEmpTab8Career(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMhsEmpTab8Career(paramMap);
    }
    
    
    /*자격 Tab9*/
    @RequestMapping(value="searchMhsEmpTab9Crqfs", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpTab9Crqfs(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpTab9Crqfs(paramMap);
    }
    @RequestMapping(value="saveMhsEmpTab9Crqfs", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmpTab9Crqfs(@ModelAttribute Mhshrb001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmpTab9Crqfs(paramMap);
        }
    }
    @RequestMapping(value="removeMhsEmpTab9Crqfs", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMhsEmpTab9Crqfs(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMhsEmpTab9Crqfs(paramMap);
    }
    
    /*교육정보 Tab10*/
    @RequestMapping(value="searchMhsEmpTab10Edu", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpTab10Edu(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpTab10Edu(paramMap);
    }
    
    /*계좌 Tab11*/
    @RequestMapping(value="searchMhsEmpTab11Acnut", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpTab11Acnut(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpTab11Acnut(paramMap);
    }
    @RequestMapping(value="saveMhsEmpTab11Acnut", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmpTab11Acnut(@ModelAttribute Mhshrb001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmpTab11Acnut(paramMap);
        }
    }
    @RequestMapping(value="removeMhsEmpTab11Acnut", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMhsEmpTab11Acnut(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMhsEmpTab11Acnut(paramMap);
    }
    
    /*어학(외국어) Tab12*/
    @RequestMapping(value="searchMhsEmpTab12Fggg", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmpTab12Fggg(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmpTab12Fggg(paramMap);
    }
    @RequestMapping(value="saveMhsEmpTab12Fggg", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsEmpTab12Fggg(@ModelAttribute Mhshrb001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsEmpTab12Fggg(paramMap);
        }
    }
    @RequestMapping(value="removeMhsEmpTab12Fggg", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMhsEmpTab12Fggg(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMhsEmpTab12Fggg(paramMap);
    }

    
    
    //직위 콤보
    @RequestMapping(value="searchMhshrb001OfcpsCode", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject searchMhshrb001OfcpsCode(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhshrb001OfcpsCode(paramMap);
    }
    
    //직책 콤보
    @RequestMapping(value="searchMhshrb001RspofcCode", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject searchMhshrb001RspofcCode(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhshrb001RspofcCode(paramMap);
    }
    
    //직급 콤보
    @RequestMapping(value="searchMhshrb001ClsfCode", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject searchMhshrb001ClsfCode(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhshrb001ClsfCode(paramMap);
    }
}
