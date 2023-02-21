// 파일업로드
var gf_CallbackFileUpload = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
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

var gf_DeleteAtachFile = function(eventFunction, delIdx, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){

	keyArr.splice(delIdx, 1);
	infoArr.splice(delIdx, 1);
	
	$('#'+viewDivId+' .file_box table tr').remove();
	
	var idx = 0;
	var fileInfos = [];
	var atchFileList = [];
	
	$.each( infoArr, function( key, value ) {
		
		fileInfos = infoArr[key].split('|^|');
		
		atchFileList.push('<tr>');
		atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
		atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
		atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del '+deleteBtnClassNm+'"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');

		idx++;
	});								
	
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val(keyArr.join("|"));
	
	var callbacks = $.Callbacks();
	var callFunction = eval(eventFunction);
	callbacks.empty();
	callbacks.add(callFunction);
    callbacks.fire();
};

var gf_FileUploadPopup = function(
		eventFunction, 		/* 이벤트함수 : 파일목록을 다시 생성하며, 버튼 이벤트를 주기 위함.*/
		deleteBtnClassNm, 	/* 삭제버튼의 클래스 명 (삭제버튼 이벤트 클래스명과 동일해야함) */
		viewDivId, 			/* 테이블형식의 파일 목록 */
		dataDivId, 			/* 디비에 입력할 파일 목록 (파이프라인으로 구분) */
		keyArr, 			/* 파일키 배열 */
		infoArr, 			/* 파일정보 배열 */
		fileLimitCnt,		/* 파일갯수 제한 */
		acceptType,			/* 허용가능한 파일 (all:모두, image:이미지만, excel:엑셀파일만, pdf:pdf파일만) */
		callbackFuncNm,      /* 콜백함수 (없을경우 디퐆트 콜백(gf_CallbackFileUpload)) */
		viewType            /* 저장기능 비활성화 하려면 값을 'view' 로 보내야 함 */ ) {
	
	var dhxWindows;
	var dhxWindowObj;
	
	if($('body').find("div[id='fileUploadBpopup']").size() <= 0) {
		$('body').append('<div id="fileUploadBpopup"><div class="b-close" style="display:none"></div></div>');
	}
	
	var callbacks = $.Callbacks();
	var callFunction;
	
	if ( !gf_IsNull(callbackFuncNm) ) {
		callFunction = eval(callbackFuncNm);
	} else {
		callFunction = eval('gf_CallbackFileUpload');
	}
	
	if ( gf_IsNull(viewType) ) {
		viewType = "all";
	}
	
	if(gf_IsNull(fileLimitCnt)) fileLimitCnt = 0;
 
	$('#fileUploadBpopup').bPopup(
			{
				onOpen:function(){

					dhxWindows = new dhtmlXWindows();
					
					var id 		= 'fileUploadPopup';
					var title 	= '파일업로드'; 
					var ajaxUrl = gv_ContextPath+'/pop/fileUpload/view?keyArr='+encodeURIComponent(keyArr.join('|'))+'&acceptType='+acceptType+'&fileLimitCnt='+fileLimitCnt+'&viewType='+viewType;
					
					var left	= 0;
					var top		= 0; 
					var width	= 500;
					var height	= 480;

					dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
					dhxWindows.window(id).centerOnScreen();					
					dhxWindowObj.setText(title);					
					dhxWindowObj.attachURL(ajaxUrl, true, true);					
					dhxWindowObj.attachEvent("onClose", function(win){
						$('#fileUploadBpopup .b-close').click();
					});					
				},
				onClose:function(){

					var data = [];
					data = returnUploadedFiles;

					callbacks.empty();
					callbacks.add(callFunction);
		            callbacks.fire(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr);

					dhxWindows.unload();
					$('body').find("div[id='fileUploadBpopup']").remove();
				}
			},
			function(){}
		);
	
	return dhxWindowObj;
};



