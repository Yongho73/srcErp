/**
 *    프로그램       : 직위관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.04
 *    사용테이블      : MHS_OFCPS_CODE
 * sourceGen version : 2020.07.16.01 (2020.08.04)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm015 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm015 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm015 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm015 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm015 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm015 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm015 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm015;  //그리드 객체
var eventIdMhshrm015 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm015;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm015();
    if(cf_SetComponentsMhshrm015()){
       cf_SetEventListenerMhshrm015();
       cf_InitFormMhshrm015();
       cf_SetBindingMhshrm015();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm015 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm015").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsMhshrm015 = function() {
    var dhxGridMhshrm015HeaderInfo = [];
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm015" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader('직위코드', '120', 'center', 'str', 'ed', false, 'ofcpsCode', '', '')); /* gf_LocaleTrans('default', 'titOfcpsCode') */
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader('직위', '*', 'left', 'str', 'ed', false, 'ofcpsNm', '', '')); /* gf_LocaleTrans('default', 'titOfcpsNm') */
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '120', 'center', 'date', 'dhxCalendarA', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'40','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '120', 'center', 'date', 'dhxCalendarA', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'40','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'na', 'ch', false, 'useAt', '', ''));
    dhxGridMhshrm015HeaderInfo.push(gf_MakeDhxGridHeader('정렬순서', '100', 'right', 'int', 'edn', false, 'sortOrdr', '', '')); /* gf_LocaleTrans('default', 'titSortOrdr') */
    dhxGridMhshrm015 = gf_MakeDhxGrid('dataListMhshrm015', dhxGridMhshrm015HeaderInfo, true, false, false);
    dhxGridMhshrm015.enableAutoWidth(false);
    dhxGridMhshrm015.setEditable(true);

    dhxGridMhshrm015.setColumnMinWidth(100,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    dhxGridMhshrm015.setDateFormat("%Y-%m-%d");
    return true; 
};

var cf_SetEventListenerMhshrm015 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm015 = gf_GridDetachEvent(dhxGridMhshrm015, eventIdMhshrm015);
    eventId = dhxGridMhshrm015.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm015();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm015.getColumnsNum();
            var rowNum = dhxGridMhshrm015.getRowsNum();
            var selectedId = dhxGridMhshrm015.getSelectedRowId();
            var ind        = dhxGridMhshrm015.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm015.getRowIndex(selectedId);
            var type       = dhxGridMhshrm015.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm015.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm015.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm015.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm015.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm015.getSelectedRowId();
            var ind        = dhxGridMhshrm015.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm015.getRowIndex(selectedId);
            var type       = dhxGridMhshrm015.getColType(ind);
            dhxGridMhshrm015.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm015.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm015.getSelectedRowId();
            var ind        = dhxGridMhshrm015.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm015.getRowIndex(selectedId);
            var type       = dhxGridMhshrm015.getColType(ind);
            dhxGridMhshrm015.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm015.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm015.push(eventId);
    eventId = dhxGridMhshrm015.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm015SortGridList(ind, type, direction); 
    });
    eventIdMhshrm015.push(eventId);
    eventId = dhxGridMhshrm015.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm015.push(eventId);
    var calendarEventIds = [];
    eventId = dhxGridMhshrm015.attachEvent("onRowSelect", function(id, ind){
    	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm015, 'datePickerButtonS')) { // calendar    
    		var strGridDate = gf_DhxGetValue(dhxGridMhshrm015, id, 'useBeginDe', 'grid');	
    		var pos = dhxGridMhshrm015.getPosition(this.cell);    		
    		dhxGridMhshrm015._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhshrm015._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhshrm015._grid_calendarA.setDate(strGridDate);
    		dhxGridMhshrm015._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm015._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMhshrm015._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( id, dhxGridMhshrm015._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
    	if(gf_DhxGetValue(dhxGridMhshrm015, id, 'useAt', 'grid') != '1'){
	    	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm015, 'datePickerButtonE')) { // calendar    		
	    		var strGridDate = gf_DhxGetValue(dhxGridMhshrm015, id, 'useEndDe', 'grid');	
	    		var pos = dhxGridMhshrm015.getPosition(this.cell);    		
	    		dhxGridMhshrm015._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
	    		dhxGridMhshrm015._grid_calendarA.loadUserLanguage("ko");
	    		dhxGridMhshrm015._grid_calendarA.setDate(strGridDate);
	    		dhxGridMhshrm015._grid_calendarA._show();    		
	    		calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm015._grid_calendarA, calendarEventIds);    		
	    		eventId = dhxGridMhshrm015._grid_calendarA.attachEvent('onClick', function(date) { 
	    			fn_gridPickerButtonSetDateE( id, dhxGridMhshrm015._grid_calendarA.getDate() );
	    		});
	    		calendarEventIds.push(eventId);    		
	    	}
    	}
    });
    eventIdMhshrm015.push(eventId);
    eventId = dhxGridMhshrm015.attachEvent("onCheck", function(rId,cInd,state){
    	if(state == false) {
    		dhxGridMhshrm015.cells(rId,dhxGridMhshrm015.getColIndexById("useEndDe")).setValue(gv_Curdate); 
    	} else if(state == true) {
    		dhxGridMhshrm015.cells(rId,dhxGridMhshrm015.getColIndexById("useEndDe")).setValue(''); 
    	}
    	if(gf_DhxGetValue(dhxGridMhshrm015, rId, 'useAt', 'grid') == '1'){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm015, 'datePickerButtonE')) { return false; }
        }
    	
    }); 
