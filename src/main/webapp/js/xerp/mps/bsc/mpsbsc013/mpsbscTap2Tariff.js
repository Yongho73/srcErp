/**
 *    프로그램       : 급여환경설정관리(Tap2 : 사회보험요율관리) 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.02
 *    사용테이블      : MPS_SNLRC_TARIFF
 * sourceGen version : 2020.07.16.01 (2020.09.02)
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
    cf_InitParamMpsbsc013();
    if(cf_SetComponentsMpsbsc013()){
       cf_SetEventListenerMpsbsc013();
       cf_InitFormMpsbsc013();
       cf_SetBindingMpsbsc013();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc013 = function() {
    $("#saveFormMpsbscTap2").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsMpsbsc013 = function() {
    return true; 
};

var cf_SetEventListenerMpsbsc013 = function() {
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveMpsbscTap2').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc013();
    });
    // 기타 이벤트 ==========================================================================================
    $('#saveFormMpsbscTap2 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMpsbscTap2",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
    $('#saveFormMpsbscTap2').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
  //국민연금 근로자비율
    $('#saveFormMpsbscTap2 #npnLabrrRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #npnLabrrRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum >= 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #npnLabrrRtSaveFormMpsbsc013').val(rJnum);
    });
    //국민연금 사업자비율
    $('#saveFormMpsbscTap2 #npnBsnmRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #npnBsnmRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum >= 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #npnBsnmRtSaveFormMpsbsc013').val(rJnum);
    });
    //건강보험료 근로자비율
    $('#saveFormMpsbscTap2 #hlthinsLabrrRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #hlthinsLabrrRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #hlthinsLabrrRtSaveFormMpsbsc013').val(rJnum);
    });
    //건강보험료 사업자비율
    $('#saveFormMpsbscTap2 #hlthinsBsnmRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #hlthinsBsnmRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #hlthinsBsnmRtSaveFormMpsbsc013').val(rJnum);
    });
    //장기요양보험료 근로자비율
    $('#saveFormMpsbscTap2 #ltciLabrrRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #ltciLabrrRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #ltciLabrrRtSaveFormMpsbsc013').val(rJnum);
    });
    //장기요양보험료 사업자비율
    $('#saveFormMpsbscTap2 #ltciBsnmRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #ltciBsnmRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #ltciBsnmRtSaveFormMpsbsc013').val(rJnum);
    });
    //장기요양보험료 건강보험비율
    $('#saveFormMpsbscTap2 #ltciHlthinsRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #ltciHlthinsRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #ltciHlthinsRtSaveFormMpsbsc013').val(rJnum);
    });
    //고용보험 근로자비율
    $('#saveFormMpsbscTap2 #episLabrrRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #episLabrrRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #episLabrrRtSaveFormMpsbsc013').val(rJnum);
    });
    //고용보험 사업자비율
    $('#saveFormMpsbscTap2 #episBsnmRtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #episBsnmRtSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #episBsnmRtSaveFormMpsbsc013').val(rJnum);
    });
    //산재보험 요율
    $('#saveFormMpsbscTap2 #iaciTariffSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #iaciTariffSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 100)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormMpsbscTap2 #iaciTariffSaveFormMpsbsc013').val(rJnum);
    });
    $('#saveFormMpsbscTap2 #npnLwltAmtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #npnLwltAmtSaveFormMpsbsc013').val();
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		$('#saveFormMpsbscTap2 #npnLwltAmtSaveFormMpsbsc013').val(jnum);
    });
    $('#saveFormMpsbscTap2 #npnUplmtAmtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #npnUplmtAmtSaveFormMpsbsc013').val();
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		$('#saveFormMpsbscTap2 #npnUplmtAmtSaveFormMpsbsc013').val(jnum);
    });
    $('#saveFormMpsbscTap2 #hlthinsLwltAmtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #hlthinsLwltAmtSaveFormMpsbsc013').val();
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		$('#saveFormMpsbscTap2 #hlthinsLwltAmtSaveFormMpsbsc013').val(jnum);
    });
    $('#saveFormMpsbscTap2 #hlthinsUplmtAmtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #hlthinsUplmtAmtSaveFormMpsbsc013').val();
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		$('#saveFormMpsbscTap2 #hlthinsUplmtAmtSaveFormMpsbsc013').val(jnum);
    });
    $('#saveFormMpsbscTap2 #episAlotmSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormMpsbscTap2 #episAlotmSaveFormMpsbsc013').val();
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		$('#saveFormMpsbscTap2 #episAlotmSaveFormMpsbsc013').val(jnum);
    });
};

var cf_InitFormMpsbsc013 = function() {
    $('#searchFormMpsbsc013').resetForm();
};

var cf_SetBindingMpsbsc013 = function() {
    fn_SearchMpsbsc013('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc013 = function(userId) {
    var jsonParameter = {
        applcYy : gf_FormGetValue('saveFormMpsbscTap2', 'applcYy', 'text'),
        changeDe : gf_FormGetValue('saveFormMpsbscTap2', 'changeDe', 'text')
    };
    gf_Transaction(userId, 'mpsbsc013/selectMpsbscTap2Tariff', jsonParameter, 'fn_CallbackSearchMpsbsc013', false, 'GET');
};

var fn_CallbackSearchMpsbsc013 = function(strSvcID, targetID, data) {
    var dataSource = data.data;
    
    gf_FormSetValue("saveFormMpsbscTap2", "npnLabrrRt", dataSource.npnLabrrRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "npnBsnmRt", dataSource.npnBsnmRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "npnUplmtAmt", dataSource.npnUplmtAmt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "hlthinsLabrrRt", dataSource.hlthinsLabrrRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "hlthinsBsnmRt", dataSource.hlthinsBsnmRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "ltciHlthinsRt", dataSource.ltciHlthinsRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "ltciLabrrRt", dataSource.ltciLabrrRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "ltciBsnmRt", dataSource.ltciBsnmRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "episLabrrRt", dataSource.episLabrrRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "episBsnmRt", dataSource.episBsnmRt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "episAlotm", dataSource.episAlotm,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "iaciTariff", dataSource.iaciTariff,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "npnLwltAmt", dataSource.npnLwltAmt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "hlthinsLwltAmt", dataSource.hlthinsLwltAmt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap2", "hlthinsUplmtAmt", dataSource.hlthinsUplmtAmt,	 	'text');
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc013 = function() {
    confirmMsg = "저장하시겠습니까?";
        
    //if(confirmModalMpsbsc013(gv_QueSave)){  //여기는 안옴 
    if(confirmModalMpsbsc013(confirmMsg)){  //여기는 안옴 
    } else { 
        return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
    } 
}
var confirmModalMpsbsc013 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            if(fn_SaveMpsbsc013_Send()){
            	result = true;
            } else {
            	result = false;
            }
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsbsc013_Send = function() {
	var saveCheck = false;


	var npnLabrrRt = gf_FormGetValue("saveFormMpsbscTap2", "npnLabrrRt", '');
	var npnBsnmRt = gf_FormGetValue("saveFormMpsbscTap2", "npnBsnmRt", '');
    var npnUplmtAmt = gf_FormGetValue("saveFormMpsbscTap2", "npnUplmtAmt",'');
    var hlthinsLabrrRt = gf_FormGetValue("saveFormMpsbscTap2", "hlthinsLabrrRt",	'');
    var hlthinsBsnmRt = gf_FormGetValue("saveFormMpsbscTap2", "hlthinsBsnmRt", '');
    var ltciHlthinsRt = gf_FormGetValue("saveFormMpsbscTap2", "ltciHlthinsRt", '');
    var ltciLabrrRt = gf_FormGetValue("saveFormMpsbscTap2", "ltciLabrrRt", '');
    var ltciBsnmRt = gf_FormGetValue("saveFormMpsbscTap2", "ltciBsnmRt", '');
    var episLabrrRt = gf_FormGetValue("saveFormMpsbscTap2", "episLabrrRt", '');
    var episBsnmRt = gf_FormGetValue("saveFormMpsbscTap2", "episBsnmRt", '');
    var episAlotm = gf_FormGetValue("saveFormMpsbscTap2", "episAlotm", '');
    var iaciTariff = gf_FormGetValue("saveFormMpsbscTap2", "iaciTariff", '');
    var npnLwltAmt = gf_FormGetValue("saveFormMpsbscTap2", "npnLwltAmt", '');
    var hlthinsLwltAmt = gf_FormGetValue("saveFormMpsbscTap2", "hlthinsLwltAmt", '');
    var hlthinsUplmtAmt = gf_FormGetValue("saveFormMpsbscTap2", "hlthinsUplmtAmt", '');
    
    if($('#saveFormMpsbscTap2').validate().form()){
    	saveCheck = false;
    } else {
    	saveCheck = true;
    }
    
    if(saveCheck){
    	return false;
    } else {
    	var jsonParameter = {
    	    applcYy : gf_FormGetValue("saveFormMpsbscTap2", "applcYy", 'text'),
    	    changeDe : gf_FormGetValue('saveFormMpsbscTap2', 'changeDe', 'text'),
    	    npnLabrrRt : npnLabrrRt,
    	    npnBsnmRt : npnBsnmRt,
    	    npnUplmtAmt : npnUplmtAmt,
    	    hlthinsLabrrRt : hlthinsLabrrRt,
    	    hlthinsBsnmRt : hlthinsBsnmRt,
    	    ltciHlthinsRt : ltciHlthinsRt,
    	    ltciLabrrRt : ltciLabrrRt,
    	    ltciBsnmRt : ltciBsnmRt,
    	    episLabrrRt : episLabrrRt,
    	    episBsnmRt : episBsnmRt,
    	    episAlotm : episAlotm,
    	    iaciTariff : iaciTariff,
    	    npnLwltAmt : npnLwltAmt,
    	    hlthinsLwltAmt : hlthinsLwltAmt,
    	    hlthinsUplmtAmt : hlthinsUplmtAmt
    	};
    	gf_Transaction('', 'mpsbsc013/saveMpsbscTap2Tariff', jsonParameter, 'fn_CallbackSaveMpsbscTap2', false, 'GET');
    }
}

var fn_CallbackSaveMpsbscTap2 = function(strSvcID, targetID, data) {
	if(data.code == "999" && !gf_IsNull(data.message)){ 
        if(!gf_IsNull(data.methodNm)){ 
            gf_DivMsgAlert(data.message + " Method 명 : " + data.methodNm); 
        } else { 
            gf_DivMsgAlert(data.message); 
        } 
        return false;
   } else if (data.code == "000" || data.data.code !== "000"){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            fn_SearchMpsbsc013();
            return true;
    } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            return false;
    }
};
