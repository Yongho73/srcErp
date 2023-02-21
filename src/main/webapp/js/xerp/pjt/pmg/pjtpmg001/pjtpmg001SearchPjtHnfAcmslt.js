/**
 * 프로그램 : 프로젝트현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.14
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtHnfAcmslt;
var dhxGridPjtHnfAcmsltListInfo;

var projectSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtHnf = gf_LocaleTrans('default','titPjtHnf');

var dhxDataProcessorHnfAcmslt;

$(function() {

    cf_InitParamHnfAcmslt();
    cf_SetComponentsHnfAcmslt();
    cf_SetEventListenerHnfAcmslt();
    cf_SetBindingHnfAcmslt();
    cf_InitFormHnAcmslt();
});


var cf_InitParamHnfAcmslt = function (){
	
	 fn_SetMenuPath("PJTPMG001");
	 
	 $('.input_calen').unbind('keyup').bind('keyup', function(event){
			//숫자
	    	dateChk($(this));
	    });
	    
		//기간달력 이벤트 추가
	    $('#searchSregDt').unbind('click').bind('click', function(event){
	    	dhxCCalendarDate2.show();
	    });
	    $('#searchEregDt').unbind('click').bind('click', function(event){
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
		dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormHnfAcmslt', 'date22', 'text'));
		dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
		dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
		
		// 시스템 환경설정 검색 기간 설정
	   // gf_SettingDateInterval('searchSregDt', 'searchEregDt'); 
		
	 
};

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="searchSregDt" || e.target.id =="searchEregDt") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

var cf_SetComponentsHnfAcmslt = function (){
	
	var dhxGridPjtHnfAcmsltListInfo = [];
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '30', 'center', 'str', 'ro', false, 'num', '', ''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPjtHngAcmslt" />', '40', 'center', 'na', 'ch', false, 'chk', ''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('기준년월', '100', 'center', 'str', 'dhxCalendar', false, 'acmsltStdrDe', ''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('사원번호', '130', 'center', 'str', 'ro', false, 'prtcpntEmpno', ''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('성명', '100', 'center', 'str', 'ro', false, 'prtcpntNm', ''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchEmpButton',false,'searchEmpButton','',''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('기술등급', '130', 'center', 'str', 'coro', false, 'tchnlgyGrad', '')); 
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('역할', '130', 'center', 'str', 'coro', false, 'roleCode', '')); 
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('M/M', '130', 'center', 'date', 'edn', false, 'partcptnManMonth', '')); 
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('외부인력', '*', 'center', 'str', 'ch', false, 'extrl', '',''));
	
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, 'hnfAcmsltSn', ''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, 'projectSn', ''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('divideCode', '0', 'center', 'str', 'ro', true, 'divideCode', ''));
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('divideCode', '0', 'center', 'str', 'ro', true, 'disOrder', ''));

	dhxGridPjtHnfAcmslt = gf_MakeDhxGrid('acmsltList', dhxGridPjtHnfAcmsltListInfo, true, false, false);
	
	dhxGridPjtHnfAcmslt.enableAutoWidth(false);
	dhxGridPjtHnfAcmslt.setColumnMinWidth(80,9);
	dhxGridPjtHnfAcmslt.adjustColumnSize(0);	
	
	dhxGridPjtHnfAcmslt.enableEditEvents(false,true,true);
	dhxGridPjtHnfAcmslt.setEditable(true);
	
	dhxGridPjtHnfAcmslt.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
		
			if(dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("divideCode")).getValue() =="88" ||
			   dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("divideCode")).getValue() =="99") {
				return false;	
			} else return true;		
	});
	
	dhxGridPjtHnfAcmslt.attachEvent("onRowSelect", function(rId,cInd){ 
		if(dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("divideCode")).getValue() =="88" ||
		   dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("divideCode")).getValue() =="99") {
		   dhxGridPjtHnfAcmslt.clearSelection();
		} else {
			if(dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("extrl")).getValue() =="0") {
				dhxGridPjtHnfAcmslt.setColTypes("ro,ch,dhxCalendar,ro,ro,searchEmpButton,coro,coro,edn,ch,ro,ro,ro,ro,ro");
			} else {
				dhxGridPjtHnfAcmslt.setColTypes("ro,ch,dhxCalendar,ro,ed,searchEmpButton,coro,coro,edn,ch,ro,ro,ro,ro,ro");
			}
			if(cInd == gf_GetDhxGridColumId(dhxGridPjtHnfAcmslt, 'searchEmpButton')) { 
				if(dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("extrl")).getValue() =="0") {
					fn_gridSearchEmpButton( rId );
				} else {
					gf_DivMsgAlert("외부인력의 경우 성명은 직접 입력해 주세요."); 
				}
	     	}
			if(dhxGridPjtHnfAcmslt.getColIndexById("prtcpntEmpno") == cInd){
				if(dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("extrl")).getValue() =="0") {
					fn_gridSearchEmpButton( rId );
				} else {
					gf_DivMsgAlert("외부인력의 경우 성명은 직접 입력해 주세요."); 
				}
			}
			if(dhxGridPjtHnfAcmslt.getColIndexById("prtcpntNm") == cInd){
				if(dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("extrl")).getValue() =="0") {
					fn_gridSearchEmpButton( rId );
				} else {
					
				}
			}
		}		
	});
	
	dhxGridPjtHnfAcmslt.attachEvent("onCheck", function(rId,cInd,state){ 
		if(state == true){
			if(cInd == 9){
				dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("prtcpntEmpno")).setValue('');	
				dhxGridPjtHnfAcmslt.cells(rId,dhxGridPjtHnfAcmslt.getColIndexById("prtcpntNm")).setValue('');
			}
				
		}
		
	});

	dhxGridPjtHnfAcmslt.enableAutoWidth(false);
	dhxGridPjtHnfAcmslt.setColSorting("na,na,na,na,na,na");
	
	dhxGridPjtHnfAcmslt.attachEvent("onCalendarShow", function(myCal,rId,colInd){ myCal.hideTime(); myCal.hideToday(); myCal.loadUserLanguage("ko");});
	dhxGridPjtHnfAcmslt.setDateFormat("%Y-%m");
	
	var jsonParameter = {codekindCode : "C021",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridPjtHnfAcmslt, dhxGridPjtHnfAcmslt.getColIndexById("tchnlgyGrad"), dataSource.data); /* 그리드콤보*/
    
    var jsonParameter = {codekindCode : "C026",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridPjtHnfAcmslt, dhxGridPjtHnfAcmslt.getColIndexById("roleCode"), dataSource.data); /* 그리드콤보*/

};

