<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab6Dscpl.js"></script>

		         		 <div class="list_top">
			                   <span class="view ">
			                       <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanMhsEmpDscplCnt"></span>
			                       <taglibs:transText progrmId="default" key="titSearchCnt" />
			                   </span>
			             </div> 
					     <form id="saveFormEmp_Tab6_Dscpl">
					   		<input type="hidden" name="empno" id="empno" value="${empno}" />
					 	 </form>
		         		 <div>
		                 	<div id="MhsEmpDscplDataList" style="width: 1155px; height: 410px"></div>
		               	 </div>
</body>