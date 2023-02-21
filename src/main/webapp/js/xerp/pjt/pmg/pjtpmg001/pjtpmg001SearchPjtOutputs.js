/**
 * 프로그램	: 프로젝트현황 산출물 등록화면 javascript
 * 작성자 	: 디비비전
 * 작성일자 	: 2020.01.14
 * 사용테이블 	: PJT_PROJECT
 **/

$(function() {	
    cf_InitParamOutputs();
    cf_SetComponentsOutputs();
    cf_SetEventListenerOutputs();
    cf_SetBindingOutputs();
    cf_InitFormOutputs();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>                                                   
 ******************************************************************************************************************************/
var cf_InitParamOutputs = function (){};


$(window).resize(function() {
	dhxWindows.setSizes();
});


var dhxGridPjtOutputs;
var cf_SetComponentsOutputs = function (){	
	var dhxGridPjtOutputsListInfo = [];
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('<input type="checkbox" id="checkAllPjtOutputs" />', '5', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('작성단계', '10', 'center', 'str', 'ro', false, 'codeNm', '', ''));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('단계활동', '15', 'center', 'str', 'ro', false, 'outputNm', '', ''));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('산출물', '15', 'center', 'str', 'ro', false, 'outputDetailCodeNm', '', ''));	
	//dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeader("등록일자",'100','center','date','dhxCalendarA',false,'writeDt',''));
	//dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButton',false,'num',''));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('산출개요', '15', 'left', 'str', 'ed', false, 'outputCn', '' , ''));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('계획일수', '10', 'center', 'str', 'edn', false, 'planDaycnt', '', 'ValidInteger'));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('진행률(%)', '10', 'center', 'str', 'edn', false, 'progrsRt', '','ValidInteger'));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('완료여부', '10', 'center', 'str', 'ch', false, 'comptAt', '', ''));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('첨부파일등록', '*', 'center', 'str', 'ro', false, 'atchmnfl', '', ''));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('atchmnflOrg', '', 'left', 'str', 'ro', true, 'atchmnflOrg', '', ''));	
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('projectSn', '0', 'center', 'str', 'ro', true, 'projectSn', '', ''));
	dhxGridPjtOutputsListInfo.push(gf_MakeDhxGridHeaderP('outputSn', '0', 'center', 'str', 'ro', true, 'outputSn', '', ''));
	dhxGridPjtOutputs = gf_MakeDhxGridP('dataListPjtOutputs', dhxGridPjtOutputsListInfo, true, false, false);
	
	dhxGridPjtOutputs.enableRowspan(true);	
	dhxGridPjtOutputs.setDateFormat("%Y-%m-%d"); 
	
	
	dhxGridPjtOutputs.enableAutoWidth(false);
	dhxGridPjtOutputs.setColumnMinWidth(120,8); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtOutputs.adjustColumnSize(0);	
	
	dhxGridPjtOutputs.attachEvent("onCheck", function(rId,cInd,state){ 
		if(cInd == 7){
			if(state == true){
				dhxGridPjtOutputs.cells(rId,dhxGridPjtOutputs.getColIndexById("progrsRt")).setValue('100');	
			} else {
				dhxGridPjtOutputs.cells(rId,dhxGridPjtOutputs.getColIndexById("progrsRt")).setValue('');	
			}
		}
	});
	
	
	dhxGridPjtOutputs.attachEvent("onCellChanged", function(rId,cInd,nValue){ 
		if(cInd == 6){
			if(nValue == "100"){
				dhxGridPjtOutputs.cells(rId, gf_GetDhxGridColumId(dhxGridPjtOutputs, 'comptAt')).setValue(1);
			} else {
				dhxGridPjtOutputs.cells(rId, gf_GetDhxGridColumId(dhxGridPjtOutputs, 'comptAt')).setValue(0);
			}
		}
	});

};

