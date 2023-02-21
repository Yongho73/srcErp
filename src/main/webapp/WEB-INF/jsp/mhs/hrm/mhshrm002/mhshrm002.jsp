<!-- 
 *    프로그램       : 부서코드등록 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.19
 *    사용테이블      : MHS_DEPT
 * sourceGen version : 2020.07.16.01 (2020.08.19)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrm/mhshrm002/mhshrm002.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshrm002"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhshrm002"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrm002"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshrm002"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrm002">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">부서명<!-- <taglibs:transText progrmId="default" key="titDeptCode"/> --></span><input name="deptKorNm" id="deptKorNmSearchFormMhshrm002"></li>
                        <li><span class="span">사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></span>
                            <select id="useAtSearchFormMhshrm002" name="useAt">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">사용안함</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrm002"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrm002"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMhshrm002">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrm002" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrm002">
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
                        <form id="saveFormMhshrm002">
                            <table>
                                <caption>부서코드등록<!-- <taglibs:transText progrmId="default" key="titMhshrm002"/> --></caption>
                                <colgroup>
                                    <col width="110">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">부서코드<!-- <taglibs:transText progrmId="default" key="titDeptCode"/> --></th>
                                    <td><input required="true" type="text" name="deptCode" id="deptCodeSaveFormMhshrm002" maxlength="4" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">부서한글명<!-- <taglibs:transText progrmId="default" key="titDeptKorNm"/> --></th>
                                    <td><input required="true" type="text" name="deptKorNm" id="deptKorNmSaveFormMhshrm002" maxlength="30" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사용시작일자<!-- <taglibs:transText progrmId="default" key="titUseBeginDe"/> --></th>
                                    <td><input required="true" type="text" name="useBeginDe" id="useBeginDeSaveFormMhshrm002" class="input_calen" "maxlength=10;"></td>
                                </tr>
                                <tr>
                                    <th>사용종료일자<!-- <taglibs:transText progrmId="default" key="titUseEndDe"/> --></th>
                                    <td><input type="text" name="useEndDe" id="useEndDeSaveFormMhshrm002" class="input_calen" "maxlength=10;"></td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="useAt" id="useAtSaveFormMhshrm002" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>부서전화번호<!-- <taglibs:transText progrmId="default" key="titDeptTelno"/> --></th>
                                    <td><input type="text" name="deptTelno" id="deptTelnoSaveFormMhshrm002" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>부서FAX번호<!-- <taglibs:transText progrmId="default" key="titDeptFaxTelno"/> --></th>
                                    <td><input type="text" name="deptFaxTelno" id="deptFaxTelnoSaveFormMhshrm002" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>부서이메일<!-- <taglibs:transText progrmId="default" key="titDeptEmail"/> --></th>
                                    <td><input type="text" name="deptEmail" id="deptEmailSaveFormMhshrm002" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>예산 사용 부서<!-- <taglibs:transText progrmId="default" key="titBugtUseDept"/> --></th>
                                    <td>
                                        <input type="text" name="bugtUseDept" id="bugtUseDeptSaveFormMhshrm002" maxlength="20" style="width: 18%"/>
                                        <input type="text" name="bugtUseDeptNm" id="bugtUseDeptNmSaveFormMhshrm002" maxlength="20" style="width: 25%"/>
                                        <button type="button" id="btnDeptSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>부서장<!-- <taglibs:transText progrmId="default" key="titDprlrEmpno"/> --></th>
                                    <td><input type="text" name="dprlrEmpno" id="dprlrEmpnoSaveFormMhshrm002" maxlength="10" style="width: 18%"/>
                                        <input type="text" name="dprlrEmpNm" id="dprlrEmpNmSaveFormMhshrm002" maxlength="10" style="width: 25%"/>
                                        <button type="button" id="btnEmpSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>출력순서<!-- <taglibs:transText progrmId="default" key="titSortOrdr"/> --></th>
                                    <td><input type="text" name="sortOrdr" id="sortOrdrSaveFormMhshrm002" maxlength="22" style="width: 50%"/></td>
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
