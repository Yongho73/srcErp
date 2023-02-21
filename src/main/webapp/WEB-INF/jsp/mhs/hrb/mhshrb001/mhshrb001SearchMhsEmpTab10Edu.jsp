<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab10Edu.js"></script>

		         		 <div class="list_top">
			                   <span class="view ">
			                       <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanMhsEmpEduCnt"></span>
			                       <taglibs:transText progrmId="default" key="titSearchCnt" />
			                   </span>
			             </div> 
					     <form id="saveFormEmp_Tab10_Edu">
					   		<input type="hidden" name="empno" id="empno" value="${empno}" />
					 	 </form>
		         		 <div>
		                 	<div id="MhsEmpEduDataList" style="width: 1155px; height: 410px"></div>
		               	 </div>
</body>