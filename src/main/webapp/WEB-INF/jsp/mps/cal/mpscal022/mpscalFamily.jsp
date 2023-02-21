<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal022/mpscalFamily.js"></script>
                            <div class="div_title">
                                <div class="left ml5">
                                    <span class="table_sumnum" id="spanCntSearchFormMpscalFamily">0</span>
                                </div>
                                <div class="right mr5">
                                    <ul class="btn">
                                        <li>
                                            <button type="button" id="btnSaveMpscalFamily" class="btn_common01_new">
                                                <taglibs:transText progrmId="default" key="btnSave" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                         <form id="searchFormMpscalFamily">
                            <input type="hidden" name="empno" id="empno" value="${empno}" />
                            <input type="hidden" name="bplcCode" id="bplcCode" value="${bplcCode}" />
                         </form>
                         <div class="mt5 outer_line_grid" style="height: calc(100vh - 49px)!important;">
                                <div id="dataListMpscalFamily" style="height: calc(100vh - 49px)!important;"></div>
                         </div>
</body>