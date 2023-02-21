/**
 *    프로그램       : 자격증코드 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.03
 *    사용테이블      : MHS_CRQFS_CODE
 * sourceGen version : 2020.07.16.01 (2020.08.03)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm009 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm009 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm009 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm009 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm009 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm009 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm009 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm009;  //그리드 객체
var eventIdMhshrm009 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm009;  //DataProcessor 객체
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm009();
    if(cf_SetComponentsMhshrm009()){
       cf_SetEventListenerMhshrm009();
       cf_InitFormMhshrm009();
       cf_SetBindingMhshrm009();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm009 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm009").validate({ errorElement: 'div', ignore: '' });
    
	gf_ComboCode('crqfsSeSearchFormMhshrm009', 'crqfsSe', 'crqfsSe', 'search', 'C138', '' , '', '', 'asc', '');
};

var cf_SetComponentsMhshrm009 = function() {
    var dhxGridMhshrm009HeaderInfo = [];
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm009" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('자격증코드', '100', 'center', 'str', 'ro', false, 'crqfsCodeNo', '', '')); /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('구분', '100', 'center', 'str', 'coro', false, 'crqfsSe', '', '')); /* gf_LocaleTrans('default', 'titCrqfsSe') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('자격증명', '150', 'left', 'str', 'ed', false, 'crqfsNm', '', '')); /* gf_LocaleTrans('default', 'titCrqfsNm') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '80', 'center', 'date', 'dhxCalendarA', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '80', 'center', 'date', 'dhxCalendarA', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('수당지급여부', '100', 'center', 'str', 'ch', false, 'allwncPymntAt', '', '')); /* gf_LocaleTrans('default', 'titAllwncPymntAt') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('자격수당금액', '100', 'right', 'int', 'edn', false, 'qualfAllwncAmt', '', '')); /* gf_LocaleTrans('default', 'titQualfAllwncAmt') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('인사평가반영여부', '120', 'center', 'str', 'ch', false, 'evlApplyAt', '', '')); /* gf_LocaleTrans('default', 'titEvlApplyAt') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('인정점수', '80', 'right', 'int', 'edn', false, 'recogScore', '', '')); /* gf_LocaleTrans('default', 'titRecogScore') */
    dhxGridMhshrm009HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhshrm009 = gf_MakeDhxGrid('dataListMhshrm009', dhxGridMhshrm009HeaderInfo, true, false, false);
    dhxGridMhshrm009.enableAutoWidth(false);
    dhxGridMhshrm009.setEditable(true);

    dhxGridMhshrm009.setColumnMinWidth(40,11); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    dhxGridMhshrm009.setDateFormat("%Y-%m-%d");
    dhxGridMhshrm009.setNumberFormat("0,000", dhxGridMhshrm009.getColIndexById("qualfAllwncAmt"), ".", ",");

    //그리드 출장구분코드
    var jsonParameter1 = {codekindCode : "C138",exceptCode :"",sortOrder :"ordr" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhshrm009, dhxGridMhshrm009.getColIndexById("crqfsSe"), dataSource1.data, "sel"); /* 그리드콤보*/
    return true; 
};

