/**
 *    프로그램       : 시차근무관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.14
 *    사용테이블      : MHS_TMDIFF_WORK
 * sourceGen version : 2020.06.29.01 (2020.07.14)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubwks020 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwks020 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwks020 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwks020 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwks020 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwks020 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwks020 = 0;  //그리드 삭제 수량 
var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;
var dhxGridPubwks020;
var nowDate = "";
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPubwks020();
    cf_SetComponentsPubwks020();
    cf_SetEventListenerPubwks020();
    cf_InitFormPubwks020();
    cf_SetBindingPubwks020();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwks020 = function() {
    gf_SetMenuPath();
    fn_Calendar();
    $("#searchFormPubwks020 #deptCode").focus();
};

var cf_SetComponentsPubwks020 = function() {
	var dhxGridPubwks020HeaderInfo = [];
	dhxGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '50', 'center', 'int', 'edn', false, 'num', '')); // 번호
	dhxGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPubwks020" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
	dhxGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNo'), '80', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
	dhxGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '80', 'center', 'str', 'ro', false ,'korNm', '')); // 성명
	dhxGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPositionCode'), '80', 'left', 'str', 'ro', true ,'rspofcCodeNm', '')); // 직책
	dhxGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCd'), '80', 'center', 'str', 'ro', false ,'deptCode', '')); // 부서 코드
	dhxGridPubwks020HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMhsDept'), '*', 'left', 'str', 'ro', false ,'deptCodeNm', '')); // 부서 명 

	dhxGridPubwks020 = gf_MakeDhxGrid('dataListPubwks020', dhxGridPubwks020HeaderInfo, true, false, false);
    dhxGridPubwks020.enableAutoWidth(false);
    dhxGridPubwks020.setEditable(true);

    dhxGridPubwks020.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 

};

var eventIdPubwks020 = [];
var cf_SetEventListenerPubwks020 = function() {
    // 그리드 이벤트 ==========================================================================================
    dhxGridPubwks020.attachEvent("onRowSelect" , function(rId , cInd){
    	fn_MakeCalendar();
    });
    var eventId;
    eventIdPubwks020 = gf_GridDetachEvent(dhxGridPubwks020, eventIdPubwks020);
    eventId = dhxGridPubwks020.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubwks020();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubwks020.getColumnsNum();
            var rowNum = dhxGridPubwks020.getRowsNum();
            var selectedId = dhxGridPubwks020.getSelectedRowId();
            var ind        = dhxGridPubwks020.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks020.getRowIndex(selectedId);
            var type       = dhxGridPubwks020.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubwks020.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubwks020.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubwks020.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks020.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubwks020.getSelectedRowId();
            var ind        = dhxGridPubwks020.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks020.getRowIndex(selectedId);
            var type       = dhxGridPubwks020.getColType(ind);
            dhxGridPubwks020.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks020.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubwks020.getSelectedRowId();
            var ind        = dhxGridPubwks020.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks020.getRowIndex(selectedId);
            var type       = dhxGridPubwks020.getColType(ind);
            dhxGridPubwks020.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks020.editCell();
            }
        }
        else return true;
    });
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwks020').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPubwks020()
    });
    $('#btnSavePubwks020').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubwks020();
    });
    $('#btnRemovePubwks020').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubwks020();
    });
    $('#btnExcelPubwks020').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwks020();
    });
    $('#btnSearchPubwks020').unbind('click').bind('click', function(){
        gf_errorMsgClear();
        fn_SearchEmp();
    });
    $('#btnResetPubwks020').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwks020();
    });
    // 일괄 관련 버튼 이벤트
    $('#bundleApprovalRequestBtn').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        fn_ConfmSttusUpdate("approvalRequest" , "" , ""); // 승인요청
    });
    $('#bundleReturnBtn').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubwks020, 'chk');
		if(rowIds.length <= 0 || gf_IsNull(rowIds)){
			gf_DivMsgAlert("대상을 선택하여주세요.");
		}
		else{
			fn_ReturnResnPopup();
		}
//        fn_ConfmSttusUpdate("return" , ""); // 반려
    });
    $('#bundleApprovaltBtn').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        fn_ConfmSttusUpdate("approval" , "" , ""); // 승인
    });
    $('#workDaySearchFormPubwks020').unbind("change").bind("change",function() {
        gf_errorMsgClear();
        fn_MakeCalendar();    
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPubwks020 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPubwks020').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks020').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#checkAllPubwks020').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPubwks020, $('#checkAllPubwks020').prop('checked'), 'chk');
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubwks020 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubwks020",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks020 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    });
    $('#saveFormPubwks020 input[name="workDay"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    });
    $('#saveFormPubwks020 input[name="workBeginTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    });
    $('#saveFormPubwks020 input[name="workEndTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    });
    $('#saveFormPubwks020 input[name="wrkplcNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    });
    $('#saveFormPubwks020 input[name="recogTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    });
    $('#saveFormPubwks020 input[name="shiftWorkAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
    });
    // 폼 이벤트 end ============================================================================================
    //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubwks020","empno","empNm",'', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks020', 'empNm', '', 'text');
		}
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks020', 'empno', '', 'text');
		}		
    });
    //부서 선택 Popup
	$('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormPubwks020","deptCode","deptCodeNm",'', "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks020', 'deptCodeNm', '', 'text');
		}
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks020', 'deptCode', '', 'text');
		}
	});
	//일괄 등록
	$("#bundleRequestPopup").unbind('click').bind('click' , function(event){
		fn_BundlePopup();
	});

};

var cf_InitFormPubwks020 = function() {
    $('#searchFormPubwks020').resetForm();
    
    if("PUBMNG000" == gv_SecondLvlMenuId){
    	gf_FormSetValue("searchFormPubwks020", "deptCode", sessionUserDeptCode , '');
    	gf_FormSetValue("searchFormPubwks020", "deptCodeNm", sessionUserDeptNm , '');
    	gf_FormSetValue("searchFormPubwks020", "empno", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormPubwks020", "empNm", sessionUserEmpnm , '');
    }
};

var cf_SetBindingPubwks020 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경
    var now = dateFormat(new Date());
	$("#workDaySearchFormPubwks020").val(now);
	fn_SessionCheck();
    fn_SearchEmp();
    if("PUBMNG000" == gv_SecondLvlMenuId){
    	$("#searchFormPubwks020 #deptCode").attr("disabled" , true);
    	$("#searchFormPubwks020 #deptCodeNm").attr("disabled" , true);
    	$("#searchFormPubwks020 #empno").attr("disabled" , true);
    	$("#searchFormPubwks020 #empNm").attr("disabled" , true);
    	$("#searchFormPubwks020 #btnDeptCodeSearch").attr("disabled" , true);
    	$("#searchFormPubwks020 #btnEmpSearch").attr("disabled" , true);
    	$("#bundleReturnBtn").hide();
    	$("#bundleApprovaltBtn").hide();
    }
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
function fn_SearchEmp(){
    var jsonParameter = {
            empno     : gf_FormGetValue('searchFormPubwks020', 'empno', 'text'),
            deptCode  : gf_FormGetValue('searchFormPubwks020', 'deptCode', 'text')
    };
    gf_Transaction('', 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmp', false, 'GET');
}
var fn_CallbackSearchEmp = function(strSvcID, targetID, data){
//	console.log(data);
	dhxGridPubwks020.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridPubwks020.parse(data.data.records, 'js');
    	dhxGridPubwks020.selectRow(0);
        gf_NoFoundDataOnGridMsgRemove('dataListPubwks020');
        fn_MakeCalendar();
    } 
    else {
//        gf_DivMsgAlert(gv_MsgNoData);
        gf_NoFoundDataOnGridMsg('dataListPubwks020'); 
    }
    $("#spanCntSearchFormPubwks020").text(data.data.records.length);
//    cf_SetEventListenerPopupMenu();
}
var fn_Calendar = function(){
    var today = new Date();
    nowDate = dateFormat(today);
	
	$('#workDaySearchFormPubwks020').val(nowDate.substring(0,7));

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;

    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $('#workDaySearchFormPubwks020').monthpicker(options);
}
//날짜 포멧 처리
function dateFormat(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1; //January is 0!
  var yyyy = date.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  var nDate = yyyy+'-'+mm;
  return(nDate);
}
var fn_SessionCheck = function(){
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
//    console.log(userInfo);
    if(userInfo.code == "000"){
    	sessionUserDeptCode = userInfo.data.userDeptCode;
    	sessionUserDeptNm = userInfo.data.userDeptNm;
    	sessionUserEmpno = userInfo.data.userEmpNo;
    	sessionUserEmpnm = userInfo.data.userNm;
    	if("PUBMNG000" == gv_SecondLvlMenuId){
    		gf_FormSetValue("searchFormPubwks020", "deptCode", sessionUserDeptCode , '');
    		gf_FormSetValue("searchFormPubwks020", "deptCodeNm", sessionUserDeptNm , '');
    		gf_FormSetValue("searchFormPubwks020", "empno", sessionUserEmpno , '');
    		gf_FormSetValue("searchFormPubwks020", "empNm", sessionUserEmpnm , '');
    	}
    }	
}
/**
 * 조회
 */
