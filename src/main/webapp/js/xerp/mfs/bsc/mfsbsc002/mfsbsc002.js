/**
 *    프로그램       : 거래처관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.10
 *    사용테이블      : STM_CUSTOMER
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;
var uploadedFileKeysPrg3 = []; // db 저장용 (키만 파이프라인으로 구분)
var uploadedFileInfoPrg3 = []; // 화면에 저장된 정보 표시용 (삭제 기능)

var gBplcCode = "";
var g_rid = "1";

var dhxGridMfsbsc002;
var dhxDataProcessorMfsbsc002 = null;

/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMfsbsc002();
    cf_SetComponentsMfsbsc002();
    cf_InitFormMfsbsc002();
    cf_SetBindingMfsbsc002();    
    //cf_SetEventListenerMfsbsc002();
    gf_IframeHeightResize(true);
    fn_FileUploadPrgEvent();	 //파일첨부
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMfsbsc002 = function() {
	
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode; 
    
    gf_SetMenuPath();
    
    $('#saveFormMfsbsc002').validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('divComboSearchBcncSe', 'searchBcncSe', 'searchBcncSe', 'search', 'C004', '' , '', '', 'ordr', '','',''); //거래처구분 
    gf_ComboCode('divComboSearchCprSe', 'SearchCprSe', 'SearchCprSe', 'search', 'C060', '' , '', '', 'ordr', 'required','','');   //사업자구분 
    
    gf_ComboCode('divComboBcncSe', 'bcncSeMfsbsc002', 'bcncSeMfsbsc002', 'sel', 'C004', '' , '', '', 'ordr', '','',''); //거래처구분(폼)
    gf_ComboCode('divComboCprSe', 'cprSeMfsbsc002', 'cprSeMfsbsc002', 'sel', 'C060', '' , '', '', 'ordr', 'required','','');   //사업자구분 
    gf_ComboCode('divComboAreaCode', 'areaCodeMfsbsc002', 'areaCodeMfsbsc002', 'sel', 'C079', '' , '', '', 'ordr', '','','');   //지역 
    gf_ComboCode('divComboBankCode', 'bankCodeMfsbsc002', 'bankCodeMfsbsc002', 'sel', 'C010', '' , '', '', 'ordr', '','','');   //은행코드 
    gf_ComboCode('divComboBcncscaleSe', 'bcncscaleSeMfsbsc002', 'bcncscaleSeMfsbsc002', 'sel', 'C126', '' , '', '', 'ordr', '','','');   //기업규모 
    gf_ComboCode('divComboTaxtSe', 'taxtSeMfsbsc002', 'taxtSeMfsbsc002', 'sel', 'C009', '' , '', '', 'ordr', '','','');   //과세구분 
    
    //gf_ComboCode('divComboTaxtAt', 'taxtAt', 'taxtAt', '', 'C066', '' , '', '', 'asc', 'required','',''); //과세여부
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode =userInfo.data.bplcCode;    
    
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormMfsbsc002');   
    
    $("input:text[numberOnly]").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9]/g,""));
    });
    
};

var cf_SetComponentsMfsbsc002 = function() {
    var dhxGridMfsbsc002HeaderInfo = [];
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'rnum', '', '')); 
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('거래처코드', '80', 'center', 'str', 'ro', true, 'bcncCode', '', '')); /* gf_LocaleTrans('default', 'titBcncCode') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('거래처', '*', '', 'str', 'ro', false, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titBcncNm') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사업자등록번호', '105', 'center', 'str', 'ro', false, 'bizrno', '', '')); /* gf_LocaleTrans('default', 'titBizrno') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('거래처구분', '80', 'center', 'str', 'coro', false, 'bcncSe', '', '')); /* gf_LocaleTrans('default', 'titBcncSe') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사업자유형', '100', 'center', 'str', 'coro', false, 'cprSe', '', '')); /* gf_LocaleTrans('default', 'titBcncSe') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '70', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titBcncSe') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('업태', '0', 'center', 'str', 'ro', true, 'bizcnd', '', '')); /* gf_LocaleTrans('default', 'titBizcnd') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('종목', '0', 'center', 'str', 'ro', true, 'induty', '', '')); /* gf_LocaleTrans('default', 'titInduty') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('대표자', '80', 'center', 'str', 'ro', true, 'reprsntNm', '', '')); /* gf_LocaleTrans('default', 'titreprsntNm') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('지역', '85', 'center', 'str', 'coro', false, 'areaCode', '', '')); /* gf_LocaleTrans('default', 'titAreaNm') */
    
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사업장구분코드', '10', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('국적코드', '10', 'center', 'str', 'ro', true, 'nltyCode', '', '')); /* gf_LocaleTrans('default', 'titNltyCode') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('거래처규모', '10', 'center', 'str', 'ro', true, 'bcncscaleSe', '', '')); /* gf_LocaleTrans('default', 'titBcncscaleSe') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('과세유형', '10', 'center', 'str', 'ro', true, 'taxtSe', '', '')); /* gf_LocaleTrans('default', 'titTaxtSe') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('표준통화코드', '10', 'center', 'str', 'ro', true, 'crncyCode', '', '')); /* gf_LocaleTrans('default', 'titCrncyCode') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('은행코드', '10', 'center', 'str', 'ro', true, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */

    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('지역코드', '10', 'center', 'str', 'ro', true, 'areaNm', '', '')); /* gf_LocaleTrans('default', 'titAreaNm') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('우편번호', '10', 'center', 'str', 'ro', true, 'postCode', '', '')); /* gf_LocaleTrans('default', 'titPostCode') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('주소', '10', 'center', 'str', 'ro', true, 'adres', '', '')); /* gf_LocaleTrans('default', 'titAdres') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('기본주소', '10', 'center', 'str', 'ro', true, 'addr2', '', '')); /* gf_LocaleTrans('default', 'titAddr2') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('대표전화번호', '10', 'center', 'str', 'ro', true, 'telno', '', '')); /* gf_LocaleTrans('default', 'titTelno') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('팩스번호', '10', 'center', 'str', 'ro', true, 'faxNo', '', '')); /* gf_LocaleTrans('default', 'titFaxNo') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '10', 'center', 'str', 'ro', true, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '10', 'center', 'str', 'ro', true, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('HomePage', '10', 'center', 'str', 'ro', true, 'homepage', '', '')); /* gf_LocaleTrans('default', 'titHomepage') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('매입여부', '10', 'center', 'str', 'ro', true, 'purchsAt', '', '')); /* gf_LocaleTrans('default', 'titPurchsAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('매출여부', '10', 'center', 'str', 'ro', true, 'saleofficAt', '', '')); /* gf_LocaleTrans('default', 'titSaleofficAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('거래처정보.', '10', 'center', 'str', 'ro', true, 'bcncCn', '', '')); /* gf_LocaleTrans('default', 'titBcncCn') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('설립일자.', '10', 'center', 'str', 'ro', true, 'fondDe', '', '')); /* gf_LocaleTrans('default', 'titFondDe') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('자본금.', '10', 'right', 'int', 'ro', true, 'capitalAmt', '', '')); /* gf_LocaleTrans('default', 'titCapitalAmt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('년매출액.', '10', 'right', 'int', 'ro', true, 'yySaleAmt', '', '')); /* gf_LocaleTrans('default', 'titYySaleAmt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('직원.', '10', 'center', 'str', 'ro', true, 'emplCo', '', '')); /* gf_LocaleTrans('default', 'titEmplCo') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('무역업등록번호', '10', 'center', 'str', 'ro', true, 'tradeNo', '', '')); /* gf_LocaleTrans('default', 'titTradeNo') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '10', 'center', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('담당자명', '10', 'center', 'str', 'ro', true, 'chargerNm', '', '')); /* gf_LocaleTrans('default', 'titChargerNm') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('담당자이메일', '10', 'center', 'str', 'ro', true, 'chargerEmail', '', '')); /* gf_LocaleTrans('default', 'titChargerEmail') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('담당자 전화번호', '10', 'center', 'str', 'ro', true, 'chargerTelno', '', '')); /* gf_LocaleTrans('default', 'titChargerTelno') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('담당자부서', '10', 'center', 'str', 'ro', true, 'chargerDept', '', '')); /* gf_LocaleTrans('default', 'titChargerDept') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('담당자 직위', '10', 'center', 'str', 'ro', true, 'chargerOfcps', '', '')); /* gf_LocaleTrans('default', 'titChargerOfcps') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('중소기업우선구매대상여부', '10', 'center', 'str', 'ro', true, 'priorPurchsAt', '', '')); /* gf_LocaleTrans('default', 'titPriorPurchsAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('장애인기업여부', '10', 'center', 'str', 'ro', true, 'dsrprAt', '', '')); /* gf_LocaleTrans('default', 'titDsrprAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('여성대표기업여부', '10', 'center', 'str', 'ro', true, 'womanAt', '', '')); /* gf_LocaleTrans('default', 'titWomanAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('외자기업구분', '10', 'center', 'str', 'ro', true, 'foreignAt', '', '')); /* gf_LocaleTrans('default', 'titForeignAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('중증장애인기업구분', '10', 'center', 'str', 'ro', true, 'serhandicapAt', '', '')); /* gf_LocaleTrans('default', 'titSerhandicapAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사회적기업구분', '10', 'center', 'str', 'ro', true, 'socialentrprsAt', '', '')); /* gf_LocaleTrans('default', 'titSocialentrprsAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('장애인표준사업장', '10', 'center', 'str', 'ro', true, 'dspsnStdAt', '', '')); /* gf_LocaleTrans('default', 'titDspsnStdAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('녹색제품', '10', 'center', 'str', 'ro', true, 'greenAt', '', '')); /* gf_LocaleTrans('default', 'titGreenAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('기술개발제품', '10', 'center', 'str', 'ro', true, 'technologyAt', '', '')); /* gf_LocaleTrans('default', 'titTechnologyAt') */
    dhxGridMfsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('등록일', '10', 'center', 'str', 'ro', true, 'regDt', '', '')); /* gf_LocaleTrans('default', 'titTechnologyAt') */

    dhxGridMfsbsc002 = gf_MakeDhxGrid('dataListMfsbsc002', dhxGridMfsbsc002HeaderInfo, true, false, false);
    dhxGridMfsbsc002.enableAutoWidth(false);
    dhxGridMfsbsc002.setEditable(false);
    
    dhxGridMfsbsc002.setColumnMinWidth(120,2); //넓이가 * 인 컬럼의 최소 넓이값 설정
    
    //거래처구분
    var jsonParameter1 = {codekindCode : "C004",exceptCode :"",sortOrder :"asc" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, '');
    gf_ComboDataSet(dhxGridMfsbsc002, dhxGridMfsbsc002.getColIndexById("bcncSe"), dataSource1.data, "sel");
    
    //사업자구분
    var jsonParameter2 = {codekindCode : "C060",exceptCode :"",sortOrder :"asc" };
    var dataSource2 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter2, '');
    gf_ComboDataSet(dhxGridMfsbsc002, dhxGridMfsbsc002.getColIndexById("cprSe"), dataSource2.data, "sel");
    
    //지역
    var jsonParameter1 = {codekindCode : "C079",exceptCode :"",sortOrder :"asc" };
    var dataSource1 = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, '');
    gf_ComboDataSet(dhxGridMfsbsc002, dhxGridMfsbsc002.getColIndexById("areaCode"), dataSource1.data, "sel");

};

