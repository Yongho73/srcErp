<!-- 
 *    프로그램       : 시차근무관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.14
 *    사용테이블      : MHS_TMDIFF_WORK
 * sourceGen version : 2020.06.29.01 (2020.07.14)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pub/wks/pubwks020/pubwks020.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnExcelPubwks020"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> -->
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPubwks020">
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
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPubwks020"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPubwks020"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <div class="left">
                        <span class="table_sumnum" id="spanCntSearchFormPubwks020">0</span>
                    </div>
                    <div class="right"></div>
                </div>
                <div class="mt5 outer_line_grid" id="dataListPubwks020" style="height:calc(100vh - 200px); width:100%; position:relative;">
                </div>
            </div><!-- //오른쪽 영역 item4 end -->
            <div class="item7">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>시차근무현황</span>
                    </div>
                    <div style="margin-left: 45%">
                        <input name="searchWorkDay" id="workDaySearchFormPubwks020" class="input_calen" maxlength="7">
                        <div class="right mr5"><!-- 타이틀영역(우측) //-->
                            <button type="button" id="bundleApprovalRequestBtn" class="btn_common01_new">일괄 승인신청</button>
                            <button type="button" id="bundleReturnBtn" class="btn_common01_new">일괄 반려</button>
                            <button type="button" id="bundleApprovaltBtn" class="btn_common01_new">일괄 승인</button>
                            <button type="button" id="bundleRequestPopup" class="btn_common01_new">일괄 등록</button>
                        </div>
                    </div>
                </div>
                <div class="mt5 outer_line_grid gridbox gridbox_material isModern">
                    <table id="dateCell" height="100%" class=""></table>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPubwks020">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
