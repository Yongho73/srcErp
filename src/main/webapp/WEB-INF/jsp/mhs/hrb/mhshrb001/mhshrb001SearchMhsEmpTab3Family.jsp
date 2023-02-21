<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab3Family.js"></script>

		         		 <div class="list_top">
			                   <span class="view ">
			                       <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanMhsEmpFamilyCnt"></span>
			                       <taglibs:transText progrmId="default" key="titSearchCnt" />
			                   </span>
			        		<div style="float: right;" class="mb5">
			        			<button class="btn_common01_new" id="btnAdd_Tab3" type="button"><taglibs:transText progrmId="default" key="행추가" />행추가</button>
			        			<button class="btn_common01_new" id="btnRemove_Tab3" type="button"><taglibs:transText progrmId="default" key="행삭제" />행삭제</button>
			        			<button class="btn_common01_new" id="btnSave_Tab3" type="button"><taglibs:transText progrmId="default" key="저장" />저장</button>
								<button class="btn_common01_new" id="btnInit_Tab3" type="button"><taglibs:transText progrmId="default" key="btnInit" /></button>
							</div>
			             </div> 
					     <form id="saveFormEmp_Tab3_Family">
					   		<input type="hidden" name="empno" id="empno" value="${empno}" />
					   		<input type="hidden" name="bplcCode" id="bplcCode" value="${bplcCode}" />
					 	 </form>
		         		 <div>
		                 	<div id="MhsEmpFamilyDataList" style="width: 1155px; height: 410px"></div>
		               	 </div>
</body>