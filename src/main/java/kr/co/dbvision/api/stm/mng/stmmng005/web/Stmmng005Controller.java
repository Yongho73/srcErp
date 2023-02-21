package kr.co.dbvision.api.stm.mng.stmmng005.web;

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

import kr.co.dbvision.api.stm.mng.stmmng005.entity.Stmmng005;
import kr.co.dbvision.api.stm.mng.stmmng005.service.Stmmng005Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 그룹권한등록에 관한 웹화면 이벤트 클래스
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
@RequestMapping(value="stmmng005")
public class Stmmng005Controller {

    @Resource(name="Stmmng005Service")
    public Stmmng005Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Stmmng005Controller() {
        //
    }

    @RequestMapping(value="searchStmRole", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchStmRole(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchStmRole(paramMap);
    }

    @RequestMapping(value="findStmRole", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findStmRole(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findStmRole(paramMap);
    }

    @RequestMapping(value="saveStmRole", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveStmRole(@ModelAttribute Stmmng005 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveStmRole(paramMap);
        }
    }

    @RequestMapping(value="modifyStmRole", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyStmRole(@ModelAttribute Stmmng005 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.modifyStmRole(paramMap);
        }
    }

    @RequestMapping(value="removeStmRole", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeStmRole(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeStmRole(paramMap);
    }

    @RequestMapping(value="excelStmRole", method=RequestMethod.POST)
    public ModelAndView excelStmRole(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchStmRoleForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
