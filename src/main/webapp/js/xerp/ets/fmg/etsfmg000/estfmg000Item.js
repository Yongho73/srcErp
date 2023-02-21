/**
 *    프로그램         	: 양식관리 관리 화면 javascript
 *    작성자  			: 디비비전
 *    작성일자          	: 2021.03.18
 *    사용테이블        	: SGN_DOC_RAIS
 * sourceGen version 	: 2021.02.18.01 (2021.03.18)
 */
/******************************************************************************************************************************
 *                                                     <서브그리드 전역변수 선언>
 ******************************************************************************************************************************/
var dhxGridEtsfmg000Item;  //그리드 객체
var eventIdEtsfmg000Item = [];  //그리드 이벤트 객체 
var dhxDataProcessorEtsfmg000Item;  //DataProcessor 객체
/******************************************************************************************************************************
 *                                                     <서브그리드 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamEtsfmg000Item();
    if(cf_SetComponentsEtsfmg000Item()){
       cf_SetEventListenerEtsfmg000Item();
       cf_InitFormEtsfmg000Item();
       cf_SetBindingEtsfmg000Item();
    }
});
/******************************************************************************************************************************
 *                                                     <서브그리드 공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamEtsfmg000Item = function() {};
var cf_SetComponentsEtsfmg000Item = function() {
    var dhxGridEtsfmg000ItemHeaderInfo = [];
    //dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllEtsfmg000Item" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));   
	dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader('항목코드', '100', 'center', 'str', 'ed', false, 'itemCode', '', '')); /* gf_LocaleTrans('default', 'titItemCode') */    
	dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader('항목명', '*', 'left', 'str', 'ed', false, 'itemnm', '', '')); /* gf_LocaleTrans('default', 'titItemnm') */
    dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader('항목형식', '100', 'left', 'str', 'coro', false, 'itemFom', '', '')); /* gf_LocaleTrans('default', 'titItemFom') */    
    dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader('필수여부', '100', 'center', 'str', 'ch', false, 'mustAt', '', '')); /* gf_LocaleTrans('default', 'titMustAt') */
    dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
	dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader('itemOpt', '0', 'center', 'str', 'ro', true, 'itemOpt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
	dhxGridEtsfmg000ItemHeaderInfo.push(gf_MakeDhxGridHeader('raisSn', '0', 'center', 'str', 'ro', true, 'raisSn', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridEtsfmg000Item = gf_MakeDhxGrid('dataListEtsfmg000Item', dhxGridEtsfmg000ItemHeaderInfo, true, false, false);
    dhxGridEtsfmg000Item.enableAutoWidth(false);
    dhxGridEtsfmg000Item.setEditable(true);
	dhxGridEtsfmg000Item.enableDragAndDrop(true);
	dhxGridEtsfmg000Item.enableColumnMove(true);
	dhxGridEtsfmg000Item.enableEditEvents(true,false,true); // one
	dhxGridEtsfmg000Item.enableMultiline(true);
	dhxGridEtsfmg000Item.enableKeyboardSupport(true);
	dhxGridEtsfmg000Item.setColumnMinWidth(40,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
	// 항목형식 combo
    var comboDataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', { codekindCode : 'EA013', exceptCode : '', sortOrder : 'ordr' }, ''); 
    gf_ComboDataSet(dhxGridEtsfmg000Item, dhxGridEtsfmg000Item.getColIndexById('itemFom'), comboDataSource.data);
    return true; 
};

var cf_SetEventListenerEtsfmg000Item = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdEtsfmg000Item = gf_GridDetachEvent(dhxGridEtsfmg000Item, eventIdEtsfmg000Item);
    eventId = dhxGridEtsfmg000Item.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 13)  {   //ENTER  
            var colNum 	   = dhxGridEtsfmg000Item.getColumnsNum();
            var rowNum 	   = dhxGridEtsfmg000Item.getRowsNum();
            var selectedId = dhxGridEtsfmg000Item.getSelectedRowId();
            var ind        = dhxGridEtsfmg000Item.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000Item.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000Item.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridEtsfmg000Item.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridEtsfmg000Item.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridEtsfmg000Item.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000Item.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridEtsfmg000Item.getSelectedRowId();
            var ind        = dhxGridEtsfmg000Item.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000Item.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000Item.getColType(ind);
            dhxGridEtsfmg000Item.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000Item.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridEtsfmg000Item.getSelectedRowId();
            var ind        = dhxGridEtsfmg000Item.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000Item.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000Item.getColType(ind);
            dhxGridEtsfmg000Item.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000Item.editCell();
            }
        }
        else return true;
    });
    eventIdEtsfmg000Item.push(eventId);
    eventId = dhxGridEtsfmg000Item.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return true;
    });
    eventIdEtsfmg000Item.push(eventId);
    eventId = dhxGridEtsfmg000Item.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdEtsfmg000Item.push(eventId);
    eventId = dhxGridEtsfmg000Item.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
		fn_CallbackSearchEtsfmg000SubItem();
		return true;		
    });
    eventIdEtsfmg000Item.push(eventId);
    eventId = dhxGridEtsfmg000Item.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
		if( gf_GetDhxGridColumId(dhxGridEtsfmg000Item, 'chk') != cInd ) {
						
			// grid validation start
			gf_GridValicationMaxLength(dhxGridEtsfmg000Item, stage, cInd, 'itemCode', 10);
			gf_GridValicationMaxLength(dhxGridEtsfmg000Item, stage, cInd, 'itemnm', 10); 
			// grid validation end			
			
			//gf_Trace("양식항목 ["+cInd+"]["+dhxGridEtsfmg000Item.getColIndexById('itemFom')+"], 이전값["+nValue+"], 신규값["+oValue+"], stage["+stage+"]");

			if(nValue != oValue) {
				gf_errorMsgClear();				
				if(cInd == dhxGridEtsfmg000Item.getColIndexById('itemFom')) {
					fn_CallbackSearchEtsfmg000SubItem();
				}				
				fn_updateMasterGrid();
			}			
			if(cInd == dhxGridEtsfmg000Item.getColIndexById('mustAt') || cInd == dhxGridEtsfmg000Item.getColIndexById('useAt')) {
				fn_updateMasterGrid();
			}		
		}
		return true;
    });
    eventIdEtsfmg000Item.push(eventId);	
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddEtsfmg000Item').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddEtsfmg000Item()
    });    
    $('#btnRemoveEtsfmg000Item').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveEtsfmg000Item();
		fn_updateMasterGrid();
    });     
    // 기타 이벤트 ==========================================================================================
    $('#checkAllEtsfmg000Item').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var nRows = dhxGridEtsfmg000Item.getRowsNum();
        for(var i = 0; i <nRows; i++) {
            dhxGridEtsfmg000Item.selectRow(i);
        }
        gf_DhxCheckAllGridHeader(dhxGridEtsfmg000Item, $('#checkAllEtsfmg000Item').prop('checked'), 'chk');
    });
};
var cf_InitFormEtsfmg000Item = function() {};
var cf_SetBindingEtsfmg000Item = function() {};
/******************************************************************************************************************************
 *                                                     <서브 그리드 함수 구현 부분>
 ******************************************************************************************************************************/
