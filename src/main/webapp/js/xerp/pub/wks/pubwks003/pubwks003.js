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
var save_Row_Num_Pubwks003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwks003 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwks003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwks003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwks003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwks003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwks003 = 0;  //그리드 삭제 수량 
 
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
    cf_InitParamPubwks003();
    cf_SetComponentsPubwks003();
    cf_SetEventListenerPubwks003();
    cf_InitFormPubwks003();
    cf_SetBindingPubwks003();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwks003 = function() {
    gf_SetMenuPath();
    $("#saveFormPubwks003").validate({ errorElement: 'div', ignore: '' });
    fn_Calender();
    fn_SingleCalender();

	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');  
	userno =userInfo.data.userEmpNo;  
	userNm = userInfo.data.userNm;  
	userDeptNo = userInfo.data.userDeptCode;  
	userDeptNm = userInfo.data.userDeptNm;  
	
	gf_FormSetValue("searchFormPubwks003", "searchEmpNo", userno, '');
	gf_FormSetValue("searchFormPubwks003", "searchEmpCodeNm", userNm, '');
	gf_FormSetValue("searchFormPubwks003", "searchDeptNm", userDeptNm, '');
	gf_FormSetValue("searchFormPubwks003", "searchDeptNo", userDeptNo, '');
	
	
};

var dhxGridPubwks003;
var cf_SetComponentsPubwks003 = function() {
    var dhxGridPubwks003HeaderInfo = [];
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPubwks003" />', '40', 'center', 'na', 'ch', true, 'chk', '', ''));
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('부서명', '200', 'center', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titDeptNm') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('성명', '200', 'center', 'str', 'ro', false, 'empNm', '', '')); /* gf_LocaleTrans('default', 'titEmpNm') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('휴가구분', '150', 'center', 'str', 'ro', false, 'wrycSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titWrycSeCode') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('휴가시작일', '150', 'center', 'str', 'ro', false, 'wrycBeginFromTime', '', '')); /* gf_LocaleTrans('default', 'titWrycBeginTime') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('휴가종료일', '150', 'center', 'str', 'ro', false, 'wrycEndToTime', '', '')); /* gf_LocaleTrans('default', 'titWrycEndTime') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('소요일', '100', 'center', 'int', 'ro', false, 'wrycReqstDaycnt', '', '')); /* gf_LocaleTrans('default', 'titWrycReqstDaycnt') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '*', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titSanctnCodeNm') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('철회여부', '0', 'center', 'na', 'ch', true, 'wthdrawAt', '', '')); /* gf_LocaleTrans('default', 'titWthdrawAt') */
    
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('휴가시작시간', '100', 'center', 'str', 'ro', true, 'wrycFromTime', '', '')); /* gf_LocaleTrans('default', 'titWrycBeginTime') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('휴가종료시간', '100', 'center', 'str', 'ro', true, 'wrycToTime', '', '')); /* gf_LocaleTrans('default', 'titWrycEndTime') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('휴가시작일', '100', 'center', 'str', 'ro', true, 'wrycBeginTime', '', '')); /* gf_LocaleTrans('default', 'titWrycBeginTime') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('휴가종료일', '100', 'center', 'str', 'ro', true, 'wrycEndTime', '', '')); /* gf_LocaleTrans('default', 'titWrycEndTime') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('순번', '100', 'center', 'int', 'ro', true, 'wrycReqstSn', '', '')); /* gf_LocaleTrans('default', 'titWrycReqstSn') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('연차구분코드', '100', 'center', 'str', 'ro', true, 'wrycSeCode', '', '')); /* gf_LocaleTrans('default', 'titWrycSeCode') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('신청사유', '100', 'center', 'str', 'ro', true, 'reqstDtls', '', '')); /* gf_LocaleTrans('default', 'titReqstDtls') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('비상연락처', '100', 'center', 'str', 'ro', true, 'emgncTelno', '', '')); /* gf_LocaleTrans('default', 'titEmgncTelno') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('직무대행자', '100', 'center', 'str', 'ro', true, 'agentEmpno', '', '')); /* gf_LocaleTrans('default', 'titAgentEmpno') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('직무대행자', '100', 'center', 'str', 'ro', true, 'agentEmpNm', '', '')); /* gf_LocaleTrans('default', 'titAgentEmpno') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '100', 'center', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '100', 'center', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 문서 번호', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctDocNo') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드', '100', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 상태 코드', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctSttusCode') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '100', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 사원번호', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctEmpno') */
    dhxGridPubwks003HeaderInfo.push(gf_MakeDhxGridHeader('등록자', '100', 'center', 'str', 'ro', true, 'regNm', '', '')); /* gf_LocaleTrans('default', 'titRegNm') */
    dhxGridPubwks003 = gf_MakeDhxGrid('dataListPubwks003', dhxGridPubwks003HeaderInfo, true, false, false);
    dhxGridPubwks003.enableAutoWidth(false);
    dhxGridPubwks003.setEditable(true);

    dhxGridPubwks003.setColumnMinWidth(60,10); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    //검색
    gf_ComboCode('divComboSearchWrycSeCode', ':', 'searchWrycSeCode', 'search', 'C281', '' , '', '', 'ordr', '');//휴직구분
    gf_ComboCode('divComboSearchElctsctSttusCode', 'searchElctsctSttusCode', 'searchElctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', '');//결재구분
    //입력
    gf_ComboCode('divComboSaveWrycSeCode', 'wrycSeCode', 'wrycSeCode', 'search', 'C281', '' , 'width:97%', '', 'ordr', '');	//후호봉
	//$('#divComboSaveWrycSeCode').prop('disabled', true);
	//$('#divComboSaveWrycSeCode #wrycSeCode').prop('disabled', true);
};

