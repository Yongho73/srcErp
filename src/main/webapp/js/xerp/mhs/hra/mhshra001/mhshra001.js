/**
 *    프로그램       : 인사발령 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.16
 *    사용테이블      : MHS_GNFD
 * sourceGen version : 2020.06.11.02 (2020.06.16)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshra001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshra001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshra001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshra001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshra001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshra001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshra001 = 0;  //그리드 삭제 수량 
var gBplcCode = "1000";
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var searchCalendar; // 기간 달력(From ~ To)
var comboList;
var pop = false;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshra001();
    cf_SetComponentsMhshra001();
    cf_SetEventListenerMhshra001();
    cf_InitFormMhshra001();
    cf_SetBindingMhshra001();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshra001 = function() {
	fn_GnfdCode();
    Calendar();
    Claendar2();
    fn_FileUploadBtnEvent();
    gf_SetMenuPath();
    $("#saveFormMhshra001").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMhshra001;
var cf_SetComponentsMhshra001 = function() {
	var dhxGridMhshra001HeaderInfo = [];
	dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
	dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshra001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
	dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('발령구분', '*', 'center', 'str', 'ro', false, 'gnfdCodeNm', '', '')); /* gf_LocaleTrans('default', 'titGnfdCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('사원이름', '80', 'center', 'str', 'ro', false, 'empNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('발령일', '100', 'center', 'str', 'ro', false, 'gnfdDe', '', '')); /* gf_LocaleTrans('default', 'titGnfdDe') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('발령시작일', '100', 'center', 'str', 'ro', false, 'gnfdBeginDe', '', '')); /* gf_LocaleTrans('default', 'titGnfdBeginDe') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('발령종료일', '100', 'center', 'str', 'ro', false, 'gnfdEndDe', '', '')); /* gf_LocaleTrans('default', 'titGnfdEndDe') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '60', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '60', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titSanctnSttusCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('발령코드', '100', 'center', 'str', 'ro', true, 'gnfdCode', '', '')); /* gf_LocaleTrans('default', 'titGnfdCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '100', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재문서번호', '100', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '100', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('발령번호', '100', 'center', 'str', 'ro', true, 'gnfdNo', '', '')); /* gf_LocaleTrans('default', 'titGnfdNo') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경전직급코드', '100', 'center', 'str', 'ro', true, 'bfchgClsfCode', '', '')); /* gf_LocaleTrans('default', 'titBfchgClsfCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경전호봉코드', '100', 'center', 'str', 'ro', true, 'bfchgSrclsCode', '', '')); /* gf_LocaleTrans('default', 'titBfchgSrclsCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경전직위코드', '100', 'center', 'str', 'ro', true, 'bfchgOfcpsCode', '', '')); /* gf_LocaleTrans('default', 'titBfchgOfcpsCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경전직종코드', '100', 'center', 'str', 'ro', true, 'bfchgJssfcCode', '', '')); /* gf_LocaleTrans('default', 'titBfchgJssfcCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경전직책코드', '100', 'center', 'str', 'ro', true, 'bfchgRspofcCode', '', '')); /* gf_LocaleTrans('default', 'titBfchgRspofcCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경전부서코드', '100', 'center', 'str', 'ro', true, 'bfchgDeptCode', '', '')); /* gf_LocaleTrans('default', 'titBfchgDeptCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경후 직급코드', '100', 'center', 'str', 'ro', true, 'afchgClsfCode', '', '')); /* gf_LocaleTrans('default', 'titAfchgClsfCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경후호봉코드', '100', 'center', 'str', 'ro', true, 'afchgSrclsCode', '', '')); /* gf_LocaleTrans('default', 'titAfchgSrclsCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경후직위코드', '100', 'center', 'str', 'ro', true, 'afchgOfcpsCode', '', '')); /* gf_LocaleTrans('default', 'titAfchgOfcpsCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경후직종코드', '100', 'center', 'str', 'ro', true, 'afchgJssfcCode', '', '')); /* gf_LocaleTrans('default', 'titAfchgJssfcCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경후 직책코드', '100', 'center', 'str', 'ro', true, 'afchgRspofcCode', '', '')); /* gf_LocaleTrans('default', 'titAfchgRspofcCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경전부서이름', '100', 'center', 'str', 'ro', true, 'bfchgDeptCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBfchgDeptCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경후 부서코드', '100', 'center', 'str', 'ro', true, 'afchgDeptCode', '', '')); /* gf_LocaleTrans('default', 'titAfchgDeptCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('변경후 부서이름', '100', 'center', 'str', 'ro', true, 'afchgDeptCodeNm', '', '')); /* gf_LocaleTrans('default', 'titAfchgDeptCode') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'center', 'str', 'ro', true, 'gnfdDtls', '', '')); /* gf_LocaleTrans('default', 'titGnfdDtls') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('겸임여부', '100', 'center', 'na', 'ch', true, 'hdadptAt', '', '')); /* gf_LocaleTrans('default', 'titHdadptAt') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('처리여부', '100', 'center', 'str', 'ro', true, 'processAt', '', '')); /* gf_LocaleTrans('default', 'titProcessAt') */
    dhxGridMhshra001HeaderInfo.push(gf_MakeDhxGridHeader('겸임부서코드', '100', 'center', 'str', 'ro', true, 'hdadptDeptCode', '', '')); /* gf_LocaleTrans('default', 'titHdadptDeptCode') */
    dhxGridMhshra001 = gf_MakeDhxGrid('dataListMhshra001', dhxGridMhshra001HeaderInfo, true, false, false);
    dhxGridMhshra001.enableAutoWidth(false);
    dhxGridMhshra001.setEditable(true);

    dhxGridMhshra001.setColumnMinWidth(60,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
  
    //검색
    gf_MakeComboBasic('divSearchAfchgClsfCode', 'searchAfchgClsfCode', 'search', '', 'mhshrm004/searchMhshrb004ClsfCodeCombo', '', 'clsfCode', 'clsfNm', '');	//직급
    gf_ComboCode('divSearchElctsctSttusCodeNm', 'searchElctsctSttusCodeNm', 'searchElctsctSttusCodeNm', 'search', 'EA004', '' , '', '', 'ordr', '');//결재
    gf_MakeComboBasic('divSearchGnfdCode', 'searchGnfdCode', 'search', '', 'mhshrm011/searchMhshrm011CodeCombo', '', 'gnfdCode', 'gnfdCodeNm', '');	//발령
    //입력폼
    gf_MakeComboBasic('divSaveGnfdCode', 'saveGnfdCode', 'sel', 'width:92px', 'mhshrm011/searchMhshrm011CodeCombo', '', 'gnfdCode', 'gnfdCodeNm', '');	//발령구분
    gf_MakeComboBasic('divBSaveAfchgClsfCode', 'saveBfchgClsfCode', 'sel', 'width:92px', 'mhshrm004/searchMhshrb004ClsfCodeCombo', '', 'clsfCode', 'clsfNm', '');	//전직급
    gf_MakeComboBasic('divASaveAfchgClsfCode', 'saveAfchgClsfCode', 'sel', 'width:92px', 'mhshrm004/searchMhshrb004ClsfCodeCombo', '', 'clsfCode', 'clsfNm', '');	//후직급
    gf_ComboCode('divBfchgSrclsCode', 'saveBfchgSrclsCode', 'saveBfchgSrclsCode', 'add', 'C285', '' , 'width:92px', '', 'ordr', '');	//전호봉
    gf_ComboCode('divAfchgSrclsCode', 'saveAfchgSrclsCode', 'saveAfchgSrclsCode', 'add', 'C285', '' , 'width:92px', '', 'ordr', '');	//후호봉
    gf_MakeComboBasic('divBfchgOfcpsCode', 'saveBfchgOfcpsCod', 'sel', 'width:92px', 'mhshrm015/searchMhshrm015OfcpsCodeCombo', '', 'ofcpsCode', 'ofcpsNm', '');	//전직위
    gf_MakeComboBasic('divAfchgOfcpsCode', 'saveAfchgOfcpsCod', 'sel', 'width:92px', 'mhshrm015/searchMhshrm015OfcpsCodeCombo', '', 'ofcpsCode', 'ofcpsNm', '');	//후직위
    gf_ComboCode('divBfchgJssfcCode', 'saveBfchgJssfcCode', 'saveBfchgJssfcCode', 'add', 'C148', '' , 'width:92px', '', 'ordr', '');	//전직종
    gf_ComboCode('divAfchgJssfcCode', 'saveAfchgJssfcCode', 'saveAfchgJssfcCode', 'add', 'C148', '' , 'width:92px', '', 'ordr', '');	//후직종
    gf_MakeComboBasic('divBfchgRspofcCode', 'saveBfchgRspofcCode', 'sel', 'width:92px', 'mhshrm014/selectMhshrm014RspofcCodeCombo', '', 'rspofcCode', 'rspofcNm', '');	//전직책
    gf_MakeComboBasic('divAfchgRspofcCode', 'saveAfchgRspofcCode', 'sel', 'width:92px', 'mhshrm014/selectMhshrm014RspofcCodeCombo', '', 'rspofcCode', 'rspofcNm', '');	//후직책
    gf_ComboCode('divSaveElctsctSttusCodeNm', 'saveElctsctSttusCodeNm', 'saveElctsctSttusCodeNm', 'add', 'EA004', '' , '', '', 'ordr', '');//결재
};

