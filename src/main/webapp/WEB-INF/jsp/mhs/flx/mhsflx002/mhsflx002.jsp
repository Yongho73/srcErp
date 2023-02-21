<!-- 
 *    프로그램       : 개인별근무유형선택 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.13
 *    사용테이블      : MHS_INDVDLWORKTYSEL
 * sourceGen version : 2020.06.29.01 (2020.07.13)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/flx/mhsflx002/mhsflx002.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhsflx002"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnSaveMhsflx002"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnRemoveMhsflx002"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnExcelMhsflx002"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormMhsflx002">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span"><taglibs:transText progrmId="default" key="titDeptCode" /></span>
                        <input class="w90" type="text" name="deptCode" id="deptCode" maxlength="4" style="width: 60px;" autocomplete="off"/>
                        <input class="w90" type="text" name="deptCodeNm" id="deptCodeNm" maxlength="15" autocomplete="off">
                            <button  type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;</li>
                        <li><span class="span"><taglibs:transText progrmId="default" key="titMhsEmp" /></span>
                            <input class="w90" type="text" name="empno" id="empno" maxlength="6" style="width: 60px;" autocomplete="off"/>
                            <input class="w90" type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button  type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;</li>
                        <li id="searchUseDt"><span class="span">사용 일자</span>
                             <input type="text" name="searchUseSdt" id="searchUseSdtMhsflx002"  class="input_calen" maxlength="10"/> ~ 
                             <input type="text" name="searchUseEdt" id="searchUseEdtMhsflx002"  class="input_calen" maxlength="10"/>
                             <div id="searchUseDt_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
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
                            <span class="span">근무 유형</span>
                            <div id="divComboWorkTyCode"  class="div_combo" style="width: 174px;"></div>
                        </li>
                        <li>
                            <span class="span">승인 상태</span>
                            <div id="divComboConfmSttusCode" class="div_combo"></div>
                        </li>                   
                  </ul>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMhsflx002"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMhsflx002"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        <div class="flex">
            <div class="item7">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMhsflx002">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhsflx002" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhsflx002">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    -->
                    <div class="right">
                        <button type="button" id="approvalRequestBtn" class="btn_common01_new">승인신청</button>
                        <button type="button" id="returnBtn" class="btn_common01_new">반려</button>
                        <button type="button" id="approvaltBtn" class="btn_common01_new">승인</button>
                    </div>
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormMhsflx002">
                            <input type="hidden" name="empno" id="empnoSaveFormMhsflx002" required/>
                            <input type="hidden" name="saveConfmSttusCode" id="confmSttusCodeSaveFormMhsflx002"/>
                            <input type="hidden" name="sn" id="snSaveFormMhsflx002"/>
                            <table>
                                <caption>개인별근무유형선택<!-- <taglibs:transText progrmId="default" key="titMhsflx002"/> --></caption>
                                <colgroup>
                                    <col width="130">
                                    <col width="">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">사원이름<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td colspaan="2">
                                        <input required="true" type="text" name="empnm" id="empnmSaveFormMhsflx002" maxlength="10" style="width: 50%"/>
                                        <button type="button" id="saveBtnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 유형 코드<!-- <taglibs:transText progrmId="default" key="titWorkTyCode"/> --></th>
                                    <td colspan="2"><div id="divComboFormWorkTyCode" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 시작 일자<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> -->
                                    </th>
                                    <td id="saveUseSdt" colspan="2">
                                         <input type="text" name="useBeginDe" id="useBeginDeSaveFormMhsflx002"  class="input_calen" maxlength="10" required/> 
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 종료 일자<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> -->
                                    </th>
                                    <td id="saveUseEdt" colspan="2">
                                         <input type="text" name="useEndDe" id="useEndDeSaveFormMhsflx002"  class="input_calen" maxlength="10" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 시작 시간<!-- <taglibs:transText progrmId="default" key="titWorkBeginTime"/> --></th>
                                    <td colspan="2">
                                        <input type="time" value="00:00" name="workBeginTime" id="workBeginTimeSaveFormMhsflx002"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 종료 시간<!-- <taglibs:transText progrmId="default" key="titWorkEndTime"/> --></th>
                                    <td colspan="2">
                                        <input type="time" value="00:00" name="workEndTime" id="workEndTimeSaveFormMhsflx002"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="2"><input type="text" name="rm" id="rmSaveFormMhsflx002" maxlength="200" style="width: 97%;"/></td>
                                </tr>
                                <tr>
                                    <th>승인 상태</th>
                                    <td>
                                        <input type="text" name="saveConfmSttusCodeNm" id="confmSttusCodeNmSaveFormMhsflx002" style="width: 50$; text-align:center;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>반려 사유</th>
                                    <td>
                                        <input type="text" name="returnResn" id="returnResnSaveFormMhsflx002" style="width:97%;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>승인자 이름<!-- <taglibs:transText progrmId="default" key="titConfmerEmpno"/> --></th>
                                    <input type="hidden" name="confmerEmpno" id="confmerEmpnoSaveFormMhsflx002" maxlength="10" >
                                    <td>
                                        <input type="text" name="confmerEmpnm" id="confmerEmpnmSaveFormMhsflx002" maxlength="10" style="width: 50%; text-align:center;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>승인 일자<!-- <taglibs:transText progrmId="default" key="titConfmDe"/> --></th>
                                    <td colspan="2"><input type="text" name="confmDe" id="confmDeSaveFormMhsflx002" maxlength="8" style="width: 50%; text-align:center;"/></td>
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
