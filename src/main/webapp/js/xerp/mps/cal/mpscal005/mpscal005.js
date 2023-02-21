/**
 *    프로그램       : 급여계산/조정 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.03
 *    사용테이블      : MPS_SALARY_PYMNT
 * sourceGen version : 2020.06.29.01 (2020.07.03)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal005 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal005 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal005 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal005 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal005 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal005 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal005 = 0;  //그리드 삭제 수량 
//--------------------------------------------------------
var save_Row_Num_MpscalItem = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MpscalItem = 0;  //그리드 위치 상태 
var save_All_Sta_MpscalItem = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MpscalItem = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MpscalItem = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MpscalItem = 0;  //그리드 저장 수량 
var save_Del_Cnt_MpscalItem = 0;  //그리드 삭제 수량 

 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal005();
    cf_SetComponentsMpscal005();
    cf_SetEventListenerMpscal005();
    cf_InitFormMpscal005();
    cf_SetBindingMpscal005();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal005 = function() {
	gf_SetMenuPath();
    $("#saveFormMpscal005").validate({ errorElement: 'div', ignore: '' });
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    regId = userInfo.data.userId;
    
    gf_MakeComboBasic('divComboYearYear','applcYy','','width:70px','mpsbsc006/combo/searchComboYeayMpsbsc006');
    //gf_MakeComboBasic('divComboclsfCode','clsfCode','','width:70px','mpsbsc006/combo/searchComboYeayMpsbsc006');
    //gf_ComboCode('saveFormEmpmpscal005', 'clsfCode', 'clsfCode', 'sel', '', '' , '', '', 'ordr', 'required','','');
    
    $("#totMpscalItem").number(true);
    $("#totSum").number(true);
    $("#taxtAmt").number(true);
    $("#taxtSttemnt").number(true);
    $("#SumTaxtAmt").number(true);
    $("#SumTaxtItemAmt").number(true);
    $("#salaryitemS20").number(true);
    $("#salaryitemS00").number(true);
    $("#salaryitemS10").number(true);
    $("#salaryitemT00").number(true);
    $("#salaryitemSR1").number(true);
    $("#salaryitemT10").number(true);
    $("#totMpscalAmt01").number(true);
    $("#totMpscalAmt02").number(true);
    
    $("#deptCodeNm").focus();
};

var dhxGridMpscal005;
var dhxGridMpscalEmp;
var dhxGridMpscalItem;
var cf_SetComponentsMpscal005 = function() {
	var dhxGridMpscalEmpHeaderInfo = [];
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); // 번호 
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscal005" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '150', 'center', 'str', 'ro', false, 'empno', '')); // 사원번호
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('성명', '150', 'center', 'str', 'ro', false, 'korNm', '')); // 한글
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('부서번호', '150', 'center', 'str', 'ro', true, 'deptCode', '')); // 부서번호
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('부서', '*', 'left', 'str', 'ro', false, 'deptCodeNm', '')); // 부서
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('급여마감여부', '0', 'left', 'str', 'ro', true, 'closAt', '')); // 급여마감여부
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('입사일자', '0', 'center', 'str', 'ro', true, 'ecnyDe', '')); // 입사일자
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('퇴사일자', '0', 'center', 'str', 'ro', true, 'retireDe', '')); // 퇴사일자
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('사원구분', '0', 'center', 'str', 'ro', true, 'emplSeNm', '')); // 사원구분
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직종', '0', 'center', 'str', 'ro', true, 'jssfcCodeNm', '')); // 직종
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직위', '0', 'center', 'str', 'ro', true, 'ofcpsCode', '')); // 직위
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직위', '0', 'center', 'str', 'ro', true, 'ofcpsCodeNm', '')); // 직위
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직무분야', '0', 'center', 'str', 'ro', true, 'dtyCodeNm', '')); // 직무분야
//    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('급여지급유형', '0', 'center', 'str', 'ro', true, 'deptCodeNm', '')); // 급여지급유형
//    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('선임/부선임', '0', 'center', 'str', 'ro', true, 'deptCodeNm', '')); // 선임/부선임
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직급', '0', 'center', 'str', 'coro', true, 'clsfCodeNm', '')); // 직급
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직책', '0', 'center', 'str', 'coro', true, 'rspofcCodeNm', '')); // 직책
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('호봉', '0', 'center', 'str', 'coro', true, 'srclsCodeNm', '')); // 호봉
    dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('급여보수체계', '0', 'center', 'str', 'coro', true, 'salaryAprpCodeNm', '')); // 급여보수체계
    dhxGridMpscalEmp = gf_MakeDhxGrid('dataListMpscalEmp', dhxGridMpscalEmpHeaderInfo, true, false, false);
    dhxGridMpscalEmp.enableAutoWidth(false);
    dhxGridMpscalEmp.setEditable(true);
    dhxGridMpscalEmp.setColumnMinWidth(150,5); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    // 급여항목
    var dhxGridMpscal005HeaderInfo = [];
    dhxGridMpscal005HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'applcYm', '')); // 적용년월
    dhxGridMpscal005HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '')); // 지급순번
    dhxGridMpscal005HeaderInfo.push(gf_MakeDhxGridHeader('지급항목', '0', 'center', 'str', 'ro', true, 'empno', '')); // 사원번호
    dhxGridMpscal005HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpscal005HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '0', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpscal005HeaderInfo.push(gf_MakeDhxGridHeader('지급항목', '270', 'left', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpscal005HeaderInfo.push(gf_MakeDhxGridHeader('금액', '*', 'right', 'str', 'edn', false, 'totSalaryAmt', '')); // 한글
    dhxGridMpscal005 = gf_MakeDhxGrid('dataListMpscal005', dhxGridMpscal005HeaderInfo, true, false, false);
    dhxGridMpscal005.enableAutoWidth(false);
    dhxGridMpscal005.setEditable(true);
    dhxGridMpscal005.setColumnMinWidth(270,6); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    //숫자 콤마부여하기 
    dhxGridMpscal005.setNumberFormat("0,000", dhxGridMpscal005.getColIndexById("totSalaryAmt"), ".", ",");
    dhxGridMpscal005.attachFooter("#rspan,#rspan,#rspan,#rspan,#rspan,<div style='text-align:right;'>합계</div>,<div id='sales_tot' style='text-align:right;'>0</div>",["text-align:right;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여
    dhxGridMpscal005.attachEvent("onEditCell",calculateFooterValues);  //수정 시 자동 계산
    dhxGridMpscal005.attachEvent("onDataReady",function(){
    	calculateFooterValues();
    });
    
    // 공제항목
    var dhxGridMpscalItemHeaderInfo = [];
    dhxGridMpscalItemHeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'applcYm', '')); // 적용년월
    dhxGridMpscalItemHeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '')); // 지급순번
    dhxGridMpscalItemHeaderInfo.push(gf_MakeDhxGridHeader('지급항목', '0', 'center', 'str', 'ro', true, 'empno', '')); // 사원번호
    dhxGridMpscalItemHeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '0', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpscalItemHeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '0', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpscalItemHeaderInfo.push(gf_MakeDhxGridHeader('공제항목', '270', 'left', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpscalItemHeaderInfo.push(gf_MakeDhxGridHeader('금액', '*', 'right', 'str', 'edn', false, 'totSalaryAmt', '')); // 한글
    dhxGridMpscalItem = gf_MakeDhxGrid('dataListMpscalItem', dhxGridMpscalItemHeaderInfo, true, false, false);
    dhxGridMpscalItem.enableAutoWidth(false);
    dhxGridMpscalItem.setEditable(true);
    dhxGridMpscalItem.setColumnMinWidth(270,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    //숫자 콤마부여하기 
    dhxGridMpscalItem.setNumberFormat("0,000", dhxGridMpscalItem.getColIndexById("totSalaryAmt"), ".", ",");
    dhxGridMpscalItem.attachFooter("#rspan,#rspan,#rspan,#rspan,#rspan,<div style='text-align:right;'>합계</div>,<div id='item_tot' style='text-align:right;'>0</div>",["text-align:right;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여
    dhxGridMpscalItem.attachEvent("onEditCell",calculateFooterValuesItem);  //수정 시 자동 계산
    dhxGridMpscalItem.attachEvent("onDataReady",function(){
		calculateFooterValuesItem();
	});
};

function calculateFooterValues(stage){
	//alert(stage);
	if(stage && stage!=2)
		return true;
	var nrQ = document.getElementById("sales_tot");
		nrQ.innerHTML = gf_NumberWithCommas(sumColumn1());
	return true;
}
function sumColumn1(){
	var out = 0;
	for(var i = 0; i < dhxGridMpscal005.getRowsNum(); i++){
		out+= parseFloat(dhxGridMpscal005.cells2(i,6).getValue())
	}
	return out;
}
function calculateFooterValuesItem(stage){
	//alert(stage);
	if(stage && stage!=2)
		return true;
	var nrQItem = document.getElementById("item_tot");
		nrQItem.innerHTML = gf_NumberWithCommas(sumColumnItem());
	return true;
}
function sumColumnItem(){
	var out = 0;
	for(var i = 0; i < dhxGridMpscalItem.getRowsNum(); i++){
		out+= parseFloat(dhxGridMpscalItem.cells2(i,6).getValue())
	}
	return out;
}


var eventIdMpscal005 = [];
var cf_SetEventListenerMpscal005 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscal005 = gf_GridDetachEvent(dhxGridMpscal005, eventIdMpscal005);
    eventId = dhxGridMpscal005.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal005();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal005.getColumnsNum();
            var rowNum = dhxGridMpscal005.getRowsNum();
            var selectedId = dhxGridMpscal005.getSelectedRowId();
            var ind        = dhxGridMpscal005.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal005.getRowIndex(selectedId);
            var type       = dhxGridMpscal005.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal005.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal005.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal005.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal005.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal005.getSelectedRowId();
            var ind        = dhxGridMpscal005.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal005.getRowIndex(selectedId);
            var type       = dhxGridMpscal005.getColType(ind);
            dhxGridMpscal005.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal005.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal005.getSelectedRowId();
            var ind        = dhxGridMpscal005.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal005.getRowIndex(selectedId);
            var type       = dhxGridMpscal005.getColType(ind);
            dhxGridMpscal005.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal005.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal005.push(eventId);
    eventId = dhxGridMpscal005.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal005SortGridList(ind, type, direction); 
    });
    eventIdMpscal005.push(eventId);
    eventId = dhxGridMpscal005.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal005.push(eventId);
    eventId = dhxGridMpscalEmp.attachEvent("onRowSelect", function(id, ind){
    	gf_errorMsgClear();
    	fn_FindMtxcal005();
    });
    eventIdMpscal005.push(eventId);
    eventId = dhxGridMpscal005.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscal005.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscal005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscal005()
    });
    $('#btnSaveMpscal005').unbind('click').bind('click', function() {
    	gf_errorMsgClear();
    	var pymntDe = gf_FormGetValue('searchFormMpscal005', 'pymntDe', 'text');
    	if(gf_IsNull(pymntDe)){
    		gf_DivMsgAlert('지급일자를 입력해주세요.');
            return false;
    	}
        // 공제 항목 그리드 반복문을 돌린다.
        dhxGridMpscal005.forEachRow(function(rowId) {
        	// 반복문을 돌려 상태 값이 Null 이 아니라면
            if(!gf_IsNull(dhxDataProcessorMpscal005.getState(rowId))) {
            	// 카운트 +1 을 한다.
            	fn_SaveMpscal005();
            }
        });
        // 공제 항목 그리드 반복문을 돌린다.
        dhxGridMpscalItem.forEachRow(function(rowId) {
        	// 반복문을 돌려 상태 값이 Null 이 아니라면
            if(!gf_IsNull(dhxDataProcessorMpscalItem.getState(rowId))) {
            	// 카운트 +1 을 한다.
            	fn_SaveMpscalItem();
            }
        });
    });
    $('#btnRemoveMpscal005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscal005();
    });
    $('#btnExcelMpscal005').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscal005();
    });
    $('#btnSearchMpscal005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscalEmp('');

    });
    $('#Sumbtn').unbind("click").bind("click",function() {
        
    	SumMpscal005();
    	
    });
    
    $('#btnResetMpscal005').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscal005();
        $('#date_month').val(nowDate.substring(0,7));
        dhxGridMpscalEmp.clearAll();
        dhxGridMpscal005.clearAll();
        dhxGridMpscalItem.clearAll();
        gf_NoFoundDataOnGridMsg('dataListMpscalEmp');
    	gf_NoFoundDataOnGridMsg('dataListMpscal005');
    	gf_NoFoundDataOnGridMsg('dataListMpscalItem');
    	$('#saveFormEmpmpscal005').resetForm();
    	$('#saveFormEmpmpscalItem').resetForm();
    	$('#Mpscal005Sum').resetForm();
    });
    $('#btnPymntDeSearch').unbind('click').bind('click', function(event){
		gf_PymntDePopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");  
    });
    // 기타 이벤트 ========================================================================================== 
    $('#checkAllMpscal005').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal005, $('#checkAllMpscal005').prop('checked'), 'chk');
    });
    $('#searchFormMpscal005 input, select, button, textarea').unbind('keypress').bind('keypress',function() {
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
        		$('#btnSearchMpscal005').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpscal005').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
  //사원 선택 Popup
    $('#searchFormMpscal005 #btnempnoSearchSearchFormMpscal005').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMpscal005","empno","korNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#searchFormMpscal005 #btnDeptCodeSearchSearchFormMpscal005').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMpscal005","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal005', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal005', 'empno', '', 'text');
	    }
		
    });
    
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal005', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal005', 'deptCode', '', 'text');
	    }
    });
	
};

var cf_InitFormMpscal005 = function() {
    $('#searchFormMpscal005').resetForm();
};

var cf_SetBindingMpscal005 = function() {
	//fn_SearchMpscalEmp('');
	gf_NoFoundDataOnGridMsg('dataListMpscalEmp');
	gf_NoFoundDataOnGridMsg('dataListMpscal005');
	gf_NoFoundDataOnGridMsg('dataListMpscalItem');
};
//달력 ---------------------------------------------------------------------------------
$(function() {
	if(init()){   // 초기화
		init3();  // 년월달력 초기화
	}
});
function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#sampleForm .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    
	//기간달력 이벤트 추가
    $('#sampleForm #date2').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxCCalendarDate2.show();
    });
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
}

/********************************************************************/

