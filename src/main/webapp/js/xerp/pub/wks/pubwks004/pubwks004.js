/**
 *    프로그램       : 휴직신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.03
 *    사용테이블      : MHS_LAYOFF
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubwks004 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwks004 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwks004 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwks004 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwks004 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwks004 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwks004 = 0;  //그리드 삭제 수량 
var dhxGridPubwks004;	//그리드 객체
var eventIdPubwks004 = [];	//그리드 이벤트 객체
var dhxDataProcessorPubwks004;	//DataProcessor 객체
 
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var dhxSearchTime; // 검색 달력 설정
var dhxSaveTime; // 휴직기간 달력 설정
var uploadedFileKeysPrg3 = []; // db 저장용 (키만 파이프라인으로 구분)
var uploadedFileInfoPrg3 = []; // 화면에 저장된 정보 표시용 (삭제 기능)
var userId;
var userNm;
var userNo;
var userDeptNm;
var userDeptNo;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPubwks004();
    if(cf_SetComponentsPubwks004()){
        cf_SetEventListenerPubwks004();
        cf_InitFormPubwks004();
        cf_SetBindingPubwks004();
     }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwks004 = function() {
    gf_SetMenuPath();
    $("#saveFormPubwks004").validate({ errorElement: 'div', ignore: '' });
    fn_FileUploadPrgEvent();	 //파일첨부
    fn_TimeSet();
    fn_UserInformationPubwks004();
    //검색
    gf_ComboCode('divComboSearchLayoffSe', 'searchLayoffSe', 'searchLayoffSe', 'search', 'C190', '' , '', '', 'ordr', '');//휴직구분
    gf_ComboCode('divComboSearchElctsctSttusCode', 'searchElctsctSttusCode', 'searchElctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', '');//결재구분
};

var cf_SetComponentsPubwks004 = function() {
    var dhxGridPubwks004HeaderInfo = [];
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPubwks004" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('복사 체크', '40', 'left', 'str', 'ro', false, 'copyFlag', '', ''));
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('휴직번호', '150', 'left', 'str', 'ro', true, 'layoffNo', '', '')); /* gf_LocaleTrans('default', 'titLayoffNo') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('순번', '50', 'center', 'int', 'ro', false, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('부서명', '100', 'center', 'str', 'ro', false, 'deptNm', '')); // 부서
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'empNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('휴직구분', '*', 'left', 'str', 'ro', false, 'layoffSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titLayoffSeCode') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('휴직시작일자', '100', 'center', 'str', 'ro', false, 'layoffBeginDe', '', '')); /* gf_LocaleTrans('default', 'titLayoffBeginDe') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('휴직종료일자', '100', 'center', 'str', 'ro', false, 'layoffEndDe', '', '')); /* gf_LocaleTrans('default', 'titLayoffEndDe') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('기간', '50', 'right', 'str', 'ro', true, 'layoffDaycnt', '', '')); /* gf_LocaleTrans('default', 'titLayoffDaycnt') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '60', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCodeNm') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('휴직내역', '100', 'left', 'str', 'ro', true, 'layoffDtls', '', '')); /* gf_LocaleTrans('default', 'titLayoffDtls') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('연장휴직번호', '100', 'left', 'str', 'ro', true, 'extnLayoffNo', '', '')); /* gf_LocaleTrans('default', 'titExtnLayoffNo') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('근속기간포함여부', '100', 'center', 'str', 'ro', true, 'cnwkpdInclsAt', '', '')); /* gf_LocaleTrans('default', 'titCnwkpdInclsAt') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '100', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('휴직구분코드', '100', 'center', 'str', 'ro', true, 'layoffSeCode', '', '')); /* gf_LocaleTrans('default', 'titLayoffSeCode') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('작성자', '60', 'center', 'str', 'ro', true, 'regNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('작성자아이디', '60', 'center', 'str', 'ro', true, 'userId', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('전자결재문서번호', '100', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('결재상태코드', '100', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks004HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '100', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwks004 = gf_MakeDhxGrid('dataListPubwks004', dhxGridPubwks004HeaderInfo, true, false, false);
    dhxGridPubwks004.enableAutoWidth(false);
    dhxGridPubwks004.setEditable(true);

    dhxGridPubwks004.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    //입력
    gf_ComboCode('layoffSeCodeSaveFormPubwks004', 'layoffSeCode', 'layoffSeCode', 'add', 'C190', '' , 'width:200px', '', 'ordr', 'required');	//휴직구분
    
    return true; 
};

var cf_SetEventListenerPubwks004 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubwks004 = gf_GridDetachEvent(dhxGridPubwks004, eventIdPubwks004);
    eventId = dhxGridPubwks004.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubwks004();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubwks004.getColumnsNum();
            var rowNum = dhxGridPubwks004.getRowsNum();
            var selectedId = dhxGridPubwks004.getSelectedRowId();
            var ind        = dhxGridPubwks004.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks004.getRowIndex(selectedId);
            var type       = dhxGridPubwks004.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubwks004.selectRow(0);
                    //fn_FindPubwks004();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubwks004.selectRow(rowIndex + 1);
                    fn_FindPubwks004();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubwks004.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks004.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubwks004.getSelectedRowId();
            var ind        = dhxGridPubwks004.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks004.getRowIndex(selectedId);
            var type       = dhxGridPubwks004.getColType(ind);
            dhxGridPubwks004.selectCell(rowIndex+1, ind);
            fn_FindPubwks004();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks004.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubwks004.getSelectedRowId();
            var ind        = dhxGridPubwks004.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks004.getRowIndex(selectedId);
            var type       = dhxGridPubwks004.getColType(ind);
            dhxGridPubwks004.selectCell(rowIndex-1, ind);
            fn_FindPubwks004();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks004.editCell();
            }
        }
        else return true;
    });
    eventIdPubwks004.push(eventId);
    eventId = dhxGridPubwks004.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubwks004SortGridList(ind, type, direction); 
    });
    eventIdPubwks004.push(eventId);
    eventId = dhxGridPubwks004.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubwks004.push(eventId);
    eventId = dhxGridPubwks004.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindPubwks004();
    });
    eventIdPubwks004.push(eventId);
    eventId = dhxGridPubwks004.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPubwks004.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwks004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPubwks004()
    });
    $('#btnSavePubwks004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubwks004();
    });
    $('#btnRemovePubwks004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubwks004();
    });
    $('#btnExcelPubwks004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwks004();
    });
    $('#btnSearchPubwks004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubwks004('');
    });
    $('#btnResetPubwks004').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwks004();
    });
    $('#copyBtn').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        fn_SaveCopyPubwks004();
    });
    
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPubwks004').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPubwks004, $('#checkAllPubwks004').prop('checked'), 'chk');
    });
    $('#searchFormPubwks004 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id =="btnDeptCodeSearch" || this.id =="btnEmpCodeSearch"){
        		$('#btnSearchPubwks004').click(); event.preventDefault(); return true;
        	}
        	else {
        		$('#btnSearchPubwks004').click(); event.preventDefault(); return true;
        	}
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#btnDeptCodeSearch input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	
        		$('#btnSearchPubwks004').click(); event.preventDefault(); return true;
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //검색 달력
    $('#searchFormPubwks004 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#searchFormPubwks004 #searchDate').unbind('click').bind('click', function(event){
    	dhxSearchTime.show();
    });
    //저장 달력
    $('#saveFormPubwks004 .input_calen').unbind('keyup').bind('keyup', function(event){
    	dateChk($(this));
    });
    $('#saveFormPubwks004 #saveDate').unbind('click').bind('click', function(event){
    	dhxSaveTime.show();
    });
    //첨부파일저장
    $('#btnFileUploadSaveFormPubwks004').unbind('click').bind('click', function() {
        gf_FileUploadPopup(
                '',     /* eventFunction */
                '',     /* deleteBtnClassNm */
                'saveFormPubwks004',     /* viewDivId */
                'ciImgFileSaveFormPubwks004',     /* dataDivId */
                [],     /* keyArr */
                [],     /* infoArr */
                0,
                'all',
                'fn_CallbackFileUploadSaveFormPubwks004');
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubwks004 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubwks004",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks004 input[name="reqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'reqstDe', $(this).val());
    });
    $('#saveFormPubwks004 input[name="regNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'regNm', $(this).val());
    });
    $('#saveFormPubwks004 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'empno', userNo);
    });
    $('#saveFormPubwks004 input[name="deptNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'deptNm', $(this).val());
    });
    $('#saveFormPubwks004 input[name="empNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'empNm', $(this).val());
    });
    $('#saveFormPubwks004 select[name="layoffSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffSeCode', $(this).val());
        if($(this).val() == '00' || $(this).val() == null || $(this).val() == ''){
        	gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffSeCodeNm', '');
        } else {
        	gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffSeCodeNm', $("#saveFormPubwks004 select[name='layoffSeCode'] option:selected").text());
        }
    });
    $('#saveFormPubwks004 input[name="layoffBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffBeginDe', $(this).val());
    });
    $('#saveFormPubwks004 input[name="layoffEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffEndDe', $(this).val());
    });
    $('#saveFormPubwks004 textarea[name="layoffDtls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffDtls', $(this).val());
    });
    $('#saveFormPubwks004 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'atchmnflNo', $(this).val());
    });
    $('#saveFormPubwks004 input[name="layoffDaycnt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffDaycnt', $(this).val()+'일');
    });
    $('#saveFormPubwks004 input[name="regNm"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'regNm', $(this).val());
    });
    $('#saveFormPubwks004 input[name="userId"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
    	gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'userId', userId);
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormPubwks004 = function() {
	$('#searchFormPubwks004').resetForm();
    gf_FormSetValue("searchFormPubwks004", "searchEmpno", userNo, '');
	gf_FormSetValue("searchFormPubwks004", "searchEmpNm", userNm, '');
	gf_FormSetValue("searchFormPubwks004", "searchDeptNm", userDeptNm, '');
	gf_FormSetValue("searchFormPubwks004", "searchDeptNo", userDeptNo, '');
	
	$('input[name=searchLayoffBeginDe]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchLayoffEndDe]').val( (new Date()).format('YYYY-MM-30') );
	dhxSearchTime.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks004', 'searchLayoffBeginDe', 'text'));
	dhxSearchTime.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks004', 'searchLayoffEndDe', 'text'));
	$('#layoffBeginDeSearchFormPubwks004').focus();
};

