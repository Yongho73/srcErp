/**
 *    프로그램       : 공통코드관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.22
 *    사용테이블      : STM_CODE
 * sourceGen version : 2020.07.16.01 (2020.07.22)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmmng003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmmng003 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmmng003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmmng003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmmng003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmmng003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmmng003 = 0;  //그리드 삭제 수량 
var dhxGridStmmng003;  //그리드 객체
var eventIdStmmng003 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmmng003;  //DataProcessor 객체
 

var dhxGridCodeStmmng003;  //그리드 객체
var eventIdCodeStmmng003 = [];  //그리드 이벤트 객체 
var dhxDataProcessorCodeStmmng003;  //DataProcessor 객체
var save_Row_Num_Code_Stmmng003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Code_Stmmng003 = 0;  //그리드 위치 상태 
var save_All_Sta_Code_Stmmng003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Code_Stmmng003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Code_Stmmng003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Code_Stmmng003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Code_Stmmng003 = 0;  //그리드 삭제 수량 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmng003();
    if(cf_SetComponentsStmmng003()){
       cf_SetEventListenerStmmng003();
       cf_InitFormStmmng003();
       cf_SetBindingStmmng003();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmmng003 = function() {
    gf_SetMenuPath();
    $("#saveFormStmmng003").validate({ errorElement: 'div', ignore: '' });

    gf_ComboCode('divComboSysSeSearchFormStmCodekind', 'sysSeSearchFormStmCodeKind', 'sysSe', 'search', 'C001', '' , '', '', 'asc', '');
    gf_ComboCode('divComboSysSeSaveFormStmCodekind', 'sysSeSaveFormStmCodeKind', 'sysSe', 'add', 'C001', '' , '', '', 'asc', 'required');
};

var cf_SetComponentsStmmng003 = function() {
    var dhxGridStmmng003HeaderInfo = [];
    dhxGridStmmng003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmmng003" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드종류\n코드', '80', 'center', 'str', 'ro', false, 'codekindCode', '', '')); /* gf_LocaleTrans('default', 'titCodekindCode') */
    dhxGridStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드종류명', '*', 'left', 'str', 'ro', false, 'codekindNm', '', '')); /* gf_LocaleTrans('default', 'titCodekindNm') */
    dhxGridStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드길이', '100', 'right', 'int', 'ro', true, 'codeLt', '', '')); /* gf_LocaleTrans('default', 'titCodeLt') */
    dhxGridStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('시스템구분코드', '100', 'center', 'str', 'ro', true, 'sysSe', '', '')); /* gf_LocaleTrans('default', 'titSysSe') */
    dhxGridStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드설명', '100', 'left', 'str', 'ro', true, 'codeKindDc', '', '')); /* gf_LocaleTrans('default', 'titCodeDc') */
    dhxGridStmmng003 = gf_MakeDhxGrid('dataListStmmng003', dhxGridStmmng003HeaderInfo, true, false, false);
    dhxGridStmmng003.enableAutoWidth(false);
    dhxGridStmmng003.setEditable(true);

    dhxGridStmmng003.setColumnMinWidth(40,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    fn_SetComponentsCodeStmmng003();
    fn_SetEventListenerCodeStmmng003();
    return true; 
};

