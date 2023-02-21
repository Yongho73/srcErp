<!-- 
 *    프로그램       : 증명서발급대장 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.27
 *    사용테이블      : MHS_PROOF_ISSU
 * sourceGen version : 2020.08.06.01 (2020.08.27)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrc/mhshrc003/mhshrc003.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnExcelMhshrc003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrc003">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li id='searchApplyTime'><span class="span">신청일자</span>
                             <input type="text" name="searchApplyBeginTime" id="searchApplyBeginTimeMhshrc003" maxlength="10" class="input_calen"/> ~ 
                             <input type="text" name="searchApplyEndTime" id="searchApplyEndTimeMhshrc003" maxlength="10" class="input_calen"/>
                             <div id="searchTime_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                         </li>
                         <li><span class="span">사원</span>
                            <input type="text" name="searchEmpNo" maxlength="6" id="searchEmpCodeMhshrc003" class="w50"/>
                            <input type="text" name="searchEmpCodeNm" id="searchEmpNmMhshrc003" class="w90"/>
                            <button type="button" id="btnSearchEmpCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                         </li>
                         <li><span class="span">증명서구분</span><div id="divComboSearChcrtfKindCodeMhshrc003" class="div_combo"></div></li>  
                         <li><span class="span">결재상태</span><div id="divComboSearchElctsctSttusCodeMhshrc003"  class="div_combo"></div></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrc003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrc003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormMhshrc003">0</span>
                </div>
                <div class="mt5 outer_line_grid" id="div1_dataListMhshrc003">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrc003" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrc003">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</body>
