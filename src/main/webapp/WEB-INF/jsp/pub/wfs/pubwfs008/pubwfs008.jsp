<!-- 
 *    프로그램       : 자녀학비보조금신청 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.27
 *    사용테이블      : MHS_SCHXPN_REQST
 * sourceGen version : 2020.07.16.01 (2020.07.27)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pub/wfs/pubwfs008/pubwfs008.js"></script>
    <script src="/xerp/js/xerp/yearpicker.js"></script>
    <link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/yearpicker.css" />

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddPubwfs008"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePubwfs008"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePubwfs008"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelPubwfs008"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPubwfs008">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li>
                            <span class="span"><label for="docmT">신청년도</span>
                            <input type="text" name="applcYy" id="applcYySearchFormPubwfs008" class="input_calen" size="4" maxlength="4" onchange = >
                        </li>
                         <li><span class="span" style="width: 45px;">부서</span>
                            <input type="text" name="deptCode" id="deptCode" autocomplete="off" style="width:60px;">
                            <input type="text" name="deptCodeNm" id="deptCodeNm" autocomplete="off">
                            <button type="button" id="btnDeptCodeSearchSearchFormPubwfs008" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>    
                            </button>                    
                        </li> 
                         <li><span class="span">사원</span>
                            <input type="text" name="empno" id="empno" style="width: 60px;"/>
                            <input type="text" name="korNm" id="korNm" style="width: 60px;"/>
                            <input type="hidden" name="deptCodeNm" id="deptCodeNm" style="width: 50%"/>     
                            <button type="button" id="btnempnoSearchSearchFormPubwfs008" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                        </li>
<!--                         <li><span class="span">결재상태</span><div id="divComboSearchElctsctSttusCode" class="div_combo"></div></li> -->
                        
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPubwfs008"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPubwfs008"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormPubwfs008">0</span>
                    </div>
                    <div class="right">
                    <!-- 타이틀영역(우측) //-->
                    <div class="right ml7">
                    </div>
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPubwfs008" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPubwfs008">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item5">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                     
                    <div class="left"></div>
                    <div class="right">
                        <button class="div_title_btn" type="button" id="btnBugtAdd">승인신청</button>
                        <button class="div_title_btn" id="btnBugtcopy" type="button">복사</button>
                    </div>
                    
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormPubwfs008">
                            <table>
                                <caption>자녀학비보조금신청<!-- <taglibs:transText progrmId="default" key="titPubwfs008"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <input type="hidden" name="empno" id="empnoSaveFormPubwfs008"/>
                                    <th class="essential_icon">사원명<!-- <taglibs:transText progrmId="default" key="titOccrrncYy"/> --></th>
                                    <td colspan="3"><input type="text" name="korNm" id="korNmSaveFormPubwfs008" style="width: 18%" required/>
                                    <button type="button" id="btnUseEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"> </span></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">자녀명<!-- <taglibs:transText progrmId="default" key="titChldrnNm"/> --></th>
                                    <td colspan="3"><input type="text" name="chldrnNm" id="chldrnNmSaveFormPubwfs008" maxlength="20" style="width: 18%" required/></td>
                                    <div id="divComboelctsctSttusCode" class="div_combo" style="display:none;"></div>
                                </tr>
                                <tr>
                                    <th class="essential_icon">학교명<!-- <taglibs:transText progrmId="default" key="titSchulNm"/> --></th>
                                    <td><input type="text" name="schulNm" id="schulNmSaveFormPubwfs008" maxlength="200" style="width: 50%" required/></td>
                                    <th class="essential_icon">학년<!-- <taglibs:transText progrmId="default" key="titGrade"/> --></th>
                                    <td><input type="text" name="grade" id="gradeSaveFormPubwfs008" maxlength="22" style="width: 50%" required/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">분기<!-- <taglibs:transText progrmId="default" key="titQu"/> --></th>
                                    <td>
                                        <div id="divComboqu" class="div_combo"></div>
<!--                                     <input type="text" name="qu" id="quSaveFormPubwfs008" maxlength="22" style="width: 18%"/> -->
                                    </td>
                                    <th class="essential_icon">신청일자<!-- <taglibs:transText progrmId="default" key="titBillIsuDe"/> --></th>
                                    <td>
                                        <input type="text" name="reqstDe" id="reqstDeSaveFormPubwfs008" class="input_calen" maxlength=10;" style="width:30%" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">수업료금액<!-- <taglibs:transText progrmId="default" key="titTutfeeAmt"/> --></th>
                                    <td><input type="text" name="tutfeeAmt" id="tutfeeAmtSaveFormPubwfs008" maxlength="22" style="width: 50%; text-align:right" required/></td>
                                    <th class="essential_icon">운영지원금액<!-- <taglibs:transText progrmId="default" key="titOperSportAmt"/> --></th>
                                    <td><input type="text" name="operSportAmt" id="operSportAmtSaveFormPubwfs008" maxlength="22" style="width: 50%; text-align:right" required/></td>
                                </tr>
                                <tr>
                                    <th>비고항목<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="3"><input type="text" name="rm" id="rmSaveFormPubwfs008" maxlength="200" style="width: 99%; height: 250px;"/></td>
                                </tr>
                                 <tr>
                                    <th class="essential_icon">
                                        <button type="button" class="btn_common02" id="fileUpload3">
                                                <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                        </button>
                                    </th>
                                    <td colspan="4" id="fileList3">
                                        <input type="hidden" name="atchmnflList" id="atchmnflList" required/>
                                            <input type="hidden" name="atchmnfl" id="atchmnfl" required/>
                                            
                                            <div class="file_box h120">
                                                <table id="filePubwfs008">
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
                                <tr>
                                    <th>반려사유<!-- <taglibs:transText progrmId="default" key="titRm"/> --></th>
                                    <td colspan="3"><input type="text" name="returnResn" id="returnResnSaveFormPubwfs008" maxlength="200" style="width: 99%; height: 200px;" readonly/></td>
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
