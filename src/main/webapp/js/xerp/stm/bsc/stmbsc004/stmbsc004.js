/**
 *    프로그램       : 영업일(공휴일관리) 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.16
 *    사용테이블      : STM_CALENDER
 * sourceGen version : 2020.06.29.01 (2020.07.15)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmbsc004 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmbsc004 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmbsc004 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmbsc004 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmbsc004 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmbsc004 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmbsc004 = 0;  //그리드 삭제 수량 
var dhxGridStmbsc004;
var eventIdStmbsc004 = [];
var dhxDataProcessorStmbsc004;
 
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmbsc004();
    if(cf_SetComponentsStmbsc004()){
    	cf_SetEventListenerStmbsc004();
        cf_InitFormStmbsc004();
        cf_SetBindingStmbsc004();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmbsc004 = function() {
    gf_SetMenuPath();
    $("#saveFormStmbsc004").validate({ errorElement: 'div', ignore: '' });
    fn_Calendar();
};

var cf_SetComponentsStmbsc004 = function() {
    var dhxGridStmbsc004HeaderInfo = [];
    dhxGridStmbsc004HeaderInfo.push(gf_MakeDhxGridHeader('업무일자', '100', 'center', 'str', 'ro', false, 'jobDeDay', '', '')); /* gf_LocaleTrans('default', 'titJobDe') */
    dhxGridStmbsc004HeaderInfo.push(gf_MakeDhxGridHeader('요일', '100', 'center', 'str', 'ro', false, 'deSeNm', '', '')); /* gf_LocaleTrans('default', 'titDeSeCode') */
    dhxGridStmbsc004HeaderInfo.push(gf_MakeDhxGridHeader('공휴일여부', '100', 'center', 'str', 'ch', false, 'hvofAt', '', '')); /* gf_LocaleTrans('default', 'titHvofAt') */
    dhxGridStmbsc004HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'ed', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridStmbsc004HeaderInfo.push(gf_MakeDhxGridHeader('일자구분코드', '100', 'center', 'str', 'ro', true, 'deSeCode', '', '')); /* gf_LocaleTrans('default', 'titDeSeCode') */
    dhxGridStmbsc004HeaderInfo.push(gf_MakeDhxGridHeader('업무일자', '100', 'left', 'str', 'ro', true, 'jobDe', '', '')); /* gf_LocaleTrans('default', 'titJobDe') */
    dhxGridStmbsc004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '0', 'center', 'str', 'ro', true, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmbsc004 = gf_MakeDhxGrid('dataListStmbsc004', dhxGridStmbsc004HeaderInfo, true, false, false);
    dhxGridStmbsc004.enableAutoWidth(false);
    dhxGridStmbsc004.setEditable(true);

    dhxGridStmbsc004.setColumnMinWidth(50,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true;
};

var cf_SetEventListenerStmbsc004 = function() {
	// 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmbsc004 = gf_GridDetachEvent(dhxGridStmbsc004, eventIdStmbsc004);
    eventId = dhxGridStmbsc004.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmbsc004();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmbsc004.getColumnsNum();
            var rowNum = dhxGridStmbsc004.getRowsNum();
            var selectedId = dhxGridStmbsc004.getSelectedRowId();
            var ind        = dhxGridStmbsc004.getSelectedCellIndex();
            var rowIndex   = dhxGridStmbsc004.getRowIndex(selectedId);
            var type       = dhxGridStmbsc004.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmbsc004.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmbsc004.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmbsc004.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmbsc004.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmbsc004.getSelectedRowId();
            var ind        = dhxGridStmbsc004.getSelectedCellIndex();
            var rowIndex   = dhxGridStmbsc004.getRowIndex(selectedId);
            var type       = dhxGridStmbsc004.getColType(ind);
            dhxGridStmbsc004.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmbsc004.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmbsc004.getSelectedRowId();
            var ind        = dhxGridStmbsc004.getSelectedCellIndex();
            var rowIndex   = dhxGridStmbsc004.getRowIndex(selectedId);
            var type       = dhxGridStmbsc004.getColType(ind);
            dhxGridStmbsc004.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmbsc004.editCell();
            }
        }
        else return true;
    });
    eventIdStmbsc004.push(eventId);
    eventId = dhxGridStmbsc004.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmbsc004SortGridList(ind, type, direction); 
    });
    eventIdStmbsc004.push(eventId);
    eventId = dhxGridStmbsc004.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmbsc004.push(eventId);
    eventId = dhxGridStmbsc004.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdStmbsc004.push(eventId);
    eventId = dhxGridStmbsc004.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmbsc004.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveStmbsc004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowId = dhxGridStmbsc004.getSelectedRowId();
        dhxGridStmbsc004.selectRow(rowId-1);
        fn_SaveStmbsc004();
    });
    $('#btnResetDeStmbsc004').unbind('click').bind('click', function() {
    	var year = gf_FormGetValue('searchFormStmbsc004', 'calenderDt', 'text')
    	if(!gf_IsNull(year)) {
    		gf_DivMsgConfirm('해당년도의 휴일이 초기화 된 후 새로 생성됩니다.\n 생성하시겠습니까?', 'fn_ResetDeStmbsc004()', '');
    	} else {
    		gf_DivMsgAlert("기준일자를 입력해주세요.");
    	}
    });
    $('#btnSearchStmbsc004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmbsc004('');
    });
    $('#btnResetStmbsc004').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmbsc004();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormStmbsc004 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmbsc004').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmbsc004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormStmbsc004 = function() {
    $('#searchFormStmbsc004').resetForm();
    fn_Calendar();
};

