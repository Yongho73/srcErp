/**
 * 프로그램 : 인사기본 화면 중 Tab4(발령) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.03.09
 * 사용테이블 : MHS_GNFD
 **/

var tab4_empno = '';
var tab4_bplcCode = '';

var titMhsFamily = gf_LocaleTrans('default','titMhsGnfd');

var g_Tab4SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpGnfd;  //GRID
var dhxDataProcessorMhsEmpGnfd;  //DataProcessor

$(function() {
    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
});

var cf_InitParam = function (){
	//
};


var cf_SetComponents = function (){

    var dhxGridMhsEmpGnfdListInfo = [];
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'cntr', false, 'num', '','')); // 번호  //(header, width, align, sort, type, hidden, id, attach, valid)
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('발령구분', '100', 'center', 'str', 'coro', false, 'gnfdCode', '','NotEmpty')); // 발령 코드(select box)
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('발령시작일자', '100', 'center', 'date','dhxCalendarA', false, 'gnfdBeginDe', '', 'NotEmpty')); // 발령시작일자
    //dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','button1',false,'',''));
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('발령종료일자', '100', 'center', 'date','dhxCalendarA', false, 'gnfdEndDe', '', '')); // 발령종료일자
    //dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','button2',false,'',''));
    //dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('상위조직', '150', 'center', 'str', 'ro', false, 'afchgUpperDeptCodeNm', '', '')); // 상위부서
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMhsDept'), '150', 'center', 'str', 'ed', false, 'afchgDeptNm', '', '')); // 부서
    //dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','button3',false,'',''));
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOfcpsCode'), '120', 'center', 'str', 'coro', false, 'afchgOfcpsCode', '', '')); // 직위(select box)
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPositionCode'), '120', 'center', 'str', 'coro', false, 'afchgRspofcCode', '', '')); // 직책(select box)
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titClsfNm'), '120', 'center', 'str', 'coro', false, 'afchgClsfCode', '', '')); // 직급(select box)
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSrclsCode'), '80', 'center', 'str', 'coro', false, 'afchgSrclsCode', '', '')); // 호봉(select box)
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMhsJssfc'), '80', 'center', 'str', 'coro', false, 'afchgJssfcCode', '', '')); // 직종(select box)
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('겸직부서', '150', 'center', 'str', 'ed', false, 'hdadptDeptNm', '', '')); // 겸직부서
    //dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','button4',false,'',''));
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('발령내역', '150', 'center', 'str', 'ed', false, 'gnfdDtls', '', '')); // 발령 내역
    
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'empno', '', '')); // 원 사원번호
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'gnfdDe', '', '')); // 발령일
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'gnfdNo', '', '')); // 발령번호

    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'processAt', '', '')); // 처리여부
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'afchgDeptCode', '', '')); // 부서코드
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'afchgUpperDeptCode', '', '')); // 상위부서코드
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'hdadptDeptCode', '', '')); // 겸임부서코드
    dhxGridMhsEmpGnfdListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'afchgBplc', '', '')); // 사업장
    
    dhxGridMhsEmpGnfd = gf_MakeDhxGrid('MhsEmpGnfdDataList', dhxGridMhsEmpGnfdListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)

    dhxGridMhsEmpGnfd.setDateFormat("%Y-%m-%d");
    
    var comboGnfdCode = dhxGridMhsEmpGnfd.getCombo(1);  //발령 코드
	gf_MakeComboGrid(comboGnfdCode, 'sel', 'mhshrm011/searchMhshrm011CodeCombo', 'gnfdCode', 'gnfdCodeNm', '');
	
	var comboOfcpsCode = dhxGridMhsEmpGnfd.getCombo(5);  //직위
	gf_MakeComboGrid(comboOfcpsCode, 'sel', 'mhshrb001/searchMhshrb001OfcpsCode', 'ofcpsCode', 'ofcpsNm', '');
	
	var comboRspofcCode = dhxGridMhsEmpGnfd.getCombo(6);  //직책
	gf_MakeComboGrid(comboRspofcCode, 'sel', 'mhshrb001/searchMhshrb001RspofcCode', 'rspofcCode', 'rspofcNm', '');
	
	var comboClsfCode = dhxGridMhsEmpGnfd.getCombo(7);  //직급
	gf_MakeComboGrid(comboClsfCode, 'sel', 'mhshrb001/searchMhshrb001ClsfCode', 'clsfCode', 'clsfNm', '');
	
	//호봉
	var jsonParameter1 = {codekindCode : "C285",exceptCode :"",sortOrder :"asc" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhsEmpGnfd, dhxGridMhsEmpGnfd.getColIndexById("afchgSrclsCode"), dataSource1.data, "sel"); /* 그리드콤보*/
    
	//직종
	var jsonParameter2 = {codekindCode : "C197",exceptCode :"",sortOrder :"asc" };
    var dataSource2 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter2, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhsEmpGnfd, dhxGridMhsEmpGnfd.getColIndexById("afchgJssfcCode"), dataSource2.data, "sel"); /* 그리드콤보*/

	
    dhxGridMhsEmpGnfd.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpGnfd.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    //dhxGridMhsEmpGnfd.enableAutoWidth(true);
    dhxGridMhsEmpGnfd.enableEditEvents(true,false,true);  //(boolean click,boolean dblclick,boolean f2Key)
    
    $("#saveFormEmp_Tab4_Gnfd").validate({
        errorElement: 'div'
    });
};

