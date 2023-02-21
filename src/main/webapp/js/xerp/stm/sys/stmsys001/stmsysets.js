/**
 *    프로그램       : 시스템환경관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.16
 *    사용테이블      : STM_ENV_SETTING
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var fadeRegs = false;
var fadeMode = true;
var modifyAt = true;
var keyDuplication = false;
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmsys001();
    cf_SetComponentsStmsys001();
    cf_SetEventListenerStmsys001();
    cf_InitFormStmsys001();
    cf_SetBindingStmsys001();
    gf_IframeHeightResize(true);  
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamStmsys001 = function() {
    $('#saveFormStmsys001').validate({ errorElement: 'div', ignore: '' });
    // 사업장 콤보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;          
	gf_MakeComboBasic('comboBplcCode', 'bplcCode', '', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', gBplcCode);
};

var cf_SetComponentsStmsys001 = function() {};
var cf_SetEventListenerStmsys001 = function() {
	
    $('#btnSearchStmsys001').unbind('click').bind('click', function(event){
        fn_SearchStmsys001();
    });
    $('#btnResetStmsys001').unbind('click').bind('click',function() {
        cf_InitFormStmsys001();
    });
    
    $('#btnAddStmsys001').unbind('click').bind('click', function(event){
        fn_AddStmsys001()
    });
    $('#btnSaveStmsys001').unbind('click').bind('click', function() {
        fn_SaveStmsys001();
    });
    $('#btnFileUploadSaveFormStmsys001').unbind('click').bind('click', function() {
    	gf_FileUploadPopup(
				'', 	/* eventFunction */
				'', 	/* deleteBtnClassNm */
				'saveFormStmsys001', 	        /* viewDivId */
				'atchmnflSaveFormStmsys001', 	/* dataDivId */
				[], 	/* keyArr */
				[], 	/* infoArr */
				1,      /* upload file number */
			    'image',
		        'fn_CallbackFileUploadSaveFormStmsys001');
    	//gf_Trace($('#saveFormPjtIssue').serialize());
    });
    $('#comboBplcCode').unbind('change').bind('change', function() {	
    	fn_SearchStmsys001();
    });     
};

var cf_InitFormStmsys001 = function() {
    $('#searchFormStmsys001').resetForm();
};

var cf_SetBindingStmsys001 = function() {
    fn_SearchStmsys001();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmsys001 = function() {
	fn_FindStmsys001();
};

var fn_FindStmsys001 = function() {
    var bplcCode  = gf_FormGetValue('searchFormStmsys001', 'bplcCode', 'combo');
	if (!gf_IsNull(bplcCode)) {
		
        var jsonParameter = {
            bplcCode : bplcCode
        };
        
        var dataSource = gf_NoAsyncTransaction('stmsys001/findEtsStmsys001', jsonParameter, 'GET');
        var data = dataSource.data;
        
        if(gf_IsNull(data)) {
        	fn_InitInputFormStmsys001();
        } else {        
	        gf_FormSetValue('saveFormStmsys001', 'bplcCode', data.bplcCode, 'text');
	        gf_FormSetValue('saveFormStmsys001', 'etsPreView', data.readng, 'radio');
	        fn_SearchFileUploadSaveFormStmsys001(data.sealImg,'saveFormStmsys001','atchmnflSaveFormStmsys001');
	        gf_FormSetValue('saveFormStmsys001', 'signType', data.signMarkWay, 'radio');
	        $('#saveFormStmsys001 input[name="bplcCode"]').attr('disabled', 'disabled');
        }        
    }
    modifyAt = true;
    keyDuplication = false;
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmsys001 = function() {
    modifyAt = false;
    $('#saveFormStmsys001 input[name="bplcCode"]').removeAttr('disabled');
    $('#saveFormStmsys001').resetForm();
    gf_FormSetValue('saveFormStmsys001', 'bplcCode', gf_FormGetValue('searchFormStmsys001', 'bplcCode', 'combo'), 'text');
    fn_ClearFileUploadSaveFormStmsys001('saveFormStmsys001','atchmnflSaveFormStmsys001');
    $('#previewSealImgSaveFormStmsys001').attr('src', gv_ServerApiUrl+'/img/dummySeal.jpg');    
};
/**
 * 데이터 중복 체크
 */
var fn_CheckDupStmsys001 = function(){
    var bplcCode = gf_FormGetValue('saveFormStmsys001', 'bplcCode', 'text');
    if(gf_IsNull(bplcCode)) {
        gf_DivMsgAlert('사업장코드를 입력해 주세요.'); /* gf_LocaleTrans('default', 'titbplcCode') */
        return false;
    }
    var jsonParameter = {
        bplcCode : bplcCode
    };
    var dataSource = gf_NoAsyncTransaction('stmsys001/findEtsStmsys001', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.bplcCode)) {
            keyDuplication = false;
            return true;
        } else {
            gf_DivMsgAlert('사업장코드가 존재합니다.'); /* gf_LocaleTrans('default', 'titbplcCode') */
            keyDuplication = true;
            return false;
        }
    } else {
        gf_DivMsgAlert('중복확인이 되지 않습니다.');
        return false;
    }    
};
/**
 * 저장 (입력, 수정)
 */
