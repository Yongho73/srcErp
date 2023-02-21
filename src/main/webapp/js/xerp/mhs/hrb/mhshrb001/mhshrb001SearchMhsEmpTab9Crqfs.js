/**
 * 프로그램 : 인사기본 화면 중 Tab9(자격) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.04.23
 * 사용테이블 : MHS_DSCPL
 **/

var tab9_empno = '';

var titMhsCrqfs = gf_LocaleTrans('default','titMhsCrqfs');

var g_Tab9SearchValue = new Object();  // 정보 최초 조회 값

var dhxGridMhsEmpCrqfs;  //GRID

var dhxDataProcessorMhshrm001Crqfs = null;
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

    var dhxGridMhsEmpCrqfsListInfo = [];
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrb000" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('자격증코드\n번호', '90', 'center', 'str', 'ro', false, 'crqfsCodeNo', '', '')); /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('#cspan', '40', 'center', 'str', 'button2', false, '', '', ''));
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('자격명', '200', 'left', 'str', 'ro', false, 'crqfsNm', '', '')); /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('취득일자', '90', 'center', 'date', 'dhxCalendarA', false, 'acqsDe', '', '')); /* gf_LocaleTrans('default', 'titAcqsDe') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('유효일자', '90', 'center', 'date', 'dhxCalendarA', false, 'validDe', '', '')); /* gf_LocaleTrans('default', 'titValidDe') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('자격증구분', '100', 'center', 'str', 'coro', false, 'crqfsSe', '', '')); /* gf_LocaleTrans('default', 'titCrqfsSe') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('국가공인\n자격여부', '100', 'center', 'str', 'ch', false, 'nationathriQualfAt', '', '')); /* gf_LocaleTrans('default', 'titNationathriQualfAt') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('면허고유번호', '100', 'center', 'str', 'ed', false, 'crqfsNo', '', '')); /* gf_LocaleTrans('default', 'titCrqfsNo') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('발급기관', '100', 'center', 'str', 'ed', false, 'issuInsttNm', '', '')); /* gf_LocaleTrans('default', 'titIssuInsttNm') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('국내여부', '90', 'center', 'str', 'ch', false, 'dmstcAt', '', '')); /* gf_LocaleTrans('default', 'titDmstcAt') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('수당지급\n여부', '80', 'center', 'str', 'ch', false, 'allwncPymntAt', '', '')); /* gf_LocaleTrans('default', 'titAllwncPymntAt') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('자격수당\n금액', '100', 'right', 'int', 'edn', false, 'qualfAllwncAmt', '', '')); /* gf_LocaleTrans('default', 'titQualfAllwncAmt') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('인사평가\n반영여부', '80', 'center', 'str', 'ch', false, 'evlApplyAt', '', '')); /* gf_LocaleTrans('default', 'titEvlApplyAt') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('인정점수', '80', 'center', 'int', 'edn', false, 'recogScore', '', '')); /* gf_LocaleTrans('default', 'titRecogScore') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('비고', '200', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('첨부파일', '60', 'center', 'str', 'button1', false, 'atchmnflnoEdit', '', '')); /* gf_LocaleTrans('default', 'titGrdtnFileno') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('첨부파일', '10', 'center', 'str', 'ro', true, 'atchmnflno', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflno') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('사원번호', '10', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsEmpCrqfsListInfo.push(gf_MakeDhxGridHeader('순번', '10', 'center', 'str', 'ro', true, 'crqfsSn', '', '')); /* gf_LocaleTrans('default', 'titCrqfsSn') */
    
    dhxGridMhsEmpCrqfs = gf_MakeDhxGrid('MhsEmpCrqfsDataList', dhxGridMhsEmpCrqfsListInfo, true, false, false, false);  //(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr)
    
    dhxGridMhsEmpCrqfs.enableAutoWidth(true);
    dhxGridMhsEmpCrqfs.enableEditEvents(true,false,false);  //(boolean click,boolean dblclick,boolean f2Key)
    dhxGridMhsEmpCrqfs.setDateFormat("%Y-%m-%d");
    
    //dhxGridMhsEmpCrqfs.setColSorting("na,na,na,na,na,na,na,na,na,na,na,na,na,na,na");
    //dhxGridMhsEmpCrqfs.setNumberFormat("0,000", 2, ".", ",");  //(string mask,number cInd,string p_sep,string d_sep)
    
    var jsonParameter = {codekindCode : "C138",exceptCode :"",sortOrder :"asc" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhsEmpCrqfs, dhxGridMhsEmpCrqfs.getColIndexById("crqfsSe"), dataSource.data, "sel");
    
    $("#saveFormEmp_Tab9_Crqfs").validate({
        errorElement: 'div'
    });
};