var cf_SetEventListenerHnfAcmslt = function (){

	$('#hnfPlan').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtHnf/view?projectSn="+projectSn ;
    });
	
	$('#hnfPlanAcmslt').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtHnfPlanAcmslt/view?projectSn="+projectSn ;
    });
	
	$('#btnHnfPlanAdd').unbind('click').bind('click', function(rowId){
		gf_NoFoundDataOnGridMsgRemove('acmsltList');
		var projectSn = $("#projectSn").val();
		dhxGridPjtHnfAcmslt.addRow(dhxGridPjtHnfAcmslt.uid(),['','','','','','','','','',0,'',projectSn,''],0);
	});
	
	$('#btnHnfPlanSave').unbind('click').bind('click', function(){
    	
		if(fn_GridValidation()) dhxDataProcessorHnfAcmslt.sendData();
    	
		dhxDataProcessorHnfAcmslt.attachEvent("onAfterUpdate", function(id,action,tid,dataSource){
    	 	if (dataSource.code !== "000"){                                                 
    		                                                              
    	 	}                                                                               
    	    else {                                                                          
    		   gf_DivMsgAlert(gv_MsgSave); 
    		   fn_SearchGridListHnfAcmslt();
    		   fn_modifyPjtProjectHnfBugtAcmslt();
    	       return true;                                                                 
    	   }                                                                                
    	 });              
    });
	
	$('#btnHnfPlanRemove').unbind('click').bind('click', function(){
		/*var rowInd = dhxGridPjtHnfAcmslt.getSelectedRowId();
		var rnum = dhxGridPjtHnfAcmslt.cells(rowInd, 0).getValue();
		if( rowInd == null) {
			gf_DivMsgAlert("삭제할 행을 선택해 주세요.");
		} else if(rnum == '') {
			dhxGridPjtHnfAcmslt.deleteRow(rowInd);
		} else gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtProjectHnfAcmslt()', '');*/
		gf_errorMsgClear();
		fn_RemovePjtHnfAcmslt();
	});
    	
	$('#btnSearch').unbind('click').bind('click', function(event){
		fn_SearchGridListHnfAcmslt();
    });
   
	$('#btnClear').unbind("click").bind("click",function() {
    	cf_InitInputSearch();
    });
    
    $('#copyMonth').unbind("click").bind("click",function() {
		gf_DivMsgConfirm('전월 인력실적 데이터를 복사하시겠습니까?','fn_copyMonth()','');
    });
    
    $('#copyHnfPlan').unbind("click").bind("click",function() {
    	gf_DivMsgConfirm('인력계획에서 복사하시겠습니까?', 'fn_copyHnfPlan()', '');
    });
};

