package kr.co.dbvision.api.pjt.mta.pjtmta003.service.impl.PdfGemerate.builder;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.co.dbvision.api.pjt.mta.pjtmta003.service.impl.PdfGemerate.template.MounthReport;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;

/**
 * @author hagyoung
 * @version 1.0
 * @created 02-2-2021 1:56:42
 */
public class PdfTemplate extends PdfBuilder {
	
	private MounthReport mounthReport;
	private EgovMap mapper;
	private EgovIdGnrService egovIdGnrService;
	private EgovMapForNull paramMap;
 
	public PdfTemplate() {
		
	}

	public PdfTemplate(EgovMap mapper, EgovIdGnrService egovIdGnrService, EgovMapForNull paramMap) {
		this.mapper = mapper;
		this.egovIdGnrService = egovIdGnrService;
		this.paramMap = paramMap;
		
	}

	public FileAtch getReport() throws Exceptions, IOException {

		return mounthReport.fileAtch;
	}

	@Override
	public boolean buildReport() {
		Boolean check = false;
		try {
			mounthReport = new MounthReport(mapper, egovIdGnrService, paramMap);
			if(mounthReport != null) {
				check = true;
			} else {
				check = false;
			};
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return check;
	}

}