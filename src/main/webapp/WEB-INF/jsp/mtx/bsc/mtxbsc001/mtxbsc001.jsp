<!-- 
 *    프로그램       : 소득세율관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.03
 *    사용테이블      : MFS_RATE_MGRT
 * sourceGen version : 2020.06.29.01 (2020.07.03)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mtx/bsc/mtxbsc001/mtxbsc001.js"></script>
    <script src="/xerp/js/xerp/yearpicker.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/yearpicker.css" />

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMtxbsc001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMtxbsc001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMtxbsc001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMtxbsc001">
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span"><label for="docmT">적용연도</span>
                            <input type="text" name="applcYy" id="applcYySearchFormMtxbsc001" class="input_calen" size="4" maxlength="4" onchange = >
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMtxbsc001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMtxbsc001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                    <span class="table_sumnum" id="spanCntSearchFormMtxbsc001">0</span>
                    <div class="fr" style="margin-bottom:4px;">
                            <button type="button" id="btnCopy" class="btn_common01_new" style="float:right">                                         
                              <!--   년도 복사  --> <taglibs:transText progrmId="default" key="btnPrevCopy" /> 
                            </button>
                    </div> 
                </div>
                <div class="mt5 outer_line_grid" id="dataListMtxbsc001" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>
            </div>
        </div>
    </div>

</body>
