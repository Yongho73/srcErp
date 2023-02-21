/**
 *    프로그램       : 법인카드관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.23
 *    사용테이블      : MFS_CARD
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;
var gBplcCode = ""; 
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMfsbsc004();
    cf_SetComponentsMfsbsc004();
    cf_SetEventListenerMfsbsc004();
    cf_InitFormMfsbsc004();
    cf_SetBindingMfsbsc004();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMfsbsc004 = function() {
    gf_SetMenuPath();
    $('#saveFormMfsbsc004').validate({ errorElement: 'div', ignore: '' });
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormMfsbsc004');
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode =userInfo.data.bplcCode;   
    
    gf_ComboCode('divComboCardIssuInstt', 'cardIssuInstt', 'cardIssuInstt', 'sel', 'C207', '' , '', '','ordr', 'required', '',''); //카드사 
    gf_ComboCode('divComboBankCode', 'bankCode', 'bankCode', 'sel', 'C010', '' , '', '','ordr', 'required', '',''); //은행코드
    gf_ComboCode('divComboCardSe', 'cardSe', 'cardSe', 'sel', 'C169', '' , '', '','ordr', '', '',''); //카드구분
    
    var dhxCalendarStartDate = new dhtmlXCalendarObject([{input:"issuDeSaveFormMfsbsc004", button:"startDateIcon"},{input:"discardDeSaveFormMfsbsc004", button:"startDateIcon"}]);
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime()    
    
    fn_monthCalender();
    
    $(document).on("keyup", "input:text[numberOnly]", function() {
    	$(this).number(true);
    });

};

var dhxGridMfsbsc004;
var cf_SetComponentsMfsbsc004 = function() {
    var dhxGridMfsbsc004HeaderInfo = [];
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'rnum', '', '')); /* 번호 */
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMfsbsc004" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* 선택  */
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드번호', '*', 'center', 'str', 'ro', false, 'dashCardNo', '', '')); /* gf_LocaleTrans('default', 'titCardNo') */
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('부서', '100', 'center', 'str', 'ro', false, 'deptNm', '', ''));  //gf_LocaleTrans('default', 'titDeptCode')     
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('관리자', '100', 'center', 'str', 'ro', false, 'ownEmpnm', '', ''));//  gf_LocaleTrans('default', 'titOwnEmpno') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드번호', '0', 'center', 'str', 'ro', true, 'cardNo', '', ''));//  gf_LocaleTrans('default', 'titOwnEmpno') 
    