var eventIdsMhsEmpCrqfs = [];
var cf_SetEventListener = function (){

	var eventId;
	eventIdsMhsEmpCrqfs = gf_GridDetachEvent(dhxGridMhsEmpCrqfs, eventIdsMhsEmpCrqfs);
    
	eventId = dhxGridMhsEmpCrqfs.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) {
        	//fn_ExcelMhshrm010();
        }
        else if(keyCode == 13 || keyCode == 9)  {   //ENTER , TAB
    		var selectedId = dhxGridMhsEmpCrqfs.getSelectedRowId();
    		var ind        = dhxGridMhsEmpCrqfs.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpCrqfs.getRowIndex(selectedId);
    		dhxGridMhsEmpCrqfs.selectCell(rowIndex, ind+1);
    		dhxGridMhsEmpCrqfs.editCell();
    	} 
        else if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhsEmpCrqfs.getSelectedRowId();
    		var ind        = dhxGridMhsEmpCrqfs.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpCrqfs.getRowIndex(selectedId);
    		dhxGridMhsEmpCrqfs.selectCell(rowIndex+1, ind);
    		dhxGridMhsEmpCrqfs.editCell();
    	} 
        else if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhsEmpCrqfs.getSelectedRowId();
    		var ind        = dhxGridMhsEmpCrqfs.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhsEmpCrqfs.getRowIndex(selectedId);
    		dhxGridMhsEmpCrqfs.selectCell(rowIndex-1, ind);
    		dhxGridMhsEmpCrqfs.editCell();
    	}
        else return true;
    });
	eventIdsMhsEmpCrqfs.push(eventId);
    
    eventId = dhxGridMhsEmpCrqfs.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhsEmpCrqfs, 'acqsDe') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpCrqfs, 'validDe') || cInd == gf_GetDhxGridColumId(dhxGridMhsEmpCrqfs, 'crqfsSe')) return false;		  
		return true;
    }); 
    eventIdsMhsEmpCrqfs.push(eventId);
    
    eventId = dhxGridMhsEmpCrqfs.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_Mhshrm001CrqfsSortGridList(ind, type, direction);
    });
    eventIdsMhsEmpCrqfs.push(eventId);
    
    var CareerCalendarEventIds = [];
    eventId = dhxGridMhsEmpCrqfs.attachEvent('onRowSelect', function(rid, cind) {
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpCrqfs, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpCrqfs, rid, 'acqsDe', 'grid');	
    		var pos = dhxGridMhsEmpCrqfs.getPosition(this.cell);    		
    		dhxGridMhsEmpCrqfs._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpCrqfs._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpCrqfs._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpCrqfs._grid_calendarA._show();    		
    		CareerCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpCrqfs._grid_calendarA, CareerCalendarEventIds);    		
    		eventId = dhxGridMhsEmpCrqfs._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rid, dhxGridMhsEmpCrqfs._grid_calendarA.getDate() );
    		});
    		CareerCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpCrqfs, 'datePickerButtonE')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhsEmpCrqfs, rid, 'validDe', 'grid');	
    		var pos = dhxGridMhsEmpCrqfs.getPosition(this.cell);    		
    		dhxGridMhsEmpCrqfs._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhsEmpCrqfs._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhsEmpCrqfs._grid_calendarA.setDate(strGridDate);
    		dhxGridMhsEmpCrqfs._grid_calendarA._show();    		
    		CareerCalendarEventIds = gf_GridDetachEvent(dhxGridMhsEmpCrqfs._grid_calendarA, CareerCalendarEventIds);    		
    		eventId = dhxGridMhsEmpCrqfs._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateE( rid, dhxGridMhsEmpCrqfs._grid_calendarA.getDate() );
    		});
    		CareerCalendarEventIds.push(eventId);    		
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpCrqfs, 'button1')) {
    		//fn_FileUploadPopUpAcdmcrOutputs( rid );
    	}
    	if(cind == gf_GetDhxGridColumId(dhxGridMhsEmpCrqfs, 'button2')) {
    		//fn_FileUploadPopUpAcdmcrOutputs( rid );
    	}
    });
    eventIdsMhsEmpCrqfs.push(eventId);
    
    // other event

    //btnAdd_Tab9
    $('#btnAdd_Tab9').unbind('click').bind('click', function(event){
    	dhxGridMhsEmpCrqfs.clearSelection();
    	dhxGridMhsEmpCrqfs.addRow(dhxGridMhsEmpCrqfs.uid(),[0,'','','','','','','','','','','','','','','','','','','','',gf_FormGetValue('saveFormEmp_Tab9_Crqfs', 'empno', 'text'),0] , 0);
    	dhxGridMhsEmpCrqfs.selectRow(0, false, false,true);

    	dhxGridMhsEmpCrqfs.selectCell(0, 2);
    	dhxGridMhsEmpCrqfs.editCell();
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpCrqfsDataList'); 
    });
    //btnRemove_Tab9
    $('#btnRemove_Tab9').unbind('click').bind('click', function() {
        fn_RemoveMhshrm001Crqfs();
    });
    //btnSave_Tab9
    $('#btnSave_Tab9').unbind('click').bind('click', function() {
    	if(fn_GridValidationMhshrm001Crqfs()) {
    		dhxDataProcessorMhshrm001Crqfs.sendData();
    	}
    });
    //초기화
    $('#btnInit_Tab9').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab9();
};

