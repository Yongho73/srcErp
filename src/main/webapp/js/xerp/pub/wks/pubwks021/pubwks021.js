/**
 *    프로그램       : 개인별근무유형관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.31
 *    사용테이블      : MHS_INDVDLWORKTYSEL
 * sourceGen version : 2020.07.16.01 (2020.07.31)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubwks021 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwks021 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwks021 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwks021 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwks021 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwks021 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwks021 = 0;  //그리드 삭제 수량 
var dhxGridPubwks021;  //그리드 객체
var eventIdPubwks021 = [];  //그리드 이벤트 객체 
var searchUseDtCalendar;		// 검색 폼 사용 시작 일자 달력
var saveUseSdtCalendar;			// 저장 폼 사용일자 당력
var saveUseEdtCalendar;			// 저장 폼 종료일자 당력
var dhxDataProcessorPubwks021;  //DataProcessor 객체
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
    cf_InitParamPubwks021();
    if(cf_SetComponentsPubwks021()){
       cf_SetEventListenerPubwks021();
       cf_InitFormPubwks021();
       cf_SetBindingPubwks021();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwks021 = function() {
    gf_SetMenuPath();
    $("#saveFormPubwks021").validate({ errorElement: 'div', ignore: '' });
    fn_Calendar();
    
    gf_MakeComboBasic('divComboWorkTyCode', 'searchComboWorkTyCode', 'search', '', 'mhsflx002/searchWorkTyCode', '', 'code', 'codeNm', '');
    gf_MakeComboBasic('divComboFormWorkTyCode', 'saveComboWorkTyCode', 'sel', '', 'mhsflx002/searchWorkTyCode', '', 'code', 'codeNm', '');
    
    $('#saveComboWorkTyCode').attr("required" , true);
    $("#searchFormPubwks021 #searchComboWorkTyCode").focus();
};

var cf_SetComponentsPubwks021 = function() {
    var dhxGridPubwks021HeaderInfo = [];
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('사원이름', '100', 'center', 'str', 'ro', false, 'empnm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('순번', '100', 'left', 'str', 'ro', true, 'sn', '', '')); /* gf_LocaleTrans('default', 'titSn') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('근무 유형 코드', '100', 'center', 'str', 'ro', true, 'workTyCode', '', '')); /* gf_LocaleTrans('default', 'titWorkTyCode') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('근무 유형', '*', 'center', 'str', 'ro', false, 'workTyCodeNm', '', '')); /* gf_LocaleTrans('default', 'titWorkTyCode') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('근무 시작 일자', '100', 'center', 'str', 'ro', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('근무 종료 일자', '100', 'center', 'str', 'ro', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('시작 시간', '70', 'center', 'str', 'ro', false, 'workBeginTime', '', '')); /* gf_LocaleTrans('default', 'titWorkBeginTime') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('종료 시간', '70', 'center', 'str', 'ro', false, 'workEndTime', '', '')); /* gf_LocaleTrans('default', 'titWorkEndTime') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('승인 여부 코드', '100', 'center', 'str', 'ro', true, 'confmSttusCode', '', '')); /* gf_LocaleTrans('default', 'titConfmSttusCode') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('승인 여부', '100', 'center', 'str', 'ro', false, 'confmSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titConfmSttusCode') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('승인 일자', '100', 'center', 'str', 'ro', false, 'confmDe', '', '')); /* gf_LocaleTrans('default', 'titConfmDe') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('승인자 사원번호', '100', 'center', 'str', 'ro', true, 'confmerEmpno', '', '')); /* gf_LocaleTrans('default', 'titConfmerEmpno') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('승인자 사원이름', '100', 'center', 'str', 'ro', false, 'confmerEmpnm', '', '')); /* gf_LocaleTrans('default', 'titConfmerEmpno') */
    dhxGridPubwks021HeaderInfo.push(gf_MakeDhxGridHeader('반려사유', '100', 'left', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridPubwks021 = gf_MakeDhxGrid('dataListPubwks021', dhxGridPubwks021HeaderInfo, true, false, false);
    dhxGridPubwks021.enableAutoWidth(false);
    dhxGridPubwks021.setEditable(true);

    dhxGridPubwks021.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerPubwks021 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubwks021 = gf_GridDetachEvent(dhxGridPubwks021, eventIdPubwks021);
    eventId = dhxGridPubwks021.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubwks021();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubwks021.getColumnsNum();
            var rowNum = dhxGridPubwks021.getRowsNum();
            var selectedId = dhxGridPubwks021.getSelectedRowId();
            var ind        = dhxGridPubwks021.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks021.getRowIndex(selectedId);
            var type       = dhxGridPubwks021.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubwks021.selectRow(0);
                    //fn_FindPubwks021();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubwks021.selectRow(rowIndex + 1);
                    fn_FindPubwks021();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubwks021.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks021.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubwks021.getSelectedRowId();
            var ind        = dhxGridPubwks021.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks021.getRowIndex(selectedId);
            var type       = dhxGridPubwks021.getColType(ind);
            dhxGridPubwks021.selectCell(rowIndex+1, ind);
            fn_FindPubwks021();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks021.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubwks021.getSelectedRowId();
            var ind        = dhxGridPubwks021.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks021.getRowIndex(selectedId);
            var type       = dhxGridPubwks021.getColType(ind);
            dhxGridPubwks021.selectCell(rowIndex-1, ind);
            fn_FindPubwks021();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks021.editCell();
            }
        }
        else return true;
    });
    eventIdPubwks021.push(eventId);
    eventId = dhxGridPubwks021.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubwks021SortGridList(ind, type, direction); 
    });
    eventIdPubwks021.push(eventId);
    eventId = dhxGridPubwks021.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubwks021.push(eventId);
    eventId = dhxGridPubwks021.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindPubwks021();
    });
    eventIdPubwks021.push(eventId);
    eventId = dhxGridPubwks021.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPubwks021.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwks021').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPubwks021();
    });
    $('#btnSavePubwks021').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubwks021();
    });
    $('#btnRemovePubwks021').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubwks021();
    });
    $('#btnExcelPubwks021').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwks021();
    });
    $('#btnSearchPubwks021').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubwks021('');
    });
    $('#btnResetPubwks021').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwks021();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPubwks021 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPubwks021').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks021').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#searchFormPubwks021 select[name="searchComboWorkTyCode"]').unbind('change').bind('change',function() {
        gf_errorMsgClear();
        fn_SearchPubwks021('');
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubwks021 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubwks021",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks021 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'empno', $(this).val());
    });
    $('#saveFormPubwks021 input[name="sn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'sn', $(this).val());
    });
    $('#saveFormPubwks021 select[name="saveComboWorkTyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() == '' || $(this).val() == null){
        	gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'workTyCodeNm', '');
        	gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'workTyCode', '');
        } else {
        	gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'workTyCodeNm', $("#saveFormPubwks021 select[name='saveComboWorkTyCode'] option:selected").text());
        	gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'workTyCode', $("#saveFormPubwks021 select[name='saveComboWorkTyCode'] option:selected").val());
        }
    });
    $('#saveFormPubwks021 input[name="useBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var tmp = gf_FormGetValue('saveFormPubwks021', 'useBeginDe', 'text');
        var Sdate = new Date(tmp);
        Sdate.setDate(Sdate.getDate() - 1);
        saveUseEdtCalendar.setInsensitiveRange(null , Sdate);
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'useBeginDe', $(this).val());
    });
    $('#saveFormPubwks021 input[name="useEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
	      var tmp = gf_FormGetValue('saveFormPubwks021', 'useEndDe', 'text');
	      var Edate = new Date(tmp);
	      Edate.setDate(Edate.getDate() + 1);
	      saveUseSdtCalendar.setInsensitiveRange(Edate , null);    
	      gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'useEndDe', $(this).val());
    });
    $('#saveFormPubwks021 input[name="workBeginTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'workBeginTime', $(this).val());
    });
    $('#saveFormPubwks021 input[name="workEndTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'workEndTime', $(this).val());
    });
    $('#saveFormPubwks021 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'rm', $(this).val());
    });
    $('#saveFormPubwks021 input[name="confmSttusCode"]').unbind('change blur').bind('change blur',function() { 
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'confmSttusCode', $(this).val());
    });
    $('#saveFormPubwks021 input[name="confmDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'confmDe', $(this).val());
    });
    $('#saveFormPubwks021 input[name="confmerEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'confmerEmpno', $(this).val());
    });
    $('#saveFormPubwks021 input[name="returnResn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks021, dhxDataProcessorPubwks021, 'returnResn', $(this).val());
    });
    $('#approvalBtn').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        fn_ApprovalReqst();
    });
    $('#copyBtn').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        fn_CopyData();
    });    
    // 폼 이벤트 end ============================================================================================
	// 달력 이벤트 ================================================================================================
    //검색 사용일자
    $('#searchFormPubwks021 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#searchFormPubwks021 #searchUseDt').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	searchUseDtCalendar.show();
    });
    //저장 사용일자
    $('#saveFormPubwks021 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#searchFormPubwks021 *').attr("autoComplete" , "off");
    $('#saveFormPubwks021 *').attr("autoComplete" , "off");

};

