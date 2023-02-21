/**
 * 프로그램 : 인사기본 화면 중 Tab11(계좌) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.04.23
 * 사용테이블 : MHS_ACNUT
 **/

var tab11_empno = '';

var titMhsAcnut = gf_LocaleTrans('default','titMhsAcnut');

var g_Tab11SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpAcnut;  //GRID

var dhxDataProcessorMhshrm001Acnut = null;
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

    var dhxGridMhsEmpAcnutListInfo = [];
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrb000" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('계좌구분코드', '100', 'center', 'str', 'coro', false, 'acnutSeCode', '', '')); /* gf_LocaleTrans('default', 'titAcnutSeCode') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('은행코드', '80', 'center', 'str', 'ro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('#cspan', '40', 'center', 'str', 'button2', false, '', '', ''));
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('은행명', '100', 'left', 'str', 'ed', false, 'bankNm', '', '')); /* gf_LocaleTrans('default', 'titBankNm') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('계좌번호', '150', 'center', 'str', 'ed', false, 'acnutno', '', '')); /* gf_LocaleTrans('default', 'titAcnutno') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('예금주명', '100', 'center', 'str', 'ed', false, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('시작일자', '90', 'center', 'date', 'dhxCalendarA', false, 'beginDe', '', '')); /* gf_LocaleTrans('default', 'titBeginDe') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('종료일자', '90', 'center', 'date', 'dhxCalendarA', false, 'endDe', '', '')); /* gf_LocaleTrans('default', 'titEndDe') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('비고', '200', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '100', 'right', 'str', 'button1', false, 'bnkbAtchmnflnoEdit', '', '')); /* gf_LocaleTrans('default', 'titBnkbAtchmnflno') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '10', 'center', 'str', 'ro', true, 'bnkbAtchmnflno', '', '')); /* gf_LocaleTrans('default', 'titBnkbAtchmnflno') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('사원번호', '10', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('계좌순번', '10', 'center', 'str', 'ro', true, 'acnutSn', '', '')); /* gf_LocaleTrans('default', 'titAcnutSn') */
    dhxGridMhsEmpAcnutListInfo.push(gf_MakeDhxGridHeader('CHK', '10', 'center', 'str', 'ro', true, 'regId', '', ''));
    
    dhxGridMhsEmpAcnut = gf_MakeDhxGrid('MhsEmpAcnutDataList', dhxGridMhsEmpAcnutListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)
    
    dhxGridMhsEmpAcnut.enableAutoWidth(true);
    dhxGridMhsEmpAcnut.enableEditEvents(true,false,false);  //(boolean click,boolean dblclick,boolean f2Key)
    dhxGridMhsEmpAcnut.setDateFormat("%Y-%m-%d");
    
    //dhxGridMhsEmpAcnut.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpAcnut.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    
    var jsonParameter = {codekindCode : "C471",exceptCode :"",sortOrder :"asc" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhsEmpAcnut, dhxGridMhsEmpAcnut.getColIndexById("acnutSeCode"), dataSource.data, "sel");
    
    $("#saveFormEmp_Tab11_Acnut").validate({
        errorElement: 'div'
    });
};

