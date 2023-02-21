/**
 *    프로그램       : 연차일수관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.10
 *    사용테이블      : MHS_WRYC_DAYCNT
 * sourceGen version : 2020.08.06.01 (2020.08.10)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrd001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrd001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrd001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrd001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrd001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrd001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrd001 = 0;  //그리드 삭제 수량 
var dhxGridMhshrd001;  //그리드 객체
var eventIdMhshrd001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrd001;  //DataProcessor 객체
var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;
var searchEmpEcnyCalendar;	// 입사일자 검색 달력
var nowDate = "";
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrd001();
    if(cf_SetComponentsMhshrd001()){
       cf_SetEventListenerMhshrd001();
       cf_InitFormMhshrd001();
       cf_SetBindingMhshrd001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrd001 = function() {
    gf_SetMenuPath();
    $("#searchFormMhshrd001").validate({ errorElement: 'div', ignore: '' });
    gf_ComboCode('hffsSe', 'hffsSe', 'hffsSe', 'search', 'C278', '' , '', '', 'asc','');
    
	fn_Calendar();
//    $("#applcYySearchFormMhshrd001").focus();
};

var cf_SetComponentsMhshrd001 = function() {
    var dhxGridMhshrd001HeaderInfo = [];
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '30', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('해당년도', '100', 'center', 'str', 'ro', true, 'applcYy', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('사원이름', '100', 'center', 'str', 'ro', false, 'empnm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('입사일자', '80', 'center', 'str', 'ro', false, 'ecnyDe', '', '')); /* gf_LocaleTrans('default', 'titApplcBeginDe') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('기산일자', '80', 'center', 'str', 'ro', false, 'valueDate', '', '')); /* gf_LocaleTrans('default', 'titApplcBeginDe') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('근속연수', '50', 'center', 'str', 'ro', false, 'cnwkYcnt', '', '')); /* gf_LocaleTrans('default', 'titApplcBeginDe') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '50', 'center', 'str', 'ro', false, 'cnwkMcnt', '', '')); /* gf_LocaleTrans('default', 'titApplcBeginDe') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '50', 'center', 'str', 'ro', false, 'cnwkDcnt', '', '')); /* gf_LocaleTrans('default', 'titApplcBeginDe') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('연차적용시작일', '100', 'center', 'str', 'ro', false, 'applcBeginDe', '', '')); /* gf_LocaleTrans('default', 'titApplcBeginDe') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('연차적용종료일', '100', 'center', 'str', 'ro', false, 'applcEndDe', '', '')); /* gf_LocaleTrans('default', 'titApplcEndDe') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('연차일수', '80', 'center', 'int', 'edn', false, 'wrycDaycnt', '', '')); /* gf_LocaleTrans('default', 'titWrycDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('소요일', '80', 'center', 'int', 'ro', false, 'useDaycnt', '', '')); /* gf_LocaleTrans('default', 'titUseDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('잔여일수', '80', 'center', 'int', 'ro', false, 'remainderDaycnt', '', '')); /* gf_LocaleTrans('default', 'titRemainderDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('권장일수', '80', 'center', 'int', 'ro', true, 'recmndDaycnt', '', '')); /* gf_LocaleTrans('default', 'titRecmndDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('정산일수', '80', 'center', 'int', 'ro', true, 'excclcDaycnt', '', '')); /* gf_LocaleTrans('default', 'titExcclcDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('신입발생일수', '100', 'center', 'int', 'ro', true, 'nwmbOccrrncDaycnt', '', '')); /* gf_LocaleTrans('default', 'titNwmbOccrrncDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('신입사용일수', '100', 'center', 'int', 'ro', true, 'nwmbUseDaycnt', '', '')); /* gf_LocaleTrans('default', 'titNwmbUseDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('신입잔여일수', '100', 'center', 'int', 'ro', true, 'nwmbRemainderDaycnt', '', '')); /* gf_LocaleTrans('default', 'titNwmbRemainderDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('신입정산일수', '100', 'center', 'int', 'ro', true, 'nwmbExcclcDaycnt', '', '')); /* gf_LocaleTrans('default', 'titNwmbExcclcDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('1년전 연차 사용일수', '80', 'center', 'str', 'ro', false, 'onyrbfWrycUseDaycnt', '', '')); /* gf_LocaleTrans('default', 'titAdsbtrResn') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('2년전 연차 사용일수', '80', 'center', 'str', 'ro', false, 'twyrbfWrycUseDaycnt', '', '')); /* gf_LocaleTrans('default', 'titAdsbtrResn') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('가감 일수', '80', 'center', 'int', 'edn', false, 'adsbtrDaycnt', '', '')); /* gf_LocaleTrans('default', 'titAdsbtrDaycnt') */
    dhxGridMhshrd001HeaderInfo.push(gf_MakeDhxGridHeader('가감 사유', '*', 'left', 'str', 'edn', false, 'adsbtrResn', '', '')); /* gf_LocaleTrans('default', 'titAdsbtrResn') */
    
    var attachHeaderArr = [];
    attachHeaderArr.push(["#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","년","월",
    					  "일","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan",
    					  "#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan"]);
    
    dhxGridMhshrd001 = gf_MakeDhxGrid('dataListMhshrd001', dhxGridMhshrd001HeaderInfo, false, true, false ,attachHeaderArr);
    dhxGridMhshrd001.enableAutoWidth(false);
    dhxGridMhshrd001.setEditable(true);

    dhxGridMhshrd001.setColumnMinWidth(30,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrd001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrd001 = gf_GridDetachEvent(dhxGridMhshrd001, eventIdMhshrd001);
    eventId = dhxGridMhshrd001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrd001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrd001.getColumnsNum();
            var rowNum = dhxGridMhshrd001.getRowsNum();
            var selectedId = dhxGridMhshrd001.getSelectedRowId();
            var ind        = dhxGridMhshrd001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd001.getRowIndex(selectedId);
            var type       = dhxGridMhshrd001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrd001.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrd001.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrd001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrd001.getSelectedRowId();
            var ind        = dhxGridMhshrd001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd001.getRowIndex(selectedId);
            var type       = dhxGridMhshrd001.getColType(ind);
            dhxGridMhshrd001.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrd001.getSelectedRowId();
            var ind        = dhxGridMhshrd001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrd001.getRowIndex(selectedId);
            var type       = dhxGridMhshrd001.getColType(ind);
            dhxGridMhshrd001.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrd001.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrd001.push(eventId);
    eventId = dhxGridMhshrd001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrd001SortGridList(ind, type, direction); 
    });
    eventIdMhshrd001.push(eventId);
    eventId = dhxGridMhshrd001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrd001.push(eventId);
    eventId = dhxGridMhshrd001.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMhshrd001.push(eventId);
    eventId = dhxGridMhshrd001.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdMhshrd001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrd001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrd001()
    });
    $('#btnSaveMhshrd001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        setTimeout(function(){     fn_SaveMhshrd001();     }, 1);  
//        fn_SaveMhshrd001();
    });
    $('#btnRemoveMhshrd001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrd001();
    });
    $('#btnExcelMhshrd001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrd001();
    });
    $('#btnSearchMhshrd001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        if($("#searchFormMhshrd001").validate().form()){
        	fn_SearchMhshrd001('');
        }
    });
    $('#btnResetMhshrd001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrd001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhshrd001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrd001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrd001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //사원팝업
	$('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhshrd001","empno","empNm",'', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd001', 'empNm', '', 'text');
		}
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd001', 'empno', '', 'text');
		}
    });
    //부서 선택 Popup
	$('#btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhshrd001","deptCode","deptCodeNm",'', "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd001', 'deptCodeNm', '', 'text');
		}
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrd001', 'deptCode', '', 'text');
		}
    });
	// 달력 이벤트
    $('#searchFormMhshrd001 #ecnyDt').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
    	searchEmpEcnyCalendar.show();
    });
    $('#searchFormMhshrd001 .input_calen').unbind('keyup').bind('keyup', function(event){
    	dateChk($(this));
    });
    
    //연차일수갱신 버튼
    $('#btnNetxYearDaycntInit').unbind('click').bind('click', function(event){
    	gf_errorMsgClear();
    	fn_NextYearWryc();
    });
    
    $("#searchFormMhshrd001 #applcYySearchFormMhshrd001").unbind('change').bind('change' , function(event){
    	gf_errorMsgClear();
    	fn_SearchMhshrd001('');
    });
};

