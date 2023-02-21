/**
 *    프로그램       : 부서조직관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.21
 *    사용테이블      : MHS_DEPT_ORGNZT
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;

var g_userEmpNo;
var g_stmBizplcCode;
var dhxDataProcessorMhshrm005 = null;
var g_nowRid = null;
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm005();
    cf_SetComponentsMhshrm005();
    cf_SetEventListenerMhshrm005();
    cf_InitFormMhshrm005();
    cf_SetBindingMhshrm005();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMhshrm005 = function() {
	//세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    g_userEmpNo = userInfo.data.userEmpNo;
    g_stmBizplcCode = userInfo.data.bplcCode;
    gf_SetMenuPath();
    $('#saveFormMhshrm005').validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMhshrm005;
var cf_SetComponentsMhshrm005 = function() {
    var dhxGridMhshrm005HeaderInfo = [];
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm005" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('부서코드', '80', 'center', 'str', 'ro', false, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','button2',false,'button2',''));
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('부서명', '300', 'center', 'str', 'ro', false, 'deptKorNm', '', ''));
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('조직코드', '80', 'center', 'str', 'ro', false, 'orgnztCode', '', '')); /* gf_LocaleTrans('default', 'titOrgnztCode') */
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','button1',false,'button1',''));
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('조직명', '300', 'center', 'str', 'ro', false, 'orgnztNm', '', ''));
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '100', 'center', 'date', 'dhxCalendarA', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '100', 'center', 'date', 'dhxCalendarA', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('정렬순서', '*', 'center', 'int', 'edn', false, 'sortOrdr', '', '')); /* gf_LocaleTrans('default', 'titSortOrdr') */
    dhxGridMhshrm005HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '10', 'center', 'str', 'ro', true, 'regId', '', ''));
    dhxGridMhshrm005 = gf_MakeDhxGrid('dataListMhshrm005', dhxGridMhshrm005HeaderInfo, true, false, false);
    dhxGridMhshrm005.enableAutoWidth(true);
    dhxGridMhshrm005.enableEditEvents(true,false,false);
    dhxGridMhshrm005.setDateFormat("%Y-%m-%d");
    dhxGridMhshrm005.setNumberFormat("0,000", dhxGridMhshrm005.getColIndexById("sortOrdr"), ".", ",");
};

