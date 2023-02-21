<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/qes/stmqes001/stmqesTrget.js"></script>
        
         <div class="item3">
            <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormStmqesTrget">0</span>
                        
                    </div>
                    <div class="right">
                            <div id="divCombotrgetSe" class="div_combo"></div>
                            <button class="div_title_btn" id="btnAddtrget" type="button">행추가</button>
                            <button class="div_title_btn" id="btnRemovetrget" type="button">행삭제</button>
                            <button class="div_title_btn" id="btnSavetrget" type="button">저장</button>
                            <!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <form id="saveFormStmqesTrget">
                        <input type="hidden" name="qestnarCode" id="qestnarCode" value="${qestnarCode}" />
                </form> 
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 50px) !important;" >
                    <div class="dhtml_line" style="height:calc(100vh - 50px) !important;"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListStmqesTrget" style="height:calc(100vh - 50px) !important;"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingStmmng006">
                    </div> -->
                </div>
            </div><!-- //오른쪽 영역 item4 end -->
            
</body>


