/*----------------------------------------------------------------------------------
 * dtmlx 관련 개발 편의를 위한 함수를 정의해 사용한다.
----------------------------------------------------------------------------------*/

/**
 * 
 성능우위 문법

 배열 생성시 : var arr = new Array(); 보다 var arr = []; 를 사용한다
 배열 접근시 : arr.push(i) 보다 arr[i] = value 를 사용한다
 객체 생성시 : var obj = new Object(); 보다 var obj = {}; 를 사용한다
 객체 접근시 : obj["a"] = 1 보다 obj.a = 1; 를 사용한다 
 문자열 생성시 : var str = new String("aaa"); 보다 var str = "aaa"; 를 사용한다 
 문자열 연산시 : loop문에서 문자열 조작시에 str += "test"; 보다 arr=[]; loop{ arr[i]="test"; } arr.join(""); 을 사용한다 (String과 StringBuffer개념과 유사)
 정규표현식 : 탐색 대상을 축소한다. loop 문 안에 정규표현식 넣지 말고 밖에 놓아 한번만 컴파일 처리되게 한다. loop문에 있으면 계속 컴파일됨 
 */

/**
 * 칼렌더
 */
dhtmlXCalendarObject.prototype.langData["ko"] = {
    dateformat: "%Y-%m-%d",
    monthesFNames: [
    	 "1월", "2월", "3월", "4월", "5월", "6월", "7월",
         "8월", "9월", "10월", "11월", "12월"
    ],
    monthesSNames: [
    	"1월", "2월", "3월", "4월", "5월", "6월", "7월",
        "8월", "9월", "10월", "11월", "12월"
    ],
    daysFNames: [
        "일요일", "월요일", "화요일", "수요일",
        "목요일", "금요일", "토요일"
    ],
    daysSNames: ["일", "월", "화", "수", "목", "금", "토"],
    weekstart: 7,
    weekname: "주"
};

/**
 * 그리드 컬럼id 가져오기
 * @param dhxGridBoxObj
 * @param id
 * @returns
 */
var gf_GetDhxGridColumId = function(dhxGridBoxObj, id){
	return dhxGridBoxObj.getColIndexById(id)
};

var gf_GetDhxGridColum = function(dhxGridBoxObj, idx){
	return dhxGridBoxObj.getColumnId(idx);
};

/**
 * rowId에 해당하는 행 데이터를 Object{key : value, key : value} 형태로 반환
 * @param gridObj	그리드 객체
 * @param rowId		해당 rowId
 * @returns
 */
var gf_GetRowData = function(gridObj, rowId){
	var rtnData = {};
	for(var i = 0; i < gridObj.getColumnsNum(); i++){
		rtnData[gridObj.getColumnId(i)] = gridObj.cells(rowId, i).getValue();
	}
	return rtnData;
};

/**
 * 트리메뉴 만들기
 * @param divId
 * @returns
 */
var gf_MakeDhxTree = function(divId) {
	var dhxTreeObject = new dhtmlXTreeObject(divId,'100%','100%',0);
	dhxTreeObject.setImagePath(gv_ContextPath+'/css/dhtmlx/skin/imgs/dhxtree_web/');
	dhxTreeObject.enableTreeImages("false");
	dhxTreeObject.enableTreeLines(true);	
	return dhxTreeObject;
};

/**
 * 그리드 헤더
 * @param header
 * @param width
 * @param align
 * @param sort
 * @param type	=	dyn, ed : editablel, txt, price, ch : checkbox, coro : combo? read only?, ra, ro : read-only
 * @param hidden
 * @param id
 * @param attach
 * @returns
 */
var gf_MakeDhxGridHeader = function(header, width, align, sort, type, hidden, id, attach, valid) {
	
	var attr = {};
	
	attr.header = header; 
	attr.width 	= width; 
	attr.align 	= align; 
	attr.sort 	= sort; 
	attr.type 	= type; 
	attr.hidden = hidden; 
	attr.id 	= id;
	//attr.attach = attach;
	attr.valid  = gf_IsNull(valid)? '':valid;

	return attr;
};

var gf_MakeDhxGridHeaderP = function(header, width, align, sort, type, hidden, id, attach, valid) {
	
	var attr = {};
	
	attr.header = header; 
	attr.width 	= width; 
	attr.align 	= align; 
	attr.sort 	= sort; 
	attr.type 	= type; 
	attr.hidden = hidden; 
	attr.id 	= id;
	//attr.attach = attach;
	attr.valid  = gf_IsNull(valid)? '':valid;

	return attr;
};
/**
 * 그리드
 * @param divId
 * @param gridInfo
 * @param muiltiselet
 * @param attachHeaderYn
 * @param footerYn
 * @returns
 */