var eventIdsMhsEmpAcnut = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpAcnut = gf_GridDetachEvent(dhxGridMhsEmpAcnut, eventIdsMhsEmpAcnut);
    
	eventId = dhxGridMhsEmpAcnut.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) {
        	//fn_ExcelMhshrm010();
        }
        else if(keyCode == 13 || keyCode == 9)  {   //ENTER , TAB
    		var selectedId = dhxGridMhsEmpAcnut.getSelectedRowId();
    		var ind        = dhxGridMhsEmpAcnut.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpAcnut.getRowIndex(selectedId);
    		dhxGridMhsEmpAcnut.selectCell(rowIndex, ind+1);
    		dhxGridMhsEmpAcnut.editCell();
    	} 
        else if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhsEmpAcnut.getSelectedRowId();
    		var ind        = dhxGridMhsEmpAcnut.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpAcnut.getRowIndex(selectedId);
    		dhxGridMhsEmpAcnut.selectCell(rowIndex+1, ind);
    		dhxGridMhsEmpAcnut.editCell();
    	} 
        else if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhsEmpAcnut.getSelectedRowId();
    		var ind        = dhxGridMhsEmpAcnut.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpAcnut.getRowIndex(selectedId);
    		dhxGridMhsEmpAcnut.selectCell(rowIndex-1, ind);
    		dhxGridMhsEmpAcnut.editCell();
    	}
        else return true;
    });
	eventIdsMhsEmpAcnut.push(eventId);
    
    eventId = dhxGridMhsEmpAcnut.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'beginDe') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'endDe')) return false;
    	
    	var sChk = gf_DhxGetValue(dhxGridMhsEmpAcnut, rId, 'regId', 'grid')
    	if(!gf_IsNull(sChk)){
    		if(cInd == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'acnutSeCode') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'bankCode') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'bankNm')) { return false; }
    	}
		return true;
    }); 
    eventIdsMhsEmpAcnut.push(eventId);
    
    eventId = dhxGridMhsEmpAcnut.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_Mhshrm001AcnutSortGridList(ind, type, direction);
    });
    eventIdsMhsEmpAcnut.push(eventId);
    
    var AcnutCalendarEventIds = [];
    eventId = dhxGridMhsEmpAcnut.attachEvent('onRowSelect', function(rid, cind) {
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpAcnut, rid, 'beginDe', 'grid');	
    		var pos = dhxGridMhsEmpAcnut.getPosition(this.cell);    		
    		dhxGridMhsEmpAcnut._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpAcnut._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpAcnut._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpAcnut._grid_calendarA._show();    		
    		AcnutCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpAcnut._grid_calendarA, AcnutCalendarEventIds);    		
    		eventId = dhxGridMhsEmpAcnut._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rid, dhxGridMhsEmpAcnut._grid_calendarA.getDate() );
    		});
    		AcnutCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'datePickerButtonE')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpAcnut, rid, 'endDe', 'grid');	
    		var pos = dhxGridMhsEmpAcnut.getPosition(this.cell);    		
    		dhxGridMhsEmpAcnut._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpAcnut._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpAcnut._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpAcnut._grid_calendarA._show();    		
    		AcnutCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpAcnut._grid_calendarA, AcnutCalendarEventIds);    		
    		eventId = dhxGridMhsEmpAcnut._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateE( rid, dhxGridMhsEmpAcnut._grid_calendarA.getDate() );
    		});
    		AcnutCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'button1')) {
    		//fn_FileUploadPopUpAcdmcrOutputs( rid );
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'button2')) {
    		//fn_FileUploadPopUpAcdmcrOutputs( rid );
    	}
    });
    eventIdsMhsEmpAcnut.push(eventId);
    
    // other event

    //btnAdd_Tab11
    $('#btnAdd_Tab11').unbind('click').bind('click', function(event){
    	dhxGridMhsEmpAcnut.clearSelection();
    	dhxGridMhsEmpAcnut.addRow(dhxGridMhsEmpAcnut.uid(),[0,'','','','','','','',gf_GetNowDate().format('YYYY-MM-DD'),'','','','','','',gf_FormGetValue('saveFormEmp_Tab11_Acnut', 'empno', 'text'),0,''] , 0);
    	dhxGridMhsEmpAcnut.selectRow(0, false, false,true);

    	dhxGridMhsEmpAcnut.selectCell(0, 2);
    	dhxGridMhsEmpAcnut.editCell();
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpAcnutDataList'); 
    });
    //btnRemove_Tab11
    $('#btnRemove_Tab11').unbind('click').bind('click', function() {
        fn_RemoveMhshrm001Acnut();
    });
    //btnSave_Tab11
    $('#btnSave_Tab11').unbind('click').bind('click', function() {
    	if(fn_GridValidationMhshrm001Acnut()) {
    		dhxDataProcessorMhshrm001Acnut.sendData();
    	}
    });
    //초기화
    $('#btnInit_Tab11').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab11();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){
    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab11();
};
//조회
var fn_SearchMhshrb001Tab11 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab11_Acnut', 'empno', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab11_empno = empno;
	g_Tab11SearchValue.empno = empno;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab11_Acnut', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpTab11Acnut', jsonParameter, 'fn_CallbackSearchMhshrb001Tab11', false, 'GET');
    
    dhxDataProcessorMhshrm001Acnut = new dataProcessor("/xerp/mhshrb001/saveMhsEmpTab11Acnut"); //lock feed url
    dhxDataProcessorMhshrm001Acnut.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm001Acnut.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm001Acnut.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm001Acnut.init(dhxGridMhsEmpAcnut); //link dataprocessor to the grid
        
    dhxDataProcessorMhshrm001Acnut.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};   
    dhxDataProcessorMhshrm001Acnut.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    	if(dataSource.data.code == "999"){
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgExist'));
	 		return false;
    	}
    	else if (dataSource.code == "000" || dataSource.data.code !== "000"){
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    		fn_SearchMhshrb001Tab11();
    		return true;
	 	} else {
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	 		return false;
	 	}
    });  
    
    dhxDataProcessorMhshrm001Acnut.attachEvent("onValidationError",function(id,messages){
		gf_DivMsgAlert(messages.join("<br>"));      
		return false;
	});
};


