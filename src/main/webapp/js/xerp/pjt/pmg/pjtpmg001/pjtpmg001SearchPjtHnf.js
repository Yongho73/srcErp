/**
 * 프로그램 : 프로젝트현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.14
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtHnf;
var dhxGridPjtHnfListInfo;
var dhxGridPjtProject;
var dhxGridPjtProjectListInfo;

var projectSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtHnf = gf_LocaleTrans('default','titPjtHnf');

var dhxDataProcessorHnf;

$(function() {

    cf_InitParamHnf();
    cf_SetComponentsHnf();
    cf_SetEventListenerHnf();
    cf_SetBindingHnf();
    cf_InitFormHnf();
});


var cf_InitParamHnf = function (){
	 
	 fn_SetMenuPath("PJTPMG001");
	 
	 var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
	    dhxCalendarStartDate.loadUserLanguage("ko");
	    dhxCalendarStartDate.hideTime();
	 
};

var cf_SetComponentsHnf = function (){
	
	var dhxGridPjtHnfListInfo = [];
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '30', 'center', 'str', 'ro', false, 'num', '', ''));
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPjthnf" />', '50', 'center', 'na', 'ch', false, 'chk', '', ''));
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('사원번호', '130', 'center', 'str', 'ro', false, 'prtcpntEmpno', ''));
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('성명', '100', 'center', 'str', 'ro', false, 'prtcpntNm', ''));
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchEmpButton',false,'searchEmpButton','',''));
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('기술등급', '130', 'center', 'str', 'coro', false, 'tchnlgyGrad', '')); 
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('역할', '130', 'center', 'str', 'coro', false, 'roleCode', '')); 
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('M/M', '130', 'center', 'str', 'edn', false, 'partcptnManMonth', '')); 
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('시작일자', '130', 'center', 'str', 'dhxCalendar', false, 'partcptnBeginDe', '')); 
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('종료일자', '130', 'center', 'str', 'dhxCalendar', false, 'partcptnEndDe', '')); 
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('외부인력', '*', 'center', 'str', 'ch', false, 'extrlServcAt', '','')); 
	
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, 'hnfPlanSn', ''));
	dhxGridPjtHnfListInfo.push(gf_MakeDhxGridHeader('ddd', '40', 'center', 'str', 'ro', true, 'projectSn', ''));
	dhxGridPjtHnf = gf_MakeDhxGrid('dataList', dhxGridPjtHnfListInfo, true, false, false);
	
	dhxGridPjtHnf.enableAutoWidth(false);
	dhxGridPjtHnf.setColumnMinWidth(80,10); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtHnf.adjustColumnSize(0);
	
	dhxGridPjtHnf.setEditable(true);
	dhxGridPjtHnf.enableEditEvents(false,true,true);
	dhxGridPjtHnf.enableMultiline(true);
	dhxGridPjtHnf.enableKeyboardSupport(true);
	dhxGridPjtHnf.enableRowspan(true);
	dhxGridPjtHnf.enableCollSpan(true);
	
	dhxGridPjtHnf.attachEvent("onCalendarShow", function(myCal,rId,colInd){ myCal.hideTime(); myCal.loadUserLanguage("ko");});
	dhxGridPjtHnf.setDateFormat("%Y-%m-%d");
	
	
	var jsonParameter = {codekindCode : "C021",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridPjtHnf, dhxGridPjtHnf.getColIndexById("tchnlgyGrad"), dataSource.data); /* 그리드콤보*/
    
    var jsonParameter = {codekindCode : "C026",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridPjtHnf, dhxGridPjtHnf.getColIndexById("roleCode"), dataSource.data); /* 그리드콤보*/
	
	dhxGridPjtHnf.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
		var count = dhxGridPjtHnf.getRowsNum();
		if(rId == count) return false;		  
		return true;		
	});
	
	dhxGridPjtHnf.attachEvent("onRowSelect", function(rId,cInd){ 
		var count=dhxGridPjtHnf.getRowsNum();
		if(dhxGridPjtHnf.cells(rId,dhxGridPjtHnf.getColIndexById("num")).getValue() == count) {
			dhxGridPjtHnf.clearSelection();
		} else{
			if(dhxGridPjtHnf.cells(rId,dhxGridPjtHnf.getColIndexById("extrlServcAt")).getValue() =="0") {
				dhxGridPjtHnf.setColTypes("ro,ch,ro,ro,searchEmpButton,coro,coro,edn,dhxCalendar,dhxCalendar,ch,ro,ro"); 
			} else {
				dhxGridPjtHnf.setColTypes("ro,ch,ro,ed,searchEmpButton,coro,coro,edn,dhxCalendar,dhxCalendar,ch,ro,ro");
			}
			if(cInd == gf_GetDhxGridColumId(dhxGridPjtHnf, 'searchEmpButton')) { 
				if(dhxGridPjtHnf.cells(rId,dhxGridPjtHnf.getColIndexById("extrlServcAt")).getValue() =="0") {
					fn_gridSearchEmpButton( rId );
				} else {
					gf_DivMsgAlert("외부인력의 경우 성명은 직접 입력해 주세요."); 
				}
	     	 }
			
			if(dhxGridPjtHnf.getColIndexById("prtcpntEmpno") == cInd){
				if(dhxGridPjtHnf.cells(rId,dhxGridPjtHnf.getColIndexById("extrlServcAt")).getValue() =="0") {
					fn_gridSearchEmpButton( rId );
				} else {
					gf_DivMsgAlert("외부인력의 경우 성명은 직접 입력해 주세요."); 
				}
			}
			if(dhxGridPjtHnf.getColIndexById("prtcpntNm") == cInd){
				if(dhxGridPjtHnf.cells(rId,dhxGridPjtHnf.getColIndexById("extrlServcAt")).getValue() =="0") {
					fn_gridSearchEmpButton( rId );
				} else {
					
				}
			}
		}
		
		dhxGridPjtHnf.attachEvent("onCheck", function(rId,cInd,state){ 
			if(state == true){
				dhxGridPjtHnf.cells(rId,dhxGridPjtHnf.getColIndexById("prtcpntEmpno")).setValue('');	
				dhxGridPjtHnf.cells(rId,dhxGridPjtHnf.getColIndexById("prtcpntNm")).setValue('');	
			}
			
		});
		
});
	
	
   
};

