/**
 *    프로그램       : 직급코드관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.26
 *    사용테이블      : MHS_CLSF_CODE
 * sourceGen version : 2020.07.16.01 (2020.08.26)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm004 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm004 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm004 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm004 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm004 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm004 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm004 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm004;  //그리드 객체
var eventIdMhshrm004 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm004;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm004();
    if(cf_SetComponentsMhshrm004()){
       cf_SetEventListenerMhshrm004();
       cf_InitFormMhshrm004();
       cf_SetBindingMhshrm004();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm004 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm004").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsMhshrm004 = function() {
    var dhxGridMhshrm004HeaderInfo = [];
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm004" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('직급코드', '100', 'center', 'str', 'ed', false, 'clsfCode', '', '')); /* gf_LocaleTrans('default', 'titClsfCode') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('직급', '100', 'left', 'str', 'ed', false, 'clsfNm', '', '')); /* gf_LocaleTrans('default', 'titClsfNm') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('직급표시명', '*', 'left', 'str', 'ed', false, 'clsfOutptNm', '', '')); /* gf_LocaleTrans('default', 'titClsfOutptNm') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '90', 'center', 'date', 'dhxCalendarA', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '90', 'center', 'date', 'dhxCalendarA', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '60', 'center', 'na', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('의무교육시간', '100', 'right', 'int', 'edn', false, 'clsfEduFinishPnt', '', '')); /* gf_LocaleTrans('default', 'titClsfEduFinishPnt') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('급여책정구분', '100', 'center', 'str', 'coro', false, 'salaryAprpSe', '', '')); /* gf_LocaleTrans('default', 'titSalaryAprpSe') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('승진 제한 기간', '100', 'left', 'str', 'ed', false, 'prmotLmttPd', '', '')); /* gf_LocaleTrans('default', 'titPrmotLmttPd') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('정렬순서', '60', 'right', 'int', 'edn', false, 'sortOrdr', '', '')); /* gf_LocaleTrans('default', 'titSortOrdr') */
    dhxGridMhshrm004HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '80', 'center', 'str', 'ro', true, 'regId', '', '')); /* gf_LocaleTrans('default', 'titSortOrdr') */
    dhxGridMhshrm004 = gf_MakeDhxGrid('dataListMhshrm004', dhxGridMhshrm004HeaderInfo, true, false, false);
    dhxGridMhshrm004.enableAutoWidth(false);
    dhxGridMhshrm004.setEditable(true);

    dhxGridMhshrm004.setDateFormat("%Y-%m-%d");
    dhxGridMhshrm004.setNumberFormat("0,000", dhxGridMhshrm004.getColIndexById("clsfEduFinishPnt"), ".", ",");
    dhxGridMhshrm004.setNumberFormat("0,000", dhxGridMhshrm004.getColIndexById("prmotLmttPd"), ".", ",");
    dhxGridMhshrm004.setNumberFormat("0,000", dhxGridMhshrm004.getColIndexById("sortOrdr"), ".", ",");
    
    //급여책정구분코드
    var jsonParameter1 = {codekindCode : "C067",exceptCode :"",sortOrder :"ordr" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhshrm004, dhxGridMhshrm004.getColIndexById("salaryAprpSe"), dataSource1.data, "sel"); /* 그리드콤보*/

    dhxGridMhshrm004.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrm004 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm004 = gf_GridDetachEvent(dhxGridMhshrm004, eventIdMhshrm004);
    eventId = dhxGridMhshrm004.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm004();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm004.getColumnsNum();
            var rowNum = dhxGridMhshrm004.getRowsNum();
            var selectedId = dhxGridMhshrm004.getSelectedRowId();
            var ind        = dhxGridMhshrm004.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm004.getRowIndex(selectedId);
            var type       = dhxGridMhshrm004.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm004.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm004.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm004.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm004.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm004.getSelectedRowId();
            var ind        = dhxGridMhshrm004.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm004.getRowIndex(selectedId);
            var type       = dhxGridMhshrm004.getColType(ind);
            dhxGridMhshrm004.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm004.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm004.getSelectedRowId();
            var ind        = dhxGridMhshrm004.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm004.getRowIndex(selectedId);
            var type       = dhxGridMhshrm004.getColType(ind);
            dhxGridMhshrm004.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm004.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm004.push(eventId);
    eventId = dhxGridMhshrm004.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm004SortGridList(ind, type, direction); 
    });
    eventIdMhshrm004.push(eventId);
    eventId = dhxGridMhshrm004.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm004.push(eventId);
    var calendarEventIds = [];
    eventId = dhxGridMhshrm004.attachEvent("onRowSelect", function(id, ind){
    	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm004, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhshrm004, id, 'useBeginDe', 'grid');	
    		var pos = dhxGridMhshrm004.getPosition(this.cell);    		
    		dhxGridMhshrm004._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhshrm004._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhshrm004._grid_calendarA.setDate(strGridDate);
    		dhxGridMhshrm004._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm004._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMhshrm004._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( id, dhxGridMhshrm004._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
	    if(ind == gf_GetDhxGridColumId(dhxGridMhshrm004, 'datePickerButtonE')) { // calendar    		
	    	var strGridDate = gf_DhxGetValue(dhxGridMhshrm004, id, 'useEndDe', 'grid');	
	    	var pos = dhxGridMhshrm004.getPosition(this.cell);    		
	    	dhxGridMhshrm004._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
	    	dhxGridMhshrm004._grid_calendarA.loadUserLanguage("ko");
	    	dhxGridMhshrm004._grid_calendarA.setDate(strGridDate);
	    	dhxGridMhshrm004._grid_calendarA._show();    		
	    	calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm004._grid_calendarA, calendarEventIds);    		
	    	eventId = dhxGridMhshrm004._grid_calendarA.attachEvent('onClick', function(date) { 
	    		fn_gridPickerButtonSetDateE( id, dhxGridMhshrm004._grid_calendarA.getDate() );
	    	});
	    	calendarEventIds.push(eventId);    		
	    }
    });
    
    eventId = dhxGridMhshrm004.attachEvent("onCheck", function(rId,cInd,state){
    	if(state == false && cInd == gf_GetDhxGridColumId(dhxGridMhshrm004, 'useAt')) {
    		dhxGridMhshrm004.cells(rId,dhxGridMhshrm004.getColIndexById("useEndDe")).setValue(gv_Curdate); 
    	} else if(state == true && cInd == gf_GetDhxGridColumId(dhxGridMhshrm004, 'useAt')) {
    		dhxGridMhshrm004.cells(rId,dhxGridMhshrm004.getColIndexById("useEndDe")).setValue(''); 
    	}
    });
    eventIdMhshrm004.push(eventId);
    
    
    eventId = dhxGridMhshrm004.attachEvent("onEditCell", function(stage, rId, cInd){
        var state = dhxDataProcessorMhshrm004.getState(rId); 
       	if(state != 'inserted'){
           	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm004, 'clsfCode')) { return false; }
        } 
       	return true;
    });
    eventIdMhshrm004.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm004()
    });
    $('#btnSaveMhshrm004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = dhxGridMhshrm004.getSelectedRowId();  //현재행 ID 
        var rowNum = dhxGridMhshrm004.getRowIndex(rowIds);
        dhxGridMhshrm004.selectRow(rowNum); 
        fn_SaveMhshrm004();
    });
    $('#btnRemoveMhshrm004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm004();
    });
    $('#btnExcelMhshrm004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm004();
    });
    $('#btnSearchMhshrm004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm004('');
    });
    $('#btnResetMhshrm004').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm004();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrm004').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrm004, $('#checkAllMhshrm004').prop('checked'), 'chk');
    });
    $('#searchFormMhshrm004 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm004').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMhshrm004 = function() {
    $('#searchFormMhshrm004').resetForm();
};

