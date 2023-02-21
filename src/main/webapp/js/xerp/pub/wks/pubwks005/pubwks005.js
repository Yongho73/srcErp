/**
 *    프로그램       : 초과근무신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.24
 *    사용테이블      : MHS_OVTIME_WORK
 * sourceGen version : 2020.07.16.01 (2020.07.24)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubwks005 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwks005 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwks005 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwks005 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwks005 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwks005 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwks005 = 0;  //그리드 삭제 수량 
var dhxGridPubwks005;  //그리드 객체
var eventIdPubwks005 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPubwks005;  //DataProcessor 객체
var searchRealWorkCalendar; // 실근무일자 검색 달력
var saveReqstDeCalendar; // 신청 근무 일자 저장 달력
var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;
//정상 근무 시간 조회
var stanWorkBeginTimeHr;
var stanWorkBeginTimeMin;
var stanWorkEndTimeHr;
var stanWorkEndTimeMin;
var stanHvofDeCheck = "init"; // 대체휴무 사용 체크를 위한 변수 (개인휴무신청 테이블 조회 후 없을 시 영업일 테이블 조회)
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPubwks005();
    if(cf_SetComponentsPubwks005()){
       fn_Calendar();
       cf_SetEventListenerPubwks005();
       cf_InitFormPubwks005();
       cf_SetBindingPubwks005();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwks005 = function() {
    gf_SetMenuPath();
    $("#saveFormPubwks005").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboSearchElctsctSttus', 'elctsctSttusSe', 'elctsctSttusSe', 'search', 'EA004', '' , '', '', 'ordr', '','',''); //전자결재상태
    gf_ComboCode('divComboSaveOvtimeSeCode', 'ovtimeSeCodeSaveFormPubwks005', 'ovtimeSeCode', 'add', 'C159', '' , '', '', 'ordr', 'required','',''); //전자결재상태
    // 승인 - 10
    // 반려 - 20
    // 보류 - 30
    $("#searchDeptCodePubwks005").focus();
};

var cf_SetComponentsPubwks005 = function() {
    var dhxGridPubwks005HeaderInfo = [];
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('시간외 근무 순번', '100', 'left', 'str', 'ro', true, 'ovtimeWorkSn', '', '')); /* gf_LocaleTrans('default', 'titOvtimeWorkSn') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('성명', '*', 'center', 'str', 'ro', false, 'empnm', '', ''));
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('시간외 구분 코드', '100', 'center', 'str', 'ro', true, 'ovtimeSeCode', '', '')); /* gf_LocaleTrans('default', 'titOvtimeSeCode') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('근무 구분', '100', 'center', 'str', 'ro', false, 'ovtimeSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titOvtimeSeCode') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('신청 근무 일자', '100', 'center', 'str', 'ro', false , 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('신청 시작 시간', '100', 'left', 'str', 'ro', true , 'reqstBeginTime', '', '')); /* gf_LocaleTrans('default', 'titReqstBeginTime') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('신청 종료 시간', '100', 'left', 'str', 'ro', true , 'reqstEndTime', '', '')); /* gf_LocaleTrans('default', 'titReqstEndTime') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('실제 근무 일자', '100', 'left', 'str', 'ro', false, 'realWorkDe', '', '')); /* gf_LocaleTrans('default', 'titRealWorkDe') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('실제 시작 시간', '100', 'left', 'str', 'ro', true, 'realBeginTime', '', '')); /* gf_LocaleTrans('default', 'titRealBeginTime') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('실제 종료 시간', '100', 'left', 'str', 'ro', true, 'realEndTime', '', '')); /* gf_LocaleTrans('default', 'titRealEndTime') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('실제 근무 시간', '100', 'left', 'str', 'ro', true, 'realWorkTime', '', '')); /* gf_LocaleTrans('default', 'titRealWorkTime') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('매식 여부', '100', 'center', 'str', 'ro', true, 'mealAt', '', '')); /* gf_LocaleTrans('default', 'titMealAt') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('근무 내용', '100', 'left', 'str', 'ro', true, 'workCn', '', '')); /* gf_LocaleTrans('default', 'titWorkCn') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('주간 인정 시간', '100', 'left', 'str', 'ro', true, 'dayRecogTime', '', '')); /* gf_LocaleTrans('default', 'titDayRecogTime') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('야간 인정 시간', '100', 'left', 'str', 'ro', true, 'nightRecogTime', '', '')); /* gf_LocaleTrans('default', 'titNightRecogTime') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('대체 휴무 사용 여부', '100', 'center', 'str', 'ro', true, 'altHvofUseAt', '', '')); /* gf_LocaleTrans('default', 'titAltHvofUseAt') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('대체 휴무 일', '100', 'left', 'str', 'ro', true, 'altHvofDe', '', '')); /* gf_LocaleTrans('default', 'titAltHvofDe') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드', '100', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태', '90', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '100', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원 번호', '100', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctSttusCode') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원 이름', '120', 'center', 'str', 'ro', true, 'elctsctEmpnm', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctSttusCode') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 순번', '100', 'left', 'str', 'ro', true, 'wthdrawElctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctDocNo') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('철회 여부', '100', 'center', 'str', 'ro', true, 'wthdrawAt', '', '')); /* gf_LocaleTrans('default', 'titWthdrawAt') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('철회 사유', '100', 'center', 'str', 'ro', true, 'wthdrawRm', '', '')); /* gf_LocaleTrans('default', 'titWthdrawAt') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 상태 코드', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titWthdrawAt') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 상태', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titWthdrawAt') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 사원 이름', '100', 'center', 'str', 'ro', true, 'wthdrawElctsctEmpnm', '', '')); /* gf_LocaleTrans('default', 'titWthdrawAt') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('보상 휴무 사용 여부', '100', 'center', 'str', 'ro', true, 'rewardHvofUseAt', '', '')); /* gf_LocaleTrans('default', 'titRewardHvofUseAt') */
    dhxGridPubwks005HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridPubwks005 = gf_MakeDhxGrid('dataListPubwks005', dhxGridPubwks005HeaderInfo, true, false, false);
    dhxGridPubwks005.enableAutoWidth(false);
    dhxGridPubwks005.setEditable(true);

    dhxGridPubwks005.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerPubwks005 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubwks005 = gf_GridDetachEvent(dhxGridPubwks005, eventIdPubwks005);
    eventId = dhxGridPubwks005.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubwks005();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubwks005.getColumnsNum();
            var rowNum = dhxGridPubwks005.getRowsNum();
            var selectedId = dhxGridPubwks005.getSelectedRowId();
            var ind        = dhxGridPubwks005.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks005.getRowIndex(selectedId);
            var type       = dhxGridPubwks005.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubwks005.selectRow(0);
                    //fn_FindPubwks005();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubwks005.selectRow(rowIndex + 1);
                    fn_FindPubwks005();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubwks005.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks005.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubwks005.getSelectedRowId();
            var ind        = dhxGridPubwks005.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks005.getRowIndex(selectedId);
            var type       = dhxGridPubwks005.getColType(ind);
            dhxGridPubwks005.selectCell(rowIndex+1, ind);
            fn_FindPubwks005();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks005.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubwks005.getSelectedRowId();
            var ind        = dhxGridPubwks005.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks005.getRowIndex(selectedId);
            var type       = dhxGridPubwks005.getColType(ind);
            dhxGridPubwks005.selectCell(rowIndex-1, ind);
            fn_FindPubwks005();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks005.editCell();
            }
        }
        else return true;
    });
    eventIdPubwks005.push(eventId);
    eventId = dhxGridPubwks005.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubwks005SortGridList(ind, type, direction); 
    });
    eventIdPubwks005.push(eventId);
    eventId = dhxGridPubwks005.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubwks005.push(eventId);
    eventId = dhxGridPubwks005.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindPubwks005();
    });
    eventIdPubwks005.push(eventId);
    eventId = dhxGridPubwks005.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPubwks005.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwks005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPubwks005()
    });
    $('#btnSavePubwks005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubwks005();
    });
    $('#btnRemovePubwks005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubwks005();
    });
    $('#btnExcelPubwks005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwks005();
    });
    $('#btnSearchPubwks005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubwks005('');
    });
    $('#btnResetPubwks005').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwks005();
    });
    $('#copyBtn').unbind("click").bind("click",function(){
    	gf_errorMsgClear();
    	var rowId = dhxGridPubwks005.getSelectedRowId();
    	var sttusCode = gf_DhxGetValue(dhxGridPubwks005, rowId, 'elctsctSttusCode',  'grid');
    	if(sttusCode != '20'){
    		gf_DivMsgAlert("반려 상태만 복사 가능합니다.");
    	}
    	else{
    		fn_CopyPubwks005(rowId);
    	}
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPubwks005 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPubwks005').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubwks005 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubwks005",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks005 input[name="ovtimeWorkSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'ovtimeWorkSn', $(this).val());
    });
    $('#saveFormPubwks005 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'empno', $(this).val());
    });
    $('#saveFormPubwks005 input[name="empnm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'empnm', $(this).val());
    });
    $('#saveFormPubwks005 select[name="ovtimeSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() == '' || $(this).val() == null){
        	gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'ovtimeSeCode', '');
        	gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'ovtimeSeCodeNm', '');
        }
        else{
        	gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'ovtimeSeCode',  $("#saveFormPubwks005 select[name='ovtimeSeCode'] option:selected").val());
        	gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'ovtimeSeCodeNm', $("#saveFormPubwks005 select[name='ovtimeSeCode'] option:selected").text());
        }
    });
    $('#saveFormPubwks005 input[name="reqstDe"]').unbind('keyup').bind('keyup',function() {
    	gf_errorMsgClear();
    	dateChk($(this));
    });
    $('#saveFormPubwks005 input[name="reqstDe"]').unbind('blur').bind('blur',function() {
        gf_errorMsgClear();
    	var empno = gf_FormGetValue('saveFormPubwks005', 'empno', 'text');
    	if(gf_IsNull(empno)){
    		gf_DivMsgAlert("대상자를 먼저 선택하여 주세요.");
    		gf_FormSetValue('saveFormPubwks005', 'reqstDe', '' , 'text');
    		return;
    	}
    	else if($(this).val().replaceAll('-','').length < 8){
//    		gf_DivMsgAlert("신청 근무 일자를 확인하여 주세요");
    		gf_FormSetValue('saveFormPubwks005', 'reqstDe', '' , 'text');
    		return;
    	}
    	else{
    		gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'reqstDe', $(this).val());
    		fn_GetThreeMonthData();
    	}
    });
    $('#saveFormPubwks005 input[name="reqstBeginTime"]').on('blur',function() {
	  gf_errorMsgClear();
	  fn_SubTime($(this).val() , gf_FormGetValue('saveFormPubwks005', 'reqstEndTime', ''));
	});
  	$('#saveFormPubwks005 input[name="reqstEndTime"]').on('blur',function() {
	  gf_errorMsgClear();
	  fn_SubTime(gf_FormGetValue('saveFormPubwks005', 'reqstBeginTime', '') , $(this).val());
	});
    $('#saveFormPubwks005 input[name="realWorkDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'realWorkDe', $(this).val());
    });
    $('#saveFormPubwks005 input[name="realWorkTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'realWorkTime', $(this).val());
    });
    $('#saveFormPubwks005 input[name="mealAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var mealAt = gf_FormGetValue('saveFormPubwks005' , 'mealAt' , 'chkboxYN');
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'mealAt', mealAt);
    });
    $('#saveFormPubwks005 input[name="workCn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'workCn', $(this).val());
    });
    $('#saveFormPubwks005 input[name="dayRecogTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'dayRecogTime', $(this).val());
    });
    $('#saveFormPubwks005 input[name="nightRecogTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'nightRecogTime', $(this).val());
    });
    $('#saveFormPubwks005 input[name="altHvofUseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var altHvofUseAt = gf_FormGetValue('saveFormPubwks005' , 'altHvofUseAt' , 'chkboxYN');
        if(altHvofUseAt == 1 && stanHvofDeCheck == "init"){
        	gf_DivMsgAlert("신청일자를 선택하여 주세요.");
        	$('#saveFormPubwks005 input[name="altHvofUseAt"]').prop("checked", false);
        }
        else if(altHvofUseAt == 1 && stanHvofDeCheck == "0"){
        	gf_DivMsgAlert("휴일에만 사용 가능 합니다.");
        	$('#saveFormPubwks005 input[name="altHvofUseAt"]').prop("checked", false);
        }
        else{
        	gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'altHvofUseAt', altHvofUseAt);
        }
    });
    $('#saveFormPubwks005 input[name="altHvofDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'altHvofDe', $(this).val());
    });
    $('#saveFormPubwks005 input[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'elctsctSttusCode', $(this).val());
    });
    $('#saveFormPubwks005 input[name="wthdrawAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var wthdrawAt = gf_FormGetValue('saveFormPubwks005' , 'wthdrawAt' , 'chkboxYN');
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'wthdrawAt', wthdrawAt);
    });
    $('#saveFormPubwks005 input[name="rewardHvofUseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var rewardHvofUseAt = gf_FormGetValue('saveFormPubwks005' , 'rewardHvofUseAt' , 'chkboxYN');
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'rewardHvofUseAt', rewardHvofUseAt);
    });
    $('#saveFormPubwks005 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'rm', $(this).val());
    });
    
    // 폼 이벤트 end ============================================================================================
    // 달력 이벤트 ===============================================================================================
    $('#searchFormPubwks005 #searchRealWork').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        searchRealWorkCalendar.show();
    });
    $(document).click(function(e){ //문서 body를 클릭했을때
        //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
        if(e.target.id =="searchRealWorkDe_cal" || e.target.id =="searchRealWorkSdtPubwks005" || e.target.id =="searchRealWorkEdtPubwks005") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
        searchRealWorkCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.
    });
    // 자동 완성 끄기 =============================================================================================
    $("#searchFormPubwks005").attr("autocomplete" , "off");
    $("#saveFormPubwks005").attr("autocomplete" , "off");
    // 검색 조건 사원팝업
	$('#btnSearchEmpCode').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubwks005","searchEmpCodePubwks005","searchEmpNmPubwks005",'', "Y", "fn_SearchPubEmpCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#searchEmpCodePubwks005').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchPubEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks005', 'searchEmpCodeNm', '', 'text');
		}
    });
	$('#searchEmpNmPubwks005').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchPubEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks005', 'searchEmpNo', '', 'text');
		}
    });
    // 검색 조건 부서팝업
	$('#btnSearchDeptCode').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormPubwks005","searchDeptCodePubwks005","searchDeptCodeNmPubwks005",'', "Y", "fn_SearchPubEmpDeptCode");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#searchDeptCodePubwks005').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchPubEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks005', 'searchDeptCodeNm', '', 'text');
		}
    });
	$('#searchDeptCodeNmPubwks005').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchPubEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks005', 'searchDeptCode', '', 'text');
		}
    });
	
    // 저장 폼 사원 팝업
	$('#btnSearchEmpNo').unbind('click').bind('click', function(event){
		gf_EmpPopup("saveFormPubwks005","empnoSaveFormPubwks005","empnmSaveFormPubwks005",'', "N", "fn_SearchSaveFormPubEmpCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
};

var cf_InitFormPubwks005 = function() {
    $('#searchFormPubwks005').resetForm();
    
    if("PUBMNG000" == gv_SecondLvlMenuId){
    	gf_FormSetValue("searchFormPubwks005", "searchDeptCode", sessionUserDeptCode , '');
    	gf_FormSetValue("searchFormPubwks005", "searchDeptCodeNm", sessionUserDeptNm , '');
    	gf_FormSetValue("searchFormPubwks005", "searchEmpNo", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormPubwks005", "searchEmpCodeNm", sessionUserEmpnm , '');
    }
};

var cf_SetBindingPubwks005 = function() {
    // 달력 기본값 (30일 전,후)
	searchRealWorkCalendar.leftCalendar.setDate(gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD'));
	searchRealWorkCalendar.rightCalendar.setDate(gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD'));	

    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경
    fn_SessionCheck();
    fn_SearchPubwks005('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 *  사원 , 부서 조회
 * */
//--부서 입력 후 Enter 이벤트
function fn_SearchPubEmpDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormPubwks005', 'searchDeptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormPubwks005', 'searchDeptCodeNm', 'text'), 
			useAt : '1'
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchPubEmpDeptCode', false, 'GET');
}

function fn_CallbackSearchPubEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormPubwks005', 'searchDeptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormPubwks005', 'searchDeptCodeNm', data.deptKorNm, 'text');
   		
   		
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormPubwks005","searchDeptCode","searchDeptCodeNm", '' , "Y", null);
    }
}
//--사원 입력 후 Enter 이벤트
function fn_SearchPubEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormPubwks005', 'searchEmpNo', 'text'),
		    korNm : gf_FormGetValue('searchFormPubwks005', 'searchEmpCodeNm', 'text'),
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
//	console.log(data);
	var totCnt = data.data.records.length;
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormPubwks005', 'searchEmpNo', data.empno, 'text');
 		gf_FormSetValue('searchFormPubwks005', 'searchEmpCodeNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchDeptCodeNm","searchEmpNo","searchEmpCodeNm", '' , "Y", null);
  	}
}
//--저장 폼 사원 검색 이벤트
function fn_SearchSaveFormPubEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('saveFormPubwks005', 'empnoSaveFormPubwks005', 'text'),
		    korNm : gf_FormGetValue('saveFormPubwks005', 'empnmSaveFormPubwks005', 'text'),
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchSaveFormEmpCode', false, 'GET');
}

function fn_CallbackSearchSaveFormEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('saveFormPubwks005', 'empnoSaveFormPubwks005', data.empno, 'text');
 		gf_FormSetValue('saveFormPubwks005', 'empnmSaveFormPubwks005', data.korNm, 'text');
 	} else {
	  	//Popup 호출
//  		gf_EmpPopup("searchDeptCodeNm","empno","empNm", '' , "Y", null);
  	}
}

