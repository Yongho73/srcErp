<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

	<script>
	
	var cf_InitParamPopup = function (){
			
	    gf_ComboCode('divComboSysSePopup', 'jobClsCode', 'jobClsCode', 'reg', 'C001', '' , '', '', 'asc', ''); //업무구분
	    gf_ComboCode('divComboReqSePopup', 'requstSeCode', 'requstSeCode', 'reg', 'C100', '' , '', '', 'asc', ''); //요청구분
	    gf_ComboCode('divComboSttusSePopup', 'progrsSttusCode', 'progrsSttusCode', 'reg', 'C099', '' , '', '', 'asc', ''); //진행상태
	    gf_ComboCode('divComboPriorRankPopup', 'priorRank', 'priorRank', 'reg', 'C923', '' , '', '', 'desc', ''); //우선순위
	    
	    //세션정보 
		var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
		$('#rqester').val(userInfo.data.userNm);
						
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
	 		$("#jobClsCode").val(""); //기본은 시스템 
	 	}
        
	   	if(gf_IsNull(imprvmrequstSn)) {
        	$("#requstSeCode option:eq(0)").prop("selected", "selected");
        	$("#progrsSttusCode option:eq(2)").prop("selected", "selected");
        	$("#progrsSttusCode").prop("disabled", true);
        	$("#progrmNm").prop("disabled", true);
        	
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

	        if($('#saveFormStmPrgRequst').validate().form()){
	            var jsonParameter = {
	                imprvmrequstSn : gf_FormGetValue('saveFormStmPrgRequst', 'imprvmrequstSn', 'text'),
	                jobClsCode : gf_FormGetValue('saveFormStmPrgRequst', 'jobClsCode', 'combo'),
	                progrmId : gf_FormGetValue('saveFormStmPrgRequst', 'progrmId', 'text'),
	                progrmNm : gf_FormGetValue('saveFormStmPrgRequst', 'progrmNm', 'text'),
	                requstSeCode : gf_FormGetValue('saveFormStmPrgRequst', 'requstSeCode', 'combo'),
	                priorRank : gf_FormGetValue('saveFormStmPrgRequst', 'priorRank', 'combo'),
	                progrsSttusCode : gf_FormGetValue('saveFormStmPrgRequst', 'progrsSttusCode', 'combo'),
	                rqester : gf_FormGetValue('saveFormStmPrgRequst', 'rqester', 'text'),
	                requstDe : gf_FormGetValue('saveFormStmPrgRequst', 'requstDe', 'text') .replaceAll('-',''),
	                processPdt : gf_FormGetValue('saveFormStmPrgRequst', 'processPdt', 'text') .replaceAll('-',''),
	                confirmDe : gf_FormGetValue('saveFormStmPrgRequst', 'confirmDe', 'text') .replaceAll('-',''),
	                rceptDe : gf_FormGetValue('saveFormStmPrgRequst', 'rceptDe', 'text') .replaceAll('-',''),
	                comptDe : gf_FormGetValue('saveFormStmPrgRequst', 'comptDe', 'text') .replaceAll('-',''),
	                charger : gf_FormGetValue('saveFormStmPrgRequst', 'charger', 'text'),
	                requstDesc : gf_FormGetValue('saveFormStmPrgRequst', 'requstDesc', 'textarea'),	                
	                processCn : gf_FormGetValue('saveFormStmPrgRequst', 'processCn', 'textarea'),	                
	                atchmnflNo : gf_FormGetValue('saveFormStmPrgRequst', 'atchmnfl', 'text'), //첨부파일 
	            };

	            var url;
	            var  imprvmrequstSn  = gf_FormGetValue('saveFormStmPrgRequst', 'imprvmrequstSn', 'text');
	            
	            if( !gf_IsNull(imprvmrequstSn) ) {
	                url = "stmmng011/modifyStmPrgRequst";
	            } else {
	                url = "stmmng011/saveStmPrgRequst";
	            }

	            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
	            if(dataSource.code === '000') {

	                if(!gf_IsNull(imprvmrequstSn)) {
	                    gf_DivMsgAlert(gv_MsgUpdate);
	                    fn_SearchInputStmPrgRequst() //재조회 
	                } else {
	                    gf_DivMsgAlert(gv_MsgRegist);
	                    $('#bpopupPrgRequst .b-close').click();
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
	    	var jobClsCode =  $("#jobClsCode").val();
	    	if(gf_IsNull(jobClsCode)) {
	    		gf_DivMsgAlert("업무분류를 선택해 주세요.");
	    		return false;
	    	} else {
	    		fn_MenuList('formPop1','','', '',fn_CallbackMenuPopup, jobClsCode);
	    	}
	    });	    
		
	    //팝업창 닫기
	    $('#btnPopupPrgClose').unbind('click').bind('click', function() {
	    	$('#bpopupPrgRequst .b-close').click();
	    });
	    
	    //첩부파일
	    $('#btnFileUploadSaveFormStmPrgRequst').unbind('click').bind('click', function() {
	        gf_FileUploadPopup(
	                '',     /* eventFunction */
	                '',     /* deleteBtnClassNm */
	                'saveFormStmPrgRequst',     /* viewDivId */
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
		
		
	    $('#saveFormStmPrgRequst .input_calen').unbind('keyup').bind('keyup', function(event){
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
	var $menuInfo = {};  //공통코드 
	var fn_MenuList = function (formId, codeId, codeNmId, param, strCallbackFunc, jobClsCode) {
		
		var title  = "메뉴조회";
		
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
			$('body').append("<div id='bpopupMenuList' jobClsCode='" + jobClsCode + "' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
		}
		
		$('#bpopupMenuList').bPopup({
			onOpen:function(){
				
				dhxWindowsMenuList = new dhtmlXWindows();
				var id 		= 'bpopupMenuList';
				var ajaxUrl = gv_ContextPath+'/stmmng002/popup/stmMenuListPopup/view?'+param;
				var left	= 500;
				var top		= 500;
				var width	= 600;
				var height	= 550;
				
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
	
	var fn_CallbackMenuPopup = function(data) {

	    gf_FormSetValue('saveFormStmPrgRequst', 'progrmId', data.menuId, 'text');
	    gf_FormSetValue('saveFormStmPrgRequst', 'progrmNm', data.menuNm, 'text');
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
        cf_calendarInitPopup();  
        cf_SetComponentsPopup();    
        cf_SetEventListenerPopup();    
        fn_SearchInputStmPrgRequst(); //상세정보            
        if(gf_IsNull('${imprvmrequstSn}')) {
            $('#requstDe').val(gv_Curdate); //오늘날짜 셋팅 
        }           
    });
	
    </script>
		<div id="saveForm" style="margin: 10px 10px 10px 10px">
				<div class="detail_type01">
					<form id="saveFormStmPrgRequst">
				        <input type="hidden" name="imprvmrequstSn" id="imprvmrequstSn"  /> 
						<table>
							<colgroup>								 
								<col width="10%"/>
								<col width="25%"/>
								<col width="10%"/>
								<col width="25%"/>
								<col width="10%"/>
								<col width="25%"/>
							</colgroup>
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
                                <td><input required type="text" name="rqester" id="rqester"  class="w100" readOnly />
								<th class="essential_icon">진행상태</th>
								<td><div id="divComboSttusSePopup"></div></td>	
							</tr>
							<tr>
								<th>요청일자</th>
								<td colspan ="5"><input type="text" name="requstDe" id="requstDe" required maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/></td>
<!-- 								<th>처리예정일자</th>
								<td><input type="text" name="processPdt" id="processPdt" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
								<th>확인일자</th>
								<td><input type="text" name="confirmDe" id="confirmDe" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td> -->
							</tr>							
							<tr>
								<th class="essential_icon">요청내용</th>
								<td colspan="5"><textarea required name="requstDesc" id="requstDesc" style="width:99%; height:70px"></textarea></td>
							</tr>		
							<!-- <tr>
								<th>개발담당자</th>
								<td><input type="text" name="charger" id="charger" maxlength="20" class="w100" /></td>
								<th>접수일자</th>접수일자
								<td><input type="text" name="rceptDe" id="rceptDe" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)"/></td>
								<th>완료일자</th>
								<td><input type="text" name="comptDe" id="comptDe" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
							</tr>				
							<tr>
								<th>처리내용</th>
								<td colspan="5">
									<textarea name="processCn" id="processCn" style="width:69%; height:70px"></textarea>
                                </td>
							</tr>		 -->
							<!-- <tr>
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
                            </tr> -->
						</table>								 
					</form>
			</div>
		<div>
			
            <div class="popup_footer_box" style = "margin-top: 20px;">
            	<button type="button" id="btnPopFormPrgSave" name="btnPopFormPrgSave">
                      <span class="glyphicon glyphicon-floppy-disk f15 mr5"></span>저장
                </button>
                <button type="button" id="btnPopupPrgDelete" name="btnPopupPrgDelete">
                      <span class="glyphicon glyphicon-remove f15 mr5"></span>삭제
                </button>                
                <button type="button" id="btnPopupPrgClose" name="btnPopupPrgClose">
                      <span class="glyphicon glyphicon-folder-close f15 mr5"></span>닫기
                </button>
			</div>
		</div>
	</div>
</body>