var cf_SetBindingMhshrm004 = function() {
    fn_SearchMhshrm004('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm004 = function(userId) {
    var jsonParameter = {
    	clsfNm : gf_FormGetValue('searchFormMhshrm004', 'clsfNm', 'text'),
        useAt  : gf_FormGetValue('searchFormMhshrm004', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm004/searchMhshrm004', jsonParameter, 'fn_CallbackSearchMhshrm004', false, 'GET');
};

var fn_CallbackSearchMhshrm004 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm004.clearAll();
    dhxGridMhshrm004.destructor();
    if(cf_SetComponentsMhshrm004()){ 
        fn_DhxDataProcessorMhshrm004(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm004');
            dhxGridMhshrm004.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrm004 == 0 && save_All_Sta_Mhshrm004 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm004.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm004 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm004.selectRow(0);
            } else if(save_All_Sta_Mhshrm004 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm004.selectRow(save_Row_Num_Mhshrm004); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm004.selectRow(save_Row_Num_Mhshrm004);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm004.findCell(save_Row_Ids_Mhshrm004, gf_GetDhxGridColumId(dhxGridMhshrm004,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm004.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm004.selectRow(0);
                //} 
            } 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm004');
        }
        $("#spanCntSearchFormMhshrm004").text(data.data.records.length);
        cf_SetEventListenerMhshrm004();
    } 
};
var fn_DhxDataProcessorMhshrm004 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm004 = new dataProcessor(gv_ContextPath+'/mhshrm004/saveMhshrm004'); //lock feed url
    dhxDataProcessorMhshrm004.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm004.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm004.init(dhxGridMhshrm004); //link dataprocessor to the grid
    dhxDataProcessorMhshrm004.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm004.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm004.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm004();
                    $("#checkAllMhshrm004").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMhshrm004 = function() {
    dhxGridMhshrm004.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //clsfCode
    initValueArr.push(''); //clsfNm
    initValueArr.push(''); //clsfOutptNm
    initValueArr.push(gv_Curdate); //useBeginDe
    initValueArr.push(''); //useBeginDe
    initValueArr.push(''); //useEndDe
    initValueArr.push(''); //useEndDe
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //sortOrdr
    initValueArr.push(''); //clsfEduFinishPnt
    initValueArr.push(''); //salaryAprpSe
    initValueArr.push(''); //prmotLmttPd
    initValueArr.push(''); //prmotLmttPd
    dhxGridMhshrm004.addRow(dhxGridMhshrm004.uid(), initValueArr, 0);
    dhxGridMhshrm004.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm004');
    $('#btnPopEmpSearchMhshrm004').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm004SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm004, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm004', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm004', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm004, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm004.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm004', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm004', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm004, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm004.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm004', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm004', 'sortColumId', '', 'text'); 
            dhxGridMhshrm004.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm004.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm004', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm004', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm004, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm004 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm004 = 0; 
    save_Edt_Cnt_Mhshrm004 = 0; 
    save_Del_Cnt_Mhshrm004 = 0; 
    dhxGridMhshrm004.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm004.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm004.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm004 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm004 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm004 += 1; 
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
        save_All_Sta_Mhshrm004 = 0; 
        if(save_Add_Cnt_Mhshrm004 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm004 + "건";
            save_All_Sta_Mhshrm004 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm004 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm004 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm004 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm004 + "건"; 
            save_All_Sta_Mhshrm004 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm004(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm004(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm004 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm004_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm004_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm004, dhxDataProcessorMhshrm004)) {
        dhxDataProcessorMhshrm004.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm004 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrm004, 'chk');
    var checkClsfCode;
    var useCheck;
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrm004.forEachRow(function(rowId) {
        	useCheck = false;
            state = dhxDataProcessorMhshrm004.getState(rowId);
            if(dhxGridMhshrm004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrm004, 'chk')).isChecked()){
            	checkClsfCode = gf_DhxGetValue(dhxGridMhshrm004, rowId, 'clsfCode', 'grid');
            	if(!fn_UseCheckMhshrm004(checkClsfCode) && state != 'inserted'){
            		gf_DivMsgAlert('사용중인 코드가 존재합니다.');
            		useCheck = true;
            	}
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrm004.getRowIndex(rowId);
                    dhxGridMhshrm004.deleteRow(rowId);
                    dhxGridMhshrm004.selectRow(rowNum);
                }
                else {
                	if(!useCheck){
                    	dhxDataProcessorMhshrm004.setUpdated(rowId, true, 'deleted');
                    }
                }
            }
        });
    }
}
/**
 * 사용여부 확인
 */