var fn_CallbackSearchMhshrb001Tab11 = function (strSvcID, targetID, data){
	dhxGridMhsEmpAcnut.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpAcnut.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpAcnutDataList');
    	
    	dhxGridMhsEmpAcnut.selectCell(0,2);
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpAcnutDataList');
    	$('#btnAdd_Tab11').click();
    }
	$('#spanMhsEmpAcnutCnt').text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListener();
};
/**
 * 삭제
 */
var fn_RemoveMhshrm001Acnut = function() {
	var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpAcnut, 'selYn', 'empno');
	var acnutSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpAcnut, 'selYn', 'acnutSn');
    if(gf_IsNull(empnos) && gf_IsNull(crqfsSns)) {
        gf_DivMsgAlert('삭제할 계좌를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titbsrpSeCode') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhshrm001AcnutSend()', '');
    }
};

var fn_RemoveMhshrm001AcnutSend = function() {
    var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpAcnut, 'selYn', 'empno');
    var acnutSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpAcnut, 'selYn', 'acnutSn');
    var jsonParameter = {
    		empnos : empnos.join(','),
    		acnutSns : acnutSns.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mhshrb001/removeMhsEmpTab11Acnut', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchMhshrb001Tab11();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_Mhshrm001AcnutSortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMhsEmpAcnut, 'num')){
	  	var sortOrder = gf_FormGetValue('saveFormEmp_Tab11_Acnut', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('saveFormEmp_Tab11_Acnut', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsEmpAcnut, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxGridMhsEmpAcnut.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('saveFormEmp_Tab11_Acnut', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab11_Acnut', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpAcnut, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxGridMhsEmpAcnut.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('saveFormEmp_Tab11_Acnut', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab11_Acnut', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpAcnut, ind), 'text');
	  	}
	  	else {
	  		dhxGridMhsEmpAcnut.setSortImgState(false);
	  		gf_FormSetValue('saveFormEmp_Tab11_Acnut', 'sortDirection', '', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab11_Acnut', 'sortColumId', '', 'text');
	  	}
	}
}

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
    	//if(!gf_IsNull(val)){
    		var row_id=this.cell.parentNode.idd;
    		this.setCValue('<span class="glyphicon glyphicon glyphicon-download" style="cursor: pointer;" onclick="parent.fn_FileUploadPopUpIframeOutputs(\'' + val + '\', \'' + row_id + '\', 11 )"></span>'); 
    	//}
    }
}
eXcell_button1.prototype = new eXcell;// nests all other methods from the base class

var fn_FileUploadPopUpTabReturn = function(rid, rtnFileKey){
	//alert(rid);
	//alert(rtnFileKey);
	gf_DhxSetValue(dhxGridMhsEmpAcnut, rid, 'bnkbAtchmnflno', rtnFileKey, 'grid');
	gf_DhxSetValue(dhxGridMhsEmpAcnut, rid, 'bnkbAtchmnflnoEdit', rtnFileKey, 'grid');
	dhxDataProcessorMhshrm001Acnut.setUpdated(rid, true, 'updated');
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
    	//if(!gf_IsNull(val)){
    		var row_id=this.cell.parentNode.idd;
    		var get_val = gf_DhxGetValue(dhxGridMhsEmpAcnut, row_id, 'bankCode', 'grid');
    		this.setCValue('<span class="glyphicon glyphicon glyphicon-search" style="cursor: pointer;" onclick="parent.fn_tabGridSearchComCodeButton(\'' + get_val + '\', \'' + row_id + '\', 11, \'C010\')"></span>'); 
    	//}
    	//
    }
}
eXcell_button2.prototype = new eXcell;// nests all other methods from the base class

