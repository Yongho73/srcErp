<!-- 
 *    프로그램       : 생일자현황조회 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.05.21
 *    사용테이블      : MHS_EMP
 * sourceGen version : 2021.02.18.01 (2021.05.21)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb011/mhshrb011.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnExcelMhshrb011"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrb011">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">사원
                        	<input type="text" name="searchEmpNo" id="searchEmpCodeMhshrb011" class="w50"/>
                            <input type="text" name="searchEmpCodeNm" id="searchEmpNmMhshrb011" class="w90"/>
                            <button type="button" id="btnSearchEmpCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        <li id='searchBirthTime'><span class="span">생일일자
                        	<input type="text" name="searchBirthBeginTime" id="searchBirthBeginTimeMhshrb011"  class="input_calen"/> ~  
                           	<input type="text" name="searchBirthEndTime" id="searchBirthEndTimeMhshrb011"  class="input_calen"/>
                           	<div id="searchBirthTime_cal" style="position:absolute; top:25px;"></div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrb011"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrb011"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMhshrb011">0</span>
                </div>
                <div class="mt5 outer_line_grid" id="div1_dataListMhshrb011">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrb011" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrb011">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</body>
