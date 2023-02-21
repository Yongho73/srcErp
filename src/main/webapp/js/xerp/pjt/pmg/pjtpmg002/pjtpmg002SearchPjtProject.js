/**
 * 프로그램 : 프로젝트등록 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.15
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtProject;
var dhxGridPjtProjectListInfo;
var projectSn = '';
var fadeRegs = true;
var fadeMode = false;
var titPjtProject = gf_LocaleTrans('default','titPjtProject');

var dhxInputFormProjectSeCodeCombo;
var dhxInputFormProjectAreaCodeCombo;

var dhxDataProcessor;

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("PJTPMG002");
    
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();
    
    var dhxCalendarRealDeStartDate = new dhtmlXCalendarObject({input:"searchSrealDe", button:"startDateIcon"});
    dhxCalendarRealDeStartDate.loadUserLanguage("ko");
    dhxCalendarRealDeStartDate.hideTime();
    var dhxCCalendarRealDeEndDate = new dhtmlXCalendarObject({input:"searchErealDe", button:"endDateIcon"});
    dhxCCalendarRealDeEndDate.loadUserLanguage("ko");
    dhxCCalendarRealDeEndDate.hideTime();
 
    dhxInputFormProjectSeCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboProjectSeCodeBox',
    	    'saveFormPjtProject',
    	    80,
    	    'combo/searchStmCode?codekindCode=C200',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    dhxInputFormProjectAreaCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboProjectAreaCodeBox',
    	    'saveFormPjtProject',
    	    150,
    	    'combo/searchStmCode?codekindCode=C079',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    dhxInputFormCntrctTyCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboCntrctTyCodeBox',
    	    'saveFormPjtProject',
    	    120,
    	    'combo/searchStmCode?codekindCode=C203',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    dhxInputFormComptAtCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboComptAtCodeBox',
    	    'saveFormPjtProject',
    	    80,
    	    'combo/searchStmCode?codekindCode=C201',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    dhxInputFormProjectSeCodeCombo.attachEvent("onChange", function(value, text){
    	
    	if(value == '200') {
    		$("#divInputFormComboCntrctTyCodeBox").show();
    		$(".cont_type").show();
    	}
    	else {
    		$("#divInputFormComboCntrctTyCodeBox").hide();
    		$(".cont_type").hide();
    		$("#entrpsId").val("");
    		$("#entrpsPassword").val("");
    	}
    });
    
    dhxInputFormCntrctTyCodeCombo.attachEvent("onChange", function(value, text){
    	
    	if(value !== '400') {
    		$(".cont_type").show();
    	}
    	else {
    		$(".cont_type").hide();
    		$("#entrpsId").val("");
    		$("#entrpsPassword").val("");
    	}
    });
    
    $("#divInputFormComboCntrctTyCodeBox").hide();
    $(".cont_type").hide();
    
    var dataSource = gf_NoAsyncTransaction('stmcmm001/findUser', '', 'GET');
    var data = dataSource.data;
    gf_FormSetValue('saveFormPjtProject', 'userNm', data.userNm, 'text');
    gf_FormSetValue('saveFormPjtProject', 'empno', data.empno, 'text');

    fn_BcncSearch();
    
};


var cf_SetComponents = function (){
	
	var dhxGridPjtProjectListInfo = [];
	    
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('No', '40', 'center', 'str', 'ro', false, 'rnum', '')); // 번호
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('담당여부', '80', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('담당자', '130', 'center', 'str', 'ed', false, 'chargerNm', '')); // 프로젝트 구분
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('부서', '130', 'center', 'str', 'ed', false, 'chargerDept', '')); // 거래처 코드
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('직위', '130', 'center', 'str', 'ed', false, 'chargerClsf', '')); // 프로젝트 명
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('연락처', '200', 'center', 'str', 'ed', false, 'chargerCttpc', '')); // 프로젝트 PM 명
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('휴대폰', '200', 'center', 'str', 'ed', false, 'chargerMbtlnum', '')); // 거래처 코드
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('이메일', '100', 'center', 'str', 'ed', false, 'chargerEmail', '')); // 거래처 코드
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('sn', '50', 'center', 'str', 'ed', true, 'chargerSn', '')); // 거래처 코드
	    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('거래처코드', '*', 'center', 'str', 'ed', true, 'bcncCode', '')); // 거래처 코드
	    
	
	    dhxGridPjtProject = gf_MakeDhxGrid('dataList', dhxGridPjtProjectListInfo, true, false, false);
	    
		dhxGridPjtProject.enableAutoWidth(false);
		dhxGridPjtProject.setColumnMinWidth(80,9); /* 크기, index값 : 앞에 컬럼 수넣음 */
		dhxGridPjtProject.adjustColumnSize(0);	

	    dhxGridPjtProject.enableEditEvents(true,false,true);
	    //dhxGridPjtProject.enableLightMouseNavigation(true);
	    dhxGridPjtProject.enableAutoWidth(true);
	    dhxGridPjtProject.enableMultiline(true);
	    dhxGridPjtProject.enableValidation(true);
	    dhxGridPjtProject.enableKeyboardSupport(true);
	    
	    dhxGridPjtProject.attachEvent("onCheckbox", function(rId,cInd,state){
	    	
	    	dhxGridPjtProject.forEachRow(function(rowId) {
	    		if(rowId != rId){
	    			dhxGridPjtProject.cells(rowId,1).setValue('0'); 
	    		}
	    	});
		    	
	    	var at = chargerNm = dhxGridPjtProject.cells(rId, 1).getValue();
	    	var chargerNm = dhxGridPjtProject.cells(rId, 2).getValue();
	    	var chargerClsf  = dhxGridPjtProject.cells(rId, 4).getValue();
	    	var chargerCttpc  = dhxGridPjtProject.cells(rId, 5).getValue();
	
	    	if(at == '1') {
	    		gf_FormSetValue('saveFormPjtProject', 'chargerNm', chargerNm + " " + chargerClsf, 'text');
		    	gf_FormSetValue('saveFormPjtProject', 'chargerCttpc', chargerCttpc, 'text');
	    	} 
    	
    });
	    
	    fn_SearchGridList();
};

