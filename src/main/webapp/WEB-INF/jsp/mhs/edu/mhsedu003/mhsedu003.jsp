<!-- 
 *    프로그램       : 교육결과보고 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.09
 *    사용테이블      : MHS_EDU_RESULT_REPORT
 * sourceGen version : 2020.08.06.01 (2020.09.09)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/edu/mhsedu003/mhsedu003.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnAddMhsedu003"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
<!--                     <li><a href="#none" id="btnRemoveMhsedu003"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMhsedu003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhsedu003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormMhsedu003">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id=deptCode autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearchMhsedu003" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 60px;"/>
                            <input type="hidden" name="deptNm" id="deptNm" style="width: 50%"/>     
                            <button type="button" id="btnempnoSearchMhsedu003" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                        <li>
                            <span class="span">처리상태<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <div id="divComboSearchelctsctSttusCode" class="div_combo"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="consearch_div">
                <div class="consearch_input">
                    <ul class="consearchinput_list">
                         <li>
                            <span class="span">교육과정명<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <input name="educourseNm" id="educourseNmSearchFormMhsedu003">
                        </li>
                        <li id="date2"><span class="span">교육일자<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <input type="text" name="stDate" id="stDate" class="input_calen">~ 
                            <input type="text" name="edDate" id="edDate" class="input_calen">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>  
                    </ul>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMhsedu003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMhsedu003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        <div class="flex">
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMhsedu003">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid" style="height: calc(100vh - 160px) !important;">
                    <div class="dhtml_line" style="height: calc(100vh - 160px) !important;"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhsedu003" style="height: calc(100vh - 160px) !important;"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhsedu003">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <div class="left"></div>
                    <div class="right">
                        <div class="right">
                         <button class="div_title_btn" type="button" id="btnBugtAdd">전자결재</button>
                        <button class="div_title_btn" id="btnBugtcopy" type="button">복사</button>
                    </div>
                    </div>
                </div>
                <div class="mt5 outer_line_form" style="min-height: calc(100vh - 160px) !important;">
                    <div class="detail_type01">
                        <form id="saveFormMhsedu003">
                            <table>
                                <caption>교육결과보고<!-- <taglibs:transText progrmId="default" key="titMhsedu003"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="200">
                                    <col width="100">
                                    <col width="200">
                                    <col width="100">
                                    <col width="200">
                                </colgroup>
                                <tr>
                                    <th>교육과정코드<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></th>
                                    <td>
                                        <input required="true" type="text" name="educourseCode" id="educourseCodeSaveFormMhsedu003" maxlength="20" style="width: 50%"/>
                                        <input required="true" type="text" name="elctsctSeSn" id="elctsctSeSnSaveFormMhsedu003" maxlength="22" style="width: 20%"/>
                                    </td>
                                    <th>처리상태<!-- <taglibs:transText progrmId="default" key="titElctsctSttusCode"/> --></th>
                                    <td>
                                        <div id="divComboelctsctSttusCode" class="div_combo"></div>
                                    </td>
                                    <th>수료증발행여부</th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="cochrgedocumentIsuAt" id="cochrgedocumentIsuAtSaveFormMhsedu003" maxlength="1"/>
                                            <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>반려 사유<!-- <taglibs:transText progrmId="default" key="titReturnResn"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="returnResn" id="returnResnSaveFormMhsedu003" maxlength="200" style="width: 99%; height:80px;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>교육과정명</th>
                                    <td>
                                        <input type="text" name="educourseNm" id="educourseNmSaveFormMhsedu003" maxlength="100" style="width: 50%"/>
                                    </td>
                                    <th>교육분류</th>
                                    <td>
                                        <div id="divComboeduCls" class="div_combo"></div>
                                    </td>
                                    <th>교육종류</th>
                                    <td>
                                        <div id="divComboeduKind" class="div_combo"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>교육필수여부</th>
                                    <td>
                                        <div id="divComboeduMustAt" class="div_combo"></div>
                                    </td>
                                    <th>교육비용부담</th>
                                    <td>
                                        <div id="divComboeduAmtBurdenSe" class="div_combo"></div>
                                    </td>
                                    <th>내외부교육구분</th>
                                    <td>
                                        <div id="divComboinnerExtrlEduSe" class="div_combo"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">교육기간<!-- <taglibs:transText progrmId="default" key="titEduSdt"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="eduSdt" id="eduSdt" class="input_calen" maxlength="10" style="width: 15%"/>
                                        <input type="time" value="00:00" name="eduShr" id="eduShrSaveFormMhsedu003" maxlength="20" style="width: 15%"/>
                                        <div id="date2_cal" style="position:absolute; top:25px;"></div>
                                        &nbsp;&nbsp;~&nbsp;&nbsp; 
                                        <input type="text" name="eduEdt" id="eduEdt" class="input_calen" maxlength="10" style="width: 15%"/>
                                        <input type="time" value="00:00" name="eduEhr" id="eduEhrSaveFormMhsedu003" maxlength="20" style="width: 15%"/>
                                        <input type="text" name="eduDaycnt" id="eduDaycntSaveFormMhsedu003" maxlength="22" style="width: 10%"/>
                                                                                            일       
                                    </td>
                                </tr>
                                <tr>
                                    <th>이수시간<!-- <taglibs:transText progrmId="default" key="titTotFinishTime"/> --></th>
                                    <td>
                                        <input type="text" name="totFinishTime" id="totFinishTimeSaveFormMhsedu003" maxlength="4" style="width: 50%"/>
                                    </td>
                                    <th>교육기관<!-- <taglibs:transText progrmId="default" key="titEduInstt"/> --></th>
                                    <td>
                                        <input type="text" name="eduInstt" id="eduInsttSaveFormMhsedu003" maxlength="100" style="width: 50%"/>
                                    </td>
                                    <th>교육장소<!-- <taglibs:transText progrmId="default" key="titEduInsttAdres"/> --></th>
                                    <td>
                                        <input type="text" name="eduInsttAdres" id="eduInsttAdresSaveFormMhsedu003" maxlength="100" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">교육비<!-- <taglibs:transText progrmId="default" key="titTotEducost"/> --></th>
                                    <td>
                                        <input type="text" name="indvdlEducost" id="indvdlEducostSaveFormMhsedu003" maxlength="22" style="width: 50%"/>
                                    </td>
                                    <th>고용보험환급액<!-- <taglibs:transText progrmId="default" key="titEpisRetunamt"/> --></th>
                                    <td>
                                        <input type="text" name="episRetunamt" id="episRetunamtSaveFormMhsedu003" maxlength="22" style="width: 50%"/>
                                    </td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">교육내용<!-- <taglibs:transText progrmId="default" key="titEduCn"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="eduCn" id="eduCnSaveFormMhsedu003" maxlength="2000" style="width: 99%; height:50px;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>업무적용계획<!-- <taglibs:transText progrmId="default" key="titJobApplcPlan"/> --></th>
                                    <td colspan="3">
                                        <input type="text" name="jobApplcPlan" id="jobApplcPlanSaveFormMhsedu003" maxlength="1000" style="width: 50%"/>
                                    </td>
                                    <th class="essential_icon">유효성평가</th>
                                    <td>
                                        <div id="divCombostsfdgCode" class="div_combo"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">건의사항<!-- <taglibs:transText progrmId="default" key="titRequstDesc"/> --></th>
                                    <td colspan="3">
                                        <input type="text" name="requstDesc" id="requstDescSaveFormMhsedu003" maxlength="1000" style="width: 50%"/>
                                    </td>
                                    <th>설문참여<taglibs:transText progrmId="default" key="titQestnarCode"/></th>
                                    <td>
                                        <input type="text" name="qestnarCode" id="qestnarCodeSaveFormMhsedu003" readonly/>
                                        <button type="button" id="btneducourseCodeSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"></span>
                                        </button>
                                        <input type="checkbox" id="requstDescOk" maxlength="1"/>
                                    </td>
                                </tr>
<!--                                 <tr> -->
<!--                                     <th>기타사유</th> -->
<!--                                     <td> -->
<!--                                         <input type="text" name="rm" id="rmSaveFormMhsedu003" maxlength="10" style="width: 50%"/> -->
<!--                                     </td> -->
<!--                                 </tr> -->
                                <tr>
                                    <th class="essential_icon">
                                        <button type="button" class="btn_common02" id="fileUpload3">
                                                <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                        </button>
                                    </th>
                                    <td colspan="5" id="fileList3">
                                        <input type="hidden" name="atchmnflList" id="atchmnflList" required/>
                                            <input type="hidden" name="atchmnfl" id="atchmnfl" required/>
                                            <div class="file_box">
                                                <table>
                                                    <colgroup>
                                                        <col width="310" />
                                                        <col width="80" />
                                                        <col width="80" />
                                                    </colgroup>
                                                    <tr>
                                                        <td colspan="3" class="ac">첨부파일이 없습니다.</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        <span style="color:red"> 파일전송 후 반드시  "저장" 버튼을 클릭하여 파일정보를 저장해야 합니다.</span>                                    
                                        </div>
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
