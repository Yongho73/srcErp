<!-- 
 *    프로그램       : 연차일수관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.10
 *    사용테이블      : MHS_WRYC_DAYCNT
 * sourceGen version : 2020.08.06.01 (2020.08.10)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrd/mhshrd001/mhshrd001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnAddMhshrd001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
<!--                     <li><a href="#none" id="btnRemoveMhshrd001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMhshrd001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshrd001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormMhshrd001">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">해당년도<!-- <taglibs:transText progrmId="default" key="titApplcYy"/> --></span>
                        <input class="input_calen" name="applcYy" id="applcYySearchFormMhshrd001" maxlength="4" size="4" required></li>
                        <li><span class="span" style="width: 45px;"><taglibs:transText progrmId="default" key="titDeptCode" /></span>
                        <input class="w90" type="text" name="deptCode" id="deptCode" maxlength="4" style="width: 60px;" autocomplete="off"/>
                        <input class="w90" type="text" name="deptCodeNm" id="deptCodeNm" maxlength="15" autocomplete="off">
                            <button  type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;</li>
                        <li><span class="span"><taglibs:transText progrmId="default" key="titMhsEmp" /></span>
                            <input class="w90" type="text" name="empno" id="empno" maxlength="6" style="width: 60px;" autocomplete="off"/>
                            <input class="w90" type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button  type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;</li>
                    </ul>
                </div>
            </div>
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">재직구분</span><div id="hffsSe" class="div_combo"></div></li>
                        <li id="ecnyDt">
                            <span class="span">입사일자</span>
                            <input type="text" name="searchEcnySdt" id="searchEcnySdtMhshrd001" class="input_calen" maxlength="10" />
                             ~ 
                            <input type="text" name="searchEcnyEdt" id="searchEcnyEdtMhshrd001" class="input_calen" maxlength="10" />
                            <div id="searchEcnyDt_cal" style="position:absolute; top:25px;"></div>
                        </li>
                    </ul>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMhshrd001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMhshrd001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMhshrd001">0</span>
                    <div class="right">
                        <div class="right ml7">
                            <!-- <button type="button" class="div_title_btn" id="btnNetxYearDaycntInit" >차기년연차생성</button> -->
                        </div>
                    </div> 
                </div>
                <div class="mt5 outer_line_grid" id="div1_dataListMhshrd001">
                     <div class="dhtml_line"> <!--페이징이 있을 경우 dhtml_line_paging 사용  -->
                        <div class="dhtml_grid" id="dataListMhshrd001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrd001">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</body>
