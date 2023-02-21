/**
 *    프로그램       : ERP게시판관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.21
 *    사용테이블      : STM_ERP_NOTICE_BOARD
 * sourceGen version : 2020.07.16.01 (2020.08.21)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Stmnot001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Stmnot001 = 0;  //그리드 위치 상태 
var save_All_Sta_Stmnot001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Stmnot001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Stmnot001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Stmnot001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Stmnot001 = 0;  //그리드 삭제 수량 
var dhxGridStmnot001;  //그리드 객체
var eventIdStmnot001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorStmnot001;  //DataProcessor 객체

var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var searchCalendar; // 기간 달력(From ~ To)

var gBplcCode = "1000";
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamStmnot001();
    if(cf_SetComponentsStmnot001()){
       cf_SetEventListenerStmnot001();
       cf_InitFormStmnot001();
       cf_SetBindingStmnot001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamStmnot001 = function() {
    gf_SetMenuPath();
    $("#saveFormStmnot001").validate({ errorElement: 'div', ignore: '' });
    
    fn_Calendar();
};

var cf_SetComponentsStmnot001 = function() {
    var dhxGridStmnot001HeaderInfo = [];
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllStmnot001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('제목', '*', 'left', 'str', 'ro', false, 'noticeTit', '', '')); /* gf_LocaleTrans('default', 'titNoticeTit') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('조회수', '80', 'right', 'int', 'ro', false, 'inqireCo', '', '')); /* gf_LocaleTrans('default', 'titInqireCo') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', false, 'writerId', '', '')); /* gf_LocaleTrans('default', 'titWriterId') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('작성자', '100', 'center', 'str', 'ro', false, 'writerNm', '', '')); /* gf_LocaleTrans('default', 'titWriterId') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상자명', '130', 'center', 'int', 'ro', false, 'noticeTrgetEmp', '', '')); /* gf_LocaleTrans('default', 'titNoticeId') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상부서', '130', 'center', 'str', 'ro', false, 'noticeTrgetDept', '', '')); /* gf_LocaleTrans('default', 'titNoticeKind') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상권한', '130', 'center', 'str', 'ro', false, 'noticeTrgetGroup', '', '')); /* gf_LocaleTrans('default', 'titNoticeTrgetSe') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('파일', '80', 'center', 'str', 'ro', false, 'atchmnflNoYN', '', '')); /* gf_LocaleTrans('default', 'titNoticeCn') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('공개여부', '80', 'center', 'str', 'ro', false, 'openAtNm', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('작성일자', '150', 'center', 'str', 'ro', false, 'regDt', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */

    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('공지ID', '130', 'left', 'str', 'ro', true, 'noticeId', '', '')); /* gf_LocaleTrans('default', 'titWriterId') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('공지종류구분', '130', 'left', 'str', 'ro', true, 'noticeKind', '', '')); /* gf_LocaleTrans('default', 'titNoticeTrgetSe') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('공지대상구분', '130', 'left', 'str', 'ro', true, 'noticeTrgetSe', '', '')); /* gf_LocaleTrans('default', 'titNoticeTrgetSe') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('공지내용', '130', 'left', 'str', 'ro', true, 'noticeCn', '', '')); /* gf_LocaleTrans('default', 'titNoticeTrgetSe') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('파일', '80', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titNoticeCn') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('사용여부', '180', 'center', 'str', 'ro', true, 'openAt', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상 사원 수', '100', 'center', 'str', 'ro', true, 'trgetEmpCnt', '', ''));
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상 사원', '100', 'center', 'str', 'ro', true, 'trgetEmpNm', '', ''));
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상 부서 수', '100', 'center', 'str', 'ro', true, 'trgetDeptCnt', '', ''));
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상 부서', '100', 'center', 'str', 'ro', true, 'trgetDeptNm', '', ''));
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상 권한 수', '100', 'center', 'str', 'ro', true, 'trgetGroupCnt', '', ''));
    dhxGridStmnot001HeaderInfo.push(gf_MakeDhxGridHeader('대상 권한', '100', 'center', 'str', 'ro', true, 'trgetGroupNm', '', ''));
    
    dhxGridStmnot001 = gf_MakeDhxGrid('dataListStmnot001', dhxGridStmnot001HeaderInfo, true, false, false);
    dhxGridStmnot001.enableAutoWidth(false);
    dhxGridStmnot001.setEditable(true);

    dhxGridStmnot001.setColumnMinWidth(40,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크 기가 * 인 컬럼의 인덱스 
    dhxGridStmnot001.setDateFormat("%Y-%m-%d %H:%i");
    dhxGridStmnot001.setNumberFormat("0,000", dhxGridStmnot001.getColIndexById("inqireCo"), ".", ",");
    return true; 
};

var cf_SetEventListenerStmnot001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdStmnot001 = gf_GridDetachEvent(dhxGridStmnot001, eventIdStmnot001);
    eventId = dhxGridStmnot001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelStmnot001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridStmnot001.getColumnsNum();
            var rowNum = dhxGridStmnot001.getRowsNum();
            var selectedId = dhxGridStmnot001.getSelectedRowId();
            var ind        = dhxGridStmnot001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmnot001.getRowIndex(selectedId);
            var type       = dhxGridStmnot001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridStmnot001.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridStmnot001.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridStmnot001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmnot001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridStmnot001.getSelectedRowId();
            var ind        = dhxGridStmnot001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmnot001.getRowIndex(selectedId);
            var type       = dhxGridStmnot001.getColType(ind);
            dhxGridStmnot001.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmnot001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridStmnot001.getSelectedRowId();
            var ind        = dhxGridStmnot001.getSelectedCellIndex();
            var rowIndex   = dhxGridStmnot001.getRowIndex(selectedId);
            var type       = dhxGridStmnot001.getColType(ind);
            dhxGridStmnot001.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridStmnot001.editCell();
            }
        }
        else return true;
    });
    eventIdStmnot001.push(eventId);
    eventId = dhxGridStmnot001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Stmnot001SortGridList(ind, type, direction); 
    });
    eventIdStmnot001.push(eventId);
    eventId = dhxGridStmnot001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdStmnot001.push(eventId);
    eventId = dhxGridStmnot001.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdStmnot001.push(eventId);
    eventId = dhxGridStmnot001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdStmnot001.push(eventId);
    // 행 더블클릭 상세 조회
    dhxGridStmnot001.attachEvent("onRowDblClicked" , function(rId , cInd){
    	var paramNoticeId  = dhxGridStmnot001.cells(rId, dhxGridStmnot001.getColIndexById("noticeId")).getValue();
    	var param = "paramNoticeId=" + paramNoticeId;
    	
    	fn_Stmnot001Popup('form1','','', param);
    });
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddStmnot001').unbind('click').bind('click', function(event){
    	var param = "paramNoticeId=";
    	fn_Stmnot001Popup('form1','','', param);
    });
    $('#btnSaveStmnot001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveStmnot001();
    });
    $('#btnRemoveStmnot001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveStmnot001();
    });
    $('#btnExcelStmnot001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelStmnot001();
    });
    $('#btnSearchStmnot001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchStmnot001('');
    });
    $('#btnResetStmnot001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormStmnot001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllStmnot001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridStmnot001, $('#checkAllStmnot001').prop('checked'), 'chk');
    });
    $('#searchFormStmnot001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { 
        	if(this.id == "searchEmpnoStmnot001" || this.id == "searchEmpNmStmnot001") return fn_SearchEmpCode();
        	if(this.id == "searchDeptNoStmnot001" || this.id == "searchDeptNmStmnot001") return fn_SearchDeptCode();
        	$('#btnSearchStmnot001').click(); event.preventDefault(); return true; 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormStmnot001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#searchFormStmnot001 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
	//기간달력 이벤트 추가
    $('#searchFormStmnot001 #bgnRequstDe').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	searchCalendar.show();
    });
    $('#searchFormStmnot001 #endRequstDe').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	searchCalendar.show();
    });
    	
    //사원 검색 Popup
	$('#searchFormStmnot001 #btnEmpCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormStmnot001","searchEmpnoStmnot001","searchEmpNmStmnot001", gBplcCode, "Y", "fn_CallbackPopEmp");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    $('#searchEmpnoStmnot001').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormStmnot001', 'searchEmpNm', '', 'text');
		}
    });
    $('#searchEmpNmStmnot001').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormStmnot001', 'searchEmpno', '', 'text');
		}
    });
	//부서 검색 Popup
	$('#searchFormStmnot001 #btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormStmnot001","searchDeptNoStmnot001","searchDeptNmStmnot001", gBplcCode, "Y", "fn_CallbackPopDept");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    $('#searchDeptNoStmnot001').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormStmnot001', 'searchDeptNm', '', 'text');
		}
    });
    $('#searchDeptNmStmnot001').unbind('keydown').bind('keydown',function(event) {
		if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormStmnot001', 'searchDeptNo', '', 'text');
		}
    });
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
};

var cf_InitFormStmnot001 = function() {
    $('#searchFormStmnot001').resetForm();
	//검색달력 초기화(휴가일자)
	$('input[name=bgnRequstDe]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name=endRequstDe]').val( (new Date()).format('YYYY-MM-30') );
	searchCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormStmnot001', 'bgnRequstDe', 'text'));
	searchCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormStmnot001', 'endRequstDe', 'text'));
	
	$('#noticeCnSearchFormStmnot001').focus();
};

var cf_SetBindingStmnot001 = function() {
    fn_SearchStmnot001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchStmnot001 = function(userId) {
    var jsonParameter = {
        noticeCn : gf_FormGetValue('searchFormStmnot001', 'noticeCn', 'text'),
        sRegDt : gf_FormGetValue('searchFormStmnot001', 'bgnRequstDe', 'text'),
        eRegDt : gf_FormGetValue('searchFormStmnot001', 'endRequstDe', 'text'),
        empno : gf_FormGetValue('searchFormStmnot001', 'searchEmpno', 'text'),
        empNm : gf_FormGetValue('searchFormStmnot001', 'searchEmpNm', 'text'),
        deptCode : gf_FormGetValue('searchFormStmnot001', 'searchDeptNo', 'text'),
        deptKorNm : gf_FormGetValue('searchFormStmnot001', 'searchDeptNm', 'text')
    };
    gf_Transaction(userId, 'stmnot001/searchStmnot001', jsonParameter, 'fn_CallbackSearchStmnot001', false, 'GET');
};

var fn_CallbackSearchStmnot001 = function(strSvcID, targetID, data) {
    //dhxGridStmnot001.clearAll();
    dhxGridStmnot001.destructor();
    if(cf_SetComponentsStmnot001()){ 
        fn_DhxDataProcessorStmnot001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListStmnot001');
            dhxGridStmnot001.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Stmnot001 == 0 && save_All_Sta_Stmnot001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridStmnot001.selectRow(0); 
            } else if(save_Row_Sta_Stmnot001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridStmnot001.selectRow(0);
            } else if(save_All_Sta_Stmnot001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridStmnot001.selectRow(save_Row_Num_Stmnot001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridStmnot001.selectRow(save_Row_Num_Stmnot001);   //개발자 수정 필요  
                //var findCell = dhxGridStmnot001.findCell(save_Row_Ids_Stmnot001, gf_GetDhxGridColumId(dhxGridStmnot001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridStmnot001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridStmnot001.selectRow(0);
                //} 
            } 
//            
            dhxGridStmnot001.forEachRow(function(rowId){
            	var noticeTretSeList = gf_DhxGetValue(dhxGridStmnot001, rowId, 'noticeTrgetSe', 'grid');
            	if(noticeTretSeList == '001'){
            		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetEmp', '전체', 'grid');
            		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetDept', '전체', 'grid');
            		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetGroup', '전체', 'grid');
            	} else {
            		if(gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetEmpCnt', 'grid') > 0){
                		console.log('emp');
            			var searchCnt = gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetEmpCnt', 'grid');
                    	var searchNm = gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetEmpNm', 'grid');
                    	if(searchCnt > 1){
                    		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetEmp', (searchNm + ' 외 ' + (searchCnt - 1) +'명') , 'grid');
                    	} else {
                    		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetEmp', searchNm , 'grid');
                    	}
            		}
            		if(gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetDeptCnt', 'grid') > 0){
                		console.log('dept');
            			var searchCnt = gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetDeptCnt', 'grid');
                    	var searchNm = gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetDeptNm', 'grid');
                    	if(searchCnt > 1){
                    		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetDept', (searchNm + ' 외 ' + (searchCnt - 1) +'명') , 'grid');
                    	} else {
                    		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetDept', searchNm , 'grid');
                    	}
            		}
            		if(gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetEmpCnt', 'grid') > 0){
                		console.log('group');
            			var searchCnt = gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetGroupCnt', 'grid');
                    	var searchNm = gf_DhxGetValue(dhxGridStmnot001, rowId, 'trgetGroupNm', 'grid');
                    	if(searchCnt > 1){
                    		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetGroup', (searchNm + ' 외 ' + (searchCnt - 1) +'명') , 'grid');
                    	} else {
                    		gf_DhxSetValue(dhxGridStmnot001, rowId, 'noticeTrgetGroup', searchNm , 'grid');
                    	}
            		}
            	}
            });
        } else {
            gf_NoFoundDataOnGridMsg('dataListStmnot001');
        }
        $("#spanCntSearchFormStmnot001").text(data.data.records.length);
        cf_SetEventListenerStmnot001();
    } 
};
var fn_DhxDataProcessorStmnot001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorStmnot001 = new dataProcessor(gv_ContextPath+'/stmnot001/saveStmnot001'); //lock feed url
    dhxDataProcessorStmnot001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorStmnot001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorStmnot001.init(dhxGridStmnot001); //link dataprocessor to the grid
    dhxDataProcessorStmnot001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorStmnot001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorStmnot001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchStmnot001();
                    $("#checkAllStmnot001").prop('checked', false); //상단 체크박스 해제
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
var fn_AddStmnot001 = function() {
    dhxGridStmnot001.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //noticeId
    initValueArr.push(''); //noticeKind
    initValueArr.push(''); //noticeTrgetSe
    initValueArr.push(''); //noticeTit
    initValueArr.push(''); //noticeCn
    initValueArr.push(''); //writerId
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //openAt
    initValueArr.push(''); //inqireCo
    initValueArr.push(''); //deleteAt
    initValueArr.push(''); //deleteId
    initValueArr.push(''); //deleteDt
    dhxGridStmnot001.addRow(dhxGridStmnot001.uid(), initValueArr, 0);
    dhxGridStmnot001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListStmnot001');
    $('#btnPopEmpSearchStmnot001').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Stmnot001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridStmnot001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormStmnot001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormStmnot001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridStmnot001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridStmnot001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormStmnot001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormStmnot001', 'sortColumId', gf_GetDhxGridColum(dhxGridStmnot001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridStmnot001.setSortImgState(false); 
            gf_FormSetValue('searchFormStmnot001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormStmnot001', 'sortColumId', '', 'text'); 
            dhxGridStmnot001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridStmnot001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormStmnot001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormStmnot001', 'sortColumId', gf_GetDhxGridColum(dhxGridStmnot001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveStmnot001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Stmnot001 = 0; 
    save_Edt_Cnt_Stmnot001 = 0; 
    save_Del_Cnt_Stmnot001 = 0; 
    dhxGridStmnot001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorStmnot001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorStmnot001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Stmnot001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Stmnot001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Stmnot001 += 1; 
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
        save_All_Sta_Stmnot001 = 0; 
        if(save_Add_Cnt_Stmnot001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Stmnot001 + "건";
            save_All_Sta_Stmnot001 = 1; 
        } 
        if(save_Edt_Cnt_Stmnot001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Stmnot001 + "건"; 
        } 
        if(save_Del_Cnt_Stmnot001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Stmnot001 + "건"; 
            save_All_Sta_Stmnot001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalStmnot001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalStmnot001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalStmnot001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveStmnot001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveStmnot001_Send = function() {
    if(fn_GridValidation(dhxGridStmnot001, dhxDataProcessorStmnot001)) {
        dhxDataProcessorStmnot001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveStmnot001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridStmnot001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridStmnot001.forEachRow(function(rowId) {
            state = dhxDataProcessorStmnot001.getState(rowId);
            if(dhxGridStmnot001.cells(rowId, gf_GetDhxGridColumId(dhxGridStmnot001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridStmnot001.getRowIndex(rowId);
                    dhxGridStmnot001.deleteRow(rowId);
                    dhxGridStmnot001.selectRow(rowNum);
                }
                else dhxDataProcessorStmnot001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelStmnot001 = function () {
    var titStmnot001 = 'ERP게시판관리'; /* gf_LocaleTrans('default', 'titStmnot001') */
    var jsonParameter = {
        noticeId : gf_FormGetValue('searchFormStmnot001', 'noticeId', 'text')
    };
    var header = [[
        '공지 ID' /* gf_LocaleTrans('default', 'titNoticeId') */,
        '공지 종류 공통코드(C195)' /* gf_LocaleTrans('default', 'titNoticeKind') */,
        '공지대상구분(C198)' /* gf_LocaleTrans('default', 'titNoticeTrgetSe') */,
        '공지 제목' /* gf_LocaleTrans('default', 'titNoticeTit') */,
        '공지 내용' /* gf_LocaleTrans('default', 'titNoticeCn') */,
        '작성자 ID' /* gf_LocaleTrans('default', 'titWriterId') */,
        '첨부파일 번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        'OPEN 여부' /* gf_LocaleTrans('default', 'titOpenAt') */,
        '조회 수' /* gf_LocaleTrans('default', 'titInqireCo') */,
        '삭제 여부 - 삭제는 안하고 삭제 여부만 1로 변' /* gf_LocaleTrans('default', 'titDeleteAt') */,
        '삭제 ID' /* gf_LocaleTrans('default', 'titDeleteId') */,
        '삭제 일시' /* gf_LocaleTrans('default', 'titDeleteDt') */
    ]];
    var dataId = [[ 'noticeId', 'noticeKind', 'noticeTrgetSe', 'noticeTit', 'noticeCn', 'writerId', 'atchmnflNo', 'openAt', 'inqireCo', 'deleteAt', 'deleteId', 'deleteDt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmnot001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmnot001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('stmnot001/excelStmnot001', jsonParameter);
};
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="bgnRequstDe" || e.target.id =="endRequstDe") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