var cf_SetEventListenerStmmng003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmmng003 = gf_GridDetachEvent(dhxGridStmmng003, eventIdStmmng003);
    eventId = dhxGridStmmng003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng003SortGridList(ind, type, direction); 
    });
    eventIdStmmng003.push(eventId);
    eventId = dhxGridStmmng003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmmng003.push(eventId);
    eventId = dhxGridStmmng003.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindStmmng003();
    });
    eventIdStmmng003.push(eventId);
    eventId = dhxGridStmmng003.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmmng003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmmng003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmmng003()
    });
    $('#btnSaveStmmng003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmmng003();
    });
    $('#btnRemoveStmmng003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmmng003();
    });
    $('#btnExcelStmmng003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmmng003();
    });
    $('#btnSearchStmmng003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng003('');
    });
    $('#btnResetStmmng003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmng003();
    });
    //코드 버튼 이벤트
    $('#btnAddCode').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddCodeStmmng003()
    });
    $('#btnRemoveCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveCodeStmmng003();
    });
    $('#btnSaveCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveCodeStmmng003();
    });
    $('#btnUpdateCode').unbind('click').bind('click', function() {
    	gf_RefreshComboCode();
		gf_DivMsgAlert("업데이트 되었습니다.");
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmmng003').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmmng003, $('#checkAllStmmng003').prop('checked'), 'chk');
    });
    $('#searchFormStmmng003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmmng003').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmmng003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmmng003",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng003 input[name="codekindCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng003, dhxDataProcessorStmmng003, 'codekindCode', $(this).val());
    });
    $('#saveFormStmmng003 input[name="codekindNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng003, dhxDataProcessorStmmng003, 'codekindNm', $(this).val());
    });
    $('#saveFormStmmng003 input[name="codeLt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng003, dhxDataProcessorStmmng003, 'codeLt', $(this).val());
    });
    $('#saveFormStmmng003 select[name="sysSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng003, dhxDataProcessorStmmng003, 'sysSe', $(this).val());
    });
    $('#saveFormStmmng003 input[name="codeDc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng003, dhxDataProcessorStmmng003, 'codeKindDc', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmmng003 = function() {
    $('#searchFormStmmng003').resetForm();
};

var cf_SetBindingStmmng003 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmmng003('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmmng003 = function(userId) {
    var jsonParameter = {
        codekindCode : gf_FormGetValue('searchFormStmmng003', 'codekindCode', 'text'),
        codekindNm : gf_FormGetValue('searchFormStmmng003', 'codekindNm', 'text'),
        sysSe : gf_FormGetValue('searchFormStmmng003', 'sysSe', 'combo')
    };
    gf_Transaction(userId, 'stmmng003/searchStmmng003', jsonParameter, 'fn_CallbackSearchStmmng003', false, 'GET');
};

var fn_CallbackSearchStmmng003 = function(strSvcID, targetID, data) {
    //dhxGridStmmng003.clearAll();
    dhxGridStmmng003.destructor();
    if(cf_SetComponentsStmmng003()){ 
        fn_DhxDataProcessorStmmng003(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmmng003');
            dhxGridStmmng003.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmmng003 == 0 && save_All_Sta_Stmmng003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmmng003.selectRow(0); 
            } else if(save_Row_Sta_Stmmng003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmmng003.selectRow(0);
            } else if(save_All_Sta_Stmmng003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmmng003.selectRow(save_Row_Num_Stmmng003); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmmng003.selectRow(save_Row_Num_Stmmng003);   //개발자 수정 필요  
                //var findCell = dhxGridStmmng003.findCell(save_Row_Ids_Stmmng003, gf_GetDhxGridColumId(dhxGridStmmng003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmmng003.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmmng003.selectRow(0);
                //} 
            } 
 
            fn_FindStmmng003();
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmmng003');
            fn_InitInputFormStmmng003();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormStmmng003").text(data.data.records.length);
    } 
};
var fn_DhxDataProcessorStmmng003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmmng003 = new dataProcessor(gv_ContextPath+'/stmmng003/saveStmmng003'); //lock feed url
    dhxDataProcessorStmmng003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmmng003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmmng003.init(dhxGridStmmng003); //link dataprocessor to the grid
    dhxDataProcessorStmmng003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmmng003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmmng003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng003();
                    $("#checkAllStmmng003").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 상세조회
 */
