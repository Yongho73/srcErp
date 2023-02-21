/**
 * 프로그램 : 프로젝트현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.14
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtBugtPlan;
var dhxGridPjtBugtPlanListInfo;

var dhxGridPjtBugtPlanForm;
var dhxGridPjtBugtPlanFormListInfo;

var projectSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtHnf = gf_LocaleTrans('default','titPjtHnf');

var dhxDataProcessorBugt;

$(function() {

    cf_InitParamBugtPlan();
    cf_SetComponentsBugtPlan();
    cf_SetEventListenerBugtPlan();
    cf_SetBindingBugtPlan();
    cf_InitFormBugtPlan();
});


var cf_InitParamBugtPlan = function (){
	
	
	 
};

var cf_SetComponentsBugtPlan = function (){
	
	/*var dhxGridPjtBugtPlanListInfo = [];
	dhxGridPjtBugtPlanListInfo.push(gf_MakeDhxGridHeader('계정과목', '200', 'center', 'str', 'ro', false, 'gubun1', ''));
	dhxGridPjtBugtPlanListInfo.push(gf_MakeDhxGridHeader('#cspan', '300', 'center', 'str', 'ro', false, 'codeKorNm', ''));	
	dhxGridPjtBugtPlanListInfo.push(gf_MakeDhxGridHeader('합계', '*', 'right', 'int', 'ron', false, 'bugtAmt', ''));
	dhxGridPjtBugtPlanListInfo.push(gf_MakeDhxGridHeader('코드', '100', 'right', 'str', 'ro', true, 'acntCode', ''));
	dhxGridPjtBugtPlanListInfo.push(gf_MakeDhxGridHeader('code', '0', 'center', 'str', 'ro', true, 'code', ''));
	dhxGridPjtBugtPlan = gf_MakeDhxGrid('dataList', dhxGridPjtBugtPlanListInfo, true, false, false);	
	dhxGridPjtBugtPlan.setNumberFormat("0,000", 2, ".", ",");
	dhxGridPjtBugtPlan.setColSorting("na,na,na,na");
	dhxGridPjtBugtPlan.enableRowspan(true);
	dhxGridPjtBugtPlan.enableCollSpan(true);
	dhxGridPjtBugtPlan.enableAutoWidth(true);
	
	dhxGridPjtBugtPlan.attachEvent("onRowSelect", fn_SearchGridListBugtPlanDtls);
		
	dhxGridPjtBugtPlan.enableAutoWidth(true);
	dhxGridPjtBugtPlan.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
	dhxGridPjtBugtPlan.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });*/
	
	var dhxGridPjtBugtPlanFormListInfo = [];
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('No', '30', 'center', 'str', 'ro', false, 'rnum', '')); // 번호
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPjtHngAcmslt" />', '40', 'center', 'na', 'ch', false, 'chk', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('계정과목', '150', 'center', 'str', 'coro', false, 'prmpcTy', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('금액', '100', 'right', 'int', 'edn', false, 'bugtAmt', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('적요', '350', 'center', 'str', 'ed', false, 'bugtSummary', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('등록자', '*', 'center', 'str', 'ro', false, 'regId', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('등록일', '100', 'center', 'str', 'ro', false, 'bugtRegistdt', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '100', 'center', 'str', 'ro', true, 'projectSn', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('예산계획번호', '100', 'center', 'str', 'ro', true, 'bugtPlanSn', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('예산계획번호', '100', 'center', 'str', 'ro', true, 'acntCode', ''));
	dhxGridPjtBugtPlanFormListInfo.push(gf_MakeDhxGridHeader('예산계획번호', '100', 'center', 'str', 'ro', true, 'bugtTit', ''));
	//dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, '', '')); 
    //dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

	dhxGridPjtBugtPlanForm = gf_MakeDhxGrid('bugtList', dhxGridPjtBugtPlanFormListInfo, true, false, false);
	

	dhxGridPjtBugtPlanForm.enableAutoWidth(false);
	dhxGridPjtBugtPlanForm.setColumnMinWidth(100,5);
	dhxGridPjtBugtPlanForm.adjustColumnSize(0);
	
	dhxGridPjtBugtPlanForm.setNumberFormat("0,000", 3, ".", ",");
	
    var jsonParameter = {codekindCode : "C071",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridPjtBugtPlanForm, dhxGridPjtBugtPlanForm.getColIndexById("prmpcTy"), dataSource.data); /* 그리드콤보*/
    
	dhxGridPjtBugtPlanForm.enableEditEvents(true,false,true);
	dhxGridPjtBugtPlanForm.enableMultiline(true);
	dhxGridPjtBugtPlanForm.enableValidation(true);
	dhxGridPjtBugtPlanForm.enableKeyboardSupport(true);

	dhxGridPjtBugtPlanForm.enableAutoWidth(true);
	
	dhxGridPjtBugtPlanForm.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
		var count = dhxGridPjtBugtPlanForm.getRowsNum();
		if(rId == count) return false;		  
		return true;		
	});
	
   
};

