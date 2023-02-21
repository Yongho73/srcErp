package kr.co.dbvision.lib.ui.cmm.comp.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.ui.cmm.comp.service.CompService;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "comp")
public class CompController {

	@Resource(name = "CompService")
	public CompService service;

	public CompController() {
		//
	}

	@RequestMapping(value = "searchComp", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject searchMtaComp(HttpServletRequest request, HttpServletResponse response) {

		EgovMapForNull paramMap = StringUtil.requestToMap(request);
		return service.searchMtaComp(paramMap);
	}
}