<%@page contentType="text/html; charset=UTF-8"
	trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
<!-- 
	유지보수 요청 신규등록 팝업
 -->

<body>

	<script>
	/*유지보수 신규*/
	
	var uploadedFileKeys1 = []; // db 저장용 (키만 파이프라인으로 구분)
	var uploadedFileInfo1 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
	var RegNotNum = /[^0-9]/g;  //숫자 정규식
	
	var cf_InitParamPopup = function (){
		
	    gf_ComboCode('divComboRequstTyPopup', 'requstTy', 'requstTy', 'reg', 'C922', '' , '', '', 'asc', '');  				//장애유형
	    gf_ComboCode('divComboPriorRankPopup', 'priorRank', 'priorRank', 'reg', 'C923', '' , '', '', 'asc', 'required'); 	//우선순위
	    gf_ComboCode('divComboOpertTyPopup', 'opertTy', 'opertTy', 'reg', 'C924', '' , '', '', 'asc', ''); 					//작업유형
	    gf_ComboCode('divComboRequstStepPopup', 'requstStep', 'requstStep', 'reg', 'C205', '' , '', '', 'asc', 'required'); //진행상태
		
	   	//필수항목 체크 
 		$("#saveFormPjtMtaRequst").validate({ errorElement: 'div', ignore: '' });	   	
	};
    
	
	var cf_SetComponentsPopup = function (){};
	

	var cf_SetEventListenerPopup = function (){ 
		//프로젝트 조회
	    $('#btnProjectSearch').unbind('click').bind('click', function() {
            fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
        }); 
		
	    //작업단계 완료 선택시 완료일자 자동입력
	    $('#saveFormPjtMtaSearch select[name="requstStep"]').unbind('change blur').bind('change blur',function() {
			if('300' == gf_FormGetValue('saveFormPjtMtaSearch', 'requstStep', 'combo') && gf_IsNull(gf_FormGetValue('saveFormPjtMtaSearch', 'comptDe', 'text'))){
				gf_FormSetValue('saveFormPjtMtaSearch', 'comptDe', dateFormat(new Date()), 'text')
			} else if('300' != gf_FormGetValue('saveFormPjtMtaSearch', 'requstStep', 'combo') && gf_IsNull(gf_FormGetValue('saveFormPjtMtaSearch', 'comptDe', 'text'))){
				gf_FormSetValue('saveFormPjtMtaSearch', 'comptDe', '', 'text')
			}
	    });
	    $('#saveFormPjtMtaRequst input[name="comptDe"]').unbind('change blur').bind('change blur',function() {
			if(!gf_IsNull(gf_FormGetValue('saveFormPjtMtaRequst', 'comptDe', 'text'))){
				gf_FormSetValue('saveFormPjtMtaRequst', 'requstStep', '300', 'combo');
			} else {
				gf_FormSetValue('saveFormPjtMtaRequst', 'requstStep', '100', 'combo');
			}
	    });
	     
	    //저장
	    $('#btnPopFormPrgSave').unbind('click').bind('click', function() {
// 	    	if(gf_FormGetValue('saveFormPjtMtaRequst', 'comptDe', 'text'))
	    	var msg = "저장하시겠습니까?";
	    	if($('#saveFormPjtMtaRequst').validate().form()){
	        	fn_DivMsgConfirm2(msg, function(confirm){ 
	                if(confirm){ 
	                	fn_SavePjtmta001RequstPopup();
	                }else{ 
	                	return false; 
	                } 
	            });
	    	}
	    });		
		
	    //팝업창 닫기
	    $('#btnPopupPrgClose').unbind('click').bind('click', function() {	
	    	$('#bpopupMtaRequst .b-close').click();
	    });
	    
	    //지시자 조회
	    $('#btnDrctrEmpSearch').unbind('click').bind('click', function() {
	    	gf_EmpPopup('saveFormPjtMtaRequst', 'drctrEmpno', 'drctrNm', '1000', 'Y', null);
        });
	    
	    //작업자 조회
	    $('#btnOpertorEmpSearch').unbind('click').bind('click', function() {
	    	gf_EmpPopup('saveFormPjtMtaRequst', 'opertorEmpno', 'opertorNm', '1000', 'Y', null);
        });
	 
	};
	
	//초기화 함수 
	var cf_InitInputForm = function (){
	    $('#saveFormPjtMtaRequst').resetForm();
	};
	
	//달력셋팅 
	var cf_calendarInitPopup = function(){
	    $('#saveFormPjtMtaRequst .input_calen').unbind('keyup').bind('keyup', function(event){
	    	dateChk($(this));
	    }); 
	    
		//요청일자
		var dhxCCalendarDatePop1 = new dhtmlXCalendarObject({input:"requstDt", button:"startDateIcon"});
		dhxCCalendarDatePop1.loadUserLanguage("ko");
		dhxCCalendarDatePop1.hideTime();

		//완료요구일
		var dhxCCalendarDatePop2 = new dhtmlXCalendarObject({input:"comptRequstDt", button:"startDateIcon"});
		dhxCCalendarDatePop2.loadUserLanguage("ko");
		dhxCCalendarDatePop2.hideTime();
		
		var reqFinishDt = new Date();
 		
 		for(var i=0; i<3; i++){
 			reqFinishDt.setDate(reqFinishDt.getDate()+1);
 			var week = reqFinishDt.getDay();
 			var dayOff = week == '6' ? 2 : week == '0' ? 1 : 0;
 			reqFinishDt.setDate(reqFinishDt.getDate()+dayOff);
 		}
 		
 		gf_FormSetValue('saveFormPjtMtaRequst', 'comptRequstDt', gf_Date2StrDisplayFormat(reqFinishDt), 'text');

		//완료일자
		var dhxCCalendarDatePop3 = new dhtmlXCalendarObject({input:"comptDe", button:"startDateIcon"});
		dhxCCalendarDatePop3.loadUserLanguage("ko");
		dhxCCalendarDatePop3.hideTime();
	}
	function dateFormat(date){
		  var dd = date.getDate();
		  var mm = date.getMonth()+1; //January is 0!
		  var yyyy = date.getFullYear();

		  if(dd<10) {
		      dd='0'+dd
		  } 

		  if(mm<10) {
		      mm='0'+mm
		  } 

		  var nDate = yyyy+'-'+mm+'-'+dd;
		  return(nDate);
	}
	//입력 내용을 날짜 포멧으로
	function dateChk(objDate){
		var date = objDate.val();
		date = date.replace(RegNotNum, '');

		if (date == "" || date == null || date.length < 5) {
		  objDate.val(date);
		  return;
		}

		var DataFormat;
		var RegPhonNum;

		// 날짜 포맷(yyyy-mm-dd) 만들기 
		if (date.length <= 6) {
		  DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
		  RegPhonNum = /([0-9]{4})([0-9]+)/;
		} else if (date.length <= 8) {
		  DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
		  RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
		}

		while (RegPhonNum.test(date)) {
		  date = date.replace(RegPhonNum, DataFormat);
		}

		objDate.val(date);

		// 모두 입력됐을 경우 날짜 유효성 확인
		if (date.length == 10) {
			var isVaild = true;
		
			if (isNaN(Date.parse(date))) {
				// 유효 날짜 확인 여부
				isVaild = false;
			} else {
				// 년, 월, 일 0 이상 여부 확인
				var date_sp = date.split("-");
				date_sp.forEach(function(sp) {
				  if (parseInt(sp) == 0) {
				    isVaild = false;
				  }
				});
			
				// 마지막 일 확인
				var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
				if (last.getDate() < parseInt(date_sp[2])) {
				 	isVaild = false;
				}
			}
			
			if (!isVaild) {
			  alert("잘못된 날짜입니다. \n다시 입력하세요.");
			  objDate.val("");
			  objDate.focus();
			  return;
			}
		}
	}
	
	//기본 정보 입력	
	var fn_SearchInputStmPrgRequst = function (){
		var projectSn = '${projectSn}';

	   	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
	   	gf_FormSetValue('saveFormPjtMtaRequst', 'requstDt', dateFormat(new Date()), 'text');		//요청일=오늘날짜
	   	gf_FormSetValue('saveFormPjtMtaRequst', 'priorRank', '2', 'combo');		//우선순위=보통
	   	gf_FormSetValue('saveFormPjtMtaRequst', 'requstStep', '100', 'combo');	//작업단계=접수중
	   	gf_FormSetValue('saveFormPjtMtaRequst', 'requstStep', '100', 'combo');	//작업단계=접수중
	   	
	   	
		if(!gf_IsNull(projectSn)){
			var jsonParameter = {
	    	      	projectSn : projectSn
	    	};
	    	var dataSource = gf_NoAsyncTransaction('pjtmta001/searchPjtHnf', jsonParameter, 'GET');
	    	var data = dataSource.data
			
			gf_FormSetValue('saveFormPjtMtaRequst', 'drctrEmpno', data.projectPmEmpno, 'text');
			gf_FormSetValue('saveFormPjtMtaRequst', 'drctrNm', data.projectPmNm, 'text');
			gf_FormSetValue('saveFormPjtMtaRequst', 'opertorEmpno', data.prtcpntEmpno, 'text');
			gf_FormSetValue('saveFormPjtMtaRequst', 'opertorNm', data.prtcpntNm, 'text');
			gf_FormSetValue('saveFormPjtMtaRequst', 'projectSn', data.projectSn, 'text');
			gf_FormSetValue('saveFormPjtMtaRequst', 'projectNm', data.projectNm, 'text');
			gf_FormSetValue('saveFormPjtMtaRequst', 'bcncNm', data.bcncNm, 'text');
		   	gf_FormSetValue('saveFormPjtMtaRequst', 'rqester', data.bcncChargerNm, 'text');
		   	gf_FormSetValue('saveFormPjtMtaRequst', 'rqesterTelno', data.chargerCttpc, 'text');
		} 
    	$('#btnPopupPrgDelete').hide();  //  신규등록의 경우 삭제버튼 숨김	
        
	};
	// 팝업 저장
	var fn_SavePjtmta001RequstPopup = function(){
        
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
               requstMenu : gf_FormGetValue('saveFormPjtMtaRequst', 'requstMenu', 'text'),
               requstCn : gf_FormGetValue('saveFormPjtMtaRequst', 'requstCn', 'textarea'),
               drctrEmpno : gf_FormGetValue('saveFormPjtMtaRequst', 'drctrEmpno', 'text'), 
               opertorEmpno : gf_FormGetValue('saveFormPjtMtaRequst', 'opertorEmpno', 'text'), 
               requstStep : gf_FormGetValue('saveFormPjtMtaRequst', 'requstStep', 'combo'),
               drctCn : gf_FormGetValue('saveFormPjtMtaRequst', 'drctCn', 'textarea'),
               comptDe : gf_FormGetValue('saveFormPjtMtaRequst', 'comptDe', 'text') .replaceAll('-',''),	//완료일자
               
               atchmnflSn : gf_FormGetValue('saveFormPjtMtaRequst', 'atchmnfl', 'text'), //첨부파일 
           };
           

           var url;
           var  requstSn  = gf_FormGetValue('saveFormPjtMtaRequst', 'requstSn', 'text');
           
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
           }

        $('#saveFormPjtMtaRequst div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
	};
	
	//거래처 검색
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
				var width	= 750;
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
	var fn_CallbackProjectPopup = function(data) {
	    gf_FormSetValue('saveFormPjtMtaRequst', 'bcncNm', data.bcncNm, 'text');
	    gf_FormSetValue('saveFormPjtMtaRequst', 'projectNm', data.projectNm, 'text');
	    gf_FormSetValue('saveFormPjtMtaRequst', 'projectSn', data.projectSn, 'text');
        gf_FormSetValue('saveFormPjtMtaRequst', 'rqesterTelno', data.chargerCttpc, 'text');
	   	gf_FormSetValue('saveFormPjtMtaRequst', 'rqester', data.bcncChargerNm, 'text');
	   	gf_FormSetValue('saveFormPjtMtaRequst', 'rqesterTelno', data.chargerCttpc, 'text');
        

		var jsonParameter = {
    	      	projectSn : data.projectSn
    	};
    	var userDataSource = gf_NoAsyncTransaction('pjtmta001/searchPjtHnf', jsonParameter, 'GET');
    	var pjtUserdata = userDataSource.data
		gf_FormSetValue('saveFormPjtMtaRequst', 'drctrEmpno', pjtUserdata.projectPmEmpno, 'text');
		gf_FormSetValue('saveFormPjtMtaRequst', 'drctrNm', pjtUserdata.projectPmNm, 'text');
		gf_FormSetValue('saveFormPjtMtaRequst', 'opertorEmpno', pjtUserdata.prtcpntEmpno, 'text');
		gf_FormSetValue('saveFormPjtMtaRequst', 'opertorNm', pjtUserdata.prtcpntNm, 'text');
	};

	
	/**********************************************************파일 핸들링 시작**************************************************************/
	var fn_FileUploadBtnEvent = function(){
		$('#fileUpload1').unbind("click").bind("click",function(event){
			gf_FileUploadPopup(
					'fn_FileUploadBtnEvent', 
					'btnUploadedFiledelete1', 
					'fileList', 
					'atchmnfl', 
					 uploadedFileKeys1, 
					 uploadedFileInfo1, 
					 1,
					'all',
					'');
		});
		
		$('.btnUploadedFiledelete1').unbind("click").bind("click",function(event){			
			gf_DeleteAtachFile(
					'fn_FileUploadBtnEvent', 
					 $(this).attr('idx'), 
					'btnUploadedFiledelete1', 
					'fileList', 
					'atchmnfl', 
					 uploadedFileKeys1, 
					 uploadedFileInfo1);
		});
	}
	
	var uploadedFileKeys = [];
	var uploadedFileInfo = [];

	var fn_SearchFileUploadSaveFormPjtMtaRequst = function(atchFiles, viewDivId, dataDivId) {   
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
	        fn_LoadFileUploadSaveFormPjtMtaRequst(uploadedFileInfo, viewDivId, dataDivId);  
	    }
	};

	var fn_RemoveFileUploadSaveFormPjtMtaRequst = function(obj, viewDivId, dataDivId) {
	    uploadedFileKeys.splice($(obj).attr('idx'), 1);
	    uploadedFileInfo.splice($(obj).attr('idx'), 1); 
	    $('#'+viewDivId+' .file_box table tr').remove();
	    fn_LoadFileUploadSaveFormPjtMtaRequst(uploadedFileInfo, viewDivId, dataDivId);
	};

	var fn_LoadFileUploadSaveFormPjtMtaRequst = function(data, viewDivId, dataDivId) {      
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
	        atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="fn_RemoveFileUploadSaveFormPjtMtaRequst(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
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

	var fn_ClearFileUploadSaveFormPjtMtaRequst = function(viewDivId, dataDivId){
	    $('#'+viewDivId+' .file_box table tr').remove();
	    var atchFileList = [];
	    atchFileList.push('<tr>');
	    atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');      
	    atchFileList.push('</tr>');
	    $('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	    $('#'+dataDivId).val('');   
	};
	/**********************************************************파일 핸들링 끝**************************************************************/
	var fn_DivMsgConfirm2 = function(message, callback){
		
		if($('body').find("div[id='message']").size() <= 0) {
			$('body').append('<div id="message"></div>');
		}
		
		var str ="<div id='wrap_notice' style='width:300px;'>"
			   + "<div id='header_notice'>"
			   + "<h2 class='ac'>알 림</h2>"
			   + "</div>"
			   + "<hr>"
			   + "<div id='content_notice'>"
			   + "<p class='ac'>" + message + "</p>"
			   + "<p class='ac mt10'><button class='btn_confirm' id='btnYesConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackTrue== 'string' ? callBackTrue : '' ) +"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
			   + "<button class='btn_confirm' id='btnNoConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackFalse== 'string' ? callBackFalse : '' ) +"'><span class='glyphicon glyphicon-ban-circle'></span>&nbsp;취소</button></p>"
			   + "</div>"
			   + "</div>";
		$("#message").html(str);
		$("#content_notice .btn_cancel").focus();
		
		if(typeof callback == 'function') {
			$("#btnYesConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
				gf_DivMsgAlertClose();
				callback(true);
		    });
	
			$("#btnNoConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
				gf_DivMsgAlertClose();
				callback(false);
		    });
		}	
	};
	
    $(function() {
        cf_InitParamPopup();
        cf_calendarInitPopup();  
        cf_SetComponentsPopup();    
        cf_SetEventListenerPopup();    
        fn_SearchInputStmPrgRequst(); //상세정보          
        fn_FileUploadBtnEvent();//파일 이벤트
    });
	
    </script>
		<div id="saveForm" style="margin: 10px 10px 10px 10px">
        <form id="saveFormPjtMtaRequst">
				<div class="detail_type01">
					
				        <input type="hidden" name="projectSn" id="projectSn"  /> 
                        <input type="hidden" name="requstSn" id="requstSn"  />
						<table>
							<colgroup>								 
								<col width="11%"/>
								<col width="25%"/>
								<col width="10%"/>
								<col width="25%"/>
								<col width="10%"/>
								<col width="25%"/>
							</colgroup>
							<tr>
								<th class="essential_icon">거래처</th>
								<td><input required readonly type="text" name="bcncNm" id="bcncNm"  class="w150" />
                                </td>
								<th class="essential_icon">프로젝트명</th>
								<td colspan="3"><input required readonly type="text" name="projectNm" id="projectNm" style="width: 425px;"/>
								<button type="button" id="btnProjectSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
								</td>
							</tr>
                            <tr>
                                <th class="essential_icon">요청자</th>
                                <td><input required type="text" name="rqester" id="rqester"  class="w150" />
                                </td>
                                <th>연락처</th>
                                <td><input type="text" name="rqesterTelno" id="rqesterTelno"  class="w150" />
                                </td>
                                <th>이메일</th>
                                <td><input type="text" name="rqesterEmail" id="rqesterEmail"  class="w150" />
                                </td>
                            </tr>
							<tr>
								<th>장애유형</th>
								<td><div id="divComboRequstTyPopup"></div></td> 
                                <th>요청일</th>
                                <td><input type="text" name="requstDt" id="requstDt" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
								<th class="essential_icon">우선순위</th>
								<td><div id="divComboPriorRankPopup"></div></td>	
							</tr>
							<tr>
    						    <th class="essential_icon">완료요구일</th>
								<td><input required type="text" name="comptRequstDt" id="comptRequstDt" maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
								<th>작업유형</th>
								<td colspan="3"><div id="divComboOpertTyPopup"></div></td>
							</tr>						
							<tr>
								<th class="essential_icon">요청메뉴</th>
								<td colspan="5"><input required type="text" name="requstMenu" id="requstMenu" style="width:50%;"/></td>
							</tr>								
							<tr>
								<th class="essential_icon">요청내용</th>
								<td colspan="5"><textarea required name="requstCn" id="requstCn" style="width:99%; height:70px"></textarea></td>
							</tr>
                            <tr>
                                <th class="ar"><button type="button" class="btn_common02" id="fileUpload1"><span class="glyphicon glyphicon-paperclip"></span>첨부파일</button></th>
                                <td colspan="5" id="fileList">
                                    <input type="hidden" name="atchmnfl" id="atchmnfl"/>
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
            
            <div class="detail_type01" style="margin-top: 20px;">
                            <table>
                            <colgroup>                               
                                <col width="11%"/>
                                <col width="25%"/>
                                <col width="10%"/>
                                <col width="25%"/>
                                <col width="10%"/>
                                <col width="25%"/>
                            </colgroup>
                            <tr>
                                <th>지시자</th>
                                <td><input type="hidden" name="drctrEmpno" id="drctrEmpno" style="width: 60px;" autocomplete="off" maxlength="15"> 
                                    <input type="text" name="drctrNm" id="drctrNm" autocomplete="off" maxlength="15" readonly>
                                    <button type="button" id="btnDrctrEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                                </td>
                                <th>작업자</th>
                                <td><input type="hidden" name="opertorEmpno" id="opertorEmpno" style="width: 60px;" autocomplete="off" maxlength="15"> 
                                    <input type="text" name="opertorNm" id="opertorNm" autocomplete="off" maxlength="15" readonly>
                                    <button type="button" id="btnOpertorEmpSearch" class="btn_common03"><span class="glyphicon  glyphicon glyphicon-search"></span></button>
                                </td>
                                <th class="essential_icon">작업단계</th>
                                <td><div id="divComboRequstStepPopup"></div></td>
                            </tr>
                            <tr>
                                <th>지시내용</th>
                                <td colspan="3"><textarea name="drctCn" id="drctCn" style="width:98%;"></textarea></td>
                                <th>완료일자</th>
                                <td><input type="text" name="comptDe" id=comptDe maxlength="10"  class="input_calen" style="ime-mode:disabled" onkeyup="gf_AutoDate(event, this)" onkeypress="gf_AutoDate(event, this)" /></td>
                            </tr>            
                        </table>
                        </div>          
            
            
            </form>
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