var eventIds = [];
var cf_SetEventListenerMfsbsc002 = function() {
    // grid event
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMfsbsc002, eventIds);
    eventId = dhxGridMfsbsc002.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) {
        	fn_ExcelMfsbsc002();
	    }else if(keyCode == 40)  {   // ARROW_DOWN
	        var selectedId = dhxGridMfsbsc002.getSelectedRowId();
	        var ind        = dhxGridMfsbsc002.getSelectedCellIndex();
	        var rowIndex   = dhxGridMfsbsc002.getRowIndex(selectedId);
	        var type       = dhxGridMfsbsc002.getColType(ind);
	        dhxGridMfsbsc002.selectCell(rowIndex+1, ind);
	        if(!(type == "ro" || type == "ron" || type == "rotxt")) {
	        	dhxGridMfsbsc002.editCell();
	        }
	    }else if(keyCode == 38)  {   // ARROW_UP
	        var selectedId = dhxGridMfsbsc002.getSelectedRowId();
	        var ind        = dhxGridMfsbsc002.getSelectedCellIndex();
	        var rowIndex   = dhxGridMfsbsc002.getRowIndex(selectedId);
	        var type       = dhxGridMfsbsc002.getColType(ind);
	        dhxGridMfsbsc002.selectCell(rowIndex-1, ind);
	        if(!(type == "ro" || type == "ron" || type == "rotxt")) {
	        	dhxGridMfsbsc002.editCell();
	        }
	    }
        else return true;
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc002.attachEvent("onBeforeSelect", function(new_row,old_row,new_col_index){
    	//이부분에서 old_row 또는 Form 의 값 또는 Sub Grid의 변경 여부를 확인해서 변경이  있었다면 확인창 - "변경된 정보가 있습니다. 저장하지 않고 선택행을 변경하시겠습니까?" : 예 하면  
    	// Yes : 그대로 흘려보냄
    	// No : return false;
    	return true;
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc002.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_SelectedMfsbsc002();
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc002.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMfsbsc002, 'useAt') || cInd == gf_GetDhxGridColumId(dhxGridMfsbsc002, 'bcncNm')) { return false; }
	});
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬
    		return fn_Mfsbsc002SortGridList(ind, type, direction);
	});
    eventIds.push(eventId);

    // button event
    $('#btnAddMfsbsc002').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
        fn_AddMfsbsc002();
    });
    $('#btnSaveMfsbsc002').unbind('click').bind('click', function() {
    	gf_errorMsgClear();
    	/* 그리드에서 직접 수정이 가능해야만 체크가 됨
    	var ids = dhxGridMfsbsc002.getChangedRows(true);  //변경된 행의 ID리스트를 가져옵니다
    	if (ids == "" || ids ==null ){
    		gf_DivMsgAlert("변경된 행이 없습니다");
    		return false;
    	}	
    	*/
        fn_SaveMfsbsc002();
    });
    $('#btnRemoveMfsbsc002').unbind('click').bind('click', function() {
    	gf_errorMsgClear();
        fn_RemoveMfsbsc002();
    });
    $('#btnExcelMfsbsc002').unbind('click').bind('click', function() {
        fn_ExcelMfsbsc002();
    });
    $('#btnSearchMfsbsc002').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
        fn_SearchMfsbsc002();
    });
    $('#btnResetMfsbsc002').unbind('click').bind('click',function() {
    	gf_errorMsgClear();
        cf_InitFormMfsbsc002();
    });

    //거래처명
    $('#bcncNmSearchFormMfsbsc002').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMfsbsc002').click(); event.preventDefault(); }
    });
    
    //사업자번호
    $('#bizrnoSearchFormMfsbsc002').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMfsbsc002').click(); event.preventDefault(); }
    });    
    
    $('#pageingFormMfsbsc002 select[name="pageRowSize"]').unbind('change').bind('change', function() {
    	$('#btnSearchMfsbsc002').click();
    });
    
    //주소
	$('#btnTab1AddrSearch').unbind('click').bind('click', function(event){
		gf_ZipPopup("saveFormMfsbsc002","postCode","adres", "addr2", "fn_CallBackZipPopup");  // form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 상세주소가 들어갈 tag의 ID, 콜백
    });
	
	// 폼 이벤트 start ==========================================================================================
    //$('#saveFormMfsbsc002 input[name="bcncCode"]').unbind('change blur').bind('change blur',function() {
    //    gf_errorMsgClear();
    //    gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bcncCode', $(this).val());
    //});
	//$('#saveFormMfsbsc002 input').unbind('keypress').bind('keypress',function() {
	$('#saveFormMfsbsc002 input, select, button, textarea').unbind('keypress').bind('keypress',function() {
		if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMfsbsc002",this); }
		else return true;
    });
	
    $('#saveFormMfsbsc002 input[name="bizrno"]').unbind('change').bind('change',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'bizrno',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bizrno', $(this).val());
        }
    });
    //사업자번호 : 입력
    $('#saveFormMfsbsc002 input[name="bizrno"]').unbind('blur').bind('blur',function() {
        gf_errorMsgClear();
        var f_bizrno = gf_SetBizNoFormatter($(this).val());
        gf_FormSetValue("saveFormMfsbsc002", "bizrno",f_bizrno, '');
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'bizrno',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bizrno', f_bizrno);
        }
    });
    //$('#saveFormMfsbsc002 input[name="bplcCode"]').unbind('change blur').bind('change blur',function() {
    //    gf_errorMsgClear();
    //    gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bplcCode', $(this).val());
    //});
    $('#saveFormMfsbsc002 input[name="bcncNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'bcncNm',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bcncNm', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="reprsntNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'reprsntNm',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'reprsntNm', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="induty"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'induty',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'induty', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="bizcnd"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'bizcnd',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bizcnd', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="nltyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'nltyCode',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'nltyCode', $(this).val());
        }
    });
    $('#cprSeMfsbsc002').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'cprSe',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'cprSe', $(this).val());
        }
    });
    //$('#saveFormMfsbsc002 input[name="bcncSeMfsbsc002"]').unbind('change blur').bind('change blur',function() {
    $('#bcncSeMfsbsc002').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'bcncSe',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bcncSe', $(this).val());
        }
    });
    $('#bcncscaleSeMfsbsc002').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'bcncscaleSe',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bcncscaleSe', $(this).val());
        }
    });
    $('#taxtSeMfsbsc002').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'taxtSe',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'taxtSe', $(this).val());
        }
    });
    $('#bankCodeMfsbsc002').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'bankCode',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bankCode', $(this).val());
        }
    });    
    $('#areaCodeMfsbsc002').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'areaCode',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'areaCode', $(this).val());
        }
    });
        
    //$('#saveFormMfsbsc002 input[name="crncyCode"]').unbind('change blur').bind('change blur',function() {
    //    gf_errorMsgClear();
    //    gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'crncyCode', $(this).val());
    //});
    $('#saveFormMfsbsc002 input[name="areaNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'areaNm',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'areaNm', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="postCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'postCode',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'postCode', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="adres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'adres',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'adres', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="addr2"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'addr2',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'addr2', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="telno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'telno',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'telno', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="faxNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'faxNo',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'faxNo', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="acnutNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'acnutNo',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'acnutNo', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="dpstrNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'dpstrNm',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'dpstrNm', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="homepage"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'homepage',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'homepage', $(this).val());
        }
    });
    //$('#saveFormMfsbsc002 input[name="purchsAt"]').unbind('change blur').bind('change blur',function() {
    //    gf_errorMsgClear();
    //    var purchsAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'purchsAt', 'chkbox'))? '0' : '1';
    //    gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'purchsAt', purchsAt);
    //});
    //$('#saveFormMfsbsc002 input[name="saleofficAt"]').unbind('change blur').bind('change blur',function() {
    //    gf_errorMsgClear();
    //    var saleofficAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'saleofficAt', 'chkbox'))? '0' : '1';
    //    gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'saleofficAt', saleofficAt);
    //});
    
    $('#saveFormMfsbsc002 input[name="bcncCn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'bcncCn',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'bcncCn', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="fondDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'fondDe',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'fondDe', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="capitalAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'capitalAmt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'capitalAmt', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="yySaleAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'yySaleAmt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'yySaleAmt', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="emplCo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'emplCo',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'emplCo', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="tradeNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'tradeNo',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'tradeNo', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var useAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'useAt', 'chkbox'))? '0' : '1';
        if(useAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'useAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'useAt', useAt);
        }
    });
    //$('#saveFormMfsbsc002 input[name="atchmnflList"]').unbind('change blur').bind('change blur',function() {
    $('#saveFormMfsbsc002 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'atchmnflNo',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'atchmnflNo', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="chargerNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'chargerNm',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'chargerNm', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="chargerEmail"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'chargerEmail',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'chargerEmail', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="chargerTelno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'chargerTelno',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'chargerTelno', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="chargerDept"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'chargerDept',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'chargerDept', $(this).val());
        }
    });
    $('#saveFormMfsbsc002 input[name="chargerOfcps"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'chargerOfcps',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'chargerOfcps', $(this).val());
        }
    });
    //$('#saveFormMfsbsc002 input[name="priorPurchsAt"]').unbind('change blur').bind('change blur',function() {
    //    gf_errorMsgClear();
    //    var priorPurchsAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'priorPurchsAt', 'chkbox'))? '0' : '1';
    //    gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'priorPurchsAt', priorPurchsAt);
    //});
    $('#saveFormMfsbsc002 input[name="dsrprAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var dsrprAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'dsrprAt', 'chkbox'))? '0' : '1';
        if(dsrprAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'dsrprAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'dsrprAt', dsrprAt);
        }
    });
    $('#saveFormMfsbsc002 input[name="womanAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var womanAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'womanAt', 'chkbox'))? '0' : '1';
        if(womanAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'womanAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'womanAt', womanAt);
        }
    });
    $('#saveFormMfsbsc002 input[name="foreignAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var foreignAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'foreignAt', 'chkbox'))? '0' : '1';
        if(foreignAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'foreignAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'foreignAt', foreignAt);
        	
        }
    });
    $('#saveFormMfsbsc002 input[name="serhandicapAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var serhandicapAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'serhandicapAt', 'chkbox'))? '0' : '1';
        if(serhandicapAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'serhandicapAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'serhandicapAt', serhandicapAt);
        }
    });
    $('#saveFormMfsbsc002 input[name="socialentrprsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var socialentrprsAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'socialentrprsAt', 'chkbox'))? '0' : '1';
        if(socialentrprsAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'socialentrprsAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'socialentrprsAt', socialentrprsAt);
        }
    });
    $('#saveFormMfsbsc002 input[name="dspsnStdAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var dspsnStdAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'dspsnStdAt', 'chkbox'))? '0' : '1';
        if(dspsnStdAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'dspsnStdAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'dspsnStdAt', dspsnStdAt);
        }
    });
    $('#saveFormMfsbsc002 input[name="greenAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var greenAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'greenAt', 'chkbox'))? '0' : '1';
        if(greenAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'greenAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'greenAt', greenAt);
        }
    });
    $('#saveFormMfsbsc002 input[name="technologyAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var technologyAt = gf_IsNull(gf_FormGetValue('saveFormMfsbsc002', 'technologyAt', 'chkbox'))? '0' : '1';
        if(technologyAt != gf_DhxGetValue(dhxGridMfsbsc002, g_rid, 'technologyAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002, 'technologyAt', technologyAt);
        }
    });
    // 폼 이벤트 end ============================================================================================
    
};

