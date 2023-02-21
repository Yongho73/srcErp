package kr.co.dbvision.api.mps.bas.mpsbas002.web;

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

import kr.co.dbvision.api.mps.bas.mpsbas002.entity.Mpsbas002;
import kr.co.dbvision.api.mps.bas.mpsbas002.service.Mpsbas002Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험율관리에 관한 웹화면 이벤트 클래스
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
@RequestMapping(value="mpsbas002")
public class Mpsbas002Controller {

    @Resource(name="Mpsbas002Service")
    public Mpsbas002Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mpsbas002Controller() {
        //
    }

    @RequestMapping(value="searchMpsSnlrcTariff", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMpsSnlrcTariff(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMpsSnlrcTariff(paramMap);
    }

    @RequestMapping(value="findMpsSnlrcTariff", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMpsSnlrcTariff(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMpsSnlrcTariff(paramMap);
    }

    @RequestMapping(value="saveMpsSnlrcTariff", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMpsSnlrcTariff(@ModelAttribute Mpsbas002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMpsSnlrcTariff(paramMap);
        }
    }

    @RequestMapping(value="modifyMpsSnlrcTariff", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMpsSnlrcTariff(@ModelAttribute Mpsbas002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyMpsSnlrcTariff(paramMap);
        }
    }

    @RequestMapping(value="removeMpsSnlrcTariff", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMpsSnlrcTariff(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMpsSnlrcTariff(paramMap);
    }

    @RequestMapping(value="excelMpsSnlrcTariff", method=RequestMethod.POST)
    public ModelAndView excelMpsSnlrcTariff(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMpsSnlrcTariffForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