var eventIdMhshra001 = [];
var cf_SetEventListenerMhshra001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshra001 = gf_GridDetachEvent(dhxGridMhshra001, eventIdMhshra001);
    eventId = dhxGridMhshra001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshra001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshra001.getColumnsNum();
            var rowNum = dhxGridMhshra001.getRowsNum();
            var selectedId = dhxGridMhshra001.getSelectedRowId();
            var ind        = dhxGridMhshra001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshra001.getRowIndex(selectedId);
            var type       = dhxGridMhshra001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshra001.selectRow(0);
                    //fn_FindMhshra001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshra001.selectRow(rowIndex + 1);
                    fn_FindMhshra001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshra001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshra001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshra001.getSelectedRowId();
            var ind        = dhxGridMhshra001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshra001.getRowIndex(selectedId);
            var type       = dhxGridMhshra001.getColType(ind);
            dhxGridMhshra001.selectCell(rowIndex+1, ind);
            fn_FindMhshra001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshra001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshra001.getSelectedRowId();
            var ind        = dhxGridMhshra001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshra001.getRowIndex(selectedId);
            var type       = dhxGridMhshra001.getColType(ind);
            dhxGridMhshra001.selectCell(rowIndex-1, ind);
            fn_FindMhshra001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshra001.editCell();
            }
        }
        else return true;
    });
    eventIdMhshra001.push(eventId);
    eventId = dhxGridMhshra001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshra001SortGridList(ind, type, direction); 
    });
    eventIdMhshra001.push(eventId);
    eventId = dhxGridMhshra001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshra001.push(eventId);
    eventId = dhxGridMhshra001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhshra001();
    });
    eventIdMhshra001.push(eventId);
    eventId = dhxGridMhshra001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhshra001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshra001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshra001()
    });
    $('#btnSaveMhshra001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshra001();
    });
    $('#btnRemoveMhshra001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshra001();
    });
    $('#btnExcelMhshra001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshra001();
    });
    $('#btnSearchMhshra001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshra001('');
    });
    $('#btnResetMhshra001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshra001();
    });
    $('#btnPopupMhshra001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        fn_AdvanEmp("saveFormMhshra001","","", "", gBplcCode, "N", "fn_CallbackPopup");
    });
    $('#btnExcelDownload').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelSampleMhshra001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshra001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshra001, $('#checkAllMhshra001').prop('checked'), 'chk');
    });
    $('#searchFormMhshra001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshra001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshra001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //사원검색
    $('#searchFormMhshra001 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhshra001","searchEmpnoSearchFormMhshra001","searchEmpNmSearchFormMhshra001", gBplcCode, "Y", "fn_CallbackPopEmp1");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//사원 입력 후 Enter 이벤트
	$('#searchEmpnoSearchFormMhshra001').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#searchEmpNmSearchFormMhshra001').focus();
	    }
    });
	$('#searchEmpNmSearchFormMhshra001').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode("1");
	    }
    });
	//사원 입력
	$('#saveFormMhshra001 #saveBtnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("saveFormMhshra001","empnoSaveFormMhshra001","empNmSaveFormMhshra001", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	$('#empnoSaveFormMhshra001').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#empNmSaveFormMhshra001').focus();
	    }
    });
	//부서 입력
	$('#saveFormMhshra001 #btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("saveFormMhshra001","deptCode","deptCodeNm", gBplcCode, "Y", "fn_CallbackPopDept");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			$('#deptCodeNm').focus();
	    }
    });
	//달력
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#searchFormMhshra001 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
	//기간달력 이벤트 추가
    $('#searchFormMhshra001 #searchGnfdBeginDeSearchFormMhshra001').unbind('click').bind('click', function(event){
    	searchCalendar.show();
    });
    $('#searchFormMhshra001 #searchGnfEndDeSearchFormMhshra001').unbind('click').bind('click', function(event){
    	searchCalendar.show();
    });
    //단일달력 이벤트
    $('#saveFormMhshra001 .input_calen').unbind('keyup').bind('keyup', function(event){
    	dateChk($(this));
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshra001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) {
        	if(this.id == "empNmSaveFormMhshra001"){
        		return fn_SearchEmpCode("2");
            } else if (this.id == "deptCodeNm"){
            	return fn_SearchDeptCode();
            } else {
        	return gf_saveForm_NextEle("saveFormMhshra001",this); 
            }}
        else return true; 
    }); 
    $('#saveFormMhshra001 input[name="gnfdNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdNo', $(this).val());
    });
    $('#saveFormMhshra001 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'empno', $(this).val());
    });
    $('#saveFormMhshra001 input[name="empNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'empNm', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveGnfdCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if(gf_FormGetValue('saveFormMhshra001', 'saveGnfdCode', 'combo')==0){
    		gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdCodeNm', '');
        	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdCode', $(this).val());
    	} else {
    		gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdCodeNm', $("#saveFormMhshra001 select[name='saveGnfdCode'] option:selected").text());
    		gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdCode', $(this).val());
    	}
		fn_gnfdCodeSelect($(this).val());
    });
    $('#saveFormMhshra001 select[name="saveBfchgClsfCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'bfchgClsfCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveAfchgClsfCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'afchgClsfCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveBfchgSrclsCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'bfchgSrclsCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveAfchgSrclsCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'afchgSrclsCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveBfchgOfcpsCod"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'bfchgOfcpsCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveAfchgOfcpsCod"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'afchgOfcpsCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveBfchgJssfcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'bfchgJssfcCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveAfchgJssfcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'afchgJssfcCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveBfchgRspofcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'bfchgRspofcCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveAfchgRspofcCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'afchgRspofcCode', $(this).val());
    });
    $('#saveFormMhshra001 select[name="saveBfchgDeptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'bfchgDeptCode', $(this).val());
    });
    $('#saveFormMhshra001 input[name="deptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'afchgDeptCode', $(this).val());
    });
    $('#saveFormMhshra001 input[name="deptCodeNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'afchgDeptCodeNm', $(this).val());
    });
    $('#saveFormMhshra001 textarea[name="gnfdDtls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdDtls', $(this).val());
    });
    $('#saveFormMhshra001 #hdadptAtSaveFormMhshra001').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var hdadptAt = gf_IsNull(gf_FormGetValue('saveFormMhshra001', 'hdadptAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'hdadptAt', hdadptAt);
    });
    
    $('#saveFormMhshra001 input[name="gnfdDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdDe', $(this).val());
    });
    $('#saveFormMhshra001 input[name="gnfdBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdBeginDe', $(this).val());
    });
    $('#saveFormMhshra001 input[name="gnfdEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'gnfdEndDe', $(this).val());
    });
    $('#saveFormMhshra001 input[name="processAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'processAt', $(this).val());
    });
    $('#saveFormMhshra001 input[name="bfchgClsfCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'bfchgClsfCode', $(this).val());
    });
    $('#saveFormMhshra001 input[name="afchgClsfCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'afchgClsfCode', $(this).val());
    });
    $('#saveFormMhshra001 input[name="hdadptDeptCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'hdadptDeptCode', $(this).val());
    });
    $('#saveFormMhshra001 input[name="elctsctSttusCodeNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshra001, dhxDataProcessorMhshra001, 'elctsctSttusCodeNm', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormMhshra001 = function() {
    $('#searchFormMhshra001').resetForm();

    //금일 날짜표시
    $('input[name=searchGnfdBeginDe]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchGnfEndDe]').val( (new Date()).format('YYYY-MM-30') );
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormMhshra001', 'searchGnfdBeginDe', 'text'));
	searchCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormMhshra001', 'searchGnfEndDe', 'text'));	
	searchCalendar.leftCalendar.loadUserLanguage("ko");
	searchCalendar.rightCalendar.loadUserLanguage("ko");
};

