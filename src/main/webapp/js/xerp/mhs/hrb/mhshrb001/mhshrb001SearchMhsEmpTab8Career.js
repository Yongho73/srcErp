/**
 * 프로그램 : 인사기본 화면 중 Tab8(경력) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.04.23
 * 사용테이블 : MHS_DSCPL
 **/

var tab8_empno = '';

var titMhsCareer = gf_LocaleTrans('default','titMhsCareer');

var g_Tab8SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpCareer;  //GRID

var dhxDataProcessorMhshrm001Career = null;
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

    var dhxGridMhsEmpCareerListInfo = [];
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'cntr', false, 'num', '','')); // 번호  //(header, width, align, sort, type, hidden, id, attach, valid)
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrb000" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('경력시작일자', '80', 'center', 'date', 'dhxCalendarA', false, 'careerBeginDe', '', '')); /* gf_LocaleTrans('default', 'titCareerBeginDe') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('경력종료일자', '80', 'center', 'date', 'dhxCalendarA', false, 'careerEndDe', '', '')); /* gf_LocaleTrans('default', 'titCareerEndDe') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('전직장명칭', '200', 'center', 'str', 'ed', false, 'wrcNm', '', '')); /* gf_LocaleTrans('default', 'titWrcNm') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('부서명', '100', 'center', 'str', 'ed', false, 'careerDeptNm', '', '')); /* gf_LocaleTrans('default', 'titCareerDeptNm') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('직위', '100', 'center', 'str', 'ed', false, 'careerOfcpsNm', '', '')); /* gf_LocaleTrans('default', 'titCareerOfcpsNm') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('담당업무', '200', 'center', 'str', 'ed', false, 'careerJobDtls', '', '')); /* gf_LocaleTrans('default', 'titCareerJobDtls') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('경력사원\n구분', '80', 'center', 'str', 'ed', false, 'careerEmplSe', '', '')); /* gf_LocaleTrans('default', 'titCareerEmplSe') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('퇴직사유', '150', 'left', 'str', 'ed', false, 'retireDtls', '', '')); /* gf_LocaleTrans('default', 'titRetireDtls') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('경력구분', '90', 'center', 'str', 'ed', false, 'careerSe', '', '')); /* gf_LocaleTrans('default', 'titCareerSe') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('경력인정\n여부', '80', 'center', 'str', 'ch', false, 'careerRecogAt', '', '')); /* gf_LocaleTrans('default', 'titCareerRecogAt') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('경력인정\n비율', '80', 'center', 'int', 'edn', false, 'recogRt', '', '')); /* gf_LocaleTrans('default', 'titRecogRt') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('경력인정\n월수', '80', 'center', 'int', 'edn', false, 'recogMcnt', '', '')); /* gf_LocaleTrans('default', 'titRecogMcnt') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('비고', '200', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('첨부파일', '60', 'center', 'str', 'button1', false, 'atchmnflnoEdit', '', '')); /* gf_LocaleTrans('default', 'titGrdtnFileno') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('첨부파일', '10', 'center', 'str', 'ro', true, 'atchmnflno', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflno') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('사원번호', '10', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsEmpCareerListInfo.push(gf_MakeDhxGridHeader('순번', '10', 'center', 'str', 'ro', true, 'careerSn', '', '')); /* gf_LocaleTrans('default', 'titCareerSn') */
    
    dhxGridMhsEmpCareer = gf_MakeDhxGrid('MhsEmpCareerDataList', dhxGridMhsEmpCareerListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)
    
    dhxGridMhsEmpCareer.enableAutoWidth(true);
    dhxGridMhsEmpCareer.enableEditEvents(true,false,false);  //(boolean click,boolean dblclick,boolean f2Key)
    dhxGridMhsEmpCareer.setDateFormat("%Y-%m-%d");
    
    //dhxGridMhsEmpCareer.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpCareer.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    
    $("#saveFormEmp_Tab8_Career").validate({
        errorElement: 'div'
    });
};

