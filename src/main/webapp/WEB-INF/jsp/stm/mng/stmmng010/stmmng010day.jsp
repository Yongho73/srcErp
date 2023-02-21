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

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng010/stmmng010day.js"></script>

        <div class="path_div">
            <div class="project_tab_div" style="height: 0px;">
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmmng010">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <!-- <li><span class="span">기준기간</span><input name="progrmId" id="progrmIdSearchFormStmmng010"></li> -->
                        <li><span class="span"><label for="docmT">시스템구분</span><div id="divComboSysSeSearchFormStmmng010Day" style="display:inline-block"></div></li>
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
                <!-- <span class="table_sumnum" id="spanCntSearchFormStmmng010">0</span> -->
                <!--      <div class="right">
                        <div class="right ml7">
                            <button class="div_title_btn" id="btnRemoveStmmng010" type="button" >삭제</button>
                            <button class="div_title_btn" id="btnSaveStmmng010" type="button">저장</button>
                        </div>
                    </div> --> 
                </div>
                 <div class="mt5 outer_line_grid" id="dataListStmmng010Day" style="height:calc(100vh - 150px); width:100%; position:relative;">
                </div>
            </div>
        </div>


</body>
