/**
 *    프로그램       : 초과근무조회 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.30
 *    사용테이블      : MHS_OVTIME_WORK
 * sourceGen version : 2020.07.16.01 (2020.07.30)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrd010 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrd010 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrd010 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrd010 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrd010 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrd010 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrd010 = 0;  //그리드 삭제 수량 
var dhxGridMhshrd010;  //그리드 객체
var eventIdMhshrd010 = [];  //그리드 이벤트 객체 
var eventEmpIdMhshrd010 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrd010;  //DataProcessor 객체
var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrd010();
    if(cf_SetComponentsMhshrd010()){
       cf_SetEventListenerMhshrd010();
       cf_InitFormMhshrd010();
       cf_SetBindingMhshrd010();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrd010 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrd010").validate({ errorElement: 'div', ignore: '' });
    $("#searchFormMhshrd010 #deptCode").focus();
};

var cf_SetComponentsMhshrd010 = function() {
	var dhxEmpGridMhshrd010HeaderInfo = [];
	dhxEmpGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '50', 'center', 'int', 'edn', false, 'num', '')); // 번호
	dhxEmpGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNo'), '80', 'center', 'str', 'ro', false ,'empno', '')); // 사원번호
	dhxEmpGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '80', 'center', 'str', 'ro', false ,'korNm', '')); // 성명
	dhxEmpGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPositionCode'), '0', 'left', 'str', 'ro', true ,'rspofcCodeNm', '')); // 직책
	dhxEmpGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCd'), '80', 'center', 'str', 'ro', false ,'deptCode', '')); // 부서 코드
	dhxEmpGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMhsDept'), '*', 'left', 'str', 'ro', false ,'deptCodeNm', '')); // 부서 명 

	dhxEmpGridMhshrd010 = gf_MakeDhxGrid('dataEmpListMhshrd010', dhxEmpGridMhshrd010HeaderInfo, true, false, false);
	dhxEmpGridMhshrd010.enableAutoWidth(false);
	dhxEmpGridMhshrd010.setEditable(false);

	dhxEmpGridMhshrd010.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 

    var dhxGridMhshrd010HeaderInfo = [];
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('시간외 근무 순번', '0', 'left', 'str', 'ro', true, 'ovtimeWorkSn', '', '')); /* gf_LocaleTrans('default', 'titOvtimeWorkSn') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '0', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('시간외 구분 코드', '0', 'center', 'str', 'ro', true , 'ovtimeSeCode', '', '')); /* gf_LocaleTrans('default', 'titOvtimeSeCode') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('근무 구분', '100', 'center', 'str', 'ro', false , 'ovtimeSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titOvtimeSeCode') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('신청 일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('신청 시작 시간', '100', 'center', 'str', 'ro', false, 'reqstBeginTime', '', '')); /* gf_LocaleTrans('default', 'titReqstBeginTime') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('신청 종료 시간', '100', 'center', 'str', 'ro', false, 'reqstEndTime', '', '')); /* gf_LocaleTrans('default', 'titReqstEndTime') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('실제 근무 일자', '100', 'center', 'str', 'ro', false, 'realWorkDe', '', '')); /* gf_LocaleTrans('default', 'titRealWorkDe') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('실제 시작 시간', '100', 'center', 'str', 'ro', false, 'realBeginTime', '', '')); /* gf_LocaleTrans('default', 'titRealBeginTime') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('실제 종료 시간', '100', 'center', 'str', 'ro', false, 'realEndTime', '', '')); /* gf_LocaleTrans('default', 'titRealEndTime') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('실제 근무 시간', '100', 'center', 'str', 'ro', false, 'realWorkTime', '', '')); /* gf_LocaleTrans('default', 'titRealWorkTime') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('매식 여부', '100', 'center', 'str', 'ro', false, 'mealAt', '', '')); /* gf_LocaleTrans('default', 'titMealAt') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('근무 내용', '100', 'left', 'str', 'ro', false, 'workCn', '', '')); /* gf_LocaleTrans('default', 'titWorkCn') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('주간 인정 시간', '100', 'center', 'str', 'ro', false, 'dayRecogTime', '', '')); /* gf_LocaleTrans('default', 'titDayRecogTime') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('야간 인정 시간', '100', 'center', 'str', 'ro', false, 'nightRecogTime', '', '')); /* gf_LocaleTrans('default', 'titNightRecogTime') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('대체 휴무 사용 여부', '120', 'center', 'str', 'ro', true, 'altHvofUseAt', '', '')); /* gf_LocaleTrans('default', 'titAltHvofUseAt') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('대체 휴무 일', '0', 'left', 'str', 'ro', true, 'altHvofDe', '', '')); /* gf_LocaleTrans('default', 'titAltHvofDe') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드', '120', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태', '120', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '120', 'center', 'str', 'ro', false, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원 번호', '120', 'center', 'str', 'ro', false, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원 이름', '120', 'center', 'str', 'ro', false, 'elctsctEmpnm', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('철회 전자결재 순번', '150', 'center', 'str', 'ro', true, 'wthdrawElctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titWthdrawElctsctSttusCode') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('철회 여부', '100', 'center', 'str', 'ro', false, 'wthdrawAt', '', '')); /* gf_LocaleTrans('default', 'titWthdrawAt') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('보상 휴무 사용 여부', '120', 'center', 'str', 'ro', false, 'rewardHvofUseAt', '', '')); /* gf_LocaleTrans('default', 'titRewardHvofUseAt') */
    dhxGridMhshrd010HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'left', 'str', 'ro', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhshrd010 = gf_MakeDhxGrid('dataListMhshrd010', dhxGridMhshrd010HeaderInfo, true, false, false);
    dhxGridMhshrd010.enableAutoWidth(false);
    dhxGridMhshrd010.setEditable(false);

    dhxGridMhshrd010.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrd010 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrd010 = gf_GridDetachEvent(dhxGridMhshrd010, eventIdMhshrd010);
    eventEmpIdMhshrd010 = gf_GridDetachEvent(dhxEmpGridMhshrd010, eventEmpIdMhshrd010);
    eventId = dhxGridMhshrd010.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrd010();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrd010.getColumnsNum();
            var rowNum = dhxGridMhshrd010.getRowsNum();
            var selectedId = dhxGridMhshrd010.getSelectedRowId();
            var ind        = dhxGridMhshrd010.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd010.getRowIndex(selectedId);
            var type       = dhxGridMhshrd010.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrd010.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrd010.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrd010.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd010.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrd010.getSelectedRowId();
            var ind        = dhxGridMhshrd010.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd010.getRowIndex(selectedId);
            var type       = dhxGridMhshrd010.getColType(ind);
            dhxGridMhshrd010.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd010.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrd010.getSelectedRowId();
            var ind        = dhxGridMhshrd010.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd010.getRowIndex(selectedId);
            var type       = dhxGridMhshrd010.getColType(ind);
            dhxGridMhshrd010.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd010.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrd010.push(eventId);
    eventId = dhxGridMhshrd010.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrd010SortGridList(ind, type, direction); 
    });
    eventIdMhshrd010.push(eventId);
    eventId = dhxGridMhshrd010.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrd010.push(eventId);
    eventId = dhxEmpGridMhshrd010.attachEvent("onRowSelect", function(id, ind){
    	fn_SearchMhshrd010('');
    	return true;
    });
    eventEmpIdMhshrd010.push(eventId);
    eventId = dhxGridMhshrd010.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMhshrd010.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrd010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrd010()
    });
    $('#btnSaveMhshrd010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrd010();
    });
    $('#btnRemoveMhshrd010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrd010();
    });
    $('#btnExcelMhshrd010').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrd010();
    });
    $('#btnSearchMhshrd010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchEmp();
    });
    $('#btnResetMhshrd010').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrd010();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhshrd010 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrd010').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrd010').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhshrd010","empno","empNm",'', "Y", "fn_SearchMhsEmpEmpCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd010', 'empNm', '', 'text');
		}
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd010', 'empno', '', 'text');
		}
    });
    //부서 선택 Popup
	$('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhshrd010","deptCode","deptCodeNm",'', "Y", "fn_SearchMhsEmpDeptCode");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd010', 'deptCodeNm', '', 'text');
		}
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd010', 'deptCode', '', 'text');
		}
    });
};

