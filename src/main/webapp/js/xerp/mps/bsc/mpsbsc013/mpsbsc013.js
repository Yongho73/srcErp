/**
 *    프로그램       : 사회보험요율관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.12
 *    사용테이블      : MPS_SNLRC_TARIFF
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpsbsc013 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpsbsc013 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpsbsc013 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpsbsc013 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpsbsc013 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpsbsc013 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpsbsc013 = 0;  //그리드 삭제 수량
var dhxGridMpsbsc013;
var eventIdMpsbsc013 = [];
var dhxDataProcessorMpsbsc013;

var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var episLabrrRt = 0;
var episBsnmRt = 0;
 
var g_applcYy;
var g_changeDe;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
	cf_InitParamMpsbsc013();
    if(cf_SetComponentsMpsbsc013()){
       cf_SetEventListenerMpsbsc013();
       cf_InitFormMpsbsc013();
       cf_SetBindingMpsbsc013();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpsbsc013 = function() {
    gf_SetMenuPath();
    $("#saveFormMpsbsc013").validate({ errorElement: 'div', ignore: '' });
    $("#saveFormTap1").validate({ errorElement: 'div', ignore: '' });
    
    fn_SaveCalender();
    fn_SaveYearCalender();
};

var cf_SetComponentsMpsbsc013 = function() {
    var dhxGridMpsbsc013HeaderInfo = [];
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('적용 년도', '*', 'center', 'str', 'ro', false, 'applcYy', '', '')); /* gf_LocaleTrans('default', 'titApplcYy') */
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('변경 일자', '*', 'center', 'str', 'ro', false, 'changeDe', '', '')); /* gf_LocaleTrans('default', 'titChangeDe') */
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('생활임금 기준금액', '100', 'right', 'int', 'ro', true, 'lvwageStdramt', '', '')); /* gf_LocaleTrans('default', 'titLvwageStdramt') */
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('연차 수당 요율', '100', 'right', 'int', 'ro', true, 'wrycAllwncTariff', '', '')); /* gf_LocaleTrans('default', 'titWrycAllwncTariff') */
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('시간외 수당 요율', '100', 'right', 'int', 'ro', true, 'ovtimeAllwncTariff', '', '')); /* gf_LocaleTrans('default', 'titOvtimeAllwncTariff') */
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('휴근무 수당 요율', '100', 'right', 'int', 'ro', true, 'hvofworkAllwncTariff', '', '')); /* gf_LocaleTrans('default', 'titHvofworkAllwncTariff') */
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('야간근무 수당 요율', '100', 'right', 'int', 'ro', true, 'nworkAllwncTariff', '', '')); /* gf_LocaleTrans('default', 'titNworkAllwncTariff') */
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('등록자 ID', '100', 'left', 'str', 'ro', true, 'regist자Id', '', '')); /* gf_LocaleTrans('default', 'titRegist자Id') */
    dhxGridMpsbsc013HeaderInfo.push(gf_MakeDhxGridHeader('수정자 ID', '100', 'left', 'str', 'ro', true, 'updt자Id', '', '')); /* gf_LocaleTrans('default', 'titUpdt자Id') */
    dhxGridMpsbsc013 = gf_MakeDhxGrid('dataListMpsbsc013', dhxGridMpsbsc013HeaderInfo, true, false, false);
    dhxGridMpsbsc013.enableAutoWidth(false);
    dhxGridMpsbsc013.setEditable(true);
    
    dhxGridMpsbsc013.setColumnMinWidth(70,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    dhxGridMpsbsc013.setColumnMinWidth(70,2);
    
    //TAB BAR 선언
    tabbarMpsbsc013 = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
    	    {id:"a1",  text: "급여기초환경설정" },     //기본
            {id:"a2",  text: "사회보험요율관리"},	  //가족 
            {id:"a3",  text: "퇴직금기초설정"},    //계좌정보
        ]
    });
    fn_SetTabbar();
    
    return true;
};