var fn_FindStmmng003 = function() {
    var rId = dhxGridStmmng003.getSelectedRowId();
    var status = dhxDataProcessorStmmng003.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormStmmng003", "codekindCode", gf_DhxGetValue(dhxGridStmmng003, rId, 'codekindCode',  'grid'), '');
    gf_FormSetValue("saveFormStmmng003", "codekindNm", gf_DhxGetValue(dhxGridStmmng003, rId, 'codekindNm',  'grid'), '');
    gf_FormSetValue("saveFormStmmng003", "codeLt", gf_DhxGetValue(dhxGridStmmng003, rId, 'codeLt',  'grid'), '');
    gf_FormSetValue("saveFormStmmng003", "sysSe", gf_DhxGetValue(dhxGridStmmng003, rId, 'sysSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormStmmng003", "codeDc", gf_DhxGetValue(dhxGridStmmng003, rId, 'codeKindDc',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormStmmng003 input[name="codekindCode"]').prop('disabled', false);
        $('#code').hide();
    } else {
        $('#saveFormStmmng003 input[name="codekindCode"]').prop('disabled', true);
        $('#code').show();
        fn_SearchCodeStmmng003(gf_DhxGetValue(dhxGridStmmng003, rId, 'codekindCode',  'grid'));
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmmng003 = function() {
    $('#saveFormStmmng003 input[name="codekindCode"]').prop('disabled', false);
    $('#saveFormStmmng003').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmmng003 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddStmmng003 = function() {
    dhxGridStmmng003.clearSelection();
    fn_InitInputFormStmmng003();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //codekindCode
    initValueArr.push(''); //codekindNm
    initValueArr.push(''); //codeLt
    initValueArr.push(''); //sysSe
    initValueArr.push(''); //codeDc
    dhxGridStmmng003.addRow(dhxGridStmmng003.uid(), initValueArr, 0);
    dhxGridStmmng003.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmmng003');
    fn_FormDisabled(false);
    
    dhxGridCodeStmmng003.clearAll();
    $('#code').hide();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmmng003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmmng003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmmng003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmmng003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmmng003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmmng003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmmng003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmmng003', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmmng003.setSortImgState(false); 
            gf_FormSetValue('searchFormStmmng003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmmng003', 'sortColumId', '', 'text'); 
            dhxGridStmmng003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmmng003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmmng003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmmng003', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmmng003 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmmng003 = 0; 
    save_Edt_Cnt_Stmmng003 = 0; 
    save_Del_Cnt_Stmmng003 = 0; 
    dhxGridStmmng003.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmmng003.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmmng003.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmmng003 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmmng003 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmmng003 += 1; 
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
        save_All_Sta_Stmmng003 = 0; 
        if(save_Add_Cnt_Stmmng003 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmmng003 + "건";
            save_All_Sta_Stmmng003 = 1; 
        } 
        if(save_Edt_Cnt_Stmmng003 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmmng003 + "건"; 
        } 
        if(save_Del_Cnt_Stmmng003 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmmng003 + "건"; 
            save_All_Sta_Stmmng003 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmmng003(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmmng003(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmmng003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmmng003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmmng003_Send = function() {
    if(fn_GridValidation(dhxGridStmmng003, dhxDataProcessorStmmng003)) {
        dhxDataProcessorStmmng003.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmmng003 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmmng003, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmmng003.forEachRow(function(rowId) {
            state = dhxDataProcessorStmmng003.getState(rowId);
            if(dhxGridStmmng003.cells(rowId, gf_GetDhxGridColumId(dhxGridStmmng003, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmmng003.getRowIndex(rowId);
                    dhxGridStmmng003.deleteRow(rowId);
                    dhxGridStmmng003.selectRow(rowNum);
                    fn_FindStmmng003();
                }
                else dhxDataProcessorStmmng003.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmmng003 = function () {
    var titStmmng003 = '개인정보조회'; /* gf_LocaleTrans('default', 'titStmmng003') */
    var jsonParameter = {
        codekindCode : gf_FormGetValue('searchFormStmmng003', 'codekindCode', 'text')
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
    var sheetNm = [[ titStmmng003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmmng003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng003/excelStmmng003', jsonParameter);
};

/**
 * 코드 함수 구현(서브 그리드 함수 구현)
 */
var fn_SetComponentsCodeStmmng003 = function() {  
    
    var dhxGridCodeStmmng003HeaderInfo = [];
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum,'40', 'center', 'str', 'ro', false, 'codeNum', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllCodeStmmng003" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드종류','70', 'center', 'str', 'ro', false, 'codekind', '', '')); /* gf_LocaleTrans('default', 'titCodekindCode') */
//    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드값', 	 '70', 'center', 'str', 'edn', false, 'code', '', '')); /* gf_LocaleTrans('default', 'titCode') */
    

//    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드종류', 	'90', 'center', 'str', 'ro', false, 'codekindCode', '', 'NotEmpty')); // 코드종류 코드
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드값','50', 'center', 'str', 'ed', false, 'code', '', '')); // 코드
    
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('한글명','80', 'left', 'str', 'ed', false, 'codeKorNm', '', '')); /* gf_LocaleTrans('default', 'titCodeKorNm') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('영문명','80', 'left', 'str', 'ed', false, 'codeEngNm', '', '')); /* gf_LocaleTrans('default', 'titCodeEngNm') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('사용여부','60', 'center', 'na', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
//    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('순서', 		 '50', 'center', 'int', 'ed', false, 'ordr', '', '')); /* gf_LocaleTrans('default', 'titOrdr') */
    
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('순서','60','center', 'int', 'edn', false, 'ordr', '', 'ValidInteger,NotEmpty')); // 순서
    
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('코드설명','100', 'left', 'str', 'ed', false, 'codeDc', '', '')); /* gf_LocaleTrans('default', 'titCodeDc') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('제3국명','*', 'left', 'str', 'ed', false, 'codeThirdNm', '', '')); /* gf_LocaleTrans('default', 'titCodeThirdNm') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('디폴트여부','80', 'center', 'na', 'ch', false, 'dfltAt', '', '')); /* gf_LocaleTrans('default', 'titDfltAt') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('팩터','70', 'left', 'str', 'ed', false, 'factor', '', '')); /* gf_LocaleTrans('default', 'titFactor') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('참조값1','70', 'left', 'str', 'ed', false, 'refer1Dc', '', '')); /* gf_LocaleTrans('default', 'titRefer1Dc') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('참조값2','70', 'left', 'str', 'ed', false, 'refer2Dc', '', '')); /* gf_LocaleTrans('default', 'titRefer2Dc') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('참조값3','70', 'left', 'str', 'ed', false, 'refer3Dc', '', '')); /* gf_LocaleTrans('default', 'titRefer3Dc') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('참조값4','70', 'left', 'str', 'ed', false, 'refer4Dc', '', '')); /* gf_LocaleTrans('default', 'titRefer4Dc') */
    dhxGridCodeStmmng003HeaderInfo.push(gf_MakeDhxGridHeader('check','70', 'left', 'str', 'ed', true, 'regId', '', '')); /* gf_LocaleTrans('default', 'titRefer4Dc') */
    dhxGridCodeStmmng003 = gf_MakeDhxGrid('dataListCodeStmmng003', dhxGridCodeStmmng003HeaderInfo, true, false, false);
    dhxGridCodeStmmng003.enableAutoWidth(false);
    dhxGridCodeStmmng003.setEditable(true);

    dhxGridCodeStmmng003.setColumnMinWidth(80,9); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    return true; 
};

var fn_SetEventListenerCodeStmmng003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventCodeId;
    eventIdCodeStmmng003 = gf_GridDetachEvent(dhxGridCodeStmmng003, eventIdCodeStmmng003);
    eventCodeId = dhxGridCodeStmmng003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
//            fn_ExcelStmmng003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridCodeStmmng003.getColumnsNum();
            var rowNum = dhxGridCodeStmmng003.getRowsNum();
            var selectedId = dhxGridCodeStmmng003.getSelectedRowId();
            var ind        = dhxGridCodeStmmng003.getSelectedCellIndex();
            var rowIndex   = dhxGridCodeStmmng003.getRowIndex(selectedId);
            var type       = dhxGridCodeStmmng003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmmng003.selectRow(0);
                    //fn_FindStmmng003();
                    //rowIndex = 0;
                    return false;
                } else {
                	dhxGridCodeStmmng003.selectRow(rowIndex + 1);
//                    fn_FindStmmng003();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridCodeStmmng003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
            	dhxGridCodeStmmng003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridCodeStmmng003.getSelectedRowId();
            var ind        = dhxGridCodeStmmng003.getSelectedCellIndex();
            var rowIndex   = dhxGridCodeStmmng003.getRowIndex(selectedId);
            var type       = dhxGridCodeStmmng003.getColType(ind);
            dhxGridCodeStmmng003.selectCell(rowIndex+1, ind);
//            fn_FindStmmng003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
            	dhxGridCodeStmmng003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridCodeStmmng003.getSelectedRowId();
            var ind        = dhxGridCodeStmmng003.getSelectedCellIndex();
            var rowIndex   = dhxGridCodeStmmng003.getRowIndex(selectedId);
            var type       = dhxGridCodeStmmng003.getColType(ind);
            dhxGridCodeStmmng003.selectCell(rowIndex-1, ind);
//            fn_FindStmmng003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
            	dhxGridCodeStmmng003.editCell();
            }
        }
        else return true;
    });
    eventIdCodeStmmng003.push(eventCodeId);
    eventCodeId = dhxGridCodeStmmng003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng003SortGridList(ind, type, direction); 
    });
    eventIdCodeStmmng003.push(eventCodeId);
    eventCodeId = dhxGridCodeStmmng003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdCodeStmmng003.push(eventCodeId);
    eventCodeId = dhxGridCodeStmmng003.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	var sChk = gf_DhxGetValue(dhxGridCodeStmmng003, rId, 'regId', 'grid')
		if(cInd == gf_GetDhxGridColumId(dhxGridCodeStmmng003, 'code') && !gf_IsNull(sChk)) { return false; }
		return true;
    });
    
    
    eventIdCodeStmmng003.push(eventCodeId);
    // 버튼 이벤트 ==========================================================================================
    //코드 버튼 이벤트
    $('#btnAddCode').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddCodeStmmng003()
    });
    $('#btnRemoveCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveCodeStmmng003();
    });
    $('#btnSaveCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveCodeStmmng003();
    });
    $('#btnUpdateCode').unbind('click').bind('click', function() {
    	gf_RefreshComboCode();
		gf_DivMsgAlert("업데이트 되었습니다.");
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllCodeStmmng003').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridCodeStmmng003, $('#checkAllCodeStmmng003').prop('checked'), 'chk');
    });
};

