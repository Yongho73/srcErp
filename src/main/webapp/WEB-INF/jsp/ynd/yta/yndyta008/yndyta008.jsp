<!-- 
 *    프로그램       : 근로소득세액기준관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.03
 *    사용테이블      : YND_LABOR_TAXDDC_STD
 * sourceGen version : 2020.07.16.01 (2020.09.03)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/ynd/yta/yndyta008/yndyta008.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddYndyta008"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveYndyta008"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveYndyta008"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelYndyta008"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormYndyta008">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">적용년도</span>
                            <input type="text" name="searchBelongYy" id="belongYySearchFormYndyta008" class="input_calen" size="4" maxlength="4">
                            <input type="hidden" name="hiddenBelongYy" id="hiddenBelongYySearchFormYndyta008"size="4" maxlength="4">
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchYndyta008"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetYndyta008"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item">
                <div class="div_title">
                    <div class="left"><span class="table_sumnum" id="spanCntSearchFormYndyta008">0</span></div>
                    <div class="right"><button type="button" id="btnCopyYndyta008" class="btn_common01_new">전년도 복사</button></div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <div class="dhtml_grid" id="dataListYndyta008" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
