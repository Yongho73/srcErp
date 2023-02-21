/**
 *    프로그램       : 근로소득 간이세액표 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.04.03
 *    사용테이블      : MPS_SIMPLCTY_TAXTBL
 **/
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 ******************************************************************************************************************************/
var save_Row_Num_Mpsbsc012 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsbsc012 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsbsc012 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsbsc012 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsbsc012 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsbsc012 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsbsc012 = 0;  //그리드 삭제 수량 
var dhxGridMpsbsc012;  //그리드 객체
var eventIdMpsbsc012 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMpsbsc012;  //DataProcessor 객체

var excelUploaded = false;
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
/******************************************************************************************************************************
 *                                                     <페이지 로딩시 공통함수 호출>
 ******************************************************************************************************************************/
$(function() {
	 cf_InitParamMpsbsc012();
	 if(cf_SetComponentsMpsbsc012()){
	     cf_SetEventListenerMpsbsc012();
	     cf_InitFormMpsbsc012();
	     cf_SetBindingMpsbsc012();
	 }
    
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc012 = function() {
    gf_SetMenuPath();
    $('#saveFormMpsbsc012').validate({ errorElement: 'div', ignore: '' });
    fn_Calendar();
    fn_FileUpload();
};

var cf_SetComponentsMpsbsc012 = function() {
    var dhxGridMpsbsc012HeaderInfo = [];
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '', '')); /* ��ȣ */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('월급여액[비과세 및 학자금 제외]', '*', 'center', 'str', 'ro', false, 'applcYy', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'center', 'str', 'dhxCalendar', false, 'applcBeginYm', '', '')); /* gf_LocaleTrans('default', 'titApplcBeginYm') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '100', 'center', 'str', 'dhxCalendar', false, 'applcEndYm', '', '')); /* gf_LocaleTrans('default', 'titApplcEndYm') */
    

//    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('사용시작일자', '80', 'center', 'date', 'dhxCalendarA', false, 'useBeginDe', '', '')); /* gf_LocaleTrans('default', 'titUseBeginDe') */
//    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('사용종료일자', '80', 'center', 'date', 'dhxCalendarA', false, 'useEndDe', '', '')); /* gf_LocaleTrans('default', 'titUseEndDe') */
    
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '120', 'right', 'int', 'edn', false, 'lwltAmt', '', '')); /* gf_LocaleTrans('default', 'titLwltAmt') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '120', 'right', 'int', 'edn', false, 'uplmtAmt', '', '')); /* gf_LocaleTrans('default', 'titUplmtAmt') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('공제대상가족의 수(단위:원)', '90', 'right', 'str', 'edn', false, 'fam1Tax', '', '')); /* gf_LocaleTrans('default', 'titFam1Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam2Tax', '', '')); /* gf_LocaleTrans('default', 'titFam2Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam3Tax', '', '')); /* gf_LocaleTrans('default', 'titFam3Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam4Tax', '', '')); /* gf_LocaleTrans('default', 'titFam4Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam5Tax', '', '')); /* gf_LocaleTrans('default', 'titFam5Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam6Tax', '', '')); /* gf_LocaleTrans('default', 'titFam6Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam7Tax', '', '')); /* gf_LocaleTrans('default', 'titFam7Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam8Tax', '', '')); /* gf_LocaleTrans('default', 'titFam8Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam9Tax', '', '')); /* gf_LocaleTrans('default', 'titFam9Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam10Tax', '', '')); /* gf_LocaleTrans('default', 'titFam10Tax') */
    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('#cspan', '90', 'right', 'str', 'edn', false, 'fam11Tax', '', '')); /* gf_LocaleTrans('default', 'titFam11Tax') */
