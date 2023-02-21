/**
 *    프로그램       : 과세기준 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.04
 *    사용테이블      : YND_TAXT_STD
 * sourceGen version : 2020.07.16.01 (2020.09.04)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Yndyta009 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Yndyta009 = 0;  //그리드 위치 상태 
var save_All_Sta_Yndyta009 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Yndyta009 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Yndyta009 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Yndyta009 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Yndyta009 = 0;  //그리드 삭제 수량 
var dhxGridYndyta009;  //그리드 객체
var eventIdYndyta009 = [];  //그리드 이벤트 객체 
var dhxDataProcessorYndyta009;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamYndyta009();
    if(cf_SetComponentsYndyta009()){
       cf_SetEventListenerYndyta009();
       cf_InitFormYndyta009();
       cf_SetBindingYndyta009();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamYndyta009 = function() {
    gf_SetMenuPath();
    $("#saveFormYndyta009").validate({ errorElement: 'div', ignore: '' });
    
    fn_Calender();
};

var cf_SetComponentsYndyta009 = function() {
    var dhxGridYndyta009HeaderInfo = [];
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllYndyta009" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader('귀속연도', '90', 'center', 'str', 'ro', false, 'belongYy', '', '')); /* gf_LocaleTrans('default', 'titBelongYy') */
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader('순서', '80', 'center', 'int', 'edn', false, 'serialNo', '', '')); /* gf_LocaleTrans('default', 'titSerialNo') */
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader('소득하한액', '140', 'right', 'int', 'edn', false, 'taxtLwltAmt', '', '')); /* gf_LocaleTrans('default', 'titTaxtLwltAmt') */
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader('소득상한액', '140', 'right', 'int', 'edn', false, 'taxtUplmtAmt', '', '')); /* gf_LocaleTrans('default', 'titTaxtUplmtAmt') */
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader('세율(%)', '80', 'right', 'int', 'edn', false, 'lmtRt', '', '')); /* gf_LocaleTrans('default', 'titLmtRt') */
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader('기준금액', '*', 'right', 'int', 'edn', false, 'stdrAmt', '', '')); /* gf_LocaleTrans('default', 'titStdrAmt') */
    dhxGridYndyta009HeaderInfo.push(gf_MakeDhxGridHeader('누진공제금액', '*', 'right', 'int', 'edn', false, 'lmtAmt', '', '')); /* gf_LocaleTrans('default', 'titLmtAmt') */
    dhxGridYndyta009 = gf_MakeDhxGrid('dataListYndyta009', dhxGridYndyta009HeaderInfo, true, false, false);
    dhxGridYndyta009.enableAutoWidth(false);
    dhxGridYndyta009.setEditable(true);

    dhxGridYndyta009.setColumnMinWidth(40,7); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    dhxGridYndyta009.setColumnMinWidth(40,7); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    dhxGridYndyta009.setNumberFormat("0,000", dhxGridYndyta009.getColIndexById("taxtLwltAmt"), ".", ",");
    dhxGridYndyta009.setNumberFormat("0,000", dhxGridYndyta009.getColIndexById("taxtUplmtAmt"), ".", ",");
    dhxGridYndyta009.setNumberFormat("0,000", dhxGridYndyta009.getColIndexById("stdrAmt"), ".", ",");
    dhxGridYndyta009.setNumberFormat("0,000", dhxGridYndyta009.getColIndexById("lmtAmt"), ".", ",");
    
    return true; 
};

