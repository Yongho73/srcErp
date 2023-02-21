/**
 *    프로그램       : 급여대상자생성 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.03
 *    사용테이블      : MPS_SALARY_TRGTER
 * sourceGen version : 2020.06.29.01 (2020.07.03)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal013 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal013 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal013 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal013 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal013 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal013 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal013 = 0;  //그리드 삭제 수량 
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal013();
    cf_SetComponentsMpscal013();
    cf_SetEventListenerMpscal013();
    cf_InitFormMpscal013();
    cf_SetBindingMpscal013();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal013 = function() {
	gf_SetMenuPath();
    $("#saveFormMpscal013").validate({ errorElement: 'div', ignore: '' });
    
    // 조회 에서 사업장 콤보 박스 가져오기 
    //gf_MakeComboBasic('divComboBplcCode', 'bplcCode', 'search', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '1000');
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    //사원구분
    gf_ComboCode('divComboEmpl', 'emplSe', 'emplSe', 'search', 'C068', '' , '', '', 'asc', '');
    //재직구분
    gf_ComboCode('divComboHffsSeBox', 'hffsSe', 'hffsSe', 'search', 'C278', '' , '', '', 'asc', '');
    
    //직급
    gf_MakeComboBasic('divComboClsfCodeBox', 'clsfCode', 'search', '', 'mhshrb001/searchMhshrb001ClsfCode', '', 'clsfCode', 'clsfNm', '');
    
    $("#deptCodeNm").focus();
};

var dhxGridMpscalEmp;
var dhxGridMpscal013;
var cf_SetComponentsMpscal013 = function() {
	// 인사 목록
    var dhxGridMpscpEmpListInfo = [];
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); // 번호
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscalEmp" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('직급', '150', 'center', 'str', 'ro', false, 'clsfCodeNm', '','')); // 직급
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('직급', '150', 'center', 'str', 'ro', true, 'clsfCode', '','')); // 직급
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('성명', '150', 'center', 'str', 'ro', false, 'korNm', '')); // 한글 
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('사원번호', '150', 'center', 'str', 'ro', false, 'empno', '')); // 사원번호
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('부서번호', '150', 'center', 'str', 'ro', true, 'deptCode', '')); // 사원번호
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('부서', '*', 'center', 'str', 'ro', false, 'deptCodeNm', '')); // 부서
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('지급일자', '0', 'center', 'str', 'ro', true, 'applcYm', '')); // 지급일자
    dhxGridMpscpEmpListInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '')); // 지급순번
    dhxGridMpscalEmp = gf_MakeDhxGrid('dataListMpscalEmp', dhxGridMpscpEmpListInfo, true, false, false);
    dhxGridMpscalEmp.enableAutoWidth(false);
    dhxGridMpscalEmp.setEditable(true);
    
    var dhxGridMpscal013HeaderInfo = [];
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscal013" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('직급', '80', 'center', 'str', 'ro', false, 'clsfCodeNm', '', '')); /* gf_LocaleTrans('default', 'titClsfCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('성명', '80', 'center', 'str', 'ro', false, 'korNm', '')); // 한글
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('부서', '*', 'center', 'str', 'ro', false, 'deptCodeNm', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('계좌구분', '0', 'center', 'str', 'coro', true, 'acnutSeCode', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('은행명', '80', 'center', 'str', 'coro', false, 'bankCode', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '150', 'center', 'str', 'ro', false, 'acnutNo', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('적용 년월', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('지급 순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '', '')); /* gf_LocaleTrans('default', 'titPymntSn') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('직원구분코드', '0', 'center', 'str', 'ro', true, 'empSeCode', '', '')); /* gf_LocaleTrans('default', 'titEmpSeCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('예금주명', '0', 'center', 'str', 'ro', true, 'dpstrNm', '', '')); /* gf_LocaleTrans('default', 'titDpstrNm') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '0', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('직책코드', '0', 'center', 'str', 'ro', true, 'rspofcCode', '', '')); /* gf_LocaleTrans('default', 'titRspofcCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('직무코드', '0', 'center', 'str', 'ro', true, 'dtyCode', '', '')); /* gf_LocaleTrans('default', 'titDtyCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('호봉코드', '0', 'center', 'str', 'ro', true, 'srclsCode', '', '')); /* gf_LocaleTrans('default', 'titSrclsCode') */
    dhxGridMpscal013HeaderInfo.push(gf_MakeDhxGridHeader('직종코드', '0', 'center', 'str', 'ro', true, 'jssfcCode', '', '')); /* gf_LocaleTrans('default', 'titJssfcCode') */
    dhxGridMpscal013 = gf_MakeDhxGrid('dataListMpscal013', dhxGridMpscal013HeaderInfo, true, false, false);
    dhxGridMpscal013.enableAutoWidth(false);
    dhxGridMpscal013.setEditable(true);
    
    // 은행코드
    var bankCodejsonParameter = {codekindCode : "C010",exceptCode :"",sortOrder :"asc" };
    var bankCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', bankCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscal013, dhxGridMpscal013.getColIndexById("bankCode"), bankCodedataSource.data, "sel");
    // 계좌구분코드
    var acnutSeCodejsonParameter = {codekindCode : "C471",exceptCode :"",sortOrder :"asc" };
    var acnutSeCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', acnutSeCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscal013, dhxGridMpscal013.getColIndexById("acnutSeCode"), acnutSeCodedataSource.data, "sel");
    
};

