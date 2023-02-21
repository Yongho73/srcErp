<!-- 
 *    프로그램       : 급여항목관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.28
 *    사용테이블      : MPS_SALARYITEM
 * sourceGen version : 2020.07.16.01 (2020.08.28)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/bsc/mpsbsc001/mpsbsc001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMpsbsc001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMpsbsc001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMpsbsc001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMpsbsc001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMpsbsc001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                    	<li><span class="span">기준일자</span><input type="text" class="w90 input_calen al" maxlength="10" name="stdrDt" id="stdrDtSearchFormMpsbsc001"></li>
                        <li><span class="span">급여항목코드<!-- <taglibs:transText progrmId="default" key="titSalaryitemCode"/> --></span><input name="salaryitemCode" id="salaryitemCodeSearchFormMpsbsc001"></li>
                        <li><span class="span">급여항목명</span><input name="salaryitemCodeNm" id="salaryitemCodeNmSearchFormMpsbsc001"></li>
                        <li><span class="span">지급공제여부</span><div id="divComboSearchPymntddcSe" class="div_combo"></li>
                        <li><span class="span">사용여부</span>
                            <select name="useAt" id="useAtSearchFormMpsbsc001">
                                <option value="">전체</option>
                                <option value="1" selected>사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>    
                        <li><span class="span">대상구분</span>
                            <select name="kindSe" id="kindSeSearchFormMpsbsc001">
                                <option value="" selected>전체</option>
                                <option value="odysg">통상임금</option>
                                <option value="avrgwage">평균임금</option>
                                <option value="asyy">일할계산</option>
                                <option value="calc">급여계산 기준항목</option>
                                <option value="apntc">수습적용</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMpsbsc001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMpsbsc001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMpsbsc001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMpsbsc001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMpsbsc001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item6">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    -->
                    <div class="right">
                        <button class="div_title_btn" type="button" id="btnCopyMpsbsc001"><span id="btnAppList">복사</span></button>
                    </div>
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormMpsbsc001">
                            <table>
                                <caption>급여항목<!-- <taglibs:transText progrmId="default" key="titMpsbsc001"/> --></caption>
                                <colgroup>
                                    <col width="130">
                                    <col width="">
                                    <col width="130">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">급여항목코드<!-- <taglibs:transText progrmId="default" key="titSalaryitemCode"/> --></th>
                                    <td colspan="3"><input required="true" type="text" name="salaryitemCode" id="salaryitemCodeSaveFormMpsbsc001" maxlength="10" style="width: 40%"/>
                                        <div class="btn_common04 w70 checkDupBtn" id="checkDupCode">
                                            <span class="glyphicon glyphicon-duplicate"></span>
                                            <input type="button" id="btnCheckDup" class="btn_input w60" value="중복확인">
                                        </div> 
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사용시작일<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> --></th>
                                    <td><input required="true" type="text" name="useBeginDe" id="useBeginDeSaveFormMpsbsc001" class="input_calen"  maxlength="10"/></td>
                                    <th>사용종료일<!-- <taglibs:transText progrmId="default" key="titUseEndDe"/> --></th>
                                    <td><input type="text" name="useEndDe" id="useEndDeSaveFormMpsbsc001" class="input_calen"  maxlength="10"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">급여항목명<!-- <taglibs:transText progrmId="default" key="titSalaryitemNm"/> --></th>
                                    <td colspan="3"><input required="true" type="text" name="salaryitemNm" id="salaryitemNmSaveFormMpsbsc001" maxlength="30" style="width: 90%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">지급공제구분<!-- <taglibs:transText progrmId="default" key="titPymntddcSe"/> --></th>
                                    <td><div id="divComboPymntddcSe"></td>
                                    <th>급여대상구분</th>
                                    <td><div id="divComboSalaryApplcSe"></td>
                                </tr>
                                <tr>
                                    <th>통상임금포함 여부<!-- <taglibs:transText progrmId="default" key="titOdysgInclsAt"/> --></th>
                                    <td>                     
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox" name="odysgInclsAt" id="odysgInclsAtSaveFormMpsbsc001">
                                              <i class="input-helper"></i>                                
                                            </label>
                                        </div>
                                    </td>
                                    <th>평균임금포함 여부<!-- <taglibs:transText progrmId="default" key="titAvrgwageInclsAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox" name="avrgwageInclsAt" id="avrgwageInclsAtSaveFormMpsbsc001">
                                              <i class="input-helper"></i>                                
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>일할 계산 여부<!-- <taglibs:transText progrmId="default" key="titAsyyCalcAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox" name="asyyCalcAt" id="asyyCalcAtSaveFormMpsbsc001">
                                              <i class="input-helper"></i>                                
                                            </label>
                                        </div>
                                    </td>
                                    <th>수습적용 여부<!-- <taglibs:transText progrmId="default" key="titApntcApplcAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox" name="apntcApplcAt" id="apntcApplcAtSaveFormMpsbsc001">
                                              <i class="input-helper"></i>                                
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                              <input type="checkbox" name="useAt" id="useAtSaveFormMpsbsc001">
                                              <i class="input-helper"></i>                                
                                            </label>
                                        </div>
                                    </td>
                                    <th class="essential_icon">출력순서<!-- <taglibs:transText progrmId="default" key="titOutptOrdr"/> --></th>
                                    <td><input required="true" type="text" name="outptOrdr" id="outptOrdrSaveFormMpsbsc001" maxlength="3" style="width: 40%"/></td>
                                </tr>
                                <tr>
                                    <th>급여계산 기준 항목<!-- <taglibs:transText progrmId="default" key="titCalcApplcAt"/> --></th>
                                    <td colspan="3">
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="calcApplcAt" id="calcApplcAtSaveFormMpsbsc001" >
                                                <i class="input-helper"></i>
                                            </label>
                                        </div> 
                                        <span>금액기준계산시 노출됩니다. </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titSalaryitemDtls"/> --></th>
                                    <td colspan="3"><input type="text" name="salaryitemDtls" id="salaryitemDtlsSaveFormMpsbsc001" maxlength="200" style="width: 90%"/></td>
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
