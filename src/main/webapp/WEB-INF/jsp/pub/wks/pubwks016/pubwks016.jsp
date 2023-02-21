<!-- 
 *    프로그램       : 국내출장신청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.29
 *    사용테이블      : MHS_BSRP
 * sourceGen version : 2020.06.29.01 (2020.06.29)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pub/wks/pubwks016/pubwks016.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddPubwks016"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnExcelPubwks016"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormPubwks016">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li> 
                            <span class="span" style="width: 46px">출장명</span>
                            <input type="text" name="searchBsrpNm" id="searchBsrpNmPubwks016" style="width: 88px" maxlength="50"/>
                        </li>
                         <li><span class="span">부서</span>
                            <input type="text" name="searchDeptCode" id="searchDeptCodePubwks016" class="w90"/>
                            <input type="text" name="searchDeptCodeNm" id="searchDeptNmPubwks016" class="w90"/>
                            <button type="button" id="btnSearchDeptCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;
                        </li>
                        <li><span class="span">사원</span>
                            <input type="text" name="searchEmpNo" id="searchEmpCodePubwks016" class="w90"/>
                            <input type="text" name="searchEmpCodeNm" id="searchEmpNmPubwks016" class="w90"/>
                            <input type="hidden" name="searchBplcCode" id="searchBplcCodePubwks016" class="w90"/>
                            <button type="button" id="btnSearchEmpCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                       </li>                    
                   </ul>
                </div>
             </div>
             <div class="consearch_div">
             <div class="consearch_input">
                <input type="hidden" name="sortDirection"/>
                <input type="hidden" name="sortColumId"/>
                <input type="hidden" name="selectedPageNum"/>
                   <ul class="consearchinput_list">
                        <li id="searchReqstDe">
                            <span class="span">신청일자</span>
                            <input type="text" name="searchReqstDe" id="searchReqstDePubwks016"  class="input_calen" maxlength="10"/>
                            <div id="searchReqstDe_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px
                             만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                        </li>
                        <li id='searchBsrpDt'><span class="span">출장일자</span>
                             <input type="text" name="searchBsrpSdt" id="searchBsrpSdtPubwks016"  class="input_calen" maxlength="10"/> ~ 
                             <input type="text" name="searchBsrpEdt" id="searchBsrpEdtPubwks016"  class="input_calen" maxlength="10"/>
                             <div id="searchBsrpDt_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                         </li>
                         <li>
                            <span class="span">결재상태</span>
                            <div id="divComboSearchElctsctSttus" style="display:inline-block"></div>
                         </li>
                   </ul>
               </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPubwks016"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPubwks016"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
            </div>
        </form>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntSearchFormPubwks016">0</span>
                </div>
                    <div class="mt5 outer_line_grid" style="height:calc(100vh - 170px) !important;">
                        <div class="dhtml_line">
                            <div class="div_line" id="dataListPubwks016" style="height:calc(100vh - 170px); width:100%; position:relative;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
