<!-- 
 *    프로그램      : 공통코드관리
 *    작성자         : 디비비전
 *    작성일자      : 2020.04.01
 *    사용테이블   : STM_CODEKIND, STM_CODE
 -->
<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng003/stmmng003SearchStmCode.js"></script>

     <div class="wrapper_con">
            <div class="path_div">
                <div class="path" id="menu_path">
                </div>
                <div class="pathbt_div">
                    <ul class="pathbt_list">
                        <li><a href="#none" id="btnAddStmCodeKind"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                        <li><a href="#none" id="btnSaveStmCodeKind"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                        <li><a href="#none" id="btnRemoveStmCodeKind"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                        <li><a href="#none" id="btnExcelStmCodeKind"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                    </ul>
                </div>
            </div>

            <!-- 검색영역 -->
            <div class="consearch_div">
                <div class="consearch_input">
                    <form id="searchFormStmCodeKind">
                    <input type="hidden" name="selectedPageNum"/>
                        <ul class="consearchinput_list">
                            <li><span class="span"><label for="docmT">코드종류</span><input type="text" name="stmCodekind" id="stmCodekindSearchFormStmCodeKind" length="20" maxlength="20" placeholder="코드를 입력하세요."/></li>
                            <li><span class="span"><label for="docmT">코드명</span><input type="text" name="stmCodekindNm" id="stmCodekindNmSearchFormStmCodeKind" length="30" maxlength="30" placeholder="코드종류명을 입력하세요."/></li>
                            <li><span class="span"><label for="docmT">업무구분<%-- <taglibs:transText progrmId="default" key="titSysSe" /> --%></span><div id="divComboSysSeSearchFormStmCodekind" style="display:inline-block"></div></li>  
                        </ul>
                    </form>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchStmCodeKind"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnInitStmCodeKind"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
             <!-- 검색영역 END -->

           <div class="wrapper">
             <div class="div" style="width:calc(25% - 5px);">
                <div class="div_title">
                    <span class="table_sumnum" id="spanStmCodeKindCnt">0</span>
                    <div class="div_combo fr">
                        <form id="pageingFormStmCodeKind"></form>
                    </div>
                </div>
                <!-- GRID 표현구역 -->
                <div class="div_line" id="divDataListStmCodeKind" style="height:calc(100vh - 170px); width:100%; position:relative;">
                </div>
            <!-- grid paging -->
            <div style="margin-top:10px">
                <div id="divPagingStmCodeKind" class="ac paging"></div>
            </div>
            </div>
            <div class="div_divine"></div>
            <div class="div" style="width:calc(75% - 5px)">
                <div class="div_line" style="min-height:calc(100vh - 120px); margin-top:23px;">
                        <div class="detail_type01">
                                <!--오른쪽 상단영역--> 
                                <form id="saveFormStmCodeKind">
                            
                                <input type="hidden" name="olStmCodekind" id="olStmCodekindSaveFormStemCodeKind" />
                                
                                <table>
                                    <colgroup>
                                        <col width="150">
                                        <col width="*">
                                        <col width="150">
                                        <col width="*">
                                    </colgroup>
                                    <tr>
                                        <th class="essential_icon"><taglibs:transText progrmId="default" key="titCodekindCode" /></th>
                                        <td>
                                        
                                            <input required type="text" name="stmCodekind" id="stmCodekindSaveFormStemCodeKind" length="20" maxlength="20"/>
                                            
                                            <div class="btn_common04 w70 checkDupBtn" id="btnCheckDupStmCodeKind">
                                                <span class="glyphicon glyphicon-duplicate"></span>
                                                <input type="button" class="btn_input w60" value="중복확인">
                                            </div>
                                            
                                        </td>
                                        <th class="essential_icon"><taglibs:transText progrmId="default" key="titCodekindNm" /></th>
                                        <td>
                                            <input required type="text" name="stmCodekindNm" id="stmCodekindNmSaveFormStemCodeKind" length="30" maxlength="30" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="essential_icon"><taglibs:transText progrmId="default" key="titSysSe" /></th>
                                        <td>
                                            <div id="divComboSysSeSaveFormStmCodekind" class="div_combo"></div>
                                        </td>
                                        <th class="essential_icon"><taglibs:transText progrmId="default" key="titCodeLt" /></th>
                                        <td>
                                            <input required="true" number="true" type="text" value="1" name="codeLt" id="codeLtSaveFormStemCodeKind" length="10" maxlength="10" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><taglibs:transText progrmId="default" key="titCodeDc"/></th>
                                        <td colspan="3">
                                            <input type="text" name="codeDc" id="codeDcSaveFormStemCodeKind" maxlength="200" style="width: 99%" />                                
                                        </td>
                                    </tr>
                                </table>
                                
                            </form>
        
                            <div class="list_top">
            
                                <span class="view">
                                    <taglibs:transText progrmId="default" key="titRdcnt"/>&nbsp;<span id="spanStmCodeCnt"></span>
                                    <taglibs:transText progrmId="default" key="titSearchCnt"/>
                                </span>
            
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
                                                        
                                        <button type="button" id="btnMemUpt" class="btn_common01_new">
                                            <!-- <span class="glyphicon glyphicon-refresh mr2"></span>-->
                                            <taglibs:transText progrmId="default" key="btnMemUpt" />
                                        </button>
                             
                                    </li>
                                </ul>
                                
                            </div>
                         </div>
                         <div>   
                            <!-- stmcode grid -->
                            <div>
                                <div class="div_line"  id="divDataListStmCode" style="width: 100%; height: 500px"></div>
                            </div>                            
                            
                        </div>
                </div>
            </div>
              <div class="div_divine"></div>
           </div>
    </div>
</body>
