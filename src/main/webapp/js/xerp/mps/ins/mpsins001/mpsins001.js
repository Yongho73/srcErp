/**
 *    프로그램       : 사회보험월별납부 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.11
 *    사용테이블      : MPS_MT_SNLRCCHRGE
 * sourceGen version : 2020.07.16.01 (2020.08.11)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsins001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsins001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsins001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsins001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsins001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsins001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsins001 = 0;  //그리드 삭제 수량 
var dhxGridMpsins001;  //그리드 객체
var eventIdMpsins001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpsins001;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsins001();
    if(cf_SetComponentsMpsins001()){
       cf_SetEventListenerMpsins001();
       cf_InitFormMpsins001();
       cf_SetBindingMpsins001();
       if(init()){   // 초기화
     		init2();  // 기간달력 초기화
     		init3();  // 년  달력 초기화
     	}
    }
});

function init(){
	//기간달력 이벤트 추가
    $('#searchFormMpsins001 #date2').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxCCalendarDate2.show();
    });
   	//금일 조회
	    var today = new Date();
	    nowDate = dateFormat(today);
	    return(nowDate);
}
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="stDate" || e.target.id =="edDate") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기. //|| e.target.id =="dataListMpsins003"
});
//기간달력
function init2(){
	//달력 생성
	dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#stDate').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        	$('#edDate').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
        	dhxCCalendarDate2.hide();
        }
    });
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('stDate', 'edDate', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormMpsins001', 'stDate', 'text'));
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormMpsins001', 'edDate', 'text'));	
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
}
function init3(){
	$('#applcYyStMpsins001').val(gv_ComPreMonYyyy + "-" + gv_ComPreMonMm);
	$('#applcYyEnMpsins001').val(gv_CurYymm);
    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;
	
    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };
    
    $('#applcYyStMpsins001').monthpicker(options);
    $('#applcYyEnMpsins001').monthpicker(options);
  
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

/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsins001 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsins001").validate({ errorElement: 'div', ignore: '' });
    
    //재직구분
    gf_ComboCode('divComboHffsSeBox', 'hffsSe', 'hffsSe', 'search', 'C278', '' , '', '', 'asc', '');
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    //액셀업로드버튼이벤트
    fn_FileUploadBtnEvent();
    
    $("#deptCodeNm").focus();
};

var cf_SetComponentsMpsins001 = function() {
    var dhxGridMpsins001HeaderInfo = [];
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpsins001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '70', 'center', 'str', 'ed', false, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('공제일자', '100', 'center', 'str', 'ro', false, 'ddcDe', '', '')); /* gf_LocaleTrans('default', 'titDdcDe') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '70', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '80', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('주민등록번호', '100', 'center', 'str', 'ro', false, 'ihidnum', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('부서이름', '80', 'center', 'str', 'ro', false, 'deptCodeNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('직급', '80', 'center', 'str', 'coro', false, 'clsfCodeNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('국민연금', '100', 'right', 'int', 'edn', false, 'npnAmt', '', '')); /* gf_LocaleTrans('default', 'titNpnAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('건강보험', '100', 'right', 'int', 'edn', false, 'hlthinsAmt', '', '')); /* gf_LocaleTrans('default', 'titHlthinsAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'hlthinsExcclcAmt', '', '')); /* gf_LocaleTrans('default', 'titHlthinsExcclcAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'beyearHlthinsExcclcAmt', '', '')); /* gf_LocaleTrans('default', 'titBeyearHlthinsExcclcAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('고용보험', '100', 'right', 'int', 'edn', false, 'episAmt', '', '')); /* gf_LocaleTrans('default', 'titEpisAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'episExcclcAmt', '', '')); /* gf_LocaleTrans('default', 'titEpisExcclcAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'beyearEpisExcclcAmt', '', '')); /* gf_LocaleTrans('default', 'titBeyearEpisExcclcAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('장기요양보험', '100', 'right', 'int', 'edn', false, 'ltciAmt', '', '')); /* gf_LocaleTrans('default', 'titLtciAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'ltciExcclcAmt', '', '')); /* gf_LocaleTrans('default', 'titLtciExcclcAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'right', 'int', 'edn', false, 'beyearLtciExcclcAmt', '', '')); /* gf_LocaleTrans('default', 'titBeyearLtciExcclcAmt') */
    dhxGridMpsins001HeaderInfo.push(gf_MakeDhxGridHeader('산재보험', '100', 'right', 'int', 'edn', false, 'iaciAmt', '', '')); /* gf_LocaleTrans('default', 'titIaciAmt') */
    
    
    var attachHeaderArr = [];
    attachHeaderArr.push(["#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan", // num / 체크박스 / 적용년월 / 공재일자 / 사원번호 / 사원명 / 주민번호 / 부서 / 직급 
    	"건강보험","건강보험정산","전년도 건강보험 정산", // 건강보험
    	"고용보험","고용보험정산","전년도 고용보험 정산", // 고용보험
    	"장기요양보험","장기요양보험정산","전년도 장기요양보험 정산", // 장기요양보험
    	"#rspan"]); // 산재보험
    
    dhxGridMpsins001 = gf_MakeDhxGrid('dataListMpsins001', dhxGridMpsins001HeaderInfo, false, true, false , attachHeaderArr);
    
    dhxGridMpsins001.enableAutoWidth(false);
    dhxGridMpsins001.setEditable(true);
    
    dhxGridMpsins001.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("npnAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("hlthinsAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("hlthinsExcclcAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("beyearHlthinsExcclcAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("episAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("episExcclcAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("beyearEpisExcclcAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("ltciAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("ltciExcclcAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("beyearLtciExcclcAmt"), ".", ",");
    dhxGridMpsins001.setNumberFormat("0,000", dhxGridMpsins001.getColIndexById("iaciAmt"), ".", ",");
    return true; 
};

var cf_SetEventListenerMpsins001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsins001 = gf_GridDetachEvent(dhxGridMpsins001, eventIdMpsins001);
    eventId = dhxGridMpsins001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsins001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsins001.getColumnsNum();
            var rowNum = dhxGridMpsins001.getRowsNum();
            var selectedId = dhxGridMpsins001.getSelectedRowId();
            var ind        = dhxGridMpsins001.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins001.getRowIndex(selectedId);
            var type       = dhxGridMpsins001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsins001.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsins001.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsins001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsins001.getSelectedRowId();
            var ind        = dhxGridMpsins001.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins001.getRowIndex(selectedId);
            var type       = dhxGridMpsins001.getColType(ind);
            dhxGridMpsins001.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsins001.getSelectedRowId();
            var ind        = dhxGridMpsins001.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins001.getRowIndex(selectedId);
            var type       = dhxGridMpsins001.getColType(ind);
            dhxGridMpsins001.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins001.editCell();
            }
        }
        else return true;
    });
    eventIdMpsins001.push(eventId);
    eventId = dhxGridMpsins001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsins001SortGridList(ind, type, direction); 
    });
    eventIdMpsins001.push(eventId);
    eventId = dhxGridMpsins001.attachEvent("onBeforeSelect", function(id, ind){
    	return true;
    });
    eventIdMpsins001.push(eventId);
    eventId = dhxGridMpsins001.attachEvent("onRowSelect", function(rowId, cInd){
//    	if(cInd == 3){
//    		gf_DivMsgAlert('공제일 설정을 해주세요.'); 
//            return false;
//    	}
    	if((cInd == 4) || (cInd == 5) || (cInd == 6) || (cInd == 7) || (cInd == 8)){
    		fn_PopUpEmpWindows();
    	}
    });
    eventIdMpsins001.push(eventId);
    eventId = dhxGridMpsins001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsins001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsins001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsins001()
    });
    $('#btnSaveMpsins001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpsins001();
    });
    $('#btnRemoveMpsins001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsins001();
    });
    $('#btnExcelMpsins001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsins001();
    });
    $('#btnSearchMpsins001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsins001('');
    });
    $('#btnResetMpsins001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        fn_SearchMpsins001('');
    });
    $('#btnBugtAdd').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        if (dhxGridMpsins001.getRowsNum() == 0) { //전체 옵션일 경우  1개의 행만 추가할수 있음 
            gf_DivMsgAlert('신규 입력 사항이 없습니다.'); 
            return false;
           }
        fn_PopUpWindows();
    });
 // 액셀 양식 다운로드
    $('#btnExcelDownload').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelSampleMpsins001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMpsins001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpsins001, $('#checkAllMpsins001').prop('checked'), 'chk');
    });
    $('#searchFormMpsins001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "deptCode"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "deptCodeNm"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "empno"){
        		fn_SearchEmpCode("1");
        	} else if(this.id == "korNm"){
        		fn_SearchEmpCode("1");
        		return false;
        	} else{
        		$('#btnSearchMpsins001').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsins001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
	//사원 선택 Popup
    $('#searchFormMpsins001 #btnempnoSearchSearchFormMpsins001').unbind('click').bind('click', function(event){
    	gf_EmpPopup("searchFormMpsins001","empno","korNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins001', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins001', 'empno', '', 'text');
	    }
		
    });
    //부서 선택 Popup
	$('#searchFormMpsins001 #btnDeptCodeSearchSearchFormMpsins001').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMpsins001","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins001', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins001', 'deptCode', '', 'text');
	    }
    });
	
};

