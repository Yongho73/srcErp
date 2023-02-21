/**
 *    프로그램       : 계정과목관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.21
 *    사용테이블      : MFS_ACNT_TITLE
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;
var gBplcCode;
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMfsbsc001();
    cf_SetComponentsMfsbsc001();
    cf_SetEventListenerMfsbsc001();
    cf_InitFormMfsbsc001();
    cf_SetBindingMfsbsc001();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMfsbsc001 = function() {
    gf_SetMenuPath();
    $('#saveFormMfsbsc001').validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divSearchComboAcntSeCode', 'comboSrhAcntSeCode', 'comboSrhAcntSeCode', 'search', 'C037', '' , '', '','ordr', '', '',''); //계정유형  acntSeCode

    
    gf_ComboCode('divComboAcntSeCode', 'comboAcntSeCode', 'comboAcntSeCode', 'sel', 'C037', '' , '', '','ordr', 'required', ''); //계정유형  acntSeCode
    gf_ComboCode('divComboLrSeCode', 'comboLrSeCode', 'comboLrSeCode', 'sel', 'C029', '' , '', '', 'ordr', 'required', ''); //재무제표좌우구분표시   lrSeCode
    
    gf_RadioCode('divBalanceMarklcSe', 'balanceMarklcSe', 'C045',  '', 'ordr', ''); //잔액표기위치   balanceMarklcSe
    
    //사용자정보 
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode =userInfo.data.bplcCode
  
};

var dhxGridMfsbsc001;
var cf_SetComponentsMfsbsc001 = function() {
    var dhxGridMfsbsc001HeaderInfo = [];
    dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
    dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('계정코드', '150', 'center', 'str', 'ro', false, 'acntCode', '', '')); /* gf_LocaleTrans('default', 'titAcntCode') */
    dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('계정명', '*', 'left', 'str', 'ro', false, 'acntNm', '', '')); /* gf_LocaleTrans('default', 'titAcntNm') */
    dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('기표여부','80', 'center', 'str', 'ch', false, 'slipBaltAt', '', '')); 
    //dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('출력용', '100', 'center', 'str', 'ro', false, 'outptAcntNm', '', ''));
    
    
    dhxGridMfsbsc001 = gf_MakeDhxGrid('dataListMfsbsc001', dhxGridMfsbsc001HeaderInfo, true, false, false);
    dhxGridMfsbsc001.enableAutoWidth(true);
    dhxGridMfsbsc001.setEditable (false);
};

var eventIds = [];
var cf_SetEventListenerMfsbsc001 = function() {
    // grid event
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMfsbsc001, eventIds);
    eventId = dhxGridMfsbsc001.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) fn_ExcelMfsbsc001();
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc001.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_SelectedMfsbsc001();
    });
    eventIds.push(eventId);
    // button event
    $('#btnAddMfsbsc001').unbind('click').bind('click', function(event){
        fn_AddMfsbsc001()
    });
    $('#btnSaveMfsbsc001').unbind('click').bind('click', function() {
        fn_SaveMfsbsc001();
    });
    $('#btnRemoveMfsbsc001').unbind('click').bind('click', function() {
        fn_RemoveMfsbsc001();
    });
    $('#btnExcelMfsbsc001').unbind('click').bind('click', function() {
        fn_ExcelMfsbsc001();
    });
    $('#btnSearchMfsbsc001').unbind('click').bind('click', function(event){
        fn_SearchMfsbsc001();
    });
    $('#btnResetMfsbsc001').unbind('click').bind('click',function() {
        cf_InitFormMfsbsc001();
    });

    $('#acntCodeSearchFormMfsbsc001, #acntNmSearchFormMfsbsc001').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMfsbsc001').click(); event.preventDefault(); }
    });
    
    $('#btnCheckDup').unbind("click").bind("click",function() {
    	fn_CheckDupMfsbsc001();
    }); 
  
    //상위계정찾기 팝업 
    $('#btnAcntCdSearch').unbind("click").bind("click",function() {
    	gf_AcntCodePopup("form1","","", gBplcCode, "N", fn_CallbackPopup); ;
    }); 
    
};

