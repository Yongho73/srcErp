/**
 *    프로그램       : 급여마감 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.03
 *    사용테이블      : MPS_PYMNTDE
 * sourceGen version : 2020.06.29.01 (2020.07.03)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal017 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal017 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal017 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal017 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal017 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal017 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal017 = 0;  //그리드 삭제 수량 
var keyDuplication = false;

var dataSalarytyCode = {};

//금일 조회
var today = new Date();
nowDate = dateFormat(today);

function init4(){
	//달력 생성  : yearpicker 사용
	//금일 날짜표시
	var today = new Date();
	nowDate = dateFormat(today);
	$('#applcYySearchFormMpscal017').val(nowDate.substring(0,4));

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#applcYySearchFormMpscal017').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
    
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
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal017();
    cf_SetComponentsMpscal017();
    cf_SetEventListenerMpscal017();
    cf_InitFormMpscal017();
    cf_SetBindingMpscal017();
    gf_IframeHeightResize(true);
    init4();  // 년  달력 초기화
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal017 = function() {
	gf_SetMenuPath();
    $("#saveFormMpscal017").validate({ errorElement: 'div', ignore: '' });
//  gf_MakeComboBasic('divComboApplcYySearchFormMpscal017','applcYySearchFormMpscal017','','width:140px','Mpscal017/combo/searchComboYeayMpscal017','','key','value', gv_ComYear); //
    //gf_MakeComboBasic('divComboYearYear','applcYy','','width:140px','mpscal017/combo/searchComboYeayMpscal017');
    
    var jsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"ordr" };
    var dataComCode = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, ''); // 기존 코드조회 쿼리 사용
    
    dataComCode.data.forEach(function(sal){
    	dataSalarytyCode[sal.code] = sal.codeNm;
    });
};
var dhxGridMonthMpscal017;
var dhxGridMpscal017;
var cf_SetComponentsMpscal017 = function() {
	//년월
    var dhxGridMonthMpscal017HeaderInfo = [];
    dhxGridMonthMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('적용월', '100', 'center', 'str', 'ro', false, 'belongMm', '', '')); 
    dhxGridMonthMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('적용년', '0', 'center', 'str', 'ro', true, 'belongYy', '', '')); 
    dhxGridMonthMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'belongYm', '', '')); 
    dhxGridMonthMpscal017 = gf_MakeDhxGridP('dataListMonthMpscal017', dhxGridMonthMpscal017HeaderInfo, true, false, false);
    dhxGridMonthMpscal017.enableAutoWidth(false);
	
    dhxGridMonthMpscal017.setColumnMinWidth(100,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
	
    var dhxGridMpscal017HeaderInfo = [];
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '0', 'center', 'str', 'cntr', true, 'num', '', ''));
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('지급일자', '14', 'center', 'str', 'ro', false, 'pymntDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
    //dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader("#cspan",'4','center','str','datePickerButtonS',false,'datePickerButtonS','',''));
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('적용년월', '0', 'center', 'str', 'ro', true, 'applcYm', '', '')); /* gf_LocaleTrans('default', 'titApplcYm') */
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('직종', '12', 'center', 'str', 'coro', false, 'jssfcCode', '', ''));
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('급여유형명', '12', 'center', 'str', 'coro', false, 'salarytyCode', '', '')); /* gf_LocaleTrans('default', 'titPymntDtls') */
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('계좌구분', '0', 'center', 'str', 'coro', true, 'acnutSeCode', '', ''));
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('비고', '*', 'left', 'str', 'ro', false, 'pymntDtls', '', '')); /* gf_LocaleTrans('default', 'titPymntDtls') */
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('지급순번', '0', 'center', 'str', 'ro', true, 'pymntSn', '', '')); 
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="closAtCheckAll"/>&nbsp&nbsp마감여부', '14', 'center', 'str', 'ch', false, 'closAt', '', ''));
    dhxGridMpscal017HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="othbcAtCheckAll"/>&nbsp&nbsp공개여부', '14', 'center', 'str', 'ch', false, 'othbcAt', '', ''));
     
    dhxGridMpscal017 = gf_MakeDhxGridP('dataListMpscal017', dhxGridMpscal017HeaderInfo, true, false, false);
    dhxGridMpscal017.enableAutoWidth(false);
    dhxGridMpscal017.setDateFormat("%Y-%m-%d");
    
 // 급여유형
    var salarytyCodejsonParameter = {codekindCode : "C062",exceptCode :"",sortOrder :"asc" };
    var salarytyCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', salarytyCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscal017, dhxGridMpscal017.getColIndexById("salarytyCode"), salarytyCodedataSource.data, "sel");
    // 직종
    var jssfcCodejsonParameter = {codekindCode : "C148",exceptCode :"",sortOrder :"asc" };
    var jssfcCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jssfcCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscal017, dhxGridMpscal017.getColIndexById("jssfcCode"), jssfcCodedataSource.data, "sel");

    dhxGridMpscal017.setColumnMinWidth(20,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    return true;
};