var cf_InitForm = function (){
	//
};

var cf_InitInputForm = function (){
    /*그리드라서 재조회 함*/
    fn_SearchMhshrb001Tab9();
};
//조회
var fn_SearchMhshrb001Tab9 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab9_Crqfs', 'empno', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab9_empno = empno;
	g_Tab9SearchValue.empno = empno;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab9_Crqfs', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpTab9Crqfs', jsonParameter, 'fn_CallbackSearchMhshrb001Tab9', false, 'GET');
    
    dhxDataProcessorMhshrm001Crqfs = new dataProcessor("/xerp/mhshrb001/saveMhsEmpTab9Crqfs"); //lock feed url
    dhxDataProcessorMhshrm001Crqfs.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm001Crqfs.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm001Crqfs.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm001Crqfs.init(dhxGridMhsEmpCrqfs); //link dataprocessor to the grid
        
    dhxDataProcessorMhshrm001Crqfs.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};   
    dhxDataProcessorMhshrm001Crqfs.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    	if(dataSource.data.code == "999"){
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgExist'));
	 		return false;
    	}
    	else if (dataSource.code == "000" || dataSource.data.code !== "000"){
    		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    		fn_SearchMhshrb001Tab9();
    		return true;
	 	} else {
	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	 		return false;
	 	}
    });  
    
    dhxDataProcessorMhshrm001Crqfs.attachEvent("onValidationError",function(id,messages){
		gf_DivMsgAlert(messages.join("<br>"));      
		return false;
	});
};


var fn_CallbackSearchMhshrb001Tab9 = function (strSvcID, targetID, data){
	dhxGridMhsEmpCrqfs.clearAll();
	
	if(!gf_IsNull(data.data.records)){
		dhxGridMhsEmpCrqfs.parse(data.data.records, 'js');
    	
    	gf_NoFoundDataOnGridMsgRemove('MhsEmpCrqfsDataList');
    	
    	dhxGridMhsEmpCrqfs.selectCell(0,2);
    } else {
    	gf_NoFoundDataOnGridMsg('MhsEmpCrqfsDataList');
    	$('#btnAdd_Tab9').click();
    }
	$('#spanMhsEmpCareerCnt').text(gf_NumberWithCommas(data.data.records.length));
    cf_SetEventListener();
};
/**
 * 삭제
 */
