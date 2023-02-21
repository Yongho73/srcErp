/**
 *    프로그램       : 교육신청관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.02
 *    사용테이블      : MHS_EDUCRSE
 * sourceGen version : 2020.08.06.01 (2020.09.02)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhsedu002 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhsedu002 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhsedu002 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhsedu002 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhsedu002 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhsedu002 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhsedu002 = 0;  //그리드 삭제 수량 
var dhxGridMhsedu002;  //그리드 객체
var dhxGridMhseduTime;  //그리드 객체
var dhxGridMhseduEmp;  //그리드 객체
var eventIdMhsedu002 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhsedu002;  //DataProcessor 객체
var dhxDataProcessorMhseduTime;  //DataProcessor 객체
var dhxDataProcessorMhseduEmp;  //DataProcessor 객체
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhsedu002();
    if(cf_SetComponentsMhsedu002()){
       cf_SetEventListenerMhsedu002();
       cf_InitFormMhsedu002();
       cf_SetBindingMhsedu002();
       fn_FileUploadPrgEvent();	 //파일첨부
    }
});
function init(){
    
    //기간달력 이벤트 추가
    $('#searchFormMhsedu002 #date2').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxSearchCCalendarDate2.show();
    });
    
	//기간달력 이벤트 추가
    $('#saveFormMhsedu002 .input_calen').unbind('click').bind('click', function(event){
    	dateChk($(this));
    });
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
    
}
//조회 검색
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="stDate" || e.target.id =="edDate") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxSearchCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});


//기간달력
function fn_Date(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject([{input:"eduSdt", button:"startDateIcon"},{input:"eduEdt", button:"startDateIcon"}]);
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	dhxCCalendarDate1.attachEvent("onClick" , function(){
		gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduSdt', gf_FormGetValue('saveFormMhsedu002', 'eduSdt', 'text'));
	});
	
	dhxCCalendarDate1.attachEvent("onClick" , function(){
		gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduEdt', gf_FormGetValue('saveFormMhsedu002', 'eduEdt', 'text'));
		deCount();
	});
	
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
	
//	$('input[name=stDate]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
//    $('input[name=edDate]').val( (new Date()).format('YYYY-MM-30') );
    
	//금일 날짜표시
	gf_SetDateIntervalRadio('stDate', 'edDate', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxSearchCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormMhsedu002', 'stDate', 'text'));
	dhxSearchCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormMhsedu002', 'edDate', 'text'));	
	dhxSearchCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxSearchCCalendarDate2.rightCalendar.loadUserLanguage("ko");
	
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

function deCount() {
    var sdd = gf_FormGetValue('saveFormMhsedu002', 'eduSdt', 'text');
    var edd = gf_FormGetValue('saveFormMhsedu002', 'eduEdt', 'text');
    if(sdd > edd){
        gf_DivMsgAlert("교육 종료 날짜를 다시 선택해주세요");
        $('#eduEdt').val(new Date().format('YYYY-MM-DD'));
        return false;
    } 
}

/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhsedu002 = function() {
    gf_SetMenuPath();
    $("#saveFormMhsedu002").validate({ errorElement: 'div', ignore: '' });

    gf_ComboCode('divComboeduCls','eduCls','eduCls', 'sel', 'C206', '' , '', '', 'ordr', 'required','',''); // 교육분류
    gf_ComboCode('divComboSearcheduCls','searcheduCls','searcheduCls', 'search', 'C206', '' , '', '', 'ordr', 'required','',''); // 조회 교육분류
    gf_ComboCode('divComboeduKind','eduKind','eduKind', 'sel', 'C114', '' , '', '', 'ordr', 'required','',''); // 교육종류
    gf_ComboCode('divComboeduMustAt','eduMustAt','eduMustAt', 'sel', 'C112', '' , '', '', 'ordr', 'required','',''); // 교육필수여부
    gf_ComboCode('divComboSearcheduMustAt','searcheduMustAt','searcheduMustAt', 'search', 'C112', '' , '', '', 'ordr', 'required','',''); // 조회 교육필수여부
    gf_ComboCode('divComboeduAmtBurdenSe','eduAmtBurdenSe','eduAmtBurdenSe', 'sel', 'C111', '' , '', '', 'ordr', 'required','',''); // 교육비용부담구분
    gf_ComboCode('divComboinnerExtrlEduSe','innerExtrlEduSe','innerExtrlEduSe', 'sel', 'C208', '' , '', '', 'ordr', 'required','',''); // 내외부교육구분
    gf_ComboCode('divCombochrgInstructor','chrgInstructor','chrgInstructor', 'sel', 'C046', '' , '', '', 'ordr', 'required','',''); // 내외부교육구분
    gf_ComboCode('divComboconfmSttusCode','confmSttusCode','confmSttusCode', 'sel', 'C197', '' , '', '', 'ordr', 'required','',''); // 처리상태
    gf_ComboCode('divComboSearchelctsctSttusCode','searchelctsctSttusCode','searchelctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', 'required','',''); // 처리상태
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    $("#indvdlEducostSaveFormMhsedu002").number(true);
    $("#extrlInstructorAllwncSaveFormMhsedu002").number(true);
    $("#episRetunamtSaveFormMhsedu002").number(true);
    
    $("#deptCodeNm").focus();
    
    fn_Date();
};

var cf_SetComponentsMhsedu002 = function() {
    var dhxGridMhsedu002HeaderInfo = [];
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('구분', '200', 'center', 'str', 'ro', false, 'educourseCodeNm', '', ''));
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('승인상태', '100', 'center', 'str', 'ro', false, 'confmSttusCode', '', ''));
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('신청자사번', '100', 'center', 'str', 'ro', false, 'empno', '', ''));
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('신청자명', '*', 'center', 'str', 'ro', false, 'korNm', '', ''));
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('부서', '0', 'center', 'str', 'ro', true, 'deptCode', '', ''));
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '0', 'center', 'str', 'ro', true, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '0', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육과정명', '0', 'left', 'str', 'ro', true, 'educourseNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseNm') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작일자', '0', 'left', 'str', 'ro', true, 'eduSdt', '', '')); /* gf_LocaleTrans('default', 'titEduSdt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작시간', '0', 'left', 'str', 'ro', true, 'eduShr', '', '')); /* gf_LocaleTrans('default', 'titEduShr') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료일자', '0', 'left', 'str', 'ro', true, 'eduEdt', '', '')); /* gf_LocaleTrans('default', 'titEduEdt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료시간', '0', 'left', 'str', 'ro', true, 'eduEhr', '', '')); /* gf_LocaleTrans('default', 'titEduEhr') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 일수', '0', 'right', 'int', 'ro', true, 'eduDaycnt', '', '')); /* gf_LocaleTrans('default', 'titEduDaycnt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 목적', '0', 'left', 'str', 'ro', true, 'eduPurps', '', '')); /* gf_LocaleTrans('default', 'titEduPurps') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 분류 ', '0', 'left', 'str', 'ro', true, 'eduCls', '', '')); /* gf_LocaleTrans('default', 'titEduCls') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 종류 ', '0', 'left', 'str', 'ro', true, 'eduKind', '', '')); /* gf_LocaleTrans('default', 'titEduKind') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 필수 여부 ', '0', 'center', 'str', 'coro', true, 'eduMustAt', '', '')); /* gf_LocaleTrans('default', 'titEduMustAt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 비용 부담 구분', '0', 'right', 'int', 'ro', true, 'eduAmtBurdenSe', '', '')); /* gf_LocaleTrans('default', 'titEduAmtBurdenSe') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('내외부 교육 구분', '0', 'center', 'str', 'ro', true, 'innerExtrlEduSe', '', '')); /* gf_LocaleTrans('default', 'titInnerExtrlEduSe') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 장소', '0', 'left', 'str', 'ro', true, 'eduZone', '', '')); /* gf_LocaleTrans('default', 'titEduZone') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 사원 여부', '0', 'center', 'str', 'ro', true, 'chrgInstructorEmplAt', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructorEmplAt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 ', '0', 'left', 'str', 'ro', true, 'chrgInstructor', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructor') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 명 ', '0', 'left', 'str', 'ro', true, 'chrgInstructorNm', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructorNm') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육 기관', '0', 'left', 'str', 'ro', true, 'eduInstt', '', '')); /* gf_LocaleTrans('default', 'titEduInstt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육기관주소', '0', 'left', 'str', 'ro', true, 'eduInsttAdres', '', '')); /* gf_LocaleTrans('default', 'titEduInsttAdres') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('총 이수 학점', '0', 'left', 'str', 'ro', true, 'totFinishPnt', '', '')); /* gf_LocaleTrans('default', 'titTotFinishPnt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('대상 인원', '0', 'right', 'int', 'ro', true, 'trgetCnt', '', '')); /* gf_LocaleTrans('default', 'titTrgetCnt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('개인 교육비', '0', 'left', 'str', 'ro', true, 'indvdlEducost', '', '')); /* gf_LocaleTrans('default', 'titIndvdlEducost') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('고용 보험 환급액', '0', 'right', 'int', 'ro', true, 'episRetunamt', '', '')); /* gf_LocaleTrans('default', 'titEpisRetunamt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('수료증 발행 여부', '0', 'center', 'str', 'ro', true, 'cochrgedocumentIsuAt', '', '')); /* gf_LocaleTrans('default', 'titCochrgedocumentIsuAt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('외래 강사 수당', '0', 'right', 'int', 'ro', true, 'extrlInstructorAllwnc', '', '')); /* gf_LocaleTrans('default', 'titExtrlInstructorAllwnc') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '0', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호 ', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드 ', '0', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호  ', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('반려 사유', '0', 'left', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('본인 신청 여부', '0', 'center', 'str', 'ro', true, 'selfReqstAt', '', '')); /* gf_LocaleTrans('default', 'titSelfReqstAt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('교육신청 순번', '0', 'center', 'str', 'ro', true, 'edureqstSn', '', '')); /* gf_LocaleTrans('default', 'titSelfReqstAt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('승인구분순번', '0', 'center', 'str', 'ro', true, 'confmSeSn', '', '')); /* gf_LocaleTrans('default', 'titSelfReqstAt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '0', 'center', 'str', 'ro', true, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titSelfReqstAt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('설문조사코드', '0', 'center', 'str', 'ro', true, 'qestnarCode', '', '')); /* gf_LocaleTrans('default', 'titSelfReqstAt') */
    dhxGridMhsedu002HeaderInfo.push(gf_MakeDhxGridHeader('설문조사명', '0', 'center', 'str', 'ro', true, 'qestnarNm', '', '')); /* gf_LocaleTrans('default', 'titSelfReqstAt') */
    
    dhxGridMhsedu002 = gf_MakeDhxGrid('dataListMhsedu002', dhxGridMhsedu002HeaderInfo, true, false, false);
    dhxGridMhsedu002.enableAutoWidth(false);
    dhxGridMhsedu002.setEditable(true);

    dhxGridMhsedu002.setNumberFormat("0,000", dhxGridMhsedu002.getColIndexById("indvdlEducost"), ".", ",");
    dhxGridMhsedu002.setNumberFormat("0,000", dhxGridMhsedu002.getColIndexById("extrlInstructorAllwnc"), ".", ",");
    dhxGridMhsedu002.setNumberFormat("0,000", dhxGridMhsedu002.getColIndexById("episRetunamt"), ".", ",");
    
    dhxGridMhsedu002.setColumnMinWidth(80,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
 // 교육분류
    var eduClsjsonParameter = {codekindCode : "C206",exceptCode :"",sortOrder :"asc" };
    var eduClsdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduClsjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu002, dhxGridMhsedu002.getColIndexById("eduCls"), eduClsdataSource.data, "sel");
    
    // 교육종류
    var eduKindjsonParameter = {codekindCode : "C114",exceptCode :"",sortOrder :"asc" };
    var eduKinddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduKindjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu002, dhxGridMhsedu002.getColIndexById("eduKind"), eduKinddataSource.data, "sel");
    
    // 교육필수여부
    var eduMustAtjsonParameter = {codekindCode : "C112",exceptCode :"",sortOrder :"asc" };
    var eduMustAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduMustAtjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu002, dhxGridMhsedu002.getColIndexById("eduMustAt"), eduMustAtdataSource.data, "sel");

    // 교육 비용 부담 구분
    var eduAmtBurdenSejsonParameter = {codekindCode : "C111",exceptCode :"",sortOrder :"asc" };
    var eduAmtBurdenSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduAmtBurdenSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu002, dhxGridMhsedu002.getColIndexById("eduAmtBurdenSe"), eduAmtBurdenSedataSource.data, "sel");
    
    // 내외부 교육 구분
    var innerExtrlEduSejsonParameter = {codekindCode : "C208",exceptCode :"",sortOrder :"asc" };
    var innerExtrlEduSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', innerExtrlEduSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu002, dhxGridMhsedu002.getColIndexById("innerExtrlEduSe"), innerExtrlEduSedataSource.data, "sel");
    
    // 처리상태
    var elctsctSttusCodejsonParameter = {codekindCode : "EA004",exceptCode :"",sortOrder :"asc" };
    var elctsctSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', elctsctSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu002, dhxGridMhsedu002.getColIndexById("elctsctSttusCode"), elctsctSttusCodedataSource.data, "sel");
    
    // 승인상태
    var confmSttusCodejsonParameter = {codekindCode : "C197",exceptCode :"",sortOrder :"asc" };
    var confmSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', confmSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu002, dhxGridMhsedu002.getColIndexById("confmSttusCode"), confmSttusCodedataSource.data, "sel");
    
    
    dhxGridMhsedu002.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    var dhxGridMhseduTimeHeaderInfo = [];
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '490', 'center', 'str', 'ro', false, 'codeKorNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '0', 'center', 'str', 'ro', true, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('전자결재구분순번', '0', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('필수이수교육구분', '0', 'right', 'int', 'ro', true, 'mustFinishEduSe', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('이수시간', '500', 'right', 'int', 'edn', false, 'finishTime', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduTime = gf_MakeDhxGrid('dataListMhseduTime', dhxGridMhseduTimeHeaderInfo, true, false, false);
    dhxGridMhseduTime.enableAutoWidth(true);
    dhxGridMhseduTime.setEditable(true);
    
    dhxGridMhseduTime.setColumnMinWidth(80,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    var dhxGridMhseduEmpHeaderInfo = [];
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '280', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('성명', '280', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('부서', '280', 'center', 'int', 'ro', false, 'deptCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('직급', '*', 'center', 'int', 'ro', false, 'clsfCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '0', 'center', 'str', 'ro', true, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('전자결재 구분 순번', '0', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('본인 신청 여부', '0', 'center', 'str', 'ro', true, 'selfReqstAt', '', ''));
    
    dhxGridMhseduEmp = gf_MakeDhxGrid('dataListMhseduEmp', dhxGridMhseduEmpHeaderInfo, true, false, false);
    dhxGridMhseduEmp.enableAutoWidth(true);
    dhxGridMhseduEmp.setEditable(true);
    
    dhxGridMhseduEmp.setColumnMinWidth(80,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    return true; 
    
};

var cf_SetEventListenerMhsedu002 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhsedu002 = gf_GridDetachEvent(dhxGridMhsedu002, eventIdMhsedu002);
    eventId = dhxGridMhsedu002.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhsedu002();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhsedu002.getColumnsNum();
            var rowNum = dhxGridMhsedu002.getRowsNum();
            var selectedId = dhxGridMhsedu002.getSelectedRowId();
            var ind        = dhxGridMhsedu002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu002.getRowIndex(selectedId);
            var type       = dhxGridMhsedu002.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhsedu002.selectRow(0);
                    //fn_FindMhsedu002();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhsedu002.selectRow(rowIndex + 1);
                    fn_FindMhsedu002();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhsedu002.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu002.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhsedu002.getSelectedRowId();
            var ind        = dhxGridMhsedu002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu002.getRowIndex(selectedId);
            var type       = dhxGridMhsedu002.getColType(ind);
            dhxGridMhsedu002.selectCell(rowIndex+1, ind);
            fn_FindMhsedu002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu002.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhsedu002.getSelectedRowId();
            var ind        = dhxGridMhsedu002.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu002.getRowIndex(selectedId);
            var type       = dhxGridMhsedu002.getColType(ind);
            dhxGridMhsedu002.selectCell(rowIndex-1, ind);
            fn_FindMhsedu002();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu002.editCell();
            }
        }
        else return true;
    });
    eventIdMhsedu002.push(eventId);
    eventId = dhxGridMhsedu002.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhsedu002SortGridList(ind, type, direction); 
    });
    eventIdMhsedu002.push(eventId);
    eventId = dhxGridMhsedu002.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhsedu002.push(eventId);
    eventId = dhxGridMhsedu002.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhsedu002();
    });
    eventIdMhsedu002.push(eventId);
    eventId = dhxGridMhseduTime.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        var finishTime = gf_DhxGetValue(dhxGridMhseduTime, rId, 'finishTime', 'grid');
        var time1 = finishTime.split(":");
        if (finishTime.length < 4) {
                 gf_DivMsgAlert("00:00 형식에 맞게 입력해주세요.");
                 return false;
            } else if (finishTime.length > 5) {
                 gf_DivMsgAlert("00:00 형식에 맞게 입력해주세요.");
                 return false;
            } else if (time1[0] > 24 || time1[1] > 60){
            	 gf_DivMsgAlert("시간형식에 맞게 입력해주세요.");
            	 return false;
            } else {
                 var status = dhxDataProcessorMhseduTime.getState(rId);
                 dhxDataProcessorMhseduTime.setUpdated(rId, true, 'updated');
            }
        return true;
    });
    eventIdMhsedu002.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhsedu002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhsedu002()
    });
    $('#btnSaveMhsedu002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhsedu002();
    });
    $('#btnRemoveMhsedu002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhsedu002();
    });
    $('#btnExcelMhsedu002').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhsedu002();
    });
    $('#btnSearchMhsedu002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhsedu002('');
    });
    $('#btnResetMhsedu002').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhsedu002();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhsedu002').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhsedu002, $('#checkAllMhsedu002').prop('checked'), 'chk');
    });
    $('#searchFormMhsedu002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhsedu002').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsedu002').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
 // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhsedu002 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
    	if(event.charCode == 13) { 
        	if(this.id == "deptCode"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "deptCodeNm"){
        		return fn_SearchMhsEmpDeptCode();
        	} else if(this.id == "empno"){
        		fn_SearchEmpCode("1");
        	} else if(this.id == "korNm"){
        		fn_SearchEmpCode("1");
        		return false;
        	} else{
        		$('#btnSearchMhsedu002').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true;  
    });  
    $('#saveFormMhsedu002 input[name="educourseCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'educourseCode', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="elctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'elctsctSeSn', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="educourseNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'educourseNm', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="eduSdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduSdt', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="eduShr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduShr', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="eduEdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduEdt', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="eduEhr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduEhr', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="eduDaycnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduDaycnt', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="eduPurps"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduPurps', $(this).val());
    });
    $('#saveFormMhsedu002 select[name="eduCls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduCls', gf_FormGetValue('saveFormMhsedu002', 'eduCls', 'combo'));
    });
    $('#saveFormMhsedu002 select[name="eduKind"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduKind',  gf_FormGetValue('saveFormMhsedu002', 'eduKind', 'combo'));
    });
    $('#saveFormMhsedu002 select[name="eduMustAt"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduMustAt', gf_FormGetValue('saveFormMhsedu002', 'eduMustAt', 'combo'));
    });
    $('#saveFormMhsedu002 select[name="eduAmtBurdenSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduAmtBurdenSe',  gf_FormGetValue('saveFormMhsedu002', 'eduAmtBurdenSe', 'combo'));
    });
    $('#saveFormMhsedu002 select[name="innerExtrlEduSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'innerExtrlEduSe',  gf_FormGetValue('saveFormMhsedu002', 'innerExtrlEduSe', 'combo'));
    });
    $('#saveFormMhsedu002 input[name="eduZone"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduZone', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="chrgInstructorEmplAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
           var val = gf_IsNull(gf_FormGetValue('saveFormMhsedu002', 'chrgInstructorEmplAt', 'chkbox'))? '0' : '1';
           gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'chrgInstructorEmplAt', val);
       });
    $('#saveFormMhsedu002 input[name="chrgInstructor"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'chrgInstructor', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="chrgInstructorNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'chrgInstructorNm', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="eduInstt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduInstt', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="eduInsttAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'eduInsttAdres', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="totFinishPnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'totFinishPnt', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="trgetCnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'trgetCnt', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="indvdlEducost"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'indvdlEducost', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="episRetunamt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'episRetunamt', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="cochrgedocumentIsuAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
           var val = gf_IsNull(gf_FormGetValue('saveFormMhsedu002', 'cochrgedocumentIsuAt', 'chkbox'))? '0' : '1';        
           gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'cochrgedocumentIsuAt', val);
       });
    $('#saveFormMhsedu002 input[name="extrlInstructorAllwnc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'extrlInstructorAllwnc', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'rm', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="atchmnflNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="elctsctDocNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'elctsctDocNo', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'elctsctSttusCode', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="elctsctEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'elctsctEmpno', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="returnResn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'returnResn', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="selfReqstAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'selfReqstAt', $(this).val());
    });
    $('#saveFormMhsedu002 select[name="confmSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'confmSttusCode',  gf_FormGetValue('saveFormMhsedu002', 'confmSttusCode', 'combo'));
    });
    $('#saveFormMhsedu002 input[name="qestnarCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'qestnarCode', $(this).val());
    });
    $('#saveFormMhsedu002 input[name="qestnarNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu002, dhxDataProcessorMhsedu002, 'qestnarNm', $(this).val());
    });
    //사용자 찾기 
    $('#btnUseEmpSearch').unbind('click').bind('click', function(event){
    	// form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    	gf_EmpPopup("searchFormMhsedu002","empnoSaveFormMhsedu002","korNmSaveFormMhsedu002", gBplcCode, "N", "");  //
    });
    //사원 선택 Popup
    $('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhsedu002","empno","empNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#btnDeptSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhsedu002","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu002', 'empNm', '', 'text');
	    }
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu002', 'empno', '', 'text');
	    }
		
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu002', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu002', 'deptCode', '', 'text');
	    }
    });
	
    $('#btnBugtAdd').unbind('click').bind('click', function(event){
    var educourseNm = gf_FormGetValue('saveFormMhsedu002', 'educourseNm', 'text');
    if(gf_IsNull(educourseNm)){
    	gf_DivMsgAlert('조회된 교육과정이 없습니다. 재조회 해주세요.');
		return false;
    } else { 
    	var exit = true;
    	/*dhxGridMhseduTime.forEachRow(function(rowId) {
			var stateTime = dhxDataProcessorMhseduTime.getState(rowId);
			if (stateTime == '') {
				gf_DivMsgAlert("해당 승인사항에 이수시간이 입력되지 않았습니다.");
				return false;
			}else if(stateTime == 'updated'){
				exit = true;
			}
		});*/
    	if(exit == true){
    		gf_DivMsgConfirm("해당사항을 승인 하시겠습니까?",'fn_BugtAdd()','');
    	}
    }
    }); 
    $('#btnqestnarCodeSearch').unbind("click").bind("click",function() {
    	gf_QestPopup('','','','', '', "N", "fn_CallbackGridPopComp");
    });
    
    $('#btnBugtremove').unbind('click').bind('click', function(event){
    	var educourseNm = gf_FormGetValue('saveFormMhsedu002', 'educourseNm', 'text');
        if(gf_IsNull(educourseNm)){
        	gf_DivMsgAlert('조회된 교육과정이 없습니다. 재조회 해주세요.');
    		return false;
        } else {         	
        	var paramConfmSeSn  = dhxGridMhsedu002.cells(dhxGridMhsedu002.getSelectedRowId(), dhxGridMhsedu002.getColIndexById("confmSeSn")).getValue();
        	var paramEmpno  = dhxGridMhsedu002.cells(dhxGridMhsedu002.getSelectedRowId(), dhxGridMhsedu002.getColIndexById("empno")).getValue();
        	var paramEdureqstSn  = dhxGridMhsedu002.cells(dhxGridMhsedu002.getSelectedRowId(), dhxGridMhsedu002.getColIndexById("edureqstSn")).getValue();
        	
        	var param = "&confmSeSn=" + paramConfmSeSn + "&empno=" + paramEmpno + "&edureqstSn=" + paramEdureqstSn;
        	
        	fn_PopupDtlMhseduPop('form1','','', param);
        }
    });
  //기간달력 이벤트 추가
    $('#searchFormMhsedu002 #date2').unbind('click').bind('click', function(event){
        //dhxCCalendarDate2.setPosition("bottom"); // "bottom"
        //$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
        dhxSearchCCalendarDate2.show();
    });
    //기간달력 이벤트 추가
    $('#searchFormMhsedu002 .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_DateCheck($(this));
    });
    $('#saveFormMhsedu002 .input_calen').unbind('keyup').bind('keyup', function(event){
    	gf_DateCheck($(this));
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhsedu002 = function() {
    $('#searchFormMhsedu002').resetForm();
    gf_SetDataAuthorSe();
    gf_FormSetValue('searchFormMhsedu002', 'stDate',gv_Predate, 'text');
    gf_FormSetValue('searchFormMhsedu002', 'edDate',gv_Curdate, 'text');
};

var cf_SetBindingMhsedu002 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhsedu002('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhsedu002 = function(userId) {
	
	$('#checkDe').change(function(){
	    var val = $(this).val();
	    if(val == 0){
	    	$(this).attr('name', 'eduSdt');
	    	$('#stDate').attr('name', 'stDate');
	    	$('#edDate').attr('name', 'edDate');
	    }else if(val == 1){
	    	$(this).attr('name', 'reqstDe');
	    	$('#stDate').attr('name', 'reqststDate');
	    	$('#edDate').attr('name', 'reqstedDate');
	    }
	});

	var stDate = gf_FormGetValue('searchFormMhsedu002', 'stDate', 'text').replaceAll('-','');
    var edDate = gf_FormGetValue('searchFormMhsedu002', 'edDate', 'text').replaceAll('-','');
    var reqststDate = gf_FormGetValue('searchFormMhsedu002', 'reqststDate', 'text').replaceAll('-','');
	var reqstedDate = gf_FormGetValue('searchFormMhsedu002', 'reqstedDate', 'text').replaceAll('-','');
    
    var newCrseAt = gf_FormGetValue('searchFormMhsedu002', 'newCrseAt', 'combo');
    var deptAuth = gf_GetDataAuthorSe();         //부서권한 : 엑티브 TAB의 권한 
	var exempno = gf_GetLocalStorageData('empno', false);  //사원번로
    var jsonParameter = {
    		stDate : stDate,
            edDate : edDate,
            reqststDate : reqststDate,
            reqstedDate : reqstedDate,
            searcheduCls : gf_FormGetValue('searchFormMhsedu002', 'searcheduCls', 'combo'),
            searcheduMustAt : gf_FormGetValue('searchFormMhsedu002', 'searcheduMustAt', 'combo'),
            confmSttusCode : gf_FormGetValue('searchFormMhsedu002', 'confmSttusCode', 'combo'),
            educourseNm : gf_FormGetValue('searchFormMhsedu002', 'educourseNm', 'text'),
            newCrseAt : gf_FormGetValue('searchFormMhsedu002', 'newCrseAt', 'combo'),
            deptCodeNm : gf_FormGetValue('searchFormMhsedu002', 'deptCodeNm', 'text'),
            deptCode : gf_FormGetValue('searchFormMhsedu002', 'deptCode', 'text'),
            empno : gf_FormGetValue('searchFormMhsedu002', 'empno', 'text'),
            empNm : gf_FormGetValue('searchFormMhsedu002', 'empNm', 'text'),
            deptCode : gf_FormGetValue('searchFormMhsedu002', 'deptCode', 'text'),
            deptCodeNm : gf_FormGetValue('searchFormMhsedu002', 'deptCodeNm', 'text'),
            deptAuth : deptAuth,
            exempno : exempno
            
    };
    gf_Transaction(userId, 'mhsedu002/searchMhsedu002', jsonParameter, 'fn_CallbackSearchMhsedu002', false, 'GET');
};

var fn_CallbackSearchMhsedu002 = function(strSvcID, targetID, data) {
    //dhxGridMhsedu002.clearAll();
    dhxGridMhsedu002.destructor();
    if(cf_SetComponentsMhsedu002()){ 
        fn_DhxDataProcessorMhsedu002(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhsedu002');
            dhxGridMhsedu002.parse(data.data.records, 'js');
            dhxGridMhsedu002.selectRow(0); 
            if(save_Row_Num_Mhsedu002 == 0 && save_All_Sta_Mhsedu002 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhsedu002.selectRow(0); 
            } else if(save_Row_Sta_Mhsedu002 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhsedu002.selectRow(0);
            } else if(save_All_Sta_Mhsedu002 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhsedu002.selectRow(save_Row_Num_Mhsedu002); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhsedu002.selectRow(save_Row_Num_Mhsedu002);   //개발자 수정 필요  
                //var findCell = dhxGridMhsedu002.findCell(save_Row_Ids_Mhsedu002, gf_GetDhxGridColumId(dhxGridMhsedu002,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhsedu002.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhsedu002.selectRow(0);
                //} 
            } 
 
            fn_FindMhsedu002();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhsedu002');
            fn_InitInputFormMhsedu002();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhsedu002").text(data.data.records.length);
        cf_SetEventListenerMhsedu002();
    } 
};
var fn_DhxDataProcessorMhsedu002 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhsedu002 = new dataProcessor(gv_ContextPath+'/mhsedu002/saveMhsedu002'); //lock feed url
    dhxDataProcessorMhsedu002.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhsedu002.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsedu002.init(dhxGridMhsedu002); //link dataprocessor to the grid
    dhxDataProcessorMhsedu002.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhsedu002.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhsedu002.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
        	   gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
            	   		var educourseCode = dataSource.data.educourseCode;
            	   		var elctsctSeSn = dataSource.data.elctsctSeSn;
        	   			dhxGridMhseduTime.forEachRow(function(rowId) {
            	    		dhxGridMhseduTime.cells(rowId, gf_GetDhxGridColumId(dhxGridMhseduTime, 'educourseCode')).setValue(educourseCode);
            	    		dhxGridMhseduTime.cells(rowId, gf_GetDhxGridColumId(dhxGridMhseduTime, 'elctsctSeSn')).setValue(elctsctSeSn);
            	    		dhxDataProcessorMhseduTime.setUpdated(rowId, true, 'updated');
            	    	});
        	   			dhxDataProcessorMhseduTime.sendData();
//                    fn_SearchMhsedu002();
//                    $("#checkAllMhsedu002").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMhsedu002 = function() {
    var rId = dhxGridMhsedu002.getSelectedRowId();
    var status = dhxDataProcessorMhsedu002.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhsedu002", "educourseCode", gf_DhxGetValue(dhxGridMhsedu002, rId, 'educourseCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "elctsctSeSn", gf_DhxGetValue(dhxGridMhsedu002, rId, 'elctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "educourseNm", gf_DhxGetValue(dhxGridMhsedu002, rId, 'educourseNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduSdt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduSdt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduShr", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduShr',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduEdt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduEdt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduEhr", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduEhr',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduDaycnt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduDaycnt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduPurps", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduPurps',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduCls", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduCls',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu002", "eduKind", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduKind',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu002", "eduMustAt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduMustAt',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu002", "eduAmtBurdenSe", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduAmtBurdenSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu002", "innerExtrlEduSe", gf_DhxGetValue(dhxGridMhsedu002, rId, 'innerExtrlEduSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu002", "eduZone", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduZone',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "chrgInstructorEmplAt", ((gf_DhxGetValue(dhxGridMhsedu002, rId, 'chrgInstructorEmplAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMhsedu002", "chrgInstructor", gf_DhxGetValue(dhxGridMhsedu002, rId, 'chrgInstructor',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "chrgInstructorNm", gf_DhxGetValue(dhxGridMhsedu002, rId, 'chrgInstructorNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduInstt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduInstt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "eduInsttAdres", gf_DhxGetValue(dhxGridMhsedu002, rId, 'eduInsttAdres',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "totFinishPnt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'totFinishPnt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "trgetCnt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'trgetCnt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "indvdlEducost", gf_DhxGetValue(dhxGridMhsedu002, rId, 'indvdlEducost',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "episRetunamt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'episRetunamt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "cochrgedocumentIsuAt", (( gf_DhxGetValue(dhxGridMhsedu002, rId, 'cochrgedocumentIsuAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMhsedu002", "extrlInstructorAllwnc", gf_DhxGetValue(dhxGridMhsedu002, rId, 'extrlInstructorAllwnc',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "rm", gf_DhxGetValue(dhxGridMhsedu002, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "atchmnflNo", gf_DhxGetValue(dhxGridMhsedu002, rId, 'atchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "elctsctDocNo", gf_DhxGetValue(dhxGridMhsedu002, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "elctsctSttusCode", gf_DhxGetValue(dhxGridMhsedu002, rId, 'elctsctSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "elctsctEmpno", gf_DhxGetValue(dhxGridMhsedu002, rId, 'elctsctEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "returnResn", gf_DhxGetValue(dhxGridMhsedu002, rId, 'returnResn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "selfReqstAt", gf_DhxGetValue(dhxGridMhsedu002, rId, 'selfReqstAt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "edureqstSn", gf_DhxGetValue(dhxGridMhsedu002, rId, 'edureqstSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "confmSeSn", gf_DhxGetValue(dhxGridMhsedu002, rId, 'confmSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "confmSttusCode", gf_DhxGetValue(dhxGridMhsedu002, rId, 'confmSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "qestnarCode", gf_DhxGetValue(dhxGridMhsedu002, rId, 'qestnarCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu002", "qestnarNm", gf_DhxGetValue(dhxGridMhsedu002, rId, 'qestnarNm',  'grid'), '');
    
    gf_FormSetValue('saveFormMhsedu002', 'atchmnfl', gf_DhxGetValue(dhxGridMhsedu002, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormMhsedu002', 'atchmnflList', gf_DhxGetValue(dhxGridMhsedu002, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일
    
    var atchmnflNo = gf_DhxGetValue(dhxGridMhsedu002, rId, 'atchmnflNo', 'grid');
    if(!gf_IsNull(atchmnflNo)){
    	var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridMhsedu002, rId, 'atchmnflNo',  'grid') };
    	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
    }
    
    var educourseCode = gf_DhxGetValue(dhxGridMhsedu002, rId, 'educourseCode', 'grid');
    var elctsctSeSn = gf_DhxGetValue(dhxGridMhsedu002, rId, 'elctsctSeSn', 'grid');
    var jsonParameter = {
	    	educourseCode : educourseCode,
	    	elctsctSeSn : elctsctSeSn
	    }
    gf_Transaction('', 'mhsedu002/searchMhseduTime', jsonParameter, 'fn_CallbackSearchMhseduTime', false, 'GET');
    
    var confmSttusCode = gf_DhxGetValue(dhxGridMhsedu002, rId, 'confmSttusCode', 'grid');
    if((confmSttusCode == '승인신청')){
    	$("#btnBugtAdd").show();
    	$("#btnBugtremove").show();
    	fn_FormDisabled(false);
    }else if (confmSttusCode == '승인'){
    	$("#btnBugtAdd").hide();
    	$("#btnBugtremove").hide();
    	fn_FormDisabled(true);
    } else if(confmSttusCode == '반려'){
    	$("#btnBugtAdd").hide();
    	$("#btnBugtremove").hide();
    	fn_FormDisabled(true);
    }
    
    $("#confmSttusCode").attr('disabled',true);

    var edureqstSn = gf_DhxGetValue(dhxGridMhsedu002, rId, 'edureqstSn', 'grid');
    var confmSeSn = gf_DhxGetValue(dhxGridMhsedu002, rId, 'confmSeSn', 'grid');
    var empno = gf_DhxGetValue(dhxGridMhsedu002, rId, 'empno', 'grid');
    var jsonParameter2 = {
    		confmSeSn : confmSeSn,
	    	edureqstSn : edureqstSn,
	    	empno : empno
	    }
    gf_Transaction('', 'mhsedu002/searchMhseduEmp', jsonParameter2, 'fn_CallbackSearchMhseduEmp', false, 'GET');
	
//    if(gf_IsNull(educourseCode)){
//    	dhxGridMhseduEmp.clearAll();
//    	gf_NoFoundDataOnGridMsg('dataListMhseduEmp');
//    	fn_DhxDataProcessorMhseduEmp();
//    }
    
    if(status == 'inserted') {
        $('#saveFormMhsedu002 input[name="educourseCode"]').prop('disabled', false);
        $('#saveFormMhsedu002 input[name="elctsctSeSn"]').prop('disabled', false);
    } else {
        $('#saveFormMhsedu002 input[name="educourseCode"]').prop('disabled', true);
        $('#saveFormMhsedu002 input[name="elctsctSeSn"]').prop('disabled', true);
    }
};

var fn_CallbackSearchMhseduTime = function(strSvcID, targetID, data) {
	dhxGridMhseduTime.clearAll();
	fn_DhxDataProcessorMhseduTime();
    if(!gf_IsNull(data.data.records)){
       dhxGridMhseduTime.parse(data.data.records, 'js');
       dhxGridMhseduTime.selectRow(0);
       } 
    //cf_SetEventListenerMhsedu001();
};
var fn_DhxDataProcessorMhseduTime = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhseduTime = new dataProcessor(gv_ContextPath+'/mhsedu002/saveMhseduTime'); //lock feed url
    dhxDataProcessorMhseduTime.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhseduTime.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhseduTime.init(dhxGridMhseduTime); //link dataprocessor to the grid
    dhxDataProcessorMhseduTime.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhseduTime.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhseduTime.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
        if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
            if(!gf_IsNull(dataSource.methodNm)){ 
                gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
            } else { 
                gf_DivMsgAlert(dataSource.message); 
            } 
            return false;
       } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                var educourseCode = dataSource.data.educourseCode;
    	   		var elctsctSeSn = dataSource.data.elctsctSeSn;
	   			dhxGridMhseduEmp.forEachRow(function(rowId) {
	   				dhxGridMhseduEmp.cells(rowId, gf_GetDhxGridColumId(dhxGridMhseduEmp, 'educourseCode')).setValue(educourseCode);
	   				dhxGridMhseduEmp.cells(rowId, gf_GetDhxGridColumId(dhxGridMhseduEmp, 'elctsctSeSn')).setValue(elctsctSeSn);
    	    		dhxDataProcessorMhseduEmp.setUpdated(rowId, true, 'inserted');
    	    	});
	   			dhxDataProcessorMhseduEmp.sendData();
                $("#checkAllMhsedu002").prop('checked', false); //상단 체크박스 해제
                return true;
        } else {
                gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                return false;
        }
});
};

