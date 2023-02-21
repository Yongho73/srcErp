/**
 * 프로그램 : 공통코드관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.30
 * 사용테이블 : STM_CODE
 **/

var fadeRegs = false; // 등록 화면 전환 플레그
var fadeMode = true;  // 수정 화면 전환 플레그
var modifyAt = true;  // 등록 수정 여부 플레그
var keyDuplication = false; // 공통코드종류 등록시 중복 체크

$(function() {
	cf_InitParam();
	cf_SetComponents();
	cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
});

var cf_InitParam = function (){
    // 메뉴경로표시
	gf_SetMenuPath();
    // 공통코드 콤보 divId, selectId,  selectName, placeHolder, codekindCode, exceptCode, selectStyle, selectClass, sortOrder, validation
    gf_ComboCode('divComboSysSeSearchFormStmCodekind', 'sysSeSearchFormStmCodeKind', 'sysSe', 'search', 'C001', '' , '', '', 'asc', '');
    gf_ComboCode('divComboSysSeSaveFormStmCodekind', 'sysSeSaveFormStmCodeKind', 'sysSe', 'add', 'C001', '' , '', '', 'asc', 'required');
    // 입력양식 jquery validation 환경설정
    $("#saveFormStmCodeKind").validate({ errorElement: 'div', ignore: '' });
    $('#btnCheckDupStmCodeKind').hide();
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormStmCodeKind');    
};

var dhxGridStmCodeKind;
var dhxGridStmCode;
var cf_SetComponents = function (){
	// 공통코드종류 그리드
	var dhxGridStmCodeKindListInfo = [];
	dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   		'40', 'center', 'int', 'edn', false, 'rnum', '')); // 번호
	dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmCodeKind" />',     '50', 'center', 'na', 'ch', false, 'chk', '')); // Check Box
	dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodekindCode'), 	'100', 'center', 'str', 'edn', false, 'codekindCode', '')); // 코드종류 코드
	dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodekindNm'),  	'*', 'center', 'str', 'edn', false, 'codekindNm', '')); // 코드종류 한글명
	dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSysSe'),  		'0', 'center', 'str', 'ro', true, 'sysSe', '')); // 시스템구분
	dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodeLt'),  		'0', 'center', 'str', 'ro', true, 'codeLt', '')); // 코드길이
	dhxGridStmCodeKindListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodeDc'),  		'0', 'center', 'str', 'ro', true, 'codeDc', '')); // 코드설명		
	dhxGridStmCodeKind = gf_MakeDhxGrid('divDataListStmCodeKind', dhxGridStmCodeKindListInfo, true, false, false);
	// 공통코드 그리드
    var dhxGridStmCodeListInfo = [];
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   		'50', 'center', 'ro', 'cntr', false, 'num', '', '')); // 번호
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmCode" />',  '50', 'center', 'na', 'ch', false, 'chk', '', '')); // Check Box
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader('코드종류', 	'90', 'center', 'str', 'coro', false, 'codekindCode', '', 'NotEmpty')); // 코드종류 코드
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader('코드값',      	'50', 'center', 'str', 'edn', false, 'code', '', 'NotEmpty')); // 코드
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodeKorNm'), 	'*', 'left', 'str', 'ed', false, 'codeKorNm', '', 'NotEmpty')); // 코드 한글 명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodeEngNm'), 	'100', 'left', 'str', 'ed', false, 'codeEngNm', '', '')); // 코드 영문 명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'), 		'70', 'center', 'na', 'ch', false, 'useAt', '', '')); // 사용 여부
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOrdr'),    		'60', 'center', 'int', 'edn', false, 'ordr', '', 'ValidInteger,NotEmpty')); // 순서
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodeDc'),    	'100', 'left', 'str', 'ed', false, 'codeDc', '', '')); // 코드 설명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCodeThirdNm'), 	'100', 'center', 'str', 'ed', false, 'codeThirdNm', '', '')); // 코드 제3국 명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDfltAt'),  		'80', 'center', 'na', 'ch', false, 'dfltAt', '', '')); // 디폴트 여부
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titFactor'),  		'70', 'center', 'str', 'ed', false, 'factor', '', '')); // 팩터
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRefer1Dc'), 		'70', 'center', 'str', 'ed', false, 'refer1Dc', '', '')); // 참고1 설명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRefer2Dc'), 		'70', 'center', 'str', 'ed', false, 'refer2Dc', '', '')); // 참고2 설명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRefer3Dc'), 		'70', 'center', 'str', 'ed', false, 'refer3Dc', '', '')); // 참고3 설명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRefer4Dc'), 		'70', 'center', 'str', 'ed', false, 'refer4Dc', '', '')); // 참고4 설명
    dhxGridStmCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCode'), 			'0', 'center', 'str', 'ro', true, 'olCode', '', '')); // 참고4 설명
    
    dhxGridStmCode = gf_MakeDhxGrid('divDataListStmCode', dhxGridStmCodeListInfo, true, false, false);
    dhxGridStmCode.setNumberFormat("0,000", 7, ".", ",");  // string mask, number cInd, string p_sep, string d_sep
};

