/**
 * 프로그램 : 이슈관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.30
 * 사용테이블 : PJT_CCPY
 **/

var fadeRegs = false; // 등록 화면 전환 플레그
var fadeMode = true;  // 수정 화면 전환 플레그
var modifyAt = true;  // 등록 수정 여부 플레그
var dhxCCalendarDate;

$(function() {
	cf_InitParamPjtCcpy();
	cf_SetComponentsPjtCcpy();
	cf_SetEventListenerPjtCcpy();
    cf_SetBindingPjtCcpy();
    cf_InitFormPjtCcpy();
});

var cf_InitParamPjtCcpy = function (){
	
};

var dhxGridPjtCcpy;
var cf_SetComponentsPjtCcpy = function (){

	var dhxGridHeaderInfo = [];
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'), '40', 'center', 'int', 'edn', false, 'rnum', ''));
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('계약사명', '200', 'center', 'str', 'ro', false, 'bcncNm', '')); 
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('계약일자', '100', 'center', 'str', 'ro', false, 'cntrctDe', ''));
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('계약금액', '80', 'right', 'int', 'ron', false, 'cntrctAmt', ''));  
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('담당자', '80', 'center', 'str', 'ro', false, 'chargerNm', ''));	
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('직위', '80', 'center', 'str', 'ro', false, 'chargerOfcps', ''));	
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('연락처', '*', 'center', 'str', 'ro', false, 'chargerTelno', ''));	
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('projectSn', '100', 'center', 'str', 'ro', true, 'projectSn', ''));
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('ccpySn', '100', 'center', 'str', 'ro', true, 'ccpySn', ''));	
	dhxGridPjtCcpy = gf_MakeDhxGrid('divDataListPjtCcpy', dhxGridHeaderInfo, true, false, false);
	
	
	dhxGridPjtCcpy.enableAutoWidth(false);
	dhxGridPjtCcpy.setColumnMinWidth(60,5);
	dhxGridPjtCcpy.adjustColumnSize(0);
	
	dhxGridPjtCcpy.setNumberFormat("0,000", 3, ".", ",");
};

var eventIdsCcpy = [];
var cf_SetEventListenerPjtCcpy = function (){
	 // issue grid event ========--------
	var eventId;
	eventIdsCcpy = gf_GridDetachEvent(dhxGridPjtCcpy, eventIdsCcpy);	
	
	eventId = dhxGridPjtCcpy.attachEvent('onRowDblClicked',function(id, ind) {
		 var projectSn 	= dhxGridPjtCcpy.cells(id, gf_GetDhxGridColumId(dhxGridPjtCcpy,'projectSn')).getValue();
		 var ccpySn 	= dhxGridPjtCcpy.cells(id, gf_GetDhxGridColumId(dhxGridPjtCcpy,'ccpySn')).getValue();
		
		 fn_CcpyPopup(projectSn, ccpySn);
	});
	eventIdsCcpy.push(eventId);
	
	// button event ========--------  
	 $('#btnSavePjtCcpy').unbind('click').bind('click', function(){
	    	fn_SavePjtCcpy();
	 });
	 
	 $('#btnAddPjtCcpy').unbind('click').bind('click', function(event){
		 var projectSn 	= gf_FormGetValue('saveFormPjtCcpy', 'projectSn', 'text');
		 fn_CcpyPopup(projectSn);
	 });
	
	 $('#btnRemovePjtCcpy').unbind('click').bind('click', function(event){    	
		 gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtCcpy()', '');
	 });
	 
	 $('#vatInclsAtOrg').unbind("click").bind("click",function() {
	    	if($(this).prop('checked')) $('#vatInclsAt').val('1');
	    	else $('#vatInclsAt').val('0');
	 });
	 
	 $('#btnbcncPop').unbind('click').bind('click', function(event){
		 gf_CustomerPopup("saveFormPjtCcpy","bcncCode","bcncNm", "05", "N");
	 });
	

};

var cf_SetBindingPjtCcpy = function (){
	fn_SearchGridListPjtCcpy('1');
};

var cf_InitFormPjtCcpy = function (){
	$('#saveFormPjtCcpy').resetForm();
};
/**********************************************************조회**************************************************************/
var fn_SearchGridListPjtCcpy = function (pageNum){
	dhxGridPjtCcpy.clearAll();
    var jsonParameter = {
            projectSn : gf_FormGetValue('saveFormPjtCcpy', 'projectSn', 'text'),
    };
    gf_Transaction(jsonParameter, 'pjtpmg001/searchPjtProjectCcpyList', jsonParameter, 'fn_CallbackSearchGridListPjtCcpy', false, 'GET');
};

var fn_CallbackSearchGridListPjtCcpy = function (strSvcID, targetID, data){
	dhxGridPjtCcpy.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridPjtCcpy.parse(data.data.records, 'js');
    	dhxGridPjtCcpy.selectRow(0);
    	gf_NoFoundDataOnGridMsgRemove('divDataListPjtCcpy'); 
    } else {
    	gf_NoFoundDataOnGridMsg('divDataListPjtCcpy');
    }
    $('#spanPjtCcpyCnt').text(data.data.records.length);
	cf_SetEventListenerPjtCcpy();
};



/**********************************************************신규저장**************************************************************/
/*var fn_SavePjtCcpy = function(){
	if($('#saveFormPjtCcpy').validate().form()){		 
		gf_FormSetValue('saveFormPjtCcpy','projectSn',projectSn,'text');		 
   	    
		gf_Transaction('save', 'pjtpmg001/savePjtCcpy', $('#saveFormPjtCcpy').serialize(), 'fn_CallbackSavePjtCcpy', false, 'POST');
	}
}

var fn_CallbackSavePjtCcpy = function (strSvcID, targetID, data){
	if(data.code === '000') {        
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    	fn_SearchGridListPjtCcpy();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }    
};*/


var fn_RemoveJqueryValidationMsg = function(){
	$('#saveFormPjtCcpy [id$="-error"]').remove();	
};

/**********************************************************삭제**************************************************************/



var fn_CcpyPopup = function (projectSn, ccpySn) {

	var userId = ""; 
	var title  = "협력계약관리";
	var customerInfo = "customerInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	 if(typeof projectSn == "undefined" || projectSn == null){
		 projectSn = "";
     }
	 if(typeof ccpySn == "undefined" || ccpySn == null){
		 ccpySn = "";
     }

	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='ccpyPopup']").size() <= 0) {
		$('body').append("<div id='ccpyPopup' projectSn='" + projectSn + "' ccpySn='" + ccpySn + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#ccpyPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'ccpyPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/pjtpmgCcpyPopup/view';
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
				$('#ccpyPopup .b-close').click();
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
			$('body').find("div[id='ccpyPopup']").remove();
			fn_SearchGridListPjtCcpy();
		}
	},function(){});
	return dhxWindowObj;
};


