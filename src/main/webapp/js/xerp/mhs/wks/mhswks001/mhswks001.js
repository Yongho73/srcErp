/**
 *    프로그램       : 근태기준설정(근태관리) 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.19
 *    사용테이블      : MHS_DCLZBASSSETTING
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhswks001();
    cf_SetComponentsMhswks001();
    cf_SetEventListenerMhswks001();
    cf_InitFormMhswks001();
    cf_SetBindingMhswks001();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhswks001 = function() {
    gf_SetMenuPath();
    $("#saveFormMhswks001").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMhswks001;
var dhxGridStandardMhswks001;
var cf_SetComponentsMhswks001 = function() {
	//근태기준설정
    var dhxGridMhswks001HeaderInfo = [];
    dhxGridMhswks001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhswks001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('고용구분', '120', 'center', 'str', 'coro', false, 'laborSe', '', '')); /* gf_LocaleTrans('default', 'titLaborSe') */
    dhxGridMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('급여구분', '120', 'center', 'str', 'coro', false, 'salarySe', '', '')); /* gf_LocaleTrans('default', 'titSalarySe') */
    dhxGridMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('귀속구분', '120', 'center', 'str', 'coro', false, 'rversSe', '', '')); /* gf_LocaleTrans('default', 'titRversSe') */
    dhxGridMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('근무유형코드', '120', 'center', 'str', 'coro', false, 'workTyCode', '', '')); /* gf_LocaleTrans('default', 'titWorkTyCode') */
    dhxGridMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('시작일', '120', 'center', 'str', 'edn', false, 'beginDe', '', '')); /* gf_LocaleTrans('default', 'titBeginDe') */
    dhxGridMhswks001 = gf_MakeDhxGrid('dataSetListMhswks001', dhxGridMhswks001HeaderInfo, true, false, false);
    dhxGridMhswks001.enableAutoWidth(true);
    
    //고용구분
    gf_MakeComboBasic('divComboClsfCodeSearchFormMhshrm010', 'detailComboClsfCode', 'search', '', 'mhshrm004/searchMhshrb004ClsfCodeCombo', '', 'laborSe', 'laborNm', '');
    //급여구분
    gf_MakeComboBasic('divComboClsfCodeSearchFormMhshrm010', 'detailComboClsfCode', 'search', '', 'mhshrm004/searchMhshrb004ClsfCodeCombo', '', 'salarySe', 'salaryNm', '');
    
    //근태발생기준
    var dhxGridStandardMhswks001HeaderInfo = [];
    dhxGridStandardMhswks001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '80', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridStandardMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('기준항목', '150', 'center', 'str', 'ro', false, 'stdrNm;', '', '')); /* gf_LocaleTrans('default', 'titLaborSe') */
    dhxGridStandardMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('항목명', '150', 'center', 'str', 'ro', false, 'itemCode;', '', '')); /* gf_LocaleTrans('default', 'titLaborSe') */
    dhxGridStandardMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('추가항목', '150', 'center', 'str', 'ro', false, 'rms;', '', '')); /* gf_LocaleTrans('default', 'titLaborSe') */
    dhxGridStandardMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('설명', '*', 'center', 'str', 'ro', false, 'rm;', '', '')); /* gf_LocaleTrans('default', 'titLaborSe') */
    dhxGridStandardMhswks001HeaderInfo.push(gf_MakeDhxGridHeader('순번', '120', 'center', 'str', 'ro', true, 'sn;', '', '')); /* gf_LocaleTrans('default', 'titLaborSe') */
    dhxGridStandardMhswks001 = gf_MakeDhxGrid('dataStandardListMhswks001', dhxGridStandardMhswks001HeaderInfo, true, false, false);
    dhxGridStandardMhswks001.enableAutoWidth(true);
};