var eventIdsFst = [];
var eventIdsSec = [];
var calendarEventIds = [];

var previousRowIdMonth;
var previousRowIdType;

var eventIdMpscal017 = [];
var cf_SetEventListenerMpscal017 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
var eventId1;
    
    eventIdsFst = gf_GridDetachEvent(dhxGridMonthMpscal017, eventIdsFst);
    eventIdsSec = gf_GridDetachEvent(dhxGridMpscal017, eventIdsSec);
    
    eventId = dhxGridMonthMpscal017.attachEvent('onRowSelect', function(keyCode, ctrl, shift, event_object) {
        fn_FindMpscal017();
    });
    eventIdsFst.push(eventId);
   
    eventId1 = dhxGridMpscal017.attachEvent('onRowSelect', function(rId,cInd) {
    	
    	if(cInd == gf_GetDhxGridColumId(dhxGridMpscal017, 'datePickerButtonS')) { // calendar    		
    		var strGridDate = gf_DhxGetValue(dhxGridMpscal017, rId, 'pymntDe', 'grid');	
    		var pos = dhxGridMpscal017.getPosition(this.cell);    		
    		dhxGridMpscal017._grid_calendarA.setPosition(pos[0], pos[1] + this.cell.offsetHeight);    		
    		dhxGridMpscal017._grid_calendarA.loadUserLanguage("ko");
    		dhxGridMpscal017._grid_calendarA.setDate(strGridDate);
    		dhxGridMpscal017._grid_calendarA._show();    		
    		calendarEventIds = gf_GridDetachEvent(dhxGridMpscal017._grid_calendarA, calendarEventIds);    		
    		eventId1 = dhxGridMpscal017._grid_calendarA.attachEvent('onClick', function(date) { 
    			fn_gridPickerButtonSetDateS( rId, dhxGridMpscal017._grid_calendarA.getDate() );
    		});
    		calendarEventIds.push(eventId1);    		
    	}
    	
    });
    eventIdsSec.push(eventId1);
    
    eventIdMpscal017 = gf_GridDetachEvent(dhxGridMpscal017, eventIdMpscal017);
    eventId = dhxGridMpscal017.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal017();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal017.getColumnsNum();
            var rowNum = dhxGridMpscal017.getRowsNum();
            var selectedId = dhxGridMpscal017.getSelectedRowId();
            var ind        = dhxGridMpscal017.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal017.getRowIndex(selectedId);
            var type       = dhxGridMpscal017.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal017.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal017.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal017.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal017.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal017.getSelectedRowId();
            var ind        = dhxGridMpscal017.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal017.getRowIndex(selectedId);
            var type       = dhxGridMpscal017.getColType(ind);
            dhxGridMpscal017.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal017.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal017.getSelectedRowId();
            var ind        = dhxGridMpscal017.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal017.getRowIndex(selectedId);
            var type       = dhxGridMpscal017.getColType(ind);
            dhxGridMpscal017.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal017.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal017.push(eventId);
    eventId = dhxGridMpscal017.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal017SortGridList(ind, type, direction); 
    });
    eventIdMpscal017.push(eventId);
    eventId = dhxGridMpscal017.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal017.push(eventId);
    eventId = dhxGridMpscal017.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscal017.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscal017').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscal017()
    });
    $('#btnSaveMpscal017').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpscal017();
    });
    $('#btnRemoveMpscal017').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscal017();
    });
    $('#btnExcelMpscal017').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscal017();
    });
    $('#btnSearchMpscal017').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal017('');
    });
    $('#btnResetMpscal017').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscal017();
    });
    // 기타 이벤트 ==========================================================================================
    $('#closAtCheckAll').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal017, $('#closAtCheckAll').prop('checked'), 'closAt');
    });
    $('#othbcAtCheckAll').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal017, $('#othbcAtCheckAll').prop('checked'), 'othbcAt');
    });
    
    $('#applcYmSearchFormMpscal017').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpscal017').click(); event.preventDefault(); }
    });
    $('#pymntSnSearchFormMpscal017').unbind('keypress').bind('keypress', function(event){
        gf_errorMsgClear();
        if(event.charCode == 13) { $('#btnSearchMpscal017').click(); event.preventDefault(); }
    });
    $('#saveFormMpscal017').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
};