var eventIdMpscal013 = [];
var cf_SetEventListenerMpscal013 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscal013 = gf_GridDetachEvent(dhxGridMpscal013, eventIdMpscal013);
    eventId = dhxGridMpscal013.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal013();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal013.getColumnsNum();
            var rowNum = dhxGridMpscal013.getRowsNum();
            var selectedId = dhxGridMpscal013.getSelectedRowId();
            var ind        = dhxGridMpscal013.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal013.getRowIndex(selectedId);
            var type       = dhxGridMpscal013.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal013.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal013.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal013.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal013.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal013.getSelectedRowId();
            var ind        = dhxGridMpscal013.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal013.getRowIndex(selectedId);
            var type       = dhxGridMpscal013.getColType(ind);
            dhxGridMpscal013.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal013.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal013.getSelectedRowId();
            var ind        = dhxGridMpscal013.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal013.getRowIndex(selectedId);
            var type       = dhxGridMpscal013.getColType(ind);
            dhxGridMpscal013.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal013.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal013.push(eventId);
    eventId = dhxGridMpscal013.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal013SortGridList(ind, type, direction); 
    });
    eventIdMpscal013.push(eventId);
    eventId = dhxGridMpscal013.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal013.push(eventId);
    eventId = dhxGridMpscal013.attachEvent("onRowSelect", function(rId, cInd){
    	if(cInd == 6 || cInd == 7 ){
    		fn_Acnut("","","", "", gBplcCode, '', "fn_CallbackPopup");
    	}
    });
    eventIdMpscal013.push(eventId);
    eventId = dhxGridMpscal013.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscal013.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscal013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscal013()
    });
    $('#btnSaveMpscal013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpscal013();
    });
    $('#btnRemoveMpscal013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscal013();
    });
    $('#btnExcelMpscal013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscal013();
    });
    $('#btnSearchMpscal013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
		fn_SearchMpscalEmp();
		fn_SearchMpscal013();
    });
    $('#btnResetMpscal013').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        dhxGridMpscalEmp.clearAll();
        dhxGridMpscal013.clearAll();
        cf_InitFormMpscal013();
        gf_NoFoundDataOnGridMsg('dataListMpscalEmp');
        gf_NoFoundDataOnGridMsg('dataListMpscal013');
        gf_FormSetValue('searchFormMpscal013', 'hffsSe','J01', 'combo') //재직구분을 첫 화면 표시할때 '재직'으로 기본 설정
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpscal013').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal013, $('#checkAllMpscal013').prop('checked'), 'chk');
    });
    $('#checkAllMpscalEmp').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscalEmp, $('#checkAllMpscalEmp').prop('checked'), 'chk');
        
    });
    $('#applcYmSearchFormMpscal013').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpscal013').click(); event.preventDefault(); }
    });
    $('#pymntSnSearchFormMpscal013').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpscal013').click(); event.preventDefault(); }
    });
    $('#empnoSearchFormMpscal013').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpscal013').click(); event.preventDefault(); }
    });
    $('#saveFormMpscal013').unbind('click').bind('click', function(event){ 
        gf_errorMsgClear();
    });
    $('#searchFormMpscal013 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
    	 if(event.charCode == 13) { 
         	if(this.id == "deptCode"){
         		return fn_SearchMhsEmpDeptCode();
         	} else if(this.id == "deptCodeNm"){
         		return fn_SearchMhsEmpDeptCode();
         	} else{
         		$('#btnSearchMpscal013').click(); event.preventDefault(); return true;
         	} 
         } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
         else return true; 
    }); 
    $('#saveFormMpscal013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#btnPymntDeSearch').unbind('click').bind('click', function(event){
		gf_PymntDePopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");  
    });
	
	//부서 선택 Popup
	$('#searchFormMpscal013 #btnDeptCodeSearchSearchFormMpscal013').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMpscal013","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal013', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal013', 'deptCode', '', 'text');
	    }
    });
	
};

