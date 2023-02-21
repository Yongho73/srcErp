/**
 *    프로그램       : 직책관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.18
 *    사용테이블      : MHS_RSPOFC_CODE
 * sourceGen version : 2020.07.16.01 (2020.08.18)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm014 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm014 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm014 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm014 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm014 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm014 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm014 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm014;  //그리드 객체
var eventIdMhshrm014 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm014;  //DataProcessor 객체

var g_userId = '';
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm014();
    if(cf_SetComponentsMhshrm014()){
       cf_SetEventListenerMhshrm014();
       cf_InitFormMhshrm014();
       cf_SetBindingMhshrm014();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm014 = function() {
	//세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
	g_userId = userInfo.data.userId;
	
    gf_SetMenuPath();
};

var cf_SetComponentsMhshrm014 = function() {
    var dhxGridMhshrm014HeaderInfo = [];
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm014" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('직책코드', '120', 'center', 'str', 'ed', false, 'rspofcCode', '', '')); /* gf_LocaleTrans('default', 'titRspofcCode') */
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('직책명', '*', 'left', 'str', 'ed', false, 'rspofcNm', '', '')); /* gf_LocaleTrans('default', 'titRspofcNm') */
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'center', 'na', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('정렬순서', '80', 'right', 'int', 'edn', false, 'sortOrdr', '', '')); /* gf_LocaleTrans('default', 'titSortOrdr') */
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '100', 'left', 'str', 'ro', true, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '100', 'left', 'str', 'ro', true, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('직책수당 금액', '100', 'right', 'int', 'ro', true, 'rspofcAllwncAmt', '', '')); /* gf_LocaleTrans('default', 'titRspofcAllwncAmt') */
    dhxGridMhshrm014HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '100', 'right', 'str', 'ro', true, 'regId', '', '')); /* gf_LocaleTrans('default', 'titRegId') */
    
    dhxGridMhshrm014 = gf_MakeDhxGrid('dataListMhshrm014', dhxGridMhshrm014HeaderInfo, true, false, false);
    dhxGridMhshrm014.enableAutoWidth(false);
    dhxGridMhshrm014.setEditable(true);

    dhxGridMhshrm014.setColumnMinWidth(100,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrm014 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm014 = gf_GridDetachEvent(dhxGridMhshrm014, eventIdMhshrm014);
    eventId = dhxGridMhshrm014.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm014();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm014.getColumnsNum();
            var rowNum = dhxGridMhshrm014.getRowsNum();
            var selectedId = dhxGridMhshrm014.getSelectedRowId();
            var ind        = dhxGridMhshrm014.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm014.getRowIndex(selectedId);
            var type       = dhxGridMhshrm014.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm014.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm014.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm014.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm014.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm014.getSelectedRowId();
            var ind        = dhxGridMhshrm014.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm014.getRowIndex(selectedId);
            var type       = dhxGridMhshrm014.getColType(ind);
            dhxGridMhshrm014.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm014.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm014.getSelectedRowId();
            var ind        = dhxGridMhshrm014.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm014.getRowIndex(selectedId);
            var type       = dhxGridMhshrm014.getColType(ind);
            dhxGridMhshrm014.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm014.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm014.push(eventId);
    eventId = dhxGridMhshrm014.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm014SortGridList(ind, type, direction); 
    });
    eventIdMhshrm014.push(eventId);
    eventId = dhxGridMhshrm014.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm014.push(eventId);
    eventId = dhxGridMhshrm014.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
    });
    eventIdMhshrm014.push(eventId);
    eventId = dhxGridMhshrm014.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        var state = dhxDataProcessorMhshrm014.getState(rId);
    	if(state != 'inserted' && !gf_IsNull(gf_DhxGetValue(dhxGridMhshrm014, rId, 'regId', 'grid'))){
	    	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm014, 'rspofcCode')){ return false; }
    	}
    	
        return true;
    });
    eventIdMhshrm014.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm014').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm014()
    });
    $('#btnSaveMhshrm014').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = dhxGridMhshrm014.getSelectedRowId();  //현재행 ID 
        var rowNum = dhxGridMhshrm014.getRowIndex(rowIds);
        dhxGridMhshrm014.selectRow(rowNum); 
        fn_SaveMhshrm014();
    });
    $('#btnRemoveMhshrm014').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm014();
    });
    $('#btnExcelMhshrm014').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm014();
    });
    $('#btnSearchMhshrm014').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm014('');
    });
    $('#btnResetMhshrm014').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm014();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrm014').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrm014, $('#checkAllMhshrm014').prop('checked'), 'chk');
    });
    $('#searchFormMhshrm014 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm014').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
};

