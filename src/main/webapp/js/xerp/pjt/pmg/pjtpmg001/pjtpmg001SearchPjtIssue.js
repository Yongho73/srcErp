/**
 * 프로그램 : 이슈관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.30
 * 사용테이블 : PJT_ISSUE
 **/

var fadeRegs = false; // 등록 화면 전환 플레그
var fadeMode = true;  // 수정 화면 전환 플레그
var modifyAt = true;  // 등록 수정 여부 플레그
var dhxDataProcessorIssue;

$(function() {
	cf_InitParamPjtIssue();
	cf_SetComponentsPjtIssue();
	cf_SetEventListenerPjtIssue();
    cf_SetBindingPjtIssue();
    cf_InitFormPjtIssue();
});

var cf_InitParamPjtIssue = function (){
	var dhtmlXCalendar = new dhtmlXCalendarObject([{input:"occrrncDeSaveFormPjtIssue", button:"startDateIcon"}, {input:"comptDeSaveFormPjtIssue", button:"startDateIcon"}]);
	dhtmlXCalendar.loadUserLanguage("ko");
	dhtmlXCalendar.hideTime(); 
	//$('#occrrncDeSaveFormPjtIssue').val(gf_GetNowDate().format('YYYY-MM-DD'));	
    $("#saveFormPjtIssue").validate({ errorElement: 'div', ignore: '' });
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormPjtIssue');   
};

var dhxGridPjtIssue;
var dhxGridPjtIssueact;
var cf_SetComponentsPjtIssue = function (){
	
	var dhxGridHeaderInfo = [];
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'), '30', 'center', 'int', 'edn', false, 'rnum', ''));
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('이슈구분', '80', 'center', 'str', 'coro', false, 'issueSe', ''));
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('이슈제목', '150', 'left', 'str', 'ro', false, 'issueNm', '')); 
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('관리자', '80', 'center', 'str', 'ro', false, 'issueMngrNm', '')); 
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('발생일자', '*', 'center', 'str', 'dateFormatro', false, 'occrrncDe', ''));
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('완료일자', '80', 'center', 'str', 'dateFormatro', true, 'comptDe', ''));	
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('projectSn', '100', 'center', 'str', 'ro', true, 'projectSn', ''));
	dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('issueSn', '100', 'center', 'str', 'ro', true, 'issueSn', ''));	
		
	dhxGridPjtIssue = gf_MakeDhxGrid('divDataListPjtIssue', dhxGridHeaderInfo, true, false, false);
	

	dhxGridPjtIssue.enableAutoWidth(false);
	dhxGridPjtIssue.setColumnMinWidth(80,4);
	dhxGridPjtIssue.adjustColumnSize(0);
	
    var jsonParameter = {codekindCode : "C162",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridPjtIssue, dhxGridPjtIssue.getColIndexById("issueSe"), dataSource.data); /* 그리드콤보*/

    /*dhxGridHeaderInfo = [];
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'), '40', 'center', 'ro', 'cntr', false, 'num', '', ''));
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPjtIssueact" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader("활동일시",'90','center','date','dhxCalendarA',false,'actDe','','NotEmpty'));
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButton',false,'datePickerButton','',''));
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader("활동자",'80','center','str','ro',false,'actorNm','','NotEmpty'));
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchEmpButton',false,'searchEmpButton','',''));
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('활동내용', '*', 'left', 'str', 'ed', false, 'actCn', '', 'NotEmpty'));   
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('projectSn', '100', 'left', 'str', 'ro', true, 'projectSn', '', '')); 
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('issueSn', '100', 'left', 'str', 'ro', true, 'issueSn', '', '')); 
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('actSn', '100', 'left', 'str', 'ro', true, 'actSn', '', ''));
    dhxGridHeaderInfo.push(gf_MakeDhxGridHeader('actor', '100', 'left', 'str', 'ro', true, 'actor', '', '')); 
    dhxGridPjtIssueact = gf_MakeDhxGrid('divDataListPjtIssueact', dhxGridHeaderInfo, true, false, false);
    dhxGridPjtIssueact.setDateFormat("%Y-%m-%d"); */
    
    
    
    
    
};

