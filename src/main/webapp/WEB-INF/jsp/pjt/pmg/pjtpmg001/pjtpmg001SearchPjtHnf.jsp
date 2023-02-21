<%@page contentType="text/html; charset=UTF-8"
    trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 인력 > 인력계획 탭 -->
 
<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtHnf.js"></script>


    <form id="searchFormPjtHfn">
        <input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
    </form>
    
        <div class="project_tab_div">
            <ul class="project_tab">
                <li class="active">인력계획</li>
                <li class="" id="hnfMonth">인력실적(월별)</li>
                <li class="" id="hnfPlanAcmslt">인력계획 대비 실적</li>
            </ul>
        </div>
        
        <div class="div_title" style="margin-top:0;">
               <!-- 타이틀영역(좌측) -->
               <div class="left">
                   <span class="table_sumnum" id="spanCnt">0</span>
               </div>
               <!-- 타이틀영역(우측) -->
               <div class="right">
                   <div class="right ml7">
                  		<button class="div_title_btn" type="button" id="btnHnfPlanAdd">행추가</button>
                          <button class="div_title_btn" id="btnHnfPlanRemove" type="button">행삭제</button>
                          <button class="div_title_btn" id="btnHnfPlanSave" type="button">저장</button>
                   </div>
               </div>
           </div>
        
        <div class="mt5 outer_line_grid pjthnf_tab" style="height:calc(100vh - 80px);">
		    <div class="dhtml_line">
		        <div id="dataList" class="dhtml_grid">
		        
		        </div>
		    </div>
		</div>

   
</body>
