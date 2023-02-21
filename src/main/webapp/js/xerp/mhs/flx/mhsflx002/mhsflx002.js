/**
 *    프로그램       : 개인별근무유형선택 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.13
 *    사용테이블      : MHS_INDVDLWORKTYSEL
 * sourceGen version : 2020.06.29.01 (2020.07.13)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhsflx002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhsflx002 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhsflx002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhsflx002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhsflx002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhsflx002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhsflx002 = 0;  //그리드 삭제 수량 
var searchUseDtCalendar;		// 검색 폼 사용 시작 일자 달력
var saveUseSdtCalendar;			// 저장 폼 사용일자 당력
var saveUseEdtCalendar;			// 저장 폼 종료일자 당력
var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
	cf_InitParamMhsflx002();
    cf_SetComponentsMhsflx002();
    cf_SetEventListenerMhsflx002();
    cf_InitFormMhsflx002();
    cf_SetBindingMhsflx002();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhsflx002 = function() {
    gf_SetMenuPath();
    $("#saveFormMhsflx002").validate({ errorElement: 'div', ignore: '' });
    fn_Calendar();
    //검색 폼 근무 유형
    
    gf_MakeComboBasic('divComboWorkTyCode', 'searchComboWorkTyCode', 'searchComboWorkTyCode', '', 'mhsflx002/searchWorkTyCode', '', 'code', 'codeNm', '');
    gf_MakeComboBasic('divComboFormWorkTyCode', 'saveComboWorkTyCode', 'saveComboWorkTyCode', '', 'mhsflx002/searchWorkTyCode', '', 'code', 'codeNm', '');
    
    $('#searchComboWorkTyCode').prepend($("<option value='' selected> 전체 </option>"));
    $('#saveComboWorkTyCode').prepend($("<option value='' selected> 선택 </option>"));
    $('#saveComboWorkTyCode').attr("required" ,true);

    gf_ComboCode('divComboConfmSttusCode' , 'searchConfmSttusCode' , 'searchConfmSttusCode' , 'search' , 'C197' , '' , '' ,'' , 'ordr','' );

//    $("#searchComboWorkTyCode").focus();
}

var dhxGridMhsflx002;
var cf_SetComponentsMhsflx002 = function() {
    var dhxGridMhsflx002HeaderInfo = [];
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '0', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('사원이름', '100', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('순번', '0', 'center', 'str', 'ro', true, 'sn', '', '')); /* gf_LocaleTrans('default', 'titSn') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('근무유형코드', '*', 'center', 'str', 'ro', true, 'workTyCode', '', '')); /* gf_LocaleTrans('default', 'titWorkTyCode') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('근무유형', '*', 'center', 'str', 'ro', false, 'workTyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titWorkTyCode') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('시작일', '100', 'center', 'str', 'ro', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('종료일', '100', 'center', 'str', 'ro', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('시작시간', '70', 'center', 'str', 'ro', false, 'workBeginTime', '', '')); /* gf_LocaleTrans('default', 'titWorkBeginTime') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('종료시간', '70', 'center', 'str', 'ro', false, 'workEndTime', '', '')); /* gf_LocaleTrans('default', 'titWorkEndTime') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('승인여부코드', '0', 'center', 'str', 'ro', true, 'confmSttusCode', '', '')); /* gf_LocaleTrans('default', 'titConfmAt') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '100', 'center', 'str', 'ro', false, 'confmSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titConfmAt') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('승인일자', '100', 'center', 'str', 'ro', false, 'confmDe', '', '')); /* gf_LocaleTrans('default', 'titConfmDe') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('승인자사원번호', '0', 'center', 'str', 'ro', true, 'confmerEmpno', '', '')); /* gf_LocaleTrans('default', 'titConfmerEmpno') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('승인자사원이름', '100', 'center', 'str', 'ro', false, 'confmerEmpnm', '', '')); /* gf_LocaleTrans('default', 'titConfmerEmpno') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('반려사유', '100', 'left', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titConfmerEmpno') */
    dhxGridMhsflx002HeaderInfo.push(gf_MakeDhxGridHeader('등록자 ID', '100', 'left', 'str', 'ro', true, 'regId', '', '')); /* gf_LocaleTrans('default', 'titConfmerEmpno') */
    dhxGridMhsflx002 = gf_MakeDhxGrid('dataListMhsflx002', dhxGridMhsflx002HeaderInfo, true, false, false);
    dhxGridMhsflx002.enableAutoWidth(false);
    dhxGridMhsflx002.setEditable(true);

    dhxGridMhsflx002.setColumnMinWidth(80,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
};

