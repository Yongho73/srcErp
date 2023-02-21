/**
 *    프로그램       : 자동채번설정 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.02.27
 *    사용테이블      : STM_NUM_RULE
 * sourceGen version : 2020.07.16.01 (2020.08.13)
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmbsc006 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmbsc006 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmbsc006 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmbsc006 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmbsc006 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmbsc006 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmbsc006 = 0;  //그리드 삭제 수량 
var dhxGridStmbsc006;  //그리드 객체
var eventIdStmbsc006 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmbsc006;  //DataProcessor 객체
var g_rid = "1";
 
var numberingFom =""; //채번번호 패턴 
var value1="";
var value2="";
var value3="";
var value4="";
var value5="";
var value6="";
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmbsc006();
    if(cf_SetComponentsStmbsc006()){
       cf_SetEventListenerStmbsc006();
       cf_InitFormStmbsc006();
       cf_SetBindingStmbsc006();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmbsc006 = function() {
    gf_SetMenuPath();
    $("#saveFormStmbsc006").validate({ errorElement: 'div', ignore: '' });
    
    //gf_MakeComboBasic('divRelTblNmSaveFormStmbsc006','relTblNm','sel','width:230px','stmbsc006/combo/searchStmbsc006TableList', true); //테이블목록 
    gf_MakeComboBasic('divRelTblNmSaveFormStmbsc006','relTblNm','sel','width:230px','stmbsc006/combo/searchStmbsc006TableList', true, 'tblKey', '');
    
    gf_ComboCode('divPrefixSeCodeSaveFormStmbsc006', 'prefixSeCode', 'prefixSeCode', 'add', 'C003', '' , 'width:103px', '', '', 'required'); //머리글
    gf_ComboCode('divYyLtCodeSaveFormStmbsc006', 'yyLtCode', 'yyLtCode', 'add', 'C006', '' , '', '', '', 'required'); //연도길이 
    gf_ComboCode('divSnLtSaveFormStmbsc006', 'snLt', 'snLt', 'add', 'C113', '' , '', '', 'ordr', '','required'); //숫자길이   //C113
};

var cf_SetComponentsStmbsc006 = function() {
    var dhxGridStmbsc006HeaderInfo = [];
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum	, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('채번명칭'	, '100', 'left', 'str', 'ro', false, 'numberingNm', '', '')); /* gf_LocaleTrans('default', 'titNumberingNm') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('채번패턴'	, '*', 'left', 'str', 'ro', false, 'numberingFom', '', '')); /* gf_LocaleTrans('default', 'titNumberingFom') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('관련테이블'	, '100', 'left', 'str', 'ro', false, 'relTblNm', '', '')); /* gf_LocaleTrans('default', 'titRelTblNm') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('관련항목'	, '100', 'left', 'str', 'ro', false, 'relItemNm', '', '')); /* gf_LocaleTrans('default', 'titRelItemNm') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('최종번호'	, '100', 'left', 'str', 'ro', false, 'maxNumber', '', '')); /* gf_LocaleTrans('default', 'titRelItemNm') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('머리글여부'	, '80', 'center', 'str', 'ch', false, 'prefixUseAt', '', '')); /* gf_LocaleTrans('default', 'titPrefixUseAt') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('년도'		, '60', 'center', 'str', 'ch', false, 'yyUseAt', '', '')); /* gf_LocaleTrans('default', 'titYyUseAt') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('월'		, '60', 'center', 'str', 'ch', false, 'mtUseAt', '', '')); /* gf_LocaleTrans('default', 'titMtUseAt') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('일자'		, '60', 'center', 'str', 'ch', false, 'deUseAt', '', '')); /* gf_LocaleTrans('default', 'titDeUseAt') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('구분자'		, '70', 'center', 'str', 'ch', false, 'seUseAt', '', '')); /* gf_LocaleTrans('default', 'titSeUseAt') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('순번'		, '60', 'center', 'str', 'ch', false, 'snUseAt', '', '')); /* gf_LocaleTrans('default', 'titSnUseAt') */

    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('머리글'		, '100', 'left', 'str', 'ro', true, 'prefixNm', '', '')); /* gf_LocaleTrans('default', 'titPrefixNm') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('년도표시 '	, '100', 'center', 'str', 'ro', true, 'yyLtCode', '', '')); /* gf_LocaleTrans('default', 'titYyLtCode') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('머리글 구분 코드 ', '100', 'center', 'str', 'ro', true, 'prefixSeCode', '', '')); /* gf_LocaleTrans('default', 'titPrefixSeCode') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('순번길이'	, '100', 'left', 'str', 'ro', true, 'snLt', '', '')); /* gf_LocaleTrans('default', 'titSnLt') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('접미사 명'	, '100', 'left', 'str', 'ro', true, 'suffixNm', '', '')); /* gf_LocaleTrans('default', 'titSuffixNm') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('사용여부'	, '100', 'center', 'str', 'ro', true, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('수정 여부'	, '100', 'center', 'str', 'ro', true, 'updtAt', '', '')); /* gf_LocaleTrans('default', 'titUpdtAt') */
    dhxGridStmbsc006HeaderInfo.push(gf_MakeDhxGridHeader('년도표시Y'	, '100', 'center', 'str', 'ro', true, 'yyUseCodeNm', '', '')); /* gf_LocaleTrans('default', 'titUpdtAt') */
    dhxGridStmbsc006 = gf_MakeDhxGrid('dataListStmbsc006', dhxGridStmbsc006HeaderInfo, true, false, false);
    
    dhxGridStmbsc006.enableAutoWidth(false);
    dhxGridStmbsc006.setEditable(true);

    dhxGridStmbsc006.setColumnMinWidth(40,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerStmbsc006 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmbsc006 = gf_GridDetachEvent(dhxGridStmbsc006, eventIdStmbsc006);
    eventId = dhxGridStmbsc006.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmbsc006();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmbsc006.getColumnsNum();
            var rowNum = dhxGridStmbsc006.getRowsNum();
            var selectedId = dhxGridStmbsc006.getSelectedRowId();
            var ind        = dhxGridStmbsc006.getSelectedCellIndex();
            var rowIndex   = dhxGridStmbsc006.getRowIndex(selectedId);
            var type       = dhxGridStmbsc006.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmbsc006.selectRow(0);
                    //fn_FindStmbsc006();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmbsc006.selectRow(rowIndex + 1);
                    fn_FindStmbsc006();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmbsc006.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmbsc006.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmbsc006.getSelectedRowId();
            var ind        = dhxGridStmbsc006.getSelectedCellIndex();
            var rowIndex   = dhxGridStmbsc006.getRowIndex(selectedId);
            var type       = dhxGridStmbsc006.getColType(ind);
            dhxGridStmbsc006.selectCell(rowIndex+1, ind);
            fn_FindStmbsc006();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmbsc006.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmbsc006.getSelectedRowId();
            var ind        = dhxGridStmbsc006.getSelectedCellIndex();
            var rowIndex   = dhxGridStmbsc006.getRowIndex(selectedId);
            var type       = dhxGridStmbsc006.getColType(ind);
            dhxGridStmbsc006.selectCell(rowIndex-1, ind);
            fn_FindStmbsc006();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmbsc006.editCell();
            }
        }
        else return true;
    });
    eventIdStmbsc006.push(eventId);
    eventId = dhxGridStmbsc006.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmbsc006SortGridList(ind, type, direction); 
    });
    eventIdStmbsc006.push(eventId);
    eventId = dhxGridStmbsc006.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmbsc006.push(eventId);
    eventId = dhxGridStmbsc006.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindStmbsc006();
    });
    eventIdStmbsc006.push(eventId);
    eventId = dhxGridStmbsc006.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
    	if(cInd == gf_GetDhxGridColumId(dhxGridStmbsc006, 'prefixUseAt') || cInd == gf_GetDhxGridColumId(dhxGridStmbsc006, 'mtUseAt') ||
    			cInd == gf_GetDhxGridColumId(dhxGridStmbsc006, 'yyUseAt') || cInd == gf_GetDhxGridColumId(dhxGridStmbsc006, 'deUseAt') ||
    			cInd == gf_GetDhxGridColumId(dhxGridStmbsc006, 'seUseAt') || cInd == gf_GetDhxGridColumId(dhxGridStmbsc006, 'snUseAt')) { return false; }
        return true;
    });
    eventIdStmbsc006.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmbsc006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmbsc006()
    });
    $('#btnSaveStmbsc006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmbsc006();
    });
    $('#btnRemoveStmbsc006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmbsc006();
    });
    $('#btnExcelStmbsc006').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmbsc006();
    });
    $('#btnSearchStmbsc006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmbsc006('');
    });
    $('#btnResetStmbsc006').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmbsc006();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormStmbsc006 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmbsc006').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmbsc006').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmbsc006 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmbsc006",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmbsc006 input[name="numberingNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'numberingNm', $(this).val());
    });
    $('#saveFormStmbsc006 input[name="numberingFom"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'numberingFom', $(this).val(), true);
    });
    $('#saveFormStmbsc006 select[name="relTblNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'relTblNm', $(this).val());
        //gf_MakeComboBasic('divRelItemNmSaveFormStmbsc006','relItemNm','sel','width:230px','stmbsc006/combo/searchStmbsc006TableColList','true', '', '', '',$(this).val());
        gf_MakeComboBasic('divRelItemNmSaveFormStmbsc006','relItemNm','sel','width:230px','stmbsc006/combo/searchStmbsc006TableColList', true, 'tblKey', '','',$(this).val());
        
        $('#saveFormStmbsc006 select[name="relItemNm"]').unbind('change blur').bind('change blur',function() {
            gf_errorMsgClear();
            gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'relItemNm', $(this).val());
        });
        
        if(gf_IsNull($(this).val())){
            $('#saveFormStmbsc006 select[name="relItemNm"]').prop('disabled', true);
        } else {
        	$('#saveFormStmbsc006 select[name="relItemNm"]').prop('disabled', false);
        }
    });
    
    $('#saveFormStmbsc006 input[name="prefixUseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var prefixUseAt = gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'prefixUseAt', 'chkbox'))? '0' : '1';
        if(prefixUseAt != gf_DhxGetValue(dhxGridStmbsc006, g_rid, 'prefixUseAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'prefixUseAt', prefixUseAt);
        }
        if(prefixUseAt == '0'){
        	gf_FormSetValue('saveFormStmbsc006', 'prefixSeCode', '', 'combo');
        	gf_FormSetValue('saveFormStmbsc006', 'prefixNm', '', 'text');
        	$('#saveFormStmbsc006 select[name="prefixSeCode"]').prop('disabled', true);
    		value1 = '';
        } else {
        	$('#saveFormStmbsc006 select[name="prefixSeCode"]').prop('disabled', false);
        }
        fn_numberingFomValue();
    });
    $('#saveFormStmbsc006 input[name="yyUseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var yyUseAt = gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'yyUseAt', 'chkbox'))? '0' : '1';
        if(yyUseAt != gf_DhxGetValue(dhxGridStmbsc006, g_rid, 'yyUseAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'yyUseAt', yyUseAt);
        }
        if(yyUseAt == '0'){
        	gf_FormSetValue('saveFormStmbsc006', 'yyLtCode', '', 'combo');
        	gf_FormSetValue('saveFormStmbsc006', 'yyUseCodeNm', '', 'text');
        	$('#saveFormStmbsc006 select[name="yyLtCode"]').prop('disabled', true);
        	value2 ='';
        } else {
        	$('#saveFormStmbsc006 select[name="yyLtCode"]').prop('disabled', false);
        }
        fn_numberingFomValue();
    });
    $('#saveFormStmbsc006 input[name="mtUseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var mtUseAt = gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'mtUseAt', 'chkbox'))? '0' : '1';
        if(mtUseAt != gf_DhxGetValue(dhxGridStmbsc006, g_rid, 'mtUseAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'mtUseAt', mtUseAt);
        }
        if(mtUseAt == '0'){
        	value3 ="";
        } else {
        	value3 ="MM";
        }
        fn_numberingFomValue();
    });
    $('#saveFormStmbsc006 input[name="deUseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var deUseAt = gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'deUseAt', 'chkbox'))? '0' : '1';
        if(deUseAt != gf_DhxGetValue(dhxGridStmbsc006, g_rid, 'deUseAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'deUseAt', deUseAt);
        }
        if(deUseAt == '0'){
        	value4 ="";
        } else {
        	value4 ="DD";
        }
        fn_numberingFomValue();
    });
    $('#saveFormStmbsc006 input[name="seUseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var seUseAt = gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'seUseAt', 'chkbox'))? '0' : '1';
        if(seUseAt != gf_DhxGetValue(dhxGridStmbsc006, g_rid, 'seUseAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'seUseAt', seUseAt);
        }
        if(seUseAt == '0'){
        	value5 ="";
        } else {
        	value5 ="-";
        }
        fn_numberingFomValue();
    });
    $('#saveFormStmbsc006 input[name="snUseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var snUseAt = gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'snUseAt', 'chkbox'))? '0' : '1';
        if(snUseAt != gf_DhxGetValue(dhxGridStmbsc006, g_rid, 'snUseAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'snUseAt', snUseAt);
        }
        if(snUseAt == '0'){
        	gf_FormSetValue('saveFormStmbsc006', 'snLt', '', 'combo');
        	$('#saveFormStmbsc006 select[name="snLt"]').prop('disabled', true);
        	value6 = ''
        } else {
        	$('#saveFormStmbsc006 select[name="snLt"]').prop('disabled', false);
        }
        fn_numberingFomValue();
    });
    $('#saveFormStmbsc006 input[name="prefixNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'prefixNm', $(this).val());
    });
    $('#saveFormStmbsc006 select[name="prefixSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'prefixSeCode', $(this).val());
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'prefixNm', $(this).val());
        if(!gf_IsNull($(this).val())){
    		value1 =gf_FormGetValue('saveFormStmbsc006', 'prefixSeCode', 'combo');
    		gf_FormSetValue('saveFormStmbsc006', 'prefixNm', value1, 'text');
        }
        fn_numberingFomValue();
    });    
    $('#saveFormStmbsc006 select[name="yyLtCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'yyLtCode', $(this).val());
		if(!gf_IsNull($(this).val())){
    		if ($(this).val() =='2') {
        		value2 ='YY';
        	}else{
        		value2 ='YYYY';
        	}
    		gf_FormSetValue('saveFormStmbsc006', 'yyUseCodeNm', value2, '');
            fn_numberingFomValue();
		}	
    });
    $('#saveFormStmbsc006 select[name="snLt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'snLt', $(this).val());
        if(!gf_IsNull($(this).val())){
        	value6 = numberPad('#', $(this).val()) ;  //숫자패턴  
            fn_numberingFomValue();
        }
    });
    $('#saveFormStmbsc006 input[name="suffixNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'suffixNm', $(this).val());
    });
    $('#saveFormStmbsc006 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var useAt = gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'useAt', 'chkbox'))? '0' : '1';
        if(useAt != gf_DhxGetValue(dhxGridStmbsc006, g_rid, 'useAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'useAt', useAt);
        }
    });
    $('#saveFormStmbsc006 input[name="updtAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var updtAt = gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'updtAt', 'chkbox'))? '0' : '1';
        if(updtAt != gf_DhxGetValue(dhxGridStmbsc006, g_rid, 'updtAt',  'grid')){
        	gf_DhxGridCellMapping(dhxGridStmbsc006, dhxDataProcessorStmbsc006, 'updtAt', updtAt);
        }
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmbsc006 = function() {
    $('#searchFormStmbsc006').resetForm();
    $('#searchNumberingNmSearchFormStmbsc006').focus();
};

var cf_SetBindingStmbsc006 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmbsc006('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmbsc006 = function(userId) {
    var jsonParameter = {
    	numberingNm : gf_FormGetValue('searchFormStmbsc006', 'searchNumberingNm', 'text'),
        useAt : gf_FormGetValue('searchFormStmbsc006', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'stmbsc006/searchStmbsc006', jsonParameter, 'fn_CallbackSearchStmbsc006', false, 'GET');
};

var fn_CallbackSearchStmbsc006 = function(strSvcID, targetID, data) {
    //dhxGridStmbsc006.clearAll();
    dhxGridStmbsc006.destructor();
    if(cf_SetComponentsStmbsc006()){ 
        fn_DhxDataProcessorStmbsc006(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmbsc006');
            dhxGridStmbsc006.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmbsc006 == 0 && save_All_Sta_Stmbsc006 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmbsc006.selectRow(0); 
            } else if(save_Row_Sta_Stmbsc006 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmbsc006.selectRow(0);
            } else if(save_All_Sta_Stmbsc006 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmbsc006.selectRow(save_Row_Num_Stmbsc006); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmbsc006.selectRow(save_Row_Num_Stmbsc006);   //개발자 수정 필요  
                //var findCell = dhxGridStmbsc006.findCell(save_Row_Ids_Stmbsc006, gf_GetDhxGridColumId(dhxGridStmbsc006,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmbsc006.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmbsc006.selectRow(0);
                //} 
            } 
 
            fn_FindStmbsc006();
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmbsc006');
            fn_InitInputFormStmbsc006();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormStmbsc006").text(data.data.records.length);
        cf_SetEventListenerStmbsc006();
    } 
};
var fn_DhxDataProcessorStmbsc006 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmbsc006 = new dataProcessor(gv_ContextPath+'/stmbsc006/saveStmbsc006'); //lock feed url
    dhxDataProcessorStmbsc006.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmbsc006.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmbsc006.init(dhxGridStmbsc006); //link dataprocessor to the grid
    dhxDataProcessorStmbsc006.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmbsc006.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmbsc006.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmbsc006();
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
var fn_FindStmbsc006 = function() {
    var rId = dhxGridStmbsc006.getSelectedRowId();
    g_rid = rId;
    var status = dhxDataProcessorStmbsc006.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormStmbsc006", "numberingNm", gf_DhxGetValue(dhxGridStmbsc006, rId, 'numberingNm',  'grid'), '');
    gf_FormSetValue("saveFormStmbsc006", "numberingFom", gf_DhxGetValue(dhxGridStmbsc006, rId, 'numberingFom',  'grid'), '');
    gf_FormSetValue("saveFormStmbsc006", "relTblNm", gf_DhxGetValue(dhxGridStmbsc006, rId, 'relTblNm',  'grid'), 'combo');
    gf_FormSetValue("saveFormStmbsc006", "relItemNm", gf_DhxGetValue(dhxGridStmbsc006, rId, 'relItemNm',  'grid'), 'combo');
    gf_FormSetValue("saveFormStmbsc006", "maxNumber", gf_DhxGetValue(dhxGridStmbsc006, rId, 'maxNumber',  'grid'), '');
    gf_FormSetValue("saveFormStmbsc006", "prefixUseAt", ((gf_DhxGetValue(dhxGridStmbsc006, rId, 'prefixUseAt',        'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmbsc006", "yyUseAt", ((gf_DhxGetValue(dhxGridStmbsc006, rId, 'yyUseAt',        'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmbsc006", "mtUseAt", ((gf_DhxGetValue(dhxGridStmbsc006, rId, 'mtUseAt',        'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmbsc006", "deUseAt", ((gf_DhxGetValue(dhxGridStmbsc006, rId, 'deUseAt',        'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmbsc006", "seUseAt", ((gf_DhxGetValue(dhxGridStmbsc006, rId, 'seUseAt',        'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmbsc006", "snUseAt", ((gf_DhxGetValue(dhxGridStmbsc006, rId, 'snUseAt',        'grid') == '1') ? true : false), 'chkbox');
    
    gf_FormSetValue("saveFormStmbsc006", "prefixNm", gf_DhxGetValue(dhxGridStmbsc006, rId, 'prefixNm',  'grid'), '');
    gf_FormSetValue("saveFormStmbsc006", "prefixSeCode", gf_DhxGetValue(dhxGridStmbsc006, rId, 'prefixSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormStmbsc006", "snLt", gf_DhxGetValue(dhxGridStmbsc006, rId, 'snLt',  'grid'), 'combo');
    gf_FormSetValue("saveFormStmbsc006", "yyLtCode", gf_DhxGetValue(dhxGridStmbsc006, rId, 'yyLtCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormStmbsc006", "suffixNm", gf_DhxGetValue(dhxGridStmbsc006, rId, 'suffixNm',  'grid'), '');
    gf_FormSetValue("saveFormStmbsc006", "useAt", ((gf_DhxGetValue(dhxGridStmbsc006, rId, 'useAt', 'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmbsc006", "updtAt", ((gf_DhxGetValue(dhxGridStmbsc006, rId, 'updtAt', 'grid') == '1') ? true : false), 'chkbox');

    if(status == 'inserted') {
        $('#saveFormStmbsc006 select[name="relTblNm"]').prop('disabled', false);
        $('#saveFormStmbsc006 select[name="relItemNm"]').prop('disabled', false);
    } else {
        $('#saveFormStmbsc006 select[name="relTblNm"]').prop('disabled', true);
        $('#saveFormStmbsc006 select[name="relItemNm"]').prop('disabled', true);
    }

    $('#saveFormStmbsc006 input[name="numberingFom"]').prop('disabled', true);
    $('#saveFormStmbsc006 input[name="maxNumber"]').prop('disabled', true);
    
    if(!gf_IsNull(gf_DhxGetValue(dhxGridStmbsc006, rId, 'maxNumber',  'grid'))){
    	fn_FormDisabled(true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmbsc006 = function() {
    $('#saveFormStmbsc006 input[name="relTblNm"]').prop('disabled', false);
    $('#saveFormStmbsc006 input[name="relItemNm"]').prop('disabled', false);
    $('#saveFormStmbsc006').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmbsc006 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddStmbsc006 = function() {
	numberingFom =""; //채번번호 패턴 
	value1="";
	value2="";
	value3="";
	value4="";
	value5="";
	value6="";
	
    dhxGridStmbsc006.clearSelection();
    fn_InitInputFormStmbsc006();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //relTblNm
    initValueArr.push(''); //relItemNm
    initValueArr.push(''); //numberingNm
    initValueArr.push(''); //prefixUseAt
    initValueArr.push(''); //prefixSeCode
    initValueArr.push(''); //prefixNm
    initValueArr.push(''); //yyUseAt
    initValueArr.push(''); //yyLtCode
    initValueArr.push(''); //mtUseAt
    initValueArr.push(''); //deUseAt
    initValueArr.push(''); //seUseAt
    initValueArr.push(''); //suffixNm
    initValueArr.push(''); //snUseAt
    initValueArr.push(''); //snLt
    initValueArr.push(''); //numberingFom
    initValueArr.push('1'); //useAt
    initValueArr.push(''); //updtAt
    dhxGridStmbsc006.addRow(dhxGridStmbsc006.uid(), initValueArr, 0);
    dhxGridStmbsc006.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmbsc006');
    gf_FormSetValue("saveFormStmbsc006", "useAt", '1', 'chkbox');
    $('#btnPopEmpSearchStmbsc006').show();
    fn_FormDisabled(false);
    
	gf_FormSetValue('saveFormStmbsc006', 'prefixSeCode', '', 'combo');
	gf_FormSetValue('saveFormStmbsc006', 'yyLtCode', '', 'combo');
	gf_FormSetValue('saveFormStmbsc006', 'snLt', '', 'combo');
    
    $('#saveFormStmbsc006 input[name="numberingFom"]').prop('disabled', true);
    $('#saveFormStmbsc006 input[name="maxNumber"]').prop('disabled', true);
    $('#saveFormStmbsc006 select[name="relItemNm"]').prop('disabled', true);
    $('#saveFormStmbsc006 select[name="prefixSeCode"]').prop('disabled', true);
    $('#saveFormStmbsc006 select[name="yyLtCode"]').prop('disabled', true);
    $('#saveFormStmbsc006 select[name="snLt"]').prop('disabled', true);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmbsc006SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmbsc006, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmbsc006', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmbsc006', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmbsc006, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmbsc006.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmbsc006', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmbsc006', 'sortColumId', gf_GetDhxGridColum(dhxGridStmbsc006, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmbsc006.setSortImgState(false); 
            gf_FormSetValue('searchFormStmbsc006', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmbsc006', 'sortColumId', '', 'text'); 
            dhxGridStmbsc006.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmbsc006.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmbsc006', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmbsc006', 'sortColumId', gf_GetDhxGridColum(dhxGridStmbsc006, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmbsc006 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmbsc006 = 0; 
    save_Edt_Cnt_Stmbsc006 = 0; 
    save_Del_Cnt_Stmbsc006 = 0; 
    dhxGridStmbsc006.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmbsc006.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmbsc006.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmbsc006 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmbsc006 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmbsc006 += 1; 
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
        save_All_Sta_Stmbsc006 = 0; 
        if(save_Add_Cnt_Stmbsc006 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmbsc006 + "건";
            save_All_Sta_Stmbsc006 = 1; 
        } 
        if(save_Edt_Cnt_Stmbsc006 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmbsc006 + "건"; 
        } 
        if(save_Del_Cnt_Stmbsc006 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmbsc006 + "건"; 
            save_All_Sta_Stmbsc006 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmbsc006(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmbsc006(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmbsc006 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmbsc006_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmbsc006_Send = function() {
    if(fn_GridValidation(dhxGridStmbsc006, dhxDataProcessorStmbsc006)) {
        dhxDataProcessorStmbsc006.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmbsc006 = function() {
    var rowId = dhxGridStmbsc006.getSelectedRowId();
    var state = dhxDataProcessorStmbsc006.getState(rowId);
    var message = "삭제하시겠습니까?";
    if(gf_IsNull(gf_DhxGetValue(dhxGridStmbsc006, rowId, 'maxNumber', 'grid'))){
        if(state == 'inserted') {
            var rowNum = dhxGridStmbsc006.getRowIndex(rowId);
            dhxGridStmbsc006.deleteRow(rowId);
            dhxGridStmbsc006.selectRow(rowNum);
            fn_FindStmbsc006();
        } else {
        	dhxDataProcessorStmbsc006.setUpdated(rowId, true, 'deleted');
        	
        	if(confirmModalStmbsc006(message)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            }
        }
    } else {
    	gf_DivMsgAlert('채번이 사용되어 삭제가 불가능합니다.'); 
    	return false;
    }
}

if (!gf_IsNull(gf_FormGetValue('saveFormStmbsc006', 'maxNumber', 'text'))){
}

/**
 * 엑셀다운로드
 */
var fn_ExcelStmbsc006 = function () {
    var titStmbsc006 = '자동채번설정'; /* gf_LocaleTrans('default', 'titStmbsc006') */
    var jsonParameter = {
        	numberingNm : gf_FormGetValue('searchFormStmbsc006', 'searchNumberingNm', 'text'),
            useAt : gf_FormGetValue('searchFormStmbsc006', 'useAt', 'combo')
    };
    var header = [[
        '채번명칭' /* gf_LocaleTrans('default', 'titNumberingNm') */,
        '채번패턴' /* gf_LocaleTrans('default', 'titNumberingFom') */,
        '관련테이블' /* gf_LocaleTrans('default', 'titRelTblNm') */,
        '관련항목' /* gf_LocaleTrans('default', 'titRelItemNm') */,
        '최종번호',/* maxNumber */
        '머리글' /* gf_LocaleTrans('default', 'titPrefixUseAt') */,
        '머리글표시' /* gf_LocaleTrans('default', 'titPrefixNm') */,
        '년도' /* gf_LocaleTrans('default', 'titYyUseAt') */,
        '년도표시' /* gf_LocaleTrans('default', 'titYyLtCode') */,
        '월' /* gf_LocaleTrans('default', 'titMtUseAt') */,
        '일자' /* gf_LocaleTrans('default', 'titDeUseAt') */,
        '구분자' /* gf_LocaleTrans('default', 'titSeUseAt') */,
        '순번' /* gf_LocaleTrans('default', 'titSnUseAt') */,
        '숫자개수' /* gf_LocaleTrans('default', 'titSnLt') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '수정여부' /* gf_LocaleTrans('default', 'titUpdtAt') */
    ]];
    var dataId = [[ 'numberingNm', 'numberingFom', 'relTblNm', 'relItemNm', 'maxNumber', 'prefixUseAt', 'prefixNm', 'yyUseAt', 'yyLtCode', 'mtUseAt', 'deUseAt', 'seUseAt', 'snUseAt', 'snLt', 'useAt', 'updtAt' ]];
    var dataAlign = [[ 'left', 'left', 'left', 'left', 'left', 'center', 'left', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmbsc006 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmbsc006;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmbsc006/excelStmbsc006', jsonParameter);
};
/**
 * 채번형식 지정
 */
var fn_numberingFomValue = function (){
	gf_FormSetValue('saveFormStmbsc006', 'numberingFom', '', 'text');    	
   	numberingFom =value1+value2+value3+value4+value5+value6;     
    gf_FormSetValue('saveFormStmbsc006', 'numberingFom', numberingFom, 'text');
	
};
//숫자패턴 
var numberPad = function (n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('#') + n;
    //return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
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
    $('#saveFormStmbsc006 #relTblNmSaveFormStmbsc006').parent().append(
    '<div class="error" id="relTblNmSaveFormStmbsc006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormStmbsc006 #relItemNmSaveFormStmbsc006').parent().append(
    '<div class="error" id="relItemNmSaveFormStmbsc006-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmbsc006 = function(relTblNm, relItemNm){
    if(!gf_IsNull(relTblNm) && !gf_IsNull(relItemNm)) {
        var jsonParameter = {
            relTblNm : relTblNm,
            relItemNm : relItemNm
        };
        var dataSource = gf_NoAsyncTransaction('stmbsc006/findStmbsc006', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.relTblNm) && gf_IsNull(data.relItemNm)) {
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
    var state = dhxDataProcessorStmbsc006.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmbsc006').validate().form()){
                if(state == 'inserted') {
                    var relTblNm = gf_FormGetValue('saveFormStmbsc006', 'relTblNm', 'text');
                    var relItemNm = gf_FormGetValue('saveFormStmbsc006', 'relItemNm', 'text');
                    if(fn_CheckDupStmbsc006(relTblNm, relItemNm)) return true;
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
    var checkRelTblNm;
    var checkRelItemNm;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmbsc006 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmbsc006 == 'deleted') {
        save_Row_Num_Stmbsc006 = 0;
        save_Row_Ids_Stmbsc006 = "";
    } else if(save_Row_Sta_Stmbsc006 == 'inserted') {
        save_Row_Num_Stmbsc006 = rowNum;
        save_Row_Ids_Stmbsc006 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmbsc006 = rowNum;
        save_Row_Ids_Stmbsc006 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'numberingNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'numberingNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'relTblNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'relTblNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'relItemNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'relItemNm');
                    valid = false;
                }
                if(gf_DhxGetValue(dhxGridObjet, rowId, 'prefixUseAt', 'grid') != '0'){
                	if(gf_IsNull(gf_DhxGetValue(dhxGridObjet, rowId, 'prefixSeCode', 'grid'))){
	                    valid = false;
                	} 
                }
                if(gf_DhxGetValue(dhxGridObjet, rowId, 'yyUseAt', 'grid') != '0'){
                	if(gf_IsNull(gf_DhxGetValue(dhxGridObjet, rowId, 'yyLtCode', 'grid'))){
	                    valid = false;
                	} 
                }
                if(gf_DhxGetValue(dhxGridObjet, rowId, 'snUseAt', 'grid') != '0'){
                	if(gf_IsNull(gf_DhxGetValue(dhxGridObjet, rowId, 'snLt', 'grid'))){
	                    valid = false;
                	} 
                }
                if(valid && !gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'numberingFom', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'numberingFom');
                    gf_DivMsgAlert("채번패턴 구성이 필요합니다.");
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkRelTblNm = gf_DhxGetValue(dhxGridObjet, rowId, 'relTblNm', 'grid');
                    checkRelItemNm = gf_DhxGetValue(dhxGridObjet, rowId, 'relItemNm', 'grid');
                    if(!gf_IsNull(checkRelTblNm, checkRelItemNm)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var relTblNm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'relTblNm', 'grid');
                            var relItemNm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'relItemNm', 'grid');
                            if(((relTblNm == checkRelTblNm) && (relItemNm == checkRelItemNm)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'relTblNm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'relItemNm');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmbsc006( checkRelTblNm, checkRelItemNm )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'relTblNm');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'relItemNm');
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
        dhxGridStmbsc006.selectRowById(validFalseFistRowId);
        fn_FindStmbsc006();
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