var cf_InitFormMhshrd001 = function() {
	$('#searchFormMhshrd001').resetForm();
	gf_FormSetValue('searchFormMhshrd001', 'hffsSe','J01', 'combo');
	$('#applcYySearchFormMhshrd001').val(nowDate.substring(0,4));
};

var cf_SetBindingMhshrd001 = function() {
	fn_SessionCheck();
    fn_SearchMhshrd001('');
};

/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var fn_NextYearWryc = function(){
	var nowYear = nowDate.substring(0,4);
	var jsonParameter = {
		nextYearFlag : 'T'
	};
	var dataSource = gf_NoAsyncTransaction('mhshrd001/MHS_YEARCNT', jsonParameter, 'GET');
    var data = dataSource.data;
    if(data.code == '000'){
    	gf_DivMsgAlert(gv_MsgSave);
    	gf_FormSetValue("searchFormMhshrd001", "applcYy", (nowYear * 1) + 1 , '');
    	fn_SearchMhshrd001('');
    }
}


$(document).click(function(e){ //문서 body를 클릭했을때
    if(e.target.id =="searchEcnyDt_cal" || e.target.id =="searchEcnySdtMhshrd001" || e.target.id =="searchEcnyEdtMhshrd001") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchEmpEcnyCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
var fn_Calendar = function(){
	searchEmpEcnyCalendar = new dhtmlXDoubleCalendar("searchEcnyDt_cal");
	searchEmpEcnyCalendar.attachEvent("onClick" , function(side , date){
		//alert(side + " + " + date);
		if(side == "left"){
			$('#searchEcnySdtMhshrd001').val(dateFormat(searchEmpEcnyCalendar.leftCalendar.getDate()));
		}
        if(side == "right"){
        	searchEmpEcnyCalendar.hide();
        	$('#searchEcnyEdtMhshrd001').val(dateFormat(searchEmpEcnyCalendar.rightCalendar.getDate()));
        }
	});
	
	searchEmpEcnyCalendar.leftCalendar.loadUserLanguage("ko"); 
	searchEmpEcnyCalendar.rightCalendar.loadUserLanguage("ko");
	
	//년달력
    var today = new Date();
    nowDate = dateFormat(today);
    
    
	$('#applcYySearchFormMhshrd001').val(nowDate.substring(0,4));
	
	var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;
    var endYear = currentYear+10;

    $('#applcYySearchFormMhshrd001').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
}
var fn_SessionCheck = function(){
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
//    console.log(userInfo);
    if(userInfo.code == "000"){
    	sessionUserDeptCode = userInfo.data.userDeptCode;
    	sessionUserDeptNm = userInfo.data.userDeptNm;
    	sessionUserEmpno = userInfo.data.userEmpNo;
    	sessionUserEmpnm = userInfo.data.userNm;
    	
//    	gf_FormSetValue("searchFormMhshrd001", "deptCode", sessionUserDeptCode , '');
//    	gf_FormSetValue("searchFormMhshrd001", "deptCodeNm", sessionUserDeptNm , '');
//    	gf_FormSetValue("searchFormMhshrd001", "empno", sessionUserEmpno , '');
//    	gf_FormSetValue("searchFormMhshrd001", "empNm", sessionUserEmpnm , '');
    	
    }	
    var date = new Date();
    if(date.getMonth() >= 11){
    	$("#btnNetxYearDaycntInit").attr("disabled" , false);
    }
    else{
    	$("#btnNetxYearDaycntInit").attr("disabled" , true);
    }
}
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormMhshrd001', 'deptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormMhshrd001', 'deptCodeNm', 'text'), 
			useAt : '1',
			bplcCode : gf_FormGetValue('searchFormMhshrd001', 'searchComboStmBizplc', 'combo') //사업장
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}

function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhshrd001', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhshrd001', 'deptCodeNm', data.deptKorNm, 'text');
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormMhsflx002","deptCode","deptCodeNm", '' , "Y", null);
    }
}

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMhshrd001', 'empno', 'text'),
		    korNm : gf_FormGetValue('searchFormMhshrd001', 'empNm', 'text'),
		    bplcCode : gf_FormGetValue('searchFormMhshrd001', 'searchComboStmBizplc', 'combo') //사업장
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMhshrd001', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormMhshrd001', 'empNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormMhshrd001","empno","empNm", '' , "Y", null);
  	}
}
/**
 * 조회
 */
