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
var save_Row_Num_Mhshrd032 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrd032 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrd032 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrd032 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrd032 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrd032 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrd032 = 0;  //그리드 삭제 수량 
var dhxGridMhshrd032;  //그리드 객체
var eventIdMhshrd032 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrd032;  //DataProcessor 객체
var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;
var nowDate = "";
var pageElctsctSeSn;
var pageElctsctSttusCode;	// 월 별 승인 상태에 따른 제어 위한 변수
var pageElctsctSttusCodeNm;
var pageReturnResn;

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
	cf_InitParamMhshrd032();
	fn_Calendar();
    if(cf_SetComponentsMhshrd032()){
       cf_SetEventListenerMhshrd032();
       cf_InitFormMhshrd032();
       cf_SetBindingMhshrd032();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrd032 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrd032").validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('divComboSearchElctsctSttus', 'elctsctSttusSe', 'elctsctSttusSe', 'search', 'C197', '' , '', '', 'ordr', '','',''); 
};

var cf_SetComponentsMhshrd032 = function() {
    var dhxGridMhshrd032HeaderInfo = [];
    dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '*', 'center', 'int', 'edn', false, 'num', '')); // 번호
    dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrd032" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
	dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNo'), '80', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
	dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '80', 'center', 'str', 'ro', false ,'korNm', '')); // 성명
	dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCd'), '80', 'center', 'str', 'ro', true ,'deptCode', '')); // 부서 코드
	dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMhsDept'), '80', 'left', 'str', 'ro', false ,'deptCodeNm', '')); // 부서 명 
	dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader("전자결재상태코드", '*', 'left', 'str', 'ro', true ,'elctsctSttusCode', '')); 
	dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader("상태", '80', 'center', 'str', 'ro', false ,'elctsctSttusCodeNm', '')); 
	dhxGridMhshrd032HeaderInfo.push(gf_MakeDhxGridHeader("전자결재구분순번", '80', 'center', 'str', 'ro', true ,'elctsctSeSn', '')); 
	dhxGridMhshrd032 = gf_MakeDhxGrid('dataListMhshrd032', dhxGridMhshrd032HeaderInfo, true, false, false);
    dhxGridMhshrd032.enableAutoWidth(false);
    dhxGridMhshrd032.setEditable(true);

    dhxGridMhshrd032.setColumnMinWidth(30,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrd032 = function() {
    // 그리드 이벤트 ==========================================================================================
    dhxGridMhshrd032.attachEvent("onRowSelect" , function(rId , cInd){
    	fn_MakeCalendar("initSearch");
    });
    var eventId;
    eventIdMhshrd032 = gf_GridDetachEvent(dhxGridMhshrd032, eventIdMhshrd032);
    eventId = dhxGridMhshrd032.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrd032();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrd032.getColumnsNum();
            var rowNum = dhxGridMhshrd032.getRowsNum();
            var selectedId = dhxGridMhshrd032.getSelectedRowId();
            var ind        = dhxGridMhshrd032.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd032.getRowIndex(selectedId);
            var type       = dhxGridMhshrd032.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrd032.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrd032.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrd032.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd032.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrd032.getSelectedRowId();
            var ind        = dhxGridMhshrd032.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd032.getRowIndex(selectedId);
            var type       = dhxGridMhshrd032.getColType(ind);
            dhxGridMhshrd032.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd032.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrd032.getSelectedRowId();
            var ind        = dhxGridMhshrd032.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd032.getRowIndex(selectedId);
            var type       = dhxGridMhshrd032.getColType(ind);
            dhxGridMhshrd032.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd032.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrd032.push(eventId);
    eventId = dhxGridMhshrd032.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrd032SortGridList(ind, type, direction); 
    });
    eventIdMhshrd032.push(eventId);
    eventId = dhxGridMhshrd032.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrd032.push(eventId);
    eventId = dhxGridMhshrd032.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMhshrd032.push(eventId);
    eventId = dhxGridMhshrd032.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdMhshrd032.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrd032').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#btnSaveMhshrd032').unbind('click').bind('click', function() {
        gf_errorMsgClear();
    });
    $('#btnRemoveMhshrd032').unbind('click').bind('click', function() {
        gf_errorMsgClear();
    });
    $('#btnExcelMhshrd032').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrd032();
    });
    $('#btnSearchMhshrd032').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchEmp();
    });
    $('#btnResetMhshrd032').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrd032();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrd032').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrd032, $('#checkAllMhshrd032').prop('checked'), 'chk');
    });
    $('#searchFormMhshrd032 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrd032').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrd032').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 달력 생성 이벤트 =======================================================================================
    $("#searchElctsctSeSn").unbind("change").bind("change", function(){
    	gf_errorMsgClear();
    	var searchMonth = $('#hvofDeSearchFormMhshrd032').val().replaceAll('-','');
    	if(gf_IsNull(searchMonth)){
    		gf_DivMsgAlert("휴무 년월을 확인하여 주세요.");
    	}
    	else{
    		fn_MakeCalendar("elctsctSeSnSearch");
    	}
    });
