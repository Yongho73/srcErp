<!-- 
 *    프로그램       : 소득자관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.06
 *    사용테이블      : MFS_INCOME_EARNER
 * sourceGen version : 2020.06.29.01 (2020.07.06)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mtx/bsc/mtxbsc002/mtxbsc002.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMtxbsc002"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMtxbsc002"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMtxbsc002"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMtxbsc002"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMtxbsc002">
                    <ul class="consearchinput_list">
                        <input type="hidden" name="selectedPageNum"/>
                        <li><span class="span">성명</span><input name="earnerNm" id="earnerNmSearchFormMtxbsc002"></li>
                        <li>
                            <span class="span">소득자구분</span>
                            <div id="divComboearnerSeCode" class="div_combo"></div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMtxbsc002"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMtxbsc002"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMtxbsc002">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMtxbsc002" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <div style="margin-top:10px">
                        <div id="divPagingMtxbsc002" class="ac paging"></div>
                    </div> 
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormMtxbsc002">
                            <table>
                                <caption>소득자<!-- <taglibs:transText progrmId="default" key="titMtxbsc002"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                               <tr>
                                    <th class="essential_icon">소득자구분<!-- <taglibs:transText progrmId="default" key="titEarnerSeCode"/> --></th>
                                    <td colspan="3">
                                        <!-- <div id="earnerSeCodeSaveFormMtxbsc002" name="earnerSeCode" maxlength="3" style="width: 50%"></div> -->
                                        <div id="divComboearnerSe"  class="div_combo"></div>
                                    </td>
                                </tr>
                                    <!-- 소득유형코드 C060 --><!-- <taglibs:transText progrmId="default" key="titEarnerTyCode"/> --></th>
                                    <input type="hidden" name="earnerTyCode" id="earnerTyCodeSaveFormMtxbsc002" maxlength="3" style="width: 50%"/>
                                <tr>
                                    <th class="essential_icon">성명<!-- <taglibs:transText progrmId="default" key="titEarnerNm"/> --></th>
                                    <td><input type="text" name="earnerNm" id="earnerNmSaveFormMtxbsc002" maxlength="50" style="width: 50%" required/></td>
                                    <th class="essential_icon" style="width:100px;">주민번호<!-- <taglibs:transText progrmId="default" key="titIhidnum"/> --></th>
                                    <td><input type="text" name="ihidnum" id="ihidnumSaveFormMtxbsc002" maxlength="50" style="width: 50%" placeholder="ex(000000-0000000)" required /></td>
                                </tr>
                                <tr>
                                    <th>사업자번호<!-- <taglibs:transText progrmId="default" key="titBizrno"/> --></th>
                                    <td><input type="text" name="bizrno" id="bizrnoSaveFormMtxbsc002" maxlength="20" style="width: 50%"/></td>
                                    <th>직장명<!-- <taglibs:transText progrmId="default" key="titBizrno"/> --></th>
                                    <td><input type="text" name="bcncNm" id="bcncNmSaveFormMtxbsc002" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>직위<!-- <taglibs:transText progrmId="default" key="titOfcpsNm"/> --></th>
                                    <td><input type="text" name="ofcpsNm" id="ofcpsNmSaveFormMtxbsc002" maxlength="100" style="width: 50%"/></td>
                                    <th class="essential_icon">내외국인여부<!-- <taglibs:transText progrmId="default" key="titFrgnrAt"/> --></th>
                                    <td>
                                        <div id="frgnrAtSaveFormMtxbsc002" name="frgnrAt" maxlength="3" style="width: 50%"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">거주지국<!-- <taglibs:transText progrmId="default" key="titNltyCode"/> --></th>
                                    <td>
                                        <div id="nltyCodeSaveFormMtxbsc002" name="nltyCode" maxlength="3" style="width: 50%"></div>
                                    </td>
                                    <th class="essential_icon">거주여부<!-- <taglibs:transText progrmId="default" key="titLiveSeCode"/> --></th>
                                    <td>
                                        <div id="liveSeCodeSaveFormMtxbsc002" name="liveSeCode" maxlength="3" style="width: 50%"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">우편번호<!-- <taglibs:transText progrmId="default" key="titPostCode"/> --></th>
                                    <td colspan="3">
                                    <input type="text" name="postCode" id="postCode" maxlength="7" required readonly class="w60">
                                        <button type="button" id="btnpostCodeSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"></span>
                                        </button>
                                    <!-- <input type="text" name="postCode" id="postCodeSaveFormMtxbsc002" maxlength="6" style="width: 50%"/> -->
                                    </td>
                                </tr>
                                <tr>
                                    <!-- <input type="text" name="adres" id="adres"  style="width:500px;" required><br/>
                                    <input type="text" name="detailAdres" id="detailAdres" maxlength="100"  class ="w300" required style="margin-top:3px"> -->
                                    <th>주소<!-- <taglibs:transText progrmId="default" key="titBassAdres"/> --></th>
                                    <td colspan="3"><input type="text" name="bassAdres" id="bassAdres" maxlength="100" style="width: 99%"/></td>
                                </tr>
                                <tr>
                                    <th>상세 주소<!-- <taglibs:transText progrmId="default" key="titDetailAdres"/> --></th>
                                    <td colspan="3"><input type="text" name="detailAdres" id="detailAdres" maxlength="100" style="width: 99%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">은행<!-- <taglibs:transText progrmId="default" key="titBankCode"/> --></th>
                                    <td colspan="3">
                                    <div id="bankCodeSaveFormMtxbsc002" name="bankCode" maxlength="3" style="width: 50%"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">계좌번호<!-- <taglibs:transText progrmId="default" key="titAcnutNo"/> --></th>
                                    <td><input type="text" name="acnutNo" id="acnutNoSaveFormMtxbsc002" maxlength="60" style="width: 50%" required/></td>
                                    <th class="essential_icon">예금주<!-- <taglibs:transText progrmId="default" key="titDpstrNm"/> --></th>
                                    <td><input type="text" name="dpstrNm" id="dpstrNmSaveFormMtxbsc002" maxlength="50" style="width: 50%" required/></td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="3"><input type="text" name="rm" id="rmSaveFormMtxbsc002" maxlength="200" style="width: 99%"/></td>
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
