package kr.co.dbvision.api.pjt.pmg.pjtpmg001.web;

import java.util.Enumeration;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springmodules.validation.commons.DefaultBeanValidator;

import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001BugtService;
import kr.co.dbvision.api.pjt.pmg.pjtpmg002.entity.Pjtpmg002;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황에 관한 웹화면 이벤트 클래스
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
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */

@Controller
@RequestMapping(value="pjtpmg001")
public class Pjtpmg001PjtBugtController {

    @Resource(name="Pjtpmg001BugtService")
    public Pjtpmg001BugtService bugtService;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pjtpmg001PjtBugtController() {
        //
    }

    @RequestMapping(value="searchPjtBugtPlanList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtBugtPlanList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return bugtService.searchPjtBugtPlanList(paramMap);
    }
    
    @RequestMapping(value="searchPjtBugtPlanDtlList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtBugtPlanDtlList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return bugtService.searchPjtBugtPlanDtlList(paramMap);
    }
    
    @RequestMapping(value="modifyPjtBugtPlanDtlList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtBugtPlanDtlList(@ModelAttribute Pjtpmg002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

    	JSONObject jobject = new JSONObject ();
    	
        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
        	EgovMapForNull paramMap = StringUtil.requestToMap(request);
            
            Enumeration params = request.getParameterNames();
        	String value = "";
        	String colNm = "";
        	int colNum = 0;

        	String edit_status = "";
        	while(params.hasMoreElements()) {
        		String param = (String)params.nextElement();
	
        		value = request.getParameter(param);
        		colNm = "";
        		//
        		if(param.equals("!nativeeditor_status")) {
        			edit_status = value;
        		}
        		switch(colNum) {
        			case 4:  colNm = "prmpcTy";      	  break;
	        		case 5:  colNm = "bugtAmt";           break;
	        		case 6:  colNm = "bugtSummary";       break;
	        		case 7:  colNm = "";                  break;
	        		case 8:  colNm = "bugtRegistdt";      break;
	        		case 9:  colNm = "projectSn";         break;
	        		case 10:  colNm = "bugtPlanSn";        break;
	        		case 11:  colNm = "acntCode";         break;
	        		case 12:  colNm = "bugtTit";         break;
        		}
        		if(colNm.length()> 0) {
        			System.out.println(colNum + "   colNm 수정 : [" + colNm + "] :" + value);
        			if(colNum > 3 || colNum < 13) { 
        				if(colNum == 8)
        					paramMap.put(colNm, value.replaceAll("-", ""));
        				else
        					paramMap.put(colNm, value);
        			}
        		} 
        		colNum++; 
        	} 
 
            if(edit_status.indexOf("updated") >= 0) { // 수정
            	jobject = bugtService.modifyPjtBugtPlanDtlList(paramMap);
            } else if(edit_status.indexOf("inserted") >= 0) { // 저장 
            	jobject = bugtService.savePjtBugtPlanDtlList(paramMap);
            } else if(edit_status.indexOf("deleted") >= 0) { // 저장 
                jobject = bugtService.removePjtBugtPlanDtlList(paramMap);
            } else {
            	return null;
            }
        }
        return jobject;
    }

    @RequestMapping(value="removePjtBugtPlanDtlList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtBugtPlanDtlList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return bugtService.removePjtBugtPlanDtlList(paramMap);
    }
    
    @RequestMapping(value="searchPjtBugtAcmsltList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtBugtAcmsltList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return bugtService.searchPjtBugtAcmsltList(paramMap);
    }
    
    @RequestMapping(value="searchPjtBugtAcmsltDtlList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtBugtAcmsltDtlList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return bugtService.searchPjtBugtAcmsltDtlList(paramMap);
    }
    
    @RequestMapping(value="modifyPjtBugtAcmsltDtlList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtBugtAcmsltDtlList(@ModelAttribute Pjtpmg002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

    	JSONObject jobject = new JSONObject ();
    	
        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
        	EgovMapForNull paramMap = StringUtil.requestToMap(request);
            
        	
            Enumeration params = request.getParameterNames();
        	String value = "";
        	String colNm = "";
        	int colNum = 0;

        	String edit_status = "";
        	while(params.hasMoreElements()) {
        		String param = (String)params.nextElement();
        		System.out.println("_status  >>>>  :: " + param);
	
        		value = request.getParameter(param);
        		colNm = "";
        		//
        		if(param.equals("!nativeeditor_status")) {
        			edit_status = value;
        		}
        		switch(colNum) {
        			case 5:  colNm = "bugtUsedt";      	  break;
	        		case 6:  colNm = "prmpcTy";           break;
	        		case 7:  colNm = "useAmt";       	  break;
	        		case 8:  colNm = "useSummary";       break;
	        		case 11:  colNm = "projectSn";      	  break;
	        		case 12:  colNm = "bugtAcmsltSn";      break;
        		}
        		if(colNm.length()> 0) {
        			System.out.println(colNum + "   colNm 수정 : [" + colNm + "] :" + value);
        			if(colNum > 3 || colNum < 12) { 
        				if(colNum == 4)
        					paramMap.put(colNm, value.replaceAll("-", ""));
        				else
        					paramMap.put(colNm, value);
        			}
        		} 
        		colNum++; 
        	} 
 
            if(edit_status.indexOf("updated") >= 0) { // 수정
            	jobject = bugtService.modifyPjtBugtAcmsltDtlList(paramMap);
            } else if(edit_status.indexOf("inserted") >= 0) {  // 저장 
            	jobject = bugtService.savePjtBugtAcmsltDtlList(paramMap);
            } else if(edit_status.indexOf("deleted") >= 0) { // 저장 
                jobject = bugtService.removePjtBugtAcmsltDtlList(paramMap);
            } else {
            	return null;
            }
        }
        return jobject;
    }

    @RequestMapping(value="removePjtBugtAcmsltDtlList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtBugtAcmsltDtlList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return bugtService.removePjtBugtAcmsltDtlList(paramMap);
    }
    
    @RequestMapping(value="searchPjtBugtPlanAcmsltList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtBugtPlanAcmsltList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return bugtService.searchPjtBugtPlanAcmsltList(paramMap);
    }
    
    @RequestMapping(value="findPjtBugtBaseDt", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtBugtBaseDt(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return bugtService.findPjtBugtBaseDt(paramMap);
    }
}