var cf_SetEventListenerOutputs = function (){
	$('#tabProjectOutputs').unbind('click').bind('click', function(event){		 
		$('ul.project_tab li').attr('class','');
		$(this).attr('class','active');
		fn_SearchProjectOutputs();
    });
	$('#tabProjectManageOutputs').unbind('click').bind('click', function(event){		 
		$('ul.project_tab li').attr('class','');
		$(this).attr('class','active');
		fn_SearchProjectOutputs();
    });	
	$('#dtnAddPjtOutputsPopup').unbind('click').bind('click', function(event){
		var edCnt = 0;
		dhxGridPjtOutputs.forEachRow(function(rowId) {
			if(!gf_IsNull(dhxDataProcessorPjtOutputs.getState(rowId))) {
				edCnt++;
			}
	    });
		
		if(edCnt == 0){
			if($('#tabProjectOutputs').hasClass('active')) { 
				fn_PjtOutputsPopupPjtOutputs('P','');
			} else { 
				fn_PjtOutputsPopupPjtOutputs('M','');
			}
		}
		else {
			  gf_DivMsgAlert("저장 후 산출물추가 버튼을 클릭해주시기 바랍니다."); 
		}

    });
	$('#btnGridOutputsPA').unbind('click').bind('click', function(event){
		if($('#tabProjectOutputs').hasClass('active')) { 
			fn_PjtOutputsPopupPjtOutputs('P','PA');
		} else { 
			fn_PjtOutputsPopupPjtOutputs('M','PA');
		}
    }); 
	$('#btnGridOutputsPU').unbind('click').bind('click', function(event){
		if($('#tabProjectOutputs').hasClass('active')) { 
			fn_PjtOutputsPopupPjtOutputs('P','PU');
		} else { 
			fn_PjtOutputsPopupPjtOutputs('M','PU');
		}
    });
	$('#btnGridOutputsPE').unbind('click').bind('click', function(event){
		if($('#tabProjectOutputs').hasClass('active')) { 
			fn_PjtOutputsPopupPjtOutputs('P','PE');
		} else { 
			fn_PjtOutputsPopupPjtOutputs('M','PE');
		}
    });
	$('#btnGridOutputsPD').unbind('click').bind('click', function(event){
		if($('#tabProjectOutputs').hasClass('active')) { 
			fn_PjtOutputsPopupPjtOutputs('P','PD');
		} else { 
			fn_PjtOutputsPopupPjtOutputs('M','PD');
		}
    });
	$('#btnGridOutputsPC').unbind('click').bind('click', function(event){
		if($('#tabProjectOutputs').hasClass('active')) { 
			fn_PjtOutputsPopupPjtOutputs('P','PC');
		} else { 
			fn_PjtOutputsPopupPjtOutputs('M','PC');
		}
    });
	$('#btnGridOutputsPT').unbind('click').bind('click', function(event){
		if($('#tabProjectOutputs').hasClass('active')) { 
			fn_PjtOutputsPopupPjtOutputs('P','PT');
		} else { 
			fn_PjtOutputsPopupPjtOutputs('M','PT');
		}
    });
	$('#btnGridOutputsPH').unbind('click').bind('click', function(event){
		if($('#tabProjectOutputs').hasClass('active')) { 
			fn_PjtOutputsPopupPjtOutputs('P','PH');
		} else { 
			fn_PjtOutputsPopupPjtOutputs('M','PH');
		}
    });
	$('#btnGridOutputsPM').unbind('click').bind('click', function(event){
		if($('#tabProjectOutputs').hasClass('active')) { 
			fn_PjtOutputsPopupPjtOutputs('P','PM');
		} else { 
			fn_PjtOutputsPopupPjtOutputs('M','PM');
		}
    });	
	$('#checkAllPjtOutputs').unbind("click").bind("click",function() { 
		fn_CheckAllGrid(dhxGridPjtOutputs, $("#checkAllPjtOutputs").prop("checked"), 'selYn'); 
	});
	$('#dtnRemovePjtOutputs').unbind("click").bind("click",function() { 
		fn_RemovPjtOutputs();
	});
	$('#dtnSavePjtOutputs').unbind('click').bind('click', function() {
    	if(fn_GridValidation()) dhxDataProcessorPjtOutputs.sendData();    	
    });
};

var cf_SetBindingOutputs = function (){
	fn_SearchProjectOutputs();
};

