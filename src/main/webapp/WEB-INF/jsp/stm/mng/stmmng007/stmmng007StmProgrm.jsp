<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng007/stmmng007StmProgrm.js"></script>

    <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">                 
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
                        <li><a href="#none" id="btnAddStmProgrm"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                        <li><a href="#none" id="btnSaveStmProgrm"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnRemoveStmProgrm"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                        <li><a href="#none" id="btnExcelStmProgrm"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    </ul>
                </div>
            </div>
            
            <!-- 검색영역 -->
            <div class="consearch_div">            
                <div class="consearch_input">
                    <form id="searchFormStmProgrm">
                        <input type="hidden" name="sortDirection"/>
                        <input type="hidden" name="sortColumId"/>
                        <input type="hidden" name="selectedPageNum"/>                    
                        <ul class="consearchinput_list">
                            <li><span class="span">업무구분</span><div id="divComboSubjectNm" style="display:inline-block"></div></li>
                            <li><span class="span">프로그램명</span><input name="progrmNm" id="progrmNmSearchFormStmProgrm"></li> 
                            <li><span class="span">프로그램ID</span><input name="progrmId" id="progrmIdSearchFormStmProgrm"></li>
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
                        <li><a href="#none" id="btnSearchStmProgrm"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetStmProgrm"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>            
            </div>            
             <!-- 검색영역 END -->
             
           <div class="flex">
            <div class="item6">
                <div class="div_title">
                    <div class="left">
                        <span class="table_sumnum" id="spanCntStmProgrm">0</span>
                    </div>
                    <div class="right">
                        <form id="pageingFormStmProgrm"></form>
                    </div>              
                </div>
                <!-- GRID 표현구역 -->
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line_paging">
                        <div class="dhtml_grid" id="dataListStmProgrm" style="height:calc(100vh - 170px);"> 
                        </div> 
                    </div>
                    <!-- 페이징영역 -->
                    <div class="ac paging" id="divPagingStmProgrm"></div>
                </div>
            </div>     
            <div class="item6">
                <div class="div_title"></div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">  
                        <div class="detail_type01">
                        <form id="saveFormStmProgrm">
                            <table>
                                <caption>
                                               프로그램ID  <!-- <taglibs:transText progrmId="default" key="titStmProgrm"/> -->
                                </caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">
                                                      프로그램ID<!-- <taglibs:transText progrmId="default" key="titProgrmId"/> -->
                                    </th>
                                    <td>
                                        <input required="true" type="text" name="progrmId" id="progrmIdSaveFormStmProgrm" maxlength="20" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                                      프로그명<!-- <taglibs:transText progrmId="default" key="titProgrmNm"/> -->
                                    </th>
                                    <td>
                                        <input required="true" type="text" name="progrmNm" id="progrmNmSaveFormStmProgrm" maxlength="50" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      설명<!-- <taglibs:transText progrmId="default" key="titProgrmDc"/> -->
                                    </th>
                                    <td>
                                        <input type="text" name="progrmDc" id="progrmDcSaveFormStmProgrm" maxlength="50" style="width: 50%"/>
                                    </td>
                                </tr>
                                <!--<tr>
                                    <th>
                                                      메뉴코드
                                    </th>
                                    <td>
                                        <input type="text" name="menuId" id="menuIdSaveFormStmProgrm" maxlength="20" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      경로
                                    </th>
                                    <td>
                                        <input type="text" name="url" id="urlSaveFormStmProgrm" maxlength="100" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      파일명
                                    </th>
                                    <td>
                                        <input type="text" name="fileNm" id="fileNmSaveFormStmProgrm" maxlength="20" style="width: 50%"/>
                                    </td>
                                </tr>-->
                                <tr>
                                    <th class="essential_icon">
                                                      패키지<!-- <taglibs:transText progrmId="default" key="titPckageNm"/> -->
                                    </th>
                                    <td><div id="divComboPckageNmSaveFormStmProgrm"></div>
                                        <!-- <input type="text" name="pckageNm" id="pckageNmSaveFormStmProgrm" maxlength="10" style="width: 50%"/> -->
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                                      서브 패키지<!-- <taglibs:transText progrmId="default" key="titSubPckageId"/> -->
                                    </th>
                                    <td>
                                        <input required="true" type="text" name="subPckageId" id="subPckageIdSaveFormStmProgrm" maxlength="20" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      관련테이블<!-- <taglibs:transText progrmId="default" key="titRelTblNm"/> -->
                                    </th>
                                    <td>
                                        <input type="text" name="relTblNm" id="relTblNmSaveFormStmProgrm" maxlength="50" style="width: 50%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                                      사용여부<!-- <taglibs:transText progrmId="default" key="titRelTblNm"/> -->
                                    </th> 
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox" id="useAt" name="useAt">
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