var eventIds = [];
var cf_SetEventListenerMhswks001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMhswks001, eventIds);
    
    eventId = dhxGridMhswks001.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) {
        	fn_ExcelMhswks001();
        }
        else if(keyCode == 13 || keyCode == 9)  {   //ENTER , TAB
    		var selectedId = dhxGridMhswks001.getSelectedRowId();
    		var ind        = dhxGridMhswks001.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhswks001.getRowIndex(selectedId);
    		dhxGridMhswks001.selectCell(rowIndex, ind+1);
    		dhxGridMhswks001.editCell();
    	} 
        else if(keyCode == 40)  {   // ARROW_DOWN
    		var selectedId = dhxGridMhswks001.getSelectedRowId();
    		var ind        = dhxGridMhswks001.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhswks001.getRowIndex(selectedId);
    		dhxGridMhswks001.selectCell(rowIndex+1, ind);
    		dhxGridMhswks001.editCell();
    	} 
        else if(keyCode == 38)  {   // ARROW_UP
    		var selectedId = dhxGridMhswks001.getSelectedRowId();
    		var ind        = dhxGridMhswks001.getSelectedCellIndex();
    		var rowIndex   = dhxGridMhswks001.getRowIndex(selectedId);
    		dhxGridMhswks001.selectCell(rowIndex-1, ind);
    		dhxGridMhswks001.editCell();
    	}
        else return true;
    });
    
    
    eventIds.push(eventId);
    eventId = dhxGridMhswks001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhswks001();
    });
    eventIds.push(eventId);
    // 버튼 이벤트 ==========================================================================================
//    $('#btnAddMhswks001').unbind('click').bind('click', function(event){
//        gf_errorMsgClear();
//        fn_AddMhswks001()
//    });
    
    $('#btnAddMhswks001').unbind('click').bind('click', function(event){
    	dhxGridMhswks001.clearSelection();
    	dhxGridMhswks001.addRow(dhxGridMhswks001.uid(),[0,'','','', '','',0] , 0);
    	dhxGridMhswks001.selectRow(0, false, false,true);

    	dhxGridMhswks001.selectCell(0, 1);
    	dhxGridMhswks001.editCell();
    	gf_NoFoundDataOnGridMsgRemove('dataListMhswks001');
    });
    $('#btnSaveMhswks001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
    	if(fn_GridValidation()) dhxDataProcessorMhswks001.sendData();
    });
    $('#btnRemoveMhswks001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhswks001();
    });
    $('#btnExcelMhswks001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhswks001();
    });
//    $('#btnSearchMhswks001').unbind('click').bind('click', function(event){
//        gf_errorMsgClear();
//        fn_SearchMhswks001('');
//    });
//    $('#btnResetMhswks001').unbind("click").bind("click",function() {
//        gf_errorMsgClear();
//        cf_InitFormMhswks001();
//    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhswks001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhswks001, $('#checkAllMhswks001').prop('checked'), 'chk');
    });
//    $('#laborSeSearchFormMhswks001').unbind('keypress').bind('keypress', function(event){
//        gf_errorMsgClear();
//        if(event.charCode == 13) { $('#btnSearchMhswks001').click(); event.preventDefault(); }
//    });
//    $('#salarySeSearchFormMhswks001').unbind('keypress').bind('keypress', function(event){
//        gf_errorMsgClear();
//        if(event.charCode == 13) { $('#btnSearchMhswks001').click(); event.preventDefault(); }
//    });
    $('#saveFormMhswks001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
//    // 폼 이벤트 start ==========================================================================================
//    $('#saveFormMhswks001 input[name="laborSe"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhswks001, dhxDataProcessorMhswks001, 'laborSe', $(this).val());
//    });
//    $('#saveFormMhswks001 input[name="salarySe"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhswks001, dhxDataProcessorMhswks001, 'salarySe', $(this).val());
//    });
//    $('#saveFormMhswks001 input[name="rversSe"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhswks001, dhxDataProcessorMhswks001, 'rversSe', $(this).val());
//    });
//    $('#saveFormMhswks001 input[name="workTyCode"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhswks001, dhxDataProcessorMhswks001, 'workTyCode', $(this).val());
//    });
//    $('#saveFormMhswks001 input[name="beginDe"]').unbind('change blur').bind('change blur',function() {
//        gf_errorMsgClear();
//        gf_DhxGridCellMapping(dhxGridMhswks001, dhxDataProcessorMhswks001, 'beginDe', $(this).val());
//    });
//    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhswks001 = function() {
    $('#searchFormMhswks001').resetForm();
};

