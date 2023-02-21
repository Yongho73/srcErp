/**
 *    프로그램       : 금액기준등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.13
 *    사용테이블      : MPS_APPLCS_STDR
 * sourceGen version : 2020.06.29.01 (2020.07.13)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsbsc004 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsbsc004 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsbsc004 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsbsc004 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsbsc004 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsbsc004 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsbsc004 = 0;  //그리드 삭제 수량 
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsbsc004();
    cf_SetComponentsMpsbsc004();
    cf_SetEventListenerMpsbsc004();
    cf_InitFormMpsbsc004();
    cf_SetBindingMpsbsc004();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc004 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsbsc004").validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('divComboSearchSalarytyCode', 'searchSalarytyCode', 'searchSalarytyCode', 'search', 'C062', '' , '', '', 'ordr', '','',''); //급여유형
};

var dhxGridMpsbsc004;
var dhxGridMpsbsc004Master;
var cf_SetComponentsMpsbsc004 = function() {
	
	var dhxGridMpsbsc004MasterHeaderInfo = [];
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc004" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('급여 유형', '80', 'center', 'str', 'ro', false, 'salarytyNm', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('급여 항목', '*', 'left', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('적용 기준', '90', 'left', 'str', 'ro', false, 'applcStdrSeNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */	
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('계산 구분', '90', 'left', 'str', 'ro', false, 'calcSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('사용시작일', '100', 'center', 'str', 'ro', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('사용종료일', '100', 'center', 'str', 'ro', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('급여 유형코드', '100', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('급여 항목코드', '100', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('적용 기준', '100', 'center', 'str', 'ro', true, 'applcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('계산 구분', '100', 'center', 'str', 'ro', true, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
	dhxGridMpsbsc004MasterHeaderInfo.push(gf_MakeDhxGridHeader('적용기준순번', '100', 'center', 'str', 'ro', true, 'applcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
	
	dhxGridMpsbsc004Master = gf_MakeDhxGrid('dataListMpsbsc004Master', dhxGridMpsbsc004MasterHeaderInfo, true, false, false);
	dhxGridMpsbsc004Master.enableRowspan(true);	
	dhxGridMpsbsc004Master.enableAutoWidth(false);
	dhxGridMpsbsc004Master.setEditable(true);
	dhxGridMpsbsc004Master.setColumnMinWidth(150, 2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
	
	dhxGridMpsbsc004Master.attachEvent('onRowSelect', fn_SearchMpsbsc004);
	
	
    var dhxGridMpsbsc004HeaderInfo = [];
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc004" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준순번', '100', 'right', 'int', 'ro', false, 'applcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여유형코드', '100', 'center', 'str', 'ro', false, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목코드', '100', 'center', 'str', 'ro', false, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('사원구분코드', '100', 'center', 'str', 'ro', false, 'emplSeCode', '', '')); /* gf_LocaleTrans('default', 'titEmplSeCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준 구분', '100', 'center', 'str', 'ro', false, 'applcStdrSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준 구분', '100', 'center', 'str', 'ro', false, 'calcStdrSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용구분', '100', 'center', 'str', 'ro', false, 'applcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산구분', '100', 'center', 'str', 'ro', false, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산 순서', '100', 'right', 'int', 'ro', false, 'calcOrdr', '', '')); /* gf_LocaleTrans('default', 'titCalcOrdr') */
    dhxGridMpsbsc004 = gf_MakeDhxGrid('dataListMpsbsc004', dhxGridMpsbsc004HeaderInfo, true, false, false);
    dhxGridMpsbsc004.enableAutoWidth(false);
    dhxGridMpsbsc004.setEditable(true);

    dhxGridMpsbsc004.setColumnMinWidth(20,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
};


var eventIdMpsbsc004 = [];
var previousRowIdMaster;
var previousRowId;


var cf_SetEventListenerMpsbsc004 = function() {
	var eventIdMpsbsc004Master = [];
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    
    eventIdMpsbsc004 = gf_GridDetachEvent(dhxGridMpsbsc004, eventIdMpsbsc004);
    eventId = dhxGridMpsbsc004.attachEvent("onRowDblClicked", function(id, ind){    	    	
    	if( dhxGridMpsbsc004.cells(id,dhxGridMpsbsc004.getColIndexById("calcSe")).getValue() =="001") {// && cInd ==4){  // 급여계산식 선택했을때
    		if(dhxGridMpsbsc004.cells(id,dhxGridMpsbsc004.getColIndexById("applcSe")).getValue() =="002" && ind == 2) {
    			fn_SalaryCalcItem();
    		}
    	}
    	else  dhxGridMpsbsc004.editCell();
    	
    });
    
    eventIdMpsbsc004.push(eventId);
    
    
    eventIdMpsbsc004 = gf_GridDetachEvent(dhxGridMpsbsc004, eventIdMpsbsc004);
    eventId = dhxGridMpsbsc004.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsbsc004();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsbsc004.getColumnsNum();
            var rowNum = dhxGridMpsbsc004.getRowsNum();
            var selectedId = dhxGridMpsbsc004.getSelectedRowId();
            var ind        = dhxGridMpsbsc004.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc004.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc004.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsbsc004.selectRow(0);
                    //fn_FindMpsbsc004();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsbsc004.selectRow(rowIndex + 1);
                    fn_FindMpsbsc004();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsbsc004.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc004.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsbsc004.getSelectedRowId();
            var ind        = dhxGridMpsbsc004.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc004.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc004.getColType(ind);
            dhxGridMpsbsc004.selectCell(rowIndex+1, ind);
            fn_FindMpsbsc004();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc004.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsbsc004.getSelectedRowId();
            var ind        = dhxGridMpsbsc004.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc004.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc004.getColType(ind);
            dhxGridMpsbsc004.selectCell(rowIndex-1, ind);
            fn_FindMpsbsc004();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc004.editCell();
            }
        }
        else return true;
    });
    eventIdMpsbsc004.push(eventId);
    eventId = dhxGridMpsbsc004.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsbsc004SortGridList(ind, type, direction); 
    });
    eventIdMpsbsc004.push(eventId);
    eventId = dhxGridMpsbsc004.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc004.push(eventId);
    eventId = dhxGridMpsbsc004.attachEvent("onRowSelect", function(id, ind){    	
    	if(ind == gf_GetDhxGridColumId(dhxGridMpsbsc004, 'searchEmpButton')) {    		
    		fn_gridSearchEmpButton( id );
    	}
    });    
    eventIdMpsbsc004.push(eventId);
    eventId = dhxGridMpsbsc004.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsbsc004.push(eventId);
    /*
    eventIdMaster = dhxGridMpsbsc004Master.attachEvent("onRowSelect", function(rId, cInd){
    	console.log("dhxGridMpsbsc004Master onRowSelect")
    	fn_SearchMpsbsc004();    	
    	/*
    	if(previousRowIdMaster==rId){
    		return false;
    	} else {
    		var isUpdated;
    		dhxGridMpsbsc004.forEachRow(function(rowId) {	
    			if(!gf_IsNull(dhxDataProcessorMpsbsc004.getState(rowId))) {
    				isUpdated = true;
    				return false;
    			}
    		});
    		if(isUpdated)
	    		gf_DivMsgConfirm('행을 변경하면 금액기준이 초기화 됩니다.', 
						function(){ previousRowIdMaster = rId; fn_SearchMpsbsc004(); },
						function(){ dhxGridMpsbsc004Master.selectRowById(previousRowIdMaster); });
    		else {
    			previousRowIdMaster = rId; 
    			fn_SearchMpsbsc004();
    		}
    	}
    });
    dhxGridMpsbsc004Master.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });*/
    
    //dhxGridMpsbsc004Master.attachEvent('onRowSelect', fn_SearchMpsbsc004);
    //eventIdMpsbsc004Master.push(eventIdMaster);
    
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsbsc004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsbsc004()
    });
   
    $('#btnSaveMpsbsc004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc004();
    });
    $('#btnRemoveMpsbsc004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsbsc004();
    });
    $('#btnExcelMpsbsc004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc004();
    });
    $('#btnSearchMpsbsc004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsbsc004Master('');        
        //fn_SearchMpsbsc004('');
    });
    $('#btnResetMpsbsc004').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc004();
    });
    
    
    $(".dhx_combo_edit").addClass("aa");
    $('.objbox').on("click", function() {    	
    	var display = $(".dhx_combo_select").is(':visible')     	
    	if(display)  $(".dhx_combo_select").hide();
    });
    
    
    
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpsbsc004').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpsbsc004, $('#checkAllMpsbsc004').prop('checked'), 'chk');
    });
    $('#searchFormMpsbsc004 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpsbsc004').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsbsc004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    
};

