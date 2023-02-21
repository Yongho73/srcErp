/**
 * 프로그램 : 인사기본 화면 중 Tab7(학력) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.04.23
 * 사용테이블 : MHS_DSCPL
 **/

var tab7_empno = '';

var titMhsAcdmcr = gf_LocaleTrans('default','titMhsAcdmcr');

var g_Tab7SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpAcdmcr;  //GRID

var dhxDataProcessorMhshrm001Acdmcr = null;
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

    var dhxGridMhsEmpAcdmcrListInfo = [];
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'cntr', false, 'num', '','')); // 번호  //(header, width, align, sort, type, hidden, id, attach, valid)
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrb000" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('학교명', '150', 'center', 'str', 'ed', false, 'schulNm', '', '')); /* gf_LocaleTrans('default', 'titSchulNm') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('입학일자', '80', 'center', 'date', 'dhxCalendarA', false, 'entschDe', '', '')); /* gf_LocaleTrans('default', 'titEntschDe') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('졸업일자', '80', 'center', 'date', 'dhxCalendarA', false, 'grdtnDe', '', '')); /* gf_LocaleTrans('default', 'titGrdtnDe') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('전공', '100', 'left', 'str', 'ed', false, 'majorNm', '', '')); /* gf_LocaleTrans('default', 'titMajorNm') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('부전공', '100', 'left', 'str', 'ed', false, 'minorNm', '', '')); /* gf_LocaleTrans('default', 'titMinorNm') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('학위', '80', 'center', 'str', 'coro', false, 'dgriCode', '', '')); /* gf_LocaleTrans('default', 'titDgriCode') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('지역', '80', 'center', 'str', 'coro', false, 'areaCode', '', '')); /* gf_LocaleTrans('default', 'titAreaCode') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('졸업구분', '80', 'center', 'str', 'coro', false, 'grdtnSeCode', '', '')); /* gf_LocaleTrans('default', 'titGrdtnSeCode') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('학력', '100', 'center', 'str', 'coro', false, 'acdmcrSeCode', '', '')); /* gf_LocaleTrans('default', 'titAcdmcrSeCode') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('최종학력여부', '90', 'center', 'str', 'ra', false, 'lastAcdmcrAt', '', '')); /* gf_LocaleTrans('default', 'titLastAcdmcrAt') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('야간여부', '60', 'center', 'str', 'ch', false, 'dghtSeAt', '', '')); /* gf_LocaleTrans('default', 'titDghtSeAt') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('첨부파일', '60', 'center', 'str', 'button1', false, 'grdtnFilenoEdit', '', '')); /* gf_LocaleTrans('default', 'titGrdtnFileno') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('첨부파일', '60', 'center', 'str', 'ro', true, 'grdtnFileno', '', '')); /* gf_LocaleTrans('default', 'titGrdtnFileno') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('비고', '200', 'left', 'str', 'ed', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsEmpAcdmcrListInfo.push(gf_MakeDhxGridHeader('순번', '100', 'center', 'str', 'ro', true, 'acdmcrSn', '', '')); /* gf_LocaleTrans('default', 'titAcdmcrSn') */
    
    dhxGridMhsEmpAcdmcr = gf_MakeDhxGrid('MhsEmpAcdmcrDataList', dhxGridMhsEmpAcdmcrListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)
    
    dhxGridMhsEmpAcdmcr.enableAutoWidth(true);
    dhxGridMhsEmpAcdmcr.enableEditEvents(true,false,false);  //(boolean click,boolean dblclick,boolean f2Key)
    dhxGridMhsEmpAcdmcr.setDateFormat("%Y-%m-%d");
    
	//학위코드(C022)
    var jsonParameter1 = {codekindCode : "C022",exceptCode :"",sortOrder :"asc" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, '');
    gf_ComboDataSet(dhxGridMhsEmpAcdmcr, dhxGridMhsEmpAcdmcr.getColIndexById("dgriCode"), dataSource1.data, "sel");
    //지역코드(공통코드:C079)
    var jsonParameter2 = {codekindCode : "C079",exceptCode :"",sortOrder :"asc" };
    var dataSource2 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter2, '');
    gf_ComboDataSet(dhxGridMhsEmpAcdmcr, dhxGridMhsEmpAcdmcr.getColIndexById("areaCode"), dataSource2.data, "sel");
	//졸업구분(공통코드:C287
    var jsonParameter3 = {codekindCode : "C287",exceptCode :"",sortOrder :"asc" };
    var dataSource3 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter3, '');
    gf_ComboDataSet(dhxGridMhsEmpAcdmcr, dhxGridMhsEmpAcdmcr.getColIndexById("grdtnSeCode"), dataSource3.data, "sel");
	//학력코드(공통코드C016)
    var jsonParameter4 = {codekindCode : "C016",exceptCode :"",sortOrder :"asc" };
    var dataSource4 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter4, '');
    gf_ComboDataSet(dhxGridMhsEmpAcdmcr, dhxGridMhsEmpAcdmcr.getColIndexById("acdmcrSeCode"), dataSource4.data, "sel");
	
    //dhxGridMhsEmpAcdmcr.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpAcdmcr.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    
    $("#saveFormEmp_Tab7_Acdmcr").validate({
        errorElement: 'div'
    });
};

