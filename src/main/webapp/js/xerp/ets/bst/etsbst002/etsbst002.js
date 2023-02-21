/**
 *    프로그램       : 문서번호관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.27
 *    사용테이블      : SGN_DOCNO_SETTING
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamEtsbst002();
    cf_SetComponentsEtsbst002();
    cf_SetEventListenerEtsbst002();
    cf_InitFormEtsbst002();
    cf_SetBindingEtsbst002();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamEtsbst002 = function() {
    gf_SetMenuPath();
    $('#saveFormEtsbst002').validate({ errorElement: 'div', ignore: '' });
};

var dhxGridEtsbst002;
var cf_SetComponentsEtsbst002 = function() {
    var dhxGridEtsbst002HeaderInfo = [];
    dhxGridEtsbst002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridEtsbst002HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllEtsbst002" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* ����  */
    dhxGridEtsbst002HeaderInfo.push(gf_MakeDhxGridHeader('제목', '*', 'left', 'str', 'ro', false, 'tit', '', '')); /* gf_LocaleTrans('default', 'titTit') */
    dhxGridEtsbst002HeaderInfo.push(gf_MakeDhxGridHeader('적용 년도', '100', 'center', 'str', 'ro', false, 'applcYy', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
    dhxGridEtsbst002HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'useAtro', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */   
    dhxGridEtsbst002HeaderInfo.push(gf_MakeDhxGridHeader('번호 설정 번호', '100', 'center', 'str', 'ro', true, 'noSettingNo', '', '')); /* gf_LocaleTrans('default', 'titNoSettingNo') */
    dhxGridEtsbst002 = gf_MakeDhxGrid('dataListEtsbst002', dhxGridEtsbst002HeaderInfo, true, false, false);
    dhxGridEtsbst002.enableAutoWidth(true);
};

var eventIds = [];
var cf_SetEventListenerEtsbst002 = function() {
    // grid event
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridEtsbst002, eventIds);
    eventId = dhxGridEtsbst002.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) fn_ExcelEtsbst002();
    });
    eventIds.push(eventId);
    eventId = dhxGridEtsbst002.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_SelectedEtsbst002();
    });
    eventIds.push(eventId);
    // button event
    $('#btnAddEtsbst002').unbind('click').bind('click', function(event){
        fn_AddEtsbst002()
    });
    $('#btnSaveEtsbst002').unbind('click').bind('click', function() {
        fn_SaveEtsbst002();
    });
    $('#btnRemoveEtsbst002').unbind('click').bind('click', function() {
        fn_RemoveEtsbst002();
    });
    $('#btnExcelEtsbst002').unbind('click').bind('click', function() {
        fn_ExcelEtsbst002();
    });
    $('#btnSearchEtsbst002').unbind('click').bind('click', function(event){
        fn_SearchEtsbst002();
    });
    $('#btnResetEtsbst002').unbind('click').bind('click',function() {
        cf_InitFormEtsbst002();
    });
    // other event
    $('#checkAllEtsbst002').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridEtsbst002, $('#checkAllEtsbst002').prop('checked'), 'selYn');
    });
    $('#titSearchFormEtsbst002').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchEtsbst002').click(); event.preventDefault(); }
    });
};

var cf_InitFormEtsbst002 = function() {
    $('#searchFormEtsbst002').clearForm();
};

var cf_SetBindingEtsbst002 = function() {
    fn_SearchEtsbst002();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchEtsbst002 = function(key) {
    var jsonParameter = {
        tit : gf_FormGetValue('searchFormEtsbst002', 'tit', 'text')
    };
    gf_Transaction(key, 'etsbst002/searchEtsbst002', jsonParameter, 'fn_CallbackSearchEtsbst002', false, 'GET');
};

var fn_CallbackSearchEtsbst002 = function(strSvcID, targetID, data) {
    dhxGridEtsbst002.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListEtsbst002');
        dhxGridEtsbst002.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
            var findCell = dhxGridEtsbst002.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridEtsbst002,'noSettingNo'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridEtsbst002.selectRowById(findCell[0][0]);
            } else {
                dhxGridEtsbst002.selectRow(0);
            }
        } else {
            dhxGridEtsbst002.selectRow(0);
        }
        fn_SelectedEtsbst002();
    } else {
        gf_NoFoundDataOnGridMsg('dataListEtsbst002');
        $('#btnAddEtsbst002').click();
    }
    $('#spanCntEtsbst002').text(data.data.records.length);
    cf_SetEventListenerEtsbst002();
};
/**
 * 상세조회
 */
