package kr.co.dbvision.lib.ui.cmm.file.service.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.lib.Debug;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;
import kr.co.dbvision.lib.ui.cmm.file.service.FileDownService;
import kr.co.dbvision.lib.ui.cmm.file.service.mapper.FileUpdownMapper;
 
/**
 * 파일 다운로드 기능에 관한 구현 클래스
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
@Service("FileDownService")
@Transactional
public class FileDownServiceImpl extends EgovAbstractServiceImpl implements FileDownService {

	Logger logger = LogManager.getLogger(FileDownServiceImpl.class);
	
	@Resource(name="FileUpdownMapper")
	private FileUpdownMapper fileUpdownMapper;
	
    public FileDownServiceImpl() {
    	//
    }

	/**
	 * 브라우저 구분 얻기.
	 *
	 * @param request
	 * @return
	 */
	private String getBrowser(HttpServletRequest request) {
		String header = request.getHeader("User-Agent");

		if (header.indexOf("MSIE") > -1) {
			return "MSIE";
		} else if (header.indexOf("Trident") > -1) { // IE11 문자열 깨짐 방지
			return "Trident";
		} else if (header.indexOf("Chrome") > -1) {
			return "Chrome";
		} else if (header.indexOf("Opera") > -1) {
			return "Opera";
		}
		return "Firefox";
	}

	/**
	 * Disposition 지정하기.
	 *
	 * @param filename
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	private void setDisposition(String filename, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		String browser = getBrowser(request);

		String dispositionPrefix = "attachment; filename=";
		String encodedFilename = null;

		if (browser.equals("MSIE")) {
			encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		} else if (browser.equals("Trident")) { // IE11 문자열 깨짐 방지
			encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		} else if (browser.equals("Firefox")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Opera")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Chrome")) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < filename.length(); i++) {
				char c = filename.charAt(i);
				if (c > '~') {
					sb.append(URLEncoder.encode("" + c, "UTF-8"));
				} else {
					sb.append(c);
				}
			}
			encodedFilename = sb.toString();
		} else {
			throw new IOException("Not supported browser");
		}

		response.setHeader("Content-Disposition", dispositionPrefix + encodedFilename);

		if ("Opera".equals(browser)) {
			response.setContentType("application/octet-stream;charset=UTF-8");
		}
	}

	@Override
	public void fileDownload(FileAtch files, HttpServletRequest request, HttpServletResponse response) throws Exceptions, IOException {

		files.setFileInfo(findFile(files));

		File uFile = new File(files.getFileStreCours(), files.getStreFileNm());
		long fSize = uFile.length();

		if (fSize > 0) {
			String mimetype = "application/x-msdownload";

			// response.setBufferSize(fSize); // OutOfMemeory 발생
			response.setContentType(mimetype);
			// response.setHeader("Content-Disposition", "attachment; filename=\"" +
			// URLEncoder.encode(fvo.getOrignlFileNm(), "utf-8") + "\"");
			try {
				setDisposition(files.getOrignlFileNm(), request, response);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// response.setContentLength(fSize);

			/*
			 * FileCopyUtils.copy(in, response.getOutputStream()); in.close();
			 * response.getOutputStream().flush(); response.getOutputStream().close();
			 */
			BufferedInputStream in = null;
			BufferedOutputStream out = null;

			try {

				in = new BufferedInputStream(new FileInputStream(uFile));
				out = new BufferedOutputStream(response.getOutputStream());

				FileCopyUtils.copy(in, out);
				out.flush();

				in.close();
				out.close();
			} catch (IOException ex) {
				in.close();
				out.close();
			} finally {
				in.close();
				out.close();
			}

		} else {
			response.setContentType("application/x-msdownload");

			PrintWriter printwriter = response.getWriter();

			printwriter.println("<html>");
			printwriter.println("<br><br><br><h2>Could not get file name:<br>" + files.getOrignlFileNm() + "</h2>");
			printwriter.println("<br><br><br><center><h3><a href='javascript: history.go(-1)'>Back</a></h3></center>");
			printwriter.println("<br><br><br>&copy; webAccess");
			printwriter.println("</html>");

			printwriter.flush();
			printwriter.close();
		}
	}
 
	@Override
	public EgovMapForNull findFile(FileAtch files) throws Exceptions {
		try {
			
			EgovMapForNull paramMap = new EgovMapForNull();

			paramMap.put("atchFileId", files.getAtchFileId());
			
			return fileUpdownMapper.selectFileInfo(paramMap);
			
		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public List<EgovMapForNull> findFiles(EgovMapForNull paramMap) throws Exceptions {
		try {
			
			String atchFiles = StringExpression.nullConvert(paramMap.get("atchFiles"));
			if(!StringExpression.isEmpty(atchFiles)) {
				
				String[] atchFileIdArr = atchFiles.split("\\|");
				
				
				paramMap.put("atchFileIdArr", atchFileIdArr);
				
				Debug.showMe(paramMap);
				
				return fileUpdownMapper.selectFileInfos(paramMap);
				
			} else {
				
				return new ArrayList<EgovMapForNull>();				
			}
			
			
		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
}