var cf_SetEventListenerMpsbsc013 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpsbsc013 = gf_GridDetachEvent(dhxGridMpsbsc013, eventIdMpsbsc013);
    eventId = dhxGridMpsbsc013.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpsbsc013();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpsbsc013.getColumnsNum();
            var rowNum = dhxGridMpsbsc013.getRowsNum();
            var selectedId = dhxGridMpsbsc013.getSelectedRowId();
            var ind        = dhxGridMpsbsc013.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc013.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc013.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpsbsc013.selectRow(0);
                    //fn_FindMpsbsc013();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpsbsc013.selectRow(rowIndex + 1);
                    fn_FindMpsbsc013();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpsbsc013.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc013.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpsbsc013.getSelectedRowId();
            var ind        = dhxGridMpsbsc013.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc013.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc013.getColType(ind);
            dhxGridMpsbsc013.selectCell(rowIndex+1, ind);
            fn_FindMpsbsc013();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc013.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpsbsc013.getSelectedRowId();
            var ind        = dhxGridMpsbsc013.getSelectedCellIndex();
            var rowIndex   = dhxGridMpsbsc013.getRowIndex(selectedId);
            var type       = dhxGridMpsbsc013.getColType(ind);
            dhxGridMpsbsc013.selectCell(rowIndex-1, ind);
            fn_FindMpsbsc013();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpsbsc013.editCell();
            }
        }
        else return true;
    });
    eventIdMpsbsc013.push(eventId);
    eventId = dhxGridMpsbsc013.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpsbsc013SortGridList(ind, type, direction); 
    });
    eventIdMpsbsc013.push(eventId);
    eventId = dhxGridMpsbsc013.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpsbsc013.push(eventId);
    eventId = dhxGridMpsbsc013.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        tabbarMpsbsc013.tabs("a1").setActive();
        fn_FindMpsbsc013();
    });
    eventIdMpsbsc013.push(eventId);
    eventId = dhxGridMpsbsc013.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpsbsc013.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpsbsc013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpsbsc013()
    });
    $('#btnSaveMpsbsc013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        confirmModalMpsbsc013("하단의 입력, 수정된 내용이 삭제될 수 있습니다.<br>저장하시겠습니까?");
//        fn_SaveMpsbsc013();
    });
    $('#btnRemoveMpsbsc013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpsbsc013();
    });
    $('#btnExcelMpsbsc013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpsbsc013();
    });
    $('#btnSearchMpsbsc013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpsbsc013('');
    });
    $('#btnResetMpsbsc013').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpsbsc013();
    });
    $('#btnSubSaveMpsbsc013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var msg="저장하시겠습니까?"
        fn_DivMsgConfirm2(msg, function(confirm){ 
            if(confirm){ 
                fn_SubSaveMpsbsc013(); 
            }else{ 
                return false;
            } 
        }); 
    });
    // 기타 이벤트 ==========================================================================================

    tabbarMpsbsc013.tabs("a1").attachObject("tab1");
    tabbarMpsbsc013.tabs("a2").attachObject("tab2");
    tabbarMpsbsc013.tabs("a3").attachObject("tab3");
    
    
    $('#searchFormMpsbsc013 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMpsbsc013').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMpsbsc013 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMpsbsc013",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
    $('#saveFormTap1 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormTap1",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    });
    $('#saveFormMpsbsc013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체 : 검색 달력
    $('#searchFormMpsbsc013 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    //달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#saveFormMpsbsc013 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });

    //생활임금
    $('#saveFormTap1 #lvwageStdramtSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormTap1 #lvwageStdramtSaveFormMpsbsc013').val();
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		$('#saveFormTap1 #lvwageStdramtSaveFormMpsbsc013').val(jnum);
    });
    //연차수당
    $('#saveFormTap1 #wrycAllwncTariffSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormTap1 #wrycAllwncTariffSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum >= 99.9991)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormTap1 #wrycAllwncTariffSaveFormMpsbsc013').val(rJnum);
    });
    //시간 외 수당
    $('#saveFormTap1 #ovtimeAllwncTariffSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormTap1 #ovtimeAllwncTariffSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum >= 99.9991)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormTap1 #ovtimeAllwncTariffSaveFormMpsbsc013').val(rJnum);
    });
    //휴일 수당
    $('#saveFormTap1 #hvofworkAllwncTariffSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormTap1 #hvofworkAllwncTariffSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum >= 99.9991)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormTap1 #hvofworkAllwncTariffSaveFormMpsbsc013').val(rJnum);
    });
    //야간수당
    $('#saveFormTap1 #nworkAllwncTariffSaveFormMpsbsc013').unbind('keyup').bind('keyup',function(event) {
    	var jnum = $('#saveFormTap1 #nworkAllwncTariffSaveFormMpsbsc013').val();
		var rJnum = "";
		jnum = jnum.replace(/[^((0-9)||.)]/g,"");  // 숫자만 남김
		if(jnum >= 99.9991)
			rJnum = 99;
		else
			rJnum = jnum;
		$('#saveFormTap1 #nworkAllwncTariffSaveFormMpsbsc013').val(rJnum);
    });
    
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormMpsbsc013 = function() {
    $('#searchFormMpsbsc013').resetForm();
	gf_FormSetValue("searchFormMpsbsc013", "searchApplcYy", new Date().format('YYYY'), '');
};