var cf_SetEventListenerHnf = function (){

	$('#hnfMonth').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtHnfAcmslt/view?projectSn="+projectSn ;
    });
	
	$('#hnfPlanAcmslt').unbind('click').bind('click', function(event){
		var projectSn = $("#projectSn").val();
       location.href = "/xerp/pjtpmg001/searchPjtHnfPlanAcmslt/view?projectSn="+projectSn ;
    });
	
	$('#btnHnfPlanAdd').unbind('click').bind('click', function(rowId){
		gf_NoFoundDataOnGridMsgRemove('dataList');
		var projectSn = $("#projectSn").val();
		
		var jsonParameter = {
		    	projectSn :projectSn,
		    };
		var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtProjectDe', jsonParameter, 'GET');
		var data = dataSource.data;
		
		var projectBeginDe =  data.projectBeginDe;
		var projectEndDe = data.projectEndDe;
		
		 dhxGridPjtHnf.addRow(dhxGridPjtHnf.uid(),['','','','','','','','',projectBeginDe,projectEndDe,0,'',projectSn,''],0);
	});
	
    $('#btnHnfPlanSave').unbind('click').bind('click', function(){
    	
    	if(fn_GridValidation()) dhxDataProcessorHnf.sendData();
    	
		dhxDataProcessorHnf.attachEvent("onAfterUpdate", function(id,action,tid,dataSource){
    	 	if (dataSource.code !== "000"){                                                 
    		   gf_DivMsgAlert(dataSource.message);                                                             
    	 	}                                                                               
    	    else {                                                                          
    		   gf_DivMsgAlert(gv_MsgSave); 
    		   fn_SearchGridListHnf();
    		   fn_modifyPjtProjectHnfBugtPlan();
    		   
    	       return true;                                                                 
    	   }                                                                                
    	 });              
    });
    
    $('#btnHnfPlanRemove').unbind('click').bind('click', function(){
    	/*var rowInd = dhxGridPjtHnf.getSelectedRowId();
    	var rnum = dhxGridPjtHnf.cells(rowInd, 0).getValue();
		if( rowInd == null) {
			gf_DivMsgAlert("삭제할 행을 선택해 주세요.");
		} else if(rnum == '') {
			dhxGridPjtHnf.deleteRow(rowInd);
		} else gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtProjectHnf()', '');   	*/
    	gf_errorMsgClear();
    	fn_RemovePjtHnf();
		
	});
    	
};

