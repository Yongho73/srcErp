/**
 *    프로그램       : 계정별 관리항목 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.22
 *    사용테이블      : MFS_ACNT_MGRT_ITEM
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/

/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMfsbsc007();
    cf_SetComponentsMfsbsc007();
    cf_SetEventListenerMfsbsc007();
    cf_InitFormMfsbsc007();
    cf_SetBindingMfsbsc007();    
    gf_IframeHeightResize(true);
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMfsbsc007 = function() {
    gf_SetMenuPath();
   // $('#saveFormMfsbsc007').validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('divSearchComboAcntSeCode', 'comboSrhAcntSeCode', 'comboSrhAcntSeCode', 'search', 'C037', '' , '', '','ordr', '', '',''); //계정유형  acntSeCode
   
    //사용자정보 
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode =userInfo.data.bplcCode    
    
    
};

var dhxGridMfsbsc007;
var dhxGridMfsbsc007sub;
var cf_SetComponentsMfsbsc007 = function() {
	
    var dhxGridMfsbsc001HeaderInfo = [];
    dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
    dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('계정코드', '150', 'center', 'str', 'ro', false, 'acntCode', '', '')); /* gf_LocaleTrans('default', 'titAcntCode') */
    dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('계정명', '*', 'left', 'str', 'ro', false, 'acntNm', '', '')); /* gf_LocaleTrans('default', 'titAcntNm') */
    dhxGridMfsbsc001HeaderInfo.push(gf_MakeDhxGridHeader('기표여부','80', 'center', 'str', 'ch', false, 'slipBaltAt', '', '')); 
    
    dhxGridMfsbsc007 = gf_MakeDhxGrid('dataListMfsbsc007', dhxGridMfsbsc001HeaderInfo, true, false, false);
    dhxGridMfsbsc007.enableAutoWidth(true);
    
	
    var dhxGridMfsbsc007HeaderInfo = [];
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); 
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMfsbsc007sub" />', '40', 'center', 'na', 'ch', false, 'selYn', '', '')); // 
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('관리항목번호', '100', 'center', 'str', 'ro', false, 'mgrtItemSn', '', '')); /* gf_LocaleTrans('default', 'titMgrtItemSn') */
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('관리항목명', '100', 'center', 'str', 'ro', false, 'mgrtItemNm', '', '')); /* gf_LocaleTrans('default', 'titAcntCode') */
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','searchImgButton',false,'searchImgButton','',''));
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('입력구분', '100', 'center', 'str', 'coro', false, 'inputSeCode', '', ''));     
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('차변대변구분', '100', 'center', 'str', 'coro', false, 'drcrSeCode', '', '')); /* gf_LocaleTrans('default', 'titDrcrSeCode') */
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('필수여부', '100', 'center', 'str', 'ch', false, 'mustAt', '', '')); /* gf_LocaleTrans('default', 'titMustAt') */
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('순서', '100', 'center', 'str', 'edn', false, 'sortOrdr', '', '')); /* gf_LocaleTrans('default', 'titSortOrdr') */
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '100', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMfsbsc007HeaderInfo.push(gf_MakeDhxGridHeader('계정코드', '0', 'center', 'str', 'ro', true, 'acntCode', '', '')); /* gf_LocaleTrans('default', 'titAcntCode') */
   
    
    dhxGridMfsbsc007sub = gf_MakeDhxGrid('dataListMfsbsc007sub', dhxGridMfsbsc007HeaderInfo, true, false, false);
    dhxGridMfsbsc007sub.enableAutoWidth(true);
    
    dhxGridMfsbsc007sub.enableEditEvents(true,false,false); //원클릭, 더블클릭, F2key 
    dhxGridMfsbsc007sub.setEditable (true);
 
    //입력방식 
    var jsonParameter = {codekindCode : "C168",exceptCode :"",sortOrder :"ordr" };  
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridMfsbsc007sub, dhxGridMfsbsc007sub.getColIndexById("inputSeCode"), dataSource.data); /* 그리드콤보*/


    //차대구분 
    var jsonParameter = {codekindCode : "C045",exceptCode :"",sortOrder :"ordr" };  
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridMfsbsc007sub, dhxGridMfsbsc007sub.getColIndexById("drcrSeCode"), dataSource.data); /* 그리드콤보*/    
    
    dhxDataProcessor = new dataProcessor(gv_ContextPath +"/mfsbsc007/saveMfsbsc007");
    
    dhxDataProcessor.setUpdateMode("off"); //기본은 그리드를 변경할때마낟 데이터가 서버로 전송됨 , 자동업데이트 모드 비활성화 
    dhxDataProcessor.setTransactionMode('POST',true);   //GET|POST|REST|JSON, true (한번에 전송 )
    //dhxDataProcessor.enableDataNames(true);  //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessor.init(dhxGridMfsbsc007sub);
    dhxDataProcessor.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	}; 
};

