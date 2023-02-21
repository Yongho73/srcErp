<!-- 
 *    프로그램       : 급여관리_가족 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.08
 *    사용테이블      : MHS_FAMILY
 * sourceGen version : 2020.06.29.01 (2020.07.08)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal000/mpscal000.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMpscal000"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpscal000"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpscal000"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpscal000"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpscal000">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">사원번호<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></span><input name="empno" id="empnoSearchFormMpscal000"></li>
                        <li><span class="span">가족 순번<!-- <taglibs:transText progrmId="default" key="titFamilySn"/> --></span><input name="familySn" id="familySnSearchFormMpscal000"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpscal000"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpscal000"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMpscal000">0</span>
                </div>
                <div class="mt5 outer_line_grid" id="dataListMpscal000" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>
            </div>
        </div>
    </div>

</body>
