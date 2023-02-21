/**
 *    프로그램       : 다국어관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.28
 *    사용테이블      : STM_DICARY
 * sourceGen version : 2020.07.16.01 (2020.07.28)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmmng009 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmmng009 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmmng009 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmmng009 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmmng009 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmmng009 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmmng009 = 0;  //그리드 삭제 수량 
var dhxGridStmmng009;  //그리드 객체
var eventIdStmmng009 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmmng009;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmng009();
    if(cf_SetComponentsStmmng009()){
       cf_SetEventListenerStmmng009();
       cf_InitFormStmmng009();
       cf_SetBindingStmmng009();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmmng009 = function() {
    gf_SetMenuPath();
    $("#saveFormStmmng009").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsStmmng009 = function() {
    var dhxGridStmmng009HeaderInfo = [];
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmmng009" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader('사전ID', '150', 'left', 'str', 'ro', false, 'dicaryId', '', '')); /* gf_LocaleTrans('default', 'titDicaryId') */
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader('프로그램ID', '150', 'center', 'str', 'ro', false, 'progrmId', '', '')); /* gf_LocaleTrans('default', 'titProgrmId') */
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader('레이블', '150', 'left', 'str', 'ro', false, 'labl', '', '')); /* gf_LocaleTrans('default', 'titLabl') */
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader('한국어', '150', 'left', 'str', 'ro', false, 'kor', '', '')); /* gf_LocaleTrans('default', 'titKor') */
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader('영어', '150', 'left', 'str', 'ro', false, 'eng', '', '')); /* gf_LocaleTrans('default', 'titEng') */
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader('제3국', '*', 'left', 'str', 'ro', false, 'third', '', '')); /* gf_LocaleTrans('default', 'titThird') */
    dhxGridStmmng009HeaderInfo.push(gf_MakeDhxGridHeader('중복확인', '60', 'left', 'str', 'ro', true, 'checkDicaryId', '', '')); /* gf_LocaleTrans('default', 'titThird') */
    dhxGridStmmng009 = gf_MakeDhxGrid('dataListStmmng009', dhxGridStmmng009HeaderInfo, true, false, false);
    dhxGridStmmng009.enableAutoWidth(false);
    dhxGridStmmng009.setEditable(true);

    dhxGridStmmng009.setColumnMinWidth(50,7); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerStmmng009 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmmng009 = gf_GridDetachEvent(dhxGridStmmng009, eventIdStmmng009);
    eventId = dhxGridStmmng009.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmmng009();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmmng009.getColumnsNum();
            var rowNum = dhxGridStmmng009.getRowsNum();
            var selectedId = dhxGridStmmng009.getSelectedRowId();
            var ind        = dhxGridStmmng009.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng009.getRowIndex(selectedId);
            var type       = dhxGridStmmng009.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmmng009.selectRow(0);
                    //fn_FindStmmng009();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmmng009.selectRow(rowIndex + 1);
                    fn_FindStmmng009();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmmng009.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng009.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmmng009.getSelectedRowId();
            var ind        = dhxGridStmmng009.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng009.getRowIndex(selectedId);
            var type       = dhxGridStmmng009.getColType(ind);
            dhxGridStmmng009.selectCell(rowIndex+1, ind);
            fn_FindStmmng009();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng009.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmmng009.getSelectedRowId();
            var ind        = dhxGridStmmng009.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng009.getRowIndex(selectedId);
            var type       = dhxGridStmmng009.getColType(ind);
            dhxGridStmmng009.selectCell(rowIndex-1, ind);
            fn_FindStmmng009();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng009.editCell();
            }
        }
        else return true;
    });
    eventIdStmmng009.push(eventId);
    eventId = dhxGridStmmng009.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng009SortGridList(ind, type, direction); 
    });
    eventIdStmmng009.push(eventId);
    eventId = dhxGridStmmng009.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmmng009.push(eventId);
    eventId = dhxGridStmmng009.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindStmmng009();
    });
    eventIdStmmng009.push(eventId);
    eventId = dhxGridStmmng009.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmmng009.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmmng009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmmng009();
    });
    $('#btnSaveStmmng009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmmng009();
    });
    $('#btnRemoveStmmng009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmmng009();
    });
    $('#btnExcelStmmng009').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmmng009();
    });
    $('#btnSearchStmmng009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng009('');
    });
    $('#btnResetStmmng009').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmng009();
    });
    $('#checkDicaryId').unbind("click").bind("click",function() {
        gf_errorMsgClear();
    	fn_FindSameKey();
    });
    $('#btnMemUpt').unbind('click').bind('click', function(event){		 
		
		if(gf_RefreshLocale() != ''){
			gf_DivMsgAlert("업데이트 되었습니다.");	
		} else {
			gf_DivMsgAlert("오류발생");
		}

	});
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmmng009').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmmng009, $('#checkAllStmmng009').prop('checked'), 'chk');
    });
    $('#searchFormStmmng009 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmmng009').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng009').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmmng009 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "dicaryIdSaveFormStmmng009" || this.id=="btnCheckDupStmDicary"){
        		fn_FindSameKey();
        	} else {
        		return gf_saveForm_NextEle("saveFormStmmng009",this);
        	}
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng009 input[name="dicaryId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng009, dhxDataProcessorStmmng009, 'dicaryId', $(this).val());

        var rId = dhxGridStmmng009.getSelectedRowId();
        var status = dhxDataProcessorStmmng009.getState(rId);
        if(status == "updated" || status == "inserted"){
            gf_DhxGridCellMapping(dhxGridStmmng009, dhxDataProcessorStmmng009, 'checkDicaryId', 'false');
        }
    });
    $('#saveFormStmmng009 input[name="progrmId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng009, dhxDataProcessorStmmng009, 'progrmId', $(this).val());
    });
    $('#saveFormStmmng009 input[name="eng"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng009, dhxDataProcessorStmmng009, 'eng', $(this).val());
    });
    $('#saveFormStmmng009 input[name="labl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng009, dhxDataProcessorStmmng009, 'labl', $(this).val());
    });
    $('#saveFormStmmng009 input[name="kor"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng009, dhxDataProcessorStmmng009, 'kor', $(this).val());
    });
    $('#saveFormStmmng009 input[name="third"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng009, dhxDataProcessorStmmng009, 'third', $(this).val());
    });
    $('#saveFormStmmng009 input[name="checkDicaryId"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmmng009, dhxDataProcessorStmmng009, 'checkDicaryId', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmmng009 = function() {
    $('#searchFormStmmng009').resetForm();
    $('#korSearchFormStmmng009').focus();
};

