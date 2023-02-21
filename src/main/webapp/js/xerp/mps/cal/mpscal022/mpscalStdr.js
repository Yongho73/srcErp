/**
 *    프로그램       : 급여관리_지급 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.10
 *    사용테이블      : MPS_CALC_STDR
 * sourceGen version : 2020.06.29.01 (2020.07.10)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_MpscalStdr = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MpscalStdr = 0;  //그리드 위치 상태 
var save_All_Sta_MpscalStdr = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MpscalStdr = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MpscalStdr = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MpscalStdr = 0;  //그리드 저장 수량 
var save_Del_Cnt_MpscalStdr = 0;  //그리드 삭제 수량 
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscalStdr();
    cf_SetComponentsMpscalStdr();
    cf_SetEventListenerMpscalStdr();
    cf_InitFormMpscalStdr();
    cf_SetBindingMpscalStdr();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscalStdr = function() {
//    gf_SetMenuPath();
//    $("#saveFormMpscalStdr").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMpscalStdr;
var cf_SetComponentsMpscalStdr = function() {
    var dhxGridMpscalStdrHeaderInfo = [];
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscalStdr" />', '40', 'center', 'na', 'ch', true, 'chk', '', ''));
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '*', 'center', 'str', 'coro', false, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '250', 'center', 'str', 'coro', false, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('적용기준순번', '0', 'right', 'int', 'ro', true, 'applcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('계산기준순번', '0', 'right', 'int', 'ro', true, 'calcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titCalcStdrSn') */
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('적용코드', '0', 'center', 'str', 'ro', true, 'applcCode', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('계산구분코드', '0', 'center', 'str', 'ro', true, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titCalcSe') */
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('지급금액', '500', 'right', 'str', 'edn', false, 'calcNomfrmDtls', '', '')); /* gf_LocaleTrans('default', 'titCalcNomfrmDtls') */
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('적용구분', '0', 'center', 'str', 'ro', true, 'applcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    dhxGridMpscalStdrHeaderInfo.push(gf_MakeDhxGridHeader('적용기준구분', '0', 'center', 'str', 'ro', true, 'applcStdrSe', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    dhxGridMpscalStdr = gf_MakeDhxGrid('dataListMpscalStdr', dhxGridMpscalStdrHeaderInfo, true, false, false);
    dhxGridMpscalStdr.enableAutoWidth(false);
    dhxGridMpscalStdr.setEditable(false);

    dhxGridMpscalStdr.setColumnMinWidth(250,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    // C062 급여유형
    var salarytyCodejsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"asc" };
    var salarytyCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', salarytyCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscalStdr, dhxGridMpscalStdr.getColIndexById("salarytyCode"), salarytyCodedataSource.data, "sel");
    
	//급여항목
	var comboSalaryitemCode = dhxGridMpscalStdr.getCombo(dhxGridMpscalStdr.getColIndexById("salaryitemCode"));
	gf_MakeComboGrid(comboSalaryitemCode, 'sel', 'mpsbsc002/combo/searchComboMpsbsc002List', 'key', 'value', ''); //급여항목 리스트
	
    dhxGridMpscalStdr.setNumberFormat("0,000", dhxGridMpscalStdr.getColIndexById("calcNomfrmDtls"), ".", ",");
    dhxGridMpscalStdr.enableEditEvents(true, false, false); // 원클릭, 더블클릭, F2key
};

var eventIdMpscalStdr = [];
var cf_SetEventListenerMpscalStdr = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscalStdr = gf_GridDetachEvent(dhxGridMpscalStdr, eventIdMpscalStdr);
    eventId = dhxGridMpscalStdr.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscalStdr();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscalStdr.getColumnsNum();
            var rowNum = dhxGridMpscalStdr.getRowsNum();
            var selectedId = dhxGridMpscalStdr.getSelectedRowId();
            var ind        = dhxGridMpscalStdr.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalStdr.getRowIndex(selectedId);
            var type       = dhxGridMpscalStdr.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscalStdr.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscalStdr.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscalStdr.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalStdr.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscalStdr.getSelectedRowId();
            var ind        = dhxGridMpscalStdr.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalStdr.getRowIndex(selectedId);
            var type       = dhxGridMpscalStdr.getColType(ind);
            dhxGridMpscalStdr.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalStdr.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscalStdr.getSelectedRowId();
            var ind        = dhxGridMpscalStdr.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalStdr.getRowIndex(selectedId);
            var type       = dhxGridMpscalStdr.getColType(ind);
            dhxGridMpscalStdr.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalStdr.editCell();
            }
        }
        else return true;
    });
    eventIdMpscalStdr.push(eventId);
    eventId = dhxGridMpscalStdr.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_MpscalStdrSortGridList(ind, type, direction); 
    });
    eventIdMpscalStdr.push(eventId);
    eventId = dhxGridMpscalStdr.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscalStdr.push(eventId);
    eventId = dhxGridMpscalStdr.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpscalStdr.push(eventId);
    eventId = dhxGridMpscalStdr.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscalStdr.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscalStdr').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscalStdr()
    });
    $('#btnSaveMpscalStdr').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpscalStdr();
    });
    $('#btnRemoveMpscalStdr').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscalStdr();
    });
    $('#btnExcelMpscalStdr').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscalStdr();
    });
    $('#btnSearchMpscalStdr').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscalStdr('');
    });
    $('#btnResetMpscalStdr').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscalStdr();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscalStdr').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscalStdr, $('#checkAllMpscalStdr').prop('checked'), 'chk');
    });
    $('#searchFormMpscalStdr input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpscalStdr').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrbStdr") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpscalStdr').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpscalStdr = function() {
    $('#searchFormMpscalStdr').resetForm();
};