var gf_MakeDhxGrid = function(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr){
	var headerStyle = [];
    var iniWidth = [];
	var colAlign = [];
	var colSorting = [];
	var colTypes = [];
	var columnIds = [];
	var attaches = [];
	var valid = [];
	var i = j = 0;
	var gridAttr;
	var gridColLength = gridInfo.length;
	var gridEditMode = false;
	
	for(i; i<gridColLength; i++ ) {
		
		gridAttr = gridInfo[i];
		
		if(i != 0) {
			headerStyle[j]	= ',';
			iniWidth[j]		= ',';
			colAlign[j]		= ',';
			colSorting[j]	= ',';
			colTypes[j]		= ',';
			columnIds[j]	= ',';
			attaches[j]	    = ',';
			valid[j]	    = ',';
			j++;
		}
 
		headerStyle[j] 	= gridAttr.header.trim();
		iniWidth[j] 	= gridAttr.width.trim();
		colAlign[j] 	= gridAttr.align.trim();
		colSorting[j] 	= gridAttr.sort.trim();
		colTypes[j] 	= gridAttr.type.trim();
		columnIds[j] 	= gridAttr.id.trim();
		//attaches[j]	    = gridAttr.attach.trim();
		valid[j] 	    = gridAttr.valid.trim();
		
		if(!gf_IsNull(valid[j])) gridEditMode = true;
		
		j++;
	} 

	var dhxGridBoxObj = new dhtmlXGridObject(divId);
	dhxGridBoxObj.setImagePath(gv_ContextPath+'/css/dhtmlx/skin/imgs/');
	dhxGridBoxObj.setHeader(headerStyle.join(""));
	
	if(attachHeaderYn) {		
		var gridAttachHeaderLength = attachHeaderArr.length;		
		for(var i=0; i<gridAttachHeaderLength; i++ ) {		
			dhxGridBoxObj.attachHeader(attachHeaderArr[i]);
		}
	}
	
	dhxGridBoxObj.setInitWidths(iniWidth.join(""));
	dhxGridBoxObj.setColAlign(colAlign.join(""));
	dhxGridBoxObj.setColSorting(colSorting.join(""));
	dhxGridBoxObj.setColTypes(colTypes.join(""));
	dhxGridBoxObj.setColumnIds(columnIds.join(""));
//	dhxGridBoxObj.setSkin("web");
	
	/* 로딩 이미지 */
	//dhxGridBoxObj.attachEvent("onXLS",function(){ console.log("fire~"); });
	//dhxGridBoxObj.attachEvent("onXLE",function(){ console.log("end!"); });
	
	if(muiltiselet){
		dhxGridBoxObj.enableMultiselect(true);
	}
	
	dhxGridBoxObj.init();
	dhxGridBoxObj.enableSmartRendering(true);  //2020.07.27 속도문제 처리를 위해 주석 풀음
	//dhxGridBoxObj.enableDistributedParsing(true,100,100);  //2020.07.27 속도문제 처리를 위해 주석 처리
	dhxGridBoxObj.enableRowsHover(true,'grid_hover')
	dhxGridBoxObj.enableAutoWidth(false);
	dhxGridBoxObj.enableAutoHeight(false);
	dhxGridBoxObj.setAwaitedRowHeight(25);   //2020.07.27 속도문제 처리를 위해 추가, applies a custom height of a row which will be used in the smart rendering mode for row calculation 
	//dhxGridBoxObj.enableBlockSelection();
	
	for(var i=0; i<gridColLength; i++ ) {
		gridAttr = gridInfo[i];
		if(gridAttr.hidden) dhxGridBoxObj.setColumnHidden(gf_GetDhxGridColumId(dhxGridBoxObj, gridAttr.id),true);
	}
	
	if(footerYn){
		var footerMessage = [];
		footerMessage[0] = '0건 조회되었습니다';
		for(var i=1; i<gridColLength; i++ ) {
			footerMessage[i] = '#cspan';
		}
		dhxGridBoxObj.attachFooter(footerMessage.join(","));    
	}
	
	if(gridEditMode) {
		dhxGridBoxObj.enableMultiline(true);
		dhxGridBoxObj.enableEditEvents(true,false,true);
		dhxGridBoxObj.enableEditTabOnly(true);    
		dhxGridBoxObj.enableKeyboardSupport(true);
		dhxGridBoxObj.enableValidation(true);
		dhxGridBoxObj.setColValidators(valid.join(""));
	}

	return dhxGridBoxObj;
};

