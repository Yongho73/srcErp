/**
 *    프로그램       : 휴가신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.04
 *    사용테이블      : MHS_WRYC
 * sourceGen version : 2020.06.29.01 (2020.07.02)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrd002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrd002 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrd002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrd002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrd002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrd002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrd002 = 0;  //그리드 삭제 수량 
 
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var searchApplyCalendar; // 신청일자 검색 달력
var searchWryCalender; //휴가일자 검색 달력
var saveWryCalender; //휴가일자 검색 달력
var gBplcCode = "1000";
var userno;
var userNm;
var userDeptNm;
var userDeptNo;

var wrycSeCodeList;
var checkTime = 'D';
var dayCnt;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrd002();
    cf_SetComponentsMhshrd002();
    cf_SetEventListenerMhshrd002();
    cf_InitFormMhshrd002();
    cf_SetBindingMhshrd002();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrd002 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrd002").validate({ errorElement: 'div', ignore: '' });
    fn_Calender();
    fn_SingleCalender();
	
};

var dhxGridMhshrd002;
var cf_SetComponentsMhshrd002 = function() {
    var dhxGridMhshrd002HeaderInfo = [];
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrd002" />', '40', 'center', 'na', 'ch', true, 'chk', '', ''));
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('부서명', '100', 'center', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titDeptNm') */
	dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('부서코드', '0', 'center', 'str', 'ro', true, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titDeptNm') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('성명', '100', 'center', 'str', 'ro', false, 'empNm', '', '')); /* gf_LocaleTrans('default', 'titEmpNm') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('휴가구분', '150', 'center', 'str', 'ro', false, 'wrycSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titWrycSeCode') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('휴가시작일', '100', 'center', 'str', 'ro', false, 'wrycBeginFromTime', '', '')); /* gf_LocaleTrans('default', 'titWrycBeginTime') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('휴가종료일', '100', 'center', 'str', 'ro', false, 'wrycEndToTime', '', '')); /* gf_LocaleTrans('default', 'titWrycEndTime') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('소요일', '100', 'center', 'int', 'ro', false, 'wrycReqstDaycnt', '', '')); /* gf_LocaleTrans('default', 'titWrycReqstDaycnt') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '*', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titSanctnCodeNm') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('철회여부', '0', 'center', 'na', 'ch', true, 'wthdrawAt', '', '')); /* gf_LocaleTrans('default', 'titWthdrawAt') */
    
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('휴가시작시간', '100', 'center', 'str', 'ro', true, 'wrycFromTime', '', '')); /* gf_LocaleTrans('default', 'titWrycBeginTime') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('휴가종료시간', '100', 'center', 'str', 'ro', true, 'wrycToTime', '', '')); /* gf_LocaleTrans('default', 'titWrycEndTime') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('휴가시작일', '100', 'center', 'str', 'ro', true, 'wrycBeginTime', '', '')); /* gf_LocaleTrans('default', 'titWrycBeginTime') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('휴가종료일', '100', 'center', 'str', 'ro', true, 'wrycEndTime', '', '')); /* gf_LocaleTrans('default', 'titWrycEndTime') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('순번', '100', 'center', 'int', 'ro', true, 'wrycReqstSn', '', '')); /* gf_LocaleTrans('default', 'titWrycReqstSn') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('연차구분코드', '100', 'center', 'str', 'ro', true, 'wrycSeCode', '', '')); /* gf_LocaleTrans('default', 'titWrycSeCode') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('신청사유', '100', 'center', 'str', 'ro', true, 'reqstDtls', '', '')); /* gf_LocaleTrans('default', 'titReqstDtls') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('비상연락처', '100', 'center', 'str', 'ro', true, 'emgncTelno', '', '')); /* gf_LocaleTrans('default', 'titEmgncTelno') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('직무대행자', '100', 'center', 'str', 'ro', true, 'agentEmpno', '', '')); /* gf_LocaleTrans('default', 'titAgentEmpno') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('직무대행자', '100', 'center', 'str', 'ro', true, 'agentEmpNm', '', '')); /* gf_LocaleTrans('default', 'titAgentEmpno') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '100', 'center', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '100', 'center', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 문서 번호', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctDocNo') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드', '100', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 상태 코드', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctSttusCode') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '100', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 사원번호', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctEmpno') */
    dhxGridMhshrd002HeaderInfo.push(gf_MakeDhxGridHeader('등록자', '100', 'center', 'str', 'ro', true, 'regNm', '', '')); /* gf_LocaleTrans('default', 'titRegNm') */
    dhxGridMhshrd002 = gf_MakeDhxGrid('dataListMhshrd002', dhxGridMhshrd002HeaderInfo, true, false, false);
    dhxGridMhshrd002.enableAutoWidth(false);
    dhxGridMhshrd002.setEditable(true);

    dhxGridMhshrd002.setColumnMinWidth(60,10); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    //검색
    gf_ComboCode('divComboSearchWrycSeCode', ':', 'searchWrycSeCode', 'search', 'C281', '' , '', '', 'ordr', '');//휴직구분
    gf_ComboCode('divComboSearchElctsctSttusCode', 'searchElctsctSttusCode', 'searchElctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', '');//결재구분
    //입력
    gf_ComboCode('divComboSaveWrycSeCode', 'wrycSeCode', 'wrycSeCode', 'search', 'C281', '' , 'width:97%', '', 'ordr', '');	//후호봉
	//$('#divComboSaveWrycSeCode').prop('disabled', true);
	//$('#divComboSaveWrycSeCode #wrycSeCode').prop('disabled', true);

};