var cf_SetBindingMpsbsc013 = function() {
    
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMpsbsc013('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var fn_SetTabbar = function(){
    tabbarMpsbsc013.attachEvent("onSelect", function(id, lastId){
    	//alert(empno);
    	if(id=="a2") tabbarMpsbsc013.tabs("a2").attachURL("/xerp/mpsbsc013/searchMpsbscTariff/view?applcYy="+g_applcYy+"&changeDe="+g_changeDe);
    	if(id=="a3") tabbarMpsbsc013.tabs("a3").attachURL("/xerp/mpsbsc013/searchMpsbscRtrpay/view?applcYy="+g_applcYy+"&changeDe="+g_changeDe);
    	return true;
    });
    tabbarMpsbsc013.tabs("a1").setActive();
}
/**
 * 조회
 */
var fn_SearchMpsbsc013 = function(userId) {
    var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMpsbsc013', 'searchApplcYy', 'text')
    };
    gf_Transaction(userId, 'mpsbsc013/searchMpsbsc013', jsonParameter, 'fn_CallbackSearchMpsbsc013', false, 'GET');
};

var fn_CallbackSearchMpsbsc013 = function(strSvcID, targetID, data) {
    //dhxGridMpsbsc013.clearAll();
    dhxGridMpsbsc013.destructor();
    if(cf_SetComponentsMpsbsc013()){ 
//        fn_DhxDataProcessorMpsbsc013(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMpsbsc013');
            dhxGridMpsbsc013.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mpsbsc013 == 0 && save_All_Sta_Mpsbsc013 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMpsbsc013.selectRow(0); 
            } else if(save_Row_Sta_Mpsbsc013 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMpsbsc013.selectRow(0);
            } else if(save_All_Sta_Mpsbsc013 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMpsbsc013.selectRow(save_Row_Num_Mpsbsc013); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMpsbsc013.selectRow(save_Row_Num_Mpsbsc013);   //개발자 수정 필요  
                //var findCell = dhxGridMpsbsc013.findCell(save_Row_Ids_Mpsbsc013, gf_GetDhxGridColumId(dhxGridMpsbsc013,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMpsbsc013.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMpsbsc013.selectRow(0);
                //} 
            } 
 
            fn_FindMpsbsc013();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMpsbsc013');
            fn_InitInputFormMpsbsc013();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMpsbsc013").text(data.data.records.length);
        cf_SetEventListenerMpsbsc013();
    } 
};
/**
 * 상세조회
 */
var fn_FindMpsbsc013 = function() {
	fn_TabOnOff("Y");

    var rId = dhxGridMpsbsc013.getSelectedRowId();  //현재행 ID 

    gf_FormSetValue("saveFormMpsbsc013", "applcYy", gf_DhxGetValue(dhxGridMpsbsc013, rId, 'applcYy',  'grid'), '');
    gf_FormSetValue("saveFormMpsbsc013", "changeDe", gf_DhxGetValue(dhxGridMpsbsc013, rId, 'changeDe',  'grid'), '');

    $('#saveFormMpsbsc013 input[name="applcYy"]').prop('disabled', true);
    $('#saveFormMpsbsc013 input[name="changeDe"]').prop('disabled', true);

    g_applcYy = gf_DhxGetValue(dhxGridMpsbsc013, rId, 'applcYy',  'grid');
    g_changeDe = gf_DhxGetValue(dhxGridMpsbsc013, rId, 'changeDe',  'grid');
    
	var jsonParameter = {
	        applcYy : gf_DhxGetValue(dhxGridMpsbsc013, rId, 'applcYy',  'grid'),
	        changeDe : gf_DhxGetValue(dhxGridMpsbsc013, rId, 'changeDe',  'grid')
	    };
	gf_Transaction('', 'mpsbsc013/findMpsbsc013', jsonParameter, 'fn_SubFindMpsbsc013', false, 'GET');
};
var fn_SubFindMpsbsc013 = function(strSvcID, targetID, data){
	var dataSource = data.data;
    fn_FormDisabled(false);
    
    gf_FormSetValue("saveFormTap1", "lvwageStdramt", dataSource.lvwageStdramt, '');
    gf_FormSetValue("saveFormTap1", "wrycAllwncTariff",  dataSource.wrycAllwncTariff, '');
    gf_FormSetValue("saveFormTap1", "ovtimeAllwncTariff",  dataSource.ovtimeAllwncTariff, '');
    gf_FormSetValue("saveFormTap1", "hvofworkAllwncTariff",  dataSource.hvofworkAllwncTariff, '');
    gf_FormSetValue("saveFormTap1", "nworkAllwncTariff",  dataSource.nworkAllwncTariff, '');
}
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMpsbsc013 = function() {
    $('#saveFormMpsbsc013 input[name="applcYy"]').prop('disabled', false);
    $('#saveFormMpsbsc013 input[name="changeDe"]').prop('disabled', false);
    $('#saveFormMpsbsc013').resetForm();
};
/**
 * 탭 초기화
 */
