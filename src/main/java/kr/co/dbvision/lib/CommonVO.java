package kr.co.dbvision.lib;

import java.sql.Timestamp;

public class CommonVO {
	
	private String rnum;
	private String mode;

	private String sRegDt;
	private String eRegDt;

	private String regDt;
	private String regId;
	private String uptDt;
	private String uptId;
	private String regNm;
	private String uptNm;
	
	private String sortOrder;
	private String sortId;

	private String listPageIndex;
	private int firstIndex;
	private int lastIndex;
	private int totalPageCount;
	private int firstPageNo;
	private int lastPageNo;
	private int currentPageNo;
	private int pageSize;
	private int firstPageNoOnPageList;
	private int firstRecordIndex;
	private int lastPageNoOnPageList;
	private int lastRecordIndex;
	private int recordCountPerPage;
	private int totalRecordCount;
	
	private String arg;
	
	public CommonVO() {}
	
	public CommonVO(EgovMapForNull egovMap) {
		if(egovMap != null) {

			setListPageIndex(StringExpression.nullConvert(egovMap.get("listPageIndex")));
			setRegId(StringExpression.nullConvert(egovMap.get("regId")));
			setUptId(StringExpression.nullConvert(egovMap.get("uptId")));
			setRegNm(StringExpression.nullConvert(egovMap.get("regNm")));
			setUptNm(StringExpression.nullConvert(egovMap.get("uptNm")));
			
			if (!StringExpression.nullConvert(egovMap.get("regDt")).equals("")) {
				setRegDt(DateExpression.dateTimeToString((Timestamp) egovMap.get("regDt"), "yyyy.MM.dd HH:mm"));
			}
			if (!StringExpression.nullConvert(egovMap.get("uptDt")).equals("")) {
				setUptDt(DateExpression.dateTimeToString((Timestamp) egovMap.get("uptDt"), "yyyy.MM.dd HH:mm"));
			}
			
			setCurrentPageNo(Integer.parseInt(StringExpression.nullConvert(egovMap.get("currentPageNo"), "0")));
	        setFirstPageNo(Integer.parseInt(StringExpression.nullConvert(egovMap.get("firstPageNo"), "0")));
	        setFirstPageNoOnPageList(Integer.parseInt(StringExpression.nullConvert(egovMap.get("firstPageNoOnPageList"), "0")));
	        setFirstRecordIndex(Integer.parseInt(StringExpression.nullConvert(egovMap.get("firstRecordIndex"), "0")));
	        setLastPageNo(Integer.parseInt(StringExpression.nullConvert(egovMap.get("lastPageNo"), "0")));
	        setLastPageNoOnPageList(Integer.parseInt(StringExpression.nullConvert(egovMap.get("lastPageNoOnPageList"), "0")));
	        setLastRecordIndex(Integer.parseInt(StringExpression.nullConvert(egovMap.get("lastRecordIndex"), "0")));
	        setPageSize(Integer.parseInt(StringExpression.nullConvert(egovMap.get("pageSize"), "0")));
	        setRecordCountPerPage(Integer.parseInt(StringExpression.nullConvert(egovMap.get("recordCountPerPage"), "0")));
	        setTotalPageCount(Integer.parseInt(StringExpression.nullConvert(egovMap.get("totalPageCount"), "0")));
	        setTotalRecordCount(Integer.parseInt(StringExpression.nullConvert(egovMap.get("totalRecordCount"), "0")));

		}
	}
	
