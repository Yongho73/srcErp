/**
 *    프로그램       : 인사발령코드 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.27
 *    사용테이블      : MHS_GNFD_CODE
 * sourceGen version : 2020.07.16.01 (2020.08.27)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm011 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm011 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm011 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm011 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm011 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm011 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm011 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm011;  //그리드 객체
var eventIdMhshrm011 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm011;  //DataProcessor 객체
var checkOrdr = true;

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm011();
    if(cf_SetComponentsMhshrm011()){
       cf_SetEventListenerMhshrm011();
       cf_InitFormMhshrm011();
       cf_SetBindingMhshrm011();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm011 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm011").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsMhshrm011 = function() {
    var dhxGridMhshrm011HeaderInfo = [];
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm011" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('발령코드', '100', 'center', 'str', 'ed', false, 'gnfdCode', '', '')); /* gf_LocaleTrans('default', 'titGnfdCode') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('발령코드명', '180', 'left', 'str', 'ed', false, 'gnfdCodeNm', '', '')); /* gf_LocaleTrans('default', 'titGnfdCodeNm') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('부서변경\n여부', '70', 'center', 'na', 'ch', false, 'deptChangeAt', '', '')); /* gf_LocaleTrans('default', 'titDeptChangeAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('직급변경\n여부', '70', 'center', 'na', 'ch', false, 'clsfChangeAt', '', '')); /* gf_LocaleTrans('default', 'titClsfChangeAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('직위변경\n여부', '70', 'center', 'na', 'ch', false, 'ofcpsChangeAt', '', '')); /* gf_LocaleTrans('default', 'titOfcpsChangeAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('직종변경\n여부', '70', 'center', 'na', 'ch', false, 'jssfcChangeAt', '', '')); /* gf_LocaleTrans('default', 'titJssfcChangeAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('직렬변경\n여부', '70', 'center', 'na', 'ch', false, 'jblnChangeAt', '', '')); /* gf_LocaleTrans('default', 'titJblnChangeAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('호봉변경\n여부', '70', 'center', 'na', 'ch', false, 'srclsChangeAt', '', '')); /* gf_LocaleTrans('default', 'titSrclsChangeAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('직책변경\n여부', '70', 'center', 'na', 'ch', false, 'rspofcChangeAt', '', '')); /* gf_LocaleTrans('default', 'titRspofcChangeAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('근속기간\n산입여부', '70', 'center', 'na', 'ch', false, 'cnwkPdInclsAt', '', '')); /* gf_LocaleTrans('default', 'titCnwkPdInclsAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'center', 'na', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('출력순서', '80', 'right', 'int', 'edn', false, 'outptOrdr', '', '')); /* gf_LocaleTrans('default', 'titOutptOrdr') */
    dhxGridMhshrm011HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '100', 'center', 'str', 'ro', true, 'regId', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    
    dhxGridMhshrm011 = gf_MakeDhxGrid('dataListMhshrm011', dhxGridMhshrm011HeaderInfo, true, false, false);
    dhxGridMhshrm011.enableAutoWidth(false);
    dhxGridMhshrm011.setEditable(true);

    dhxGridMhshrm011.setColumnMinWidth(100,13); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrm011 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm011 = gf_GridDetachEvent(dhxGridMhshrm011, eventIdMhshrm011);
    eventId = dhxGridMhshrm011.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm011();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm011.getColumnsNum();
            var rowNum = dhxGridMhshrm011.getRowsNum();
            var selectedId = dhxGridMhshrm011.getSelectedRowId();
            var ind        = dhxGridMhshrm011.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm011.getRowIndex(selectedId);
            var type       = dhxGridMhshrm011.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm011.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm011.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm011.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm011.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm011.getSelectedRowId();
            var ind        = dhxGridMhshrm011.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm011.getRowIndex(selectedId);
            var type       = dhxGridMhshrm011.getColType(ind);
            dhxGridMhshrm011.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm011.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm011.getSelectedRowId();
            var ind        = dhxGridMhshrm011.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm011.getRowIndex(selectedId);
            var type       = dhxGridMhshrm011.getColType(ind);
            dhxGridMhshrm011.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm011.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm011.push(eventId);
    eventId = dhxGridMhshrm011.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm011SortGridList(ind, type, direction); 
    });
    eventIdMhshrm011.push(eventId);
    eventId = dhxGridMhshrm011.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm011.push(eventId);
    eventId = dhxGridMhshrm011.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm011.push(eventId);
    eventId = dhxGridMhshrm011.attachEvent("onEditCell", function(stage, rId, cInd){
    	if(!gf_IsNull(gf_DhxGetValue(dhxGridMhshrm011, rId, 'regId', 'grid'))){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm011, 'gnfdCode')) { return false; }
        }
        return true;
    });
    eventIdMhshrm011.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm011').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm011()
    });
    $('#btnSaveMhshrm011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = dhxGridMhshrm011.getSelectedRowId();  //현재행 ID 
        var rowNum = dhxGridMhshrm011.getRowIndex(rowIds);
        dhxGridMhshrm011.selectRow(rowNum); 
        fn_SaveMhshrm011();
    });
    $('#btnRemoveMhshrm011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm011();
    });
    $('#btnExcelMhshrm011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm011();
    });
    $('#btnSearchMhshrm011').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm011('');
    });
    $('#btnResetMhshrm011').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm011();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrm011').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrm011, $('#checkAllMhshrm011').prop('checked'), 'chk');
    });
    $('#searchFormMhshrm011 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm011').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm011').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMhshrm011 = function() {
    $('#searchFormMhshrm011').resetForm();
    $('#gnfdCodeNmSearchFormMhshrm011').focus();
};

