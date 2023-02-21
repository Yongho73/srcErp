/**
 *    프로그램       : 급여관리_계좌 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.09
 *    사용테이블      : MHS_ACNUT
 * sourceGen version : 2020.06.29.01 (2020.07.09)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_MpscalAcnut = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MpscalAcnut = 0;  //그리드 위치 상태 
var save_All_Sta_MpscalAcnut = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MpscalAcnut = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MpscalAcnut = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MpscalAcnut = 0;  //그리드 저장 수량 
var save_Del_Cnt_MpscalAcnut = 0;  //그리드 삭제 수량 
 
var titMhsAcnut = gf_LocaleTrans('default', 'titAcnut');
var g_AcnutSearchValue = new Object();  // 정보 최초 조회 값
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscalAcnut();
    cf_SetComponentsMpscalAcnut();
    cf_SetEventListenerMpscalAcnut();
    cf_InitFormMpscalAcnut();
    cf_SetBindingMpscalAcnut();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscalAcnut = function() {
//    gf_SetMenuPath();
//    $("#saveFormMpscalAcnut").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMpscalAcnut;
var cf_SetComponentsMpscalAcnut = function() {
    var dhxGridMpscalAcnutHeaderInfo = [];
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscalAcnut" />', '0', 'center', 'na', 'ch', true, 'chk', '', ''));
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '0', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('계좌순번', '0', 'right', 'int', 'ro', true, 'acnutSn', '', '')); /* gf_LocaleTrans('default', 'titAcnutSn') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('계좌구분', '200', 'center', 'str', 'coro', false, 'acnutSeCode', '', '')); /* gf_LocaleTrans('default', 'titAcnutSeCode') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('은행명', '200', 'center', 'str', 'coro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('은행명', '0', 'left', 'str', 'ro', true, 'bankNm', '', '')); /* gf_LocaleTrans('default', 'titBankNm') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '*', 'center', 'str', 'ed', false, 'acnutno', '', '')); /* gf_LocaleTrans('default', 'titAcnutno') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '200', 'center', 'str', 'ed', false, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('시작일자', '0', 'left', 'str', 'ro', true, 'beginDe', '', '')); /* gf_LocaleTrans('default', 'titBeginDe') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('종료일자', '0', 'left', 'str', 'ro', true, 'endDe', '', '')); /* gf_LocaleTrans('default', 'titEndDe') */
    dhxGridMpscalAcnutHeaderInfo.push(gf_MakeDhxGridHeader('통장 첨부파일번호', '0', 'center', 'str', 'ro', true, 'bnkbAtchmnflno', '', '')); /* gf_LocaleTrans('default', 'titBnkbAtchmnflno') */
    dhxGridMpscalAcnut = gf_MakeDhxGrid('dataListMpscalAcnut', dhxGridMpscalAcnutHeaderInfo, true, false, false);
    dhxGridMpscalAcnut.enableAutoWidth(false);
    dhxGridMpscalAcnut.setEditable(true);

    dhxGridMpscalAcnut.setColumnMinWidth(300,7); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    dhxGridMpscalAcnut.enableEditEvents(true, false, false); // 원클릭, 더블클릭, F2key
    
    // 은행코드
    var bankCodejsonParameter = {codekindCode : "C010",exceptCode :"",sortOrder :"asc" };
    var bankCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', bankCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscalAcnut, dhxGridMpscalAcnut.getColIndexById("bankCode"), bankCodedataSource.data, "sel");
    
    // 계좌구분코드
    var acnutSeCodejsonParameter = {codekindCode : "C471",exceptCode :"",sortOrder :"asc" };
    var acnutSeCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', acnutSeCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscalAcnut, dhxGridMpscalAcnut.getColIndexById("acnutSeCode"), acnutSeCodedataSource.data, "sel");
};

