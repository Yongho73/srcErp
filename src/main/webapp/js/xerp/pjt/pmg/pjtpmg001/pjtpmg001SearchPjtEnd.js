/**
 * 프로그램 : 이슈관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.30
 * 사용테이블 : PJT_ISSUE
 **/

var fadeRegs = false; // 등록 화면 전환 플레그
var fadeMode = true;  // 수정 화면 전환 플레그
var modifyAt = true;  // 등록 수정 여부 플레그
var userEmpNo = '';

$(function() {
	cf_InitParamPjtEnd();
	cf_SetComponentsPjtEnd();
	cf_SetEventListenerPjtEnd();
    cf_SetBindingPjtEnd();
    cf_InitFormPjtEnd();
});

var cf_InitParamPjtEnd = function (){
	var projectSn = gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text');
	
	//$("#btnApprovPjtEnd").hide();
	
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');   
    userEmpNo =userInfo.data.userEmpNo;      
	fn_SearchPjtEnd();
};

var cf_SetComponentsPjtEnd = function (){
	
};

var cf_SetEventListenerPjtEnd = function (){
	// button event ========--------    
    $('#btnSavePjtEnd').unbind('click').bind('click', function(event){
    	fn_SavePjtEnd();
    });
    
    $('#repairPlanBtn').unbind('click').bind('click', function(event){
    	var projectSn = gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text');
    	fn_RepairPopup(projectSn);
    });
    
    $('body').off('click').on('click', '.repairList', function() {
    	var repairSn = $(this).attr('id');
    	var projectSn = gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text');
    	fn_RepairPopup(projectSn, repairSn);
    })
    
    $('#btnApprovPjtEnd').unbind('click').bind('click', function(rId) {
    	
		var jsonParameter = {
	    		projectSn : gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text')
	    };

	    var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtProjectPlanAcmsltCnt', jsonParameter, 'GET');
	    var data = dataSource.data;
	    
	    var hnfAcmsltCnt = data.hnfAcmsltCnt;
	    var bugtAcmsltCnt = data.bugtAcmsltCnt;
	    var outputCnt = data.outputCnt;
	    
	    if(hnfAcmsltCnt < 1) {
	    	gf_DivMsgAlert('인력실적을 1건이상 등록하세요.');
	    } else if(bugtAcmsltCnt < 1) {
	    	gf_DivMsgAlert('예산실적을 1건이상 등록하세요.');
	    } else if(outputCnt < 1) {
	    	gf_DivMsgAlert('산출물을 1건이상 등록하세요.');
	    } else {
	    	var projectSn = gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text');
        	fn_ApprovPopup(projectSn);
	    }		
    	
    });
};

var cf_SetBindingPjtEnd = function (){
	
};

var cf_InitFormPjtEnd = function (){
	
};

var fn_SavePjtEnd = function(){
	var projectSn = gf_FormGetValue('saveFormPjtEnd', 'projectSnEnd', 'text');

    if($('#saveFormPjtEnd').validate().form()){

        var jsonParameter = {
        		projectSn : gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text'),
        		completeCn1 : gf_FormGetValue('saveFormPjtEnd', 'completeCn1', 'textarea'),
        		completeCn2 : gf_FormGetValue('saveFormPjtEnd', 'completeCn2', 'textarea'),
        		completeCn3 : gf_FormGetValue('saveFormPjtEnd', 'completeCn3', 'textarea'),
        		completeCn4 : gf_FormGetValue('saveFormPjtEnd', 'completeCn4', 'textarea'),
        		apprverCn1 : gf_FormGetValue('saveFormPjtEnd', 'apprvCn1', 'textarea'),
        		apprverCn2 : gf_FormGetValue('saveFormPjtEnd', 'apprvCn2', 'textarea'),
        		comptAt : '0'
        };

        var url;

        if( !gf_IsNull(projectSn) ) {
            url = "pjtpmg001/modifyPjtProjectEnd";
        } else {
            url = "pjtpmg001/savePjtProjectEnd";
        }

        var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
        if(dataSource.code === '000') {

            if(!gf_IsNull(projectSn)) {
                gf_DivMsgAlert(gv_MsgUpdate);
                fn_SearchPjtEnd();
                fn_endApprovHide();
            } else {
                gf_DivMsgAlert(gv_MsgRegist);
                fn_SearchPjtEnd();
                fn_endApprovHide();
            }
        }
    }
};

