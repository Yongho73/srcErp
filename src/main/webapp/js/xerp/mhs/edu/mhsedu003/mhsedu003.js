/**
 *    프로그램       : 교육결과보고 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.09
 *    사용테이블      : MHS_EDU_RESULT_REPORT
 * sourceGen version : 2020.08.06.01 (2020.09.09)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhsedu003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhsedu003 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhsedu003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhsedu003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhsedu003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhsedu003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhsedu003 = 0;  //그리드 삭제 수량 
var dhxGridMhsedu003;  //그리드 객체
var eventIdMhsedu003 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhsedu003;  //DataProcessor 객체

//세션정보 
var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');

 
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhsedu003();
    if(cf_SetComponentsMhsedu003()){
       cf_SetEventListenerMhsedu003();
       cf_InitFormMhsedu003();
       cf_SetBindingMhsedu003();
       fn_FileUploadPrgEvent();	 //파일첨부
       if(init()){   // 초기화
    	   init1();  
     		Searchinit(); // 조회 기간달력
     	}
    }
});

function init(){
    
    //기간달력 이벤트 추가
    $('#searchFormMhsedu003 #date2').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxSearchCCalendarDate2.show();
    });
    
	//기간달력 이벤트 추가
    $('#saveFormMhsedu003 .input_calen').unbind('click').bind('click', function(event){
    	dateChk($(this));
    });
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
    
}
//기간달력
function init1(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"eduSdt", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	dhxCCalendarDate1.attachEvent("onClick" , function(){
		gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduSdt', gf_FormGetValue('saveFormMhsedu003', 'eduSdt', 'text'));
	});
	
	//금일 날짜표시 
	$('#eduSdt').val(nowDate);
	
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"eduEdt", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	dhxCCalendarDate1.attachEvent("onClick" , function(){
		gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduEdt', gf_FormGetValue('saveFormMhsedu003', 'eduEdt', 'text'));
		deCount();
	});
	$('#eduEdt').val(nowDate);
}

//기간달력
function Searchinit(){
	//달력 생성
	dhxSearchCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
	dhxSearchCCalendarDate2.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#stDate').val(dateFormat(dhxSearchCCalendarDate2.leftCalendar.getDate()));
        	$('#edDate').val(dateFormat(dhxSearchCCalendarDate2.rightCalendar.getDate()));
        	dhxSearchCCalendarDate2.hide();
        }
    });
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('stDate', 'edDate', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxSearchCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormMhsedu003', 'stDate', 'text'));
	dhxSearchCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormMhsedu003', 'edDate', 'text'));	
	dhxSearchCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxSearchCCalendarDate2.rightCalendar.loadUserLanguage("ko");
}

function deCount() {
	var sdd = gf_FormGetValue('saveFormMhsedu003', 'eduSdt', 'text');
	var edd = gf_FormGetValue('saveFormMhsedu003', 'eduEdt', 'text');
	if(sdd > edd){
		gf_DivMsgAlert("날짜를 다시 선택해주세요");
		$('#eduEdt').val(nowDate);
		return false;
	}
	var ar1 = sdd.split('-');
	var ar2 = edd.split('-');
	var da1 = new Date(ar1[0], ar1[1], ar1[2]);
	var da2 = new Date(ar2[0], ar2[1], ar2[2]);
	var dif = da2 - da1;
	var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
	var cMonth = cDay * 30;// 월 만듬
	var cYear = cMonth * 12; // 년 만듬
	if (sdd && edd) {
		// document.getElementById('layoffDaycntSaveFormMhshrd006').value =
		// parseInt(dif/cDay)
		gf_FormSetValue('saveFormMhsedu003', 'eduDaycnt', parseInt(dif / cDay) + 1, 'text');
	};
}
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhsedu003 = function() {
    gf_SetMenuPath();
    $("#saveFormMhsedu003").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboeduCls','eduCls','eduCls', 'sel', 'C206', '' , '', '', 'ordr', '','',''); // 교육분류
    gf_ComboCode('divComboeduKind','eduKind','eduKind', 'sel', 'C114', '' , '', '', 'ordr', '','',''); // 교육종류
    gf_ComboCode('divComboeduMustAt','eduMustAt','eduMustAt', 'sel', 'C112', '' , '', '', 'ordr', '','',''); // 교육필수여부
    gf_ComboCode('divComboeduAmtBurdenSe','eduAmtBurdenSe','eduAmtBurdenSe', 'sel', 'C111', '' , '', '', 'ordr', '','','');
    gf_ComboCode('divComboinnerExtrlEduSe','innerExtrlEduSe','innerExtrlEduSe', 'sel', 'C208', '' , '', '', 'ordr', '','',''); // 내외부교육구분
    gf_ComboCode('divComboelctsctSttusCode','elctsctSttusCode','elctsctSttusCode', 'sel', 'EA004', '' , '', '', 'ordr', '','','');
    gf_ComboCode('divCombostsfdgCode','stsfdgCode','stsfdgCode', 'sel', 'C926', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('divComboSearchelctsctSttusCode','searchelctsctSttusCode','searchelctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', '','','');
    
    
    $("#indvdlEducostSaveFormMhsedu003").number(true);
    $("#episRetunamtSaveFormMhsedu003").number(true);
    
};

var cf_SetComponentsMhsedu003 = function() {
    var dhxGridMhsedu003HeaderInfo = [];
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '100', 'center', 'str', 'ro', false, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육명', '100', 'center', 'str', 'ro', false, 'educourseNm', '', '')); 
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육분류', '100', 'center', 'str', 'coro', false, 'eduCls', '', '')); 
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육종류', '100', 'center', 'str', 'coro', false, 'eduKind', '', '')); 
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육필수여부', '100', 'center', 'str', 'coro', false, 'eduMustAt', '', ''));
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육비용부담', '100', 'center', 'str', 'coro', false, 'eduAmtBurdenSe', '', ''));
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('내외부교육구분', '100', 'center', 'str', 'coro', false, 'innerExtrlEduSe', '', ''));
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('수료증발행여뷰', '100', 'center', 'str', 'ch', false, 'cochrgedocumentIsuAt', '', ''));
    
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '100', 'right', 'int', 'ro', false, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('결과 전자결재 구분 순번', '100', 'right', 'int', 'ro', false, 'resultElctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titResultElctsctSeSn') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작일자', '100', 'left', 'str', 'ro', false, 'eduSdt', '', '')); /* gf_LocaleTrans('default', 'titEduSdt') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작시간', '100', 'left', 'str', 'ro', false, 'eduShr', '', '')); /* gf_LocaleTrans('default', 'titEduShr') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료일자', '100', 'left', 'str', 'ro', false, 'eduEdt', '', '')); /* gf_LocaleTrans('default', 'titEduEdt') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료시간', '100', 'left', 'str', 'ro', false, 'eduEhr', '', '')); /* gf_LocaleTrans('default', 'titEduEhr') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('총 이수 시간', '100', 'left', 'str', 'ro', false, 'totFinishTime', '', '')); /* gf_LocaleTrans('default', 'titTotFinishTime') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('총 교육비', '100', 'right', 'int', 'ro', false, 'totEducost', '', '')); /* gf_LocaleTrans('default', 'titTotEducost') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('고용보험 환급액', '100', 'right', 'int', 'ro', false, 'episRetunamt', '', '')); /* gf_LocaleTrans('default', 'titEpisRetunamt') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('개인 교육비', '100', 'right', 'int', 'ro', false, 'indvdlEducost', '', '')); /* gf_LocaleTrans('default', 'titIndvdlEducost') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('수료 여부', '100', 'center', 'str', 'ro', false, 'cochrgeAt', '', '')); /* gf_LocaleTrans('default', 'titCochrgeAt') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('만족도 코드 ', '100', 'center', 'str', 'coro', false, 'stsfdgCode', '', '')); /* gf_LocaleTrans('default', 'titStsfdgCode') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육 기관', '100', 'left', 'str', 'ro', false, 'eduInstt', '', '')); /* gf_LocaleTrans('default', 'titEduInstt') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육 기관 주소', '100', 'left', 'str', 'ro', false, 'eduInsttAdres', '', '')); /* gf_LocaleTrans('default', 'titEduInsttAdres') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교육 내용', '100', 'left', 'str', 'ro', false, 'eduCn', '', '')); /* gf_LocaleTrans('default', 'titEduCn') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('업무 적용 계획', '100', 'left', 'str', 'ro', false, 'jobApplcPlan', '', '')); /* gf_LocaleTrans('default', 'titJobApplcPlan') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('요청', '100', 'left', 'str', 'ro', false, 'requstDesc', '', '')); /* gf_LocaleTrans('default', 'titRequstDesc') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('설문조사 코드', '100', 'center', 'str', 'ro', false, 'qestnarCode', '', '')); /* gf_LocaleTrans('default', 'titQestnarCode') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('설문조사 결과 순번', '100', 'right', 'int', 'ro', false, 'qestnarResultSn', '', '')); /* gf_LocaleTrans('default', 'titQestnarResultSn') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('교통비', '100', 'right', 'int', 'ro', false, 'trnsportct', '', '')); /* gf_LocaleTrans('default', 'titTrnsportct') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('일비', '100', 'right', 'int', 'ro', false, 'dayct', '', '')); /* gf_LocaleTrans('default', 'titDayct') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('식대 비용', '100', 'right', 'int', 'ro', false, 'cgffdAmt', '', '')); /* gf_LocaleTrans('default', 'titCgffdAmt') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('숙박비', '100', 'right', 'int', 'ro', false, 'stayngct', '', '')); /* gf_LocaleTrans('default', 'titStayngct') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('비고', '100', 'left', 'str', 'ro', false, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '100', 'left', 'str', 'ro', false, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호 ', '100', 'left', 'str', 'ro', false, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드 ', '100', 'center', 'str', 'ro', false, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호  ', '100', 'center', 'str', 'ro', false, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhsedu003HeaderInfo.push(gf_MakeDhxGridHeader('반려 사유', '100', 'left', 'str', 'ro', false, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridMhsedu003 = gf_MakeDhxGrid('dataListMhsedu003', dhxGridMhsedu003HeaderInfo, true, false, false);
    dhxGridMhsedu003.enableAutoWidth(false);
    dhxGridMhsedu003.setEditable(true);
    
 // 교육분류
    var eduClsjsonParameter = {codekindCode : "C206",exceptCode :"",sortOrder :"asc" };
    var eduClsdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduClsjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu003, dhxGridMhsedu003.getColIndexById("eduCls"), eduClsdataSource.data, "sel");
    
    // 교육종류
    var eduKindjsonParameter = {codekindCode : "C114",exceptCode :"",sortOrder :"asc" };
    var eduKinddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduKindjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu003, dhxGridMhsedu003.getColIndexById("eduKind"), eduKinddataSource.data, "sel");
    
    // 교육필수여부
    var eduMustAtjsonParameter = {codekindCode : "C112",exceptCode :"",sortOrder :"asc" };
    var eduMustAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduMustAtjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu003, dhxGridMhsedu003.getColIndexById("eduMustAt"), eduMustAtdataSource.data, "sel");

    // 교육 비용 부담 구분
    var eduAmtBurdenSejsonParameter = {codekindCode : "C111",exceptCode :"",sortOrder :"asc" };
    var eduAmtBurdenSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduAmtBurdenSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu003, dhxGridMhsedu003.getColIndexById("eduAmtBurdenSe"), eduAmtBurdenSedataSource.data, "sel");
    
    // 내외부 교육 구분
    var innerExtrlEduSejsonParameter = {codekindCode : "C208",exceptCode :"",sortOrder :"asc" };
    var innerExtrlEduSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', innerExtrlEduSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu003, dhxGridMhsedu003.getColIndexById("innerExtrlEduSe"), innerExtrlEduSedataSource.data, "sel");
    
    // 처리상태
    var elctsctSttusCodejsonParameter = {codekindCode : "EA004",exceptCode :"",sortOrder :"asc" };
    var elctsctSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', elctsctSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu003, dhxGridMhsedu003.getColIndexById("elctsctSttusCode"), elctsctSttusCodedataSource.data, "sel");
    
    // 만족도조사 ( 유효성평가)
    var stsfdgCodejsonParameter = {codekindCode : "C926",exceptCode :"",sortOrder :"asc" };
    var stsfdgCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', stsfdgCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu003, dhxGridMhsedu003.getColIndexById("stsfdgCode"), stsfdgCodedataSource.data, "sel");
    

    dhxGridMhsedu003.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhsedu003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhsedu003 = gf_GridDetachEvent(dhxGridMhsedu003, eventIdMhsedu003);
    eventId = dhxGridMhsedu003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhsedu003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhsedu003.getColumnsNum();
            var rowNum = dhxGridMhsedu003.getRowsNum();
            var selectedId = dhxGridMhsedu003.getSelectedRowId();
            var ind        = dhxGridMhsedu003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu003.getRowIndex(selectedId);
            var type       = dhxGridMhsedu003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhsedu003.selectRow(0);
                    //fn_FindMhsedu003();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhsedu003.selectRow(rowIndex + 1);
                    fn_FindMhsedu003();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhsedu003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhsedu003.getSelectedRowId();
            var ind        = dhxGridMhsedu003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu003.getRowIndex(selectedId);
            var type       = dhxGridMhsedu003.getColType(ind);
            dhxGridMhsedu003.selectCell(rowIndex+1, ind);
            fn_FindMhsedu003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhsedu003.getSelectedRowId();
            var ind        = dhxGridMhsedu003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu003.getRowIndex(selectedId);
            var type       = dhxGridMhsedu003.getColType(ind);
            dhxGridMhsedu003.selectCell(rowIndex-1, ind);
            fn_FindMhsedu003();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu003.editCell();
            }
        }
        else return true;
    });
    eventIdMhsedu003.push(eventId);
    eventId = dhxGridMhsedu003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhsedu003SortGridList(ind, type, direction); 
    });
    eventIdMhsedu003.push(eventId);
    eventId = dhxGridMhsedu003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhsedu003.push(eventId);
    eventId = dhxGridMhsedu003.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhsedu003();
    });
    eventIdMhsedu003.push(eventId);
    eventId = dhxGridMhsedu003.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdMhsedu003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhsedu003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhsedu003()
    });
    $('#btnSaveMhsedu003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhsedu003();
    });
    $('#btnRemoveMhsedu003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhsedu003();
    });
    $('#btnExcelMhsedu003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhsedu003();
    });
    $('#btnSearchMhsedu003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhsedu003('');
    });
    $('#btnResetMhsedu003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhsedu003();
    });
    $('#btneducourseCodeSearch').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var qestnarCode  = dhxGridMhsedu003.cells(dhxGridMhsedu003.getSelectedRowId(), dhxGridMhsedu003.getColIndexById("qestnarCode")).getValue();
    	var param = "&qestnarCode=" + qestnarCode;
    	
    	fn_PopupDtlMhseduPop('form1','','', param);
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhsedu003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhsedu003').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsedu003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhsedu003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhsedu003",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsedu003 input[name="educourseCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'educourseCode', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="elctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'elctsctSeSn', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'empno', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="resultElctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'resultElctsctSeSn', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="eduSdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduSdt', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="eduShr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduShr', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="eduEdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduEdt', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="eduEhr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduEhr', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="totFinishTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'totFinishTime', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="totEducost"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'totEducost', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="episRetunamt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'episRetunamt', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="indvdlEducost"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'indvdlEducost', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="cochrgeAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'cochrgeAt', $(this).val());
    });
    $('#saveFormMhsedu003 select[name="stsfdgCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        
//        var stsfdgCode = gf_FormGetValue('saveFormMhsedu003', 'stsfdgCode', 'combo');
//        if(stsfdgCode == ''){
//        	$("#rmSaveFormMhsedu003").attr('disabled',false);
//        }else {
//        	$("#rmSaveFormMhsedu003").attr('disabled',true);
//        }
        
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'stsfdgCode', gf_FormGetValue('saveFormMhsedu003', 'stsfdgCode', 'combo'));
    });
    $('#saveFormMhsedu003 input[name="eduInstt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduInstt', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="eduInsttAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduInsttAdres', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="eduCn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduCn', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="jobApplcPlan"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'jobApplcPlan', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="requstDesc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'requstDesc', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="qestnarCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'qestnarCode', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="qestnarResultSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'qestnarResultSn', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="trnsportct"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'trnsportct', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="dayct"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'dayct', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="cgffdAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'cgffdAmt', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="stayngct"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'stayngct', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'rm', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="elctsctDocNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'elctsctDocNo', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'elctsctSttusCode', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="elctsctEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'elctsctEmpno', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="returnResn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'returnResn', $(this).val());
    });
    $('#saveFormMhsedu003 input[name="educourseNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'educourseNm', $(this).val());
    });
    $('#saveFormMhsedu003 select[name="eduCls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduCls', gf_FormGetValue('saveFormMhsedu003', 'eduCls', 'combo'));
    });
    $('#saveFormMhsedu003 select[name="eduKind"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduKind',  gf_FormGetValue('saveFormMhsedu003', 'eduKind', 'combo'));
    });
    
    $('#saveFormMhsedu003 select[name="eduMustAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduMustAt', gf_FormGetValue('saveFormMhsedu003', 'eduMustAt', 'combo'));
    });
    $('#saveFormMhsedu003 select[name="eduAmtBurdenSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'eduAmtBurdenSe', gf_FormGetValue('saveFormMhsedu003', 'eduAmtBurdenSe', 'combo'));
    });
    $('#saveFormMhsedu003 select[name="innerExtrlEduSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'innerExtrlEduSe', gf_FormGetValue('saveFormMhsedu003', 'innerExtrlEduSe', 'combo'));
    });
    $('#saveFormMhsedu003 input[name="cochrgedocumentIsuAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormMhsedu003', 'cochrgedocumentIsuAt', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridMhsedu003, dhxDataProcessorMhsedu003, 'cochrgedocumentIsuAt', val);
    });
    
    
    //사원 선택 Popup
    $('#searchFormMhsedu003 #btnempnoSearchMhsedu003').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhsedu003","empno","korNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#searchFormMhsedu003 #btnDeptCodeSearchMhsedu003').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhsedu003","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu003', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu003', 'empno', '', 'text');
	    }
		
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu003', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu003', 'deptCode', '', 'text');
	    }
    });
	
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhsedu003 = function() {
    $('#searchFormMhsedu003').resetForm();
    gf_FormSetValue("searchFormMhsedu003", "empno", userInfo.data.userEmpNo, 'text');
	gf_FormSetValue("searchFormMhsedu003", "korNm", userInfo.data.userNm, 'text');
	gf_FormSetValue("searchFormMhsedu003", "deptCodeNm", userInfo.data.userDeptNm, 'text');
	gf_FormSetValue("searchFormMhsedu003", "deptCode", userInfo.data.userDeptCode, 'text');
	$('#deptCode').prop('disabled', true);
    $('#deptCodeNm').prop('disabled', true);
    $('#empno').prop('disabled', true);
    $('#korNm').prop('disabled', true);
    $("#btnDeptCodeSearchMhsedu003").attr('disabled',true);
    $("#btnempnoSearchMhsedu003").attr('disabled',true);
    $("#elctsctSttusCodeSaveFormMhsedu003").attr('disabled',true);
    $("#cochrgedocumentIsuAtSaveFormMhsedu003").attr('disabled',true);
    $("#returnResnSaveFormMhsedu003").attr('disabled',true);
    $("#educourseNmSaveFormMhsedu003").attr('disabled',true);
    $("#eduCls").attr('disabled',true);
    $("#eduKind").attr('disabled',true);
    $("#eduMustAt").attr('disabled',true);
    $("#eduAmtBurdenSe").attr('disabled',true);
    $("#innerExtrlEduSe").attr('disabled',true);
    $("#elctsctSttusCode").attr('disabled',true);
};

var cf_SetBindingMhsedu003 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhsedu003('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhsedu003 = function(userId) {
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMhsedu003', 'empno', 'text'),
        elctsctSttusCode : gf_FormGetValue('searchFormMhsedu003', 'searchelctsctSttusCode', 'combo'),
        educourseNm : gf_FormGetValue('searchFormMhsedu003', 'educourseNm', 'text'),
        stDate : gf_FormGetValue('searchFormMhsedu003', 'stDate', 'text'),
        edDate : gf_FormGetValue('searchFormMhsedu003', 'edDate', 'text')
    };
    gf_Transaction(userId, 'mhsedu003/searchMhsedu003', jsonParameter, 'fn_CallbackSearchMhsedu003', false, 'GET');
};

var fn_CallbackSearchMhsedu003 = function(strSvcID, targetID, data) {
    //dhxGridMhsedu003.clearAll();
    dhxGridMhsedu003.destructor();
    if(cf_SetComponentsMhsedu003()){ 
        fn_DhxDataProcessorMhsedu003(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhsedu003');
            dhxGridMhsedu003.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhsedu003 == 0 && save_All_Sta_Mhsedu003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhsedu003.selectRow(0); 
            } else if(save_Row_Sta_Mhsedu003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhsedu003.selectRow(0);
            } else if(save_All_Sta_Mhsedu003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhsedu003.selectRow(save_Row_Num_Mhsedu003); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhsedu003.selectRow(save_Row_Num_Mhsedu003);   //개발자 수정 필요  
                //var findCell = dhxGridMhsedu003.findCell(save_Row_Ids_Mhsedu003, gf_GetDhxGridColumId(dhxGridMhsedu003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhsedu003.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhsedu003.selectRow(0);
                //} 
            } 
 
            fn_FindMhsedu003();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhsedu003');
            fn_InitInputFormMhsedu003();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhsedu003").text(data.data.records.length);
        cf_SetEventListenerMhsedu003();
    } 
};
var fn_DhxDataProcessorMhsedu003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhsedu003 = new dataProcessor(gv_ContextPath+'/mhsedu003/saveMhsedu003'); //lock feed url
    dhxDataProcessorMhsedu003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhsedu003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsedu003.init(dhxGridMhsedu003); //link dataprocessor to the grid
    dhxDataProcessorMhsedu003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhsedu003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhsedu003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhsedu003();
                    $("#checkAllMhsedu003").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhsedu003 = function() {
    var rId = dhxGridMhsedu003.getSelectedRowId();
    var status = dhxDataProcessorMhsedu003.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhsedu003", "educourseCode", gf_DhxGetValue(dhxGridMhsedu003, rId, 'educourseCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "elctsctSeSn", gf_DhxGetValue(dhxGridMhsedu003, rId, 'elctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "empno", gf_DhxGetValue(dhxGridMhsedu003, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "resultElctsctSeSn", gf_DhxGetValue(dhxGridMhsedu003, rId, 'resultElctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "eduSdt", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduSdt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "eduShr", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduShr',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "eduEdt", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduEdt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "eduEhr", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduEhr',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "totFinishTime", gf_DhxGetValue(dhxGridMhsedu003, rId, 'totFinishTime',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "totEducost", gf_DhxGetValue(dhxGridMhsedu003, rId, 'totEducost',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "episRetunamt", gf_DhxGetValue(dhxGridMhsedu003, rId, 'episRetunamt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "indvdlEducost", gf_DhxGetValue(dhxGridMhsedu003, rId, 'indvdlEducost',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "cochrgeAt", gf_DhxGetValue(dhxGridMhsedu003, rId, 'cochrgeAt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "stsfdgCode", gf_DhxGetValue(dhxGridMhsedu003, rId, 'stsfdgCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu003", "eduInstt", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduInstt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "eduInsttAdres", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduInsttAdres',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "eduCn", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduCn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "jobApplcPlan", gf_DhxGetValue(dhxGridMhsedu003, rId, 'jobApplcPlan',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "requstDesc", gf_DhxGetValue(dhxGridMhsedu003, rId, 'requstDesc',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "qestnarCode", gf_DhxGetValue(dhxGridMhsedu003, rId, 'qestnarCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "qestnarResultSn", gf_DhxGetValue(dhxGridMhsedu003, rId, 'qestnarResultSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "trnsportct", gf_DhxGetValue(dhxGridMhsedu003, rId, 'trnsportct',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "dayct", gf_DhxGetValue(dhxGridMhsedu003, rId, 'dayct',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "cgffdAmt", gf_DhxGetValue(dhxGridMhsedu003, rId, 'cgffdAmt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "stayngct", gf_DhxGetValue(dhxGridMhsedu003, rId, 'stayngct',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "rm", gf_DhxGetValue(dhxGridMhsedu003, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "atchmnflNo", gf_DhxGetValue(dhxGridMhsedu003, rId, 'atchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "elctsctDocNo", gf_DhxGetValue(dhxGridMhsedu003, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "elctsctSttusCode", gf_DhxGetValue(dhxGridMhsedu003, rId, 'elctsctSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "elctsctEmpno", gf_DhxGetValue(dhxGridMhsedu003, rId, 'elctsctEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "returnResn", gf_DhxGetValue(dhxGridMhsedu003, rId, 'returnResn',  'grid'), '');
    
    gf_FormSetValue("saveFormMhsedu003", "educourseNm", gf_DhxGetValue(dhxGridMhsedu003, rId, 'educourseNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu003", "eduCls", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduCls',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu003", "eduKind", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduKind',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu003", "eduMustAt", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduMustAt',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu003", "eduAmtBurdenSe", gf_DhxGetValue(dhxGridMhsedu003, rId, 'eduAmtBurdenSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu003", "innerExtrlEduSe", gf_DhxGetValue(dhxGridMhsedu003, rId, 'innerExtrlEduSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu003", "cochrgedocumentIsuAt", (( gf_DhxGetValue(dhxGridMhsedu003, rId, 'cochrgedocumentIsuAt',  'grid') == '1') ? true : false), 'chkbox');

    gf_FormSetValue('saveFormMhsedu003', 'atchmnfl', gf_DhxGetValue(dhxGridMhsedu003, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormMhsedu003', 'atchmnflList', gf_DhxGetValue(dhxGridMhsedu003, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일
    
    var jsonParameter = { 
    		atchFiles : gf_DhxGetValue(dhxGridMhsedu003, rId, 'atchmnflNo',  'grid') 
    		};
    gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
    
    if(status == 'inserted') {
        $('#saveFormMhsedu003 input[name="educourseCode"]').prop('disabled', false);
        $('#saveFormMhsedu003 input[name="elctsctSeSn"]').prop('disabled', false);
        $('#saveFormMhsedu003 input[name="empno"]').prop('disabled', false);
        $('#saveFormMhsedu003 input[name="resultElctsctSeSn"]').prop('disabled', false);
    } else {
        $('#saveFormMhsedu003 input[name="educourseCode"]').prop('disabled', true);
        $('#saveFormMhsedu003 input[name="elctsctSeSn"]').prop('disabled', true);
        $('#saveFormMhsedu003 input[name="empno"]').prop('disabled', true);
        $('#saveFormMhsedu003 input[name="resultElctsctSeSn"]').prop('disabled', true);
    }
    
    $("#elctsctSttusCodeSaveFormMhsedu003").attr('disabled',true);
    $("#cochrgedocumentIsuAtSaveFormMhsedu003").attr('disabled',true);
    $("#returnResnSaveFormMhsedu003").attr('disabled',true);
    $("#educourseNmSaveFormMhsedu003").attr('disabled',true);
    $("#eduCls").attr('disabled',true);
    $("#eduKind").attr('disabled',true);
    $("#eduMustAt").attr('disabled',true);
    $("#eduAmtBurdenSe").attr('disabled',true);
    $("#innerExtrlEduSe").attr('disabled',true);
    $("#elctsctSttusCode").attr('disabled',true);
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhsedu003 = function() {
    $('#saveFormMhsedu003 input[name="educourseCode"]').prop('disabled', false);
    $('#saveFormMhsedu003 input[name="elctsctSeSn"]').prop('disabled', false);
    $('#saveFormMhsedu003 input[name="empno"]').prop('disabled', false);
    $('#saveFormMhsedu003 input[name="resultElctsctSeSn"]').prop('disabled', false);
    $('#saveFormMhsedu003').resetForm();
    
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhsedu003 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhsedu003 = function() {
    dhxGridMhsedu003.clearSelection();
    fn_InitInputFormMhsedu003();
    gf_FormSetValue('saveFormMhsedu003', 'eduSdt', nowDate, 'text');
    gf_FormSetValue('saveFormMhsedu003', 'eduEdt', nowDate, 'text');
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //educourseCode
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); //elctsctSeSn
    initValueArr.push(''); //empno
    initValueArr.push(''); //resultElctsctSeSn
    initValueArr.push(nowDate); //eduSdt
    initValueArr.push(''); //eduShr
    initValueArr.push(nowDate); //eduEdt
    initValueArr.push(''); //eduEhr
    initValueArr.push(''); //totFinishTime
    initValueArr.push(''); //totEducost
    initValueArr.push(''); //episRetunamt
    initValueArr.push(''); //indvdlEducost
    initValueArr.push(''); //cochrgeAt
    initValueArr.push(''); //stsfdgCode
    initValueArr.push(''); //eduInstt
    initValueArr.push(''); //eduInsttAdres
    initValueArr.push(''); //eduCn
    initValueArr.push(''); //jobApplcPlan
    initValueArr.push(''); //requstDesc
    initValueArr.push(''); //qestnarCode
    initValueArr.push(''); //qestnarResultSn
    initValueArr.push(''); //trnsportct
    initValueArr.push(''); //dayct
    initValueArr.push(''); //cgffdAmt
    initValueArr.push(''); //stayngct
    initValueArr.push(''); //rm
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctSttusCode
    initValueArr.push(''); //elctsctEmpno
    initValueArr.push('1'); //returnResn
    dhxGridMhsedu003.addRow(dhxGridMhsedu003.uid(), initValueArr, 0);
    dhxGridMhsedu003.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhsedu003');
    $('#btnPopEmpSearchMhsedu003').show();
    fn_FormDisabled(false);
    
//    $("#elctsctSttusCodeSaveFormMhsedu003").attr('disabled',true);
//    $("#cochrgedocumentIsuAtSaveFormMhsedu003").attr('disabled',true);
//    $("#returnResnSaveFormMhsedu003").attr('disabled',true);
//    $("#educourseNmSaveFormMhsedu003").attr('disabled',true);
//    $("#eduCls").attr('disabled',true);
//    $("#eduKind").attr('disabled',true);
//    $("#eduMustAt").attr('disabled',true);
//    $("#eduAmtBurdenSe").attr('disabled',true);
//    $("#innerExtrlEduSe").attr('disabled',true);
//    $("#elctsctSttusCode").attr('disabled',true);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhsedu003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhsedu003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhsedu003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhsedu003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsedu003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhsedu003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhsedu003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhsedu003', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsedu003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhsedu003.setSortImgState(false); 
            gf_FormSetValue('searchFormMhsedu003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhsedu003', 'sortColumId', '', 'text'); 
            dhxGridMhsedu003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhsedu003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhsedu003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhsedu003', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsedu003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhsedu003 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhsedu003 = 0; 
    save_Edt_Cnt_Mhsedu003 = 0; 
    save_Del_Cnt_Mhsedu003 = 0; 
    dhxGridMhsedu003.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhsedu003.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhsedu003.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhsedu003 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhsedu003 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhsedu003 += 1; 
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
        save_All_Sta_Mhsedu003 = 0; 
        if(save_Add_Cnt_Mhsedu003 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhsedu003 + "건";
            save_All_Sta_Mhsedu003 = 1; 
        } 
        if(save_Edt_Cnt_Mhsedu003 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhsedu003 + "건"; 
        } 
        if(save_Del_Cnt_Mhsedu003 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhsedu003 + "건"; 
            save_All_Sta_Mhsedu003 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhsedu003(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhsedu003(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhsedu003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhsedu003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhsedu003_Send = function() {
    if(fn_GridValidation(dhxGridMhsedu003, dhxDataProcessorMhsedu003)) {
        dhxDataProcessorMhsedu003.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhsedu003 = function() {
    var rowId = dhxGridMhsedu003.getSelectedRowId();
    var state = dhxDataProcessorMhsedu003.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMhsedu003.getRowIndex(rowId);
        dhxGridMhsedu003.deleteRow(rowId);
        dhxGridMhsedu003.selectRow(rowNum);
        fn_FindMhsedu003();
    }
    else dhxDataProcessorMhsedu003.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhsedu003 = function () {
    var titMhsedu003 = '교육결과보고'; /* gf_LocaleTrans('default', 'titMhsedu003') */
    var jsonParameter = {
        educourseCode : gf_FormGetValue('searchFormMhsedu003', 'educourseCode', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMhsedu003', 'elctsctSeSn', 'text'),
        empno : gf_FormGetValue('searchFormMhsedu003', 'empno', 'text'),
        resultElctsctSeSn : gf_FormGetValue('searchFormMhsedu003', 'resultElctsctSeSn', 'text')
    };
    var header = [[
        '교육과정코드' /* gf_LocaleTrans('default', 'titEducourseCode') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '결과 전자결재 구분 순번' /* gf_LocaleTrans('default', 'titResultElctsctSeSn') */,
        '교육 시작일자' /* gf_LocaleTrans('default', 'titEduSdt') */,
        '교육 시작시간' /* gf_LocaleTrans('default', 'titEduShr') */,
        '교육 종료일자' /* gf_LocaleTrans('default', 'titEduEdt') */,
        '교육 종료시간' /* gf_LocaleTrans('default', 'titEduEhr') */,
        '총 이수 시간(인정 이수 시간)' /* gf_LocaleTrans('default', 'titTotFinishTime') */,
        '총 교육비' /* gf_LocaleTrans('default', 'titTotEducost') */,
        '고용보험 환급액' /* gf_LocaleTrans('default', 'titEpisRetunamt') */,
        '개인 교육비' /* gf_LocaleTrans('default', 'titIndvdlEducost') */,
        '수료 여부' /* gf_LocaleTrans('default', 'titCochrgeAt') */,
        '만족도 코드 (C926)' /* gf_LocaleTrans('default', 'titStsfdgCode') */,
        '교육 기관' /* gf_LocaleTrans('default', 'titEduInstt') */,
        '교육 기관 주소(장소)' /* gf_LocaleTrans('default', 'titEduInsttAdres') */,
        '교육 내용' /* gf_LocaleTrans('default', 'titEduCn') */,
        '업무 적용 계획' /* gf_LocaleTrans('default', 'titJobApplcPlan') */,
        '요청(건의) 사항' /* gf_LocaleTrans('default', 'titRequstDesc') */,
        '설문조사 코드' /* gf_LocaleTrans('default', 'titQestnarCode') */,
        '설문조사 결과 순번' /* gf_LocaleTrans('default', 'titQestnarResultSn') */,
        '교통비' /* gf_LocaleTrans('default', 'titTrnsportct') */,
        '일비' /* gf_LocaleTrans('default', 'titDayct') */,
        '식대 비용' /* gf_LocaleTrans('default', 'titCgffdAmt') */,
        '숙박비' /* gf_LocaleTrans('default', 'titStayngct') */,
        '비고(교육내용)' /* gf_LocaleTrans('default', 'titRm') */,
        '첨부파일 번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '전자결재 문서 번호 (전자결재 문서 번호 또는 승인 일자)' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재 상태 코드 ( EA004 또는 승인 여부 (승인 신청 상태 C197))' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 사원번호  (전자결재 사원번호 또는승인자 사원번호)' /* gf_LocaleTrans('default', 'titElctsctEmpno') */,
        '반려 사유' /* gf_LocaleTrans('default', 'titReturnResn') */
    ]];
    var dataId = [[ 'educourseCode', 'elctsctSeSn', 'empno', 'resultElctsctSeSn', 'eduSdt', 'eduShr', 'eduEdt', 'eduEhr', 'totFinishTime', 'totEducost', 'episRetunamt', 'indvdlEducost', 'cochrgeAt', 'stsfdgCode', 'eduInstt', 'eduInsttAdres', 'eduCn', 'jobApplcPlan', 'requstDesc', 'qestnarCode', 'qestnarResultSn', 'trnsportct', 'dayct', 'cgffdAmt', 'stayngct', 'rm', 'atchmnflNo', 'elctsctDocNo', 'elctsctSttusCode', 'elctsctEmpno', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsedu003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsedu003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhsedu003/excelMhsedu003', jsonParameter);
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
    $('#saveFormMhsedu003 #educourseCodeSaveFormMhsedu003').parent().append(
    '<div class="error" id="educourseCodeSaveFormMhsedu003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsedu003 #elctsctSeSnSaveFormMhsedu003').parent().append(
    '<div class="error" id="elctsctSeSnSaveFormMhsedu003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsedu003 #empnoSaveFormMhsedu003').parent().append(
    '<div class="error" id="empnoSaveFormMhsedu003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsedu003 #resultElctsctSeSnSaveFormMhsedu003').parent().append(
    '<div class="error" id="resultElctsctSeSnSaveFormMhsedu003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhsedu003 = function(educourseCode, elctsctSeSn, empno, resultElctsctSeSn){
    if(!gf_IsNull(educourseCode) && !gf_IsNull(elctsctSeSn) && !gf_IsNull(empno) && !gf_IsNull(resultElctsctSeSn)) {
        var jsonParameter = {
            educourseCode : educourseCode,
            elctsctSeSn : elctsctSeSn,
            empno : empno,
            resultElctsctSeSn : resultElctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('mhsedu003/findMhsedu003', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.educourseCode) && gf_IsNull(data.elctsctSeSn) && gf_IsNull(data.empno) && gf_IsNull(data.resultElctsctSeSn)) {
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
    var state = dhxDataProcessorMhsedu003.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhsedu003').validate().form()){
                if(state == 'inserted') {
                    var educourseCode = gf_FormGetValue('saveFormMhsedu003', 'educourseCode', 'text');
                    var elctsctSeSn = gf_FormGetValue('saveFormMhsedu003', 'elctsctSeSn', 'text');
                    var empno = gf_FormGetValue('saveFormMhsedu003', 'empno', 'text');
                    var resultElctsctSeSn = gf_FormGetValue('saveFormMhsedu003', 'resultElctsctSeSn', 'text');
                    if(fn_CheckDupMhsedu003(educourseCode, elctsctSeSn, empno, resultElctsctSeSn)) return true;
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
    var checkEducourseCode;
    var checkElctsctSeSn;
    var checkEmpno;
    var checkResultElctsctSeSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhsedu003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhsedu003 == 'deleted') {
        save_Row_Num_Mhsedu003 = 0;
        save_Row_Ids_Mhsedu003 = "";
    } else if(save_Row_Sta_Mhsedu003 == 'inserted') {
        save_Row_Num_Mhsedu003 = rowNum;
        save_Row_Ids_Mhsedu003 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhsedu003 = rowNum;
        save_Row_Ids_Mhsedu003 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'educourseCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'educourseCode');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'elctsctSeSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'resultElctsctSeSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'resultElctsctSeSn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEducourseCode = gf_DhxGetValue(dhxGridObjet, rowId, 'educourseCode', 'grid');
                    checkElctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowId, 'elctsctSeSn', 'grid');
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    checkResultElctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowId, 'resultElctsctSeSn', 'grid');
                    if(!gf_IsNull(checkEducourseCode, checkElctsctSeSn, checkEmpno, checkResultElctsctSeSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var educourseCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'educourseCode', 'grid');
                            var elctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'elctsctSeSn', 'grid');
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            var resultElctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'resultElctsctSeSn', 'grid');
                            if(((educourseCode == checkEducourseCode) && (elctsctSeSn == checkElctsctSeSn) && (empno == checkEmpno) && (resultElctsctSeSn == checkResultElctsctSeSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'educourseCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'resultElctsctSeSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhsedu003( checkEducourseCode, checkElctsctSeSn, checkEmpno, checkResultElctsctSeSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'educourseCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'resultElctsctSeSn');
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
        dhxGridMhsedu003.selectRowById(validFalseFistRowId);
        fn_FindMhsedu003();
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

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMhsedu003', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMhsedu003', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormMhsedu003', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMhsedu003', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMhsedu003","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMhsedu003', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMhsedu003', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMhsedu003', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMhsedu003', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMhsedu003', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMhsedu003', 'korNm', 'text');
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
	 		gf_FormSetValue('searchFormMhsedu003', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhsedu003', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMhsedu003', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhsedu003', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMhsedu003', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMhsedu003', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMhsedu003","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMhsedu003","empno","korNm", gBplcCode, "Y");
	  	}
  	}	
}

var fn_PopupDtlMhseduPop = function(formId, codeId, codeNmId, param) {
	var userId = ""; 
	var title  = "설문조사";
	//저장팝업
	var dhxWindowObj;
	var popupDtlQest;
	if($('body').find("div[id='popupDtlQest']").size() <= 0) {
		$('body').append("<div id='popupDtlQest' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupDtlQest').bPopup({
		onOpen:function(){
			
			popupDtlRequst = new dhtmlXWindows();
			var id 		= 'popupDtlQest';
			var ajaxUrl = gv_ContextPath+'/mhsedu003/popup/popupDtlQest/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 450;
			
			dhxWindowObj = popupDtlRequst.createWindow(id, left, top, width, height);
			popupDtlRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#popupDtlQest .b-close').click();
			});
		},
		onClose:function(){
			popupDtlRequst.unload();
			$('body').find("div[id='popupDtlQest']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}

//첨부파일 영역 
var fn_FileUploadPrgEvent = function(){
	
	$(".file_box").css('height','75px'); //높이 줄이기
	
	$('#fileUpload3').unbind("click").bind("click",function(event){
		gf_FileUploadPopup(
				'fn_FileUploadPrgEvent', 
				'btnUploadedFiledelete3', 
				'fileList3', 
				'atchmnfl', 
				 uploadedFileKeysPrg3, 
				 uploadedFileInfoPrg3,
				 0,
				'all',
		        'fn_CallBackPrgFileUpload');
	});
	
	$('.btnUploadedFiledelete3').unbind("click").bind("click",function(event){			
		 
		uploadedFileKeysPrg3.splice($(this).attr('idx'), 1);
		uploadedFileInfoPrg3.splice($(this).attr('idx'), 1);
		
		$('#fileList3 .file_box table tr').remove();
		
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		
		$.each( uploadedFileInfoPrg3, function( key, value ) {
			
			fileInfos = uploadedFileInfoPrg3[key].split('|^|');
			
			atchFileList.push('<tr>');
			atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
			atchFileList.push('<td class="ar">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
			atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');

			idx++;
		});								
		
		$('#fileList3 .file_box table').append(atchFileList.join(""));
		$('#atchmnfl').val(uploadedFileKeysPrg3.join("|"));
		
		fn_FileUploadPrgEvent();
		
	});
}
	
var fn_SearchPrgFileList = function (strSvcID, targetID, data){
	$('#fileList3 .file_box table tr').remove();
	uploadedFileKeysPrg3 = [];
	uploadedFileInfoPrg3 = [];

	var atchFileList = [];
	var idx = 0;
	$.each( data.data, function( key, value ) {
		uploadedFileKeysPrg3.push(value.atchFileId);				
		uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
		
		atchFileList.push('<tr style=\"border:0\">');
		atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');
		
		idx++;
		
	});

	if(gf_IsNull(atchFileList)) {				
		atchFileList.push('<tr>');
		atchFileList.push('<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>');				
		atchFileList.push('</tr>');								
	}
	
	$('#fileList3 .file_box table').append(atchFileList.join(""));
	$('#atchFileIds3').val(uploadedFileKeysPrg3.join("|"));
	fn_FileUploadPrgEvent();
};	


var fn_CallBackPrgFileUpload = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	if(!gf_IsNull(data)){
		
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		keyArr  = [];  //기존파일들 배열 초기화
		infoArr = [];
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
		});
		
		$('#'+viewDivId+' .file_box table tr').remove();
		$('#'+dataDivId).val("");
		$.each( infoArr, function( key, value ) {
			
			fileInfos = infoArr[key].split('|^|');

			atchFileList.push('<tr>');
			atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
			atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
			atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del '+deleteBtnClassNm+'"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');
				 
			idx++;
		});								
					
		$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
		$('#'+dataDivId).val(keyArr.join("|"));
		gf_FormSetValue('saveFormMhsedu003', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormMhsedu003', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
    callbacks.fire();
	}
};
