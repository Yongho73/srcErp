package kr.co.dbvision.api.stm.bsc.stmbsc006.web;

import java.io.IOException;
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

import kr.co.dbvision.api.stm.bsc.stmbsc006.entity.Stmbsc006;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 자동채번설정관리에 관한 웹화면 이벤트 클래스
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
 *     2020.02.27          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="stmbsc006")
public class Stmbsc006Controller {

    @Resource(name="Stmbsc006Service")
    public Stmbsc006Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Stmbsc006Controller() {
        //
    }

    @RequestMapping(value="searchStmbsc006", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchStmbsc006(HttpServletRequest request, HttpServletResponse response) throws Exception {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchStmbsc006(paramMap);
    }

    @RequestMapping(value="findStmbsc006", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findStmbsc006(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findStmbsc006(paramMap);
    }

    @RequestMapping(value="saveStmbsc006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveStmbsc006(@ModelAttribute Stmbsc006 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws IOException {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveStmbsc006(paramMap);
        }
    }

    /*
    @RequestMapping(value="removeStmbsc006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeStmbsc006(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeStmbsc006(paramMap);
    }*/

    @RequestMapping(value="excelStmbsc006", method=RequestMethod.POST)
    public ModelAndView excelStmbsc006(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchStmbsc006ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    

    /**
     * 테이블목록
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="combo/searchStmbsc006TableList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject selectStmbsc006TableList(HttpServletRequest request, HttpServletResponse response)  throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.selectStmbsc006TableList(paramMap);
    }    
    

    /**
     * 컬럼목록
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="combo/searchStmbsc006TableColList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject selectStmbsc006TableColList(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.selectStmbsc006TableColList(paramMap);
    }
    
    
    @RequestMapping(value="getNextValue", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject getNextValue(@ModelAttribute Stmbsc006 entity) throws Exceptions {        
        return service.getNextValue(entity);
    }
}