//    $('#bundleRequestPopup').unbind("click").bind("click",function() {
//	    gf_errorMsgClear();
//	    if($("#searchFormMhshrd032").validate().form() && gf_IsNull(pageElctsctSttusCode)){
//	    	var empno = gf_FormGetValue('searchFormMhshrd032', 'empno', 'text');
//	    	var hvofYm = $('#hvofDeSearchFormMhshrd032').val().replaceAll('-','');
//	    	var param = "paramEmpno=" + empno + "&paramHvofYm=" + hvofYm;
//	    	fn_BundleReqstPopup('form1' , '' , '' ,param);
//	    }
//	    else{
//	    	gf_DivMsgAlert(pageElctsctSttusCodeNm + "상태인 월은 등록하실 수 없습니다.");
//	    }
//	});
//    $('#bundleApprovalRequest').unbind("click").bind("click",function() {
//	    gf_errorMsgClear();
//	    if(!gf_IsNull(pageElctsctSttusCode)){
//	    	gf_DivMsgAlert(pageElctsctSttusCodeNm + "상태는 승인신청 하실 수 없습니다.");
//	    }
//	    else{
//	    	fn_BundelSttusRequest("approvalRequest");
//	    }
//    });
    $('#bundleApproval').unbind("click").bind("click",function() {
	    gf_errorMsgClear();
	    if(fn_EmpGridSttusValidation("002")){
	    	fn_BundelSttusRequest("approval");
	    }
    });
    $('#bundleReturn').unbind("click").bind("click",function() {
	    gf_errorMsgClear();
    	fn_ReturnResnPopup();
    });

//    $('#bundleCopy').unbind("click").bind("click" , function(){
//    	if(gf_IsNull(pageElctsctSttusCode) || pageElctsctSttusCode != '003'){	// 승인 싱청 상태
//    		gf_DivMsgAlert("반려 상태만 복사 가능합니다.");
//    	}
//    	else{
//    		fn_BundleCopy();
//    	}
//    });
  //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhshrd032","empno","empNm",'', "Y", "fn_SearchPubEmpCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchPubEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd032', 'empNm', '', 'text');
		}
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchPubEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd032', 'empno', '', 'text');
		}		
    });
    //부서 선택 Popup
	$('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhshrd032","deptCode","deptCodeNm",'', "Y", "fn_SearchPubDeptCode");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchPubDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd032', 'deptCodeNm', '', 'text');
		}
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchPubDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd032', 'deptCode', '', 'text');
		}
	});
    
};

var cf_InitFormMhshrd032 = function() {
    $('#searchFormMhshrd032').resetForm();
    
	gf_FormSetValue("searchFormMhshrd032", "deptCode", sessionUserDeptCode , '');
	gf_FormSetValue("searchFormMhshrd032", "deptCodeNm", sessionUserDeptNm , '');
	gf_FormSetValue("searchFormMhshrd032", "empno", sessionUserEmpno , '');
	gf_FormSetValue("searchFormMhshrd032", "empNm", sessionUserEmpnm , '');
};

