<!-- 
 *    프로그램       : 프로그램ID  관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.28
 *    사용테이블      : STM_PROGRM
 * sourceGen version : 2020.07.16.01 (2020.07.28)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng007/stmmng007.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmmng007"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveStmmng007"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmmng007"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmmng007"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmmng007">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">업무구분<!-- <taglibs:transText progrmId="default" key="titSubjectNm"/> --></span><div id="pckageNmSearchFormStmmng007" class="div_combo"></div></li>
                        <li><span class="span">프로그램명<!-- <taglibs:transText progrmId="default" key="titProgrmNm"/> --></span><input name="progrmNm" id="progrmNmSearchFormStmmng007"></li>
                        <li><span class="span">프로그램ID<!-- <taglibs:transText progrmId="default" key="titProgrmId"/> --></span><input name="progrmId" id="progrmIdSearchFormStmmng007"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmmng007"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmmng007"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item6">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormStmmng007">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListStmmng007" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingStmmng007">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item6">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormStmmng007">
                            <table>
                                <caption>프로그램ID관리<!-- <taglibs:transText progrmId="default" key="titStmmng007"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">프로그램ID<!-- <taglibs:transText progrmId="default" key="titProgrmId"/> --></th>
                                    <td><input required="true" type="text" name="progrmId" id="progrmIdSaveFormStmmng007" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>프로그램명<!-- <taglibs:transText progrmId="default" key="titProgrmNm"/> --></th>
                                    <td><input type="text" name="progrmNm" id="progrmNmSaveFormStmmng007" maxlength="30" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>설명<!-- <taglibs:transText progrmId="default" key="titProgrmDc"/> --></th>
                                    <td><input type="text" name="progrmDc" id="progrmDcSaveFormStmmng007" maxlength="1000" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>메뉴코드<!-- <taglibs:transText progrmId="default" key="titProgrmId"/> --></th>
                                    <td><input type="text" name="menuId" id="menuCodeSaveFormStmmng007" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>경로<!-- <taglibs:transText progrmId="default" key="titUrl"/> --></th>
                                    <td><input type="text" name="url" id="urlSaveFormStmmng007" maxlength="30" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>파일명<!-- <taglibs:transText progrmId="default" key="titFileNm"/> --></th>
                                    <td><input type="text" name="fileNm" id="fileNmSaveFormStmmng007" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>패키지<!-- <taglibs:transText progrmId="default" key="titPckageNm"/> --></th>
                                    <td><input type="text" name="pckageNm" id="pckageNmSaveFormStmmng007" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>서브 패키지<!-- <taglibs:transText progrmId="default" key="titSubPckageId"/> --></th>
                                    <td><input type="text" name="subPckageId" id="subPckageIdSaveFormStmmng007" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>관련테이블<!-- <taglibs:transText progrmId="default" key="titRelTblNm"/> --></th>
                                    <td><input type="text" name="relTblNm" id="relTblNmSaveFormStmmng007" maxlength="50" style="width: 50%"/></td>
                                </tr>
                            </table>
                        </form>
                    </div>  <!--//detail_type01--> 
                    <!-- 폼이 두개인 경우 아래 추가 
                    <div>
                        <div class="div_title">
                            <div class="left ml5"></div>
                            <div class="right mr5"></div>
                        </div>
                        <div class="mt5">
                            <div class="detail_type01">
                            </div>
                        </div>
                    </div>
                    폼이 두개인 경우 여기까지 추가 --> 
                </div>  <!--// outer_line_form -->
            </div><!-- //오른쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
