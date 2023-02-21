<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 예산 > 인력실적(월별) 탭 -->

<body>

	<script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtBugtAcmslt.js"></script>

	<form id="searchFormPjtBugt">
		<input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
	</form>
    
    <div style="min-height:50vh;height:100%;">
 
	  <div class="path_div" style="padding-left:0;">
	  
	       <div class="project_tab_div">
	           <ul class="project_tab">
	               <li class="" id="bugtPlan">예산계획</li>
	               <li class="active">예산실적(월별)</li>
	               <li class="" id="bugtPlanAcmslt">예산계획 대비 실적</li>
	           </ul>
	       </div>
       </div>
		    
	   <div class="consearch_div">
	    <div class="consearch_input">
	        <form id="searchFormStmUsers">
	            <ul class="consearchinput_list">
	                <li><span class="span">계정과목</span>
	                <div id="divComboPrmpcTy" class="div_combo"></div></li>
	            </ul>
	        </form>
	    </div>
	    <div class="consearchbt_div">
	        <ul class="consearchbt_list">
	            <li><a href="#none" id="btnSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
	            <li><a href="#none" id="btnInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
	        </ul>
	    </div>
	</div>



    <div class="div_title">
        <div class="left">
            <span class="title_left">예산실적</span>
            <span class="table_sumnum" id="spanCnt">0</span>
        </div>
        <div class="right">
            <div class="right ml7">
                <button class="div_title_btn" type="button" id="btnBugtAdd">행추가</button>
                <button class="div_title_btn" id="btnBugtRemove" type="button">행삭제</button>
                <button class="div_title_btn" id="btnBugtSave" type="button">저장</button>
            </div>
        </div>
    </div>

    <div class="mt5 outer_line_grid" style="height:calc(100vh - 124px);">
        <div class="dhtml_line">
            <div id="bugtList" class="dhtml_grid">
            </div>
        </div>
    </div>

</div>

</body>