var cf_InitFormMpsbsc004 = function() {
    $('#searchFormMpsbsc004').resetForm();
	gf_DateYmd("stdrDeSearchFormMpsbsc004");
    gf_DateYmd("useBeginDeSaveFormMpsbsc004"); //해당년도
};

var cf_SetBindingMpsbsc004 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMpsbsc004Master('');

};
//적용기준이 전체인경우 
var fn_GetAllCalcMpsbsc004 = function(userId, applcStdrSn, salarytyCode, salaryitemCode,applcSe,calcSe, salaryitemNm) {	
	var titleAmt = salaryitemNm + "  금액";
	var edType = "edn";
	var edAlign  = "right";
	
	if(calcSe == "001") {
		titleAmt = salaryitemNm + "  계산식";
		edType = "ed"; 
		edAlign  = "left";
	}
	
	var dhxGridMpsbsc004HeaderInfo = [];	  
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc004" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('직급', '150', 'center', 'str', 'ro', false, 'applcCodeNm', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */    
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(titleAmt, '*', edAlign, 'int', edType, false, 'calcNomfrmDtls', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    
    
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titEmplSeCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목코드', '100', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */    
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용코드', '100', 'center', 'str', 'ro', true, 'applcCode', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준 순번', '100', 'center', 'str', 'ro', true, 'applcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준 순번', '100', 'center', 'str', 'ro', true, 'calcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준', '100', 'center', 'str', 'ro', true, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용구분', '100', 'center', 'str', 'ro', true, 'applcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준 구분', '100', 'center', 'str', 'ro', false, 'applcStdrSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산 순서', '100', 'right', 'int', 'ro', false, 'calcOrdr', '', '')); /* gf_LocaleTrans('default', 'titCalcOrdr') */
    dhxGridMpsbsc004 = gf_MakeDhxGrid('dataListMpsbsc004', dhxGridMpsbsc004HeaderInfo, true, false, false);
    
    dhxGridMpsbsc004.setNumberFormat("0,000", dhxGridMpsbsc004.getColIndexById("calcNomfrmDtls"), ".", ","); 
    
    dhxGridMpsbsc004.enableAutoWidth(false);
    dhxGridMpsbsc004.setEditable(true);
    
    
    var jsonParameter = {
    		applcStdrSn : applcStdrSn, 
            salarytyCode : salarytyCode, //gf_FormGetValue('searchFormMpsbsc004', 'salarytyCode', 'text'),
            salaryitemCode : salaryitemCode, //gf_FormGetValue('searchFormMpsbsc004', 'salaryitemCode', 'text')
            applcSe : applcSe,
            calcSe : calcSe,
     };
    gf_Transaction(userId, 'mpsbsc004/searchMpsbsc004', jsonParameter, 'fn_CallbackSearchMpsbsc004', false, 'GET');
};

var fn_GetGradeCalcMpsbsc004 = function(userId, applcStdrSn, salarytyCode, salaryitemCode,applcSe,calcSe, salaryitemNm) {
	
	var titleAmt = salaryitemNm + "  금액";
	
	if(calcSe == "001")
		titleAmt = salaryitemNm + "  계산식";
	
	var applcCodeNm = "";
	if(applcSe == "002") applcCodeNm= "직급";
	else if(applcSe == "004")  applcCodeNm= "부서";
	else if(applcSe == "006")  applcCodeNm= "직책";
	else if(applcSe == "007")  applcCodeNm= "직위";
	
	var dhxGridMpsbsc004HeaderInfo = [];	  
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc004" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(applcCodeNm, '150', 'center', 'str', 'ro', false, 'applcCodeNm', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    
    //계산구분 : 계산식, 금액
    if(calcSe == "001")   { //계산식 
    	dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(titleAmt, '*', 'left', 'str', 'ed', false, 'calcNomfrmDtls', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
	    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(titleAmt, '*', 'left', 'str','ed', false, 'calcNomfrm', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    }
    else
    	dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(titleAmt, '*', 'right', 'int', 'edn', false, 'calcNomfrmDtls', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titEmplSeCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목코드', '100', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */    
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용코드', '100', 'center', 'str', 'ro', true, 'applcCode', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준 순번', '100', 'center', 'str', 'ro', true, 'applcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준 순번', '100', 'center', 'str', 'ro', true, 'calcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준', '100', 'center', 'str', 'ro', true, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용구분', '100', 'center', 'str', 'ro', true, 'applcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    
    
    
    
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준 구분', '100', 'center', 'str', 'ro', false, 'applcStdrSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산 순서', '100', 'right', 'int', 'ro', false, 'calcOrdr', '', '')); /* gf_LocaleTrans('default', 'titCalcOrdr') */
    dhxGridMpsbsc004 = gf_MakeDhxGrid('dataListMpsbsc004', dhxGridMpsbsc004HeaderInfo, true, false, false);
    
    dhxGridMpsbsc004.setNumberFormat("0,000", dhxGridMpsbsc004.getColIndexById("calcNomfrmDtls"), ".", ","); 
    
    dhxGridMpsbsc004.enableAutoWidth(false);
    dhxGridMpsbsc004.setEditable(true);
    
    
    var jsonParameter = {
    		applcStdrSn : applcStdrSn, 
            salarytyCode : salarytyCode, //gf_FormGetValue('searchFormMpsbsc004', 'salarytyCode', 'text'),
            salaryitemCode : salaryitemCode, //gf_FormGetValue('searchFormMpsbsc004', 'salaryitemCode', 'text')
            applcSe : applcSe,
            calcSe : calcSe,
     };
    gf_Transaction(userId, 'mpsbsc004/searchGradeCalcMpsbsc004', jsonParameter, 'fn_CallbackSearchMpsbsc004', false, 'GET');
};
var fn_GetEmpCalcMpsbsc004 = function(userId, applcStdrSn, salarytyCode, salaryitemCode,applcSe,calcSe, salaryitemNm) {
	
	var titleAmt = salaryitemNm + "  금액";
	
	if(calcSe == "001")
		titleAmt = salaryitemNm + "  계산식";
	
	
	var dhxGridMpsbsc004HeaderInfo = [];	  
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc004" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', false, 'applcCode', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */   
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchImgButton',false,'searchEmpButton','',''));    
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('성명', '100', 'center', 'str', 'ro', false, 'applcCodeNm', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */    
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(titleAmt, '*', 'right', 'int', 'edn', false, 'calcNomfrmDtls', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titEmplSeCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목코드', '100', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */    
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용코드', '100', 'center', 'str', 'ro', true, 'applcCode', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준 순번', '100', 'center', 'str', 'ro', true, 'applcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준 순번', '100', 'center', 'str', 'ro', true, 'calcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준', '100', 'center', 'str', 'ro', true, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용구분', '100', 'center', 'str', 'ro', true, 'applcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
       
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준 구분', '100', 'center', 'str', 'ro', false, 'applcStdrSe', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSe') */
    //dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산 순서', '100', 'right', 'int', 'ro', false, 'calcOrdr', '', '')); /* gf_LocaleTrans('default', 'titCalcOrdr') */
    dhxGridMpsbsc004 = gf_MakeDhxGrid('dataListMpsbsc004', dhxGridMpsbsc004HeaderInfo, true, false, false);
    
    dhxGridMpsbsc004.setNumberFormat("0,000", dhxGridMpsbsc004.getColIndexById("calcNomfrmDtls"), ".", ","); 
    
    dhxGridMpsbsc004.enableAutoWidth(false);
    dhxGridMpsbsc004.setEditable(true);
    dhxGridMpsbsc004.setColumnMinWidth(150,  4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    
    var jsonParameter = {
    		applcStdrSn : applcStdrSn, 
            salarytyCode : salarytyCode, //gf_FormGetValue('searchFormMpsbsc004', 'salarytyCode', 'text'),
            salaryitemCode : salaryitemCode, //gf_FormGetValue('searchFormMpsbsc004', 'salaryitemCode', 'text')
            applcSe : applcSe,
            calcSe : calcSe,
     };
    gf_Transaction(userId, 'mpsbsc004/searchGradeCalcMpsbsc004', jsonParameter, 'fn_CallbackSearchMpsbsc004', false, 'GET');
};

var fn_GetEmpPeriodCalcMpsbsc004 = function(userId, applcStdrSn, salarytyCode, salaryitemCode,applcSe,calcSe, salaryitemNm) {
	
	var titleAmt = salaryitemNm + "  금액";
	
	if(calcSe == "001")
		titleAmt = salaryitemNm + "  계산식";	
	
	var dhxGridMpsbsc004HeaderInfo = [];	  
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('근속기간 시작 년수', '80', 'right', 'int', 'edn', false, 'cnwkPdBeginYcnt', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '40', 'center', 'str', 'ro', false, 'dummy', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '80', 'center', 'str', 'coro', false, 'cnwkPdBeginSeCode', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('근속기간 종료 년수', '80', 'right', 'int', 'edn', false, 'cnwkPdEndYcnt', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '40', 'center', 'str', 'ro', false, 'dummy', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(' #cspan', '80', 'center', 'str', 'coro', false, 'cnwkPdEndSeCode', '', '')); /* gf_LocaleTrans('default', 'titApplcStdrSn') */        
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader(titleAmt, '*', 'right', 'int', 'edn', false, 'calcNomfrmDtls', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '100', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titEmplSeCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('급여항목코드', '100', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */    
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용기준 순번', '100', 'center', 'str', 'ro', true, 'applcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준 순번', '100', 'center', 'str', 'ro', true, 'calcStdrSn', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('계산기준', '100', 'center', 'str', 'ro', true, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    dhxGridMpsbsc004HeaderInfo.push(gf_MakeDhxGridHeader('적용구분', '100', 'center', 'str', 'ro', true, 'applcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcCode') */
    
    
    dhxGridMpsbsc004 = gf_MakeDhxGrid('dataListMpsbsc004', dhxGridMpsbsc004HeaderInfo, true, false, false);    
    dhxGridMpsbsc004.setNumberFormat("0,000", dhxGridMpsbsc004.getColIndexById("calcNomfrmDtls"), ".", ","); 
    
    dhxGridMpsbsc004.enableAutoWidth(false);
    dhxGridMpsbsc004.setEditable(true);
    dhxGridMpsbsc004.setColumnMinWidth(150,  4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
	// 입력방식
	var jsonParameter = {
		codekindCode : "C370",
		exceptCode : "",
		sortOrder : "ordr"
	};
	
	var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
	gf_ComboDataSet(dhxGridMpsbsc004, dhxGridMpsbsc004.getColIndexById("cnwkPdBeginSeCode"), dataSource.data); /* 그리드콤보 */
	gf_ComboDataSet(dhxGridMpsbsc004, dhxGridMpsbsc004.getColIndexById("cnwkPdEndSeCode"), dataSource.data); /* 그리드콤보 */    
    
     jsonParameter = {
    		applcStdrSn : applcStdrSn, 
            salarytyCode : salarytyCode, //gf_FormGetValue('searchFormMpsbsc004', 'salarytyCode', 'text'),
            salaryitemCode : salaryitemCode, //gf_FormGetValue('searchFormMpsbsc004', 'salaryitemCode', 'text')
            applcSe : applcSe,
            calcSe : calcSe,
     };
    gf_Transaction(userId, 'mpsbsc004/searchGradeCalcMpsbsc004', jsonParameter, 'fn_CallbackSearchMpsbsc004', false, 'GET');
    
};

/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var fn_SearchMpsbsc004Master = function(userId) {
		
    var jsonParameter = {
		stdrDe : gf_FormGetValue('searchFormMpsbsc004', 'stdrDe', 'text'),
        applcStdrSn : gf_FormGetValue('searchFormMpsbsc004', 'applcStdrSn', 'text'),
       // salarytyCode : gf_FormGetValue('searchFormMpsbsc004', 'salarytyCode', 'text'),
        salarytyCode : gf_FormGetValue('searchFormMpsbsc004', 'searchSalarytyCode', 'combo'),
        salaryitemNm : gf_FormGetValue('searchFormMpsbsc004', 'salaryitemNm', 'text')
    };
    gf_Transaction(userId, 'mpsbsc004/searchMpsbsc004Master', jsonParameter, 'fn_CallbackSearchMpsbsc004Master', false, 'GET');
};

var dhxDataProcessorMpsbsc004Master;
var fn_CallbackSearchMpsbsc004Master = function(strSvcID, targetID, data) {
    dhxGridMpsbsc004Master.clearAll();
    //fn_DhxDataProcessorMpsbsc004(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc004Master');
        dhxGridMpsbsc004Master.parse(data.data.records, 'js'); 

		dhxGridMpsbsc004Master.selectRow(0); 
        fn_SearchMpsbsc004();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc004Master');
    	gf_NoFoundDataOnGridMsg('dataListMpsbsc004');    	
        //fn_InitInputFormMpsbsc004();
        //fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMpsbsc004Master").text(data.data.records.length);
   // cf_SetEventListenerMpsbsc004();
};

/**
 * 조회
 */
var fn_SearchMpsbsc004 = function(userId) {
	
	var applcStdrSn 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'applcStdrSn')).getValue();
	var salarytyCode 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'salarytyCode')).getValue();
	var salaryitemCode 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'salaryitemCode')).getValue();
	var applcSe 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'applcSe')).getValue();
	var calcSe 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'calcSe')).getValue();	
	var salaryitemNm 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'salaryitemNm')).getValue();
		
	
	if(applcSe=="001"){  //전체
		fn_GetAllCalcMpsbsc004(userId, applcStdrSn,  salarytyCode, salaryitemCode,applcSe, calcSe, salaryitemNm); //전체
	}  else if(applcSe=="002" ||  applcSe=="006" || applcSe=="007" || applcSe=="004" ) {  //직급별, 	 직책별, 직위별, 부서별 
		fn_GetGradeCalcMpsbsc004(userId, applcStdrSn,  salarytyCode, salaryitemCode,applcSe, calcSe, salaryitemNm); //직급별 
	}	else if(applcSe=="003" ) {  //사원별
		fn_GetEmpCalcMpsbsc004(userId, applcStdrSn,  salarytyCode, salaryitemCode,applcSe, calcSe, salaryitemNm); //사원별
	}	else if(applcSe=="010" ) {  //근속기간
		
		fn_GetEmpPeriodCalcMpsbsc004(userId, applcStdrSn,  salarytyCode, salaryitemCode,applcSe, calcSe, salaryitemNm); //사원별		
	}	else if(applcSe=="004" ) {  //부서별
		//fn_GetEmpCalcMpsbsc004(userId, applcStdrSn,  salarytyCode, salaryitemCode,applcSe, calcSe, salaryitemNm); //부서별
	}
	
	/*
    var jsonParameter = {
        applcStdrSn : gf_FormGetValue('searchFormMpsbsc004', 'applcStdrSn', 'text'),
        salarytyCode : salarytyCode, //gf_FormGetValue('searchFormMpsbsc004', 'salarytyCode', 'text'),
        salaryitemCode : salaryitemCode //gf_FormGetValue('searchFormMpsbsc004', 'salaryitemCode', 'text')
    };
    gf_Transaction(userId, 'mpsbsc004/searchMpsbsc004', jsonParameter, 'fn_CallbackSearchMpsbsc004', false, 'GET');
    */
};

