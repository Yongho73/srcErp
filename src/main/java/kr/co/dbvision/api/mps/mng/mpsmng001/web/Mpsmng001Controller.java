package kr.co.dbvision.api.mps.mng.mpsmng001.web;

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

import kr.co.dbvision.api.mps.mng.mpsmng001.entity.Mpsmng001;
import kr.co.dbvision.api.mps.mng.mpsmng001.service.Mpsmng001Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사용자에 관한 웹화면 이벤트 데이터 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */
@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value = "mpsmng001")
public class Mpsmng001Controller {

	@Resource(name = "Mpsmng001Service")
	public Mpsmng001Service service;

	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	private JsonMsgMng jsonMsgMng;

	public Mpsmng001Controller() {
		jsonMsgMng = new JsonMsgMng();
	}

	@RequestMapping(value = "searchMpsSalaryCd", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject searchMpsSalaryCd(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);
			return jsonMsgMng.makeJsonObject(service.searchMpsSalaryCd(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	

	@RequestMapping(value = "findMpsSalaryCd", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject findMpsSalaryCd(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);
			return jsonMsgMng.makeJsonObject(service.findMpsSalaryCd(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

	@RequestMapping(value = "saveMpsSalaryCd", method = RequestMethod.POST)
	@ResponseBody
	public JSONObject saveMpsSalaryCd(@ModelAttribute Mpsmng001 entity, BindingResult bindingResult, HttpServletRequest request,
			HttpServletResponse response) {

		try {
			
			beanValidator.validate(entity, bindingResult);

			if (bindingResult.hasErrors()) {
				return jsonMsgMng.makeValidationFailJsonObject(bindingResult.getAllErrors());
			} else {
				EgovMapForNull paramMap = StringUtil.requestToMap(request);
				return jsonMsgMng.makeJsonObject(service.saveMpsSalaryCd(paramMap));
			}

		} catch (Exceptions e) {
			System.out.println("Exceptions CONTROLLER");
			return jsonMsgMng.makeJsonObject(e);
		}
		
	}

	@RequestMapping(value = "modifyMpsSalaryCd", method = RequestMethod.POST)
	@ResponseBody
	
	public JSONObject modifyMpsSalaryCd(@ModelAttribute Mpsmng001 entity, BindingResult bindingResult, HttpServletRequest request,
			HttpServletResponse response) {
		//
		try {

			beanValidator.validate(entity, bindingResult);

			if (bindingResult.hasErrors()) {
				return jsonMsgMng.makeValidationFailJsonObject(bindingResult.getAllErrors());
			} else {
				EgovMapForNull paramMap = StringUtil.requestToMap(request);
				service.modifyMpsSalaryCd(paramMap);
				return jsonMsgMng.makeJsonObject(entity);
			}

		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

	@RequestMapping(value = "removeMpsSalaryCd", method = RequestMethod.POST)
	@ResponseBody
	public JSONObject removeMpsSalaryCd(HttpServletRequest request, HttpServletResponse response) {
		//
		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);
			Mpsmng001 vo = new Mpsmng001(paramMap);
			service.removeMpsSalaryCd(paramMap);
			return jsonMsgMng.makeJsonObject(vo);
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

	@RequestMapping(value = "excelMpsSalaryCd", method = RequestMethod.POST)
	public ModelAndView excelMpsSalaryCd(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
		//
		try {

			EgovMapForNull paramMap = StringUtil.requestToMap(request);
			List<Object> rowLists = new ArrayList<Object>();
			ExcelFileMng excelFileManage = new ExcelFileMng();
			Map<String, Object> excelMap;
			excelMap = excelFileManage.getExcelMap(String.valueOf(paramMap.get("arg")));
			Map<String, Object> params = (Map<String, Object>) excelMap.get("params");	
			rowLists.add(service.searchMpsSalaryCdForExcel((EgovMapForNull) params.get("0")));
			excelMap.put("rowLists", rowLists);
			return new ModelAndView("excelView", "excelMap", excelMap);

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}
}
