<!-- 
 *    프로그램       : ERP게시판관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.21
 *    사용테이블      : STM_ERP_NOTICE_BOARD
 * sourceGen version : 2020.07.16.01 (2020.08.21)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/not/stmnot001/stmnot001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmnot001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveStmnot001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnExcelStmnot001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmnot001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">작성일자</span>
                            <input type="text" name="bgnRequstDe" id="bgnRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> 
                            ~ <input type="text" name="endRequstDe" id="endRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li><span class="span">부서</span>
                            <input type="text" name="searchDeptNo" id="searchDeptNoStmnot001" maxlength="15" class="w50"/>
                            <input type="text" name="searchDeptNm" id="searchDeptNmStmnot001" class="w80">
                            <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                        <li><span class="span">사원</span>
                            <input type="text" name="searchEmpno" id="searchEmpnoStmnot001" maxlength="15" class="w50"/>
                            <input type="text" name="searchEmpNm" id="searchEmpNmStmnot001" class="w90">
                            <button type="button" id="btnEmpCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                        <li><span class="span">제목/내용</span><input name="noticeCn" id="noticeCnSearchFormStmnot001"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmnot001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmnot001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormStmnot001">0</span>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <div class="dhtml_grid" id="dataListStmnot001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