var eventIdMhsflx002 = [];
var cf_SetEventListenerMhsflx002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhsflx002 = gf_GridDetachEvent(dhxGridMhsflx002, eventIdMhsflx002);
    eventId = dhxGridMhsflx002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhsflx002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhsflx002.getColumnsNum();
            var rowNum = dhxGridMhsflx002.getRowsNum();
            var selectedId = dhxGridMhsflx002.getSelectedRowId();
            var ind        = dhxGridMhsflx002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsflx002.getRowIndex(selectedId);
            var type       = dhxGridMhsflx002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhsflx002.selectRow(0);
                    //fn_FindMhsflx002();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhsflx002.selectRow(rowIndex + 1);
                    fn_FindMhsflx002();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhsflx002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsflx002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhsflx002.getSelectedRowId();
            var ind        = dhxGridMhsflx002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsflx002.getRowIndex(selectedId);
            var type       = dhxGridMhsflx002.getColType(ind);
            dhxGridMhsflx002.selectCell(rowIndex+1, ind);
            fn_FindMhsflx002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsflx002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhsflx002.getSelectedRowId();
            var ind        = dhxGridMhsflx002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsflx002.getRowIndex(selectedId);
            var type       = dhxGridMhsflx002.getColType(ind);
            dhxGridMhsflx002.selectCell(rowIndex-1, ind);
            fn_FindMhsflx002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsflx002.editCell();
            }
        }
        else return true;
    });
    eventIdMhsflx002.push(eventId);
    eventId = dhxGridMhsflx002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhsflx002SortGridList(ind, type, direction); 
    });
    eventIdMhsflx002.push(eventId);
    eventId = dhxGridMhsflx002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhsflx002.push(eventId);
    eventId = dhxGridMhsflx002.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhsflx002();
    });
    eventIdMhsflx002.push(eventId);
    eventId = dhxGridMhsflx002.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhsflx002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhsflx002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhsflx002()
    });
    $('#btnSaveMhsflx002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhsflx002();
    });
    $('#btnRemoveMhsflx002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhsflx002();
    });
    $('#btnExcelMhsflx002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhsflx002();
    });
    $('#btnSearchMhsflx002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhsflx002('');
    });
    $('#btnResetMhsflx002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhsflx002();
    });
    $('#approvalRequestBtn').unbind("click").bind("click",function() {
        gf_errorMsgClear();
    	var rowId = dhxGridMhsflx002.getSelectedRowId();
    	var rowSttusCode = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'confmSttusCode',  'grid');
        if("002" == rowSttusCode){
        	gf_DivMsgAlert("승인 건은 승인요청 하실 수 없습니다.");
        }
        else if("001" == rowSttusCode){
        	gf_DivMsgAlert("이미 승인신청 상태 입니다.");
        }
        else if("003" == rowSttusCode){
        	gf_DivMsgAlert("반려 건은 승인요청 하실 수 없습니다. 새로 승인 신청 하여주세요.");
        }
        else{
        	if(fn_GridValidation(dhxGridMhsflx002, dhxDataProcessorMhsflx002)){
        		fn_ConfmSttusUpdate("approvalRequest" , "");
        	}
        }
    });
    $('#returnBtn').unbind("click").bind("click",function() {
        gf_errorMsgClear();
    	var rowId = dhxGridMhsflx002.getSelectedRowId();
    	var rowSttusCode = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'confmSttusCode',  'grid');
    	if("002" == rowSttusCode){
    		gf_DivMsgAlert("승인 건은 반려 하실 수 없습니다.");
    	}
    	else if("003" == rowSttusCode){
    		gf_DivMsgAlert("이미 반려 상태 입니다.");
    	}
    	else{
    		fn_ReturnResnPopup();
//    		fn_ConfmSttusUpdate("return");
    	}
    });
    $('#approvaltBtn').unbind("click").bind("click",function() {
        gf_errorMsgClear();
    	var rowId = dhxGridMhsflx002.getSelectedRowId();
    	var rowSttusCode = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'confmSttusCode',  'grid');
    	if(gf_IsNull(rowSttusCode) || "003" == rowSttusCode){
    		gf_DivMsgAlert("승인신청을 먼저 하여 주세요.");
    	}
    	else if("002" == rowSttusCode){
    	    gf_DivMsgAlert("이미 승인 상태 입니다.")
    	}
    	else{
    		fn_ConfmSttusUpdate("approval" , "");
    	}
    });
    
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhsflx002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhsflx002').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsflx002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#searchFormMhsflx002 select[name="searchComboWorkTyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        fn_SearchMhsflx002('');
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhsflx002 #saveBtnEmpSearch').unbind('click').bind('click',function() {
    	gf_EmpPopup("saveFormMhsflx002","empnoSaveFormMhsflx002","empnmSaveFormMhsflx002",'', "N", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
    $('#saveFormMhsflx002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhsflx002",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsflx002 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'empno', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="empnm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'korNm', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="sn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'sn', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="useBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'useBeginDe', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="useEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'useEndDe', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="workBeginTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'workBeginTime', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="workEndTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'workEndTime', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'rm', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="confmDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'confmDe', $(this).val());
    });
    $('#saveFormMhsflx002 input[name="confmerEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'confmerEmpno', $(this).val());
    });
    $('#saveFormMhsflx002 select[name="saveComboWorkTyCode"]').unbind('change').bind('change',function() {
    	gf_errorMsgClear();
        if($(this).val() == '' || $(this).val() == null){
        	gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'workTyCodeNm', '');
        	gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'workTyCode', '');
        } else {
        	gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'workTyCodeNm', $("#saveFormMhsflx002 select[name='saveComboWorkTyCode'] option:selected").text());
        	gf_DhxGridCellMapping(dhxGridMhsflx002, dhxDataProcessorMhsflx002, 'workTyCode', $("#saveFormMhsflx002 select[name='saveComboWorkTyCode'] option:selected").val());
        }
    });

    // 폼 이벤트 end ============================================================================================
    //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhsflx002","empno","empNm",'', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhsflx002', 'empNm', '', 'text');
		}
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhsflx002', 'empno', '', 'text');
		}
    });
    //부서 선택 Popup
	$('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhsflx002","deptCode","deptCodeNm",'', "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhsflx002', 'deptCodeNm', '', 'text');
		}
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhsflx002', 'deptCode', '', 'text');
		}
    });
	// 달력 이벤트 ================================================================================================
    //검색 사용일자
    $('#searchFormMhsflx002 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#searchFormMhsflx002 #searchUseDt').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	searchUseDtCalendar.show();
    });
    //저장 사용일자
    $('#saveFormMhsflx002 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#searchFormMhsflx002 #searchUseSdtMhsflx002').unbind('change blur').bind('change blur', function(event){
    	var day1 = gf_FormGetValue('searchFormMhsflx002', 'searchUseSdt', 'text');
    	var day2 = gf_FormGetValue('searchFormMhsflx002', 'searchUseEdt', 'text');
    	if(day1 > day2 && !gf_IsNull(day2)){
    		gf_FormSetValue("searchFormMhsflx002", "searchUseSdt", '' , 'text');
    		gf_FormSetValue("searchFormMhsflx002", "searchUseEdt", '' , 'text');

    		searchUseDtCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormMhsflx002', 'searchUseSdt', 'text'));
    		searchUseDtCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormMhsflx002', 'searchUseEdt', 'text'));	
    		gf_DivMsgAlert("사용 시작일자가 종료일자보다 큽니다.");
    		return;
    	}
    });
    $('#searchFormMhsflx002 #searchUseEdtMhsflx002').unbind('change blur').bind('change blur', function(event){
       	var day1 = gf_FormGetValue('searchFormMhsflx002', 'searchUseSdt', 'text');
    	var day2 = gf_FormGetValue('searchFormMhsflx002', 'searchUseEdt', 'text');
    	if(day1 > day2 && !gf_IsNull(day2)){
    		gf_FormSetValue("searchFormMhsflx002", "searchUseSdt", '' , 'text');
    		gf_FormSetValue("searchFormMhsflx002", "searchUseEdt", '' , 'text');

    		searchUseDtCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormMhsflx002', 'searchUseSdt', 'text'));
    		searchUseDtCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormMhsflx002', 'searchUseEdt', 'text'));	
    		gf_DivMsgAlert("사용 시작일자가 종료일자보다 큽니다.");
    		return;
    	}    	
    });
};

