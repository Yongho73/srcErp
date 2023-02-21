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

import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001HnfService;
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
public class Pjtpmg001PjtHnfController {


    @Resource(name="Pjtpmg001HnfService")
    public Pjtpmg001HnfService hnfService;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pjtpmg001PjtHnfController() {
        //
    }

    
    @RequestMapping(value="searchPjtProjectHnfPlanList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectHnfPlanList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return hnfService.searchPjtProjectHnfPlanList(paramMap);
    }
    
    @RequestMapping(value="modifyPjtProjectHnfPlanudtList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtProjectHnfPlanudtList(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

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
        		    case 4:  colNm = "prtcpntEmpno";       break;
	        		case 5:  colNm = "prtcpntNm";          break;
	        		case 6:  colNm = "img";                break;
	        		case 7:  colNm = "tchnlgyGrad";        break;
	        		case 8:  colNm = "roleCode";           break;
	        		case 9:  colNm = "partcptnManMonth";   break;
	        		case 10: colNm = "partcptnBeginDe";    break;
	        		case 11: colNm = "partcptnEndDe";      break;
	        		case 12: colNm = "extrlServcAt";       break;
	        		case 13: colNm = "hnfPlanSn";          break;
	        		case 14: colNm = "projectSn";          break;
        		}
        		if(colNm.length()> 0) {
        			System.out.println(colNum + "   colNm 수정 : [" + colNm + "] :" + value);
        			if(colNum > 3 || colNum < 15) { 
        				if(colNum == 10 || colNum == 11 ) {
        					paramMap.put(colNm, value.replaceAll("-", ""));
        				} else {
        					paramMap.put(colNm, value);
        				}
        			}
        		} 
        		colNum++; 
        	} 
 
            if(edit_status.indexOf("updated") >= 0) { // 수정
            	jobject = hnfService.modifyPjtProjectHnfPlanList(paramMap);
            } else if(edit_status.indexOf("inserted") >= 0) {  // 저장 
            	jobject = hnfService.savePjtProjectHnfPlanList(paramMap);
            } else if(edit_status.indexOf("deleted") >= 0) {
                jobject = hnfService.removePjtProjectHnfPlanList(paramMap);
            } else {
            	return null;
            }
        }
        
        return jobject;
    }
    
    @RequestMapping(value="removePjtProjectHnfPlanList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtProjectHnfPlanList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return hnfService.removePjtProjectHnfPlanList(paramMap);
    }
    
    @RequestMapping(value="modifyPjtProjectBugtHnfPlan", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtProjectBugtHnfPlan(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return hnfService.modifyPjtProjectBugtHnfPlan(paramMap);
        }
    }
    
    @RequestMapping(value="removePjtProjectBugtHnfPlan", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtProjectBugtHnfPlan(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return hnfService.removePjtProjectBugtHnfPlan(paramMap);
        }
    }

    @RequestMapping(value="searchPjtProjectHnfPlanAcmsltList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectHnfPlanAcmsltList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return hnfService.searchPjtProjectHnfPlanAcmsltList(paramMap);
    }
    
    @RequestMapping(value="searchPjtProjectHnfPlanAcmsltAddList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectHnfPlanAcmsltAddList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return hnfService.searchPjtProjectHnfPlanAcmsltAddList(paramMap);
    }
    
    @RequestMapping(value="searchPjtProjectHnfAcmsltList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectHnfAcmsltList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return hnfService.searchPjtProjectHnfAcmsltList(paramMap);
    }
    
    @RequestMapping(value="modifyPjtProjectHnfAcmsltList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtProjectHnfAcmsltList(@ModelAttribute Pjtpmg002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

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
        			case 4:  colNm = "acmsltStdrDe";       break;
        			case 5:  colNm = "prtcpntEmpno";          break;
	        		case 6:  colNm = "prtcpntNm";          break;
	        		case 7:  colNm = "img";          break;
	        		case 8:  colNm = "tchnlgyGrad";        break;
	        		case 9:  colNm = "roleCode";           break;
	        		case 10:  colNm = "partcptnManMonth";   break;
	        		case 11:  colNm = "extrlServcAt";       break;
	        		case 12: colNm = "hnfAcmsltSn";        break;
	        		case 13: colNm = "projectSn";          break;
        		}
        		if(colNm.length()> 0) {
        			System.out.println(colNum + "   colNm 수정 : [" + colNm + "] :" + value);
        			if(colNum > 3 || colNum < 14) { 
        				if(colNum == 4) {
        					paramMap.put(colNm, value.replaceAll("-", ""));
        				} else { 
        					paramMap.put(colNm, value);
        				}
        			}
        		} 
        		colNum++; 
        	} 
 
            if(edit_status.indexOf("updated") >= 0) { // 수정
            	jobject = hnfService.modifyPjtProjectHnfAcmsltList(paramMap);
            } else if(edit_status.indexOf("inserted") >= 0) { // 저장 
            	jobject = hnfService.savePjtProjectHnfAcmsltList(paramMap);
            } else if(edit_status.indexOf("deleted") >= 0) {
                jobject = hnfService.removePjtProjectHnfAcmsltList(paramMap);
            } else {
            	return null;
            }
        }
        return jobject;
    }

    @RequestMapping(value="removePjtProjectHnfAcmsltList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtProjectHnfAcmsltList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return hnfService.removePjtProjectHnfAcmsltList(paramMap);
    }
    
    @RequestMapping(value="modifyPjtProjectBugtHnfAcmslt", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtProjectBugtHnfAcmslt(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return hnfService.modifyPjtProjectBugtHnfAcmslt(paramMap);
        }
    }
    
    @RequestMapping(value="removePjtProjectBugtHnfAcmslt", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtProjectBugtHnfAcmslt(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return hnfService.removePjtProjectBugtHnfAcmslt(paramMap);
        }
    }
    
    @RequestMapping(value="savePjtProjectHnfAcmsltCopy", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProjectHnfAcmsltCopy(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            System.out.println("여기까지는 들어오나~~~~~!!!....");
            return hnfService.savePjtProjectHnfAcmsltCopy(paramMap);
        }
    }
    
    @RequestMapping(value="savePjtProjectHnfPlanCopy", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProjectHnfPlanCopy(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return hnfService.savePjtProjectHnfPlanCopy(paramMap);
        }
    }
    
    @RequestMapping(value="findPjtProjectDe", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtProjectDe(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return hnfService.findPjtProjectDe(paramMap);
    }
}
