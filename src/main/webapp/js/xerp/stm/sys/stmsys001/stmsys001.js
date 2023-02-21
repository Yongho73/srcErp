/**
 *    프로그램       : 시스템환경관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.16
 *    사용테이블      : STM_ENV_SETTING
 * sourceGen version : 2020.07.16.01 (2020.07.30)
 **/
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
    cf_InitParamStmsys001();
    if(cf_SetComponentsStmsys001()){
       cf_SetEventListenerStmsys001();
       cf_InitFormStmsys001();
       cf_SetBindingStmsys001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmsys001 = function() {
    gf_SetMenuPath();
    $("#saveFormStmsys001").validate({ errorElement: 'div', ignore: '' });
    
    gf_CheckCode('divInputFormComboSlrcldAt', 'detailComboSlrcldAt', 'C001',  '', 'ordr', ''); //제품 
//	fn_CheckCode('divModuleUseItem', 'moduleUseItem', 'C001',  '', 'ordr', ''); // 모듈
	

    gf_MakeCheckBasic('divModuleUseItem','moduleUseItem','','','stmsys001/check'); // 그룹권한 커스텀 체크박스
    	 
	gf_RadioCode('divpgngUnit', 'pgngUnit', 'C133',  '', 'ordr', '20'); // 페이징
	gf_RadioCode('divmaskMthCode', 'maskMthCode', 'C137',  '', 'ordr', '001'); // 마스킹
	gf_RadioCode('divempnoEntMth', 'empnoEntMth', 'C129',  '', 'ordr', '10'); // 사번생성방법
	gf_RadioCode('divlangSeCode', 'langSeCode', 'C131',  '', 'ordr', 'kor'); // 언어설정 
	gf_RadioCode('divsearchPdSettingCode',  'searchPdSettingCode','C132',  '', 'ordr', '003'); // 검색기간 
	 
	gf_RadioCode('divpasswordChangeCycle',  'passwordChangeCycle','C135',  '', 'ordr', '3'); // 비밀번호변경주기  
	gf_RadioCode('divselfAuthMth', 'selfAuthMth','C134',  '', 'ordr', ''); // 본인인증 
	 
	gf_RadioCode('divdcmlpointProcessMth', 'dcmlpointProcessMth','C032',  '', 'ordr', '3'); // 소수점처리방법 
	gf_RadioCode('divpasswordSettingMth',  'passwordSettingMth','C136',  '', 'ordr', '001'); // 비밀번호설정  
};

var cf_SetComponentsStmsys001 = function() {
    return true; 
};

var cf_SetEventListenerStmsys001 = function() {
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveStmsys001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmsys001();
    });
    $('#btnResetStmsys001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmsys001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#saveFormStmsys001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmsys001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmsys001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmsys001 = function() {
    $('#searchFormStmsys001').resetForm();
};

