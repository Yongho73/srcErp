/**
 *    프로그램       : 테스트 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.16
 *    사용테이블      : STM_WRD
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
    cf_InitParamTstmng001();
    cf_SetComponentsTstmng001();
    cf_SetEventListenerTstmng001();
    cf_InitFormTstmng001();
    cf_SetBindingTstmng001();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamTstmng001 = function() {
    gf_SetMenuPath();
    $('#saveFormTstmng001').validate({ errorElement: 'div', ignore: '' });
};

var dhxGridTstmng001;
var cf_SetComponentsTstmng001 = function() {
    var dhxGridTstmng001HeaderInfo = [];
    dhxGridTstmng001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridTstmng001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllTstmng001" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridTstmng001HeaderInfo.push(gf_MakeDhxGridHeader('한글 약어 명', '100', 'center', 'str', 'ro', false, 'korAbrvNm', '', '')); /* gf_LocaleTrans('default', 'titKorAbrvNm') */
    dhxGridTstmng001HeaderInfo.push(gf_MakeDhxGridHeader('영문 약어 명', '100', 'center', 'str', 'ro', false, 'engAbrvNm', '', '')); /* gf_LocaleTrans('default', 'titEngAbrvNm') */
    dhxGridTstmng001HeaderInfo.push(gf_MakeDhxGridHeader('도메인 여부', '100', 'center', 'str', 'ro', false, 'domnAt', '', '')); /* gf_LocaleTrans('default', 'titDomnAt') */
    dhxGridTstmng001HeaderInfo.push(gf_MakeDhxGridHeader('영문 설명', '100', 'center', 'str', 'ro', false, 'engDc', '', '')); /* gf_LocaleTrans('default', 'titEngDc') */
    dhxGridTstmng001HeaderInfo.push(gf_MakeDhxGridHeader('한글 설명', '100', 'center', 'str', 'ro', false, 'korDc', '', '')); /* gf_LocaleTrans('default', 'titKorDc') */
    dhxGridTstmng001 = gf_MakeDhxGrid('dataListTstmng001', dhxGridTstmng001HeaderInfo, true, false, false);
    dhxGridTstmng001.enableAutoWidth(true);
};

var eventIds = [];
var cf_SetEventListenerTstmng001 = function() {
    // grid event
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridTstmng001, eventIds);
    eventId = dhxGridTstmng001.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) fn_ExcelTstmng001();
    });
    eventIds.push(eventId);
    eventId = dhxGridTstmng001.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_SelectedTstmng001();
    });
    eventIds.push(eventId);
    // button event
    $('#btnAddTstmng001').unbind('click').bind('click', function(event){
        fn_AddTstmng001()
    });
    $('#btnSaveTstmng001').unbind('click').bind('click', function() {
        fn_SaveTstmng001();
    });
    $('#btnRemoveTstmng001').unbind('click').bind('click', function() {
        fn_RemoveTstmng001();
    });
    $('#btnExcelTstmng001').unbind('click').bind('click', function() {
        fn_ExcelTstmng001();
    });
    $('#btnSearchTstmng001').unbind('click').bind('click', function(event){
        fn_SearchTstmng001();
    });
    $('#btnResetTstmng001').unbind('click').bind('click',function() {
        cf_InitFormTstmng001();
    });
    // other event
    $('#checkAllTstmng001').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridTstmng001, $('#checkAllTstmng001').prop('checked'), 'selYn');
    });
    $('#korAbrvNmSearchFormTstmng001').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchTstmng001').click(); event.preventDefault(); }
    });
};

var cf_InitFormTstmng001 = function() {
    $('#searchFormTstmng001').clearForm();
};

var cf_SetBindingTstmng001 = function() {
    fn_SearchTstmng001();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchTstmng001 = function(key) {
    var jsonParameter = {
        korAbrvNm : gf_FormGetValue('searchFormTstmng001', 'korAbrvNm', 'text')
    };
    gf_Transaction(key, 'tstmng001/searchTstmng001', jsonParameter, 'fn_CallbackSearchTstmng001', false, 'GET');
};

var fn_CallbackSearchTstmng001 = function(strSvcID, targetID, data) {
    dhxGridTstmng001.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListTstmng001');
        dhxGridTstmng001.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
            var findCell = dhxGridTstmng001.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridTstmng001,'korAbrvNm'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridTstmng001.selectRowById(findCell[0][0]);
            } else {
                dhxGridTstmng001.selectRow(0);
            }
        } else {
            dhxGridTstmng001.selectRow(0);
        }
        fn_SelectedTstmng001();
    } else {
        gf_NoFoundDataOnGridMsg('dataListTstmng001');
        $('#btnAddTstmng001').click();
    }
    $('#spanCntTstmng001').text(data.data.records.length);
    cf_SetEventListenerTstmng001();
};
/**
 * 상세조회
 */
