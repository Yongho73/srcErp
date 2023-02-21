/**
 *    프로그램       : 법인카드 증빙 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.06
 *    사용테이블      : MFS_CARD_EVID
 * sourceGen version : 2020.06.29.01 (2020.07.06)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mtxevd003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mtxevd003 = 0;  //그리드 위치 상태 
var save_All_Sta_Mtxevd003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mtxevd003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mtxevd003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mtxevd003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mtxevd003 = 0;  //그리드 삭제 수량 
var nowDate = "";
var dhxCCalendarDate2; // 기간 달력(From ~ To)
var uploadedFileKeysPrg3 = []; // db 저장용 (키만 파이프라인으로 구분)
var uploadedFileInfoPrg3 = []; // 화면에 저장된 정보 표시용 (삭제 기능)
var gBplcCode = "";
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMtxevd003();
    cf_SetComponentsMtxevd003();
    cf_SetEventListenerMtxevd003();
    cf_InitFormMtxevd003();
    cf_SetBindingMtxevd003();
    cf_InitdateMtxevd003();
    fn_FileUploadPrgEvent();	 //파일첨부
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMtxevd003 = function() {
    gf_SetMenuPath();
    $("#saveFormMtxevd003").validate({ errorElement: 'div', ignore: '' });
    
 // 조회 에서 사업장 콤보 박스 가져오기 
    gf_MakeComboBasic('divComboBplcCode', 'searchFormMtxevd003', 'searchFormMtxevd003', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '1000');
    // 조회 에서 사업장 콤보 박스 가져오기 
    gf_MakeComboBasic('bplcCodeSaveFormMtxevd003', 'saveFormMtxevd003', 'saveFormMtxevd003', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '1000');
    // 작성구분 콤보 박스
    gf_ComboCode('divCombowriteSe', 'writeSeCode', 'writeSeCode', 'sel', 'C041', '' , '', '', 'ordr', 'required','','');
    // 조회 에서 사업장 콤보 박스 가져오기 
    //gf_MakeComboBasic('writeSeCodeSearchFormMtxevd003', 'writeSeCode', 'writeSeCode', 'sel', 'C041', 'ordr', '', '', '');
    
    gf_ComboCode('writeSeCodeSearchFormMtxevd003', 'writeSeCode', 'writeSeCode', 'sel', 'C041', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('properEvidAtSearchFormMtxevd003', 'properEvidAt', 'properEvidAt', 'sel', 'C020', '' , '', '', 'ordr', 'required','','');
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    //userDeptNm = userInfo.data.userDeptNm;
    //userNm = userInfo.data.userNm;
    gf_FormSetValue('saveFormMtxevd003', 'bplcCodeNm', userInfo.data.bplcCode, 'text');
    gf_FormSetValue('saveFormMtxevd003', 'userDeptCode', userInfo.data.userDeptNm, 'text');
    gf_FormSetValue('saveFormMtxevd003', 'userEmpno', userInfo.data.userNm, 'text');
    
    
    $("#useAmtSaveFormMtxevd003").number(true); //공급대가
    $("#supplyAmtSaveFormMtxevd003").number(true); // 공급금액
    $("#vatAmtSaveFormMtxevd003").number(true);	// VAT
    $("#dscntAmtSaveFormMtxevd003").number(true); // 할인금액
    
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormMtxevd003'); 
};

var dhxGridMtxevd003;
var cf_SetComponentsMtxevd003 = function() {
	var dhxGridMtxevd003HeaderInfo = [];
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMtxevd003" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('증빙 번호', '100', 'center', 'str', 'ro', false, 'cardEvidNo', '', '')); /* gf_LocaleTrans('default', 'titCardEvidNo') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('카드번호', '150', 'center', 'str', 'ro', false, 'dashCardNo', '', '')); /* gf_LocaleTrans('default', 'titCardEvidNo') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('카드번호', '0', 'center', 'str', 'ro', true, 'cardNo', '', '')); /* gf_LocaleTrans('default', 'titCardNo') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '0', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('사업장이름', '0', 'center', 'str', 'ro', true, 'bplcCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('사용자 부서코드', '100', 'center', 'str', 'ro', false, 'userDeptCode', '', '')); /* gf_LocaleTrans('default', 'titUserDeptCode') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('사용자 사원번호', '100', 'center', 'str', 'ro', false, 'userEmpno', '', '')); /* gf_LocaleTrans('default', 'titUserEmpno') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('사용일자', '150', 'center', 'str', 'ro', false, 'useDe', '', '')); /* gf_LocaleTrans('default', 'titUseDe') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('카드승인번호', '100', 'center', 'str', 'ro', false, 'useConfmNo', '', '')); /* gf_LocaleTrans('default', 'titUseConfmNo') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('금액', '100', 'right', 'int', 'edn', false, 'useAmt', '', '')); /* gf_LocaleTrans('default', 'titUseAmt') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('전표발행금액', '100', 'right', 'int', 'edn', true, 'slipIsuAmt', '', '')); /* gf_LocaleTrans('default', 'titSlipIsuAmt') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('할인금액', '0', 'right', 'int', 'ro', true, 'dscntAmt', '', '')); /* gf_LocaleTrans('default', 'titDscntAmt') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('승인 금액', '0', 'right', 'int', 'ro', true, 'confmAmt', '', '')); /* gf_LocaleTrans('default', 'titConfmAmt') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('공급가', '100', 'right', 'int', 'edn', false, 'supplyAmt', '', '')); /* gf_LocaleTrans('default', 'titSupplyAmt') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('VAT', '100', 'right', 'int', 'edn', false, 'vatAmt', '', '')); /* gf_LocaleTrans('default', 'titVatAmt') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('승인일자', '0', 'center', 'str', 'ro', true, 'confmDe', '', '')); /* gf_LocaleTrans('default', 'titConfmDe') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('승인시각', '0', 'center', 'str', 'ro', true, 'confmTm', '', '')); /* gf_LocaleTrans('default', 'titConfmTm') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('사업자구분코드 C017', '0', 'center', 'str', 'ra', true, 'bsnmSeCode', '', '')); /* gf_LocaleTrans('default', 'titBsnmSeCode') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('거래처', '100', 'center', 'str', 'ro', false, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titBcncNm') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('업태', '0', 'center', 'str', 'ro', true, 'bizcnd', '', '')); /* gf_LocaleTrans('default', 'titBizcnd') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('업종(종목)', '0', 'center', 'str', 'ro', true, 'induty', '', '')); /* gf_LocaleTrans('default', 'titInduty') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('사용 내역', '0', 'center', 'str', 'ro', true, 'useDtls', '', '')); /* gf_LocaleTrans('default', 'titUseDtls') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('결의서 번호', '100', 'center', 'str', 'ro', false, 'anactNo', '', '')); /* gf_LocaleTrans('default', 'titAnactNo') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('적격증빙여부', '0', 'center', 'str', 'ro', true, 'properEvidAt', '', '')); /* gf_LocaleTrans('default', 'titProperEvidAt') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('작성구분코드 ', '0', 'center', 'str', 'ro', true, 'writeSeCode', '', '')); /* gf_LocaleTrans('default', 'titWriteSeCode') */
    dhxGridMtxevd003HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '0', 'center', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMtxevd003 = gf_MakeDhxGrid('dataListMtxevd003', dhxGridMtxevd003HeaderInfo, true, false, false);
    
    
    dhxGridMtxevd003.setNumberFormat("0,000", dhxGridMtxevd003.getColIndexById("useAmt"), ".", ",");
    dhxGridMtxevd003.setNumberFormat("0,000", dhxGridMtxevd003.getColIndexById("supplyAmt"), ".", ",");
    dhxGridMtxevd003.setNumberFormat("0,000", dhxGridMtxevd003.getColIndexById("vatAmt"), ".", ",");
    dhxGridMtxevd003.setNumberFormat("0,000", dhxGridMtxevd003.getColIndexById("dscntAmt"), ".", ",");
    
    dhxGridMtxevd003.enableAutoWidth(false);
    dhxGridMtxevd003.setEditable(true);
};

