<!-- 
 *    프로그램       : 개인별투입현황 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.02.22
 *    사용테이블      : PJT_HNF_ACMSLT
 * sourceGen version : 2021.02.18.01 (2021.02.22)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg005/pjtpmg005.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
              <!--       <li><a href="#none" id="btnAddPjtpmg005"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePjtpmg005"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePjtpmg005"><i class="axi axi-save mr5"></i><span>저장</span></a></li>-->
                    <li><a href="#none" id="btnExcelPjtpmg005"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> 
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPjtpmg005">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">기준년도</span>
                            <input type="text" name="applcYy" id="applcYy" class="input_calen" size="4" maxlength="4" autocomplete="off"/>&nbsp;&nbsp;</li>
                        </li>
                        <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" maxlength="15" style="width: 60px;" autocomplete="off">
                            <input type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;
                        </li>
                        <li><span class="span">등급</span>
                            <div id="divComboTchnlgyGrad" class="div_combo"></div>
                        </li>
                        <li><span class="span">인력구분</span>
                            <select id="extrlServcAt" name="extrlServcAt">
                                    <option value="">전체</option>
                                    <option value="0">정규직</option>
                                    <option value="1">프리랜서</option>                        
                            </select>
                        </li>
                        <li><span class="span">프로젝트</span>
                            <input readonly type="text" name="projectSn" id="projectSn" style="width: 100px;"/>
                            <input readonly type="text" name="projectNm" id="projectNm" style="width: 200px;"/>
                            <button type="button" id="btnProjectSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPjtpmg005"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPjtpmg005"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormPjtpmg005">0</span>
                </div>
                <div class="mt5 outer_line_grid" id="div1_dataListPjtpmg005">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPjtpmg005" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPjtpmg005">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</body>
