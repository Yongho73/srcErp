<!-- 
 *    프로그램       : 개인별근무유형관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.31
 *    사용테이블      : MHS_INDVDLWORKTYSEL
 * sourceGen version : 2020.07.16.01 (2020.07.31)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pub/wks/pubwks021/pubwks021.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddPubwks021"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePubwks021"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePubwks021"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelPubwks021"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPubwks021">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">근무 유형</span>
                            <div id="divComboWorkTyCode"  class="div_combo"></div>
                        </li>
                        <li><span class="span"><taglibs:transText progrmId="default" key="titDeptCode" /></span>
                            <input class="w90" disabled type="text" name="deptCode" id="deptCode" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input class="w90" disabled type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button readonly="readonly" type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;</li>
                        <li><span class="span">사원</span>
                            <input class="w90" disabled type="text" name="empno" id="empno" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input class="w90" disabled type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button readonly="readonly" type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;</li>
                        <li id="searchUseDt"><span class="span">사용 일자</span>
                             <input type="text" name="searchUseSdt" id="searchUseSdtPubwks021"  class="input_calen"/> ~ 
                             <input type="text" name="searchUseEdt" id="searchUseEdtPubwks021"  class="input_calen"/>
                             <div id="searchUseDt_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                        </li>
                   </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPubwks021"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPubwks021"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item7">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormPubwks021">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPubwks021" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPubwks021">
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
                        <button class="btn_common01_new" id="approvalBtn">승인 신청</button>
<!--                         <button class="btn_common01_new" id="copyBtn">복사</button> -->
                    </div>
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormPubwks021">
                            <table>
                                <caption>개인별근무유형<!-- <taglibs:transText progrmId="default" key="titPubwks021"/> --></caption>
                                <colgroup>
                                    <col width="130">
                                    <col width="">
                                </colgroup>
                                <input type="hidden" name="empno" id="empnoSaveFormPubwks021"/>
                                <input type="hidden" name="workBeginTime" id="workBeginTimeSaveFormPubwks021"/>
                                <input type="hidden" name="workEndTime" id="workEndTimeSaveFormPubwks021"/>
                                <input type="hidden" name="sn" id="snSaveFormPubwks021"/>
                                <input type="hidden" name="confmerEmpno" id="confmerEmpnoSaveFormPubwks021"/>
                                <tr>
                                    <th class="essential_icon">근무 유형 코드<!-- <taglibs:transText progrmId="default" key="titWorkTyCode"/> --></th>
                                    <td colspan="2"><div id="divComboFormWorkTyCode" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 시작 일자<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> --></th>
                                    <td><input type="text" name="useBeginDe" id="useBeginDeSaveFormPubwks021" maxlength="10" class="input_calen" required/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 종료 일자<!-- <taglibs:transText progrmId="default" key="titUseEndDe"/> --></th>
                                    <td><input type="text" name="useEndDe" id="useEndDeSaveFormPubwks021" maxlength="10" class="input_calen" required/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 시작 시간<!-- <taglibs:transText progrmId="default" key="titWorkBeginTime"/> --></th>
                                    <td colspan="2">    
                                        <input type="time" value="00:00" name="workBeginTime" id="workBeginTimeSaveFormPubwks021" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">근무 종료 시간<!-- <taglibs:transText progrmId="default" key="titWorkEndTime"/> --></th>
                                    <td colspan="2">
                                        <input type="time" value="00:00" name="workEndTime" id="workEndTimeSaveFormPubwks021" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td><input type="text" name="rm" id="rmSaveFormPubwks021" maxlength="200" style="width: 97%;"/></td>
                                </tr>
                                <tr>
                                    <th>반려사유<!-- <taglibs:transText progrmId="default" key="titReturnResn"/> --></th>
                                    <td><input type="text" name="returnResn" id="returnResnSaveFormPubwks021" maxlength="1000" style="width: 97%;"/></td>
                                </tr>
                                <tr>
                                    <th>승인 일자<!-- <taglibs:transText progrmId="default" key="titConfmDe"/> --></th>
                                    <td><input type="text" name="confmDe" id="confmDeSaveFormPubwks021" maxlength="8" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>승인자 사원이름<!-- <taglibs:transText progrmId="default" key="titConfmerEmpno"/> --></th>
                                    <td>
                                        <input type="text" name="confmerEmpnm" id="confmerEmpnmSaveFormPubwks021" maxlength="10" style="width: 50%"/>
                                    </td>
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