var cf_InitFormMpscal013 = function() {
    $('#searchFormMpscal013').resetForm();
};

var cf_SetBindingMpscal013 = function() {
	gf_NoFoundDataOnGridMsg('dataListMpscalEmp');
	gf_NoFoundDataOnGridMsg('dataListMpscal013');
	gf_FormSetValue('searchFormMpscal013', 'hffsSe','J01', 'combo') //재직구분을 첫 화면 표시할때 '재직'으로 기본 설정
//	fn_SearchMpscalEmp('');
//	fn_SearchMpscal013('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscalEmp = function(userId) {
	var pymntSn = gf_FormGetValue('searchFormMpscal013', 'pymntSn', 'text');
    if(gf_IsNull(pymntSn)){
        gf_DivMsgAlert('지급일자를 선택해 주세요.');
        return false;
    }
	var bplcCode = gf_FormGetValue('searchFormMpscal013', 'bplcCode', 'combo');
	var emplSe = gf_FormGetValue('searchFormMpscal013', 'emplSe', 'combo');
	var hffsSe = gf_FormGetValue('searchFormMpscal013', 'hffsSe', 'combo');
	var deptCode = gf_FormGetValue('searchFormMpscal013', 'deptCode', 'text');
	var clsfCode = gf_FormGetValue('searchFormMpscal013', 'clsfCode', 'combo');
	var jssfcCode = gf_FormGetValue('searchFormMpscal013', 'jssfcCode', 'text');
	var deptCodeNm = gf_FormGetValue('searchFormMpscal013', 'deptCodeNm', 'text');
	
    var jsonParameter = {
    		pymntDe : gf_FormGetValue('searchFormMpscal013', 'pymntDe', 'text'),
    		bplcCode : bplcCode,
    		hffsSe : hffsSe,
    		emplSe : emplSe,
    		deptCode : deptCode,
    		clsfCode : clsfCode,
    		jssfcCode : jssfcCode,
    		pymntSn : gf_FormGetValue('searchFormMpscal013', 'pymntSn', 'text'),
    		deptCodeNm : deptCodeNm
    };
    
    gf_Transaction(userId, 'mpscal013/searchMpscalEmp', jsonParameter, 'fn_CallbackSearchMpscalEmp', false, 'GET');
    
};

var fn_SearchMpscal013 = function(userId) {
	var pymntSn = gf_FormGetValue('searchFormMpscal013', 'pymntSn', 'text');
    if(gf_IsNull(pymntSn)){
        gf_DivMsgAlert('지급일자를 선택해 주세요.');
        return false;
    }
	var bplcCode = gf_FormGetValue('searchFormMpscal013', 'bplcCode', 'combo');
	var salarytyCode  = gf_FormGetValue('searchFormMpscal013', 'salarytyCode', 'text'); 
	var applcYm = gf_FormGetValue('searchFormMpscal013', 'applcYm', 'text');
    var jsonParameter = {
    		pymntSn : gf_FormGetValue('searchFormMpscal013', 'pymntSn', 'text'),
    		applcYm : gf_FormGetValue('searchFormMpscal013', 'applcYm', 'text'),
    		bplcCode : bplcCode,
    		salarytyCode : salarytyCode
    };
    
    gf_Transaction(userId, 'mpscal013/searchMpscal013', jsonParameter, 'fn_CallbackSearchMpscal013', false, 'GET');
};