var cf_SetEventListenerMhshrm009 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm009 = gf_GridDetachEvent(dhxGridMhshrm009, eventIdMhshrm009);
    eventId = dhxGridMhshrm009.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm009();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm009.getColumnsNum();
            var rowNum = dhxGridMhshrm009.getRowsNum();
            var selectedId = dhxGridMhshrm009.getSelectedRowId();
            var ind        = dhxGridMhshrm009.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm009.getRowIndex(selectedId);
            var type       = dhxGridMhshrm009.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm009.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm009.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm009.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm009.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm009.getSelectedRowId();
            var ind        = dhxGridMhshrm009.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm009.getRowIndex(selectedId);
            var type       = dhxGridMhshrm009.getColType(ind);
            dhxGridMhshrm009.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm009.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm009.getSelectedRowId();
            var ind        = dhxGridMhshrm009.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm009.getRowIndex(selectedId);
            var type       = dhxGridMhshrm009.getColType(ind);
            dhxGridMhshrm009.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm009.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm009.push(eventId);
    eventId = dhxGridMhshrm009.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm009SortGridList(ind, type, direction); 
    });
    eventIdMhshrm009.push(eventId);
    eventId = dhxGridMhshrm009.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm009.push(eventId);
    var calendarEventIds = [];
    eventId = dhxGridMhshrm009.attachEvent("onRowSelect", function(id, ind){
    	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm009, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhshrm009, id, 'useBeginDe', 'grid');	
    		var pos = dhxGridMhshrm009.getPosition(this.cell);    		
    		dhxGridMhshrm009._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhshrm009._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhshrm009._grid_calendarA.setDate(strGridDate);
    		dhxGridMhshrm009._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm009._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMhshrm009._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( id, dhxGridMhshrm009._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
    	if(gf_DhxGetValue(dhxGridMhshrm009, id, 'useAt', 'grid') != '1'){
	    	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm009, 'datePickerButtonE')) { // calendar    		
	    		var strGridDate = gf_DhxGetValue(dhxGridMhshrm009, id, 'useEndDe', 'grid');	
	    		var pos = dhxGridMhshrm009.getPosition(this.cell);    		
	    		dhxGridMhshrm009._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
	    		dhxGridMhshrm009._grid_calendarA.loadUserLanguage("ko");
	    		dhxGridMhshrm009._grid_calendarA.setDate(strGridDate);
	    		dhxGridMhshrm009._grid_calendarA._show();    		
	    		calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm009._grid_calendarA, calendarEventIds);    		
	    		eventId = dhxGridMhshrm009._grid_calendarA.attachEvent('onClick', function(date) { 
	    			fn_gridPickerButtonSetDateE( id, dhxGridMhshrm009._grid_calendarA.getDate() );
	    		});
	    		calendarEventIds.push(eventId);    		
	    	}
    	}

    	var qualfAllwncAmt = gf_DhxGetValue(dhxGridMhshrm009, id, 'qualfAllwncAmt', 'grid');
    	if(qualfAllwncAmt > 0) {
    		dhxGridMhshrm009.cells(id,dhxGridMhshrm009.getColIndexById("allwncPymntAt")).setValue('1'); 
    	}
    	var recogScore = gf_DhxGetValue(dhxGridMhshrm009, id, 'recogScore', 'grid');
    	if(recogScore > 0) {
    		dhxGridMhshrm009.cells(id,dhxGridMhshrm009.getColIndexById("evlApplyAt")).setValue('1'); 
    	}
    });
    eventIdMhshrm009.push(eventId);
    eventId = dhxGridMhshrm009.attachEvent("onCheck", function(rId,cInd,state){
    	if(state == false && cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'useAt')) {
    		dhxGridMhshrm009.cells(rId,dhxGridMhshrm009.getColIndexById("useEndDe")).setValue(gv_Curdate); 
    	} else if(state == true && cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'useAt')) {
    		dhxGridMhshrm009.cells(rId,dhxGridMhshrm009.getColIndexById("useEndDe")).setValue(''); 
    	}
    	if(state == true && cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'allwncPymntAt')) {
    	} else if(state == false && cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'allwncPymntAt')) {
    		dhxGridMhshrm009.cells(rId,dhxGridMhshrm009.getColIndexById("qualfAllwncAmt")).setValue(''); 
    	}
    }); 
    eventId = dhxGridMhshrm009.attachEvent("onEditCell", function(stage, rId, cInd){
    	var state = dhxDataProcessorMhshrm009.getState(rId);
    	if(gf_DhxGetValue(dhxGridMhshrm009, rId, 'useAt', 'grid') == '1'){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'useEndDe')) { return false; }
        }
    	if(gf_DhxGetValue(dhxGridMhshrm009, rId, 'allwncPymntAt', 'grid') != '1'){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'qualfAllwncAmt')) { return false; }
        }
    	if(gf_DhxGetValue(dhxGridMhshrm009, rId, 'evlApplyAt', 'grid') != '1'){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'recogScore')) { return false; }
        }
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'crqfsCodeNo')) { return false; }
    	if(state != 'inserted'){
    		if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'crqfsCodeNo')) { return false; }
    		if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'crqfsSe')) { return false; }
    		if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm009, 'crqfsNm')) { return false; }
    	}
        return true;
    });
    eventIdMhshrm009.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm009()
    });
    $('#btnSaveMhshrm009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = dhxGridMhshrm009.getSelectedRowId();  //현재행 ID 
        var rowNum = dhxGridMhshrm009.getRowIndex(rowIds);
        dhxGridMhshrm009.selectRow(rowNum); 
        fn_SaveMhshrm009();
    });
    $('#btnRemoveMhshrm009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm009();
    });
    $('#btnExcelMhshrm009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm009();
    });
    $('#btnSearchMhshrm009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm009('');
    });
    $('#btnResetMhshrm009').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm009();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrm009').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrm009, $('#checkAllMhshrm009').prop('checked'), 'chk');
    });
    $('#searchFormMhshrm009 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm009').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMhshrm009 = function() {
    $('#searchFormMhshrm009').resetForm();
    gf_FormSetValue('searchFormMhshrm009', 'useAt', '1', 'combo');
    $('#crqfsNmSearchFormMhshrm009').focus();
};