var eventIdsMhsEmpCareer = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpCareer = gf_GridDetachEvent(dhxGridMhsEmpCareer, eventIdsMhsEmpCareer);
    
	eventId = dhxGridMhsEmpCareer.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) {
        	//fn_ExcelMhshrm010();
        }
        else if(keyCode == 13 || keyCode == 9)  {   //ENTER , TAB
    		var selectedId = dhxGridMhsEmpCareer.getSelectedRowId();
    		var ind        = dhxGridMhsEmpCareer.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpCareer.getRowIndex(selectedId);
    		dhxGridMhsEmpCareer.selectCell(rowIndex, ind+1);
    		dhxGridMhsEmpCareer.editCell();
    	} 
        else if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhsEmpCareer.getSelectedRowId();
    		var ind        = dhxGridMhsEmpCareer.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpCareer.getRowIndex(selectedId);
    		dhxGridMhsEmpCareer.selectCell(rowIndex+1, ind);
    		dhxGridMhsEmpCareer.editCell();
    	} 
        else if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhsEmpCareer.getSelectedRowId();
    		var ind        = dhxGridMhsEmpCareer.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpCareer.getRowIndex(selectedId);
    		dhxGridMhsEmpCareer.selectCell(rowIndex-1, ind);
    		dhxGridMhsEmpCareer.editCell();
    	}
        else return true;
    });
	eventIdsMhsEmpCareer.push(eventId);
    
    eventId = dhxGridMhsEmpCareer.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhsEmpCareer, 'careerBeginDe') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpCareer, 'careerEndDe')) return false;		  
		return true;
    }); 
    eventIdsMhsEmpCareer.push(eventId);
    
    eventId = dhxGridMhsEmpCareer.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_Mhshrm001CareerSortGridList(ind, type, direction);
    });
    eventIdsMhsEmpCareer.push(eventId);
    
    var CareerCalendarEventIds = [];
    eventId = dhxGridMhsEmpCareer.attachEvent('onRowSelect', function(rid, cind) {
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpCareer, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpCareer, rid, 'careerBeginDe', 'grid');	
    		var pos = dhxGridMhsEmpCareer.getPosition(this.cell);    		
    		dhxGridMhsEmpCareer._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpCareer._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpCareer._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpCareer._grid_calendarA._show();    		
    		CareerCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpCareer._grid_calendarA, CareerCalendarEventIds);    		
    		eventId = dhxGridMhsEmpCareer._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rid, dhxGridMhsEmpCareer._grid_calendarA.getDate() );
    		});
    		CareerCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpCareer, 'datePickerButtonE')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpCareer, rid, 'careerEndDe', 'grid');	
    		var pos = dhxGridMhsEmpCareer.getPosition(this.cell);    		
    		dhxGridMhsEmpCareer._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpCareer._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpCareer._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpCareer._grid_calendarA._show();    		
    		CareerCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpCareer._grid_calendarA, CareerCalendarEventIds);    		
    		eventId = dhxGridMhsEmpCareer._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateE( rid, dhxGridMhsEmpCareer._grid_calendarA.getDate() );
    		});
    		CareerCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpCareer, 'button1')) {
    		//fn_FileUploadPopUpAcdmcrOutputs( rid );
    	}
    });
    eventIdsMhsEmpCareer.push(eventId);
    
    // other event

    //btnAdd_Tab8
    $('#btnAdd_Tab8').unbind('click').bind('click', function(event){
    	dhxGridMhsEmpCareer.clearSelection();
    	dhxGridMhsEmpCareer.addRow(dhxGridMhsEmpCareer.uid(),[0,'','','','','','','','','','','','','','','','','','',gf_FormGetValue('saveFormEmp_Tab8_Career', 'empno', 'text'),0] , 0);
    	dhxGridMhsEmpCareer.selectRow(0, false, false,true);

    	dhxGridMhsEmpCareer.selectCell(0, 2);
    	dhxGridMhsEmpCareer.editCell();
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpCareerDataList'); 
    });
    //btnRemove_Tab8
    $('#btnRemove_Tab8').unbind('click').bind('click', function() {
        fn_RemoveMhshrm001Career();
    });
    //btnSave_Tab8
    $('#btnSave_Tab8').unbind('click').bind('click', function() {
    	if(fn_GridValidationMhshrm001Career()) {
    		dhxDataProcessorMhshrm001Career.sendData();
    	}
    });
    //초기화
    $('#btnInit_Tab8').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab8();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){
    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab8();
};
//조회
var fn_SearchMhshrb001Tab8 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab8_Career', 'empno', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab8_empno = empno;
	g_Tab8SearchValue.empno = empno;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab8_Career', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpTab8Career', jsonParameter, 'fn_CallbackSearchMhshrb001Tab8', false, 'GET');
    
    dhxDataProcessorMhshrm001Career = new dataProcessor("/xerp/mhshrb001/saveMhsEmpTab8Career"); //lock feed url
    dhxDataProcessorMhshrm001Career.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm001Career.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm001Career.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm001Career.init(dhxGridMhsEmpCareer); //link dataprocessor to the grid
        
    dhxDataProcessorMhshrm001Career.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};   
    dhxDataProcessorMhshrm001Career.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    	if(dataSource.data.code == "999"){
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgExist'));
	 		return false;
    	}
    	else if (dataSource.code == "000" || dataSource.data.code !== "000"){
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    		fn_SearchMhshrb001Tab8();
    		return true;
	 	} else {
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	 		return false;
	 	}
    });  
    
    dhxDataProcessorMhshrm001Career.attachEvent("onValidationError",function(id,messages){
		gf_DivMsgAlert(messages.join("<br>"));      
		return false;
	});
};


