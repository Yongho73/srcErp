/**
 *    프로그램       : 직원계좌조회 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.06
 *    사용테이블      : MHS_ACNUT
 * sourceGen version : 2020.07.16.01 (2020.08.06)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsbsc017 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsbsc017 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsbsc017 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsbsc017 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsbsc017 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsbsc017 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsbsc017 = 0;  //그리드 삭제 수량 
var dhxGridMpsbsc017;  //그리드 객체 
var eventIdMpsbsc017 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpsbsc017;  //DataProcessor 객체
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsbsc017();
    if(init()){   // 초기화
		init1();  // 일반달력 초기화
		init2();
	}
    if(cf_SetComponentsMpsbsc017()){
       cf_SetEventListenerMpsbsc017();
       cf_InitFormMpsbsc017();
       cf_SetBindingMpsbsc017();
    }
    
    /*var n1  = new Date(2014, 1, 1);
    var n2  = new Date(2013, 1, 21);
    
    if ( dateFormat(n1)>dateFormat(n2))
    	alert('n1이 더 큼');
    else
    	alert('n2가 더 큼');
    */
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc017 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsbsc017").validate({ errorElement: 'div', ignore: '' });
    
    gf_MakeComboBasic('divComboBplcKorNm', 'searchComboStmBizplc', 'sel', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '');
    
    gf_ComboCode('divComboAcnutSeCode', 'acnutSeCodeSaveFormMpsbsc017', 'acnutSeCode', 'sel', 'C471', '' , '', '', 'ordr','');
    gf_ComboCode('divComboBankCode', 'bankCodeSaveFormMpsbsc017', 'bankCode', 'sel', 'C010', '' , '', '', 'ordr','');
    
    $('#btnEmpSearchSaveFormMpsbsc017').hide();
    
    $('#empNmSearchMpsbsc017').focus();
    
};

var cf_SetComponentsMpsbsc017 = function() {
    var dhxGridMpsbsc017HeaderInfo = [];
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '30', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc017" />', '30', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('직원', '60', 'center', 'str', 'ro', false, 'empNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('계좌구분', '70', 'center', 'str', 'coro', false, 'acnutSeCode', '', '')); /* gf_LocaleTrans('default', 'titAcnutSeCode') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('은행', '85', 'center', 'str', 'coro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankNm') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '*', 'center', 'str', 'ro', false, 'acnutno', '', '')); /* gf_LocaleTrans('default', 'titAcnutno') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '70', 'center', 'str', 'ro', false, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('시작일자', '90', 'center', 'str', 'ro', false, 'beginDe', '', '')); /* gf_LocaleTrans('default', 'titBeginDe') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('종료일자', '90', 'center', 'str', 'ro', false, 'endDe', '', '')); /* gf_LocaleTrans('default', 'titEndDe') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */

    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('계좌순번', '100', 'right', 'int', 'ro', true, 'acnutSn', '', '')); /* gf_LocaleTrans('default', 'titAcnutSn') */
    //dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('은행코드', '100', 'center', 'str', 'ro', true, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMpsbsc017HeaderInfo.push(gf_MakeDhxGridHeader('통장 첨부파일번호', '100', 'center', 'str', 'ro', true, 'bnkbAtchmnflno', '', '')); /* gf_LocaleTrans('default', 'titBnkbAtchmnflno') */
    dhxGridMpsbsc017 = gf_MakeDhxGrid('dataListMpsbsc017', dhxGridMpsbsc017HeaderInfo, true, false, false);
    dhxGridMpsbsc017.enableAutoWidth(false);
    dhxGridMpsbsc017.setEditable(true);
    
    var comboBankCode = dhxGridMpsbsc017.getCombo(dhxGridMpsbsc017.getColIndexById("bankCode"));
	gf_MakeComboGrid(comboBankCode, 'sel', 'cmmnCode/getCmmnCode', 'code', 'codeNm', {codekindCode : "C010",exceptCode :"",sortOrder :"ordr" }); //은행코드 리스트
	
	var comboAcnutSeCode = dhxGridMpsbsc017.getCombo(dhxGridMpsbsc017.getColIndexById("acnutSeCode"));
	gf_MakeComboGrid(comboAcnutSeCode, 'sel', 'cmmnCode/getCmmnCode', 'code', 'codeNm', {codekindCode : "C471",exceptCode :"",sortOrder :"ordr" });

    dhxGridMpsbsc017.setColumnMinWidth(120,5); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
    
    $('#btnEmpSearchSaveFormMpsbsc017').hide();
};

