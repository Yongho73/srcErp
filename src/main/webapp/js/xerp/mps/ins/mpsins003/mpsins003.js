/**
 *    프로그램       : 사회보험 자격취득 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.04
 *    사용테이블      : MPS_SLNRC_STMT
 * sourceGen version : 2020.07.16.01 (2020.08.04)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsins003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsins003 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsins003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsins003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsins003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsins003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsins003 = 0;  //그리드 삭제 수량 
var dhxGridMpsins003;  //그리드 객체
var eventIdMpsins003 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpsins003;  //DataProcessor 객체

var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var dhxCCalendarDate2; // 기간 달력(From ~ To)


/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpsins003();
    if(cf_SetComponentsMpsins003()){
       cf_SetEventListenerMpsins003();
       cf_InitFormMpsins003();
       cf_SetBindingMpsins003();
       if(init()){   // 초기화
      		init2();  // 기간달력 초기화
      	}
    }
});

function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#searchFormMpsins003 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    
	//기간달력 이벤트 추가
    $('#searchFormMpsins003 #date2').unbind('click').bind('click', function(event){
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
	//gf_SetDateIntervalRadio('stDate', 'edDate', '6');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormMpsins003', 'stDate', 'text'));
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormMpsins003', 'edDate', 'text'));	
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
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
var cf_InitParamMpsins003 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsins003").validate({ errorElement: 'div', ignore: '' });
    
    //재직구분
    gf_ComboCode('divComboHffsSeBox', 'hffsSe', 'hffsSe', 'search', 'C278', '' , '', '', 'asc', '');
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    $("#korNm").focus();
};

var cf_SetComponentsMpsins003 = function() {
    var dhxGridMpsins003HeaderInfo = [];
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('이름', '100', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('주민등록번호', '150', 'center', 'str', 'juminMaskro', false, 'ihidnum', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('입사일자', '150', 'center', 'str', 'ro', false, 'ecnyDe', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('퇴사일자', '150', 'center', 'str', 'ro', false, 'retireDe', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('취득정보', '150', 'center', 'date', 'dhxCalendarA', false, 'sttemntDe', '', '')); /* gf_LocaleTrans('default', 'titSttemntDe') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonA',false,'datePickerButtonA',''));
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100 ', 'center', 'str', 'ch', false, 'processAt', '', ''));
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('상실정보', '150', 'center', 'str', 'dhxCalendarA', false, 'lostSttemntDe', '', '')); /* gf_LocaleTrans('default', 'titLostSttemntDe') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','datePickerButtonB',false,'datePickerButtonB',''));
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100 ', 'center', 'str', 'ch', false, 'lostProcessAt', '', ''));
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('국민연금 여부', '100', 'center', 'str', 'ch', false, 'npnAt', '', '')); /* gf_LocaleTrans('default', 'titNpnAt') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('건강보험 여부', '100', 'center', 'str', 'ch', false, 'hlthinsAt', '', '')); /* gf_LocaleTrans('default', 'titHlthinsAt') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('고용보험 여부', '100', 'center', 'str', 'ch', false, 'episAt', '', '')); /* gf_LocaleTrans('default', 'titEpisAt') */
    dhxGridMpsins003HeaderInfo.push(gf_MakeDhxGridHeader('산재보험 여부', '100', 'center', 'str', 'ch', false, 'iaciAt', '', '')); /* gf_LocaleTrans('default', 'titIaciAt') */
    
    var attachHeaderArr = [];
    attachHeaderArr.push(["#rspan","#rspan","#rspan","#rspan","#rspan","#rspan", // No/ 사원 / 성명 / 주민등록번호 / 입사일자 / 퇴사일자     
    	"신고일자","#cspan","처리여부",// 취득정보 - 신고일자/달력 / 처리여부
    	"신고일자","#cspan","처리여부", // 상실정보 - 신고일자/달력 / 처리여부
    	"#rspan","#rspan","#rspan","#rspan"
    	]);  
    dhxGridMpsins003 = gf_MakeDhxGrid('dataListMpsins003', dhxGridMpsins003HeaderInfo, false, true, false , attachHeaderArr);
    dhxGridMpsins003.enableAutoWidth(false);
    dhxGridMpsins003.setEditable(true);
    //dhxGridMpsins003.enableEditEvents(true,false,false);
    dhxGridMpsins003.setDateFormat("%Y-%m-%d");

    dhxGridMpsins003.setColumnMinWidth(80,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};
