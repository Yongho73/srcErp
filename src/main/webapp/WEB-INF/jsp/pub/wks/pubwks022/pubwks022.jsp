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

    <script src="${pageContext.request.contextPath}/js/xerp/pub/wks/pubwks022/pubwks022.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnExcelPubwks022"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPubwks022">
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
                            <input type="text" name="empno" id="empno" maxlength="15" style="width: 60px;" autocomplete="off" required/>
                            <input type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button type="button" id="btnEmpSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;
                        </li>
                        <li>
                            <span class="span">휴무 년월</span>
                            <input type="text" name="searchHvofDe" id="hvofDeSearchFormPubwks022" class="input_calen" maxlength="7" readonly>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPubwks022"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPubwks022"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item">
                <div class="div_title">
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>개인휴무현황</span>
                        <select id="searchElctsctSeSn" name="searchElctsctSeSn"></select>
                        <input readonly type="text" name="searchElctsctSttusCodeNm" id="elctsctSttusCodeNmSearchFormPubwks022" class="w60" style="text-align:center;">
                        <input readonly type="text" name="searchReturnResn" id="returnResnSearchFormPubwks022"style="text-align:left; width:150px;">
                    </div>
                    <div class="right mr5"><!-- 타이틀영역(우측) //-->
                        <button type="button" id="bundleCopy" class="btn_common01_new">복사</button>
                        <button type="button" id="bundleApprovalRequest" class="btn_common01_new">승인신청</button>
<!--                         <button type="button" id="bundleApproval" class="btn_common01_new">일괄 승인</button> -->
<!--                         <button type="button" id="bundleReturn" class="btn_common01_new">일괄 반려</button> -->
                        <button type="button" id="bundleRequestPopup" class="btn_common01_new">등록</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <table id="dateCell" style="height:calc(100vh - 120px);"></table>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPubwks022">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</body>