var fn_UseCheckMhshrm004 = function(clsfCode){
    if(!gf_IsNull(clsfCode)) {
        var jsonParameter = {
        	clsfCode : clsfCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm004/useCheckMhshrm004', jsonParameter, 'GET');
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
 * 엑셀다운로드
 */
var fn_ExcelMhshrm004 = function () {
    var titMhshrm004 = '직급코드관리'; /* gf_LocaleTrans('default', 'titMhshrm004') */
    var jsonParameter = {
        clsfCode : gf_FormGetValue('searchFormMhshrm004', 'clsfCode', 'text')
    };
    var header = [[
        '직급코드' /* gf_LocaleTrans('default', 'titClsfCode') */,
        '직급' /* gf_LocaleTrans('default', 'titClsfNm') */,
        '직급출력명' /* gf_LocaleTrans('default', 'titClsfOutptNm') */,
        '사용시작일자' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일자( 사용여부가 N이 입력될경우 종료일자가 들어가야함' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '정렬순서' /* gf_LocaleTrans('default', 'titSortOrdr') */,
        '직급 교육 이수 학점' /* gf_LocaleTrans('default', 'titClsfEduFinishPnt') */,
        '급여책정구분(C067)' /* gf_LocaleTrans('default', 'titSalaryAprpSe') */,
        '승진 제한 기간(년)' /* gf_LocaleTrans('default', 'titPrmotLmttPd') */
    ]];
    var dataId = [[ 'clsfCode', 'clsfNm', 'clsfOutptNm', 'useBeginDe', 'useEndDe', 'useAt', 'sortOrdr', 'clsfEduFinishPnt', 'salaryAprpSe', 'prmotLmttPd' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm004 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm004;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm004/excelMhshrm004', jsonParameter);
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
		gf_DhxSetValue(dhxGridMhshrm004, rid, 'useBeginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm004.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhshrm004, rid, 'useEndDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm004.setUpdated(rid, true, 'updated');
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
    $('#saveFormMhshrm004 #clsfCodeSaveFormMhshrm004').parent().append(
    '<div class="error" id="clsfCodeSaveFormMhshrm004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm004 = function(clsfCode){
    if(!gf_IsNull(clsfCode)) {
        var jsonParameter = {
            clsfCode : clsfCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm004/findMhshrm004', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.clsfCode)) {
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
    var checkClsfCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrm004 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrm004 = 0;
        save_Row_Ids_Mhshrm004 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrm004 = rowNum;
        save_Row_Ids_Mhshrm004 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm004 = rowNum;
        save_Row_Ids_Mhshrm004 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'clsfCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'clsfNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'clsfOutptNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfOutptNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sortOrdr');
                    valid = false;
                }
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', 'grid') )){
                    gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', '', 'grid')
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sortOrdr');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salaryAprpSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryAprpSe');
                    valid = false;
                }
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'salaryAprpSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryAprpSe');
                    gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', '', 'grid')
                    valid = false;
                }

                if(valid && gf_DhxGetValue(dhxGridObjet, rowId, 'useAt', 'grid') != '1'){
                	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid') )){
                        fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
                        valid = false;
                	} else {
	                	if(gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid').replaceAll('-','')>gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid').replaceAll('-','')){
	                		gf_DivMsgAlertClose();
	    			        gf_DivMsgAlert("종료일자가 시작일자보다 앞설 수 업습니다.");
	    	                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
	    	                valid = false;
	                	}
                	}
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkClsfCode = gf_DhxGetValue(dhxGridObjet, rowId, 'clsfCode', 'grid');
                    if(!gf_IsNull(checkClsfCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var clsfCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'clsfCode', 'grid');
                            if(((clsfCode == checkClsfCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm004( checkClsfCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCode');
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
        dhxGridMhshrm004.selectRowById(validFalseFistRowId);
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