var cf_InitFormMpsins001 = function() {
    $('#searchFormMpsins001').resetForm();
    gf_FormSetValue('searchFormMpsins001', 'hffsSe','J01', 'combo') //재직구분을 첫 화면 표시할때 '재직'으로 기본 설정
};

var cf_SetBindingMpsins001 = function() {
    fn_SearchMpsins001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsins001 = function(userId) {
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpsins001', 'empno', 'text'),
        korNm : gf_FormGetValue('searchFormMpsins001', 'korNm', 'text'),
        deptCode : gf_FormGetValue('searchFormMpsins001', 'deptCode', 'text'),
        deptCodeNm : gf_FormGetValue('searchFormMpsins001', 'deptCodeNm', 'text'),
        hffsSe : gf_FormGetValue('searchFormMpsins001', 'hffsSe', 'combo'), //재직구분
        applcYySt : gf_FormGetValue('searchFormMpsins001', 'applcYySt', 'text'),
        applcYyEn : gf_FormGetValue('searchFormMpsins001', 'applcYyEn', 'text'),
        stDate : gf_FormGetValue('searchFormMpsins001', 'stDate', 'text'),
        edDate : gf_FormGetValue('searchFormMpsins001', 'edDate', 'text')
    };
    gf_Transaction(userId, 'mpsins001/searchMpsins001', jsonParameter, 'fn_CallbackSearchMpsins001', false, 'GET');
};