var cf_InitFormMhshrd010 = function() {
    $('#searchFormMhshrd010').resetForm();
    
    if("PUBMNG000" == gv_SecondLvlMenuId){
    	gf_FormSetValue("searchFormMhshrd010", "deptCode", sessionUserDeptCode , '');
    	gf_FormSetValue("searchFormMhshrd010", "deptCodeNm", sessionUserDeptNm , '');
    	gf_FormSetValue("searchFormMhshrd010", "empno", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormMhshrd010", "empNm", sessionUserEmpnm , '');
    }
};

var cf_SetBindingMhshrd010 = function() {
	fn_SessionCheck();
	fn_SearchEmp();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
function fn_SearchEmp(){
    var jsonParameter = {
            empno     : gf_FormGetValue('searchFormMhshrd010', 'empno', 'text'),
            deptCode  : gf_FormGetValue('searchFormMhshrd010', 'deptCode', 'text')
    };
    gf_Transaction('gridPopupMenuEmp', 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchGridListEmp', false, 'GET');
}
/**
 * 세션 체크
 */
var fn_SessionCheck = function(){
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
//    console.log(userInfo);
    if(userInfo.code == "000"){
    	sessionUserDeptCode = userInfo.data.userDeptCode;
    	sessionUserDeptNm = userInfo.data.userDeptNm;
    	sessionUserEmpno = userInfo.data.userEmpNo;
    	sessionUserEmpnm = userInfo.data.userNm;

    	gf_FormSetValue("searchFormMhshrd010", "deptCode", sessionUserDeptCode , '');
    	gf_FormSetValue("searchFormMhshrd010", "deptCodeNm", sessionUserDeptNm , '');
    	gf_FormSetValue("searchFormMhshrd010", "empno", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormMhshrd010", "empNm", sessionUserEmpnm , '');
    }
    if("PUBMNG000" == gv_SecondLvlMenuId){
    	$("#searchFormMhshrd010 #deptCode").attr("disabled" , true);
    	$("#searchFormMhshrd010 #deptCodeNm").attr("disabled" , true);
    	$("#searchFormMhshrd010 #btnDeptCodeSearch").attr("disabled" , true);
    	$("#searchFormMhshrd010 #empno").attr("disabled" , true);
    	$("#searchFormMhshrd010 #empNm").attr("disabled" , true);
    	$("#searchFormMhshrd010 #btnEmpSearch").attr("disabled" , true);
    }
}
var fn_CallbackSearchGridListEmp = function(strSvcID, targetID, data){
//	console.log(data);
	dhxEmpGridMhshrd010.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxEmpGridMhshrd010.parse(data.data.records, 'js');
    	dhxEmpGridMhshrd010.selectRow(0);
    	fn_SearchMhshrd010('');
        gf_NoFoundDataOnGridMsgRemove('dhxEmpGridMhshrd010');
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
        gf_NoFoundDataOnGridMsg('dhxEmpGridMhshrd010'); 
    }
}
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormMhshrd010', 'deptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormMhshrd010', 'deptCodeNm', 'text'), 
			useAt : '1'
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}

function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhshrd010', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhshrd010', 'deptCodeNm', data.deptKorNm, 'text');
   		
   		fn_SearchMhshrd010('');
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormMhshrd010","deptCode","deptCodeNm", '' , "Y", null);
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
 		
 		fn_SearchEmp('');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormPubwks020","empno","empNm", '' , "Y", null);
  	}
}
/**
 * 조회
 */
