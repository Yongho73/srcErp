<!-- 
 *    프로그램       : 공통코드관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.22
 *    사용테이블      : STM_CODE
 * sourceGen version : 2020.07.16.01 (2020.07.22)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng003/stmmng003.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmmng003"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveStmmng003"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmmng003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmmng003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmmng003">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span"><label for="docmT">코드종류</span><input type="text" class = "w125" name="codekindCode" id="codekindCodeSearchFormStmmng003" length="20" maxlength="20" placeholder="코드를 입력하세요."/></li>
                        <li><span class="span"><label for="docmT">코드명</span><input type="text" class = "w150" name="codekindNm" id="codekindNmSearchFormStmCodeKind" length="30" maxlength="30" placeholder="코드종류명을 입력하세요."/></li>
                        <li><span class="span"><label for="docmT">업무구분</span><div id="divComboSysSeSearchFormStmCodekind" style="display:inline-block"></div></li>  
                   </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmmng003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmmng003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item2">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormStmmng003">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
<!--                         <form id="pageingFormStmCodeKind"></form> -->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListStmmng003" style="height:calc(100vh - 500px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingStmmng003">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->
            
            

            <div class="item2" style="height:calc(100vh - 1000vh) !important;">
                <div class="mt5 outer_line_form">
                    <div class="detail_type01">
                        <form id="saveFormStmmng003">
                            <table>
                                <caption>공통코드<!-- <taglibs:transText progrmId="default" key="titStmmng003"/> --></caption>
                                <colgroup>
                                    <col width="150">
                                    <col width="">
                                    <col width="150">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">코드종류<!-- <taglibs:transText progrmId="default" key="titCodekindCode"/> --></th>
                                    <td><input required="true" type="text" name="codekindCode" id="codekindCodeSaveFormStmmng003" maxlength="10" style="width: 50%"/></td>
                                    <th class="essential_icon">코드종류 명<!-- <taglibs:transText progrmId="default" key="titCodekindNm"/> --></th>
                                    <td><input required="true" type="text" name="codekindNm" id="codekindNmSaveFormStmmng003" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">시스템구분<!-- <taglibs:transText progrmId="default" key="titSysSe"/> --></th>
                                    <td><div id="divComboSysSeSaveFormStmCodekind"></div></td>
                                    <th class="essential_icon">코드 길이<!-- <taglibs:transText progrmId="default" key="titCodeLt"/> --></th>
                                    <td><input required="true" type="text" name="codeLt" id="codeLtSaveFormStmmng003" maxlength="22" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>코드 설명<!-- <taglibs:transText progrmId="default" key="titCodeDc"/> --></th>
                                    <td colspan="3"><input type="text" name="codeDc" id="codeDcSaveFormStmmng003" maxlength="200" style="width: 79%"/></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div>
                        <!-- 타이틀영역 -->
                        <div class="div_title">
                            <div class="left ml5"><span class="table_sumnum" id="spanCntCodeSearchFormStmmng003">0</span></div>
                            <!-- 타이틀영역(우측) -->
                            <div class="right mr5">
                                <button class="div_title_btn" type="button" id="btnAddCode">행추가</button>
                                <button class="div_title_btn" type="button" id="btnRemoveCode">행삭제</button>
                                <button class="div_title_btn" type="button" id="btnSaveCode">저장</button>
                                <button class="div_title_btn" type="button"id="btnUpdateCode">메모리 업데이트</button>
                            </div>
                        </div>
                        <!--// 타이틀영역 -->

                        <div class="mt5 outer_line_grid">
                                    <div class="dhtml_line">
                                <div class="dhtml_grid" id="dataListCodeStmmng003"> <!-- 그리드 영역 -->
                                </div>
                            </div>
                            <!--//detail_type01-->
                        </div>
                    </div>
                </div>
            
                        
                        
                        
            </div><!-- //오른쪽 영역 item end -->
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
