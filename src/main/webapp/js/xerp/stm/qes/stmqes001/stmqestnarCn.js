/**
 *    프로그램       : 급여관리_지급 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.10
 *    사용테이블      : MPS_CALC_STDR
 * sourceGen version : 2020.06.29.01 (2020.07.10)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_StmqestnarCn = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_StmqestnarCn = 0;  //그리드 위치 상태 
var save_All_Sta_StmqestnarCn = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_StmqestnarCn = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_StmqestnarCn = 0;  //그리드 추가 수량 
var save_Edt_Cnt_StmqestnarCn = 0;  //그리드 저장 수량 
var save_Del_Cnt_StmqestnarCn = 0;  //그리드 삭제 수량 

var count = 7;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmqestnarCn();
    cf_SetComponentsStmqestnarCn();
    cf_SetEventListenerStmqestnarCn();
    cf_InitFormStmqestnarCn();
    cf_SetBindingStmqestnarCn();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmqestnarCn = function() {
//    gf_SetMenuPath();
//    $("#saveFormStmqestnarCn").validate({ errorElement: 'div', ignore: '' });
	gf_ComboCode('divComboaswperTy','aswperTy','aswperTy', 'sel', 'C215', '' , '', '', 'ordr', '','',''); // 설문조사답안유형
	
};

var dhxGridStmqestnarCn;
var dhxGridStmqesR;
var cf_SetComponentsStmqestnarCn = function() {
    var dhxGridStmqestnarCnHeaderInfo = [];
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader('설문조사코드', '0', 'center', 'str', 'ro', true, 'qestnarCode', '', '')); 
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader('설문조사내용순번', '0', 'center', 'str', 'ro', true, 'qestnarCnSn', '', ''));
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader('정렬순번', '0', 'right', 'str', 'ro', true, 'sortSn', '', '')); 
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader('질의내용', '595', 'right', 'str', 'ro', false, 'qestnarCn', '', '')); 
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader('답안수량', '0', 'right', 'str', 'ro', true, 'aswperQty', '', ''));
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader('필수답안여부', '150', 'right', 'str', 'ch', false, 'mustAswperAt', '', ''));
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader('답안유형', '295', 'right', 'str', 'coro', false, 'aswperTy', '', ''));
    dhxGridStmqestnarCnHeaderInfo.push(gf_MakeDhxGridHeader('선택이유확인여부', '0', 'right', 'str', 'ch', true, 'selResnConfirmAt', '', ''));
    dhxGridStmqestnarCn = gf_MakeDhxGrid('dataListStmqestnarCn', dhxGridStmqestnarCnHeaderInfo, true, false, false);
    dhxGridStmqestnarCn.enableAutoWidth(false);
    dhxGridStmqestnarCn.setEditable(true);
    
    // 설문조사 답안유형
    var aswperTyjsonParameter = {codekindCode : "C215",exceptCode :"",sortOrder :"asc" };
    var aswperTydataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', aswperTyjsonParameter, '');
    gf_ComboDataSet(dhxGridStmqestnarCn, dhxGridStmqestnarCn.getColIndexById("aswperTy"), aswperTydataSource.data, "sel");
    
    var dhxGridStmqesRHeaderInfo = [];
    dhxGridStmqesRHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmqesRHeaderInfo.push(gf_MakeDhxGridHeader('설문조사코드', '0', 'center', 'str', 'ro', true, 'qestnarCode', '', ''));
    dhxGridStmqesRHeaderInfo.push(gf_MakeDhxGridHeader('설문조사내용순번', '0', 'center', 'str', 'ro', true, 'qestnarCnSn', '', ''));
    dhxGridStmqesRHeaderInfo.push(gf_MakeDhxGridHeader('답안내용', '660', 'center', 'str', 'ed', false, 'aswperChrctr', '', ''));
    dhxGridStmqesRHeaderInfo.push(gf_MakeDhxGridHeader('기타여부', '100', 'center', 'str', 'ch', false, 'etcAt', '', ''));
    dhxGridStmqesRHeaderInfo.push(gf_MakeDhxGridHeader('답안순번', '100', 'center', 'str', 'ro', false, 'aswperSn', '', ''));
    dhxGridStmqesR = gf_MakeDhxGrid('dataListStmqesR', dhxGridStmqesRHeaderInfo, true, false, false);
    dhxGridStmqesR.enableAutoWidth(false);
    dhxGridStmqesR.setEditable(true);
    		
    dhxGridStmqesR.setColumnMinWidth(80,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
};

var eventIdStmqestnarCn = [];
var cf_SetEventListenerStmqestnarCn = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmqestnarCn = gf_GridDetachEvent(dhxGridStmqestnarCn, eventIdStmqestnarCn);
    eventId = dhxGridStmqestnarCn.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmqestnarCn();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmqestnarCn.getColumnsNum();
            var rowNum = dhxGridStmqestnarCn.getRowsNum();
            var selectedId = dhxGridStmqestnarCn.getSelectedRowId();
            var ind        = dhxGridStmqestnarCn.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqestnarCn.getRowIndex(selectedId);
            var type       = dhxGridStmqestnarCn.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmqestnarCn.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmqestnarCn.selectRow(rowIndex + 1);
                    fn_FindStmqestnarCn();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmqestnarCn.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqestnarCn.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmqestnarCn.getSelectedRowId();
            var ind        = dhxGridStmqestnarCn.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqestnarCn.getRowIndex(selectedId);
            var type       = dhxGridStmqestnarCn.getColType(ind);
            dhxGridStmqestnarCn.selectCell(rowIndex+1, ind);
            fn_FindStmqestnarCn();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqestnarCn.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmqestnarCn.getSelectedRowId();
            var ind        = dhxGridStmqestnarCn.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqestnarCn.getRowIndex(selectedId);
            var type       = dhxGridStmqestnarCn.getColType(ind);
            dhxGridStmqestnarCn.selectCell(rowIndex-1, ind);
            fn_FindStmqestnarCn();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqestnarCn.editCell();
            }
        }
        else return true;
    });
    eventIdStmqestnarCn.push(eventId);
    eventId = dhxGridStmqestnarCn.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_StmqestnarCnSortGridList(ind, type, direction); 
    });
    eventIdStmqestnarCn.push(eventId);
    eventId = dhxGridStmqestnarCn.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmqestnarCn.push(eventId);
    eventId = dhxGridStmqestnarCn.attachEvent("onRowSelect", function(id, ind){
    	gf_errorMsgClear();
    	fn_FindStmqestnarCn();
    });
    eventIdStmqestnarCn.push(eventId);
    eventId = dhxGridStmqestnarCn.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmqestnarCn.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmqestnarCn').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmqestnarCn();        
    });
    $('#btnSaveStmqestnarCn').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        
        var rowId = dhxGridStmqesR.getSelectedRowId();
        var state = dhxDataProcessorStmqesR.getState(rowId);
        console.log(state)
        var rowIdCn = dhxGridStmqestnarCn.getSelectedRowId();
        var stateCn = dhxDataProcessorStmqestnarCn.getState(rowIdCn);
        console.log(stateCn)
        	if((state == 'inserted') && (stateCn == 'inserted')){
        		fn_SaveStmqestnarCn();
        	} else if((state == '') && (stateCn == 'inserted')){
        		fn_SaveStmqestnarCn();
        	} else if((state == 'updated') && (stateCn == '')){
        		dhxDataProcessorStmqesR.sendData();
        	} else if ((state == '') && (stateCn == 'updated')){           	
           		fn_SaveStmqestnarCn();
           	} else if ((state == 'updated') && (stateCn == 'updated')){
           		fn_SaveStmqestnarCn();
           	} else if ((state == 'deleted') && (stateCn == 'deleted')){
           		fn_SaveStmqestnarCn();
           	} 
    });
    $('#btnRemoveStmqestnarCn').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmqestnarCn();
    });
 // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmqestnarCn input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmqestnarCn",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmqestnarCn input[name="qestnarCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn, 'qestnarCode', $(this).val());
    });
    $('#saveFormStmqestnarCn input[name="qestnarCnSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn, 'qestnarCnSn', $(this).val());
    });
    $('#saveFormStmqestnarCn input[name="sortSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn, 'sortSn', $(this).val());
    });
    $('#saveFormStmqestnarCn input[name="qestnarCn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn, 'qestnarCn', $(this).val());
    });
    $('#saveFormStmqestnarCn select[name="aswperTy"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        
        var aswperTy = gf_FormGetValue('saveFormStmqestnarCn', 'aswperTy', 'combo');
        console.log(aswperTy)
        if(aswperTy == 'R'){
        	$('#dataListStmqesR').show();
        	$('#saveFormStmqestnarCn input[name="aswperQty"]').prop('disabled', false);
        } else if (aswperTy == 'S'){
        	$('#dataListStmqesR').show();
        	$('#saveFormStmqestnarCn input[name="aswperQty"]').prop('disabled', false);
        } else if (aswperTy == 'C') {
        	$('#dataListStmqesR').show();
        	$('#saveFormStmqestnarCn input[name="aswperQty"]').prop('disabled', false);
        } else if ( aswperTy == 'T') {
        	$('#dataListStmqesR').hide();
        	$('#saveFormStmqestnarCn input[name="aswperQty"]').prop('disabled', true);
        } else if ( aswperTy == 'M'){
        	$('#dataListStmqesR').hide();
        	$('#saveFormStmqestnarCn input[name="aswperQty"]').prop('disabled', true);
        }
        
        gf_DhxGridCellMapping(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn, 'aswperTy', $(this).val());
    });
    $('#saveFormStmqestnarCn input[name="aswperQty"]').unbind('change').bind('change',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn, 'aswperQty', $(this).val());
        
        var aswperQty = gf_FormGetValue('saveFormStmqestnarCn', 'aswperQty', 'text');
        console.log(aswperQty)
        if( aswperQty > count){
        	gf_DivMsgAlert("7개 이상 추가 하실수 없습니다.");
        	return false;
        } else{
        	fn_AddaswperQty();
        } 
    });
    $('#saveFormStmqestnarCn input[name="mustAswperAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormStmqestnarCn', 'mustAswperAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn, 'mustAswperAt', val);
    });
    $('#saveFormStmqestnarCn input[name="selResnConfirmAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormStmqestnarCn', 'selResnConfirmAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn, 'selResnConfirmAt', val);
    });
    // 폼 이벤트 end ============================================================================================
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmqestnarCn').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmqestnarCn, $('#checkAllStmqestnarCn').prop('checked'), 'chk');
    });
    $('#searchFormStmqestnarCn input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmqestnarCn').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrbStdr") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmqestnarCn').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormStmqestnarCn = function() {
    $('#searchFormStmqestnarCn').resetForm();
    //fn_FormDisabled(true);
    
};

var cf_SetBindingStmqestnarCn = function() {
    fn_SearchStmqestnarCn('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmqestnarCn = function(userId) {
	
    var jsonParameter = {
    		qestnarCode : gf_FormGetValue('saveFormStmqestnarCn', 'qestnarCode', 'text'),
//    		trgetSe : gf_FormGetValue('divCombotrgetSe', 'trgetSe', 'combo')
    };
    gf_Transaction(userId, 'stmqes001/searchStmqestrnarCn', jsonParameter, 'fn_CallbackSearchStmqestnarCn', false, 'GET');
};

var dhxDataProcessorStmqestnarCn;
var fn_CallbackSearchStmqestnarCn = function(strSvcID, targetID, data) {
    dhxGridStmqestnarCn.clearAll();
    fn_DhxDataProcessorStmqestnarCn(); 
//    fn_DhxDataProcessorStmqesR(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListStmqestnarCn');
        dhxGridStmqestnarCn.parse(data.data.records, 'js');
 
        if(save_Row_Ids_StmqestnarCn == 0 && save_All_Sta_StmqestnarCn == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridStmqestnarCn.selectRow(0); 
        } else if(save_Row_Sta_StmqestnarCn == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridStmqestnarCn.selectRow(0);
        } else if(save_All_Sta_StmqestnarCn == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridStmqestnarCn.selectRow(save_Row_Num_StmqestnarCn); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridStmqestnarCn.selectRow(save_Row_Num_StmqestnarCn);   //개발자 수정 필요  
            //var findCell = dhxGridStmqestnarCn.findCell(save_Row_Ids_StmqestnarCn, gf_GetDhxGridColumId(dhxGridStmqestnarCn,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridStmqestnarCn.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridStmqestnarCn.selectRow(0);
            //} 
        } 
        fn_FindStmqestnarCn();
    } else {
        gf_NoFoundDataOnGridMsg('dataListStmqestnarCn');
    }
    $("#spanCntSearchFormStmqestnarCn").text(data.data.records.length);
    cf_SetEventListenerStmqestnarCn();
};

var fn_DhxDataProcessorStmqestnarCn = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmqestnarCn = new dataProcessor(gv_ContextPath+'/stmqes001/saveStmqestrnarCn'); //lock feed url
    dhxDataProcessorStmqestnarCn.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmqestnarCn.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmqestnarCn.init(dhxGridStmqestnarCn); //link dataprocessor to the grid
    dhxDataProcessorStmqestnarCn.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmqestnarCn.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmqestnarCn.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
            	var rowId = dhxGridStmqesR.getSelectedRowId();
                var state = dhxDataProcessorStmqesR.getState(rowId);
                	if(state == 'inserted'){
                		var qestnarCnSn = dataSource.data.qestnarCnSn;
                		dhxGridStmqesR.forEachRow(function(rowId) {
                    		dhxGridStmqesR.cells(rowId, gf_GetDhxGridColumId(dhxGridStmqesR, 'qestnarCnSn')).setValue(qestnarCnSn);
                        	dhxDataProcessorStmqesR.setUpdated(rowId, true, 'inserted');
                		});
                		dhxDataProcessorStmqesR.sendData();
                	} 
                	if (state == 'updated'){
                		dhxDataProcessorStmqesR.sendData();
                	} else {
                		fn_SearchStmqestnarCn();
                		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                		fn_SearchStmqesR();
                	}
                    $("#checkAllStmqestnarCn").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};

var fn_FindStmqestnarCn = function() {
    var rId = dhxGridStmqestnarCn.getSelectedRowId();
    var status = dhxDataProcessorStmqestnarCn.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormStmqestnarCn", "qestnarCode", gf_DhxGetValue(dhxGridStmqestnarCn, rId, 'qestnarCode',  'grid'), '');
    gf_FormSetValue("saveFormStmqestnarCn", "qestnarCnSn", gf_DhxGetValue(dhxGridStmqestnarCn, rId, 'qestnarCnSn',  'grid'), '');
    gf_FormSetValue("saveFormStmqestnarCn", "sortSn", gf_DhxGetValue(dhxGridStmqestnarCn, rId, 'sortSn',  'grid'), '');
    gf_FormSetValue("saveFormStmqestnarCn", "qestnarCn", gf_DhxGetValue(dhxGridStmqestnarCn, rId, 'qestnarCn',  'grid'), '');
    gf_FormSetValue("saveFormStmqestnarCn", "aswperTy", gf_DhxGetValue(dhxGridStmqestnarCn, rId, 'aswperTy',  'grid'), 'combo');
    gf_FormSetValue("saveFormStmqestnarCn", "aswperQty", gf_DhxGetValue(dhxGridStmqestnarCn, rId, 'aswperQty',  'grid'), '');
    gf_FormSetValue("saveFormStmqestnarCn", "mustAswperAt", (( gf_DhxGetValue(dhxGridStmqestnarCn, rId, 'mustAswperAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmqestnarCn", "selResnConfirmAt", (( gf_DhxGetValue(dhxGridStmqestnarCn, rId, 'selResnConfirmAt',  'grid') == '1') ? true : false), 'chkbox');
    
    
    fn_SearchStmqesR();
    
    if(status == 'inserted') {
        $('#saveFormStmqestnarCn input[name="qestnarCode"]').prop('disabled', false);
        $('#saveFormStmqestnarCn input[name="qestnarCnSn"]').prop('disabled', false);
    } else {
        $('#saveFormStmqestnarCn input[name="qestnarCode"]').prop('disabled', true);
        $('#saveFormStmqestnarCn input[name="qestnarCnSn"]').prop('disabled', true);
    }
};
var fn_SearchStmqesR = function() {
	
	var qestnarCnSn = gf_FormGetValue('saveFormStmqestnarCn', 'qestnarCnSn', 'text');
		var jsonParameter = {
			qestnarCnSn : qestnarCnSn
		}
	gf_Transaction('', 'stmqes001/searchStmqesR', jsonParameter, 'fn_CallbackSearchStmqesR', false, 'GET');
};

var dhxDataProcessorStmqesR;
var fn_CallbackSearchStmqesR = function(strSvcID, targetID, data) {
    dhxGridStmqesR.clearAll();
    fn_DhxDataProcessorStmqesR(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListStmqesR');
        dhxGridStmqesR.parse(data.data.records, 'js');
        dhxGridStmqesR.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListStmqesR');
    }
    cf_SetEventListenerStmqestnarCn();
};

var fn_DhxDataProcessorStmqesR = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmqesR = new dataProcessor(gv_ContextPath+'/stmqes001/saveStmqesR'); //lock feed url
    dhxDataProcessorStmqesR.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmqesR.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmqesR.init(dhxGridStmqesR); //link dataprocessor to the grid
    dhxDataProcessorStmqesR.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmqesR.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmqesR.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    
                    var state;
                    	dhxGridStmqestnarCn.forEachRow(function(rowId) {
                    		state = dhxDataProcessorStmqestnarCn.getState(rowId);
                    		if(state == 'deleted'){
                    			dhxDataProcessorStmqestnarCn.sendData();
                    		}else {
                    			fn_SearchStmqestnarCn();
                    		}
                    	});
                    $("#checkAllStmqestnarCn").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};



/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmqestnarCn = function() {
    $('#saveFormStmqestnarCn input[name="qestnarCode"]').prop('disabled', false);
    $('#saveFormStmqestnarCn input[name="qestnarCnSn"]').prop('disabled', false);
    $('#saveFormStmqestnarCn').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmqestnarCn *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddStmqestnarCn = function() {
    dhxGridStmqestnarCn.clearSelection();
    fn_InitInputFormStmqestnarCn();
    dhxGridStmqesR.clearAll();
    var qestnarCode = gf_FormGetValue('saveFormStmqestnarCn', 'qestnarCode', 'text');
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(qestnarCode);
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    dhxGridStmqestnarCn.addRow(dhxGridStmqestnarCn.uid(), initValueArr, 0);
    dhxGridStmqestnarCn.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmqestnarCn');
    $('#btnPopEmpSearchStmqestnarCn').show();
    fn_FormDisabled(false);
}

var fn_AddaswperQty = function(){
	fn_DhxDataProcessorStmqesR(); 
	dhxGridStmqesR.clearAll();
	dhxGridStmqesR.clearSelection();
	var aswperTy = gf_FormGetValue('saveFormStmqestnarCn', 'aswperTy', 'combo');
	var qestnarCode = gf_FormGetValue('saveFormStmqestnarCn', 'qestnarCode', 'text');
	if (aswperTy == 'R'){
		    var initValueArr = [];
		    initValueArr.push(''); 
		    initValueArr.push(qestnarCode); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    var aswperQty = gf_FormGetValue('saveFormStmqestnarCn', 'aswperQty', 'text');
		    for (i = 0; i < aswperQty; i++) {
		    	dhxGridStmqesR.addRow(dhxGridStmqesR.uid(), initValueArr, 0);
		    }
		dhxGridStmqesR.selectRow(0);
		gf_NoFoundDataOnGridMsgRemove('dataListStmqesR');
	} else if( aswperTy == 'S'){
		    var initValueArr = [];
		    initValueArr.push(''); 
		    initValueArr.push(qestnarCode); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    var aswperQty = gf_FormGetValue('saveFormStmqestnarCn', 'aswperQty', 'text');
		    for (i = 0; i < aswperQty; i++) {
		    	dhxGridStmqesR.addRow(dhxGridStmqesR.uid(), initValueArr, 0);
		    }
		dhxGridStmqesR.selectRow(0);
		gf_NoFoundDataOnGridMsgRemove('dataListStmqesR');
	} else if (aswperTy == 'C'){
	    	var initValueArr = [];
	    	initValueArr.push(''); 
		    initValueArr.push(qestnarCode); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    initValueArr.push(''); 
		    var aswperQty = gf_FormGetValue('saveFormStmqestnarCn', 'aswperQty', 'text');
	    	for (i = 0; i < aswperQty; i++) {
	    		dhxGridStmqesR.addRow(dhxGridStmqesR.uid(), initValueArr, 0);
	    }
	    dhxGridStmqesR.selectRow(0);		
	    gf_NoFoundDataOnGridMsgRemove('dataListStmqesR');
	} 
    
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_StmqestnarCnSortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmqestnarCn, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmqestnarCn', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmqestnarCn', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmqestnarCn, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmqestnarCn.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmqestnarCn', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmqestnarCn', 'sortColumId', gf_GetDhxGridColum(dhxGridStmqestnarCn, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmqestnarCn.setSortImgState(false); 
            gf_FormSetValue('searchFormStmqestnarCn', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmqestnarCn', 'sortColumId', '', 'text'); 
            dhxGridStmqestnarCn.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmqestnarCn.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmqestnarCn', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmqestnarCn', 'sortColumId', gf_GetDhxGridColum(dhxGridStmqestnarCn, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmqestnarCn = function() {
    var edCnt = 0;
    save_Add_Cnt_StmqestnarCn = 0; 
    save_Edt_Cnt_StmqestnarCn = 0; 
    save_Del_Cnt_StmqestnarCn = 0; 
    dhxGridStmqestnarCn.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmqestnarCn.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmqestnarCn.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_StmqestnarCn += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_StmqestnarCn += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_StmqestnarCn += 1; 
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
        save_All_Sta_StmqestnarCn = 0; 
        if(save_Add_Cnt_StmqestnarCn > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_StmqestnarCn + "건";
            save_All_Sta_StmqestnarCn = 1; 
        } 
        if(save_Edt_Cnt_StmqestnarCn > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_StmqestnarCn + "건"; 
        } 
        if(save_Del_Cnt_StmqestnarCn > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_StmqestnarCn + "건"; 
            save_All_Sta_StmqestnarCn = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmqestnarCn(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmqestnarCn(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmqestnarCn = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmqestnarCn_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmqestnarCn_Send = function() {
	
	var rowId = dhxGridStmqesR.getSelectedRowId();
    var state = dhxDataProcessorStmqesR.getState(rowId);
    if(state == 'deleted'){
    	dhxDataProcessorStmqesR.sendData(); 
    }
    var rowIdCn = dhxGridStmqestnarCn.getSelectedRowId();
    var stateCn = dhxDataProcessorStmqestnarCn.getState(rowIdCn);
    if(stateCn == 'inserted'){
    	if(fn_GridValidation(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn)) {
			dhxDataProcessorStmqestnarCn.sendData();
		}
    }else if(stateCn == 'updated'){
    	if(fn_GridValidation(dhxGridStmqestnarCn, dhxDataProcessorStmqestnarCn)) {
			dhxDataProcessorStmqestnarCn.sendData();
		}
    }
}
/**
 * 삭제
 */