var eventIdsCodeKnd = [];
var eventIdsCodeDet = [];
var cf_SetEventListener = function (){
	// 그리드 이벤트 모두 삭제
	var eventId = '';
	fn_GridDetachEvent();
	// 공통코드종류 그리드 이벤트
    eventId = dhxGridStmCodeKind.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬    	    	
    	fn_SortGridList(ind, type, direction);
    });
	eventIdsCodeKnd.push(eventId);
	eventId = dhxGridStmCodeKind.attachEvent("onKeyPress",function(keyCode, ctrl, shift, event_object){ // 엑셀다운로드
		if(keyCode == 113) fn_ExcelDownStmCode();
	});
	eventIdsCodeKnd.push(eventId);
	eventId = dhxGridStmCodeKind.attachEvent('onRowSelect',function(id, ind) {
		fn_SelecedGridListStemCode()
	});
	eventIdsCodeKnd.push(eventId);
	// 공통코드 그리드 이벤트
	eventId = dhxGridStmCode.attachEvent("onKeyPress",function(keyCode, ctrl, shift, event_object){
    	if(keyCode == 113) { fn_ExcelDownStmCode(); //F2
    	} else 
    	if(keyCode == 13)  {   //ENTER
    		var selectedId = dhxGridStmCode.getSelectedRowId();
    		var ind        = dhxGridStmCode.getSelectedCellIndex();
    		var rowIndex   = dhxGridStmCode.getRowIndex(selectedId);
    		dhxGridStmCode.selectCell(rowIndex, ind+1);
        	dhxGridStmCode.editCell();
    	} else 
    	if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridStmCode.getSelectedRowId();
    		var ind        = dhxGridStmCode.getSelectedCellIndex();
    		var rowIndex   = dhxGridStmCode.getRowIndex(selectedId);
    		dhxGridStmCode.selectCell(rowIndex+1, ind);
        	dhxGridStmCode.editCell();
    	} else 
    	if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridStmCode.getSelectedRowId();
    		var ind        = dhxGridStmCode.getSelectedCellIndex();
    		var rowIndex   = dhxGridStmCode.getRowIndex(selectedId);
    		dhxGridStmCode.selectCell(rowIndex-1, ind);
        	dhxGridStmCode.editCell();
    	}
        else return true;
    });
	eventIdsCodeDet.push(eventId);
	// 버튼 이벤트
    $('#btnSearchStmCodeKind').unbind('click').bind('click', function(event){
    	// 재조회시 정렬 초기화
    	fn_InitGridSort();     
    	fn_SearchGridListStmCodeKind('1');
    });
    $('#btnInitStmCodeKind').unbind('click').bind('click', function(event){
    	fn_SearchGridListStmCodeKindInit();
    });
    $('#btnAddStmCodeKind').unbind('click').bind('click', function(event){
    	fn_AddStmCodeKindForm();
    });
    $('#btnSaveStmCodeKind').unbind('click').bind('click', function() {
    	fn_SaveStmCodeKind();
    });
    $('#btnRemoveStmCodeKind').unbind('click').bind('click', function(event){    	
    	fn_RemovStmCodeKindBefore();    	
    });
    $('#btnExcelStmCodeKind').unbind('click').bind('click', function() {
    	fn_ExcelDownStmCode();
    });
    $('#btnCheckDupStmCodeKind').unbind("click").bind("click",function() {
    	fn_FindSameKey();
    });
    $('#btnAddStmCode').unbind('click').bind('click', function(event){
    	gf_NoFoundDataOnGridMsgRemove('divDataListStmCode');
    	var selectedId = dhxGridStmCodeKind.getSelectedRowId();
    	var codekindCode = gf_DhxGetValue(dhxGridStmCodeKind, selectedId, 'codekindCode', 'grid');    	 
    	if(!gf_IsNull(codekindCode)){
    		/*
    		void addRow(string|number new_id,string|number text, [string|number ind] );
    		---------------------------------------------------------------------------
    		new_id	string|number	행 ID는 고유해야합니다.
			text	string|number	행 값. 쉼표로 구분 된 목록 또는 배열 일 수 있음
			ind		string|number	새 행의 색인, 행은 기본적으로 마지막 위치에 추가됩니다 (선택 사항).(기본은 맨아래 row 생성)
    		*/
	    	dhxGridStmCode.addRow('newRow_'+dhxGridStmCode.uid(),[0,false,codekindCode,'','','',true,'','','',true,'','', '','','',''],0);
	    	/*
	    	void selectRow(number|HTMLElement row,boolean fl,boolean preserve,boolean show);
	    	---------------------------------------------------------------------------
	    	row			number|HTMLElement	행 인덱스 또는 행 객체
			fl			boolean	true 인 경우 선택시 함수 호출 (선택 사항, 기본적으로 false)
			preserve	boolean	이전에 선택한 행을 유지합니다 (true / false) (기본적으로 false). 다중 선택 모드가 활성화되어 있어야합니다.
			show		boolean	true | false-표시 할 행 스크롤, 기본적으로 true
	    	*/
	    	dhxGridStmCode.selectRow(0);
	    	dhxGridStmCode.selectCell(0, gf_GetDhxGridColumId(dhxGridStmCode,'code'));
	    	dhxGridStmCode.editCell();
    	}
    });
    $('#btnRemoveStmCode').unbind('click').bind('click', function() {
    	fn_RemovStmCode();    	
    });
    $('#btnSaveStmCode').unbind('click').bind('click', function() {
    	if(fn_GridValidation()) dhxDataProcessorStmCode.sendData();    	
    });
    $('#pageingFormStmCodeKind select[name="pageRowSize"]').unbind('change').bind('change', function() {
    	$('#btnSearchStmCodeKind').click();
    });
    $('#btnMemUpt').unbind('click').bind('click', function() {
    	gf_RefreshComboCode();
		gf_DivMsgAlert("업데이트 되었습니다.");
    });    
    // 기타 이벤트
    $('#stmCodekindSearchFormStmCodeKind').unbind('keypress').bind('keypress', function(event){ if(event.charCode == 13) { $('#btnSearchStmCodeKind').click(); } });
    $('#stmCodekindNmSearchFormStmCodeKind').unbind('keypress').bind('keypress', function(event){ if(event.charCode == 13) { $('#btnSearchStmCodeKind').click(); } });
    $('#checkAllStmCodeKind').unbind("click").bind("click",function() { fn_CheckAllGrid(dhxGridStmCodeKind, $("#checkAllStmCodeKind").prop("checked"), 'chk'); });
    $('#checkAllStmCode').unbind("click").bind("click",function() { fn_CheckAllGrid(dhxGridStmCode, $("#checkAllStmCode").prop("checked"), 'chk'); });
};

