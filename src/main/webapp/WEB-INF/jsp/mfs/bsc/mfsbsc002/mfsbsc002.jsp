<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mfs/bsc/mfsbsc002/mfsbsc002.js"></script>

     <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">                 
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
                        <li><a href="#none" id="btnAddMfsbsc002"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                        <li><a href="#none" id="btnRemoveMfsbsc002"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                        <li><a href="#none" id="btnSaveMfsbsc002"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnExcelMfsbsc002"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    </ul>
                </div>
            </div>
            
            <!-- 검색영역 -->
            <div class="consearch_div">            
                <div class="consearch_input">
                    <form id="searchFormMfsbsc002">
                        <input type="hidden" name="sortDirection"/>
                        <input type="hidden" name="sortColumId"/>
                        <input type="hidden" name="selectedPageNum"/>
                    <input type="hidden" name="selectedPageNum"/>
                        <ul class="consearchinput_list">
                            <li><span class="span"><label for="docmT">거래처명</span><input name="bcncNm" id="bcncNmSearchFormMfsbsc002"></li>
                            <li><span class="span"><label for="docmT">사업자등록번호</span><input name="bizrno" id="bizrnoSearchFormMfsbsc002"></li>                    
                            <li><span class="span"><label for="docmT">거래처구분</span><div id="divComboSearchBcncSe" style="display:inline-block"></div></li>                    
                            <li><span class="span"><label for="docmT">사업자유형</span><div id="divComboSearchCprSe" style="display:inline-block"></div></li>                    
                            <li><span class="span"><label for="docmT">사용여부</span>
                                <select id="useAtSearch" name="useAtSearch">
                                    <option value="">전체</option>
                                    <option value="1" selected>사용</option>
                                    <option value="0">미사용</option>
                                </select>                            
                           </li>                    
                    </form>  
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMfsbsc002"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMfsbsc002"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>            
            </div>            
             <!-- 검색영역 END -->
             
           <div class="wrapper">
             <div class="div" style="width:calc(37% - 2px);">
                <div class="div_title">
                    <span class="table_sumnum" id="spanCntMfsbsc002">0</span>
                    <div class="div_combo fr">
                        <form id="pageingFormMfsbsc002"></form>
                    </div>               
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="dataListMfsbsc002" style="height:calc(100vh - 170px); width:100%; position:relative;"> 
                </div>
            <!-- grid paging -->
            <div style="margin-top:10px">
                <div id="divPagingMfsbsc002" class="ac paging"></div>
            </div>         
            </div>     
            <div class="div_divine"></div>      
            <div class="div" style="width:calc(63% - 2px)">
                <div class="div_line_pd7" style="min-height:calc(100vh - 140px); margin-top:27px;">  
                        <div class="detail_type01" >
                            <form id="saveFormMfsbsc002">
                           <!-- 사업장 코드 --><input type="hidden" name="bplcCode" id="bplcCodeSaveFormMfsbsc002" />
                                    <table>
                                    <caption>
                                                   거래처<!-- <taglibs:transText progrmId="default" key="titMfsbsc002"/> -->
                                    </caption>
                                    <colgroup>
                                        <col width="130">
                                        <col width="">
                                        <col width="130">
                                        <col width="">
                                    </colgroup>
                                    <tr>
                                        <th class="essential_icon">
                                                          거래처 코드<!-- <taglibs:transText progrmId="default" key="titBcncCode"/> -->
                                        </th>
                                        <td>
                                            <input readonly type="text" name="bcncCode" id="bcncCodeSaveFormMfsbsc002" maxlength="10" style="width: 50%"  placeholder="자동채번"/>
                                        </td>
                                        <th class="essential_icon">
                                                          거래처 명<!-- <taglibs:transText progrmId="default" key="titBcncNm"/> -->
                                        </th>
                                        <td>
                                            <input required="true"  type="text" name="bcncNm" id="bcncNmSaveFormMfsbsc002" maxlength="25" style="width: 60%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="essential_icon">
                                                          대표자 명<!-- <taglibs:transText progrmId="default" key="titreprsntNm"/> -->
                                        </th>
                                        <td>
                                            <input required="true"  type="text" name="reprsntNm" id="reprsntNmSaveFormMfsbsc002" maxlength="10" style="width: 50%"/>
                                        </td>
                                        <th class="essential_icon">
                                                          사업자등록번호<!-- <taglibs:transText progrmId="default" key="titBizrno"/> -->
                                        </th>
                                        <td>
                                            <input required="true"  type="text" name="bizrno" id="bizrnoSaveFormMfsbsc002" maxlength="13" style="width: 50%" numberOnly/>
                                        </td>
                                     </tr>
                                    <tr>                      
                                        <th class="essential_icon">
                                                         사업자유형<!-- <taglibs:transText progrmId="default" key="titCprSe"/> -->
                                        </th>
                                        <td>
                                             <div id="divComboCprSe"  class="div_combo"></div>
                                        </td>
                                        <th>
                                                          거래처 구분<!-- <taglibs:transText progrmId="default" key="titBcncSe"/> -->
                                        </th>
                                        <td>
                                             <div id="divComboBcncSe"  class="div_combo"></div> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          거래처규모 구분<!-- <taglibs:transText progrmId="default" key="titBcncscaleSe"/> -->
                                        </th>
                                        <td>
                                            <div id="divComboBcncscaleSe"  class="div_combo"></div>
                                        </td>
                                        <th>
                                                          과세 구분<!-- <taglibs:transText progrmId="default" key="titTaxtSe"/> -->
                                        </th>
                                        <td>
                                            <div id="divComboTaxtSe"  class="div_combo"></div> 
                                        </td>
                                    </tr>                    
                                    <tr>
                                       <th class="essential_icon">
                                                          업태<!-- <taglibs:transText progrmId="default" key="titBizcnd"/> -->
                                        </th>
                                        <td>
                                            <input required="true" type="text" name="bizcnd" id="bizcndSaveFormMfsbsc002" maxlength="25" style="width:220px"/>
                                        </td>
                                       <th class="essential_icon">
                                                          종목<!-- <taglibs:transText progrmId="default" key="titInduty"/> -->
                                        </th>
                                        <td>
                                            <input required="true"  type="text" name="induty" id="indutySaveFormMfsbsc002" maxlength="25" style="width:220px"/>
                                        </td>
                
                                    </tr>
                                    <tr>
                                        <th><taglibs:transText progrmId="default" key="주소" />주소</th>
                                        <td colspan=3>
                                            <input type="text" name="postCode" id="postCode" maxlength="7" style="width: 60px" readonly/>
                                            <button type="button" id="btnTab1AddrSearch" class="btn_common03">
                                                <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                            </button>
                                            <input type="text" name="adres" id="adres" maxlength="50" style="width: 28%" autocomplete="off" readonly />
                                            <input type="text" name="addr2" id="addr2" maxlength="50" style="width: 50%;margin-top:3px" autocomplete="off" />
                                        </td>
                                    </tr>      
                                    <tr>
                                        <th>
                                                          소재지<!-- <taglibs:transText progrmId="default" key="titAreaNm"/> -->
                                        </th>
                                        <td>
                                           <div id="divComboAreaCode"  class="div_combo"></div>
                                        </td>
                                        <th>
                                            홈페이지<!-- <taglibs:transText progrmId="default" key="titHomepage"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="homepage" id="homepageSaveFormMfsbsc002" maxlength="50" style="width: 70%"/>
                                        </td>
                                    </tr>                                 
                                    <tr>
                                        <th>
                                                          대표전화번호<!-- <taglibs:transText progrmId="default" key="titTelno"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="telno" id="telnoSaveFormMfsbsc002" maxlength="20" style="width: 50%"/>
                                        </td>
                                        <th>
                                                          팩스번호<!-- <taglibs:transText progrmId="default" key="titFaxNo"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="faxNo" id="faxNoSaveFormMfsbsc002" maxlength="20" style="width: 50%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          주거래은행 <!-- <taglibs:transText progrmId="default" key="titBankCode"/> -->
                                        </th>
                                        <td>
                                           <div id="divComboBankCode"  class="div_combo"></div> 
                                        </td>
                                        <th>
                                                          계좌번호<!-- <taglibs:transText progrmId="default" key="titAcnutNo"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="acnutNo" id="acnutNoSaveFormMfsbsc002" maxlength="20" style="width: 50%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          예금주명<!-- <taglibs:transText progrmId="default" key="titDpstrNm"/> -->
                                        </th>
                                        <td colspan="3">
                                            <input type="text" name="dpstrNm" id="dpstrNmSaveFormMfsbsc002" maxlength="10" style="width: 23%"/>
                                        </td>
                                    </tr>
                
                
                                    <tr>
                                        <th>
                                                          담당자명<!-- <taglibs:transText progrmId="default" key="titChargerNm"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="chargerNm" id="chargerNmSaveFormMfsbsc002" maxlength="15" style="width: 50%"/>
                                        </td>
                                        <th>
                                                          담당자 전화번호<!-- <taglibs:transText progrmId="default" key="titChargerTelno"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="chargerTelno" id="chargerTelnoSaveFormMfsbsc002" maxlength="20" style="width: 50%"/>
                                        </td>
                
                                    </tr>
                                    <tr>
                                        <th>
                                                          담당자이메일<!-- <taglibs:transText progrmId="default" key="titChargerEmail"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="chargerEmail" id="chargerEmailSaveFormMfsbsc002" maxlength="30" style="width: 70%"/>
                                        </td>
                                        <th>
                                                          담당자부서<!-- <taglibs:transText progrmId="default" key="titChargerDept"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="chargerDept" id="chargerDeptSaveFormMfsbsc002" maxlength="10" style="width: 50%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                                          담당자 직위<!-- <taglibs:transText progrmId="default" key="titChargerOfcps"/> -->
                                        </th>
                                        <td>
                                            <input type="text" name="chargerOfcps" id="chargerOfcpsSaveFormMfsbsc002" maxlength="10" style="width: 50%"/>
                                        </td>
                                        <th>
                                                          사용 여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> -->
                                        </th>
                                       <td colspan="3">
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="useAt" id="useAtSaveFormMfsbsc002" >
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                         
                                        </td>                         
                                    </tr>                    
                                    <tr>
                                        <th>
                                                          비고<!-- <taglibs:transText progrmId="default" key="titBcncCn"/> -->
                                        </th>
                                        <td colspan="3">
                                            <input type="text" name="bcncCn" id="bcncCnSaveFormMfsbsc002" maxlength="200" style="width: 90%"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <button type="button" class="btn_common02" id="fileUpload3">
                                                <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                            </button>                               
                                        </th>
                                        <td colspan="3" id="fileList3">                                 
                                            <input type="hidden" name="atchmnflList" id="atchmnflList" />
                                            <input type="hidden" name="atchmnfl" id="atchmnfl"/>
                                            
                                            <div class="file_box h120">
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
                                        </td>
                                        
                                    </tr>                       
                                    <tr>
                                        <th>
                                                          거래처 등록일<!-- <taglibs:transText progrmId="default" key="titBcncCn"/> -->
                                        </th>
                                        <td colspan="3">
                                            <input type="text" name="regDt" id="regDtSaveFormMfsbsc002" maxlength="200" style="width: 20%" readonly/>
                                        </td>
                                    </tr>   
                                                     
                                    </table>
                                 <br/>  
                                 
                                <div>
                                       <span class="f_blue f12 h45">※ 중소기업우선대상기업</span>
                                </div>                 
                                 <div class="detail_type01">
                                 <table>
                                    <caption>
                                                   거래구매유형<!-- <taglibs:transText progrmId="default" key="titMfsbsc002"/> -->
                                    </caption>
                                    <colgroup>
                                        <col width="150">
                                        <col width="">
                                        <col width="150">
                                        <col width="">
                                        <col width="150">
                                        <col width="">            
                                        <col width="150">
                                        <col width="">                                       
                                    </colgroup>                   
                                    
                                    <tr>
                                        <th>
                                                          장애인기업 여부<!-- <taglibs:transText progrmId="default" key="titDsrprAt"/> -->
                                        </th>
                                        <td>
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="dsrprAt" id="dsrprAtSaveFormMfsbsc002" />
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                            
                                        </td>
                                        <th>
                                                          여성대표기업 여부<!-- <taglibs:transText progrmId="default" key="titWomanAt"/> -->
                                        </th>
                                        <td>
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="womanAt" id="womanAtSaveFormMfsbsc002" >
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                            
                                        </td>
                                        <th>
                                                          외자기업 여부<!-- <taglibs:transText progrmId="default" key="titForeignAt"/> -->
                                        </th>
                                        <td>
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="foreignAt" id="foreignAtSaveFormMfsbsc002" >
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                            
                                        </td>                       
                                        <th>
                                                          중증장애인기업 여부<!-- <taglibs:transText progrmId="default" key="titSerhandicapAt"/> -->
                                        </th>
                                        <td>
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="serhandicapAt" id="serhandicapAtSaveFormMfsbsc002" >
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                          
                                        </td>
                                    </tr>
                                    <tr>                         
                                        <th>
                                                          사회적기업 여부<!-- <taglibs:transText progrmId="default" key="titSocialentrprsAt"/> -->
                                        </th>
                                        <td>
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="socialentrprsAt" id="socialentrprsAtSaveFormMfsbsc002" >
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                           
                                        </td>
                                        <th>
                                                          장애인표준사업장 여부<!-- <taglibs:transText progrmId="default" key="titDspsnStdAt"/> -->
                                        </th>
                                        <td>
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="dspsnStdAt" id="dspsnStdAtSaveFormMfsbsc002" >
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                              
                                        </td>
                                        <th>
                                                          녹색제품 여부<!-- <taglibs:transText progrmId="default" key="titGreenAt"/> -->
                                        </th>
                                        <td>
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="greenAt" id="greenAtSaveFormMfsbsc002" >
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                           
                                        </td>
                                        <th>
                                                          기술개발제품 여부<!-- <taglibs:transText progrmId="default" key="titTechnologyAt"/> -->
                                        </th>
                                        <td coslpan="3">
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="technologyAt" id="technologyAtSaveFormMfsbsc002" >
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>                          
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
