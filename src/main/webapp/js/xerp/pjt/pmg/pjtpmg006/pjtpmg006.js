/**
 *    프로그램       : 프로젝트예산집행현황 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.04.21
 *    사용테이블      : PJT_BUGT_ACMSLT
 * sourceGen version : 2021.02.18.01 (2021.04.21)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pjtpmg006 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pjtpmg006 = 0;  //그리드 위치 상태 
var save_All_Sta_Pjtpmg006 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pjtpmg006 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Values_Pjtpmg006 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pjtpmg006 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pjtpmg006 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pjtpmg006 = 0;  //그리드 삭제 수량 
var dhxGridPjtpmg006;  //그리드 객체
var eventIdPjtpmg006 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPjtpmg006;  //DataProcessor 객체

var nowDate = "";
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPjtpmg006();
    if(cf_SetComponentsPjtpmg006()){
       cf_SetEventListenerPjtpmg006();
       cf_InitFormPjtpmg006();
       cf_SetBindingPjtpmg006();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPjtpmg006 = function() {
    gf_SetMenuPath();
    $("#saveFormPjtpmg006").validate({ errorElement: 'div', ignore: '' });

	//금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    
    fn_Calendar();
};

var cf_SetComponentsPjtpmg006 = function() {
    var dhxGridPjtpmg006HeaderInfo = [];
    dhxGridPjtpmg006HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPjtpmg006HeaderInfo.push(gf_MakeDhxGridHeader('프로젝트명', '500', 'left', 'str', 'ro', false, 'projectNm', '', '')); /* gf_LocaleTrans('default', 'titProjectSn') */
    dhxGridPjtpmg006HeaderInfo.push(gf_MakeDhxGridHeader('거래처', '250', 'left', 'str', 'ro', false, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titBugtAcmsltSn') */
    dhxGridPjtpmg006HeaderInfo.push(gf_MakeDhxGridHeader('시작일자/종료일자', '200', 'center', 'str', 'ro', false, 'projectDe', '', '')); /* gf_LocaleTrans('default', 'titAcntCode') */
    dhxGridPjtpmg006HeaderInfo.push(gf_MakeDhxGridHeader('계획금액', '200', 'right', 'int', 'ron', false, 'bugtAmt', '', '')); /* gf_LocaleTrans('default', 'titPrmpcTy') */
    dhxGridPjtpmg006HeaderInfo.push(gf_MakeDhxGridHeader('실적금액', '200', 'right', 'int', 'ron', false, 'useAmt', '', '')); /* gf_LocaleTrans('default', 'titBugtTit') */
    dhxGridPjtpmg006HeaderInfo.push(gf_MakeDhxGridHeader('집행율', '*', 'center', 'str', 'ro', false, 'bugtRate', '', '')); /* gf_LocaleTrans('default', 'titUseAmt') */
    dhxGridPjtpmg006 = gf_MakeDhxGrid('dataListPjtpmg006', dhxGridPjtpmg006HeaderInfo, true, false, false);
    dhxGridPjtpmg006.enableAutoWidth(false);
    dhxGridPjtpmg006.setEditable(true);
	dhxGridPjtpmg006.attachFooter("<div style='text-align:right;'>총 계</div>,#cspan,#cspan,#cspan,"+
								  "<div id='bugtAmt_tot' style='text-align:right;'>0</div>,"+
								  "<div id='useAmt_tot' style='text-align:right;'>0</div>,"+
								  "<div id='bugtRate' style='text-align:right;'></div>," ,["text-align:right;"]);

	dhxGridPjtpmg006.setNumberFormat("0,000", gf_GetDhxGridColumId(dhxGridPjtpmg006, 'bugtAmt'), ".", ",");
	dhxGridPjtpmg006.setNumberFormat("0,000", gf_GetDhxGridColumId(dhxGridPjtpmg006, 'useAmt'), ".", ",");
	
	dhxGridPjtpmg006.attachEvent("onDataReady",function(){
    	calculateFooterValues();
    });

	dhxGridPjtpmg006.enableAutoWidth(false);
	dhxGridPjtpmg006.setColumnMinWidth(80,6); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtpmg006.adjustColumnSize(0);	

    return true; 
};

function calculateFooterValues(stage){
	//alert(stage);
	if(stage && stage!=2)
		return true;
	var bugtAmt_tot = document.getElementById("bugtAmt_tot"); // 계획금액 합계
		bugtAmt_tot.innerHTML = gf_NumberWithCommas(sumColumn1());
	var useAmt_tot = document.getElementById("useAmt_tot"); // 실적금액 합계
		useAmt_tot.innerHTML = gf_NumberWithCommas(sumColumn2());		
	return true;
}
function sumColumn1(){
	var out = 0;
	for(var i = 0; i < dhxGridPjtpmg006.getRowsNum(); i++){
		out+= parseFloat(dhxGridPjtpmg006.cells2(i,4).getValue())
	}
	return out;
}
function sumColumn2(){
	var out = 0;
	for(var i = 0; i < dhxGridPjtpmg006.getRowsNum(); i++){
		out+= parseFloat(dhxGridPjtpmg006.cells2(i,5).getValue())
	}
	return out;
}

var cf_SetEventListenerPjtpmg006 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPjtpmg006 = gf_GridDetachEvent(dhxGridPjtpmg006, eventIdPjtpmg006);
    eventId = dhxGridPjtpmg006.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPjtpmg006();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPjtpmg006.getColumnsNum();
            var rowNum = dhxGridPjtpmg006.getRowsNum();
            var selectedId = dhxGridPjtpmg006.getSelectedRowId();
            var ind        = dhxGridPjtpmg006.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtpmg006.getRowIndex(selectedId);
            var type       = dhxGridPjtpmg006.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPjtpmg006.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPjtpmg006.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPjtpmg006.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtpmg006.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPjtpmg006.getSelectedRowId();
            var ind        = dhxGridPjtpmg006.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtpmg006.getRowIndex(selectedId);
            var type       = dhxGridPjtpmg006.getColType(ind);
            dhxGridPjtpmg006.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtpmg006.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPjtpmg006.getSelectedRowId();
            var ind        = dhxGridPjtpmg006.getSelectedCellIndex();
            var rowIndex   = dhxGridPjtpmg006.getRowIndex(selectedId);
            var type       = dhxGridPjtpmg006.getColType(ind);
            dhxGridPjtpmg006.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPjtpmg006.editCell();
            }
        }
        else return true;
    });
    eventIdPjtpmg006.push(eventId);
    eventId = dhxGridPjtpmg006.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pjtpmg006SortGridList(ind, type, direction); 
    });
    eventIdPjtpmg006.push(eventId);
    eventId = dhxGridPjtpmg006.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPjtpmg006.push(eventId);
    eventId = dhxGridPjtpmg006.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdPjtpmg006.push(eventId);
    eventId = dhxGridPjtpmg006.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdPjtpmg006.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPjtpmg006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPjtpmg006()
    });
    $('#btnSavePjtpmg006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePjtpmg006();
    });
    $('#btnRemovePjtpmg006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePjtpmg006();
    });
    $('#btnExcelPjtpmg006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPjtpmg006();
    });
    $('#btnSearchPjtpmg006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPjtpmg006('');
    });
    $('#btnResetPjtpmg006').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPjtpmg006();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPjtpmg006').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var nRows =dhxGridPjtpmg006.getRowsNum();
        for(var i = 0; i <nRows; i++) {
            dhxGridPjtpmg006.selectRow(i);
        }
        gf_DhxCheckAllGridHeader(dhxGridPjtpmg006, $('#checkAllPjtpmg006').prop('checked'), 'chk');
    });
    $('#searchFormPjtpmg006 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPjtpmg006').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPjtpmg006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
	$('#btnProjectSearch').unbind('click').bind('click', function() {
        fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
    });
};

