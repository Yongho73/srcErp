<!-- 
 *    프로그램       : 급여계산/조정 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.03
 *    사용테이블      : MPS_SALARY_PYMNT
 * sourceGen version : 2020.06.29.01 (2020.07.03)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal005/mpscal005.js"></script>
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
    
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
<!--                     <li><a href="#none" id="btnAddStmUsers"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li> -->
<!--                     <li><a href="#none" id="btnRemoveStmUsers"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li> -->

                    <li><a href="#none" id="btnSaveMpscal005"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
<!--                     <li><a href="#none" id="btnExcelStmUsers"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li> -->
                </ul>
            </div>
        </div>                    
                    
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpscal005">
                    <ul class="consearchinput_list">
<!--                         <li><span class="span"><label for="docmT">귀속년월</span> -->
<!--                             <input type="text" name="applcYm" id="date_month" class="input_calen" size="7" maxlength="7"> -->
<!--                         </li> -->
                        <li><span class="span">지급일자</span>
                            <input type="text" name=pymntSn id="pymntSnSaveFormMpscal013" style="width: 50px;" readonly/>
                            <input type="hidden" name=closAt id="closAtSaveFormMpscal013"/>
                            <input type="hidden" name=applcYm id="applcYmSaveFormMpscal013"/>
                            <input type="text" name=pymntDe id="pymntDeSaveFormMpscal013" maxlength="20" style="width: 100px;" readonly/>
                            <input type="text" name=salarytyCodeNm id="salarytyCodeNmSaveFormMpscal013" maxlength="20" style="width: 50px;" readonly/>
                            <input type="text" name=pymntDtls id="pymntDtlsNmSaveFormMpscal013" maxlength="20" style="width: 150px;" readonly/>
                            <button type="button" id="btnPymntDeSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                        </li>
                         <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearchSearchFormMpscal005" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 60px;"/>
                            <input type="hidden" name="deptNm" id="deptNm" style="width: 50%"/>     
                            <button type="button" id="btnempnoSearchSearchFormMpscal005" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpscal005"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpscal005"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>

        <div class="flex">
              <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                 <!-- 타이틀영역 -->
                <div class="div_title">
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="table_sumnum ml5" id="spanCntSearchFormMpscal005">0</span>
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right ml7">
                        <button class="div_title_btn" id="Sumbtn" type="button"><i class="axi axi-krw mr5"></i>급여계산</button>
                    </div>
                    
                </div>
                <!--// 타이틀영역 -->

                                <div class="mt5 outer_line_2dangrid" style="height:calc(100vh - 28vh) !important;">
                    <div class="dhtml_line" style="height:calc(72vh) !important;"> <!-- paging (72vh - 60px) -->
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->

                        <div id="dataListMpscalEmp" class="dhtml_grid">

                        </div>
                    </div>
                </div>

            </div><!-- //왼쪽 영역 item end -->
            
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 타이틀영역(좌측) --
                    <div class="left">
                        <span class="table_sumnum ml5">0</span>
                    </div>
                    <!-- 타이틀영역(우측)
                    <div class="right">
                        <div class="right ml7">
                            <button><i class="axi axi-krw mr5"></i><span>급여계산</span></button>
                        </div>
                    </div>-->
                </div>
                <div class="mt5 outer_line" style="width:100%;">
                    <div class="detail_type01">
                        <form id="saveFormEmpmpscal005" novalidate="novalidate">
                            <table>
                                <caption>직원</caption>
                                <colgroup>
                                    <col>
                                    <col>
                                    <col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>입사일자</th>
                                        <td>
                                            <input type="text" name="ecnyDe" id="ecnyDe" maxlength="50" class="w90p" autocomplete="off" readonly style="background-color: white;">
                                        </td>
                                        <th>퇴사일자</th>
                                        <td>
                                            <input type="text" name="retireDe" id="retireDe" maxlength="50" class="w90p" autocomplete="off" readonly style="background-color: white;">
                                        </td>
                                        <th>사원구분</th>
                                        <td>
                                            <input type="text" name="emplSe" id="emplSe" maxlength="50" class="w90p" autocomplete="off" readonly style="background-color: white;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>직종</th>
                                        <td>
                                            <input type="text" name="jssfcCode" id="jssfcCode" maxlength="50" class="w90p" autocomplete="off" readonly style="background-color: white;">                                         </td>
                                        <th>직위</th>
                                        <td>
                                            <input type="text" name="ofcpsCode" id="ofcpsCode" maxlength="50" class="w90p" autocomplete="off" readonly style="background-color: white;">
