/**
 *    프로그램       : 휴직신청관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.05.21
 *    사용테이블      : MHS_LAYOFF
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrd006 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrd006 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrd006 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrd006 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrd006 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrd006 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrd006 = 0;  //그리드 삭제 수량 
var dhxGridMhshrd006;	//그리드 객체
var eventIdMhshrd006 = [];	//그리드 이벤트 객체
var dhxDataProcessorMhshrd006;	//DataProcessor 객체
var gBplcCode = '1000'

var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;
	
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var dhxSearchTime; // 검색 달력 설정
var dhxSaveTime; // 휴직기간 달력 설정
var uploadedFileKeysPrg3 = []; // db 저장용 (키만 파이프라인으로 구분)
var uploadedFileInfoPrg3 = []; // 화면에 저장된 정보 표시용 (삭제 기능)
var g_userId;
var g_userNm;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrd006();
    if(cf_SetComponentsMhshrd006()){
        cf_SetEventListenerMhshrd006();
        cf_InitFormMhshrd006();
        cf_SetBindingMhshrd006();
     }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrd006 = function() {
	//세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
	g_userId = userInfo.data.userId;
	g_userNm = userInfo.data.userNm;
	
    gf_SetMenuPath();
    $("#saveFormMhshrd006").validate({ errorElement: 'div', ignore: '' });
    fn_FileUploadPrgEvent();	 //파일첨부
    fn_TimeSet();

    //검색
    gf_ComboCode('divComboSearchLayoffSe', 'searchLayoffSe', 'searchLayoffSe', 'search', 'C190', '' , '', '', 'ordr', '');//휴직구분
    gf_ComboCode('divComboSearchElctsctSttusCode', 'searchElctsctSttusCode', 'searchElctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', '');//결재구분
};

var cf_SetComponentsMhshrd006 = function() {
    var dhxGridMhshrd006HeaderInfo = [];
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrd006" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('복사 체크', '100', 'center', 'str', 'ro', true, 'copyFlag', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('부서명', '100', 'center', 'str', 'ro', false, 'deptNm', '')); // 부서
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'empNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('휴직구분', '*', 'left', 'str', 'ro', false, 'layoffSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titLayoffSeCode') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('휴직시작일자', '100', 'center', 'str', 'ro', false, 'layoffBeginDe', '', '')); /* gf_LocaleTrans('default', 'titLayoffBeginDe') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('휴직종료일자', '100', 'center', 'str', 'ro', false, 'layoffEndDe', '', '')); /* gf_LocaleTrans('default', 'titLayoffEndDe') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('기간', '50', 'right', 'str', 'ro', false, 'layoffDaycnt', '', '')); /* gf_LocaleTrans('default', 'titLayoffDaycnt') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '60', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCodeNm') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('휴직번호', '100', 'left', 'str', 'ro', true, 'layoffNo', '', '')); /* gf_LocaleTrans('default', 'titLayoffNo') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '100', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('휴직내역', '100', 'left', 'str', 'ro', true, 'layoffDtls', '', '')); /* gf_LocaleTrans('default', 'titLayoffDtls') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('연장휴직번호', '100', 'left', 'str', 'ro', true, 'extnLayoffNo', '', '')); /* gf_LocaleTrans('default', 'titExtnLayoffNo') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('근속기간포함여부', '100', 'center', 'str', 'ro', true, 'cnwkpdInclsAt', '', '')); /* gf_LocaleTrans('default', 'titCnwkpdInclsAt') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '100', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('휴직구분코드', '100', 'center', 'str', 'ro', true, 'layoffSeCode', '', '')); /* gf_LocaleTrans('default', 'titLayoffSeCode') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('작성자', '60', 'center', 'str', 'ro', true, 'regNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('전자결재문서번호', '100', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('결재상태코드', '100', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '100', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('작성자', '100', 'center', 'str', 'ro', true, 'userNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhshrd006HeaderInfo.push(gf_MakeDhxGridHeader('작성자아이디', '100', 'center', 'str', 'ro', true, 'userId', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhshrd006 = gf_MakeDhxGrid('dataListMhshrd006', dhxGridMhshrd006HeaderInfo, true, false, false);
    dhxGridMhshrd006.enableAutoWidth(false);
    dhxGridMhshrd006.setEditable(true);

    dhxGridMhshrd006.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    //입력
    gf_ComboCode('layoffSeCodeSaveFormMhshrd006', 'layoffSeCode', 'layoffSeCode', 'add', 'C190', '' , 'width:200px', '', 'ordr', 'required');//휴직구분
    
    return true; 
};

var cf_SetEventListenerMhshrd006 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrd006 = gf_GridDetachEvent(dhxGridMhshrd006, eventIdMhshrd006);
    eventId = dhxGridMhshrd006.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrd006();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrd006.getColumnsNum();
            var rowNum = dhxGridMhshrd006.getRowsNum();
            var selectedId = dhxGridMhshrd006.getSelectedRowId();
            var ind        = dhxGridMhshrd006.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd006.getRowIndex(selectedId);
            var type       = dhxGridMhshrd006.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrd006.selectRow(0);
                    //fn_FindMhshrd006();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrd006.selectRow(rowIndex + 1);
                    fn_FindMhshrd006();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrd006.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd006.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrd006.getSelectedRowId();
            var ind        = dhxGridMhshrd006.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd006.getRowIndex(selectedId);
            var type       = dhxGridMhshrd006.getColType(ind);
            dhxGridMhshrd006.selectCell(rowIndex+1, ind);
            fn_FindMhshrd006();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd006.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrd006.getSelectedRowId();
            var ind        = dhxGridMhshrd006.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd006.getRowIndex(selectedId);
            var type       = dhxGridMhshrd006.getColType(ind);
            dhxGridMhshrd006.selectCell(rowIndex-1, ind);
            fn_FindMhshrd006();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd006.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrd006.push(eventId);
    eventId = dhxGridMhshrd006.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrd006SortGridList(ind, type, direction); 
    });
    eventIdMhshrd006.push(eventId);
    eventId = dhxGridMhshrd006.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrd006.push(eventId);
    eventId = dhxGridMhshrd006.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhshrd006();
    });
    eventIdMhshrd006.push(eventId);
    eventId = dhxGridMhshrd006.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhshrd006.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrd006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrd006()
    });
    $('#btnSaveMhshrd006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrd006();
    });
    $('#btnRemoveMhshrd006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrd006();
    });
    $('#btnExcelMhshrd006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrd006();
    });
    $('#btnSearchMhshrd006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrd006('');
    });
    $('#btnResetMhshrd006').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrd006();
    });
    $('#copyBtn').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        fn_SaveCopyMhshrd006();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrd006').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrd006, $('#checkAllMhshrd006').prop('checked'), 'chk');
    });
    $('#searchFormMhshrd006 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "searchDeptNoMhshrd006"){
        		return fn_SearchDeptCode();
        	} else if(this.id == "searchDeptNmMhshrd006"){
        		return fn_SearchDeptCode();
        	} else if(this.id == "searchEmpnoMhshrd006"){
        		fn_SearchEmpCode("1");
        	} else if(this.id == "searchEmpNmMhshrd006"){
        		fn_SearchEmpCode("1");
        		return false;
        	} else{
        		$('#btnSearchMhshrd006').click(); event.preventDefault(); return true;
        	}
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrd006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //검색창
	$('#searchFormMhshrd006 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhshrd006","searchEmpnoMhshrd006","searchEmpNmMhshrd006", '1000', "Y", "");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	$('#searchEmpnoMhshrd006').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhshrd006', 'searchEmpNm', '', 'text');
	    }
    });
	$('#searchEmpNmMhshrd006').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhshrd006', 'searchEmpno', '', 'text');
	    }
    });
    //부서 검색 이벤트
    $('#searchFormMhshrd006 #btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhshrd006","searchDeptNoMhshrd006","searchDeptNmMhshrd006", gBplcCode, "Y", "");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//부서 입력 후 Enter 이벤트
	$('#searchDeptNoMhshrd006').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhshrd006', 'searchDeptNm', '', 'text');
	    }
    });
	$('#searchDeptNmMhshrd006').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhshrd006', 'searchDeptNo', '', 'text');
	    }
    });
    //검색 달력
    $('#searchFormMhshrd006 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#searchFormMhshrd006 #searchDate').unbind('click').bind('click', function(event){
    	dhxSearchTime.show();
    });
    //입력폼 사원검색
	$('#saveFormMhshrd006 #btnEmpCodeSaveSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("saveFormMhshrd006","empnoSaveFormMhshrd006","empNmSaveFormMhshrd006", '1000', "Y", "fn_CallbackPopEmp1");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 입력 후 Enter 이벤트
	$('#empnoSaveFormMhshrd006').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('saveFormMhshrd006', 'empNm', '', 'text');
	    	gf_FormSetValue('saveFormMhshrd006', 'deptNm', '', 'text');
	    }
    });
	$('#empNmSaveFormMhshrd006').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('saveFormMhshrd006', 'empno', '', 'text');
	    	gf_FormSetValue('saveFormMhshrd006', 'deptNm', '', 'text');
	    }
    });
    //저장 달력
    $('#saveFormMhshrd006 .input_calen').unbind('keyup').bind('keyup', function(event){
    	dateChk($(this));
    });
    $('#saveFormMhshrd006 #saveDate').unbind('click').bind('click', function(event){
    	dhxSaveTime.show();
    });
    //첨부파일저장
    $('#btnFileUploadSaveFormMhshrd006').unbind('click').bind('click', function() {
        gf_FileUploadPopup(
                '',     /* eventFunction */
                '',     /* deleteBtnClassNm */
                'saveFormMhshrd006',     /* viewDivId */
                'ciImgFileSaveFormMhshrd006',     /* dataDivId */
                [],     /* keyArr */
                [],     /* infoArr */
                0,
                'all',
                'fn_CallbackFileUploadSaveFormMhshrd006');
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrd006 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "empnoSaveFormMhshrd006"){
        		fn_SearchEmpCode("2");
        	} else if(this.id == "empNmSaveFormMhshrd006"){
        		fn_SearchEmpCode("2");
        		return false;
        	} else{
        		return gf_saveForm_NextEle("saveFormMhshrd006",this);
        	}
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrd006 input[name="reqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'reqstDe', $(this).val());
    });
    $('#saveFormMhshrd006 input[name="regNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'regNm', $(this).val());
    });
    $('#saveFormMhshrd006 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'empno', $(this).val());
    });
    $('#saveFormMhshrd006 input[name="deptNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'deptNm', $(this).val());
    });
    $('#saveFormMhshrd006 input[name="empNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'empNm', $(this).val());
    });
    $('#saveFormMhshrd006 select[name="layoffSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffSeCode', $(this).val());
        if($(this).val() == '00' || $(this).val() == null || $(this).val() == ''){
        	gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffSeCodeNm', '');
        } else {
        	gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffSeCodeNm', $("#saveFormMhshrd006 select[name='layoffSeCode'] option:selected").text());
        }
    });
    $('#saveFormMhshrd006 input[name="layoffBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffBeginDe', $(this).val());
    });
    $('#saveFormMhshrd006 input[name="layoffEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffEndDe', $(this).val());
    });
    $('#saveFormMhshrd006 textarea[name="layoffDtls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffDtls', $(this).val());
    });
    $('#saveFormMhshrd006 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMhshrd006 input[name="layoffDaycnt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffDaycnt', $(this).val()+'일');
    });
    $('#saveFormMhshrd006 input[name="userId"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'userId', g_userId);
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhshrd006 = function() {
	$('#searchFormMhshrd006').resetForm();
	$('input[name=searchLayoffBeginDe]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchLayoffEndDe]').val( (new Date()).format('YYYY-MM-30') );
	dhxSearchTime.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrd006', 'searchLayoffBeginDe', 'text'));
	dhxSearchTime.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrd006', 'searchLayoffEndDe', 'text'));
	$('#searchEmpNmMhshrd006').focus();
};

var cf_SetBindingMhshrd006 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SessionCheck();
    fn_SearchMhshrd006('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrd006 = function(userId) {
	var jsonParameter = {
        	empno : gf_FormGetValue('searchFormMhshrd006', 'searchEmpno', 'text'),
        	empNm : gf_FormGetValue('searchFormMhshrd006', 'searchEmpNm', 'text'),
        	deptCode : gf_FormGetValue('searchFormMhshrd006', 'searchDeptNo', 'text'),
        	deptNm : gf_FormGetValue('searchFormMhshrd006', 'searchDeptNm', 'text'),
    		layoffBeginDe : gf_FormGetValue('searchFormMhshrd006', 'searchLayoffBeginDe', 'text').replaceAll('-',''),
        	layoffEndDe : gf_FormGetValue('searchFormMhshrd006', 'searchLayoffEndDe', 'text').replaceAll('-',''),
        	layoffSeCode : gf_FormGetValue('searchFormMhshrd006', 'searchLayoffSe', 'combo'),
        	elctsctSttusCode : gf_FormGetValue('searchFormMhshrd006', 'searchElctsctSttusCode', 'combo')
    };
    gf_Transaction(userId, 'mhshrd006/searchMhshrd006', jsonParameter, 'fn_CallbackSearchMhshrd006', false, 'GET');
};

var fn_CallbackSearchMhshrd006 = function(strSvcID, targetID, data) {
    //dhxGridMhshrd006.clearAll();
    dhxGridMhshrd006.destructor();
    if(cf_SetComponentsMhshrd006()){ 
        fn_DhxDataProcessorMhshrd006(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrd006');
            dhxGridMhshrd006.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrd006 == 0 && save_All_Sta_Mhshrd006 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrd006.selectRow(0); 
            } else if(save_Row_Sta_Mhshrd006 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrd006.selectRow(0);
            } else if(save_All_Sta_Mhshrd006 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrd006.selectRow(save_Row_Num_Mhshrd006); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrd006.selectRow(save_Row_Num_Mhshrd006);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrd006.findCell(save_Row_Ids_Mhshrd006, gf_GetDhxGridColumId(dhxGridMhshrd006,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrd006.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrd006.selectRow(0);
                //} 
            } 
 
            fn_FindMhshrd006();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrd006');
            fn_InitInputFormMhshrd006();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhshrd006").text(data.data.records.length);
        cf_SetEventListenerMhshrd006();
    } 
};
var fn_DhxDataProcessorMhshrd006 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrd006 = new dataProcessor(gv_ContextPath+'/mhshrd006/saveMhshrd006'); //lock feed url
    dhxDataProcessorMhshrd006.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrd006.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrd006.init(dhxGridMhshrd006); //link dataprocessor to the grid
    dhxDataProcessorMhshrd006.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrd006.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrd006.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrd006();
                    $("#checkAllMhshrd006").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 상세조회
 */
var fn_FindMhshrd006 = function() {
	var rId = dhxGridMhshrd006.getSelectedRowId();
    var status = dhxDataProcessorMhshrd006.getState(rId);
    fn_FormDisabled(false);
    
    gf_FormSetValue("saveFormMhshrd006", "layoffSeCode", gf_DhxGetValue(dhxGridMhshrd006, rId, 'layoffSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrd006", "layoffNo", gf_DhxGetValue(dhxGridMhshrd006, rId, 'layoffNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "empno", gf_DhxGetValue(dhxGridMhshrd006, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "reqstDe", gf_DhxGetValue(dhxGridMhshrd006, rId, 'reqstDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "layoffBeginDe", gf_DhxGetValue(dhxGridMhshrd006, rId, 'layoffBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "layoffEndDe", gf_DhxGetValue(dhxGridMhshrd006, rId, 'layoffEndDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "layoffDaycnt", gf_DhxGetValue(dhxGridMhshrd006, rId, 'layoffDaycnt',  'grid').replaceAll('일',''), '');
    gf_FormSetValue("saveFormMhshrd006", "layoffDtls", gf_DhxGetValue(dhxGridMhshrd006, rId, 'layoffDtls',  'grid'), 'textarea');
    gf_FormSetValue("saveFormMhshrd006", "extnLayoffNo", gf_DhxGetValue(dhxGridMhshrd006, rId, 'extnLayoffNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "saveLayoffSe", gf_DhxGetValue(dhxGridMhshrd006, rId, 'layoffSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrd006", "cnwkpdInclsAt", gf_DhxGetValue(dhxGridMhshrd006, rId, 'cnwkpdInclsAt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "elctsctDocNo", gf_DhxGetValue(dhxGridMhshrd006, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "elctsctSttusCodeNm", gf_DhxGetValue(dhxGridMhshrd006, rId, 'elctsctSttusCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "empNm", gf_DhxGetValue(dhxGridMhshrd006, rId, 'empNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrd006", "regNm", gf_DhxGetValue(dhxGridMhshrd006, rId, 'regNm',  'grid'), '');
    gf_FormSetValue('saveFormMhshrd006', 'atchmnfl', gf_DhxGetValue(dhxGridMhshrd006, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormMhshrd006', 'atchmnflList', gf_DhxGetValue(dhxGridMhshrd006, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    
    var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridMhshrd006, rId, 'atchmnflNo',  'grid') };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
	$('#saveFormMhshrd006 input[name="reqstDe"]').prop('disabled', true);
    $('#saveFormMhshrd006 input[name="elctsctSttusCodeNm"]').prop('disabled', true);
    
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기
	dhxSaveTime.leftCalendar.setDate(gf_FormGetValue('saveFormMhshrd006', 'layoffBeginDe', 'text'));
	dhxSaveTime.rightCalendar.setDate(gf_FormGetValue('saveFormMhshrd006', 'layoffEndDe', 'text'));
	
	var elctsctSttusCode = gf_DhxGetValue(dhxGridMhshrd006, rId, 'elctsctSttusCode',  'grid');
	var copyFlag = gf_DhxGetValue(dhxGridMhshrd006, rId, 'copyFlag',  'grid');
	
	if(elctsctSttusCode == '20' && copyFlag <= 0){
		$("#copyBtn").show();
	}
	else{
		$("#copyBtn").hide();
	}
	
	if(gf_IsNull(elctsctSttusCode)){
		$('#saveFormMhshrd006 *').prop('disabled', false);
		$('#saveFormMhshrd006 input[name="reqstDe"]').prop('disabled', true);
		$('#saveFormMhshrd006 input[name="regNm"]').prop('disabled', true);
	}
	else{
	 	$('#saveFormMhshrd006 *').prop('disabled', true);
	}
};
var fn_SaveCopyMhshrd006 = function(){
	var rId = dhxGridMhshrd006.getSelectedRowId();
	var paramElctsctSttusCode = gf_DhxGetValue(dhxGridMhshrd006, rId, 'elctsctSttusCode',  'grid');
	var paramElctsctSeSn = gf_DhxGetValue(dhxGridMhshrd006, rId, 'elctsctSeSn',  'grid');
	var paramLayoffNo = gf_DhxGetValue(dhxGridMhshrd006, rId, 'layoffNo',  'grid');
	
	if(paramElctsctSttusCode != "20"){
		gf_DivMsgAlert("반려 상태만 복사 가능합니다.");
	}
	else{
		var jsonParameterForCopy = {
				elctsctSttusCode : paramElctsctSttusCode,
				elctsctSeSn : paramElctsctSeSn,
				layoffNo : paramLayoffNo
		}
		var dataSource = gf_NoAsyncTransaction('mhshrd006/saveCopyMhshrd006' ,jsonParameterForCopy , 'GET');
//		console.log(dataSource);
        if(dataSource.data.code == '000'){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            fn_SearchMhshrd006('');
        }
        else{
            gf_DivMsgAlert("이미 등록된 데이터가 존재합니다.");
        }
	}

}
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrd006 = function() {
    $('#saveFormMhshrd006').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
	$('#saveFormMhshrd006 *').prop('disabled', status);
    $('#saveFormMhshrd006 input[name="reqstDe"]').prop('disabled', true);
    $('#saveFormMhshrd006 input[name="regNm"]').prop('disabled', true);
};
/**
 * 추가(신규) 
 */
var fn_AddMhshrd006 = function() {
    dhxGridMhshrd006.clearSelection();
    fn_InitInputFormMhshrd006();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //
    initValueArr.push(''); //
    initValueArr.push(new Date().format('YYYY-MM-DD')); //reqstDe : 신청일자
    initValueArr.push(gf_FormGetValue('searchFormMhshrd006', 'searchDeptNm', 'text')); //deptNm : 부서명
    initValueArr.push(gf_FormGetValue('searchFormMhshrd006', 'searchEmpNm', 'text')); //empNm : 성명
    initValueArr.push(''); //layoffSeCodeNm : 휴직구분 명
    initValueArr.push(new Date().format('YYYY-MM-DD')); //layoffBeginDe : 휴직시작일자
    initValueArr.push(new Date().format('YYYY-MM-DD')); //layoffEndDe : 휴직종료일자
    initValueArr.push(''); //layoffDaycnt : 기간
    initValueArr.push(''); //elctsctSttusCodeNm : 결재상태
    initValueArr.push(''); //layoffNo : 휴직번호
    initValueArr.push(''); //layoffDtls : 휴직내역
    initValueArr.push(''); //extnLayoffNo : 연장휴직번호
    initValueArr.push(''); //cnwkpdInclsAt : 근속기간포함여부
    initValueArr.push(''); //atchmnflNo : 첨부파일번호
    initValueArr.push(''); //layoffSeCode : 휴직구분
    initValueArr.push(''); //regNm : 작성자
    initValueArr.push(''); //userEmpno : 사용자사번
    initValueArr.push(''); //userEmpNm : 사용자이름
    initValueArr.push(''); //userDeptNm : 사용자부서
    initValueArr.push(''); //empno : 사원번호
    initValueArr.push(''); //userEmpNm : 사용자이름
    initValueArr.push(''); //userDeptNm : 사용자부서
    initValueArr.push(''); //empno : 사원번호
    dhxGridMhshrd006.addRow(dhxGridMhshrd006.uid(), initValueArr, 0);
    dhxGridMhshrd006.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrd006');
    $('#btnPopEmpSearchMhshrd006').show();
    fn_FormDisabled(false);
    
    gf_FormSetValue("saveFormMhshrd006", "reqstDe", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormMhshrd006", "regNm", g_userNm, '');
    gf_FormSetValue("saveFormMhshrd006", "userId", '', '');
    gf_FormSetValue("saveFormMhshrd006", "empno", '', '');
    gf_FormSetValue("saveFormMhshrd006", "deptNm", '', '');
    gf_FormSetValue("saveFormMhshrd006", "layoffBeginDe", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormMhshrd006", "layoffEndDe", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormMhshrd006", "layoffDaycnt", '1', '');
    dhxSaveTime.leftCalendar.setDate(gf_FormGetValue('saveFormMhshrd006', 'layoffBeginDe', 'text'));
	dhxSaveTime.rightCalendar.setDate(gf_FormGetValue('saveFormMhshrd006', 'layoffEndDe', 'text'));
	
	var jsonParameter = { atchFiles : 'AAAAAAAAA' };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrd006SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrd006, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrd006', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrd006', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrd006, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrd006.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrd006', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrd006', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd006, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrd006.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrd006', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrd006', 'sortColumId', '', 'text'); 
            dhxGridMhshrd006.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrd006.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrd006', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrd006', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd006, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrd006 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrd006 = 0; 
    save_Edt_Cnt_Mhshrd006 = 0; 
    save_Del_Cnt_Mhshrd006 = 0; 
    dhxGridMhshrd006.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrd006.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrd006.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrd006 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrd006 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrd006 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        var confirmMsg  = ""; 
        var confirmMsg1 = ""; 
        var confirmMsg2 = ""; 
        var confirmMsg3 = ""; 
        save_All_Sta_Mhshrd006 = 0; 
        if(save_Add_Cnt_Mhshrd006 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrd006 + "건";
            save_All_Sta_Mhshrd006 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrd006 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrd006 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrd006 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrd006 + "건"; 
            save_All_Sta_Mhshrd006 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrd006(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrd006(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrd006 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrd006_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrd006_Send = function() {
    if(fn_GridValidation(dhxGridMhshrd006, dhxDataProcessorMhshrd006)) {
        dhxDataProcessorMhshrd006.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrd006 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrd006, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrd006.forEachRow(function(rowId) {
            state = dhxDataProcessorMhshrd006.getState(rowId);
            var elctsctSttusCode = gf_DhxGetValue(dhxGridMhshrd006, rowId, 'elctsctSttusCode',  'grid');
            if(dhxGridMhshrd006.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrd006, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrd006.getRowIndex(rowId);
                    dhxGridMhshrd006.deleteRow(rowId);
                    dhxGridMhshrd006.selectRow(rowNum);
                    fn_FindMhshrd006();
                }
                else if(gf_IsNull(elctsctSttusCode)) dhxDataProcessorMhshrd006.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
var fn_SessionCheck = function(){
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
//    console.log(userInfo);
    if(userInfo.code == "000"){
    	sessionUserDeptCode = userInfo.data.userDeptCode;
    	sessionUserDeptNm = userInfo.data.userDeptNm;
    	sessionUserEmpno = userInfo.data.userEmpNo;
    	sessionUserEmpnm = userInfo.data.userNm;
    	
    	gf_FormSetValue("searchFormMhshrd006", "searchDeptNo", sessionUserDeptCode , '');
    	gf_FormSetValue("searchFormMhshrd006", "searchDeptNm", sessionUserDeptNm , '');
    	gf_FormSetValue("searchFormMhshrd006", "searchEmpno", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormMhshrd006", "searchEmpNm", sessionUserEmpnm , '');
    	
    }	
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrd006 = function () {
    var titMhshrd006 = '휴직신청관리'; /* gf_LocaleTrans('default', 'titMhshrd006') */
    var jsonParameter = {
        layoffNo : gf_FormGetValue('searchFormMhshrd006', 'layoffNo', 'text')
    };
    var header = [[
        '휴직번호' /* gf_LocaleTrans('default', 'titLayoffNo') */,
        '신청일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '부서명' /* gf_LocaleTrans('default', 'titDeptKorNm') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '사원명' /* gf_LocaleTrans('default', 'titEmpNm') */,
        '휴직구분코드' /* gf_LocaleTrans('default', 'titLayoffSeCode') */,
        '휴직구분' /* gf_LocaleTrans('default', 'titLayoffSeCodeNm') */,
        '휴직시작일자' /* gf_LocaleTrans('default', 'titLayoffBeginDe') */,
        '휴직종료일자' /* gf_LocaleTrans('default', 'titLayoffEndDe') */,
        '휴직일수' /* gf_LocaleTrans('default', 'titLayoffDaycnt') */,
        '휴직내역' /* gf_LocaleTrans('default', 'titLayoffDtls') */,
        '첨부파일번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '연장휴직번호' /* gf_LocaleTrans('default', 'titExtnLayoffNo') */,
        '근속기간포함여부' /* gf_LocaleTrans('default', 'titCnwkpdInclsAt') */,
        '전자결재문서번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재상태코드' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    ]];
    var dataId = [[ 'layoffNo', 'reqstDe', 'deptNm', 'empno', 'empNm', 'layoffSeCode', 'layoffSeCodeNm', 'layoffBeginDe', 'layoffEndDe', 'layoffDaycnt', 'layoffDtls',
    				'atchmnflNo','extnLayoffNo', 'cnwkpdInclsAt', 'elctsctDocNo', 'elctsctSttusCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrd006 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrd006;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrd006/excelMhshrd006', jsonParameter);
};
/**
 * 파일 업로드
 */
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
		gf_FormSetValue('saveFormMhshrd006', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormMhshrd006', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
        callbacks.fire();
	}
};

//--부서 입력 후 Enter 이벤트
function fn_SearchDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMhshrd006', 'searchDeptNo', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMhshrd006', 'searchDeptNm', 'text');
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
   		gf_FormSetValue('searchFormMhshrd006', 'searchDeptNo', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhshrd006', 'searchDeptNm', data.deptKorNm, 'text');

    } 
    else {
    	//Popup 호출
		gf_DeptPopup("searchFormMhshrd006","searchDeptNoMhshrd006","searchDeptNmMhshrd006", gBplcCode, "Y", "");
    }
}

/**
 * 달력
 */
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="searchDate_cal" || e.target.id =="layoffBeginDeSearchFormMhshrd006" || e.target.id =="layoffEndDeSearchFormMhshrd006") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxSearchTime.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="saveDate_cal" || e.target.id =="layoffBeginDeSaveFormMhshrd006" || e.target.id =="layoffEndDeSaveFormMhshrd006") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxSaveTime.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
function fn_TimeSet(){
	//달력 생성
	dhxSearchTime = new dhtmlXDoubleCalendar("searchDate_cal");
	dhxSearchTime.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#layoffBeginDeSearchFormMhshrd006').val(dateFormat(dhxSearchTime.leftCalendar.getDate()));
        	$('#layoffEndDeSearchFormMhshrd006').val(dateFormat(dhxSearchTime.rightCalendar.getDate()));
        	dhxSearchTime.hide();
        }
    });
	$('input[name=searchLayoffBeginDe]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchLayoffEndDe]').val( (new Date()).format('YYYY-MM-30') );
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxSearchTime.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrd006', 'searchLayoffBeginDe', 'text'));
	dhxSearchTime.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrd006', 'searchLayoffEndDe', 'text'));	
	dhxSearchTime.leftCalendar.loadUserLanguage("ko");
	dhxSearchTime.rightCalendar.loadUserLanguage("ko");
	
	
	//달력 생성
	dhxSaveTime = new dhtmlXDoubleCalendar("saveDate_cal");
	dhxSaveTime.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#layoffBeginDeSaveFormMhshrd006').val(dateFormat(dhxSaveTime.leftCalendar.getDate()));
        	$('#layoffEndDeSaveFormMhshrd006').val(dateFormat(dhxSaveTime.rightCalendar.getDate()));
        	
        	gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffBeginDe', gf_FormGetValue('saveFormMhshrd006', 'layoffBeginDe', 'text'));
            gf_DhxGridCellMapping(dhxGridMhshrd006, dhxDataProcessorMhshrd006, 'layoffEndDe', gf_FormGetValue('saveFormMhshrd006', 'layoffEndDe', 'text'));
//            var deCnt = gf_FormGetValue('saveFormMhshrd006', 'layoffEndDe', 'text') - gf_FormGetValue('saveFormMhshrd006', 'layoffBeginDe', 'text').replaceAll('-','') + 1;
//            gf_FormSetValue('saveFormMhshrd006', 'layoffDaycnt', deCnt, 'text');  
            deCount();
            
        	dhxSaveTime.hide();
        }
    });
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxSearchTime.leftCalendar.setDate(gf_FormGetValue('saveFormMhshrd006', 'layoffBeginDe', 'text'));
	dhxSearchTime.rightCalendar.setDate(gf_FormGetValue('saveFormMhshrd006', 'layoffEndDe', 'text'));	
	dhxSaveTime.leftCalendar.loadUserLanguage("ko");
	dhxSaveTime.rightCalendar.loadUserLanguage("ko");
}
function deCount(){
	    var sdd = document.getElementById("layoffBeginDeSaveFormMhshrd006").value;
	    var edd = document.getElementById("layoffEndDeSaveFormMhshrd006").value;
	    var ar1 = sdd.split('-');
	    var ar2 = edd.split('-');
	    var da1 = new Date(ar1[0], ar1[1], ar1[2]);
	    var da2 = new Date(ar2[0], ar2[1], ar2[2]);
	    var dif = da2 - da1;
	    var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
	    var cMonth = cDay * 30;// 월 만듬
	    var cYear = cMonth * 12; // 년 만듬
	 if(sdd && edd){
//	    document.getElementById('layoffDaycntSaveFormMhshrd006').value = parseInt(dif/cDay)
	    gf_FormSetValue('saveFormMhshrd006', 'layoffDaycnt', parseInt(dif/cDay)+1, 'text');  
	 };
	 
	 
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

  var nDate = yyyy+'-'+mm+'-'+dd;
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

	// 날짜 포맷(yyyy-mm-dd) 만들기 
	if (date.length <= 6) {
	  DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]+)/;
	} else if (date.length <= 8) {
	  DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
	}

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

//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMhshrd006', 'searchEmpno', 'text');
		korNm = gf_FormGetValue('searchFormMhshrd006', 'searchEmpNm', 'text');
	}
	else {
		empno = gf_FormGetValue('saveFormMhshrd006', 'empno', 'text');
		korNm = gf_FormGetValue('saveFormMhshrd006', 'empNm', 'text');
	}
	
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : '1000'
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
	 		gf_FormSetValue('searchFormMhshrd006', 'searchEmpno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhshrd006', 'searchEmpNm', data.korNm, 'text');
	  	}
	  	else {
	 		gf_FormSetValue('saveFormMhshrd006', 'empno', data.empno, 'text');
	 		gf_FormSetValue('saveFormMhshrd006', 'empNm', data.korNm, 'text');
	 		gf_FormSetValue('saveFormMhshrd006', 'deptNm', data.deptCodeNm, 'text'); 
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
			gf_EmpPopup("searchFormMhshrd006","searchEmpnoMhshrd006","searchEmpNmMhshrd006", '1000', "Y", "");
	  	} else {
			gf_EmpPopup("saveFormMhshrd006","empnoSaveFormMhshrd006","empNmSaveFormMhshrd006", '1000', "Y", "fn_CallbackPopEmp1");
	  	}
  	}
}
function fn_CallbackPopEmp1(data){
//	console.log(data.empno + " : " + data.korNm);
	gf_FormSetValue('saveFormMhshrd006', 'deptNm', data.deptCodeNm, 'text'); 
//	gf_FormSetValue('saveFormMhshrd006', 'deptNm', data.deptCodeNm, 'text');  
}
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormMhshrd006 #layoffNoSaveFormMhshrd006').parent().append(
    '<div class="error" id="layoffNoSaveFormMhshrd006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrd006 = function(layoffNo){
    if(!gf_IsNull(layoffNo)) {
        var jsonParameter = {
            layoffNo : layoffNo
        };
        var dataSource = gf_NoAsyncTransaction('mhshrd006/findMhshrd006', jsonParameter, 'GET');
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
    var state = dhxDataProcessorMhshrd006.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshrd006').validate().form()){
                if(state == 'inserted') {
                    var layoffNo = gf_FormGetValue('saveFormMhshrd006', 'layoffNo', 'text');
                    if(fn_CheckDupMhshrd006(layoffNo)) return true;
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
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrd006 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshrd006 == 'deleted') {
        save_Row_Num_Mhshrd006 = 0;
        save_Row_Ids_Mhshrd006 = "";
    } else if(save_Row_Sta_Mhshrd006 == 'inserted') {
        save_Row_Num_Mhshrd006 = rowNum;
        save_Row_Ids_Mhshrd006 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrd006 = rowNum;
        save_Row_Ids_Mhshrd006 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'reqstDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstDe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'layoffSeCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffSeCodeNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'layoffBeginDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffBeginDe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'layoffEndDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffEndDe');
                    valid = false;
                }
                if(valid && (gf_DhxGetValue(dhxGridObjet, rowId, 'layoffEndDe', 'grid').replaceAll('-','') < gf_DhxGetValue(dhxGridObjet, rowId, 'layoffBeginDe', 'grid').replaceAll('-',''))){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffEndDe');
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffBeginDe');
                    gf_DivMsgAlert("종료일자를 확인해주세요.");
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'regNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'regNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'deptNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptNm');
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
                        if(!fn_CheckDupMhshrd006( checkLayoffNo )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffNo');
                            valid = false;
                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
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
        dhxGridMhshrd006.selectRowById(validFalseFistRowId);
        fn_FindMhshrd006();
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

var fn_DivMsgConfirm2 = function(message, callback){
	
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}
	
	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button class='btn_confirm' id='btnYesConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackTrue== 'string' ? callBackTrue : '' ) +"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
		   + "<button class='btn_confirm' id='btnNoConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackFalse== 'string' ? callBackFalse : '' ) +"'><span class='glyphicon glyphicon-ban-circle'></span>&nbsp;취소</button></p>"
		   + "</div>"
		   + "</div>";
	$("#message").html(str);
	$("#content_notice .btn_cancel").focus();
	
	if(typeof callback == 'function') {
		$("#btnYesConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			gf_DivMsgAlertClose();
			callback(true);
	    });

		$("#btnNoConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			gf_DivMsgAlertClose();
			callback(false);
	    });
	}
};