<!-- 
 *    프로그램       : 급여지급일자등록 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.13
 *    사용테이블      : MPS_PYMNTDE
 * sourceGen version : 2020.06.29.01 (2020.07.13)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc006/mpsbsc006.js"></script>
    <script src="/xerp/js/xerp/yearpicker.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/yearpicker.css" />
    <script src="${pageContext.request.contextPath}/js/xerp/jquery.mtz.monthpicker.js"></script> 
    
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddApplyType"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveApplyType"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveApplyType"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
<!--                     <li><a href="#none" id="btnExcelMpsbsc006"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> -->
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsbsc006">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span"><label for="docmT">귀속년도</span><div id="divComboYearYear" style="display:inline-block"></div>
                            <input type="text" name="applcYy" id="applcYySearchFormMpsbsc006" class="input_calen" size="4" maxlength="4" onchange = >
<!--                             <span class="span">기준년월<taglibs:transText progrmId="default" key="titApplcYm"/></span>
                            <input name="applcYm" id="applcYmSearchFormMpsbsc006"  class="input_calen" size="4" maxlength="4"></li> -->
<!--                             <input type="text" name="applcYy" id="applcYySearchFormMpsbsc006"> -->
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsbsc006"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsbsc006"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3" style="width:calc(10% - 1px);">
                <div class="div_title mb5">
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>귀속월</span>
                    </div>
<!--                     <span class="table_sumnum" id="spanCntSearchFormMpsbsc006">0</span> -->
                </div>
                    <div class="mt5 outer_line_grid" id="dataListMonthMpsbsc006" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>
            </div>
            
            <div class="item3" style="width:calc(45% - 1px);">
                <div class="div_title mb5">
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>급여유형등록</span>
                    </div>
                    <div class="right">
<!--                         <button type="button" id="btnAddApplyType" class="div_title_btn"> -->
<%--                             <taglibs:transText progrmId="default" key="btnAdd" /> --%>
<!--                         </button> -->
<!--                         <button type="button" id="btnSaveApplyType" class="div_title_btn"> -->
<%--                             <taglibs:transText progrmId="default" key="btnSave" /> --%>
<!--                         </button>                                  -->
<!--                         <button type="button" id="btnRemoveApplyType" class="div_title_btn"> -->
<%--                             <taglibs:transText progrmId="default" key="btnDelete" /> --%>
<!--                         </button> -->
                    </div>
<!--                     <span class="table_sumnum" id="spanCntSearchFormMpsbsc006">0</span> -->
                </div>
                    <div class="mt5 outer_line_grid" id="dataListMpsbsc006" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>
            </div>
        
            <div class="item3" style="width:calc(44% - 1px);">
                <div class="div_title mb5">
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>급여항목등록</span>
                    </div>
                    <div class="right">
<!--                         <button type="button" id="btnAddCalcItem" class="div_title_btn"> -->
<%--                             <taglibs:transText progrmId="default" key="btnAdd" /> --%>
<!--                         </button> -->
<!--                         <button type="button" id="btnSaveCalcItem" class="div_title_btn"> -->
<%--                             <taglibs:transText progrmId="default" key="btnSave" /> --%>
<!--                         </button>                                 -->
<!--                         <button type="button" id="btnRemoveCalcItem" class="div_title_btn"> -->
<%--                             <taglibs:transText progrmId="default" key="btnDelete" /> --%>
<!--                         </button> -->
                    </div>
<!--                     <span class="table_sumnum" id="spanCntSearchFormMpsbsc006">0</span> -->
                </div>
                    <div class="mt5 outer_line_grid" id="dataListItemMpsbsc006" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>
            </div>

    </div>

</body>
