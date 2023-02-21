/**
 *    프로그램       : 학자금신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.30
 *    사용테이블      : MHS_SCHXPN_REQST
 * sourceGen version : 2020.07.16.01 (2020.07.30)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhswfs001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhswfs001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhswfs001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhswfs001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhswfs001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhswfs001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhswfs001 = 0;  //그리드 삭제 수량 
var dhxGridMhswfs001;  //그리드 객체
var eventIdMhswfs001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhswfs001;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhswfs001();
    if(cf_SetComponentsMhswfs001()){
       cf_SetEventListenerMhswfs001();
       cf_InitFormMhswfs001();
       cf_SetBindingMhswfs001();
       fn_FileUploadPrgEvent();	 //파일첨부
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhswfs001 = function() {
    gf_SetMenuPath();
    $("#saveFormMhswfs001").validate({ errorElement: 'div', ignore: '' });
    
    // 콤보박스로 가져올때 SQL 에서 FNC_COMCODENM 쿼리 사용할시  폼에서 find 에서 select 에러 남. 
    gf_ComboCode('divComboqu','qu','qu', 'sel', 'C058', '' , '', '', 'ordr', 'required','',''); //분기
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;   
    
    $("#tutfeeAmtSaveFormMhswfs001").number(true);
    $("#operSportAmtSaveFormMhswfs001").number(true);
    $("#totalAmtSaveFormMhswfs001").number(true);
    $("#SumAmtSaveFormMhswfs001").number(true);
    
    $("#deptCodeNm").focus();
    
};

var cf_SetComponentsMhswfs001 = function() {
    var dhxGridMhswfs001HeaderInfo = [];
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhswfs001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('신청번호', '0', 'left', 'str', 'ro', true, 'reqstNo', '', '')); /* gf_LocaleTrans('default', 'titReqstNo') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('발생 년도', '0', 'left', 'str', 'ro', true, 'occrrncYy', '', '')); /* gf_LocaleTrans('default', 'titOccrrncYy') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('자녀 명', '80', 'center', 'str', 'ro', false, 'chldrnNm', '', '')); /* gf_LocaleTrans('default', 'titChldrnNm') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('분기', '50', 'center', 'int', 'coro', false, 'qu', '', '')); /* gf_LocaleTrans('default', 'titQu') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('학교 명', '0', 'left', 'str', 'ro', true, 'schulNm', '', '')); /* gf_LocaleTrans('default', 'titSchulNm') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('학년', '0', 'right', 'int', 'ro', true, 'grade', '', '')); /* gf_LocaleTrans('default', 'titGrade') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('수업료 금액', '100', 'right', 'int', 'edn', false, 'tutfeeAmt', '', '')); /* gf_LocaleTrans('default', 'titTutfeeAmt') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('운영 지원 금액', '100', 'right', 'int', 'edn', false, 'operSportAmt', '', '')); /* gf_LocaleTrans('default', 'titOperSportAmt') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '100', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titPymntDe') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('회계전표를 유일하게 식별할 수 있는 번호를 기록하는 항목', '0', 'left', 'str', 'ro', true, 'slipNo', '', '')); /* gf_LocaleTrans('default', 'titSlipNo') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일번호', '0', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드', '0', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('비고 항목', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '0', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '', '')); /* gf_LocaleTrans('default', 'titpymntSn') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '60', 'center', 'str', 'coro', false, 'confmSttusCode', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('승인일자', '0', 'center', 'str', 'ro', true, 'confmDe', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('승인자사원번호', '0', 'center', 'str', 'ro', true, 'confmerEmpno', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMhswfs001HeaderInfo.push(gf_MakeDhxGridHeader('반려사유', '0', 'center', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titapplcYm') */
    dhxGridMhswfs001 = gf_MakeDhxGrid('dataListMhswfs001', dhxGridMhswfs001HeaderInfo, true, false, false);
    dhxGridMhswfs001.enableAutoWidth(false);
    dhxGridMhswfs001.setEditable(true);

    dhxGridMhswfs001.setColumnMinWidth(80,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    //분기
    var qujsonParameter = {codekindCode : "C058",exceptCode :"",sortOrder :"asc" };
    var qudataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', qujsonParameter, '');
    gf_ComboDataSet(dhxGridMhswfs001, dhxGridMhswfs001.getColIndexById("qu"), qudataSource.data, "sel");
    
    //승인신청상태
    var confmSttusCodejsonParameter = {codekindCode : "C197",exceptCode :"",sortOrder :"asc" };
    var confmSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', confmSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhswfs001, dhxGridMhswfs001.getColIndexById("confmSttusCode"), confmSttusCodedataSource.data, "sel");
    
    
    dhxGridMhswfs001.setNumberFormat("0,000", dhxGridMhswfs001.getColIndexById("tutfeeAmt"), ".", ",");
    dhxGridMhswfs001.setNumberFormat("0,000", dhxGridMhswfs001.getColIndexById("operSportAmt"), ".", ",");
    
    return true; 
};

