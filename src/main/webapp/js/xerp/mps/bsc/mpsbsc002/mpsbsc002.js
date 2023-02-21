/**
 *    프로그램       : 급여항목기준관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.07
 *    사용테이블      : MPS_ITEM_STDR
 * sourceGen version : 2020.06.29.01 (2020.08.07)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsbsc002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsbsc002 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsbsc002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsbsc002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsbsc002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsbsc002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsbsc002 = 0;  //그리드 삭제 수량 
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/

$(function() {
    cf_InitParamMpsbsc002();
    cf_SetComponentsMpsbsc002();
    cf_SetEventListenerMpsbsc002();
    cf_InitFormMpsbsc002();
    cf_SetBindingMpsbsc002();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc002 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsbsc002").validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('divComboSearchSalarytyCode', 'searchSalarytyCode', 'searchSalarytyCode', 'search', 'C062', '' , '', '', 'ordr', '','',''); //급여유형 
    gf_MakeComboBasic('divComboSalaryitemCode','salaryitemCode','sel','width:200px','mpsbsc002/combo/searchComboMpsbsc002List','reqirded'); //급여항목 리스트 
    gf_ComboCode('divComboSalarytyCode', 'salarytyCode', 'salarytyCode', 'sel', 'C062', '' , '', '', 'ordr', 'required','',''); //급여유형
    gf_ComboCode('divComboTaxtAt', 'taxtAt', 'taxtAt', 'add', 'C066', '' , '', '', 'asc', 'required','',''); //과세여부
    gf_ComboCode('divComboCalcSe', 'calcSe', 'calcSe', 'add', 'C430', '' , 'width:31%', '', 'ordr', '');	//계산구분코드
    gf_ComboCode('divComboApplcSe', 'applcSe', 'applcSe', 'add', 'C118', '' , 'width:31%', '', 'ordr', '');	//적용기준구분
    $('#stdrAmtSaveFormMpsbsc002').number(true);
    $('#lmtAmtSaveFormMpsbsc002').number(true);
};

var dhxGridMpsbsc002;
var cf_SetComponentsMpsbsc002 = function() {
    var dhxGridMpsbsc002HeaderInfo = [];
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    //dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsbsc002" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('급여유형', '60', 'center', 'str', 'ro', false, 'salarytyNm', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '*', 'left', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('구분', '60', 'center', 'str', 'ro', false, 'pymntddcSe', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('기준금액', '100', 'right', 'int', 'ron', false, 'stdrAmt', '', '')); /* gf_LocaleTrans('default', 'titStdrAmt') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('비과세상한', '100', 'right', 'int', 'ron', false, 'lmtAmt', '', '')); /* gf_LocaleTrans('default', 'titLmtAmt') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('과세 여부', '60', 'center', 'str', 'ro', false, 'taxtAt', '', '')); /* gf_LocaleTrans('default', 'titTaxtAt') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '60', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('귀속 년도', '100', 'left', 'str', 'ro', true, 'rversYy', '', '')); /* gf_LocaleTrans('default', 'titRversYy') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('비과세 코드', '100', 'center', 'str', 'ro', true, 'taxeCode', '', '')); /* gf_LocaleTrans('default', 'titTaxeCode') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일', '100', 'center', 'str', 'ro', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일', '100', 'center', 'str', 'ro', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('금액기준등록\n대상여부', '80', 'center', 'str', 'ch', false, 'amtStdrRegistTrgetAt', '', '')); /* gf_LocaleTrans('default', 'titAmtStdrRegistTrgetAt') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('적용 구분', '100', 'center', 'str', 'ro', true, 'applcSe', '', '')); /* gf_LocaleTrans('default', 'titApplcSe') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('계산 구분 ', '100', 'center', 'str', 'ro', true, 'calcSe', '', '')); /* gf_LocaleTrans('default', 'titCalcSe') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('급여유형코드', '100', 'center', 'str', 'ro', true, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titSalarytyCode') */
    dhxGridMpsbsc002HeaderInfo.push(gf_MakeDhxGridHeader('급여항목', '100', 'center', 'str', 'ro', true, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
   
    dhxGridMpsbsc002 = gf_MakeDhxGrid('dataListMpsbsc002', dhxGridMpsbsc002HeaderInfo, true, false, false, false);
    dhxGridMpsbsc002.enableAutoWidth(false);
    dhxGridMpsbsc002.setEditable(false);
    
    //숫자 콤마부여하기 
    dhxGridMpsbsc002.setNumberFormat("0,000", dhxGridMpsbsc002.getColIndexById("stdrAmt"), ".", ",");
    dhxGridMpsbsc002.setNumberFormat("0,000", dhxGridMpsbsc002.getColIndexById("lmtAmt"), ".", ",");
    
    dhxGridMpsbsc002.setColumnMinWidth(100,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
};

var eventIdMpsbsc002 = [];
var cf_SetEventListenerMpsbsc002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsbsc002 = gf_GridDetachEvent(dhxGridMpsbsc002, eventIdMpsbsc002);
    eventId = dhxGridMpsbsc002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsbsc002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsbsc002.getColumnsNum();
            var rowNum = dhxGridMpsbsc002.getRowsNum();
            var selectedId = dhxGridMpsbsc002.getSelectedRowId();
            var ind        = dhxGridMpsbsc002.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc002.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsbsc002.selectRow(0);
                    //fn_FindMpsbsc002();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsbsc002.selectRow(rowIndex + 1);
                    fn_FindMpsbsc002();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsbsc002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsbsc002.getSelectedRowId();
            var ind        = dhxGridMpsbsc002.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc002.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc002.getColType(ind);
            dhxGridMpsbsc002.selectCell(rowIndex+1, ind);
            fn_FindMpsbsc002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsbsc002.getSelectedRowId();
            var ind        = dhxGridMpsbsc002.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc002.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc002.getColType(ind);
            dhxGridMpsbsc002.selectCell(rowIndex-1, ind);
            fn_FindMpsbsc002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc002.editCell();
            }
        }
        else return true;
    });
    eventIdMpsbsc002.push(eventId);
    eventId = dhxGridMpsbsc002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsbsc002SortGridList(ind, type, direction); 
    });
    eventIdMpsbsc002.push(eventId);
    eventId = dhxGridMpsbsc002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc002.push(eventId);
    eventId = dhxGridMpsbsc002.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMpsbsc002();
    });
    eventIdMpsbsc002.push(eventId);
    eventId = dhxGridMpsbsc002.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsbsc002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsbsc002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsbsc002()
    });
    $('#btnSaveMpsbsc002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc002();
    });
    $('#btnRemoveMpsbsc002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsbsc002();
    });
    $('#btnExcelMpsbsc002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc002();
    });
    $('#btnSearchMpsbsc002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsbsc002('');
    });
    $('#btnResetMpsbsc002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc002();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpsbsc002').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpsbsc002, $('#checkAllMpsbsc002').prop('checked'), 'chk');
    });
    $('#searchFormMpsbsc002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpsbsc002').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsbsc002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMpsbsc002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMpsbsc002",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsbsc002 select[name="salarytyCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'salarytyCode', $(this).val());
        if($(this).val() != "") {
        	gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'salarytyNm', $(this).children("option:selected").text());
        }
    });
    $('#saveFormMpsbsc002 select[name="salaryitemCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    	var rId = dhxGridMpsbsc002.getSelectedRowId();
		var status = dhxDataProcessorMpsbsc002.getState(rId);
	    if(status == 'inserted' && !gf_IsNull($(this).val())) {
	        var jsonParameter = {salaryitemCode : $(this).val()};
	        var dataSource = gf_NoAsyncTransaction('mpsbsc002/combo/searchComboMpsbsc002List', jsonParameter, 'POST');
		    gf_FormSetValue("saveFormMpsbsc002", "useBeginDe", dataSource.data[0].useBeginDe, '');
		    gf_FormSetValue("saveFormMpsbsc002", "useEndDe", dataSource.data[0].useEndDe, '');
		}

        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'salaryitemCode', $(this).val());
        if($(this).val() != "") {
        	var salaryItemNm = $(this).children("option:selected").text();
        	var strItemNm  =  salaryItemNm.split(" ");
        	gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'salaryitemNm', strItemNm[0]);
        	gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'pymntddcSe', strItemNm[1]);
        }
    });
    $('#saveFormMpsbsc002 input[name="lmtAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'lmtAmt', $(this).val());
    });
    $('#saveFormMpsbsc002 input[name="stdrAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'stdrAmt', $(this).val());
    });
    $('#saveFormMpsbsc002 select[name="taxtAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'taxtAt', $(this).val());
    });
    $('#saveFormMpsbsc002 input[name="rversYy"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'rversYy', $(this).val());
    });
    $('#saveFormMpsbsc002 input[name="taxeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'taxeCode', $(this).val());
    });
    $('#saveFormMpsbsc002 input[name="useBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'useBeginDe', $(this).val());
    });
    $('#saveFormMpsbsc002 input[name="useEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'useEndDe', $(this).val());
    });
    $('#saveFormMpsbsc002 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        
        //gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'useAt', $(this).val());
        var val = gf_IsNull(gf_FormGetValue('saveFormMpsbsc002', 'useAt', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'useAt', val);
        
    });
    $('#saveFormMpsbsc002 input[name="amtStdrRegistTrgetAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
   //     gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'amtStdrRegistTrgetAt', $(this).val());
        var val = gf_IsNull(gf_FormGetValue('saveFormMpsbsc002', 'amtStdrRegistTrgetAt', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'amtStdrRegistTrgetAt', val);
        
    });
    $('#saveFormMpsbsc002 select[name="applcSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'applcSe', $(this).val());
    });
    $('#saveFormMpsbsc002 select[name="calcSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002, 'calcSe', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMpsbsc002 = function() {
    $('#searchFormMpsbsc002').resetForm();
	gf_DateYmd("stdrDeSearchFormMpsbsc002");
    gf_DateYmd("useBeginDeSaveFormMpsbsc002"); //해당년도
};