var fn_SearchPjtEnd = function(){
	var projectSn = gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text');
	
	if(!gf_IsNull(projectSn)) { 

        var jsonParameter = {
            projectSn : projectSn 
        };

        var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtProjectEnd', jsonParameter, 'GET');
        var data = dataSource.data;
        
        gf_FormSetValue("saveFormPjtEnd", "projectSnEnd", data.projectSn,  "text");		
        gf_FormSetValue("saveFormPjtEnd", "completeCn1", data.completeCn1,  "textarea");	
        gf_FormSetValue("saveFormPjtEnd", "completeCn2", data.completeCn2,  "textarea");	
        gf_FormSetValue('saveFormPjtEnd', 'completeCn3', data.completeCn3, 'textarea');
        gf_FormSetValue('saveFormPjtEnd', 'completeCn4', data.completeCn4, 'textarea');
        gf_FormSetValue('saveFormPjtEnd', 'apprvCn1', data.apprverCn1, 'textarea');
        gf_FormSetValue('saveFormPjtEnd', 'apprvCn2', data.apprverCn2, 'textarea');
	}
	
	fn_endApprovHide();
	fn_SearchPjtRepairList();
};

var fn_SearchPjtRepairList = function (){
	//dhxGridPjtIssueact.clearAll();
	
	var projectSn = gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text');
    
	if(!gf_IsNull(projectSn)){

	    var jsonParameter = { projectSn : projectSn };
        
	    gf_Transaction('gridList', 'pjtpmg001/searchPjtRepairList', jsonParameter, 'fn_CallbackSearchPjtRepairList', false, 'GET');
	}
    
};

var fn_CallbackSearchPjtRepairList = function (strSvcID, targetID, data){
	var dataList=[];
	
	document.getElementById('repairPlan').innerHTML= ''
	 var divHtml  = "<table id = 'repairListTable' style='border:0px'>" +
     				"<colgroup><col width='80' /><col width='100' /><col width='80' /><col width='50' /><col width='60' /></colgroup> " ;

	if(data.data.records.length > 0) {
		for(var i = 0; i < data.data.records.length; i++) {
			divHtml += '<tr class="repairList"  id ="' + data.data.records[i].repairSn + '"><td>' + data.data.records[i].repairSe + "</td>"
			divHtml += "<td>" + data.data.records[i].repairDe + "</td>";
			divHtml += "<td>" + data.data.records[i].repairPsitn + "</td>";
			divHtml += "<td>" + data.data.records[i].repairChargerNm + "</td>";
			divHtml += "<td>" + data.data.records[i].repairChargerCttpc + "</td></tr>";
		}
	}
	divHtml += "</table>";
	
	document.getElementById('repairPlan').innerHTML= divHtml;

};

