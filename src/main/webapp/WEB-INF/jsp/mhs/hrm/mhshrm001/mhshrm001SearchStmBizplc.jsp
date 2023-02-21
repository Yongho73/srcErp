<!-- 
 *    프로그램       : 사업장관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.10
 *    사용테이블      : STM_BIZPLC
 * sourceGen version : 2020.06.29.01 (2020.07.10)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrm/mhshrm001/mhshrm001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshrm001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhshrm001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrm001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrm001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span"><label for="bplcKorNm" class="label"><taglibs:transText progrmId="default" key="titBplcKorNm" /></label>
                            </span><input name="searchBplcKorNm" id="searchBplcKorNmSearchFormMhshrm001">
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrm001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrm001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMhshrm001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrm001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrm001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormMhshrm001">
                            <table>
                                <caption>사업장관리<!-- <taglibs:transText progrmId="default" key="titMhshrm001"/> --></caption>
                                <colgroup>
                                    <col width="13%">
                                    <col width="20%">
                                    <col width="13%">
                                    <col width="20%">
                                    <col width="14%">
                                    <col width="20%">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">사업장코드<!-- <taglibs:transText progrmId="default" key="titBplcCode"/> --></th>
                                    <td><input required="true" type="text" name="bplcCode" id="bplcCodeSaveFormMhshrm001" maxlength="4" class="w60p"/></td>
                                    <th class="essential_icon">법인등록번호<!-- <taglibs:transText progrmId="default" key="titJurirno"/> --></th>
                                    <td colspan="3" ><input required="true" type="text" name="jurirno" id="jurirnoSaveFormMhshrm001" maxlength="20" class="w60p"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사업장명<!-- <taglibs:transText progrmId="default" key="titBplcKorNm"/> --></th>
                                    <td><input required="true" type="text" name="bplcKorNm" id="bplcKorNmSaveFormMhshrm001" maxlength="30" style="width: 60%"/></td>
                                    <th>사업장 영문명<!-- <taglibs:transText progrmId="default" key="titBplcEngNm"/> --></th>
                                    <td><input type="text" name="bplcEngNm" id="bplcEngNmSaveFormMhshrm001" maxlength="30" style="width: 60%"/></td>
                                    <th class="essential_icon">사업자등록번호<!-- <taglibs:transText progrmId="default" key="titBizrno"/> --></th>
                                    <td><input required="true" type="text" name="bizrno" id="bizrnoSaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">대표자명<!-- <taglibs:transText progrmId="default" key="titReprsntNm"/> --></th>
                                    <td><input required="true" type="text" name="reprsntNm" id="reprsntNmSaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                    <th class="essential_icon">업태 <!-- <taglibs:transText progrmId="default" key="titBizcnd"/> --></th>
                                    <td><input required="true" type="text" name="bizcnd" id="bizcndSaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                    <th class="essential_icon">종목<!-- <taglibs:transText progrmId="default" key="titInduty"/> --></th>
                                    <td><input required="true" type="text" name="induty" id="indutySaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">주소</th>
                                    <td colspan="5">
                                        <input required="true" type="text" name="zip" id="zipSaveFormMhshrm001" readonly maxlength="6" class="w10p"/>
                                        <button type="button" id="btnZipSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                                        &nbsp;<input required="true" type="text" name="adres" id="adresSaveFormMhshrm001" maxlength="100" style="width: 36.8%"/>
                                        <input type="text" name="detailAdres" id="detailAdresSaveFormMhshrm001" maxlength="100" style="width: 51.8%"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">전화 번호<!-- <taglibs:transText progrmId="default" key="titTelno"/> --></th>
                                    <td><input required="true" type="text" name="telno" id="telnoSaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                    <th>팩스 번호<!-- <taglibs:transText progrmId="default" key="titFaxNo"/> --></th>
                                    <td><input type="text" name="faxNo" id="faxNoSaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                    <th>법정동코드<!-- <taglibs:transText progrmId="default" key="titDongCode"/> --></th>
                                    <td><input type="text" name="dongCode" id="dongCodeSaveFormMhshrm001" maxlength="10" style="width: 60%"/></td>
                                </tr>
                                <tr>
                                    <th>회계 시작일<!-- <taglibs:transText progrmId="default" key="titAccnutBeginDe"/> --></th>
                                    <td><input type="text" name="accnutBeginDe" id="accnutBeginDeSaveFormMhshrm001" class="input_calen" maxlength="10"></td>
                                    <th>자본 금액<!-- <taglibs:transText progrmId="default" key="titCapitalAmt"/> --></th>
                                    <td><input type="text" name="capitalAmt" id="capitalAmtSaveFormMhshrm001" maxlength="22" style="width: 60%"/></td>
                                    <th>과세 구분<!-- <taglibs:transText progrmId="default" key="titTaxtSe"/> --></th>
                                    <td><div id="divComboTaxtSe" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">세무서 코드<!-- <taglibs:transText progrmId="default" key="titTaxofcCode"/> --></th>
                                    <td><div required="true" id="divComboTaxofcCode" class="div_combo"></div></td>
                                    <th>지방세 관할기관<!-- <taglibs:transText progrmId="default" key="titLcltytaxCmptinst"/> --></th>
                                    <td colspan="3"><input type="text" name="lcltytaxCmptinst" id="lcltytaxCmptinstSaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                </tr>
                                <tr>
                                    <th>홈택스 Id<!-- <taglibs:transText progrmId="default" key="titHtaxId"/> --></th>
                                    <td><input type="text" name="htaxId" id="htaxIdSaveFormMhshrm001" maxlength="10" style="width: 60%"/></td>
                                    <th>홈텍스 PW<!-- <taglibs:transText progrmId="default" key="titHtaxPassword"/> --></th>
                                    <td><input type="text" name="htaxPassword" id="htaxPasswordSaveFormMhshrm001" maxlength="300" style="width: 60%"/></td>
                                    <th>홈텍스 이메일<!-- <taglibs:transText progrmId="default" key="titHtaxEmail"/> --></th>
                                    <td><input type="text" name="htaxEmail" id="htaxEmailSaveFormMhshrm001" maxlength="60" style="width: 60%"/></td>
                                </tr>
                                <tr>
                                    <th>홈택스 은행 코드<!-- <taglibs:transText progrmId="default" key="titHtaxBankCode"/> --></th>
                                    <td><div id="divComboBankCode" class="div_combo"></div></td>
                                    <th>홈택스 계좌 번호<!-- <taglibs:transText progrmId="default" key="titHtaxAcnutNo"/> --></th>
                                    <td colspan="3"><input type="text" name="htaxAcnutNo" id="htaxAcnutNoSaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                </tr>
                                <tr>
                                    <th>홈택스 담당자<!-- <taglibs:transText progrmId="default" key="titHtaxCharger"/> --></th>
                                    <td><input type="hidden" name="htaxCharger" id="htaxChargerSaveFormMhshrm001" readonly maxlength="10" style="width: 60%"/>
                                        <input type="text" name="htaxChargerNm" id="htaxChargerSaveFormMhshrm001" readonly maxlength="10" style="width: 60%"/>
                                        <button type="button" id="btnEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                    </td>
                                    <th>담당자 연락처<!-- <taglibs:transText progrmId="default" key="titHtaxMbtlnum"/> --></th>
                                    <td colspan="3"><input type="text" name="htaxMbtlnum" id="htaxMbtlnumSaveFormMhshrm001" maxlength="20" style="width: 60%"/></td>
                                </tr>
                                <tr>
                                    <th>총괄 납부 여부<!-- <taglibs:transText progrmId="default" key="titSmrizePayAt"/> --></th>
                                    <td><input type="checkbox" name="smrizePayAt" id="smrizePayAtSaveFormMhshrm001" maxlength="1"/></td>
                                    <th>총괄 납부 번호<!-- <taglibs:transText progrmId="default" key="titSmrizePayNo"/> --></th>
                                    <td><input type="text" name="smrizePayNo" id="smrizePayNoSaveFormMhshrm001" maxlength="10" style="width: 60%"/></td>
                                    <th>사업자단위 과세여부<!-- <taglibs:transText progrmId="default" key="titBsnmUnitTaxtAt"/> --></th>
                                    <td><input type="checkbox" name="bsnmUnitTaxtAt" id="bsnmUnitTaxtAtSaveFormMhshrm001" maxlength="1"/></td>
                                </tr>
                                <tr>
                                    <th>사업장 면적<!-- <taglibs:transText progrmId="default" key="titBplcArea"/> --></th>
                                    <td colspan="5"><input type="text" name="bplcArea" id="bplcAreaSaveFormMhshrm001" maxlength="22"/>
                                    ㎡ ※ 지방세 재산분 계산에 사용됨 
                                    </td>
                                </tr>
                                <tr>
                                    <th>사용여부</th>
                                    <td colspan="5">
                                        <div class="checkbox">
                                            <label><input type="checkbox" name="useAt" id="useAtSaveFormMhshrm001" ><i class="input-helper"></i></label>
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