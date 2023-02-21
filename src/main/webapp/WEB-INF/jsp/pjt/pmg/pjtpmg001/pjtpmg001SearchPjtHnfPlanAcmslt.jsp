<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 인력 > 인력계획 대비 실적 탭 -->

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtHnfPlanAcmslt.js"></script>

    <form id="searchFormPjtHfn">
        <input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
    </form>

 		<div class="project_tab_div">
            <ul class="project_tab">
                <li class="" id="hnfPlan">인력계획</li>
	            <li class="" id="hnfMonth">인력실적(월별)</li>
	            <li class="active">인력계획 대비 실적</li>
            </ul>
        </div>
        
        <div class="div_title" style="margin-top:0;">
               <div class="left">
               </div>
               <!-- 타이틀영역(우측) -->
               <div class="right">
                   <span id="spanBasisDt"></span>
               </div>
           </div>
        
        <div class="outer_line_grid" style="height:calc(100vh - 75px);">
		    <div class="dhtml_line">
		        <div id="dataList" class="dhtml_grid">
		        
		        </div>
		    </div>
		</div>
		
		<div id="hnfAddDiv" style="display:none">
              <div class="div_title">
                  <div class="left">
                      <span class="s_tit"><i class="axi axi-chevron-right"></i>계획대비 추가 투입등급</span>
                  </div>
                  <div class="right">
                      <span id="spanBasisDt2"></span>
                  </div>
              </div>
              <div class="outer_line_grid">
              	<div class="dhtml_line" style="height:calc(56vh - 120px) !important;">
              		<div class="dhtml_grid" id="dataHnfList">
              		</div>
              	</div>
              </div>
          </div>

</body>