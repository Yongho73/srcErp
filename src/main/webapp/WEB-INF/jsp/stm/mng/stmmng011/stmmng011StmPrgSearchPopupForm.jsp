<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	
	var cf_InitParamPopup = function (){
		
	    gf_ComboCode('divComboSysSePopup', 'jobClsCode', 'jobClsCode', 'reg', 'C001', '' , '', '', 'asc', ''); //업무구분
	    gf_ComboCode('divComboReqSePopup', 'requstSeCode', 'requstSeCode', 'reg', 'C100', '' , '', '', 'asc', ''); //요청구분
	    gf_ComboCode('divComboSttusSePopup', 'progrsSttusCode', 'progrsSttusCode', 'reg', 'C099', '' , '', '', 'asc', ''); //진행상태
	    gf_ComboCode('divComboSttusDePopup', 'dsmsslResnCode', 'dsmsslResnCode', 'reg', 'C194', '' , '', '', 'desc', ''); //기각사유
	    gf_ComboCode('divComboPriorRankPopup', 'priorRank', 'priorRank', 'reg', 'C923', '' , '', '', 'desc', ''); //우선순위
	    
	    $("#progrmNm").prop("disabled", true);
						
		//신규등록일 경우 초기값 설정 
		var imprvmrequstSn = '${imprvmrequstSn}';	
		var progrmId = '${progrmId}';	

        var jsonParameter = {
	            menuId : progrmId 
	    };

	   	if(!gf_IsNull(progrmId)) {
	 		$("#jobClsCode").val(progrmId.substring(0,3)); //업무구분 
	 		$("#progrmId").val(progrmId); 
			//메뉴명 호출하기 위해 
			var menuData = gf_NoAsyncTransaction('stmmng002/findStmMenu', jsonParameter, 'GET');
			$('#progrmNm').val(menuData.data.menuNm);	 		
	 		
	 	}else{
	 		$("#jobClsCode").val("STM"); //기본은 시스템 
	 	}
        
	   	if(gf_IsNull(imprvmrequstSn)) {
        	$("#requstSeCode option:eq(0)").prop("selected", "selected");
        	$("#progrsSttusCode option:eq(4)").prop("selected", "selected");
        	
        	$('#btnPopupPrgDelete').hide();  //  신규등록의 경우 삭제버튼 숨김
        }else{
        	$('#btnPopupPrgDelete').show();
        }
	   	
	   	//필수항목 체크 
 		$("#saveFormStmPrgRequst").validate({ errorElement: 'div', ignore: '' });	   	
	};
    
	
	var cf_SetComponentsPopup = function (){
	    
	};
	

	var cf_SetEventListenerPopup = function (){

		//저장 
	    $('#btnPopFormPrgSave').unbind('click').bind('click', function() {
	    	fn_checkDate();
	    });		
		
	    $('#btnPopupPrgDelete').unbind('click').bind('click', function() {
	    	var imprvmrequstSn =gf_FormGetValue('saveFormStmPrgSearch', 'imprvmrequstSn', 'text');
	        if( gf_IsNull(imprvmrequstSn) ) {
	             gf_DivMsgAlert(gv_MsgDelKey);
	             return false;
	        } else {
	            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveStmPrgSearch()', '');
	        }
	    });
		
	    $('#saveFormStmPrgSearch select[name="dsmsslResnCode"]').unbind('click blur').bind('click blur', function() {
	       var dsmsslResnCode = $('#dsmsslResnCode').val();
	       if(gf_IsNull(dsmsslResnCode)){
	    	  
	       }else{

	    	   $('#progrsSttusCode').val('120');
	    	   $('#comptDe').val(gv_Curdate);
	    	   //divComboSttusSePopup 진행상태
	       }
	  
	       
	    });
	    
		//메뉴찾기 
	    $('#btnProgramSearch').unbind('click').bind('click', function() {
	    	fn_MenuList('formPop1','','', '',fn_CallbackMenuPopup);
	    });	    
		
	    //팝업창 닫기
	    $('#btnPopupPrgClose').unbind('click').bind('click', function() {
	    	$('#bpopupPrgSearch .b-close').click();
	    });
	    
	    //첩부파일
	    $('#btnFileUploadSaveFormStmPrgRequst').unbind('click').bind('click', function() {
	        gf_FileUploadPopup(
	                '',     /* eventFunction */
	                '',     /* deleteBtnClassNm */
	                'saveFormStmPrgSearch',     /* viewDivId */
	                'atchmnflSaveFormStmPrgRequst',     /* dataDivId */
	                [],     /* keyArr */
	                [],     /* infoArr */
	                0,
	                'all',
	                'fn_CallbackFileUploadSaveFormStmPrgSearch');
	    }); 
		
	};
	
	//달력셋팅 
	var cf_calendarInitPopup = function(){
		
		
	    $('#saveFormStmPrgSearch .input_calen').unbind('keyup').bind('keyup', function(event){
	    	//날짜 유효성체크 
	    	dateValidateChkPopup($(this));
	    });
	    
		//요청일자
		var dhxCCalendarDatePop1 = new dhtmlXCalendarObject({input:"requstDe", button:"startDateIcon"});
		dhxCCalendarDatePop1.loadUserLanguage("ko");
		dhxCCalendarDatePop1.hideTime();

		//처리일자 
		var dhxCCalendarDatePop2 = new dhtmlXCalendarObject({input:"processPdt", button:"startDateIcon"});
		dhxCCalendarDatePop2.loadUserLanguage("ko");
		dhxCCalendarDatePop2.hideTime();
	
		//확인일자 
		var dhxCCalendarDatePop3 = new dhtmlXCalendarObject({input:"confirmDe", button:"startDateIcon"});
		dhxCCalendarDatePop3.loadUserLanguage("ko");
		dhxCCalendarDatePop3.hideTime();
		
		//접수일자
		var dhxCCalendarDatePop4 = new dhtmlXCalendarObject({input:"rceptDe", button:"startDateIcon"});
		dhxCCalendarDatePop4.loadUserLanguage("ko");
		dhxCCalendarDatePop4.hideTime();
		
		//확인일자 
		var dhxCCalendarDatePop5 = new dhtmlXCalendarObject({input:"comptDe", button:"startDateIcon"});
		dhxCCalendarDatePop5.loadUserLanguage("ko");
		dhxCCalendarDatePop5.hideTime();
	}

	function dateValidateChkPopup(objDate){
		
		var date = objDate.val();
		
		if (date.length == 10) {
			if (!gf_IsDate(date)) {
				  gf_DivMsgAlert("잘못된 날짜입니다. <br/>다시 입력하세요.");
				  objDate.val("");
				  objDate.focus();
				  return;
			}		
		}
	}	
	
	var fn_Save = function(){
		if($('#saveFormStmPrgSearch').validate().form()){
            var jsonParameter = {
                imprvmrequstSn : gf_FormGetValue('saveFormStmPrgSearch', 'imprvmrequstSn', 'text'),
                jobClsCode : gf_FormGetValue('saveFormStmPrgSearch', 'jobClsCode', 'combo'),
                progrmId : gf_FormGetValue('saveFormStmPrgSearch', 'progrmId', 'text'),
                progrmNm : gf_FormGetValue('saveFormStmPrgSearch', 'progrmNm', 'text'),
                requstSeCode : gf_FormGetValue('saveFormStmPrgSearch', 'requstSeCode', 'combo'),
                priorRank : gf_FormGetValue('saveFormStmPrgSearch', 'priorRank', 'combo'),
                progrsSttusCode : gf_FormGetValue('saveFormStmPrgSearch', 'progrsSttusCode', 'combo'),
                dsmsslResnCode : gf_FormGetValue('saveFormStmPrgSearch', 'dsmsslResnCode', 'combo'),
                rqester : gf_FormGetValue('saveFormStmPrgSearch', 'rqester', 'text'),
                requstDe : gf_FormGetValue('saveFormStmPrgSearch', 'requstDe', 'text') .replaceAll('-',''),
                processPdt : gf_FormGetValue('saveFormStmPrgSearch', 'processPdt', 'text') .replaceAll('-',''),
                confirmDe : gf_FormGetValue('saveFormStmPrgSearch', 'confirmDe', 'text') .replaceAll('-',''),
                rceptDe : gf_FormGetValue('saveFormStmPrgSearch', 'rceptDe', 'text') .replaceAll('-',''),
                comptDe : gf_FormGetValue('saveFormStmPrgSearch', 'comptDe', 'text') .replaceAll('-',''),
                charger : gf_FormGetValue('saveFormStmPrgSearch', 'charger', 'text'),
                requstDesc : gf_FormGetValue('saveFormStmPrgSearch', 'requstDesc', 'textarea'),                 
                processCn : gf_FormGetValue('saveFormStmPrgSearch', 'processCn', 'textarea'),                   
                atchmnflNo : gf_FormGetValue('saveFormStmPrgSearch', 'atchmnfl', 'text'), //첨부파일 
            };

            var url;
            var  imprvmrequstSn  = gf_FormGetValue('saveFormStmPrgSearch', 'imprvmrequstSn', 'text');
            
            if( !gf_IsNull(imprvmrequstSn) ) {
                url = "stmmng011/modifyStmPrgRequst";
            } else {
                url = "stmmng011/saveStmPrgRequst";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(imprvmrequstSn)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                    $('#bpopupPrgSearch .b-close').click();
                    fn_SearchInputStmPrgSearch(); //재조회 
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    $('#bpopupPrgSearch .b-close').click();
                }
                
                fn_SearchGridList(); //부모창 새로고침               
            }
        }

        $('#saveFormStmPrgRequst div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
	};
	
	//상세정보 		
	var fn_SearchInputStmPrgSearch = function (){

    	var imprvmrequstSn = '${imprvmrequstSn}';
    	var progrmId = '${progrmId}';
    	
	    if( !gf_IsNull(imprvmrequstSn) ) {

	        var jsonParameter = {
	            imprvmrequstSn : imprvmrequstSn 
	        };

	        var dataSource = gf_NoAsyncTransaction('stmmng011/findStmmng011', jsonParameter, 'GET');
	        var data = dataSource.data;

	        gf_FormSetValue('saveFormStmPrgSearch', 'imprvmrequstSn', data.imprvmrequstSn, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'jobClsCode', data.jobClsCode, 'combo');
	        gf_FormSetValue('saveFormStmPrgSearch', 'progrmId', data.progrmId, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'progrmNm', data.progrmNm, 'text'); 
	        gf_FormSetValue('saveFormStmPrgSearch', 'requstSeCode', data.requstSeCode, 'combo');
	        gf_FormSetValue('saveFormStmPrgSearch', 'priorRank', data.priorRank, 'combo');
	        gf_FormSetValue('saveFormStmPrgSearch', 'progrsSttusCode', data.progrsSttusCode, 'combo');
	        gf_FormSetValue('saveFormStmPrgSearch', 'dsmsslResnCode', data.dsmsslResnCode, 'combo');
	        gf_FormSetValue('saveFormStmPrgSearch', 'rqester', data.rqester, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'requstDe', data.requstDe, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'processPdt', data.processPdt, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'confirmDe', data.confirmDe, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'rceptDe', data.rceptDe, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'comptDe', data.comptDe, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'charger', data.charger, 'text');
	        gf_FormSetValue('saveFormStmPrgSearch', 'requstDesc', data.requstDesc, 'textarea');	        
	        gf_FormSetValue('saveFormStmPrgSearch', 'processCn', data.processCn, 'textarea');	
	        fn_SearchFileUploadSaveFormStmPrgRequst(data.atchmnflNo, 'saveFormStmPrgSearch', 'atchmnflSaveFormStmPrgRequst');	        
	    }
	    fn_sessionCheck();
	};
	
	
	
	
	//초기화 함수 
	var cf_InitInputForm = function (){

		var imprvmrequstSn = '${imprvmrequstSn}';	
        if(!gf_IsNull(imprvmrequstSn)) {
        	 fn_SearchInputStmPrgSearch(); //상세정보
        } else {
        	 $("#saveFormStmPrgSearch")[0].reset();
        }		
		
	};	
	
	 
     	
	
	//메뉴 팝업창 
	var $menuInfo = {};  //공통코드 
	var fn_MenuList = function (formId, codeId, codeNmId, param,strCallbackFunc) {
		
		var title  = "메뉴목록";
		
		$menuInfo = {};
		
		var dhxWindowObj;
		var dhxWindowsMenuList;
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
	    
		if($('body').find("div[id='bpopupMenuList']").size() <= 0) {
			$('body').append("<div id='bpopupMenuList' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
		}
		
		$('#bpopupMenuList').bPopup({
			onOpen:function(){
				
				dhxWindowsMenuList = new dhtmlXWindows();
				var id 		= 'bpopupMenuList';
				var ajaxUrl = gv_ContextPath+'/stmmng002/popup/stmMenuListPopup/view?'+param;
				var left	= 500;
				var top		= 500;
				var width	= 600;
				var height	= 500;
				
				dhxWindowObj = dhxWindowsMenuList.createWindow(id, left, top, width, height);
				dhxWindowsMenuList.window(id).centerOnScreen();
				dhxWindowObj.setText(title);
				dhxWindowObj.attachURL(ajaxUrl, true, true);
				dhxWindowObj.detachObject(true);
				dhxWindowObj.attachEvent("onClose", function(win){
					$('#bpopupMenuList .b-close').click();
				});
			},
			onClose:function(){
				if ( !gf_IsNull(callFunction) ) {
	                callbacks.empty();
	                callbacks.add(callFunction);
	                callbacks.fire($menuInfo);
	            }
				dhxWindowsMenuList.unload();
				$('body').find("div[id='bpopupMenuList']").remove();			
			}
		},function(){});
		return dhxWindowObj;
	};
	
	var fn_RemoveStmPrgSearch = function (){
		var imprvmrequstSns = [];
		var imprvmrequstSn =gf_FormGetValue('saveFormStmPrgSearch', 'imprvmrequstSn', 'text');
		imprvmrequstSns.push( imprvmrequstSn );
		
		var jsonParameter = {
	        imprvmrequstSns : imprvmrequstSns.join(',')
	    };

	    var dataSource = gf_NoAsyncTransaction('stmmng011/removeStmPrgRequst', jsonParameter, 'POST');
	    if(dataSource.code === '000') {
	    	gf_DivMsgAlert(gv_MsgDelete);
	    	$('#bpopupPrgSearch .b-close').click();
	    	fn_SearchGridList();		    
	    }	   
	};
	
	var fn_CallbackMenuPopup = function(data) {

        gf_FormSetValue('saveFormStmPrgSearch', 'progrmId', data.menuId, 'text');
        gf_FormSetValue('saveFormStmPrgSearch', 'progrmNm', data.menuNm, 'text');
    };
	
	
	
	/**********************************************************파일 핸들링 시작**************************************************************/
	var uploadedFileKeys = [];
	var uploadedFileInfo = [];
	var fn_CallbackFileUploadSaveFormStmPrgSearch = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
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
	
	var fn_sessionCheck = function(){
		//세션정보 
        var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
        
        var rqester = gf_FormGetValue('saveFormStmPrgSearch', 'rqester', 'text');
        var sessionNm = userInfo.data.userNm;
        
        if(rqester != sessionNm) {
            $("#jobClsCode").prop("disabled", true);
            $("#requstSeCode").prop("disabled", true);
            $("#priorRank").prop("disabled", true);
            $("#btnProgramSearch").prop("disabled", true);
            $("#rqester").prop("disabled", true);
            $("#requstDe").prop("disabled", true);
            $("#requstDesc").prop("disabled", true);
        } else if(rqester == sessionNm) {
            $("#jobClsCode").prop("disabled", false);
            $("#requstSeCode").prop("disabled", false);
            $("#priorRank").prop("disabled", false);
            $("#btnProgramSearch").prop("disabled", false);
            $("#rqester").prop("disabled", false);
            $("#requstDe").prop("disabled", false);
            $("#requstDesc").prop("disabled", false);
        }
	};
	
	var fn_checkDate = function(){
		var rceptDe = gf_FormGetValue('saveFormStmPrgSearch', 'rceptDe', 'text');
		var processPdt = gf_FormGetValue('saveFormStmPrgSearch', 'processPdt', 'text');
		var comptDe = gf_FormGetValue('saveFormStmPrgSearch', 'comptDe', 'text');
		var comp1 = 'true';
		var comp2 = 'true';
		var comp3 = 'true';
		if(!gf_IsNull(rceptDe)){
            var requstDe = gf_FormGetValue('saveFormStmPrgSearch', 'requstDe', 'text');
            var startDateArr = requstDe.split('-');
            var endDateArr = rceptDe.split('-');

            var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
            var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
                     
            if(startDateCompare.getTime() > endDateCompare.getTime()) {
                gf_DivMsgAlert("접수일자가 요청일자보다 작을 수 없습니다.");
                comp1 = 'false';
            } else{
            	comp1 = 'true';
            }
        }
		if(!gf_IsNull(processPdt)){
            var requstDe = gf_FormGetValue('saveFormStmPrgSearch', 'requstDe', 'text');
            var startDateArr = requstDe.split('-');
            var endDateArr = processPdt.split('-');

            var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
            var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
                     
            if(startDateCompare.getTime() > endDateCompare.getTime()) {
                gf_DivMsgAlert("처리예정일자가 요청일자보다 작을 수 없습니다.");
                comp2 = 'false';
            } else {
            	comp2 = 'true';
            }
		}
		if(!gf_IsNull(processPdt)){
            var requstDe = gf_FormGetValue('saveFormStmPrgSearch', 'requstDe', 'text');
            var startDateArr = requstDe.split('-');
            var endDateArr = comptDe.split('-');

            var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
            var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
                     
            if(startDateCompare.getTime() > endDateCompare.getTime()) {
                gf_DivMsgAlert("완료일자가 요청일자보다 작을 수 없습니다.");
                comp3 = 'false';
            } else {
                comp3 = 'true';
            }
        }
		if(comp1 == 'true' && comp2 == 'true' && comp3 == 'true') { 
			fn_Save();
		}
	};
	
    $(function() {
        cf_InitParamPopup();
        cf_calendarInitPopup();  
        cf_SetComponentsPopup();    
        cf_SetEventListenerPopup();    
        fn_SearchInputStmPrgSearch(); //상세정보     
        if(gf_IsNull($('#rceptDe').val())){
           $('#rceptDe').val(gv_Curdate); //오늘날짜 셋팅 
        }          
    });
	
    </script>
        <div class="pop-content">
		<div>
        <form id="saveFormStmPrgSearch">
				<div class="detail_type01">
					
						<table>
							<colgroup>								 
								<col width="10%"/>
								<col width="25%"/>
								<col width="10%"/>
								<col width="25%"/>
								<col width="10%"/>
								<col width="25%"/>
							</colgroup>
                            <input type="hidden" name="imprvmrequstSn" id="imprvmrequstSn" /> 
							<tr>
								<th class="essential_icon">업무분류</th>
								<td><div id="divComboSysSePopup"></div></td>
								<th class="essential_icon">메뉴ID</th>
								<td><input required type="text" name="progrmNm" id="progrmNm"  class="w150" /><input type="hidden" name="progrmId" id="progrmId" />
								<button type="button" id="btnProgramSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
								</td>
								<th>요청구분</th>
								<td><div id="divComboReqSePopup"></div></td>
							</tr>
							<tr>
								<th>우선순위</th>
								<td><div id="divComboPriorRankPopup"></div></td> 
                                <th>요청자</th>
                                <td><input required type="text" name="rqester" id="rqester"  class="w100"/>
								<th class="essential_icon">진행상태</th>
								<td><div id="divComboSttusSePopup"></div></td>	
							</tr>
							<tr>
								<th>요청일자</th>
								<td><input type="text" name="requstDe" id="requstDe" required maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/></td>
								<th>확인일자</th>
								<td colspan="3"><input type="text" name="confirmDe" id="confirmDe" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
							</tr>							
							<tr>
								<th class="essential_icon">요청내용</th>
								<td colspan="5"><textarea required name="requstDesc" id="requstDesc" style="width:99%; height:70px"></textarea></td>
							</tr>
							</table>
                            </div>
                            
                            <div class="detail_type01" style="margin-top: 20px;">
                            <table >
                            <colgroup>                               
                                <col width="10%"/>
                                <col width="25%"/>
                                <col width="10%"/>
                                <col width="25%"/>
                                <col width="10%"/>
                                <col width="25%"/>
                            </colgroup>
                            <tr>
                                <th>접수일자</th>
                                <td><input type="text" name="rceptDe" id="rceptDe" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/></td>
								<th>처리예정일자</th>
                                <td><input type="text" name="processPdt" id="processPdt" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
                                <th>완료일자</th>
								<td><input type="text" name="comptDe" id="comptDe" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
							</tr>
                            <tr>
                                <th>개발담당자</th>
                                <td><input type="text" name="charger" id="charger" maxlength="20" class="w100" /></td>
                                <th>기각사유</th>
                                <td colspan = "3"><div id="divComboSttusDePopup"></div></td>  
                            </tr>			
							<tr>
								<th>처리내용</th>
								<td colspan="5">
									<textarea name="processCn" id="processCn" style="width:99%; height:70px"></textarea>
                                </td>
							</tr>
							<tr>
                                <th>
                                    <button type="button" class="btn_common02" id="btnFileUploadSaveFormStmPrgRequst">
                                    <span class="glyphicon glyphicon-paperclip"></span>첨부파일
                                    </button>
                                </th>
                                <td colspan="5">
                                    <input type="hidden" name="atchmnfl" id="atchmnflSaveFormStmPrgRequst"/>
                                    <div class="file_box" style="width:100%; height:50px">
                                        <table style="border:0px">
                                            <colgroup>
                                                <col width="*" />
                                                <col width="80" />
                                                <col width="63" />
                                            </colgroup> 
                                            <tr>
                                            <td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>
                                            </tr>                   
                                        </table>
                                    </div>
                                </td>                                 
                            </tr>
						</table>
                        </div>								 
					</form>
			</div>
		<div>
			
            <div class="popup_footer_box" style="margin-top: 20px;">
            	<button type="button" id="btnPopFormPrgSave" name="btnPopFormPrgSave">
                      <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span><taglibs:transText progrmId="default" key="btnSave" />
                </button>
                <button type="button" id="btnPopupPrgDelete" name="btnPopupPrgDelete">
                      <span class="glyphicon glyphicon-remove f15 mr5"></span><taglibs:transText progrmId="default" key="btnDelete" />
                </button>                
                <button type="button" id="btnPopupPrgClose" name="btnPopupPrgClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span><taglibs:transText progrmId="default" key="btnClose" />
                </button>
			</div>
		</div>
	</div>
    </div>
</body>