//    eventId = dhxGridMhshrm015.attachEvent("onEditCell", function(id, ind){
//    	 var state = dhxDataProcessorMhshrm015.getState(id);
//         if(state != "inserted"){
//         	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm015, 'ofcpsCode')) { return false; }
//         }
//         return true;
//    });
//    eventIdMhshrm015.push(eventId);
    
    eventId = dhxGridMhshrm015.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue, state){
        var state = dhxDataProcessorMhshrm015.getState(rId);
        if(state != "inserted"){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm015, 'ofcpsCode')) { return false; }
        }
    	if(gf_DhxGetValue(dhxGridMhshrm015, rId, 'useAt', 'grid') == '1'){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm015, 'useEndDe')) { return false; }
        }
    	
        
        return true;
    });
    eventIdMhshrm015.push(eventId);
    
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm015').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm015()
    });
    $('#btnSaveMhshrm015').unbind('click').bind('click', function() {
        gf_errorMsgClear();
    	dhxGridMhshrm015.selectRow(0);
        fn_SaveMhshrm015();
    });
    $('#btnRemoveMhshrm015').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm015();
    });
    $('#btnExcelMhshrm015').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm015();
    });
    $('#btnSearchMhshrm015').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm015('');
    });
    $('#btnResetMhshrm015').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm015();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrm015').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrm015, $('#checkAllMhshrm015').prop('checked'), 'chk');
    });
    $('#searchFormMhshrm015 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm015').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm015').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMhshrm015 = function() {
    $('#searchFormMhshrm015').resetForm();
    gf_FormSetValue('searchFormMhshrm015', 'useAt', '1', 'combo');
    $('#ofcpsNmSearchFormMhshrm015').focus();
};

