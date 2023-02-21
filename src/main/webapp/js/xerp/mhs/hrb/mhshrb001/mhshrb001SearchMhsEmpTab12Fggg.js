/**
 * 프로그램 : 인사기본 화면 중 Tab12(어학) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.04.23
 * 사용테이블 : MHS_FGGG
 **/

var tab12_empno = '';

var titMhsFggg = gf_LocaleTrans('default','titMhsFggg');

var g_Tab12SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpFggg;  //GRID

var dhxDataProcessorMhshrm001Fggg = null;
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

    var dhxGridMhsEmpFgggListInfo = [];
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrb000" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('외국어\n구분코드', '100', 'center', 'str', 'coro', false, 'fgggSeCode', '', '')); /* gf_LocaleTrans('default', 'titFgggSeCode') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('외국어\n시험명', '100', 'center', 'str', 'ed', false, 'fgggTestNm', '', '')); /* gf_LocaleTrans('default', 'titFgggTestNm') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('외국어\n점수', '80', 'center', 'str', 'ed', false, 'fgggScore', '', '')); /* gf_LocaleTrans('default', 'titFgggScore') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('외국어\n등급', '80', 'center', 'str', 'ed', false, 'fgggGradCode', '', '')); /* gf_LocaleTrans('default', 'titFgggGradCode') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('등급레벨', '100', 'center', 'str', 'ed', false, 'gradLvl', '', '')); /* gf_LocaleTrans('default', 'titGradLvl') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('시행기관명', '100', 'center', 'str', 'ed', false, 'opertninsttNm', '', '')); /* gf_LocaleTrans('default', 'titOpertninsttNm') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('발급번호', '100', 'center', 'str', 'ed', false, 'issuNo', '', '')); /* gf_LocaleTrans('default', 'titIssuNo') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('응시일자', '80', 'center', 'date', 'dhxCalendarA', false, 'apyexmDe', '', '')); /* gf_LocaleTrans('default', 'titApyexmDe') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButton1',false,'datePickerButton1','',''));
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('취득일자', '80', 'center', 'date', 'dhxCalendarA', false, 'acqsDe', '', '')); /* gf_LocaleTrans('default', 'titAcqsDe') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButton2',false,'datePickerButton2','',''));
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('만료일자', '80', 'center', 'date', 'dhxCalendarA', false, 'endDe', '', '')); /* gf_LocaleTrans('default', 'titEndDe') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButton3',false,'datePickerButton3','',''));
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('비고', '200', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('첨부파일', '60', 'center', 'str', 'button1', false, 'docAtchmnflNoEdit', '', '')); /* gf_LocaleTrans('default', 'titDocAtchmnflNo') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('첨부파일', '10', 'center', 'str', 'ro', true, 'docAtchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titDocAtchmnflNo') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('사원번호', '10', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('외국어순번', '10', 'center', 'str', 'ro', true, 'fgggSn', '', '')); /* gf_LocaleTrans('default', 'titFgggSn') */
    dhxGridMhsEmpFgggListInfo.push(gf_MakeDhxGridHeader('CHK', '10', 'center', 'str', 'ro', true, 'regId', '', ''));
    
    dhxGridMhsEmpFggg = gf_MakeDhxGrid('MhsEmpFgggDataList', dhxGridMhsEmpFgggListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)
    
    dhxGridMhsEmpFggg.enableAutoWidth(true);
    dhxGridMhsEmpFggg.enableEditEvents(true,false,false);  //(boolean click,boolean dblclick,boolean f2Key)
    dhxGridMhsEmpFggg.setDateFormat("%Y-%m-%d");
    
    //dhxGridMhsEmpFggg.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpFggg.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    
    var jsonParameter = {codekindCode : "C166",exceptCode :"",sortOrder :"asc" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhsEmpFggg, dhxGridMhsEmpFggg.getColIndexById("fgggSeCode"), dataSource.data, "sel");
    
    $("#saveFormEmp_Tab12_Fggg").validate({
        errorElement: 'div'
    });
};

