package kr.co.dbvision.api.mhs.hrm.mhshrm007.web;

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

import kr.co.dbvision.api.mhs.hrm.mhshrm007.entity.Mhshrm007;
import kr.co.dbvision.api.mhs.hrm.mhshrm007.service.Mhshrm007Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 학교코드관리에 관한 웹화면 이벤트 클래스
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
 *     2019.05.13          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mhshrm007")
public class Mhshrm007Controller {

    @Resource(name="Mhshrm007Service")
    public Mhshrm007Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mhshrm007Controller() {
        //
    }

    @RequestMapping(value="searchMhsSchulCode", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsSchulCode(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsSchulCode(paramMap);
    }

    @RequestMapping(value="findMhsSchulCode", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMhsSchulCode(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMhsSchulCode(paramMap);
    }

    @RequestMapping(value="saveMhsSchulCode", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhsSchulCode(@ModelAttribute Mhshrm007 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMhsSchulCode(paramMap);
        }
    }

    @RequestMapping(value="modifyMhsSchulCode", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMhsSchulCode(@ModelAttribute Mhshrm007 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyMhsSchulCode(paramMap);
        }
    }

    @RequestMapping(value="removeMhsSchulCode", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMhsSchulCode(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMhsSchulCode(paramMap);
    }

    @RequestMapping(value="excelMhsSchulCode", method=RequestMethod.POST)
    public ModelAndView excelMhsSchulCode(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMhsSchulCodeForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
