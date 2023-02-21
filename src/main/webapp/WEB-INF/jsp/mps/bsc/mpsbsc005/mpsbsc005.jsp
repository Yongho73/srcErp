<!-- 
 *    프로그램       : 개인별급여기준일괄등록 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.12
 *    사용테이블      : MPS_CALC_STDR
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc005/mpsbsc005.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMpsbsc005"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpsbsc005"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpsbsc005"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpsbsc005"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsbsc005">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>      
                    <ul class="consearchinput_list">
                        <li><span class="span"><taglibs:transText progrmId="default" key="titCorpNm" /></span><div id=divComboBplcKorNm  class="div_combo"></div>&nbsp;&nbsp;</li>
                        <li><span class="span"><taglibs:transText progrmId="default" key="titDeptCode" /></span><input type="text" name="deptCode" id="deptCode" maxlength="15" style="width: 60px;" autocomplete="off"/>
                        <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;</li>
                        <li><span class="span"><taglibs:transText progrmId="default" key="titMhsEmp" /></span><input type="text" name="empno" id="empno" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;</li>
                        <li><span class="span"><taglibs:transText progrmId="default" key="titHffsSe" /></span><div id=divComboHffsSe  class="div_combo"></div></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnUploadMpsbsc005"><span>업로드</span></a></li>
                    <li><a href="#none" id="btnDownloadMpsbsc005"><span>양식다운로드</span></a></li>
                    <li><a href="#none" id="btnSearchMpsbsc005"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsbsc005"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="wrapper">
            <div class="div" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMpsbsc005">0</span>
                </div>
                
                <div class="div_line" id="dataListMpsbsc005" style="height:calc(100vh - 120px); position:relative; width:inherit !important">
                </div>
                
            </div>
            
            <div class="div_divine"></div>
        </div>
    </div>

</body>