var gf_MakeDhxGridP = function(divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr){
	var headerStyle = [];
    var iniWidthsP = [];
	var colAlign = [];
	var colSorting = [];
	var colTypes = [];
	var columnIds = [];
	var attaches = [];
	var valid = [];
	var i = j = 0;
	var gridAttr;
	var gridColLength = gridInfo.length;
	var gridEditMode = false;
	
	for(i; i<gridColLength; i++ ) {
		
		gridAttr = gridInfo[i];
		
		if(i != 0) {
			headerStyle[j]	= ',';
			iniWidthsP[j]	= ',';
			colAlign[j]		= ',';
			colSorting[j]	= ',';
			colTypes[j]		= ',';
			columnIds[j]	= ',';
			attaches[j]	    = ',';
			valid[j]	    = ',';
			j++;
		}
 
		headerStyle[j] 	= gridAttr.header.trim();
		iniWidthsP[j] 	= gridAttr.width.trim();
		colAlign[j] 	= gridAttr.align.trim();
		colSorting[j] 	= gridAttr.sort.trim();
		colTypes[j] 	= gridAttr.type.trim();
		columnIds[j] 	= gridAttr.id.trim();
		//attaches[j]	    = gridAttr.attach.trim();
		valid[j] 	    = gridAttr.valid.trim();
		
		if(!gf_IsNull(valid[j])) gridEditMode = true;
		
		j++;
	} 

	var dhxGridBoxObj = new dhtmlXGridObject(divId);
	dhxGridBoxObj.setImagePath(gv_ContextPath+'/css/dhtmlx/skin/imgs/');
	dhxGridBoxObj.setHeader(headerStyle.join(""));
	
	if(attachHeaderYn) {		
		var gridAttachHeaderLength = attachHeaderArr.length;		
		for(var i=0; i<gridAttachHeaderLength; i++ ) {		
			dhxGridBoxObj.attachHeader(attachHeaderArr[i]);
		}
	}
	
	dhxGridBoxObj.setInitWidthsP(iniWidthsP.join(""));
	dhxGridBoxObj.setColAlign(colAlign.join(""));
	dhxGridBoxObj.setColSorting(colSorting.join(""));
	dhxGridBoxObj.setColTypes(colTypes.join(""));
	dhxGridBoxObj.setColumnIds(columnIds.join(""));
//	dhxGridBoxObj.setSkin("web");
	
	/* 로딩 이미지 */
	//dhxGridBoxObj.attachEvent("onXLS",function(){ console.log("fire~"); });
	//dhxGridBoxObj.attachEvent("onXLE",function(){ console.log("end!"); });
	
	if(muiltiselet){
		dhxGridBoxObj.enableMultiselect(true);
	}
	
	dhxGridBoxObj.init();
	//dhxGridBoxObj.enableSmartRendering(true);
	dhxGridBoxObj.enableDistributedParsing(true,100,100);
	dhxGridBoxObj.enableRowsHover(true,'grid_hover')
	dhxGridBoxObj.enableAutoWidth(false);
	dhxGridBoxObj.enableAutoHeight(false);
	//dhxGridBoxObj.enableBlockSelection();
	
	for(var i=0; i<gridColLength; i++ ) {
		gridAttr = gridInfo[i];
		if(gridAttr.hidden) dhxGridBoxObj.setColumnHidden(gf_GetDhxGridColumId(dhxGridBoxObj, gridAttr.id),true);
	}
	
	if(footerYn){
		var footerMessage = [];
		footerMessage[0] = '0건 조회되었습니다';
		for(var i=1; i<gridColLength; i++ ) {
			footerMessage[i] = '#cspan';
		}
		dhxGridBoxObj.attachFooter(footerMessage.join(","));    
	}
	
	if(gridEditMode) {
		dhxGridBoxObj.enableMultiline(true);
		dhxGridBoxObj.enableEditEvents(true,false,true);
		dhxGridBoxObj.enableEditTabOnly(true);    
		dhxGridBoxObj.enableKeyboardSupport(true);
		dhxGridBoxObj.enableValidation(true);
		dhxGridBoxObj.setColValidators(valid.join(""));
	}

	return dhxGridBoxObj;
};

var gf_NoFoundDataOnGridMsg = function(gridId) {
	if($('#'+gridId+' .objbox #noFoundDataOnGridMsg').size() <= 0) {
		$('#'+gridId+' .objbox').append('<div style="font-size:0.75rem" id="noFoundDataOnGridMsg" class="nodata_msg">'+gf_LocaleTrans('default', 'msgNull'),+'</div>');
	}
}