var cf_SetBindingMhshrm011 = function() {
    fn_SearchMhshrm011('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm011 = function(userId) {
    var jsonParameter = {
    	gnfdCodeNm : gf_FormGetValue('searchFormMhshrm011', 'gnfdCodeNm', 'text'),
        useAt : gf_FormGetValue('searchFormMhshrm011', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm011/searchMhshrm011', jsonParameter, 'fn_CallbackSearchMhshrm011', false, 'GET');
};

var fn_CallbackSearchMhshrm011 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm011.clearAll();
    dhxGridMhshrm011.destructor();
    if(cf_SetComponentsMhshrm011()){ 
        fn_DhxDataProcessorMhshrm011(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm011');
            dhxGridMhshrm011.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrm011 == 0 && save_All_Sta_Mhshrm011 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm011.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm011 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm011.selectRow(0);
            } else if(save_All_Sta_Mhshrm011 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm011.selectRow(save_Row_Num_Mhshrm011); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm011.selectRow(save_Row_Num_Mhshrm011);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm011.findCell(save_Row_Ids_Mhshrm011, gf_GetDhxGridColumId(dhxGridMhshrm011,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm011.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm011.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm011');
        }
        $("#spanCntSearchFormMhshrm011").text(data.data.records.length);
        cf_SetEventListenerMhshrm011();
    } 
};
var fn_DhxDataProcessorMhshrm011 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm011 = new dataProcessor(gv_ContextPath+'/mhshrm011/saveMhshrm011'); //lock feed url
    dhxDataProcessorMhshrm011.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm011.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm011.init(dhxGridMhshrm011); //link dataprocessor to the grid
    dhxDataProcessorMhshrm011.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm011.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm011.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm011();
                    $("#checkAllMhshrm011").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMhshrm011 = function() {
    dhxGridMhshrm011.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //gnfdCode
    initValueArr.push(''); //gnfdCodeNm
    initValueArr.push(''); //deptChangeAt
    initValueArr.push(''); //clsfChangeAt
    initValueArr.push(''); //ofcpsChangeAt
    initValueArr.push(''); //jssfcChangeAt
    initValueArr.push(''); //jblnChangeAt
    initValueArr.push(''); //srclsChangeAt
    initValueArr.push(''); //rspofcChangeAt
    initValueArr.push(''); //cnwkPdInclsAt
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //rm
    initValueArr.push(''); //outptOrdr
    dhxGridMhshrm011.addRow(dhxGridMhshrm011.uid(), initValueArr, 0);
    dhxGridMhshrm011.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm011');
    $('#btnPopEmpSearchMhshrm011').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm011SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm011, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm011', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm011', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm011, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm011.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm011', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm011', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm011, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm011.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm011', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm011', 'sortColumId', '', 'text'); 
            dhxGridMhshrm011.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm011.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm011', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm011', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm011, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm011 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm011 = 0; 
    save_Edt_Cnt_Mhshrm011 = 0; 
    save_Del_Cnt_Mhshrm011 = 0; 
    dhxGridMhshrm011.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm011.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm011.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm011 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm011 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm011 += 1; 
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
        save_All_Sta_Mhshrm011 = 0; 
        if(save_Add_Cnt_Mhshrm011 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm011 + "건";
            save_All_Sta_Mhshrm011 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm011 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm011 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm011 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm011 + "건"; 
            save_All_Sta_Mhshrm011 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm011(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm011(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm011 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm011_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm011_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm011, dhxDataProcessorMhshrm011)) {
        dhxDataProcessorMhshrm011.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm011 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrm011, 'chk');
    var checkGnfdCode;
    var useCheck;
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrm011.forEachRow(function(rowId) {
        	useCheck=false;
            state = dhxDataProcessorMhshrm011.getState(rowId);
            if(dhxGridMhshrm011.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrm011, 'chk')).isChecked()){
                checkGnfdCode = gf_DhxGetValue(dhxGridMhshrm011, rowId, 'gnfdCode', 'grid');
            	if(!fn_UseCheckMhshrm011(checkGnfdCode) && state != 'inserted'){
            		gf_DivMsgAlert('사용중인 코드가 존재합니다.');
            		useCheck = true;
            	}
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrm011.getRowIndex(rowId);
                    dhxGridMhshrm011.deleteRow(rowId);
                    dhxGridMhshrm011.selectRow(rowNum);
                }
                else {
                	if(!useCheck){
                		dhxDataProcessorMhshrm011.setUpdated(rowId, true, 'deleted');
                	}
                }
            }
        });
    }
}
/**
 * 사용여부 확인
 */
