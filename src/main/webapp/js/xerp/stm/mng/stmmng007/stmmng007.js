/**
 *    프로그램       : 프로그램ID  관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.28
 *    사용테이블      : STM_PROGRM
 * sourceGen version : 2020.07.16.01 (2020.07.28)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmmng007 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmmng007 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmmng007 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmmng007 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmmng007 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmmng007 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmmng007 = 0;  //그리드 삭제 수량 
var dhxGridStmmng007;  //그리드 객체
var eventIdStmmng007 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmmng007;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmng007();
    if(cf_SetComponentsStmmng007()){
       cf_SetEventListenerStmmng007();
       cf_InitFormStmmng007();
       cf_SetBindingStmmng007();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmmng007 = function() {
    gf_SetMenuPath();
    $("#saveFormStmmng007").validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('pckageNmSearchFormStmmng007', 'pckageNm', 'pckageNm', 'search', 'C001', '' , '', '', 'ordr', '','',''); //업무구분 
};

var cf_SetComponentsStmmng007 = function() {
    var dhxGridStmmng007HeaderInfo = [];
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmmng007" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('프로그램ID', '100', 'left', 'str', 'ro', false, 'progrmId', '', '')); /* gf_LocaleTrans('default', 'titProgrmId') */
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('프로그램명', '*', 'left', 'str', 'ro', false, 'progrmNm', '', '')); /* gf_LocaleTrans('default', 'titProgrmNm') */
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('경로', '100', 'left', 'str', 'ro', false, 'url', '', '')); /* gf_LocaleTrans('default', 'titUrl') */
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('패키지', '100', 'left', 'str', 'ro', false, 'pckageNm', '', '')); /* gf_LocaleTrans('default', 'titPckageNm') */
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('서브패키지', '100', 'left', 'str', 'ro', false, 'subPckageId', '', '')); /* gf_LocaleTrans('default', 'titSubPckageId') */
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('관련테이블', '150', 'left', 'str', 'ro', false, 'relTblNm', '', '')); /* gf_LocaleTrans('default', 'titRelTblNm') */
    
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('설명', '100', 'left', 'str', 'ro', true, 'progrmDc', '', '')); /* gf_LocaleTrans('default', 'titProgrmDc') */
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('메뉴코드', '100', 'left', 'str', 'ro', true, 'menuId', '', '')); /* gf_LocaleTrans('default', 'titProgrmId') */
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('파일명', '100', 'left', 'str', 'ro', true, 'fileNm', '', '')); /* gf_LocaleTrans('default', 'titFileNm') */
    dhxGridStmmng007HeaderInfo.push(gf_MakeDhxGridHeader('사용 여부', '100', 'center', 'str', 'ro', true, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridStmmng007 = gf_MakeDhxGrid('dataListStmmng007', dhxGridStmmng007HeaderInfo, true, false, false);
    dhxGridStmmng007.enableAutoWidth(false);
    dhxGridStmmng007.setEditable(true);

    dhxGridStmmng007.setColumnMinWidth(100,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerStmmng007 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmmng007 = gf_GridDetachEvent(dhxGridStmmng007, eventIdStmmng007);
    eventId = dhxGridStmmng007.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmmng007();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmmng007.getColumnsNum();
            var rowNum = dhxGridStmmng007.getRowsNum();
            var selectedId = dhxGridStmmng007.getSelectedRowId();
            var ind        = dhxGridStmmng007.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng007.getRowIndex(selectedId);
            var type       = dhxGridStmmng007.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmmng007.selectRow(0);
                    //fn_FindStmmng007();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmmng007.selectRow(rowIndex + 1);
                    fn_FindStmmng007();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmmng007.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng007.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmmng007.getSelectedRowId();
            var ind        = dhxGridStmmng007.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng007.getRowIndex(selectedId);
            var type       = dhxGridStmmng007.getColType(ind);
            dhxGridStmmng007.selectCell(rowIndex+1, ind);
            fn_FindStmmng007();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng007.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmmng007.getSelectedRowId();
            var ind        = dhxGridStmmng007.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng007.getRowIndex(selectedId);
            var type       = dhxGridStmmng007.getColType(ind);
            dhxGridStmmng007.selectCell(rowIndex-1, ind);
            fn_FindStmmng007();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng007.editCell();
            }
        }
        else return true;
    });
    eventIdStmmng007.push(eventId);
    eventId = dhxGridStmmng007.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng007SortGridList(ind, type, direction); 
    });
    eventIdStmmng007.push(eventId);
    eventId = dhxGridStmmng007.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmmng007.push(eventId);
    eventId = dhxGridStmmng007.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindStmmng007();
    });
    eventIdStmmng007.push(eventId);
    eventId = dhxGridStmmng007.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmmng007.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmmng007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmmng007()
    });
    $('#btnSaveStmmng007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmmng007();
    });
    $('#btnRemoveStmmng007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmmng007();
    });
    $('#btnExcelStmmng007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmmng007();
    });
    $('#btnSearchStmmng007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng007('');
    });
    $('#btnResetStmmng007').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmng007();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmmng007').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmmng007, $('#checkAllStmmng007').prop('checked'), 'chk');
    });
    $('#searchFormStmmng007 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmmng007').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmmng007 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmmng007",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng007 input[name="progrmId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'progrmId', $(this).val());
    });
    $('#saveFormStmmng007 input[name="progrmNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'progrmNm', $(this).val());
    });
    $('#saveFormStmmng007 input[name="progrmDc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'progrmDc', $(this).val());
    });
    $('#saveFormStmmng007 input[name="url"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'url', $(this).val());
    });
    $('#saveFormStmmng007 input[name="fileNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'fileNm', $(this).val());
    });
    $('#saveFormStmmng007 input[name="pckageNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'pckageNm', $(this).val());
    });
    $('#saveFormStmmng007 input[name="subPckageId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'subPckageId', $(this).val());
    });
    $('#saveFormStmmng007 input[name="relTblNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'relTblNm', $(this).val());
    });
    $('#saveFormStmmng007 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'useAt', $(this).val());
    });
    $('#saveFormStmmng007 input[name="menuId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng007, dhxDataProcessorStmmng007, 'menuId', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmmng007 = function() {
    $('#searchFormStmmng007').resetForm();
};

