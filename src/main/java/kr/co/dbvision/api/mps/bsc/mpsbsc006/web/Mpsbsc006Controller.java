package kr.co.dbvision.api.mps.bsc.mpsbsc006.web;

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

import kr.co.dbvision.api.mps.bsc.mpsbsc006.entity.Mpsbsc006;
import kr.co.dbvision.api.mps.bsc.mpsbsc006.service.Mpsbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여지급일자등록관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mpsbsc006")
public class Mpsbsc006Controller {

    @Resource(name="Mpsbsc006Service")
    public Mpsbsc006Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mpsbsc006Controller() {
        //
    }
    
    @RequestMapping(value="combo/searchComboYeayMpsbsc006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject searchComboYeayMpsbsc006(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchComboYeayMpsbsc006(paramMap);
    }

    /**
     * 월 리스트 
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchMpsbsc006MonthList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMpsbsc006MonthList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMpsbsc006MonthList(paramMap);
    }
    
    /**
     * 급여지급일자
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchMpsbsc006", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMpsbsc006(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMpsbsc006(paramMap);
    }
    
    
    /**급여지급유형 
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchItemListMpsbsc006", method=RequestMethod.GET)    
    @ResponseBody
    public JSONObject searchItemListMpsbsc006(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchItemListMpsbsc006(paramMap);
    }
    
    /**급여지급유형 
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchListMpsbscItem", method=RequestMethod.GET)    
    @ResponseBody
    public JSONObject searchListMpsbscItem(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.selectMpsbscItemList(paramMap);
    }
    
    
    @RequestMapping(value="searchNewItemListMpsbsc006", method=RequestMethod.GET)    
    @ResponseBody
    public JSONObject searchNewItemListMpsbsc006(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        
            
            List<String> codeListArray = new ArrayList<String>();
            String [] codeArray = paramMap.get("salarytyCodeList").toString().split(",");
            for(String s:codeArray){
                codeListArray.add(s);
            }
            paramMap.put("salarytyCodeList", codeListArray);
            
        return service.searchNewItemListMpsbsc006(paramMap);
    }
    
    @RequestMapping(value="searchMpsbsc006closAtList", method=RequestMethod.GET)    
    @ResponseBody
    public JSONObject searchMpsbsc006closAtList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMpsbsc006closAtList(paramMap);
    }
    

    @RequestMapping(value="findMpsbsc006", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMpsbsc006(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMpsbsc006(paramMap);
    }

    @RequestMapping(value="saveMpsbsc006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMpsbsc006(@ModelAttribute Mpsbsc006 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        try {
            beanValidator.validate(entity, bindingResult);

            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.saveMpsbsc006(paramMap);
            }
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }       
        
    }
    
    @RequestMapping(value="saveSalaryItemMpsbsc006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveSalaryItemMpsbsc006(@ModelAttribute Mpsbsc006 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveSalaryItemMpsbsc006(paramMap);
        }
    }    
    
    @RequestMapping(value="removeSalaryItemMpsbsc006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeSalaryItemMpsbsc006(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeSalaryItemMpsbsc006(paramMap);
    }

    @RequestMapping(value="removeMpsbsc006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMpsbsc006(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMpsbsc006(paramMap);
    }

    @RequestMapping(value="excelMpsbsc006", method=RequestMethod.POST)
    public ModelAndView excelMpsbsc006(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMpsbsc006ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    /**
     *   연도별 복사기능 
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="saveCopyApplcYy", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveCopyApplcYy(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.saveCopyApplcYy(paramMap);
    }
    
}