var cf_SetBindingMhshra001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhshra001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var fn_GnfdCode = function(){
	var jsonParameter = {}
	comboList = gf_NoAsyncTransaction('mhshra001/gnfdCodeData', jsonParameter, 'GET');
}
/**
 * 조회
 */
var fn_SearchMhshra001 = function(userId) {
    var jsonParameter = {
    		empno : gf_FormGetValue('searchFormMhshra001', 'searchEmpno', 'text'),
        	empNm : gf_FormGetValue('searchFormMhshra001', 'searchEmpNm', 'text'),
        	clsfCode : gf_FormGetValue('searchFormMhshra001', 'searchAfchgClsfCode', 'combo'),
        	gnfdCode : gf_FormGetValue('searchFormMhshra001', 'searchGnfdCode', 'combo'),
        	gnfdBeginDe : gf_FormGetValue('searchFormMhshra001', 'searchGnfdBeginDe', 'text'),
        	gnfEndDe : gf_FormGetValue('searchFormMhshra001', 'searchGnfEndDe', 'text')
    };
    gf_Transaction(userId, 'mhshra001/searchMhshra001', jsonParameter, 'fn_CallbackSearchMhshra001', false, 'GET');
};

var dhxDataProcessorMhshra001;
var fn_CallbackSearchMhshra001 = function(strSvcID, targetID, data) {
    dhxGridMhshra001.clearAll();
    fn_DhxDataProcessorMhshra001(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMhshra001');
        dhxGridMhshra001.parse(data.data.records, 'js');
 
        if(save_Row_Num_Mhshra001 == 0 && save_All_Sta_Mhshra001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMhshra001.selectRow(0); 
        } else if(save_Row_Sta_Mhshra001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMhshra001.selectRow(0);
        } else if(save_All_Sta_Mhshra001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMhshra001.selectRow(save_Row_Num_Mhshra001); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMhshra001.selectRow(save_Row_Num_Mhshra001);   //개발자 수정 필요  
            //var findCell = dhxGridMhshra001.findCell(save_Row_Ids_Mhshra001, gf_GetDhxGridColumId(dhxGridMhshra001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMhshra001.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMhshra001.selectRow(0);
            //} 
        } 
 
        fn_FindMhshra001();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMhshra001');
        fn_InitInputFormMhshra001();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMhshra001").text(data.data.records.length);
    cf_SetEventListenerMhshra001();
};
var fn_DhxDataProcessorMhshra001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshra001 = new dataProcessor(gv_ContextPath+'/mhshra001/saveMhshra001'); //lock feed url
    dhxDataProcessorMhshra001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshra001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshra001.init(dhxGridMhshra001); //link dataprocessor to the grid
    dhxDataProcessorMhshra001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshra001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshra001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshra001();
                    $("#checkAllMhshra001").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhshra001 = function() {
    var rId = dhxGridMhshra001.getSelectedRowId();
    var status = dhxDataProcessorMhshra001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhshra001", "gnfdNo", gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshra001", "empno", gf_DhxGetValue(dhxGridMhshra001, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhshra001", "empNm", gf_DhxGetValue(dhxGridMhshra001, rId, 'empNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshra001", "saveGnfdCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshra001", "gnfdDe", gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshra001", "gnfdBeginDe", gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshra001", "gnfdEndDe", gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdEndDe',  'grid'), '');

    gf_FormSetValue("saveFormMhshra001", "saveBfchgClsfCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgClsfCode',  'grid'), 'combo');	//전직급
    gf_FormSetValue("saveFormMhshra001", "saveBfchgSrclsCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgSrclsCode',  'grid'), 'combo');	//전호봉
    gf_FormSetValue("saveFormMhshra001", "saveBfchgOfcpsCod", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgOfcpsCode',  'grid'), 'combo');	//전직위
    gf_FormSetValue("saveFormMhshra001", "saveBfchgJssfcCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgJssfcCode',  'grid'), 'combo');	//전직종
    gf_FormSetValue("saveFormMhshra001", "saveBfchgRspofcCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgRspofcCode',  'grid'), 'combo');	//전직책

    gf_FormSetValue("saveFormMhshra001", "bfchgDeptCodeNm", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgDeptCodeNm',  'grid'), 'text');	//전부서

    gf_FormSetValue("saveFormMhshra001", "saveAfchgClsfCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'afchgClsfCode',  'grid'), 'combo');	//후직급
    gf_FormSetValue("saveFormMhshra001", "saveAfchgSrclsCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'afchgSrclsCode',  'grid'), 'combo');	//후호봉
    gf_FormSetValue("saveFormMhshra001", "saveAfchgOfcpsCod", gf_DhxGetValue(dhxGridMhshra001, rId, 'afchgOfcpsCode',  'grid'), 'combo');	//후직위
    gf_FormSetValue("saveFormMhshra001", "saveAfchgJssfcCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'afchgJssfcCode',  'grid'), 'combo');	//후직종
    gf_FormSetValue("saveFormMhshra001", "saveAfchgRspofcCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'afchgRspofcCode',  'grid'), 'combo');	//후직책
    gf_FormSetValue("saveFormMhshra001", "deptCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'afchgDeptCode',  'grid'), 'text');	//후부서
    gf_FormSetValue("saveFormMhshra001", "deptCodeNm", gf_DhxGetValue(dhxGridMhshra001, rId, 'afchgDeptCodeNm',  'grid'), 'text');	//후부서
    gf_FormSetValue("saveFormMhshra001", "hdadptDeptCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'hdadptDeptCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshra001", "hdadptAt", gf_DhxGetValue(dhxGridMhshra001, rId, 'hdadptAt',  'grid'), 'chkbox');
    gf_FormSetValue("saveFormMhshra001", "gnfdDtls", gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdDtls',  'grid'), 'textarea');
    
    gf_FormSetValue("saveFormMhshra001", "processAt", gf_DhxGetValue(dhxGridMhshra001, rId, 'processAt',  'grid'), '');
    
    gf_FormSetValue("saveFormMhshra001", "elctsctSttusCodeNm", gf_DhxGetValue(dhxGridMhshra001, rId, 'elctsctSttusCodeNm',  'grid'), '');
    if(pop == null || pop == ""){
    	pop = false;
    }
    if((status == 'inserted' || gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdNo',  'grid')=='' || gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdNo',  'grid')==null) && pop != true) {
        $('#saveFormMhshra001 input[name="gnfdNo"]').prop('disabled', false);
        $('#saveFormMhshra001 input[name="empno"]').prop('disabled', false);
        $('#saveFormMhshra001 select[name="saveGnfdCode"]').prop('disabled', false);
        $('#saveFormMhshra001 input[name="empNm"]').prop('readonly', false);
    } 
    else {
        $('#saveFormMhshra001 input[name="gnfdNo"]').prop('disabled', true);
        $('#saveFormMhshra001 input[name="empno"]').prop('disabled', true);
        $('#saveFormMhshra001 input[name="empNm"]').prop('disabled', true);
        $('#saveFormMhshra001 select[name="saveGnfdCode"]').prop('disabled', true);
        $('#saveFormMhshra001 #saveBtnEmpCodeSearch').prop('disabled', true);
        
    }
    fn_gnfdCodeSelect(gf_DhxGetValue(dhxGridMhshra001, rId, 'gnfdCode',  'grid'));
    fn_Disabled();
    $('#saveFormMhshra001 input[name="elctsctSttusCodeNm"]').prop('readonly', true);
    if(gv_ValidateMethods.required(gf_DhxGetValue(dhxGridMhshra001, rId, 'elctsctDocNo',  'grid'))){
    	$('#saveFormMhshra001 *').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshra001 = function() {
	$('#saveFormMhshra001 input[name="gnfdNo"]').prop('disabled', false);
    $('#saveFormMhshra001 input[name="empno"]').prop('disabled', false);
    $('#saveFormMhshra001 input[name="gnfdCode"]').prop('disabled', false);
    $('#saveFormMhshra001 input[name="saveElctsctSttusCode"]').prop('readonly', true);
    $('#saveFormMhshra001').resetForm();
    gf_FormSetValue("saveFormMhshra001", "empno", '', '');
};
var fn_SettingFormMhshra001 = function() {
	//금일 날짜표시
	$('#gnfdDeSaveFormMhshra001').val(nowDate);
	$('#gnfdBeginDeSaveFormMhshra001').val(nowDate);
	gf_FormSetValue('saveFormMhshra001', 'saveGnfdCode', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveBfchgClsfCode', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveAfchgClsfCode', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveBfchgSrclsCode', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveAfchgSrclsCode', '', 'combo');
	
	gf_FormSetValue('saveFormMhshra001', 'saveBfchgOfcpsCod', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveAfchgOfcpsCod', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveBfchgJssfcCode', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveAfchgJssfcCode', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveBfchgRspofcCode', '', 'combo');
	gf_FormSetValue('saveFormMhshra001', 'saveAfchgRspofcCode', '', 'combo');
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhshra001 *').prop('disabled', status);
    $('#saveFormMhshra001 *').prop('readonly', status);
    $('#saveFormMhshra001 input[name="saveElctsctSttusCode"]').prop('readonly', true);
};
/**
 * 추가(신규) 
 */
var fn_AddMhshra001 = function() {
    dhxGridMhshra001.clearSelection();
    fn_InitInputFormMhshra001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //gnfdCode
    initValueArr.push(''); //empno
    initValueArr.push(''); //empNm
    initValueArr.push(nowDate); //gnfdDe
    initValueArr.push(nowDate); //gnfdBeginDe
    initValueArr.push(''); //gnfdEndDe
    initValueArr.push(''); //gnfdEndDe
    initValueArr.push(''); //processAt
    initValueArr.push(''); //bfchgDeptCode
    initValueArr.push(''); //bfchgClsfCode
    initValueArr.push(''); //bfchgOfcpsCode
    initValueArr.push(''); //bfchgJssfcCode
    initValueArr.push(''); //bfchgSrclsCode
    initValueArr.push(''); //afchgDeptCode
    initValueArr.push(''); //afchgClsfCode
    initValueArr.push(''); //afchgOfcpsCode
    initValueArr.push(''); //afchgJssfcCode
    initValueArr.push(''); //afchgSrclsCode
    initValueArr.push(''); //bfchgRspofcCode
    initValueArr.push(''); //afchgRspofcCode
    initValueArr.push(''); //hdadptDeptCode
    initValueArr.push(''); //hdadptAt
    initValueArr.push(''); //gnfdDtls
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctSttusCode
    dhxGridMhshra001.addRow(dhxGridMhshra001.uid(), initValueArr, 0);
    dhxGridMhshra001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshra001');
    $('#btnPopEmpSearchMhshra001').show();
    fn_FormDisabled(false);
    fn_SettingFormMhshra001();
    fn_Disabled();
}
/**
 * 변경 전 항목 처리
 */
function fn_Disabled(){
    $('#saveFormMhshra001 input[name="gnfdNo"]').prop('readonly', true);
    $('#saveFormMhshra001 select[name="saveBfchgClsfCode"]').prop('disabled', true);
    $('#saveFormMhshra001 select[name="saveBfchgSrclsCode"]').prop('disabled', true);
    $('#saveFormMhshra001 select[name="saveBfchgOfcpsCod"]').prop('disabled', true);
    $('#saveFormMhshra001 select[name="saveBfchgJssfcCode"]').prop('disabled', true);
    $('#saveFormMhshra001 select[name="saveBfchgRspofcCode"]').prop('disabled', true);
    $('#saveFormMhshra001 input[name="bfchgDeptCodeNm"]').prop('readonly', true);
    $('#saveFormMhshra001 input[name="elctsctSttusCodeNm"]').prop('readonly', true);
}
/**
 * 발령구분 선택시 disable
 */
function fn_gnfdCodeSelect(code) {
    var rId = dhxGridMhshra001.getSelectedRowId();
	comboList.data.records.forEach(function(item){
		if(item.gnfdCode == code){
			if(item.clsfChangeAt == 1){
				$('#saveFormMhshra001 select[name="saveAfchgClsfCode"]').prop('disabled', false);
			} else {
			    gf_FormSetValue("saveFormMhshra001", "saveAfchgClsfCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgClsfCode',  'grid'), 'combo');	//전직급
				$('#saveFormMhshra001 select[name="saveAfchgClsfCode"]').prop('disabled', true);
			}
			if(item.deptChangeAt == 1){
				$('#saveFormMhshra001 input[name="deptCode"]').prop('readonly', false);
				$('#saveFormMhshra001 input[name="deptCodeNm"]').prop('readonly', false);
				$('#saveFormMhshra001 #btnDeptCodeSearch').prop('disabled', false);
			}  else {
			    gf_FormSetValue("saveFormMhshra001", "deptCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgDeptCode',  'grid'), 'text');	//후부서
			    gf_FormSetValue("saveFormMhshra001", "deptCodeNm", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgDeptCodeNm',  'grid'), 'text');	//후부서
				$('#saveFormMhshra001 input[name="deptCode"]').prop('readonly', true);
				$('#saveFormMhshra001 input[name="deptCodeNm"]').prop('readonly', true);
				$('#saveFormMhshra001 #btnDeptCodeSearch').prop('disabled', true);
			}
			if(item.jssfcChangeAt == 1){
				$('#saveFormMhshra001 select[name="saveAfchgJssfcCode"]').prop('disabled', false);
			} else {
			    gf_FormSetValue("saveFormMhshra001", "saveAfchgJssfcCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgJssfcCode',  'grid'), 'combo');	//후직종
				$('#saveFormMhshra001 select[name="saveAfchgJssfcCode"]').prop('disabled', true);
			}
			if(item.ofcpsChangeAt == 1){
				$('#saveFormMhshra001 select[name="saveAfchgOfcpsCod"]').prop('disabled', false);
			} else {
			    gf_FormSetValue("saveFormMhshra001", "saveAfchgOfcpsCod", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgOfcpsCode',  'grid'), 'combo');	//후직위
				$('#saveFormMhshra001 select[name="saveAfchgOfcpsCod"]').prop('disabled', true);
			}
			if(item.rspofcChangeAt == 1){
				$('#saveFormMhshra001 select[name="saveAfchgRspofcCode"]').prop('disabled', false);
			} else {
			    gf_FormSetValue("saveFormMhshra001", "saveAfchgRspofcCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgRspofcCode',  'grid'), 'combo');	//후직책
				$('#saveFormMhshra001 select[name="saveAfchgRspofcCode"]').prop('disabled', true);
			}

			if(item.srclsChangeAt == 1){
				$('#saveFormMhshra001 select[name="saveAfchgSrclsCode"]').prop('disabled', false);
			} else {
			    gf_FormSetValue("saveFormMhshra001", "saveAfchgSrclsCode", gf_DhxGetValue(dhxGridMhshra001, rId, 'bfchgSrclsCode',  'grid'), 'combo');	//후호봉
				$('#saveFormMhshra001 select[name="saveAfchgRspofcCode"]').prop('disabled', true);
			}
		}
	});
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshra001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshra001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshra001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshra001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshra001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshra001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshra001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshra001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshra001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshra001.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshra001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshra001', 'sortColumId', '', 'text'); 
            dhxGridMhshra001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshra001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshra001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshra001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshra001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshra001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshra001 = 0; 
    save_Edt_Cnt_Mhshra001 = 0; 
    save_Del_Cnt_Mhshra001 = 0; 
    dhxGridMhshra001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshra001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshra001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshra001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshra001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshra001 += 1; 
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
        save_All_Sta_Mhshra001 = 0; 
        if(save_Add_Cnt_Mhshra001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshra001 + "건";
            save_All_Sta_Mhshra001 = 1; 
        } 
        if(save_Edt_Cnt_Mhshra001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshra001 + "건"; 
        } 
        if(save_Del_Cnt_Mhshra001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshra001 + "건"; 
            save_All_Sta_Mhshra001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshra001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshra001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshra001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshra001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshra001_Send = function() {
    if(fn_GridValidation(dhxGridMhshra001, dhxDataProcessorMhshra001)) {
        dhxDataProcessorMhshra001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshra001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshra001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshra001.forEachRow(function(rowId) {
            state = dhxDataProcessorMhshra001.getState(rowId);
            if(dhxGridMhshra001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshra001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshra001.getRowIndex(rowId);
                    dhxGridMhshra001.deleteRow(rowId);
                    dhxGridMhshra001.selectRow(rowNum);
                    fn_FindMhshra001();
                }
                else dhxDataProcessorMhshra001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshra001 = function () {
    var titMhshra001 = '인사발령'; /* gf_LocaleTrans('default', 'titMhshra001') */
    var jsonParameter = {
        gnfdNo : gf_FormGetValue('searchFormMhshra001', 'gnfdNo', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMhshra001', 'elctsctSeSn', 'text'),
        empno : gf_FormGetValue('searchFormMhshra001', 'empno', 'text'),
        gnfdCode : gf_FormGetValue('searchFormMhshra001', 'gnfdCode', 'text')
    };
    var header = [[
        '발령번호' /* gf_LocaleTrans('default', 'titGnfdNo') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '발령코드' /* gf_LocaleTrans('default', 'titGnfdCode') */,
        '발령을 시행할 일자를 기록' /* gf_LocaleTrans('default', 'titGnfdDe') */,
        '발령시작일' /* gf_LocaleTrans('default', 'titGnfdBeginDe') */,
        '발령종료일' /* gf_LocaleTrans('default', 'titGnfdEndDe') */,
        '처리여부' /* gf_LocaleTrans('default', 'titProcessAt') */,
        '변경전부서코드' /* gf_LocaleTrans('default', 'titBfchgDeptCode') */,
        '변경전직급코드' /* gf_LocaleTrans('default', 'titBfchgClsfCode') */,
        '변경전직위코드' /* gf_LocaleTrans('default', 'titBfchgOfcpsCode') */,
        '변경전직종코드' /* gf_LocaleTrans('default', 'titBfchgJssfcCode') */,
        '변경전직렬코드' /* gf_LocaleTrans('default', 'titBfchgJblnCode') */,
        '변경전호봉코드' /* gf_LocaleTrans('default', 'titBfchgSrclsCode') */,
        '변경후 부서코드' /* gf_LocaleTrans('default', 'titAfchgDeptCode') */,
        '변경후 직급코드' /* gf_LocaleTrans('default', 'titAfchgClsfCode') */,
        '변경후직위코드' /* gf_LocaleTrans('default', 'titAfchgOfcpsCode') */,
        '변경후직종코드' /* gf_LocaleTrans('default', 'titAfchgJssfcCode') */,
        '변경후직렬코드' /* gf_LocaleTrans('default', 'titAfchgJblnCode') */,
        '변경후호봉코드' /* gf_LocaleTrans('default', 'titAfchgSrclsCode') */,
        '변경전직책코드' /* gf_LocaleTrans('default', 'titBfchgRspofcCode') */,
        '변경후 직책코드' /* gf_LocaleTrans('default', 'titAfchgRspofcCode') */,
        '겸임부서코드' /* gf_LocaleTrans('default', 'titHdadptDeptCode') */,
        '겸임여부' /* gf_LocaleTrans('default', 'titHdadptAt') */,
        '발령의 내용을 기록' /* gf_LocaleTrans('default', 'titGnfdDtls') */,
        '전자결재문서번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '결재상태코드' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 사원번호' /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    ]];
    var dataId = [[ 'gnfdNo', 'elctsctSeSn', 'empno', 'gnfdCode', 'gnfdDe', 'gnfdBeginDe', 'gnfdEndDe', 'processAt', 'bfchgDeptCode', 'bfchgClsfCode', 'bfchgOfcpsCode', 'bfchgJssfcCode', 'bfchgJblnCode', 'bfchgSrclsCode', 'afchgDeptCode', 'afchgClsfCode', 'afchgOfcpsCode', 'afchgJssfcCode', 'afchgJblnCode', 'afchgSrclsCode', 'bfchgRspofcCode', 'afchgRspofcCode', 'hdadptDeptCode', 'hdadptAt', 'gnfdDtls', 'elctsctDocNo', 'elctsctSttusCode', 'elctsctEmpno' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshra001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshra001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshra001/excelMhshra001', jsonParameter);
};
/**
 * 사원 검색
 */
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMhshra001', 'searchEmpno', 'text');
		korNm = gf_FormGetValue('searchFormMhshra001', 'searchEmpNm', 'text');
	}
	else {
		empno = gf_FormGetValue('saveFormMhshra001', 'empno', 'text');
		korNm = gf_FormGetValue('saveFormMhshra001', 'empNm', 'text');
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
	console.log(strSvcID)
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	if(strSvcID == "1"){
	 		gf_FormSetValue('searchFormMhshra001', 'searchEmpno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhshra001', 'searchEmpNm', data.korNm, 'text');
	  	}
	  	else {
	 		gf_FormSetValue('saveFormMhshra001', 'empno', data.empno, 'text');
	 		gf_FormSetValue('saveFormMhshra001', 'empNm', data.korNm, 'text');
	 		gf_FormSetValue("saveFormMhshra001", "empNm", data.korNm, 'text');
	 	    gf_FormSetValue("saveFormMhshra001", "saveBfchgClsfCode", data.clsfCode, 'combo');	//전직급
	 	    gf_FormSetValue("saveFormMhshra001", "saveBfchgSrclsCode", data.srclsCode, 'combo');	//전호봉
	 	    gf_FormSetValue("saveFormMhshra001", "saveBfchgOfcpsCod", data.ofcpsCode, 'combo');	//전직위
	 	    gf_FormSetValue("saveFormMhshra001", "saveBfchgJssfcCode", data.jssfcCode, 'combo');	//전직종
	 	    gf_FormSetValue("saveFormMhshra001", "saveBfchgRspofcCode", data.rspofcCode, 'combo');	//전직책
	 	    gf_FormSetValue("saveFormMhshra001", "bfchgDeptCodeNm", data.deptCodeNm, 'text');	//전부서
	 	    gf_FormSetValue("saveFormMhshra001", "saveAfchgClsfCode", data.clsfCode, 'combo');	//후직급
	 	    gf_FormSetValue("saveFormMhshra001", "saveAfchgSrclsCode", data.srclsCode, 'combo');	//후호봉
	 	    gf_FormSetValue("saveFormMhshra001", "saveAfchgOfcpsCod", data.ofcpsCode, 'combo');	//후직위
	 	    gf_FormSetValue("saveFormMhshra001", "saveAfchgJssfcCode", data.jssfcCode, 'combo');	//후직종
	 	    gf_FormSetValue("saveFormMhshra001", "saveAfchgRspofcCode", data.rspofcCode, 'combo');	//후직책
	 	    gf_FormSetValue("saveFormMhshra001", "deptCodeNm", data.deptCodeNm, 'text');	//후부서
	 	    gf_FormSetValue("saveFormMhshra001", "deptCode", data.deptCode, 'text');	//후부서
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMhshra001","searchEmpno","searchEmpNm", gBplcCode, "Y");
	  	} else {
	  		gf_EmpPopup("saveFormMhshra001","empno","empNm", gBplcCode, "Y");
	  	}
  	}
}
function fn_CallbackPopEmp1(data){
	console.log(data.empno + " : " + data.korNm);
}
function fn_CallbackPopEmp(data){
	console.log(data.empno + " : " + data.korNm);
	gf_FormSetValue("saveFormMhshra001", "empNm", data.korNm, 'text');
    gf_FormSetValue("saveFormMhshra001", "saveBfchgClsfCode", data.clsfCode, 'combo');	//전직급
    gf_FormSetValue("saveFormMhshra001", "saveBfchgSrclsCode", data.srclsCode, 'combo');	//전호봉
    gf_FormSetValue("saveFormMhshra001", "saveBfchgOfcpsCod", data.ofcpsCode, 'combo');	//전직위
    gf_FormSetValue("saveFormMhshra001", "saveBfchgJssfcCode", data.jssfcCode, 'combo');	//전직종
    gf_FormSetValue("saveFormMhshra001", "saveBfchgRspofcCode", data.rspofcCode, 'combo');	//전직책
    gf_FormSetValue("saveFormMhshra001", "bfchgDeptCodeNm", data.deptCodeNm, 'text');	//전부서
    gf_FormSetValue("saveFormMhshra001", "saveAfchgClsfCode", data.clsfCode, 'combo');	//후직급
    gf_FormSetValue("saveFormMhshra001", "saveAfchgSrclsCode", data.srclsCode, 'combo');	//후호봉
    gf_FormSetValue("saveFormMhshra001", "saveAfchgOfcpsCod", data.ofcpsCode, 'combo');	//후직위
    gf_FormSetValue("saveFormMhshra001", "saveAfchgJssfcCode", data.jssfcCode, 'combo');	//후직종
    gf_FormSetValue("saveFormMhshra001", "saveAfchgRspofcCode", data.rspofcCode, 'combo');	//후직책
    gf_FormSetValue("saveFormMhshra001", "deptCodeNm", data.deptCodeNm, 'text');	//후부서
    gf_FormSetValue("saveFormMhshra001", "deptCode", data.deptCode, 'text');	//후부서
}
/**
 * 부서 검색
 */
function fn_SearchDeptCode(){
	var deptCode = gf_FormGetValue('saveFormMhshra001', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('saveFormMhshra001', 'deptCodeNm', 'text');
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
   		gf_FormSetValue('saveFormMhshra001', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('saveFormMhshra001', 'deptCodeNm', data.deptKorNm, 'text');

    } 
    else {
    	//Popup 호출
    	gf_DeptPopup("saveFormMhshra001","deptCode","deptCodeNm", gBplcCode, "Y"); 
    }
}
function fn_CallbackPopDept(data){
	console.log(data.deptCode + " : " + data.deptKorNm);
}
/**
 * 달력 이벤트
 */
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="searchDe_cal" || e.target.id =="searchGnfdBeginDeSearchFormMhshra001" || e.target.id =="searchGnfEndDeSearchFormMhshra001") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
//기간달력
function Calendar(){
	//달력 생성
	searchCalendar = new dhtmlXDoubleCalendar("searchDe_cal");
	
	searchCalendar.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchGnfdBeginDeSearchFormMhshra001').val(dateFormat(searchCalendar.leftCalendar.getDate()));
        	$('#searchGnfEndDeSearchFormMhshra001').val(dateFormat(searchCalendar.rightCalendar.getDate()));
        	searchCalendar.hide();
        }
    });
	
	//금일 날짜표시
	$('input[name=searchGnfdBeginDe]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchGnfEndDe]').val( (new Date()).format('YYYY-MM-30') );
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormMhshra001', 'searchGnfdBeginDe', 'text'));
	searchCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormMhshra001', 'searchGnfEndDe', 'text'));	
	searchCalendar.leftCalendar.loadUserLanguage("ko");
	searchCalendar.rightCalendar.loadUserLanguage("ko");
}
function Claendar2(){
	//발령일 달력 생성
	var saveStCalender = new dhtmlXCalendarObject({input:"gnfdDeSaveFormMhshra001", button:"startDateIcon"});
	saveStCalender.loadUserLanguage("ko");
	saveStCalender.hideTime();	
	//시작일자 달력 생성
	var saveBeginCalender = new dhtmlXCalendarObject({input:"gnfdBeginDeSaveFormMhshra001", button:"startDateIcon"});
	saveBeginCalender.loadUserLanguage("ko");
	saveBeginCalender.hideTime();	
	//종료일자 달력 생성
	var saveEndCalender = new dhtmlXCalendarObject({input:"gnfdEndDeSaveFormMhshra001", button:"startDateIcon"});
	saveEndCalender.loadUserLanguage("ko");
	saveEndCalender.hideTime();	
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
/**
 * 승급대상자 조회
 */
var $advanEmpInfo_Main = [];
var fn_AdvanEmp = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	var userId = ""; 
	var title  = "승급대상자 조회";
	var codeInfo = "advanEmpInfo";	
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if ( !gf_IsNull(strCallbackFunc) ) {
		if(typeof(strCallbackFunc) == "string"){
		    	callFunction = eval(strCallbackFunc);
		    	if ( typeof callFunction != "function" ) {
		    		gf_DivMsgAlert("call back function "+ strCallbackFunc +" 이 구현되지 않습니다.!!");
		          	return false;
		        }
		}else{
		    	callFunction = strCallbackFunc;
		}
	}	
	
	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$advanEmpInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='advanEmpPopup']").size() <= 0) {
		$('body').append("<div id='advanEmpPopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#advanEmpPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'advanEmpPopup';
			var ajaxUrl = gv_ContextPath+'/mhshra001/popup/findPopupAdvanEmpList/view';
			console.log(ajaxUrl);
			var left	= 0;
			var top		= 0;
			var width	= 1000;
			var height	= 600;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#advanEmpPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($advanEmpInfo);
			}
			dhxWindows.unload();
			$('body').find("div[id='advanEmpPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

var fn_CallbackPopup = function(data) {
		if($advanEmpInfo_Main.length != 0){
		for(var i=0;i<$advanEmpInfo_Main.length;i++){
			
			dhxGridMhshra001.clearSelection();
			fn_InitInputFormMhshra001();
			var initValueArr = [];
			initValueArr.push(''); //no
			initValueArr.push(''); //checkbox
			initValueArr.push($advanEmpInfo_Main[i].gnfdCodeNm); //gnfdCodeNm : 발령구분
			initValueArr.push($advanEmpInfo_Main[i].empno); //empno : 사원번호
			initValueArr.push($advanEmpInfo_Main[i].korNm); //empNm : 사원이름
			initValueArr.push($advanEmpInfo_Main[i].nxttrmPromtDe); //gnfdDe :발령일
			initValueArr.push(''); //gnfdBeginDe : 발령시작일
			initValueArr.push(''); //gnfdEndDe : 발령 종료일
			initValueArr.push(''); //elctsctSttusCodeNm : 결재상태

			initValueArr.push(''); //elctsctSttusCode : 결재상태코드
			initValueArr.push($advanEmpInfo_Main[i].gnfdCode); //gnfdCode : 발령코드
			initValueArr.push(''); //elctsctSeSn : 전자결재 구분 순번
			initValueArr.push(''); //elctsctDocNo : 전자결재문서번호
			initValueArr.push(''); //elctsctEmpno : 전자결재사원번호
			initValueArr.push(''); //gnfdNo : 발령번호
			initValueArr.push($advanEmpInfo_Main[i].clsfCode); //dfchgClsfCode : 변경전 직급코드
			initValueArr.push($advanEmpInfo_Main[i].srclsCode); //bfchgSrclsCode : 변경전호봉코드
			initValueArr.push($advanEmpInfo_Main[i].ofcpsCode); //bfchgOfcpsCode : 변경전 직위코드
			initValueArr.push($advanEmpInfo_Main[i].jssfcCode); //bfchgJssfcCode : 변경전직종코드
			initValueArr.push($advanEmpInfo_Main[i].rspofCode); //bfchgRspofcCode : 변경전직책코드
			initValueArr.push($advanEmpInfo_Main[i].deptCode); //bfchgDeptCode : 변경전부서코드
    
			initValueArr.push($advanEmpInfo_Main[i].clsfCode); //afchgClsfCode : 변경후 직급코드
			initValueArr.push($advanEmpInfo_Main[i].srclsCode); //afchgSrclsCode : 변경후호봉코드
			initValueArr.push($advanEmpInfo_Main[i].ofcpsCode); //afchgOfcpsCode : 변경후직위코드
			initValueArr.push($advanEmpInfo_Main[i].jssfcCode); //afchgJssfcCode : 변경후직종코드
			initValueArr.push($advanEmpInfo_Main[i].rspofCode); //afchgRspofcCode : 변경후 직책코드
			initValueArr.push($advanEmpInfo_Main[i].deptNm); //bfchgDeptCodeNm : 변경전 부서이름
			initValueArr.push($advanEmpInfo_Main[i].deptCode); //afchgDeptCode : 변경후 부서코드
			initValueArr.push($advanEmpInfo_Main[i].deptNm); //afchgDeptCodeNm : 변경후 부서이름
			initValueArr.push(''); //gnfdDtls
			initValueArr.push(''); //gnfdDtls
			initValueArr.push(''); //gnfdDtls
			initValueArr.push(''); //gnfdDtls
			initValueArr.push(''); //gnfdDtls
			dhxGridMhshra001.addRow(dhxGridMhshra001.uid(), initValueArr, 0);
			dhxGridMhshra001.selectRow(0);
			gf_NoFoundDataOnGridMsgRemove('dataListMhshra001');
			$('#btnPopEmpSearchMhshra001').show();
			fn_FormDisabled(false);
		}
		pop = true;
		fn_FindMhshra001(pop);
	}
	$advanEmpInfo_Main = [];
};
/**
 * 엑셀 업로드
 */
//엑셀 업로드 양식
var fn_ExcelSampleMhshra001 = function () {
    var titMhshra001 = '인사발령 양식'; /* gf_LocaleTrans('default', 'titMhshra001') */
    var jsonParameter = {
        gnfdNo : '999999',
        empno : '999999',
        gnfdCode : gf_FormGetValue('searchFormMhshra001', 'gnfdCode', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '발령코드' /* gf_LocaleTrans('default', 'titGnfdCode') */,
        '발령을 시행할 일자' /* gf_LocaleTrans('default', 'titGnfdDe') */,
        '발령시작일' /* gf_LocaleTrans('default', 'titGnfdBeginDe') */,
        '발령종료일' /* gf_LocaleTrans('default', 'titGnfdEndDe') */,
        '변경 부서코드' /* gf_LocaleTrans('default', 'titAfchgDeptCode') */,
        '변경 직급코드' /* gf_LocaleTrans('default', 'titAfchgClsfCode') */,
        '변경직위코드' /* gf_LocaleTrans('default', 'titAfchgOfcpsCode') */,
        '변경직종코드' /* gf_LocaleTrans('default', 'titAfchgJssfcCode') */,
        '변경호봉코드' /* gf_LocaleTrans('default', 'titAfchgSrclsCode') */,
        '변경 직책코드' /* gf_LocaleTrans('default', 'titAfchgRspofcCode') */,
        '겸임부서코드' /* gf_LocaleTrans('default', 'titHdadptDeptCode') */,
        '겸임여부' /* gf_LocaleTrans('default', 'titHdadptAt') */,
        '발령의 내용' /* gf_LocaleTrans('default', 'titGnfdDtls') */,
        '전자결재문서번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재상태' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 사원번호' /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    ]];
    var dataId = [[ 'empno', 'gnfdCode', 'gnfdDe', 'gnfdBeginDe', 'gnfdEndDe', 'afchgDeptCode', 'afchgClsfCode', 'afchgOfcpsCode', 'afchgJssfcCode', 'afchgSrclsCode', 'afchgRspofcCode', 'hdadptDeptCode', 'hdadptAt', 'gnfdDtls', 'elctsctDocNo', 'elctsctSttusCode', 'elctsctEmpno' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshra001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshra001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshra001/excelMhshra001', jsonParameter);
};
//엑셀 데이터 확인
var fn_FileUploadBtnEvent = function(){
	
	$('#btnFileUpload1').unbind("click").bind("click",function(event){
	    /*
		*  startRowNum : 엑셀파일에서 잃어들일 첫번째 라인의 번호
		 * maxRowNum : 엑셀파일에서 잃어들일 최대 라인의 번호, 0,null 입력 시 99999 으로 설정 됨
		 * colTitle : 리턴받을 컬럼ID 지정, 엑셀 다운로드한 그리드의 ID = 그리드 생성에 사용된 컬럼 ID를 구분자 "|"로 구분하여 순서대로 입역
		 *    ex:) "workTyCode|workTyCodeNm|useAt|bassTyAt|calcPd|coreTimeApplcAt|attendConfirmAt|dayRecogWorktime"
		 * dhxGrid : 엑셀파일 업로드 결과를 보여줄 그리드 ID, 그리드 자체를 넘겨야 함
		 * strCallbackFunc : callback 함수 이름
		 ****** dhxGrid 또는 callback 중 하나는 입력 되어야 함
		 ****** 업로드 받은 결과의 정합성은 각 프로그램별로 검증 해야 함 : 컬럼 수가 요청한 컬럼수보다 많으면 무조건 업로드 처리 하므로 다른 파일이 업로드 되도 성공으로 처리 함
		 */
		var startRowNum = 2;
	    var maxRowNum = 1000;
	    var colTitle = "empno|gnfdCode|gnfdDe|gnfdBeginDe|gnfdEndDe|afchgDeptCode|afchgClsfCode|afchgOfcpsCode|afchgJssfcCode|afchgSrclsCode|afchgRspofcCode|hdadptDeptCode|hdadptAt|gnfdDtls|elctsctDocNo|elctsctSttusCode|elctsctEmpno";
	    var strCallbackFunc = "fn_CallbackExcelUpload";
		gf_ExcelUpload (startRowNum, maxRowNum, colTitle, dhxGridMhshra001, strCallbackFunc);
	});
};
var fn_CallbackExcelUpload = function(data) {
	if(!gf_IsNull(data.data)){
		var str_req = "";
		for(var j=0; j<data.data.length; j++){
			
			//코드 자리수에 따라 확인 후 수정 필요
			var empno = data.data[j]["empno"];
			var gnfdCode = lpad(data.data[j]["gnfdCode"], 3, '0');
			var gnfdDe = data.data[j]["gnfdDe"];
			var gnfdBeginDe = data.data[j]["gnfdBeginDe"];
			var gnfdEndDe = data.data[j]["gnfdEndDe"];
			var afchgDeptCode = lpad(data.data[j]["afchgDeptCode"], 3, '0');
			var afchgClsfCode = lpad(data.data[j]["afchgClsfCode"], 3, '0');
			var afchgOfcpsCode = rpad(data.data[j]["afchgOfcpsCode"], 3, '0');
			var afchgJssfcCode = lpad(data.data[j]["afchgJssfcCode"], 3, '0');
			var afchgSrclsCode = lpad(data.data[j]["afchgSrclsCode"], 2, '0');
			var afchgRspofcCode = rpad(data.data[j]["afchgRspofcCode"], 3, '0');
			var hdadptDeptCode = lpad(data.data[j]["hdadptDeptCode"], 3, '0');
			var hdadptAt = data.data[j]["hdadptAt"];
			var gnfdDtls = data.data[j]["gnfdDtls"];
			var elctsctDocNo = data.data[j]["elctsctDocNo"];
			var elctsctSttusCode = data.data[j]["elctsctSttusCode"];
			
			str_req +=  empno+ ", " +gnfdCode+ ", " +gnfdDe+ ", " +gnfdBeginDe+ ", " +gnfdEndDe+ ", " +afchgDeptCode+ ", " +afchgClsfCode+ ", " +afchgOfcpsCode+ ", " +afchgJssfcCode+ ", " + afchgSrclsCode+ ", " +afchgRspofcCode+ ", " +hdadptDeptCode+ ", " +hdadptAt+ ", " +gnfdDtls+ ", " +elctsctDocNo+ ", " +elctsctSttusCode + "|";}
			var jsonParameter = {
					str_req : str_req
		    };
			
			console.log(jsonParameter);
			var dataTest = gf_NoAsyncTransaction('mhshra001/checkDataMhshra001', jsonParameter, 'POST');
			
			dhxGridMhshra001.clearAll();
			console.log(dataTest.data.records);
		    if(!gf_IsNull(dataTest.data.records)){
		    	dataTest.data.records.forEach(function(item){  
					   if(item.empNm == null || item.empNm == ""){
						   item.empno = "";
					   }
					   if(item.gnfdCodeNm == null || item.gnfdCodeNm == ""){
						   item.gnfdCode = "";
					   }
					   if(item.clsfNm == null || item.clsfNm == ""){
						   item.afchgClsfCode = "";
					   }
					   if(item.ofcpsNm == null || item.ofcpsNm == ""){
						   item.afchgOfcpsCode = "";
					   }
					   if(item.rspofcNm == null || item.rspofcNm == ""){
						   item.afchgRspofcCode = "";
					   }
					   if(item.deptKorNm == null || item.deptKorNm == ""){
						   item.afchgDeptCode = "";
					   }
					   if(item.srclsCodeNm == null || item.srclsCodeNm == ""){
						   item.afchgSrclsCode = "";
					   }
					   if(item.jssfcCodeNm == null || item.jssfcCodeNm == ""){
						   item.afchgJssfcCode = "";
					   }
					   item.gnfdDe = item.gnfdDe.replace(/[^0-9]/g,'');
					   item.gnfdBeginDe = (item.gnfdBeginDe).replace(/[^0-9]/g,'');
					   item.gnfdEndDe = (item.gnfdEndDe).replace(/[^0-9]/g,'');
					   if(item.gnfdDe.lengt > 8 || item.gnfdDe < 8){
						   item.gnfdDe = "";
					   }
					   if(item.gnfdBeginDe.lengt > 8 || item.gnfdBeginDe < 8){
						   item.gnfdBeginDe = "";
					   }
					   if(item.gnfdEndDe.lengt > 8 || item.gnfdEndDe < 8){
						   item.gnfdEndDe = "";
					   }
				  });
		        gf_NoFoundDataOnGridMsgRemove('dataListMhshra001');
		        dhxGridMhshra001.parse(dataTest.data.records, 'js');
//		        fn_InitDataProcess();
		        dhxGridMhshra001.selectRow(0);
		    } else {
		        gf_NoFoundDataOnGridMsg('dataListMhshra001');
		        fn_InitInputFormMhshra001();
		    }
		    $("#spanCntSearchFormMhshra001").text(dataTest.data.records.length);
	        dhxGridMhshra001.forEachRow(function(rowId) {
	            dhxDataProcessorMhshra001.setUpdated(rowId, true, 'inserted');
	        });
		    cf_SetEventListenerMhshra001();
	        fn_FindMhshra001();
		    fn_FormDisabled(false);
		    fn_Disabled();
		}
}
function lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}
function rpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str + "";
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str += padStr;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
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
    $('#saveFormMhshra001 #gnfdNoSaveFormMhshra001').parent().append(
    '<div class="error" id="gnfdNoSaveFormMhshra001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshra001 #empnoSaveFormMhshra001').parent().append(
    '<div class="error" id="empnoSaveFormMhshra001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshra001 #gnfdCodeSaveFormMhshra001').parent().append(
    '<div class="error" id="gnfdCodeSaveFormMhshra001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshra001 = function(gnfdNo, empno, gnfdCode){
    if(!gf_IsNull(gnfdNo) && !gf_IsNull(empno) && !gf_IsNull(gnfdCode)) {
        var jsonParameter = {
            gnfdNo : gnfdNo,
            empno : empno,
            gnfdCode : gnfdCode
        };
        var dataSource = gf_NoAsyncTransaction('mhshra001/findMhshra001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.gnfdNo) && gf_IsNull(data.empno) && gf_IsNull(data.gnfdCode)) {
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
    var state = dhxDataProcessorMhshra001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshra001').validate().form()){
                if(state == 'inserted') {
                    var gnfdNo = gf_FormGetValue('saveFormMhshra001', 'gnfdNo', 'text');
                    var empno = gf_FormGetValue('saveFormMhshra001', 'empno', 'text');
                    var gnfdCode = gf_FormGetValue('saveFormMhshra001', 'gnfdCode', 'text');
                    if(fn_CheckDupMhshra001(gnfdNo, empno, gnfdCode)) return true;
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
    var checkGnfdNo;
    var checkEmpno;
    var checkGnfdCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshra001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshra001 == 'deleted') {
        save_Row_Num_Mhshra001 = 0;
        save_Row_Ids_Mhshra001 = "";
    } else if(save_Row_Sta_Mhshra001 == 'inserted') {
        save_Row_Num_Mhshra001 = rowNum;
        save_Row_Ids_Mhshra001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshra001 = rowNum;
        save_Row_Ids_Mhshra001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'gnfdCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdCodeNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'gnfdDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdDe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'gnfdBeginDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdBeginDe');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkGnfdNo = gf_DhxGetValue(dhxGridObjet, rowId, 'gnfdNo', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkGnfdCode = gf_DhxGetValue(dhxGridObjet, rowId, 'gnfdCode', 'grid');
                    if(!gf_IsNull(checkGnfdNo, checkEmpno, checkGnfdCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var gnfdNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'gnfdNo', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var gnfdCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'gnfdCode', 'grid');
                            if(((gnfdNo == checkGnfdNo) && (empno == checkEmpno) && (gnfdCode == checkGnfdCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdNo');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshra001( checkGnfdNo, checkEmpno, checkGnfdCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdNo');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'gnfdCode');
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
        dhxGridMhshra001.selectRowById(validFalseFistRowId);
        fn_FindMhshra001();
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