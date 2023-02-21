package kr.co.dbvision.lib;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

public class EgovPage {
    
    public static void initPaging(PaginationInfo paginationInfo, int pageIndex, int pageUnit, int pageSize, EgovMapForNull egovMap){
        
        paginationInfo.setCurrentPageNo( pageIndex );     
        paginationInfo.setRecordCountPerPage( pageUnit );
        paginationInfo.setPageSize( pageSize );
        
        egovMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
        egovMap.put("lastIndex", paginationInfo.getLastRecordIndex()); 
    }
    
    public static void pagingInfo(PaginationInfo paginationInfo, int totalRecordCount, EgovMapForNull egovMap){
        
        paginationInfo.setTotalRecordCount( totalRecordCount );
        
        egovMap.put("currentPageNo", paginationInfo.getCurrentPageNo()); 
        egovMap.put("firstPageNo", paginationInfo.getFirstPageNo()); 
        egovMap.put("firstPageNoOnPageList", paginationInfo.getFirstPageNoOnPageList()); 
        egovMap.put("firstRecordIndex", paginationInfo.getFirstRecordIndex()); 
        egovMap.put("lastPageNo", paginationInfo.getLastPageNo()); 
        egovMap.put("lastPageNoOnPageList", paginationInfo.getLastPageNoOnPageList()); 
        egovMap.put("lastRecordIndex", paginationInfo.getLastRecordIndex()); 
        egovMap.put("pageSize", paginationInfo.getPageSize());         
        egovMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage()); 
        egovMap.put("totalPageCount", paginationInfo.getTotalPageCount()); 
        egovMap.put("totalRecordCount", paginationInfo.getTotalRecordCount()); 
  
    } 
}