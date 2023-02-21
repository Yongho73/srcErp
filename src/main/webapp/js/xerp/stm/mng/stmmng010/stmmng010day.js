/**
 *    프로그램       : 시스템환경관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.16
 *    사용테이블      : STM_ENV_SETTING
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/

/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmmngDay();
    cf_SetComponentsStmmngDay();
    cf_SetEventListenerStmmngDay();
    cf_InitFormStmmngDay();
    cf_SetBindingStmmngDay();
    gf_IframeHeightResize(true);       
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamStmmngDay = function() {
	
	gf_ComboCode('divComboSysSeSearchFormStmmng010Day', 'sysSeSearchFormStmmng010', 'sysSe', 'search', 'C192', '' , '', '', 'asc', '');
	
};

var dhxGridStmmng010Day;
var cf_SetComponentsStmmngDay = function() {
	var dhxGridStmmng010DayHeaderInfo = [];
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('업무구분', '*', 'left', 'str', 'ro', false, 'menuNm', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('개발물량', '120', 'right', 'str', 'ro', false, 'cnt', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('개발(전체)', '110', 'right', 'str', 'ro', false, 'prearngeCnt', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '110', 'right', 'str', 'ro', false, 'realCnt', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '110', 'right', 'str', 'ro', false,  'achievement', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '110', 'right', 'str', 'ro', false, 'progress', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('PL', '110', 'right', 'str', 'ro', false, 'plConfirmCnt', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '110', 'right', 'str', 'ro', false, 'plProgress', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('PM', '110', 'right', 'str', 'ro', false, 'pmConfirmCnt', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '110', 'right', 'str', 'ro', false, 'pmProgress', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('PMO', '110', 'right', 'str', 'ro', false, 'pmoConfirmCnt', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '110', 'right', 'str', 'ro', false, 'pmoProgress', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('TFT', '110', 'right', 'str', 'ro', false, 'tftConfirmCnt', '', ''));
	dhxGridStmmng010DayHeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '110', 'right', 'str', 'ro', false, 'tftProgress', '', ''));
	
	var attachHeaderArrDay = [];
	attachHeaderArrDay.push(["#rspan", "#rspan", "누적계획", "누적실적", "달성율(%)", "진척율(%)", "누적실적", "누적진척율(%)",
						  "누적실적", "누적진척율(%)", "누적실적", "누적진척율(%)", "누적실적", "누적진척율(%)"]);
     
	dhxGridStmmng010Day = gf_MakeDhxGrid('dataListStmmng010Day', dhxGridStmmng010DayHeaderInfo, true, true, false, attachHeaderArrDay);
	
	dhxGridStmmng010Day.setColumnMinWidth(100,0);
	dhxGridStmmng010Day.enableAutoWidth(false);
	dhxGridStmmng010Day.attachFooter(" <div style='text-align:right;'>합계</div>, " +
									 " <div id='cnt_tot' style='text-align:right;'>0</div>," +
									 " <div id='prearngeCnt_tot' style='text-align:right;'>0</div>," +
									 " <div id='realCnt_tot' style='text-align:right;'>0</div>," +
									 " <div id='achievement_avg' style='text-align:right;'>0</div>, " +
									 " <div id='progress_avg' style='text-align:right;'>0</div>, " +
									 " <div id='plConfirmCnt_tot' style='text-align:right;'>0</div>, " +
									 " <div id='plProgress_avg' style='text-align:right;'>0</div>, " +
									 " <div id='pmConfirmCnt_tot' style='text-align:right;'>0</div>, " +
									 " <div id='pmProgress_avg' style='text-align:right;'>0</div>, " +
									 " <div id='pmoConfirmCnt_tot' style='text-align:right;'>0</div>, " +
									 " <div id='pmoProgress_avg' style='text-align:right;'>0</div>," +
									 " <div id='tftConfirmCnt_tot' style='text-align:right;'>0</div>," +
									 " <div id='tftProgress_avg' style='text-align:right;'>0</div>,",["text-align:right;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여
	dhxGridStmmng010Day.attachEvent("onDataReady",function(){
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
	var plConfirmCnt_tot = document.getElementById("plConfirmCnt_tot");
		plConfirmCnt_tot.innerHTML = gf_NumberWithCommas(sumColumn6());
	var plProgress_avg = document.getElementById("plProgress_avg");
		plProgress_avg.innerHTML = gf_NumberWithCommas(sumColumn7());
	var pmConfirmCnt_tot = document.getElementById("pmConfirmCnt_tot");
		pmConfirmCnt_tot.innerHTML = gf_NumberWithCommas(sumColumn8());
	var pmProgress_avg = document.getElementById("pmProgress_avg");
		pmProgress_avg.innerHTML = gf_NumberWithCommas(sumColumn9());
	var pmoConfirmCnt_tot = document.getElementById("pmoConfirmCnt_tot");
		pmoConfirmCnt_tot.innerHTML = gf_NumberWithCommas(sumColumn10());
	var pmoProgress_avg = document.getElementById("pmoProgress_avg");
		pmoProgress_avg.innerHTML = gf_NumberWithCommas(sumColumn11());
	var tftConfirmCnt_tot = document.getElementById("tftConfirmCnt_tot");
		tftConfirmCnt_tot.innerHTML = gf_NumberWithCommas(sumColumn12());
	var tftProgress_avg = document.getElementById("tftProgress_avg");
		tftProgress_avg.innerHTML = gf_NumberWithCommas(sumColumn13());
	return true;
}
function sumColumn1(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Day.cells2(i,1).getValue())
	}
	return out;
}
function sumColumn2(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Day.cells2(i,2).getValue())
	}
	return out;
}
function sumColumn3(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Day.cells2(i,3).getValue())
	}
	return out;
}
function sumColumn4(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		var str = dhxGridStmmng010Day.cells2(i,4).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Day.getRowsNum(); j++){
		if(dhxGridStmmng010Day.cells2(j,4).getValue() != '0%') {
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
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		var str = dhxGridStmmng010Day.cells2(i,5).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Day.getRowsNum(); j++){
		if(dhxGridStmmng010Day.cells2(j,5).getValue() != '0%') {
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
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Day.cells2(i,6).getValue())
	}
	return out;
}
function sumColumn7(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		var str = dhxGridStmmng010Day.cells2(i,7).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Day.getRowsNum(); j++){
		if(dhxGridStmmng010Day.cells2(j,7).getValue() != '0%') {
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
function sumColumn8(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Day.cells2(i,8).getValue())
	}
	return out;
}
function sumColumn9(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		var str = dhxGridStmmng010Day.cells2(i,9).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Day.getRowsNum(); j++){
		if(dhxGridStmmng010Day.cells2(j,9).getValue() != '0%') {
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
function sumColumn10(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Day.cells2(i,10).getValue())
	}
	return out;
}
function sumColumn11(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		var str = dhxGridStmmng010Day.cells2(i,11).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Day.getRowsNum(); j++){
		if(dhxGridStmmng010Day.cells2(j,11).getValue() != '0%') {
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
function sumColumn12(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		out+= parseFloat(dhxGridStmmng010Day.cells2(i,12).getValue())
	}
	return out;
}
function sumColumn13(){
	var out = 0;
	for(var i = 0; i < dhxGridStmmng010Day.getRowsNum(); i++){
		var str = dhxGridStmmng010Day.cells2(i,13).getValue();
		out+= parseFloat(str.replace('%', ''));
	}
	var cnt = 0;
	for(var j = 0; j < dhxGridStmmng010Day.getRowsNum(); j++){
		if(dhxGridStmmng010Day.cells2(j,13).getValue() != '0%') {
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


var cf_SetEventListenerStmmngDay = function() {
	$('#btnSearchStmmng010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmmng010Day('');
    });
	$('#btnResetStmmng010').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmmngDay();
    });
};
var cf_InitFormStmmngDay = function() {
	 $('#searchFormStmmng010').resetForm();
};
var cf_SetBindingStmmngDay = function() {
	fn_SearchStmmng010Day('');
};

/**
 * 조회
 */
var fn_SearchStmmng010Day = function(userId) {
    var jsonParameter = {
            sysSe : gf_FormGetValue('searchFormStmmng010', 'sysSe', 'combo'),
    };
    gf_Transaction(userId, 'stmmng010/searchStmmng010Day', jsonParameter, 'fn_CallbackSearchStmmng010Day', false, 'GET');
};

var fn_CallbackSearchStmmng010Day = function(strSvcID, targetID, data){
	dhxGridStmmng010Day.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListStmmng010Day');
        dhxGridStmmng010Day.parse(data.data.records, 'js');
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListStmmng010Day');
    }
    $("#spanCntSearchFormStmmng010").text(data.data.records.length);
    cf_SetEventListenerStmmngDay();
};
