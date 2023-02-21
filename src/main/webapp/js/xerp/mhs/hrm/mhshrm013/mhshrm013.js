/**
 *    프로그램       : 근태코드 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.04
 *    사용테이블      : MHS_DCLZ_CODE
 * sourceGen version : 2020.07.16.01 (2020.08.04)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm013 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm013 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm013 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm013 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm013 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm013 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm013 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm013;  //그리드 객체
var eventIdMhshrm013 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm013;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm013();
    if(cf_SetComponentsMhshrm013()){
       cf_SetEventListenerMhshrm013();
       cf_InitFormMhshrm013();
       cf_SetBindingMhshrm013();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm013 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm013").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsMhshrm013 = function() {
    var dhxGridMhshrm013HeaderInfo = [];
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrm013" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader('근태코드', '120', 'center', 'str', 'ed', false, 'dclzcode', '', '')); /* gf_LocaleTrans('default', 'titDclzcode') */
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader('근태코드명', '*', 'left', 'str', 'ed', false, 'dclzcodeNm', '', '')); /* gf_LocaleTrans('default', 'titDclzcodeNm') */
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '120', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader('결근구분', '120', 'center', 'str', 'coro', false, 'absencSeCode', '', '')); /* gf_LocaleTrans('default', 'titAbsencSeCode') */
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader('휴가구분', '120', 'left', 'str', 'coro', false, 'vacSeCode', '', '')); /* gf_LocaleTrans('default', 'titVacSeCode') */
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader('유무급구분', '120', 'center', 'str', 'coro', false, 'enncamtAt', '', '')); /* gf_LocaleTrans('default', 'titEnncamtAt') */
    dhxGridMhshrm013HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '10', 'center', 'str', 'ro', true, 'regId', '', ''));
    dhxGridMhshrm013 = gf_MakeDhxGrid('dataListMhshrm013', dhxGridMhshrm013HeaderInfo, true, false, false);
    dhxGridMhshrm013.enableAutoWidth(false);
    dhxGridMhshrm013.setEditable(true);

    dhxGridMhshrm013.setColumnMinWidth(50,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    var jsonParameter = {codekindCode : "C167",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridMhshrm013, dhxGridMhshrm013.getColIndexById("absencSeCode"), dataSource.data); /* 그리드콤보 : 결근구분*/

    var jsonParameter = {codekindCode : "C081",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridMhshrm013, dhxGridMhshrm013.getColIndexById("vacSeCode"), dataSource.data); /* 그리드콤보 : 휴가구분*/
    
    var dataSource = new Object() ;
    var data = new Object() ;
    data.code =  "0";
	data.codeNm = "유급";	
    var data2 = new Object() ;
    data2.code = "1";
	data2.codeNm = "무급";	
	var arrPointHistory = new Array();
	arrPointHistory.push(data);
	arrPointHistory.push(data2);
	dataSource.data = arrPointHistory;
    gf_ComboDataSet(dhxGridMhshrm013, dhxGridMhshrm013.getColIndexById("enncamtAt"), dataSource.data);
    
    return true; 
};

var cf_SetEventListenerMhshrm013 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm013 = gf_GridDetachEvent(dhxGridMhshrm013, eventIdMhshrm013);
    eventId = dhxGridMhshrm013.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm013();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm013.getColumnsNum();
            var rowNum = dhxGridMhshrm013.getRowsNum();
            var selectedId = dhxGridMhshrm013.getSelectedRowId();
            var ind        = dhxGridMhshrm013.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm013.getRowIndex(selectedId);
            var type       = dhxGridMhshrm013.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm013.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm013.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm013.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm013.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm013.getSelectedRowId();
            var ind        = dhxGridMhshrm013.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm013.getRowIndex(selectedId);
            var type       = dhxGridMhshrm013.getColType(ind);
            dhxGridMhshrm013.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm013.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm013.getSelectedRowId();
            var ind        = dhxGridMhshrm013.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm013.getRowIndex(selectedId);
            var type       = dhxGridMhshrm013.getColType(ind);
            dhxGridMhshrm013.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm013.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm013.push(eventId);
    eventId = dhxGridMhshrm013.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm013SortGridList(ind, type, direction); 
    });
    eventIdMhshrm013.push(eventId);
    eventId = dhxGridMhshrm013.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm013.push(eventId);
    eventId = dhxGridMhshrm013.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm013.push(eventId);
    eventId = dhxGridMhshrm013.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        var state = dhxDataProcessorMhshrm013.getState(rId);
        if(state != "inserted"){
        	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrm013, 'dclzcode')) { return false; }
        }
        return true;
    });
    eventIdMhshrm013.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm013()
    });
    $('#btnSaveMhshrm013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
    	dhxGridMhshrm013.selectRow(0);
        fn_SaveMhshrm013();
    });
    $('#btnRemoveMhshrm013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm013();
    });
    $('#btnExcelMhshrm013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm013();
    });
    $('#btnSearchMhshrm013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm013('');
    });
    $('#btnResetMhshrm013').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm013();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrm013').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrm013, $('#checkAllMhshrm013').prop('checked'), 'chk');
    });
    $('#searchFormMhshrm013 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm013').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMhshrm013 = function() {
    $('#searchFormMhshrm013').resetForm();
    $('#dclzcodeNmSearchFormMhshrm013').focus();
};

