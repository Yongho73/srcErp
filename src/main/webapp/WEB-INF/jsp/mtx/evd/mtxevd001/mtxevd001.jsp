<!-- 
 *    프로그램       : 세금계산서(매입/매출) 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.11
 *    사용테이블      : MFS_TAX_COMM
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mtx/evd/mtxevd001/mtxevd001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMtxevd001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMtxevd001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMtxevd001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMtxevd001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMtxevd001">
                    <ul class="consearchinput_list">
                        <li id="date2"><span class="span">작성일자</span>
                            <input type="text" name="stDate" id="stDate" class="input_calen">~ 
                            <input type="text" name="edDate" id="edDate" class="input_calen">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li><span class="span">매입매출</span>
                            <select name="pursaleSeCode" id="pursaleSeCodeSearchFormMtxevd001" >
                                <option value="">전체</option>
                                <option value="P">매입</option>
                                <option value="S">매출</option>                                
                            </select>
                        </li>
                        <li><span class="span">전자일반구분</span>
                            <select name="evidSeCode" id="evidSeCodeSearchFormMtxevd001" >
                                <option value="">전체</option>
                                <option value="1">세금계산서</option>
                                <option value="2">계산서</option>                                
                            </select>
                        </li>
                        <li><span class="span">증빙구분</span>
                            <select name="elctrnevidSeCode" id="evidSeCodeSearchFormMtxevd001" >
                                <option value="">전체</option>
                                <option value="1">전자</option>
                                <option value="2">일반</option>                                
                            </select>
                        </li>
                        <li><span class="span">거래처코드</span>
                            <input name="SearchbcncCode" id="bcncCodeSearchFormMtxevd001">
                            <input name="bcncNm" id="bcncNmSearchFormMtxevd001">
                            <button type="button" id="btnBcncSearchFormMtxevd001" class="btn_common03">
                                <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMtxevd001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMtxevd001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMtxevd001">0</span>
                    </div>
                    <div class="right">
                        <div class="div_combo fr">
                        <form id="pageingFormMtxevd001">
                            <select name="pageRowSize">
                                <option value="100">100개씩 보기</option>
                                <option value="20">20개씩 보기</option>
                                <option value="30" selected="">30개씩 보기</option>
                                <option value="40">40개씩 보기</option>
                                <option value="50">50개씩 보기</option>
                            </select>
                        </form>
                    </div>  
                    <!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line_paging"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMtxevd001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                     
                    <div class="ac paging" id="divPagingMtxevd001">
                    </div>
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormMtxevd001">
                            <table>
                                <caption>세금계산서(매입/매출)<!-- <taglibs:transText progrmId="default" key="titMtxevd001"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon" style="width: 11%">매입매출구분<!-- <taglibs:transText progrmId="default" key="titPursaleSeCode"/> --></th>
                                    <td>
                                        <div id="pursaleSeCodeSaveFormMtxevd001" name="pursaleSeCode" maxlength="4" style="width: 50%" required></div>
                                    </td>
                                    <th class="essential_icon">증빙구분<!-- <taglibs:transText progrmId="default" key="titEvidSeCode"/> --></th>
                                    <td>
                                        <div id="evidSeCodeSaveFormMtxevd001" name="evidSeCode" maxlength="4" style="width: 50%" required></div>
                                    </td>
                                    <th>증빙번호<!-- <taglibs:transText progrmId="default" key="titTaxbillNo"/> --></th>
                                    <td><input type="text" name="taxbillNo" id="taxbillNoSaveFormMtxevd001" maxlength="30" style="width: 95%" readonly/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">매입구분<!-- <taglibs:transText progrmId="default" key="titPurchsTyCode"/> --></th>
                                    <td>
                                        <div id="purchsTyCodeSaveFormMtxevd001" name="purchsTyCode" maxlength="4" style="width: 50%" required></div>
                                    </td>
                                    <th class="essential_icon">전자증빙여부<!-- <taglibs:transText progrmId="default" key="titElctrnevidSeCode"/> --></th>
                                    <td colspan="3">
                                        <div id="elctrnevidSeCodeSaveFormMtxevd001" name="elctrnevidSeCode" maxlength="1" style="width: 50%" required></div>
                                    </td>
                                    <!-- <th>사업장 </th>
                                    <td><input name="bplcCode" maxlength="4" style="width: 50%" readonly/></td> -->
                                </tr>
                                <tr>
                                    <th class="essential_icon">사업자등록번호<!-- <taglibs:transText progrmId="default" key="titBizrno"/> --></th>
                                    <td colspan="3">
                                        <input type="hidden" name="oldBcncCode" id="oldBcncCode" maxlength="10" style="width: 100px" readonly/>
                                        <input type="hidden" name="bcncCode" id="bcncCode" maxlength="10" style="width: 100px" readonly/>
                                        <input type="text" name="bizrno" id="bizrnoSaveFormMtxevd001" maxlength="15" style="width: 100px" readonly required/>
                                        <input type="text" name="bcncNm" id="bcncNmSaveFormMtxevd001" maxlength="30" style="width: 50%" readonly required/>
                                        <button type="button" id="btnBcncSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>대표자명<!-- <taglibs:transText progrmId="default" key="titReprsntNm"/> --></th>
                                    <td><input type="text" name="reprsntNm" id="reprsntNmSaveFormMtxevd001" maxlength="20" style="width: 50%" readonly/></td>
                                    <th>업태<!-- <taglibs:transText progrmId="default" key="titInduty"/> --></th>
                                    <td><input type="text" name="bizcnd" id="bizcndSaveFormMtxevd001" maxlength="50" style="width: 95%" readonly/></td>
                                    <th>업종<!-- <taglibs:transText progrmId="default" key="titInduty"/> --></th>
                                    <td><input type="text" name="induty" id="indutySaveFormMtxevd001" maxlength="50" style="width: 95%" readonly/></td>
                                </tr>
                                <tr>
                                    <th>거래처담당자<!-- <taglibs:transText progrmId="default" key="titChargerNm"/> --></th>
                                    <td><input type="text" name="customerchargerNm" maxlength="30" style="width: 50%" readonly/></td>
                                    <th>거래처이메일<!-- <taglibs:transText progrmId="default" key="titChargerEmail"/> --></th>
                                    <td colspan="3"><input type="text" name="customerchargerEmail" maxlength="50" style="width: 50%" readonly/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">담당자명<!-- <taglibs:transText progrmId="default" key="titChargerNm"/> --></th>
                                    <td><input type="text" name="chargerNm" id="chargerNmSaveFormMtxevd001" maxlength="30" style="width: 50%" required/></td>
                                    <th class="essential_icon">담당자이메일<!-- <taglibs:transText progrmId="default" key="titChargerEmail"/> --></th>
                                    <td colspan="3"><input type="text" name="chargerEmail" id="chargerEmailSaveFormMtxevd001" maxlength="50" style="width: 50%" required/></td>
                                </tr>
                                <tr>
                                    <th>주소<!-- <taglibs:transText progrmId="default" key="titChargerNm"/> --></th>
                                    <td colspan="3"><input type="text" name="adres" maxlength="30" style="width: 90%" readonly/></td>
                                </tr>
                                <tr>
                                    <th>국세청발행번호<!-- <taglibs:transText progrmId="default" key="titTaxbillNo"/> --></th>
                                    <td><input type="text" name="elctrnTaxbillNo" id="elctrnTaxbillNoSaveFormMtxevd001" maxlength="30" style="width: 50%" required/></td>
                                    <th class="essential_icon">작성일자<!-- <taglibs:transText progrmId="default" key="titBillIsuDe"/> --></th>
                                    <td>
                                        <input type="text" name="billWriteDe" id="billWriteDeSaveFormMtxevd001" class="input_calen" maxlength=10;" style="width:40%" required/>
                                    </td>
                                    <th class="essential_icon">발행일자<!-- <taglibs:transText progrmId="default" key="titBillIsuDe"/> --></th>
                                    <td><input type="text" name="billIsuDe" id="billIsuDeSaveFormMtxevd001" class="input_calen" maxlength="10" style="width: 40%" required/></td>
                                </tr>
                                <tr>
                                    <th>공급대가<!-- <taglibs:transText progrmId="default" key="titSplpcAmt"/> --></th>
                                    <td><input type="text" name="amtSuplAmt" id="amtSuplAmtMtxevd001" maxlength="22" style="width: 50%; text-align: right;"/></td>
                                    <th>공급가액<!-- <taglibs:transText progrmId="default" key="titSplpcAmt"/> --></th>
                                    <td><input type="text" name="splpcAmt" id="splpcAmtSaveFormMtxevd001" maxlength="22" style="width: 95%; text-align: right;"/></td>
                                    <th>VAT<!-- <taglibs:transText progrmId="default" key="titVatAmt"/> --></th>
                                    <td><input type="text" name="vatAmt" id="vatAmtSaveFormMtxevd001" maxlength="22" style="width: 95%; text-align: right;"/></td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="3"><input type="text" name="rm" id="rmSaveFormMtxevd001" maxlength="200" style="width: 90%"/></td>
                                    <th>전표번호<!-- <taglibs:transText progrmId="default" key="titBillIsuDe"/> --></th>
                                    <td><input name="anactNo" id="anactNoSaveFormMtxevd001" type="text" maxlength="15" style="width: 95%" readonly/></td>
                                </tr>
                            </table>
                        </form>
                    </div>  <!--//detail_type01--> 
                    <div>
                        <div class="div_title">
                            <div class="left ml5"></div>
                            <div class="right mr5">
                            <ul class="btn">
                                    <li>
                                        <button type="button" id="btnAddStmCode" class="btn_common01_new">
                                                                                                행추가
                                        </button>
                                        <button type="button" id="btnRemoveStmCode" class="btn_common01_new">
                                                                                                행삭제
                                        </button>
                                        <button type="button" id="btnSaveStmCode" class="btn_common01_new">
                                            <taglibs:transText progrmId="default" key="btnSave" />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="detail_type02">
                        <div id="detail_type01" style="height:350px; position:relative; width: 995.1px;cursor: default;"></div>
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
