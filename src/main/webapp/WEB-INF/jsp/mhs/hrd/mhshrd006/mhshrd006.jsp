<!-- 
 *    프로그램       : 휴직신청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.21
 *    사용테이블      : MHS_LAYOFF
 -->
 
 
<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrd/mhshrd006/mhshrd006.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshrd006"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhshrd006"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrd006"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshrd006"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <form id="searchFormMhshrd006">
            <div class="consearch_div">
                <div class="consearch_input">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">부서</span>
                            <input type="text" name="searchDeptNo" id="searchDeptNoMhshrd006" maxlength="15" class="w50"/>
                            <input type="text" name="searchDeptNm" id="searchDeptNmMhshrd006" class="w80">
                            <button type="button" id="btnDeptCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                       </li>
                        <li><span class="span">사원</span>
                            <input type="text" name="searchEmpno" id="searchEmpnoMhshrd006" maxlength="15" class="w50"/>
                            <input type="text" name="searchEmpNm" id="searchEmpNmMhshrd006" class="w90">
                            <button type="button" id="btnEmpCodeSearch" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                       </li>
                       <li><span class="span">휴직구분</span><div id="divComboSearchLayoffSe" class="div_combo"></div></li>
                    </ul>
                </div>
            </div>
            <div class="consearch_div">
                <div class="consearch_input">
                    <ul class="consearchinput_list">
                        <li id="searchDate"><span class="span">휴직기간<!-- <taglibs:transText progrmId="default" key="titLayoffNo"/> --></span>
                            <input type="text" class="w90 input_calen al" maxlength="10" name="searchLayoffBeginDe" id="layoffBeginDeSearchFormMhshrd006">~
                            <input type="text" class="w90 input_calen al" maxlength="10" name="searchLayoffEndDe" id="layoffEndDeSearchFormMhshrd006">
                            <div id="searchDate_cal" style="position:absolute; top:25px;"></div>
                        </li>
                       <li><span class="span">결재상태</span><div id="divComboSearchElctsctSttusCode" class="div_combo"></div>
                       <input type="hidden" name="userId" id="userIdMhshrd006" style="0px">
                       <input type="hidden" name="userNm" id="userNmMhshrd006" style="0px"></li>
                    </ul>
                </div>
                <div class="consearchbt_div">
                    <ul class="consearchbt_list">
                        <li><a href="#none" id="btnSearchMhshrd006"><span
                                    class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                        <li><a href="#none" id="btnResetMhshrd006"><span
                                    class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                    </ul>
                </div>
            </div>
        </form>
        
        
        
        <div class="flex">
            <div class="item6">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormMhshrd006">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid" style="height:calc(100vh - 160px) !important;">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrd006" style="height:calc(100vh - 140px); width:100%; position:relative;"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrd006">
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
                        <button class="btn_common01_new" id="copyBtn">복사</button>
                    </div>
                </div>
                <div class="mt5 outer_line_form"  style="min-height:calc(100vh - 160px) !important;">
                    <div class="detail_type01">
                        <form id="saveFormMhshrd006">
                            <table>
                                <caption>휴직신청관리<!-- <taglibs:transText progrmId="default" key="titMhshrd006"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">신청일자<!-- <taglibs:transText progrmId="default" key="titReqstDe"/> --></th>
                                    <td><input required="true" type="text" name="reqstDe" id="reqstDeSaveFormMhshrd006" maxlength="8" class = "w200"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">작성자<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td><input required="true" type="text" name="regNm" id="regNmSaveFormMhshrd006" class = "w200"/>
                                    <input type="hidden" name="userId" id="userIdSaveFormMhshrd006" style="0px"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">신청자<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td><input type="hidden" name="empno" id="empnoSaveFormMhshrd006" style="width: 50%"/>
                                    <input type="hidden" name="deptNm" id="deptNmSaveFormMhshrd006" style="width: 50%"/>
                                    <input required="true" type="text" name="empNm" id="empNmSaveFormMhshrd006" class = "w200"/>
                                    <button type="button" id="btnEmpCodeSaveSearch" class="btn_common03">
                                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">휴직구분<!-- <taglibs:transText progrmId="default" key="titLayoffSeCode"/> --></th>
                                    <td><div id="layoffSeCodeSaveFormMhshrd006" class="div_combo"></div></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">휴직기간<!-- <taglibs:transText progrmId="default" key="titLayoffBeginDe"/> --></th>
                                    <td id="saveDate"><input required="true" type="text" class="w30p input_calen al" maxlength="10" name="layoffBeginDe" id="layoffBeginDeSaveFormMhshrd006">~
                                    <input type="text" required="true" class="w30p input_calen al" maxlength="10" name="layoffEndDe" id="layoffEndDeSaveFormMhshrd006">
                                    <div id="saveDate_cal" style="position:absolute; top:25px;"></div>
                                    <input type="text" readonly="readonly" name="layoffDaycnt" id="layoffDaycntSaveFormMhshrd006" maxlength="22" class="w40 ac"/>일</td>
                                </tr>
                                <tr>
                                    <th>휴직내역<!-- <taglibs:transText progrmId="default" key="titLayoffDtls"/> --></th>
                                    <td><textarea name="layoffDtls" id="layoffDtlsSaveFormMhshrd006" rows="3" class="w95p" maxlength="200"></textarea></td>
                                </tr>
                                <tr>
                                    <th>
                                        <button type="button" class="btn_common02" id="fileUpload3">
                                            <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                        </button>                               
                                    </th>
                                    <td colspan="3" id="fileList3">                                 
                                        <input type="hidden" name="atchmnflList" id="atchmnflList" />
                                        <input type="hidden" name="atchmnfl" id="atchmnfl"/>  
                                        <div class="file_box h120">
                                            <table>
                                                <colgroup>
                                                    <col width="70" />
                                                    <col width="20" />
                                                    <col width="20" />
                                                </colgroup>
                                                <tr>
                                                    <td colspan="3" class="ac">첨부파일이 없습니다.</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <span style="color:red"> 파일전송 후 반드시  "저장" 버튼을 클릭하여 파일정보를 저장해야 합니다.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>결재상태<!-- <taglibs:transText progrmId="default" key="titHdadptAt"/> --></th>
                                    <td colspan="3"><input readonly="readonly" type="text" id="elctsctSttusCodeNmMhshrd006" name = "elctsctSttusCodeNm" class="w50"/></td>
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
