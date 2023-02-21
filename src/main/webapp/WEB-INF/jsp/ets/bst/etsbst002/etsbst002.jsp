<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/ets/bst/etsbst002/etsbst002.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
        </div>
        <ul class="btn">
            <li>
                <button type="button" id="btnAddEtsbst002" class="btn_common02_new">
                    <span class="icon_renew"></span>
                                   신규<!-- <taglibs:transText progrmId="default" key="btnAdd"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnSaveEtsbst002" class="btn_common02_new">
                    <span class="icon_save"></span>
                                   저장<!-- <taglibs:transText progrmId="default" key="btnSave"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnRemoveEtsbst002" class="btn_common02_new">
                    <span class="icon_del"></span>
                                   삭제<!-- <taglibs:transText progrmId="default" key="btnDelete"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnExcelEtsbst002" class="btn_common02_new">
                    <span class="icon_excel"></span>
                                   엑셀<!-- <taglibs:transText progrmId="default" key="btnExcel"/> -->
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
                    <form id="searchFormEtsbst002">
                        <table style="border: none; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                            <tr style="border: none;">
                                <th><label for="titSearchFormEtsbst002">제목<!-- <taglibs:transText progrmId="default" key="titNoSettingNo"/> --></th>
                                <td><input type="text" name="tit" id="titSearchFormEtsbst002"></td>
                            </tr>
                        </table>
                    </form>
                </td>
                <td style="border: none;">
                    <div class="btn" style="text-align: right; float: right; top: 6px; position: absolute; right: 0;">
                        <button type="button" id="btnSearchEtsbst002">
                            <span class="glyphicon glyphicon-search f15 mr5"></span>
                                                 조회<!-- <taglibs:transText progrmId="default" key="btnSearch"/> -->
                        </button>
                        <button type="button" id="btnResetEtsbst002">
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
    <div class="tdl-1" style="width:40%">
        <div class="list_type01">
            <div class="list_top">
                <span class="view"> 
                            총<!-- <taglibs:transText progrmId="default" key="titRdcnt"/> -->&nbsp;<span id="spanCntEtsbst002"></span>&nbsp;건<!-- <taglibs:transText progrmId="default" key="titSearchCnt"/> -->
                </span>
            </div>
            <div id="dataListEtsbst002" style="width: 100%; height: 690px;"></div>
        </div>
    </div>
    <!-- //tabl-1 -->

    <!-- tdl-2 -->
    <div class="tdl-2" style="width:59%">
        <div class="list_top"></div>
        <div class="detail_type01">
            <form id="saveFormEtsbst002">
                
                <input type="hidden" name="noSettingNo" id="noSettingNoSaveFormEtsbst002"/>
                
                <table>
                    <caption>
                                   문서번호<!-- <taglibs:transText progrmId="default" key="titEtsbst002"/> -->
                    </caption>
                    <colgroup>
                        <col width="100">
                        <col width="">
                    </colgroup>                     
                    <tr>
                        <th class="essential_icon">
                                          제목<!-- <taglibs:transText progrmId="default" key="titTit"/> -->
                        </th>
                        <td>
                            <input required="true" type="text" name="tit" id="titSaveFormEtsbst002" maxlength="50" style="width: 50%"/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                                          설정 코드<!-- <taglibs:transText progrmId="default" key="titSettingCode"/> -->
                        </th>
                        <td>
                            <input type="text" name="settingCode" id="settingCodeSaveFormEtsbst002" maxlength="20" style="width: 50%"/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                                          입력 텍스트<!-- <taglibs:transText progrmId="default" key="titInputText"/> -->
                        </th>
                        <td>
                            <input type="text" name="inputText" id="inputTextSaveFormEtsbst002" maxlength="50" style="width: 50%"/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                                          적용 년도<!-- <taglibs:transText progrmId="default" key="titApplcYy"/> -->
                        </th>
                        <td>
                            <input type="text" name="applcYy" id="applcYySaveFormEtsbst002" maxlength="4" style="width: 50%"/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                                          사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> -->
                        </th>
                        <td>                            
                            <div class="checkbox">
                                <label>
                                  <input type="checkbox" name="useAt" id="useAtSaveFormEtsbst002">
                                  <i class="input-helper"></i>                                
                                </label>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
    <!-- //tabl-2 -->
</body>
