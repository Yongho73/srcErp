package kr.co.dbvision.api.mtx.bsc.mtxbsc001.web;

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

import kr.co.dbvision.api.mtx.bsc.mtxbsc001.entity.Mtxbsc001;
import kr.co.dbvision.api.mtx.bsc.mtxbsc001.service.Mtxbsc001Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득세율관리관리에 관한 웹화면 이벤트 클래스
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
@RequestMapping(value="mtxbsc001")
public class Mtxbsc001Controller {

    @Resource(name="Mtxbsc001Service")
    public Mtxbsc001Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    private JsonMsgMng jsonMsgMng;
    
    public Mtxbsc001Controller() {
        jsonMsgMng = new JsonMsgMng();
    }

    @RequestMapping(value="searchMtxbsc001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMtxbsc001(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchMtxbsc001(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="findMtxbsc001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMtxbsc001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findMtxbsc001(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="saveMtxbsc001", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMtxbsc001(@ModelAttribute Mtxbsc001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.saveMtxbsc001(paramMap);
            }
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="excelMtxbsc001", method=RequestMethod.POST)
    public ModelAndView excelMtxbsc001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMtxbsc001ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    @RequestMapping(value="combo/searchComboapplcYearList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject comboDeptNm(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchComboapplcYearList(paramMap);
    }
    
    
    /**
     * 년도별 조회 콤보박스 
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value = "searchapplcYearList", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject searchStmCode(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            //return jsonMsgMng.makeJsonObject(service.searchBelongYearList(paramMap));
            return jsonMsgMng.makeJsonObject(service.searchapplcYearList(paramMap));
            
        } catch (Exceptions e) {
            return jsonMsgMng.makeJsonObject(e);
        }
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
