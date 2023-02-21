<!-- 
 *    프로그램       : 부서조직관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.21
 *    사용테이블      : MHS_DEPT_ORGNZT
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrm/mhshrm005/mhshrm005.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
        </div>
        <ul class="btn">
            <li>
                <button type="button" id="btnAddMhshrm005" class="btn_common02_new">
                    <span class="icon_renew"></span>
                                   신규<!-- <taglibs:transText progrmId="default" key="btnAdd"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnSaveMhshrm005" class="btn_common02_new">
                    <span class="icon_save"></span>
                                   저장<!-- <taglibs:transText progrmId="default" key="btnSave"/> -->
                </button>
            </li>
            <li>
                <button type="button" id="btnRemoveMhshrm005" class="btn_common02_new">
                    <span class="icon_del"></span>
                                   삭제<!-- <taglibs:transText progrmId="default" key="btnDelete"/> -->
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
                    <form id="searchFormMhshrm005">
				        <input type="hidden" name="sortDirection"/>
				        <input type="hidden" name="sortColumId"/>
                        <table style="border: none; padding-top: -2px; padding-bottom: -2px; margin-top: -2px; margin-bottom: -2px;">
                            <tr style="border: none;">
                                <th><label for="docmT">조직코드<!-- <taglibs:transText progrmId="default" key="titOrgnztCode"/> --></th>
                                <td style="width: 250px;"> 
				                    <input type="text" name="orgnztCode" id="orgnztCodeSearchFormMhshrm005" maxlength="15" style="width: 60px;" autocomplete="off"/>
				               		<input type="text" name="orgnztCodeNm" id="orgnztCodeNmSearchFormMhshrm005" autocomplete="off">
					                <button type="button" id="btnOrgnztCodeSearchSearchFormMhshrm005" class="btn_common03">
					                <span class="glyphicon  glyphicon glyphicon-search"> </span>
					                </button>
								</td>
                                
                                <th><label for="deptCode" class="label"><taglibs:transText progrmId="default" key="titDeptCode" /></th>
								<td style="width: 250px;"> 
				                    <input type="text" name="deptCode" id="deptCodeSearchFormMhshrm005" maxlength="15" style="width: 60px;" autocomplete="off"/>
				               		<input type="text" name="deptCodeNm" id="deptCodeNmSearchFormMhshrm005" autocomplete="off">
					                <button type="button" id="btnDeptCodeSearchSearchFormMhshrm005" class="btn_common03">
					                <span class="glyphicon  glyphicon glyphicon-search"> </span>
					                </button>
								</td>
                                
                                <th><label for="docmT">사용여부</th>
                                <td><select id="useAtSearchFormMhshrm005" name="useAt">
                                    <option value="">전체</option>
                                    <option value="1">사용</option>
                                    <option value="0">사용안함</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </form>
                </td>
                <td style="border: none; width:200px;">
                    <div class="btn" style="text-align: right; float: right; top: 6px; position: absolute; right: 0;">
                        <button type="button" id="btnSearchMhshrm005">
                            <span class="glyphicon glyphicon-search f15 mr5"></span>
                                                 조회<!-- <taglibs:transText progrmId="default" key="btnSearch"/> -->
                        </button>
                        <button type="button" id="btnResetMhshrm005">
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
    <div class="tdl-5">
        <div class="list_type01">
            <div class="list_top">
                <span class="view"> 
                            총<!-- <taglibs:transText progrmId="default" key="titRdcnt"/> -->&nbsp;<span id="spanCntMhshrm005"></span>&nbsp;건<!-- <taglibs:transText progrmId="default" key="titSearchCnt"/> -->
                </span>
            </div>
            <div id="dataListMhshrm005" style="width: 100%; height: 690px;"></div>
        </div>
    </div>
    <!-- //tabl-1 -->
</body>
