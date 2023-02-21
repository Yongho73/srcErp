/**
 * 프로그램 : 인사기본 화면 중 Tab2(신상정보) javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.03.02
 * 사용테이블 : MHS_INDVDLINFO 및 MHS_MLTPWR
 **/

var tab2_empno = '';

//var titMhsIndvdlInfo = gf_LocaleTrans('default','titMhsIndvdlInfo');
var titMhsIndvdlInfo = "신상정보";

var dhxInputCalendarTab2EnstDe;  //입대일 달력
var dhxInputCalendarTab2DmblzDe; //전역일 달력

var g_Tab2SearchValue = new Object();  // 정보 최초 조회 값
var g_Tab2SaveValue   = new Object();  // 저장용 값

$(function() {
    cf_InitParam();
    cf_SetComponents();
    cf_InitForm();
    cf_SetEventListener();
    cf_SetBinding();
});

var cf_InitParam = function (){

	//입대일, 전역일 달력
	dhxInputCalendarTab2EnstDe = new dhtmlXCalendarObject({input:"tab2EnstDe", button:"startDateIcon"});
	dhxInputCalendarTab2EnstDe.loadUserLanguage("ko");
	dhxInputCalendarTab2EnstDe.hideTime();
	dhxInputCalendarTab2EnstDe.setDate(gf_GetNowDate().format('YYYY-MM-DD'));
	dhxInputCalendarTab2DmblzDe = new dhtmlXCalendarObject({input:"tab2DmblzDe", button:"startDateIcon"});
	dhxInputCalendarTab2DmblzDe.loadUserLanguage("ko");
	dhxInputCalendarTab2DmblzDe.hideTime();
	dhxInputCalendarTab2DmblzDe.setDate(gf_GetNowDate().format('YYYY-MM-DD'));

	//혈액형
    gf_ComboCode('divInputFormTab2Blood', 'tab2ComboBlood', 'tab2ComboBlood', '', 'C069', '' , '', '', 'asc', '');
    //사회적약자정보
    gf_ComboCode('divInputFormTab2SocwkerCode', 'tab2ComboSocwkerCode', 'tab2ComboSocwkerCode', 'sel', 'C053', '' , '', '', 'asc', '');
    //전역구분
    gf_ComboCode('divInputFormTab2DmblzSeCode', 'tab2ComboDmblzSeCode', 'tab2ComboDmblzSeCode', 'sel', 'C051', '' , '', '', 'asc', '');
    //군별
    gf_ComboCode('divInputFormTab2MsclSeCode', 'tab2ComboMsclSeCode', 'tab2ComboMsclSeCode', 'sel', 'C049', '' , '', '', 'asc', '');
    //병과
    gf_ComboCode('divInputFormTab2BnctrSeCode', 'tab2ComboBnctrSeCode', 'tab2ComboBnctrSeCode', 'sel', 'C095', '' , '', '', 'asc', '');
    //계급
    gf_ComboCode('divInputFormTab2ClssTyCode', 'tab2ComboClssTyCode', 'tab2ComboClssTyCode', 'sel', 'C047', '' , '', '', 'desc', '');
    //병역자원구분 = 군필 유형
    gf_ComboCode('divInputFormTab2SrvddtTy', 'tab2ComboSrvddtTy', 'tab2ComboSrvddtTy', '', 'C094', '' , '', '', 'asc', 'required');
    //미필사유
    gf_ComboCode('divInputFormTab2IncmpResnSeCode', 'tab2ComboIncmpResnSeCode', 'tab2ComboIncmpResnSeCode', 'sel', 'C050', '' , '', '', 'asc', '');
    //보훈종류
    gf_ComboCode('divInputFormTab2RwdmrtSeCode', 'tab2ComboRwdmrtSeCode', 'tab2ComboRwdmrtSeCode', 'sel', 'C096', '' , '', '', 'asc', '');
    //보훈관계
    gf_ComboCode('divInputFormTab2FamilyRelateSe', 'tab2ComboFamilyRelateSe', 'tab2ComboFamilyRelateSe', 'sel', 'C019', '' , '', '', 'asc', '');
    //보훈등급
    gf_ComboCode('divInputFormTab2RwdmrtGrad', 'tab2ComboRwdmrtGrad', 'tab2ComboRwdmrtGrad', 'sel', 'C106', '' , '', '', 'asc', '');
    //장애구분
    gf_ComboCode('divInputFormTab2DspsnSe', 'tab2ComboDspsnSe', 'tab2ComboDspsnSe', 'sel', 'C152', '' , '', '', 'asc', '');
    //장애등급
    gf_ComboCode('divInputFormTab2TroblGradSe', 'tab2ComboTroblGradSe', 'tab2ComboTroblGradSe', 'sel', 'C290', '' , '', '', 'asc', '');
    //장애유형
    gf_ComboCode('divInputFormTab2TroblTyCode', 'tab2ComboTroblTyCode', 'tab2ComboTroblTyCode', 'sel', 'C291', '' , '', '', 'asc', '');
};