var cf_SetBinding = function (){
	fn_SearchGridListStmCodeKind('1');
};

var cf_InitForm = function (){
    $('#saveFormStmCodeKind input[name="stmCodekind"]').removeAttr("disabled");
    gf_FormSetValue('saveFormStmCodeKind', 'stmCodekind', '', 'text');
    gf_FormSetValue('saveFormStmCodeKind', 'stmCodekindNm', '', 'text');
    gf_FormSetValue('saveFormStmCodeKind', 'sysSe', '', 'combo');
    gf_FormSetValue('saveFormStmCodeKind', 'codeLt', '', 'text');
    gf_FormSetValue('saveFormStmCodeKind', 'codeDc', '', 'text');
    gf_FormSetValue('saveFormStmCodeKind', 'olStmCodekind', '', 'text');
};

var fn_SearchGridListStmCodeKindInit = function (){
	gf_FormSetValue('searchFormStmCodeKind', 'stmCodekind', '', 'text');
	gf_FormSetValue('searchFormStmCodeKind', 'stmCodekindNm', '', 'text');
	gf_FormSetValue('searchFormStmCodeKind', 'sysSe', '', 'combo');
	gf_FormSetValue('searchFormStmCodeKind', 'sortDirection', '', 'text');
    gf_FormSetValue('searchFormStmCodeKind', 'sortColumId', '', 'text');
};

