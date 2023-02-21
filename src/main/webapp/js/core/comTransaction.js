/*---------------------------------------------------------------------------------- 
 * 공통 팝업 UI 관련
----------------------------------------------------------------------------------*/

/**
 * 필수 입력 서버 체크
 * @param data
 * @returns
 */
var gf_ServerValidationMessage = function (data){
	
	var msg = ""; 				// 서버 메시지
	var defaultMessage = ""; 	// 오류디폴트메시지코드
	var errMsg = ""; 			// 에러메시지
	var minmaxmum = ""; 		// 최대, 최소 입력	
	var frmNm = ""; 			// 명칭
	var errMsgs = [];			// 에러메시지 출력
	var firstField = false;		// 최초 오류 항목 포커스
	
	$.each(data.data, function(key, value) { 
		$.each(value, function(key, value) { 			
			if(key ==='arguments') {
				$.each(value, function(key, value){					
					if(key === 0) {						
						if(!gf_IsNull(value.code)) frmNm = value.code;						
					}					
					if(key === 1) {
						if(!gf_IsNull(value.code)) minmaxmum = value.code;				
					}
				});
			}			
			if(key === 'defaultMessage') defaultMessage = value;
			if(key === 'field') {

				if(defaultMessage === 'errors.required')  errMsg = frmNm + " 필수 입력값입니다."; 
				if(defaultMessage === 'errors.minlength') errMsg = frmNm + " "+minmaxmum+"자 이상 입력해야 합니다."; 				
				if(defaultMessage === 'errors.maxlength') errMsg = frmNm + " "+minmaxmum+"자 이상 입력할수 없습니다.";					
				if(defaultMessage === 'errors.integer')   errMsg = frmNm + " 숫자만 입력하셔야 합니다.";
				
				if(!firstField){
					$('#'+value).focus();
					firstField = true;
				}
				
				errMsgs.push(errMsg);					
			}
		});
	});
	
	gf_DivMsgAlert(errMsgs.join(""));
};

/**
 * 서버 API 호출 
 * @param strSvcID
 * @param strSvcAct
 * @param jsonParameter
 * @param strCallbackFunc
 * @param isBlock
 * @returns
 */
var gf_Transaction = function(strSvcID, strSvcAct, jsonParameter, strCallbackFunc, isBlock, sendType) {
	
	var targetID = $(this);
	var callbacks = $.Callbacks();
    var callFunction = null;
    var ajaxUrl = gv_ServerApiUrl + "/" +strSvcAct;
    var tranRslt = true;
    
    if(gf_IsNull(sendType)) sendType = 'GET';

    isBlock = typeof(isBlock) == "undefined"? true: isBlock;
    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl;
    	
    if ( !gf_IsNull(strCallbackFunc) ) {
    	if(typeof(strCallbackFunc) == "string"){
	    	callFunction = eval(strCallbackFunc);
	    	if ( typeof callFunction != "function" ) {
	    		gf_DivMsgAlert("call back function "+ strCallbackFunc + "is not defined!!");
	          	return false;
	        }
    	}else{
	    	callFunction = strCallbackFunc;
    	}
    }
    
    if(isBlock) {
    	//
    }   
    
    $.ajax({
        url: ajaxUrl,       
        type: sendType,
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        beforeSend : function (){
            $.blockUI({
                fadeIn : 0,
                fadeOut : 0,
                showOverlay : false
            });
        },
        success: function (data) {

        	tranRslt = true;
        	
        	//console.log(data);
 
        	if(data.code != "000") {        		
        		gf_DivMsgAlert("DB 처리 오류가 발생하였습니다.<br\>시스템담당자에게 문의 바랍니다.<br\>("+data.message+" : "+data.code+")");		
	    		tranRslt = false;
			}
        	// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire(strSvcID, targetID, data);
			}

			if(isBlock){ 
				//gf_CloseLayer("bizLayerProgressBase"); 
			}
        },
        error:function(xhr, ajaxOptions, thrownError) {        	 
        	gf_HttpError(xhr, ajaxOptions, thrownError);
    		tranRslt = false;	
    		if(isBlock){			
    			//gf_CloseLayer("bizLayerProgressBase");
    	    }
        },
        complete : function (){
            $.unblockUI();
        }
        
    });
 
	return tranRslt;
};

/*
 * no async (no callback function)
 */
var gf_NoAsyncTransaction = function(strSvcAct, jsonParameter, sendType) {	
	
	$.blockUI({
        fadeIn : 0,
        fadeOut : 0,
        showOverlay : false
    });
	
	var returnData;
	
    var ajaxUrl = gv_ServerApiUrl + "/" +strSvcAct;    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl;
    
    if(gf_IsNull(sendType)) sendType = 'GET';

	$.ajax({
		url: ajaxUrl,    
        type: sendType,
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
       
        success: function(data) {
        	//console.log(data);
        	if(data.code != "000") {
        		if(data.message.indexOf("ORA-00001")>0)
        			gf_DivMsgAlert("이미 등록된 KEY가 존재합니다.<br> 확인해보시기 바랍니다.");
        		else
        			gf_DivMsgAlert("DB 처리 오류가 발생하였습니다.<br\>시스템담당자에게 문의 바랍니다.<br\>("+data.message+" : "+data.code+")");
        	}

        	returnData = data;    
        },
        error:function(request, status, error) {        
        	gf_HttpError(request, status, error);          	
        },
        complete : function (){
            $.unblockUI();
        }
	});
	
    return returnData;
};


