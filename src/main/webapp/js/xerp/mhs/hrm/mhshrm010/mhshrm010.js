/**
 *    프로그램       : 출장비기준코드 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.22
 *    사용테이블      : MHS_BSRPSTDR
 * sourceGen version : 2020.07.16.01 (2020.07.31)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm010 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm010 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm010 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm010 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm010 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm010 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm010 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm010;  //그리드 객체
var eventIdMhshrm010 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm010;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm010();
    if(cf_SetComponentsMhshrm010()){
       cf_SetEventListenerMhshrm010();
       cf_InitFormMhshrm010();
       cf_SetBindingMhshrm010();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm010 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm010").validate({ errorElement: 'div', ignore: '' });
    

    //직급
    gf_MakeComboBasic('clsfCodeSearchFormMhshrm010', 'clsfCode', 'search', '', 'mhshrm004/searchMhshrb004ClsfCodeCombo', '', 'clsfCode', 'clsfNm', '');
    //출장구분코드
    gf_ComboCode('bsrpSeCodeSearchFormMhshrm010', 'bsrpSeCode', 'bsrpSeCode', 'search', 'C024', '' , '', '', 'asc', '');
};

var cf_SetComponentsMhshrm010 = function() {
	var dhxGridMhshrm010HeaderInfo = [];
    dhxGridMhshrm010HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm010HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm010" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrm010HeaderInfo.push(gf_MakeDhxGridHeader('출장구분코드', '200', 'center', 'str', 'coro', false, 'bsrpSeCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridMhshrm010HeaderInfo.push(gf_MakeDhxGridHeader('직급코드', '200', 'center', 'str', 'coro', false, 'clsfCode', '', '')); /* gf_LocaleTrans('default', 'titClsfCode') */
    dhxGridMhshrm010HeaderInfo.push(gf_MakeDhxGridHeader('일비 금액', '*', 'right', 'int', 'edn', false, 'dayctAmt', '', '')); /* gf_LocaleTrans('default', 'titDayctAmt') */
    dhxGridMhshrm010HeaderInfo.push(gf_MakeDhxGridHeader('숙박비 금액', '250', 'right', 'int', 'edn', false, 'stayngctAmt', '', '')); /* gf_LocaleTrans('default', 'titStayngctAmt') */
    dhxGridMhshrm010HeaderInfo.push(gf_MakeDhxGridHeader('교통비 금액', '250', 'right', 'int', 'edn', false, 'trnsportctAmt', '', '')); /* gf_LocaleTrans('default', 'titTrnsportctAmt') */
    dhxGridMhshrm010HeaderInfo.push(gf_MakeDhxGridHeader('식대 금액', '250', 'right', 'int', 'edn', false, 'cgffdAmt', '', '')); /* gf_LocaleTrans('default', 'titCgffdAmt') */
    dhxGridMhshrm010 = gf_MakeDhxGrid('dataListMhshrm010', dhxGridMhshrm010HeaderInfo, true, false, false);
    dhxGridMhshrm010.enableAutoWidth(false);
    dhxGridMhshrm010.setEditable(true);

    dhxGridMhshrm010.setColumnMinWidth(100,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    dhxGridMhshrm010.setNumberFormat("0,000", dhxGridMhshrm010.getColIndexById("dayctAmt"), ".", ",");
    dhxGridMhshrm010.setNumberFormat("0,000", dhxGridMhshrm010.getColIndexById("stayngctAmt"), ".", ",");
    dhxGridMhshrm010.setNumberFormat("0,000", dhxGridMhshrm010.getColIndexById("trnsportctAmt"), ".", ",");
    dhxGridMhshrm010.setNumberFormat("0,000", dhxGridMhshrm010.getColIndexById("cgffdAmt"), ".", ",");

    //그리드 출장구분코드
    var jsonParameter1 = {codekindCode : "C024",exceptCode :"",sortOrder :"ordr" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, ''); //기존 코드조회 쿼리 사용 
    gf_ComboDataSet(dhxGridMhshrm010, dhxGridMhshrm010.getColIndexById("bsrpSeCode"), dataSource1.data, "sel"); /* 그리드콤보*/
    
    //그리드 직급
    var comboClsfCode = dhxGridMhshrm010.getCombo(3);
	gf_MakeComboGrid(comboClsfCode, 'sel', 'mhshrm004/searchMhshrb004ClsfCodeCombo', 'clsfCode', 'clsfNm', '');

    return true;  
};

