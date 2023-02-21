<!-- 
 *    프로그램       : 사용자등록(관리) 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.24
 *    사용테이블      : STM_USERS
 * sourceGen version : 2020.07.16.01 (2020.07.24)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/mng/stmmng001/stmmng001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmmng001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveStmmng001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmmng001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelStmmng001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmmng001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">부서</span><div id="divComboDeptNm"  class="div_combo"></div></li>
                        <li><span class="span">사용자ID<!-- <taglibs:transText progrmId="default" key="titUserId"/> --></span><input name="userId" id="userIdSearchFormStmmng001"></li>
                        <li><span class="span">사용자명<!-- <taglibs:transText progrmId="default" key="titUserNm"/> --></span><input name="userNm" id="userNmSearchFormStmmng001"></li>
                        <li><span class="span">사원여부</span>
                            <select id="empAtSearchFormStmmng001" name="empAt">
                                <option value="">전체</option>
                                <option value="1" selected>사원</option>
                                <option value="0">비사원</option>
                            </select>
                        </li>
                        <li><span class="span">사용여부</span>
                            <select id="useAtSearchFormStmmng001" name="useAt">
                                <option value="">전체</option>
                                <option value="1" selected>사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmmng001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmmng001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item7">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormStmmng001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListStmmng001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingStmmng001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item7">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormStmmng001">
                            <table>
                                <caption>사용자등록<!-- <taglibs:transText progrmId="default" key="titStmmng001"/> --></caption>
                                <colgroup>
                                    <col width="120">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">사원번호<!-- <taglibs:transText progrmId="default" key="titEmpno"/> --></th>
                                    <td><input required="true" type="text" name="empno" id="empnoSaveFormStmmng001" maxlength="10" style="width: 50%"/>
                                    <input type="hidden" name="deptNm" id="deptNmSaveFormStmmng001" style="width: 50%"/>
                                        <button type="button" id="btnPopEmpSearchStmmng001" class="btn_common01">
                                            <span class="glyphicon glyphicon glyphicon-search"></span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사용자명<!-- <taglibs:transText progrmId="default" key="titUserNm"/> --></th>
                                    <td><input required="true" type="text" name="userNm" id="userNmSaveFormStmmng001" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사용자ID<!-- <taglibs:transText progrmId="default" key="titUserId"/> --></th>
                                    <td><input required="true" type="text" name="userId" id="userIdSaveFormStmmng001" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">패스워드<!-- <taglibs:transText progrmId="default" key="titUserPassword"/> --></th>
                                    <td><input required="true" type="password" name="userPassword" id="userPasswordSaveFormStmmng001" maxlength="300" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">사용자IP<!-- <taglibs:transText progrmId="default" key="titUserIp"/> --></th>
                                    <td><input required="true" type="text" name="userIp" id="userIpSaveFormStmmng001" maxlength="100" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>사원여부<!-- <taglibs:transText progrmId="default" key="titEmplAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="emplAt" id="emplAtSaveFormStmmng001" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="useAt" id="useAtSaveFormStmmng001" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="essential_icon">권한부여방식</th>
                                    <td>
                                        <select required="true" name="roleOption" id="roleOptionSaveFormStmUsers" class="w50p">
                                            <option value="UG">사용자권한+그룹권한</option>
                                            <option value="U">사용자권한</option>
                                            <option value="G">그룹권한</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>사용자그룹권한</th>
                                    <td>
                                        <input type="hidden" type="text" name="roleCode" id="roleCodeSaveFormStmUsers">
                                        <div id="userRoleCodeSaveFormStmUsersCombo"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>등록일자<!-- <taglibs:transText progrmId="default" key="titUserPassword"/> --></th>
                                    <td><input type="text" name="regDt" id="regDtSaveFormStmmng001" style="width: 50%"/></td>
                                </tr>
<!--                                 <tr>
                                     <th>패스워드 변경일자</th>
                                     <td><input type="text" name="passwordUpdt" id="passwordUpdtSaveFormStmmng001" style="width: 50%"/></td>
                                 </tr> -->
                            </table>
                        </form>
                    </div>  <!--//detail_type01--> 
                    <!-- 폼이 두개인 경우 아래 추가 
                    <div>
                        <div class="div_title">
                            <div class="left ml5"></div>
                            <div class="right mr5"></div>
                        </div>
                        <div class="mt5">
                            <div class="detail_type01">
                            </div>
                        </div>
                    </div>
                    폼이 두개인 경우 여기까지 추가 --> 
                </div>  <!--// outer_line_form -->
            </div><!-- //오른쪽 영역 item4 end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item4으로 변경후 사용 
            <div class="item4"></div>
             --> 
        </div><!-- //flex end -->
    </div><!-- //wrapper_con end -->

</body>