var cf_InitFormMfsbsc002 = function() {
    $('#searchFormMfsbsc002').resetForm();
};

var cf_SetBindingMfsbsc002 = function() {
	//fn_FormDisabled(true);
    fn_SearchMfsbsc002();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMfsbsc002 = function(pageNum) {
	
	dhxGridMfsbsc002.clearAll();
	var pageingCnt = gf_FormGetValue('pageingFormMfsbsc002', 'pageRowSize', 'combo');
	var page = pageNum;
	if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	if(gf_IsNull(page)) page = 1;
	gf_FormSetValue('searchFormMfsbsc002', 'selectedPageNum', page, 'text');
	
    var jsonParameter = {
        bcncNm : gf_FormGetValue('searchFormMfsbsc002', 'bcncNm', 'text'),
        bcncSe : gf_FormGetValue('searchFormMfsbsc002', 'searchBcncSe', 'combo'),
        bizrno : gf_FormGetValue('searchFormMfsbsc002', 'bizrno', 'text').replaceAll('-',''),
        cprSe : gf_FormGetValue('searchFormMfsbsc002', 'SearchCprSe', 'combo'),
        useAt : gf_FormGetValue('searchFormMfsbsc002', 'useAtSearch', 'combo'),
        pageingCnt 		: pageingCnt,
        pageNum 		: page        
    };
    gf_Transaction(jsonParameter, 'mfsbsc002/searchMfsbsc002', jsonParameter, 'fn_CallbackSearchMfsbsc002', false, 'GET');
};


var fn_CallbackSearchMfsbsc002 = function(strSvcID, targetID, data) {
    dhxGridMfsbsc002.clearAll();
    
    // 그리드입력 데이터프로세스 정의
    //dhxDataProcessorMfsbsc002 = new dataProcessor(gv_ContextPath+'/mfsbsc002/saveMfsbsc002'); //lock feed url
    dhxDataProcessorMfsbsc002 = new dataProcessor('/xerp/mfsbsc002/saveMfsbsc002'); //lock feed url
    dhxDataProcessorMfsbsc002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMfsbsc002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMfsbsc002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMfsbsc002.init(dhxGridMfsbsc002); //link dataprocessor to the grid
    
    dhxDataProcessorMfsbsc002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMfsbsc002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMfsbsc002();
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
    
    dhxDataProcessorMfsbsc002.attachEvent("onValidationError",function(id,messages){
		gf_DivMsgAlert(messages.join("<br>"));      
		return false;
	});
    
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc002');
        dhxGridMfsbsc002.parse(data.data.records, 'js');
        
        dhxGridMfsbsc002.selectRow(0);
        //fn_SelectedMfsbsc002();
        fn_FindMfsbsc002();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMfsbsc002');
        $('#btnAddMfsbsc002').click();
        //fn_FormDisabled(true);
    }
    
    $('#spanCntMfsbsc002').text(gf_NumberWithCommas(data.data.totalRecordCount));
    // 페이징 버튼 생성
	gf_PageNate(data.data,'.paging','fn_SearchMfsbsc002');    
    cf_SetEventListenerMfsbsc002();
};
/**
 * 상세조회
 */
