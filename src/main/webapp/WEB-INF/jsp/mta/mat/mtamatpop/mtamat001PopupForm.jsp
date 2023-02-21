<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
    var dhxGridRequstCreate;
    var dhxGridListInfoRequstCreate;
    var dhxInputFormRequstTyCodeComboRequstCreate;
    var dhxInputFormPriorTyCodeComboRequstCreate;
    var dhxInputFormOpertTyCodeComboRequstCreate;
    var dhxInputFormRequstStepCodeComboRequstCreate;
    var dhxInputFormStsfdgLevelCodeComboRequstCreate;
    
    var uploadedFileKeys3 = []; // db 저장용 (키만 파이프라인으로 구분)
	var uploadedFileInfo3 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
	
	var fn_FileUploadBtnEventRequstCreate = function(){
		/*
		세번째 첨부파일 (파이프라인 파일키 조회)		
		*/
		$('#fileUpload3').unbind("click").bind("click",function(event){
			gf_FileUploadPopup(
					'fn_FileUploadBtnEventRequstCreate', 
					'btnUploadedFiledelete3', 
					'fileList3', 
					'atchmnfl', 
					 uploadedFileKeys3, 
					 uploadedFileInfo3,
					 0,
					'all',
			        '');
		});
		
		$('.btnUploadedFiledelete3').unbind("click").bind("click",function(event){			
			 
			uploadedFileKeys3.splice($(this).attr('idx'), 1);
			uploadedFileInfo3.splice($(this).attr('idx'), 1);
			
			$('#fileList3 .file_box table tr').remove();
			
			var idx = 0;
			var fileInfos = [];
			var atchFileList = [];
			
			$.each( uploadedFileInfo3, function( key, value ) {
				
				fileInfos = uploadedFileInfo3[key].split('|^|');
				
				atchFileList.push('<tr>');
				atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
				atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
				atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
				atchFileList.push('</tr>');

				idx++;
			});								
			
			$('#fileList3 .file_box table').append(atchFileList.join(""));
			$('#atchmnfl').val(uploadedFileKeys3.join("|"));
			
			fn_FileUploadBtnEventRequstCreate();
			
		});
	}
	
	var fn_MyfileHandler = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
		if(!gf_IsNull(data)){		
			
			var idx = 0;
			var fileInfos = [];
			var atchFileList = [];
			
			$.each( data, function( key, value ) {						
				fileInfos = value.split('|^|');			
				keyArr.push(fileInfos[0]);
				infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
			});
	 		
			$('#'+viewDivId+' .file_box table tr').remove();
			$('#'+dataDivId).val("");
			
			$.each( infoArr, function( key, value ) {
				
				fileInfos = infoArr[key].split('|^|');

				atchFileList.push('<tr>');
				atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
				atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
				atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del '+deleteBtnClassNm+'"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
				atchFileList.push('</tr>');
					 
				idx++;
			});								
			
			//console.log(atchFileList);
			
			$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
			$('#'+dataDivId).val(keyArr.join("|"));
			
			var callbacks = $.Callbacks();
			var callFunction = eval(eventFunction);
			callbacks.empty();
			callbacks.add(callFunction);
	        callbacks.fire();
		}
	};
    
    var cf_InitParamRequstCreate = function (){
    	
    	dhxInputFormRequstTyCodeComboRequstCreate = gf_MakeDhxCombo(
    		    'divInputFormComboRequstTyCodeBox',
    		    'saveForm',
    		    150,
    		    'combo/searchStmCode?codekindCode=C922',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	dhxInputFormPriorTyCodeComboRequstCreate = gf_MakeDhxCombo(
    		    'divInputFormComboPriorTyCodeBox',
    		    'saveForm',
    		    150,
    		    'combo/searchStmCode?codekindCode=C923',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	dhxInputFormOpertTyCodeComboRequstCreate = gf_MakeDhxCombo(
    		    'divInputFormComboOpertTyCodeBox',
    		    'saveForm',
    		    150,
    		    'combo/searchStmCode?codekindCode=C924',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	dhxInputFormRequstStepCodeComboRequstCreate = gf_MakeDhxCombo(
    		    'divInputFormComboRequstStepCodeBox',
    		    'saveForm',
    		    150,
    		    'combo/searchStmCode?codekindCode=C925',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	dhxInputFormStsfdgLevelCodeComboRequstCreate = gf_MakeDhxCombo(
    		    'divInputFormComboStsfdgLevelCodeBox',
    		    'saveForm',
    		    150,
    		    'combo/searchStmCode?codekindCode=C926',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	 var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"requstDt", button:"startDateIcon"});
    	     dhxCCalendarEndDate.loadUserLanguage("ko");
    	     dhxCCalendarEndDate.hideTime();
    	    
    	 var dhxCCalendarEndDate2 = new dhtmlXCalendarObject({input:"comptRequstDt", button:"startDateIcon"});
    	     dhxCCalendarEndDate2.loadUserLanguage("ko");
    	     dhxCCalendarEndDate2.hideTime();
    	
    	 var dhxCCalendarEndDate3 = new dhtmlXCalendarObject({input:"comptConfmDt", button:"startDateIcon"});
    	     dhxCCalendarEndDate3.loadUserLanguage("ko");
    	     dhxCCalendarEndDate3.hideTime();
    	
    };
    var cf_SetComponentsRequstCreate = function (){

    };

    var cf_SetEventListenerRequstCreate = function (){
    	 
    	$('#saveFormMtaRequstCreate #btnCompNmSearch').unbind('click').bind('click', function(event){
    		fn_CompPopup("saveFormMtaRequstCreate","projectNo","compNm");
    	});
    	
    	$('#saveFormMtaRequstCreate #btnFileSearch').unbind('click').bind('click', function(event){
    		gf_FileUploadPopup("saveFormMtaRequstCreate","atchmnfl","atchmnfl");
    	});
    	
    	$('#saveFormMtaRequstCreate #btnKorNmSearch').unbind('click').bind('click', function(event){
    		fn_RequestEmpPopup("saveFormMtaRequstCreate","drctrEmpno","drctrEmpNm");
    	});
    	

    	$('#saveFormMtaRequstCreate #btnKorNmSearch1').unbind('click').bind('click', function(event){
    		fn_RequestEmpPopup("saveFormMtaRequstCreate","opertorEmpno","opertorEmpNm");
    	});
    	
    	$('#btnFormSave').unbind('click').bind('click', function() {

    	        if($('#saveFormMtaRequstCreate').validate().form()){

    	            var jsonParameter = {
    	                projectNo : gf_FormGetValue('saveFormMtaRequstCreate', 'projectNo', 'text'),
    	                requstNo : gf_FormGetValue('saveFormMtaRequstCreate', 'requstNo', 'text'),
    	                requstStep : dhxInputFormRequstStepCodeComboRequstCreate.getSelectedValue(),
    	                requstDt : gf_FormGetValue('saveFormMtaRequstCreate', 'requstDt', 'text'),
    	                requstDept : gf_FormGetValue('saveFormMtaRequstCreate', 'requstDept', 'text').replaceAll('-',''),
    	                requstTelno : gf_FormGetValue('saveFormMtaRequstCreate', 'requstTelno', 'text'),
    	                requstEmail : gf_FormGetValue('saveFormMtaRequstCreate', 'requstEmail', 'text'),
    	                comptRequstDt : gf_FormGetValue('saveFormMtaRequstCreate', 'comptRequstDt', 'text'),
    	                requstCn : gf_FormGetValue('saveFormMtaRequstCreate', 'requstCn', 'textarea'),
    	                priorTy : dhxInputFormPriorTyCodeComboRequstCreate.getSelectedValue(),
    	                requstTy : dhxInputFormRequstTyCodeComboRequstCreate.getSelectedValue(),
    	                drctrEmpno : gf_FormGetValue('saveFormMtaRequstCreate', 'drctrEmpno', 'text'),
    	                drctCn : gf_FormGetValue('saveFormMtaRequstCreate', 'drctCn', 'textarea'),
    	                atchmnfl : gf_FormGetValue('saveFormMtaRequstCreate', 'atchmnfl', 'text'),
    	                opertorEmpno : gf_FormGetValue('saveFormMtaRequstCreate', 'opertorEmpno', 'text'),
    	                opertTy : dhxInputFormOpertTyCodeComboRequstCreate.getSelectedValue(),
    	                confmerNm : gf_FormGetValue('saveFormMtaRequstCreate', 'confmerNm','text'),
    	                comptConfmDt : gf_FormGetValue('saveFormMtaRequstCreate', 'comptConfmDt', 'text'),
    	                comptConfmAt : gf_FormGetValue('saveFormMtaRequstCreate', 'comptConfmAt','chkboxYN'),
    	                confmOpn : gf_FormGetValue('saveFormMtaRequstCreate', 'confmOpn','textarea'),
    	                stsfdgLevel : dhxInputFormStsfdgLevelCodeComboRequstCreate.getSelectedValue(),
    	            };

    	            var url;

    	            if( !gf_IsNull(projectNo) && !gf_IsNull(requstNo) ) {
    	                url = "mtamat001/modifyMtaRequst";
    	            } else {
    	                url = "mtamat001/saveMtaRequst";
    	            }

    	            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
    	            if(dataSource.code === '000') {

    	                if(!gf_IsNull(projectNo) && !gf_IsNull(requstNo)) {
    	                    gf_DivMsgAlert(gv_MsgUpdate);
    	                } else {
    	                	gf_DivMsgAlert(gv_MsgRegist);
    	                	$('#bpopupMaintRequst .b-close').click();
    	                }
    	            }
    	        }

    	        $('#saveFormMtaRequstCreate div.error').unbind("click").bind("click",function() {
    	            $(this).remove();
    	        });
    	        
    	  });
    	
    	 $('#btnFormReset').unbind("click").bind("click",function() {
    	        cf_InitInputFormRequstCreate();
    	    });
    	
    	
    	
    	
    };
   
    var cf_SetBindingRequstCreate = function (){
    };

    var cf_InitFormRequstCreate = function (){};


    var fn_SearchGridListRequstCreate = function (){

        var jsonParameter = {                 
        };
        
       gf_Transaction('gridList', 'mhshrmpop/searchMhsDept', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
    };

    var fn_CallbackSearchGridListRequstCreate = function (strSvcID, targetID, data){
        
    };

    var fn_SelectRequstCreate = function (rId, cInd) {

       
    };

    var fn_CheckRequstCreate = function (col){
        var resArr = [];
        var colIdx = gf_GetDhxGridColumId(dhxGridMhsDept, col);
        dhxGridMhsDept.forEachRow(function(rowId) {
            if(dhxGridMhsDept.cells(rowId,0).isChecked()){
                resArr.push( dhxGridMhsDept.cells(rowId,colIdx).getValue() );
            }
        });
        return resArr;
    };
    
    var fn_RequestEmpPopup = function (formId, codeId, codeNmId) {
    	
    	var userId = ""; 
    	var title  = "사원 조회";
    	
    	//저장팝업
    	var dhxWindowObj;
    	if($('body').find("div[id='bpopup']").size() <= 0) {
    		$('body').append("<div id='bpopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
    	}
    	$('#bpopup').bPopup({
    		onOpen:function(){
    			
    			dhxWindows = new dhtmlXWindows();
    			
    			var id 		= 'deptPopup';
    			var ajaxUrl = gv_ContextPath+'/pop/emp/view';
    			var left	= 0;
    			var top		= 0;
    			var width	= 720;
    			var height	= 520;

    			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
    			dhxWindows.window(id).centerOnScreen();
    			dhxWindowObj.setText(title);
    			dhxWindowObj.attachURL(ajaxUrl, true, true);
    			//dhxWindowObj.attachObject('btnSearch', true);
    			dhxWindowObj.detachObject(true);
    			dhxWindowObj.attachEvent("onClose", function(win){
    				$('#bpopup .b-close').click();
    			});
    		},
    		onClose:function(){
    			dhxWindows.unload();
    			$('body').find("div[id='bpopup']").remove();
    		}
    	},function(){});
    	return dhxWindowObj;
    };
    
    var cf_InitInputFormRequstCreate = function (){

        projectNo = '';
        requstNo = '';

        $("#h4_pr_title").text(titMtaRequst + ' ' + gv_TitRegist);
        $('#saveFormMtaRequstCreate input[name="projectNo"]').removeAttr("disabled");
        $('#saveFormMtaRequstCreate input[name="requstNo"]').removeAttr("disabled");
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

        gf_FormSetValue('saveFormMtaRequstCreate', 'projectNo', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'requstNo', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'requstStep', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'requstDt', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'requstDept', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'requstTelno', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'requstEmail', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'comptRequstDt', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'requstCn', '', 'textarea');
        gf_FormSetValue('saveFormMtaRequstCreate', 'priorTy', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'requstTy', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'drctrEmpno', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'drctCn', '', 'textarea');
        gf_FormSetValue('saveFormMtaRequstCreate', 'atchmnfl', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'opertorEmpno', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'opertTy', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'confmerNm', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'comptConfmDt', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'comptConfmAt', false, 'chkbox');
        gf_FormSetValue('saveFormMtaRequstCreate', 'confmOpn', '', 'textarea');
        gf_FormSetValue('saveFormMtaRequstCreate', 'stsfdgLevel', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'compNm', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'drctrEmpNm', '', 'text');
        gf_FormSetValue('saveFormMtaRequstCreate', 'opertorEmpNm', '', 'text');
        
        dhxInputFormRequstStepCodeComboRequstCreate.unSelectOption();
        dhxInputFormRequstTyCodeComboRequstCreate.unSelectOption();
        dhxInputFormPriorTyCodeComboRequstCreate.unSelectOption();
        dhxInputFormOpertTyCodeComboRequstCreate.unSelectOption();
        dhxInputFormStsfdgLevelCodeComboRequstCreate.unSelectOption();
        
        $('#spanDel').hide();
        $('#spanReset').show();
    };
   
    
	$(function() {
    	
        cf_InitParamRequstCreate();
        cf_SetComponentsRequstCreate();
        cf_SetEventListenerRequstCreate();
        cf_SetBindingRequstCreate();
        cf_InitFormRequstCreate();
        fn_FileUploadBtnEventRequstCreate();	
    });
    


    </script>

	<div id="saveForm" style="margin: 15px;">
		<div class="list_top01" id="tabbarObj"
			style="width: 95%; height: 600px;">
			<div>
				<div class="detail_type02">
					<form id="saveFormMtaRequstCreate">
						<table>
							<colgroup>
								<col width="70">
								<col width="*">
								<col width="80">
								<col width="*">
								<col width="70">
								<col width="*">
							</colgroup>

							<tr>
								<th>거래처</th>
								<td><input type="hidden" name="projectNo" id="projectNo"
									class="projectNo" maxlength="15" /> <input required
									type="text" name="compNm" id="compNm" maxlength="100"
									style="width: 200px" readOnly>
									<button type="button" id="btnCompNmSearch" class="btn_common03">
										<span class="glyphicon  glyphicon glyphicon-search"></span>
									</button></td>
								<th>요청자</th>
								<td><input required type="text" name="requstDept"
									id="requstDept" maxlength="5" style="width: 100px" /></td>
								<th>연착처</th>
								<td><input type="text" name="requstTelno" id="requstTelno"
									maxlength="18" style="width: 150px" /></td>

							</tr>
							<tr>
								<th>장애유형</th>
								<td><div id="divInputFormComboRequstTyCodeBox"
										class="div_combo"></div></td>
								<th>요청일</th>
								<td><input type="text" name="requstDt" id="requstDt"
									maxlength="10" class="input_calen"></td>
								<th>우선순위</th>
								<td><div id="divInputFormComboPriorTyCodeBox"
										class="div_combo"></td>

							</tr>
							<tr>
								<th>이메일</th>
								<td><input type="text" name="requstEmail" id="requstEmail"
									maxlength="100" style="width: 250px" /></td>
								<th>완료요구일</th>
								<td><input type="text" name="comptRequstDt"
									id="comptRequstDt" maxlength="10" class="input_calen"></td>
								<th>작업유형</th>
								<td><div id="divInputFormComboOpertTyCodeBox"
										class="div_combo"></div></td>

							</tr>
							<tr>
								<th>요청내용</th>
								<td colspan="5"><textarea required name="requstCn" id="requstCn" rows="3" cols="140"></textarea></td>
							</tr>
							<tr>
								<th class="ar">파일정보</th>
								<td colspan="5" id="fileList3">									
									<input type="hidden" name="atchmnfl" id="atchmnfl"/>
									<table class="file_box_h" style="width: 470px;">
										<colgroup>
											<col width="310" />
											<col width="80" />
											<col width="80" />
										</colgroup>
										<tr style="width: 100px;">
											<th>파일이름</th>
											<th>용량</th>
											<th>삭제</th>
										</tr>
									</table>

									<div class="file_box h120">
										<table>
											<colgroup>
												<col width="310" />
												<col width="80" />
												<col width="63" />
											</colgroup>
											<tr>
												<td colspan="3" style="text-align: center">첨부파일이 없습니다.</td>
											</tr>
										</table>
									</div>
									<button type="button" class="btn_common02" id="fileUpload3">
										<span class="glyphicon glyphicon-paperclip"></span> 첨부파일
									</button>
								</td>
							</tr>
						</table>

						<table style="margin-top: 20px;">
							<colgroup>
								<col width="70">
								<col width="*">
								<col width="80">
								<col width="*">
								<col width="70">
								<col width="*">
							</colgroup>

							<tr>
								<th>지시자</th>
								<td><input type="hidden" name="drctrEmpno" id="drctrEmpno"
									maxlength="15" /> <input type="text" name="drctrEmpNm"
									id="drctrEmpNm" maxlength="100" style="width: 120px" readOnly>
									<button type="button" id="btnKorNmSearch" class="btn_common03">
										<span class="glyphicon  glyphicon glyphicon-search"></span>
									</button></td>
								<th>작업자</th>
								<input type="hidden" name="opertorEmpno" id="opertorEmpno"
									maxlength="15" />
								<td><input type="text" name="opertorEmpNm"
									id="opertorEmpNm" maxlength="5" style="width: 120px" />
									<button type="button" id="btnKorNmSearch1" class="btn_common03">
										<span class="glyphicon  glyphicon glyphicon-search"></span>
									</button></td>
								<th>작업단계</th>
								<td><div id="divInputFormComboRequstStepCodeBox"
										class="div_combo"></div></td>

							</tr>
							<tr>
								<th>지시내용</th>
								<td colspan="5"><textarea name="drctCn" id="drctCn"
										rows="2" cols="140"></textarea></td>
							</tr>

						</table>

						<table style="margin-top: 20px;">
							<colgroup>
								<col width="70">
								<col width="*">
								<col width="80">
								<col width="*">
								<col width="70">
								<col width="*">
							</colgroup>

							<tr>
								<th>승인자</th>
								<td><input type="text" name="confmerNm" id="confmerNm"
									maxlength="5" style="width: 100px" />&nbsp; <input
										type="checkbox" name="comptConfmAt" id="comptConfmAt"
										class="chk-type01" /> 완료승인</td>
								<th>승인일</th>
								<td><input type="text" name="comptConfmDt"
									id="comptConfmDt" maxlength="10" class="input_calen"></td>
								<th>만족도</th>
								<td><div id="divInputFormComboStsfdgLevelCodeBox"
										class="div_combo"></div></td>
							</tr>
							<tr>
								<th>승인의견</th>
								<td colspan="5"><textarea name="confmOpn" id="confmOpn"
										rows="2" cols="140"></textarea></td>
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
			</div>
		</div>
		<!-- a1_end -->

	</div>


</body>