var cf_InitFormMpscal017 = function() {
    $('#searchFormMpscal017').resetForm();
};

var cf_SetBindingMpscal017 = function() {
	gf_FormSetValue('searchFormMpscal017', 'applcYy', gv_ComYear, 'text');
    fn_SearchMpscal017('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscal017 = function(key) {
	
    var jsonParameter = {
    		belongYy : gf_FormGetValue('searchFormMpscal017', 'applcYy', 'text')
    };
    gf_Transaction(key, 'mpscal017/searchMpscal017MonthList', jsonParameter, 'fn_CallbackSearchMpscal017', false, 'GET');
    
};

var fn_CallbackSearchMpscal017 = function(strSvcID, targetID, data) {
	dhxGridMonthMpscal017.clearAll();
	if(!gf_IsNull(data.data.records)){
	    gf_NoFoundDataOnGridMsgRemove('dataListMpscal017');
	    dhxGridMonthMpscal017.parse(data.data.records, 'js');
	    if(!gf_IsNull(strSvcID)) {
	        var findCell = dhxGridMonthMpscal017.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMonthMpscal017,'belogYy'), true);
	        if(!gf_IsNull(findCell)) {
	        	dhxGridMonthMpscal017.selectRowById(findCell[0]);
	        } else {
	        	dhxGridMonthMpscal017.selectRow(0);
	        }
	    } else {
	    	dhxGridMonthMpscal017.selectRow(0);
	    }	
	    previousRowIdMonth = dhxGridMonthMpscal017.getSelectedRowId();
	    fn_FindMpscal017();//지급등록 그리드화면 
	} else {
	    gf_NoFoundDataOnGridMsg('dataListMonthMpscal017');
	}

	cf_SetEventListenerMpscal017();
};

/**
* 2번째 그리드 조회(월별 급여일자 리스트)
*/
var dhxDataProcessorMpscal017;
var fn_FindMpscal017 = function() {
   var belongYm = dhxGridMonthMpscal017.cells(dhxGridMonthMpscal017.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMonthMpscal017,'belongYm')).getValue();
   if (!gf_IsNull(belongYm) ) {
       var jsonParameter = {
       		belongYm : belongYm
       };
       
       gf_Transaction(jsonParameter, 'mpscal017/searchMpscal017', jsonParameter, 'fn_CallbackSearchPayDayMpscal017', false, 'GET');   
   }
	dhxDataProcessorMpscal017 = new dataProcessor("/xerp/mpscal017/saveMpscal017");

	dhxDataProcessorMpscal017.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
	dhxDataProcessorMpscal017.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
	dhxDataProcessorMpscal017.enableDataNames(true);
	dhxDataProcessorMpscal017.init(dhxGridMpscal017); //link dataprocessor to the grid
	dhxDataProcessorMpscal017.styles = {
			updated:	"font-weight:normal;text-decoration:none;",
			inserted:	"font-weight:bold; color:green;",
			deleted:	"color:orange; text-decoration:line-through;",					
			invalid:	"color:green; text-decoration:underline;",
			error:		"color:blue; text-decoration:underline;",
			clear:		"font-weight:normal;text-decoration:none;"
	};   
	dhxDataProcessorMpscal017.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
        if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
            if(!gf_IsNull(dataSource.methodNm)){ 
                gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
            } else { 
                gf_DivMsgAlert(dataSource.message); 
            } 
            return false;
        } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
        }	else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            return false;
    }
}); 
};

