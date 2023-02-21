<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 산출물 > 개발산출물 탭 -->

<body>
    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtOutputs.js"></script>
    <script>
    var projectSn = '${projectSn}';
    </script>   
    
    <div style="min-height:50vh;">
    	<div class="project_tab_div">
             <ul class="project_tab">
                 <li class="active" id="tabProjectOutputs">개발 산출물</li>
                 <li class="" id="tabProjectManageOutputs">관리 산출물</li>
             </ul>
         </div> 
            
        <div class="div_title">
             <div class="left">
                 <span class="table_sumnum" id="spanCntPjtOutputs">0</span>
             </div>
             <div class="right">
                 <div class="right ml7">
                     <button class="btn_common01_new" type="button" id="dtnAddPjtOutputsPopup">산출물 추가</button>
                     <button class="btn_common01_new" type="button" id="dtnSavePjtOutputs">저장</button>
                     <button class="btn_common01_new" type="button" id="dtnRemovePjtOutputs">삭제</button>
                 </div>
             </div> 
         </div>
         
         <div class="mt5 outer_line_grid" style="height:calc(100vh - 90px);">
		    <div class="dhtml_line">
		        <div id="dataListPjtOutputs" class="dhtml_grid">
		        </div>
		    </div>
		</div>
                    
    </div>
</body>