var fn_CallbackSearchMpsins001 = function(strSvcID, targetID, data) {
    //dhxGridMpsins001.clearAll();
    dhxGridMpsins001.destructor();
    if(cf_SetComponentsMpsins001()){ 
        fn_DhxDataProcessorMpsins001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsins001');
            dhxGridMpsins001.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mpsins001 == 0 && save_All_Sta_Mpsins001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsins001.selectRow(0); 
            } else if(save_Row_Sta_Mpsins001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsins001.selectRow(0);
            } else if(save_All_Sta_Mpsins001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsins001.selectRow(save_Row_Num_Mpsins001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsins001.selectRow(save_Row_Num_Mpsins001);   //개발자 수정 필요  
                //var findCell = dhxGridMpsins001.findCell(save_Row_Ids_Mpsins001, gf_GetDhxGridColumId(dhxGridMpsins001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsins001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsins001.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsins001');
        }
        $("#spanCntSearchFormMpsins001").text(data.data.records.length);
        cf_SetEventListenerMpsins001();
    } 
};
var fn_DhxDataProcessorMpsins001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsins001 = new dataProcessor(gv_ContextPath+'/mpsins001/saveMpsins001'); //lock feed url
    dhxDataProcessorMpsins001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsins001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsins001.init(dhxGridMpsins001); //link dataprocessor to the grid
    dhxDataProcessorMpsins001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsins001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsins001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    //fn_SearchMpsins001();
                    cf_SetBindingMpsins001();
                    $("#checkAllMpsins001").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMpsins001 = function() {
    dhxGridMpsins001.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(gv_CurYymm); //적용년월
    initValueArr.push(''); //공제일자
    initValueArr.push(''); //사원번호
    initValueArr.push(''); //사원명
    initValueArr.push(''); //주민번호
    initValueArr.push(''); //부서이름
    initValueArr.push(''); //직급
    initValueArr.push('0'); //국민연금
    initValueArr.push('0'); //건강보험
    initValueArr.push('0'); //건강보험정산
    initValueArr.push('0'); //전년도 건강보험 정산
    initValueArr.push('0'); //고용보험
    initValueArr.push('0'); //고용보험정산
    initValueArr.push('0'); //전년도고용보험정산
    initValueArr.push('0'); //장기요양보험
    initValueArr.push('0'); //장기요양보험정산
    initValueArr.push('0'); //전년도 장기요양보험
    initValueArr.push('0'); //산재보험
    
    dhxGridMpsins001.addRow(dhxGridMpsins001.uid(), initValueArr, 0);
    dhxGridMpsins001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpsins001');
    $('#btnPopEmpSearchMpsins001').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsins001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsins001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsins001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsins001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsins001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsins001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsins001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsins001', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsins001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsins001.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsins001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsins001', 'sortColumId', '', 'text'); 
            dhxGridMpsins001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsins001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsins001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsins001', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsins001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsins001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsins001 = 0; 
    save_Edt_Cnt_Mpsins001 = 0; 
    save_Del_Cnt_Mpsins001 = 0; 
    dhxGridMpsins001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsins001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsins001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsins001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsins001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsins001 += 1; 
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
        save_All_Sta_Mpsins001 = 0; 
        if(save_Add_Cnt_Mpsins001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsins001 + "건";
            save_All_Sta_Mpsins001 = 1; 
        } 
        if(save_Edt_Cnt_Mpsins001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsins001 + "건"; 
        } 
        if(save_Del_Cnt_Mpsins001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsins001 + "건"; 
            save_All_Sta_Mpsins001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsins001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsins001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsins001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsins001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsins001_Send = function() {
    if(fn_GridValidation(dhxGridMpsins001, dhxDataProcessorMpsins001)) {
        dhxDataProcessorMpsins001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsins001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsins001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpsins001.forEachRow(function(rowId) {
            state = dhxDataProcessorMpsins001.getState(rowId);
            if(dhxGridMpsins001.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsins001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpsins001.getRowIndex(rowId);
                    dhxGridMpsins001.deleteRow(rowId);
                    dhxGridMpsins001.selectRow(rowNum);
                }
                else dhxDataProcessorMpsins001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsins001 = function () {
    var titMpsins001 = '사회보험월별납부'; /* gf_LocaleTrans('default', 'titMpsins001') */
    var jsonParameter = {
        applcYm : gf_FormGetValue('searchFormMpsins001', 'applcYm', 'text'),
        empno : gf_FormGetValue('searchFormMpsins001', 'empno', 'text')
    };
    var header = [[
        '적용년월' /* gf_LocaleTrans('default', 'titApplcYm') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '공제일자' /* gf_LocaleTrans('default', 'titDdcDe') */,
        '국민연금 액' /* gf_LocaleTrans('default', 'titNpnAmt') */,
        '건강보험액' /* gf_LocaleTrans('default', 'titHlthinsAmt') */,
        '건강보험정산액' /* gf_LocaleTrans('default', 'titHlthinsExcclcAmt') */,
        '장기요약보험액' /* gf_LocaleTrans('default', 'titLtciAmt') */,
        '장기요약보험 정산금액' /* gf_LocaleTrans('default', 'titLtciExcclcAmt') */,
        '고용보험금액' /* gf_LocaleTrans('default', 'titEpisAmt') */,
        '산재보험금액' /* gf_LocaleTrans('default', 'titIaciAmt') */,
        '전년도 건강보험 정산액' /* gf_LocaleTrans('default', 'titBeyearHlthinsExcclcAmt') */,
        '전년도 장기용양 정산금액' /* gf_LocaleTrans('default', 'titBeyearLtciExcclcAmt') */,
        '고용보험 정산액' /* gf_LocaleTrans('default', 'titEpisExcclcAmt') */,
        '전년도 고용보험 정산액' /* gf_LocaleTrans('default', 'titBeyearEpisExcclcAmt') */
    ]];
    var dataId = [[ 'applcYm', 'empno', 'ddcDe', 'npnAmt', 'hlthinsAmt', 'hlthinsExcclcAmt', 'ltciAmt', 'ltciExcclcAmt', 'episAmt', 'iaciAmt', 'beyearHlthinsExcclcAmt', 'beyearLtciExcclcAmt', 'episExcclcAmt', 'beyearEpisExcclcAmt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsins001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsins001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsins001/excelMpsins001', jsonParameter);
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
	//gf_DivMsgAlert('중복.');
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsins001 = function(applcYm, empno){
    if(!gf_IsNull(applcYm) && !gf_IsNull(empno)) {
        var jsonParameter = {
            applcYm : applcYm,
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mpsins001/findMpsins001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYm) && gf_IsNull(data.empno)) {
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
    var checkApplcYm;
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsins001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpsins001 = 0;
        save_Row_Ids_Mpsins001 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpsins001 = rowNum;
        save_Row_Ids_Mpsins001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsins001 = rowNum;
        save_Row_Ids_Mpsins001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ddcDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ddcDe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'korNm', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'korNm');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ihidnum', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ihidnum');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'deptCodeNm', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'deptCodeNm');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'clsfCodeNm', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'clsfCodeNm');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'npnAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'npnAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'hlthinsAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'hlthinsAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'hlthinsExcclcAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'hlthinsExcclcAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'beyearHlthinsExcclcAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'beyearHlthinsExcclcAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'episAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'episAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'episExcclcAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'episExcclcAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'beyearEpisExcclcAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'beyearEpisExcclcAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ltciAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ltciAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'ltciExcclcAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'ltciExcclcAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'beyearLtciExcclcAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'beyearLtciExcclcAmt');
//                    valid = false;
//                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'iaciAmt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'iaciAmt');
//                    valid = false;
//                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkApplcYm = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkApplcYm, checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYm', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((applcYm == checkApplcYm) && (empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsins001( checkApplcYm, checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
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
        dhxGridMpsins001.selectRowById(validFalseFistRowId);
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

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMpsins001', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpsins001', 'deptCodeNm', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}
function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
  if(!gf_IsNull(data.data.records) && totCnt == 1){
  	//단건
  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMpsins001', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMpsins001', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMpsins001","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpsins001', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpsins001', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpsins001', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpsins001', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpsins001', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpsins001', 'korNm', 'text');
	}
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : gBplcCode
	};
	gf_Transaction(gubun, 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}
function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	  	if(strSvcID == "1"){
	 		gf_FormSetValue('searchFormMpsins001', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpsins001', 'korNm', data.korNm, 'text');
	  	}
	  	else{
	  		gf_FormSetValue('searchFormMpsins001', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpsins001', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpsins001', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMpsins001', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpsins001","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpsins001","empno","korNm", gBplcCode, "Y");
	  	}
  	}
	
}
var fn_PopUpEmpWindows =function (){
	gf_EmpPopup("","","", gBplcCode, "Y", fn_CallbackCridEmpPopComp);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
}
var fn_CallbackCridEmpPopComp = function(data) {
	if(!gf_IsEmptyObject(data)){
		dhxGridMpsins001.cells(dhxGridMpsins001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins001,'empno')).setValue(data.empno);
		dhxGridMpsins001.cells(dhxGridMpsins001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins001,'korNm')).setValue(data.korNm);
		dhxGridMpsins001.cells(dhxGridMpsins001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins001,'ihidnum')).setValue(data.ihidnum);
		dhxGridMpsins001.cells(dhxGridMpsins001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins001,'deptCodeNm')).setValue(data.deptCodeNm);
		dhxGridMpsins001.cells(dhxGridMpsins001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins001,'clsfCodeNm')).setValue(data.clsfCodeNm);
	}
};

