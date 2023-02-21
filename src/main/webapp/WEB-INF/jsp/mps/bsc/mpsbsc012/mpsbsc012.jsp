<!-- 
 *    프로그램       : 근로소득 간이세액표 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.11
 *    사용테이블      : MPS_SIMPLCTY_TAXTBL
 * sourceGen version : 2020.07.16.01 (2020.08.11)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc012/mpsbsc012.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css">
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>
    
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnAddMpsbsc012"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
<!--                     <li><a href="#none" id="btnRemoveMpsbsc012"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMpsbsc012"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpsbsc012"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsbsc012">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <input type="hidden" name="year" id="yearMpsbsc012"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">기준년도</span><input type="text" name="applcYy" id="applcYySearchFormMpsbsc012" class="input_calen" size="4" maxlength="4" autocomplete="off"/>&nbsp;&nbsp;</li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsbsc012"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsbsc012"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                    <div class="left">
                        <span class="table_sumnum" id="spanCntMpsbsc012">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                        <button type="button" class="btn_common02" id="btnCopyYearMpsbsc012"><span class="glyphicon glyphicon-paperclip"></span>전년도 복사</button>
                        <button type="button" class="btn_common02" id="btnUploadMpsbsc012"><span class="glyphicon glyphicon-paperclip"></span>엑셀 업로드</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <div class="dhtml_grid" id="dataListMpsbsc012" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
