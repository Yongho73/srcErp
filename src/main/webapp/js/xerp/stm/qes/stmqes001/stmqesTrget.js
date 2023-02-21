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
var save_Row_Num_StmqesTrget = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_StmqesTrget = 0;  //그리드 위치 상태 
var save_All_Sta_StmqesTrget = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_StmqesTrget = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_StmqesTrget = 0;  //그리드 추가 수량 
var save_Edt_Cnt_StmqesTrget = 0;  //그리드 저장 수량 
var save_Del_Cnt_StmqesTrget = 0;  //그리드 삭제 수량 

var titMhsCrqfs = gf_LocaleTrans('default', 'titMhsCrqfs');
var g_FamilySearchValue = new Object();  // 정보 최초 조회 값
 

 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmqesTrget();
    cf_SetComponentsStmqesTrget();
    cf_SetEventListenerStmqesTrget();
    cf_InitFormStmqesTrget();
    cf_SetBindingStmqesTrget();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmqesTrget = function() {
//    gf_SetMenuPath();
//    $("#saveFormStmqesTrget").validate({ errorElement: 'div', ignore: '' });
	
    gf_ComboCode('divCombotrgetSe','trgetSe','trgetSe', 'sel', 'C198', '' , '', '', 'ordr', '','',''); // 처리상태
    
};

var dhxGridStmqesTrget;
var cf_SetComponentsStmqesTrget = function() {
    var dhxGridStmqesTrgetHeaderInfo = [];
    dhxGridStmqesTrgetHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmqesTrgetHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmqesTrget" />', '40', 'center', 'na', 'ch', true, 'chk', '', ''));
    dhxGridStmqesTrgetHeaderInfo.push(gf_MakeDhxGridHeader('설문조사코드', '*', 'center', 'str', 'ro', false, 'qestnarCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridStmqesTrgetHeaderInfo.push(gf_MakeDhxGridHeader('성명', '550', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridStmqesTrgetHeaderInfo.push(gf_MakeDhxGridHeader('설문조사대상순번', '0', 'center', 'str', 'ro', true, 'qestnarTrgetSn', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridStmqesTrgetHeaderInfo.push(gf_MakeDhxGridHeader('대상구분', '0', 'right', 'int', 'ro', true, 'trgetSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridStmqesTrgetHeaderInfo.push(gf_MakeDhxGridHeader('대상ID', '0', 'right', 'int', 'ro', true, 'trgterId', '', '')); /* gf_LocaleTrans('default', 'titCalcStdrSn') */
    dhxGridStmqesTrget = gf_MakeDhxGrid('dataListStmqesTrget', dhxGridStmqesTrgetHeaderInfo, true, false, false);
    dhxGridStmqesTrget.enableAutoWidth(false);
    dhxGridStmqesTrget.setEditable(false);

    dhxGridStmqesTrget.setColumnMinWidth(80,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
};

var eventIdStmqesTrget = [];
var cf_SetEventListenerStmqesTrget = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmqesTrget = gf_GridDetachEvent(dhxGridStmqesTrget, eventIdStmqesTrget);
    eventId = dhxGridStmqesTrget.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmqesTrget();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmqesTrget.getColumnsNum();
            var rowNum = dhxGridStmqesTrget.getRowsNum();
            var selectedId = dhxGridStmqesTrget.getSelectedRowId();
            var ind        = dhxGridStmqesTrget.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqesTrget.getRowIndex(selectedId);
            var type       = dhxGridStmqesTrget.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmqesTrget.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmqesTrget.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmqesTrget.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqesTrget.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmqesTrget.getSelectedRowId();
            var ind        = dhxGridStmqesTrget.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqesTrget.getRowIndex(selectedId);
            var type       = dhxGridStmqesTrget.getColType(ind);
            dhxGridStmqesTrget.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqesTrget.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmqesTrget.getSelectedRowId();
            var ind        = dhxGridStmqesTrget.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqesTrget.getRowIndex(selectedId);
            var type       = dhxGridStmqesTrget.getColType(ind);
            dhxGridStmqesTrget.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqesTrget.editCell();
            }
        }
        else return true;
    });
    eventIdStmqesTrget.push(eventId);
    eventId = dhxGridStmqesTrget.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_StmqesTrgetSortGridList(ind, type, direction); 
    });
    eventIdStmqesTrget.push(eventId);
    eventId = dhxGridStmqesTrget.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmqesTrget.push(eventId);
    eventId = dhxGridStmqesTrget.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdStmqesTrget.push(eventId);
    eventId = dhxGridStmqesTrget.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmqesTrget.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddtrget').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        
        var trgetSe = gf_FormGetValue('divCombotrgetSe', 'trgetSe', 'combo');
        if(trgetSe == '001'){
        	gf_DivMsgAlert("전체인 경우 추가를 하실수 없습니다.");
        	return false;
        } else if(trgetSe == '002'){
        	gf_MultiEmpPopup("dhxPopupGrid","empNo","korNm", "" , "N", "fn_CallbackSearchMultiEmp");
        } else if(trgetSe == '003'){
        	gf_DeptPopup("dhxPopupGrid","deptCode","deptCodeNm", "", "Y", "fn_SearchMhsEmpDeptCode");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
        } else if(trgetSe == '004'){
        	gf_RequestPopup('','','','', '', "N", "fn_CallbackGridPopComp");
        }
        
    });
    $('#btnSavetrget').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var trgetSe = gf_FormGetValue('divCombotrgetSe', 'trgetSe', 'combo');
        if(trgetSe == '001'){
        	gf_DivMsgAlert("전체인 경우 저장를 하실수 없습니다.");
        	return false;
        } else{
        	fn_SaveStmqesTrget();
        }
        
    });
    $('#btnRemovetrget').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var trgetSe = gf_FormGetValue('divCombotrgetSe', 'trgetSe', 'combo');
        if(trgetSe == '001'){
        	gf_DivMsgAlert("전체인 경우 삭제를 하실수 없습니다.");
        	return false;
        }else {
        	fn_RemoveStmqesTrget();
        }
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmqesTrget').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmqesTrget, $('#checkAllStmqesTrget').prop('checked'), 'chk');
    });
    $('#searchFormStmqesTrget input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmqesTrget').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrbStdr") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmqesTrget').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormStmqesTrget = function() {
    $('#searchFormStmqesTrget').resetForm();
};