var fn_SearchMhshrd010 = function(userId) {
	var rowId = dhxEmpGridMhshrd010.getSelectedRowId();
    var jsonParameter = {
        empno : gf_DhxGetValue(dhxEmpGridMhshrd010 , rowId, 'empno', 'grid')
    };
    gf_Transaction(userId, 'mhshrd010/searchMhshrd010', jsonParameter, 'fn_CallbackSearchMhshrd010', false, 'GET');
};

var fn_CallbackSearchMhshrd010 = function(strSvcID, targetID, data) {
    dhxGridMhshrd010.clearAll();
//    dhxGridMhshrd010.destructor();
//    if(cf_SetComponentsMhshrd010()){ 
        if(!gf_IsNull(data.data.records)){
            dhxGridMhshrd010.parse(data.data.records, 'js');
            dhxGridMhshrd010.selectRow(0);
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrd010');
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrd010');
        }
        $("#spanCntSearchFormMhshrd010").text(data.data.records.length);
        cf_SetEventListenerMhshrd010();
//    } 
};

/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrd010SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrd010, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrd010', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrd010', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrd010, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrd010.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrd010', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrd010', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd010, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrd010.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrd010', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrd010', 'sortColumId', '', 'text'); 
            dhxGridMhshrd010.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrd010.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrd010', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrd010', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd010, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};