/*   dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('사업장 코드', '100', 'center', 'str', 'ro', false, 'bplcCode', '', ''));  gf_LocaleTrans('default', 'titBplcCode') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드종류명', '100', 'center', 'str', 'ro', false, 'cardNm', '', ''));  gf_LocaleTrans('default', 'titCardNm') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드 약칭', '100', 'center', 'str', 'ro', false, 'cardAbrv', '', ''));  gf_LocaleTrans('default', 'titCardAbrv') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드발급기관 (카드사)', '100', 'center', 'str', 'ro', false, 'cardIssuInstt', '', ''));  gf_LocaleTrans('default', 'titCardIssuInstt') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드구분코드', '100', 'center', 'str', 'ro', false, 'cardSe', '', ''));  gf_LocaleTrans('default', 'titCardSe') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드상세구분', '100', 'center', 'str', 'ro', false, 'carddetailSe', '', ''));  gf_LocaleTrans('default', 'titCarddetailSe') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드유효년월', '100', 'center', 'str', 'ro', false, 'cardValidYm', '', ''));  gf_LocaleTrans('default', 'titCardValidYm') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('부서코드', '100', 'center', 'str', 'ro', false, 'deptCode', '', ''));  gf_LocaleTrans('default', 'titDeptCode') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('사원번호(소유자)', '100', 'center', 'str', 'ro', false, 'ownEmpno', '', ''));  gf_LocaleTrans('default', 'titOwnEmpno') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드사용자', '100', 'center', 'str', 'ro', false, 'useEmpno', '', ''));  gf_LocaleTrans('default', 'titUseEmpno') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('발급일자', '100', 'center', 'str', 'ro', false, 'issuDe', '', ''));  gf_LocaleTrans('default', 'titIssuDe') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('만기일자', '100', 'center', 'str', 'ro', false, 'exprtnDe', '', ''));  gf_LocaleTrans('default', 'titExprtnDe') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('사용중지되면 폐기일자가 등록되야 됨', '100', 'center', 'str', 'ro', false, 'discardDe', '', ''));  gf_LocaleTrans('default', 'titDiscardDe') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('결재일', '100', 'center', 'str', 'ro', false, 'setleDay', '', ''));  gf_LocaleTrans('default', 'titSetleDay') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ro', false, 'useAt', '', ''));  gf_LocaleTrans('default', 'titUseAt') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('은행코드', '100', 'center', 'str', 'ro', false, 'bankCode', '', ''));  gf_LocaleTrans('default', 'titBankCode') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('출금계좌번호', '100', 'center', 'str', 'ro', false, 'defrayAcnutNo', '', ''));  gf_LocaleTrans('default', 'titDefrayAcnutNo') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('카드CVC번호', '100', 'center', 'str', 'ro', false, 'cvcNo', '', ''));  gf_LocaleTrans('default', 'titCvcNo') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('한도금액', '100', 'right', 'int', 'ro', false, 'lmtAmt', '', ''));  gf_LocaleTrans('default', 'titLmtAmt') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('한도금액2', '100', 'right', 'int', 'ro', false, 'lmt2Amt', '', ''));  gf_LocaleTrans('default', 'titLmt2Amt') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'center', 'str', 'ro', false, 'rm', '', ''));  gf_LocaleTrans('default', 'titRm') 
    dhxGridMfsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '', ''));  컬럼수가 10이상일 경우 좌우 스크롤이 생기도록 더미를 붙였음 개발시 필요에 따라 삭제해도 무방함 */
    
    dhxGridMfsbsc004 = gf_MakeDhxGrid('dataListMfsbsc004', dhxGridMfsbsc004HeaderInfo, true, false, false);
    dhxGridMfsbsc004.enableAutoWidth(true);
};

var eventIds = [];
var cf_SetEventListenerMfsbsc004 = function() {
    // grid event
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMfsbsc004, eventIds);
    // grid sorting
    eventId = dhxGridMfsbsc004.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬  
       fn_SortGridList(ind, type, direction);
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc004.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) fn_ExcelMfsbsc004();
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc004.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_SelectedMfsbsc004();
    });
    eventIds.push(eventId);
    // button event
    $('#btnAddMfsbsc004').unbind('click').bind('click', function(event){
        fn_AddMfsbsc004()
    });
    $('#btnSaveMfsbsc004').unbind('click').bind('click', function() {
        fn_SaveMfsbsc004();
    });
    $('#btnRemoveMfsbsc004').unbind('click').bind('click', function() {
        fn_RemoveMfsbsc004();
    });
    $('#btnExcelMfsbsc004').unbind('click').bind('click', function() {
        fn_ExcelMfsbsc004();
    });
    $('#btnSearchMfsbsc004').unbind('click').bind('click', function(event){
        // 재조회시 정렬 초기화
        fn_InitGridSort();
        fn_SearchMfsbsc004('1','');
    });
    $('#btnResetMfsbsc004').unbind('click').bind('click',function() {
        cf_InitFormMfsbsc004();
    });
    // other event
    $('#checkAllMfsbsc004').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridMfsbsc004, $('#checkAllMfsbsc004').prop('checked'), 'selYn');
    });
    $('#cardNoSearchFormMfsbsc004').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMfsbsc004').click(); event.preventDefault(); }
    });

    
    //사용자 찾기 
    $('#btnUseEmpSearch').unbind('click').bind('click', function(event){
    	// form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    	gf_EmpPopup("saveFormMfsbsc004","useEmpnoSaveFormMfsbsc004","useEmpnmSaveFormMfsbsc004", gBplcCode, "N", "");  //
    });

    //관리자 찾기 
    $('#btnOwnEmpSearch').unbind('click').bind('click', function(event){
    	gf_EmpPopup("saveFormMfsbsc004","ownEmpnoSaveFormMfsbsc004","ownEmpnmSaveFormMfsbsc004", gBplcCode, "N", "");  //
    });     
    //부서찾기 
    $('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("saveFormMfsbsc004","deptCodeSaveFormMfsbsc004","deptNmSaveFormMfsbsc004", gBplcCode, "N", null);  
    });
    //계좌찾기 
    $('#btnAcnutNoSearch').unbind('click').bind('click', function(event){
		gf_DepositPopup("saveFormMfsbsc004","","", gBplcCode, "N", fn_CallbackPopup);  // 
    });
    
};

