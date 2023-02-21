/**
 *    프로그램       : 전자결재환경관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.29
 *    사용테이블      : SGN_ENVRN_SETTING
 * sourceGen version : 2020.07.16.01 (2020.07.29)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmsys007();
    if(cf_SetComponentsStmsys007()){
       cf_SetEventListenerStmsys007();
       cf_InitFormStmsys007();
       cf_SetBindingStmsys007();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmsys007 = function() {
    gf_SetMenuPath();
    $("#saveFormStmsys007").validate({ errorElement: 'div', ignore: '' });

	gf_MakeComboBasic('divComboBplcCode', 'saveFormStmsys007', 'saveFormStmsys007', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '1000');
};

var cf_SetComponentsStmsys007 = function() {
    return true; 
};

var cf_SetEventListenerStmsys007 = function() {
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveStmsys007').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmsys007();
    });
    $('#btnResetStmsys007').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmsys007();
    });
    $('#btnFileUploadSaveFormStmsys007').unbind('click').bind('click', function() {
    	gf_FileUploadPopup(
				'', 	/* eventFunction */
				'', 	/* deleteBtnClassNm */
				'saveFormStmsys007', 	        /* viewDivId */
				'atchmnflSaveFormStmsys007', 	/* dataDivId */
				[], 	/* keyArr */
				[], 	/* infoArr */
				1,      /* upload file number */
			    'image',
		        'fn_CallbackFileUploadSaveFormStmsys007');
    	//gf_Trace($('#saveFormPjtIssue').serialize());
    });
    // 기타 이벤트 ==========================================================================================
    $('#saveFormStmsys007').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
	$('#divComboBplcCode').unbind('change').bind('change', function() {
		fn_FindStmsys007();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmsys007 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmsys007",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmsys007 = function() {
    $('#searchFormStmsys007').resetForm();
};

var cf_SetBindingStmsys007 = function() {
    fn_FormDisabled(false);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmsys007('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmsys007 = function(userId) {
	fn_FindStmsys007();
};
/**
 * 상세조회
 */
var fn_FindStmsys007 = function() {
	var jsonParameter = {
            bplcCode : gf_FormGetValue('saveFormStmsys007', 'saveFormStmsys007', 'combo')
    };
        
    var dataSource = gf_NoAsyncTransaction('stmsys007/findStmsys007', jsonParameter, 'GET');
    var data = dataSource.data;
             
    if(gf_IsNull(data)) {
     	cf_InitFormStmsys007();
    } else {        
//	    gf_FormSetValue('saveFormStmsys007', 'bplcCode', data.bplcCode, 'text');
	    gf_FormSetValue('saveFormStmsys007', 'etsPreView', data.readng, 'radio');
	    fn_SearchFileUploadSaveFormStmsys007(data.sealImg,'saveFormStmsys007','atchmnflSaveFormStmsys007');
	    gf_FormSetValue('saveFormStmsys007', 'signType', data.signMarkWay, 'radio');
	    //$('#saveFormStmsys007 input[name="bplcCode"]').attr('disabled', 'disabled');
    }       
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmsys007 = function() {
    $('#saveFormStmsys007 input[name="bplcCode"]').prop('disabled', false);
    $('#saveFormStmsys007').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmsys007 input[name="bplcCode"]').prop('disabled', false);
    $('#saveFormStmsys007 *').prop('disabled', status);
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmsys007 = function() {
	if($('#saveFormStmsys007').validate().form()){  
        var jsonParameter = {        	
            bplcCode : gf_FormGetValue('saveFormStmsys007', 'saveFormStmsys007', 'combo'),
            readng : gf_FormGetValue('saveFormStmsys007', 'etsPreView', 'radio'),
            sealImg : gf_FormGetValue('saveFormStmsys007', 'atchmnfl', 'text'),
            signMarkWay : gf_FormGetValue('saveFormStmsys007', 'signType', 'radio')
        };
        gf_Transaction(jsonParameter, 'stmsys007/saveStmsys007', jsonParameter, 'fn_CallbackSaveStmsys007', false, 'POST');
    }
};

var fn_CallbackSaveStmsys007 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        fn_SearchStmsys007();
        gf_RefreshSysConfig(); // 메모리 리셋
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
var confirmModalStmsys007 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmsys007_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmsys007_Send = function() {
    if(fn_GridValidation(dhxGridStmsys007, dhxDataProcessorStmsys007)) {
        dhxDataProcessorStmsys007.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmsys007 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmsys007, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmsys007.forEachRow(function(rowId) {
            state = dhxDataProcessorStmsys007.getState(rowId);
            if(dhxGridStmsys007.cells(rowId, gf_GetDhxGridColumId(dhxGridStmsys007, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmsys007.getRowIndex(rowId);
                    dhxGridStmsys007.deleteRow(rowId);
                    dhxGridStmsys007.selectRow(rowNum);
                    fn_FindStmsys007();
                }
                else dhxDataProcessorStmsys007.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmsys007 = function () {
    var titStmsys007 = '전자결재환경관리'; /* gf_LocaleTrans('default', 'titStmsys007') */
    var jsonParameter = {
        bplcCode : gf_FormGetValue('searchFormStmsys007', 'bplcCode', 'text')
    };
    var header = [[
        '사업장 코드' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '사전 열람' /* gf_LocaleTrans('default', 'titReadng') */,
        '직인 이미지' /* gf_LocaleTrans('default', 'titSealImg') */,
        '서명 표기 방식' /* gf_LocaleTrans('default', 'titSignMarkWay') */
    ]];
    var dataId = [[ 'bplcCode', 'readng', 'sealImg', 'signMarkWay' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmsys007 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmsys007;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmsys007/excelStmsys007', jsonParameter);
};

var uploadedFileKeys = [];
var uploadedFileInfo = [];
var fn_CallbackFileUploadSaveFormStmsys007 = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	if(!gf_IsNull(data)){				
		uploadedFileKeys = [];
		uploadedFileInfo = [];
		$('#'+viewDivId+' .file_box table tr').remove();
		fn_LoadFileUploadSaveFormStmsys007(data, viewDivId, dataDivId);
	}
};

var fn_SearchFileUploadSaveFormStmsys007 = function(atchFiles, viewDivId, dataDivId) {	
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
		fn_LoadFileUploadSaveFormStmsys007(uploadedFileInfo, viewDivId, dataDivId);	
	} else {
		$('#previewSealImgSaveFormStmsys007').attr('src', gv_ServerApiUrl+'/img/dummySeal.jpg');
	}
};

var fn_RemoveFileUploadSaveFormStmsys007 = function(obj, viewDivId, dataDivId) {
	uploadedFileKeys.splice($(obj).attr('idx'), 1);
	uploadedFileInfo.splice($(obj).attr('idx'), 1);	
	$('#'+viewDivId+' .file_box table tr').remove();
	fn_LoadFileUploadSaveFormStmsys007(uploadedFileInfo, viewDivId, dataDivId);
};

var fn_LoadFileUploadSaveFormStmsys007 = function(data, viewDivId, dataDivId) {		
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
		atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="fn_RemoveFileUploadSaveFormStmsys007(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');		
		
		$('#previewSealImgSaveFormStmsys007').attr('src', gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]);
		
		idx++;
	});	
	if(idx === 0) {
		atchFileList.push('<tr>');
		atchFileList.push('<td colspan="3" style="text-align:center; border:0px">첨부파일이 없습니다.</td>');		
		atchFileList.push('</tr>');
	}
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val(uploadedFileKeys.join("|"));
}

var fn_ClearFileUploadSaveFormStmsys007 = function(viewDivId, dataDivId){
	$('#'+viewDivId+' .file_box table tr').remove();
	var atchFileList = [];
	atchFileList.push('<tr>');
	atchFileList.push('<td colspan="3" style="text-align:center; border:0px">첨부파일이 없습니다.</td>');		
	atchFileList.push('</tr>');
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val('');	
};