var cf_SetEventListenerBugtPlan = function (){

	$('#btnBugtAdd').unbind('click').bind('click', function(rowId){
		gf_NoFoundDataOnGridMsgRemove('bugtList');
		var projectSn = $("#projectSn").val();
		var v_CurDate = new Date();
		v_CurDate.setDate(v_CurDate.getDate());
		var curDate = v_CurDate.format('YYYY-MM-DD');
		//var rowInd = dhxGridPjtBugtPlan.getSelectedRowId();
		var acntCode = 'C071'
		//if(gf_IsNull(rowInd)) {
			dhxGridPjtBugtPlanForm.addRow(dhxGridPjtBugtPlanForm.uid(),['','','','','','',curDate,projectSn,'',acntCode,''],0);
		//} else {
		//	var prmpcTy = dhxGridPjtBugtPlan.cells(rowInd, 4).getValue();
		//	dhxGridPjtBugtPlanForm.addRow(dhxGridPjtBugtPlanForm.uid(),['',prmpcTy,'','','',curDate,projectSn,'',acntCode,''],0);
		//}	
	});
	
	$('#btnBugtSave').unbind('click').bind('click', function(){
    	
		if(fn_GridValidation()) dhxDataProcessorBugt.sendData();
    	
		dhxDataProcessorBugt.attachEvent("onAfterUpdate", function(id,action,tid,dataSource){
    	 	if (dataSource.code !== "000"){                                                 
    		   gf_DivMsgAlert(dataSource.message);                                                             
    	 	}                                                                               
    	    else {                                                                          
    		   gf_DivMsgAlert(gv_MsgSave); 
    		   fn_SearchGridListBugtPlan();
    		   fn_SearchGridListBugtPlanDtl();
    	       return true;                                                                 
    	   }                                                                                
    	 });  
    });
	
	$('#btnBugtRemove').unbind('click').bind('click', function(){
		gf_errorMsgClear();
    	fn_RemovePjtBugt();
		
    });

	$('#bugtAcmslt').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtBugtAcmslt/view?projectSn="+projectSn ;
    });
	
	$('#bugtPlanAcmslt').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtBugtPlanAcmslt/view?projectSn="+projectSn ;
    });
   
};

var cf_SetBindingBugtPlan = function (){
	fn_SearchGridListBugtPlan();
	fn_SearchGridListBugtPlanDtl();
};

var cf_InitFormBugtPlan = function (){};

var cf_InitInputForm = function (){
};

var fn_SearchGridListBugtPlan = function (){

	 var jsonParameter = {
	    		projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
	    };

	    gf_Transaction('gridList', 'pjtpmg001/searchPjtBugtPlanList', jsonParameter, 'fn_CallbackSearchGridListBugtPlan', false, 'GET');
};


var fn_CallbackSearchGridListBugtPlan = function (strSvcID, targetID, data){
	gf_Trace(data);
	//dhxGridPjtBugtPlan.clearAll();
    if(!gf_IsNull(data.data.records)){   	
    //	dhxGridPjtBugtPlan.parse(data.data.records, 'js');   	
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    cf_SetEventListenerBugtPlan();
};

var fn_SearchGridListBugtPlanDtl = function (){
	
	 var jsonParameter = {
	    		projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
	    };

	    gf_Transaction('bugtList', 'pjtpmg001/searchPjtBugtPlanDtlList', jsonParameter, 'fn_CallbackSearchGridListBugtPlanDtl', false, 'GET');
	    
	    dhxDataProcessorBugt = new dataProcessor("/xerp/pjtpmg001/modifyPjtBugtPlanDtlList"); //lock feed url
	    
	    dhxDataProcessorBugt.setTransactionMode('POST',false);
	    dhxDataProcessorBugt.setUpdateMode("off", false); 
	    dhxDataProcessorBugt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtBugtPlanForm,'prmpcTy'), dhtmlxValidation.NotEmpty);
	    dhxDataProcessorBugt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtBugtPlanForm,'bugtAmt'), dhtmlxValidation.NotEmpty);
	    dhxDataProcessorBugt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtBugtPlanForm,'bugtSummary'), dhtmlxValidation.NotEmpty);
	    dhxDataProcessorBugt.init(dhxGridPjtBugtPlanForm); //link dataprocessor to the grid
	    
	    dhxDataProcessorBugt.styles = {	
	            updated:        "font-weight:normal;text-decoration:none;",
	            inserted:       "font-weight:bold; color:green;",
	            deleted:        "color:orange; text-decoration:line-through;",
	            invalid:        "color:green; text-decoration:underline;",
	            error:          "color:blue; text-decoration:underline;",
	            clear:          "font-weight:normal;text-decoration:none;"
	    };
};

