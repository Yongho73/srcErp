<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

<script src="${pageContext.request.contextPath}/js/xerp/mps/mng/mpsmng001/mpsmng001SearchMpsSalaryCd.js"></script>
<style>
.txtDate {width:80px;}
</style>
<!-- 사용자관리 -->
<div id="sub_container">
	<div class="sub_content" id="sub_content">
		<form id="paramForm" name="paramForm">
			<input type="hidden" name="userId" value="${userId}">
			<input type="hidden" name="userNm" value="${userNm}">
			<input type="hidden" name="useAt" value="${useAt}">
			<input type="hidden" name="sortOrder" value="${sortOrder}">
			<input type="hidden" name="sortId" value="${sortId}">
			<input type="hidden" name="listPageIndex" value="${listPageIndex}">
			<input type="hidden" name="salaryCd">
			<input type="hidden" name="salaryNm">
		</form>

		<div class="search_wrap">
			<div class="search_box w93p" id="searchForm" name="searchForm">
				<ul>
					<li>
						<label for="sch_userId" class="label">기간</label>	
						<input type="text" name="searchSregDt" id="searchSregDt" title="시작일"  class="txtDate"><a href="#"><img id="startDateIcon" class="imgCalendar" title="달력" /></a>~
						<input type="text" name="searchEregDt" id="searchEregDt" title="종료일"  class="txtDate"><a href="#"><img id="endDateIcon" class="imgCalendar" title="달력" /></a>			
					</li>	
					<li>
						<label for="sch_salaryCd" class="label">급여항목코드</label>
		              	<input type="text" name="salaryCd" id="salaryCd"   class="w6r mr10">
		              
		              	<label for="sch_salaryNm" class="label">급여항목명</label>
		              	<input type="text" name="salaryNm" id="salaryNm" class="w6r mr10">
		              	<label for="sch_userNm" class="mr3">사용여부</label>
	              	</li>
	              	<li>
		              	<div class="switch-field mt-8 mb-8">
			                <input type="radio"  id="switch_3_left" name="useYn" value="" checked/>
			                <label  for="switch_3_left">전체</label>
			                <input type="radio" id="switch_3_center" name="useYn" value="Y">
			                <label for="switch_3_center">사용</label>
			                <input type="radio"  id="switch_3_right" name="useYn" value="N">
			                <label for="switch_3_right">미사용</label>
				        </div>
		            </li>
		            <li>
		            	<label for="sch_salaryNm" class="label">지급/공제구분</label>
		            </li>
		            <li> 
		            	<div class="mt-8 mb-8" id="divPaymentddtClsComboBox"></div>
		            </li>
		            <li>
		              	<label for="sch_userNm" class="mr3">예산배정대상여부</label>
		            </li>
		         </ul>
			</div>  
			<!-- search_box -->
	        <div class="btn-oneline mb-8">
				<button type="button" id="btnSearch"><span class="glyphicon glyphicon-search f15 mr5"></span>조회</button>
	        </div>
		</div>
		
		<!--//search_wrap-->
		<h4 class="title02 mt10"><span class="glyphicon glyphicon-chevron-right mr5"></span>급여항목 목록</h4>
		<span class="fr pt10">				
			<button type="button" class="btn_in_grid" id="btnSave" name="btnSave"><span class="glyphicon glyphicon-new-window mr5"><!-- 팝업일때 --></span>급여항목 코드등록</button>
	    	<button type="button" class="btn_in_grid dell" id="btnRemove" name="btnRemove"><span class="glyphicon glyphicon-trash mr5"></span>삭제</button>
	    	<button type="button" class="btn_in_grid" id="btnExcel" name="btnExcel"><span class="excel mr5"></span>다운로드</button>
		</span>
	    <div class="w100p h530 pst-r-dp-blk">
			<div id="dataList" class="w100p h100p"></div>				
		</div>
	</div>
</div>
</body>