var cf_InitFormOutputs = function (){};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
var fn_GridPjtOutputsCalendar = function (rid) {		
	var strGridDate = gf_DhxGetValue(dhxGridPjtOutputs, rid, 'writeDt', 'grid');	
	var target = $('#gridImgCal_' + rid);
	var nTop = (target.offset().top).toFixed(0);
	var nLeft = (target.offset().left).toFixed(0);
	var calLeft = dhxGridPjtOutputs._grid_calendarA._px;
	if(typeof calLeft == "undefined" || calLeft == null || calLeft == 0){
		dhxGridPjtOutputs._grid_calendarA._px = nLeft-10;
	}
	dhxGridPjtOutputs._grid_calendarA._py = nTop-7;	
	dhxGridPjtOutputs._grid_calendarA.setDate(strGridDate);
	strGetRowChk = rid;
	dhxGridPjtOutputs._grid_calendarA._show();
};
var eXcell_datePickerButton = function(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; }
    this.setValue = function(val){
        this.setCValue("<div id=''></div><img alt='' src='/xerp/img/sub/icon_calen.png' style='cursor:pointer' id='gridImgCal_" + val + "' onClick='javascript:fn_GridPjtOutputsCalendar("+val+");'>");                                      
    }
}
eXcell_datePickerButton.prototype = new eXcell;// nests all other methods from the base class 
var fn_gridPjtOutputsGetDate = function (strDate) {
	if(strGetRowChk > 0){
		if(!gf_IsNull(strDate)){			
			var dd = strDate.getDate();
			var mm = strDate.getMonth()+1; //January is 0!
			var yyyy = strDate.getFullYear();
			dd = dd < 10 ? '0'+dd:dd;
			mm = mm < 10 ? '0'+mm:mm;	 		
			gf_DhxSetValue(dhxGridPjtOutputs, strGetRowChk, 'writeDt', yyyy+'-'+mm+'-'+dd, 'grid');
		}
		strGetRowChk = 0;
	}
}
var fn_CheckAllGrid = function (dhxGrid, status, cid){
	dhxGrid.forEachRow(function(rowId) {
		dhxGrid.cells(rowId, gf_GetDhxGridColumId(dhxGrid, cid)).setChecked(status);
    });
};
var fn_GetCheckedGridValueArr = function (dhxGrid, checkCid, cid){
	var returnIds = [];
	dhxGrid.forEachRow(function(rowId) {
		if(dhxGrid.cells(rowId, gf_GetDhxGridColumId(dhxGrid, checkCid)).isChecked()){
			returnIds.push( dhxGrid.cells(rowId,gf_GetDhxGridColumId(dhxGrid, cid)).getValue() );
		}
	});
	return returnIds;
};
/*********************************************************조회**********************************************************/
var fn_SearchProjectOutputs = function() {
	var outputSe;
	if($('#tabProjectManageOutputs').hasClass('active')) { 
		outputSe = 'M';
	} else { 
		outputSe = 'P';
	}	
	var jsonParameter = { 
	    projectSn : projectSn,
	    outputSe : outputSe			
	};
	gf_Transaction(jsonParameter, 'pjtpmg001/searchPjtOutputs', jsonParameter, 'fn_CallbackSearchProjectOutputs', false, 'GET');
};

