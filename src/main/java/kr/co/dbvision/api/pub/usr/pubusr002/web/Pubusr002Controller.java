package kr.co.dbvision.api.pub.usr.pubusr002.web;

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

import kr.co.dbvision.api.pub.usr.pubusr002.entity.Pubusr002;
import kr.co.dbvision.api.pub.usr.pubusr002.service.Pubusr002Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인정보변경신청관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.01)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.01          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="pubusr002")
public class Pubusr002Controller {

    @Resource(name="Pubusr002Service")
    public Pubusr002Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pubusr002Controller() {
        //
    }

    @RequestMapping(value="searchPubusr002", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPubusr002(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPubusr002(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    //패스워드 변경
    @RequestMapping(value="searchUserPassword", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchUserPassword(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchUserPassword(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @RequestMapping(value="saveUserPassword", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveUserPassword(@ModelAttribute Pubusr002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                //변경 이력 저장
                String uri         = request.getRequestURI();
                String uri_rf      = request.getHeader("REFERER");
                String menuId      = null;
                if (uri_rf != null && uri_rf.substring(1).indexOf("/") > 0) {   //  http://localhost:8080/xerp/mhshrb001/searchMhsEmp/view
                    menuId = uri_rf.substring(8).split("/")[2];
                } else if (uri != null && uri.substring(1).indexOf("/") > 0) {   //  /xerp/stmmng003/searchStmmng003
                    menuId = uri.substring(1).split("/")[1];
                }
                String changeRequstIp = request.getHeader("X-Forwarded-For");
                if (changeRequstIp == null) changeRequstIp = request.getRemoteAddr();
                //변경 이력 저장
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                
                return service.saveUserPassword(paramMap, menuId, changeRequstIp);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="savePubusr002", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePubusr002(@ModelAttribute Pubusr002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.savePubusr002(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    //tab1 상세내용 조회
    @RequestMapping(value="searchPubusr002Tab1", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPubusr002Tab1(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPubusr002Tab1(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="findPubusr002", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPubusr002(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findPubusr002(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="excelPubusr002", method=RequestMethod.POST)
    public ModelAndView excelPubusr002(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchPubusr002ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    //변경 전 사용자의 정보를 조회한다.-기본
    @RequestMapping(value="nowUserInfo", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject nowUserInfo(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.nowUserInfo(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    //개인정보변경신청_기본
    @RequestMapping(value="savePubusr002Tab1", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePubusr002Tab1(@ModelAttribute Pubusr002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                System.out.println(paramMap+"!!!!!!!!!!!!!!!!!!!!!!!");
                return service.savePubusr002Tab1(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    
    //개인정보 승인 요청
    @RequestMapping(value="applyPubusr002", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject applyPubusr002(@ModelAttribute Pubusr002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.applyPubusr002(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