var fn_SearchCodeStmmng003 = function(codekindCode) {
    var jsonParameter = {
        codekindCode : codekindCode
    };
    gf_Transaction(codekindCode, 'stmmng003/searchCodeStmmng003', jsonParameter, 'fn_CallbackSearchCodeStmmng003', false, 'GET');
};

var fn_CallbackSearchCodeStmmng003 = function(strSvcID, targetID, data) {
    //dhxGridStmmng003.clearAll();
    dhxGridCodeStmmng003.destructor();
    if(fn_SetComponentsCodeStmmng003()){ 
        fn_DhxDataProcessorCodeStmmng003(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListCodeStmmng003');
            dhxGridCodeStmmng003.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmmng003 == 0 && save_All_Sta_Stmmng003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridCodeStmmng003.selectRow(0); 
            } else if(save_Row_Sta_Stmmng003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            	dhxGridCodeStmmng003.selectRow(0);
            } else if(save_All_Sta_Stmmng003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            	dhxGridCodeStmmng003.selectRow(save_Row_Num_Stmmng003); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            	dhxGridCodeStmmng003.selectRow(save_Row_Num_Stmmng003);   //개발자 수정 필요  
                //var findCell = dhxGridStmmng003.findCell(save_Row_Ids_Stmmng003, gf_GetDhxGridColumId(dhxGridStmmng003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmmng003.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmmng003.selectRow(0);
                //} 
            } 
        } else {
            gf_NoFoundDataOnGridMsg('dataListCodeStmmng003');
//            fn_InitInputFormStmmng003();
        }
        $("#spanCntCodeSearchFormStmmng003").text(data.data.records.length);
        cf_SetEventListenerStmmng003();
        fn_SetEventListenerCodeStmmng003();
    } 
};
var fn_DhxDataProcessorCodeStmmng003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorCodeStmmng003 = new dataProcessor(gv_ContextPath+'/stmmng003/saveCodeStmmng003'); //lock feed url
    dhxDataProcessorCodeStmmng003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorCodeStmmng003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorCodeStmmng003.init(dhxGridCodeStmmng003); //link dataprocessor to the grid
    dhxDataProcessorCodeStmmng003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorCodeStmmng003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorCodeStmmng003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