//    dhxGridMpsbsc012HeaderInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '', '')); /* 컬럼수가 10이상일 경우 좌우 스크롤이 생기도록 더미를 붙였음 개발시 필요에 따라 삭제해도 무방함 */

    
    var attachHeaderArr = [];
	attachHeaderArr.push(["#rspan","년도", "적용시작년월", "적용종료년월", "최소금액(단위:원)", "최대금액(단위:원)",	                  
		                   "1", "2", "3", "4", "5","6","7","8","9","10","11"]);
    
    dhxGridMpsbsc012 = gf_MakeDhxGrid('dataListMpsbsc012', dhxGridMpsbsc012HeaderInfo, false, true, false, attachHeaderArr);
    dhxGridMpsbsc012.enableAutoWidth(true);
    dhxGridMpsbsc012.setDateFormat("%Y-%m","%Y%m");

    dhxGridMpsbsc012.setColumnMinWidth(80,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("applcBeginYm"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("applcEndYm"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam1Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam2Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam3Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam4Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam5Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam6Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam7Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam8Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam9Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam10Tax"), ".", ",");
    dhxGridMpsbsc012.setNumberFormat("0,000", dhxGridMpsbsc012.getColIndexById("fam11Tax"), ".", ",");
    
    return true;
};

var cf_SetEventListenerMpsbsc012 = function() {
	// 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsbsc012 = gf_GridDetachEvent(dhxGridMpsbsc012, eventIdMpsbsc012);
    eventId = dhxGridMpsbsc012.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsbsc012();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsbsc012.getColumnsNum();
            var rowNum = dhxGridMpsbsc012.getRowsNum();
            var selectedId = dhxGridMpsbsc012.getSelectedRowId();
            var ind        = dhxGridMpsbsc012.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc012.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc012.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsbsc012.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsbsc012.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsbsc012.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc012.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsbsc012.getSelectedRowId();
            var ind        = dhxGridMpsbsc012.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc012.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc012.getColType(ind);
            dhxGridMpsbsc012.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc012.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsbsc012.getSelectedRowId();
            var ind        = dhxGridMpsbsc012.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc012.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc012.getColType(ind);
            dhxGridMpsbsc012.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc012.editCell();
            }
        }
        else return true;
    });
    eventIdMpsbsc012.push(eventId);
    eventId = dhxGridMpsbsc012.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsbsc012SortGridList(ind, type, direction); 
    });
    eventIdMpsbsc012.push(eventId);
    eventId = dhxGridMpsbsc012.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc012.push(eventId);
    eventId = dhxGridMpsbsc012.attachEvent("onRowSelect", function(id, ind){
    	return true;
    	
    });
    eventIdMpsbsc012.push(eventId);
    eventId = dhxGridMpsbsc012.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsbsc012.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnSaveMpsbsc012').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var rowIds = dhxGridMpsbsc012.getSelectedRowId();  //현재행 ID 
        var rowNum = dhxGridMpsbsc012.getRowIndex(rowIds);
        dhxGridMpsbsc012.selectRow(rowNum); 
        fn_SaveMpsbsc012();
    });
    $('#btnExcelMpsbsc012').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc012();
    });
    $('#btnSearchMpsbsc012').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsbsc012('');
    });
    $('#btnResetMpsbsc012').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc012();
    });
    //전년도 복사 버튼
    $('#btnCopyYearMpsbsc012').unbind('click').bind('click', function(event){
    	var applcYy = gf_FormGetValue('searchFormMpsbsc012', 'applcYy', 'text');
    	var msg = (Number(applcYy)-1) + '년도의 데이터를 ' + Number(applcYy) + '년도로 복사하시겠습니까?<br/>등록되어있는 데이터는 삭제됩니다.';
    	fn_DivMsgConfirm2(msg, function(confirm){ 
            if(confirm){ 
            	return fn_CopyData();
            }else{ 
            	return false;
            } 
        });
    	
    });
    //기타이벤트 ============================================================================
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#searchFormMpsbsc012 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#applcYySearchFormMpsbsc012').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearchMpsbsc012').click(); event.preventDefault(); }
    });
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};
var cf_InitFormMpsbsc012 = function() {
    $('#searchFormMpsbsc012').resetForm();
	//금일 날짜표시
	$('#applcYySearchFormMpsbsc012').val(nowDate.substring(0,4));
};

var cf_SetBindingMpsbsc012 = function() {
    fn_SearchMpsbsc012('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpsbsc012 = function(key) {
    var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMpsbsc012', 'applcYy', 'text')
    };
    gf_FormSetValue('searchFormMpsbsc012', 'year', gf_FormGetValue('searchFormMpsbsc012', 'applcYy', 'text'), '');
    gf_Transaction(key, 'mpsbsc012/searchMpsbsc012', jsonParameter, 'fn_CallbackSearchMpsbsc012', false, 'GET');
};