var eventIdMtxevd003 = [];
var cf_SetEventListenerMtxevd003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMtxevd003 = gf_GridDetachEvent(dhxGridMtxevd003, eventIdMtxevd003);
    eventId = dhxGridMtxevd003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMtxevd003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMtxevd003.getColumnsNum();
            var rowNum = dhxGridMtxevd003.getRowsNum();
            var selectedId = dhxGridMtxevd003.getSelectedRowId();
            var ind        = dhxGridMtxevd003.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxevd003.getRowIndex(selectedId);
            var type       = dhxGridMtxevd003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMtxevd003.selectRow(0);
                    //fn_FindMtxevd003();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMtxevd003.selectRow(rowIndex + 1);
                    fn_FindMtxevd003();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMtxevd003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxevd003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMtxevd003.getSelectedRowId();
            var ind        = dhxGridMtxevd003.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxevd003.getRowIndex(selectedId);
            var type       = dhxGridMtxevd003.getColType(ind);
            dhxGridMtxevd003.selectCell(rowIndex+1, ind);
            fn_FindMtxevd003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxevd003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMtxevd003.getSelectedRowId();
            var ind        = dhxGridMtxevd003.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxevd003.getRowIndex(selectedId);
            var type       = dhxGridMtxevd003.getColType(ind);
            dhxGridMtxevd003.selectCell(rowIndex-1, ind);
            fn_FindMtxevd003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxevd003.editCell();
            }
        }
        else return true;
    });
    eventIdMtxevd003.push(eventId);
    eventId = dhxGridMtxevd003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mtxevd003SortGridList(ind, type, direction); 
    });
    eventIdMtxevd003.push(eventId);
    eventId = dhxGridMtxevd003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMtxevd003.push(eventId);
    eventId = dhxGridMtxevd003.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMtxevd003();
    });
    eventIdMtxevd003.push(eventId);
    eventId = dhxGridMtxevd003.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMtxevd003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnwriteMtxevd003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        gf_DivMsgAlert('준비중 입니다.');
        return false;
    });
    $('#btnAddMtxevd003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMtxevd003()
    });
    $('#btnSaveMtxevd003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMtxevd003();
    });
    $('#btnRemoveMtxevd003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var anactNo = gf_FormGetValue('saveFormMtxevd003', 'anactNo', 'text');
        if (!gf_IsNull(anactNo)){
        	gf_DivMsgAlert('결의서 번호가 있을 시 삭제가 불가능 합니다.');
            return false;
        }
        
        fn_RemoveMtxevd003();
    });
    $('#btnExcelMtxevd003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMtxevd003();
    });
    $('#btnSearchMtxevd003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMtxevd003('');
    });
    $('#btnResetMtxevd003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMtxevd003();
    });
  //카드번호찾기 팝업 
    $('#btnCardNoSearch').unbind("click").bind("click",function() {
    	gf_CardNoPopup("saveFormMtxevd003","","", "", gBplcCode, "N", "fn_CallbackPopup");
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMtxevd003').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMtxevd003, $('#checkAllMtxevd003').prop('checked'), 'chk');
    });
    $('#searchFormMtxevd003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMtxevd003').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMtxevd003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
  //거래처 선택 Popup
	$('#btnBcncSearch').unbind('click').bind('click', function(event){
		gf_CompPopup("saveFormMtxevd003","bizrnoSaveFormMtxevd003","bcncNmSaveFormMtxevd003", gBplcCode, "N", "fn_CallbackPopComp");  
		// form ID, 거래처코드가 들어갈 tag의 ID, 거래처명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 선택 Popup
    $('#saveFormMtxevd003 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("saveFormMtxevd003","deptCodeNm","empCodeNm", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 입력 후 Enter 이벤트
	$('#empNo').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#empCodeNm').focus();
	    }
    });
	$('#empCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
	
    // 폼 이벤트 start ==========================================================================================
	$('#saveFormMtxevd003 input[name="cardEvidNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'cardEvidNo', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="cardNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'cardNo', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="useConfmNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'useConfmNo', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="bplcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'bplcCode', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="userDeptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'userDeptCode', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="userEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'userEmpno', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="useDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'useDe', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="useAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        
        var useAmt = gf_FormGetValue('saveFormMtxevd003', 'useAmt', 'text');
        var bsnmSeCode = gf_FormGetValue('saveFormMtxevd003', 'bsnmSeCode', 'radio');
        if (bsnmSeCode == '0'){
        	gf_FormSetValue("saveFormMtxevd003", "supplyAmt", useAmt/11*10, 'text');
        	gf_FormSetValue("saveFormMtxevd003", "vatAmt", useAmt/11, 'text');
        }else if (bsnmSeCode == '1'){
        	gf_FormSetValue("saveFormMtxevd003", "supplyAmt", useAmt, 'text');
        	gf_FormSetValue("saveFormMtxevd003", "vatAmt", useAmt*0, 'text');
        }
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'useAmt', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="slipIsuAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'slipIsuAmt', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="dscntAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var useAmt = gf_FormGetValue('saveFormMtxevd003', 'useAmt', 'text');
        
        var a = useAmt;
        
        var bsnmSeCode = gf_FormGetValue('saveFormMtxevd003', 'bsnmSeCode', 'radio');
        var supplyAmt = gf_FormGetValue('saveFormMtxevd003', 'supplyAmt', 'text');
        var vatAmt = gf_FormGetValue('saveFormMtxevd003', 'vatAmt', 'text');
        var dscntAmt = gf_FormGetValue('saveFormMtxevd003', 'dscntAmt', 'text');
        

        if (bsnmSeCode == '0'){
        	gf_FormSetValue("saveFormMtxevd003", "supplyAmt", useAmt/11*10, 'text');
        	gf_FormSetValue("saveFormMtxevd003", "vatAmt", useAmt/11, 'text');
        	if(dscntAmt >= 0){
        		gf_FormSetValue("saveFormMtxevd003", "useAmt", useAmt-dscntAmt, 'text');
        		gf_FormSetValue("saveFormMtxevd003", "supplyAmt", supplyAmt, 'text');
            	gf_FormSetValue("saveFormMtxevd003", "vatAmt", vatAmt, 'text');
        	}
        	
        }else if (bsnmSeCode == '1'){
        	gf_FormSetValue("saveFormMtxevd003", "supplyAmt", useAmt, 'text');
        	gf_FormSetValue("saveFormMtxevd003", "vatAmt", useAmt*0, 'text');
        }
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'dscntAmt', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="confmAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'confmAmt', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="supplyAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'supplyAmt', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="vatAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'vatAmt', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="confmDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'confmDe', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="confmTm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'confmTm', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="bsnmSeCode"]').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var useAmt = gf_FormGetValue('saveFormMtxevd003', 'useAmt', 'text');
        var bsnmSeCode = gf_FormGetValue('saveFormMtxevd003', 'bsnmSeCode', 'radio');
        if (bsnmSeCode == '0'){
        	gf_FormSetValue("saveFormMtxevd003", "supplyAmt", useAmt/11*10, 'text');
        	gf_FormSetValue("saveFormMtxevd003", "vatAmt", useAmt/11, 'text');
        }else if (bsnmSeCode == '1'){
        	gf_FormSetValue("saveFormMtxevd003", "supplyAmt", useAmt, 'text');
        	gf_FormSetValue("saveFormMtxevd003", "vatAmt", useAmt*0, 'text');
        }
        
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'bsnmSeCode', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="bcncNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'bcncNm', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="bizcnd"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'bizcnd', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="induty"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'induty', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="useDtls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'useDtls', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="anactNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'anactNo', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="properEvidAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'properEvidAt', $(this).val());
    });
    /*$('#saveFormMtxevd003 input[name="writeSeCode"]').unbind('change blur').bind('change blur',function() */
    $('#writeSeCode').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'writeSeCode', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMtxevd003 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMtxevd003, dhxDataProcessorMtxevd003, 'rm', $(this).val());
    });
    $('#pageingFormMtxevd003 select[name="pageRowSize"]').unbind('change').bind('change', function() {
    	$('#btnSearchMtxevd003').click();
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMtxevd003 = function() {
    $('#searchFormMtxevd003').resetForm();
    init2();
};

var cf_SetBindingMtxevd003 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMtxevd003('');
};
/********************************************************************/

//기간달력
function init2(){
	//달력 생성
	dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
	
dhxCCalendarDate2.attachEvent("onClick", function(side, date){
  //alert(side + " + " + date);
  if(side == "right"){
  	$('#stDate').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
  	$('#edDate').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
  	dhxCCalendarDate2.hide();
  }
});
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('stDate', 'edDate', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormMtxevd003', 'stDate', 'text'));
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormMtxevd003', 'edDate', 'text'));	
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
}
var cf_InitdateMtxevd003 = function(){
	if(init()){   // 초기화
		init1();  // 일반달력 초기화
		init2(); 
	}
};
//********************************************************************/

//일반달력
function init1(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"useDeSaveFormMtxevd003", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	//금일 날짜표시 billIsuDe
	$('#useDeSaveFormMtxevd003').val(nowDate);
	
}
function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
$('#searchFormMtxevd003 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
	dateChk($(this));
});

//기간달력 이벤트 추가
$('#searchFormMtxevd003 #date2').unbind('click').bind('click', function(event){
	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
	dhxCCalendarDate2.show();
});

//금일 조회
var today = new Date();
nowDate = dateFormat(today);
return(nowDate);
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


/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMtxevd003 = function(pageNum) {
    var bplcCode = gf_FormGetValue('searchFormMtxevd003', 'searchFormMtxevd003', 'combo');
    
    var pageingCnt = gf_FormGetValue('pageingFormMtxevd003', 'pageRowSize', 'combo');
	var page = pageNum;
	if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	if(gf_IsNull(page)) page = 1;
	gf_FormSetValue('searchFormMtxevd003', 'selectedPageNum', page, 'text');
	
    var jsonParameter = {
        cardEvidNo : gf_FormGetValue('searchFormMtxevd003', 'cardEvidNo', 'text'),
        cardNo : gf_FormGetValue('searchFormMtxevd003', 'cardNo', 'text'),
        stDate : gf_FormGetValue('searchFormMtxevd003', 'stDate', 'text'),
        edDate : gf_FormGetValue('searchFormMtxevd003', 'edDate', 'text'),
        bplcCode : bplcCode, // 사업장 콤보
        deptKorNm : gf_FormGetValue('searchFormMtxevd003', 'deptKorNm', 'text'),
        writeSeCode : gf_FormGetValue('searchFormMtxevd003', 'writeSeCode', 'combo'),
        pageingCnt 		: pageingCnt,
        pageNum 		: page 
    };
    gf_Transaction(jsonParameter, 'mtxevd003/searchMtxevd003', jsonParameter, 'fn_CallbackSearchMtxevd003', false, 'GET');
};

var dhxDataProcessorMtxevd003;
var fn_CallbackSearchMtxevd003 = function(strSvcID, targetID, data) {
    dhxGridMtxevd003.clearAll();
    fn_DhxDataProcessorMtxevd003();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMtxevd003');
        dhxGridMtxevd003.parse(data.data.records, 'js');
        dhxGridMtxevd003.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListMtxevd003');
    }
    $("#spanCntSearchFormMtxevd003").text(data.data.records.length);
    gf_PageNate(data.data,'.paging','fn_SearchMtxevd003');
    cf_SetEventListenerMtxevd003();
    
    dhxGridMtxevd003.forEachRow(function(rowId) {
			var anactNo = gf_DhxGetValue(dhxGridMtxevd003, rowId, 'anactNo', 'grid');
			if (!gf_IsNull(anactNo)){
				dhxGridMtxevd003.cells(rowId,1).setDisabled(true);
			}
    });
    
};