//                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng003();
                    $("#checkAllCodeStmmng003").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};

var fn_AddCodeStmmng003 = function() {
	dhxGridCodeStmmng003.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(gf_FormGetValue('saveFormStmmng003', 'codekindCode', 'text')); //code
    initValueArr.push(''); //codekindCode
    initValueArr.push(''); //codeKorNm
    initValueArr.push(''); //codeEngNm
    initValueArr.push('1'); //codeDc
    initValueArr.push(''); //ordr
    initValueArr.push(''); //useAt
    initValueArr.push(''); //dfltAt
    initValueArr.push(''); //factor
    initValueArr.push(''); //refer1Dc
    initValueArr.push(''); //refer2Dc
    initValueArr.push(''); //refer3Dc
    initValueArr.push(''); //refer4Dc
    initValueArr.push(''); //codeThirdNm
    dhxGridCodeStmmng003.addRow(dhxGridCodeStmmng003.uid(), initValueArr, 0);
    dhxGridCodeStmmng003.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListCodeStmmng003');
    fn_FormDisabled(false);
    
    dhxGridCodeStmmng003.selectRow(0);
    dhxGridCodeStmmng003.selectCell(0, gf_GetDhxGridColumId(dhxGridCodeStmmng003,'code'));
    dhxGridCodeStmmng003.editCell();
}