var gf_NoFoundDataOnGridMsgRemove = function(gridId) {
	$('#'+gridId+' .objbox #noFoundDataOnGridMsg').remove();
}

/**
 * 콤보박스
 * @param strSvcID
 * @param targetID
 * @param data
 * @returns
 */
var gf_CallbackMakeDhxCombo = function(strSvcID, targetID, data){
	
	var datas;
	var keyYn = gf_IsNull(strSvcID.key);
	var defaultValue = strSvcID.defaultValue;
	
	if(!keyYn) {
		datas = data.data.records;
	} else {
		datas = data.data.codeList;
	}

	var options = {};
	var option 	= {};
	var items   = [];
	var i 		= 0;
	
	if(strSvcID.defaultYn) {
		//strSvcID.dhxObj.setPlaceholder("선택해 주세요...");
		//strSvcID.dhxObj.setPlaceholder("전체");
		strSvcID.dhxObj.setPlaceholder("");
		//strSvcID.dhxObj.setPlaceholder(gf_LocaleTrans('default','titAll'));
	}
 	
	for(var item in datas){
		
		if(!keyYn) {

			if(!gf_IsNull(eval('datas[item].'+strSvcID.key))){
				
				option = {};
				
				if(i === 0) {
					
					option.text = eval('datas[item].'+strSvcID.value);
					option.value = eval('datas[item].'+strSvcID.key);
					
					if(!strSvcID.defaultYn || (defaultValue === option.value)) {						
						option.selected = true;
					}
					
				} else {		
					option.text = eval('datas[item].'+strSvcID.value);
					option.value = eval('datas[item].'+strSvcID.key);
					
					if(defaultValue === option.value) {						 
						option.selected = true;
					}
				}
				
				items[i]		= option;			
				i++;				
			}
			
		} else {		
		
			if(!gf_IsNull(datas[item].cd)){	
				
				option = {};
				
				if(i==0) {
					if(!strSvcID.defaultYn) {
						option.text 	= datas[item].cdKorNm;
						option.value 	= datas[item].cd;
						option.selected = true;
					} else {
						option.text 	= datas[item].cdKorNm;
						option.value 	= datas[item].cd;
					}
				} else {		
					option.text 	= datas[item].cdKorNm;
					option.value 	= datas[item].cd;
				}
				
				items[i]		= option;			
				i++;	
			}
		}
	}

	options.options = items;
	strSvcID.dhxObj.load(options);	 
};

/**
 * 콤보박스
 * @param strSvcID
 * @param targetID
 * @param data
 * @returns
 */
var gf_MakeDhxCombo = function(divId, formNm, width, actionUrl, defaultYn, key, value, param, defaultValue){
	
	var langSeCode = gf_GetSysConfig('langSeCode');
	var dhxComboBox 	= new dhtmlXCombo(divId, formNm, width);	
	var strObj 			= {};	
	strObj.dhxObj 		= dhxComboBox;
	strObj.defaultYn 	= defaultYn;
	strObj.key 			= key;
	
	if(value =="codeNm") {
		//한국
		if(langSeCode == "kor") {
			value = "codeNm";
		//영어
		} else if(langSeCode == "eng") {
			value = "codeEngNm";
		//다국어
		} else { 	
			value = "codeThirdNm";
		}
	}
	strObj.value 		= value;
	strObj.defaultValue = defaultValue;

	gf_Transaction(strObj, actionUrl, param, 'gf_CallbackMakeDhxCombo', false, 'GET');

	dhxComboBox.enableFilteringMode(true);

	return dhxComboBox;
};

/**
 * 그리드 값 가져오기
 * @param dhxObj	dhx 객체 (grid or combox)
 * @param id		설정할 위치 rowId ※grid 에서만 사용
 * @param value		설정할 위치 colId ※grid 에서만 사용
 * @param type		combox	: dhx Select Box
 * 					grid	: dhx grid
 * @returns
 */
var gf_DhxGetValue = function(dhxObj, rId, cInd, type) {
	if(type == 'combox') {
		return dhxObj.getSelectedValue();
	} else if (type == 'grid') {
		return dhxObj.cells(rId, dhxObj.getColIndexById(cInd)).getValue();
	}
};

