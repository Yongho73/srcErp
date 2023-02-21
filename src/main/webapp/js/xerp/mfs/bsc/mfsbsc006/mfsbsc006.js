/**
 *    프로그램       : 관리항목 관리 화면 javascript
 *    작성자         : 디비비전
 *    작성일자       : 2020.04.22
 *    사용테이블     : MFS_MGRT_ITEM_CODE
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/

/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMfsbsc006();
    cf_SetComponentsMfsbsc006();
    cf_SetEventListenerMfsbsc006();
    cf_InitFormMfsbsc006();
    cf_SetBindingMfsbsc006();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMfsbsc006 = function() {
    gf_SetMenuPath();
    //$('#saveFormMfsbsc006').validate({ errorElement: 'div', ignore: '' });
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormMfsbsc006');

    //사용자정보 
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode =userInfo.data.bplcCode  
    
};

var dhxGridMfsbsc006;
var cf_SetComponentsMfsbsc006 = function() {
    var dhxGridMfsbsc006HeaderInfo = [];
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'rnum', '', '')); /* 번호 */
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMfsbsc006" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // /* 선택  */
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('관리항목번호', '100', 'center', 'str', 'ro', false, 'mgrtItemSn', '', '')); /* gf_LocaleTrans('default', 'titMgrtItemSn') */
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('관리항목명', '200', 'center', 'str', 'edn', false, 'mgrtItemNm', '', '')); /* gf_LocaleTrans('default', 'titMgrtItemNm') */
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('입력구분', '200', 'center', 'str', 'coro', false, 'inputSeCode', '', '')); /* gf_LocaleTrans('default', 'titInputSeCode') */
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('공통코드', '200', 'center', 'str', 'ro', false, 'codekindNm', '', ''));
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchImgButton',false,'searchImgButton','',''));
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'edn', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMfsbsc006HeaderInfo.push(gf_MakeDhxGridHeader('공통코드', '0', 'center', 'str', 'ro', true, 'codekindCode', '', ''));
    dhxGridMfsbsc006 = gf_MakeDhxGrid('dataListMfsbsc006', dhxGridMfsbsc006HeaderInfo, true, false, false);
    dhxGridMfsbsc006.enableAutoWidth(true);
    dhxGridMfsbsc006.enableEditEvents(true,false,false); //원클릭, 더블클릭, F2key 
    dhxGridMfsbsc006.setEditable (true);
    
    //입력방식 
    var jsonParameter = {codekindCode : "C168",exceptCode :"",sortOrder :"ordr" };  
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridMfsbsc006, dhxGridMfsbsc006.getColIndexById("inputSeCode"), dataSource.data); /* 그리드콤보*/
    
    
};