//부서 팝업
var $deptInfo = {};  //부서 선택용 변수
var gf_DeptPopup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "부서 조회";
	var deptInfo = "deptInfo";
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$deptInfo = {};
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='deptPopup']").size() <= 0) {
		$('body').append("<div id='deptPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' deptInfo='" + deptInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#deptPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'deptPopup';
			var ajaxUrl = gv_ContextPath+'/pop/dept/view';
			//alert(ajaxUrl);
			var left	= 0;
			var top		= 0;
			var width	= 480;
			var height	= 560;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#deptPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($deptInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='deptPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//조직 팝업
var $orgnztInfo = {};  //조직 선택용 변수
var gf_OrgnztPopup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "조직 조회";
	var orgnztInfo = "orgnztInfo";
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$orgnztInfo = {};
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='orgnztPopup']").size() <= 0) {
		$('body').append("<div id='orgnztPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' orgnztInfo='" + orgnztInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#orgnztPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'orgnztPopup';
			var ajaxUrl = gv_ContextPath+'/pop/orgnzt/view';
			//alert(ajaxUrl);
			var left	= 0;
			var top		= 0;
			var width	= 570;
			var height	= 560;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#orgnztPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($orgnztInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='orgnztPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//직급 팝업
var gf_ClsfPopup = function (formId, codeId, codeNmId, strCallbackFunc) {
	
	alert("이 공통팝업은 삭제될 예정입니다. 사용하는 개발자분은 박용호부장에게 얘기해 주세요");
	
	var userId = ""; 
	var title  = "직급 조회";
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
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='bpopup']").size() <= 0) {
		$('body').append("<div id='bpopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'deptPopup';
			var ajaxUrl = gv_ContextPath+'/mhshrm008/pop/searchMhsClsf/view';
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 500;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('.b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($empInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='bpopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//사원조회 팝업
var $empInfo = {};  //사원 선택용 변수
var gf_EmpPopup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc, sendCallbackParam) {
	
	var userId = ""; 
	var title  = "사원 조회";
	var empInfo = "empInfo";	
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$empInfo = {};
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='empPopup']").size() <= 0) {
		$('body').append("<div id='empPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' empInfo='" + empInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#empPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'empPopup';
			var ajaxUrl = gv_ContextPath+'/pop/emp/view';
			var left	= 0;
			var top		= 0;
			var width	= 680;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#empPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($empInfo, sendCallbackParam);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='empPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

var gf_MultiEmpPopup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc, sendCallbackParam) {
	
	var userId = ""; 
	var title  = "사원 선택";
	var empInfo = "empInfo";	
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$empInfo = {};
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='empPopup']").size() <= 0) {
		$('body').append("<div id='empPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' empInfo='" + empInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#empPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'empPopup';
			var ajaxUrl = gv_ContextPath+'/pop/multiEmp/view';
			var left	= 0;
			var top		= 0;
			var width	= 670;
			var height	= 550;
			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#empPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($empInfo, sendCallbackParam);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='empPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};


var gf_Emp2Popup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc) {
	var userId = ""; 
	var title  = "사원 조회";
	var empInfo = "empInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$empInfo = {};
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='empPopup2']").size() <= 0) {
		$('body').append("<div id='empPopup2' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' empInfo='" + empInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#empPopup2').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'empPopup2';
			var ajaxUrl = gv_ContextPath+'/pop/emp2/view';
			var left	= 0;
			var top		= 0;
			var width	= 900;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#empPopup2 .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($empInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='empPopup2']").remove();
		}
	},function(){});
	return dhxWindowObj;
};



