/**
 *    프로그램       : 급여일괄등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.07
 *    사용테이블      : MPS_SALARY_BNDE_REGIST
 * sourceGen version : 2020.07.16.01 (2020.08.07)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal016 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal016 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal016 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal016 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal016 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal016 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal016 = 0;  //그리드 삭제 수량 
var dhxGridMpscal016;  //그리드 객체
var eventIdMpscal016 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpscal016;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal016();
    if(cf_SetComponentsMpscal016()){
       cf_SetEventListenerMpscal016();
       cf_InitFormMpscal016();
       cf_SetBindingMpscal016();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal016 = function() {
    gf_SetMenuPath();
    $("#saveFormMpscal016").validate({ errorElement: 'div', ignore: '' });
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    gf_ComboCode('divComboHffsSe', 'searchComboHffsSe', 'searchComboHffsSe', 'search', 'C278', '' , '', '', 'asc', '');
    
//    var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
//    var dataComCode = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
    
//    dataComCode.data.forEach(function(sal){
//        dataSalarytyCode[sal.code] = sal.codeNm;
//    });
    
     //액셀업로드버튼이벤트
    fn_FileUploadBtnEvent();
    
    $("#deptCodeNm").focus();
    
};

var cf_SetComponentsMpscal016 = function() {
    var dhxGridMpscal016HeaderInfo = [];
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscal016" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('적용 년월', '0', 'left', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('지급 순번', '0', 'right', 'int', 'ro', true, 'pymntSn', '', '')); /* gf_LocaleTrans('default', 'titPymntSn') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '150', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('급여항목유형', '150', 'center', 'str', 'coro', false, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '150', 'center', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('급여항목코드', '0', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('성명', '150', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('직급', '150', 'center', 'str', 'ro', false, 'clsfCodeNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('지급금액', '150', 'right', 'int', 'edn', false, 'pymntAmt', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'edn', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal016 = gf_MakeDhxGrid('dataListMpscal016', dhxGridMpscal016HeaderInfo, true, false, false);
    dhxGridMpscal016.enableAutoWidth(false);
    dhxGridMpscal016.setEditable(true);

    //숫자 콤마부여하기 
    dhxGridMpscal016.setNumberFormat("0,000", dhxGridMpscal016.getColIndexById("pymntAmt"), ".", ",");
    dhxGridMpscal016.enableEditEvents(true, false, false); // 원클릭, 더블클릭, F2key
    dhxGridMpscal016.setColumnMinWidth(40,12); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스  
    
    var salarytyCodejsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"asc" };
    var salarytyCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', salarytyCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscal016, dhxGridMpscal016.getColIndexById("salarytyCode"), salarytyCodedataSource.data, "sel");
    return true; 
};

var cf_SetEventListenerMpscal016 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscal016 = gf_GridDetachEvent(dhxGridMpscal016, eventIdMpscal016);
    eventId = dhxGridMpscal016.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal016();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal016.getColumnsNum();
            var rowNum = dhxGridMpscal016.getRowsNum();
            var selectedId = dhxGridMpscal016.getSelectedRowId();
            var ind        = dhxGridMpscal016.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal016.getRowIndex(selectedId);
            var type       = dhxGridMpscal016.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal016.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal016.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal016.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal016.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal016.getSelectedRowId();
            var ind        = dhxGridMpscal016.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal016.getRowIndex(selectedId);
            var type       = dhxGridMpscal016.getColType(ind);
            dhxGridMpscal016.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal016.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal016.getSelectedRowId();
            var ind        = dhxGridMpscal016.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal016.getRowIndex(selectedId);
            var type       = dhxGridMpscal016.getColType(ind);
            dhxGridMpscal016.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal016.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal016.push(eventId);
    eventId = dhxGridMpscal016.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal016SortGridList(ind, type, direction); 
    });
    eventIdMpscal016.push(eventId);
    eventId = dhxGridMpscal016.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal016.push(eventId);
    eventId = dhxGridMpscal016.attachEvent("onRowSelect", function(rowId, cInd){
    	if(cInd == 4 ){
    		fn_PopUpWindows(rowId);
    	}
    	if(cInd ==6 ){
    		fn_SalaryItem();
    	}
    	if(cInd == 8  || cInd == 9 || cInd == 10){
    		fn_PopUpEmpWindows();
    	}
    });
    eventIdMpscal016.push(eventId);
    eventId = dhxGridMpscal016.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscal016.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscal016').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        var pymntSn = gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text');
        var closAt = gf_FormGetValue('searchFormMpscal016', 'closAt', 'text');
        if(gf_IsNull(pymntSn)){
            gf_DivMsgAlert('지급일자를 선택해 주세요.');
            return false;
        } else if(closAt == '1'){
        	gf_DivMsgAlert("급여마감 시 수정이 불가능 합니다. <br/>지급일자 재조회 하셔야 합니다.");
            }else if(closAt == '0'){
            	fn_AddMpscal016()
            }
    });
    $('#btnSaveMpscal016').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpscal016();
    });
    $('#btnRemoveMpscal016').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var pymntSn = gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text');
        if(gf_IsNull(pymntSn)){
            gf_DivMsgAlert('지급일자를 선택해 주세요.');
            return false;
        }else{
        fn_RemoveMpscal016();
        }
    });
    $('#btnExcelMpscal016').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var pymntSn = gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text');
        if(gf_IsNull(pymntSn)){
            gf_DivMsgAlert('지급일자를 선택해 주세요.');
            return false;
        }else{
        	fn_ExcelMpscal016();
        }
    });
    $('#btnSearchMpscal016').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal016('');
    });
    $('#btnResetMpscal016').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscal016();
        dhxGridMpscal016.clearAll();
        gf_NoFoundDataOnGridMsg('dataListMpscal016');
    });
    // 기타 이벤트 ========================================================================================== 
    $('#checkAllMpscal016').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal016, $('#checkAllMpscal016').prop('checked'), 'chk');
    });
    $('#searchFormMpscal016 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
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
        		$('#btnSearchMpscal016').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpscal016').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
 // 액셀 양식 다운로드
    $('#btnExcelDownload').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelSampleMpscal016();
    });
    // 지급날짜 조회 팝업
    $('#btnPymntDeSearch').unbind('click').bind('click', function(event){
		gf_PymntDePopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");  
    });
    
  //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMpscal016","empno","korNm", "", "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#korNm').focus();
			fn_SearchEmpCode();
	    }else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal016', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    }else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal016', 'empno', '', 'text');
	    }
    });
    
    //부서 선택 Popup
	$('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMpscal016","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal016', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal016', 'deptCode', '', 'text');
	    }
    });
};

var cf_InitFormMpscal016 = function() {
    $('#searchFormMpscal016').resetForm();
};

var cf_SetBindingMpscal016 = function() {
	gf_NoFoundDataOnGridMsg('dataListMpscal016');
	gf_FormSetValue('searchFormMpscal016', 'hffsSe','J01', 'combo') //재직구분을 첫 화면 표시할때 '재직'으로 기본 설정
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscal016 = function(userId) {
	var pymntSn = gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text');
    if(gf_IsNull(pymntSn)){
        gf_DivMsgAlert('지급일자를 선택해 주세요.');
        return false;
    }
    var jsonParameter = {
    		empno : gf_FormGetValue('searchFormMpscal016', 'empno', 'text'),
            deptCode : gf_FormGetValue('searchFormMpscal016', 'deptCode', 'text'),
            pymntSn : gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text'),
            hffsSe : gf_FormGetValue('searchFormMpscal016', 'searchComboHffsSe', 'combo'), //재직구분
            pymntSn : gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text')
    };
    gf_Transaction(userId, 'mpscal016/searchMpscal016', jsonParameter, 'fn_CallbackSearchMpscal016', false, 'GET');
};

var fn_CallbackSearchMpscal016 = function(strSvcID, targetID, data) {
    //dhxGridMpscal016.clearAll();
    dhxGridMpscal016.destructor();
    if(cf_SetComponentsMpscal016()){ 
        fn_DhxDataProcessorMpscal016(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpscal016');
            dhxGridMpscal016.parse(data.data.records, 'js');
            var closAt = gf_FormGetValue('searchFormMpscal016', 'closAt', 'text');
            if(closAt == '1'){
            	// button 이 아니라 a 태그라서 css 마우스포인터 none 처리 : 비활성화
            	$("#btnSaveMpscal016").css({ 'pointer-events': 'none' });
            	$("#btnAddMpscal016").css({ 'pointer-events': 'none' });
            	$("#btnRemoveMpscal016").css({ 'pointer-events': 'none' });
            	gf_DivMsgAlert("급여마감 시 수정이 불가능 합니다. <br/>지급일자 재조회 하셔야 합니다.");
            	
//            	dhxGridMpscal016.forEachRow(function(rowId) {
//            		dhxGridMpscal016.cells(rowId,1).setDisabled(true); // 체크박스
//            		dhxGridMpscal016.cells(rowId,6).setDisabled(true); // 지급일자
//            		dhxGridMpscal016.cells(rowId,7).setDisabled(true); // 급여항목유형
//            		dhxGridMpscal016.cells(rowId,8).setDisabled(true); // 급여항목
//            		dhxGridMpscal016.cells(rowId,10).setDisabled(true); // 사원번호
//            		dhxGridMpscal016.cells(rowId,11).setDisabled(true); // 성명
//            		dhxGridMpscal016.cells(rowId,12).setDisabled(true); // 지급금액
//         	    });
            	
            }else if(closAt == '0'){
            	// button 이 아니라 a 태그라서 css 마우스포인터 auto 처리 : 활성화
            	$("#btnAddMpscal016").css({ 'pointer-events': 'auto' });
            	$("#btnSaveMpscal016").css({ 'pointer-events': 'auto' });
            	$("#btnRemoveMpscal016").css({ 'pointer-events': 'auto' });
            }
            
            if(save_Row_Ids_Mpscal016 == 0 && save_All_Sta_Mpscal016 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpscal016.selectRow(0); 
            } else if(save_Row_Sta_Mpscal016 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpscal016.selectRow(0);
            } else if(save_All_Sta_Mpscal016 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpscal016.selectRow(save_Row_Num_Mpscal016); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpscal016.selectRow(save_Row_Num_Mpscal016);   //개발자 수정 필요  
                //var findCell = dhxGridMpscal016.findCell(save_Row_Ids_Mpscal016, gf_GetDhxGridColumId(dhxGridMpscal016,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpscal016.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpscal016.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpscal016');
        }
        $("#spanCntSearchFormMpscal016").text(data.data.records.length);
        cf_SetEventListenerMpscal016();
    } 
};
var fn_DhxDataProcessorMpscal016 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscal016 = new dataProcessor(gv_ContextPath+'/mpscal016/saveMpscal016'); //lock feed url
    dhxDataProcessorMpscal016.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscal016.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscal016.init(dhxGridMpscal016); //link dataprocessor to the grid
    dhxDataProcessorMpscal016.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscal016.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscal016.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscal016();
                    $("#checkAllMpscal016").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 추가(신규) 
 */
