/**
 *    프로그램       : 휴직신청관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.15
 *    사용테이블      : MHS_LAYOFF
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var gBplcCode = "1000";  //사업장 코드 , Sample 에서는 1000으로 고정, 실제 프로그램에서는 화면에서 받아서 사용
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var dhxCCalendarSearchLayoffDe; // 기간 달력(From ~ To)
var dhxCCalendarLayoffDeSave;

var uploadedFileKeys1 = []; // db 저장용 (키만 파이프라인으로 구분)
var uploadedFileInfo1 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhswks007();
    cf_SetComponentsMhswks007();
    cf_SetEventListenerMhswks007();
    cf_InitFormMhswks007();
    cf_SetBindingMhswks007();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhswks007 = function() {
    gf_SetMenuPath();
    gf_ComboCode('layoffSeCodeSaveFormMhswks007', 'searchComboDetailSysSe', 'searchComboDetailSysSe', 'add', 'C190', 'MFS,MVS' , '', '', 'asc', 'required');/* 휴직구분(저장) */
    gf_ComboCode('wrycReqstSnSearchFormMhswks007', 'searchComboSysSe', 'searchComboSysSe', 'search', 'C190', '' , '', '', 'asc', '');/* 휴직구분(검색) */
    gf_ComboCode('sanctnCodeSearchFormMhswks007', 'searchComboSysSe', 'searchComboSysSe', 'search', 'EA004', '' , '', '', 'asc', '');/* 결재구분(검색) */
    fn_dateDe();
    fn_FileUploadBtnEvent();
    
    $("#saveFormMhswks007").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMhswks007;
var cf_SetComponentsMhswks007 = function() {
    var dhxGridMhswks007HeaderInfo = [];
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhswks007" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '80', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('부서명', '80', 'center', 'str', 'ro', false, 'deptKorNm', '')); /* gf_LocaleTrans('default', 'titDeptKorNm') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('사번', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '')); /* gf_LocaleTrans('default', 'titKorNm') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('휴직구분', '80', 'center', 'str', 'ro', false, 'layoffSeCode', '', '')); /* gf_LocaleTrans('default', 'titLayoffSeCode') (C190)*/
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('휴직시작일', '80', 'center', 'str', 'ro', false, 'layoffBeginDe', '', '')); /* gf_LocaleTrans('default', 'titLayoffBeginDe') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('휴직종료일', '80', 'center', 'str', 'ro', false, 'layoffEndDe', '', '')); /* gf_LocaleTrans('default', 'titLayoffEndDe') */
    
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('기간', '80', 'center', 'str', 'ro', false, 'layoffEndDe', '', '')); /* gf_LocaleTrans('default', 'titLayoffEndDe') */
    
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '80', 'center', 'str', 'ro', false, 'sanctnSttusCode', '', '')); /* gf_LocaleTrans('default', 'titSanctnSttusCode') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('휴직일수', '100', 'center', 'str', 'ro', true, 'layoffDaycnt', '', '')); /* gf_LocaleTrans('default', 'titLayoffDaycnt') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('휴직내역', '100', 'center', 'str', 'ro', true, 'layoffDtls', '', '')); /* gf_LocaleTrans('default', 'titLayoffDtls') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('연장휴직번호', '100', 'center', 'str', 'ro', true, 'extnLayoffNo', '', '')); /* gf_LocaleTrans('default', 'titExtnLayoffNo') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('근속기간포함여부', '100', 'center', 'str', 'ro', true, 'cnwkpdInclsAt', '', '')); /* gf_LocaleTrans('default', 'titCnwkpdInclsAt') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '100', 'center', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('전자결재문서번호', '100', 'center', 'str', 'ro', true, 'sanctnDocNo', '', '')); /* gf_LocaleTrans('default', 'titSanctnDocNo') */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', true, '', '', '')); /* 컬럼수가 10이상일 경우 좌우 스크롤이 생기도록 더미를 붙였음 개발시 필요에 따라 삭제해도 무방함 */
    dhxGridMhswks007HeaderInfo.push(gf_MakeDhxGridHeader('휴직번호', '100', 'center', 'str', 'ro', true, 'layoffNo', '', '')); /* gf_LocaleTrans('default', 'titLayoffNo') */
    dhxGridMhswks007 = gf_MakeDhxGrid('dataListMhswks007', dhxGridMhswks007HeaderInfo, true, false, false);
    dhxGridMhswks007.enableAutoWidth(true);
};

