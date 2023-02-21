<!-- 
 *    프로그램       : 자녀학비보조금 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.29
 *    사용테이블      : MHS_SCHXPN_REQST
 * sourceGen version : 2020.07.16.01 (2020.07.29)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal012/mpscal012.js"></script>
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>
        
        
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnAddMpscal012"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
<!--                     <li><a href="#none" id="btnRemoveMpscal012"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMpscal012"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpscal012"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpscal012">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearchSearchFormMpscal012" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 60px;"/>
                            <input type="hidden" name="deptNm" id="deptNm" style="width: 50%"/>     
                            <button type="button" id="btnempnoSearchSearchFormMpscal012" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpscal012"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpscal012"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item" style="width:calc(100% - 1px);">
                <div class="div_title">
                <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMpscal012">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    <button class="div_title_btn" type="button" id="btnPymntDeSearch">지급일자선택</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid" style="height: calc(100vh - 140px) !important;">
                    <div class="dhtml_line"">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                         <div class="div_line" id="dataListMpscal012" style="height:calc(100vh - 140px); width:100% ;  position:relative;">
                     </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
