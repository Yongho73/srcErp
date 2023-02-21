<!-- 
 *    프로그램       : 전결규정 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.03.22
 *    사용테이블      : SGN_DCRB_REGLTN
 * sourceGen version : 2021.02.18.01 (2021.03.22)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/ets/bst/etsbst001/etsbst001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddEtsbst001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveEtsbst001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveEtsbst001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelEtsbst001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormEtsbst001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">업무명<!-- <taglibs:transText progrmId="default" key="titDcrbNo"/> --></span><input name="jobnmSearch" id="jobnmSearchFormEtsbst001"></li>
                        <li><span class="span">업무내용<!-- <taglibs:transText progrmId="default" key="titDcrbNo"/> --></span><input name="jobDcSearch" id="jobDcSearchFormEtsbst001" class='w200'></li>
                        <li><span class="span">사용여부<!-- <taglibs:transText progrmId="default" key="titDcrbNo"/> --></span>
                        	<select name='useAtSearch' id='useAtSearchFormEtsbst001'>
                        		<option value=''>전체</option>
                        		<option value='1' selected>사용</option>
                        		<option value='0'>미사용</option>
                        	</select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchEtsbst001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetEtsbst001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item5">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormEtsbst001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListEtsbst001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingEtsbst001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item5">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormEtsbst001">
                            <table>
                                <caption>전결규정<!-- <taglibs:transText progrmId="default" key="titEtsbst001"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">업무명<!-- <taglibs:transText progrmId="default" key="titJobnm"/> --></th>
                                    <td><input required="true" type="text" name="jobnm" id="jobnmSaveFormEtsbst001" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">상세 단위과제<!-- <taglibs:transText progrmId="default" key="titDetailUnitAssgmnt"/> --></th>
                                    <td><input required="true" type="text" name="detailUnitAssgmnt" id="detailUnitAssgmntSaveFormEtsbst001" maxlength="200" style="width: 70%"/></td>
                                </tr>
                                <tr>
                                    <th>업무내용<!-- <taglibs:transText progrmId="default" key="titJobDc"/> --></th>
                                    <td>
                                    	<textarea rows="5" class='w95p' name="jobDc" id="jobDcSaveFormEtsbst001" maxlength="50"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th>전결결재레벨<!-- <taglibs:transText progrmId="default" key="titSanctnLvl"/> --></th>
                                    <td>
										<div id="sanctnLvlSaveFormEtsbst001"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>사용여부</th>
                                    <td>
                                        <div class="checkbox">
                                            <label><input type="checkbox" name="useAt" id="useAtSaveFormEtsbst001" ><i class="input-helper"></i></label>
                                        </div>                                       
                                    </td>
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