//사용자정의 그리드 타입
function eXcell_button1(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue=function(val){
    	var row_id=this.cell.parentNode.idd;
        this.setCValue("<div id=''><img src='/xerp/img/sub/icon_calen.png' alt='날짜선택' style='cursor:pointer' id='gridImgCal_1_" + row_id + "' onClick='javascript:fn_gridCalendar(1,this, \"" + row_id + "\");'></div>");                                      
    }
}
function eXcell_button2(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue=function(val){
    	var row_id=this.cell.parentNode.idd;
        this.setCValue("<div id=''><img src='/xerp/img/sub/icon_calen.png' alt='날짜선택' style='cursor:pointer' id='gridImgCal_2_" + row_id + "' onClick='javascript:fn_gridCalendar(2,this, \"" + row_id + "\");'></div>");                                      
    }
}
function eXcell_button3(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue=function(val){
    	var row_id=this.cell.parentNode.idd;
        this.setCValue("<div id=''><img src='/xerp/img/sub/icon_search02.png' style='cursor:pointer' id='gridImgCal_3_" + row_id + "' onClick='javascript:fn_gridDeptPopup(1,this, \"" + row_id + "\");'></div>");                                      
    }
}
function eXcell_button4(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue=function(val){
    	var row_id=this.cell.parentNode.idd;
        this.setCValue("<div id=''><img src='/xerp/img/sub/icon_search02.png' style='cursor:pointer' id='gridImgCal_4_" + row_id + "' onClick='javascript:fn_gridDeptPopup(2,this, \"" + row_id + "\");'></div>");                                      
    }
}
eXcell_button1.prototype = new eXcell;// nests all other methods from the base class
eXcell_button2.prototype = new eXcell;
eXcell_button3.prototype = new eXcell;
eXcell_button4.prototype = new eXcell;