var cf_InitFormMfsbsc001 = function() {
    $('#searchFormMfsbsc001').clearForm();
};

var cf_SetBindingMfsbsc001 = function() {
    fn_SearchMfsbsc001();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMfsbsc001 = function(key) {
    var jsonParameter = {
    	acntSeCode : gf_FormGetValue('searchFormMfsbsc001', 'comboSrhAcntSeCode', 'combo'),
        acntCode : gf_FormGetValue('searchFormMfsbsc001', 'acntCode', 'text'),
        acntNm : gf_FormGetValue('searchFormMfsbsc001', 'acntNm', 'text'),
    };
    gf_Transaction(key, 'mfsbsc001/searchMfsbsc001', jsonParameter, 'fn_CallbackSearchMfsbsc001', false, 'GET');
};

var fn_CallbackSearchMfsbsc001 = function(strSvcID, targetID, data) {
    dhxGridMfsbsc001.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc001');
        dhxGridMfsbsc001.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
            var findCell = dhxGridMfsbsc001.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMfsbsc001,'acntCode'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridMfsbsc001.selectRowById(findCell[0][0]);
            } else {
                dhxGridMfsbsc001.selectRow(0);
            }
        } else {
            dhxGridMfsbsc001.selectRow(0);
        }
        fn_SelectedMfsbsc001();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMfsbsc001');
        $('#btnAddMfsbsc001').click();
    }
    $('#spanCntMfsbsc001').text(data.data.records.length);
    cf_SetEventListenerMfsbsc001();
};
/**
 * 상세조회
 */
var fn_SelectedMfsbsc001 = function () {
    if(!fadeMode) {
        $('#saveFormMfsbsc001').fadeOut(gv_FadeTime, function() {
            fn_FindMfsbsc001();
            fadeMode = true;
            fadeRegs = false;
            $('.btnDupMfsbsc001').hide();
        });
        $('#saveFormMfsbsc001').fadeIn(gv_FadeTime, function() {});
     } else {
         fn_FindMfsbsc001();
     }
};