var cf_SetEventListenerYndyta009 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdYndyta009 = gf_GridDetachEvent(dhxGridYndyta009, eventIdYndyta009);
    eventId = dhxGridYndyta009.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelYndyta009();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridYndyta009.getColumnsNum();
            var rowNum = dhxGridYndyta009.getRowsNum();
            var selectedId = dhxGridYndyta009.getSelectedRowId();
            var ind        = dhxGridYndyta009.getSelectedCellIndex();
            var rowIndex   = dhxGridYndyta009.getRowIndex(selectedId);
            var type       = dhxGridYndyta009.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridYndyta009.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridYndyta009.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridYndyta009.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridYndyta009.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridYndyta009.getSelectedRowId();
            var ind        = dhxGridYndyta009.getSelectedCellIndex();
            var rowIndex   = dhxGridYndyta009.getRowIndex(selectedId);
            var type       = dhxGridYndyta009.getColType(ind);
            dhxGridYndyta009.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridYndyta009.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridYndyta009.getSelectedRowId();
            var ind        = dhxGridYndyta009.getSelectedCellIndex();
            var rowIndex   = dhxGridYndyta009.getRowIndex(selectedId);
            var type       = dhxGridYndyta009.getColType(ind);
            dhxGridYndyta009.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridYndyta009.editCell();
            }
        }
        else return true;
    });
    eventIdYndyta009.push(eventId);
    eventId = dhxGridYndyta009.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Yndyta009SortGridList(ind, type, direction); 
    });
    eventIdYndyta009.push(eventId);
    eventId = dhxGridYndyta009.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdYndyta009.push(eventId);
    eventId = dhxGridYndyta009.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdYndyta009.push(eventId);
    eventId = dhxGridYndyta009.attachEvent("onEditCell", function(stage, rId, cInd){
    	var state = dhxDataProcessorYndyta009.getState(rId);
    	if(state != 'inserted'){
	    	if(cInd == gf_GetDhxGridColumId(dhxGridYndyta009, 'serialNo')) { return false; }
	    	if(cInd == gf_GetDhxGridColumId(dhxGridYndyta009, 'belongYy')) { return false; }
    	}
        return true;
    });
    eventIdYndyta009.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddYndyta009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddYndyta009()
    });
    $('#btnSaveYndyta009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = dhxGridYndyta009.getSelectedRowId();  //현재행 ID 
        var rowNum = dhxGridYndyta009.getRowIndex(rowIds);
        dhxGridYndyta009.selectRow(rowNum); 
        fn_SaveYndyta009();
    });
    $('#btnRemoveYndyta009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveYndyta009();
    });
    $('#btnExcelYndyta009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelYndyta009();
    });
    $('#btnSearchYndyta009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchYndyta009('');
    });
    $('#btnResetYndyta009').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormYndyta009();
    });
    //데이터 카피 
    $('#btnCopyYndyta009').unbind('click').bind('click', function() {
        var belongYy = gf_FormGetValue('searchFormYndyta009', 'searchBelongYy', 'text')
        
        if(gf_IsNull(belongYy)) {
             gf_DivMsgAlert("기준년도를 선택해 주세요");
             return false;
        } else {
            gf_DivMsgConfirm(belongYy+"기준으로 "+(Number(belongYy)+1)+"년에 데이터를 <br/>복사하시겠습니까?<br>*복사시 " + (Number(belongYy)+1) + "년 데이터가 초기화됩니다.", 'fn_CopyData()', '');
        }
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormYndyta009 input[name="searchBelongYy"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        fn_SearchYndyta009('');
    });
    $('#checkAllYndyta009').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridYndyta009, $('#checkAllYndyta009').prop('checked'), 'chk');
    });
    $('#searchFormYndyta009 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchYndyta009').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormYndyta009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormYndyta009 = function() {
    $('#searchFormYndyta009').resetForm();
	//금일 날짜표시
	$('#belongYySearchFormYndyta009').val(nowDate.substring(0,4));
};