var cf_SetBindingHnf = function (){
	fn_SearchGridListHnf();
};

var cf_InitFormHnf = function (){};

var cf_InitInputForm = function (){
};

var fn_SearchGridListHnf = function (){

    var jsonParameter = {
    		projectSn : gf_FormGetValue('searchFormPjtHfn', 'projectSn', 'text'),
    };

    gf_Transaction('dataList', 'pjtpmg001/searchPjtProjectHnfPlanList', jsonParameter, 'fn_CallbackSearchGridListHnf', false, 'GET');
    
    dhxDataProcessorHnf = new dataProcessor("/xerp/pjtpmg001/modifyPjtProjectHnfPlanudtList"); //lock feed url
    
    dhxDataProcessorHnf.setTransactionMode('POST',false);
    dhxDataProcessorHnf.setUpdateMode("off", false); 
    dhxDataProcessorHnf.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnf,'prtcpntNm'), dhtmlxValidation.NotEmpty);
    dhxDataProcessorHnf.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnf,'tchnlgyGrad'), dhtmlxValidation.NotEmpty);
    dhxDataProcessorHnf.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnf,'roleCode'), dhtmlxValidation.NotEmpty);
    dhxDataProcessorHnf.setVerificator(gf_GetDhxGridColumId(dhxGridPjtHnf,'partcptnManMonth'), dhtmlxValidation.NotEmpty);
    dhxDataProcessorHnf.init(dhxGridPjtHnf); //link dataprocessor to the grid
    
    dhxDataProcessorHnf.styles = {	
            updated:        "font-weight:normal;text-decoration:none;",
            inserted:       "font-weight:bold; color:green;",
            deleted:        "color:orange; text-decoration:line-through;",
            invalid:        "color:green; text-decoration:underline;",
            error:          "color:blue; text-decoration:underline;",
            clear:          "font-weight:normal;text-decoration:none;"
    };
};


var fn_CallbackSearchGridListHnf = function (strSvcID, targetID, data){
	 dhxGridPjtHnf.clearAll();
	    if(!gf_IsNull(data.data.records)){
	    	dhxGridPjtHnf.parse(data.data.records, 'js');
	    }
	    var userLength = data.data.records.length;
 	    if(userLength != 0){
 	        gf_NoFoundDataOnGridMsgRemove('dataList'); // 조회 데이터가 있으면 메지시 제거
 	     }else{
 	    	gf_NoFoundDataOnGridMsg('dataList'); // 조회없음 메시지 그리드상에 표시
 	     }
 	   $("#spanCnt").text(data.data.records.length);
	    cf_SetEventListenerHnf();
	    
	    var cnt = dhxGridPjtHnf.getRowsNum();
		if(cnt == 1) {
			dhxGridPjtHnf.clearAll();
			$("#spanCnt").text("0");
		}
		
		
};

var fn_RemovePjtProjectHnf = function (){
	var rowId = dhxGridPjtHnf.getSelectedRowId();

	var hnfPlanSn = dhxGridPjtHnf.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtHnf,'hnfPlanSn')).getValue();
	var projectSn = dhxGridPjtHnf.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtHnf,'projectSn')).getValue();
	
    var jsonParameter = {
    	hnfPlanSn : hnfPlanSn,
    	projectSn : projectSn,
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/removePjtProjectHnfPlanList', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchGridListHnf();
    	var cnt=dhxGridPjtHnf.getRowsNum();
    	if(cnt == 1) {
    		fn_removePjtProjectHnfBugtPlan();
    	} else {
    		fn_modifyPjtProjectHnfBugtPlan();
    	}
    }
    	
   
};
var fn_ExcelDown = function () {
 
};