var eventIds = [];
var eventSubIds = [];
var cf_SetEventListenerMfsbsc006 = function() {
    // grid event
    var eventId;
    
    eventIds = gf_GridDetachEvent(dhxGridMfsbsc006, eventIds);
    // grid sorting
    eventId = dhxGridMfsbsc006.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬  
       fn_SortGridList(ind, type, direction);
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc006.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) fn_ExcelMfsbsc006();
    });
    eventIds.push(eventId);

    var eventIdSub;    
    eventIdSub = dhxGridMfsbsc006.attachEvent('onRowSelect', function(rId,cInd) {
    	//dhxGridMfsbsc006.detachEvent(eventIdSub);
    	
    	var inputSeCode 	= dhxGridMfsbsc006.cells(dhxGridMfsbsc006.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc006,'inputSeCode')).getValue();  
    	
    	if(cInd == gf_GetDhxGridColumId(dhxGridMfsbsc006, 'searchImgButton')) { 
    		
    		if (inputSeCode=='001'){//공통코드방식 
    			fn_gridSearchItem( rId );
    		}else{
    			gf_DivMsgAlert("직접입력방식의 경우에는 제공되지 않습니다.");
    		}
    	}	    	
    	if(cInd == gf_GetDhxGridColumId(dhxGridMfsbsc006, 'inputSeCode')) { 
			if (inputSeCode=='002'){ //직접입력의 경우 공통코드 초기화 시킴 
	    		dhxGridMfsbsc006.cells(dhxGridMfsbsc006.getSelectedRowId(),dhxGridMfsbsc006.getColIndexById("codekindCode")).setValue("");
	    		dhxGridMfsbsc006.cells(dhxGridMfsbsc006.getSelectedRowId(),dhxGridMfsbsc006.getColIndexById("codekindNm")).setValue("");
			}
    	}
    	
    });
    eventSubIds.push(eventIdSub);    
    
    
    // button event
    //행추가 
    $('#btnAddMfsbsc006').unbind('click').bind('click', function(event){
        fn_AddMfsbsc006()
    });
    //그리드 저장 
    $('#btnSaveMfsbsc006').unbind('click').bind('click', function() {
        fn_SaveMfsbsc006();
    });
    $('#btnRemoveMfsbsc006').unbind('click').bind('click', function() {
        fn_RemoveMfsbsc006();
    });
    $('#btnExcelMfsbsc006').unbind('click').bind('click', function() {
        fn_ExcelMfsbsc006();
    });
    $('#btnSearchMfsbsc006').unbind('click').bind('click', function(event){
        // 재조회시 정렬 초기화
        fn_InitGridSort();
        fn_SearchMfsbsc006('1','');
    });
    $('#btnResetMfsbsc006').unbind('click').bind('click',function() {
        cf_InitFormMfsbsc006();
    });
    // other event
    $('#checkAllMfsbsc006').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridMfsbsc006, $('#checkAllMfsbsc006').prop('checked'), 'selYn');
    });
    $('#mgrtItemNmsearchFormMfsbsc006').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMfsbsc006').click(); event.preventDefault(); }
    });
};

var cf_InitFormMfsbsc006 = function() {
    $('#searchFormMfsbsc006').clearForm();
};

var cf_SetBindingMfsbsc006 = function() {
    fn_SearchMfsbsc006('1', '');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMfsbsc006 = function(pageNum, key) {

    var pageingCnt = gf_FormGetValue('pageingFormMfsbsc006', 'pageRowSize', 'combo');
    var page = pageNum;
    if(gf_IsNull(pageingCnt)) pageingCnt = 20;
    if(gf_IsNull(page)) page = 1;
    gf_FormSetValue('searchFormMfsbsc006', 'selectedPageNum', page, 'text');

    var jsonParameter = {
        mgrtItemNm : gf_FormGetValue('searchFormMfsbsc006', 'mgrtItemNm', 'text'),
        sortDirection : gf_FormGetValue('searchFormMfsbsc006', 'sortDirection', 'text'),
        sortColumId : gf_FormGetValue('searchFormMfsbsc006', 'sortColumId', 'text'),
        pageingCnt : pageingCnt,
        pageNum : page
    };
    gf_Transaction(key, 'mfsbsc006/searchMfsbsc006', jsonParameter, 'fn_CallbackSearchMfsbsc006', false, 'GET');
    
    
    dhxDataProcessor = new dataProcessor(gv_ContextPath +"/mfsbsc006/saveMfsbsc006");  
    
    dhxDataProcessor.init(dhxGridMfsbsc006);
    dhxDataProcessor.setUpdateMode("off"); //기본은 그리드를 변경할때마낟 데이터가 서버로 전송됨 , 자동업데이트 모드 비활성화 
    dhxDataProcessor.setTransactionMode('POST',true);   //GET|POST|REST|JSON, true (한번에 전송 )
    dhxDataProcessor.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};      
    
    
};