var cf_SetEventListenerMhshrm010 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm010 = gf_GridDetachEvent(dhxGridMhshrm010, eventIdMhshrm010);
    eventId = dhxGridMhshrm010.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm010();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm010.getColumnsNum();
            var rowNum = dhxGridMhshrm010.getRowsNum();
            var selectedId = dhxGridMhshrm010.getSelectedRowId();
            var ind        = dhxGridMhshrm010.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm010.getRowIndex(selectedId);
            var type       = dhxGridMhshrm010.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm010.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm010.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm010.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm010.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm010.getSelectedRowId();
            var ind        = dhxGridMhshrm010.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm010.getRowIndex(selectedId);
            var type       = dhxGridMhshrm010.getColType(ind);
            dhxGridMhshrm010.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm010.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm010.getSelectedRowId();
            var ind        = dhxGridMhshrm010.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm010.getRowIndex(selectedId);
            var type       = dhxGridMhshrm010.getColType(ind);
            dhxGridMhshrm010.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm010.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm010.push(eventId);
    eventId = dhxGridMhshrm010.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm010SortGridList(ind, type, direction); 
    });
    eventIdMhshrm010.push(eventId);
    eventId = dhxGridMhshrm010.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm010.push(eventId);
    eventId = dhxGridMhshrm010.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm010.push(eventId);
    eventId = dhxGridMhshrm010.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        var state = dhxDataProcessorMhshrm010.getState(rId);
        if(state != "inserted"){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm010, 'clsfCode') || cInd == gf_GetDhxGridColumId(dhxGridMhshrm010, 'bsrpSeCode')) { return false; }
        }
        return true;
    });
    eventIdMhshrm010.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm010()
    });
    $('#btnSaveMhshrm010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = dhxGridMhshrm010.getSelectedRowId();  //현재행 ID 
        var rowNum = dhxGridMhshrm010.getRowIndex(rowIds);
        dhxGridMhshrm010.selectRow(rowNum); 
        fn_SaveMhshrm010();
    });
    $('#btnRemoveMhshrm010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm010();
    });
    $('#btnExcelMhshrm010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm010();
    });
    $('#btnSearchMhshrm010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm010('');
    });
    $('#btnResetMhshrm010').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm010();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrm010').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrm010, $('#checkAllMhshrm010').prop('checked'), 'chk');
    });
    $('#searchFormMhshrm010 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm010').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMhshrm010 = function() {
    $('#searchFormMhshrm010').resetForm();
};

