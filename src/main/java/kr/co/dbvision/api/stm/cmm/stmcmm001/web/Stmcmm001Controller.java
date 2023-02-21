package kr.co.dbvision.api.stm.cmm.stmcmm001.web;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import kr.co.dbvision.api.stm.cmm.stmcmm001.entity.Stmcmm001;
import kr.co.dbvision.api.stm.cmm.stmcmm001.service.Stmcmm001Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.GlobalProperties;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.taglib.system.setting.service.impl.SystemSetting;
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
@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value = "stmcmm001")
public class Stmcmm001Controller {
	
	@Resource(name = "Stmcmm001Service")
	private Stmcmm001Service service;

	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	private JsonMsgMng jsonMsgMng = new JsonMsgMng();

	@RequestMapping(value = "findUser")
	@ResponseBody
	public JSONObject findUser(@RequestParam Map<String, String> paramMap) throws IOException {
		try {
			JSONObject jsonObject = jsonMsgMng.makeJsonObject(service.findUser(paramMap));
			jsonObject.put("redirect", GlobalProperties.getProperty("Globals.MainPage"));
			return jsonObject;
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
  
	@RequestMapping(value = "checkLogin")
	@ResponseBody
	public JSONObject checkLogin(@ModelAttribute Stmcmm001 stmcmm001, HttpSession session, BindingResult bindingResult)
			throws Exceptions {

		JSONObject jsonObject = new JSONObject();

		try {

			beanValidator.validate(stmcmm001, bindingResult);

			if (bindingResult.hasErrors()) {
				return jsonMsgMng.makeValidationFailJsonObject(bindingResult.getAllErrors());
			} else {
				
			    EgovMapForNull response = service.findPassword(stmcmm001, session);
			    String passwordUpdt = StringExpression.nullConvert(response.get("passwordUpdt"));

				if (passwordUpdt.equals("")) {
					jsonObject = jsonMsgMng.makeJsonObject(false);
				} else
				if (passwordUpdt.equals("already")) {
				    jsonObject = jsonMsgMng.makeJsonObject(response);
				} else {
					jsonObject = jsonMsgMng.makeJsonObject(true);
					jsonObject.put("passwordUpdt", passwordUpdt);
					jsonObject.put("redirect", GlobalProperties.getProperty("Globals.MainPage"));
				}

				return jsonObject;
			}

		} catch (Exception e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

	@RequestMapping(value = "checkSession")
	@ResponseBody
	public JSONObject checkSession() throws Exceptions {

		try {

			Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();

			if (sessionMap == null) {
				return jsonMsgMng.makeJsonObject(false);
			} else {
				return jsonMsgMng.makeJsonObject(sessionMap);
			}

		} catch (Exception e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

	@RequestMapping(value = "logout")
	@ResponseBody
	public JSONObject logout(HttpSession session) {		
	    try {
    	    
	        Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
    	    
            if(sessionMap != null) {
                String userId = StringExpression.nullConvert(sessionMap.get("userId"));
                String bplcOde = StringExpression.nullConvert(sessionMap.get("bplcCode"));
                String multiLoginPermAt = SystemSetting.getItemValue(bplcOde, "multiLoginPermAt");
                service.logout(multiLoginPermAt, userId, session);
            }
    		
            return jsonMsgMng.makeJsonObject();
            
	    } catch (Exception e) {
            return jsonMsgMng.makeJsonObject(e);
        }
	}
	
	@RequestMapping(value = "getMenuPath")
	@ResponseBody
	public JSONObject getMenuPath(@RequestParam Map<String, String> paramMap) throws IOException {

		try {
			return jsonMsgMng.makeJsonObject(service.getMenuPath(paramMap));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	@RequestMapping(value = "loginIntranet")
    @ResponseBody
    public ModelAndView loginIntranet(@ModelAttribute Stmcmm001 stmcmm001, HttpSession session, BindingResult bindingResult)
            throws Exceptions {

	    service.findPasswordSSO(stmcmm001, session);
	    
	    ModelAndView mv = new ModelAndView();
	    if( !"".equals(StringExpression.nullConvert(stmcmm001.getUpMenuId())) && !"".equals(StringExpression.nullConvert(stmcmm001.getSubMenuId())) ) {
	    	mv.setView(new RedirectView("http://xerp.dbvision.co.kr/xerp/stmcmm002/sub/view?upMenuId="+stmcmm001.getUpMenuId()+"&subMenuId="+stmcmm001.getSubMenuId(), true));
	    } else 
	    if( !"".equals(StringExpression.nullConvert(stmcmm001.getUpMenuId())) && "".equals(StringExpression.nullConvert(stmcmm001.getSubMenuId())) ) {
		    mv.setView(new RedirectView("http://xerp.dbvision.co.kr/xerp/stmcmm002/sub/view", true));		    
	    } else {	    
	    	mv.setView(new RedirectView("http://intra.dbvision.co.kr/intro", true));
	    }
        return mv;
    }
}