var cf_SetBindingHnfAcmslt = function (){
	fn_SearchGridListHnfAcmslt();
};

var cf_InitFormHnAcmslt = function (){};

var cf_InitInputSearch = function (){
	
	gf_FormSetValue('searchFormHnfAcmslt', 'prtcpntNm', '', 'text');
	gf_FormSetValue('searchFormHnfAcmslt', 'searchSregDt', '', 'text');
	gf_FormSetValue('searchFormHnfAcmslt', 'searchEregDt', '', 'text');
};

var fn_SearchGridListHnfAcmslt = function (){

	 var jsonParameter = {
	    		projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
	    		searchSregDt : gf_FormGetValue('searchFormHnfAcmslt', 'searchSregDt', 'text'),
	    		searchEregDt : gf_FormGetValue('searchFormHnfAcmslt', 'searchEregDt', 'text'),
	    	    prtcpntNm : gf_FormGetValue('searchFormHnfAcmslt', 'prtcpntNm', 'text'),
	    };

	    gf_Transaction('gridList', 'pjtpmg001/searchPjtProjectHnfAcmsltList', jsonParameter, 'fn_CallbackSearchGridListHnfAcmslt', false, 'GET');
	    
	    dhxDataProcessorHnfAcmslt = new dataProcessor("/xerp/pjtpmg001/modifyPjtProjectHnfAcmsltList"); //lock feed url
	    
	    dhxDataProcessorHnfAcmslt.setTransactionMode('POST',false);
	    dhxDataProcessorHnfAcmslt.setUpdateMode("off", false); 
	    dhxDataProcessorHnfAcmslt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnfAcmslt,'acmsltStdrDe'), dhtmlxValidation.NotEmpty);
	    dhxDataProcessorHnfAcmslt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnfAcmslt,'prtcpntNm'), dhtmlxValidation.NotEmpty);
	    dhxDataProcessorHnfAcmslt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnfAcmslt,'tchnlgyGrad'), dhtmlxValidation.NotEmpty);
	    dhxDataProcessorHnfAcmslt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnfAcmslt,'roleCode'), dhtmlxValidation.NotEmpty);
	    dhxDataProcessorHnfAcmslt.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnfAcmslt,'partcptnManMonth'), dhtmlxValidation.NotEmpty);
	    
	    dhxDataProcessorHnfAcmslt.init(dhxGridPjtHnfAcmslt); //link dataprocessor to the grid
	    
	    dhxDataProcessorHnfAcmslt.styles = {	
	            updated:        "font-weight:normal;text-decoration:none;",
	            inserted:       "font-weight:bold; color:green;",
	            deleted:        "color:orange; text-decoration:line-through;",
	            invalid:        "color:green; text-decoration:underline;",
	            error:          "color:blue; text-decoration:underline;",
	            clear:          "font-weight:normal;text-decoration:none;"
	    };
  
};


