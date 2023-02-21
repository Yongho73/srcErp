<!-- 
 *    프로그램       : 금융계좌관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.24
 *    사용테이블      : MFS_DEPOSIT
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mfs/bsc/mfsbsc003/mfsbsc003.js"></script>

      <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
                        <li><a href="#none" id="btnAddMfsbsc003"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                        <li><a href="#none" id="btnSaveMfsbsc003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnRemoveMfsbsc003"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                        <li><a href="#none" id="btnExcelMfsbsc003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    </ul>
                </div>
            </div>

            <!-- 검색영역 -->
            <div class="consearch_div">
                <div class="consearch_input">
                    <form id="searchFormMfsbsc003">
                    <input type="hidden" name="selectedPageNum"/>
                        <ul class="consearchinput_list">
                            <li><span class="span"><label for="docmT">계좌번호<!-- <taglibs:transText progrmId="default" key="titAcnutNo"/> --></span><input type="text" name="acnutNo" id="acnutNoSearchFormMfsbsc003"></li>
                            <li><span class="span"><label for="docmT">사용여부</span>
                                <select id="useAt" name="useAt">
                                    <option value="">전체</option>
                                    <option value="1">사용</option>
                                    <option value="0">미사용</option>
                                </select>                            
                           </li>                               
                        </ul>
                    </form>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMfsbsc003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMfsbsc003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
             <!-- 검색영역 END -->

           <div class="wrapper">
             <div class="div" style="width:calc(50% - 5px);">
                <div class="div_title">
                    <span class="table_sumnum" id="spanCntMfsbsc003">0</span>
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataListMfsbsc003" style="height:calc(100vh - 120px); width:100%; position:relative;">
                </div>

            </div>
            <div class="div_divine"></div>
            <div class="div" style="width:calc(50% - 5px)">
                <div class="div_line" style="min-height:calc(100vh - 120px); margin-top:23px;">
                        <div class="detail_type01">
                            <!--오른쪽 상단영역--> 
                          <form id="saveFormMfsbsc003">
                          <input type="hidden" name="bplcCode" id="bplcCodeSaveFormMfsbsc003" maxlength="4" style="width: 50%"/>
                                <table>
                                    <caption>
                                                   금융계좌<!-- <taglibs:transText progrmId="default" key="titMfsbsc003"/> -->
                                    </caption>
                                    <colgroup>
                                        <col width="150">
                                        <col width="">
                                    </colgroup>
                                    <tr>
                                        <th class="essential_icon">
                                                          계좌번호<!-- <taglibs:transText progrmId="default" key="titAcnutNo"/> -->
                                        </th>
                                        <td>
                                            <input required="true" type="text" name="acnutNo" id="acnutNoSaveFormMfsbsc003" maxlength="300" style="width: 50%"/>
                                        </td>
                                    </tr>
<!--                                     <tr>
                                        <th class="essential_icon">
                                                          사업장 코드<taglibs:transText progrmId="default" key="titBplcCode"/>
                                        </th>
                                        <td>
                                            <input type="text" name="bplcCode" id="bplcCodeSaveFormMfsbsc003" maxlength="4" style="width: 50%"/>
                                        </td>
                                    </tr> -->
                                    <tr>
                                        <th class="essential_icon">
                                                          예금종류<!-- <taglibs:transText progrmId="default" key="titDpstKind"/> -->
                                        </th>
                                        <td>
                                        <div id="divComboDpstKind"  class="div_combo"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="essential_icon">
                                                          예금명<!-- <taglibs:transText progrmId="default" key="titDpstNm"/> -->
                                        </th>
                                        <td>
                                            <input required="true" type="text" name="dpstNm" id="dpstNmSaveFormMfsbsc003" maxlength="50" style="width: 50%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          예금주명<!-- <taglibs:transText progrmId="default" key="titDpstrNm"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="dpstrNm" id="dpstrNmSaveFormMfsbsc003" maxlength="50" style="width: 50%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="essential_icon">
                                                          은행코드<!-- <taglibs:transText progrmId="default" key="titBankCode"/> -->
                                        </th>
                                        <td><div id="divComboBankCode"  class="div_combo"></div>
                                        </td>
                                    </tr>
<!--                                     <tr>
                                        <th>
                                                          지점명<taglibs:transText progrmId="default" key="titBankNm"/>
                                        </th>
                                        <td>
                                            <input type="text" name="bankNm" id="bankNmSaveFormMfsbsc003" maxlength="50" style="width: 50%"/>
                                        </td>
                                    </tr> -->
                                    <tr>
                                        <th class="essential_icon">
                                                          개설지점<!-- <taglibs:transText progrmId="default" key="titEstblBhf"/> -->
                                        </th>
                                        <td>
                                            <input required="true" type="text" name="estblBhf" id="estblBhfSaveFormMfsbsc003" maxlength="30" style="width: 50%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          개설일자<!-- <taglibs:transText progrmId="default" key="titEstblDe"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="estblDe" id="estblDeSaveFormMfsbsc003" maxlength="10" class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          만기일자<!-- <taglibs:transText progrmId="default" key="titExprtnDe"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="exprtnDe" id="exprtnDeSaveFormMfsbsc003" maxlength="10" class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          해지일자<!-- <taglibs:transText progrmId="default" key="titTrmnatDe"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="trmnatDe" id="trmnatDeSaveFormMfsbsc003" maxlength="10" class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          이자율<!-- <taglibs:transText progrmId="default" key="titIntrRt"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="intrRt" id="intrRtSaveFormMfsbsc003" maxlength="5" style="width: 50%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          주거래통장여부<!-- <taglibs:transText progrmId="default" key="titBassBnkbAt"/> -->
                                        </th>
                                        <td>
                                        <div class="checkbox">
                                            <label> 
                                               <input type="checkbox" name="bassBnkbAt" id="bassBnkbAtSaveFormMfsbsc003" >
                                                <i class="input-helper"></i>
                                            </label>
                                            <span>사업장별 주거래 통장은 1개만 설정 가능합니다.</span> 
                                        </div>         
                                                                        
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> -->
                                        </th>
                                        <td>
                                        <div class="checkbox">
                                            <label> 
                                               <input type="checkbox" name="useAt" id="useAtSaveFormMfsbsc003" >
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>                                           
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          비고<!-- <taglibs:transText progrmId="default" key="titRm"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="rm" id="rmSaveFormMfsbsc003" maxlength="200" style="width: 90%"/>
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
 