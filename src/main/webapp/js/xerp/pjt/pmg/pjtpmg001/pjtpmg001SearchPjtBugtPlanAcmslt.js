/**
 * 프로그램 : 프로젝트현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.14
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtBugtPlanAcmslt;
var dhxGridPjtBugtPlanAcmsltListInfo;

var dhxGridPjtBugtPlanAcmsltDtl;
var dhxGridPjtBugtPlanAcmsltDtlListInfo;

var projectSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtHnf = gf_LocaleTrans('default','titPjtHnf');

$(function() {

    cf_InitParamBugtPlanAcmslt();
    cf_SetComponentsBugtPlanAcmslt();
    cf_SetEventListenerBugtPlanAcmslt();
    cf_SetBindingBugtPlanAcmslt();
    cf_InitFormBugtPlanAcmslt();
});


var cf_InitParamBugtPlanAcmslt = function (){
	
	var projectSn = $("#projectSn").val();
	
	var jsonParameter = {
	    	projectSn :projectSn,
	    };
	var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtBugtBaseDt', jsonParameter, 'GET');
	var data = dataSource.data;
	
	gf_FormSetValue('searchFormPjtHfn', 'basisDtList', data.basisDtList, 'text');
	gf_FormSetValue('searchFormPjtHfn', 'columnList', data.columnList, 'text');

	 
};

var cf_SetComponentsBugtPlanAcmslt = function (){
	
	var monthTitle = [];
	var columnList = gf_FormGetValue('searchFormPjtHfn', 'columnList', 'text');
	var colTemp = columnList.split(',');	
	var colCnt = colTemp.length;
	var title = "";
	
	var dhxGridPjtBugtPlanAcmsltListInfo = [];
	dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeaderP('구분', '100', 'center', 'str', 'ro', false, 'gubun1', ''));
	dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeaderP('계정과목 ', '20', 'center', 'str', 'combo', false, 'prmpcTy', ''));;
	dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeaderP('계획금액', '15', 'right', 'int', 'ron', false, 'bugtAmt', ''));
	dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeaderP('실적금액', '15', 'right', 'int', 'ron', false, 'totalSum', ''));
	dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeaderP('집행율', '10', 'right', 'str', 'ro', false, 'avg', ''));
	
	monthTitle[0] =  colTemp[0].trim();
	monthTitle[0] = monthTitle[0].replace("A", "");
	dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeaderP('월별실적', '*', 'right', 'int', 'ron', false, monthTitle[0], ''));

	for(var  k = 1; k < colCnt ; k++) {
		monthTitle[k] =  colTemp[k].trim();
		monthTitle[k] = monthTitle[k].replace("A", "");
		dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeaderP('#cspan', '20', 'right', 'int', 'ron', false, monthTitle[k], ''));
	}
	
	dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeaderP('', '', 'right', 'str', 'ro', true, 'gubun', ''));
	//dhxGridPjtBugtPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미
	//dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, '', '')); 
    //dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미
	
	var aTotalJson = new Array();
		
		aTotalJson.push("#rspan");
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

	dhxGridPjtBugtPlanAcmslt = gf_MakeDhxGridP('dataList', dhxGridPjtBugtPlanAcmsltListInfo, false, true, false, attachHeaderArr);
	
	dhxGridPjtBugtPlanAcmslt.enableAutoWidth(false);
	dhxGridPjtBugtPlanAcmslt.setColumnMinWidth(120,5);
	dhxGridPjtBugtPlanAcmslt.adjustColumnSize(0);
	
	
	dhxGridPjtBugtPlanAcmslt.setNumberFormat("0,000", 2, ".", ",");
	dhxGridPjtBugtPlanAcmslt.setNumberFormat("0,000", 3, ".", ",");
	for(var i = 5; i < colCnt+5; i++) {	
		dhxGridPjtBugtPlanAcmslt.setNumberFormat("0,000", i, ".", ",");
	}
	
	var comboPrmpcTyd = dhxGridPjtBugtPlanAcmslt.getColumnCombo(1);
	comboPrmpcTyd.addOption([['100', '직접인건비(내부직원)'], ['200', '프로젝트추진비'], ['300', '프로젝트보조식비'], ['400', '출장파견비'], ['500', '도서인쇄비'], ['600', '외주용역비(인건비)']
	, ['700', '재료비 (S/W)'], ['800', '재료비 (H/W)'], ['900', '재료비 (N/W)'], ['1000', '체재비'], ['1100', '개발인센티브'], ['1200', '기타경비']]);
	
	dhxGridPjtBugtPlanAcmslt.setColSorting("na,na,na,na,na");
	dhxGridPjtBugtPlanAcmslt.enableAutoWidth(false);
	dhxGridPjtBugtPlanAcmslt.enableRowspan(true);
	dhxGridPjtBugtPlanAcmslt.enableCollSpan(true); 
	dhxGridPjtBugtPlanAcmslt.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
	dhxGridPjtBugtPlanAcmslt.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
	
	dhxGridPjtBugtPlanAcmslt.attachEvent("onRowSelect", function(rId,cInd){ 
		
		dhxGridPjtBugtPlanAcmslt.forEachRow(function(rowId) {
			dhxGridPjtBugtPlanAcmslt.setCellTextStyle(rowId, gf_GetDhxGridColumId(dhxGridPjtBugtPlanAcmslt,'useAmt'),"border:;");
			dhxGridPjtBugtPlanAcmslt.setCellTextStyle(rowId, gf_GetDhxGridColumId(dhxGridPjtBugtPlanAcmslt,'bugtAmt'),"border:;");
			dhxGridPjtBugtPlanAcmslt.forEachRow(function(rId,cInd) {
				
				for(var i=0; i<50; i++){
					dhxGridPjtBugtPlanAcmslt.setCellTextStyle(rId, i,"border:;");
				}
			});
		})
		
		if(cInd == 2 && rId > 1) {
			$("#bugtTitle").html("예산계획 상세");
			dhxGridPjtBugtPlanAcmslt.setCellTextStyle(rId,cInd,"border:2px solid red;");
			
			fn_SearchGridListBugtPlanDtl();
		} else if(cInd > 2) {
			$("#bugtTitle").html("예산실적(월별) 상세");
			var monthValue = [];
			var columnList = gf_FormGetValue('searchFormPjtHfn', 'columnList', 'text');
			var colTemp = columnList.split(',');	
			var colCnt = colTemp.length;
			
			for(var k = 0; k < colCnt ; k++){
				monthValue[k] =  colTemp[k].substr(1).trim();
			}
			var selectedId = dhxGridPjtBugtPlanAcmslt.getSelectedRowId();
	    	var code = dhxGridPjtBugtPlanAcmslt.cells(rId, 1).getValue();
	    	var acntCode = gf_DhxGetValue(dhxGridPjtBugtPlanAcmslt, selectedId, 'gubun', 'grid');
	    	amt = dhxGridPjtBugtPlanAcmslt.cells2(0, cInd).getValue();
	    	var head = monthValue[cInd-5];
	    	
	    	if(cInd > 1){
	    		dhxGridPjtBugtPlanAcmslt.setCellTextStyle(rId,cInd,"border:2px solid red;");
	    		fn_SearchGridListBugtAcmsltDtl(code, head, acntCode, amt);
	    		}
		}
   });
	
	
	
	var dhxGridPjtBugtPlanAcmsltDtlListInfo = [];
	dhxGridPjtBugtPlanAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('No', '80', 'center', 'str', 'ro', false, 'rnum', ''));
	dhxGridPjtBugtPlanAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('계정과목', '200', 'center', 'str', 'combo', false, 'prmpcTy', ''));
	dhxGridPjtBugtPlanAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('금액', '100', 'right', 'int', 'ron', false, 'bugtAmt', ''));;
	dhxGridPjtBugtPlanAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('적요', '200', 'center', 'str', 'ro', false, 'bugtSummary', ''));
	dhxGridPjtBugtPlanAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('등록자', '80', 'center', 'str', 'ro', false, 'regId', ''));
	dhxGridPjtBugtPlanAcmsltDtlListInfo.push(gf_MakeDhxGridHeader('등록일', '*', 'center', 'str', 'ro', false, 'regDt', ''));
	//dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, '', '')); 
    //dhxGridPjtHnfPlanAcmsltListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

	dhxGridPjtBugtPlanAcmsltDtl = gf_MakeDhxGrid('bugtList', dhxGridPjtBugtPlanAcmsltDtlListInfo, true, false, false);
	
	
	dhxGridPjtBugtPlanAcmsltDtl.setColumnMinWidth(100,5);
	

	dhxGridPjtBugtPlanAcmsltDtl.setNumberFormat("0,000", 2, ".", ",");
	
	var comboPrmpcTyd = dhxGridPjtBugtPlanAcmsltDtl.getColumnCombo(1);
	comboPrmpcTyd.addOption([['100', '직접인건비(내부직원)'], ['200', '프로젝트추진비'], ['300', '프로젝트보조식비'], ['400', '출장파견비'], ['500', '도서인쇄비'], ['600', '외주용역비(인건비)']
	, ['700', '재료비 (S/W)'], ['800', '재료비 (H/W)'], ['900', '재료비 (N/W)'], ['1000', '체재비'], ['1100', '개발인센티브'], ['1200', '기타경비']]);
	
	dhxGridPjtBugtPlanAcmsltDtl.enableAutoWidth(true);
	dhxGridPjtBugtPlanAcmsltDtl.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
	dhxGridPjtBugtPlanAcmsltDtl.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
	
};

var cf_SetEventListenerBugtPlanAcmslt = function (){

	$('#bugtAcmslt').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtBugtAcmslt/view?projectSn="+projectSn ;
    });
	
	$('#bugtPlan').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtBugtPlan/view?projectSn="+projectSn ;
    });

   
};

var cf_SetBindingBugtPlanAcmslt = function (){
	fn_SearchGridListBugtPlanAcmslt();
};

var cf_InitFormBugtPlanAcmslt = function (){};

var cf_InitInputForm = function (){
};

var fn_SearchGridListBugtPlanAcmslt = function (){
	
	 var jsonParameter = {
			 	projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
		    };

		    gf_Transaction('gridList', 'pjtpmg001/searchPjtBugtPlanAcmsltList', jsonParameter, 'fn_CallbackSearchGridListBugtPlanAcmslt', false, 'GET');

};


var fn_CallbackSearchGridListBugtPlanAcmslt = function (strSvcID, targetID, data){
	
	dhxGridPjtBugtPlanAcmslt.clearAll();
	   if(!gf_IsNull(data.data.records)){   	
		   dhxGridPjtBugtPlanAcmslt.parse(data.data.records, 'js');   	
	   } 
	   var userLength = data.data.records.length;
	   if(userLength != 0){
		   gf_NoFoundDataOnGridMsgRemove('dataList'); // 조회 데이터가 있으면 메지시 제거
	   }else{
		   gf_NoFoundDataOnGridMsg('dataList'); // 조회없음 메시지 그리드상에 표시
	   }
	   cf_SetEventListenerBugtPlanAcmslt();	   	   
};

var fn_SearchGridListBugtPlanDtl = function (){
	
	var rowInd = dhxGridPjtBugtPlanAcmslt.getSelectedRowId();
	var prmpcTy = dhxGridPjtBugtPlanAcmslt.cells(rowInd, 1).getValue();
	var acntCode = gf_DhxGetValue(dhxGridPjtBugtPlanAcmslt, rowInd, 'gubun', 'grid');
	if(prmpcTy == '소 계') {
		prmpcTy = '';
		acntCode = 'C071';
	}
	
	if(prmpcTy =='직접비 X 35%') {
		prmpcTy = '간접비(직접비 X 35%)'
	}
	
	 var jsonParameter = {
			 	projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
			 	prmpcTy : prmpcTy,
			 	acntCode : acntCode
			 
		    };

		    gf_Transaction('gridList', 'pjtpmg001/searchPjtBugtPlanDtlList', jsonParameter, 'fn_CallbackSearchGridListBugtPlanAcmsltDtl', false, 'GET');

};

var fn_SearchGridListBugtAcmsltDtl = function (code, head, acntCode, amt){
	
	var rowInd = dhxGridPjtBugtPlanAcmslt.getSelectedRowId();
	var prmpcTy = dhxGridPjtBugtPlanAcmslt.cells(rowInd, 1).getValue();
	var cntrAmt = dhxGridPjtBugtPlanAcmslt.cells2(0, 2).getValue();
	var acntCode = gf_DhxGetValue(dhxGridPjtBugtPlanAcmslt, rowInd, 'gubun', 'grid');
	
	if(prmpcTy == '소 계') {
		prmpcTy = '';
		acntCode = 'C071';
	};
	
	if(prmpcTy =='직접비 X 35%') {
		prmpcTy = '간접비(직접비 X 35%)'
	}
	
	 var jsonParameter = {
			 	projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
			 	codeKorNm : prmpcTy,
				cntrAmt : cntrAmt,
				acntCode : acntCode,
				cntrAmt : cntrAmt,
				bugtUsedt : head,
				bugtAmt : amt,
		    };

		    gf_Transaction('gridList', 'pjtpmg001/searchPjtBugtAcmsltDtlList', jsonParameter, 'fn_CallbackSearchGridListBugtPlanAcmsltDtl', false, 'GET');

};

var fn_CallbackSearchGridListBugtPlanAcmsltDtl = function (strSvcID, targetID, data){
	
	dhxGridPjtBugtPlanAcmsltDtl.clearAll();
	   if(!gf_IsNull(data.data.records)){   	
		   dhxGridPjtBugtPlanAcmsltDtl.parse(data.data.records, 'js');   	
	   } 
	   var userLength = data.data.records.length;
	   if(userLength != 0){
		   gf_NoFoundDataOnGridMsgRemove('bugtList'); // 조회 데이터가 있으면 메지시 제거
	   }else{
		   gf_NoFoundDataOnGridMsg('bugtList'); // 조회없음 메시지 그리드상에 표시
	   }
	   $("#spanCnt").text(data.data.records.length);
	   cf_SetEventListenerBugtPlanAcmslt();
};



var fn_SavePjtProject = function (rId, cInd) {
   
};

var fn_CheckPjtProject = function (col){
   
};

var fn_RemoveOne = function(){
	
};

var fn_RemovePjtProject = function (){

};

var fn_RemoveBcnc = function(rId,cInd,state){
	
	
};

var fn_RemovePjtProjectBcnc = function (){
	
};

var fn_ExcelDown = function () {

    
};

var fn_SearchInputPjtProject = function (rId, cInd){
	
	
	
};