var eventIds = [];
var eventSubIds = [];
var cf_SetEventListenerMfsbsc007 = function() {
    // grid event
    var eventId;
    var eventIdSub;
    eventIds = gf_GridDetachEvent(dhxGridMfsbsc007, eventIds);
    eventId = dhxGridMfsbsc007.attachEvent('onKeyPress', function(keyCode, ctrl, shift, event_object) {
        if(keyCode == 113) fn_ExcelMfsbsc007();
    });
    eventIds.push(eventId);
    eventId = dhxGridMfsbsc007.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_SelectedMfsbsc007();
    });
    eventIds.push(eventId);
    
    
    eventIdSub = dhxGridMfsbsc007sub.attachEvent('onRowSelect', function(rId,cInd) {
    	if(cInd == gf_GetDhxGridColumId(dhxGridMfsbsc007sub, 'searchImgButton')) { 
    		gf_Trace(gf_GetDhxGridColumId(dhxGridMfsbsc007sub, 'searchImgButton'));
    		dhxGridMfsbsc007sub.detachEvent(eventIdSub);
    		fn_gridSearchItem( rId );
    	}	    	
    });
    eventSubIds.push(eventIdSub);    
    
    
    // button event
    $('#btnAddMfsbsc007').unbind('click').bind('click', function(event){
        fn_AddMfsbsc007()
    });
    $('#btnSaveMfsbsc007').unbind('click').bind('click', function() {
        fn_SaveMfsbsc007();
    });
    $('#btnRemoveMfsbsc007').unbind('click').bind('click', function() {
        fn_RemoveMfsbsc007();
    });
    $('#btnExcelMfsbsc007').unbind('click').bind('click', function() {
        fn_ExcelMfsbsc007();
    });
    $('#btnSearchMfsbsc007').unbind('click').bind('click', function(event){
        fn_SearchMfsbsc007();
    });
    $('#btnResetMfsbsc007').unbind('click').bind('click',function() {
        cf_InitFormMfsbsc007();
    });
    // other event
    $('#checkAllMfsbsc007sub').unbind('click').bind('click',function() {
        gf_DhxCheckAllGridHeader(dhxGridMfsbsc007sub, $('#checkAllMfsbsc007sub').prop('checked'), 'selYn');
    });
};

var cf_InitFormMfsbsc007 = function() {
    $('#searchFormMfsbsc007').clearForm();
};

var cf_SetBindingMfsbsc007 = function() {
    fn_SearchMfsbsc007();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMfsbsc007 = function(key) {
    var jsonParameter = {
        	acntSeCode : gf_FormGetValue('searchFormMfsbsc007', 'comboSrhAcntSeCode', 'combo'),
            acntCode : gf_FormGetValue('searchFormMfsbsc007', 'acntCode', 'text'),
            acntNm : gf_FormGetValue('searchFormMfsbsc007', 'acntNm', 'text'),
    };

    gf_Transaction(key, 'mfsbsc001/searchMfsbsc001', jsonParameter, 'fn_CallbackSearchMfsbsc007', false, 'GET');
};

var fn_CallbackSearchMfsbsc007 = function(strSvcID, targetID, data) {
    dhxGridMfsbsc007.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc007');
        dhxGridMfsbsc007.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
        	var findCell = dhxGridMfsbsc007.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMfsbsc007,'acntCode'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridMfsbsc007.selectRowById(findCell[0][0]);
            } else {
                dhxGridMfsbsc007.selectRow(0);
            }
        } else {
            dhxGridMfsbsc007.selectRow(0);
        }
       fn_SelectedMfsbsc007();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMfsbsc007');
    }
    $('#spanCntMfsbsc007').text(data.data.records.length);
    cf_SetEventListenerMfsbsc007();
};
/**
 * 상세조회
 */
