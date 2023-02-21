package kr.co.dbvision.api.ets.bst.etsbst002.web;

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

import kr.co.dbvision.api.ets.bst.etsbst002.entity.Etsbst002;
import kr.co.dbvision.api.ets.bst.etsbst002.service.Etsbst002Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 문서번호관리관리에 관한 웹화면 이벤트 클래스
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
 *     2020.03.27          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="etsbst002")
public class Etsbst002Controller {

    @Resource(name="Etsbst002Service")
    public Etsbst002Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Etsbst002Controller() {
        //
    }

    @RequestMapping(value="searchEtsbst002", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchEtsbst002(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchEtsbst002(paramMap);
    }

    @RequestMapping(value="findEtsbst002", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findEtsbst002(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findEtsbst002(paramMap);
    }

    @RequestMapping(value="saveEtsbst002", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveEtsbst002(@ModelAttribute Etsbst002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveEtsbst002(paramMap);
        }
    }

    @RequestMapping(value="removeEtsbst002", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeEtsbst002(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeEtsbst002(paramMap);
    }

    @RequestMapping(value="excelEtsbst002", method=RequestMethod.POST)
    public ModelAndView excelEtsbst002(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchEtsbst002ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    
    @RequestMapping(value="getNoSettingNoEtsfmg000", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject getDcrbNoEtsfmg000(HttpServletRequest request, HttpServletResponse response) throws Exceptions {       
        return service.getNoSettingNoEtsfmg000();
    }
}
