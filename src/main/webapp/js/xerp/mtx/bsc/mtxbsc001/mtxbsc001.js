/**
 *    프로그램       : 소득세율관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.03
 *    사용테이블      : MFS_RATE_MGRT
 * sourceGen version : 2020.06.29.01 (2020.07.03)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mtxbsc001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mtxbsc001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mtxbsc001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mtxbsc001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mtxbsc001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mtxbsc001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mtxbsc001 = 0;  //그리드 삭제 수량 
var dhxComboapplcYy; // 년도 combo
var nowDate = "";

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMtxbsc001();
    cf_SetComponentsMtxbsc001();
    cf_SetEventListenerMtxbsc001();
    cf_InitFormMtxbsc001();
    cf_SetBindingMtxbsc001();
    init4();  // 년  달력 초기화
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMtxbsc001 = function() {
    gf_SetMenuPath();
    $("#saveFormMtxbsc001").validate({ errorElement: 'div', ignore: '' });
};

var dhxGridMtxbsc001;
var cf_SetComponentsMtxbsc001 = function() {
	var dhxGridMtxbsc001HeaderInfo = [];
    dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', ''));
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMtxbsc001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('적용연도', '100', 'center', 'str', 'edn', false, 'applcYy', '', '')); /* gf_LocaleTrans('default','titApplcYy')*/
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('거주 구분', '300', 'center', 'str', 'coro', false, 'liveSeCode', '', '')); /* gf_LocaleTrans('default','titLiveSeCode')*/
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('소득 구분', '300', 'center', 'str', 'coro', false, 'incomeSeCode', '', '')); /* gf_LocaleTrans('default','titIncomeSeCode')*/
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('소득 명', '0','center', 'str', 'edn', true, 'incomeNm', '', '')); /*gf_LocaleTrans('default', 'titIncomeNm') */
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('필요 경비율(%)', '250', 'right', 'int', 'edn', false, 'needExpensAmt', '', '')); /* gf_LocaleTrans('default', 'titNeedExpensAmt')*/
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('소득 세율(%)', '250', 'right', 'str', 'edn', false, 'incomeRate', '', '')); /* gf_LocaleTrans('default', 'titIncomeRate')*/
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('사용 여부', '100', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
	dhxGridMtxbsc001HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'edn', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
	dhxGridMtxbsc001 = gf_MakeDhxGrid('dataListMtxbsc001', dhxGridMtxbsc001HeaderInfo, true, false, false);
    dhxGridMtxbsc001.enableAutoWidth(false);
    dhxGridMtxbsc001.setEditable(true);

    dhxGridMtxbsc001.setColumnMinWidth(100,9); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    dhxGridMtxbsc001.enableEditEvents(true, false, false); // 원클릭, 더블클릭, F2key
	dhxGridMtxbsc001.enableAutoWidth(true);

	// gf_MakeComboBasic('divComboliveSeCodeSearchFormMtxbsc001',
	// 'detailComboliveSeCode', 'search', '', 'C054', '', '', 'asc', '');
	gf_ComboCode('divComboliveSeCodeSearchFormMtxbsc001', 'detailComboliveSeCode', 'detailComboliveSeCode', 'search', 'C054', '', '', '', 'odr', '');

	gf_ComboCode('divComboincomeSeCodeSearchFormMtxbsc001', 'detailComboincomeSeCode', 'detailComboincomeSeCode', 'search', 'C031', '', '', '', 'odr', '');

	// 입력방식
	var jsonParameter = {
		codekindCode : "C031",
		exceptCode : "",
		sortOrder : "ordr"
	};
	var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
	gf_ComboDataSet(dhxGridMtxbsc001, dhxGridMtxbsc001.getColIndexById("liveSeCode"), dataSource.data); /* 그리드콤보 */
	
	// 입력방식
	var jsonParameter = {
		codekindCode : "C054",
		exceptCode : "",
		sortOrder : "ordr"
	};
	var incomeSeCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
	gf_ComboDataSet(dhxGridMtxbsc001, dhxGridMtxbsc001.getColIndexById("incomeSeCode"), incomeSeCodedataSource.data); /* 그리드콤보 */
	
};

