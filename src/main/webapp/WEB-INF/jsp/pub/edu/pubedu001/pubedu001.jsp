<!-- 
 *    프로그램       : 교육조회및신청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.01
 *    사용테이블      : MHS_EDUREQST
 * sourceGen version : 2020.08.06.01 (2020.09.01)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pub/edu/pubedu001/pubedu001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddPubedu001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePubedu001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePubedu001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelPubedu001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormPubedu001">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCodesearchFormPubedu001" autocomplete="off" style="width:60px;" disabled>
                            <input type="text" name="deptCodeNm" id="deptCodeNmsearchFormPubedu001" autocomplete="off" disabled>
                            <button type="button" id="btnDeptSearchsearchFormPubedu001" class="btn_common03" disabled>
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empnosearchFormPubedu001" style="width: 60px;" disabled/>
                            <input type="text" name="empNm" id="empNmsearchFormPubedu001" style="width: 60px;" disabled/>
                            <input type="hidden" name="deptNm" id="deptNmsearchFormPubedu001" style="width: 50%" disabled/>     
                            <button type="button" id="btnEmpSearchsearchFormPubedu001" class="btn_common03" disabled>
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                        <li>
                            <span class="span">처리상태<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <div id="divComboSearchconfmSttusCode" class="div_combo"></div>
                        </li>
                    </ul>
               </div>
           </div>
            <div class="consearch_div">
                <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span">교육과정명<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <input name="educourseNm" id="educourseNmSearchFormPubedu001">
                        </li>
                        <li>
                            <span class="span">교육일자<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></span>
                            <select id="checkDe" name="checkDe">
                                <option value="">전체</option>
                                <option value="0">교육일자</option>
                                <option value="1">신청일자</option>
                            </select>
                        </li>
                        <li id="date2">
                            <input type="text" name="stDate" id="stDate" class="input_calen">~ 
                            <input type="text" name="edDate" id="edDate" class="input_calen">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                    </ul>
            </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchPubedu001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetPubedu001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        <div class="flex">
            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormPubedu001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPubedu001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPubedu001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                   <div class="left"></div>
                    <div class="right">
                         <button class="div_title_btn" type="button" id="btnBugtAdd">승인신청</button>
                        <button class="div_title_btn" id="btnBugtcopy" type="button">복사</button>
                    </div>
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormPubedu001">
                            <table>
                                <caption>교육조회및신청<!-- <taglibs:transText progrmId="default" key="titPubedu001"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="200">
                                    <col width="100">
                                    <col width="200">
                                    <col width="100">
                                    <col width="200">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">사원번호<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td>
                                        <input required="true" type="text" name="empno" id="empnoSaveFormPubedu001" maxlength="10" style="width: 20%" readonly/>
                                        <input required="true" type="text" name="korNm" id="empnoSaveFormPubedu001" maxlength="10" style="width: 50%" readonly/>    
                                    </td>
                                    <th class="essential_icon">교육신청순번<!-- <taglibs:transText progrmId="default" key="titEdureqstSn"/> --></th>
                                    <td>
                                        <input type="text" name="edureqstSn" id="edureqstSnSaveFormPubedu001" maxlength="22" style="width: 50%" readonly/>
                                    </td>
                                    <th>신청일자<!-- <taglibs:transText progrmId="default" key="titEducourseNm"/> --></th>
                                    <td>
                                        <input type="text" name="reqstDe" id="reqstDe" class="input_calen" maxlength=10;" style="width: 40%" readonly/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">교육과정코드<!-- <taglibs:transText progrmId="default" key="titEducourseCode"/> --></th>
                                    <td>
                                        <input type="text" name="educourseCode" id="educourseCodeSaveFormPubedu001" maxlength="20" style="width: 50%" readonly/>
                                        <input type="text" name="elctsctSeSn" id="elctsctSeSnSaveFormPubedu001" maxlength="22" style="width: 20%" readonly/>
                                        <button type="button" id="btneducourseCodeSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"></span>
                                        </button>
                                        
                                    </td>
                                    <th class="essential_icon">교육과정명<!-- <taglibs:transText progrmId="default" key="titEducourseNm"/> --></th>
                                    <td>
                                        <input type="text" name="educourseNm" id="educourseNmSaveFormPubedu001" maxlength="100" style="width: 40%"/>
                                    </td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>교육목적<!-- <taglibs:transText progrmId="default" key="titEduPurps"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="eduPurps" id="eduPurpsSaveFormPubedu001" maxlength="2000" style="width: 99%; height:52px;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">교육기간<!-- <taglibs:transText progrmId="default" key="titEduSdt"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="eduSdt" id="eduSdt" class="input_calen" maxlength="10" style="width: 15%"/>
                                        <input type="time" value="00:00" name="eduShr" id="eduShrSaveFormPubedu001" maxlength="20" style="width: 15%"/>
                                        <div id="date2_cal" style="position:absolute; top:25px;"></div>
                                        &nbsp;&nbsp;~&nbsp;&nbsp; 
                                        <input type="text" name="eduEdt" id="eduEdt" class="input_calen" maxlength="10" style="width: 15%"/>
                                        <input type="time" value="00:00" name="eduEhr" id="eduEhrSaveFormPubedu001" maxlength="20" style="width: 15%"/>
                                        <input type="text" name="eduDaycnt" id="eduDaycntSaveFormPubedu001" maxlength="22" style="width: 10%"/>
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
                                    <th class="essential_icon">교육비용부담<!-- <taglibs:transText progrmId="default" key="titEduAmtBurdenSe"/> --></th>
                                    <td>
                                        <div id="divComboeduAmtBurdenSe" class="div_combo"></div>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <th class="essential_icon">내외부교육<!-- <taglibs:transText progrmId="default" key="titInnerExtrlEduSe"/> --></th>
                                    <td>
                                        <div id="divComboinnerExtrlEduSe" class="div_combo"></div>
                                    </td>
                                    <th>교육기관<!-- <taglibs:transText progrmId="default" key="titEduInstt"/> --></th>
                                    <td>
                                        <input type="text" name="eduInstt" id="eduInsttSaveFormPubedu001" maxlength="100" style="width: 50%"/>
                                    </td>
                                    <th>교육장소<!-- <taglibs:transText progrmId="default" key="titEduZone"/> --></th>
                                    <td>
                                        <input type="text" name="eduZone" id="eduZoneSaveFormPubedu001" maxlength="100" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>강사사원여부<!-- <taglibs:transText progrmId="default" key="titChrgInstructorEmplAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                        <label>
                                        <input type="checkbox" name="chrgInstructorEmplAt" id="chrgInstructorEmplAtSaveFormPubedu001" maxlength="1"/>
                                        <i class="input-helper"></i>
                                        </label>
                                    </div>
                                    </td>
                                    <th>담당강사<!-- <taglibs:transText progrmId="default" key="titChrgInstructor"/> --></th>
                                    <td colspan="3">
                                        <input type="text" name="chrgInstructor" id="chrgInstructorSaveFormPubedu001" maxlength="20" style="width: 30%"/>
                                         <button type="button" id="btnpostCodeSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"></span>
                                        </button>
                                        <input type="text" name="chrgInstructorNm" id="chrgInstructorNmSaveFormPubedu001" maxlength="50" style="width: 20%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>개인교육비<!-- <taglibs:transText progrmId="default" key="titIndvdlEducost"/> --></th>
                                    <td>
                                        <input type="text" name="indvdlEducost" id="indvdlEducostSaveFormPubedu001" maxlength="20" style="width: 50%; text-align: right;" />
                                    </td>
                                    
                                    <th>고용보험환급액<!-- <taglibs:transText progrmId="default" key="titEpisRetunamt"/> --></th>
                                    <td>
                                        <input type="text" name="episRetunamt" id="episRetunamtSaveFormPubedu001" maxlength="22" style="width: 50%; text-align: right;"/>
                                    </td>
                                    <th>수료증발행여부<!-- <taglibs:transText progrmId="default" key="titCochrgedocumentIsuAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                        <label>
                                        <input type="checkbox" name="cochrgedocumentIsuAt" id="cochrgedocumentIsuAtSaveFormPubedu001" maxlength="1"/>
                                        <i class="input-helper"></i>
                                        </label>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <input type="hidden" name="confmSttusCode">
                                    <th>반려사유<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="5">
                                        <input type="text" name="returnResn" id="SaveFormPubedu001" maxlength="1000" style="width: 99%; height:60px;" readonly/>
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
                                        <input type="text" name="rm" id="rmSaveFormPubedu001" maxlength="1000" style="width: 99%; height:60px;"/>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>  <!--//detail_type01--> 
                    
                    <div>
                        <div class="div_title">
                              <div class="left"> <!-- 타이틀영역(좌측) //-->
                                  <span class="table_sumnum" id="spanCntSearchFormPubeduEmp">0</span>
                              </div>
                              <div class="right"><!-- 타이틀영역(우측) //-->
                              </div>
                         </div>
                        <div class="mt5 outer_line_grid" style="height:calc(100vh - 732px) !important;">
                             <div class="dhtml_line" style="height:calc(100vh - 732px) !important;"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                                 <div class="dhtml_grid" id="dataListPubeduEmp"> <!-- 그리드 영역 -->
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>  <!--// outer_line_form -->
            </div><!-- //오른쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
