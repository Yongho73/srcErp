/**
 *    프로그램       : 시스템환경관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.16
 *    사용테이블      : STM_ENV_SETTING
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var nowDate = "";
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmngWeek();
    cf_SetComponentsStmmngWeek();
    cf_SetEventListenerStmmngWeek();
    cf_InitFormStmmngWeek();
    cf_SetBindingStmmngWeek();
    gf_IframeHeightResize(true);       
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamStmmngWeek = function() {
	
	gf_ComboCode('divComboSysSeSearchFormStmmng010Week', 'sysSeSearchFormStmmng010', 'sysSe', 'search', 'C192', '' , '', '', 'asc', '');
	var dhtmlXCalendar = new dhtmlXCalendarObject([{input:"baseDeSearchFormStmmng010", button:"startDateIcon"}]);
	dhtmlXCalendar.loadUserLanguage("ko");
	dhtmlXCalendar.hideTime(); 
	
	var v_CurDate = new Date();
	v_CurDate.setDate(v_CurDate.getDate());
	var curDate = v_CurDate.format('YYYY-MM-DD');
	
	$('#baseDeSearchFormStmmng010').val(curDate);
};

var dhxGridStmmng010Week;
var cf_SetComponentsStmmngWeek = function() {
	var dhxGridStmmng010WeekHeaderInfo = [];
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('업무구분', '*', 'left', 'str', 'ro', false, 'menuNm', '', ''));
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('개발물량', '200', 'right', 'str', 'ro', false, 'cnt', '', ''));
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('개발(전체)', '170', 'right', 'str', 'ro', false, 'prearngeCnt', '', ''));
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '170', 'right', 'str', 'ro', false, 'realCnt', '', ''));
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '170', 'right', 'str', 'ro', false,  'achievement', '', ''));
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '170', 'right', 'str', 'ro', false, 'progress', '', ''));
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('개발(금주)', '170', 'right', 'str', 'ro', false, 'weekPrearnge', '', ''));
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '170', 'right', 'str', 'ro', false, 'weekReal', '', ''));
	dhxGridStmmng010WeekHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '170', 'right', 'str', 'ro', false, 'weekProgress', '', ''));
	
	var attachHeaderArrWeek = [];
	attachHeaderArrWeek.push(["#rspan", "#rspan", "누적계획", "누적실적", "달성율(%)", "진척율(%)", "계획", "실적", "달성율(%)"]);
     
	dhxGridStmmng010Week = gf_MakeDhxGrid('dataListStmmng010Week', dhxGridStmmng010WeekHeaderInfo, false, true, false, attachHeaderArrWeek);
	
	dhxGridStmmng010Week.setColumnMinWidth(100,0);
	dhxGridStmmng010Week.enableAutoWidth(false);
	dhxGridStmmng010Week.attachFooter(" <div style='text-align:right;'>합계</div>, " +
									  " <div id='cnt_tot' style='text-align:right;'>0</div>," +
									  " <div id='prearngeCnt_tot' style='text-align:right;'>0</div>," +
									  " <div id='realCnt_tot' style='text-align:right;'>0</div>," +
									  " <div id='achievement_avg' style='text-align:right;'>0</div>, " +
									  " <div id='progress_avg' style='text-align:right;'>0</div>, " +
									  " <div id='weekPrearnge_tot' style='text-align:right;'>0</div>, " +
									  " <div id='weekReal_tot' style='text-align:right;'>0</div>, " +
									  " <div id='weekProgress_avg' style='text-align:right;'>0</div>",["text-align:right;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여
	dhxGridStmmng010Week.attachEvent("onDataReady",function(){
		calculateFooterValues();
	});
	
};

function calculateFooterValues(stage){
	//alert(stage);
	if(stage && stage!=2)
		return true;
	var cnt_tot = document.getElementById("cnt_tot");
		cnt_tot.innerHTML = gf_NumberWithCommas(sumColumn1());
	var prearngeCnt_tot = document.getElementById("prearngeCnt_tot");
		prearngeCnt_tot.innerHTML = gf_NumberWithCommas(sumColumn2());
	var realCnt_tot = document.getElementById("realCnt_tot");
		realCnt_tot.innerHTML = gf_NumberWithCommas(sumColumn3()); 
	var achievement_avg = document.getElementById("achievement_avg");
		achievement_avg.innerHTML = gf_NumberWithCommas(sumColumn4()); 
	var progress_avg = document.getElementById("progress_avg");
		progress_avg.innerHTML = gf_NumberWithCommas(sumColumn5()); 
	var weekPrearnge_tot = document.getElementById("weekPrearnge_tot");
		weekPrearnge_tot.innerHTML = gf_NumberWithCommas(sumColumn6());
	var weekReal_tot = document.getElementById("weekReal_tot");
		weekReal_tot.innerHTML = gf_NumberWithCommas(sumColumn7());
	var weekProgress_avg = document.getElementById("weekProgress_avg");
		weekProgress_avg.innerHTML = gf_NumberWithCommas(sumColumn8());
	return true;
}
function sumColumn1(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Week.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Week.cells2(i,1).getValue())
	}
	return out;
}
function sumColumn2(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Week.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Week.cells2(i,2).getValue())
	}
	return out;
}
function sumColumn3(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Week.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Week.cells2(i,3).getValue())
	}
	return out;
}
function sumColumn4(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Week.getRowsNum(); i++){
		var str = dhxGridStmmng010Week.cells2(i,4).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Week.getRowsNum(); j++){
		if(dhxGridStmmng010Week.cells2(j,4).getValue() != '0%') {
			cnt++;
		}
	}
	if (out == 0 && cnt == 0) {
		out = '0%';
		return out;
	}
	out = out / cnt;
	out = out + '%';
	return out;
}
function sumColumn5(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Week.getRowsNum(); i++){
		var str = dhxGridStmmng010Week.cells2(i,5).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Week.getRowsNum(); j++){
		if(dhxGridStmmng010Week.cells2(j,5).getValue() != '0%') {
			cnt++;
		}
	}
	if (out == 0 && cnt == 0) {
		out = '0%';
		return out;
	}
	out = out / cnt;
	out = out + '%';
	return out;
}
function sumColumn6(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Week.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Week.cells2(i,6).getValue())
	}
	return out;
}
function sumColumn7(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Week.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Week.cells2(i,7).getValue())
	}
	return out;
}
function sumColumn8(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Week.getRowsNum(); i++){
		var str = dhxGridStmmng010Week.cells2(i,8).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Week.getRowsNum(); j++){
		if(dhxGridStmmng010Week.cells2(j,8).getValue() != '0%') {
			cnt++;
		}
	}
	if (out == 0 && cnt == 0) {
		out = '0%';
		return out;
	}
	out = out / cnt;
	out = out + '%';
	return out;
}


var cf_SetEventListenerStmmngWeek = function() {
	$('#btnSearchStmmng010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng010Week('');
    });
	$('#btnResetStmmng010').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmngWeek();b
    });
	 $('#searchFormStmmng010 .input_calen').unbind('keypress').bind('keypress', function(event){
	    gf_AutoDate(event, this);
	 });
};
var cf_InitFormStmmngWeek = function() {
	 $('#searchFormStmmng010').resetForm();
};
var cf_SetBindingStmmngWeek = function() {
	fn_SearchStmmng010Week('');
};

/**
 * 조회
 */
var fn_SearchStmmng010Week = function(userId) {
    var jsonParameter = {
            sysSe : gf_FormGetValue('searchFormStmmng010', 'sysSe', 'combo'),
    };
    gf_Transaction(userId, 'stmmng010/searchStmmng010Week', jsonParameter, 'fn_CallbackSearchStmmng010Week', false, 'GET');
};

var fn_CallbackSearchStmmng010Week = function(strSvcID, targetID, data){
	dhxGridStmmng010Week.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListStmmng010Week');
        dhxGridStmmng010Week.parse(data.data.records, 'js');
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListStmmng010Week');
    }
    $("#spanCntSearchFormStmmng010").text(data.data.records.length);
    cf_SetEventListenerStmmngWeek();
};

