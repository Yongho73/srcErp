<!-- 
 *    프로그램       : 근태기준설정(근태관리) 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.19
 *    사용테이블      : MHS_DCLZBASSSETTING
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/wks/mhswks001/mhswks001.js"></script>

   <div class="wrapper_con">
   
   <!-- 메뉴관리 -->
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhswks001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhswks001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhswks001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhswks001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        
    <!-- 검색 -->
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhswks001">
                    <ul class="consearchinput_list">
                        <li><span class="span">고용구분(사원구분)<!-- <taglibs:transText progrmId="default" key="titLaborSe"/> --></span><input name="laborSe" id="laborSeSearchFormMhswks001"></li>
                        <li><span class="span">급여구분(연봉/호봉)<!-- <taglibs:transText progrmId="default" key="titSalarySe"/> --></span><input name="salarySe" id="salarySeSearchFormMhswks001"></li>
                    </ul>
                </form>
            </div>
        </div>
        <div class="wrapper">
             <div class="div" style="width:calc(100% - 5px);">
                <div class="div_title">
                    <div>근태기준설정</div>
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataSetListMhswks001" style="height:150px; width:50%; position:relative;">
                </div>
                <div class="div_title">
                    <div>근태발생기준</div>
                    <div class="div_combo fr">
                        <form id="pageingFormMhswks001"></form>
                    </div>
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataStandardListMhswks001" style="height:height:500px;; width:100%; position:relative;">
                </div>
                <!-- grid paging -->
                <div style="margin-top:10px">
                    <div id="divPagingMhswks001" class="ac paging"></div>
                </div>
            </div>
            <div class="div_divine"></div>
       </div>
   </div>
</body>