var eventIdsMhsEmpGnfd = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpGnfd = gf_GridDetachEvent(dhxGridMhsEmpGnfd, eventIdsMhsEmpGnfd);
    //eventId = dhxGridMhsEmpGnfd.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        //fn_SelectedMhshrb999();
    //});
    //eventIdsMhsEmpGnfd.push(eventId);
	/*
    eventId = dhxGridMhsEmpGnfd.attachEvent("onKeyPress", function(keyCode, ctrl, shift, event_object) {
    	if(keyCode == 113) { fn_ExcelMhshrb001Gnfd(); //F2
    	} else 
    	if(keyCode == 13)  {   //ENTER
    		var selectedId = dhxGridMhsEmpGnfd.getSelectedRowId();
    		var ind        = dhxGridMhsEmpGnfd.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpGnfd.getRowIndex(selectedId);
    		
    		//부서선택
    		if(ind == 7){
    			fn_SearchDeptCodeTab4(1);
    		}
    		if(ind == 14){
    			fn_SearchDeptCodeTab4(2);
    		}
    		
    		dhxGridMhsEmpGnfd.selectCell(rowIndex, ind+1);
    		dhxGridMhsEmpGnfd.editCell();
    	} else 
    	if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhsEmpGnfd.getSelectedRowId();
    		var ind        = dhxGridMhsEmpGnfd.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpGnfd.getRowIndex(selectedId);
    		dhxGridMhsEmpGnfd.selectCell(rowIndex+1, ind);
    		dhxGridMhsEmpGnfd.editCell();
    	} else 
    	if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhsEmpGnfd.getSelectedRowId();
    		var ind        = dhxGridMhsEmpGnfd.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpGnfd.getRowIndex(selectedId);
    		dhxGridMhsEmpGnfd.selectCell(rowIndex-1, ind);
    		dhxGridMhsEmpGnfd.editCell();
    	}
        else return true;
    });
    eventIdsMhsEmpGnfd.push(eventId);
    */
    
    eventId = dhxGridMhsEmpGnfd.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
		//if(cInd == 2 || cInd == 4) {
		//	return false;
		//}
        //else return true;
    	return false;
    }); 
    eventIdsMhsEmpGnfd.push(eventId);
    /*
    eventId = dhxGridMhsEmpGnfd.attachEvent("onCellChanged", function(rId,cInd,nValue){
    	//alert(rId + " : " + cInd + " : " + nValue);
    	if(cInd == 7){
    		alert(rId + " : " + cInd + " : " + nValue);
    		fn_SearchDeptCodeTab4(1);
    		return false;
    	}
    	if(cInd == 14){
    		alert(rId + " : " + cInd + " : " + nValue);
    		fn_SearchDeptCodeTab4(2);
    		return false;
    	}
    });
    eventIdsMhsEmpGnfd.push(eventId);
    
    //dhxGridMhsEmpGnfd.attachEvent("onSelectStateChanged", function(id){
        //alert("onSelectStateChanged : " + id);
    //});
    dhxGridMhsEmpGnfd.attachEvent("onRowSelect", function(id,ind){
    	alert("onRowSelect : " + id + " : " + ind);
    	if(ind == 8){
    		fn_SearchDeptCodeTab4(1);
    	}
    	if(ind == 15){
    		fn_SearchDeptCodeTab4(2);
    	}
    });
    */
    
    // other event

    //행추가
    $('#btnAdd_Tab4').unbind("click").bind("click",function() {
        fn_Mhshrb001Tab4_Add();
    });
    //행삭제
    $('#btnRemove_Tab4').unbind("click").bind("click",function() {
        fn_Mhshrb001Tab4_Remove();
    });

    //저장
    $('#btnSave_Tab4').unbind('click').bind('click', function() {
    	
    	if(dhxDataProcessorMhsEmpGnfd.getSyncState()){
    		alert("수정된 정보가 없습니다.");
			return false;
    	} else {
    		alert("작업 중");
    		return false;
	    	if(fn_GridValidationTab4()) { 
	    		dhxDataProcessorMhsEmpGnfd.sendData();
	    	}
    	}

        $('#saveFormEmp_Tab4_Gnfd div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    //초기화
    $('#btnInit_Tab4').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab4();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){

    tab4_empno = gf_FormGetValue('saveFormEmp_Tab4_Gnfd', 'empno', 'text');
    tab4_bplcCode = gf_FormGetValue('saveFormEmp_Tab4_Gnfd', 'bplcCode', 'text');

    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab4();
};

var fn_SearchMhshrb001Tab4 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab4_Gnfd', 'empno', 'text');
	//var bplcCode = gf_FormGetValue('saveFormEmp_Tab4_Gnfd', 'bplcCode', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab4_empno = empno;
	g_Tab4SearchValue.empno = empno;
    //g_Tab4SearchValue.bplcCode = bplcCode;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab4_Gnfd', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpGnfd', jsonParameter, 'fn_CallbackSearchMhshrb001Tab4', false, 'GET');

    dhxDataProcessorMhsEmpGnfd = new dataProcessor("/xerp/mhshrb001/saveMhsEmpGnfd"); //lock feed url
	dhxDataProcessorMhsEmpGnfd.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	dhxDataProcessorMhsEmpGnfd.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsEmpGnfd.setVerificator(gf_GetDhxGridColumId(dhxGridMhsEmpGnfd,'familyCode'), fn_DPValidation_NotEmpty);
    dhxDataProcessorMhsEmpGnfd.setVerificator(gf_GetDhxGridColumId(dhxGridMhsEmpGnfd,'familyNm'), fn_DPValidation_Length10);
    dhxDataProcessorMhsEmpGnfd.setVerificator(gf_GetDhxGridColumId(dhxGridMhsEmpGnfd,'ihidnum'), fn_DPValidation_Ihidnum);
    dhxDataProcessorMhsEmpGnfd.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhsEmpGnfd.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsEmpGnfd.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhsEmpGnfd.init(dhxGridMhsEmpGnfd); //link dataprocessor to the grid
    dhxDataProcessorMhsEmpGnfd.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};
    dhxDataProcessorMhsEmpGnfd.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    	if (dataSource.code == "000" || dataSource.data.code !== "000"){
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    		fn_SearchMhshrb001Tab4();
    		return true;
	 	} else {
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	 		return false;
	 	}
    });
};