var fn_CallbackSearchMhshrb001Tab8 = function (strSvcID, targetID, data){
	dhxGridMhsEmpCareer.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpCareer.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpCareerDataList');
    	
    	dhxGridMhsEmpCareer.selectCell(0,2);
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpCareerDataList');
    	$('#btnAdd_Tab8').click();
    }
	$('#spanMhsEmpCareerCnt').text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListener();
};
/**
 * 삭제
 */
var fn_RemoveMhshrm001Career = function() {
	var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpCareer, 'selYn', 'empno');
    var careerSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpCareer, 'selYn', 'careerSn');
    if(gf_IsNull(empnos) && gf_IsNull(careerSns)) {
        gf_DivMsgAlert('삭제할 경력을 선택해 주세요.');  /* gf_LocaleTrans('default', 'titbsrpSeCode') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhshrm001CareerSend()', '');
    }
};

var fn_RemoveMhshrm001CareerSend = function() {
    var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpCareer, 'selYn', 'empno');
    var careerSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpCareer, 'selYn', 'careerSn');
    var jsonParameter = {
    		empnos : empnos.join(','),
    		careerSns : careerSns.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mhshrb001/removeMhsEmpTab8Career', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchMhshrb001Tab8();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_Mhshrm001CareerSortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMhsEmpCareer, 'num')){
	  	var sortOrder = gf_FormGetValue('saveFormEmp_Tab8_Career', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('saveFormEmp_Tab8_Career', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsEmpCareer, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxGridMhsEmpCareer.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('saveFormEmp_Tab8_Career', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab8_Career', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpCareer, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxGridMhsEmpCareer.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('saveFormEmp_Tab8_Career', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab8_Career', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpCareer, ind), 'text');
	  	}
	  	else {
	  		dhxGridMhsEmpCareer.setSortImgState(false);
	  		gf_FormSetValue('saveFormEmp_Tab8_Career', 'sortDirection', '', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab8_Career', 'sortColumId', '', 'text');
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
    		this.setCValue('<span class="glyphicon glyphicon glyphicon-download" style="cursor: pointer;" onclick="parent.fn_FileUploadPopUpIframeOutputs(\'' + val + '\', \'' + row_id + '\', 8 )"></span>'); 
    	//}
    }
}
eXcell_button1.prototype = new eXcell;// nests all other methods from the base class

var fn_FileUploadPopUpTabReturn = function(rid, rtnFileKey){
	//alert(rid);
	//alert(rtnFileKey);
	gf_DhxSetValue(dhxGridMhsEmpCareer, rid, 'atchmnflno', rtnFileKey, 'grid');
	gf_DhxSetValue(dhxGridMhsEmpCareer, rid, 'atchmnflnoEdit', rtnFileKey, 'grid');
	dhxDataProcessorMhshrm001Career.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhsEmpCareer, rid, 'careerBeginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Career.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhsEmpCareer, rid, 'careerEndDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Career.setUpdated(rid, true, 'updated');
	}	
}


var fn_ExcelMhshrb001Career = function () {
    var titMhshrb999 = '인사기본-경력'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab8_Career', 'empno', 'text')
    };

    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '순번' /* gf_LocaleTrans('default', 'titCareerSn') */,
        '경력시작일자' /* gf_LocaleTrans('default', 'titCareerBeginDe') */,
        '경력종료일' /* gf_LocaleTrans('default', 'titCareerEndDe') */,
        '전직장명칭' /* gf_LocaleTrans('default', 'titWrcNm') */,
        '부서명' /* gf_LocaleTrans('default', 'titCareerDeptNm') */,
        '직위명' /* gf_LocaleTrans('default', 'titCareerOfcpsNm') */,
        '담당업무' /* gf_LocaleTrans('default', 'titCareerJobDtls') */,
        '사원구분' /* gf_LocaleTrans('default', 'titCareerEmplSe') */,
        '퇴직사유' /* gf_LocaleTrans('default', 'titRetireDtls') */,
        '경력구분' /* gf_LocaleTrans('default', 'titCareerSe') */,
        '경력인정여부' /* gf_LocaleTrans('default', 'titCareerRecogAt') */,
        '경력인정비율' /* gf_LocaleTrans('default', 'titRecogRt') */,
        '경력인정월수' /* gf_LocaleTrans('default', 'titRecogMcnt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empno', 'careerSn', 'careerBeginDe', 'careerEndDe', 'wrcNm', 'careerDeptNm', 'careerOfcpsNm', 'careerJobDtls', 'careerEmplSe', 'retireDtls', 'careerSe', 'careerRecogAt', 'recogRt', 'recogMcnt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsCareer ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsCareer;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb001/searchMhsEmpTab8Career', jsonParameter);
};

/* 그리드  Validation check */
var fn_GridValidationMhshrm001Career = function(){
	var valid = true;
	var checkCode;
	dhxGridMhsEmpCareer.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Career.getState(rowId))) {

			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpCareer, rowId, 'careerBeginDe', 'grid') )){
				if(valid){
					gf_DivMsgAlert("경력시작일자는 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Career(dhxGridMhsEmpCareer, rowId, 'careerBeginDe');
				valid = false;
			}
			var endDate = gf_DhxGetValue(dhxGridMhsEmpCareer, rowId, 'careerEndDe', 'grid');
			if(!gf_IsNull(endDate)){
				var startDate = gf_DhxGetValue(dhxGridMhsEmpCareer, rowId, 'careerBeginDe', 'grid');
				var startDateArr = startDate.split('-');
				var endDateArr = endDate.split('-');
	
				var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
				var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
				         
				if(startDateCompare.getTime() > endDateCompare.getTime()) {
					if(valid){
						gf_DivMsgAlert("경력종료일자가 경력시작일자보다 빠릅니다.");
					}
					fn_GridValidationSelectCellMhshrm001Career(dhxGridMhsEmpCareer, rowId, 'careerEndDe');
					valid = false;
				}
			}
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpCareer, rowId, 'wrcNm', 'grid') )){
				if(valid){
					gf_DivMsgAlert("전직장명칭은 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Career(dhxGridMhsEmpCareer, rowId, 'wrcNm');
				valid = false;
			}
			
			if(valid && !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridMhsEmpCareer, rowId, 'recogRt', 'grid') )){
				if(valid){
					gf_DivMsgAlert("경력인정비율은 숫자만 입력 가능합니다.");
				}
				gf_DhxSetValue(dhxGridMhsEmpCareer, rowId, 'recogRt', '', 'grid');
				fn_GridValidationSelectCellMhshrm001Career(dhxGridMhsEmpCareer, rowId, 'recogRt');
				valid = false;
			}
			var sRecogRt = gf_DhxGetValue(dhxGridMhsEmpCareer, rowId, 'recogRt', 'grid');
			if(sRecogRt.length > 3){
				if(valid){
					gf_DivMsgAlert("경력인정비율 길이는 3자리를 넘지 못합니다.");
				}
				fn_GridValidationSelectCellMhshrm001Career(dhxGridMhsEmpCareer, rowId, 'recogRt');
				valid = false;
			}
			
			if(valid && !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridMhsEmpCareer, rowId, 'recogMcnt', 'grid') )){
				if(valid){
					gf_DivMsgAlert("경력인정월수는 숫자만 입력 가능합니다.");
				}
				gf_DhxSetValue(dhxGridMhsEmpCareer, rowId, 'recogMcnt', '', 'grid');
				fn_GridValidationSelectCellMhshrm001Career(dhxGridMhsEmpCareer, rowId, 'recogMcnt');
				valid = false;
			}
			var sRecogRt = gf_DhxGetValue(dhxGridMhsEmpCareer, rowId, 'recogMcnt', 'grid');
			if(sRecogRt.length > 3){
				if(valid){
					gf_DivMsgAlert("경력인정월수 길이는 3자리를 넘지 못합니다.");
				}
				fn_GridValidationSelectCellMhshrm001Career(dhxGridMhsEmpCareer, rowId, 'recogMcnt');
				valid = false;
			}
		}
    });
	return valid;	 
}
var fn_GridValidationSelectCellMhshrm001Career = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Career.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}