var fn_SortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridStmCodeKind, 'rnum')){    		
    	var sortOrder = gf_FormGetValue('searchFormStmCodeKind', 'sortDirection', 'text');
    	var sortColumId = gf_FormGetValue('searchFormStmCodeKind', 'sortColumId', 'text');
    	var nowSortColumId = gf_GetDhxGridColum(dhxGridStmCodeKind, ind);
    	// 정렬 컬럼이 바뀌면 정렬방식 초기화
    	if(sortColumId != nowSortColumId) sortOrder = '';	    	
    	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
    	if(sortOrder == 'desc' ) {
    		dhxGridStmCodeKind.setSortImgState(true, ind, 'asc');
    		gf_FormSetValue('searchFormStmCodeKind', 'sortDirection', 'asc', 'text');
    		gf_FormSetValue('searchFormStmCodeKind', 'sortColumId', gf_GetDhxGridColum(dhxGridStmCodeKind, ind), 'text');
    	}  else {
    		dhxGridStmCodeKind.setSortImgState(true, ind, 'desc');
    		gf_FormSetValue('searchFormStmCodeKind', 'sortDirection', 'desc', 'text');
    		gf_FormSetValue('searchFormStmCodeKind', 'sortColumId', gf_GetDhxGridColum(dhxGridStmCodeKind, ind), 'text');
    	}
    	fn_SearchGridListStmCodeKind(gf_FormGetValue('searchFormStmCodeKind', 'selectedPageNum', 'text'));
	}
}

var fn_InitGridSort = function(){
	dhxGridStmCodeKind.setSortImgState(false);
	gf_FormSetValue('searchFormStmCodeKind', 'sortDirection', '', 'text');
    gf_FormSetValue('searchFormStmCodeKind', 'sortColumId', '', 'text');
}

var fn_SearchGridListStmCodeKind = function (pageNum){
	dhxGridStmCode.clearAll();
	var pageingCnt = gf_FormGetValue('pageingFormStmCodeKind', 'pageRowSize', 'combo');
	var page = pageNum;
	if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	if(gf_IsNull(page)) page = 1;
	gf_FormSetValue('searchFormStmCodeKind', 'selectedPageNum', page, 'text');
    var jsonParameter = {
        codekindCode  	: gf_FormGetValue('searchFormStmCodeKind', 'stmCodekind', 'text'),
        codekindCodeNm  : gf_FormGetValue('searchFormStmCodeKind', 'stmCodekindNm', 'text'),
        sysSe  			: gf_FormGetValue('searchFormStmCodeKind', 'sysSe', 'combo'),
        sortDirection	: gf_FormGetValue('searchFormStmCodeKind', 'sortDirection', 'text'),
		sortColumId		: gf_FormGetValue('searchFormStmCodeKind', 'sortColumId', 'text'),
        pageingCnt 		: pageingCnt,
        pageNum 		: page
    };
    gf_Transaction('gridList', 'stmmng003/searchStmCodeKind', jsonParameter, 'fn_CallbackSearchKindGridList', false, 'GET');
};