// 그리드 입력값 필수 여부 검증
function fn_DPValidation_NotEmpty(value, id, ind){
	var strMsg = "";
	var nId = dhxGridMhsEmpGnfd.getRowIndex(id) + 1;
	if (gf_IsNull(value)){
		strMsg = " (" + nId + "행, " + (ind+1) + "열) 값을 입력하세요.";
	
		var strColId = dhxGridMhsEmpGnfd.getColumnId(ind);
		fn_GridValidationSelectCellTab4(dhxGridMhsEmpGnfd, id, strColId);
		alert(strMsg);
		return false;
	}
	return true;
}
//그리드 입력값 필수 여부 및 최대 길이 검증
function fn_DPValidation_Length10(value, id, ind){
	var strMsg = "";
	var chk = false;
	var nId = dhxGridMhsEmpGnfd.getRowIndex(id) + 1;
	if (gf_IsNull(value)){
		chk = true;
		strMsg = " (" + nId + "행, " + (ind+1) + "열) 값을 입력하세요.";
	}
	else if(value.length > 10){
		chk = true;
		strMsg = " (" + nId + "행, " + (ind+1) + "열) 10자리 이하로 입력하세요.";
	}
	
	if(chk){
		var strColId = dhxGridMhsEmpGnfd.getColumnId(ind);
		fn_GridValidationSelectCellTab4(dhxGridMhsEmpGnfd, id, strColId);
		alert(strMsg);
		return false;
	}
	return true;
}
//그리드 입력값 주민번호 검증
function fn_DPValidation_Ihidnum(value, id, ind){
	var strMsg = "";
	var chk = false;
	var nId = dhxGridMhsEmpGnfd.getRowIndex(id) + 1;
	if (!gf_IsNull(value)){
		
		var chkIhidnum = gf_DhxGetValue(dhxGridMhsEmpGnfd, id, 'ihidnumOl', 'grid');
		if(value == chkIhidnum){
			return true;
		}
		
		if(value.length > 14){
			chk = true;
			strMsg = " (" + nId + "행, " + (ind+1) + "열) 주민번호는 14자리 이하로 입력하세요.";
		}
		else {
			if (value.indexOf("*") != -1) {
				gf_DhxSetValue(dhxGridMhsEmpGnfd, id, 'ihidnum', chkIhidnum, 'grid');
				return true;
			}
			
			var rJnum = "";
			var jnum = value.replace(/[^0-9]/g,"");  // 숫자만 남김
			
			if(jnum.length != 13){
				chk = true;
				strMsg = " (" + nId + "행, " + (ind+1) + "열) 주민번호를 정확하게 입력하세요.";
			}
			else {
				//if(jnum.length >= 6){
					rJnum = jnum.substring(0,6) + "-" + jnum.substring(6,13);
				//}
				//else rJnum = jnum;
				
				gf_DhxSetValue(dhxGridMhsEmpGnfd, id, 'ihidnum', rJnum, 'grid');
			}
		}
	}
	
	if(chk){
		var strColId = dhxGridMhsEmpGnfd.getColumnId(ind);
		fn_GridValidationSelectCellTab4(dhxGridMhsEmpGnfd, id, strColId);
		alert(strMsg);
		return false;
	}
	return true;
}

