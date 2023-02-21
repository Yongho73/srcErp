<!-- 
 *    프로그램       : 증명서신청/출력 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.27
 *    사용테이블      : MHS_PROOF_ISSU
 * sourceGen version : 2020.08.06.01 (2020.08.27)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrc/mhshrc001/mhshrc001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshrc001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhshrc001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrc001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshrc001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrc001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li id='searchApplyTime'><span class="span">신청일자</span>
                             <input type="text" name="searchApplyBeginTime" id="searchApplyBeginTimeMhshrc001" maxlength="10" class="input_calen"/> ~ 
                             <input type="text" name="searchApplyEndTime" id="searchApplyEndTimeMhshrc001" maxlength="10" class="input_calen"/>
                             <div id="searchTime_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
                         </li>
                         <li><span class="span">사원</span>
                            <input type="text" readonly="readonly" name="searchEmpNo" id="searchEmpCodeMhshrc001" class="w50"/>
                            <input type="text" readonly="readonly" name="searchEmpCodeNm" id="searchEmpNmMhshrc001" class="w90"/>
                            <button type="button" disabled="disabled"  id="btnSearchEmpCode" class="btn_common03">
                            <span class="glyphicon  glyphicon glyphicon-search"> </span>
                            </button>
                         </li>
                         <li><span class="span">증명서구분</span><div id="divComboSearChcrtfKindCode" class="div_combo"></div></li>  
                         <li><span class="span">결재상태</span><div id="divComboSearchElctsctSttusCode"  class="div_combo"></div></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrc001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrc001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
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
                        <span class="table_sumnum" id="spanCntSearchFormMhshrc001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListMhshrc001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrc001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    -->
                    <div class="right">
                        <button class="btn_common01_new" id="printBtn">인쇄</button>
                        <button class="btn_common01_new" id="elctsctBtn">전자결재</button>
                    </div>
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormMhshrc001">
                            <input type="hidden" name="elctsctDocNo" id="elctsctDocNoSaveFormMhshrc001"/>
                            <input type="hidden" name="elctsctSttusCode" id="elctsctSttusCodeSaveFormMhshrc001"/>
                            <input type="hidden" name="elctsctEmpno" id="elctsctEmpnoSaveFormMhshrc001"/>
                            <input type="hidden" name="reqstSttusCode" id="reqstSttusCodeSaveFormMhshrc001"/>
                            <input type="hidden" name="nowAdres" id="nowAdresSaveFormMhshrc001"/>
                            <table>
                                <caption>증명서신청/출력<!-- <taglibs:transText progrmId="default" key="titMhshrc001"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                    <col width="100">
                                    <col width="">
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th>신청번호<!-- <taglibs:transText progrmId="default" key="titIssuno"/> --></th>
                                    <td>
                                        <input type="text" name="issuno" id="issunoSaveFormMhshrc001" maxlength="20" style="width: 65%;" readonly="readonly"/>
                                        <input type="text" name="elctsctSeSn" id="elctsctSeSnSaveFormMhshrc001" maxlength="5" style="width: 20%; text-align: center" readonly="readonly" />
                                    </td>
                                    <th>신청일자<!-- <taglibs:transText progrmId="default" key="titIssuReqstDe"/> --></th>
                                    <td><input type="text" name="issuReqstDe" id="issuReqstDeSaveFormMhshrc001" maxlength="10" style="width: 90%" readonly="readonly"/></td>
                                    <th>전자결재상태<!-- <taglibs:transText progrmId="default" key="titElctsctSttusCode"/> --></th>
                                    <td>
                                        <input type="text" name="elctsctSttusCodeNm" id="elctsctSttusCodeNmSaveFormMhshrc001" style="width: 90%" readonly="readonly">
                                     </td> 
                                </tr>
                                <tr>
                                    <th class="essential_icon">사원번호<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td>
                                        <input type="text" readonly="readonly" name="empno" id="empnoSaveFormMhshrc001" class="w50" required/>
                                        <input type="text" readonly="readonly" name="empnm" id="empnmSaveFormMhshrc001" class="w90" required/>
                                        <button type="button" disabled="disabled"  id="btnSaveEmpCode" class="btn_common03">
                                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
                                        </button>
                                    </td>
                                    <th>부서<!-- <taglibs:transText progrmId="default" key="titTtmDeptNm"/> --></th>
                                    <td><input type="text" readonly="readonly"  name="ttmDeptNm" id="ttmDeptNmSaveFormMhshrc001" maxlength="30" style="width: 90%"/></td>
                                    <th>직급<!-- <taglibs:transText progrmId="default" key="titTtmClsfNm"/> --></th>
                                    <td><input type="text" readonly="readonly"  name="ttmClsfNm" id="ttmClsfNmSaveFormMhshrc001" maxlength="30" style="width: 90%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">증명서종류<!-- <taglibs:transText progrmId="default" key="titCrtfKindCode"/> --></th>
                                    <td><div id="divComboSaveCrtfKindCode" class="div_combo"></div></td>
                                    <th class="essential_icon">용도구분<!-- <taglibs:transText progrmId="default" key="titIssuUseprpsSeCode"/> --></th>
                                    <td><div id="divComboSaveIssuUseprpsSeCode" class="div_combo"></div></td>
                                    <th>발급매수<!-- <taglibs:transText progrmId="default" key="titIssuCnt"/> --></th>
                                    <td><input type="text" name="issuCnt" id="issuCntSaveFormMhshrc001" maxlength="22" style="width: 50%"/></td>
                                </tr>
                                <!-- <tr>
                                    <th>발급일자</th>
                                    <td colspan='5'><input type="text" name="issuDe" id="issuDeSaveFormMhshrc001" maxlength="8" style="width: 50%"/></td>
                                </tr> -->
                                <tr>
                                    <th>제출위치<!-- <taglibs:transText progrmId="default" key="titSubmitLc"/> --></th>
                                    <td colspan='5'><input type="text" name="submitLc" id="submitLcSaveFormMhshrc001" maxlength="200" style="width: 80%"/></td>
                                </tr>
                                <tr>
                                    <th>비고<!-- <taglibs:transText progrmId="default" key="titIssuUseprpsCn"/> --></th>
                                    <td colspan='5'><input type="text" name="issuUseprpsCn" id="issuUseprpsCnSaveFormMhshrc001" maxlength="200" style="width: 80%"/></td>
                                </tr>
                                <tr>
                                    <th>주민등록번호 마스킹여부<!-- <taglibs:transText progrmId="default" key="titIhidnumMaskAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label><input type="checkbox" name="ihidnumMaskAt" id="ihidnumMaskAtSaveFormMhshrc001" maxlength="1"/><i class="input-helper"></i></label>
                                        </div>
                                    </td>
                                    <th>경력포함여부<!-- <taglibs:transText progrmId="default" key="titCareerInclsAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label><input type="checkbox" name="careerInclsAt" id="careerInclsAtSaveFormMhshrc001" maxlength="1"/><i class="input-helper"></i></label>
                                        </div>
                                    </td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>출력회수<!-- <taglibs:transText progrmId="default" key="titOutptCnt"/> --></th>
                                    <td><input type="text" readonly="readonly" name="outptCnt" id="outptCntSaveFormMhshrc001" maxlength="22" style="width: 50%"/></td>
                                    <th>출력허용매수<!-- <taglibs:transText progrmId="default" key="titOutptPermCnt"/> --></th>
                                    <td><input type="text" readonly="readonly" name="outptPermCnt" id="outptPermCntSaveFormMhshrc001" maxlength="22" style="width: 50%"/></td>
                                    <th>출력허용일자<!-- <taglibs:transText progrmId="default" key="titOutptPermDe"/> --></th>
                                    <td><input type="text" readonly="readonly" name="outptPermDe" id="outptPermDeSaveFormMhshrc001" maxlength="8" style="width: 50%"/></td>
                                </tr>
                                <!-- 
                                <tr>
                                    <th>전자결재 문서 번호</th>
                                    <td><input type="text" name="elctsctDocNo" id="elctsctDocNoSaveFormMhshrc001" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>전자결재 사원번호</th>
                                    <td><input type="text" name="elctsctEmpno" id="elctsctEmpnoSaveFormMhshrc001" maxlength="10" style="width: 50%"/></td>
                                </tr> -->
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
