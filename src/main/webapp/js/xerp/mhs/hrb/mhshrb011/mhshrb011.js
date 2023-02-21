/**
 *    프로그램       : 생일자현황조회 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2021.05.21
 *    사용테이블      : MHS_EMP
 * sourceGen version : 2021.02.18.01 (2021.05.21)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrb011 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrb011 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrb011 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrb011 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Row_Values_Mhshrb011 = "";  //그리드에서 저장하는 위치의 key 값, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrb011 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrb011 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrb011 = 0;  //그리드 삭제 수량 
var dhxGridMhshrb011;  //그리드 객체
var eventIdMhshrb011 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrb011;  //DataProcessor 객체
var gab1="";
var gab2="";
var gab3="";
var gab4="";
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrb011();
    if(cf_SetComponentsMhshrb011()){
       cf_SetEventListenerMhshrb011();
       cf_InitFormMhshrb011();
       cf_SetBindingMhshrb011();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrb011 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrb011").validate({ errorElement: 'div', ignore: '' });
	fn_Calender();
};

var cf_SetComponentsMhshrb011 = function() {
    var dhxGridMhshrb011HeaderInfo = [];
    dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
	dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '150', 'center', 'str', 'ro', false, 'empno', '', ''));    
	dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('이름', '150', 'center', 'str', 'ro', false, 'korNm', '', '')); 
    dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('부서', '200', 'center', 'str', 'ro', false, 'deptNm', '', '')); 
	dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('직위', '150', 'center', 'str', 'ro', false, 'ofcpsCodeNm', '', '')); 
    dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('생년월일', '200', 'center', 'str', 'ro', false, 'brthdy', '', '')); 
	dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('구분', '150', 'center', 'str', 'ro', false, 'slrcldAt', '', ''));
	dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('생일일자', '200', 'center', 'str', 'ro', false, 'nowbrthdy', '', ''));
    dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('나이', '*', 'center', 'str', 'ro', false, 'age', '', '')); 
    //dhxGridMhshrb011HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'center', 'str', 'ro', false, '', '', ''));
    dhxGridMhshrb011 = gf_MakeDhxGrid('dataListMhshrb011', dhxGridMhshrb011HeaderInfo, true, false, false);
    dhxGridMhshrb011.enableAutoWidth(false);
    dhxGridMhshrb011.setEditable(true);

    dhxGridMhshrb011.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrb011 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrb011 = gf_GridDetachEvent(dhxGridMhshrb011, eventIdMhshrb011);
    eventId = dhxGridMhshrb011.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrb011();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrb011.getColumnsNum();
            var rowNum = dhxGridMhshrb011.getRowsNum();
            var selectedId = dhxGridMhshrb011.getSelectedRowId();
            var ind        = dhxGridMhshrb011.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb011.getRowIndex(selectedId);
            var type       = dhxGridMhshrb011.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrb011.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrb011.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrb011.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb011.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrb011.getSelectedRowId();
            var ind        = dhxGridMhshrb011.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb011.getRowIndex(selectedId);
            var type       = dhxGridMhshrb011.getColType(ind);
            dhxGridMhshrb011.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb011.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrb011.getSelectedRowId();
            var ind        = dhxGridMhshrb011.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrb011.getRowIndex(selectedId);
            var type       = dhxGridMhshrb011.getColType(ind);
            dhxGridMhshrb011.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrb011.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrb011.push(eventId);
    eventId = dhxGridMhshrb011.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrb011SortGridList(ind, type, direction); 
    });
    eventIdMhshrb011.push(eventId);
    eventId = dhxGridMhshrb011.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrb011.push(eventId);
    eventId = dhxGridMhshrb011.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMhshrb011.push(eventId);
    eventId = dhxGridMhshrb011.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdMhshrb011.push(eventId);

	//사원팝업
	$('#btnSearchEmpCode').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhshrb011","searchEmpCodeMhshrb011","searchEmpNmMhshrb011",'', "Y", "fn_SearchMhsEmpEmpCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#searchEmpCodeMhshrb011').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrb011', 'searchEmpCodeNm', '', 'text');
		}
    });
	$('#searchEmpNmMhshrb011').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrb011', 'searchEmpNo', '', 'text');
		}		
    });
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrb011').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrb011()
    });
    $('#btnSaveMhshrb011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrb011();
    });
    $('#btnRemoveMhshrb011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrb011();
    });
    $('#btnExcelMhshrb011').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrb011();
    });
    $('#btnSearchMhshrb011').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrb011('');
    });
    $('#btnResetMhshrb011').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrb011();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhshrb011 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrb011').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrb011').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
	 //검색 달력
    $('#searchFormMhshrb011 .input_calen').unbind('click').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#searchFormMhshrb011 #searchBirthTime').unbind('click').bind('click', function(event){
    	searchBirthTimeCalender.show();
    });
    $('#saveFormMhshrb011 .input_calen').unbind('click').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
	$('#searchFormMhshrb011 #searchBirthBeginTimeMhshrb011').unbind('change blur').bind('change blur', function(event){
    	var day1 = gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text');
    	var day2 = gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTime', 'text');
           gab1 =day1.substring(0,4);
			gab2 =day2.substring(0,4);
    	/*if(day1 > day2){
    		gf_FormSetValue("searchFormMhshrb011", "searchBirthBeginTime", '' , 'text');
    		gf_FormSetValue("searchFormMhshrb011", "searchBirthEndTime", '' , 'text');
    
    		searchBirthTimeCalender.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text'));
    		searchBirthTimeCalender.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBsrpEdt', 'text'));	
    		gf_DivMsgAlert("시작일자가 종료일자보다 큽니다.");
    	} */
			
    });
    $('#searchFormMhshrb011 #searchBirthEndTimeMhshrb011').unbind('change blur').bind('change blur', function(event){
       	var day1 = gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text');
    	var day2 = gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTime', 'text');
           gab1 =day1.substring(0,4);
			gab2 =day2.substring(0,4);

    	/*if(day1 > day2){
    		gf_FormSetValue("searchFormMhshrb011", "searchBirthBeginTime", '' , 'text');
    		gf_FormSetValue("searchFormMhshrb011", "searchBirthEndTime", '' , 'text');
 
    		searchBirthTimeCalender.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text'));
    		searchBirthTimeCalender.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTime', 'text'));	
    		gf_DivMsgAlert("시작일자가 종료일자보다 큽니다.");
    	} */
			
    });
};
//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMhshrb011', 'searchEmpNo', 'text'),
		    korNm : gf_FormGetValue('searchFormMhshrb011', 'searchEmpCodeNm', 'text')
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMhshrb011', 'searchEmpNo', data.empno, 'text');
 		gf_FormSetValue('searchFormMhshrb011', 'searchEmpCodeNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormMhshrb011","searchEmpCodeMhshrb011","searchEmpNmMhshrb011", '' , "Y", null);
  	}
}
var cf_InitFormMhshrb011 = function() {
    $('#searchFormMhshrb011').resetForm();

	$('input[name=searchBirthBeginTime]').val( (new Date()).format('YYYY-MM-01'));
	$('input[name=searchBirthEndTime]').val( (new Date()).format('YYYY-MM-31'));

	searchBirthTimeCalender.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text'));
	searchBirthTimeCalender.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTime', 'text'));	
	
	if("PUBMNG000" == gv_SecondLvlMenuId){
		gf_FormSetValue("searchFormMhshrb011", "searchEmpNo", userEmpno , '');
		gf_FormSetValue("searchFormMhshrb011", "searchEmpCodeNm", userKornm , '');
	}
    gf_SetDataAuthorSe();
};