var eventIdPubwks003 = [];
var cf_SetEventListenerPubwks003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubwks003 = gf_GridDetachEvent(dhxGridPubwks003, eventIdPubwks003);
    eventId = dhxGridPubwks003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubwks003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubwks003.getColumnsNum();
            var rowNum = dhxGridPubwks003.getRowsNum();
            var selectedId = dhxGridPubwks003.getSelectedRowId();
            var ind        = dhxGridPubwks003.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks003.getRowIndex(selectedId);
            var type       = dhxGridPubwks003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubwks003.selectRow(0);
                    //fn_FindPubwks003();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubwks003.selectRow(rowIndex + 1);
                    fn_FindPubwks003();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubwks003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubwks003.getSelectedRowId();
            var ind        = dhxGridPubwks003.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks003.getRowIndex(selectedId);
            var type       = dhxGridPubwks003.getColType(ind);
            dhxGridPubwks003.selectCell(rowIndex+1, ind);
            fn_FindPubwks003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubwks003.getSelectedRowId();
            var ind        = dhxGridPubwks003.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks003.getRowIndex(selectedId);
            var type       = dhxGridPubwks003.getColType(ind);
            dhxGridPubwks003.selectCell(rowIndex-1, ind);
            fn_FindPubwks003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks003.editCell();
            }
        }
        else return true;
    });
    eventIdPubwks003.push(eventId);
    eventId = dhxGridPubwks003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubwks003SortGridList(ind, type, direction); 
    });
    eventIdPubwks003.push(eventId);
    eventId = dhxGridPubwks003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubwks003.push(eventId);
    eventId = dhxGridPubwks003.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindPubwks003();
    });
    eventIdPubwks003.push(eventId);
    eventId = dhxGridPubwks003.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPubwks003.push(eventId);
    eventId = dhxGridPubwks003.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridPubwks003, 'wthdrawAt')) { return false; } 	
		return true;		
	});
    eventIdPubwks003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwks003').unbind('click').bind('click', function(event){
		alert('1111111111111111111111111');
        gf_errorMsgClear();
        fn_AddPubwks003()
    });
    $('#btnSavePubwks003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubwks003();
    });
    $('#btnRemovePubwks003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubwks003();
    });
    $('#btnExcelPubwks003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwks003();
    });
    $('#btnSearchPubwks003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubwks003('');
    });
    $('#btnResetPubwks003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwks003();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPubwks003').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPubwks003, $('#checkAllPubwks003').prop('checked'), 'chk');
    });
    $('#searchFormPubwks003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) {
        	if(this.id == "agentEmpNmSaveFormPubwks003"){
        		return fn_SearchEmpCode("1");
            } else {
        	return gf_saveForm_NextEle("saveFormMhshra001",this); 
            }}
        else return true; 
    }); 
    $('#saveFormPubwks003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //검색 달력
    $('#searchFormPubwks003 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
	//신청일자 달력
    $('#searchFormPubwks003 #searchApplyTime').unbind('click').bind('click', function(event){
    	searchApplyCalendar.show();
    });
	//휴가기간 달력
    $('#searchFormPubwks003 #searchWryTime').unbind('click').bind('click', function(event){
    	searchWryCalender.show();
    });
    //휴가기간 입력 달력
    $('#saveFormPubwks003 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    //직무 대행자 검색
    $('#saveFormPubwks003 #btnAgentEmpCodeSave').unbind('click').bind('click', function(event){
		gf_EmpPopup("saveFormPubwks003","agentEmpnoSaveFormPubwks003","agentEmpNmSaveFormPubwks003", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	$('#agentEmpnoSaveFormPubwks003').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#agentEmpNmSaveFormPubwks003').focus();
	    }
    });
	$('#agentEmpNmSaveFormPubwks003').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubwks003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubwks003",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks003 input[name="reqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'reqstDe', $(this).val());
    });
    $('#saveFormPubwks003 input[name="empNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'empNm', $(this).val());
    });
    $('#saveFormPubwks003 input[name="deptNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'deptNm', $(this).val());
    });
    $('#saveFormPubwks003 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'empno', $(this).val());
    });
    $('#saveFormPubwks003 select[name="wrycSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycSeCode', $(this).val());
        if($(this).val() == '' || $(this).val() == null){
        	gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycSeCodeNm', '');
        } else {
        	gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycSeCodeNm', $("#saveFormPubwks003 select[name='wrycSeCode'] option:selected").text());
        }
        fn_CheckTime($(this).val());
    });
    $('#saveFormPubwks003 input[name="wrycBeginTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var endTime = (gf_FormGetValue('saveFormPubwks003', 'wrycEndTime', 'text')).replaceAll('-','');
        var beginTime = $(this).val().replaceAll('-','');
        var toTime = gf_FormGetValue('saveFormPubwks003', 'wrycToTime', 'combo');
        var fromTime = gf_FormGetValue('saveFormPubwks003', 'wrycFromTime', 'combo');
        if(!gf_IsNull(endTime)){
        	if(endTime < beginTime){
                gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycBeginFromTime', $(this).val());
        	} else gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycBeginFromTime', $(this).val());
        } else gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycBeginFromTime', $(this).val());
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycBeginTime', $(this).val());
        //deCount();
    });
    $('#saveFormPubwks003 input[name="wrycEndTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var beginTime = (gf_FormGetValue('saveFormPubwks003', 'wrycBeginTime', 'text')).replaceAll('-','');
        var endTime = $(this).val().replaceAll('-','');
        var toTime = gf_FormGetValue('saveFormPubwks003', 'wrycToTime', 'combo');
        var fromTime = gf_FormGetValue('saveFormPubwks003', 'wrycFromTime', 'combo');
        if(!gf_IsNull(beginTime)){
        	if(endTime < beginTime){
                gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycEndToTime', $(this).val());
        	} else gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycEndToTime', $(this).val());
        } else gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycEndToTime', $(this).val());
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycEndTime', $(this).val());
        //deCount();
    });
    $('#saveFormPubwks003 select[name="wrycFromTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var toTime = gf_FormGetValue('saveFormPubwks003', 'wrycToTime', 'combo');
        var fromTime = $(this).val();
        var beginTime = gf_FormGetValue('saveFormPubwks003', 'wrycBeginTime', 'text');
        var endTime = gf_FormGetValue('saveFormPubwks003', 'wrycEndTime', 'text');
        if(!gf_IsNull(toTime)){
        	if(toTime < fromTime){
        		//gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycBeginFromTime', beginTime+' / '+fromTime+'시11');
				gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycBeginFromTime', beginTime);
        	} else gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycBeginFromTime', beginTime);
        } else gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycBeginFromTime', beginTime);
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycFromTime', $(this).val());
        //deCount();
    });
    $('#saveFormPubwks003 select[name="wrycToTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var fromTime = gf_FormGetValue('saveFormPubwks003', 'wrycFromTime', 'combo');
        var toTime = $(this).val();
        var beginTime = gf_FormGetValue('saveFormPubwks003', 'wrycBeginTime', 'text');
        var endTime = gf_FormGetValue('saveFormPubwks003', 'wrycEndTime', 'text');
        if(!gf_IsNull(fromTime)){
        	if(toTime < fromTime){
        		gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycEndToTime', endTime);
        	} else gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycEndToTime', endTime);
        } else gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycEndToTime', endTime);
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycToTime', $(this).val());
        //deCount();
    });
    $('#saveFormPubwks003 input[name="emgncTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'emgncTelno', $(this).val());
    });
    $('#saveFormPubwks003 input[name="reqstDtls"]').unbind('change blur').bind('change blur',function() {
		gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'reqstDtls', $(this).val());
    });
    $('#saveFormPubwks003 input[name="agentEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'agentEmpno', $(this).val());
    });
