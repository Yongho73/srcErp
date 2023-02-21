/**
 *    프로그램       : 조직코드관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.20
 *    사용테이블      : MHS_ORGNZT
 * sourceGen version : 2020.07.16.01 (2020.08.20)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrm003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrm003 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrm003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrm003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrm003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrm003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrm003 = 0;  //그리드 삭제 수량 
var dhxGridMhshrm003;  //그리드 객체
var eventIdMhshrm003 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrm003;  //DataProcessor 객체

var rootOrgnztCode = '0000';
var rootMenuUpperOrgnztCode = '0000';
var orgnztCodeDupCheck = false;
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrm003();
    if(cf_SetComponentsMhshrm003()){
       cf_SetEventListenerMhshrm003();
       cf_InitFormMhshrm003();
       cf_SetBindingMhshrm003();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrm003 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrm003").validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('divComboOrgnztSeCode', 'orgnztSeCode', 'orgnztSeCode', 'add', 'C097', '' , '', '', 'ordr', 'required');//휴직구분
    fn_Date();
};

var cf_SetComponentsMhshrm003 = function() {
    var dhxGridMhshrm003HeaderInfo = [];
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('조직코드', '90', 'center', 'str', 'ro', false, 'orgnztCode', '', '')); /* gf_LocaleTrans('default', 'titOrgnztCode') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('조직명', '*', 'left', 'str', 'tree', false, 'orgnztNm', '', '')); /* gf_LocaleTrans('default', 'titOrgnztNm') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('조직관리자(장)', '100', 'center', 'str', 'ro', false, 'orgnztMngrEmpNm', '', '')); /* gf_LocaleTrans('default', 'titOrgnztMngrEmpno') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('조직등록일자', '100', 'center', 'str', 'ro', false, 'regDt', '', ''));
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('사용 여부', '80', 'center', 'str', 'ro', false, 'useAtNm', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('조직추가','80','center','str','ro',false,'makeBtn',''));
    
    
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('부서코드', '100', 'center', 'str', 'ro', true, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titDeptCode') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('상위 조직 코드', '100', 'center', 'str', 'ro', true, 'upperOrgnztCode', '', '')); /* gf_LocaleTrans('default', 'titUpperOrgnztCode') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('조직 관리자 사원번호', '100', 'center', 'str', 'ro', true, 'orgnztMngrEmpno', '', '')); /* gf_LocaleTrans('default', 'titOrgnztMngrEmpno') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('조직 구분 코드', '100', 'center', 'str', 'ro', true, 'orgnztSeCode', '', '')); /* gf_LocaleTrans('default', 'titOrgnztSeCode') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('조직계위', '100', 'right', 'int', 'ro', true, 'orgnztLvl', '', '')); /* gf_LocaleTrans('default', 'titOrgnztLvl') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '100', 'left', 'str', 'ro', true, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '100', 'left', 'str', 'ro', true, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('사용 여부', '100', 'center', 'str', 'ro', true, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrm003HeaderInfo.push(gf_MakeDhxGridHeader('CHK', '100', 'center', 'str', 'ro', true, 'regId', '', ''));
    dhxGridMhshrm003 = gf_MakeDhxGrid('dataListMhshrm003', dhxGridMhshrm003HeaderInfo, true, false, false);
    dhxGridMhshrm003.enableAutoWidth(false);
    dhxGridMhshrm003.setEditable(true);

//    dhxGridMhshrm003.enableDragAndDrop(true);
//    dhxGridMhshrm003.enableDragOrder(true);
//    dhxGridMhshrm003.enableOrderSaving();
//    dhxGridMhshrm003.setDragBehavior('complex'); 
//    dhxGridMhshrm003.enableAutoWidth(true);

    dhxGridMhshrm003.setColumnMinWidth(100,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    return true; 
};

var cf_SetEventListenerMhshrm003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrm003 = gf_GridDetachEvent(dhxGridMhshrm003, eventIdMhshrm003);
    eventId = dhxGridMhshrm003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrm003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrm003.getColumnsNum();
            var rowNum = dhxGridMhshrm003.getRowsNum();
            var selectedId = dhxGridMhshrm003.getSelectedRowId();
            var ind        = dhxGridMhshrm003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm003.getRowIndex(selectedId);
            var type       = dhxGridMhshrm003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrm003.selectRow(0);
                    //fn_FindMhshrm003();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrm003.selectRow(rowIndex + 1);
                    fn_FindMhshrm003();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrm003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrm003.getSelectedRowId();
            var ind        = dhxGridMhshrm003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm003.getRowIndex(selectedId);
            var type       = dhxGridMhshrm003.getColType(ind);
            dhxGridMhshrm003.selectCell(rowIndex+1, ind);
            fn_FindMhshrm003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrm003.getSelectedRowId();
            var ind        = dhxGridMhshrm003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrm003.getRowIndex(selectedId);
            var type       = dhxGridMhshrm003.getColType(ind);
            dhxGridMhshrm003.selectCell(rowIndex-1, ind);
            fn_FindMhshrm003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrm003.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrm003.push(eventId);
    eventId = dhxGridMhshrm003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrm003SortGridList(ind, type, direction); 
    });
    eventIdMhshrm003.push(eventId);
    eventId = dhxGridMhshrm003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrm003.push(eventId);
    eventId = dhxGridMhshrm003.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        var state = dhxDataProcessorMhshrm003.getState(id);
        
//        if(state == "inserted" || state == "updated"){
//	    	fn_DivMsgConfirm2('수정된 내용이 사라집니다.', function(confirm){ 
//        	    if(confirm){ 
//        	    	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm003, 'makeBtn')){
//                	var orgnztCode = gf_DhxGetValue(dhxGridMhshrm003, id, 'orgnztCode',  'grid');
//                	var orgnztLvl = gf_DhxGetValue(dhxGridMhshrm003, id, 'orgnztLvl',  'grid');
//                	var deptCode = gf_DhxGetValue(dhxGridMhshrm003, id, 'deptCode',  'grid');
//                	return fn_AddSubMhshrm003(orgnztCode, orgnztLvl, deptCode);
//                }
//                return fn_FindMhshrm003();
//        	    }else{ 
//        	        return false; 
//        	    } 
//        	});
//        } else {
//        	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm003, 'makeBtn')){
//            	var orgnztCode = gf_DhxGetValue(dhxGridMhshrm003, id, 'orgnztCode',  'grid');
//            	var orgnztLvl = gf_DhxGetValue(dhxGridMhshrm003, id, 'orgnztLvl',  'grid');
//            	var deptCode = gf_DhxGetValue(dhxGridMhshrm003, id, 'deptCode',  'grid');
//            	return fn_AddSubMhshrm003(orgnztCode, orgnztLvl, deptCode);
//        	}
//            return fn_FindMhshrm003();
//        }
    	if(ind == gf_GetDhxGridColumId(dhxGridMhshrm003, 'makeBtn')){
    	var orgnztCode = gf_DhxGetValue(dhxGridMhshrm003, id, 'orgnztCode',  'grid');
    	var orgnztLvl = gf_DhxGetValue(dhxGridMhshrm003, id, 'orgnztLvl',  'grid');
    	var deptCode = gf_DhxGetValue(dhxGridMhshrm003, id, 'deptCode',  'grid');
    	return fn_AddSubMhshrm003(orgnztCode, orgnztLvl, deptCode);
		}
	    return fn_FindMhshrm003();
        
    });
    eventIdMhshrm003.push(eventId);
    eventId = dhxGridMhshrm003.attachEvent("onEditCell", function(id, ind){
        return false;
    });
    eventIdMhshrm003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveMhshrm003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrm003();
    });
    $('#btnRemoveMhshrm003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrm003();
    });
    $('#btnExcelMhshrm003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrm003();
    });
    $('#btnSearchMhshrm003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrm003('');
    });
    $('#btnResetMhshrm003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrm003();
    });
    $('#btnDeptSearch').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
  		gf_DeptPopup("searchFormMhshrm003","deptCodeSearchFormMhshrm003","korNmSearchFormMhshrm003", '1000', "Y", "");
    });
    $('#checkOrgnztCode').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_FindSameKey();
    });
    $('#btnEmpSearch').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
  		gf_EmpPopup("saveFormMhshrm003","orgnztMngrEmpnoSaveFormMhshrm003","orgnztMngrEmpNmSaveFormMhshrm003", '1000', "Y", "");
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhshrm003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "deptCodeSearchFormMhshrm003"){
        		return fn_SearchDeptCode();
        	} else if(this.id == "korNmSearchFormMhshrm003"){
        		return fn_SearchDeptCode();
        	} else if(this.id == "btnDeptSearch"){
        		return fn_SearchDeptCode();
        	}
        	$('#btnSearchMhshrm003').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
	$('#deptCodeSearchFormMhshrm003').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhshrm003', 'korNm', '', 'text');
	    }
    });
	$('#korNmSearchFormMhshrm003').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhshrm003', 'deptCode', '', 'text');
	    }
    });
	$('#orgnztMngrEmpnoSaveFormMhshrm003').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('saveFormMhshrm003', 'orgnztMngrEmpNm', '', 'text');
	    }
    });
	$('#orgnztMngrEmpNmSaveFormMhshrm003').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('saveFormMhshrm003', 'orgnztMngrEmpno', '', 'text');
	    }
    });
	//달력이벤트
	$('#saveFormMhshrm003 .input_calen').unbind('keyup').bind('keyup', function(event){
    	dateChk($(this));
    });

    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrm003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "orgnztCodeSaveFormMhshrm003"){
        		return fn_FindSameKey();
        	} else if(this.id == "checkOrgnztCode"){
        		return fn_FindSameKey();
        	} else if(this.id == "orgnztMngrEmpnoSaveFormMhshrm003"){
        		return fn_SearchEmpCode();
        	} else if(this.id == "orgnztMngrEmpNmSaveFormMhshrm003"){
        		return fn_SearchEmpCode();
        	} else if(this.id == "btnEmpSearch"){
        		return fn_SearchEmpCode();
        	}
        	return gf_saveForm_NextEle("saveFormMhshrm003",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrm003 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        var val = gf_IsNull(gf_FormGetValue('saveFormMhshrm003', 'useAt', 'chkbox'))? '0' : '1';
        if(val == '0'){
    		gf_FormSetValue('saveFormMhshrm003', 'useEndDe', new Date().format('YYYY-MM-DD'), '');
    	} else {
    		gf_FormSetValue('saveFormMhshrm003', 'useEndDe', '', '');
    	}
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 input[name="orgnztCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 input[name="deptCode"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 input[name="upperOrgnztCode"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 input[name="orgnztNm"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 input[name="orgnztMngrEmpno"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 input[name="orgnztMngrEmpNm"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 select[name="orgnztSeCode"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 input[name="orgnztLvl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrm003, dhxDataProcessorMhshrm003, 'orgnztLvl', $(this).val());
    });
    $('#saveFormMhshrm003 input[name="useBeginDe"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    $('#saveFormMhshrm003 input[name="useEndDe"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
        var rowId = dhxGridMhshrm003.getSelectedRowId();
        var state = dhxDataProcessorMhshrm003.getState(rowId);
        if(state != 'inserted' && state != 'deleted'){
        	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'updated');
        }
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhshrm003 = function() {
    $('#searchFormMhshrm003').resetForm();
    $('#korNmSearchFormMhshrm003').focus();
};

var cf_SetBindingMhshrm003 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhshrm003('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhshrm003 = function(userId) {
    var jsonParameter = {
//		deptCode : gf_FormGetValue('searchFormMhshrm003', 'deptCode', 'text'),
//		deptKorNm : gf_FormGetValue('searchFormMhshrm003', 'korNm', 'text'),
		orgnztNm : gf_FormGetValue('searchFormMhshrm003', 'orgnztNm', 'text'),
        useAt : gf_FormGetValue('searchFormMhshrm003', 'useAt', 'combo')
    };
    gf_Transaction(userId, 'mhshrm003/searchMhshrm003', jsonParameter, 'fn_CallbackSearchMhshrm003', false, 'GET');
};


var fn_CallbackSearchMhshrm003 = function(strSvcID, targetID, data) {
	dhxGridMhshrm003.clearAll();
//	dhxGridMhshrm003.destructor();
	if(cf_SetComponentsMhshrm003()){ 
		fn_DhxDataProcessorMhshrm003(); 
		if(!gf_IsNull(data.data.records)){
			if(!gf_IsNull(data.data.records)){
				var menus = data.data.records;    	 
				var menuList = [];
				var menuObj = {};
				var count = 0;
				menus.forEach(function(menu) {
    				
					menuObj = {};
	    			menuObj.num = menu.num;
					menuObj.id = menu.orgnztCode;
					menuObj.orgnztCode = menu.orgnztCode;
					menuObj.deptCode = menu.deptCode;
					menuObj.parentId = menu.upperOrgnztCode;
					menuObj.upperOrgnztCode = menu.upperOrgnztCode;
	    			menuObj.orgnztMngrEmpno = menu.orgnztMngrEmpno;	
	    			menuObj.orgnztMngrEmpNm = menu.orgnztMngrEmpNm;			
	    			menuObj.orgnztSeCode = menu.orgnztSeCode;
	    			menuObj.orgnztLvl = menu.orgnztLvl;
	    			menuObj.useBeginDe = menu.useBeginDe;
	    			menuObj.useEndDe = menu.useEndDe;
	    			menuObj.useAt = menu.useAt;
	    			menuObj.useAtNm = menu.useAtNm;
	    			menuObj.regDt = menu.regDt;
	    			menuObj.regId = menu.regId;
	    			if(menu.orgnztLvl == '1') {
	    				menuObj.orgnztNm = {
	    					value: menu.orgnztNm,
	    					image: 'folder.gif'
	    				};
	    			} else {
	    			    menuObj.orgnztNm = menu.orgnztNm;
	    			}  
	    			menuList[count] = menuObj;
	    			count++;
	    		});
	    		// 트리구조 만들때 반드시 최상위 메뉴의 최상의 메뉴 id도 있어야 무한루프에 안빠진다.
	    		var menuTree = gf_TreeModel(menuList, '0000');
	    		dhxGridMhshrm003.clearAll();
	
	    	    gf_NoFoundDataOnGridMsgRemove('dataListMhshrm003');
	    		dhxGridMhshrm003.parse(JSON.stringify(menuTree),'js');		
	    		fn_GridMenuRowRender();
	    		dhxGridMhshrm003.openItem(rootOrgnztCode);
//	    		fn_SaveStmMenu('8100');	
	    		
	    		if(save_Row_Num_Mhshrm003 == 0 && save_All_Sta_Mhshrm003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
	    	        dhxGridMhshrm003.selectRow(0); 
	    	    } else if(save_Row_Sta_Mhshrm003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
	    	        dhxGridMhshrm003.selectRow(0);
	    	    } else if(save_All_Sta_Mhshrm003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
	    	        dhxGridMhshrm003.selectRow(save_Row_Num_Mhshrm003); 
	    	    } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
	    	        dhxGridMhshrm003.selectRow(save_Row_Num_Mhshrm003);   //개발자 수정 필요  
	    	        //var findCell = dhxGridMhshrm003.findCell(save_Row_Ids_Mhshrm003, gf_GetDhxGridColumId(dhxGridMhshrm003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
	    	        //if(!gf_IsNull(findCell)) { 
	    	        //    dhxGridMhshrm003.selectRowById(findCell[0][0]); 
	    	        //} else { 
	    	        //    dhxGridMhshrm003.selectRow(0);
	    	        //} 
	    	     }
	    		fn_FindMhshrm003();
    	 } else {
    	     gf_NoFoundDataOnGridMsg('dataListMhshrm003');
    	     fn_InitInputFormMhshrm003();
    	     fn_FormDisabled(true);
    	 }
		 $("#spanCntSearchFormMhshrm003").text(data.data.records.length);
		 cf_SetEventListenerMhshrm003();
		}
	}
};

var fn_GridMenuRowRender = function(){
	dhxGridMhshrm003.forEachRow(function(rowId) {		
		dhxGridMhshrm003.cells(rowId,5).setDisabled(true);
		dhxGridMhshrm003.openItem(rowId);
		dhxGridMhshrm003.cells(rowId,6).setValue('<button>+</button>');
	});
};

var fn_DhxDataProcessorMhshrm003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrm003 = new dataProcessor(gv_ContextPath+'/mhshrm003/saveMhshrm003'); //lock feed url
    dhxDataProcessorMhshrm003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrm003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrm003.init(dhxGridMhshrm003); //link dataprocessor to the grid
    dhxDataProcessorMhshrm003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrm003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrm003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrm003();
                    $("#checkAllMhshrm003").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhshrm003 = function() {
    var rId = dhxGridMhshrm003.getSelectedRowId();

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhshrm003", "orgnztCode", gf_DhxGetValue(dhxGridMhshrm003, rId, 'orgnztCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "deptCode", gf_DhxGetValue(dhxGridMhshrm003, rId, 'deptCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "upperOrgnztCode", gf_DhxGetValue(dhxGridMhshrm003, rId, 'upperOrgnztCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "orgnztNm", gf_DhxGetValue(dhxGridMhshrm003, rId, 'orgnztNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "orgnztMngrEmpno", gf_DhxGetValue(dhxGridMhshrm003, rId, 'orgnztMngrEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "orgnztMngrEmpNm", gf_DhxGetValue(dhxGridMhshrm003, rId, 'orgnztMngrEmpNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "orgnztSeCode", gf_DhxGetValue(dhxGridMhshrm003, rId, 'orgnztSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrm003", "orgnztLvl", gf_DhxGetValue(dhxGridMhshrm003, rId, 'orgnztLvl',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "useBeginDe", gf_DhxGetValue(dhxGridMhshrm003, rId, 'useBeginDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "useEndDe", gf_DhxGetValue(dhxGridMhshrm003, rId, 'useEndDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrm003", "useAt", ((gf_DhxGetValue(dhxGridMhshrm003, rId, 'useAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMhshrm003", "regId", gf_DhxGetValue(dhxGridMhshrm003, rId, 'regId',  'grid'), '');
    
	$('#useBeginDeSaveFormMhshrm003').val(gf_DhxGetValue(dhxGridMhshrm003, rId, 'useBeginDe',  'grid'));
	$('#useEndDeSaveFormMhshrm003').val(gf_DhxGetValue(dhxGridMhshrm003, rId, 'useEndDe',  'grid'));


    $('#saveFormMhshrm003 input[name="upperOrgnztCode"]').prop('disabled', true);
    $('#saveFormMhshrm003 input[name="deptCode"]').prop('disabled', true);
    $('#saveFormMhshrm003 input[name="orgnztCode"]').prop('disabled', true);
    $('#checkOrgnztCode').hide();
    
    if(gf_DhxGetValue(dhxGridMhshrm003, rId, 'orgnztSeCode',  'grid') == '10'){
        fn_FormDisabled(true);
        $('#saveFormMhshrm003 input[name="orgnztMngrEmpno"]').prop('disabled', false);
        $('#saveFormMhshrm003 input[name="orgnztMngrEmpNm"]').prop('disabled', false);
    }
    orgnztCodeDupCheck = true;
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrm003 = function() {
    $('#saveFormMhshrm003 input[name="orgnztCode"]').prop('disabled', false);
    $('#saveFormMhshrm003').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhshrm003 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddSubMhshrm003 = function(upperOrgnztCode, orgnztLvl, deptCode) {
	orgnztCodeDupCheck = false;
	var firstOrgnztCode = upperOrgnztCode.substring(0, 2);
    dhxGridMhshrm003.clearSelection();
    fn_InitInputFormMhshrm003();
    fn_FormDisabled(false);
    $('#checkOrgnztCode').show();
    gf_FormSetValue('saveFormMhshrm003', 'upperOrgnztCode', upperOrgnztCode, '');
    if(!gf_IsNull(deptCode)){
        gf_FormSetValue('saveFormMhshrm003', 'deptCode', deptCode, '');
    } else {
    	 gf_FormSetValue('saveFormMhshrm003', 'deptCode', '자동설정', '');
    }
    gf_FormSetValue('saveFormMhshrm003', 'orgnztLvl', Number(orgnztLvl)+1, '');
    gf_FormSetValue('saveFormMhshrm003', 'orgnztCode', firstOrgnztCode, '');
    gf_FormSetValue('saveFormMhshrm003', 'useBeginDe', new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue('saveFormMhshrm003', 'orgnztSeCode', '', 'combo');
    gf_FormSetValue('saveFormMhshrm003', 'useAt', true, 'chkbox');
    gf_FormSetValue('saveFormMhshrm003', 'regId', '', '');
    $('#saveFormMhshrm003 input[name="upperOrgnztCode"]').prop('disabled', true);
    $('#saveFormMhshrm003 input[name="deptCode"]').prop('disabled', true);
    
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrm003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrm003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrm003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrm003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrm003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrm003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrm003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrm003', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrm003.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrm003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrm003', 'sortColumId', '', 'text'); 
            dhxGridMhshrm003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrm003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrm003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrm003', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrm003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrm003 = function() {
	confirmMsg = "저장하시겠습니까?"; 
	if(confirmModalMhshrm003(confirmMsg)){  //여기는 안옴 
	} else { 
		return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
	}
}
var confirmModalMhshrm003 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrm003_Send();
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrm003_Send = function() {
    if(fn_GridValidation()) {
    	var jsonParameter = {
    			upperOrgnztCode : gf_FormGetValue('saveFormMhshrm003', 'upperOrgnztCode', 'text'),
    			deptCode : gf_FormGetValue('saveFormMhshrm003', 'deptCode', 'text'),
    			orgnztLvl : gf_FormGetValue('saveFormMhshrm003', 'orgnztLvl', 'text'),
    			orgnztCode : gf_FormGetValue('saveFormMhshrm003', 'orgnztCode', 'text'),
    			orgnztNm : gf_FormGetValue('saveFormMhshrm003', 'orgnztNm', 'text'),
    			orgnztSeCode : gf_FormGetValue('saveFormMhshrm003', 'orgnztSeCode', 'combo'),
    			useBeginDe : gf_FormGetValue('saveFormMhshrm003', 'useBeginDe', 'text'),
    			useEndDe : gf_FormGetValue('saveFormMhshrm003', 'useEndDe', 'text'),
    			useAt : gf_FormGetValue('saveFormMhshrm003', 'useAt', 'chkboxYN'),
    			orgnztMngrEmpno : gf_FormGetValue('saveFormMhshrm003', 'orgnztMngrEmpno', 'text'),
    			orgnztMngrEmpNm : gf_FormGetValue('saveFormMhshrm003', 'orgnztMngrEmpNm', 'text')
        };

        var dataSource = gf_NoAsyncTransaction('mhshrm003/saveMhshrm003', jsonParameter, 'POST');
        if(dataSource.code === '000') {
        	gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        	fn_SearchMhshrm003();
        } else {
        	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
        }
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrm003 = function() {
    var rowId = dhxGridMhshrm003.getSelectedRowId();
    
    if(gf_DhxGetValue(dhxGridMhshrm003, rowId, 'upperOrgnztCode',  'grid') == '0000' || gf_DhxGetValue(dhxGridMhshrm003, rowId, 'upperOrgnztCode',  'grid') == 'null'){
		gf_DivMsgAlert('부서는 삭제하실 수 없습니다.');
		return false;
    } else {
//    	dhxDataProcessorMhshrm003.setUpdated(rowId, true, 'deleted');
    	var result = false; 
    	fn_DivMsgConfirm2('삭제하시겠습니까?', function(confirm){ 
    	    if(confirm){ 
    	        result = true;
    	        fn_DeleteMhshrm003_Send();
    	    }else{ 
    	        result = false; 
    	    } 
    	}); 
    	return result; 
    } 
}
function fn_DeleteMhshrm003_Send(){
	var jsonParameter = {
			upperOrgnztCode : gf_FormGetValue('saveFormMhshrm003', 'orgnztCode', 'text'),
			orgnztCode : gf_FormGetValue('saveFormMhshrm003', 'orgnztCode', 'text')
        };
        var dataSource = gf_NoAsyncTransaction('mhshrm003/deleteCheckMhshrm003', jsonParameter, 'GET');
        var data = dataSource.data;
        
        if(dataSource.code === '000') {
            if(gf_IsNull(data.useCheck)) {
            	if(fn_GridValidation()) {
                	var jsonParameter = {
                			orgnztCode : gf_FormGetValue('saveFormMhshrm003', 'orgnztCode', 'text')
                    };

                    var dataSource = gf_NoAsyncTransaction('mhshrm003/deleteMhshrm003', jsonParameter, 'POST');
                    if(dataSource.code === '000') {
                    	gf_DivMsgAlert("삭제되었습니다.");
                    	fn_SearchMhshrm003();
                    } else {
                    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    }
            } else {
                return false;
            }
        } else {
        	gf_DivMsgAlert("하위조직이 존재하거나 사용중인 코드입니다.");
            return false;
        }
    } else {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrm003 = function () {
    var titMhshrm003 = '조직코드관리'; /* gf_LocaleTrans('default', 'titMhshrm003') */
    var jsonParameter = {
        orgnztCode : gf_FormGetValue('searchFormMhshrm003', 'orgnztCode', 'text')
    };
    var header = [[
        '조직코드' /* gf_LocaleTrans('default', 'titOrgnztCode') */,
        '부서코드' /* gf_LocaleTrans('default', 'titDeptCode') */,
        '상위 조직 코드' /* gf_LocaleTrans('default', 'titUpperOrgnztCode') */,
        '조직명' /* gf_LocaleTrans('default', 'titOrgnztNm') */,
        '조직 관리자 사원번호' /* gf_LocaleTrans('default', 'titOrgnztMngrEmpno') */,
        '조직 구분 코드(C097)' /* gf_LocaleTrans('default', 'titOrgnztSeCode') */,
        '조직계위(공통코드:C509) 결정권, 운영독립성에 의한 분류(본부, 센터, 부, 팀, ..)' /* gf_LocaleTrans('default', 'titOrgnztLvl') */,
        '사용시작일자' /* gf_LocaleTrans('default', 'titUseBeginDe') */,
        '사용종료일자' /* gf_LocaleTrans('default', 'titUseEndDe') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */
    ]];
    var dataId = [[ 'orgnztCode', 'deptCode', 'upperOrgnztCode', 'orgnztNm', 'orgnztMngrEmpno', 'orgnztSeCode', 'orgnztLvl', 'useBeginDe', 'useEndDe', 'useAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrm003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrm003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrm003/excelMhshrm003', jsonParameter);
};

