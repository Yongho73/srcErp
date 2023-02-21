<!-- 
 *    프로그램       : 초과근무신청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.24
 *    사용테이블      : MHS_OVTIME_WORK
 * sourceGen version : 2020.07.16.01 (2020.07.24)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pub/wks/pubwks005/pubwks005.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddPubwks005"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePubwks005"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePubwks005"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
<!--                     <li><a href="#none" id="btnExcelPubwks005"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> -->
                </ul>
            </div>
        </div>
        <form id="searchFormPubwks005">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">부서</span>
                            <input type="text" name="searchDeptCode" id="searchDeptCodePubwks005" class="w90"/>
                            <input type="text" name="searchDeptCodeNm" id="searchDeptNmPubwks005" class="w90"/>
                            <button type="button" id="btnSearchDeptCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;
                        </li>
                        <li>
                            <span class="span">사원</span>
                            <input type="text" name="searchEmpNo" id="searchEmpCodePubwks005" class="w90"/>
                            <input type="text" name="searchEmpCodeNm" id="searchEmpNmPubwks005" class="w90"/>
                            <input type="hidden" name="searchBplcCode" id="searchBplcCodePubwks005" class="w90"/>
                            <button type="button" id="btnSearchEmpCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                       </li>
                       <li id="searchRealWork">
                            <span class="span"> 실근무일</span>
                            <input type="text" name="searchRealWorkSdt" id="searchRealWorkSdtPubwks005"  class="input_calen"/> ~ 
                            <input type="text" name="searchRealWorkEdt" id="searchRealWorkEdtPubwks005"  class="input_calen"/>
                            <div id="searchRealWorkDe_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
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
                        <li>
                            <span class="span"> 보상휴무사용여부 </span>
                            <select  name="searchHovfUseAt" id="searchHovfUseAt" style="display:inline-block; margin-right:102.87px;">
                                <option value="" selected>전체</option>
                                <option value="0">미사용</option>
                                <option value="1">사용</option>
                            </select>
                        </li>
                        <li>
                            <span class="span"> 전자결재상태</span>
                            <div id="divComboSearchElctsctSttus" style="display:inline-block"></div>
                        </li>
                    </ul>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchPubwks005"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetPubwks005"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        <div class="flex">
            <div class="item5">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormPubwks005">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 160px) !important;">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPubwks005" style="height:calc(100vh - 160px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPubwks005">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item5">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    -->
                    <div class="right">
                        <button class="btn_common01_new" id="copyBtn">복사</button>
                    </div>
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 160px) !important;">
                    <div class="detail_type01">
                        <form id="saveFormPubwks005">
                            <input type="hidden" name="ovtimeWorkSn" id="ovtimeWorkSnSaveFormPubwks005"/>
                            <input type="hidden" name="elctsctDocNo" id="elctsctDocNoSaveFormPubwks005"/>
                            <input type="hidden" name="elctsctEmpno" id="elctsctEmpnoSaveFormPubwks005"/>
                            <input type="hidden" name="reqstBeginTime" id="reqstBeginTimeSaveFormPubwks005"/>
                            <input type="hidden" name="reqstEndTime" id="reqstEndTimeSaveFormPubwks005"/>
                            <input type="hidden" name="realBeginTime" id="realBeginTimeSaveFormPubwks005"/>
                            <input type="hidden" name="realEndTime" id="realEndTimeSaveFormPubwks005"/>
                            <input type="hidden" name="wthdrawElctsctSttusCode" id="wthdrawElctsctSttusCodeSaveFormPubwks005"/>
                            <input type="hidden" name="wthdrawElctsctSeSn" id="wthdrawElctsctSeSnSaveFormPubwks005"/>
                            <input type="hidden" name="wthdrawElctsctEmpnm" id="wthdrawElctsctEmpnmSaveFormPubwks005"/>
                            <table>
                                <caption>초과근무신청<!-- <taglibs:transText progrmId="default" key="titPubwks005"/> --></caption>
                                <colgroup>
                                    <col width="140">
                                    <col width="">
                                    <col width="140">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">성명</th>
                                    <td colspan="1">
                                    <input type="text" name="empno" id="empnoSaveFormPubwks005" style="width:50px; text-align:center;" required/>
                                    <input type="text" name="empnm" id="empnmSaveFormPubwks005" style="width:65px; text-align:center;" required/>
                                    <button type="button" id="btnSearchEmpNo" class="btn_common03">
                                    <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                    </td>
                                    <th class="essential_icon">근무 구분<!-- <taglibs:transText progrmId="default" key="titOvtimeSeCode"/> --></th>
                                    <td colspan="3">
                                        <div id="divComboSaveOvtimeSeCode" class="div_combo"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>정상 근무 시간</th>
                                    <td colspan="1">
                                        <input type="text" name="normalWorkBeginTime" id="normalWorkBeginTimeSaveFormPubwks005" style="width: 50px; text-align: center;"/>
                                        &nbsp;~&nbsp;
                                        <input type="text" name="normalWorkEndTime" id="normalWorkEndTimeSaveFormPubwks005" style="width: 50px; text-align: center;"/>
                                    </td>
                                    <th>누적 시간 / 주</th>
                                    <td>
                                        <input type="text" name="totalTime" id="totalTimeSaveFormPubwks005" style="width: 97%; text-align: center;" readonly/>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="1" class="essential_icon">신청 근무 일자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                    <td colspan="3">
                                        <input type="text" name="reqstDe" id="reqstDeSaveFormPubwks005" class="input_calen" maxlength="10" required/>
                                        <input type="time" name="reqstBeginTime" id="reqstBeginTimeSaveFormPubwks005"/>
                                        &nbsp; ~ &nbsp;
                                        <input type="time" name="reqstEndTime" id="reqstEndTimeSaveFormPubwks005"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>실제 근무 일자<!-- <taglibs:transText progrmId="default" key="titRealWorkDe"/> --></th>
                                    <td colspan="3">
                                        <input type="text" name="realWorkDe" id="realWorkDeSaveFormPubwks005" style="width: 85px;"/>
                                        <input type="time" name="realBeginTime" id="realBeginTimeSaveFormPubwks005"/>
                                        &nbsp; ~ &nbsp;
                                        <input type="time" name="realEndTime" id="realEndTimeSaveFormPubwks005"/>
                                    </td>
                                </tr> 
                                <tr>

                                    <th>실제 근무 시간</th>
                                    <td colspan="1"><input type="text" name="realWorkTime" id="realWorkTimeSaveFormPubwks005" style="width: 97%; text-align: center;"/></td>
                                    <th>매식 여부<!-- <taglibs:transText progrmId="default" key="titMealAt"/> --></th>
                                    <td colspan="1">
                                        <div class="checkbox">
                                            <label><input type="checkbox" name="mealAt" id="mealAtSaveFormPubwks005" maxlength="1" /><i class="input-helper"></i></label>
                                        </div>
                                    </td>      
                                </tr>
                                <tr>
                                    <th>주간 초과근무 시간<!-- <taglibs:transText progrmId="default" key="titDayRecogTime"/> --></th>
                                    <td colspan="1"><input type="text" name="dayRecogTime" id="dayRecogTimeSaveFormPubwks005" style="width: 97%; text-align: center;"/></td>
                                    <th>야간 초과근무 시간<!-- <taglibs:transText progrmId="default" key="titNightRecogTime"/> --></th>
                                    <td colspan="1"><input type="text" name="nightRecogTime" id="nightRecogTimeSaveFormPubwks005" style="width: 97%; text-align: center;"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 내용<!-- <taglibs:transText progrmId="default" key="titWorkCn"/> --></th>
                                    <td colspan="3"><input type="text" name="workCn" id="workCnSaveFormPubwks005" maxlength="200" style="width: 98.5%;" required/></td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="3"><input type="text" name="rm" id="rmSaveFormPubwks005" maxlength="200" style="width: 98.5%"/></td>
                                </tr>
                                <tr>
                                    <th>전자결재 상태<!-- <taglibs:transText progrmId="default" key="titElctsctSttusCode"/> --></th>
                                    <td colspan="1"><input type="text" name="elctsctSttusCodeNm" id="elctsctSttusCodeNmSaveFormPubwks005" maxlength="10" style="width: 97%; text-align: center;"/></td>
                                    <th>전자결재 사원</th>
                                    <td colspan="1"><input type="text" name="elctsctEmpnm" id="elctsctEmpnmSaveFormPubwks005" maxlength="10" style="width: 97%; text-align: center;"/></td>
                                </tr>
                                </tr>
                                <tr>
                                    <th>대체 휴무</th>
                                    <td> 
                                        <div class="checkbox">
                                            <label><input type="checkbox" name="altHvofUseAt" id="altHvofUseAtSaveFormPubwks005" maxlength="1"/><i class="input-helper"></i></label>
                                        </div>
                                    </td>
                                    <th>보상 휴가<!-- <taglibs:transText progrmId="default" key="titRewardHvofUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label><input type="checkbox" name="rewardHvofUseAt" id="rewardHvofUseAtSaveFormPubwks005" maxlength="1"/><i class="input-helper"></i></label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>철회 여부</th>
                                    <td>
                                        <div class="checkbox" style="display:inline-block;">
                                            <label><input type="checkbox" name="wthdrawAt" id="wthdrawAtSaveFormPubwks005" maxlength="1"/><i class="input-helper"></i></label>
                                        </div>
                                        <button type="button" id="wthdrawRequestBtn" class="btn_common01_new">철회신청</button>
                                    </td>
                                    <th>철회 신청상태</th>
                                    <td>
                                        <input type="text" name="wthdrawElctsctSttusCodeNm" id="wthdrawElctsctSttusCodeNmSaveFormPubwks005" style="width:97%; text-align: center;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>철회 사유</th>
                                    <td colspan="3"><input type="text" name="wthdrawRm" id="wthdrawRmSaveFormPubwks005" maxlength="200" style="width: 98.5%"/></td>
                                </tr>     
                            </table>
                        </form>
                    </div>  <!--//detail_type01--> 
                    <!-- 폼이 두개인 경우 아래 추가 
                    <div>
                        <div class="div_title">
                            <div class="left ml5"></div>
                            <div class="right mr5"></div>
                        </div>
                        <div class="mt5">
                            <div class="detail_type01">
                            </div>
                        </div>
                    </div>
                    폼이 두개인 경우 여기까지 추가 --> 
                </div>  <!--// outer_line_form -->
            </div><!-- //오른쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