var eventIdsMhsEmpAcdmcr = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpAcdmcr = gf_GridDetachEvent(dhxGridMhsEmpAcdmcr, eventIdsMhsEmpAcdmcr);
    
	eventId = dhxGridMhsEmpAcdmcr.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) {
        	//fn_ExcelMhshrm010();
        }
        else if(keyCode == 13 || keyCode == 9)  {   //ENTER , TAB
    		var selectedId = dhxGridMhsEmpAcdmcr.getSelectedRowId();
    		var ind        = dhxGridMhsEmpAcdmcr.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpAcdmcr.getRowIndex(selectedId);
    		dhxGridMhsEmpAcdmcr.selectCell(rowIndex, ind+1);
    		dhxGridMhsEmpAcdmcr.editCell();
    	} 
        else if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhsEmpAcdmcr.getSelectedRowId();
    		var ind        = dhxGridMhsEmpAcdmcr.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpAcdmcr.getRowIndex(selectedId);
    		dhxGridMhsEmpAcdmcr.selectCell(rowIndex+1, ind);
    		dhxGridMhsEmpAcdmcr.editCell();
    	} 
        else if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhsEmpAcdmcr.getSelectedRowId();
    		var ind        = dhxGridMhsEmpAcdmcr.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpAcdmcr.getRowIndex(selectedId);
    		dhxGridMhsEmpAcdmcr.selectCell(rowIndex-1, ind);
    		dhxGridMhsEmpAcdmcr.editCell();
    	}
        else return true;
    });
	eventIdsMhsEmpAcdmcr.push(eventId);
    
    eventId = dhxGridMhsEmpAcdmcr.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhsEmpAcdmcr, 'entschDe') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpAcdmcr, 'grdtnDe')) return false;		  
		return true;
    }); 
    eventIdsMhsEmpAcdmcr.push(eventId);
    
    eventId = dhxGridMhsEmpAcdmcr.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_Mhshrm001AcdmcrSortGridList(ind, type, direction);
    });
    eventIdsMhsEmpAcdmcr.push(eventId);
    
    var AcdmcrCalendarEventIds = [];
    eventId = dhxGridMhsEmpAcdmcr.attachEvent('onRowSelect', function(rid, cind) {
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpAcdmcr, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpAcdmcr, rid, 'entschDe', 'grid');	
    		var pos = dhxGridMhsEmpAcdmcr.getPosition(this.cell);    		
    		dhxGridMhsEmpAcdmcr._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpAcdmcr._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpAcdmcr._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpAcdmcr._grid_calendarA._show();    		
    		AcdmcrCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpAcdmcr._grid_calendarA, AcdmcrCalendarEventIds);    		
    		eventId = dhxGridMhsEmpAcdmcr._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rid, dhxGridMhsEmpAcdmcr._grid_calendarA.getDate() );
    		});
    		AcdmcrCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpAcdmcr, 'datePickerButtonE')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpAcdmcr, rid, 'grdtnDe', 'grid');	
    		var pos = dhxGridMhsEmpAcdmcr.getPosition(this.cell);    		
    		dhxGridMhsEmpAcdmcr._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpAcdmcr._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpAcdmcr._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpAcdmcr._grid_calendarA._show();    		
    		AcdmcrCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpAcdmcr._grid_calendarA, AcdmcrCalendarEventIds);    		
    		eventId = dhxGridMhsEmpAcdmcr._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateE( rid, dhxGridMhsEmpAcdmcr._grid_calendarA.getDate() );
    		});
    		AcdmcrCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpAcdmcr, 'button1')) {
    		//fn_FileUploadPopUpAcdmcrOutputs( rid );
    	}
    });
    eventIdsMhsEmpAcdmcr.push(eventId);
    
    // other event

    //btnAdd_Tab7
    $('#btnAdd_Tab7').unbind('click').bind('click', function(event){
    	dhxGridMhsEmpAcdmcr.clearSelection();
    	dhxGridMhsEmpAcdmcr.addRow(dhxGridMhsEmpAcdmcr.uid(),[0,'','','','','','','','','','','','','','','','','',gf_FormGetValue('saveFormEmp_Tab7_Acdmcr', 'empno', 'text'),0] , 0);
    	dhxGridMhsEmpAcdmcr.selectRow(0, false, false,true);

    	dhxGridMhsEmpAcdmcr.selectCell(0, 2);
    	dhxGridMhsEmpAcdmcr.editCell();
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpAcdmcrDataList'); 
    });
    //btnRemove_Tab7
    $('#btnRemove_Tab7').unbind('click').bind('click', function() {
        fn_RemoveMhshrm001Acdmcr();
    });
    //btnSave_Tab7
    $('#btnSave_Tab7').unbind('click').bind('click', function() {
    	if(fn_GridValidationMhshrm001Acdmcr()) {
    		dhxDataProcessorMhshrm001Acdmcr.sendData();
    	}
    });
    //초기화
    $('#btnInit_Tab7').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab7();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){
    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab7();
};
//조회
var fn_SearchMhshrb001Tab7 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab7_Acdmcr', 'empno', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab7_empno = empno;
	g_Tab7SearchValue.empno = empno;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab7_Acdmcr', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpTab7Acdmcr', jsonParameter, 'fn_CallbackSearchMhshrb001Tab7', false, 'GET');
    
    dhxDataProcessorMhshrm001Acdmcr = new dataProcessor("/xerp/mhshrb001/saveMhsEmpTab7Acdmcr"); //lock feed url
    dhxDataProcessorMhshrm001Acdmcr.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm001Acdmcr.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm001Acdmcr.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm001Acdmcr.init(dhxGridMhsEmpAcdmcr); //link dataprocessor to the grid
        
    dhxDataProcessorMhshrm001Acdmcr.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};   
    dhxDataProcessorMhshrm001Acdmcr.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    	if(dataSource.data.code == "999"){
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgExist'));
	 		return false;
    	}
    	else if (dataSource.code == "000" || dataSource.data.code !== "000"){
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    		fn_SearchMhshrb001Tab7();
    		return true;
	 	} else {
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	 		return false;
	 	}
    });  
    
    dhxDataProcessorMhshrm001Acdmcr.attachEvent("onValidationError",function(id,messages){
		gf_DivMsgAlert(messages.join("<br>"));      
		return false;
	});
};