var cf_InitFormMfsbsc004 = function() {
    $('#searchFormMfsbsc004').clearForm();
};

var cf_SetBindingMfsbsc004 = function() {
    fn_SearchMfsbsc004('1', '');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMfsbsc004 = function(pageNum, key) {

    var pageingCnt = gf_FormGetValue('pageingFormMfsbsc004', 'pageRowSize', 'combo');
    var page = pageNum;
    if(gf_IsNull(pageingCnt)) pageingCnt = 20;
    if(gf_IsNull(page)) page = 1;
    gf_FormSetValue('searchFormMfsbsc004', 'selectedPageNum', page, 'text');

    var jsonParameter = {
        cardNo : gf_FormGetValue('searchFormMfsbsc004', 'cardNo', 'text'),
        useAt : gf_FormGetValue('searchFormMfsbsc004', 'useAtSearch', 'combo'),
        sortDirection : gf_FormGetValue('searchFormMfsbsc004', 'sortDirection', 'text'),
        sortColumId : gf_FormGetValue('searchFormMfsbsc004', 'sortColumId', 'text'),
        pageingCnt : pageingCnt,
        pageNum : page
    };
    gf_Transaction(key, 'mfsbsc004/searchMfsbsc004', jsonParameter, 'fn_CallbackSearchMfsbsc004', false, 'GET');
};

var fn_CallbackSearchMfsbsc004 = function(strSvcID, targetID, data) {
    dhxGridMfsbsc004.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc004');
        dhxGridMfsbsc004.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
            var findCell = dhxGridMfsbsc004.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMfsbsc004,'cardNo'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridMfsbsc004.selectRowById(findCell[0][0]);
            } else {
                dhxGridMfsbsc004.selectRow(0);
            }
        } else {
            dhxGridMfsbsc004.selectRow(0);
        }
        // 정렬 컬럼이 있으면 정렬 상태 유지
        var sortOrder = gf_FormGetValue('searchFormMfsbsc004', 'sortDirection','text');
        var sortColumId = gf_FormGetValue('searchFormMfsbsc004', 'sortColumId','text');
        if(!gf_IsNull(sortOrder) && !gf_IsNull(sortColumId)) {
            dhxGridMfsbsc004.setSortImgState(true, gf_GetDhxGridColumId(dhxGridMfsbsc004, sortColumId), sortOrder);
        }
        fn_SelectedMfsbsc004();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMfsbsc004');
        $('#btnAddMfsbsc004').click();
    }
    $('#spanCntMfsbsc004').text(data.data.totalRecordCount);
    // 페이징 버튼 생성
    gf_PageNate(data.data,'.paging','fn_SearchMfsbsc004');
    cf_SetEventListenerMfsbsc004();
};
/**
 * 상세조회
 */
