<!-- 
 *    프로그램       : 시스템환경관리 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.30
 *    사용테이블      : STM_ENV_SETTING
 * sourceGen version : 2020.07.16.01 (2020.07.30)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/stm/sys/stmsys001/stmsys001.js"></script>

   <div class="wrapper_con" >
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnSaveStmsys001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item">
                <div class="mt5 outer_line_form" style="height:calc(100vh - 69px) !important;">
                    <div class="detail_type01">
                        <form id="saveFormStmsys001">
                            <table>
                                <caption>시스템환경관리<!-- <taglibs:transText progrmId="default" key="titStmsys001"/> --></caption>
                                <colgroup>
                                    <col width="200">
                                    <col width="">
                                </colgroup>
                                <tr>
                                    <th>모듈 사용 항목<!-- <taglibs:transText progrmId="default" key="titModuleUseItem"/> --></th>
                                    <td><div id="divModuleUseItem"></div></td>
                                </tr>
                                <tr>
                                    <th>페이징 단위<!-- <taglibs:transText progrmId="default" key="titPgngUnit"/> --></th>
                                    <td><div id="divpgngUnit"></div></td>
                                </tr>
                                <tr>
                                    <th>주민번호 마스킹 방법<!-- <taglibs:transText progrmId="default" key="titMaskMthCode"/> --></th>
                                    <td><div id="divmaskMthCode"></div></td>
                                </tr>
                                <tr>
                                    <th>사원번호 생성방법<!-- <taglibs:transText progrmId="default" key="titEmpnoEntMth"/> --></th>
                                    <td><div id="divempnoEntMth"></div></td>
                                </tr>
                                <tr>
                                    <th>언어 설정<!-- <taglibs:transText progrmId="default" key="titLangSeCode"/> --></th>
                                    <td><div id="divlangSeCode"></div></td>
                                </tr>
                                <tr>
                                    <th>검색 기간 설정<!-- <taglibs:transText progrmId="default" key="titSearchPdSettingCode"/> --></th>
                                    <td><div id="divsearchPdSettingCode"></div></td>
                                </tr>
                                <tr>
                                    <th>다중 로그인 허용 여부<!-- <taglibs:transText progrmId="default" key="titMultiLoginPermAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="multiLoginPermAt" id="multiLoginPermAt" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>  
                                    </td>
                                </tr>
                                <tr>
                                    <th>소수점 처리 방법<!-- <taglibs:transText progrmId="default" key="titDcmlpointProcessMth"/> --></th>
                                    <td><div id="divdcmlpointProcessMth"></div></td>
                                </tr>
                                <tr>
                                    <th>비밀번호 설정 방법<!-- <taglibs:transText progrmId="default" key="titPasswordSettingMth"/> --></th>
                                    <td><div id="divpasswordSettingMth"></div></td>
                                </tr>
                                <tr>
                                    <th>비밀번호 변경 주기<!-- <taglibs:transText progrmId="default" key="titPasswordChangeCycle"/> --></th>
                                    <td><div id="divpasswordChangeCycle"></div></td>
                                </tr>
                                <tr>
                                    <th>비밀번호 다음변경 허용 여부<!-- <taglibs:transText progrmId="default" key="titNextChangeAt"/> --></th>
                                    <td>
                                        <div class="checkbox">
                                            <label> 
                                                <input type="checkbox" name="nextChangeAt" id="nextChangeAt" value="1">
                                                <i class="input-helper"></i>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>개인정보인증 방법<!-- <taglibs:transText progrmId="default" key="titSelfAuthMth"/> --></th>
                                    <td><div id="divselfAuthMth"></div></td>
                                </tr>
                               <!--  <tr>
                                    <th>제품사용항목</th>
                                    <td><input type="text" name="prductUseItem" id="prductUseItemSaveFormStmsys001" maxlength="200" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>화면 스킨 구분 코드</th>
                                    <td><input type="text" name="sknSeCode" id="sknSeCodeSaveFormStmsys001" maxlength="10" style="width: 50%"/></td>
                                </tr>
                                <tr>
                                    <th>급여소수점처리방법C032</th>
                                    <td><input type="text" name="salaryDcmlpointProcessMth" id="salaryDcmlpointProcessMthSaveFormStmsys001" maxlength="10" style="width: 50%"/></td>
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
