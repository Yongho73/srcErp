package kr.co.dbvision.lib.taglib.system.setting.web;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.taglib.system.setting.service.SystemSettingService;
import net.sf.json.JSONObject;

/**
 * 시스템 설정 지원 관한 웹호출
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
@RequestMapping(value = "system/setting")
public class SystemSettingController {
	
	@Resource(name="SystemSettingService")
	private SystemSettingService systemSettingService;
	
	private JsonMsgMng jsonMsgMng;

	public SystemSettingController() {
		jsonMsgMng = new JsonMsgMng();
	}

	@RequestMapping(value="getSettingValue")
	@ResponseBody
	public JSONObject getSettingValue(@RequestParam Map<String, Object> params) throws Exception {
 
		try {		
			return jsonMsgMng.makeJsonObject(systemSettingService.getSettingValue(params));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}
 
	@RequestMapping(value="refreshSettingItem")
	@ResponseBody
	public JSONObject refreshSettingItem(@RequestParam Map<String, Object> params) throws Exception {
		
		try {
			return jsonMsgMng.makeJsonObject(systemSettingService.refreshSettingItem());
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}		 
	}	
}
