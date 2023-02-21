/**
 *    프로그램       : 설문관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.04
 *    사용테이블      : STM_QESTNAR
 * sourceGen version : 2020.08.06.01 (2020.09.04)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmqes001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmqes001 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmqes001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmqes001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmqes001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmqes001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmqes001 = 0;  //그리드 삭제 수량 
var dhxGridStmqes001;  //그리드 객체
var eventIdStmqes001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmqes001;  //DataProcessor 객체
var myTabbar;
var g_MainSearchValue = new Object();
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmqes001();
    if(cf_SetComponentsStmqes001()){
       cf_SetEventListenerStmqes001();
       cf_InitFormStmqes001();
       cf_SetBindingStmqes001();
       
       if(init()){   // 초기화
    	   init2();  // 기간달력 초기화
    	   Searchinit2();
      	}
       
       cf_SetComponents();
    }
});

function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#saveFormStmqes001 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    
	//기간달력 이벤트 추가
    $('#saveFormStmqes001 #date2').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxCCalendarDate2.show();
    });
    
  //기간달력 이벤트 추가
    $('#searchFormStmqes001 #searchDate').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxSearchDate2.show();
    });
    
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
}

//기간달력
function init2(){
	//달력 생성
	dhxCCalendarDate2 = new dhtmlXDoubleCalendar("saveDate_cal");
	
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#qestnarSdt').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        	$('#qestnarEdt').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
        	
        	gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'qestnarSdt', gf_FormGetValue('saveFormStmqes001', 'qestnarSdt', 'text'));
            gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'qestnarEdt', gf_FormGetValue('saveFormStmqes001', 'qestnarEdt', 'text'));
//            var deCnt = gf_FormGetValue('saveFormPubwks004', 'layoffEndDe', 'text') - gf_FormGetValue('saveFormPubwks004', 'layoffBeginDe', 'text').replaceAll('-','') + 1;
//            gf_FormSetValue('saveFormPubwks004', 'layoffDaycnt', deCnt, 'text');  
        	dhxCCalendarDate2.hide();
        }
    });
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('qestnarSdt', 'qestnarEdt', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('saveFormStmqes001', 'qestnarSdt', 'text'));
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('saveFormStmqes001', 'qestnarEdt', 'text'));	
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
}

//기간달력
function Searchinit2(){
	//달력 생성
	dhxSearchDate2 = new dhtmlXDoubleCalendar("searchDate_cal");
	
	dhxSearchDate2.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#SearchqestnarSdt').val(dateFormat(dhxSearchDate2.leftCalendar.getDate()));
        	$('#SearchqestnarEdt').val(dateFormat(dhxSearchDate2.rightCalendar.getDate()));
        	
        	dhxSearchDate2.hide();
        }
    });
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('SearchqestnarSdt', 'SearchqestnarEdt', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxSearchDate2.leftCalendar.setDate(gf_FormGetValue('searchFormStmqes001', 'SearchqestnarSdt', 'text'));
	dhxSearchDate2.rightCalendar.setDate(gf_FormGetValue('searchFormStmqes001', 'SearchqestnarEdt', 'text'));	
	dhxSearchDate2.leftCalendar.loadUserLanguage("ko");
	dhxSearchDate2.rightCalendar.loadUserLanguage("ko");
}

/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmqes001 = function() {
    gf_SetMenuPath();
    $("#saveFormStmqes001").validate({ errorElement: 'div', ignore: '' });
};

var cf_SetComponentsStmqes001 = function() {
    var dhxGridStmqes001HeaderInfo = [];
    dhxGridStmqes001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmqes001HeaderInfo.push(gf_MakeDhxGridHeader('설문조사코드', '*', 'center', 'str', 'ro', false, 'qestnarCode', '', '')); /* gf_LocaleTrans('default', 'titQestnarCode') */
    dhxGridStmqes001HeaderInfo.push(gf_MakeDhxGridHeader('설문조사명칭', '150', 'left', 'str', 'ro', false, 'qestnarNm', '', '')); /* gf_LocaleTrans('default', 'titQestnarNm') */
    dhxGridStmqes001HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '150', 'center', 'str', 'ch', false, 'useAt', '', '')); /* gf_LocaleTrans('default', 'titUseAt') */
    dhxGridStmqes001HeaderInfo.push(gf_MakeDhxGridHeader('설문조사 시작일자', '0', 'left', 'str', 'ro', true, 'qestnarSdt', '', '')); /* gf_LocaleTrans('default', 'titQestnarSdt') */
    dhxGridStmqes001HeaderInfo.push(gf_MakeDhxGridHeader('설문조사 종료일자', '0', 'left', 'str', 'ro', true, 'qestnarEdt', '', '')); /* gf_LocaleTrans('default', 'titQestnarEdt') */
    dhxGridStmqes001HeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridStmqes001HeaderInfo.push(gf_MakeDhxGridHeader('수정 가능 여부 : 1=수정불', '0', 'center', 'str', 'ch', true, 'updtPosblAt', '', '')); /* gf_LocaleTrans('default', 'titUpdtPosblAt') */
    dhxGridStmqes001 = gf_MakeDhxGrid('dataListStmqes001', dhxGridStmqes001HeaderInfo, true, false, false);
    dhxGridStmqes001.enableAutoWidth(false);
    dhxGridStmqes001.setEditable(true);

    dhxGridStmqes001.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetComponents = function (){

    myTabbar = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
    	    {id:"a1",  text: '설문조사' },
    	    {id:"a2",  text: '설문내용' },
    	    {id:"a3",  text: '설문대상' }
		    ]
    });
    