var fn_PopUpWindows =function (rowId){
	gf_PymntDePopup('','','','', gBplcCode, "N", "fn_CallbackGridPopComp");
}
var fn_CallbackGridPopComp = function(data, rowId) {
	var closAt = data.closAt
	if(closAt == '1'){
    	// button 이 아니라 a 태그라서 css 마우스포인터 none 처리 : 비활성화
    	$("#btnSaveMpsins001").css({ 'pointer-events': 'none' });
    	gf_DivMsgAlert("급여마감 시 등록이 불가능 합니다. <br/>지급일자 재등록 하셔야 합니다.");
    }else if(closAt == '0' && !gf_IsNull(data.pymntDe)){
    	// button 이 아니라 a 태그라서 css 마우스포인터 auto 처리 : 활성화
    	$("#btnSaveMpsins001").css({ 'pointer-events': 'auto' });
        dhxGridMpsins001.forEachRow(function(rowId) {
        	dhxGridMpsins001.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsins001,"ddcDe")).setValue(data.pymntDe);
        });
    }  	
};

/**
* 엑셀 업로드
*/
var fn_ExcelSampleMpsins001 = function () {
  var titMpsins001 = '사회보험월별관리'; /* gf_LocaleTrans('default', 'titMhshra001') */
  var jsonParameter = {
      empno : '999999'
  };
  var header = [[
  	  '적용년월',
  	  '공제일자',
  	  '사원번호',
      '국민연금',
      '건강보험',
      '건강보험정산금액',
      '전년도건강보험정산금액',
      '고용보험',
      '고용보험정산금액',
      '전년도고용보험정산금액',
      '장기요양보험',
      '장기요양보험정산금액',
      '전년도장기요양보험정산금액',
      '산재보험'
  ]];
  var dataId = [[ 'applcYm','ddcDe', 'empno', 
	  'npnAmt','hlthinsAmt', 'hlthinsExcclcAmt', 'beyearHlthinsExcclcAmt',
	  'episAmt','episExcclcAmt','beyearEpisExcclcAmt','ltciAmt','ltciExcclcAmt','beyearLtciExcclcAmt','iaciAmt'
	  ]];
  var dataAlign = [[ 'center', 'center', 'center',
	  'center', 'center', 'center', 'center'
	  , 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
  var sheetNm = [[ titMpsins001 ]];
  var param = [[ $.param( jsonParameter ) ]];
  var fileNm = titMpsins001;
  jsonParameter = {
      headers : header,
      dataIds : dataId,
      dataAligns : dataAlign,
      sheetNms : sheetNm,
      fileNm : fileNm,
      params : param
  };
  gf_ExcelDown('mpsins001/excelMpsins001', jsonParameter);
};

//엑셀 데이터 확인
var fn_FileUploadBtnEvent = function(){
	
	$('#btnFileUpload1').unbind("click").bind("click",function(event){
	    /*
		*  startRowNum : 엑셀파일에서 잃어들일 첫번째 라인의 번호
		 * maxRowNum : 엑셀파일에서 잃어들일 최대 라인의 번호, 0,null 입력 시 99999 으로 설정 됨
		 * colTitle : 리턴받을 컬럼ID 지정, 엑셀 다운로드한 그리드의 ID = 그리드 생성에 사용된 컬럼 ID를 구분자 "|"로 구분하여 순서대로 입역
		 *    ex:) "workTyCode|workTyCodeNm|useAt|bassTyAt|calcPd|coreTimeApplcAt|attendConfirmAt|dayRecogWorktime"
		 * dhxGrid : 엑셀파일 업로드 결과를 보여줄 그리드 ID, 그리드 자체를 넘겨야 함
		 * strCallbackFunc : callback 함수 이름
		 ****** dhxGrid 또는 callback 중 하나는 입력 되어야 함
		 ****** 업로드 받은 결과의 정합성은 각 프로그램별로 검증 해야 함 : 컬럼 수가 요청한 컬럼수보다 많으면 무조건 업로드 처리 하므로 다른 파일이 업로드 되도 성공으로 처리 함
		 */
		var startRowNum = 2;
	    var maxRowNum = null;
	    var colTitle = "applcYm|ddcDe|empno|npnAmt|hlthinsAmt|hlthinsExcclcAmt|beyearHlthinsExcclcAmt|episAmt|episExcclcAmt|beyearEpisExcclcAmt" +
	    		"|ltciAmt|ltciExcclcAmt|beyearLtciExcclcAmt|iaciAmt";
	    //var dhxGrid = dhxGridMpscal016;
	    var strCallbackFunc = "fn_CallbackExcelUpload";
		gf_ExcelUpload (startRowNum, maxRowNum, colTitle, dhxGridMpsins001, strCallbackFunc);
	});
};
var fn_CallbackExcelUpload = function(data) {
	if(!gf_IsNull(data.data)){
		var str_req = "";
		for(var j=0; j<data.data.length; j++){
			var applcYm = data.data[j]["applcYm"];
			var ddcDe = data.data[j]["ddcDe"];
			var empno = data.data[j]["empno"];
			var npnAmt = data.data[j]["npnAmt"];
			var hlthinsAmt = data.data[j]["hlthinsAmt"];
			var hlthinsExcclcAmt = data.data[j]["hlthinsExcclcAmt"];
			var beyearHlthinsExcclcAmt = data.data[j]["beyearHlthinsExcclcAmt"];
			var episAmt = data.data[j]["episAmt"];
			var episExcclcAmt = data.data[j]["episExcclcAmt"];
			var beyearEpisExcclcAmt = data.data[j]["beyearEpisExcclcAmt"];
			var ltciAmt = data.data[j]["ltciAmt"];
			var ltciExcclcAmt = data.data[j]["ltciExcclcAmt"];
			var beyearLtciExcclcAmt = data.data[j]["beyearLtciExcclcAmt"];
			var iaciAmt = data.data[j]["iaciAmt"];
			
			str_req +=  applcYm+","+ddcDe+ ", " +empno+ ", " +npnAmt+ ", "+hlthinsAmt+", " +hlthinsExcclcAmt+ ", " 
			+beyearHlthinsExcclcAmt+ ", " +episAmt+", " +episExcclcAmt+", " +beyearEpisExcclcAmt+
			", " +ltciAmt+", " +ltciExcclcAmt+", " +beyearLtciExcclcAmt+", " +iaciAmt+"|";
		}
			var jsonParameter = {
					str_req : str_req
		    };

			var dataTest = gf_NoAsyncTransaction('mpsins001/checkDataMpsins001', jsonParameter, 'POST');
			//테스트처리
			if (dataTest.code == "000" || dataTest.data.code !== "000"){
                    gf_DivMsgAlert("성공하였습니다.");
                    dhxGridMpsins001.forEachRow(function (rId){
    		        	dhxDataProcessorMpsins001.setUpdated(rId, true, 'inserted');
    		    		state = dhxDataProcessorMpsins001.getState(rId);
    		        });
                    return true;
            } else {
                    gf_DivMsgAlert("실패하였습니다. <br/>액셀 양식을 확인해주세요. ");
                    
                    return false;
            }
	}
}
