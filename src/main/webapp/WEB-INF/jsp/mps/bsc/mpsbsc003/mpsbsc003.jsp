<!-- 
 *    프로그램      : 월급여항목적용
 *    작성자         : 디비비전
 *    작성일자      : 2020.04.01
 *    사용테이블   : MPS_APPLY_MONTH
 -->
<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

<script src="${pageContext.request.contextPath}/js/xerp/yearpicker.js"></script>
<script src="${pageContext.request.contextPath}/js/xerp/jquery.mtz.monthpicker.js"></script> 

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc003/mpsbsc003.js"></script>
    
    <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
                        <li><a href="#none" id="btnSaveMpsbsc003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnExcelMpsbsc003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    </ul>
                </div>
            </div>

            <!-- 검색영역 -->
            <div class="consearch_div">
                <div class="consearch_input">
                    <form id="searchFormMpsbsc003">
                    <input type="hidden" name="selectedPageNum"/>
                        <ul class="consearchinput_list">
                            <li><span class="span"><label for="docmT">적용연도</span><div id="divComboYearYear" style="display:inline-block"></div></li>  
                            <li><span class="span"><label for="docmT">급여유형</span><div id="divComboSearchSalarytyCode" style="display:inline-block"></div></li>  
                            <li><span class="span"><label for="docmT">지급공제구분</span><div id="divComboSearchPymntddcSe" style="display:inline-block"></div></li>  
                        </ul>
                    </form>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMpsbsc003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMpsbsc003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
             <!-- 검색영역 END -->

           <div class="wrapper">
             <div class="div" style="width:calc(100% - 5px);">
                <div class="div_title">
                    <span class="table_sumnum" id="spanCntMpsbsc003">0</span>
                        <ul class="btn" style="margin-bottom:4px;float:right;">
                            <li>
                                <button type="button" id="btnCopy" class="btn_common01_new">
                                    <!--   년도 복사  --> <taglibs:transText progrmId="default" key="btnPrevCopy" /> 
                                </button>
                            </li>
                        </ul>                    
                </div>                        
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataListMpsbsc003" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>

            </div>
            <div class="div_divine"></div>

    </div>
</body>