var eventIdsIssue = [];
var eventIdsIssueact = [];
var cf_SetEventListenerPjtIssue = function (){
	
	// issue grid event ========--------
	var eventId;
	eventIdsIssue = gf_GridDetachEvent(dhxGridPjtIssue, eventIdsIssue);	
    eventId = dhxGridPjtIssue.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬    	    	
    	fn_SortGridList(ind, type, direction);
    });
    eventIdsIssue.push(eventId);	
	eventId = dhxGridPjtIssue.attachEvent('onRowSelect',function(id, ind) {
		fn_SelecedGridListIssueact()
		$('#saveForm').show();
	});
	eventIdsIssue.push(eventId);
	// issue act grid event ========--------
	/*eventIdsIssueact = gf_GridDetachEvent(dhxGridPjtIssueact, eventIdsIssueact);	
	eventId = dhxGridPjtIssueact.attachEvent("onKeyPress",function(keyCode, ctrl, shift, event_object){    	
    	if(keyCode == 13)  {   //ENTER
    		var selectedId = dhxGridPjtIssueact.getSelectedRowId();
    		var ind        = dhxGridPjtIssueact.getSelectedCellIndex();
    		var rowIndex   = dhxGridPjtIssueact.getRowIndex(selectedId);
    		dhxGridPjtIssueact.selectCell(rowIndex, ind+1);
        	dhxGridPjtIssueact.editCell();
    	} else 
    	if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridPjtIssueact.getSelectedRowId();
    		var ind        = dhxGridPjtIssueact.getSelectedCellIndex();
    		var rowIndex   = dhxGridPjtIssueact.getRowIndex(selectedId);
    		dhxGridPjtIssueact.selectCell(rowIndex+1, ind);
        	dhxGridPjtIssueact.editCell();
    	} else 
    	if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridPjtIssueact.getSelectedRowId();
    		var ind        = dhxGridPjtIssueact.getSelectedCellIndex();
    		var rowIndex   = dhxGridPjtIssueact.getRowIndex(selectedId);
    		dhxGridPjtIssueact.selectCell(rowIndex-1, ind);
        	dhxGridPjtIssueact.editCell();
    	}
        else return true;
    });
	eventIdsIssueact.push(eventId);
	var calendarEventIds = [];
	eventId = dhxGridPjtIssueact.attachEvent("onRowSelect",function(rid, cind){    	
    	if(cind == gf_GetDhxGridColumId(dhxGridPjtIssueact, 'datePickerButton')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridPjtIssueact, rid, 'actDe', 'grid');	
    		var pos = dhxGridPjtIssueact.getPosition(this.cell);    		
    		dhxGridPjtIssueact._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridPjtIssueact._grid_calendarA.loadUserLanguage("ko");
    		dhxGridPjtIssueact._grid_calendarA.setDate(strGridDate);
    		dhxGridPjtIssueact._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridPjtIssueact._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridPjtIssueact._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDate( rid, dhxGridPjtIssueact._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	} else
    	if(cind == 5) { // actor
    		fn_gridSearchEmpButton( rid );
    	}		
    });
	eventIdsIssueact.push(eventId);	 
	eventId = dhxGridPjtIssueact.attachEvent("onEmptyClick", function(ev){		
		dhxGridPjtIssueact._grid_calendarA._hide();
	});
	eventIdsIssueact.push(eventId);
	eventId = dhxGridPjtIssueact.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
		if(cInd == gf_GetDhxGridColumId(dhxGridPjtIssueact, 'actDe')) return false;		  
		return true;		
	});
	eventIdsIssueact.push(eventId);
	*/
	
	
	
	
	// button event ========--------    
    $('#btnAddPjtIssue').unbind('click').bind('click', function(event){
    	gf_NoFoundDataOnGridMsgRemove('divDataListPjtIssue');
    	dhxGridPjtIssue.addRow(dhxGridPjtIssue.uid(),['','','','','','','',''],0);
    	dhxGridPjtIssue.selectRow(0);
    	fn_AddPjtIssueForm();
    	$('#saveForm').hide();
    });
    $('#btnSavePjtIssue').unbind('click').bind('click', function(){
    	//dhxDataProcessorIssue.sendData();
    	fn_SavePjtIssue();
    });
    $('#btnRemovePjtIssue').unbind('click').bind('click', function(event){ 
    	gf_errorMsgClear();
    	fn_RemovePjtIssueBefore();    	
    });
   /* $('#btnAddPjtIssueact').unbind('click').bind('click', function(event){    	
    	var selectedId = dhxGridPjtIssue.getSelectedRowId();
    	if(!gf_IsNull(selectedId)){
    		var issueSn = gf_DhxGetValue(dhxGridPjtIssue, selectedId, 'issueSn', 'grid');    	 
    		gf_NoFoundDataOnGridMsgRemove('divDataListPjtIssueact');
    		
    		void addRow(string|number new_id,string|number text, [string|number ind] );
    		---------------------------------------------------------------------------
    		new_id	string|number	행 ID는 고유해야합니다.
			text	string|number	행 값. 쉼표로 구분 된 목록 또는 배열 일 수 있음
			ind		string|number	새 행의 색인, 행은 기본적으로 마지막 위치에 추가됩니다 (선택 사항).(기본은 맨아래 row 생성)
    		
	    	dhxGridPjtIssueact.addRow('newRow_'+dhxGridPjtIssueact.uid(),[0,false,'','','','','',projectSn,issueSn,'',''],0);
	    	
	    	void selectRow(number|HTMLElement row,boolean fl,boolean preserve,boolean show);
	    	---------------------------------------------------------------------------
	    	row			number|HTMLElement	행 인덱스 또는 행 객체
			fl			boolean	true 인 경우 선택시 함수 호출 (선택 사항, 기본적으로 false)
			preserve	boolean	이전에 선택한 행을 유지합니다 (true / false) (기본적으로 false). 다중 선택 모드가 활성화되어 있어야합니다.
			show		boolean	true | false-표시 할 행 스크롤, 기본적으로 true
	    	
	    	dhxGridPjtIssueact.selectRow(0);
	    	dhxGridPjtIssueact.selectCell(0, gf_GetDhxGridColumId(dhxGridPjtIssueact,'actDe'));
	    	dhxGridPjtIssueact.editCell();
    	} else {
    		gf_DivMsgAlert("선택한 이슈가 없습니다.");
    	}
    });*/
    $('#btnRemovePjtIssueact').unbind('click').bind('click', function() {
    	fn_RemovPjtIssueact();    	
    });
    $('#btnSavePjtIssueact').unbind('click').bind('click', function() {
    	if(fn_GridValidation()) dhxDataProcessorPjtIssueact.sendData();    	
    });
    $('#pageingFormPjtIssue select[name="pageRowSize"]').unbind('change').bind('change', function() {
    	fn_SearchGridListPjtIssue(1);
    });
    $('#btnFileUploadSaveFormPjtIssue').unbind('click').bind('click', function() {
    	gf_FileUploadPopup(
				'', 	/* eventFunction */
				'', 	/* deleteBtnClassNm */
				'saveFormPjtIssue', 	/* viewDivId */
				'atchmnflSaveFormPjtIssue', 	/* dataDivId */
				[], 	/* keyArr */
				[], 	/* infoArr */
				0,
			    'all',
		        'fn_CallbackFileUploadSaveFormPjtIssue');
    	
    	//gf_Trace($('#saveFormPjtIssue').serialize());
    }); 
    $('#btnPopEmpSaveFormPjtIssue').unbind('click').bind('click', function() {
    	fn_PopEmpSaveFormPjtIssue();    	
    });    
    
    $('#issueActBtn').unbind('click').bind('click', function() {
    	var projectSn =  gf_FormGetValue('divSaveFormPjtIssue', 'projectSn', 'text');
    	var issueSn =  gf_FormGetValue('divSaveFormPjtIssue', 'issueSn', 'text');
    	fn_IssueActPopup(projectSn, issueSn);  	
    })
    
    $('body').off('click').on('click', '.issueactList', function() {
    	var actSn = $(this).attr('id');
    	var projectSn =  gf_FormGetValue('divSaveFormPjtIssue', 'projectSn', 'text');
    	var issueSn =  gf_FormGetValue('divSaveFormPjtIssue', 'issueSn', 'text');
    	fn_IssueActPopup(projectSn, issueSn, actSn);
    })
    
    

    
    
    // button event ========--------     
    $('#checkAllPjtIssue').unbind("click").bind("click",function() { fn_CheckAllGrid(dhxGridPjtIssue, $("#checkAllPjtIssue").prop("checked"), 'chk'); });
   // $('#checkAllPjtIssueact').unbind("click").bind("click",function() { fn_CheckAllGrid(dhxGridPjtIssueact, $("#checkAllPjtIssueact").prop("checked"), 'chk'); });
    $('#comptAtOrgSaveFormPjtIssue').unbind("click").bind("click",function() {
    	if($(this).prop('checked')) $('#comptAtSaveFormPjtIssue').val('1');
    	else $('#comptAtSaveFormPjtIssue').val('0');
    });
    $('#issueMngrSaveFormPjtIssue').unbind('click').bind('click', function(event){
    	fn_PopEmpSaveFormPjtIssue();
	});
};