var cf_SetBindingMhshrd032 = function() {
	fn_SessionCheck();
	gf_FormSetValue('searchFormMhshrd032', 'searchHvofDe', nowDate.substring(0,7) , 'text');
    fn_SearchEmp();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
function fn_SearchEmp(){
    var jsonParameter = {
            empno     : gf_FormGetValue('searchFormMhshrd032', 'empno', 'text'),
            deptCode  : gf_FormGetValue('searchFormMhshrd032', 'deptCode', 'text'),
            hvofYm : gf_FormGetValue('searchFormMhshrd032', 'searchHvofDe', 'text').replaceAll('-',''),
            elctsctSttusCode : gf_FormGetValue('searchFormMhshrd032', 'elctsctSttusSe', 'combo')
    };
    gf_Transaction('', 'pubwks022/searchEmpPubwks022', jsonParameter, 'fn_CallbackSearchEmp', false, 'GET');
}
var fn_CallbackSearchEmp = function(strSvcID, targetID, data){
//	console.log(data);
	dhxGridMhshrd032.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridMhshrd032.parse(data.data.records, 'js');
    	dhxGridMhshrd032.selectRow(0);
        gf_NoFoundDataOnGridMsgRemove('dataListMhshrd032');
    } 
    else {
//        gf_DivMsgAlert(gv_MsgNoData);
        gf_NoFoundDataOnGridMsg('dataListMhshrd032');
    }
    fn_MakeCalendar("initSearch");
    $("#spanCntSearchFormMhshrd032").text(data.data.records.length);
//    cf_SetEventListenerPopupMenu();
}
//--부서 입력 후 Enter 이벤트
function fn_SearchPubDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormMhshrd032', 'deptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormMhshrd032', 'deptCodeNm', 'text'), 
			useAt : '1'
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchPubDeptCode', false, 'GET');
}

function fn_CallbackSearchPubDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhshrd032', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhshrd032', 'deptCodeNm', data.deptKorNm, 'text');
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormMhshrd032","deptCode","deptCodeNm", '' , "Y", null);
    }
}

//--사원 입력 후 Enter 이벤트
function fn_SearchPubEmpCode(){
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMhshrd032', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormMhshrd032', 'empNm', 'text'),
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMhshrd032', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormMhshrd032', 'empNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormMhshrd032","empno","empNm", '' , "Y", null);
  	}
}