var fn_CallbackSearchPayDayMpscal017 = function(strSvcID, targetID, data) {
	dhxGridMpscal017.clearAll();
	if(!gf_IsNull(data.data.records)){
	    gf_NoFoundDataOnGridMsgRemove('dataListMpscal017');
	    dhxGridMpscal017.parse(data.data.records, 'js');
	    
	    dhxGridMpscal017.forEachRow(function(rowId) {
			var pymntDe = gf_DhxGetValue(dhxGridMpscal017, rowId, 'pymntDe', 'grid');
			if (!gf_IsNull(pymntDe)){
				dhxGridMpscal017.cells(rowId,3).setDisabled(true);
				dhxGridMpscal017.cells(rowId,4).setDisabled(true);
			}
	    });
	    
	    
	    if(save_Row_Ids_Mpscal017 == 0 && save_All_Sta_Mpscal017 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscal017.selectRow(0); 
        } else if(save_Row_Sta_Mpscal017 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscal017.selectRow(0);
        } else if(save_All_Sta_Mpscal017 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscal017.selectRow(save_Row_Num_Mpscal017); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscal017.selectRow(save_Row_Num_Mpscal017);   //개발자 수정 필요  
        } 
	    
	    if(!gf_IsNull(strSvcID)) {
	        var findCell = dhxGridMpscal017.findCell(strSvcID, gf_GetDhxGridColumId(dhxGridMpscal017,'pymntDe'), true);
	    }	  
	    previousRowIdType = dhxGridMpscal017.getSelectedRowId();
	} else {
	    gf_NoFoundDataOnGridMsg('dataListMpscal017');
	}

	cf_SetEventListenerMpscal017();
};

/**
 * 추가(신규) 
 */
