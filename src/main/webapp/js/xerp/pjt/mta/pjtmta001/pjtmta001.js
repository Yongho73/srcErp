/**
 *    프로그램       : 유지보수요청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.06
 *    사용테이블      : PJT_MNTNCE_REQUST
 * sourceGen version : 2020.07.16.01 (2020.08.06)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pjtmta001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pjtmta001 = 0;  //그리드 위치 상태 
var save_All_Sta_Pjtmta001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pjtmta001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pjtmta001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pjtmta001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pjtmta001 = 0;  //그리드 삭제 수량 
var dhxGridPjtmta001;  //그리드 객체
var dhxGridPjtmta001Pjt;  //그리드 객체
var eventIdPjtmta001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPjtmta001;  //DataProcessor 객체
 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPjtmta001();
    cf_SetComponentsPjtmta001();
       cf_SetEventListenerPjtmta001();
       cf_InitFormPjtmta001();
       cf_SetBindingPjtmta001();
    
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPjtmta001 = function() {
    gf_SetMenuPath();
    $('#menu_path').append("&nbsp;&nbsp;<button class='apiButton' id='popupTest'><p style='text-align: center;'>유지보수요청</p></button>");
    
    $("#saveFormPjtmta001").validate({ errorElement: 'div', ignore: '' });
    
    //기간달력 이벤트 추가
    $('#searchFormPjtmta001 #bgnRequstDe').unbind('click').bind('click', function(event){
        dhxCCalendarDate2.show();
    });
    $('#searchFormPjtmta001 #endRequstDe').unbind('click').bind('click', function(event){
        dhxCCalendarDate2.show();
    });
    
    dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");  
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        if(side == "right"){
            $('#bgnRequstDe').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
            $('#endRequstDe').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
            dhxCCalendarDate2.hide();
        }
    });
    //dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormPjtProject', 'date22', 'text'));
    dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
    dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko"); 
    
    gf_FormSetValue("searchFormPjtmta001", "comptAt", "0", "combo");
    $('#comptAt').val('0');
    
    
    gf_ComboCode('divComboSttusSe', 'searchComboSttusSe', 'searchComboSttusSe', 'search', 'C205', '' , '', '', 'ordr', ''); //업무구분
    $('#searchComboSttusSe').val('100');
    gf_FormSetValue("searchFormPjtmta001", "searchComboSttusSe", "100", "combo");

};

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="bgnRequstDe" || e.target.id =="endRequstDe") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

var cf_SetComponentsPjtmta001 = function() {
    var dhxGridPjtmta001HeaderInfo = [];
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '80', 'center', 'cntr', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('요청메뉴', '150', 'left', 'str', 'ro', false, 'requstMenu', '', ''));
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('요청내용', '600', 'left', 'str', 'ro', false, 'requstCn', '', '')); /* gf_LocaleTrans('default', 'titRequstCn') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('요청일자', '100', 'center', 'str', 'ro', false, 'requstDt', '', '')); /* gf_LocaleTrans('default', 'titRequstDt') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('완료요구일자', '100', 'center', 'str', 'ro', false, 'comptRequstDt', '', '')); /* gf_LocaleTrans('default', 'titComptRequstDt') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('완료일자', '100', 'center', 'str', 'ro', false, 'comptDe', '', '')); /* gf_LocaleTrans('default', 'titProjectSn') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('요청상태', '100', 'center', 'str', 'coro', false, 'requstStep', '', '')); /* gf_LocaleTrans('default', 'titRequstStep') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('우선순위', '60', 'center', 'str', 'coro', false, 'priorRank', '', '')); /* gf_LocaleTrans('default', 'titPriorRank') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('요청 순번', '100', 'right', 'int', 'ro', true, 'requstSn', '', '')); /* gf_LocaleTrans('default', 'titRequstSn') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('요청 유형', '100', 'left', 'str', 'coro', true, 'requstTy', '', '')); /* gf_LocaleTrans('default', 'titRequstTy') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('완료 승인 여부', '100', 'center', 'str', 'ro', true, 'comptConfmAt', '', '')); /* gf_LocaleTrans('default', 'titComptConfmAt') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '100', 'center', 'str', 'ro', true, 'projectSn', '', '')); /* gf_LocaleTrans('default', 'titComptConfmAt') */
    dhxGridPjtmta001HeaderInfo.push(gf_MakeDhxGridHeader('*', '0', 'center', 'str', 'ro', true, 'requstSn', '', '')); /* gf_LocaleTrans('default', 'titComptConfmAt') */
  
    dhxGridPjtmta001 = gf_MakeDhxGrid('dataListPjtmta001', dhxGridPjtmta001HeaderInfo, true, false, false);
    dhxGridPjtmta001.setEditable(false);

	dhxGridPjtmta001.enableAutoWidth(false);
	dhxGridPjtmta001.setColumnMinWidth(80,12); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtmta001.adjustColumnSize(0);	

    var jsonParameter = {codekindCode : "C205",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridPjtmta001, dhxGridPjtmta001.getColIndexById("requstStep"), dataSource.data); /* 그리드콤보*/
    var jsonParameter = {codekindCode : "C923",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridPjtmta001, dhxGridPjtmta001.getColIndexById("priorRank"), dataSource.data); /* 그리드콤보*/
    var jsonParameter = {codekindCode : "C922",exceptCode :"",sortOrder :"ordr" };
    var dataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', jsonParameter, '');
    gf_ComboDataSet(dhxGridPjtmta001, dhxGridPjtmta001.getColIndexById("requstTy"), dataSource.data); /* 그리드콤보*/
    
    fn_SetComponentsPjtmta001Pjt();
    return true; 
};