var cf_SetBindingMpscalStdr = function() {
    fn_SearchMpscalStdr('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscalStdr = function(userId) {
	
    var jsonParameter = {
    		empno : gf_FormGetValue('searchFormMpscalStdr', 'empno', 'text')
    };
    gf_Transaction(userId, 'mpscal022/searchMpscalStdr', jsonParameter, 'fn_CallbackSearchMpscalStdr', false, 'GET');
};

var dhxDataProcessorMpscalStdr;
var fn_CallbackSearchMpscalStdr = function(strSvcID, targetID, data) {
    dhxGridMpscalStdr.clearAll();
    fn_DhxDataProcessorMpscalStdr(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscalStdr');
        dhxGridMpscalStdr.parse(data.data.records, 'js');
 
        if(save_Row_Ids_MpscalStdr == 0 && save_All_Sta_MpscalStdr == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscalStdr.selectRow(0); 
        } else if(save_Row_Sta_MpscalStdr == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscalStdr.selectRow(0);
        } else if(save_All_Sta_MpscalStdr == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscalStdr.selectRow(save_Row_Num_MpscalStdr); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscalStdr.selectRow(save_Row_Num_MpscalStdr);   //개발자 수정 필요  
            //var findCell = dhxGridMpscalStdr.findCell(save_Row_Ids_MpscalStdr, gf_GetDhxGridColumId(dhxGridMpscalStdr,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscalStdr.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscalStdr.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscalStdr');
    }
    $("#spanCntSearchFormMpscalStdr").text(data.data.records.length);
    cf_SetEventListenerMpscalStdr();
};
var fn_DhxDataProcessorMpscalStdr = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscalStdr = new dataProcessor(gv_ContextPath+'/mpscal022/saveMpscalStdr'); //lock feed url
    dhxDataProcessorMpscalStdr.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscalStdr.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscalStdr.init(dhxGridMpscalStdr); //link dataprocessor to the grid
    dhxDataProcessorMpscalStdr.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscalStdr.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscalStdr.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscalStdr();
                    $("#checkAllMpscalStdr").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpscalStdr = function() {
    dhxGridMpscalStdr.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //salarytyCode
    initValueArr.push(''); //salaryitemCode
    initValueArr.push(''); //applcStdrSn
    initValueArr.push(''); //calcStdrSn
    initValueArr.push(''); //applcCode
    initValueArr.push(''); //calcSe
    initValueArr.push(''); //calcNomfrmDtls
    initValueArr.push(''); //applcSe
    initValueArr.push(''); //applcStdrSe
    dhxGridMpscalStdr.addRow(dhxGridMpscalStdr.uid(), initValueArr, 0);
    dhxGridMpscalStdr.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscalStdr');
    $('#btnPopEmpSearchMpscalStdr').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_MpscalStdrSortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscalStdr, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscalStdr', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscalStdr', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscalStdr, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscalStdr.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscalStdr', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscalStdr', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscalStdr, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscalStdr.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscalStdr', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscalStdr', 'sortColumId', '', 'text'); 
            dhxGridMpscalStdr.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscalStdr.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscalStdr', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscalStdr', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscalStdr, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscalStdr = function() {
    var edCnt = 0;
    save_Add_Cnt_MpscalStdr = 0; 
    save_Edt_Cnt_MpscalStdr = 0; 
    save_Del_Cnt_MpscalStdr = 0; 
    dhxGridMpscalStdr.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscalStdr.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscalStdr.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MpscalStdr += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MpscalStdr += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MpscalStdr += 1; 
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
        save_All_Sta_MpscalStdr = 0; 
        if(save_Add_Cnt_MpscalStdr > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MpscalStdr + "건";
            save_All_Sta_MpscalStdr = 1; 
        } 
        if(save_Edt_Cnt_MpscalStdr > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MpscalStdr + "건"; 
        } 
        if(save_Del_Cnt_MpscalStdr > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MpscalStdr + "건"; 
            save_All_Sta_MpscalStdr = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscalStdr(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscalStdr(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscalStdr = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscalStdr_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscalStdr_Send = function() {
    if(fn_GridValidation(dhxGridMpscalStdr, dhxDataProcessorMpscalStdr)) {
        dhxDataProcessorMpscalStdr.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscalStdr = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscalStdr, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscalStdr.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscalStdr.getState(rowId);
            if(dhxGridMpscalStdr.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscalStdr, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscalStdr.getRowIndex(rowId);
                    dhxGridMpscalStdr.deleteRow(rowId);
                    dhxGridMpscalStdr.selectRow(rowNum);
                }
                else dhxDataProcessorMpscalStdr.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscalStdr = function () {
    var titMpscalStdr = '급여관리_지급'; /* gf_LocaleTrans('default', 'titMpscalStdr') */
    var jsonParameter = {
        salarytyCode : gf_FormGetValue('searchFormMpscalStdr', 'salarytyCode', 'text'),
        salaryitemCode : gf_FormGetValue('searchFormMpscalStdr', 'salaryitemCode', 'text'),
        applcStdrSn : gf_FormGetValue('searchFormMpscalStdr', 'applcStdrSn', 'text'),
        calcStdrSn : gf_FormGetValue('searchFormMpscalStdr', 'calcStdrSn', 'text')
    };
    var header = [[
        '급여유형코드(급여/상여/특별성과)' /* gf_LocaleTrans('default', 'titSalarytyCode') */,
        '급여항목코드' /* gf_LocaleTrans('default', 'titSalaryitemCode') */,
        '적용기준순번' /* gf_LocaleTrans('default', 'titApplcStdrSn') */,
        '계산기준순번' /* gf_LocaleTrans('default', 'titCalcStdrSn') */,
        '적용코드' /* gf_LocaleTrans('default', 'titApplcCode') */,
        '계산구분코드(C430) 계산식|금액' /* gf_LocaleTrans('default', 'titCalcSe') */,
        '계산수식내역' /* gf_LocaleTrans('default', 'titCalcNomfrmDtls') */,
        '적용구분' /* gf_LocaleTrans('default', 'titApplcSe') */
    ]];
    var dataId = [[ 'salarytyCode', 'salaryitemCode', 'applcStdrSn', 'calcStdrSn', 'applcCode', 'calcSe', 'calcNomfrmDtls', 'applcSe' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscalStdr ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscalStdr;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal022/excelMpscalStdr', jsonParameter);
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
    $('#saveFormMpscalStdr #salarytyCodeSaveFormMpscalStdr').parent().append(
    '<div class="error" id="salarytyCodeSaveFormMpscalStdr-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscalStdr #salaryitemCodeSaveFormMpscalStdr').parent().append(
    '<div class="error" id="salaryitemCodeSaveFormMpscalStdr-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscalStdr #applcStdrSnSaveFormMpscalStdr').parent().append(
    '<div class="error" id="applcStdrSnSaveFormMpscalStdr-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscalStdr #calcStdrSnSaveFormMpscalStdr').parent().append(
    '<div class="error" id="calcStdrSnSaveFormMpscalStdr-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscalStdr = function(salarytyCode, salaryitemCode, applcStdrSn, calcStdrSn){
    if(!gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode) && !gf_IsNull(applcStdrSn) && !gf_IsNull(calcStdrSn)) {
        var jsonParameter = {
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
            applcStdrSn : applcStdrSn,
            calcStdrSn : calcStdrSn
        };
        var dataSource = gf_NoAsyncTransaction('mpscal022/findMpscalStdr', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.salarytyCode) && gf_IsNull(data.salaryitemCode) && gf_IsNull(data.applcStdrSn) && gf_IsNull(data.calcStdrSn)) {
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
    var checkSalarytyCode;
    var checkSalaryitemCode;
    var checkApplcStdrSn;
    var checkCalcStdrSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_MpscalStdr = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_MpscalStdr = 0;
        save_Row_Ids_MpscalStdr = "";
    } else if(state == 'inserted') {
        save_Row_Num_MpscalStdr = rowNum;
        save_Row_Ids_MpscalStdr = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_MpscalStdr = rowNum;
        save_Row_Ids_MpscalStdr = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcStdrSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcStdrSn');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'calcStdrSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'calcStdrSn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkSalarytyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid');
                    checkSalaryitemCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid');
                    checkApplcStdrSn = gf_DhxGetValue(dhxGridObjet, rowId, 'applcStdrSn', 'grid');
                    checkCalcStdrSn = gf_DhxGetValue(dhxGridObjet, rowId, 'calcStdrSn', 'grid');
                    if(!gf_IsNull(checkSalarytyCode, checkSalaryitemCode, checkApplcStdrSn, checkCalcStdrSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var salarytyCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salarytyCode', 'grid');
                            var salaryitemCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salaryitemCode', 'grid');
                            var applcStdrSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcStdrSn', 'grid');
                            var calcStdrSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'calcStdrSn', 'grid');
                            if(((salarytyCode == checkSalarytyCode) && (salaryitemCode == checkSalaryitemCode) && (applcStdrSn == checkApplcStdrSn) && (calcStdrSn == checkCalcStdrSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcStdrSn');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'calcStdrSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscalStdr( checkSalarytyCode, checkSalaryitemCode, checkApplcStdrSn, checkCalcStdrSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcStdrSn');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'calcStdrSn');
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
        dhxGridMpscalStdr.selectRowById(validFalseFistRowId);
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
