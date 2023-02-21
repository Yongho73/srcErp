/**
 * 프로그램 : 프로젝트현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.14
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtBugtAcmslt;
var dhxGridPjtBugtAcmsltListInfo;

var dhxGridPjtBugtAcmsltDtl;
var dhxGridPjtBugtAcmsltDtlListInfo;

var dhxDataProcessorBugt;

var projectSn = '';
var code = '';
var head = '';
var amt = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtHnf = gf_LocaleTrans('default','titPjtHnf');


$(function() {

    cf_InitParamBugtAcmslt();
    cf_SetComponentsBugtAcmslt();
    cf_SetEventListenerBugtAcmslt();
    cf_SetBindingBugtAcmslt();
    cf_InitFormBugtAcmslt();
});


var cf_InitParamBugtAcmslt = function (){
	
	var projectSn = $("#projectSn").val();
	
	var jsonParameter = {
	    	projectSn :projectSn,
	    };
	var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtBugtBaseDt', jsonParameter, 'GET');
	var data = dataSource.data;
	
	gf_FormSetValue('searchFormPjtBugt', 'basisDtList', data.basisDtList, 'text');
	gf_FormSetValue('searchFormPjtBugt', 'columnList', data.columnList, 'text');
	
	gf_ComboCode('divComboPrmpcTy', 'prmpcTyCodeSearchForm', 'prmpcTy', 'search', 'C071', '' , '', '', 'asc', '');
	
	//기간달력 이벤트 추가
    $('#searchFormBugtAcmslt #searchSregDt').unbind('click').bind('click', function(event){
    	dhxCCalendarDate2.show();
    });
    $('#searchFormBugtAcmslt #searchEregDt').unbind('click').bind('click', function(event){
    	dhxCCalendarDate2.show();
    });
    
    dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
	
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchSregDt').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        	$('#searchEregDt').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
        	dhxCCalendarDate2.hide();
        }
    });
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormBugtAcmslt', 'date22', 'text'));
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");

};

var cf_SetComponentsBugtAcmslt = function (){
	
	var monthTitle = [];
	var columnList = gf_FormGetValue('searchFormPjtBugt', 'columnList', 'text');
	var colTemp = columnList.split(',');	
	var colCnt = colTemp.length;
	var title = "";
	
	var dhxGridPjtBugtAcmsltListInfo = [];
	dhxGridPjtBugtAcmsltListInfo.push(gf_MakeDhxGridHeader('구분', '150', 'center', 'str', 'ro', false, 'gubun1', ''));
	dhxGridPjtBugtAcmsltListInfo.push(gf_MakeDhxGridHeader('계정과목', '180', 'center', 'str', 'ro', false, 'codeKorNm', ''));;
	dhxGridPjtBugtAcmsltListInfo.push(gf_MakeDhxGridHeader('합계', '170', 'right', 'int', 'ron', false, 'totalSum', ''));
	dhxGridPjtBugtAcmsltListInfo.push(gf_MakeDhxGridHeader('계정과목', '150', 'center', 'str', 'combo', true, 'accCd', ''));;

	
		monthTitle[0] =  colTemp[0].trim();
		monthTitle[0] = monthTitle[0].replace("A", "");
		dhxGridPjtBugtAcmsltListInfo.push(gf_MakeDhxGridHeader('월별소요경비', '100', 'right', 'int', 'ron', false, monthTitle[0], ''));
	
		for(var  k = 1; k < colCnt ; k++) {
			monthTitle[k] =  colTemp[k].trim();
			monthTitle[k] = monthTitle[k].replace("A", "");
			dhxGridPjtBugtAcmsltListInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'ron', false, monthTitle[k], ''));
		}
	//dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, '', '')); 
	dhxGridPjtBugtAcmsltListInfo.push(gf_MakeDhxGridHeader('acncCode', '100', 'center', 'str', 'ro', true, 'gubun', '')); // 더미
	dhxGridPjtBugtAcmsltListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미
	
	var aTotalJson = new Array();
	
	aTotalJson.push("#rspan");
	aTotalJson.push("#rspan");
	aTotalJson.push("#rspan");
	aTotalJson.push("#rspan");

	if (!gf_IsNull(columnList)){	
		for(var k = 0; k < colCnt ; k++){
		monthTitle[k] = colTemp[k].substr(1).trim();
		
		var a = parseInt(monthTitle[k].substr(4,2));
		if (a == '1'){
			monthTitle[k] = parseInt(monthTitle[k].substr(0,4)) + "년" + parseInt(monthTitle[k].substr(4,2)) + "월";
		} else{
		monthTitle[k] = parseInt(monthTitle[k].substr(4,2)) + "월";
		}
		aTotalJson.push(monthTitle[k]);
		}
	}
	aTotalJson.push("#rspan");
	
	var attachHeaderArr = [];
    attachHeaderArr.push(aTotalJson); //'1월','2월'

	//dhxGridPjtBugtAcmslt = gf_MakeDhxGrid('', dhxGridPjtBugtAcmsltListInfo,  false, true, false, attachHeaderArr);
	
	//var comboPrmpcTyd = dhxGridPjtBugtAcmslt.getColumnCombo(3);
	//comboPrmpcTyd.addOption([['100', '직접인건비(내부직원)'], ['200', '프로젝트추진비'], ['300', '프로젝트보조식비'], ['400', '출장파견비'], ['500', '도서인쇄비'], ['600', '외주용역비(인건비)']
	//, ['700', '재료비 (S/W)'], ['800', '재료비 (H/W)'], ['900', '재료비 (N/W)'], ['1000', '체재비'], ['1100', '개발인센티브'], ['1200', '기타경비']]);
	//dhxGridPjtBugtAcmslt.setNumberFormat("0,000", 2, ".", ",");
	//for(var i = 4; i < colCnt+4; i++) {	
	//	dhxGridPjtBugtAcmslt.setNumberFormat("0,000", i, ".", ",");
	//}
	/*dhxGridPjtBugtAcmslt.enableRowspan(true);
	dhxGridPjtBugtAcmslt.enableCollSpan(true);
	dhxGridPjtBugtAcmslt.setColSorting("na,na,na,na");
	dhxGridPjtBugtAcmslt.enableMathEditing(true);
	dhxGridPjtBugtAcmslt.enableAutoWidth(true);
	dhxGridPjtBugtAcmslt.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
	
	dhxGridPjtBugtAcmslt.attachEvent("onRowSelect", function(rId,cInd){ 
		
		var monthValue = [];
		var columnList = gf_FormGetValue('searchFormPjtBugt', 'columnList', 'text');
		var colTemp = columnList.split(',');	
		var colCnt = colTemp.length;
		
		dhxGridPjtBugtAcmslt.forEachRow(function(rId,cInd) {
		
			for(var i=0; i<50; i++){
				dhxGridPjtBugtAcmslt.setCellTextStyle(rId, i,"border:;");
			}
		});
		
		for(var k = 0; k < colCnt ; k++){
			monthValue[k] =  colTemp[k].substr(1).trim();
		}
		var selectedId = dhxGridPjtBugtAcmslt.getSelectedRowId();
    	var code = dhxGridPjtBugtAcmslt.cells(rId, 3).getValue();
    	var acntCode = gf_DhxGetValue(dhxGridPjtBugtAcmslt, selectedId, 'gubun', 'grid');
    	amt = dhxGridPjtBugtAcmslt.cells2(0, cInd).getValue();
    	var head = monthValue[cInd-4];
    	
    	if(cInd > 1){
    		dhxGridPjtBugtAcmslt.setCellTextStyle(rId,cInd,"border:2px solid red;");
    		fn_SearchGridListBugtAcmsltDtl(code, head, acntCode, amt);
    		}

   });
*/
	var dhxGridPjtBugtAcmsltDtlListInfo = [];
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('No', '30', 'center', 'str', 'ro', false, 'num', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPjtHngAcmslt" />', '40', 'center', 'na', 'ch', false, 'chk', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('기준년월', '80', 'center', 'str', 'ro', false, 'baseMonth', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('사용일', '80', 'center', 'str', 'dhxCalendar', false, 'bugtUsedt', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('계정과목', '150', 'center', 'str', 'coro', false, 'prmpcTy', ''));;
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('금액', '100', 'right', 'int', 'edn', false, 'bugtAmt', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('적요', '300', 'center', 'str', 'ed', false, 'bugtSummary', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('등록자', '80', 'center', 'str', 'ro', false, 'regId', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('등록일', '*', 'center', 'str', 'ro', false, 'regDt', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'projectSn', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'bugtAcmsltSn', ''));
	dhxGridPjtBugtAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('', '100', 'center', 'str', 'ro', true, 'codekindCode', ''));
	
	dhxGridPjtBugtAcmsltDtl = gf_MakeDhxGrid('bugtList', dhxGridPjtBugtAcmsltDtlListInfo, true, false, false);
	
	
	dhxGridPjtBugtAcmsltDtl.enableAutoWidth(false);
	dhxGridPjtBugtAcmsltDtl.setColumnMinWidth(100,8);
	dhxGridPjtBugtAcmsltDtl.adjustColumnSize(0);
	
	dhxGridPjtBugtAcmsltDtl.setNumberFormat("0,000", 5, ".", ",");
	
    var jsonParameter = {codekindCode : "C071",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridPjtBugtAcmsltDtl, dhxGridPjtBugtAcmsltDtl.getColIndexById("prmpcTy"), dataSource.data); /* 그리드콤보*/

	dhxGridPjtBugtAcmsltDtl.attachEvent("onCalendarShow", function(myCal,rId,colInd){
		myCal.hideTime(); 
		myCal.hideToday(); 
		myCal.loadUserLanguage("ko");
		});
	
	dhxGridPjtBugtAcmsltDtl.attachEvent("onRowSelect", function(rId,cInd){ 
		fn_BaseMonth();
	});

	dhxGridPjtBugtAcmsltDtl.setDateFormat("%Y-%m-%d");
	
	dhxGridPjtBugtAcmsltDtl.enableEditEvents(true,false,true);
	dhxGridPjtBugtAcmsltDtl.enableMultiline(true);
	dhxGridPjtBugtAcmsltDtl.enableValidation(true);
	dhxGridPjtBugtAcmsltDtl.enableKeyboardSupport(true);
	
	dhxGridPjtBugtAcmsltDtl.enableAutoWidth(true);
};

var cf_SetEventListenerBugtAcmslt = function (){

	$('#bugtPlan').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtBugtPlan/view?projectSn="+projectSn ;
    });
	
	$('#bugtPlanAcmslt').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtBugtPlanAcmslt/view?projectSn="+projectSn ;
    });
	
	$('#btnSearch').unbind('click').bind('click', function(event){
		fn_SearchGridListBugtAcmsltDtl();
    });
	
	$('#btnInit').unbind('click').bind('click', function(event){
		$('#searchFormBugtAcmslt').resetForm();
		//gf_FormSetValue("searchFormBugtAcmslt", "prmpcTyCodeSearchForm", "0", "combo"); 
    });
	
	$('#btnBugtAdd').unbind('click').bind('click', function(event){
		gf_NoFoundDataOnGridMsgRemove('bugtList');
		var v_CurDate = new Date();
		v_CurDate.setDate(v_CurDate.getDate());
		var curDate = v_CurDate.format('YYYY-MM-DD');
		var projectSn = $("#projectSn").val();
		//var rowInd = dhxGridPjtBugtAcmslt.getSelectedRowId();
		//if(gf_IsNull(rowInd)) {
			dhxGridPjtBugtAcmsltDtl.addRow(dhxGridPjtBugtAcmsltDtl.uid(),['','','','','','','','',curDate,projectSn,''],0);
		//} else {
		//	var prmpcTy = dhxGridPjtBugtAcmslt.cells(rowInd, 1).getValue();
		//	dhxGridPjtBugtAcmsltDtl.addRow(dhxGridPjtBugtAcmsltDtl.uid(),['','', prmpcTy,'','','',curDate,projectSn,''],0);
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
    		   fn_SearchGridListBugtAcmslt();
    		   fn_SearchGridListBugtAcmsltDtl();
    	       return true;                                                                 
    	   }                                                                                
    	 });  	
    });

	$('#btnBugtRemove').unbind('click').bind('click', function(){
		/*var rowInd = dhxGridPjtBugtAcmsltDtl.getSelectedRowId();
		var rnum = dhxGridPjtBugtAcmsltDtl.cells(rowInd, 0).getValue();
		if( rowInd == null) {
			gf_DivMsgAlert("삭제할 행을 선택해 주세요.");
		} else if(rnum == ''){
			dhxGridPjtBugtAcmsltDtl.deleteRow(rowInd);
		} else gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtProjectBugt()', '');*/
		
		gf_errorMsgClear();
    	fn_RemovePjtBugtAcmslt();
	});
	
};