var fn_MakeCalendar = function(){
	var rId = dhxGridPubwks020.getSelectedRowId();
	var fullWorkDay = $("#workDaySearchFormPubwks020").val().split('-');
	var flag;
//	if(gf_IsNull(fullWorkDay[0]) || gf_IsNull(fullWorkDay[1] || fullWorkDay.length < 2)){
//		gf_DivMsgAlert("근무년월을  선택하여 주세요.");
//		return;
//	}
	if("PUBMNG000" == gv_SecondLvlMenuId){
		flag = "user";
	}
	else if("MHSMNG000" == gv_SecondLvlMenuId){
		flag = "admin";
	}
    var jsonParameter = {
            workDay : fullWorkDay[0] + '' + fullWorkDay[1],
            empno : gf_DhxGetValue(dhxGridPubwks020 , rId, 'empno', 'grid'),
            flag : flag
        };
    gf_Transaction('', 'pubwks020/makeCalendar', jsonParameter, 'fn_CallbackSearchPubwks020', false, 'GET');
}


var fn_CallbackSearchPubwks020 = function(strSvcID, targetID, data) {
	var calendarArr = data.data.records;
	var startWeekDay = calendarArr[0].deSeCode;
	var fontColor;
	var workTime;
	var confmSttusCodeNm;
	var confmDe;
	var confmerEmpnm;
	var returnResn;
//	console.log(calendarArr);
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
		
		if(gf_IsNull(calendarArr[i].workBeginTime) || gf_IsNull(calendarArr[i].workEndTime)){
			workTime = '';
		}
		else{
			workTime = calendarArr[i].workBeginTime.substr(0,2) + ':' +  calendarArr[i].workBeginTime.substr(2,2) + " ~ " + calendarArr[i].workEndTime.substr(0,2) + ':' + calendarArr[i].workEndTime.substr(2,2);
		}

		if(gf_IsNull(calendarArr[i].wrkplcNm)){
			wrkplcNm = '';
		}
		else wrkplcNm = calendarArr[i].wrkplcNm;
		
		if(gf_IsNull(calendarArr[i].confmSttusCodeNm)){
			confmSttusCodeNm = '';
		}
		else confmSttusCodeNm = calendarArr[i].confmSttusCodeNm;
		
		if(gf_IsNull(calendarArr[i].confmDe)){
			confmDe = '';
		}
		else confmDe = calendarArr[i].confmDe;
		
		if(gf_IsNull(calendarArr[i].confmerEmpnm)){
			confmerEmpnm = '';
		}
		else confmerEmpnm = calendarArr[i].confmerEmpnm;

		if(gf_IsNull(calendarArr[i].returnResn)){
			returnResn = '';
		}
		else returnResn = calendarArr[i].returnResn;
//		console.log(calendarArr[i]);
			str += "<td bgcolor='#FFFFFF' style='vertical-align: text-top;' ondblclick='fn_TimePop(" + calendarArr[i].jobDe +  ")'>"
			  	+  "<input type='text' name='calenderDd"+ (i+1) +"' id='calenderDd"+ (i+1) +"' style='background-color: transparent; width:20px; height:auto;  border: 0px; font-weight: bold; color:"+fontColor+";' value='" + (i+1) +  "' readonly/><br />"
				+  "<input type='text' name='workTime"+ (i+1) +"' id='workTime"+ (i+1) +"' style='background-color: transparent; width:98%; height:auto; border: 0px;' value='" + workTime + "' readonly/><br />"
				+  "<input type='text' name='wrkplcNm"+ (i+1) +"' id='wrkplcNm"+ (i+1) +"' style='background-color: transparent; width:98%; height:auto; color:blue; border: 0px;' value='" + wrkplcNm + "'  readonly/><br />"
				+  "<input type='text' name='confmSttusCodeNm"+ (i+1) +"' id='confmSttusCodeNm"+ (i+1) +"' style='font-weight:bold;background-color: transparent; width:98%; height:auto; color:green; border: 0px;' value='" + confmSttusCodeNm + "'  readonly/><br />"
				 
				+  "<input type='hidden' name='empno"+ (i+1) +"' id='empno"+ (i+1) +"' style='width:80px;' value='" + calendarArr[i].empno +"' readonly/>"
				+  "<input type='hidden' name='workDay"+ (i+1) +"' id='workDay"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].workDay + "' readonly/>"
				+  "<input type='hidden' name='recogTime"+ (i+1) +"' id='recogTime"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].recogTime + "' readonly/>"
				+  "<input type='hidden' name='shiftWorkAt"+ (i+1) +"' id='shiftWorkAt"+ (i+1) +"' style='width:98%;' value='" + calendarArr[i].shiftWorkAt + "' readonly/>"
				+  "<input type='hidden' name='workBeginTime"+ (i+1) +"' id='workBeginTime"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].workBeginTime + "' readonly/>"
				+  "<input type='hidden' name='workEndTime"+ (i+1) +"' id='workEndTime"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].workEndTime + "' readonly/>"
				+  "<input type='hidden' name='empnm"+ (i+1) +"' id='empnm"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].empnm + "' readonly/>"
				+  "<input type='hidden' name='confmSttusCode"+ (i+1) +"' id='confmSttusCode"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].confmSttusCode + "' readonly/>"
				+  "<input type='hidden' name='confmDe"+ (i+1) +"' id='confmDe"+ (i+1) +"' style='width:40px;' value='" + confmDe + "' readonly/>"
				+  "<input type='hidden' name='confmerEmpno"+ (i+1) +"' id='confmerEmpno"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].confmerEmpno + "' readonly/>"
				+  "<input type='hidden' name='confmerEmpnm"+ (i+1) +"' id='confmerEmpnm"+ (i+1) +"' style='width:40px;' value='" + confmerEmpnm + "' readonly/>"
				+  "<input type='hidden' name='regId"+ (i+1) +"' id='regId"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].regId + "' readonly/>"
				+  "<input type='hidden' name='confmSeSn"+ (i+1) +"' id='confmSeSn"+ (i+1) +"' style='width:40px;' value='" + calendarArr[i].confmSeSn + "' readonly/>"
				+  "<input type='hidden' name='returnResn"+ (i+1) +"' id='returnResn"+ (i+1) +"' style='width:40px;' value='" + returnResn + "' readonly/>"
				;
				
			
			//다음주
			if (6 == calendarArr[i].deSeCode) {
				str += "</tr><tr>";
			}
		
	}
	str += "</tr>";
	$("#dateCell").html(str);
};
var fn_ConfmSttusUpdate = function(status , type , popReturnResn){
	var sttusCode;
	var returnResn;
	if(status == "approvalRequest") sttusCode = '001';
	else if(status == "approval") sttusCode = '002';
	else if(status == "return") sttusCode = '003';
	var empnoArr = [];

	if(gf_IsNull(type)){
		var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubwks020, 'chk');
		var fullWorkDay = $("#workDaySearchFormPubwks020").val().split('-');
		
		for(var i = 0 ; i < rowIds.length ; i++){
			rowId = rowIds[i];
			empnoArr.push(gf_DhxGetValue(dhxGridPubwks020, rowId, 'empno',  'grid'));
		}
		if(rowIds.length <= 0 || gf_IsNull(rowIds)){
			gf_DivMsgAlert("대상을 선택하여주세요.");
		}
		else{
			if(!gf_IsNull(popReturnResn) && sttusCode == "003") returnResn = popReturnResn;
			else returnResn = '';
			var jsonParameter = {
					workDay : fullWorkDay[0] + '' + fullWorkDay[1] ,
					confmSttusCode : sttusCode,
					empnoArr : empnoArr,
					returnResn : returnResn
			}
			var dataSource = gf_NoAsyncTransaction('pubwks020/updateConfmSttusPubwks020', jsonParameter, 'GET');
			if(dataSource.data.code = "000"){
				gf_DivMsgAlert(gv_MsgSave);
				fn_MakeCalendar();
				if(!gf_IsNull(returnResn)) $('#returnResn .b-close').click();
			}
			else{
				gf_DivMsgAlert("재시도하여 주세요.");
			}
		}
	}
	else if(type == "single"){
		empnoArr.push(dtlEmpno);
		if(gf_IsNull(dtlConfmSeSn)){	// 상세 팝업 - 작성과 동시에 승인신청 시
			gf_FormSetValue('savePopPubwks020', 'confmSttusCode','001' ,'text');
			fn_SavePubwks020();
		}
		else{						// 상세 팝업 - 작성 후 승인신청 시
			if(!gf_IsNull(popReturnResn) && sttusCode == "003") returnResn = popReturnResn;	// 개별 반려 시
			else returnResn = '';
			var jsonParameter = {
					workDay :  gf_FormGetValue('savePopPubwks020', 'workDay', 'text').replaceAll('-',''),
					confmSttusCode : sttusCode,
					empnoArr : empnoArr,
					returnResn : returnResn
			}
			var dataSource = gf_NoAsyncTransaction('pubwks020/updateConfmSttusPubwks020', jsonParameter, 'GET');
			if(dataSource.data.code = "000"){
				$('#popupDtlRequst .b-close').click();
				if(!gf_IsNull(returnResn)) $('#returnResn .b-close').click();
				gf_DivMsgAlert(gv_MsgSave);
				fn_MakeCalendar();
			}
			else{
				gf_DivMsgAlert("재시도하여 주세요.");
			}			
		}
	}
}