var eventIds = [];
var cf_SetEventListenerMhshrm005 = function() {
    // grid event
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMhshrm005, eventIds);
    
    eventId = dhxGridMhshrm005.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) {
        	fn_ExcelMhshrm005();
        }
        else if(keyCode == 13 || keyCode == 9)  {   //ENTER , TAB
    		var selectedId = dhxGridMhshrm005.getSelectedRowId();
    		var ind        = dhxGridMhshrm005.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhshrm005.getRowIndex(selectedId);
    		dhxGridMhshrm005.selectCell(rowIndex, ind+1);
    		dhxGridMhshrm005.editCell();
    	} 
        else if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhshrm005.getSelectedRowId();
    		var ind        = dhxGridMhshrm005.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhshrm005.getRowIndex(selectedId);
    		dhxGridMhshrm005.selectCell(rowIndex+1, ind);
    		dhxGridMhshrm005.editCell();
    	} 
        else if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhshrm005.getSelectedRowId();
    		var ind        = dhxGridMhshrm005.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhshrm005.getRowIndex(selectedId);
    		dhxGridMhshrm005.selectCell(rowIndex-1, ind);
    		dhxGridMhshrm005.editCell();
    	}
        else return true;
    });
    eventIds.push(eventId);
    
    eventId = dhxGridMhshrm005.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm005, 'useEndDe') || cInd == gf_GetDhxGridColumId(dhxGridMhshrm005, 'useBeginDe')) { return false; }
    	
    	var sChk = gf_DhxGetValue(dhxGridMhshrm005, rId, 'regId', 'grid')
    	if(!gf_IsNull(sChk)){
    		if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm005, 'orgnztCode') || cInd == gf_GetDhxGridColumId(dhxGridMhshrm005, 'deptCode') || cInd == gf_GetDhxGridColumId(dhxGridMhshrm005, 'orgnztNm') || cInd == gf_GetDhxGridColumId(dhxGridMhshrm005, 'deptKorNm')) { return false; }
    	}
 	
		return true;		
	});
    eventIds.push(eventId);
    
    var calendarEventIds = [];
    eventId = dhxGridMhshrm005.attachEvent('onRowSelect', function(rid, cind) {
    	g_nowRid = null;
    	var sChk = gf_DhxGetValue(dhxGridMhshrm005, rid, 'regId', 'grid')
    	if(cind == gf_GetDhxGridColumId(dhxGridMhshrm005, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhshrm005, rid, 'useBeginDe', 'grid');
    		if(gf_IsNull(strGridDate)){
    			strGridDate = gf_Date2StrDisplayFormat(new Date());
    		}
    		var pos = dhxGridMhshrm005.getPosition(this.cell);    		
    		dhxGridMhshrm005._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhshrm005._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhshrm005._grid_calendarA.setDate(strGridDate);
    		dhxGridMhshrm005._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm005._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMhshrm005._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rid, dhxGridMhshrm005._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
    	else if(cind == gf_GetDhxGridColumId(dhxGridMhshrm005, 'datePickerButtonE')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhshrm005, rid, 'useEndDe', 'grid');
    		var strGridDateSt = gf_DhxGetValue(dhxGridMhshrm005, rid, 'useBeginDe', 'grid');
    		if(gf_IsNull(strGridDate)){
    			if(gf_IsNull(strGridDateSt)){
        			strGridDate = gf_Date2StrDisplayFormat(new Date());
        		}
    			else{
    				strGridDate = strGridDateSt;
    			}
    		}
    		var pos = dhxGridMhshrm005.getPosition(this.cell);    		
    		dhxGridMhshrm005._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhshrm005._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhshrm005._grid_calendarA.setDate(strGridDate);
    		dhxGridMhshrm005._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm005._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMhshrm005._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateE( rid, dhxGridMhshrm005._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
    	else if(cind == gf_GetDhxGridColumId(dhxGridMhshrm005, 'button1') && gf_IsNull(sChk)) {
    		fn_gridSearchOrgnztButton( rid );
    	}
    	else if(cind == gf_GetDhxGridColumId(dhxGridMhshrm005, 'button2') && gf_IsNull(sChk)) {
    		fn_gridSearchDeptButton( rid );
    	}
    });
    eventIds.push(eventId);
    
    eventId = dhxGridMhshrm005.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_Mhshrm005SortGridList(ind, type, direction);
    });
    eventIds.push(eventId);
    
    
    // button event
    $('#btnAddMhshrm005').unbind('click').bind('click', function(event){
    	dhxGridMhshrm005.clearSelection();
    	dhxGridMhshrm005.addRow(dhxGridMhshrm005.uid(),[0,'','','','','','','',gf_GetNowDate().format('YYYY-MM-DD'),'','','','1',0,''] , 0);
    	dhxGridMhshrm005.selectRow(0, false, false,true);

    	dhxGridMhshrm005.selectCell(0, 2);
    	dhxGridMhshrm005.editCell();
    	gf_NoFoundDataOnGridMsgRemove('dataListMhshrm005');
    });
    $('#btnSaveMhshrm005').unbind('click').bind('click', function() {
    	if(fn_GridValidation()) {
    		dhxDataProcessorMhshrm005.sendData();
    	}
    });
    $('#btnRemoveMhshrm005').unbind('click').bind('click', function() {
        fn_RemoveMhshrm005();
    });
    $('#btnSearchMhshrm005').unbind('click').bind('click', function(event){
        fn_SearchMhshrm005();
    });
    $('#btnResetMhshrm005').unbind('click').bind('click',function() {
        cf_InitFormMhshrm005();
    });
    
    //부서 선택 Popup
	$('#searchFormMhshrm005 #btnDeptCodeSearchSearchFormMhshrm005').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhshrm005","deptCodeSearchFormMhshrm005","deptCodeNmSearchFormMhshrm005", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCodeSearchFormMhshrm005').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
    });
	$('#deptCodeNmSearchFormMhshrm005').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
    });
    
    //조직 선택 Popup
	$('#searchFormMhshrm005 #btnOrgnztCodeSearchSearchFormMhshrm005').unbind('click').bind('click', function(event){
		gf_OrgnztPopup("searchFormMhshrm005","orgnztCodeSearchFormMhshrm005","orgnztCodeNmSearchFormMhshrm005", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//조직 입력 후 Enter 이벤트
	$('#orgnztCodeSearchFormMhshrm005').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpOrgnztCode();
	    }
    });
	$('#orgnztCodeNmSearchFormMhshrm005').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpOrgnztCode();
	    }
    });
	
    // other event
    $('#checkAllMhshrm005').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridMhshrm005, $('#checkAllMhshrm005').prop('checked'), 'selYn');
    });
    $('#orgnztCodeSearchFormMhshrm005').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMhshrm005').click(); event.preventDefault(); }
    });
    $('#deptCodeSearchFormMhshrm005').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMhshrm005').click(); event.preventDefault(); }
    });
};