var eventIdMpscalAcnut = [];
var cf_SetEventListenerMpscalAcnut = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscalAcnut = gf_GridDetachEvent(dhxGridMpscalAcnut, eventIdMpscalAcnut);
    eventId = dhxGridMpscalAcnut.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscalAcnut();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscalAcnut.getColumnsNum();
            var rowNum = dhxGridMpscalAcnut.getRowsNum();
            var selectedId = dhxGridMpscalAcnut.getSelectedRowId();
            var ind        = dhxGridMpscalAcnut.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalAcnut.getRowIndex(selectedId);
            var type       = dhxGridMpscalAcnut.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscalAcnut.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscalAcnut.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscalAcnut.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalAcnut.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscalAcnut.getSelectedRowId();
            var ind        = dhxGridMpscalAcnut.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalAcnut.getRowIndex(selectedId);
            var type       = dhxGridMpscalAcnut.getColType(ind);
            dhxGridMpscalAcnut.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalAcnut.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscalAcnut.getSelectedRowId();
            var ind        = dhxGridMpscalAcnut.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscalAcnut.getRowIndex(selectedId);
            var type       = dhxGridMpscalAcnut.getColType(ind);
            dhxGridMpscalAcnut.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscalAcnut.editCell();
            }
        }
        else return true;
    });
    eventIdMpscalAcnut.push(eventId);
    eventId = dhxGridMpscalAcnut.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_MpscalAcnutSortGridList(ind, type, direction); 
    });
    eventIdMpscalAcnut.push(eventId);
    eventId = dhxGridMpscalAcnut.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscalAcnut.push(eventId);
    eventId = dhxGridMpscalAcnut.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMpscalAcnut.push(eventId);
    eventId = dhxGridMpscalAcnut.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscalAcnut.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscalAcnut').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscalAcnut()
    });
    $('#btnSaveMpscalAcnut').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var acnutSeCode = dhxGridMpscalAcnut.cells(dhxGridMpscalAcnut.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalAcnut,'acnutSeCode')).getValue();
        console.log(acnutSeCode)
        if(gf_IsNull(acnutSeCode)){
        	gf_DivMsgAlert("계좌구분을 선택해주세요.");
        	return false;
        }
        var bankCode = dhxGridMpscalAcnut.cells(dhxGridMpscalAcnut.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalAcnut,'bankCode')).getValue();
        if(gf_IsNull(bankCode)){
        	gf_DivMsgAlert("은행명을 입력해주세요.");
        	return false;
        }
        var acnutno = dhxGridMpscalAcnut.cells(dhxGridMpscalAcnut.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalAcnut,'acnutno')).getValue();
        if(gf_IsNull(acnutno)){
        	gf_DivMsgAlert("계좌번호를 입력해주세요.");
        	return false;
        }
        var dpstrNm = dhxGridMpscalAcnut.cells(dhxGridMpscalAcnut.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalAcnut,'dpstrNm')).getValue();
        if(gf_IsNull(dpstrNm)){
        	gf_DivMsgAlert("예금주명을 입력해주세요.");
        	return false;
        }
        fn_SaveMpscalAcnut();
        
    });
    $('#btnRemoveMpscalAcnut').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscalAcnut();
    });
    $('#btnExcelMpscalAcnut').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscalAcnut();
    });
    $('#btnSearchMpscalAcnut').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscalAcnut('');
    });
    $('#btnResetMpscalAcnut').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscalAcnut();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscalAcnut').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscalAcnut, $('#checkAllMpscalAcnut').prop('checked'), 'chk');
    });
    $('#searchFormMpscalAcnut input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpscalAcnut').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrbAcnut") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpscalAcnut').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpscalAcnut = function() {
    $('#searchFormMpscalAcnut').resetForm();
};

var cf_SetBindingMpscalAcnut = function() {
    fn_SearchMpscalAcnut('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscalAcnut = function(userId) {
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscalAcnut', 'empno', 'text')
    };
    gf_Transaction(userId, 'mpscal022/searchMpscalAcnut', jsonParameter, 'fn_CallbackSearchMpscalAcnut', false, 'GET');
};

