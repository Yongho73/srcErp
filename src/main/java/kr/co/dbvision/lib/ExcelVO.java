package kr.co.dbvision.lib;

public class ExcelVO {
	
	private String headers[];
	private String dataIds[];
	private String dataAligns[];
	private String sheetNms[];
	private String fileNm;
	private String params[];
 
	public ExcelVO() {}

	public String[] getHeaders() {
		return headers;
	}

	public void setHeaders(String[] headers) {
		this.headers = headers;
	}

	public String[] getDataIds() {
		return dataIds;
	}

	public void setDataIds(String[] dataIds) {
		this.dataIds = dataIds;
	}

	public String[] getDataAligns() {
		return dataAligns;
	}

	public void setDataAligns(String[] dataAligns) {
		this.dataAligns = dataAligns;
	}

	public String[] getSheetNms() {
		return sheetNms;
	}

	public void setSheetNms(String[] sheetNms) {
		this.sheetNms = sheetNms;
	}

	public String getFileNm() {
		return fileNm;
	}

	public void setFileNm(String fileNm) {
		this.fileNm = fileNm;
	}

	public String[] getParams() {
		return params;
	}

	public void setParams(String[] params) {
		this.params = params;
	}
}