var cf_SetEventListenerMpsbsc017 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsbsc017 = gf_GridDetachEvent(dhxGridMpsbsc017, eventIdMpsbsc017);
    eventId = dhxGridMpsbsc017.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsbsc017();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsbsc017.getColumnsNum();
            var rowNum = dhxGridMpsbsc017.getRowsNum();
            var selectedId = dhxGridMpsbsc017.getSelectedRowId();
            var ind        = dhxGridMpsbsc017.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc017.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc017.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsbsc017.selectRow(0);
                    //fn_FindMpsbsc017();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsbsc017.selectRow(rowIndex + 1);
                    fn_FindMpsbsc017();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsbsc017.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc017.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsbsc017.getSelectedRowId();
            var ind        = dhxGridMpsbsc017.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc017.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc017.getColType(ind);
            dhxGridMpsbsc017.selectCell(rowIndex+1, ind);
            fn_FindMpsbsc017();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc017.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsbsc017.getSelectedRowId();
            var ind        = dhxGridMpsbsc017.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc017.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc017.getColType(ind);
            dhxGridMpsbsc017.selectCell(rowIndex-1, ind);
            fn_FindMpsbsc017();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc017.editCell();
            }
        }
        else return true;
    });
    eventIdMpsbsc017.push(eventId);
    eventId = dhxGridMpsbsc017.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsbsc017SortGridList(ind, type, direction); 
    });
    eventIdMpsbsc017.push(eventId);
    eventId = dhxGridMpsbsc017.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc017.push(eventId);
    eventId = dhxGridMpsbsc017.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMpsbsc017();
        
        if(dhxDataProcessorMpsbsc017.getState(id) != 'inserted') {
        	$('#btnEmpSearchSaveFormMpsbsc017').hide();
        }else {$('#btnEmpSearchSaveFormMpsbsc017').show();
        //alert('2');
        }
        
    });
    eventIdMpsbsc017.push(eventId);
    eventId = dhxGridMpsbsc017.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc017, 'acnutSeCode') || cInd == gf_GetDhxGridColumId(dhxGridMpsbsc017, 'bankCode')) { return false; }
        return true;
    });
    eventIdMpsbsc017.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsbsc017').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsbsc017()
    });
    $('#btnSaveMpsbsc017').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc017();
    });
    $('#btnRemoveMpsbsc017').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsbsc017();
    });
    $('#btnExcelMpsbsc017').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc017();
    });
    $('#btnSearchMpsbsc017').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsbsc017('');
    });
    $('#btnResetMpsbsc017').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc017();
    });
    $('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMpsbsc017","empnoSearchMpsbsc017","empNmSearchMpsbsc017",'', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
    //사원 입력 후 Enter 이벤트
	$('#empnoSearchMpsbsc017').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMpsbsc017', 'empNm', '', 'text');
		}
    });
	$('#empNmSearchMpsbsc017').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMpsbsc017', 'empno', '', 'text');
		}
    });
	$('#saveFormMpsbsc017 #acnutnoSaveFormMpsbsc017').unbind('keydown').bind('keydown',function(event) {
		var jnum = $('#saveFormMpsbsc017 #acnutnoSaveFormMpsbsc017').val();
		var rJnum = "";
		
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		rJnum = jnum;
		$('#saveFormMpsbsc017 #acnutnoSaveFormMpsbsc017').val(rJnum);
//		if((event.keyCode >= 48 && event.keyCode <= 57)){
//			return true;
//		}else{
//			event.returnValue = false;
//		}
		
		
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpsbsc017').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpsbsc017, $('#checkAllMpsbsc017').prop('checked'), 'chk');
    });
    $('#searchFormMpsbsc017 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "empnoSearchMpsbsc017"){
        		fn_SearchMhsEmpEmpCode();
        		return false;
        	}
        	if(this.id == "empNmSearchMpsbsc017"){
        		fn_SearchMhsEmpEmpCode();
        		return false;
        	}
        	$('#btnSearchMpsbsc017').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsbsc017').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMpsbsc017 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMpsbsc017",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsbsc017 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'empno', $(this).val());
    });
    $('#saveFormMpsbsc017 input[name="empNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'empNm', $(this).val());
    });
    $('#saveFormMpsbsc017 input[name="acnutSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'acnutSn', $(this).val());
    });
    $('#saveFormMpsbsc017 select[name="acnutSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'acnutSeCode', this.value);
    });
    $('#saveFormMpsbsc017 select[name="bankCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        //gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'bankCode', $(this).val());
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'bankCode', this.value);
    });
    $('#saveFormMpsbsc017 input[name="bankNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'bankNm', $(this).val());
    });
    $('#saveFormMpsbsc017 input[name="acnutno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'acnutno', $(this).val());
    });
    $('#saveFormMpsbsc017 input[name="dpstrNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'dpstrNm', $(this).val());
    });
    $('#saveFormMpsbsc017 input[name="beginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'beginDe', $(this).val());
    });
   
    $('#saveFormMpsbsc017 input[name="endDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'endDe', $(this).val());
    });
    $('#saveFormMpsbsc017 input[name="bnkbAtchmnflno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'bnkbAtchmnflno', $(this).val());
    });
    $('#saveFormMpsbsc017 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017, 'rm', $(this).val());
    });
    $('#saveFormMpsbsc017 #btnEmpSearchSaveFormMpsbsc017').unbind('click').bind('click', function(event){
    	console.log(111);
		gf_EmpPopup("saveFormMpsbsc017","empnoSaveFormMpsbsc017","empNmSaveFormMpsbsc017", gf_FormGetValue('searchFormMpsbsc017', 'searchComboStmBizplc', 'combo'), "N", "fn_CallbackPopEmpSave");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMpsbsc017 = function() {
    $('#searchFormMpsbsc017').resetForm();
};

var cf_SetBindingMpsbsc017 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMpsbsc017('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc017 = function(userId) {
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpsbsc017', 'empno', 'text'),
        empNm : gf_FormGetValue('searchFormMpsbsc017', 'empNm', 'text')
    };
    gf_Transaction(userId, 'mpsbsc017/searchMpsbsc017', jsonParameter, 'fn_CallbackSearchMpsbsc017', false, 'GET');
};

var fn_CallbackSearchMpsbsc017 = function(strSvcID, targetID, data) {
    //dhxGridMpsbsc017.clearAll();
    dhxGridMpsbsc017.destructor();
    if(cf_SetComponentsMpsbsc017()){ 
        fn_DhxDataProcessorMpsbsc017(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc017');
            dhxGridMpsbsc017.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mpsbsc017 == 0 && save_All_Sta_Mpsbsc017 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsbsc017.selectRow(0); 
            } else if(save_Row_Sta_Mpsbsc017 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsbsc017.selectRow(0);
            } else if(save_All_Sta_Mpsbsc017 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsbsc017.selectRow(save_Row_Num_Mpsbsc017); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsbsc017.selectRow(save_Row_Num_Mpsbsc017);   //개발자 수정 필요  
                //var findCell = dhxGridMpsbsc017.findCell(save_Row_Ids_Mpsbsc017, gf_GetDhxGridColumId(dhxGridMpsbsc017,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsbsc017.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsbsc017.selectRow(0);
                //} 
            } 
 
            fn_FindMpsbsc017();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsbsc017');
            fn_InitInputFormMpsbsc017();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMpsbsc017").text(data.data.records.length);
        cf_SetEventListenerMpsbsc017();
    } 
};
var fn_DhxDataProcessorMpsbsc017 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc017 = new dataProcessor(gv_ContextPath+'/mpsbsc017/saveMpsbsc017'); //lock feed url
    dhxDataProcessorMpsbsc017.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc017.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc017.init(dhxGridMpsbsc017); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc017.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc017.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc017.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc017();
                    $("#checkAllMpsbsc017").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMpsbsc017 = function() {
    var rId = dhxGridMpsbsc017.getSelectedRowId();
    var status = dhxDataProcessorMpsbsc017.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMpsbsc017", "empNm", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'empNm',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "acnutSn", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'acnutSn',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "acnutSeCode", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'acnutSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpsbsc017", "bankCode", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'bankCode',  'grid'), 'combo');
    //gf_FormSetValue("saveFormMpsbsc017", "bankNm", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'bankNm',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "acnutno", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'acnutno',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "dpstrNm", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'dpstrNm',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "beginDe", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'beginDe',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "endDe", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'endDe',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "bnkbAtchmnflno", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'bnkbAtchmnflno',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "rm", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc017", "empno", gf_DhxGetValue(dhxGridMpsbsc017, rId, 'empno',  'grid'), '');

    /*if(status == 'inserted') {
        //$('#saveFormMpsbsc017 input[name="empNm"]').prop('disabled', false);
        //$('#saveFormMpsbsc017 input[name="acnutSn"]').prop('disabled', false);
    } else {
        $('#saveFormMpsbsc017 input[name="empNm"]').prop('disabled', true);
        $('#saveFormMpsbsc017 input[name="acnutSn"]').prop('disabled', true);
    }*/
    $('#saveFormMpsbsc017 input[name="empNm"]').prop('disabled', true);
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMpsbsc017 = function() {
    $('#saveFormMpsbsc017 input[name="empNm"]').prop('disabled', false);
    $('#saveFormMpsbsc017 input[name="acnutSeCode"]').prop('disabled', false);
    $('#saveFormMpsbsc017').resetForm();
    
    gf_FormSetValue("saveFormMpsbsc017", "acnutSeCode", '001', 'combo');
    gf_FormSetValue("saveFormMpsbsc017", "bankCode", '002', 'combo');
    
    gf_FormSetValue("saveFormMpsbsc017", "beginDe", new Date().format('YYYY-MM-DD'), '');
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMpsbsc017 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMpsbsc017 = function() {
    dhxGridMpsbsc017.clearSelection();
    fn_InitInputFormMpsbsc017();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //empNm
    initValueArr.push('001'); //acnutSeCode
    initValueArr.push('002'); //bankNm
    initValueArr.push(''); //acnutno
    initValueArr.push(''); //dpstrNm
    initValueArr.push(new Date().format('YYYY-MM-DD')); //beginDe
    initValueArr.push(''); //endDe
    initValueArr.push(''); //bnkbAtchmnflno
    initValueArr.push(''); //bankCode
    initValueArr.push(''); //acnutSn
    initValueArr.push(''); //rm
    dhxGridMpsbsc017.addRow(dhxGridMpsbsc017.uid(), initValueArr, 0);
    dhxGridMpsbsc017.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc017');
    //$('#btnPopEmpSearchMpsbsc017').show();
    $('#btnEmpSearchSaveFormMpsbsc017').show();
    $('#saveFormMpsbsc017 input[name="empNm"]').prop('disabled', true);
    //fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsbsc017SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsbsc017, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsbsc017', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsbsc017', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsbsc017, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsbsc017.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsbsc017', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsbsc017', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc017, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsbsc017.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsbsc017', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsbsc017', 'sortColumId', '', 'text'); 
            dhxGridMpsbsc017.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsbsc017.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsbsc017', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsbsc017', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc017, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc017 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsbsc017 = 0; 
    save_Edt_Cnt_Mpsbsc017 = 0; 
    save_Del_Cnt_Mpsbsc017 = 0; 
    dhxGridMpsbsc017.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsbsc017.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsbsc017.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsbsc017 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsbsc017 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsbsc017 += 1; 
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
        save_All_Sta_Mpsbsc017 = 0; 
        if(save_Add_Cnt_Mpsbsc017 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsbsc017 + "건";
            save_All_Sta_Mpsbsc017 = 1; 
        } 
        if(save_Edt_Cnt_Mpsbsc017 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsbsc017 + "건"; 
        } 
        if(save_Del_Cnt_Mpsbsc017 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsbsc017 + "건"; 
            save_All_Sta_Mpsbsc017 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsbsc017(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsbsc017(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsbsc017 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsbsc017_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsbsc017_Send = function() {
    if(fn_GridValidation(dhxGridMpsbsc017, dhxDataProcessorMpsbsc017)) {
        dhxDataProcessorMpsbsc017.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsbsc017 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsbsc017, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpsbsc017.forEachRow(function(rowId) {
            state = dhxDataProcessorMpsbsc017.getState(rowId);
            if(dhxGridMpsbsc017.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsbsc017, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpsbsc017.getRowIndex(rowId);
                    dhxGridMpsbsc017.deleteRow(rowId);
                    dhxGridMpsbsc017.selectRow(rowNum);
                    fn_FindMpsbsc017();
                }
                else dhxDataProcessorMpsbsc017.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc017 = function () {
    var titMpsbsc017 = '직원계좌조회'; /* gf_LocaleTrans('default', 'titMpsbsc017') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpsbsc017', 'empno', 'text'),
        acnutSeCode : gf_FormGetValue('searchFormMpsbsc017', 'acnutSeCode', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '계좌순번' /* gf_LocaleTrans('default', 'titAcnutSn') */,
        '계좌구분코드' /* gf_LocaleTrans('default', 'titAcnutSeCode') */,
        '은행코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '은행명' /* gf_LocaleTrans('default', 'titBankNm') */,
        '계좌번호' /* gf_LocaleTrans('default', 'titAcnutno') */,
        '예금주명' /* gf_LocaleTrans('default', 'titDpstrNm') */,
        '시작일자' /* gf_LocaleTrans('default', 'titBeginDe') */,
        '종료일자' /* gf_LocaleTrans('default', 'titEndDe') */,
        '통장 첨부파일번호' /* gf_LocaleTrans('default', 'titBnkbAtchmnflno') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empno', 'acnutSn', 'acnutSeCode', 'bankCode', 'bankNm', 'acnutno', 'dpstrNm', 'beginDe', 'endDe', 'bnkbAtchmnflno', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsbsc017 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc017;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc017/excelMpsbsc017', jsonParameter);
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
    $('#saveFormMpsbsc017 #empnoSaveFormMpsbsc017').parent().append(
    '<div class="error" id="empnoSaveFormMpsbsc017-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    /*$('#saveFormMpsbsc017 #acnutSeCodeSaveFormMpsbsc017').parent().append(
    '<div class="error" id="acnutSeCodeSaveFormMpsbsc017-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );*/
}
var fn_checkBeginEnd = function(){
	$('#saveFormMpsbsc017 #date2').parent().append(
	'<div class="error" id="date2-error" onclick="$(this).remove()">종료일자가 시작일자보다 빠릅니다.</div>'
	);
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc017 = function(empno, acnutSeCode){
    if(!gf_IsNull(empno) && !gf_IsNull(acnutSeCode)) {
        var jsonParameter = {
            empno : empno,
            acnutSeCode : acnutSeCode
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc017/findMpsbsc017', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.acnutSeCode)) {
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
    var state = dhxDataProcessorMpsbsc017.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMpsbsc017').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormMpsbsc017', 'empno', 'text');
                    var acnutSeCode = gf_FormGetValue('saveFormMpsbsc017', 'acnutSeCode', 'text');
                    if(fn_CheckDupMpsbsc017(empno, acnutSeCode)) return true;
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
    var validFalseCompareDate;
    var checkEmpno;
    var checkAcnutSeCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsbsc017 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mpsbsc017 == 'deleted') {
        save_Row_Num_Mpsbsc017 = 0;
        save_Row_Ids_Mpsbsc017 = "";
    } else if(save_Row_Sta_Mpsbsc017 == 'inserted') {
        save_Row_Num_Mpsbsc017 = rowNum;
        save_Row_Ids_Mpsbsc017 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsbsc017 = rowNum;
        save_Row_Ids_Mpsbsc017 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'acnutSeCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'acnutSeCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bankCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bankCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'acnutno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'acnutno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'dpstrNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'dpstrNm');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted' || state == 'updated') {
                	//alert(rowId);
                	//if( state == 'updated')
                		//rowId = dhxGridMpsbsc017.getRowIndex(rowId);
                	//alert(rowId);
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkAcnutSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'acnutSeCode', 'grid');
                    checkBeginDe = gf_DhxGetValue(dhxGridObjet, rowId, 'beginDe', 'grid');
                    checkEndDe = gf_DhxGetValue(dhxGridObjet, rowId, 'endDe', 'grid');
                    if(!gf_IsNull(checkEmpno, checkAcnutSeCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var acnutSeCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'acnutSeCode', 'grid');
                            if(((empno == checkEmpno) && (acnutSeCode == checkAcnutSeCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'acnutSeCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(state != 'updated'){
                        if(!fn_CheckDupMpsbsc017( checkEmpno, checkAcnutSeCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'acnutSeCode');
                            valid = false;
                        }};
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                        if(checkBeginDe > checkEndDe){
                        	validFalseCompareDate = true;
                        	fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'endDe');
                            valid = false;
                        }
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    }
                }
                if(!gf_IsNull(validFalseCompareDate)){
                	gf_DivMsgAlert('종료일자를 확인해주세요.');
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMpsbsc017.selectRowById(validFalseFistRowId);
        fn_FindMpsbsc017();
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

function fn_CallbackPopEmpSave(data){
	console.log(data.empno + " : " + data.korNm);
//	gf_FormSetValue('saveFormMhshrd006', 'saveDeptKorNmMhshrd006', data.deptCodeNm, 'hidden');
	
}

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMpsbsc017', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormMpsbsc017', 'empNm', 'text'),
		    bplcCode : gf_FormGetValue('searchFormMpsbsc017', 'searchComboStmBizplc', 'combo') //사업장
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMpsbsc017', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormMpsbsc017', 'empNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormMpsbsc017","empno","empNm", '' , "Y", null);
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

function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#saveFormMpsbsc017 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    
	/*//기간달력 이벤트 추가
    $('#saveFormMpsbsc017 #date2').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxCCalendarDate2.show();
    });*/
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
}

//일반달력
function init1(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"date1", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	//dhxCCalendarDate1.setDateFormat("%Y-%m-%d %H:%i");
	
	
	//금일 날짜표시
	$('#date1').val(nowDate);
}
function init2(){
	//달력 생성
	var dhxCCalendarDate2 = new dhtmlXCalendarObject({input:"date2", button:"startDateIcon"});
	dhxCCalendarDate2.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	//dhxCCalendarDate2.setDateFormat("%Y-%m-%d %H:%i");
	//금일 날짜표시
	$('#date2').val(nowDate);
}
function value1(){
	alert(gf_FormGetValue('sampleForm', 'date1', 'text'));
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