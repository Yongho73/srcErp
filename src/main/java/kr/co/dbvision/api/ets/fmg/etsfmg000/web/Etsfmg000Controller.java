package kr.co.dbvision.api.ets.fmg.etsfmg000.web;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import kr.co.dbvision.api.ets.fmg.etsfmg000.entity.Etsfmg000;
import kr.co.dbvision.api.ets.fmg.etsfmg000.service.Etsfmg000Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 양식관리관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.18          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="etsfmg000")
public class Etsfmg000Controller {

    @Resource(name="Etsfmg000Service")
    public Etsfmg000Service service;

    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;

    public Etsfmg000Controller() {
        //
    }

    @GetMapping(value="searchEtsfmg000")
    @ResponseBody
    public JSONObject searchEtsfmg000(@ModelAttribute Etsfmg000 entity) {
        try {
        	return service.searchEtsfmg000(entity);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @GetMapping(value="findEtsfmg000")
    @ResponseBody
    public JSONObject findEtsfmg000(@ModelAttribute Etsfmg000 entity) throws Exceptions {
        try {            
            return service.findEtsfmg000(entity);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @PostMapping(value="saveEtsfmg000")
    @ResponseBody
    public JSONObject saveEtsfmg000(@RequestBody List<Etsfmg000> entity) throws Exceptions {
        try {        	
        	if (entityValidation(entity)) {
                return new JsonMsgMng().makeValidationFailJsonObject("require empty");
            } else {                
                return service.saveEtsfmg000(entity);
            }
        } catch (Exceptions e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @PostMapping(value="excelEtsfmg000")
    public ModelAndView excelEtsfmg000(@ModelAttribute Etsfmg000 entity) throws Exceptions {

        try {
            
            List<Object> rowLists = new ArrayList<Object>();
            ExcelFileMng excelFileManage = new ExcelFileMng();
            Map<String, Object> excelMap;
            excelMap = excelFileManage.getExcelMap( entity.getArg() );            
            Map<String, Object> params = (Map<String, Object>) excelMap.get("params");            
            rowLists.add(service.searchEtsfmg000ForExcel((EgovMapForNull) params.get("0")));
            excelMap.put("rowLists", rowLists);
            return new ModelAndView("excelView", "excelMap", excelMap);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }

    private boolean entityValidation(List<Etsfmg000> entity) {
    	boolean result = false;
    	// 키가 없으면 자동생성으로 체크 안함...
    	/*for(Etsfmg000 etsfmg000 : entity) {
    		if( "".equals(StringExpression.nullConvert( etsfmg000.getRaisNo() )) ) {
    			result = true;
    		}
    	}*/
    	return result;
    }
}