var fn_SetComponentsPjtmta001Pjt = function() {
	var dhxGridPjtmta001PjtHeaderInfo = [];
    dhxGridPjtmta001PjtHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPjtmta001PjtHeaderInfo.push(gf_MakeDhxGridHeader('거래처', '150', 'left', 'str', 'ro', false, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titProjectSn') */
    dhxGridPjtmta001PjtHeaderInfo.push(gf_MakeDhxGridHeader('프로젝트명', '300', 'left', 'str', 'ro', false, 'projectNm', '', '')); /* gf_LocaleTrans('default', 'titRequstSn') */
    dhxGridPjtmta001PjtHeaderInfo.push(gf_MakeDhxGridHeader('상태', '60', 'center', 'str', 'ro', false, 'comptAt', '', '')); /* gf_LocaleTrans('default', 'titRequstDt') */
    dhxGridPjtmta001PjtHeaderInfo.push(gf_MakeDhxGridHeader('프로젝트순번', '100', 'left', 'str', 'ro', true, 'projectSn', '', '')); /* gf_LocaleTrans('default', 'titRequstDt') */
    dhxGridPjtmta001Pjt = gf_MakeDhxGrid('dataListPjtmta001Pjt', dhxGridPjtmta001PjtHeaderInfo, true, false, false);
    dhxGridPjtmta001Pjt.enableAutoWidth(false);
    dhxGridPjtmta001Pjt.setEditable(true);

    dhxGridPjtmta001Pjt.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true;
};

var cf_SetEventListenerPjtmta001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPjtmta001 = gf_GridDetachEvent(dhxGridPjtmta001, eventIdPjtmta001);
    eventId = dhxGridPjtmta001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
       
    });
    eventIdPjtmta001.push(eventId);
    eventId = dhxGridPjtmta001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pjtmta001SortGridList(ind, type, direction); 
    });
    eventIdPjtmta001.push(eventId);
    eventId = dhxGridPjtmta001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPjtmta001.push(eventId);
    eventId = dhxGridPjtmta001Pjt.attachEvent("onRowSelect", function(id, ind){
		save_Row_Num_Pjtmta001 = id;
    	fn_SearchPjtmta001();
    });
    eventIdPjtmta001.push(eventId);
	eventId = dhxGridPjtmta001Pjt.attachEvent("onRowDblClicked", function(rId,cInd){
    	var param = '';
    	if(!gf_IsNull(rId)){
        	var projectSn = gf_DhxGetValue(dhxGridPjtmta001Pjt, rId, 'projectSn', 'grid');
//        	var projectNm = gf_DhxGetValue(dhxGridPjtmta001Pjt, rowIdPjt, 'projectNm', 'grid');
//        	var bcncNm = gf_DhxGetValue(dhxGridPjtmta001Pjt, rowIdPjt, 'bcncNm', 'grid');
//        	param = "projectSn="+projectSn+"&projectNm="+encodeURI(projectNm)+"&bcncNm="+encodeURI(bcncNm);
			param = "projectSn="+projectSn;
    	} else {
    		param = "";
    	}
    	fn_MtaRequstPopup('form1','','', param);
	    return true;
	});
    eventIdPjtmta001.push(eventId);
    eventId = dhxGridPjtmta001.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPjtmta001.push(eventId);
    eventId = dhxGridPjtmta001.attachEvent("onRowDblClicked", function(rId,cInd){
    	var projectSn  = dhxGridPjtmta001.cells(rId, dhxGridPjtmta001.getColIndexById("projectSn")).getValue();
    	var requstSn   = dhxGridPjtmta001.cells(rId, dhxGridPjtmta001.getColIndexById("requstSn")).getValue();
    	
    	var param = "projectSn=" + projectSn + "&requstSn=" + requstSn;
    	fn_MtaSearchPopup('form1','','', param);
    });   
    eventIdPjtmta001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPjtmta001').unbind('click').bind('click', function(event){
    	var rowIdPjt = dhxGridPjtmta001Pjt.getSelectedRowId();
    	var param = '';
    	if(!gf_IsNull(rowIdPjt)){
        	var projectSn = gf_DhxGetValue(dhxGridPjtmta001Pjt, rowIdPjt, 'projectSn', 'grid');
//        	var projectNm = gf_DhxGetValue(dhxGridPjtmta001Pjt, rowIdPjt, 'projectNm', 'grid');
//        	var bcncNm = gf_DhxGetValue(dhxGridPjtmta001Pjt, rowIdPjt, 'bcncNm', 'grid');
//        	param = "projectSn="+projectSn+"&projectNm="+encodeURI(projectNm)+"&bcncNm="+encodeURI(bcncNm);
			param = "projectSn="+projectSn;
    	} else {
    		param = "";
    	}
    	fn_MtaRequstPopup('form1','','', param);
    });
    $('#btnExcelPjtmta001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPjtmta001();
    });
    $('#btnSearchPjtmta001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPjtmta001Pjt();
    });
    $('#btnResetPjtmta001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
		save_Row_Num_Pjtmta001 = 0;
        cf_InitFormPjtmta001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPjtmta001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPjtmta001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPjtmta001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    
    $('#btnCompNmSearch').unbind('click').bind('click', function(event){
    	gf_CustomerPopup("searchFormPjtmta001","compCd","compNm", '1000', "Y", null);
    });
    
	/*유지보수 요청 버튼*/
    $('#popupTest').unbind('click').bind('click', function() {
		var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    	var popupX = (window.screen.width/2)-(1000/2);
    	var popupY = (window.screen.height/2)-(650/2)-50;
		var menuNm = encodeURI('유지보수요청');
		var userNm = encodeURI(userInfo.data.userNm);
    	var apiUrl = 'http://www.dbvision.co.kr/homepage/pjtmta/supportDirect/list?projectSn=38e5cb94f4d2a1dfb4431f015fea6ced&bcncCode=e16c124b7d96f6b1&projectId=00106b3accc86690'
		apiUrl+='&menuNm='+menuNm+'&userNm='+userNm;
    	window.open(apiUrl,'_blank', 'width=1000px, height=650px, toolbars=no, scrollbars=yes, left='+popupX+',top='+popupY);
    });
    
};

