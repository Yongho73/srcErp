<!-- 
 *    프로그램       : 인사발령 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.16
 *    사용테이블      : MHS_GNFD
 * sourceGen version : 2020.06.11.02 (2020.06.16)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hra/mhshra001/mhshra001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshra001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhshra001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshra001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshra001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshra001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">발령구분<!-- <taglibs:transText progrmId="default" key="titGnfdCode"/> --></span>
                        <div id="divSearchGnfdCode" class="div_combo"></div>
                        </li>
                        <li><span class="span">직급<!-- <taglibs:transText progrmId="default" key="titGnfdCode"/> --></span>
                            <div id="divSearchAfchgClsfCode" class="div_combo"></div>
                        </li>
                        <li><span class="span">사원<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></span>
                            <input type="text" name="searchEmpno" id="searchEmpnoSearchFormMhshra001" maxlength="15" class="w80"/>
                            <input type="text" name="searchEmpNm" id="searchEmpNmSearchFormMhshra001" class="w80"/>
                            <button type="button" id="btnEmpCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
                        <li id="searchDe"><span class="span">발령일<!-- <taglibs:transText progrmId="default" key="titGnfdCode"/> --></span>
                            <input type="text" name="searchGnfdBeginDe" id="searchGnfdBeginDeSearchFormMhshra001" class="input_calen"> ~ 
                            <input type="text" name="searchGnfEndDe" id="searchGnfEndDeSearchFormMhshra001" class="input_calen">
                            <div id="searchDe_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                        </li>
                        <li><span class="span">결재상태<!-- <taglibs:transText progrmId="default" key="titGnfdCode"/> --></span>
                        <div id="divSearchElctsctSttusCodeNm" class="div_combo"></div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshra001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshra001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMhshra001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                        <button type="button" class="btn_common02" id="btnExcelDownload"><span class="glyphicon glyphicon-paperclip"></span>엑셀 양식 다운</button>
                        <button type="button" class="btn_common02" id="btnFileUpload1"><span class="glyphicon glyphicon-paperclip"></span>엑셀 업로드</button>
                        <button type="button" class="btn_common02" id="btnPopupMhshra001"><span class="glyphicon glyphicon-paperclip"></span>승급대상자 조회</button>
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshra001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshra001">
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
                        <form id="saveFormMhshra001">
                            <table>
                                <caption>인사발령<!-- <taglibs:transText progrmId="default" key="titMhshra001"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="*">
                                    <col width="100 ">
                                    <col width="*">
                                </colgroup>
                                <tr>
                                    <th>발령번호<!-- <taglibs:transText progrmId="default" key="titGnfdDe"/> --></th>
                                    <td colspan="3"><input readonly="readonly" type="text" name="gnfdNo" id="gnfdNoSaveFormMhshra001" style="width:213px"></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">대상자<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td colspan="3">
                                        <input type="text" name="empno" id="empnoSaveFormMhshra001" style="width:86px"/>
                                        <input type="text" name="empNm" id="empNmSaveFormMhshra001" style="width:86px"/>
                                        <button type="button" id="saveBtnEmpCodeSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">발령구분<!-- <taglibs:transText progrmId="default" key="titGnfdCode"/> --></th>
                                    <td colspan="3"><div id="divSaveGnfdCode" class="div_combo"></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">발령일<!-- <taglibs:transText progrmId="default" key="titGnfdDe"/> --></th>
                                    <td colspan="3"><input type="text" name="gnfdDe" id="gnfdDeSaveFormMhshra001" class="input_calen" maxlength="10"></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">시작일자<!-- <taglibs:transText progrmId="default" key="titGnfdBeginDe"/> --></th>
                                    <td><input type="text" name="gnfdBeginDe" id="gnfdBeginDeSaveFormMhshra001" class="input_calen" maxlength="10"></td>
                                    <th>종료일자<!-- <taglibs:transText progrmId="default" key="titGnfdEndDe"/> --></th>
                                    <td><input type="text" name="gnfdEndDe" id="gnfdEndDeSaveFormMhshra001" class="input_calen" maxlength="10"></td>
                                </tr>
                                
                                <tr>
                                    <th>직급<!-- <taglibs:transText progrmId="default" key="titBfchgClsfCode"/> --></th>
                                    <td colspan="3"><div id="divBSaveAfchgClsfCode" class="div_combo"></div>▶
                                    <div id="divASaveAfchgClsfCode" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th>호봉<!-- <taglibs:transText progrmId="default" key="titBfchgSrclsCode"/> --></th>
                                    <td colspan="3"><div id="divBfchgSrclsCode" class="div_combo"></div>▶
                                    <div id="divAfchgSrclsCode" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th>직위<!-- <taglibs:transText progrmId="default" key="titBfchgOfcpsCode"/> --></th>
                                    <td colspan="3"><div id="divBfchgOfcpsCode" class="div_combo"></div>▶
                                    <div id="divAfchgOfcpsCode" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th>직종<!-- <taglibs:transText progrmId="default" key="titBfchgJssfcCode"/> --></th>
                                    <td colspan="3"><div id="divBfchgJssfcCode" class="div_combo"></div>▶
                                    <div id="divAfchgJssfcCode" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th>직책<!-- <taglibs:transText progrmId="default" key="titBfchgRspofcCode"/> --></th>
                                    <td colspan="3"><div id="divBfchgRspofcCode" class="div_combo"></div>▶
                                    <div id="divAfchgRspofcCode" class="div_combo"></div></td>
                                </tr>
                                
                                <tr>
                                    <th>부서<!-- <taglibs:transText progrmId="default" key="titBfchgDeptCode"/> --></th>
                                    <td colspan="3"><input type="text" name="bfchgDeptCodeNm" id="bfchgDeptCodeNmSaveFormMhshra001" style="width:87px"/>▶
                                    <input type="text" name="deptCode" id="deptCode" maxlength="15" style="width:86px"/>
                                    <input type="text" name="deptCodeNm" id="deptCodeNm" style="width:86px"/>
                                    <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                                    <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                    </button></td>
                                </tr>
                               <!-- <tr>
                                    <th>직렬코드</th>
                                    <td colspan="3"><div id="divBfchgJblnCode" class="div_combo"></div>▶
                                    <div id="divAfchgJblnCode" class="div_combo"></div></td>
                                </tr> -->
                                <tr>
                                    <th>비고</th>
                                    <td colspan="3">
                                        <textarea name="gnfdDtls" id="gnfdDtls" rows="3" cols="80"></textarea> 
                                    </td>
                                </tr>
                                <tr>
                                    <th>겸임여부<!-- <taglibs:transText progrmId="default" key="titHdadptAt"/> --></th>
                                    <td colspan="3"><input type="checkbox" name="hdadptAt" id="hdadptAtSaveFormMhshra001" maxlength="1"/></td>
                                </tr>
                                <tr>
                                    <th>결재상태<!-- <taglibs:transText progrmId="default" key="titHdadptAt"/> --></th>
                                    <td colspan="3"><input readonly="readonly" type="text" id="elctsctSttusCodeNmMhshra001" name = "elctsctSttusCodeNm" class="w50"/></td>
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
