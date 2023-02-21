<!-- 
 *    프로그램       : 개인별급여기준등록 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.07
 *    사용테이블      : MPS_MT_SNLRCCHRGE
 * sourceGen version : 2020.06.29.01 (2020.07.07)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal022/mpscal022.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <!-- <li><a href="#none" id="btnAddMpscal022"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpscal022"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->
                    <li><a href="#none" id="btnSaveMpscalEmp"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <!-- <li><a href="#none" id="btnExcelMpscal022"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> -->
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpscal022">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">재직구분</span>
                            <div id="divComboHffsSeBox" class="div_combo"></div>
                        </li>
                        <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id=deptCode autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearchSearchFormMpscal022" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 60px;"/>
                            <input type="hidden" name="deptNm" id="deptNm" style="width: 50%"/>     
                            <button type="button" id="btnempnoSearchSearchFormMpscal022" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpscal022"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpscal022"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMpscal022">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid" style="height: calc(100vh - 130px) !important;">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMpscalEmp" style="height:calc(100vh - 100px);"> <!-- 그리드 영역 -->
                        
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMpscal022">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>사원정보</span>
                    </div>
                    <div class="right"></div>
                    
                </div>
                <div class="mt5 outer_line_form">
                    <div class="detail_type01">
                        <form id="saveFormMpscal022" novalidate="novalidate">
                            <table>
                                <colgroup>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                </colgroup>
                                <tr>
                                   <th><taglibs:transText progrmId="default" key="titEmpno" /></th>
                                   <td><input type="text" name="empno" id="empno" maxlength="15" style="width: 100px;" readOnly disabled/>
                                   </td>
                                   <th><taglibs:transText progrmId="default" key="titEmpNm" /></th>
                                   <td><input type="text" name="korNm" id="korNm" maxlength="20" style="width: 120px;" autocomplete="off" readOnly disabled/>
                                   </td>
                                   <th>부서</th>
                                   <td><input type="text" name="deptCodeNm" id="deptCodeNm" maxlength="20" style="width: 120px;" autocomplete="off" readOnly disabled/>
                                   </td>
                                </tr>
                                <tr>
                                   <th>입사일자</th>
                                   <td><input type="text" name="ecnyDe" id="ecnyDe" maxlength="15" style="width: 100px;" readOnly disabled/>
                                   </td>
                                   <th>퇴사일자</th>
                                   <td><input type="text" name="retireDe" id="retireDe" maxlength="20" style="width: 120px;" autocomplete="off" readOnly disabled/>
                                   </td>
                                   <th>재직구분</th>
                                   <td><div id="divSaveHffsSeBox" class="div_combo"></td>
                                </tr>
                                <tr>
                                   <th>사원구분</th>
                                   <td>
                                       <div id="divInputFormComboEmplSeBox" class="div_combo"></div>
                                   </td>
                                   <th>직책</th>
                                   <td>
                                       <div id="divInputFormComboMhsRspofcCodeBox" class="div_combo"></div>
<!--                                        <input type="text" name="ofcpsCodeNm" id="ofcpsCodeNm" maxlength="20" style="width: 120px;" autocomplete="off" readOnly disabled/> -->
                                   </td>
                                   <th>직무</th>
                                   <td>
                                        <div id="divInputFormComboDtyCodeBox" class="div_combo" name="dtyCodeNm"></div>
<!--                                         <input type="text" name="dtyCode" id="dtyCode" maxlength="20" style="width: 120px;" autocomplete="off" readOnly disabled/> -->
                                   </td>
                                </tr>
                                <tr>
                                   <th>임금피크제</th>
                                   <td>
                                       <div id="salpeakAtSaveForm" name="salpeakAt" maxlength="4" style="width: 120px;"></div>
                                   </td>
                                   <th>유연근무제</th>
                                   <td>
                                       <div id="babyShrtenWorkAtSaveForm" maxlength="4" style="width: 120px;"></div>
                                   </td>
                                   <th>유아기간</th>
                                   <td>
                                       <div id="flexbizAtSaveForm" name="flexbizAt" maxlength="4" style="width: 120px;"></div>
                                   </td>
                                </tr>
                            </table>
                        </form>
                   </div>  <!--//detail_type01--> 
                   <div class="div_title">
                       <div class="left">
                           <span class="s_tit"><i class="axi axi-chevron-right"></i>급여정보</span>
                       </div>
                       <div class="right"></div>
                   </div>
                   <div class="detail_type01">
                       <form id="saveFormMpscalEmp" novalidate="novalidate">
                           <table>
                                <input type="hidden" name="bplcCode">
                                <tr>
                                <!-- class="essential_icon" -->
                                   <th>급여지급형태</th>
                                   <td>
                                       <div id="salaryAprpSaveForm" class="div_combo" style="width: 120px;"></div>
                                   </td>
                                   <th>원천세적용율</th>
                                   <td>
                                       <div id="incmtaxrtSaveForm" class="div_combo" style="width: 120px;"></div>
                                   </td>
                                   <th></th>
                                   <td></td>
                                </tr>
                                <tr>
                                   <th>퇴직연금종류</th>
                                   <td>
                                       <div id="retireSaveForm" class="div_combo"></div>
                                   </td>
                                   <th>퇴직연금가입일자</th>
                                   <td>
                                    <input type="text" name="retireAnntySbscrbDe" id="retireAnntySbscrbDe" class="input_calen" maxlength=10;" style="width: 120px;" />
                                   </td>
                                   <th>퇴직연금예금명</th>
                                   <td>
                                       <input type="text" name="retireAnntyDpstnm" id="retireAnntyDpstnm" maxlength="20" style="width: 120px;" autocomplete="off"/>
                                   </td>
                                </tr>
                                <tr>
                                   <th>은행명</th>
                                   <td>
                                       <div id="retireAnntyBankCodeMpscal" class="div_combo"></div>
                                   </td>
                                   <th>계좌번호</th>
                                   <td>
                                       <input type="text" name="retireAnntyAcnutno" id="retireAnntyAcnutno" maxlength="20" style="width: 120px;" autocomplete="off"/>
                                   </td>
                                   <th></th>
                                   <td>
                                   </td>
                                </tr>
                                
                            </table>
                        </form>
                    </div>  <!--//detail_type01--> 
                   
                    <div id="saveForm" style="padding-top: 20px;">
                        <div  class="list_top02" id="tabbarObj" style="width:100%; height:442px;">
                            <div id="tab1" name="기본">
                                <div class="div_title">
                                    <div class="left ml5">
                                        <span class="table_sumnum" id="spanCntSearchFormMpscalEmp">0</span>
                                    </div>
                                    <div class="right mr5">
                                        <ul class="btn">
                                            <li>
                                                <button type="button" id="btnAddMpscal022" class="btn_common01_new">
                                                                                                                추가
                                                </button>
                                                <button type="button" id="btnSaveMpscal022" class="btn_common01_new">
                                                    <taglibs:transText progrmId="default" key="btnSave" />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            <div class="mt5 outer_line_grid" style="height:calc(100vh - 520px) !important;">
                                    <div class="dhtml_grid" id="dataListMpscal022" style="width:100%;" id="tab1"> <!-- 그리드 영역 -->
                                    </div>

                            </div>
                        </div>
                     </div>
                        <div id="tab2" name="신상정보">
                        </div>
                        <div id="tab3" name="가족">
                        </div>
                        <div id="tab4" name="자격">
                        </div>  
                        <div id="tab5" name="지급공제">
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