var dhxDataProcessorMpscalEmp;;
var fn_CallbackSearchMpscalEmp = function(strSvcID, targetID, data) {
	dhxGridMpscalEmp.clearAll();
    fn_DhxDataProcessorMpscalEmp(); 
    if(!gf_IsNull(data.data.records)){
    	gf_NoFoundDataOnGridMsgRemove('dataListMpscalEmp');
   	 	dhxGridMpscalEmp.parse(data.data.records, 'js');
    	dhxGridMpscalEmp.selectRow(0);
    	
    	 var closAt = gf_FormGetValue('searchFormMpscal013', 'closAt', 'text');
         if(closAt == '1'){
         	gf_DivMsgAlert("급여마감 시 수정이 불가능 합니다. <br/>지급일자 재조회 하셔야 합니다.");
         }
//        if(save_Row_Ids_Mpscal013 == 0 && save_All_Sta_Mpscal013 == 0){  //0번이고, 신규/삭제 없음 = 최초 
//            dhxGridMpscal013.selectRow(0); 
//        } else if(save_Row_Sta_Mpscal013 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
//            dhxGridMpscal013.selectRow(0);
//        } else if(save_All_Sta_Mpscal013 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
//            dhxGridMpscal013.selectRow(save_Row_Num_Mpscal013); 
//        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
//            dhxGridMpscal013.selectRow(save_Row_Num_Mpscal013);   //개발자 수정 필요  
//            //var findCell = dhxGridMpscal013.findCell(save_Row_Ids_Mpscal013, gf_GetDhxGridColumId(dhxGridMpscal013,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
//            //if(!gf_IsNull(findCell)) { 
//            //    dhxGridMpscal013.selectRowById(findCell[0][0]); 
//            //} else { 
//            //    dhxGridMpscal013.selectRow(0);
//            //} 
//        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscalEmp');
    }
    $("#spanCntSearchFormMpsEmp").text(data.data.records.length);
    cf_SetEventListenerMpscal013();
};
var dhxDataProcessorMpscal013;
var fn_CallbackSearchMpscal013 = function(strSvcID, targetID, data) {
    dhxGridMpscal013.clearAll();
    fn_DhxDataProcessorMpscal013(); 
    if(!gf_IsNull(data.data.records)){
    	gf_NoFoundDataOnGridMsgRemove('dataListMpscal013');
        dhxGridMpscal013.parse(data.data.records, 'js');
        data.data.records.forEach(function(row) {
        	if(gf_IsNull(row.acnutNo)){
        		gf_DivMsgAlert('지급대상자 '+row.deptCodeNm + '&nbsp;<br/>' + row.korNm +'님의 계좌를 등록해 주세요.'); //deptCodeNm 기술혁신팀 korNm 이름
        	}
        });
        var closAt = gf_FormGetValue('searchFormMpscal013', 'closAt', 'text');
        if(closAt == '1'){
        	gf_DivMsgAlert("급여마감 시 수정이 불가능 합니다. <br/>지급일자 재조회 하셔야 합니다.");
        }
        
        if(save_Row_Ids_Mpscal013 == 0 && save_All_Sta_Mpscal013 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscal013.selectRow(0); 
        } else if(save_Row_Sta_Mpscal013 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscal013.selectRow(0);
        } else if(save_All_Sta_Mpscal013 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscal013.selectRow(save_Row_Num_Mpscal013); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscal013.selectRow(save_Row_Num_Mpscal013);   //개발자 수정 필요  
            //var findCell = dhxGridMpscal013.findCell(save_Row_Ids_Mpscal013, gf_GetDhxGridColumId(dhxGridMpscal013,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscal013.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscal013.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscal013');
    }
    $("#spanCntSearchFormMpscal013").text(data.data.records.length);
    cf_SetEventListenerMpscal013();
};
var fn_DhxDataProcessorMpscalEmp = function() {
    // 그리드입력 데이터프로세스 정의
	dhxDataProcessorMpscalEmp = new dataProcessor('/xerp/mpscal013/saveMpscal013'); //lock feed url
	dhxDataProcessorMpscalEmp.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	dhxDataProcessorMpscalEmp.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
	dhxDataProcessorMpscalEmp.init(dhxGridMpscalEmp); //link dataprocessor to the grid
	dhxDataProcessorMpscalEmp.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
	dhxDataProcessorMpscalEmp.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
	dhxDataProcessorMpscalEmp.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert('지급 대상자가 추가 되었습니다');
                    fn_SearchMpscalEmp();
                    fn_SearchMpscal013();
                    $("#checkAllMpscalEmp").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};

var fn_DhxDataProcessorMpscal013 = function() {
    // 그리드입력 데이터프로세스 정의
	dhxDataProcessorMpscal013 = new dataProcessor('/xerp/mpscal013/saveMpscal013'); //lock feed url
	dhxDataProcessorMpscal013.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	dhxDataProcessorMpscal013.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
	dhxDataProcessorMpscal013.init(dhxGridMpscal013); //link dataprocessor to the grid
	dhxDataProcessorMpscal013.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
	dhxDataProcessorMpscal013.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
	dhxDataProcessorMpscal013.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert('급여대상자가 수정 되었습니다.');
                    fn_SearchMpscal013();
                    $("#checkAllMpscal013").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};


/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpscal013SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal013, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal013', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal013', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal013, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal013.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal013', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal013', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal013, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal013.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal013', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal013', 'sortColumId', '', 'text'); 
            dhxGridMpscal013.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal013.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal013', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal013', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal013, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal013 = function() {
	var state;
	// 그리드에 체크된 rowIds 값을 넣는다 
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscalEmp, 'chk');
	var applcYm = gf_FormGetValue('searchFormMpscal013', 'applcYm', 'text');
    if(gf_IsNull(applcYm)){
        gf_DivMsgAlert('지급일자를 선택해 주세요.');
        return false;
    } else if (gf_IsNull(rowIds)){
    	gf_DivMsgAlert('선택된 직원이 없습니다.');
        return false;
    }
    var closAt = gf_FormGetValue('searchFormMpscal013', 'closAt', 'text');
    if(closAt == 1){
    	$('#btnSaveMpscal013').unbind('click').bind('click', function() {
            gf_DivMsgAlert("급여마감 시 수정이 불가능 합니다. <br/>지급일자 재조회 하셔야 합니다.");
        });
    }else if(closAt == 0){
    	// rowIds 반복문을 실행한다.
    	$(rowIds).each(function(index, rowId){
    		// 그리드에 체크된 컬럼 값들을 체크 한다 
    	    dhxGridMpscalEmp.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscalEmp, 'applcYm')).setValue(gf_FormGetValue('searchFormMpscal013', 'applcYm', 'text'));
    	    dhxGridMpscalEmp.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscalEmp, 'pymntSn')).setValue(gf_FormGetValue('searchFormMpscal013', 'pymntSn', 'hidden'));
    	    dhxGridMpscalEmp.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscalEmp, 'deptCode')).setValue(gf_DhxGetValue(dhxGridMpscalEmp, rowId, 'deptCode',  'grid'));
    	    dhxGridMpscalEmp.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscalEmp, 'clsfCode')).setValue(gf_DhxGetValue(dhxGridMpscalEmp, rowId, 'clsfCode',  'grid'));
    	    // 업데이트 를 실행한다.
    	    dhxDataProcessorMpscalEmp.setUpdated(rowId, true, 'updated');
    	});
    	// 체크된 rowIds 들을 서버에 보낸다. 
        dhxDataProcessorMpscalEmp.sendData();
    }
}
//var confirmModalMpscal013 = function (msg) { 
//    var result = false; 
//    gf_DivMsgConfirm2(msg, function(confirm){ 
//        if(confirm){ 
//            result = true;
//            fn_SaveMpscal013_Send(); 
//        }else{ 
//            result = false; 
//        } 
//    }); 
//    return result; 
//} 
var fn_SaveMpscal013_Send = function() {
    if(fn_GridValidation(dhxGridMpscal013, dhxDataProcessorMpscal013)) {
        dhxDataProcessorMpscal013.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscal013 = function() {
	var state;
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal013, 'chk');
	var applcYm = gf_FormGetValue('searchFormMpscal013', 'applcYm', 'text');
    if(gf_IsNull(applcYm)){
        gf_DivMsgAlert('지급일자를 선택해 주세요.');
        return false;
    } else if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('선택된 지급대상자가 없습니다.');
        return false;
    }
    var closAt = gf_FormGetValue('searchFormMpscal013', 'closAt', 'text');
    if(closAt == 1){
    	$('#btnRemoveMpscal013').unbind('click').bind('click', function() {
            gf_DivMsgAlert("급여마감 시 수정이 불가능 합니다. <br/>지급일자 재조회 하셔야 합니다.");
        });
    } else if(closAt == 0) {
    	// rowIds 반복문을 실행한다.
    	$(rowIds).each(function(index, rowId){
    		// 그리드에 체크된 컬럼 값들을 체크 한다 
    		dhxGridMpscal013.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal013, 'applcYm')).setValue(gf_DhxGetValue(dhxGridMpscal013, rowId, 'applcYm',  'grid'));
    		dhxGridMpscal013.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal013, 'pymntSn')).setValue(gf_DhxGetValue(dhxGridMpscal013, rowId, 'pymntSn',  'grid'));
    		dhxGridMpscal013.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal013, 'empno')).setValue(gf_DhxGetValue(dhxGridMpscal013, rowId, 'empno',  'grid'));
    		// 삭제 업데이트를 실행한다.
    		dhxDataProcessorMpscal013.setUpdated(rowId, true, 'deleted');
    	});
    	// 체크된 rowIds 들을 서버에 보낸다. deleted 한 뒤 
    	dhxDataProcessorMpscal013.sendData();
    }
 // 그리드 폼 새로고침
	fn_SearchMpscalEmp();
	fn_SearchMpscal013();
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal013 = function () {
    var titMpscal013 = '급여대상자생성'; /* gf_LocaleTrans('default', 'titMpscal013') */
    var jsonParameter = {
        applcYm : gf_FormGetValue('searchFormMpscal013', 'applcYm', 'text'),
        pymntSn : gf_FormGetValue('searchFormMpscal013', 'pymntSn', 'text'),
        empno : gf_FormGetValue('searchFormMpscal013', 'empno', 'text')
    };
    var header = [[
        '적용 년월' /* gf_LocaleTrans('default', 'titApplcYm') */,
        '지급 순번' /* gf_LocaleTrans('default', 'titPymntSn') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '직원구분코드' /* gf_LocaleTrans('default', 'titEmpSeCode') */,
        '계좌번호' /* gf_LocaleTrans('default', 'titAcnutNo') */,
        '은행코드' /* gf_LocaleTrans('default', 'titBankCode') */,
        '예금주명' /* gf_LocaleTrans('default', 'titDpstrNm') */,
        '사업장코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '부서코드' /* gf_LocaleTrans('default', 'titDeptCode') */,
        '직급코드' /* gf_LocaleTrans('default', 'titClsfCode') */,
        '직책코드' /* gf_LocaleTrans('default', 'titRspofcCode') */,
        '직무코드' /* gf_LocaleTrans('default', 'titDtyCode') */,
        '호봉코드' /* gf_LocaleTrans('default', 'titSrclsCode') */,
        '직종코드' /* gf_LocaleTrans('default', 'titJssfcCode') */
    ]];
    var dataId = [[ 'applcYm', 'pymntSn', 'empno', 'empSeCode', 'acnutNo', 'bankCode', 'dpstrNm', 'bplcCode', 'deptCode', 'clsfCode', 'rspofcCode', 'dtyCode', 'srclsCode', 'jssfcCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscal013 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal013;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal013/excelMpscal013', jsonParameter);
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
    $('#saveFormMpscal013 #applcYmSaveFormMpscal013').parent().append(
    '<div class="error" id="applcYmSaveFormMpscal013-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal013 #pymntSnSaveFormMpscal013').parent().append(
    '<div class="error" id="pymntSnSaveFormMpscal013-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal013 #empnoSaveFormMpscal013').parent().append(
    '<div class="error" id="empnoSaveFormMpscal013-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal013 = function(applcYm, pymntSn, empno){
    if(!gf_IsNull(applcYm) && !gf_IsNull(pymntSn) && !gf_IsNull(empno)) {
        var jsonParameter = {
            applcYm : applcYm,
            pymntSn : pymntSn,
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mpscal013/findMpscal013', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYm) && gf_IsNull(data.pymntSn) && gf_IsNull(data.empno)) {
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
    var checkApplcYm;
    var checkPymntSn;
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal013 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpscal013 = 0;
        save_Row_Ids_Mpscal013 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpscal013 = rowNum;
        save_Row_Ids_Mpscal013 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal013 = rowNum;
        save_Row_Ids_Mpscal013 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'pymntSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkApplcYm = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid');
                    checkPymntSn = gf_DhxGetValue(dhxGridObjet, rowId, 'pymntSn', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkApplcYm, checkPymntSn, checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYm', 'grid');
                            var pymntSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'pymntSn', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((applcYm == checkApplcYm) && (pymntSn == checkPymntSn) && (empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscal013( checkApplcYm, checkPymntSn, checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
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
        dhxGridMpscal013.selectRowById(validFalseFistRowId);
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

var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.pymntDe)) {
		console.log(data)
		gf_FormSetValue('searchFormMpscal013', 'pymntDe', data.pymntDe, 'text');
		gf_FormSetValue('searchFormMpscal013', 'salarytyCodeNm', data.salarytyCodeNm, 'text');
		gf_FormSetValue('searchFormMpscal013', 'pymntSn', data.pymntSn, 'hidden');
		gf_FormSetValue('searchFormMpscal013', 'pymntDtls', data.pymntDtls, 'text');
		gf_FormSetValue('searchFormMpscal013', 'closAt', data.closAt, 'text');
		gf_FormSetValue('searchFormMpscal013', 'applcYm', data.applcYm, 'text');
		gf_FormSetValue('searchFormMpscal013', 'jssfcCode', data.jssfcCode, 'text');
		gf_FormSetValue('searchFormMpscal013', 'salarytyCode', data.salarytyCode, 'text');
	}
};

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMpscal013', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpscal013', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormMpscal013', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMpscal013', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMpscal013","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpscal013', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal013', 'empno', data.empno, 'text');
}
// 계좌 팝업 acnut
var $acnutInfo = {};
var fn_Acnut = function (formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {
	var userId = ""; 
	var title  = "계좌번호 조회";
	var codeInfo = "acnutInfo";	
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
	
	$acnutInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='acnutPopup']").size() <= 0) {
		$('body').append("<div id='acnutPopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#acnutPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'acnutPopup';
			var ajaxUrl = gv_ContextPath+'/mpscal013/popup/findPopupAcnutList/view';
			var left	= 0;
			var top		= 0;
			var width	= 800;
			var height	= 600;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#acnutPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($acnutInfo);
			}
			dhxWindows.unload();
			$('body').find("div[id='acnutPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};
var fn_CallbackPopup = function(data) {
	if(!gf_IsNull(data.acnutSeCode)) {
		console.log(data)
		dhxGridMpscal013.cells(dhxGridMpscal013.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal013, 'acnutSeCode')).setValue(data.acnutSeCode);
		dhxGridMpscal013.cells(dhxGridMpscal013.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal013, 'acnutNo')).setValue(data.acnutno);
		dhxGridMpscal013.cells(dhxGridMpscal013.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscal013, 'bankCode')).setValue(data.bankCode);
		dhxDataProcessorMpscal013.setUpdated(dhxGridMpscal013.getSelectedRowId(), true, 'updated');
		dhxDataProcessorMpscal013.sendData();
	}
};

