package kr.co.dbvision.api.pub.wks.pubwks022.web;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
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

import kr.co.dbvision.api.pub.wks.pubwks022.entity.Pubwks022;
import kr.co.dbvision.api.pub.wks.pubwks022.service.Pubwks022Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인휴무신청관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @sourceGen version 2020.09.02.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="pubwks022")
public class Pubwks022Controller {

    @Resource(name="Pubwks022Service")
    public Pubwks022Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Pubwks022Controller() {
        //
    }

    @RequestMapping(value="searchPubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPubwks022(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPubwks022(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="searchEmpPubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchEmpPubwks022(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchEmpPubwks022(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    

    @RequestMapping(value="findPubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPubwks022(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findPubwks022(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="makeCalendar", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject makeCalendar(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.makeCalendar(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="savePubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject savePubwks022(@ModelAttribute Pubwks022 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.savePubwks022(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="saveBundlePubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject saveBundlePubwks022(@ModelAttribute Pubwks022 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                List<String> deSeCodeArr = new ArrayList<String>();
                String[] deSeCodeTmp = request.getParameterValues("deSeCodeArr[]");
                for(String tmp : deSeCodeTmp) {
                    deSeCodeArr.add(tmp);
                }
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                paramMap.put("deSeCodeArr" , deSeCodeArr);
                return service.saveBundlePubwks022(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="bundleSttusUpdatePubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject bundleSttusUpdatePubwks022(@ModelAttribute Pubwks022 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                String[] empno;
                String[] elctsctSeSn;
                List<Map<String , String>> objectArr = new ArrayList<Map<String,String>>();
                int size = Integer.parseInt(request.getParameter("objectArrSize"));
                for(int i = 0 ; i <= size ; i++) {
                    Map<String,String> object = new HashMap<String,String>();
                    empno = request.getParameterValues("objectArr["+ i +"][empno]");
                    elctsctSeSn = request.getParameterValues("objectArr["+ i +"][elctsctSeSn]");
                    object.put("empno", empno[0]);
                    object.put("elctsctSeSn", elctsctSeSn[0]);
                    objectArr.add(object);
                }
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                paramMap.put("objectArr" , objectArr);
                return service.bundleSttusUpdatePubwks022(paramMap);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="sttusUpdatePubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject sttusUpdatePubwks022(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.sttusUpdatePubwks022(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="deletePubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject deletePubwks022(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.deletePubwks022(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @RequestMapping(value="copyPubwks022", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject copyPubwks022(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.copyPubwks022(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @RequestMapping(value="excelPubwks022", method=RequestMethod.POST)
    public ModelAndView excelPubwks022(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchPubwks022ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
}
