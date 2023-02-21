<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 완료 탭 -->

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtEnd.js"></script>
    <script>
        var projectSn = '${projectSn}';
    </script>
    <!-- tabl_box-->


    <div style="min-height:50vh;">

        <div class="div_title">
            <div class="right">
                <div class="right ml7">
                    <button type="button" id="btnApprovPjtEnd" class="btn_common01_new">완료승인요청</button>
                    <button type="button" id="btnSavePjtEnd" class="btn_common01_new">저장</button>
                </div>
            </div>
        </div>

        <div class="mt5 outer_line_form" style="height:100% !important; min-height:auto !important;">
            <div class="tabl_box">
                <div class="detail_type01" id="divSaveFormPjtEnd">
                    <form id="saveFormPjtEnd">
                        <input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
                        <input type="hidden" name="projectSnEnd" id="projectSnEnd" />
                        <table>
                            <colgroup>
                                <col width="200">
                                <col width="*">

                            </colgroup>
                            <tr>
                                <th>전산화 기대효과 및<br>향후 예상 프로젝트</th>
                                <td colspan="2">
                                    <textarea required="true" name="completeCn1" id="completeCn1" style="width: 99%; height: 85px;"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>맺음말</th>
                                <td colspan="2">
                                    <textarea required="true" name="completeCn2" id="completeCn2" style="width: 99%; height: 85px;"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>미비사항 및 대책</th>
                                <td colspan="2">
                                    <textarea required="true" name="completeCn3" id="completeCn3" style="width: 99%; height: 85px;"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>건의사항</th>
                                <td colspan="2">
                                    <textarea name="completeCn4" id="completeCn4" style="width: 99%; height: 60px;"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th><button type="button" class="btn_common02" id="repairPlanBtn">하자보수계획</button></th>
                                <td colspan="2">
                                    <div class="repairPlan" id="repairPlan" style="width:100%; height:70px; overflow:auto">
                                       
                                    </div>
                                </td>                                 
                            </tr>
                            <tr id=" apprvCn1" style="display: none;">
                                <th rowspan="2">승인권자 의견</th>
                                <td style="background-color: #f5f5f5; border-right: 1px solid #ddd; text-align: center;">1번 승인권자 의견</td>
                                <td style="background-color: #f5f5f5; text-align: center;">2번 승인권자 의견</td>
                            </tr>
                            <tr id="apprvCn2" style="display: none;">
                                <td style="height: 66px;">
                                    <textarea name="apprvCn1" id="apprvCn1" style="width: 99%; height: 60px;"></textarea>
                                </td>
                                <td style="height: 66px;">
                                    <textarea name="apprvCn2" id="apprvCn2" style="width: 99%; height: 60px;"></textarea>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>

        </div>
    </div>

</body>