var fn_MakeCalendar = function(searchType){
	var month = $("#hvofDeSearchFormMhshrd032").val().split('-');
	if(gf_IsNull(month)){
		$('#hvofDeSearchFormMhshrd032').val(nowDate.substring(0,7));
	}
	else{
		var jsonParameter = {
				hvofDe : month[0] + '' + month[1]
		};
		var dataSource = gf_NoAsyncTransaction('pubwks022/makeCalendar', jsonParameter, 'GET');
//		gf_Transaction('', 'Mhshrd032/makeCalendar', jsonParameter, 'fn_CallbackMakeCalendar', false, 'GET');
//		console.log(dataSource);
		if(dataSource.code == "000"){
			fn_CallbackMakeCalendar(dataSource.data , searchType);
		}
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
		
//		if(gf_IsNull(calendarArr[i].elctsctSttusCodeNm)){
//			elctsctSttusCodeNm = '';
//		}else elctsctSttusCodeNm = calendarArr[i].elctsctSttusCodeNm;
//		console.log(calendarArr[i]);
			str += "<td bgcolor='#FFFFFF' style='vertical-align: text-top;' ondblclick=''>"
			  	+  "<input type='text' name='calenderDd"+ (i+1) +"' id='calenderDd"+ (i+1) +"' style='background-color: transparent; width:20px; border: 0px; font-weight: bold; color:"+fontColor+";' value='" + (i+1) +  "' readonly/>"
			  	+  "<div class='checkbox' style='height:auto;'>"
			  	+  "<label><input type='checkbox' name='hvofDeCheck"+ (i+1) +"' id='hvofDeCheck"+ (i+1) +"' disabled='disbaled'/><i class='input-helper'></i></label>"
			    +  "</div><br/>"
//			  	+  "<input type='text' name='elctsctSttusCodeNm"+ (i+1) +"' id='elctsctSttusCodeNm"+ (i+1) +"' style='font-weight:bold;background-color: transparent; width:98%; color:green; border: 0px;' readonly/><br />"
//				
//			  	+  "<input type='hidden' name='elctsctSttusCode"+ (i+1) +"' id='elctsctSttusCode"+ (i+1) +"'/>"
//			  	+  "<input type='hidden' name='elctsctEmpno"+ (i+1) +"' id='elctsctEmpno"+ (i+1) +"'/>"
//			  	+  "<input type='hidden' name='returnResn"+ (i+1) +"' id='returnResn"+ (i+1) +"'/>"
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
var fn_GetHvofDe = function(){
	var rowId = dhxGridMhshrd032.getSelectedRowId();
	if(!gf_IsNull(rowId)){
		var empno = gf_DhxGetValue(dhxGridMhshrd032, rowId , 'empno',  'grid');
		var hvofYm = $('#hvofDeSearchFormMhshrd032').val().replaceAll('-','');
		var jsonParameterForGetHvofDe = {
				empno : empno,
				hvofYm : hvofYm,
		}
		var dataSource = gf_NoAsyncTransaction('pubwks022/searchPubwks022', jsonParameterForGetHvofDe, 'GET');
		var records = dataSource.data.records;
		var maxElctsctSeSn = 0; // 해당 년월 , 해당 사원에 대한 데이터 모두 조회 후 제일 높은 구분 순번
		var setDay;
//		console.log(records);
		
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
		
		$('#elctsctSttusCodeNmSearchFormMhshrd032').val(pageElctsctSttusCodeNm);
		$('#returnResnSearchFormMhshrd032').val(pageReturnResn);
//	console.log("pageElctsctSeSn = " + pageElctsctSeSn);
//	console.log("pageElctsctSttusCode = " + pageElctsctSttusCode);
//	console.log("pageElctsctSttusCodeNm = " + pageElctsctSttusCodeNm);
	}
	else{
		$('#searchElctsctSeSn').children('option').remove();
		$('#elctsctSttusCodeNmSearchFormMhshrd032').val('');
		$('#returnResnSearchFormMhshrd032').val('');
	}
}

var fn_GetHvofDeElctsctSeSnChange = function(){
	var elctsctSeSn =  $('#searchElctsctSeSn').val();
	var hvofYm = $('#hvofDeSearchFormMhshrd032').val().replaceAll('-','');
	var jsonParameterForSearchHvofDe = {
		empno : gf_DhxGetValue(dhxGridMhshrd032, dhxGridMhshrd032.getSelectedRowId(), 'empno',  'grid'),
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
	
	$('#elctsctSttusCodeNmSearchFormMhshrd032').val(pageElctsctSttusCodeNm);
	$('#returnResnSearchFormMhshrd032').val(pageReturnResn);
	
//	console.log("pageElctsctSeSn = " + pageElctsctSeSn);
//	console.log("pageElctsctSttusCode = " + pageElctsctSttusCode);
//	console.log("pageElctsctSttusCodeNm = " + pageElctsctSttusCodeNm);
}

var fn_BundelSttusRequest = function(sttusType , paramReturnResn){
	var size;
	var paramEmpno;
	var paramSeSn;
	var objectArr = [];
	var object;
	var elctsctSttusCode;
	var hvofYm = $('#hvofDeSearchFormMhshrd032').val().replaceAll('-','');
	if(sttusType == "approval"){
		elctsctSttusCode = "002";
	}
	else if(sttusType == "return"){
		elctsctSttusCode = "003";
	}
	
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrd032, 'chk');
	$.each(rowIds , function(index , item){
		paramEmpno = gf_DhxGetValue(dhxGridMhshrd032, rowIds[index], 'empno',  'grid');
		paramSeSn = gf_DhxGetValue(dhxGridMhshrd032, rowIds[index], 'elctsctSeSn',  'grid');
		object = {
				empno : paramEmpno,
				elctsctSeSn : paramSeSn
		}
		objectArr.push(object);
		size = index;
	});
	
	var jsonParameterForSttusUpdate = {
		objectArr : objectArr,
		objectArrSize : size,
		hvofYm : hvofYm,
		elctsctSttusCode : elctsctSttusCode,
		returnResn : paramReturnResn
	}
	var dataSource = gf_NoAsyncTransaction('pubwks022/bundleSttusUpdatePubwks022', jsonParameterForSttusUpdate, 'GET');
	if(dataSource.code == "000"){
		gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
		fn_SearchEmp();
//		fn_MakeCalendar("initSearch");
	}
	else if(dataSource.code != "000"){
		gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
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

//    	gf_FormSetValue("searchFormMhshrd032", "deptCode", sessionUserDeptCode , '');
//		gf_FormSetValue("searchFormMhshrd032", "deptCodeNm", sessionUserDeptNm , '');
//		gf_FormSetValue("searchFormMhshrd032", "empno", sessionUserEmpno , '');
//		gf_FormSetValue("searchFormMhshrd032", "empNm", sessionUserEmpnm , '');
    }	
}
/**
 * 조회
 */
var fn_SearchEmpMhshrd032 = function(userId) {
    var jsonParameter = {
        hvofDe : gf_FormGetValue('searchFormMhshrd032', 'hvofDe', 'text'),
        empno : gf_FormGetValue('searchFormMhshrd032', 'empno', 'text')
    };
    gf_Transaction(userId, 'pubwks022/searchPubwks022', jsonParameter, 'fn_CallbackSearchMhshrd032', false, 'GET');
};

var fn_CallbackSearchEmpMhshrd032 = function(strSvcID, targetID, data) {
    //dhxGridMhshrd032.clearAll();
    dhxGridMhshrd032.destructor();
    if(cf_SetComponentsMhshrd032()){ 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrd032');
            dhxGridMhshrd032.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrd032 == 0 && save_All_Sta_Mhshrd032 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrd032.selectRow(0); 
            } else if(save_Row_Sta_Mhshrd032 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrd032.selectRow(0);
            } else if(save_All_Sta_Mhshrd032 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrd032.selectRow(save_Row_Num_Mhshrd032); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrd032.selectRow(save_Row_Num_Mhshrd032);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrd032.findCell(save_Row_Ids_Mhshrd032, gf_GetDhxGridColumId(dhxGridMhshrd032,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrd032.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrd032.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrd032');
        }
        $("#spanCntSearchFormMhshrd032").text(data.data.records.length);
        cf_SetEventListenerMhshrd032();
    } 
};
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
	$('#hvofDeSearchFormMhshrd032').val(nowDate.substring(0,7));
    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;

    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $('#hvofDeSearchFormMhshrd032').monthpicker(options);
}

/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrd032SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrd032, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrd032', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrd032', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrd032, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrd032.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrd032', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrd032', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd032, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrd032.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrd032', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrd032', 'sortColumId', '', 'text'); 
            dhxGridMhshrd032.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrd032.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrd032', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrd032', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd032, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};

