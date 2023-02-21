/**
 *    프로그램       : 상벌코드 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.27
 *    사용테이블      : MHS_RWDS_CODE
 * sourceGen version : 2020.07.16.01 (2020.08.27)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm012 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm012 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm012 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm012 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm012 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm012 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm012 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm012;  //그리드 객체
var eventIdMhshrm012 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm012;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm012();
    if(cf_SetComponentsMhshrm012()){
       cf_SetEventListenerMhshrm012();
       cf_InitFormMhshrm012();
       cf_SetBindingMhshrm012();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm012 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm012").validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('divComboRwdsSeCode', 'searchRwdsSeCode', 'searchRwdsSeCode', 'search', 'C023', '', '', '', 'orde', '', '')//상벌구분코드(검색)
};

var cf_SetComponentsMhshrm012 = function() {
    var dhxGridMhshrm012HeaderInfo = [];
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm012" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('상벌구분', '70', 'center', 'str', 'coro', false, 'rwdsSeCode', '', '')); /* gf_LocaleTrans('default', 'titRwdsSeCode') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('상벌코드', '80', 'center', 'str', 'ed', false, 'rwdsCode', '', '')); /* gf_LocaleTrans('default', 'titRwdsCode') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('상벌코드명', '120', 'left', 'str', 'ed', false, 'rwdsCodeNm', '', '')); /* gf_LocaleTrans('default', 'titRwdsCodeNm') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '80', 'center', 'date', 'dhxCalendarA', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '80', 'center', 'date', 'dhxCalendarA', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonE',false,'datePickerButtonE','',''));
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '70', 'center', 'na', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('중/경징계', '90', 'left', 'str', 'coro', false, 'dscplScale', '', '')); /* gf_LocaleTrans('default', 'titDscplScale') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('승진제한기간', '100', 'left', 'str', 'ed', false, 'prmotLmttPd', '', '')); /* gf_LocaleTrans('default', 'titPrmotLmttPd') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('급여감액기간', '100', 'left', 'str', 'ed', false, 'slyrdPd', '', '')); /* gf_LocaleTrans('default', 'titSlyrdPd') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('급여감액비율(%)', '110', 'right', 'int', 'edn', false, 'slyrdRt', '', '')); /* gf_LocaleTrans('default', 'titSlyrdRt') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('징계금액', '100', 'right', 'int', 'edn', false, 'dscplAmt', '', '')); /* gf_LocaleTrans('default', 'titDscplAmt') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhshrm012HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '*', 'left', 'str', 'ro', true, 'regId', '', ''));
    dhxGridMhshrm012 = gf_MakeDhxGrid('dataListMhshrm012', dhxGridMhshrm012HeaderInfo, true, false, false);
    dhxGridMhshrm012.enableAutoWidth(false);
    dhxGridMhshrm012.setEditable(true);
    
    //그리드 상벌구분
    var jsonParameter1 = {codekindCode : "C023",exceptCode :"",sortOrder :"ordr" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhshrm012, dhxGridMhshrm012.getColIndexById("rwdsSeCode"), dataSource1.data, "sel"); /* 그리드콤보*/
    //그리드 중/경징계 구분
    var jsonParameter1 = {codekindCode : "C211",exceptCode :"",sortOrder :"ordr" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhshrm012, dhxGridMhshrm012.getColIndexById("dscplScale"), dataSource1.data, "sel"); /* 그리드콤보*/
    

    dhxGridMhshrm012.setDateFormat("%Y-%m-%d");
    dhxGridMhshrm012.setNumberFormat("0,000", dhxGridMhshrm012.getColIndexById("prmotLmttPd"), ".", ",");
    dhxGridMhshrm012.setNumberFormat("0,000", dhxGridMhshrm012.getColIndexById("slyrdPd"), ".", ",");
    dhxGridMhshrm012.setNumberFormat("0,000", dhxGridMhshrm012.getColIndexById("dscplAmt"), ".", ",");

    dhxGridMhshrm012.setColumnMinWidth(40,15); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrm012 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm012 = gf_GridDetachEvent(dhxGridMhshrm012, eventIdMhshrm012);
    eventId = dhxGridMhshrm012.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm012();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm012.getColumnsNum();
            var rowNum = dhxGridMhshrm012.getRowsNum();
            var selectedId = dhxGridMhshrm012.getSelectedRowId();
            var ind        = dhxGridMhshrm012.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm012.getRowIndex(selectedId);
            var type       = dhxGridMhshrm012.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm012.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm012.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm012.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm012.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm012.getSelectedRowId();
            var ind        = dhxGridMhshrm012.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm012.getRowIndex(selectedId);
            var type       = dhxGridMhshrm012.getColType(ind);
            dhxGridMhshrm012.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm012.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm012.getSelectedRowId();
            var ind        = dhxGridMhshrm012.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm012.getRowIndex(selectedId);
            var type       = dhxGridMhshrm012.getColType(ind);
            dhxGridMhshrm012.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm012.editCell();
            }
        }
        else return true;
    });
    var calendarEventIds = [];
    eventId = dhxGridMhshrm012.attachEvent("onRowSelect", function(id, ind){
    	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm012, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMhshrm012, id, 'useBeginDe', 'grid');	
    		var pos = dhxGridMhshrm012.getPosition(this.cell);    		
    		dhxGridMhshrm012._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMhshrm012._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMhshrm012._grid_calendarA.setDate(strGridDate);
    		dhxGridMhshrm012._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm012._grid_calendarA, calendarEventIds);    		
    		eventId = dhxGridMhshrm012._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( id, dhxGridMhshrm012._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId);    		
    	}
	    if(ind == gf_GetDhxGridColumId(dhxGridMhshrm012, 'datePickerButtonE')) { // calendar    		
	    	var strGridDate = gf_DhxGetValue(dhxGridMhshrm012, id, 'useEndDe', 'grid');	
	    	var pos = dhxGridMhshrm012.getPosition(this.cell);    		
	    	dhxGridMhshrm012._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
	    	dhxGridMhshrm012._grid_calendarA.loadUserLanguage("ko");
	    	dhxGridMhshrm012._grid_calendarA.setDate(strGridDate);
	    	dhxGridMhshrm012._grid_calendarA._show();    		
	    	calendarEventIds = gf_GridDetachEvent(dhxGridMhshrm012._grid_calendarA, calendarEventIds);    		
	    	eventId = dhxGridMhshrm012._grid_calendarA.attachEvent('onClick', function(date) { 
	    		fn_gridPickerButtonSetDateE( id, dhxGridMhshrm012._grid_calendarA.getDate() );
	    	});
	    	calendarEventIds.push(eventId);    		
	    }
    });
    eventIdMhshrm012.push(eventId);
    eventId = dhxGridMhshrm012.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm012SortGridList(ind, type, direction); 
    });
    eventIdMhshrm012.push(eventId);
    eventId = dhxGridMhshrm012.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm012.push(eventId);
    eventId = dhxGridMhshrm012.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm012.push(eventId);
    eventId = dhxGridMhshrm012.attachEvent("onEditCell", function(stage, rId, cInd){
    	if(!gf_IsNull(gf_DhxGetValue(dhxGridMhshrm012, rId, 'regId', 'grid'))){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'rwdsSeCode')) { return false; }
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'rwdsCode')) { return false; }
        }
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'rwdsSeCode')){
    		if(gf_DhxGetValue(dhxGridMhshrm012, rId, 'rwdsSeCode', 'grid') == 'RW'){
    			gf_DhxSetValue(dhxGridMhshrm012, rId, 'dscplScale', '', 'grid');
    			gf_DhxSetValue(dhxGridMhshrm012, rId, 'prmotLmttPd', '', 'grid');
    			gf_DhxSetValue(dhxGridMhshrm012, rId, 'slyrdPd', '', 'grid');
    			gf_DhxSetValue(dhxGridMhshrm012, rId, 'slyrdRt', '', 'grid');
    			gf_DhxSetValue(dhxGridMhshrm012, rId, 'dscplAmt', '', 'grid');
    		} else if(gf_DhxGetValue(dhxGridMhshrm012, rId, 'rwdsSeCode', 'grid') == '' || gf_DhxGetValue(dhxGridMhshrm012, rId, 'rwdsSeCode', 'grid') == null){
				fn_GridValidationSelectCell(dhxGridMhshrm012, dhxDataProcessorMhshrm012, rId, 'rwdsSeCode');
			}
    	}
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'slyrdPd') || cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'slyrdRt') || cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'dscplAmt')
    			|| cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'prmotLmttPd') || cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'dscplScale')){
    		console.log(gf_DhxGetValue(dhxGridMhshrm012, rId, 'rwdsSeCode', 'grid'));
    		
    		if(gf_DhxGetValue(dhxGridMhshrm012, rId, 'rwdsSeCode', 'grid') != 'DS'){
    			if(gf_DhxGetValue(dhxGridMhshrm012, rId, 'rwdsSeCode', 'grid') == '' || gf_DhxGetValue(dhxGridMhshrm012, rId, 'rwdsSeCode', 'grid') == null){
    				fn_GridValidationSelectCell(dhxGridMhshrm012, dhxDataProcessorMhshrm012, rId, 'rwdsSeCode');
    			}
    			return false;
    		}
    	}
        return true;
    });
    eventIdMhshrm012.push(eventId);
    eventId = dhxGridMhshrm012.attachEvent("onCheck", function(rId,cInd,state){
    	if(state == false && cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'useAt')) {
    		dhxGridMhshrm012.cells(rId,dhxGridMhshrm012.getColIndexById("useEndDe")).setValue(gv_Curdate); 
    	} else if(state == true && cInd == gf_GetDhxGridColumId(dhxGridMhshrm012, 'useAt')) {
    		dhxGridMhshrm012.cells(rId,dhxGridMhshrm012.getColIndexById("useEndDe")).setValue(''); 
    	}
    }); 
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm012').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm012()
    });
    $('#btnSaveMhshrm012').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrm012();
    });
    $('#btnRemoveMhshrm012').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm012();
    });
    $('#btnExcelMhshrm012').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm012();
    });
    $('#btnSearchMhshrm012').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm012('');
    });
    $('#btnResetMhshrm012').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm012();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrm012').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrm012, $('#checkAllMhshrm012').prop('checked'), 'chk');
    });
    $('#searchFormMhshrm012 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm012').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm012').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMhshrm012 = function() {
    $('#searchFormMhshrm012').resetForm();
    $('#rwdsCodeNmSearchFormMhshrm012').focus();
};