var eventIds = [];
var dhxDataProcessorPjtOutputs;
var fn_CallbackSearchProjectOutputs = function (strSvcID, targetID, data){	 
	dhxGridPjtOutputs.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListPjtOutputs');
        dhxGridPjtOutputs.parse(data.data.records, 'js');
        //eventIds = gf_GridDetachEvent(dhxGridPjtOutputs, eventIds);
        //eventIds.push( dhxGridPjtOutputs._grid_calendarA.attachEvent("onClick", function(date) { fn_gridPjtOutputsGetDate( dhxGridPjtOutputs._grid_calendarA.getDate() ); }));

        dhxDataProcessorPjtOutputs = new dataProcessor("/xerp/pjtpmg001/modifyPjtOutputs"); //lock feed url
        dhxDataProcessorPjtOutputs.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
        dhxDataProcessorPjtOutputs.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
        //dhxDataProcessorPjtOutputs.setVerificator(gf_GetDhxGridColumId(dhxGridPjtOutputs,'planDaycnt'), dhtmlxValidation.ValidNumeric);
        //dhxDataProcessorPjtOutputs.setVerificator(gf_GetDhxGridColumId(dhxGridPjtOutputs,'progrsRt'), dhtmlxValidation.ValidNumeric);        
        dhxDataProcessorPjtOutputs.init(dhxGridPjtOutputs); //link dataprocessor to the grid
        dhxDataProcessorPjtOutputs.styles = {
				updated:	"font-weight:normal;text-decoration:none;",
				inserted:	"font-weight:bold; color:green;",
				deleted:	"color:orange; text-decoration:line-through;",
				invalid:	"color:green; text-decoration:underline;",
				error:		"color:blue; text-decoration:underline;",
				clear:		"font-weight:normal;text-decoration:none;"
		};
        dhxDataProcessorPjtOutputs.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
        	if (dataSource.code == "000" || dataSource.data.code !== "000"){
        		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        		fn_SearchProjectOutputs();
        		return true;
    	 	} else {
    	 		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    	 		return false;
    	 	}
        });
        
    } else {
        gf_NoFoundDataOnGridMsg('dataListPjtOutputs');       
    }
    $("#spanCntPjtOutputs").text(data.data.records.length);
    cf_SetEventListenerOutputs();
};
/**********************************************************첨부파일등록****************************************************************/
var outputsFileKeyArr = [];
var fn_FileUploadPopUpPjtOutputs = function(rowId){
	
	var atchmnfl = gf_DhxGetValue(dhxGridPjtOutputs, rowId, 'atchmnflOrg', 'grid');
	outputsFileKeyArr = gf_IsNull(atchmnfl) ? [] : atchmnfl.split('|');  
	
	gf_FileUploadPopup(
			 '', 
			 '', 
			 '', 
			 rowId, 
			 outputsFileKeyArr, 
			 [], 
			 0,
			 'all',
	         'fn_CallBackFileUploadPopUpPjtOutputs');
};