var fn_AddMpscal016 = function() {
    dhxGridMpscal016.clearSelection();
    fn_DhxDataProcessorMpscal016(); 
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //empno
    initValueArr.push(''); //salarytyCode
    initValueArr.push(''); //salaryitemCode
    initValueArr.push(''); //applcYm
    initValueArr.push(''); //pymntSn
    initValueArr.push(''); //pymntAmt
    initValueArr.push(''); //rm
    initValueArr.push(''); //applcAt
    initValueArr.push(''); //applcAt
    initValueArr.push(''); //applcAt
    initValueArr.push(''); //applcAt
    initValueArr.push(''); //applcAt
    initValueArr.push(''); //applcAt
    dhxGridMpscal016.addRow(dhxGridMpscal016.uid(), initValueArr, 0);
    dhxGridMpscal016.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscal016');
    $('#btnPopEmpSearchMpscal016').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpscal016SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal016, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal016', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal016', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal016, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal016.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal016', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal016', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal016, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal016.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal016', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal016', 'sortColumId', '', 'text'); 
            dhxGridMpscal016.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal016.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal016', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal016', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal016, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal016 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpscal016 = 0; 
    save_Edt_Cnt_Mpscal016 = 0; 
    save_Del_Cnt_Mpscal016 = 0; 
    dhxGridMpscal016.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscal016.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscal016.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpscal016 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpscal016 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpscal016 += 1; 
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
        save_All_Sta_Mpscal016 = 0; 
        if(save_Add_Cnt_Mpscal016 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpscal016 + "건";
            save_All_Sta_Mpscal016 = 1; 
        } 
        if(save_Edt_Cnt_Mpscal016 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpscal016 + "건"; 
        } 
        if(save_Del_Cnt_Mpscal016 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpscal016 + "건"; 
            save_All_Sta_Mpscal016 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscal016(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscal016(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscal016 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscal016_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscal016_Send = function() {
    if(fn_GridValidation(dhxGridMpscal016, dhxDataProcessorMpscal016)) {
        dhxDataProcessorMpscal016.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscal016 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal016, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscal016.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscal016.getState(rowId);
            if(dhxGridMpscal016.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal016, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscal016.getRowIndex(rowId);
                    dhxGridMpscal016.deleteRow(rowId);
                    dhxGridMpscal016.selectRow(rowNum);
                }
                else dhxDataProcessorMpscal016.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal016 = function () {
    var titMpscal016 = '급여일괄등록'; /* gf_LocaleTrans('default', 'titMpscal016') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscal016', 'empno', 'text'),
        salarytyCode : gf_FormGetValue('searchFormMpscal016', 'salarytyCode', 'text'),
        salaryitemCode : gf_FormGetValue('searchFormMpscal016', 'salaryitemCode', 'text'),
        applcYm : gf_FormGetValue('searchFormMpscal016', 'applcYm', 'text'),
        pymntSn : gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text')
    };
    var header = [[
        '지급일자' /* gf_LocaleTrans('default', 'titEmpno') */,
        '사원번호',
        '사원명',
        '직급',
        '급여유형' /* gf_LocaleTrans('default', 'titSalarytyCode') */,
        '급여항목' /* gf_LocaleTrans('default', 'titSalaryitemCode') */,
        '지급 금액' /* gf_LocaleTrans('default', 'titPymntAmt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'pymntDe','empno', 'korNm','clsfCodeNm','salarytyCode', 'salaryitemNm', 'pymntAmt', 'rm']];
    var dataAlign = [[ 'center','center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titMpscal016 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal016;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal016/excelMpscal016', jsonParameter);
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
    $('#saveFormMpscal016 #empnoSaveFormMpscal016').parent().append(
    '<div class="error" id="empnoSaveFormMpscal016-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal016 #salarytyCodeSaveFormMpscal016').parent().append(
    '<div class="error" id="salarytyCodeSaveFormMpscal016-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal016 #salaryitemCodeSaveFormMpscal016').parent().append(
    '<div class="error" id="salaryitemCodeSaveFormMpscal016-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal016 #applcYmSaveFormMpscal016').parent().append(
    '<div class="error" id="applcYmSaveFormMpscal016-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal016 #pymntSnSaveFormMpscal016').parent().append(
    '<div class="error" id="pymntSnSaveFormMpscal016-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal016 = function(empno, salarytyCode, salaryitemCode, applcYm, pymntSn){
    if(!gf_IsNull(empno) && !gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode) && !gf_IsNull(applcYm) && !gf_IsNull(pymntSn)) {
        var jsonParameter = {
            empno : empno,
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
            applcYm : applcYm,
            pymntSn : pymntSn
        };
        var dataSource = gf_NoAsyncTransaction('mpscal016/findMpscal016', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.salarytyCode) && gf_IsNull(data.salaryitemCode) && gf_IsNull(data.applcYm) && gf_IsNull(data.pymntSn)) {
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
    var checkEmpno;
    var checkSalarytyCode;
    var checkSalaryitemCode;
    var checkApplcYm;
    var checkPymntSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal016 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpscal016 = 0;
        save_Row_Ids_Mpscal016 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpscal016 = rowNum;
        save_Row_Ids_Mpscal016 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal016 = rowNum;
        save_Row_Ids_Mpscal016 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'popPymntDe', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'popPymntDe');
//                    valid = false;
//                } //지급일자
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                    valid = false;
                } // 급여항목유형
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemNm', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemNm');
//                    valid = false;
//                } // 급여항목
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'korNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'korNm');
                    valid = false;
                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'clsfCodeNm', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCodeNm');
//                    valid = false;
//                } // 직급
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'pymntAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntAmt');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkSalarytyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid');
                    checkSalaryitemCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid');
                    checkApplcYm = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid');
                    checkPymntSn = gf_DhxGetValue(dhxGridObjet, rowId, 'pymntSn', 'grid');
                    if(!gf_IsNull(checkEmpno, checkSalarytyCode, checkSalaryitemCode, checkApplcYm, checkPymntSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var salarytyCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salarytyCode', 'grid');
                            var salaryitemCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salaryitemCode', 'grid');
                            var applcYm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYm', 'grid');
                            var pymntSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'pymntSn', 'grid');
                            if(((empno == checkEmpno) && (salarytyCode == checkSalarytyCode) && (salaryitemCode == checkSalaryitemCode) && (applcYm == checkApplcYm) && (pymntSn == checkPymntSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscal016( checkEmpno, checkSalarytyCode, checkSalaryitemCode, checkApplcYm, checkPymntSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
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
        dhxGridMpscal016.selectRowById(validFalseFistRowId);
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
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMpscal016', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpscal016', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormMpscal016', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMpscal016', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMpscal016","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpscal016', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal016', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpscal016', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal016', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpscal016', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal016', 'korNm', 'text');
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
	 		gf_FormSetValue('searchFormMpscal016', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal016', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMpscal016', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal016', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpscal016', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMpscal016', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpscal016","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpscal016","empno","korNm", gBplcCode, "Y");
	  	}
  	}
	
}

var fn_gridSearchEmpButton = function( rId ) {	
	gf_PymntDePopup('', '', '', '',gBplcCode, 'N', 'fn_CallbackGridSearchEmpButton');
};
var fn_CallbackGridSearchEmpButton = function(data, rId) {
	var rId = dhxGridMpscal016.getSelectedRowId();
	if(!gf_IsNull(data.pymntDe)) {
		gf_DhxSetValue(dhxGridMpscal016, rId, 'applcYm', data.applcYm, 'grid');
		gf_DhxSetValue(dhxGridMpscal016, rId, 'salarytyCodeNm', data.salarytyCodeNm, 'grid');
		gf_DhxSetValue(dhxGridMpscal016, rId, 'pymntDe', data.pymntDe, 'grid');
	}
};

var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.pymntDe)) {
		gf_FormSetValue('searchFormMpscal016', 'pymntDe', data.pymntDe, 'text');
		gf_FormSetValue('searchFormMpscal016', 'salarytyCodeNm', data.salarytyCodeNm, 'text');
		gf_FormSetValue('searchFormMpscal016', 'pymntSn', data.pymntSn, 'hidden');
		gf_FormSetValue('searchFormMpscal016', 'pymntDtls', data.pymntDtls, 'text');
		gf_FormSetValue('searchFormMpscal016', 'closAt', data.closAt, 'text');
		gf_FormSetValue('searchFormMpscal016', 'applcYm', data.applcYm, 'text');
	}
};
/**
* 엑셀 업로드
*/
//엑셀 업로드 양식
var fn_ExcelSampleMpscal016 = function () {
  var titMpscal016 = '급여등록양식'; /* gf_LocaleTrans('default', 'titMhshra001') */
  var jsonParameter = {
      empno : '999999',
      pymntSn : gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text')
  };
  var header = [[
  	'지급순번' /* gf_LocaleTrans('default', 'titEmpno') */,
  	'지급일자' /* gf_LocaleTrans('default', 'titEmpno') */,
  	'급여항목유형' /* gf_LocaleTrans('default', 'titGnfdCode') */,
      '급여항목' /* gf_LocaleTrans('default', 'titGnfdDe') */,
      '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
      '성명' /* gf_LocaleTrans('default', 'titGnfdBeginDe') */,
      '지급금액' /* gf_LocaleTrans('default', 'titGnfdEndDe') */,
      '비고' /* gf_LocaleTrans('default', 'titGnfdEndDe') */
  ]];
  var dataId = [[ 'pymntSn','applcYm', 'salarytyCode', 'salaryitemCode','empno', 'korNm', 'pymntAmt', 'rm']];//,'pymntDe'
  var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
  var sheetNm = [[ titMpscal016 ]];
  var param = [[ $.param( jsonParameter ) ]];
  var fileNm = titMpscal016;
  jsonParameter = {
      headers : header,
      dataIds : dataId,
      dataAligns : dataAlign,
      sheetNms : sheetNm,
      fileNm : fileNm,
      params : param
  };
  gf_ExcelDown('mpscal016/excelMpscal016', jsonParameter);
};

//엑셀 데이터 확인
var fn_FileUploadBtnEvent = function(){
	
	$('#btnFileUpload1').unbind("click").bind("click",function(event){
		var pymntSn = gf_FormGetValue('searchFormMpscal016', 'pymntSn', 'text');
      if(gf_IsNull(pymntSn)){
          gf_DivMsgAlert('지급일자를 선택해 주세요. <br/> 액셀 작성 시 조회한 해당 지급일자를 입력해주세요.');
          return false;
      }
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
	    var maxRowNum = null;
	    var colTitle = "pymntSn|applcYm|salarytyCode|salaryitemCode|empno|korNm|pymntAmt|rm"; //|pymntDe
	    //var dhxGrid = dhxGridMpscal016;
	    var strCallbackFunc = "fn_CallbackExcelUpload";
		gf_ExcelUpload (startRowNum, maxRowNum, colTitle, dhxGridMpscal016, strCallbackFunc);
	});
};
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
var fn_CallbackExcelUpload = function(data) {
	if(!gf_IsNull(data.data)){
		var str_req = "";
		for(var j=0; j<data.data.length; j++){
			var pymntSn = data.data[j]["pymntSn"];
			var applcYm = data.data[j]["applcYm"];
			var salarytyCode = lpad(data.data[j]["salarytyCode"], 3, '0');
			salarytyCode = String(salarytyCode);
			var salaryitemCode = data.data[j]["salaryitemCode"];
			var empno = data.data[j]["empno"];
			var korNm = data.data[j]["korNm"];
			var pymntAmt = data.data[j]["pymntAmt"];
			var rm = data.data[j]["rm"];
			//var pymntDe = data.data[j]["pymntDe"];
			
			
			str_req +=  pymntSn+","+applcYm+ ", " +salarytyCode+ ", " +salaryitemCode+ ", "+empno+", " +korNm+ ", " +pymntAmt+ ", " +rm+ "|";
		}
			var jsonParameter = {
					str_req : str_req
		    };

			var dataTest = gf_NoAsyncTransaction('mpscal016/checkDataMpscal016', jsonParameter, 'POST');
			if(!gf_IsNull(dataTest.data.records)){
				dhxGridMpscal016.clearAll();
				gf_NoFoundDataOnGridMsgRemove('dataListMpscal016');
				dhxGridMpscal016.parse(dataTest.data.records, 'js');
				dhxGridMpscal016.selectRow(0);
			}else{
				 gf_NoFoundDataOnGridMsg('dataListMpscal016');
			}
		    	dhxGridMpscal016.forEachRow(function (rId){
		        	dhxDataProcessorMpscal016.setUpdated(rId, true, 'inserted');
		    		state = dhxDataProcessorMpscal016.getState(rId);
		        });
	}
}

var fn_PopUpWindows =function (rowId){
	gf_PymntDePopup('','','','', gBplcCode, "N", "fn_CallbackGridPopComp");
}
var fn_PopUpEmpWindows =function (){
	gf_EmpPopup("","","", gBplcCode, "Y", fn_CallbackCridEmpPopComp);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
}
var fn_CallbackGridPopComp = function(data, rowId) {
	var closAt = data.closAt
	if(closAt == '1'){
    	// button 이 아니라 a 태그라서 css 마우스포인터 none 처리 : 비활성화
    	$("#btnSaveMpscal016").css({ 'pointer-events': 'none' });
    	gf_DivMsgAlert("급여마감 시 수정이 불가능 합니다. <br/>지급일자 재조회 하셔야 합니다.");
    }else if(closAt == '0' && !gf_IsNull(data.pymntDe)){
    	// button 이 아니라 a 태그라서 css 마우스포인터 auto 처리 : 활성화
    	$("#btnSaveMpscal016").css({ 'pointer-events': 'auto' });
    	//dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,'pymntDe')).setValue(data.popPymntDe);
    	dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,"pymntDe")).setValue(data.pymntDe);
		dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,'pymntSn')).setValue(data.pymntSn);
		dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,'applcYm')).setValue(data.applcYm);
//        	status = dhxDataProcessor3.getState(id);
//		var rowId = dhxGridMpscal016.getSelectedRowId();
//		dhxDataProcessorMpscal016.setUpdated(rowId, true,"updated");
		
    }  
	//
	
};
var fn_CallbackCridEmpPopComp = function(data) {
	if(!gf_IsEmptyObject(data)){
		dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,'empno')).setValue(data.empno);
		dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,'korNm')).setValue(data.korNm);
		dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,'clsfCodeNm')).setValue(data.clsfCodeNm);
	}
};

//급여항목 
var fn_SalaryItem= function ( ) {
	gf_SalaryitemPopup('','','','', '', '', "fn_CallbackGridSearchSalaryButton");
}
var fn_CallbackGridSearchSalaryButton = function(data){
	if(!gf_IsEmptyObject(data)){
		dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,'salaryitemNm')).setValue(data.salaryitemNm);
		dhxGridMpscal016.cells(dhxGridMpscal016.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal016,'salaryitemCode')).setValue(data.salaryitemCode);
	}
}