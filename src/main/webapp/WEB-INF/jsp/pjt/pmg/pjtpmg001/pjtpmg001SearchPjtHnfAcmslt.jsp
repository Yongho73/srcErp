<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 인력 > 인력실적(월별) 탭 -->

<body>
	<script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtHnfAcmslt.js"></script>




	<form id="searchFormPjtHfn">
		<input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
		<input type="hidden" name="basisDtList" id="basisDtList" />
		<input type="hidden" name="columnList" id="columnList" />
	</form>
	
	<div style="min-height:50vh;">
		
		<div class="path_div" style="padding-left:0;">
	        <div class="project_tab_div">
	            <ul class="project_tab">
	                    <li class="" id="hnfPlan">인력계획</li>
	                    <li class="active">인력실적(월별)</li>
	                    <li class="" id="hnfPlanAcmslt">인력계획 대비 실적</li>
	                </ul>
	        </div>
        </div>

		 <div class="consearch_div">
			    <div class="consearch_input" style="min-width:520px;">
			        <form id="searchFormHnfAcmslt">
			            <ul class="consearchinput_list">
			                <li><span class="span">실적기간</span>
                            <input type="text" name="searchSregDt" id="searchSregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" style="display:inline-block;">
                            <span > ~ &nbsp; </span>
                            <input type="text" name="searchEregDt" id="searchEregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" style="display:inline-block;">
                            <div id="date2_cal" style="position:absolute; top:25px; overflow: visible;"></div>
	                        </li>
	                        <li><span class="span">성명</span>
	                            <input name="prtcpntNm" id="prtcpntNm" type="text"/>
	                        </li>
			            </ul>
			        </form>
			    </div>
			    <div class="consearchbt_div">
			        <ul class="consearchbt_list">
			             <li><a href="#none" id="btnSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnClear"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
			        </ul>
			    </div>
			</div>


		   <div class="div_title">
		       <div class="left">
		           <span class="title_left">인력실적</span>
		           <span class="table_sumnum" id="spanCnt">0</span>
		       </div>
		       <div class="right">
		           <div class="right ml7">
		               <button class="div_title_btn" type="button" id="btnHnfPlanAdd">행추가</button>
		               <button class="div_title_btn" id="btnHnfPlanRemove" type="button">행삭제</button>
		               <button class="div_title_btn" id="btnHnfPlanSave" type="button">저장</button>
		               <button class="btn_common01_new" type="button" id="copyMonth">전월복사</button>
		               <button class="btn_common01_new" type="button" id="copyHnfPlan" style="display: none">인력계획에서 복사</button>
		           </div>
		       </div>
		   </div>
		
		   <div class="mt5 outer_line_grid" style="height:calc(100vh - 125px);">
		       <div class="dhtml_line">
		           <div id="acmsltList" class="dhtml_grid">
		           </div>
		       </div>
		   </div>
			
	</div>
</body>