var eventIdMhshrd002 = [];
var cf_SetEventListenerMhshrd002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrd002 = gf_GridDetachEvent(dhxGridMhshrd002, eventIdMhshrd002);
    eventId = dhxGridMhshrd002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrd002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrd002.getColumnsNum();
            var rowNum = dhxGridMhshrd002.getRowsNum();
            var selectedId = dhxGridMhshrd002.getSelectedRowId();
            var ind        = dhxGridMhshrd002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd002.getRowIndex(selectedId);
            var type       = dhxGridMhshrd002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrd002.selectRow(0);
                    //fn_FindMhshrd002();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrd002.selectRow(rowIndex + 1);
                    fn_FindMhshrd002();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrd002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrd002.getSelectedRowId();
            var ind        = dhxGridMhshrd002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd002.getRowIndex(selectedId);
            var type       = dhxGridMhshrd002.getColType(ind);
            dhxGridMhshrd002.selectCell(rowIndex+1, ind);
            fn_FindMhshrd002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrd002.getSelectedRowId();
            var ind        = dhxGridMhshrd002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd002.getRowIndex(selectedId);
            var type       = dhxGridMhshrd002.getColType(ind);
            dhxGridMhshrd002.selectCell(rowIndex-1, ind);
            fn_FindMhshrd002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd002.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrd002.push(eventId);
    eventId = dhxGridMhshrd002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrd002SortGridList(ind, type, direction); 
    });
    eventIdMhshrd002.push(eventId);
    eventId = dhxGridMhshrd002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrd002.push(eventId);
    eventId = dhxGridMhshrd002.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhshrd002();
    });
    eventIdMhshrd002.push(eventId);
    eventId = dhxGridMhshrd002.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhshrd002.push(eventId);
    eventId = dhxGridMhshrd002.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMhshrd002, 'wthdrawAt')) { return false; } 	
		return true;		
	});
    eventIdMhshrd002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrd002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrd002()
    });
    $('#btnSaveMhshrd002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrd002();
    });
    $('#btnRemoveMhshrd002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrd002();
    });
    $('#btnExcelMhshrd002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrd002();
    });
    $('#btnSearchMhshrd002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrd002('');
    });
    $('#btnResetMhshrd002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrd002();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrd002').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrd002, $('#checkAllMhshrd002').prop('checked'), 'chk');
    });
    $('#searchFormMhshrd002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) {
        	if(this.id == "agentEmpNmSaveFormMhshrd002"){
        		return fn_SearchEmpCode("1");
            } else {
        	return gf_saveForm_NextEle("saveFormMhshra001",this); 
            }}
        else return true; 
    }); 
    $('#saveFormMhshrd002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //검색 달력
    $('#searchFormMhshrd002 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
	//신청일자 달력
    $('#searchFormMhshrd002 #searchApplyTime').unbind('click').bind('click', function(event){
    	searchApplyCalendar.show();
    });
	//휴가기간 달력
    $('#searchFormMhshrd002 #searchWryTime').unbind('click').bind('click', function(event){
    	searchWryCalender.show();
    });
    //휴가기간 입력 달력
    $('#saveFormMhshrd002 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    //직무 대행자 검색
    $('#saveFormMhshrd002 #btnAgentEmpCodeSave').unbind('click').bind('click', function(event){
		gf_EmpPopup("saveFormMhshrd002","agentEmpnoSaveFormMhshrd002","agentEmpNmSaveFormMhshrd002", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	$('#agentEmpnoSaveFormMhshrd002').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#agentEmpNmSaveFormMhshrd002').focus();
	    }
    });
	$('#agentEmpNmSaveFormMhshrd002').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrd002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhshrd002",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrd002 input[name="reqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'reqstDe', $(this).val());
    });
    $('#saveFormMhshrd002 input[name="empNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'empNm', $(this).val());
    });
    $('#saveFormMhshrd002 input[name="deptNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'deptNm', $(this).val());
    });
    $('#saveFormMhshrd002 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'empno', $(this).val());
    });
    $('#saveFormMhshrd002 select[name="wrycSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycSeCode', $(this).val());
        if($(this).val() == '' || $(this).val() == null){
        	gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycSeCodeNm', '');
        } else {
        	gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycSeCodeNm', $("#saveFormMhshrd002 select[name='wrycSeCode'] option:selected").text());
        }
        //fn_CheckTime($(this).val());
    });
    $('#saveFormMhshrd002 input[name="wrycBeginTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var endTime = (gf_FormGetValue('saveFormMhshrd002', 'wrycEndTime', 'text')).replaceAll('-','');
        var beginTime = $(this).val().replaceAll('-','');
        var toTime = gf_FormGetValue('saveFormMhshrd002', 'wrycToTime', 'combo');
        var fromTime = gf_FormGetValue('saveFormMhshrd002', 'wrycFromTime', 'combo');
        if(!gf_IsNull(endTime)){
        	if(endTime < beginTime){
                gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycBeginFromTime', $(this).val());
        	} else gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycBeginFromTime', $(this).val());
        } else gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycBeginFromTime', $(this).val());
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycBeginTime', $(this).val());
        //deCount();
    });
    $('#saveFormMhshrd002 input[name="wrycEndTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var beginTime = (gf_FormGetValue('saveFormMhshrd002', 'wrycBeginTime', 'text')).replaceAll('-','');
        var endTime = $(this).val().replaceAll('-','');
        var toTime = gf_FormGetValue('saveFormMhshrd002', 'wrycToTime', 'combo');
        var fromTime = gf_FormGetValue('saveFormMhshrd002', 'wrycFromTime', 'combo');
        if(!gf_IsNull(beginTime)){
        	if(endTime < beginTime){
                gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycEndToTime', $(this).val());
        	} else gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycEndToTime', $(this).val());
        } else gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycEndToTime', $(this).val());
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycEndTime', $(this).val());
        //deCount();
    });
    $('#saveFormMhshrd002 select[name="wrycFromTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var toTime = gf_FormGetValue('saveFormMhshrd002', 'wrycToTime', 'combo');
        var fromTime = $(this).val();
        var beginTime = gf_FormGetValue('saveFormMhshrd002', 'wrycBeginTime', 'text');
        var endTime = gf_FormGetValue('saveFormMhshrd002', 'wrycEndTime', 'text');
        if(!gf_IsNull(toTime)){
        	if(toTime < fromTime){
        		//gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycBeginFromTime', beginTime+' / '+fromTime+'시11');
				gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycBeginFromTime', beginTime);
        	} else gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycBeginFromTime', beginTime);
        } else gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycBeginFromTime', beginTime);
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycFromTime', $(this).val());
        //deCount();
    });
    $('#saveFormMhshrd002 select[name="wrycToTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var fromTime = gf_FormGetValue('saveFormMhshrd002', 'wrycFromTime', 'combo');
        var toTime = $(this).val();
        var beginTime = gf_FormGetValue('saveFormMhshrd002', 'wrycBeginTime', 'text');
        var endTime = gf_FormGetValue('saveFormMhshrd002', 'wrycEndTime', 'text');
        if(!gf_IsNull(fromTime)){
        	if(toTime < fromTime){
        		gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycEndToTime', endTime);
        	} else gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycEndToTime', endTime);
        } else gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycEndToTime', endTime);
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycToTime', $(this).val());
        //deCount();
    });
    $('#saveFormMhshrd002 input[name="emgncTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'emgncTelno', $(this).val());
    });
    $('#saveFormMhshrd002 input[name="reqstDtls"]').unbind('change blur').bind('change blur',function() {
		gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'reqstDtls', $(this).val());
    });
    $('#saveFormMhshrd002 input[name="agentEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'agentEmpno', $(this).val());
    });