var cf_SetBindingStmmng007 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmmng007('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmmng007 = function(userId) {
    var jsonParameter = {
    	pckageNm : gf_FormGetValue('searchFormStmmng007', 'pckageNm', 'combo'),
    	progrmNm : gf_FormGetValue('searchFormStmmng007', 'progrmNm', 'text'),
        progrmId : gf_FormGetValue('searchFormStmmng007', 'progrmId', 'text')
    };
    
    console.log(jsonParameter);
    
    gf_Transaction(userId, 'stmmng007/searchStmmng007', jsonParameter, 'fn_CallbackSearchStmmng007', false, 'GET');
};

var fn_CallbackSearchStmmng007 = function(strSvcID, targetID, data) {
    //dhxGridStmmng007.clearAll();
    dhxGridStmmng007.destructor();
    if(cf_SetComponentsStmmng007()){ 
        fn_DhxDataProcessorStmmng007(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmmng007');
            dhxGridStmmng007.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmmng007 == 0 && save_All_Sta_Stmmng007 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmmng007.selectRow(0); 
            } else if(save_Row_Sta_Stmmng007 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmmng007.selectRow(0);
            } else if(save_All_Sta_Stmmng007 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmmng007.selectRow(save_Row_Num_Stmmng007); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmmng007.selectRow(save_Row_Num_Stmmng007);   //개발자 수정 필요  
                //var findCell = dhxGridStmmng007.findCell(save_Row_Ids_Stmmng007, gf_GetDhxGridColumId(dhxGridStmmng007,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmmng007.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmmng007.selectRow(0);
                //} 
            } 
 
            fn_FindStmmng007();
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmmng007');
            fn_InitInputFormStmmng007();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormStmmng007").text(data.data.records.length);
        cf_SetEventListenerStmmng007();
    } 
};
var fn_DhxDataProcessorStmmng007 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmmng007 = new dataProcessor(gv_ContextPath+'/stmmng007/saveStmmng007'); //lock feed url
    dhxDataProcessorStmmng007.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmmng007.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmmng007.init(dhxGridStmmng007); //link dataprocessor to the grid
    dhxDataProcessorStmmng007.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmmng007.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmmng007.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng007();
                    $("#checkAllStmmng007").prop('checked', false); //상단 체크박스 해제
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
var fn_FindStmmng007 = function() {
    var rId = dhxGridStmmng007.getSelectedRowId();
    var status = dhxDataProcessorStmmng007.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormStmmng007", "progrmId", gf_DhxGetValue(dhxGridStmmng007, rId, 'progrmId',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "progrmNm", gf_DhxGetValue(dhxGridStmmng007, rId, 'progrmNm',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "progrmDc", gf_DhxGetValue(dhxGridStmmng007, rId, 'progrmDc',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "menuId", gf_DhxGetValue(dhxGridStmmng007, rId, 'menuId',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "url", gf_DhxGetValue(dhxGridStmmng007, rId, 'url',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "fileNm", gf_DhxGetValue(dhxGridStmmng007, rId, 'fileNm',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "pckageNm", gf_DhxGetValue(dhxGridStmmng007, rId, 'pckageNm',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "subPckageId", gf_DhxGetValue(dhxGridStmmng007, rId, 'subPckageId',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "relTblNm", gf_DhxGetValue(dhxGridStmmng007, rId, 'relTblNm',  'grid'), '');
    gf_FormSetValue("saveFormStmmng007", "useAt", gf_DhxGetValue(dhxGridStmmng007, rId, 'useAt',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormStmmng007 input[name="progrmId"]').prop('disabled', false);
    } else {
        $('#saveFormStmmng007 input[name="progrmId"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmmng007 = function() {
    $('#saveFormStmmng007 input[name="progrmId"]').prop('disabled', false);
    $('#saveFormStmmng007').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmmng007 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddStmmng007 = function() {
    dhxGridStmmng007.clearSelection();
    fn_InitInputFormStmmng007();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //progrmId
    initValueArr.push(''); //progrmNm
    initValueArr.push(''); //progrmDc
    initValueArr.push(''); //url
    initValueArr.push(''); //fileNm
    initValueArr.push(''); //pckageNm
    initValueArr.push(''); //subPckageId
    initValueArr.push(''); //relTblNm
    initValueArr.push('1'); //useAt
    dhxGridStmmng007.addRow(dhxGridStmmng007.uid(), initValueArr, 0);
    dhxGridStmmng007.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmmng007');
    $('#btnPopEmpSearchStmmng007').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmmng007SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmmng007, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmmng007', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmmng007', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmmng007, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmmng007.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmmng007', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmmng007', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng007, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmmng007.setSortImgState(false); 
            gf_FormSetValue('searchFormStmmng007', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmmng007', 'sortColumId', '', 'text'); 
            dhxGridStmmng007.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmmng007.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmmng007', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmmng007', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng007, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmmng007 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmmng007 = 0; 
    save_Edt_Cnt_Stmmng007 = 0; 
    save_Del_Cnt_Stmmng007 = 0; 
    dhxGridStmmng007.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmmng007.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmmng007.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmmng007 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmmng007 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmmng007 += 1; 
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
        save_All_Sta_Stmmng007 = 0; 
        if(save_Add_Cnt_Stmmng007 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmmng007 + "건";
            save_All_Sta_Stmmng007 = 1; 
        } 
        if(save_Edt_Cnt_Stmmng007 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmmng007 + "건"; 
        } 
        if(save_Del_Cnt_Stmmng007 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmmng007 + "건"; 
            save_All_Sta_Stmmng007 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmmng007(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmmng007(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmmng007 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmmng007_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmmng007_Send = function() {
    if(fn_GridValidation(dhxGridStmmng007, dhxDataProcessorStmmng007)) {
        dhxDataProcessorStmmng007.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmmng007 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmmng007, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmmng007.forEachRow(function(rowId) {
            state = dhxDataProcessorStmmng007.getState(rowId);
            if(dhxGridStmmng007.cells(rowId, gf_GetDhxGridColumId(dhxGridStmmng007, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmmng007.getRowIndex(rowId);
                    dhxGridStmmng007.deleteRow(rowId);
                    dhxGridStmmng007.selectRow(rowNum);
                    fn_FindStmmng007();
                }
                else dhxDataProcessorStmmng007.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmmng007 = function () {
    var titStmmng007 = '프로그램ID관리'; /* gf_LocaleTrans('default', 'titStmmng007') */
    var jsonParameter = {
        progrmId : gf_FormGetValue('searchFormStmmng007', 'progrmId', 'text')
    };
    var header = [[
        '프로그램ID' /* gf_LocaleTrans('default', 'titProgrmId') */,
        '프로그명' /* gf_LocaleTrans('default', 'titProgrmNm') */,
        '설명' /* gf_LocaleTrans('default', 'titProgrmDc') */,
        '경로' /* gf_LocaleTrans('default', 'titUrl') */,
        '파일명' /* gf_LocaleTrans('default', 'titFileNm') */,
        '패키지' /* gf_LocaleTrans('default', 'titPckageNm') */,
        '서브 패키지 아이디' /* gf_LocaleTrans('default', 'titSubPckageId') */,
        '관련테이블' /* gf_LocaleTrans('default', 'titRelTblNm') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */
    ]];
    var dataId = [[ 'progrmId', 'progrmNm', 'progrmDc', 'url', 'fileNm', 'pckageNm', 'subPckageId', 'relTblNm', 'useAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmmng007 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmmng007;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng007/excelStmmng007', jsonParameter);
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
    $('#saveFormStmmng007 #progrmIdSaveFormStmmng007').parent().append(
    '<div class="error" id="progrmIdSaveFormStmmng007-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmmng007 = function(progrmId){
    if(!gf_IsNull(progrmId)) {
        var jsonParameter = {
            progrmId : progrmId
        };
        var dataSource = gf_NoAsyncTransaction('stmmng007/findStmmng007', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.progrmId)) {
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
    var state = dhxDataProcessorStmmng007.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmmng007').validate().form()){
                if(state == 'inserted') {
                    var progrmId = gf_FormGetValue('saveFormStmmng007', 'progrmId', 'text');
                    if(fn_CheckDupStmmng007(progrmId)) return true;
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
    var checkProgrmId;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmmng007 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmmng007 == 'deleted') {
        save_Row_Num_Stmmng007 = 0;
        save_Row_Ids_Stmmng007 = "";
    } else if(save_Row_Sta_Stmmng007 == 'inserted') {
        save_Row_Num_Stmmng007 = rowNum;
        save_Row_Ids_Stmmng007 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmmng007 = rowNum;
        save_Row_Ids_Stmmng007 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'progrmId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkProgrmId = gf_DhxGetValue(dhxGridObjet, rowId, 'progrmId', 'grid');
                    if(!gf_IsNull(checkProgrmId)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var progrmId = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'progrmId', 'grid');
                            if(((progrmId == checkProgrmId)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmmng007( checkProgrmId )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
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
        dhxGridStmmng007.selectRowById(validFalseFistRowId);
        fn_FindStmmng007();
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
