package kr.co.dbvision.api.mps.bas.mpsbas003.web;

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

import kr.co.dbvision.api.mps.bas.mpsbas003.entity.Mpsbas003;
import kr.co.dbvision.api.mps.bas.mpsbas003.service.Mpsbas003Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근로소득 간이세액표에 관한 웹화면 이벤트 클래스
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
 *     2019.05.11          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="mpsbas003")
public class Mpsbas003Controller {

    @Resource(name="Mpsbas003Service")
    public Mpsbas003Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Mpsbas003Controller() {
        //
    }

    @RequestMapping(value="searchMpsSimplctyTaxtbl", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMpsSimplctyTaxtbl(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMpsSimplctyTaxtbl(paramMap);
    }

    @RequestMapping(value="findMpsSimplctyTaxtbl", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findMpsSimplctyTaxtbl(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.findMpsSimplctyTaxtbl(paramMap);
    }

    @RequestMapping(value="saveMpsSimplctyTaxtbl", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject saveMpsSimplctyTaxtbl(@ModelAttribute Mpsbas003 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.saveMpsSimplctyTaxtbl(paramMap);
        }
    }

    @RequestMapping(value="modifyMpsSimplctyTaxtbl", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject modifyMpsSimplctyTaxtbl(@ModelAttribute Mpsbas003 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);
        
        

        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
        	Enumeration params = request.getParameterNames();
        	String value = "";
        	String colNm = "";
        	int colNum = 0;

        	EgovMapForNull paramMap = StringUtil.requestToMap(request);
        	while(params.hasMoreElements()) {
        		String param = (String)params.nextElement();
        		value = request.getParameter(param);
        		colNm = "";
        		switch(colNum) {
	        		case 2:  colNm = "applcBeginYm"; break;
	        		case 3:  colNm = "lwltAmt";      break;
	        		case 4:  colNm = "uplmtAmt";     break;
	        		case 5:  colNm = "applcEndYm";   break;
	        		case 6:  colNm = "family1Tax";   break;
	        		case 7:  colNm = "family2Tax";   break;
	        		case 8:  colNm = "family3Tax";   break;
	        		case 9:  colNm = "family4Tax";   break;
	        		case 10: colNm = "family5Tax";   break;
	        		case 11: colNm = "family6Tax";   break;
	        		case 12: colNm = "family7Tax";   break;
	        		case 13: colNm = "family8Tax";   break;
	        		case 14: colNm = "family9Tax";   break;
	        		case 15: colNm = "family10Tax";  break;
	        		case 16: colNm = "family11Tax";  break;
        		}
        		if(colNm.length()> 0) {
        			//System.out.println(colNum + "   colNm 수정 : [" + colNm + "] :" + value);
        			if(colNum > 1 || colNum < 17) paramMap.put(colNm, value);
        		} 
        		colNum++; 
        	} 
        	 
            return service.modifyMpsSimplctyTaxtbl(paramMap); 
        }
    }

    @RequestMapping(value="removeMpsSimplctyTaxtbl", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject removeMpsSimplctyTaxtbl(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.removeMpsSimplctyTaxtbl(paramMap);
    }

    @RequestMapping(value="excelMpsSimplctyTaxtbl", method=RequestMethod.POST)
    public ModelAndView excelMpsSimplctyTaxtbl(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

        try {

            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");
            rowLists.add(service.searchMpsSimplctyTaxtblForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }
    @RequestMapping(value="excelUploadMpsSimplctyTaxtbl", method=RequestMethod.POST)
    public JSONObject excelUploadMpsSimplctyTaxtbl(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

    	 EgovMapForNull paramMap = StringUtil.requestToMap(request);
         return service.excelUploadMpsSimplctyTaxtbl(paramMap);
     }
    @RequestMapping(value="excelUploadMpsSimplctyTaxtbl2", method=RequestMethod.POST)
    public JSONObject excelUploadMpsSimplctyTaxtbl2(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

    	 EgovMapForNull paramMap = StringUtil.requestToMap(request);
         return service.excelUploadMpsSimplctyTaxtbl2(paramMap);
     }
}
