package kr.co.dbvision.api.mhs.hrd.mhshrd001.web;

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

import kr.co.dbvision.api.mhs.hrd.mhshrd001.entity.Mhshrd001;
import kr.co.dbvision.api.mhs.hrd.mhshrd001.service.Mhshrd001Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 연차일수관리관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.10          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mhshrd001")
public class Mhshrd001Controller {

    @Resource(name="Mhshrd001Service")
    public Mhshrd001Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mhshrd001Controller() {
        //
    }

    @RequestMapping(value="searchMhshrd001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhshrd001(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchMhshrd001(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="findMhshrd001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMhshrd001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findMhshrd001(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="saveMhshrd001", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMhshrd001(@ModelAttribute Mhshrd001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.saveMhshrd001(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="excelMhshrd001", method=RequestMethod.POST)
    public ModelAndView excelMhshrd001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMhshrd001ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value="MHS_YEARCNT", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject MHS_YEARCNT(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.MHS_YEARCNT(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
