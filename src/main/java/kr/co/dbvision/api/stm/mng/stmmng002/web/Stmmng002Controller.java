package kr.co.dbvision.api.stm.mng.stmmng002.web;

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

import kr.co.dbvision.api.stm.mng.stmmng002.entity.Stmmng002;
import kr.co.dbvision.api.stm.mng.stmmng002.service.Stmmng002Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 메뉴관리에 관한 웹화면 이벤트 클래스
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
 *     2019.05.16          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="stmmng002")
public class Stmmng002Controller {

    @Resource(name="Stmmng002Service")
    public Stmmng002Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Stmmng002Controller() {
        //
    }

    @RequestMapping(value="searchStmMenu", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchStmMenu(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchStmMenu(paramMap);
    }

    @RequestMapping(value="findStmMenu", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findStmMenu(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findStmMenu(paramMap);
    }

    @RequestMapping(value="saveStmMenu", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveStmMenu(@ModelAttribute Stmmng002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveStmMenu(paramMap);
        }
    }

    @RequestMapping(value="modifyStmMenu", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyStmMenu(@ModelAttribute Stmmng002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyStmMenu(paramMap);
        }
    }

    @RequestMapping(value="removeStmMenu", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeStmMenu(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeStmMenu(paramMap);
    }

    @RequestMapping(value="excelStmMenu", method=RequestMethod.POST)
    public ModelAndView excelStmMenu(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchStmMenuForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value = "findDupMenuId", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject findDupMenuId(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
		//
    	EgovMapForNull paramMap = StringUtil.requestToMap(request);
    	return service.findDupMenuId(paramMap);
	}
    
    @RequestMapping(value = "modifyOrder", method = RequestMethod.POST)
	@ResponseBody
	public JSONObject modifyOrder(@ModelAttribute Stmmng002 entity, BindingResult bindingResult, HttpServletRequest request,
			HttpServletResponse response) {
		//
		beanValidator.validate(entity, bindingResult);

		if (bindingResult.hasErrors()) {
			return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
		} else {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyOrder(paramMap);
		}		 
	}
    
    @RequestMapping(value="searchProgm", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject searchProgm(HttpServletRequest request, HttpServletResponse response) {
    	//
        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchProgm();
    }
}
