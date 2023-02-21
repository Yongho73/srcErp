/**
 *    프로그램       : 근무유형관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.19
 *    사용테이블      : MHS_WORKTY
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhsflx001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhsflx001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhsflx001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhsflx001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhsflx001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhsflx001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhsflx001 = 0;  //그리드 삭제 수량 

var dhxGridMhsflx001;
var eventIdMhsflx001 = [];
var dhxDataProcessorMhsflx001;
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhsflx001();
    if(cf_SetComponentsMhsflx001()){
        cf_SetEventListenerMhsflx001();
        cf_InitFormMhsflx001();
        cf_SetBindingMhsflx001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhsflx001 = function() {
    gf_SetMenuPath();
    $("#saveFormMhsflx001").validate({ errorElement: 'div', ignore: '' });
    
    //산정기간 1
    gf_ComboCode('divInputFormComboCalcPd01Mhsflx001', 'calcPd01Mhsflx001', 'calcPd01Mhsflx001', 'add', 'C183', '' , '', '', 'ordr', '');
    //산정기간 2
    gf_ComboCode('divInputFormComboCalcPd02Mhsflx001', 'calcPd02Mhsflx001', 'calcPd02Mhsflx001', 'add', 'C184', '' , '', '', 'ordr', '');
    //산정기간 3
    gf_ComboCode('divInputFormComboCalcPd03Mhsflx001', 'calcPd03Mhsflx001', 'calcPd03Mhsflx001', 'add', 'C185', '' , '', '', 'ordr', '');
};

var cf_SetComponentsMhsflx001 = function() {
    var dhxGridMhsflx001HeaderInfo = [];
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader('근무유형코드', '120', 'center', 'str', 'ro', false, 'workTyCode', '', '')); /* gf_LocaleTrans('default', 'titWorkTyCode') */
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader('근무유형명', '*', 'left', 'str', 'ro', false, 'workTyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titWorkTyCodeNm') */
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader('기본유형여부', '100', 'center', 'str', 'ch', false, 'bassTyAt', '', '')); /* gf_LocaleTrans('default', 'titBassTyAt') */
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader('산정 기간 : 1주', '100', 'left', 'str', 'ro', true, 'calcPd', '', '')); /* gf_LocaleTrans('default', 'titCalcPd') */
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader('선택적 근로시간제 : CORE TIME 적용 여부', '100', 'center', 'str', 'ro', true, 'coreTimeApplcAt', '', '')); /* gf_LocaleTrans('default', 'titCoreTimeApplcAt') */
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader('재량   근로시간제 : 출근 확인 여부', '100', 'center', 'str', 'ro', true, 'attendConfirmAt', '', '')); /* gf_LocaleTrans('default', 'titAttendConfirmAt') */
    dhxGridMhsflx001HeaderInfo.push(gf_MakeDhxGridHeader('재량   근로시간제 : 1일 인정 근무시간', '100', 'left', 'str', 'ro', true, 'dayRecogWorktime', '', '')); /* gf_LocaleTrans('default', 'titDayRecogWorktime') */
    dhxGridMhsflx001 = gf_MakeDhxGrid('dataListMhsflx001', dhxGridMhsflx001HeaderInfo, true, false, false);
    dhxGridMhsflx001.enableAutoWidth(false);
    dhxGridMhsflx001.setEditable(true);

    dhxGridMhsflx001.setColumnMinWidth(100,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true;
};

