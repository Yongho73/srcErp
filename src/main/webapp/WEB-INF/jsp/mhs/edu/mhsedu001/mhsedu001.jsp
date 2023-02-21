<!-- 
 *    프로그램       : 교육과정등록 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.19
 *    사용테이블      : MHS_EDUCRSE
 * sourceGen version : 2020.07.16.01 (2020.08.19)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/edu/mhsedu001/mhsedu001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhsedu001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhsedu001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhsedu001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhsedu001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhsedu001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">교육과정명<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <input name="educourseNm" id="educourseNmSearchFormMhsedu001">
                        </li>
                        <li id="date2"><span class="span">교육일자</span>
                            <input type="text" name="stDate" id="stDate" class="input_calen">~ 
                            <input type="text" name="edDate" id="edDate" class="input_calen">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li>
                            <span class="span">교육분류<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <div id="divComboSearcheduCls" class="div_combo"></div>
                        </li>
                         <li>
                            <span class="span">필수여부<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <div id="divComboSearcheduMustAt" class="div_combo"></div>
                        </li>
                        <li>
                            <span class="span">처리상태<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <div id="divComboSearchelctsctSttusCode" class="div_combo"></div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhsedu001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhsedu001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMhsedu001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhsedu001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhsedu001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <div class="left"></div>
                    <div class="right">
                        <button class="div_title_btn" id="btnBugtcopy" type="button">복사</button>
                    </div>
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormMhsedu001">
                            <table>
                                <caption>교육과정등록<!-- <taglibs:transText progrmId="default" key="titMhsedu001"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="200">
                                    <col width="100">
                                    <col width="200">
                                    <col width="100">
                                    <col width="200">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">교육과정코드<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></th>
                                    <td>
                                        <input type="text" name="educourseCode" id="educourseCodeSaveFormMhsedu001" maxlength="20" style="width: 50%" readonly/>
                                        <input type="text" name="elctsctSeSn" maxlength="20" style="width: 20%" readonly/>
                                    </td>
                                    <th class="essential_icon">교육과정명<!-- <taglibs:transText progrmId="default" key="titEducourseNm"/> --></th>
                                    <td colspan="3">
                                        <input required="true" type="text" name="educourseNm" id="educourseNmSaveFormMhsedu001" maxlength="100" style="width: 40%"/>
                                    </td>
                                </tr>
<!--                                 <tr> -->
                                    <th>교육목적<!-- <taglibs:transText progrmId="default" key="titEduPurps"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="eduPurps" id="eduPurpsSaveFormMhsedu001" maxlength="2000" style="width: 99%; height:52px;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">교육기간<!-- <taglibs:transText progrmId="default" key="titEduSdt"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="eduSdt" id="eduSdt" class="input_calen" maxlength="10" style="width: 15%"/>
                                        <input type="time" value="00:00" name="eduShr" id="eduShrSaveFormMhsedu001" maxlength="20" style="width: 15%"/>
                                        <div id="date2_cal" style="position:absolute; top:25px;"></div>
                                        &nbsp;&nbsp;~&nbsp;&nbsp; 
                                        <input type="text" name="eduEdt" id="eduEdt" class="input_calen" maxlength="10" style="width: 15%"/>
                                        <input type="time" value="00:00" name="eduEhr" id="eduEhrSaveFormMhsedu001" maxlength="20" style="width: 15%"/>
                                        <input type="text" name="eduDaycnt" id="eduDaycntSaveFormMhsedu001" maxlength="22" style="width: 10%"/>
                                                                                            일       
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">교육분류<!-- <taglibs:transText progrmId="default" key="titEduCls"/> --></th>
                                    <td>
                                        <div id="divComboeduCls" class="div_combo"></div>
                                    </td>
                                    <th class="essential_icon">교육종류<!-- <taglibs:transText progrmId="default" key="titEduKind"/> --></th>
                                    <td>
                                        <div id="divComboeduKind" class="div_combo"></div>
                                    </td>
                                    <th class="essential_icon">교육필수여부<!-- <taglibs:transText progrmId="default" key="titEduMustAt"/> --></th>
                                    <td>    
                                        <div id="divComboeduMustAt" class="div_combo"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">교육비용부담<!-- <taglibs:transText progrmId="default" key="titEduAmtBurdenSe"/> --></th>
                                    <td>
                                        <div id="divComboeduAmtBurdenSe" class="div_combo"></div>
                                    </td>
                                    <th class="essential_icon">내외부교육<!-- <taglibs:transText progrmId="default" key="titInnerExtrlEduSe"/> --></th>
                                    <td>
                                        <div id="divComboinnerExtrlEduSe" class="div_combo"></div>
                                    </td>
                                    <th>총이수학점<!-- <taglibs:transText progrmId="default" key="titTotFinishPnt"/> --></th>
                                    <td>
                                        <input type="text" name="totFinishPnt" id="totFinishPntSaveFormMhsedu001" maxlength="10" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>교육기관<!-- <taglibs:transText progrmId="default" key="titEduInstt"/> --></th>
                                    <td>
                                        <input type="text" name="eduInstt" id="eduInsttSaveFormMhsedu001" maxlength="100" style="width: 50%"/>
                                    </td>
                                    <th>대상인원<!-- <taglibs:transText progrmId="default" key="titTrgetCnt"/> --></th>
                                    <td>
                                        <input type="text" name="trgetCnt" id="trgetCntSaveFormMhsedu001" maxlength="22" style="width: 50%"/>
                                    </td>
                                    <th>교육장소<!-- <taglibs:transText progrmId="default" key="titEduZone"/> --></th>
                                    <td>
                                        <input type="text" name="eduZone" id="eduZoneSaveFormMhsedu001" maxlength="100" style="width: 95%"/>
                                    </td>
                                </tr>
                                <tr>