/**
 * 반려 건 복사
 */
var fn_CopyPubwks005 = function(rowId){
	var jsonParameterForCopy = {
		ovtimeWorkSn : gf_DhxGetValue(dhxGridPubwks005, rowId, 'ovtimeWorkSn',  'grid')
	}
	var dataSource = gf_NoAsyncTransaction('pubwks005/copyPubwks005', jsonParameterForCopy, 'GET');
//	console.log(dataSource);
    if(dataSource.code === '000'){
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        fn_SearchPubwks005();
    }
    else{
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
}

/**
 * 세션 체크
 */
var fn_SessionCheck = function(){
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
//    console.log(userInfo);
    if(userInfo.code == "000"){
    	sessionUserDeptCode = userInfo.data.userDeptCode;
    	sessionUserDeptNm = userInfo.data.userDeptNm;
    	sessionUserEmpno = userInfo.data.userEmpNo;
    	sessionUserEmpnm = userInfo.data.userNm;

    	gf_FormSetValue("searchFormPubwks005", "searchDeptCode", sessionUserDeptCode , '');
    	gf_FormSetValue("searchFormPubwks005", "searchDeptCodeNm", sessionUserDeptNm , '');
    	gf_FormSetValue("searchFormPubwks005", "searchEmpNo", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormPubwks005", "searchEmpCodeNm", sessionUserEmpnm , '');
    }
}
/** 
 * 근무시간 및 인정시간 구하기
 * */
var fn_SubTime = function(beginTime , endTime){
//	console.log(beginTime);
//	console.log(endTime);
	var rId = dhxGridPubwks005.getSelectedRowId();
	var reqstDe = gf_DhxGetValue(dhxGridPubwks005, rId, 'reqstDe',  'grid');
	if(!gf_IsNull(reqstDe)){
		var begin = beginTime.split(':');
		var end = endTime.split(':');
		var beginHr = begin[0];
		var beginMin = begin[1];
		var endHr = end[0];
		var endMin = end[1]; 
		
		var beginStr = reqstDe + " " + beginHr + ":" + beginMin;
		var endStr = reqstDe + " " + endHr + ":" + endMin;
		
		var beginDate = new Date(beginStr);
		var endDate = new Date(endStr);
		
		if(beginDate > endDate){
			gf_DivMsgAlert("시작시간이 종료시간 보다 클 수 없습니다.");
			gf_FormSetValue('saveFormPubwks005', 'reqstBeginTime', "20:00", '');
			gf_FormSetValue('saveFormPubwks005', 'reqstEndTime', "20:00", '');
			gf_FormSetValue("saveFormPubwks005", "dayRecogTime", "00:00" , 'text');
			gf_FormSetValue("saveFormPubwks005", "nightRecogTime", "00:00" , 'text');
			return;
		}
		var time = beginDate - endDate;
		var hour = Math.floor(Math.abs((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
		var minute = Math.floor(Math.abs((time % (1000 * 60 * 60)) / (1000 * 60)));
		
		
//		console.log("임시 합계 시간 " + tmpGetHr);
//		console.log("임시 합계 분 " + tmpGetMin);
//		console.log("사용자 초과 근무 시간 합계 " + userOverWorkTimeHr);
//		console.log("사용자 초과 근무 분 합계 " + userOverWorkTimeMin);
//		console.log("사용자 초과 근무 최대(주) 합계 " + maxWeekOverWorkTime);
		
		gf_FormSetValue('saveFormPubwks005', 'reqstBeginTime', beginHr + ":" + beginMin, '');
		gf_FormSetValue('saveFormPubwks005', 'reqstEndTime', endHr + ":" + endMin, '');
		gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'reqstBeginTime', beginHr + ":" + beginMin);
		gf_DhxGridCellMapping(dhxGridPubwks005, dhxDataProcessorPubwks005, 'reqstEndTime', endHr + ":" + endMin);

		var nightRecogStr1 = reqstDe + " 06:00";
		var nightRecogStr2 = reqstDe + " 22:00";
		
		var nightRecogTime1 = new Date(nightRecogStr1);
		var nightRecogTime2 = new Date(nightRecogStr2);

		if(hour < 10) hour = "0"+hour;
		if(minute < 10) minute = "0"+minute;
		
		if(beginDate >= nightRecogTime1 && endDate < nightRecogTime2){		// 시작 시간 - 주간 && 종료 시간 - 주간
			gf_FormSetValue("saveFormPubwks005", "dayRecogTime", hour + ":" + minute , 'text');
			gf_FormSetValue("saveFormPubwks005", "nightRecogTime", "00:00" , 'text');
		}
		else if((beginDate >= nightRecogTime2 && endDate >= nightRecogTime2) || (beginDate < nightRecogTime1 && endDate <= nightRecogTime1)){	// 시작 시간 - 야간 && 종료 시간 - 야간
			gf_FormSetValue("saveFormPubwks005", "dayRecogTime", "00:00" , 'text');
			gf_FormSetValue("saveFormPubwks005", "nightRecogTime", hour + ":" + minute , 'text');			
		}
		else if(beginDate >= nightRecogTime1 && beginDate < nightRecogTime2){	// 시작 시간 - 주간  && 종료 시간 - 야간
			var tmp1 = beginDate - nightRecogTime2;
			var tmpHr1 = Math.floor(Math.abs((tmp1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			var tmpMin1 = Math.floor(Math.abs((tmp1 % (1000 * 60 * 60)) / (1000 * 60)));
			var tmp2 = endDate - nightRecogTime2;
			var tmpHr2 = Math.floor(Math.abs((tmp2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			var tmpMin2 = Math.floor(Math.abs((tmp2 % (1000 * 60 * 60)) / (1000 * 60)));
			if(tmpHr1 < 10) tmpHr1 = "0"+tmpHr1;
			if(tmpMin1 < 10) tmpMin1 = "0"+tmpMin1;
			if(tmpHr2 < 10) tmpHr2 = "0"+tmpHr2;
			if(tmpMin2 < 10) tmpMin2 = "0"+tmpMin2;
			gf_FormSetValue("saveFormPubwks005", "dayRecogTime", tmpHr1 + ":" + tmpMin1 , 'text');
			gf_FormSetValue("saveFormPubwks005", "nightRecogTime", tmpHr2 + ":" + tmpMin2 , 'text');			
		}
		else if(beginDate < nightRecogTime1 && endDate > nightRecogTime1){	// 시작 시간 - 야간 && 종료 시간 - 주간
			var tmp1 = beginDate - nightRecogTime1;
			var tmpHr1 = Math.floor(Math.abs((tmp1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			var tmpMin1 = Math.floor(Math.abs((tmp1 % (1000 * 60 * 60)) / (1000 * 60)));
			var tmp2 = endDate - nightRecogTime1;
			var tmpHr2 = Math.floor(Math.abs((tmp2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			var tmpMin2 = Math.floor(Math.abs((tmp2 % (1000 * 60 * 60)) / (1000 * 60)));
			if(tmpHr1 < 10) tmpHr1 = "0"+tmpHr1;
			if(tmpMin1 < 10) tmpMin1 = "0"+tmpMin1;
			if(tmpHr2 < 10) tmpHr2 = "0"+tmpHr2;
			if(tmpMin2 < 10) tmpMin2 = "0"+tmpMin2;
			gf_FormSetValue("saveFormPubwks005", "dayRecogTime", tmpHr1 + ":" + tmpMin1 , 'text');
			gf_FormSetValue("saveFormPubwks005", "nightRecogTime", tmpHr2 + ":" + tmpMin2 , 'text');			
		}
	}
	return true;
}
/**
 * 조회
 */
var fn_SearchPubwks005 = function(userId) {
    var jsonParameter = {
        deptCode : gf_FormGetValue('searchFormPubwks005', 'searchDeptCode', 'text'),
        empno : gf_FormGetValue('searchFormPubwks005', 'searchEmpNo', 'text'),
        realWorkSdt : gf_FormGetValue('searchFormPubwks005', 'searchRealWorkSdt', 'text').replaceAll('-',''),
        realWorkEdt : gf_FormGetValue('searchFormPubwks005', 'searchRealWorkEdt', 'text').replaceAll('-',''),
        rewardHvofUseAt : gf_FormGetValue('searchFormPubwks005', 'searchHovfUseAt', 'combo'),
        elctsctSttusCode : gf_FormGetValue('searchFormPubwks005', 'elctsctSttusSe', 'combo')
    };
    gf_Transaction(userId, 'pubwks005/searchPubwks005', jsonParameter, 'fn_CallbackSearchPubwks005', false, 'GET');
};
/**
 * 신청 근무 일자 선택 시 대상자의 일주일 데이터 및 공휴일 조회
 * */
var fn_GetThreeMonthData = function(){				// 신청 근무 월 기준 1개월 전 , 1개월 후 데이터 조회  
	var rId = dhxGridPubwks005.getSelectedRowId();
	var empno = gf_DhxGetValue(dhxGridPubwks005, rId, 'empno',  'grid');
	var reqstDe = gf_DhxGetValue(dhxGridPubwks005, rId, 'reqstDe',  'grid').replaceAll('-','');
	var stanReqstMonth = reqstDe.substr(0,6);
	var beforeReqstMonth = (stanReqstMonth * 1) - 1;
	var afterReqstMonth = (stanReqstMonth * 1) + 2;
	var jsonParameter = {
			empno : empno,
			reqstDe : reqstDe,
			stanReqstMonth : stanReqstMonth,
			beforeReqstMonth : beforeReqstMonth,
			afterReqstMonth : afterReqstMonth
	}
	var dataSource = gf_NoAsyncTransaction('pubwks005/getThreeMonthDataPubwks005', jsonParameter, 'GET');
	console.log(dataSource);
	var data = dataSource.data;
	var stanWorkBeginTime;
	var stanWorkEndTime;
	if(data.code == "000"){
		stanWorkBeginTime = gf_IsNull(data.stanWorkTime.workBeginTime) ? "18:00" : data.stanWorkTime.workBeginTime;
		stanWorkEndTime = gf_IsNull(data.stanWorkTime.workEndTime) ? "22:00" : data.stanWorkTime.workEndTime;
		stanHvofDeCheck = data.stanHvofDeCheck;
		gf_FormSetValue("saveFormPubwks005", "normalWorkBeginTime", stanWorkBeginTime , 'text');
		gf_FormSetValue("saveFormPubwks005", "normalWorkEndTime", stanWorkEndTime , 'text');
		gf_FormSetValue("saveFormPubwks005", "totalTime", data.totalRecogTime, 'text');
		maxWeekOverWorkTime = data.oneWeekMaxTime;
		totalOneWeekTime = data.totalRecogTime.replaceAll(":" , "");
	}
	else{
		gv_DivMsgAlert("정상 근무시간 체크 오류");
	}
}
var fn_CallbackSearchPubwks005 = function(strSvcID, targetID, data) {
    //dhxGridPubwks005.clearAll();
    dhxGridPubwks005.destructor();
    if(cf_SetComponentsPubwks005()){ 
        fn_DhxDataProcessorPubwks005(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPubwks005');
            dhxGridPubwks005.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pubwks005 == 0 && save_All_Sta_Pubwks005 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPubwks005.selectRow(0); 
            } else if(save_Row_Sta_Pubwks005 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPubwks005.selectRow(0);
            } else if(save_All_Sta_Pubwks005 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPubwks005.selectRow(save_Row_Num_Pubwks005); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPubwks005.selectRow(save_Row_Num_Pubwks005);   //개발자 수정 필요  
                //var findCell = dhxGridPubwks005.findCell(save_Row_Ids_Pubwks005, gf_GetDhxGridColumId(dhxGridPubwks005,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPubwks005.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPubwks005.selectRow(0);
                //} 
            } 
 
            fn_FindPubwks005();
        } else {
            gf_NoFoundDataOnGridMsg('dataListPubwks005');
            fn_InitInputFormPubwks005();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormPubwks005").text(data.data.records.length);
        cf_SetEventListenerPubwks005();
    } 
};
var fn_DhxDataProcessorPubwks005 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubwks005 = new dataProcessor(gv_ContextPath+'/pubwks005/savePubwks005'); //lock feed url
    dhxDataProcessorPubwks005.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubwks005.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubwks005.init(dhxGridPubwks005); //link dataprocessor to the grid
    dhxDataProcessorPubwks005.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubwks005.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubwks005.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubwks005();
                    $("#checkAllPubwks005").prop('checked', false); //상단 체크박스 해제
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
var fn_FindPubwks005 = function() {
    var rId = dhxGridPubwks005.getSelectedRowId();
    var status = dhxDataProcessorPubwks005.getState(rId);

    fn_FormDisabled(false);
    var mealAt = gf_DhxGetValue(dhxGridPubwks005, rId, 'mealAt',  'grid');
    var altHvofUseAt = gf_DhxGetValue(dhxGridPubwks005, rId, 'altHvofUseAt',  'grid');
    var wthdrawAt = gf_DhxGetValue(dhxGridPubwks005, rId, 'wthdrawAt',  'grid');
    var rewardHvofUseAt = gf_DhxGetValue(dhxGridPubwks005, rId, 'rewardHvofUseAt',  'grid');
    var ovtimeWorkSn = gf_DhxGetValue(dhxGridPubwks005, rId, 'ovtimeWorkSn',  'grid');
    var reqstDe = gf_DhxGetValue(dhxGridPubwks005, rId, 'reqstDe',  'grid');
    var empno = gf_DhxGetValue(dhxGridPubwks005, rId, 'empno',  'grid');
    if(mealAt == "1"){
    	gf_FormSetValue("saveFormPubwks005", "mealAt", mealAt , 'chkbox');
    } 
    else{
    	$('#saveFormPubwks005 #mealAtSaveFormPubwks005').attr("checked" , false);
    }
    
    if(altHvofUseAt == "1") {
    	gf_FormSetValue("saveFormPubwks005", "altHvofUseAt", altHvofUseAt , 'chkbox');
    }
    else{
    	$('#saveFormPubwks005 #altHvofUseAtSaveFormPubwks005').attr("checked" , false);
    }
    
    if(wthdrawAt == "1") {
    	gf_FormSetValue("saveFormPubwks005", "wthdrawAt", wthdrawAt , 'chkbox');
    }
    else{
    	$('#saveFormPubwks005 #wthdrawAtSaveFormPubwks005').attr("checked" , false);
    }
    
    if(rewardHvofUseAt == "1"){
    	gf_FormSetValue("saveFormPubwks005", "rewardHvofUseAt", rewardHvofUseAt , 'chkbox');
    }
    else{
    	$('#saveFormPubwks005 #rewardHvofUseAtSaveFormPubwks005').attr("checked" , false);
    }

    
    gf_FormSetValue("saveFormPubwks005", "ovtimeWorkSn", ovtimeWorkSn , '');
    gf_FormSetValue("saveFormPubwks005", "empno",empno , '');
    gf_FormSetValue("saveFormPubwks005", "empnm", gf_DhxGetValue(dhxGridPubwks005, rId, 'empnm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "ovtimeSeCode", gf_DhxGetValue(dhxGridPubwks005, rId, 'ovtimeSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubwks005", "reqstDe",reqstDe , '');
    gf_FormSetValue("saveFormPubwks005", "reqstBeginTime", gf_DhxGetValue(dhxGridPubwks005, rId, 'reqstBeginTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "reqstEndTime", gf_DhxGetValue(dhxGridPubwks005, rId, 'reqstEndTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "realWorkDe", gf_DhxGetValue(dhxGridPubwks005, rId, 'realWorkDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "realBeginTime", gf_DhxGetValue(dhxGridPubwks005, rId, 'realBeginTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "realEndTime", gf_DhxGetValue(dhxGridPubwks005, rId, 'realEndTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "realWorkTime", gf_DhxGetValue(dhxGridPubwks005, rId, 'realWorkTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "workCn", gf_DhxGetValue(dhxGridPubwks005, rId, 'workCn',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "dayRecogTime", gf_DhxGetValue(dhxGridPubwks005, rId, 'dayRecogTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "nightRecogTime", gf_DhxGetValue(dhxGridPubwks005, rId, 'nightRecogTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "altHvofDe", gf_DhxGetValue(dhxGridPubwks005, rId, 'altHvofDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "elctsctSttusCode", gf_DhxGetValue(dhxGridPubwks005, rId, 'elctsctSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "elctsctSttusCodeNm", gf_DhxGetValue(dhxGridPubwks005, rId, 'elctsctSttusCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "elctsctDocNo", gf_DhxGetValue(dhxGridPubwks005, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "elctsctEmpno", gf_DhxGetValue(dhxGridPubwks005, rId, 'elctsctEmpno',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "elctsctEmpnm", gf_DhxGetValue(dhxGridPubwks005, rId, 'elctsctEmpnm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "wthdrawElctsctSeSn", gf_DhxGetValue(dhxGridPubwks005, rId, 'wthdrawElctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "wthdrawRm", gf_DhxGetValue(dhxGridPubwks005, rId, 'wthdrawRm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "wthdrawElctsctSttusCode", gf_DhxGetValue(dhxGridPubwks005, rId, 'wthdrawElctsctSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "wthdrawElctsctSttusCodeNm", gf_DhxGetValue(dhxGridPubwks005, rId, 'wthdrawElctsctSttusCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks005", "wthdrawElctsctEmpnm", gf_DhxGetValue(dhxGridPubwks005, rId, 'wthdrawElctsctEmpnm',  'grid'), '');
    

    gf_FormSetValue("saveFormPubwks005", "rm", gf_DhxGetValue(dhxGridPubwks005, rId, 'rm',  'grid'), '');

	gf_FormSetValue("saveFormPubwks005", "normalWorkBeginTime", '' , 'text');
	gf_FormSetValue("saveFormPubwks005", "normalWorkEndTime", '' , 'text');
    
	if(!gf_IsNull(empno) && !gf_IsNull(reqstDe)){
		fn_GetThreeMonthData();
	}

};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubwks005 = function() {
    $('#saveFormPubwks005 input[name="ovtimeWorkSn"]').prop('disabled', false);
    $('#saveFormPubwks005').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormPubwks005 *').prop('disabled', status);

    // 	------------------------------------------------------------- 필수 disabled
    
    $('#saveFormPubwks005 #empnoSaveFormPubwks005').attr('disabled', true); // 사원번호
    $('#saveFormPubwks005 #empnmSaveFormPubwks005').attr('disabled', true); // 성명
    $('#saveFormPubwks005 #normalWorkBeginTimeSaveFormPubwks005').attr('disabled', true); // 정상 근무시간
    $('#saveFormPubwks005 #normalWorkEndTimeSaveFormPubwks005').attr('disabled', true); // 정상 근무시간
    $('#saveFormPubwks005 #realWorkTimeSaveFormPubwks005').attr('disabled', true); // 실제 근무시간
    $('#saveFormPubwks005 #realWorkDeSaveFormPubwks005').attr('disabled', true); // 실제 근무일자
    $('#saveFormPubwks005 #realBeginTimeSaveFormPubwks005').attr('disabled', true); // 실제 근무 시작 시간
    $('#saveFormPubwks005 #realEndTimeSaveFormPubwks005').attr('disabled', true); // 실제 근무 종료 시간
    $('#saveFormPubwks005 #dayRecogTimeSaveFormPubwks005').attr('disabled', true); // 주간 인정시간
    $('#saveFormPubwks005 #nightRecogTimeSaveFormPubwks005').attr('disabled', true); // 야간 인정시간
    $('#saveFormPubwks005 #rewardHvofRemainderTimeSaveFormPubwks005').attr('disabled', true); // 보상 휴무 잔여 시간
    $('#saveFormPubwks005 #elctsctSttusCodeNmSaveFormPubwks005').attr('disabled', true); // 전자결재 상태
    $('#saveFormPubwks005 #elctsctEmpnmSaveFormPubwks005').attr('disabled', true);
    $('#saveFormPubwks005 #wthdrawElctsctSttusCodeNmSaveFormPubwks005').attr('disabled', true);
    $('#saveFormPubwks005 #wthdrawAtSaveFormPubwks005').attr('disabled' , true);
// 	------------------------------------------------------------- /필수 disabled
    
    var rowId = dhxGridPubwks005.getSelectedRowId();
    if(!gf_IsNull(rowId)){
    	var ovtimeWorkSeq = gf_DhxGetValue(dhxGridPubwks005, rowId, 'ovtimeWorkSn', 'grid');
    	var sttusCode = gf_DhxGetValue(dhxGridPubwks005, rowId, 'elctsctSttusCode', 'grid');
	    if(gf_IsNull(ovtimeWorkSeq)){
	    	$('#saveFormPubwks005 #btnSearchEmpNo').attr('disabled', false); // 저장 폼 사원 검색
	    }
	    else if(!gf_IsNull(ovtimeWorkSeq) && !gf_IsNull(sttusCode)){
//	        $('#saveFormPubwks005 *').attr('disabled', true);
	    	$('#saveFormPubwks005 #ovtimeSeCodeSaveFormPubwks005').attr('disabled' , true);
	    	$('#saveFormPubwks005 #reqstDeSaveFormPubwks005').attr('disabled' , true);
	    	$('#saveFormPubwks005 #reqstBeginTimeSaveFormPubwks005').attr('disabled' , true);
	    	$('#saveFormPubwks005 #reqstEndTimeSaveFormPubwks005').attr('disabled' , true);
	    	$('#saveFormPubwks005 #workCnSaveFormPubwks005').attr('disabled' , true);
	    	$('#saveFormPubwks005 #rmSaveFormPubwks005').attr('disabled' , true);
	    	$('#saveFormPubwks005 #rewardHvofUseAtSaveFormPubwks005').attr('disabled' , true);
	    }
	    else{
	    	$('#saveFormPubwks005 #btnSearchEmpNo').attr('disabled', true); // 저장 폼 사원 검색
	    }
	    
	    if(!gf_IsNull(sttusCode) && sttusCode == '20'){
	    	$('#copyBtn').show();
	    }
	    else{
	    	$('#copyBtn').hide();
	    }
    }
    
    if("PUBMNG000" == gv_SecondLvlMenuId){
    	$("#searchFormPubwks005 #searchDeptCodePubwks005").attr("disabled" , true);
    	$("#searchFormPubwks005 #searchDeptNmPubwks005").attr("disabled" , true);
    	$("#searchFormPubwks005 #searchEmpCodePubwks005").attr("disabled" , true);
    	$("#searchFormPubwks005 #searchEmpNmPubwks005").attr("disabled" , true);
    	$("#searchFormPubwks005 #btnSearchDeptCode").attr("disabled" , true);
    	$("#searchFormPubwks005 #btnSearchEmpCode").attr("disabled" , true);
    	$("#saveFormPubwks005 #btnSearchEmpNo").attr("disabled" , true);
    }
    else{
    	$("#saveFormPubwks005 #altHvofUseAtSaveFormPubwks005").attr("disabled" , true);
    	$("#saveFormPubwks005 #rewardHvofUseAtSaveFormPubwks005").attr("disabled" , true);
    	$("#saveFormPubwks005 #wthdrawRequestBtn").hide();
    }
};
/**
 * 추가(신규) 
 */
var fn_AddPubwks005 = function() {
    dhxGridPubwks005.clearSelection();
    fn_InitInputFormPubwks005();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //ovtimeWorkSn
    initValueArr.push(sessionUserEmpno); //empno
    initValueArr.push(sessionUserEmpnm); //empnm
    initValueArr.push(''); //ovtimeSeCode
    initValueArr.push(''); //ovtimeSeCodeNm
    initValueArr.push(''); //reqstDe
    initValueArr.push('18:00'); //reqstBeginTime
    initValueArr.push('18:00'); //reqstEndTime
    initValueArr.push(''); //realWorkDe
    initValueArr.push(''); //realBeginTime
    initValueArr.push(''); //realEndTime
    initValueArr.push(''); //realWorkTime
    initValueArr.push(''); //mealAt
    initValueArr.push(''); //workCn
    initValueArr.push(''); //dayRecogTime
    initValueArr.push(''); //nightRecogTime
    initValueArr.push(''); //altHvofUseAt
    initValueArr.push(''); //altHvofDe
    initValueArr.push(''); //elctsctSttusCode
    initValueArr.push(''); //elctsctSttusCodeNm
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctEmpno
    initValueArr.push(''); //elctsctEmpnm
    initValueArr.push(''); //wthdrawElctsctSeSn
    initValueArr.push(''); //wthdrawAt
    initValueArr.push(''); //wthdrawRm
    initValueArr.push(''); //wthdrawElctsctSttusCode
    initValueArr.push(''); //wthdrawElctsctSttusCodeNm
    initValueArr.push(''); //wthdrawElctsctEmpnm
    initValueArr.push(''); //rewardHvofUseAt
    initValueArr.push(''); //rm
    dhxGridPubwks005.addRow(dhxGridPubwks005.uid(), initValueArr, 0);
    dhxGridPubwks005.selectRow(0);
    fn_FindPubwks005();
    gf_NoFoundDataOnGridMsgRemove('dataListPubwks005');
    $('#btnPopEmpSearchPubwks005').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubwks005SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubwks005, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubwks005', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubwks005', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubwks005, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubwks005.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubwks005', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubwks005', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks005, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubwks005.setSortImgState(false); 
            gf_FormSetValue('searchFormPubwks005', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubwks005', 'sortColumId', '', 'text'); 
            dhxGridPubwks005.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubwks005.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubwks005', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubwks005', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks005, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubwks005 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubwks005 = 0; 
    save_Edt_Cnt_Pubwks005 = 0; 
    save_Del_Cnt_Pubwks005 = 0; 
    dhxGridPubwks005.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubwks005.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubwks005.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubwks005 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubwks005 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubwks005 += 1; 
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
        save_All_Sta_Pubwks005 = 0; 
        if(save_Add_Cnt_Pubwks005 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pubwks005 + "건";
            save_All_Sta_Pubwks005 = 1; 
        } 
        if(save_Edt_Cnt_Pubwks005 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pubwks005 + "건"; 
        } 
        if(save_Del_Cnt_Pubwks005 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pubwks005 + "건"; 
            save_All_Sta_Pubwks005 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPubwks005(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubwks005(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPubwks005 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubwks005_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubwks005_Send = function() {
    if(fn_GridValidation(dhxGridPubwks005, dhxDataProcessorPubwks005)) {
        dhxDataProcessorPubwks005.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemovePubwks005 = function() {
    var rowId = dhxGridPubwks005.getSelectedRowId();
	var state = dhxDataProcessorPubwks005.getState(rowId);
	if(state == 'inserted') {
		var rowNum = dhxGridPubwks005.getRowIndex(rowId);
		dhxGridPubwks005.deleteRow(rowId);
		dhxGridPubwks005.selectRow(rowNum);
		fn_FindPubwks005();
	}
	else {
		var sttusCode = gf_DhxGetValue(dhxGridPubwks005, rowId, 'elctsctSttusCode', 'grid');
		var sttusCodeNm = gf_DhxGetValue(dhxGridPubwks005, rowId, 'elctsctSttusCodeNm', 'grid');
		if(gf_IsNull(sttusCode)){
			dhxDataProcessorPubwks005.setUpdated(rowId, true, 'deleted');
		}
		else{
			gf_DivMsgAlert(sttusCodeNm + " 상태는 삭제하실 수 없습니다.");
		}
	}
		
}
/** 
 * 달력 생성
 */

var fn_Calendar = function(){
//	var searchRealWorkCalendar; // 실근무일자 검색 달력
//	var saveReqstDeCalendar; // 신청 근무 일자 저장 달력
	searchRealWorkCalendar = new dhtmlXDoubleCalendar("searchRealWorkDe_cal");
	searchRealWorkCalendar.attachEvent("onClick" , function(side , date){
		//alert(side + " + " + date);
		$('#searchRealWorkSdtPubwks005').val(dateFormat(searchRealWorkCalendar.leftCalendar.getDate()));
        if(side == "right"){
        	searchRealWorkCalendar.hide();
        	$('#searchRealWorkEdtPubwks005').val(dateFormat(searchRealWorkCalendar.rightCalendar.getDate()));
        }
	});
	
	searchRealWorkCalendar.leftCalendar.loadUserLanguage("ko"); 
	searchRealWorkCalendar.rightCalendar.loadUserLanguage("ko");
	
	saveReqstDeCalendar = new dhtmlXCalendarObject({input:"reqstDeSaveFormPubwks005"});
	saveReqstDeCalendar.attachEvent("onClick" , function(){
		if(!gf_IsNull(gf_FormGetValue('searchFormPubwks005', 'reqstDe', 'text'))){
			fn_GetThreeMonthData();		
		}
	});
	saveReqstDeCalendar.hideTime();
	saveReqstDeCalendar.loadUserLanguage("ko"); 
	
}

/**
 * 엑셀다운로드
 */
var fn_ExcelPubwks005 = function () {
    var titPubwks005 = '초과근무신청'; /* gf_LocaleTrans('default', 'titPubwks005') */
    var jsonParameter = {
        ovtimeWorkSn : gf_FormGetValue('searchFormPubwks005', 'ovtimeWorkSn', 'text')
    };
    var header = [[
        '시간외 근무 순번' /* gf_LocaleTrans('default', 'titOvtimeWorkSn') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '시간외 구분 코드' /* gf_LocaleTrans('default', 'titOvtimeSeCode') */,
        '신청 일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '신청 시작 시간' /* gf_LocaleTrans('default', 'titReqstBeginTime') */,
        '신청 종료 시간' /* gf_LocaleTrans('default', 'titReqstEndTime') */,
        '실제 근무 일자' /* gf_LocaleTrans('default', 'titRealWorkDe') */,
        '실제 시작 시간' /* gf_LocaleTrans('default', 'titRealBeginTime') */,
        '실제 종료 시간' /* gf_LocaleTrans('default', 'titRealEndTime') */,
        '실제 근무 시간' /* gf_LocaleTrans('default', 'titRealWorkTime') */,
        '매식 여부' /* gf_LocaleTrans('default', 'titMealAt') */,
        '근무 내용' /* gf_LocaleTrans('default', 'titWorkCn') */,
        '주간 인정 시간' /* gf_LocaleTrans('default', 'titDayRecogTime') */,
        '야간 인정 시간' /* gf_LocaleTrans('default', 'titNightRecogTime') */,
        '대체 휴무 사용 여부' /* gf_LocaleTrans('default', 'titAltHvofUseAt') */,
        '대체 휴무 일' /* gf_LocaleTrans('default', 'titAltHvofDe') */,
        '전자결재 상태 코드' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 문서 번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '철회 전자결재 상태 코드' /* gf_LocaleTrans('default', 'titWthdrawElctsctSttusCode') */,
        '철회 전자결재 문서 번호' /* gf_LocaleTrans('default', 'titWthdrawElctsctDocNo') */,
        '철회 여부' /* gf_LocaleTrans('default', 'titWthdrawAt') */,
        '보상 휴무 사용 여부' /* gf_LocaleTrans('default', 'titRewardHvofUseAt') */,
        '보상 휴무 잔여 시간' /* gf_LocaleTrans('default', 'titRewardHvofRemainderTime') */,
        '휴가 신청 번호' /* gf_LocaleTrans('default', 'titVacReqstNo') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'ovtimeWorkSn', 'empno', 'ovtimeSeCode', 'reqstDe', 'reqstBeginTime', 'reqstEndTime', 'realWorkDe', 'realBeginTime', 'realEndTime', 'realWorkTime', 'mealAt', 'workCn', 'dayRecogTime', 'nightRecogTime', 'altHvofUseAt', 'altHvofDe', 'elctsctSttusCode', 'elctsctDocNo', 'wthdrawElctsctSttusCode', 'wthdrawElctsctDocNo', 'wthdrawAt', 'rewardHvofUseAt', 'rewardHvofRemainderTime', 'vacReqstNo', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPubwks005 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwks005;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwks005/excelPubwks005', jsonParameter);
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
    $('#saveFormPubwks005 #ovtimeWorkSnSaveFormPubwks005').parent().append(
    '<div class="error" id="ovtimeWorkSnSaveFormPubwks005-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubwks005 = function(ovtimeWorkSn){
    if(!gf_IsNull(ovtimeWorkSn)) {
        var jsonParameter = {
            ovtimeWorkSn : ovtimeWorkSn
        };
        var dataSource = gf_NoAsyncTransaction('pubwks005/findPubwks005', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.ovtimeWorkSn)) {
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
    var state = dhxDataProcessorPubwks005.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPubwks005').validate().form()){
                if(state == 'inserted') {
                    var ovtimeWorkSn = gf_FormGetValue('saveFormPubwks005', 'ovtimeWorkSn', 'text');
                    if(fn_CheckDupPubwks005(ovtimeWorkSn)) return true;
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
    var checkOvtimeWorkSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pubwks005 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pubwks005 == 'deleted') {
        save_Row_Num_Pubwks005 = 0;
        save_Row_Ids_Pubwks005 = "";
    } else if(save_Row_Sta_Pubwks005 == 'inserted') {
        save_Row_Num_Pubwks005 = rowNum;
        save_Row_Ids_Pubwks005 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubwks005 = rowNum;
        save_Row_Ids_Pubwks005 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                else if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empnm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empnm');
                    valid = false;
                }
                else if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'reqstDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstDe');
                    valid = false;
                }
                else if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'workCn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'workCn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkOvtimeWorkSn = gf_DhxGetValue(dhxGridObjet, rowId, 'ovtimeWorkSn', 'grid');
                    if(!gf_IsNull(checkOvtimeWorkSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var ovtimeWorkSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'ovtimeWorkSn', 'grid');
                            if(((ovtimeWorkSn == checkOvtimeWorkSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ovtimeWorkSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupPubwks005( checkOvtimeWorkSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ovtimeWorkSn');
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
        dhxGridPubwks005.selectRowById(validFalseFistRowId);
        fn_FindPubwks005();
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

