/**
 *    프로그램       : 금융계좌관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.24
 *    사용테이블      : MFS_DEPOSIT
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMfsbsc003();
    cf_SetComponentsMfsbsc003();
    cf_SetEventListenerMfsbsc003();
    cf_InitFormMfsbsc003();
    cf_SetBindingMfsbsc003();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMfsbsc003 = function() {
    gf_SetMenuPath();
    $('#saveFormMfsbsc003').validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMfsbsc003;
var cf_SetComponentsMfsbsc003 = function() {
    var dhxGridMfsbsc003HeaderInfo = [];
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMfsbsc003" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '200', 'left', 'str', 'ro', false, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titAcnutNo') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('사업장 코드', '100', 'center', 'str', 'ro', false, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('예금종류', '100', 'center', 'str', 'ro', false, 'dpstKind', '', '')); /* gf_LocaleTrans('default', 'titDpstKind') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('예금명', '100', 'center', 'str', 'ro', false, 'dpstNm', '', '')); /* gf_LocaleTrans('default', 'titDpstNm') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '100', 'center', 'str', 'ro', false, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('은행코드', '100', 'center', 'str', 'ro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titBankCode') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('지점명', '100', 'center', 'str', 'ro', false, 'bankNm', '', '')); /* gf_LocaleTrans('default', 'titBankNm') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('은행 개설 지점', '100', 'center', 'str', 'ro', false, 'estblBhf', '', '')); /* gf_LocaleTrans('default', 'titEstblBhf') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('개설일자', '100', 'center', 'str', 'ro', false, 'estblDe', '', '')); /* gf_LocaleTrans('default', 'titEstblDe') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('만기일자', '100', 'center', 'str', 'ro', false, 'exprtnDe', '', '')); /* gf_LocaleTrans('default', 'titExprtnDe') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('해지일자', '100', 'center', 'str', 'ro', false, 'trmnatDe', '', '')); /* gf_LocaleTrans('default', 'titTrmnatDe') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('이자율', '100', 'center', 'str', 'ro', false, 'intrRt', '', '')); /* gf_LocaleTrans('default', 'titIntrRt') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('주거래통장여부', '100', 'center', 'str', 'ro', false, 'bassBnkbAt', '', '')); /* gf_LocaleTrans('default', 'titBassBnkbAt') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'center', 'str', 'ro', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ro', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMfsbsc003HeaderInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '', '')); /* 컬럼수가 10이상일 경우 좌우 스크롤이 생기도록 더미를 붙였음 개발시 필요에 따라 삭제해도 무방함 */
    dhxGridMfsbsc003 = gf_MakeDhxGrid('dataListMfsbsc003', dhxGridMfsbsc003HeaderInfo, true, false, false);
    dhxGridMfsbsc003.enableAutoWidth(true);
};

var eventIds = [];
var cf_SetEventListenerMfsbsc003 = function() {
    // grid event
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMfsbsc003, eventIds);
    eventId = dhxGridMfsbsc003.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) fn_ExcelMfsbsc003();
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc003.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_SelectedMfsbsc003();
    });
    eventIds.push(eventId);
    // button event
    $('#btnAddMfsbsc003').unbind('click').bind('click', function(event){
        fn_AddMfsbsc003()
    });
    $('#btnSaveMfsbsc003').unbind('click').bind('click', function() {
        fn_SaveMfsbsc003();
    });
    $('#btnRemoveMfsbsc003').unbind('click').bind('click', function() {
        fn_RemoveMfsbsc003();
    });
    $('#btnExcelMfsbsc003').unbind('click').bind('click', function() {
        fn_ExcelMfsbsc003();
    });
    $('#btnSearchMfsbsc003').unbind('click').bind('click', function(event){
        fn_SearchMfsbsc003();
    });
    $('#btnResetMfsbsc003').unbind('click').bind('click',function() {
        cf_InitFormMfsbsc003();
    });
    // other event
    $('#checkAllMfsbsc003').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridMfsbsc003, $('#checkAllMfsbsc003').prop('checked'), 'selYn');
    });
    $('#acnutNoSearchFormMfsbsc003').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMfsbsc003').click(); event.preventDefault(); }
    });
};

var cf_InitFormMfsbsc003 = function() {
    $('#searchFormMfsbsc003').clearForm();
};