//    $('#saveFormMhshrd002 input[name="wrycReqstDaycnt"]').unbind('change blur').bind('change blur',function() {
//    	gf_errorMsgClear();
//    	gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycReqstDaycnt', $(this).val());
//    });
//    $('#saveFormMhshrd002 input[name="wrycReqstSn"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycReqstSn', $(this).val());
//    });
//    $('#saveFormMhshrd002 input[name="sanctnNo"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'sanctnNo', $(this).val());
//    });
//    $('#saveFormMhshrd002 input[name="wthdrawSanctnNo"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wthdrawSanctnNo', $(this).val());
//    });
//    $('#saveFormMhshrd002 input[name="wthdrawAt"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wthdrawAt', $(this).val());
//    });
//    $('#saveFormMhshrd002 input[name="sanctnCode"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'sanctnCode', $(this).val());
//    });
//    $('#saveFormMhshrd002 input[name="wthdrawSanctnCode"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wthdrawSanctnCode', $(this).val());
//    });

    // 팝업 ===================================================================================================
    $('#saveFormMhshrd002 #btnAltHvofDeSearchPopup').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var empno = gf_FormGetValue('saveFormMhshrd002', 'empno', 'text');
        var empnm = gf_FormGetValue('saveFormMhshrd002', 'empNm', 'text');
        var beginYear = gf_FormGetValue('saveFormMhshrd002', 'wrycBeginTime', 'text');
        var param = "empno=" + empno + "&empnm=" + empnm + "&beginYear=" + beginYear;
        fn_AltHvofDePopup('', '' , '' , param);
    });
    $('#saveFormMhshrd002 #btnRewardHvofDeSearchPopup').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var empno = gf_FormGetValue('saveFormMhshrd002', 'empno', 'text');
        var empnm = gf_FormGetValue('saveFormMhshrd002', 'empNm', 'text');
        var beginYear = gf_FormGetValue('saveFormMhshrd002', 'wrycBeginTime', 'text');
        var param = "empno=" + empno + "&empnm=" + empnm + "&beginYear=" + beginYear;
        fn_RewardHvofDePopup('' , '' , '' , param);
    });
    // 폼 이벤트 end ============================================================================================
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
    
};

var cf_InitFormMhshrd002 = function() {
    $('#searchFormMhshrd002').resetForm();
    
    //검색달력 초기화(신청일자)
	$('input[name=searchApplyBeginTime]').val( (new Date()).format('YYYY-01-01') );
	$('input[name=searchApplyEndTime]').val( (new Date()).format('YYYY-MM-30') );
	searchApplyCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrd002', 'searchApplyBeginTime', 'text'));
	searchApplyCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrd002', 'searchApplyEndTime', 'text'));
	
	//검색달력 초기화(휴가일자)
	$('input[name=searchWryBeginTime]').val( (new Date()).format('YYYY-01-01') );
	$('input[name=searchWryEndTime]').val( (new Date()).format('YYYY-MM-30') );
	searchWryCalender.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrd002', 'searchWryBeginTime', 'text'));
	searchWryCalender.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrd002', 'searchWryEndTime', 'text'));

	//검색 사원 초기화
	gf_FormSetValue("searchFormMhshrd002", "searchEmpNo", userno, '');
	gf_FormSetValue("searchFormMhshrd002", "searchEmpCodeNm", userNm, '');
	gf_FormSetValue("searchFormMhshrd002", "searchDeptNm", userDeptNm, '');
	gf_FormSetValue("searchFormMhshrd002", "searchDeptNo", userDeptNo, '');

};

var cf_SetBindingMhshrd002 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhshrd002('');
	//fn_SearchWrycDaycntMhshrd002();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 연차사용일수 조회
 */