var fn_CallbackSearchGridListHnfAcmslt = function (strSvcID, targetID, data){
	dhxGridPjtHnfAcmslt.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridPjtHnfAcmslt.parse(data.data.records, 'js');
    	
    	dhxGridPjtHnfAcmslt.forEachRow(function(id){
    		//합계 표시 
			if( dhxGridPjtHnfAcmslt.cells(id,dhxGridPjtHnfAcmslt.getColIndexById("divideCode")).getValue() =="88"){ //월별소계

				dhxGridPjtHnfAcmslt.cells(id,1).setValue('소계');	
				dhxGridPjtHnfAcmslt.setRowColor(id,"#E6E6E6");
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,1,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,2,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,3,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,4,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,5,"color:#000;font-weight:bold;");	
			}
			if( dhxGridPjtHnfAcmslt.cells(id,dhxGridPjtHnfAcmslt.getColIndexById("divideCode")).getValue() =="99"){ //

				dhxGridPjtHnfAcmslt.cells(id,1).setValue('합계');	
				dhxGridPjtHnfAcmslt.setRowColor(id,"#BFBFBF");
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,1,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,2,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,3,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,4,"color:#000;font-weight:bold;");				
				dhxGridPjtHnfAcmslt.setCellTextStyle(id,5,"color:#000;font-weight:bold;");	
			}	
			if(dhxGridPjtHnfAcmslt.cells(id,dhxGridPjtHnfAcmslt.getColIndexById("chk")).getValue() =="1"){
				dhxGridPjtHnfAcmslt.cells(id,1).setValue("0");	
			}
		}); 
    	
    	
    }
    var userLength = data.data.records.length;
 	    if(userLength != 0){
 	        gf_NoFoundDataOnGridMsgRemove('acmsltList'); // 조회 데이터가 있으면 메지시 제거
 	     }else{
 	    	gf_NoFoundDataOnGridMsg('acmsltList'); // 조회없음 메시지 그리드상에 표시
 	     }
 	   $("#spanCnt").text(data.data.records.length);
    cf_SetEventListenerHnfAcmslt();
    var cnt = dhxGridPjtHnfAcmslt.getRowsNum();
	if(cnt > 0 ){
		$("#copyHnfPlan").hide();
		$("#copyMonth").show();
	} else {
		$("#copyMonth").hide();
		$("#copyHnfPlan").show();
	}
	//dhxGridPjtHnfAcmslt.uncheckAll();
};

var fn_RemovePjtProjectHnfAcmslt = function (rId){
	var rowId = dhxGridPjtHnfAcmslt.getSelectedRowId();
	
	var acmsltStdrDe = dhxGridPjtHnfAcmslt.cells(rowId, dhxGridPjtHnfAcmslt.getColIndexById("acmsltStdrDe")).getValue();
	var hnfAcmsltSn = dhxGridPjtHnfAcmslt.cells(rowId, dhxGridPjtHnfAcmslt.getColIndexById("hnfAcmsltSn")).getValue();
	var projectSn = dhxGridPjtHnfAcmslt.cells(rowId, dhxGridPjtHnfAcmslt.getColIndexById("projectSn")).getValue();
	
    var jsonParameter = {
    	hnfAcmsltSn : hnfAcmsltSn,
    	projectSn : projectSn,
    	acmsltStdrDe : acmsltStdrDe.replaceAll('-',''),
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/removePjtProjectHnfAcmsltList', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	
    	fn_SearchGridListHnfAcmslt();
    	
    	var cnt=dhxGridPjtHnfAcmslt.getRowsNum();  

    	for(var i=1; i < cnt; i++) {
    		
    		var rowId = dhxGridPjtHnfAcmslt.getSelectedRowId();
        	
        	var acmsltStdrDe = dhxGridPjtHnfAcmslt.cells(rowId, 2).getValue();
    		
        	var acmsltStdrDefor = dhxGridPjtHnfAcmslt.cells2(i, 2).getValue();

    		if(acmsltStdrDe == acmsltStdrDefor) {
    			fn_modifyPjtProjectHnfBugtAcmslt();
        		break;
    		} else if (acmsltStdrDe != acmsltStdrDefor) {
    			fn_removePjtProjectHnfBugtAcmslt();
    			break;
    		}
    	}
    	
    }
};