var eventIds = [];
var cf_SetEventListenerMhswks007 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIds = gf_GridDetachEvent(dhxGridMhswks007, eventIds);
    eventId = dhxGridMhswks007.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) fn_ExcelMhswks007();
    });
    eventIds.push(eventId);
    eventId = dhxGridMhswks007.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhswks007();
    });
    eventIds.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhswks007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhswks007()
    });
    $('#btnSaveMhswks007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhswks007();
    });
    $('#btnRemoveMhswks007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhswks007();
    });
    $('#btnExcelMhswks007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhswks007();
    });
    $('#btnSearchMhswks007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhswks007('');
    });
    $('#btnResetMhswks007').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhswks007();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhswks007').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhswks007, $('#checkAllMhswks007').prop('checked'), 'chk');
    });
    $('#layoffNoSearchFormMhswks007').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMhswks007').click(); event.preventDefault(); }
    });
    $('#saveFormMhswks007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhswks007 input[name="layoffNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'layoffNo', $(this).val());
    });
    $('#saveFormMhswks007 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'empno', $(this).val());
    });
    $('#saveFormMhswks007 input[name="reqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'reqstDe', $(this).val());
    });
    $('#saveFormMhswks007 input[name="layoffBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'layoffBeginDe', $(this).val());
    });
    $('#saveFormMhswks007 input[name="layoffEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'layoffEndDe', $(this).val());
    });
    $('#saveFormMhswks007 input[name="layoffDaycnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'layoffDaycnt', $(this).val());
    });
    $('#saveFormMhswks007 input[name="layoffDtls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'layoffDtls', $(this).val());
    });
    $('#saveFormMhswks007 input[name="extnLayoffNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'extnLayoffNo', $(this).val());
    });
    $('#saveFormMhswks007 input[name="layoffSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'layoffSeCode', $(this).val());
    });
    $('#saveFormMhswks007 input[name="cnwkpdInclsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'cnwkpdInclsAt', $(this).val());
    });
    $('#saveFormMhswks007 input[name="atchmnflNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMhswks007 input[name="sanctnDocNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'sanctnDocNo', $(this).val());
    });
    $('#saveFormMhswks007 input[name="sanctnSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswks007, dhxDataProcessorMhswks007, 'sanctnSttusCode', $(this).val());
    });
    // 사원, 부서 pop 이벤트 ===========================================================================================
    //사원 선택 검색
	$('#searchFormMhswks007 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhswks007","empNmSearchFormMhswks007","empCodeNmSearchFormMhswks007", gBplcCode, "Y", "fn_CallbackSearchPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 입력 후 Enter 이벤트
	$('#empNmSearchFormMhswks007').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#empCodeNmSearchFormMhswks007').focus();
	    }
    });
	$('#empCodeNmSearchFormMhswks007').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
	//사원 선택 신규
	$('#saveFormMhswks007 #btnEmpCodeSave').unbind('click').bind('click', function(event){
		gf_EmpPopup("saveFormMhswks007","empnoSaveFormMhswks007","korNmSaveFormMhswks007", gBplcCode, "Y", "fn_CallbackSavePopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 입력 후 Enter 이벤트
	$('#empnoSaveFormMhswks007').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#korNmSaveFormMhswks007').focus();
	    }
    });
	$('#korNmSaveFormMhswks007').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("2");
	    }
    });
	//부서 선택 Popup
	$('#searchFormMhswks007 #btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhswks007","deptCodeSearchFormMhswks007","deptCodeNmSearchFormMhswks007", gBplcCode, "Y", "fn_CallbackPopDept");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCodeSearchFormMhswks007').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#deptCodeNmSearchFormMhswks007').focus();
	    }
    });
	$('#deptCodeNmSearchFormMhswks007').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchDeptCode();
	    }
    });
	// 달력 이벤트 ==========================================================================================
	//휴직기간 검색
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#searchFormMhswks007 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
	//기간달력 이벤트 추가
    $('#searchFormMhswks007 #searchLayoffDe').unbind('click').bind('click', function(event){
    	//dhxCCalendarSearchLayoffDe.setPosition("bottom"); // "bottom"
    	//$('#searchLayoffDe').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxCCalendarSearchLayoffDe.show();
    });
    //휴직기간 신규
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#saveFormMhswks007 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
	//기간달력 이벤트 추가
    $('#saveFormMhswks007 #layoffDeSave').unbind('click').bind('click', function(event){
    	//dhxCCalendarSearchLayoffDe.setPosition("bottom"); // "bottom"
    	//$('#searchLayoffDe').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxCCalendarLayoffDeSave.show();
    });
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormMhswks007 = function() {
    $('#searchFormMhswks007').resetForm();
};

