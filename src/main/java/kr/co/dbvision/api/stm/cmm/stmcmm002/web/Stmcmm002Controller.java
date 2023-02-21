package kr.co.dbvision.api.stm.cmm.stmcmm002.web;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springmodules.validation.commons.DefaultBeanValidator;

import kr.co.dbvision.api.stm.cmm.stmcmm002.service.Stmcmm002Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 로그인에 관한 웹화면 클래스
 *
 * @author  디비비전
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        디비비전          최초 생성
 *
 * </pre>
 */ 
@Controller
@RequestMapping(value = "stmcmm002")
public class Stmcmm002Controller {
	
	@Resource(name = "Stmcmm002Service")
	private Stmcmm002Service service;

	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	private JsonMsgMng jsonMsgMng = new JsonMsgMng();

	@RequestMapping(value = "searchMenuNm")
	@ResponseBody
	public JSONObject searchMenuNm(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			JSONObject jsonObject = jsonMsgMng.makeJsonObject(service.searchMenuNm(paramMap));
			return jsonObject;
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

	@RequestMapping(value = "searchFavMenu")
	@ResponseBody
	public JSONObject searchFavMenu(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			return jsonMsgMng.makeJsonObject(service.searchFavMenu(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	@RequestMapping(value = "findFirstProgramMenuId")
	@ResponseBody
	public JSONObject findFirstProgramMenuId(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			return jsonMsgMng.makeJsonObject(service.findFirstProgramMenuId(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	@RequestMapping(value = "searchMenuInfo")
	@ResponseBody
	public JSONObject searchMenuPath(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			return jsonMsgMng.makeJsonObject(service.searchMenuInfo(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}	
	
	@RequestMapping(value = "findProgrmId")
	@ResponseBody
	public JSONObject findProgrmId(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			return jsonMsgMng.makeJsonObject(service.findProgrmId(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	@RequestMapping(value = "getTopMenuId")
	@ResponseBody
	public JSONObject getTopMenuId(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			return jsonMsgMng.makeJsonObject(service.getTopMenuId(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	@RequestMapping(value = "addFavMenu")
	@ResponseBody
	public JSONObject addFavMenu(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			return jsonMsgMng.makeJsonObject(service.addFavMenu(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	@RequestMapping(value = "removeFavMenu")
	@ResponseBody
	public JSONObject removeFavMenu(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			return jsonMsgMng.makeJsonObject(service.removeFavMenu(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	@RequestMapping(value = "getMenuAuth")
    @ResponseBody
    public JSONObject getMenuAuth(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request); 
            return jsonMsgMng.makeJsonObject(service.getMenuAuth(paramMap));
        } catch (Exceptions e) {
            return jsonMsgMng.makeJsonObject(e);
        }
    }
}