var calendarEventIds = [];
var cf_SetEventListenerMpsins003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsins003 = gf_GridDetachEvent(dhxGridMpsins003, eventIdMpsins003);
    eventId = dhxGridMpsins003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsins003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsins003.getColumnsNum();
            var rowNum = dhxGridMpsins003.getRowsNum();
            var selectedId = dhxGridMpsins003.getSelectedRowId();
            var ind        = dhxGridMpsins003.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins003.getRowIndex(selectedId);
            var type       = dhxGridMpsins003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsins003.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsins003.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsins003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsins003.getSelectedRowId();
            var ind        = dhxGridMpsins003.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins003.getRowIndex(selectedId);
            var type       = dhxGridMpsins003.getColType(ind);
            dhxGridMpsins003.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsins003.getSelectedRowId();
            var ind        = dhxGridMpsins003.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsins003.getRowIndex(selectedId);
            var type       = dhxGridMpsins003.getColType(ind);
            dhxGridMpsins003.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsins003.editCell();
            }
        }
        else return true;
    });
    eventIdMpsins003.push(eventId);
    eventId = dhxGridMpsins003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsins003SortGridList(ind, type, direction); 
    });
    eventIdMpsins003.push(eventId);
    eventId = dhxGridMpsins003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsins003.push(eventId);
    eventId = dhxGridMpsins003.attachEvent("onRowSelect", function(rId,cInd){
    	
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpsins003, 'datePickerButtonA')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMpsins003, rId, 'sttemntDe', 'grid');	
    		var pos = dhxGridMpsins003.getPosition(this.cell);    		
    		dhxGridMpsins003._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpsins003._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpsins003._grid_calendarA.setDate(strGridDate);
    		dhxGridMpsins003._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpsins003._grid_calendarA, calendarEventIds);    		
    		eventId1 = dhxGridMpsins003._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateA( rId, dhxGridMpsins003._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId1);
    	}
   		if(cInd == gf_GetDhxGridColumId(dhxGridMpsins003, 'datePickerButtonB')) { // calendar    		
   			var strGridDate2 = gf_DhxGetValue(dhxGridMpsins003, rId, 'lostSttemntDe', 'grid');	
   			var pos = dhxGridMpsins003.getPosition(this.cell);    		
   			dhxGridMpsins003._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
   			dhxGridMpsins003._grid_calendarA.loadUserLanguage("ko");
   			dhxGridMpsins003._grid_calendarA.setDate(strGridDate2);
   			dhxGridMpsins003._grid_calendarA._show();    		
   			calendarEventIds = gf_GridDetachEvent(dhxGridMpsins003._grid_calendarA, calendarEventIds);    		
   			eventId1 = dhxGridMpsins003._grid_calendarA.attachEvent('onClick', function(date) { 
   				fn_gridPickerButtonSetDateB( rId, dhxGridMpsins003._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId1);    		
    	}
    });
    eventIdMpsins003.push(eventId);
    eventId = dhxGridMpsins003.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsins003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsins003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsins003()
    });
    $('#btnSaveMpsins003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        
        var sttemntDe = dhxGridMpsins003.cells(dhxGridMpsins003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins003,'sttemntDe')).getValue();
        var processAt = dhxGridMpsins003.cells(dhxGridMpsins003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins003,'processAt')).getValue();
        var lostSttemntDe = dhxGridMpsins003.cells(dhxGridMpsins003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins003,'lostSttemntDe')).getValue();
        var lostProcessAt = dhxGridMpsins003.cells(dhxGridMpsins003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins003,'lostProcessAt')).getValue();
        var npnAt = dhxGridMpsins003.cells(dhxGridMpsins003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins003,'npnAt')).getValue();
        var hlthinsAt = dhxGridMpsins003.cells(dhxGridMpsins003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins003,'hlthinsAt')).getValue();
        var episAt = dhxGridMpsins003.cells(dhxGridMpsins003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins003,'episAt')).getValue();
        var iaciAt = dhxGridMpsins003.cells(dhxGridMpsins003.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpsins003,'iaciAt')).getValue();
        if (gf_IsNull(sttemntDe)){
        	gf_DivMsgAlert("취득정보에 신고일자를 입력해주세요.");
        	return false;
        } else if(processAt == 1 && gf_IsNull(sttemntDe)){
        	gf_DivMsgAlert("취득정보에 신고일자를 입력해주세요.");
        	return false;
        } else if(lostProcessAt == 1 && gf_IsNull(lostSttemntDe)){
        	gf_DivMsgAlert("상실정보에 신고일자를 입력해주세요.");
        	return false;
        } else if(!gf_IsNull(lostSttemntDe) && gf_IsNull(sttemntDe)){
        	gf_DivMsgAlert("취득정보에 신고일자를 입력해주세요.");
        	return false;
        } else if(!gf_IsNull(lostSttemntDe) && processAt == 1) {
        	gf_DivMsgAlert("취득정보에 신고일자를 입력해주세요.");
        	return false;
        }
        fn_SaveMpsins003();
    });
    $('#btnRemoveMpsins003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsins003();
    });
    $('#btnExcelMpsins003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsins003();
    });
    $('#btnSearchMpsins003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsins003('');
    });
    $('#btnResetMpsins003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsins003();
    });
    // 기타 이벤트 ========================================================================================== 
    $('#checkAllMpsins003').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpsins003, $('#checkAllMpsins003').prop('checked'), 'chk');
    });
    $('#searchFormMpsins003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
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
        		$('#btnSearchMpsins003').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsins003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    
  //사원 선택 Popup
    $('#searchFormMpsins003 #btnempnoSearchSearchFormMpsins003').unbind('click').bind('click', function(event){
    	gf_EmpPopup("searchFormMpsins003","empno","korNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
  //사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins003', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpsins003', 'empno', '', 'text');
	    }
		
    });
};
var cf_InitFormMpsins003 = function() {
    $('#searchFormMpsins003').resetForm();
    gf_FormSetValue('searchFormMpsins003', 'hffsSe','J01', 'combo') //재직구분을 첫 화면 표시할때 '재직'으로 기본 설정
};