var cf_SetBindingMhshrm010 = function() {
    fn_SearchMhshrm010('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm010 = function(userId) {
    var jsonParameter = {
        bsrpSeCode : gf_FormGetValue('searchFormMhshrm010', 'bsrpSeCode', 'combo'),
        clsfCode : gf_FormGetValue('searchFormMhshrm010', 'clsfCode', 'combo')
    };
    gf_Transaction(userId, 'mhshrm010/searchMhshrm010', jsonParameter, 'fn_CallbackSearchMhshrm010', false, 'GET');
};

var fn_CallbackSearchMhshrm010 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm010.clearAll();
    dhxGridMhshrm010.destructor();
    if(cf_SetComponentsMhshrm010()){ 
        fn_DhxDataProcessorMhshrm010(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm010');
            dhxGridMhshrm010.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrm010 == 0 && save_All_Sta_Mhshrm010 !== 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm010.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm010 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm010.selectRow(0);
            } else if(save_All_Sta_Mhshrm010 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm010.selectRow(save_Row_Num_Mhshrm010); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm010.selectRow(save_Row_Num_Mhshrm010);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm010.findCell(save_Row_Ids_Mhshrm010, gf_GetDhxGridColumId(dhxGridMhshrm010,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm010.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm010.selectRow(0);
                //} 
            } 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm010');
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhshrm010").text(data.data.records.length);
        cf_SetEventListenerMhshrm010();
    } 
};
var fn_DhxDataProcessorMhshrm010 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm010 = new dataProcessor(gv_ContextPath+'/mhshrm010/saveMhshrm010'); //lock feed url
    dhxDataProcessorMhshrm010.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm010.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm010.init(dhxGridMhshrm010); //link dataprocessor to the grid
    dhxDataProcessorMhshrm010.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm010.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm010.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm010();
                    $("#checkAllMhshrm010").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMhshrm010 = function() {
    dhxGridMhshrm010.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //bsrpSeCode
    initValueArr.push(''); //clsfCode
    initValueArr.push(''); //dayctAmt
    initValueArr.push(''); //stayngctAmt
    initValueArr.push(''); //trnsportctAmt
    initValueArr.push(''); //cgffdAmt
    dhxGridMhshrm010.addRow(dhxGridMhshrm010.uid(), initValueArr, 0);
    dhxGridMhshrm010.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm010');
    $('#btnPopEmpSearchMhshrm010').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm010SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm010, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm010', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm010', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm010, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm010.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm010', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm010', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm010, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm010.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm010', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm010', 'sortColumId', '', 'text'); 
            dhxGridMhshrm010.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm010.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm010', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm010', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm010, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm010 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm010 = 0; 
    save_Edt_Cnt_Mhshrm010 = 0; 
    save_Del_Cnt_Mhshrm010 = 0; 
    dhxGridMhshrm010.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm010.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm010.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm010 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm010 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm010 += 1; 
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
        save_All_Sta_Mhshrm010 = 0; 
        if(save_Add_Cnt_Mhshrm010 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm010 + "건";
            save_All_Sta_Mhshrm010 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm010 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm010 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm010 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm010 + "건"; 
            save_All_Sta_Mhshrm010 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm010(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm010(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm010 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm010_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm010_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm010, dhxDataProcessorMhshrm010)) {
        dhxDataProcessorMhshrm010.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm010 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrm010, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrm010.forEachRow(function(rowId) {
            state = dhxDataProcessorMhshrm010.getState(rowId);
            if(dhxGridMhshrm010.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrm010, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrm010.getRowIndex(rowId);
                    dhxGridMhshrm010.deleteRow(rowId);
                    dhxGridMhshrm010.selectRow(rowNum);
                }
                else dhxDataProcessorMhshrm010.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrm010 = function () {
    var titMhshrm010 = '개인정보조회'; /* gf_LocaleTrans('default', 'titMhshrm010') */
    var jsonParameter = {
        bsrpSeCode : gf_FormGetValue('searchFormMhshrm010', 'bsrpSeCode', 'text'),
        clsfCode : gf_FormGetValue('searchFormMhshrm010', 'clsfCode', 'text')
    };
    var header = [[
        '출장 구분코드' /* gf_LocaleTrans('default', 'titBsrpSeCode') */,
        '직급코드' /* gf_LocaleTrans('default', 'titClsfCode') */,
        '일비 금액' /* gf_LocaleTrans('default', 'titDayctAmt') */,
        '숙박비 금액' /* gf_LocaleTrans('default', 'titStayngctAmt') */,
        '교통비 금액' /* gf_LocaleTrans('default', 'titTrnsportctAmt') */,
        '식대 금액' /* gf_LocaleTrans('default', 'titCgffdAmt') */
    ]];
    var dataId = [[ 'bsrpSeCode', 'clsfCode', 'dayctAmt', 'stayngctAmt', 'trnsportctAmt', 'cgffdAmt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm010 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm010;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm010/excelMhshrm010', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    gf_DivMsgAlert("동일한 Key가 존재합니다.");
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm010 = function(bsrpSeCode, clsfCode){
    if(!gf_IsNull(bsrpSeCode) && !gf_IsNull(clsfCode)) {
        var jsonParameter = {
            bsrpSeCode : bsrpSeCode,
            clsfCode : clsfCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm010/findMhshrm010', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.bsrpSeCode) && gf_IsNull(data.clsfCode)) {
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
    var checkBsrpSeCode;
    var checkClsfCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrm010 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrm010 = 0;
        save_Row_Ids_Mhshrm010 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrm010 = rowNum;
        save_Row_Ids_Mhshrm010 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm010 = rowNum;
        save_Row_Ids_Mhshrm010 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bsrpSeCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bsrpSeCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'clsfCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'dayctAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dayctAmt');
                    valid = false;
                }
    			if(valid && !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'dayctAmt', 'grid') )){
    				gf_DivMsgAlert("일비 금액은 숫자만 입력 가능합니다.");
    				gf_DhxSetValue(dhxGridObjet, rowId, 'dayctAmt', '', 'grid');
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dayctAmt');
    				valid = false;
    			}
    			if(valid && (gf_DhxGetValue(dhxGridObjet, rowId, 'dayctAmt', 'grid')) <= 0 ){
    				if(valid){
    					gf_DivMsgAlert("일비 금액은 0보다  큰값을 입력하세요.");
    				}
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dayctAmt');
    				valid = false;
    			}
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'stayngctAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'stayngctAmt');
                    valid = false;
                }
    			if(valid && !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'stayngctAmt', 'grid') )){
    				gf_DivMsgAlert("숙박비 금액은 숫자만 입력 가능합니다.");
    				gf_DhxSetValue(dhxGridObjet, rowId, 'stayngctAmt', '', 'grid');
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'stayngctAmt');
    				valid = false;
    			}
    			if(valid && (gf_DhxGetValue(dhxGridObjet, rowId, 'stayngctAmt', 'grid')) <= 0 ){
    				if(valid){
    					gf_DivMsgAlert("숙박비 금액은 0보다  큰값을 입력하세요.");
    				}
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'stayngctAmt');
    				valid = false;
    			}
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'trnsportctAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'trnsportctAmt');
                    valid = false;
                }
    			if(valid && !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'trnsportctAmt', 'grid') )){
    				gf_DivMsgAlert("교통비 금액은 숫자만 입력 가능합니다.");
    				gf_DhxSetValue(dhxGridObjet, rowId, 'trnsportctAmt', '', 'grid');
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'trnsportctAmt');
    				valid = false;
    			}
    			if(valid && (gf_DhxGetValue(dhxGridObjet, rowId, 'trnsportctAmt', 'grid')) <= 0 ){
    				if(valid){
    					gf_DivMsgAlert("교통비 금액은 0보다  큰값을 입력하세요.");
    				}
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'trnsportctAmt');
    				valid = false;
    			}
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'cgffdAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cgffdAmt');
                    valid = false;
                }
    			if(valid && !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'cgffdAmt', 'grid') )){
    				if(valid){
        				gf_DivMsgAlert("식대 금액은 숫자만 입력 가능합니다.");
    				}
    				gf_DhxSetValue(dhxGridObjet, rowId, 'cgffdAmt', '', 'grid');
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cgffdAmt');
    				valid = false;
    			}
    			if(valid && (gf_DhxGetValue(dhxGridObjet, rowId, 'cgffdAmt', 'grid')) <= 0 ){
    				if(valid){
    					gf_DivMsgAlert("식대 금액은 0보다  큰값을 입력하세요.");
    				}
    				 fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cgffdAmt');
    				valid = false;
    			}
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkBsrpSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'bsrpSeCode', 'grid');
                    checkClsfCode = gf_DhxGetValue(dhxGridObjet, rowId, 'clsfCode', 'grid');
                    if(!gf_IsNull(checkBsrpSeCode, checkClsfCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var bsrpSeCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'bsrpSeCode', 'grid');
                            var clsfCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'clsfCode', 'grid');
                            if(((bsrpSeCode == checkBsrpSeCode) && (clsfCode == checkClsfCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bsrpSeCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm010( checkBsrpSeCode, checkClsfCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bsrpSeCode');
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
        dhxGridMhshrm010.selectRowById(validFalseFistRowId);
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
 *  alert창
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