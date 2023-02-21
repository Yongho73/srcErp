/**
 *    프로그램       : 개인휴무신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.02
 *    사용테이블      : MHS_INDVDL_HVOF_MGRT
 * sourceGen version : 2020.09.02.01 (2020.09.02)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubwks022 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwks022 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwks022 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwks022 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwks022 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwks022 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwks022 = 0;  //그리드 삭제 수량 
var dhxGridPubwks022;  //그리드 객체
var eventIdPubwks022 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPubwks022;  //DataProcessor 객체
var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;
var nowDate = "";
var pageElctsctSeSn;
var pageElctsctSttusCode;	// 월 별 승인 상태에 따른 제어 위한 변수
var pageElctsctSttusCodeNm;
var pageReturnResn;
var maxElctsctSeSn;

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
	cf_InitParamPubwks022();
	fn_Calendar();
   cf_SetEventListenerPubwks022();
   cf_InitFormPubwks022();
   cf_SetBindingPubwks022();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwks022 = function() {
    gf_SetMenuPath();
    $("#saveFormPubwks022").validate({ errorElement: 'div', ignore: '' });
    $("#searchFormPubwks022").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsPubwks022 = function() {

};

var cf_SetEventListenerPubwks022 = function() {
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwks022').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#btnSavePubwks022').unbind('click').bind('click', function() {
        gf_errorMsgClear();
    });
    $('#btnRemovePubwks022').unbind('click').bind('click', function() {
        gf_errorMsgClear();
    });
    $('#btnExcelPubwks022').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwks022();
    });
    $('#btnSearchPubwks022').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_MakeCalendar("initSearch");
    });
    $('#btnResetPubwks022').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwks022();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPubwks022').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPubwks022, $('#checkAllPubwks022').prop('checked'), 'chk');
    });
    $('#searchFormPubwks022 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPubwks022').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks022').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 달력 생성 이벤트 =======================================================================================
//    $("#hvofDeSearchFormPubwks022").unbind("change").bind("change", function(){
//    	gf_errorMsgClear();
//    	fn_MakeCalendar("initSearch");
//    });
    $("#searchElctsctSeSn").unbind("change").bind("change", function(){
    	gf_errorMsgClear();
    	var searchMonth = $('#hvofDeSearchFormPubwks022').val().replaceAll('-','');
    	if(gf_IsNull(searchMonth)){
    		gf_DivMsgAlert("휴무 년월을 확인하여 주세요.");
    	}
    	else{
    		fn_MakeCalendar("elctsctSeSnSearch");
    	}
    });
    $('#bundleRequestPopup').unbind("click").bind("click",function() {
	    gf_errorMsgClear();
	    if($("#searchFormPubwks022").validate().form() && gf_IsNull(pageElctsctSttusCode)){
	    	var empno = gf_FormGetValue('searchFormPubwks022', 'empno', 'text');
	    	var hvofYm = $('#hvofDeSearchFormPubwks022').val().replaceAll('-','');
	    	var param = "paramEmpno=" + empno + "&paramHvofYm=" + hvofYm;
	    	fn_BundleReqstPopup('form1' , '' , '' ,param);
	    }
	    else{
	    	gf_DivMsgAlert(pageElctsctSttusCodeNm + "상태인 월은 등록하실 수 없습니다.");
	    }
	});
    $('#bundleApprovalRequest').unbind("click").bind("click",function() {
	    gf_errorMsgClear();
	    if(!gf_IsNull(pageElctsctSttusCode)){
	    	gf_DivMsgAlert(pageElctsctSttusCodeNm + "상태는 승인신청 하실 수 없습니다.");
	    }
	    else{
	    	fn_BundelSttusRequest("approvalRequest");
	    }
    });

    $('#bundleCopy').unbind("click").bind("click" , function(){
    	if(gf_IsNull(pageElctsctSttusCode) || pageElctsctSttusCode != '003'){	// 승인 싱청 상태
    		gf_DivMsgAlert("반려 상태만 복사 가능합니다.");
    	}
    	else{
    		fn_BundleCopy();
    	}
    });
  //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubwks022","empno","empNm",'', "Y", "fn_SearchPubEmpCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchPubEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks022', 'empNm', '', 'text');
		}
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchPubEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks022', 'empno', '', 'text');
		}		
    });
    //부서 선택 Popup
	$('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormPubwks022","deptCode","deptCodeNm",'', "Y", "fn_SearchPubDeptCode");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchPubDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks022', 'deptCodeNm', '', 'text');
		}
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchPubDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks022', 'deptCode', '', 'text');
		}
	});
    
};

var cf_InitFormPubwks022 = function() {
    $('#searchFormPubwks022').resetForm();
    
	gf_FormSetValue("searchFormPubwks022", "deptCode", sessionUserDeptCode , '');
	gf_FormSetValue("searchFormPubwks022", "deptCodeNm", sessionUserDeptNm , '');
	gf_FormSetValue("searchFormPubwks022", "empno", sessionUserEmpno , '');
	gf_FormSetValue("searchFormPubwks022", "empNm", sessionUserEmpnm , '');
};

var cf_SetBindingPubwks022 = function() {
	fn_SessionCheck();
	$("#searchFormPubwks022 #deptCode").attr("disabled" , true);
	$("#searchFormPubwks022 #deptCodeNm").attr("disabled" , true);
	$("#searchFormPubwks022 #empno").attr("disabled" , true);
	$("#searchFormPubwks022 #empNm").attr("disabled" , true);
	$("#searchFormPubwks022 #btnDeptCodeSearch").attr("disabled" , true);
	$("#searchFormPubwks022 #btnEmpSearch").attr("disabled" , true);
	$("#bundleApproval").attr("disabled" , true);
	$("#bundleReturn").attr("disabled" , true);
	gf_FormSetValue('searchFormPubwks022', 'searchHvofDe', nowDate.substring(0,7) , 'text');
	fn_MakeCalendar("initSearch");
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
//--부서 입력 후 Enter 이벤트
function fn_SearchPubDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormPubwks022', 'deptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormPubwks022', 'deptCodeNm', 'text'), 
			useAt : '1'
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchPubDeptCode', false, 'GET');
}

function fn_CallbackSearchPubDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormPubwks022', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormPubwks022', 'deptCodeNm', data.deptKorNm, 'text');
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormPubwks022","deptCode","deptCodeNm", '' , "Y", null);
    }
}

//--사원 입력 후 Enter 이벤트
function fn_SearchPubEmpCode(){
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormPubwks022', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormPubwks022', 'empNm', 'text'),
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormPubwks022', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormPubwks022', 'empNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormPubwks022","empno","empNm", '' , "Y", null);
  	}
}

var fn_MakeCalendar = function(searchType){
//	gf_FormSetValue('searchFormPubwks022', 'searchHvofDe', nowDate.substring(0,7) , 'text');
	var month = gf_FormGetValue('searchFormPubwks022', 'searchHvofDe', 'text').split('-');
	var jsonParameter = {
			hvofDe : month[0] + '' + month[1]
	};
	var dataSource = gf_NoAsyncTransaction('pubwks022/makeCalendar', jsonParameter, 'GET');
	if(dataSource.code == "000"){
		fn_CallbackMakeCalendar(dataSource.data , searchType);
	}
}
function fn_CallbackMakeCalendar(data , searchType){
//	console.log(data);
	var calendarArr = data.records;
	var startWeekDay = calendarArr[0].deSeCode;
	var startMonth = calendarArr[0].jobDe.substring(0,6);
	var fontColor;
	var workTime;
	var elctsctSttusCodeNm;
	var str = "<tr bgcolor='#1E5CAO' height='26px'><td width='100px'>" +
		"<div align='center'><font color='#FF0000' style='font-weight: bold;'>일</font></div>" +
		 "</td>" +
		 "<td width='100px'>" +
				"<div align='center'><font color='#FFFFFF' style='font-weight: bold;'>월</font></div>" +
		 "</td>" +
		 "<td width='100px'>" +
				"<div align='center'><font color='#FFFFFF' style='font-weight: bold;'>화</font></div>" +
		"</td>" +
		 "<td width='100px'>" +
				"<div align='center'><font color='#FFFFFF' style='font-weight: bold;'>수</font></div>" +
		 "</td>" +
		 "<td width='100px'>" +
				"<div align='center'><font color='#FFFFFF' style='font-weight: bold;'>목</font></div>" +
		 "</td>" +
		 "<td width='100px'>" +
				"<div align='center'><font color='#FFFFFF' style='font-weight: bold;'>금</font></div>" +
		 "</td>" +
		 "<td width='100px'>" +
				"<div align='center'><font color='#5AD2FF' style='font-weight: bold;'>토</font></div>" +
		 "</td></tr><tr>";
	for(var i=0; i < startWeekDay ; i++){
		str += "<td>&nbsp;</td>";
	}
	for(var i=0 ; i < calendarArr.length ; i++){
		if("1" == calendarArr[i].hvofAt && "6" == calendarArr[i].deSeCode){
			fontColor = "#5AD2FF";
		}
		else if("1" == calendarArr[i].hvofAt){
			fontColor = "#FF0000";
		}
		else{
			fontColor = "#505050";
		}
		
		if(gf_IsNull(calendarArr[i].elctsctSttusCodeNm)){
			elctsctSttusCodeNm = '';
		}else elctsctSttusCodeNm = calendarArr[i].elctsctSttusCodeNm;
//		console.log(calendarArr[i]);
			str += "<td bgcolor='#FFFFFF' style='vertical-align: text-top;' ondblclick=''>"
			  	+  "<input type='text' name='calenderDd"+ (i+1) +"' id='calenderDd"+ (i+1) +"' style='background-color: transparent; width:20px; border: 0px; font-weight: bold; color:"+fontColor+";' value='" + (i+1) +  "' readonly/>"
			  	+  "<div class='checkbox' style='height:auto;'>"
			  	+  "<label><input type='checkbox' name='hvofDeCheck"+ (i+1) +"' id='hvofDeCheck"+ (i+1) +"' onchange='fn_SetHvofDe(" + calendarArr[i].jobDe + ',' + calendarArr[i].deSeCode + ','  + 'this' + ',' + (i+1) +")'/><i class='input-helper'></i></label>"
			    +  "</div><br/>"
			  	+  "<input type='text' name='elctsctSttusCodeNm"+ (i+1) +"' id='elctsctSttusCodeNm"+ (i+1) +"' style='font-weight:bold;background-color: transparent; width:98%; color:green; border: 0px;' readonly/><br />"
				
			  	+  "<input type='hidden' name='elctsctSeSn"+ (i+1) +"' id='elctsctSeSn"+ (i+1) +"'/>"
			  	+  "<input type='hidden' name='elctsctSttusCode"+ (i+1) +"' id='elctsctSttusCode"+ (i+1) +"'/>"
			  	+  "<input type='hidden' name='elctsctEmpno"+ (i+1) +"' id='elctsctEmpno"+ (i+1) +"'/>"
			  	+  "<input type='hidden' name='returnResn"+ (i+1) +"' id='returnResn"+ (i+1) +"'/>"
				;
				
			
			//다음주
			if (6 == calendarArr[i].deSeCode) {
				str += "</tr><tr>";
			}
		
	}
	str += "</tr>";
	$("#dateCell").html(str);
	
	if(searchType == "initSearch"){
		fn_GetHvofDe();
	}
	else if(searchType == "elctsctSeSnSearch"){
		fn_GetHvofDeElctsctSeSnChange();
	}
}
var fn_SetHvofDe = function(day , deSeCode , el , num){
	if(gf_IsNull(pageElctsctSttusCode)){
		var tagId = el.id;
		var tmpDay = day + '';
		var hvofYm = tmpDay.substring(0,6);
		var hvofDe = day;
		var wdayCode = deSeCode;
		var empno = gf_FormGetValue('searchFormPubwks022', 'empno', 'text');
		var url = $("#"+tagId).is(":checked") ? 'pubwks022/savePubwks022' : 'pubwks022/deletePubwks022';
		var jsonParameterForSaveHvofDe = {
				hvofYm : hvofYm,
				hvofDe : hvofDe,
				wdayCode : wdayCode,
				empno : empno,
				elctsctSeSn : pageElctsctSeSn
		}
//	console.log(jsonParameterForSaveHvofDe);
		var dataSource = gf_NoAsyncTransaction(url, jsonParameterForSaveHvofDe, 'GET');
//	console.log(dataSource);
		if(dataSource.data.code == "000"){
			fn_MakeCalendar("initSearch");
		}
		else{
			gf_DivMsgAlert(dataSource.data.message);
		}
	}
	else{
		gf_DivMsgAlert(pageElctsctSttusCodeNm + "상태인 월은 수정할 수 없습니다.");
		$('#'+el.id).prop("checked" , false);
	}
}

var fn_GetHvofDe = function(){
	var empno = gf_FormGetValue('searchFormPubwks022', 'empno', 'text');
	var hvofYm = gf_FormGetValue('searchFormPubwks022', 'searchHvofDe', 'text').replaceAll('-','');
	var jsonParameterForGetHvofDe = {
			empno : empno,
			hvofYm : hvofYm,
            deptCode  : gf_FormGetValue('searchFormPubwks022', 'deptCode', 'text'),
	}
	var dataSource = gf_NoAsyncTransaction('pubwks022/searchPubwks022', jsonParameterForGetHvofDe, 'GET');
	var records = dataSource.data.records;
	var setDay;
	maxElctsctSeSn = 0; // 해당 년월 , 해당 사원에 대한 데이터 모두 조회 후 제일 높은 구분 순번 저장 변수
//	console.log(records);
	for(var i = 0; i < records.length; i++){
		if(maxElctsctSeSn < records[i].elctsctSeSn){
			maxElctsctSeSn = records[i].elctsctSeSn;
		}
	}
	for(var j = 0 ; j < records.length; j++){
		if(maxElctsctSeSn == records[j].elctsctSeSn){
			pageElctsctSeSn = records[j].elctsctSeSn;
			pageElctsctSttusCode = records[j].elctsctSttusCode;
			pageElctsctSttusCodeNm = records[j].elctsctSttusCodeNm;
			pageReturnResn = records[j].returnResn;
			setDay = records[j].hvofDe.substr(6);
			$('#hvofDeCheck' + (setDay * 1)).attr('checked',true);
			$('#elctsctSeSn' + (setDay * 1)).val(records[j].elctsctSeSn);
		}
	}
	
	$('#searchElctsctSeSn').children('option').remove();

	for(var i = 1 ; i <= maxElctsctSeSn ; i++){
		var selectBox = "<option name= '" + i + "'value='"+ i +"'>" + i + "</option>";
		$('#searchElctsctSeSn').append(selectBox);
		$('#searchElctsctSeSn').val(i);
	}

	if(records.length == 0){
		pageElctsctSeSn = 0;
		pageElctsctSttusCodeNm = '';
		pageElctsctSttusCode = '';
		pageReturnResn = '';
	}

	$('#elctsctSttusCodeNmSearchFormPubwks022').val(pageElctsctSttusCodeNm);
	$('#returnResnSearchFormPubwks022').val(pageReturnResn);
//	console.log("pageElctsctSeSn = " + pageElctsctSeSn);
//	console.log("pageElctsctSttusCode = " + pageElctsctSttusCode);
//	console.log("pageElctsctSttusCodeNm = " + pageElctsctSttusCodeNm);
}

var fn_GetHvofDeElctsctSeSnChange = function(){
	var elctsctSeSn =  $('#searchElctsctSeSn').val();
	var hvofYm = $('#hvofDeSearchFormPubwks022').val().replaceAll('-','');
	var jsonParameterForSearchHvofDe = {
		empno : gf_FormGetValue('searchFormPubwks022', 'empno', 'text'),
		hvofYm : hvofYm,
		elctsctSeSn : elctsctSeSn
	}
	var dataSource = gf_NoAsyncTransaction('pubwks022/searchPubwks022', jsonParameterForSearchHvofDe, 'GET');
	var records = dataSource.data.records;
//	console.log(dataSource);
	
	for(var j = 0 ; j < records.length; j++){
	    pageElctsctSeSn = records[j].elctsctSeSn;
		pageElctsctSttusCode = records[j].elctsctSttusCode;
		pageElctsctSttusCodeNm = records[j].elctsctSttusCodeNm;
		pageReturnResn = records[j].returnResn;
		setDay = records[j].hvofDe.substr(6);
		$('#hvofDeCheck' + (setDay * 1)).attr('checked',true);
		$('#elctsctSeSn' + (setDay * 1)).val(records[j].elctsctSeSn);
	}
	
	if(records.length == 0 || gf_IsNull(pageElctsctSttusCode)){
		pageElctsctSttusCodeNm = '';
		pageElctsctSttusCode = '';
		pageReturnResn = '';
	}
	
	$('#elctsctSttusCodeNmSearchFormPubwks022').val(pageElctsctSttusCodeNm);
	$('#returnResnSearchFormPubwks022').val(pageReturnResn);
	
//	console.log("pageElctsctSeSn = " + pageElctsctSeSn);
//	console.log("pageElctsctSttusCode = " + pageElctsctSttusCode);
//	console.log("pageElctsctSttusCodeNm = " + pageElctsctSttusCodeNm);
}

var fn_BundelSttusRequest = function(sttusType){
	var elctsctSttusCode;
	var hvofYm = $('#hvofDeSearchFormPubwks022').val().replaceAll('-','');
	if(sttusType == "approvalRequest"){
		elctsctSttusCode = "001";
	}
	else if(sttusType == "approval"){
		elctsctSttusCode = "002";
	}
	else if(sttusType == "return"){
		elctsctSttusCode = "003";
	}

	if(gf_IsNull(pageElctsctSeSn)){
		gf_DivMsgAlert("구분 순번이 존재하지 않습니다.");
	}
	else{
		var jsonParameterForSttusUpdate = {
			empno :  gf_FormGetValue('searchFormPubwks022', 'empno', 'text'),
			hvofYm : hvofYm,
			elctsctSttusCode : elctsctSttusCode,
			elctsctSeSn : pageElctsctSeSn
		}
		var dataSource = gf_NoAsyncTransaction('pubwks022/sttusUpdatePubwks022', jsonParameterForSttusUpdate, 'GET');
		console.log(dataSource);
		if(dataSource.code == "000"){
			gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
			fn_MakeCalendar("initSearch");
		}
		else if(dataSource.code != "000"){
			gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
		}
	}
}

var fn_BundleCopy = function(){
	var empno = gf_FormGetValue('searchFormPubwks022', 'empno', 'text');
	var hvofYm = $('#hvofDeSearchFormPubwks022').val().replaceAll('-','');
	if(gf_IsNull(empno) || gf_IsNull(hvofYm)){
		gf_DivMsgAlert("사원 또는 휴무년월을 확인하여 주세요.");
	}
	else{
		var jsonParameterForCopy = {
				empno : empno,
				hvofYm : hvofYm,
				elctsctSeSn : pageElctsctSeSn
		}
//		console.log(jsonParameterForCopy);
		var dataSource = gf_NoAsyncTransaction('pubwks022/copyPubwks022', jsonParameterForCopy, 'GET');
//		console.log(dataSource);
		if(dataSource.data.code  == "000"){
			gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
			fn_MakeCalendar("initSearch");
		}
		else if(dataSource.data.code == "999" || dataSource.data.code != "000"){
			gf_DivMsgAlert("복사 요청 한 구분 순번 보다 높은 구분 순번이 존재합니다.");
		}
	}
}

var fn_SessionCheck = function(){
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
//    console.log(userInfo);
    if(userInfo.code == "000"){
    	sessionUserDeptCode = userInfo.data.userDeptCode;
    	sessionUserDeptNm = userInfo.data.userDeptNm;
    	sessionUserEmpno = userInfo.data.userEmpNo;
    	sessionUserEmpnm = userInfo.data.userNm;

    	gf_FormSetValue("searchFormPubwks022", "deptCode", sessionUserDeptCode , '');
		gf_FormSetValue("searchFormPubwks022", "deptCodeNm", sessionUserDeptNm , '');
		gf_FormSetValue("searchFormPubwks022", "empno", sessionUserEmpno , '');
		gf_FormSetValue("searchFormPubwks022", "empNm", sessionUserEmpnm , '');
    }	
}
var fn_BundleReqstPopup = function(formId, codeId, codeNmId, param) {
	var userId = ""; 
	var title  = "휴일일괄등록";
	//저장팝업
	var dhxWindowObj;
	var popupDtlRequst;
	if($('body').find("div[id='popupDtlRequst']").size() <= 0) {
		$('body').append("<div id='popupDtlRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupDtlRequst').bPopup({
		onOpen:function(){
			
			popupDtlRequst = new dhtmlXWindows();
			var id 		= 'popupDtlRequest';
			var ajaxUrl = gv_ContextPath+'/pubwks022/popup/popupBundleReqst/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 180;
			
			dhxWindowObj = popupDtlRequst.createWindow(id, left, top, width, height);
			popupDtlRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#popupDtlRequst .b-close').click();
			});
		},
		onClose:function(){
			popupDtlRequst.unload();
			$('body').find("div[id='popupDtlRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}
/**
 * 반려사유
 */
