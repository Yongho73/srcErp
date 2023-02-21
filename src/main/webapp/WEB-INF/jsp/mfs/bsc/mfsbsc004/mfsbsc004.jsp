<!-- 
 *    프로그램       : 법인카드관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.23
 *    사용테이블      : MFS_CARD
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mfs/bsc/mfsbsc004/mfsbsc004.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>    
    <script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>

  
   <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">                 
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
                        <li><a href="#none" id="btnAddMfsbsc004"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                        <li><a href="#none" id="btnSaveMfsbsc004"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnRemoveMfsbsc004"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                        <li><a href="#none" id="btnExcelMfsbsc004"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    </ul>
                </div>
            </div>
            
            <!-- 검색영역 -->
            <div class="consearch_div">            
                <div class="consearch_input">
                    <form id="searchFormMfsbsc004">
                        <ul class="consearchinput_list">
                        <input type="hidden" name="sortDirection"/>
                        <input type="hidden" name="sortColumId"/>
                        <input type="hidden" name="selectedPageNum"/>                        
                            <li><span class="span"><label for="docmT">카드번호<!-- <taglibs:transText progrmId="default" key="titCardNo"/> --></span><input name="cardNo" id="cardNoSearchFormMfsbsc004"></li>
                            <li><span class="span"><label for="docmT">사용여부</span>
                                <select id="useAtSearch" name="useAtSearch">
                                    <option value="">전체</option>
                                    <option value="1">사용</option>
                                    <option value="0">미사용</option>
                                </select>                            
                           </li>                              
                    </form>  
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMfsbsc004"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMfsbsc004"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>            
            </div>            
             <!-- 검색영역 END -->
             
           <div class="wrapper">
             <div class="div" style="width:calc(30% - 5px);">
                <div class="div_title" >
                <span class="table_sumnum" id="spanCntMfsbsc004">0</span>
                <!-- data count for paging -->
                <div class="div_combo fr">
                    <form id="pageingFormMfsbsc004"></form>
                </div>              
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataListMfsbsc004" style="height:calc(100vh - 170px); width:100%; position:relative;"> 
                </div>
                <div style="margin-top:10px">
                    <div id="divPagingMfsbsc004" class="ac paging"></div>
                </div>                
         
            </div>     
            <div class="div_divine"></div>      
            <div class="div" style="width:calc(70% - 5px)" >
                <div class="div_line" style="min-height:calc(100vh - 120px); margin-top:27px;">  
                    <div class="detail_type01">
                   <form id="saveFormMfsbsc004">
                   <input type="hidden" name="bplcCode" id="bplcCode" maxlength="4" style="width: 50%" />
                        <table>
                            <caption>
                                           법인카드<!-- <taglibs:transText progrmId="default" key="titMfsbsc004"/> -->
                            </caption>
                            <colgroup>
                                <col width="15%">
                                <col width="35%">
                                <col width="15%">
                                <col width="35%">                               
                            </colgroup>
                            <tr>
                                <th class="essential_icon">
                                                            카드번호<!-- <taglibs:transText progrmId="default" key="titCardNo"/> -->
                                </th>
                                <td>
                                   <!--  <input required="true" type="text" name="cardNo" id="cardNoSaveFormMfsbsc004" maxlength="20" style="width: 50%"/> -->
                                    <input required="true" type="text" name="cardNo1" id="cardNoSaveFormMfsbsc0041" maxlength="4" style="width: 40px"/> -
                                    <input required="true" type="text" name="cardNo2" id="cardNoSaveFormMfsbsc0042" maxlength="4" style="width: 40px"/> -
                                    <input required="true" type="text" name="cardNo3" id="cardNoSaveFormMfsbsc0043" maxlength="4" style="width: 40px"/> -
                                    <input required="true" type="text" name="cardNo4" id="cardNoSaveFormMfsbsc0044" maxlength="4" style="width: 40px"/>
                                </td>
                                <th>
                                   CVC번호<!-- <taglibs:transText progrmId="default" key="titCvcNo"/> -->
                                </th>
                                <td>
                                    <input type="text" name="cvcNo" id="cvcNoSaveFormMfsbsc004" maxlength="3" style="width: 40px"/>
                                </td>

                                