var cf_SetBindingPjtIssue = function (){
	fn_SearchGridListPjtIssue();
};

var cf_InitFormPjtIssue = function (){
	$('#saveFormPjtIssue').resetForm();
	gf_FormSetValue('saveFormPjtIssue', 'projectSn', '', 'text');
	gf_FormSetValue('saveFormPjtIssue', 'issueSn', '', 'text');
	fn_ClearFileUploadSaveFormPjtIssue('saveFormPjtIssue', 'atchmnflSaveFormPjtIssue');
    
    document.getElementById('issueact').innerHTML= ''
   	 var divHtml  = " " ;

   	document.getElementById('issueact').innerHTML= divHtml;
   	$("#issueActDis").css("display", "none");
};
/**********************************************************그리드 정렬**************************************************************/
var fn_SortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridPjtIssue, 'rnum')){    		
    	var sortOrder = gf_FormGetValue('searchFormPjtIssue', 'sortDirection', 'text');
    	var sortColumId = gf_FormGetValue('searchFormPjtIssue', 'sortColumId', 'text');
    	var nowSortColumId = gf_GetDhxGridColum(dhxGridPjtIssue, ind);
    	// 정렬 컬럼이 바뀌면 정렬방식 초기화
    	if(sortColumId != nowSortColumId) sortOrder = '';	    	
    	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
    	if(sortOrder == 'desc' ) {
    		dhxGridPjtIssue.setSortImgState(true, ind, 'asc');
    		gf_FormSetValue('searchFormPjtIssue', 'sortDirection', 'asc', 'text');
    		gf_FormSetValue('searchFormPjtIssue', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtIssue, ind), 'text');
    	}  else {
    		dhxGridPjtIssue.setSortImgState(true, ind, 'desc');
    		gf_FormSetValue('searchFormPjtIssue', 'sortDirection', 'desc', 'text');
    		gf_FormSetValue('searchFormPjtIssue', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtIssue, ind), 'text');
    	}
    	fn_SearchGridListPjtIssue(gf_FormGetValue('searchFormPjtIssue', 'selectedPageNum', 'text'));
	}
}

