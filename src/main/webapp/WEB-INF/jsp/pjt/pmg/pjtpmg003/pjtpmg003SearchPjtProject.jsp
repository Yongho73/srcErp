<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <script src="${pageContext.request.contextPath}/js/xerp/pjt/pmg/pjtpmg003/pjtpmg003SearchPjtProject.js"></script>

    <!-- title_box -->
    <div class="title_box">
        <div class="path_info">
            <ul id="menu_path"></ul>
            <a href="#n" class="btn_help"><span class="blind"><taglibs:transText progrmId="default" key="titHelp" /></span></a>
        </div>
        <!--//path_info-->
    </div>
    <!--//title_box-->
    
	     <div class="btn" style="float:right;text-align:right; vertical-align:middle;" title="저장">
			<button class="btn_common02_new" id=btnFormSave type="button">
				<span class="glyphicon glyphicon-ok"></span> 저장
			</button>
			<BUTTON class="btn_common02_new" id="btn_help" type="button" title="도움말">
			       <SPAN class="glyphicon glyphicon-question-sign"></SPAN>
			</BUTTON>
			<BUTTON class="btn_common02_new" id="btnClose" type="button" title="닫기">
			       <SPAN class="glyphicon glyphicon-remove"></SPAN>
			</BUTTON>
		</div>
		
		<div class="project_tit_div mb10">
    	<ul class="project_tit_ul">
    		<li class="project_tit_li">2020년 서울시 급여관리시스템 통합 재개발</li>
    		<li>홍길동<span class="ml5">대리</span><span class="ml5">02-1234-5678</span></li>
    	</ul>    
   		</div>
			
		
	<div id="saveForm">
	
	<div  class="list_top02" id="tabbarObj" style="width:100%; height:600px;">
	
	<div id="a1" name="기본사항">
	 <div>
	 
		<div class="tabl_box">
		<!-- //tabl-1 -->
		<!-- <DIV class="tdl-1">list_type01 -->
		<div class="detail_type02">
		<form id="saveFormPjtProject">
			<table>
				<caption>프로젝트 기본사항3</caption>
				<colgroup>
					<col style="width:100px;min-width:100px;" />
					<col style="width:auto;min-width:300px;" />
					<col style="width:100px;min-width:100px;" />
					<col style="width:400px" />
					<col style="width:100px;min-width:100px;" />
					<col style="width:300px" />
					<col style="width:270px" />
				</colgroup>
				<tbody>
				<tr>
						<th class="essential_icon"><label for="divide">구분</label></th>
							<td><div id="divInputFormComboProjectSeCodeBox" class="div_combo" required></div>
							&nbsp;
							<div id="divInputFormComboCntrctTyCodeBox" class="div_combo"></div>
							</td>
						<th><label for="area">지역</label></th>
						<td>
							<div id="divInputFormComboProjectAreaCodeBox" class="div_combo"></div>
						</td>
						<th><label for="writer">등록자</label></th>
						<td colspan="2">
							<input type="hidden" id="empno" name="empno"  />
							<input type="text" id="userNm" name="userNm" title="등록자" style="width:80px" readonly disabled="disabled" class="readonly">
						</td>
					</tr>
					<tr>
						<th class="essential_icon"><label for="ordering">발주처</label></th>
						<td>
							<input type="hidden" name="compCd" id="compCd" />
							<input type="text" name="compNm" id="compNm" style="width:80%" readonly required/>
						<button class="btn_common03" id="btnBcncSearch" type="button">
                    		<span class="glyphicon  glyphicon glyphicon-search"></span>
                		</button>
                		</td>
						<th><label for="bcncChargerNm">담당자</label></th>
						<td>
						<input type="hidden" name="bcncChargerCode" id="bcncChargerCode"/>
						<input type="text" name="chargerNm" id="bcncChargerNm" style="width:77px" readonly>&nbsp;
						<input type="text" id="chargerCttpc" name="chargerCttpc" style="width:100px" readonly></td>
						<th class="essential_icon"><label for="projectPmNm">총괄PM</label></th>
						<td colspan="2">
						<input type="hidden" id="projectPmEmpno" name="projectPmEmpno"/>
						<input type="text" id="projectPmNm" name="projectPmNm" style="width:80px" readonly required/>
						<button class="btn_common03" id="btnEmpSearch" type="button">
                    		<span class="glyphicon  glyphicon glyphicon-search"> </span>
                		</button></td>
					</tr>
					<tr>
						<th class="essential_icon"><label for="projectNm">프로젝트명</label></th>
						<td colspan="3"><input required type="text" name="projectNm" id="projectNm" style="width:80%"></td>
						<th class="essential_icon"><label for="proNm">ID/패스워드</label></th>
						<td colspan="2">
							<div class="cont_type">
							<input type="text" name="entrpsId" id="entrpsId" style="width:80px" maxlength="8" required>
							&nbsp;/&nbsp;
							<input type="text" name="entrpsPassword" id="entrpsPassword" style="width:80px" maxlength="8" required>
							</div>
						</td>
					</tr>
					<tr>
						<th class="essential_icon"><label for="start">계약기간</label></th>
						<td colspan="3">
							<input required type="text" name="searchSregDt" id="searchSregDt" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
							&nbsp;~&nbsp;
							<input required type="text" name="searchEregDt" id="searchEregDt" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
						</td>
						<th><label for="realS">실투입기간</label></th>
						<td colspan="2">
							<input type="text" name="searchSrealDe" id="searchSrealDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
							&nbsp;~&nbsp;
							<input type="text" name="searchErealDe" id="searchErealDe" class="input_calen" style="ime-mode:disabled" maxlength="10" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)">
						</td>
					</tr>
					<tr>
						<th><label for="keepMonth">무상유지보수</label></th>
						<td><input type="text" id="grtsMntnceMcnt" name="grtsMntnceMcnt" class="numComma" maxlength="3" title="keepMonth" style="width:30px; ime-mode:disabled"> 개월</td>
						<th><label for="finish">완료여부</label></th>
						<td>
							<div id="divInputFormComboComptAtCodeBox" class="div_combo"></div>
						</td>
							<th class="essential_icon"><label for="contract">계약금액</label></th>
						<td colspan="2"><input required type="text" id="cntrctAmt" name="cntrctAmt" class="numComma" style="width:100px; ime-mode:disabled; "> 원 &nbsp;<!-- <input type="checkbox" id="surtax" title="부가세포함">&nbsp; --><label class="surtax">(부가세 포함)</label></td>
					</tr>
					<tr>
						<th colspan="3" class="ac brddd bbnone"><label for="txtBox">개요</label></th>
						<th class="ac brddd bbnone"><label for="txtBox">범위</label></th>
						<th colspan="2" class="ac brddd bbnone"><label for="txtBox">개발환경</label></th>
						<th class="ac brddd bbnone"><label for="txtBox">무상유지보수</label></th>						
					</tr>
					<tr>					
						<td colspan="3" class="ac brddd"><textarea id="projectCn" name="projectCn" title="내용" style="width:98%;height:120px;"></textarea></td>
						<td class="ac brddd"><textarea id="projectScope" name="projectScope" title="내용" style="width:98%;height:120px;"></textarea></td>
						<td colspan="2" class="ac brddd"><textarea id="projectEnvrn" name="projectEnvrn" title="내용" style="width:98%;height:120px;"></textarea></td>
						<td class="ac brddd"><textarea id="grtsMntnceCn" name="grtsMntnceCn" title="내용" style="width:98%;height:120px;"></textarea></td>
					</tr>

				</tbody>
			</table>
		</div><!--//baseForm-->
	</div>
	</form>
	</div>
	</div>
				<div id="a2" name="Tab 2"></div>
        		<div id="a3" name="Tab 3"></div>
				<div id="a4" name="Tab 3"></div>
				<div id="a5" name="Tab 3"></div>
				<div id="a6" name="Tab 3"></div>
	
 <div style="width:100%;" class="mt5">
 		<div style="float: right;" class="mb5">
			<button class="btn_common01_new" id="btnCustomerRemove" type="button">담당자삭제</button>
		</div>
		<div style="float: right;" class="mb5">
			<button class="btn_common01_new" id="btnCustomerAdd" type="button">담당자추가</button>
		</div>
		<div style="float: right;" class="mb5">
			<button class="btn_common01_new" id="btnCustomerSave" type="button">저장</button>
		</div>
		<div>
			<div id="dataList" style="width: 100%; height: 200px;"></div>
		</div>
	</div>
	
	</div>
</div>


              
            
</body>