<!--                                     <th>교육기관주소<taglibs:transText progrmId="default" key="titEduInsttAdres"/></th> -->
<!--                                     <td> -->
<!--                                         <input type="text" name="eduInsttAdres" id="eduInsttAdresSaveFormMhsedu001" maxlength="100" style="width: 50%"/> -->
<!--                                     </td> -->
                                    <th>강사사원여부</th>
                                    <td>
                                    <div class="checkbox">
                                        <label>
                                        <input type="checkbox" name="chrgInstructorEmplAt" id="chrgInstructorEmplAtSaveFormMhsedu001" maxlength="1"/>
                                        <i class="input-helper"></i>
                                        </label>
                                    </div>
                                    </td>
                                    <th class="essential_icon">담당강사<!-- <taglibs:transText progrmId="default" key="titChrgInstructor"/> --></th>
                                    <td colspan="3">
                                        <input type="text" name="chrgInstructor" id="chrgInstructorSaveFormMhsedu001" maxlength="20" style="width: 30%"/>
                                        <button type="button" id="btnpostCodeSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"></span>
                                        </button>
                                        <input required="true" type="text" name="chrgInstructorNm" id="chrgInstructorNmSaveFormMhsedu001" maxlength="50" style="width: 20%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>개인교육비<!-- <taglibs:transText progrmId="default" key="titIndvdlEducost"/> --></th>
                                    <td>
                                        <input type="text" name="indvdlEducost" id="indvdlEducostSaveFormMhsedu001" maxlength="20" style="width: 50%; text-align: right;"/>
                                    </td>
                                    <th>외래강사수당<!-- <taglibs:transText progrmId="default" key="titExtrlInstructorAllwnc"/> --></th>
                                    <td>
                                        <input type="text" name="extrlInstructorAllwnc" id="extrlInstructorAllwncSaveFormMhsedu001" maxlength="22" style="width: 50%; text-align: right;"/>
                                    </td>
                                    <th>고용보험환급액<!-- <taglibs:transText progrmId="default" key="titEpisRetunamt"/> --></th>
                                    <td>
                                        <input type="text" name="episRetunamt" id="episRetunamtSaveFormMhsedu001" maxlength="22" style="width: 50%; text-align: right;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>처리상태<!-- <taglibs:transText progrmId="default" key="titExtrlInstructorAllwnc"/> --></th>
                                    <td>
                                        <div id="divComboelctsctSttusCode" class="div_combo"></div>
                                    </td> 
                                    <th>수료증발행여부<!-- <taglibs:transText progrmId="default" key="titCochrgedocumentIsuAt"/> --></th>
                                    <td>
                                    <div class="checkbox">
                                        <label>
                                        <input type="checkbox" name="cochrgedocumentIsuAt" id="cochrgedocumentIsuAtSaveFormMhsedu001" maxlength="1"/>
                                        <i class="input-helper"></i>
                                        </label>
                                    </div>
                                    </td>
                                    <th>설문조사코드</th>
                                    <td>
                                        <input type="hidden" name="qestnarCode"/>
                                        <input type="text" name="qestnarNm" id="qestnarNm"/>
                                        <button type="button" id="btnqestnarCodeSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"></span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>교육이수시간</th>
                                    <td colspan="5">
                                        <div class="mt5 outer_line_grid" style="width: 994px; height:calc(100vh - 763px) !important;">
                                            <div class="dhtml_line" style="width: 994px; height:calc(100vh - 763px) !important;"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                                            <div class="dhtml_grid" id="dataListMhseduTime"> <!-- 그리드 영역 -->
                                            </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <button type="button" class="btn_common02" id="fileUpload3">
                                                <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                        </button>
                                    </th>
                                    <td colspan="5" id="fileList3">
                                        <input type="hidden" name="atchmnflList" id="atchmnflList"/>
                                            <input type="hidden" name="atchmnfl" id="atchmnfl"/>
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
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="rm" id="rmSaveFormMhsedu001" maxlength="1000" style="width: 99%; height:60px;"/>
                                    </td>
                                </tr>
<!--                                 <tr> -->
<!--                                     <th>반려 사유<taglibs:transText progrmId="default" key="titReturnResn"/></th> -->
<!--                                     <td><input type="text" name="returnResn" id="returnResnSaveFormMhsedu001" maxlength="200" style="width: 50%"/></td> -->
<!--                                 </tr> -->
                            </table>
                        </form>
                    </div>  <!--//detail_type01-->
                     
                    <div><!-- 타이틀영역 -->
                          <div class="div_title">
                              <div class="left"> <!-- 타이틀영역(좌측) //-->
                                  <span class="table_sumnum" id="spanCntSearchFormMhseduEmp">0</span>
                              </div>
                              <div class="right"><!-- 타이틀영역(우측) //-->
                              <ul class="btn">
                                    <li>
                                        <button type="button" id="btnAddStmCode" class="btn_common01_new">
                                                                                                추가
                                        </button>
                                        <button type="button" id="btnRemoveStmCode" class="btn_common01_new">
                                                                                                삭제
                                        </button>
                                        <button type="button" id="btnSaveStmCode" class="btn_common01_new">
                                            <taglibs:transText progrmId="default" key="btnSave" />
                                        </button>
                                    </li>
                                </ul>
                              </div>
                         </div>
                    <div class="mt5 outer_line_grid" style="height:calc(100vh - 732px) !important;">
                    <div class="dhtml_line" style="height:calc(100vh - 732px) !important;"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhseduEmp"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                </div>
            </div><!-- //왼쪽 영역 item4 end -->
                </div>
                
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
