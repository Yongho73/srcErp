<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 이슈위험 탭 -->

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtIssue.js"></script>
    <script>
        var projectSn = '${projectSn}';
    </script>

    <div class="flex">
        <div class="item5">
            <div class="div_title">
                <div class="left">
                    <span class="table_sumnum" id="spanPjtIssueCnt">0</span>
                </div>
            </div>
            <div class="mt5 outer_line_grid" style="height:calc(100vh - 55px);">
                <div class="dhtml_line">
                    <div class="dhtml_grid" id="divDataListPjtIssue"></div>
                </div>
            </div>
        </div>
        <div class="item5">
            <div class="div_title">
                <div class="right">
                    <ul>
                        <li>
                            <button type="button" id="btnAddPjtIssue" class="btn_common01_new">신규</button>
                            <button type="button" id="btnRemovePjtIssue" class="btn_common01_new">삭제</button>
                            <button type="button" id="btnSavePjtIssue" class="btn_common01_new">저장</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt5 outer_line_form" style="height:calc(100vh - 55px) !important;">
                <div class="tabl_box">
                    <div class="list_type01">
                        <div class="detail_type01" id="divSaveFormPjtIssue">
                            <form id="saveFormPjtIssue">

                                <input type="hidden" name="projectSn" id="projectSn" />
                                <input type="hidden" name="issueSn" id="issueSn" />

                                <table>
                                    <colgroup>
                                        <col width="100">
                                        <col width="*">
                                        <col width="100">
                                        <col width="*">
                                    </colgroup>
                                    <tr>
                                        <th class="essential_icon">이슈구분</th>
                                        <td colspan="3">
                                            <select required="true" name="issueSe" id="issueSeSaveFormPjtIssue">
                                                <option value="">선택</option>
                                                <option value="1">범위(Scope) 문제</option>
                                                <option value="2">품질(Quality) 문제</option>
                                                <option value="3">일정(Schedule) 문제</option>
                                                <option value="4">원가(Cost) 문제</option>
                                                <option value="5">인력(People) 문제</option>
                                                <option value="6">기타 문제</option>
                                            </select>
                                        </td>

                                    </tr>
                                    <tr>
                                        <th class="essential_icon">이슈제목</th>
                                        <td colspan="3"><input required="true" type="text" name="issueNm" id="issueNmSaveFormPjtIssue" style="width: 95%" /></td>
                                    </tr>
                                    <tr>
                                        <th class="essential_icon">이슈관리자</th>
                                        <td>
                                            <input type="hidden" name="issueMngrNo" id="issueMngrNoSaveFormPjtIssue" />
                                            <input required="true" readonly type="text" name="issueMngr" id="issueMngrSaveFormPjtIssue" maxlength="15" style="width: 70%" />
                                            <button type="button" id="btnPopEmpSaveFormPjtIssue" class="btn_common01">
                                                <span class="glyphicon glyphicon glyphicon-search"></span>
                                            </button>
                                        </td>
                                        <th class="essential_icon">발생일자</th>
                                        <td><input required="true" readonly type="text" name="occrrncDe" id="occrrncDeSaveFormPjtIssue" class="input_calen" maxlength="10"></td>
                                    </tr>
                                    <tr>
                                        <th class="essential_icon">이슈내용</th>
                                        <td colspan="3"><textarea required="true" name="issueCn" id="issueCnSaveFormPjtIssue" style="width: 95%;min-height:350px;"></textarea></td>
                                    </tr>
                                    <tr>
                                        <th>해결대안</th>
                                        <td colspan="3"><input type="text" name="solutAltrv" id="solutAltrvSaveFormPjtIssue" style="width: 95%" /></td>
                                    </tr>
                                    <tr>
                                        <th>완결내용</th>
                                        <td colspan="3"><input type="text" name="comptCn" id="comptCnSaveFormPjtIssue" style="width: 95%" /></td>
                                    </tr>
                                    <tr>
                                        <th>완결일자</th>
                                        <td><input readonly type="text" name="comptDe" id="comptDeSaveFormPjtIssue" class="input_calen" maxlength="10"></td>
                                        <th>완결여부</th>
                                        <td>
                                            <input type="hidden" name="comptAt" id="comptAtSaveFormPjtIssue" />
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="comptAtOrg" id="comptAtOrgSaveFormPjtIssue">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <button type="button" class="btn_common02" id="btnFileUploadSaveFormPjtIssue">
                                                <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                            </button>
                                        </th>
                                        <td colspan="3">
                                            <input type="hidden" name="atchmnfl" id="atchmnflSaveFormPjtIssue" />
                                            <div class="file_box" style="width:100%; height:50px">
                                                <table style="border:0px">
                                                    <colgroup>
                                                        <col width="*" />
                                                        <col width="80" />
                                                        <col width="63" />
                                                    </colgroup>
                                                    <tr>
                                                        <td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr id="issueActDis" style="display: none;">
                                        <th>
                                            <button type="button" class="btn_common02" id="issueActBtn">이슈활동</button>
                                        </th>
                                        <td colspan="3">
                                            <div class="issueact" id="issueact" style="width:100%; height:100px;">

                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>


                    </div>

                </div>


            </div>
        </div>
    </div>

</body>