/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrd032 = function () {
    var titMhshrd032 = '개인휴무신청'; /* gf_LocaleTrans('default', 'titMhshrd032') */
    var jsonParameter = {
        hvofDe : gf_FormGetValue('searchFormMhshrd032', 'hvofDe', 'text'),
        empno : gf_FormGetValue('searchFormMhshrd032', 'empno', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMhshrd032', 'elctsctSeSn', 'text')
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
    var sheetNm = [[ titMhshrd032 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrd032;
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
var fn_EmpGridSttusValidation = function(sttusCode){ 
	// sttusCode 
	// 002 - 승인 , 003 - 반려
	var valid = true;
	var rowElctsctSttus;
	var rowElctsctSttusNm;
	if(sttusCode == "002"){
		rowElctsctSttusNm = "승인";
	}
	else if(sttusCode == "003"){
		rowElctsctSttusNm = "반려";
	}
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrd032, 'chk');
	if(gf_IsNull(rowIds)){
		gf_DivMsgAlert("대상자를 선택하여 주세요.");
		return false;
	}
	else{
		$.each(rowIds , function(index , item){
			if(dhxGridMhshrd032.cells(rowIds[index] , gf_GetDhxGridColumId(dhxGridMhshrd032, 'chk')).isChecked()){
				rowElctsctSttus = gf_DhxGetValue(dhxGridMhshrd032, rowIds[index], 'elctsctSttusCode',  'grid');
				if(gf_IsNull(rowElctsctSttus) || rowElctsctSttus != '001'){
					gf_DivMsgAlert("승인 신청 하여주세요.");
					fn_GridValidationSelectCell(dhxGridMhshrd032 , rowIds[index] , 'elctsctSttusCodeNm');
					valid = false;
				}
			}
		});
	}
	return valid;
}

/**
 * 그리드 validation 빨간색 언더바
 */
var fn_GridValidationSelectCell = function(dhxGrid, rId, cInd){
    dhxGrid.forEachRow(function(rowId) {
        dhxGrid.forEachCell(rowId, function(cellObj, ind){
            dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
        });
    });
    setTimeout(function(){
        dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
    },1);
}