var cf_InitFormMhshrm014 = function() {
    $('#searchFormMhshrm014').resetForm();
    gf_FormSetValue('searchFormMhshrm014', 'useAt', '1', 'combo');
    $('#rspofcNmSearchFormMhshrm014').focus();
};

var cf_SetBindingMhshrm014 = function() {
    fn_SearchMhshrm014('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm014 = function(userId) {
    var jsonParameter = {
    	rspofcNm : gf_FormGetValue('searchFormMhshrm014', 'rspofcNm', 'text'),
        useAt : gf_FormGetValue('searchFormMhshrm014', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm014/searchMhshrm014', jsonParameter, 'fn_CallbackSearchMhshrm014', false, 'GET');
};

var fn_CallbackSearchMhshrm014 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm014.clearAll();
    dhxGridMhshrm014.destructor();
    if(cf_SetComponentsMhshrm014()){ 
        fn_DhxDataProcessorMhshrm014(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm014');
            dhxGridMhshrm014.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrm014 == 0 && save_All_Sta_Mhshrm014 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm014.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm014 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm014.selectRow(0);
            } else if(save_All_Sta_Mhshrm014 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm014.selectRow(save_Row_Num_Mhshrm014); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm014.selectRow(save_Row_Num_Mhshrm014);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm014.findCell(save_Row_Ids_Mhshrm014, gf_GetDhxGridColumId(dhxGridMhshrm014,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm014.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm014.selectRow(0);
                //} 
            } 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm014');
        }
        $("#spanCntSearchFormMhshrm014").text(data.data.records.length);
        cf_SetEventListenerMhshrm014();
    } 
};
var fn_DhxDataProcessorMhshrm014 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm014 = new dataProcessor(gv_ContextPath+'/mhshrm014/saveMhshrm014'); //lock feed url
    dhxDataProcessorMhshrm014.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm014.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm014.init(dhxGridMhshrm014); //link dataprocessor to the grid
    dhxDataProcessorMhshrm014.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm014.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm014.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm014();
                    $("#checkAllMhshrm014").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMhshrm014 = function() {
    dhxGridMhshrm014.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //rspofcCode
    initValueArr.push(''); //rspofcNm
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //sortOrdr
    initValueArr.push(''); //useBeginDe
    initValueArr.push(''); //useEndDe
    initValueArr.push(''); //rspofcAllwncAmt
    initValueArr.push(g_userId); //regId
    dhxGridMhshrm014.addRow(dhxGridMhshrm014.uid(), initValueArr, 0);
    dhxGridMhshrm014.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm014');
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm014SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm014, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm014', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm014', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm014, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm014.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm014', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm014', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm014, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm014.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm014', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm014', 'sortColumId', '', 'text'); 
            dhxGridMhshrm014.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm014.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm014', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm014', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm014, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm014 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm014 = 0; 
    save_Edt_Cnt_Mhshrm014 = 0; 
    save_Del_Cnt_Mhshrm014 = 0; 
    dhxGridMhshrm014.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm014.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm014.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm014 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm014 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm014 += 1; 
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
        save_All_Sta_Mhshrm014 = 0; 
        if(save_Add_Cnt_Mhshrm014 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm014 + "건";
            save_All_Sta_Mhshrm014 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm014 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm014 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm014 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm014 + "건"; 
            save_All_Sta_Mhshrm014 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm014(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm014(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm014 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm014_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm014_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm014, dhxDataProcessorMhshrm014)) {
        dhxDataProcessorMhshrm014.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm014 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrm014, 'chk');
    var checkRspofcCode;
    var useCheck;
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrm014.forEachRow(function(rowId) {
        	useCheck = false;
            state = dhxDataProcessorMhshrm014.getState(rowId);
            if(dhxGridMhshrm014.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrm014, 'chk')).isChecked()){
            	checkRspofcCode = gf_DhxGetValue(dhxGridMhshrm014, rowId, 'rspofcCode', 'grid')
            	if(!fn_UseCheckMhshrm014(checkRspofcCode) && state != 'inserted'){
            		gf_DivMsgAlert('사용중인 코드가 존재합니다.');
            		useCheck = true;
            	}
            	if(state == 'inserted') {
                    var rowNum = dhxGridMhshrm014.getRowIndex(rowId);
                    dhxGridMhshrm014.deleteRow(rowId);
                    dhxGridMhshrm014.selectRow(rowNum);
                }
                else {
                	if(!useCheck){
                		dhxDataProcessorMhshrm014.setUpdated(rowId, true, 'deleted');
                	}
                }
            }
        });
    }
}
/**
 * 사용여부 확인
 */
