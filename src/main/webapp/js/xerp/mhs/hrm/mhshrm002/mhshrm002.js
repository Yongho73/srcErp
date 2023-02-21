/**
 *    프로그램       : 부서코드등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.19
 *    사용테이블      : MHS_DEPT
 * sourceGen version : 2020.07.16.01 (2020.08.19)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm002 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm002 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm002;  //그리드 객체
var eventIdMhshrm002 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm002;  //DataProcessor 객체

var gBplcCode = '1000';
var RegNotNum = /[^0-9]/g;  //숫자 정규식
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm002();
    if(cf_SetComponentsMhshrm002()){
       cf_SetEventListenerMhshrm002();
       cf_InitFormMhshrm002();
       cf_SetBindingMhshrm002();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm002 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm002").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsMhshrm002 = function() {
    var dhxGridMhshrm002HeaderInfo = [];
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서코드', '120', 'center', 'str', 'ro', false, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서한글명', '*', 'left', 'str', 'ro', false, 'deptKorNm', '', '')); /* gf_LocaleTrans('default', 'titDeptKorNm') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서장', '120', 'center', 'str', 'ro', false, 'dprlrEmpNm', '', '')); /* gf_LocaleTrans('default', 'titDprlrEmpno') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '80', 'center', 'str', 'ro', false, 'useAtNm', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('사업장구분코드', '100', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서종류코드', '100', 'center', 'str', 'ro', true, 'deptKindCode', '', '')); /* gf_LocaleTrans('default', 'titDeptKindCode') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서영문명', '100', 'left', 'str', 'ro', true, 'deptEngNm', '', '')); /* gf_LocaleTrans('default', 'titDeptEngNm') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서약어', '100', 'left', 'str', 'ro', true, 'deptAbrv', '', '')); /* gf_LocaleTrans('default', 'titDeptAbrv') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('정렬순서', '100', 'right', 'int', 'ro', true, 'sortOrdr', '', '')); /* gf_LocaleTrans('default', 'titSortOrdr') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서전화번호', '100', 'left', 'str', 'ro', true, 'deptTelno', '', '')); /* gf_LocaleTrans('default', 'titDeptTelno') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서팩스번호', '100', 'left', 'str', 'ro', true, 'deptFaxTelno', '', '')); /* gf_LocaleTrans('default', 'titDeptFaxTelno') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서이메일', '100', 'left', 'str', 'ro', true, 'deptEmail', '', '')); /* gf_LocaleTrans('default', 'titDeptEmail') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('부서장사원번호', '100', 'center', 'str', 'ro', true, 'dprlrEmpno', '', '')); /* gf_LocaleTrans('default', 'titDprlrEmpno') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('예산사용 부서', '100', 'left', 'str', 'ro', true, 'bugtUseDept', '', '')); /* gf_LocaleTrans('default', 'titBugtUseDept') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '100', 'left', 'str', 'ro', true, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '100', 'left', 'str', 'ro', true, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ro', true, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm002HeaderInfo.push(gf_MakeDhxGridHeader('예산사용 부서이름', '100', 'left', 'str', 'ro', true, 'bugtUseDeptNm', '', '')); /* gf_LocaleTrans('default', 'titBugtUseDept') */
    dhxGridMhshrm002 = gf_MakeDhxGrid('dataListMhshrm002', dhxGridMhshrm002HeaderInfo, true, false, false);
    dhxGridMhshrm002.enableAutoWidth(false);
    dhxGridMhshrm002.setEditable(true);

    dhxGridMhshrm002.setColumnMinWidth(100,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrm002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm002 = gf_GridDetachEvent(dhxGridMhshrm002, eventIdMhshrm002);
    eventId = dhxGridMhshrm002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm002.getColumnsNum();
            var rowNum = dhxGridMhshrm002.getRowsNum();
            var selectedId = dhxGridMhshrm002.getSelectedRowId();
            var ind        = dhxGridMhshrm002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm002.getRowIndex(selectedId);
            var type       = dhxGridMhshrm002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm002.selectRow(0);
                    //fn_FindMhshrm002();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm002.selectRow(rowIndex + 1);
                    fn_FindMhshrm002();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm002.getSelectedRowId();
            var ind        = dhxGridMhshrm002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm002.getRowIndex(selectedId);
            var type       = dhxGridMhshrm002.getColType(ind);
            dhxGridMhshrm002.selectCell(rowIndex+1, ind);
            fn_FindMhshrm002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm002.getSelectedRowId();
            var ind        = dhxGridMhshrm002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm002.getRowIndex(selectedId);
            var type       = dhxGridMhshrm002.getColType(ind);
            dhxGridMhshrm002.selectCell(rowIndex-1, ind);
            fn_FindMhshrm002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm002.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm002.push(eventId);
    eventId = dhxGridMhshrm002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm002SortGridList(ind, type, direction); 
    });
    eventIdMhshrm002.push(eventId);
    eventId = dhxGridMhshrm002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm002.push(eventId);
    eventId = dhxGridMhshrm002.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhshrm002();
    });
    eventIdMhshrm002.push(eventId);
    eventId = dhxGridMhshrm002.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhshrm002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrm002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrm002()
    });
    $('#btnSaveMhshrm002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrm002();
    });
    $('#btnRemoveMhshrm002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm002();
    });
    $('#btnExcelMhshrm002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm002();
    });
    $('#btnSearchMhshrm002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm002('');
    });
    $('#btnResetMhshrm002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm002();
    });
    $('#btnDeptSearch').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        gf_DeptPopup("saveFormMhshrm002","bugtUseDeptSaveFormMhshrm002","bugtUseDeptNmSaveFormMhshrm002", gBplcCode, "Y"); 
    });
    $('#btnEmpSearch').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        gf_EmpPopup("saveFormMhshrm002","dprlrEmpnoSaveFormMhshrm002","dprlrEmpNmSaveFormMhshrm002", '' , "Y", null);
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhshrm002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrm002').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //달력 이벤트
    $('#saveFormMhshrm002 .input_calen').unbind('keyup').bind('keyup', function(event){
    	dateChk($(this));
    });
	//부서 입력
	$('#bugtUseDeptNmSaveFormMhshrm002').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('saveFormMhshrm002', 'bugtUseDept', '', 'text');
		}
    });
	$('#bugtUseDeptSaveFormMhshrm002').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('saveFormMhshrm002', 'bugtUseDeptNm', '', 'text');
		}
    });
	//사원 입력
	$('#dprlrEmpnoSaveFormMhshrm002').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('saveFormMhshrm002', 'dprlrEmpNm', '', 'text');
		}
    });
	$('#dprlrEmpNmSaveFormMhshrm002').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('saveFormMhshrm002', 'dprlrEmpno', '', 'text');
		}
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrm002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == 'bugtUseDeptNmSaveFormMhshrm002' || this.id == 'bugtUseDeptSaveFormMhshrm002'){
        		return fn_SearchDeptCode();
        	}
        	if(this.id == 'dprlrEmpnoSaveFormMhshrm002' || this.id == 'dprlrEmpNmSaveFormMhshrm002'){
        		return fn_SearchEmpCode();
        	}
        	return gf_saveForm_NextEle("saveFormMhshrm002",this); 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm002 input[name="deptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'deptCode', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="deptKorNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'deptKorNm', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="useBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'useBeginDe', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="useEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'useEndDe', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	var val = gf_IsNull(gf_FormGetValue('saveFormMhshrm002', 'useAt', 'chkbox'))? '0' : '1';
    	var valNm = gf_IsNull(gf_FormGetValue('saveFormMhshrm002', 'useAt', 'chkbox'))? '미사용' : '사용';
    	gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'useAt', val);    	
    	gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'useAtNm', valNm, true);
    	if(val == '0'){
    		gf_FormSetValue('saveFormMhshrm002', 'useEndDe', nowDate, '');
    	} else {
    		gf_FormSetValue('saveFormMhshrm002', 'useEndDe', '', '');
    	}
    });
    $('#saveFormMhshrm002 input[name="deptTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'deptTelno', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="deptFaxTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'deptFaxTelno', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="deptEmail"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'deptEmail', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="dprlrEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'dprlrEmpno', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="dprlrEmpNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'dprlrEmpNm', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="sortOrdr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'sortOrdr', $(this).val());
    });
    
    
    $('#saveFormMhshrm002 input[name="bugtUseDept"]').unbind('chang').bind('change',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'bugtUseDept', $(this).val());
    });
    $('#saveFormMhshrm002 input[name="bugtUseDeptNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm002, dhxDataProcessorMhshrm002, 'bugtUseDeptNm', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormMhshrm002 = function() {
    $('#searchFormMhshrm002').resetForm();
    gf_FormSetValue('searchFormMhshrm002', 'useAt', '1', 'combo');
    $('#deptKorNmSearchFormMhshrm002').focus();
};

