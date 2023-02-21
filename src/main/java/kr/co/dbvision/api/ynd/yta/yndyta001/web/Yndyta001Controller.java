package kr.co.dbvision.api.ynd.yta.yndyta001.web;

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

import kr.co.dbvision.api.ynd.yta.yndyta001.entity.Yndyta001;
import kr.co.dbvision.api.ynd.yta.yndyta001.service.Yndyta001Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 연말정산자료초기화관리에 관한 웹화면 이벤트 클래스
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
 *     2020.02.29          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="yndyta001")
public class Yndyta001Controller {

    @Resource(name="Yndyta001Service")
    public Yndyta001Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Yndyta001Controller() {
        //
    }


    /**
     * 연도 조회 콤보박스 
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="combo/selectBelongYearList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject selectBelongYearList(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.selectBelongYearList(paramMap);
    }    
    
    /**
     * 연말정산자 존재 여부 체크 
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="findChekCntYndyta001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject selectCntYndyta001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.selectCntYndyta001(paramMap);
    }    
    
    /**
     * 대상자 초기화 
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="removeAllYndyta001", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeAllYndyta001(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.deleteAllYndyta001(paramMap);
    }
    
    
    @RequestMapping(value="searchYndyta001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchYndyta001(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchYndyta001(paramMap);
    }

    @RequestMapping(value="findYndyta001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findYndyta001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findYndyta001(paramMap);
    }

    @RequestMapping(value="saveYndyta001", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveYndyta001(@ModelAttribute Yndyta001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveYndyta001(paramMap);
        }
    }

    @RequestMapping(value="removeYndyta001", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeYndyta001(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeYndyta001(paramMap);
    }

    @RequestMapping(value="excelYndyta001", method=RequestMethod.POST)
    public ModelAndView excelYndyta001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchYndyta001ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