var eventIdsMhsEmpGnfdDate = null; //그리드 달력 이벤트
var fn_CallbackSearchMhshrb001Tab4 = function (strSvcID, targetID, data){
	dhxGridMhsEmpGnfd.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpGnfd.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpGnfdDataList');
    	
    	dhxGridMhsEmpGnfd.selectCell(0,2);
    	
    	dhxGridMhsEmpGnfd._grid_calendarA.loadUserLanguage("ko");
        dhxGridMhsEmpGnfd._grid_calendarA.hideTime();
        
        //달력 이벤트 추가
        dhxGridMhsEmpGnfd.detachEvent(eventIdsMhsEmpGnfdDate);
        var eventId = dhxGridMhsEmpGnfd._grid_calendarA.attachEvent("onClick", function(date){  //그리드의 달력에서 날짜를 선택했을때 이벤트
	    	fn_gridGetDate((dhxGridMhsEmpGnfd._grid_calendarA.getDate()).format('YYYY-MM-DD'));
	    });
        eventIdsMhsEmpGnfdDate = eventId;
        
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpGnfdDataList'); 
    }
    //$('#spanMhsEmpGnfdCnt').text(gf_NumberWithCommas(data.data.totalRecordCount));
	$('#spanMhsEmpGnfdCnt').text(gf_NumberWithCommas(data.data.records.length));

    cf_SetEventListener();
};

//행추가
var fn_Mhshrb001Tab4_Add = function (){
	gf_NoFoundDataOnGridMsgRemove('MhsEmpGnfdDataList');
	dhxGridMhsEmpGnfd.addRow('newRow_'+dhxGridMhsEmpGnfd.uid(),[0,'','','','','','','','','','','','','','',tab4_empno,'','','','','','','',''],0);
	dhxGridMhsEmpGnfd.selectCell(0,1);
	//dhxGridMhsEmpGnfd.editCell();
	
	dhxGridMhsEmpGnfd._grid_calendarA.loadUserLanguage("ko");
    dhxGridMhsEmpGnfd._grid_calendarA.hideTime();
    
    //달력 이벤트 추가
    dhxGridMhsEmpGnfd.detachEvent(eventIdsMhsEmpGnfdDate);
    var eventId = dhxGridMhsEmpGnfd._grid_calendarA.attachEvent("onClick", function(date){  //그리드의 달력에서 날짜를 선택했을때 이벤트
    	fn_gridGetDate((dhxGridMhsEmpGnfd._grid_calendarA.getDate()).format('YYYY-MM-DD'));
    });
    eventIdsMhsEmpGnfdDate = eventId;
    
    //달력에 금일 세팅
    var nowDate = gf_Date2StrDisplayFormat(new Date());
    dhxGridMhsEmpGnfd._grid_calendarA.setDate(nowDate);
};

/**
 * 삭제
 */
//행삭제
var fn_Mhshrb001Tab4_Remove = function (){
	var selectedId = dhxGridMhsEmpGnfd.getSelectedRowId();
	//체크 박스 확인
	var familyIds = gf_GetCheckedGridValueArr(dhxGridMhsEmpGnfd, 'selYn', 'familySn');
    if(gf_IsNull(familyIds)) {
        gf_DivMsgAlert('삭제할 정보를 선택해 주세요.');
        return false;
    } else {
    	dhxGridMhsEmpGnfd.forEachRow(function(rowId) {
			if(dhxGridMhsEmpGnfd.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsEmpGnfd, 'selYn')).isChecked()){
				dhxDataProcessorMhsEmpGnfd.setUpdated(rowId, true, "deleted");
			}
			/*
			status = dhxDataProcessorMhsEmpGnfd.getState(rowId);
			gf_Trace("selectedId = " + rowId + ", status : " + status);
			*/
		});
        //gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhsEmpFamilysSend()', '');
    }
};

