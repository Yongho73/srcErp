<!-- 
 *    프로그램       : 사회보험월별납부 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.11
 *    사용테이블      : MPS_MT_SNLRCCHRGE
 * sourceGen version : 2020.07.16.01 (2020.08.11)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/ins/mpsins001/mpsins001.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css">
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>
    
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMpsins001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpsins001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpsins001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpsins001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormMpsins001">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                        <span class="span">적용년월</span>
                        <input type="text" name="applcYySt" id="applcYyStMpsins001" class="input_calen" size="4" maxlength="4" autocomplete="off"/>~
                        <input type="text" name="applcYyEn" id="applcYyEnMpsins001" class="input_calen" size="4" maxlength="4" autocomplete="off"/>
                        </li>
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearchSearchFormMpsins001" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 60px;"/>
                            <input type="hidden" name="deptNm" id="deptNm" style="width: 50%"/>     
                            <button type="button" id="btnempnoSearchSearchFormMpsins001" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="consearch_div">
                 <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li id="date2"><span class="span">공제일자</span>
                            <input type="text" name="stDate" id="stDate" class="input_calen">~ 
                            <input type="text" name="edDate" id="edDate" class="input_calen">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li><span class="span">재직구분</span>
                            <div id="divComboHffsSeBox" class="div_combo"></div>
                        </li>
                    </ul>
                 </div>
                    <div class="consearchbt_div">
                        <ul class="consearchbt_list">
                            <li><a href="#none" id="btnSearchMpsins001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                            <li><a href="#none" id="btnResetMpsins001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                        </ul>
                    </div>                    
                </div>
            </form>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                    <div class="left">
                        <span class="table_sumnum" id="spanCntSearchFormMpsins001">0</span>
                    </div>
<!--                     <button class="div_title_btn" type="button" id="btnBugtAdd">공제일 설정</button> -->
                    <div class="right">
                        <button type="button" class="btn_common02" id="btnBugtAdd">공제일 설정</button>
                        <button type="button" class="btn_common02" id="btnExcelDownload"><span class="glyphicon glyphicon-paperclip"></span>엑셀 양식 다운</button>
                        <button type="button" class="btn_common02" id="btnFileUpload1"><span class="glyphicon glyphicon-paperclip"></span>엑셀 업로드</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid" style="height: calc(100vh - 160px) !important;">
                    <div class="dhtml_line"">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                         <div class="div_line" id="dataListMpsins001" style="height:calc(100vh - 160px); width:100%;  position:relative;">
                     </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