//년월달력 : 
function init3(){
	//달력 생성  : jquery의 datepicker 사용
	//금일 날짜표시
	$('#date_month').val(nowDate.substring(0,7));

  var currentYear = (new Date()).getFullYear();
  var startYear = currentYear-10;

  var options = {
          startYear: startYear,
          finalYear: currentYear,
          pattern: 'yyyy-mm',
          monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
  };

  $('#date_month').monthpicker(options);
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
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscalEmp = function(userId) {
	var pymntDe = gf_FormGetValue('searchFormMpscal005', 'pymntDe', 'text');
	if(gf_IsNull(pymntDe)){
		gf_DivMsgAlert('지급일자를 입력해주세요.');
        return false;
	}
	
	var applcYm = gf_FormGetValue('searchFormMpscal005', 'applcYm', 'text');
	var empno = gf_FormGetValue('searchFormMpscal005', 'empno', 'text');
	var korNm = gf_FormGetValue('searchFormMpscal005', 'korNm', 'text');
	var deptCode = gf_FormGetValue('searchFormMpscal005', 'deptCode', 'text');
	var deptCodeNm = gf_FormGetValue('searchFormMpscal005', 'deptCodeNm', 'text');
	var pymntSn = gf_FormGetValue('searchFormMpscal005', 'pymntSn', 'hidden');
	    
    var jsonParameter = {
    		applcYm : applcYm,
    		empno : empno,
    		korNm : korNm,
    		deptCode : deptCode,
    		deptCodeNm : deptCodeNm,
    		pymntSn : pymntSn
    };
    
    gf_Transaction(userId, 'mpscal005/searchMpscalEmp', jsonParameter, 'fn_CallbackSearchMpscalEmp', false, 'GET');
    
    if(!gf_IsNull(applcYm) && !gf_IsNull(pymntSn)){ 
    	gf_Transaction('', 'mpscal005/searchMpscalSUM', jsonParameter, 'fn_CallbackSearch', false, 'GET');
    }
};

var dhxDataProcessorMpscalEmp;
var fn_CallbackSearchMpscalEmp  = function(strSvcID, targetID, data) {
	dhxGridMpscalEmp.clearAll();
    fn_DhxDataProcessorMpscalEmp(); 
    if(!gf_IsNull(data.data.records)){
    	gf_NoFoundDataOnGridMsgRemove('dataListMpscalEmp');
    	dhxGridMpscalEmp.parse(data.data.records, 'js');
    	dhxGridMpscalEmp.selectRow(0);
        fn_FindMtxcal005();
        
        var closAt = gf_FormGetValue('searchFormMpscal005', 'closAt', 'text');
        if(closAt == '1'){
        	// button 이 아니라 a 태그라서 css 마우스포인터 none 처리 : 비활성화
        	$("#btnSaveMpscal005").css({ 'pointer-events': 'none' });
        		gf_DivMsgAlert("급여마감 시 수정이 불가능합니다.");
        }else if(closAt == '0'){
        	// button 이 아니라 a 태그라서 css 마우스포인터 auto 처리 : 활성화
        	$("#btnSaveMpscal005").css({ 'pointer-events': 'auto' });
        }
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscalEmp');
    }
    $("#spanCntSearchFormMpscal005").text(data.data.records.length);
    //gf_PageNate(data.data,'.paging','fn_SearchMpscalEmp');
    cf_SetEventListenerMpscal005();
};
var fn_DhxDataProcessorMpscalEmp = function(){
	// 그리드입력 데이터프로세스 정의
//  //dhxDataProcessorMpscal013 = new dataProcessor(gv_ContextPath+'/mpscal013/saveMpscal013'); //lock feed url
	dhxDataProcessorMpscalEmp = new dataProcessor('/xerp/mpscal005/saveMpscal005'); //lock feed url
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
}
/**
 * 상세조회
 */
var fn_FindMtxcal005 = function() {
    var rId = dhxGridMpscalEmp.getSelectedRowId();
    var status = dhxDataProcessorMpscalEmp.getState(rId);
    
    gf_FormSetValue("saveFormEmpmpscal005", "ecnyDe", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'ecnyDe',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "retireDe", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'retireDe',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "emplSe", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'emplSeNm',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "jssfcCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'jssfcCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "clsfCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'clsfCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "dtyCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'dtyCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "clsfCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'clsfCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "ofcpsCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'ofcpsCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "rspofcCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'rspofcCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "srclsCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'srclsCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormEmpmpscal005", "salaryAprpCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'salaryAprpCodeNm',  'grid'), '');

    var empno = gf_DhxGetValue(dhxGridMpscalEmp, rId, 'empno', 'grid');
    var pymntSn = gf_FormGetValue('searchFormMpscal005', 'pymntSn', 'hidden');
    var applcYm = gf_FormGetValue('searchFormMpscal005', 'applcYm', 'text');
    
    var jsonParameter = {
    		empno:empno,
    		pymntSn : pymntSn,
    		applcYm : applcYm
    }
    gf_Transaction('', 'mpscal005/searchMpscal005', jsonParameter, 'fn_CallbackSearchMpscal005', false, 'GET');
    gf_Transaction('', 'mpscal005/searchMpscal005Item', jsonParameter, 'fn_CallbackSearchMpscalItem', false, 'GET');
    
    
    gf_Transaction('', 'mpscal005/searchMpscal005SUM', jsonParameter, 'fn_CallbackSearchMpscal', false, 'GET');
    
};
var fn_CallbackSearchMpscal = function(strSvcID, targetID, data) {
	data.data.records.forEach(function(row) {
		if(row.gb == "과세/비과세"){
			gf_FormSetValue('Mpscal005Sum', 'totMpscalAmt01', row.amt1, '');
			gf_FormSetValue('Mpscal005Sum', 'totMpscalAmt02', row.amt2, '');
		}
	})
};

var fn_CallbackSearch = function(strSvcID, targetID, data) {
	data.data.records.forEach(function(row) {
		if(row.gb == "과세비과세"){
			gf_FormSetValue('saveFormEmpmpscalItem', 'taxtAmt', row.totalA01, '');
			gf_FormSetValue('saveFormEmpmpscalItem', 'taxtSttemnt', row.totalA02, '');
		} else if(row.gb == "지급합"){
			gf_FormSetValue('saveFormEmpmpscalItem', 'SumTaxtAmt', row.totalA01, '');
		} else if(row.gb == "공제합"){
			gf_FormSetValue('saveFormEmpmpscalItem', 'SumTaxtItemAmt', row.totalA01, '');
		} else if(row.gb == "공제내역"){
			if(row.salaryitemCode == "S20"){
				gf_FormSetValue('saveFormEmpmpscalItem', 'salaryitemS20', row.totalA01, ''); // 고용보험
			}else if(row.salaryitemCode == "S00"){
				gf_FormSetValue('saveFormEmpmpscalItem', 'salaryitemS00', row.totalA01, ''); // 국민연금
			}else if(row.salaryitemCode == "S10"){
				gf_FormSetValue('saveFormEmpmpscalItem', 'salaryitemS10', row.totalA01, ''); // 건강보험
			}else if(row.salaryitemCode == "T00"){
				gf_FormSetValue('saveFormEmpmpscalItem', 'salaryitemT00', row.totalA01, ''); // 소득세
			}else if(row.salaryitemCode == "SR1"){
				gf_FormSetValue('saveFormEmpmpscalItem', 'salaryitemSR1', row.totalA01, ''); // 장기요양보험료
			}else if(row.salaryitemCode == "T10"){
				gf_FormSetValue('saveFormEmpmpscalItem', 'salaryitemT10', row.totalA01, ''); // 지방소득세
			}
		}
	});
}

var fn_CallbackSearchMpscal005 = function(strSvcID, targetID, data) {
    dhxGridMpscal005.clearAll();
    fn_DhxDataProcessorMpscal005();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscal005');
        dhxGridMpscal005.parse(data.data.records, 'js');
        // 그리드에 있는 컬럼값 합계 구하기
        var totSalaryAmt = gf_DhxGetSumValue(dhxGridMpscal005, gf_GetDhxGridColumId(dhxGridMpscal005,'totSalaryAmt'));
        gf_FormSetValue('Mpscal005Sum', 'totMpscal005', totSalaryAmt, '');
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscal005');
    }
};

var dhxDataProcessorMpscal005;
var fn_DhxDataProcessorMpscal005 = function() {
	//그리드입력 데이터프로세스 정의
	dhxDataProcessorMpscal005 = new dataProcessor('/xerp/mpscal005/saveMpscal005'); //lock feed url
	//dhxDataProcessorMpscal005 = new dataProcessor(gv_ContextPath+'/mpscal005/saveMpscal005'); //lock feed url
	dhxDataProcessorMpscal005.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	dhxDataProcessorMpscal005.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
	dhxDataProcessorMpscal005.init(dhxGridMpscal005); //link dataprocessor to the grid
	dhxDataProcessorMpscal005.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
	dhxDataProcessorMpscal005.styles = {
	                updated:        "font-weight:normal;text-decoration:none;",
	                inserted:       "font-weight:bold; color:green;",
	                deleted:        "color:orange; text-decoration:line-through;",
	                invalid:        "color:green; text-decoration:underline;",
	                error:          "color:blue; text-decoration:underline;",
	                clear:          "font-weight:normal;text-decoration:none;"
	};
	dhxDataProcessorMpscal005.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
        if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
            if(!gf_IsNull(dataSource.methodNm)){ 
                gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
            } else { 
                gf_DivMsgAlert(dataSource.message); 
            } 
            return false;
        } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            $("#checkAllMpscal005").prop('checked', false); //상단 체크박스 해제
            
            
            var edCnt = 0;
            // 공제 항목 그리드 반복문을 돌린다.
            dhxGridMpscalItem.forEachRow(function(rowId) {
            	// 반복문을 돌려 상태 값이 Null 이 아니라면
                if(!gf_IsNull(dhxDataProcessorMpscalItem.getState(rowId))) {
                	// 카운트 +1 을 한다.
                    edCnt++;
                }
            });
            // 카운트 가 0보다 크다면
            if(edCnt > 0){
            	// 공제 항목 저장을 한다.
            	dhxDataProcessorMpscalItem.sendData();
            }

            return true;
    } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            return false;
    }
});
}

