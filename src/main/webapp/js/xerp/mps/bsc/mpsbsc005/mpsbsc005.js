/**
 *    프로그램       : 개인별급여기준일괄등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.12
 *    사용테이블      : MPS_CALC_STDR
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/



var dhxGridMpsbsc005;
var dhxDataProcessorMpsbsc005;


/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsbsc005();
    cf_SetComponentsMpsbsc005();
    cf_SetEventListenerMpsbsc005();
    cf_InitFormMpsbsc005();
    cf_SetBindingMpsbsc005();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc005 = function() {
    gf_SetMenuPath();
    
    //사업장
	gf_MakeComboBasic('divComboBplcKorNm', 'searchComboStmBizplc', 'sel', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '');
	//재직구분 	: divId, selectId(지정ID),  selectName(지정명), placeHolder(=search or add), codekindCode, exceptCode(=코드), selectStyle, selectClass, sortOrder, required
	gf_ComboCode('divComboHffsSe', 'searchComboHffsSe', 'searchComboHffsSe', 'search', 'C278', '' , '', '', 'asc', '');
	
};


var cf_SetComponentsMpsbsc005 = function() {
    var dhxGridMpsbsc005HeaderInfo = [];
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc005" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', false, 'applcCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchImgButton',false,'searchEmpButton','',''));
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('성명', '100', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('부서', '130', 'center', 'str', 'ro', false, 'deptNm', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('직급', '120', 'center', 'str', 'coro', false, 'clfsCode', '', '')); /* gf_LocaleTrans('default', 'titCalcStdrSn') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('직위', '120', 'center', 'str', 'coro', false, 'ofcpsCode', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '150', 'center', 'str', 'coro', false, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titCalcSe') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '200', 'center', 'str', 'coro', false, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titCalcNomfrmDtls') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('지급금액', '*', 'center', 'str', 'edn', false, 'calcNomfrmDtls', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('', '', 'center', 'str', 'ed', true, 'applcStdrSe', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('', '', 'center', 'str', 'ed', true, 'calcOrdr', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('', '', 'center', 'str', 'ed', true, 'calcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('', '', 'center', 'str', 'ed', true, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('', '', 'center', 'str', 'ed', true, 'applcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    
    dhxGridMpsbsc005HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '10', 'center', 'str', 'ro', true, 'regId', '', ''));
    dhxGridMpsbsc005 = gf_MakeDhxGrid('dataListMpsbsc005', dhxGridMpsbsc005HeaderInfo, true, false, false);
    dhxGridMpsbsc005.enableAutoWidth(true);
    
    //직급
    var comboClsfCode = dhxGridMpsbsc005.getCombo(dhxGridMpsbsc005.getColIndexById("clfsCode"));
	gf_MakeComboGrid(comboClsfCode, 'sel', 'mhshrm004/searchMhshrb004ClsfCodeCombo', 'clsfCode', 'clsfNm', '');
	//직위
	var comboOfcpsCode = dhxGridMpsbsc005.getCombo(dhxGridMpsbsc005.getColIndexById("ofcpsCode"));
	gf_MakeComboGrid(comboOfcpsCode, 'sel', 'mhshrm015/searchMhshrm015OfcpsCodeCombo', 'ofcpsCode', 'ofcpsNm', '');
	//급여항목
	var comboSalaryitemCode = dhxGridMpsbsc005.getCombo(dhxGridMpsbsc005.getColIndexById("salaryitemCode"));
	gf_MakeComboGrid(comboSalaryitemCode, 'sel', 'mpsbsc002/combo/searchComboMpsbsc002List', 'key', 'value', ''); //급여항목 리스트 
	//급여유형
	var comboSalarytyCode = dhxGridMpsbsc005.getCombo(dhxGridMpsbsc005.getColIndexById("salarytyCode"));
	gf_MakeComboGrid(comboSalarytyCode, 'sel', 'cmmnCode/getCmmnCode', 'code', 'codeNm', {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" }); //급여항목 리스트
	
};

var eventIds = [];
var cf_SetEventListenerMpsbsc005 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMpsbsc005, eventIds);
    eventId = dhxGridMpsbsc005.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) fn_ExcelMpsbsc005();
    });
    eventIds.push(eventId);
    eventId = dhxGridMpsbsc005.attachEvent("onRowSelect", function(rId,cInd){
        gf_errorMsgClear();
        
        if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc005, 'searchEmpButton')) { 
    		fn_gridSearchEmpButton( rId );
    	}
        
    });
    eventIds.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    

    //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMpsbsc005","empno","empNm", gf_FormGetValue('searchFormMpsbsc005', 'searchComboStmBizplc', 'combo'), "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
    });
    
    //부서 선택 Popup
	$('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMpsbsc005","deptCode","deptCodeNm", gf_FormGetValue('searchFormMpsbsc005', 'searchComboStmBizplc', 'combo'), "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
    });
    
    
    
    
    $('#btnAddMpsbsc005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsbsc005()
    });
    $('#btnSaveMpsbsc005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc005();
    });
    $('#btnRemoveMpsbsc005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsbsc005();
    });
    $('#btnExcelMpsbsc005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc005();
    });
    $('#btnSearchMpsbsc005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsbsc005('');
    });
    $('#btnResetMpsbsc005').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc005();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpsbsc005').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpsbsc005, $('#checkAllMpsbsc005').prop('checked'), 'chk');
    });
    $('#salarytyCodeSearchFormMpsbsc005').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc005').click(); event.preventDefault(); }
    });
    $('#salaryitemCodeSearchFormMpsbsc005').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc005').click(); event.preventDefault(); }
    });
    $('#applcStdrSnSearchFormMpsbsc005').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc005').click(); event.preventDefault(); }
    });
    $('#calcStdrSnSearchFormMpsbsc005').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpsbsc005').click(); event.preventDefault(); }
    });
    $('#saveFormMpsbsc005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMpsbsc005 input[name="salarytyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005, 'salarytyCode', $(this).val());
    });
    $('#saveFormMpsbsc005 input[name="salaryitemCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005, 'salaryitemCode', $(this).val());
    });
    $('#saveFormMpsbsc005 input[name="applcStdrSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005, 'applcStdrSn', $(this).val());
    });
    $('#saveFormMpsbsc005 input[name="calcStdrSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005, 'calcStdrSn', $(this).val());
    });
    $('#saveFormMpsbsc005 input[name="applcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005, 'applcCode', $(this).val());
    });
    $('#saveFormMpsbsc005 input[name="calcSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005, 'calcSe', $(this).val());
    });
    $('#saveFormMpsbsc005 input[name="calcNomfrmDtls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005, 'calcNomfrmDtls', $(this).val());
    });
    $('#saveFormMpsbsc005 input[name="applcSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005, 'applcSe', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMpsbsc005 = function() {
    $('#searchFormMpsbsc005').resetForm();
};

var cf_SetBindingMpsbsc005 = function() {
	// 그리드입력 데이터프로세스 정의
    fn_DataProcessInit();
	
    fn_FormDisabled(true);
    fn_SearchMpsbsc005('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc005 = function (){
	
    var jsonParameter = {
		deptCode :  gf_FormGetValue('searchFormMpsbsc005', 'deptCode', 'text'),
    	deptCodeNm :  gf_FormGetValue('searchFormMpsbsc005', 'deptCodeNm', 'text'),
        empno : gf_FormGetValue('searchFormMpsbsc005', 'empno', 'text'),
        korNm : gf_FormGetValue('searchFormMpsbsc005', 'empNm', 'text'),

        bplcCode : gf_FormGetValue('searchFormMpsbsc005', 'searchComboStmBizplc', 'combo'), //사업장
    	hffsSe : gf_FormGetValue('searchFormMpsbsc005', 'searchComboHffsSe', 'combo') //재직구분
    };
    
    gf_Transaction(jsonParameter, 'mpsbsc005/searchMpsbsc005', jsonParameter, 'fn_CallbackSearchMpsbsc005', false, 'GET');
};


var fn_CallbackSearchMpsbsc005 = function(strSvcID, targetID, data) {
    dhxGridMpsbsc005.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc005');
        dhxGridMpsbsc005.parse(data.data.records, 'js');
        fn_DataProcessInit();
        dhxGridMpsbsc005.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc005');
        fn_InitInputFormMpsbsc005();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMpsbsc005").text(data.data.records.length);
    cf_SetEventListenerMpsbsc005();
};

var fn_DataProcessInit = function(){
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc005 = new dataProcessor(gv_ContextPath+'/mpsbsc005/saveMpsbsc005'); //lock feed url
    dhxDataProcessorMpsbsc005.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc005.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc005.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc005.init(dhxGridMpsbsc005); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc005.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc005.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc005();
                    $("#checkAllMpsbsc005").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
}

/**
 * 입력폼 초기화
 */