var fn_CallbackSearchKindGridList = function (strSvcID, targetID, data){
	dhxGridStmCodeKind.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridStmCodeKind.parse(data.data.records, 'js');
    	dhxGridStmCodeKind.selectRow(0);
    	fn_SelecedGridListStemCode();
    	gf_NoFoundDataOnGridMsgRemove('divDataListStmCodeKind');
    	gf_NoFoundDataOnGridMsgRemove('divDataListStmCode');    	
    	// 정렬 컬럼이 있으면 정렬 상태 유지
    	var sortOrder = gf_FormGetValue('searchFormStmCodeKind', 'sortDirection','text');
    	var sortColumId = gf_FormGetValue('searchFormStmCodeKind', 'sortColumId','text');
    	if(!gf_IsNull(sortOrder) && !gf_IsNull(sortColumId)) {
    		dhxGridStmCodeKind.setSortImgState(true, gf_GetDhxGridColumId(dhxGridStmCodeKind, sortColumId), sortOrder);    		 
    	}
    } else {
    	gf_NoFoundDataOnGridMsg('divDataListStmCodeKind');
    	gf_NoFoundDataOnGridMsg('divDataListStmCode');
    	$('#btnAddStmCodeKind').click();
    }
    $('#spanStmCodeKindCnt').text(gf_NumberWithCommas(data.data.totalRecordCount));
    $('#spanStmCodeCnt').text('0');
    // 페이징 버튼 생성
	gf_PageNate(data.data,'.paging','fn_SearchGridListStmCodeKind');
};

var fn_AddStmCodeKindForm = function(){
	modifyAt = false;
	dhxGridStmCodeKind.clearSelection();
	if(!fadeRegs) {
		$('#saveFormStmCodeKind').fadeOut(gv_FadeTime, function() {
			cf_InitForm();
			fadeRegs = true;
			fadeMode = false;
			keyDuplication = true;
			$('#btnCheckDupStmCodeKind').show();
		});
		$('#saveFormStmCodeKind').fadeIn(gv_FadeTime, function() {});
	} else {
		cf_InitForm();
	}
	fn_RemoveJqueryValidationMsg();
}

var fn_SelecedGridListStemCode = function () {
	modifyAt = true
	if(!fadeMode) {
		$('#saveFormStmCodeKind').fadeOut(gv_FadeTime, function() {
			fn_SearchGridListStmCode();
       	   	fadeMode = true;
       	   	fadeRegs = false;
	       	keyDuplication = false;
	        $('#btnCheckDupStmCodeKind').hide();
        });
        $('#saveFormStmCodeKind').fadeIn(gv_FadeTime, function() {});
	} else {
		fn_SearchGridListStmCode();
	}
	fn_RemoveJqueryValidationMsg();
};

var fn_RemoveJqueryValidationMsg = function(){
	$('#saveFormStmCodeKind [id$="-error"]').remove();	
};

var fn_SaveStmCodeKind = function(){
	if(keyDuplication) {
		gf_DivMsgAlert('중복확인을 해주세요.');
		return false;
	}
	if($('#saveFormStmCodeKind').validate().form()){
		var jsonParameter = {
				codekindCode	: gf_FormGetValue('saveFormStmCodeKind','stmCodekind','text'),
				codekindNm    	: gf_FormGetValue('saveFormStmCodeKind','stmCodekindNm','text'),
				sysSe  			: gf_FormGetValue('saveFormStmCodeKind','sysSe','combo'),
				codeLt    		: gf_FormGetValue('saveFormStmCodeKind','codeLt','text'),
				codekindCodeDc  : gf_FormGetValue('saveFormStmCodeKind','codeDc','text')	 
		};		 
		gf_Transaction(jsonParameter, 'stmmng003/saveStmCodeKind', jsonParameter, 'fn_CallbackSaveStmCodeKind', false, 'POST');
	}
}

