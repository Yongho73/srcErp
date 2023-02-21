/**
 *    프로그램       : 근로소득세액기준관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.03
 *    사용테이블      : YND_LABOR_TAXDDC_STD
 * sourceGen version : 2020.07.16.01 (2020.09.03)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Yndyta008 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Yndyta008 = 0;  //그리드 위치 상태 
var save_All_Sta_Yndyta008 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Yndyta008 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Yndyta008 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Yndyta008 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Yndyta008 = 0;  //그리드 삭제 수량 
var dhxGridYndyta008;  //그리드 객체
var eventIdYndyta008 = [];  //그리드 이벤트 객체 
var dhxDataProcessorYndyta008;  //DataProcessor 객체

var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var checkAll = true;
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamYndyta008();
    if(cf_SetComponentsYndyta008()){
       cf_SetEventListenerYndyta008();
       cf_InitFormYndyta008();
       cf_SetBindingYndyta008();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamYndyta008 = function() {
    gf_SetMenuPath();
    $("#saveFormYndyta008").validate({ errorElement: 'div', ignore: '' });
//    gf_MakeComboBasic('divComboBelongYearSearchYndyta008','searchBelongYy','searchBelongYy','width:100px','yndyta008/combo/searchComboBelongYearList');
    fn_Calender();
};

var cf_SetComponentsYndyta008 = function() {
    var dhxGridYndyta008HeaderInfo = [];
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllYndyta008" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('귀속년도', '100', 'center', 'str', 'ro', false, 'belongYy', '', '')); /* gf_LocaleTrans('default', 'titBelongYy') */
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('순서', '80', 'center', 'int', 'edn', false, 'serialNo', '', '')); /* gf_LocaleTrans('default', 'titSerialNo') */
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('소득하한액', '150', 'right', 'int', 'edn', false, 'ddcLwltAmt', '', '')); /* gf_LocaleTrans('default', 'titDdcLwltAmt') */
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('소득상한액', '150', 'right', 'int', 'edn', false, 'ddcUplmtAmt', '', '')); /* gf_LocaleTrans('default', 'titDdcUplmtAmt') */
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('세울(%)', '100', 'center', 'int', 'edn', false, 'lmtRt', '', '')); /* gf_LocaleTrans('default', 'titLmtRt') */
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('기준금액', '150', 'right', 'int', 'edn', false, 'stdrAmt', '', '')); /* gf_LocaleTrans('default', 'titStdrAmt') */
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('공제액', '*', 'left', 'int', 'edn', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('한도 금액', '100', 'right', 'int', 'edn', true, 'lmtAmt', '', '')); /* gf_LocaleTrans('default', 'titLmtAmt') */
    dhxGridYndyta008HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '100', 'right', 'str', 'ro', true, 'regDt', '', '')); /* gf_LocaleTrans('default', 'titLmtAmt') */
    dhxGridYndyta008 = gf_MakeDhxGrid('dataListYndyta008', dhxGridYndyta008HeaderInfo, true, false, false);
    dhxGridYndyta008.enableAutoWidth(false);
    dhxGridYndyta008.setEditable(true);

    dhxGridYndyta008.setColumnMinWidth(80,8); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    dhxGridYndyta008.setNumberFormat("0,000", dhxGridYndyta008.getColIndexById("ddcLwltAmt"), ".", ",");
    dhxGridYndyta008.setNumberFormat("0,000", dhxGridYndyta008.getColIndexById("ddcUplmtAmt"), ".", ",");
    dhxGridYndyta008.setNumberFormat("0,000", dhxGridYndyta008.getColIndexById("stdrAmt"), ".", ",");
    return true; 
};

