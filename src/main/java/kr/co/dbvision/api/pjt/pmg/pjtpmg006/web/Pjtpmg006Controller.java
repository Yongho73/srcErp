package kr.co.dbvision.api.pjt.pmg.pjtpmg006.web;

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

import kr.co.dbvision.api.pjt.pmg.pjtpmg006.entity.Pjtpmg006;
import kr.co.dbvision.api.pjt.pmg.pjtpmg006.service.Pjtpmg006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트예산집행현황관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.04.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.04.21          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="pjtpmg006")
public class Pjtpmg006Controller {

    @Resource(name="Pjtpmg006Service")
    public Pjtpmg006Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pjtpmg006Controller() {
        //
    }

    @RequestMapping(value="searchPjtpmg006", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtpmg006(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtpmg006(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="findPjtpmg006", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtpmg006(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findPjtpmg006(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="savePjtpmg006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtpmg006(@ModelAttribute Pjtpmg006 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.savePjtpmg006(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="excelPjtpmg006", method=RequestMethod.POST)
    public ModelAndView excelPjtpmg006(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchPjtpmg006ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
