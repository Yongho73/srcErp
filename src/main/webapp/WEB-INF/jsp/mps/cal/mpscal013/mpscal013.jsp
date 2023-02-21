<!-- 
 *    프로그램       : 급여대상자생성 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.17
 *    사용테이블      : MPS_SALARY_TRGTER
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal013/mpscal013.js"></script>
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>
    <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <!-- <li><a href="#none" id="btnAddMpscal013"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpscal013"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpscal013"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpscal013"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>-->
                </ul>
            </div>
        </div>
        <form id="searchFormMpscal013">
            <div class="consearch_div">
                <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li><span class="span">지급일자</span>
                            <input type="text" name=pymntSn id="pymntSnSaveFormMpscal013" style="width: 50px;" readonly/>
                            <input type="hidden" name=closAt id="closAtSaveFormMpscal013"/>
                            <input type="hidden" name=jssfcCode id="jssfcCodeSaveFormMpscal013"/>
                            <input type="hidden" name=salarytyCode id="salarytyCodeSaveFormMpscal013"/>
                            <input type="hidden" name=applcYm id="applcYmSaveFormMpscal013"/>
                            <input type="text" name=pymntDe id="pymntDeSaveFormMpscal013" maxlength="20" style="width: 100px;" readonly/>
                            <input type="text" name=salarytyCodeNm id="salarytyCodeNmSaveFormMpscal013" maxlength="20" style="width: 50px;" readonly/>
                            <input type="text" name=pymntDtls id="pymntDtlsNmSaveFormMpscal013" maxlength="20" style="width: 150px;" readonly/>
                            <button type="button" id="btnPymntDeSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                        </li>
                        <li><span class="span">사원구분</span>
                            <div id="divComboEmpl" class="div_combo"></div>
                        </li>
                        <li><span class="span">재직구분</span>
                            <div id="divComboHffsSeBox" class="div_combo"></div>
                        </li>
                    </ul>
                   </div>
                </div>
                <div class="consearch_div">
                   <div class="consearch_input">
                      <ul class="consearchinput_list">
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearchSearchFormMpscal013" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>                        
                        </li>
                        <li><span class="span">직급</span>
                            <div id="divComboClsfCodeBox" class="div_combo"></div>
                        </li>
                      </ul>
                    </div>
                    <div class="consearchbt_div">
                        <ul class="consearchbt_list">
                            <li><a href="#none" id="btnSearchMpscal013"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                            <li><a href="#none" id="btnResetMpscal013"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                        </ul>
                    </div>
                </div>
            </form>
        <div class="flex">
            <div class="item5_5">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->

                <!-- 타이틀영역 -->
                <div class="div_title">
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>직원목록</span>
                        <span class="table_sumnum ml5" id="spanCntSearchFormMpsEmp">0</span>
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">
                        
                    </div>
                </div>
                <!--// 타이틀영역 -->

                <div class="mt5 outer_line_grid" style="height:calc(100vh - 160px) !important;">
                    <div class="dhtml_line">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->

                        <div class="dhtml_grid" id="dataListMpscalEmp" style="height:calc(100vh - 140px); width:100%; position:relative;">
                        </div>
                    </div>
                    <div class="ac paging" id="divPagingMpscal013">
                    </div>
                </div>
            </div><!-- //왼쪽 영역 item end -->
            
            
            <div class="item5_5">
                <div class="shuttle">
                    <a class="right_btn" id="btnSaveMpscal013"><i class="axi axi-ion-arrow-right-b"></i></a>
                    <a class="left_btn" id="btnRemoveMpscal013"><i class="axi axi-ion-arrow-left-b"></i></a>
                </div>
            </div><!-- //오른쪽 영역 item end -->
            
            
            <div class="item5_5">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->

                <!-- 타이틀영역 -->
                <div class="div_title">
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>지급대상자</span>
                        <span class="table_sumnum ml5" id="spanCntSearchFormMpscal013">0</span>
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">
                       
                    </div>
                </div>
                <!--// 타이틀영역 -->

                <div class="mt5 outer_line_grid" style="height:calc(100vh - 160px) !important;">
                    <div class="dhtml_line">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->

                        <div class="dhtml_grid" id="dataListMpscal013" style="height:calc(100vh - 140px); width:100%; position:relative;">
                        </div>
                    </div>
                </div>

            </div><!-- //왼쪽 영역 item end -->
            
         
    </div><!-- //wrapper_con end -->

</body>