var cf_InitFormMhshrm005 = function() {
    $('#searchFormMhshrm005').clearForm();
    gf_FormSetValue("searchFormMhshrm005", "useAt", "1", "combo"); 
};

var cf_SetBindingMhshrm005 = function() {
    fn_SearchMhshrm005();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMhshrm005', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMhshrm005', 'deptCodeNm', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : g_stmBizplcCode
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}
function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhshrm005', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhshrm005', 'deptCodeNm', data.deptKorNm, 'text');
    } 
    else {
    	//Popup 호출
    	gf_DeptPopup("searchFormMhshrm005","deptCodeSearchFormMhshrm005","deptCodeNm", g_stmBizplcCode, "Y", null);
    }
}

//--조직 입력 후 Enter 이벤트
function fn_SearchMhsEmpOrgnztCode(){
	var OrgnztCode = gf_FormGetValue('searchFormMhshrm005', 'orgnztCode', 'text');
	var OrgnztNm = gf_FormGetValue('searchFormMhshrm005', 'orgnztCodeNm', 'text');
	var jsonParameter = {
			orgnztCode : OrgnztCode,
			orgnztNm : OrgnztNm,
			useAt : '1',
			bplcCode : g_stmBizplcCode
	};
	gf_Transaction('', 'mhshrm003/searchMhshrm003Sub', jsonParameter, 'fn_CallbackSearchMhsEmpOrgnztCode', false, 'GET');
}
function fn_CallbackSearchMhsEmpOrgnztCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhshrm005', 'orgnztCode', data.orgnztCode, 'text');
   		gf_FormSetValue('searchFormMhshrm005', 'orgnztCodeNm', data.orgnztNm, 'text');
    } 
    else {
    	//Popup 호출
    	gf_OrgnztPopup("searchFormMhshrm005","orgnztCodeSearchFormMhshrm005","orgnztCodeNmSearchFormMhshrm005", g_stmBizplcCode, "Y", null);
    }
}

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_Mhshrm005SortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMhshrm005, 'num')){
	  	var sortOrder = gf_FormGetValue('searchFormMhshrm005', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('searchFormMhshrm005', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm005, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxGridMhshrm005.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('searchFormMhshrm005', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('searchFormMhshrm005', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm005, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxGridMhshrm005.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('searchFormMhshrm005', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('searchFormMhshrm005', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm005, ind), 'text');
	  	}
	  	else {
	  		dhxGridMhshrm005.setSortImgState(false);
	  		gf_FormSetValue('searchFormMhshrm005', 'sortDirection', '', 'text');
	  		gf_FormSetValue('searchFormMhshrm005', 'sortColumId', '', 'text');
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
    	this.setCValue('<span class="glyphicon glyphicon glyphicon-search"></span>');
    }
}
eXcell_button1.prototype = new eXcell;// nests all other methods from the base class

function eXcell_button2(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue=function(val){
    	this.setCValue('<span class="glyphicon glyphicon glyphicon-search"></span>');
    }
}
eXcell_button2.prototype = new eXcell;// nests all other methods from the base class

//그리드에서 부서 조회
var fn_gridSearchDeptButton = function(rid){
	g_nowRid = rid;
	gf_DeptPopup("","","", g_stmBizplcCode, "Y", "fn_CallbackGridSearchDeptButton");
}
var fn_CallbackGridSearchDeptButton = function(){
	if($deptInfo.deptCode){
		gf_DhxSetValue(dhxGridMhshrm005, g_nowRid, 'deptCode', $deptInfo.deptCode, 'grid');
		gf_DhxSetValue(dhxGridMhshrm005, g_nowRid, 'deptKorNm', $deptInfo.deptKorNm, 'grid');
	}
}
//그리드에서 조직 조회
var fn_gridSearchOrgnztButton = function(rid){
	g_nowRid = rid;
	gf_OrgnztPopup("","","", g_stmBizplcCode, "Y", "fn_CallbackGridSearchOrgnztButton");
}
var fn_CallbackGridSearchOrgnztButton = function(){
	if($orgnztInfo.orgnztCode){
		gf_DhxSetValue(dhxGridMhshrm005, g_nowRid, 'orgnztCode', $orgnztInfo.orgnztCode, 'grid');
		gf_DhxSetValue(dhxGridMhshrm005, g_nowRid, 'orgnztNm', $orgnztInfo.orgnztNm, 'grid');
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
		gf_DhxSetValue(dhxGridMhshrm005, rid, 'useBeginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm005.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhshrm005, rid, 'useEndDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm005.setUpdated(rid, true, 'updated');
	}	
}

/**
 * 조회
 */
var fn_SearchMhshrm005 = function(key) {
    var jsonParameter = {
        orgnztCode : gf_FormGetValue('searchFormMhshrm005', 'orgnztCode', 'text'),
        orgnztNm : gf_FormGetValue('searchFormMhshrm005', 'orgnztCodeNm', 'text'),
        deptCode : gf_FormGetValue('searchFormMhshrm005', 'deptCode', 'text'),
        deptKorNm : gf_FormGetValue('searchFormMhshrm005', 'deptCodeNm', 'text'),
    	useAt :   gf_FormGetValue('searchFormMhshrm005', 'useAt', 'combo')
    };
    gf_Transaction(key, 'mhshrm005/searchMhshrm005', jsonParameter, 'fn_CallbackSearchMhshrm005', false, 'GET');
    
    dhxDataProcessorMhshrm005 = new dataProcessor("/xerp/mhshrm005/saveMhshrm005"); //lock feed url
    dhxDataProcessorMhshrm005.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm005.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm005.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm005.init(dhxGridMhshrm005); //link dataprocessor to the grid
        
    dhxDataProcessorMhshrm005.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};   
    dhxDataProcessorMhshrm005.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    	if(dataSource.data.code == "999"){
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgExist'));
	 		return false;
    	}
    	else if(dataSource.data.code == "888"){
	 		gf_DivMsgAlert("부서코드가 존재하지 않습니다.");
	 		return false;
    	}
    	else if(dataSource.data.code == "777"){
	 		gf_DivMsgAlert("조직코드가 존재하지 않습니다.");
	 		return false;
    	}
    	else if (dataSource.code == "000" || dataSource.data.code !== "000"){
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    		fn_SearchMhshrm003();
    		return true;
	 	} else {
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	 		return false;
	 	}
    });  
    
    dhxDataProcessorMhshrm005.attachEvent("onValidationError",function(id,messages){
		gf_DivMsgAlert(messages.join("<br>"));      
		return false;
	});
};
//조회 완료 이벤트
var fn_CallbackSearchMhshrm005 = function(strSvcID, targetID, data) {
    dhxGridMhshrm005.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhshrm005');
        dhxGridMhshrm005.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
            var findCell = dhxGridMhshrm005.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMhshrm005,'orgnztCode,deptCode'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridMhshrm005.selectRowById(findCell[0][0]);
            } else {
                dhxGridMhshrm005.selectRow(0);
            }
        } else {
            dhxGridMhshrm005.selectRow(0);
        }
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhshrm005');
        $('#btnAddMhshrm005').click();
    }
    $('#spanCntMhshrm005').text(data.data.records.length);
    cf_SetEventListenerMhshrm005();
};
/**
 * 삭제
 */