/**
 * 그리드 값 세팅
 * @param dhxObj	dhx 객체 (grid or combox)
 * @param type		combox	: dhx Select Box
 * 					grid	: dhx grid
 * @param value		설정 할 값
 * @param rowId		설정할 위치 rowId ※grid 에서만 사용
 * @param colId		설정할 위치 colId ※grid 에서만 사용
 * @returns
 */
var gf_DhxSetValue = function(dhxObj, rId, cInd, val, type){	
	val = val+'';	
	if(type == 'combox') {	
		dhxObj.selectOption(dhxObj.getIndexByValue(val));		
		return '';
	} else if (type == 'grid') {		
		return dhxObj.cells(rId, dhxObj.getColIndexById(cInd)).setValue(val+'');
	}
};

/**
 * 그리드 특정 컬럼의 합계 가져오기
 * @param dhxObj	dhx 객체 (grid)
 * @param value		설정할 위치 colId ※grid 에서만 사용
 * 					grid	: dhx grid
 * @returns
 */
var gf_DhxGetSumValue = function(dhxObj, cInd) {
	var sumValue = 0;
	var type = dhxObj.getColType(cInd);
	if(type == "edn") {
		var rowCount = dhxObj.getRowsNum();
		if(rowCount > 0){
			dhxObj.forEachRow(function(rowId) {
				sumValue = sumValue + eval(dhxObj.cells(rowId, cInd).getValue());
			});
		}
		else {
			sumValue = 0;
		}
	}
	else {
		gf_DivMsgAlert("컬럼의 타입이 맞지 않습니다.");
		sumValue = 0;
	}
	
	return sumValue;
};


/**
 * 그리드 데이터 프로세서
 * @param header
 * @param width
 * @param align
 * @param sort
 * @param type
 * @param hidden
 * @param id
 * @param attach
 * @returns
 */
var gf_MakeDhxGridDataProcessor = function(dhxGridObjet, actionUrl, callbackFunction){
	
	var dhxDataProcessor = new dataProcessor(gv_ServerApiUrl+'/'+actionUrl);
	dhxDataProcessor.setTransactionMode('POST',true); 	// Set mode as send-all-by-post
	dhxDataProcessor.setUpdateMode('off'); 				// Disable auto-update
	dhxDataProcessor.enableDataNames(true);
	dhxDataProcessor.init(dhxGridObjet); 				// Link dataprocessor to the grid    
	dhxDataProcessor.attachEvent('onAfterUpdate',function(){ 		eval(callbackFunction+'("onAfterUpdate",arguments);'); 			return true; });
	dhxDataProcessor.attachEvent('onRowMark',function(){ 			eval(callbackFunction+'("onRowMark",arguments);'); 				return true; });
	dhxDataProcessor.attachEvent('onBeforeUpdate',function(){ 		eval(callbackFunction+'("onBeforeUpdate",arguments);'); 		return true; });
	dhxDataProcessor.attachEvent('onValidatationError',function(){ 	eval(callbackFunction+'("onValidatationError",arguments);'); 	return true; });
	dhxDataProcessor.attachEvent('onAfterUpdateFinish',function(){ 	eval(callbackFunction+'("onAfterUpdateFinish",arguments);'); 	return true; });
	dhxDataProcessor.attachEvent('onFullSync',function(){ 			eval(callbackFunction+'("onFullSync",arguments);'); 			return true; });
    //dhxDataProcessor.setUpdateMode('cell', true);
    
	//console.log("dhxDataProcessor::"+dhxDataProcessor);
    return dhxDataProcessor;
};

/**
 * 키맵핑
 * @param dhxGridObjet
 * @param dhxDataProcessor
 * @param obj
 * @param ind
 * @returns
 */
var gf_KeyUpDhxGridCellMapping = function(dhxGridObjet, dhxDataProcessor, obj, ind) {
	var selectedId = dhxGridObjet.getSelectedRowId();		 
	if(!gf_IsNull(selectedId)) {    	
		dhxGridObjet.cells(dhxGridObjet.getSelectedRowId(),ind).setValue($(obj).val());
		dhxDataProcessor.setUpdated(dhxGridObjet.getSelectedRowId(), true);
	}
};

/**
 * 키맵핑
 * @param dhxGridObjet
 * @param dhxDataProcessor
 * @param formNm
 * @param checkBoxId
 * @param useNmInd
 * @param useYnInd
 * @returns
 */