var fn_CallbackSearchEtsfmg000Item = function(strSvcID, targetID, data) {	
	dhxGridEtsfmg000Item.destructor();
    if(cf_SetComponentsEtsfmg000Item()){ 
        fn_DhxDataProcessorEtsfmg000Item(); 
        if(!gf_IsNull(data)){
            gf_NoFoundDataOnGridMsgRemove('dataListEtsfmg000Item');
            dhxGridEtsfmg000Item.parse(data.data.records, 'js');			 		 
			dhxGridEtsfmg000Item.selectRow(0);						             
        } else {
            gf_NoFoundDataOnGridMsg('dataListEtsfmg000Item');
        }
		fn_CallbackSearchEtsfmg000SubItem();		
        cf_SetEventListenerEtsfmg000Item();
    }
};
var fn_DhxDataProcessorEtsfmg000Item = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorEtsfmg000Item = new dataProcessor(gv_ContextPath+'/etsfmg000/saveEtsfmg000'); // 서브그리드는 더미임 마스터그리드에 따라감
    dhxDataProcessorEtsfmg000Item.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorEtsfmg000Item.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorEtsfmg000Item.init(dhxGridEtsfmg000Item); //link dataprocessor to the grid
    dhxDataProcessorEtsfmg000Item.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorEtsfmg000Item.styles = {
                    updated:        "font-weight:normal; text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal; text-decoration:none;"
    };	 
};
/**
 * 추가(신규) 
 */
var fn_AddEtsfmg000Item = function() {
    dhxGridEtsfmg000Item.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); 		//no
    initValueArr.push(''); 		//checkbox
	initValueArr.push(''); 		//itemCode    
	initValueArr.push(''); 		//itemnm
    initValueArr.push('10'); 	//itemFom    
    initValueArr.push(''); 		//mustAt
    initValueArr.push(''); 		//useAt
    dhxGridEtsfmg000Item.addRow(dhxGridEtsfmg000Item.uid(), initValueArr, 0);
    dhxGridEtsfmg000Item.selectRow(0);
	fn_CallbackSearchEtsfmg000SubItem();
    gf_NoFoundDataOnGridMsgRemove('dataListEtsfmg000Item');
};
/**
 * 삭제
 */
