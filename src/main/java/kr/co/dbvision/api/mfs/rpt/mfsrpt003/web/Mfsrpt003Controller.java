package kr.co.dbvision.api.mfs.rpt.mfsrpt003.web;

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

import kr.co.dbvision.api.mfs.rpt.mfsrpt003.entity.Mfsrpt003;
import kr.co.dbvision.api.mfs.rpt.mfsrpt003.service.Mfsrpt003Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 출장결의서에 관한 웹화면 이벤트 클래스
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
 *     2019.05.31          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mfsrpt003")
public class Mfsrpt003Controller {

    @Resource(name="Mfsrpt003Service")
    public Mfsrpt003Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mfsrpt003Controller() {
        //
    }

    @RequestMapping(value="searchMfsSlipComm", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMfsSlipComm(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMfsSlipComm(paramMap);
    }

    @RequestMapping(value="findMfsSlipComm", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMfsSlipComm(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMfsSlipComm(paramMap);
    }

    @RequestMapping(value="saveMfsSlipComm", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMfsSlipComm(@ModelAttribute Mfsrpt003 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMfsSlipComm(paramMap);
        }
    }

    @RequestMapping(value="modifyMfsSlipComm", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMfsSlipComm(@ModelAttribute Mfsrpt003 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyMfsSlipComm(paramMap);
        }
    }

    @RequestMapping(value="removeMfsSlipComm", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMfsSlipComm(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMfsSlipComm(paramMap);
    }

    @RequestMapping(value="excelMfsSlipComm", method=RequestMethod.POST)
    public ModelAndView excelMfsSlipComm(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMfsSlipCommForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value="selectMfsBiztripSlip", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMfsBiztripSlip(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMfsBiztripSlip(paramMap);
    }
}
