package kr.co.dbvision.api.mfs.bsc.mfsbsc002.web;

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

import kr.co.dbvision.api.mfs.bsc.mfsbsc002.entity.Mfsbsc002;
import kr.co.dbvision.api.mfs.bsc.mfsbsc002.service.Mfsbsc002Service;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 거래처관리관리에 관한 웹화면 이벤트 클래스
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
 *     2020.03.10          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mfsbsc002")
public class Mfsbsc002Controller {

    @Resource(name="Mfsbsc002Service")
    public Mfsbsc002Service service;

    @Resource(name="Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;    
    
    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mfsbsc002Controller() {
        //
    }

    @RequestMapping(value="searchMfsbsc002", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMfsbsc002(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMfsbsc002(paramMap);
    }

    @RequestMapping(value="findMfsbsc002", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMfsbsc002(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMfsbsc002(paramMap);
    }

    @RequestMapping(value="saveMfsbsc002", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMfsbsc002(@ModelAttribute Mfsbsc002 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            
            return service.saveMfsbsc002(paramMap);
        }
    }

    @RequestMapping(value="removeMfsbsc002", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMfsbsc002(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMfsbsc002(paramMap);
    }

    @RequestMapping(value="excelMfsbsc002", method=RequestMethod.POST)
    public ModelAndView excelMfsbsc002(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMfsbsc002ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
