<!-- 
 *    프로그램       : 프로그램 개발현황 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.10
 *    사용테이블      : STM_PROGRM_DEV_STAT
 * sourceGen version : 2020.06.29.01 (2020.07.10)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng010/stmmng010.js"></script>

        <div class="path_div">
            <div class="project_tab_div" style="height: 0px;">
            </div>
            <!-- <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmmng010"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveStmmng010"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmmng010"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmmng010"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div> -->
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmmng010">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">프로그램ID</span><input name="progrmId" id="progrmIdSearchFormStmmng010"></li>
                        <li><span class="span">프로그램명</span><input name="progrmNm" id="progrmNmSearchFormStmmng010"></li>
                        <li><span class="span">개발자</span><input type="text" name="chargerEmpno" id="chargerEmpno" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="chargerNm" id="chargerNm" maxlength="15" autocomplete="off"/>
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;
                        </li>
                        <li><span class="span"><label for="docmT">시스템구분</span><div id="divComboSysSeSearchFormStmmng010" style="display:inline-block"></div></li>
                        <li><span class="span">진행상태</span>
                            <select id="progrsSttusSearchFormStmmng010" name="progrsSttus">
                                    <option value="">전체</option>
                                    <option value="0">진행</option>
                                    <option value="1">완료</option>                                    
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmmng010"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmmng010"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormStmmng010">0</span>
                     <div class="right">
                        <div class="right ml7">
                            <button class="div_title_btn" id="btnRemoveStmmng010" type="button" >데이터초기화</button>
                            <button class="div_title_btn" id="btnSaveStmmng010" type="button">저장</button>
                        </div>
                    </div> 
                </div>
                <div class="mt5 outer_line_grid" id="dataListStmmng010" style="height:calc(100vh - 150px); width:100%; position:relative;">
                </div>
            </div>
        </div>


</body>
