<!-- 
 *    프로그램       : 인사탭 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.09
 *    사용테이블      : STM_CUSTOMER
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb000/mhshrb000.js"></script>

    <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddStmUsers"><i class="axi axi-note-add mr5"></i><span>신규</span></a>
                    </li>
                    <li><a href="#none" id="btnRemoveStmUsers"><i
                                class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveStmUsers"><i class="axi axi-save mr5"></i><span>저장</span></a>
                    </li>
                    <li><a href="#none" id="btnExcelStmUsers"><i
                                class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormStmUsers">
                    <ul class="consearchinput_list">
                        <li><span class="span">사용자ID</span><input name="userId" id="userIdSearchFormStmUsers"></li>
                        <li><span class="span">사용자명</span><input name="userNm" id="userNmSearchFormStmUsers"></li>
                        <li><span class="span">사원여부</span>
                            <select id="empAtSearchFormStmUsers" name="empAt">
                                <option value="">전체</option>
                                <option value="1">사원</option>
                                <option value="0">비사원</option>
                            </select>
                        </li>
                        <li><span class="span">사용여부</span>
                            <select id="useAtSearchFormStmUsers" name="useAt">
                                <option value="">전체</option>
                                <option value="1">사용</option>
                                <option value="0">미사용</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchStmUsers"><span
                                class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetStmUsers"><span
                                class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->

                <!-- 타이틀영역 -->
                <div class="div_title">
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 영역</span>
                        <span class="table_sumnum ml5">0</span>
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">
                        <select name="">
                            <option value="">20개씩 보기</option>
                            <option value="1">사원</option>
                            <option value="0">비사원</option>
                        </select>
                        <div class="right ml7">
                            <button class="div_title_btn" type="button">선택</button>
                            <button class="div_title_btn" type="button">신규등록</button>
                        </div>
                    </div>
                </div>
                <!--// 타이틀영역 -->


                <!-- 그리드세트(페이징) -->
                    <div class="outer_line_grid mt5"> <!-- 위에 타이틀없을경우 mt5를 지워주세요(위에여백주는클래스입니다) -->
                        <div class="dhtml_line_paging">
                            <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                            <div id="gridA" class="dhtml_grid"></div> <!-- ★ 아이디는 바꾸시되 클래스 꼭 넣어주세요!! -->                        
                        </div>
                        <div class="ac paging" id="divPagingMhsEmp"><a href="#none" onclick="fn_SearchMhsEmpGridList(1)">
                                &lt;&lt; </a><a href="#none"> &lt;
                            </a><a href="#none" class="active">1</a><a href="#none" class="next"> &gt;
                            </a><a href="#none" class="last" onclick="fn_SearchMhsEmpGridList(1)">
                                &gt;&gt; </a></div>
                    </div>
                <!--// 그리드세트(페이징) -->
                
                
                <!-- 그리드세트(페이징 없음) -->
                <!--   <div class="outer_line_grid mt5"> <!-- 위에 타이틀없을경우 mt5를 지워주세요(위에여백주는클래스입니다) -->
                <!--        <div class="dhtml_line">
                            <!-- 표현할 dhtml id 위에 반드시 넣어준다(페이징이 없을 경우 dhtml_line을 사용) -->
                <!--            <div id="gridA" class="dhtml_grid"></div> <!-- ★ 아이디는 바꾸시되 클래스 꼭 넣어주세요!! -->
                <!--        </div>
                       </div>
                <!--// 그리드세트(페이징 없음) -->
                
                
                
            </div><!-- //왼쪽 영역 item end -->

            <div class="item3">
                <!-- flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title"> <!-- 높이만 잡고 싶은 경우 빈 div_title만 남기고 안쪽은 지워준다 -->
                    <!-- 타이틀영역(좌측) -->
                    <div class="left">
                        <span class="s_tit"><i class="axi axi-chevron-right"></i>폼 영역1</span>
                        <span class="table_sumnum ml5">0</span>
                    </div>
                    <!-- 타이틀영역(우측) -->
                    <div class="right">
                        <select name="">
                            <option value="">20개씩 보기</option>
                            <option value="1">사원</option>
                            <option value="0">비사원</option>
                        </select>
                        <div class="right ml7">
                            <button class="div_title_btn" type="button">선택</button>
                            <button class="div_title_btn" type="button">신규등록</button>
                        </div>
                    </div>
                </div>
                <!--// 타이틀영역 -->


                <div class="mt5 outer_line_form">

                    <div class="detail_type01">
                        <form id="saveFormEmp_Tab1" novalidate="novalidate">
                            <table>
                                <caption>직원</caption>
                                <colgroup>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                    <col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>내선전화번호</th>
                                        <td><input type="text" name="tab1lxtnTelno" id="tab1lxtnTelno" maxlength="20"
                                                class="w90p" autocomplete="off"></td>
                                        <th>휴대폰번호</th>
                                        <td><input type="text" name="tab1Mbtlnum" id="tab1Mbtlnum" maxlength="20"
                                                class="w90p" autocomplete="off"></td>
                                        <th>자택전화번호</th>
                                        <td><input type="text" name="tab1OwnhomTelno" id="tab1OwnhomTelno"
                                                maxlength="20" class="w90p" autocomplete="off"></td>
                                    </tr>
                                    <tr>
                                        <th>이메일(사내)</th>
                                        <td><input type="text" name="tab1Email" id="tab1Email" maxlength="50"
                                                class="w90p" autocomplete="off"></td>
                                        <th>이메일(개인)</th>
                                        <td><input type="text" name="tab1IndvdlEmail" id="tab1IndvdlEmail"
                                                maxlength="50" class="w90p" autocomplete="off"></td>
                                        <th>결혼여부</th>
                                        <td>
                                            <div id="divInputFormTab1MrrgAt" class="div_combo">
                                                <select name="tab1MrrgAt" id="tab1MrrgAt">
                                                    <option value="">선택</option>
                                                    <option value="1">기혼</option>
                                                    <option value="0">미혼</option>
                                                </select></div>&nbsp;<input type="text" name="tab1MrrgDe"
                                                id="tab1MrrgDe" maxlength="10" class="input_calen"
                                                onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"
                                                autocomplete="off">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>비상연락처</th>
                                        <td><input type="text" name="tab1EmgncTelno" id="tab1EmgncTelno" maxlength="50"
                                                class="w90p" autocomplete="off"></td>
                                        <th>최종학력</th>
                                        <td>
                                            <div id="divInputFormTab1LastAcdncrCode" class="div_combo"><select
                                                    name="tab1LastAcdncrCode" id="tab1LastAcdncrCode" disabled="">
                                                    <option value="410">고등학교(재)</option>
                                                    <option value="420">고등학교(중퇴)</option>
                                                    <option value="400">고졸</option>
                                                    <option value="999">기타</option>
                                                    <option value="200">대졸</option>
                                                    <option value="210">대학(재)</option>
                                                    <option value="220">대학(중퇴)</option>
                                                    <option value="110">대학원(재)</option>
                                                    <option value="120">대학원(중퇴)</option>
                                                    <option value="100">대학원졸</option>
                                                    <option value="900">무학</option>
                                                    <option value="800">미취학</option>
                                                    <option value="700">유치원</option>
                                                    <option value="310">전문대(재)</option>
                                                    <option value="300">전문대졸</option>
                                                    <option value="320">전문재(중퇴)</option>
                                                    <option value="510">중학교(재)</option>
                                                    <option value="520">중학교(중퇴)</option>
                                                    <option value="500">중학교졸</option>
                                                    <option value="610">초등학교(재)</option>
                                                    <option value="620">초등학교(중퇴)</option>
                                                    <option value="600">초등학교졸</option>
                                                </select></div>
                                        </td>
                                        <th>최종학교</th>
                                        <td><input type="text" name="tab1LastSchulNm" id="tab1LastSchulNm"
                                                maxlength="50" class="w90p" autocomplete="off" readonly="">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>최종승급일</th>
                                        <td><input type="text" name="tab1LastPromtDe" id="tab1LastPromtDe"
                                                maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)"
                                                onkeypress="gf_AutoDate(event, this)" autocomplete="off" readonly="">
                                        </td>
                                        <th>최종승호일</th>
                                        <td><input type="text" name="tab1LastSalclsupDe" id="tab1LastSalclsupDe"
                                                maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)"
                                                onkeypress="gf_AutoDate(event, this)" autocomplete="off" readonly="">
                                        </td>
                                        <th>휴직구분</th>
                                        <td>
                                            <div id="divInputFormTab1LayoffSeCode" class="div_combo"><select
                                                    name="tab1LayoffSeCode" id="tab1LayoffSeCode" disabled="">
                                                    <option value="H05">기타</option>
                                                    <option value="H02">병가휴직(업무상질병)</option>
                                                    <option value="H01">병가휴직(일반)</option>
                                                    <option value="H04">육아휴직</option>
                                                    <option value="H03">육아휴직연장</option>
                                                </select></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>현주소</th>
                                        <td colspan="5">
                                            <input type="text" name="zip" id="zip" maxlength="5" class="w80"
                                                readonly="">
                                            <button type="button" id="btnTab1AddrSearch" class="btn_common03">
                                                <span class="glyphicon  glyphicon glyphicon-search">
                                                </span>
                                            </button>
                                            <input type="text" name="ownhomAdres" id="ownhomAdres" maxlength="50"
                                                class="w40p" autocomplete="off">
                                            <input type="text" name="ownhomDetailAdres" id="ownhomDetailAdres"
                                                maxlength="50" class="w20p" autocomplete="off">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>본적</th>
                                        <td colspan="5">
                                            <input type="text" name="bornZip" id="bornZip" maxlength="5" class="w80"
                                                readonly="">
                                            <button type="button" id="btnTab1BornAddrSearch" class="btn_common03">
                                                <span class="glyphicon  glyphicon glyphicon-search">
                                                </span>
                                            </button>
                                            <input type="text" name="bornAdres" id="bornAdres" maxlength="50"
                                                class="w40p" autocomplete="off">
                                            <input type="text" name="bornDetailAdres" id="bornDetailAdres"
                                                maxlength="50" class="w20p" autocomplete="off">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>급여지급</th>
                                        <td>
                                            <div id="divInputFormTab1SalaryPymntAt" class="div_combo">
                                                <select name="tab1SalaryPymntAt" id="tab1SalaryPymntAt">
                                                    <option value="1" selected="selected">지급
                                                    </option>
                                                    <option value="0">미지급</option>
                                                </select>
                                            </div>
                                        </td>
                                        <th>퇴직금중간정산일자</th>
                                        <td><input type="text" name="tab1RetireExcclcDe" id="tab1RetireExcclcDe"
                                                maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)"
                                                onkeypress="gf_AutoDate(event, this)" autocomplete="off" readonly="">
                                        </td>
                                        <th>출납업무</th>
                                        <td>
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="tab1CashierAt" id="tab1CashierAt"
                                                        value="1">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>퇴직연금</th>
                                        <td>
                                            <div id="divInputFormTab1RetireAnntyKindCode" class="div_combo">
                                                <select name="tab1RetireAnntyKindCode" id="tab1RetireAnntyKindCode">
                                                    <option value="">선택</option>
                                                    <option value="2">IRP</option>
                                                    <option value="1">이연계좌</option>
                                                </select></div>
                                        </td>
                                        <th>소득세율선택</th>
                                        <td>
                                            <div id="divInputFormTab1IncmtaxrtCode" class="div_combo"><select
                                                    name="tab1IncmtaxrtCode" id="tab1IncmtaxrtCode">
                                                    <option value="">선택</option>
                                                    <option value="02">100%</option>
                                                    <option value="03">120%</option>
                                                    <option value="01">80%</option>
                                                </select></div>
                                        </td>
                                        <th>급여보수체계</th>
                                        <td>
                                            <div id="divInputFormTab1SalaryAprpCode" class="div_combo"><select
                                                    name="tab1SalaryAprpCode" id="tab1SalaryAprpCode">
                                                    <option value="">선택</option>
                                                    <option value="300">연봉</option>
                                                    <option value="100">책정임금</option>
                                                    <option value="200">호봉</option>
                                                </select></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>육아단축근무여부</th>
                                        <td>
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="tab1BabyShrtenWorkAt"
                                                        id="tab1BabyShrtenWorkAt" value="1">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </td>
                                        <th>노조가입</th>
                                        <td>
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="tab1LbunSbscrbAt" id="tab1LbunSbscrbAt"
                                                        value="1">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </td>
                                        <th>상조가입</th>
                                        <td>
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="tab1MutaidSbscrbAt"
                                                        id="tab1MutaidSbscrbAt" value="1">
                                                    <i class="input-helper"></i>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <!--//detail_type01-->

                    <div>
                        <!-- 타이틀영역 -->
                        <div class="div_title">
                            <!-- 타이틀영역(좌측) -->
                            <div class="left ml5">
                                <span class="s_tit"><i class="axi axi-chevron-right"></i>폼 영역2</span>
                                <span class="table_sumnum ml5">0</span>
                            </div>
                            <!-- 타이틀영역(우측) -->
                            <div class="right mr5">
                                <select name="">
                                    <option value="">20개씩 보기</option>
                                    <option value="1">사원</option>
                                    <option value="0">비사원</option>
                                </select>
                                <div class="right ml7">
                                    <button class="div_title_btn" type="button">선택</button>
                                    <button class="div_title_btn" type="button">신규등록</button>
                                </div>
                            </div>
                        </div>
                        <!--// 타이틀영역 -->

                        <div class="mt5">
                            <div class="detail_type01">
                                <form id="saveFormEmp_Tab1" novalidate="novalidate">
                                    <table>
                                        <caption>직원</caption>
                                        <colgroup>
                                            <col width="150">
                                            <col width="*">
                                            <col width="150">
                                            <col width="*">
                                            <col width="150">
                                            <col width="*">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>내선전화번호</th>
                                                <td><input type="text" name="tab1lxtnTelno" id="tab1lxtnTelno"
                                                        maxlength="20" style="width: 90%" autocomplete="off"></td>
                                                <th>휴대폰번호</th>
                                                <td><input type="text" name="tab1Mbtlnum" id="tab1Mbtlnum"
                                                        maxlength="20" style="width: 90%" autocomplete="off"></td>
                                                <th>자택전화번호</th>
                                                <td><input type="text" name="tab1OwnhomTelno" id="tab1OwnhomTelno"
                                                        maxlength="20" style="width: 90%" autocomplete="off"></td>
                                            </tr>
                                            <tr>
                                                <th>이메일(사내)</th>
                                                <td><input type="text" name="tab1Email" id="tab1Email" maxlength="50"
                                                        style="width: 90%" autocomplete="off"></td>
                                                <th>이메일(개인)</th>
                                                <td><input type="text" name="tab1IndvdlEmail" id="tab1IndvdlEmail"
                                                        maxlength="50" style="width: 90%" autocomplete="off"></td>
                                                <th>결혼여부</th>
                                                <td>
                                                    <div id="divInputFormTab1MrrgAt" class="div_combo">
                                                        <select name="tab1MrrgAt" id="tab1MrrgAt">
                                                            <option value="">선택</option>
                                                            <option value="1">기혼</option>
                                                            <option value="0">미혼</option>
                                                        </select></div>&nbsp;<input type="text" name="tab1MrrgDe"
                                                        id="tab1MrrgDe" maxlength="10" class="input_calen"
                                                        onkeyup="gf_AutoDate(event, this)"
                                                        onkeypress="gf_AutoDate(event, this)" autocomplete="off">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>비상연락처</th>
                                                <td><input type="text" name="tab1EmgncTelno" id="tab1EmgncTelno"
                                                        maxlength="50" style="width: 90%" autocomplete="off"></td>
                                                <th>최종학력</th>
                                                <td>
                                                    <div id="divInputFormTab1LastAcdncrCode" class="div_combo">
                                                        <select name="tab1LastAcdncrCode" id="tab1LastAcdncrCode"
                                                            disabled="">
                                                            <option value="410">고등학교(재)</option>
                                                            <option value="420">고등학교(중퇴)</option>
                                                            <option value="400">고졸</option>
                                                            <option value="999">기타</option>
                                                            <option value="200">대졸</option>
                                                            <option value="210">대학(재)</option>
                                                            <option value="220">대학(중퇴)</option>
                                                            <option value="110">대학원(재)</option>
                                                            <option value="120">대학원(중퇴)</option>
                                                            <option value="100">대학원졸</option>
                                                            <option value="900">무학</option>
                                                            <option value="800">미취학</option>
                                                            <option value="700">유치원</option>
                                                            <option value="310">전문대(재)</option>
                                                            <option value="300">전문대졸</option>
                                                            <option value="320">전문재(중퇴)</option>
                                                            <option value="510">중학교(재)</option>
                                                            <option value="520">중학교(중퇴)</option>
                                                            <option value="500">중학교졸</option>
                                                            <option value="610">초등학교(재)</option>
                                                            <option value="620">초등학교(중퇴)</option>
                                                            <option value="600">초등학교졸</option>
                                                        </select></div>
                                                </td>
                                                <th>최종학교</th>
                                                <td><input type="text" name="tab1LastSchulNm" id="tab1LastSchulNm"
                                                        maxlength="50" style="width: 90%" autocomplete="off"
                                                        readonly="">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>최종승급일</th>
                                                <td><input type="text" name="tab1LastPromtDe" id="tab1LastPromtDe"
                                                        maxlength="10" class="input_calen"
                                                        onkeyup="gf_AutoDate(event, this)"
                                                        onkeypress="gf_AutoDate(event, this)" autocomplete="off"
                                                        readonly=""></td>
                                                <th>최종승호일</th>
                                                <td><input type="text" name="tab1LastSalclsupDe" id="tab1LastSalclsupDe"
                                                        maxlength="10" class="input_calen"
                                                        onkeyup="gf_AutoDate(event, this)"
                                                        onkeypress="gf_AutoDate(event, this)" autocomplete="off"
                                                        readonly=""></td>
                                                <th>휴직구분</th>
                                                <td>
                                                    <div id="divInputFormTab1LayoffSeCode" class="div_combo"><select
                                                            name="tab1LayoffSeCode" id="tab1LayoffSeCode" disabled="">
                                                            <option value="H05">기타</option>
                                                            <option value="H02">병가휴직(업무상질병)</option>
                                                            <option value="H01">병가휴직(일반)</option>
                                                            <option value="H04">육아휴직</option>
                                                            <option value="H03">육아휴직연장</option>
                                                        </select></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>현주소</th>
                                                <td colspan="5">
                                                    <input type="text" name="zip" id="zip" maxlength="5"
                                                        style="width: 80px" readonly="">
                                                    <button type="button" id="btnTab1AddrSearch" class="btn_common03">
                                                        <span class="glyphicon  glyphicon glyphicon-search">
                                                        </span>
                                                    </button>
                                                    <input type="text" name="ownhomAdres" id="ownhomAdres"
                                                        maxlength="50" style="width: 45%" autocomplete="off">
                                                    <input type="text" name="ownhomDetailAdres" id="ownhomDetailAdres"
                                                        maxlength="50" style="width: 25%" autocomplete="off">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>본적</th>
                                                <td colspan="5">
                                                    <input type="text" name="bornZip" id="bornZip" maxlength="5"
                                                        style="width: 80px" readonly="">
                                                    <button type="button" id="btnTab1BornAddrSearch"
                                                        class="btn_common03">
                                                        <span class="glyphicon  glyphicon glyphicon-search">
                                                        </span>
                                                    </button>
                                                    <input type="text" name="bornAdres" id="bornAdres" maxlength="50"
                                                        style="width: 45%" autocomplete="off">
                                                    <input type="text" name="bornDetailAdres" id="bornDetailAdres"
                                                        maxlength="50" style="width: 25%" autocomplete="off">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>급여지급</th>
                                                <td>
                                                    <div id="divInputFormTab1SalaryPymntAt" class="div_combo">
                                                        <select name="tab1SalaryPymntAt" id="tab1SalaryPymntAt">
                                                            <option value="1" selected="selected">지급
                                                            </option>
                                                            <option value="0">미지급</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <th>퇴직금중간정산일자</th>
                                                <td><input type="text" name="tab1RetireExcclcDe" id="tab1RetireExcclcDe"
                                                        maxlength="10" class="input_calen"
                                                        onkeyup="gf_AutoDate(event, this)"
                                                        onkeypress="gf_AutoDate(event, this)" autocomplete="off"
                                                        readonly=""></td>
                                                <th>출납업무</th>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input type="checkbox" name="tab1CashierAt"
                                                                id="tab1CashierAt" value="1">
                                                            <i class="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>퇴직연금</th>
                                                <td>
                                                    <div id="divInputFormTab1RetireAnntyKindCode" class="div_combo">
                                                        <select name="tab1RetireAnntyKindCode"
                                                            id="tab1RetireAnntyKindCode">
                                                            <option value="">선택</option>
                                                            <option value="2">IRP</option>
                                                            <option value="1">이연계좌</option>
                                                        </select></div>
                                                </td>
                                                <th>소득세율선택</th>
                                                <td>
                                                    <div id="divInputFormTab1IncmtaxrtCode" class="div_combo">
                                                        <select name="tab1IncmtaxrtCode" id="tab1IncmtaxrtCode">
                                                            <option value="">선택</option>
                                                            <option value="02">100%</option>
                                                            <option value="03">120%</option>
                                                            <option value="01">80%</option>
                                                        </select></div>
                                                </td>
                                                <th>급여보수체계</th>
                                                <td>
                                                    <div id="divInputFormTab1SalaryAprpCode" class="div_combo">
                                                        <select name="tab1SalaryAprpCode" id="tab1SalaryAprpCode">
                                                            <option value="">선택</option>
                                                            <option value="300">연봉</option>
                                                            <option value="100">책정임금</option>
                                                            <option value="200">호봉</option>
                                                        </select></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>육아단축근무여부</th>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input type="checkbox" name="tab1BabyShrtenWorkAt"
                                                                id="tab1BabyShrtenWorkAt" value="1">
                                                            <i class="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </td>
                                                <th>노조가입</th>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input type="checkbox" name="tab1LbunSbscrbAt"
                                                                id="tab1LbunSbscrbAt" value="1">
                                                            <i class="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </td>
                                                <th>상조가입</th>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input type="checkbox" name="tab1MutaidSbscrbAt"
                                                                id="tab1MutaidSbscrbAt" value="1">
                                                            <i class="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <!--//detail_type01-->
                        </div>
                    </div>
                </div>
            </div><!-- //오른쪽 영역 item end -->
            <!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item3으로 변경후 사용
            <div class="item3">
            </div>
             -->
        </div><!-- //flex end -->
        
        <!-- 2줄일때 추가하여 동일한 방법으로 사용
        <div class="flex"> 
            <div class="item5">  (flex div 밑에 item3,item4,item5,item6(왼쪽영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로)
                            왼쪽
            </div>
            <div class="item5">
                            오른쪽
            </div>            
        </div>
         -->
         
    </div><!-- //wrapper_con end -->




    <script>
        var gv_ContextPath = "/xerp";
        var dhxGridHeaderInfo = [];
        dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('No', '40', 'center', 'str', 'cntr', false, 'num', '', ''));
        dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllEtsfmg000" />', '40', 'center', 'na', 'ch', false, 'selYn', '', ''));
        dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('문서분류', '100', 'center', 'str', 'ro', false, 'docClsCode', '', ''));
        dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('양식명', '*', 'left', 'str', 'ro', false, 'raisnm', '', '')); /* gf_LocaleTrans('default', 'titRaisnm') */

        var dhxGrid = gf_MakeDhxGrid('gridA', dhxGridHeaderInfo, true, false, false);
        dhxGrid.enableAutoWidth(true);

        var data = [

            { selYn: '0', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '0', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '0', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '0', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '0', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '0', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '0', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '0', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' },
            { selYn: '1', docClsCode: '공통', raisnm: '문서들.....' }

        ];

        dhxGrid.parse(data, 'js');

    </script>

    
    <!-- 비선택 근로근무자 관리
   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddMhshrb000"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemoveMhshrb000"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSaveMhshrb000"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelMhshrb000"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormMhshrb000">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">거래처코드<!-- <taglibs:transText progrmId="default" key="titBcncCode"/> -><input name="bcncCode" id="bcncCodeSearchFormMhshrb000"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchMhshrb000"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetMhshrb000"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 ->
                <!-- 타이틀영역 ->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> ->
                        <span class="table_sumnum" id="spanCntSearchFormMhshrb000">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 -> 
                        <div class="dhtml_grid" id="dataListMhshrb000" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 ->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingMhshrb000">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end ->

            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 ->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    ->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormMhshrb000">
                            <table>
                                <caption>인사탭<!-- <taglibs:transText progrmId="default" key="titMhshrb000"/> -></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th class="essential_icon">거래처코드<!-- <taglibs:transText progrmId="default" key="titBcncCode"/> -></th>
                                    <td><input required="true" type="text" name="bcncCode" id="bcncCodeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>사업자등록번호<!-- <taglibs:transText progrmId="default" key="titBizrno"/> -></th>
                                    <td><input type="text" name="bizrno" id="bizrnoSaveFormMhshrb000" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>사업장구분코드 기본 자리수는 4자리<!-- <taglibs:transText progrmId="default" key="titBplcCode"/> -></th>
                                    <td><input type="text" name="bplcCode" id="bplcCodeSaveFormMhshrb000" maxlength="4" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처명<!-- <taglibs:transText progrmId="default" key="titBcncNm"/> -></th>
                                    <td><input type="text" name="bcncNm" id="bcncNmSaveFormMhshrb000" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>대표자명<!-- <taglibs:transText progrmId="default" key="titReprsntNm"/> -></th>
                                    <td><input type="text" name="reprsntNm" id="reprsntNmSaveFormMhshrb000" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>업종(종목)<!-- <taglibs:transText progrmId="default" key="titInduty"/> -></th>
                                    <td><input type="text" name="induty" id="indutySaveFormMhshrb000" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>업태<!-- <taglibs:transText progrmId="default" key="titBizcnd"/> -></th>
                                    <td><input type="text" name="bizcnd" id="bizcndSaveFormMhshrb000" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처 구분(C004)<!-- <taglibs:transText progrmId="default" key="titBcncSe"/> -></th>
                                    <td><input type="text" name="bcncSe" id="bcncSeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>법인구분 (법인/개인 )C005<!-- <taglibs:transText progrmId="default" key="titCprSe"/> -></th>
                                    <td><input type="text" name="cprSe" id="cprSeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>국적코드<!-- <taglibs:transText progrmId="default" key="titNltyCode"/> -></th>
                                    <td><input type="text" name="nltyCode" id="nltyCodeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처규모<!-- <taglibs:transText progrmId="default" key="titBcncscaleSe"/> -></th>
                                    <td><input type="text" name="bcncscaleSe" id="bcncscaleSeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>과세유형[과세||면세||영세]  C009<!-- <taglibs:transText progrmId="default" key="titTaxtSe"/> -></th>
                                    <td><input type="text" name="taxtSe" id="taxtSeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>표준통화코드<!-- <taglibs:transText progrmId="default" key="titCrncyCode"/> -></th>
                                    <td><input type="text" name="crncyCode" id="crncyCodeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>은행코드(C010)<!-- <taglibs:transText progrmId="default" key="titBankCode"/> -></th>
                                    <td><input type="text" name="bankCode" id="bankCodeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>지역코드<!-- <taglibs:transText progrmId="default" key="titAreaCode"/> -></th>
                                    <td><input type="text" name="areaCode" id="areaCodeSaveFormMhshrb000" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>지역코드를 나타내는 항목.<!-- <taglibs:transText progrmId="default" key="titAreaNm"/> -></th>
                                    <td><input type="text" name="areaNm" id="areaNmSaveFormMhshrb000" maxlength="30" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>우편번호<!-- <taglibs:transText progrmId="default" key="titPostCode"/> -></th>
                                    <td><input type="text" name="postCode" id="postCodeSaveFormMhshrb000" maxlength="6" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처의 법인등록시 기재된 주소를 나타내는 항목<!-- <taglibs:transText progrmId="default" key="titAdres"/> -></th>
                                    <td><input type="text" name="adres" id="adresSaveFormMhshrb000" maxlength="100" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>기본주소<!-- <taglibs:transText progrmId="default" key="titAddr2"/> -></th>
                                    <td><input type="text" name="addr2" id="addr2SaveFormMhshrb000" maxlength="100" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처의 대표전화 번호를 나타내는 항목<!-- <taglibs:transText progrmId="default" key="titTelno"/> -></th>
                                    <td><input type="text" name="telno" id="telnoSaveFormMhshrb000" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처의 팩스번호를 나타내는 항목<!-- <taglibs:transText progrmId="default" key="titFaxNo"/> -></th>
                                    <td><input type="text" name="faxNo" id="faxNoSaveFormMhshrb000" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>계좌번호<!-- <taglibs:transText progrmId="default" key="titAcnutNo"/> -></th>
                                    <td><input type="text" name="acnutNo" id="acnutNoSaveFormMhshrb000" maxlength="300" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>예금주명<!-- <taglibs:transText progrmId="default" key="titDpstrNm"/> -></th>
                                    <td><input type="text" name="dpstrNm" id="dpstrNmSaveFormMhshrb000" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>HomePage<!-- <taglibs:transText progrmId="default" key="titHomepage"/> -></th>
                                    <td><input type="text" name="homepage" id="homepageSaveFormMhshrb000" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>매입여부<!-- <taglibs:transText progrmId="default" key="titPurchsAt"/> -></th>
                                    <td><input type="text" name="purchsAt" id="purchsAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>매출여부<!-- <taglibs:transText progrmId="default" key="titSaleofficAt"/> -></th>
                                    <td><input type="text" name="saleofficAt" id="saleofficAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처정보에 대해 기입하는 항목.<!-- <taglibs:transText progrmId="default" key="titBcncCn"/> -></th>
                                    <td><input type="text" name="bcncCn" id="bcncCnSaveFormMhshrb000" maxlength="2000" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처 설립일자 기입하는 항목.<!-- <taglibs:transText progrmId="default" key="titFondDe"/> -></th>
                                    <td><input type="text" name="fondDe" id="fondDeSaveFormMhshrb000" maxlength="8" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처 자본금 기입하는 항목.<!-- <taglibs:transText progrmId="default" key="titCapitalAmt"/> -></th>
                                    <td><input type="text" name="capitalAmt" id="capitalAmtSaveFormMhshrb000" maxlength="22" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처 년매출액 기입하는 항목.<!-- <taglibs:transText progrmId="default" key="titYySaleAmt"/> -></th>
                                    <td><input type="text" name="yySaleAmt" id="yySaleAmtSaveFormMhshrb000" maxlength="22" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>거래처 직원수 기입하는 항목.<!-- <taglibs:transText progrmId="default" key="titEmplCo"/> -></th>
                                    <td><input type="text" name="emplCo" id="emplCoSaveFormMhshrb000" maxlength="22" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>무역업등록번호<!-- <taglibs:transText progrmId="default" key="titTradeNo"/> -></th>
                                    <td><input type="text" name="tradeNo" id="tradeNoSaveFormMhshrb000" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>사용여부<!-- <taglibs:transText progrmId="default" key="titUseAt"/> -></th>
                                    <td><input type="text" name="useAt" id="useAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>첨부파일번호<!-- <taglibs:transText progrmId="default" key="titAtchmnflNo"/> -></th>
                                    <td><input type="text" name="atchmnflNo" id="atchmnflNoSaveFormMhshrb000" maxlength="1000" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>담당자명<!-- <taglibs:transText progrmId="default" key="titChargerNm"/> -></th>
                                    <td><input type="text" name="chargerNm" id="chargerNmSaveFormMhshrb000" maxlength="30" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>담당자이메일<!-- <taglibs:transText progrmId="default" key="titChargerEmail"/> -></th>
                                    <td><input type="text" name="chargerEmail" id="chargerEmailSaveFormMhshrb000" maxlength="50" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>담당자 전화번호<!-- <taglibs:transText progrmId="default" key="titChargerTelno"/> -></th>
                                    <td><input type="text" name="chargerTelno" id="chargerTelnoSaveFormMhshrb000" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>담당자부서<!-- <taglibs:transText progrmId="default" key="titChargerDept"/> -></th>
                                    <td><input type="text" name="chargerDept" id="chargerDeptSaveFormMhshrb000" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>담당자 직위<!-- <taglibs:transText progrmId="default" key="titChargerOfcps"/> -></th>
                                    <td><input type="text" name="chargerOfcps" id="chargerOfcpsSaveFormMhshrb000" maxlength="20" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>중소기업우선구매대상 여부<!-- <taglibs:transText progrmId="default" key="titPriorPurchsAt"/> -></th>
                                    <td><input type="text" name="priorPurchsAt" id="priorPurchsAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>장애인기업여부<!-- <taglibs:transText progrmId="default" key="titDsrprAt"/> -></th>
                                    <td><input type="text" name="dsrprAt" id="dsrprAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>여성대표기업여부<!-- <taglibs:transText progrmId="default" key="titWomanAt"/> -></th>
                                    <td><input type="text" name="womanAt" id="womanAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>외자기업구분<!-- <taglibs:transText progrmId="default" key="titForeignAt"/> -></th>
                                    <td><input type="text" name="foreignAt" id="foreignAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>중증장애인기업구분<!-- <taglibs:transText progrmId="default" key="titSerhandicapAt"/> -></th>
                                    <td><input type="text" name="serhandicapAt" id="serhandicapAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>사회적기업구분<!-- <taglibs:transText progrmId="default" key="titSocialentrprsAt"/> -></th>
                                    <td><input type="text" name="socialentrprsAt" id="socialentrprsAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>장애인표준사업장<!-- <taglibs:transText progrmId="default" key="titDspsnStdAt"/> -></th>
                                    <td><input type="text" name="dspsnStdAt" id="dspsnStdAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>녹색제품<!-- <taglibs:transText progrmId="default" key="titGreenAt"/> -></th>
                                    <td><input type="text" name="greenAt" id="greenAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>기술개발제품<!-- <taglibs:transText progrmId="default" key="titTechnologyAt"/> -></th>
                                    <td><input type="text" name="technologyAt" id="technologyAtSaveFormMhshrb000" maxlength="1" style="width: 50%"/></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
 -->
 
</body>
