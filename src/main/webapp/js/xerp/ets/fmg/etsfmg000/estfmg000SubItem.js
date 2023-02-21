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
var dhxGridEtsfmg000SubItem;  //그리드 객체
var eventIdEtsfmg000SubItem = [];  //그리드 이벤트 객체 
var dhxDataProcessorEtsfmg000SubItem;  //DataProcessor 객체
/******************************************************************************************************************************
 *                                                     <서브그리드 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamEtsfmg000SubItem();
    if(cf_SetComponentsEtsfmg000SubItem()){
       cf_SetEventListenerEtsfmg000SubItem();
       cf_InitFormEtsfmg000SubItem();
       cf_SetBindingEtsfmg000SubItem();
    }
});
/******************************************************************************************************************************
 *                                                     <서브그리드 공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamEtsfmg000SubItem = function() {};
var cf_SetComponentsEtsfmg000SubItem = function() {
    var dhxGridEtsfmg000SubItemHeaderInfo = [];
    //dhxGridEtsfmg000SubItemHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridEtsfmg000SubItemHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllEtsfmg000SubItem" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));   	    
	dhxGridEtsfmg000SubItemHeaderInfo.push(gf_MakeDhxGridHeader('선택항목명', '*', 'left', 'str', 'ed', false, 'itemnm', '', '')); /* gf_LocaleTrans('default', 'titItemnm') */    
    dhxGridEtsfmg000SubItem = gf_MakeDhxGrid('dataListEtsfmg000SubItem', dhxGridEtsfmg000SubItemHeaderInfo, true, false, false);
    dhxGridEtsfmg000SubItem.enableAutoWidth(false);
    dhxGridEtsfmg000SubItem.setEditable(true);
	dhxGridEtsfmg000SubItem.enableDragAndDrop(true);
	dhxGridEtsfmg000SubItem.enableColumnMove(true);
	dhxGridEtsfmg000SubItem.enableEditEvents(true,false,true); // one
	dhxGridEtsfmg000SubItem.enableMultiline(true);
	dhxGridEtsfmg000SubItem.enableKeyboardSupport(true);
	dhxGridEtsfmg000SubItem.setColumnMinWidth(40,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 	
    return true; 
};

var cf_SetEventListenerEtsfmg000SubItem = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdEtsfmg000SubItem = gf_GridDetachEvent(dhxGridEtsfmg000SubItem, eventIdEtsfmg000SubItem);
    eventId = dhxGridEtsfmg000SubItem.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 13)  {   //ENTER  
            var colNum 	   = dhxGridEtsfmg000SubItem.getColumnsNum();
            var rowNum 	   = dhxGridEtsfmg000SubItem.getRowsNum();
            var selectedId = dhxGridEtsfmg000SubItem.getSelectedRowId();
            var ind        = dhxGridEtsfmg000SubItem.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000SubItem.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000SubItem.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridEtsfmg000SubItem.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridEtsfmg000SubItem.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridEtsfmg000SubItem.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000SubItem.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridEtsfmg000SubItem.getSelectedRowId();
            var ind        = dhxGridEtsfmg000SubItem.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000SubItem.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000SubItem.getColType(ind);
            dhxGridEtsfmg000SubItem.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000SubItem.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridEtsfmg000SubItem.getSelectedRowId();
            var ind        = dhxGridEtsfmg000SubItem.getSelectedCellIndex();
            var rowIndex   = dhxGridEtsfmg000SubItem.getRowIndex(selectedId);
            var type       = dhxGridEtsfmg000SubItem.getColType(ind);
            dhxGridEtsfmg000SubItem.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridEtsfmg000SubItem.editCell();
            }
        }
        else return true;
    });
    eventIdEtsfmg000SubItem.push(eventId);
    eventId = dhxGridEtsfmg000SubItem.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return true;
    });
    eventIdEtsfmg000SubItem.push(eventId);
    eventId = dhxGridEtsfmg000SubItem.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdEtsfmg000SubItem.push(eventId);
    eventId = dhxGridEtsfmg000SubItem.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdEtsfmg000SubItem.push(eventId);
    eventId = dhxGridEtsfmg000SubItem.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){       
		if( gf_GetDhxGridColumId(dhxGridEtsfmg000SubItem, 'chk') != cInd ) {
			
			// grid validation start
			gf_GridValicationMaxLength(dhxGridEtsfmg000SubItem, stage, cInd, 'itemnm', 10);
			// grid validation end 
			
			if(nValue != oValue) {
				fn_makeItemOption();
			}
		}
		return true;
    });
    eventIdEtsfmg000SubItem.push(eventId);	
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddEtsfmg000SubItem').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddEtsfmg000SubItem()
    });    
    $('#btnRemoveEtsfmg000SubItem').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveEtsfmg000SubItem();
		fn_makeItemOption();
    });     
    // 기타 이벤트 ==========================================================================================
    $('#checkAllEtsfmg000SubItem').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        var nRows = dhxGridEtsfmg000SubItem.getRowsNum();
        for(var i = 0; i <nRows; i++) {
            dhxGridEtsfmg000SubItem.selectRow(i);
        }
        gf_DhxCheckAllGridHeader(dhxGridEtsfmg000SubItem, $('#checkAllEtsfmg000SubItem').prop('checked'), 'chk');
    });
};
var cf_InitFormEtsfmg000SubItem = function() {};
var cf_SetBindingEtsfmg000SubItem = function() {};
/******************************************************************************************************************************
 *                                                     <서브 그리드 함수 구현 부분>
 ******************************************************************************************************************************/