//    $('#saveFormPubwks003 input[name="wrycReqstDaycnt"]').unbind('change blur').bind('change blur',function() {
//    	gf_errorMsgClear();
//    	gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycReqstDaycnt', $(this).val());
//    });
//    $('#saveFormPubwks003 input[name="wrycReqstSn"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycReqstSn', $(this).val());
//    });
//    $('#saveFormPubwks003 input[name="sanctnNo"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'sanctnNo', $(this).val());
//    });
//    $('#saveFormPubwks003 input[name="wthdrawSanctnNo"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wthdrawSanctnNo', $(this).val());
//    });
//    $('#saveFormPubwks003 input[name="wthdrawAt"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wthdrawAt', $(this).val());
//    });
//    $('#saveFormPubwks003 input[name="sanctnCode"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'sanctnCode', $(this).val());
//    });
//    $('#saveFormPubwks003 input[name="wthdrawSanctnCode"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wthdrawSanctnCode', $(this).val());
//    });

    // 팝업 ===================================================================================================
    $('#saveFormPubwks003 #btnAltHvofDeSearchPopup').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var empno = gf_FormGetValue('saveFormPubwks003', 'empno', 'text');
        var empnm = gf_FormGetValue('saveFormPubwks003', 'empNm', 'text');
        var beginYear = gf_FormGetValue('saveFormPubwks003', 'wrycBeginTime', 'text');
        var param = "empno=" + empno + "&empnm=" + empnm + "&beginYear=" + beginYear;
        fn_AltHvofDePopup('', '' , '' , param);
    });
    $('#saveFormPubwks003 #btnRewardHvofDeSearchPopup').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var empno = gf_FormGetValue('saveFormPubwks003', 'empno', 'text');
        var empnm = gf_FormGetValue('saveFormPubwks003', 'empNm', 'text');
        var beginYear = gf_FormGetValue('saveFormPubwks003', 'wrycBeginTime', 'text');
        var param = "empno=" + empno + "&empnm=" + empnm + "&beginYear=" + beginYear;
        fn_RewardHvofDePopup('' , '' , '' , param);
    });
    // 폼 이벤트 end ============================================================================================
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
    
};