var fn_endApprovHide = function(){
	
	var jsonParameter = {
            projectSn : gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text')
        };

        var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtProject', jsonParameter, 'GET');
        var data = dataSource.data;
        
        var comptAt = data.comptAt;		
        
    if(comptAt == 1) {
    	$('textarea').attr("disabled", true);
    	$("#apprvCn1").css("display", "");
		$("#apprvCn2").css("display", "");
    }
	
	if(!gf_IsNull(gf_FormGetValue('saveFormPjtEnd', 'projectSnEnd', 'text')) && comptAt == '0'){
    	$("#btnApprovPjtEnd").show();
    	$("#apprvCn1").css("display", "none");
		$("#apprvCn2").css("display", "none");
    } else if(comptAt == '6'){
    	
    	$("#btnApprovPjtEnd").hide();
    	
		var jsonParameter = {
	    		projectSn : gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text')
	    };

	    var dataSource = gf_NoAsyncTransaction('pjtpmg001/findNewApprov', jsonParameter, 'GET');
	    var data = dataSource.data;
	    
	    var endApprvEmpno1 = data.endApprvEmpno1;
	    var endApprvDe1 = data.endApprvDe1;
	    var endApprvEmpno2 = data.endApprvEmpno2;
	    var endApprvDe2 = data.endApprvDe2;
	    
	    if(!gf_IsNull(endApprvEmpno1) && gf_IsNull(endApprvDe1)){
	    	if(userEmpNo == endApprvEmpno1){
	    		$("#apprvCn1").css("display", "");
	    		$("#apprvCn2").css("display", "");
	    	}
	    } else if(!gf_IsNull(endApprvDe1) && gf_IsNull(endApprvDe2)){
	    	if(userEmpNo == endApprvEmpno2){
	    		$("#apprvCn1").css("display", "");
	    		$("#apprvCn2").css("display", "");
	    	}
	    } else {
	    	$("#apprvCn1").css("display", "none");
    		$("#apprvCn2").css("display", "none");
	    }

	}
	else{
    	$("#btnApprovPjtEnd").hide();
    }

	
};

var fn_endApprovDe1Save = function(){
	var jsonParameter = {
			projectSn : gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text'),
			endApprvDe1 : "1",
			comptAt : "6"
    };

    var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectEndApprovDe", jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert("완료승인이 완료되었습니다.");
   } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
   }   
};

var fn_endApprovDe1SaveAt = function(){
	var jsonParameter = {
			projectSn : gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text'),
			endApprvDe1 : "1",
			comptAt : "1"
    };

    var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectEndApprovDe", jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert("완료승인이 완료되었습니다.");
   } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
   }   
};

var fn_endApprovDe2Save = function(){
	var jsonParameter = {
			projectSn : gf_FormGetValue('saveFormPjtEnd', 'projectSn', 'text'),
			endApprvDe2 : "2",
			comptAt : "1"
    };

    var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectEndApprovDe", jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert("완료승인이 완료되었습니다.");
   } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
   }   
};

var fn_RepairPopup = function (projectSn, repairSn) {

	var userId = ""; 
	var title  = "하자보수계획";
	var customerInfo = "customerInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if(typeof projectSn == "undefined" || projectSn == null){
		 projectSn = "";
    }
	if(typeof repairSn == "undefined" || repairSn == null){
		repairSn = "";
   }
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='repairPopup']").size() <= 0) {
		$('body').append("<div id='repairPopup' projectSn='" + projectSn + "' repairSn='" + repairSn + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#repairPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'repairPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/pjtpmgRepairPlanPopup/view';
			var left	= 0;
			var top		= 0;
			var width	= 650;
			var height	= 450;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#repairPopup .b-close').click();
				fn_SearchPjtEnd();
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
			$('body').find("div[id='repairPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

var fn_ApprovPopup = function (projectSn) {

	var userId = ""; 
	var title  = "승인요청";
	var customerInfo = "customerInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if(typeof projectSn == "undefined" || projectSn == null){
		 projectSn = "";
    }
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='approvPopup']").size() <= 0) {
		$('body').append("<div id='approvPopup' projectSn='" + projectSn + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#approvPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'approvPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/pjtpmgEndApprovPopup/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 380;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#approvPopup .b-close').click();
				fn_SearchPjtEnd();
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
			$('body').find("div[id='approvPopup']").remove();
			fn_SearchPjtEnd();
		}
	},function(){});
	fn_SearchPjtEnd();
	return dhxWindowObj;
};


