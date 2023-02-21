<!-- 
 *    프로그램       : 급여마감 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.03
 *    사용테이블      : MPS_PYMNTDE
 * sourceGen version : 2020.06.29.01 (2020.07.03)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal017/mpscal017.js"></script>
    <script src="/xerp/js/xerp/yearpicker.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/yearpicker.css" />

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <!-- <li><a href="#none" id="btnAddMpscal017"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
                    <!-- <li><a href="#none" id="btnRemoveMpscal017"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMpscal017"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
<!--                     <li><a href="#none" id="btnExcelMpscal017"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> -->
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpscal017">
                    <input type="hidden" name="sortDirection"/>
                        <input type="hidden" name="sortColumId"/>
                        <input type="hidden" name="selectedPageNum"/>      
                        <ul class="consearchinput_list">
                              <li>
                            <span class="span"><label for="docmT">귀속년도</span><div id="divComboYearYear" style="display:inline-block"></div>
                            <input type="text" name="applcYy" id="applcYySearchFormMpscal017" class="input_calen" size="4" maxlength="4" onchange = >
<!--                             <input type="text" name="applcYy" id="applcYySearchFormMpsbsc006"> -->
                        </li>
                        </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpscal017"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpscal017"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3" style="width:calc(10% - 1px);">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title"> <!-- 높이만 잡고 싶은 경우 빈 div_title만 남기고 안쪽은 지워준다 -->
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>귀속월</span>
<!--                         <span class="table_sumnum ml5">0</span> -->
                    </div>
                    <!-- 타이틀영역(우측) -->
<!--                     <div class="right">
                    </div> -->
                </div>
                <!--// 타이틀영역 -->


                <div class="mt5 outer_line_grid" style="height: calc(100vh - 126px) !important;">
                    <div class="dhtml_line" style="height: calc(100vh - 126px) !important;">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                        <div class="div_line" id="dataListMonthMpscal017" style="height:calc(100vh - 126px); width:100%; position:relative;">
                        </div>
                    </div>
                </div>

                    
            </div><!-- //오른쪽 영역 item end -->
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->

                <!-- 타이틀영역 -->
                <div class="div_title">
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>지급유형등록</span>
                    </div>
                </div>
                <!--// 타이틀영역 -->

                <div class="mt5 outer_line_grid" style="height: calc(100vh - 126px) !important;">
                    <div class="dhtml_line" style="height: calc(100vh - 126px) !important;">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->

                         <div class="div_line" id="dataListMpscal017" style="height:calc(100vh - 126px); width:100%; position:relative;">
                     </div>
                    </div>
                </div>

            </div><!-- //왼쪽 영역 item end -->

            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item3으로 변경후 사용
            <div class="item3">
            </div>
             -->
        </div><!-- //flex end -->
    </div>

</body>
