<!-- 
 *    프로그램       : 테스트 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.16
 *    사용테이블      : STM_WRD
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/tst/mng/tstmng001/tstmng001.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
        </div>
        <ul class="btn">
            <li>
                <button type="button" id="btnAddTstmng001" class="btn_common02_new">
                    <span class="icon_renew"></span>
                                   신규<!-- <taglibs:transText progrmId="default" key="btnAdd"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnSaveTstmng001" class="btn_common02_new">
                    <span class="icon_save"></span>
                                   저장<!-- <taglibs:transText progrmId="default" key="btnSave"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnRemoveTstmng001" class="btn_common02_new">
                    <span class="icon_del"></span>
                                   삭제<!-- <taglibs:transText progrmId="default" key="btnDelete"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnExcelTstmng001" class="btn_common02_new">
                    <span class="icon_excel"></span>
                                   엑셀<!-- <taglibs:transText progrmId="default" key="btnExcel"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnPrintTstmng001" class="btn_common02_new">
                    <span class="icon_print"></span>
                                   출력<!-- <taglibs:transText progrmId="default" key="btnPrint"/> -->
                </button>
            </li>
        </ul>
    </div>
    <!-- //title_box -->

    <!-- search_box -->
    <div class="search_box" style="clear: none">
        <table style="width: 100%; height: 20px; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
            <tr>
                <td>
                    <form id="searchFormTstmng001">
                        <table style="border: none; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                            <tr style="border: none;">
                                <th><label for="docmT">한글 약어 명<!-- <taglibs:transText progrmId="default" key="titKorAbrvNm"/> --></th>
                                <td><input type="text" name="korAbrvNm" id="korAbrvNmSearchFormTstmng001"></td>
                            </tr>
                        </table>
                    </form>
                </td>
                <td style="border: none;">
                    <div class="btn" style="text-align: right; float: right; top: 6px; position: absolute; right: 0;">
                        <button type="button" id="btnSearchTstmng001">
                            <span class="glyphicon glyphicon-search f15 mr5"></span>
                                                 조회<!-- <taglibs:transText progrmId="default" key="btnSearch"/> -->
                        </button>
                        <button type="button" id="btnResetTstmng001">
                            <span class="glyphicon glyphicon-refresh f15 mr5"></span>
                                                 초기화<!-- <taglibs:transText progrmId="default" key="btnInit"/> -->
                        </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- //search_box -->

    <!-- tabl-1 -->
    <div class="tdl-1">
        <div class="list_type01">
            <div class="list_top">
                <span class="view"> 
                            총<!-- <taglibs:transText progrmId="default" key="titRdcnt"/> -->&nbsp;<span id="spanCntTstmng001"></span>&nbsp;건<!-- <taglibs:transText progrmId="default" key="titSearchCnt"/> -->
                </span>
            </div>
            <div id="dataListTstmng001" style="width: 100%; height: 690px;"></div>
        </div>
    </div>
    <!-- //tabl-1 -->

    <!-- tdl-2 -->
    <div class="tdl-2">
        <div class="list_top"></div>
        <div class="detail_type01">
            <form id="saveFormTstmng001">
                <table>
                    <caption>
                                   테스트<!-- <taglibs:transText progrmId="default" key="titTstmng001"/> -->
                    </caption>
                    <colgroup>
                        <col width="100">
                        <col width="">
                    </colgroup>
                    <tr>
                        <th class="essential_icon">
                                          한글 약어 명<!-- <taglibs:transText progrmId="default" key="titKorAbrvNm"/> -->
                        </th>
                        <td>
                            <input required="true" type="text" name="korAbrvNm" id="korAbrvNmSaveFormTstmng001" maxlength="20" style="width: 50%"/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                                          영문 약어 명<!-- <taglibs:transText progrmId="default" key="titEngAbrvNm"/> -->
                        </th>
                        <td>
                            <input type="text" name="engAbrvNm" id="engAbrvNmSaveFormTstmng001" maxlength="20" style="width: 50%"/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                                          도메인 여부<!-- <taglibs:transText progrmId="default" key="titDomnAt"/> -->
                        </th>
                        <td>
                            <input type="text" name="domnAt" id="domnAtSaveFormTstmng001" maxlength="1" style="width: 50%"/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                                          영문 설명<!-- <taglibs:transText progrmId="default" key="titEngDc"/> -->
                        </th>
                        <td>
                            <input type="text" name="engDc" id="engDcSaveFormTstmng001" maxlength="50" style="width: 50%"/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                                          한글 설명<!-- <taglibs:transText progrmId="default" key="titKorDc"/> -->
                        </th>
                        <td>
                            <input type="text" name="korDc" id="korDcSaveFormTstmng001" maxlength="50" style="width: 50%"/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
    <!-- //tabl-2 -->
</body>
