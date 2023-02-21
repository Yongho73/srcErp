<!-- 
 *    프로그램       : 근태시간코드 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.08
 *    사용테이블      : MHS_DCLZTIMESE
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrd/mhshrd008/mhshrd008.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshrd008"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhshrd008"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrd008"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshrd008"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrd008">
                    <ul class="consearchinput_list">
                        <li>
                             <li><span class="span">근로 시간 구분</span><div id="laborTimeSeCodeSearchFormMhshrd008" class="div_combo"></div></li>
                        </li>
                        <li>
                            <span class="span">사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></span>
                            <select id="useAtSearchFormMhshrd008" name="useAt">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">사용안함</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrd008"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrd008"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="wrapper">
            <div class="div" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMhshrd008">0</span>
                </div>
                <div class="mt5 outer_line_grid" id="dataListMhshrd008" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>
            </div>
        </div>
    </div>

</body>
