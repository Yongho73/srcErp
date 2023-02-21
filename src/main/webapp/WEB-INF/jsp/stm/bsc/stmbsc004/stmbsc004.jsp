<!-- 
 *    프로그램      : 영업일관리
 *    작성자         : 디비비전
 *    작성일자      : 2020.04.01
 *    사용테이블   : STM_JOB_DAY
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/bsc/stmbsc004/stmbsc004.js"></script>

    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/yearpicker.css" />
    <script src="/xerp/js/xerp/yearpicker.js"></script>
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnResetDeStmbsc004"><i class="axi axi-ion-android-trash mr5"></i><span>공휴일 초기화</span></a></li>
                    <li><a href="#none" id="btnSaveStmbsc004"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmbsc004">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">기준일자<!-- <taglibs:transText progrmId="default" key="titJobDe"/> --></span>
                            <input type="text" name="calenderDt" id="calenderDtSearchFormStmbsc004" class="input_calen" size="7" maxlength="7">
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmbsc004"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmbsc004"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormStmbsc004">0</span>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <div class="dhtml_grid" id="dataListStmbsc004" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
