<!-- 
 *    프로그램       : 급여항목기준관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.07
 *    사용테이블      : MPS_ITEM_STDR
 * sourceGen version : 2020.06.29.01 (2020.08.07)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc002/mpsbsc002.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMpsbsc002"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpsbsc002"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpsbsc002"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpsbsc002"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsbsc002">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                    	<li><span class="span">기준일자</span><input type="text" class="w90 input_calen al" maxlength="10" name="stdrDe" id="stdrDeSearchFormMpsbsc002"></li>
                            <li><span class="span"><label for="docmT">급여유형</span><div id="divComboSearchSalarytyCode" style="display:inline-block"></div></li>
                            <li><span class="span"><label for="docmT">급여항목</span><input type="text" name="salaryitemNm" id="salaryitemNmSearchFormMpsbsc002"></li>
                            <li><span class="span"><label for="docmT">사용여부</span>
                                <select id="useAtSearchFormMpsbsc002" name="useAtSearchFormMpsbsc002">
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
                    <li><a href="#none" id="btnSearchMpsbsc002"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsbsc002"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMpsbsc002">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMpsbsc002" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMpsbsc002">
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
                        <form id="saveFormMpsbsc002">
                            <table>
                                <caption>급여항목기준<!-- <taglibs:transText progrmId="default" key="titMpsbsc002"/> --></caption>
                                <colgroup>
                                    <col width="150">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">급여유형<!-- <taglibs:transText progrmId="default" key="titSalarytyCode"/> --></th>
                                    <td> <div id="divComboSalarytyCode"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">급여항목코드<!-- <taglibs:transText progrmId="default" key="titSalaryitemCode"/> --></th>
                                    <td>  <div id="divComboSalaryitemCode"></div>
                                    <!-- <input required="true" type="text" name="salaryitemCode" id="salaryitemCodeSaveFormMpsbsc002" maxlength="10" style="width: 50%"/> -->
                                    </td>
                                </tr>
                              
                                <tr>
                                    <th>기준금액<!-- <taglibs:transText progrmId="default" key="titStdrAmt"/> --></th>
                                    <td><input type="text" name="stdrAmt" id="stdrAmtSaveFormMpsbsc002" maxlength="22" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>과세대상 여부 <!-- <taglibs:transText progrmId="default" key="titTaxtAt"/> --></th>
                                    <td> <div id="divComboTaxtAt"></div>
                                   </td>
                                </tr>
                                  <tr>
                                    <th>한도 금액<!-- <taglibs:transText progrmId="default" key="titLmtAmt"/> --></th>
                                    <td><input type="text" name="lmtAmt" id="lmtAmtSaveFormMpsbsc002" maxlength="22" style="width: 50%"/></td>
                                </tr>
                                  <!--   <tr>
                                    <th>귀속 년도<taglibs:transText progrmId="default" key="titRversYy"/> </th>
                                    <td><input type="text" name="rversYy" id="rversYySaveFormMpsbsc002" maxlength="4" style="width: 50%"/></td>
                                </tr>
                            
                                <tr>
                                    <th>비과세 코드(국세청코드)<!-- <taglibs:transText progrmId="default" key="titTaxeCode"/> </th>
                                    <td><input type="text" name="taxeCode" id="taxeCodeSaveFormMpsbsc002" maxlength="10" style="width: 50%"/></td>
                                </tr> -->
                                <tr>
                                    <th>기준금액 적용일자<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> --></th>
                                    <td><input type="text" name="useBeginDe"  id="useBeginDeSaveFormMpsbsc002" length="10" maxlength="10" class="input_calen"  style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
                                </tr>
                                <tr>
                                    <th>기준금액 종료일자<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> --></th>
                                    <td><input type="text" name="useEndDe"  id="useEndDeSaveFormMpsbsc002" length="10" maxlength="10" class="input_calen"  style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
                                    <td>    
                                            <div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="useAt"  id="useAtSaveFormMpsbsc002">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>     
                                    </td>
                                </tr>
                                <tr>
                                    <th>금액기준등록 대상여부<!-- <taglibs:transText progrmId="default" key="titAmtStdrRegistTrgetAt"/> --></th>
                                    <td><div class="checkbox">
                                                <label> 
                                                   <input type="checkbox" name="amtStdrRegistTrgetAt">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>   
                                   </td>
                                </tr>
                                <tr>
                                    <th>적용 구분<!-- <taglibs:transText progrmId="default" key="titApplcSe"/> --></th>
                                    <td><div id="divComboApplcSe"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>계산 구분 <!-- <taglibs:transText progrmId="default" key="titCalcSe"/> --></th>
                                    <td><div id="divComboCalcSe"></div></td>
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