var cf_InitFormPjtpmg006 = function() {
    $('#searchFormPjtpmg006').resetForm();
    gf_FormSetValue("searchFormPjtpmg006", "comptAt", '0', "combo");
	$('#applcYy').val(nowDate.substring(0,4));
};

var cf_SetBindingPjtpmg006 = function() {
    fn_SearchPjtpmg006('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPjtpmg006 = function(userId) {
    var jsonParameter = {
        comptAt : gf_FormGetValue('searchFormPjtpmg006', 'comptAt', 'combo'),
		applcYy : gf_FormGetValue('searchFormPjtpmg006', 'applcYy', 'text'),
		projectSn : gf_FormGetValue('searchFormPjtpmg006', 'projectSn', 'text')
    };
    gf_Transaction(userId, 'pjtpmg006/searchPjtpmg006', jsonParameter, 'fn_CallbackSearchPjtpmg006', false, 'GET');
};

var fn_CallbackSearchPjtpmg006 = function(strSvcID, targetID, data) {
    //dhxGridPjtpmg006.clearAll();
    dhxGridPjtpmg006.destructor();
    if(cf_SetComponentsPjtpmg006()){ 
        fn_DhxDataProcessorPjtpmg006(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPjtpmg006');
            dhxGridPjtpmg006.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pjtpmg006 == 0 && save_All_Sta_Pjtpmg006 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPjtpmg006.selectRow(0); 
            } else if(save_Row_Sta_Pjtpmg006 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPjtpmg006.selectRow(0);
            } else if(save_All_Sta_Pjtpmg006 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPjtpmg006.selectRow(save_Row_Num_Pjtpmg006); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPjtpmg006.selectRow(save_Row_Num_Pjtpmg006);   //개발자 수정 필요  
                //var findCell = dhxGridPjtpmg006.findCell(save_Row_Values_Pjtpmg006, gf_GetDhxGridColumId(dhxGridPjtpmg006,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPjtpmg006.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPjtpmg006.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListPjtpmg006');
        }
        $("#spanCntSearchFormPjtpmg006").text(data.data.records.length);
        cf_SetEventListenerPjtpmg006();
    } 
};
var fn_DhxDataProcessorPjtpmg006 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPjtpmg006 = new dataProcessor(gv_ContextPath+'/pjtpmg006/savePjtpmg006'); //lock feed url
    dhxDataProcessorPjtpmg006.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPjtpmg006.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPjtpmg006.init(dhxGridPjtpmg006); //link dataprocessor to the grid
    dhxDataProcessorPjtpmg006.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPjtpmg006.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPjtpmg006.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPjtpmg006();
                    $("#checkAllPjtpmg006").prop('checked', false); //상단 체크박스 해제
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
var fn_AddPjtpmg006 = function() {
    dhxGridPjtpmg006.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //projectSn
    initValueArr.push(''); //bugtAcmsltSn
    initValueArr.push(''); //acntCode
    initValueArr.push(''); //prmpcTy
    initValueArr.push(''); //bugtTit
    initValueArr.push(''); //useAmt
    initValueArr.push(''); //useSummary
    initValueArr.push(''); //bugtUsedt
    dhxGridPjtpmg006.addRow(dhxGridPjtpmg006.uid(), initValueArr, 0);
    dhxGridPjtpmg006.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPjtpmg006');
    $('#btnPopEmpSearchPjtpmg006').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pjtpmg006SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPjtpmg006, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPjtpmg006', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPjtpmg006', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPjtpmg006, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPjtpmg006.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPjtpmg006', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPjtpmg006', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtpmg006, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPjtpmg006.setSortImgState(false); 
            gf_FormSetValue('searchFormPjtpmg006', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPjtpmg006', 'sortColumId', '', 'text'); 
            dhxGridPjtpmg006.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPjtpmg006.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPjtpmg006', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPjtpmg006', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtpmg006, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePjtpmg006 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pjtpmg006 = 0; 
    save_Edt_Cnt_Pjtpmg006 = 0; 
    save_Del_Cnt_Pjtpmg006 = 0; 
    dhxGridPjtpmg006.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPjtpmg006.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPjtpmg006.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pjtpmg006 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pjtpmg006 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pjtpmg006 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        if(fn_GridValidation(dhxGridPjtpmg006, dhxDataProcessorPjtpmg006)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Pjtpmg006 = 0; 
            if(save_Add_Cnt_Pjtpmg006 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Pjtpmg006 + "건";
                save_All_Sta_Pjtpmg006 = 1; 
            } 
            if(save_Edt_Cnt_Pjtpmg006 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Pjtpmg006 + "건"; 
            } 
            if(save_Del_Cnt_Pjtpmg006 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Pjtpmg006 + "건"; 
                save_All_Sta_Pjtpmg006 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalPjtpmg006(gv_QueSave)){  //여기는 안옴 
            if(confirmModalPjtpmg006(confirmMsg)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 
    }
}
var confirmModalPjtpmg006 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePjtpmg006_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePjtpmg006_Send = function() {
    //if(fn_GridValidation(dhxGridPjtpmg006, dhxDataProcessorPjtpmg006)) {
        dhxDataProcessorPjtpmg006.sendData();
    //}
}
/**
 * 삭제
 */
var fn_RemovePjtpmg006 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPjtpmg006, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridPjtpmg006.forEachRow(function(rowId) {
            state = dhxDataProcessorPjtpmg006.getState(rowId);
            if(dhxGridPjtpmg006.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtpmg006, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridPjtpmg006.getRowIndex(rowId);
                    dhxGridPjtpmg006.deleteRow(rowId);
                    dhxGridPjtpmg006.selectRow(rowNum);
                }
                else dhxDataProcessorPjtpmg006.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPjtpmg006 = function () {
    var titPjtpmg006 = '프로젝트예산집행현황'; /* gf_LocaleTrans('default', 'titPjtpmg006') */
    var jsonParameter = {
        comptAt : gf_FormGetValue('searchFormPjtpmg006', 'comptAt', 'combo'),
		applcYy : gf_FormGetValue('searchFormPjtpmg006', 'applcYy', 'text'),
		projectSn : gf_FormGetValue('searchFormPjtpmg006', 'projectSn', 'text')
    };
    var header = [[
        '프로젝트명' /* gf_LocaleTrans('default', 'titProjectSn') */,
        '거래처' /* gf_LocaleTrans('default', 'titBugtAcmsltSn') */,
        '시작일자/종료일자' /* gf_LocaleTrans('default', 'titAcntCode') */,
        '계획금액' /* gf_LocaleTrans('default', 'titPrmpcTy') */,
        '실적금액' /* gf_LocaleTrans('default', 'titBugtTit') */,
        '집행율' /* gf_LocaleTrans('default', 'titUseAmt') */,
    ]];
    var dataId = [[ 'projectNm', 'bcncNm', 'projectDe', 'bugtAmt', 'useAmt', 'bugtRate']];
    var dataAlign = [[ 'left', 'left', 'center', 'right', 'right', 'center']];
    var sheetNm = [[ titPjtpmg006 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPjtpmg006;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pjtpmg006/excelPjtpmg006', jsonParameter);
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
    $('#saveFormPjtpmg006 #projectSnSaveFormPjtpmg006').parent().append(
    '<div class="error" id="projectSnSaveFormPjtpmg006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormPjtpmg006 #bugtAcmsltSnSaveFormPjtpmg006').parent().append(
    '<div class="error" id="bugtAcmsltSnSaveFormPjtpmg006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPjtpmg006 = function(projectSn, bugtAcmsltSn){
    if(!gf_IsNull(projectSn) && !gf_IsNull(bugtAcmsltSn)) {
        var jsonParameter = {
            projectSn : projectSn,
            bugtAcmsltSn : bugtAcmsltSn
        };
        var dataSource = gf_NoAsyncTransaction('pjtpmg006/findPjtpmg006', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.projectSn) && gf_IsNull(data.bugtAcmsltSn)) {
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
    var checkProjectSn;
    var checkBugtAcmsltSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pjtpmg006 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Pjtpmg006 = 0;
        save_Row_Ids_Pjtpmg006 = "";
        save_Row_Values_Pjtpmg006 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Pjtpmg006 = rowNum;
        save_Row_Ids_Pjtpmg006 = "";  
        save_Row_Values_Pjtpmg006 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pjtpmg006 = rowNum;
        save_Row_Ids_Pjtpmg006 = rowIds; 
        save_Row_Values_Pjtpmg006 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'projectSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'projectSn');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bugtAcmsltSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bugtAcmsltSn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkProjectSn = gf_DhxGetValue(dhxGridObjet, rowId, 'projectSn', 'grid');
                    checkBugtAcmsltSn = gf_DhxGetValue(dhxGridObjet, rowId, 'bugtAcmsltSn', 'grid');
                    if(!gf_IsNull(checkProjectSn, checkBugtAcmsltSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var projectSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'projectSn', 'grid');
                            var bugtAcmsltSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'bugtAcmsltSn', 'grid');
                            if(((projectSn == checkProjectSn) && (bugtAcmsltSn == checkBugtAcmsltSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'projectSn');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bugtAcmsltSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupPjtpmg006( checkProjectSn, checkBugtAcmsltSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'projectSn');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bugtAcmsltSn');
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
        dhxGridPjtpmg006.selectRowById(validFalseFistRowId);
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

var fn_Calendar = function(){

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#applcYy').yearpicker({
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

//메뉴 팝업창 
var $projectInfo = {};  //공통코드 
var fn_ProjectList = function (formId, codeId, codeNmId, param,strCallbackFunc) {
	
	var title  = "프로젝트조회";
	
	$projectInfo = {};
	
	var dhxWindowObj;
	var dhxWindowsProjectList;
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
	if($('body').find("div[id='bpopupProjectList']").size() <= 0) {
		$('body').append("<div id='bpopupProjectList' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	
	$('#bpopupProjectList').bPopup({
		onOpen:function(){
			
			dhxWindowsProjectList = new dhtmlXWindows();
			var id 		= 'bpopupProjectList';
			var ajaxUrl = gv_ContextPath+'/pjtpmg005/popup/pjtpmg005ProjectListPopup/view?'+param;
			var left	= 500;
			var top		= 500;
			var width	= 750;
			var height	= 550;
			
			dhxWindowObj = dhxWindowsProjectList.createWindow(id, left, top, width, height);
			dhxWindowsProjectList.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupProjectList .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
                callbacks.empty();
                callbacks.add(callFunction);
                callbacks.fire($projectInfo);
            }
			dhxWindowsProjectList.unload();
			$('body').find("div[id='bpopupProjectList']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

var fn_CallbackProjectPopup = function(data) {
    gf_FormSetValue('searchFormPjtpmg006', 'projectNm', data.projectNm, 'text');
    gf_FormSetValue('searchFormPjtpmg006', 'projectSn', data.projectSn, 'text');
};