var fn_CallbackSearchEtsfmg000SubItem = function() {	
	fn_disabledButton(true);
	var rowId = dhxGridEtsfmg000Item.getSelectedRowId();	
	var records = [];
	if(!gf_IsNull(rowId)) {
		var itemOpt = gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'itemOpt', 'grid');
		var itemFom = gf_DhxGetValue(dhxGridEtsfmg000Item, rowId, 'itemFom', 'grid');
		//gf_Trace('['+rowId+']번째 양식항목['+itemFom+']의 선택항목 조회');
		if(!gf_IsNull(itemOpt)) {				 
			var itemAttrArr = itemOpt.split('\|ATTR\|');
			var itemAttrArrLength = itemAttrArr.length;					
			if(itemFom === 'select' || itemFom === 'radio'){		
				for(var loopCount = 1; loopCount < itemAttrArrLength; loopCount++){
					records.push( { itemnm : decodeURI(itemAttrArr[loopCount]) } );			
				}
			}
		}		
		if(itemFom === 'select' || itemFom === 'radio'){
			fn_disabledButton(false);				
		}
	}
	dhxGridEtsfmg000SubItem.destructor();
    if(cf_SetComponentsEtsfmg000SubItem()){ 
        fn_DhxDataProcessorEtsfmg000SubItem(); 
        if(!gf_IsNull(records)){            				
			gf_NoFoundDataOnGridMsgRemove('dataListEtsfmg000SubItem');
            dhxGridEtsfmg000SubItem.parse(records, 'js');             
        } else {
            gf_NoFoundDataOnGridMsg('dataListEtsfmg000SubItem');
        }
        cf_SetEventListenerEtsfmg000SubItem();
    } 
};
var fn_DhxDataProcessorEtsfmg000SubItem = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorEtsfmg000SubItem = new dataProcessor(gv_ContextPath+'/etsfmg000/saveEtsfmg000'); // 서브그리드는 더미임 마스터그리드에 따라감
    dhxDataProcessorEtsfmg000SubItem.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorEtsfmg000SubItem.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorEtsfmg000SubItem.init(dhxGridEtsfmg000SubItem); //link dataprocessor to the grid
    dhxDataProcessorEtsfmg000SubItem.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorEtsfmg000SubItem.styles = {
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
var fn_AddEtsfmg000SubItem = function() {
    dhxGridEtsfmg000SubItem.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
	initValueArr.push(''); //itemnm
    dhxGridEtsfmg000SubItem.addRow(dhxGridEtsfmg000SubItem.uid(), initValueArr, 0);
    dhxGridEtsfmg000SubItem.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListEtsfmg000SubItem');
}
/**
 * 삭제
 */
var fn_RemoveEtsfmg000SubItem = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridEtsfmg000SubItem, 'chk');
	if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        dhxGridEtsfmg000SubItem.forEachRow(function(rowId) {           
			state = dhxDataProcessorEtsfmg000SubItem.getState(rowId);
            if(dhxGridEtsfmg000SubItem.cells(rowId, gf_GetDhxGridColumId(dhxGridEtsfmg000SubItem, 'chk')).isChecked()){            
               	dhxGridEtsfmg000SubItem.deleteRow(rowId);            
            }
        });
    }
}
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 ******************************************************************************************************************************/
var fn_GridValidationEtsfmg000SubItem = function(dhxGridObjet, dhxDataProcessor){
    var state = ""; 
    var valid = true;  
    dhxGridObjet.forEachRow(function(rowId) {         
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                // 항목명..
				if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'itemnm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'itemnm');
                    valid = false;
                }                 
            }
        }
    });
	if(!valid) {
		gf_DivMsgAlert('선택항목 필수입력 내용을 입력해 주세요');
		return false;
	} else {
		return true    
	}
}
/******************************************************************************************************************************
 *                                       	   <기타 함수>
 ******************************************************************************************************************************/
var fn_makeItemOption = function() {
	var selectedItemRowId = dhxGridEtsfmg000Item.getSelectedRowId(); 		 
	if(!gf_IsNull(selectedItemRowId)) {
		var itemFom = gf_DhxGetValue(dhxGridEtsfmg000Item, selectedItemRowId, 'itemFom', 'grid');					 
		var itemAttrArr = [];
		var rowState, val;
		dhxGridEtsfmg000SubItem.forEachRow(function(rowId) {
			rowState = dhxDataProcessorEtsfmg000SubItem.getState(rowId);
			if(rowState != 'deleted') {
				itemAttrArr.push( gf_DhxGetValue(dhxGridEtsfmg000SubItem, rowId, 'itemnm', 'grid') );
			}
	  	});
		if(itemAttrArr.length > 0) {
			val = itemFom + '\|ATTR\|' + itemAttrArr.join( '\|ATTR\|' );
		} else {
			val = itemFom;
		}
		gf_DhxSetValue(dhxGridEtsfmg000Item, selectedItemRowId, 'itemOpt', val, 'grid');
		dhxDataProcessorEtsfmg000Item.setUpdated(selectedItemRowId, true, 'updated');
		fn_updateMasterGrid();
	}
}

var fn_disabledButton = function(status){
	$('#btnAddEtsfmg000SubItem').prop('disabled', status);
	$('#btnRemoveEtsfmg000SubItem').prop('disabled', status);
}