var cf_SetBindingMhshrm009 = function() {
    fn_SearchMhshrm009('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm009 = function(userId) {
    var jsonParameter = {
    	crqfsSe : gf_FormGetValue('searchFormMhshrm009', 'crqfsSe', 'combo'),
    	crqfsNm : gf_FormGetValue('searchFormMhshrm009', 'crqfsNm', 'text'),
        useAt : gf_FormGetValue('searchFormMhshrm009', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm009/searchMhshrm009', jsonParameter, 'fn_CallbackSearchMhshrm009', false, 'GET');
};

var fn_CallbackSearchMhshrm009 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm009.clearAll();
    dhxGridMhshrm009.destructor();
    if(cf_SetComponentsMhshrm009()){ 
        fn_DhxDataProcessorMhshrm009(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm009');
            dhxGridMhshrm009.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrm009 == 0 && save_All_Sta_Mhshrm009 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm009.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm009 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm009.selectRow(0);
            } else if(save_All_Sta_Mhshrm009 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm009.selectRow(save_Row_Num_Mhshrm009); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm009.selectRow(save_Row_Num_Mhshrm009);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm009.findCell(save_Row_Ids_Mhshrm009, gf_GetDhxGridColumId(dhxGridMhshrm009,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm009.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm009.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm009');
        }
        $("#spanCntSearchFormMhshrm009").text(data.data.records.length);
        cf_SetEventListenerMhshrm009();
    } 
};
var fn_DhxDataProcessorMhshrm009 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm009 = new dataProcessor(gv_ContextPath+'/mhshrm009/saveMhshrm009'); //lock feed url
    dhxDataProcessorMhshrm009.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm009.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm009.init(dhxGridMhshrm009); //link dataprocessor to the grid
    dhxDataProcessorMhshrm009.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm009.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm009.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm009();
                    $("#checkAllMhshrm009").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 추가(신규) 
 */
var fn_AddMhshrm009 = function() {
    dhxGridMhshrm009.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push('자동입력'); //crqfsCodeNo
    initValueArr.push(''); //crqfsCodeNo
    initValueArr.push(''); //crqfsSe
    initValueArr.push(new Date().format('YYYY-MM-DD')); //crqfsNm
    initValueArr.push(''); //useBeginDe
    initValueArr.push(''); //useEndDe
    initValueArr.push(''); //useAt
    initValueArr.push('1'); //allwncPymntAt
    initValueArr.push(''); //qualfAllwncAmt
    initValueArr.push(''); //evlApplyAt
    initValueArr.push(''); //recogScore
    initValueArr.push(''); //rm
    dhxGridMhshrm009.addRow(dhxGridMhshrm009.uid(), initValueArr, 0);
    dhxGridMhshrm009.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm009');
    $('#btnPopEmpSearchMhshrm009').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm009SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm009, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm009', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm009', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm009, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm009.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm009', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm009', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm009, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm009.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm009', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm009', 'sortColumId', '', 'text'); 
            dhxGridMhshrm009.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm009.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm009', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm009', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm009, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm009 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm009 = 0; 
    save_Edt_Cnt_Mhshrm009 = 0; 
    save_Del_Cnt_Mhshrm009 = 0; 
    dhxGridMhshrm009.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm009.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm009.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm009 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm009 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm009 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        var confirmMsg  = ""; 
        var confirmMsg1 = ""; 
        var confirmMsg2 = ""; 
        var confirmMsg3 = ""; 
        save_All_Sta_Mhshrm009 = 0; 
        if(save_Add_Cnt_Mhshrm009 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm009 + "건";
            save_All_Sta_Mhshrm009 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm009 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm009 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm009 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm009 + "건"; 
            save_All_Sta_Mhshrm009 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm009(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm009(confirmMsg)){  //여기는 안옴
        } else {  
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm009 = function (msg) { 
    var result = false;
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
        	result = true;
            fn_SaveMhshrm009_Send();
        }else{ 
        	result = false;
        } 
    });
    return result; 
} 
var fn_SaveMhshrm009_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm009, dhxDataProcessorMhshrm009)) {
        dhxDataProcessorMhshrm009.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm009 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrm009, 'chk');
    var checkCrqfsCodeNo;
    var checkDelete = false;
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrm009.forEachRow(function(rowId) {
    		checkDelete = false;
        	state = dhxDataProcessorMhshrm009.getState(rowId);
            if(dhxGridMhshrm009.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrm009, 'chk')).isChecked()){
               	checkCrqfsCodeNo = gf_DhxGetValue(dhxGridMhshrm009, rowId, 'crqfsCodeNo', 'grid')
               	if(!fn_CheckDeleteDupMhshrm009(checkCrqfsCodeNo) && state != 'inserted'){
              		gf_DivMsgAlert("사용중인 코드가 존재합니다.");
            		checkDelete = true;
             	}
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrm009.getRowIndex(rowId);
                    dhxGridMhshrm009.deleteRow(rowId);
                    dhxGridMhshrm009.selectRow(rowNum);
                }
                else {
                	if(!checkDelete){
                		dhxDataProcessorMhshrm009.setUpdated(rowId, true, 'deleted');
                	}
                }
        	}
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrm009 = function () {
    var titMhshrm009 = '자격증코드관리'; /* gf_LocaleTrans('default', 'titMhshrm009') */
    var jsonParameter = {
        	crqfsSe : gf_FormGetValue('searchFormMhshrm009', 'crqfsSe', 'combo'),
        	crqfsNm : gf_FormGetValue('searchFormMhshrm009', 'crqfsNm', 'text'),
            useAt : gf_FormGetValue('searchFormMhshrm009', 'useAt', 'combo')
        };
    var header = [[
        '자격증코드번호' /* gf_LocaleTrans('default', 'titCrqfsCodeNo') */,
        '자격증 구분' /* gf_LocaleTrans('default', 'titCrqfsSe') */,
        '자격증이름' /* gf_LocaleTrans('default', 'titCrqfsNm') */,
        '사용시작일자' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일자' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '수당지급여부' /* gf_LocaleTrans('default', 'titAllwncPymntAt') */,
        '자격수당금액' /* gf_LocaleTrans('default', 'titQualfAllwncAmt') */,
        '인사평가반영여부' /* gf_LocaleTrans('default', 'titEvlApplyAt') */,
        '인정점수' /* gf_LocaleTrans('default', 'titRecogScore') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'crqfsCodeNo', 'crqfsSe', 'crqfsNm', 'useBeginDe', 'useEndDe', 'useAt', 'allwncPymntAt', 'qualfAllwncAmt', 'evlApplyAt', 'recogScore', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'left', 'center', 'center', 'center', 'center', 'right', 'center', 'right', 'left' ]];
    var sheetNm = [[ titMhshrm009 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm009;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm009/excelMhshrm009', jsonParameter);
};

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
		gf_DhxSetValue(dhxGridMhshrm009, rid, 'useBeginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm009.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhshrm009, rid, 'useEndDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm009.setUpdated(rid, true, 'updated');
	}	
}
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormMhshrm009 #crqfsCodeNoSaveFormMhshrm009').parent().append(
    '<div class="error" id="crqfsCodeNoSaveFormMhshrm009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm009 = function(crqfsSe, crqfsNm){
    if(!gf_IsNull(crqfsSe, crqfsNm)) {
        var jsonParameter = {
        	crqfsSe : crqfsSe,
        	crqfsNm : crqfsNm
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm009/findMhshrm009', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.crqfsCodeNo)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 사용여부 db 체크
 */
var fn_CheckDeleteDupMhshrm009 = function(crqfsCodeNo){
    if(!gf_IsNull(crqfsCodeNo)) {
        var jsonParameter = {
        	crqfsCodeNo : crqfsCodeNo
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm009/checkDeleteMhshrm009', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.useCheck)) {
                return true;
            } else {
                return false;
            }
        }
    }
}
/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkCrqfsCodeNo;
    var checkCrqfsSe;
    var checkCrqfsNm;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrm009 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrm009 = 0;
        save_Row_Ids_Mhshrm009 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrm009 = rowNum;
        save_Row_Ids_Mhshrm009 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm009 = rowNum;
        save_Row_Ids_Mhshrm009 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'crqfsSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsSe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'crqfsNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
                    valid = false;
                }
                if(valid && gf_DhxGetValue(dhxGridObjet, rowId, 'useAt', 'grid') != '1'){
                	if(gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid').replaceAll('-','')>gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid').replaceAll('-','')){
                		gf_DivMsgAlertClose();
    			        gf_DivMsgAlert("종료일자가 시작일자보다 앞설 수 없습니다.");
    	                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
    	                valid = false;
                	}
                }
                if(gf_DhxGetValue(dhxGridObjet, rowId, 'allwncPymntAt', 'grid') == '1'){
	                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'qualfAllwncAmt', 'grid') || !gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'qualfAllwncAmt', 'grid'), 1 ))){
	                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qualfAllwncAmt');
                        gf_DhxSetValue(dhxGridObjet, rowId, 'ddcUplmtAmt', '', 'grid');
	                    valid = false;
	                }
                    if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qualfAllwncAmt', 'grid') )){
                        fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qualfAllwncAmt');
                        valid = false;
                    }
                }
                if(gf_DhxGetValue(dhxGridObjet, rowId, 'evlApplyAt', 'grid') != '1'){
                	if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'recogScore', 'grid') || !gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'recogScore', 'grid'), 1 ))){
                        fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'recogScore');
                        gf_DhxSetValue(dhxGridObjet, rowId, 'recogScore', '', 'grid');
                        valid = false;
                    }
                    if(!gv_ValidateMethods.max( gf_DhxGetValue(dhxGridObjet, rowId, 'recogScore', 'grid'), 10 )){
                        fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'recogScore');
                        gf_DhxSetValue(dhxGridObjet, rowId, 'recogScore', '', 'grid');
                        valid = false;
                    }
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                	checkCrqfsSe = gf_DhxGetValue(dhxGridObjet, rowId, 'crqfsSe', 'grid');
                	checkCrqfsNm = gf_DhxGetValue(dhxGridObjet, rowId, 'crqfsNm', 'grid');
                    if(!gf_IsNull(checkCrqfsSe, checkCrqfsNm)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var crqfsSe = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'crqfsSe', 'grid');
                            var crqfsNm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'crqfsNm', 'grid');
                            if(((checkCrqfsSe == crqfsSe) && (checkCrqfsNm == crqfsNm)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsSe');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsNm');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm009( checkCrqfsSe, checkCrqfsNm)){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsSe');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsNm');
                            valid = false;
                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    }
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            } else {
            	checkCrqfsCodeNo = gf_DhxGetValue(dhxGridObjet, rowId, 'crqfsCodeNo', 'grid');
            	if(!fn_CheckDeleteDupMhshrm009(checkCrqfsCodeNo)){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crqfsCodeNo');
            		gf_DivMsgAlert("사용중인 코드가 존재합니다.");
            		dhxDataProcessorMhshrm009.setUpdated(rowId, true, '');
            		validFalseFistRowId = rowId;
            	}
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMhshrm009.selectRowById(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}
/**
 * 그리드 validation 빨간색 언더바
 */
var fn_GridValidationSelectCell = function(dhxGrid, dhxDataProcessor, rId, cInd){
    dhxGrid.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
            dhxGrid.forEachCell(rowId, function(cellObj, ind){
                dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
            });
        }
    });
    setTimeout(function(){
        dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
    },1);
}

var fn_DivMsgConfirm2 = function(message, callback){
	
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}
	
	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button class='btn_confirm' id='btnYesConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackTrue== 'string' ? callBackTrue : '' ) +"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
		   + "<button class='btn_confirm' id='btnNoConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackFalse== 'string' ? callBackFalse : '' ) +"'><span class='glyphicon glyphicon-ban-circle'></span>&nbsp;취소</button></p>"
		   + "</div>"
		   + "</div>";
	$("#message").html(str);
	$("#content_notice .btn_cancel").focus();
	
	if(typeof callback == 'function') {
		$("#btnYesConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			gf_DivMsgAlertClose();
			callback(true);
	    });

		$("#btnNoConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			gf_DivMsgAlertClose();
			callback(false);
	    });
	}
};