var eventIdMtxbsc001 = [];
var cf_SetEventListenerMtxbsc001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMtxbsc001 = gf_GridDetachEvent(dhxGridMtxbsc001, eventIdMtxbsc001);
    eventId = dhxGridMtxbsc001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMtxbsc001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMtxbsc001.getColumnsNum();
            var rowNum = dhxGridMtxbsc001.getRowsNum();
            var selectedId = dhxGridMtxbsc001.getSelectedRowId();
            var ind        = dhxGridMtxbsc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxbsc001.getRowIndex(selectedId);
            var type       = dhxGridMtxbsc001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMtxbsc001.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMtxbsc001.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMtxbsc001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxbsc001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMtxbsc001.getSelectedRowId();
            var ind        = dhxGridMtxbsc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxbsc001.getRowIndex(selectedId);
            var type       = dhxGridMtxbsc001.getColType(ind);
            dhxGridMtxbsc001.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxbsc001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMtxbsc001.getSelectedRowId();
            var ind        = dhxGridMtxbsc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMtxbsc001.getRowIndex(selectedId);
            var type       = dhxGridMtxbsc001.getColType(ind);
            dhxGridMtxbsc001.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMtxbsc001.editCell();
            }
        }
        else return true;
    });
    eventIdMtxbsc001.push(eventId);
    eventId = dhxGridMtxbsc001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mtxbsc001SortGridList(ind, type, direction); 
    });
    eventIdMtxbsc001.push(eventId);
    eventId = dhxGridMtxbsc001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMtxbsc001.push(eventId);
    eventId = dhxGridMtxbsc001.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMtxbsc001.push(eventId);
    eventId = dhxGridMtxbsc001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMtxbsc001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMtxbsc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMtxbsc001()
    });
    $('#btnSaveMtxbsc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMtxbsc001();
    });
    $('#btnRemoveMtxbsc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMtxbsc001();
    });
    $('#btnExcelMtxbsc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMtxbsc001();
    });
    $('#btnSearchMtxbsc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMtxbsc001('');
    });
    $('#btnResetMtxbsc001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMtxbsc001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMtxbsc001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMtxbsc001, $('#checkAllMtxbsc001').prop('checked'), 'chk');
    });
    $('#searchFormMtxbsc001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMtxbsc001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMtxbsc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    
    // 데이터 카피
	$('#btnCopy').unbind('click').bind('click', function() {
		var comboapplcYyVal = gf_FormGetValue('searchFormMtxbsc001', 'applcYy', 'text');
		
		// 현재 년도 가져오기 
		//var nowYear = gv_ComYear;
		
		if (comboapplcYyVal == null || comboapplcYyVal == "") {
			gf_DivMsgAlert("기준년도를 선택해 주세요");
			return false;
		} else {
			gf_DivMsgConfirm(comboapplcYyVal + "기준으로 다음년도로 데이터를 <br/>복사하시겠습니까?<br/>등록되어있는 데이터는 삭제 됩니다.", 'fn_CopyData()', '');
		}

	});
};


var cf_InitFormMtxbsc001 = function() {
    $('#searchFormMtxbsc001').resetForm();
};

var cf_SetBindingMtxbsc001 = function() {
    fn_SearchMtxbsc001('');
};

function init4(){
	//달력 생성  : yearpicker 사용
	//금일 날짜표시
	var today = new Date();
	nowDate = dateFormat(today);
	$('#applcYySearchFormMtxbsc001').val(nowDate.substring(0,4));
	$('#applcYySearchFormMtxbsc0011').val(nowDate.substring(0,4));

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#applcYySearchFormMtxbsc001').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
    
    $('#applcYySearchFormMtxbsc0011').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
}

/********************************************************************/

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
var cf_InitParamMtxbsc001 = function() {
    gf_SetMenuPath();
    $("#saveFormMtxbsc001").validate({ errorElement: 'div', ignore: '' });
};

/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMtxbsc001 = function(userId) {
	var comboapplcYyVal = gf_FormGetValue('searchFormMtxbsc001', 'applcYy', 'text');
	if (comboapplcYyVal == null || comboapplcYyVal == "") {
		applcYy = gv_ComYear;
	} else {
		applcYy = comboapplcYyVal;
	}
	
    var jsonParameter = {
        applcYy : applcYy,
        incomeSeCode : gf_FormGetValue('searchFormMtxbsc001', 'incomeSeCode', 'text'),
        liveSeCode : gf_FormGetValue('searchFormMtxbsc001', 'liveSeCode', 'text')
    };
    gf_Transaction(userId, 'mtxbsc001/searchMtxbsc001', jsonParameter, 'fn_CallbackSearchMtxbsc001', false, 'GET');
};