var fn_RemoveEtsfmg000Item = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridEtsfmg000Item, 'chk');
	if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridEtsfmg000Item.forEachRow(function(rowId) {           
			state = dhxDataProcessorEtsfmg000Item.getState(rowId);
            if(dhxGridEtsfmg000Item.cells(rowId, gf_GetDhxGridColumId(dhxGridEtsfmg000Item, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridEtsfmg000Item.getRowIndex(rowId);
                    dhxGridEtsfmg000Item.deleteRow(rowId);
                    dhxGridEtsfmg000Item.selectRow(rowNum);
                }
                else dhxDataProcessorEtsfmg000Item.setUpdated(rowId, true, 'deleted');
            }
        });
    }
};
/** 
*/
var fn_GetEtsfmg000Item = function(){
	var rowStatus = null;
	var jsonParameterArr = [];
	var rowIdData = {};
	dhxGridEtsfmg000Item.forEachRow(function(rowId) {        		
		rowStatus = dhxDataProcessorEtsfmg000Item.getState(rowId);			 
		if(!gf_IsNull(rowStatus)) {
     		rowIdData = {	         
	        	raisSn              : gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'raisSn', 'grid'),	 
				itemCode 			: gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'itemCode', 'grid'),	
	        	itemnm 				: gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'itemnm', 'grid'),
	            itemFom 			: gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'itemFom', 'grid'),
	            mustAt 				: gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'mustAt', 'grid'),
	            useAt				: gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'useAt', 'grid'),
				itemOpt				: gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'itemOpt', 'grid'),
				nativeeditorStatus 	: rowStatus 
	        }; 
			jsonParameterArr.push(rowIdData);
		}       	       	         
    });
	return jsonParameterArr;
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 ******************************************************************************************************************************/
/**
 * 그리드 validation
 */
var fn_GridValidationEtsfmg000Item = function(dhxGridObjet, dhxDataProcessor){
    var state = ""; 
    var valid = true;
    var validFalseFirstRowId = ""
	var validFalseDuplicationKey = false;    
    dhxGridObjet.forEachRow(function(rowId) {         
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                // 항목명..
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'itemCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'itemCode');
                    valid = false;
                }
				
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'itemnm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'itemnm');
                    valid = false;
                }
				
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'itemFom', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'itemFom');
                    valid = false;
                }

                if(state == 'inserted') {
                    // 항목명
					checkItemCode = gf_DhxGetValue(dhxGridObjet, rowId, 'itemCode', 'grid');                     
                    if(!gf_IsNull(checkItemCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var itemCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'itemCode', 'grid');                            
                            if((itemCode == checkItemCode) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'itemCode');                                 
                                valid = false;
                            }
                        });                         
                        // 그리드 중복된 첫번째 row 체크
                        if(!valid && gf_IsNull(validFalseFirstRowId)) { validFalseFirstRowId = rowId; }
                    } else {
                        // 그리드 중복된 첫번째 row 체크
                        if(!valid && gf_IsNull(validFalseFirstRowId)) { validFalseFirstRowId = rowId; }
                    }
                }
				// 그리드 중복된 첫번째 row 체크
                if(!valid && gf_IsNull(validFalseFirstRowId)) { validFalseFirstRowId = rowId; }
            }
        }
    });
	
	// 오류난 그리드 첫번째행 선택     
  	if(!gf_IsNull(validFalseFirstRowId)) dhxGridEtsfmg000Item.selectRowById(validFalseFirstRowId);
	
	if(validFalseDuplicationKey) {
		gf_DivMsgAlert('동일한 항목코드가 존재합니다. 중복되지 않게 입력해주세요.');
		return false;
	} else
	if(!valid) {
		gf_DivMsgAlert('양식항목의 필수입력 내용을 입력해 주세요');
		return false;
	} else {
		return true    
	}
};
/******************************************************************************************************************************
 *                                       	   <기타 함수>
 ******************************************************************************************************************************/
var fn_updateMasterGrid = function() {
	var rowId = dhxGridEtsfmg000.getSelectedRowId(); 		 
	if(!gf_IsNull(rowId)) {
		var masterState = dhxDataProcessorEtsfmg000.getState(rowId);
		if(masterState != 'inserted' && masterState != 'deleted' && masterState != 'updated'){
			dhxDataProcessorEtsfmg000.setUpdated(rowId, true, 'updated');
	    }					 
	}
}