var fn_InitGridSort = function(){
	dhxGridPjtIssue.setSortImgState(false);
	gf_FormSetValue('searchFormPjtIssue', 'sortDirection', '', 'text');
    gf_FormSetValue('searchFormPjtIssue', 'sortColumId', '', 'text');
}
/**********************************************************이슈들 조회**************************************************************/
var fn_SearchGridListPjtIssue = function (pageNum){
	//dhxGridPjtIssueact.clearAll();
    var jsonParameter = {
            projectSn : projectSn,
        sortDirection : gf_FormGetValue('searchFormPjtIssue', 'sortDirection', 'text'),
		  sortColumId : gf_FormGetValue('searchFormPjtIssue', 'sortColumId', 'text'),
    };
    gf_Transaction(jsonParameter, 'pjtpmg001/searchPjtIssue', jsonParameter, 'fn_CallbackSearchGridListPjtIssue', false, 'GET');
    
    dhxDataProcessorIssue = new dataProcessor("/xerp/pjtpmg001/removePjtIssue"); //lock feed url
    
    dhxDataProcessorIssue.setTransactionMode('POST',false);
    dhxDataProcessorIssue.setUpdateMode("off", false); 
    dhxDataProcessorIssue.init(dhxGridPjtIssue); //link dataprocessor to the grid
    
    dhxDataProcessorIssue.styles = {	
            updated:        "font-weight:normal;text-decoration:none;",
            inserted:       "font-weight:bold; color:green;",
            deleted:        "color:orange; text-decoration:line-through;",
            invalid:        "color:green; text-decoration:underline;",
            error:          "color:blue; text-decoration:underline;",
            clear:          "font-weight:normal;text-decoration:none;"
    };
    
};

var fn_CallbackSearchGridListPjtIssue = function (strSvcID, targetID, data){
	dhxGridPjtIssue.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridPjtIssue.parse(data.data.records, 'js');
    	dhxGridPjtIssue.selectRow(0);
    	fn_SelecedGridListIssueact();
    	gf_NoFoundDataOnGridMsgRemove('divDataListPjtIssue');
    	//gf_NoFoundDataOnGridMsgRemove('divDataListPjtIssueact');    	
    	// 정렬 컬럼이 있으면 정렬 상태 유지
    	var sortOrder = gf_FormGetValue('searchFormPjtIssue', 'sortDirection','text');
    	var sortColumId = gf_FormGetValue('searchFormPjtIssue', 'sortColumId','text');
    	if(!gf_IsNull(sortOrder) && !gf_IsNull(sortColumId)) {
    		dhxGridPjtIssue.setSortImgState(true, gf_GetDhxGridColumId(dhxGridPjtIssue, sortColumId), sortOrder);    		 
    	}
    } else {
    	gf_NoFoundDataOnGridMsg('divDataListPjtIssue');
    	//gf_NoFoundDataOnGridMsg('divDataListPjtIssueact');
    	//$('#btnAddPjtIssue').click();
    }
    $('#spanPjtIssueCnt').text(data.data.records.length);
    //$('#spanPjtIssueactCnt').text('0');
    // 페이징 버튼 생성
	gf_PageNate(data.data,'.paging','fn_SearchGridListPjtIssue');
	cf_SetEventListenerPjtIssue();
};