//기간달력
function fn_Calendar(){
	//달력 생성
	searchCalendar = new dhtmlXDoubleCalendar("date2_cal");
	
	searchCalendar.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#bgnRequstDe').val(dateFormat(searchCalendar.leftCalendar.getDate()));
        	$('#endRequstDe').val(dateFormat(searchCalendar.rightCalendar.getDate()));
        	searchCalendar.hide();
        }
    });
	
	//금일 날짜표시
//	gf_SetDateIntervalRadio('bgnRequstDe', 'endRequstDe', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	$('input[name="bgnRequstDe"]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
	$('input[name="endRequstDe"]').val( (new Date()).format('YYYY-MM-30') );
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchCalendar.leftCalendar.setDate(gf_FormGetValue('searchFormStmnot001', 'bgnRequstDe', 'text'));
	searchCalendar.rightCalendar.setDate(gf_FormGetValue('searchFormStmnot001', 'endRequstDe', 'text'));	
	searchCalendar.leftCalendar.loadUserLanguage("ko");
	searchCalendar.rightCalendar.loadUserLanguage("ko");
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
//사원 검색 팝업
function fn_CallbackPopEmp(data){
	console.log(data.empno + " : " + data.korNm);
}
function fn_SearchEmpCode(){
	var empno = gf_FormGetValue('searchFormStmnot001', 'searchEmpno', 'text');
	var korNm = gf_FormGetValue('searchFormStmnot001', 'searchEmpNm', 'text');
	
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : gBplcCode
	};
	gf_Transaction('', 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}
