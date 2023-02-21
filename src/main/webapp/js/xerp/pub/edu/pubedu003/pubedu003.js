/**
 *    프로그램       : 테스트 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.06.22
 *    사용테이블      : STM_CODEKIND
 * sourceGen version : 2021.02.18.01 (2021.06.22)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubedu003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubedu003 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubedu003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubedu003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Values_Pubedu003 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubedu003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubedu003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubedu003 = 0;  //그리드 삭제 수량 
var dhxGridPubedu003;  //그리드 객체
var eventIdPubedu003 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPubedu003;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPubedu003();
    if(cf_SetComponentsPubedu003()){
       cf_SetEventListenerPubedu003();
       cf_InitFormPubedu003();
       cf_SetBindingPubedu003();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubedu003 = function() {
    gf_SetMenuPath();
    $("#saveFormPubedu003").validate({ errorElement: 'div', ignore: '' });
	
};

var cf_SetComponentsPubedu003 = function() {
    var dhxGridPubedu003HeaderInfo = [];
    dhxGridPubedu003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubedu003HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPubedu003" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridPubedu003HeaderInfo.push(gf_MakeDhxGridHeader('코드종류 코드', '100', 'center', 'str', 'ed', false, 'codekindCode', '', '')); /* gf_LocaleTrans('default', 'titCodekindCode') */
    dhxGridPubedu003HeaderInfo.push(gf_MakeDhxGridHeader('코드종류명', '*', 'left', 'str', 'ed', false, 'codekindNm', '', '')); /* gf_LocaleTrans('default', 'titCodekindNm') */
    dhxGridPubedu003HeaderInfo.push(gf_MakeDhxGridHeader('코드길이', '100', 'right', 'int', 'ed', false, 'codeLt', '', '')); /* gf_LocaleTrans('default', 'titCodeLt') */
    dhxGridPubedu003HeaderInfo.push(gf_MakeDhxGridHeader('시스템구분코드', '100', 'center', 'str', 'ed', false, 'sysSe', '', '')); /* gf_LocaleTrans('default', 'titSysSe') */
    dhxGridPubedu003HeaderInfo.push(gf_MakeDhxGridHeader('코드설명', '100', 'left', 'str', 'ed', false, 'codeDc', '', '')); /* gf_LocaleTrans('default', 'titCodeDc') */
    dhxGridPubedu003 = gf_MakeDhxGrid('dataListPubedu003', dhxGridPubedu003HeaderInfo, true, false, false);
    dhxGridPubedu003.enableAutoWidth(false);
    dhxGridPubedu003.setEditable(true);

    dhxGridPubedu003.setColumnMinWidth(40,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerPubedu003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubedu003 = gf_GridDetachEvent(dhxGridPubedu003, eventIdPubedu003);
    eventId = dhxGridPubedu003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubedu003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubedu003.getColumnsNum();
            var rowNum = dhxGridPubedu003.getRowsNum();
            var selectedId = dhxGridPubedu003.getSelectedRowId();
            var ind        = dhxGridPubedu003.getSelectedCellIndex();
            var rowIndex   = dhxGridPubedu003.getRowIndex(selectedId);
            var type       = dhxGridPubedu003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubedu003.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubedu003.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubedu003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubedu003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubedu003.getSelectedRowId();
//alert(selectedId);
            var ind        = dhxGridPubedu003.getSelectedCellIndex();
//alert(ind);
            var rowIndex   = dhxGridPubedu003.getRowIndex(selectedId);
//alert(rowIndex);
			var type       = dhxGridPubedu003.getColType(ind);
//alert(type);			
            dhxGridPubedu003.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubedu003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubedu003.getSelectedRowId();
            var ind        = dhxGridPubedu003.getSelectedCellIndex();
            var rowIndex   = dhxGridPubedu003.getRowIndex(selectedId);
            var type       = dhxGridPubedu003.getColType(ind);
            dhxGridPubedu003.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubedu003.editCell();
            }
        }
        else return true;
    });
    eventIdPubedu003.push(eventId);
    eventId = dhxGridPubedu003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubedu003SortGridList(ind, type, direction); 
    });
    eventIdPubedu003.push(eventId);
    eventId = dhxGridPubedu003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubedu003.push(eventId);
    eventId = dhxGridPubedu003.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdPubedu003.push(eventId);
    eventId = dhxGridPubedu003.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdPubedu003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubedu003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPubedu003();
    });
    $('#btnSavePubedu003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubedu003();
    });
    $('#btnRemovePubedu003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubedu003();
    });
    $('#btnExcelPubedu003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubedu003();
    });
    $('#btnSearchPubedu003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubedu003('');
    });
    $('#btnResetPubedu003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubedu003();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPubedu003').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var nRows =dhxGridPubedu003.getRowsNum();
        for(var i = 0; i <nRows; i++) {
            dhxGridPubedu003.selectRow(i);
        }
        gf_DhxCheckAllGridHeader(dhxGridPubedu003, $('#checkAllPubedu003').prop('checked'), 'chk'); //속성갑 추가 
    });
    $('#searchFormPubedu003 input, select, button, textarea').unbind('keypress').bind('keypress',function() {  // 이벤트 제거 
        if(event.charCode == 13) { $('#btnSearchPubedu003').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubedu003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormPubedu003 = function() {
    $('#searchFormPubedu003').resetForm();
    gf_SetDataAuthorSe();
};

var cf_SetBindingPubedu003 = function() {
    fn_SearchPubedu003('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPubedu003 = function(userId) {
    var jsonParameter = {
        codekindCode : gf_FormGetValue('searchFormPubedu003', 'codekindCode', 'text')
    };
    gf_Transaction(userId, 'pubedu003/searchPubedu003', jsonParameter, 'fn_CallbackSearchPubedu003', false, 'GET');
};

var fn_CallbackSearchPubedu003 = function(strSvcID, targetID, data) {
    //dhxGridPubedu003.clearAll();
    dhxGridPubedu003.destructor();
    if(cf_SetComponentsPubedu003()){ 
        fn_DhxDataProcessorPubedu003(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPubedu003');
            dhxGridPubedu003.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pubedu003 == 0 && save_All_Sta_Pubedu003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPubedu003.selectRow(0); 
            } else if(save_Row_Sta_Pubedu003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPubedu003.selectRow(0);
            } else if(save_All_Sta_Pubedu003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPubedu003.selectRow(save_Row_Num_Pubedu003); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPubedu003.selectRow(save_Row_Num_Pubedu003);   //개발자 수정 필요  
                //var findCell = dhxGridPubedu003.findCell(save_Row_Values_Pubedu003, gf_GetDhxGridColumId(dhxGridPubedu003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPubedu003.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPubedu003.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListPubedu003');
        }
        $("#spanCntSearchFormPubedu003").text(data.data.records.length);
        cf_SetEventListenerPubedu003();
    } 
};
var fn_DhxDataProcessorPubedu003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubedu003 = new dataProcessor(gv_ContextPath+'/pubedu003/savePubedu003'); //lock feed url
    dhxDataProcessorPubedu003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubedu003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubedu003.init(dhxGridPubedu003); //link dataprocessor to the grid
    dhxDataProcessorPubedu003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubedu003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubedu003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubedu003();
                    $("#checkAllPubedu003").prop('checked', false); //상단 체크박스 해제
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
var fn_AddPubedu003 = function() {
    dhxGridPubedu003.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //codekindCode
    initValueArr.push(''); //codekindNm
    initValueArr.push(''); //codeLt
    initValueArr.push(''); //sysSe
    initValueArr.push(''); //codeDc
    dhxGridPubedu003.addRow(dhxGridPubedu003.uid(), initValueArr, 0);
    dhxGridPubedu003.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPubedu003');
    $('#btnPopEmpSearchPubedu003').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubedu003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubedu003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubedu003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubedu003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubedu003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubedu003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubedu003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubedu003', 'sortColumId', gf_GetDhxGridColum(dhxGridPubedu003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubedu003.setSortImgState(false); 
            gf_FormSetValue('searchFormPubedu003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubedu003', 'sortColumId', '', 'text'); 
            dhxGridPubedu003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false;
        } else { 
            dhxGridPubedu003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubedu003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubedu003', 'sortColumId', gf_GetDhxGridColum(dhxGridPubedu003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubedu003 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubedu003 = 0; 
    save_Edt_Cnt_Pubedu003 = 0; 
    save_Del_Cnt_Pubedu003 = 0; 
    dhxGridPubedu003.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubedu003.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubedu003.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubedu003 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubedu003 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubedu003 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        if(fn_GridValidation(dhxGridPubedu003, dhxDataProcessorPubedu003)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Pubedu003 = 0; 
            if(save_Add_Cnt_Pubedu003 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Pubedu003 + "건";
                save_All_Sta_Pubedu003 = 1; 
            } 
            if(save_Edt_Cnt_Pubedu003 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Pubedu003 + "건"; 
            } 
            if(save_Del_Cnt_Pubedu003 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Pubedu003 + "건"; 
                save_All_Sta_Pubedu003 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalPubedu003(gv_QueSave)){  //여기는 안옴 
            if(confirmModalPubedu003(confirmMsg)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 
    }
}
var confirmModalPubedu003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubedu003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubedu003_Send = function() {
    //if(fn_GridValidation(dhxGridPubedu003, dhxDataProcessorPubedu003)) {
        dhxDataProcessorPubedu003.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemovePubedu003 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubedu003, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridPubedu003.forEachRow(function(rowId) {
            state = dhxDataProcessorPubedu003.getState(rowId);
            if(dhxGridPubedu003.cells(rowId, gf_GetDhxGridColumId(dhxGridPubedu003, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridPubedu003.getRowIndex(rowId);
                    dhxGridPubedu003.deleteRow(rowId);
                    dhxGridPubedu003.selectRow(rowNum);
                }
                else dhxDataProcessorPubedu003.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubedu003 = function () {
    var titPubedu003 = '테스트'; /* gf_LocaleTrans('default', 'titPubedu003') */
    var jsonParameter = {
        codekindCode : gf_FormGetValue('searchFormPubedu003', 'codekindCode', 'text')
    };
    var header = [[
        '코드종류 코드' /* gf_LocaleTrans('default', 'titCodekindCode') */,
        '코드종류명' /* gf_LocaleTrans('default', 'titCodekindNm') */,
        '코드길이' /* gf_LocaleTrans('default', 'titCodeLt') */,
        '시스템구분코드(업무영역)' /* gf_LocaleTrans('default', 'titSysSe') */,
        '코드설명' /* gf_LocaleTrans('default', 'titCodeDc') */
    ]];
    var dataId = [[ 'codekindCode', 'codekindNm', 'codeLt', 'sysSe', 'codeDc' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPubedu003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubedu003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubedu003/excelPubedu003', jsonParameter);
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
    $('#saveFormPubedu003 #codekindCodeSaveFormPubedu003').parent().append(
    '<div class="error" id="codekindCodeSaveFormPubedu003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubedu003 = function(codekindCode){
    if(!gf_IsNull(codekindCode)) {
        var jsonParameter = {
            codekindCode : codekindCode
        };
        var dataSource = gf_NoAsyncTransaction('pubedu003/findPubedu003', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.codekindCode)) {
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
    var checkCodekindCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pubedu003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Pubedu003 = 0;
        save_Row_Ids_Pubedu003 = "";
        save_Row_Values_Pubedu003 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Pubedu003 = rowNum;
        save_Row_Ids_Pubedu003 = "";  
        save_Row_Values_Pubedu003 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubedu003 = rowNum;
        save_Row_Ids_Pubedu003 = rowIds; 
        save_Row_Values_Pubedu003 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'codekindCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codekindCode');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkCodekindCode = gf_DhxGetValue(dhxGridObjet, rowId, 'codekindCode', 'grid');
                    if(!gf_IsNull(checkCodekindCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var codekindCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'codekindCode', 'grid');
                            if(((codekindCode == checkCodekindCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codekindCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupPubedu003( checkCodekindCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codekindCode');
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
        dhxGridPubedu003.selectRowById(validFalseFistRowId);
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
