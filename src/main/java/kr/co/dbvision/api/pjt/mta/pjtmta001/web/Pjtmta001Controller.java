package kr.co.dbvision.api.pjt.mta.pjtmta001.web;

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

import kr.co.dbvision.api.pjt.mta.pjtmta001.entity.Pjtmta001;
import kr.co.dbvision.api.pjt.mta.pjtmta001.service.Pjtmta001Service;
import kr.co.dbvision.api.stm.mng.stmmng011.entity.Stmmng011;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 유지보수요청관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="pjtmta001")
public class Pjtmta001Controller {

    @Resource(name="Pjtmta001Service")
    public Pjtmta001Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;
    
    private JsonMsgMng jsonMsgMng;

    public Pjtmta001Controller() {
        jsonMsgMng = new JsonMsgMng();
    }
    
    /**
     * 유지보수 프로젝트 목록 조회
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchPjtmta001Project", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtmta001Project(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtmta001Project(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    /**
     * 유지보수 요청 목록 조회
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchPjtmta001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtmta001(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtmta001(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    /**
     * 지시자, 작업자 검색
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="searchPjtHnf", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtHnf(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtHnf(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    /**
     * 유지보수 요청 내용 상세 조회
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="findPjtmta001", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtmta001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findPjtmta001(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="savePjtmta001", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtmta001(@ModelAttribute Pjtmta001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.savePjtmta001(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="excelPjtmta001", method=RequestMethod.POST)
    public ModelAndView excelPjtmta001(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchPjtmta001ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value="savePjtMtaRequst", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtMtaRequst(@ModelAttribute Pjtmta001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtMtaRequst(paramMap);
        }
    }
    
    @RequestMapping(value="modifyPjtMtaRequst", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtMtaRequst(@ModelAttribute Stmmng011 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyMtaRequst(paramMap);
        }
    }
    
    @RequestMapping(value="removePjtMtaRequst", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtMtaRequst(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removePjtMtaRequst(paramMap);
    }
    
    @RequestMapping(value="searchPjtmta001Opert", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtmta001Opert(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtmta001Opert(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="savePjtMtaOpert", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtMtaOpert(@ModelAttribute Pjtmta001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtMtaOpert(paramMap);
        }
    }
    
    @RequestMapping(value="findPjtmta001Opert", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtmta001Opert(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findPjtmta001Opert(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="modifyPjtMtaOpert", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtMtaOpert(@ModelAttribute Stmmng011 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyPjtMtaOpert(paramMap);
        }
    }
    
    @RequestMapping(value="removePjtMtaOpert", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtMtaOpert(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removePjtMtaOpert(paramMap);
    }
    
    @RequestMapping(value = "searchFilesMta")
    @ResponseBody
    public JSONObject searchFilesMta(HttpServletRequest request, HttpServletResponse response) {
        //
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request); 
            return jsonMsgMng.makeJsonObject(service.findFilesMta(paramMap));
        } catch (Exceptions e) {         
            return jsonMsgMng.makeJsonObject(e);
        }
    }
    
    @RequestMapping(value="findPjtmta001Hnf", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtmta001Hnf(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findPjtmta001Hnf(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
}