function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
	 	gf_FormSetValue('searchFormStmnot001', 'searchEmpno', data.empno, 'text');
	 	gf_FormSetValue('searchFormStmnot001', 'searchEmpNm', data.korNm, 'text');
	 	fn_SearchStmnot001('');
 	}
  	else {
	  	//Popup 호출
	  	gf_EmpPopup("searchFormStmnot001","searchEmpnoStmnot001","searchEmpNmStmnot001", gBplcCode, "Y");
  	}
}
//부서 검색 팝업
function fn_CallbackPopDept(data){
	console.log(data.deptCode + " : " + data.deptKorNm);
}
function fn_SearchDeptCode(){
	var deptCode = gf_FormGetValue('searchFormStmnot001', 'searchDeptNo', 'text');
	var deptKorNm = gf_FormGetValue('searchFormStmnot001', 'searchDeptNm', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : gBplcCode
	};
	gf_Transaction('list_type01', 'dept/searchDept', jsonParameter, 'fn_CallbackSearchDeptCode', false, 'GET');
}
function fn_CallbackSearchDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormStmnot001', 'searchDeptNo', data.deptCode, 'text');
   		gf_FormSetValue('searchFormStmnot001', 'searchDeptNm', data.deptKorNm, 'text');
        fn_SearchStmnot001('');
    } 
    else {
    	//Popup 호출
    	gf_DeptPopup("searchFormStmnot001","searchDeptNoStmnot001","searchDeptNmStmnot001", gBplcCode, "Y"); 
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
    $('#saveFormStmnot001 #noticeIdSaveFormStmnot001').parent().append(
    '<div class="error" id="noticeIdSaveFormStmnot001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupStmnot001 = function(noticeId){
    if(!gf_IsNull(noticeId)) {
        var jsonParameter = {
            noticeId : noticeId
        };
        var dataSource = gf_NoAsyncTransaction('stmnot001/findStmnot001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.noticeId)) {
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
    var checkNoticeId;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Stmnot001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Stmnot001 = 0;
        save_Row_Ids_Stmnot001 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Stmnot001 = rowNum;
        save_Row_Ids_Stmnot001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Stmnot001 = rowNum;
        save_Row_Ids_Stmnot001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'noticeId', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'noticeId');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkNoticeId = gf_DhxGetValue(dhxGridObjet, rowId, 'noticeId', 'grid');
                    if(!gf_IsNull(checkNoticeId)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var noticeId = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'noticeId', 'grid');
                            if(((noticeId == checkNoticeId)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'noticeId');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupStmnot001( checkNoticeId )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'noticeId');
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
        dhxGridStmnot001.selectRowById(validFalseFistRowId);
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

var fn_Stmnot001Popup = function (formId, codeId, codeNmId, param) {
	
	var userId = ""; 
	var title  = "공지사항";
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindowsPrgRequst;
	if($('body').find("div[id='bpopupStmnotReg']").size() <= 0) {
		$('body').append("<div id='bpopupStmnotReg' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupStmnotReg').bPopup({
		onOpen:function(){
			
			dhxWindowsPrgRequst = new dhtmlXWindows();
			var id 		= 'bpopupStmnotReg';
			var ajaxUrl = gv_ContextPath+'/stmnot001/popup/stmmot001Popup/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 800;
			var height	= 570;
			
			dhxWindowObj = dhxWindowsPrgRequst.createWindow(id, left, top, width, height);
			dhxWindowsPrgRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupStmnotReg .b-close').click();
			});
		},
		onClose:function(){
			dhxWindowsPrgRequst.unload();
			$('body').find("div[id='bpopupStmnotReg']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};


