<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng008/stmmng008SearchStmBtn.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
            <a href="#n" class="btn_help"><span class="blind"><taglibs:transText progrmId="default" key="titHelp" /></span></a>
        </div>
        <!--//path_info-->
    </div>
    <!--//title_box-->

    <!-- search_box -->
    <div class="search_box" id="searchFormStmBtn">
        <table>
            <tr>
               <th><label for="docmT">버튼 ID</th>
			   <td><input type="text" name="btnId" id="btnId"></td>			
			   <th><label for="writer">버튼 명</label></th>
			   <td><input type="text" name="btnNm" id="btnNm"></td>
               <td>
                    <div class="btn">
                     <button type="button" id="btnSearch">
                     	<span class="glyphicon glyphicon-search f15 mr5"></span><taglibs:transText progrmId="default" key="btnSearch" />
                     </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!--//search_box-->

    <!--//tabl_box-->
    <div class="tabl_box">
        <!-- //tabl-1 -->
        <div class="tdl-1">
            <div class="list_type01">
                <div class="list_top">
                    <h4 class="title03 fl">
                        <taglibs:transText progrmId="default" key="titStmBtn" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view ">
                        <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    <div class="btn">
                        <button type="button" id="btnCheckAll" class="btn_common01_new">
                            <!-- <span class="glyphicon glyphicon-check mr2"></span>-->
                            <taglibs:transText progrmId="default" key="btnSelectAll" />
                        </button>
                        <button type="button" id="btnExcel" class="btn_common01_new">
                            <!-- <span class="glyphicon glyphicon-download-alt"></span>-->
                            <taglibs:transText progrmId="default" key="btnDown" />
                        </button>
                        <button type="button" id="btnAdd" class="btn_common01_new">
                            <!-- <span class="glyphicon glyphicon-pencil mr5"></span>-->
                            <taglibs:transText progrmId="default" key="titRegist" />
                        </button>
                        <button type="button" id="btnRemove" class="btn_common01_new">
                            <!-- <span class="glyphicon glyphicon-trash mr5"></span>-->
                            <taglibs:transText progrmId="default" key="btnDelete" />
                        </button>
                    </div>
                </div>
                <!--//list_top-->
                <div>
                    <div id="dataList" style="width: 100%; height: 600px"></div>
                </div>
            </div>
            <!--//list_type01-->
        </div>
        <!-- //tabl-1 -->

        <!-- //tdl-2 -->
        <div class="tdl-2" id="saveForm">
            <div class="list_top02">
                <h4 class="title03" id="h4_pr_title">
                    <taglibs:transText progrmId="default" key="titStmBtn" />&nbsp;<taglibs:transText progrmId="default" key="titRegist" />
                </h4>
            </div>
            <div class="detail_type01">
                <form id="saveFormStmBtn">
                <table>
                    <caption><taglibs:transText progrmId="default" key="titStmBtn" /></caption>
                    <colgroup>
                        <col width="150">
                        <col width="">
                    </colgroup>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titBtnId" /></th>
                        <td><input required type="text" name="btnId" id="btnId" maxlength="20" style="width: 50%"/>
                        	<div class="btn_common04 w70 checkDupBtn">
                        		<span class="glyphicon glyphicon-duplicate"></span>
                        		<input type="button" id="btnCheckDup" class="btn_input w60" value="중복확인">
                        	</div>
                        </td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titBtnNm" /></th>
                        <td><input required type="text" name="btnNm" id="btnNm" maxlength="20" style="width: 50%"/></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titBtnDc" /></th>
                        <td><input required type="text" name="btnDc" id="btnDc" maxlength="50" style="width: 50%"/></td>
                    </tr>
                </table>
                </form>
            </div>
            <!--//detail_type01-->
            <div class="ac mt10">
                <button type="button" id="btnFormSave" class="btn_common01">
                    <span class="glyphicon glyphicon-save mr5"> </span>
                    <taglibs:transText progrmId="default" key="btnSave" />
                </button>
                <span id="spanReset">
                    <button type="button" id="btnFormReset" class="btn_common01">
                        <span class="glyphicon glyphicon-refresh mr5"> </span>
                        <taglibs:transText progrmId="default" key="btnReset" />
                    </button>
                </span> <span id="spanDel" style="display: none">
                    <button type="button" id="btnFormRemove" class="btn_common01">
                        <span class="glyphicon glyphicon-trash mr5"> </span>
                        <taglibs:transText progrmId="default" key="btnDelete" />
                    </button>
                </span>
            </div>
            <!-- //ac -->
        </div>
        <!-- //tabl-2 -->
    </div>
    <!--//tabl_box-->
</body>
