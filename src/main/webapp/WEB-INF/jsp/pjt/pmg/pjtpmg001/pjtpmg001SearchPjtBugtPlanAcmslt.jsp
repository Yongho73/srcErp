<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 예산 > 예산계획 대비 실적 탭 -->

<body>

	<script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtBugtPlanAcmslt.js"></script>

	<form id="searchFormPjtHfn">
		<input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
        <input type="hidden" name="basisDtList" id="basisDtList" />
        <input type="hidden" name="columnList" id="columnList" />
	</form>
	
    <div class="project_tab_div">
        <ul class="project_tab">
            <li class="" id="bugtPlan">예산계획</li>
            <li class="" id="bugtAcmslt">예산실적(월별)</li>
            <li class="active">예산계획 대비 실적</li>
        </ul>
    </div>
    
    <div class="div_title">
         <!-- 타이틀영역(좌측) -->
         <div class="left">
             <span class="table_sumnum" id="spanCnt">0</span>
         </div>
         <!-- 타이틀영역(우측) -->
         <div class="right">
             <div class="right ml7">
            		<span class="title_right">(단위 : 원, 부가세별도)</span>
             </div>
         </div>
     </div>
           
       <div class="mt5 outer_line_2dangrid" style="height:calc(100vh - 44vh) !important;">
		    <div class="dhtml_line">
		        <div id="dataList" class="dhtml_grid">
		        
		        </div>
		    </div>
		</div>
		
		
	<div class="div_title">
         <div class="left">
             <span class="title_left" id="bugtTitle"> </span>
             <span class="table_sumnum" id="spanCnt">0</span>
         </div>
         <div class="right">
             <div class="right ml7">
            		<span>※ 상세 내용을 보시려면 상단 그리드 셀을 클릭해 주세요.</span>
             </div>
         </div>
     </div>

		<div class="mt5 outer_line_2dangrid" style="height:calc(44vh - 129px) !important;">
		    <div class="dhtml_line">
		        <div id="bugtList" class="dhtml_grid">
		        
		        </div>
		    </div>
		</div>

</body>
