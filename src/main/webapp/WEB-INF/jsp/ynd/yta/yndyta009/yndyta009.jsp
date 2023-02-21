<!-- 
 *    프로그램       : 과세기준 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.04
 *    사용테이블      : YND_TAXT_STD
 * sourceGen version : 2020.07.16.01 (2020.09.04)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/ynd/yta/yndyta009/yndyta009.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddYndyta009"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveYndyta009"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveYndyta009"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelYndyta009"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormYndyta009">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">적용년도</span>
                            <input type="text" name="searchBelongYy" id="belongYySearchFormYndyta009" class="input_calen" size="4" maxlength="4">
                            <input type="hidden" name="hiddenBelongYy" id="hiddenBelongYySearchFormYndyta009"size="4" maxlength="4">
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchYndyta009"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetYndyta009"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item">
                <div class="div_title">
                    <div class="left"><span class="table_sumnum" id="spanCntSearchFormYndyta009">0</span></div>
                    <div class="right"><button type="button" id="btnCopyYndyta009" class="btn_common01_new">전년도 복사</button></div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <div class="dhtml_grid" id="dataListYndyta009" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
