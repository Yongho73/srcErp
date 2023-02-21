<!-- 
 *    프로그램       : 개인정보조회 관리 화면 jsp
 *    작성자        : 디비비전
 *    작성일자       : 2021.05.28
 *    사용테이블      : MHS_EMP
 * sourceGen version : 2021.02.18.01 (2021.05.28)
 -->

<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script
		src="${pageContext.request.contextPath}/js/xerp/pub/usr/pubusr001/pubusr001.js"></script>

	<div class="wrapper_con">
		<div class="path_div">
			<div class="path" id="menu_path"></div>
		</div>
		<div class="consearch_div">
			<div class="consearch_input">
				<form id="searchFormPubusr001">
					<input type="hidden" name="sortDirection" /> <input type="hidden"
						name="sortColumId" /> <input type="hidden" name="selectedPageNum" />
					<ul class="consearchinput_list">
						<li><span class="span">사원</span> <input type="text"
							name="searchEmpNo" id="searchEmpCodePubusr001" class="w50"
							readOnly disabled /> <input type="text" name="searchEmpCodeNm"
							id="searchEmpNmPubusr001" class="w90" readOnly disabled /></li>
					</ul>
				</form>
			</div>
			<div class="consearchbt_div">
				<ul class="consearchbt_list">
					<li><a href="#none" id="btnSearchPubusr001"><span
							class="glyphicon glyphicon-search mr5"></span><span>조회</span></a></li>
					<li><a href="#none" id="btnResetPubusr001"><span
							class="glyphicon glyphicon-refresh mr5"></span><span>초기화</span></a></li>
				</ul>
			</div>
		</div>
		<div class="flex">
			<div class="item">
				<div class="mt5 outer_line_form"
					style="height: calc(100vh - 91px) !important">

					<div class="detail_type01" style="min-height: 25vh;">
						<form id="detailTopForm">
							<div id="saveTopForm">
								<table>
									<colgroup>
										<col width="150">
										<col width="120">
										<col width="*">
										<col width="120">
										<col width="*">
										<col width="120">
										<col width="*">
									</colgroup>

									<tr>
										<td rowspan=6>
											<table
												style="text-align: center; padding: 0; margin: 0; border: 0;">
												<tr
													style="text-align: center; padding: 0; margin: 0; border: 0;">
													<td id="empPhoto" name="empPhoto"
														style="width: 150px; height: 120px; display: block; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; background-image: url(/xerp/img/common/myphoto_default.png); background-repeat: no-repeat; background-position: center; vertical-align: middle; align: center; border: 0; text-align: center;"></td>
													<input type="hidden" name="photoAtchmnflNo"
														id="photoAtchmnflNo" />
												</tr>
											</table>
										</td>
										<th><taglibs:transText
												progrmId="default" key="titEmpno" /></th>
										<td><input type="text" name="empno" id="empno"
											maxlength="15" style="width: 120px;" readOnly disabled /></td>
										<th><taglibs:transText
												progrmId="default" key="titEmpNm" /></th>
										<td><input type="text" name="korNm" id="korNm"
											maxlength="20" style="width: 120px;" readOnly disabled /></td>
										<th>
											<!--<taglibs:transText progrmId="default" key="titEngNm" />/<taglibs:transText progrmId="default" key="titChcrtNm" />-->영문/한자명
										</th>
										<td><input type="text" name="engNm" id="engNm"
											maxlength="20" style="width: 120px;" readOnly disabled />&nbsp;<input
											type="text" name="chcrtNm" id="chcrtNm" maxlength="20"
											style="width: 120px;" readOnly disabled /></td>
									</tr>
									<tr>
										<th><taglibs:transText
												progrmId="default" key="titIhidnum" /></th>
										<td><input required type="text" name="ihidnum"
											id="ihidnum" maxlength="20" style="width: 120px;" readOnly
											disabled />&nbsp;<input type="text" name="sexdstnSe"
											id="sexdstnSe" readOnly disabled /></td>
										<th><taglibs:transText progrmId="default" key="titBrthdy" /></th>
										<td><input type="text" name="brthdy" id="brthdy" style="width: 120px;"  readOnly
											disabled />&nbsp<input type="text" name="slrcldAt" id="slrcldAt"
											readOnly disabled /></td>
										<th>
											<!--<taglibs:transText progrmId="default" key="titHffsSe" />-->재직구분
										</th>
										<td><input type="text" name="hffsSe" id="hffsSe" readOnly
											disabled /></td>
									</tr>
									<tr>
										<th><taglibs:transText progrmId="default" key="titEmplSe" /></th>
										<td><input type="text" name="emplSe" id="emplSe" readOnly
											disabled /></td>
										<th><taglibs:transText progrmId="default"
												key="titDutyCode" /></th>
										<td><input type="text" name="dtyCode" id="dtyCode"
											readOnly disabled /></td>
										<th><taglibs:transText progrmId="default"
												key="titOfcpsNm" /></th>
										<td><input type="text" name="ofcpsCode" id="ofcpsCode"
											readOnly disabled /></td>
									</tr>
									<tr>
										<th><taglibs:transText progrmId="default" key="titClsfNm" />/<taglibs:transText
												progrmId="default" key="titSrclsCode" /></th>
										<td><input type="text" name="clsfCode" id="clsfCode"
											readOnly disabled /> &nbsp;<input type="text"
											name="srclsCode" id="srclsCode" readOnly disabled /></td>
										<th><taglibs:transText progrmId="default"
												key="titJssfcCode" /></th>
										<td><input type="text" name="jssfcCode" id="jssfcCode"
											readOnly disabled /></td>
										<th><taglibs:transText progrmId="default"
												key="titPositionCode" /></th>
										<td><input type="text" name="rspofcCode" id="rspofcCode"
											readOnly disabled /></td>
									</tr>
									<tr>
										<th><taglibs:transText progrmId="default" key="titDeptNm" /></th>
										<td><input type="text" name="deptCodeNm" id="deptCodeNm"
											maxlength="20" style="width: 70%" readOnly disabled /> <input
											type="hidden" name="deptCode" id="deptCode" /></td>
										<%-- <th><taglibs:transText progrmId="default" key="titUpperDeptCode" /></th>
                                   <td><input type="text" name="upperDeptCodeNm" id="upperDeptCodeNm" maxlength="15" style="width: 100px;" readOnly/>
                                        <input type="hidden" name="upperDeptCode" id="upperDeptCode" />
                                   </td> --%>
										<th>현직급 임용일</th>
										<td><input type="text" name="curClsfEmplmnday"
											id="curClsfEmplmnday" maxlength="10" readOnly disabled>
										</td>
										<th><taglibs:transText
												progrmId="default" key="titEcnyDe" /></th>
										<td><input required type="text" name="ecnyDe" id="ecnyDe"
											maxlength="10" readOnly disabled></td>
									</tr>
									<tr>
										<th>겸직부서<taglibs:transText progrmId="default" key="겸직부서" /></th>
										<td><input type="text" name="hdadptDeptCodeNm"
											id="hdadptDeptCodeNm" maxlength="20" style="width: 70%"
											readOnly disabled /> <input type="hidden"
											name="hdadptDeptCode" id="hdadptDeptCode" /></td>
										<th>파견부서<taglibs:transText progrmId="default" key="파견부서" /></th>
										<td><input type="text" name="dispDeptCodeNm"
											id="dispDeptCodeNm" maxlength="15" style="width: 70%;"
											readOnly disabled /> <input type="hidden" name="dispDeptCode"
											id="dispDeptCode" /></td>
										<th>퇴직일자/사유<taglibs:transText progrmId="default"
												key="퇴사일자" /></th>
										<td><input type="text" name="retireDe" id="retireDe"
											maxlength="10" readOnly disabled/>&nbsp<input type="text"
											name="retireSe" id="retireSe" readOnly disabled/></td>
									</tr>
								</table>
							</div>
						</form>
					</div>
					<!--//detail_type01-->
					<div class="outer_form" style="height: 60vh">


						<div id="tabbarObj"
							class="mt5 outer_line_grid dhxtabbar_base_material list_top02"
							style="height: 596px !important; border: 0;">
							<div class="dhxtabbar_cont"
								style="left: 0px; width: 1146px; top: 0px; height: 596px;">
								<div class="dhttabbar_tabs_top">
									<div id="tab1" name="기본">
										<!-- //TAB1 기본 -->
										<div class="list_top"></div>
										<div class="list_type02">
											<form id="saveFormEmp_Tab1">
												<table>
													<caption>
														<taglibs:transText progrmId="default" key="titMhsEmp" />
													</caption>
													<colgroup>
														<col width="150">
														<col width="*">
														<col width="150">
														<col width="*">
														<col width="150">
														<col width="*">
													</colgroup>
													<tr>
														<th><taglibs:transText progrmId="default"
																key="내선전화번호" />내선전화번호</th>
														<td><input type="text" name="tab1lxtnTelno"
															id="tab1lxtnTelno" maxlength="20" style="width: 90%"
															readOnly disabled /></td>
														<th><taglibs:transText progrmId="default"
																key="titMbtlnum" /></th>
														<td><input type="text" name="tab1Mbtlnum"
															id="tab1Mbtlnum" maxlength="20" style="width: 90%"
															readOnly disabled /></td>
														<th><taglibs:transText progrmId="default"
																key="자택전화번호" />자택전화번호</th>
														<td><input type="text" name="tab1OwnhomTelno"
															id="tab1OwnhomTelno" maxlength="20" style="width: 90%"
															readOnly disabled /></td>
													</tr>
													<tr>
														<th><taglibs:transText progrmId="default"
																key="이메일(사내)" />이메일(사내)</th>
														<td><input type="text" name="tab1Email"
															id="tab1Email" maxlength="50" style="width: 90%" readOnly
															disabled /></td>
														<th><taglibs:transText progrmId="default"
																key="이메일(개인)" />이메일(개인)</th>
														<td><input type="text" name="tab1IndvdlEmail"
															id="tab1IndvdlEmail" maxlength="50" style="width: 90%"
															readOnly disabled /></td>
														<th><taglibs:transText progrmId="default" key="결혼여부" />결혼여부</th>
														<td><input type="text" name="mrrgAt" id="mrrgAt"
															readOnly disabled />&nbsp;<input type="text"
															name="mrrgDe" id="mrrgDe" maxlength="10" readOnly
															disabled></td>
													</tr>
													<tr>
														<th><taglibs:transText progrmId="default" key="비상연락처" />비상연락처</th>
														<td><input type="text" name="tab1EmgncTelno"
															id="tab1EmgncTelno" maxlength="50" style="width: 90%"
															readOnly disabled /></td>
														<th><taglibs:transText progrmId="default" key="최종학력" />최종학력</th>
														<td><input type="text"
															id="divInputFormTab1LastAcdncrCode" readOnly disabled /></td>
														<th><taglibs:transText progrmId="default" key="최종학교" />최종학교</th>
														<td><input type="text" name="tab1LastSchulNm"
															id="tab1LastSchulNm" maxlength="50" style="width: 90%"
															autocomplete="off" readOnly disabled /></td>
													</tr>
													<tr>
														<th><taglibs:transText progrmId="default" key="최종승급일" />최종승급일</th>
														<td><input type="text" name="tab1LastPromtDe"
															id="tab1LastPromtDe" maxlength="10" readOnly disabled></td>
														<th><taglibs:transText progrmId="default" key="최종승호일" />최종승호일</th>
														<td><input type="text" name="tab1LastSalclsupDe"
															id="tab1LastSalclsupDe" maxlength="10" readOnly disabled></td>
														<th><taglibs:transText progrmId="default" key="휴직구분" />휴직구분</th>
														<td><input type="text"
															id="divInputFormTab1LayoffSeCode" readonly /></td>
													</tr>
													<tr>
														<th><taglibs:transText progrmId="default" key="현주소" />현주소</th>
														<td colspan=5><input type="text" name="zip" id="zip"
															maxlength="5" style="width: 80px" readonly disabled /> <input
															type="text" name="ownhomAdres" id="ownhomAdres"
															maxlength="50" style="width: 55%" readOnly disabled /> <input
															type="text" name="ownhomDetailAdres"
															id="ownhomDetailAdres" maxlength="50" style="width: 25%"
															readOnly disabled /></td>
													</tr>
													<tr>
														<th><taglibs:transText progrmId="default"
																key="titOrginAdr" /></th>
														<td colspan=5><input type="text" name="bornZip"
															id="bornZip" maxlength="5" style="width: 80px" readonly
															disabled /> <input type="text" name="bornAdres"
															id="bornAdres" maxlength="50" style="width: 55%" readOnly
															disabled /> <input type="text" name="bornDetailAdres"
															id="bornDetailAdres" maxlength="50" style="width: 25%"
															readOnly disabled /></td>
													</tr>
													<tr>
														<th><taglibs:transText progrmId="default" key="급여지급" />급여지급</th>
														<td><input type="text" name="salaryPymntAt"
															id="salaryPymntAt" maxlength="50" style="width: 120px"
															readOnly disabled /></td>
														<th><taglibs:transText progrmId="default"
																key="퇴직금중간정산일자" />퇴직금중간정산일자</th>
														<td><input type="text" name="tab1RetireExcclcDe"
															id="tab1RetireExcclcDe" maxlength="10" readOnly disabled></td>
														<th><taglibs:transText progrmId="default" key="출납업무" />출납업무</th>
														<td>
															<div class="checkbox">
																<label> <input type="checkbox"
																	name="tab1CashierAt" id="tab1CashierAt" value="1"
																	readOnly disabled /> <i class="input-helper"></i>
																</label>
															</div>
														</td>
													</tr>
													<tr>
														<th><taglibs:transText progrmId="default" key="퇴직연금" />퇴직연금</th>
														<td><input type="text" name="retireAnntyKindCode"
															id="retireAnntyKindCode" readOnly disabled /></td>
														<th><taglibs:transText progrmId="default"
																key="소득세율선택" />소득세율선택</th>
														<td><input type="text" name="incmtaxrtCode"
															id="incmtaxrtCode" readOnly disabled /></td>
														<th><taglibs:transText progrmId="default"
																key="급여보수체계" />급여보수체계</th>
														<td><input type="text" name="salaryAprpCode"
															id="salaryAprpCode" readOnly disabled /></td>
													</tr>
													<tr>
														<th><taglibs:transText progrmId="default"
																key="육아단축근무여부" />육아단축근무여부</th>
														<td>
															<div class="checkbox">
																<label> <input type="checkbox"
																	name="tab1BabyShrtenWorkAt" id="tab1BabyShrtenWorkAt"
																	value="1" readOnly disabled /> <i class="input-helper"></i>
																</label>
															</div>
														</td>
														<th><taglibs:transText progrmId="default" key="노조가입" />노조가입</th>
														<td>
															<div class="checkbox">
																<label> <input type="checkbox"
																	name="tab1LbunSbscrbAt" id="tab1LbunSbscrbAt" value="1"
																	readOnly disabled /> <i class="input-helper"></i>
																</label>
															</div>
														</td>
														<th><taglibs:transText progrmId="default" key="상조가입" />상조가입</th>
														<td>
															<div class="checkbox">
																<label> <input type="checkbox"
																	name="tab1MutaidSbscrbAt" id="tab1MutaidSbscrbAt"
																	value="1" readOnly disabled /> <i class="input-helper"></i>
																</label>
															</div>
														</td>
													</tr>
												</table>
											</form>
										</div>
										<!--//detail_type01-->
									</div>
								</div>
								<!-- //TAB1 기본 -->

								<div id="tab2" name="신상정보"></div>

								<div id="tab3" name="가족"></div>

								<div id="tab4" name="발령"></div>

								<div id="tab5" name="포상"></div>

								<div id="tab6" name="징계"></div>

								<div id="tab7" name="학력"></div>

								<div id="tab8" name="경력"></div>

								<div id="tab9" name="자격"></div>

								<div id="tab10" name="교육"></div>

								<div id="tab11" name="게좌"></div>

								<div id="tab12" name="어학"></div>
								<!-- 
                            <div id="tab13" name="연수">
                            </div>
                            
                            <div id="tab14" name="자소서">
                            </div>
                            
                            <div id="tab15" name="면담">
                            </div>
                            
                            <div id="tab16" name="기타">
                            </div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- //오른쪽 영역 item end -->
		<!-- 3단 일때 추가! 3단일때 다른 div 클래스명도 item3으로 변경후 사용
            <div class="item3">
            </div>
             -->

	</div>
	<!-- //flex end -->


	</div>
	<!-- //wrapper_con end -->

</body>