var cf_InitFormMhsflx002 = function() {
    $('#searchFormMhsflx002').resetForm();
};

var cf_SetBindingMhsflx002 = function() {
	fn_SessionCheck();
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhsflx002('');
    
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormMhsflx002', 'deptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormMhsflx002', 'deptCodeNm', 'text'), 
			useAt : '1',
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}

function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhsflx002', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhsflx002', 'deptCodeNm', data.deptKorNm, 'text');
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormMhsflx002","deptCode","deptCodeNm", '' , "Y", null);
    }
}

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMhsflx002', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormMhsflx002', 'empNm', 'text'),
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMhsflx002', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormMhsflx002', 'empNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormMhsflx002","empno","empNm", '' , "Y", null);
  	}
}
$(document).click(function(e){ //문서 body를 클릭했을때
    if(e.target.id =="searchUseDt" || e.target.id =="searchUseSdtMhsflx002" || e.target.id =="searchUseEdtMhsflx002") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchUseDtCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

var fn_Calendar = function(){
	// 검색 폼 사용일자 달력
	searchUseDtCalendar = new dhtmlXDoubleCalendar("searchUseDt_cal");
	searchUseDtCalendar.attachEvent("onClick" , function(side , date){
		$('#searchUseSdtMhsflx002').val(dateFormat(searchUseDtCalendar.leftCalendar.getDate()));
		if(side == "right"){
			$('#searchUseEdtMhsflx002').val(dateFormat(searchUseDtCalendar.rightCalendar.getDate()));
			searchUseDtCalendar.hide();
		}
	});
	
	searchUseDtCalendar.leftCalendar.loadUserLanguage("ko"); 
	searchUseDtCalendar.rightCalendar.loadUserLanguage("ko");
	
	// 저장 폼 사용일자 달력
	saveUseSdtCalendar = new dhtmlXCalendarObject({input:"useBeginDeSaveFormMhsflx002"});
	saveUseEdtCalendar = new dhtmlXCalendarObject({input:"useEndDeSaveFormMhsflx002"});
	
	saveUseSdtCalendar.attachEvent("onClick" , function(){
        var tmp = gf_FormGetValue('saveFormMhsflx002', 'useBeginDe', 'text');
        var Sdate = new Date(tmp);
        Sdate.setDate(Sdate.getDate() - 1);
        saveUseEdtCalendar.setInsensitiveRange(null , Sdate);    
	});
	saveUseEdtCalendar.attachEvent("onClick" , function(){
        var tmp = gf_FormGetValue('saveFormMhsflx002', 'useEndDe', 'text');
        var Edate = new Date(tmp);
        Edate.setDate(Edate.getDate() + 1);
    	saveUseSdtCalendar.setInsensitiveRange(Edate , null);    
	});	
	saveUseSdtCalendar.hideTime(); 
	saveUseEdtCalendar.hideTime();
	saveUseSdtCalendar.loadUserLanguage("ko"); 
	saveUseEdtCalendar.loadUserLanguage("ko");
}
var fn_SessionCheck = function(){
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
//    console.log(userInfo);
    if(userInfo.code == "000"){
    	sessionUserDeptCode = userInfo.data.userDeptCode;
    	sessionUserDeptNm = userInfo.data.userDeptNm;
    	sessionUserEmpno = userInfo.data.userEmpNo;
    	sessionUserEmpnm = userInfo.data.userNm;
    	
//    	gf_FormSetValue("searchFormMhsflx002", "deptCode", sessionUserDeptCode , '');
//    	gf_FormSetValue("searchFormMhsflx002", "deptCodeNm", sessionUserDeptNm , '');
//    	gf_FormSetValue("searchFormMhsflx002", "empno", sessionUserEmpno , '');
//    	gf_FormSetValue("searchFormMhsflx002", "empNm", sessionUserEmpnm , '');
    	
    }	
}
/**
 * 승인상태 업데이트
 */
var fn_ConfmSttusUpdate = function(status ,popReturnResn){
	var returnResn;
	var statusCode;
	var rowId = dhxGridMhsflx002.getSelectedRowId();
	var empno = gf_DhxGetValue(dhxGridMhsflx002 , rowId, 'empno', 'grid');
	var sn = gf_DhxGetValue(dhxGridMhsflx002 , rowId, 'sn', 'grid');
	if(status == "approvalRequest") statusCode = "001"
	else if(status == "return") statusCode = "003"
	else if(status == "approval") statusCode = "002"
	
	if(!gf_IsNull(popReturnResn)) returnResn = popReturnResn;
	else returnResn = '';
	if(!gf_IsNull(sn)){
		var jsonParameter = {
				empno : empno,
				sn : sn,
				confmSttusCode : statusCode,
				returnResn : returnResn
		}
		var dataSource = gf_NoAsyncTransaction('mhsflx002/updateSttusMhsflx002', jsonParameter , 'GET');
		var data = dataSource.data;
		if(data.code == '000'){
			gf_DivMsgAlert(gv_MsgSave);
			fn_SearchMhsflx002('');
		}
		else{
			gf_DivMsgAlert(gv_MsgSave);
		}
		$('#returnResn .b-close').click();
	}
	else if(gf_IsNull(sn)){
		gf_DhxSetValue(dhxGridMhsflx002, rowId, 'confmSttusCode', '001' , 'grid');
		dhxDataProcessorMhsflx002.sendData(rowId);
	}
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
//입력 내용을 날짜 포멧으로
function dateChk(objDate){
	var RegNotNum = /[^0-9]/g;  //숫자 정규식
	var date = objDate.val();
	date = date.replace(RegNotNum, '');

	if (date == "" || date == null || date.length < 5) {
	  objDate.val(date);
	  return;
	}

	var DataFormat;
	var RegPhonNum;

	// 날짜 포맷(yyyy-mm-dd) 만들기 
	if (date.length <= 6) {
	  DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]+)/;
	} else if (date.length <= 8) {
	  DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
	}

	while (RegPhonNum.test(date)) {
	  date = date.replace(RegPhonNum, DataFormat);
	}

	objDate.val(date);

	// 모두 입력됐을 경우 날짜 유효성 확인
	if (date.length == 10) {
		var isVaild = true;
	
		if (isNaN(Date.parse(date))) {
			// 유효 날짜 확인 여부
			isVaild = false;
		} else {
			// 년, 월, 일 0 이상 여부 확인
			var date_sp = date.split("-");
			date_sp.forEach(function(sp) {
			  if (parseInt(sp) == 0) {
			    isVaild = false;
			  }
			});
		
			// 마지막 일 확인
			var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
			if (last.getDate() < parseInt(date_sp[2])) {
			 	isVaild = false;
			}
		}
		
		if (!isVaild) {
		  gf_DivMsgAlert("잘못된 날짜입니다. \n다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
}
/**
 * 조회
 */
var fn_SearchMhsflx002 = function(userId) {
    var jsonParameter = {
   		empno : gf_FormGetValue('searchFormMhsflx002', 'empno', 'text'),
   		deptCode : gf_FormGetValue('searchFormMhsflx002', 'deptCode', 'text'),
    	workTyCode : gf_FormGetValue('searchFormMhsflx002', 'searchComboWorkTyCode', 'combo'),
        useBeginDe : gf_FormGetValue('searchFormMhsflx002', 'searchUseSdt', 'text'),
        useEndDe : gf_FormGetValue('searchFormMhsflx002', 'searchUseEdt', 'text'),
        confmSttusCode : gf_FormGetValue('searchFormMhsflx002', 'searchConfmSttusCode', 'combo')
    };
    gf_Transaction(userId, 'mhsflx002/searchMhsflx002', jsonParameter, 'fn_CallbackSearchMhsflx002', false, 'GET');
};

var dhxDataProcessorMhsflx002;
var fn_CallbackSearchMhsflx002 = function(strSvcID, targetID, data) {
    dhxGridMhsflx002.clearAll();
    fn_DhxDataProcessorMhsflx002(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhsflx002');
        dhxGridMhsflx002.parse(data.data.records, 'js');
//        console.log(data.data.records);
        if(save_Row_Num_Mhsflx002 == 0 && save_All_Sta_Mhsflx002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMhsflx002.selectRow(0); 
        } else if(save_Row_Sta_Mhsflx002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMhsflx002.selectRow(0);
        } else if(save_All_Sta_Mhsflx002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMhsflx002.selectRow(save_Row_Num_Mhsflx002); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMhsflx002.selectRow(save_Row_Num_Mhsflx002);   //개발자 수정 필요  
            //var findCell = dhxGridMhsflx002.findCell(save_Row_Ids_Mhsflx002, gf_GetDhxGridColumId(dhxGridMhsflx002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMhsflx002.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMhsflx002.selectRow(0);
            //} 
        } 
 
        fn_FindMhsflx002();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhsflx002');
        fn_InitInputFormMhsflx002();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMhsflx002").text(data.data.records.length);
    cf_SetEventListenerMhsflx002();
};
var fn_DhxDataProcessorMhsflx002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhsflx002 = new dataProcessor(gv_ContextPath+'/mhsflx002/saveMhsflx002'); //lock feed url
    dhxDataProcessorMhsflx002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhsflx002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsflx002.init(dhxGridMhsflx002); //link dataprocessor to the grid
    dhxDataProcessorMhsflx002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhsflx002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhsflx002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
//    	console.log(dataSource);
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } 
           else if ((dataSource.code == "000" || dataSource.data.code !== "000") && dataSource.data.valCheck.length < 1){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhsflx002();
                    $("#checkAllMhsflx002").prop('checked', false); //상단 체크박스 해제
                    return true;
           } 
           else {
            		var failData = dataSource.data.valCheck;
            		var str = "";
            		for(var i = 0 ; i < failData.length ; i++){
            			str += (failData[i].korNm + '[' + failData[i].workTyCodeNm + ']\n');
            		}
            		str += '근무일자가 중복되었습니다.';
            		gf_DivMsgAlert(str);
            	    dhxGridMhsflx002.forEachRow(function(rowId) {	// 저장에 실패한 데이터들은 상태가 초기화 되어 sn이 없는 행들은 inserted로 변경
            	        if(gf_IsNull(gf_DhxGetValue(dhxGridMhsflx002, rowId, 'sn', 'grid'))) {
		            		dhxDataProcessorMhsflx002.setUpdated(rowId, true, 'inserted');
            	        }
            	    });
//              gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 상세조회
 */
var fn_FindMhsflx002 = function() {
    var rId = dhxGridMhsflx002.getSelectedRowId();
    var status = dhxDataProcessorMhsflx002.getState(rId);
    var regId = gf_DhxGetValue(dhxGridMhsflx002, rId, 'regId',  'grid');
    var sn = gf_DhxGetValue(dhxGridMhsflx002, rId, 'sn',  'grid');
    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhsflx002", "empno", gf_DhxGetValue(dhxGridMhsflx002, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "empnm", gf_DhxGetValue(dhxGridMhsflx002, rId, 'korNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "sn", sn , '');
    gf_FormSetValue("saveFormMhsflx002", "saveComboWorkTyCode", gf_DhxGetValue(dhxGridMhsflx002, rId, 'workTyCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsflx002", "useBeginDe", gf_DhxGetValue(dhxGridMhsflx002, rId, 'useBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "useEndDe", gf_DhxGetValue(dhxGridMhsflx002, rId, 'useEndDe',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "workBeginTime", gf_DhxGetValue(dhxGridMhsflx002, rId, 'workBeginTime',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "workEndTime", gf_DhxGetValue(dhxGridMhsflx002, rId, 'workEndTime',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "rm", gf_DhxGetValue(dhxGridMhsflx002, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "saveConfmSttusCode", gf_DhxGetValue(dhxGridMhsflx002, rId, 'confmSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "saveConfmSttusCodeNm", gf_DhxGetValue(dhxGridMhsflx002, rId, 'confmSttusCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "confmDe", gf_DhxGetValue(dhxGridMhsflx002, rId, 'confmDe',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "confmerEmpno", gf_DhxGetValue(dhxGridMhsflx002, rId, 'confmerEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "confmerEmpnm", gf_DhxGetValue(dhxGridMhsflx002, rId, 'confmerEmpnm',  'grid'), '');
    gf_FormSetValue("saveFormMhsflx002", "returnResn", gf_DhxGetValue(dhxGridMhsflx002, rId, 'returnResn',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormMhsflx002 input[name="empnm"]').prop('disabled', false);
        $('#saveFormMhsflx002 input[name="sn"]').prop('disabled', true);
        $('#saveFormMhsflx002 #saveBtnEmpSearch').attr('disabled' , false);
    }
    else if(gf_FormGetValue('saveFormMhsflx002', 'saveConfmSttusCode', 'text') == '002' || gf_FormGetValue('saveFormMhsflx002', 'saveConfmSttusCode', 'text') == '003'){
    	$('#saveFormMhsflx002 *').prop('disabled', true);
	}
    else if(regId != sessionUserEmpno && !gf_IsNull(regId) && !gf_IsNull(sn)){
    	$('#saveFormMhsflx002 *').prop('disabled', true);
    }    	
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhsflx002 = function() {
    $('#saveFormMhsflx002 input[name="empno"]').prop('disabled', false);
    $('#saveFormMhsflx002 input[name="sn"]').prop('disabled', false);
    $('#saveFormMhsflx002').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {

		$('#saveFormMhsflx002 *').prop('disabled', status);
	    $('#saveFormMhsflx002 *').attr("autocomplete" , "off");
	    
	    $('#saveFormMhsflx002 #confmDeSaveFormMhsflx002').prop('disabled' , true);
	    $('#saveFormMhsflx002 #confmerEmpnoSaveFormMhsflx002').prop('disabled' , true);
	    $('#saveFormMhsflx002 #confmerEmpnmSaveFormMhsflx002').prop('disabled' , true);
	    $('#saveFormMhsflx002 #empnoSaveFormMhsflx002').prop('disabled' , true);
	    $('#saveFormMhsflx002 #snSaveFormMhsflx002').prop('disabled' , true);
        $('#saveFormMhsflx002 #confmSttusCodeNmSaveFormMhsflx002').attr('disabled' , true);
        $('#saveFormMhsflx002 #returnResnSaveFormMhsflx002').attr('disabled' , true);
	    
};
/**
 * 추가(신규) 
 */
var fn_AddMhsflx002 = function() {
    dhxGridMhsflx002.clearSelection();
    fn_InitInputFormMhsflx002();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //empno
    initValueArr.push(''); //korNm
    initValueArr.push(''); //sn
    initValueArr.push(''); //workTyCode
    initValueArr.push(''); //workTyCodeNm
    initValueArr.push(''); //useBeginDe
    initValueArr.push(''); //useEndDe
    initValueArr.push('09:00'); //workBeginTime
    initValueArr.push('18:00'); //workEndTime
    initValueArr.push(''); //rm
    initValueArr.push(''); //confmSttusCode
    initValueArr.push(''); //confmSttusCodeNm
    initValueArr.push(''); //confmDe
    initValueArr.push(''); //confmerEmpno
    initValueArr.push(''); //confmerEmpnm
    initValueArr.push(''); //returnResn
    initValueArr.push(''); //regId
    dhxGridMhsflx002.addRow(dhxGridMhsflx002.uid(), initValueArr, 0);
    dhxGridMhsflx002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhsflx002');
    $('#btnPopEmpSearchMhsflx002').show();
    fn_FormDisabled(false);
    fn_FindMhsflx002();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhsflx002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhsflx002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhsflx002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhsflx002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsflx002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhsflx002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhsflx002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhsflx002', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsflx002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhsflx002.setSortImgState(false); 
            gf_FormSetValue('searchFormMhsflx002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhsflx002', 'sortColumId', '', 'text'); 
            dhxGridMhsflx002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhsflx002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhsflx002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhsflx002', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsflx002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhsflx002 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhsflx002 = 0; 
    save_Edt_Cnt_Mhsflx002 = 0; 
    save_Del_Cnt_Mhsflx002 = 0; 
    dhxGridMhsflx002.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhsflx002.getState(rowId))) {
            edCnt++;
            
            var state = dhxDataProcessorMhsflx002.getState(rowId); 
            
            if(state == 'inserted') { 
                save_Add_Cnt_Mhsflx002 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhsflx002 += 1; 
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
        save_All_Sta_Mhsflx002 = 0; 
        if(save_Add_Cnt_Mhsflx002 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhsflx002 + "건";
            save_All_Sta_Mhsflx002 = 1; 
        } 
        if(save_Edt_Cnt_Mhsflx002 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhsflx002 + "건"; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhsflx002(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhsflx002(confirmMsg)){  //여기는 안옴 
        } 
        else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhsflx002 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhsflx002_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhsflx002_Send = function() {
    if(fn_GridValidation(dhxGridMhsflx002, dhxDataProcessorMhsflx002)) {
        dhxDataProcessorMhsflx002.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhsflx002 = function() {
    var rowId = dhxGridMhsflx002.getSelectedRowId();
    var state = dhxDataProcessorMhsflx002.getState(rowId);
    var paramSttusCode = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'confmSttusCode', 'grid');
    var paramSttusCodeNm = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'confmSttusCodeNm', 'grid');
    var ownEmpno = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'empno', 'grid');
    var ownSn = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'sn', 'grid');
    var regId = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'regId', 'grid');
    if(state == 'inserted') {
	    var rowNum = dhxGridMhsflx002.getRowIndex(rowId);
	    dhxGridMhsflx002.deleteRow(rowId);
	    dhxGridMhsflx002.selectRow(rowNum);
	    fn_FindMhsflx002();
    }
    else if(ownEmpno != sessionUserEmpno && !gf_IsNull(ownEmpno) && regId != sessionUserEmpno){
    	gf_DivMsgAlert("자신의 근무유형만 삭제할 수 있습니다.");
    	return;
    }
    else if(!gf_IsNull(paramSttusCode)  && !gf_IsNull(ownSn) && (paramSttusCode == '002' || paramSttusCode == '003')){
    	gf_DivMsgAlert(paramSttusCodeNm + "상태는 삭제 할 수 없습니다.");
    	return;
    }
    else gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMhsflx002Exe(' + rowId + ')', '');
}
/**
 * 삭제 진행
 * */
var fn_RemoveMhsflx002Exe = function(rowId){
	var paramSn = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'sn', 'grid');
	var paramEmpno = gf_DhxGetValue(dhxGridMhsflx002, rowId, 'empno', 'grid');
	if(gf_IsNull(paramSn) || gf_IsNull(paramEmpno)){
		gf_DivMsgAlert("순번 또는 사원번호가 선택되지 않았습니다.");
	}
	else{
		var jsonParameter = {
				sn : paramSn,
				empno : paramEmpno
		}
		var dataSource = gf_NoAsyncTransaction('mhsflx002/deleteMhsflx002', jsonParameter, 'GET');
		if(dataSource.code == "000"){
			gf_DivMsgAlert(gv_MsgDelete);
			fn_SearchMhsflx002('');
		}
	}
}
/**
 * 반려사유
 */
var fn_ReturnResnPopup = function(type){	// type : 일괄 , 개별 구분 용도
	var userId = ""; 
	var title  = "반려사유";
	//저장팝업
	var dhxWindowObj;
	var returnResn;
	if($('body').find("div[id='returnResn']").size() <= 0) {
		$('body').append("<div id='returnResn'><div class='b-close' style='display:none'></div></div>");
	}
	$('#returnResn').bPopup({
		onOpen:function(){
			
			returnResn = new dhtmlXWindows();
			var id 		= 'returnResn';
			var ajaxUrl = gv_ContextPath+'/mhsflx002/popup/returnResn/view?type=' + type;
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 170;
			
			dhxWindowObj = returnResn.createWindow(id, left, top, width, height);
			returnResn.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#returnResn .b-close').click();
			});
		},
		onClose:function(){
			returnResn.unload();
			$('body').find("div[id='returnResn']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}

/**
 * 엑셀다운로드
 */
var fn_ExcelMhsflx002 = function () {
    var titMhsflx002 = '개인별근무유형선택'; /* gf_LocaleTrans('default', 'titMhsflx002') */
    var jsonParameter = {
   		empno : gf_FormGetValue('searchFormMhsflx002', 'empno', 'text'),
   		deptCode : gf_FormGetValue('searchFormMhsflx002', 'deptCode', 'text'),
    	workTyCode : gf_FormGetValue('searchFormMhsflx002', 'searchComboWorkTyCode', 'combo'),
        useBeginDe : gf_FormGetValue('searchFormMhsflx002', 'searchUseSdt', 'text'),
        useEndDe : gf_FormGetValue('searchFormMhsflx002', 'searchUseEdt', 'text'),
        confmSttusCode : gf_FormGetValue('searchFormMhsflx002', 'searchConfmSttusCode', 'combo')
    };
    var header = [[
        '사원이름' /* gf_LocaleTrans('default', 'titEmpno') */,
        '근무 유형' /* gf_LocaleTrans('default', 'titWorkTyCode') */,
        '근무 시작 일자' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '근무 종료 일자' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '근무 시작 시간' /* gf_LocaleTrans('default', 'titWorkBeginTime') */,
        '근무 종료 시간' /* gf_LocaleTrans('default', 'titWorkEndTime') */,
        '승인 여부' /* gf_LocaleTrans('default', 'titConfmSttusCode') */,
        '승인 일자' /* gf_LocaleTrans('default', 'titConfmDe') */,
        '승인자 사원이름' /* gf_LocaleTrans('default', 'titConfmerEmpno') */,
        '반려사유' /* gf_LocaleTrans('default', 'titReturnResn') */
    ]];
    var dataId = [[ 'korNm', 'workTyCodeNm', 'useBeginDe', 'useEndDe', 'workBeginTime', 'workEndTime', 'confmSttusCodeNm', 'confmDe', 'confmerEmpnm', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titMhsflx002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsflx002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhsflx002/excelMhsflx002', jsonParameter);
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
    $('#saveFormMhsflx002 #empnoSaveFormMhsflx002').parent().append(
    '<div class="error" id="empnoSaveFormMhsflx002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsflx002 #snSaveFormMhsflx002').parent().append(
    '<div class="error" id="snSaveFormMhsflx002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhsflx002 = function(empno, sn){
    if(!gf_IsNull(empno) && !gf_IsNull(sn)) {
        var jsonParameter = {
            empno : empno,
            sn : sn
        };
        var dataSource = gf_NoAsyncTransaction('mhsflx002/findMhsflx002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.sn)) {
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
    var state = dhxDataProcessorMhsflx002.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhsflx002').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormMhsflx002', 'empno', 'text');
                    var sn = gf_FormGetValue('saveFormMhsflx002', 'sn', 'text');
                    if(fn_CheckDupMhsflx002(empno, sn)) return true;
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
    var checkEmpno;
    var checkSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhsflx002 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhsflx002 == 'deleted') {
        save_Row_Num_Mhsflx002 = 0;
        save_Row_Ids_Mhsflx002 = "";
    } else if(save_Row_Sta_Mhsflx002 == 'inserted') {
        save_Row_Num_Mhsflx002 = rowNum;
        save_Row_Ids_Mhsflx002 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhsflx002 = rowNum;
        save_Row_Ids_Mhsflx002 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'korNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'korNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'workTyCodeNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'workTyCodeNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
                    valid = false;
                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'sn', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sn');
//                    valid = false;
//                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
//                if(state == 'inserted') {
//                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
//                    if(!gf_IsNull(checkEmpno) && !gf_IsNull(checkSn)) {
//                        // 신규입력 key 그리드 중복 체크
//                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
//                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
//                            var sn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'sn', 'grid');
//                            if(((empno == checkEmpno) && (sn == checkSn)) && (rowId != rowIdForCheck)) {
//                                validFalseDuplicationKey = true;
//                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
//                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sn');
//                                valid = false;
//                            }
//                        });
//                        // 신규입력 key db 중복 체크
//                        if(!fn_CheckDupMhsflx002( checkEmpno, checkSn )){
//                            validFalseDuplicationKey = true;
//                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
//                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sn');
//                            valid = false;
//                        }
//                        // 그리드 중복된 처음 추가된 row 체크
//                        if(!valid && gf_IsNull(validFalseFistRowId)) {
//                            validFalseFistRowId = rowId;
//                        }
//                    } else {
//                        // 신규로 등록된 마지막 로우를 설정
//                        if(!valid && gf_IsNull(validFalseFistRowId)) {
//                            validFalseFistRowId = rowId;
//                        }
//                    }
//                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
//    gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMhsflx002.selectRowById(validFalseFistRowId);
        fn_FindMhsflx002();
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