var cf_SetBindingMhshrm015 = function() {
    fn_SearchMhshrm015('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm015 = function(userId) {
    var jsonParameter = {
        ofcpsNm : gf_FormGetValue('searchFormMhshrm015', 'ofcpsNm', 'text'),
        useAt : gf_FormGetValue('searchFormMhshrm015', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm015/searchMhshrm015', jsonParameter, 'fn_CallbackSearchMhshrm015', false, 'GET');
};

var fn_CallbackSearchMhshrm015 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm015.clearAll();
    dhxGridMhshrm015.destructor();
    if(cf_SetComponentsMhshrm015()){ 
        fn_DhxDataProcessorMhshrm015(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm015');
            dhxGridMhshrm015.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mhshrm015 == 0 && save_All_Sta_Mhshrm015 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm015.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm015 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm015.selectRow(0);
            } else if(save_All_Sta_Mhshrm015 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm015.selectRow(save_Row_Num_Mhshrm015); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm015.selectRow(save_Row_Num_Mhshrm015);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm015.findCell(save_Row_Ids_Mhshrm015, gf_GetDhxGridColumId(dhxGridMhshrm015,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm015.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm015.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm015');
        }
        $("#spanCntSearchFormMhshrm015").text(data.data.records.length);
        cf_SetEventListenerMhshrm015();
    } 
};
var fn_DhxDataProcessorMhshrm015 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm015 = new dataProcessor(gv_ContextPath+'/mhshrm015/saveMhshrm015'); //lock feed url
    dhxDataProcessorMhshrm015.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm015.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm015.init(dhxGridMhshrm015); //link dataprocessor to the grid
    dhxDataProcessorMhshrm015.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm015.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm015.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm015();
                    $("#checkAllMhshrm015").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMhshrm015 = function() {
    dhxGridMhshrm015.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //ofcpsCode
    initValueArr.push(''); //ofcpsNm
    initValueArr.push(gv_Curdate); //useBeginDe
    initValueArr.push(''); //useBeginDe
    initValueArr.push(''); //useEndDe
    initValueArr.push(''); //useEndDe
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //sortOrdr
    dhxGridMhshrm015.addRow(dhxGridMhshrm015.uid(), initValueArr, 0);
    dhxGridMhshrm015.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm015');
    $('#btnPopEmpSearchMhshrm015').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm015SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm015, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm015', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm015', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm015, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm015.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm015', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm015', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm015, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm015.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm015', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm015', 'sortColumId', '', 'text'); 
            dhxGridMhshrm015.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm015.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm015', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm015', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm015, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm015 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm015 = 0; 
    save_Edt_Cnt_Mhshrm015 = 0; 
    save_Del_Cnt_Mhshrm015 = 0; 
    dhxGridMhshrm015.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm015.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm015.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm015 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm015 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm015 += 1; 
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
        save_All_Sta_Mhshrm015 = 0; 
        if(save_Add_Cnt_Mhshrm015 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm015 + "건";
            save_All_Sta_Mhshrm015 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm015 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm015 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm015 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm015 + "건"; 
            save_All_Sta_Mhshrm015 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm015(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm015(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm015 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm015_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm015_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm015, dhxDataProcessorMhshrm015)) {
        dhxDataProcessorMhshrm015.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm015 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrm015, 'chk');
    var checkOfcpsCode;
    var checkDelete = false;
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrm015.forEachRow(function(rowId) {
    		checkDelete = false;
            state = dhxDataProcessorMhshrm015.getState(rowId);
            if(dhxGridMhshrm015.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrm015, 'chk')).isChecked()){
            	checkOfcpsCode = gf_DhxGetValue(dhxGridMhshrm015, rowId, 'ofcpsCode', 'grid')
               	if(!fn_CheckDeleteDupMhshrm015(checkOfcpsCode) && state != 'inserted'){
              		gf_DivMsgAlert("사용중인 코드가 존재합니다.");
            		checkDelete = true;
             	}
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrm015.getRowIndex(rowId);
                    dhxGridMhshrm015.deleteRow(rowId);
                    dhxGridMhshrm015.selectRow(rowNum);
                }
                else{
                	if(!checkDelete){
                		dhxDataProcessorMhshrm015.setUpdated(rowId, true, 'deleted');
                	}
                }
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrm015 = function () {
    var titMhshrm015 = '직위코드'; /* gf_LocaleTrans('default', 'titMhshrm015') */
    var jsonParameter = {
        ofcpsCode : gf_FormGetValue('searchFormMhshrm015', 'ofcpsCode', 'text')
    };
    var header = [[
        '직위코드' /* gf_LocaleTrans('default', 'titOfcpsCode') */,
        '직위' /* gf_LocaleTrans('default', 'titOfcpsNm') */,
        '사용시작일자' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일자' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '정렬순서' /* gf_LocaleTrans('default', 'titSortOrdr') */
    ]];
    var dataId = [[ 'ofcpsCode', 'ofcpsNm', 'useBeginDe', 'useEndDe', 'useAt', 'sortOrdr' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm015 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm015;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm015/excelMhshrm015', jsonParameter);
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
		gf_DhxSetValue(dhxGridMhshrm015, rid, 'useBeginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm015.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhshrm015, rid, 'useEndDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm015.setUpdated(rid, true, 'updated');
	}	
}
/**
 * 사용여부 db 체크
 */
var fn_CheckDeleteDupMhshrm015 = function(ofcpsCode){
    if(!gf_IsNull(ofcpsCode)) {
        var jsonParameter = {
        	ofcpsCode : ofcpsCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm015/checkDeleteMhshrm015', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.useCheck) && gf_IsNull(data.useCheck2)) {
                return true;
            } else {
                return false;
            }
        }
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
    $('#saveFormMhshrm015 #ofcpsCodeSaveFormMhshrm015').parent().append(
    '<div class="error" id="ofcpsCodeSaveFormMhshrm015-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm015 = function(ofcpsCode){
    if(!gf_IsNull(ofcpsCode)) {
        var jsonParameter = {
            ofcpsCode : ofcpsCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm015/findMhshrm015', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.ofcpsCode)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
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
    var checkOfcpsCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrm015 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrm015 = 0;
        save_Row_Ids_Mhshrm015 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrm015 = rowNum;
        save_Row_Ids_Mhshrm015 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm015 = rowNum;
        save_Row_Ids_Mhshrm015 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ofcpsCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ofcpsCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.digits( gf_DhxGetValue(dhxGridObjet, rowId, 'ofcpsCode', 'grid') )){
    				gf_DhxSetValue(dhxGridObjet, rowId, 'ofcpsCode', '', 'grid');
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ofcpsCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ofcpsNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ofcpsNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sortOrdr');
                    valid = false;
                }
                if(valid && !gv_ValidateMethods.digits( gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', 'grid') )){
    				gf_DhxSetValue(dhxGridObjet, rowId, 'sortOrdr', '', 'grid');
    				gf_DivMsgAlertClose();
    		        gf_DivMsgAlert("정렬순서는 숫자만 입력할 수 있습니다.");
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sortOrdr');
                    valid = false;
                }
                if(valid && gv_ValidateMethods.minlength( gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', 'grid'), 2 )){
    				gf_DhxSetValue(dhxGridObjet, rowId, 'sortOrdr', '', 'grid');
    				gf_DivMsgAlertClose();
    		        gf_DivMsgAlert("정렬순서는 숫자값이 너무 큽니다.");
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sortOrdr');
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
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkOfcpsCode = gf_DhxGetValue(dhxGridObjet, rowId, 'ofcpsCode', 'grid');
                    checkOfcpsNm = gf_DhxGetValue(dhxGridObjet, rowId, 'ofcpsNm', 'grid');
                    checkSortOrdr = gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', 'grid');
                    if(!gf_IsNull(checkOfcpsCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var ofcpsCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'ofcpsCode', 'grid');
                            var ofcpsNm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'ofcpsNm', 'grid');
                            var sortOrdr = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'sortOrdr', 'grid');
                            if(((ofcpsCode == checkOfcpsCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ofcpsCode');
                                valid = false;
                            }
                            if(((ofcpsNm == checkOfcpsNm)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ofcpsNm');
                                valid = false;
                            }
                            if(((sortOrdr == checkSortOrdr)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sortOrdr');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm015( checkOfcpsCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ofcpsCode');
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
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMhshrm015.selectRowById(validFalseFistRowId);
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
/**
 * alert 출력
 */
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