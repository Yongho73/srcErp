<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb001/mhshrb001SearchMhsEmp.js"></script>

<script language="javascript">
</script>


	  <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmUsers"><i class="axi axi-note-add mr5"></i><span>신규</span></a>
                    </li>
                    <li><a href="#none" id="btnRemoveStmUsers"><i
                                class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmUsers"><i class="axi axi-save mr5"></i><span>저장</span></a>
                    </li>
                    <li><a href="#none" id="btnExcelStmUsers"><i
                                class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    <li><a href="#none" id="btnPersonalRecTbl"><i class="axi axi-print mr5"></i><span>인사기록표</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div" id="searchFormMhsEmp">
            <div class="consearch_input">
            
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    
                <form id="searchFormStmUsers">
                    <ul class="consearchinput_list">
                        <li><span class="span"><taglibs:transText progrmId="default" key="titCorpNm" /></span><div id=divComboBplcKorNm  class="div_combo"></div>&nbsp;&nbsp;</li>
                        <li>
                            <span class="span"><taglibs:transText progrmId="default" key="titMhsEmp" /></span><input type="text" name="empno" id="empno" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="empNm" id="empNm" maxlength="15" autocomplete="off"/>
                            <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;
                        </li>
                        <li>
                            <span class="span"><taglibs:transText progrmId="default" key="titDeptCode" /></span><input type="text" name="deptCode" id="deptCode" maxlength="15" style="width: 60px;" autocomplete="off"/>
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>&nbsp;&nbsp;
                        </li>
                        <li><span class="span"><taglibs:transText progrmId="default" key="titHffsSe" /></span><div id=divComboHffsSe  class="div_combo"></div></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnInit"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanMhsEmpCnt">0</span>
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">
                        <div class="div_combo fr">
                            <form id="pageingFormMhsEmp"></form>
                        </div>
                    </div>
                </div>
                <!--// 타이틀영역 -->              
                

                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line_paging">
                        <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->

                        <div id="MhsEmpDataList" class="dhtml_grid">

                        </div>
                    </div>

                    
                    <div id="divPagingMhsEmp" class="ac paging"><a href="#none" onclick="fn_SearchMhsEmpGridList(1)">
                            &lt;&lt; </a><a href="#none"> &lt;
                        </a><a href="#none" class="active">1</a><a href="#none" class="next"> &gt;
                        </a><a href="#none" class="last" onclick="fn_SearchMhsEmpGridList(1)">
                            &gt;&gt; </a></div>
                </div>

            </div><!-- //왼쪽 영역 item end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title"> <!-- 높이만 잡고 싶은 경우 빈 div_title만 남기고 안쪽은 지워준다 -->
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">
                        <div class="right ml7">
                            <button class="btn_common01_new" id="btndetailTopInit" type="button"><taglibs:transText progrmId="default" key="btnInit" /></button>
                        </div>
                    </div>
                </div>
                <!--// 타이틀영역 -->


                <div class="mt5 outer_line_form">

                    <div class="detail_type01" style="min-height:246px;">
                        <form id="detailTopForm">
                            <div id="saveTopForm">
                            <table>
                                <colgroup>
                                    <col width="150">
                                    <col width="120">
                                    <col width="*">
                                    <col width="120">
                                    <col width="*">
                                    <col width="120">
                                    <col width="*">
                                </colgroup>
                                
                                <tr>
                                   <td rowspan = 6>
                                        <table style="text-align:center; padding:0;margin:0;border: 0;">
                                            <tr style="text-align:center; padding:0;margin:0;border: 0;">
                                                <td id="empPhoto" name="empPhoto" style="width:150px;height:120px; display: block; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; background-image: url(/xerp/img/common/myphoto_default.png); background-repeat:no-repeat; background-position: center; vertical-align: middle; align:center; border: 0; text-align: center;"></td>
                                                <input type="hidden" name="photoAtchmnflNo" id="photoAtchmnflNo" />
                                            </tr>
                                            <tr style="text-align:center; padding:0;margin:0;border: 0;">
                                                <td style="text-align:center; padding:0;margin:0;border: 0;">
                                                    <button type="button" id="btnPhotoRec" class="btn_common01" style="width:94px;margin-left:-3px;">
                                                        <taglibs:transText progrmId="default" key="btnRegist" />
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr style="text-align:center; padding:0;margin:0;border: 0;">
                                                <td style="text-align:center; padding:0;margin:0;border: 0;">
                                                    <button type="button" id="btnPhotoDown" class="btn_common01">
                                                        <taglibs:transText progrmId="default" key="btnDown" />
                                                    </button>
                                                    <button type="button" id="btnPhotoDel" class="btn_common01">
                                                        <taglibs:transText progrmId="default" key="btnDelete" />
                                                    </button>
                                                    <a id="photoDownload" download="" href=""></a>
                                                </td>
                                            </tr>
                                        </table>
                                   </td>
                                   <th class="essential_icon"><taglibs:transText progrmId="default" key="titEmpno" /></th>
                                   <td><input type="text" name="empno" id="empno" maxlength="15" style="width: 100px;" readOnly disabled/>
                                   </td>
                                   <th class="essential_icon"><taglibs:transText progrmId="default" key="titEmpNm" /></th>
                                   <td><input type="text" name="korNm" id="korNm" maxlength="20" style="width: 120px;" autocomplete="off" required/>
                                   </td>
                                   <th><!--<taglibs:transText progrmId="default" key="titEngNm" />/<taglibs:transText progrmId="default" key="titChcrtNm" />-->영문/한자명</th>
                                   <td><input type="text" name="engNm" id="engNm" maxlength="20" style="width: 120px;" autocomplete="off" />&nbsp;<input type="text" name="chcrtNm" id="chcrtNm" maxlength="20" style="width: 100px;" autocomplete="off" />
                                   </td>
                                </tr>
                                <tr>
                                   <th class="essential_icon"><taglibs:transText progrmId="default" key="titIhidnum" /></th>
                                   <td><input required type="text" name="ihidnum" id="ihidnum" maxlength="20" style="width: 120px;" />&nbsp;<div id="divInputFormComboSexdstnSe" class="div_combo"></div>
                                   </td>
                                   <th><taglibs:transText progrmId="default" key="titBrthdy" /></th>
                                   <td><input type="text" name="brthdy" id="brthdy" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off"><div id="divInputFormComboSlrcldAt" class="div_combo"></div>
                                   </td>
                                   <th><!--<taglibs:transText progrmId="default" key="titHffsSe" />-->재직구분</th>
                                   <td><div id="divInputFormComboHffsSeBox" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                   <th><taglibs:transText progrmId="default" key="titEmplSe" /></th>
                                   <td><div id="divInputFormComboEmplSeBox" class="div_combo"></div></td>
                                   <th><taglibs:transText progrmId="default" key="titDutyCode" /></th>
                                   <td><div id="divInputFormComboDtyCodeBox" class="div_combo"></div></td>
                                   <th><taglibs:transText progrmId="default" key="titOfcpsNm" /></th>
                                   <td><div id="divInputFormComboOfcpsCodeBox" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                   <th><taglibs:transText progrmId="default" key="titClsfNm" />/<taglibs:transText progrmId="default" key="titSrclsCode" /></th>
                                   <td><div id="divInputFormComboClsfCodeBox" class="div_combo"></div> &nbsp;<div id="divInputFormComboSrclsCodeBox" class="div_combo"></td>
                                   <th><taglibs:transText progrmId="default" key="titJssfcCode" /></th>
                                   <td><div id="divInputFormComboJssfcCodeBox" class="div_combo"></div></td>
                                   <th><taglibs:transText progrmId="default" key="titPositionCode" /></th>
                                   <td><div id="divInputFormComboMhsRspofcCodeBox" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                   <th><taglibs:transText progrmId="default" key="titDeptNm" /></th>
                                   <td><input type="text" name="deptCodeNm" id="deptCodeNm" maxlength="20" style="width: 70%" autocomplete="off"/>
                                        <input type="hidden" name="deptCode" id="deptCode" />
                                            <button type="button" id="btnDetailDeptCodeSearch" class="btn_common03">
                                                <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                            </button>
                                   </td>
                                   <%-- <th><taglibs:transText progrmId="default" key="titUpperDeptCode" /></th>
                                   <td><input type="text" name="upperDeptCodeNm" id="upperDeptCodeNm" maxlength="15" style="width: 100px;" readOnly/>
                                        <input type="hidden" name="upperDeptCode" id="upperDeptCode" />
                                   </td> --%>
                                   <th>현직급 임용일</th>
                                   <td><input type="text" name="curClsfEmplmnday" id="curClsfEmplmnday" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off">
                                   </td>
                                   <th class="essential_icon"><taglibs:transText progrmId="default" key="titEcnyDe" /></th>
                                   <td><input required type="text" name="ecnyDe" id="ecnyDe" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off"></td>
                                </tr>
                                <tr>
                                   <th>겸직부서<taglibs:transText progrmId="default" key="겸직부서" /></th>
                                   <td><input type="text" name="hdadptDeptCodeNm" id="hdadptDeptCodeNm" maxlength="20" style="width: 70%" autocomplete="off"/>
                                        <input type="hidden" name="hdadptDeptCode" id="hdadptDeptCode" />
                                            <button type="button" id="btnDetailHdadptDeptCodeSearch" class="btn_common03">
                                                <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                            </button>
                                   </td>                                   
                                   <th>파견부서<taglibs:transText progrmId="default" key="파견부서" /></th>
                                   <td><input type="text" name="dispDeptCodeNm" id="dispDeptCodeNm" maxlength="15" style="width: 100px;" autocomplete="off"/>
                                        <input type="hidden" name="dispDeptCode" id="dispDeptCode" />
                                            <button type="button" id="btnDetailDispDeptCodeSearch" class="btn_common03">
                                                <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                            </button>
                                   </td>
                                   <th>퇴직일자/사유<taglibs:transText progrmId="default" key="퇴사일자" /></th>
                                   <td><input type="text" name="retireDe" id="retireDe" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off"><span id="divInputFormComboRetireSeBox" class="div_combo"></span></td>
                                </tr>
                        </table>
                        </div>
                        </form>
                    </div>
                    <!--//detail_type01-->
                    <div class="outer_form" style="height:60vh">
                    
                        <div id="saveForm">
                         <div id="tabbarObj" class="mt5 outer_line_grid dhxtabbar_base_material list_top02" style="min-height:50vh !important;height:596px !important;border:0;">
                         
                            <div id="tab1" name="기본">  <!-- //TAB1 기본 -->
                                 <div class="list_top">
                                    <div style="float: right;" class="mb5">
                                        <button class="btn_common01_new" id="btnSave_Tab1" type="button"><taglibs:transText progrmId="default" key="저장" />저장</button>
                                        <button class="btn_common01_new" id="btnInit_Tab1" type="button"><taglibs:transText progrmId="default" key="btnInit" /></button>
                                    </div>
                                </div> 
                                 <div class="list_type02">
                                        <form id="saveFormEmp_Tab1">
                                        <table>
                                            <caption><taglibs:transText progrmId="default" key="titMhsEmp" /></caption>
                                            <colgroup>
                                                <col width="150">
                                                <col width="*">
                                                <col width="150">
                                                <col width="*">
                                                <col width="150">
                                                <col width="*">
                                            </colgroup>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="내선전화번호" />내선전화번호</th>
                                                <td><input type="text" name="tab1lxtnTelno" id="tab1lxtnTelno" maxlength="20" style="width: 90%" autocomplete="off"/></td>
                                                <th><taglibs:transText progrmId="default" key="titMbtlnum" /></th>
                                                <td><input type="text" name="tab1Mbtlnum" id="tab1Mbtlnum" maxlength="20" style="width: 90%" autocomplete="off"/></td>
                                                <th><taglibs:transText progrmId="default" key="자택전화번호" />자택전화번호</th>
                                                <td><input type="text" name="tab1OwnhomTelno" id="tab1OwnhomTelno" maxlength="20" style="width: 90%" autocomplete="off"/></td>
                                            </tr>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="이메일(사내)" />이메일(사내)</th>
                                                <td><input type="text" name="tab1Email" id="tab1Email" maxlength="50" style="width: 90%" autocomplete="off"/></td>
                                                <th><taglibs:transText progrmId="default" key="이메일(개인)" />이메일(개인)</th>
                                                <td><input type="text" name="tab1IndvdlEmail" id="tab1IndvdlEmail" maxlength="50" style="width: 90%" autocomplete="off"/></td>
                                                <th><taglibs:transText progrmId="default" key="결혼여부" />결혼여부</th>
                                                <td><div id="divInputFormTab1MrrgAt" class="div_combo"></div>&nbsp;<input type="text" name="tab1MrrgDe" id="tab1MrrgDe" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off"></td> 
                                            </tr>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="비상연락처" />비상연락처</th>
                                                <td><input type="text" name="tab1EmgncTelno" id="tab1EmgncTelno" maxlength="50" style="width: 90%" autocomplete="off"/></td>
                                                <th><taglibs:transText progrmId="default" key="최종학력" />최종학력</th>
                                                <td><div id="divInputFormTab1LastAcdncrCode" class="div_combo"></div></td>
                                                <th><taglibs:transText progrmId="default" key="최종학교" />최종학교</th>
                                                <td><input type="text" name="tab1LastSchulNm" id="tab1LastSchulNm" maxlength="50" style="width: 90%" autocomplete="off" readOnly disabled/></td>
                                            </tr>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="최종승급일" />최종승급일</th>
                                                <td><input type="text" name="tab1LastPromtDe" id="tab1LastPromtDe" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off" readOnly disabled></td>
                                                <th><taglibs:transText progrmId="default" key="최종승호일" />최종승호일</th>
                                                <td><input type="text" name="tab1LastSalclsupDe" id="tab1LastSalclsupDe" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off" readOnly disabled></td>
                                                <th><taglibs:transText progrmId="default" key="휴직구분" />휴직구분</th>
                                                <td><div id="divInputFormTab1LayoffSeCode" class="div_combo"></div></td>
                                            </tr>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="현주소" />현주소</th>
                                                <td colspan=5>
                                                    <input type="text" name="zip" id="zip" maxlength="5" style="width: 80px" readonly/>
                                                    <button type="button" id="btnTab1AddrSearch" class="btn_common03">
                                                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                                    </button>
                                                    <input type="text" name="ownhomAdres" id="ownhomAdres" maxlength="50" style="width: 55%" autocomplete="off"/>
                                                    <input type="text" name="ownhomDetailAdres" id="ownhomDetailAdres" maxlength="50" style="width: 25%" autocomplete="off"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="titOrginAdr" /></th>
                                                <td colspan=5>
                                                    <input type="text" name="bornZip" id="bornZip" maxlength="5" style="width: 80px"/ readonly>
                                                    <button type="button" id="btnTab1BornAddrSearch" class="btn_common03">
                                                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                                    </button>
                                                    <input type="text" name="bornAdres" id="bornAdres" maxlength="50" style="width: 55%" autocomplete="off"/>
                                                    <input type="text" name="bornDetailAdres" id="bornDetailAdres" maxlength="50" style="width: 25%" autocomplete="off"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="급여지급" />급여지급</th>
                                                <td>
                                                    <div id="divInputFormTab1SalaryPymntAt" class="div_combo">
                                                        <select name="tab1SalaryPymntAt" id="tab1SalaryPymntAt">
                                                            <option value="1" selected="selected">지급</option>
                                                            <option value="0">미지급</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <th><taglibs:transText progrmId="default" key="퇴직금중간정산일자" />퇴직금중간정산일자</th>
                                                <td><input type="text" name="tab1RetireExcclcDe" id="tab1RetireExcclcDe" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off" readOnly disabled></td>
                                                <th><taglibs:transText progrmId="default" key="출납업무" />출납업무</th>
                                                <td>
                                                    <div class="checkbox">
                                                        <label> 
                                                            <input type="checkbox" name="tab1CashierAt" id="tab1CashierAt" value="1">
                                                            <i class="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="퇴직연금" />퇴직연금</th>
                                                <td><div id="divInputFormTab1RetireAnntyKindCode" class="div_combo"></div></td>
                                                <th><taglibs:transText progrmId="default" key="소득세율선택" />소득세율선택</th>
                                                <td><div id="divInputFormTab1IncmtaxrtCode" class="div_combo"></div></td>
                                                <th><taglibs:transText progrmId="default" key="급여보수체계" />급여보수체계</th>
                                                <td><div id="divInputFormTab1SalaryAprpCode" class="div_combo"></div></td>
                                            </tr>
                                            <tr>
                                                <th><taglibs:transText progrmId="default" key="육아단축근무여부" />육아단축근무여부</th>
                                                <td>
                                                    <div class="checkbox">
                                                        <label> 
                                                            <input type="checkbox" name="tab1BabyShrtenWorkAt" id="tab1BabyShrtenWorkAt" value="1">
                                                            <i class="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </td>
                                                <th><taglibs:transText progrmId="default" key="노조가입" />노조가입</th>
                                                <td>
                                                    <div class="checkbox">
                                                        <label> 
                                                            <input type="checkbox" name="tab1LbunSbscrbAt" id="tab1LbunSbscrbAt" value="1">
                                                            <i class="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </td>
                                                <th><taglibs:transText progrmId="default" key="상조가입" />상조가입</th>
                                                <td>
                                                    <div class="checkbox">
                                                        <label> 
                                                            <input type="checkbox" name="tab1MutaidSbscrbAt" id="tab1MutaidSbscrbAt" value="1">
                                                            <i class="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        </form>
                                    </div>
                                    <!--//detail_type01-->
                                </div>
                            </div>  <!-- //TAB1 기본 -->
                            
                            <div id="tab2" name="신상정보">
                            </div>
                            
                            <div id="tab3" name="가족">
                            </div>
                            
                            <div id="tab4" name="발령">
                            </div>
                            
                            <div id="tab5" name="포상">
                            </div>
                            
                            <div id="tab6" name="징계">
                            </div>
                            
                            <div id="tab7" name="학력">
                            </div>
                            
                            <div id="tab8" name="경력">
                            </div>
                            
                            <div id="tab9" name="자격">
                            </div>
                            
                            <div id="tab10" name="교육">
                            </div>
                            
                            <div id="tab11" name="게좌">
                            </div>
                            
                            <div id="tab12" name="어학">
                            </div>
                            <!-- 
                            <div id="tab13" name="연수">
                            </div>
                            
                            <div id="tab14" name="자소서">
                            </div>
                            
                            <div id="tab15" name="면담">
                            </div>
                            
                            <div id="tab16" name="기타">
                            </div> -->
                    </div>
                </div>
                    
                </div>
            </div><!-- //오른쪽 영역 item end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item3으로 변경후 사용
            <div class="item3">
            </div>
             -->
        </div><!-- //flex end -->
        
        
    </div><!-- //wrapper_con end -->

</body>