<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
    
    var dhxGridRequestOfert;
    var dhxGridListInfoRequestOfert;   
    var dhxInputFormRequstTyCodeComboRequestDetail;
    var dhxInputFormPriorTyCodeComboRequestDetail;
    var dhxInputFormOpertTyCodeComboRequestDetail;
    var dhxInputFormRequstStepCodeComboRequestDetail;
    var dhxInputFormStsfdgLevelCodeComboRequestDetail;    
    var uploadedFileKeys3 = []; // db 저장용 (키만 파이프라인으로 구분)
	var uploadedFileInfo3 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
	
	var fn_FileUploadBtnEventRequestDetail = function(){
		/*
		세번째 첨부파일 (파이프라인 파일키 조회)		
		*/
		$('#fileUpload3').unbind("click").bind("click",function(event){
			gf_FileUploadPopup(
					'fn_FileUploadBtnEventRequestDetail', 
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
			
			fn_FileUploadBtnEventRequestDetail();
			
		});
		
		$('#fileSearch').unbind("click").bind("click",function(event){
			var jsonParameter = { atchFiles : $('#atchmnflList').val() };
			var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST');
			
			$('#fileList3 .file_box table tr').remove();
			uploadedFileKeys3 = [];
			uploadedFileInfo3 = [];
			
			var atchFileList = [];
			var idx = 0;
			$.each( dataSource.data, function( key, value ) {
				
				uploadedFileKeys3.push(value.atchFileId);				
				uploadedFileInfo3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
				
				atchFileList.push('<tr>');
				atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
				atchFileList.push('<td class="ac">'+gf_FileSizeExpression(value.fileSize)+'</td>');
				atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
				atchFileList.push('</tr>');
				
				idx++;
			});
 	
			if(gf_IsNull(atchFileList)) {				
				atchFileList.push('<tr>');
				atchFileList.push('<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>');				
				atchFileList.push('</tr>');								
			}
			
			$('#fileList3 .file_box table').append(atchFileList.join(""));
			$('#atchFileIds3').val(uploadedFileKeys3.join("|"));
			
			fn_FileUploadBtnEventRequestDetail();
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
    
    
	var cf_InitParamRequestDetail = function (){};   
    var cf_SetComponentsRequestDetail = function (){
	
    	dhxInputFormRequstTyCodeComboRequestDetail = gf_MakeDhxCombo(
    		    'divInputFormComboRequstTyCodeBox',
    		    'saveFormMtaRequstRequestDetail',
    		    150,
    		    'combo/searchStmCode?codekindCode=C922',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	dhxInputFormPriorTyCodeComboRequestDetail = gf_MakeDhxCombo(
    		    'divInputFormComboPriorTyCodeBox',
    		    'saveFormMtaRequstRequestDetail',
    		    150,
    		    'combo/searchStmCode?codekindCode=C923',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	dhxInputFormOpertTyCodeComboRequestDetail = gf_MakeDhxCombo(
    		    'divInputFormComboOpertTyCodeBox',
    		    'saveFormMtaRequstRequestDetail',
    		    150,
    		    'combo/searchStmCode?codekindCode=C924',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	dhxInputFormRequstStepCodeComboRequestDetail = gf_MakeDhxCombo(
    		    'divInputFormComboRequstStepCodeBox',
    		    'saveFormMtaRequstRequestDetail',
    		    150,
    		    'combo/searchStmCode?codekindCode=C925',
    		    true,
    		    'code',
    		    'codeNm',
    		    '',
    		    '');
    	
    	dhxInputFormStsfdgLevelCodeComboRequestDetail = gf_MakeDhxCombo(
    		    'divInputFormComboStsfdgLevelCodeBox',
    		    'saveFormMtaRequstRequestDetail',
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
    	     
    	var dhxGridListInfoRequestOfert = [];
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllOpert" />', '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader(gv_TitNum, '60', 'center', 'str', 'ro', false, 'rnum', '')); // 번호
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader('성명', '120', 'center', 'str', 'ro', false, 'opertorEmpNm', '')); // 작업자이름
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader('시작일자', '160', 'center', 'str', 'ro', false, 'opertBeginDt', '')); // 시작일자
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader('종료일자', '160', 'center', 'str', 'ro', false, 'opertEndDt', '')); // 종료일자
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader('내용', '420', 'center', 'str', 'ro', false, 'opertCn', '')); // 내용
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader('', '420', 'center', 'str', 'ro', true, 'opertSn', '')); // 내용
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader('', '420', 'center', 'str', 'ro', true, 'requstNo', '')); // 내용
    	dhxGridListInfoRequestOfert.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미
	
    	dhxGridRequestOfert = gf_MakeDhxGrid('ofertList', dhxGridListInfoRequestOfert, true, false, false);
    	
    	dhxGridRequestOfert.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	        if(cInd == 0) return true;
    	        else return false;
    	    });
    	dhxGridRequestOfert.attachEvent("onRowDblClicked", function(rId,cInd){
        	    var param = dhxGridRequestOfert.cells(rId, 6).getValue();
    			fn_MatOpertPopup('form1','','',param);
    	    });


    };

    var cf_SetEventListenerRequestDetail = function (){
    	 
    	$('#saveFormMtaRequstRequestDetail #btnCompNmSearch').unbind('click').bind('click', function(event){
    		fn_CompPopup("saveFormMtaRequstRequestDetail","projectNo","compNm");
    	});
    	
    	$('#saveFormMtaRequstRequestDetail #btnKorNmSearch').unbind('click').bind('click', function(event){
    		fn_RequestEmpPopup("saveFormMtaRequstRequestDetail","drctrEmpno","drctrEmpNm");
    	});
    	

    	$('#saveFormMtaRequstRequestDetail #btnKorNmSearch1').unbind('click').bind('click', function(event){
    		fn_RequestEmpPopup("saveFormMtaRequstRequestDetail","opertorEmpno","opertorEmpNm");
    	});
    	
    	$('#btnRowAdd').unbind('click').bind('click', function(event){
    		fn_MatOpertPopup("popForm",'','');
    	});
    	
    	$('#btnRowDelete').unbind('click').bind('click', function(event){
    		dhxGridRequestOfert.deleteRow("row1");
    	});	

        $('#checkAllOpert').unbind("click").bind("click",function() {
        	var checkAllOpert = $("#checkAllOpert").prop("checked");
        		dhxGridRequestOfert.forEachRow(function(rowId) {
        		dhxGridRequestOfert.cells(rowId,0).setChecked(checkAllOpert);
            });
        });
        
        $('#btnFormRemoveRequst').unbind("click").bind("click",function() {
        	gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
        });
    	
    	 $('.detail_type02 #btnRowDelete').unbind('click').bind('click', function() {
    	        var requstNos = fn_CheckMtaRequstDetail('requstNo');
    	        var opertSns = fn_CheckMtaRequstDetail('opertSn');
    	        if( gf_IsNull(requstNos) && gf_IsNull(opertSns) ) {
    	             gf_DivMsgAlert(gv_MsgDelKey);
    	             return false;
    	        } else {
    	            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAllRequstDetail()', '');
    	        }
    	    });
    	
    	$('#btnFormSave').unbind('click').bind('click', function() {

    	        if($('#saveFormMtaRequstRequestDetail').validate().form()){

    	            var jsonParameter = {
    	                projectNo : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'projectNo', 'text'),
    	                requstNo : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstNo', 'text'),
    	                requstStep : dhxInputFormRequstStepCodeComboRequestDetail.getSelectedValue(),
    	                requstDt : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstDt', 'text'),
    	                requstDept : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstDept', 'text').replaceAll('-',''),
    	                requstTelno : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstTelno', 'text'),
    	                requstEmail : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstEmail', 'text'),
    	                comptRequstDt : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'comptRequstDt', 'text'),
    	                requstCn : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstCn', 'textarea'),
    	                priorTy : dhxInputFormPriorTyCodeComboRequestDetail.getSelectedValue(),
    	                requstTy : dhxInputFormRequstTyCodeComboRequestDetail.getSelectedValue(),
    	                drctrEmpno : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'drctrEmpno', 'text'),
    	                drctCn : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'drctCn', 'textarea'),
    	                atchmnfl : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'atchmnfl', 'text'),
    	                opertorEmpno : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'opertorEmpno', 'text'),
    	                opertTy : dhxInputFormOpertTyCodeComboRequestDetail.getSelectedValue(),
    	                confmerNm : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'confmerNm','text'),
    	                comptConfmDt : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'comptConfmDt', 'text'),
    	                comptConfmAt : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'comptConfmAt','chkboxYN'),
    	                confmOpn : gf_FormGetValue('saveFormMtaRequstRequestDetail', 'confmOpn','textarea'),
    	                stsfdgLevel : dhxInputFormStsfdgLevelCodeComboRequestDetail.getSelectedValue(),
    	            };
    	            
    	            var projectNo = gf_FormGetValue('saveFormMtaRequstRequestDetail', 'projectNo', 'text');
    	            var requstNo = gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstNo', 'text');

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
    	                    $('#bpopupMaintRequst .b-close').click();
    	                } else {
    	                	gf_DivMsgAlert(gv_MsgRegist);
    	                }
    	            }
    	        }

    	        $('#saveFormMtaRequstRequestDetail div.error').unbind("click").bind("click",function() {
    	            $(this).remove();
    	        });
    	        
    	  });
    	
    	  $('#btnFormReset').unbind("click").bind("click",function() {
    	        cf_InitInputForm();
    	  });

    };

    var cf_SetBindingMhsDeptRequestDetail = function (){
    	fn_SearchGridListRequestDetail();
    };

    var cf_InitFormRequestDetail = function (){};
    
    var fn_SearchGridListRequestDetail = function (){
    	
    	var projectNo = '${projectNo}';
    	var requstNo = '${requstNo}'; 

        var jsonParameter = {
        	projectNo : projectNo,
        	requstNo : requstNo
        };

        gf_Transaction('gridList', 'mtamat001/searchMtaRequstOpert', jsonParameter, 'fn_CallbackSearchGridListRequestDetail', false, 'GET');
    };

    var fn_CallbackSearchGridListRequestDetail = function (strSvcID, targetID, data){
    	dhxGridRequestOfert.clearAll();
        if(!gf_IsNull(data.data.records)){
        	dhxGridRequestOfert.parse(data.data.records, 'js');
        } else {
           // gf_DivMsgAlert(gv_MsgNoData);
        }
        //$("#spanCnt").text(data.data.records.length);
      //  cf_SetEventListener();
    };
 
    var fn_RemoveOne = function(){
        var projectNos = [];
        projectNos.push( gf_FormGetValue('saveFormMtaRequstRequestDetail', 'projectNo', 'text') );
        var requstNos = [];
        requstNos.push( gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstNo', 'text') );
        fn_RemoveMtaRequst( projectNos, requstNos );
    };
    
    var fn_RemoveMtaRequst = function ( projectNos, requstNos ){
        var jsonParameter = {
            projectNos : projectNos.join(','),
            requstNos : requstNos.join(',')
        };

        var dataSource = gf_NoAsyncTransaction('mtamat001/removeMtaRequst', jsonParameter, 'POST');
        if(dataSource.code === '000') {
            gf_DivMsgAlert(gv_MsgDelete);
            $('#bpopupMaintRequst .b-close').click();
        }

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
    
    var fn_CheckMtaRequstDetail = function (col){
        var resArr = [];
        var colIdx = gf_GetDhxGridColumId(dhxGridRequestOfert, col);
        dhxGridRequestOfert.forEachRow(function(rowId) {
            if(dhxGridRequestOfert.cells(rowId,0).isChecked()){
                resArr.push( dhxGridRequestOfert.cells(rowId,colIdx).getValue() );
            }
        });
        return resArr;
    };
    
    var fn_RemoveAllRequstDetail = function(){
        var requstNos = fn_CheckMtaRequstDetail('requstNo');
        var opertSns = fn_CheckMtaRequstDetail('opertSn');
        fn_RemoveMtaRequstDetail( requstNos, opertSns );
    };

    var fn_RemoveMtaRequstDetail = function ( requstNos, opertSns ){
        var jsonParameter = {
        	requstNos : requstNos.join(','),
        	opertSns : opertSns.join(',')
        };

        var dataSource = gf_NoAsyncTransaction('mtamat001/removeMtaRequstOpert', jsonParameter, 'POST');
        if(dataSource.code === '000') {
            gf_DivMsgAlert(gv_MsgDelete);
            fn_SearchGridListRequestDetail();
        }

    };
    
    var cf_InitInputFormRequestDetail = function (){

        projectNo = '';
        requstNo = '';

        $("#h4_pr_title").text(titMtaRequst + ' ' + gv_TitRegist);
        $('#saveFormMtaRequstRequestDetail input[name="projectNo"]').removeAttr("disabled");
        $('#saveFormMtaRequstRequestDetail input[name="requstNo"]').removeAttr("disabled");
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'projectNo', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstNo', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstStep', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstDt', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstDept', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstTelno', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstEmail', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'comptRequstDt', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstCn', '', 'textarea');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'priorTy', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstTy', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'drctrEmpno', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'drctCn', '', 'textarea');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'atchmnfl', '', 'textarea');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'opertorEmpno', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'opertTy', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'confmerNm', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'comptConfmDt', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'comptConfmAt', false, 'chkbox');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'confmOpn', '', 'textarea');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'stsfdgLevel', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'compNm', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'drctrEmpNm', '', 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'opertorEmpNm', '', 'text');
        
        dhxInputFormRequstStepCodeComboRequestDetail.unSelectOption();
        dhxInputFormRequstTyCodeComboRequestDetail.unSelectOption();
        dhxInputFormPriorTyCodeComboRequestDetail.unSelectOption();
        dhxInputFormOpertTyCodeComboRequestDetail.unSelectOption();
        dhxInputFormStsfdgLevelCodeComboRequestDetail.unSelectOption();
        
        $('#spanDel').hide();
        $('#spanReset').show();
    };
    
    
    var fn_FindRequestDetail = function() {
    	
    	var projectNo = '${projectNo}';
    	var requstNo = '${requstNo}'; 
    	
        if( !gf_IsNull(projectNo) && !gf_IsNull(requstNo) ) {
        	
        	var jsonParameter = {
                    projectNo : projectNo,
                    requstNo : requstNo 
            };
        	
        	gf_Transaction( projectNo, 'mtamat001/findMtaRequst', jsonParameter, 'fn_SearchInputMtaRequst', false );
        	
        } else {
            $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
        }
    }
    
    var fn_SearchInputMtaRequst = function (strSvcID, targetID, data){

		var data = data.data;

        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'projectNo', data.projectNo, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstStep', data.requstStep, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstNo', data.requstNo, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'compNm', data.compNm, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstDt', data.requstDt, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstDept', data.requstDept, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstTelno', data.requstTelno, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstEmail', data.requstEmail, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'comptRequstDt', data.comptRequstDt, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstCn', data.requstCn, 'textarea');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'priorTy', data.priorTy, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'requstTy', data.requstTy, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'drctrEmpno', data.drctrEmpno, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'drctrEmpNm', data.drctrEmpNm, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'drctCn', data.drctCn, 'textarea');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'atchmnflList', data.atchmnflList, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'atchmnfl', data.atchmnflList, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'opertorEmpno', data.opertorEmpno, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'opertorEmpNm', data.opertorEmpNm, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'opertTy', data.opertTy, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'confmerNm', data.confmerNm, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'comptConfmDt', data.comptConfmDt, 'text');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'comptConfmAt', (( data.comptConfmAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'confmOpn', data.confmOpn, 'textarea');
        gf_FormSetValue('saveFormMtaRequstRequestDetail', 'stsfdgLevel', data.stsfdgLevel, 'text');
                    
        gf_DhxSetValue(dhxInputFormRequstStepCodeComboRequestDetail,"combox", data.requstStep, '', '');            
        gf_DhxSetValue(dhxInputFormPriorTyCodeComboRequestDetail,"combox", data.priorTy, '', '');
        gf_DhxSetValue(dhxInputFormRequstTyCodeComboRequestDetail,"combox", data.requstTy, '', '');
        gf_DhxSetValue(dhxInputFormOpertTyCodeComboRequestDetail,"combox", data.opertTy, '', '');
        gf_DhxSetValue(dhxInputFormStsfdgLevelCodeComboRequestDetail,"combox", data.stsfdgLevel, '', ''); 
        
        $('#saveFormMtaRequstRequestDetail input[name="projectNo"]').attr("disabled", true);
        $('#saveFormMtaRequstRequestDetail input[name="requstNo"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);
        
    	var jsonParameter = { atchFiles : data.atchmnflList };
		gf_Transaction(atchmnflList, 'file/searchFiles', jsonParameter, 'fn_SearchInputMtaRequstFile', false);

    };
      
    var fn_SearchInputMtaRequstFile = function (strSvcID, targetID, data){
    	
    	$('#fileList3 .file_box table tr').remove();
		uploadedFileKeys3 = [];
		uploadedFileInfo3 = [];
		
		var atchFileList = [];
		var idx = 0;
		$.each( data.data, function( key, value ) {
			uploadedFileKeys3.push(value.atchFileId);				
			uploadedFileInfo3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
			
			atchFileList.push('<tr>');
			atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
			atchFileList.push('<td class="ac">'+gf_FileSizeExpression(value.fileSize)+'</td>');
			atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');
			
			idx++;
		});
	
		if(gf_IsNull(atchFileList)) {				
			atchFileList.push('<tr>');
			atchFileList.push('<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>');				
			atchFileList.push('</tr>');								
		}
		
		$('#fileList3 .file_box table').append(atchFileList.join(""));
		$('#atchFileIds3').val(uploadedFileKeys3.join("|"));
		
		fn_FileUploadBtnEventRequestDetail();
    };
    
    var fn_MatOpertPopup = function (formId, codeId, codeNmId, param) {
    	
    	var userId = ""; 
    	var title  = "작업결과";
    	
    	var opertSn = param;
    	var projectNo = gf_FormGetValue('saveFormMtaRequstRequestDetail', 'projectNo', 'text');
    	var requstNo = gf_FormGetValue('saveFormMtaRequstRequestDetail', 'requstNo', 'text');

    	//저장팝업
    	var dhxWindowObj;
    	var dhxWindowsMaintRequstOpert;
    	if($('body').find("div[id='bpopupMaintRequstOpert']").size() <= 0) {
    		$('body').append("<div id='bpopupMaintRequstOpert' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
    	}
    	$('#bpopupMaintRequstOpert').bPopup({
    		onOpen:function(){
    			dhxWindowsMaintRequstOpert = new dhtmlXWindows();
    			var id 		= 'bpopupMaintRequstOpert';
    			var ajaxUrl = gv_ContextPath+'/mtamat001/MtaRequstOpertPop/view?projectNo=' + projectNo+'&requstNo='+requstNo+'&opertSn='+opertSn;
    			var left	= 0;
    			var top		= 0;
    			var width	= 600;
    			var height	= 300;

    			dhxWindowObj = dhxWindowsMaintRequstOpert.createWindow(id, left, top, width, height);
    			dhxWindowsMaintRequstOpert.window(id).centerOnScreen();
    			dhxWindowObj.setText(title);
    			dhxWindowObj.attachURL(ajaxUrl, true, true);
    			//dhxWindowObj.attachObject('btnSearch', true);
    			dhxWindowObj.detachObject(true);
    			dhxWindowObj.attachEvent("onClose", function(win){
    				$('#bpopupMaintRequstOpert .b-close').click();
    			});
    		},
    		onClose:function(){
    			dhxWindowsMaintRequstOpert.unload();
    			$('body').find("div[id='bpopupMaintRequstOpert']").remove();
    			fn_SearchGridListRequestDetail();
    		}
    	},function(){});
    	return dhxWindowObj;
    };
    
    
	$(function() {
    	
        cf_InitParamRequestDetail();
        cf_SetComponentsRequestDetail();
        cf_SetEventListenerRequestDetail();
        cf_InitFormRequestDetail();
        cf_SetBindingMhsDeptRequestDetail();
        fn_FileUploadBtnEventRequestDetail();	
        
        fn_FindRequestDetail();
    });

    </script>

	<div id="saveForm" style="width: 95%; margin: 12px">
		<div class="list_top01" id="tabbarObj" style="width: 1000px; height: 600px;">
			<div>
				<div class="detail_type02">
					<form id="saveFormMtaRequstRequestDetail">
						<table>
							<colgroup>								 
								<col width="100px"/>
								<col width="233px"/>
								<col width="100px"/>
								<col width="233px"/>
								<col width="100px"/>
								<col width="233px"/>
							</colgroup>
							<tr>
								<th>거래처</th>
								<td>
									<input type="hidden" name="requstNo" id="requstNo" maxlength="15" /> 
									<input type="hidden" name="projectNo" id="projectNo" maxlength="15" /> 
									<input required type="text" name="compNm" id="compNm" maxlength="100" style="width: 200px" readOnly>
									<button type="button" id="btnCompNmSearch" class="btn_common03">
										<span class="glyphicon  glyphicon glyphicon-search"></span>
									</button>
								</td>
								<th>요청자</th>
								<td><input required type="text" name="requstDept" id="requstDept" maxlength="5" style="width: 100px" /></td>
								<th>연착처</th>
								<td><input type="text" name="requstTelno" id="requstTelno" maxlength="18" style="width: 150px" /></td>

							</tr>
							<tr>
								<th>장애유형</th>
								<td><div id="divInputFormComboRequstTyCodeBox" class="div_combo"></div></td>
								<th>요청일</th>
								<td><input type="text" name="requstDt" id="requstDt" maxlength="10" class="input_calen"></td>
								<th>우선순위</th>
								<td><div id="divInputFormComboPriorTyCodeBox" class="div_combo"></td>
							</tr>
							<tr>
								<th>이메일</th>
								<td><input type="text" name="requstEmail" id="requstEmail" maxlength="100" style="width: 250px" /></td>
								<th>완료요구일</th>
								<td><input type="text" name="comptRequstDt" id="comptRequstDt" maxlength="10" class="input_calen"></td>
								<th>작업유형</th>
								<td><div id="divInputFormComboOpertTyCodeBox" class="div_combo"></div></td>
							</tr>
							<tr>
								<th>요청내용</th>
								<td colspan="5">
									<textarea required name="requstCn" id="requstCn" rows="3" cols="140"></textarea></td>
							</tr>						
							<tr>
								<th class="ar">파일정보</th>
								<td colspan="5" id="fileList3">									
									<input type="hidden" name="atchmnflList" id="atchmnflList" />
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
								<col width="80px"/>
								<col width="233px"/>
								<col width="80px"/>
								<col width="233px"/>
								<col width="80px"/>
								<col width="233px"/>
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
									<button type="button" id="btnKorNmSearch1"
										class="btn_common03">
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
									<col width="80px"/>
									<col width="233px"/>
									<col width="80px"/>
									<col width="233px"/>
									<col width="80px"/>
									<col width="233px"/>
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
						<button type="button" id="btnFormRemoveRequst" class="btn_common01">
							<span class="glyphicon glyphicon-trash mr5"> </span>
							<taglibs:transText progrmId="default" key="btnDelete" />
						</button>
					</span>
				</div>
			</div>
		</div>
		<!-- a1_end -->

	</div>

	<div id="saveFormOfert" style="margin-left: 12px;">
		<div class="list_top01" id="tabbarObj" style="width: 95%; height: 140px;">
			<div class="detail_type02">
				<form id="saveFormMtaRequstOfert">
					작업결과 <button type="button" id="btnRowAdd" class="btn_common01">등록</button>
						  <button type="button" id="btnRowDelete" class="btn_common01">삭제</button>
					 <div id="ofertList" style="width: 100%; height: 110px; margin-top: 10px;"></div>
				</form>
			</div>	
		</div>
	</div>
</body>