var fn_SearchGridListPjtIssueAct = function (){
	//dhxGridPjtIssueact.clearAll();
	
	var rowId = dhxGridPjtIssue.getSelectedRowId();
	
	var projectSn 	= dhxGridPjtIssue.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssue,'projectSn')).getValue();
    var issueSn 	= dhxGridPjtIssue.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssue,'issueSn')).getValue();;
    
	if(!gf_IsNull(issueSn)){

	    var jsonParameter = { projectSn : projectSn, issueSn : issueSn };
        
	    gf_Transaction('gridList', 'pjtpmg001/searchPjtIssueact', jsonParameter, 'fn_CallbackSearchGridListPjtIssueAct', false, 'GET');
	}
    
};

var fn_CallbackSearchGridListPjtIssueAct = function (strSvcID, targetID, data){
	var dataList=[];
	
	document.getElementById('issueact').innerHTML= ''
	 var divHtml  = "<table id = 'actListTable' style='border:0px'>" +
     				"<colgroup><col width='80' /> <col width='60' /><col width='*' /></colgroup> " ;

	if(data.data.records.length > 0) {
		for(var i = 0; i < data.data.records.length; i++) {
			divHtml += '<tr class="issueactList"  id ="' + data.data.records[i].actSn + '"><td>' + data.data.records[i].actDe + "</td>"
			divHtml += "<td>" + data.data.records[i].actorNm + "</td>";
			divHtml += "<td>" + data.data.records[i].actCn + "</td></tr>";
		}
	}
	divHtml += "</table>";
	
	document.getElementById('issueact').innerHTML= divHtml;

};

var fn_SelecedGridListIssueact = function () {
	modifyAt = true
	if(!fadeMode) {
		$('#saveFormPjtIssue').fadeOut(gv_FadeTime, function() {
			fn_SearchGridListPjtIssueact();
       	   	fadeMode = true;
       	   	fadeRegs = false;
        });
        $('#saveFormPjtIssue').fadeIn(gv_FadeTime, function() {});
	} else {
		fn_SearchGridListPjtIssueact();
	}
	fn_RemoveJqueryValidationMsg();
};
/**********************************************************이슈신규저장**************************************************************/
var fn_AddPjtIssueForm = function(){
	modifyAt = false;
	//dhxGridPjtIssue.clearSelection();
	if(!fadeRegs) {
		$('#saveFormPjtIssue').fadeOut(gv_FadeTime, function() {
			cf_InitFormPjtIssue();
			fadeRegs = true;
			fadeMode = false;
		});
		$('#saveFormPjtIssue').fadeIn(gv_FadeTime, function() {});
	} else {
		cf_InitFormPjtIssue();
	}
	fn_RemoveJqueryValidationMsg();
}

var fn_SavePjtIssue = function(){
	if($('#saveFormPjtIssue').validate().form()){		 
		gf_FormSetValue('saveFormPjtIssue','projectSn',projectSn,'text');		
		//gf_FormSetValue('saveFormPjtIssue','issueSn',issueSn,'text');	
    	if($('#comptAtOrgSaveFormPjtIssue').prop('checked')) {
    		gf_FormSetValue('saveFormPjtIssue','comptAt','1','text');    		
    	} else { 
    		gf_FormSetValue('saveFormPjtIssue','comptAt','0','text');
    	}	    
		gf_Transaction('save', 'pjtpmg001/savePjtIssue', $('#saveFormPjtIssue').serialize(), 'fn_CallbackSavePjtIssue', false, 'POST');
	}
}

var fn_CallbackSavePjtIssue = function (strSvcID, targetID, data){
	if(data.code === '000') {        
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    	fn_SearchGridListPjtIssue();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }    
};

var fn_RemoveJqueryValidationMsg = function(){
	$('#saveFormPjtIssue [id$="-error"]').remove();	
};

/**********************************************************이슈들 삭제**************************************************************/
var fn_RemovePjtIssueBefore = function(){	
	var rowId = dhxGridPjtIssue.getSelectedRowId();
	
	var projectSn 	= dhxGridPjtIssue.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssue,'projectSn')).getValue();
    var issueSn 	= dhxGridPjtIssue.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssue,'issueSn')).getValue();
	
    if(gf_IsNull(issueSn)){
		gf_DivMsgAlert('삭제할 이슈를 선택해 주세요.');
        return false;
	} else{
		gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePjtIssue()', '');
	}
};

var fn_RemovePjtIssue = function(){	
	var rowId = dhxGridPjtIssue.getSelectedRowId();
	
	var projectSn 	= dhxGridPjtIssue.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssue,'projectSn')).getValue();
    var issueSn 	= dhxGridPjtIssue.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssue,'issueSn')).getValue();
	
    var jsonParameter = { projectSn : projectSn, issueSn : issueSn };
	gf_Transaction(jsonParameter, 'pjtpmg001/removePjtIssue', jsonParameter, 'fn_CallbackRemovePjtIssue', false, 'POST');	
};

