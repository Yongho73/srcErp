<!-- 
 *    프로그램       : 사회보험요율관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.12
 *    사용테이블      : MPS_SNLRC_TARIFF
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc013/mpsbsc013.js"></script>
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMpsbsc013"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpsbsc013"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpsbsc013"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpsbsc013"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsbsc013">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">적용년도</span><input type="text" name=searchApplcYy id="searchApplcYySearchFormMpsbsc013" class="input_calen" size="4" maxlength="4"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsbsc013"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsbsc013"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMpsbsc013">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMpsbsc013" style="height:calc(100vh - 100px);"> <!-- 그리드 영역 --></div>
                    </div>
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                </div>
                <div class="mt5 outer_line_form">
                    <div class="detail_type01">
                        <form id="saveFormMpsbsc013" novalidate="novalidate">
                            <input type="hidden" name="insertedCheck" id="insertedCheck"/>
                            <table>
                                <colgroup>
                                    <col width="120">
                                    <col width="*">
                                    <col width="120">
                                    <col width="*">
                                </colgroup>
                                <tr>
                                   <th class="essential_icon">적용년도</th>
                                   <td><input required="true" type="text" name="applcYy" id="applcYySaveFormMpsbsc013" class="input_calen" size="4" maxlength="4"/>
                                   </td>
                                   <th class="essential_icon">변경적용일자</th>
                                   <td><input required="true" type="text" name="changeDe" id="changeDeSaveFormMpsbsc013" class="input_calen" maxlength="10"//>
                                   </td>
                                </tr>
                            </table>
                        </form>
                   </div>  <!--//detail_type01--> 
                    <div id="saveFormTap1" style="padding-top: 20px;">
                        <div  class="list_top02" id="tabbarObj" style="width:100%; height:calc(100vh - 200px);">
                            <div id="tab1" name="급여기초환경설정">
                                <div class="div_title" >
                                    <div class="left mr5"></div>
                                    <div class="right mr5">
                                        <ul class="btn">
                                            <li><button type="button" id="btnSubSaveMpsbsc013" class="btn_common01_new"><taglibs:transText progrmId="default" key="btnSave" /></button></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="mt5">
                                    <div class="detail_type01" >
                                        <table>
                                            <caption>연차수당/시간외수당 요율<!-- <taglibs:transText progrmId="default" key="titMpsbsc013"/> --></caption>
                                            <colgroup>
                                                <col width="150">
                                                <col width="">
                                                <col width="150">
                                                <col width="">
                                            </colgroup>
                                            <tr>
                                                <th class="essential_icon">생활임금<!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                                                <td colspan="3"><input required="true" type="text" name="lvwageStdramt" id="lvwageStdramtSaveFormMpsbsc013" maxlength="22" style="width: 10%" class="ar"/> 원</td>
                                            </tr>
                                            <tr>
                                                <th class="essential_icon">연차 수당<!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                                                <td>월 통상임금 × <input required="true" type="text" name="wrycAllwncTariff" id="wrycAllwncTariffSaveFormMpsbsc013" maxlength="22" style="width: 10%" class="ar"/> / 209 × 시간</td>
                                                <th class="essential_icon">시간외 수당<!-- <taglibs:transText progrmId="default" key="titEpisBsnmRt"/> --></th>
                                                <td>월 통상임금 × <input required="true" type="text" name="ovtimeAllwncTariff" id="ovtimeAllwncTariffSaveFormMpsbsc013" maxlength="22" style="width: 10%" class="ar"/> / 209 × 시간</td>
                                            </tr>
                                            <tr>
                                                <th class="essential_icon">휴일 수당<!-- <taglibs:transText progrmId="default" key="titEpisLabrrRt"/> --></th>
                                                <td>월 통상임금 × <input required="true" type="text" name="hvofworkAllwncTariff" id="hvofworkAllwncTariffSaveFormMpsbsc013" maxlength="22" style="width: 10%" class="ar"/> / 209 × 시간</td>
                                                <th class="essential_icon">야간 수당<!-- <taglibs:transText progrmId="default" key="titEpisBsnmRt"/> --></th>
                                                <td>월 통상임금 × <input required="true" type="text" name="nworkAllwncTariff" id="nworkAllwncTariffSaveFormMpsbsc013" maxlength="22" style="width: 10%" class="ar"/> / 209 × 시간</td>
                                            </tr>
                                        </table>
                                     </div>
                                 </div>
                            </div>
                        </div>
                        <div id="tab2" name="사회보험요율관리">
                        </div>
                        <div id="tab3" name="퇴직금기초설정">
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