/**
 * 엑셀 업로드를 수행합니다.
 * @param startRowNum : 엑셀파일에서 잃어들일 첫번째 라인의 번호
 * @param maxRowNum : 엑셀파일에서 잃어들일 최대 라인의 번호, 미입력 시 99999 으로 설정 됨
 * @param colTitle : 리턴받을 컬럼ID 지정, 엑셀 다운로드한 그리드의 ID = 그리드 생성에 사용된 컬럼 ID를 구분자 "|"로 구분하여 순서대로 입역
 *    ex:) "workTyCode|workTyCodeNm|useAt|bassTyAt|calcPd|coreTimeApplcAt|attendConfirmAt|dayRecogWorktime"
 * @param dhxGrid : 엑셀파일 업로드 결과를 보여줄 그리드 ID, 그리드 자체를 넘겨야 함
 * @param strCallbackFunc : 엑셀파일 업로드 결과를 받은 후 후처리 필요 시 콜백함수 선언 
 *        dhxGrid 또는 callback 중 하나는 입력 되어야 함
 * @see   서버의 controller 를 호출하기 위한 함수
 *        업로드 받은 결과의 정합성은 각 프로그램별로 검증 해야 함 : 컬럼 수가 요청한 컬럼수보다 많으면 무조건 업로드 처리 하므로 다른 파일이 업로드 되도 성공으로 처리 함
 * @author 유창기
 * @since  2020-05-25
 * @version 1.0
 */
var g_ExcelUploadStartRowNum = 0;
var g_ExcelUploadMaxRowNum = 99999;
var g_ExcelUploadColTitle = "";
var g_ExcelUploadDhxGrid = null;
var g_ExcelUploadCallback = "";
var gf_ExcelUpload = function(startRowNum, maxRowNum, colTitle, dhxGrid, strCallbackFunc) {
	
	if(gf_IsNull(colTitle)) {
		gf_DivMsgAlert("Excel Upload 컬럼 ID가 지정되지 않았습니다.");
		return false;
	}
	
	g_ExcelUploadCallback = null;
	if ( !gf_IsNull(strCallbackFunc) ) {
    	if(typeof(strCallbackFunc) == "string"){
    		g_ExcelUploadCallback = eval(strCallbackFunc);
	    	if ( typeof g_ExcelUploadCallback != "function" ) {
	    		g_ExcelUploadCallback = null;
	        }
    	}else{
    		g_ExcelUploadCallback = strCallbackFunc;
    	}
    }
	
	if(gf_IsNull(g_ExcelUploadCallback) && gf_IsNull(dhxGrid)) {
		gf_DivMsgAlert("Excel Upload 그리드를 지정하거나, \n Callback 함수를 지정해주시기 바랍니다.");
		return false;
	}
	if(typeof dhxGrid == "object"){
		g_ExcelUploadDhxGrid = dhxGrid;
	}
	else if(gf_IsNull(g_ExcelUploadCallback) && typeof dhxGrid != "object"){
		gf_DivMsgAlert("Excel Upload 그리드가 정상적이지 않습니다.");
		return false;
	}
	
	g_ExcelUploadStartRowNum = startRowNum;
	g_ExcelUploadMaxRowNum = maxRowNum;
	g_ExcelUploadColTitle = colTitle;
	
	gf_FileUploadPopup(
            '', 
            '', 
            '', 
            '', 
            [], 
            [], 
            1,
            'excel',
            'gf_CallbackExcelUpload',        //콜백함수 (없을경우 디퐆트 콜백(gf_CallbackFileUpload))
            '');   //저장기능 비활성화 하려면 값을 'view' 로 보내야 함
}
var gf_CallbackExcelUpload = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr) {
	if(!gf_IsNull(data)){
        var idx = 0;
        var fileInfos = [];
        var atchFileList = [];
    	var callbacks = $.Callbacks();
        
        $.each( data, function( key, value ) {                      
            fileInfos = value.split('|^|');         
            keyArr.push(fileInfos[0]);
            infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);                                    
        });
        
        //console.log(" * keyArr   : " + keyArr[0]);
        //console.log(" * infoArr   : " + infoArr[0]);
        
        var atchFileId =  keyArr.join("|");
        
        if(atchFileId != ""){
            var jsonParameter = {
                    atchFileId       :  atchFileId,
                    startRowNum : g_ExcelUploadStartRowNum,    //엑셀에서 잃을 첫줄 번호
                    colTitle : g_ExcelUploadColTitle,          // "workTyCode|workTyCodeNm|useAt|bassTyAt|calcPd|coreTimeApplcAt|attendConfirmAt|dayRecogWorktime",  //배열타이틀 넘김
                    maxRowNum : g_ExcelUploadMaxRowNum         //최대 수량 넘김
            };
            
            var url = "file/excelFileUpload";
            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            
            if(!gf_IsNull(dataSource.data)){
            	if ( !gf_IsNull(g_ExcelUploadDhxGrid) ) {
	            	g_ExcelUploadDhxGrid.clearAll();
	            	g_ExcelUploadDhxGrid.parse(dataSource.data, 'js');
	            	g_ExcelUploadDhxGrid.selectRow(0);
            	}
            	gf_DivMsgAlert("Excel Upload에 성공하였습니다.");
            	
            	if ( !gf_IsNull(g_ExcelUploadCallback) ) {
            		callbacks.empty();
            		callbacks.add(g_ExcelUploadCallback);
            		callbacks.fire(dataSource);
    			}
                
            }
            else{
            	gf_DivMsgAlert("Excel Upload 오류입니다.");
            }
        }
        else{
        	gf_DivMsgAlert("파일 Upload 오류입니다.");
        }
    }
	else{
		//gf_DivMsgAlert("Excel Upload 오류입니다.");
	}
}