/**
 * 상세조회
 */
var fn_TimePop = function(param , beginTime , endTime){
	var userId = ""; 
	var title  = "시차근무등록";
	//저장팝업
	var dhxWindowObj;
	var popupDtlRequst;
	if($('body').find("div[id='popupDtlRequst']").size() <= 0) {
		$('body').append("<div id='popupDtlRequst'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupDtlRequst').bPopup({
		onOpen:function(){
			
			popupDtlRequst = new dhtmlXWindows();
			var id 		= 'popupRequest';
			var ajaxUrl = gv_ContextPath+'/pubwks020/popup/popupRequest/view?paramDate='+ param;
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 500;
			
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
 * 일괄등록
 */
var fn_BundlePopup = function(){
	var userId = ""; 
	var title  = "시차근무일괄등록";
	//저장팝업
	var dhxWindowObj;
	var bundleRequest;
	if($('body').find("div[id='bundleRequest']").size() <= 0) {
		$('body').append("<div id='bundleRequest'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bundleRequest').bPopup({
		onOpen:function(){
			
			bundleRequest = new dhtmlXWindows();
			var id 		= 'bundleRequest';
			var ajaxUrl = gv_ContextPath+'/pubwks020/popup/bundleRequest/view';
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 530;
			
			dhxWindowObj = bundleRequest.createWindow(id, left, top, width, height);
			bundleRequest.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bundleRequest .b-close').click();
			});
		},
		onClose:function(){
			bundleRequest.unload();
			$('body').find("div[id='bundleRequest']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}
/**
 * 반려사유
 */
var fn_ReturnResnPopup = function(type){	// type : 일괄 , 개별 구분 용도
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
			var ajaxUrl = gv_ContextPath+'/pubwks020/popup/returnResn/view?type=' + type;
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

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormPubwks020', 'deptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormPubwks020', 'deptCodeNm', 'text'), 
			useAt : '1'
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}

function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormPubwks020', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormPubwks020', 'deptCodeNm', data.deptKorNm, 'text');
   		
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormPubwks020","deptCode","deptCodeNm", '' , "Y", null);
    }
}

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormPubwks020', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormPubwks020', 'empNm', 'text'),
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormPubwks020', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormPubwks020', 'empNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormPubwks020","empno","empNm", '' , "Y", null);
  	}
}

/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubwks020 = function() {
    $('#saveFormPubwks020 input[name="empno"]').prop('disabled', false);
    $('#saveFormPubwks020').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormPubwks020 *').prop('disabled', status);
    
    $('#saveFormPubwks020 #empnmSaveFormPubwks020').prop('disabled', true);
    $('#workDaySearchFormPubwks020').attr('readonly', true);
};

/**
 * 입력데이터 서버 전송
 */
var fn_SavePubwks020 = function() {
 
	
}
var confirmModalPubwks020 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubwks020_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubwks020_Send = function() {

}
/**
 * 삭제
 */
var fn_RemovePubwks020 = function() {

}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubwks020 = function () {
    var titPubwks020 = '시차근무관리'; /* gf_LocaleTrans('default', 'titPubwks020') */
    var jsonParameter = {
        reqstNo : gf_FormGetValue('searchFormPubwks020', 'reqstNo', 'text'),
        empno : gf_FormGetValue('searchFormPubwks020', 'empno', 'text')
    };
    var header = [[
        '승인 순번' /* gf_LocaleTrans('default', 'titReqstNo') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '근무일' /* gf_LocaleTrans('default', 'titWorkDay') */,
        '근무 시작 시간' /* gf_LocaleTrans('default', 'titWorkBeginTime') */,
        '근무 종료 시간' /* gf_LocaleTrans('default', 'titWorkEndTime') */,
        '근무지 명' /* gf_LocaleTrans('default', 'titWrkplcNm') */,
        '인정 시간' /* gf_LocaleTrans('default', 'titRecogTime') */,
        '교대 근무 여부' /* gf_LocaleTrans('default', 'titShiftWorkAt') */
    ]];
    var dataId = [[ 'confmSeSn', 'empno', 'workDay', 'workBeginTime', 'workEndTime', 'wrkplcNm', 'recogTime', 'shiftWorkAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPubwks020 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwks020;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwks020/excelPubwks020', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormPubwks020 #reqstNoSaveFormPubwks020').parent().append(
    '<div class="error" id="reqstNoSaveFormPubwks020-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormPubwks020 #empnoSaveFormPubwks020').parent().append(
    '<div class="error" id="empnoSaveFormPubwks020-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
