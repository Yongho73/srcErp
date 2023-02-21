/**
 *    프로그램       : 근태시간코드 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.08
 *    사용테이블      : MHS_DCLZTIMESE
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var maxSn = 0;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrd008();
    cf_SetComponentsMhshrd008();
    cf_SetEventListenerMhshrd008();
    cf_InitFormMhshrd008();
    cf_SetBindingMhshrd008();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrd008 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrd008").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMhshrd008;
var cf_SetComponentsMhshrd008 = function() {
    var dhxGridMhshrd008HeaderInfo = [];
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrd008" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader('근로시간구분', '200', 'center', 'str', 'coro', false, 'laborTimeSeCode', '', '')); /* gf_LocaleTrans('default', 'titLaborTimeSeCode') */
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader('시작시간', '100', 'center', 'str', 'co', false, 'beginHour', '', '')); /* gf_LocaleTrans('default', 'titbeginMinute') */
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'100','center','str','co',false,'beginMinute',''));
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader('종료시간', '100', 'center', 'str', 'co', false, 'endHour', '', '')); /* gf_LocaleTrans('default', 'titendHour') */
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'100','center','str','co',false,'endMinute',''));
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'center', 'str', 'edn', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhshrd008HeaderInfo.push(gf_MakeDhxGridHeader('순번', '200', 'center', 'str', 'ro', false, 'sn', '', '')); /* gf_LocaleTrans('default', 'titSn') */
    
    var attachHeaderArr = [];
    attachHeaderArr.push(["#rspan", "#rspan", "#rspan", "시", "분", "시", "분", "#rspan", "#rspan", "#rspan"]);
//	var dhxGridMhshrd008 = gf_MakeDhxGrid('dataListMhshrd008', dhxGridMhshrd008HeaderInfo, false, true, false, attachHeaderArr);	// divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr
    dhxGridMhshrd008 = gf_MakeDhxGrid('dataListMhshrd008', dhxGridMhshrd008HeaderInfo, true, false, false, attachHeaderArr);
	dhxGridMhshrd008.enableAutoWidth(false);
    dhxGridMhshrd008.setEditable(true);
    fn_ComboBox();
    
    var jsonParameter3 = {codekindCode : "C199",exceptCode :"",sortOrder :"ordr" };  
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter3, '');
    gf_ComboDataSet(dhxGridMhshrd008, dhxGridMhshrd008.getColIndexById("laborTimeSeCode"), dataSource.data, "sel"); /* 그리드콤보*/
    
    gf_ComboCode('laborTimeSeCodeSearchFormMhshrd008', 'laborTimeSeCode', 'laborTimeSeCode', 'search', 'C199', '' , '', '', 'desc', '');//근로시간 구분검색
};

var eventIds = [];
var cf_SetEventListenerMhshrd008 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMhshrd008, eventIds);
    eventId = dhxGridMhshrd008.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrd008();
        }else if(keyCode == 13 || keyCode == 9)  {   //ENTER , TAB 
            var selectedId = dhxGridMhshrd008.getSelectedRowId();
            var ind        = dhxGridMhshrd008.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd008.getRowIndex(selectedId);
            var type       = dhxGridMhshrd008.getColType(ind);
            dhxGridMhshrd008.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd008.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrd008.getSelectedRowId();
            var ind        = dhxGridMhshrd008.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd008.getRowIndex(selectedId);
            var type       = dhxGridMhshrd008.getColType(ind);
            dhxGridMhshrd008.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd008.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrd008.getSelectedRowId();
            var ind        = dhxGridMhshrd008.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd008.getRowIndex(selectedId);
            var type       = dhxGridMhshrd008.getColType(ind);
            dhxGridMhshrd008.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd008.editCell();
            }
        }
        else return true;
    });
    eventIds.push(eventId);
    eventId = dhxGridMhshrd008.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIds.push(eventId);
    eventId = dhxGridMhshrd008.attachEvent("onRowSelect", function(id, ind){
    });
    eventIds.push(eventId);
    eventId = dhxGridMhshrd008.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIds.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrd008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrd008()
    });
    $('#btnSaveMhshrd008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrd008();
    });
    $('#btnRemoveMhshrd008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrd008();
    });
    $('#btnExcelMhshrd008').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrd008();
    });
    $('#btnSearchMhshrd008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrd008('');
    });
    $('#btnResetMhshrd008').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrd008();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrd008').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrd008, $('#checkAllMhshrd008').prop('checked'), 'chk');
    });
    $('#laborTimeSeCodeSearchFormMhshrd008').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMhshrd008').click(); event.preventDefault(); }
    });
    $('#snSearchFormMhshrd008').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMhshrd008').click(); event.preventDefault(); }
    });
    $('#saveFormMhshrd008').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMhshrd008 = function() {
    $('#searchFormMhshrd008').resetForm();
};