var fn_UseCheckMhshrm011 = function(gnfdCode){
    if(!gf_IsNull(gnfdCode)) {
        var jsonParameter = {
        		gnfdCode : gnfdCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm011/useCheckMhshrm011', jsonParameter, 'GET');
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
var fn_ExcelMhshrm011 = function () {
    var titMhshrm011 = '인사발령코드'; /* gf_LocaleTrans('default', 'titMhshrm011') */
    var jsonParameter = {
        gnfdCode : gf_FormGetValue('searchFormMhshrm011', 'gnfdCode', 'text')
    };
    var header = [[
        '발령코드' /* gf_LocaleTrans('default', 'titGnfdCode') */,
        '발령코드명' /* gf_LocaleTrans('default', 'titGnfdCodeNm') */,
        '부서변경여부' /* gf_LocaleTrans('default', 'titDeptChangeAt') */,
        '직급변경여부' /* gf_LocaleTrans('default', 'titClsfChangeAt') */,
        '직위변경여부' /* gf_LocaleTrans('default', 'titOfcpsChangeAt') */,
        '직종변경여부' /* gf_LocaleTrans('default', 'titJssfcChangeAt') */,
        '직렬변경여부' /* gf_LocaleTrans('default', 'titJblnChangeAt') */,
        '호봉변경여부' /* gf_LocaleTrans('default', 'titSrclsChangeAt') */,
        '직책변경여부' /* gf_LocaleTrans('default', 'titRspofcChangeAt') */,
        '근속 기간 산입 여부' /* gf_LocaleTrans('default', 'titCnwkPdInclsAt') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */,
        '출력순서' /* gf_LocaleTrans('default', 'titOutptOrdr') */
    ]];
    var dataId = [[ 'gnfdCode', 'gnfdCodeNm', 'deptChangeAtNm', 'clsfChangeAtNm', 'ofcpsChangeAtNm', 'jssfcChangeAtNm', 'jblnChangeAtNm', 'srclsChangeAtNm', 'rspofcChangeAtNm', 'cnwkPdInclsAtNm', 'useAtNm', 'rm', 'outptOrdr' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm011 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm011;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm011/excelMhshrm011', jsonParameter);
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
    $('#saveFormMhshrm011 #gnfdCodeSaveFormMhshrm011').parent().append(
    '<div class="error" id="gnfdCodeSaveFormMhshrm011-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm011 = function(gnfdCode){
    if(!gf_IsNull(gnfdCode)) {
        var jsonParameter = {
            gnfdCode : gnfdCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm011/findMhshrm011', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.gnfdCode)) {
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
    var checkGnfdCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrm011 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrm011 = 0;
        save_Row_Ids_Mhshrm011 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrm011 = rowNum;
        save_Row_Ids_Mhshrm011 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm011 = rowNum;
        save_Row_Ids_Mhshrm011 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'gnfdCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'gnfdCodeNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdCodeNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'outptOrdr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'outptOrdr');
                    valid = false;
                }
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'outptOrdr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'outptOrdr');
        			gf_DhxSetValue(dhxGridMhshrm011, rowId, 'outptOrdr', '숫자입력', 'grid')
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkGnfdCode = gf_DhxGetValue(dhxGridObjet, rowId, 'gnfdCode', 'grid');
                    checkOutptOrdr = gf_DhxGetValue(dhxGridObjet, rowId, 'outptOrdr', 'grid');
                    if(!gf_IsNull(checkGnfdCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var gnfdCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'gnfdCode', 'grid');
                            var outptOrdr = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'outptOrdr', 'grid');
                            if(((gnfdCode == checkGnfdCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdCode');
                                valid = false;
                            }
                            if(((outptOrdr == checkOutptOrdr)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'outptOrdr');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm011( checkGnfdCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdCode');
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
        dhxGridMhshrm011.selectRowById(validFalseFistRowId);
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