var fn_CallbackSearchMfsbsc006 = function(strSvcID, targetID, data) {
    dhxGridMfsbsc006.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc006');
        dhxGridMfsbsc006.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
            var findCell = dhxGridMfsbsc006.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMfsbsc006,'mgrtItemSn'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridMfsbsc006.selectRowById(findCell[0][0]);
            } else {
                dhxGridMfsbsc006.selectRow(0);
            }
        } else {
            dhxGridMfsbsc006.selectRow(0);
        }
        // 정렬 컬럼이 있으면 정렬 상태 유지
        var sortOrder = gf_FormGetValue('searchFormMfsbsc006', 'sortDirection','text');
        var sortColumId = gf_FormGetValue('searchFormMfsbsc006', 'sortColumId','text');
        if(!gf_IsNull(sortOrder) && !gf_IsNull(sortColumId)) {
            dhxGridMfsbsc006.setSortImgState(true, gf_GetDhxGridColumId(dhxGridMfsbsc006, sortColumId), sortOrder);
        }
    } else {
        gf_NoFoundDataOnGridMsg('dataListMfsbsc006');
    }
    $('#spanCntMfsbsc006').text(data.data.totalRecordCount);
    // 페이징 버튼 생성
    gf_PageNate(data.data,'.paging','fn_SearchMfsbsc006');
    cf_SetEventListenerMfsbsc006();
};


//행추가 
var fn_AddMfsbsc006 = function() {
	gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc006'); //조회된 데이터가 없습니다. 제거 
	
    dhxGridMfsbsc006.clearSelection();
    dhxGridMfsbsc006.addRow(dhxGridMfsbsc006.uid(),['','','','','001','','','1','',''],0);   //공통코드, 사용check
    dhxGridMfsbsc006.selectRow(0);

}

//저장 
var fn_SaveMfsbsc006 = function() {    

	var ids = dhxGridMfsbsc006.getChangedRows(true);  //변경된 행의 ID리스트를 가져옵니다
	var ids_arr = ids.split(",");
	var i = 0;
	var j = 0;   	

	if (ids == "" || ids ==null ){
		gf_DivMsgAlert("변경된 행이 없습니다");
		return false;
	}	
	
	if(fn_GridValidation()) dhxDataProcessor.sendData(); //유효성검사 
	 
	//저장후 메시지 처리                                                                     
	dhxDataProcessor.attachEvent("onAfterUpdate", function(id,action,tid,dataSource){   
    	if (dataSource.code !== "000"){                                                 
            gf_DivMsgAlert(dataSource.message);                               
    	}else {                                                                          
    		gf_DivMsgAlert(gv_MsgSave);  
    		fn_SearchMfsbsc006('1','');
    	 }                                                                                
	 }); 	
	

};

//삭제
var fn_RemoveMfsbsc006 = function() {
    var mgrtItemSns = gf_GetCheckedGridValueArr(dhxGridMfsbsc006, 'selYn', 'mgrtItemSn');
    if(gf_IsNull(mgrtItemSns)) {
        gf_DivMsgAlert('삭제할 관리항목번호를 선택해 주세요.');  /* gf_LocaleTrans('default', 'titmgrtItemSn') */
        return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMfsbsc006Send()', '');
    }
};

