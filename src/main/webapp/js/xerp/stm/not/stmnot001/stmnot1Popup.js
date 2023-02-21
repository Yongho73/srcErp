
    var noticeId;
	
	var cf_InitParamPopup = function (){
			
	    gf_ComboCode('divComboNoticeKindPopup', 'noticeKind', 'noticeKind', 'reg', 'C195', '' , '', '', 'ordr', ''); 
	    gf_ComboCode('divComboNoticeTrgetSePopup', 'noticeTrgetSe', 'noticeTrgetSe', 'reg', 'C198', '' , '', '', 'ordr', '');
	    
	    //세션정보 
		var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
		$('#writerNm').val(userInfo.data.userNm);
		$('#writerId').val(userInfo.data.userEmpNo);
		$('#regDt').val(new Date().format('YYYY-MM-DD'));
						
		//신규등록일 경우 초기값 설정 
		noticeId = '${noticeId}';		 		
	   	
	   	//필수항목 체크 
 		$("#saveFormPjtMtaRequst").validate({ errorElement: 'div', ignore: '' });	   	
	};
    
	var dhxGridStmnotTr;
	var cf_SetComponentsPopup = function (){
		var dhxGridStmnotEmpHeaderInfo = [];
		dhxGridStmnotEmpHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
		dhxGridStmnotEmpHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmnot001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
		dhxGridStmnotEmpHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '130', 'left', 'str', 'ro', false, 'noticeTit', '', '')); /* gf_LocaleTrans('default', 'titNoticeTit') */
		dhxGridStmnotEmpHeaderInfo.push(gf_MakeDhxGridHeader('성명', '130', 'left', 'int', 'ro', false, 'inqireCo', '', '')); /* gf_LocaleTrans('default', 'titInqireCo') */
		dhxGridStmnotEmpHeaderInfo.push(gf_MakeDhxGridHeader('부서', '220', 'left', 'str', 'ro', false, 'writerNm', '', '')); /* gf_LocaleTrans('default', 'titWriterId') */
// 	    dhxGridStmnotEmp = gf_MakeDhxGrid('dataListStmnotEmp', dhxGridStmnotEmpHeaderInfo, true, false, false);
// 	    dhxGridStmnotEmp.enableAutoWidth(false);
// 	    dhxGridStmnotEmp.setEditable(true);
	    
	    var dhxGridStmnotDeptHeaderInfo = [];
	    dhxGridStmnotDeptHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
	    dhxGridStmnotDeptHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmnot001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
	    dhxGridStmnotDeptHeaderInfo.push(gf_MakeDhxGridHeader('부서코드', '240', 'left', 'str', 'ro', false, 'noticeTit', '', '')); /* gf_LocaleTrans('default', 'titNoticeTit') */
	    dhxGridStmnotDeptHeaderInfo.push(gf_MakeDhxGridHeader('부서명', '130', 'left', 'int', 'ro', false, 'inqireCo', '', '')); /* gf_LocaleTrans('default', 'titInqireCo') */
	    dhxGridStmnotDeptHeaderInfo.push(gf_MakeDhxGridHeader('부서', '220', 'left', 'str', 'ro', false, 'writerNm', '', '')); /* gf_LocaleTrans('default', 'titWriterId') */
