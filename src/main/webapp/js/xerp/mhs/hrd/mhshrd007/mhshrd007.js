/**
 *    프로그램       : 근태기준설정 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.31
 *    사용테이블      : MHS_DCLZBASSSETTING
 * sourceGen version : 2020.07.16.01 (2020.08.31)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrd007 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrd007 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrd007 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrd007 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrd007 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrd007 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrd007 = 0;  //그리드 삭제 수량 
var dhxGridMhshrd007;  //그리드 객체
var eventIdMhshrd007 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrd007;  //DataProcessor 객체
 
var firstSelectRow;
var checkUpdate = false;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrd007();
    if(cf_SetComponentsMhshrd007()){
       cf_SetEventListenerMhshrd007();
       cf_InitFormMhshrd007();
       cf_SetBindingMhshrd007();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrd007 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrd007").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsMhshrd007 = function() {
    var dhxGridMhshrd007HeaderInfo = [];
    dhxGridMhshrd007HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrd007HeaderInfo.push(gf_MakeDhxGridHeader('사원구분', '80', 'center', 'str', 'coro', false, 'laborSe', '', '')); /* gf_LocaleTrans('default', 'titLaborSe') */
    dhxGridMhshrd007HeaderInfo.push(gf_MakeDhxGridHeader('연봉\n구분', '50', 'center', 'str', 'coro', false, 'salarySe', '', '')); /* gf_LocaleTrans('default', 'titSalarySe') */
    dhxGridMhshrd007HeaderInfo.push(gf_MakeDhxGridHeader('귀속\n구분', '50', 'center', 'str', 'coro', false, 'rversSe', '', '')); /* gf_LocaleTrans('default', 'titRversSe') */
    dhxGridMhshrd007HeaderInfo.push(gf_MakeDhxGridHeader('근무유형', '*', 'left', 'str', 'coro', false, 'workTyCode', '', '')); /* gf_LocaleTrans('default', 'titWorkTyCode') */
    dhxGridMhshrd007HeaderInfo.push(gf_MakeDhxGridHeader('시작일', '60', 'center', 'str', 'edn', false, 'beginDe', '', '')); /* gf_LocaleTrans('default', 'titBeginDe') */
    dhxGridMhshrd007HeaderInfo.push(gf_MakeDhxGridHeader('사용\n여부', '50', 'center', 'na', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMhshrd007 = gf_MakeDhxGrid('dataListMhshrd007', dhxGridMhshrd007HeaderInfo, true, false, false);
    dhxGridMhshrd007.enableAutoWidth(false);
    dhxGridMhshrd007.setEditable(true);

    dhxGridMhshrd007.setColumnMinWidth(50,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
  //사원구분코드
    var jsonParameter1 = {codekindCode : "C068",exceptCode :"",sortOrder :"ordr" };  
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter1, '');
    gf_ComboDataSet(dhxGridMhshrd007, dhxGridMhshrd007.getColIndexById("laborSe"), dataSource.data, "sel"); /* 그리드콤보*/
    
    //연봉구분코드
    var jsonParameter2 = {codekindCode : "C365",exceptCode :"",sortOrder :"ordr" };  
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter2, '');
    gf_ComboDataSet(dhxGridMhshrd007, dhxGridMhshrd007.getColIndexById("salarySe"), dataSource.data, "sel"); /* 그리드콤보*/
    
  //귀속구분코드
    var jsonParameter3 = {codekindCode : "C176",exceptCode :"",sortOrder :"ordr" };  
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter3, '');
    gf_ComboDataSet(dhxGridMhshrd007, dhxGridMhshrd007.getColIndexById("rversSe"), dataSource.data, "sel"); /* 그리드콤보*/
    
  //근무 유형 구분 코드
    var WorkTyCombo = dhxGridMhshrd007.getCombo(4);
	gf_MakeComboGrid(WorkTyCombo, 'sel', 'mhshrd007/selectMhshrd007WorkTyCode', 'workTyCode', 'workTyCodeNm', '');
    
    return true; 
};

