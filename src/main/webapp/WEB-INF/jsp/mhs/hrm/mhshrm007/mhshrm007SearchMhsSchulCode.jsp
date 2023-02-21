<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script src="${pageContext.request.contextPath}/js/xerp/mhs/hrm/mhshrm007/mhshrm007SearchMhsSchulCode.js"></script>

	<!-- title_box -->
	<div class="title_box">
		<div class="path_info">
			<ul id="menu_path"></ul>
			<a href="#n" class="btn_help"><span class="blind"><taglibs:transText progrmId="default" key="titHelp" /></span></a>
		</div>
		<!--//path_info-->
		
		<ul class="btn">
			<li><button type="button" id="btnSearch" class="btn_common01">
					<span class="glyphicon glyphicon-search"></span>
					<taglibs:transText progrmId="default" key="btnSearch" />
				</button>
			</li>
		</ul>
				
	</div>
	<!--//title_box-->

	<!-- search_box -->
	<div class="search_box" id="searchFormMhsSchulCode">
		<table>
			<tr>
				<th><label for="schulCode" class="label"><taglibs:transText progrmId="default" key="titSchulCode" /></label></th>
				<td><input type="text" name="schulCode" id="schulCode" maxlength="null"></td>
				<th><label for="schulNm" class="label"><taglibs:transText progrmId="default" key="titSchulNm" /></label></th>
				<td><input type="text" name="schulNm" id="schulNm" maxlength="null"></td>
				<th><label for="areaCode" class="label"><taglibs:transText progrmId="default" key="titAreaCode" /></label></th>
				<td><div id="divComboAreaCode" class="div_combo"></div></td>
				<th><label for="schulSe" class="label"><taglibs:transText progrmId="default" key="titSchulSe" /></label></th>
				<td><div id="divComboSchulSe" class="div_combo"></div></td>
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
						<taglibs:transText progrmId="default" key="titMhsSchulCode" />
						<taglibs:transText progrmId="default" key="titList" />
					</h4>
					<span class="view"> <taglibs:transText progrmId="default" key="titRdcnt" />&nbsp;<span id="spanCnt"></span> <taglibs:transText progrmId="default" key="titSearchCnt" />
					</span>
					<div class="btn">
						<button type="button" id="btnCheckAll" class="btn_common02_new">
							<!-- <span class="glyphicon glyphicon-check"></span>-->
							<taglibs:transText progrmId="default" key="btnSelectAll" />
						</button>
						<button type="button" id="btnExcel" class="btn_common02_new">
							<!-- <span class="glyphicon glyphicon-download-alt"></span>-->
							<taglibs:transText progrmId="default" key="btnDown" />
						</button>
						<button type="button" id="btnAdd" class="btn_common02_new">
							<!-- <span class="glyphicon glyphicon-pencil"></span>-->
							<taglibs:transText progrmId="default" key="titRegist" />
						</button>
						<button type="button" id="btnRemove" class="btn_common02_new">
							<!-- <span class="glyphicon glyphicon-trash"></span>-->
							<taglibs:transText progrmId="default" key="btnDelete" />
						</button>
					</div>
				</div>
				<!--//list_top-->
				
				<div id="dataList" style="width: 100%; height: 600px"></div>
				
			</div><!--//list_type01-->
		</div>
		<!-- //tabl-1 -->

		<!-- //tdl-2 -->
		<div class="tdl-2" id="saveForm">
			<div class="list_top">
				<h4 class="title03 fl" id="h4_pr_title">
					<taglibs:transText progrmId="default" key="titMhsSchulCode" />
					<taglibs:transText progrmId="default" key="titRegist" />
				</h4>
				<div class="btn">
					<button type="button" id="btnFormSave" class="btn_common02">
						<span class="glyphicon glyphicon-save"></span>
						<taglibs:transText progrmId="default" key="btnSave" />
					</button>
					<span id="spanReset">
						<button type="button" id="btnFormReset" class="btn_common02">
							<span class="glyphicon glyphicon-refresh"></span>
							<taglibs:transText progrmId="default" key="btnReset" />
						</button>
					</span> <span id="spanDel" style="display: none">
						<button type="button" id="btnFormRemove" class="btn_common02">
							<span class="glyphicon glyphicon-trash"></span>
							<taglibs:transText progrmId="default" key="btnDelete" />
						</button>
					</span>
				</div><!-- //btn -->
			</div>
			<div class="detail_type01">
				<form id="saveFormMhsSchulCode">
					<table>
						<caption>
							<taglibs:transText progrmId="default" key="titMhsSchulCode" />
						</caption>
						<colgroup>
							<col width="150">
							<col width="">
						</colgroup>
						<tr>
							<th><taglibs:transText progrmId="default" key="titSchulCode" /></th>
							<td><input type="text" name="schulCode" id="schulCode"maxlength="20" style="width: 50%"></td>
						</tr>
						<tr>
							<th><taglibs:transText progrmId="default" key="titSchulNm" /></th>
							<td><input type="text" name="schulNm" id="schulNm" maxlength="50" style="width: 50%"></td>
						</tr>
						<tr>
							<th><taglibs:transText progrmId="default" key="titAreaCode" /></th>
							<td><div id="divInputFormAreaCodeComboBox"></div></td>
						</tr>
						<tr>
							<th><taglibs:transText progrmId="default" key="titSchulSe" /></th>
							<td><div id="divInputFormSchulSeComboBox"></div></td>
						</tr>
						<tr>
							<th><taglibs:transText progrmId="default" key="titZip" /></th>
							<td><input type="text" name="zip" id="zip" maxlength="7" style="width: 50%"></td>
						</tr>
						<tr>
							<th><taglibs:transText progrmId="default" key="titAdres" /></th>
							<td><input type="text" name="adres" id="adres" maxlength="100" style="width: 50%"></td>
						</tr>
						<tr>
							<th><taglibs:transText progrmId="default" key="titTelno" /></th>
							<td><input type="text" name="telno" id="telno" maxlength="14" style="width: 50%"></td>
						</tr>
						<tr>
							<th><taglibs:transText progrmId="default" key="titFaxTelno" /></th>
							<td><input type="text" name="faxTelno" id="faxTelno" maxlength="14" style="width: 50%"></td>
						</tr>
					</table>
				</form>
			</div>
			<!--//detail_type01-->
			
		</div>
		<!-- //tabl-2 -->
	</div>
	<!--//tabl_box-->
</body>