var eventIdsMhsEmpFggg = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpFggg = gf_GridDetachEvent(dhxGridMhsEmpFggg, eventIdsMhsEmpFggg);
    
	eventId = dhxGridMhsEmpFggg.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) {
        	//fn_ExcelMhshrm010();
        }
        else if(keyCode == 13 || keyCode == 9)  {   //ENTER , TAB
    		var selectedId = dhxGridMhsEmpFggg.getSelectedRowId();
    		var ind        = dhxGridMhsEmpFggg.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpFggg.getRowIndex(selectedId);
    		dhxGridMhsEmpFggg.selectCell(rowIndex, ind+1);
    		dhxGridMhsEmpFggg.editCell();
    	} 
        else if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhsEmpFggg.getSelectedRowId();
    		var ind        = dhxGridMhsEmpFggg.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpFggg.getRowIndex(selectedId);
    		dhxGridMhsEmpFggg.selectCell(rowIndex+1, ind);
    		dhxGridMhsEmpFggg.editCell();
    	} 
        else if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhsEmpFggg.getSelectedRowId();
    		var ind        = dhxGridMhsEmpFggg.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpFggg.getRowIndex(selectedId);
    		dhxGridMhsEmpFggg.selectCell(rowIndex-1, ind);
    		dhxGridMhsEmpFggg.editCell();
    	}
        else return true;
    });
	eventIdsMhsEmpFggg.push(eventId);
    
    eventId = dhxGridMhsEmpFggg.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'apyexmDe') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'acqsDe') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'endDe')) return false;
    	
    	var sChk = gf_DhxGetValue(dhxGridMhsEmpFggg, rId, 'regId', 'grid')
    	if(!gf_IsNull(sChk)){
    		if(cInd == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'fgggSeCode') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'fgggTestNm')) { return false; }
    	}
		return true;
    }); 
    eventIdsMhsEmpFggg.push(eventId);
    
    eventId = dhxGridMhsEmpFggg.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_Mhshrm001FgggSortGridList(ind, type, direction);
    });
    eventIdsMhsEmpFggg.push(eventId);
    
    var FgggCalendarEventIds = [];
    eventId = dhxGridMhsEmpFggg.attachEvent('onRowSelect', function(rid, cind) {
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'datePickerButton1')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpFggg, rid, 'apyexmDe', 'grid');	
    		var pos = dhxGridMhsEmpFggg.getPosition(this.cell);    		
    		dhxGridMhsEmpFggg._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpFggg._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpFggg._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpFggg._grid_calendarA._show();    		
    		FgggCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpFggg._grid_calendarA, FgggCalendarEventIds);    		
    		eventId = dhxGridMhsEmpFggg._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDate1( rid, dhxGridMhsEmpFggg._grid_calendarA.getDate() );
    		});
    		FgggCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'datePickerButton2')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpFggg, rid, 'acqsDe', 'grid');	
    		var pos = dhxGridMhsEmpFggg.getPosition(this.cell);    		
    		dhxGridMhsEmpFggg._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpFggg._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpFggg._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpFggg._grid_calendarA._show();    		
    		FgggCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpFggg._grid_calendarA, FgggCalendarEventIds);    		
    		eventId = dhxGridMhsEmpFggg._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDate2( rid, dhxGridMhsEmpFggg._grid_calendarA.getDate() );
    		});
    		FgggCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'datePickerButton3')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpFggg, rid, 'endDe', 'grid');	
    		var pos = dhxGridMhsEmpFggg.getPosition(this.cell);    		
    		dhxGridMhsEmpFggg._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpFggg._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpFggg._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpFggg._grid_calendarA._show();    		
    		FgggCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpFggg._grid_calendarA, FgggCalendarEventIds);    		
    		eventId = dhxGridMhsEmpFggg._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDate3( rid, dhxGridMhsEmpFggg._grid_calendarA.getDate() );
    		});
    		FgggCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'button1')) {
    		//fn_FileUploadPopUpAcdmcrOutputs( rid );
    	}
    });
    eventIdsMhsEmpFggg.push(eventId);
    
    // other event

    //btnAdd_Tab12
    $('#btnAdd_Tab12').unbind('click').bind('click', function(event){
    	dhxGridMhsEmpFggg.clearSelection();
    	dhxGridMhsEmpFggg.addRow(dhxGridMhsEmpFggg.uid(),[0,'','','','','','','','','','','','','','','','','',  gf_FormGetValue('saveFormEmp_Tab12_Fggg', 'empno', 'text'),0,''] , 0);
    	dhxGridMhsEmpFggg.selectRow(0, false, false,true);

    	dhxGridMhsEmpFggg.selectCell(0, 2);
    	dhxGridMhsEmpFggg.editCell();
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpFgggDataList'); 
    });
    //btnRemove_Tab12
    $('#btnRemove_Tab12').unbind('click').bind('click', function() {
        fn_RemoveMhshrm001Fggg();
    });
    //btnSave_Tab12
    $('#btnSave_Tab12').unbind('click').bind('click', function() {
    	if(fn_GridValidationMhshrm001Fggg()) {
    		dhxDataProcessorMhshrm001Fggg.sendData();
    	}
    });
    //초기화
    $('#btnInit_Tab12').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab12();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){
    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab12();
};
//조회
var fn_SearchMhshrb001Tab12 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab12_Fggg', 'empno', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab12_empno = empno;
	g_Tab12SearchValue.empno = empno;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab12_Fggg', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpTab12Fggg', jsonParameter, 'fn_CallbackSearchMhshrb001Tab12', false, 'GET');
    
    dhxDataProcessorMhshrm001Fggg = new dataProcessor("/xerp/mhshrb001/saveMhsEmpTab12Fggg"); //lock feed url
    dhxDataProcessorMhshrm001Fggg.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm001Fggg.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm001Fggg.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm001Fggg.init(dhxGridMhsEmpFggg); //link dataprocessor to the grid
        
    dhxDataProcessorMhshrm001Fggg.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};   
    dhxDataProcessorMhshrm001Fggg.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    	if(dataSource.data.code == "999"){
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgExist'));
	 		return false;
    	}
    	else if (dataSource.code == "000" || dataSource.data.code !== "000"){
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    		fn_SearchMhshrb001Tab12();
    		return true;
	 	} else {
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	 		return false;
	 	}
    });  
    
    dhxDataProcessorMhshrm001Fggg.attachEvent("onValidationError",function(id,messages){
		gf_DivMsgAlert(messages.join("<br>"));      
		return false;
	});
};