var gf_KeyUpDhxGridCellMappingUseYn = function(dhxGridObjet, dhxDataProcessor, formNm, checkBoxId, useNmInd, useYnInd) {
	var selectedId = dhxGridObjet.getSelectedRowId();		 
	if(!gf_IsNull(selectedId)) { 
		var checkValue = gf_FormGetValue(formNm, checkBoxId, 'chkbox');    
	    if(checkValue == 'on') {
	    	dhxGridObjet.cells(dhxGridObjet.getSelectedRowId(),useNmInd).setValue('사용');
	    	dhxGridObjet.cells(dhxGridObjet.getSelectedRowId(),useYnInd).setValue('Y');
	    } else {
	    	dhxGridObjet.cells(dhxGridObjet.getSelectedRowId(),useNmInd).setValue('미사용');
	    	dhxGridObjet.cells(dhxGridObjet.getSelectedRowId(),useYnInd).setValue('N');
	    }
	    dhxDataProcessor.setUpdated(dhxGridObjet.getSelectedRowId(), true, 'updated');
	}
};

/**
 * 콤포맵핑
 * @param dhxGridObjet
 * @param dhxDataProcessor
 * @param value
 * @param text
 * @param textInd
 * @param valueInd
 * @returns
 */
var gf_ChangeDhxComboMapping = function(dhxGridObjet, dhxDataProcessor, value, text, valueInd, textInd) {
	var rowId = dhxGridObjet.getSelectedRowId();
	var valId = gf_GetDhxGridColumId(dhxGridObjet, valueInd);
	var txtId = gf_GetDhxGridColumId(dhxGridObjet, textInd);
	if(!gf_IsNull(rowId)) {    	
		if(valueInd) dhxGridObjet.cells(rowId,valId).setValue(value);
		if(textInd) dhxGridObjet.cells(rowId,txtId).setValue(text);
		if((valueInd) || (textInd))
			dhxDataProcessor.setUpdated(dhxGridObjet.getSelectedRowId(), true, 'updated');
	}    
};

/**
 * 폼그리드 맵핑
 */
var gf_DhxGridCellMapping = function(dhxGridObjet, dhxDataProcessor, ind, val, updateChk) {
	var rowId = dhxGridObjet.getSelectedRowId();
	var colId = gf_GetDhxGridColumId(dhxGridObjet, ind);
	if(gf_IsNull(updateChk)) {
		updateChk = false;
	}
	if(!gf_IsNull(rowId)) {
		
		var gridVal = gf_DhxGetValue(dhxGridObjet, rowId, ind, 'grid');
		
		if(gridVal != val) {
			dhxGridObjet.cells(rowId,colId).setValue(val);

			var state = dhxDataProcessor.getState(rowId);
		    if(state != 'inserted' && state != 'deleted' && updateChk != true){
		    	dhxDataProcessor.setUpdated(rowId, true, 'updated');
		    }
		}		
		//gf_Trace('value=['+(gridVal == val)+']]['+rowId+']['+ind+']['+gf_DhxGetValue(dhxGridObjet, rowId, ind, 'grid')+']['+val+']=['+dhxDataProcessor.getState(rowId)+']');		
	}
};

/**
 * 폼그리드 맵핑 none dataproccess
 */
var gf_DhxGridCellMappingNoneDataProccess = function(dhxGridObjet, ind, val) {
	
	var rowId = dhxGridObjet.getSelectedRowId();
	var colId = gf_GetDhxGridColumId(dhxGridObjet, ind);
	 
	if(!gf_IsNull(rowId)) {    			 
		if(gf_DhxGetValue(dhxGridObjet, rowId, ind, 'grid') != val) {
			dhxGridObjet.cells(rowId,colId).setValue(val);			 
		}			
	}
};

/**
 * 그리드상 유저id
 * @param dhxGridObjet
 * @param gridRowTotCount
 * @returns
 */
var gf_AddGridColumLoginUserId = function(dhxGridObjet, gridRowTotCount){
	if(gridRowTotCount != 0) {
		var cIndex = dhxGridObjet.getColIndexById('regId'); 				
		var userId = gf_GetLocalStorageData('userId', false);
		var count;

		if( gf_IsNull(cIndex) ) {
			count = dhxGridObjet.getColumnsNum(); 
			dhxGridObjet.insertColumn(count, 'regId', 'ro', '100');
			dhxGridObjet.setColumnHidden(count,true); 
			dhxGridObjet.setColumnId(count,'regId');
			dhxGridObjet.attachHeader('#rspan');
		} else {
			count = cIndex;
		}
	
		for(var cnt=1;cnt<=gridRowTotCount;cnt++){
			dhxGridObjet.cells(cnt,count).setValue(userId);
		}
	}
};