var cf_SetBindingMhswks001 = function() {
    fn_FormDisabled(true);
    fn_SearchMhswks001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhswks001 = function(userId) {
    var jsonParameter = {
        laborSe : gf_FormGetValue('searchFormMhswks001', 'laborSe', 'text'),
        salarySe : gf_FormGetValue('searchFormMhswks001', 'salarySe', 'text')
    };
    gf_Transaction(userId, 'mhswks001/searchMhswks001', jsonParameter, 'fn_CallbackSearchMhswks001', false, 'GET');
};

var dhxDataProcessorMhswks001;
var fn_CallbackSearchMhswks001 = function(strSvcID, targetID, data) {
    dhxGridMhswks001.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhswks001');
        dhxGridMhswks001.parse(data.data.records, 'js');
        // 그리드입력 데이터프로세스 정의
        dhxDataProcessorMhswks001 = new dataProcessor(gv_ContextPath+'/mhswks001/saveMhswks001'); //lock feed url
        dhxDataProcessorMhswks001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
        dhxDataProcessorMhswks001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
        dhxDataProcessorMhswks001.init(dhxGridMhswks001); //link dataprocessor to the grid
        dhxDataProcessorMhswks001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
        dhxDataProcessorMhswks001.styles = {
                        updated:        "font-weight:normal;text-decoration:none;",
                        inserted:       "font-weight:bold; color:green;",
                        deleted:        "color:orange; text-decoration:line-through;",
                        invalid:        "color:green; text-decoration:underline;",
                        error:          "color:blue; text-decoration:underline;",
                        clear:          "font-weight:normal;text-decoration:none;"
        };
        dhxDataProcessorMhswks001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
                if (dataSource.code == "000" || dataSource.data.code !== "000"){
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                        fn_SearchMhswks001();
                        $("#checkAllMhswks001").prop('checked', false); //상단 체크박스 해제
                        return true;
                } else {
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                        return false;
                }
        });
        dhxGridMhswks001.selectRow(0);
        fn_FindMhswks001((data.laborSe), (data.salarySe));
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhswks001');
        fn_InitInputFormMhswks001();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMhswks001").text(data.data.records.length);
    cf_SetEventListenerMhswks001();
};
/**
 * 상세조회
 */
var fn_FindMhswks001 = function(laborSe, salarySe) {
	var jsonParameter = {
	        laborSe : laborSe,
	        salarySe : salarySe
	    };
	    gf_Transaction(userId, 'mhswks001/findMhswks001', jsonParameter, 'fn_CallbackFindMhswks001', false, 'GET');
};
var dhxFindDataProcessorMhswks001;
var fn_CallbackSearchMhswks001 = function(strSvcID, targetID, data) {
	dhxGridStandardMhswks001.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhswks001');
        dhxGridStandardMhswks001.parse(data.data.records, 'js');
        // 그리드입력 데이터프로세스 정의
        dhxFindDataProcessorMhswks001 = new dataProcessor(gv_ContextPath+'/mhswks001/saveMhswks001'); //lock feed url
        dhxFindDataProcessorMhswks001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
        dhxFindDataProcessorMhswks001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
        dhxFindDataProcessorMhswks001.init(dhxGridStandardMhswks001); //link dataprocessor to the grid
        dhxFindDataProcessorMhswks001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
        dhxFindDataProcessorMhswks001.styles = {
                        updated:        "font-weight:normal;text-decoration:none;",
                        inserted:       "font-weight:bold; color:green;",
                        deleted:        "color:orange; text-decoration:line-through;",
                        invalid:        "color:green; text-decoration:underline;",
                        error:          "color:blue; text-decoration:underline;",
                        clear:          "font-weight:normal;text-decoration:none;"
        };
        dhxDataProcessorMhswks001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
                if (dataSource.code == "000" || dataSource.data.code !== "000"){
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                        fn_SearchMhswks001();
                        $("#checkAllMhswks001").prop('checked', false); //상단 체크박스 해제
                        return true;
                } else {
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                        return false;
                }
        });
        dhxGridStandardMhswks001.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhswks001');
        fn_InitInputFormMhswks001();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMhswks001").text(data.data.records.length);
    cf_SetEventListenerMhswks001();
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhswks001 = function() {
    $('#saveFormMhswks001 input[name="laborSe"]').prop('disabled', false);
    $('#saveFormMhswks001 input[name="salarySe"]').prop('disabled', false);
    $('#saveFormMhswks001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhswks001 *').prop('disabled', status);
};
/**
 * 저장 (입력, 수정)
 */