var cf_SetBindingBugtAcmslt = function (){
	fn_SearchGridListBugtAcmslt();

};

var cf_InitFormBugtAcmslt = function (){};

var cf_InitInputForm = function (){
};

var fn_SearchGridListBugtAcmslt = function (){
	 var jsonParameter = {
			 	projectSn : gf_FormGetValue('searchFormPjtBugt', 'projectSn', 'text'),
			 	basisDtList : gf_FormGetValue('searchFormPjtBugt', 'basisDtList', 'text'),
			 	columnList : gf_FormGetValue('searchFormPjtBugt', 'columnList', 'text'),
		    };

		    gf_Transaction('gridList', 'pjtpmg001/searchPjtBugtAcmsltList', jsonParameter, 'fn_CallbackSearchGridListBugtAcmslt', false, 'GET');
};


var fn_CallbackSearchGridListBugtAcmslt = function (strSvcID, targetID, data){
	//dhxGridPjtBugtAcmslt.clearAll();
	   if(!gf_IsNull(data.data.records)){   	
		   //dhxGridPjtBugtAcmslt.parse(data.data.records, 'js'); 
		   //dhxGridPjtBugtAcmslt.selectRow(0);
		   fn_SearchGridListBugtAcmsltDtl();
	   } 
	   var userLength = data.data.records.length;
	   if(userLength != 0){
		   gf_NoFoundDataOnGridMsgRemove('dataList'); // 조회 데이터가 있으면 메지시 제거
	   }else{
		   gf_NoFoundDataOnGridMsg('dataList'); // 조회없음 메시지 그리드상에 표시
	   }
	   
	    cf_SetEventListenerBugtAcmslt();

};