var cf_SetBindingMpsins003 = function() {
    fn_SearchMpsins003('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsins003 = function(userId) {
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpsins003', 'empno', 'text'),
        hffsSe : gf_FormGetValue('searchFormMpsins003', 'hffsSe', 'combo'), //재직구분
        stDate : gf_FormGetValue('searchFormMpsins003', 'stDate', 'text'),
        edDate : gf_FormGetValue('searchFormMpsins003', 'edDate', 'text')
    };
    gf_Transaction(userId, 'mpsins003/searchMpsins003', jsonParameter, 'fn_CallbackSearchMpsins003', false, 'GET');
};

var fn_CallbackSearchMpsins003 = function(strSvcID, targetID, data) {
    //dhxGridMpsins003.clearAll();
    dhxGridMpsins003.destructor();
    if(cf_SetComponentsMpsins003()){ 
        fn_DhxDataProcessorMpsins003(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsins003');
            dhxGridMpsins003.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mpsins003 == 0 && save_All_Sta_Mpsins003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsins003.selectRow(0); 
            } else if(save_Row_Sta_Mpsins003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsins003.selectRow(0);
            } else if(save_All_Sta_Mpsins003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsins003.selectRow(save_Row_Num_Mpsins003); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsins003.selectRow(save_Row_Num_Mpsins003);   //개발자 수정 필요  
                //var findCell = dhxGridMpsins003.findCell(save_Row_Ids_Mpsins003, gf_GetDhxGridColumId(dhxGridMpsins003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsins003.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsins003.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsins003');
        }
        $("#spanCntSearchFormMpsins003").text(data.data.records.length);
        cf_SetEventListenerMpsins003();
    } 
};
var fn_DhxDataProcessorMpsins003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsins003 = new dataProcessor(gv_ContextPath+'/mpsins003/saveMpsins003'); //lock feed url
    dhxDataProcessorMpsins003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsins003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsins003.init(dhxGridMpsins003); //link dataprocessor to the grid
    dhxDataProcessorMpsins003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsins003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsins003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    
                    //fn_SearchMpsins003();
                    $("#checkAllMpsins003").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsins003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsins003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsins003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsins003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsins003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsins003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsins003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsins003', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsins003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsins003.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsins003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsins003', 'sortColumId', '', 'text'); 
            dhxGridMpsins003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsins003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsins003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsins003', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsins003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsins003 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpsins003 = 0; 
    save_Edt_Cnt_Mpsins003 = 0; 
    save_Del_Cnt_Mpsins003 = 0; 
    dhxGridMpsins003.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpsins003.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpsins003.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpsins003 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpsins003 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpsins003 += 1; 
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
        save_All_Sta_Mpsins003 = 0; 
        if(save_Add_Cnt_Mpsins003 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsins003 + "건";
            save_All_Sta_Mpsins003 = 1; 
        } 
        if(save_Edt_Cnt_Mpsins003 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsins003 + "건"; 
        } 
        if(save_Del_Cnt_Mpsins003 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsins003 + "건"; 
            save_All_Sta_Mpsins003 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpsins003(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpsins003(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpsins003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsins003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsins003_Send = function() {
    if(fn_GridValidation(dhxGridMpsins003, dhxDataProcessorMpsins003)) {
        dhxDataProcessorMpsins003.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpsins003 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpsins003, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpsins003.forEachRow(function(rowId) {
            state = dhxDataProcessorMpsins003.getState(rowId);
            if(dhxGridMpsins003.cells(rowId, gf_GetDhxGridColumId(dhxGridMpsins003, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpsins003.getRowIndex(rowId);
                    dhxGridMpsins003.deleteRow(rowId);
                    dhxGridMpsins003.selectRow(rowNum);
                }
                else dhxDataProcessorMpsins003.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsins003 = function () {
    var titMpsins003 = '사회보험 자격취득'; /* gf_LocaleTrans('default', 'titMpsins003') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpsins003', 'empno', 'text'),
        hffsSe : gf_FormGetValue('searchFormMpsins003', 'hffsSe', 'combo') //재직구분
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '이름' /* gf_LocaleTrans('default', 'titEmpno') */,
        '주민등록번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '입사일자' /* gf_LocaleTrans('default', 'titEmpno') */,
        '퇴사일자' /* gf_LocaleTrans('default', 'titEmpno') */,
        '신고일자' /* gf_LocaleTrans('default', 'titSttemntDe') */,
        '처리 여부' /* gf_LocaleTrans('default', 'titProcessAt') */,
        '상실신고일자' /* gf_LocaleTrans('default', 'titLostSttemntDe') */,
        '상실처리여부' /* gf_LocaleTrans('default', 'titLostProcessAt') */,
        '국민연금 여부' /* gf_LocaleTrans('default', 'titNpnAt') */,
        '건강보험 여부' /* gf_LocaleTrans('default', 'titHlthinsAt') */,
        '고용보험 여부' /* gf_LocaleTrans('default', 'titEpisAt') */,
        '산재보험 여부' /* gf_LocaleTrans('default', 'titIaciAt') */
    ]];
    var dataId = [[ 'empno','korNm','ihidnum','ecnyDe','retireDe','sttemntDe','processAt','lostSttemntDe','LostProcessAt','npnAt','hlthinsAt','episAt','iaciAt']];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titMpsins003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsins003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsins003/excelMpsins003', jsonParameter);
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
    $('#saveFormMpsins003 #empnoSaveFormMpsins003').parent().append(
    '<div class="error" id="empnoSaveFormMpsins003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsins003 = function(empno){
    if(!gf_IsNull(empno)) {
        var jsonParameter = {
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mpsins003/findMpsins003', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno)) {
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
    var checkEmpno;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsins003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpsins003 = 0;
        save_Row_Ids_Mpsins003 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpsins003 = rowNum;
        save_Row_Ids_Mpsins003 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsins003 = rowNum;
        save_Row_Ids_Mpsins003 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'sttemntDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'sttemntDe');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsins003( checkEmpno )){
                            validFalseDuplicationKey = true;
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
        dhxGridMpsins003.selectRowById(validFalseFistRowId);
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

//달력아이콘 함수들
var eXcell_datePickerButtonA = function(cell){ //the eXcell name is defined here
if (cell){                // the default pattern, just copy it
    this.cell = cell;
    this.grid = this.cell.parentNode.grid;
}
this.edit = function(){}  //read-only cell doesn't have edit method
// the cell is read-only, so it's always in the disabled state
this.isDisabled = function(){ return true; }
this.setValue = function(val){
    this.setCValue("<div id=''></div><img alt='' src='/xerp/img/sub/icon_calen.png' style='cursor:pointer'>");                                      
}
}
eXcell_datePickerButtonA.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateA = function (rId, strDate) {
	if(!gf_IsNull(strDate)){
		gf_DhxSetValue(dhxGridMpsins003, rId, 'sttemntDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpsins003.setUpdated(rId, true, 'updated');
	}	
}
//달력아이콘 함수들
var eXcell_datePickerButtonB = function(cell){ //the eXcell name is defined here
if (cell){                // the default pattern, just copy it
    this.cell = cell;
    this.grid = this.cell.parentNode.grid;
}
this.edit = function(){}  //read-only cell doesn't have edit method
// the cell is read-only, so it's always in the disabled state
this.isDisabled = function(){ return true; }
this.setValue = function(val){
    this.setCValue("<div id=''></div><img alt='' src='/xerp/img/sub/icon_calen.png' style='cursor:pointer'>");                                      
}
}

eXcell_datePickerButtonB.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateB = function (rId, strDate) {
	if(!gf_IsNull(strDate)){	
		gf_DhxSetValue(dhxGridMpsins003, rId, 'lostSttemntDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpsins003.setUpdated(rId, true, 'updated');
	}	
}
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMpsins003', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpsins003', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormMpsins003', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMpsins003', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMpsins003","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpsins003', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpsins003', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpsins003', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpsins003', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpsins003', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpsins003', 'korNm', 'text');
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
	 		gf_FormSetValue('searchFormMpsins003', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpsins003', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMpsins003', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpsins003', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpsins003', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMpsins003', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpsins003","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpsins003","empno","korNm", gBplcCode, "Y");
	  	}
  	}
	
}