var fn_copyMonth = function (){
	
	var jsonParameter = {
			projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
   	};
	gf_Transaction('copyList', 'pjtpmg001/savePjtProjectHnfAcmsltCopy',   jsonParameter, 'fn_CallbackcopyMonth', false, 'POST');
    
};

var fn_copyHnfPlan = function (){
	
	var jsonParameter = {
			projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
   	};
	gf_Transaction('copyList', 'pjtpmg001/savePjtProjectHnfPlanCopy',   jsonParameter, 'fn_CallbackcopyMonth', false, 'POST');
    
};

var fn_CallbackcopyMonth = function(){
	dhxGridPjtHnfAcmslt.clearAll();
    fn_SearchGridListHnfAcmslt();
};

var fn_GridValidation = function(){
	var valid = true;
	dhxGridPjtHnfAcmslt.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorHnfAcmslt.getState(rowId))) {
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnfAcmslt, rowId, 'acmsltStdrDe', 'grid') )){
				gf_DivMsgAlert("기준년월은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnfAcmslt, rowId, 'acmsltStdrDe');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnfAcmslt, rowId, 'prtcpntNm', 'grid') )){
				gf_DivMsgAlert("성명은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnfAcmslt, rowId, 'prtcpntNm');
				valid = false;
			}
			if(!gv_ValidateMethods.maxlength( gf_DhxGetValue(dhxGridPjtHnfAcmslt, rowId, 'prtcpntNm', 'grid'), '6' )){
				gf_DivMsgAlert("성명은  6자리 이하만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnfAcmslt, rowId, 'prtcpntNm');
				valid = false;
			}	
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnfAcmslt, rowId, 'tchnlgyGrad', 'grid') )){
				gf_DivMsgAlert("기술등급은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnfAcmslt, rowId, 'tchnlgyGrad');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnfAcmslt, rowId, 'roleCode', 'grid') )){
				gf_DivMsgAlert("역할은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnfAcmslt, rowId, 'roleCode');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnfAcmslt, rowId, 'partcptnManMonth', 'grid') )){
				gf_DivMsgAlert("M/M은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnfAcmslt, rowId, 'partcptnManMonth');
				valid = false;
			}
			if(!gv_ValidateMethods.maxlength( gf_DhxGetValue(dhxGridPjtHnfAcmslt, rowId, 'partcptnManMonth', 'grid'), '4' )){
				gf_DivMsgAlert("M/M은  소수점 2자리 이하만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnfAcmslt, rowId, 'partcptnManMonth');
				valid = false;
			}
			if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridPjtHnfAcmslt, rowId, 'partcptnManMonth', 'grid') )){
				gf_DivMsgAlert("M/M은 숫자만 입력 가능합니다.");
				gf_DhxSetValue(dhxGridPjtHnfAcmslt, rowId, 'partcptnManMonth', '', 'grid');
				fn_GridValidationSelectCell(dhxGridPjtHnfAcmslt, rowId, 'partcptnManMonth');
				valid = false;
			}
			
		}
    });
	return valid;	 
};

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorHnfAcmslt.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
};