var fn_SelectedMfsbsc007 = function () {
	var acntCode = dhxGridMfsbsc007.cells(dhxGridMfsbsc007.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc007,'acntCode')).getValue();  //계정코드
	var slipBaltAt = dhxGridMfsbsc007.cells(dhxGridMfsbsc007.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc007,'slipBaltAt')).getValue();  //계정코드

	if (!gf_IsNull(slipBaltAt) &&  slipBaltAt =='1') {
	    if (!gf_IsNull(acntCode) ) {
	        var jsonParameter = {
	        		acntCode : acntCode,
	        };
	        gf_Transaction(jsonParameter, 'mfsbsc007/searchMfsbsc007', jsonParameter, 'fn_CallbackSearchMfsbsc007sub', false, 'GET');              
	    }		
	}else{
		gf_DivMsgAlert("기표계정인 경우에만 관리가 가능합니다.");
	}


};
//서브그리드 콜백 
var fn_CallbackSearchMfsbsc007sub = function(strSvcID, targetID, data) {
    dhxGridMfsbsc007sub.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMfsbsc007sub');
        dhxGridMfsbsc007sub.parse(data.data.records, 'js');
        if(!gf_IsNull(strSvcID)) {
        	var findCell = dhxGridMfsbsc007sub.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMfsbsc007sub,'acntCode'), true);
            if(!gf_IsNull(findCell)) {
                dhxGridMfsbsc007sub.selectRowById(findCell[0][0]);
            } else {
                dhxGridMfsbsc007sub.selectRow(0);
            }
        } else {
            dhxGridMfsbsc007sub.selectRow(0);
        }
    } else {
        gf_NoFoundDataOnGridMsg('dataListMfsbsc007sub');
    }
    //$('#spanCntMfsbsc007sub').text(data.data.records.length);
    //cf_SetEventListenerMfsbsc007();
};


/**
 * 그리드 추가 
 */
var fn_AddMfsbsc007 = function() {
	var acntCode 	= dhxGridMfsbsc007.cells(dhxGridMfsbsc007.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMfsbsc007,'acntCode')).getValue();
	//gf_Trace(acntCode);
	
    dhxGridMfsbsc007sub.clearSelection();
    dhxGridMfsbsc007sub.addRow(dhxGridMfsbsc007sub.uid(),['','','','','','','D','1','1','1','',acntCode],0);   //계정코드, 차변, 필수,1,사용
    dhxGridMfsbsc007sub.selectRow(0);
}

var fn_SaveMfsbsc007 = function() {  
	
	var ids = dhxGridMfsbsc007sub.getChangedRows(true);  //변경된 행의 ID리스트를 가져옵니다
	var ids_arr = ids.split(",");
	var i = 0;
	var j = 0;   	

	if (ids == "" || ids ==null ){
		gf_DivMsgAlert("변경된 행이 없습니다");
		return false;
	}	

	dhxDataProcessor.sendData();                                                         
	//저장후 메시지 처리                                                                     
	dhxDataProcessor.attachEvent("onAfterUpdate", function(id,action,tid,dataSource){   
    	if (dataSource.code !== "000"){                                                 
            gf_DivMsgAlert(dataSource.message);                               
    	}                                                                               
    	else {                                                                          
    		gf_DivMsgAlert(gv_MsgSave);  
    		fn_SelectedMfsbsc007(); //서브그리드만 재조회
    		//fn_SearchMfsbsc007();// 화면 전체조회 
    	 }                                                                                
	 }); 

};

/**
 * 삭제
 */