	/*
	public void setInitPaging(PaginationInfo paginationInfo) {
		
		int pageIndex = Integer.parseInt(StringExpression.nullConvert(this.getListPageIndex(), "1"));
		int pageUnit = this.getRecordCountPerPage() == 0 ? 5 : this.getRecordCountPerPage();
		int pageSize = this.getPageSize() == 0 ? 10 : this.getPageSize();

		paginationInfo.setCurrentPageNo(pageIndex);
		paginationInfo.setRecordCountPerPage(pageUnit);
		paginationInfo.setPageSize(pageSize);

		this.setFirstIndex(paginationInfo.getFirstRecordIndex());
		this.setLastIndex(paginationInfo.getLastRecordIndex());
	}
	
	public void setPagingInfo(PaginationInfo paginationInfo, int totalRecordCount) {

		paginationInfo.setTotalRecordCount(totalRecordCount);

		this.setCurrentPageNo(paginationInfo.getCurrentPageNo());
		this.setFirstPageNo(paginationInfo.getFirstPageNo());
		this.setFirstPageNoOnPageList(paginationInfo.getFirstPageNoOnPageList());
		this.setFirstRecordIndex(paginationInfo.getFirstRecordIndex());
		this.setLastPageNo(paginationInfo.getLastPageNo());
		this.setLastPageNoOnPageList(paginationInfo.getLastPageNoOnPageList());
		this.setLastRecordIndex(paginationInfo.getLastRecordIndex());
		this.setPageSize(paginationInfo.getPageSize());
		this.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		this.setTotalPageCount(paginationInfo.getTotalPageCount());
		this.setTotalRecordCount(paginationInfo.getTotalRecordCount());
	}
	*/
	
	public String getRnum() {
		return rnum;
	}

	public void setRnum(String rnum) {
		this.rnum = rnum;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getsRegDt() {
		return sRegDt;
	}

	public void setsRegDt(String sRegDt) {
		this.sRegDt = sRegDt;
	}

	public String geteRegDt() {
		return eRegDt;
	}

	public void seteRegDt(String eRegDt) {
		this.eRegDt = eRegDt;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public String getSortId() {
		return sortId;
	}

	public void setSortId(String sortId) {
		this.sortId = sortId;
	}

	public String getRegDt() {
		return regDt;
	}

	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}

	public String getRegId() {
		return regId;
	}

	public void setRegId(String regId) {
		this.regId = regId;
	}

	public String getUptDt() {
		return uptDt;
	}

	public void setUptDt(String uptDt) {
		this.uptDt = uptDt;
	}

	public String getUptId() {
		return uptId;
	}

	public void setUptId(String uptId) {
		this.uptId = uptId;
	}

	public String getRegNm() {
		return regNm;
	}

	public void setRegNm(String regNm) {
		this.regNm = regNm;
	}

	public String getUptNm() {
		return uptNm;
	}

	public void setUptNm(String uptNm) {
		this.uptNm = uptNm;
	}

	public String getListPageIndex() {
		return listPageIndex;
	}

	public void setListPageIndex(String listPageIndex) {
		this.listPageIndex = listPageIndex;
	}

	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getTotalPageCount() {
		return totalPageCount;
	}

	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}

	public int getFirstPageNo() {
		return firstPageNo;
	}

	public void setFirstPageNo(int firstPageNo) {
		this.firstPageNo = firstPageNo;
	}

	public int getLastPageNo() {
		return lastPageNo;
	}

	public void setLastPageNo(int lastPageNo) {
		this.lastPageNo = lastPageNo;
	}

	public int getCurrentPageNo() {
		return currentPageNo;
	}

	public void setCurrentPageNo(int currentPageNo) {
		this.currentPageNo = currentPageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getFirstPageNoOnPageList() {
		return firstPageNoOnPageList;
	}

	public void setFirstPageNoOnPageList(int firstPageNoOnPageList) {
		this.firstPageNoOnPageList = firstPageNoOnPageList;
	}

	public int getFirstRecordIndex() {
		return firstRecordIndex;
	}

	public void setFirstRecordIndex(int firstRecordIndex) {
		this.firstRecordIndex = firstRecordIndex;
	}

	public int getLastPageNoOnPageList() {
		return lastPageNoOnPageList;
	}

	public void setLastPageNoOnPageList(int lastPageNoOnPageList) {
		this.lastPageNoOnPageList = lastPageNoOnPageList;
	}

	public int getLastRecordIndex() {
		return lastRecordIndex;
	}

	public void setLastRecordIndex(int lastRecordIndex) {
		this.lastRecordIndex = lastRecordIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public int getTotalRecordCount() {
		return totalRecordCount;
	}

	public void setTotalRecordCount(int totalRecordCount) {
		this.totalRecordCount = totalRecordCount;
	}

	public String getArg() {
		return arg;
	}

	public void setArg(String arg) {
		this.arg = arg;
	}	
}