var dhxDataProcessorMpsbsc004;

var fn_CallbackSearchMpsbsc004 = function(strSvcID, targetID, data) {
    dhxGridMpsbsc004.clearAll();
    fn_DhxDataProcessorMpsbsc004();
    
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc004');
        dhxGridMpsbsc004.parse(data.data.records, 'js');
 
        if(save_Row_Num_Mpsbsc004 == 0 && save_All_Sta_Mpsbsc004 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpsbsc004.selectRow(0); 
        } else if(save_Row_Sta_Mpsbsc004 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpsbsc004.selectRow(0);
        } else if(save_All_Sta_Mpsbsc004 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpsbsc004.selectRow(save_Row_Num_Mpsbsc004); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpsbsc004.selectRow(save_Row_Num_Mpsbsc004);   //개발자 수정 필요  
            //var findCell = dhxGridMpsbsc004.findCell(save_Row_Ids_Mpsbsc004, gf_GetDhxGridColumId(dhxGridMpsbsc004,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpsbsc004.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpsbsc004.selectRow(0);
            //} 
        } 
 
        //fn_FindMpsbsc004();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc004');
   //     fn_InitInputFormMpsbsc004();
        fn_FormDisabled(true);
        
        var calcSe 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'calcSe')).getValue();
        
        //계산구분
        if(calcSe == "002"){
        	fn_AddMpsbsc004();
        }
        
        
    }
    $("#spanCntSearchFormMpsbsc004").text(data.data.records.length);    
    cf_SetEventListenerMpsbsc004();
};
var fn_DhxDataProcessorMpsbsc004 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc004 = new dataProcessor(gv_ContextPath+'/mpsbsc004/saveMpsbsc004'); //lock feed url
    dhxDataProcessorMpsbsc004.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc004.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc004.init(dhxGridMpsbsc004); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc004.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc004.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc004.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                  //  fn_SearchMpsbsc004();
                    $("#checkAllMpsbsc004").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMpsbsc004 = function() {
    var rId = dhxGridMpsbsc004.getSelectedRowId();
    var status = dhxDataProcessorMpsbsc004.getState(rId);
   // fn_FormDisabled(false);

    gf_FormSetValue("saveFormMpsbsc004", "applcStdrSn", gf_DhxGetValue(dhxGridMpsbsc004, rId, 'applcStdrSn',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc004", "salarytyCode", gf_DhxGetValue(dhxGridMpsbsc004, rId, 'salarytyCode',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc004", "salaryitemCode", gf_DhxGetValue(dhxGridMpsbsc004, rId, 'salaryitemCode',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc004", "emplSeCode", gf_DhxGetValue(dhxGridMpsbsc004, rId, 'emplSeCode',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc004", "applcStdrSe", gf_DhxGetValue(dhxGridMpsbsc004, rId, 'applcStdrSe',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc004", "calcOrdr", gf_DhxGetValue(dhxGridMpsbsc004, rId, 'calcOrdr',  'grid'), '');

    if(status == 'inserted') {
        $('#saveFormMpsbsc004 input[name="applcStdrSn"]').prop('disabled', false);
        $('#saveFormMpsbsc004 input[name="salarytyCode"]').prop('disabled', false);
        $('#saveFormMpsbsc004 input[name="salaryitemCode"]').prop('disabled', false);
    } else {
        $('#saveFormMpsbsc004 input[name="applcStdrSn"]').prop('disabled', true);
        $('#saveFormMpsbsc004 input[name="salarytyCode"]').prop('disabled', true);
        $('#saveFormMpsbsc004 input[name="salaryitemCode"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMpsbsc004 = function() {
    $('#saveFormMpsbsc004 input[name="applcStdrSn"]').prop('disabled', false);
    $('#saveFormMpsbsc004 input[name="salarytyCode"]').prop('disabled', false);
    $('#saveFormMpsbsc004 input[name="salaryitemCode"]').prop('disabled', false);
    $('#saveFormMpsbsc004').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMpsbsc004 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMpsbsc004 = function() {	
    dhxGridMpsbsc004.clearSelection();
	var applcStdrSn 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'applcStdrSn')).getValue();
	var salarytyCode 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'salarytyCode')).getValue();
	var applcStdrSeNm 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'applcStdrSeNm')).getValue();
	var salaryitemCode 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'salaryitemCode')).getValue();
	var applcSe 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'applcSe')).getValue();
	var calcSe 	= dhxGridMpsbsc004Master.cells(dhxGridMpsbsc004Master.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsbsc004Master,'calcSe')).getValue();	
	/*console.log("applcStdrSn" + applcStdrSn);
	console.log("salarytyCode" + salarytyCode);
	console.log("salaryitemCode" + salaryitemCode);
	console.log("applcSe" + applcSe);
	console.log("calcSe" + calcSe);*/
	
	//전체, 사원별, 부서별
	if(applcSe == "001" || applcSe== "003" || applcSe== "004"  ||  applcSe== "010" );
	else {
        gf_DivMsgAlert(applcStdrSeNm + " 기준은 신규 추가 작성되지 않습니다.");
        return false;
	}
    //fn_InitInputFormMpsbsc004();
    var initValueArr = [];
    if(applcSe =="010")  {//근속기간
	    initValueArr.push(''); //no	    
	    initValueArr.push(''); //
	    initValueArr.push('년'); //dummy
	    initValueArr.push(''); //applcStdrSn
	    initValueArr.push(''); //applcStdrSn
	    initValueArr.push('년'); //dummy
	    initValueArr.push(''); // cnwkPdEndSeCode	    
	    initValueArr.push(''); //calcNomfrmDtls	
	    initValueArr.push(salarytyCode); //salarytyCode
        initValueArr.push(salaryitemCode); //salaryitemCode                
        initValueArr.push(applcStdrSn); //applcStdrSn
        initValueArr.push('9999'); //calcStdrSn
        initValueArr.push(calcSe); //calcSe
        initValueArr.push(applcSe); //applcSe  
    }
    else if(applcSe !="003")  {//사원별
	    initValueArr.push(''); //no
	    initValueArr.push(''); //checkbox
	    initValueArr.push(''); //applcStdrSn
	    initValueArr.push(''); //salarytyCode
	    initValueArr.push(''); //salaryitemCode
	    initValueArr.push(''); //emplSeCode
	    initValueArr.push(''); //applcStdrSe
	    initValueArr.push(''); //calcOrdr
    }
    else {    		   
    	initValueArr.push(''); //no
        initValueArr.push(''); //applcCode
        initValueArr.push(''); //applcCode
        initValueArr.push(''); //applcCodeNm
        initValueArr.push(''); //calcNomfrmDtls
        initValueArr.push(salarytyCode); //salarytyCode
        initValueArr.push(salaryitemCode); //salaryitemCode                
        initValueArr.push(applcStdrSn); //applcStdrSn
        initValueArr.push('9999'); //calcStdrSn
        initValueArr.push(calcSe); //calcSe
        initValueArr.push(applcSe); //applcSe        
    }
    	
    dhxGridMpsbsc004.addRow(dhxGridMpsbsc004.uid(), initValueArr, 0);
    dhxGridMpsbsc004.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc004');
    
    //$('#btnPopEmpSearchMpsbsc004').show();
    //fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsbsc004SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsbsc004, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsbsc004', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsbsc004', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsbsc004, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){
            dhxGridMpsbsc004.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsbsc004', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsbsc004', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc004, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsbsc004.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsbsc004', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsbsc004', 'sortColumId', '', 'text'); 
            dhxGridMpsbsc004.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsbsc004.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsbsc004', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsbsc004', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc004, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc004 = function() {
    var edCnt = 0;
    
    save_Add_Cnt_Mpsbsc004 = 0; 
    save_Edt_Cnt_Mpsbsc004 = 0; 
    save_Del_Cnt_Mpsbsc004 = 0;
    
    dhxGridMpsbsc004.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsbsc004.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsbsc004.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsbsc004 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsbsc004 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsbsc004 += 1; 
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
        save_All_Sta_Mpsbsc004 = 0; 
        if(save_Add_Cnt_Mpsbsc004 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsbsc004 + "건";
            save_All_Sta_Mpsbsc004 = 1; 
        } 
        if(save_Edt_Cnt_Mpsbsc004 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsbsc004 + "건"; 
        } 
        if(save_Del_Cnt_Mpsbsc004 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsbsc004 + "건"; 
            save_All_Sta_Mpsbsc004 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //
        if(confirmModalMpsbsc004(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsbsc004 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;            
            fn_SaveMpsbsc004_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsbsc004_Send = function() {
    //if(fn_GridValidation(dhxGridMpsbsc004, dhxDataProcessorMpsbsc004)) {
        dhxDataProcessorMpsbsc004.sendData();
   // }
}
/**
 * 삭제
 */
var fn_RemoveMpsbsc004 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsbsc004, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpsbsc004.forEachRow(function(rowId) {
            state = dhxDataProcessorMpsbsc004.getState(rowId);
            if(dhxGridMpsbsc004.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsbsc004, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpsbsc004.getRowIndex(rowId);
                    dhxGridMpsbsc004.deleteRow(rowId);
                    dhxGridMpsbsc004.selectRow(rowNum);
                    fn_FindMpsbsc004();
                }
                else dhxDataProcessorMpsbsc004.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc004 = function () {
    var titMpsbsc004 = '금액기준등록'; /* gf_LocaleTrans('default', 'titMpsbsc004') */
    var jsonParameter = {
        applcStdrSn : gf_FormGetValue('searchFormMpsbsc004', 'applcStdrSn', 'text'),
        salarytyCode : gf_FormGetValue('searchFormMpsbsc004', 'salarytyCode', 'text'),
        salaryitemCode : gf_FormGetValue('searchFormMpsbsc004', 'salaryitemCode', 'text')
    };
    var header = [[
        '적용기준순번' /* gf_LocaleTrans('default', 'titApplcStdrSn') */,
        '급여유형코드(급여/상여/특별성과)' /* gf_LocaleTrans('default', 'titSalarytyCode') */,
        '급여항목코드' /* gf_LocaleTrans('default', 'titSalaryitemCode') */,
        '사원구분코드(C068)' /* gf_LocaleTrans('default', 'titEmplSeCode') */,
        '적용기준 구분(C118)' /* gf_LocaleTrans('default', 'titApplcStdrSe') */,
        '계산 순서' /* gf_LocaleTrans('default', 'titCalcOrdr') */
    ]];
    var dataId = [[ 'applcStdrSn', 'salarytyCode', 'salaryitemCode', 'emplSeCode', 'applcStdrSe', 'calcOrdr' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsbsc004 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc004;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc004/excelMpsbsc004', jsonParameter);
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
    $('#saveFormMpsbsc004 #applcStdrSnSaveFormMpsbsc004').parent().append(
    '<div class="error" id="applcStdrSnSaveFormMpsbsc004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc004 #salarytyCodeSaveFormMpsbsc004').parent().append(
    '<div class="error" id="salarytyCodeSaveFormMpsbsc004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc004 #salaryitemCodeSaveFormMpsbsc004').parent().append(
    '<div class="error" id="salaryitemCodeSaveFormMpsbsc004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc004 = function(applcStdrSn, salarytyCode, salaryitemCode){
    if(!gf_IsNull(applcStdrSn) && !gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode)) {
        var jsonParameter = {
            applcStdrSn : applcStdrSn,
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc004/findMpsbsc004', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcStdrSn) && gf_IsNull(data.salarytyCode) && gf_IsNull(data.salaryitemCode)) {
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
    var state = dhxDataProcessorMpsbsc004.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMpsbsc004').validate().form()){
                if(state == 'inserted') {
                    var applcStdrSn = gf_FormGetValue('saveFormMpsbsc004', 'applcStdrSn', 'text');
                    var salarytyCode = gf_FormGetValue('saveFormMpsbsc004', 'salarytyCode', 'text');
                    var salaryitemCode = gf_FormGetValue('saveFormMpsbsc004', 'salaryitemCode', 'text');
                    if(fn_CheckDupMpsbsc004(applcStdrSn, salarytyCode, salaryitemCode)) return true;
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
    var checkApplcStdrSn;
    var checkSalarytyCode;
    var checkSalaryitemCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsbsc004 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mpsbsc004 == 'deleted') {
        save_Row_Num_Mpsbsc004 = 0;
        save_Row_Ids_Mpsbsc004 = "";
    } else if(save_Row_Sta_Mpsbsc004 == 'inserted') {
        save_Row_Num_Mpsbsc004 = rowNum;
        save_Row_Ids_Mpsbsc004 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsbsc004 = rowNum;
        save_Row_Ids_Mpsbsc004 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcStdrSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcStdrSn');
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
                    checkApplcStdrSn = gf_DhxGetValue(dhxGridObjet, rowId, 'applcStdrSn', 'grid');
                    checkSalarytyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid');
                    checkSalaryitemCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid');
                    if(!gf_IsNull(checkApplcStdrSn, checkSalarytyCode, checkSalaryitemCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcStdrSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcStdrSn', 'grid');
                            var salarytyCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salarytyCode', 'grid');
                            var salaryitemCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salaryitemCode', 'grid');
                            if(((applcStdrSn == checkApplcStdrSn) && (salarytyCode == checkSalarytyCode) && (salaryitemCode == checkSalaryitemCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcStdrSn');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsbsc004( checkApplcStdrSn, checkSalarytyCode, checkSalaryitemCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcStdrSn');
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
        dhxGridMpsbsc004.selectRowById(validFalseFistRowId);
        fn_FindMpsbsc004();
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
//사원팝업
var fn_gridSearchEmpButton = function( rid ) {		
	 gf_EmpPopup('', '', '', '1000', 'Y', 'fn_CallbackGridSearchEmpButton', rid);
};
//사원팝업Callback
var fn_CallbackGridSearchEmpButton = function(data, rid) {
	if(!gf_IsNull(data.empno)) {
		gf_DhxSetValue(dhxGridMpsbsc004, rid, 'applcCode', data.empno, 'grid');
		gf_DhxSetValue(dhxGridMpsbsc004, rid, 'applcCodeNm', data.korNm, 'grid');
	}
};



var fn_SalaryCalcItem= function (formId ) {
	
	var title  = "급여계산항목";

	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='bpopupCalcMpsbsc004']").size() <= 0) {
		$('body').append("<div id='bpopupCalcMpsbsc004' formid='" + formId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupCalcMpsbsc004').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			var id 		= 'bpopupCalcMpsbsc004';
			var ajaxUrl = gv_ContextPath+'/mpsbsc004/popup/findMpsbsc004SalCalcItemList/view';
			var left	= 200;
			var top		= 300;
			var width	= 600;
			var height	= 650;
			
			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupCalcMpsbsc004 .b-close').click();
			});
		},
		onClose:function(){						
			dhxWindows.unload();
			$('body').find("div[id='bpopupCalcMpsbsc004']").remove();			
		}
	},function(){});

	return dhxWindowObj;
}