var fn_CallbackSearchMhshrb001Tab7 = function (strSvcID, targetID, data){
	dhxGridMhsEmpAcdmcr.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpAcdmcr.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpAcdmcrDataList');
    	
    	dhxGridMhsEmpAcdmcr.selectCell(0,2);
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpAcdmcrDataList');
    	$('#btnAdd_Tab7').click();
    }
	$('#spanMhsEmpAcdmcrCnt').text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListener();
};
/**
 * 삭제
 */
var fn_RemoveMhshrm001Acdmcr = function() {
	var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpAcdmcr, 'selYn', 'empno');
    var acdmcrSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpAcdmcr, 'selYn', 'acdmcrSn');
    if(gf_IsNull(empnos) && gf_IsNull(acdmcrSns)) {
        gf_DivMsgAlert('삭제할 학력을 선택해 주세요.');  /* gf_LocaleTrans('default', 'titbsrpSeCode') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhshrm001AcdmcrSend()', '');
    }
};

var fn_RemoveMhshrm001AcdmcrSend = function() {
    var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpAcdmcr, 'selYn', 'empno');
    var acdmcrSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpAcdmcr, 'selYn', 'acdmcrSn');
    var jsonParameter = {
    		empnos : empnos.join(','),
    		acdmcrSns : acdmcrSns.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mhshrb001/removeMhsEmpTab7Acdmcr', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchMhshrb001Tab7();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_Mhshrm001AcdmcrSortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMhsEmpAcdmcr, 'num')){
	  	var sortOrder = gf_FormGetValue('saveFormEmp_Tab7_Acdmcr', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('saveFormEmp_Tab7_Acdmcr', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsEmpAcdmcr, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxGridMhsEmpAcdmcr.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('saveFormEmp_Tab7_Acdmcr', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab7_Acdmcr', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpAcdmcr, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxGridMhsEmpAcdmcr.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('saveFormEmp_Tab7_Acdmcr', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab7_Acdmcr', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpAcdmcr, ind), 'text');
	  	}
	  	else {
	  		dhxGridMhsEmpAcdmcr.setSortImgState(false);
	  		gf_FormSetValue('saveFormEmp_Tab7_Acdmcr', 'sortDirection', '', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab7_Acdmcr', 'sortColumId', '', 'text');
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
    		this.setCValue('<span class="glyphicon glyphicon glyphicon-download" style="cursor: pointer;" onclick="parent.fn_FileUploadPopUpIframeOutputs(\'' + val + '\', \'' + row_id + '\', 7 )"></span>'); 
    	//}
    }
}
eXcell_button1.prototype = new eXcell;// nests all other methods from the base class

var fn_FileUploadPopUpTabReturn = function(rid, rtnFileKey){
	//alert(rid);
	//alert(rtnFileKey);
	gf_DhxSetValue(dhxGridMhsEmpAcdmcr, rid, 'grdtnFileno', rtnFileKey, 'grid');
	gf_DhxSetValue(dhxGridMhsEmpAcdmcr, rid, 'grdtnFilenoEdit', rtnFileKey, 'grid');
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
		gf_DhxSetValue(dhxGridMhsEmpAcdmcr, rid, 'entschDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Acdmcr.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhsEmpAcdmcr, rid, 'grdtnDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Acdmcr.setUpdated(rid, true, 'updated');
	}	
}


var fn_ExcelMhshrb001Acdmcr = function () {
    var titMhshrb999 = '인사기본-학력'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab7_Acdmcr', 'empno', 'text')
    };

    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '순번' /* gf_LocaleTrans('default', 'titAcdmcrSn') */,
        '학교명' /* gf_LocaleTrans('default', 'titSchulNm') */,
        '입학일자' /* gf_LocaleTrans('default', 'titEntschDe') */,
        '졸업일자' /* gf_LocaleTrans('default', 'titGrdtnDe') */,
        '전공' /* gf_LocaleTrans('default', 'titMajorNm') */,
        '부전공' /* gf_LocaleTrans('default', 'titMinorNm') */,
        '학위코드' /* gf_LocaleTrans('default', 'titDgriCode') */,
        '지역코드' /* gf_LocaleTrans('default', 'titAreaCode') */,
        '졸업구분' /* gf_LocaleTrans('default', 'titGrdtnSeCode') */,
        '학력코드' /* gf_LocaleTrans('default', 'titAcdmcrSeCode') */,
        '최종학력여부' /* gf_LocaleTrans('default', 'titLastAcdmcrAt') */,
        '주야구분' /* gf_LocaleTrans('default', 'titDghtSeAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empno', 'acdmcrSn', 'schulNm', 'entschDe', 'grdtnDe', 'majorNm', 'minorNm', 'dgriCode', 'areaCode', 'grdtnSeCode', 'acdmcrSeCode', 'lastAcdmcrAt', 'dghtSeAt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsAcdmcr ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsAcdmcr;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/searchMhsEmpTab7Acdmcr', jsonParameter);
};

/* 그리드  Validation check */
var fn_GridValidationMhshrm001Acdmcr = function(){
	var valid = true;
	var checkCode;
	dhxGridMhsEmpAcdmcr.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Acdmcr.getState(rowId))) {
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpAcdmcr, rowId, 'schulNm', 'grid') )){
				if(valid){
					gf_DivMsgAlert("학교명은 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acdmcr(dhxGridMhsEmpAcdmcr, rowId, 'schulNm');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpAcdmcr, rowId, 'acdmcrSeCode', 'grid') )){
				if(valid){
					gf_DivMsgAlert("학력은 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Acdmcr(dhxGridMhsEmpAcdmcr, rowId, 'acdmcrSeCode');
				valid = false;
			}
			
			var endDate = gf_DhxGetValue(dhxGridMhsEmpAcdmcr, rowId, 'grdtnDe', 'grid');
			if(!gf_IsNull(endDate)){
				var startDate = gf_DhxGetValue(dhxGridMhsEmpAcdmcr, rowId, 'entschDe', 'grid');
				var startDateArr = startDate.split('-');
				var endDateArr = endDate.split('-');
	
				var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
				var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
				         
				if(startDateCompare.getTime() >= endDateCompare.getTime()) {
					if(valid){
						gf_DivMsgAlert("졸업일자가 입학일자보다 빠릅니다.");
					}
					fn_GridValidationSelectCellMhshrm001Acdmcr(dhxGridMhsEmpAcdmcr, rowId, 'grdtnDe');
					valid = false;
				}
			}
		}
    });
	return valid;	 
}
var fn_GridValidationSelectCellMhshrm001Acdmcr = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Acdmcr.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}