var cf_InitFormPjtmta001 = function() {
    $('#searchFormPjtmta001').resetForm();
    $('#comptAt').val('0');
    gf_FormSetValue("searchFormPjtmta001", "searchComboSttusSe", "100", "combo");
    $('#searchComboSttusSe').val('100');
};

var cf_SetBindingPjtmta001 = function() {
    fn_SearchPjtmta001Pjt();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션 맞춥시다.!!
 ******************************************************************************************************************************/
/*
 *	유지보수 프로젝트 목록 조회
 */
var fn_SearchPjtmta001Pjt = function(userId) {
	
	var bcncNm = gf_FormGetValue('searchFormPjtmta001', 'compNm', 'text'); 
	
    var jsonParameter = {
    		bcncNm : bcncNm,
    		comptAt : gf_FormGetValue('searchFormPjtmta001', 'comptAt', 'combo'),
    };
    gf_Transaction(userId, 'pjtmta001/searchPjtmta001Project', jsonParameter, 'fn_CallbackSearchPjtmta001Pjt', false, 'GET');
};
var fn_CallbackSearchPjtmta001Pjt = function(strSvcID, targetID, data) {
	dhxGridPjtmta001Pjt.clearAll();
    //if(cf_SetComponentsPjtmta001()){ 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPjtmta001Pjt');
            dhxGridPjtmta001Pjt.parse(data.data.records, 'js');
			if(0!=save_Row_Num_Pjtmta001){
				dhxGridPjtmta001Pjt.selectRow(save_Row_Num_Pjtmta001-1);
			} else {
				dhxGridPjtmta001Pjt.selectRow(0);
			}
        } else {
            gf_NoFoundDataOnGridMsg('dataListPjtmta001Pjt');
        }
        $("#spanCntSearchFormPjtmta001Pjt").text(data.data.records.length);
        cf_SetEventListenerPjtmta001();
        if(data.data.records.length > 0) {	//유지보수 프로젝트가 있을경우
        	fn_SearchPjtmta001();
        } else {
        	dhxGridPjtmta001.clearAll();
        	gf_NoFoundDataOnGridMsg('dataListPjtmta001');
        }
        
    //} 
};
/**
 * 유지보수 요청 목록 조회
 */