var cf_SetEventListener = function (){
	
	$('#saveFormPjtProject #btnBcncSearch').unbind('click').bind('click', function(event){
		fn_BcncPopup("saveFormPjtProject","compCd","compNm");
    });
	
	$('#saveFormPjtProject #btnEmpSearch').unbind('click').bind('click', function(event){
    	fn_EmpPopup("saveFormPjtProject","projectPmEmpno","projectPmNm");
    });
	
	$('#btnCustomerAdd').unbind('click').bind('click', function(rowId){
		var bcncCode = $("#compCd").val();
		dhxGridPjtProject.addRow(dhxGridPjtProject.uid(),['',false,'','','','','','','',bcncCode]);
    });
	
	$(document).on("keyup", ".numComma" , function(event) {
		var x = $(this).val();
		$(this).val(numberWithCommas(x));  //숫자표시
	});
	//
	$(document).on("keypress", ".numComma" , function(event) {
		if(event.keyCode<48 || event.keyCode>57)
	    return false;
	});
	
	$('.input_calen').keypress(function(event){
		if(event.keyCode<48 || event.keyCode>57)
		return false;
	});
	
	$('#btnCustomerSave').unbind('click').bind('click', function(){
		for(var i = 2; i < 8; i++){
    		//validation Check
    		dhxDataProcessor.setVerificator(i, fn_empty); // ValidInteger , fn_NumCheck   
    	}                                                                                   
    	dhxDataProcessor.sendData();                                                         
    	//저장후 메시지 처리                                                                     
   
	});
	
	$('#btnCustomerRemove').unbind('click').bind('click', function(){
		gf_DivMsgConfirm(gv_QueDelete, 'fn_Remove()', '');   
	});
	
	 $('#btnFormSave').unbind('click').bind('click', function(){
		 
		 if($('#saveFormPjtProject').validate().form()){

	            var jsonParameter = {
	                projectNm : gf_FormGetValue('saveFormPjtProject', 'projectNm', 'text'),
	                projectCn : gf_FormGetValue('saveFormPjtProject', 'projectCn', 'textarea'),
	                projectScope : gf_FormGetValue('saveFormPjtProject', 'projectScope', 'textarea'),
	                projectEnvrn : gf_FormGetValue('saveFormPjtProject', 'projectEnvrn', 'textarea'),
	                projectArea : dhxInputFormProjectAreaCodeCombo.getSelectedValue(),
	                projectPmEmpno : gf_FormGetValue('saveFormPjtProject', 'projectPmEmpno', 'text'),
	                projectPmNm : gf_FormGetValue('saveFormPjtProject', 'projectPmNm', 'text'),
	                bcncCode : gf_FormGetValue('saveFormPjtProject', 'compCd', 'text'),
	                bcncChargerCode : gf_FormGetValue('saveFormPjtProject', 'bcncChargerCode', 'text'),
	                projectBeginDe : gf_FormGetValue('saveFormPjtProject', 'searchSregDt', 'text').replaceAll('-',''),
	                projectEndDe : gf_FormGetValue('saveFormPjtProject', 'searchEregDt', 'text').replaceAll('-',''),
	                realBeginDe : gf_FormGetValue('saveFormPjtProject', 'searchSrealDe', 'text').replaceAll('-',''),
	                realEndDe : gf_FormGetValue('saveFormPjtProject', 'searchErealDe', 'text').replaceAll('-',''),
	                cntrctAmt : gf_FormGetValue('saveFormPjtProject', 'cntrctAmt', 'text').replaceAll('\,',''),
	                grtsMntnceMcnt : gf_FormGetValue('saveFormPjtProject', 'grtsMntnceMcnt', 'text'),
	                grtsMntnceCn : gf_FormGetValue('saveFormPjtProject', 'grtsMntnceCn', 'textarea'),
	                projectSe : dhxInputFormProjectSeCodeCombo.getSelectedValue(),
	                comptAt : dhxInputFormComptAtCodeCombo.getSelectedValue(),
	                entrpsId : gf_FormGetValue('saveFormPjtProject', 'entrpsId', 'text'),
	                entrpsPassword : gf_FormGetValue('saveFormPjtProject', 'entrpsPassword', 'text'),
	                cntrctTy : dhxInputFormCntrctTyCodeCombo.getSelectedValue(),
	                registEmpno : gf_FormGetValue('saveFormPjtProject', 'empno', 'text'),
	            };

	            var url;

	            if( !gf_IsNull(projectSn) ) {
	                url = "pjtpmg002/modifyPjtProject";
	            } else {
	                url = "pjtpmg002/savePjtProject";
	            }

	            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
	            if(dataSource.code === '000') {

	                if(!gf_IsNull(projectSn)) {
	                    gf_DivMsgAlert(gv_MsgUpdate);
	                } else {
	                    gf_DivMsgAlert(gv_MsgRegist);
	                    cf_InitInputForm();
	                }

	                fn_SearchGridList();
	            }
	        }

	        $('#saveFormPjtProject div.error').unbind("click").bind("click",function() {
	            $(this).remove();
	        });
	 });
};