var fn_InitInputFormMpsbsc005 = function() {
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMpsbsc005 *').prop('disabled', status);
};
/**
 * 저장 (입력, 수정)
 */
var fn_AddMpsbsc005 = function() {
    dhxGridMpsbsc005.clearSelection();
    fn_InitInputFormMpsbsc005();
    
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //applcCode
    initValueArr.push(''); //searchEmpButton
    initValueArr.push(''); //korNm
    initValueArr.push(''); //deptNm
    initValueArr.push(''); //clfsCode
    initValueArr.push(''); //ofcpsCode
    initValueArr.push('001'); //salarytyCode
    initValueArr.push('A00'); //salaryitemCode
    initValueArr.push(''); //calcNomfrmDtls

    initValueArr.push('003'); //applcStdrSe
    initValueArr.push('1'); //calcOrdr
    initValueArr.push(''); //calcStdrSn
    initValueArr.push('002'); //calcSe
    initValueArr.push(''); //applcStdrSn
    
    dhxGridMpsbsc005.addRow(dhxGridMpsbsc005.uid(), initValueArr, 0);
    dhxGridMpsbsc005.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc005');
    $('#btnPopEmpSearchMpsbsc005').show();
    fn_FormDisabled(false);
}
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc005 = function() {
    if(fn_GridValidation(dhxGridMpsbsc005, dhxDataProcessorMpsbsc005)) {
        dhxDataProcessorMpsbsc005.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsbsc005 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsbsc005, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpsbsc005.forEachRow(function(rowId) {
            state = dhxDataProcessorMpsbsc005.getState(rowId);
            if(dhxGridMpsbsc005.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsbsc005, 'chk')).isChecked()){
                if(state == 'inserted') dhxGridMpsbsc005.deleteRow(rowId);
                else dhxDataProcessorMpsbsc005.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}

/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc005 = function () {
    var titMpsbsc005 = '개인별급여기준일괄등록'; /* gf_LocaleTrans('default', 'titMpsbsc005') */
    var jsonParameter = {
		deptCode :  gf_FormGetValue('searchFormMpsbsc005', 'deptCode', 'text'),
    	deptCodeNm :  gf_FormGetValue('searchFormMpsbsc005', 'deptCodeNm', 'text'),
        empno : gf_FormGetValue('searchFormMpsbsc005', 'empno', 'text'),
        korNm : gf_FormGetValue('searchFormMpsbsc005', 'empNm', 'text'),

        bplcCode : gf_FormGetValue('searchFormMpsbsc005', 'searchComboStmBizplc', 'combo'), //사업장
    	hffsSe : gf_FormGetValue('searchFormMpsbsc005', 'searchComboHffsSe', 'combo') //재직구분
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titSalarytyCode') */,
        '성명' /* gf_LocaleTrans('default', 'titSalaryitemCode') */,
        '부서' /* gf_LocaleTrans('default', 'titApplcStdrSn') */,
        '직급' /* gf_LocaleTrans('default', 'titCalcStdrSn') */,
        '직위' /* gf_LocaleTrans('default', 'titApplcCode') */,
        '급여유형' /* gf_LocaleTrans('default', 'titCalcSe') */,
        '급여항목' /* gf_LocaleTrans('default', 'titCalcNomfrmDtls') */,
        '지급금액' /* gf_LocaleTrans('default', 'titApplcSe') */
    ]];
    var dataId = [[ 'applcCode', 'korNm', 'deptNm', 'clfsCode', 'ofcpsCode', 'salarytyCode', 'salaryitemCode', 'calcNomfrmDtls' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsbsc005 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc005;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc005/excelMpsbsc005', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/

/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkSalarytyCode;
    var checkSalaryitemCode;
    var checkApplcStdrSn;
    var checkCalcStdrSn;
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcCode', 'grid') )){
                	gf_DivMsgAlert("사원번호는 필수항목 입니다.");
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcCode');
                    valid = false;
                }
                
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid') )){
                	gf_DivMsgAlert("급여유형은 필수항목 입니다.");
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                    valid = false;
                }
                
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid') )){
                	gf_DivMsgAlert("급여항목은 필수항목 입니다.");
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                    valid = false;
                }
                
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'calcNomfrmDtls', 'grid') )){
                	gf_DivMsgAlert("지급금액은 필수항목 입니다.");
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'calcNomfrmDtls');
                    valid = false;
                } else {
                	if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'calcNomfrmDtls', 'grid') )){
                		gf_DivMsgAlert("지급금액은 숫자만 입력가능합니다.");
                		fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'calcNomfrmDtls');
                		valid = false;
                	}
                	if(valid && ( gf_DhxGetValue(dhxGridObjet, rowId, 'calcNomfrmDtls', 'grid') <= 0)){
                		gf_DivMsgAlert("지급금액은 0보다  큰값을 입력하세요.");
                		fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'calcNomfrmDtls');
                		valid = false;
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
        dhxGridMpsbsc005.selectRowById(validFalseFistRowId);
    }
    if(gf_IsNull(validFalseFistRowId)) return true;
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