var fn_InitTap1Form = function(){
    gf_FormSetValue('saveFormTap1', 'lvwageStdramt', '', 'text');
    gf_FormSetValue('saveFormTap1', 'wrycAllwncTariff', '', 'text');
    gf_FormSetValue('saveFormTap1', 'ovtimeAllwncTariff', '', 'text');
    gf_FormSetValue('saveFormTap1', 'hvofworkAllwncTariff', '', 'text');
    gf_FormSetValue('saveFormTap1', 'nworkAllwncTariff', '', 'text');
}
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMpsbsc013 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMpsbsc013 = function() {
    fn_InitInputFormMpsbsc013();
    fn_InitTap1Form();
    gf_FormSetValue('saveFormMpsbsc013', 'applcYy', new Date().format('YYYY'), 'text');
    gf_FormSetValue('saveFormMpsbsc013', 'changeDe', new Date().format('YYYY-MM-DD'), 'text');
    gf_FormSetValue('saveFormMpsbsc013', 'insertedCheck', 'inserted', 'text');
    
    fn_TabOnOff("N");
}
//Tap 비활성화
var fn_TabOnOff = function (OnOff){
	var ids = tabbarMpsbsc013.getAllTabs();
	if(OnOff == "N"){
		for (var q=0; q<ids.length; q++) {
			tabbarMpsbsc013.tabs(ids[q]).disable();
		}
		$("#tabbarObj").find("input, select, button, textarea").prop("disabled",true);
	}
	else {
		for (var q=0; q<ids.length; q++) {
			tabbarMpsbsc013.tabs(ids[q]).enable();
		}
		$("#tabbarObj").find("input, select, button, textarea").prop("disabled",false);
	}
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpsbsc013SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpsbsc013, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpsbsc013', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpsbsc013', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpsbsc013, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpsbsc013.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpsbsc013', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpsbsc013', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc013, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpsbsc013.setSortImgState(false); 
            gf_FormSetValue('searchFormMpsbsc013', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpsbsc013', 'sortColumId', '', 'text'); 
            dhxGridMpsbsc013.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpsbsc013.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpsbsc013', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpsbsc013', 'sortColumId', gf_GetDhxGridColum(dhxGridMpsbsc013, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var confirmModalMpsbsc013 = function (msg) { 
    fn_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            fn_MainSaveMpsbsc013_Send(); 
        }else{ 
            return false;
        } 
    }); 
} 
var fn_SubSaveMpsbsc013 = function(){
	applcYy = g_applcYy;
	changeDe = g_changeDe;
	lvwageStdramt = gf_FormGetValue('saveFormTap1', 'lvwageStdramt', 'text');
	wrycAllwncTariff = gf_FormGetValue('saveFormTap1', 'wrycAllwncTariff', 'text');
	ovtimeAllwncTariff = gf_FormGetValue('saveFormTap1', 'ovtimeAllwncTariff', 'text');
	hvofworkAllwncTariff = gf_FormGetValue('saveFormTap1', 'hvofworkAllwncTariff', 'text');
	nworkAllwncTariff = gf_FormGetValue('saveFormTap1', 'nworkAllwncTariff', 'text');
	
	if(!gf_IsNull(lvwageStdramt) && !gf_IsNull(wrycAllwncTariff) && !gf_IsNull(ovtimeAllwncTariff) && !gf_IsNull(hvofworkAllwncTariff) && !gf_IsNull(nworkAllwncTariff)){
		var jsonParameter = {
				applcYy : applcYy,
				changeDe : changeDe,
				lvwageStdramt : lvwageStdramt,
				wrycAllwncTariff : wrycAllwncTariff,
				ovtimeAllwncTariff : ovtimeAllwncTariff,
				hvofworkAllwncTariff : hvofworkAllwncTariff,
				nworkAllwncTariff : nworkAllwncTariff,
			};
		gf_Transaction('', 'mpsbsc013/saveMpsbsc013', jsonParameter, 'fn_CallbackSaveMpsbsc013', false, 'GET');
	} else {
		gf_DivMsgAlert("필수 항목들을 입력해주세요.");
	}
}
var fn_MainSaveMpsbsc013_Send = function() {
	var nullCheck = false;
	applcYy = gf_FormGetValue('saveFormMpsbsc013', 'applcYy', 'text');
	changeDe = gf_FormGetValue('saveFormMpsbsc013', 'changeDe', 'text');
	
	if($('#saveFormMpsbsc013').validate().form()){
		nullCheck = false;
	} else {
		nullCheck = true;
	}
	
	if(!gf_IsNull(gf_FormGetValue('saveFormMpsbsc013', 'insertedCheck', 'text'))){
		if(!fn_CheckDupMpsbsc013(applcYy, changeDe)){
			return false;
		}
	}
	
	if(!nullCheck){
		var jsonParameter = {
			applcYy : applcYy,
			changeDe : changeDe
		};
		
		gf_Transaction('', 'mpsbsc013/saveMpsbsc013', jsonParameter, 'fn_CallbackSaveMpsbsc013', false, 'GET');
	} else {
		return false;
	}
}
var fn_CallbackSaveMpsbsc013 = function(strSvcID, targetID, data) {
	if(data.code == "999" && !gf_IsNull(data.message)){ 
        if(!gf_IsNull(data.methodNm)){ 
            gf_DivMsgAlert(data.message + " Method 명 : " + data.methodNm); 
        } else { 
            gf_DivMsgAlert(data.message); 
        } 
        return false;
   } else if (data.code == "000" || data.data.code !== "000"){
            gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            fn_SearchMpsbsc013();
//            $("#checkAllMpsbsc013").prop('checked', false); //상단 체크박스 해제
            return true;
    } else {
            gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
            return false;
    }
};