var fn_SelectedMfsbsc002 = function () {
    if(!fadeMode) {
        $('#saveFormMfsbsc002').fadeOut(gv_FadeTime, function() {
            fn_FindMfsbsc002();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveFormMfsbsc002').fadeIn(gv_FadeTime, function() {});
     } else {
         fn_FindMfsbsc002();
     }
};

var fn_FindMfsbsc002 = function() {
	/*
    var bcncCode = dhxGridMfsbsc002.cells(dhxGridMfsbsc002.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc002,'bcncCode')).getValue();
    if (!gf_IsNull(bcncCode)) {
        var jsonParameter = {
            bcncCode : bcncCode
        };
        var dataSource = gf_NoAsyncTransaction('mfsbsc002/findMfsbsc002', jsonParameter, 'GET');
        var data = dataSource.data;
        gf_FormSetValue('saveFormMfsbsc002', 'bcncCode', data.bcncCode, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'bplcCode', data.bplcCode, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'bizrno', data.bizrno, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'bcncNm', data.bcncNm, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'bcncSe', data.bcncSe, 'combo');
        gf_FormSetValue('saveFormMfsbsc002', 'cprSe', data.cprSe, 'combo');
        gf_FormSetValue('saveFormMfsbsc002', 'induty', data.induty, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'bizcnd', data.bizcnd, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'reprsntNm', data.reprsntNm, 'text');
        //gf_FormSetValue('saveFormMfsbsc002', 'nltyCode', data.nltyCode, 'text');
        //gf_FormSetValue('saveFormMfsbsc002', 'areaNm', data.areaNm, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'postCode', data.postCode, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'adres', data.adres, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'addr2', data.addr2, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'telno', data.telno, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'faxNo', data.faxNo, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'bankCode', data.bankCode, 'combo');
        gf_FormSetValue('saveFormMfsbsc002', 'acnutNo', data.acnutNo, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'dpstrNm', data.dpstrNm, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'homepage', data.homepage, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'bcncscaleSe', data.bcncscaleSe, 'combo');
        gf_FormSetValue('saveFormMfsbsc002', 'taxtSe', data.taxtSe, 'combo');
        gf_FormSetValue('saveFormMfsbsc002', 'areaCode', data.areaCode, 'combo');
        
        gf_FormSetValue('saveFormMfsbsc002', 'chargerNm', data.chargerNm, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'chargerEmail', data.chargerEmail, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'chargerTelno', data.chargerTelno, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'chargerDept', data.chargerDept, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'chargerOfcps', data.chargerOfcps, 'text');
        gf_FormSetValue('saveFormMfsbsc002', 'bcncCn', data.bcncCn, 'text');
        
        gf_FormSetValue('saveFormMfsbsc002', 'regDt', data.regDt, 'text');
        
        gf_FormSetValue('saveFormMfsbsc002', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc002', 'dsrprAt', (( data.dsrprAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc002', 'womanAt', (( data.womanAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc002', 'foreignAt', (( data.foreignAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc002', 'serhandicapAt', (( data.serhandicapAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc002', 'socialentrprsAt', (( data.socialentrprsAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc002', 'dspsnStdAt', (( data.dspsnStdAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc002', 'greenAt', (( data.greenAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc002', 'technologyAt', (( data.technologyAt == '1') ? true : false), 'chkbox');
               
        //첨부파일
        gf_FormSetValue('saveFormMfsbsc002', 'atchmnfl', data.atchmnflNo, 'text');  //첨부파일 
        gf_FormSetValue('saveFormMfsbsc002', 'atchmnflList', data.atchmnflNo, 'text');  //첨부파일 
        
    	var jsonParameter = { atchFiles : data.atchmnflNo };
		gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
        
        $('#saveFormMfsbsc002 input[name="bcncCode"]').attr('disabled', 'disabled');
        $('#saveFormMfsbsc002 input[name="regDt"]').attr('disabled', 'disabled');
        
    }
    */
	
	var rId = dhxGridMfsbsc002.getSelectedRowId();
	g_rid = rId; 
    //var status = dhxDataProcessorMfsbsc002.getState(rId);
	//gf_Trace("g_rid : " + g_rid);

    gf_FormSetValue("saveFormMfsbsc002", "bcncCode", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bcncCode',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "bizrno", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bizrno',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "bplcCode", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bplcCode',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "bcncNm", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bcncNm',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "reprsntNm", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'reprsntNm',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "induty", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'induty',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "bizcnd", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bizcnd',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "bcncSeMfsbsc002", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bcncSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMfsbsc002", "cprSeMfsbsc002", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'cprSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMfsbsc002", "nltyCode", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'nltyCode',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "bcncscaleSeMfsbsc002", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bcncscaleSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMfsbsc002", "taxtSeMfsbsc002", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'taxtSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMfsbsc002", "crncyCode", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'crncyCode',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "bankCodeMfsbsc002", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bankCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMfsbsc002", "areaCodeMfsbsc002", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'areaCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMfsbsc002", "areaNm", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'areaNm',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "postCode", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'postCode',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "adres", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'adres',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "addr2", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'addr2',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "telno", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'telno',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "faxNo", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'faxNo',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "acnutNo", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'acnutNo',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "dpstrNm", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'dpstrNm',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "homepage", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'homepage',  'grid'), '');
    //gf_FormSetValue("saveFormMfsbsc002", "purchsAt", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'purchsAt',  'grid'), '');
    //gf_FormSetValue("saveFormMfsbsc002", "saleofficAt", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'saleofficAt',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "bcncCn", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'bcncCn',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "fondDe", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'fondDe',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "capitalAmt", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'capitalAmt',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "yySaleAmt", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'yySaleAmt',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "emplCo", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'emplCo',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "tradeNo", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'tradeNo',  'grid'), '');
    gf_FormSetValue('saveFormMfsbsc002', 'useAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'useAt',  'grid') == '1') ? true : false), 'chkbox');
    
    gf_FormSetValue('saveFormMfsbsc002', 'atchmnfl', gf_DhxGetValue(dhxGridMfsbsc002, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormMfsbsc002', 'atchmnflList', gf_DhxGetValue(dhxGridMfsbsc002, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    
    gf_FormSetValue("saveFormMfsbsc002", "chargerNm", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'chargerNm',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "chargerEmail", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'chargerEmail',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "chargerTelno", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'chargerTelno',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "chargerDept", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'chargerDept',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "chargerOfcps", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'chargerOfcps',  'grid'), '');
    gf_FormSetValue("saveFormMfsbsc002", "priorPurchsAt", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'priorPurchsAt',  'grid'), '');
    gf_FormSetValue('saveFormMfsbsc002', 'dsrprAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'dsrprAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMfsbsc002', 'womanAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'womanAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMfsbsc002', 'foreignAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'foreignAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMfsbsc002', 'serhandicapAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'serhandicapAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMfsbsc002', 'socialentrprsAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'socialentrprsAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMfsbsc002', 'dspsnStdAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'dspsnStdAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMfsbsc002', 'greenAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'greenAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue('saveFormMfsbsc002', 'technologyAt', (( gf_DhxGetValue(dhxGridMfsbsc002, rId, 'technologyAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMfsbsc002", "regDt", gf_DhxGetValue(dhxGridMfsbsc002, rId, 'regDt',  'grid'), '');
    
    var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridMfsbsc002, rId, 'atchmnflNo',  'grid') };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
    
    $('#saveFormMfsbsc002 input[name="bcncCode"]').attr('disabled', 'disabled');
    $('#saveFormMfsbsc002 input[name="regDt"]').attr('disabled', 'disabled');
    
    //gf_Trace("g : " + gf_DhxGetValue(dhxGridMfsbsc002, rId, 'atchmnflNo',  'grid'));
    
    //fn_FormDisabled(false);
    
    modifyAt = true;
    keyDuplication = false;
};

//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_Mfsbsc002SortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMfsbsc002, 'rnum')){
		
		var sortOrder = gf_FormGetValue('searchFormMfsbsc002', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('searchFormMfsbsc002', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMfsbsc002, ind);

		if(direction == "des"){
			dhxGridMfsbsc002.setSortImgState(true, ind, 'des');
	  		gf_FormSetValue('searchFormMfsbsc002', 'sortDirection', 'des', 'text');
	  		gf_FormSetValue('searchFormMfsbsc002', 'sortColumId', gf_GetDhxGridColum(dhxGridMfsbsc002, ind), 'text');
		}else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {
			dhxGridMfsbsc002.setSortImgState(false);
	  		gf_FormSetValue('searchFormMfsbsc002', 'sortDirection', '', 'text');
	  		gf_FormSetValue('searchFormMfsbsc002', 'sortColumId', '', 'text');
	  		dhxGridMfsbsc002.sortRows(0,"int","asc");  //번호로 강제 정렬
	  		return false;
		}else {
			dhxGridMfsbsc002.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('searchFormMfsbsc002', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('searchFormMfsbsc002', 'sortColumId', gf_GetDhxGridColum(dhxGridMfsbsc002, ind), 'text');
		}
	  	return true;
	}
  	return false;
}

/**
 * 입력폼 초기화
 */
var fn_InitInputFormMfsbsc002 = function() {
    modifyAt = false;
    $('#saveFormMfsbsc002').resetForm();
    $("#cprSe option:eq(1)").prop("selected", "selected"); //법인사업자
    $("#taxtSe option:eq(1)").prop("selected", "selected"); //일반과세 
    
    gf_FormSetValue('saveFormMfsbsc002', 'useAt', "1", 'chkbox'); ///체크옵션 
    $('#saveFormMfsbsc002 input[name="bcncCode"]').attr('disabled', 'disabled');
    $("#atchmnflList").val("");  //hidden 초기화 
    $("#atchmnfl").val("");  //hidden 초기화 
};

/**
 * 추가(신규)
 */
var fn_AddMfsbsc002 = function() {
    dhxGridMfsbsc002.clearSelection();
    fn_InitInputFormMfsbsc002();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //bcncCode
    initValueArr.push(''); //bcncNm
    initValueArr.push(''); //bizrno
    initValueArr.push(''); //bcncSe
    initValueArr.push(''); //cprSe
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //bizcnd
    initValueArr.push(''); //induty
    initValueArr.push(''); //reprsntNm
    initValueArr.push(''); //areaCode
    initValueArr.push(''); //bplcCode
    initValueArr.push(''); //nltyCode
    initValueArr.push(''); //bcncscaleSe
    initValueArr.push(''); //taxtSe
    initValueArr.push(''); //crncyCode
    initValueArr.push(''); //bankCode
    
    initValueArr.push(''); //areaNm
    initValueArr.push(''); //postCode
    initValueArr.push(''); //adres
    initValueArr.push(''); //addr2
    initValueArr.push(''); //telno
    initValueArr.push(''); //faxNo
    initValueArr.push(''); //acnutNo
    initValueArr.push(''); //dpstrNm
    initValueArr.push(''); //homepage
    initValueArr.push(''); //purchsAt
    initValueArr.push(''); //saleofficAt
    
    initValueArr.push(''); //bcncCn
    initValueArr.push(''); //fondDe
    initValueArr.push(''); //capitalAmt
    initValueArr.push(''); //yySaleAmt
    initValueArr.push(''); //emplCo
    initValueArr.push(''); //tradeNo
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //chargerNm
    initValueArr.push(''); //chargerEmail
    initValueArr.push(''); //chargerTelno
    initValueArr.push(''); //chargerDept
    initValueArr.push(''); //chargerOfcps
    initValueArr.push(''); //priorPurchsAt
    initValueArr.push(''); //dsrprAt
    initValueArr.push(''); //womanAt
    initValueArr.push(''); //foreignAt
    initValueArr.push(''); //serhandicapAt
    initValueArr.push(''); //socialentrprsAt
    initValueArr.push(''); //dspsnStdAt
    initValueArr.push(''); //greenAt
    initValueArr.push(''); //technologyAt
    initValueArr.push(''); //regDt
    dhxGridMfsbsc002.addRow(dhxGridMfsbsc002.uid(), initValueArr, 0);
    dhxGridMfsbsc002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc002');
    //fn_FormDisabled(false);
};

/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMfsbsc002 *').prop('disabled', status);
};

var fn_SaveMfsbsc002 = function() {
	
	var edCnt = 0;
	dhxGridMfsbsc002.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorMfsbsc002.getState(rowId))) {
			edCnt++;
		}
    });
	
	if(edCnt == 0){
		gf_DivMsgAlert("변경된 정보가 없습니다.");
	}
	else {
		gf_DivMsgConfirm(gv_QueSave, 'fn_SaveMfsbsc002_Send()', '');
	}
}
var fn_SaveMfsbsc002_Send = function() {
	if(fn_GridValidation(dhxGridMfsbsc002, dhxDataProcessorMfsbsc002)) {
        dhxDataProcessorMfsbsc002.sendData();
    }
	
    /*
	if($('#saveFormMfsbsc002').validate().form()){
        //if(keyDuplication && !fn_CheckDupMfsbsc002()) return false;
               
        var jsonParameter = {
            bcncCode : gf_FormGetValue('saveFormMfsbsc002', 'bcncCode', 'text'),
            bplcCode : gf_FormGetValue('saveFormMfsbsc002', 'bplcCode', 'text'),
            bizrno : gf_FormGetValue('saveFormMfsbsc002', 'bizrno', 'text').replaceAll('-',''),
            bcncNm : gf_FormGetValue('saveFormMfsbsc002', 'bcncNm', 'text'),
            bcncSe : gf_FormGetValue('saveFormMfsbsc002', 'bcncSe', 'combo'),
            cprSe : gf_FormGetValue('saveFormMfsbsc002', 'cprSe', 'combo'),
            induty : gf_FormGetValue('saveFormMfsbsc002', 'induty', 'text'),
            bizcnd : gf_FormGetValue('saveFormMfsbsc002', 'bizcnd', 'text'),
            reprsntNm : gf_FormGetValue('saveFormMfsbsc002', 'reprsntNm', 'text'),
            postCode : gf_FormGetValue('saveFormMfsbsc002', 'postCode', 'text'),
            adres : gf_FormGetValue('saveFormMfsbsc002', 'adres', 'text'),
            addr2 : gf_FormGetValue('saveFormMfsbsc002', 'addr2', 'text'),
            telno : gf_FormGetValue('saveFormMfsbsc002', 'telno', 'text'),
            faxNo : gf_FormGetValue('saveFormMfsbsc002', 'faxNo', 'text'),
            bankCode : gf_FormGetValue('saveFormMfsbsc002', 'bankCode', 'combo'),
            acnutNo : gf_FormGetValue('saveFormMfsbsc002', 'acnutNo', 'text'),
            dpstrNm : gf_FormGetValue('saveFormMfsbsc002', 'dpstrNm', 'text'),
            homepage : gf_FormGetValue('saveFormMfsbsc002', 'homepage', 'text'),

            bcncscaleSe : gf_FormGetValue('saveFormMfsbsc002', 'bcncscaleSe', 'combo'),
            taxtSe : gf_FormGetValue('saveFormMfsbsc002', 'taxtSe', 'combo'),
            bcncCn : gf_FormGetValue('saveFormMfsbsc002', 'bcncCn', 'text'),
            areaCode : gf_FormGetValue('saveFormMfsbsc002', 'areaCode', 'combo'),
            chargerNm : gf_FormGetValue('saveFormMfsbsc002', 'chargerNm', 'text'),
            chargerEmail : gf_FormGetValue('saveFormMfsbsc002', 'chargerEmail', 'text'),
            chargerTelno : gf_FormGetValue('saveFormMfsbsc002', 'chargerTelno', 'text'),
            chargerDept : gf_FormGetValue('saveFormMfsbsc002', 'chargerDept', 'text'),
            chargerOfcps : gf_FormGetValue('saveFormMfsbsc002', 'chargerOfcps', 'text'),
            
            regDt : gf_FormGetValue('saveFormMfsbsc002', 'regDt', 'text'),
                       
            useAt : gf_FormGetValue('saveFormMfsbsc002', 'useAt', 'chkboxYN'),
            dsrprAt : gf_FormGetValue('saveFormMfsbsc002', 'dsrprAt', 'chkboxYN'),
            womanAt : gf_FormGetValue('saveFormMfsbsc002', 'womanAt', 'chkboxYN'),
            foreignAt : gf_FormGetValue('saveFormMfsbsc002', 'foreignAt', 'chkboxYN'),
            serhandicapAt : gf_FormGetValue('saveFormMfsbsc002', 'serhandicapAt', 'chkboxYN'),
            socialentrprsAt : gf_FormGetValue('saveFormMfsbsc002', 'socialentrprsAt', 'chkboxYN'),
            dspsnStdAt : gf_FormGetValue('saveFormMfsbsc002', 'dspsnStdAt', 'chkboxYN'),
            greenAt : gf_FormGetValue('saveFormMfsbsc002', 'greenAt', 'chkboxYN'),
            technologyAt : gf_FormGetValue('saveFormMfsbsc002', 'technologyAt', 'chkboxYN'),
                        
            atchmnflNo : gf_FormGetValue('saveFormMfsbsc002', 'atchmnfl', 'text'), //첨부파일 
            
            //gf_IsNull(gf_FormGetValue('saveFormStmUsers', 'emplAt', 'chkbox'))? '0' : '1',
            
            nltyCode :"",
            areaNm :"",
            purchsAt :"0",
            saleofficAt :"0",
            fondDe :"",
            capitalAmt :"0",
            yySaleAmt :"0",
            emplCo :"0",
            tradeNo :"0",
            crncyCode :"0",
            
        };
        
        gf_Transaction(jsonParameter, 'mfsbsc002/saveMfsbsc002', jsonParameter, 'fn_CallbackSaveMfsbsc002', false, 'POST');
    }
    */
};

var fn_CallbackSaveMfsbsc002 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        fn_SearchMfsbsc002();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 삭제
 */
var fn_RemoveMfsbsc002 = function() {
    var rowId = dhxGridMfsbsc002.getSelectedRowId();
    var state = dhxDataProcessorMfsbsc002.getState(rowId);
    /*
    if(state == 'inserted') {
    	dhxGridMfsbsc002.deleteRow(rowId);
    	fn_InitInputFormMfsbsc002();
    }
    else {
    	var bcncCode = gf_FormGetValue('saveFormMfsbsc002', 'bcncCode', 'text');
        if(gf_IsNull(bcncCode)) {
            gf_DivMsgAlert('삭제할 거래처 코드를 선택해 주세요.');  // gf_LocaleTrans('default', 'titbcncCode') 
            return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMfsbsc002Send()', '');
        }
    	//dhxDataProcessorMfsbsc002.setUpdated(rowId, true, 'deleted');
    }
    */
    if(state == 'inserted') dhxGridMfsbsc002.deleteRow(rowId);
    else dhxDataProcessorMfsbsc002.setUpdated(rowId, true, 'deleted');
};

var fn_RemoveMfsbsc002Send = function() {
	var bcncCode = gf_FormGetValue('saveFormMfsbsc002', 'bcncCode', 'text');
    var jsonParameter = {
    		bcncCode : bcncCode
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc002/removeMfsbsc002', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgDelete'));
        fn_SearchMfsbsc002();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 엑셀다운로드
 */
var fn_ExcelMfsbsc002 = function () {
    var titMfsbsc002 = '거래처관리'; /* gf_LocaleTrans('default', 'titMfsbsc002') */
    var jsonParameter = {
            bcncNm : gf_FormGetValue('searchFormMfsbsc002', 'bcncNm', 'text'),
            bcncSe : gf_FormGetValue('searchFormMfsbsc002', 'searchBcncSe', 'combo'),
            bizrno : gf_FormGetValue('searchFormMfsbsc002', 'bizrno', 'text').replaceAll('-',''),
            cprSe : gf_FormGetValue('searchFormMfsbsc002', 'SearchCprSe', 'combo'),
            useAt : gf_FormGetValue('searchFormMfsbsc002', 'useAtSearch', 'combo'),
    };
    var header = [[
        '거래처 코드' /* gf_LocaleTrans('default', 'titBcncCode') */,
        '사업장 코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '사업자등록번호' /* gf_LocaleTrans('default', 'titBizrno') */,
        '거래처 명' /* gf_LocaleTrans('default', 'titBcncNm') */,
        '거래처 구분' /* gf_LocaleTrans('default', 'titBcncSe') */,
        '법인 구분' /* gf_LocaleTrans('default', 'titCprSe') */,
        '업종' /* gf_LocaleTrans('default', 'titInduty') */,
        '업태' /* gf_LocaleTrans('default', 'titBizcnd') */,
        '대표자 명' /* gf_LocaleTrans('default', 'titreprsntNm') */,
        '국적 코드' /* gf_LocaleTrans('default', 'titNltyCode') */,
        '지역 명' /* gf_LocaleTrans('default', 'titAreaNm') */,
        '우편 코드' /* gf_LocaleTrans('default', 'titPostCode') */,
        '주소' /* gf_LocaleTrans('default', 'titAdres') */,
        '주소상세' /* gf_LocaleTrans('default', 'titAddr2') */,
        '전화번호' /* gf_LocaleTrans('default', 'titTelno') */,
        '팩스 번호' /* gf_LocaleTrans('default', 'titFaxNo') */,
        '은행 코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '계좌 번호' /* gf_LocaleTrans('default', 'titAcnutNo') */,
        '예금주 명' /* gf_LocaleTrans('default', 'titDpstrNm') */,
        'HOMEPAGE' /* gf_LocaleTrans('default', 'titHomepage') */,
        '매입 여부' /* gf_LocaleTrans('default', 'titPurchsAt') */,
        '매출처 여부' /* gf_LocaleTrans('default', 'titSaleofficAt') */,
        '거래처규모 구분' /* gf_LocaleTrans('default', 'titBcncscaleSe') */,
        '과세 구분' /* gf_LocaleTrans('default', 'titTaxtSe') */,
        '거래처 내용' /* gf_LocaleTrans('default', 'titBcncCn') */,
        '설립 일자' /* gf_LocaleTrans('default', 'titFondDe') */,
        '자본 금액' /* gf_LocaleTrans('default', 'titCapitalAmt') */,
        '년 매출 금액' /* gf_LocaleTrans('default', 'titYySaleAmt') */,
        '사원 수' /* gf_LocaleTrans('default', 'titEmplCo') */,
        '무역업등록 번호' /* gf_LocaleTrans('default', 'titTradeNo') */,
        '통화 코드' /* gf_LocaleTrans('default', 'titCrncyCode') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '장애인기업 여부' /* gf_LocaleTrans('default', 'titDsrprAt') */,
        '여성대표기업 여부' /* gf_LocaleTrans('default', 'titWomanAt') */,
        '외자기업 여부' /* gf_LocaleTrans('default', 'titForeignAt') */,
        '중증장애인기업 여부' /* gf_LocaleTrans('default', 'titSerhandicapAt') */,
        '사회적기업 여부' /* gf_LocaleTrans('default', 'titSocialentrprsAt') */,
        '장애자 표준 여부' /* gf_LocaleTrans('default', 'titDspsnStdAt') */,
        '녹색제품 여부' /* gf_LocaleTrans('default', 'titGreenAt') */,
        '기술개발제품 여부' /* gf_LocaleTrans('default', 'titTechnologyAt') */,
        '지역코드' /* gf_LocaleTrans('default', 'titAreaCode') */,
        '담당자명' /* gf_LocaleTrans('default', 'titChargerNm') */,
        '담당자이메일' /* gf_LocaleTrans('default', 'titChargerEmail') */,
        '담당자 전화번호' /* gf_LocaleTrans('default', 'titChargerTelno') */,
        '담당자부서' /* gf_LocaleTrans('default', 'titChargerDept') */,
        '담당자 직위' /* gf_LocaleTrans('default', 'titChargerOfcps') */
    ]];
    var dataId = [[ 'bcncCode', 'bplcCode', 'bizrno', 'bcncNm', 'bcncSe', 'cprSe', 'induty', 'bizcnd', 'reprsntNm', 'nltyCode', 'areaCode', 'postCode', 'adres', 'addr2', 'telno', 'faxNo', 'bankCode', 'acnutNo', 'dpstrNm', 'homepage', 'purchsAt', 'saleofficAt', 'bcncscaleSe', 'taxtSe', 'bcncCn', 'fondDe', 'capitalAmt', 'yySaleAmt', 'emplCo', 'tradeNo', 'crncyCode', 'useAt', 'dsrprAt', 'womanAt', 'foreignAt', 'serhandicapAt', 'socialentrprsAt', 'dspsnStdAt', 'greenAt', 'technologyAt', 'areaCode', 'chargerNm', 'chargerEmail', 'chargerTelno', 'chargerDept', 'chargerOfcps' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'left', 'left', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'left', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMfsbsc002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMfsbsc002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mfsbsc002/excelMfsbsc002', jsonParameter);
};


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
	$.each( data.data, function( key, value ) {
		uploadedFileKeysPrg3.push(value.atchFileId);				
		uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
		
		atchFileList.push('<tr style=\"border:0\">');
		atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');
		
		idx++;
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
		gf_FormSetValue('saveFormMfsbsc002', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormMfsbsc002', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
        callbacks.fire();
	}
};

var fn_CallBackZipPopup = function(data){
	if(!gf_IsNull(data)){
		gf_FormSetValue('saveFormMfsbsc002', 'postCode', data.zipno, 'text');  
		gf_FormSetValue('saveFormMfsbsc002', 'adres', data.roadAddr1, 'text');
		gf_FormSetValue('saveFormMfsbsc002', 'addr2',(data.roadAddrDetail + " " + data.roadAddr2).trim(), 'text');
	}
}

/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
	var valid = true;
	var edCnt = 0;
	
	dhxGridObjet.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
			edCnt++;
			var sBcncNm = gf_DhxGetValue(dhxGridObjet, rowId, 'bcncNm', 'grid');
			
			//gf_Trace("** Rid : dhxDataProcessor.getState(rowId) : " + rowId + " : " + dhxDataProcessor.getState(rowId));
			//gf_Trace("** sBcncNm : " + sBcncNm);
			
			if(!gv_ValidateMethods.required( sBcncNm )){
				gf_DivMsgAlert("거래처명은 필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bcncNm');
				valid = false;
			}
			var sReprsntNm = gf_DhxGetValue(dhxGridObjet, rowId, 'reprsntNm', 'grid');
			if(valid && !gv_ValidateMethods.required( sReprsntNm )){
				gf_DivMsgAlert("대표자명은 필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reprsntNm');
				valid = false;
			}
			var sBizrno = gf_DhxGetValue(dhxGridObjet, rowId, 'bizrno', 'grid');
			if(valid && !gv_ValidateMethods.required( sBizrno )){
				gf_DivMsgAlert("사업자등록번호는 필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bizrno');
				valid = false;
			}
			sBizrno = sBizrno.replaceAll('-','');
			if(valid && sBizrno.length != 10){
				gf_DivMsgAlert("사업자등록번호 길이는 10자리 입니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bizrno');
				valid = false;
			}
			var sCprSe = gf_DhxGetValue(dhxGridObjet, rowId, 'cprSe', 'grid');
			if(valid && !gv_ValidateMethods.required( sCprSe )){
				gf_DivMsgAlert("사업자유형은 필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'cprSe');
				valid = false;
			}
			var sBizcnd = gf_DhxGetValue(dhxGridObjet, rowId, 'bizcnd', 'grid');
			if(valid && !gv_ValidateMethods.required( sBizcnd )){
				gf_DivMsgAlert("업태는 필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bizcnd');
				valid = false;
			}
			var sInduty = gf_DhxGetValue(dhxGridObjet, rowId, 'induty', 'grid');
			if(valid && !gv_ValidateMethods.required( sInduty )){
				gf_DivMsgAlert("종목은 필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'induty');
				valid = false;
			}
			if(!valid){
				dhxGridObjet.selectRow(rowId-1);
				return valid;
			}
			
			gf_DhxSetValue(dhxGridObjet, rowId, 'bplcCode', gBplcCode, 'grid');
		}
    });
	
	if(edCnt == 0){
		gf_DivMsgAlert("변경된 정보가 없습니다.");
		valid = false;
	}
	return valid;
};
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
};