var cf_InitFormPubwks003 = function() {
    $('#searchFormPubwks003').resetForm();
    
    //검색달력 초기화(신청일자)
	$('input[name=searchApplyBeginTime]').val( (new Date()).format('YYYY-01-01') );
	$('input[name=searchApplyEndTime]').val( (new Date()).format('YYYY-MM-30') );
	searchApplyCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks003', 'searchApplyBeginTime', 'text'));
	searchApplyCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks003', 'searchApplyEndTime', 'text'));
	
	//검색달력 초기화(휴가일자)
	$('input[name=searchWryBeginTime]').val( (new Date()).format('YYYY-01-01') );
	$('input[name=searchWryEndTime]').val( (new Date()).format('YYYY-MM-30') );
	searchWryCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks003', 'searchWryBeginTime', 'text'));
	searchWryCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks003', 'searchWryEndTime', 'text'));

	//검색 사원 초기화
	gf_FormSetValue("searchFormPubwks003", "searchEmpNo", userno, '');
	gf_FormSetValue("searchFormPubwks003", "searchEmpCodeNm", userNm, '');
	gf_FormSetValue("searchFormPubwks003", "searchDeptNm", userDeptNm, '');
	gf_FormSetValue("searchFormPubwks003", "searchDeptNo", userDeptNo, '');

};