var cf_SetBindingMhshrb011 = function() {
    fn_SearchMhshrb011('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 달력 생성
 */
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="searchBirthTime_cal" || e.target.id =="searchBirthBeginTimeMhshrb011" || e.target.id =="searchBirthEndTimeMhshrb011") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchBirthTimeCalender.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
//기간 달력
var fn_Calender = function(){
	//신청일자 검색 달력 생성
	searchBirthTimeCalender = new dhtmlXDoubleCalendar("searchBirthTime_cal");
	searchBirthTimeCalender.attachEvent("onClick" , function(side , date){
		//alert(side + " + " + date);
        if(side == "right"){
        	searchBirthTimeCalender.hide();
        }
        $('#searchBirthBeginTimeMhshrb011').val(dateFormat(searchBirthTimeCalender.leftCalendar.getDate()));
        $('#searchBirthEndTimeMhshrb011').val(dateFormat(searchBirthTimeCalender.rightCalendar.getDate()));
	});
	//금일 날짜표시
	gf_SetDateIntervalRadio('searchBirthBeginTimeMhshrb011', 'searchBirthEndTimeMhshrb011', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전

	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchBirthTimeCalender.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTimeMhshrb011', 'text'));
	searchBirthTimeCalender.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTimeMhshrb011', 'text'));	
	searchBirthTimeCalender.leftCalendar.loadUserLanguage("ko"); 
	searchBirthTimeCalender.rightCalendar.loadUserLanguage("ko");

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
/**
 * 조회
 */
var fn_SearchMhshrb011 = function(userId) {
	var day1 = gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text');
    var day2 = gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTime', 'text');
	
	var datec1 = new Date(day1);
	var datec2 = new Date(day2);
	if (gab1 != gab2){
			alert("같은 연도로 조회가능합니다.");
			$('#searchFormMhshrb011').resetForm();
			return false;
	} else if(datec1 > datec2){
    		gf_FormSetValue("searchFormMhshrb011", "searchBirthBeginTime", '' , 'text');
    		gf_FormSetValue("searchFormMhshrb011", "searchBirthEndTime", '' , 'text');
 
    		//searchBirthTimeCalender.leftCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text'));
    		//searchBirthTimeCalender.rightCalendar.setDate(gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTime', 'text'));	
    		gf_DivMsgAlert("시작일자가 종료일자보다 큽니다.");
			//$('#searchFormMhshrb011').resetForm();
			return false;
    } else if(day1 == '' && day2 ==''){
			$('#searchFormMhshrb011').resetForm();

			$('input[name=searchBirthBeginTime]').val( (new Date()).format('YYYY-MM-01'));
			$('input[name=searchBirthEndTime]').val( (new Date()).format('YYYY-MM-31'));
	}
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMhshrb011', 'searchEmpNo', 'text'),
		empNm : gf_FormGetValue('searchFormMhshrb011', 'searchEmpCodeNm', 'text'),
		beginTime : gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text'),
		endTime : gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTime', 'text')
    };
    gf_Transaction(userId, 'mhshrb011/searchMhshrb011', jsonParameter, 'fn_CallbackSearchMhshrb011', false, 'GET');
};

var fn_CallbackSearchMhshrb011 = function(strSvcID, targetID, data) {
    //dhxGridMhshrb011.clearAll();
    dhxGridMhshrb011.destructor();
    if(cf_SetComponentsMhshrb011()){ 
        fn_DhxDataProcessorMhshrb011(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrb011');
            dhxGridMhshrb011.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrb011 == 0 && save_All_Sta_Mhshrb011 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrb011.selectRow(0); 
            } else if(save_Row_Sta_Mhshrb011 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrb011.selectRow(0);
            } else if(save_All_Sta_Mhshrb011 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrb011.selectRow(save_Row_Num_Mhshrb011); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrb011.selectRow(save_Row_Num_Mhshrb011);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrb011.findCell(save_Row_Values_Mhshrb011, gf_GetDhxGridColumId(dhxGridMhshrb011,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrb011.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrb011.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrb011');
        }
        $("#spanCntSearchFormMhshrb011").text(data.data.records.length);
        cf_SetEventListenerMhshrb011();
    } 
};
var fn_DhxDataProcessorMhshrb011 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrb011 = new dataProcessor(gv_ContextPath+'/mhshrb011/saveMhshrb011'); //lock feed url
    dhxDataProcessorMhshrb011.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrb011.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrb011.init(dhxGridMhshrb011); //link dataprocessor to the grid
    dhxDataProcessorMhshrb011.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrb011.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrb011.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrb011();
                    $("#checkAllMhshrb011").prop('checked', false); //상단 체크박스 해제
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
var fn_Mhshrb011SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrb011, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrb011', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrb011', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrb011, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrb011.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrb011', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrb011', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrb011, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrb011.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrb011', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrb011', 'sortColumId', '', 'text'); 
            dhxGridMhshrb011.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrb011.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrb011', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrb011', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrb011, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrb011 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrb011 = 0; 
    save_Edt_Cnt_Mhshrb011 = 0; 
    save_Del_Cnt_Mhshrb011 = 0; 
    dhxGridMhshrb011.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrb011.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrb011.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrb011 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrb011 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrb011 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        if(fn_GridValidation(dhxGridMhshrb011, dhxDataProcessorMhshrb011)) {
            var confirmMsg  = ""; 
            var confirmMsg1 = ""; 
            var confirmMsg2 = ""; 
            var confirmMsg3 = ""; 
            save_All_Sta_Mhshrb011 = 0; 
            if(save_Add_Cnt_Mhshrb011 > 0){
                confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrb011 + "건";
                save_All_Sta_Mhshrb011 = 1; 
            } 
            if(save_Edt_Cnt_Mhshrb011 > 0){ 
                confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrb011 + "건"; 
            } 
            if(save_Del_Cnt_Mhshrb011 > 0){ 
                confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrb011 + "건"; 
                save_All_Sta_Mhshrb011 = 1; 
            } 
            if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
                confirmMsg1 = confirmMsg1 + ", ";
            }
            if(confirmMsg2 != "" && confirmMsg3 != ""){
                confirmMsg2 = confirmMsg2 + ", ";
            }
            confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
            
            //if(confirmModalMhshrb011(gv_QueSave)){  //여기는 안옴 
            if(confirmModalMhshrb011(confirmMsg)){  //여기는 안옴 
            } else { 
                return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
            } 
        } 
    }
}
var confirmModalMhshrb011 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrb011_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrb011_Send = function() {
    //if(fn_GridValidation(dhxGridMhshrb011, dhxDataProcessorMhshrb011)) {
        dhxDataProcessorMhshrb011.sendData();
    //}
}