var fn_DhxDataProcessorMtxevd003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMtxevd003 = new dataProcessor(gv_ContextPath+'/mtxevd003/saveMtxevd003'); //lock feed url
    dhxDataProcessorMtxevd003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMtxevd003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMtxevd003.init(dhxGridMtxevd003); //link dataprocessor to the grid
    dhxDataProcessorMtxevd003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMtxevd003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMtxevd003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMtxevd003();
                    $("#checkAllMtxevd003").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMtxevd003 = function() {
	var rId = dhxGridMtxevd003.getSelectedRowId();
    var status = dhxDataProcessorMtxevd003.getState(rId);

    gf_FormSetValue("saveFormMtxevd003", "cardEvidNo", gf_DhxGetValue(dhxGridMtxevd003, rId, 'cardEvidNo',  'grid'), '');
    //gf_FormSetValue("saveFormMtxevd003", "cardNo", gf_DhxGetValue(dhxGridMtxevd003, rId, 'cardNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "cardNo", gf_DhxGetValue(dhxGridMtxevd003, rId, 'dashCardNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "useConfmNo", gf_DhxGetValue(dhxGridMtxevd003, rId, 'useConfmNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "bplcCode", gf_DhxGetValue(dhxGridMtxevd003, rId, 'bplcCode',  'grid'), 'text');
    gf_FormSetValue("saveFormMtxevd003", "bplcCodeNm", gf_DhxGetValue(dhxGridMtxevd003, rId, 'bplcCodeNm',  'grid'), 'text');
    gf_FormSetValue("saveFormMtxevd003", "userDeptCode", gf_DhxGetValue(dhxGridMtxevd003, rId, 'userDeptCode',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "userEmpno", gf_DhxGetValue(dhxGridMtxevd003, rId, 'userEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "useDe", gf_DhxGetValue(dhxGridMtxevd003, rId, 'useDe',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "useAmt", gf_DhxGetValue(dhxGridMtxevd003, rId, 'useAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "slipIsuAmt", gf_DhxGetValue(dhxGridMtxevd003, rId, 'slipIsuAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "dscntAmt", gf_DhxGetValue(dhxGridMtxevd003, rId, 'dscntAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "confmAmt", gf_DhxGetValue(dhxGridMtxevd003, rId, 'confmAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "supplyAmt", gf_DhxGetValue(dhxGridMtxevd003, rId, 'supplyAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "vatAmt", gf_DhxGetValue(dhxGridMtxevd003, rId, 'vatAmt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "confmDe", gf_DhxGetValue(dhxGridMtxevd003, rId, 'confmDe',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "confmTm", gf_DhxGetValue(dhxGridMtxevd003, rId, 'confmTm',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "bsnmSeCode", gf_DhxGetValue(dhxGridMtxevd003, rId, 'bsnmSeCode',  'grid'), 'radio');
    gf_FormSetValue("saveFormMtxevd003", "bcncNm", gf_DhxGetValue(dhxGridMtxevd003, rId, 'bcncNm',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "bizcnd", gf_DhxGetValue(dhxGridMtxevd003, rId, 'bizcnd',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "induty", gf_DhxGetValue(dhxGridMtxevd003, rId, 'induty',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "useDtls", gf_DhxGetValue(dhxGridMtxevd003, rId, 'useDtls',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "anactNo", gf_DhxGetValue(dhxGridMtxevd003, rId, 'anactNo',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "properEvidAt", gf_DhxGetValue(dhxGridMtxevd003, rId, 'properEvidAt',  'grid'), '');
    gf_FormSetValue("saveFormMtxevd003", "writeSeCode", gf_DhxGetValue(dhxGridMtxevd003, rId, 'writeSeCode',  'grid'), 'combo');
    
    gf_FormSetValue('saveFormMtxevd003', 'atchmnfl', gf_DhxGetValue(dhxGridMtxevd003, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormMtxevd003', 'atchmnflList', gf_DhxGetValue(dhxGridMtxevd003, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일
    
    
    var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridMtxevd003, rId, 'atchmnflNo',  'grid') };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
	
	var anactNo = gf_FormGetValue('saveFormMtxevd003', 'anactNo', 'text');
    if (!gf_IsNull(anactNo)){
    	fn_FormDisabled(true);
    }else{
    	fn_FormDisabled(false);
    }

    if(status == 'inserted') {
        $('#saveFormMtxevd003 input[name="cardEvidNo"]').prop('disabled', false);
    } else {
        $('#saveFormMtxevd003 input[name="cardEvidNo"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMtxevd003 = function() {
    $('#saveFormMtxevd003 input[name="cardEvidNo"]').prop('disabled', false);
    $('#saveFormMtxevd003').resetForm();
	//금일 날짜표시 billIsuDe
	$('#useDeSaveFormMtxevd003').val(nowDate);
	// 작성구분 표시
	gf_FormSetValue('saveFormMtxevd003', 'writeSeCode', '2','combo');
	$("#atchmnflList").val("");  //hidden 초기화 
    $("#atchmnfl").val("");  //hidden 초기화
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    //userDeptNm = userInfo.data.userDeptNm;
    //userNm = userInfo.data.userNm;
	gf_FormSetValue('saveFormMtxevd003', 'bplcCodeNm', userInfo.data.bplcCode, 'text');
    gf_FormSetValue('saveFormMtxevd003', 'userDeptCode', userInfo.data.userDeptNm, 'text');
    gf_FormSetValue('saveFormMtxevd003', 'userEmpno', userInfo.data.userNm, 'text');
    
    
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    //$('#saveFormMtxevd003 *').prop('disabled', status);
    $("#saveFormMtxevd003 [name='bsnmSeCode']").attr('disabled',status); // VAT 구분
    $("#saveFormMtxevd003 [name='useDe']").attr('disabled',status); // 사용일자
    $("#btnBcncSearch").attr('disabled',status); // 가맹점 버튼
    $("#saveFormMtxevd003 [name='cardNo']").attr('disabled',status); // 카드번호 input
    $("#btnCardNoSearch").attr('disabled',status); // 카드번호 버튼
    $("#saveFormMtxevd003 [name='useConfmNo']").attr('disabled',status); // 승인번호 input
    $("#saveFormMtxevd003 [name='useAmt']").attr('disabled',status); // 사용금액 input
    $("#saveFormMtxevd003 [name='dscntAmt']").attr('disabled',status); // 할인금액 input
    $("#saveFormMtxevd003 [name='writeSeCode']").attr('disabled',status); // 작성구분 select
    $("#saveFormMtxevd003 [name='bizcnd']").attr('disabled',status); // 업태 input
    $("#saveFormMtxevd003 [name='induty']").attr('disabled',status); // 업종input
    $("#fileUpload3").attr('disabled',status); // 첨부파일버튼
};
/**
 * 추가(신규) 
 */
var fn_AddMtxevd003 = function() {
    dhxGridMtxevd003.clearSelection();
    fn_InitInputFormMtxevd003();
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    //userDeptNm = userInfo.data.userDeptNm;
    //userNm = userInfo.data.userNm;
	var bplcCodeNm  = userInfo.data.bplcCode;
    var userDeptNm = userInfo.data.userDeptNm;
    var userNm = userInfo.data.userNm;
    
    /*var writeSeCode = gf_FormSetValue('saveFormMtxevd003', 'writeSeCode', '1','combo');*/
    var curDate = gv_Curdate;
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //cardEvidNo
    initValueArr.push(''); //cardNo
    initValueArr.push(''); //useConfmNo
    initValueArr.push(bplcCodeNm); //bplcCode
    initValueArr.push(''); //userDeptCode
    initValueArr.push(userDeptNm); //userEmpno
    initValueArr.push(userNm); 
    initValueArr.push(curDate); //useDe
    initValueArr.push(''); //useAmt
    initValueArr.push(''); //slipIsuAmt
    initValueArr.push(''); //dscntAmt
    initValueArr.push(''); //confmAmt
    initValueArr.push(''); //supplyAmt
    initValueArr.push(''); //vatAmt
    initValueArr.push(''); //confmDe
    initValueArr.push(''); //confmTm
    initValueArr.push(''); //bsnmSeCode
    initValueArr.push(''); //bcncNm
    initValueArr.push(''); //bizcnd
    initValueArr.push(''); //induty
    initValueArr.push(''); //useDtls
    initValueArr.push(''); //anactNo
    initValueArr.push(''); //properEvidAt
    initValueArr.push('');
    initValueArr.push(2); //writeSeCode
    initValueArr.push(''); //atchmnflNo
    dhxGridMtxevd003.addRow(dhxGridMtxevd003.uid(), initValueArr, 0);
    dhxGridMtxevd003.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMtxevd003');
    $('#btnPopEmpSearchMtxevd003').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mtxevd003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMtxevd003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMtxevd003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMtxevd003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMtxevd003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMtxevd003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMtxevd003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMtxevd003', 'sortColumId', gf_GetDhxGridColum(dhxGridMtxevd003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMtxevd003.setSortImgState(false); 
            gf_FormSetValue('searchFormMtxevd003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMtxevd003', 'sortColumId', '', 'text'); 
            dhxGridMtxevd003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMtxevd003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMtxevd003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMtxevd003', 'sortColumId', gf_GetDhxGridColum(dhxGridMtxevd003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMtxevd003 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mtxevd003 = 0; 
    save_Edt_Cnt_Mtxevd003 = 0; 
    save_Del_Cnt_Mtxevd003 = 0; 
    dhxGridMtxevd003.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMtxevd003.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMtxevd003.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mtxevd003 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mtxevd003 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mtxevd003 += 1; 
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
        save_All_Sta_Mtxevd003 = 0; 
        if(save_Add_Cnt_Mtxevd003 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mtxevd003 + "건";
            save_All_Sta_Mtxevd003 = 1; 
        } 
        if(save_Edt_Cnt_Mtxevd003 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mtxevd003 + "건"; 
        } 
        if(save_Del_Cnt_Mtxevd003 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mtxevd003 + "건"; 
            save_All_Sta_Mtxevd003 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMtxevd003(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMtxevd003(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMtxevd003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMtxevd003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMtxevd003_Send = function() {
    if(fn_GridValidation(dhxGridMtxevd003, dhxDataProcessorMtxevd003)) {
        dhxDataProcessorMtxevd003.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMtxevd003 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMtxevd003, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 행을 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMtxevd003.forEachRow(function(rowId) {
            state = dhxDataProcessorMtxevd003.getState(rowId);
            if(dhxGridMtxevd003.cells(rowId, gf_GetDhxGridColumId(dhxGridMtxevd003, 'chk')).isChecked()){
                if(state == 'inserted') dhxGridMtxevd003.deleteRow(rowId);
                else dhxDataProcessorMtxevd003.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMtxevd003 = function () {
    var titMtxevd003 = '법인카드 증빙'; /* gf_LocaleTrans('default', 'titMtxevd003') */
    var jsonParameter = {
        cardEvidNo : gf_FormGetValue('searchFormMtxevd003', 'cardEvidNo', 'text')
    };
    var header = [[
        '카드 증빙 번호' /* gf_LocaleTrans('default', 'titCardEvidNo') */,
        '카드번호' /* gf_LocaleTrans('default', 'titCardNo') */,
        '카드승인번호' /* gf_LocaleTrans('default', 'titUseConfmNo') */,
        '사업장코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '사용자부서코드' /* gf_LocaleTrans('default', 'titUserDeptCode') */,
        '사용자 사원번호' /* gf_LocaleTrans('default', 'titUserEmpno') */,
        '사용일자' /* gf_LocaleTrans('default', 'titUseDe') */,
        '사용 금액' /* gf_LocaleTrans('default', 'titUseAmt') */,
        '전표발행금액' /* gf_LocaleTrans('default', 'titSlipIsuAmt') */,
        '할인금액' /* gf_LocaleTrans('default', 'titDscntAmt') */,
        '승인 금액' /* gf_LocaleTrans('default', 'titConfmAmt') */,
        '공급금액' /* gf_LocaleTrans('default', 'titSupplyAmt') */,
        '부가세 금액' /* gf_LocaleTrans('default', 'titVatAmt') */,
        '승인일자' /* gf_LocaleTrans('default', 'titConfmDe') */,
        '승인시각' /* gf_LocaleTrans('default', 'titConfmTm') */,
        '사업자구분코드' /* gf_LocaleTrans('default', 'titBsnmSeCode') */,
        '거래처명' /* gf_LocaleTrans('default', 'titBcncNm') */,
        '업태' /* gf_LocaleTrans('default', 'titBizcnd') */,
        '업종' /* gf_LocaleTrans('default', 'titInduty') */,
        '사용 내역' /* gf_LocaleTrans('default', 'titUseDtls') */,
        '결의서 번호' /* gf_LocaleTrans('default', 'titAnactNo') */,
        '적격증빙여부' /* gf_LocaleTrans('default', 'titProperEvidAt') */,
        '작성구분코드' /* gf_LocaleTrans('default', 'titWriteSeCode') */,
        '첨부파일 번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'cardEvidNo', 'cardNo', 'useConfmNo', 'bplcCode', 'userDeptCode', 'userEmpno', 'useDe', 'useAmt', 'slipIsuAmt', 'dscntAmt', 'confmAmt', 'supplyAmt', 'vatAmt', 'confmDe', 'confmTm', 'bsnmSeCode', 'bcncNm', 'bizcnd', 'induty', 'useDtls', 'anactNo', 'properEvidAt', 'writeSeCode', 'atchmnflNo', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMtxevd003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMtxevd003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mtxevd003/excelMtxevd003', jsonParameter);
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
    $('#saveFormMtxevd003 #cardEvidNoSaveFormMtxevd003').parent().append(
    '<div class="error" id="cardEvidNoSaveFormMtxevd003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMtxevd003 = function(cardEvidNo){
    if(!gf_IsNull(cardEvidNo)) {
        var jsonParameter = {
            cardEvidNo : cardEvidNo
        };
        var dataSource = gf_NoAsyncTransaction('mtxevd003/findMtxevd003', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.cardEvidNo)) {
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
    var state = dhxDataProcessorMtxevd003.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMtxevd003').validate().form()){
                if(state == 'inserted') {
                    var cardEvidNo = gf_FormGetValue('saveFormMtxevd003', 'cardEvidNo', 'text');
                    if(fn_CheckDupMtxevd003(cardEvidNo)) return true;
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
    var checkCardEvidNo;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mtxevd003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mtxevd003 == 'deleted') {
        save_Row_Num_Mtxevd003 = 0;
        save_Row_Ids_Mtxevd003 = "";
    } else if(save_Row_Sta_Mtxevd003 == 'inserted') {
        save_Row_Num_Mtxevd003 = rowNum;
        save_Row_Ids_Mtxevd003 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mtxevd003 = rowNum;
        save_Row_Ids_Mtxevd003 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	var bsnmSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'bsnmSeCode', 'grid');
    			if(valid && !gv_ValidateMethods.required( bsnmSeCode )){
    				gf_DivMsgAlert("VAT 구분은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bsnmSeCode');
    				valid = false;
    			}
    			var bcncNm = gf_DhxGetValue(dhxGridObjet, rowId, 'bcncNm', 'grid');
    			if(valid && !gv_ValidateMethods.required( bcncNm )){
    				gf_DivMsgAlert("가맹점은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bcncNm');
    				valid = false;
    			}
    			var cardNo = gf_DhxGetValue(dhxGridObjet, rowId, 'cardNo', 'grid');
    			if(valid && !gv_ValidateMethods.required( cardNo )){
    				gf_DivMsgAlert("카드번호는 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cardNo');
    				valid = false;
    			}
    			var useConfmNo = gf_DhxGetValue(dhxGridObjet, rowId, 'useConfmNo', 'grid');
    			if(valid && !gv_ValidateMethods.required( useConfmNo )){
    				gf_DivMsgAlert("승인번호는 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useConfmNo');
    				valid = false;
    			}
    			var useAmt = gf_DhxGetValue(dhxGridObjet, rowId, 'useAmt', 'grid');
    			if(valid && !gv_ValidateMethods.required( useAmt )){
    				gf_DivMsgAlert("사용금액은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useAmt');
    				valid = false;
    			}
    			var atchmnflNo = gf_DhxGetValue(dhxGridObjet, rowId, 'atchmnflNo', 'grid');
    			if(valid && !gv_ValidateMethods.required( atchmnflNo )){
    				gf_DivMsgAlert("첨부파일은 필수항목 입니다.");
    				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'atchmnflNo');
    				valid = false;
    			}
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkCardEvidNo = gf_DhxGetValue(dhxGridObjet, rowId, 'cardEvidNo', 'grid');
                    if(!gf_IsNull(checkCardEvidNo)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var cardEvidNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'cardEvidNo', 'grid');
                            if(((cardEvidNo == checkCardEvidNo)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cardEvidNo');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMtxevd003( checkCardEvidNo )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cardEvidNo');
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
        dhxGridMtxevd003.selectRowById(validFalseFistRowId);
        fn_FindMtxevd003();
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

//거래처 코드 콜백
var fn_CallbackPopComp = function(data) {
	 gf_FormSetValue('saveFormMtxevd003', 'bcncNm', data.bcncNm, 'text');
	 if (gf_IsNull(data.bcncNm)){
		 gf_LocaleTrans('default', gf_DivMsgAlert("거래처 관리에서 거래처명을 입력해주세요."));
		 fn_InitInputFormMtxevd003();
		 return false;
	 }
};	
/**
 * 사원 검색
 */
function fn_CallbackPopEmp(data){
	console.log(data.empno + " : " + data.korNm);
	gf_FormSetValue('saveFormMtxevd003', 'userDeptCode', data.deptCodeNm, 'text');
	gf_FormSetValue('saveFormMtxevd003', 'bplcCodeNm', data.bplcCodeNm, 'text');
	gf_FormSetValue('saveFormMtxevd003', 'bplcCode', data.bplcCode, 'text');
	gf_FormSetValue('saveFormMtxevd003', 'userEmpno', data.korNm, 'text');
	console.log(data.bplcCodeNm);
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var deptCodeNm = "";
	var korNm = "";
	
	if(gubun == "1"){
		deptCodeNm = gf_FormGetValue('saveFormMtxevd003', 'deptCodeNm', 'text');
		korNm = gf_FormGetValue('saveFormMtxevd003', 'korNm', 'text');
	}
	var jsonParameter = {
			deptCodeNm     : deptCodeNm,
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
	 		gf_FormSetValue('saveFormMtxevd003', 'deptCodeNm', data.deptCodeNm, 'text');
	 		console.log(data.deptCodeNm)
	 		gf_FormSetValue('saveFormMtxevd003', 'empCodeNm', data.korNm, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("saveFormMtxevd003","empCodeNm","empCodeNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("saveFormMtxevd003","deptCodeNm","deptCodeNm", gBplcCode, "Y");
	  	}
  	}
}

//첨부파일 영역 
var fn_FileUploadPrgEvent = function(){
	
	$(".file_box").css('height','75px'); //높이 줄이기
	
	$('#fileUpload3').unbind("click").bind("click",function(event){
		gf_FileUploadPopup(
				'fn_FileUploadPrgEvent', 
				'btnUploadedFiledelete3', 
				'fileList3', 
				'atchmnfl', 
				 uploadedFileKeysPrg3, 
				 uploadedFileInfoPrg3,
				 0,
				'all',
		        'fn_CallBackPrgFileUpload');
	});
	
	$('.btnUploadedFiledelete3').unbind("click").bind("click",function(event){			
		 
		uploadedFileKeysPrg3.splice($(this).attr('idx'), 1);
		uploadedFileInfoPrg3.splice($(this).attr('idx'), 1);
		
		$('#fileList3 .file_box table tr').remove();
		
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		
		$.each( uploadedFileInfoPrg3, function( key, value ) {
			
			fileInfos = uploadedFileInfoPrg3[key].split('|^|');
			
			atchFileList.push('<tr>');
			atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
			atchFileList.push('<td class="ar">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
			atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');

			idx++;
		});								
		
		$('#fileList3 .file_box table').append(atchFileList.join(""));
		$('#atchmnfl').val(uploadedFileKeysPrg3.join("|"));
		
		fn_FileUploadPrgEvent();
		
	});
}
	
var fn_SearchPrgFileList = function (strSvcID, targetID, data){
	$('#fileList3 .file_box table tr').remove();
	uploadedFileKeysPrg3 = [];
	uploadedFileInfoPrg3 = [];

	var atchFileList = [];
	var idx = 0;
	var anactNo = gf_FormGetValue('saveFormMtxevd003', 'anactNo', 'text');
	$.each( data.data, function( key, value ) {
		if (gf_IsNull(anactNo)){
		uploadedFileKeysPrg3.push(value.atchFileId);				
		uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
		
		atchFileList.push('<tr style=\"border:0\">');
		atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');
		
		idx++;
		}else{
			uploadedFileKeysPrg3.push(value.atchFileId);				
			uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
			
			atchFileList.push('<tr style=\"border:0\">');
			atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
			atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
			atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3" disabled><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');
			
			idx++;
		}
	});

	if(gf_IsNull(atchFileList)) {				
		atchFileList.push('<tr>');
		atchFileList.push('<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>');				
		atchFileList.push('</tr>');								
	}
	
	$('#fileList3 .file_box table').append(atchFileList.join(""));
	$('#atchFileIds3').val(uploadedFileKeysPrg3.join("|"));
	fn_FileUploadPrgEvent();
};	

 
var fn_CallBackPrgFileUpload = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	if(!gf_IsNull(data)){
		
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		keyArr  = [];  //기존파일들 배열 초기화
		infoArr = [];
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
		});
		
		$('#'+viewDivId+' .file_box table tr').remove();
		$('#'+dataDivId).val("");
		$.each( infoArr, function( key, value ) {
			
			fileInfos = infoArr[key].split('|^|');

			atchFileList.push('<tr>');
			atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
			atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
			atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del '+deleteBtnClassNm+'"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');
				 
			idx++;
		});								
					
		$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
		$('#'+dataDivId).val(keyArr.join("|"));
		gf_FormSetValue('saveFormMtxevd003', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormMtxevd003', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
      callbacks.fire();
	}
};

var fn_CallbackPopup = function(data) {
	
	//gf_Trace("data::"+JSON.stringify(data))
    gf_FormSetValue('saveFormMtxevd003', 'cardNo', data.cardNo, 'text');
};