var cf_SetBindingMpsbsc002 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMpsbsc002('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc002 = function(userId) {
    var jsonParameter = {
		stdrDe : gf_FormGetValue('searchFormMpsbsc002', 'stdrDe', 'text').replaceAll("-", ""),
        salaryitemNm : gf_FormGetValue('searchFormMpsbsc002', 'salaryitemNm', 'text'),
    	salarytyCode : gf_FormGetValue('searchFormMpsbsc002', 'searchSalarytyCode', 'combo'),
        useAt : gf_FormGetValue('searchFormMpsbsc002', 'useAtSearchFormMpsbsc002', 'combo'),
    };
    gf_Transaction(userId, 'mpsbsc002/searchMpsbsc002', jsonParameter, 'fn_CallbackSearchMpsbsc002', false, 'GET');
};

var dhxDataProcessorMpsbsc002;
var fn_CallbackSearchMpsbsc002 = function(strSvcID, targetID, data) {
    dhxGridMpsbsc002.clearAll();
    fn_DhxDataProcessorMpsbsc002(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc002');
        dhxGridMpsbsc002.parse(data.data.records, 'js');
 
        if(save_Row_Num_Mpsbsc002 == 0 && save_All_Sta_Mpsbsc002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpsbsc002.selectRow(0); 
        } else if(save_Row_Sta_Mpsbsc002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpsbsc002.selectRow(0);
        } else if(save_All_Sta_Mpsbsc002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpsbsc002.selectRow(save_Row_Num_Mpsbsc002); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpsbsc002.selectRow(save_Row_Num_Mpsbsc002);   //개발자 수정 필요  
            //var findCell = dhxGridMpsbsc002.findCell(save_Row_Ids_Mpsbsc002, gf_GetDhxGridColumId(dhxGridMpsbsc002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpsbsc002.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpsbsc002.selectRow(0);
            //} 
        } 
 
        fn_FindMpsbsc002();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpsbsc002');
        fn_InitInputFormMpsbsc002();
        fn_FormDisabled(true);
    }
    $("#spanCntSearchFormMpsbsc002").text(data.data.records.length);
    cf_SetEventListenerMpsbsc002();
};
var fn_DhxDataProcessorMpsbsc002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc002 = new dataProcessor(gv_ContextPath+'/mpsbsc002/saveMpsbsc002'); //lock feed url
    dhxDataProcessorMpsbsc002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc002.init(dhxGridMpsbsc002); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc002();
                    $("#checkAllMpsbsc002").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMpsbsc002 = function() {
    var rId = dhxGridMpsbsc002.getSelectedRowId();
    var status = dhxDataProcessorMpsbsc002.getState(rId);

    fn_FormDisabled(false);
    
    gf_FormSetValue("saveFormMpsbsc002", "salarytyCode", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'salarytyCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpsbsc002", "salaryitemCode", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'salaryitemCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpsbsc002", "lmtAmt", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'lmtAmt',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc002", "stdrAmt", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'stdrAmt',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc002", "taxtAt", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'taxtAt',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpsbsc002", "rversYy", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'rversYy',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc002", "taxeCode", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'taxeCode',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc002", "useBeginDe", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'useBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc002", "useEndDe", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'useEndDe',  'grid'), '');
    // gf_FormSetValue("saveFormMpsbsc002", "useAt", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'useAt',  'grid'), '');
    gf_FormSetValue('saveFormMpsbsc002', 'useAt', (( gf_DhxGetValue(dhxGridMpsbsc002, rId, 'useAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMpsbsc002", "amtStdrRegistTrgetAt",(( gf_DhxGetValue(dhxGridMpsbsc002, rId, 'amtStdrRegistTrgetAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMpsbsc002", "applcSe", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'applcSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpsbsc002", "calcSe", gf_DhxGetValue(dhxGridMpsbsc002, rId, 'calcSe',  'grid'), 'combo');
    //gf_FormSetValue('saveFormMpsbsc002', 'taxtAt', data.taxtAt, 'combo');
       
    if(status == 'inserted') {
        fn_FormDisabled(false);
    } else {
       $('#salarytyCode').attr('disabled', true);
    	$('#salaryitemCode').attr('disabled', true);
    }

	$('#useBeginDeSaveFormMpsbsc002').prop('disabled', true);
	$('#useEndDeSaveFormMpsbsc002').prop('disabled', true);
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMpsbsc002 = function() {
    $('#saveFormMpsbsc002 input[name="salarytyCode"]').prop('disabled', false);
    $('#saveFormMpsbsc002 input[name="salaryitemCode"]').prop('disabled', false);
    
    $('#saveFormMpsbsc002').resetForm();        

};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMpsbsc002 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMpsbsc002 = function() {
    dhxGridMpsbsc002.clearSelection();
    fn_InitInputFormMpsbsc002();
    var initValueArr = [];

    initValueArr.push(''); //no
    initValueArr.push(''); //salarytyNm
    initValueArr.push(''); //salaryitemNm
    initValueArr.push(''); //pymntddcSe
    initValueArr.push(''); //stdrAmt
    initValueArr.push(''); //stdrAmt
    initValueArr.push(''); //lmtAmt
    initValueArr.push('1'); //taxtAt
    initValueArr.push(''); //useAt
    initValueArr.push(''); //rversYy
    initValueArr.push(''); //taxeCode
    initValueArr.push(''); //useBeginDe
    initValueArr.push(''); //useEndDe
    initValueArr.push(''); //amtStdrRegistTrgetAt
    initValueArr.push(''); //applcSe
    initValueArr.push(''); //calcSe
    initValueArr.push(''); //salarytyCode
    initValueArr.push(''); //salaryitemCode
    dhxGridMpsbsc002.addRow(dhxGridMpsbsc002.uid(), initValueArr, 0);
    dhxGridMpsbsc002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc002');
    $('#btnPopEmpSearchMpsbsc002').show();
    fn_FormDisabled(false);
    gf_FormSetValue('saveFormMpsbsc002', 'useAt', true, 'chkbox');

	$('#useBeginDeSaveFormMpsbsc002').prop('disabled', true);
	$('#useEndDeSaveFormMpsbsc002').prop('disabled', true);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsbsc002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsbsc002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsbsc002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsbsc002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsbsc002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsbsc002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsbsc002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsbsc002', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsbsc002.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsbsc002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsbsc002', 'sortColumId', '', 'text'); 
            dhxGridMpsbsc002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsbsc002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsbsc002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsbsc002', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc002 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsbsc002 = 0; 
    save_Edt_Cnt_Mpsbsc002 = 0; 
    save_Del_Cnt_Mpsbsc002 = 0; 
    dhxGridMpsbsc002.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsbsc002.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsbsc002.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsbsc002 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsbsc002 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsbsc002 += 1; 
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
        save_All_Sta_Mpsbsc002 = 0; 
        if(save_Add_Cnt_Mpsbsc002 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsbsc002 + "건";
            save_All_Sta_Mpsbsc002 = 1; 
        } 
        if(save_Edt_Cnt_Mpsbsc002 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsbsc002 + "건"; 
        } 
        if(save_Del_Cnt_Mpsbsc002 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsbsc002 + "건"; 
            save_All_Sta_Mpsbsc002 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsbsc002(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsbsc002(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsbsc002 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsbsc002_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsbsc002_Send = function() {
    if(fn_GridValidation(dhxGridMpsbsc002, dhxDataProcessorMpsbsc002)) {
        dhxDataProcessorMpsbsc002.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsbsc002 = function() {
    var rowId = dhxGridMpsbsc002.getSelectedRowId();
    var state = dhxDataProcessorMpsbsc002.getState(rowId);
    var confirmMsg = '해당 항목을 삭제하시겠습니까?';
    if(state == 'inserted') {
        var rowNum = dhxGridMpsbsc002.getRowIndex(rowId);
        dhxGridMpsbsc002.deleteRow(rowId);
        dhxGridMpsbsc002.selectRow(rowNum);
        fn_FindMpsbsc002();
    }
    else {
		dhxDataProcessorMpsbsc002.setUpdated(rowId, true, 'deleted');
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc002 = function () {
    var titMpsbsc002 = '급여항목기준관리'; /* gf_LocaleTrans('default', 'titMpsbsc002') */
    var jsonParameter = {
        salarytyCode : gf_FormGetValue('searchFormMpsbsc002', 'salarytyCode', 'text'),
        salaryitemCode : gf_FormGetValue('searchFormMpsbsc002', 'salaryitemCode', 'text')
    };
    var header = [[
        '급여유형코드(급여/상여/특별성과)' /* gf_LocaleTrans('default', 'titSalarytyCode') */,
        '급여항목코드' /* gf_LocaleTrans('default', 'titSalaryitemCode') */,
        '한도 금액' /* gf_LocaleTrans('default', 'titLmtAmt') */,
        '금액지정을 선택했을시 적용할 기준금액 항목' /* gf_LocaleTrans('default', 'titStdrAmt') */,
        '과세대상 항목 여부[Y|N] 항목' /* gf_LocaleTrans('default', 'titTaxtAt') */,
        '귀속 년도' /* gf_LocaleTrans('default', 'titRversYy') */,
        '비과세 코드(국세청코드)' /* gf_LocaleTrans('default', 'titTaxeCode') */,
        '사용시작일' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일',
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '금액기준등록 대상여부' /* gf_LocaleTrans('default', 'titAmtStdrRegistTrgetAt') */,
        '적용 구분' /* gf_LocaleTrans('default', 'titApplcSe') */,
        '계산 구분 ' /* gf_LocaleTrans('default', 'titCalcSe') */
    ]];
    var dataId = [[ 'salarytyCode', 'salaryitemCode', 'lmtAmt', 'stdrAmt', 'taxtAt', 'rversYy', 'taxeCode', 'useBeginDe', 'useEndDe', 'useAt', 'amtStdrRegistTrgetAt', 'applcSe', 'calcSe' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsbsc002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc002/excelMpsbsc002', jsonParameter);
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
    $('#saveFormMpsbsc002 #salarytyCodeSaveFormMpsbsc002').parent().append(
    '<div class="error" id="salarytyCodeSaveFormMpsbsc002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc002 #salaryitemCodeSaveFormMpsbsc002').parent().append(
    '<div class="error" id="salaryitemCodeSaveFormMpsbsc002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc002 #useBeginDeSaveFormMpsbsc002').parent().append(
    '<div class="error" id="useBeginDeSaveFormMpsbsc002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc002 = function(salarytyCode, salaryitemCode, useBeginDe){
    if(!gf_IsNull(salarytyCode) && !gf_IsNull(salaryitemCode) && !gf_IsNull(useBeginDe)) {
        var jsonParameter = {
            salarytyCode : salarytyCode,
            salaryitemCode : salaryitemCode,
			useBeginDe : useBeginDe
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc002/findMpsbsc002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.salarytyCode) && gf_IsNull(data.salaryitemCode) && gf_IsNull(data.useBeginDe) ) {
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
    var state = dhxDataProcessorMpsbsc002.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMpsbsc002').validate().form()){
                if(state == 'inserted') {
                    var salarytyCode = gf_FormGetValue('saveFormMpsbsc002', 'salarytyCode', 'text');
                    var salaryitemCode = gf_FormGetValue('saveFormMpsbsc002', 'salaryitemCode', 'text');
                    if(fn_CheckDupMpsbsc002(salarytyCode, salaryitemCode)) return true;
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
    var checkSalarytyCode;
    var checkSalaryitemCode;
    var checkUseBeginDe;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsbsc002 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mpsbsc002 == 'deleted') {
        save_Row_Num_Mpsbsc002 = 0;
        save_Row_Ids_Mpsbsc002 = "";
    } else if(save_Row_Sta_Mpsbsc002 == 'inserted') {
        save_Row_Num_Mpsbsc002 = rowNum;
        save_Row_Ids_Mpsbsc002 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsbsc002 = rowNum;
        save_Row_Ids_Mpsbsc002 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
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
                    checkSalarytyCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salarytyCode', 'grid');
                    checkSalaryitemCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid');
                    checkUseBeginDe = gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid');
                    if(!gf_IsNull(checkSalarytyCode, checkSalaryitemCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var salarytyCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salarytyCode', 'grid');
                            var salaryitemCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salaryitemCode', 'grid');
                            var useBeginDe = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'useBeginDe', 'grid');
                            if(((salarytyCode == checkSalarytyCode) && (salaryitemCode == checkSalaryitemCode) && (useBeginDe == checkUseBeginDe)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsbsc002( checkSalarytyCode, checkSalaryitemCode, checkUseBeginDe )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarytyCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
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
        dhxGridMpsbsc002.selectRowById(validFalseFistRowId);
        fn_FindMpsbsc002();
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
