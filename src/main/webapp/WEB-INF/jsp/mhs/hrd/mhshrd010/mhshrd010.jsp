<!-- 
 *    프로그램       : 초과근무조회 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.30
 *    사용테이블      : MHS_OVTIME_WORK
 * sourceGen version : 2020.07.16.01 (2020.07.30)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrd/mhshrd010/mhshrd010.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnExcelMhshrd010"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrd010">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span"><taglibs:transText progrmId="default" key="titDeptCode" /></span>
                        <input type="text" name="deptCode" id="deptCode" maxlength="15" style="width: 60px;" autocomplete="off"/>
                        <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;</li>
                        <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;</li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrd010"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrd010"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>사원 리스트</span>
                    </div>
                    <div class="right"></div>
                </div>
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 140px) !important">
                    <div class="dhtml_line">
                        <div class="div_line" id="dataEmpListMhshrd010" style="height:calc(100vh - 140px); width:100%; position:relative;">
                    </div>
                </div>
                </div>
            </div><!-- //오른쪽 영역 item4 end -->
            <div class="item7">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMhshrd010">0</span>
                </div>
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 140px) !important">
                    <div class="dhtml_line">
                        <div class="div_line" id="dataListMhshrd010" style="height:calc(100vh - 140px); width:100%; position:relative;">
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>

</body>