var fn_RemoveMfsbsc007 = function() {
	
    var mgrtItemSns = gf_GetCheckedGridValueArr(dhxGridMfsbsc007sub, 'selYn', 'mgrtItemSn');
    var acntCodes 	= gf_GetCheckedGridValueArr(dhxGridMfsbsc007sub, 'selYn', 'acntCode');
    var drcrSeCodes = gf_GetCheckedGridValueArr(dhxGridMfsbsc007sub, 'selYn', 'drcrSeCode');
    
    if(gf_IsNull(mgrtItemSns) && gf_IsNull(acntCodes) && gf_IsNull(drcrSeCodes)) {
    	 gf_DivMsgAlert('삭제할 관리항목번호를 선택해 주세요.');
         return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveMfsbsc007Send()', '');
    }
};

var fn_RemoveMfsbsc007Send = function() {
    var mgrtItemSns = gf_GetCheckedGridValueArr(dhxGridMfsbsc007sub, 'selYn', 'mgrtItemSn');
    var acntCodes 	= gf_GetCheckedGridValueArr(dhxGridMfsbsc007sub, 'selYn', 'acntCode');
    var drcrSeCodes = gf_GetCheckedGridValueArr(dhxGridMfsbsc007sub, 'selYn', 'drcrSeCode');
    
    var jsonParameter = {
        mgrtItemSns : mgrtItemSns.join(','),
        acntCodes : acntCodes.join(','),
        drcrSeCodes : drcrSeCodes.join(',')
    };
    var dataSource = gf_NoAsyncTransaction('mfsbsc007/removeMfsbsc007', jsonParameter, 'POST');
    if(dataSource.code === '000') {
		fn_SelectedMfsbsc007(); //서브그리드만 재조회
		//fn_SearchMfsbsc007();// 화면 전체조회 
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};

/**
 * 엑셀다운로드
 */
var fn_ExcelMfsbsc007 = function () {
    var titMfsbsc007 = '계정별 관리항목'; /* gf_LocaleTrans('default', 'titMfsbsc007') */
    var jsonParameter = {
        mgrtItemSn 	: gf_FormGetValue('searchFormMfsbsc007', 'mgrtItemSn', 'text'),
        acntCode 	: gf_FormGetValue('searchFormMfsbsc007', 'acntCode', 'text'),
        drcrSeCode 	: gf_FormGetValue('searchFormMfsbsc007', 'drcrSeCode', 'text')
    };
    var header = [[
        '관리항목순번' /* gf_LocaleTrans('default', 'titMgrtItemSn') */,
        '계정코드' /* gf_LocaleTrans('default', 'titAcntCode') */,
        '차변대변 구분 코드' /* gf_LocaleTrans('default', 'titDrcrSeCode') */,
        '필수 여부' /* gf_LocaleTrans('default', 'titMustAt') */,
        '정렬 순서' /* gf_LocaleTrans('default', 'titSortOrdr') */,
        '사용여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'mgrtItemSn', 'acntCode', 'drcrSeCode', 'mustAt', 'sortOrdr', 'useAt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMfsbsc007 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMfsbsc007;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mfsbsc007/excelMfsbsc007', jsonParameter);
};


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
	fn_MgrtItemCode("form1");
};
var fn_CallbackPop = function(data, rId) {
	dhxDataProcessor.setUpdated(rId, true, 'updated');
};

//관리항목 팝업 
var fn_MgrtItemCode= function (formId ) {
	
	var title  = "관리항목";

	var dhxWindowObj;
	var dhxWindows;
	if($('body').find("div[id='bpopupMfsbsc007']").size() <= 0) {
		$('body').append("<div id='bpopupMfsbsc007' formid='" + formId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupMfsbsc007').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			var id 		= 'bpopupMfsbsc007';
			var ajaxUrl = gv_ContextPath+'/mfsbsc007/popup/findMfsbsc007MgitItemList/view';
			var left	= 0;
			var top		= 0;
			var width	= 500;
			var height	= 600;
			
			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupMfsbsc007 .b-close').click();
			});
		},
		onClose:function(){						
			dhxWindows.unload();
			$('body').find("div[id='bpopupMfsbsc007']").remove();			
		}
	},function(){});

	return dhxWindowObj;
}