var fn_SearchGridListBugtAcmsltDtl = function (code, head, acntCode, amt){

	 //var cntrAmt = dhxGridPjtBugtAcmslt.cells2(0, 2).getValue();
	 var jsonParameter = {
	
			 	projectSn : gf_FormGetValue('searchFormPjtBugt', 'projectSn', 'text'),
			 	prmpcTy : gf_FormGetValue('searchFormBugtAcmslt', 'prmpcTy', 'combo'),
			 	bugtUsedt : head,
			 	acntCode : acntCode,
			 	bugtAmt : amt,
			 	//cntrAmt : cntrAmt
			 	
		    };

		    gf_Transaction('gridList', 'pjtpmg001/searchPjtBugtAcmsltDtlList', jsonParameter, 'fn_CallbackSearchGridListBugtAcmsltDtl', false, 'GET');
		    
		    dhxDataProcessorBugt = new dataProcessor("/xerp/pjtpmg001/modifyPjtBugtAcmsltDtlList"); //lock feed url
		    
		    dhxDataProcessorBugt.setTransactionMode('POST',false);
		    dhxDataProcessorBugt.setUpdateMode("off", false); 
		    dhxDataProcessorBugt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtBugtAcmsltDtl,'bugtUsedt'), dhtmlxValidation.NotEmpty);
		    dhxDataProcessorBugt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtBugtAcmsltDtl,'prmpcTy'), dhtmlxValidation.NotEmpty);
		    dhxDataProcessorBugt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtBugtAcmsltDtl,'bugtAmt'), dhtmlxValidation.NotEmpty);
		    //dhxDataProcessorBugt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtBugtAcmsltDtl,'bugtSummary'), dhtmlxValidation.NotEmpty);
		    dhxDataProcessorBugt.init(dhxGridPjtBugtAcmsltDtl); //link dataprocessor to the grid
		    
		    dhxDataProcessorBugt.styles = {	
		            updated:        "font-weight:normal;text-decoration:none;",
		            inserted:       "font-weight:bold; color:green;",
		            deleted:        "color:orange; text-decoration:line-through;",
		            invalid:        "color:green; text-decoration:underline;",
		            error:          "color:blue; text-decoration:underline;",
		            clear:          "font-weight:normal;text-decoration:none;"
		    };
		    
		    dhxDataProcessorBugt.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
		    	if (dataSource.code == "000" || dataSource.data.code !== "000"){
		    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
		    		fn_SearchGridListBugtAcmsltDtl();
		    		return true;
			 	} else {
			 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
			 		return false;
			 	}
		    });  

		    
};


