<!-- 
 *    프로그램       : 개인휴무신청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.02
 *    사용테이블      : MHS_INDVDL_HVOF_MGRT
 * sourceGen version : 2020.09.02.01 (2020.09.02)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrd/mhshrd032/mhshrd032.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnExcelMhshrd032"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrd032">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span"><taglibs:transText progrmId="default" key="titDeptCode" /></span>
                            <input type="text" name="deptCode" id="deptCode" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;
                        </li>
                        <li>
                            <span class="span">사원</span>
                            <input type="text" name="empno" id="empno" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button type="button" id="btnEmpSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;
                        </li>
                        <li>
                            <span class="span">휴무 년월</span>
                            <input type="text" name="searchHvofDe" id="hvofDeSearchFormMhshrd032" class="input_calen" maxlength="7" readonly>
                        </li>
                        <li>
                            <span class="span">결재 상태</span>
                                <div id="divComboSearchElctsctSttus" style="display:inline-block"></div>
                        </li>            
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrd032"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrd032"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3" style="margin-right: 10px !important;">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMhshrd032">0</span>
                </div>
                <div class="mt5 outer_line_grid" id="div1_dataListMhshrd032">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrd032" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrd032">
                    </div> -->
                </div>
            </div>
            <div class="item">
                <div class="div_title">
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>개인휴무현황</span>
                        <select id="searchElctsctSeSn" name="searchElctsctSeSn"></select>
                        <input readonly type="text" name="searchElctsctSttusCodeNm" id="elctsctSttusCodeNmSearchFormMhshrd032" class="w60" style="text-align:center;">
                        <input readonly type="text" name="searchReturnResn" id="returnResnSearchFormMhshrd032"style="text-align:left; width:150px;">
                    </div>
                    <div class="right mr5"><!-- 타이틀영역(우측) //-->
                        <button type="button" id="bundleApproval" class="btn_common01_new">일괄 승인</button>
                        <button type="button" id="bundleReturn" class="btn_common01_new">일괄 반려</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <table id="dateCell" style="height:calc(100vh - 120px);"></table>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrd032">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</body>