<!--                                 <th class="essential_icon">
                                                  사업장 코드<taglibs:transText progrmId="default" key="titBplcCode"/>
                                </th>
                                <td>
                                    <input type="text" name="bplcCode" id="bplcCodeSaveFormMfsbsc004" maxlength="4" style="width: 50%" readonly/>
                                </td> -->
                            </tr>
                            <tr>
                                <th class="essential_icon">
                                                  카드명<!-- <taglibs:transText progrmId="default" key="titCardNm"/> -->
                                </th>
                                <td>
                                    <input required="true" type="text" name="cardNm" id="cardNmSaveFormMfsbsc004" maxlength="50" style="width: 50%"/>
                                </td>
                                <th>
                                                  카드 약칭<!-- <taglibs:transText progrmId="default" key="titCardAbrv"/> -->
                                </th>
                                <td>
                                    <input type="text" name="cardAbrv" id="cardAbrvSaveFormMfsbsc004" maxlength="50" style="width: 50%"/>
                                </td>
                            </tr>
                            <tr>
                                <th class="essential_icon">
                                                  카드발급기관<!-- <taglibs:transText progrmId="default" key="titCardIssuInstt"/> -->
                                </th>
                                <td><div id="divComboCardIssuInstt"  class="div_combo"></div>
                                   <!--  <input type="text" name="cardIssuInstt" id="cardIssuInsttSaveFormMfsbsc004" maxlength="20" style="width: 50%"/> -->
                                </td>
                                <th class="essential_icon">
                                                  발급일자<!-- <taglibs:transText progrmId="default" key="titIssuDe"/> -->
                                </th>
                                <td>
                                    <input required="true" type="text" name="issuDe" id="issuDeSaveFormMfsbsc004" maxlength="10" class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/>
                                </td>                                
                             
                                
                            </tr>
                            <tr>
                                <th>
                                                  카드구분코드<!-- <taglibs:transText progrmId="default" key="titCardSe"/> -->
                                </th>
                                <td><div id="divComboCardSe"  !class="div_combo">
                                    <!-- <input type="text" name="cardSe" id="cardSeSaveFormMfsbsc004" maxlength="10" style="width: 50%"/> -->
                                </td>    
                               <th class="essential_icon">
                                                  카드유효년월<!-- <taglibs:transText progrmId="default" key="titCardValidYm"/> -->
                                </th>
                                <td>
                                    <input type="text" name="cardValidYm" id="cardValidYmSaveFormMfsbsc004" class="input_calen" size="7" maxlength="7">
                                </td>
<!--                                 <th>
                                                  카드상세구분<taglibs:transText progrmId="default" key="titCarddetailSe"/>
                                </th>
                                <td>
                                    <input type="text" name="carddetailSe" id="carddetailSeSaveFormMfsbsc004" maxlength="10" style="width: 50%"/>
                                </td> -->

                            </tr>
                            <tr>
                                <th class="essential_icon">
                                                  결제 은행<!-- <taglibs:transText progrmId="default" key="titBankCode"/> -->
                                </th>
                                <td><div id="divComboBankCode"  !class="div_combo"></div>
                                    <!-- <input type="text" name="bankCode" id="bankCodeSaveFormMfsbsc004" maxlength="10" style="width: 50%"/> -->
                                </td>
                               <th class="essential_icon">
                                                 결제 계좌번호<!-- <taglibs:transText progrmId="default" key="titDefrayAcnutNo"/> -->
                                </th>
                                <td>
                                    <input required="true"  type="text" name="defrayAcnutNo"  id="defrayAcnutNoSaveFormMfsbsc004" maxlength="20" style="width: 50%" readonly="true"/>
                                    <button type="button" id="btnAcnutNoSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                </td>
                            </tr>  
                            <tr>
                                <th>
                                                  결제일<!-- <taglibs:transText progrmId="default" key="titSetleDay"/> -->
                                </th>
                                <td>
                                    <input type="text" name="setleDay" id="setleDaySaveFormMfsbsc004" maxlength="20" style="width: 50%"/>
                                </td>
                                <th>
                                                  한도액<!-- <taglibs:transText progrmId="default" key="titLmtAmt"/> -->
                                </th>
                                <td>
                                    <input type="text" name="lmtAmt" id="lmtAmtSaveFormMfsbsc004" maxlength="22" style="width: 50%"  class="ar" numberOnly placeholder="0" />
                                </td>