var dhxDataProcessorMpscalAcnut;
var fn_CallbackSearchMpscalAcnut = function(strSvcID, targetID, data) {
    dhxGridMpscalAcnut.clearAll();
    fn_DhxDataProcessorMpscalAcnut(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscalAcnut');
        dhxGridMpscalAcnut.parse(data.data.records, 'js');
 
        if(save_Row_Ids_MpscalAcnut == 0 && save_All_Sta_MpscalAcnut == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscalAcnut.selectRow(0); 
        } else if(save_Row_Sta_MpscalAcnut == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscalAcnut.selectRow(0);
        } else if(save_All_Sta_MpscalAcnut == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscalAcnut.selectRow(save_Row_Num_MpscalAcnut); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscalAcnut.selectRow(save_Row_Num_MpscalAcnut);   //개발자 수정 필요  
            //var findCell = dhxGridMpscalAcnut.findCell(save_Row_Ids_MpscalAcnut, gf_GetDhxGridColumId(dhxGridMpscalAcnut,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscalAcnut.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscalAcnut.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscalAcnut');
    }
    $("#spanCntSearchFormMpscalAcnut").text(data.data.records.length);
    cf_SetEventListenerMpscalAcnut();
};
var fn_DhxDataProcessorMpscalAcnut = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscalAcnut = new dataProcessor(gv_ContextPath+'/mpscal022/saveMpscalAcnut'); //lock feed url
    dhxDataProcessorMpscalAcnut.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscalAcnut.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscalAcnut.init(dhxGridMpscalAcnut); //link dataprocessor to the grid
    dhxDataProcessorMpscalAcnut.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscalAcnut.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscalAcnut.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscalAcnut();
                    $("#checkAllMpscalAcnut").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpscalAcnut = function() {
    dhxGridMpscalAcnut.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //empno
    initValueArr.push(''); //acnutSn
    initValueArr.push(''); //acnutSeCode
    initValueArr.push(''); //bankCode
    initValueArr.push(''); //bankNm
    initValueArr.push(''); //acnutno
    initValueArr.push(''); //dpstrNm
    initValueArr.push(''); //beginDe
    initValueArr.push(''); //endDe
    initValueArr.push(''); //bnkbAtchmnflno
    initValueArr.push(''); //rm
    dhxGridMpscalAcnut.addRow(dhxGridMpscalAcnut.uid(), initValueArr, 0);
    dhxGridMpscalAcnut.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscalAcnut');
    $('#btnPopEmpSearchMpscalAcnut').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_MpscalAcnutSortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscalAcnut, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscalAcnut', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscalAcnut', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscalAcnut, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscalAcnut.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscalAcnut', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscalAcnut', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscalAcnut, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscalAcnut.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscalAcnut', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscalAcnut', 'sortColumId', '', 'text'); 
            dhxGridMpscalAcnut.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscalAcnut.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscalAcnut', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscalAcnut', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscalAcnut, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscalAcnut = function() {
    var edCnt = 0;
    save_Add_Cnt_MpscalAcnut = 0; 
    save_Edt_Cnt_MpscalAcnut = 0; 
    save_Del_Cnt_MpscalAcnut = 0; 
    dhxGridMpscalAcnut.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscalAcnut.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscalAcnut.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MpscalAcnut += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MpscalAcnut += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MpscalAcnut += 1; 
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
        save_All_Sta_MpscalAcnut = 0; 
        if(save_Add_Cnt_MpscalAcnut > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MpscalAcnut + "건";
            save_All_Sta_MpscalAcnut = 1; 
        } 
        if(save_Edt_Cnt_MpscalAcnut > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MpscalAcnut + "건"; 
        } 
        if(save_Del_Cnt_MpscalAcnut > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MpscalAcnut + "건"; 
            save_All_Sta_MpscalAcnut = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscalAcnut(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscalAcnut(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscalAcnut = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscalAcnut_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscalAcnut_Send = function() {
    if(fn_GridValidation(dhxGridMpscalAcnut, dhxDataProcessorMpscalAcnut)) {
        dhxDataProcessorMpscalAcnut.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscalAcnut = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscalAcnut, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscalAcnut.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscalAcnut.getState(rowId);
            if(dhxGridMpscalAcnut.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscalAcnut, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscalAcnut.getRowIndex(rowId);
                    dhxGridMpscalAcnut.deleteRow(rowId);
                    dhxGridMpscalAcnut.selectRow(rowNum);
                }
                else dhxDataProcessorMpscalAcnut.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscalAcnut = function () {
    var titMpscalAcnut = '급여관리_계좌'; /* gf_LocaleTrans('default', 'titMpscalAcnut') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscalAcnut', 'empno', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '계좌순번' /* gf_LocaleTrans('default', 'titAcnutSn') */,
        '계좌구분코드' /* gf_LocaleTrans('default', 'titAcnutSeCode') */,
        '은행코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '은행명' /* gf_LocaleTrans('default', 'titBankNm') */,
        '계좌번호' /* gf_LocaleTrans('default', 'titAcnutno') */,
        '예금주명' /* gf_LocaleTrans('default', 'titDpstrNm') */,
        '시작일자' /* gf_LocaleTrans('default', 'titBeginDe') */,
        '종료일자' /* gf_LocaleTrans('default', 'titEndDe') */,
        '통장 첨부파일번호' /* gf_LocaleTrans('default', 'titBnkbAtchmnflno') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empno', 'acnutSn', 'acnutSeCode', 'bankCode', 'bankNm', 'acnutno', 'dpstrNm', 'beginDe', 'endDe', 'bnkbAtchmnflno', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscalAcnut ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscalAcnut;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscalAcnut/excelMpscalAcnut', jsonParameter);
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
    $('#saveFormMpscalAcnut #empnoSaveFormMpscalAcnut').parent().append(
    '<div class="error" id="empnoSaveFormMpscalAcnut-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscalAcnut = function(empno, acnutSeCode){
    if(!gf_IsNull(empno)) {
        var jsonParameter = {
            empno : empno,
        };
        var dataSource = gf_NoAsyncTransaction('mpscalAcnut/findMpscalAcnut', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.acnutSeCode)) {
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
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_MpscalAcnut = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_MpscalAcnut = 0;
        save_Row_Ids_MpscalAcnut = "";
    } else if(state == 'inserted') {
        save_Row_Num_MpscalAcnut = rowNum;
        save_Row_Ids_MpscalAcnut = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_MpscalAcnut = rowNum;
        save_Row_Ids_MpscalAcnut = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkEmpno, checkAcnutSeCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscalAcnut( checkEmpno, checkAcnutSeCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
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
        dhxGridMpscalAcnut.selectRowById(validFalseFistRowId);
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