var cf_SetBindingStmbsc004 = function() {
    fn_SearchStmbsc004('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmbsc004 = function(userId) {
    var jsonParameter = {
    	calenderDt : gf_FormGetValue('searchFormStmbsc004', 'calenderDt', 'text').replaceAll('-','')
    };
    gf_Transaction(userId, 'stmbsc004/searchStmbsc004', jsonParameter, 'fn_CallbackSearchStmbsc004', false, 'GET');
};

var fn_CallbackSearchStmbsc004 = function(strSvcID, targetID, data) {
    //dhxGridStmbsc004.clearAll();
    dhxGridStmbsc004.destructor();
    if(cf_SetComponentsStmbsc004()){ 
        fn_DhxDataProcessorStmbsc004(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmbsc004');
            dhxGridStmbsc004.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Stmbsc004 == 0 && save_All_Sta_Stmbsc004 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmbsc004.selectRow(0); 
            } else if(save_Row_Sta_Stmbsc004 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmbsc004.selectRow(0);
            } else if(save_All_Sta_Stmbsc004 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmbsc004.selectRow(save_Row_Num_Stmbsc004); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmbsc004.selectRow(save_Row_Num_Stmbsc004);   //개발자 수정 필요  
                //var findCell = dhxGridStmbsc004.findCell(save_Row_Ids_Stmbsc004, gf_GetDhxGridColumId(dhxGridStmbsc004,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmbsc004.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmbsc004.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmbsc004');
        }
        $("#spanCntSearchFormStmbsc004").text(data.data.records.length);
        cf_SetEventListenerStmbsc004();
    } 
    

    dhxGridStmbsc004.forEachRow(function(id){
    	
    	if( dhxGridStmbsc004.cells(id,dhxGridStmbsc004.getColIndexById("hvofAt")).getValue() =="1"){ 
			dhxGridStmbsc004.setCellTextStyle(id,0,"color:red;");				
			dhxGridStmbsc004.setCellTextStyle(id,1,"color:red;");						
		}
		if( dhxGridStmbsc004.cells(id,dhxGridStmbsc004.getColIndexById("deSeCode")).getValue() =="0"){
			dhxGridStmbsc004.setCellTextStyle(id,0,"color:red;");				
			dhxGridStmbsc004.setCellTextStyle(id,1,"color:red;");						
		}
		if( dhxGridStmbsc004.cells(id,dhxGridStmbsc004.getColIndexById("deSeCode")).getValue() =="6"){ 
			dhxGridStmbsc004.setCellTextStyle(id,0,"color:blue;");				
			dhxGridStmbsc004.setCellTextStyle(id,1,"color:blue;");		
		}
		
	});
};
var fn_DhxDataProcessorStmbsc004 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmbsc004 = new dataProcessor(gv_ContextPath+'/stmbsc004/saveStmbsc004'); //lock feed url
    dhxDataProcessorStmbsc004.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmbsc004.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmbsc004.init(dhxGridStmbsc004); //link dataprocessor to the grid
    dhxDataProcessorStmbsc004.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmbsc004.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmbsc004.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmbsc004();
                    $("#checkAllStmbsc004").prop('checked', false); //상단 체크박스 해제
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
var fn_AddStmbsc004 = function() {
    dhxGridStmbsc004.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //jobDe
    initValueArr.push(''); //deSeCode
    initValueArr.push(''); //hvofAt
    initValueArr.push(''); //rm
    dhxGridStmbsc004.addRow(dhxGridStmbsc004.uid(), initValueArr, 0);
    dhxGridStmbsc004.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmbsc004');
    $('#btnPopEmpSearchStmbsc004').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmbsc004SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmbsc004, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmbsc004', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmbsc004', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmbsc004, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmbsc004.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmbsc004', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmbsc004', 'sortColumId', gf_GetDhxGridColum(dhxGridStmbsc004, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmbsc004.setSortImgState(false); 
            gf_FormSetValue('searchFormStmbsc004', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmbsc004', 'sortColumId', '', 'text'); 
            dhxGridStmbsc004.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmbsc004.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmbsc004', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmbsc004', 'sortColumId', gf_GetDhxGridColum(dhxGridStmbsc004, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmbsc004 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmbsc004 = 0; 
    save_Edt_Cnt_Stmbsc004 = 0; 
    save_Del_Cnt_Stmbsc004 = 0; 
    dhxGridStmbsc004.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmbsc004.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmbsc004.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmbsc004 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmbsc004 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmbsc004 += 1; 
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
        save_All_Sta_Stmbsc004 = 0; 
        if(save_Add_Cnt_Stmbsc004 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmbsc004 + "건";
            save_All_Sta_Stmbsc004 = 1; 
        } 
        if(save_Edt_Cnt_Stmbsc004 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmbsc004 + "건"; 
        } 
        if(save_Del_Cnt_Stmbsc004 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmbsc004 + "건"; 
            save_All_Sta_Stmbsc004 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmbsc004(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmbsc004(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmbsc004 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmbsc004_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmbsc004_Send = function() {
    if(fn_GridValidation(dhxGridStmbsc004, dhxDataProcessorStmbsc004)) {
        dhxDataProcessorStmbsc004.sendData();
    }
}
/**
 * 공휴일 초기화
 */
var fn_ResetDeStmbsc004 = function() {
	var year = gf_FormGetValue('searchFormStmbsc004', 'calenderDt', 'text')
	year = year.substr(0,4)
    var jsonParameter = {
    	calenderDt : year,
    };
   
    gf_Transaction(jsonParameter, 'stmbsc004/resetDeStmbsc004', jsonParameter, 'fn_CallbackResetDeStmbsc004', false, 'POST');
};
var fn_CallbackResetDeStmbsc004 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        fn_SearchStmbsc004();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 년월 달력
 */
var fn_Calendar =  function(){
	//달력 생성  : jquery의 datepicker 사용
	//금일 날짜표시
	$('#calenderDtSearchFormStmbsc004').val(nowDate.substring(0,7));

    
    var currentYear = (new Date()).getFullYear()+5;
    var startYear = currentYear-10;

    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $('#calenderDtSearchFormStmbsc004').monthpicker(options);
}
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
			  alert("잘못된 날짜입니다. \n다시 입력하세요.");
			  objDate.val("");
			  objDate.focus();
			  return;
			}
		}
	}
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormStmbsc004 #jobDeSaveFormStmbsc004').parent().append(
    '<div class="error" id="jobDeSaveFormStmbsc004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmbsc004 = function(jobDe){
    if(!gf_IsNull(jobDe)) {
        var jsonParameter = {
            jobDe : jobDe
        };
        var dataSource = gf_NoAsyncTransaction('stmbsc004/findStmbsc004', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.jobDe)) {
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
    var checkJobDe;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmbsc004 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Stmbsc004 = 0;
        save_Row_Ids_Stmbsc004 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Stmbsc004 = rowNum;
        save_Row_Ids_Stmbsc004 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmbsc004 = rowNum;
        save_Row_Ids_Stmbsc004 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'jobDe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'jobDe');
                    valid = false;
                }
                if(valid && gf_DhxGetValue(dhxGridObjet, rowId, 'rm', 'grid').length > 200){
                	fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'rm');
                	gf_DivMsgAlert("200자 이내로 입력해주세요.");
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkJobDe = gf_DhxGetValue(dhxGridObjet, rowId, 'jobDe', 'grid');
                    if(!gf_IsNull(checkJobDe)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var jobDe = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'jobDe', 'grid');
                            if(((jobDe == checkJobDe)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'jobDe');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmbsc004( checkJobDe )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'jobDe');
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
        dhxGridStmbsc004.selectRowById(validFalseFistRowId);
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
//alert창
var fn_DivMsgConfirm2 = function(message, callback){
	
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}
	
	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button class='btn_confirm' id='btnYesConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackTrue== 'string' ? callBackTrue : '' ) +"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
		   + "<button class='btn_confirm' id='btnNoConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackFalse== 'string' ? callBackFalse : '' ) +"'><span class='glyphicon glyphicon-ban-circle'></span>&nbsp;취소</button></p>"
		   + "</div>"
		   + "</div>";
	$("#message").html(str);
	$("#content_notice .btn_cancel").focus();
	
	if(typeof callback == 'function') {
		$("#btnYesConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			gf_DivMsgAlertClose();
			callback(true);
	    });

		$("#btnNoConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			gf_DivMsgAlertClose();
			callback(false);
	    });
	}
};