var cf_SetEventListenerMhshrd007 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrd007 = gf_GridDetachEvent(dhxGridMhshrd007, eventIdMhshrd007);
    eventId = dhxGridMhshrd007.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrd007();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrd007.getColumnsNum();
            var rowNum = dhxGridMhshrd007.getRowsNum();
            var selectedId = dhxGridMhshrd007.getSelectedRowId();
            var ind        = dhxGridMhshrd007.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd007.getRowIndex(selectedId);
            var type       = dhxGridMhshrd007.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrd007.selectRow(0);
                    //fn_FindMhshrd007();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrd007.selectRow(rowIndex + 1);
                    fn_FindMhshrd007();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrd007.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd007.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrd007.getSelectedRowId();
            var ind        = dhxGridMhshrd007.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd007.getRowIndex(selectedId);
            var type       = dhxGridMhshrd007.getColType(ind);
            dhxGridMhshrd007.selectCell(rowIndex+1, ind);
            fn_FindMhshrd007();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd007.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrd007.getSelectedRowId();
            var ind        = dhxGridMhshrd007.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd007.getRowIndex(selectedId);
            var type       = dhxGridMhshrd007.getColType(ind);
            dhxGridMhshrd007.selectCell(rowIndex-1, ind);
            fn_FindMhshrd007();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd007.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrd007.push(eventId);
    eventId = dhxGridMhshrd007.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrd007SortGridList(ind, type, direction); 
    });
    eventIdMhshrd007.push(eventId);
    eventId = dhxGridMhshrd007.attachEvent("onBeforeSelect", function(id, ind){
    	console.log('ttt');
        return true;
    });
    eventIdMhshrd007.push(eventId);
    eventId = dhxGridMhshrd007.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        if(firstSelectRow == id){
        	return false;
        } else {
            if(gf_FormGetValue('saveFormMhshrd007', 'splitItem0', 'text') != gf_FormGetValue('saveFormMhshrd007', 'hideSplitItem0', 'text')) checkUpdate = true;
            if(gf_FormGetValue('saveFormMhshrd007', 'itemCode1', 'combo') != gf_FormGetValue('saveFormMhshrd007', 'hideItemCode1', 'combo')) checkUpdate = true;
            if(gf_FormGetValue('saveFormMhshrd007', 'itemCode2', 'combo') != gf_FormGetValue('saveFormMhshrd007', 'hideItemCode2', 'combo')) checkUpdate = true;
            if(gf_FormGetValue('saveFormMhshrd007', 'splitItem2', 'text') != gf_FormGetValue('saveFormMhshrd007', 'hideSplitItem2', 'text')) checkUpdate = true;
            if(gf_FormGetValue('saveFormMhshrd007', 'itemCode4', 'combo') != gf_FormGetValue('saveFormMhshrd007', 'hideItemCode4', 'combo')) checkUpdate = true;
            if(gf_FormGetValue('saveFormMhshrd007', 'itemCode5', 'combo') != gf_FormGetValue('saveFormMhshrd007', 'hideItemCode5', 'combo')) checkUpdate = true;
            
            if(checkUpdate){
            	console.log('id : ' + id);
            	console.log('firstSelectRow : ' + firstSelectRow);
            	gf_DivMsgConfirm('수정된 내용이 삭제됩니다.',
            		function(){ fn_FindMhshrd007()},
    				function(){ return false;;
            	});
            } else {
            	changeRow = true;
            	fn_FindMhshrd007();
            }
        }
        dhxGridMhshrd007.selectRow(Number(firstSelectRow));
        return false;
    });
    eventIdMhshrd007.push(eventId);
    eventId = dhxGridMhshrd007.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhshrd007.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrd007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrd007()
    });
    $('#btnSaveMhshrd007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrd007();
    });
    $('#btnRemoveMhshrd007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrd007();
    });
    $('#btnExcelMhshrd007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrd007();
    });
    $('#btnSearchMhshrd007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrd007('');
    });
    $('#btnResetMhshrd007').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrd007();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhshrd007 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrd007').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrd007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrd007 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhshrd007",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhshrd007 = function() {
    $('#searchFormMhshrd007').resetForm();
};