var fn_CallbackSearchMpsbsc012 = function(strSvcID, targetID, data) {
	excelUploaded = false;
	//dhxGridMpsbsc012.clearAll();
    dhxGridMpsbsc012.destructor();
    if(cf_SetComponentsMpsbsc012()){ 
        fn_DhxDataProcessorMpsbsc012(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc012');
            dhxGridMpsbsc012.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mpsbsc012 == 0 && save_All_Sta_Mpsbsc012 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsbsc012.selectRow(0); 
            } else if(save_Row_Sta_Mpsbsc012 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsbsc012.selectRow(0);
            } else if(save_All_Sta_Mpsbsc012 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsbsc012.selectRow(save_Row_Num_Mpsbsc012); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsbsc012.selectRow(save_Row_Num_Mpsbsc012);   //개발자 수정 필요  
                //var findCell = dhxGridMpsbsc012.findCell(save_Row_Ids_Mpsbsc012, gf_GetDhxGridColumId(dhxGridMpsbsc012,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsbsc012.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsbsc012.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsbsc012');
        }
        $("#spanCntMpsbsc012").text(data.data.records.length);
        cf_SetEventListenerMpsbsc012();
    } 
};
var fn_DhxDataProcessorMpsbsc012 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpsbsc012 = new dataProcessor(gv_ContextPath+'/mpsbsc012/saveMpsbsc012'); //lock feed url
    dhxDataProcessorMpsbsc012.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpsbsc012.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpsbsc012.init(dhxGridMpsbsc012); //link dataprocessor to the grid
    dhxDataProcessorMpsbsc012.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpsbsc012.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpsbsc012.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpsbsc012();
                    $("#checkAllMpsbsc012").prop('checked', false); //상단 체크박스 해제
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
var fn_Mpsbsc012SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsbsc012, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsbsc012', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsbsc012', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsbsc012, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsbsc012.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsbsc012', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsbsc012', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc012, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsbsc012.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsbsc012', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsbsc012', 'sortColumId', '', 'text'); 
            dhxGridMpsbsc012.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsbsc012.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsbsc012', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsbsc012', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc012, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpsbsc012 = function() {
	if(!excelUploaded){
	    var edCnt = 0;
	    save_Add_Cnt_Mpsbsc012 = 0; 
	    save_Edt_Cnt_Mpsbsc012 = 0; 
	    save_Del_Cnt_Mpsbsc012 = 0; 
	    dhxGridMpsbsc012.forEachRow(function(rowId) {
	        if(!gf_IsNull(dhxDataProcessorMpsbsc012.getState(rowId))) {
	            edCnt++;
	        
	            var state = dhxDataProcessorMpsbsc012.getState(rowId); 
	            if(state == 'deleted') { 
	                save_Del_Cnt_Mpsbsc012 += 1; 
	            } else if(state == 'inserted') { 
	                save_Add_Cnt_Mpsbsc012 += 1; 
	            } else if(state == 'updated') { 
	                save_Edt_Cnt_Mpsbsc012 += 1; 
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
	        save_All_Sta_Mpsbsc012 = 0; 
	        if(save_Add_Cnt_Mpsbsc012 > 0){
	            confirmMsg1 = "신규 " + save_Add_Cnt_Mpsbsc012 + "건";
	            save_All_Sta_Mpsbsc012 = 1; 
	        } 
	        if(save_Edt_Cnt_Mpsbsc012 > 0){ 
	            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpsbsc012 + "건"; 
	        } 
	        if(save_Del_Cnt_Mpsbsc012 > 0){ 
	            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpsbsc012 + "건"; 
	            save_All_Sta_Mpsbsc012 = 1; 
	        } 
	        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
	            confirmMsg1 = confirmMsg1 + ", ";
	        }
	        if(confirmMsg2 != "" && confirmMsg3 != ""){
	            confirmMsg2 = confirmMsg2 + ", ";
	        }
	        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";

	        //if(confirmModalMpsbsc012(gv_QueSave)){  //여기는 안옴 
	        if(confirmModalMpsbsc012(confirmMsg)){  //여기는 안옴 
	        } else { 
	            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
	        } 
	    }
	} else {
		if(fn_CheckDupYyMpsbsc012()){
			confirmMsg = "해당 년도의 간의세액표를 저장하시겠습니까?";
			//if(confirmModalMpsbsc012(gv_QueSave)){  //여기는 안옴 
	        if(confirmModalMpsbsc012(confirmMsg)){  //여기는 안옴 
	        } else { 
	            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
	        } 
		} else {
			confirmMsg = "해당 년도의 간의세액표가 존재합니다. 새로 저장하시겠습니까?";
			//if(confirmModalMpsbsc012(gv_QueSave)){  //여기는 안옴 
	        if(saveExcelMpsbsc012(confirmMsg)){  //여기는 안옴 
	        } else { 
	            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
	        } 
		}
	}
}
var confirmModalMpsbsc012 = function (msg) { 
    var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpsbsc012_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpsbsc012_Send = function() {
    if(fn_GridValidation(dhxGridMpsbsc012, dhxDataProcessorMpsbsc012)) {
        dhxDataProcessorMpsbsc012.sendData();
    }
}
var saveExcelMpsbsc012 = function(msg) {
	var result = false; 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            if(fn_RemoveMpsbsc012Send()){
                fn_SaveMpsbsc012_Send(); 
            }
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
}
var fn_RemoveMpsbsc012Send = function() {
	var jsonParameter = {
	        applcYy : gf_DhxGetValue(dhxGridMpsbsc012, '1', 'applcYy', 'grid'),
	        applcBeginYm : gf_DhxGetValue(dhxGridMpsbsc012, '1', 'applcBeginYm', 'grid'),
	        applcEndYm : gf_DhxGetValue(dhxGridMpsbsc012, '1', 'applcEndYm', 'grid'),
	};
	var dataSource = gf_NoAsyncTransaction('mpsbsc012/removeMpsbsc012', jsonParameter, 'POST');
	var data = dataSource.data;
	if(dataSource.code === '000') {
		return true;
	} else {
	    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
	    return false;
	}
};
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupYyMpsbsc012 = function(applcYy, lwltAmt, uplmtAmt){
    var jsonParameter = {
	        applcYy : gf_FormGetValue('searchFormMpsbsc012', 'year', 'text')
    };
    var dataSource = gf_NoAsyncTransaction('mpsbsc012/findMpsbsc012', jsonParameter, 'GET');
    var data = dataSource.data;
    if(dataSource.code === '000') {
        if(gf_IsNull(data.applcYy) && gf_IsNull(data.lwltAmt) && gf_IsNull(data.uplmtAmt)) {
            return true;
        } else {
            fn_JqueryValidationToolTipForDuplicationKey();
            return false;
        }
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc012 = function () {
    var titMpsbsc012 = '근로소득 간이세액표'; /* gf_LocaleTrans('default', 'titMpsbsc012') */
    var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMpsbsc012', 'applcYy', 'text'),
        lwltAmt : gf_FormGetValue('searchFormMpsbsc012', 'lwltAmt', 'text'),
        uplmtAmt : gf_FormGetValue('searchFormMpsbsc012', 'uplmtAmt', 'text')
    };
    var header = [[
        '적용 년도' /* gf_LocaleTrans('default', 'titApplcYy') */,
        '적용시작년월' /* gf_LocaleTrans('default', 'titApplcBeginYm') */,
        '적용종료년월' /* gf_LocaleTrans('default', 'titApplcEndYm') */,
        '최소금액(단위:원) ' /* gf_LocaleTrans('default', 'titLwltAmt') */,
        '최대금액(단위:원)' /* gf_LocaleTrans('default', 'titUplmtAmt') */,
        '가족1인세액' /* gf_LocaleTrans('default', 'titFam1Tax') */,
        '가족2인세액' /* gf_LocaleTrans('default', 'titFam2Tax') */,
        '가족3인세액' /* gf_LocaleTrans('default', 'titFam3Tax') */,
        '가족4인세액' /* gf_LocaleTrans('default', 'titFam4Tax') */,
        '가족5인세액' /* gf_LocaleTrans('default', 'titFam5Tax') */,
        '가족6인세액' /* gf_LocaleTrans('default', 'titFam6Tax') */,
        '가족7일세액' /* gf_LocaleTrans('default', 'titFam7Tax') */,
        '가족8인세액' /* gf_LocaleTrans('default', 'titFam8Tax') */,
        '가족9인세액' /* gf_LocaleTrans('default', 'titFam9Tax') */,
        '가족10인세액' /* gf_LocaleTrans('default', 'titFam10Tax') */,
        '가족11일세액' /* gf_LocaleTrans('default', 'titFam11Tax') */
    ]];
    var dataId = [[ 'applcYy', 'applcBeginYm', 'applcEndYm', 'lwltAmt', 'uplmtAmt', 'fam1Tax', 'fam2Tax', 'fam3Tax', 'fam4Tax', 'fam5Tax', 'fam6Tax', 'fam7Tax', 'fam8Tax', 'fam9Tax', 'fam10Tax', 'fam11Tax' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsbsc012 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc012;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc012/excelMpsbsc012', jsonParameter);
};

var fn_Calendar = function(){
	$('#applcYySearchFormMpsbsc012').val(nowDate.substring(0,4));

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#applcYySearchFormMpsbsc012').yearpicker({
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

var fn_FileUpload = function(){
    //엑셀 업로드 버튼
    $('#btnUploadMpsbsc012').unbind("click").bind("click",function(event){
		
		var startRowNum = 6;
	    var maxRowNum = 646;
	    var colTitle = "lwltAmt|uplmtAmt|fam1Tax|fam2Tax|fam3Tax|fam4Tax|fam5Tax|fam6Tax|fam7Tax|fam8Tax|fam9Tax|fam10Tax|fam11Tax";
	    gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc012');
	    gf_ExcelUpload (startRowNum, maxRowNum, colTitle, dhxGridMpsbsc012, fn_CallbackExcelUploadMpsbsc012);

		});
}
var fn_CallbackExcelUploadMpsbsc012 = function(data) {
	var applcYy;
	var maxIdx = 0;
	applcYy = gf_FormGetValue('searchFormMpsbsc012', 'applcYy', 'text');
	$.each(data.data, function (idx, item){
		
		console.log(applcYy+'-01');
		
		item.applcYy = applcYy
		item.applcBeginYm = applcYy+'01';
		item.applcEndYm = applcYy+'12'
		
		if(gf_IsNull(item.lwltAmt) || item.lwltAmt == '' || item.lwltAmt == '-') item.lwltAmt = '';
		if(gf_IsNull(item.uplmtAmt) || item.uplmtAmt == '' || item.uplmtAmt == '-') item.uplmtAmt = '';
		if(gf_IsNull(item.fam1Tax) || item.fam1Tax == '' || item.fam1Tax == '-') item.fam1Tax = '';
		if(gf_IsNull(item.fam2Tax) || item.fam2Tax == '' || item.fam2Tax == '-') item.fam2Tax = '';
		if(gf_IsNull(item.fam3Tax) || item.fam3Tax == '' || item.fam3Tax == '-') item.fam3Tax = '';
		if(gf_IsNull(item.fam4Tax) || item.fam4Tax == '' || item.fam4Tax == '-') item.fam4Tax = '';
		if(gf_IsNull(item.fam5Tax) || item.fam5Tax == '' || item.fam5Tax == '-') item.fam5Tax = '';
		if(gf_IsNull(item.fam6Tax) || item.fam6Tax == '' || item.fam6Tax == '-') item.fam6Tax = '';
		if(gf_IsNull(item.fam7Tax) || item.fam7Tax == '' || item.fam7Tax == '-') item.fam7Tax = '';
		if(gf_IsNull(item.fam8Tax) || item.fam8Tax == '' || item.fam8Tax == '-') item.fam8Tax = '';
		if(gf_IsNull(item.fam9Tax) || item.fam9Tax == '' || item.fam9Tax == '-') item.fam9Tax = '';
		if(gf_IsNull(item.fam10Tax)|| item.fam10Tax == '' || item.fam10Tax == '-')item.fam10Tax = '';
		if(gf_IsNull(item.fam11Tax)|| item.fam11Tax == '' || item.fam11Tax == '-')item.fam11Tax = '';
		maxIdx = idx;
	});
	dhxGridMpsbsc012.clearAll();
	dhxGridMpsbsc012.parse(data.data, 'js');
	dhxGridMpsbsc012.selectRow(0);
	fn_DhxDataProcessorMpsbsc012();
	for(var i = 1; i<maxIdx+2 ; i++){
    	dhxDataProcessorMpsbsc012.setUpdated(i, true, 'inserted');
		state = dhxDataProcessorMpsbsc012.getState(i);
		console.log('state : '+state);
	}
//	dhxGridMpsbsc012.forEachRow(function (maxIdx){
//    	dhxDataProcessorMpsbsc012.setUpdated(maxIdx, true, 'inserted');
//		state = dhxDataProcessorMpsbsc012.getState(maxIdx);
//		console.log('state : '+state);
//    });
	excelUploaded = true;
}
//전년도 데이터 복사
var fn_CopyData = function() {
	var jsonParameter = {
		applcYy : gf_FormGetValue('searchFormMpsbsc012', 'applcYy', 'text')
	}

	var dataSource = gf_NoAsyncTransaction('mpsbsc012/saveCopyApplcYy', jsonParameter, 'POST');

	if (dataSource.code === '000') {
		gf_DivMsgAlert(gf_LocaleTrans('default', 'mgsProcess')); // "정상처리
																	// 되었습니다
		cf_InitParamMtxbsc001();
		fn_SearchMtxbsc001('1', '');
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
    $('#saveFormMpsbsc012 #applcYySaveFormMpsbsc012').parent().append(
    '<div class="error" id="applcYySaveFormMpsbsc012-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc012 #lwltAmtSaveFormMpsbsc012').parent().append(
    '<div class="error" id="lwltAmtSaveFormMpsbsc012-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc012 #uplmtAmtSaveFormMpsbsc012').parent().append(
    '<div class="error" id="uplmtAmtSaveFormMpsbsc012-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc012 = function(applcYy, lwltAmt, uplmtAmt){
    if(!gf_IsNull(applcYy) && !gf_IsNull(lwltAmt) && !gf_IsNull(uplmtAmt)) {
        var jsonParameter = {
            applcYy : applcYy,
            lwltAmt : lwltAmt,
            uplmtAmt : uplmtAmt
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc012/findMpsbsc012', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYy) && gf_IsNull(data.lwltAmt) && gf_IsNull(data.uplmtAmt)) {
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
    var numberCheck = true;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkApplcYy;
    var checkLwltAmt;
    var checkUplmtAmt;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpsbsc012 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mpsbsc012 = 0;
        save_Row_Ids_Mpsbsc012 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mpsbsc012 = rowNum;
        save_Row_Ids_Mpsbsc012 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpsbsc012 = rowNum;
        save_Row_Ids_Mpsbsc012 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'lwltAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'lwltAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'uplmtAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'uplmtAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'lwltAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'lwltAmt');
                    valid = false;
                    numberCheck = false;
                }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'uplmtAmt', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'uplmtAmt');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam1Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam1Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam2Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam2Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam3Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam3Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam4Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam4Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam5Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam5Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam6Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam6Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam7Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam7Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam8Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam8Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam9Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam9Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam10Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam10Tax');
                     valid = false;
                     numberCheck = false;
                 }
                 if(!gv_ValidateMethods.number( gf_DhxGetValue(dhxGridObjet, rowId, 'fam11Tax', 'grid') )){
                     fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'fam11Tax');
                     valid = false;
                     numberCheck = false;
                 }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted' && !excelUploaded) {
                    checkApplcYy = gf_DhxGetValue(dhxGridObjet, rowId, 'applcYy', 'grid');
                    checkLwltAmt = gf_DhxGetValue(dhxGridObjet, rowId, 'lwltAmt', 'grid');
                    checkUplmtAmt = gf_DhxGetValue(dhxGridObjet, rowId, 'uplmtAmt', 'grid');
                    if(!gf_IsNull(checkApplcYy, checkLwltAmt, checkUplmtAmt)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var applcYy = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'applcYy', 'grid');
                            var lwltAmt = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'lwltAmt', 'grid');
                            var uplmtAmt = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'uplmtAmt', 'grid');
                            if(((applcYy == checkApplcYy) && (lwltAmt == checkLwltAmt) && (uplmtAmt == checkUplmtAmt)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'lwltAmt');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'uplmtAmt');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpsbsc012( checkApplcYy, checkLwltAmt, checkUplmtAmt )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'applcYy');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'lwltAmt');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'uplmtAmt');
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
    if(!numberCheck){
		gf_DivMsgAlertClose();
    	gf_DivMsgAlert("숫자만 입력할 수 있습니다.");
    }
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMpsbsc012.selectRowById(validFalseFistRowId);
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