var cf_SetBindingStmsys001 = function() {
    fn_FormDisabled(false);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmsys001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmsys001 = function(userId) {
	fn_FindStmsys001();
};
/**
 * 상세조회
 */
var fn_FindStmsys001 = function() {
	var jsonParameter = {
            bplcCode : '1000'
    };
	var dataSource = gf_NoAsyncTransaction('stmsys001/findStmsys001', jsonParameter, 'GET');
    var data = dataSource.data;
    if(gf_IsNull(data)) {
     	cf_InitFormStmsys007();
    } else {        
//    	gf_FormSetValue('saveFormStmsys001', 'bplcCode', data.bplcCode, 'text');
//        gf_FormSetValue('saveFormStmsys001', 'prductUseItem', data.prductUseItem, 'text');
//        gf_FormSetValue('saveFormStmsys001', 'moduleUseItem', data.moduleUseItem, 'checkbox');
        gf_FormSetValue('saveFormStmsys001', 'pgngUnit', data.pgngUnit, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'maskMthCode', data.maskMthCode, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'empnoEntMth', data.empnoEntMth, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'langSeCode', data.langSeCode, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'searchPdSettingCode', data.searchPdSettingCode, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'salaryDcmlpointProcessMth', data.salaryDcmlpointProcessMth, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'dcmlpointProcessMth', data.dcmlpointProcessMth, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'passwordSettingMth', data.passwordSettingMth, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'passwordChangeCycle', data.passwordChangeCycle, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'selfAuthMth', data.selfAuthMth, 'radio');
        gf_FormSetValue('saveFormStmsys001', 'sknSeCode', data.sknSeCode, 'radio');
        
        gf_FormSetValue('saveFormStmsys001', 'multiLoginPermAt', (( data.multiLoginPermAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormStmsys001', 'nextChangeAt', (( data.nextChangeAt == '1') ? true : false), 'chkbox');
        
        fn_CheckRoleCtrl('set', data.moduleUseItem);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmsys001 = function() {
    $('#saveFormStmsys001 input[name="bplcCode"]').prop('disabled', false);
    $('#saveFormStmsys001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmsys001 *').prop('disabled', status);
    $('#saveFormStmsys001 input[name="bplcCode"]').prop('disabled', true);
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmsys001 = function() {
    confirmMsg = "저장하시겠습니까?";
	if(confirmModalStmsys001(confirmMsg)){  //여기는 안옴 
    } else { 
        return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
    } 
}
var confirmModalStmsys001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmsys001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmsys001_Send = function() {
	if($('#saveFormStmsys001').validate().form()){
        var jsonParameter = {
            bplcCode : 1000,
            //prductUseItem : gf_FormGetValue('saveFormStmsys001', 'prductUseItem', 'text'),
//            moduleUseItem : gf_FormGetValue('saveFormStmsys001', 'moduleUseItem', 'chkboxYN'),
            pgngUnit : gf_FormGetValue('saveFormStmsys001', 'pgngUnit', 'radio'),
            maskMthCode : gf_FormGetValue('saveFormStmsys001', 'maskMthCode', 'radio'),
            empnoEntMth : gf_FormGetValue('saveFormStmsys001', 'empnoEntMth', 'radio'),
            langSeCode : gf_FormGetValue('saveFormStmsys001', 'langSeCode', 'radio'),
            searchPdSettingCode : gf_FormGetValue('saveFormStmsys001', 'searchPdSettingCode', 'radio'),
            multiLoginPermAt : gf_FormGetValue('saveFormStmsys001', 'multiLoginPermAt', 'chkboxYN'),
            salaryDcmlpointProcessMth : gf_FormGetValue('saveFormStmsys001', 'salaryDcmlpointProcessMth', 'radio'),
            dcmlpointProcessMth : gf_FormGetValue('saveFormStmsys001', 'dcmlpointProcessMth', 'radio'),
            passwordSettingMth : gf_FormGetValue('saveFormStmsys001', 'passwordSettingMth', 'radio'),
            passwordChangeCycle : gf_FormGetValue('saveFormStmsys001', 'passwordChangeCycle', 'radio'),
            nextChangeAt : gf_FormGetValue('saveFormStmsys001', 'nextChangeAt', 'chkboxYN'),
            selfAuthMth : gf_FormGetValue('saveFormStmsys001', 'selfAuthMth', 'radio'),
            sknSeCode : gf_FormGetValue('saveFormStmsys001', 'sknSeCode', 'text'),
            moduleUseItem : fn_CheckRoleCtrl('get'),
            
            prductUseItem :'',
            salaryDcmlpointProcessMth :'',
            sknSeCode :'',
        };
        gf_Transaction(jsonParameter, 'stmsys001/saveStmsys001', jsonParameter, 'fn_CallbackSaveStmsys001', false, 'POST');
    }
}

var fn_CallbackSaveStmsys001 = function(strSvcId, targetId, data){
	if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        fn_SearchStmsys001();
        gf_RefreshSysConfig(); // 메모리 리셋
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
}

var fn_CheckCode =  function(divId, id,  codekindCode, exceptCode, sortOrder, defaultCheck) {	
	var returnData;
	var jsonParameter = {
			codekindCode:codekindCode,
			exceptCode:exceptCode,
			sortOrder:sortOrder
	};	
	var ajaxUrl = gv_ServerApiUrl + '/cmmnCode/getCmmnCode';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl; 
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) {
		return '';
	} else {		
		var shape = [];
		var locale = gf_GetSysConfig("langSeCode");
		//alert(locale);
    shape.push('<td>');
	returnData.data.forEach(function(item){	
		shape.push('<div class="checkbox"><label><input type="checkbox" id="checkbox_'+id+'" required name="'+id+'" value="'+item.code+'"/><span> '+item.codeNm+'</span>');
	    shape.push('<i class="input-helper"></i>');
	    shape.push('</label></div>');
	});
    shape.push('</td>');
		
		
	}
	$('#'+divId).html(shape.join(''));
};
var fn_CheckRoleCtrl = function(gb, roleCode) {
    var checkVal = [];
    $('input[name="moduleUseItem"]').each(function(index, item){
        if(gb === 'init') {
            $(this).prop("checked", false);
        } else
        if(gb === 'get') {
            if($(this).is(":checked")) checkVal.push($(this).val())
        } else
        if(gb === 'getNm') {
            if($(this).is(":checked")) checkVal.push($(this).parent().find('span').text())                 
        } else {
            if(roleCode.indexOf($(this).val()) > -1) $(this).prop("checked", true);
            else $(this).prop("checked", false);
        }
    });
    if(gb === 'get' || gb === 'getNm') return checkVal.join(',');
}