var fn_SelectedMfsbsc004 = function () {
    if(!fadeMode) {
        $('#saveFormMfsbsc004').fadeOut(gv_FadeTime, function() {
            fn_FindMfsbsc004();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveFormMfsbsc004').fadeIn(gv_FadeTime, function() {});
     } else {
         fn_FindMfsbsc004();
     }
};

var fn_FindMfsbsc004 = function() {
    var cardNo = dhxGridMfsbsc004.cells(dhxGridMfsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc004,'cardNo')).getValue();
    //var cardNo = dhxGridMfsbsc004.cells(dhxGridMfsbsc004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc004,'cardNo')).getValue().replaceAll('-','');
        
    if (!gf_IsNull(cardNo)) {
        var jsonParameter = {
            cardNo : cardNo
        };
        var dataSource = gf_NoAsyncTransaction('mfsbsc004/findMfsbsc004', jsonParameter, 'GET');
        var data = dataSource.data;
        
        gf_FormSetValue('saveFormMfsbsc004', 'cardNo', data.cardNo, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'cardNo1', data.cardNo1, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'cardNo2', data.cardNo2, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'cardNo3', data.cardNo3, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'cardNo4', data.cardNo4, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'bplcCode', data.bplcCode, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'cardNm', data.cardNm, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'cardAbrv', data.cardAbrv, 'text');  //카드 약어
        gf_FormSetValue('saveFormMfsbsc004', 'cardIssuInstt', data.cardIssuInstt, 'combo');
        gf_FormSetValue('saveFormMfsbsc004', 'cardSe', data.cardSe, 'combo');
        //gf_FormSetValue('saveFormMfsbsc004', 'carddetailSe', data.carddetailSe, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'cardValidYm', data.cardValidYm, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'deptCode', data.deptCode, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'deptNm', data.deptNm, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'ownEmpno', data.ownEmpno, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'ownEmpno', data.ownEmpnm, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'useEmpno', data.useEmpno, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'useEmpno', data.useEmpnm, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'issuDe', data.issuDe, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'exprtnDe', data.exprtnDe, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'discardDe', data.discardDe, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'setleDay', data.setleDay, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'bankCode', data.bankCode, 'combo');
        gf_FormSetValue('saveFormMfsbsc004', 'defrayAcnutNo', data.defrayAcnutNo, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'cvcNo', data.cvcNo, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'lmtAmt', data.lmtAmt, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'lmt2Amt', data.lmt2Amt, 'text');
        gf_FormSetValue('saveFormMfsbsc004', 'rm', data.rm, 'text');
        
        gf_FormSetValue('saveFormMfsbsc003', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');
        
        // 수정시 그리드 정보 업데이트 
        /*
        var rId= dhxGridMfsbsc004.getSelectedRowId();
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'cardNo', data.cardNo, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'bplcCode', data.bplcCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'cardNm', data.cardNm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'cardAbrv', data.cardAbrv, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'cardIssuInstt', data.cardIssuInstt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'cardSe', data.cardSe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'carddetailSe', data.carddetailSe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'cardValidYm', data.cardValidYm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'deptCode', data.deptCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'ownEmpno', data.ownEmpno, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'useEmpno', data.useEmpno, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'issuDe', data.issuDe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'exprtnDe', data.exprtnDe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'discardDe', data.discardDe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'setleDay', data.setleDay, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'useAt', data.useAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'bankCode', data.bankCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'defrayAcnutNo', data.defrayAcnutNo, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'cvcNo', data.cvcNo, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'lmtAmt', data.lmtAmt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'lmt2Amt', data.lmt2Amt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc004, rId, 'rm', data.rm, 'grid');
        */
        
        $('#saveFormMfsbsc004 input[name="cardNo"]').attr('disabled', 'disabled');
    }
    modifyAt = true;
    keyDuplication = false;
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMfsbsc004 = function() {
    modifyAt = false;
    $('#saveFormMfsbsc004 input[name="cardNo"]').removeAttr('disabled');
    $('#saveFormMfsbsc004').clearForm();
    gf_FormSetValue('saveFormMfsbsc004', 'useAt', "1", 'chkbox'); // 
    gf_FormSetValue('saveFormMfsbsc004', 'bplcCode', gBplcCode, 'text'); //     
};
/**
 * 데이터 중복 체크
 */
var fn_CheckDupMfsbsc004 = function(){
    //var cardNo = gf_FormGetValue('saveFormMfsbsc004', 'cardNo', 'text');
    var cardNo = gf_FormGetValue('saveFormMfsbsc004', 'cardNo1', 'text') +gf_FormGetValue('saveFormMfsbsc004', 'cardNo2', 'text')+gf_FormGetValue('saveFormMfsbsc004', 'cardNo3', 'text')+gf_FormGetValue('saveFormMfsbsc004', 'cardNo4', 'text');

    if(gf_IsNull(cardNo)) {
        gf_DivMsgAlert('카드번호를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titcardNo') */
        return false;
    }
    var jsonParameter = {
        cardNo : cardNo
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc004/findMfsbsc004', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.cardNo)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('카드번호가 존재합니다.'); /* gf_LocaleTrans('default', 'titcardNo') */
            keyDuplication = true;
            return false;
        }
    } else {
        gf_DivMsgAlert('중복확인이 되지 않습니다.');
        return false;
    }    
};
/**
 * 저장 (입력, 수정)
 */
var fn_AddMfsbsc004 = function() {
    dhxGridMfsbsc004.clearSelection();
    if(!fadeRegs) {
        $('#saveFormMfsbsc004').fadeOut(gv_FadeTime, function() {
            fn_InitInputFormMfsbsc004();
            fadeRegs = true;
            fadeMode = false;
            keyDuplication = true;
            $('#btnPopEmpSearchMfsbsc004').show();
        });
        $('#saveFormMfsbsc004').fadeIn(gv_FadeTime, function() {});
    } else {
        fn_InitInputFormMfsbsc004();
    }
}

var fn_SaveMfsbsc004 = function() {    
    if($('#saveFormMfsbsc004').validate().form()){
        if(keyDuplication && !fn_CheckDupMfsbsc004()) return false;
        
        var cardNoTemp = gf_FormGetValue('saveFormMfsbsc004', 'cardNo1', 'text') +gf_FormGetValue('saveFormMfsbsc004', 'cardNo2', 'text')+gf_FormGetValue('saveFormMfsbsc004', 'cardNo3', 'text')+gf_FormGetValue('saveFormMfsbsc004', 'cardNo4', 'text');
        
       // gf_Trace("cardNo::"+cardNoTemp);
        
        
        var jsonParameter = {
            //cardNo : gf_FormGetValue('saveFormMfsbsc004', 'cardNo', 'text'),
            cardNo : cardNoTemp,
            bplcCode : gf_FormGetValue('saveFormMfsbsc004', 'bplcCode', 'text'),
            cardNm : gf_FormGetValue('saveFormMfsbsc004', 'cardNm', 'text'),
            cardAbrv : gf_FormGetValue('saveFormMfsbsc004', 'cardAbrv', 'text'),
            cardIssuInstt : gf_FormGetValue('saveFormMfsbsc004', 'cardIssuInstt', 'combo'),
            cardSe : gf_FormGetValue('saveFormMfsbsc004', 'cardSe', 'combo'),
            carddetailSe : gf_FormGetValue('saveFormMfsbsc004', 'carddetailSe', 'text'),
            cardValidYm : gf_FormGetValue('saveFormMfsbsc004', 'cardValidYm', 'text').replaceAll('-',''),
            deptCode : gf_FormGetValue('saveFormMfsbsc004', 'deptCode', 'text'),
            ownEmpno : gf_FormGetValue('saveFormMfsbsc004', 'ownEmpno', 'text'),
            useEmpno : gf_FormGetValue('saveFormMfsbsc004', 'useEmpno', 'text'),
            issuDe : gf_FormGetValue('saveFormMfsbsc004', 'issuDe', 'text').replaceAll('-',''),
            exprtnDe : gf_FormGetValue('saveFormMfsbsc004', 'exprtnDe', 'text').replaceAll('-',''),
            discardDe : gf_FormGetValue('saveFormMfsbsc004', 'discardDe', 'text').replaceAll('-',''),
            setleDay : gf_FormGetValue('saveFormMfsbsc004', 'setleDay', 'text'),
            useAt : gf_FormGetValue('saveFormMfsbsc004', 'useAt', 'chkboxYN'),
            bankCode : gf_FormGetValue('saveFormMfsbsc004', 'bankCode', 'combo'),
            defrayAcnutNo : gf_FormGetValue('saveFormMfsbsc004', 'defrayAcnutNo', 'text'),
            cvcNo : gf_FormGetValue('saveFormMfsbsc004', 'cvcNo', 'text'),
            lmtAmt : gf_FormGetValue('saveFormMfsbsc004', 'lmtAmt', 'text'),
            lmt2Amt : gf_FormGetValue('saveFormMfsbsc004', 'lmt2Amt', 'text'),
            rm : gf_FormGetValue('saveFormMfsbsc004', 'rm', 'text'),
            //carddetailSe:"",
        };
        gf_Transaction(jsonParameter, 'mfsbsc004/saveMfsbsc004', jsonParameter, 'fn_CallbackSaveMfsbsc004', false, 'POST');
    }
};

var fn_CallbackSaveMfsbsc004 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        if(modifyAt) {
        	fn_FindMfsbsc004();
        } else {
            cf_InitFormMfsbsc004();
            fn_SearchMfsbsc004((data.data.page == 0) ? '1' : data.data.page, strSvcID.cardNo);
        }
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 삭제
 */
var fn_RemoveMfsbsc004 = function() {
    var cardNos = gf_GetCheckedGridValueArr(dhxGridMfsbsc004, 'selYn', 'cardNo');
    if(gf_IsNull(cardNos)) {
        gf_DivMsgAlert('삭제할 카드번호를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titcardNo') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMfsbsc004Send()', '');
    }
};

var fn_RemoveMfsbsc004Send = function() {
    var cardNos = gf_GetCheckedGridValueArr(dhxGridMfsbsc004, 'selYn', 'cardNo');
    var jsonParameter = {
        cardNos : cardNos.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc004/removeMfsbsc004', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchMfsbsc004();
        $("#checkAllMfsbsc004").prop('checked', false) ;  //상단 체크박스 해제    
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 엑셀다운로드
 */
var fn_ExcelMfsbsc004 = function () {
    var titMfsbsc004 = '법인카드관리'; /* gf_LocaleTrans('default', 'titMfsbsc004') */
    var jsonParameter = {
        cardNo : gf_FormGetValue('searchFormMfsbsc004', 'cardNo', 'text'),
        useAt : gf_FormGetValue('searchFormMfsbsc004', 'useAtSearch', 'combo'),
    };
    var header = [[
        '카드번호' /* gf_LocaleTrans('default', 'titCardNo') */,
        '사업장 코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '카드종류명' /* gf_LocaleTrans('default', 'titCardNm') */,
        '카드 약칭' /* gf_LocaleTrans('default', 'titCardAbrv') */,
        '카드발급기관' /* gf_LocaleTrans('default', 'titCardIssuInstt') */,
        '카드구분코드' /* gf_LocaleTrans('default', 'titCardSe') */,
        '카드상세구분' /* gf_LocaleTrans('default', 'titCarddetailSe') */,
        '카드유효년월' /* gf_LocaleTrans('default', 'titCardValidYm') */,
        '부서코드' /* gf_LocaleTrans('default', 'titDeptCode') */,
        '사원번호(소유자)' /* gf_LocaleTrans('default', 'titOwnEmpno') */,
        '카드사용자' /* gf_LocaleTrans('default', 'titUseEmpno') */,
        '발급일자' /* gf_LocaleTrans('default', 'titIssuDe') */,
        '만기일자' /* gf_LocaleTrans('default', 'titExprtnDe') */,
        '사용중지되면 폐기일자가 등록되야 됨' /* gf_LocaleTrans('default', 'titDiscardDe') */,
        '결재일' /* gf_LocaleTrans('default', 'titSetleDay') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '은행코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '출금계좌번호' /* gf_LocaleTrans('default', 'titDefrayAcnutNo') */,
        '카드CVC번호' /* gf_LocaleTrans('default', 'titCvcNo') */,
        '한도금액' /* gf_LocaleTrans('default', 'titLmtAmt') */,
        '한도금액2' /* gf_LocaleTrans('default', 'titLmt2Amt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'cardNo', 'bplcCode', 'cardNm', 'cardAbrv', 'cardIssuInstt', 'cardSe', 'carddetailSe', 'cardValidYm', 'deptCode', 'ownEmpno', 'useEmpno', 'issuDe', 'exprtnDe', 'discardDe', 'setleDay', 'useAt', 'bankCode', 'defrayAcnutNo', 'cvcNo', 'lmtAmt', 'lmt2Amt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMfsbsc004 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMfsbsc004;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mfsbsc004/excelMfsbsc004', jsonParameter);
};

/**
 * 그리드정렬
 */
var fn_SortGridList = function(ind, type, direction){
    if(ind != gf_GetDhxGridColumId(dhxGridMfsbsc004, 'rnum')){

        var sortOrder = gf_FormGetValue('dhxGridMfsbsc004', 'sortDirection', 'text');
        var sortColumId = gf_FormGetValue('dhxGridMfsbsc004', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMfsbsc004, ind);

        // 정렬 컬럼이 바뀌면 정렬방식 초기화
        if(sortColumId != nowSortColumId) sortOrder = '';
        sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;

        dhxGridMfsbsc004.setSortImgState(true, ind, sortOrder);
        gf_FormSetValue('searchFormMfsbsc004', 'sortDirection', sortOrder, 'text');
        gf_FormSetValue('searchFormMfsbsc004', 'sortColumId', gf_GetDhxGridColum(dhxGridMfsbsc004, ind), 'text');

        fn_SearchMfsbsc004(gf_FormGetValue('searchFormMfsbsc004', 'selectedPageNum', 'text'), '');
    }
}

var fn_InitGridSort = function(){
    dhxGridMfsbsc004.setSortImgState(false);
    gf_FormSetValue('searchFormMfsbsc004', 'sortDirection', '', 'text');
    gf_FormSetValue('searchFormMfsbsc004', 'sortColumId', '', 'text');
}

//계좌팝업 콜백
var fn_CallbackPopup = function(data) {
	
	///gf_Trace("data::"+JSON.stringify(data));
	
	gf_FormSetValue('saveFormMfsbsc004', 'defrayAcnutNo', data.acnutNo, 'text');
    //gf_FormSetValue('saveFormMfsbsc004', 'defrayAcnutNoSaveFormMfsbsc004', data.acnutNo, 'text');
    gf_FormSetValue('saveFormMfsbsc004', 'bankCode', data.bankCode, 'combo');
    gf_FormSetValue('saveFormMfsbsc004', 'bplcCode', data.bplcCode, 'text');
};

//월달력 
var fn_monthCalender =  function(){
    var currentYear = (new Date()).getFullYear()+10;
    var startYear = currentYear-10;

    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $('#cardValidYmSaveFormMfsbsc004').monthpicker(options);
}