var fn_CallbackSaveStmCodeKind = function (strSvcID, targetID, data){
	if(data.code === '000') {        
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    	fn_SearchGridListStmCodeKind();
    	gf_RefreshComboCode();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }    
};

var fn_RemovStmCodeKindBefore = function(){	
	var checkArr = fn_GetCheckedGridValueArr(dhxGridStmCodeKind, 'chk', 'codekindCode');
	if(gf_IsNull(checkArr)){
		gf_DivMsgAlert('삭제할 코드종류를 선택해 주세요.');
        return false;
	} else{
		gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovStmCodeKind()', '');
	}
};

var fn_RemovStmCodeKind = function(){	
	var checkArr = fn_GetCheckedGridValueArr(dhxGridStmCodeKind, 'chk', 'codekindCode');	
	var jsonParameter = { codekindCodes : checkArr.join(',') };
	gf_Transaction(jsonParameter, 'stmmng003/removeStmCodeKind', jsonParameter, 'fn_CallbackRemovStmCodeKind', false, 'POST');	
};

var fn_CallbackRemovStmCodeKind = function (strSvcID, targetID, data){															
	if(data.code === '000') {
    	fn_SearchGridListStmCodeKind();
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }    
};

var dhxDataProcessorStmCode;
var fn_SearchGridListStmCode = function () {
	var rowId = dhxGridStmCodeKind.getSelectedRowId();
	dhxGridStmCode.clearAll();
    if (rowId > 0) {

	    var codekindCode 	= dhxGridStmCodeKind.cells(rowId, gf_GetDhxGridColumId(dhxGridStmCodeKind,'codekindCode')).getValue();
	    var codekindCodeNm 	= dhxGridStmCodeKind.cells(rowId, gf_GetDhxGridColumId(dhxGridStmCodeKind,'codekindNm')).getValue();
	    var codekindSysSe 	= dhxGridStmCodeKind.cells(rowId, gf_GetDhxGridColumId(dhxGridStmCodeKind,'sysSe')).getValue();
	    var codekindCodeLt 	= dhxGridStmCodeKind.cells(rowId, gf_GetDhxGridColumId(dhxGridStmCodeKind,'codeLt')).getValue();
	    var codekindCodeDc 	= dhxGridStmCodeKind.cells(rowId, gf_GetDhxGridColumId(dhxGridStmCodeKind,'codeDc')).getValue();
	    
	    $('#saveFormStmCodeKind input[name="stmCodekind"]').attr("disabled",true);
	    gf_FormSetValue('saveFormStmCodeKind','stmCodekind',codekindCode,'text');
	    gf_FormSetValue('saveFormStmCodeKind','stmCodekindNm',codekindCodeNm,'text');
	    gf_FormSetValue('saveFormStmCodeKind','sysSe',codekindSysSe,'combo');
	    gf_FormSetValue('saveFormStmCodeKind','codeLt',codekindCodeLt,'text');
	    gf_FormSetValue('saveFormStmCodeKind','codeDc',codekindCodeDc,'text');
	    
	    if(!gf_IsNull(codekindCode)){

		    var jsonParameter = { codekindCode  : codekindCode };
	        gf_Transaction('gridList', 'stmmng003/searchStmCode', jsonParameter, 'fn_CallbackSearchGridListStmCode', false, 'GET');

	        dhxDataProcessorStmCode = new dataProcessor("/xerp/stmmng003/saveStmCode"); //lock feed url
	    	dhxDataProcessorStmCode.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	    	dhxDataProcessorStmCode.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
	        dhxDataProcessorStmCode.setVerificator(gf_GetDhxGridColumId(dhxGridStmCode,'codekindCode'), dhtmlxValidation.NotEmpty);
	        dhxDataProcessorStmCode.setVerificator(gf_GetDhxGridColumId(dhxGridStmCode,'code'), dhtmlxValidation.NotEmpty);
	        dhxDataProcessorStmCode.setVerificator(gf_GetDhxGridColumId(dhxGridStmCode,'codeKorNm'), dhtmlxValidation.NotEmpty);
	        dhxDataProcessorStmCode.init(dhxGridStmCode); //link dataprocessor to the grid
	        dhxDataProcessorStmCode.styles = {
					updated:	"font-weight:normal;text-decoration:none;",
					inserted:	"font-weight:bold; color:green;",
					deleted:	"color:orange; text-decoration:line-through;",
					invalid:	"color:green; text-decoration:underline;",
					error:		"color:blue; text-decoration:underline;",
					clear:		"font-weight:normal;text-decoration:none;"
			};
	        dhxDataProcessorStmCode.defineAction("error",function(response){
	        	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	            return false;
	        });
	        dhxDataProcessorStmCode.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
	        	if (dataSource.code == "000" || dataSource.data.code !== "000"){
	        		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
	        		fn_SearchGridListStmCode();
	        		gf_RefreshComboCode();
	        		return true;
	    	 	} else {
	    	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	    	 		return false;
	    	 	}
	        });
	    }
    }
};