/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrb011 = function () {
    var titMhshrb011 = '생일자현황조회'; /* gf_LocaleTrans('default', 'titMhshrb011') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMhshrb011', 'searchEmpNo', 'text'),
		empNm : gf_FormGetValue('searchFormMhshrb011', 'searchEmpCodeNm', 'text'),
		beginTime : gf_FormGetValue('searchFormMhshrb011', 'searchBirthBeginTime', 'text'),
		endTime : gf_FormGetValue('searchFormMhshrb011', 'searchBirthEndTime', 'text')
    };
    var header = [[
        '사원번호',
        '이름',
        '부서',
		'직위',
        '생년월일',
		'구분',
		'생일일자',
        '나이'
        //'비고'
    ]];
    var dataId = [[ 'empno', 'korNm', 'deptNm','ofcpsCodeNm','brthdy','slrcldAt','nowbrthdy','age' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titMhshrb011 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrb011;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrb011/excelMhshrb011', jsonParameter);
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
    $('#saveFormMhshrb011 #empnoSaveFormMhshrb011').parent().append(
    '<div class="error" id="empnoSaveFormMhshrb011-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrb011 = function(empno){
    if(!gf_IsNull(empno)) {
        var jsonParameter = {
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mhshrb011/findMhshrb011', jsonParameter, 'GET');
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
    save_Row_Sta_Mhshrb011 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrb011 = 0;
        save_Row_Ids_Mhshrb011 = "";
        save_Row_Values_Mhshrb011 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrb011 = rowNum;
        save_Row_Ids_Mhshrb011 = "";  
        save_Row_Values_Mhshrb011 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrb011 = rowNum;
        save_Row_Ids_Mhshrb011 = rowIds; 
        save_Row_Values_Mhshrb011 = "";    //개발자 수정 필요 gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
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
                        if(!fn_CheckDupMhshrb011( checkEmpno )){
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
        dhxGridMhshrb011.selectRowById(validFalseFistRowId);
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