/*그리드 달력 이벤트*/
var strGetRowChk  = "";  //이미지 버튼 클릭하여 날짜 받을때 날짜 컬럼에 안들어 가므로 강제 처리해야 함
var strGetColChk  = 0;  //그리드 달력이 2건이라서 어느 달력을 호출 했는지 구분
var fn_gridGetDate = function (strDate) {
	if(strGetRowChk){
		if(typeof strDate != "undefined" || strDate != null || strDate != ""){
			if(strGetColChk == 1){
				gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'gnfdBeginDe', strDate, 'grid');
			}
			else if(strGetColChk == 2){
				gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'gnfdEndDe', strDate, 'grid');
			}
		}
		strGetRowChk = "";
	}
}
var fn_gridCalendar = function (colChk, obj, aa) {
	alert(aa);
	return;
	var strGridDate = "";
	var target = "";
	strGetColChk = 0;

	var rid = dhxGridMhsEmpGnfd.getSelectedRowId();
	if(colChk == 1){
		strGridDate = gf_DhxGetValue(dhxGridMhsEmpGnfd, rid, 'gnfdBeginDe', 'grid');
		//target = $('#gridImgCal_1_' + rid);
		strGetColChk = 1;
	}else if(colChk == 2){
		strGridDate = gf_DhxGetValue(dhxGridMhsEmpGnfd, rid, 'gnfdEndDe', 'grid');
		//target = $('#gridImgCal_2_' + rid);
		strGetColChk = 2;
	}
	target = $(obj);
		
	//var nTop = Math.trunc(target.offset().top);  //IE 안됨
	var nTop = (target.offset().top).toFixed(0);
	//var nLeft = Math.trunc(target.offset().left);
	var nLeft = (target.offset().left).toFixed(0);
	/*
	var calLeft = dhxGridMhsEmpGnfd._grid_calendarA._px;
	if(typeof calLeft == "undefined" || calLeft == null || calLeft == 0){
		dhxGridMhsEmpGnfd._grid_calendarA._px = nLeft-10;
	}*/
	dhxGridMhsEmpGnfd._grid_calendarA._px = nLeft-10;
	dhxGridMhsEmpGnfd._grid_calendarA._py = nTop-7;  //하나의 높이 28, x는 동일하므로 필요 없음
	
	//달력에 금일 세팅
	if(strGridDate == ""){
		strGridDate = gf_Date2StrDisplayFormat(new Date());
	}
    
	dhxGridMhsEmpGnfd._grid_calendarA.setDate(strGridDate);
	strGetRowChk = rid;
	dhxGridMhsEmpGnfd._grid_calendarA._show();
}
//그리드 부서 Popup
var fn_gridDeptPopup = function (colChk, obj) {
	var strGridDeptNm = "";
	var target = "";
	strGetColChk = 0;
 
	var rid = dhxGridMhsEmpGnfd.getSelectedRowId();
	if(colChk == 1){
		strGridDeptNm = gf_DhxGetValue(dhxGridMhsEmpGnfd, rid, 'afchgDeptNm', 'grid');
		strGetColChk = 1;
	}else if(colChk == 2){
		strGridDeptNm = gf_DhxGetValue(dhxGridMhsEmpGnfd, rid, 'hdadptDeptNm', 'grid');
		strGetColChk = 2;
	}
	target = $(obj);
	strGetRowChk = rid;
	//
}

