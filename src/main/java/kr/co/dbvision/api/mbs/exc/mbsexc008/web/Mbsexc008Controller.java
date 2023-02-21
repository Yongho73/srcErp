package kr.co.dbvision.api.mbs.exc.mbsexc008.web;

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

import kr.co.dbvision.api.mbs.exc.mbsexc008.entity.Mbsexc008;
import kr.co.dbvision.api.mbs.exc.mbsexc008.service.Mbsexc008Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 예실대비표에 관한 웹화면 이벤트 클래스
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
@RequestMapping(value="mbsexc008")
public class Mbsexc008Controller {

    @Resource(name="Mbsexc008Service")
    public Mbsexc008Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mbsexc008Controller() {
        //
    }

    @RequestMapping(value="searchMbsBugtcd", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMbsBugtcd(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMbsBugtcd(paramMap);
    }

    @RequestMapping(value="findMbsBugtcd", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMbsBugtcd(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMbsBugtcd(paramMap);
    }

    @RequestMapping(value="saveMbsBugtcd", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMbsBugtcd(@ModelAttribute Mbsexc008 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMbsBugtcd(paramMap);
        }
    }

    @RequestMapping(value="modifyMbsBugtcd", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMbsBugtcd(@ModelAttribute Mbsexc008 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyMbsBugtcd(paramMap);
        }
    }

    @RequestMapping(value="removeMbsBugtcd", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMbsBugtcd(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMbsBugtcd(paramMap);
    }

    @RequestMapping(value="excelMbsBugtcd", method=RequestMethod.POST)
    public ModelAndView excelMbsBugtcd(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMbsBugtcdForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