var cf_SetBindingMhshrd007 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhshrd007('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
function fn_ChangeRow(check){
	if(check){
		fn_FindMhshrd007();
		return true;
	} else {
		dhxGridMhshrd007.selectRow(firstSelectRow);
		return false;
	}
}
/**
 * 조회
 */
var fn_SearchMhshrd007 = function(userId) {
    var jsonParameter = {
        laborSe : gf_FormGetValue('searchFormMhshrd007', 'laborSe', 'text'),
        salarySe : gf_FormGetValue('searchFormMhshrd007', 'salarySe', 'text')
    };
    gf_Transaction(userId, 'mhshrd007/searchMhshrd007', jsonParameter, 'fn_CallbackSearchMhshrd007', false, 'GET');
};

var fn_CallbackSearchMhshrd007 = function(strSvcID, targetID, data) {
    //dhxGridMhshrd007.clearAll();
    dhxGridMhshrd007.destructor();
    if(cf_SetComponentsMhshrd007()){ 
        fn_DhxDataProcessorMhshrd007(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrd007');
            dhxGridMhshrd007.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrd007 == 0 && save_All_Sta_Mhshrd007 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrd007.selectRow(0); 
            } else if(save_Row_Sta_Mhshrd007 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrd007.selectRow(0);
            } else if(save_All_Sta_Mhshrd007 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrd007.selectRow(save_Row_Num_Mhshrd007); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrd007.selectRow(save_Row_Num_Mhshrd007);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrd007.findCell(save_Row_Ids_Mhshrd007, gf_GetDhxGridColumId(dhxGridMhshrd007,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrd007.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrd007.selectRow(0);
                //} 
            } 
 
            fn_FindMhshrd007();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrd007');
            fn_InitInputFormMhshrd007();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhshrd007").text(data.data.records.length);
        cf_SetEventListenerMhshrd007();
    } 
};
var fn_DhxDataProcessorMhshrd007 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrd007 = new dataProcessor(gv_ContextPath+'/mhshrd007/saveMhshrd007'); //lock feed url
    dhxDataProcessorMhshrd007.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrd007.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrd007.init(dhxGridMhshrd007); //link dataprocessor to the grid
    dhxDataProcessorMhshrd007.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrd007.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrd007.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrd007();
                    $("#checkAllMhshrd007").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhshrd007 = function() {
    var rId = dhxGridMhshrd007.getSelectedRowId();
    var status = dhxDataProcessorMhshrd007.getState(rId);
    
    firstSelectRow = rId;
    
    var laborSe = gf_DhxGetValue(dhxGridMhshrd007, rId, 'laborSe',  'grid')
    var salarySe = gf_DhxGetValue(dhxGridMhshrd007, rId, 'salarySe',  'grid')
    
    if(!gf_IsNull(laborSe) && !gf_IsNull(salarySe)){
    	var jsonParameter = {
    	    laborSe : gf_DhxGetValue(dhxGridMhshrd007, rId, 'laborSe',  'grid'),
    	    salarySe : gf_DhxGetValue(dhxGridMhshrd007, rId, 'salarySe',  'grid')
    	};
        gf_Transaction('', 'mhshrd007/searchStandardMhshrd007', jsonParameter, 'fn_FindSubMhshrd007', false, 'GET');

    } else {
		fn_InitInputFormMhshrd007();
	    fn_FormDisabled(true);
    }
};
var fn_FindSubMhshrd007 = function(strSvcID, targetID, data){
	fn_FormDisabled(false);
	$(data.data.records).each(function (idx, item){
		document.getElementById('sn'+[idx]+'SaveFormMhshrd007').innerText=item.sn;
		document.getElementById('stdrNm'+[idx]+'SaveFormMhshrd007').innerText=item.stdrNm;
		if(item.itemCode != null && item.itemCode != ""){
			gf_FormSetValue("saveFormMhshrd007", "itemCode"+[idx], item.itemCode, 'combo');
	        gf_FormSetValue("saveFormMhshrd007", "hideItemCode"+[idx], item.itemCode, 'combo');
	        $('#saveFormMhshrd007 select[name="itemCode'+[idx]+'"]').prop('disabled', false);
		} else {
			gf_FormSetValue("saveFormMhshrd007", "itemCode"+[idx], '', 'combo');
	        gf_FormSetValue("saveFormMhshrd007", "hideItemCode"+[idx], '', 'combo');
	        $('#saveFormMhshrd007 select[name="itemCode'+[idx]+'"]').prop('disabled', true);
		}
		if (item.splitItem != null && item.splitItem != "") {
			gf_FormSetValue("saveFormMhshrd007", "splitItem" + [idx], item.splitItem, '');
			gf_FormSetValue("saveFormMhshrd007", "hideSplitItem" + [idx], item.splitItem, '');
			$('#saveFormMhshrd007 input[name="splitItem'+[idx]+'"]').prop('readonly', false);
			
		} else {
			gf_FormSetValue("saveFormMhshrd007", "splitItem"+[idx], '미사용', '');
			gf_FormSetValue("saveFormMhshrd007", "hideSplitItem"+[idx], '미사용', '');
			$('#saveFormMhshrd007 input[name="splitItem'+[idx]+'"]').prop('readonly', true);
		}
		document.getElementById('rm'+[idx]+'SaveFormMhshrd007').innerText=item.rm;
	});
}



/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrd007 = function() {
    $('#saveFormMhshrd007 input[name="laborSe"]').prop('disabled', false);
    $('#saveFormMhshrd007 input[name="salarySe"]').prop('disabled', false);
    $('#saveFormMhshrd007').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhshrd007 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhshrd007 = function() {
    dhxGridMhshrd007.clearSelection();
    fn_InitInputFormMhshrd007();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //laborSe
    initValueArr.push(''); //salarySe
    initValueArr.push(''); //rversSe
    initValueArr.push(''); //workTyCode
    initValueArr.push(''); //beginDe
    initValueArr.push(''); //useAt
    dhxGridMhshrd007.addRow(dhxGridMhshrd007.uid(), initValueArr, 0);
    dhxGridMhshrd007.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrd007');
    $('#btnPopEmpSearchMhshrd007').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrd007SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrd007, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrd007', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrd007', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrd007, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrd007.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrd007', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrd007', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd007, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrd007.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrd007', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrd007', 'sortColumId', '', 'text'); 
            dhxGridMhshrd007.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrd007.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrd007', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrd007', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd007, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrd007 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrd007 = 0; 
    save_Edt_Cnt_Mhshrd007 = 0; 
    save_Del_Cnt_Mhshrd007 = 0; 
    dhxGridMhshrd007.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrd007.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrd007.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrd007 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrd007 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrd007 += 1; 
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
        save_All_Sta_Mhshrd007 = 0; 
        if(save_Add_Cnt_Mhshrd007 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrd007 + "건";
            save_All_Sta_Mhshrd007 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrd007 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrd007 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrd007 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrd007 + "건"; 
            save_All_Sta_Mhshrd007 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrd007(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrd007(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrd007 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrd007_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrd007_Send = function() {
    if(fn_GridValidation(dhxGridMhshrd007, dhxDataProcessorMhshrd007)) {
        dhxDataProcessorMhshrd007.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrd007 = function() {
    var rowId = dhxGridMhshrd007.getSelectedRowId();
    var state = dhxDataProcessorMhshrd007.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMhshrd007.getRowIndex(rowId);
        dhxGridMhshrd007.deleteRow(rowId);
        dhxGridMhshrd007.selectRow(rowNum);
        fn_FindMhshrd007();
    }
    else dhxDataProcessorMhshrd007.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrd007 = function () {
    var titMhshrd007 = '근태기준설정'; /* gf_LocaleTrans('default', 'titMhshrd007') */
    var jsonParameter = {
        laborSe : gf_FormGetValue('searchFormMhshrd007', 'laborSe', 'text'),
        salarySe : gf_FormGetValue('searchFormMhshrd007', 'salarySe', 'text')
    };
    var header = [[
        '고용구분(사원구분) 상용직, 일용직  C068' /* gf_LocaleTrans('default', 'titLaborSe') */,
        '급여구분(연봉/호봉)  연봉제,월급제   C365' /* gf_LocaleTrans('default', 'titSalarySe') */,
        '귀속구분(전월/금월)  C176' /* gf_LocaleTrans('default', 'titRversSe') */,
        '기본 근무 유형 코드 - MHS_WORKTY 의 WORK_TY_CODE' /* gf_LocaleTrans('default', 'titWorkTyCode') */,
        '시작일' /* gf_LocaleTrans('default', 'titBeginDe') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */
    ]];
    var dataId = [[ 'laborSe', 'salarySe', 'rversSe', 'workTyCode', 'beginDe', 'useAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrd007 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrd007;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrd007/excelMhshrd007', jsonParameter);
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
    $('#saveFormMhshrd007 #laborSeSaveFormMhshrd007').parent().append(
    '<div class="error" id="laborSeSaveFormMhshrd007-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshrd007 #salarySeSaveFormMhshrd007').parent().append(
    '<div class="error" id="salarySeSaveFormMhshrd007-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrd007 = function(laborSe, salarySe){
    if(!gf_IsNull(laborSe) && !gf_IsNull(salarySe)) {
        var jsonParameter = {
            laborSe : laborSe,
            salarySe : salarySe
        };
        var dataSource = gf_NoAsyncTransaction('mhshrd007/findMhshrd007', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.laborSe) && gf_IsNull(data.salarySe)) {
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
    var state = dhxDataProcessorMhshrd007.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshrd007').validate().form()){
                if(state == 'inserted') {
                    var laborSe = gf_FormGetValue('saveFormMhshrd007', 'laborSe', 'text');
                    var salarySe = gf_FormGetValue('saveFormMhshrd007', 'salarySe', 'text');
                    if(fn_CheckDupMhshrd007(laborSe, salarySe)) return true;
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
    var checkLaborSe;
    var checkSalarySe;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrd007 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshrd007 == 'deleted') {
        save_Row_Num_Mhshrd007 = 0;
        save_Row_Ids_Mhshrd007 = "";
    } else if(save_Row_Sta_Mhshrd007 == 'inserted') {
        save_Row_Num_Mhshrd007 = rowNum;
        save_Row_Ids_Mhshrd007 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrd007 = rowNum;
        save_Row_Ids_Mhshrd007 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'laborSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'laborSe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'salarySe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarySe');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkLaborSe = gf_DhxGetValue(dhxGridObjet, rowId, 'laborSe', 'grid');
                    checkSalarySe = gf_DhxGetValue(dhxGridObjet, rowId, 'salarySe', 'grid');
                    if(!gf_IsNull(checkLaborSe, checkSalarySe)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var laborSe = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'laborSe', 'grid');
                            var salarySe = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'salarySe', 'grid');
                            if(((laborSe == checkLaborSe) && (salarySe == checkSalarySe)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'laborSe');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarySe');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrd007( checkLaborSe, checkSalarySe )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'laborSe');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'salarySe');
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
        dhxGridMhshrd007.selectRowById(validFalseFistRowId);
        fn_FindMhshrd007();
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