//--부서 입력 후 Enter 이벤트
function fn_SearchDeptCodeTab4(colChk){
	var deptCode = "";
	var deptKorNm = "";
	
	var rid = dhxGridMhsEmpGnfd.getSelectedRowId();
	if(!gf_IsNull(rid)){
		if(colChk == 1){
			deptKorNm = gf_DhxGetValue(dhxGridMhsEmpGnfd, rid, 'afchgDeptNm', 'grid');
			strGetColChk = 1;
		}else if(colChk == 2){
			deptKorNm = gf_DhxGetValue(dhxGridMhsEmpGnfd, rid, 'hdadptDeptNm', 'grid');
			strGetColChk = 2;
		}
		strGetRowChk = rid;
		
		var jsonParameter = {
				deptCode : deptCode,
				deptKorNm : deptKorNm,
				useAt : '1',
				bplcCode : tab4_bplcCode
		};
		gf_Transaction('list_type01', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchDeptCodeTab4', false, 'GET');
	}
	
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : tab4_bplcCode
	};
	gf_Transaction('list_type01', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchDeptCodeTab4', false, 'GET');
}
function fn_CallbackSearchDeptCodeTab4 (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
    	if(strGetColChk == 1){
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgDeptNm', data.deptKorNm, 'grid');
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgDeptCode', data.deptCode, 'grid');
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgUpperDeptCodeNm', data.upperDeptNm, 'grid');
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgUpperDeptCode', data.upperDeptCode, 'grid');
		}
		else if(strGetColChk == 2){
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'hdadptDeptNm', data.deptKorNm, 'grid');
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'hdadptDeptCode', data.deptCode, 'grid');
		}
    } 
    else {
    	//Popup 호출
    	if(strGetColChk == 1){
    		gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgDeptCode', "", 'grid');
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgUpperDeptCodeNm', "", 'grid');
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgUpperDeptCode', "", 'grid');
			
    		parent.gf_DeptPopup("","","", tab4_bplcCode, "Y", "fn_CallbackSearchDeptCodePopupTab4_1");
    	}
		else if(strGetColChk == 2){
			gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'hdadptDeptCode', "", 'grid');
			parent.gf_DeptPopup("","","", tab4_bplcCode, "Y", "fn_CallbackSearchDeptCodePopupTab4_2");
		}
    }
}
function fn_CallbackSearchDeptCodePopupTab4_1 (data) {
	if(typeof data.deptCode != "undefined" && data.deptCode != null && data.deptCode != ""){
		gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgDeptNm', data.deptKorNm, 'grid');
		gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgDeptCode', data.deptCode, 'grid');
		gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgUpperDeptCodeNm', data.upperDeptNm, 'grid');
		gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'afchgUpperDeptCode', data.upperDeptCode, 'grid');
	}
};
function fn_CallbackSearchDeptCodePopupTab4_2 (data) {
	if(typeof data.deptCode != "undefined" && data.deptCode != null && data.deptCode != ""){
		gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'hdadptDeptNm', data.deptKorNm, 'grid');
		gf_DhxSetValue(dhxGridMhsEmpGnfd, strGetRowChk, 'hdadptDeptCode', data.deptCode, 'grid');
	}
};

