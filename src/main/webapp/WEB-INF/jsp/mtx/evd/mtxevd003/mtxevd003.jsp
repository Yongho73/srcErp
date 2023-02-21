<!-- 
 *    프로그램       : 법인카드 증빙 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.06
 *    사용테이블      : MFS_CARD_EVID
 * sourceGen version : 2020.06.29.01 (2020.07.06)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mtx/evd/mtxevd003/mtxevd003.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnwriteMtxevd003"><i class="axi axi-note-add mr5"></i><span>결의서작성</span></a></li>
                    <li><a href="#none" id="btnAddMtxevd003"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMtxevd003"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMtxevd003"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMtxevd003"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMtxevd003">
                    <ul class="consearchinput_list">
                        <li><span class="span">사업장<!-- <taglibs:transText progrmId="default" key="titCardEvidNo"/> --></span>
                           <div name="bplcCode" id=divComboBplcCode style="display:inline-block"></div>
                        </li>
                        <li><span class="span">부서<!-- <taglibs:transText progrmId="default" key="titCardEvidNo"/> --></span>
                            <input name="deptKorNm" id="userDeptCodeSearchFormMtxevd003">
                        </li>
                        <li id="date2"><span class="span">사용일자</span>
                            <input type="text" name="stDate" id="stDate" class="input_calen">
                            <input type="text" name="edDate" id="edDate" class="input_calen">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li>
                            <span class="span">카드번호뒷자리<!-- <taglibs:transText progrmId="default" key="titCardEvidNo"/> --></span>
                            <input name="cardNo" id="cardNoSearchFormMtxevd003">
                        </li>
                        <li>
                            <span class="span">결의여부</span>
                            <select name="properEvidAt" id="properEvidAtSearchFormMtxevd003" >
                                <option value="">전체</option>
                                <option value="0">미확인</option>
                                <option value="1">확인</option>                                
                            </select>  
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMtxevd003"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMtxevd003"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMtxevd003">0</span>
                    </div>
                    <div class="right">
                        <div class="div_combo fr">
                        <form id="pageingFormMtxevd003">
                            <select name="pageRowSize">
                                <option value="100">100개씩 보기</option>
                                <option value="20">20개씩 보기</option>
                                <option value="30" selected="">30개씩 보기</option>
                                <option value="40">40개씩 보기</option>
                                <option value="50">50개씩 보기</option>
                            </select>
                        </form>
                    </div>
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line_paging"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMtxevd003" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <div class="ac paging" id="divPagingMtxevd003">
                    
                    </div>
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
                        <form id="saveFormMtxevd003">
                            <table>
                                <caption>법인카드 증빙<!-- <taglibs:transText progrmId="default" key="titMtxevd003"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th>증빙 번호<!-- <taglibs:transText progrmId="default" key="titCardEvidNo"/> --></th>
                                    <td><input type="text" name="cardEvidNo" id="cardEvidNoSaveFormMtxevd003" maxlength="10" style="width: 50%" placeholder="자동채번" readonly/></td>
                                </tr>
                                <!-- <tr>
                                    <th>증빙구분</th>
                                    <td><input type="text" maxlength="10" style="width: 50%" placeholder="법인카드매입" readonly/>
                                    </td>
                                </tr>  -->
                                <tr>
                                    <th>사업장<!-- <taglibs:transText progrmId="default" key="titBplcCode"/> --></th>
                                    <td>
                                        <input type="hidden" name="bplcCode" id="bplcCode" maxlength="15"/>
                                        <input type="text" name="bplcCodeNm" id="bplcCodeNm" maxlength="15" style="width: 80px;" readonly required/>
                                    </td>
                                    <!-- <input type="text" name="bplcCode" id="bplcCodeSaveFormMtxevd003" maxlength="4" style="width: 50%" readonly/> -->
                                </tr>
                                <tr>
                                    <th>작성부서<!-- <taglibs:transText progrmId="default" key="titUserDeptCode"/> --></th>
                                    <td>
                                        <!-- <input type="text" name="userDeptCode" id="userDeptCodeSaveFormMtxevd003" maxlength="20" style="width: 50%" readonly/> -->
                                        <input type="text" name="userDeptCode" id="deptCodeNm" maxlength="15" style="width: 80px;" readonly required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>작성자(사용자)<!-- <taglibs:transText progrmId="default" key="titUserEmpno"/> --></th>
                                    <td>
                                    <input type="text" name="userEmpno" id="empCodeNm" style="width: 80px;" readonly required/>
                                    <!-- <button type="button" id="btnEmpCodeSearch" class="btn_common03"> -->
                                    <!-- <span class="glyphicon  glyphicon glyphicon-search"> </span> -->
                                    <!-- <input type="text" name="userEmpno" id="userEmpnoSaveFormMtxevd003" maxlength="10" style="width: 50%" readonly/> -->
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">VAT 구분<!-- <taglibs:transText progrmId="default" key="titCardNo"/> --></th>
                                    <td>
                                    <input type="radio" name="bsnmSeCode" value="0" id="bsnmSeCode001SaveFormMtxevd003" checked> <label for="bsnmSeCode001SaveFormMtxevd003"><span></span>과세</label>
                                    <input type="radio" name="bsnmSeCode" value="1" id="bsnmSeCode002SaveFormMtxevd003"/> <label for="bsnmSeCode002SaveFormMtxevd003"><span></span>면세</label>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사용일자<!-- <taglibs:transText progrmId="default" key="titUseDe"/> --></th>
                                    <td>
                                        <input type="text" name="useDe" id="useDeSaveFormMtxevd003" class="input_calen" maxlength=10;" style="width: 20%" required required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">가맹점<!-- <taglibs:transText progrmId="default" key="titCardNo"/> --></th>
                                    <td>
                                    <input type="text" name="bcncNm" id="bcncNmSaveFormMtxevd003" maxlength="30" style="width: 25%" readonly required/>
                                        <button type="button" id="btnBcncSearch" class="btn_common03">
                                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">카드번호<!-- <taglibs:transText progrmId="default" key="titCardNo"/> --></th>
                                    <td>
                                    <!-- <input type="text" name="upperAcntCode" id="upperAcntCodeSaveFormMfsbsc001" maxlength="10" style="width: 100px" required readonly/> -->
                                        <input type="text" name="cardNo" id="cardNoSaveFormMtxevd003" maxlength="20" style="width: 50%" required/>
                                        <button type="button" id="btnCardNoSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">승인번호<!-- <taglibs:transText progrmId="default" key="titUseConfmNo"/> --></th>
                                    <td><input type="text" name="useConfmNo" id="useConfmNoSaveFormMtxevd003" maxlength="10" style="width: 50%" required/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사용금액<!-- <taglibs:transText progrmId="default" key="titUseAmt"/> --></th>
                                    <td><input type="text" name="useAmt" id="useAmtSaveFormMtxevd003" maxlength="22" style="width: 50%" required/></td>
                                </tr>
                                <tr>
                                    <th>공급가액<!-- <taglibs:transText progrmId="default" key="titSupplyAmt"/> --></th>
                                    <td><input type="text" name="supplyAmt" id="supplyAmtSaveFormMtxevd003" maxlength="22" style="width: 50%" readonly/></td>
                                </tr>
                                <tr>
                                    <th>VAT<!-- <taglibs:transText progrmId="default" key="titVatAmt"/> --></th>
                                    <td><input type="text" name="vatAmt" id="vatAmtSaveFormMtxevd003" maxlength="22" style="width: 50%" readonly/></td>
                                </tr>
                            <!-- <tr>
                                    <th>할인금액</th>
                                    <td><input type="text" name="dscntAmt" id="dscntAmtSaveFormMtxevd003" maxlength="22" style="width: 50%"/></td>
                                </tr> -->
                                <tr>
                                    <th class="essential_icon">작성구분<!-- <taglibs:transText progrmId="default" key="titWriteSeCode"/> --></th>
                                    <td>
                                        <div id="divCombowriteSe"  class="div_combo"></div> 
                                        <!-- <div id="writeSeCodeSaveFormMtxevd003" name="writeSeCode" maxlength="10" style="width: 50%" required></div> -->
                                    </td>
                                </tr>
                                <tr>
                                    <th>업태<!-- <taglibs:transText progrmId="default" key="titBizcnd"/> --></th>
                                    <td><input type="text" name="bizcnd" id="bizcndSaveFormMtxevd003" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>업종<!-- <taglibs:transText progrmId="default" key="titInduty"/> --></th>
                                    <td><input type="text" name="induty" id="indutySaveFormMtxevd003" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>결의서 번호<!-- <taglibs:transText progrmId="default" key="titAnactNo"/> --></th>
                                    <td><input type="text" name="anactNo" id="anactNoSaveFormMtxevd003" maxlength="20" style="width: 50%" readonly/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">
                                        <button type="button" class="btn_common02" id="fileUpload3">
                                                <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                        </button>
                                    </th>
                                    <td colspan="4" id="fileList3">
                                        <input type="hidden" name="atchmnflList" id="atchmnflList" />
                                            <input type="hidden" name="atchmnfl" id="atchmnfl"/>
                                            
                                            <div class="file_box h120">
                                                <table>
                                                    <colgroup>
                                                        <col width="310" />
                                                        <col width="80" />
                                                        <col width="80" />
                                                    </colgroup>
                                                    <tr>
                                                        <td colspan="3" class="ac">첨부파일이 없습니다.</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        <span style="color:red"> 파일전송 후 반드시  "저장" 버튼을 클릭하여 파일정보를 저장해야 합니다.</span>                                    
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