var fn_SearchWrycDaycntMhshrd002 = function() {
	var searchEmpNo = gf_FormGetValue('searchFormMhshrd002', 'searchEmpNo', 'text');

	if(searchEmpNo == ""){
		
	}else{
		var jsonParameter = {
			//userno : userno
			empno : gf_FormGetValue('searchFormMhshrd002', 'searchEmpNo', 'text')
		};
	var dataSource = gf_NoAsyncTransaction('mhshrd002/SearchWrycDaycntMhshrd002', jsonParameter, 'GET');
    var data = dataSource.data;
    console.log(data);
	//$('#userNmSaveFormMhshrd002').val(data.userNm);
	//$('#userCodeSaveFormMhshrd002').val(data.daycntEmpno);
	//$('#userDeptNmSaveFormMhshrd002').val(data.userDeptNm);
	//$('#userDeptNoSaveFormMhshrd002').val(data.userDeptNo);
	
	gf_FormSetValue("saveUserFormMhshrd002", "wrycDaycnt", data.wrycDaycnt, '');
	gf_FormSetValue("saveUserFormMhshrd002", "usingDaycnt", data.usingDaycnt, '');
	gf_FormSetValue("saveUserFormMhshrd002", "remainderDaycnt", data.remainderDaycnt, '');
	
	/*gf_FormSetValue("searchFormMhshrd002", "searchEmpNo", userno, '');
	gf_FormSetValue("searchFormMhshrd002", "searchEmpCodeNm", userNm, '');
	gf_FormSetValue("searchFormMhshrd002", "searchDeptNm", userDeptNm, '');
	gf_FormSetValue("searchFormMhshrd002", "searchDeptNo", userDeptNo, '');*/
	
	wrycSeCodeList = gf_NoAsyncTransaction('mhshrd002/WrycTime', jsonParameter, 'GET');
	var rId = dhxGridMhshrd002.getSelectedRowId();
	var userNm = gf_DhxGetValue(dhxGridMhshrd002, rId, 'empNm',  'grid');  
	var userData = userNm + "님의 현재 휴가 사용현황";
	 $('#userLayoff').html(userData);
	}

	

}
/**
 * 대체휴무 조회 팝업
 */
var fn_AltHvofDePopup = function(formId , codeId , codeNmId , param){
	var userId = ""; 
	var title  = "대체휴무조회";
	//저장팝업
	var dhxWindowObj;
	var altHvofDePop;
	if($('body').find("div[id='altHvofDePop']").size() <= 0) {
		$('body').append("<div id='altHvofDePop' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#altHvofDePop').bPopup({
		onOpen:function(){
			
			altHvofDePop = new dhtmlXWindows();
			var id 		= 'altHvofDePop';
			var ajaxUrl = gv_ContextPath+'/mhshrd002/popup/altHvofDePopup/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 500;
			
			dhxWindowObj = altHvofDePop.createWindow(id, left, top, width, height);
			altHvofDePop.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#altHvofDePop .b-close').click();
			});
		},
		onClose:function(){
			altHvofDePop.unload();
			$('body').find("div[id='altHvofDePop']").remove();			
		}
	},function(){});
	return dhxWindowObj;	
}
/**
 * 보상휴무 조회 팝업
 */
var fn_RewardHvofDePopup = function(formId , codeId , codeNmId , param){
	var userId = ""; 
	var title  = "보상휴무조회";
	//저장팝업
	var dhxWindowObj;
	var altHvofDePop;
	if($('body').find("div[id='rewardHvofDePop']").size() <= 0) {
		$('body').append("<div id='rewardHvofDePop' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#rewardHvofDePop').bPopup({
		onOpen:function(){
			
			rewardHvofDePop = new dhtmlXWindows();
			var id 		= 'altHvofDePop';
			var ajaxUrl = gv_ContextPath+'/mhshrd002/popup/rewardHvofDePopup/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 500;
			
			dhxWindowObj = rewardHvofDePop.createWindow(id, left, top, width, height);
			rewardHvofDePop.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#rewardHvofDePop .b-close').click();
			});
		},
		onClose:function(){
			rewardHvofDePop.unload();
			$('body').find("div[id='rewardHvofDePop']").remove();			
		}
	},function(){});
	return dhxWindowObj;	
}
/**
 * 조회
 */
var fn_SearchMhshrd002 = function(userId) {
    var jsonParameter = {
    		wrycSeCode : gf_FormGetValue('searchFormMhshrd002', 'searchWrycSeCode', 'combo'),
    		elctsctSttusCode : gf_FormGetValue('searchFormMhshrd002', 'searchElctsctSttusCode', 'combo'),
        	empno : gf_FormGetValue('searchFormMhshrd002', 'searchEmpNo', 'text'),
        	empNm : gf_FormGetValue('searchFormMhshrd002', 'searchEmpCodeNm', 'text'),
        	applyBeginTime : gf_FormGetValue('searchFormMhshrd002', 'searchApplyBeginTime', 'text'),
        	applyEndTime : gf_FormGetValue('searchFormMhshrd002', 'searchApplyEndTime', 'text'),
        	wrycBeginTime : gf_FormGetValue('searchFormMhshrd002', 'searchWryBeginTime', 'text'),
        	wrycEndTime : gf_FormGetValue('searchFormMhshrd002', 'searchWryEndTime', 'text')
        };
    gf_Transaction(userId, 'mhshrd002/searchMhshrd002', jsonParameter, 'fn_CallbackSearchMhshrd002', false, 'GET');
};