var fn_SelectedEtsbst002 = function () {
    if(!fadeMode) {
        $('#saveFormEtsbst002').fadeOut(gv_FadeTime, function() {
            fn_FindEtsbst002();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveFormEtsbst002').fadeIn(gv_FadeTime, function() {});
     } else {
         fn_FindEtsbst002();
     }
};

var fn_FindEtsbst002 = function() {
    var noSettingNo = dhxGridEtsbst002.cells(dhxGridEtsbst002.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridEtsbst002,'noSettingNo')).getValue();
    if (!gf_IsNull(noSettingNo)) {
        var jsonParameter = {
            noSettingNo : noSettingNo
        };
        var dataSource = gf_NoAsyncTransaction('etsbst002/findEtsbst002', jsonParameter, 'GET');
        var data = dataSource.data;
        gf_FormSetValue('saveFormEtsbst002', 'noSettingNo', data.noSettingNo, 'text');
        gf_FormSetValue('saveFormEtsbst002', 'settingCode', data.settingCode, 'text');
        gf_FormSetValue('saveFormEtsbst002', 'inputText', data.inputText, 'text');
        gf_FormSetValue('saveFormEtsbst002', 'applcYy', data.applcYy, 'text');
        gf_FormSetValue('saveFormEtsbst002', 'useAt', (( data.useAt  == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormEtsbst002', 'tit', data.tit, 'text');
        $('#saveFormEtsbst002 input[name="noSettingNo"]').attr('disabled', 'disabled');
    }
    modifyAt = true;
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormEtsbst002 = function() {
    modifyAt = false;
    $('#saveFormEtsbst002 input[name="noSettingNo"]').removeAttr('disabled');
    $('#saveFormEtsbst002').clearForm();
};
/**
 * 데이터 중복 체크
 */
var fn_CheckDupEtsbst002 = function(){
    var noSettingNo = gf_FormGetValue('saveFormEtsbst002', 'noSettingNo', 'text');
    if(gf_IsNull(noSettingNo)) {
        gf_DivMsgAlert('번호 설정 번호를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titnoSettingNo') */
        return false;
    }
    var jsonParameter = {
        noSettingNo : noSettingNo
    };
    var dataSource = gf_NoAsyncTransaction('etsbst002/findEtsbst002', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.noSettingNo)) {
            return true;
        } else {
            gf_DivMsgAlert('번호 설정 번호가 존재합니다.'); /* gf_LocaleTrans('default', 'titnoSettingNo') */
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
var fn_AddEtsbst002 = function() {
    dhxGridEtsbst002.clearSelection();
    if(!fadeRegs) {
        $('#saveFormEtsbst002').fadeOut(gv_FadeTime, function() {
            fn_InitInputFormEtsbst002();
            fadeRegs = true;
            fadeMode = false;
            $('#btnPopEmpSearchEtsbst002').show();
        });
        $('#saveFormEtsbst002').fadeIn(gv_FadeTime, function() {});
    } else {
        fn_InitInputFormEtsbst002();
    }
}

var fn_SaveEtsbst002 = function() {    
    if($('#saveFormEtsbst002').validate().form()){

        var jsonParameter = {
            noSettingNo : fn_GetNoSettingNo(),
            settingCode : gf_FormGetValue('saveFormEtsbst002', 'settingCode', 'text'),
            inputText : gf_FormGetValue('saveFormEtsbst002', 'inputText', 'text'),
            applcYy : gf_FormGetValue('saveFormEtsbst002', 'applcYy', 'text'),
            useAt : gf_FormGetValue('saveFormEtsbst002', 'useAt', 'chkboxYN'),
            tit : gf_FormGetValue('saveFormEtsbst002', 'tit', 'text')
        };
        
        gf_Trace(jsonParameter);
        
        gf_Transaction(jsonParameter, 'etsbst002/saveEtsbst002', jsonParameter, 'fn_CallbackSaveEtsbst002', false, 'POST');
    }
};

var fn_CallbackSaveEtsbst002 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        fn_SearchEtsbst002(strSvcID.noSettingNo);
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 삭제
 */
var fn_RemoveEtsbst002 = function() {
    var noSettingNos = gf_GetCheckedGridValueArr(dhxGridEtsbst002, 'selYn', 'noSettingNo');
    if(gf_IsNull(noSettingNos)) {
        gf_DivMsgAlert('삭제할 번호 설정 번호를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titnoSettingNo') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveEtsbst002Send()', '');
    }
};

var fn_RemoveEtsbst002Send = function() {
    var noSettingNos = gf_GetCheckedGridValueArr(dhxGridEtsbst002, 'selYn', 'noSettingNo');
    var jsonParameter = {
        noSettingNos : noSettingNos.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('etsbst002/removeEtsbst002', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchEtsbst002();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 엑셀다운로드
 */
var fn_ExcelEtsbst002 = function () {
    var titEtsbst002 = '문서번호관리'; /* gf_LocaleTrans('default', 'titEtsbst002') */
    var jsonParameter = {
    	tit : gf_FormGetValue('searchFormEtsbst002', 'tit', 'text')
    };
    var header = [[
        '번호 설정 번호' /* gf_LocaleTrans('default', 'titNoSettingNo') */,
        '설정 코드' /* gf_LocaleTrans('default', 'titSettingCode') */,
        '입력 텍스트' /* gf_LocaleTrans('default', 'titInputText') */,
        '적용 년도' /* gf_LocaleTrans('default', 'titApplcYy') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '제목' /* gf_LocaleTrans('default', 'titTit') */
    ]];
    var dataId = [[ 'noSettingNo', 'settingCode', 'inputText', 'applcYy', 'useAt', 'tit' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titEtsbst002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titEtsbst002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('etsbst002/excelEtsbst002', jsonParameter);
};
/******************************************************************************************************************************
 *                                                     키 가져오기
 ******************************************************************************************************************************/
var fn_GetNoSettingNo = function(){
	if(modifyAt){
		return gf_FormGetValue('saveFormEtsbst002', 'noSettingNo', 'text');
	} else {
		var data = gf_NoAsyncTransaction('etsbst002/getNoSettingNoEtsfmg000', {}, 'GET');
		return data.data;
	}
}