var cf_SetComponents = function (){

    $("#saveFormEmp_Tab2_IndvdlInfo").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#saveFormEmp_Tab2_IndvdlInfo .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#saveFormEmp_Tab2_IndvdlInfo .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('.tdl-1 #btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

    $('#btnSave_Tab2').unbind('click').bind('click', function() {

        if($('#saveFormEmp_Tab2_IndvdlInfo').validate().form()){

        	g_Tab2SaveValue.height = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Height', 'text');
        	g_Tab2SaveValue.weight = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Weight', 'text');
        	g_Tab2SaveValue.blood = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboBlood', 'combo'),"");
        	g_Tab2SaveValue.relgn = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Relgn', 'text');
        	g_Tab2SaveValue.hobby = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Hobby', 'text');
        	g_Tab2SaveValue.vehicleNo = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2VehicleNo', 'text');
        	g_Tab2SaveValue.socwkercode = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboSocwkerCode', 'combo'),"");
        	g_Tab2SaveValue.enstDe = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2EnstDe', 'text');
        	g_Tab2SaveValue.dmblzDe = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2DmblzDe', 'text');
        	g_Tab2SaveValue.dmblzSeCode = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboDmblzSeCode', 'combo'),"");
        	g_Tab2SaveValue.msclSeCode = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboMsclSeCode', 'combo'),"");
        	g_Tab2SaveValue.bnctrSeCode = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboBnctrSeCode', 'combo'),"");
        	g_Tab2SaveValue.clssTyCode = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboClssTyCode', 'combo'),"");
        	g_Tab2SaveValue.ssn = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Ssn', 'text');
        	g_Tab2SaveValue.srvddtTy = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboSrvddtTy', 'combo'),"");
        	g_Tab2SaveValue.incmpResnSeCode = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboIncmpResnSeCode', 'combo'),"");
        	if($("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxRwdmrtTrgterAt']:input[value='1']").is(":checked") == true){
	          	g_Tab2SaveValue.rwdmrtTrgterAt = "1";
	        } else {
	          	g_Tab2SaveValue.rwdmrtTrgterAt = "0";
	        }
        	g_Tab2SaveValue.rwdmrtSeCode = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboRwdmrtSeCode', 'combo'),"");
        	g_Tab2SaveValue.familyrelateSe = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboFamilyRelateSe', 'combo'),"");
        	g_Tab2SaveValue.rwdmrtGrad = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboRwdmrtGrad', 'combo'),"");
        	g_Tab2SaveValue.rwdmrtNo = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2RwdmrtNo', 'text');
        	if($("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxDspsnAt']:input[value='1']").is(":checked") == true){
	          	g_Tab2SaveValue.dspsnAt = "1";
	        } else {
	          	g_Tab2SaveValue.dspsnAt = "0";
	        }
        	g_Tab2SaveValue.dspsnSe = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboDspsnSe', 'combo'),"");
        	g_Tab2SaveValue.troblGradSe = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboTroblGradSe', 'combo'),"");
        	g_Tab2SaveValue.troblTyCode = gf_SetNullInit(gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2ComboTroblTyCode', 'combo'),"");
        	
        	if( !gf_IsNull(tab2_empno) ) {
        		// 수정이면 기존과 다른게 있는지 확인  
        		if(g_Tab2SearchValue.height == g_Tab2SaveValue.height && g_Tab2SearchValue.weight == g_Tab2SaveValue.weight && g_Tab2SearchValue.blood == g_Tab2SaveValue.blood && 
        				g_Tab2SearchValue.relgn == g_Tab2SaveValue.relgn && g_Tab2SearchValue.hobby == g_Tab2SaveValue.hobby && g_Tab2SearchValue.vehicleNo == g_Tab2SaveValue.vehicleNo &&
        				g_Tab2SearchValue.socwkercode == g_Tab2SaveValue.socwkercode && g_Tab2SearchValue.enstDe == g_Tab2SaveValue.enstDe && g_Tab2SearchValue.dmblzDe == g_Tab2SaveValue.dmblzDe &&
        				g_Tab2SearchValue.dmblzSeCode == g_Tab2SaveValue.dmblzSeCode && g_Tab2SearchValue.msclSeCode == g_Tab2SaveValue.msclSeCode && g_Tab2SearchValue.bnctrSeCode == g_Tab2SaveValue.bnctrSeCode &&
        				g_Tab2SearchValue.clssTyCode == g_Tab2SaveValue.clssTyCode && g_Tab2SearchValue.ssn == g_Tab2SaveValue.ssn && g_Tab2SearchValue.srvddtTy == g_Tab2SaveValue.srvddtTy &&
        				g_Tab2SearchValue.incmpResnSeCode == g_Tab2SaveValue.incmpResnSeCode && g_Tab2SearchValue.rwdmrtTrgterAt == g_Tab2SaveValue.rwdmrtTrgterAt && g_Tab2SearchValue.rwdmrtSeCode == g_Tab2SaveValue.rwdmrtSeCode &&
        				g_Tab2SearchValue.familyrelateSe == g_Tab2SaveValue.familyrelateSe && g_Tab2SearchValue.rwdmrtGrad == g_Tab2SaveValue.rwdmrtGrad && g_Tab2SearchValue.rwdmrtNo == g_Tab2SaveValue.rwdmrtNo &&
        				g_Tab2SearchValue.dspsnAt == g_Tab2SaveValue.dspsnAt && g_Tab2SearchValue.dspsnSe == g_Tab2SaveValue.dspsnSe && g_Tab2SearchValue.troblGradSe == g_Tab2SaveValue.troblGradSe && g_Tab2SearchValue.troblTyCode == g_Tab2SaveValue.troblTyCode
        				) {
        			alert("수정된 정보가 없습니다.");
        			return false;
        		}
        		
        		//전역일자가 입대일자보다 빠를 수 없음
        		var v_enstDe = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2EnstDe', 'text');  //입대일자
        		var v_dmblzDe = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2DmblzDe', 'text'); //전역일자
        		if(v_enstDe != "" && v_dmblzDe != ""){
        			if(v_enstDe >= v_dmblzDe){
        				alert("입대일자는 전역일자 보다 작을 수 없습니다.");
            			return false;
        			}
        		}

        		gf_DivMsgConfirm("수정하시겠습니까?", 'cf_SaveTab2()', '');
            } else {
            	alert("정보를 확인하시기 바랍니다.");
            }
        }

        $('#saveFormEmp_Tab2_IndvdlInfo div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnInit_Tab2').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
    
    //보훈대상 여부 변경 시
    $('#tab2CheckboxRwdmrtTrgterAt').unbind("change").bind("change",function() {
    	if($("#tab2CheckboxRwdmrtTrgterAt").is(":checked")){
            //alert("체크박스 체크했음!");
    		
    		$("#tab2ComboRwdmrtSeCode").removeAttr("disabled");
    		$("#tab2ComboFamilyRelateSe").removeAttr("disabled");
    		$("#tab2ComboRwdmrtGrad").removeAttr("disabled");
    		$("#tab2RwdmrtNo").removeAttr("disabled");
        }else{
            //alert("체크박스 체크 해제!");
        	$("#tab2ComboRwdmrtSeCode").val("").prop("selected", true);
        	$("#tab2ComboFamilyRelateSe").val("").prop("selected", true);
        	$("#tab2ComboRwdmrtGrad").val("").prop("selected", true);
        	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2RwdmrtNo', "", 'text');
        	
        	$('#tab2ComboRwdmrtSeCode').attr("disabled", true);
        	$('#tab2ComboFamilyRelateSe').attr("disabled", true);
        	$('#tab2ComboRwdmrtGrad').attr("disabled", true);
        	$('#tab2RwdmrtNo').attr("disabled", true);
        }
    });

    //장애인정 여부 변경 시
    $('#tab2CheckboxDspsnAt').unbind("change").bind("change",function() {
    	if($("#tab2CheckboxDspsnAt").is(":checked")){
            //alert("체크박스 체크했음!");
    		
    		$("#tab2ComboDspsnSe").removeAttr("disabled");
    		$("#tab2ComboTroblGradSe").removeAttr("disabled");
    		$("#tab2ComboTroblTyCode").removeAttr("disabled");
        }else{
            //alert("체크박스 체크 해제!");
        	$("#tab2ComboDspsnSe").val("").prop("selected", true);
        	$("#tab2ComboTroblGradSe").val("").prop("selected", true);
        	$("#tab2ComboTroblTyCode").val("").prop("selected", true);
        	
        	$('#tab2ComboDspsnSe').attr("disabled", true);
        	$('#tab2ComboTroblGradSe').attr("disabled", true);
        	$('#tab2ComboTroblTyCode').attr("disabled", true);
        }
    });
};

var cf_SetBinding = function (){
    fn_SearchMhshrb001Tab2();
};

var cf_InitForm = function (){
	
	g_Tab2SearchValue.height = "";
	g_Tab2SearchValue.weight = "";
	g_Tab2SearchValue.blood = "";
	g_Tab2SearchValue.relgn = "";
	g_Tab2SearchValue.hobby = "";
	g_Tab2SearchValue.vehicleNo = "";
	g_Tab2SearchValue.socwkercode = "";
	g_Tab2SearchValue.enstDe = "";
	g_Tab2SearchValue.dmblzDe = "";
	g_Tab2SearchValue.dmblzSeCode = "";
	g_Tab2SearchValue.msclSeCode = "";
	g_Tab2SearchValue.bnctrSeCode = "";
	g_Tab2SearchValue.clssTyCode = "";
	g_Tab2SearchValue.ssn = "";
	g_Tab2SearchValue.srvddtTy = "";
	g_Tab2SearchValue.incmpResnSeCode = "";
	g_Tab2SearchValue.rwdmrtTrgterAt = "";
	g_Tab2SearchValue.rwdmrtSeCode = "";
	g_Tab2SearchValue.familyrelateSe = "";
	g_Tab2SearchValue.rwdmrtGrad = "";
	g_Tab2SearchValue.rwdmrtNo = "";
	g_Tab2SearchValue.dspsnAt = "";
	g_Tab2SearchValue.dspsnSe = "";
	g_Tab2SearchValue.troblGradSe = "";
	g_Tab2SearchValue.troblTyCode = "";
};

var cf_InitInputForm = function (){

    tab2_empno = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'empno', 'text');

    gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Height', g_Tab2SearchValue.height,'text');
	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Weight', g_Tab2SearchValue.weight,'text');
	$("#tab2ComboBlood").val(g_Tab2SearchValue.blood).prop("selected", true);
	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Relgn', g_Tab2SearchValue.relgn,'text');
	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Hobby', g_Tab2SearchValue.hobby,'text');
	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2VehicleNo', g_Tab2SearchValue.vehicleNo,'text');
	$("#tab2ComboSocwkerCode").val(g_Tab2SearchValue.socwkercode).prop("selected", true);
	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2EnstDe', g_Tab2SearchValue.enstDe,'text');
	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2DmblzDe', g_Tab2SearchValue.dmblzDe,'text');
	$("#tab2ComboDmblzSeCode").val(g_Tab2SearchValue.dmblzSeCode).prop("selected", true);
	$("#tab2ComboMsclSeCode").val(g_Tab2SearchValue.msclSeCode).prop("selected", true);
	$("#tab2ComboBnctrSeCode").val(g_Tab2SearchValue.bnctrSeCode).prop("selected", true);
	$("#tab2ComboClssTyCode").val(g_Tab2SearchValue.clssTyCode).prop("selected", true);
	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Ssn', g_Tab2SearchValue.ssn,'text');
	$("#tab2ComboSrvddtTy").val(g_Tab2SearchValue.srvddtTy).prop("selected", true);
	$("#tab2ComboIncmpResnSeCode").val(g_Tab2SearchValue.incmpResnSeCode).prop("selected", true);
	
    if(g_Tab2SearchValue.rwdmrtTrgterAt == "1") {
    	$("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxRwdmrtTrgterAt']:input[value='1']").prop("checked", true);
		$("#tab2ComboRwdmrtSeCode").removeAttr("disabled");
		$("#tab2ComboFamilyRelateSe").removeAttr("disabled");
		$("#tab2ComboRwdmrtGrad").removeAttr("disabled");
		$("#tab2RwdmrtNo").removeAttr("disabled");
    } else {
    	$("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxRwdmrtTrgterAt']:input[value='1']").prop("checked", false);
    	$('#tab2ComboRwdmrtSeCode').attr("disabled", true);
    	$('#tab2ComboFamilyRelateSe').attr("disabled", true);
    	$('#tab2ComboRwdmrtGrad').attr("disabled", true);
    	$('#tab2RwdmrtNo').attr("disabled", true);
    }
	$("#tab2ComboRwdmrtSeCode").val(g_Tab2SearchValue.rwdmrtSeCode).prop("selected", true);
	$("#tab2ComboFamilyRelateSe").val(g_Tab2SearchValue.familyrelateSe).prop("selected", true);
	$("#tab2ComboRwdmrtGrad").val(g_Tab2SearchValue.rwdmrtGrad).prop("selected", true);
	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2RwdmrtNo', g_Tab2SearchValue.rwdmrtNo,'text');
	
    if(g_Tab2SearchValue.dspsnAt == "1") {
    	$("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxDspsnAt']:input[value='1']").prop("checked", true);
		$("#tab2ComboDspsnSe").removeAttr("disabled");
		$("#tab2ComboTroblGradSe").removeAttr("disabled");
		$("#tab2ComboTroblTyCode").removeAttr("disabled");
    } else {
    	$("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxDspsnAt']:input[value='1']").prop("checked", false);
    	$('#tab2ComboDspsnSe').attr("disabled", true);
    	$('#tab2ComboTroblGradSe').attr("disabled", true);
    	$('#tab2ComboTroblTyCode').attr("disabled", true);
    }
	$("#tab2ComboDspsnSe").val(g_Tab2SearchValue.dspsnSe).prop("selected", true);
	$("#tab2ComboTroblGradSe").val(g_Tab2SearchValue.troblGradSe).prop("selected", true);
	$("#tab2ComboTroblTyCode").val(g_Tab2SearchValue.troblTyCode).prop("selected", true);

};

var fn_SearchMhshrb001Tab2 = function (){
	var empno    = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'empno', 'text');
	var bplcCode = gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'bplcCode', 'text');
	
	if(empno.trim() == "") {
		return;
	}
	tab2_empno = empno;
	g_Tab2SearchValue.empno = empno;
    g_Tab2SearchValue.bplcCode = bplcCode;
	
    var jsonParameter = {
    	empno : gf_FormGetValue('saveFormEmp_Tab2_IndvdlInfo', 'empno', 'text')
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmpIndvdlInfo', jsonParameter, 'fn_CallbackSearchMhshrb001Tab2', false, 'GET');
};

var fn_CallbackSearchMhshrb001Tab2 = function (strSvcID, targetID, data){
    if(!gf_IsNull(data.data)){
        //dhxGridMhsAcdmcr.parse(data.data.records, 'js');
    	g_Tab2SearchValue.height = gf_SetNullInit(data.data.height,"");
    	g_Tab2SearchValue.weight = gf_SetNullInit(data.data.weight,"");
    	g_Tab2SearchValue.blood = gf_SetNullInit(data.data.blood,"");
    	g_Tab2SearchValue.relgn = gf_SetNullInit(data.data.relgn,"");
    	g_Tab2SearchValue.hobby = gf_SetNullInit(data.data.hobby,"");
    	g_Tab2SearchValue.vehicleNo = gf_SetNullInit(data.data.vehicleNo,"");
    	g_Tab2SearchValue.socwkercode = gf_SetNullInit(data.data.socwkercode,"");
    	g_Tab2SearchValue.enstDe = gf_SetNullInit(data.data.enstDe,"");
    	g_Tab2SearchValue.dmblzDe = gf_SetNullInit(data.data.dmblzDe,"");
    	g_Tab2SearchValue.dmblzSeCode = gf_SetNullInit(data.data.dmblzSeCode,"");
    	g_Tab2SearchValue.msclSeCode = gf_SetNullInit(data.data.msclSeCode,"");
    	g_Tab2SearchValue.bnctrSeCode = gf_SetNullInit(data.data.bnctrSeCode,"");
    	g_Tab2SearchValue.clssTyCode = gf_SetNullInit(data.data.clssTyCode,"");
    	g_Tab2SearchValue.ssn = gf_SetNullInit(data.data.ssn,"");
    	g_Tab2SearchValue.srvddtTy = gf_SetNullInit(data.data.srvddtTy,"");
    	g_Tab2SearchValue.incmpResnSeCode = gf_SetNullInit(data.data.incmpResnSeCode,"");
    	g_Tab2SearchValue.rwdmrtTrgterAt = gf_SetNullInit(data.data.rwdmrtTrgterAt,"0");
    	g_Tab2SearchValue.rwdmrtSeCode = gf_SetNullInit(data.data.rwdmrtSeCode,"");
    	g_Tab2SearchValue.familyrelateSe = gf_SetNullInit(data.data.familyrelateSe,"");
    	g_Tab2SearchValue.rwdmrtGrad = gf_SetNullInit(data.data.rwdmrtGrad,"");
    	g_Tab2SearchValue.rwdmrtNo = gf_SetNullInit(data.data.rwdmrtNo,"");
    	g_Tab2SearchValue.dspsnAt = gf_SetNullInit(data.data.dspsnAt,"0");
    	g_Tab2SearchValue.dspsnSe = gf_SetNullInit(data.data.dspsnSe,"");
    	g_Tab2SearchValue.troblGradSe = gf_SetNullInit(data.data.troblGradSe,"");
    	g_Tab2SearchValue.troblTyCode = gf_SetNullInit(data.data.troblTyCode,"");
    	
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Height', data.data.height,'text');
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Weight', data.data.weight,'text');
    	$("#tab2ComboBlood").val(data.data.blood).prop("selected", true);
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Relgn', data.data.relgn,'text');
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Hobby', data.data.hobby,'text');
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2VehicleNo', data.data.vehicleNo,'text');
    	$("#tab2ComboSocwkerCode").val(data.data.socwkercode).prop("selected", true);
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2EnstDe', data.data.enstDe,'text');
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2DmblzDe', data.data.dmblzDe,'text');
    	$("#tab2ComboDmblzSeCode").val(data.data.dmblzSeCode).prop("selected", true);
    	$("#tab2ComboMsclSeCode").val(data.data.msclSeCode).prop("selected", true);
    	$("#tab2ComboBnctrSeCode").val(data.data.bnctrSeCode).prop("selected", true);
    	$("#tab2ComboClssTyCode").val(data.data.clssTyCode).prop("selected", true);
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2Ssn', data.data.ssn,'text');
    	$("#tab2ComboSrvddtTy").val(data.data.srvddtTy).prop("selected", true);
    	$("#tab2ComboIncmpResnSeCode").val(data.data.incmpResnSeCode).prop("selected", true);
    	
        if(data.data.rwdmrtTrgterAt == "1") {
        	$("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxRwdmrtTrgterAt']:input[value='1']").prop("checked", true);
    		$("#tab2ComboRwdmrtSeCode").removeAttr("disabled");
    		$("#tab2ComboFamilyRelateSe").removeAttr("disabled");
    		$("#tab2ComboRwdmrtGrad").removeAttr("disabled");
    		$("#tab2RwdmrtNo").removeAttr("disabled");
        } else {
        	$("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxRwdmrtTrgterAt']:input[value='1']").prop("checked", false);
        	$('#tab2ComboRwdmrtSeCode').attr("disabled", true);
        	$('#tab2ComboFamilyRelateSe').attr("disabled", true);
        	$('#tab2ComboRwdmrtGrad').attr("disabled", true);
        	$('#tab2RwdmrtNo').attr("disabled", true);
        }
    	$("#tab2ComboRwdmrtSeCode").val(data.data.rwdmrtSeCode).prop("selected", true);
    	$("#tab2ComboFamilyRelateSe").val(data.data.familyrelateSe).prop("selected", true);
    	$("#tab2ComboRwdmrtGrad").val(data.data.rwdmrtGrad).prop("selected", true);
    	gf_FormSetValue('saveFormEmp_Tab2_IndvdlInfo', 'tab2RwdmrtNo', data.data.rwdmrtNo,'text');
    	
        if(data.data.dspsnAt == "1") {
        	$("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxDspsnAt']:input[value='1']").prop("checked", true);
    		$("#tab2ComboDspsnSe").removeAttr("disabled");
    		$("#tab2ComboTroblGradSe").removeAttr("disabled");
    		$("#tab2ComboTroblTyCode").removeAttr("disabled");
        } else {
        	$("#saveFormEmp_Tab2_IndvdlInfo input[name='tab2CheckboxDspsnAt']:input[value='1']").prop("checked", false);
        	$('#tab2ComboDspsnSe').attr("disabled", true);
        	$('#tab2ComboTroblGradSe').attr("disabled", true);
        	$('#tab2ComboTroblTyCode').attr("disabled", true);
        }
    	$("#tab2ComboDspsnSe").val(data.data.dspsnSe).prop("selected", true);
    	$("#tab2ComboTroblGradSe").val(data.data.troblGradSe).prop("selected", true);
    	$("#tab2ComboTroblTyCode").val(data.data.troblTyCode).prop("selected", true);
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
    }
    cf_SetEventListener();
};

//Tab2 저장
var cf_SaveTab2  = function (){
	//필수 체크
	var vMltpwrChk = "N"; // 병역 테이블 수정 여부
	//병역 테이블에 저장 할 내용 있는지 확인
	if(g_Tab2SearchValue.dmblzSeCode != g_Tab2SaveValue.dmblzSeCode || g_Tab2SearchValue.msclSeCode != g_Tab2SaveValue.msclSeCode ||  g_Tab2SearchValue.bnctrSeCode != g_Tab2SaveValue.bnctrSeCode || g_Tab2SearchValue.clssTyCode != g_Tab2SaveValue.clssTyCode ||
			g_Tab2SearchValue.ssn != g_Tab2SaveValue.ssn || g_Tab2SearchValue.srvddtTy != g_Tab2SaveValue.srvddtTy || g_Tab2SearchValue.incmpResnSeCode != g_Tab2SaveValue.incmpResnSeCode ) {
		vMltpwrChk = "Y";
	}
	else { vMltpwrChk = "N"; }
	
	var jsonParameter = {
	        empno : g_Tab2SearchValue.empno,
	        bplcCode : g_Tab2SearchValue.bplcCode,

	        height : g_Tab2SaveValue.height,  // 신장
	        weight : g_Tab2SaveValue.weight,  // 체중
	        blood : g_Tab2SaveValue.blood,  // 혈액형
	        relgn : g_Tab2SaveValue.relgn,  // 종교
	        hobby : g_Tab2SaveValue.hobby,  // 취미
	        vehicleNo : g_Tab2SaveValue.vehicleNo,  // 소유차량번호
	        socwkercode : g_Tab2SaveValue.socwkercode,  // 사회적약자정보
	        enstDe : g_Tab2SaveValue.enstDe.replaceAll('-',''),  // 입대일자
	        dmblzDe : g_Tab2SaveValue.dmblzDe.replaceAll('-',''),  // 전역일자
	        dmblzSeCode : g_Tab2SaveValue.dmblzSeCode,  // 전역구분
	        msclSeCode : g_Tab2SaveValue.msclSeCode,  // 군별
	        bnctrSeCode : g_Tab2SaveValue.bnctrSeCode,  // 병과
	        clssTyCode : g_Tab2SaveValue.clssTyCode,  // 계급
	        ssn : g_Tab2SaveValue.ssn,  // 군번
	        srvddtTy : g_Tab2SaveValue.srvddtTy,  // 병역자원구분 = 군필 유형
	        incmpResnSeCode : g_Tab2SaveValue.incmpResnSeCode,  // 미필사유
	        rwdmrtTrgterAt : g_Tab2SaveValue.rwdmrtTrgterAt,  // 보훈대상
	        rwdmrtSeCode : g_Tab2SaveValue.rwdmrtSeCode,  // 보훈종류
	        familyrelateSe : g_Tab2SaveValue.familyrelateSe,  // 보훈관계
	        rwdmrtGrad : g_Tab2SaveValue.rwdmrtGrad,  // 보훈등급
	        rwdmrtNo : g_Tab2SaveValue.rwdmrtNo,  // 보훈번호
	        dspsnAt : g_Tab2SaveValue.dspsnAt,  // 장애인정
	        dspsnSe : g_Tab2SaveValue.dspsnSe,  // 장애구분
	        troblGradSe : g_Tab2SaveValue.troblGradSe,  // 장애등급
	        troblTyCode : g_Tab2SaveValue.troblTyCode,  // 장애유형
	        
	        mltpwrChk : vMltpwrChk
	    };

	    var url = "mhshrb001/saveMhsEmpIndvdlInfo";  
	    var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
	    if(dataSource.code === '000') {
            gf_DivMsgAlert(gv_MsgUpdate);

            fn_SearchMhshrb001Tab2();
	    }
};