var fn_AddMhswks001 = function() {
    dhxGridMhswks001.clearSelection();
    fn_InitInputFormMhswks001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //laborSe
    initValueArr.push(''); //salarySe
    initValueArr.push(''); //rversSe
    initValueArr.push(''); //workTyCode
    initValueArr.push(''); //beginDe
    dhxGridMhswks001.addRow(dhxGridMhswks001.uid(), initValueArr, 0);
    dhxGridMhswks001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhswks001');
    $('#btnPopEmpSearchMhswks001').show();
    fn_FormDisabled(false);
}
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhswks001 = function() {
    if(fn_GridValidation(dhxGridMhswks001, dhxDataProcessorMhswks001)) {
        dhxDataProcessorMhswks001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhswks001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhswks001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhswks001.forEachRow(function(rowId) {
            state = dhxDataProcessorMhswks001.getState(rowId);
            if(dhxGridMhswks001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhswks001, 'chk')).isChecked()){
                if(state == 'inserted') dhxGridMhswks001.deleteRow(rowId);
                else dhxDataProcessorMhswks001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhswks001 = function () {
    var titMhswks001 = '근태기준설정(근태관리)'; /* gf_LocaleTrans('default', 'titMhswks001') */
    var jsonParameter = {
        laborSe : gf_FormGetValue('searchFormMhswks001', 'laborSe', 'text'),
        salarySe : gf_FormGetValue('searchFormMhswks001', 'salarySe', 'text')
    };
    var header = [[
        '고용구분(사원구분)' /* gf_LocaleTrans('default', 'titLaborSe') */,
        '급여구분(연봉/호봉)' /* gf_LocaleTrans('default', 'titSalarySe') */,
        '귀속구분(전월/금월)' /* gf_LocaleTrans('default', 'titRversSe') */,
        '기본 근무 유형 코드 - MHS_WORKTY 의 WORK_TY_CODE' /* gf_LocaleTrans('default', 'titWorkTyCode') */,
        '시작일' /* gf_LocaleTrans('default', 'titBeginDe') */
    ]];
    var dataId = [[ 'laborSe', 'salarySe', 'rversSe', 'workTyCode', 'beginDe' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhswks001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhswks001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhswks001/excelMhswks001', jsonParameter);
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
    $('#saveFormMhswks001 #laborSeSaveFormMhswks001').parent().append(
    '<div class="error" id="laborSeSaveFormMhswks001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhswks001 #salarySeSaveFormMhswks001').parent().append(
    '<div class="error" id="salarySeSaveFormMhswks001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhswks001 = function(laborSe, salarySe){
    if(!gf_IsNull(laborSe) && !gf_IsNull(salarySe)) {
        var jsonParameter = {
            laborSe : laborSe,
            salarySe : salarySe
        };
        var dataSource = gf_NoAsyncTransaction('mhswks001/findMhswks001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.laborSe) && gf_IsNull(data.salarySe)) {
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
    var state = dhxDataProcessorMhswks001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhswks001').validate().form()){
                if(state == 'inserted') {
                    var laborSe = gf_FormGetValue('saveFormMhswks001', 'laborSe', 'text');
                    var salarySe = gf_FormGetValue('saveFormMhswks001', 'salarySe', 'text');
                    if(fn_CheckDupMhswks001(laborSe, salarySe)) return true;
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
    var checkLaborSe;
    var checkSalarySe;
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'laborSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'laborSe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salarySe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarySe');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkLaborSe = gf_DhxGetValue(dhxGridObjet, rowId, 'laborSe', 'grid');
                    checkSalarySe = gf_DhxGetValue(dhxGridObjet, rowId, 'salarySe', 'grid');
                    if(!gf_IsNull(checkLaborSe, checkSalarySe)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var laborSe = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'laborSe', 'grid');
                            var salarySe = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salarySe', 'grid');
                            if(((laborSe == checkLaborSe) && (salarySe == checkSalarySe)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'laborSe');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarySe');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhswks001( checkLaborSe, checkSalarySe )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'laborSe');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarySe');
                            valid = false;
                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid) validFalseFistRowId = rowId;
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid) validFalseFistRowId = rowId;
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
        dhxGridMhswks001.selectRowById(validFalseFistRowId);
        fn_FindMhswks001();
        fn_FormValidation(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}
/**
 * 그리드 validation 빨간색 언더바
 */
//var fn_GridValidationSelectCell = function(dhxGrid, dhxDataProcessor, rId, cInd){
//    dhxGrid.forEachRow(function(rowId) {
//        if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
//            dhxGrid.forEachCell(rowId, function(cellObj, ind){
//                dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
//            });
//        }
//    });
//    setTimeout(function(){
//        dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
//    },1);
//}