var cf_SetBindingMfsbsc003 = function() {
    fn_SearchMfsbsc003();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMfsbsc003 = function(key) {
    var jsonParameter = {
        acnutNo : gf_FormGetValue('searchFormMfsbsc003', 'acnutNo', 'text')
    };
    gf_Transaction(key, 'mfsbsc003/searchMfsbsc003', jsonParameter, 'fn_CallbackSearchMfsbsc003', false, 'GET');
};

var fn_CallbackSearchMfsbsc003 = function(strSvcID, targetID, data) {
    dhxGridMfsbsc003.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc003');
        dhxGridMfsbsc003.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
            var findCell = dhxGridMfsbsc003.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMfsbsc003,'acnutNo'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridMfsbsc003.selectRowById(findCell[0][0]);
            } else {
                dhxGridMfsbsc003.selectRow(0);
            }
        } else {
            dhxGridMfsbsc003.selectRow(0);
        }
        fn_SelectedMfsbsc003();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMfsbsc003');
        $('#btnAddMfsbsc003').click();
    }
    $('#spanCntMfsbsc003').text(data.data.records.length);
    cf_SetEventListenerMfsbsc003();
};
/**
 * 상세조회
 */
var fn_SelectedMfsbsc003 = function () {
    if(!fadeMode) {
        $('#saveFormMfsbsc003').fadeOut(gv_FadeTime, function() {
            fn_FindMfsbsc003();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveFormMfsbsc003').fadeIn(gv_FadeTime, function() {});
     } else {
         fn_FindMfsbsc003();
     }
};

var fn_FindMfsbsc003 = function() {
    var acnutNo = dhxGridMfsbsc003.cells(dhxGridMfsbsc003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc003,'acnutNo')).getValue();
    if (!gf_IsNull(acnutNo)) {
        var jsonParameter = {
            acnutNo : acnutNo
        };
        var dataSource = gf_NoAsyncTransaction('mfsbsc003/findMfsbsc003', jsonParameter, 'GET');
        var data = dataSource.data;
        gf_FormSetValue('saveFormMfsbsc003', 'acnutNo', data.acnutNo, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'bplcCode', data.bplcCode, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'dpstKind', data.dpstKind, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'dpstNm', data.dpstNm, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'dpstrNm', data.dpstrNm, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'bankCode', data.bankCode, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'bankNm', data.bankNm, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'estblBhf', data.estblBhf, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'estblDe', data.estblDe, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'exprtnDe', data.exprtnDe, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'trmnatDe', data.trmnatDe, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'intrRt', data.intrRt, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'bassBnkbAt', data.bassBnkbAt, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'rm', data.rm, 'text');
        gf_FormSetValue('saveFormMfsbsc003', 'useAt', data.useAt, 'text');
        // 수정시 그리드 정보 업데이트 
        var rId= dhxGridMfsbsc003.getSelectedRowId();
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'acnutNo', data.acnutNo, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'bplcCode', data.bplcCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'dpstKind', data.dpstKind, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'dpstNm', data.dpstNm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'dpstrNm', data.dpstrNm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'bankCode', data.bankCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'bankNm', data.bankNm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'estblBhf', data.estblBhf, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'estblDe', data.estblDe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'exprtnDe', data.exprtnDe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'trmnatDe', data.trmnatDe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'intrRt', data.intrRt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'bassBnkbAt', data.bassBnkbAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'rm', data.rm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc003, rId, 'useAt', data.useAt, 'grid');
        $('#saveFormMfsbsc003 input[name="acnutNo"]').attr('disabled', 'disabled');
    }
    modifyAt = true;
    keyDuplication = false;
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMfsbsc003 = function() {
    modifyAt = false;
    $('#saveFormMfsbsc003 input[name="acnutNo"]').removeAttr('disabled');
    $('#saveFormMfsbsc003').clearForm();
};
/**
 * 데이터 중복 체크
 */
var fn_CheckDupMfsbsc003 = function(){
    var acnutNo = gf_FormGetValue('saveFormMfsbsc003', 'acnutNo', 'text');
    if(gf_IsNull(acnutNo)) {
        gf_DivMsgAlert('계좌번호를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titacnutNo') */
        return false;
    }
    var jsonParameter = {
        acnutNo : acnutNo
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc003/findMfsbsc003', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.acnutNo)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('계좌번호가 존재합니다.'); /* gf_LocaleTrans('default', 'titacnutNo') */
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
var fn_AddMfsbsc003 = function() {
    dhxGridMfsbsc003.clearSelection();
    if(!fadeRegs) {
        $('#saveFormMfsbsc003').fadeOut(gv_FadeTime, function() {
            fn_InitInputFormMfsbsc003();
            fadeRegs = true;
            fadeMode = false;
            keyDuplication = true;
            $('#btnPopEmpSearchMfsbsc003').show();
        });
        $('#saveFormMfsbsc003').fadeIn(gv_FadeTime, function() {});
    } else {
        fn_InitInputFormMfsbsc003();
    }
}

var fn_SaveMfsbsc003 = function() {    
    if($('#saveFormMfsbsc003').validate().form()){
        if(keyDuplication && !fn_CheckDupMfsbsc003()) return false;
        var jsonParameter = {
            acnutNo : gf_FormGetValue('saveFormMfsbsc003', 'acnutNo', 'text'),
            bplcCode : gf_FormGetValue('saveFormMfsbsc003', 'bplcCode', 'text'),
            dpstKind : gf_FormGetValue('saveFormMfsbsc003', 'dpstKind', 'text'),
            dpstNm : gf_FormGetValue('saveFormMfsbsc003', 'dpstNm', 'text'),
            dpstrNm : gf_FormGetValue('saveFormMfsbsc003', 'dpstrNm', 'text'),
            bankCode : gf_FormGetValue('saveFormMfsbsc003', 'bankCode', 'text'),
            bankNm : gf_FormGetValue('saveFormMfsbsc003', 'bankNm', 'text'),
            estblBhf : gf_FormGetValue('saveFormMfsbsc003', 'estblBhf', 'text'),
            estblDe : gf_FormGetValue('saveFormMfsbsc003', 'estblDe', 'text'),
            exprtnDe : gf_FormGetValue('saveFormMfsbsc003', 'exprtnDe', 'text'),
            trmnatDe : gf_FormGetValue('saveFormMfsbsc003', 'trmnatDe', 'text'),
            intrRt : gf_FormGetValue('saveFormMfsbsc003', 'intrRt', 'text'),
            bassBnkbAt : gf_FormGetValue('saveFormMfsbsc003', 'bassBnkbAt', 'text'),
            rm : gf_FormGetValue('saveFormMfsbsc003', 'rm', 'text'),
            useAt : gf_FormGetValue('saveFormMfsbsc003', 'useAt', 'text')
        };
        gf_Transaction(jsonParameter, 'mfsbsc003/saveMfsbsc003', jsonParameter, 'fn_CallbackSaveMfsbsc003', false, 'POST');
    }
};

var fn_CallbackSaveMfsbsc003 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        if(modifyAt) {
            fn_FindMfsbsc003();
        } else {
            fn_SearchMfsbsc003(strSvcID.acnutNo);
        }
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 삭제
 */
var fn_RemoveMfsbsc003 = function() {
    var acnutNos = gf_GetCheckedGridValueArr(dhxGridMfsbsc003, 'selYn', 'acnutNo');
    if(gf_IsNull(acnutNos)) {
        gf_DivMsgAlert('삭제할 계좌번호를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titacnutNo') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMfsbsc003Send()', '');
    }
};

var fn_RemoveMfsbsc003Send = function() {
    var acnutNos = gf_GetCheckedGridValueArr(dhxGridMfsbsc003, 'selYn', 'acnutNo');
    var jsonParameter = {
        acnutNos : acnutNos.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc003/removeMfsbsc003', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchMfsbsc003();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 엑셀다운로드
 */
var fn_ExcelMfsbsc003 = function () {
    var titMfsbsc003 = '금융계좌관리'; /* gf_LocaleTrans('default', 'titMfsbsc003') */
    var jsonParameter = {
        acnutNo : gf_FormGetValue('searchFormMfsbsc003', 'acnutNo', 'text')
    };
    var header = [[
        '계좌번호' /* gf_LocaleTrans('default', 'titAcnutNo') */,
        '사업장 코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '예금종류' /* gf_LocaleTrans('default', 'titDpstKind') */,
        '예금명' /* gf_LocaleTrans('default', 'titDpstNm') */,
        '예금주명' /* gf_LocaleTrans('default', 'titDpstrNm') */,
        '은행코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '지점명' /* gf_LocaleTrans('default', 'titBankNm') */,
        '은행 개설 지점' /* gf_LocaleTrans('default', 'titEstblBhf') */,
        '개설일자' /* gf_LocaleTrans('default', 'titEstblDe') */,
        '만기일자' /* gf_LocaleTrans('default', 'titExprtnDe') */,
        '해지일자' /* gf_LocaleTrans('default', 'titTrmnatDe') */,
        '이자율' /* gf_LocaleTrans('default', 'titIntrRt') */,
        '주거래통장여부' /* gf_LocaleTrans('default', 'titBassBnkbAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */
    ]];
    var dataId = [[ 'acnutNo', 'bplcCode', 'dpstKind', 'dpstNm', 'dpstrNm', 'bankCode', 'bankNm', 'estblBhf', 'estblDe', 'exprtnDe', 'trmnatDe', 'intrRt', 'bassBnkbAt', 'rm', 'useAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMfsbsc003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMfsbsc003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mfsbsc003/excelMfsbsc003', jsonParameter);
};