var cf_InitFormPubwks021 = function() {
    $('#searchFormPubwks021').resetForm();
    
	gf_FormSetValue("searchFormPubwks021", "deptCode", sessionUserDeptCode , '');
	gf_FormSetValue("searchFormPubwks021", "deptCodeNm", sessionUserDeptNm , '');
	gf_FormSetValue("searchFormPubwks021", "empno", sessionUserEmpno , '');
	gf_FormSetValue("searchFormPubwks021", "empNm", sessionUserEmpnm , '');
};

var cf_SetBindingPubwks021 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SessionCheck();
    fn_SearchPubwks021('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPubwks021 = function(userId) {
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormPubwks021', 'empno', 'text'),
        workTyCode : gf_FormGetValue('searchFormPubwks021', 'searchComboWorkTyCode', 'combo'),
        useBeginDe : gf_FormGetValue('searchFormPubwks021', 'searchUseSdt', 'text').replaceAll('-',''),
        useEndDe : gf_FormGetValue('searchFormPubwks021', 'searchUseEdt', 'text').replaceAll('-','')
    };
    gf_Transaction(userId, 'pubwks021/searchPubwks021', jsonParameter, 'fn_CallbackSearchPubwks021', false, 'GET');
};

var fn_CallbackSearchPubwks021 = function(strSvcID, targetID, data) {
    //dhxGridPubwks021.clearAll();
    dhxGridPubwks021.destructor();
    if(cf_SetComponentsPubwks021()){ 
        fn_DhxDataProcessorPubwks021(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPubwks021');
            dhxGridPubwks021.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pubwks021 == 0 && save_All_Sta_Pubwks021 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPubwks021.selectRow(0); 
            } else if(save_Row_Sta_Pubwks021 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPubwks021.selectRow(0);
            } else if(save_All_Sta_Pubwks021 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPubwks021.selectRow(save_Row_Num_Pubwks021); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPubwks021.selectRow(save_Row_Num_Pubwks021);   //개발자 수정 필요  
                //var findCell = dhxGridPubwks021.findCell(save_Row_Ids_Pubwks021, gf_GetDhxGridColumId(dhxGridPubwks021,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPubwks021.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPubwks021.selectRow(0);
                //} 
            } 
 
            fn_FindPubwks021();
        } else {
            gf_NoFoundDataOnGridMsg('dataListPubwks021');
            fn_InitInputFormPubwks021();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormPubwks021").text(data.data.records.length);
        cf_SetEventListenerPubwks021();
    } 
};
var fn_DhxDataProcessorPubwks021 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubwks021 = new dataProcessor(gv_ContextPath+'/pubwks021/savePubwks021'); //lock feed url
    dhxDataProcessorPubwks021.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubwks021.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubwks021.init(dhxGridPubwks021); //link dataprocessor to the grid
    dhxDataProcessorPubwks021.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubwks021.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubwks021.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
    		if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" && dataSource.data.valCheck.length < 1){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubwks021();
                    $("#checkAllPubwks021").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
            	var rowId = dhxGridPubwks021.getSelectedRowId();
        		var failData = dataSource.data.valCheck;
        		var str = "";
        		for(var i = 0 ; i < failData.length ; i++){
        			str += (failData[i].empnm + '[' + failData[i].workTyCodeNm + ']\n');
        		}
        		str += '근무일자가 중복되었습니다.';
        		gf_DivMsgAlert(str);
        		gf_DhxSetValue(dhxGridPubwks021, rowId, 'confmSttusCode', '' , 'grid');
        		dhxDataProcessorPubwks021.setUpdated(rowId, true, 'inserted');
        		return false;
            }
    });
};
$(document).click(function(e){ //문서 body를 클릭했을때
    if(e.target.id =="searchUseDt" || e.target.id =="searchUseSdtPubwks021" || e.target.id =="searchUseEdtPubwks021") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchUseDtCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
var fn_Calendar = function(){
	// 검색 폼 사용일자 달력
	searchUseDtCalendar = new dhtmlXDoubleCalendar("searchUseDt_cal");
	searchUseDtCalendar.attachEvent("onClick" , function(side , date){
		$('#searchUseSdtPubwks021').val(dateFormat(searchUseDtCalendar.leftCalendar.getDate()));
		if(side == "right"){
			$('#searchUseEdtPubwks021').val(dateFormat(searchUseDtCalendar.rightCalendar.getDate()));
			searchUseDtCalendar.hide();
		}
	});
	
	searchUseDtCalendar.leftCalendar.loadUserLanguage("ko"); 
	searchUseDtCalendar.rightCalendar.loadUserLanguage("ko");
	
	// 저장 폼 사용일자 달력
	saveUseSdtCalendar = new dhtmlXCalendarObject({input:"useBeginDeSaveFormPubwks021"});
	saveUseEdtCalendar = new dhtmlXCalendarObject({input:"useEndDeSaveFormPubwks021"});
	
	saveUseSdtCalendar.hideTime(); 
	saveUseEdtCalendar.hideTime();
	saveUseSdtCalendar.loadUserLanguage("ko"); 
	saveUseEdtCalendar.loadUserLanguage("ko");
}
// 승인 요청
var fn_ApprovalReqst = function(){
	var rowId =  dhxGridPubwks021.getSelectedRowId();
	var paramSn = gf_DhxGetValue(dhxGridPubwks021, rowId, 'sn',  'grid');
	var paramEmpno = gf_DhxGetValue(dhxGridPubwks021, rowId, 'empno',  'grid');
	var sttusCode = gf_DhxGetValue(dhxGridPubwks021, rowId, 'confmSttusCode',  'grid');
	var sttusCodeNm = gf_DhxGetValue(dhxGridPubwks021, rowId, 'confmSttusCodeNm',  'grid');
	if(gf_IsNull(sttusCode) && !gf_IsNull(paramSn)){	// 임시저장 후 승인신청 하였을 때
		var jsonParameter = {
			empno : paramEmpno,
			sn : paramSn,
			confmSttusCode : "001" 
		}
		var dataSource = gf_NoAsyncTransaction('pubwks021/updateSttusPubwks021', jsonParameter , 'GET'); 
		var data = dataSource.data;
		if(data.code == '000'){
			gf_DivMsgAlert(gv_MsgSave);
			fn_SearchPubwks021('');
		}
	}
	else if(gf_IsNull(sttusCode) && gf_IsNull(paramSn)){	// 최초 신규 작성 시 승인신청 하였을 때
		gf_DhxSetValue(dhxGridPubwks021, rowId, 'confmSttusCode', '001' , 'grid');
		dhxDataProcessorPubwks021.sendData(rowId);
	}
	else{
		gf_DivMsgAlert(sttusCodeNm + "은 승인 요청을 하실 수 없습니다.");
	}
}
// 복사
var fn_CopyData = function(){
	var rowId =  dhxGridPubwks021.getSelectedRowId();
	var sttusCode = gf_DhxGetValue(dhxGridPubwks021, rowId, 'confmSttusCode',  'grid');
	if(sttusCode != '003'){
		gf_DivMsgAlert("반려 상태만 복사가 가능합니다.");
	}
	else{
		dhxGridPubwks021.clearSelection();
		fn_InitInputFormPubwks021();
		var initValueArr = [];
		initValueArr.push(''); //no
		initValueArr.push(sessionUserEmpno); //empno
		initValueArr.push(sessionUserEmpnm); //empnm
		initValueArr.push(''); //sn
		initValueArr.push(gf_DhxGetValue(dhxGridPubwks021, rowId, 'workTyCode',  'grid')); //workTyCode
		initValueArr.push(gf_DhxGetValue(dhxGridPubwks021, rowId, 'workTyCodeNm',  'grid')); //workTyCodeNm
		initValueArr.push(gf_DhxGetValue(dhxGridPubwks021, rowId, 'useBeginDe',  'grid')); //useBeginDe
		initValueArr.push(gf_DhxGetValue(dhxGridPubwks021, rowId, 'useEndDe',  'grid')); //useEndDe
		initValueArr.push(gf_DhxGetValue(dhxGridPubwks021, rowId, 'workBeginTime',  'grid')); //workBeginTime
		initValueArr.push(gf_DhxGetValue(dhxGridPubwks021, rowId, 'workEndTime',  'grid')); //workEndTime
		initValueArr.push(gf_DhxGetValue(dhxGridPubwks021, rowId, 'rm',  'grid')); //rm
		initValueArr.push(''); //confmSttusCode
		initValueArr.push(''); //confmSttusCodeNm
		initValueArr.push(''); //confmDe
		initValueArr.push(''); //confmerEmpno
		initValueArr.push(''); //confmerEmpnm
		initValueArr.push(''); //returnResn
		dhxGridPubwks021.addRow(dhxGridPubwks021.uid(), initValueArr, 0);
		dhxGridPubwks021.selectRow(0);
		gf_NoFoundDataOnGridMsgRemove('dataListPubwks021');
		$('#btnPopEmpSearchPubwks021').show();
		fn_FormDisabled(false);
		fn_FindPubwks021('');
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

    	gf_FormSetValue("searchFormPubwks021", "deptCode", sessionUserDeptCode , '');
    	gf_FormSetValue("searchFormPubwks021", "deptCodeNm", sessionUserDeptNm , '');
    	gf_FormSetValue("searchFormPubwks021", "empno", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormPubwks021", "empNm", sessionUserEmpnm , '');
    }	
}
/**
 * 상세조회
 */
var fn_FindPubwks021 = function() {
    var rId = dhxGridPubwks021.getSelectedRowId();
    var status = dhxDataProcessorPubwks021.getState(rId);
    var sttusCode = gf_DhxGetValue(dhxGridPubwks021, rId, 'confmSttusCode',  'grid')
    fn_FormDisabled(false);

    gf_FormSetValue("saveFormPubwks021", "empno", gf_DhxGetValue(dhxGridPubwks021, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "sn", gf_DhxGetValue(dhxGridPubwks021, rId, 'sn',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "saveComboWorkTyCode", gf_DhxGetValue(dhxGridPubwks021, rId, 'workTyCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubwks021", "useBeginDe", gf_DhxGetValue(dhxGridPubwks021, rId, 'useBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "useEndDe", gf_DhxGetValue(dhxGridPubwks021, rId, 'useEndDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "workBeginTime", gf_DhxGetValue(dhxGridPubwks021, rId, 'workBeginTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "workEndTime", gf_DhxGetValue(dhxGridPubwks021, rId, 'workEndTime',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "rm", gf_DhxGetValue(dhxGridPubwks021, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "confmDe", gf_DhxGetValue(dhxGridPubwks021, rId, 'confmDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "confmerEmpno", gf_DhxGetValue(dhxGridPubwks021, rId, 'confmerEmpno',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "confmerEmpnm", gf_DhxGetValue(dhxGridPubwks021, rId, 'confmerEmpnm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks021", "returnResn", gf_DhxGetValue(dhxGridPubwks021, rId, 'returnResn',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormPubwks021 input[name="empno"]').prop('disabled', false);
        $('#saveFormPubwks021 input[name="sn"]').prop('disabled', false);
    }
    else if(!gf_IsNull(sttusCode)){
    	$("#saveFormPubwks021 *").attr('disabled' , true);
    }
    else {
        $('#saveFormPubwks021 input[name="empno"]').prop('disabled', true);
        $('#saveFormPubwks021 input[name="sn"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubwks021 = function() {
    $('#saveFormPubwks021 input[name="empno"]').prop('disabled', false);
    $('#saveFormPubwks021 input[name="sn"]').prop('disabled', false);
    $('#saveFormPubwks021').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormPubwks021 *').prop('disabled', status);
    
    $('#saveFormPubwks021 #returnResnSaveFormPubwks021').prop('disabled', true);
    $('#saveFormPubwks021 #confmDeSaveFormPubwks021').prop('disabled', true);
    $('#saveFormPubwks021 #confmerEmpnmSaveFormPubwks021').prop('disabled', true);
    
};
/**
 * 추가(신규) 
 */
var fn_AddPubwks021 = function() {
	var jsonParameter = {
			empno : sessionUserEmpno
	};
	var dataSource = gf_NoAsyncTransaction('pubwks021/findNoSttusPubwks021', jsonParameter , 'GET');
    var data = dataSource.data;
    if(!gf_IsNull(data.empno)){
    	gf_DivMsgAlert(data.useBeginDe + " ~ " + data.useEndDe + " [" + data.workTyCodeNm + "] 승인을 완료 하여주세요.");
    }
    else{
    	dhxGridPubwks021.clearSelection();
    	fn_InitInputFormPubwks021();
    	var initValueArr = [];
    	initValueArr.push(''); //no
    	initValueArr.push(sessionUserEmpno); //empno
    	initValueArr.push(sessionUserEmpnm); //empnm
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
    	dhxGridPubwks021.addRow(dhxGridPubwks021.uid(), initValueArr, 0);
    	dhxGridPubwks021.selectRow(0);
    	gf_NoFoundDataOnGridMsgRemove('dataListPubwks021');
    	$('#btnPopEmpSearchPubwks021').show();
    	fn_FormDisabled(false);
    	fn_FindPubwks021('');
    }
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubwks021SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubwks021, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubwks021', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubwks021', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubwks021, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubwks021.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubwks021', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubwks021', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks021, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubwks021.setSortImgState(false); 
            gf_FormSetValue('searchFormPubwks021', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubwks021', 'sortColumId', '', 'text'); 
            dhxGridPubwks021.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubwks021.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubwks021', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubwks021', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks021, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubwks021 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubwks021 = 0; 
    save_Edt_Cnt_Pubwks021 = 0; 
    save_Del_Cnt_Pubwks021 = 0; 
    dhxGridPubwks021.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubwks021.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubwks021.getState(rowId); 
            if(state == 'inserted') { 
                save_Add_Cnt_Pubwks021 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubwks021 += 1; 
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
        save_All_Sta_Pubwks021 = 0; 
        if(save_Add_Cnt_Pubwks021 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pubwks021 + "건";
            save_All_Sta_Pubwks021 = 1; 
        } 
        if(save_Edt_Cnt_Pubwks021 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pubwks021 + "건"; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPubwks021(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubwks021(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPubwks021 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubwks021_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubwks021_Send = function() {
    if(fn_GridValidation(dhxGridPubwks021, dhxDataProcessorPubwks021)) {
        dhxDataProcessorPubwks021.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemovePubwks021 = function() {
	var rowId = dhxGridPubwks021.getSelectedRowId();
    var state = dhxDataProcessorPubwks021.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridPubwks021.getRowIndex(rowId);
        dhxGridPubwks021.deleteRow(rowId);
        dhxGridPubwks021.selectRow(rowNum);
        fn_FindPubwks021();
    }
    else gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePubwks021Exe(' + rowId + ')', '');
}
/**
 * 삭제 진행
 */
var fn_RemovePubwks021Exe = function(rowId){
	var paramSn = gf_DhxGetValue(dhxGridPubwks021, rowId, 'sn', 'grid');
	var paramEmpno = gf_DhxGetValue(dhxGridPubwks021, rowId, 'empno', 'grid');
	var paramSttusCode = gf_DhxGetValue(dhxGridPubwks021, rowId, 'confmSttusCode', 'grid');
	var paramSttusCodeNm = gf_DhxGetValue(dhxGridPubwks021, rowId, 'confmSttusCodeNm', 'grid');
	if(gf_IsNull(paramSn) || gf_IsNull(paramEmpno)){
		gf_DivMsgAlert("순번 또는 사원번호가 선택되지 않았습니다.");
	}
	else if(!gf_IsNull(paramSttusCodeNm)){
		gf_DivMsgAlert(paramSttusCodeNm + "상태는 삭제할 수 없습니다.");
	}
	else{
		var jsonParameter = {
				sn : paramSn,
				empno : paramEmpno
		}
		var dataSource = gf_NoAsyncTransaction('pubwks021/deletePubwks021', jsonParameter, 'GET');
		if(dataSource.code == "000"){
			gf_DivMsgAlert(gv_MsgDelete);
			fn_SearchPubwks021('');
		}
	}
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubwks021 = function () {
    var titPubwks021 = '개인별근무유형관리'; /* gf_LocaleTrans('default', 'titPubwks021') */
    var jsonParameter = {
            empno : gf_FormGetValue('searchFormPubwks021', 'empno', 'text'),
            workTyCode : gf_FormGetValue('searchFormPubwks021', 'searchComboWorkTyCode', 'combo'),
            useBeginDe : gf_FormGetValue('searchFormPubwks021', 'searchUseSdt', 'text').replaceAll('-',''),
            useEndDe : gf_FormGetValue('searchFormPubwks021', 'searchUseEdt', 'text').replaceAll('-','')
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
    var dataId = [[ 'empnm', 'workTyCodeNm', 'useBeginDe', 'useEndDe', 'workBeginTime', 'workEndTime', 'confmSttusCodeNm', 'confmDe', 'confmerEmpnm', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titPubwks021 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwks021;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwks021/excelPubwks021', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
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
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormPubwks021 #empnoSaveFormPubwks021').parent().append(
    '<div class="error" id="empnoSaveFormPubwks021-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormPubwks021 #snSaveFormPubwks021').parent().append(
    '<div class="error" id="snSaveFormPubwks021-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubwks021 = function(empno, sn){
    if(!gf_IsNull(empno) && !gf_IsNull(sn)) {
        var jsonParameter = {
            empno : empno,
            sn : sn
        };
        var dataSource = gf_NoAsyncTransaction('pubwks021/findPubwks021', jsonParameter, 'GET');
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
    var state = dhxDataProcessorPubwks021.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPubwks021').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormPubwks021', 'empno', 'text');
                    var sn = gf_FormGetValue('saveFormPubwks021', 'sn', 'text');
                    if(fn_CheckDupPubwks021(empno, sn)) return true;
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
    save_Row_Sta_Pubwks021 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pubwks021 == 'deleted') {
        save_Row_Num_Pubwks021 = 0;
        save_Row_Ids_Pubwks021 = "";
    } else if(save_Row_Sta_Pubwks021 == 'inserted') {
        save_Row_Num_Pubwks021 = rowNum;
        save_Row_Ids_Pubwks021 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubwks021 = rowNum;
        save_Row_Ids_Pubwks021 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
//                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
//                    if(!gf_IsNull(checkEmpno)) {
//                        // 신규입력 key 그리드 중복 체크
//                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
//                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
//                            if((empno == checkEmpno) && (rowId != rowIdForCheck)) {
//                                validFalseDuplicationKey = true;
//                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
//                                valid = false;
//                            }
//                        });
//                        // 신규입력 key db 중복 체크
//                        if(!fn_CheckDupPubwks021( checkEmpno)){
//                            validFalseDuplicationKey = true;
//                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
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
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
    	dhxGridPubwks021.selectRowById(validFalseFistRowId);
        fn_FindPubwks021();
        fn_FormValidation(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) {
    	return true;
    }
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
