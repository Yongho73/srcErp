<!-- 
 *    프로그램       : 근무유형관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.28
 *    사용테이블      : MHS_WORKTY
 * sourceGen version : 2020.07.16.01 (2020.08.28)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/flx/mhsflx001/mhsflx001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnSaveMhsflx001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhsflx001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhsflx001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">근무유형</span><input name="workTyCode" id="workTyCodeSearchFormMhsflx001"></li>
                        <li><span class="span">사용여부</span>
                            <select name="useAt" id="useAtSearchFormMhsflx001">
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
                    <li><a href="#none" id="btnSearchMhsflx001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhsflx001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMhsflx001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhsflx001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhsflx001">
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
                        <form id="saveFormMhsflx001">
                            <table>
                                <caption>개인정보조회<!-- <taglibs:transText progrmId="default" key="titMhsflx001"/> --></caption>
                                <colgroup>
                                    <col width="150">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">근무유형코드<!-- <taglibs:transText progrmId="default" key="titWorkTyCode"/> --></th>
                                    <td><input required="true" type="text" name="workTyCode" id="workTyCodeSaveFormMhsflx001" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>근무유형명<!-- <taglibs:transText progrmId="default" key="titWorkTyCodeNm"/> --></th>
                                    <td><input type="text" name="workTyCodeNm" id="workTyCodeNmSaveFormMhsflx001" maxlength="30" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="useAt" id="useAtSaveFormMhsflx001">
                                                <i class="input-helper"></i></label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>기본유형여부<!-- <taglibs:transText progrmId="default" key="titBassTyAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="bassTyAt" id="bassTyAtSaveFormMhsflx001">
                                                <i class="input-helper"></i></label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>산정기간<!-- <taglibs:transText progrmId="default" key="titCalcPd"/> --></th>
                                    <td>
                                        <div id="divInputFormComboCalcPd01Mhsflx001" class="div_combo" style="display:;"></div>
                                        <div id="divInputFormComboCalcPd02Mhsflx001" class="div_combo" style="display:none;"></div>
                                        <div id="divInputFormComboCalcPd03Mhsflx001" class="div_combo" style="display:none;"></div>
                                         &nbsp;&nbsp; (탄력/선택적근로시간)
                                    </td>
                                </tr>
                                <tr>
                                    <th>CORE TIME 적용여부<!-- <taglibs:transText progrmId="default" key="titCoreTimeApplcAt"/> --></th>
                                    <td>
                                    <select id="coreTimeApplcAtMhsflx001" name="coreTimeApplcAtMhsflx001">
                                            <option value="0">적용안함</option>
                                            <option value="1">적용</option>
                                    </select> &nbsp;&nbsp; (선택적근로시간)
                                    </td>
                                </tr>
                                <tr>
                                    <th>출근확인여부<!-- <taglibs:transText progrmId="default" key="titAttendConfirmAt"/> --></th>
                                    <td>
                                        <select id="attendConfirmAtMhsflx001" name="attendConfirmAtMhsflx001">
                                            <option value="0">확인안함</option>
                                            <option value="1">확인</option>
                                        </select> &nbsp;&nbsp; (재량근로시간)
                                    </td>
                                </tr>
                                <tr>
                                    <th>1일 인정 근무시간<!-- <taglibs:transText progrmId="default" key="titDayRecogWorktime"/> --></th>
                                    <td><input type="text" name="dayRecogWorktime" id="dayRecogWorktimeSaveFormMhsflx001" maxlength="20" style="width: 50%"/>
                                         &nbsp;&nbsp; (간주/재량근로시간)
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