var cf_SetEventListenerYndyta008 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdYndyta008 = gf_GridDetachEvent(dhxGridYndyta008, eventIdYndyta008);
    eventId = dhxGridYndyta008.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelYndyta008();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridYndyta008.getColumnsNum();
            var rowNum = dhxGridYndyta008.getRowsNum();
            var selectedId = dhxGridYndyta008.getSelectedRowId();
            var ind        = dhxGridYndyta008.getSelectedCellIndex();
            var rowIndex   = dhxGridYndyta008.getRowIndex(selectedId);
            var type       = dhxGridYndyta008.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridYndyta008.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridYndyta008.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridYndyta008.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridYndyta008.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridYndyta008.getSelectedRowId();
            var ind        = dhxGridYndyta008.getSelectedCellIndex();
            var rowIndex   = dhxGridYndyta008.getRowIndex(selectedId);
            var type       = dhxGridYndyta008.getColType(ind);
            dhxGridYndyta008.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridYndyta008.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridYndyta008.getSelectedRowId();
            var ind        = dhxGridYndyta008.getSelectedCellIndex();
            var rowIndex   = dhxGridYndyta008.getRowIndex(selectedId);
            var type       = dhxGridYndyta008.getColType(ind);
            dhxGridYndyta008.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridYndyta008.editCell();
            }
        }
        else return true;
    });
    eventIdYndyta008.push(eventId);
    eventId = dhxGridYndyta008.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Yndyta008SortGridList(ind, type, direction); 
    });
    eventIdYndyta008.push(eventId);
    eventId = dhxGridYndyta008.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdYndyta008.push(eventId);
    eventId = dhxGridYndyta008.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdYndyta008.push(eventId);
    eventId = dhxGridYndyta008.attachEvent("onEditCell", function(stage, rId, cInd){
    	var state = dhxDataProcessorYndyta008.getState(rId);
    	if(state != 'inserted'){
        	if(cInd == gf_GetDhxGridColumId(dhxGridYndyta008, 'serialNo')) { return false; }
        	if(cInd == gf_GetDhxGridColumId(dhxGridYndyta008, 'belongYy')) { return false; }
        }
        return true;
    });
    eventIdYndyta008.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddYndyta008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddYndyta008()
    });
    $('#btnSaveYndyta008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = dhxGridYndyta008.getSelectedRowId();  //현재행 ID 
        var rowNum = dhxGridYndyta008.getRowIndex(rowIds);
        dhxGridYndyta008.selectRow(rowNum); 
        fn_SaveYndyta008();
    });
    $('#btnRemoveYndyta008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveYndyta008();
    });
    $('#btnExcelYndyta008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelYndyta008();
    });
    $('#btnSearchYndyta008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchYndyta008('');
    });
    $('#btnResetYndyta008').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormYndyta008();
    });
    //데이터 카피 
    $('#btnCopyYndyta008').unbind('click').bind('click', function() {
        var belongYy = gf_FormGetValue('searchFormYndyta008', 'searchBelongYy', 'text')
        
        if(gf_IsNull(belongYy)) {
             gf_DivMsgAlert("기준년도를 선택해 주세요");
             return false;
        } else {
        	gf_DivMsgConfirm(belongYy+"기준으로 "+(Number(belongYy)+1)+"년에 데이터를 <br/>복사하시겠습니까?<br>*복사시 " + (Number(belongYy)+1) + "년 데이터가 초기화됩니다.", 'fn_CopyData()', '');
        }
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormYndyta008 input[name="searchBelongYy"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        fn_SearchYndyta008('');
    });
    $('#checkAllYndyta008').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridYndyta008, $('#checkAllYndyta008').prop('checked'), 'chk');
    });
    $('#searchFormYndyta008 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchYndyta008').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormYndyta008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormYndyta008 = function() {
    $('#searchFormYndyta008').resetForm();
	//금일 날짜표시
	$('#belongYySearchFormYndyta008').val(nowDate.substring(0,4));
};