var numberWithCommas =  function(x){
	x = x.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
	x = x.replace(/,/g,'');          // ,값 공백처리
	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가 
};

var cf_SetBinding = function (){
 
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){
};

var  fn_empty = function(value) {
	return value != "";
};

var fn_SearchGridList = function (){
	
	 var compCd = $("#compCd").val();
	
	 var jsonParameter = {
		        bcncCode: compCd
		    };

	gf_Transaction('gridList', 'pjtpmg002/searchPjtProjectBcncList', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
		    
	dhxDataProcessor = new dataProcessor("/xerp/pjtpmg002/modifyPjtProjectBcncList"); //lock feed url
    dhxDataProcessor.setTransactionMode('POST',false);
    dhxDataProcessor.setUpdateMode("off"); 
    dhxDataProcessor.init(dhxGridPjtProject); //link dataprocessor to the grid
    
    dhxDataProcessor.setVerificator(2,dhtmlxValidation.NotEmpty);
    dhxDataProcessor.setVerificator(3,dhtmlxValidation.NotEmpty);
    dhxDataProcessor.setVerificator(4,dhtmlxValidation.NotEmpty);
    dhxDataProcessor.setVerificator(5,dhtmlxValidation.NotEmpty);
    dhxDataProcessor.setVerificator(6,dhtmlxValidation.NotEmpty);
    dhxDataProcessor.setVerificator(7,dhtmlxValidation.NotEmpty);

};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
	dhxGridPjtProject.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridPjtProject.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SavePjtProject = function (rId, cInd) {
   
};

var fn_CheckPjtProject = function (col){
  
};

var fn_RemoveOne = function(){
  
};

var fn_RemoveAll = function(){
   
};

var fn_Remove = function(){
	var  selectedId = dhxGridPjtProject.getSelectedRowId();
	dhxGridPjtProject.deleteSelectedItem();
	dhxGridPjtProject.setRowHidden(selectedId,true);
};

var fn_RemovePjtProject = function ( projectSns ){
    
};

var fn_ExcelDown = function () {};

var fn_SearchInputPjtProject = function (){

};

var fn_BcncSearch = function(){
    
    var compCd = $("#compCd").val();
    
    if(gf_IsNull(compCd)) {
    	$(".mt5").hide();
    }
    else {
    	$(".mt5").show();
    	cf_SetComponents();
    }
    
};

//거래처팝업
var fn_BcncPopup = function (formId, codeId, codeNmId) {

	var userId = ""; 
	var title  = "거래처 조회";

	//저장팝업\
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='contractCompanyPopup']").size() <= 0) {
		$('body').append("<div id='contractCompanyPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#contractCompanyPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'contractCompanyPopup';
			var ajaxUrl = gv_ContextPath+'/pop/comp/view';
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 500;

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
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='contractCompanyPopup']").remove();
			fn_BcncSearch();
		}
	},function(){});
	return dhxWindowObj;
};
