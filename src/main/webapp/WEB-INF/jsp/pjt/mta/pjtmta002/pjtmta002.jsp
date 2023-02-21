<!-- 
 *    프로그램       : 유지보수요청요약 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.14
 *    사용테이블      : PJT_MNTNCE_REQUST
 * sourceGen version : 2020.07.16.01 (2020.08.14)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/mta/pjtmta002/pjtmta002.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
               <!--      <li><a href="#none" id="btnAddPjtmta002"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePjtmta002"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePjtmta002"><i class="axi axi-save mr5"></i><span>저장</span></a></li> -->
                    <li><a href="#none" id="btnExcelPjtmta002"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPjtmta002">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">거래처</span>
                            <input type="text" name="bcncNm" id="bcncNm" style="width:150px;"/>
                            <button type="button" id="btnCompNmSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"></span></button>
                        </li>
                        <li><span class="span">진행상태</span>
                            <select id="comptAt" name="comptAt">
                                    <option value="">전체</option>
                                    <option value="0">진행</option>
                                    <option value="2">보류</option> 
                                    <option value="1">완료</option>                                    
                            </select>
                        </li>
                        <li><span class="span">기간</span>
                            <input type="text" name="bgnRequstDe" id="bgnRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> 
                            ~ <input type="text" name="endRequstDe" id="endRequstDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                       </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPjtmta002"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPjtmta002"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormPjtmta002">0</span>
                </div>
                <div class="mt5 outer_line_grid">
                <div class="dhtml_line">
                    <div class="dhtml_grid" id="dataListPjtmta002" style="height:calc(100vh - 120px);"></div>
                </div>
                </div>       
            </div>
        </div>
    </div>

</body>