//거래처팝업
var $customerInfo = {};  //거래처 선택용 변수
var gf_CompPopup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "거래처 조회";
	var customerInfo = "customerInfo";
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='contractCompanyPopup']").size() <= 0) {
		$('body').append("<div id='contractCompanyPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' customerInfo='" + customerInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#contractCompanyPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'contractCompanyPopup';
			var ajaxUrl = gv_ContextPath+'/pop/comp/view';
			var left	= 0;
			var top		= 0;
			var width	= 980;
			var height	= 700;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#contractCompanyPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($customerInfo);
			}
			
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='contractCompanyPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//우편번호 호출
var $addrInfo = {};  //주소 선택용 변수 (juso.go.kr 사용 시)
var juso_go_kr_Pop; //주소창 Popup 용 (juso.go.kr 사용 시)
var juso_go_kr_formId = ""; //주소창 Popup 용 (juso.go.kr 사용 시)
var juso_go_kr_ziptCd = ""; //주소창 Popup 용 (juso.go.kr 사용 시)
var juso_go_kr_addr = ""; //주소창 Popup 용 (juso.go.kr 사용 시)
var juso_go_kr_detailAddr = ""; //주소창 Popup 용 (juso.go.kr 사용 시)
var gf_ZipPopup = function  (formId, ziptCd, addr, addr2, strCallbackFunc) {
	var title  = "주소 조회";
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof ziptCd == "undefined" || ziptCd == null){
		ziptCd = "";
	}
	if(typeof addr == "undefined" || addr == null){
		addr = "";
	}
	if(typeof addr2 == "undefined" || addr2 == null){
		addr2 = "";
	}
	if(typeof strCallbackFunc == "undefined" || strCallbackFunc == null){
		strCallbackFunc = "";
	}
	
	juso_go_kr_formId = formId;
	juso_go_kr_ziptCd = ziptCd;
	juso_go_kr_addr = addr;
	juso_go_kr_detailAddr = addr2;
	
	$addrInfo = {};
	
	/*
	var zipAddrDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='zipAddrPopup']").size() <= 0) {
		$('body').append("<div id='zipAddrPopup' formid='" + formId + "' ziptCd ='" + ziptCd + "' addr='" + addr + "' addr2='" + addr2 + "' addrInfo='" + addrInfo + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#zipAddrPopup').bPopup({
		onOpen:function(){
			
			zipAddrDhxWindows = new dhtmlXWindows();
			
			var id 		= 'zipAddrPopup';
			var ajaxUrl = gv_ContextPath+'/pop/zip/view';
			var left	= 0;
			var top		= 0;
			var width	= 570;
			var height	= 420;

			dhxWindowObj = zipAddrDhxWindows.createWindow(id, left, top, width, height);
			zipAddrDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#zipAddrPopup .b-close').click();
			});
		},
		onClose:function(){
			zipAddrDhxWindows.unload();
			$('body').find("div[id='zipAddrPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
	*/
	
	var url = "/xerp/pop/juso/view?strCallbackFunc="+strCallbackFunc;
	var width	= 570;
	var height	= 420;
	
	var left = (window.screen.width / 2) - (width / 2);
	var top= (window.screen.height / 2) - (height / 2);
	var style = "width=" + width + ",height=" + height + ", left=" + left + ", top=" + top + ", scrollbars=yes, resizable=yes";
	
	
	// opener관련 오류가 발생하는 경우 아래 주석을 해지하고, 사용자의 도메인정보를 입력합니다. ("주소입력화면 소스"도 동일하게 적용시켜야 합니다.)
	if (document.domain == "localhost"){
		//document.domain = "localhost:8080";
		document.domain = "localhost";
	}
	else if (document.domain == "127.0.0.1"){
		//document.domain = "dev.dbvision.co.kr:8180";
		document.domain = "127.0.0.1";
	}
	else if (document.domain == "dev.dbvision.co.kr"){
		//document.domain = "dev.dbvision.co.kr:8180";
		document.domain = "dev.dbvision.co.kr";
	}
	else {  //
		console.log("** domain : " + document.domain);
		document.domain = "dbvision.co.kr";
	}
	
	// 주소검색을 수행할 팝업 페이지를 호출합니다.
	if(typeof juso_go_kr_Pop == "undefined" || juso_go_kr_Pop == null){
		juso_go_kr_Pop = window.open(url,"juso_go_kr_Pop",style);
    }else{
        if (!juso_go_kr_Pop.closed) {
            juso_go_kr_Pop.focus();
        }else{
        	juso_go_kr_Pop = window.open(url,"juso_go_kr_Pop",style);
        }
    }
};

