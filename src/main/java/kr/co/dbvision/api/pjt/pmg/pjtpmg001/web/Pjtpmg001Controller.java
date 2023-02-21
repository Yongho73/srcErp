package kr.co.dbvision.api.pjt.pmg.pjtpmg001.web;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Enumeration;
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

import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001Service;
import kr.co.dbvision.api.pjt.pmg.pjtpmg002.entity.Pjtpmg002;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

import kr.co.dbvision.lib.MailManage;

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

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="pjtpmg001")
public class Pjtpmg001Controller {

    @Resource(name="Pjtpmg001Service")
    public Pjtpmg001Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pjtpmg001Controller() {
        //
    }


    @RequestMapping(value="sendProjectMail", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject sendProjectMail(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exception {

    	JSONObject data = new JSONObject();
    	EgovMapForNull paramMap = StringUtil.requestToMap(request);
//    	String toMail = paramMap.get("toMail").toString();
//    	String toName = paramMap.get("toName").toString();
//    	String fromName = paramMap.get("fromName").toString();
//
//    	String projectNm = paramMap.get("projectNm").toString();
//    	
//    	StringBuffer conte = new StringBuffer();
//    	conte.append("<p style=\"padding:0 20px;word-break:keep-all;\"><font face=\"Malgun Gothic, 돋움\" size=\"4\" style=\"font-family: Malgun Gothic, 돋움; margin-top: 0px; margin-bottom: 0px;\">");
//    	conte.append("<b>프로젝트명 : </b> <font color=\"#000\"><b>"+projectNm+"</b></font>");
//    	conte.append("</p>");
//    	conte.append("<br/>");
//    	conte.append("<p>");
//    	conte.append("<font face=\"Malgun Gothic, 돋움\" size=\"3\" style=\"font-family: Malgun Gothic, 돋움; margin-top: 0px; margin-bottom: 0px;\">");
//    	conte.append("계획승인해주세요!!!!!!!!");
//    	conte.append("</font>");
//    	conte.append("</p>");
//    	conte.append("<br/>");
//    	conte.append("<p>");
    	
        try {
        	MailManage.sendMailTest(
                    "프로젝트관리 계획승인 승인요청",  //제목
                    "sypark@dbvision.co.kr",//받는사람
                    "박수연",  // 받는사람 이름
                    "디비비전",	//보낸사람 이름
                    "프로젝트관리 계획승인요청이 있습니다." // 내용
                );
        	data.put("code", "000");

        } catch (UnsupportedEncodingException e) {
        	data.put("code", "999");
            e.printStackTrace();
        }
    	
		return data;
    }


    
    
    

    @RequestMapping(value="searchPjtProject", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProject(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtProject(paramMap);
    }
    
    @RequestMapping(value="searchPjtProjectApprv", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectApprv(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtProjectApprv(paramMap);
    }

    @RequestMapping(value="findPjtProject", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtProject(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findPjtProject(paramMap);
    }

    @RequestMapping(value="savePjtProject", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProject(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtProject(paramMap);
        }
    }

    @RequestMapping(value="modifyPjtProject", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtProject(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyPjtProject(paramMap);
        }
    }

    @RequestMapping(value="removePjtProject", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtProject(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removePjtProject(paramMap);
    }

    @RequestMapping(value="excelPjtProject", method=RequestMethod.POST)
    public ModelAndView excelPjtProject(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchPjtProjectForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value="searchPjtProjectBcncList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectBcncList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtProjectBcncList(paramMap);
    }
    
    @RequestMapping(value="modifyPjtProjectBcncList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtProjectBcncList(@ModelAttribute Pjtpmg002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

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
	        		case 3:  colNm = "chargerNm";         break;
	        		case 4:  colNm = "chargerDept";       break;
	        		case 5:  colNm = "chargerClsf";       break;
	        		case 6:  colNm = "chargerCttpc";      break;
	        		case 7:  colNm = "chargerMbtlnum";    break;
	        		case 8:  colNm = "chargerEmail";      break;
	        		case 9:  colNm = "chargerSn";         break;
	        		case 10:  colNm = "bcncCode";          break;
        		}
        		if(colNm.length()> 0) {
        			System.out.println(colNum + "   colNm 수정 : [" + colNm + "] :" + value);
        			if(colNum > 2 || colNum < 11) 
        				paramMap.put(colNm, value);
        		} 
        		colNum++; 
        	} 
 
            if(edit_status.indexOf("updated") >= 0)  // 수정
            	return service.modifyPjtProjectBcncList(paramMap);
            else if(edit_status.indexOf("inserted") >= 0)  // 저장
            	return service.savePjtProjectBcncList(paramMap);
            else 
            	return null;
        }
        
    }
    
    @RequestMapping(value="removePjtProjectBcncList", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtProjectBcncList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removePjtProjectBcncList(paramMap);
    }
    

    @RequestMapping(value="searchPjtProjectCustomerList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectCustomerList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtProjectCustomerList(paramMap);
    }
    
    @RequestMapping(value="searchPjtProjectBaseCustomerList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProjectBaseCustomerList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtProjectBaseCustomerList(paramMap);
    }
    
    @RequestMapping(value="findJobDay", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findJobDay(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findJobDay(paramMap);
    }
    
    @RequestMapping(value="savePjtProjectNewApprov", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProjectNewApprov(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtProjectNewApprov(paramMap);
        }
    }
    
    @RequestMapping(value="findNewApprov", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findNewApprov(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findNewApprov(paramMap);
    }
    
    @RequestMapping(value="savePjtProjectNewApprovDe", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProjectNewApprovDe(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtProjectNewApprovDe(paramMap);
        }
    }
    
    @RequestMapping(value="savePjtProjectEnd", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProjectEnd(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtProjectEnd(paramMap);
        }
    }

    @RequestMapping(value="modifyPjtProjectEnd", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyPjtProjectEnd(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyPjtProjectEnd(paramMap);
        }
    }
    
    @RequestMapping(value="findPjtProjectEnd", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtProjectEnd(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findPjtProjectEnd(paramMap);
    }
    
    @RequestMapping(value="savePjtProjectEndApprov", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProjectEndApprov(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtProjectEndApprov(paramMap);
        }
    }

    @RequestMapping(value="savePjtProjectEndApprovDe", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProjectEndApprovDe(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtProjectEndApprovDe(paramMap);
        }
    }
    
    @RequestMapping(value="findPjtProjectPlanAcmsltCnt", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtProjectPlanAcmsltCnt(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findPjtProjectPlanAcmsltCnt(paramMap);
    }
    
    @RequestMapping(value="savePjtRepair", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtRepair(@ModelAttribute Pjtpmg001 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        beanValidator.validate(entity, bindingResult);
        
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return new JsonMsgMng().makeJsonObject(service.savePjtRepair(paramMap));
        }
    }
    
    @RequestMapping(value="findPjtRepair", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtRepair(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findPjtRepair(paramMap);
    }
    
    @RequestMapping(value="searchPjtRepairList", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtRepairList(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtRepairList(paramMap);
    }
    
    @RequestMapping(value="removePjtRepair", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removePjtRepair(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removePjtRepair(paramMap);
    }
}