<!--                                             <div id="divInputFormTab1LastAcdncrCode" class="div_combo"> -->
<!--                                             <select name="tab1LastAcdncrCode" id="tab1LastAcdncrCode" disabled=""> -->
<!--                                                     <option value="410">파트장</option> -->
<!--                                                 </select></div> -->
                                        </td>
                                        <th>직무분야</th>
                                        <td>
                                            <input type="text" name="dtyCode" id="dtyCode" maxlength="50" class="w90p" autocomplete="off" readonly style="background-color: white;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>직급 / 호봉</th>
                                        <td>
                                            <input type="text" name="clsfCode" id="clsfCode" maxlength="50" autocomplete="off" readonly style="background-color: white;">
                                            <input type="text" name="srclsCode" id="srclsCode" maxlength="50" autocomplete="off" readonly style="background-color: white;">
                                        </td>
                                        <th>직책</th>
                                        <td>
                                            <input type="text" name="rspofcCode" id="rspofcCode" maxlength="50" class="w90p" autocomplete="off" readonly style="background-color: white;">
                                        </td>
                                        <th>급여보수체계</th>
                                        <td>
                                            <input type="text" name="salaryAprpCode" id="salaryAprpCode" maxlength="50" class="w90p" autocomplete="off" readonly style="background-color: white;">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <!--//detail_type01-->
                    
                </div>
            
                <div style="width:100%;margin-top:5px;">
                
                    <div style="width:calc(50% - 5px); float:left;">
                        
                        <div class="outer_line" style="width:100%; float:left;">
                            <div style="width:100%;height:calc(70vh - 130px);">
                                <div id="dataListMpscal005" class="dhtml_grid">
            
                                </div>
                            </div>
                            <div class="detail_type01">
                            <form id="Mpscal005Sum" novalidate="novalidate">
                                <table>
                                    <caption>직원</caption>
                                    <colgroup>
                                        <col>
                                        <col>
                                        <col>
                                        <col>
                                        <col>
                                        <col>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th class="bbnone">과세</th>
                                            <td class="bbnone" style="width: 201px;">
                                                <input type="text" name="totMpscalAmt01" id="totMpscalAmt01" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                            </td>
                                            <th class="bbnone">비과세</th>
                                            <td class="bbnone">
                                                <input type="text" name="totMpscalAmt02" id="totMpscalAmt02" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                      </div>
                        </div>
                    </div>
                    
                    <div style="width:calc(50% - 5px); float:right;">
                        <div class="outer_line" style="width:100%; float:right;">
                            <div style="width:100%;height:calc(70vh - 130px);">
                                <div id="dataListMpscalItem" class="dhtml_grid">
            
                                </div>
                            </div>
                            <div class="detail_type01">
                            <form id="MpscalItemSum" novalidate="novalidate">
                                <table>
                                    <caption>직원</caption>
                                    <colgroup>
                                        <col>
                                        <col>
                                        <col>
                                        <col>
                                        <col>
                                        <col>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th class="bbnone" style="width: 126px;">실지급액</th>
                                            <td class="bbnone">
                                                <input type="text" name="totSum" id="totSum" class="w90p ar pr5" autocomplete="off" readonly="readonly"  style="width: 370px;">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                      </div>
                        </div>
                    </div>
                </div> <!-- //2_2단 중간 전체 div -->
                
                
            
            </div>
            
        </div><!-- //flex end -->
        
        <div class="flex" style="margin-top:10px"> 
            <div class="item">
                <div class="mt5 outer_line_2danform" style="height:102px !important;overflow:hidden !important;">
                    <div class="dhtml_line_2dan" style="height:100% !important;">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                        <div class="detail_type01">
                        <form id="saveFormEmpmpscalItem" novalidate="novalidate">
                            <table>
                                <caption>직원</caption>
                                <colgroup>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>과세합계</th>
                                        <td>
                                            <input type="text" name="taxtAmt" id="taxtAmt" class="w90p ar pr5" autocomplete="off" readonly>
                                        </td>
                                        <th>비과세</th>
                                        <td>
                                            <input type="text" name="taxtSttemnt" id="taxtSttemnt" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                        <th></th>
                                        <td></td>
                                        <th>총합계</th>
                                        <td>
                                            <input type="text" name="SumTaxtAmt" id="SumTaxtAmt" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>국민연금</th>
                                        <td>
                                            <input type="text" name="salaryitemS00" id="salaryitemS00" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                        <th>건강보험</th>
                                        <td>
                                            <input type="text" name="salaryitemS10" id="salaryitemS10" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                        <th>장기요양보험</th>
                                        <td>
                                            <input type="text" name="salaryitemSR1" id="salaryitemSR1" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                        <th>고용보험</th>
                                        <td>
                                            <input type="text" name="salaryitemS20" id="salaryitemS20" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>소득세</th>
                                        <td>
                                            <input type="text" name="salaryitemT00" id="salaryitemT00" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                        <th>지방소득세</th>
                                        <td>
                                            <input type="text" name="salaryitemT10" id="salaryitemT10" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                        <th></th>
                                        <td></td>
                                        <th>공제합계</th>
                                        <td>
                                            <input type="text" name="SumTaxtItemAmt" id="SumTaxtItemAmt" class="w90p ar pr5" autocomplete="off" readonly="readonly">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                        
                    </div>
            </div>            
        </div>
         
     </div><!-- //wrapper_con end -->
    </div>

</body>