function juso_go_kr_CallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn,detBdNmList,bdNm,bdKdcd,siNm,sggNm,emdNm,liNm,rn,udrtYn,buldMnnm,buldSlno,mtYn,lnbrMnnm,lnbrSlno,emdNo,strCallbackFunc){
	
	var obj = "";
    if(juso_go_kr_formId != "" && juso_go_kr_ziptCd != ""){
    	obj = '#' + juso_go_kr_formId + " #" + juso_go_kr_ziptCd;
    	$(obj).val(zipNo);   //우편번호
    }
    
    if(juso_go_kr_formId != "" && juso_go_kr_detailAddr != "" && juso_go_kr_addr != ""){
   		obj = '#' + juso_go_kr_formId + " #" + juso_go_kr_addr;
   		$(obj).val(roadAddrPart1 + " " + roadAddrPart2);   //주소
   		
   		obj = '#' + juso_go_kr_formId + " #" + juso_go_kr_detailAddr;
   		$(obj).val(addrDetail);   //상세주소
    }
    else if(juso_go_kr_formId != "" && juso_go_kr_addr != ""){
	   	 obj = '#' + juso_go_kr_formId + " #" + juso_go_kr_addr;
	   	 $(obj).val(roadFullAddr);   //전체주소
	}

	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
	$addrInfo.zipno          = zipNo;         //우편번호
	$addrInfo.FullAddr       = roadFullAddr;  //도로명주소(전체)
	$addrInfo.roadAddr1      = roadAddrPart1; //도로명주소1
	$addrInfo.roadAddr2      = roadAddrPart2; //도로명주소2
	$addrInfo.roadAddrDetail = addrDetail;    //도로명 상세주소
	$addrInfo.engAddr        = engAddr;       //영문주소
	$addrInfo.jibunAddr      = jibunAddr;     //지번주소
	$addrInfo.admCd          = admCd;         //행정구역코드
	$addrInfo.rnMgtSn        = rnMgtSn;       //도로명코드
	$addrInfo.bdMgtSn        = bdMgtSn;       //건물관리번호
	$addrInfo.detBdNmList    = detBdNmList;   //상세건물명
	$addrInfo.bdNm           = bdNm;          //건물명
	$addrInfo.bdKdcd         = bdKdcd;        //공동주택여부(1 : 공동주택, 0 : 비공동주택)
	$addrInfo.siNm           = siNm;          //시도명
	$addrInfo.sggNm          = sggNm;         //시군구명
	$addrInfo.emdNm          = emdNm;         //읍면동명
	$addrInfo.liNm           = liNm;          //법정리명
	$addrInfo.rn             = rn;            //도로명
	$addrInfo.udrtYn         = udrtYn;        //지하여부(0 : 지상, 1 : 지하)
	$addrInfo.buldMnnm       = buldMnnm;      //건물본번
	$addrInfo.buldSlno       = buldSlno;      //건물부번
	$addrInfo.mtYn           = mtYn;          //산여부(0 : 대지, 1 : 산)
	$addrInfo.lnbrMnnm       = lnbrMnnm;      //지번본번(번지)
	$addrInfo.lnbrSlno       = lnbrSlno;      //지번부번(호)
	$addrInfo.emdNo          = emdNo;         //읍면동일련번호
	
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
	
	if ( !gf_IsNull(callFunction) ) {
		callbacks.empty();
		callbacks.add(callFunction);
        callbacks.fire($addrInfo);
	}
	
}



