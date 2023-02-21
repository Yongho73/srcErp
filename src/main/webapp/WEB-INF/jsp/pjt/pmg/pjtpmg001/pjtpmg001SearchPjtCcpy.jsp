<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 협력계약 탭 -->

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtCcpy.js"></script>
    <script>
    var projectSn = '${projectSn}';
    </script>  
     
     <form id="saveFormPjtCcpy"> 
         <input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
         <input type="hidden" name="ccpySn"/>    
     </form>
     
     
    <div class="div_title">
          <!-- 타이틀영역(좌측) -->
          <div class="left">
              <span class="table_sumnum" id="spanPjtCcpyCnt">0</span>
          </div>
          <!-- 타이틀영역(우측) -->
          <div class="right">
              <div class="right ml7">
             		<button class="div_title_btn" type="button" id="btnAddPjtCcpy">신규</button>
              </div>
          </div>
      </div>
   
	   <div class="mt5 outer_line_grid" style="height:calc(100vh - 55px);">
	    <div class="dhtml_line">
	        <div id="divDataListPjtCcpy" class="dhtml_grid">
	        
	        </div>
	    </div>
	</div>
     
     
</body>


