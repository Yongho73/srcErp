<!-- 
 *    프로그램       : 소득자별원천징수영수증 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.18
 *    사용테이블      : MFS_WHTAX_PYMNT
 * sourceGen version : 2020.07.16.01 (2020.08.18)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/ern/mpsern009/mpsern009.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css">
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>
    
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnAddMpsern009"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
<!--                     <li><a href="#none" id="btnRemoveMpsern009"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
<!--                     <li><a href="#none" id="btnSaveMpsern009"><i class="axi axi-save mr5"></i><span>저장</span></a></li> -->
                    <li><a href="#none" id="btnPrintMpsern009"><i class="axi axi-file-excel-o mr5"></i><span>인쇄</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsern009">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                        <span class="span">귀속년월</span>
                        <input type="text" name="applcYySt" id="applcYyStMpsern009" class="input_calen" size="4" maxlength="4" autocomplete="off"/>~
                        <input type="text" name="applcYyEn" id="applcYyEnMpsern009" class="input_calen" size="4" maxlength="4" autocomplete="off"/>
                        </li>
                        <li>
                            <span class="span">소득구분</span>
                            <div id="divComboSearchincomeKindCode" class="div_combo"></div>
                        </li>
                        <li>
                            <span class="span">성명</span>
                            <input type="text" name="earnerNm" id="earnerNm" maxlength="6" style="width: 50%"/>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsern009"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsern009"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMpsern009">0</span>
                    </div>
                    <div class="right">
                        <button type="button" class="btn_common02" id="btnAddCode"><span class="glyphicon glyphicon-paperclip"></span>파일제작</button>
                        <button type="button" class="btn_common02" id="btnAddCode"><span class="glyphicon glyphicon-paperclip"></span>전자신고</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMpsern009" style="height:calc(100vh - 120px); width:100%; position:relative;"> <!-- 그리드 영역 -->
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>

</body>
