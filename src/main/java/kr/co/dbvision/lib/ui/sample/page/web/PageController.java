package kr.co.dbvision.lib.ui.sample.page.web;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.rte.fdl.cryptography.EgovCryptoService;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.sample.page.service.PageService;
import net.sf.json.JSONObject;

/**
 * 샘플페이지에 관한 웹화면 클래스
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
@RequestMapping(value = "sample/data")
public class PageController {

	@Resource(name = "PageService")
	private PageService service;
	
	@Resource(name = "ARIACryptoService")
	private EgovCryptoService cryptoService;
	
	private JsonMsgMng jsonMsgMng = new JsonMsgMng();

	@RequestMapping(value = "getEncodeString")
	@ResponseBody
	public JSONObject getEncodeString(@RequestParam Map<String, String> paramMap) throws IOException {
		try {
			
			JSONObject jsonObject = jsonMsgMng.makeJsonObject(service.getEncodeString(cryptoService, paramMap));			 
			return jsonObject;

		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

    @RequestMapping(value="searchMhsEmp_rowspanSample", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchMhsEmp_rowspanSample(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searchMhsEmp_rowspanSample(paramMap);
    }

    @RequestMapping(value="search_colSpanSample", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject search_colSpanSample(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.searc_colSpanSample(paramMap);
    }
    
    @RequestMapping(value="search_dateSample", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject search_dateSample(HttpServletRequest request, HttpServletResponse response) {

        EgovMapForNull paramMap = StringUtil.requestToMap(request);
        return service.search_dateSample(paramMap);
    }
}
