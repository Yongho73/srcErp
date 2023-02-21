<!-- 
 *    프로그램       : 아웃소싱 인력현황 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.06.24
 *    사용테이블      : PJT_OUTSRC_HR
 * sourceGen version : 2021.02.18.01 (2021.06.24)
 -->

<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/osc/pjtosc001/pjtosc001.js"></script>

   <div class="wrapper_con">
        <div class="path_div">
            <div class="path" id="menu_path">
            </div>
            <div class="pathbt_div">
                <ul class="pathbt_list">
                    <li><a href="#none" id="btnAddPjtosc001"><i class="axi axi-note-add mr5"></i><span>신규</span></a></li>
                    <li><a href="#none" id="btnRemovePjtosc001"><i class="axi axi-ion-android-trash mr5"></i><span>삭제</span></a></li>
                    <li><a href="#none" id="btnSavePjtosc001"><i class="axi axi-save mr5"></i><span>저장</span></a></li>
                    <li><a href="#none" id="btnExcelPjtosc001"><i class="axi axi-file-excel-o mr5"></i><span>엑셀</span></a></li>
                </ul>
            </div>
        </div>
        <div class="consearch_div">
            <div class="consearch_input">
                <form id="searchFormPjtosc001">
                    <input type="hidden" name="sortDirection"/>
                    <input type="hidden" name="sortColumId"/>
                    <input type="hidden" name="selectedPageNum"/>
                    <ul class="consearchinput_list">
                        <li><span class="span">아웃소싱 사원번호<!-- <taglibs:transText progrmId="default" key="titOutsrcEmpno"/> --></span><input name="outsrcEmpno" id="outsrcEmpnoSearchFormPjtosc001"></li>
                    </ul>
                </form>
            </div>
            <div class="consearchbt_div">
                <ul class="consearchbt_list">
                    <li><a href="#none" id="btnSearchPjtosc001"><span class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
                    <li><a href="#none" id="btnResetPjtosc001"><span class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
                </ul>
            </div>
        </div>
        <div class="flex">
            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <!-- 타이틀영역 -->
                <div class="div_title">
                    <div class="left"> <!-- 타이틀영역(좌측) //-->
                        <!-- <span class="s_tit"><i class="axi axi-chevron-right"></i>그리드 타이틀 영역</span> -->
                        <span class="table_sumnum" id="spanCntSearchFormPjtosc001">0</span>
                    </div>
                    <div class="right"><!-- 타이틀영역(우측) //-->
                    </div>
                </div>
                <div class="mt5 outer_line_grid">
                    <div class="dhtml_line"> <!-- 페이징이 있을 경우 dhtml_line_paging 사용 --> 
                        <div class="dhtml_grid" id="dataListPjtosc001" style="height:calc(100vh - 120px);"> <!-- 그리드 영역 -->
                        </div>
                    </div>
                    <!-- 페이징 부분 여기에 추가 
                    <div class="ac paging" id="divPagingPjtosc001">
                    </div> -->
                </div>
            </div><!-- //왼쪽 영역 item4 end -->

            <div class="item4">
                <!-- flex div 밑에 item3,item4,item5,item6(**왼쪽**영역%기준) 변경해서 사용가능, 좌/우측 같은이름으로 -->
                <div class="div_title">
                    <!-- 
                    <div class="left"></div>
                    <div class="right"></div>
                    -->
                </div>
                <div class="mt5 outer_line_form" style="min-height:calc(100vh - 120px);">
                    <div class="detail_type01">
                        <form id="saveFormPjtosc001">
                            <table>
                                <caption>아웃소싱 인력현황<!-- <taglibs:transText progrmId="default" key="titPjtosc001"/> --></caption>
                                <colgroup>
                                    <col width="100">
                                    <col width="">
                                </colgroup>
								<tr>
									<th>이름</th>
									<td><input type="text" name="nm" id="nmSaveFormPjtosc001" maxlength="10"/></td>
									<th>소속</th>
									<td>
										<div id="deftCodeSaveFormPjtosc001" class = "div_combo"></div>
									</td>
									<th>연령</th>
									<td><input type="text" name="age" id="ageSaveFormPjtosc001" maxlength="10"/></td>
									<th>계약시작일자</th>
									<td><input type="text" name="cntrctBgnde" id="cntrctBgndeSaveFormPjtosc001" maxlength="10"/></td>
								</tr>
								<tr>
									<th>직종</th>
									<td>
										<div id="jssfcCodeSaveFormPjtosc001" class = "div_combo"></div>
									</td>
									<th>투입가능</th>
									<td>
										<div id="inptPosblAtCodeSaveFormPjtosc001" class = "div_combo"></div>
									</td>
									<th>경력</th>
									<td><input type="text" name="careerYcnt" id="careerYcntFormPjtosc001" maxlength="10"/></td>
									<th>계약종료일자</th>
									<td><input type="text" name="cntrctEndde" id="cntrctEnddeSaveFormPjtosc001" maxlength="10"/></td>
								</tr>
								<tr>
									<th>금액</th>
									<td><input type="text" name="cntrctAmt" id="cntrctAmtSaveFormPjtosc001" maxlength="10"/></td>
									<th>전문기술</th>
									<td>
										<div id="tchnlgyGradCodeSaveFormPjtosc001" class = "div_combo"></div>
									</td>
									<th>자격증</th>
									<td>
										<!-- <select name="crqfsSe" id="crqfsSe"> -->
											<div id="crqfsAtSaveFormPjtosc001" class = "div_combo"></div>
											<!-- option value="0" name="option5_1" id="option5_1" selected>여</option>
											<option value="1" name="option5_2" id="option5_2">국가전문</option>
											<option value="2" name="option5_3" id="option5_3">국가기술</option>
											<option value="3" name="option5_4" id="option5_4">국가공인</option>
											<option value="4" name="option5_5" id="option5_5">민간자격</option> -->
										<!-- </select> -->
									</td>
									<th>역할</th>
									<td>
										<div id="roleCodeSaveFormPjtosc001" class = "div_combo"></div>
									</td>
								</tr>
								<tr>
									<th>성별</th>
									<td>
										남<input type="radio" name="radio1" value="1" id="radio1"/> <label for="radio1"><span></span></label>
										여<input type="radio" name="radio1" value="2" id="radio2"/> <label for="radio2"><span></span></label>
									</td>
									<th>최종학력</th>
									<td>
										<div id="lastAcdmcrCodeSaveFormPjtosc001" class = "div_combo"></div>
									</td>
									<th>선호지역</th>
									<td>
										<div id="hopeAreaCodeSaveFormPjtosc001" class = "div_combo"></div>
									</td>
									<th>평판</th>
									<td>
										상<input type="radio" name="radio2" value="1" id="radio4"/> <label for="radio4"><span></span></label>
										중<input type="radio" name="radio2" value="2" id="radio5"/> <label for="radio5"><span></span></label>
										하<input type="radio" name="radio2" value="3" id="radio6"/> <label for="radio6"><span></span></label>
									</td>
								</tr>
								<tr>
									<th>연락처</th>
									<td colspan="3"><input type="text" name="email" id="emailSaveFormPjtosc001" maxlength="10" placeholder="abc@abc.com"/></td>
									<th>연락처</th>
									<td colspan="3">집 <input type="text" name="telno" id="telnoSaveFormPjtosc001" maxlength="10"/> 핸드폰 <input type="text" name="hpNo" id="hpNoSaveFormPjtosc001" maxlength="10"/></td>
								</tr>
								<tr>
									<th>주소</th>
									<td colspan="7"><input type="text" name="adres" id="adresSaveFormPjtosc001" maxlength="10"/><br><br><input type="text" name="detailAdres" id="detailAdresSaveFormPjtosc001" maxlength="10"/></td>
								</tr>
								<tr>
									<th>비고</th>
									<td colspan="7"><input name="rm" id="rmSaveFormPjtosc001"></input></td>
								</tr>
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
