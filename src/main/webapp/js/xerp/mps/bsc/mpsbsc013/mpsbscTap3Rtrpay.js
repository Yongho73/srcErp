/**
 *    프로그램       : 급여환경설정관리(Tap3 : 퇴직금기초설정) 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.02
 *    사용테이블      : MPS_RTRPAY_PYMNT_STDR
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
    $('#btnSaveMpsbscTap3').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsbsc013();
    });
    // 기타 이벤트 ==========================================================================================
    $('#saveFormMpsbscTap3 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMpsbscTap2",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
    $('#saveFormMpsbscTap3').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#saveFormMpsbscTap3 #mtStdrDaycntSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = gf_FormGetValue('saveFormMpsbscTap3', 'mtStdrDaycnt', 'text');
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum > 30)
			rJnum = 30;
		else
			rJnum = jnum;
		gf_FormSetValue('saveFormMpsbscTap3', 'mtStdrDaycnt', rJnum, 'text');
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
        applcYy : gf_FormGetValue('saveFormMpsbscTap3', 'applcYy', 'text'),
        changeDe : (gf_FormGetValue('saveFormMpsbscTap3', 'changeDe', 'text')).replaceAll('-','')
    };
    gf_Transaction(userId, 'mpsbsc013/selectMpsbscTap3Rtrpay', jsonParameter, 'fn_CallbackSearchMpsbsc013', false, 'GET');
};

var fn_CallbackSearchMpsbsc013 = function(strSvcID, targetID, data) {
    var dataSource = data.data;
    
    gf_FormSetValue("saveFormMpsbscTap3", "retiredayInclsAt", (dataSource.retiredayInclsAt == 1)? true : false,	 	'chkbox');
    gf_FormSetValue("saveFormMpsbscTap3", "mtStdrDaycnt", dataSource.mtStdrDaycnt,	 	'text');
    gf_FormSetValue("saveFormMpsbscTap3", "avrgwagecalcSeCode", dataSource.avrgwagecalcSeCode,	 	'radio');
    gf_FormSetValue("saveFormMpsbscTap3", "bnscalcSeCode", dataSource.bnscalcSeCode,	 	'radio');
    gf_FormSetValue("saveFormMpsbscTap3", "retirecalcSeCode", dataSource.retirecalcSeCode,	 	'radio');
    

    $('#saveFormMpsbscTap3 *').prop('disabled', false);
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
	

    var retiredayInclsAt = gf_FormGetValue('saveFormStmmng001', 'emplAt', 'chkbox')? '0' : '1';
    var mtStdrDaycnt = gf_FormGetValue("saveFormMpsbscTap3", "mtStdrDaycnt", 'text');
    var avrgwagecalcSeCode = gf_FormGetValue("saveFormMpsbscTap3", "avrgwagecalcSeCode", 'radio');
    var bnscalcSeCode = gf_FormGetValue("saveFormMpsbscTap3", "bnscalcSeCode", 'radio');
    var retirecalcSeCode = gf_FormGetValue("saveFormMpsbscTap3", "retirecalcSeCode", 'radio');
    
    if($('#saveFormMpsbscTap3').validate().form()){
    	saveCheck = false;
    } else {
    	saveCheck = true;
    }
    
    if(saveCheck){
    	return false;
    } else {
    	var jsonParameter = {
    	    applcYy : gf_FormGetValue("saveFormMpsbscTap3", "applcYy", 'text'),
    	    changeDe : (gf_FormGetValue('saveFormMpsbscTap3', 'changeDe', 'text')).replaceAll('-',''),
    	    retiredayInclsAt : retiredayInclsAt,
    	    mtStdrDaycnt : mtStdrDaycnt,
    	    avrgwagecalcSeCode : avrgwagecalcSeCode,
    	    bnscalcSeCode : bnscalcSeCode,
    	    retirecalcSeCode : retirecalcSeCode
    	};
    	gf_Transaction('', 'mpsbsc013/saveMpsbscTap3Rtrpay', jsonParameter, 'fn_CallbackSaveMpsbscTap2', false, 'GET');
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