var fn_CallbackSearchMhseduEmp = function(strSvcID, targetID, data) {
	dhxGridMhseduEmp.clearAll();
	fn_DhxDataProcessorMhseduEmp();
    if(!gf_IsNull(data.data.records)){
       gf_NoFoundDataOnGridMsgRemove('dataListMhseduEmp');
       dhxGridMhseduEmp.parse(data.data.records, 'js');
       dhxGridMhseduEmp.selectRow(0);
       } else {
           gf_NoFoundDataOnGridMsg('dataListMhseduEmp');
       } 
    $("#spanCntSearchFormMhseduEmp").text(data.data.records.length);
//    cf_SetEventListenerMhsedu001();
};
var fn_DhxDataProcessorMhseduEmp = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhseduEmp = new dataProcessor(gv_ContextPath+'/mhsedu002/saveMhseduEmp'); //lock feed url
    dhxDataProcessorMhseduEmp.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhseduEmp.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhseduEmp.init(dhxGridMhseduEmp); //link dataprocessor to the grid
    dhxDataProcessorMhseduEmp.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhseduEmp.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhseduEmp.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
        if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
            if(!gf_IsNull(dataSource.methodNm)){ 
                gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
            } else { 
                gf_DivMsgAlert(dataSource.message); 
            } 
            return false;
       } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
    	   		fn_SearchMhsedu002();
                $("#checkAllMhsedu002").prop('checked', false); //상단 체크박스 해제
                return true;
        } else {
                gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                return false;
        }
});
};

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMhsedu002', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMhsedu002', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormMhsedu002', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMhsedu002', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMhsedu002","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMhsedu002', 'empNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMhsedu002', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMhsedu002', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMhsedu002', 'empNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMhsedu002', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMhsedu002', 'empNm', 'text');
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
	 		gf_FormSetValue('searchFormMhsedu002', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhsedu002', 'empNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMhsedu002', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhsedu002', 'empNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMhsedu002', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMhsedu002', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMhsedu002","empno","empNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMhsedu002","empno","empNm", gBplcCode, "Y");
	  	}
  	}	
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
		gf_FormSetValue('saveFormMhsedu002', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormMhsedu002', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
      callbacks.fire();
	}
};