var cf_SetEventListenerMhswfs001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhswfs001 = gf_GridDetachEvent(dhxGridMhswfs001, eventIdMhswfs001);
    eventId = dhxGridMhswfs001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhswfs001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhswfs001.getColumnsNum();
            var rowNum = dhxGridMhswfs001.getRowsNum();
            var selectedId = dhxGridMhswfs001.getSelectedRowId();
            var ind        = dhxGridMhswfs001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhswfs001.getRowIndex(selectedId);
            var type       = dhxGridMhswfs001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhswfs001.selectRow(0);
                    //fn_FindMhswfs001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhswfs001.selectRow(rowIndex + 1);
                    fn_FindMhswfs001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhswfs001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhswfs001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhswfs001.getSelectedRowId();
            var ind        = dhxGridMhswfs001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhswfs001.getRowIndex(selectedId);
            var type       = dhxGridMhswfs001.getColType(ind);
            dhxGridMhswfs001.selectCell(rowIndex+1, ind);
            fn_FindMhswfs001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhswfs001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhswfs001.getSelectedRowId();
            var ind        = dhxGridMhswfs001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhswfs001.getRowIndex(selectedId);
            var type       = dhxGridMhswfs001.getColType(ind);
            dhxGridMhswfs001.selectCell(rowIndex-1, ind);
            fn_FindMhswfs001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhswfs001.editCell();
            }
        }
        else return true;
    });
    eventIdMhswfs001.push(eventId);
    eventId = dhxGridMhswfs001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhswfs001SortGridList(ind, type, direction); 
    });
    eventIdMhswfs001.push(eventId);
    eventId = dhxGridMhswfs001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhswfs001.push(eventId);
    eventId = dhxGridMhswfs001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhswfs001();
    });
    eventIdMhswfs001.push(eventId);
    eventId = dhxGridMhswfs001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhswfs001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhswfs001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhswfs001()
    });
    $('#btnAddCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        
		// 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhswfs001, 'chk');
		if(gf_IsNull(rowIds)){
			gf_DivMsgAlert("승인할 사원을 선택해 주세요.");
			return false;
		} else{
	        // 체크된 항목 반복문
			$(rowIds).each(function(index, rowId){
				// 선택된 값마다 해당 지급일자 Set 해준다.
				dhxGridMhswfs001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhswfs001, 'confmSttusCode')).setValue("002");
				// Set이 된 이후 그리드 업데이트 실행 해준다.
				dhxDataProcessorMhswfs001.setUpdated(rowId, true, 'updated');
			});
			gf_DivMsgConfirm("승인하시겠습니까?", 'fn_SaveMhswfs001_Send()', 'fn_Reset()');
		}
		
    });
    $('#btnRemoveCode').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        // 반려 신청일 경우
     // 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhswfs001, 'chk');
		var returnResn = gf_FormGetValue('saveFormMhswfs001', 'returnResn', 'text');
		if(gf_IsNull(rowIds)){
			gf_DivMsgAlert("반려할 사원을 선택해 주세요.");
			return false;
		} else if (gf_IsNull(returnResn)){
			gf_DivMsgAlert("반려사유를 입력해 주세요.");
			return false;
		} else{
	        // 체크된 항목 반복문
			$(rowIds).each(function(index, rowId){
				// 선택된 값마다 해당 지급일자 Set 해준다.
				dhxGridMhswfs001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhswfs001, 'confmSttusCode')).setValue("003");
				// Set이 된 이후 그리드 업데이트 실행 해준다.
				dhxDataProcessorMhswfs001.setUpdated(rowId, true, 'updated');
			});
			gf_DivMsgConfirm("반려하시겠습니까?", 'fn_SaveMhswfs001_Send()', 'fn_Reset()');
		}
    });
    $('#btnSaveMhswfs001').unbind('click').bind('click', function() {
    	fn_SaveMhswfs001();
    });
    $('#btnRemoveMhswfs001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhswfs001();
    });
    $('#btnExcelMhswfs001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhswfs001();
    });
    $('#btnSearchMhswfs001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhswfs001('');
    });
    $('#btnResetMhswfs001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhswfs001();
    });
    // 기타 이벤트 ========================================================================================== 
    $('#searchFormMhswfs001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
    	if(event.charCode == 13) { 
        	if(this.id == "deptCode"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "deptCodeNm"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "empno"){
        		fn_SearchEmpCode("1");
        	} else if(this.id == "korNm"){
        		fn_SearchEmpCode("1");
        		return false;
        	} else{
        		$('#btnSearchMhswfs001').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true;  
    }); 
    $('#saveFormMhswfs001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhswfs001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhswfs001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhswfs001 input[name="reqstNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'reqstNo', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'empno', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="korNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'korNm', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="occrrncYy"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'occrrncYy', $(this).val());
    });
    $('#saveFormMhswfs001 select[name="qu"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'qu', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="chldrnNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'chldrnNm', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="schulNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'schulNm', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="grade"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'grade', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="tutfeeAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'tutfeeAmt', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="operSportAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'operSportAmt', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="reqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'reqstDe', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="pymntDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'pymntDe', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="slipNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'slipNo', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="elctsctDocNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'elctsctDocNo', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'elctsctSttusCode', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="elctsctEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'elctsctEmpno', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'rm', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="elctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'elctsctSeSn', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="pymntSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'pymntSn', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="applcYm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'applcYm', $(this).val());
    });
    $('#saveFormMhswfs001 input[name="returnResn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhswfs001, dhxDataProcessorMhswfs001, 'returnResn', $(this).val());
    });
  //사용자 찾기 
    $('#btnUseEmpSearch').unbind('click').bind('click', function(event){
    	// form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    	gf_EmpPopup("searchFormMhswfs001","empnoSaveFormMhswfs001","korNmSaveFormMhswfs001", gBplcCode, "N", "");  //
    });
  //사원 선택 Popup
    $('#searchFormMhswfs001 #btnempnoSearchSearchFormMhswfs001').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhswfs001","empno","korNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#searchFormMhswfs001 #btnDeptCodeSearchSearchFormMhswfs001').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhswfs001","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhswfs001', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhswfs001', 'empno', '', 'text');
	    }
		
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhswfs001', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhswfs001', 'deptCode', '', 'text');
	    }
    });
	
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhswfs001 = function() {
    $('#searchFormMhswfs001').resetForm();
};