//    myTabbar.attachEvent("onTabClick", function(id, lastId){
//    	var qestnarCode = $("#qestnarCodeSaveFormStmqes001").val();
//	    if(gf_IsNull(qestnarCode)) {
//	    	gf_DivMsgAlert('설문조사를 등록해주세요.');
//	    	return false;
//	    }
//    });
    
    myTabbar.tabs("a1").attachObject("a1");
    myTabbar.tabs("a2").attachObject("a2");
    myTabbar.tabs("a3").attachObject("a3");
    
    

    myTabbar.attachEvent("onSelect", function(id, lastId){
    	//alert(empno);STM_QESTNAR_CN
    	var qestnarCode = $("#qestnarCode").val();
    	var qestnarNm = $("#qestnarNmSaveFormStmqes001").val();
    	if(id=="a2") myTabbar.tabs("a2").attachURL("/xerp/stmqes001/searchStmqestnarCn/view?qestnarCode="+qestnarCode + "&qestnarNm=" +qestnarNm);
    	if(id=="a3") myTabbar.tabs("a3").attachURL("/xerp/stmqes001/searchStmqesTrget/view?qestnarCode="+qestnarCode);
    	return true;
    });
    
    myTabbar.tabs("a1").setActive();
    
};



var cf_SetEventListenerStmqes001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmqes001 = gf_GridDetachEvent(dhxGridStmqes001, eventIdStmqes001);
    eventId = dhxGridStmqes001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmqes001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmqes001.getColumnsNum();
            var rowNum = dhxGridStmqes001.getRowsNum();
            var selectedId = dhxGridStmqes001.getSelectedRowId();
            var ind        = dhxGridStmqes001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqes001.getRowIndex(selectedId);
            var type       = dhxGridStmqes001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmqes001.selectRow(0);
                    //fn_FindStmqes001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmqes001.selectRow(rowIndex + 1);
                    fn_FindStmqes001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmqes001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqes001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmqes001.getSelectedRowId();
            var ind        = dhxGridStmqes001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqes001.getRowIndex(selectedId);
            var type       = dhxGridStmqes001.getColType(ind);
            dhxGridStmqes001.selectCell(rowIndex+1, ind);
            fn_FindStmqes001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqes001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmqes001.getSelectedRowId();
            var ind        = dhxGridStmqes001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmqes001.getRowIndex(selectedId);
            var type       = dhxGridStmqes001.getColType(ind);
            dhxGridStmqes001.selectCell(rowIndex-1, ind);
            fn_FindStmqes001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmqes001.editCell();
            }
        }
        else return true;
    });
    eventIdStmqes001.push(eventId);
    eventId = dhxGridStmqes001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmqes001SortGridList(ind, type, direction); 
    });
    eventIdStmqes001.push(eventId);
    eventId = dhxGridStmqes001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmqes001.push(eventId);
    eventId = dhxGridStmqes001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindStmqes001();
    });
    eventIdStmqes001.push(eventId);
    eventId = dhxGridStmqes001.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdStmqes001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmqes001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddStmqes001()
    });
    $('#btnSaveStmqes001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmqes001();
    });
    $('#btnRemoveStmqes001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmqes001();
    });
    $('#btnExcelStmqes001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmqes001();
    });
    $('#btnSearchStmqes001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmqes001('');
    });
    $('#btnResetStmqes001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmqes001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormStmqes001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchStmqes001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmqes001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormStmqes001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormStmqes001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmqes001 input[name="qestnarCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'qestnarCode', $(this).val());
    });
    $('#saveFormStmqes001 input[name="qestnarNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'qestnarNm', $(this).val());
    });
    $('#saveFormStmqes001 input[name="useAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormStmqes001', 'useAt', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'useAt', val);
    });
    $('#saveFormStmqes001 input[name="qestnarSdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'qestnarSdt', $(this).val());
    });
    $('#saveFormStmqes001 input[name="qestnarEdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'qestnarEdt', $(this).val());
    });
    $('#saveFormStmqes001 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'rm', $(this).val());
    });
    $('#saveFormStmqes001 input[name="updtPosblAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormStmqes001', 'updtPosblAt', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridStmqes001, dhxDataProcessorStmqes001, 'updtPosblAt', val);
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormStmqes001 = function() {
    $('#searchFormStmqes001').resetForm();
};