var fn_RemoveMfsbsc006Send = function() {
    var mgrtItemSns = gf_GetCheckedGridValueArr(dhxGridMfsbsc006, 'selYn', 'mgrtItemSn');
    var jsonParameter = {
        mgrtItemSns : mgrtItemSns.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc006/removeMfsbsc006', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchMfsbsc006();
        $("#checkAllMfsbsc006").prop('checked', false) ; //체크박스 해제 
        
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

/**
 * 엑셀다운로드
 */
var fn_ExcelMfsbsc006 = function () {
    var titMfsbsc006 = '관리항목'; /* gf_LocaleTrans('default', 'titMfsbsc006') */
    var jsonParameter = {
    		mgrtItemNm : gf_FormGetValue('searchFormMfsbsc006', 'mgrtItemNm', 'text')
    };
    var header = [[
        '관리항목번호' /* gf_LocaleTrans('default', 'titMgrtItemSn') */,
        '관리항목명' /* gf_LocaleTrans('default', 'titMgrtItemNm') */,
        '입력구분' /* gf_LocaleTrans('default', 'titInputSeCode') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'mgrtItemSn', 'mgrtItemNm', 'inputSeCode', 'useAt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMfsbsc006 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMfsbsc006;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mfsbsc006/excelMfsbsc006', jsonParameter);
};

/**
 * 그리드정렬
 */
var fn_SortGridList = function(ind, type, direction){
    if(ind != gf_GetDhxGridColumId(dhxGridMfsbsc006, 'rnum')){

        var sortOrder = gf_FormGetValue('dhxGridMfsbsc006', 'sortDirection', 'text');
        var sortColumId = gf_FormGetValue('dhxGridMfsbsc006', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMfsbsc006, ind);

        // 정렬 컬럼이 바뀌면 정렬방식 초기화
        if(sortColumId != nowSortColumId) sortOrder = '';
        sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;

        dhxGridMfsbsc006.setSortImgState(true, ind, sortOrder);
        gf_FormSetValue('searchFormMfsbsc006', 'sortDirection', sortOrder, 'text');
        gf_FormSetValue('searchFormMfsbsc006', 'sortColumId', gf_GetDhxGridColum(dhxGridMfsbsc006, ind), 'text');

        fn_SearchMfsbsc006(gf_FormGetValue('searchFormMfsbsc006', 'selectedPageNum', 'text'), '');
    }
}

var fn_InitGridSort = function(){
    dhxGridMfsbsc006.setSortImgState(false);
    gf_FormSetValue('searchFormMfsbsc006', 'sortDirection', '', 'text');
    gf_FormSetValue('searchFormMfsbsc006', 'sortColumId', '', 'text');
}



var eXcell_searchImgButton = function(cell){ 
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

var fn_gridSearchItem = function( rId ) {	
	gf_CodePopup("form1","","", gBplcCode, "N", fn_CallbackPopup); ;
};

var fn_CallbackPopup = function(data,rId) {
	
	//gf_Trace("data::"+JSON.stringify(data));
	    
	dhxGridMfsbsc006.cells(dhxGridMfsbsc006.getSelectedRowId(),dhxGridMfsbsc006.getColIndexById("codekindCode")).setValue(data.codekindCode);
	dhxGridMfsbsc006.cells(dhxGridMfsbsc006.getSelectedRowId(),dhxGridMfsbsc006.getColIndexById("codekindNm")).setValue(data.codekindNm);
	dhxGridMfsbsc006.cells(dhxGridMfsbsc006.getSelectedRowId(),dhxGridMfsbsc006.getColIndexById("mgrtItemNm")).setValue(data.codekindNm);
	
	
    dhxDataProcessor.setUpdated(dhxGridMfsbsc006.getSelectedRowId(), true, 'updated');
};


/* 그리드  Validation check */
var fn_GridValidation = function(){
	var valid = true;

	dhxGridMfsbsc006.forEachRow(function(rowId) {
		
		if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
			
			if(!gv_ValidateMethods.required(gf_DhxGetValue(dhxGridMfsbsc006, rowId, 'mgrtItemNm', 'grid') )){
				gf_DivMsgAlert("관리항목은  필수항목 입니다.");
				fn_GridValidationSelectCell(dhxGridMfsbsc006, rowId, 'mgrtItemNm',dhxDataProcessor);
				valid = false;
			}			
			gf_Trace("d::"+gf_DhxGetValue(dhxGridMfsbsc006, rowId, 'inputSeCode', 'grid') );
			
			if(gf_DhxGetValue(dhxGridMfsbsc006, rowId, 'inputSeCode', 'grid') =="001" && gf_DhxGetValue(dhxGridMfsbsc006, rowId, 'inputSeCode', 'grid')== ""  ){ //공통코드인 경우 
				gf_DivMsgAlert("공통코드를 입력해 주세요.");
				fn_GridValidationSelectCell(dhxGridMfsbsc006, rowId, 'codekindNm',dhxDataProcessor);
				valid = false;
			}

		}
		
    });
	return valid;	 
}

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd,dp){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dp.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}