var cf_SetBindingMhswfs001 = function() {
    fn_FormDisabled(false);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhswfs001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhswfs001 = function(userId) {
    var jsonParameter = {
    		empno : gf_FormGetValue('searchFormMhswfs001', 'empno', 'text'),
            deptCode : gf_FormGetValue('searchFormMhswfs001', 'deptCode', 'text')
    };
    gf_Transaction(userId, 'mhswfs001/searchMhswfs001', jsonParameter, 'fn_CallbackSearchMhswfs001', false, 'GET');
};

var fn_CallbackSearchMhswfs001 = function(strSvcID, targetID, data) {
    //dhxGridMhswfs001.clearAll();
    dhxGridMhswfs001.destructor();
    if(cf_SetComponentsMhswfs001()){ 
        fn_DhxDataProcessorMhswfs001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhswfs001');
            dhxGridMhswfs001.parse(data.data.records, 'js');
 
            dhxGridMhswfs001.forEachRow(function(rowId) {
    			var reqstDe = gf_DhxGetValue(dhxGridMhswfs001, rowId, 'reqstDe', 'grid');
    			if (!gf_IsNull(reqstDe)){
    				dhxGridMhswfs001.cells(rowId,7).setDisabled(true); // 분기
    				dhxGridMhswfs001.cells(rowId,10).setDisabled(true); // 수업료 금액
    				dhxGridMhswfs001.cells(rowId,11).setDisabled(true); // 운영 지원 금액
    				dhxGridMhswfs001.cells(rowId,23).setDisabled(true); // 승인여부
    			}
    	    });
            
            if(save_Row_Num_Mhswfs001 == 0 && save_All_Sta_Mhswfs001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhswfs001.selectRow(0); 
            } else if(save_Row_Sta_Mhswfs001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhswfs001.selectRow(0);
            } else if(save_All_Sta_Mhswfs001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhswfs001.selectRow(save_Row_Num_Mhswfs001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhswfs001.selectRow(save_Row_Num_Mhswfs001);   //개발자 수정 필요  
                //var findCell = dhxGridMhswfs001.findCell(save_Row_Ids_Mhswfs001, gf_GetDhxGridColumId(dhxGridMhswfs001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhswfs001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhswfs001.selectRow(0);
                //} 
            } 
 
            fn_FindMhswfs001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhswfs001');
            fn_InitInputFormMhswfs001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhswfs001").text(data.data.records.length);
        cf_SetEventListenerMhswfs001();
    } 
};
var fn_DhxDataProcessorMhswfs001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhswfs001 = new dataProcessor(gv_ContextPath+'/mhswfs001/saveMhswfs001'); //lock feed url
    dhxDataProcessorMhswfs001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhswfs001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhswfs001.init(dhxGridMhswfs001); //link dataprocessor to the grid
    dhxDataProcessorMhswfs001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhswfs001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhswfs001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhswfs001();
                    $("#checkAllMhswfs001").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhswfs001 = function() {
    var rId = dhxGridMhswfs001.getSelectedRowId();
    var status = dhxDataProcessorMhswfs001.getState(rId);

    fn_FormDisabled(true);
    $('#returnResnSaveFormPubwfs008').prop('disabled', false);
    
    gf_FormSetValue("saveFormMhswfs001", "reqstNo", gf_DhxGetValue(dhxGridMhswfs001, rId, 'reqstNo',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "empno", gf_DhxGetValue(dhxGridMhswfs001, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "korNm", gf_DhxGetValue(dhxGridMhswfs001, rId, 'korNm',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "occrrncYy", gf_DhxGetValue(dhxGridMhswfs001, rId, 'occrrncYy',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "qu", gf_DhxGetValue(dhxGridMhswfs001, rId, 'qu',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhswfs001", "chldrnNm", gf_DhxGetValue(dhxGridMhswfs001, rId, 'chldrnNm',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "schulNm", gf_DhxGetValue(dhxGridMhswfs001, rId, 'schulNm',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "grade", gf_DhxGetValue(dhxGridMhswfs001, rId, 'grade',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "tutfeeAmt", gf_DhxGetValue(dhxGridMhswfs001, rId, 'tutfeeAmt',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "operSportAmt", gf_DhxGetValue(dhxGridMhswfs001, rId, 'operSportAmt',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "reqstDe", gf_DhxGetValue(dhxGridMhswfs001, rId, 'reqstDe',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "pymntDe", gf_DhxGetValue(dhxGridMhswfs001, rId, 'pymntDe',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "slipNo", gf_DhxGetValue(dhxGridMhswfs001, rId, 'slipNo',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "atchmnflNo", gf_DhxGetValue(dhxGridMhswfs001, rId, 'atchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "elctsctDocNo", gf_DhxGetValue(dhxGridMhswfs001, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "elctsctSttusCode", gf_DhxGetValue(dhxGridMhswfs001, rId, 'elctsctSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "elctsctEmpno", gf_DhxGetValue(dhxGridMhswfs001, rId, 'elctsctEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "rm", gf_DhxGetValue(dhxGridMhswfs001, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "elctsctSeSn", gf_DhxGetValue(dhxGridMhswfs001, rId, 'elctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "pymntSn", gf_DhxGetValue(dhxGridMhswfs001, rId, 'pymntSn',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "applcYm", gf_DhxGetValue(dhxGridMhswfs001, rId, 'applcYm',  'grid'), '');
    gf_FormSetValue("saveFormMhswfs001", "returnResn", gf_DhxGetValue(dhxGridMhswfs001, rId, 'returnResn',  'grid'), '');
    gf_FormSetValue('saveFormMhswfs001', 'atchmnfl', gf_DhxGetValue(dhxGridMhswfs001, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormMhswfs001', 'atchmnflList', gf_DhxGetValue(dhxGridMhswfs001, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일
    
    var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridMhswfs001, rId, 'atchmnflNo',  'grid') };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
    
    if(status == 'inserted') {
        $('#saveFormMhswfs001 input[name="reqstNo"]').prop('disabled', false);
        $('#saveFormMhswfs001 input[name="empno"]').prop('disabled', false);
    } else {
        $('#saveFormMhswfs001 input[name="reqstNo"]').prop('disabled', true);
        $('#saveFormMhswfs001 input[name="empno"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhswfs001 = function() {
    $('#saveFormMhswfs001 input[name="reqstNo"]').prop('disabled', false);
    $('#saveFormMhswfs001 input[name="empno"]').prop('disabled', false);
    $('#saveFormMhswfs001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhswfs001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhswfs001 = function() {
    dhxGridMhswfs001.clearSelection();
    fn_InitInputFormMhswfs001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //reqstNo
    initValueArr.push(''); //empno
    initValueArr.push(''); //occrrncYy
    initValueArr.push(''); //qu
    initValueArr.push(''); //chldrnNm
    initValueArr.push(''); //schulNm
    initValueArr.push(''); //grade
    initValueArr.push(''); //tutfeeAmt
    initValueArr.push(''); //operSportAmt
    initValueArr.push(''); //reqstDe
    initValueArr.push(''); //pymntDe
    initValueArr.push(''); //slipNo
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctSttusCode
    initValueArr.push(''); //elctsctEmpno
    initValueArr.push(''); //rm
    initValueArr.push(''); //elctsctSeSn
    initValueArr.push(''); //pymntSn
    initValueArr.push(''); //applcYm
    initValueArr.push(''); //confmAt
    dhxGridMhswfs001.addRow(dhxGridMhswfs001.uid(), initValueArr, 0);
    dhxGridMhswfs001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhswfs001');
    $('#btnPopEmpSearchMhswfs001').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhswfs001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhswfs001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhswfs001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhswfs001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhswfs001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhswfs001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhswfs001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhswfs001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhswfs001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhswfs001.setSortImgState(false); 
            gf_FormSetValue('searchFormMhswfs001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhswfs001', 'sortColumId', '', 'text'); 
            dhxGridMhswfs001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhswfs001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhswfs001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhswfs001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhswfs001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhswfs001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhswfs001 = 0; 
    save_Edt_Cnt_Mhswfs001 = 0; 
    save_Del_Cnt_Mhswfs001 = 0; 
    dhxGridMhswfs001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhswfs001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhswfs001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhswfs001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhswfs001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhswfs001 += 1; 
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
        save_All_Sta_Mhswfs001 = 0; 
        if(save_Add_Cnt_Mhswfs001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhswfs001 + "건";
            save_All_Sta_Mhswfs001 = 1; 
        } 
        if(save_Edt_Cnt_Mhswfs001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhswfs001 + "건"; 
        } 
        if(save_Del_Cnt_Mhswfs001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhswfs001 + "건"; 
            save_All_Sta_Mhswfs001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhswfs001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhswfs001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhswfs001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhswfs001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhswfs001_Send = function() {
    if(fn_GridValidation(dhxGridMhswfs001, dhxDataProcessorMhswfs001)) {
        dhxDataProcessorMhswfs001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhswfs001 = function() {
    var rowId = dhxGridMhswfs001.getSelectedRowId();
    var state = dhxDataProcessorMhswfs001.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMhswfs001.getRowIndex(rowId);
        dhxGridMhswfs001.deleteRow(rowId);
        dhxGridMhswfs001.selectRow(rowNum);
        fn_FindMhswfs001();
    }
    else dhxDataProcessorMhswfs001.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhswfs001 = function () {
    var titMhswfs001 = '학자금신청'; /* gf_LocaleTrans('default', 'titMhswfs001') */
    var jsonParameter = {
        reqstNo : gf_FormGetValue('searchFormMhswfs001', 'reqstNo', 'text'),
        empno : gf_FormGetValue('searchFormMhswfs001', 'empno', 'text')
    };
    var header = [[
        '신청번호' /* gf_LocaleTrans('default', 'titReqstNo') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '분기' /* gf_LocaleTrans('default', 'titQu') */,
        '자녀 명' /* gf_LocaleTrans('default', 'titChldrnNm') */,
        '학교 명' /* gf_LocaleTrans('default', 'titSchulNm') */,
        '학년' /* gf_LocaleTrans('default', 'titGrade') */,
        '수업료 금액' /* gf_LocaleTrans('default', 'titTutfeeAmt') */,
        '운영 지원 금액' /* gf_LocaleTrans('default', 'titOperSportAmt') */,
        '신청일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '지급일자' /* gf_LocaleTrans('default', 'titPymntDe') */,
        '비고 항목' /* gf_LocaleTrans('default', 'titRm') */,
        '승인 여부' /* gf_LocaleTrans('default', 'titConfmAt') */
    ]];
    var dataId = [[ 'reqstNo', 'empno', 'qu', 'chldrnNm', 'schulNm', 'grade', 'tutfeeAmt', 'operSportAmt', 'reqstDe', 'pymntDe', 'rm', 'confmSttusCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhswfs001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhswfs001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhswfs001/excelMhswfs001', jsonParameter);
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
    $('#saveFormMhswfs001 #reqstNoSaveFormMhswfs001').parent().append(
    '<div class="error" id="reqstNoSaveFormMhswfs001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhswfs001 #empnoSaveFormMhswfs001').parent().append(
    '<div class="error" id="empnoSaveFormMhswfs001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhswfs001 = function(reqstNo, empno){
    if(!gf_IsNull(reqstNo) && !gf_IsNull(empno)) {
        var jsonParameter = {
            reqstNo : reqstNo,
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mhswfs001/findMhswfs001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.reqstNo) && gf_IsNull(data.empno)) {
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
    var state = dhxDataProcessorMhswfs001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhswfs001').validate().form()){
                if(state == 'inserted') {
                    var reqstNo = gf_FormGetValue('saveFormMhswfs001', 'reqstNo', 'text');
                    var empno = gf_FormGetValue('saveFormMhswfs001', 'empno', 'text');
                    if(fn_CheckDupMhswfs001(reqstNo, empno)) return true;
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
    var checkReqstNo;
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhswfs001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhswfs001 == 'deleted') {
        save_Row_Num_Mhswfs001 = 0;
        save_Row_Ids_Mhswfs001 = "";
    } else if(save_Row_Sta_Mhswfs001 == 'inserted') {
        save_Row_Num_Mhswfs001 = rowNum;
        save_Row_Ids_Mhswfs001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhswfs001 = rowNum;
        save_Row_Ids_Mhswfs001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'reqstNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstNo');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkReqstNo = gf_DhxGetValue(dhxGridObjet, rowId, 'reqstNo', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkReqstNo, checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var reqstNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'reqstNo', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((reqstNo == checkReqstNo) && (empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstNo');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhswfs001( checkReqstNo, checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'reqstNo');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
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
        dhxGridMhswfs001.selectRowById(validFalseFistRowId);
        fn_FindMhswfs001();
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
	var reqstDe = gf_FormGetValue('saveFormMhswfs001', 'reqstDe', 'text');
	$.each( data.data, function( key, value ) {
		if (gf_IsNull(reqstDe)){
		uploadedFileKeysPrg3.push(value.atchFileId);				
		uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
		
		atchFileList.push('<tr style=\"border:0\">');
		atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');
		
		idx++;
	}else{
			uploadedFileKeysPrg3.push(value.atchFileId);				
			uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
			
			atchFileList.push('<tr style=\"border:0\">');
			atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
			atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
			atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3" disabled><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');
			
			idx++;
		}
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
		gf_FormSetValue('saveFormMhswfs001', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormMhswfs001', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
    callbacks.fire();
	}
};
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMhswfs001', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMhswfs001', 'deptCodeNm', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}
function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
  if(!gf_IsNull(data.data.records) && totCnt == 1){
  	//단건
  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMhswfs001', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMhswfs001', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMhswfs001","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMhswfs001', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMhswfs001', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMhswfs001', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMhswfs001', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMhswfs001', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMhswfs001', 'korNm', 'text');
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
	 		gf_FormSetValue('searchFormMhswfs001', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhswfs001', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMhswfs001', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhswfs001', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMhswfs001', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMhswfs001', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMhswfs001","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMhswfs001","empno","korNm", gBplcCode, "Y");
	  	}
  	}
	
}

var fn_Reset = function(){
		// 체크된 항목을 가져온다
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhswfs001, 'chk');
	        // 체크된 항목 반복문
			$(rowIds).each(function(index, rowId){
				// 선택된 값마다 해당 지급일자 Set 해준다.
				dhxGridMhswfs001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhswfs001, 'confmSttusCode')).setValue("001");
				// Set이 된 이후 그리드 업데이트 실행 해준다.
				dhxDataProcessorMhswfs001.setUpdated(rowId, true, 'updated');
			});
		gf_DivMsgAlert("취소되었습니다.");
}