var cf_SetBindingMhshrd008 = function() {
	fn_InitDataProcess();
    fn_SearchMhshrd008('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrd008 = function(userId) {
    var jsonParameter = {
        laborTimeSeCode : gf_FormGetValue('searchFormMhshrd008', 'laborTimeSeCode', 'combo'),
        useAt : gf_FormGetValue('searchFormMhshrd008', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrd008/searchMhshrd008', jsonParameter, 'fn_CallbackSearchMhshrd008', false, 'GET');
};
var fn_InitDataProcess = function(){
	// 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrd008 = new dataProcessor(gv_ContextPath+'/mhshrd008/saveMhshrd008'); //lock feed url
    dhxDataProcessorMhshrd008.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrd008.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrd008.init(dhxGridMhshrd008); //link dataprocessor to the grid
    dhxDataProcessorMhshrd008.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrd008.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrd008.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            
    		if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
    			if(!gf_IsNull(dataSource.methodNm)){ 
    				gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
    			} else { 
    				gf_DivMsgAlert(dataSource.message); 
    			} 
    			return false;
        	} else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrd008();
                    $("#checkAllMhshrd008").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
}
var dhxDataProcessorMhshrd008;
var fn_CallbackSearchMhshrd008 = function(strSvcID, targetID, data) {
    dhxGridMhshrd008.clearAll();
    var jsonParameter = {};
	var dataSource = gf_NoAsyncTransaction('mhshrd008/searchMhshrd008', jsonParameter, 'GET');
    var dataSn = dataSource.data;
    if(maxSn < dataSn.sn){
    	maxSn=data.sn;
    }
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhshrd008');
        dhxGridMhshrd008.parse(data.data.records, 'js');
        fn_InitDataProcess();
        dhxGridMhshrd008.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhshrd008');
    }
    $("#spanCntSearchFormMhshrd008").text(data.data.records.length);
    cf_SetEventListenerMhshrd008();
};
/**
 * 저장 (입력, 수정)
 */
var fn_AddMhshrd008 = function() {
    dhxGridMhshrd008.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //laborTimeSeCode
    initValueArr.push(''); //beginMinute
    initValueArr.push(''); //beginTime
    initValueArr.push(''); //endHour
    initValueArr.push(''); //endHour
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //rm
    initValueArr.push(maxSn++); //sn
    dhxGridMhshrd008.addRow(dhxGridMhshrd008.uid(), initValueArr, 0);
    dhxGridMhshrd008.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrd008');
    $('#btnPopEmpSearchMhshrd008').show();
}
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrd008 = function() {
    if(fn_GridValidation(dhxGridMhshrd008, dhxDataProcessorMhshrd008)) {
        dhxDataProcessorMhshrd008.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrd008 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrd008, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrd008.forEachRow(function(rowId) {
            state = dhxDataProcessorMhshrd008.getState(rowId);
            if(dhxGridMhshrd008.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrd008, 'chk')).isChecked()){
                if(state == 'inserted') dhxGridMhshrd008.deleteRow(rowId);
                else dhxDataProcessorMhshrd008.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrd008 = function () {
    var titMhshrd008 = '근태시간코드'; /* gf_LocaleTrans('default', 'titMhshrd008') */
    var jsonParameter = {
        laborTimeSeCode : gf_FormGetValue('searchFormMhshrd008', 'laborTimeSeCode', 'text'),
        sn : gf_FormGetValue('searchFormMhshrd008', 'sn', 'text')
    };
    var header = [[
        '근로 시간 구분 코드 , 공통코드 C199' /* gf_LocaleTrans('default', 'titLaborTimeSeCode') */,
        '근로 시간 구분 순번' /* gf_LocaleTrans('default', 'titSn') */,
        '시작 시간 시간+' /* gf_LocaleTrans('default', 'titBeginTime') */,
        '종료 시간' /* gf_LocaleTrans('default', 'titEndTime') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '비' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'laborTimeSeCode', 'sn', 'beginTime', 'endTime', 'useAt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrd008 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrd008;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrd008/excelMhshrd008', jsonParameter);
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
    $('#saveFormMhshrd008 #laborTimeSeCodeSaveFormMhshrd008').parent().append(
    '<div class="error" id="laborTimeSeCodeSaveFormMhshrd008-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshrd008 #snSaveFormMhshrd008').parent().append(
    '<div class="error" id="snSaveFormMhshrd008-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrd008 = function(laborTimeSeCode, sn){
    if(!gf_IsNull(laborTimeSeCode) && !gf_IsNull(sn)) {
        var jsonParameter = {
            laborTimeSeCode : laborTimeSeCode,
            sn : sn
        };
        var dataSource = gf_NoAsyncTransaction('mhshrd008/findMhshrd008', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.laborTimeSeCode) && gf_IsNull(data.sn)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
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
    var checkLaborTimeSeCode;
    var checkSn;
    var maxId = [];
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'laborTimeSeCode', 'grid') )){
    				if(valid){
    					gf_DivMsgAlert("근로시간근무는 필수항목 입니다.");
    				}
    				fn_GridValidationSelectCell(dhxGridObjet, rowId, 'laborTimeSeCode');
    				valid = false;
    			}
    			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'beginHour', 'grid') )){
    				if(valid){
    					gf_DivMsgAlert("시작시간(시)은  필수항목 입니다.");
    				}
    				fn_GridValidationSelectCell(dhxGridObjet, rowId, 'beginHour');
    				valid = false;
    			}
    			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'beginMinute', 'grid') )){
    				if(valid){
    					gf_DivMsgAlert("시작시간(분)은  필수항목 입니다.");
    				}
    				fn_GridValidationSelectCell(dhxGridObjet, rowId, 'beginMinute');
    				valid = false;
    			}
    			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'endHour', 'grid') )){
    				if(valid){
    					gf_DivMsgAlert("종료시간(시)은  필수항목 입니다.");
    				}
    				fn_GridValidationSelectCell(dhxGridObjet, rowId, 'endHour');
    				valid = false;
    			}
    			if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'endMinute', 'grid') )){
    				if(valid){
    					gf_DivMsgAlert("종료시간(분)은  필수항목 입니다.");
    				}
    				fn_GridValidationSelectCell(dhxGridObjet, rowId, 'endMinute');
    				valid = false;
    			}
            }
        }
    });
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMhshrd008.selectRowById(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }

    return valid;
}
/**
 * 그리드 validation 빨간색 언더바
 */
var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
    dhxGrid.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrd008.getState(rowId))) {
            dhxGrid.forEachCell(rowId, function(cellObj, ind){
                dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
            });
        }
    });
    setTimeout(function(){
        dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
    },1);
}
/**
  * 콤보 생성
  */
var fn_ComboBox = function(){
	 var beginHour = dhxGridMhshrd008.getCombo(3);
	 	beginHour.put("00","00시");
	 	beginHour.put("01","01시");
	 	beginHour.put("02","02시");
	 	beginHour.put("03","03시");
	 	beginHour.put("04","04시");
	 	beginHour.put("05","05시");
	 	beginHour.put("06","06시");
	 	beginHour.put("07","07시");
	 	beginHour.put("08","08시");
	 	beginHour.put("09","09시");
	 	beginHour.put("10","10시");
	 	beginHour.put("11","11시");
	 	beginHour.put("12","12시");
	 	beginHour.put("13","13시");
	 	beginHour.put("14","14시");
	 	beginHour.put("15","15시");
	 	beginHour.put("16","16시");
	 	beginHour.put("17","17시");
	 	beginHour.put("18","18시");
	 	beginHour.put("19","19시");
	 	beginHour.put("20","20시");
	 	beginHour.put("21","21시");
	 	beginHour.put("22","22시");
	 	beginHour.put("23","23시");
	 	
	 var endHour = dhxGridMhshrd008.getCombo(5);
	 	endHour.put("00","00시");
	 	endHour.put("01","01시");
	 	endHour.put("02","02시");
	 	endHour.put("03","03시");
	 	endHour.put("04","04시");
	 	endHour.put("05","05시");
	 	endHour.put("06","06시");
	 	endHour.put("07","07시");
	 	endHour.put("08","08시");
	 	endHour.put("09","09시");
	 	endHour.put("10","10시");
	 	endHour.put("11","11시");
	 	endHour.put("12","12시");
	 	endHour.put("13","13시");
	 	endHour.put("14","14시");
	 	endHour.put("15","15시");
	 	endHour.put("16","16시");
	 	endHour.put("17","17시");
	 	endHour.put("18","18시");
	 	endHour.put("19","19시");
	 	endHour.put("20","20시");
	 	endHour.put("21","21시");
	 	endHour.put("22","22시");
	 	endHour.put("23","23시");
    
	 var beginMinute = dhxGridMhshrd008.getCombo(4);
	 	beginMinute.put("00","00분");
	 	beginMinute.put("10","10분");
	 	beginMinute.put("20","20분");
	 	beginMinute.put("30","30분");
	 	beginMinute.put("40","40분");
	 	beginMinute.put("50","50분");
	 	beginMinute.put("59","59분");
	 	
	 var endMinute = dhxGridMhshrd008.getCombo(6);
	 	endMinute.put("00","00분");
	 	endMinute.put("10","10분");
	 	endMinute.put("20","20분");
	 	endMinute.put("30","30분");
	 	endMinute.put("40","40분");
	 	endMinute.put("50","50분");
	 	endMinute.put("59","59분");
    
};