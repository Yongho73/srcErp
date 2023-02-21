<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mps/cal/mpscal022/mpscalStdr.js"></script>
                            <div class="div_title">
                                <div class="left ml5">
                                    <span class="table_sumnum" id="spanCntSearchFormMpscalStdr">0</span>
                                </div>
                                <div class="right mr5">
<!--                                     <ul class="btn"> -->
<!--                                         <li> -->
<!--                                             <button type="button" id="btnAddMpscalStdr" class="div_title_btn"> -->
<%--                                                 <taglibs:transText progrmId="default" key="btnAdd" /> --%>
<!--                                             </button>  -->
<!--                                             <button type="button" id="btnSaveMpscalStdr" class="div_title_btn"> -->
<%--                                                 <taglibs:transText progrmId="default" key="btnSave" /> --%>
<!--                                             </button> -->
<!--                                             <button type="button" id="btnRemoveMpscalStdr" class="div_title_btn"> -->
<%--                                                 <taglibs:transText progrmId="default" key="btnDelete" /> --%>
<!--                                             </button> -->
<!--                                         </li> -->
<!--                                     </ul> -->
                                </div>
                            </div>
                         <form id="searchFormMpscalStdr">
                            <input type="hidden" name="empno" id="empno" value="${empno}" />
                            <input type="hidden" name="bplcCode" id="bplcCode" value="${bplcCode}" />
                         </form>
                         <div class="mt5 outer_line_grid" style="height: calc(100vh - 49px)!important;">
                                <div id="dataListMpscalStdr" style="height: calc(100vh - 49px)!important;"></div>
                         </div>
</body>