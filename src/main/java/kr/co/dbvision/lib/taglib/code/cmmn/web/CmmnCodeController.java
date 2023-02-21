package kr.co.dbvision.lib.taglib.code.cmmn.web;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.taglib.code.cmmn.service.CmmnCodeService;
import kr.co.dbvision.lib.taglib.system.setting.service.SystemSettingService;
import net.sf.json.JSONObject;

/**
 * 공통코드 지원 관한 웹호출
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
@Controller
@RequestMapping(value = "cmmnCode")
public class CmmnCodeController {
	
	@Resource(name="CmmnCodeService")
	private CmmnCodeService cmmnCodeService;

	@Resource(name="SystemSettingService")
	private SystemSettingService systemSettingService;
	
	private JsonMsgMng jsonMsgMng;

	public CmmnCodeController() {
		jsonMsgMng = new JsonMsgMng();
	}

	@RequestMapping(value="getCmmnCode")
	@ResponseBody
	public JSONObject getLocaleCodeName(@RequestParam Map<String, Object> params) throws Exception {
 
		try {
			return jsonMsgMng.makeJsonObject(cmmnCodeService.getCmmnCode(params));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

	@RequestMapping(value="refreshCmmnCode")
	@ResponseBody
	public JSONObject refreshLocaleCode(@RequestParam Map<String, Object> params) throws Exception {
		
		try {
			return jsonMsgMng.makeJsonObject(cmmnCodeService.refreshCmmnCode());
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}		 
	}	
}