var cf_SetBindingStmqesTrget = function() {
    fn_SearchStmqesTrget('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmqesTrget = function(userId) {
	
    var jsonParameter = {
    		qestnarCode : gf_FormGetValue('saveFormStmqesTrget', 'qestnarCode', 'text'),
//    		trgetSe : gf_FormGetValue('divCombotrgetSe', 'trgetSe', 'combo')
    };
    gf_Transaction(userId, 'stmqes001/searchStmqesTrget', jsonParameter, 'fn_CallbackSearchStmqesTrget', false, 'GET');
};

var dhxDataProcessorStmqesTrget;
var fn_CallbackSearchStmqesTrget = function(strSvcID, targetID, data) {
    dhxGridStmqesTrget.clearAll();
    fn_DhxDataProcessorStmqesTrget(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListStmqesTrget');
        dhxGridStmqesTrget.parse(data.data.records, 'js');
 
        if(save_Row_Ids_StmqesTrget == 0 && save_All_Sta_StmqesTrget == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridStmqesTrget.selectRow(0); 
        } else if(save_Row_Sta_StmqesTrget == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridStmqesTrget.selectRow(0);
        } else if(save_All_Sta_StmqesTrget == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridStmqesTrget.selectRow(save_Row_Num_StmqesTrget); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridStmqesTrget.selectRow(save_Row_Num_StmqesTrget);   //개발자 수정 필요  
            //var findCell = dhxGridStmqesTrget.findCell(save_Row_Ids_StmqesTrget, gf_GetDhxGridColumId(dhxGridStmqesTrget,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridStmqesTrget.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridStmqesTrget.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListStmqesTrget');
    }
    $("#spanCntSearchFormStmqesTrget").text(data.data.records.length);
    cf_SetEventListenerStmqesTrget();
};
var fn_DhxDataProcessorStmqesTrget = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmqesTrget = new dataProcessor(gv_ContextPath+'/stmqes001/saveStmqesTrget'); //lock feed url
    dhxDataProcessorStmqesTrget.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmqesTrget.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmqesTrget.init(dhxGridStmqesTrget); //link dataprocessor to the grid
    dhxDataProcessorStmqesTrget.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmqesTrget.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmqesTrget.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmqesTrget();
                    $("#checkAllStmqesTrget").prop('checked', false); //상단 체크박스 해제
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
var fn_AddStmqesTrget = function() {
    dhxGridStmqesTrget.clearSelection();
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
    dhxGridStmqesTrget.addRow(dhxGridStmqesTrget.uid(), initValueArr, 0);
    dhxGridStmqesTrget.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmqesTrget');
    $('#btnPopEmpSearchStmqesTrget').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_StmqesTrgetSortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmqesTrget, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmqesTrget', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmqesTrget', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmqesTrget, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmqesTrget.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmqesTrget', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmqesTrget', 'sortColumId', gf_GetDhxGridColum(dhxGridStmqesTrget, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmqesTrget.setSortImgState(false); 
            gf_FormSetValue('searchFormStmqesTrget', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmqesTrget', 'sortColumId', '', 'text'); 
            dhxGridStmqesTrget.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmqesTrget.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmqesTrget', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmqesTrget', 'sortColumId', gf_GetDhxGridColum(dhxGridStmqesTrget, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmqesTrget = function() {
    var edCnt = 0;
    save_Add_Cnt_StmqesTrget = 0; 
    save_Edt_Cnt_StmqesTrget = 0; 
    save_Del_Cnt_StmqesTrget = 0; 
    dhxGridStmqesTrget.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmqesTrget.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmqesTrget.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_StmqesTrget += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_StmqesTrget += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_StmqesTrget += 1; 
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
        save_All_Sta_StmqesTrget = 0; 
        if(save_Add_Cnt_StmqesTrget > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_StmqesTrget + "건";
            save_All_Sta_StmqesTrget = 1; 
        } 
        if(save_Edt_Cnt_StmqesTrget > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_StmqesTrget + "건"; 
        } 
        if(save_Del_Cnt_StmqesTrget > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_StmqesTrget + "건"; 
            save_All_Sta_StmqesTrget = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmqesTrget(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmqesTrget(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmqesTrget = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmqesTrget_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmqesTrget_Send = function() {
    if(fn_GridValidation(dhxGridStmqesTrget, dhxDataProcessorStmqesTrget)) {
        dhxDataProcessorStmqesTrget.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmqesTrget = function() {
    var rowId = dhxGridStmqesTrget.getSelectedRowId();
    var state = dhxDataProcessorStmqesTrget.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridStmqesTrget.getRowIndex(rowId);
        dhxGridStmqesTrget.deleteRow(rowId);
        dhxGridStmqesTrget.selectRow(rowNum);
        dhxGridStmqesTrget.selectRow(0);
    }
    else dhxDataProcessorStmqesTrget.setUpdated(rowId, true, 'deleted');
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
    $('#saveFormStmqesTrget #salarytyCodeSaveFormStmqesTrget').parent().append(
    '<div class="error" id="salarytyCodeSaveFormStmqesTrget-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmqesTrget = function(salarytyCode, salaryitemCode, applcStdrSn, calcStdrSn){
    if(!gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode) && !gf_IsNull(applcStdrSn) && !gf_IsNull(calcStdrSn)) {
        var jsonParameter = {
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
            applcStdrSn : applcStdrSn,
            calcStdrSn : calcStdrSn
        };
        var dataSource = gf_NoAsyncTransaction('mpscal022/findStmqesTrget', jsonParameter, 'GET');
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
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_StmqesTrget = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_StmqesTrget = 0;
        save_Row_Ids_StmqesTrget = "";
    } else if(state == 'inserted') {
        save_Row_Num_StmqesTrget = rowNum;
        save_Row_Ids_StmqesTrget = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_StmqesTrget = rowNum;
        save_Row_Ids_StmqesTrget = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qestnarCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qestnarCode');
                    valid = false;
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridStmqesTrget.selectRowById(validFalseFistRowId);
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

var $popupDtlRequestInfo = {};
var gf_RequestPopup = function(formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "그룹권한구분";
	var codeInfo = "popupDtlRequestInfo";	
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if ( !gf_IsNull(strCallbackFunc) ) {
		if(typeof(strCallbackFunc) == "string"){
		    	callFunction = eval(strCallbackFunc);
		    	if ( typeof callFunction != "function" ) {
		    		gf_DivMsgAlert("call back function "+ strCallbackFunc +" 이 구현되지 않습니다.!!");
		          	return false;
		        }
		}else{
		    	callFunction = strCallbackFunc;
		}
	}	
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$popupDtlRequestInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='popupDtlRequestPopup']").size() <= 0) {
		$('body').append("<div id='popupDtlRequestPopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupDtlRequestPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'popupDtlRequestPopup';
			var ajaxUrl = gv_ContextPath+'/stmqes001/pop/popupDtlRequest/view';
			var left	= 0;
			var top		= 0;
			var width	= 350;
			var height	= 480;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#popupDtlRequestPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($popupDtlRequestInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='popupDtlRequestPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
}


var fn_CallbackSearchMultiEmp = function(data){
	
	dhxGridStmqesTrget.forEachRow(function(index){
        for(row in data){
            if(gf_DhxGetValue(dhxGridStmqesTrget, index, 'korNm', 'grid') == data[row].korNm){
                delete data[row];
            }           
        }
    });

    for(row in data){
    	var valueArr = [];
    	valueArr.push('');
    	valueArr.push('');
    	valueArr.push('');
    	valueArr.push(data[row].korNm);
    	valueArr.push('');
    	valueArr.push('002');
    	valueArr.push(data[row].userId);          // USER ID 
    	
    	dhxGridStmqesTrget.addRow(dhxGridStmqesTrget.uid(), valueArr , 0);
    	dhxGridStmqesTrget.selectRow(0);
    	var qestnarCode =  gf_FormGetValue('saveFormStmqesTrget', 'qestnarCode', 'text');
		
    	dhxGridStmqesTrget.forEachRow(function(rowId) {
    		dhxGridStmqesTrget.cells(rowId, gf_GetDhxGridColumId(dhxGridStmqesTrget, 'qestnarCode')).setValue(qestnarCode);
    	});
    	gf_NoFoundDataOnGridMsgRemove('dataListStmqesTrget');

    	
    }
}

var fn_SearchMhsEmpDeptCode = function(data){
	
	dhxGridStmqesTrget.forEachRow(function(index){
        for(row in data){
            if(gf_DhxGetValue(dhxGridStmqesTrget, index, 'trgterId', 'grid') == data[row].orgnztNm){
                delete data[row];
            }           
        }
    });
	
	if(!gf_IsNull(data.deptCode)) {
		dhxGridStmqesTrget.clearAll();
		var valueArr = [];
    	valueArr.push('');
    	valueArr.push('');
    	valueArr.push('');
    	valueArr.push(data.orgnztNm);
    	valueArr.push('');
    	valueArr.push('003');
    	valueArr.push(data.orgnztCode);          // USER ID
		dhxGridStmqesTrget.addRow(dhxGridStmqesTrget.uid(), valueArr , 0);
    	
		var qestnarCode =  gf_FormGetValue('saveFormStmqesTrget', 'qestnarCode', 'text');
    	dhxGridStmqesTrget.forEachRow(function(rowId) {
    		dhxGridStmqesTrget.cells(rowId, gf_GetDhxGridColumId(dhxGridStmqesTrget, 'qestnarCode')).setValue(qestnarCode);
    	});
    	
    	gf_NoFoundDataOnGridMsgRemove('dataListStmqesTrget');
	}
}

var fn_CallbackGridPopComp = function(data){
	dhxGridStmqesTrget.forEachRow(function(index){
        for(row in data){
            if(gf_DhxGetValue(dhxGridStmqesTrget, index, 'trgterId', 'grid') == data[row].roleNm){
                delete data[row];
            }           
        }
    });
	console.log(data)
	if(!gf_IsNull(data.roleCode)) {
		dhxGridStmqesTrget.clearAll();
		var valueArr = [];
    	valueArr.push('');
    	valueArr.push('');
    	valueArr.push('');
    	valueArr.push(data.roleNm);
    	valueArr.push('');
    	valueArr.push('004');
    	valueArr.push(data.roleCode);          // USER ID
		dhxGridStmqesTrget.addRow(dhxGridStmqesTrget.uid(), valueArr , 0);
    	
		var qestnarCode =  gf_FormGetValue('saveFormStmqesTrget', 'qestnarCode', 'text');
		console.log(qestnarCode)
    	dhxGridStmqesTrget.forEachRow(function(rowId) {
    		dhxGridStmqesTrget.cells(rowId, gf_GetDhxGridColumId(dhxGridStmqesTrget, 'qestnarCode')).setValue(qestnarCode);
    	});
    	
    	gf_NoFoundDataOnGridMsgRemove('dataListStmqesTrget');
	}
}