/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhsedu002 = function() {
    $('#saveFormMhsedu002 input[name="educourseCode"]').prop('disabled', false);
    $('#saveFormMhsedu002 input[name="elctsctSeSn"]').prop('disabled', false);
    $('#saveFormMhsedu002').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
  //  $('#saveFormMhsedu002 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhsedu002 = function() {
    dhxGridMhsedu002.clearSelection();
    fn_InitInputFormMhsedu002();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //educourseCode
    initValueArr.push(''); //elctsctSeSn
    initValueArr.push(''); //educourseNm
    initValueArr.push(''); //eduSdt
    initValueArr.push(''); //eduShr
    initValueArr.push(''); //eduEdt
    initValueArr.push(''); //eduEhr
    initValueArr.push(''); //eduDaycnt
    initValueArr.push(''); //eduPurps
    initValueArr.push(''); //eduCls
    initValueArr.push(''); //eduKind
    initValueArr.push(''); //eduMustAt
    initValueArr.push(''); //eduAmtBurdenSe
    initValueArr.push(''); //innerExtrlEduSe
    initValueArr.push(''); //eduZone
    initValueArr.push(''); //chrgInstructorEmplAt
    initValueArr.push(''); //chrgInstructor
    initValueArr.push(''); //chrgInstructorNm
    initValueArr.push(''); //eduInstt
    initValueArr.push(''); //eduInsttAdres
    initValueArr.push(''); //totFinishPnt
    initValueArr.push(''); //trgetCnt
    initValueArr.push(''); //indvdlEducost
    initValueArr.push(''); //episRetunamt
    initValueArr.push(''); //cochrgedocumentIsuAt
    initValueArr.push(''); //extrlInstructorAllwnc
    initValueArr.push(''); //rm
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctSttusCode
    initValueArr.push(''); //elctsctEmpno
    initValueArr.push(''); //returnResn
    initValueArr.push(''); //selfReqstAt
    dhxGridMhsedu002.addRow(dhxGridMhsedu002.uid(), initValueArr, 0);
    dhxGridMhsedu002.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhsedu002');
    $('#btnPopEmpSearchMhsedu002').show();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhsedu002SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhsedu002, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhsedu002', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhsedu002', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsedu002, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhsedu002.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhsedu002', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhsedu002', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsedu002, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhsedu002.setSortImgState(false); 
            gf_FormSetValue('searchFormMhsedu002', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhsedu002', 'sortColumId', '', 'text'); 
            dhxGridMhsedu002.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhsedu002.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhsedu002', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhsedu002', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsedu002, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhsedu002 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhsedu002 = 0; 
    save_Edt_Cnt_Mhsedu002 = 0; 
    save_Del_Cnt_Mhsedu002 = 0; 
    dhxGridMhsedu002.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhsedu002.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhsedu002.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhsedu002 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhsedu002 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhsedu002 += 1; 
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
        save_All_Sta_Mhsedu002 = 0; 
        if(save_Add_Cnt_Mhsedu002 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhsedu002 + "건";
            save_All_Sta_Mhsedu002 = 1; 
        } 
        if(save_Edt_Cnt_Mhsedu002 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhsedu002 + "건"; 
        } 
        if(save_Del_Cnt_Mhsedu002 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhsedu002 + "건"; 
            save_All_Sta_Mhsedu002 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhsedu002(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhsedu002(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhsedu002 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhsedu002_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhsedu002_Send = function() {
    if(fn_GridValidation(dhxGridMhsedu002, dhxDataProcessorMhsedu002)) {
        dhxDataProcessorMhsedu002.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhsedu002 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhsedu002, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhsedu002.forEachRow(function(rowId) {
            state = dhxDataProcessorMhsedu002.getState(rowId);
            if(dhxGridMhsedu002.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu002, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMhsedu002.getRowIndex(rowId);
                    dhxGridMhsedu002.deleteRow(rowId);
                    dhxGridMhsedu002.selectRow(rowNum);
                    fn_FindMhsedu002();
                }
                else dhxDataProcessorMhsedu002.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhsedu002 = function () {
    var titMhsedu002 = '교육신청관리'; /* gf_LocaleTrans('default', 'titMhsedu002') */
    var jsonParameter = {
        educourseCode : gf_FormGetValue('searchFormMhsedu002', 'educourseCode', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMhsedu002', 'elctsctSeSn', 'text')
    };
    var header = [[
        '교육과정코드' /* gf_LocaleTrans('default', 'titEducourseCode') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '교육과정명' /* gf_LocaleTrans('default', 'titEducourseNm') */,
        '교육 시작일자' /* gf_LocaleTrans('default', 'titEduSdt') */,
        '교육 시작시간' /* gf_LocaleTrans('default', 'titEduShr') */,
        '교육 종료일자' /* gf_LocaleTrans('default', 'titEduEdt') */,
        '교육 종료시간' /* gf_LocaleTrans('default', 'titEduEhr') */,
        '교육 일수' /* gf_LocaleTrans('default', 'titEduDaycnt') */,
        '교육 목적' /* gf_LocaleTrans('default', 'titEduPurps') */,
        '교육 분류' /* gf_LocaleTrans('default', 'titEduCls') */,
        '교육 종류' /* gf_LocaleTrans('default', 'titEduKind') */,
        '교육필수여부' /* gf_LocaleTrans('default', 'titEduMustAt') */,
        '교육비용부담구분' /* gf_LocaleTrans('default', 'titEduAmtBurdenSe') */,
        '내외부교육구분' /* gf_LocaleTrans('default', 'titInnerExtrlEduSe') */,
        '교육장소' /* gf_LocaleTrans('default', 'titEduZone') */,
        '담당강사사원여부' /* gf_LocaleTrans('default', 'titChrgInstructorEmplAt') */,
        '담당강사' /* gf_LocaleTrans('default', 'titChrgInstructor') */,
        '담당강사명' /* gf_LocaleTrans('default', 'titChrgInstructorNm') */,
        '교육기관' /* gf_LocaleTrans('default', 'titEduInstt') */,
        '교육기관주소' /* gf_LocaleTrans('default', 'titEduInsttAdres') */,
        '총이수학점' /* gf_LocaleTrans('default', 'titTotFinishPnt') */,
        '대상인원' /* gf_LocaleTrans('default', 'titTrgetCnt') */,
        '개인교육비' /* gf_LocaleTrans('default', 'titIndvdlEducost') */,
        '고용보험환급액' /* gf_LocaleTrans('default', 'titEpisRetunamt') */,
        '수료증발행여부' /* gf_LocaleTrans('default', 'titCochrgedocumentIsuAt') */,
        '외래강사수당' /* gf_LocaleTrans('default', 'titExtrlInstructorAllwnc') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */,
        '첨부파일번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '반려사유' /* gf_LocaleTrans('default', 'titReturnResn') */,
        '본인신청여부' /* gf_LocaleTrans('default', 'titSelfReqstAt') */
    ]];
    var dataId = [[ 'educourseCode', 'elctsctSeSn', 'educourseNm', 'eduSdt', 'eduShr', 'eduEdt', 'eduEhr', 'eduDaycnt', 'eduPurps', 'eduCls', 'eduKind', 'eduMustAt', 'eduAmtBurdenSe', 'innerExtrlEduSe', 'eduZone', 'chrgInstructorEmplAt', 'chrgInstructor', 'chrgInstructorNm', 'eduInstt', 'eduInsttAdres', 'totFinishPnt', 'trgetCnt', 'indvdlEducost', 'episRetunamt', 'cochrgedocumentIsuAt', 'extrlInstructorAllwnc', 'rm', 'atchmnflNo', 'returnResn', 'selfReqstAt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center','center' ]];
    var sheetNm = [[ titMhsedu002 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsedu002;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhsedu002/excelMhsedu002', jsonParameter);
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
    $('#saveFormMhsedu002 #educourseCodeSaveFormMhsedu002').parent().append(
    '<div class="error" id="educourseCodeSaveFormMhsedu002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsedu002 #elctsctSeSnSaveFormMhsedu002').parent().append(
    '<div class="error" id="elctsctSeSnSaveFormMhsedu002-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhsedu002 = function(educourseCode, elctsctSeSn){
    if(!gf_IsNull(educourseCode) && !gf_IsNull(elctsctSeSn)) {
        var jsonParameter = {
            educourseCode : educourseCode,
            elctsctSeSn : elctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('mhsedu002/findMhsedu002', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.educourseCode) && gf_IsNull(data.elctsctSeSn)) {
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
    var state = dhxDataProcessorMhsedu002.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhsedu002').validate().form()){
                if(state == 'inserted') {
                    var educourseCode = gf_FormGetValue('saveFormMhsedu002', 'educourseCode', 'text');
                    var elctsctSeSn = gf_FormGetValue('saveFormMhsedu002', 'elctsctSeSn', 'text');
                    if(fn_CheckDupMhsedu002(educourseCode, elctsctSeSn)) return true;
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
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhsedu002 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhsedu002 == 'deleted') {
        save_Row_Num_Mhsedu002 = 0;
        save_Row_Ids_Mhsedu002 = "";
    } else if(save_Row_Sta_Mhsedu002 == 'inserted') {
        save_Row_Num_Mhsedu002 = rowNum;
        save_Row_Ids_Mhsedu002 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhsedu002 = rowNum;
        save_Row_Ids_Mhsedu002 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
            	if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'educourseNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'educourseNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduSdt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduSdt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduShr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduShr');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduEdt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduEdt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduEhr', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduEhr');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduCls', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduCls');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduKind', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduKind');
                    valid = false;
                }
//                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduMustAt', 'grid') )){
//                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduMustAt');
//                    valid = false;
//                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduAmtBurdenSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduAmtBurdenSe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'innerExtrlEduSe', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'innerExtrlEduSe');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'chrgInstructorNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'chrgInstructorNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'qestnarCode', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'qestnarCode');
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
        dhxGridMhsedu002.selectRowById(validFalseFistRowId);
        fn_FindMhsedu002();
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

var fn_BugtAdd = function() {
	var rowId = dhxGridMhsedu002.getSelectedRowId();
	
	var exit = false;
	if(fn_GridValidation(dhxGridMhsedu002, dhxDataProcessorMhsedu002)) {
		exit = true;
    }
	if(exit == true){
		
		//var educourseCode = dhxGridMhsedu002.cells(dhxGridMhsedu002.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu002, 'educourseCode')).getValue();
			// 선택된 값마다 해당 지급일자 Set 해준다.
		//alert(educourseCode);
		///dhxGridMhsedu002.cells(dhxGridMhsedu002.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu002, 'confmSttusCode')).setValue("002");
		//dhxGridMhsedu002.cells(dhxGridMhsedu002.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu002, 'selfReqstAt')).setValue("1");
		//dhxDataProcessorMhsedu002.setUpdated(rowId, true, 'updated');
		//dhxDataProcessorMhsedu002.sendData();
		fn_SaveMhsedu002();
//	console.log(jsonParameter);
		//gf_Transaction(jsonParameter, 'mhshrb003/saveMhsedu002', jsonParameter, 'fn_CallbackSaveMhshrb003Tab1', false, 'POST');
	}
		
}
//승인저장
var fn_SaveMhsedu002 = function() {
	var rId = dhxGridMhsedu002.getSelectedRowId();
	var educourseCode = gf_FormGetValue('saveFormMhsedu002', 'educourseCode', 'text');
	var confmSttusCode = gf_DhxGetValue(dhxGridMhsedu002, rId, 'confmSttusCode', 'grid');
	var edureqstSn = gf_DhxGetValue(dhxGridMhsedu002, rId, 'edureqstSn', 'grid');
	var confmSeSn = gf_DhxGetValue(dhxGridMhsedu002, rId, 'confmSeSn', 'grid');
	var jsonParameter = {
			educourseCode : educourseCode,
			confmSttusCode : confmSttusCode,
			edureqstSn : edureqstSn,
			confmSeSn : confmSeSn
	};
//	console.log(jsonParameter);
	gf_Transaction(jsonParameter, 'mhsedu002/saveMhseduReqst', jsonParameter, 'fn_CallbackSaveMhsedu002', false, 'POST');
};
var fn_CallbackSaveMhsedu002 = function(strSvcID, targetID, data){
	if(data.code != '000') {
		gf_DivMsgAlert("데이터 반환 에러"); // 컨트롤러 반환 오류
	}
	else if(!gf_IsNull(data.data) || data.code == "000"){
		var obj = data.data;
		if(obj.code == "000"){
			fn_SearchMhsedu002();
		}
		else{
			fn_SearchMhsedu002();
		}
	}
}
var fn_PopupDtlMhseduPop = function(formId, codeId, codeNmId, param) {
	var userId = ""; 
	var title  = "반려내용";
	//저장팝업
	var dhxWindowObj;
	var popupDtlRequst;
	if($('body').find("div[id='popupDtlRequst']").size() <= 0) {
		$('body').append("<div id='popupDtlRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupDtlRequst').bPopup({
		onOpen:function(){
			
			popupDtlRequst = new dhtmlXWindows();
			var id 		= 'popupDtlRequest';
			var ajaxUrl = gv_ContextPath+'/mhsedu002/popup/popupDtlRequest/view?'+param;
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
				$('#popupDtlRequst .b-close').click();
			});
		},
		onClose:function(){
			popupDtlRequst.unload();
			$('body').find("div[id='popupDtlRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}

var $popupQestInfo = {};
var gf_QestPopup = function(formId, codeKindCode, codeId, codeNmId, bplcCode, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "설문조사";
	var codeInfo = "popupQestInfo";	
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

	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	$popupQestInfo = {};
	
	
	var dhxWindowObj;
	var dhxWindows;
	
	if($('body').find("div[id='popupQestPopup']").size() <= 0) {
		$('body').append("<div id='popupQestPopup' formid='" + formId + "' codeKindCode='" + codeKindCode + "' codeInfo='" + codeInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupQestPopup').bPopup({
		onOpen:function(){
			
			dhxWindows = new dhtmlXWindows();
			
			var id 		= 'popupQestPopup';
			var ajaxUrl = gv_ContextPath+'/mhsedu001/pop/popupQest/view';
			var left	= 0;
			var top		= 0;
			var width	= 600;
			var height	= 450;

			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#popupQestPopup .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($popupQestInfo);
			}
			
			dhxWindows.unload();
			$('body').find("div[id='popupQestPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
}

var fn_CallbackGridPopComp = function(data){
	
//	gf_FormSetValue('saveFormPubedu001', 'eduKind', data.eduKind, 'combo');
	gf_FormSetValue('saveFormMhsedu002', 'qestnarCode', data.qestnarCode, 'hidden');
	gf_FormSetValue('saveFormMhsedu002', 'qestnarNm', data.qestnarNm, 'text');
	dhxGridMhsedu002.cells(dhxGridMhsedu002.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu002,'qestnarCode')).setValue(data.qestnarCode);
	
}