var fn_SearchPjtmta001 = function(userId) {
	var rowId = dhxGridPjtmta001Pjt.getSelectedRowId();
	var projectSn = gf_DhxGetValue(dhxGridPjtmta001Pjt, rowId, 'projectSn', 'grid');
	
    var jsonParameter = {
        projectSn : projectSn,
        requstSn : gf_FormGetValue('searchFormPjtmta001', 'requstSn', 'text'),
        bgnRequstDe : gf_FormGetValue('searchFormPjtmta001', 'bgnRequstDe', 'text').replaceAll('-',''),
        endRequstDe : gf_FormGetValue('searchFormPjtmta001', 'endRequstDe', 'text').replaceAll('-',''),
        sttusSe : gf_FormGetValue('searchFormPjtmta001', 'searchComboSttusSe', 'combo'),
        comptConfmAt : gf_FormGetValue('searchFormPjtmta001', 'comptConfmAt', 'combo'),     
		requstCn : gf_FormGetValue('searchFormPjtmta001', 'requstCn', 'text'),
    };
    gf_Transaction(userId, 'pjtmta001/searchPjtmta001', jsonParameter, 'fn_CallbackSearchPjtmta001', false, 'GET');
};

var fn_CallbackSearchPjtmta001 = function(strSvcID, targetID, data) {
    dhxGridPjtmta001.clearAll();
    //if(cf_SetComponentsPjtmta001()){ 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPjtmta001');
            dhxGridPjtmta001.parse(data.data.records, 'js');
        } else {
            gf_NoFoundDataOnGridMsg('dataListPjtmta001');
        }
        $("#spanCntSearchFormPjtmta001").text(data.data.records.length);
    //} 
};
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pjtmta001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPjtmta001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPjtmta001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPjtmta001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPjtmta001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPjtmta001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPjtmta001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPjtmta001', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtmta001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPjtmta001.setSortImgState(false); 
            gf_FormSetValue('searchFormPjtmta001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPjtmta001', 'sortColumId', '', 'text'); 
            dhxGridPjtmta001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPjtmta001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPjtmta001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPjtmta001', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtmta001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePjtmta001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pjtmta001 = 0; 
    save_Edt_Cnt_Pjtmta001 = 0; 
    save_Del_Cnt_Pjtmta001 = 0; 
    dhxGridPjtmta001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPjtmta001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPjtmta001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pjtmta001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pjtmta001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pjtmta001 += 1; 
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
        save_All_Sta_Pjtmta001 = 0; 
        if(save_Add_Cnt_Pjtmta001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pjtmta001 + "건";
            save_All_Sta_Pjtmta001 = 1; 
        } 
        if(save_Edt_Cnt_Pjtmta001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pjtmta001 + "건"; 
        } 
        if(save_Del_Cnt_Pjtmta001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pjtmta001 + "건"; 
            save_All_Sta_Pjtmta001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPjtmta001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPjtmta001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPjtmta001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePjtmta001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePjtmta001_Send = function() {
  
}
/**
 * 삭제
 */
var fn_RemovePjtmta001 = function() {
  
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPjtmta001 = function () {
    var titPjtmta001 = '유지보수 프로젝트'; /* gf_LocaleTrans('default', 'titPjtmta001') */
    var jsonParameter = {
    		bcncNm : gf_FormGetValue('searchFormPjtmta001', 'compNm', 'text'),
    		comptAt : gf_FormGetValue('searchFormPjtmta001', 'comptAt', 'combo')
    };
    var header = [[
        '프로젝트 순번' /* gf_LocaleTrans('default', 'titProjectSn') */,
        '거래처' /* gf_LocaleTrans('default', 'titRequstSn') */,
        '프로젝트명' /* gf_LocaleTrans('default', 'titRequstStep') */,
        '상태'
    ]];
    var dataId = [[ 'projectSn', 'bcncNm', 'projectNm', 'comptAt' ]];
    var dataAlign = [[ 'center', 'left', 'left', 'center' ]];
    var sheetNm = [[ titPjtmta001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPjtmta001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pjtmta001/excelPjtmta001', jsonParameter);
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
    $('#saveFormPjtmta001 #projectSnSaveFormPjtmta001').parent().append(
    '<div class="error" id="projectSnSaveFormPjtmta001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormPjtmta001 #requstSnSaveFormPjtmta001').parent().append(
    '<div class="error" id="requstSnSaveFormPjtmta001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPjtmta001 = function(projectSn, requstSn){
    if(!gf_IsNull(projectSn) && !gf_IsNull(requstSn)) {
        var jsonParameter = {
            projectSn : projectSn,
            requstSn : requstSn
        };
        var dataSource = gf_NoAsyncTransaction('pjtmta001/findPjtmta001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.projectSn) && gf_IsNull(data.requstSn)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}

//등록화면 팝업창 
var fn_MtaRequstPopup = function (formId, codeId, codeNmId, param) {
	
	var userId = ""; 
	var title  = "유지보수요청";
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindowsPrgRequst;
	if($('body').find("div[id='bpopupMtaRequst']").size() <= 0) {
		$('body').append("<div id='bpopupMtaRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupMtaRequst').bPopup({
		onOpen:function(){
			
			dhxWindowsPrgRequst = new dhtmlXWindows();
			var id 		= 'bpopupMtaRequst';
			var ajaxUrl = gv_ContextPath+'/pjtmta001/popup/findPjtMtaRequst/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 920;
			var height	= 550;
			
			dhxWindowObj = dhxWindowsPrgRequst.createWindow(id, left, top, width, height);
			dhxWindowsPrgRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupMtaRequst .b-close').click();
				fn_SearchPjtmta001();
			});
		},
		onClose:function(){
			dhxWindowsPrgRequst.unload();
			$('body').find("div[id='bpopupMtaRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

//조회화면 팝업창 
var fn_MtaSearchPopup = function (formId, codeId, codeNmId, param) {
	
	var userId = ""; 
	var title  = "유지보수상세조회";
	
	var dhxWindowObj;
	var dhxWindowsPrgSearch;
	if($('body').find("div[id='bpopupMtaSearch']").size() <= 0) {
		$('body').append("<div id='bpopupMtaSearch' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupMtaSearch').bPopup({
		onOpen:function(){
			
			dhxWindowsPrgSearch = new dhtmlXWindows();
			var id 		= 'bpopupMtaSearch';
			var ajaxUrl = gv_ContextPath+'/pjtmta001/popup/findPjtMtaSearch/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 1000;
			var height	= 600;
			
			dhxWindowObj = dhxWindowsPrgSearch.createWindow(id, left, top, width, height);
			dhxWindowsPrgSearch.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupMtaSearch .b-close').click();
				fn_SearchPjtmta001();
			});
		},
		onClose:function(){
			dhxWindowsPrgSearch.unload();
			$('body').find("div[id='bpopupMtaSearch']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

var gf_CustomerPopup = function (formId, codeId, codeNmId, bcncSe, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "거래처 조회";
	var customerInfo = "customerInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if ( !gf_IsNull(strCallbackFunc) ) {
    	if(typeof(strCallbackFunc) == "string"){
	    	callFunction = eval(strCallbackFunc);
	    	if ( typeof callFunction != "function" ) {
	    		gf_DivMsgAlert("call back function "+ strCallbackFunc +" 이 구현되지 않습니다.!!");
	          	return false;
	        }
    	}else{
	    	callFunction = strCallbackFunc;
    	}
    }	

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof bcncSe == "undefined" || bcncSe == null){
		bcncSe = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='contractCompanyPopup']").size() <= 0) {
		$('body').append("<div id='contractCompanyPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' bcncSe='" + bcncSe + "' customerInfo='" + customerInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#contractCompanyPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'contractCompanyPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/searchPjtCustomer/view';
			var left	= 0;
			var top		= 0;
			var width	= 760;
			var height	= 630;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#contractCompanyPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($customerInfo);
			}
			
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='contractCompanyPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

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
}; 