var fn_RemoveCodeStmmng003 = function(){
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridCodeStmmng003, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridCodeStmmng003.forEachRow(function(rowId) {
            state = dhxDataProcessorCodeStmmng003.getState(rowId);
            if(dhxGridCodeStmmng003.cells(rowId, gf_GetDhxGridColumId(dhxGridCodeStmmng003, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridCodeStmmng003.getRowIndex(rowId);
                    dhxGridCodeStmmng003.deleteRow(rowId);
                    dhxGridCodeStmmng003.selectRow(rowNum);
//                    fn_FindStmmng003();
                }
                else dhxDataProcessorCodeStmmng003.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}

var fn_SaveCodeStmmng003 = function(){
	var edCnt = 0;
    save_Add_Cnt_Code_Stmmng003 = 0; 
    save_Edt_Cnt_Code_Stmmng003 = 0; 
    save_Del_Cnt_Code_Stmmng003 = 0; 
    dhxGridCodeStmmng003.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorCodeStmmng003.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorCodeStmmng003.getState(rowId); 
            if(state == 'deleted') { 
            	save_Del_Cnt_Code_Stmmng003 += 1; 
            } else if(state == 'inserted') { 
            	save_Add_Cnt_Code_Stmmng003 += 1; 
            } else if(state == 'updated') { 
            	save_Edt_Cnt_Code_Stmmng003 += 1; 
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
        save_All_Sta_Code_Stmmng003 = 0; 
        if(save_Add_Cnt_Code_Stmmng003 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Code_Stmmng003 + "건";
            save_All_Sta_Code_Stmmng003 = 1; 
        } 
        if(save_Edt_Cnt_Code_Stmmng003 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Code_Stmmng003 + "건"; 
        } 
        if(save_Del_Cnt_Code_Stmmng003 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Code_Stmmng003 + "건"; 
            save_All_Sta_Code_Stmmng003 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmmng003(gv_QueSave)){  //여기는 안옴 
        if(confirmModalCodeStmmng003(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalCodeStmmng003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveCodeStmmng003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveCodeStmmng003_Send = function() {
    if(fn_CodeGridValidation(dhxGridCodeStmmng003, dhxDataProcessorCodeStmmng003)) {
    	dhxDataProcessorCodeStmmng003.sendData();
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
    $('#saveFormStmmng003 #codekindCodeSaveFormStmmng003').parent().append(
    '<div class="error" id="codekindCodeSaveFormStmmng003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmmng003 = function(codekindCode){
    if(!gf_IsNull(codekindCode)) {
        var jsonParameter = {
            codekindCode : codekindCode
        };
        var dataSource = gf_NoAsyncTransaction('stmmng003/findStmmng003', jsonParameter, 'GET');
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
 * 폼데이터 db 체크
 */
var fn_FormValidation =  function(rowId){
    var state = dhxDataProcessorStmmng003.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmmng003').validate().form()){
                if(state == 'inserted') {
                    var codekindCode = gf_FormGetValue('saveFormStmmng003', 'codekindCode', 'text');
                    if(fn_CheckDupStmmng003(codekindCode)) return true;
                    else return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return true;
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
    save_Row_Sta_Stmmng003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmmng003 == 'deleted') {
        save_Row_Num_Stmmng003 = 0;
        save_Row_Ids_Stmmng003 = "";
    } else if(save_Row_Sta_Stmmng003 == 'inserted') {
        save_Row_Num_Stmmng003 = rowNum;
        save_Row_Ids_Stmmng003 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmmng003 = rowNum;
        save_Row_Ids_Stmmng003 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'codekindNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codekindNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'sysSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sysSe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'codeLt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codeLt');
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
                        if(!fn_CheckDupStmmng003( checkCodekindCode )){
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
        dhxGridStmmng003.selectRowById(validFalseFistRowId);
//        fn_FindStmmng003();
        fn_FormValidation(validFalseFistRowId);
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
 * 코드 validation 체크 / 서브 그리드 validation 체크
 */
var fn_CodeJqueryValidationToolTipForDuplicationKey = function(){
//    $('#saveFormStmmng003 #codeSaveFormStmmng003').parent().append(
//    '<div class="error" id="codeSaveFormStmmng003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
//    );
//    $('#saveFormStmmng003 #codekindCodeSaveFormStmmng003').parent().append(
//    '<div class="error" id="codekindSaveFormStmmng003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
//    );
}

var fn_CheckDupCodeStmmng003 = function(code, codekind){
    if(!gf_IsNull(code) && !gf_IsNull(codekind)) {
        var jsonParameter = {
            code : code,
            codekind : codekind
        };
        var dataSource = gf_NoAsyncTransaction('stmmng003/findCodeStmmng003', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.code) && gf_IsNull(data.codekindCode)) {
                return true;
            } else {
            	fn_CodeJqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
var fn_CodeGridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkCode;
    var checkCodekindCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Code_Stmmng003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmmng003 == 'deleted') {
        save_Row_Num_Code_Stmmng003 = 0;
        save_Row_Ids_Code_Stmmng003 = "";
    } else if(save_Row_Sta_Stmmng003 == 'inserted') {
        save_Row_Num_Code_Stmmng003 = rowNum;
        save_Row_Ids_Code_Stmmng003 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Code_Stmmng003 = rowNum;
        save_Row_Ids_Code_Stmmng003 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'codekind', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codekind');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'code', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'code');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'codeKorNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codeKorNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ordr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ordr');
                    valid = false;
                }
    			if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'ordr', 'grid') )){
    				gf_DhxSetValue(dhxGridObjet, rowId, 'ordr', '', 'grid');
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ordr');
    				valid = false;
    			}
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkCode = gf_DhxGetValue(dhxGridObjet, rowId, 'code', 'grid');
                    checkCodekindCode = gf_DhxGetValue(dhxGridObjet, rowId, 'codekind', 'grid');
                    if(!gf_IsNull(checkCode, checkCodekindCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var code = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'code', 'grid');
                            var codekind = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'codekind', 'grid');
                            if(((code == checkCode) && (codekind == checkCodekindCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'code');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codekind');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupCodeStmmng003( checkCode, checkCodekindCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'code');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'codekind');
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
        dhxGridStmmng003.selectRowById(validFalseFistRowId);
//        fn_FindStmmng003();
//        fn_FormValidation(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_CodeJqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}