//계정과목 팝업 추가 
//2020.04.22 add by KLEE
var $acntCodeInfo = {};  //계정과목 
var gf_AcntCodePopup = function (formId, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "계정과목조회";
	var acntCodeInfo = "acntCodeInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof bplcCode == "undefined" || bplcCode == null){
		bplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$acntCodeInfo = {};
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='acntCodePopup']").size() <= 0) {
		$('body').append("<div id='acntCodePopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' bplcCode='" + bplcCode + "' acntCodeInfo='" + acntCodeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#acntCodePopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'acntCodePopup';
			var ajaxUrl = gv_ContextPath+'/mfsbsc001/popup/findPopupAcntCodeList/view';
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#acntCodePopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($acntCodeInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='acntCodePopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//자격증 팝업
var $crqfsInfo = {};  //조직 선택용 변수
var gf_CrqfsPopup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "자격증 조회";
	var crqfsInfo = "crqfsInfo";
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$crqfsInfo = {};
	
	//팝업
	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='crqfsPopup']").size() <= 0) {
		$('body').append("<div id='crqfsPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' crqfsInfo='" + crqfsInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#crqfsPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'crqfsPopup';
			var ajaxUrl = gv_ContextPath+'/pop/crqfs/view';
			//alert(ajaxUrl);
			var left	= 0;
			var top		= 0;
			var width	= 450;
			var height	= 560;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#crqfsPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($crqfsInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='crqfsPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};


//공통코드 팝업 화면 창 
//2020.04.23 add by KLEE
var $codeInfo = {};  //계정과목 
var gf_CodePopup = function (formId, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "공콩코드조회";
	var codeInfo = "codeInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$codeInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='codePopup']").size() <= 0) {
		$('body').append("<div id='codePopup' formid='" + formId + "'codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#codePopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'codePopup';
			var ajaxUrl = gv_ContextPath+'/stmmng003/popup/comCode/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#codePopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($codeInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='codePopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//금융계좌조회 팝업 화면 창 
//2020.04.24 add by KLEE
var $depositInfo = {};  
var gf_DepositPopup = function (formId, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "계좌조회";
	var depositInfo = "depositInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$depositInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='acnutNoPopup']").size() <= 0) {
		$('body').append("<div id='acnutNoPopup' formid='" + formId + "'depositInfo='" + depositInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#acnutNoPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'acnutNoPopup';
			var ajaxUrl = gv_ContextPath+'/mfsbsc004/popup/deposit/view';
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#acnutNoPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($depositInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='acnutNoPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};


//은행코드 팝업 화면 창 
//2020.04.27 add by YCK
var $comCodeInfo = {};  //공통코드 
var gf_ComCodePopup = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "은행코드조회";
	var codeInfo = "comCodeInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$comCodeInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='comCodePopup']").size() <= 0) {
		$('body').append("<div id='comCodePopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#comCodePopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'comCodePopup';
			var ajaxUrl = gv_ContextPath+'/pop/comCode2/view';
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#comCodePopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($codeInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='comCodePopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};


//카드번호 팝업 화면 창 
//2020.04.27 add by YCK
var $cardNoInfo = {};  //공통코드 
var gf_CardNoPopup = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "카드번호조회";
	var codeInfo = "cardNoInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$cardNoInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='cardNoPopup']").size() <= 0) {
		$('body').append("<div id='cardNoPopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#cardNoPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'cardNoPopup';
			var ajaxUrl = gv_ContextPath+'/pop/cardNo/view';
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#cardNoPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($cardNoInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='cardNoPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

// 급여 지급일자 팝업 화면 창 
var $pymntDeInfo = {};  //공통코드 
var gf_PymntDePopup = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "급여지급일자조회";
	var codeInfo = "pymntDeInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$pymntDeInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='pymntDePopup']").size() <= 0) {
		$('body').append("<div id='pymntDePopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#pymntDePopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'pymntDePopup';
			var ajaxUrl = gv_ContextPath+'/pop/pymntDe/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#pymntDePopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($pymntDeInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='pymntDePopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//급여 지급일자 팝업 화면 창 
var $pymntDeClosAtInfo = {};  //공통코드 
var gf_PymntDeClosAtPopup = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "급여지급일자조회";
	var codeInfo = "$pymntDeClosAtInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$pymntDeInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='pymntDeClosAtPopup']").size() <= 0) {
		$('body').append("<div id='pymntDeClosAtPopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#pymntDeClosAtPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'pymntDeClosAtPopup';
			var ajaxUrl = gv_ContextPath+'/pop/pymntDeClosAt/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 550;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#pymntDeClosAtPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($pymntDeClosAtInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='pymntDeClosAtPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};


//급여항목조회
var $salaryitemInfo = {};  //공통코드 
var gf_SalaryitemPopup = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "급여항목조회";
	var codeInfo = "salaryitemInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$salaryitemInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='salaryitemPopup']").size() <= 0) {
		$('body').append("<div id='salaryitemPopup' formid='" + formId +"'><div class='b-close' style='display:none'></div></div>");
	}
	$('#salaryitemPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'salaryitemPopup';
			var ajaxUrl = gv_ContextPath+'/pop/Salaryitem/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 650;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#salaryitemPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($salaryitemInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='salaryitemPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//사업자관리
var $incomeKindInfo = {};  //공통코드 
var gf_IncomeKindPopup = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "사업자관리조회";
	var codeInfo = "incomeKindInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$incomeKindInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='incomeKindPopup']").size() <= 0) {
		$('body').append("<div id='incomeKindPopup' formid='" + formId +"'><div class='b-close' style='display:none'></div></div>");
	}
	$('#incomeKindPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'incomeKindPopup';
			var ajaxUrl = gv_ContextPath+'/pop/IncomeKind/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 650;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#incomeKindPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($incomeKindInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='incomeKindPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

// 교육 항목 조회
var $educourseCodeInfo = {};  //공통코드 
var gf_EducourseCodePopup = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	
	var userId = ""; 
	var title  = "교육항목조회";
	var codeInfo = "educourseCodeInfo";	
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
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$educourseCodeInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='educourseCodePopup']").size() <= 0) {
		$('body').append("<div id='educourseCodePopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#educourseCodePopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'educourseCodePopup';
			var ajaxUrl = gv_ContextPath+'/pop/educourseCode/view';
			var left	= 0;
			var top		= 0;
			var width	= 990;
			var height	= 600;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#educourseCodePopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($educourseCodeInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='educourseCodePopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};