var fn_SearchGridListBugtPlanDtls = function (){
	
	//var rowInd = dhxGridPjtBugtPlan.getSelectedRowId();
	//var prmpcTy = dhxGridPjtBugtPlan.cells(rowInd, 4).getValue();
	//var acntCode = dhxGridPjtBugtPlan.cells(rowInd, 3).getValue();
	
	 var jsonParameter = {
	    		projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
	    		prmpcTy : prmpcTy,
	    		acntCode : acntCode,
	    };

	    gf_Transaction('bugtList', 'pjtpmg001/searchPjtBugtPlanDtlList', jsonParameter, 'fn_CallbackSearchGridListBugtPlanDtl', false, 'GET');
};

var fn_CallbackSearchGridListBugtPlanDtl = function (strSvcID, targetID, data){
	dhxGridPjtBugtPlanForm.clearAll();
   if(!gf_IsNull(data.data.records)){   	
	   dhxGridPjtBugtPlanForm.parse(data.data.records, 'js');   	
   } 
   var userLength = data.data.records.length;
   if(userLength != 0){
	   gf_NoFoundDataOnGridMsgRemove('bugtList'); // 조회 데이터가 있으면 메지시 제거
   }else{
	   gf_NoFoundDataOnGridMsg('bugtList'); // 조회없음 메시지 그리드상에 표시
   }
   $("#spanCnt").text(data.data.records.length);
   cf_SetEventListenerBugtPlan();
};

var fn_SavePjtProject = function (rId, cInd) {
   
};

var fn_CheckPjtProject = function (col){
   
};

var fn_RemoveOne = function(){
	
};

var fn_RemovePjtProject = function (){
	var rowId = dhxGridPjtBugtPlanForm.getSelectedRowId();
	var bugtPlanSn = dhxGridPjtBugtPlanForm.cells(rowId, 7).getValue();
	var projectSn = dhxGridPjtBugtPlanForm.cells(rowId, 6).getValue();
	
    var jsonParameter = {
    	bugtPlanSn : bugtPlanSn,
    	projectSn : projectSn,
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/removePjtBugtPlanDtlList', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchGridListBugtPlan();
    	fn_SearchGridListBugtPlanDtl();
    }
};

var fn_RemoveBcnc = function(rId,cInd,state){
	
	
};

var fn_RemovePjtProjectBcnc = function (){
	
};

var fn_ExcelDown = function () {

    
};

var fn_SearchInputPjtProject = function (){

    
};

var fn_GridValidation = function(){
	var valid = true;
	dhxGridPjtBugtPlanForm.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorBugt.getState(rowId))) {
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtBugtPlanForm, rowId, 'prmpcTy', 'grid') )){
				gf_DivMsgAlert("계정과목은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtPlanForm, rowId, 'prmpcTy');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtBugtPlanForm, rowId, 'bugtAmt', 'grid') )){
				gf_DivMsgAlert("금액은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtPlanForm, rowId, 'bugtAmt');
				valid = false;
			}
			if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridPjtBugtPlanForm, rowId, 'bugtAmt', 'grid') )){
				gf_DivMsgAlert("금액은 숫자만 입력 가능합니다.");
				gf_DhxSetValue(dhxGridPjtBugtPlanForm, rowId, 'bugtAmt', '', 'grid');
				fn_GridValidationSelectCell(dhxGridPjtBugtPlanForm, rowId, 'bugtAmt');
				valid = false;
			}
			if(!gv_ValidateMethods.maxlength( gf_DhxGetValue(dhxGridPjtBugtPlanForm, rowId, 'bugtAmt', 'grid'), '15' )){
				gf_DivMsgAlert("금액은 15자리 이하만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtPlanForm, rowId, 'bugtAmt');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtBugtPlanForm, rowId, 'bugtSummary', 'grid') )){
				gf_DivMsgAlert("적요는  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtPlanForm, rowId, 'bugtSummary');
				valid = false;
			}
		}
    });
	return valid;	 
};

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorBugt.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}

var fn_RemovePjtBugt = function() {
	
	 var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPjtBugtPlanForm, 'chk');
	    if(gf_IsNull(rowIds)) {
	        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
	        return false;
	    } else {
	        var state;
	        dhxGridPjtBugtPlanForm.forEachRow(function(rowId) {
	            state = dhxDataProcessorBugt.getState(rowId);
	            if(dhxGridPjtBugtPlanForm.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtBugtPlanForm, 'chk')).isChecked()){
	                if(state == 'inserted') {
	                    var rowNum = dhxGridPjtBugtPlanForm.getRowIndex(rowId);
	                    dhxGridPjtBugtPlanForm.deleteRow(rowId);
	                    dhxGridPjtBugtPlanForm.selectRow(rowNum);
	                }
	                else {
	                	dhxDataProcessorBugt.setUpdated(rowId, true, 'deleted');	
	                }
	            }
	        });
	    }

   

    
};