var cf_SetBindingStmmng009 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmmng009('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmmng009 = function(userId) {
    var jsonParameter = {
        dicaryId : gf_FormGetValue('searchFormStmmng009', 'dicaryId', 'text'),
        eng : gf_FormGetValue('searchFormStmmng009', 'eng', 'text'),
        kor : gf_FormGetValue('searchFormStmmng009', 'kor', 'text'),
        third : gf_FormGetValue('searchFormStmmng009', 'third', 'text')
    };
    gf_Transaction(userId, 'stmmng009/searchStmmng009', jsonParameter, 'fn_CallbackSearchStmmng009', false, 'GET');
};

var fn_CallbackSearchStmmng009 = function(strSvcID, targetID, data) {
    //dhxGridStmmng009.clearAll();
    dhxGridStmmng009.destructor();
    if(cf_SetComponentsStmmng009()){ 
        fn_DhxDataProcessorStmmng009(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmmng009');
            dhxGridStmmng009.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmmng009 == 0 && save_All_Sta_Stmmng009 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmmng009.selectRow(0); 
            } else if(save_Row_Sta_Stmmng009 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmmng009.selectRow(0);
            } else if(save_All_Sta_Stmmng009 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmmng009.selectRow(save_Row_Num_Stmmng009); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmmng009.selectRow(save_Row_Num_Stmmng009);   //개발자 수정 필요  
                //var findCell = dhxGridStmmng009.findCell(save_Row_Ids_Stmmng009, gf_GetDhxGridColumId(dhxGridStmmng009,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmmng009.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmmng009.selectRow(0);
                //} 
            } 
 
            fn_FindStmmng009();
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmmng009');
            fn_InitInputFormStmmng009();
            fn_FormDisabled(true);
            $('#checkDicaryId').hide();
        }
        $("#spanCntSearchFormStmmng009").text(data.data.records.length);
        cf_SetEventListenerStmmng009();
    } 
};
var fn_DhxDataProcessorStmmng009 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmmng009 = new dataProcessor(gv_ContextPath+'/stmmng009/saveStmmng009'); //lock feed url
    dhxDataProcessorStmmng009.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmmng009.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmmng009.init(dhxGridStmmng009); //link dataprocessor to the grid
    dhxDataProcessorStmmng009.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmmng009.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmmng009.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng009();
                    $("#checkAllStmmng009").prop('checked', false); //상단 체크박스 해제
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
var fn_FindStmmng009 = function() {
    var rId = dhxGridStmmng009.getSelectedRowId();
    var status = dhxDataProcessorStmmng009.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormStmmng009", "dicaryId", gf_DhxGetValue(dhxGridStmmng009, rId, 'dicaryId',  'grid'), '');
    gf_FormSetValue("saveFormStmmng009", "progrmId", gf_DhxGetValue(dhxGridStmmng009, rId, 'progrmId',  'grid'), '');
    gf_FormSetValue("saveFormStmmng009", "eng", gf_DhxGetValue(dhxGridStmmng009, rId, 'eng',  'grid'), '');
    gf_FormSetValue("saveFormStmmng009", "labl", gf_DhxGetValue(dhxGridStmmng009, rId, 'labl',  'grid'), '');
    gf_FormSetValue("saveFormStmmng009", "kor", gf_DhxGetValue(dhxGridStmmng009, rId, 'kor',  'grid'), '');
    gf_FormSetValue("saveFormStmmng009", "third", gf_DhxGetValue(dhxGridStmmng009, rId, 'third',  'grid'), '');
    gf_FormSetValue("saveFormStmmng009", "checkDicaryId", gf_DhxGetValue(dhxGridStmmng009, rId, 'checkDicaryId',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormStmmng009 input[name="dicaryId"]').prop('disabled', false);
        $('#saveFormStmmng009 input[name="progrmId"]').prop('disabled', false);
        $('#checkDicaryId').show();
    } else {
        $('#saveFormStmmng009 input[name="dicaryId"]').prop('disabled', true);
        $('#saveFormStmmng009 input[name="progrmId"]').prop('disabled', true);
        $('#checkDicaryId').hide();
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmmng009 = function() {
    $('#saveFormStmmng009 input[name="dicaryId"]').prop('disabled', false);
    $('#saveFormStmmng009 input[name="progrmId"]').prop('disabled', false);
    $('#saveFormStmmng009').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmmng009 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddStmmng009 = function() {
	keyDuplication = false;
    dhxGridStmmng009.clearSelection();
    fn_InitInputFormStmmng009();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //dicaryId
    initValueArr.push('default'); //progrmId
    initValueArr.push(''); //eng
    initValueArr.push(''); //labl
    initValueArr.push(''); //kor
    initValueArr.push(''); //third
    initValueArr.push('false'); //third
    dhxGridStmmng009.addRow(dhxGridStmmng009.uid(), initValueArr, 0);
    dhxGridStmmng009.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmmng009');
    $('#btnPopEmpSearchStmmng009').show();
    $('#checkDicaryId').show();
    fn_FormDisabled(false);
    gf_FormSetValue('saveFormStmmng009', 'progrmId', 'default', 'text'); 
    gf_FormSetValue('saveFormStmmng009', 'checkDicaryId', 'false', 'text'); 
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmmng009SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmmng009, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmmng009', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmmng009', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmmng009, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmmng009.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmmng009', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmmng009', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng009, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmmng009.setSortImgState(false); 
            gf_FormSetValue('searchFormStmmng009', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmmng009', 'sortColumId', '', 'text'); 
            dhxGridStmmng009.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmmng009.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmmng009', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmmng009', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng009, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmmng009 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmmng009 = 0; 
    save_Edt_Cnt_Stmmng009 = 0; 
    save_Del_Cnt_Stmmng009 = 0; 
    dhxGridStmmng009.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmmng009.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmmng009.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmmng009 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmmng009 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmmng009 += 1; 
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
        save_All_Sta_Stmmng009 = 0; 
        if(save_Add_Cnt_Stmmng009 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmmng009 + "건";
            save_All_Sta_Stmmng009 = 1; 
        } 
        if(save_Edt_Cnt_Stmmng009 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmmng009 + "건"; 
        } 
        if(save_Del_Cnt_Stmmng009 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmmng009 + "건"; 
            save_All_Sta_Stmmng009 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmmng009(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmmng009(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmmng009 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmmng009_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmmng009_Send = function() {
    if(fn_GridValidation(dhxGridStmmng009, dhxDataProcessorStmmng009)) {
        dhxDataProcessorStmmng009.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmmng009 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmmng009, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmmng009.forEachRow(function(rowId) {
            state = dhxDataProcessorStmmng009.getState(rowId);
            if(dhxGridStmmng009.cells(rowId, gf_GetDhxGridColumId(dhxGridStmmng009, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmmng009.getRowIndex(rowId);
                    dhxGridStmmng009.deleteRow(rowId);
                    dhxGridStmmng009.selectRow(rowNum);
                    fn_FindStmmng009();
                }
                else dhxDataProcessorStmmng009.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmmng009 = function () {
    var titStmmng009 = '다국어관리'; /* gf_LocaleTrans('default', 'titStmmng009') */
    var jsonParameter = {
        dicaryId : gf_FormGetValue('searchFormStmmng009', 'dicaryId', 'text'),
        progrmId : gf_FormGetValue('searchFormStmmng009', 'progrmId', 'text')
    };
    var header = [[
        '사전ID' /* gf_LocaleTrans('default', 'titDicaryId') */,
        '프로그램ID' /* gf_LocaleTrans('default', 'titProgrmId') */,
        '영어' /* gf_LocaleTrans('default', 'titEng') */,
        '레이블' /* gf_LocaleTrans('default', 'titLabl') */,
        '한글' /* gf_LocaleTrans('default', 'titKor') */,
        '제3국' /* gf_LocaleTrans('default', 'titThird') */
    ]];
    var dataId = [[ 'dicaryId', 'progrmId', 'eng', 'labl', 'kor', 'third' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmmng009 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmmng009;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng009/excelStmmng009', jsonParameter);
};
/**
 * 사전ID 중복확인
 */
var fn_FindSameKey = function(){
	var dicaryId = gf_FormGetValue('saveFormStmmng009', 'dicaryId', 'text');
	var progrmId = gf_FormGetValue('saveFormStmmng009', 'progrmId', 'text');

	if(gf_IsNull(dicaryId)) {
		gf_DivMsgAlert('사전 ID를 입력해 주세요.');		 
		$('#saveFormStmDicary #dicaryId').focus();
		return false;
	}
	var jsonParameter = {
            dicaryId : dicaryId ,
            progrmId : gf_IsNull(progrmId) ? 'default' :  progrmId
	};
	var dataSource = gf_NoAsyncTransaction('stmmng009/findStmmng009', jsonParameter, 'GET');  			
	var data = dataSource.data;
	
	if(dataSource.code === '000') {
 
		if(gf_IsNull(data.dicaryId)) {
			gf_DivMsgAlert('등록 가능한 KEY입니다.');
	        gf_FormSetValue('saveFormStmmng009', 'checkDicaryId', 'true', 'text');
			return true;
		} else {
			gf_DivMsgAlert('동일한 KEY가 존재합니다.');
	        gf_FormSetValue('saveFormStmmng009', 'checkDicaryId', 'false', 'text');
			return false;
		}
	} else {
		gf_DivMsgAlert('중복확인이 되지 않습니다.');
		return false;
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
    $('#saveFormStmmng009 #dicaryIdSaveFormStmmng009').parent().append(
    '<div class="error" id="dicaryIdSaveFormStmmng009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormStmmng009 #progrmIdSaveFormStmmng009').parent().append(
    '<div class="error" id="progrmIdSaveFormStmmng009-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmmng009 = function(dicaryId, progrmId){
    if(!gf_IsNull(dicaryId) && !gf_IsNull(progrmId)) {
        var jsonParameter = {
            dicaryId : dicaryId,
            progrmId : progrmId
        };
        var dataSource = gf_NoAsyncTransaction('stmmng009/findStmmng009', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.dicaryId) && gf_IsNull(data.progrmId)) {
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
    var state = dhxDataProcessorStmmng009.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmmng009').validate().form()){
                if(state == 'inserted') {
                    var dicaryId = gf_FormGetValue('saveFormStmmng009', 'dicaryId', 'text');
                    var progrmId = gf_FormGetValue('saveFormStmmng009', 'progrmId', 'text');
                    if(fn_CheckDupStmmng009(dicaryId, progrmId)) return true;
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
    var checkDicaryId;
    var checkProgrmId;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmmng009 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmmng009 == 'deleted') {
        save_Row_Num_Stmmng009 = 0;
        save_Row_Ids_Stmmng009 = "";
    } else if(save_Row_Sta_Stmmng009 == 'inserted') {
        save_Row_Num_Stmmng009 = rowNum;
        save_Row_Ids_Stmmng009 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmmng009 = rowNum;
        save_Row_Ids_Stmmng009 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'dicaryId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dicaryId');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'progrmId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'kor', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'kor');
                    valid = false;
                }
                if(valid && 'false' == gf_DhxGetValue(dhxGridObjet, rowId, 'checkDicaryId', 'grid')){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dicaryId');
                    gf_DivMsgAlert("중복확인이 필요합니다.");
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkDicaryId = gf_DhxGetValue(dhxGridObjet, rowId, 'dicaryId', 'grid');
                    checkProgrmId = gf_DhxGetValue(dhxGridObjet, rowId, 'progrmId', 'grid');
                    if(!gf_IsNull(checkDicaryId, checkProgrmId)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var dicaryId = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'dicaryId', 'grid');
                            var progrmId = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'progrmId', 'grid');
                            if(((dicaryId == checkDicaryId) && (progrmId == checkProgrmId)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dicaryId');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'progrmId');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmmng009( checkDicaryId, checkProgrmId )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dicaryId');
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
        dhxGridStmmng009.selectRowById(validFalseFistRowId);
        fn_FindStmmng009();
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