var fn_CallbackGridSearchComCodeButtonReturn = function(rid, codeInfo){
	if(codeInfo.code){
		gf_DhxSetValue(dhxGridMhsEmpAcnut, rid, 'bankCode', codeInfo.code, 'grid');
		gf_DhxSetValue(dhxGridMhsEmpAcnut, rid, 'bankNm', codeInfo.codeKorNm, 'grid');
	}
}


var eXcell_datePickerButtonS = function(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue = function(val){
        this.setCValue("<div id=''></div><img src='/xerp/img/sub/icon_calen.png' alt='날짜선택' style='cursor:pointer'>");                                      
    }
}
eXcell_datePickerButtonS.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateS = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMhsEmpAcnut, rid, 'beginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Acnut.setUpdated(rid, true, 'updated');
	}	
}

var eXcell_datePickerButtonE = function(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue = function(val){
        this.setCValue("<div id=''></div><img src='/xerp/img/sub/icon_calen.png' alt='날짜선택' style='cursor:pointer'>");                                      
    }
}
eXcell_datePickerButtonE.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateE = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMhsEmpAcnut, rid, 'endDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Acnut.setUpdated(rid, true, 'updated');
	}	
}


var fn_ExcelMhshrb001Acnut = function () {
    var titMhshrb999 = '인사기본-계좌'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab11_Acnut', 'empno', 'text')
    };

    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '계좌순번' /* gf_LocaleTrans('default', 'titAcnutSn') */,
        '계좌구분코드' /* gf_LocaleTrans('default', 'titAcnutSeCode') */,
        '은행코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '은행명' /* gf_LocaleTrans('default', 'titBankNm') */,
        '계좌번호' /* gf_LocaleTrans('default', 'titAcnutno') */,
        '예금주명' /* gf_LocaleTrans('default', 'titDpstrNm') */,
        '시작일자' /* gf_LocaleTrans('default', 'titBeginDe') */,
        '종료일자' /* gf_LocaleTrans('default', 'titEndDe') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empno', 'acnutSn', 'acnutSeCode', 'bankCode', 'bankNm', 'acnutno', 'dpstrNm', 'beginDe', 'endDe', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsAcnut ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsAcnut;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/searchMhsEmpTab9Crqfs', jsonParameter);
};

/* 그리드  Validation check */
var fn_GridValidationMhshrm001Acnut = function(){
	var valid = true;
	var checkCode;
	dhxGridMhsEmpAcnut.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Acnut.getState(rowId))) {
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpAcnut, rowId, 'acnutSeCode', 'grid') )){
				if(valid){
					gf_DivMsgAlert("계좌구분코드는 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpAcnut, rowId, 'acnutSeCode');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpAcnut, rowId, 'bankCode', 'grid') )){
				if(valid){
					gf_DivMsgAlert("은행코드는 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpAcnut, rowId, 'bankCode');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpAcnut, rowId, 'acnutno', 'grid') )){
				if(valid){
					gf_DivMsgAlert("계좌번호는 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpAcnut, rowId, 'acnutno');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpAcnut, rowId, 'dpstrNm', 'grid') )){
				if(valid){
					gf_DivMsgAlert("예금주명은 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpAcnut, rowId, 'dpstrNm');
				valid = false;
			}
			
			var endDate = gf_DhxGetValue(dhxGridMhsEmpAcnut, rowId, 'endDe', 'grid');
			if(!gf_IsNull(endDate)){
				var startDate = gf_DhxGetValue(dhxGridMhsEmpAcnut, rowId, 'beginDe', 'grid');
				var startDateArr = startDate.split('-');
				var endDateArr = endDate.split('-');
	
				var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
				var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
				         
				if(startDateCompare.getTime() > endDateCompare.getTime()) {
					if(valid){
						gf_DivMsgAlert("종료일자가 시작일자보다 빠릅니다.");
					}
					fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpAcnut, rowId, 'endDe');
					valid = false;
				}
			}
		}
    });
	return valid;	 
}
var fn_GridValidationSelectCellMhshrm001Acnut = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Acnut.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}