var fn_RemoveMhsEmpFamilysSend = function() {
    var familyIds = gf_GetCheckedGridValueArr(dhxGridMhsEmpGnfd, 'selYn', 'familySn');
    var jsonParameter = {
    		empno : tab4_empno,
    		familyIds : familyIds.join(',') 
    	};
    var dataSource = gf_NoAsyncTransaction('stmmng001/removeMhsEmpFamily', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchMhshrb001Tab4();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

var fn_GridValidationTab4 = function(){
	var valid = true; 
	var checkCode;
	var nRowNum = dhxGridMhsEmpGnfd.getRowsNum();
	if(nRowNum == 0){
		valid = false;
		gf_DivMsgAlert("저장 할 정보가 없습니다.");
	}
	else {
		dhxGridMhsEmpGnfd.forEachRow(function(rowId) {
			if(!gf_IsNull(dhxDataProcessorMhsEmpGnfd.getState(rowId))) {
				ihidnum = gf_DhxGetValue(dhxGridMhsEmpGnfd, rowId, 'ihidnum', 'grid');
				var code;
				dhxGridMhsEmpGnfd.forEachRow(function(rowIdForCheck) {
					var chkIhidnum = gf_DhxGetValue(dhxGridMhsEmpGnfd, rowIdForCheck, 'ihidnumOl', 'grid');
					if(!gf_IsNull(ihidnum) && (chkIhidnum == ihidnum) && (rowId != rowIdForCheck)) {
						gf_DivMsgAlert("중복된 주민번호가 있습니다.");
						fn_GridValidationSelectCellTab4(dhxGridMhsEmpGnfd, rowId, 'ihidnum');
						valid = false;
						return valid;
					}
				});
				// 성명은 DataProcessor 의 setVerificator 로 처리 (사용자 정의 함수)
				/*
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpGnfd, rowId, 'ordr', 'grid') )){
					gf_DivMsgAlert("순서는  필수항목 입니다.");
					fn_GridValidationSelectCellTab4(dhxGridMhsEmpGnfd, rowId, 'ordr');
					valid = false;
				}
				if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridMhsEmpGnfd, rowId, 'ordr', 'grid') )){
					gf_DivMsgAlert("순서는 숫자만 입력 가능합니다.");
					gf_DhxSetValue(dhxGridMhsEmpGnfd, rowId, 'ordr', '', 'grid');
					fn_GridValidationSelectCellTab4(dhxGridMhsEmpGnfd, rowId, 'ordr');
					valid = false;
				}*/
			}
	    });
	}
	return valid;	 
}

var fn_GridValidationSelectCellTab4 = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhsEmpGnfd.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}

var fn_ExcelMhshrb001Gnfd = function () {
    var titMhshrb999 = '인사기본-발령'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab4_Gnfd', 'empno', 'text')
        //,familySn : gf_FormGetValue('searchFormMhshrb999', 'familySn', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '가족순번' /* gf_LocaleTrans('default', 'titFamilySn') */,
        '가족코드(공통코드:C019)' /* gf_LocaleTrans('default', 'titFamilyCode') */,
        '연말정산 관계 코드 (C084)' /* gf_LocaleTrans('default', 'titYndexcclcRelateCode') */,
        '연말정산 대상 여부' /* gf_LocaleTrans('default', 'titYndexcclcTrgetAt') */,
        '가족구성원의 이름을 기록하는 항목' /* gf_LocaleTrans('default', 'titFamilyNm') */,
        '가족구성원의 주민등록번호를 기록하는 항목' /* gf_LocaleTrans('default', 'titIhidnum') */,
        '가족의 실제 생년월일' /* gf_LocaleTrans('default', 'titBrthdy') */,
        '동거여부' /* gf_LocaleTrans('default', 'titLivtgtAt') */,
        '갑근세계산여부' /* gf_LocaleTrans('default', 'titSuportAt') */,
        '수당지급여부' /* gf_LocaleTrans('default', 'titAllwncTrgetAt') */,
        '최종학력코드 (C016)' /* gf_LocaleTrans('default', 'titLscholSeCode') */,
        '직업' /* gf_LocaleTrans('default', 'titOccpNm') */,
        '직위 명' /* gf_LocaleTrans('default', 'titOfcpsNm') */,
        '휴대전화' /* gf_LocaleTrans('default', 'titMbtlnum') */,
        '장애인 여부' /* gf_LocaleTrans('default', 'titDspsnAt') */,
        '장애인 번호' /* gf_LocaleTrans('default', 'titDspsnNo') */,
        '장애인구분 1: 장애인복지법, 2:국가유공자, 3:중증장애인( C152)' /* gf_LocaleTrans('default', 'titDspsnSeCode') */,
        '중증 여부' /* gf_LocaleTrans('default', 'titSrsillAt') */,
        '직장명' /* gf_LocaleTrans('default', 'titWrcNm') */
    ]];
    var dataId = [[ 'empno', 'familySn', 'familyCode', 'yndexcclcRelateCode', 'yndexcclcTrgetAt', 'familyNm', 'ihidnum', 'brthdy', 'livtgtAt', 'suportAt', 'allwncTrgetAt', 'lscholSeCode', 'occpNm', 'ofcpsNm', 'mbtlnum', 'dspsnAt', 'dspsnNo', 'dspsnSeCode', 'srsillAt', 'wrcNm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsFamily ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsFamily;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/excelMhsEmpFamily', jsonParameter);
};
