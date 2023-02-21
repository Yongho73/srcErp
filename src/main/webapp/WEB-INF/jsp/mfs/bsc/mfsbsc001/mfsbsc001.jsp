<!-- 
 *    프로그램       : 계정과목관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.21
 *    사용테이블      : MFS_ACNT_TITLE
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mfs/bsc/mfsbsc001/mfsbsc001.js"></script>

      <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">                 
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
                        <li><a href="#none" id="btnAddMfsbsc001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                        <li><a href="#none" id="btnSaveMfsbsc001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnRemoveMfsbsc001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                        <li><a href="#none" id="btnExcelMfsbsc001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    </ul>
                </div>
            </div>
            
            <!-- 검색영역 -->
            <div class="consearch_div">            
                <div class="consearch_input">
                    <form id="searchFormMfsbsc001">
                        <ul class="consearchinput_list">
                            <li><span class="span">계정구분</span><div id="divSearchComboAcntSeCode" style="display:inline-block"></div></li>
                            <li><span class="span"><label for="docmT">계정코드<!-- <taglibs:transText progrmId="default" key="titAcntCode"/> --></span><input name="acntCode" id="acntCodeSearchFormMfsbsc001"></li>
                            <li><span class="span"><label for="docmT">계정명<!-- <taglibs:transText progrmId="default" key="titAcntNme"/> --></span><input name="acntNm" id="acntNmSearchFormMfsbsc001"></li>                    
                    </form>  
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMfsbsc001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMfsbsc001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>            
            </div>            
             <!-- 검색영역 END -->
             
           <div class="wrapper">
             <div class="div" style="width:calc(50% - 5px);">
                <div class="div_title">
                <span class="table_sumnum" id="spanCntMfsbsc001">0</span>
              
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataListMfsbsc001" style="height:calc(100vh - 120px); width:100%; position:relative;"> 
                </div>
         
            </div>     
            <div class="div_divine"></div>      
            <div class="div" style="width:calc(50% - 5px)">
                <div class="div_line" style="min-height:calc(100vh - 120px); margin-top:23px;">  
                        <div class="detail_type01">
                            <form id="saveFormMfsbsc001">
                            <input type="hidden" name="bplcCode" id="bplcCode" maxlength="4" style="width: 50%" />
                            <table>
                                <caption>
                                                            계정과목을 관리한다 
                                </caption>
                                <colgroup>
                                    <col width="150">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">
                                                                     계정코드<!-- <taglibs:transText progrmId="default" key="titAcntCode"/> -->
                                    </th>
                                    <td>
                                        <input required="true" type="text" name="acntCode" id="acntCodeSaveFormMfsbsc001" required maxlength="10" style="width: 100px" />
                                         <div class="btn_common04 w70 btnDupMfsbsc001" style="display: hide;">
                                            <span class="glyphicon glyphicon-duplicate"></span>
                                            <input type="button" id="btnCheckDup" class="btn_input w60" value="중복확인">
                                        </div>                                        
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                                                    계정명<!-- <taglibs:transText progrmId="default" key="titAcntNm"/> -->
                                    </th>
                                    <td>
                                        <input type="text" name="acntNm" id="acntNmSaveFormMfsbsc001" maxlength="50" required style="width: 50%" onkeyup="fn_autoFillText();"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                                    계정명(약어)<!-- <taglibs:transText progrmId="default" key="titAcntAbrvNm"/> -->
                                    </th>
                                    <td>
                                        <input type="text" name="acntAbrvNm" id="acntAbrvNmSaveFormMfsbsc001" maxlength="50" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                                                    계정명(인쇄용)<!-- <taglibs:transText progrmId="default" key="titOutptAcntNm"/> -->
                                    </th>
                                    <td>
                                        <input type="text" name="outptAcntNm" id="outptAcntNmSaveFormMfsbsc001" maxlength="50" required style="width: 50%"/>
                                    </td>
                                </tr>                                
                                <tr>
                                    <th class="essential_icon">
                                                                    상위계정코드<!-- <taglibs:transText progrmId="default" key="titUpperAcntCode"/> -->
                                    </th>
                                    <td>
                                        <input type="text" name="upperAcntCode" id="upperAcntCodeSaveFormMfsbsc001" maxlength="10" style="width: 100px" required readonly/>
                                        <input type="text" name="upperAcntNm" id="upperAcntNmSaveFormMfsbsc001" maxlength="10" style="width: 150px" required readonly/>
                                        <button type="button" id="btnAcntCdSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                    </td>
                                </tr>