var fn_modifyPjtProjectHnfBugtAcmslt = function (){
	var rowId = dhxGridPjtHnfAcmslt.getSelectedRowId();
	
	var acmsltStdrDe = dhxGridPjtHnfAcmslt.cells(rowId, dhxGridPjtHnfAcmslt.getColIndexById("acmsltStdrDe")).getValue();
	var hnfAcmsltSn = dhxGridPjtHnfAcmslt.cells(rowId, dhxGridPjtHnfAcmslt.getColIndexById("hnfAcmsltSn")).getValue();
	var projectSn = dhxGridPjtHnfAcmslt.cells(rowId, dhxGridPjtHnfAcmslt.getColIndexById("projectSn")).getValue();
	
    var jsonParameter = {
    	hnfAcmsltSn : hnfAcmsltSn,
    	projectSn : projectSn,
    	acmsltStdrDe : acmsltStdrDe.replaceAll('-',''),
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/modifyPjtProjectBugtHnfAcmslt', jsonParameter, 'POST');
    if(dataSource.code === '000') {

    }
};

var fn_removePjtProjectHnfBugtAcmslt = function (){
	var rowId = dhxGridPjtHnfAcmslt.getSelectedRowId();
	
	var acmsltStdrDe = dhxGridPjtHnfAcmslt.cells(rowId,dhxGridPjtHnfAcmslt.getColIndexById("acmsltStdrDe")).getValue();
	var hnfAcmsltSn = dhxGridPjtHnfAcmslt.cells(rowId, dhxGridPjtHnfAcmslt.getColIndexById("hnfAcmsltSn")).getValue();
	var projectSn = dhxGridPjtHnfAcmslt.cells(rowId,dhxGridPjtHnfAcmslt.getColIndexById("projectSn")).getValue();
	
    var jsonParameter = {
    	hnfAcmsltSn : hnfAcmsltSn,
    	projectSn : projectSn,
    	acmsltStdrDe : acmsltStdrDe.replaceAll('-',''),
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/removePjtProjectBugtHnfAcmslt', jsonParameter, 'POST');
    if(dataSource.code === '000') {

    }
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

var fn_RemovePjtHnfAcmslt = function() {
	
	 var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPjtHnfAcmslt, 'chk');
	    if(gf_IsNull(rowIds)) {
	        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
	        return false;
	    } else {
	        var state;
	        dhxGridPjtHnfAcmslt.forEachRow(function(rowId) {
	            state = dhxDataProcessorHnfAcmslt.getState(rowId);
	            if(dhxGridPjtHnfAcmslt.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtHnfAcmslt, 'chk')).isChecked()){
	                if(state == 'inserted') {
	                    var rowNum = dhxGridPjtHnfAcmslt.getRowIndex(rowId);
	                    dhxGridPjtHnfAcmslt.deleteRow(rowId);
	                    dhxGridPjtHnfAcmslt.selectRow(rowNum);
	                }
	                else {
	                	dhxDataProcessorHnfAcmslt.setUpdated(rowId, true, 'deleted');
	                }
	            }
	        });
	    }
};

var fn_gridSearchEmpButton = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButton', rid);
};
var fn_CallbackGridSearchEmpButton = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridPjtHnfAcmslt, rid, 'prtcpntEmpno', data.empno, 'grid');
		gf_DhxSetValue(dhxGridPjtHnfAcmslt, rid, 'prtcpntNm', data.korNm, 'grid');
		//dhxGridPjtHnfAcmslt.setUpdated(rid, true, 'updated');
	}
	
};
var eXcell_searchEmpButton = function(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue = function(val){
        this.setCValue("<div id=''></div><img src='/xerp/img/icon_search4.png' style='cursor:pointer'>");                                      
    }
}
eXcell_searchEmpButton.prototype = new eXcell;// nests all other methods from the base class

