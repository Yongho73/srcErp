package kr.co.dbvision.api.pjt.mta.pjtmta003.service.impl.PdfGemerate.template;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;

import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFile;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliers;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.co.dbvision.api.pjt.mta.pjtmta003.service.mapper.PdfGeneraterMapper;
import kr.co.dbvision.lib.DateExpression;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.GlobalProperties;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;
import kr.co.dbvision.lib.ui.cmm.file.service.mapper.FileUpdownMapper;

/**
 * @author hagyoung
 * @version 1.0
 * @created 02-2-2021 1:56:42
 */
@SuppressWarnings("unchecked")
public class MounthReport {
	public static FileAtch fileAtch;

	public MounthReport( EgovMap mapper, EgovIdGnrService egovIdGnrService, EgovMapForNull paramMap ) throws Exception {
 		
		FileUpdownMapper fsvMapper = (FileUpdownMapper) mapper.get("fsvMapper");
		PdfGeneraterMapper pdfMapper = (PdfGeneraterMapper) mapper.get("pdfMapper");
	
		try {
			
			Document document = new Document(PageSize.A4, 40, 40, 40, 40); 
			
			// pdf 생성 파일
			String pdfSavePath = GlobalProperties.getProperty("Globals.fileStorePath") + File.separator + "DBV_" + getTimeStamp() +"1.pdf";
			File filePath = new File(pdfSavePath);
			
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(filePath));
			writer.setInitialLeading(12.5f);
			document.open();
			XMLWorkerHelper helper = XMLWorkerHelper.getInstance();
			CSSResolver cssResolver = new StyleAttrCSSResolver();
			CssFile cssFile = helper.getCSS(new FileInputStream( GlobalProperties.getProperty("Globals.pdfCssPath")+"/pdf.css" ));
			cssResolver.addCss(cssFile);
			XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
			
			fontProvider.register(GlobalProperties.getProperty("Globals.pdfFontPath")+"/NanumGothic.ttf", "NanumGothic"); 
			
			CssAppliers cssAppliers = new CssAppliersImpl(fontProvider);
			HtmlPipelineContext htmlContext = new HtmlPipelineContext(cssAppliers);
			htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());
			PdfWriterPipeline pdf = new PdfWriterPipeline(document, writer);
			HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
			CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);
			XMLWorker worker = new XMLWorker(css, true);
			XMLParser xmlParser = new XMLParser(worker, Charset.forName("UTF-8"));
			
			PdfContentByte canvas = writer.getDirectContent();
			//이미지 생성
			Image img = Image.getInstance(GlobalProperties.getProperty("Globals.pdfImgPath")+"/logo.png");
			img.setAbsolutePosition(242, 80);
	        img.scalePercent(75);
            canvas.addImage(img);

			// 보고서 생성
			StringReader strReader = new StringReader(coverPage(pdfMapper, paramMap));
			xmlParser.parse(strReader);
			// 페이지 나누고
			document.newPage(); 
			StringReader strReader2 = new StringReader(contentsPage(pdfMapper, paramMap));
			xmlParser.parse(strReader2);
			// pdf 생성 완료
			document.close();
			writer.close();
			
			EgovMapForNull projectInfo = pdfMapper.selectProjectInfo(paramMap);
			FileAtch fileAtch = registerFileInfs(fsvMapper, egovIdGnrService, filePath, projectInfo);
			
 			this.fileAtch = fileAtch;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public FileAtch registerFileInfs(FileUpdownMapper fsvMapper, EgovIdGnrService egovIdGnrService, File file, EgovMapForNull projectInfo) throws Exceptions {
		
		try {

			Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
			String userId = StringExpression.nullConvert(sessionMap.get("userId"));	
			String[] reportYm =  String.valueOf(projectInfo.get("reportYm")).split("-");
			
			FileAtch files = new FileAtch();
			files.setFileExtsn("pdf");
			files.setFileStreCours(GlobalProperties.getProperty("Globals.fileStorePath"));
			files.setFileMg(Long.toString(file.length()));
			files.setOrignlFileNm(projectInfo.get("pdfNm")+"_월간보고("+projectInfo.get("reportYm")+").pdf");
			files.setStreFileNm(file.getName());
			files.setAtchFileId(egovIdGnrService.getNextStringId());				

			EgovMapForNull paramMap = new EgovMapForNull();
			paramMap.put("fileExtsn", files.getFileExtsn());
			paramMap.put("fileStreCours", files.getFileStreCours());
			paramMap.put("fileMg", files.getFileMg());
			paramMap.put("orignlFileNm", files.getOrignlFileNm());
			paramMap.put("streFileNm", files.getStreFileNm());
			paramMap.put("atchFileId", files.getAtchFileId());
			paramMap.put("regId", userId);
			paramMap.put("uptId", userId);
				
			fsvMapper.insertFileInfo(paramMap);

			return files;
			 
		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	
	private String getTimeStamp() {		 
		return DateExpression.getCurrentDate("yyyyMMddhhmmssSSS");
	}
	
	//표지
	public String coverPage(PdfGeneraterMapper mapper, EgovMapForNull paramMap) throws IOException {
		
		StringBuffer sb = new StringBuffer();
		EgovMapForNull projectInfo = mapper.selectProjectInfo(paramMap);
		String[] reportYm =  String.valueOf(projectInfo.get("reportYm")).split("-");
		String[] reportStrDt =  String.valueOf(projectInfo.get("reportStrDt")).split("-");
		String[] reportEndDt =  String.valueOf(projectInfo.get("reportEndDt")).split("-");
		String[] writeDt =  String.valueOf(projectInfo.get("writeDt")).split("-");
		
		sb.append("<html>");
		sb.append("<head>");
		sb.append("</head>");
		sb.append("<body border='0' style='font-family: NanumGothic;' align='center'>");		
		sb.append("<div style='height:80px;'></div>");
		sb.append("<p style='font-size : 25px; text-align:center; font-weight: bold;'>"+projectInfo.get("projectNm")+"</p><div height='13px'></div>");
		sb.append("<p style='font-size : 23px; text-align:center; font-weight: bold;'>("+reportYm[0]+"년 "+reportYm[1]+"월 유지보수 요청 결과 보고)</p>");
		sb.append("</body>");
		sb.append("</html>");
		
		return sb.toString();
	}
	
	public String contentsPage(PdfGeneraterMapper mapper, EgovMapForNull paramMap) {
		EgovMapForNull projectInfo = mapper.selectProjectInfo(paramMap);
		String[] reportYm =  String.valueOf(projectInfo.get("reportYm")).split("-");
		String[] reportStrDt =  String.valueOf(projectInfo.get("reportStrDt")).split("-");
		String[] reportEndDt =  String.valueOf(projectInfo.get("reportEndDt")).split("-");
		String[] writeDt =  String.valueOf(projectInfo.get("writeDt")).split("-");
		
		StringBuffer mainContents = new StringBuffer();
		mainContents.append("<html>");
		mainContents.append("<head>");
		mainContents.append("</head>");
		mainContents.append("<body>");
		
		//작성 정보
		mainContents.append("<table width='680px' align= 'center'>");
		mainContents.append("<tr>");
		mainContents.append("<td rowspan='3' style='width:230px;' class='title'>"+reportYm[1]+"월 결과보고</td>");
		mainContents.append("<td style='width:80px;' class='title2'>고 객 사</td>");
		mainContents.append("<td colspan='3'  class='contents1'>"+projectInfo.get("bcncNm")+"</td>");
		mainContents.append("</tr>");
		mainContents.append("<tr>");
		mainContents.append("<td style='width:80px;' class='title2'>프로젝트</td>");
		mainContents.append("<td colspan='3' class='contents1'>"+projectInfo.get("projectNm")+"</td>");
		mainContents.append("</tr>");
		mainContents.append("<tr>");
		mainContents.append("<td style='width:80px;' class='title2'>작 성 자</td>");
		mainContents.append("<td style='width:145px;' class='contents1'>"+projectInfo.get("writerNm")+"</td>");
		mainContents.append("<td style='width:80px;' class='title2'>작 성 일</td>");
		mainContents.append("<td class='contents1'>");
		mainContents.append(writeDt[0]+"년 "+writeDt[1]+"월 "+writeDt[2]+"일"	);
		mainContents.append("</td>");
		mainContents.append("</tr>");
		mainContents.append("</table>");
		mainContents.append("<div height='20px'></div>");
				
		//당초계획
		mainContents.append("<table width='680px' align='center' cellpadding='8' cellspacing='0'>");
		mainContents.append("<tbody>");
		mainContents.append("<tr>");
		mainContents.append("<td style='width:150px;' class='title2'>당 초 계 획</td>");
		mainContents.append("<td class='title2'>");
		mainContents.append(reportStrDt[0]+"년 "+reportStrDt[1]+"월 "+reportStrDt[2]+"일 ~ "+reportEndDt[0]+"년 "+reportEndDt[1]+"월 "+reportEndDt[2]+"일");
		mainContents.append("</td>");
		mainContents.append("</tr>");
		mainContents.append("<tr>");
		mainContents.append("<td colspan='2' class='contents'>"+projectInfo.get("nowMtReport")+"</td>");
		mainContents.append("</tr>");
		mainContents.append("</tbody>");
		mainContents.append("</table>");
		mainContents.append("<div height='20px'></div>");
		
		//유지보수 내용 타이틀
		mainContents.append("<table width='680px' align='center' cellpadding='8' cellspacing='0'>");
		mainContents.append("<tbody>");
		mainContents.append("<tr>");
		mainContents.append("<td height='20' colspan='3' class='title2'>");
		mainContents.append(reportStrDt[0]+"년 "+reportStrDt[1]+"월 "+reportStrDt[2]+"일 ~ "+reportEndDt[0]+"년 "+reportEndDt[1]+"월 "+reportEndDt[2]+"일");
		mainContents.append("</td>");
		mainContents.append("</tr>");
		mainContents.append("<tr>");
		mainContents.append("<td style='width:150px;' rowspan='2' class='title2'>메뉴</td>");
		mainContents.append("<td height='20' class='title2'>요청내용</td>");
		mainContents.append("<td height='20' width='100' class='title2'>접수일자</td>");
		mainContents.append("</tr>");
		mainContents.append("<tr>");
		mainContents.append("<td height='20' class='title2'>처리내용</td>");
		mainContents.append("<td height='20' width='100' class='title2'>처리일자</td>");
		mainContents.append("</tr>");
		
		//유지보수 내용 
		List<EgovMapForNull> requstList = mapper.selectRequstList(paramMap);
		/*
		 * for-each문 사용 시 순서가 뒤바뀌어 출력되는 문제 발생
		 * for문을 사용해야 sql에서 불러온 순서대로 출력됨
		 */
		for(int i=0;i<requstList.size();i++) {
			EgovMapForNull data = requstList.get(i);
			
			mainContents.append("<tr>");
			mainContents.append("<td style='width:150px;' rowspan='2' class='contents'>"+data.get("requstMenu")+"</td>");
			mainContents.append("<td class='contents'>"+data.get("requstCn")+"</td>");
			mainContents.append("<td class='date'>"+data.get("requstDt")+"</td>");
			mainContents.append("</tr>");
			mainContents.append("<tr>");
			mainContents.append("<td class='contents'>"+data.get("opertCn")+"</td>");
			mainContents.append("<td width='100' class='date'>"+data.get("comptDe")+"</td>");
			mainContents.append("</tr>");
		}
		mainContents.append("</tbody>");
		mainContents.append("</table>");
		mainContents.append("<div height='20px'></div>");
		
		//차월계획
		mainContents.append("<table width='680px' align='center' cellpadding='8' cellspacing='0'>");
		mainContents.append("<tbody>");
		mainContents.append("<tr>");
		mainContents.append("<td height='20'  class='title2'>차 월 계 획</td>");
		mainContents.append("</tr>");
		mainContents.append("<tr>");
		mainContents.append("<td class='contents'>"+projectInfo.get("nextMtReport")+"</td>");
		mainContents.append("</tr>");
		mainContents.append("</tbody>");
		mainContents.append("</table>");
		mainContents.append("<div height='20px'></div>");
		
		//미결업무 및 대책
		mainContents.append("<table width='680px' align='center' cellpadding='8' cellspacing='0'>");
		mainContents.append("<tbody>");
		mainContents.append("<tr>");
		mainContents.append("<td height='20'  class='title2'>미 결 업 무 &nbsp;및 &nbsp;대 책</td>");
		mainContents.append("</tr>");
		mainContents.append("<tr>");
		mainContents.append("<td class='contents'>"+projectInfo.get("nonsolutDesc")+"</td>");
		mainContents.append("</tr>");
		mainContents.append("</tbody>");
		mainContents.append("</table>");
		mainContents.append("<div height='20px'></div>");
		
		//이슈사항
		mainContents.append("<table width='680px' align='center' cellpadding='8' cellspacing='0'>");
		mainContents.append("<tbody>");
		mainContents.append("<tr>");
		mainContents.append("<td height='20'  class='title2'>이 슈 사 항</td>");
		mainContents.append("</tr>");
		mainContents.append("<tr>");
		mainContents.append("<td class='contents'>"+projectInfo.get("issueDesc")+"</td>");
		mainContents.append("</tr>");
		mainContents.append("</tbody>");
		mainContents.append("</table>");
		mainContents.append("<div height='20px'></div>");
		
		mainContents.append("</body></html>");

		return mainContents.toString();
	}
	
	
}