var cf_SetBindingMhshrm012 = function() {
    fn_SearchMhshrm012('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm012 = function(userId) {
    var jsonParameter = {
        rwdsSeCode : gf_FormGetValue('searchFormMhshrm012', 'searchRwdsSeCode', 'combo'),
        rwdsCodeNm : gf_FormGetValue('searchFormMhshrm012', 'rwdsCodeNm', 'text'),
        useAt : gf_FormGetValue('searchFormMhshrm012', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm012/searchMhshrm012', jsonParameter, 'fn_CallbackSearchMhshrm012', false, 'GET');
};

var fn_CallbackSearchMhshrm012 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm012.clearAll();
    dhxGridMhshrm012.destructor();
    if(cf_SetComponentsMhshrm012()){ 
        fn_DhxDataProcessorMhshrm012(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm012');
            dhxGridMhshrm012.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mhshrm012 == 0 && save_All_Sta_Mhshrm012 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm012.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm012 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm012.selectRow(0);
            } else if(save_All_Sta_Mhshrm012 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm012.selectRow(save_Row_Num_Mhshrm012); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm012.selectRow(save_Row_Num_Mhshrm012);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm012.findCell(save_Row_Ids_Mhshrm012, gf_GetDhxGridColumId(dhxGridMhshrm012,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm012.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm012.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm012');
        }
        $("#spanCntSearchFormMhshrm012").text(data.data.records.length);
        cf_SetEventListenerMhshrm012();
    } 
};
var fn_DhxDataProcessorMhshrm012 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm012 = new dataProcessor(gv_ContextPath+'/mhshrm012/saveMhshrm012'); //lock feed url
    dhxDataProcessorMhshrm012.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm012.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm012.init(dhxGridMhshrm012); //link dataprocessor to the grid
    dhxDataProcessorMhshrm012.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm012.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm012.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm012();
                    $("#checkAllMhshrm012").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMhshrm012 = function() {
    dhxGridMhshrm012.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //rwdsSeCode
    initValueArr.push(''); //rwdsCode
    initValueArr.push(''); //rwdsCodeNm
    initValueArr.push(new Date().format('YYYY-MM-DD')); //useBeginDe
    initValueArr.push(''); //useBeginDe
    initValueArr.push(''); //useEndDe
    initValueArr.push(''); //useEndDe
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //dscplScale
    initValueArr.push(''); //prmotLmttPd
    initValueArr.push(''); //slyrdPd
    initValueArr.push(''); //slyrdRt
    initValueArr.push(''); //dscplAmt
    initValueArr.push(''); //rm
    dhxGridMhshrm012.addRow(dhxGridMhshrm012.uid(), initValueArr, 0);
    dhxGridMhshrm012.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm012');
    $('#btnPopEmpSearchMhshrm012').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm012SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm012, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm012', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm012', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm012, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm012.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm012', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm012', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm012, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm012.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm012', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm012', 'sortColumId', '', 'text'); 
            dhxGridMhshrm012.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm012.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm012', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm012', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm012, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm012 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm012 = 0; 
    save_Edt_Cnt_Mhshrm012 = 0; 
    save_Del_Cnt_Mhshrm012 = 0; 
    dhxGridMhshrm012.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm012.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm012.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm012 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm012 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm012 += 1; 
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
        save_All_Sta_Mhshrm012 = 0; 
        if(save_Add_Cnt_Mhshrm012 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm012 + "건";
            save_All_Sta_Mhshrm012 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm012 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm012 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm012 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm012 + "건"; 
            save_All_Sta_Mhshrm012 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm012(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm012(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm012 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm012_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm012_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm012, dhxDataProcessorMhshrm012)) {
        dhxDataProcessorMhshrm012.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm012 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrm012, 'chk');
    var checkRwdsCode;
    var useCheck;
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrm012.forEachRow(function(rowId) {
        	checkRwdsCode = false;
            state = dhxDataProcessorMhshrm012.getState(rowId);
            if(dhxGridMhshrm012.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrm012, 'chk')).isChecked()){
            	checkRwdsCode = gf_DhxGetValue(dhxGridMhshrm012, rowId, 'rwdsCode', 'grid');
            	if(!fn_UseCheckMhshrm012(checkRwdsCode) && state != 'inserted'){
            		gf_DivMsgAlert('사용중인 코드가 존재합니다.');
            		useCheck = true;
            	}
            	if(state == 'inserted') {
                    var rowNum = dhxGridMhshrm012.getRowIndex(rowId);
                    dhxGridMhshrm012.deleteRow(rowId);
                    dhxGridMhshrm012.selectRow(rowNum);
                }
                else {
                	if(!useCheck){
                		dhxDataProcessorMhshrm012.setUpdated(rowId, true, 'deleted');
                	}
                }
            }
        });
    }
}
/**
 * 사용여부 확인
 */
var fn_UseCheckMhshrm012 = function(rwdsCode){
    if(!gf_IsNull(rwdsCode)) {
        var jsonParameter = {
        		rwdsCode : rwdsCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm012/useCheckMhshrm012', jsonParameter, 'GET');
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
var fn_ExcelMhshrm012 = function () {
    var titMhshrm012 = '상벌코드'; /* gf_LocaleTrans('default', 'titMhshrm012') */
    var jsonParameter = {
        rwdsCode : gf_FormGetValue('searchFormMhshrm012', 'rwdsCode', 'text')
    };
    var header = [[
        '상벌 구분' /* gf_LocaleTrans('default', 'titRwdsSeCode') */,
        '상벌 코드' /* gf_LocaleTrans('default', 'titRwdsCode') */,
        '상벌 코드명' /* gf_LocaleTrans('default', 'titRwdsCodeNm') */,
        '사용시작일자' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일자' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '징계 규모(경중)' /* gf_LocaleTrans('default', 'titDscplScale') */,
        '승진 제한 기간(개월)' /* gf_LocaleTrans('default', 'titPrmotLmttPd') */,
        '급여 감액 기간(개월)' /* gf_LocaleTrans('default', 'titSlyrdPd') */,
        '급여 감액 비율(%)' /* gf_LocaleTrans('default', 'titSlyrdRt') */,
        '징계 금액' /* gf_LocaleTrans('default', 'titDscplAmt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'rwdsSeCodeNm', 'rwdsCode', 'rwdsCodeNm', 'useBeginDe', 'useEndDe', 'useAtNm', 'dscplScaleNm', 'prmotLmttPd', 'slyrdPd', 'slyrdRt', 'dscplAmt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm012 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm012;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm012/excelMhshrm012', jsonParameter);
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
		gf_DhxSetValue(dhxGridMhshrm012, rid, 'useBeginDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm012.setUpdated(rid, true, 'updated');
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
		gf_DhxSetValue(dhxGridMhshrm012, rid, 'useEndDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMhshrm012.setUpdated(rid, true, 'updated');
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
    $('#saveFormMhshrm012 #rwdsCodeSaveFormMhshrm012').parent().append(
    '<div class="error" id="rwdsCodeSaveFormMhshrm012-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm012 = function(rwdsCode){
    if(!gf_IsNull(rwdsCode)) {
        var jsonParameter = {
            rwdsCode : rwdsCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm012/findMhshrm012', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.rwdsCode)) {
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
    var checkRwdsCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    var checkNumLength = [ 0, 9.99]
    save_Row_Sta_Mhshrm012 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrm012 = 0;
        save_Row_Ids_Mhshrm012 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrm012 = rowNum;
        save_Row_Ids_Mhshrm012 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm012 = rowNum;
        save_Row_Ids_Mhshrm012 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'rwdsCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rwdsCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'rwdsSeCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rwdsSeCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'rwdsCodeNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rwdsCodeNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
                    valid = false;
                }
                if(valid&&!gf_IsNull(gf_DhxGetValue(dhxGridObjet, rowId, 'slyrdRt', 'grid'))){
                	if(!gv_ValidateMethods.range(gf_DhxGetValue(dhxGridObjet, rowId, 'slyrdRt', 'grid'), checkNumLength)){
                        fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'slyrdRt');
            			gf_DivMsgAlertClose();
                        gf_DivMsgAlert("10미만의 값만 입력 가능합니다.");
                        valid = false;
                	}
                }
                if(valid&&!gf_IsNull(gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid'))){
                	if(gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid').replaceAll('-','') > gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid').replaceAll('-','')){
                		fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
            			gf_DivMsgAlertClose();
                        gf_DivMsgAlert("종료일자가 시작일자보다 앞설 수 없습니다.");
                        valid = false;
                	}
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkRwdsCode = gf_DhxGetValue(dhxGridObjet, rowId, 'rwdsCode', 'grid');
                    if(!gf_IsNull(checkRwdsCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var rwdsCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'rwdsCode', 'grid');
                            if(((rwdsCode == checkRwdsCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rwdsCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm012( checkRwdsCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rwdsCode');
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
        dhxGridMhshrm012.selectRowById(validFalseFistRowId);
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