var cf_SetBindingPubwks003 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchWrycDaycntPubwks003();
    fn_SearchPubwks003('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 연차사용일수 조회
 */
var fn_SearchWrycDaycntPubwks003 = function() {

	var jsonParameter = {
		//userno : userno
		empno : gf_FormGetValue('searchFormPubwks003', 'searchEmpNo', 'text')
	};
	var dataSource = gf_NoAsyncTransaction('pubwks003/SearchWrycDaycntPubwks003', jsonParameter, 'GET');
    var data = dataSource.data;
//    console.log(data);
//	$('#userNmSaveFormPubwks003').val(data.userNm);
//	$('#userCodeSaveFormPubwks003').val(data.daycntEmpno);
//	$('#userDeptNmSaveFormPubwks003').val(data.userDeptNm);
//	$('#userDeptNoSaveFormPubwks003').val(data.userDeptNo);
	
	gf_FormSetValue("saveUserFormPubwks003", "wrycDaycnt", data.wrycDaycnt, '');
	gf_FormSetValue("saveUserFormPubwks003", "usingDaycnt", data.usingDaycnt, '');
	gf_FormSetValue("saveUserFormPubwks003", "remainderDaycnt", data.remainderDaycnt, '');
	
	/*gf_FormSetValue("searchFormPubwks003", "searchEmpNo", userno, '');
	gf_FormSetValue("searchFormPubwks003", "searchEmpCodeNm", userNm, '');
	gf_FormSetValue("searchFormPubwks003", "searchDeptNm", userDeptNm, '');
	gf_FormSetValue("searchFormPubwks003", "searchDeptNo", userDeptNo, '');*/
	
	wrycSeCodeList = gf_NoAsyncTransaction('pubwks003/WrycTime', jsonParameter, 'GET');
	
	var userData = userNm + "님의 현재 휴가 사용현황";
	 $('#userLayoff').html(userData);
	
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
			var ajaxUrl = gv_ContextPath+'/pubwks003/popup/altHvofDePopup/view?'+param;
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
			var ajaxUrl = gv_ContextPath+'/pubwks003/popup/rewardHvofDePopup/view?'+param;
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
var fn_SearchPubwks003 = function(userId) {
    var jsonParameter = {
    		wrycSeCode : gf_FormGetValue('searchFormPubwks003', 'searchWrycSeCode', 'combo'),
    		elctsctSttusCode : gf_FormGetValue('searchFormPubwks003', 'searchElctsctSttusCode', 'combo'),
        	empno : gf_FormGetValue('searchFormPubwks003', 'searchEmpNo', 'text'),
        	empNm : gf_FormGetValue('searchFormPubwks003', 'searchEmpCodeNm', 'text'),
        	applyBeginTime : gf_FormGetValue('searchFormPubwks003', 'searchApplyBeginTime', 'text'),
        	applyEndTime : gf_FormGetValue('searchFormPubwks003', 'searchApplyEndTime', 'text'),
        	wrycBeginTime : gf_FormGetValue('searchFormPubwks003', 'searchWryBeginTime', 'text'),
        	wrycEndTime : gf_FormGetValue('searchFormPubwks003', 'searchWryEndTime', 'text')
        };
    gf_Transaction(userId, 'pubwks003/searchPubwks003', jsonParameter, 'fn_CallbackSearchPubwks003', false, 'GET');
};

var dhxDataProcessorPubwks003;
var fn_CallbackSearchPubwks003 = function(strSvcID, targetID, data) {
    dhxGridPubwks003.clearAll();
    fn_DhxDataProcessorPubwks003(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListPubwks003');
        dhxGridPubwks003.parse(data.data.records, 'js');
 
        if(save_Row_Num_Pubwks003 == 0 && save_All_Sta_Pubwks003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridPubwks003.selectRow(0); 
        } else if(save_Row_Sta_Pubwks003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridPubwks003.selectRow(0);
        } else if(save_All_Sta_Pubwks003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridPubwks003.selectRow(save_Row_Num_Pubwks003); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridPubwks003.selectRow(save_Row_Num_Pubwks003);   //개발자 수정 필요  
            //var findCell = dhxGridPubwks003.findCell(save_Row_Ids_Pubwks003, gf_GetDhxGridColumId(dhxGridPubwks003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridPubwks003.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridPubwks003.selectRow(0);
            //} 
        } 
 
        fn_FindPubwks003();
    } else {
        gf_NoFoundDataOnGridMsg('dataListPubwks003');
        fn_InitInputFormPubwks003();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormPubwks003").text(data.data.records.length);
    cf_SetEventListenerPubwks003();
};
var fn_DhxDataProcessorPubwks003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubwks003 = new dataProcessor(gv_ContextPath+'/pubwks003/savePubwks003'); //lock feed url
    dhxDataProcessorPubwks003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubwks003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubwks003.init(dhxGridPubwks003); //link dataprocessor to the grid
    dhxDataProcessorPubwks003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubwks003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubwks003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubwks003();
                    $("#checkAllPubwks003").prop('checked', false); //상단 체크박스 해제
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
var fn_FindPubwks003 = function() {
    var rId = dhxGridPubwks003.getSelectedRowId();
    var status = dhxDataProcessorPubwks003.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormPubwks003", "empno", gf_DhxGetValue(dhxGridPubwks003, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "empNm", gf_DhxGetValue(dhxGridPubwks003, rId, 'empNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "deptNm", gf_DhxGetValue(dhxGridPubwks003, rId, 'deptNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "wrycReqstSn", gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycReqstSn',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "wrycSeCode", gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubwks003", "reqstDe", gf_DhxGetValue(dhxGridPubwks003, rId, 'reqstDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "reqstDtls", gf_DhxGetValue(dhxGridPubwks003, rId, 'reqstDtls',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "wrycReqstDaycnt", gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycReqstDaycnt',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "emgncTelno", gf_DhxGetValue(dhxGridPubwks003, rId, 'emgncTelno',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "wrycBeginTime", gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycBeginTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "wrycEndTime", gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycEndTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "wrycFromTime", gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycFromTime',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubwks003", "wrycToTime", gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycToTime',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubwks003", "agentEmpno", gf_DhxGetValue(dhxGridPubwks003, rId, 'agentEmpno',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "agentEmpNm", gf_DhxGetValue(dhxGridPubwks003, rId, 'agentEmpNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "wthdrawAt", gf_DhxGetValue(dhxGridPubwks003, rId, 'wthdrawAt',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "elctsctSttusCodeNm", gf_DhxGetValue(dhxGridPubwks003, rId, 'elctsctSttusCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks003", "wthdrawAt", (( gf_DhxGetValue(dhxGridPubwks003, rId, 'wthdrawAt',  'grid')  == '1') ? '철회' : ' '),  '');
    
    gf_FormSetValue("saveFormPubwks003", "regNm", gf_DhxGetValue(dhxGridPubwks003, rId, 'regNm',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormPubwks003 input[name="empno"]').prop('disabled', false);
        $('#saveFormPubwks003 input[name="wrycReqstSn"]').prop('disabled', false);
    } else {
        $('#saveFormPubwks003 input[name="empno"]').prop('disabled', true);
        $('#saveFormPubwks003 input[name="wrycReqstSn"]').prop('disabled', true);
    }
    
    fn_CheckTime(gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycSeCode',  'grid'));
    //deCount();
    
    if(!gf_IsNull(gf_DhxGetValue(dhxGridPubwks003, rId, 'elctsctDocNo',  'grid'))){
    	$('#saveFormPubwks003 *').prop('disabled', true);
    }

    $('#saveFormPubwks003 input[name="wthdrawAt"]').prop('readonly', true);
	
	$("#wrycSeCode").prop("disabled",true);
	$("#wrycBeginTimeSaveFormPubwks003").prop("disabled",true);
	$("#wrycEndTimeSaveFormPubwks003").prop("disabled",true);
	
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubwks003 = function() {
    $('#saveFormPubwks003 input[name="wrycReqstSn"]').prop('disabled', false);
    $('#saveFormPubwks003').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
	$('#saveFormPubwks003 *').attr("autocomplete" , "off");
	
	$('#saveFormPubwks003 *').prop('disabled', status);
    $('#saveFormPubwks003 #wthdrawAtSaveFormPubwks003').prop('disabled', true);
};
/**
 * 추가(신규) 
 */
/*var fn_AddPubwks003 = function() {
    dhxGridPubwks003.clearSelection();
    fn_InitInputFormPubwks003();
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
    
    dhxGridPubwks003.addRow(dhxGridPubwks003.uid(), initValueArr, 0);
    dhxGridPubwks003.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPubwks003');
    $('#btnPopEmpSearchPubwks003').show();
    fn_FormDisabled(false);
    gf_FormSetValue("saveFormPubwks003", "reqstDe", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormPubwks003", "regNm", userNm, '');
    gf_FormSetValue("saveFormPubwks003", "userCode", userno, '');
    gf_FormSetValue("saveFormPubwks003", "empNm", userNm, '');
    gf_FormSetValue("saveFormPubwks003", "deptNm", userDeptNm, '');
    gf_FormSetValue("saveFormPubwks003", "empno", userno, '');
    gf_FormSetValue("saveFormPubwks003", "wrycBeginTime", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormPubwks003", "wrycEndTime", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormPubwks003", "wrycSeCode", '', 'combo');
}*/
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubwks003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubwks003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubwks003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubwks003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubwks003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubwks003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubwks003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubwks003', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubwks003.setSortImgState(false); 
            gf_FormSetValue('searchFormPubwks003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubwks003', 'sortColumId', '', 'text'); 
            dhxGridPubwks003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubwks003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubwks003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubwks003', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubwks003 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubwks003 = 0; 
    save_Edt_Cnt_Pubwks003 = 0; 
    save_Del_Cnt_Pubwks003 = 0; 
    dhxGridPubwks003.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubwks003.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubwks003.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubwks003 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubwks003 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubwks003 += 1; 
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
        save_All_Sta_Pubwks003 = 0; 
        if(save_Add_Cnt_Pubwks003 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pubwks003 + "건";
            save_All_Sta_Pubwks003 = 1; 
        } 
        if(save_Edt_Cnt_Pubwks003 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pubwks003 + "건"; 
        } 
        if(save_Del_Cnt_Pubwks003 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pubwks003 + "건"; 
            save_All_Sta_Pubwks003 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPubwks003(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubwks003(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPubwks003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubwks003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubwks003_Send = function() {
    if(fn_GridValidation(dhxGridPubwks003, dhxDataProcessorPubwks003)) {
        dhxDataProcessorPubwks003.sendData();
    }
}
/**
 * 삭제
 */
/*var fn_RemovePubwks003 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubwks003, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridPubwks003.forEachRow(function(rowId) {
            state = dhxDataProcessorPubwks003.getState(rowId);
            if(dhxGridPubwks003.cells(rowId, gf_GetDhxGridColumId(dhxGridPubwks003, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridPubwks003.getRowIndex(rowId);
                    dhxGridPubwks003.deleteRow(rowId);
                    dhxGridPubwks003.selectRow(rowNum);
                    fn_FindPubwks003();
                }
                else dhxDataProcessorPubwks003.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}*/
/**
 * 엑셀다운로드
 */
var fn_ExcelPubwks003 = function () {
    var titPubwks003 = '휴가신청조회'; /* gf_LocaleTrans('default', 'titPubwks003') */
    var jsonParameter = {
        wrycSeCode : gf_FormGetValue('searchFormPubwks003', 'searchWrycSeCode', 'combo'),
    	elctsctSttusCode : gf_FormGetValue('searchFormPubwks003', 'searchElctsctSttusCode', 'combo'),
        empno : gf_FormGetValue('searchFormPubwks003', 'searchEmpNo', 'text'),
        empNm : gf_FormGetValue('searchFormPubwks003', 'searchEmpCodeNm', 'text'),
        applyBeginTime : gf_FormGetValue('searchFormPubwks003', 'searchApplyBeginTime', 'text'),
        applyEndTime : gf_FormGetValue('searchFormPubwks003', 'searchApplyEndTime', 'text'),
        wrycBeginTime : gf_FormGetValue('searchFormPubwks003', 'searchWryBeginTime', 'text'),
        wrycEndTime : gf_FormGetValue('searchFormPubwks003', 'searchWryEndTime', 'text')
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
    var sheetNm = [[ titPubwks003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwks003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwks003/excelPubwks003', jsonParameter);
};
/**
 *  달력
 */
$(document).click(function(e){ //문서 body를 클릭했을때
    if(e.target.id =="searchTime_cal" || e.target.id =="searchApplyBeginTimePubwks003" || e.target.id =="searchApplyEndTimePubwks003") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchApplyCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
$(document).click(function(e){ //문서 body를 클릭했을때
    if(e.target.id =="searchWryTime_cal" || e.target.id =="searchWryBeginTimePubwks003" || e.target.id =="searchWryEndTimePubwks003") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchWryCalender.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
function fn_Calender() {
	//신청일자
	searchApplyCalendar = new dhtmlXDoubleCalendar("searchTime_cal");
    searchApplyCalendar.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchApplyBeginTimePubwks003').val(dateFormat(searchApplyCalendar.leftCalendar.getDate()));
        	$('#searchApplyEndTimePubwks003').val(dateFormat(searchApplyCalendar.rightCalendar.getDate()));
        	searchApplyCalendar.hide();
        }
    });
	//금일 날짜표시
	$('input[name=searchApplyBeginTime]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchApplyEndTime]').val( (new Date()).format('YYYY-MM-30') );
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchApplyCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks003', 'searchApplyBeginTime', 'text'));
	searchApplyCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks003', 'searchApplyEndTime', 'text'));	
	searchApplyCalendar.leftCalendar.loadUserLanguage("ko");
	searchApplyCalendar.rightCalendar.loadUserLanguage("ko");
	
	//휴가기간
	searchWryCalender = new dhtmlXDoubleCalendar("searchWryTime_cal");
    searchWryCalender.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchWryBeginTimePubwks003').val(dateFormat(searchWryCalender.leftCalendar.getDate()));
        	$('#searchWryEndTimePubwks003').val(dateFormat(searchWryCalender.rightCalendar.getDate()));
        	searchWryCalender.hide();
        }
    });
	//금일 날짜표시
	$('input[name=searchWryBeginTime]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchWryEndTime]').val( (new Date()).format('YYYY-MM-30') );
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchWryCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks003', 'searchWryBeginTime', 'text'));
	searchWryCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks003', 'searchWryEndTime', 'text'));	
	searchWryCalender.leftCalendar.loadUserLanguage("ko");
	searchWryCalender.rightCalendar.loadUserLanguage("ko");
}
function fn_SingleCalender(){
	//휴가 시작달력
	var wrycBeginCalendar = new dhtmlXCalendarObject({input:"wrycBeginTimeSaveFormPubwks003", button:"startDateIcon"});
	wrycBeginCalendar.loadUserLanguage("ko");
	wrycBeginCalendar.hideTime();
	
	//금일 날짜표시
	$('#wrycBeginTimeSaveFormPubwks003').val(nowDate);
	
	//휴가종료달력
	var wrycEndCalendar = new dhtmlXCalendarObject({input:"wrycEndTimeSaveFormPubwks003", button:"startDateIcon"});
	wrycEndCalendar.loadUserLanguage("ko");
	wrycEndCalendar.hideTime();
	
	//금일 날짜표시
	$('#wrycEndTimeSaveFormPubwks003').val(nowDate);
	
	wrycBeginCalendar.attachEvent("onClick" , function(){
        var tmp = gf_FormGetValue('saveFormPubwks003', 'wrycBeginTime', 'text');
        var Sdate = new Date(tmp);
        Sdate.setDate(Sdate.getDate() - 1);
        wrycEndCalendar.setInsensitiveRange(null , Sdate);    
	});
	wrycEndCalendar.attachEvent("onClick" , function(){
        var tmp = gf_FormGetValue('saveFormPubwks003', 'wrycEndTime', 'text');
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
		empno = gf_FormGetValue('saveFormPubwks003', 'agentEmpno', 'text');
		korNm = gf_FormGetValue('saveFormPubwks003', 'agentEmpNm', 'text');
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
	 		gf_FormSetValue('saveFormPubwks003', 'agentEmpno', data.empno, 'text');
	 		gf_FormSetValue('saveFormPubwks003', 'agentEmpNm', data.korNm, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("saveFormPubwks003","agentEmpno","agentEmpNm", gBplcCode, "Y");
	  	} else {
	  		gf_Emp2Popup("saveAgentEmpPubwks003","agentEmpCode","agentEmpNm", gBplcCode, "Y");
	  	}
  	}
}
function fn_CallbackPopEmp(data){
	console.log(data.empno + " : " + data.korNm);
}
/**
 * 휴가 시간, 일 단위 구분
 */
function fn_CheckTime(code) {
    var rId = dhxGridPubwks003.getSelectedRowId();
	
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
        gf_FormSetValue("saveFormPubwks003", "wrycFromTime", '00', 'combo');
        gf_FormSetValue("saveFormPubwks003", "wrycToTime", '00', 'combo');
    	$('#saveFormPubwks003 select[name="wrycFromTime"]').prop('disabled', true);
    	$('#saveFormPubwks003 select[name="wrycToTime"]').prop('disabled', true);
    	$('#saveFormPubwks003 input[name="wrycEndTime"]').prop('disabled', false);
    } else {
        gf_FormSetValue("saveFormPubwks003", "wrycEndTime", gf_DhxGetValue(dhxGridPubwks003, rId, 'wrycBeginTime',  'grid'), '');
    	$('#saveFormPubwks003 input[name="wrycEndTime"]').prop('disabled', true);
    	$('#saveFormPubwks003 select[name="wrycFromTime"]').prop('disabled', false);
    	$('#saveFormPubwks003 select[name="wrycToTime"]').prop('disabled', false);
    	gf_FormSetValue('saveFormPubkws003', 'wrycReqstDaycnt', '0.5일');
    }
}
function deCount(){
    var sdd = gf_FormGetValue('saveFormPubwks003', 'wrycBeginTime', 'text');
    var edd = gf_FormGetValue('saveFormPubwks003', 'wrycEndTime', 'text');
    var ar1 = sdd.split('-');
    var ar2 = edd.split('-');
    var da1 = new Date(ar1[0], ar1[1], ar1[2]);
    var da2 = new Date(ar2[0], ar2[1], ar2[2]);
    var dif = da2 - da1;
    var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
    var cMonth = cDay * 30;// 월 만듬
    var code = gf_FormGetValue('saveFormPubwks003', 'wrycSeCode', 'combo');
    wrycSeCodeList.data.records.forEach(function(item){
		if(item.code == code){
			if(item.refer1Dc == "T"){
				checkTime = 'T';
			} else {
				checkTime = 'D';
			}
		}
	});
    var getDayCnt = gf_FormGetValue('saveFormPubwks003', 'wrycReqstDaycnt', 'text');
    var dayCnt = (parseInt(dif/cDay)+1)+'일';
    if(getDayCnt != dayCnt && getDayCnt != '0.5일'){
    	if(sdd && edd){
        	if(checkTime == 'D'){
        		gf_errorMsgClear();
        		gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycReqstDaycnt', (parseInt(dif/cDay)+1)+'일');
        	} else {
        		gf_errorMsgClear();
        		gf_DhxGridCellMapping(dhxGridPubwks003, dhxDataProcessorPubwks003, 'wrycReqstDaycnt', '0.5일');
        	}
        }
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
    $('#saveFormPubwks003 #empnoSaveFormPubwks003').parent().append(
    '<div class="error" id="empnoSaveFormPubwks003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormPubwks003 #wrycReqstSnSaveFormPubwks003').parent().append(
    '<div class="error" id="wrycReqstSnSaveFormPubwks003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubwks003 = function(empno, wrycReqstSn){
    if(!gf_IsNull(empno) && !gf_IsNull(wrycReqstSn)) {
        var jsonParameter = {
            empno : empno,
            wrycReqstSn : wrycReqstSn
        };
        var dataSource = gf_NoAsyncTransaction('pubwks003/findPubwks003', jsonParameter, 'GET');
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
    var state = dhxDataProcessorPubwks003.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPubwks003').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormPubwks003', 'empno', 'text');
                    var wrycReqstSn = gf_FormGetValue('saveFormPubwks003', 'wrycReqstSn', 'text');
                    if(fn_CheckDupPubwks003(empno, wrycReqstSn)) return true;
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
    save_Row_Sta_Pubwks003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pubwks003 == 'deleted') {
        save_Row_Num_Pubwks003 = 0;
        save_Row_Ids_Pubwks003 = "";
    } else if(save_Row_Sta_Pubwks003 == 'inserted') {
        save_Row_Num_Pubwks003 = rowNum;
        save_Row_Ids_Pubwks003 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubwks003 = rowNum;
        save_Row_Ids_Pubwks003 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                        if(!fn_CheckDupPubwks003( checkEmpno, checkWrycReqstSn )){
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
        dhxGridPubwks003.selectRowById(validFalseFistRowId);
        fn_FindPubwks003();
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
