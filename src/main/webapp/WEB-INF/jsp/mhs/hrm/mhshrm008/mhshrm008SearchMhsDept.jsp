<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrm/mhshrm008/mhshrm008SearchMhsDept.js"></script>

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
    <div class="search_box" id="searchFormMhsDept">
        <table>
            <tr>
                <th><label for="dateS" class="label">조회일자</label></th>
                <td>
                    <input type="text" name="searchSregDt" id="searchSregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"> ~
                    <input type="text" name="searchEregDt" id="searchEregDt" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
                    &nbsp;&nbsp;
                    <div class="switch-field">
                        <input type="radio" name="searchDateSet" id="oneM" value="1" checked> <label for="oneM">1개월전</label>
                        <input type="radio" name="searchDateSet" id="threeM" value="3"> <label for="threeM">3개월전</label>
                        <input type="radio" name="searchDateSet" id="sixM"value="6"> <label for="sixM">6개월전</label>
                    </div>
                </td>
                <th><label for="docmN">사용여부</label></th>
                <td>
                    <div class="switch-field">
                        <input type="radio"  id="switch_3_left" name="useAt" value="" checked/>
                        <label  for="switch_3_left">전체</label>
                        <input type="radio" id="switch_3_center" name="useAt" value="1">
                        <label for="switch_3_center">사용</label>
                        <input type="radio"  id="switch_3_right" name="useAt" value="0">
                        <label for="switch_3_right">미사용</label>
                    </div>
               </td>
               <th><label for="deptKorNm" class="label"><taglibs:transText progrmId="default" key="titDeptKorNm" /></label></th>
               <td><input type="text" name="deptKorNm" id="deptKorNm" maxlength="null"></td>               <th><label for="deptCode" class="label"><taglibs:transText progrmId="default" key="titDeptCode" /></label></th>
               <td><input type="text" name="deptCode" id="deptCode" maxlength="null"></td>               <td>
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
                        <taglibs:transText progrmId="default" key="titMhsDept" />&nbsp;<taglibs:transText progrmId="default" key="titList" />
                    </h4>
                    <span class="view ">
                        <taglibs:transText progrmId="default" key="titRdcnt" /> &nbsp; <span id="spanCnt"></span>
                        <taglibs:transText progrmId="default" key="titSearchCnt" />
                    </span>
                    <div class="btn">
                        <button type="button" id="btnCheckAll" class="btn_common02_new">
                          <!-- <span class="glyphicon glyphicon-check mr2"></span> -->
                            <taglibs:transText progrmId="default" key="btnSelectAll" />
                        </button>
                        <button type="button" id="btnExcel" class="btn_common02_new">
                            <!--  <span class="glyphicon glyphicon-download-alt"></span> -->
                            <taglibs:transText progrmId="default" key="btnDown" />
                        </button>
                        <button type="button" id="btnAdd" class="btn_common02_new">
                            <!--  <span class="glyphicon glyphicon-pencil mr5"></span> -->
                            <taglibs:transText progrmId="default" key="titRegist" />
                        </button>
                        <button type="button" id="btnRemove" class="btn_common02_new">
                            <!--  <span class="glyphicon glyphicon-trash mr5"></span> -->
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
                    <taglibs:transText progrmId="default" key="titMhsDept" />&nbsp;<taglibs:transText progrmId="default" key="titRegist" />
                </h4>
            </div>
            <div class="detail_type01">
                <form id="saveFormMhsDept">
                <table>
                    <caption><taglibs:transText progrmId="default" key="titMhsDept" /></caption>
                    <colgroup>
                        <col width="150">
                        <col width="">
                    </colgroup>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptCode" /></th>
                        <td><input required type="text" name="deptCode" id="deptCode" maxlength="20" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptKorNm" /></th>
                        <td><input required type="text" name="deptKorNm" id="deptKorNm" maxlength="20" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptEngNm" /></th>
                        <td><input required type="text" name="deptEngNm" id="deptEngNm" maxlength="20" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptAbrv" /></th>
                        <td><input required type="text" name="deptAbrv" id="deptAbrv" maxlength="20" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titBplcCode" /></th>
                        <td><input required type="text" name="bplcCode" id="bplcCode" maxlength="4" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titUpperDeptCode" /></th>
                        <td><input required type="text" name="upperDeptCode" id="upperDeptCode" maxlength="20" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptLvl" /></th>
                        <td><input required type="text" name="deptLvl" id="deptLvl" maxlength="2" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titOrgnztLvl" /></th>
                        <td><input required type="text" name="orgnztLvl" id="orgnztLvl" maxlength="22" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptTelno" /></th>
                        <td><input required type="text" name="deptTelno" id="deptTelno" maxlength="20" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptFaxTelno" /></th>
                        <td><input required type="text" name="deptFaxTelno" id="deptFaxTelno" maxlength="20" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titUseBeginDe" /></th>
                        <td><input required type="text" name="useBeginDe" id="useBeginDe" maxlength="8" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titUseAt" /></th>
                        <td><input type="checkbox" name="useAt" id="useAt"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titDeptSe" /></th>
                        <td><input required type="text" name="deptSe" id="deptSe" maxlength="3" style="width: 50%"></td>
                    </tr>
                    <tr>
                        <th><taglibs:transText progrmId="default" key="titOutptOrdr" /></th>
                        <td><input required type="text" name="outptOrdr" id="outptOrdr" maxlength="22" style="width: 50%"></td>
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