var fn_SelectedTstmng001 = function () {
    if(!fadeMode) {
        $('#saveFormTstmng001').fadeOut(gv_FadeTime, function() {
            fn_FindTstmng001();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveFormTstmng001').fadeIn(gv_FadeTime, function() {});
     } else {
         fn_FindTstmng001();
     }
};

var fn_FindTstmng001 = function() {
    var korAbrvNm = dhxGridTstmng001.cells(dhxGridTstmng001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridTstmng001,'korAbrvNm')).getValue();
    if (!gf_IsNull(korAbrvNm)) {
        var jsonParameter = {
            korAbrvNm : korAbrvNm
        };
        var dataSource = gf_NoAsyncTransaction('tstmng001/findTstmng001', jsonParameter, 'GET');
        var data = dataSource.data;
        gf_FormSetValue('saveFormTstmng001', 'korAbrvNm', data.korAbrvNm, 'text');
        gf_FormSetValue('saveFormTstmng001', 'engAbrvNm', data.engAbrvNm, 'text');
        gf_FormSetValue('saveFormTstmng001', 'domnAt', data.domnAt, 'text');
        gf_FormSetValue('saveFormTstmng001', 'engDc', data.engDc, 'text');
        gf_FormSetValue('saveFormTstmng001', 'korDc', data.korDc, 'text');
        // 수정시 그리드 정보 업데이트 
        var rId= dhxGridTstmng001.getSelectedRowId();
        gf_DhxSetValue(dhxGridTstmng001, rId, 'korAbrvNm', data.korAbrvNm, 'grid');
        gf_DhxSetValue(dhxGridTstmng001, rId, 'engAbrvNm', data.engAbrvNm, 'grid');
        gf_DhxSetValue(dhxGridTstmng001, rId, 'domnAt', data.domnAt, 'grid');
        gf_DhxSetValue(dhxGridTstmng001, rId, 'engDc', data.engDc, 'grid');
        gf_DhxSetValue(dhxGridTstmng001, rId, 'korDc', data.korDc, 'grid');
        $('#saveFormTstmng001 input[name="korAbrvNm"]').attr('disabled', 'disabled');
    }
    modifyAt = true;
    keyDuplication = false;
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormTstmng001 = function() {
    modifyAt = false;
    $('#saveFormTstmng001 input[name="korAbrvNm"]').removeAttr('disabled');
    $('#saveFormTstmng001').clearForm();
};
/**
 * 데이터 중복 체크
 */
var fn_CheckDupTstmng001 = function(){
    var korAbrvNm = gf_FormGetValue('saveFormTstmng001', 'korAbrvNm', 'text');
    if(gf_IsNull(korAbrvNm)) {
        gf_DivMsgAlert('한글 약어 명를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titkorAbrvNm') */
        return false;
    }
    var jsonParameter = {
        korAbrvNm : korAbrvNm
    };
    var dataSource = gf_NoAsyncTransaction('tstmng001/findTstmng001', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.korAbrvNm)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('한글 약어 명가 존재합니다.'); /* gf_LocaleTrans('default', 'titkorAbrvNm') */
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
var fn_AddTstmng001 = function() {
    dhxGridTstmng001.clearSelection();
    if(!fadeRegs) {
        $('#saveFormTstmng001').fadeOut(gv_FadeTime, function() {
            fn_InitInputFormTstmng001();
            fadeRegs = true;
            fadeMode = false;
            keyDuplication = true;
            $('#btnPopEmpSearchTstmng001').show();
        });
        $('#saveFormTstmng001').fadeIn(gv_FadeTime, function() {});
    } else {
        fn_InitInputFormTstmng001();
    }
}

var fn_SaveTstmng001 = function() {    
    if($('#saveFormTstmng001').validate().form()){
        if(keyDuplication && !fn_CheckDupTstmng001()) return false;
        var jsonParameter = {
            korAbrvNm : gf_FormGetValue('saveFormTstmng001', 'korAbrvNm', 'text'),
            engAbrvNm : gf_FormGetValue('saveFormTstmng001', 'engAbrvNm', 'text'),
            domnAt : gf_FormGetValue('saveFormTstmng001', 'domnAt', 'text'),
            engDc : gf_FormGetValue('saveFormTstmng001', 'engDc', 'text'),
            korDc : gf_FormGetValue('saveFormTstmng001', 'korDc', 'text')
        };
        gf_Transaction(jsonParameter, 'tstmng001/saveTstmng001', jsonParameter, 'fn_CallbackSaveTstmng001', false, 'POST');
    }
};

var fn_CallbackSaveTstmng001 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        if(modifyAt) {
            fn_FindTstmng001();
        } else {
            fn_SearchTstmng001(strSvcID.korAbrvNm);
        }
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 삭제
 */
var fn_RemoveTstmng001 = function() {
    var korAbrvNms = gf_GetCheckedGridValueArr(dhxGridTstmng001, 'selYn', 'korAbrvNm');
    if(gf_IsNull(korAbrvNms)) {
        gf_DivMsgAlert('삭제할 한글 약어 명를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titkorAbrvNm') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveTstmng001Send()', '');
    }
};

var fn_RemoveTstmng001Send = function() {
    var korAbrvNms = gf_GetCheckedGridValueArr(dhxGridTstmng001, 'selYn', 'korAbrvNm');
    var jsonParameter = {
        korAbrvNms : korAbrvNms.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('tstmng001/removeTstmng001', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchTstmng001();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 엑셀다운로드
 */
var fn_ExcelTstmng001 = function () {
    var titTstmng001 = '테스트'; /* gf_LocaleTrans('default', 'titTstmng001') */
    var jsonParameter = {
        korAbrvNm : gf_FormGetValue('searchFormTstmng001', 'korAbrvNm', 'text')
    };
    var header = [[
        '한글 약어 명' /* gf_LocaleTrans('default', 'titKorAbrvNm') */,
        '영문 약어 명' /* gf_LocaleTrans('default', 'titEngAbrvNm') */,
        '도메인 여부' /* gf_LocaleTrans('default', 'titDomnAt') */,
        '영문 설명' /* gf_LocaleTrans('default', 'titEngDc') */,
        '한글 설명' /* gf_LocaleTrans('default', 'titKorDc') */
    ]];
    var dataId = [[ 'korAbrvNm', 'engAbrvNm', 'domnAt', 'engDc', 'korDc' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titTstmng001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titTstmng001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('tstmng001/excelTstmng001', jsonParameter);
};
