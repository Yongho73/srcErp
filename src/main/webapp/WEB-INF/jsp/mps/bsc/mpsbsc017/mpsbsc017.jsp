<!-- 
 *    프로그램       : 직원계좌조회 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.06
 *    사용테이블      : MHS_ACNUT
 * sourceGen version : 2020.07.16.01 (2020.08.06)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc017/mpsbsc017.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMpsbsc017"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpsbsc017"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpsbsc017"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpsbsc017"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsbsc017">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">사원</span><input type="text" name="empno" id="empnoSearchMpsbsc017" maxlength="15" style="width: 60px;" autocomplete="off">
                        <input type="text" name="empNm" id="empNmSearchMpsbsc017" maxlength="15" autocomplete="off"/>
                        <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>&nbsp;&nbsp;</li>
<!--                         <li><span class="span">계좌구분코드<taglibs:transText progrmId="default" key="titAcnutSeCode"/></span><input name="acnutSeCode" id="acnutSeCodeSearchFormMpsbsc017"></li>
 -->                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsbsc017"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsbsc017"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMpsbsc017">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMpsbsc017" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMpsbsc017">
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
                        <form id="saveFormMpsbsc017">
                            <table>
                                <caption>직원계좌조회<!-- <taglibs:transText progrmId="default" key="titMpsbsc017"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <!-- <th class="essential_icon">직원<taglibs:transText progrmId="default" key="titEmpno"/></th>
                                    <td><input required="true" type="text" name="empNm" id="empNmSaveFormMpsbsc017" maxlength="10" style="width: 50%"/></td>
                                    <button type="button" id="btnEmpSearchSaveFormMpsbsc017" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                    </button> -->
                                    <th class="essential_icon">직원<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td>
                                        <input type="hidden" name="empno" id="empnoSaveFormMpsbsc017" maxlength="10" style="width: 50px;" />
                                        <input required="true" type="text" name="empNm" id="empNmSaveFormMpsbsc017"style="width: 15%;">
                                        <button type="button" id="btnEmpSearchSaveFormMpsbsc017" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
<!--                                         <input required="true" type="text" name="empno" id="empnoSaveFormMpsbsc017" maxlength="10" style="width: 50%"/> -->
                                    </td>
                                </tr>
                                <!-- <tr>
                                    <th class="essential_icon">사원번호<taglibs:transText progrmId="default" key="titEmpno"/></th>
                                    <td><input required="true" type="text" name="empno" id="empnoSaveFormMpsbsc017" maxlength="10" style="width: 50%"/></td>
                                </tr> -->
                                <tr>
                                    <th class="essential_icon">계좌구분<!-- <taglibs:transText progrmId="default" key="titAcnutSeCode"/> --></th>
                                    <td>
                                    <div id="divComboAcnutSeCode" class="div_combo"></div>
                                    <!-- <input required="true" type="text" name="acnutSeCode" id="acnutSeCodeSaveFormMpsbsc017" maxlength="10" style="width: 50%"/> -->
                                    </td>
                                </tr>
                                <!-- <tr>
                                    <th>계좌순번<taglibs:transText progrmId="default" key="titAcnutSn"/></th>
                                    <td><input type="text" name="acnutSn" id="acnutSnSaveFormMpsbsc017" maxlength="22" style="width: 50%"/></td>
                                </tr> -->
                                <!-- <tr>
                                    <th>은행코드<taglibs:transText progrmId="default" key="titBankCode"/></th>
                                    <td><input type="text" name="bankCode" id="bankCodeSaveFormMpsbsc017" maxlength="10" style="width: 50%"/></td>
                                </tr> -->
                                <tr>
                                    <th class="essential_icon">은행<!-- <taglibs:transText progrmId="default" key="titBankNm"/> --></th>
                                    <td>
                                    <div id="divComboBankCode" class="div_combo"></div>
                                    <!-- <td><input type="text" name="bankNm" id="bankNmSaveFormMpsbsc017" maxlength="30" style="width: 50%"/></td> -->
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">계좌번호<!-- <taglibs:transText progrmId="default" key="titAcnutno"/> --></th>
                                    <td><input required="true" type="text" name="acnutno" id="acnutnoSaveFormMpsbsc017" maxlength="300" style="width: 28.3%" numberOnly/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">예금주명<!-- <taglibs:transText progrmId="default" key="titDpstrNm"/> --></th>
                                    <td><input required="true" type="text" name="dpstrNm" id="dpstrNmSaveFormMpsbsc017" maxlength="50" style="width: 15%"/></td>
                                </tr>
                                <tr>
                                    <th>시작일자<!-- <taglibs:transText progrmId="default" key="titBeginDe"/> --></th>
                                    <td><input type="text" name="beginDe" id="date1" maxlength="10"  class="input_calen"/></td>
                                </tr>
                                <tr>
                                    <th>종료일자<!-- <taglibs:transText progrmId="default" key="titEndDe"/> --></th>
                                    <td><input type="text" name="endDe" id="date2" maxlength="10"  class="input_calen"/></td>
                                </tr>
                                <!-- <tr>
                                    <th>통장 첨부파일번호<taglibs:transText progrmId="default" key="titBnkbAtchmnflno"/></th>
                                    <td><input type="text" name="bnkbAtchmnflno" id="bnkbAtchmnflnoSaveFormMpsbsc017" maxlength="1000" style="width: 50%"/></td>
                                </tr> -->
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td><input type="text" name="rm" id="rmSaveFormMpsbsc017" maxlength="200" style="width: 95%"/></td>
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
