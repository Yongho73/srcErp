<!-- 
 *    프로그램       : 계정별 관리항목 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.22
 *    사용테이블      : MFS_ACNT_MGRT_ITEM
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mfs/bsc/mfsbsc007/mfsbsc007.js"></script>

     <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
<!--                         <li><a href="#none" id="btnAddMfsbsc007"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                        <li><a href="#none" id="btnSaveMfsbsc007"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnRemoveMfsbsc007"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                       <!--  <li><a href="#none" id="btnExcelMfsbsc007"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> -->
                    </ul>
                </div>
            </div>

            <!-- 검색영역 -->
            <div class="consearch_div">
                <div class="consearch_input">
                    <form id="searchFormMfsbsc007">
                    <input type="hidden" name="selectedPageNum"/>
                        <ul class="consearchinput_list">
                            <li><span class="span">계정구분</span><div id=divSearchComboAcntSeCode style="display:inline-block"></div></li>
                            <li><span class="span"><label for="docmT">계정코드<!-- <taglibs:transText progrmId="default" key="titAcntCode"/> --></span><input name="acntCode" id="acntCodeSearchFormMfsbsc001"></li>
                            <li><span class="span"><label for="docmT">계정명<!-- <taglibs:transText progrmId="default" key="titAcntNme"/> --></span><input name="acntNm" id="acntNmSearchFormMfsbsc001"></li>   
                    </form>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMfsbsc007"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMfsbsc007"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
             <!-- 검색영역 END -->

           <div class="wrapper">
             <div class="div" style="width:calc(30% - 5px);">
                <div class="div_title" style="margin-bottom:4px;">
                    <span class="table_sumnum" id="spanCntMfsbsc007" >0</span>
<!--                     <div class="div_combo fr">
                        <form id="pageingFormMfsbsc007"></form>
                    </div> -->
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataListMfsbsc007" style="height:calc(100vh - 170px); width:100%; position:relative;">
                </div>
            <!-- grid paging -->
<!--             <div style="margin-top:10px">
                 <div id="divPagingStmCodeKind" class="ac paging"></div>
            </div> -->
            </div>
            <div class="div_divine"></div>
            <div class="div" style="width:calc(70% - 5px)">
                        <ul class="btn" style="margin-bottom:4px;float:right;">
                            <li>
                                <button type="button" id="btnAddMfsbsc007" class="btn_common01_new">
                                    <taglibs:transText progrmId="default" key="btnAdd" />
                                </button>
                                <button type="button" id="btnSaveMfsbsc007" class="btn_common01_new">
                                    <taglibs:transText progrmId="default" key="btnSave" />
                                </button>                                
                                <button type="button" id="btnRemoveMfsbsc007" class="btn_common01_new">
                                    <taglibs:transText progrmId="default" key="btnDelete" />
                                </button>
                            </li>
                        </ul>                  
                    <div class="div_line" id="dataListMfsbsc007sub" style="height:calc(100vh - 170px); width:100%; position:relative;"></div>
            </div>
              <div class="div_divine"></div>
           </div>
    </div>
</body>