var dhxDataProcessorMtxbsc001;
var fn_CallbackSearchMtxbsc001 = function(strSvcID, targetID, data) {
    dhxGridMtxbsc001.clearAll();
    fn_DhxDataProcessorMtxbsc001(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMtxbsc001');
        dhxGridMtxbsc001.parse(data.data.records, 'js');
 
        if(save_Row_Ids_Mtxbsc001 == 0 && save_All_Sta_Mtxbsc001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMtxbsc001.selectRow(0); 
        } else if(save_Row_Sta_Mtxbsc001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMtxbsc001.selectRow(0);
        } else if(save_All_Sta_Mtxbsc001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMtxbsc001.selectRow(save_Row_Num_Mtxbsc001); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMtxbsc001.selectRow(save_Row_Num_Mtxbsc001);   //개발자 수정 필요  
            //var findCell = dhxGridMtxbsc001.findCell(save_Row_Ids_Mtxbsc001, gf_GetDhxGridColumId(dhxGridMtxbsc001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMtxbsc001.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMtxbsc001.selectRow(0);
            //} 
        } 
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListMtxbsc001');
    }
    $("#spanCntSearchFormMtxbsc001").text(data.data.records.length);
    cf_SetEventListenerMtxbsc001();
};
var fn_DhxDataProcessorMtxbsc001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMtxbsc001 = new dataProcessor(gv_ContextPath+'/mtxbsc001/saveMtxbsc001'); //lock feed url
    dhxDataProcessorMtxbsc001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMtxbsc001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMtxbsc001.init(dhxGridMtxbsc001); //link dataprocessor to the grid
    dhxDataProcessorMtxbsc001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMtxbsc001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMtxbsc001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMtxbsc001();
                    $("#checkAllMtxbsc001").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMtxbsc001 = function() {
    dhxGridMtxbsc001.clearSelection();
    var curDate = gv_ComYear;
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(curDate); //applcYy
    initValueArr.push(''); //incomeSeCode
    initValueArr.push(''); //liveSeCode
    initValueArr.push(''); //incomeNm
    initValueArr.push(''); //needExpensAmt
    initValueArr.push(''); //incomeRate
    initValueArr.push(''); //useAt
    initValueArr.push(''); //rm
    dhxGridMtxbsc001.addRow(dhxGridMtxbsc001.uid(), initValueArr, 0);
    dhxGridMtxbsc001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMtxbsc001');
    $('#btnPopEmpSearchMtxbsc001').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mtxbsc001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMtxbsc001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMtxbsc001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMtxbsc001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMtxbsc001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMtxbsc001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMtxbsc001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMtxbsc001', 'sortColumId', gf_GetDhxGridColum(dhxGridMtxbsc001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMtxbsc001.setSortImgState(false); 
            gf_FormSetValue('searchFormMtxbsc001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMtxbsc001', 'sortColumId', '', 'text'); 
            dhxGridMtxbsc001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMtxbsc001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMtxbsc001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMtxbsc001', 'sortColumId', gf_GetDhxGridColum(dhxGridMtxbsc001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMtxbsc001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mtxbsc001 = 0; 
    save_Edt_Cnt_Mtxbsc001 = 0; 
    save_Del_Cnt_Mtxbsc001 = 0; 
    dhxGridMtxbsc001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMtxbsc001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMtxbsc001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mtxbsc001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mtxbsc001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mtxbsc001 += 1; 
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
        save_All_Sta_Mtxbsc001 = 0; 
        if(save_Add_Cnt_Mtxbsc001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mtxbsc001 + "건";
            save_All_Sta_Mtxbsc001 = 1; 
        } 
        if(save_Edt_Cnt_Mtxbsc001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mtxbsc001 + "건"; 
        } 
        if(save_Del_Cnt_Mtxbsc001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mtxbsc001 + "건"; 
            save_All_Sta_Mtxbsc001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMtxbsc001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMtxbsc001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMtxbsc001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMtxbsc001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMtxbsc001_Send = function() {
    if(fn_GridValidation(dhxGridMtxbsc001, dhxDataProcessorMtxbsc001)) {
        dhxDataProcessorMtxbsc001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMtxbsc001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMtxbsc001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMtxbsc001.forEachRow(function(rowId) {
            state = dhxDataProcessorMtxbsc001.getState(rowId);
            if(dhxGridMtxbsc001.cells(rowId, gf_GetDhxGridColumId(dhxGridMtxbsc001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMtxbsc001.getRowIndex(rowId);
                    dhxGridMtxbsc001.deleteRow(rowId);
                    dhxGridMtxbsc001.selectRow(rowNum);
                }
                else dhxDataProcessorMtxbsc001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMtxbsc001 = function () {
    var titMtxbsc001 = '소득세율관리'; /* gf_LocaleTrans('default', 'titMtxbsc001') */
    var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMtxbsc001', 'applcYy', 'text'),
        incomeSeCode : gf_FormGetValue('searchFormMtxbsc001', 'incomeSeCode', 'text'),
        liveSeCode : gf_FormGetValue('searchFormMtxbsc001', 'liveSeCode', 'text')
    };
    var header = [[
        '적용연도' /* gf_LocaleTrans('default', 'titApplcYy') */,
        '소득구분코드' /* gf_LocaleTrans('default', 'titIncomeSeCode') */,
        '거주 구분 코드' /* gf_LocaleTrans('default', 'titLiveSeCode') */,
        '소득 명' /* gf_LocaleTrans('default', 'titIncomeNm') */,
        '필요 경비 금액' /* gf_LocaleTrans('default', 'titNeedExpensAmt') */,
        '소득 세율' /* gf_LocaleTrans('default', 'titIncomeRate') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */
    ]];
    var dataId = [[ 'applcYy', 'incomeSeCode', 'liveSeCode', 'incomeNm', 'needExpensAmt', 'incomeRate', 'useAt', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMtxbsc001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMtxbsc001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mtxbsc001/excelMtxbsc001', jsonParameter);
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
    $('#saveFormMtxbsc001 #applcYySaveFormMtxbsc001').parent().append(
    '<div class="error" id="applcYySaveFormMtxbsc001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMtxbsc001 #incomeSeCodeSaveFormMtxbsc001').parent().append(
    '<div class="error" id="incomeSeCodeSaveFormMtxbsc001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMtxbsc001 #liveSeCodeSaveFormMtxbsc001').parent().append(
    '<div class="error" id="liveSeCodeSaveFormMtxbsc001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMtxbsc001 = function(applcYy, incomeSeCode, liveSeCode){
    if(!gf_IsNull(applcYy) && !gf_IsNull(incomeSeCode) && !gf_IsNull(liveSeCode)) {
        var jsonParameter = {
            applcYy : applcYy,
            incomeSeCode : incomeSeCode,
            liveSeCode : liveSeCode
        };
        var dataSource = gf_NoAsyncTransaction('mtxbsc001/findMtxbsc001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYy) && gf_IsNull(data.incomeSeCode) && gf_IsNull(data.liveSeCode)) {
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
    var checkIncomeSeCode;
    var checkLiveSeCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mtxbsc001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mtxbsc001 = 0;
        save_Row_Ids_Mtxbsc001 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mtxbsc001 = rowNum;
        save_Row_Ids_Mtxbsc001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mtxbsc001 = rowNum;
        save_Row_Ids_Mtxbsc001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'incomeSeCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'incomeSeCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'liveSeCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'liveSeCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'incomeSeCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'incomeSeCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'needExpensAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'needExpensAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'incomeRate', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'incomeRate');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkApplcYy = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYy', 'grid');
                    checkIncomeSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'incomeSeCode', 'grid');
                    checkLiveSeCode = gf_DhxGetValue(dhxGridObjet, rowId, 'liveSeCode', 'grid');
                    if(!gf_IsNull(checkApplcYy, checkIncomeSeCode, checkLiveSeCode)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYy = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYy', 'grid');
                            var incomeSeCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'incomeSeCode', 'grid');
                            var liveSeCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'liveSeCode', 'grid');
                            if(((applcYy == checkApplcYy) && (incomeSeCode == checkIncomeSeCode) && (liveSeCode == checkLiveSeCode)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'incomeSeCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'liveSeCode');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMtxbsc001( checkApplcYy, checkIncomeSeCode, checkLiveSeCode )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'incomeSeCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'liveSeCode');
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
        dhxGridMtxbsc001.selectRowById(validFalseFistRowId);
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
//전년도 데이터 복사
var fn_CopyData = function() {
	var jsonParameter = {
		applcYy : gf_FormGetValue('searchFormMtxbsc001', 'applcYy', 'text')
	}

	var dataSource = gf_NoAsyncTransaction('mtxbsc001/saveCopyApplcYy', jsonParameter, 'POST');

	if (dataSource.code === '000') {
		gf_DivMsgAlert(gf_LocaleTrans('default', 'mgsProcess')); // "정상처리
																	// 되었습니다
		cf_InitParamMtxbsc001();
		fn_SearchMtxbsc001('1', '');
	}

}
