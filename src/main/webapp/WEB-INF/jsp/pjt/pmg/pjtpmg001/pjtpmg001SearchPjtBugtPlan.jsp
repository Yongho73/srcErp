<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<!-- 프로젝트관리 > 프로젝트현황 > 예산 > 인력계획 탭 -->

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg001/pjtpmg001SearchPjtBugtPlan.js"></script>

    <form id="searchFormPjtHfn">
        <input type="hidden" name="projectSn" id="projectSn" value="${projectSn}" />
    </form>
    <div class="flex">
        <div class="item">
            <div class="row-12">
                <div class="col-12">
                    <div class="project_tab_div">
                        <ul class="project_tab">
                            <li class="active">예산계획</li>
                            <li class="" id="bugtAcmslt">예산실적(월별)</li>
                            <li class="" id="bugtPlanAcmslt">예산계획 대비 실적</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row-12">
                <div class="col-12">
                    <div class="div_title">
                        <div class="left">
                            <span class="title_left">예산계획</span>
                            <span class="table_sumnum" id="spanCnt">0</span>
                        </div>
                        <div class="right">
                            <div class="right ml7">
                                <button class="div_title_btn" type="button" id="btnBugtAdd">행추가</button>
                                <button class="div_title_btn" id="btnBugtRemove" type="button">행삭제</button>
                                <button class="div_title_btn" id="btnBugtSave" type="button">저장</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="item">
                            <div class="mt5 outer_line_grid" style="height:calc(100vh - 90px);">
                                <div class="dhtml_line">
                                    <div class="dhtml_grid" id="bugtList"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>