/**
 * 삭제
 */
var fn_RemoveMpsbsc013 = function() {
    var applcYy = gf_FormGetValue('saveFormMpsbsc013', 'applcYy', 'text');
    var changeDe = gf_FormGetValue('saveFormMpsbsc013', 'changeDe', 'text')
    
    fn_DivMsgConfirm2('삭제하시겠습니까?', function(confirm){ 
        if(confirm){ 
        	var jsonParameter = {
        	        applcYy : applcYy,
        	        changeDe : changeDe
        	    };
        	    var dataSource = gf_NoAsyncTransaction('mpsbsc013/deleteMpsbsc013', jsonParameter, 'GET');
        	    var data = dataSource.data;
        	    if(dataSource.code === '000') {
        		      gf_DivMsgAlert("삭제되었습니다.");
        		      fn_SearchMpsbsc013();
        	    } else {
        	    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                return false;
        	    }
        }else{ 
           return false;
        } 
    }); 
   
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpsbsc013 = function () {
    var titMpsbsc013 = '증명서 발급신청'; /* gf_LocaleTrans('default', 'titMpsbsc013') */
    var jsonParameter = {
        applcYy : gf_FormGetValue('searchFormMpsbsc013', 'applcYy', 'text'),
        changeDe : gf_FormGetValue('searchFormMpsbsc013', 'changeDe', 'text')
    };
    var header = [[
        '적용년도' /* gf_LocaleTrans('default', 'titApplcYy') */,
        '변경일자' /* gf_LocaleTrans('default', 'titChangeDe') */,
        '국민연금 근로자 비율' /* gf_LocaleTrans('default', 'titNpnLabrrRt') */,
        '국민연금 사업자 비율' /* gf_LocaleTrans('default', 'titNpnBsnmRt') */,
        '국민연금 상한 금액' /* gf_LocaleTrans('default', 'titNpnUplmtAmt') */,
        '건강보험 근로자 비율' /* gf_LocaleTrans('default', 'titHlthinsLabrrRt') */,
        '건강보험 사업자 비율' /* gf_LocaleTrans('default', 'titHlthinsBsnmRt') */,
        '장기요양보험 건강보험 비율' /* gf_LocaleTrans('default', 'titLtciHlthinsRt') */,
        '장기요양보험 근로자 비율' /* gf_LocaleTrans('default', 'titLtciLabrrRt') */,
        '장기요양보험 사업자 비율' /* gf_LocaleTrans('default', 'titLtciBsnmRt') */,
        '고용보험 근로자 비율' /* gf_LocaleTrans('default', 'titEpisLabrrRt') */,
        '고용보험 사업자 비율' /* gf_LocaleTrans('default', 'titEpisBsnmRt') */,
        '고용보험 부담금 (사업주 부담금외에 추가 부담금)' /* gf_LocaleTrans('default', 'titEpisAlotm') */,
        '산재보험 요율' /* gf_LocaleTrans('default', 'titIaciTariff') */,
        '국민연금 하한 금액' /* gf_LocaleTrans('default', 'titNpnLwltAmt') */,
        '건강보험 하한 금액' /* gf_LocaleTrans('default', 'titHlthinsLwltAmt') */,
        '건강보험 상한 금액' /* gf_LocaleTrans('default', 'titHlthinsUplmtAmt') */
    ]];
    var dataId = [[ 'applcYy', 'changeDe', 'npnLabrrRt', 'npnBsnmRt', 'npnUplmtAmt', 'hlthinsLabrrRt', 'hlthinsBsnmRt', 'ltciHlthinsRt', 'ltciLabrrRt', 'ltciBsnmRt', 'episLabrrRt', 'episBsnmRt', 'episAlotm', 'iaciTariff', 'npnLwltAmt', 'hlthinsLwltAmt', 'hlthinsUplmtAmt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsbsc013 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsbsc013;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpsbsc013/excelMpsbsc013', jsonParameter);
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
    $('#saveFormMpsbsc013 #applcYySaveFormMpsbsc013').parent().append(
    '<div class="error" id="applcYySaveFormMpsbsc013-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMpsbsc013 #changeDeSaveFormMpsbsc013').parent().append(
    '<div class="error" id="changeDeSaveFormMpsbsc013-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpsbsc013 = function(applcYy, changeDe){
    if(!gf_IsNull(applcYy) && !gf_IsNull(changeDe)) {
        var jsonParameter = {
            applcYy : applcYy,
            changeDe : changeDe
        };
        var dataSource = gf_NoAsyncTransaction('mpsbsc013/findMpsbsc013', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.applcYy) && gf_IsNull(data.changeDe)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 변경일자 저장
 */
var fn_SaveCalender = function(){
	//달력 생성
	var saveCalendar = new dhtmlXCalendarObject({input:"changeDeSaveFormMpsbsc013", button:"startDateIcon"});
	saveCalendar.loadUserLanguage("ko");
	saveCalendar.hideTime();
	
	//금일 날짜표시
	$('#changeDeSaveFormMpsbsc013').val(nowDate);
   //달력 생성  : yearpicker 사용
	//금일 날짜표시
	$('#searchApplcYySearchFormMpsbsc013').val(nowDate.substring(0,4));
	
   var currentYear = (new Date()).getFullYear();
   var startYear = currentYear-20;
   var endYear = currentYear+20;

   $('#searchApplcYySearchFormMpsbsc013').yearpicker({
       year: currentYear,
       startYear: startYear,
       endYear: endYear
     });
}

var fn_SaveYearCalender = function(){
	//달력 생성  : yearpicker 사용
	//금일 날짜표시
	$('#applcYySaveFormMpsbsc013').val(nowDate.substring(0,4));

   var currentYearSave = (new Date()).getFullYear();
   var startYearSave = currentYearSave-20;
   var endYearSave = currentYearSave+20;

   $('#applcYySaveFormMpsbsc013').yearpicker({
       year: currentYearSave,
       startYear: startYearSave,
       endYear: endYearSave
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
	      gf_DivMsgAlert("잘못된 날짜입니다. \n다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
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