var fn_CallbackRemovePjtIssue = function (strSvcID, targetID, data){															
	if(data.code === '000') {
    	fn_SearchGridListPjtIssue();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }    
};
/**********************************************************활동들 조회**************************************************************/
var fn_SearchGridListPjtIssueact = function () {
	var rowId = dhxGridPjtIssue.getSelectedRowId();
	//dhxGridPjtIssueact.clearAll();
	fn_ClearFileUploadSaveFormPjtIssue('saveFormPjtIssue', 'atchmnflSaveFormPjtIssue');
	
    if (rowId > 0) {

	    var projectSn 	= dhxGridPjtIssue.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssue,'projectSn')).getValue();
	    var issueSn 	= dhxGridPjtIssue.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssue,'issueSn')).getValue();
	    
	    var findIssueData = gf_NoAsyncTransaction('pjtpmg001/findPjtIssue', {projectSn:projectSn, issueSn:issueSn}, 'GET');	    
	    var issueSe 	= findIssueData.data.issueSe;
	    var issueMngr   = findIssueData.data.issueMngr;
	    var issueMngrNm = findIssueData.data.issueMngrNm
	    var occrrncDe 	= findIssueData.data.occrrncDe;	    
	    var issueNm 	= findIssueData.data.issueNm;
	    var issueCn 	= findIssueData.data.issueCn;
	    var comptCn 	= findIssueData.data.comptCn;
	    var comptDe 	= findIssueData.data.comptDe;
	    var atchmnfl 	= findIssueData.data.atchmnfl;
	    var comptAt 	= findIssueData.data.comptAt;
	    var solutAltrv 	= findIssueData.data.solutAltrv;

	    gf_FormSetValue('saveFormPjtIssue','projectSn',projectSn,'text');
	    gf_FormSetValue('saveFormPjtIssue','issueSn',issueSn,'text');	    
	    gf_FormSetValue('saveFormPjtIssue','issueSe',issueSe,'combo');
	    gf_FormSetValue('saveFormPjtIssue','issueMngrNo',issueMngr,'text');
	    gf_FormSetValue('saveFormPjtIssue','issueMngr',issueMngrNm,'text');
	    gf_FormSetValue('saveFormPjtIssue','occrrncDe',gf_IsNull(occrrncDe)?'':occrrncDe.toDate().format('YYYY-MM-DD'),'text');
	    gf_FormSetValue('saveFormPjtIssue','issueNm',issueNm,'text');
	    gf_FormSetValue('saveFormPjtIssue','issueCn',issueCn,'textarea');
	    gf_FormSetValue('saveFormPjtIssue','solutAltrv',solutAltrv,'text');
	    gf_FormSetValue('saveFormPjtIssue','comptCn',comptCn,'text');
	    gf_FormSetValue('saveFormPjtIssue','comptDe',gf_IsNull(comptDe)?'':comptDe.toDate().format('YYYY-MM-DD'),'text');
	    gf_FormSetValue('saveFormPjtIssue','comptAt', comptAt, 'text');
	    gf_FormSetValue('saveFormPjtIssue','comptAtOrg', (( comptAt  == '1') ? true : false), 'chkbox');
	    fn_SearchFileUploadSaveFormPjtIssue(atchmnfl, 'saveFormPjtIssue', 'atchmnflSaveFormPjtIssue');
	    
	    fn_SearchGridListPjtIssueAct();
	    fn_IssueActHide();

	  /*  if(!gf_IsNull(issueSn)){

		    var jsonParameter = { projectSn : projectSn, issueSn : issueSn };
	        gf_Transaction('gridList', 'pjtpmg001/searchPjtIssueact', jsonParameter, 'fn_CallbackSearchGridListPjtIssueact', false, 'GET');

	        dhxDataProcessorPjtIssueact = new dataProcessor("/xerp/pjtpmg001/savePjtIssueact"); //lock feed url
	    	dhxDataProcessorPjtIssueact.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	    	dhxDataProcessorPjtIssueact.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
	        dhxDataProcessorPjtIssueact.setVerificator(gf_GetDhxGridColumId(dhxGridPjtIssueact,'actDe'), dhtmlxValidation.NotEmpty);
	        dhxDataProcessorPjtIssueact.setVerificator(gf_GetDhxGridColumId(dhxGridPjtIssueact,'actor'), dhtmlxValidation.NotEmpty);
	        dhxDataProcessorPjtIssueact.setVerificator(gf_GetDhxGridColumId(dhxGridPjtIssueact,'actCn'), dhtmlxValidation.NotEmpty);
	        dhxDataProcessorPjtIssueact.init(dhxGridPjtIssueact); //link dataprocessor to the grid
	        dhxDataProcessorPjtIssueact.styles = {
					updated:	"font-weight:normal;text-decoration:none;",
					inserted:	"font-weight:bold; color:green;",
					deleted:	"color:orange; text-decoration:line-through;",
					invalid:	"color:green; text-decoration:underline;",
					error:		"color:blue; text-decoration:underline;",
					clear:		"font-weight:normal;text-decoration:none;"
			};
	        dhxDataProcessorPjtIssueact.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
	        	if (dataSource.code == "000" || dataSource.data.code !== "000"){
	        		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
	        		fn_SearchGridListPjtIssueact();
	        		return true;
	    	 	} else {
	    	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	    	 		return false;
	    	 	}
	        });
	    }*/
    }
};