var fn_AddMpscal017 = function() {
    dhxGridMpscal017.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //applcYm
    initValueArr.push(''); //pymntSn
    initValueArr.push(''); //pymntDe
    initValueArr.push(''); //pymntDtls
    initValueArr.push(''); //salarytyCode
    initValueArr.push(''); //closAt
    initValueArr.push(''); //othbcAt
    initValueArr.push(''); //othbcDt
    dhxGridMpscal017.addRow(dhxGridMpscal017.uid(), initValueArr, 0);
    dhxGridMpscal017.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscal017');
    $('#btnPopEmpSearchMpscal017').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpscal017SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal017, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal017', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal017', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal017, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal017.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal017', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal017', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal017, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal017.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal017', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal017', 'sortColumId', '', 'text'); 
            dhxGridMpscal017.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal017.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal017', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal017', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal017, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal017 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpscal017 = 0; 
    save_Edt_Cnt_Mpscal017 = 0; 
    save_Del_Cnt_Mpscal017 = 0; 
    dhxGridMpscal017.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscal017.getState(rowId))) {
            edCnt++;
            var state = dhxDataProcessorMpscal017.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpscal017 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpscal017 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpscal017 += 1; 
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
        save_All_Sta_Mpscal017 = 0; 
        if(save_Add_Cnt_Mpscal017 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpscal017 + "건";
            save_All_Sta_Mpscal017 = 1; 
        } 
        if(save_Edt_Cnt_Mpscal017 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpscal017 + "건"; 
        } 
        if(save_Del_Cnt_Mpscal017 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpscal017 + "건"; 
            save_All_Sta_Mpscal017 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscal017(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscal017(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscal017 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscal017_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscal017_Send = function() {
    if(fn_GridValidation(dhxGridMpscal017, dhxDataProcessorMpscal017)) {
        dhxDataProcessorMpscal017.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscal017 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal017, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscal017.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscal017.getState(rowId);
            if(dhxGridMpscal017.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal017, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscal017.getRowIndex(rowId);
                    dhxGridMpscal017.deleteRow(rowId);
                    dhxGridMpscal017.selectRow(rowNum);
                }
                else dhxDataProcessorMpscal017.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal017 = function () {
    var titMpscal017 = '급여마감'; /* gf_LocaleTrans('default', 'titMpscal017') */
    var jsonParameter = {
        applcYm : gf_FormGetValue('searchFormMpscal017', 'applcYm', 'text'),
        pymntSn : gf_FormGetValue('searchFormMpscal017', 'pymntSn', 'text')
    };
    var header = [[
        '적용 년월' /* gf_LocaleTrans('default', 'titApplcYm') */,
        '지급 순번' /* gf_LocaleTrans('default', 'titPymntSn') */,
        '지급 일자' /* gf_LocaleTrans('default', 'titPymntDe') */,
        '지급 내역' /* gf_LocaleTrans('default', 'titPymntDtls') */,
        '급여항목유형 코드' /* gf_LocaleTrans('default', 'titSalarytyCode') */,
        '마감 여부' /* gf_LocaleTrans('default', 'titClosAt') */,
        '공개 여부' /* gf_LocaleTrans('default', 'titOthbcAt') */,
        '공개 일시' /* gf_LocaleTrans('default', 'titOthbcDt') */
    ]];
    var dataId = [[ 'applcYm', 'pymntSn', 'pymntDe', 'pymntDtls', 'salarytyCode', 'closAt', 'othbcAt', 'othbcDt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscal017 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal017;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal017/excelMpscal017', jsonParameter);
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
    $('#saveFormMpscal017 #applcYmSaveFormMpscal017').parent().append(
    '<div class="error" id="applcYmSaveFormMpscal017-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpscal017 #pymntSnSaveFormMpscal017').parent().append(
    '<div class="error" id="pymntSnSaveFormMpscal017-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal017 = function(applcYm, pymntSn){
    if(!gf_IsNull(applcYm) && !gf_IsNull(pymntSn)) {
        var jsonParameter = {
            applcYm : applcYm,
            pymntSn : pymntSn
        };
        var dataSource = gf_NoAsyncTransaction('mpscal017/findMpscal017', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYm) && gf_IsNull(data.pymntSn)) {
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
    var checkPymntSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal017 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpscal017 = 0;
        save_Row_Ids_Mpscal017 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpscal017 = rowNum;
        save_Row_Ids_Mpscal017 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal017 = rowNum;
        save_Row_Ids_Mpscal017 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'pymntSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkApplcYm = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYm', 'grid');
                    checkPymntSn = gf_DhxGetValue(dhxGridObjet, rowId, 'pymntSn', 'grid');
                    if(!gf_IsNull(checkApplcYm, checkPymntSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYm = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYm', 'grid');
                            var pymntSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'pymntSn', 'grid');
                            if(((applcYm == checkApplcYm) && (pymntSn == checkPymntSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscal017( checkApplcYm, checkPymntSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYm');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'pymntSn');
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
        dhxGridMpscal017.selectRowById(validFalseFistRowId);
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
var eXcell_datePickerButtonS = function(cell){ //the eXcell name is defined here
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

eXcell_datePickerButtonS.prototype = new eXcell;// nests all other methods from the base class
var fn_gridPickerButtonSetDateS = function (rId, strDate) {
	if(!gf_IsNull(strDate)){					  	
		gf_DhxSetValue(dhxGridMpscal017, rId, 'pymntDe', strDate.format('YYYY-MM-DD'), 'grid');
		dhxDataProcessorMpscal017.setUpdated(rId, true, 'updated');
	}	
}