<!--                                 <th>
                                                  한도금액<taglibs:transText progrmId="default" key="titLmt2Amt"/>
                                </th>
                                <td>
                                    <input type="text" name="lmt2Amt" id="lmt2AmtSaveFormMfsbsc004" maxlength="22" style="width: 50%"  class="ar"/>
                                </td> -->
                            </tr>                                                      
                            <tr>
                                <th>
                                                  사용자<!-- <taglibs:transText progrmId="default" key="titUseEmpno"/> -->
                                </th>
                                <td>
                                    <input type="hidden" name="useEmpno" id="useEmpnoSaveFormMfsbsc004" maxlength="10" readonly="true"/>
                                    <input type="text" name="useEmpnm" id="useEmpnmSaveFormMfsbsc004" maxlength="10" style="width:100px" readonly="true"/>
                                    <button type="button" id="btnUseEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                </td>                            
                                <th>
                                                  카드관리자<!-- <taglibs:transText progrmId="default" key="titOwnEmpno"/> -->
                                </th>
                                <td>
                                    <input type="hidden" name="ownEmpno" id="ownEmpnoSaveFormMfsbsc004" maxlength="10" readonly="true"/>
                                    <input type="text" name="ownEmpnm" id="ownEmpnmSaveFormMfsbsc004" maxlength="10" style="width:100px" readonly="true"/>
                                    <button type="button" id="btnOwnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                                  관리부서<!-- <taglibs:transText progrmId="default" key="titDeptCode"/> -->
                                </th>
                                <td colspan="3">
                                    <input type="hidden" name="deptCode" id="deptCodeSaveFormMfsbsc004" maxlength="20"/>
                                    <input type="text" name="deptNm" id="deptNmSaveFormMfsbsc004" maxlength="20" style="width:100px" readonly="true"/>
                                     <button type="button" id="btnDeptCodeSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                </td>
  
                            </tr>
                            <tr>
                                <th>
                                                  사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> -->
                                </th>
                                <td>
                                    <div class="checkbox">
                                        <label> 
                                           <input type="checkbox" name="useAt" id="useAtSaveFormMfsbsc004" >
                                            <i class="input-helper"></i>
                                        </label>
                                    </div>                                    
                                </td>
                                <th>
                                                  폐기일자<!-- <taglibs:transText progrmId="default" key="titDiscardDe"/> -->
                                </th>
                                <td>
                                    <input type="text" name="discardDe" id="discardDeSaveFormMfsbsc004" maxlength="10" class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/>
                                </td>                                
                                                            
<!--                                 <th>
                                                  만기일자<taglibs:transText progrmId="default" key="titExprtnDe"/>
                                </th>
                                <td>
                                    <input type="text" name="exprtnDe" id="exprtnDeSaveFormMfsbsc004" maxlength="8" style="width: 50%"/>
                                </td>
 -->

                            </tr>



                            <tr>
                                <th>
                                                  비고<!-- <taglibs:transText progrmId="default" key="titRm"/> -->
                                </th>
                                <td colspan="3">
                                    <input type="text" name="rm" id="rmSaveFormMfsbsc004" maxlength="200" style="width: 90%"/>
                                </td>
                            </tr>
                        </table>
                    </form>

                    </div>                

                
                </div>
            </div>            
              <div class="div_divine"></div>      
           </div>
    </div>

</body>