var dhxDataProcessorMhshrd002;
var fn_CallbackSearchMhshrd002 = function(strSvcID, targetID, data) {
    dhxGridMhshrd002.clearAll();
    fn_DhxDataProcessorMhshrd002(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhshrd002');
        dhxGridMhshrd002.parse(data.data.records, 'js');
 
        if(save_Row_Num_Mhshrd002 == 0 && save_All_Sta_Mhshrd002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMhshrd002.selectRow(0); 
        } else if(save_Row_Sta_Mhshrd002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMhshrd002.selectRow(0);
        } else if(save_All_Sta_Mhshrd002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMhshrd002.selectRow(save_Row_Num_Mhshrd002); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMhshrd002.selectRow(save_Row_Num_Mhshrd002);   //개발자 수정 필요  
            //var findCell = dhxGridMhshrd002.findCell(save_Row_Ids_Mhshrd002, gf_GetDhxGridColumId(dhxGridMhshrd002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMhshrd002.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMhshrd002.selectRow(0);
            //} 
        } 
 
        fn_FindMhshrd002();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhshrd002');
        fn_InitInputFormMhshrd002();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMhshrd002").text(data.data.records.length);
    cf_SetEventListenerMhshrd002();
};
var fn_DhxDataProcessorMhshrd002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrd002 = new dataProcessor(gv_ContextPath+'/mhshrd002/saveMhshrd002'); //lock feed url
    dhxDataProcessorMhshrd002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrd002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrd002.init(dhxGridMhshrd002); //link dataprocessor to the grid
    dhxDataProcessorMhshrd002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrd002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrd002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrd002();
                    $("#checkAllMhshrd002").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhshrd002 = function() {
    var rId = dhxGridMhshrd002.getSelectedRowId();
    var status = dhxDataProcessorMhshrd002.getState(rId);

    fn_FormDisabled(false);
	/*gf_FormSetValue("searchFormMhshrd002", "searchEmpNo", gf_DhxGetValue(dhxGridMhshrd002, rId, 'empno',  'grid'), '');
    gf_FormSetValue("searchFormMhshrd002", "searchEmpCodeNm", gf_DhxGetValue(dhxGridMhshrd002, rId, 'empNm',  'grid'), '');
    gf_FormSetValue("searchFormMhshrd002", "searchDeptNm", gf_DhxGetValue(dhxGridMhshrd002, rId, 'deptNm',  'grid'), '');
	gf_FormSetValue("searchFormMhshrd002", "searchDeptNo", gf_DhxGetValue(dhxGridMhshrd002, rId, 'deptCode',  'grid'), '');*/
    gf_FormSetValue("saveFormMhshrd002", "empno", gf_DhxGetValue(dhxGridMhshrd002, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "empNm", gf_DhxGetValue(dhxGridMhshrd002, rId, 'empNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "deptNm", gf_DhxGetValue(dhxGridMhshrd002, rId, 'deptNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "wrycReqstSn", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycReqstSn',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "wrycSeCode", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrd002", "reqstDe", gf_DhxGetValue(dhxGridMhshrd002, rId, 'reqstDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "reqstDtls", gf_DhxGetValue(dhxGridMhshrd002, rId, 'reqstDtls',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "wrycReqstDaycnt", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycReqstDaycnt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "emgncTelno", gf_DhxGetValue(dhxGridMhshrd002, rId, 'emgncTelno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "wrycBeginTime", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycBeginTime',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "wrycEndTime", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycEndTime',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "wrycFromTime", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycFromTime',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrd002", "wrycToTime", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycToTime',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrd002", "agentEmpno", gf_DhxGetValue(dhxGridMhshrd002, rId, 'agentEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "agentEmpNm", gf_DhxGetValue(dhxGridMhshrd002, rId, 'agentEmpNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "wthdrawAt", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wthdrawAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "elctsctSttusCodeNm", gf_DhxGetValue(dhxGridMhshrd002, rId, 'elctsctSttusCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd002", "wthdrawAt", (( gf_DhxGetValue(dhxGridMhshrd002, rId, 'wthdrawAt',  'grid')  == '1') ? '철회' : ' '),  '');
    
    gf_FormSetValue("saveFormMhshrd002", "regNm", gf_DhxGetValue(dhxGridMhshrd002, rId, 'regNm',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormMhshrd002 input[name="empno"]').prop('disabled', false);
        $('#saveFormMhshrd002 input[name="wrycReqstSn"]').prop('disabled', false);
    } else {
        $('#saveFormMhshrd002 input[name="empno"]').prop('disabled', true);
        $('#saveFormMhshrd002 input[name="wrycReqstSn"]').prop('disabled', true);
    }
    
    //fn_CheckTime(gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycSeCode',  'grid'));
    //deCount();
    
    if(!gf_IsNull(gf_DhxGetValue(dhxGridMhshrd002, rId, 'elctsctDocNo',  'grid'))){
    	$('#saveFormMhshrd002 *').prop('disabled', true);
    }

    $('#saveFormMhshrd002 input[name="wthdrawAt"]').prop('readonly', true);
	
	//$("#wrycSeCode").prop("disabled",true);
	//$("#wrycBeginTimeSaveFormMhshrd002").prop("disabled",true);
	//$("#wrycEndTimeSaveFormMhshrd002").prop("disabled",true);
	
	fn_SearchWrycDaycntMhshrd002();
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrd002 = function() {
    $('#saveFormMhshrd002 input[name="wrycReqstSn"]').prop('disabled', false);
    $('#saveFormMhshrd002').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
	$('#saveFormMhshrd002 *').attr("autocomplete" , "off");
	
	$('#saveFormMhshrd002 *').prop('disabled', status);
    $('#saveFormMhshrd002 #wthdrawAtSaveFormMhshrd002').prop('disabled', true);
};
/**
 * 추가(신규) 
 */
/*var fn_AddMhshrd002 = function() {
    dhxGridMhshrd002.clearSelection();
    fn_InitInputFormMhshrd002();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(new Date().format('YYYY-MM-DD')); //reqstDe : 신청일자
    initValueArr.push(userDeptNm); //deptNm : 부서명
    initValueArr.push(userNm); //empNm : 성명
    initValueArr.push(''); //wrycSeCodeNm : 휴가구분 코드명
    initValueArr.push(new Date().format('YYYY-MM-DD')); //wrycBeginTime : 휴가시작일
    initValueArr.push(new Date().format('YYYY-MM-DD')); //wrycEndTime : 휴가종료일
    initValueArr.push('1일'); //wrycReqstDaycnt : 소요일
    initValueArr.push(''); //sanctnCodeNm : 결재
    initValueArr.push(''); //wthdrawAt : 철회여부
    initValueArr.push('00'); //wrycFromTime : 휴가시작시간
    initValueArr.push('00'); //wrycToTime : 휴가종료시간
    initValueArr.push(new Date().format('YYYY-MM-DD')); //wrycBeginTime : 휴가시작일
    initValueArr.push(new Date().format('YYYY-MM-DD')); //wrycEndTime : 휴가종료일
    initValueArr.push(userno); //empno : 사번
    initValueArr.push(''); //wrycReqstSn : 순번
    initValueArr.push(''); //wrycSeCode : 휴가구분 코드
    initValueArr.push(''); //reqstDtls : 신청 사유
    initValueArr.push(''); //emgncTelno : 비상연락처
    initValueArr.push(''); //agentEmpno : 직무대행자
    initValueArr.push(''); //agentEmpnm : 직무대행자
    initValueArr.push(''); //elctsctSeSn : 전자결재구분순번
    initValueArr.push(''); //elctsctDocNo : 전자결재문서번호
    initValueArr.push(''); //wthdrawElctsctDocNo : 철회 전자결재문서번호
    initValueArr.push(''); //elctsctSttusCode : 전자결재상태코드
    initValueArr.push(''); //wthdrawElctsctSttusCode : 철회 전자결재상태코드
    initValueArr.push(''); //elctsctEmpno
    initValueArr.push(''); //wthdrawElctsctEmpno
    initValueArr.push(''); //regNm
    
    dhxGridMhshrd002.addRow(dhxGridMhshrd002.uid(), initValueArr, 0);
    dhxGridMhshrd002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrd002');
    $('#btnPopEmpSearchMhshrd002').show();
    fn_FormDisabled(false);
    gf_FormSetValue("saveFormMhshrd002", "reqstDe", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormMhshrd002", "regNm", userNm, '');
    gf_FormSetValue("saveFormMhshrd002", "userCode", userno, '');
    gf_FormSetValue("saveFormMhshrd002", "empNm", userNm, '');
    gf_FormSetValue("saveFormMhshrd002", "deptNm", userDeptNm, '');
    gf_FormSetValue("saveFormMhshrd002", "empno", userno, '');
    gf_FormSetValue("saveFormMhshrd002", "wrycBeginTime", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormMhshrd002", "wrycEndTime", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormMhshrd002", "wrycSeCode", '', 'combo');
}*/
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrd002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrd002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrd002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrd002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrd002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrd002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrd002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrd002', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrd002.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrd002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrd002', 'sortColumId', '', 'text'); 
            dhxGridMhshrd002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrd002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrd002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrd002', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrd002 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrd002 = 0; 
    save_Edt_Cnt_Mhshrd002 = 0; 
    save_Del_Cnt_Mhshrd002 = 0; 
    dhxGridMhshrd002.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrd002.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrd002.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrd002 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrd002 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrd002 += 1; 
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
        save_All_Sta_Mhshrd002 = 0; 
        if(save_Add_Cnt_Mhshrd002 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrd002 + "건";
            save_All_Sta_Mhshrd002 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrd002 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrd002 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrd002 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrd002 + "건"; 
            save_All_Sta_Mhshrd002 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrd002(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrd002(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrd002 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrd002_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrd002_Send = function() {
    if(fn_GridValidation(dhxGridMhshrd002, dhxDataProcessorMhshrd002)) {
        dhxDataProcessorMhshrd002.sendData();
    }
}
/**
 * 삭제
 */
/*var fn_RemoveMhshrd002 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrd002, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrd002.forEachRow(function(rowId) {
            state = dhxDataProcessorMhshrd002.getState(rowId);
            if(dhxGridMhshrd002.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrd002, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrd002.getRowIndex(rowId);
                    dhxGridMhshrd002.deleteRow(rowId);
                    dhxGridMhshrd002.selectRow(rowNum);
                    fn_FindMhshrd002();
                }
                else dhxDataProcessorMhshrd002.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}*/
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrd002 = function () {
    var titMhshrd002 = '휴가신청관리'; /* gf_LocaleTrans('default', 'titMhshrd002') */
    var jsonParameter = {
		wrycSeCode : gf_FormGetValue('searchFormMhshrd002', 'searchWrycSeCode', 'combo'),
    	elctsctSttusCode : gf_FormGetValue('searchFormMhshrd002', 'searchElctsctSttusCode', 'combo'),
        empno : gf_FormGetValue('searchFormMhshrd002', 'searchEmpNo', 'text'),
        empNm : gf_FormGetValue('searchFormMhshrd002', 'searchEmpCodeNm', 'text'),
        applyBeginTime : gf_FormGetValue('searchFormMhshrd002', 'searchApplyBeginTime', 'text'),
        applyEndTime : gf_FormGetValue('searchFormMhshrd002', 'searchApplyEndTime', 'text'),
        wrycBeginTime : gf_FormGetValue('searchFormMhshrd002', 'searchWryBeginTime', 'text'),
        wrycEndTime : gf_FormGetValue('searchFormMhshrd002', 'searchWryEndTime', 'text')
    };
    var header = [[	
        '신청일자'
        ,'부서명'
        ,'성명'
        ,'휴가구분' 
        ,'휴가시작일' 
        ,'휴가종료일' 
        ,'소요일(휴가일수, 반차인 경우는 0.5)' 
        ,'결재상태' 
    ]];
    var dataId = [[ 'reqstDe', 'deptNm', 'empNm', 'wrycSeCode', 'wrycBeginFromTime', 'wrycEndToTime', 'wrycReqstDaycnt', 'elctsctSttusCodeNm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrd002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrd002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrd002/excelMhshrd002', jsonParameter);
};
/**
 *  달력
 */
$(document).click(function(e){ //문서 body를 클릭했을때
    if(e.target.id =="searchTime_cal" || e.target.id =="searchApplyBeginTimeMhshrd002" || e.target.id =="searchApplyEndTimeMhshrd002") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchApplyCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
$(document).click(function(e){ //문서 body를 클릭했을때
    if(e.target.id =="searchWryTime_cal" || e.target.id =="searchWryBeginTimeMhshrd002" || e.target.id =="searchWryEndTimeMhshrd002") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchWryCalender.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
function fn_Calender() {
	//신청일자
	searchApplyCalendar = new dhtmlXDoubleCalendar("searchTime_cal");
    searchApplyCalendar.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchApplyBeginTimeMhshrd002').val(dateFormat(searchApplyCalendar.leftCalendar.getDate()));
        	$('#searchApplyEndTimeMhshrd002').val(dateFormat(searchApplyCalendar.rightCalendar.getDate()));
        	searchApplyCalendar.hide();
        }
    });
	//금일 날짜표시
	$('input[name=searchApplyBeginTime]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchApplyEndTime]').val( (new Date()).format('YYYY-MM-30') );
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchApplyCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrd002', 'searchApplyBeginTime', 'text'));
	searchApplyCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrd002', 'searchApplyEndTime', 'text'));	
	searchApplyCalendar.leftCalendar.loadUserLanguage("ko");
	searchApplyCalendar.rightCalendar.loadUserLanguage("ko");
	
	//휴가기간
	searchWryCalender = new dhtmlXDoubleCalendar("searchWryTime_cal");
    searchWryCalender.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchWryBeginTimeMhshrd002').val(dateFormat(searchWryCalender.leftCalendar.getDate()));
        	$('#searchWryEndTimeMhshrd002').val(dateFormat(searchWryCalender.rightCalendar.getDate()));
        	searchWryCalender.hide();
        }
    });
	//금일 날짜표시
	$('input[name=searchWryBeginTime]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchWryEndTime]').val( (new Date()).format('YYYY-MM-30') );
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchWryCalender.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrd002', 'searchWryBeginTime', 'text'));
	searchWryCalender.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrd002', 'searchWryEndTime', 'text'));	
	searchWryCalender.leftCalendar.loadUserLanguage("ko");
	searchWryCalender.rightCalendar.loadUserLanguage("ko");
}
function fn_SingleCalender(){
	//휴가 시작달력
	var wrycBeginCalendar = new dhtmlXCalendarObject({input:"wrycBeginTimeSaveFormMhshrd002", button:"startDateIcon"});
	wrycBeginCalendar.loadUserLanguage("ko");
	wrycBeginCalendar.hideTime();
	
	//금일 날짜표시
	$('#wrycBeginTimeSaveFormMhshrd002').val(nowDate);
	
	//휴가종료달력
	var wrycEndCalendar = new dhtmlXCalendarObject({input:"wrycEndTimeSaveFormMhshrd002", button:"startDateIcon"});
	wrycEndCalendar.loadUserLanguage("ko");
	wrycEndCalendar.hideTime();
	
	//금일 날짜표시
	$('#wrycEndTimeSaveFormMhshrd002').val(nowDate);
	
	wrycBeginCalendar.attachEvent("onClick" , function(){
        var tmp = gf_FormGetValue('saveFormMhshrd002', 'wrycBeginTime', 'text');
        var Sdate = new Date(tmp);
        Sdate.setDate(Sdate.getDate() - 1);
        wrycEndCalendar.setInsensitiveRange(null , Sdate);    
	});
	wrycEndCalendar.attachEvent("onClick" , function(){
        var tmp = gf_FormGetValue('saveFormMhshrd002', 'wrycEndTime', 'text');
        var Edate = new Date(tmp);
        Edate.setDate(Edate.getDate() + 1);
        wrycBeginCalendar.setInsensitiveRange(Edate , null);    
	});	
}
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


/**
 * 사원 검색
 */
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('saveFormMhshrd002', 'agentEmpno', 'text');
		korNm = gf_FormGetValue('saveFormMhshrd002', 'agentEmpNm', 'text');
	}
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : gBplcCode
	};
	gf_Transaction(gubun, 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	if(strSvcID == "1"){
	 		gf_FormSetValue('saveFormMhshrd002', 'agentEmpno', data.empno, 'text');
	 		gf_FormSetValue('saveFormMhshrd002', 'agentEmpNm', data.korNm, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("saveFormMhshrd002","agentEmpno","agentEmpNm", gBplcCode, "Y");
	  	} else {
	  		gf_Emp2Popup("saveAgentEmpMhshrd002","agentEmpCode","agentEmpNm", gBplcCode, "Y");
	  	}
  	}
}
function fn_CallbackPopEmp(data){
	console.log(data.empno + " : " + data.korNm);
}
/**
 * 휴가 시간, 일 단위 구분
 */
/*function fn_CheckTime(code) {
    var rId = dhxGridMhshrd002.getSelectedRowId();
	
	wrycSeCodeList.data.records.forEach(function(item){
		if(item.code == code){
			if(item.refer1Dc == "T"){
				checkTime = 'T';
			} else {
				checkTime = 'D';
			}
		}
	});
    if(checkTime == 'D'){
        gf_FormSetValue("saveFormMhshrd002", "wrycFromTime", '00', 'combo');
        gf_FormSetValue("saveFormMhshrd002", "wrycToTime", '00', 'combo');
    	$('#saveFormMhshrd002 select[name="wrycFromTime"]').prop('disabled', true);
    	$('#saveFormMhshrd002 select[name="wrycToTime"]').prop('disabled', true);
    	$('#saveFormMhshrd002 input[name="wrycEndTime"]').prop('disabled', false);
    } else {
        gf_FormSetValue("saveFormMhshrd002", "wrycEndTime", gf_DhxGetValue(dhxGridMhshrd002, rId, 'wrycBeginTime',  'grid'), '');
    	$('#saveFormMhshrd002 input[name="wrycEndTime"]').prop('disabled', true);
    	$('#saveFormMhshrd002 select[name="wrycFromTime"]').prop('disabled', false);
    	$('#saveFormMhshrd002 select[name="wrycToTime"]').prop('disabled', false);
    	gf_FormSetValue('saveFormMhshrd002', 'wrycReqstDaycnt', '0.5일');
    }
}*/
/*function deCount(){
    var sdd = gf_FormGetValue('saveFormMhshrd002', 'wrycBeginTime', 'text');
    var edd = gf_FormGetValue('saveFormMhshrd002', 'wrycEndTime', 'text');
    var ar1 = sdd.split('-');
    var ar2 = edd.split('-');
    var da1 = new Date(ar1[0], ar1[1], ar1[2]);
    var da2 = new Date(ar2[0], ar2[1], ar2[2]);
    var dif = da2 - da1;
    var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
    var cMonth = cDay * 30;// 월 만듬
    var code = gf_FormGetValue('saveFormMhshrd002', 'wrycSeCode', 'combo');
    wrycSeCodeList.data.records.forEach(function(item){
		if(item.code == code){
			if(item.refer1Dc == "T"){
				checkTime = 'T';
			} else {
				checkTime = 'D';
			}
		}
	});
    var getDayCnt = gf_FormGetValue('saveFormMhshrd002', 'wrycReqstDaycnt', 'text');
    var dayCnt = (parseInt(dif/cDay)+1)+'일';
    if(getDayCnt != dayCnt && getDayCnt != '0.5일'){
    	if(sdd && edd){
        	if(checkTime == 'D'){
        		gf_errorMsgClear();
        		gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycReqstDaycnt', (parseInt(dif/cDay)+1)+'일');
        	} else {
        		gf_errorMsgClear();
        		gf_DhxGridCellMapping(dhxGridMhshrd002, dhxDataProcessorMhshrd002, 'wrycReqstDaycnt', '0.5일');
        	}
        }
    }
    
}*/
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormMhshrd002 #empnoSaveFormMhshrd002').parent().append(
    '<div class="error" id="empnoSaveFormMhshrd002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshrd002 #wrycReqstSnSaveFormMhshrd002').parent().append(
    '<div class="error" id="wrycReqstSnSaveFormMhshrd002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrd002 = function(empno, wrycReqstSn){
    if(!gf_IsNull(empno) && !gf_IsNull(wrycReqstSn)) {
        var jsonParameter = {
            empno : empno,
            wrycReqstSn : wrycReqstSn
        };
        var dataSource = gf_NoAsyncTransaction('mhshrd002/findMhshrd002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.wrycReqstSn)) {
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
    var state = dhxDataProcessorMhshrd002.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshrd002').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormMhshrd002', 'empno', 'text');
                    var wrycReqstSn = gf_FormGetValue('saveFormMhshrd002', 'wrycReqstSn', 'text');
                    if(fn_CheckDupMhshrd002(empno, wrycReqstSn)) return true;
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
    var checkWrycReqstSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrd002 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshrd002 == 'deleted') {
        save_Row_Num_Mhshrd002 = 0;
        save_Row_Ids_Mhshrd002 = "";
    } else if(save_Row_Sta_Mhshrd002 == 'inserted') {
        save_Row_Num_Mhshrd002 = rowNum;
        save_Row_Ids_Mhshrd002 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrd002 = rowNum;
        save_Row_Ids_Mhshrd002 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'reqstDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstDe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'wrycSeCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycSeCodeNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'wrycBeginTime', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycBeginTime');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'wrycEndTime', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycEndTime');
                    valid = false;
                }
                if(gf_DhxGetValue(dhxGridObjet, rowId, 'wrycEndTime', 'grid').replaceAll('-','') < gf_DhxGetValue(dhxGridObjet, rowId, 'wrycBeginTime', 'grid').replaceAll('-','')){
                	fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycBeginFromTime');
                	fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycEndToTime');
                    valid = false;
                }
                if(gf_DhxGetValue(dhxGridObjet, rowId, 'wrycToTime', 'grid') < gf_DhxGetValue(dhxGridObjet, rowId, 'wrycFromTime', 'grid')){
                	fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycBeginFromTime');
                	fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycEndToTime');
                    valid = false;
                }
                gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkWrycReqstSn = gf_DhxGetValue(dhxGridObjet, rowId, 'wrycReqstSn', 'grid');
                    if(!gf_IsNull(checkEmpno, checkWrycReqstSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var wrycReqstSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'wrycReqstSn', 'grid');
                            if(((empno == checkEmpno) && (wrycReqstSn == checkWrycReqstSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycReqstSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrd002( checkEmpno, checkWrycReqstSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'wrycReqstSn');
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
        dhxGridMhshrd002.selectRowById(validFalseFistRowId);
        fn_FindMhshrd002();
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
