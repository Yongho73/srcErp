package kr.co.dbvision.api.pjt.mta.pjtmta003.service.impl.PdfGemerate.builder;

/**
 * @author hagyoung
 * @version 1.0
 * @created 02-2-2021 1:56:42
 */
public class PdfDirector {

	private PdfBuilder m_PdfBuilder;

	public PdfDirector(PdfBuilder pdfBuilder) {
		this.m_PdfBuilder = pdfBuilder;
	}

	public boolean construct() {
		return this.m_PdfBuilder.buildReport();
	}
}