var cf_SetBindingPubwks004 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchPubwks004('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 사용자 정보 조회
 */
var fn_UserInformationPubwks004 = function() {
	var jsonParameter = {};
	var dataSource = gf_NoAsyncTransaction('pubwks004/userInformationPubwks004', jsonParameter, 'GET');
    var data = dataSource.data;
    userNo = data.empno;
    userId = data.userId;
    userNm = data.userNm;
    userDeptNm = data.userDeptNm;
    userDeptNo = data.deptNo;
	gf_FormSetValue("searchFormPubwks004", "searchEmpno", userNo, '');
	gf_FormSetValue("searchFormPubwks004", "searchEmpNm", userNm, '');
	gf_FormSetValue("searchFormPubwks004", "searchDeptNm", userDeptNm, '');
	gf_FormSetValue("searchFormPubwks004", "searchDeptNo", userDeptNo, '');
}
/**
 * 조회
 */
var fn_SearchPubwks004 = function(userId) {
	var jsonParameter = {
			empno : userNo,
    		layoffBeginDe : gf_FormGetValue('searchFormPubwks004', 'searchLayoffBeginDe', 'text').replaceAll('-',''),
        	layoffEndDe : gf_FormGetValue('searchFormPubwks004', 'searchLayoffEndDe', 'text').replaceAll('-',''),
        	layoffSeCode : gf_FormGetValue('searchFormPubwks004', 'searchLayoffSe', 'combo'),
        	elctsctSttusCode : gf_FormGetValue('searchFormPubwks004', 'searchElctsctSttusCode', 'combo')
    };
    gf_Transaction(userId, 'pubwks004/searchPubwks004', jsonParameter, 'fn_CallbackSearchPubwks004', false, 'GET');
};

var fn_CallbackSearchPubwks004 = function(strSvcID, targetID, data) {
    //dhxGridPubwks004.clearAll();
    dhxGridPubwks004.destructor();
    if(cf_SetComponentsPubwks004()){ 
        fn_DhxDataProcessorPubwks004(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPubwks004');
            dhxGridPubwks004.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pubwks004 == 0 && save_All_Sta_Pubwks004 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPubwks004.selectRow(0); 
            } else if(save_Row_Sta_Pubwks004 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPubwks004.selectRow(0);
            } else if(save_All_Sta_Pubwks004 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPubwks004.selectRow(save_Row_Num_Pubwks004); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPubwks004.selectRow(save_Row_Num_Pubwks004);   //개발자 수정 필요  
                //var findCell = dhxGridPubwks004.findCell(save_Row_Ids_Pubwks004, gf_GetDhxGridColumId(dhxGridPubwks004,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPubwks004.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPubwks004.selectRow(0);
                //} 
            } 
 
            fn_FindPubwks004();
        } else {
            gf_NoFoundDataOnGridMsg('dataListPubwks004');
            fn_InitInputFormPubwks004();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormPubwks004").text(data.data.records.length);
        cf_SetEventListenerPubwks004();
    } 
};
var fn_SaveCopyPubwks004 = function(){
	var rId = dhxGridPubwks004.getSelectedRowId();
	var paramElctsctSttusCode = gf_DhxGetValue(dhxGridPubwks004, rId, 'elctsctSttusCode',  'grid');
	var paramElctsctSeSn = gf_DhxGetValue(dhxGridPubwks004, rId, 'elctsctSeSn',  'grid');
	var paramLayoffNo = gf_DhxGetValue(dhxGridPubwks004, rId, 'layoffNo',  'grid');
	
	if(paramElctsctSttusCode != "20"){
		gf_DivMsgAlert("반려 상태만 복사 가능합니다.");
	}
	else{
		var jsonParameterForCopy = {
				elctsctSttusCode : paramElctsctSttusCode,
				elctsctSeSn : paramElctsctSeSn,
				layoffNo : paramLayoffNo
		}
		var dataSource = gf_NoAsyncTransaction('pubwks004/saveCopyPubwks004' ,jsonParameterForCopy , 'GET');
		console.log(dataSource);
        if(dataSource.data.code == '000'){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            fn_SearchPubwks004('');
        }
        else{
            gf_DivMsgAlert("이미 등록된 데이터가 존재합니다.");
        }
	}
}
var fn_DhxDataProcessorPubwks004 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubwks004 = new dataProcessor(gv_ContextPath+'/pubwks004/savePubwks004'); //lock feed url
    dhxDataProcessorPubwks004.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubwks004.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubwks004.init(dhxGridPubwks004); //link dataprocessor to the grid
    dhxDataProcessorPubwks004.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubwks004.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubwks004.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubwks004();
                    $("#checkAllPubwks004").prop('checked', false); //상단 체크박스 해제
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
var fn_FindPubwks004 = function() {
	var rId = dhxGridPubwks004.getSelectedRowId();
    var status = dhxDataProcessorPubwks004.getState(rId);
    fn_FormDisabled(false);
    
    gf_FormSetValue("saveFormPubwks004", "layoffSeCode", gf_DhxGetValue(dhxGridPubwks004, rId, 'layoffSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubwks004", "layoffNo", gf_DhxGetValue(dhxGridPubwks004, rId, 'layoffNo',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "empno", gf_DhxGetValue(dhxGridPubwks004, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "reqstDe", gf_DhxGetValue(dhxGridPubwks004, rId, 'reqstDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "layoffBeginDe", gf_DhxGetValue(dhxGridPubwks004, rId, 'layoffBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "layoffEndDe", gf_DhxGetValue(dhxGridPubwks004, rId, 'layoffEndDe',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "layoffDaycnt", gf_DhxGetValue(dhxGridPubwks004, rId, 'layoffDaycnt',  'grid').replaceAll('일',''), '');
    gf_FormSetValue("saveFormPubwks004", "layoffDtls", gf_DhxGetValue(dhxGridPubwks004, rId, 'layoffDtls',  'grid'), 'textarea');
    gf_FormSetValue("saveFormPubwks004", "extnLayoffNo", gf_DhxGetValue(dhxGridPubwks004, rId, 'extnLayoffNo',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "saveLayoffSe", gf_DhxGetValue(dhxGridPubwks004, rId, 'layoffSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubwks004", "cnwkpdInclsAt", gf_DhxGetValue(dhxGridPubwks004, rId, 'cnwkpdInclsAt',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "elctsctDocNo", gf_DhxGetValue(dhxGridPubwks004, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "elctsctSttusCodeNm", gf_DhxGetValue(dhxGridPubwks004, rId, 'elctsctSttusCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "empNm", gf_DhxGetValue(dhxGridPubwks004, rId, 'empNm',  'grid'), '');
    gf_FormSetValue("saveFormPubwks004", "regNm", gf_DhxGetValue(dhxGridPubwks004, rId, 'regNm',  'grid'), '');
    gf_FormSetValue('saveFormPubwks004', 'atchmnfl', gf_DhxGetValue(dhxGridPubwks004, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormPubwks004', 'atchmnflList', gf_DhxGetValue(dhxGridPubwks004, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    
    var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridPubwks004, rId, 'atchmnflNo',  'grid') };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
    
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기
	dhxSaveTime.leftCalendar.setDate(gf_FormGetValue('saveFormPubwks004', 'layoffBeginDe', 'text'));
	dhxSaveTime.rightCalendar.setDate(gf_FormGetValue('saveFormPubwks004', 'layoffEndDe', 'text'));
	
	var elctsctSttusCode = gf_DhxGetValue(dhxGridPubwks004, rId, 'elctsctSttusCode',  'grid');
	var copyFlag = gf_DhxGetValue(dhxGridPubwks004, rId, 'copyFlag',  'grid');
	if(elctsctSttusCode == '20' && copyFlag <= 0){
		$("#copyBtn").show();
	}
	else{
		$("#copyBtn").hide();
	}
	
	if(gf_IsNull(elctsctSttusCode)){
		$('#saveFormPubwks004 *').prop('disabled', false);
		$('#saveFormPubwks004 input[name="reqstDe"]').prop('disabled', true);
		$('#saveFormPubwks004 input[name="regNm"]').prop('disabled', true);
	}
	else{
	 	$('#saveFormPubwks004 *').prop('disabled', true);
	}
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubwks004 = function() {
    $('#saveFormPubwks004').resetForm();
    gf_FormSetValue("saveFormPubwks004", "regNm", userNm, '');
    gf_FormSetValue("saveFormPubwks004", "empno", userNo, '');
    gf_FormSetValue("saveFormPubwks004", "empNm", userNm, '');
    gf_FormSetValue("saveFormPubwks004", "deptNm", userDeptNm, '');
    gf_FormSetValue("saveFormPubwks004", "userId", userId, '');
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
	$('#saveFormPubwks004 *').prop('disabled', status);
    $('#saveFormPubwks004 input[name="regNm"]').prop('disabled', true);
    $('#saveFormPubwks004 input[name="empNm"]').prop('disabled', true);
	$('#saveFormPubwks004 input[name="reqstDe"]').prop('disabled', true);
    $('#saveFormPubwks004 input[name="elctsctSttusCodeNm"]').prop('disabled', true);
};
/**
 * 추가(신규) 
 */
var fn_AddPubwks004 = function() {
    dhxGridPubwks004.clearSelection();
    fn_InitInputFormPubwks004();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //layoffNo : 휴직번호
    initValueArr.push(new Date().format('YYYY-MM-DD')); //reqstDe : 신청일자
    initValueArr.push(''); //elctsctSeSn : 전자결재 구분 순번
    initValueArr.push(userDeptNm); //deptNm : 부서명
    initValueArr.push(userNm); //empNm : 성명
    initValueArr.push(''); //layoffSeCodeNm : 휴직구분 명
    initValueArr.push(new Date().format('YYYY-MM-DD')); //layoffBeginDe : 휴직시작일자
    initValueArr.push(new Date().format('YYYY-MM-DD')); //layoffEndDe : 휴직종료일자
    initValueArr.push(''); //layoffDaycnt : 기간
    initValueArr.push(''); //elctsctSttusCodeNm : 결재상태
    initValueArr.push(''); //layoffDtls : 휴직내역
    initValueArr.push(''); //extnLayoffNo : 연장휴직번호
    initValueArr.push(''); //cnwkpdInclsAt : 근속기간포함여부
    initValueArr.push(''); //atchmnflNo : 첨부파일번호
    initValueArr.push(''); //layoffSeCode : 휴직구분
    initValueArr.push(userNm); //regNm : 작성자
    initValueArr.push(userId); //userId : 작성자 아이디
    initValueArr.push(userNo); //empno : 사원번호
    initValueArr.push(''); //전자결재문서번호
    initValueArr.push(''); //결재상태코드
    initValueArr.push(''); //전자결재 사원번호
    dhxGridPubwks004.addRow(dhxGridPubwks004.uid(), initValueArr, 0);
    dhxGridPubwks004.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPubwks004');
    $('#btnPopEmpSearchPubwks004').show();
    fn_FormDisabled(false);
    
    gf_FormSetValue("saveFormPubwks004", "reqstDe", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormPubwks004", "layoffBeginDe", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormPubwks004", "layoffEndDe", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormPubwks004", "layoffDaycnt", '1', '');
	dhxSaveTime.leftCalendar.setDate(gf_FormGetValue('saveFormPubwks004', 'layoffBeginDe', 'text'));
	dhxSaveTime.rightCalendar.setDate(gf_FormGetValue('saveFormPubwks004', 'layoffEndDe', 'text'));
	
	var jsonParameter = { atchFiles : 'AAAAAAAAA' };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubwks004SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubwks004, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubwks004', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubwks004', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubwks004, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubwks004.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubwks004', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubwks004', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks004, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubwks004.setSortImgState(false); 
            gf_FormSetValue('searchFormPubwks004', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubwks004', 'sortColumId', '', 'text'); 
            dhxGridPubwks004.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubwks004.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubwks004', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubwks004', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks004, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubwks004 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubwks004 = 0; 
    save_Edt_Cnt_Pubwks004 = 0; 
    save_Del_Cnt_Pubwks004 = 0; 
    dhxGridPubwks004.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubwks004.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubwks004.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubwks004 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubwks004 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubwks004 += 1; 
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
        save_All_Sta_Pubwks004 = 0; 
        if(save_Add_Cnt_Pubwks004 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pubwks004 + "건";
            save_All_Sta_Pubwks004 = 1; 
        } 
        if(save_Edt_Cnt_Pubwks004 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pubwks004 + "건"; 
        } 
        if(save_Del_Cnt_Pubwks004 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pubwks004 + "건"; 
            save_All_Sta_Pubwks004 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPubwks004(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubwks004(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPubwks004 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubwks004_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubwks004_Send = function() {
    if(fn_GridValidation(dhxGridPubwks004, dhxDataProcessorPubwks004)) {
        dhxDataProcessorPubwks004.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemovePubwks004 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubwks004, 'chk');
    console.log(rowIds);
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridPubwks004.forEachRow(function(rowId) {
            state = dhxDataProcessorPubwks004.getState(rowId);
            var elctsctSttusCode = gf_DhxGetValue(dhxGridPubwks004, rowId, 'elctsctSttusCode', 'grid'); 
            if(dhxGridPubwks004.cells(rowId, gf_GetDhxGridColumId(dhxGridPubwks004, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridPubwks004.getRowIndex(rowId);
                    dhxGridPubwks004.deleteRow(rowId);
                    dhxGridPubwks004.selectRow(rowNum);
                    fn_FindPubwks004();
                }
                else if(gf_IsNull(elctsctSttusCode)){
                	dhxDataProcessorPubwks004.setUpdated(rowId, true, 'deleted');
                }
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubwks004 = function () {
    var titPubwks004 = '휴직신청관리'; /* gf_LocaleTrans('default', 'titPubwks004') */
    var jsonParameter = {
        	empno : gf_FormGetValue('searchFormPubwks004', 'searchEmpno', 'text'),
    		layoffBeginDe : gf_FormGetValue('searchFormPubwks004', 'searchLayoffBeginDe', 'text').replaceAll('-',''),
        	layoffEndDe : gf_FormGetValue('searchFormPubwks004', 'searchLayoffEndDe', 'text').replaceAll('-',''),
        	layoffSeCode : gf_FormGetValue('searchFormPubwks004', 'searchLayoffSe', 'combo'),
        	elctsctSttusCode : gf_FormGetValue('searchFormPubwks004', 'searchElctsctSttusCode', 'combo')
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
    var dataId = [[ 'layoffNo', 'reqstDe', 'deptKorNm', 'empno', 'empNm', 'layoffSeCode', 'layoffSeCodeNm', 'layoffBeginDe', 'layoffEndDe', 'layoffDaycnt', 'layoffDtls',
    				'atchmnflNo','extnLayoffNo', 'cnwkpdInclsAt', 'elctsctDocNo', 'elctsctSttusCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPubwks004 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwks004;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwks004/excelPubwks004', jsonParameter);
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
		gf_FormSetValue('saveFormPubwks004', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormPubwks004', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
        callbacks.fire();
	}
};

var fn_CallBackZipPopup = function(data){
	if(!gf_IsNull(data)){
		gf_FormSetValue('saveFormPubwks004', 'postCode', data.zipno, 'text');  
		gf_FormSetValue('saveFormPubwks004', 'adres', data.roadAddr1, 'text');
		gf_FormSetValue('saveFormPubwks004', 'addr2',(data.roadAddrDetail + " " + data.roadAddr2).trim(), 'text');
	}
}
/**
 * 달력
 */
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="searchDate_cal" || e.target.id =="layoffBeginDeSearchFormPubwks004" || e.target.id =="layoffEndDeSearchFormPubwks004") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxSearchTime.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="saveDate_cal" || e.target.id =="layoffBeginDeSaveFormPubwks004" || e.target.id =="layoffEndDeSaveFormPubwks004") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxSaveTime.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
function fn_TimeSet(){
	//달력 생성
	dhxSearchTime = new dhtmlXDoubleCalendar("searchDate_cal");
	dhxSearchTime.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#layoffBeginDeSearchFormPubwks004').val(dateFormat(dhxSearchTime.leftCalendar.getDate()));
        	$('#layoffEndDeSearchFormPubwks004').val(dateFormat(dhxSearchTime.rightCalendar.getDate()));
        	dhxSearchTime.hide();
        }
    });
	$('input[name=searchLayoffBeginDe]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=searchLayoffEndDe]').val( (new Date()).format('YYYY-MM-30') );
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxSearchTime.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks004', 'searchLayoffBeginDe', 'text'));
	dhxSearchTime.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks004', 'searchLayoffEndDe', 'text'));	
	dhxSearchTime.leftCalendar.loadUserLanguage("ko");
	dhxSearchTime.rightCalendar.loadUserLanguage("ko");
	
	
	//달력 생성
	dhxSaveTime = new dhtmlXDoubleCalendar("saveDate_cal");
	dhxSaveTime.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#layoffBeginDeSaveFormPubwks004').val(dateFormat(dhxSaveTime.leftCalendar.getDate()));
        	$('#layoffEndDeSaveFormPubwks004').val(dateFormat(dhxSaveTime.rightCalendar.getDate()));
        	
        	gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffBeginDe', gf_FormGetValue('saveFormPubwks004', 'layoffBeginDe', 'text'));
            gf_DhxGridCellMapping(dhxGridPubwks004, dhxDataProcessorPubwks004, 'layoffEndDe', gf_FormGetValue('saveFormPubwks004', 'layoffEndDe', 'text'));
//            var deCnt = gf_FormGetValue('saveFormPubwks004', 'layoffEndDe', 'text') - gf_FormGetValue('saveFormPubwks004', 'layoffBeginDe', 'text').replaceAll('-','') + 1;
//            gf_FormSetValue('saveFormPubwks004', 'layoffDaycnt', deCnt, 'text');  
            deCount();
            
        	dhxSaveTime.hide();
        }
    });
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxSearchTime.leftCalendar.setDate(gf_FormGetValue('saveFormPubwks004', 'layoffBeginDe', 'text'));
	dhxSearchTime.rightCalendar.setDate(gf_FormGetValue('saveFormPubwks004', 'layoffEndDe', 'text'));	
	dhxSaveTime.leftCalendar.loadUserLanguage("ko");
	dhxSaveTime.rightCalendar.loadUserLanguage("ko");
}
function deCount(){
	    var sdd = document.getElementById("layoffBeginDeSaveFormPubwks004").value;
	    var edd = document.getElementById("layoffEndDeSaveFormPubwks004").value;
	    var ar1 = sdd.split('-');
	    var ar2 = edd.split('-');
	    var da1 = new Date(ar1[0], ar1[1], ar1[2]);
	    var da2 = new Date(ar2[0], ar2[1], ar2[2]);
	    var dif = da2 - da1;
	    var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
	    var cMonth = cDay * 30;// 월 만듬
	    var cYear = cMonth * 12; // 년 만듬
	 if(sdd && edd){
//	    document.getElementById('layoffDaycntSaveFormPubwks004').value = parseInt(dif/cDay)
	    gf_FormSetValue('saveFormPubwks004', 'layoffDaycnt', parseInt(dif/cDay)+1, 'text');  
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
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormPubwks004 #layoffNoSaveFormPubwks004').parent().append(
    '<div class="error" id="layoffNoSaveFormPubwks004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubwks004 = function(layoffNo){
    if(!gf_IsNull(layoffNo)) {
        var jsonParameter = {
            layoffNo : layoffNo
        };
        var dataSource = gf_NoAsyncTransaction('pubwks004/findPubwks004', jsonParameter, 'GET');
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
    var state = dhxDataProcessorPubwks004.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPubwks004').validate().form()){
                if(state == 'inserted') {
                    var layoffNo = gf_FormGetValue('saveFormPubwks004', 'layoffNo', 'text');
                    if(fn_CheckDupPubwks004(layoffNo)) return true;
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
    save_Row_Sta_Pubwks004 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pubwks004 == 'deleted') {
        save_Row_Num_Pubwks004 = 0;
        save_Row_Ids_Pubwks004 = "";
    } else if(save_Row_Sta_Pubwks004 == 'inserted') {
        save_Row_Num_Pubwks004 = rowNum;
        save_Row_Ids_Pubwks004 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubwks004 = rowNum;
        save_Row_Ids_Pubwks004 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'regNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'regNm');
                    valid = false;
                }
                if(valid && (gf_DhxGetValue(dhxGridObjet, rowId, 'layoffEndDe', 'grid').replaceAll('-','') < gf_DhxGetValue(dhxGridObjet, rowId, 'layoffBeginDe', 'grid').replaceAll('-',''))){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffEndDe');
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'layoffBeginDe');
                    gf_DivMsgAlert("종료일자를 확인해주세요.");
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
                        if(!fn_CheckDupPubwks004( checkLayoffNo )){
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
        dhxGridPubwks004.selectRowById(validFalseFistRowId);
        fn_FindPubwks004();
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