var fn_CallbackSearchGridListBugtAcmsltDtl = function (strSvcID, targetID, data){
	dhxGridPjtBugtAcmsltDtl.clearAll();
	   if(!gf_IsNull(data.data.records)){   	
		   dhxGridPjtBugtAcmsltDtl.parse(data.data.records, 'js');   	
	   } 
	   var userLength = data.data.records.length;
	   if(userLength != 0){
		   gf_NoFoundDataOnGridMsgRemove('bugtList'); // 조회 데이터가 있으면 메지시 제거
	   }else{
		   gf_NoFoundDataOnGridMsg('bugtList'); // 조회없음 메시지 그리드상에 표시
	   }
	   $("#spanCnt").text(data.data.records.length);
	   cf_SetEventListenerBugtAcmslt();
	   fn_BaseMonth();
};


var fn_SavePjtProject = function (rId, cInd) {
   
};

var fn_CheckPjtProject = function (col){
   
};

var fn_RemoveOne = function(){
	
};

var fn_RemoveBcnc = function(rId,cInd,state){
	
	
};

var fn_RemovePjtProjectBugt = function (){
	var rowId = dhxGridPjtBugtAcmsltDtl.getSelectedRowId();

	var bugtAcmsltSn = dhxGridPjtBugtAcmsltDtl.cells(rowId, 9).getValue();
	var projectSn = dhxGridPjtBugtAcmsltDtl.cells(rowId, 8).getValue();
	
    var jsonParameter = {
    	bugtAcmsltSn : bugtAcmsltSn,
    	projectSn : projectSn,
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/removePjtBugtAcmsltDtlList', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchGridListBugtAcmslt();
    	fn_SearchGridListBugtAcmsltDtl();
    }
};

