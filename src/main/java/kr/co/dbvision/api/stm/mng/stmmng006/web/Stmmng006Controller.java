package kr.co.dbvision.api.stm.mng.stmmng006.web;

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

import kr.co.dbvision.api.stm.mng.stmmng006.entity.Stmmng006;
import kr.co.dbvision.api.stm.mng.stmmng006.service.Stmmng006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사용자권한관리에 관한 웹화면 이벤트 클래스
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
 *     2019.05.14          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="stmmng006")
public class Stmmng006Controller {

    @Resource(name="Stmmng006Service")
    public Stmmng006Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Stmmng006Controller() {
        //
    }

    @RequestMapping(value="searchStmmng006", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchUser(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchUser(paramMap);
    }
    
    @RequestMapping(value="search/menu", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMenu(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMenu(paramMap);
    }
    
    
    @RequestMapping(value="searchUserMenuStmmng006", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchUserMenu(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchUserMenu(paramMap);
    }
    
    @RequestMapping(value = "add/userMenu", method = RequestMethod.POST)
	@ResponseBody
	public JSONObject add(
			@ModelAttribute Stmmng006 entity, 
			BindingResult bindingResult, 
			HttpServletRequest request, HttpServletResponse response) throws Exceptions {
	 
			
		beanValidator.validate(entity, bindingResult);

		if (bindingResult.hasErrors()) {
			return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
		} else {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);
			return service.addUserMenu(paramMap);
		} 
	}
    
 
    @RequestMapping(value="saveUserMenuStmmng006", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyStmUsers(@ModelAttribute Stmmng006 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyUserMenu(paramMap);
        }
    }

    @RequestMapping(value="remove/userMenu", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeStmUsers(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeUserMenu(paramMap);
    }

    @RequestMapping(value="excel/user", method=RequestMethod.POST)
    public ModelAndView excelUsers(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchUserForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value="excelStmmng006", method=RequestMethod.POST)
    public ModelAndView excelUserMenu(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchUserMenuForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