var fn_CallbackSearchGridListPjtIssueact = function (strSvcID, targetID, data){
    dhxGridPjtIssueact.clearAll();
    var nRecCnt = 0;
    if(!gf_IsNull(data.data.records)){
    	nRecCnt = data.data.records.length;
        dhxGridPjtIssueact.parse(data.data.records, 'js');         
        //gf_NoFoundDataOnGridMsgRemove('divDataListPjtIssueact');
    } else {
    	//gf_NoFoundDataOnGridMsg('divDataListPjtIssueact');
    }
    $("#spanPjtIssueactCnt").text(gf_NumberWithCommas(nRecCnt));
    
};
/**********************************************************활동들 삭제**************************************************************/
/*var fn_RemovPjtIssueact = function(){	
	var checkArr = fn_GetCheckedGridValueArr(dhxGridPjtIssueact, 'chk', 'chk');
	if(gf_IsNull(checkArr)){
		gf_DivMsgAlert('삭제할 활동내용 선택해 주세요.');
        return false;
	} else{
		dhxGridPjtIssueact.forEachRow(function(rowId) {
			if(dhxGridPjtIssueact.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtIssueact, 'chk')).isChecked()){
				dhxDataProcessorPjtIssueact.setUpdated(rowId, true, "deleted");
			}			
			status = dhxDataProcessorPjtIssueact.getState(rowId);
		});
	}
};*/
/**********************************************************체크 핸들링**************************************************************/
var fn_GetCheckedGridValueArr = function (dhxGrid, checkCid, cid){
	var returnIds = [];
	dhxGrid.forEachRow(function(rowId) {
		if(dhxGrid.cells(rowId, gf_GetDhxGridColumId(dhxGrid, checkCid)).isChecked()){
			returnIds.push( dhxGrid.cells(rowId,gf_GetDhxGridColumId(dhxGrid, cid)).getValue() );
		}
	});
	return returnIds;
};

var fn_CheckAllGrid = function (dhxGrid, status, cid){
	dhxGrid.forEachRow(function(rowId) {
		dhxGrid.cells(rowId, gf_GetDhxGridColumId(dhxGrid, cid)).setChecked(status);
    });
};
/**********************************************************데이터프로세스 validatiion ************************************************/
/*var fn_GridValidation = function(){
	var valid = true;
	dhxGridPjtIssueact.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorPjtIssueact.getState(rowId))) {			 
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtIssueact, rowId, 'actDe', 'grid') )){
				gf_DivMsgAlert("활동일자는  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtIssueact, rowId, 'actDe');
				valid = false;
			}			 
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtIssueact, rowId, 'actor', 'grid') )){
				gf_DivMsgAlert("활동자는  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridPjtIssueact, rowId, 'actor');
				valid = false;
			}
	    	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridPjtIssueact, rowId, 'actCn', 'grid') )){
	    		gf_DivMsgAlert("활동내용은 필수항목 입니다.");
	    		fn_GridValidationSelectCell(dhxGridPjtIssueact, rowId, 'actCn');
	    		valid = false;
	    	}
		}
    });
	return valid;	 
}

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorPjtIssueact.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}*/
/**********************************************************사원 검색팝**************************************************************/
var fn_PopEmpSaveFormPjtIssue = function() {
    gf_EmpPopup('saveFormPjtIssue', 'issueMngrNoSaveFormPjtIssue', 'issueMngrSaveFormPjtIssue', '1000', 'N', 'fn_CallbackPopEmpSaveFormPjtIssue');
};

var fn_CallbackPopEmpSaveFormPjtIssue = function(data) {
    //gf_FormSetValue("saveFormStmUsers", "userId", data.empno, "text");
};
/**********************************************************파일 핸들링**************************************************************/
var uploadedFileKeys = [];
var uploadedFileInfo = [];
var fn_CallbackFileUploadSaveFormPjtIssue = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	if(!gf_IsNull(data)){				
		uploadedFileKeys = [];
		uploadedFileInfo = [];
		$('#'+viewDivId+' .file_box table tr').remove();
		fn_LoadFileUploadSaveFormPjtIssue(data, viewDivId, dataDivId);
	}
};

