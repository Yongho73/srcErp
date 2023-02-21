<!-- 
 *    프로그램       : 금융계좌관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.24
 *    사용테이블      : MFS_DEPOSIT
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mfs/bsc/mfsbsc003/mfsbsc003.js"></script>

      <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
                        <li><a href="#none" id="btnAddMfsbsc003"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                        <li><a href="#none" id="btnSaveMfsbsc003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnRemoveMfsbsc003"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                        <li><a href="#none" id="btnExcelMfsbsc003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    </ul>
                </div>
            </div>

            <!-- 검색영역 -->
            <div class="consearch_div">
                <div class="consearch_input">
                    <form id="searchFormMfsbsc003">
                    <input type="hidden" name="selectedPageNum"/>
                        <ul class="consearchinput_list">
                            <li><span class="span"><label for="docmT">계좌번호<!-- <taglibs:transText progrmId="default" key="titAcnutNo"/> --></span><input type="text" name="acnutNo" id="acnutNoSearchFormMfsbsc003"></li>
                        </ul>
                    </form>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMfsbsc003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMfsbsc003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
             <!-- 검색영역 END -->

           <div class="wrapper">
             <div class="div" style="width:calc(100% - 5px);">
                <div class="div_title">
                    <span class="table_sumnum" id="spanCntMfsbsc003">0</span>
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataListMfsbsc003" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>

            </div>
            <div class="div_divine"></div>
 
           </div>
    </div>
</body>
 