var fn_CallbackSearchMhshrb001Tab12 = function (strSvcID, targetID, data){
	dhxGridMhsEmpFggg.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpFggg.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpFgggDataList');
    	
    	dhxGridMhsEmpFggg.selectCell(0,2);
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpFgggDataList');
    	$('#btnAdd_Tab12').click();
    }
	$('#spanMhsEmpFgggCnt').text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListener();
};
/**
 * 삭제
 */
var fn_RemoveMhshrm001Fggg = function() {
	var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpFggg, 'selYn', 'empno');
	var fgggSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpFggg, 'selYn', 'fgggSn');
    if(gf_IsNull(empnos) && gf_IsNull(fgggSns)) {
        gf_DivMsgAlert('삭제할 어학정보를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titbsrpSeCode') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhshrm001FgggSend()', '');
    }
};

var fn_RemoveMhshrm001FgggSend = function() {
    var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpFggg, 'selYn', 'empno');
    var fgggSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpFggg, 'selYn', 'fgggSn');
    var jsonParameter = {
    		empnos : empnos.join(','),
    		fgggSns : fgggSns.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mhshrb001/removeMhsEmpTab12Fggg', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchMhshrb001Tab12();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_Mhshrm001FgggSortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMhsEmpFggg, 'num')){
	  	var sortOrder = gf_FormGetValue('saveFormEmp_Tab12_Fggg', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('saveFormEmp_Tab12_Fggg', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsEmpFggg, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxGridMhsEmpFggg.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('saveFormEmp_Tab12_Fggg', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab12_Fggg', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpFggg, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxGridMhsEmpFggg.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('saveFormEmp_Tab12_Fggg', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab12_Fggg', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpFggg, ind), 'text');
	  	}
	  	else {
	  		dhxGridMhsEmpFggg.setSortImgState(false);
	  		gf_FormSetValue('saveFormEmp_Tab12_Fggg', 'sortDirection', '', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab12_Fggg', 'sortColumId', '', 'text');
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
    		this.setCValue('<span class="glyphicon glyphicon glyphicon-download" style="cursor: pointer;" onclick="parent.fn_FileUploadPopUpIframeOutputs(\'' + val + '\', \'' + row_id + '\', 12 )"></span>'); 
    	//}
    }
}
eXcell_button1.prototype = new eXcell;// nests all other methods from the base class

var fn_FileUploadPopUpTabReturn = function(rid, rtnFileKey){
	//alert(rid);
	//alert(rtnFileKey);
	gf_DhxSetValue(dhxGridMhsEmpFggg, rid, 'docAtchmnflNo', rtnFileKey, 'grid');
	gf_DhxSetValue(dhxGridMhsEmpFggg, rid, 'docAtchmnflNoEdit', rtnFileKey, 'grid');
	dhxDataProcessorMhshrm001Fggg.setUpdated(rid, true, 'updated');
}

var eXcell_datePickerButton1 = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButton1.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDate1 = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMhsEmpFggg, rid, 'apyexmDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Fggg.setUpdated(rid, true, 'updated');
	}	
}