var fn_GridValidation = function(){
	var valid = true;
	dhxGridPjtHnf.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorHnf.getState(rowId))) {
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnf, rowId, 'prtcpntNm', 'grid') )){
				gf_DivMsgAlert("성명은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnf, rowId, 'prtcpntNm');
				valid = false;
			}
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnf, rowId, 'tchnlgyGrad', 'grid') )){
				gf_DivMsgAlert("기술등급은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnf, rowId, 'tchnlgyGrad');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnf, rowId, 'roleCode', 'grid') )){
				gf_DivMsgAlert("역할은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnf, rowId, 'roleCode');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtHnf, rowId, 'partcptnManMonth', 'grid') )){
				gf_DivMsgAlert("M/M은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnf, rowId, 'partcptnManMonth');
				valid = false;
			}
			if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridPjtHnf, rowId, 'partcptnManMonth', 'grid') )){
				gf_DivMsgAlert("M/M은 숫자만 입력 가능합니다.");
				gf_DhxSetValue(dhxGridPjtHnf, rowId, 'partcptnManMonth', '', 'grid');
				fn_GridValidationSelectCell(dhxGridPjtHnf, rowId, 'partcptnManMonth');
				valid = false;
			}
			if(!gv_ValidateMethods.maxlength( gf_DhxGetValue(dhxGridPjtHnf, rowId, 'prtcpntNm', 'grid'), '6' )){
				gf_DivMsgAlert("성명은 6자리 이하만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnf, rowId, 'prtcpntNm');
				valid = false;
			}
			if(!gv_ValidateMethods.maxlength( gf_DhxGetValue(dhxGridPjtHnf, rowId, 'partcptnManMonth', 'grid'), '4' )){
				gf_DivMsgAlert("M/M은 2자리 이하만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridPjtHnf, rowId, 'partcptnManMonth');
				valid = false;
			}
			
		}
    });
	return valid;	 
};

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorHnf.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}

var fn_modifyPjtProjectHnfBugtPlan = function (){
	var rowId = dhxGridPjtHnf.getSelectedRowId();

	var projectSn = dhxGridPjtHnf.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtHnf,'projectSn')).getValue();
	
    var jsonParameter = {
    	projectSn : projectSn,
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/modifyPjtProjectBugtHnfPlan', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchGridListHnf();
    }
};

var fn_removePjtProjectHnfBugtPlan = function (){
	var rowId = dhxGridPjtHnf.getSelectedRowId();

	var projectSn = dhxGridPjtHnf.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtHnf,'projectSn')).getValue();
	
    var jsonParameter = {
    	projectSn : projectSn,
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/removePjtProjectBugtHnfPlan', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchGridListHnf();
    }
};

var fn_RemovePjtHnf = function() {
	
	 var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPjtHnf, 'chk');
	    if(gf_IsNull(rowIds)) {
	        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
	        return false;
	    } else {
	        var state;
	        dhxGridPjtHnf.forEachRow(function(rowId) {
	            state = dhxDataProcessorHnf.getState(rowId);
	            if(dhxGridPjtHnf.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtHnf, 'chk')).isChecked()){
	                if(state == 'inserted') {
	                    var rowNum = dhxGridPjtHnf.getRowIndex(rowId);
	                    dhxGridPjtHnf.deleteRow(rowId);
	                    dhxGridPjtHnf.selectRow(rowNum);
	                }
	                else dhxDataProcessorHnf.setUpdated(rowId, true, 'deleted');
	            }
	        });
	    }
};

var fn_gridSearchEmpButton = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButton', rid);
};
var fn_CallbackGridSearchEmpButton = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridPjtHnf, rid, 'prtcpntEmpno', data.empno, 'grid');
		gf_DhxSetValue(dhxGridPjtHnf, rid, 'prtcpntNm', data.korNm, 'grid');
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