var cf_SetBindingMhshrm013 = function() {
    fn_SearchMhshrm013('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm013 = function(userId) {
    var jsonParameter = {
        dclzcodeNm : gf_FormGetValue('searchFormMhshrm013', 'dclzcodeNm', 'text'),
        useAt : gf_FormGetValue('searchFormMhshrm013', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm013/searchMhshrm013', jsonParameter, 'fn_CallbackSearchMhshrm013', false, 'GET');
};

var fn_CallbackSearchMhshrm013 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm013.clearAll();
    dhxGridMhshrm013.destructor();
    if(cf_SetComponentsMhshrm013()){ 
        fn_DhxDataProcessorMhshrm013(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm013');
            dhxGridMhshrm013.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mhshrm013 == 0 && save_All_Sta_Mhshrm013 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm013.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm013 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm013.selectRow(0);
            } else if(save_All_Sta_Mhshrm013 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm013.selectRow(save_Row_Num_Mhshrm013); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm013.selectRow(save_Row_Num_Mhshrm013);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm013.findCell(save_Row_Ids_Mhshrm013, gf_GetDhxGridColumId(dhxGridMhshrm013,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm013.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm013.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm013');
        }
        $("#spanCntSearchFormMhshrm013").text(data.data.records.length);
        cf_SetEventListenerMhshrm013();
    } 
};
var fn_DhxDataProcessorMhshrm013 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm013 = new dataProcessor(gv_ContextPath+'/mhshrm013/saveMhshrm013'); //lock feed url
    dhxDataProcessorMhshrm013.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm013.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm013.init(dhxGridMhshrm013); //link dataprocessor to the grid
    dhxDataProcessorMhshrm013.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm013.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm013.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm013();
                    $("#checkAllMhshrm013").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMhshrm013 = function() {
    dhxGridMhshrm013.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //dclzcode
    initValueArr.push(''); //dclzcodeNm
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //absencSeCode
    initValueArr.push(''); //vacSeCode
    initValueArr.push(''); //enncamtAt
    dhxGridMhshrm013.addRow(dhxGridMhshrm013.uid(), initValueArr, 0);
    dhxGridMhshrm013.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm013');
    $('#btnPopEmpSearchMhshrm013').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm013SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm013, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm013', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm013', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm013, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm013.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm013', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm013', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm013, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm013.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm013', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm013', 'sortColumId', '', 'text'); 
            dhxGridMhshrm013.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm013.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm013', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm013', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm013, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm013 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm013 = 0; 
    save_Edt_Cnt_Mhshrm013 = 0; 
    save_Del_Cnt_Mhshrm013 = 0; 
    dhxGridMhshrm013.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm013.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm013.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm013 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm013 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm013 += 1; 
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
        save_All_Sta_Mhshrm013 = 0; 
        if(save_Add_Cnt_Mhshrm013 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm013 + "건";
            save_All_Sta_Mhshrm013 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm013 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm013 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm013 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm013 + "건"; 
            save_All_Sta_Mhshrm013 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm013(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm013(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm013 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm013_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm013_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm013, dhxDataProcessorMhshrm013)) {
        dhxDataProcessorMhshrm013.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm013 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrm013, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrm013.forEachRow(function(rowId) {
            state = dhxDataProcessorMhshrm013.getState(rowId);
            if(dhxGridMhshrm013.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrm013, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrm013.getRowIndex(rowId);
                    dhxGridMhshrm013.deleteRow(rowId);
                    dhxGridMhshrm013.selectRow(rowNum);
                }
                else dhxDataProcessorMhshrm013.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrm013 = function () {
    var titMhshrm013 = '근태코드'; /* gf_LocaleTrans('default', 'titMhshrm013') */
    var jsonParameter = {
        dclzcodeNm : gf_FormGetValue('searchFormMhshrm013', 'dclzcodeNm', 'text'),
        useAt : gf_FormGetValue('searchFormMhshrm013', 'useAt', 'combo')
    };
    var header = [[
        '근태코드' /* gf_LocaleTrans('default', 'titDclzcode') */,
        '근태코드 명' /* gf_LocaleTrans('default', 'titDclzcodeNm') */,
        '결근 구분코드' /* gf_LocaleTrans('default', 'titAbsencSeCode') */,
        '휴가구분코드' /* gf_LocaleTrans('default', 'titVacSeCode') */,
        '유무급여부' /* gf_LocaleTrans('default', 'titEnncamtAt') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */
    ]];
    var dataId = [[ 'dclzcode', 'dclzcodeNm', 'absencSeCode', 'vacSeCode', 'enncamtAt', 'useAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm013 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm013;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm013/excelMhshrm013', jsonParameter);
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
    $('#saveFormMhshrm013 #dclzcodeSaveFormMhshrm013').parent().append(
    '<div class="error" id="dclzcodeSaveFormMhshrm013-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm013 = function(dclzcode){
    if(!gf_IsNull(dclzcode)) {
        var jsonParameter = {
            dclzcode : dclzcode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm013/findMhshrm013', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.dclzcode)) {
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
    var checkDclzcode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrm013 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrm013 = 0;
        save_Row_Ids_Mhshrm013 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrm013 = rowNum;
        save_Row_Ids_Mhshrm013 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm013 = rowNum;
        save_Row_Ids_Mhshrm013 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'dclzcode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dclzcode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'dclzcodeNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dclzcodeNm');
                    valid = false;
                }
                if(valid && gf_DhxGetValue(dhxGridObjet, rowId, 'dclzcode', 'grid').length > 9){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dclzcode');
    				gf_DivMsgAlert("근태코드 길이가 너무 깁니다.");
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkDclzcode = gf_DhxGetValue(dhxGridObjet, rowId, 'dclzcode', 'grid');
                    if(!gf_IsNull(checkDclzcode) && valid) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var dclzcode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'dclzcode', 'grid');
                            if(((dclzcode == checkDclzcode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dclzcode');
                				gf_DivMsgAlert("코드값이 존재합니다.");
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm013( checkDclzcode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dclzcode');
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
        dhxGridMhshrm013.selectRowById(validFalseFistRowId);
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