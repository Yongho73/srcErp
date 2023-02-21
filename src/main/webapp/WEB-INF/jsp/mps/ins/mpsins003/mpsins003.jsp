<!-- 
 *    프로그램       : 사회보험 자격취득 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.04
 *    사용테이블      : MPS_SLNRC_STMT
 * sourceGen version : 2020.07.16.01 (2020.08.04)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/ins/mpsins003/mpsins003.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnAddMpsins003"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
<!--                     <li><a href="#none" id="btnRemoveMpsins003"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMpsins003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpsins003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsins003">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li id="date2"><span class="span">입사일자</span>
                            <input type="text" name="stDate" id="stDate" class="input_calen">~ 
                            <input type="text" name="edDate" id="edDate" class="input_calen">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 60px;"/>
                            <input type="hidden" name="deptNm" id="deptNm" style="width: 50%"/>     
                            <button type="button" id="btnempnoSearchSearchFormMpsins003" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                        <li><span class="span">재직구분</span>
                            <div id="divComboHffsSeBox" class="div_combo"></div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsins003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsins003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMpsins003">0</span>
                </div>
                <div class="mt5 outer_line_grid" style="height: calc(100vh - 140px) !important;">
                    <div class="dhtml_line"">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                         <div class="div_line" id="dataListMpsins003" style="height:calc(100vh - 140px); width:100% ;  position:relative;">
                     </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
