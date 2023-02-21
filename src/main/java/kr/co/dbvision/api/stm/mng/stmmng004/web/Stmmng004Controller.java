package kr.co.dbvision.api.stm.mng.stmmng004.web;

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

import kr.co.dbvision.api.stm.mng.stmmng004.entity.Stmmng004;
import kr.co.dbvision.api.stm.mng.stmmng004.service.Stmmng004Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 그룹권한관리에 관한 웹화면 이벤트 클래스
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
@RequestMapping(value="stmmng004")
public class Stmmng004Controller {

    @Resource(name="Stmmng004Service")
    public Stmmng004Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Stmmng004Controller() {
        //
    }

    @RequestMapping(value="search/role", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject role(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchRole(paramMap);
    }

//    @RequestMapping(value="search/menu", method=RequestMethod.GET)
//    @ResponseBody
//    public JSONObject menu(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
//
//        EgovMapForNull paramMap = StringUtil.requestToMap(request);
//        return service.searchMenu(paramMap);
//    }
    
    @RequestMapping(value="search/roleMenu", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject roleMenu(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchRoleMenu(paramMap);
    }
 
//    @RequestMapping(value="add/roleMenu", method=RequestMethod.POST)
//    @ResponseBody
//    public JSONObject saveStmRolemenu(
//    		@ModelAttribute Stmmng004 entity, 
//    		BindingResult bindingResult, 
//    		HttpServletRequest request, HttpServletResponse response) {
//
//        beanValidator.validate(entity, bindingResult);
//
//        if (bindingResult.hasErrors()) {
//            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
//        } else {
//            EgovMapForNull paramMap = StringUtil.requestToMap(request);
//            return service.addRoleMenu(paramMap);
//        }
//    }

    @RequestMapping(value="modify/roleMenu", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyStmRolemenu(@ModelAttribute Stmmng004 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyRoleMenu(paramMap);
        }
    }

//    @RequestMapping(value="remove/roleMenu", method=RequestMethod.POST)
//    @ResponseBody
//    public JSONObject removeStmRolemenu(HttpServletRequest request, HttpServletResponse response) {
//
//        EgovMapForNull paramMap = StringUtil.requestToMap(request);
//        return service.removeRoleMenu(paramMap);
//    }

//    @RequestMapping(value="excelDownload", method=RequestMethod.POST)
//    public ModelAndView excelRole(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
//
//        try {
//
//            EgovMapForNull paramMap = StringUtil.requestToMap(request);
//            List<Object> rowLists = new ArrayList<Object>();
//            ExcelFileMng excelFileManage = new ExcelFileMng();
//            Map<String, Object> excelMap;
//            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
//            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
//            rowLists.add(service.searchRoleForExcel((EgovMapForNull) params.get("0")));
//            excelMap.put("rowLists", rowLists);
//            return new ModelAndView("excelView", "excelMap", excelMap);
//
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
//
//        return null;
//    }
    
    @RequestMapping(value="excel/roleMenu", method=RequestMethod.POST)
    public ModelAndView excelRolemenu(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchRoleMenuForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