var cf_SetBindingStmqes001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchStmqes001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmqes001 = function(userId) {
    var jsonParameter = {
    		qestnarNm : gf_FormGetValue('searchFormStmqes001', 'qestnarNm', 'text'),
    		qestnarSdt : gf_FormGetValue('searchFormStmqes001', 'SearchqestnarSdt', 'text'),
    		qestnarEdt : gf_FormGetValue('searchFormStmqes001', 'SearchqestnarEdt', 'text'),
    		useAt : gf_FormGetValue('searchFormStmqes001', 'useAt', 'combo')
    		
    };
    gf_Transaction(userId, 'stmqes001/searchStmqes001', jsonParameter, 'fn_CallbackSearchStmqes001', false, 'GET');
};

var fn_CallbackSearchStmqes001 = function(strSvcID, targetID, data) {
    //dhxGridStmqes001.clearAll();
    dhxGridStmqes001.destructor();
    if(cf_SetComponentsStmqes001()){ 
        fn_DhxDataProcessorStmqes001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmqes001');
            dhxGridStmqes001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Stmqes001 == 0 && save_All_Sta_Stmqes001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmqes001.selectRow(0); 
            } else if(save_Row_Sta_Stmqes001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmqes001.selectRow(0);
            } else if(save_All_Sta_Stmqes001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmqes001.selectRow(save_Row_Num_Stmqes001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmqes001.selectRow(save_Row_Num_Stmqes001);   //개발자 수정 필요  
                //var findCell = dhxGridStmqes001.findCell(save_Row_Ids_Stmqes001, gf_GetDhxGridColumId(dhxGridStmqes001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmqes001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmqes001.selectRow(0);
                //} 
            } 
 
            fn_FindStmqes001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmqes001');
            fn_InitInputFormStmqes001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormStmqes001").text(data.data.records.length);
        cf_SetEventListenerStmqes001();
    } 
};
var fn_DhxDataProcessorStmqes001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmqes001 = new dataProcessor(gv_ContextPath+'/stmqes001/saveStmqes001'); //lock feed url
    dhxDataProcessorStmqes001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmqes001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmqes001.init(dhxGridStmqes001); //link dataprocessor to the grid
    dhxDataProcessorStmqes001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmqes001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmqes001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmqes001();
                    $("#checkAllStmqes001").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 상세조회
 */