/**
 * 엑셀 다운로드를 수행합니다.
 * @param strSvcAct(String) transaction URL
 * @param parameters(JSONObject) controller에서 getParam 으로 전달받을 인자값
 * @param dataSets : 데이타센 목록을 전달합니다. <br>
 *    ex:) [ { dataSetId : "ds_sysCd" , dataSet : ds_sysCd  , filter : "U" } , { dataSetId : "ds_sysCd2" , dataSet : ds_sysCd2  , filter : "U" } ]<br>
 *                                                  dataSetId 는 서버에서 사용할 이름입니다. filter는 "U" : 변경된 것만, "A" : 전체 입니다. 생략하면 "U" 입니다.<br>
 * @see   서버의 controller 를 호출하기 위한 함수
 * @author 김흥수
 * @since  2015-10-21
 * @version 1.0
 */
var gf_ExcelDown = function(strSvcAct, paramerters) {
	 
	$.blockUI({
        fadeIn : 0,
        fadeOut : 0,
        showOverlay : false
    });
	    
	var actionUrl = gv_ServerApiUrl + "/" +strSvcAct;
	var jsonParameter = {};
	
	for(key in paramerters) {
		jsonParameter[key] = paramerters[key];
	}
	
	var	$iframe;
	var iframe_doc;
	var iframe_html;
	
	if($('#__download_iframe__').length > 0) {
		$('#__download_iframe__').remove();
	}

	$iframe = $("<iframe id = '__download_iframe__' style='display: none' src='about:blank'></iframe> ").appendTo("body");		
	iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
	if(iframe_doc.document) {
		iframe_doc = iframe_doc.document;
	}
	
	iframe_html = "<html><head></head><body><form name='frmSend' id='frmSend' method='POST' enctype='multipart/form-data' action='"+actionUrl+"'></form></body></html>";
	iframe_doc.open();
	
	iframe_doc.write(iframe_html);
	
	var sendData = JSON.stringify(jsonParameter).replaceAll("%", encodeURIComponent("%"));;
	$("<input type=hidden name='arg' id='arg'/>").appendTo($("#frmSend",iframe_doc));
	$("#arg",iframe_doc).val(sendData);
	
	$(iframe_doc).find('#frmSend').submit();
	//1초후
	setTimeout(function(){ $.unblockUI(); }, 1000);
};

var gf_OpenTransactionProgressLayer = function(displayEelementId){
	/*
	if($('body').find('#'+displayEelementId+' div[id="loadProgressLayer"]').size() <= 0) {
		$('body #'+displayEelementId).append('<div id="loadProgressLayer" style="display:none; top:200px; position:relative"><img src="'+gv_ServerApiUrl+'/img/ajax-loader.gif" alt="loading"></div>');
	}	
	$('#'+displayEelementId+' #loadProgressLayer').show();
	*/
};

var gf_CloseLayer = function(displayEelementId){
	//$('#'+displayEelementId+' #loadProgressLayer').hide();
};

var gf_HttpError = function(x, s, t) {
	try {eval('var d = ' + x.responseText);
		if (x.status=='406') {
			gf_DivMsgAlert(d.massage ? d.massage : d.status);
		}
	} catch(e) {
		if(x.status == "200"){
			gf_DivMsgAlert("일정시간 동안 사용하지 않아 로그아웃 되었습니다.");
			document.location.href = "/xerp/";
		}
		else
			gf_DivMsgAlert('정상적으로 처리되지 못했습니다.<br/>(ERROR_CODE: ' + x.status + ')');
	}
};