var cf_SetEventListenerMhsflx001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhsflx001 = gf_GridDetachEvent(dhxGridMhsflx001, eventIdMhsflx001);
    eventId = dhxGridMhsflx001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhsflx001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhsflx001.getColumnsNum();
            var rowNum = dhxGridMhsflx001.getRowsNum();
            var selectedId = dhxGridMhsflx001.getSelectedRowId();
            var ind        = dhxGridMhsflx001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsflx001.getRowIndex(selectedId);
            var type       = dhxGridMhsflx001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhsflx001.selectRow(0);
                    //fn_FindMhsflx001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhsflx001.selectRow(rowIndex + 1);
                    fn_FindMhsflx001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhsflx001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsflx001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhsflx001.getSelectedRowId();
            var ind        = dhxGridMhsflx001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsflx001.getRowIndex(selectedId);
            var type       = dhxGridMhsflx001.getColType(ind);
            dhxGridMhsflx001.selectCell(rowIndex+1, ind);
            fn_FindMhsflx001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsflx001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhsflx001.getSelectedRowId();
            var ind        = dhxGridMhsflx001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsflx001.getRowIndex(selectedId);
            var type       = dhxGridMhsflx001.getColType(ind);
            dhxGridMhsflx001.selectCell(rowIndex-1, ind);
            fn_FindMhsflx001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsflx001.editCell();
            }
        }
        else return true;
    });
    eventIdMhsflx001.push(eventId);
    eventId = dhxGridMhsflx001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhsflx001SortGridList(ind, type, direction); 
    });
    eventIdMhsflx001.push(eventId);
    eventId = dhxGridMhsflx001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhsflx001.push(eventId);
    eventId = dhxGridMhsflx001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhsflx001();
    });
    eventIdMhsflx001.push(eventId);
    eventId = dhxGridMhsflx001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventId = dhxGridMhsflx001.attachEvent('onEditCell', function(rid, cInd) {
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhsflx001, 'useAt')) return false;
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhsflx001, 'bassTyAt')) return false;
    });
    eventIdMhsflx001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveMhsflx001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhsflx001();
    });
    $('#btnExcelMhsflx001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhsflx001();
    });
    $('#btnSearchMhsflx001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhsflx001('');
    });
    $('#btnResetMhsflx001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhsflx001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhsflx001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhsflx001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsflx001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhsflx001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhsflx001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsflx001 input[name="workTyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'workTyCode', $(this).val());
    });
    $('#saveFormMhsflx001 input[name="workTyCodeNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'workTyCodeNm', $(this).val());
    });
    $('#saveFormMhsflx001 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var useAt = gf_IsNull(gf_FormGetValue('saveFormMhsflx001', 'useAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'useAt', useAt);
    });
    $('#saveFormMhsflx001 input[name="bassTyAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var bassTyAt = gf_IsNull(gf_FormGetValue('saveFormMhsflx001', 'bassTyAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'bassTyAt', bassTyAt);
    });
    //산정기간01
    //$('#saveFormMhsflx001 input[name="calcPd01Mhsflx001"]').unbind('change').bind('change',function() {
    $('#calcPd01Mhsflx001').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'calcPd', $(this).val());
        //console.log(" * 산정기간1   : " + gf_DhxGetValue(dhxGridMhsflx001, dhxGridMhsflx001.getSelectedRowId(), 'calcPd', 'grid'));
    });
    $('#calcPd02Mhsflx001').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'calcPd', $(this).val());
        //console.log(" * 산정기간2   : " + gf_DhxGetValue(dhxGridMhsflx001, dhxGridMhsflx001.getSelectedRowId(), 'calcPd', 'grid'));
    });
    $('#calcPd03Mhsflx001').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'calcPd', $(this).val());
        //console.log(" * 산정기간3   : " + gf_DhxGetValue(dhxGridMhsflx001, dhxGridMhsflx001.getSelectedRowId(), 'calcPd', 'grid'));
    });
    $('#saveFormMhsflx001 select[name="coreTimeApplcAtMhsflx001"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'coreTimeApplcAt', $(this).val());
    });
    $('#saveFormMhsflx001 select[name="attendConfirmAtMhsflx001"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'attendConfirmAt', $(this).val());
    });
    $('#saveFormMhsflx001 input[name="dayRecogWorktime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx001, dhxDataProcessorMhsflx001, 'dayRecogWorktime', $(this).val());
    });
    
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhsflx001 = function() {
    $('#searchFormMhsflx001').resetForm();
    gf_FormSetValue('searchFormMhsflx001', 'useAt', '1', 'combo');
    $('#workTyCodeSearchFormMhsflx001').focus();
};