var fn_CallBackFileUploadPopUpPjtOutputs = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){	
	 	
	var idx = 0;
	var fileInfos = [];
	var atchFileList = [];
	var rowId = dataDivId;
	keyArr = [];
	infoArr = [];
	$.each( data, function( key, value ) {						
		fileInfos = value.split('|^|');			
		keyArr.push(fileInfos[0]);
		infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
	});
	outputsFileKeyArr = [];
	outputsFileKeyArr = keyArr;
	
	var atchmnfl = gf_DhxGetValue(dhxGridPjtOutputs, rowId, 'atchmnflOrg', 'grid');
	var outputsFileKeyArrB = gf_IsNull(atchmnfl) ? [] : atchmnfl.split('|');  
	
	var atchSizeStr;
	
	if(keyArr.length > 0) {
		atchSizeStr = '<span style="color:red; font-weight:bold">'+keyArr.length+'</span>';
	} else {
		atchSizeStr = keyArr.length;
	}
 
	var uploadFileGrid = '<a href="#none" onclick="fn_FileUploadPopUpPjtOutputs('+rowId+')"><span class="glyphicon glyphicon glyphicon-floppy-disk"></span>&nbsp;('+atchSizeStr+')</a>';
	gf_DhxSetValue(dhxGridPjtOutputs, rowId, 'atchmnfl', uploadFileGrid, 'grid'); 
	gf_DhxSetValue(dhxGridPjtOutputs, rowId, 'atchmnflOrg', outputsFileKeyArr.join("|"), 'grid'); 
	
	if(outputsFileKeyArrB.length != keyArr.length){
		dhxDataProcessorPjtOutputs.setUpdated(rowId, true, 'updated');	
	}
	

};
/**********************************************************산출물 등록**************************************************************/
var returnPjtOutputsArr = [];
var fn_PjtOutputsPopupPjtOutputs = function(ouputsType, step) {
	var dhxWindowObj;
	var dhxWindows;
	var title;
	var callbacks = $.Callbacks();
	var callFunction = eval('fn_CallbackPjtOutputsPopupPjtOutputs');	
	if($('body').find("div[id='pjtOutputsPopup']").size() <= 0) {
		$('body').append("<div id='pjtOutputsPopup'><div class='b-close' style='display:none'></div></div>");
	}
	
	if($('#tabProjectManageOutputs').hasClass('active')) { 
		title = '관리 산출물 조회';
	} else { 
		title = '개발 산출물 조회';
	}
	
	$('#pjtOutputsPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();			
			var id 		= 'pjtOutputsPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/searchPjtOutputs/view?projectSn='+projectSn+'&ouputsType='+ouputsType+'&step='+step;
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 535;
			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.attachEvent('onClose', function(win){
				$('#pjtOutputsPopup .b-close').click();
			});
		},
		onClose:function(){

			callbacks.empty();
			callbacks.add(callFunction);
            callbacks.fire(returnPjtOutputsArr);

			dhxWindows.unload();
			$('body').find("div[id='pjtOutputsPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

var fn_CallbackPjtOutputsPopupPjtOutputs = function(outputs){
	
	gf_Trace(outputs);
	
	if(!gf_IsNull(outputs)){
		var jsonParameter = {
			outputs : outputs,
			projectSn : projectSn
	    };
		var dataSource = gf_NoAsyncTransaction('pjtpmg001/savePjtOutputs', jsonParameter, 'POST');
	    var data = dataSource.data;
	    if(dataSource.code === '000') {
	    	fn_SearchProjectOutputs();
	    } else {
	    	gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	        return false;
	    }
	}
};
/**********************************************************산출물 삭제**************************************************************/
var fn_RemovPjtOutputs = function(){	
	var checkArr = fn_GetCheckedGridValueArr(dhxGridPjtOutputs, 'selYn', 'outputSn');
	if(gf_IsNull(checkArr)){
		gf_DivMsgAlert('삭제할 산출물를 선택해 주세요.');
        return false;
	} else{
		dhxGridPjtOutputs.forEachRow(function(rowId) {
			if(dhxGridPjtOutputs.cells(rowId, gf_GetDhxGridColumId(dhxGridPjtOutputs, 'selYn')).isChecked()){
				dhxDataProcessorPjtOutputs.setUpdated(rowId, true, 'deleted');
			}
		});
	}
};
/**********************************************************산출물 validation******************************************************/
var fn_GridValidation = function(){
	var valid = true;
	dhxGridPjtOutputs.forEachRow(function(rowId) {

		//if(!gf_IsNull(dhxDataProcessorPjtOutputs.getState(rowId))) {
			if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridPjtOutputs, rowId, 'planDaycnt', 'grid') )){
				gf_DivMsgAlert("계획일수는 숫자만 입력 가능합니다.");
				gf_DhxSetValue(dhxGridPjtOutputs, rowId, 'planDaycnt', '', 'grid');
				fn_GridValidationSelectCell(dhxGridPjtOutputs, rowId, 'planDaycnt');
				valid = false;
			}
			if(!gv_ValidateMethods.maxlength( gf_DhxGetValue(dhxGridPjtOutputs, rowId, 'planDaycnt', 'grid'),'3' )){
				gf_DivMsgAlert("계획일수는 3자리 이하만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridPjtOutputs, rowId, 'planDaycnt');
				valid = false;
			}
			if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridPjtOutputs, rowId, 'progrsRt', 'grid') )){
				gf_DivMsgAlert("진행률(%)는 숫자만 입력 가능합니다.");
				gf_DhxSetValue(dhxGridPjtOutputs, rowId, 'progrsRt', '', 'grid');
				fn_GridValidationSelectCell(dhxGridPjtOutputs, rowId, 'progrsRt');
				valid = false;
			}		
			if(!gv_ValidateMethods.maxlength( gf_DhxGetValue(dhxGridPjtOutputs, rowId, 'progrsRt', 'grid') ,'10')){
				gf_DivMsgAlert("진행률(%)는 10자리 이하만 입력 가능합니다.");
				fn_GridValidationSelectCell(dhxGridPjtOutputs, rowId, 'progrsRt');
				valid = false;
			}	
		//}
    });
	return valid;	 
}

var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
	dhxGrid.forEachRow(function(rowId) {
		if(!gf_IsNull(dhxDataProcessorPjtOutputs.getState(rowId))) {
			dhxGrid.forEachCell(rowId, function(cellObj, ind){
				dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
			});
		}
	});
	setTimeout(function(){
		gf_DhxSetValue(dhxGrid, rId, cInd, '', 'grid');
		dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
	},1);
}