//         dhxGridStmnotDept = gf_MakeDhxGrid('dataListStmnotDept', dhxGridStmnotDeptHeaderInfo, true, false, false);
//         dhxGridStmnotDept.enableAutoWidth(false);
//         dhxGridStmnotDept.setEditable(true);

	    return true; 
	};
	

	var cf_SetEventListenerPopup = function (){

		//저장 
	    $('#btnPopFormPrgSave').unbind('click').bind('click', function() {

	        if($('#saveFormPjtMtaRequst').validate().form()){
	            var jsonParameter = {
	                projectSn : gf_FormGetValue('saveFormPjtMtaRequst', 'projectSn', 'text'),
	                requstSn : gf_FormGetValue('saveFormPjtMtaRequst', 'requstSn', 'text'),
	                rqester : gf_FormGetValue('saveFormPjtMtaRequst', 'rqester', 'text'),
	                rqesterTelno : gf_FormGetValue('saveFormPjtMtaRequst', 'rqesterTelno', 'text'),
	                rqesterEmail : gf_FormGetValue('saveFormPjtMtaRequst', 'rqesterEmail', 'text'),
	                requstTy : gf_FormGetValue('saveFormPjtMtaRequst', 'requstTy', 'combo'),
	                requstDt : gf_FormGetValue('saveFormPjtMtaRequst', 'requstDt', 'text') .replaceAll('-',''),
	                priorRank : gf_FormGetValue('saveFormPjtMtaRequst', 'priorRank', 'combo'),
	                comptRequstDt : gf_FormGetValue('saveFormPjtMtaRequst', 'comptRequstDt', 'text') .replaceAll('-',''),
	                opertTy : gf_FormGetValue('saveFormPjtMtaRequst', 'opertTy', 'combo'),
	                requstCn : gf_FormGetValue('saveFormPjtMtaRequst', 'requstCn', 'textarea'),
	                atchmnflSn : gf_FormGetValue('saveFormPjtMtaRequst', 'atchmnfl', 'text'), //첨부파일 
	                drctrEmpno : gf_FormGetValue('saveFormPjtMtaRequst', 'drctrEmpno', 'text'), 
	                opertorEmpno : gf_FormGetValue('saveFormPjtMtaRequst', 'opertorEmpno', 'text'), 
	                requstStep : gf_FormGetValue('saveFormPjtMtaRequst', 'requstStep', 'combo'),
	                drctCn : gf_FormGetValue('saveFormPjtMtaRequst', 'drctCn', 'textarea'),
	            };

	            var url;
	            var  requstSn  = gf_FormGetValue('saveFormStmPrgRequst', 'requstSn', 'text');
	            
	            if( !gf_IsNull(requstSn) ) {
	                url = "pjtmta001/modifyPjtMtaRequst";
	            } else {
	                url = "pjtmta001/savePjtMtaRequst";
	            }

	            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
	            if(dataSource.code === '000') {

	                if(!gf_IsNull(requstSn)) {
	                    gf_DivMsgAlert(gv_MsgUpdate);
	                } else {
	                    gf_DivMsgAlert(gv_MsgRegist);
	                    $('#bpopupMtaRequst .b-close').click();
	                }
	                
	                fn_SearchGridList(); //부모창 새로고침	              
	            }
	        }

	        $('#saveFormStmPrgRequst div.error').unbind("click").bind("click",function() {
	            $(this).remove();
	        });
	    });		
		
	    $('#btnPopupPrgDelete').unbind('click').bind('click', function() {
	    	var imprvmrequstSn =gf_FormGetValue('saveFormStmPrgRequst', 'imprvmrequstSn', 'text');
	        if( gf_IsNull(imprvmrequstSn) ) {
	             gf_DivMsgAlert(gv_MsgDelKey);
	             return false;
	        } else {
	            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveStmPrgRequst()', '');
	        }
	    });
		
		//메뉴찾기 
	    $('#btnProgramSearch').unbind('click').bind('click', function() {
	    	fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
	    });	    
		
	    $('#btnProjectSearch').unbind('click').bind('click', function() {
            fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
        }); 
		
	    //팝업창 닫기
	    $('#btnPopupPrgClose').unbind('click').bind('click', function() {
	    	$('#bpopupStmnotReg .b-close').click();
	    }); 
	    
	    $('#btnDrctrEmpSearch').unbind('click').bind('click', function() {
	    	gf_EmpPopup('saveFormPjtMtaRequst', 'drctrEmpno', 'drctrNm', '1000', 'Y', null);
        });
	    
	    $('#btnOpertorEmpSearch').unbind('click').bind('click', function() {
	    	gf_EmpPopup('saveFormPjtMtaRequst', 'opertorEmpno', 'opertorNm', '1000', 'Y', null);
        });
	    
	    //첩부파일
	    $('#btnFileUploadSaveFormStmPrgRequst').unbind('click').bind('click', function() {
	        gf_FileUploadPopup(
	                '',     /* eventFunction */
	                '',     /* deleteBtnClassNm */
	                'saveFormPjtMtaRequst',     /* viewDivId */
	                'atchmnflSaveFormStmPrgRequst',     /* dataDivId */
	                [],     /* keyArr */
	                [],     /* infoArr */
	                0,
	                'all',
	                'fn_CallbackFileUploadSaveFormStmPrgRequst');
	    }); 
		
	};
	
	//달력셋팅 
	var cf_calendarInitPopup = function(){
	}
	
	//상세정보 		
	var fn_SearchInputStmPrgRequst = function (){

    	var imprvmrequstSn = '${imprvmrequstSn}';
    	var progrmId = '${progrmId}';
    	
	    if( !gf_IsNull(imprvmrequstSn) ) {

	        var jsonParameter = {
	            imprvmrequstSn : imprvmrequstSn 
	        };

	        var dataSource = gf_NoAsyncTransaction('stmmng011/findStmPrgRequst', jsonParameter, 'GET');
	        var data = dataSource.data;

	        gf_FormSetValue('saveFormStmPrgRequst', 'imprvmrequstSn', data.imprvmrequstSn, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'jobClsCode', data.jobClsCode, 'combo');
	        gf_FormSetValue('saveFormStmPrgRequst', 'progrmId', data.progrmId, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'progrmNm', data.progrmNm, 'text'); 
	        gf_FormSetValue('saveFormStmPrgRequst', 'requstSeCode', data.requstSeCode, 'combo');
	        gf_FormSetValue('saveFormStmPrgRequst', 'priorRank', data.priorRank, 'combo');
	        gf_FormSetValue('saveFormStmPrgRequst', 'progrsSttusCode', data.progrsSttusCode, 'combo');
	        gf_FormSetValue('saveFormStmPrgRequst', 'rqester', data.rqester, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'requstDe', data.requstDe, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'processPdt', data.processPdt, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'confirmDe', data.confirmDe, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'rceptDe', data.rceptDe, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'comptDe', data.comptDe, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'charger', data.charger, 'text');
	        gf_FormSetValue('saveFormStmPrgRequst', 'requstDesc', data.requstDesc, 'textarea');	        
	        gf_FormSetValue('saveFormStmPrgRequst', 'processCn', data.processCn, 'textarea');	        
	        fn_SearchFileUploadSaveFormStmPrgRequst(data.atchmnflNo, 'saveFormStmPrgRequst', 'atchmnflSaveFormStmPrgRequst');	        
	    }
	};
	
	
	
	
	//초기화 함수 
	var cf_InitInputForm = function (){

		var imprvmrequstSn = '${imprvmrequstSn}';	
        if(!gf_IsNull(imprvmrequstSn)) {
        	 fn_SearchInputStmPrgRequst(); //상세정보
        } else {
        	 $("#saveFormStmPrgRequst")[0].reset();
        }		
		
	};	
	
	 
     	
	
	//메뉴 팝업창 
	var $projectInfo = {};  //공통코드 
	var fn_ProjectList = function (formId, codeId, codeNmId, param,strCallbackFunc) {
		
		var title  = "프로젝트조회";
		
		$projectInfo = {};
		
		var dhxWindowObj;
		var dhxWindowsProjectList;
		var callbacks = $.Callbacks();
	    var callFunction = null;
	    
	    if ( !gf_IsNull(strCallbackFunc) ) {
	        if(typeof(strCallbackFunc) == "string"){
	                callFunction = eval(strCallbackFunc);
	                if ( typeof callFunction != "function" ) {
	                    gf_DivMsgAlert("call back function "+ strCallbackFunc +" 이 구현되지 않습니다.!!");
	                    return false;
	                }
	        }else{
	                callFunction = strCallbackFunc;
	        }
	    }   
		if($('body').find("div[id='bpopupProjectList']").size() <= 0) {
			$('body').append("<div id='bpopupProjectList' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
		}
		
		$('#bpopupProjectList').bPopup({
			onOpen:function(){
				
				dhxWindowsProjectList = new dhtmlXWindows();
				var id 		= 'bpopupProjectList';
				var ajaxUrl = gv_ContextPath+'/pjtmta001/popup/pjtmta001ProjectListPopup/view?'+param;
				var left	= 500;
				var top		= 500;
				var width	= 650;
				var height	= 550;
				
				dhxWindowObj = dhxWindowsProjectList.createWindow(id, left, top, width, height);
				dhxWindowsProjectList.window(id).centerOnScreen();
				dhxWindowObj.setText(title);
				dhxWindowObj.attachURL(ajaxUrl, true, true);
				dhxWindowObj.detachObject(true);
				dhxWindowObj.attachEvent("onClose", function(win){
					$('#bpopupProjectList .b-close').click();
				});
			},
			onClose:function(){
				if ( !gf_IsNull(callFunction) ) {
	                callbacks.empty();
	                callbacks.add(callFunction);
	                callbacks.fire($projectInfo);
	            }
				dhxWindowsProjectList.unload();
				$('body').find("div[id='bpopupProjectList']").remove();			
			}
		},function(){});
		return dhxWindowObj;
	};
	
	var fn_RemoveStmPrgRequst = function (){
		var imprvmrequstSns = [];
		var imprvmrequstSn =gf_FormGetValue('saveFormStmPrgRequst', 'imprvmrequstSn', 'text');
		imprvmrequstSns.push( imprvmrequstSn );
		
		var jsonParameter = {
	        imprvmrequstSns : imprvmrequstSns.join(',')
	    };

	    var dataSource = gf_NoAsyncTransaction('stmmng011/removeStmPrgRequst', jsonParameter, 'POST');
	    if(dataSource.code === '000') {
	    	gf_DivMsgAlert(gv_MsgDelete);
	    	$('#bpopupPrgRequst .b-close').click();
	    	fn_SearchGridList();		    
	    }	   
	};
	
	var fn_CallbackProjectPopup = function(data) {

	    gf_FormSetValue('saveFormPjtMtaRequst', 'bcncNm', data.bcncNm, 'text');
	    gf_FormSetValue('saveFormPjtMtaRequst', 'projectNm', data.projectNm, 'text');
	    gf_FormSetValue('saveFormPjtMtaRequst', 'projectSn', data.projectSn, 'text');
	    gf_FormSetValue('saveFormPjtMtaRequst', 'rqester', data.bcncChargerNm, 'text');
        gf_FormSetValue('saveFormPjtMtaRequst', 'rqesterTelno', data.chargerCttpc, 'text');
	};

	
	/**********************************************************파일 핸들링 시작**************************************************************/
	var uploadedFileKeys = [];
	var uploadedFileInfo = [];
	var fn_CallbackFileUploadSaveFormStmPrgRequst = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	    if(!gf_IsNull(data)){               
	        uploadedFileKeys = [];
	        uploadedFileInfo = [];
	        $('#'+viewDivId+' .file_box table tr').remove();
	        fn_LoadFileUploadSaveFormStmPrgRequst(data, viewDivId, dataDivId);
	    }
	};

	var fn_SearchFileUploadSaveFormStmPrgRequst = function(atchFiles, viewDivId, dataDivId) {   
	    var jsonParameter = { atchFiles : atchFiles };
	    var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST');   
	    if(!gf_IsNull(dataSource.data)) {
	        uploadedFileKeys = [];
	        uploadedFileInfo = [];
	        $.each( dataSource.data, function( key, value ) {           
	            uploadedFileKeys.push(value.atchFileId);                
	            uploadedFileInfo.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);   
	        });     
	        $('#'+viewDivId+' .file_box table tr').remove();
	        fn_LoadFileUploadSaveFormStmPrgRequst(uploadedFileInfo, viewDivId, dataDivId);  
	    }
	};

	var fn_RemoveFileUploadSaveFormStmPrgRequst = function(obj, viewDivId, dataDivId) {
	    uploadedFileKeys.splice($(obj).attr('idx'), 1);
	    uploadedFileInfo.splice($(obj).attr('idx'), 1); 
	    $('#'+viewDivId+' .file_box table tr').remove();
	    fn_LoadFileUploadSaveFormStmPrgRequst(uploadedFileInfo, viewDivId, dataDivId);
	};

	var fn_LoadFileUploadSaveFormStmPrgRequst = function(data, viewDivId, dataDivId) {      
	    var atchFileList = [];
	    var fileInfos = [];
	    var idx = 0;
	    var arrayEmpty = false;
	    if(gf_IsNull(uploadedFileKeys) && gf_IsNull(uploadedFileInfo)) arrayEmpty = true;
	    $.each( data, function( key, value ) {
	        fileInfos = value.split('|^|');
	        if(arrayEmpty) {
	            uploadedFileKeys.push(fileInfos[0]);                
	            uploadedFileInfo.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);   
	        }       
	        atchFileList.push('<tr>');
	        atchFileList.push('<td style="border:0px"><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
	        atchFileList.push('<td style="border:0px">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
	        atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="fn_RemoveFileUploadSaveFormStmPrgRequst(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
	        atchFileList.push('</tr>');     
	        idx++;
	    }); 
	    if(idx === 0) {
	        atchFileList.push('<tr>');
	        atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
	        atchFileList.push('</tr>');
	    }
	    $('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	    $('#'+dataDivId).val(uploadedFileKeys.join("|"));
	}

	var fn_ClearFileUploadSaveFormStmPrgRequst = function(viewDivId, dataDivId){
	    $('#'+viewDivId+' .file_box table tr').remove();
	    var atchFileList = [];
	    atchFileList.push('<tr>');
	    atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
	    atchFileList.push('</tr>');
	    $('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	    $('#'+dataDivId).val('');   
	};
	/**********************************************************파일 핸들링 끝**************************************************************/
	
	
    
    $(function() {
        cf_InitParamPopup();
//         cf_calendarInitPopup();  
        cf_SetComponentsPopup();    
        cf_SetEventListenerPopup();    
        fn_SearchInputStmPrgRequst(); //상세정보            
        if(gf_IsNull('${imprvmrequstSn}')) {
            $('#requstDe').val(gv_Curdate); //오늘날짜 셋팅 
        }           
    });
