package kr.co.dbvision.api.mps.cal.mpscal017.web;

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

import kr.co.dbvision.api.mps.cal.mpscal017.entity.Mpscal017;
import kr.co.dbvision.api.mps.cal.mpscal017.service.Mpscal017Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여마감관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mpscal017")
public class Mpscal017Controller {

    @Resource(name="Mpscal017Service")
    public Mpscal017Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mpscal017Controller() {
        //
    }
    
    @RequestMapping(value="combo/searchComboYeayMpscal017", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject searchComboYeayMpscal017(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchComboYeayMpscal017(paramMap);
    }

    /**
     * 월 리스트 
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchMpscal017MonthList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMpscal017MonthList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMpscal017MonthList(paramMap);
    }
    
    /**
     * 급여지급일자
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchMpscal017", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMpscal017(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMpscal017(paramMap);
    }

    @RequestMapping(value="findMpscal017", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMpscal017(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findMpscal017(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="saveMpscal017", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMpscal017(@ModelAttribute Mpscal017 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.saveMpscal017(paramMap);
            }
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="excelMpscal017", method=RequestMethod.POST)
    public ModelAndView excelMpscal017(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMpscal017ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}