<!--                                 <tr>
                                    <th>
                                                      사업장 코드<taglibs:transText progrmId="default" key="titBplcCode"/>
                                    </th>
                                    <td>
                                        <input type="text" name="bplcCode" id="bplcCodeSaveFormMfsbsc001" maxlength="4" style="width: 50%"/>
                                    </td>
                                </tr> -->

                                <tr>
                                   <th class="essential_icon">
                                                                레벨<!-- <taglibs:transText progrmId="default" key="titTreeLvl"/> -->
                                    </th>
                                    <td>
                                        <select id="treeLvl" name="treeLvl" required>
                                            <option value="1">1레벨</option>
                                            <option value="2">2레벨</option>
                                            <option value="3" selected>3레벨</option>
                                            <option value="4">4레벨</option>
                                            <option value="5">5레벨</option>
                                        </select>                                    
                                    </td>
                                </tr>
                                <tr>
                                   <th class="essential_icon">
                                                                계정구분<!-- <taglibs:transText progrmId="default" key="titAcntSeCode"/> -->
                                    </th>
                                    <td><div id="divComboAcntSeCode" ></div></td>
                                </tr>
                                <tr>
                                   <th class="essential_icon">
                                                                전표기표 여부<!-- <taglibs:transText progrmId="default" key="titSlipBaltAt"/> -->
                                    </th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="slipBaltAt" id="slipBaltAtSaveFormMfsbsc001" readonly >
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>                                    
                                    </td>
                                </tr>                                
                                <tr>
                                   <th class="essential_icon">
                                                      잔액 표기위치<!-- <taglibs:transText progrmId="default" key="titBalanceMarklcSe"/> radio-->
                                    </th>
                                    <td>
                                    <div id="divBalanceMarklcSe" ></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                                      재무제표 표시 <!-- <taglibs:transText progrmId="default" key="titLrSeCode"/> -->
                                    </th>
                                    <td><div id="divComboLrSeCode" ></div></td>
                                </tr>

                                <tr>
                                    <th>
                                                      결산출력대상여부<!-- <taglibs:transText progrmId="default" key="titStacntTrgetAt"/> -->
                                    </th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="stacntTrgetAt" id="stacntTrgetAtSaveFormMfsbsc001" >
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>                                     
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                                      원장관리여부<!-- <taglibs:transText progrmId="default" key="titLedgrMgrtAt"/> -->
                                    </th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="ledgrMgrtAt" id="ledgrMgrtAtSaveFormMfsbsc001" >
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>                                      
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      공시계정여부<!-- <taglibs:transText progrmId="default" key="titPblntfAcntAt"/> -->
                                    </th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="pblntfAcntAt" id="pblntfAcntAtSaveFormMfsbsc001" >
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>                                      
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      차감 여부<!-- <taglibs:transText progrmId="default" key="titMinusAt"/> -->
                                    </th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="minusAt" id="minusAtSaveFormMfsbsc001" >
                                                <i class="input-helper"></i>
                                            </label>
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
                                                <input type="checkbox" name="useAt" id="useAtSaveFormMfsbsc001" readonly>
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
                                        <input type="text" name="rm" id="rmSaveFormMfsbsc001" maxlength="200" style="width: 90%"/>
                                    </td>
                                </tr>
<!--                                 <tr>
                                    <th>
                                                      은행코드<taglibs:transText progrmId="default" key="titBankCode"/>
                                    </th>
                                    <td>
                                        <input type="text" name="bankCode" id="bankCodeSaveFormMfsbsc001" maxlength="10" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      관리계좌 번호<taglibs:transText progrmId="default" key="titMgrtAcnutNo"/>
                                    </th>
                                    <td>
                                        <input type="text" name="mgrtAcnutNo" id="mgrtAcnutNoSaveFormMfsbsc001" maxlength="300" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      자금관리계정여부<taglibs:transText progrmId="default" key="titFundAcntAt"/>
                                    </th>
                                    <td>
                                        <input type="text" name="fundAcntAt" id="fundAcntAtSaveFormMfsbsc001" maxlength="1" style="width: 50%"/>
                                    </td>
                                </tr>  -->                               
                            </table>
                        </form>
                    </div>                

                
                </div>
            </div>            
              <div class="div_divine"></div>      
           </div>
    </div>

</body>
