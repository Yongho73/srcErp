<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab7Acdmcr.js"></script>

    <form id="saveFormEmp_Tab7_Acdmcr">
   		 <input type="hidden" name="empno" id="empno" value="${empno}" />
    	 <input type="hidden" name="bplcCode" id="bplcCode" value="${bplcCode}" />
         <input type="hidden" name="sortDirection"/>
         <input type="hidden" name="sortColumId"/>
         <input type="hidden" name="selectedPageNum"/>       
   
   
   		         		 <div class="list_top">
			                   <span class="view ">
			                       <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanMhsEmpAcdmcrCnt"></span>
			                       <taglibs:transText progrmId="default" key="titSearchCnt" />
			                   </span>
			        		<div style="float: right;" class="mb5">
			        			<button class="btn_common01_new" id="btnAdd_Tab7" type="button"><taglibs:transText progrmId="default" key="행추가" />행추가</button>
			        			<button class="btn_common01_new" id="btnRemove_Tab7" type="button"><taglibs:transText progrmId="default" key="행삭제" />행삭제</button>
			        			<button class="btn_common01_new" id="btnSave_Tab7" type="button"><taglibs:transText progrmId="default" key="저장" />저장</button>
								<button class="btn_common01_new" id="btnInit_Tab7" type="button"><taglibs:transText progrmId="default" key="btnInit" /></button>
							</div>
			             </div> 
		         		 <div>
		                 	<div id="MhsEmpAcdmcrDataList" style="width: 1155px; height: 390px"></div>
		               	 </div>
    </form>
</body>