var fn_RemoveStmqestnarCn = function() {
    var rowId = dhxGridStmqestnarCn.getSelectedRowId();
    var state = dhxDataProcessorStmqestnarCn.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridStmqestnarCn.getRowIndex(rowId);
        dhxGridStmqestnarCn.deleteRow(rowId);
        dhxGridStmqestnarCn.selectRow(rowNum);
        fn_FindStmqestnarCn();
    }
    else dhxDataProcessorStmqestnarCn.setUpdated(rowId, true, 'deleted');
    	dhxGridStmqesR.forEachRow(function(rowId) {
    		dhxDataProcessorStmqesR.setUpdated(rowId, true, 'deleted');
		});
    
    
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
    $('#saveFormStmqestnarCn #salarytyCodeSaveFormStmqestnarCn').parent().append(
    '<div class="error" id="salarytyCodeSaveFormStmqestnarCn-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmqestnarCn = function(salarytyCode, salaryitemCode, applcStdrSn, calcStdrSn){
    if(!gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode) && !gf_IsNull(applcStdrSn) && !gf_IsNull(calcStdrSn)) {
        var jsonParameter = {
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
            applcStdrSn : applcStdrSn,
            calcStdrSn : calcStdrSn
        };
        var dataSource = gf_NoAsyncTransaction('mpscal022/findStmqestnarCn', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.salarytyCode) && gf_IsNull(data.salaryitemCode) && gf_IsNull(data.applcStdrSn) && gf_IsNull(data.calcStdrSn)) {
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
    var state = dhxDataProcessorStmqestnarCn.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmqestnarCn').validate().form()){
                if(state == 'inserted') {
                    var qestnarCode = gf_FormGetValue('saveFormStmqestnarCn', 'qestnarCode', 'text');
                    var qestnarCnSn = gf_FormGetValue('saveFormStmqestnarCn', 'qestnarCnSn', 'text');
                    if(fn_CheckDupStmqestnarCn(qestnarCode, qestnarCnSn)) return true;
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
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_StmqestnarCn = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_StmqestnarCn = 0;
        save_Row_Ids_StmqestnarCn = "";
    } else if(state == 'inserted') {
        save_Row_Num_StmqestnarCn = rowNum;
        save_Row_Ids_StmqestnarCn = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_StmqestnarCn = rowNum;
        save_Row_Ids_StmqestnarCn = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qestnarCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qestnarCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'aswperTy', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'aswperTy');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qestnarCn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qestnarCn');
                    valid = false;
                }
                
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridStmqestnarCn.selectRowById(validFalseFistRowId);
        fn_FindStmqestnarCn();
        fn_FormValidation(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}

var fn_GridValidation2 = function(){
	var valid = true;
	var checkCode;
	dhxGridStmqesR.forEachRow(function(rowId) {
		
		if(!gf_IsNull(dhxDataProcessorStmqesR.getState(rowId))) {
			
			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridStmqesR, rowId, 'aswperChrctr', 'grid') )){
				fn_GridValidationSelectCell(dhxGridStmqesR, rowId, 'aswperChrctr',dhxDataProcessorStmqesR);
				valid = false;
			}			
		}
    });
	return valid;	 
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
//
//var GridSend = function(){
//	 var stateCn;
//     dhxGridStmqesR.forEachRow(function(rowId) {
//         stateCn = dhxDataProcessorStmqesR.getState(rowId);
//     });
//     if(stateCn == 'deleted'){
//    	 dhxDataProcessorStmqesR.sendData();
//     }
//}


var Gridreset = function(){
	dhxGridStmqesR.forEachRow(function(rowId) {
		dhxDataProcessorStmqesR.setUpdated(rowId, true, 'clear');
	});
	dhxGridStmqestnarCn.forEachRow(function(rowId) {
		dhxDataProcessorStmqestnarCn.setUpdated(rowId, true, 'clear');
	});
}