/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrd010 = function () {
    var titMhshrd010 = '초과근무조회'; /* gf_LocaleTrans('default', 'titMhshrd010') */
	var rowId = dhxEmpGridMhshrd010.getSelectedRowId();
    var jsonParameter = {
        empno : gf_DhxGetValue(dhxEmpGridMhshrd010 , rowId, 'empno', 'grid')
    };
    var header = [[
    	'사원 이름',
        '근무 구분' /* gf_LocaleTrans('default', 'titOvtimeSeCode') */,
        '신청 일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '신청 시작 시간' /* gf_LocaleTrans('default', 'titReqstBeginTime') */,
        '신청 종료 시간' /* gf_LocaleTrans('default', 'titReqstEndTime') */,
        '실제 근무 일자' /* gf_LocaleTrans('default', 'titRealWorkDe') */,
        '실제 시작 시간' /* gf_LocaleTrans('default', 'titRealBeginTime') */,
        '실제 종료 시간' /* gf_LocaleTrans('default', 'titRealEndTime') */,
        '실제 근무 시간' /* gf_LocaleTrans('default', 'titRealWorkTime') */,
        '매식 여부' /* gf_LocaleTrans('default', 'titMealAt') */,
        '근무 내용' /* gf_LocaleTrans('default', 'titWorkCn') */,
        '주간 인정 시간' /* gf_LocaleTrans('default', 'titDayRecogTime') */,
        '야간 인정 시간' /* gf_LocaleTrans('default', 'titNightRecogTime') */,
        '전자결재 상태' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 문서 번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재 사원',
        '철회 순번' /* gf_LocaleTrans('default', 'titWthdrawElctsctDocNo') */,
        '철회 여부' /* gf_LocaleTrans('default', 'titWthdrawAt') */,
        '보상 휴무 사용 여부' /* gf_LocaleTrans('default', 'titRewardHvofUseAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'empnm' , 'ovtimeSeCodeNm', 'reqstDe', 'reqstBeginTime', 'reqstEndTime', 'realWorkDe', 'realBeginTime', 'realEndTime', 'realWorkTime', 'mealAt', 'workCn', 'dayRecogTime', 'nightRecogTime', 'elctsctSttusCodeNm', 'elctsctDocNo', 'elctsctEmpnm' ,'wthdrawElctsctSeSn', 'wthdrawAt', 'rewardHvofUseAt', 'rm' ]];
    var dataAlign = [[ 'center','center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titMhshrd010 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrd010;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrd010/excelMhshrd010', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