var cf_SetBindingYndyta009 = function() {
    fn_SearchYndyta009('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchYndyta009 = function(userId) {
    var jsonParameter = {
        belongYy : gf_FormGetValue('searchFormYndyta009', 'searchBelongYy', 'text')
    };
    gf_FormSetValue('searchFormYndyta009', 'hiddenBelongYy',  gf_FormGetValue('searchFormYndyta009', 'searchBelongYy', 'text'), 'text');
    gf_Transaction(userId, 'yndyta009/searchYndyta009', jsonParameter, 'fn_CallbackSearchYndyta009', false, 'GET');
};

var fn_CallbackSearchYndyta009 = function(strSvcID, targetID, data) {
    //dhxGridYndyta009.clearAll();
    dhxGridYndyta009.destructor();
    if(cf_SetComponentsYndyta009()){ 
        fn_DhxDataProcessorYndyta009(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListYndyta009');
            dhxGridYndyta009.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Yndyta009 == 0 && save_All_Sta_Yndyta009 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridYndyta009.selectRow(0); 
            } else if(save_Row_Sta_Yndyta009 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridYndyta009.selectRow(0);
            } else if(save_All_Sta_Yndyta009 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridYndyta009.selectRow(save_Row_Num_Yndyta009); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridYndyta009.selectRow(save_Row_Num_Yndyta009);   //개발자 수정 필요  
                //var findCell = dhxGridYndyta009.findCell(save_Row_Ids_Yndyta009, gf_GetDhxGridColumId(dhxGridYndyta009,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridYndyta009.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridYndyta009.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListYndyta009');
        }
        $("#spanCntSearchFormYndyta009").text(data.data.records.length);
        cf_SetEventListenerYndyta009();
    } 
};
var fn_DhxDataProcessorYndyta009 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorYndyta009 = new dataProcessor(gv_ContextPath+'/yndyta009/saveYndyta009'); //lock feed url
    dhxDataProcessorYndyta009.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorYndyta009.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorYndyta009.init(dhxGridYndyta009); //link dataprocessor to the grid
    dhxDataProcessorYndyta009.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorYndyta009.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorYndyta009.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchYndyta009();
                    $("#checkAllYndyta009").prop('checked', false); //상단 체크박스 해제
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
var fn_AddYndyta009 = function() {
    dhxGridYndyta009.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(gf_FormGetValue('searchFormYndyta009', 'hiddenBelongYy', 'text')); //belongYy
    initValueArr.push(''); //serialNo
    initValueArr.push(''); //taxtLwltAmt
    initValueArr.push(''); //taxtUplmtAmt
    initValueArr.push(''); //lmtRt
    initValueArr.push(''); //stdrAmt
    initValueArr.push(''); //lmtAmt
    dhxGridYndyta009.addRow(dhxGridYndyta009.uid(), initValueArr, 0);
    dhxGridYndyta009.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListYndyta009');
    $('#btnPopEmpSearchYndyta009').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Yndyta009SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridYndyta009, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormYndyta009', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormYndyta009', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridYndyta009, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridYndyta009.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormYndyta009', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormYndyta009', 'sortColumId', gf_GetDhxGridColum(dhxGridYndyta009, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridYndyta009.setSortImgState(false); 
            gf_FormSetValue('searchFormYndyta009', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormYndyta009', 'sortColumId', '', 'text'); 
            dhxGridYndyta009.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridYndyta009.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormYndyta009', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormYndyta009', 'sortColumId', gf_GetDhxGridColum(dhxGridYndyta009, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveYndyta009 = function() {
    var edCnt = 0;
    save_Add_Cnt_Yndyta009 = 0; 
    save_Edt_Cnt_Yndyta009 = 0; 
    save_Del_Cnt_Yndyta009 = 0; 
    dhxGridYndyta009.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorYndyta009.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorYndyta009.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Yndyta009 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Yndyta009 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Yndyta009 += 1; 
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
        save_All_Sta_Yndyta009 = 0; 
        if(save_Add_Cnt_Yndyta009 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Yndyta009 + "건";
            save_All_Sta_Yndyta009 = 1; 
        } 
        if(save_Edt_Cnt_Yndyta009 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Yndyta009 + "건"; 
        } 
        if(save_Del_Cnt_Yndyta009 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Yndyta009 + "건"; 
            save_All_Sta_Yndyta009 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalYndyta009(gv_QueSave)){  //여기는 안옴 
        if(confirmModalYndyta009(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalYndyta009 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveYndyta009_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveYndyta009_Send = function() {
    if(fn_GridValidation(dhxGridYndyta009, dhxDataProcessorYndyta009)) {
        dhxDataProcessorYndyta009.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveYndyta009 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridYndyta009, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridYndyta009.forEachRow(function(rowId) {
            state = dhxDataProcessorYndyta009.getState(rowId);
            if(dhxGridYndyta009.cells(rowId, gf_GetDhxGridColumId(dhxGridYndyta009, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridYndyta009.getRowIndex(rowId);
                    dhxGridYndyta009.deleteRow(rowId);
                    dhxGridYndyta009.selectRow(rowNum);
                }
                else dhxDataProcessorYndyta009.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelYndyta009 = function () {
    var titYndyta009 = '과세기준'; /* gf_LocaleTrans('default', 'titYndyta009') */
    var jsonParameter = {
        belongYy : gf_FormGetValue('searchFormYndyta009', 'belongYy', 'text'),
        serialNo : gf_FormGetValue('searchFormYndyta009', 'serialNo', 'text')
    };
    var header = [[
        '귀속연도' /* gf_LocaleTrans('default', 'titBelongYy') */,
        '순서' /* gf_LocaleTrans('default', 'titSerialNo') */,
        '소득하한액' /* gf_LocaleTrans('default', 'titTaxtLwltAmt') */,
        '소득상한액' /* gf_LocaleTrans('default', 'titTaxtUplmtAmt') */,
        '세율(%)' /* gf_LocaleTrans('default', 'titLmtRt') */,
        '기준금액' /* gf_LocaleTrans('default', 'titStdrAmt') */,
        '누진공제금액' /* gf_LocaleTrans('default', 'titLmtAmt') */
    ]];
    var dataId = [[ 'belongYy', 'serialNo', 'taxtLwltAmt', 'taxtUplmtAmt', 'lmtRt', 'stdrAmt', 'lmtAmt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titYndyta009 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titYndyta009;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('yndyta009/excelYndyta009', jsonParameter);
};
/**
 * 년도 달력
 */
var fn_Calender = function(){

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#belongYySearchFormYndyta009').yearpicker({
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
	var belongYy = Number(gf_FormGetValue('searchFormYndyta009', 'searchBelongYy', 'text'))
	var jsonParameter = {
    		belongYy : belongYy
    }
	
	var dataSource = gf_NoAsyncTransaction('yndyta009/findSaveYndyta009', jsonParameter, 'GET');
    var checkNull = dataSource.data;
	
    if(!gf_IsNull(checkNull.belongYy)){
    	jsonParameter = {
        		belongYy : belongYy+1
        }
        var dataSource = gf_NoAsyncTransaction("yndyta009/saveCopyYndTaxtStd", jsonParameter, 'POST');
        if(dataSource.code === '000') {
           gf_DivMsgAlert(gf_LocaleTrans('default','mgsProcess')); // "정상처리 되었습니다
           gf_FormSetValue('saveFormTndyta009', belongYy+1, 'text');
           fn_SearchYndyta009('');
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
    $('#saveFormYndyta009 #belongYySaveFormYndyta009').parent().append(
    '<div class="error" id="belongYySaveFormYndyta009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormYndyta009 #serialNoSaveFormYndyta009').parent().append(
    '<div class="error" id="serialNoSaveFormYndyta009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupYndyta009 = function(belongYy, serialNo){
    if(!gf_IsNull(belongYy) && !gf_IsNull(serialNo)) {
        var jsonParameter = {
            belongYy : belongYy,
            serialNo : serialNo
        };
        var dataSource = gf_NoAsyncTransaction('yndyta009/findYndyta009', jsonParameter, 'GET');
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
    save_Row_Sta_Yndyta009 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Yndyta009 = 0;
        save_Row_Ids_Yndyta009 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Yndyta009 = rowNum;
        save_Row_Ids_Yndyta009 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Yndyta009 = rowNum;
        save_Row_Ids_Yndyta009 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'taxtLwltAmt', 'grid'), 1 ) || !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'taxtLwltAmt', 'grid'))){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'taxtLwltAmt');
                    gf_DhxSetValue(dhxGridObjet, rowId, 'taxtLwltAmt', '0', 'grid');
                    valid = false;
                }
                if(!gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'taxtUplmtAmt', 'grid'), 1 ) || !gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'taxtUplmtAmt', 'grid'))){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'taxtUplmtAmt');
                    gf_DhxSetValue(dhxGridObjet, rowId, 'taxtUplmtAmt', '0', 'grid');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'taxtLwltAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'taxtLwltAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'taxtUplmtAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'taxtUplmtAmt');
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
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'lmtAmt', 'grid')) ||  !gv_ValidateMethods.min( gf_DhxGetValue(dhxGridObjet, rowId, 'lmtAmt', 'grid'), 1 )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'lmtAmt');
                    gf_DhxSetValue(dhxGridObjet, rowId, 'lmtAmt', '0', 'grid');
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
//                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'belongYy');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'serialNo');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupYndyta009( checkBelongYy, checkSerialNo )){
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
        dhxGridYndyta009.selectRowById(validFalseFistRowId);
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
