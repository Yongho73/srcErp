package kr.co.dbvision.lib.ui.cmm.file.web;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;
import kr.co.dbvision.lib.ui.cmm.file.service.FileDownService;
import kr.co.dbvision.lib.ui.cmm.file.service.FileUpService;
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
@RequestMapping(value = "file")
public class FileUpdownController {
	
	@Resource(name = "FileUpService")
	private FileUpService fileUpService;

	@Resource(name = "FileDownService")
	private FileDownService fileDownService;

	private JsonMsgMng jsonMsgMng;

	public FileUpdownController() {
		jsonMsgMng = new JsonMsgMng();
	}

	@RequestMapping(value = "upload")
	@ResponseBody
	public JSONObject upload(MultipartHttpServletRequest multiRequest) {
		//
		try {
			return jsonMsgMng.makeJsonObject(fileUpService.registerFileInfs(multiRequest.getFileMap()));
		} catch (Exceptions e) {
			return jsonMsgMng.makeJsonObject(e);
		}
	}

	@RequestMapping(value = "down")
	public void down(@ModelAttribute FileAtch files, HttpServletRequest request, HttpServletResponse response) {
		//
		try {
			fileDownService.fileDownload(files, request, response);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exceptions e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
 
	@RequestMapping(value = "findFile")
	@ResponseBody
	public JSONObject findFile(@ModelAttribute FileAtch files) {
		//
		try {
			return jsonMsgMng.makeJsonObject(fileDownService.findFile(files));
		} catch (Exceptions e) {		 
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
	@RequestMapping(value = "searchFiles")
	@ResponseBody
	public JSONObject findFiles(HttpServletRequest request, HttpServletResponse response) {
		//
		try {
			EgovMapForNull paramMap = StringUtil.requestToMap(request);	
			return jsonMsgMng.makeJsonObject(fileDownService.findFiles(paramMap));
		} catch (Exceptions e) {		 
			return jsonMsgMng.makeJsonObject(e);
		}
	}
	
    @RequestMapping(value="excelFileUpload", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject excelFileUpload(HttpServletRequest request, HttpServletResponse response) throws Exceptions {

         EgovMapForNull paramMap = StringUtil.requestToMap(request);
         return fileUpService.excelUploadList(paramMap);
     }
}