var fn_CallbackSearchGridListStmCode = function (strSvcID, targetID, data){
    dhxGridStmCode.clearAll();
    var nRecCnt = 0;
    if(!gf_IsNull(data.data.records)){
    	nRecCnt = data.data.records.length;
        dhxGridStmCode.parse(data.data.records, 'js');
        dhxGridStmCode.forEachRow(function (id){
        	dhxGridStmCode.cells(id, gf_GetDhxGridColumId(dhxGridStmCode,'code')).setDisabled(true);
        });
        gf_NoFoundDataOnGridMsgRemove('divDataListStmCode');
    } else {
    	gf_NoFoundDataOnGridMsg('divDataListStmCode');
    }
    $("#spanStmCodeCnt").text(gf_NumberWithCommas(nRecCnt));
};

var fn_RemovStmCode = function(){	
	var checkArr = fn_GetCheckedGridValueArr(dhxGridStmCode, 'chk', 'chk');
	if(gf_IsNull(checkArr)){
		gf_DivMsgAlert('삭제할 코드를 선택해 주세요.');
        return false;
	} else{
		dhxGridStmCode.forEachRow(function(rowId) {
			if(dhxGridStmCode.cells(rowId, gf_GetDhxGridColumId(dhxGridStmCode, 'chk')).isChecked()){
				dhxDataProcessorStmCode.setUpdated(rowId, true, "deleted");
			}
			/*
			status = dhxDataProcessorStmCode.getState(rowId);
			gf_Trace("selectedId = " + rowId + ", status : " + status);
			*/
		});
	}
};