var fn_RemoveMhshrm001Crqfs = function() {
	var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpCrqfs, 'selYn', 'empno');
	var crqfsSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpCrqfs, 'selYn', 'crqfsSn');
    if(gf_IsNull(empnos) && gf_IsNull(crqfsSns)) {
        gf_DivMsgAlert('삭제할 자격을 선택해 주세요.');  /* gf_LocaleTrans('default', 'titbsrpSeCode') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhshrm001CrqfsSend()', '');
    }
};

var fn_RemoveMhshrm001CrqfsSend = function() {
    var empnos = gf_GetCheckedGridValueArr(dhxGridMhsEmpCrqfs, 'selYn', 'empno');
    var crqfsSns = gf_GetCheckedGridValueArr(dhxGridMhsEmpCrqfs, 'selYn', 'crqfsSn');
    var jsonParameter = {
    		empnos : empnos.join(','),
    		crqfsSns : crqfsSns.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mhshrb001/removeMhsEmpTab9Crqfs', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchMhshrb001Tab9();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_Mhshrm001CrqfsSortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMhsEmpCrqfs, 'num')){
	  	var sortOrder = gf_FormGetValue('saveFormEmp_Tab9_Crqfs', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('saveFormEmp_Tab9_Crqfs', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsEmpCrqfs, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxGridMhsEmpCrqfs.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('saveFormEmp_Tab9_Crqfs', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab9_Crqfs', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpCrqfs, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxGridMhsEmpCrqfs.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('saveFormEmp_Tab9_Crqfs', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab9_Crqfs', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmpCrqfs, ind), 'text');
	  	}
	  	else {
	  		dhxGridMhsEmpCrqfs.setSortImgState(false);
	  		gf_FormSetValue('saveFormEmp_Tab9_Crqfs', 'sortDirection', '', 'text');
	  		gf_FormSetValue('saveFormEmp_Tab9_Crqfs', 'sortColumId', '', 'text');
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
    		this.setCValue('<span class="glyphicon glyphicon glyphicon-download" style="cursor: pointer;" onclick="parent.fn_FileUploadPopUpIframeOutputs(\'' + val + '\', \'' + row_id + '\', 9 )"></span>'); 
    	//}
    }
}
eXcell_button1.prototype = new eXcell;// nests all other methods from the base class

var fn_FileUploadPopUpTabReturn = function(rid, rtnFileKey){
	//alert(rid);
	//alert(rtnFileKey);
	gf_DhxSetValue(dhxGridMhsEmpCrqfs, rid, 'atchmnflno', rtnFileKey, 'grid');
	gf_DhxSetValue(dhxGridMhsEmpCrqfs, rid, 'atchmnflnoEdit', rtnFileKey, 'grid');
	dhxDataProcessorMhshrm001Crqfs.setUpdated(rid, true, 'updated');
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
    		var get_val = gf_DhxGetValue(dhxGridMhsEmpCrqfs, row_id, 'crqfsCodeNo', 'grid');
    		this.setCValue('<span class="glyphicon glyphicon glyphicon-search" style="cursor: pointer;" onclick="parent.fn_tabGridSearchCrqfsButton(\'' + get_val + '\', \'' + row_id + '\', 9 )"></span>'); 
    	//}
    	//
    }
}
eXcell_button2.prototype = new eXcell;// nests all other methods from the base class

var fn_CallbackGridSearchCrqfsButtonReturn = function(rid, crqfsInfo){
	if(crqfsInfo.crqfsCodeNo){
		gf_DhxSetValue(dhxGridMhsEmpCrqfs, rid, 'crqfsCodeNo', crqfsInfo.crqfsCodeNo, 'grid');
		gf_DhxSetValue(dhxGridMhsEmpCrqfs, rid, 'crqfsNm', crqfsInfo.crqfsNm, 'grid');
		gf_DhxSetValue(dhxGridMhsEmpCrqfs, rid, 'crqfsSe', crqfsInfo.crqfsSe, 'grid');
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
		gf_DhxSetValue(dhxGridMhsEmpCrqfs, rid, 'acqsDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Crqfs.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhsEmpCrqfs, rid, 'validDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm001Crqfs.setUpdated(rid, true, 'updated');
	}	
}


var fn_ExcelMhshrb001Crqfs = function () {
    var titMhshrb999 = '인사기본-자격'; /* gf_LocaleTrans('default', 'titMhshrb999') */
    var jsonParameter = {
        empno : gf_FormGetValue('saveFormEmp_Tab9_Crqfs', 'empno', 'text')
    };

    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '순번' /* gf_LocaleTrans('default', 'titCrqfsSn') */,
        '자격증코드번호' /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */,
        '자격증명' /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */,
        '취득일자' /* gf_LocaleTrans('default', 'titAcqsDe') */,
        '유효일자' /* gf_LocaleTrans('default', 'titValidDe') */,
        '자격증구분' /* gf_LocaleTrans('default', 'titCrqfsSe') */,
        '국가공인자격여부' /* gf_LocaleTrans('default', 'titNationathriQualfAt') */,
        '면허고유번호' /* gf_LocaleTrans('default', 'titCrqfsNo') */,
        '발급기관' /* gf_LocaleTrans('default', 'titIssuInsttNm') */,
        '국내외구분' /* gf_LocaleTrans('default', 'titDmstcAt') */,
        '수당지급여부' /* gf_LocaleTrans('default', 'titAllwncPymntAt') */,
        '자격수당금액' /* gf_LocaleTrans('default', 'titQualfAllwncAmt') */,
        '인사평가반영여부' /* gf_LocaleTrans('default', 'titEvlApplyAt') */,
        '인정점수' /* gf_LocaleTrans('default', 'titRecogScore') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empno', 'crqfsSn', 'crqfsCodeNo', 'crqfsNm', 'acqsDe', 'validDe', 'crqfsSe', 'nationathriQualfAt', 'crqfsNo', 'issuInsttNm', 'dmstcAt', 'allwncPymntAt', 'qualfAllwncAmt', 'evlApplyAt', 'recogScore', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsCrqfs ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsCrqfs;
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
var fn_GridValidationMhshrm001Crqfs = function(){
	var valid = true;
	var checkCode;
	dhxGridMhsEmpCrqfs.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Crqfs.getState(rowId))) {
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'crqfsCodeNo', 'grid') )){
				if(valid){
					gf_DivMsgAlert("자격증코드번호는 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Crqfs(dhxGridMhsEmpCrqfs, rowId, 'crqfsCodeNo');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'crqfsSe', 'grid') )){
				if(valid){
					gf_DivMsgAlert("자격증구분은 필수항목 입니다.");
				}
				fn_GridValidationSelectCellMhshrm001Crqfs(dhxGridMhsEmpCrqfs, rowId, 'crqfsSe');
				valid = false;
			}
			
			var endDate = gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'validDe', 'grid');
			if(!gf_IsNull(endDate)){
				var startDate = gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'acqsDe', 'grid');
				var startDateArr = startDate.split('-');
				var endDateArr = endDate.split('-');
	
				var startDateCompare = new Date(startDateArr[0], parseInt(startDateArr[1])-1, startDateArr[2]);
				var endDateCompare = new Date(endDateArr[0], parseInt(endDateArr[1])-1, endDateArr[2]);
				         
				if(startDateCompare.getTime() > endDateCompare.getTime()) {
					if(valid){
						gf_DivMsgAlert("유효일자가 취득일자보다 빠릅니다.");
					}
					fn_GridValidationSelectCellMhshrm001Crqfs(dhxGridMhsEmpCrqfs, rowId, 'validDe');
					valid = false;
				}
			}
			
			if(valid && !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'qualfAllwncAmt', 'grid') )){
				if(valid){
					gf_DivMsgAlert("자격수당금액은 숫자만 입력 가능합니다.");
				}
				gf_DhxSetValue(dhxGridMhsEmpCrqfs, rowId, 'qualfAllwncAmt', '', 'grid');
				fn_GridValidationSelectCellMhshrm001Crqfs(dhxGridMhsEmpCrqfs, rowId, 'qualfAllwncAmt');
				valid = false;
			}
			if(valid && !gf_IsNull(gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'qualfAllwncAmt', 'grid')) && (gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'qualfAllwncAmt', 'grid')) <= 0 ){
				if(valid){
					gf_DivMsgAlert("자격수당금액은 0보다  큰값을 입력하세요.");
				}
				fn_GridValidationSelectCellMhshrm001Crqfs(dhxGridMhsEmpCrqfs, rowId, 'qualfAllwncAmt');
				valid = false;
			}
						
			if(valid && !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'recogScore', 'grid') )){
				if(valid){
					gf_DivMsgAlert("인정점수는 숫자만 입력 가능합니다.");
				}
				gf_DhxSetValue(dhxGridMhsEmpCrqfs, rowId, 'recogScore', '', 'grid');
				fn_GridValidationSelectCellMhshrm001Crqfs(dhxGridMhsEmpCrqfs, rowId, 'recogScore');
				valid = false;
			}
			if(valid && !gf_IsNull(gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'recogScore', 'grid')) && (gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'recogScore', 'grid')) <= 0 ){
				if(valid){
					gf_DivMsgAlert("인정점수는 0보다  큰값을 입력하세요.");
				}
				fn_GridValidationSelectCellMhshrm001Crqfs(dhxGridMhsEmpCrqfs, rowId, 'recogScore');
				valid = false;
			}
			if(valid && !gf_IsNull(gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'recogScore', 'grid')) && (gf_DhxGetValue(dhxGridMhsEmpCrqfs, rowId, 'recogScore', 'grid')) >= 10 ){
				if(valid){
					gf_DivMsgAlert("인정점수는 10보다  작은값을 입력하세요.");
				}
				fn_GridValidationSelectCellMhshrm001Crqfs(dhxGridMhsEmpCrqfs, rowId, 'recogScore');
				valid = false;
			}
		}
    });
	return valid;	 
}
var fn_GridValidationSelectCellMhshrm001Crqfs = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMhshrm001Crqfs.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}