var cf_SetBindingMhswks007 = function() {
    fn_FormDisabled(true);
    fn_SearchMhswks007('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhswks007 = function(userId) {
    var jsonParameter = {
        layoffNo : gf_FormGetValue('searchFormMhswks007', 'layoffNo', 'text')
    };
    gf_Transaction(userId, 'mhswks007/searchMhswks007', jsonParameter, 'fn_CallbackSearchMhswks007', false, 'GET');
};

var dhxDataProcessorMhswks007;
var fn_CallbackSearchMhswks007 = function(strSvcID, targetID, data) {
    dhxGridMhswks007.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhswks007');
        dhxGridMhswks007.parse(data.data.records, 'js');
        // 그리드입력 데이터프로세스 정의
        dhxDataProcessorMhswks007 = new dataProcessor(gv_ContextPath+'/mhswks007/saveMhswks007'); //lock feed url
        dhxDataProcessorMhswks007.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
        dhxDataProcessorMhswks007.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
        dhxDataProcessorMhswks007.init(dhxGridMhswks007); //link dataprocessor to the grid
        dhxDataProcessorMhswks007.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
        dhxDataProcessorMhswks007.styles = {
                        updated:        "font-weight:normal;text-decoration:none;",
                        inserted:       "font-weight:bold; color:green;",
                        deleted:        "color:orange; text-decoration:line-through;",
                        invalid:        "color:green; text-decoration:underline;",
                        error:          "color:blue; text-decoration:underline;",
                        clear:          "font-weight:normal;text-decoration:none;"
        };
        dhxDataProcessorMhswks007.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
                if (dataSource.code == "000" || dataSource.data.code !== "000"){
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                        fn_SearchMhswks007();
                        $("#checkAllMhswks007").prop('checked', false); //상단 체크박스 해제
                        return true;
                } else {
                        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                        return false;
                }
        });
        dhxGridMhswks007.selectRow(0);
        fn_FindMhswks007();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhswks007');
        fn_InitInputFormMhswks007();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMhswks007").text(data.data.records.length);
    cf_SetEventListenerMhswks007();
};
/**
 * 상세조회
 */