var fn_RemoveMhshrm005 = function() {
    var orgnztCodes = gf_GetCheckedGridValueArr(dhxGridMhshrm005, 'selYn', 'orgnztCode');
    var deptCodes = gf_GetCheckedGridValueArr(dhxGridMhshrm005, 'selYn', 'deptCode');
    if(gf_IsNull(orgnztCodes) && gf_IsNull(deptCodes)) {
        gf_DivMsgAlert('삭제할 부서조직코드를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titorgnztCode') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhshrm005Send()', '');
    }
};

var fn_RemoveMhshrm005Send = function() {
    var orgnztCodes = gf_GetCheckedGridValueArr(dhxGridMhshrm005, 'selYn', 'orgnztCode');
    var deptCodes = gf_GetCheckedGridValueArr(dhxGridMhshrm005, 'selYn', 'deptCode');
    var jsonParameter = {
        orgnztCodes : orgnztCodes.join(','),
        deptCodes : deptCodes.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mhshrm005/removeMhshrm005', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchMhshrm005();
    } else {
    	if(dataSource.data.code && dataSource.data.code == '999'){
        	alert(dataSource.data.msg + " 테이블에 정보가 있어서 삭제가 불가합니다.");
        }
        else {
        	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
        }
    }
};
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrm005 = function () {
    var titMhshrm005 = '부서조직관리'; /* gf_LocaleTrans('default', 'titMhshrm005') */
    var jsonParameter = {
    		orgnztCode : gf_FormGetValue('searchFormMhshrm005', 'orgnztCode', 'text'),
            deptCode : gf_FormGetValue('searchFormMhshrm005', 'deptCode', 'text'),
        	useAt :   gf_FormGetValue('searchFormMhshrm005', 'useAt', 'combo')
    };
    var header = [[
        '부서코드' /* gf_LocaleTrans('default', 'titDeptCode') */,
        '부서명',
        '조직코드' /* gf_LocaleTrans('default', 'titOrgnztCode') */,
        '조직명',
        '사용시작일자' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일자' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '정렬순서' /* gf_LocaleTrans('default', 'titSortOrdr') */
    ]];
    var dataId = [[ 'deptCode', 'deptKorNm', 'orgnztCode', 'orgnztNm', 'useBeginDe', 'useEndDe', 'useAt', 'sortOrdr' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm005 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm005;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm005/excelMhshrm005', jsonParameter);
};

/* 그리드  Validation check */
var fn_GridValidation = function(){
	var valid = true;
	var checkCode;
	dhxGridMhshrm005.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm005.getState(rowId))) {
			var sDeptCode = gf_DhxGetValue(dhxGridMhshrm005, rowId, 'deptCode', 'grid');
			if(!gv_ValidateMethods.required( sDeptCode )){
				if(valid){
					gf_DivMsgAlert("부서코드는 필수항목 입니다.");
				}
				fn_GridValidationSelectCell(dhxGridMhshrm005, rowId, 'deptCode');
				valid = false;
			}
			if(sDeptCode.length != 4){
				if(valid){
					gf_DivMsgAlert("부서코드 길이는 4자리 입니다.");
				}
				fn_GridValidationSelectCell(dhxGridMhshrm005, rowId, 'deptCode');
				valid = false;
			}
			
			var sOrgnztCode = gf_DhxGetValue(dhxGridMhshrm005, rowId, 'orgnztCode', 'grid');
			if(!gv_ValidateMethods.required( sOrgnztCode )){
				gf_DivMsgAlert("조직코드는 필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridMhshrm005, rowId, 'orgnztCode');
				valid = false;
			}
			if(sOrgnztCode.length != 5){
				if(valid){
					gf_DivMsgAlert("조직코드 길이는 5자리 입니다.");
				}
				fn_GridValidationSelectCell(dhxGridMhshrm005, rowId, 'orgnztCode');
				valid = false;
			}
			if(sOrgnztCode == '00000'){
				if(valid){
					gf_DivMsgAlert("조직코드에 00000은 사용 할 수 없습니다.");
				}
				fn_GridValidationSelectCell(dhxGridMhshrm005, rowId, 'orgnztCode');
				valid = false;
			}

			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhshrm005, rowId, 'useBeginDe', 'grid') )){
				if(valid){
					gf_DivMsgAlert("사용시작일자는  필수항목 입니다.");
				}
				fn_GridValidationSelectCell(dhxGridMhshrm005, rowId, 'useBeginDe');
				valid = false;
			}
			var endDate = gf_DhxGetValue(dhxGridMhshrm005, rowId, 'useEndDe', 'grid');
			if(!gf_IsNull(endDate)){
				var startDate = gf_DhxGetValue(dhxGridMhshrm005, rowId, 'useBeginDe', 'grid');
				var startDateArr = startDate.split('-');
				var endDateArr = endDate.split('-');
	
				var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
				var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
				         
				if(startDateCompare.getTime() > endDateCompare.getTime()) {
					if(valid){
						gf_DivMsgAlert("사용시작일자와 사용종료일자를 확인해 주세요.");
					}
					fn_GridValidationSelectCell(dhxGridMhshrm005, rowId, 'useEndDe');
					valid = false;
				}
			}
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhshrm005, rowId, 'sortOrdr', 'grid') )){
				if(valid){
					gf_DivMsgAlert("정렬순서는 필수항목 입니다.");
				}
				fn_GridValidationSelectCell(dhxGridMhshrm005, rowId, 'sortOrdr');
				valid = false;
			}
			if((gf_DhxGetValue(dhxGridMhshrm005, rowId, 'sortOrdr', 'grid')) <= 0 ){
				if(valid){
					gf_DivMsgAlert("정렬순서는 0보다  큰값을 입력하세요.");
				}
				fn_GridValidationSelectCell(dhxGridMhshrm003, rowId, 'grad1Psncpa');
				valid = false;
			}
		}
    });
	return valid;	 
}

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm005.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}