var fn_UseCheckMhshrm014 = function(rspofcCode){
    if(!gf_IsNull(rspofcCode)) {
        var jsonParameter = {
        		rspofcCode : rspofcCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm014/useCheckMhshrm014', jsonParameter, 'GET');
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
var fn_ExcelMhshrm014 = function () {
    var titMhshrm014 = '직책코드'; /* gf_LocaleTrans('default', 'titMhshrm014') */
    var jsonParameter = {
        	rspofcNm : gf_FormGetValue('searchFormMhshrm014', 'rspofcNm', 'text'),
            useAt : gf_FormGetValue('searchFormMhshrm014', 'useAt', 'combo')
    };
    var header = [[
        '직책코드' /* gf_LocaleTrans('default', 'titRspofcCode') */,
        '직책명' /* gf_LocaleTrans('default', 'titRspofcNm') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */
    ]];
    var dataId = [[ 'rspofcCode', 'rspofcNm', 'useAtNm' ]];
    var dataAlign = [[ 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm014 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm014;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm014/excelMhshrm014', jsonParameter);
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
var fn_CheckDupMhshrm014 = function(rspofcCode){
    if(!gf_IsNull(rspofcCode)) {
        var jsonParameter = {
            rspofcCode : rspofcCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm014/findMhshrm014', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.rspofcCode)) {
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
    var checkRspofcCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrm014 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshrm014 == 'deleted') {
        save_Row_Num_Mhshrm014 = 0;
        save_Row_Ids_Mhshrm014 = "";
    } else if(save_Row_Sta_Mhshrm014 == 'inserted') {
        save_Row_Num_Mhshrm014 = rowNum;
        save_Row_Ids_Mhshrm014 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm014 = rowNum;
        save_Row_Ids_Mhshrm014 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'rspofcCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rspofcCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'rspofcNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rspofcNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sortOrdr');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkRspofcCode = gf_DhxGetValue(dhxGridObjet, rowId, 'rspofcCode', 'grid');
                    checkSortOrdr = gf_DhxGetValue(dhxGridObjet, rowId, 'sortOrdr', 'grid');
                    if(!gf_IsNull(checkRspofcCode, checkSortOrdr)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var rspofcCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'rspofcCode', 'grid');
                            var sortOrdr = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'sortOrdr', 'grid');
                            if(((rspofcCode == checkRspofcCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rspofcCode');
                                valid = false;
                            }
                            if(((sortOrdr == checkSortOrdr)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sortOrdr');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm014( checkRspofcCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rspofcCode');
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
        dhxGridMhshrm014.selectRowById(validFalseFistRowId);
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