var fn_FindStmqes001 = function() {
    var rId = dhxGridStmqes001.getSelectedRowId();
    var status = dhxDataProcessorStmqes001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormStmqes001", "qestnarCode", gf_DhxGetValue(dhxGridStmqes001, rId, 'qestnarCode',  'grid'), '');
    gf_FormSetValue("saveFormStmqes001", "qestnarNm", gf_DhxGetValue(dhxGridStmqes001, rId, 'qestnarNm',  'grid'), '');
    gf_FormSetValue("saveFormStmqes001", "useAt", (( gf_DhxGetValue(dhxGridStmqes001, rId, 'useAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormStmqes001", "qestnarSdt", gf_DhxGetValue(dhxGridStmqes001, rId, 'qestnarSdt',  'grid'), '');
    gf_FormSetValue("saveFormStmqes001", "qestnarEdt", gf_DhxGetValue(dhxGridStmqes001, rId, 'qestnarEdt',  'grid'), '');
    gf_FormSetValue("saveFormStmqes001", "rm", gf_DhxGetValue(dhxGridStmqes001, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormStmqes001", "updtPosblAt", (( gf_DhxGetValue(dhxGridStmqes001, rId, 'updtPosblAt',  'grid') == '1') ? true : false), 'chkbox');

    if(status == 'inserted') {
        $('#saveFormStmqes001 input[name="qestnarCode"]').prop('disabled', false);
    } else {
        $('#saveFormStmqes001 input[name="qestnarCode"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormStmqes001 = function() {
    $('#saveFormStmqes001 input[name="qestnarCode"]').prop('disabled', false);
    $('#saveFormStmqes001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormStmqes001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddStmqes001 = function() {
    dhxGridStmqes001.clearSelection();
    fn_InitInputFormStmqes001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //qestnarCode
    initValueArr.push(''); //qestnarNm
    initValueArr.push(''); //useAt
    initValueArr.push(''); //qestnarSdt
    initValueArr.push(''); //qestnarEdt
    initValueArr.push(''); //rm
    initValueArr.push(''); //updtPosblAt
    dhxGridStmqes001.addRow(dhxGridStmqes001.uid(), initValueArr, 0);
    dhxGridStmqes001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmqes001');
    $('#btnPopEmpSearchStmqes001').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmqes001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmqes001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmqes001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmqes001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmqes001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmqes001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmqes001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmqes001', 'sortColumId', gf_GetDhxGridColum(dhxGridStmqes001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmqes001.setSortImgState(false); 
            gf_FormSetValue('searchFormStmqes001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmqes001', 'sortColumId', '', 'text'); 
            dhxGridStmqes001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmqes001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmqes001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmqes001', 'sortColumId', gf_GetDhxGridColum(dhxGridStmqes001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmqes001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmqes001 = 0; 
    save_Edt_Cnt_Stmqes001 = 0; 
    save_Del_Cnt_Stmqes001 = 0; 
    dhxGridStmqes001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmqes001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmqes001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmqes001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmqes001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmqes001 += 1; 
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
        save_All_Sta_Stmqes001 = 0; 
        if(save_Add_Cnt_Stmqes001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmqes001 + "건";
            save_All_Sta_Stmqes001 = 1; 
        } 
        if(save_Edt_Cnt_Stmqes001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmqes001 + "건"; 
        } 
        if(save_Del_Cnt_Stmqes001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmqes001 + "건"; 
            save_All_Sta_Stmqes001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmqes001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmqes001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmqes001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmqes001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmqes001_Send = function() {
    if(fn_GridValidation(dhxGridStmqes001, dhxDataProcessorStmqes001)) {
        dhxDataProcessorStmqes001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmqes001 = function() {
    var rowId = dhxGridStmqes001.getSelectedRowId();
    var state = dhxDataProcessorStmqes001.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridStmqes001.getRowIndex(rowId);
        dhxGridStmqes001.deleteRow(rowId);
        dhxGridStmqes001.selectRow(rowNum);
        fn_FindStmqes001();
    }
    else dhxDataProcessorStmqes001.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmqes001 = function () {
    var titStmqes001 = '설문관리'; /* gf_LocaleTrans('default', 'titStmqes001') */
    var jsonParameter = {
        qestnarCode : gf_FormGetValue('searchFormStmqes001', 'qestnarCode', 'text')
    };
    var header = [[
        '설문조사 코드 : 자동채번 사용' /* gf_LocaleTrans('default', 'titQestnarCode') */,
        '설문조사 명칭' /* gf_LocaleTrans('default', 'titQestnarNm') */,
        '사용 여부' /* gf_LocaleTrans('default', 'titUseAt') */,
        '설문조사 시작일자' /* gf_LocaleTrans('default', 'titQestnarSdt') */,
        '설문조사 종료일자' /* gf_LocaleTrans('default', 'titQestnarEdt') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */,
        '수정 가능 여부 : 1=수정불' /* gf_LocaleTrans('default', 'titUpdtPosblAt') */
    ]];
    var dataId = [[ 'qestnarCode', 'qestnarNm', 'useAt', 'qestnarSdt', 'qestnarEdt', 'rm', 'updtPosblAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmqes001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmqes001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmqes001/excelStmqes001', jsonParameter);
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
    $('#saveFormStmqes001 #qestnarCodeSaveFormStmqes001').parent().append(
    '<div class="error" id="qestnarCodeSaveFormStmqes001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmqes001 = function(qestnarCode){
    if(!gf_IsNull(qestnarCode)) {
        var jsonParameter = {
            qestnarCode : qestnarCode
        };
        var dataSource = gf_NoAsyncTransaction('stmqes001/findStmqes001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.qestnarCode)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 폼데이터 db 체크
 */
var fn_FormValidation =  function(rowId){
    var state = dhxDataProcessorStmqes001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormStmqes001').validate().form()){
                if(state == 'inserted') {
                    var qestnarCode = gf_FormGetValue('saveFormStmqes001', 'qestnarCode', 'text');
                    if(fn_CheckDupStmqes001(qestnarCode)) return true;
                    else return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return true;
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
    var checkQestnarCode;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmqes001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Stmqes001 == 'deleted') {
        save_Row_Num_Stmqes001 = 0;
        save_Row_Ids_Stmqes001 = "";
    } else if(save_Row_Sta_Stmqes001 == 'inserted') {
        save_Row_Num_Stmqes001 = rowNum;
        save_Row_Ids_Stmqes001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmqes001 = rowNum;
        save_Row_Ids_Stmqes001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qestnarNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qestnarNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qestnarSdt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qestnarSdt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qestnarEdt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qestnarEdt');
                    valid = false;
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridStmqes001.selectRowById(validFalseFistRowId);
        fn_FindStmqes001();
        fn_FormValidation(validFalseFistRowId);
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
