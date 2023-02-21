<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 전체레이아웃 -->

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtProject.js"></script>

<style>


@media all and (max-width:1248px) and (max-height : 1044px) {
	.project_tabdiv #tabbarObj .dhxtabbar_cont{padding-bottom:200px;}
}


</style>

    <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <!-- <li><a href="#none" id="mailsend"><i class="axi axi-note-add mr5"></i><span>메일전송</span></a></li> -->
                    <li><a href="#none" id="btnAdd"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnFormRemove"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnFormSave"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPjtProject">
                    <ul class="consearchinput_list">
                        <li><span class="span">기간</span>
                            <input type="text" name="searchSregDt" id="searchSregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" style="display:inline-block;">
                            <span> ~ &nbsp; </span>
                            <input type="text" name="searchEregDt" id="searchEregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" style="display:inline-block;">
                            <div id="date2_cal" style="position:absolute; top:25px;"></div>
                        </li>
                        <li><span class="span">구분</span>
                            <div id="divComboProjectSe" class="div_combo"></div>
                        </li>
                        <li><span class="span">상태</span>
                            <select id="useAtSearchFormStmUsers" name="comptAt">
                                <option value="">전체</option>
                                <option value="3">작성</option>
                                <option value="4">계획승인요청</option>
                                <option value="0">진행</option>
                                <option value="6">완료승인요청</option>
                                <option value="1">완료</option>
                                <option value="2">보류</option>
                            </select>
                        </li>
                        <li><span class="span">프로젝트명</span>
                            <input name="projectNm" id="projectNm" type="text" maxlength="30" style="width: 150px;">
                        </li>
                        <li><span class="span">거래처</span>
                            <input type="text" name="compNm" id="compNm" style="width:150px;" />
                            <button type="button" id="btnCompNmSearch" class="btn_common03">
                                <span class="glyphicon  glyphicon glyphicon-search"></span></button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearch"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnClear"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>

        <div class="flex">
            <div class="item3">
                <div class="div_title">
                    <div class="left">
                        <span class="table_sumnum" id="spanCnt">0</span>
                    </div>
                    <div class="right">
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line">
                        <div class="dhtml_grid" id="dataList"></div>
                    </div>
                </div>
            </div>
            <div class="item3">
                <div class="div_title">
                    <div class="left">
                        <div class="project_tit_div" style="line-height:34px;">
                            <ul class="project_tit_ul">
                                <li class="project_tit_li" name="projectNmTit" id="projectNmTit"></li>
                                <li id="chargerNmTit" name="chargerNmTit"><span class="ml5"></span><span class="ml5"></span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="right">
                        <button class="div_title_btn" type="button" id="btnAppList"><span id="btnAppList">결재목록</span></button>
                        <button class="div_title_btn" type="button" id="btnApproval" style="display: none;">승인</button>
                    </div>
                </div>
                <div class="mt5 outer_line_form project_tabdiv">
					<div id="tabbarObj" style="height:100% !important;min-height:700px !important;">
                            <div id="a1" name="기본1" class="detail_type01">
                               <form id="saveFormPjtProject">
                               <div class="div_title" id="div_title">
                                    <div class="right">
                                        <div class="right ml7">
                                            <button class="div_title_btn" type="button" id="btnPlanApp"><span id="planApp">계획승인요청</span></button>
                                        </div>
                                    </div>
                                </div>
								    <table style="margin-bottom:500px; border-top:solid 1px #ddd">
								        <caption>프로젝트 기본사항1</caption>
								        <colgroup>
								            <col width="100" />
								            <col width="400" />
								            <col width="100" />
								            <col width="400" />
								        </colgroup>
								        <tbody>
								            <tr>
								                <input type="hidden" name="projectSn" id="projectSn" />
								                <th class="essential_icon"><label for="projectNm">프로젝트명</label></th>
								                <td><input required type="text" name="projectNm" id="projectNm" maxlength="50" style="width:99%"></td>
								                <th>진행상태</th>
								                <td>
								                    <select id="comptAt" name="comptAt">
								                        <option value="">선택</option>
								                        <option value="3">작성</option>
								                        <option value="4">계획승인요청</option>
								                        <option value="0">진행</option>
								                        <option value="6">완료승인요청</option>
								                        <option value="1">완료</option>
								                        <option value="2">보류</option>
								                    </select>
								                </td>
								
								            </tr>
								            <tr>
								                <th class="essential_icon"><label for="divide">발주처</label></th>
								                <td>
								                    <input type="hidden" name="bcncCd" id="bcncCd" />
								                    <input type="text" name="bcncNm" id="bcncNm" style="width:50%" readonly required />
								                    <button class="btn_common03" id="btnBcncSearch" type="button">
								                        <span class="glyphicon  glyphicon glyphicon-search"></span>
								                    </button> &nbsp;
								                    <div id="divInputFormComboProjectAreaCodeBox" class="div_combo"></div>
								                </td>
								                <th><label for="area">담당자</label></th>
								                <td>
								                    <!-- <input type="hidden" name="bcncChargerSn" id="bcncChargerSn"/> -->
								                    <input type="text" name="bcncChargerNm" id="bcncChargerNm" style="width:85px" readonly>
								                    <input type="text" id="chargerCttpc" name="chargerCttpc" style="width:130px" readonly>
								                </td>
								            </tr>
								            <tr>
								                <th class="essential_icon"><label for="divide">구분</label></th>
								                <td>
								                    <div id="divInputFormComboProjectSeCodeBox" class="div_combo" required></div>
								                    &nbsp;
								                    <div id="divInputFormComboCntrctTyCodeBox" class="div_combo"></div>
								                </td>
								                <th class="essential_icon"><label for="contract">계약금액</label></th>
								                <td><input required type="text" maxlength="15" id="cntrctAmt" name="cntrctAmt" style="width:100px; text-align:right;"> 원
								                    <label class="surtax">(부가세 포함)</label> &nbsp;&nbsp;
								                    <input type="text" maxlength="15" id="cntrctAmtVat" name="cntrctAmtVat" style="width:100px; text-align:right; ime-mode:disabled;" readonly disabled="disabled">
								                    &nbsp;<label class="surtax">(부가세 미포함)</label>
								                </td>
								
								            </tr>
								            <tr>
								                <th class="essential_icon"><label for="projectPmNm">총괄PM</label></th>
								                <td>
								                    <input type="hidden" id="projectPmEmpno" name="projectPmEmpno" />
								                    <input type="text" id="projectPmNm" name="projectPmNm" style="width:80px" readonly required />
								                    <button class="btn_common03" id="btnEmpSearch" type="button">
								                        <span class="glyphicon  glyphicon glyphicon-search"> </span>
								                    </button>
								                </td>
								                <th><label for="writer">등록자</label></th>
								                <td>
								                    <input type="hidden" id="empno" name="empno" />
								                    <input type="text" id="userNm" name="userNm" title="등록자" style="width:80px" readonly disabled="disabled" class="readonly">
								                </td>
								            </tr>
								            <tr>
								                <th class="essential_icon"><label for="start">계약기간</label></th>
								                <td>
								                    <input required type="text" name="searchSprojDt" id="searchSprojDt" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
								                    ~ &nbsp;
								                    <input required type="text" name="searchEprojDt" id="searchEprojDt" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
								                    <label id="cntrctMonth"></label>
								                    <div id="date3_cal" style="position:absolute; top:25px;"></div>
								                </td>
								                <th><label for="realS">실투입기간</label></th>
								                <td>
								                    <input type="text" name="searchSrealDe" id="searchSrealDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
								                    ~ &nbsp;
								                    <input type="text" name="searchErealDe" id="searchErealDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
								                    <div id="date4_cal" style="position:absolute; top:25px;"></div>
								                </td>
								            </tr>
								            <tr>
								                <th><label for="txtBox">개요</label></th>
								                <td><textarea id="projectCn" name="projectCn" title="내용" maxlength="1000" style="width:94%;height:110px;"></textarea></td>
								                <th rowspan="3"><label for="txtBox">범위</label></th>
								                <td rowspan="3"><textarea id="projectScope" name="projectScope" title="내용" maxlength="1000" style="width:94%;height:300px;"></textarea></td>
								            </tr>
								            <tr>
								                <th><label for="txtBox">개발환경</label></th>
								                <td><textarea id="projectEnvrn" name="projectEnvrn" title="내용" maxlength="1000" style="width:94%;height:150px;"></textarea></td>
								            </tr>
								            <tr>
								                <th>개발URL</th>
								                <td><input type="text" name="projectUrl" id="projectUrl" maxlength="30" style="width:99%"></td>
								            </tr>
								
								            <tr>
								                <th><label for="keepMonth">무상유지보수</label></th>
								                <td class="rates">
								                    <input type="text" id="grtsMntnceMcnt" name="grtsMntnceMcnt" maxlength="2" title="keepMonth" style="width:30px; text-align:right; ime-mode:disabled"> 개월
								                    &nbsp;&nbsp;&nbsp;
								                    <input id="grtsMntnceCn" name="grtsMntnceCn" title="내용" style="width:300px;">
								                </td>
								                <th class="rate"> <label for="bugtRate">진행률</label></th>
								                <td class="rate">
								                    <span>인력</span>&nbsp;&nbsp;&nbsp;<input type="text" id="hnfRate" name="hnfRate" style="width:50px; text-align:right;" readonly disabled="disabled"> % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								                    <span>예산</span>&nbsp;&nbsp;&nbsp;<input type="text" id="bugtRate" name="bugtRate" style="width:50px; text-align:right;" readonly disabled="disabled"> % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								                    <span>산출물</span>&nbsp;&nbsp;&nbsp;<input type="text" id="outputRate" name="outputRate" style="width:50px; text-align:right;" readonly disabled="disabled"> %
								                </td>
								            </tr>
								            <div>
								                <tr id="idpassw" style="display: none;">
								                    <th class="essential_icon"><label for="proNm">ID/패스워드</label></th>
								                    <td>
								                        <input type="text" name="entrpsId" id="entrpsId" style="width:80px" maxlength="8" required>
								                        &nbsp;/&nbsp;
								                        <input type="text" name="entrpsPassword" id="entrpsPassword" style="width:80px" maxlength="8" required>
								                    </td>
								                    <td colspan="2">
								                        <input type="hidden" name="popupUrlHidden" id="popupUrlHidden">
								                        <button class="btn" id="popupUrlCopy" type="button">팝업URL복사</button>
								                        &nbsp;<input type="text" name="popupUrl" id="popupUrl" style="width:50%" readonly>
								                        <span style="font-size:13px;">&nbsp;&nbsp;팝업 사이즈(1000*650)</span>
								                    </td>
								                </tr>
								            </div>
								            <tr id="approvDiv">
								
								                <th><label for="proNm">계획승인</label></th>
								                <td>
								                    <div id="approvNewDiv">
								                        <div class="checkbox" style="float: left; margin-left: 10px;" readonly>
								                            <label>
								                                <input type="checkbox" name="newApprvAt1" id="newApprvAt1" readonly>
								                                <i class="input-helper"></i>
								                            </label>
								                        </div>
								                        <input type="text" id="newApprvNm1" name="newApprvNm1" style="width:80px; float: left;  margin-left: 10px;" readonly>
								                        <div class="checkbox" style="float: left; margin-left: 10px;" readonly>
								                            <label>
								                                <input type="checkbox" name="newApprvAt2" id="newApprvAt2" style="float: left; margin-left: 10px;" readonly>
								                                <i class="input-helper"></i>
								                            </label>
								                        </div>
								                        <input type="text" id="newApprvNm2" name="newApprvNm2" style="width:80px; float: left; margin-left: 10px;" readonly>
								                    </div>
								                </td>
								                <th><label for="proNm">완료승인</label></th>
								                <td>
								                    <div id="approvEndDiv">
								                        <div class="checkbox" style="float: left; margin-left: 10px;" readonly>
								                            <label>
								                                <input type="checkbox" name="endApprvAt1" id="endApprvAt1" readonly>
								                                <i class="input-helper"></i>
								                            </label>
								                        </div>
								                        <input type="text" id="endApprvNm1" name="endApprvNm1" style="width:80px; float: left;  margin-left: 10px;" readonly>
								                        <div class="checkbox" style="float: left; margin-left: 10px;" readonly>
								                            <label>
								                                <input type="checkbox" name="endApprvAt2" id="endApprvAt2" readonly>
								                                <i class="input-helper"></i>
								                            </label>
								                        </div>
								                        <input type="text" id="endApprvNm2" name="endApprvNm2" style="width:80px; float: left; margin-left: 10px;" readonly>
								                    </div>
								                </td>
								            </tr>
								        </tbody>
								    </table>
								</form>
                            </div>
                            
                            <div id="a2" name="Tab 2"></div>
                            <div id="a3" name="Tab 3"></div>
                            <div id="a4" name="Tab 3"></div>
                            <div id="a5" name="Tab 3"></div>
                            <div id="a6" name="Tab 3"></div>
                            <div id="a7" name="Tab 3"></div>
                        </div>                       
	                        
                </div>
            </div>
        </div>
    </div>
</body>