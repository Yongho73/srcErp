<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/mhs/hrb/mhshrb001/mhshrb001SearchMhsEmpTab2IndvdlInfo.js"></script>

		         		 <div class="list_top">
			        		<div style="float: right;" class="mb5">
			        			<button class="btn_common01_new" id="btnSave_Tab2" type="button"><taglibs:transText progrmId="default" key="저장" />저장</button>
								<button class="btn_common01_new" id="btnInit_Tab2" type="button"><taglibs:transText progrmId="default" key="btnInit" /></button>
							</div>
			             </div> 
		         		 <div class="list_type02">
						    <form id="saveFormEmp_Tab2_IndvdlInfo">
						   		<input type="hidden" name="empno" id="empno" value="${empno}" />
						   		<input type="hidden" name="bplcCode" id="bplcCode" value="${bplcCode}" />
						   		
				                <table>
				                    <caption><taglibs:transText progrmId="default" key="titMhsEmp" /></caption>
				                    <colgroup>
				                    	<col width="120">
				                        <col width="120">
				                        <col width="*">
				                        <col width="120">
				                        <col width="*">
				                        <col width="120">
				                        <col width="*">
				                    </colgroup>
				                    <tr>
				                    	<th rowspan="3" style="text-align:center; background:#f0f7fe; border-right:solid 1px #ddd;"><taglibs:transText progrmId="default" key="신상정보" />신상정보</th>
				                        <th><taglibs:transText progrmId="default" key="신장" />신장</th>
				                        <td><input type="text" name="tab2Height" id="tab2Height" maxlength="20" style="width: 90%" autocomplete="off"/></td>
				                    	<th><taglibs:transText progrmId="default" key="체중" />체중</th>
				                        <td><input type="text" name="tab2Weight" id="tab2Weight" maxlength="20" style="width: 90%" autocomplete="off"/></td>
				                        <th><taglibs:transText progrmId="default" key="혈액형" />혈액형</th>
				                        <td><div id="divInputFormTab2Blood" class="div_combo"></div></td>
				                    </tr>
				                    <tr>
				                        <th><taglibs:transText progrmId="default" key="종교" />종교</th>
				                        <td><input type="text" name="tab2Relgn" id="tab2Relgn" maxlength="20" style="width: 90%" autocomplete="off"/></td>
				                    	<th><taglibs:transText progrmId="default" key="취미" />취미</th>
				                        <td><input type="text" name="tab2Hobby" id="tab2Hobby" maxlength="20" style="width: 90%" autocomplete="off"/></td>
				                        <th><taglibs:transText progrmId="default" key="소유차량번호" />소유차량번호</th>
				                        <td><input type="text" name="tab2VehicleNo" id="tab2VehicleNo" maxlength="20" style="width: 90%" autocomplete="off"/></td>
				                    </tr>
				                    <tr>
				                        <th><taglibs:transText progrmId="default" key="사회적약자정보" />사회적약자정보</th>
				                        <td><div id="divInputFormTab2SocwkerCode" class="div_combo"></div></td>
				                    	<th></th>
				                        <td></td>
				                        <th></th>
				                        <td></td>
				                    </tr>
				                    <tr>
				                    	<td colspan='7'></td>
				                    </tr>
				                    <tr>
				                    	<th rowspan="3" style="text-align:center; background:#f0f7fe; border-right:solid 1px #ddd;"><taglibs:transText progrmId="default" key="titMhsMltpwr" /></th>
				                        <th><taglibs:transText progrmId="default" key="입대일자" />입대일자</th>
				                        <td><input type="text" name="tab2EnstDe" id="tab2EnstDe" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off"></td>
				                    	<th><taglibs:transText progrmId="default" key="전역일자" />전역일자</th>
				                        <td><input type="text" name="tab2DmblzDe" id="tab2DmblzDe" maxlength="10" class="input_calen" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" autocomplete="off"></td>
				                        <th><taglibs:transText progrmId="default" key="전역구분" />전역구분</th>
				                        <td><div id="divInputFormTab2DmblzSeCode" class="div_combo"></div></td>
				                    </tr>
				                    <tr>
				                        <th><taglibs:transText progrmId="default" key="군별" />군별</th>
				                        <td><div id="divInputFormTab2MsclSeCode" class="div_combo"></div></td>
				                    	<th><taglibs:transText progrmId="default" key="병과" />병과</th>
				                        <td><div id="divInputFormTab2BnctrSeCode" class="div_combo"></div></td>
				                        <th><taglibs:transText progrmId="default" key="계급" />계급</th>
				                        <td><div id="divInputFormTab2ClssTyCode" class="div_combo"></div></td>
				                    </tr>
				                    <tr>
				                        <th><taglibs:transText progrmId="default" key="군번" />군번</th>
				                        <td><input type="text" name="tab2Ssn" id="tab2Ssn" maxlength="20" style="width: 90%" autocomplete="off"/></td>
				                    	<th class="essential_icon"><taglibs:transText progrmId="default" key="병역자원구분" />병역자원구분</th>
				                        <td><div id="divInputFormTab2SrvddtTy" class="div_combo"></div></td>
				                        <th><taglibs:transText progrmId="default" key="미필사유" />미필사유</th>
				                        <td><div id="divInputFormTab2IncmpResnSeCode" class="div_combo"></div></td>
				                    </tr>
				                    <tr>
				                    	<td colspan='7'></td>
				                    </tr>
				                    <tr>
				                    	<th rowspan="4" style="text-align:center; background:#f0f7fe; border-right:solid 1px #ddd;"><taglibs:transText progrmId="default" key="보훈/장애" />보훈/장애</th>
				                        <th><taglibs:transText progrmId="default" key="보훈대상" />보훈대상</th>
				                        <td>
				                        	<div class="checkbox">
				                                <label> 
				                                    <input type="checkbox" name="tab2CheckboxRwdmrtTrgterAt" id="tab2CheckboxRwdmrtTrgterAt" value="1">
				                                    <i class="input-helper"></i>
				                                </label>
				                            </div>
				                        </td>
				                    	<th><taglibs:transText progrmId="default" key="보훈종류" />보훈종류</th>
				                        <td><div id="divInputFormTab2RwdmrtSeCode" class="div_combo"></div></td>
				                        <th><taglibs:transText progrmId="default" key="보훈관계" />보훈관계</th>
				                        <td><div id="divInputFormTab2FamilyRelateSe" class="div_combo"></div></td>
				                    </tr>
				                    <tr>
				                        <th><taglibs:transText progrmId="default" key="보훈등급" />보훈등급</th>
				                        <td><div id="divInputFormTab2RwdmrtGrad" class="div_combo"></div></td>
				                    	<th><taglibs:transText progrmId="default" key="보훈번호" />보훈번호</th>
				                        <td><input type="text" name="tab2RwdmrtNo" id="tab2RwdmrtNo" maxlength="20" style="width: 90%" autocomplete="off"/></td>
				                        <th></th>
				                        <td></td>
				                    </tr>
				                    <tr>
				                        <th><taglibs:transText progrmId="default" key="장애인정" />장애인정</th>
				                        <td>
				                        	<div class="checkbox">
				                                <label> 
				                                    <input type="checkbox" name="tab2CheckboxDspsnAt" id="tab2CheckboxDspsnAt" value="1">
				                                    <i class="input-helper"></i>
				                                </label>
				                            </div>
				                        </td>
				                    	<th><taglibs:transText progrmId="default" key="장애구분" />장애구분</th>
				                        <td><div id="divInputFormTab2DspsnSe" class="div_combo"></div></td>
				                        <th><taglibs:transText progrmId="default" key="장애등급" />장애등급</th>
				                        <td><div id="divInputFormTab2TroblGradSe" class="div_combo"></div></td>
				                    </tr>
				                    <tr>
				                        <th><taglibs:transText progrmId="default" key="장애유형" />장애유형</th>
				                        <td><div id="divInputFormTab2TroblTyCode" class="div_combo"></div></td>
				                    	<th></th>
				                        <td></td>
				                        <th></th>
				                        <td></td>
				                    </tr>
				           		</table>
						 	</form>
		         		 </div>
</body>