//////////////////검색바
	
//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMpsbsc005', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormMpsbsc005', 'empNm', 'text'),
		    bplcCode : gf_FormGetValue('searchFormMpsbsc005', 'searchComboStmBizplc', 'combo') //사업장
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMpsbsc005', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormMpsbsc005', 'empNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormMpsbsc005","empno","empNm", gf_FormGetValue('searchFormMpsbsc005', 'searchComboStmBizplc', 'combo'), "Y", null);
  	}
}

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormMpsbsc005', 'deptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormMpsbsc005', 'deptCodeNm', 'text'), 
			useAt : '1',
			bplcCode : gf_FormGetValue('searchFormMpsbsc005', 'searchComboStmBizplc', 'combo') //사업장
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}

function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMpsbsc005', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMpsbsc005', 'deptCodeNm', data.deptKorNm, 'text');
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormMpsbsc005","deptCode","deptCodeNm", gf_FormGetValue('searchFormMpsbsc005', 'searchComboStmBizplc', 'combo'), "Y", null);
    }
}

//////////////////검색바

var fn_gridSearchEmpButton = function( rid ) {	
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButton', rid);
};
var fn_CallbackGridSearchEmpButton = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridMpsbsc005, rid, 'applcCode', data.empno, 'grid');
		gf_DhxSetValue(dhxGridMpsbsc005, rid, 'korNm', data.korNm, 'grid');
		gf_DhxSetValue(dhxGridMpsbsc005, rid, 'deptNm', data.deptCodeNm, 'grid');
		gf_DhxSetValue(dhxGridMpsbsc005, rid, 'clfsCode', data.clsfCode, 'grid');
		gf_DhxSetValue(dhxGridMpsbsc005, rid, 'ofcpsCode', data.ofcpsCode, 'grid');
	}
};
