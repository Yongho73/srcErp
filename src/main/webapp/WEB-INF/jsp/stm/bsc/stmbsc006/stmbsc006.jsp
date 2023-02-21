<!-- 
 *    프로그램       : 자동채번설정 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.13
 *    사용테이블      : STM_NUM_RULE
 * sourceGen version : 2020.07.16.01 (2020.08.13)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/bsc/stmbsc006/stmbsc006.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmbsc006"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveStmbsc006"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmbsc006"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmbsc006"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmbsc006">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">채번명칭</span><input name="searchNumberingNm" id="searchNumberingNmSearchFormStmbsc006"></li>
                        <li><span class="span">사용여부</span>
                            <select id="useAtSearchFormStmbsc006" name="useAt">
                                <option value="">전체</option>
                                <option value="1" selected>사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmbsc006"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmbsc006"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item7">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormStmbsc006">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListStmbsc006" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingStmbsc006">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item7">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormStmbsc006">
                            <table>
                                <caption>자동채번설정<!-- <taglibs:transText progrmId="default" key="titStmbsc006"/> --></caption>
                                <colgroup>
                                    <col width="120">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">채번명칭<!-- <taglibs:transText progrmId="default" key="titNumberingNm"/> --></th>
                                    <td><input required="true" type="text" name="numberingNm" id="numberingNmSaveFormStmbsc006" maxlength="50" class="w70p"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">관련테이블<!-- <taglibs:transText progrmId="default" key="titRelTblNm"/> --></th>
                                    <td><div id="divRelTblNmSaveFormStmbsc006" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">관련항목<!-- <taglibs:transText progrmId="default" key="titRelItemNm"/> --></th>
                                    <td><div id="divRelItemNmSaveFormStmbsc006" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">채번패턴<!-- <taglibs:transText progrmId="default" key="titNumberingFom"/> --></th>
                                    <td><input required="true" type="text" name="numberingFom" id="numberingFomSaveFormStmbsc006" maxlength="30" class="w70p"/></td>
                                </tr>
                                <tr>
                                    <th>머리글 사용여부<!-- <taglibs:transText progrmId="default" key="titPrefixUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="prefixUseAt" id="prefixUseAtSaveFormStmbsc006" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>머리글 선택<!-- <taglibs:transText progrmId="default" key="titPrefixSeCode"/> --></th>
                                    <td><div id="divPrefixSeCodeSaveFormStmbsc006" class="div_combo"></div>
                                    &nbsp;&nbsp;&nbsp;<input type="text" name="prefixNm" id="prefixNmSaveFormStmbsc006" readonly="readonly" style="width:105px"></td>
                                </tr>
                                <tr>
                                    <th>년도 사용여부<!-- <taglibs:transText progrmId="default" key="titPrefixUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="yyUseAt" id="yyUseAtSaveFormStmbsc006" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>년도길이 선택<!-- <taglibs:transText progrmId="default" key="titYyLtCode"/> --></th>
                                    <td><div id="divYyLtCodeSaveFormStmbsc006" class="div_combo"></div>
                                    &nbsp;&nbsp;&nbsp;<input type="text" name="yyUseCodeNm" id="yyUseCodeNmSaveFormStmbsc006" readonly="readonly" class="w50"></td>
                                </tr>
                                <tr>
                                    <th>월 사용여부<!-- <taglibs:transText progrmId="default" key="titPrefixUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="mtUseAt" id="mtUseAtSaveFormStmbsc006" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>일자 사용여부<!-- <taglibs:transText progrmId="default" key="titPrefixUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="deUseAt" id="deUseAtSaveFormStmbsc006" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>구분자 사용여부<!-- <taglibs:transText progrmId="default" key="titPrefixUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="seUseAt" id="seUseAtSaveFormStmbsc006" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>순번 사용여부<!-- <taglibs:transText progrmId="default" key="titPrefixUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="snUseAt" id="snUseAtSaveFormStmbsc006" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>순번길이<!-- <taglibs:transText progrmId="default" key="titSnLt"/> --></th>
                                    <td><div id="divSnLtSaveFormStmbsc006" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th>최종번호<!-- <taglibs:transText progrmId="default" key="titDeUseAt"/> --></th>
                                    <td><input type="text" name="maxNumber" id="maxNumberSaveFormStmbsc006" class="w70p"/></td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="useAt" id="useAtSaveFormStmbsc006" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>수정여부<!-- <taglibs:transText progrmId="default" key="titUpdtAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="updtAt" id="updtAtSaveFormStmbsc006" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <div><span class="f_red2 f12">※ 초기 설정시 관련 테이블 정보는 테이블 "소유자"를 확인하세요!</span></div>
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