/**
 * dhtmlx 이미지 표기
 * @param dhxObj	대상값
 * @param colId		표시될 컬럼
 * @param imgCls	이미지 종류
 * @param sRow		이미지 출력될 시작 row
 * @param eRow		이미지 출력될 종료 row 
 * @returns
 */
var gf_DhxSetImages = function(dhxObj, colInd, imgCls, sRow, eRow) {
	//대상 그리드, 대상 컬럼 인덱스, 이미지 종류 지정, 시작row, 종료row
	var imgPath = "";	
	var t_Value = "";
	var align = "";
	
	if (gf_IsNull(sRow)) { sRow = 1; }
	if (gf_IsNull(eRow)) { eRow = dhxObj.getRowsNum(); }
	//alert(sRow + '  ' +eRow);
	
	if (imgCls == "search") {
		//조회 아이콘 <a class="btn-in-grid-pink fr glyphicon glyphicon-search"></a>으로 변경요청
		imgPath = gv_ContextPath + '/img/sub/icon_search02.png';
	} else {
		//첨부파일 아이콘 <a class="btn-in-grid-blue ac glyphicon glyphicon-paperclip"></a>으로 변경요청
		imgPath = gv_ContextPath + '/img/sub/icon_attach.png';
	}
	
	//첨부파일 그리드에서 삭제버튼 표기<a class="btn-in-grid-red ac glyphicon glyphicon-trash"></a>으로 변경요청
	if (imgCls == "atchDelbtn") {
		for (var i = sRow; i <= eRow; i++) {
			dhxObj.cells(i, colInd).setValue('<input type="button" id="atchDelBtn" name="atchDelBtn" onclick="fn_DeleteAtchGrid('+ i +');" class="ml10 btn-in-grid-red glyphicon glyphicon-trash" value="삭제">');
		}
	} else if (dhxObj.getColType(colInd) != "img") {
		//해당 셀의 타입이 이미지가 아닌 경우 (html 형식으로 출력, 텍스트와 이미지를 같이 붙이는 경우 등)
		for (var i = sRow; i <= eRow; i++) {
			t_Value = dhxObj.cells(i, colInd).getValue();
			if (!gf_IsNull(t_Value)) {
				align = 'right';
			} else {
				align = 'center';
			}
			dhxObj.cells(i, colInd).setValue(t_Value + '<img align="' + align + '" src="'+ imgPath + '"></img>');
		}
	} else {
		//이미지만 출력시 사용
		dhxObj.setImagePath('/img/sub/icon_attach.png');
	}
};

/**
 * dhtmlx calendar 생성 
 * @param params = {input : "replyDt",	button : "replyDtIcon", language : "ko"}
 * input	= calendar input box id
 * button	= calendar button image id
 * language = calendar 언어
 * @returns
 */
var gf_dhxCalendarCreate = function(params){
	var dhxCalObj = new dhtmlXCalendarObject(params);
	dhxCalObj.loadUserLanguage(params.language);
	if(params.hide !== "false"){	 
		dhxCalObj.hideTime();	//하단에 시간 숨김
	}else{
		dhxCalObj.showTime();	//하단에 시간 보임
	}
    return dhxCalObj;
};

/**
 * dhtmlx calendar 데이터 설정
 * @param params = {value : +1, format : "YYYY-MM-DD"}
 * value : 현일자 기준 더하거나 뺄 일자 
 * format : 표현할 포맷
 * @returns
 */
var gf_dhxCalendarDataSet = function(params){
	return gf_GetDate(new Date().format('YYYYMMDD'), params.value).toDate().format(params.format);
};

/**
 * 그리드의 헤더 체크박스 처리
 * @param dhxObj	대상값
 * @param status	체크박스상태값
 * @param colId		표시될 컬럼 
 */
var gf_DhxCheckAllGridHeader = function (dhxObj, status, colInd){
	dhxObj.forEachRow(function(rowId) {
		dhxObj.cells(rowId, gf_GetDhxGridColumId(dhxObj, colInd)).setChecked(status);
	});
};

/**
 * 그리드 이벤트 모두 제거 (이벤트 중복 방지)
 */
var gf_GridDetachEvent = function(dhxObj, eventIds){
	for (var i=0;i<eventIds.length;i++) { dhxObj.detachEvent(eventIds[i]); }
	eventIds = [];
	return eventIds;
};

/**
 * 체크된 그리드 값 배열로 가져오기
 */
var gf_GetCheckedGridValueArr = function (dhxObj, checkCid, cid){
	var returnIds = [];
	dhxObj.forEachRow(function(rowId) {
		if(dhxObj.cells(rowId, gf_GetDhxGridColumId(dhxObj, checkCid)).isChecked()){
			returnIds.push( dhxObj.cells(rowId,gf_GetDhxGridColumId(dhxObj, cid)).getValue() );
		}
	});
	return returnIds;
};

