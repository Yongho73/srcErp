/**
 *    프로그램       : 급여항목관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.28
 *    사용테이블      : MPS_SALARYITEM
 * sourceGen version : 2020.07.16.01 (2020.08.28)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsbsc001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsbsc001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsbsc001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsbsc001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsbsc001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsbsc001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsbsc001 = 0;  //그리드 삭제 수량 
var dhxGridMpsbsc001;  //그리드 객체
var eventIdMpsbsc001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpsbsc001;  //DataProcessor 객체

var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsbsc001();
    if(cf_SetComponentsMpsbsc001()){
       cf_SetEventListenerMpsbsc001();
       cf_InitFormMpsbsc001();
       cf_SetBindingMpsbsc001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc001 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsbsc001").validate({ errorElement: 'div', ignore: '' });
    
    fn_Date();

    gf_ComboCode('divComboSearchPymntddcSe', 'searchPymntddcSe', 'searchPymntddcSe', 'search', 'C064', '' , '', '', 'ordr', '');//지급공제여부(검색)
    gf_ComboCode('divComboPymntddcSe', 'pymntddcSe', 'pymntddcSe', 'add', 'C064', '' , '', '', 'ordr', 'required');//지급공제여부(저장)
    gf_ComboCode('divComboSalaryApplcSe', 'salaryApplcSe', 'salaryApplcSe', 'add', 'C249', '' , '', '', 'ordr', '');//지급공제여부(저장)
};

var cf_SetComponentsMpsbsc001 = function() {
    var dhxGridMpsbsc001HeaderInfo = [];
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('급여항목코드', '100', 'center', 'str', 'ro', false, 'salaryitemCode', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemCode') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('급여항목명', '*', 'left', 'str', 'ro', false, 'salaryitemNm', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemNm') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('지급공제\n구분', '80', 'center', 'str', 'ro', false, 'pymntddcSeNm', '', '')); /* gf_LocaleTrans('default', 'titPymntddcSe') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('통상임금\n포함여부', '70', 'center', 'str', 'ch', false, 'odysgInclsAt', '', '')); /* gf_LocaleTrans('default', 'titOdysgInclsAt') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('평균임금\n포함여부', '70', 'center', 'str', 'ch', false, 'avrgwageInclsAt', '', '')); /* gf_LocaleTrans('default', 'titAvrgwageInclsAt') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('일할계산\n여부', '70', 'center', 'str', 'ch', false, 'asyyCalcAt', '', '')); /* gf_LocaleTrans('default', 'titAsyyCalcAt') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('수습적용\n여부', '70', 'center', 'str', 'ch', false, 'apntcApplcAt', '', '')); /* gf_LocaleTrans('default', 'titApntcApplcAt') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('급여계산\n기준항목', '70', 'center', 'str', 'ch', false, 'calcApplcAt', '', '')); /* gf_LocaleTrans('default', 'titApntcApplcAt') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('사용\n여부', '60', 'center', 'str', 'ro', false, 'useAtNm', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('출력순서', '70', 'right', 'int', 'ro', false, 'outptOrdr', '', '')); /* gf_LocaleTrans('default', 'titOutptOrdr') */
    
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('지급공제구분', '80', 'center', 'str', 'coro', true, 'pymntddcSe', '', '')); /* gf_LocaleTrans('default', 'titPymntddcSe') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('급여대상구분', '80', 'center', 'str', 'coro', true, 'salaryApplcSe', '', '')); /* gf_LocaleTrans('default', 'titPymntddcSe') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('급여항목내역', '100', 'left', 'str', 'ro', true, 'salaryitemDtls', '', '')); /* gf_LocaleTrans('default', 'titSalaryitemDtls') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일', '100', 'left', 'str', 'ro', true, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일', '100', 'left', 'str', 'ro', true, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ro', true, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('계정과목코드', '100', 'center', 'str', 'ro', true, 'acntCd', '', '')); /* gf_LocaleTrans('default', 'titAcntCd') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('급여대상\n구분', '80', 'center', 'str', 'ro', true, 'salaryApplcSeNm', '', '')); /* gf_LocaleTrans('default', 'titPymntddcSe') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('예산 코드', '100', 'center', 'str', 'ro', true, 'bugtCode', '', '')); /* gf_LocaleTrans('default', 'titBugtCode') */
    dhxGridMpsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('CHKDup', '100', 'center', 'str', 'ro', true, 'checkDup', '', '')); /* gf_LocaleTrans('default', 'titBugtCode') */
    dhxGridMpsbsc001 = gf_MakeDhxGrid('dataListMpsbsc001', dhxGridMpsbsc001HeaderInfo, true, false, false);
    dhxGridMpsbsc001.enableAutoWidth(false);
    dhxGridMpsbsc001.setEditable(true);

    dhxGridMpsbsc001.setColumnMinWidth(40,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMpsbsc001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsbsc001 = gf_GridDetachEvent(dhxGridMpsbsc001, eventIdMpsbsc001);
    eventId = dhxGridMpsbsc001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsbsc001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsbsc001.getColumnsNum();
            var rowNum = dhxGridMpsbsc001.getRowsNum();
            var selectedId = dhxGridMpsbsc001.getSelectedRowId();
            var ind        = dhxGridMpsbsc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc001.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsbsc001.selectRow(0);
                    //fn_FindMpsbsc001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsbsc001.selectRow(rowIndex + 1);
                    fn_FindMpsbsc001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsbsc001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsbsc001.getSelectedRowId();
            var ind        = dhxGridMpsbsc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc001.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc001.getColType(ind);
            dhxGridMpsbsc001.selectCell(rowIndex+1, ind);
            fn_FindMpsbsc001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsbsc001.getSelectedRowId();
            var ind        = dhxGridMpsbsc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc001.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc001.getColType(ind);
            dhxGridMpsbsc001.selectCell(rowIndex-1, ind);
            fn_FindMpsbsc001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc001.editCell();
            }
        }
        else return true;
    });
    eventIdMpsbsc001.push(eventId);
    eventId = dhxGridMpsbsc001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsbsc001SortGridList(ind, type, direction); 
    });
    eventIdMpsbsc001.push(eventId);
    eventId = dhxGridMpsbsc001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc001.push(eventId);
    eventId = dhxGridMpsbsc001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMpsbsc001();
    });
    eventIdMpsbsc001.push(eventId);
    eventId = dhxGridMpsbsc001.attachEvent("onEditCell", function(id, ind, cInd){
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc001, 'odysgInclsAt')) {return false;}
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc001, 'avrgwageInclsAt')) {return false;}
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc001, 'asyyCalcAt')) {return false;}
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsbsc001, 'apntcApplcAt')) {return false;}
        return true;
    });
    eventIdMpsbsc001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsbsc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsbsc001()
    });
    $('#btnSaveMpsbsc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc001();
    });
    $('#btnRemoveMpsbsc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsbsc001();
    });
    $('#btnExcelMpsbsc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc001();
    });
    $('#btnSearchMpsbsc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsbsc001('');
    });
    $('#btnCopyMpsbsc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_CopyMpsbsc001('');
    });
    $('#btnResetMpsbsc001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc001();
    });
    //중복체크 
    $('#btnCheckDup').unbind("click").bind("click",function() {
    	fn_CheckSalaryitemCode();
    }); 
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMpsbsc001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpsbsc001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsbsc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#saveFormMpsbsc001 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    //사용여부체크 
    $('#useAtSaveFormMpsbsc001').unbind('click').bind('click', function(event){
		if ($('#useAtSaveFormMpsbsc001').is(':checked') === true) {
			$('#useEndDeSaveFormMpsbsc001').val("");
	        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'useEndDe', '');
		}else{
			$('#useEndDeSaveFormMpsbsc001').val(gv_Curdate); //오늘날짜로 셋팅 
	        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'useEndDe', gv_Curdate);
		}  
    });
	$('#salaryitemCodeSaveFormMpsbsc001').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'checkDup', 'false');
		}
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMpsbsc001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "salaryitemCodeSaveFormMpsbsc001"){
        		fn_CheckSalaryitemCode();
        	}
        	return gf_saveForm_NextEle("saveFormMpsbsc001",this); 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsbsc001 input[name="salaryitemCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'salaryitemCode', $(this).val());
    });
    $('#saveFormMpsbsc001 input[name="salaryitemNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'salaryitemNm', $(this).val());
    });
    $('#saveFormMpsbsc001 select[name="pymntddcSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'pymntddcSe', gf_FormGetValue('saveFormMpsbsc001', 'pymntddcSe', 'combo'));
        if(gf_FormGetValue('saveFormMpsbsc001', 'pymntddcSe', 'combo') == null || gf_FormGetValue('saveFormMpsbsc001', 'pymntddcSe', 'combo') == ''){
            gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'pymntddcSeNm', '');
        } else {
            gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'pymntddcSeNm', $("#saveFormMpsbsc001 select[name='pymntddcSe'] option:selected").text());
        }
    });
    $('#saveFormMpsbsc001 select[name="salaryApplcSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'salaryApplcSe', gf_FormGetValue('saveFormMpsbsc001', 'salaryApplcSe', 'combo'));
        if(gf_FormGetValue('saveFormMpsbsc001', 'salaryApplcSe', 'combo') == null || gf_FormGetValue('saveFormMpsbsc001', 'salaryApplcSe', 'combo') == ''){
            gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'salaryApplcSeNm', '');
        } else {
            gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'salaryApplcSeNm', $("#saveFormMpsbsc001 select[name='salaryApplcSe'] option:selected").text());
        }
    });
    $('#saveFormMpsbsc001 input[name="salaryitemDtls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'salaryitemDtls', $(this).val());
    });
    $('#saveFormMpsbsc001 input[name="useBeginDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'useBeginDe', $(this).val());
    });
    $('#saveFormMpsbsc001 input[name="useEndDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'useEndDe', $(this).val());
    });
    $('#saveFormMpsbsc001 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var useAt = gf_IsNull(gf_FormGetValue('saveFormMpsbsc001', 'useAt', 'chkbox'))? '0' : '1';
        var useAtNm = gf_IsNull(gf_FormGetValue('saveFormMpsbsc001', 'useAt', 'chkbox'))? '미사용' : '사용';
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'useAt', useAt);
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'useAtNm', useAtNm);
    });
    $('#saveFormMpsbsc001 input[name="outptOrdr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'outptOrdr', $(this).val());
    });
    $('#saveFormMpsbsc001 input[name="odysgInclsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var odysgInclsAt = gf_IsNull(gf_FormGetValue('saveFormMpsbsc001', 'odysgInclsAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'odysgInclsAt', odysgInclsAt);
    });
    $('#saveFormMpsbsc001 input[name="avrgwageInclsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var avrgwageInclsAt = gf_IsNull(gf_FormGetValue('saveFormMpsbsc001', 'avrgwageInclsAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'avrgwageInclsAt', avrgwageInclsAt);
    });
    $('#saveFormMpsbsc001 input[name="apntcApplcAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var apntcApplcAt = gf_IsNull(gf_FormGetValue('saveFormMpsbsc001', 'apntcApplcAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'apntcApplcAt', apntcApplcAt);
    });
    $('#saveFormMpsbsc001 input[name="asyyCalcAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var asyyCalcAt = gf_IsNull(gf_FormGetValue('saveFormMpsbsc001', 'asyyCalcAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'asyyCalcAt', asyyCalcAt);
    });
    $('#saveFormMpsbsc001 input[name="acntCd"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'acntCd', $(this).val());
    });
    $('#saveFormMpsbsc001 input[name="calcApplcAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var calcApplcAt = gf_IsNull(gf_FormGetValue('saveFormMpsbsc001', 'calcApplcAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'calcApplcAt', calcApplcAt);
    });
    $('#saveFormMpsbsc001 input[name="bugtCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'bugtCode', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormMpsbsc001 = function() {
    $('#searchFormMpsbsc001').resetForm();
	$('input[name=stdrDt]').val( (new Date()).format('YYYY-MM-DD') );
    $('#salaryitemCodeNmSearchFormMpsbsc001').focus();
};