var cf_SetBindingYndyta008 = function() {
    fn_SearchYndyta008('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchYndyta008 = function(userId) {
    var jsonParameter = {
        belongYy : gf_FormGetValue('searchFormYndyta008', 'searchBelongYy', 'text')
    };
    gf_FormSetValue('searchFormYndyta008', 'hiddenBelongYy', gf_FormGetValue('searchFormYndyta008', 'searchBelongYy', 'text'), 'text');
    gf_Transaction(userId, 'yndyta008/searchYndyta008', jsonParameter, 'fn_CallbackSearchYndyta008', false, 'GET');
};

var fn_CallbackSearchYndyta008 = function(strSvcID, targetID, data) {
    //dhxGridYndyta008.clearAll();
    dhxGridYndyta008.destructor();
    if(cf_SetComponentsYndyta008()){ 
        fn_DhxDataProcessorYndyta008(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListYndyta008');
            dhxGridYndyta008.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Yndyta008 == 0 && save_All_Sta_Yndyta008 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridYndyta008.selectRow(0); 
            } else if(save_Row_Sta_Yndyta008 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridYndyta008.selectRow(0);
            } else if(save_All_Sta_Yndyta008 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridYndyta008.selectRow(save_Row_Num_Yndyta008); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridYndyta008.selectRow(save_Row_Num_Yndyta008);   //개발자 수정 필요  
                //var findCell = dhxGridYndyta008.findCell(save_Row_Ids_Yndyta008, gf_GetDhxGridColumId(dhxGridYndyta008,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridYndyta008.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridYndyta008.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListYndyta008');
        }
        $("#spanCntSearchFormYndyta008").text(data.data.records.length);
        cf_SetEventListenerYndyta008();
    } 
};
var fn_DhxDataProcessorYndyta008 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorYndyta008 = new dataProcessor(gv_ContextPath+'/yndyta008/saveYndyta008'); //lock feed url
    dhxDataProcessorYndyta008.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorYndyta008.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorYndyta008.init(dhxGridYndyta008); //link dataprocessor to the grid
    dhxDataProcessorYndyta008.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorYndyta008.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorYndyta008.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchYndyta008();
                    $("#checkAllYndyta008").prop('checked', false); //상단 체크박스 해제
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
var fn_AddYndyta008 = function() {
    dhxGridYndyta008.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(gf_FormGetValue('searchFormYndyta008', 'hiddenBelongYy', 'text')); //belongYy
    initValueArr.push(''); //serialNo
    initValueArr.push(''); //ddcLwltAmt
    initValueArr.push(''); //ddcUplmtAmt
    initValueArr.push(''); //stdrAmt
    initValueArr.push(''); //lmtAmt
    initValueArr.push(''); //lmtRt
    initValueArr.push(''); //rm
    dhxGridYndyta008.addRow(dhxGridYndyta008.uid(), initValueArr, 0);
    dhxGridYndyta008.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListYndyta008');
    $('#btnPopEmpSearchYndyta008').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Yndyta008SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridYndyta008, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormYndyta008', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormYndyta008', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridYndyta008, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridYndyta008.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormYndyta008', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormYndyta008', 'sortColumId', gf_GetDhxGridColum(dhxGridYndyta008, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridYndyta008.setSortImgState(false); 
            gf_FormSetValue('searchFormYndyta008', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormYndyta008', 'sortColumId', '', 'text'); 
            dhxGridYndyta008.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridYndyta008.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormYndyta008', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormYndyta008', 'sortColumId', gf_GetDhxGridColum(dhxGridYndyta008, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveYndyta008 = function() {
    var edCnt = 0;
    save_Add_Cnt_Yndyta008 = 0; 
    save_Edt_Cnt_Yndyta008 = 0; 
    save_Del_Cnt_Yndyta008 = 0; 
    dhxGridYndyta008.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorYndyta008.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorYndyta008.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Yndyta008 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Yndyta008 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Yndyta008 += 1; 
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
        save_All_Sta_Yndyta008 = 0; 
        if(save_Add_Cnt_Yndyta008 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Yndyta008 + "건";
            save_All_Sta_Yndyta008 = 1; 
        } 
        if(save_Edt_Cnt_Yndyta008 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Yndyta008 + "건"; 
        } 
        if(save_Del_Cnt_Yndyta008 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Yndyta008 + "건"; 
            save_All_Sta_Yndyta008 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalYndyta008(gv_QueSave)){  //여기는 안옴 
        if(confirmModalYndyta008(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalYndyta008 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveYndyta008_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveYndyta008_Send = function() {
    if(fn_GridValidation(dhxGridYndyta008, dhxDataProcessorYndyta008)) {
        dhxDataProcessorYndyta008.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveYndyta008 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridYndyta008, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridYndyta008.forEachRow(function(rowId) {
            state = dhxDataProcessorYndyta008.getState(rowId);
            if(dhxGridYndyta008.cells(rowId, gf_GetDhxGridColumId(dhxGridYndyta008, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridYndyta008.getRowIndex(rowId);
                    dhxGridYndyta008.deleteRow(rowId);
                    dhxGridYndyta008.selectRow(rowNum);
                }
                else dhxDataProcessorYndyta008.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelYndyta008 = function () {
    var titYndyta008 = '근로소득세액기준관리'; /* gf_LocaleTrans('default', 'titYndyta008') */
    var jsonParameter = {
        belongYy : gf_FormGetValue('searchFormYndyta008', 'belongYy', 'text')
    };
    var header = [[
        '귀속연도' /* gf_LocaleTrans('default', 'titBelongYy') */,
        '순서' /* gf_LocaleTrans('default', 'titSerialNo') */,
        '소득하한액' /* gf_LocaleTrans('default', 'titDdcLwltAmt') */,
        '소득상한액' /* gf_LocaleTrans('default', 'titDdcUplmtAmt') */,
        '세율(%)' /* gf_LocaleTrans('default', 'titLmtRt') */,
        '기준금액' /* gf_LocaleTrans('default', 'titStdrAmt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'belongYy', 'serialNo', 'ddcLwltAmt', 'ddcUplmtAmt', 'lmtRt', 'stdrAmt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titYndyta008 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titYndyta008;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('yndyta008/excelYndyta008', jsonParameter);
};
/**
 * 년도 달력
 */
var fn_Calender = function(){

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#belongYySearchFormYndyta008').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
}
//날짜 포멧 처리
function dateFormat(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1; //January is 0!
  var yyyy = date.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  var nDate = yyyy+'-'+mm+'-'+dd;
  return(nDate);
}
/**
 * 전년도 복사
 */
var fn_CopyData =function (){
	var belongYy = Number(gf_FormGetValue('searchFormYndyta008', 'searchBelongYy', 'text'))
	var jsonParameter = {
    		belongYy : belongYy
    }
	
	var dataSource = gf_NoAsyncTransaction('yndyta008/findSaveYndyta008', jsonParameter, 'GET');
    var checkNull = dataSource.data;
	
    if(!gf_IsNull(checkNull.belongYy)){
    	jsonParameter = {
        		belongYy : belongYy+1
        }
        var dataSource = gf_NoAsyncTransaction("yndyta008/saveCopyYndLaborTaxddcStd", jsonParameter, 'POST');
        if(dataSource.code === '000') {
           gf_DivMsgAlert(gf_LocaleTrans('default','mgsProcess')); // "정상처리 되었습니다
           gf_FormSetValue('saveFormTndyta008', belongYy+1, 'text');
           fn_SearchYndyta008('');
        }
    } else {
        gf_DivMsgAlert("복사할 데이터가 존재하지 않습니다.");
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
    $('#saveFormYndyta008 #belongYySaveFormYndyta008').parent().append(
    '<div class="error" id="belongYySaveFormYndyta008-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormYndyta008 #serialNoSaveFormYndyta008').parent().append(
    '<div class="error" id="serialNoSaveFormYndyta008-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupYndyta008 = function(belongYy, serialNo){
    if(!gf_IsNull(belongYy) && !gf_IsNull(serialNo)) {
        var jsonParameter = {
            belongYy : belongYy,
            serialNo : serialNo
        };
        var dataSource = gf_NoAsyncTransaction('yndyta008/findYndyta008', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.belongYy) && gf_IsNull(data.serialNo)) {
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
    var checkBelongYy;
    var checkSerialNo;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Yndyta008 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Yndyta008 = 0;
        save_Row_Ids_Yndyta008 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Yndyta008 = rowNum;
        save_Row_Ids_Yndyta008 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Yndyta008 = rowNum;
        save_Row_Ids_Yndyta008 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'belongYy', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'belongYy');
                    valid = false;
                }
                if(!gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'serialNo', 'grid'), 1 ) || !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'serialNo', 'grid'))){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'serialNo');
                	gf_DhxSetValue(dhxGridObjet, rowId, 'serialNo', '', 'grid');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'serialNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'serialNo');
                    valid = false;
                }
                if(!gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'ddcLwltAmt', 'grid'), 1 ) || !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'ddcLwltAmt', 'grid'))){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ddcLwltAmt');
                    gf_DhxSetValue(dhxGridObjet, rowId, 'ddcLwltAmt', '0', 'grid');
                    valid = false;
                }
                if(!gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'ddcUplmtAmt', 'grid'), 1 ) || !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'ddcUplmtAmt', 'grid'))){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ddcUplmtAmt');
                    gf_DhxSetValue(dhxGridObjet, rowId, 'ddcUplmtAmt', '0', 'grid');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ddcLwltAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ddcLwltAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ddcUplmtAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ddcUplmtAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'lmtRt', 'grid')) ||  !gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'lmtRt', 'grid'), 1 )){
                    gf_DhxSetValue(dhxGridObjet, rowId, 'lmtRt', '0', 'grid');
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'lmtRt');
                    valid = false;
                }
                if(!gv_ValidateMethods.max( gf_DhxGetValue(dhxGridObjet, rowId, 'lmtRt', 'grid'), 99.999 )){
                	gf_DhxSetValue(dhxGridObjet, rowId, 'lmtRt', '99', 'grid');
                	fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'lmtRt');
                	valid = false;
                }
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'stdrAmt', 'grid')) ||  !gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'stdrAmt', 'grid'), 1 )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'stdrAmt');
                    gf_DhxSetValue(dhxGridObjet, rowId, 'stdrAmt', '0', 'grid');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkBelongYy = gf_DhxGetValue(dhxGridObjet, rowId, 'belongYy', 'grid');
                    checkSerialNo = gf_DhxGetValue(dhxGridObjet, rowId, 'serialNo', 'grid');
                    if(!gf_IsNull(checkBelongYy, checkSerialNo)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var belongYy = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'belongYy', 'grid');
                            var serialNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'serialNo', 'grid');
                            if(((belongYy == checkBelongYy) && (serialNo == checkSerialNo)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'belongYy');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'serialNo');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupYndyta008( checkBelongYy, checkSerialNo )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'belongYy');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'serialNo');
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
        dhxGridYndyta008.selectRowById(validFalseFistRowId);
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
