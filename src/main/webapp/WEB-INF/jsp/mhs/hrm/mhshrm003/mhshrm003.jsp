<!-- 
 *    프로그램       : 조직코드관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.20
 *    사용테이블      : MHS_ORGNZT
 * sourceGen version : 2020.07.16.01 (2020.08.20)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrm/mhshrm003/mhshrm003.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnRemoveMhshrm003"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrm003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshrm003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrm003">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">조직명<!-- <taglibs:transText progrmId="default" key="titOrgnztCode"/> --></span><input name="orgnztNm" id="orgnztNmSearchFormMhshrm003"></li>
                        <li><span class="span">사용여부<!-- <taglibs:transText progrmId="default" key="titOrgnztCode"/> --></span>
                            <select id="useAtSearchFormMhshrm003" name="useAt">
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
                    <li><a href="#none" id="btnSearchMhshrm003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrm003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMhshrm003">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrm003" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrm003">
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
                        <form id="saveFormMhshrm003">
                            <input type="hidden" name = "regId" id="regIdSaveFormMhshrm003" style="width:0%"/>
                            <table>
                                <caption>조직코드<!-- <taglibs:transText progrmId="default" key="titMhshrm003"/> --></caption>
                                <colgroup>
                                    <col width="120">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">상위 조직 코드<!-- <taglibs:transText progrmId="default" key="titUpperOrgnztCode"/> --></th>
                                    <td><input required="true" type="text" name="upperOrgnztCode" id="upperOrgnztCodeSaveFormMhshrm003" maxlength="4" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">부서코드<!-- <taglibs:transText progrmId="default" key="titDeptCode"/> --></th>
                                    <td><input required="true" type="text" name="deptCode" id="deptCodeSaveFormMhshrm003" maxlength="4" style="width: 50%"/>
                                    <input required="true" type="hidden" name="orgnztLvl" id="orgnztLvlSaveFormMhshrm003" maxlength="4" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">조직코드<!-- <taglibs:transText progrmId="default" key="titOrgnztCode"/> --></th>
                                    <td><input required="true" type="text" name="orgnztCode" id="orgnztCodeSaveFormMhshrm003" maxlength="4" style="width: 50%"/>
                                        <div class="btn_common04 w70 checkDupBtn" id="checkOrgnztCode">
                                            <span class="glyphicon glyphicon-duplicate"></span>
                                            <input type="button" id="btnCheckDuporgnztCode" class="btn_input w60" value="중복확인">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">조직명<!-- <taglibs:transText progrmId="default" key="titOrgnztNm"/> --></th>
                                    <td><input required="true" type="text" name="orgnztNm" id="orgnztNmSaveFormMhshrm003" maxlength="30" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">조직 구분<!-- <taglibs:transText progrmId="default" key="titOrgnztSeCode"/> --></th>
                                    <td><div id="divComboOrgnztSeCode" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사용시작일자<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> --></th>
                                    <td><input required="true" type="text" name="useBeginDe" id="useBeginDeSaveFormMhshrm003" class="input_calen" "maxlength=16;"></td>
                                </tr>
                                <tr>
                                    <th>사용종료일자<!-- <taglibs:transText progrmId="default" key="titUseEndDe"/> --></th>
                                    <td><input type="text" name="useEndDe" id="useEndDeSaveFormMhshrm003" class="input_calen" "maxlength=16;"></td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="useAt" id="useAtSaveFormMhshrm003" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>조직관리자(장)<!-- <taglibs:transText progrmId="default" key="titDprlrEmpno"/> --></th>
                                    <td><input type="text" name="orgnztMngrEmpno" id="orgnztMngrEmpnoSaveFormMhshrm003" maxlength="10" style="width: 18%"/>
                                        <input type="text" name="orgnztMngrEmpNm" id="orgnztMngrEmpNmSaveFormMhshrm003" maxlength="10" style="width: 25%"/>
                                        <button type="button" id="btnEmpSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
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