var cf_SetBindingMpsbsc001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMpsbsc001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc001 = function(userId) {
    var jsonParameter = {
        salaryitemCode : gf_FormGetValue('searchFormMpsbsc001', 'salaryitemCode', 'text'),
        salaryitemCodeNm : gf_FormGetValue('searchFormMpsbsc001', 'salaryitemCodeNm', 'text'),
        pymntddcSe : gf_FormGetValue('searchFormMpsbsc001', 'searchPymntddcSe', 'combo'),
        useAt : gf_FormGetValue('searchFormMpsbsc001', 'useAt', 'combo'),
        kindSe : gf_FormGetValue('searchFormMpsbsc001', 'kindSe', 'combo'),
		stdrDt : gf_FormGetValue('searchFormMpsbsc001', 'stdrDt', 'text').replaceAll('-', '')
    };
    gf_Transaction(userId, 'mpsbsc001/searchMpsbsc001', jsonParameter, 'fn_CallbackSearchMpsbsc001', false, 'GET');
};

var fn_CallbackSearchMpsbsc001 = function(strSvcID, targetID, data) {
    //dhxGridMpsbsc001.clearAll();
    dhxGridMpsbsc001.destructor();
    if(cf_SetComponentsMpsbsc001()){ 
        fn_DhxDataProcessorMpsbsc001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc001');
            dhxGridMpsbsc001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mpsbsc001 == 0 && save_All_Sta_Mpsbsc001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsbsc001.selectRow(0); 
            } else if(save_Row_Sta_Mpsbsc001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsbsc001.selectRow(0);
            } else if(save_All_Sta_Mpsbsc001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsbsc001.selectRow(save_Row_Num_Mpsbsc001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsbsc001.selectRow(save_Row_Num_Mpsbsc001);   //개발자 수정 필요  
                //var findCell = dhxGridMpsbsc001.findCell(save_Row_Ids_Mpsbsc001, gf_GetDhxGridColumId(dhxGridMpsbsc001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsbsc001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsbsc001.selectRow(0);
                //} 
            } 
 
            fn_FindMpsbsc001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsbsc001');
            fn_InitInputFormMpsbsc001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMpsbsc001").text(data.data.records.length);
        cf_SetEventListenerMpsbsc001();
    } 
};
var fn_DhxDataProcessorMpsbsc001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc001 = new dataProcessor(gv_ContextPath+'/mpsbsc001/saveMpsbsc001'); //lock feed url
    dhxDataProcessorMpsbsc001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc001.init(dhxGridMpsbsc001); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc001();
                    $("#checkAllMpsbsc001").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMpsbsc001 = function() {
    var rId = dhxGridMpsbsc001.getSelectedRowId();
    var status = dhxDataProcessorMpsbsc001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMpsbsc001", "salaryitemCode", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'salaryitemCode',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc001", "salaryitemNm", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'salaryitemNm',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc001", "pymntddcSe", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'pymntddcSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpsbsc001", "salaryApplcSe", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'salaryApplcSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpsbsc001", "salaryitemDtls", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'salaryitemDtls',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc001", "useBeginDe", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'useBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc001", "useEndDe", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'useEndDe',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc001", "useAt", (gf_DhxGetValue(dhxGridMpsbsc001, rId, 'useAt',  'grid')=='1')? true : false, 'chkbox');
    gf_FormSetValue("saveFormMpsbsc001", "outptOrdr", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'outptOrdr',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc001", "odysgInclsAt", (gf_DhxGetValue(dhxGridMpsbsc001, rId, 'odysgInclsAt',  'grid')=='1')? true : false, 'chkbox');
    gf_FormSetValue("saveFormMpsbsc001", "avrgwageInclsAt", (gf_DhxGetValue(dhxGridMpsbsc001, rId, 'avrgwageInclsAt',  'grid')=='1')? true : false, 'chkbox');
    gf_FormSetValue("saveFormMpsbsc001", "apntcApplcAt", (gf_DhxGetValue(dhxGridMpsbsc001, rId, 'apntcApplcAt',  'grid')=='1')? true : false, 'chkbox');
    gf_FormSetValue("saveFormMpsbsc001", "asyyCalcAt", (gf_DhxGetValue(dhxGridMpsbsc001, rId, 'asyyCalcAt',  'grid')=='1')? true : false, 'chkbox');
    gf_FormSetValue("saveFormMpsbsc001", "acntCd", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'acntCd',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc001", "calcApplcAt", (gf_DhxGetValue(dhxGridMpsbsc001, rId, 'calcApplcAt',  'grid')=='1')? true : false, 'chkbox');
    gf_FormSetValue("saveFormMpsbsc001", "bugtCode", gf_DhxGetValue(dhxGridMpsbsc001, rId, 'bugtCode',  'grid'), '');

	$('#useBeginDeSaveFormMpsbsc001').val(gf_DhxGetValue(dhxGridMpsbsc001, rId, 'useBeginDe',  'grid'));
	$('#useEndDeSaveFormMpsbsc001').val(gf_DhxGetValue(dhxGridMpsbsc001, rId, 'useEndDe',  'grid'));

    if(status == 'inserted') {
        $('#saveFormMpsbsc001 input[name="salaryitemCode"]').prop('disabled', false);
        $('#checkDupCode').show();
    } else {
        $('#saveFormMpsbsc001 input[name="salaryitemCode"]').prop('disabled', true);
        $('#checkDupCode').hide();
    }

	var salaryitemCode = gf_DhxGetValue(dhxGridMpsbsc001, rId, 'salaryitemCode', 'grid');
	var useBeginDe = gf_DhxGetValue(dhxGridMpsbsc001, rId, 'useBeginDe', 'grid');
	if(!fn_CheckUseCode(salaryitemCode, useBeginDe)){
		$('#saveFormMpsbsc001 input[name="useAt"]').prop('disabled', true);
	}
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMpsbsc001 = function() {
    $('#saveFormMpsbsc001 input[name="salaryitemCode"]').prop('disabled', false);
    $('#saveFormMpsbsc001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMpsbsc001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMpsbsc001 = function() {
    dhxGridMpsbsc001.clearSelection();
    fn_InitInputFormMpsbsc001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //salaryitemCode
    initValueArr.push(''); //salaryitemNm
    initValueArr.push(''); //pymntddcSeNm
    initValueArr.push(''); //pymntddcSeNm
    initValueArr.push(''); //odysgInclsAt
    initValueArr.push(''); //avrgwageInclsAt
    initValueArr.push(''); //apntcApplcAt
    initValueArr.push(''); //asyyCalcAt
    initValueArr.push('사용'); //useAtNm
    initValueArr.push(''); //outptOrdr
    
    initValueArr.push(''); //pymntddcSe
    initValueArr.push(''); //salaryAplcSe
    initValueArr.push(''); //salaryitemDtls
    initValueArr.push(new Date().format('YYYY-MM-DD')); //useBeginDe
    initValueArr.push('2999-12-31'); //useEndDe
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //acntCd
    initValueArr.push(''); //calcApplcAt
    initValueArr.push(''); //bugtCode
    initValueArr.push('false'); //CHKDup
    dhxGridMpsbsc001.addRow(dhxGridMpsbsc001.uid(), initValueArr, 0);
    dhxGridMpsbsc001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc001');
    $('#checkDupCode').show();
    fn_FormDisabled(false);
    

    gf_FormSetValue("saveFormMpsbsc001", "useAt", true, 'chkbox');
    gf_FormSetValue("saveFormMpsbsc001", "useBeginDe", new Date().format('YYYY-MM-DD'), '');
	gf_FormSetValue("saveFormMpsbsc001", "useEndDe", '2999-12-31', '');
}
/**
 * 복사 
 */
var fn_CopyMpsbsc001 = function() {
    dhxGridMpsbsc001.clearSelection();
//    fn_InitInputFormMpsbsc001();

    gf_FormSetValue("saveFormMpsbsc001", "useBeginDe", new Date().format('YYYY-MM-DD'), '');
	
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(gf_FormGetValue("saveFormMpsbsc001", "salaryitemCode", 'text')); //salaryitemCode
    initValueArr.push(gf_FormGetValue("saveFormMpsbsc001", "salaryitemNm", 'text')); //salaryitemNm
    initValueArr.push($("#saveFormMpsbsc001 select[name='pymntddcSe'] option:selected").text()); //pymntddcSeNm
    initValueArr.push(gf_FormGetValue('saveFormMpsbsc001', 'odysgInclsAt', 'chkbox')); //odysgInclsAt
    initValueArr.push(gf_FormGetValue('saveFormMpsbsc001', 'avrgwageInclsAt', 'chkbox')); //avrgwageInclsAt
    initValueArr.push(gf_FormGetValue('saveFormMpsbsc001', 'asyyCalcAt', 'chkbox')); //asyyCalcAt
    initValueArr.push(gf_FormGetValue('saveFormMpsbsc001', 'apntcApplcAt', 'chkbox')); //apntcApplcAt
    initValueArr.push(gf_FormGetValue('saveFormMpsbsc001', 'calcApplcAt', 'chkbox')); //calcApplcAt
    initValueArr.push('사용'); //useAtNm

    initValueArr.push(gf_FormGetValue("saveFormMpsbsc001", "outptOrdr", 'text')); //outptOrdr
    
    initValueArr.push(gf_FormGetValue('saveFormMpsbsc001', 'pymntddcSe', 'combo')); //pymntddcSe
    initValueArr.push(gf_FormGetValue("saveFormMpsbsc001", "salaryApplcSe", 'combo')); //salaryApplcSe
    initValueArr.push(gf_FormGetValue("saveFormMpsbsc001", "salaryitemDtls", 'text')); //salaryitemDtls
    initValueArr.push(gf_FormGetValue("saveFormMpsbsc001", "useBeginDe", 'text')); //useBeginDe
    initValueArr.push('2999-12-31'); //useEndDe
    initValueArr.push('1'); //useAt
    initValueArr.push(gf_FormGetValue("saveFormMpsbsc001", "acntCd", 'text')); //acntCd
    initValueArr.push(gf_IsNull(gf_FormGetValue('saveFormMpsbsc001', 'calcApplcAt', 'chkbox'))? '0' : '1'); //calcApplcAt
    initValueArr.push(gf_FormGetValue("saveFormMpsbsc001", "bugtCode", 'text')); //bugtCode
    initValueArr.push('false'); //CHKDup
    dhxGridMpsbsc001.addRow(dhxGridMpsbsc001.uid(), initValueArr, 0);
    dhxGridMpsbsc001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc001');
    $('#checkDupCode').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsbsc001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsbsc001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsbsc001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsbsc001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsbsc001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsbsc001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsbsc001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsbsc001', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsbsc001.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsbsc001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsbsc001', 'sortColumId', '', 'text'); 
            dhxGridMpsbsc001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsbsc001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsbsc001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsbsc001', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsbsc001 = 0; 
    save_Edt_Cnt_Mpsbsc001 = 0; 
    save_Del_Cnt_Mpsbsc001 = 0; 
    dhxGridMpsbsc001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsbsc001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsbsc001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsbsc001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsbsc001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsbsc001 += 1; 
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
        save_All_Sta_Mpsbsc001 = 0; 
        if(save_Add_Cnt_Mpsbsc001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsbsc001 + "건";
            save_All_Sta_Mpsbsc001 = 1; 
        } 
        if(save_Edt_Cnt_Mpsbsc001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsbsc001 + "건"; 
        } 
        if(save_Del_Cnt_Mpsbsc001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsbsc001 + "건"; 
            save_All_Sta_Mpsbsc001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsbsc001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsbsc001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsbsc001 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsbsc001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsbsc001_Send = function() {
    if(fn_GridValidation(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001)) {
        dhxDataProcessorMpsbsc001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsbsc001 = function() {
    var rowId = dhxGridMpsbsc001.getSelectedRowId();
    var state = dhxDataProcessorMpsbsc001.getState(rowId);
    var confirmMsg = '해당 항목을 삭제하시겠습니까?';
    if(state == 'inserted') {
        var rowNum = dhxGridMpsbsc001.getRowIndex(rowId);
        dhxGridMpsbsc001.deleteRow(rowId);
        dhxGridMpsbsc001.selectRow(rowNum);
        fn_FindMpsbsc001();
    }
    else {
		var salaryitemCode = gf_DhxGetValue(dhxGridMpsbsc001, rowId, 'salaryitemCode', 'grid');
		var useBeginDe = gf_DhxGetValue(dhxGridMpsbsc001, rowId, 'useBeginDe', 'grid');
		if(fn_CheckUseCode(salaryitemCode, useBeginDe)){
			dhxDataProcessorMpsbsc001.setUpdated(rowId, true, 'deleted');
    	 	if(confirmModalMpsbsc001(confirmMsg)){  //여기는 안옴 
         	} else { 
            	return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
         	}
		}else{
			gf_DivMsgAlert('급여항목기준관리에서 사용 중인 코드입니다.');
		}
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc001 = function () {
    var titMpsbsc001 = '급여항목관리'; /* gf_LocaleTrans('default', 'titMpsbsc001') */
    var jsonParameter = {
        salaryitemCode : gf_FormGetValue('searchFormMpsbsc001', 'salaryitemCode', 'text')
    };
    var header = [[
        '급여항목코드' /* gf_LocaleTrans('default', 'titSalaryitemCode') */,
        '급여항목명' /* gf_LocaleTrans('default', 'titSalaryitemNm') */,
        '지급공제구분' /* gf_LocaleTrans('default', 'titPymntddcSe') */,
        '급여대상구분',
        '통상임금포함 여부' /* gf_LocaleTrans('default', 'titOdysgInclsAt') */,
        '평균임금포함 여부' /* gf_LocaleTrans('default', 'titAvrgwageInclsAt') */,
        '일할 계산 여부' /* gf_LocaleTrans('default', 'titAsyyCalcAt') */,
        '수습적용 여부' /* gf_LocaleTrans('default', 'titApntcApplcAt') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '출력순서' /* gf_LocaleTrans('default', 'titOutptOrdr') */,
        '사용시작일' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '급여계산 기준 항목' /* gf_LocaleTrans('default', 'titCalcApplcAt') */,
        '급여항목내역' /* gf_LocaleTrans('default', 'titSalaryitemDtls') */,
    ]];
    var dataId = [[ 'salaryitemCode', 'salaryitemNm', 'pymntddcSeNm', ' salaryApplcSeNm', 'odysgInclsAtNm', 'avrgwageInclsAtNm', 'asyyCalcAtNm', 'apntcApplcAtNm', 'useAtNm', 'outptOrdr', 'useBeginDe', 'useEndDe', 'calcApplcAtNm', 'salaryitemDtls' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsbsc001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc001/excelMpsbsc001', jsonParameter);
};

function fn_Date() {
	//달력 생성
	var dhxCCalendarStdrDt = new dhtmlXCalendarObject({input:"stdrDtSearchFormMpsbsc001", button:"startDateIcon"});
	dhxCCalendarStdrDt.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	dhxCCalendarStdrDt.setDateFormat("%Y-%m-%d");
	
	//달력 생성
	var dhxCCalendarBeginDate = new dhtmlXCalendarObject({input:"useBeginDeSaveFormMpsbsc001", button:"startDateIcon"});
	dhxCCalendarBeginDate.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	dhxCCalendarBeginDate.setDateFormat("%Y-%m-%d");
	

	//달력 생성
	var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"useEndDeSaveFormMpsbsc001", button:"startDateIcon"});
	dhxCCalendarEndDate.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	dhxCCalendarEndDate.setDateFormat("%Y-%m-%d");
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
 * 데이터 중복 체크
 */
var fn_CheckSalaryitemCode = function(){
    
var salaryitemCode = gf_FormGetValue('saveFormMpsbsc001', 'salaryitemCode', 'text');    
    if(gf_IsNull(salaryitemCode)) {
        gf_DivMsgAlert('급여항목코드를 입력해 주세요.', '#salaryitemCodeSaveFormMpsbsc001'); /* gf_LocaleTrans('default', 'titsalaryitemCode') */
        gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'checkDup', 'false');
        return false;
    }

    var jsonParameter = {
        salaryitemCode : salaryitemCode,
        useBeginDe : gf_FormGetValue('saveFormMpsbsc001', 'useBeginDe', 'text').replaceAll('-', '')
    };
    var dataSource = gf_NoAsyncTransaction('mpsbsc001/findMpsbsc001', jsonParameter, 'GET');
    if(dataSource.code === '000') {
		if(dataSource.data.records.length == 0){
            gf_DivMsgAlert('사용할 수 있는 코드입니다.', '#salaryitemNmSaveFormMpsbsc001'); /* gf_LocaleTrans('default', 'titsalaryitemCode') */
            gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'checkDup', 'true');
		} else {
			var useBeginDe = gf_FormGetValue('saveFormMpsbsc001', 'useBeginDe', 'text').replaceAll('-', '');
			for(var i=0;i<dataSource.data.records.length;i++){
				if(dataSource.data.records[i].useBeginDe > useBeginDe){
		            gf_DivMsgAlert('해당 기간에 등록된 데이터가 존재합니다.', '#salaryitemCodeSaveFormMpsbsc001'); /* gf_LocaleTrans('default', 'titsalaryitemCode') */
		            gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'checkDup', 'false');
		            return false;
				}else if(dataSource.data.records[i].useBeginDe == useBeginDe){
					gf_DivMsgAlert('동일한 시작일자인 급여항목코드가 존재합니다.', '#salaryitemCodeSaveFormMpsbsc001'); /* gf_LocaleTrans('default', 'titsalaryitemCode') */
		            gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'checkDup', 'false');
		            return false;
				}else{
					gf_DivMsgConfirm('기존 급여항목코드 종료일자가 변경됩니다.<br>변경하시겠습니까?', "fn_CheckDup()", '');
				}
			}
		}
		
//        if(gf_IsNull(data.salaryitemCode)) {
//            return true;
//        } else {
//            gf_DivMsgAlert('급여항목코드가 존재합니다.', '#salaryitemCodeSaveFormMpsbsc001'); /* gf_LocaleTrans('default', 'titsalaryitemCode') */
//            gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'checkDup', 'false');
//            return false;
//        }
    } else {
        gf_DivMsgAlert('중복확인이 되지 않습니다.', '#salaryitemCodeSaveFormMpsbsc001');
        return false;
    }    
};

var fn_CheckDup = function(){
	gf_DhxGridCellMapping(dhxGridMpsbsc001, dhxDataProcessorMpsbsc001, 'checkDup', 'true');
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
    $('#saveFormMpsbsc001 #salaryitemCodeSaveFormMpsbsc001').parent().append(
    '<div class="error" id="salaryitemCodeSaveFormMpsbsc001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc001 = function(salaryitemCode){
    if(!gf_IsNull(salaryitemCode)) {
        var jsonParameter = {
            salaryitemCode : salaryitemCode
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc001/findMpsbsc001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.salaryitemCode)) {
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
    var state = dhxDataProcessorMpsbsc001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMpsbsc001').validate().form()){
//                if(state == 'inserted') {
//                    var salaryitemCode = gf_FormGetValue('saveFormMpsbsc001', 'salaryitemCode', 'text');
//                    if(fn_CheckDupMpsbsc001(salaryitemCode)) return true;
//                    else return false;
//                } else {
                    return true;
//                }
            } else {
                return false;
            }
        }
    } else {
        return true;
    }
}
/**
 * 사용여부 db 체크
 */
var fn_CheckUseCode = function(salaryitemCode, useBeginDe){
    if(!gf_IsNull(salaryitemCode)) {
        var jsonParameter = {
        	salaryitemCode : salaryitemCode,
			useBeginDe : useBeginDe
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc002/searchMpsbsc002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {	
            if(gf_IsNull(data.records)) {
                return true;
            } else {
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
    var checkSalaryitemCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsbsc001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mpsbsc001 == 'deleted') {
        save_Row_Num_Mpsbsc001 = 0;
        save_Row_Ids_Mpsbsc001 = "";
    } else if(save_Row_Sta_Mpsbsc001 == 'inserted') {
        save_Row_Num_Mpsbsc001 = rowNum;
        save_Row_Ids_Mpsbsc001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsbsc001 = rowNum;
        save_Row_Ids_Mpsbsc001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	if(gf_DhxGetValue(dhxGridObjet, rowId, 'checkDup', 'grid') != 'true'){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                    valid = false;
                    gf_DivMsgAlert("중복확인이 필요합니다.");
                    dupValid = false;
            	}
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'pymntddcSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntddcSe');
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntddcSeNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
                    valid = false;
                } else {
					if(gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid').replace('-','') <= gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid').replace('-','')){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useBeginDe');
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
                    valid = false;
					}
				}
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'outptOrdr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'outptOrdr');
                    valid = false;
                }
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'outptOrdr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'outptOrdr');
                    valid = false;
                }


                if(gf_DhxGetValue(dhxGridObjet, rowId, 'useAt', 'grid') == '0'){
                	if(gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid'))){
                		if(gf_DhxGetValue(dhxGridObjet, rowId, 'useBeginDe', 'grid').replaceAll('-','')>gf_DhxGetValue(dhxGridObjet, rowId, 'useEndDe', 'grid').replaceAll('-','')){
                			gf_DivMsgAlertClose();
        			        gf_DivMsgAlert("종료일자가 시작일자보다 앞설 수 없습니다.");
        	                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
        	                valid = false;
                		}
                	} else {
    			        gf_DivMsgAlert("종료일자가 필요합니다.");
                        fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useEndDe');
                        valid = false;
                	}
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
//                    checkSalaryitemCode = gf_DhxGetValue(dhxGridObjet, rowId, 'salaryitemCode', 'grid');
//                    if(!gf_IsNull(checkSalaryitemCode)) {
//                        // 신규입력 key 그리드 중복 체크
//                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
//                            var salaryitemCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salaryitemCode', 'grid');
//                            if(((salaryitemCode == checkSalaryitemCode)) && (rowId != rowIdForCheck)) {
//                                validFalseDuplicationKey = true;
//                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
//                                valid = false;
//                            }
//                        });
//                        // 신규입력 key db 중복 체크
//                        if(!fn_CheckDupMpsbsc001( checkSalaryitemCode )){
//                            validFalseDuplicationKey = true;
//                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salaryitemCode');
//                            valid = false;
//                        }
//                        // 그리드 중복된 처음 추가된 row 체크
//                        if(!valid && gf_IsNull(validFalseFistRowId)) {
//                            validFalseFistRowId = rowId;
//                        }
//                    } else {
//                        // 신규로 등록된 마지막 로우를 설정
//                        if(!valid && gf_IsNull(validFalseFistRowId)) {
//                            validFalseFistRowId = rowId;
//                        }
//                    }
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMpsbsc001.selectRowById(validFalseFistRowId);
        fn_FindMpsbsc001();
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