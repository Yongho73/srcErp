/**
 *    프로그램       : 프로그램개선요청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.03
 *    사용테이블      : STM_PRG_REQUST
 * sourceGen version : 2020.07.16.01 (2020.08.03)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmmng011 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmmng011 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmmng011 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmmng011 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmmng011 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmmng011 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmmng011 = 0;  //그리드 삭제 수량 
var dhxGridStmmng011;  //그리드 객체
var eventIdStmmng011 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmmng011;  //DataProcessor 객체
var titStmPrgRequst = '프로그램개선요청';
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmng011();
    if(cf_SetComponentsStmmng011()){
       cf_SetEventListenerStmmng011();
       cf_InitFormStmmng011();
       cf_SetBindingStmmng011();
    }
    if(cf_calendarInit()){   // 초기화
   		init2();  // 기간달력 초기화
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmmng011 = function() {
    gf_SetMenuPath();
    $("#saveFormStmmng011").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboSysSe', 'searchComboSysSe', 'searchComboSysSe', 'search', 'C001', '' , '', '', 'asc', ''); //업무구분
    gf_ComboCode('divComboReqSe', 'searchComboReqSe', 'searchComboReqSe', 'search', 'C100', '' , '', '', 'asc', ''); //요청구분
    gf_ComboCode('divComboSttusSe', 'searchComboSttusSe', 'searchComboSttusSe', 'search', 'C099', '' , '', '', 'desc', ''); //진행상태
    
};

var cf_SetComponentsStmmng011 = function() {
    var dhxGridStmmng011HeaderInfo = [];
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '')); // 일련번호
    //dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAll" />', '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("일련번호", '100', 'center', 'str', 'ro', true, 'imprvmrequstSn', '')); // 개선요청일련번호
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("업무분류", '100', 'center', 'str', 'ro', false, 'jobClsCode', '')); // 업무분류코드(C001)
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("메뉴ID", '100', 'center', 'str', 'ro', false, 'progrmId', '')); // 프로그램 아이디
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("메뉴명", '120', 'center', 'str', 'ro', false, 'progrmNm', '')); // 프로그램 아이디
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("개발담당", '100', 'center', 'str', 'ro', false, 'charger', '')); // 담당
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("요청구분", '80', 'center', 'str', 'ro', false, 'requstSeCode', '')); // 요청구분코드(C100)
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("우선순위", '80', 'center', 'str', 'ro', false, 'priorRank', '')); // 우선 순위 C923
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("요청자", '100', 'center', 'str', 'ro', false, 'rqester',  ''));
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("요청일자", '100', 'center', 'str', 'ro', false, 'requstDe', '')); // 요청일자
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("진행상태", '100', 'center', 'str', 'ro', false, 'progrsSttusCode', '')); // 진행상태코드(C099)
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("접수일자", '100', 'center', 'str', 'ro', false, 'rceptDe', '')); // 접수일    
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("처리예정일자", '100', 'center', 'str', 'ro', false, 'processPdt', '')); // 처리예정일자
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("완료일자", '100', 'center', 'str', 'ro', false, 'comptDe', '')); // 완료일
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("확인일자", '100', 'center', 'str', 'ro', false, 'confirmDe', '')); // 확인일자
    dhxGridStmmng011HeaderInfo.push(gf_MakeDhxGridHeader("요청사항", '340', 'left', 'str', 'ro', false, 'requstDesc', '')); // 요청사항
    dhxGridStmmng011 = gf_MakeDhxGrid('dataListStmmng011', dhxGridStmmng011HeaderInfo, true, false, false);
    dhxGridStmmng011.enableAutoWidth(true);
    dhxGridStmmng011.setEditable(true);

    dhxGridStmmng011.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerStmmng011 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmmng011 = gf_GridDetachEvent(dhxGridStmmng011, eventIdStmmng011);
    eventId = dhxGridStmmng011.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmmng011();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmmng011.getColumnsNum();
            var rowNum = dhxGridStmmng011.getRowsNum();
            var selectedId = dhxGridStmmng011.getSelectedRowId();
            var ind        = dhxGridStmmng011.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng011.getRowIndex(selectedId);
            var type       = dhxGridStmmng011.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmmng011.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmmng011.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmmng011.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng011.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmmng011.getSelectedRowId();
            var ind        = dhxGridStmmng011.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng011.getRowIndex(selectedId);
            var type       = dhxGridStmmng011.getColType(ind);
            dhxGridStmmng011.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng011.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmmng011.getSelectedRowId();
            var ind        = dhxGridStmmng011.getSelectedCellIndex();
            var rowIndex   = dhxGridStmmng011.getRowIndex(selectedId);
            var type       = dhxGridStmmng011.getColType(ind);
            dhxGridStmmng011.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmmng011.editCell();
            }
        }
        else return true;
    });
    eventIdStmmng011.push(eventId);
    eventId = dhxGridStmmng011.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmmng011SortGridList(ind, type, direction); 
    });
    eventIdStmmng011.push(eventId);
    eventId = dhxGridStmmng011.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmmng011.push(eventId);
    eventId = dhxGridStmmng011.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdStmmng011.push(eventId);
    eventId = dhxGridStmmng011.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmmng011.push(eventId);
    eventId = dhxGridStmmng011.attachEvent("onRowDblClicked", function(rId,cInd){
    	
    	var imprvmrequstSn  = dhxGridStmmng011.cells(rId, dhxGridStmmng011.getColIndexById("imprvmrequstSn")).getValue();
    	var progrmId  		= dhxGridStmmng011.cells(rId, dhxGridStmmng011.getColIndexById("progrmId")).getValue();
    	
    	var param = "imprvmrequstSn=" + imprvmrequstSn + "&progrmId=" + progrmId;
    	fn_PrgSearchPopup('form1','','', param);
    });    
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmmng011').unbind('click').bind('click', function(event){
    	var param = "imprvmrequstSn=&progrmId=";
    	fn_PrgRequstPopup('form1','','', param);
    });
    $('#btnSaveStmmng011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmmng011();
    });
    $('#btnRemoveStmmng011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmmng011();
    });
    $('#btnExcelStmmng011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmmng011();
    });
    $('#btnSearchStmmng011').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng011('');
    });
    $('#btnResetStmmng011').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmng011();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormStmmng011 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id != "requestPersonId" || this.id != "requestMenuName"){
        		$('#btnSearchStmmng010').click(); event.preventDefault(); return true;
        	}
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmmng011').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#searchFormStmmng011 #btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormStmmng011","requestPersonId","requestPersonName", "", "Y");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
	});
    $('#searchFormStmmng011 #btnMenuSearch').unbind('click').bind('click', function(event){
		fn_MenuList('formPop1','','', '',fn_CallbackMenuPopup);
	});
  //사원 입력 후 Enter 이벤트
	$('#requestPersonId').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormStmmng011', 'requestPersonName', '', 'text');
	    }
    });
	$('#requestPersonName').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormStmmng011', 'requestPersonId', '', 'text');
	    }
    });
	//메뉴 입력 후 Enter 이벤트
	$('#requestMenuId').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMenuCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormStmmng011', 'requestMenuName', '', 'text');
	    }
    });
	$('#requestMenuName').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMenuCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormStmmng011', 'requestMenuId', '', 'text');
	    }
    });
};

var cf_InitFormStmmng011 = function() {
    $('#searchFormStmmng011').resetForm();
};

var cf_SetBindingStmmng011 = function() {
    fn_SearchStmmng011('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmmng011 = function(userId) {
	
	var requestPersonName = gf_FormGetValue('searchFormStmmng011', 'requestPersonName', 'text');
	var requestMenuId = gf_FormGetValue('searchFormStmmng011', 'requestMenuId', 'text');
	var requestMenuName = gf_FormGetValue('searchFormStmmng011', 'requestMenuName', 'text');
	var comboSysSe = gf_FormGetValue('searchFormStmmng011', 'searchComboSysSe', 'combo');
	var comboReqSe = gf_FormGetValue('searchFormStmmng011', 'searchComboReqSe', 'combo');
	var comboSttusSe = gf_FormGetValue('searchFormStmmng011', 'searchComboSttusSe', 'combo');
	var sReqstDe = gf_FormGetValue('searchFormStmmng011', 'bgnRequstDe', 'text').replaceAll('-','');
	var eReqstDe = gf_FormGetValue('searchFormStmmng011', 'endRequstDe', 'text').replaceAll('-','');
	
    var jsonParameter = {
    		requestPersonName : requestPersonName,
        	requestMenuId : requestMenuId,
        	requestMenuName : requestMenuName,
    		comboSysSe : comboSysSe,
    		comboReqSe : comboReqSe,
    		comboSttusSe : comboSttusSe,
    		sReqstDe : sReqstDe,
    		eReqstDe : eReqstDe
    };
    gf_Transaction(userId, 'stmmng011/searchStmmng011', jsonParameter, 'fn_CallbackSearchStmmng011', false, 'GET');
};

var fn_CallbackSearchStmmng011 = function(strSvcID, targetID, data) {
    //dhxGridStmmng011.clearAll();
    dhxGridStmmng011.destructor();
    if(cf_SetComponentsStmmng011()){ 
        fn_DhxDataProcessorStmmng011(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmmng011');
            dhxGridStmmng011.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Stmmng011 == 0 && save_All_Sta_Stmmng011 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmmng011.selectRow(0); 
            } else if(save_Row_Sta_Stmmng011 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmmng011.selectRow(0);
            } else if(save_All_Sta_Stmmng011 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmmng011.selectRow(save_Row_Num_Stmmng011); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmmng011.selectRow(save_Row_Num_Stmmng011);   //개발자 수정 필요  
                //var findCell = dhxGridStmmng011.findCell(save_Row_Ids_Stmmng011, gf_GetDhxGridColumId(dhxGridStmmng011,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmmng011.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmmng011.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmmng011');
        }
        $("#spanCntSearchFormStmmng011").text(data.data.records.length);
        cf_SetEventListenerStmmng011();
    } 
};
var fn_DhxDataProcessorStmmng011 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmmng011 = new dataProcessor(gv_ContextPath+'/stmmng011/saveStmmng011'); //lock feed url
    dhxDataProcessorStmmng011.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmmng011.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmmng011.init(dhxGridStmmng011); //link dataprocessor to the grid
    dhxDataProcessorStmmng011.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmmng011.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmmng011.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmmng011();
                    $("#checkAllStmmng011").prop('checked', false); //상단 체크박스 해제
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
var fn_AddStmmng011 = function() {
    dhxGridStmmng011.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //imprvmrequstSn
    initValueArr.push(''); //jobClsCode
    initValueArr.push(''); //requstSeCode
    initValueArr.push(''); //progrsSttusCode
    initValueArr.push(''); //priorRank
    initValueArr.push(''); //progrmId
    initValueArr.push(''); //progrmNm
    initValueArr.push(''); //rqester
    initValueArr.push(''); //requstDe
    initValueArr.push(''); //processPdt
    initValueArr.push(''); //confirmDe
    initValueArr.push(''); //rceptDe
    initValueArr.push(''); //comptDe
    initValueArr.push(''); //charger
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //requstDesc
    initValueArr.push(''); //processCn
    initValueArr.push(''); //dsmsslResnCode
    dhxGridStmmng011.addRow(dhxGridStmmng011.uid(), initValueArr, 0);
    dhxGridStmmng011.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmmng011');
    $('#btnPopEmpSearchStmmng011').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmmng011SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmmng011, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmmng011', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmmng011', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmmng011, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmmng011.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmmng011', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmmng011', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng011, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmmng011.setSortImgState(false); 
            gf_FormSetValue('searchFormStmmng011', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmmng011', 'sortColumId', '', 'text'); 
            dhxGridStmmng011.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmmng011.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmmng011', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmmng011', 'sortColumId', gf_GetDhxGridColum(dhxGridStmmng011, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmmng011 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmmng011 = 0; 
    save_Edt_Cnt_Stmmng011 = 0; 
    save_Del_Cnt_Stmmng011 = 0; 
    dhxGridStmmng011.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmmng011.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmmng011.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmmng011 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmmng011 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmmng011 += 1; 
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
        save_All_Sta_Stmmng011 = 0; 
        if(save_Add_Cnt_Stmmng011 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmmng011 + "건";
            save_All_Sta_Stmmng011 = 1; 
        } 
        if(save_Edt_Cnt_Stmmng011 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmmng011 + "건"; 
        } 
        if(save_Del_Cnt_Stmmng011 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmmng011 + "건"; 
            save_All_Sta_Stmmng011 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmmng011(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmmng011(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmmng011 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmmng011_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmmng011_Send = function() {
    if(fn_GridValidation(dhxGridStmmng011, dhxDataProcessorStmmng011)) {
        dhxDataProcessorStmmng011.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmmng011 = function() {
    var rowId = dhxGridStmmng011.getSelectedRowId();
    var state = dhxDataProcessorStmmng011.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridStmmng011.getRowIndex(rowId);
        dhxGridStmmng011.deleteRow(rowId);
        dhxGridStmmng011.selectRow(rowNum);
    }
    else dhxDataProcessorStmmng011.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmmng011 = function () {
    var titStmmng011 = '프로그램개선요청'; /* gf_LocaleTrans('default', 'titStmmng011') */
    var jsonParameter = {
        imprvmrequstSn : gf_FormGetValue('searchFormStmmng011', 'imprvmrequstSn', 'text')
    };
    var header = [[
        '개선요청일련번' /* gf_LocaleTrans('default', 'titImprvmrequstSn') */,
        '업무분류코드(C001)' /* gf_LocaleTrans('default', 'titJobClsCode') */,
        '요청구분코드(C100)' /* gf_LocaleTrans('default', 'titRequstSeCode') */,
        '진행상태코드(C099)' /* gf_LocaleTrans('default', 'titProgrsSttusCode') */,
        '우선 순위 C923' /* gf_LocaleTrans('default', 'titPriorRank') */,
        '프로그램ID' /* gf_LocaleTrans('default', 'titProgrmId') */,
        '프로그명' /* gf_LocaleTrans('default', 'titProgrmNm') */,
        '요청자' /* gf_LocaleTrans('default', 'titRqester') */,
        '요청일자' /* gf_LocaleTrans('default', 'titRequstDe') */,
        '처리예정일자' /* gf_LocaleTrans('default', 'titProcessPdt') */,
        '확인일자' /* gf_LocaleTrans('default', 'titConfirmDe') */,
        '접수일' /* gf_LocaleTrans('default', 'titRceptDe') */,
        '완료일' /* gf_LocaleTrans('default', 'titComptDe') */,
        '담당' /* gf_LocaleTrans('default', 'titCharger') */,
        '첨부파일번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '요청사' /* gf_LocaleTrans('default', 'titRequstDesc') */,
        '처리내' /* gf_LocaleTrans('default', 'titProcessCn') */,
        '기각 사유 코드(C194)' /* gf_LocaleTrans('default', 'titDsmsslResnCode') */
    ]];
    var dataId = [[ 'imprvmrequstSn', 'jobClsCode', 'requstSeCode', 'progrsSttusCode', 'priorRank', 'progrmId', 'progrmNm', 'rqester', 'requstDe', 'processPdt', 'confirmDe', 'rceptDe', 'comptDe', 'charger', 'atchmnflNo', 'requstDesc', 'processCn', 'dsmsslResnCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmmng011 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmmng011;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmmng011/excelStmmng011', jsonParameter);
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
    $('#saveFormStmmng011 #imprvmrequstSnSaveFormStmmng011').parent().append(
    '<div class="error" id="imprvmrequstSnSaveFormStmmng011-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmmng011 = function(imprvmrequstSn){
    if(!gf_IsNull(imprvmrequstSn)) {
        var jsonParameter = {
            imprvmrequstSn : imprvmrequstSn
        };
        var dataSource = gf_NoAsyncTransaction('stmmng011/findStmmng011', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.imprvmrequstSn)) {
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
    var checkImprvmrequstSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmmng011 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Stmmng011 = 0;
        save_Row_Ids_Stmmng011 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Stmmng011 = rowNum;
        save_Row_Ids_Stmmng011 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmmng011 = rowNum;
        save_Row_Ids_Stmmng011 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'imprvmrequstSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'imprvmrequstSn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkImprvmrequstSn = gf_DhxGetValue(dhxGridObjet, rowId, 'imprvmrequstSn', 'grid');
                    if(!gf_IsNull(checkImprvmrequstSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var imprvmrequstSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'imprvmrequstSn', 'grid');
                            if(((imprvmrequstSn == checkImprvmrequstSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'imprvmrequstSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmmng011( checkImprvmrequstSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'imprvmrequstSn');
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
        dhxGridStmmng011.selectRowById(validFalseFistRowId);
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

function cf_calendarInit(){
    $('#searchFormStmmng011.input_calen').unbind('keyup').bind('keyup', function(event){
    	//날짜 유효성체크 
    	dateValidateChk($(this));
    });
 
    $('#searchFormStmmng011 #bgnRequstDe').unbind('click').bind('click', function(event){
    	dhxCCalendarDate2.show();
    });
    
    $('#searchFormStmmng011 #endRequstDe').unbind('click').bind('click', function(event){
    	dhxCCalendarDate2.show();
    });
    
    //금일 조회
    
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
   
}

function init2(){
	//달력 생성
	dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
	
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
       if(side == "right"){ //날짜유효성 체크때문에 두번째 달력날짜가 선택되어야  창이 닫힘 
        	$('#bgnRequstDe').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        	$('#endRequstDe').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
        	dhxCCalendarDate2.hide();
        }else  if(side == "left"){ //
        	$('#bgnRequstDe').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        }
       
       
    });
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('bgnRequstDe', 'endRequstDe', '');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormStmmng011', 'bgnRequstDe', 'text'));
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormStmmng011', 'endRequstDe', 'text'));	
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
	
	// 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('bgnRequstDe', 'endRequstDe'); 
}

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="bgnRequstDe" || e.target.id =="endRequstDe") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

function dateValidateChk(objDate){
	
	var date = objDate.val();
	
	if (date.length == 10) {
		if (!gf_IsDate(date)) {
			  gf_DivMsgAlert("잘못된 날짜입니다. <br/>다시 입력하세요.");
			  objDate.val("");
			  objDate.focus();
			  return;
		}		
	}
}

var fn_CallbackMenuPopup = function(data) {

    gf_FormSetValue('searchFormStmmng011', 'requestMenuId', data.menuId, 'text');
    gf_FormSetValue('searchFormStmmng011', 'requestMenuName', data.menuNm, 'text');
};

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
var $menuInfo = {};  //공통코드 
var fn_MenuList = function (formId, codeId, codeNmId, param,strCallbackFunc) {
	
	var title  = "메뉴조회";
	
	$menuInfo = {};
	
	var dhxWindowObj;
	var dhxWindowsMenuList;
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
	
	if($('body').find("div[id='bpopupMenuList']").size() <= 0) {
		$('body').append("<div id='bpopupMenuList' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	
	$('#bpopupMenuList').bPopup({
		onOpen:function(){
			dhxWindowsMenuList = new dhtmlXWindows();
			var id 		= 'bpopupMenuList';
			var ajaxUrl = gv_ContextPath+'/stmmng002/popup/stmMenuListPopup/view?'+param;
			var left	= 500;
			var top		= 500;
			var width	= 600;
			var height	= 550;
			
			dhxWindowObj = dhxWindowsMenuList.createWindow(id, left, top, width, height);
			dhxWindowsMenuList.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupMenuList .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($menuInfo);
			}
			
			dhxWindowsMenuList.unload();
			$('body').find("div[id='bpopupMenuList']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

//등록화면 팝업창 
var fn_PrgRequstPopup = function (formId, codeId, codeNmId, param) {
	
	var userId = ""; 
	var title  = titStmPrgRequst + " (등록)";
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindowsPrgRequst;
	if($('body').find("div[id='bpopupPrgRequst']").size() <= 0) {
		$('body').append("<div id='bpopupPrgRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupPrgRequst').bPopup({
		onOpen:function(){
			
			dhxWindowsPrgRequst = new dhtmlXWindows();
			var id 		= 'bpopupPrgRequst';
			var ajaxUrl = gv_ContextPath+'/stmmng011/popup/findStmPrgRequst/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 900;
			var height	= 350;
			
			dhxWindowObj = dhxWindowsPrgRequst.createWindow(id, left, top, width, height);
			dhxWindowsPrgRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupPrgRequst .b-close').click();
				fn_SearchStmmng011();
			});
		},
		onClose:function(){
			dhxWindowsPrgRequst.unload();
			$('body').find("div[id='bpopupPrgRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

//조회화면 팝업창 
var fn_PrgSearchPopup = function (formId, codeId, codeNmId, param) {
	
	var userId = ""; 
	var title  = titStmPrgRequst + " (조회)";
	
	var dhxWindowObj;
	var dhxWindowsPrgSearch;
	if($('body').find("div[id='bpopupPrgSearch']").size() <= 0) {
		$('body').append("<div id='bpopupPrgSearch' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupPrgSearch').bPopup({
		onOpen:function(){
			
			dhxWindowsPrgSearch = new dhtmlXWindows();
			var id 		= 'bpopupPrgSearch';
			var ajaxUrl = gv_ContextPath+'/stmmng011/popup/findStmPrgSearch/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 1000;
			var height	= 580;
			
			dhxWindowObj = dhxWindowsPrgSearch.createWindow(id, left, top, width, height);
			dhxWindowsPrgSearch.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupPrgSearch .b-close').click();
				fn_SearchStmmng011();
			});
		},
		onClose:function(){
			dhxWindowsPrgSearch.unload();
			$('body').find("div[id='bpopupPrgSearch']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

function fn_SearchEmpCode(){
	var empno = "";
	var korNm = "";
	
	empno = gf_FormGetValue('searchFormStmmng011', 'requestPersonId', 'text');
	korNm = gf_FormGetValue('searchFormStmmng011', 'requestPersonName', 'text');
	
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : "1000"
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormStmmng011', 'requestPersonId', data.empno, 'text');
 		gf_FormSetValue('searchFormStmmng011', 'requestPersonName', data.korNm, 'text');
 	}
  	else {
	  	//Popup 호출
  		gf_EmpPopup('searchFormStmmng011', 'requestPersonId', 'requestPersonName', '1000', 'Y', null);
  	}
}

function fn_SearchMenuCode(){
	var menuId = "";
	var menuNm = "";
	
	menuId = gf_FormGetValue('searchFormStmmng011', 'requestMenuId', 'text');
	menuNm = gf_FormGetValue('searchFormStmmng011', 'requestMenuName', 'text');
	
	var jsonParameter = {
			menuId     : menuId,
			menuNm     : menuNm,
			bplcCode  : "1000"
	};
	gf_Transaction("", 'stmmng011/searchMenu', jsonParameter, 'fn_CallbackSearchMenuCode', false, 'GET');
}

function fn_CallbackSearchMenuCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormStmmng011', 'requestMenuId', data.menuId, 'text');
 		gf_FormSetValue('searchFormStmmng011', 'requestMenuName', data.menuNm, 'text');
 	}
  	else {
	  	//Popup 호출
  		fn_MenuList('formPop1','','', '',fn_CallbackMenuPopup);
  	}
}