var fn_SearchFileUploadSaveFormPjtIssue = function(atchFiles, viewDivId, dataDivId) {	
	var jsonParameter = { atchFiles : atchFiles };
	var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST'); 	 
	if(!gf_IsNull(dataSource.data)) {
		uploadedFileKeys = [];
		uploadedFileInfo = [];
		$.each( dataSource.data, function( key, value ) {			
			uploadedFileKeys.push(value.atchFileId);				
			uploadedFileInfo.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	 
		});		
		$('#'+viewDivId+' .file_box table tr').remove();
		fn_LoadFileUploadSaveFormPjtIssue(uploadedFileInfo, viewDivId, dataDivId);	
	}
};

var fn_RemoveFileUploadSaveFormPjtIssue = function(obj, viewDivId, dataDivId) {
	uploadedFileKeys.splice($(obj).attr('idx'), 1);
	uploadedFileInfo.splice($(obj).attr('idx'), 1);	
	$('#'+viewDivId+' .file_box table tr').remove();
	fn_LoadFileUploadSaveFormPjtIssue(uploadedFileInfo, viewDivId, dataDivId);
};

var fn_LoadFileUploadSaveFormPjtIssue = function(data, viewDivId, dataDivId) {		
	var atchFileList = [];
	var fileInfos = [];
	var idx = 0;
	var arrayEmpty = false;
	if(gf_IsNull(uploadedFileKeys) && gf_IsNull(uploadedFileInfo)) arrayEmpty = true;
	$.each( data, function( key, value ) {
		fileInfos = value.split('|^|');
		if(arrayEmpty) {
			uploadedFileKeys.push(fileInfos[0]);				
			uploadedFileInfo.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);	
		}		
		atchFileList.push('<tr>');
		atchFileList.push('<td style="border:0px"><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
		atchFileList.push('<td style="border:0px">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
		atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="fn_RemoveFileUploadSaveFormPjtIssue(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');		
		idx++;
	});	
	if(idx === 0) {
		atchFileList.push('<tr>');
		atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');		
		atchFileList.push('</tr>');
	}
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val(uploadedFileKeys.join("|"));
}

var fn_ClearFileUploadSaveFormPjtIssue = function(viewDivId, dataDivId){
	$('#'+viewDivId+' .file_box table tr').remove();
	var atchFileList = [];
	atchFileList.push('<tr>');
	atchFileList.push('<td colspan="3" style="text-align:center; border:0px; padding-top:15px">첨부파일이 없습니다.</td>');		
	atchFileList.push('</tr>');
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val('');	
};
/**********************************************************그리드 버튼**************************************************************/
/*var eXcell_datePickerButton = function(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue = function(val){
        this.setCValue("<div id=''></div><img alt='' src='/xerp/img/sub/icon_calen.png' style='cursor:pointer'>");                                      
    }
}
eXcell_datePickerButton.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDate = function (rid, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridPjtIssueact, rid, 'actDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorPjtIssueact.setUpdated(rid, true, 'updated');
	}	
}*/
/*
var eXcell_searchEmpButton = function(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue = function(val){
        this.setCValue('<span class="glyphicon glyphicon glyphicon-search"></span>');                                      
    }
}
eXcell_searchEmpButton.prototype = new eXcell;// nests all other methods from the base class
var fn_gridSearchEmpButton = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButton', rid);
};
var fn_CallbackGridSearchEmpButton = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridPjtIssueact, rid, 'actor', data.empno, 'grid');
		gf_DhxSetValue(dhxGridPjtIssueact, rid, 'actorNm', data.korNm, 'grid');
	}
};*/

var fn_IssueActPopup = function (projectSn, issueSn, actSn) {

	var userId = ""; 
	var title  = "이슈활동관리";
	var customerInfo = "customerInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	 if(typeof projectSn == "undefined" || projectSn == null){
		 projectSn = "";
     }
	 if(typeof issueSn == "undefined" || issueSn == null){
		 issueSn = "";
     }
	 if(typeof actSn == "undefined" || actSn == null){
		 actSn = "";
     }

	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='issuePopup']").size() <= 0) {
		$('body').append("<div id='issuePopup' projectSn='" + projectSn + "' issueSn='" + issueSn + "' actSn='" + actSn + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#issuePopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'issuePopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/pjtpmgIssueActPopup/view';
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 380;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#issuePopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($customerInfo);
			}
			
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='issuePopup']").remove();
			fn_SearchGridListPjtIssueAct();
		}
	},function(){});
	return dhxWindowObj;
};

var fn_IssueActHide = function() {
	var projectSn = gf_FormGetValue('saveFormPjtIssue', 'projectSn', 'text');
	var issueSn = gf_FormGetValue('saveFormPjtIssue', 'issueSn', 'text');

	if(!gf_IsNull(projectSn) && !gf_IsNull(issueSn)) {
		$("#issueActDis").css("display", "");
	} else if(gf_IsNull(issueSn)){
		$("#issueActDis").css("display", "none");
	}

};