var fn_SearchMhshrd001 = function(userId) {
    var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMhshrd001', 'applcYy', 'text'),
        deptCode : gf_FormGetValue('searchFormMhshrd001', 'deptCode', 'text'),
        empno : gf_FormGetValue('searchFormMhshrd001', 'empno', 'text'),
        hffsSe : gf_FormGetValue('searchFormMhshrd001', 'hffsSe','combo'),
        ecnySde : gf_FormGetValue('searchFormMhshrd001', 'searchEcnySdt', 'text').replaceAll('-',''),
        ecnyEde : gf_FormGetValue('searchFormMhshrd001', 'searchEcnyEdt', 'text').replaceAll('-','')
    };
    gf_Transaction(userId, 'mhshrd001/searchMhshrd001', jsonParameter, 'fn_CallbackSearchMhshrd001', false, 'GET');
};

var fn_CallbackSearchMhshrd001 = function(strSvcID, targetID, data) {
    //dhxGridMhshrd001.clearAll();
    dhxGridMhshrd001.destructor();
    if(cf_SetComponentsMhshrd001()){ 
        fn_DhxDataProcessorMhshrd001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrd001');
            dhxGridMhshrd001.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mhshrd001 == 0 && save_All_Sta_Mhshrd001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrd001.selectRow(0); 
            } else if(save_Row_Sta_Mhshrd001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrd001.selectRow(0);
            } else if(save_All_Sta_Mhshrd001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrd001.selectRow(save_Row_Num_Mhshrd001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrd001.selectRow(save_Row_Num_Mhshrd001);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrd001.findCell(save_Row_Ids_Mhshrd001, gf_GetDhxGridColumId(dhxGridMhshrd001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrd001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrd001.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrd001');
        }
        $("#spanCntSearchFormMhshrd001").text(data.data.records.length);
        cf_SetEventListenerMhshrd001();
    } 
};
var fn_DhxDataProcessorMhshrd001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrd001 = new dataProcessor(gv_ContextPath+'/mhshrd001/saveMhshrd001'); //lock feed url
    dhxDataProcessorMhshrd001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrd001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrd001.init(dhxGridMhshrd001); //link dataprocessor to the grid
    dhxDataProcessorMhshrd001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrd001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrd001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrd001();
                    $("#checkAllMhshrd001").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 추가(신규) 
 */
var fn_AddMhshrd001 = function() {
    dhxGridMhshrd001.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //applcYy
    initValueArr.push(''); //empno
    initValueArr.push(''); //applcBeginDe
    initValueArr.push(''); //applcEndDe
    initValueArr.push(''); //wrycDaycnt
    initValueArr.push(''); //useDaycnt
    initValueArr.push(''); //remainderDaycnt
    initValueArr.push(''); //recmndDaycnt
    initValueArr.push(''); //excclcDaycnt
    initValueArr.push(''); //nwmbOccrrncDaycnt
    initValueArr.push(''); //nwmbUseDaycnt
    initValueArr.push(''); //nwmbRemainderDaycnt
    initValueArr.push(''); //nwmbExcclcDaycnt
    initValueArr.push(''); //adsbtrDaycnt
    initValueArr.push(''); //adsbtrResn
    dhxGridMhshrd001.addRow(dhxGridMhshrd001.uid(), initValueArr, 0);
    dhxGridMhshrd001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrd001');
    $('#btnPopEmpSearchMhshrd001').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrd001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrd001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrd001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrd001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrd001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrd001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrd001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrd001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrd001.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrd001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrd001', 'sortColumId', '', 'text'); 
            dhxGridMhshrd001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrd001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrd001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrd001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrd001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrd001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrd001 = 0; 
    save_Edt_Cnt_Mhshrd001 = 0; 
    save_Del_Cnt_Mhshrd001 = 0; 
    dhxGridMhshrd001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrd001.getState(rowId))) {
            edCnt++;
            var state = dhxDataProcessorMhshrd001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrd001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrd001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrd001 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        var confirmMsg  = ""; 
        var confirmMsg1 = ""; 
        var confirmMsg2 = ""; 
        var confirmMsg3 = ""; 
        save_All_Sta_Mhshrd001 = 0; 
        if(save_Add_Cnt_Mhshrd001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrd001 + "건";
            save_All_Sta_Mhshrd001 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrd001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrd001 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrd001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrd001 + "건"; 
            save_All_Sta_Mhshrd001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrd001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrd001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrd001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrd001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrd001_Send = function() {
    if(fn_GridValidation(dhxGridMhshrd001, dhxDataProcessorMhshrd001)) {
        dhxDataProcessorMhshrd001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrd001 = function() {
    var rowId = dhxGridMhshrd001.getSelectedRowId();
    var state = dhxDataProcessorMhshrd001.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMhshrd001.getRowIndex(rowId);
        dhxGridMhshrd001.deleteRow(rowId);
        dhxGridMhshrd001.selectRow(rowNum);
    }
    else dhxDataProcessorMhshrd001.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrd001 = function () {
    var titMhshrd001 = '연차일수관리'; /* gf_LocaleTrans('default', 'titMhshrd001') */
   
	var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMhshrd001', 'applcYy', 'text'),
        deptCode : gf_FormGetValue('searchFormMhshrd001', 'deptCode', 'text'),
        empno : gf_FormGetValue('searchFormMhshrd001', 'empno', 'text'),
        hffsSe : gf_FormGetValue('searchFormMhshrd001', 'hffsSe','combo'),
        ecnySde : gf_FormGetValue('searchFormMhshrd001', 'searchEcnySdt', 'text').replaceAll('-',''),
        ecnyEde : gf_FormGetValue('searchFormMhshrd001', 'searchEcnyEdt', 'text').replaceAll('-','')
    };
    
    var header = [[
		'사원번호',
        '사원이름',
        '입사일자',
        '기산일자',
        '근속연수(년)',
        '근속연수(월)',
        '근속연수(일)',
        '연차적용시작일',
        '연차적용종료일',
        '연차일수',
        '소요일',
        '잔여일수',
        '1년전 연차 사용일수',
        '2년전 연차 사용일수',
        '가감 일수',
        '가감 사유'
    ]];
    var dataId = [[ 
		'empno',
		'empnm',
		'ecnyDe',
		'valueDate', 
		'cnwkYcnt', 
		'cnwkMcnt', 
		'cnwkDcnt', 
		'applcBeginDe', 
		'applcEndDe', 
		'wrycDaycnt', 
		'useDaycnt', 
		'remainderDaycnt', 
		'onyrbfWrycUseDaycnt', 
		'twyrbfWrycUseDaycnt', 
		'adsbtrDaycnt',
		'adsbtrResn' 
	]];
    var dataAlign = [[ 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center', 
		'center',
		'center',
		'center' 
	]];
    var sheetNm = [[ titMhshrd001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrd001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrd001/excelMhshrd001', jsonParameter); 
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
    $('#saveFormMhshrd001 #applcYySaveFormMhshrd001').parent().append(
    '<div class="error" id="applcYySaveFormMhshrd001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshrd001 #empnoSaveFormMhshrd001').parent().append(
    '<div class="error" id="empnoSaveFormMhshrd001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrd001 = function(applcYy, empno){
    if(!gf_IsNull(applcYy) && !gf_IsNull(empno)) {
        var jsonParameter = {
            applcYy : applcYy,
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mhshrd001/findMhshrd001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYy) && gf_IsNull(data.empno)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkApplcYy;
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrd001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrd001 = 0;
        save_Row_Ids_Mhshrd001 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrd001 = rowNum;
        save_Row_Ids_Mhshrd001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrd001 = rowNum;
        save_Row_Ids_Mhshrd001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcYy', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkApplcYy = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYy', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkApplcYy, checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYy = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYy', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((applcYy == checkApplcYy) && (empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrd001( checkApplcYy, checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            valid = false;
                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    }
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMhshrd001.selectRowById(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}
/**
 * 그리드 validation 빨간색 언더바
 */
var fn_GridValidationSelectCell = function(dhxGrid, dhxDataProcessor, rId, cInd){
    dhxGrid.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
            dhxGrid.forEachCell(rowId, function(cellObj, ind){
                dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
            });
        }
    });
    setTimeout(function(){
        dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
    },1);
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
	
	var nDate = yyyy+'-'+mm+'-'+dd;
	return(nDate);
}
//입력 내용을 날짜 포멧으로
function dateChk(objDate){
	var RegNotNum = /[^0-9]/g;  //숫자 정규식
	var date = objDate.val();
	date = date.replace(RegNotNum, '');
	if (date == "" || date == null || date.length < 5) {
		objDate.val(date);
		return;
	}
	var DataFormat;
	var RegPhonNum;
	// 날짜 포맷(yyyy-mm-dd) 만들기 
	if (date.length <= 6) {
		DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
		RegPhonNum = /([0-9]{4})([0-9]+)/;
	} else if (date.length <= 8) {
		DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
		RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
	}
	while (RegPhonNum.test(date)) {
		date = date.replace(RegPhonNum, DataFormat);
	}
	objDate.val(date);
	// 모두 입력됐을 경우 날짜 유효성 확인
	if (date.length == 10) {
		var isVaild = true;
		if (isNaN(Date.parse(date))) {
			// 유효 날짜 확인 여부
			isVaild = false;
		} else {
			// 년, 월, 일 0 이상 여부 확인
			var date_sp = date.split("-");
			date_sp.forEach(function(sp) {
				if (parseInt(sp) == 0) {
					isVaild = false;
				}
			});
			// 마지막 일 확인
			var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
			if (last.getDate() < parseInt(date_sp[2])) {
				isVaild = false;
			}
		}
		if (!isVaild) {
			gf_DivMsgAlert("잘못된 날짜입니다. \n다시 입력하세요.");
			objDate.val("");
			objDate.focus();
			return;
		}
	}
}