var fn_ExcelDownStmCode = function () {
	var titStmCode = gf_LocaleTrans('default','titStmCode');
	var jsonParameter = {
    		codekindCode  	: gf_FormGetValue('searchFormStmCodeKind', 'stmCodekind', 'text'),
            codekindCodeNm  : gf_FormGetValue('searchFormStmCodeKind', 'stmCodekindNm', 'text'),
            sysSe  			: gf_FormGetValue('searchFormStmCodeKind', 'sysSe', 'combo')
    };
    var header = [[
    				gf_LocaleTrans('default', 'titNum'),
    				gf_LocaleTrans('default', 'titCodekindCode'),
    				gf_LocaleTrans('default', 'titCodekindNm'),
    				gf_LocaleTrans('default', 'titCode'),
                    gf_LocaleTrans('default', 'titCodeKorNm'),
                    gf_LocaleTrans('default', 'titCodeEngNm'),
                    gf_LocaleTrans('default', 'titUseAt'),
                    gf_LocaleTrans('default', 'titOrdr'),
                    gf_LocaleTrans('default', 'titCodeDc'),
                    gf_LocaleTrans('default', 'titDfltAt'),
                    gf_LocaleTrans('default', 'titFactor'),
                    gf_LocaleTrans('default', 'titRefer1Dc'),
                    gf_LocaleTrans('default', 'titRefer2Dc'),
                    gf_LocaleTrans('default', 'titRefer3Dc'),
                    gf_LocaleTrans('default', 'titRefer4Dc'),
                    gf_LocaleTrans('default', 'titCodeThirdNm')
    ]];
    var dataId = [[ 'num','codekindCode','codekindNm', 'code', 'codeKorNm', 'codeEngNm', 'useAt', 'ordr', 'codeDc', 'dfltAt', 'factor', 'refer1Dc', 'refer2Dc', 'refer3Dc', 'refer4Dc', 'codeThirdNm' ]];
    var dataAlign = [[ 'right', 'center', 'center', 'center', 'center', 'center', 'center', 'right', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmCode ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmCode;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng003/excelStmCode', jsonParameter);
};

var fn_FindSameKey = function(){
	var key = gf_FormGetValue('saveFormStmCodeKind','stmCodekind','text').trim();
	if(gf_IsNull(key)) {
		gf_DivMsgAlert('코드종류 코드를 입력해 주세요.');
		$('#saveFormStmCodeKind #stmCodekindSaveFormStemCodeKind').focus();
		return false;
	}
	var jsonParameter = {
			codekindCode: key,
			pageingCnt : 1,
	        pageNum : 1
	};
	var dataSource = gf_NoAsyncTransaction('stmmng003/searchStmCodeKind', jsonParameter, 'GET');
	if(dataSource.code === '000') {
		if(gf_IsNull(dataSource.data.records)) {
			gf_DivMsgAlert('등록 가능한 코드종류 코드 입니다.');
			keyDuplication = false;
			return true;
		} else {
			gf_DivMsgAlert('동일한 코드종류 코드가 존재합니다.');
			keyDuplication = true;
			return false;
		}
	} else {
		gf_DivMsgAlert('중복확인이 되지 않습니다.');
		return false;
	}
}

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

var fn_GridValidation = function(){
	var valid = true;
	var checkCode;
	dhxGridStmCode.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorStmCode.getState(rowId))) {
			checkCode = gf_DhxGetValue(dhxGridStmCode, rowId, 'code', 'grid');
			var code;
			dhxGridStmCode.forEachRow(function(rowIdForCheck) {
				var code = gf_DhxGetValue(dhxGridStmCode, rowIdForCheck, 'code', 'grid');
				if((code == checkCode) && (rowId != rowIdForCheck)) {
					gf_DivMsgAlert("중복된 코드가 있습니다.");
					fn_GridValidationSelectCell(dhxGridStmCode, rowId, 'code');
					valid = false;
				}
			});
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridStmCode, rowId, 'ordr', 'grid') )){
				gf_DivMsgAlert("순서는  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridStmCode, rowId, 'ordr');
				valid = false;
			}
			if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridStmCode, rowId, 'ordr', 'grid') )){
				gf_DivMsgAlert("순서는 숫자만 입력 가능합니다.");
				gf_DhxSetValue(dhxGridStmCode, rowId, 'ordr', '', 'grid');
				fn_GridValidationSelectCell(dhxGridStmCode, rowId, 'ordr');
				valid = false;
			}
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridStmCode, rowId, 'codeKorNm', 'grid') )){
				gf_DivMsgAlert("코드명은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridStmCode, rowId, 'codeKorNm');
				valid = false;
			}
	    	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridStmCode, rowId, 'code', 'grid') )){
	    		gf_DivMsgAlert("코드는 필수항목 입니다.");
	    		fn_GridValidationSelectCell(dhxGridStmCode, rowId, 'code');
	    		valid = false;
	    	}
		}
    });
	return valid;	 
}

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorStmCode.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}

var fn_GridDetachEvent = function(){
	for (var i=0;i<eventIdsCodeKnd.length;i++) {
		dhxGridStmCodeKind.detachEvent(eventIdsCodeKnd[i]);
	}
	for (var i=0;i<eventIdsCodeDet.length;i++) {
		dhxGridStmCode.detachEvent(eventIdsCodeDet[i]);
	}
	eventIdsCodeKnd = [];
	eventIdsCodeDet = [];
};
