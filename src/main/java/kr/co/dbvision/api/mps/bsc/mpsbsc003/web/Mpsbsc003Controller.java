package kr.co.dbvision.api.mps.bsc.mpsbsc003.web;

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

import kr.co.dbvision.api.mps.bsc.mpsbsc003.entity.Mpsbsc003;
import kr.co.dbvision.api.mps.bsc.mpsbsc003.service.Mpsbsc003Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 월급여항목적용등록관리에 관한 웹화면 이벤트 클래스
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
 *     2020.03.03          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mpsbsc003")
public class Mpsbsc003Controller {

    @Resource(name="Mpsbsc003Service")
    public Mpsbsc003Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mpsbsc003Controller() {
        //
    }

    @RequestMapping(value="combo/searchComboYeayMpsbsc003", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject searchComboYeayMpsbsc003(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchComboYeayMpsbsc003(paramMap);
    }    
    
    @RequestMapping(value="searchMpsbsc003", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMpsbsc003(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMpsbsc003(paramMap);
    }

    /**
     * 대상복사 
     * @param entity
     * @param bindingResult
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="saveCopyApplyMonth", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveCopyApplyMonth( HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.saveCopyApplyMonth(paramMap);
        
    }    
    
    
    @RequestMapping(value="findMpsbsc003", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMpsbsc003(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMpsbsc003(paramMap);
    }

    @RequestMapping(value="saveMpsbsc003", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMpsbsc003(@ModelAttribute Mpsbsc003 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        try {
            beanValidator.validate(entity, bindingResult);
    
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
               // return service.saveMpsbsc003(paramMap);
                return new JsonMsgMng().makeJsonObject(service.saveMpsbsc003(paramMap));
            }
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }            
    }

    @RequestMapping(value="removeMpsbsc003", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMpsbsc003(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMpsbsc003(paramMap);
    }

    @RequestMapping(value="excelMpsbsc003", method=RequestMethod.POST)
    public ModelAndView excelMpsbsc003(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMpsbsc003ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