/**
 * 체크된 그리드 rowId 배열로 가져오기
 */
var gf_GetCheckedGridRowIdArr = function (dhxObj, checkCid){
	var returnIds = [];
	dhxObj.forEachRow(function(rowId) {
		if(dhxObj.cells(rowId, gf_GetDhxGridColumId(dhxObj, checkCid)).isChecked()){
			returnIds.push( rowId );
		}
	});
	return returnIds;
};

/**
 * 그리드 셀타입 날짜 포맷(읽기전용) (YYYYMMDD->YYYY-MM-DD)
 * @param cell
 * @returns
 */
function eXcell_dateFormatro(cell){ //the eXcell name is defined here
    if (cell){                 //the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;        
    }
    this.edit = function(){} //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; } 
    this.setValue=function(val){
        if(gf_IsNull(val)) this.setCValue(''); 
        else this.setCValue(val.toDate().format('YYYY-MM-DD'),val);                                     
    }
    this.getValue=function(){
    	return this.cell.firstChild.value; 
    }
}
eXcell_dateFormatro.prototype = new eXcell;// nests all other methods from the base class

/**
 * 그리드 셀타입 날짜 포맷(편집) (YYYYMMDD->YYYY-MM-DD)
 * @param cell
 * @returns
 */
function eXcell_dateFormated(cell){ //the eXcell name is defined here
    if (cell){                 //the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        eXcell_ed.call(this); //uses methods of the "ed" type
    }    
    this.setValue=function(val){
        if(gf_IsNull(val)) this.setCValue(''); 
        else this.setCValue(val.toDate().format('YYYY-MM-DD'),val);                                     
    }
    this.getValue=function(){
    	return this.cell.innerHTML; // get button label
    }
}
eXcell_dateFormated.prototype = new eXcell;// nests all other methods from the base class

/**
 * 그리드 셀타입 사용여부 (1->사용, 0->미사용)
 * @param cell
 * @returns
 */
function eXcell_useAtro(cell){ //the eXcell name is defined here
    if (cell){                 //the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;        
    }
    this.edit = function(){} //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; } 
    this.setValue=function(val){
        if(gf_IsNull(val)) {
        	this.setCValue('미사용'); 
        } else {
        	if(val == '1') {
        		this.setCValue('사용', val);
        	} else {
        		this.setCValue('미사용', val);        	                                    
        	}
        }
    }
    this.getValue=function(){	 
		return (this.cell.innerText == '사용') ? '1' : '0'
    }
}
eXcell_useAtro.prototype = new eXcell;// nests all other methods from the base class


/**
 * 주민번호 마스킹(읽기전용)
 * @param cell
 * @returns
 */
function eXcell_juminMaskro(cell){ //the eXcell name is defined here
    if (cell){                //the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){} //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; } 
    this.setValue=function(val){
    	if(gf_IsNull(val)) this.setCValue(''); 
    	else this.setCValue(gf_SettingJuminMask(val),val);  
    }
    this.getValue=function(){
    	return this.cell.innerHTML; // get button label
    }
}
eXcell_juminMaskro.prototype = new eXcell; // nests all other methods from the base class

/**
 * 주민번호 마스킹(편집가능)
 * @param cell
 * @returns
 */
function eXcell_juminMasked(cell){ //the eXcell name is defined here
    if (cell){                //the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        eXcell_ed.call(this); //uses methods of the "ed" type
    }
    this.setValue=function(val){
    	if(gf_IsNull(val)) this.setCValue(''); 
    	else this.setCValue(gf_SettingJuminMask(val),val);  
    }
    this.getValue=function(){
    	return this.cell.innerHTML; // get button label
    }
}
eXcell_juminMasked.prototype = new eXcell; // nests all other methods from the base class

function eXcell_searchImgButton(cell){ 
    if (cell){             
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  
   
    this.isDisabled = function(){ return true; }
    this.setValue = function(val){
        this.setCValue('<span class="glyphicon glyphicon glyphicon-search"></span>');                                      
    }
}
eXcell_searchImgButton.prototype = new eXcell;

function gf_GridValicationMaxLength(grid, stage, cInd, cNm, num){
	if (stage == 1 && cInd == grid.getColIndexById(cNm)) {		
		grid.editor.obj.onkeypress = function() {
			return grid.editor.obj.value.length < num;
		}
	}
}
