<!-- 
 *    프로그램       : 상벌코드 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.27
 *    사용테이블      : MHS_RWDS_CODE
 * sourceGen version : 2020.07.16.01 (2020.08.27)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrm/mhshrm012/mhshrm012.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshrm012"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhshrm012"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrm012"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshrm012"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrm012">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">상벌구분</span><div id="divComboRwdsSeCode" class="div_combo"></div></li>
                        <li><span class="span">상벌명</span><input name="rwdsCodeNm" id="rwdsCodeNmSearchFormMhshrm012"></li>
                        <li><span class="span">사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></span>
                            <select name="useAt" id="useAtSearchFormMhshrm012">
                                <option value="">전체</option>
                                <option value="1" selected>사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrm012"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrm012"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMhshrm012">0</span>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <div class="dhtml_grid" id="dataListMhshrm012" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