var fn_ExcelDown = function () {

    
};

var fn_SearchInputPjtProject = function (){
};

var fn_GridValidation = function(){
	var valid = true;
	dhxGridPjtBugtAcmsltDtl.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorBugt.getState(rowId))) {
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtUsedt', 'grid') )){
				gf_DivMsgAlert("사용일은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtUsedt');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtBugtAcmsltDtl, rowId, 'prmpcTy', 'grid') )){
				gf_DivMsgAlert("계정과목은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtAcmsltDtl, rowId, 'prmpcTy');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtAmt', 'grid') )){
				gf_DivMsgAlert("금액은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtAmt');
				valid = false;
			}
			if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtAmt', 'grid') )){
				gf_DivMsgAlert("금액은 숫자만 입력 가능합니다.");
				gf_DhxSetValue(dhxGridPjtBugtPlanForm, rowId, 'bugtAmt', '', 'grid');
				fn_GridValidationSelectCell(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtAmt');
				valid = false;
			}
			if(!gv_ValidateMethods.maxlength( gf_DhxGetValue(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtAmt', 'grid') , '15')){
				gf_DivMsgAlert("금액은 15자리 이하만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtAmt');
				valid = false;
			}
		/*	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtSummary', 'grid') )){
				gf_DivMsgAlert("적요는  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtSummary');
				valid = false;
			}*/
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

var fn_BaseMonth = function() {
	dhxGridPjtBugtAcmsltDtl.forEachRow(function(rowId) {
		var baseMonth = gf_DhxGetValue(dhxGridPjtBugtAcmsltDtl, rowId, 'bugtUsedt', 'grid');	
		baseMonth = baseMonth.substr(0,7);
		dhxGridPjtBugtAcmsltDtl.cells(rowId,dhxGridPjtBugtAcmsltDtl.getColIndexById("baseMonth")).setValue(baseMonth);
	});
};

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
};

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
};

var fn_RemovePjtBugtAcmslt = function() {
	
	 var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPjtBugtAcmsltDtl, 'chk');
	    if(gf_IsNull(rowIds)) {
	        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
	        return false;
	    } else {
	        var state;
	        dhxGridPjtBugtAcmsltDtl.forEachRow(function(rowId) {
	            state = dhxDataProcessorBugt.getState(rowId);
	            if(dhxGridPjtBugtAcmsltDtl.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtBugtAcmsltDtl, 'chk')).isChecked()){
	                if(state == 'inserted') {
	                    var rowNum = dhxGridPjtBugtAcmsltDtl.getRowIndex(rowId);
	                    dhxGridPjtBugtAcmsltDtl.deleteRow(rowId);
	                    dhxGridPjtBugtAcmsltDtl.selectRow(rowNum);
	                }
	                else {
	                	dhxDataProcessorBugt.setUpdated(rowId, true, 'deleted');	
	                }
	            }
	        });
	    }
};
