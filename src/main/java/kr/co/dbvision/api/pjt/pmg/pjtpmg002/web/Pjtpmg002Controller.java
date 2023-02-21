package kr.co.dbvision.api.pjt.pmg.pjtpmg002.web;

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

import kr.co.dbvision.api.pjt.pmg.pjtpmg002.entity.Pjtpmg002;
import kr.co.dbvision.api.pjt.pmg.pjtpmg002.service.Pjtpmg002Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트등록에 관한 웹화면 이벤트 클래스
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
 *     2020.01.15          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="pjtpmg002")
public class Pjtpmg002Controller {

    @Resource(name="Pjtpmg002Service")
    public Pjtpmg002Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pjtpmg002Controller() {
        //
    }

    @RequestMapping(value="searchPjtProject", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtProject(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchPjtProject(paramMap);
    }

    @RequestMapping(value="findPjtProject", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtProject(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findPjtProject(paramMap);
    }

    @RequestMapping(value="savePjtProject", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtProject(@ModelAttribute Pjtpmg002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

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
    public JSONObject modifyPjtProject(@ModelAttribute Pjtpmg002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

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
	        		case 4:  colNm = "chargerNm";         break;
	        		case 5:  colNm = "chargerDept";       break;
	        		case 6:  colNm = "chargerClsf";       break;
	        		case 7:  colNm = "chargerCttpc";      break;
	        		case 8:  colNm = "chargerMbtlnum";    break;
	        		case 9:  colNm = "chargerEmail";      break;
	        		case 10:  colNm = "chargerSn";         break;
	        		case 11:  colNm = "bcncCode";          break;
        		}
        		if(colNm.length()> 0) {
        			System.out.println(colNum + "   colNm 수정 : [" + colNm + "] :" + value);
        			if(colNum > 3 || colNum < 12) 
        				paramMap.put(colNm, value);
        		} 
        		colNum++; 
        	} 
 
            if(edit_status.indexOf("updated") >= 0)  // 수정
            	return service.modifyPjtProjectBcncList(paramMap);
            else if(edit_status.indexOf("inserted") >= 0)  // 저장
            	return service.savePjtProjectBcncList(paramMap);
            else if(edit_status.indexOf("deleted") >= 0)  // 삭제
            	return service.removePjtProjectBcncList(paramMap);
            else 
            	return null;
        }
        
    }

}