var eXcell_datePickerButton2 = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButton2.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDate2 = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMhsEmpFggg, rid, 'acqsDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Fggg.setUpdated(rid, true, 'updated');
	}	
}

var eXcell_datePickerButton3 = function(cell){ //the eXcell name is defined here
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
eXcell_datePickerButton3.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDate3 = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMhsEmpFggg, rid, 'endDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Fggg.setUpdated(rid, true, 'updated');
	}	
}



var fn_ExcelMhshrb001Fggg = function () {
    var titMhshrb999 = '인사기본-계좌'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab12_Fggg', 'empno', 'text')
    };

    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '외국어순번' /* gf_LocaleTrans('default', 'titFgggSn') */,
        '외국어구분코드' /* gf_LocaleTrans('default', 'titFgggSeCode') */,
        '외국어시험명' /* gf_LocaleTrans('default', 'titFgggTestNm') */,
        '외국어점수' /* gf_LocaleTrans('default', 'titFgggScore') */,
        '외국어등급' /* gf_LocaleTrans('default', 'titFgggGradCode') */,
        '등급레벨' /* gf_LocaleTrans('default', 'titGradLvl') */,
        '시행기관명' /* gf_LocaleTrans('default', 'titOpertninsttNm') */,
        '발급번호' /* gf_LocaleTrans('default', 'titIssuNo') */,
        '응시일자' /* gf_LocaleTrans('default', 'titApyexmDe') */,
        '취득일자' /* gf_LocaleTrans('default', 'titAcqsDe') */,
        '만료일자' /* gf_LocaleTrans('default', 'titEndDe') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empno', 'fgggSn', 'fgggSeCode', 'fgggTestNm', 'fgggScore', 'fgggGradCode', 'gradLvl', 'opertninsttNm', 'issuNo', 'apyexmDe', 'acqsDe', 'endDe', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsFggg ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsFggg;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/searchMhsEmpTab12Fggg', jsonParameter);
};

/* 그리드  Validation check */
var fn_GridValidationMhshrm001Fggg = function(){
	var valid = true;
	var checkCode;
	dhxGridMhsEmpFggg.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Fggg.getState(rowId))) {
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpFggg, rowId, 'fgggSeCode', 'grid') )){
				if(valid){
					gf_DivMsgAlert("외국어구분코드는 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpFggg, rowId, 'fgggSeCode');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpFggg, rowId, 'fgggTestNm', 'grid') )){
				if(valid){
					gf_DivMsgAlert("외국어시험명은 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpFggg, rowId, 'fgggTestNm');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpFggg, rowId, 'fgggScore', 'grid') )){
				if(valid){
					gf_DivMsgAlert("외국어점수는 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpFggg, rowId, 'fgggScore');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpFggg, rowId, 'acqsDe', 'grid') )){
				if(valid){
					gf_DivMsgAlert("취득일자는 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpFggg, rowId, 'acqsDe');
				valid = false;
			}
			
			var endDate = gf_DhxGetValue(dhxGridMhsEmpFggg, rowId, 'endDe', 'grid');
			if(!gf_IsNull(endDate)){
				var startDate = gf_DhxGetValue(dhxGridMhsEmpFggg, rowId, 'acqsDe', 'grid');
				var startDateArr = startDate.split('-');
				var endDateArr = endDate.split('-');
	
				var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
				var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
				         
				if(startDateCompare.getTime() > endDateCompare.getTime()) {
					if(valid){
						gf_DivMsgAlert("만료일자가 취득일자보다 빠릅니다.");
					}
					fn_GridValidationSelectCellMhshrm001Acnut(dhxGridMhsEmpFggg, rowId, 'endDe');
					valid = false;
				}
			}
		}
    });
	return valid;	 
}
var fn_GridValidationSelectCellMhshrm001Acnut = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Fggg.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}