var cf_SetBindingMhsflx001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhsflx001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhsflx001 = function(userId) {
    var jsonParameter = {
        workTyCode : gf_FormGetValue('searchFormMhsflx001', 'workTyCode', 'text'),
        useAt : gf_FormGetValue('searchFormMhsflx001', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhsflx001/searchMhsflx001', jsonParameter, 'fn_CallbackSearchMhsflx001', false, 'GET');
};

var fn_CallbackSearchMhsflx001 = function(strSvcID, targetID, data) {
    //dhxGridMhsflx001.clearAll();
    dhxGridMhsflx001.destructor();
    if(cf_SetComponentsMhsflx001()){ 
        fn_DhxDataProcessorMhsflx001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhsflx001');
            dhxGridMhsflx001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhsflx001 == 0 && save_All_Sta_Mhsflx001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhsflx001.selectRow(0); 
            } else if(save_Row_Sta_Mhsflx001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhsflx001.selectRow(0);
            } else if(save_All_Sta_Mhsflx001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhsflx001.selectRow(save_Row_Num_Mhsflx001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhsflx001.selectRow(save_Row_Num_Mhsflx001);   //개발자 수정 필요  
                //var findCell = dhxGridMhsflx001.findCell(save_Row_Ids_Mhsflx001, gf_GetDhxGridColumId(dhxGridMhsflx001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhsflx001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhsflx001.selectRow(0);
                //} 
            } 
 
            fn_FindMhsflx001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhsflx001');
            fn_InitInputFormMhsflx001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhsflx001").text(data.data.records.length);
        cf_SetEventListenerMhsflx001();
    } 
};
var fn_DhxDataProcessorMhsflx001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhsflx001 = new dataProcessor(gv_ContextPath+'/mhsflx001/saveMhsflx001'); //lock feed url
    dhxDataProcessorMhsflx001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhsflx001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsflx001.init(dhxGridMhsflx001); //link dataprocessor to the grid
    dhxDataProcessorMhsflx001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhsflx001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhsflx001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhsflx001();
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
var fn_FindMhsflx001 = function() {
    var rId = dhxGridMhsflx001.getSelectedRowId();
    var status = dhxDataProcessorMhsflx001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhsflx001", "workTyCode", gf_DhxGetValue(dhxGridMhsflx001, rId, 'workTyCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx001", "workTyCodeNm", gf_DhxGetValue(dhxGridMhsflx001, rId, 'workTyCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx001", "useAt", (( gf_DhxGetValue(dhxGridMhsflx001, rId, 'useAt',  'grid')  == '1') ? true : false), "chkbox");
    gf_FormSetValue("saveFormMhsflx001", "bassTyAt", (( gf_DhxGetValue(dhxGridMhsflx001, rId, 'bassTyAt',  'grid')  == '1') ? true : false), "chkbox");
    gf_FormSetValue("saveFormMhsflx001", "calcPd", gf_DhxGetValue(dhxGridMhsflx001, rId, 'calcPd',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx001", "coreTimeApplcAt", gf_DhxGetValue(dhxGridMhsflx001, rId, 'coreTimeApplcAt',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx001", "attendConfirmAt", gf_DhxGetValue(dhxGridMhsflx001, rId, 'attendConfirmAt',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx001", "dayRecogWorktime", gf_DhxGetValue(dhxGridMhsflx001, rId, 'dayRecogWorktime',  'grid'), '');

    $('#saveFormMhsflx001 input[name="workTyCode"]').prop('disabled', true);
    $('#saveFormMhsflx001 input[name="workTyCodeNm"]').prop('disabled', true);
    
    var workTyCode = gf_DhxGetValue(dhxGridMhsflx001, rId, 'workTyCode',  'grid');
    var calcPd = gf_DhxGetValue(dhxGridMhsflx001, rId, 'calcPd',  'grid');
    var coreTimeApplcAt = gf_DhxGetValue(dhxGridMhsflx001, rId, 'coreTimeApplcAt',  'grid');
    var attendConfirmAt = gf_DhxGetValue(dhxGridMhsflx001, rId, 'attendConfirmAt',  'grid');
    
    if(workTyCode == "001"){  //일반
    	gf_FormSetValue("saveFormMhsflx001", "calcPd01Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd02Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd03Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "coreTimeApplcAtMhsflx001", "0", "combo");
    	gf_FormSetValue("saveFormMhsflx001", "attendConfirmAtMhsflx001", "0", "combo");
    	
    	$("#calcPd01Mhsflx001").prop('disabled', true);
    	$("#calcPd02Mhsflx001").prop('disabled', true);
    	$("#calcPd03Mhsflx001").prop('disabled', true);
    	$("#coreTimeApplcAtMhsflx001").prop('disabled', true);
    	$("#attendConfirmAtMhsflx001").prop('disabled', true);
    	$('#saveFormMhsflx001 input[name="dayRecogWorktime"]').prop('disabled', true);
    }
    else if(workTyCode == "002"){  //탄력2주
    	//gf_FormSetValue("saveFormMhsflx001", "calcPd02Mhsflx001", "", 'combo');
    	//gf_FormSetValue("saveFormMhsflx001", "calcPd03Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd01Mhsflx001", calcPd, 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "coreTimeApplcAtMhsflx001", "0", "combo");
    	gf_FormSetValue("saveFormMhsflx001", "attendConfirmAtMhsflx001", "0", "combo");
    
    	$("#divInputFormComboCalcPd01Mhsflx001").show();
    	$("#divInputFormComboCalcPd02Mhsflx001").hide();
    	$("#divInputFormComboCalcPd03Mhsflx001").hide();
    	$("#coreTimeApplcAtMhsflx001").prop('disabled', true);
    	$("#attendConfirmAtMhsflx001").prop('disabled', true);
    	$('#saveFormMhsflx001 input[name="dayRecogWorktime"]').prop('disabled', true);
    	    }
    else if(workTyCode == "003"){  //탄력3개월
    	//gf_FormSetValue("saveFormMhsflx001", "calcPd01Mhsflx001", "", 'combo');
    	//gf_FormSetValue("saveFormMhsflx001", "calcPd03Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd02Mhsflx001", calcPd, 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "coreTimeApplcAtMhsflx001", "0", "combo");
    	gf_FormSetValue("saveFormMhsflx001", "attendConfirmAtMhsflx001", "0", "combo");
    	
    	$("#divInputFormComboCalcPd01Mhsflx001").hide();
    	$("#divInputFormComboCalcPd02Mhsflx001").show();
    	$("#divInputFormComboCalcPd03Mhsflx001").hide();
    	$("#coreTimeApplcAtMhsflx001").prop('disabled', true);
    	$("#attendConfirmAtMhsflx001").prop('disabled', true);
    	$('#saveFormMhsflx001 input[name="dayRecogWorktime"]').prop('disabled', true);
    }
    else if(workTyCode == "004"){  //선택
    	//gf_FormSetValue("saveFormMhsflx001", "calcPd01Mhsflx001", "", 'combo');
    	//gf_FormSetValue("saveFormMhsflx001", "calcPd02Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd03Mhsflx001", calcPd, 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "coreTimeApplcAtMhsflx001", coreTimeApplcAt, "combo");
    	gf_FormSetValue("saveFormMhsflx001", "attendConfirmAtMhsflx001", "0", "combo");
    	
    	$("#divInputFormComboCalcPd01Mhsflx001").hide();
    	$("#divInputFormComboCalcPd02Mhsflx001").hide();
    	$("#divInputFormComboCalcPd03Mhsflx001").show();
    	$("#coreTimeApplcAtMhsflx001").prop('disabled', false);
    	$("#attendConfirmAtMhsflx001").prop('disabled', true);
    	$('#saveFormMhsflx001 input[name="dayRecogWorktime"]').prop('disabled', true);
    }
    else if(workTyCode == "005"){  //재량
    	gf_FormSetValue("saveFormMhsflx001", "calcPd01Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd02Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd03Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "coreTimeApplcAtMhsflx001", "0", "combo"); 
    	gf_FormSetValue("saveFormMhsflx001", "attendConfirmAtMhsflx001", attendConfirmAt, "combo");
    	
    	$("#calcPd01Mhsflx001").prop('disabled', true);
    	$("#calcPd02Mhsflx001").prop('disabled', true);
    	$("#calcPd03Mhsflx001").prop('disabled', true);
    	$("#coreTimeApplcAtMhsflx001").prop('disabled', true);
    	$("#attendConfirmAtMhsflx001").prop('disabled', false);
    	$('#saveFormMhsflx001 input[name="dayRecogWorktime"]').prop('disabled', false);
    }
    else if(workTyCode == "006"){  //간주
    	gf_FormSetValue("saveFormMhsflx001", "calcPd01Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd02Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd03Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "coreTimeApplcAtMhsflx001", "0", "combo"); 
    	gf_FormSetValue("saveFormMhsflx001", "attendConfirmAtMhsflx001", "0", "combo");
    	
    	$("#calcPd01Mhsflx001").prop('disabled', true);
    	$("#calcPd02Mhsflx001").prop('disabled', true);
    	$("#calcPd03Mhsflx001").prop('disabled', true);
    	$("#coreTimeApplcAtMhsflx001").prop('disabled', true);
    	$("#attendConfirmAtMhsflx001").prop('disabled', true);
    	$('#saveFormMhsflx001 input[name="dayRecogWorktime"]').prop('disabled', false);
    }
    else if(workTyCode == "007"){  //시차
    	gf_FormSetValue("saveFormMhsflx001", "calcPd01Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd02Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "calcPd03Mhsflx001", "", 'combo');
    	gf_FormSetValue("saveFormMhsflx001", "coreTimeApplcAtMhsflx001", "0", "combo"); 
    	gf_FormSetValue("saveFormMhsflx001", "attendConfirmAtMhsflx001", "0", "combo");
    	
    	$("#calcPd01Mhsflx001").prop('disabled', true);
    	$("#calcPd02Mhsflx001").prop('disabled', true);
    	$("#calcPd03Mhsflx001").prop('disabled', true);
    	$("#coreTimeApplcAtMhsflx001").prop('disabled', true);
    	$("#attendConfirmAtMhsflx001").prop('disabled', true);
    	$('#saveFormMhsflx001 input[name="dayRecogWorktime"]').prop('disabled', true);
    }
    if(status == 'inserted') {
        $('#saveFormMhsflx001 input[name="workTyCode"]').prop('disabled', false);
    } else {
        $('#saveFormMhsflx001 input[name="workTyCode"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhsflx001 = function() {
    $('#saveFormMhsflx001 input[name="workTyCode"]').prop('disabled', false);
    $('#saveFormMhsflx001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhsflx001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhsflx001 = function() {
    dhxGridMhsflx001.clearSelection();
    fn_InitInputFormMhsflx001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //workTyCode
    initValueArr.push(''); //workTyCodeNm
    initValueArr.push(''); //useAt
    initValueArr.push(''); //bassTyAt
    initValueArr.push(''); //calcPd
    initValueArr.push(''); //coreTimeApplcAt
    initValueArr.push(''); //attendConfirmAt
    initValueArr.push(''); //dayRecogWorktime
    dhxGridMhsflx001.addRow(dhxGridMhsflx001.uid(), initValueArr, 0);
    dhxGridMhsflx001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhsflx001');
    $('#btnPopEmpSearchMhsflx001').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhsflx001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhsflx001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhsflx001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhsflx001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsflx001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhsflx001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhsflx001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhsflx001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsflx001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhsflx001.setSortImgState(false); 
            gf_FormSetValue('searchFormMhsflx001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhsflx001', 'sortColumId', '', 'text'); 
            dhxGridMhsflx001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhsflx001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhsflx001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhsflx001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsflx001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhsflx001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhsflx001 = 0; 
    save_Edt_Cnt_Mhsflx001 = 0; 
    save_Del_Cnt_Mhsflx001 = 0; 
    dhxGridMhsflx001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhsflx001.getState(rowId))) {
            edCnt++;
            
            var state = dhxDataProcessorMhsflx001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhsflx001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhsflx001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhsflx001 += 1; 
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
        save_All_Sta_Mhsflx001 = 0; 
        if(save_Add_Cnt_Mhsflx001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhsflx001 + "건";
            save_All_Sta_Mhsflx001 = 1; 
        } 
        if(save_Edt_Cnt_Mhsflx001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhsflx001 + "건"; 
        } 
        if(save_Del_Cnt_Mhsflx001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhsflx001 + "건"; 
            save_All_Sta_Mhsflx001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhsflx001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhsflx001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhsflx001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhsflx001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhsflx001_Send = function() {
    if(fn_GridValidation(dhxGridMhsflx001, dhxDataProcessorMhsflx001)) {
        dhxDataProcessorMhsflx001.sendData();
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhsflx001 = function () {
    var titMhsflx001 = '개인정보조회'; /* gf_LocaleTrans('default', 'titMhsflx001') */
    var jsonParameter = {
        workTyCode : gf_FormGetValue('searchFormMhsflx001', 'workTyCode', 'text')
    };
    var header = [[
        '근무 유형 코드' /* gf_LocaleTrans('default', 'titWorkTyCode') */,
        '근무 유형 명' /* gf_LocaleTrans('default', 'titWorkTyCodeNm') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '기본 유형 여부' /* gf_LocaleTrans('default', 'titBassTyAt') */,
        '산정 기간' /* gf_LocaleTrans('default', 'titCalcPd') */,
        '선택적 근로시간제' /* gf_LocaleTrans('default', 'titCoreTimeApplcAt') */,
        '재량   근로시간제' /* gf_LocaleTrans('default', 'titAttendConfirmAt') */,
        '1일 인정 근무시간' /* gf_LocaleTrans('default', 'titDayRecogWorktime') */
    ]];
    var dataId = [[ 'workTyCode', 'workTyCodeNm', 'useAtNm', 'bassTyAtNm', 'calcPd', 'coreTimeApplcAtNm', 'attendConfirmAtNm', 'dayRecogWorktime' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsflx001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsflx001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhsflx001/excelMhsflx001', jsonParameter);
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
    $('#saveFormMhsflx001 #workTyCodeSaveFormMhsflx001').parent().append(
    '<div class="error" id="workTyCodeSaveFormMhsflx001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhsflx001 = function(workTyCode){
    if(!gf_IsNull(workTyCode)) {
        var jsonParameter = {
            workTyCode : workTyCode
        };
        var dataSource = gf_NoAsyncTransaction('mhsflx001/findMhsflx001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.workTyCode)) {
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
    var state = dhxDataProcessorMhsflx001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhsflx001').validate().form()){
                if(state == 'inserted') {
                    var workTyCode = gf_FormGetValue('saveFormMhsflx001', 'workTyCode', 'text');
                    if(fn_CheckDupMhsflx001(workTyCode)) return true;
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
    var checkWorkTyCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhsflx001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhsflx001 == 'deleted') {
        save_Row_Num_Mhsflx001 = 0;
        save_Row_Ids_Mhsflx001 = "";
    } else if(save_Row_Sta_Mhsflx001 == 'inserted') {
        save_Row_Num_Mhsflx001 = rowNum;
        save_Row_Ids_Mhsflx001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhsflx001 = rowNum;
        save_Row_Ids_Mhsflx001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'workTyCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'workTyCode');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkWorkTyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'workTyCode', 'grid');
                    if(!gf_IsNull(checkWorkTyCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var workTyCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'workTyCode', 'grid');
                            if(((workTyCode == checkWorkTyCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'workTyCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhsflx001( checkWorkTyCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'workTyCode');
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
        dhxGridMhsflx001.selectRowById(validFalseFistRowId);
        fn_FindMhsflx001();
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