var fn_FindMfsbsc001 = function() {
    var acntCode = dhxGridMfsbsc001.cells(dhxGridMfsbsc001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc001,'acntCode')).getValue();
    if (!gf_IsNull(acntCode)) {
        var jsonParameter = {
            acntCode : acntCode
        };
        var dataSource = gf_NoAsyncTransaction('mfsbsc001/findMfsbsc001', jsonParameter, 'GET');
        var data = dataSource.data;
        gf_FormSetValue('saveFormMfsbsc001', 'acntCode', data.acntCode, 'text');
        gf_FormSetValue('saveFormMfsbsc001', 'acntNm', data.acntNm, 'text');
        gf_FormSetValue('saveFormMfsbsc001', 'upperAcntCode', data.upperAcntCode, 'text');
        gf_FormSetValue('saveFormMfsbsc001', 'upperAcntNm', data.upperAcntNm, 'text');
        gf_FormSetValue('saveFormMfsbsc001', 'bplcCode', data.bplcCode, 'text');
        gf_FormSetValue('saveFormMfsbsc001', 'acntAbrvNm', data.acntAbrvNm, 'text');
        gf_FormSetValue('saveFormMfsbsc001', 'outptAcntNm', data.outptAcntNm, 'text');
        gf_FormSetValue('saveFormMfsbsc001', 'treeLvl', data.treeLvl, 'combo');
        
        gf_FormSetValue('saveFormMfsbsc001', 'balanceMarklcSe', data.balanceMarklcSe, 'radio');
        gf_FormSetValue('saveFormMfsbsc001', 'comboLrSeCode', data.lrSeCode, 'combo');
        gf_FormSetValue('saveFormMfsbsc001', 'comboAcntSeCode', data.acntSeCode, 'combo');
        
        //gf_FormSetValue('saveFormMfsbsc001', 'bankCode', data.bankCode, 'text');
        //gf_FormSetValue('saveFormMfsbsc001', 'mgrtAcnutNo', data.mgrtAcnutNo, 'text');    
        //gf_FormSetValue('saveFormMfsbsc001', 'fundAcntAt', data.fundAcntAt, 'text');
               
        gf_FormSetValue('saveFormMfsbsc001', 'slipBaltAt', (( data.slipBaltAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc001', 'stacntTrgetAt', (( data.stacntTrgetAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc001', 'ledgrMgrtAt', (( data.ledgrMgrtAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc001', 'pblntfAcntAt', (( data.pblntfAcntAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc001', 'minusAt', (( data.minusAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMfsbsc001', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');
        
        gf_FormSetValue('saveFormMfsbsc001', 'rm', data.rm, 'text'); //비고
        
        // 수정시 그리드 정보 업데이트 
        /*
        var rId= dhxGridMfsbsc001.getSelectedRowId();
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'acntCode', data.acntCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'acntNm', data.acntNm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'upperAcntCode', data.upperAcntCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'bplcCode', data.bplcCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'acntAbrvNm', data.acntAbrvNm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'outptAcntNm', data.outptAcntNm, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'treeLvl', data.treeLvl, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'balanceMarklcSe', data.balanceMarklcSe, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'lrSeCode', data.lrSeCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'acntSeCode', data.acntSeCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'slipBaltAt', data.slipBaltAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'stacntTrgetAt', data.stacntTrgetAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'bankCode', data.bankCode, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'mgrtAcnutNo', data.mgrtAcnutNo, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'fundAcntAt', data.fundAcntAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'ledgrMgrtAt', data.ledgrMgrtAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'pblntfAcntAt', data.pblntfAcntAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'minusAt', data.minusAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'useAt', data.useAt, 'grid');
        gf_DhxSetValue(dhxGridMfsbsc001, rId, 'rm', data.rm, 'grid');
        */
        $('#saveFormMfsbsc001 input[name="acntCode"]').attr('disabled', 'disabled');
    }
    modifyAt = true;
    keyDuplication = false;
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMfsbsc001 = function() {
    modifyAt = false;
    $('#saveFormMfsbsc001 input[name="acntCode"]').removeAttr('disabled');
    $('#saveFormMfsbsc001').clearForm();
    
    gf_FormSetValue('saveFormMfsbsc001', 'useAt', "1", 'chkbox'); // 
    gf_FormSetValue('saveFormMfsbsc001', 'bplcCode', gBplcCode, 'text'); // 
    gf_FormSetValue('saveFormMfsbsc001', 'treeLvl', 3, 'combo');
    
};
/**
 * 데이터 중복 체크
 */
var fn_CheckDupMfsbsc001 = function(){
    var acntCode = gf_FormGetValue('saveFormMfsbsc001', 'acntCode', 'text');
    if(gf_IsNull(acntCode)) {
        gf_DivMsgAlert('계정코드를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titacntCode') */
        return false;
    }
    var jsonParameter = {
        acntCode : acntCode
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc001/findMfsbsc001', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.acntCode)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('계정코드가 존재합니다.'); /* gf_LocaleTrans('default', 'titacntCode') */
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
var fn_AddMfsbsc001 = function() {
    dhxGridMfsbsc001.clearSelection();
    if(!fadeRegs) {
        $('#saveFormMfsbsc001').fadeOut(gv_FadeTime, function() {
            fn_InitInputFormMfsbsc001();
            fadeRegs = true;
            fadeMode = false;
            keyDuplication = true;
            $('.btnDupMfsbsc001').show();
        });
        $('#saveFormMfsbsc001').fadeIn(gv_FadeTime, function() {});
    } else {
        fn_InitInputFormMfsbsc001();
    }
}

var fn_SaveMfsbsc001 = function() {    
    if($('#saveFormMfsbsc001').validate().form()){
        if(keyDuplication && !fn_CheckDupMfsbsc001()) return false;
        var jsonParameter = {
            acntCode : gf_FormGetValue('saveFormMfsbsc001', 'acntCode', 'text'),
            acntNm : gf_FormGetValue('saveFormMfsbsc001', 'acntNm', 'text'),
            upperAcntCode : gf_FormGetValue('saveFormMfsbsc001', 'upperAcntCode', 'text'),
            bplcCode : gf_FormGetValue('saveFormMfsbsc001', 'bplcCode', 'text'),
            acntAbrvNm : gf_FormGetValue('saveFormMfsbsc001', 'acntAbrvNm', 'text'),
            outptAcntNm : gf_FormGetValue('saveFormMfsbsc001', 'outptAcntNm', 'text'),
            treeLvl : gf_FormGetValue('saveFormMfsbsc001', 'treeLvl', 'combo'),
            balanceMarklcSe : gf_FormGetValue('saveFormMfsbsc001', 'balanceMarklcSe', 'radio'),
            lrSeCode : gf_FormGetValue('saveFormMfsbsc001', 'comboLrSeCode', 'combo'),
            acntSeCode : gf_FormGetValue('saveFormMfsbsc001', 'comboAcntSeCode', 'combo'),
            slipBaltAt : gf_FormGetValue('saveFormMfsbsc001', 'slipBaltAt', 'chkboxYN'),
            stacntTrgetAt : gf_FormGetValue('saveFormMfsbsc001', 'stacntTrgetAt', 'chkboxYN'),
            bankCode : gf_FormGetValue('saveFormMfsbsc001', 'bankCode', 'text'),
            mgrtAcnutNo : gf_FormGetValue('saveFormMfsbsc001', 'mgrtAcnutNo', 'text'),
            fundAcntAt : gf_FormGetValue('saveFormMfsbsc001', 'fundAcntAt', 'text'),
            
            ledgrMgrtAt : gf_FormGetValue('saveFormMfsbsc001', 'ledgrMgrtAt', 'chkboxYN'),
            pblntfAcntAt : gf_FormGetValue('saveFormMfsbsc001', 'pblntfAcntAt', 'chkboxYN'),
            minusAt : gf_FormGetValue('saveFormMfsbsc001', 'minusAt', 'chkboxYN'),
            useAt : gf_FormGetValue('saveFormMfsbsc001', 'useAt', 'chkboxYN'),
            rm : gf_FormGetValue('saveFormMfsbsc001', 'rm', 'text')
        };
        gf_Transaction(jsonParameter, 'mfsbsc001/saveMfsbsc001', jsonParameter, 'fn_CallbackSaveMfsbsc001', false, 'POST');
    }
};

var fn_CallbackSaveMfsbsc001 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        if(modifyAt) {
            fn_FindMfsbsc001();
        } else {
            fn_SearchMfsbsc001(strSvcID.acntCode);
        }
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 삭제
 */
var fn_RemoveMfsbsc001 = function() {
    var acntCode = gf_FormGetValue('saveFormMfsbsc001', 'acntCode', 'text') ;
    if(gf_IsNull(acntCode)) {
        gf_DivMsgAlert('삭제할 계정코드를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titacntCode') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMfsbsc001Send()', '');
    }
};

var fn_RemoveMfsbsc001Send = function() {
    var acntCode = gf_FormGetValue('saveFormMfsbsc001', 'acntCode', 'text');
    var jsonParameter = {
    		acntCode : acntCode
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc001/removeMfsbsc001', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchMfsbsc001();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 엑셀다운로드
 */
var fn_ExcelMfsbsc001 = function () {
    var titMfsbsc001 = '계정과목관리'; /* gf_LocaleTrans('default', 'titMfsbsc001') */
    var jsonParameter = {
    		acntSeCode : gf_FormGetValue('searchFormMfsbsc001', 'comboSrhAcntSeCode', 'combo'),    		
            acntCode : gf_FormGetValue('searchFormMfsbsc001', 'acntCode', 'text'),
            acntNm : gf_FormGetValue('searchFormMfsbsc001', 'acntNm', 'text'),
    };
    var header = [[
        '계정코드' /* gf_LocaleTrans('default', 'titAcntCode') */,
        '계정명' /* gf_LocaleTrans('default', 'titAcntNm') */,
        '계정코드' /* gf_LocaleTrans('default', 'titUpperAcntCode') */,
        '사업장 코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '계정 약어명' /* gf_LocaleTrans('default', 'titAcntAbrvNm') */,
        '계정명_인쇄용' /* gf_LocaleTrans('default', 'titOutptAcntNm') */,
        '트리구조레벨' /* gf_LocaleTrans('default', 'titTreeLvl') */,
        '잔액표기위치구분 (좌우)' /* gf_LocaleTrans('default', 'titBalanceMarklcSe') */,
        '재무제표_좌우표시' /* gf_LocaleTrans('default', 'titLrSeCode') */,
        '계정구분 :자산,부채,자본,수익,비용' /* gf_LocaleTrans('default', 'titAcntSeCode') */,
        '전표기표사용여부' /* gf_LocaleTrans('default', 'titSlipBaltAt') */,
        '결산출력대상여부' /* gf_LocaleTrans('default', 'titStacntTrgetAt') */,
        '은행코드(C010)' /* gf_LocaleTrans('default', 'titBankCode') */,
        '관리계좌 번호' /* gf_LocaleTrans('default', 'titMgrtAcnutNo') */,
        '자금관리계정여부' /* gf_LocaleTrans('default', 'titFundAcntAt') */,
        '원장관리여부' /* gf_LocaleTrans('default', 'titLedgrMgrtAt') */,
        '공시계정여부' /* gf_LocaleTrans('default', 'titPblntfAcntAt') */,
        '차감 여부' /* gf_LocaleTrans('default', 'titMinusAt') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'acntCode', 'acntNm', 'upperAcntCode', 'bplcCode', 'acntAbrvNm', 'outptAcntNm', 'treeLvl', 'balanceMarklcSe', 'lrSeCode', 'acntSeCode', 'slipBaltAt', 'stacntTrgetAt', 'bankCode', 'mgrtAcnutNo', 'fundAcntAt', 'ledgrMgrtAt', 'pblntfAcntAt', 'minusAt', 'useAt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMfsbsc001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMfsbsc001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mfsbsc001/excelMfsbsc001', jsonParameter);
};

var fn_CallbackPopup = function(data) {
	
	//gf_Trace("data::"+JSON.stringify(data));
	
    gf_FormSetValue('saveFormMfsbsc001', 'upperAcntCode', data.acntCode, 'text');
    gf_FormSetValue('saveFormMfsbsc001', 'upperAcntNm', data.acntNm, 'text');	
    gf_FormSetValue('saveFormMfsbsc001', 'treeLvl', Number(data.treeLvl)+1, 'combo');  //상위계정레벨에서 +1 
    gf_FormSetValue('saveFormMfsbsc001', 'balanceMarklcSe', data.balanceMarklcSe, 'radio');
    gf_FormSetValue('saveFormMfsbsc001', 'comboLrSeCode', data.lrSeCode, 'combo');
    gf_FormSetValue('saveFormMfsbsc001', 'comboAcntSeCode', data.acntSeCode, 'combo');
    gf_FormSetValue('saveFormMfsbsc001', 'slipBaltAt', "1", 'chkbox'); // 
    
};


var fn_autoFillText = function () {
	var acntNm = gf_FormGetValue('saveFormMfsbsc001', 'acntNm', 'text');
	gf_FormSetValue('saveFormMfsbsc001', 'acntAbrvNm', acntNm, 'text');
	gf_FormSetValue('saveFormMfsbsc001', 'outptAcntNm', acntNm, 'text');
};