/**
 * 조직코드 중복확인
 */
var fn_FindSameKey = function(){
	var orgnztCode = gf_FormGetValue('saveFormMhshrm003', 'orgnztCode', 'text')
	var mainDeptCode = gf_FormGetValue('saveFormMhshrm003', 'deptCode', 'text').substring(0, 2);
	var mainOrgzntCode = gf_FormGetValue('saveFormMhshrm003', 'orgnztCode', 'text').substring(0, 2);
	
	if(mainDeptCode != mainOrgzntCode){
		orgnztCodeDupCheck = false;
		gf_DivMsgAlert('부서코드의 앞 두자리가 일치해야합니다. ex)'+mainDeptCode+'NN', '#orgnztCodeSaveFormMhshrm003');
		gf_FormSetValue('saveFormMhshrm003', 'orgnztCode', mainDeptCode, 'text');
		return false;
	}

	if(orgnztCode.length < 4){
		orgnztCodeDupCheck = false;
		gf_DivMsgAlert('조직코드는 4자리 입니다.', '#orgnztCodeSaveFormMhshrm003');
		return false;
	}
	
	if(gf_IsNull(orgnztCode)) {
		orgnztCodeDupCheck = false;
		gf_DivMsgAlert('조직코드를 입력해 주세요.', '#orgnztCodeSaveFormMhshrm003');	 
//		$('#orgnztCodeSaveFormMhshrm003').focus();
		return false;
	}
	var jsonParameter = {
			orgnztCode : orgnztCode
	};
	var dataSource = gf_NoAsyncTransaction('mhshrm003/findMhshrm003', jsonParameter, 'GET');  			
	var data = dataSource.data;
	
	if(dataSource.code === '000') {
		if(gf_IsNull(data.orgnztCode)) {
			orgnztCodeDupCheck = true;
			gf_DivMsgAlert('등록 가능한 코드입니다.', '#orgnztNmSaveFormMhshrm003');
			$('#orgnztNmSaveFormMhshrm003').focus();
			return true;
		} else {
			orgnztCodeDupCheck = false;
			gf_DivMsgAlert('동일한 코드가 존재합니다.', '#orgnztCodeSaveFormMhshrm003');
			gf_FormSetValue('saveFormMhshrm003', 'orgnztCode', mainDeptCode, 'text');
			$('#orgnztCodeSaveFormMhshrm003').focus();
			return false;
		}
	} else {
		orgnztCodeDupCheck = false;
		gf_DivMsgAlert('중복확인이 되지 않습니다.', '#orgnztCodeSaveFormMhshrm003');
		return false;
	}
}
//--사원 검색이벤트
function fn_SearchEmpCode(){
	
	var jsonParameter = {
			empno     : gf_FormGetValue('saveFormMhshrm003', 'orgnztMngrEmpno', 'text'),
			korNm     : gf_FormGetValue('saveFormMhshrm003', 'orgnztMngrEmpNm', 'text'),
			bplcCode  : '1000'
	};
	gf_Transaction('', 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}
function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	console.log(totCnt);
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	    gf_FormSetValue('saveFormMhshrm003', 'orgnztMngrEmpno', data.empno, 'text');
	 	gf_FormSetValue('saveFormMhshrm003', 'orgnztMngrEmpNm', data.korNm, 'text');
 	}
  	else {
  		gf_EmpPopup("saveFormMhshrm003","orgnztMngrEmpnoSaveFormMhshrm003","orgnztMngrEmpNmSaveFormMhshrm003", '1000', "Y", "");
  	}
}
//--부서 입력 후 Enter 이벤트
function fn_SearchDeptCode(){
	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormMhshrm003', 'deptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormMhshrm003', 'korNm', 'text'),
			bplcCode : '1000'
	};
	gf_Transaction('list_type01', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchDeptCode', false, 'GET');
}
function fn_CallbackSearchDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhshrm003', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhshrm003', 'korNm', data.deptKorNm, 'text');
    } 
    else {
    	//Popup 호출
		gf_DeptPopup("searchFormMhshrm003","deptCodeSearchFormMhshrm003","korNmSearchFormMhshrm003", '1000', "Y", "");
    }
}
//달력 이벤트
function fn_Date(){
	//달력 생성
	var dhxCCalendarDateUseBegin = new dhtmlXCalendarObject({input:"useBeginDeSaveFormMhshrm003", button:"startDateIcon"});
	dhxCCalendarDateUseBegin.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	dhxCCalendarDateUseBegin.setDateFormat("%Y-%m-%d");
	

	var dhxCCalendarDateUseEnd = new dhtmlXCalendarObject({input:"useEndDeSaveFormMhshrm003", button:"startDateIcon"});
	dhxCCalendarDateUseEnd.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	dhxCCalendarDateUseEnd.setDateFormat("%Y-%m-%d");
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
 * 그리드 validation
 */
var fn_GridValidation = function(){
    var valid = true;
    
	var upperOrgnztCode = gf_FormGetValue('saveFormMhshrm003', 'upperOrgnztCode', 'text');
	var orgnztCode = gf_FormGetValue('saveFormMhshrm003', 'orgnztCode', 'text');
	var deptCode = gf_FormGetValue('saveFormMhshrm003', 'deptCode', 'text');
	var orgnztNm = gf_FormGetValue('saveFormMhshrm003', 'orgnztNm', 'text');
	var orgnztSeCode = gf_FormGetValue('saveFormMhshrm003', 'orgnztSeCode', 'combo');
	var useBeginDe = gf_FormGetValue('saveFormMhshrm003', 'useBeginDe', 'text');
	var useAt = gf_FormGetValue('saveFormMhshrm002', 'useAt', 'chkbox') ? '0' : '1'
	var regId = gf_FormGetValue('saveFormMhshrm003', 'regId', 'text');
	console.log(regId);

    if($('#saveFormMhshrm003').validate().form()){    
    	
		if(gf_IsNull(regId)){
			if(valid && upperOrgnztCode == '0000'){
		    	gf_errorMsgClear();
		        gf_DivMsgAlert("부서는 추가할 수 없습니다.");
				valid = false;
		    }
		}
	
		if(!orgnztCodeDupCheck){
			gf_DivMsgAlert('중복확인이 필요합니다', '#orgnztCodeSaveFormMhshrm003');
			valid = false;
		}
		
		if(valid && !gv_ValidateMethods.required( upperOrgnztCode )){
	        valid = false;
	    }
		if(valid && !gv_ValidateMethods.required( orgnztCode )){
	        valid = false;
	    }
		if(valid && !gv_ValidateMethods.required( orgnztNm )){
	        valid = false;
	    }
		if(valid && !gv_ValidateMethods.required( orgnztSeCode )){
	        valid = false;
	    }
		if(valid && !gv_ValidateMethods.required( useBeginDe )){
	        valid = false;
	    }
		if(valid && useAt=='0'){
			if(gf_IsNull(gf_FormGetValue('saveFormMhshrm003', 'useEndDe', 'text'))){
		        gf_DivMsgAlert("미사용시 사용종료일자는 필수입니다.", "#useEndDeSaveFormMhshrm003");
				valid = false;
			} else {
				if(gf_FormGetValue('saveFormMhshrm003', 'useEndDe', 'text').replaceAll('-','')<gf_FormGetValue('saveFormMhshrm003', 'useBeginDe', 'text').replaceAll('-','')){
					gf_DivMsgAlert("종료일자가 사용일자보다 앞설 수 없습니다.", "#useEndDeSaveFormMhshrm003");
			        gf_FormSetValue('saveFormMhshrm003', 'useEndDe', '', 'text');
					valid = false;
				}
			}
		}
	    
	    if(valid) return true;
	    else return false;
    }
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