var fn_AddStmsys001 = function() {
    if(!fadeRegs) {
        $('#saveFormStmsys001').fadeOut(gv_FadeTime, function() {
            fn_InitInputFormStmsys001();
            fadeRegs = true;
            fadeMode = false;
            keyDuplication = true;
            $('#btnPopEmpSearchStmsys001').show();
        });
        $('#saveFormStmsys001').fadeIn(gv_FadeTime, function() {});
    } else {
        fn_InitInputFormStmsys001();
    }
}

var fn_SaveStmsys001 = function() {    
    if($('#saveFormStmsys001').validate().form()){
        if(keyDuplication && !fn_CheckDupStmsys001()) return false;        
        var jsonParameter = {        	
            bplcCode : gf_FormGetValue('saveFormStmsys001', 'bplcCode', 'text'),
            readng : gf_FormGetValue('saveFormStmsys001', 'etsPreView', 'radio'),
            sealImg : gf_FormGetValue('saveFormStmsys001', 'atchmnfl', 'text'),
            signMarkWay : gf_FormGetValue('saveFormStmsys001', 'signType', 'radio')
        };
        gf_Transaction(jsonParameter, 'stmsys001/saveEtsStmsys001', jsonParameter, 'fn_CallbackSaveStmsys001', false, 'POST');
    }
};

var fn_CallbackSaveStmsys001 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        fn_SearchStmsys001();
        gf_RefreshSysConfig(); // 메모리 리셋
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/******************************************************************************************************************************
 *                                                     파일 핸들링
 ******************************************************************************************************************************/
var uploadedFileKeys = [];
var uploadedFileInfo = [];
var fn_CallbackFileUploadSaveFormStmsys001 = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	if(!gf_IsNull(data)){				
		uploadedFileKeys = [];
		uploadedFileInfo = [];
		$('#'+viewDivId+' .file_box table tr').remove();
		fn_LoadFileUploadSaveFormStmsys001(data, viewDivId, dataDivId);
	}
};

var fn_SearchFileUploadSaveFormStmsys001 = function(atchFiles, viewDivId, dataDivId) {	
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
		fn_LoadFileUploadSaveFormStmsys001(uploadedFileInfo, viewDivId, dataDivId);	
	}
};

var fn_RemoveFileUploadSaveFormStmsys001 = function(obj, viewDivId, dataDivId) {
	uploadedFileKeys.splice($(obj).attr('idx'), 1);
	uploadedFileInfo.splice($(obj).attr('idx'), 1);	
	$('#'+viewDivId+' .file_box table tr').remove();
	fn_LoadFileUploadSaveFormStmsys001(uploadedFileInfo, viewDivId, dataDivId);
};

var fn_LoadFileUploadSaveFormStmsys001 = function(data, viewDivId, dataDivId) {		
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
		atchFileList.push('<td style="border:0px"><button type="button" idx="'+idx+'" class="btn_del" onclick="fn_RemoveFileUploadSaveFormStmsys001(this,\''+viewDivId+'\',\''+dataDivId+'\')"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');		
		
		$('#previewSealImgSaveFormStmsys001').attr('src', gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]);
		
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

var fn_ClearFileUploadSaveFormStmsys001 = function(viewDivId, dataDivId){
	$('#'+viewDivId+' .file_box table tr').remove();
	var atchFileList = [];
	atchFileList.push('<tr>');
	atchFileList.push('<td colspan="3" style="text-align:center; border:0px">첨부파일이 없습니다.</td>');		
	atchFileList.push('</tr>');
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val('');	
};