var fn_ReturnResnPopup = function(){	// type : 일괄 , 개별 구분 용도
	var userId = ""; 
	var title  = "반려사유";
	//저장팝업
	var dhxWindowObj;
	var returnResn;
	if($('body').find("div[id='returnResn']").size() <= 0) {
		$('body').append("<div id='returnResn'><div class='b-close' style='display:none'></div></div>");
	}
	$('#returnResn').bPopup({
		onOpen:function(){
			
			returnResn = new dhtmlXWindows();
			var id 		= 'returnResn';
			var ajaxUrl = gv_ContextPath+'/pubwks022/popup/popupBundleReturnResn/view';
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 170;
			
			dhxWindowObj = returnResn.createWindow(id, left, top, width, height);
			returnResn.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#returnResn .b-close').click();
			});
		},
		onClose:function(){
			returnResn.unload();
			$('body').find("div[id='returnResn']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}

var fn_Calendar = function(){
    var today = new Date();
    nowDate = dateFormat(today);
	$('#hvofDeSearchFormPubwks022').val(nowDate.substring(0,7));
//	$('#hvofDeSearchEmpFormPubwks022').val(nowDate.substring(0,7));
	
    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;

    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $('#hvofDeSearchFormPubwks022').monthpicker(options);
    $('#hvofDeSearchEmpFormPubwks022').monthpicker(options);
}

/**
 * 엑셀다운로드
 */
var fn_ExcelPubwks022 = function () {
    var titPubwks022 = '개인휴무신청'; /* gf_LocaleTrans('default', 'titPubwks022') */
    var jsonParameter = {
        hvofDe : gf_FormGetValue('searchFormPubwks022', 'hvofDe', 'text'),
        empno : gf_FormGetValue('searchFormPubwks022', 'empno', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormPubwks022', 'elctsctSeSn', 'text')
    };
    var header = [[
        '휴 일자' /* gf_LocaleTrans('default', 'titHvofDe') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '휴무 년월' /* gf_LocaleTrans('default', 'titHvofYm') */,
        '요일 코드 (C127)' /* gf_LocaleTrans('default', 'titWdayCode') */,
        '전자결재 문서 번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재 상태 코드 (EA004)' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 사원번호' /* gf_LocaleTrans('default', 'titElctsctEmpno') */,
        '반려 시유' /* gf_LocaleTrans('default', 'titReturnResn') */
    ]];
    var dataId = [[ 'hvofDe', 'empno', 'elctsctSeSn', 'hvofYm', 'wdayCode', 'elctsctDocNo', 'elctsctSttusCode', 'elctsctEmpno', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPubwks022 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwks022;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwks022/excelPubwks022', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
