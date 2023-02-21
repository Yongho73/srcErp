/**
 *    프로그램         	: 양식관리 관리 화면 javascript
 *    작성자  			: 디비비전
 *    작성일자          	: 2021.03.18
 *    사용테이블        	: SGN_DOC_RAIS
 * sourceGen version 	: 2021.02.18.01 (2021.03.18)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var save_Row_Num_Etsfmg000 = 0;      //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Etsfmg000 = 0;      //그리드 위치 상태 
var save_All_Sta_Etsfmg000 = 0;      //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Etsfmg000 = "";     //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Val_Etsfmg000 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Etsfmg000 = 0;      //그리드 추가 수량 
var save_Edt_Cnt_Etsfmg000 = 0;      //그리드 저장 수량 
var save_Del_Cnt_Etsfmg000 = 0;      //그리드 삭제 수량 
var dhxGridEtsfmg000;                //그리드 객체
var eventIdEtsfmg000 = [];           //그리드 이벤트 객체 
var dhxDataProcessorEtsfmg000;       //DataProcessor 객체 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamEtsfmg000();
    if(cf_SetComponentsEtsfmg000()){
       cf_SetEventListenerEtsfmg000();
       cf_InitFormEtsfmg000();
       cf_SetBindingEtsfmg000();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamEtsfmg000 = function() {
    gf_SetMenuPath();
    $("#saveFormEtsfmg000").validate({ errorElement: 'div', ignore: '' });	             
	gf_ComboCode('divDocClsCodeSaveFormEtsfmg000', 'docClsCodeSaveFormEtsfmg000', 'docCls', 'add', 'EA008', '' , '', '', '', 'required'); // 문서분류
    gf_ComboCode('divPrsrvTmlmtCodeSaveFormEtsfmg000', 'prsrvTmlmtCodeSaveFormEtsfmg000', 'prsrvTmlmtCode', 'add', 'EA010', '' , '', '', '', 'required'); // 문서보존기간
};

var cf_SetComponentsEtsfmg000 = function() {
    var dhxGridEtsfmg000HeaderInfo = [];
    dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllEtsfmg000" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('양식번호', '140', 'left', 'str', 'ro', true, 'raisNo', '', '')); /* gf_LocaleTrans('default', 'titRaisNo') */
	dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('문서분류', '100', 'center', 'str', 'coro', false, 'docClsCode', '', '')); /* gf_LocaleTrans('default', 'titDocClsCode') */    
    dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('양식명', '*', 'left', 'str', 'ro', false, 'raisnm', '', '')); /* gf_LocaleTrans('default', 'titRaisnm') */
    dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'useAtro', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */    
	dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('양식html', '0', 'center', 'str', 'ro', true, 'raisHtml', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
	dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('한글양식파일', '0', 'center', 'str', 'ro', true, 'atchmnfl', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */            
	dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('보존기간', '0', 'center', 'str', 'ro', true, 'prsrvTmlmtCode', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */            
	dhxGridEtsfmg000HeaderInfo.push(gf_MakeDhxGridHeader('기안기구분', '0', 'center', 'str', 'ro', true, 'webDrftAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */            
    dhxGridEtsfmg000 = gf_MakeDhxGrid('dataListEtsfmg000', dhxGridEtsfmg000HeaderInfo, true, false, false);
    dhxGridEtsfmg000.enableAutoWidth(false);
    dhxGridEtsfmg000.setEditable(true);
	//dhxGridEtsfmg000.enableDragAndDrop(true);
	dhxGridEtsfmg000.enableColumnMove(true);
    dhxGridEtsfmg000.setColumnMinWidth(40,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
	//그리드 문서분류콤보
	var jsonParameter = {codekindCode : "EA008",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridEtsfmg000, dhxGridEtsfmg000.getColIndexById("docClsCode"), dataSource.data);
    return true; 
};

var cf_SetEventListenerEtsfmg000 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdEtsfmg000 = gf_GridDetachEvent(dhxGridEtsfmg000, eventIdEtsfmg000);
    eventId = dhxGridEtsfmg000.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelEtsfmg000();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridEtsfmg000.getColumnsNum();
            var rowNum = dhxGridEtsfmg000.getRowsNum();
            var selectedId = dhxGridEtsfmg000.getSelectedRowId();
            var ind        = dhxGridEtsfmg000.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridEtsfmg000.selectRow(0);
                    //fn_FindEtsfmg000();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridEtsfmg000.selectRow(rowIndex + 1);
                    fn_FindEtsfmg000();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridEtsfmg000.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridEtsfmg000.getSelectedRowId();
            var ind        = dhxGridEtsfmg000.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000.getColType(ind);
            dhxGridEtsfmg000.selectCell(rowIndex+1, ind);
            fn_FindEtsfmg000();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridEtsfmg000.getSelectedRowId();
            var ind        = dhxGridEtsfmg000.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000.getColType(ind);
            dhxGridEtsfmg000.selectCell(rowIndex-1, ind);
            fn_FindEtsfmg000();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000.editCell();
            }
        }
        else return true;
    });
    eventIdEtsfmg000.push(eventId);
    eventId = dhxGridEtsfmg000.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return true;
    });
    eventIdEtsfmg000.push(eventId);
    eventId = dhxGridEtsfmg000.attachEvent("onBeforeSelect", function(id, ind){
       	var selectedId = dhxGridEtsfmg000.getSelectedRowId();
		if(selectedId == id) {			
			return true;
		} else {
			if(fn_UpdateCheckEtsfmg000()) return false;
			else return true;	
		}
		
    });
    eventIdEtsfmg000.push(eventId);
    eventId = dhxGridEtsfmg000.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindEtsfmg000();
    });
    eventIdEtsfmg000.push(eventId);
    eventId = dhxGridEtsfmg000.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdEtsfmg000.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddEtsfmg000').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddEtsfmg000()
    });
    $('#btnSaveEtsfmg000').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveEtsfmg000();
    });
    $('#btnRemoveEtsfmg000').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveEtsfmg000();
    });
    $('#btnExcelEtsfmg000').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelEtsfmg000();
    });
    $('#btnSearchEtsfmg000').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchEtsfmg000('');
    });
    $('#btnResetEtsfmg000').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormEtsfmg000();
    });
	$('#btnFileUploadSaveFormEtsfmg000').unbind('click').bind('click', function() {
    	gf_FileUploadPopup(
				'', 	/* eventFunction */
				'', 	/* deleteBtnClassNm */
				'saveFormEtsfmg000', 	        /* viewDivId */
				'atchmnflSaveFormEtsfmg000', 	/* dataDivId */
				[], 	/* keyArr */
				[], 	/* infoArr */
				1,      /* upload file number */
			    'hwp',
		        'fn_CallbackFileUploadSaveFormEtsfmg000');    	
    }); 
 	$('#btnPreViewRaisHtmlSaveFormEtsfmg000').unbind('click').bind('click', function() {
    	fn_PreViewHtmlEtsfmg000();
    }); 
    // 기타 이벤트 ==========================================================================================
    $('#checkAllEtsfmg000').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var nRows =dhxGridEtsfmg000.getRowsNum();
        for(var i = 0; i <nRows; i++) {
            dhxGridEtsfmg000.selectRow(i);
        }
        gf_DhxCheckAllGridHeader(dhxGridEtsfmg000, $('#checkAllEtsfmg000').prop('checked'), 'chk');
    });
    $('#searchFormEtsfmg000 input, select, button').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchEtsfmg000').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormEtsfmg000').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormEtsfmg000 input, select, button').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormEtsfmg000",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormEtsfmg000 select[name="docCls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();		
		if(!gf_IsNull($(this).val())) gf_DhxGridCellMapping(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000, 'docClsCode', $(this).val());		
    });
    $('#saveFormEtsfmg000 input[name="raisnm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if(!gf_IsNull($(this).val())) gf_DhxGridCellMapping(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000, 'raisnm', $(this).val());
    });     
    $('#saveFormEtsfmg000 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();    	 
    	var useAt = gf_FormGetValue('saveFormEtsfmg000', 'useAt', 'chkboxYN');
		if(!gf_IsNull(useAt)) gf_DhxGridCellMapping(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000, 'useAt', gf_FormGetValue('saveFormEtsfmg000', 'useAt', 'chkboxYN'));
    });
	$('#saveFormEtsfmg000 textarea[name="raisHtml"]').unbind('keyup').bind('keyup',function() {
    	gf_errorMsgClear();    	 
    	if(!gf_IsNull($(this).val())) gf_DhxGridCellMapping(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000, 'raisHtml', $(this).val().trim());
    });
	$('#saveFormEtsfmg000 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
		if(!gf_IsNull($(this).val())) gf_DhxGridCellMapping(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000, 'atchmnfl', $(this).val());
    });
	$('#saveFormEtsfmg000 select[name="prsrvTmlmtCode"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
		if(!gf_IsNull($(this).val())) gf_DhxGridCellMapping(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000, 'prsrvTmlmtCode', $(this).val());
    });
	$('#saveFormEtsfmg000 input[name="webDrftAt"]').unbind('change blur').bind('change blur',function() {
    	gf_errorMsgClear();
		var webDrftAt = gf_FormGetValue('saveFormEtsfmg000', 'webDrftAt', 'radio');	 
		gf_Trace(webDrftAt);
    	if(!gf_IsNull(webDrftAt)) gf_DhxGridCellMapping(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000, 'webDrftAt', webDrftAt);
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormEtsfmg000 = function() {
    $('#searchFormEtsfmg000').resetForm();
    gf_SetDataAuthorSe();
};

var cf_SetBindingEtsfmg000 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchEtsfmg000('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchEtsfmg000 = function(raisNo) {
    var jsonParameter = {
        raisNo : gf_FormGetValue('searchFormEtsfmg000', 'raisNo', 'text'),
		raisnm : gf_FormGetValue('searchFormEtsfmg000', 'raisnm', 'text')
    };
    gf_Transaction(raisNo, 'etsfmg000/searchEtsfmg000', jsonParameter, 'fn_CallbackSearchEtsfmg000', false, 'GET');
};
var fn_CallbackSearchEtsfmg000 = function(strSvcID, targetID, data) {
    dhxGridEtsfmg000.destructor();
    if(cf_SetComponentsEtsfmg000()){ 
        fn_DhxDataProcessorEtsfmg000(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListEtsfmg000');
            dhxGridEtsfmg000.parse(data.data.records, 'js');
            if(save_Row_Num_Etsfmg000 == 0 && save_All_Sta_Etsfmg000 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridEtsfmg000.selectRow(0); 
            } else if(save_Row_Sta_Etsfmg000 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridEtsfmg000.selectRow(0);
            } else if(save_All_Sta_Etsfmg000 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridEtsfmg000.selectRow(save_Row_Num_Etsfmg000); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함   
                save_Row_Val_Etsfmg000 = strSvcID;
				var findCell = dhxGridEtsfmg000.findCell(save_Row_Val_Etsfmg000, gf_GetDhxGridColumId(dhxGridEtsfmg000,'raisNo'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                if(!gf_IsNull(findCell)) { 
                    dhxGridEtsfmg000.selectRowById(findCell[0][0]); 
                } else { 
                    dhxGridEtsfmg000.selectRow(0);
                } 
            }
            fn_FindEtsfmg000();
        } else {
            gf_NoFoundDataOnGridMsg('dataListEtsfmg000');
            fn_InitInputFormEtsfmg000();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormEtsfmg000").text(data.data.records.length);
        cf_SetEventListenerEtsfmg000();
    } 
};
/**
 * 데이터프로세스 정의 (커스터마이징타입)
 */
var fn_DhxDataProcessorEtsfmg000 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorEtsfmg000 = new dataProcessor(gv_ContextPath+'/etsfmg000/saveEtsfmg000'); //lock feed url
    dhxDataProcessorEtsfmg000.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorEtsfmg000.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorEtsfmg000.init(dhxGridEtsfmg000); //link dataprocessor to the grid
    dhxDataProcessorEtsfmg000.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorEtsfmg000.styles = {
                    updated:        "font-weight:normal; text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal; text-decoration:none;"
    };     
};
/**
 * 상세조회
 */
var fn_FindEtsfmg000 = function() {	
	var raisNo = dhxGridEtsfmg000.cells(dhxGridEtsfmg000.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridEtsfmg000,'raisNo')).getValue();	
    var dataSource;
	if (!gf_IsNull(raisNo)) {
        var jsonParameter = {
            raisNo : raisNo
        };
       	dataSource = gf_NoAsyncTransaction('etsfmg000/findEtsfmg000', jsonParameter, 'GET');		
        var data = dataSource.data;
        gf_FormSetValue('saveFormEtsfmg000', 'docCls', data.docClsCode, 'combo');
        gf_FormSetValue('saveFormEtsfmg000', 'raisnm', data.raisnm, 'text');
        gf_FormSetValue('saveFormEtsfmg000', 'webDrftAt', data.webDrftAt, 'radio');
        gf_FormSetValue('saveFormEtsfmg000', 'raisHtml', data.raisHtml, 'textarea');        
        fn_SearchFileUploadSaveFormEtsfmg000(data.atchmnfl,'saveFormEtsfmg000','atchmnflSaveFormEtsfmg000');        
        gf_FormSetValue('saveFormEtsfmg000', 'useAt', (( data.useAt  == '1') ? true : false),  'chkbox');
        gf_FormSetValue('saveFormEtsfmg000', 'prsrvTmlmtCode', data.prsrvTmlmtCode, 'combo');
		fn_FormDisabled(false);
  	}	
	fn_CallbackSearchEtsfmg000Item('', '', dataSource);
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormEtsfmg000 = function() {
	fn_ClearFileUploadSaveFormEtsfmg000('saveFormEtsfmg000','atchmnflSaveFormEtsfmg000');
	$('#saveFormEtsfmg000').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormEtsfmg000 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddEtsfmg000 = function() {    
	if(!fn_UpdateCheckEtsfmg000()) {
		dhxGridEtsfmg000.clearSelection();
	    fn_InitInputFormEtsfmg000();
	    var initValueArr = [];
	    initValueArr.push(''); //no
	    initValueArr.push(''); //checkbox
	    initValueArr.push(''); //raisNo
	    initValueArr.push(''); //docClsCode
	    initValueArr.push(''); //raisnm
	    initValueArr.push('0'); //useAt
	    initValueArr.push(''); //raisHtml
	    initValueArr.push(''); //atchmnfl
	    initValueArr.push(''); //prsrvTmlmtCode
	    initValueArr.push('1'); //webDrftAt
	    dhxGridEtsfmg000.addRow(dhxGridEtsfmg000.uid(), initValueArr, 0);
	    dhxGridEtsfmg000.selectRow(0);		
		fn_CallbackSearchEtsfmg000Item('', '', null);
		gf_NoFoundDataOnGridMsgRemove('dataListEtsfmg000');	    
	    fn_FormDisabled(false);
	}
}
/**
 * 수정 그리드 확인
 */
var fn_UpdateCheckEtsfmg000 = function(){
	var edCnt = 0;
	var rowIds = dhxGridEtsfmg000.getSelectedRowId();
	if(gf_IsNull(rowIds)) return false;
	dhxGridEtsfmg000.forEachRow(function(rowId) {        
		if(!gf_IsNull(dhxDataProcessorEtsfmg000.getState(rowId))) edCnt++;        
    });
	var ret = (edCnt == 0) ? false : true; 
	if(ret) gf_DivMsgAlert("변경된 정보가 있습니다.<br/>우선 변경된 내용을 저장해 주세요.");
    return ret;     
}
/**
 * 입력데이터 서버 전송
 */
var fn_SaveEtsfmg000 = function() {	
    
	dhxGridEtsfmg000Item.editStop();
 	dhxGridEtsfmg000SubItem.editStop();

	var edCnt = 0;
    save_Add_Cnt_Etsfmg000 = 0; 
    save_Edt_Cnt_Etsfmg000 = 0; 
    save_Del_Cnt_Etsfmg000 = 0; 
    dhxGridEtsfmg000.forEachRow(function(rowId) {        
		if(!gf_IsNull(dhxDataProcessorEtsfmg000.getState(rowId))) {
            edCnt++;        
            var state = dhxDataProcessorEtsfmg000.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Etsfmg000 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Etsfmg000 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Etsfmg000 += 1; 
            } 
        }
    });
	
	console.log(edCnt);
	
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {		
		// 서브 그리드(양식항목) 벨리데이션 체크
		if(!fn_GridValidationEtsfmg000Item(dhxGridEtsfmg000Item, dhxDataProcessorEtsfmg000Item)) {			 
			return false;
		}		
		// 마스터 그리드 벨리데이션 체크
		console.log(fn_GridValidation(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000));
		
        if(fn_GridValidation(dhxGridEtsfmg000, dhxDataProcessorEtsfmg000)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Etsfmg000 = 0; 
            if(save_Add_Cnt_Etsfmg000 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Etsfmg000 + "건";
                save_All_Sta_Etsfmg000 = 1; 
            } 
            if(save_Edt_Cnt_Etsfmg000 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Etsfmg000 + "건"; 
            } 
            if(save_Del_Cnt_Etsfmg000 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Etsfmg000 + "건"; 
                save_All_Sta_Etsfmg000 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalEtsfmg000(gv_QueSave)){  //여기는 안옴 
            if(!confirmModalEtsfmg000(confirmMsg)){  //여기는 안옴
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 		
    }
}
var confirmModalEtsfmg000 = function (msg) {    
	var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveEtsfmg000_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveEtsfmg000_Send = function() {
	
	var rowStatus;
	var jsonParameterArr = [];
	var rowIdData = {};  
	
	dhxGridEtsfmg000.forEachRow(function(rowId) {        		
		rowStatus = dhxDataProcessorEtsfmg000.getState(rowId);			 
		gf_Trace(rowStatus);
		if(!gf_IsNull(rowStatus)) {
     		rowIdData = {	         
	        	raisNo           	: gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'raisNo', 'grid'),	
	        	raisnm           	: gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'raisnm', 'grid'),
	            useAt            	: gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'useAt', 'grid'),
	            raisHtml      		: gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'raisHtml', 'grid'),
	            atchmnfl       		: gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'atchmnfl', 'grid'),
	            prsrvTmlmtCode    	: gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'prsrvTmlmtCode', 'grid'),       
	            webDrftAt          	: gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'webDrftAt', 'grid'),
	            docClsCode          : gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'docClsCode', 'grid'),
	            prsrvTmlmtCode 		: gf_DhxGetValue(dhxGridEtsfmg000, rowId, 'prsrvTmlmtCode', 'grid'),
				items				: fn_GetEtsfmg000Item(),
				nativeeditorStatus 	: rowStatus 
	        }; 
			jsonParameterArr.push(rowIdData);
		}       	       	         
    });

	gf_Trace(jsonParameterArr);
		
 	gf_Transaction(jsonParameterArr, 'etsfmg000/saveEtsfmg000', JSON.stringify(jsonParameterArr), 'fn_CallbackSaveEtsfmg000', false, 'POST');	
}
var fn_CallbackSaveEtsfmg000 = function(strSvcID, targetID, data) {
    if(data.code === '000') {       	 
		fn_SearchEtsfmg000(data.data.key);		      
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

/**
 * 삭제
 */
var fn_RemoveEtsfmg000 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridEtsfmg000, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridEtsfmg000.forEachRow(function(rowId) {
            state = dhxDataProcessorEtsfmg000.getState(rowId);
            if(dhxGridEtsfmg000.cells(rowId, gf_GetDhxGridColumId(dhxGridEtsfmg000, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridEtsfmg000.getRowIndex(rowId);
                    dhxGridEtsfmg000.deleteRow(rowId);
                    dhxGridEtsfmg000.selectRow(rowNum);
                    fn_FindEtsfmg000();
                } else {
	 				dhxDataProcessorEtsfmg000.setUpdated(rowId, true, 'deleted');
				}
				
				//gf_Trace(dhxDataProcessorEtsfmg000.getState(rowId));
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelEtsfmg000 = function () {
    var titEtsfmg000 = '양식관리'; /* gf_LocaleTrans('default', 'titEtsfmg000') */
    var jsonParameter = {
        raisNo : gf_FormGetValue('searchFormEtsfmg000', 'raisNo', 'text'),
		raisnm : gf_FormGetValue('searchFormEtsfmg000', 'raisnm', 'text')
    };
    var header = [[
        '양식 번호' /* gf_LocaleTrans('default', 'titRaisNo') */,
        '양식명' /* gf_LocaleTrans('default', 'titRaisnm') */,
        '첨부파일 순번' /* gf_LocaleTrans('default', 'titAtchmnfl') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '보존 기한 코드' /* gf_LocaleTrans('default', 'titPrsrvTmlmtCode') */,
        '웹 기안 여부' /* gf_LocaleTrans('default', 'titWebDrftAt') */,
        '문서 분류 코드' /* gf_LocaleTrans('default', 'titDocClsCode') */
    ]];
    var dataId = [[ 'raisNo', 'raisnm', 'atchmnfl', 'useAt', 'prsrvTmlmtCode', 'webDrftAt', 'docClsCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titEtsfmg000 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titEtsfmg000;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('etsfmg000/excelEtsfmg000', jsonParameter);
};
/**
 * html 미리보기
 */
var fn_PreViewHtmlEtsfmg000 = function(){
	var title  = "양식 미리보기";
	var dhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='preViewHtmlEtsfmg000Popup']").size() <= 0) {
		$('body').append("<div id='preViewHtmlEtsfmg000Popup'><div class='b-close' style='display:none'></div></div>");
	}
	$('#preViewHtmlEtsfmg000Popup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'preViewHtmlEtsfmg000Popup';
			//var ajaxUrl = gv_ContextPath+'/pop/comp/view';
			var left	= 0;
			var top		= 0;
			var width	= 835;
			var height	= 700;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL('popup/html/preview', true, true);			
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#preViewHtmlEtsfmg000Popup .b-close').click();
			});
		},
		onClose:function(){		
			dhxWindows.unload();
			$('body').find("div[id='preViewHtmlEtsfmg000Popup']").remove();
		}
	},function(){});
}
/******************************************************************************************************************************
 *                                                     파일 핸들링
 ******************************************************************************************************************************/
var uploadedFileKeys = [];
var uploadedFileInfo = [];
var fn_CallbackFileUploadSaveFormEtsfmg000 = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	if(!gf_IsNull(data)){				
		uploadedFileKeys = [];
		uploadedFileInfo = [];
		$('#'+viewDivId+' .file_box table tr').remove();
		fn_LoadFileUploadSaveFormEtsfmg000(data, viewDivId, dataDivId);
	}
};

var fn_SearchFileUploadSaveFormEtsfmg000 = function(atchFiles, viewDivId, dataDivId) {	
	var jsonParameter = { atchFiles : atchFiles };
	var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST'); 	 
	if(!gf_IsNull(dataSource.data)) {
		uploadedFileKeys = [];
		uploadedFileInfo = [];
		$.each( dataSource.data, function( key, value ) {			
			uploadedFileKeys.push(value.atchFileId);				
			uploadedFileInfo.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	 
		});		
		$('#'+viewDivId+' .file_box table tr').remove();
		fn_LoadFileUploadSaveFormEtsfmg000(uploadedFileInfo, viewDivId, dataDivId);	
	}
};

var fn_RemoveFileUploadSaveFormEtsfmg000 = function(obj, viewDivId, dataDivId) {
	uploadedFileKeys.splice($(obj).attr('idx'), 1);
	uploadedFileInfo.splice($(obj).attr('idx'), 1);	
	$('#'+viewDivId+' .file_box table tr').remove();
	fn_LoadFileUploadSaveFormEtsfmg000(uploadedFileInfo, viewDivId, dataDivId);
};

var fn_LoadFileUploadSaveFormEtsfmg000 = function(data, viewDivId, dataDivId) {		
	var atchFileList = [];
	var fileInfos = [];
	var idx = 0;
	var arrayEmpty = false;
	if(gf_IsNull(uploadedFileKeys) && gf_IsNull(uploadedFileInfo)) arrayEmpty = true;
	$.each( data, function( key, value ) {
		fileInfos = value.split('|^|');
		if(arrayEmpty) {
			uploadedFileKeys.push(fileInfos[0]);				
			uploadedFileInfo.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);	
		}		
		atchFileList.push('<tr>');
		atchFileList.push('<td style="border:0px"><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
		atchFileList.push('<td style="border:0px">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
		atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="fn_RemoveFileUploadSaveFormEtsfmg000(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');		
		idx++;
	});	
	if(idx === 0) {
		atchFileList.push('<tr>');
		atchFileList.push('<td colspan="3" style="text-align:center; border:0px">첨부파일이 없습니다.</td>');		
		atchFileList.push('</tr>');
	}
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val(uploadedFileKeys.join("|"));
	$('#saveFormEtsfmg000 input[name="atchmnfl"]').change();
}

var fn_ClearFileUploadSaveFormEtsfmg000 = function(viewDivId, dataDivId){
	$('#'+viewDivId+' .file_box table tr').remove();
	var atchFileList = [];
	atchFileList.push('<tr>');
	atchFileList.push('<td colspan="3" style="text-align:center; border:0px">첨부파일이 없습니다.</td>');		
	atchFileList.push('</tr>');
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val('');	
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 ******************************************************************************************************************************/
/**
 * 폼데이터 db 체크
 */
var fn_FormValidation =  function(rowId){
    var valid = true;
	var state = dhxDataProcessorEtsfmg000.getState(rowId);
	console.log(state);
	if(!gf_IsNull(state)) {
        if(state != 'deleted') {
            if(!$('#saveFormEtsfmg000').validate().form()){                
                valid = false;
            }
        }  
    }	
	return valid;
}
/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;     
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
	var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Etsfmg000 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Etsfmg000 == 'deleted') {
        save_Row_Num_Etsfmg000 = 0;
        save_Row_Ids_Etsfmg000 = "";
        save_Row_Val_Etsfmg000 = "";
    } else if(save_Row_Sta_Etsfmg000 == 'inserted') {
        save_Row_Num_Etsfmg000 = rowNum;
        save_Row_Ids_Etsfmg000 = ""; 
        save_Row_Val_Etsfmg000 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Etsfmg000 = rowNum;
        save_Row_Ids_Etsfmg000 = rowIds; 
        save_Row_Val_Etsfmg000 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid')  
    } 
	
	var valid;	
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'docClsCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'docClsCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'raisnm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'raisnm');
                    valid = false;
                }
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'useAt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'useAt');
                    valid = false;
                }
            }
        }
    });	

    return fn_FormValidation(rowIds);
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