var fn_CallbackSearchMpscalItem = function(strSvcID, targetID, data) {
	dhxGridMpscalItem.clearAll();
	fn_DhxDataProcessorMpscalItem();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscalItem');
        dhxGridMpscalItem.parse(data.data.records, 'js');
        // 그리드에 있는 컬럼값 합계 구하기
        var SumtaxtAmt = gf_DhxGetSumValue(dhxGridMpscal005, gf_GetDhxGridColumId(dhxGridMpscal005,'totSalaryAmt'));
        var SumtaxtItemAmt = gf_DhxGetSumValue(dhxGridMpscalItem, gf_GetDhxGridColumId(dhxGridMpscalItem,'totSalaryAmt'));
        var totSum = (SumtaxtAmt-SumtaxtItemAmt);
        gf_FormSetValue('MpscalItemSum', 'totSum', totSum, '');
        
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscalItem');
    }
};

var dhxDataProcessorMpscalItem;
var fn_DhxDataProcessorMpscalItem = function() {
	//그리드입력 데이터프로세스 정의
	dhxDataProcessorMpscalItem = new dataProcessor('/xerp/mpscal005/saveMpscalItem'); //lock feed url
	//dhxDataProcessorMpscalItem = new dataProcessor(gv_ContextPath+'/mpscal005/saveMpscalItem'); //lock feed url
	dhxDataProcessorMpscalItem.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	dhxDataProcessorMpscalItem.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
	dhxDataProcessorMpscalItem.init(dhxGridMpscalItem); //link dataprocessor to the grid
	dhxDataProcessorMpscalItem.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
	dhxDataProcessorMpscalItem.styles = {
	                updated:        "font-weight:normal;text-decoration:none;",
	                inserted:       "font-weight:bold; color:green;",
	                deleted:        "color:orange; text-decoration:line-through;",
	                invalid:        "color:green; text-decoration:underline;",
	                error:          "color:blue; text-decoration:underline;",
	                clear:          "font-weight:normal;text-decoration:none;"
	};
	dhxDataProcessorMpscalItem.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
	        if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
	            if(!gf_IsNull(dataSource.methodNm)){ 
	                gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm);
	            } else { 
	                gf_DivMsgAlert(dataSource.message); 
	            } 
	            return false;
	        } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
	                gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
	                $("#checkAllMpscal005").prop('checked', false); //상단 체크박스 해제
	                
	                var edCnt = 0;
	                // 공제 항목 그리드 반복문을 돌린다.
	                dhxGridMpscal005.forEachRow(function(rowId) {
	                	// 반복문을 돌려 상태 값이 Null 이 아니라면
	                    if(!gf_IsNull(dhxDataProcessorMpscal005.getState(rowId))) {
	                    	// 카운트 +1 을 한다.
	                        edCnt++;
	                    }
	                });
	                // 카운트 가 0보다 크다면
	                if(edCnt > 0){
	                	// 공제 항목 저장을 한다.
	                	dhxDataProcessorMpscal005.sendData();
	                }
	                
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
var fn_Mpscal005SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal005, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal005', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal005', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal005, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal005.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal005', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal005', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal005, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal005.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal005', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal005', 'sortColumId', '', 'text'); 
            dhxGridMpscal005.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal005.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal005', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal005', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal005, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal005 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpscal005 = 0; 
    save_Edt_Cnt_Mpscal005 = 0; 
    save_Del_Cnt_Mpscal005 = 0; 
    
	var pymntSn = gf_FormGetValue('searchFormMpscal005', 'pymntSn', 'text');
	if(gf_IsNull(pymntSn)) {
        gf_DivMsgAlert('지급일자를 선택해 주세요.');
        return false;
	}
	
    dhxGridMpscal005.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscal005.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscal005.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpscal005 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpscal005 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpscal005 += 1; 
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
        save_All_Sta_Mpscal005 = 0; 
        if(save_Add_Cnt_Mpscal005 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpscal005 + "건";
            save_All_Sta_Mpscal005 = 1; 
        } 
        if(save_Edt_Cnt_Mpscal005 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpscal005 + "건"; 
        } 
        if(save_Del_Cnt_Mpscal005 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpscal005 + "건"; 
            save_All_Sta_Mpscal005 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscal005(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscal005(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscal005 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscal005_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscal005_Send = function() {
	dhxDataProcessorMpscal005.sendData();
}

/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscalItem = function() {
	var edCnt = 0;
    save_Add_Cnt_MpscalItem = 0; 
    save_Edt_Cnt_MpscalItem = 0; 
    save_Del_Cnt_MpscalItem = 0; 
    
	var pymntSn = gf_FormGetValue('searchFormMpscal005', 'pymntSn', 'text');
	if(gf_IsNull(pymntSn)) {
        gf_DivMsgAlert('지급일자를 선택해 주세요.');
        return false;
	}
	
    dhxGridMpscalItem.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscalItem.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscalItem.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MpscalItem += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MpscalItem += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MpscalItem += 1; 
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
        save_All_Sta_MpscalItem = 0; 
        if(save_Add_Cnt_MpscalItem > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MpscalItem + "건";
            save_All_Sta_MpscalItem = 1; 
        } 
        if(save_Edt_Cnt_MpscalItem > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MpscalItem + "건"; 
        } 
        if(save_Del_Cnt_MpscalItem > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MpscalItem + "건"; 
            save_All_Sta_MpscalItem = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscalItem(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscalItem(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscalItem = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscalItem_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscalItem_Send = function() {
	dhxDataProcessorMpscalItem.sendData();
}

/**
 * 삭제
 */
var fn_RemoveMpscal005 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal005, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscal005.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscal005.getState(rowId);
            if(dhxGridMpscal005.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal005, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscal005.getRowIndex(rowId);
                    dhxGridMpscal005.deleteRow(rowId);
                    dhxGridMpscal005.selectRow(rowNum);
                }
                else dhxDataProcessorMpscal005.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal005 = function () {
    var titMpscal005 = '급여계산/조정'; /* gf_LocaleTrans('default', 'titMpscal005') */
    var jsonParameter = {
        applcYm : gf_FormGetValue('searchFormMpscal005', 'applcYm', 'text'),
        pymntSn : gf_FormGetValue('searchFormMpscal005', 'pymntSn', 'text'),
        empno : gf_FormGetValue('searchFormMpscal005', 'empno', 'text'),
        salarytyCode : gf_FormGetValue('searchFormMpscal005', 'salarytyCode', 'text'),
        salaryitemCode : gf_FormGetValue('searchFormMpscal005', 'salaryitemCode', 'text')
    };
    var header = [[
        '적용 년월' /* gf_LocaleTrans('default', 'titApplcYm') */,
        '지급순번' /* gf_LocaleTrans('default', 'titPymntSn') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '급여유형 코드' /* gf_LocaleTrans('default', 'titSalarytyCode') */,
        '급여항목 코드' /* gf_LocaleTrans('default', 'titSalaryitemCode') */,
        '총 급여 금액' /* gf_LocaleTrans('default', 'titTotSalaryAmt') */,
        '과세 금액' /* gf_LocaleTrans('default', 'titTaxtAmt') */,
        '비과세 신고 금액' /* gf_LocaleTrans('default', 'titTaxeSttemntAmt') */,
        '비과세 신고제외 금액(사용안함)' /* gf_LocaleTrans('default', 'titTaxeStmtExclAmt') */,
        '급여 계좌 구분 코드C471' /* gf_LocaleTrans('default', 'titAcnutSeCode') */
    ]];
    var dataId = [[ 'applcYm', 'pymntSn', 'empno', 'salarytyCode', 'salaryitemCode', 'totSalaryAmt', 'taxtAmt', 'taxeSttemntAmt', 'taxeStmtExclAmt', 'acnutSeCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscal005 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal005;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal005/excelMpscal005', jsonParameter);
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
    $('#saveFormMpscal005 #applcYmSaveFormMpscal005').parent().append(
    '<div class="error" id="applcYmSaveFormMpscal005-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal005 #pymntSnSaveFormMpscal005').parent().append(
    '<div class="error" id="pymntSnSaveFormMpscal005-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal005 #empnoSaveFormMpscal005').parent().append(
    '<div class="error" id="empnoSaveFormMpscal005-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal005 #salarytyCodeSaveFormMpscal005').parent().append(
    '<div class="error" id="salarytyCodeSaveFormMpscal005-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal005 #salaryitemCodeSaveFormMpscal005').parent().append(
    '<div class="error" id="salaryitemCodeSaveFormMpscal005-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal005 = function(applcYm, pymntSn, empno, salarytyCode, salaryitemCode){
    if(!gf_IsNull(applcYm) && !gf_IsNull(pymntSn) && !gf_IsNull(empno) && !gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode)) {
        var jsonParameter = {
            applcYm : applcYm,
            pymntSn : pymntSn,
            empno : empno,
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode
        };
        var dataSource = gf_NoAsyncTransaction('mpscal005/findMpscal005', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYm) && gf_IsNull(data.pymntSn) && gf_IsNull(data.empno) && gf_IsNull(data.salarytyCode) && gf_IsNull(data.salaryitemCode)) {
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
    var checkSalarytyCode;
    var checkSalaryitemCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal005 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpscal005 = 0;
        save_Row_Ids_Mpscal005 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpscal005 = rowNum;
        save_Row_Ids_Mpscal005 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal005 = rowNum;
        save_Row_Ids_Mpscal005 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkApplcYm = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid');
                    checkPymntSn = gf_DhxGetValue(dhxGridObjet, rowId, 'pymntSn', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkSalarytyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid');
                    checkSalaryitemCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid');
                    if(!gf_IsNull(checkApplcYm, checkPymntSn, checkEmpno, checkSalarytyCode, checkSalaryitemCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYm', 'grid');
                            var pymntSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'pymntSn', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var salarytyCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salarytyCode', 'grid');
                            var salaryitemCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salaryitemCode', 'grid');
                            if(((applcYm == checkApplcYm) && (pymntSn == checkPymntSn) && (empno == checkEmpno) && (salarytyCode == checkSalarytyCode) && (salaryitemCode == checkSalaryitemCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscal005( checkApplcYm, checkPymntSn, checkEmpno, checkSalarytyCode, checkSalaryitemCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
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
        dhxGridMpscal005.selectRowById(validFalseFistRowId);
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
		gf_FormSetValue('searchFormMpscal005', 'pymntDe', data.pymntDe, 'text');
		gf_FormSetValue('searchFormMpscal005', 'salarytyCodeNm', data.salarytyCodeNm, 'text');
		gf_FormSetValue('searchFormMpscal005', 'pymntSn', data.pymntSn, 'hidden');
		gf_FormSetValue('searchFormMpscal005', 'pymntDtls', data.pymntDtls, 'text');
		gf_FormSetValue('searchFormMpscal005', 'closAt', data.closAt, 'text');
		gf_FormSetValue('searchFormMpscal005', 'applcYm', data.applcYm, 'text');
	}
};

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMpscal005', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpscal005', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormMpscal005', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMpscal005', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMpscal005","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpscal005', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal005', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpscal005', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal005', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpscal005', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal005', 'korNm', 'text');
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
	 		gf_FormSetValue('searchFormMpscal005', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal005', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMpscal005', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal005', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpscal005', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMpscal005', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpscal005","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpscal005","empno","korNm", gBplcCode, "Y");
	  	}
  	}
	
}

var SumMpscal005 = function(){

	var pymntDe = gf_FormGetValue('searchFormMpscal005', 'pymntDe', 'text');
	if(gf_IsNull(pymntDe)){
		gf_DivMsgAlert('지급일자를 입력해주세요.');
        return false;
	}
	// 그리드에 체크된 rowIds 값을 넣는다 
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscalEmp, 'chk');
	if(gf_IsNull(rowIds)){
		gf_DivMsgAlert('사원을 선택해 주세요.');
        return false;
	}
	var rId = dhxGridMpscalEmp.getSelectedRowId();
	
	var empnos = [];
	$.each(rowIds, function(index, value){
		empnos.push(dhxGridMpscalEmp.cells(value, gf_GetDhxGridColumId(dhxGridMpscalEmp, 'empno')).getValue());
	});
	
	var applcYm = gf_FormGetValue('searchFormMpscal005', 'applcYm', 'text').replaceAll("-","") ;
	var pymntSn = gf_FormGetValue('searchFormMpscal005', 'pymntSn', 'hidden');
    var jsonParameter = {
    		applcYm : applcYm,
    		empnos : empnos,
    		pymntSn : pymntSn
    };
    
	gf_Transaction('', 'mpscal005/MPS_PYMNTDE', jsonParameter, 'CallbackMessage', false, 'POST');
}

var CallbackMessage = function(strSvcID, targetID, data) {
	if (data.data.code == "100"){
        gf_DivMsgAlert(data.data.message);
        return false;
	}
	if (data.data.code == "999"){
        gf_DivMsgAlert(data.data.message);
        return false;
	}
	if (data.data.code == "000"){
        gf_DivMsgAlert("급여계산이 완료되었습니다.");
        
		var applcYm = gf_FormGetValue('searchFormMpscal005', 'applcYm', 'text');
		var pymntSn = gf_FormGetValue('searchFormMpscal005', 'pymntSn', 'hidden');
		console.log(applcYm)
	    var jsonParameter = {
	    		applcYm : applcYm,
	    		pymntSn : pymntSn
	    };
	    
	    gf_Transaction('', 'mpscal005/searchMpscalEmp', jsonParameter, 'fn_CallbackSearchMpscalEmp', false, 'GET');
	    
        return true;
	}
};