var cf_SetBindingMhshrm002 = function() {
    fn_Calendar();
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhshrm002('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm002 = function(userId) {
    var jsonParameter = {
    	deptKorNm : gf_FormGetValue('searchFormMhshrm002', 'deptKorNm', 'text'),
    	useAt : gf_FormGetValue('searchFormMhshrm002', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm002/searchMhshrm002', jsonParameter, 'fn_CallbackSearchMhshrm002', false, 'GET');
};

var fn_CallbackSearchMhshrm002 = function(strSvcID, targetID, data) {
    //dhxGridMhshrm002.clearAll();
    dhxGridMhshrm002.destructor();
    if(cf_SetComponentsMhshrm002()){ 
        fn_DhxDataProcessorMhshrm002(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrm002');
            dhxGridMhshrm002.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mhshrm002 == 0 && save_All_Sta_Mhshrm002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrm002.selectRow(0); 
            } else if(save_Row_Sta_Mhshrm002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrm002.selectRow(0);
            } else if(save_All_Sta_Mhshrm002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrm002.selectRow(save_Row_Num_Mhshrm002); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrm002.selectRow(save_Row_Num_Mhshrm002);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrm002.findCell(save_Row_Ids_Mhshrm002, gf_GetDhxGridColumId(dhxGridMhshrm002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrm002.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrm002.selectRow(0);
                //} 
            } 
 
            fn_FindMhshrm002();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrm002');
            fn_InitInputFormMhshrm002();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhshrm002").text(data.data.records.length);
        cf_SetEventListenerMhshrm002();
    } 
};
var fn_DhxDataProcessorMhshrm002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm002 = new dataProcessor(gv_ContextPath+'/mhshrm002/saveMhshrm002'); //lock feed url
    dhxDataProcessorMhshrm002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm002.init(dhxGridMhshrm002); //link dataprocessor to the grid
    dhxDataProcessorMhshrm002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm002();
                    $("#checkAllMhshrm002").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhshrm002 = function() {
    var rId = dhxGridMhshrm002.getSelectedRowId();
    var status = dhxDataProcessorMhshrm002.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhshrm002", "deptCode", gf_DhxGetValue(dhxGridMhshrm002, rId, 'deptCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "deptKorNm", gf_DhxGetValue(dhxGridMhshrm002, rId, 'deptKorNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "sortOrdr", gf_DhxGetValue(dhxGridMhshrm002, rId, 'sortOrdr',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "deptTelno", gf_DhxGetValue(dhxGridMhshrm002, rId, 'deptTelno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "deptFaxTelno", gf_DhxGetValue(dhxGridMhshrm002, rId, 'deptFaxTelno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "deptEmail", gf_DhxGetValue(dhxGridMhshrm002, rId, 'deptEmail',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "dprlrEmpno", gf_DhxGetValue(dhxGridMhshrm002, rId, 'dprlrEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "dprlrEmpNm", gf_DhxGetValue(dhxGridMhshrm002, rId, 'dprlrEmpNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "bugtUseDept", gf_DhxGetValue(dhxGridMhshrm002, rId, 'bugtUseDept',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "bugtUseDeptNm", gf_DhxGetValue(dhxGridMhshrm002, rId, 'bugtUseDeptNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "useBeginDe", gf_DhxGetValue(dhxGridMhshrm002, rId, 'useBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm002", "useEndDe", gf_DhxGetValue(dhxGridMhshrm002, rId, 'useEndDe',  'grid'), '');
    gf_FormSetValue('saveFormMhshrm002', 'useAt', (( gf_DhxGetValue(dhxGridMhshrm002, rId, 'useAt',  'grid')  == '1') ? true : false), "chkbox");

    if(status == 'inserted') {
        $('#saveFormMhshrm002 input[name="deptCode"]').prop('disabled', false);
    } else {
        $('#saveFormMhshrm002 input[name="deptCode"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrm002 = function() {
    $('#saveFormMhshrm002 input[name="deptCode"]').prop('disabled', false);
    $('#saveFormMhshrm002').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhshrm002 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhshrm002 = function() {
    dhxGridMhshrm002.clearSelection();
    fn_InitInputFormMhshrm002();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //deptCode
    initValueArr.push(''); //deptKorNm
    initValueArr.push(''); //dprlrEmpno
    initValueArr.push('사용'); //useAtNm
    initValueArr.push(gBplcCode); //bplcCode
    initValueArr.push(''); //deptKindCode
    initValueArr.push(''); //deptEngNm
    initValueArr.push(''); //deptAbrv
    initValueArr.push(''); //sortOrdr
    initValueArr.push(''); //deptTelno
    initValueArr.push(''); //deptFaxTelno
    initValueArr.push(''); //deptEmail
    initValueArr.push(''); //bugtUseDept
    initValueArr.push(new Date().format('YYYY-MM-DD')); //useBeginDe
    initValueArr.push(''); //useEndDe
    initValueArr.push('1'); //useAt
    dhxGridMhshrm002.addRow(dhxGridMhshrm002.uid(), initValueArr, 0);
    dhxGridMhshrm002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm002');
    $('#btnPopEmpSearchMhshrm002').show();
    fn_FormDisabled(false);
    gf_FormSetValue('saveFormMhshrm002', 'useBeginDe', nowDate, '');
    gf_FormSetValue('saveFormMhshrm002', 'bugtUseDept', '', '');
    gf_FormSetValue('saveFormMhshrm002', 'useAt', true, "chkbox");
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm002', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm002.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm002', 'sortColumId', '', 'text'); 
            dhxGridMhshrm002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm002', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm002 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrm002 = 0; 
    save_Edt_Cnt_Mhshrm002 = 0; 
    save_Del_Cnt_Mhshrm002 = 0; 
    dhxGridMhshrm002.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrm002.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrm002.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrm002 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrm002 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrm002 += 1; 
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
        save_All_Sta_Mhshrm002 = 0; 
        if(save_Add_Cnt_Mhshrm002 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrm002 + "건";
            save_All_Sta_Mhshrm002 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrm002 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrm002 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrm002 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrm002 + "건"; 
            save_All_Sta_Mhshrm002 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrm002(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrm002(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrm002 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm002_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm002_Send = function() {
    if(fn_GridValidation(dhxGridMhshrm002, dhxDataProcessorMhshrm002)) {
        dhxDataProcessorMhshrm002.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm002 = function() {
    var rowId = dhxGridMhshrm002.getSelectedRowId();
    var state = dhxDataProcessorMhshrm002.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMhshrm002.getRowIndex(rowId);
        dhxGridMhshrm002.deleteRow(rowId);
        dhxGridMhshrm002.selectRow(rowNum);
        fn_FindMhshrm002();
    }
    else {
        var result = false; 
    	fn_DivMsgConfirm2('삭제하시겠습니까?', function(confirm){ 
    	    if(confirm){ 
    	        result = true;
    	        fn_DeleteMhshrm002();
    	    }else{ 
    	        result = false; 
    	    } 
    	}); 
    	return result; 
    };
}

function fn_DeleteMhshrm002(){
	var rId = dhxGridMhshrm002.getSelectedRowId();
	
	var jsonParameter = {
			deptCode : gf_DhxGetValue(dhxGridMhshrm002, rId, 'deptCode',  'grid')
    };
	
	var dataSource = gf_NoAsyncTransaction('mhshrm002/findMhshrm003', jsonParameter, 'GET');
    var data = dataSource.data;
    
    if(dataSource.code === '000'){
    	if(gf_IsNull(data.useCheck)){
            var dataSource = gf_NoAsyncTransaction('mhshrm002/deleteMhshrm002', jsonParameter, 'POST');
            if(dataSource.code === '000') {
            	
            	gf_DivMsgAlert("삭제되었습니다.");
            	fn_SearchMhshrm002();
            } else {
            	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            }
    	} else {
        	gf_DivMsgAlert("사용중인 부서입니다.");
        	return false;
    	}
    } else {
    	gf_DivMsgAlert("삭제 확인을 할 수 없습니다.");
        return false;
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrm002 = function () {
    var titMhshrm002 = '부서코드등록'; /* gf_LocaleTrans('default', 'titMhshrm002') */
    var jsonParameter = {
        deptCode : gf_FormGetValue('searchFormMhshrm002', 'deptCode', 'text')
    };
    var header = [[
        '부서코드' /* gf_LocaleTrans('default', 'titDeptCode') */,
        '사업장구분코드 기본 자리수는 4자리' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '부서 종류 코드' /* gf_LocaleTrans('default', 'titDeptKindCode') */,
        '부서한글명' /* gf_LocaleTrans('default', 'titDeptKorNm') */,
        '부서 영문명' /* gf_LocaleTrans('default', 'titDeptEngNm') */,
        '부서약어:그룹웨어에서 사용' /* gf_LocaleTrans('default', 'titDeptAbrv') */,
        '정렬순서' /* gf_LocaleTrans('default', 'titSortOrdr') */,
        '부서전화번호' /* gf_LocaleTrans('default', 'titDeptTelno') */,
        '부서팩스번호' /* gf_LocaleTrans('default', 'titDeptFaxTelno') */,
        '부서이메일 -부서별로 전자세금계산서수취시 사' /* gf_LocaleTrans('default', 'titDeptEmail') */,
        '부서장 사원번호' /* gf_LocaleTrans('default', 'titDprlrEmpno') */,
        '예산 사용 부서' /* gf_LocaleTrans('default', 'titBugtUseDept') */,
        '사용시작일자' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일자( 사용여부가 N이 입력될경우 종료일자가 들어가야함' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */
    ]];
    var dataId = [[ 'deptCode', 'bplcCode', 'deptKindCode', 'deptKorNm', 'deptEngNm', 'deptAbrv', 'sortOrdr', 'deptTelno', 'deptFaxTelno', 'deptEmail', 'dprlrEmpno', 'bugtUseDept', 'useBeginDe', 'useEndDe', 'useAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm002/excelMhshrm002', jsonParameter);
};

function fn_Calendar(){
	//달력 생성
	var dhxCCalendarBeginDate = new dhtmlXCalendarObject({input:"useBeginDeSaveFormMhshrm002", button:"startDateIcon"});
	dhxCCalendarBeginDate.loadUserLanguage("ko");
	dhxCCalendarBeginDate.hideTime();
//	dhxCCalendarBeginDate.setDateFormat("%Y-%m-%d");
	
	//금일 날짜표시
	$('#useBeginDeSaveFormMhshrm002').val(nowDate);
	

	//달력 생성
	var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"useEndDeSaveFormMhshrm002", button:"startDateIcon"});
	dhxCCalendarEndDate.loadUserLanguage("ko");
	dhxCCalendarEndDate.hideTime();
//	dhxCCalendarEndDate.setDateFormat("%Y-%m-%d");
	
	//금일 날짜표시
	$('#useEndDeSaveFormMhshrm002').val(nowDate);
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
		  alert("잘못된 날짜입니다. \n다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
}

//--부서 입력 후 Enter 이벤트
function fn_SearchDeptCode(){
//	var deptKorNm = gf_FormGetValue('saveFormMhshrm002', 'searchDeptNm', 'text');
	var jsonParameter = {
			deptKorNm : gf_FormGetValue('saveFormMhshrm002', 'bugtUseDeptNm', 'text'),
			deptCode : gf_FormGetValue('saveFormMhshrm002', 'bugtUseDept', 'text'),
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('list_type01', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchDeptCode', false, 'GET');
}
function fn_CallbackSearchDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('saveFormMhshrm002', 'bugtUseDept', data.deptCode, 'text');
   		gf_FormSetValue('saveFormMhshrm002', 'bugtUseDeptNm', data.deptKorNm, 'text');
    } 
    else {
    	//Popup 호출
    	gf_DeptPopup("saveFormMhshrm002","bugtUseDeptSaveFormMhshrm002","bugtUseDeptNmSaveFormMhshrm002", gBplcCode, "Y"); 
    }
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('saveFormMhshrm002', 'dprlrEmpno', 'text'),
		    korNm : gf_FormGetValue('saveFormMhshrm002', 'dprlrEmpNm', 'text'),
		    bplcCode : gBplcCode
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('saveFormMhshrm002', 'dprlrEmpno', data.empno, 'text');
 		gf_FormSetValue('saveFormMhshrm002', 'dprlrEmpNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("saveFormMhshrm002","dprlrEmpnoSaveFormMhshrm002","dprlrEmpNmSaveFormMhshrm002", '' , "Y", null);
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
    $('#saveFormMhshrm002 #deptCodeSaveFormMhshrm002').parent().append(
    '<div class="error" id="deptCodeSaveFormMhshrm002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrm002 = function(deptCode){
    if(!gf_IsNull(deptCode)) {
        var jsonParameter = {
            deptCode : deptCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm002/findMhshrm002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.deptCode)) {
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
    var state = dhxDataProcessorMhshrm002.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshrm002').validate().form()){
                if(state == 'inserted') {
                    var deptCode = gf_FormGetValue('saveFormMhshrm002', 'deptCode', 'text');
                    if(fn_CheckDupMhshrm002(deptCode)) return true;
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
    var checkDeptCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    var firstDeptCode = '';
    var secondDeptCode = '';
    save_Row_Sta_Mhshrm002 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshrm002 == 'deleted') {
        save_Row_Num_Mhshrm002 = 0;
        save_Row_Ids_Mhshrm002 = "";
    } else if(save_Row_Sta_Mhshrm002 == 'inserted') {
        save_Row_Num_Mhshrm002 = rowNum;
        save_Row_Ids_Mhshrm002 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrm002 = rowNum;
        save_Row_Ids_Mhshrm002 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	var length = gf_DhxGetValue(dhxGridObjet, rowId, 'deptCode', 'grid').length;
            	firstDeptCode = gf_DhxGetValue(dhxGridObjet, rowId, 'deptCode', 'grid').substring(0, Number(length)-2);
            	secondDeptCode = gf_DhxGetValue(dhxGridObjet, rowId, 'deptCode', 'grid').substring(Number(length)-2, Number(length));
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'deptCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'deptKorNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptKorNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
                    valid = false;
                }
                if(valid && !gv_ValidateMethods.minlength( gf_DhxGetValue(dhxGridObjet, rowId, 'deptCode', 'grid'), '4' )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptCode');
                    valid = false;
                }
                if(valid && secondDeptCode != '00'){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptCode');
                    gf_DhxGridCellMapping(dhxGridObjet, dhxDataProcessor, 'deptCode', firstDeptCode+'00');
                    valid = false;
                }
                if(valid && gf_DhxGetValue(dhxGridObjet, rowId, 'useAt', 'grid') != '1'){
                    if(gf_IsNull(gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid'))){
                        fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
                        valid = false;
                        $('#saveFormMhshrm002 #useEndDeSaveFormMhshrm002useEndDeSaveFormMhshrm002').parent().append(
                        	'<div class="error" id="deptCodeSaveFormMhshrm002-error" onclick="$(this).remove()">필수입력값입니다.</div>'
                        );
                    }
                }
                if(valid && !gf_IsNull(gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid'))){
                	if(valid && (gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid').replaceAll('-','') < gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid').replaceAll('-',''))){
	                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
	                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
	                    gf_DivMsgAlert("사용종료일자를 확인해주세요.");
	                    gf_DhxGridCellMapping(dhxGridObjet, dhxDataProcessor, 'useEndDe', '');
	                    valid = false;
	                }
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkDeptCode = gf_DhxGetValue(dhxGridObjet, rowId, 'deptCode', 'grid');
                    if(!gf_IsNull(checkDeptCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var deptCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'deptCode', 'grid');
                            if(((deptCode == checkDeptCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrm002( checkDeptCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptCode');
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
        dhxGridMhshrm002.selectRowById(validFalseFistRowId);
        fn_FindMhshrm002();
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