var fn_FindMhswks007 = function() {
    var rId = dhxGridMhswks007.getSelectedRowId();
    var status = dhxDataProcessorMhswks007.getState(rId);

    gf_FormSetValue("saveFormMhswks007", "layoffNo", gf_DhxGetValue(dhxGridMhswks007, rId, 'layoffNo',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "empno", gf_DhxGetValue(dhxGridMhswks007, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "reqstDe", gf_DhxGetValue(dhxGridMhswks007, rId, 'reqstDe',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "layoffBeginDe", gf_DhxGetValue(dhxGridMhswks007, rId, 'layoffBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "layoffEndDe", gf_DhxGetValue(dhxGridMhswks007, rId, 'layoffEndDe',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "layoffDaycnt", gf_DhxGetValue(dhxGridMhswks007, rId, 'layoffDaycnt',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "layoffDtls", gf_DhxGetValue(dhxGridMhswks007, rId, 'layoffDtls',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "extnLayoffNo", gf_DhxGetValue(dhxGridMhswks007, rId, 'extnLayoffNo',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "layoffSeCode", gf_DhxGetValue(dhxGridMhswks007, rId, 'layoffSeCode',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "cnwkpdInclsAt", gf_DhxGetValue(dhxGridMhswks007, rId, 'cnwkpdInclsAt',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "atchmnflNo", gf_DhxGetValue(dhxGridMhswks007, rId, 'atchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "sanctnDocNo", gf_DhxGetValue(dhxGridMhswks007, rId, 'sanctnDocNo',  'grid'), '');
    gf_FormSetValue("saveFormMhswks007", "sanctnSttusCode", gf_DhxGetValue(dhxGridMhswks007, rId, 'sanctnSttusCode',  'grid'), '');

    fn_FormDisabled(false);

    if(status == 'inserted') {
        $('#saveFormMhswks007 input[name="layoffNo"]').prop('disabled', false);
    } else {
        $('#saveFormMhswks007 input[name="layoffNo"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhswks007 = function() {
    $('#saveFormMhswks007 input[name="layoffNo"]').prop('disabled', false);
    $('#saveFormMhswks007').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhswks007 *').prop('disabled', status);
};
/**
 * 저장 (입력, 수정)
 */
var fn_AddMhswks007 = function() {
    dhxGridMhswks007.clearSelection();
    fn_InitInputFormMhswks007();
    var today = new Date();
    reqstDe = dateFormat(today);
    $('#saveFormMhswks007 input[name="reqstDeSaveFormMhswks007"]').val(reqstDe).change();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //layoffNo
    initValueArr.push(''); //empno
    initValueArr.push(''); //reqstDe
    initValueArr.push(''); //layoffBeginDe
    initValueArr.push(''); //layoffEndDe
    initValueArr.push(''); //layoffDaycnt
    initValueArr.push(''); //layoffDtls
    initValueArr.push(''); //extnLayoffNo
    initValueArr.push(''); //layoffSeCode
    initValueArr.push(''); //cnwkpdInclsAt
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //sanctnDocNo
    initValueArr.push(''); //sanctnSttusCode
    dhxGridMhswks007.addRow(dhxGridMhswks007.uid(), initValueArr, 0);
    dhxGridMhswks007.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhswks007');
    $('#btnPopEmpSearchMhswks007').show();
    fn_FormDisabled(false);
}
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhswks007 = function() {
    if(fn_GridValidation(dhxGridMhswks007, dhxDataProcessorMhswks007)) {
        dhxDataProcessorMhswks007.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhswks007 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhswks007, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhswks007.forEachRow(function(rowId) {
            state = dhxDataProcessorMhswks007.getState(rowId);
            if(dhxGridMhswks007.cells(rowId, gf_GetDhxGridColumId(dhxGridMhswks007, 'chk')).isChecked()){
                if(state == 'inserted') dhxGridMhswks007.deleteRow(rowId);
                else dhxDataProcessorMhswks007.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhswks007 = function () {
    var titMhswks007 = '휴직신청관리'; /* gf_LocaleTrans('default', 'titMhswks007') */
    var jsonParameter = {
        layoffNo : gf_FormGetValue('searchFormMhswks007', 'layoffNo', 'text')
    };
    var header = [[
        '휴직번호' /* gf_LocaleTrans('default', 'titLayoffNo') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '신청일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '휴직시작일자' /* gf_LocaleTrans('default', 'titLayoffBeginDe') */,
        '휴직종료일자' /* gf_LocaleTrans('default', 'titLayoffEndDe') */,
        '휴직일수' /* gf_LocaleTrans('default', 'titLayoffDaycnt') */,
        '휴직내역' /* gf_LocaleTrans('default', 'titLayoffDtls') */,
        '연장휴직번호' /* gf_LocaleTrans('default', 'titExtnLayoffNo') */,
        '휴직구분코드(C190)' /* gf_LocaleTrans('default', 'titLayoffSeCode') */,
        '근속기간포함여부' /* gf_LocaleTrans('default', 'titCnwkpdInclsAt') */,
        '첨부파일번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '전자결재문서번호' /* gf_LocaleTrans('default', 'titSanctnDocNo') */,
        '전자결재상태코드' /* gf_LocaleTrans('default', 'titSanctnSttusCode') */
    ]];
    var dataId = [[ 'layoffNo', 'empno', 'reqstDe', 'layoffBeginDe', 'layoffEndDe', 'layoffDaycnt', 'layoffDtls', 'extnLayoffNo', 'layoffSeCode', 'cnwkpdInclsAt', 'atchmnflNo', 'sanctnDocNo', 'sanctnSttusCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhswks007 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhswks007;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhswks007/excelMhswks007', jsonParameter);
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
    $('#saveFormMhswks007 #layoffNoSaveFormMhswks007').parent().append(
    '<div class="error" id="layoffNoSaveFormMhswks007-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhswks007 = function(layoffNo){
    if(!gf_IsNull(layoffNo)) {
        var jsonParameter = {
            layoffNo : layoffNo
        };
        var dataSource = gf_NoAsyncTransaction('mhswks007/findMhswks007', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.layoffNo)) {
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
    var state = dhxDataProcessorMhswks007.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhswks007').validate().form()){
                if(state == 'inserted') {
                    var layoffNo = gf_FormGetValue('saveFormMhswks007', 'layoffNo', 'text');
                    if(fn_CheckDupMhswks007(layoffNo)) return true;
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
    var checkLayoffNo;
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'layoffNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffNo');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkLayoffNo = gf_DhxGetValue(dhxGridObjet, rowId, 'layoffNo', 'grid');
                    if(!gf_IsNull(checkLayoffNo)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var layoffNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'layoffNo', 'grid');
                            if(((layoffNo == checkLayoffNo)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffNo');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhswks007( checkLayoffNo )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffNo');
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
        dhxGridMhswks007.selectRowById(validFalseFistRowId);
        fn_FindMhswks007();
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
/**
 * 사원, 부서 검색
 */
function fn_CallbackSearchPopEmp(data){
	console.log(data.empno + " : " + data.korNm);
}
function fn_CallbackSavePopEmp(data){
	console.log(data.empno + " : " + data.korNm);
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMhswks007', 'empNmSearchFormMhswks007', 'text');
		korNm = gf_FormGetValue('searchFormMhswks007', 'empCodeNmSearchFormMhswks007', 'text');
	}
	else {
		empno = gf_FormGetValue('saveFormMhswks007', 'empnoSaveFormMhswks007', 'text');
		korNm = gf_FormGetValue('saveFormMhswks007', 'korNmSaveFormMhswks007', 'text');
	}
	
	var jsonParameter = {
			empno     : empno,
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
	 		gf_FormSetValue('searchFormMhswks007', 'empNmSearchFormMhswks007', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhswks007', 'empCodeNmSearchFormMhswks007', data.korNm, 'text');
	  	}
	  	else {
	 		gf_FormSetValue('saveFormMhswks007', 'empnoSaveFormMhswks007', data.empno, 'text');
	 		gf_FormSetValue('saveFormMhswks007', 'korNmSaveFormMhswks007', data.korNm, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		fn_EmpPopup("searchFormMhswks007","empNmSearchFormMhswks007","empCodeNmSearchFormMhswks007", gBplcCode, "Y");
	  	} else {
	  		fn_Emp2Popup("saveFormMhswks007","empnoSaveFormMhswks007","korNmSaveFormMhswks007", gBplcCode, "Y");
	  	}
  	}
}
//부서검색
function fn_CallbackPopDept(data){
	console.log(data.deptCode + " : " + data.deptKorNm);
}
//--부서 입력 후 Enter 이벤트
function fn_SearchDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMhswks007', 'deptCodeSearchFormMhswks007', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMhswks007', 'deptCodeNmSearchFormMhswks007', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('list_type01', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchDeptCode', false, 'GET');
}
function fn_CallbackSearchDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhswks007', 'deptCodeSearchFormMhswks007', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhswks007', 'deptCodeNmSearchFormMhswks007', data.deptKorNm, 'text');

    } 
    else {
    	//Popup 호출
    	fn_DeptPopup("searchFormMhswks007","deptCodeSearchFormMhswks007","deptCodeNmSearchFormMhswks007", gBplcCode, "Y"); 
    }
}
/**
 * 기간달력 
 */
//휴직기간 검색
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="searchLayoffDe_cal" || e.target.id =="searchlayoffBeginDeMhswks007" || e.target.id =="searchlayoffEndDeMhswks007") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarSearchLayoffDe.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
//휴직기간 신규
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="layoffDeSave_cal" || e.target.id =="layoffBeginDeSaveFormMhswks007" || e.target.id =="layoffEndDeSaveFormMhswks007") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarLayoffDeSave.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});


function fn_dateDe(){
	//기간 달력 검색
	dhxCCalendarLayoffDeSave = new dhtmlXDoubleCalendar("layoffDeSave_cal");
	
	dhxCCalendarLayoffDeSave.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#layoffBeginDeSaveFormMhswks007').val(dateFormat(dhxCCalendarLayoffDeSave.leftCalendar.getDate()));
        	$('#layoffEndDeSaveFormMhswks007').val(dateFormat(dhxCCalendarLayoffDeSave.rightCalendar.getDate()));
        	dhxCCalendarLayoffDeSave.hide();
        }
    });
	
	//기간 달력 신규
	dhxCCalendarSearchLayoffDe = new dhtmlXDoubleCalendar("searchLayoffDe_cal");
	dhxCCalendarSearchLayoffDe.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchlayoffBeginDeMhswks007').val(dateFormat(dhxCCalendarSearchLayoffDe.leftCalendar.getDate()));
        	$('#searchlayoffEndDeMhswks007').val(dateFormat(dhxCCalendarSearchLayoffDe.rightCalendar.getDate()));
        	dhxCCalendarSearchLayoffDe.hide();
        }
    });
	//금일 날짜표시
	gf_SetDateIntervalRadio('searchlayoffBeginDeMhswks007', 'searchlayoffEndDeMhswks007', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarSearchLayoffDe.leftCalendar.setDate(gf_FormGetValue('searchFormMhswks007', 'searchlayoffBeginDeMhswks007', 'text'));
	dhxCCalendarSearchLayoffDe.rightCalendar.setDate(gf_FormGetValue('searchFormMhswks007', 'searchlayoffEndDeMhswks007', 'text'));	
	dhxCCalendarSearchLayoffDe.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarSearchLayoffDe.rightCalendar.loadUserLanguage("ko");
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

  var nDate = yyyy+mm+dd;
  return(nDate);
}
//입력 내용을 날짜 포멧으로
function dateChk(objDate){
	var date = objDate.val();
	date = date.replace(RegNotNum, '');

	if (date == "" || date == null || date.length < 5) {
	  objDate.val(date);
	  return;
	}

	var DataFormat;
	var RegPhonNum;

//	// 날짜 포맷(yyyy-mm-dd) 만들기 
//	if (date.length <= 6) {
//	  DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
//	  RegPhonNum = /([0-9]{4})([0-9]+)/;
//	} else if (date.length <= 8) {
//	  DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
//	  RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
//	}

	while (RegPhonNum.test(date)) {
	  date = date.replace(RegPhonNum, DataFormat);
	}

	objDate.val(date);

	// 모두 입력됐을 경우 날짜 유효성 확인
	if (date.length == 10) {
		var isVaild = true;
	
		if (isNaN(Date.parse(date))) {
			// 유효 날짜 확인 여부
			isVaild = false;
		} else {
			// 년, 월, 일 0 이상 여부 확인
			var date_sp = date.split("-");
			date_sp.forEach(function(sp) {
			  if (parseInt(sp) == 0) {
			    isVaild = false;
			  }
			});
		
			// 마지막 일 확인
			var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
			if (last.getDate() < parseInt(date_sp[2])) {
			 	isVaild = false;
			}
		}
		
		if (!isVaild) {
		  alert("잘못된 날짜입니다. \n다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
}

var fn_FileUploadBtnEvent = function(){
	
	/*
	첫번째 첨부파일 (갯수제한없음)
	- 파일업로드 버튼 이벤트 파라메터 ->
	
		이벤트 함수명, 
		삭제버튼클래스명, 
		업로드한 파일목록 화면, 
		업로드한 파일 db 입력용, 
		db저장 배열, 
		화면표시 배열, 
		파일업로드 갯수 (0 이면 무제한),
		허용가능한 파일 (all:모두, image:이미지만, excel:엑셀파일만, pdf:pdf파일만),
		콜백함수 (없을경우 디퐆트 콜백(gf_CallbackFileUpload))
		
	- 삭제버튼 이벤트 파라메터 ->  이벤트 함수명, 삭제할 배열의 인덱스, 삭제버튼클래스명, 업로드한 파일목록 화면, 업로드한 파일 db 입력용, db저장 배열, 화면표시 배열
	*/
	$('#btnFileUploadSaveFormMhswks007').unbind("click").bind("click",function(event){
		gf_FileUploadPopup(
				'fn_FileUploadBtnEvent', 
				'btnUploadedFiledelete1', 
				'fileList1', 
				'atchFileIds1', 
				 uploadedFileKeys1, 
				 uploadedFileInfo1, 
				 0,
				'all',
				'');
	});
	
	$('.btnUploadedFiledelete1').unbind("click").bind("click",function(event){			
		gf_DeleteAtachFile(
				'fn_FileUploadBtnEvent', 
				 $(this).attr('idx'), 
				'btnUploadedFiledelete1', 
				'fileList1', 
				'atchFileIds1', 
				 uploadedFileKeys1, 
				 uploadedFileInfo1);
	});
}