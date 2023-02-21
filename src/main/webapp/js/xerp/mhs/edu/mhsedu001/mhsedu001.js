/**
 *    프로그램       : 교육과정등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.21
 *    사용테이블      : MHS_EDUCRSE
 * sourceGen version : 2020.07.16.01 (2020.08.21)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhsedu001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhsedu001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhsedu001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhsedu001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhsedu001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhsedu001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhsedu001 = 0;  //그리드 삭제 수량 

var save_Row_Num_MhseduTime = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MhseduTime = 0;  //그리드 위치 상태 
var save_All_Sta_MhseduTime = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MhseduTime = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MhseduTime = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MhseduTime = 0;  //그리드 저장 수량 
var save_Del_Cnt_MhseduTime = 0;  //그리드 삭제 수량 

var save_Row_Num_MhseduEmp = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MhseduEmp = 0;  //그리드 위치 상태 
var save_All_Sta_MhseduEmp = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MhseduEmp = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MhseduEmp = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MhseduEmp = 0;  //그리드 저장 수량 
var save_Del_Cnt_MhseduEmp = 0;  //그리드 삭제 수량 

var dhxGridMhsedu001;  //그리드 객체
var eventIdMhsedu001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhsedu001;  //DataProcessor 객체
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
    cf_InitParamMhsedu001();
    if(cf_SetComponentsMhsedu001()){
       cf_SetEventListenerMhsedu001();
       cf_InitFormMhsedu001();
       cf_SetBindingMhsedu001();
       fn_FileUploadPrgEvent();	 //파일첨부
    }
});

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
		gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduSdt', gf_FormGetValue('saveFormMhsedu001', 'eduSdt', 'text'));
		deCount();
	});
	
	dhxCCalendarDate1.attachEvent("onClick" , function(){
		gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduEdt', gf_FormGetValue('saveFormMhsedu001', 'eduEdt', 'text'));
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
	dhxSearchCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormMhsedu001', 'stDate', 'text'));
	dhxSearchCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormMhsedu001', 'edDate', 'text'));	
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
	var sdd = gf_FormGetValue('saveFormMhsedu003', 'eduSdt', 'text');
    var edd = gf_FormGetValue('saveFormMhsedu003', 'eduEdt', 'text');
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
var cf_InitParamMhsedu001 = function() {
	 gf_SetMenuPath();
	    $("#saveFormMhsedu001").validate({ errorElement: 'div', ignore: '' });

	    gf_ComboCode('divComboeduCls','eduCls','eduCls', 'sel', 'C206', '' , '', '', 'ordr', 'required','',''); // 교육분류
	    gf_ComboCode('divComboSearcheduCls','searcheduCls','searcheduCls', 'search', 'C206', '' , '', '', 'ordr', 'required','',''); // 조회 교육분류
	    gf_ComboCode('divComboeduKind','eduKind','eduKind', 'sel', 'C114', '' , '', '', 'ordr', 'required','',''); // 교육종류
	    gf_ComboCode('divComboeduMustAt','eduMustAt','eduMustAt', 'sel', 'C112', '' , '', '', 'ordr', 'required','',''); // 교육필수여부
	    gf_ComboCode('divComboSearcheduMustAt','searcheduMustAt','searcheduMustAt', 'search', 'C112', '' , '', '', 'ordr', 'required','',''); // 조회 교육필수여부
	    gf_ComboCode('divComboeduAmtBurdenSe','eduAmtBurdenSe','eduAmtBurdenSe', 'sel', 'C111', '' , '', '', 'ordr', 'required','',''); // 교육비용부담구분
	    gf_ComboCode('divComboinnerExtrlEduSe','innerExtrlEduSe','innerExtrlEduSe', 'sel', 'C208', '' , '', '', 'ordr', 'required','',''); // 내외부교육구분
	    gf_ComboCode('divCombochrgInstructor','chrgInstructor','chrgInstructor', 'sel', 'C046', '' , '', '', 'ordr', 'required','',''); // 내외부교육구분
	    gf_ComboCode('divComboelctsctSttusCode','elctsctSttusCode','elctsctSttusCode', 'sel', 'EA004', '' , '', '', 'ordr', '','',''); // 처리상태
	    gf_ComboCode('divComboSearchelctsctSttusCode','searchelctsctSttusCode','searchelctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', 'required','',''); // 처리상태
	    //세션정보 
		var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
	    gBplcCode = userInfo.data.bplcCode;
	    
	    $("#indvdlEducostSaveFormMhsedu001").number(true);
	    $("#extrlInstructorAllwncSaveFormMhsedu001").number(true);
	    $("#episRetunamtSaveFormMhsedu001").number(true);
	    
	    $("#educourseNmSearchFormMhsedu001").focus();
	    
	    fn_Date();
};

var cf_SetComponentsMhsedu001 = function() {
    var dhxGridMhsedu001HeaderInfo = [];
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhsedu001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '200', 'center', 'str', 'ro', false, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('순번', '40', 'center', 'int', 'ro', false, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육과정명', '*', 'left', 'str', 'ro', false, 'educourseNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseNm') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작일자', '0', 'left', 'str', 'ro', true, 'eduSdt', '', '')); /* gf_LocaleTrans('default', 'titEduSdt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작시간', '0', 'left', 'str', 'ro', true, 'eduShr', '', '')); /* gf_LocaleTrans('default', 'titEduShr') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료일자', '0', 'left', 'str', 'ro', true, 'eduEdt', '', '')); /* gf_LocaleTrans('default', 'titEduEdt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료시간', '0', 'left', 'str', 'ro', true, 'eduEhr', '', '')); /* gf_LocaleTrans('default', 'titEduEhr') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 일수', '0', 'right', 'int', 'ro', true, 'eduDaycnt', '', '')); /* gf_LocaleTrans('default', 'titEduDaycnt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 목적', '0', 'left', 'str', 'ro', true, 'eduPurps', '', '')); /* gf_LocaleTrans('default', 'titEduPurps') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 분류 ', '0', 'left', 'str', 'ro', true, 'eduCls', '', '')); /* gf_LocaleTrans('default', 'titEduCls') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 종류 ', '0', 'left', 'str', 'ro', true, 'eduKind', '', '')); /* gf_LocaleTrans('default', 'titEduKind') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 필수 여부 ', '0', 'center', 'str', 'ro', true, 'eduMustAt', '', '')); /* gf_LocaleTrans('default', 'titEduMustAt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 비용 부담 구분', '0', 'right', 'int', 'ro', true, 'eduAmtBurdenSe', '', '')); /* gf_LocaleTrans('default', 'titEduAmtBurdenSe') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('내외부 교육 구분', '0', 'center', 'str', 'ro', true, 'innerExtrlEduSe', '', '')); /* gf_LocaleTrans('default', 'titInnerExtrlEduSe') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 장소', '0', 'left', 'str', 'ro', true, 'eduZone', '', '')); /* gf_LocaleTrans('default', 'titEduZone') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 사원 여부', '0', 'center', 'str', 'ch', true, 'chrgInstructorEmplAt', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructorEmplAt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 ', '0', 'left', 'str', 'ro', true, 'chrgInstructor', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructor') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 명 ', '0', 'left', 'str', 'ro', true, 'chrgInstructorNm', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructorNm') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 기관', '0', 'left', 'str', 'ro', true, 'eduInstt', '', '')); /* gf_LocaleTrans('default', 'titEduInstt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육기관주소', '0', 'left', 'str', 'ro', true, 'eduInsttAdres', '', '')); /* gf_LocaleTrans('default', 'titEduInsttAdres') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('총 이수 학점', '0', 'left', 'str', 'ro', true, 'totFinishPnt', '', '')); /* gf_LocaleTrans('default', 'titTotFinishPnt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('대상 인원', '0', 'right', 'int', 'ro', true, 'trgetCnt', '', '')); /* gf_LocaleTrans('default', 'titTrgetCnt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('개인 교육비', '0', 'left', 'str', 'edn', true, 'indvdlEducost', '', '')); /* gf_LocaleTrans('default', 'titIndvdlEducost') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('고용 보험 환급액', '0', 'right', 'int', 'edn', true, 'episRetunamt', '', '')); /* gf_LocaleTrans('default', 'titEpisRetunamt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('수료증 발행 여부', '0', 'center', 'str', 'ch', true, 'cochrgedocumentIsuAt', '', '')); /* gf_LocaleTrans('default', 'titCochrgedocumentIsuAt') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('외래 강사 수당', '0', 'right', 'int', 'edn', true, 'extrlInstructorAllwnc', '', '')); /* gf_LocaleTrans('default', 'titExtrlInstructorAllwnc') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '0', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호 ', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드 ', '0', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호  ', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('반려 사유', '0', 'left', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('복사여부', '0', 'center', 'str', 'ro', true, 'copyFlag', '', ''));
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('개인신청여부', '0', 'center', 'str', 'ro', true, 'selfReqstAt', '', ''));
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('설문조사코드', '0', 'center', 'str', 'ro', true, 'qestnarCode', '', ''));
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('총이수시간', '0', 'center', 'str', 'ro', true, 'totFinishTime', '', ''));
    dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('설문조사명', '0', 'center', 'str', 'ro', true, 'qestnarNm', '', ''));
	dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('신청여부개수', '0', 'center', 'str', 'ro', false, 'reqstCnt', '', ''));
	dhxGridMhsedu001HeaderInfo.push(gf_MakeDhxGridHeader('신청여부개수', '0', 'center', 'str', 'ro', false, 'reqstCnt2', '', '')); 
    dhxGridMhsedu001 = gf_MakeDhxGrid('dataListMhsedu001', dhxGridMhsedu001HeaderInfo, true, false, false);
    dhxGridMhsedu001.enableAutoWidth(false);
    dhxGridMhsedu001.setEditable(true);
    
    dhxGridMhsedu001.setNumberFormat("0,000", dhxGridMhsedu001.getColIndexById("indvdlEducost"), ".", ",");
    dhxGridMhsedu001.setNumberFormat("0,000", dhxGridMhsedu001.getColIndexById("extrlInstructorAllwnc"), ".", ",");
    dhxGridMhsedu001.setNumberFormat("0,000", dhxGridMhsedu001.getColIndexById("episRetunamt"), ".", ",");
    
    dhxGridMhsedu001.setColumnMinWidth(80,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
    // 교육분류
    var eduClsjsonParameter = {codekindCode : "C206",exceptCode :"",sortOrder :"asc" };
    var eduClsdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduClsjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu001, dhxGridMhsedu001.getColIndexById("eduCls"), eduClsdataSource.data, "sel");
    
    // 교육종류
    var eduKindjsonParameter = {codekindCode : "C114",exceptCode :"",sortOrder :"asc" };
    var eduKinddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduKindjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu001, dhxGridMhsedu001.getColIndexById("eduKind"), eduKinddataSource.data, "sel");
    
    // 교육필수여부
    var eduMustAtjsonParameter = {codekindCode : "C112",exceptCode :"",sortOrder :"asc" };
    var eduMustAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduMustAtjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu001, dhxGridMhsedu001.getColIndexById("eduMustAt"), eduMustAtdataSource.data, "sel");

    // 교육 비용 부담 구분
    var eduAmtBurdenSejsonParameter = {codekindCode : "C111",exceptCode :"",sortOrder :"asc" };
    var eduAmtBurdenSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduAmtBurdenSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu001, dhxGridMhsedu001.getColIndexById("eduAmtBurdenSe"), eduAmtBurdenSedataSource.data, "sel");
    
    // 내외부 교육 구분
    var innerExtrlEduSejsonParameter = {codekindCode : "C208",exceptCode :"",sortOrder :"asc" };
    var innerExtrlEduSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', innerExtrlEduSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu001, dhxGridMhsedu001.getColIndexById("innerExtrlEduSe"), innerExtrlEduSedataSource.data, "sel");
    
    // 처리상태
    var elctsctSttusCodejsonParameter = {codekindCode : "EA004",exceptCode :"",sortOrder :"asc" };
    var elctsctSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', elctsctSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu001, dhxGridMhsedu001.getColIndexById("elctsctSttusCode"), elctsctSttusCodedataSource.data, "sel");
    
    
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
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('이수 학점', '0', 'left', 'str', 'ro', true, 'finishPnt', '', '')); /* gf_LocaleTrans('default', 'titFinishPnt') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('총 교육비', '0', 'right', 'int', 'ro', true, 'totEducost', '', '')); /* gf_LocaleTrans('default', 'titTotEducost') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('고용보험 환급액', '0', 'right', 'int', 'ro', true, 'episRetunamt', '', '')); /* gf_LocaleTrans('default', 'titEpisRetunamt') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('개인 교육비', '0', 'right', 'int', 'ro', true, 'indvdlEducost', '', '')); /* gf_LocaleTrans('default', 'titIndvdlEducost') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('교통비', '0', 'right', 'int', 'ro', true, 'trnsportct', '', '')); /* gf_LocaleTrans('default', 'titTrnsportct') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('일비', '0', 'right', 'int', 'ro', true, 'dayct', '', '')); /* gf_LocaleTrans('default', 'titDayct') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('식대 비용', '0', 'right', 'int', 'ro', true, 'cgffdAmt', '', '')); /* gf_LocaleTrans('default', 'titCgffdAmt') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('숙박비', '0', 'right', 'int', 'ro', true, 'stayngct', '', '')); /* gf_LocaleTrans('default', 'titStayngct') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('수료 여부', '0', 'center', 'str', 'ro', true, 'cochrgeAt', '', '')); /* gf_LocaleTrans('default', 'titCochrgeAt') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    //dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '0', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhseduEmpHeaderInfo.push(gf_MakeDhxGridHeader('본인 신청 여부', '0', 'center', 'str', 'ro', true, 'selfReqstAt', '', ''));
    
    dhxGridMhseduEmp = gf_MakeDhxGrid('dataListMhseduEmp', dhxGridMhseduEmpHeaderInfo, true, false, false);
    dhxGridMhseduEmp.enableAutoWidth(true);
    dhxGridMhseduEmp.setEditable(true);
    
    dhxGridMhseduEmp.setColumnMinWidth(80,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    
    return true; 
};

var cf_SetEventListenerMhsedu001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhsedu001 = gf_GridDetachEvent(dhxGridMhsedu001, eventIdMhsedu001);
    eventId = dhxGridMhsedu001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhsedu001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhsedu001.getColumnsNum();
            var rowNum = dhxGridMhsedu001.getRowsNum();
            var selectedId = dhxGridMhsedu001.getSelectedRowId();
            var ind        = dhxGridMhsedu001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu001.getRowIndex(selectedId);
            var type       = dhxGridMhsedu001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhsedu001.selectRow(0);
                    //fn_FindMhsedu001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhsedu001.selectRow(rowIndex + 1);
                    fn_FindMhsedu001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhsedu001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhsedu001.getSelectedRowId();
            var ind        = dhxGridMhsedu001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu001.getRowIndex(selectedId);
            var type       = dhxGridMhsedu001.getColType(ind);
            dhxGridMhsedu001.selectCell(rowIndex+1, ind);
            fn_FindMhsedu001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhsedu001.getSelectedRowId();
            var ind        = dhxGridMhsedu001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu001.getRowIndex(selectedId);
            var type       = dhxGridMhsedu001.getColType(ind);
            dhxGridMhsedu001.selectCell(rowIndex-1, ind);
            fn_FindMhsedu001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu001.editCell();
            }
        }
        else return true;
    });
    eventIdMhsedu001.push(eventId);
    eventId = dhxGridMhsedu001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhsedu001SortGridList(ind, type, direction); 
    });
    eventIdMhsedu001.push(eventId);
    eventId = dhxGridMhsedu001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhsedu001.push(eventId);
    eventId = dhxGridMhsedu001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhsedu001();
    });
    eventIdMhsedu001.push(eventId);
    eventId = dhxGridMhsedu001.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        if(cInd == gf_GetDhxGridColumId(dhxGridMhsedu001, 'chk')){
            var checkbox = dhxGridMhsedu001.cells(rId, cInd);
            checkbox.isChecked() ? checkbox.setChecked(false) : checkbox.setChecked(true);
            return false;
        }
        return true;
    });
    eventId = dhxGridMhseduTime.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
    	console.log(dhxGridMhsedu001.getRowsNum())
    	
    	if (dhxGridMhsedu001.getRowsNum() < 1){
            gf_DivMsgAlert('수정하실수 없습니다.'); 
            return false;    		
    	}else{
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
//                 dhxDataProcessorMhseduTime.setUpdated(rId, true, 'updated');
            }
        return true;
    	}
    });
    eventIdMhsedu001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhsedu001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhsedu001()
    });
    $('#btnSaveMhsedu001').unbind('click').bind('click', function() {
        //gf_errorMsgClear();
        var chrgInstructorNm = gf_FormGetValue('saveFormMhsedu001', 'chrgInstructorNm', 'text');
		if(gf_IsNull(chrgInstructorNm)){
			gf_DivMsgAlert('교육과정을 등록해주세요.'); 
			return false;
		}
        dhxGridMhsedu001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhsedu001.getState(rowId))) {
        	var stateCn = dhxDataProcessorMhsedu001.getState(rowId);
        		if(stateCn == 'inserted'){
        			fn_SaveMhsedu001();	
        		}else if(stateCn == 'updated'){
        			fn_SaveMhsedu001();
        		}else if(stateCn == 'deleted'){
	
					  var reqstCnt = dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001,'reqstCnt')).getValue();
					  var reqstCnt2 = dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001,'reqstCnt2')).getValue();
					  var educourseCode = dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001,'educourseCode')).getValue();
				    	// alert(reqstCnt);
					  if(reqstCnt != '0' || reqstCnt2 != '0'){
						gf_DivMsgAlert(educourseCode+' 는 이미 신청된 교육입니다.');
        				return false;
					  }else{
	
        			dhxGridMhseduEmp.forEachRow(function(rowId) {

        				dhxDataProcessorMhseduEmp.setUpdated(rowId, true, 'deleted');
        			});
        			dhxGridMhseduTime.forEachRow(function(rowId) {
        				dhxDataProcessorMhseduTime.setUpdated(rowId, true, 'deleted');
        			});
        			gf_DivMsgConfirm("삭제 하시겠습니까?",'GridSend()','Gridreset()');
					}
        		} 
        	}else{
        		dhxGridMhseduTime.forEachRow(function(rowId) {
        		    if(!gf_IsNull(dhxDataProcessorMhseduTime.getState(rowId))) {
        		       	var stateTime = dhxDataProcessorMhseduTime.getState(rowId);
        		       		if(stateTime == 'updated'){
        		       			fn_SaveMhseduTime();
        		       		}
        		       	}
        		  });
        	}
        });
        
    });
    $('#btnRemoveMhsedu001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhsedu001();
    });
    $('#btnExcelMhsedu001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhsedu001();
    });
    $('#btnSearchMhsedu001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhsedu001('');
    });
    $('#btnResetMhsedu001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        fn_SearchMhsedu001('');
    });
    $('#btnqestnarCodeSearch').unbind("click").bind("click",function() {
    	gf_QestPopup('','','','', '', "N", "fn_CallbackGridPopComp");
    });
    // 품목정보 Add 버튼 이벤트
    $('#btnAddStmCode').unbind("click").bind("click",function() {
    	gf_errorMsgClear();
    	var educourseCode = dhxGridMhsedu001.cells(dhxGridMhsedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu001,'educourseCode')).getValue();
    	if(gf_IsNull(educourseCode)){
    		gf_DivMsgAlert("교육과정 먼저 저장해주세요.");
    	}else{
    		fn_AddMhseduEmp();
    	}
    });
    // 품목정보 Remove 버튼 이벤트
    $('#btnRemoveStmCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhseduEmp();
    });
    // 품목정보 Save 버튼 이벤트
    $('#btnSaveStmCode').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhseduEmp();
    });
    // 품목정보 Save 버튼 이벤트
    $('#btnpostCodeSearch').unbind('click').bind('click', function() {
    	
    	var chrgInstructorEmplAt = gf_FormGetValue('saveFormMhsedu001', 'chrgInstructorEmplAt', 'chkbox')? '0' : '1';
    	if(chrgInstructorEmplAt == '0'){
    		gf_EmpPopup("saveFormMhsedu001","","", '1000', "Y", "fn_CallbackPopEmp1");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    	} else if(chrgInstructorEmplAt == '1'){
    		gf_IncomeKindPopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");
    	}
    });
    // copy 버튼
    $('#btnBugtcopy').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var educourseCode = gf_FormGetValue('saveFormMhsedu001', 'educourseCode', 'text');
        if(gf_IsNull(educourseCode)){
        	gf_DivMsgAlert("조회된 교육과정이 없습니다. 재조회 해주세요.");
        	return false;
        }else{
        	fn_SaveCopyMhsedu001();        	
        }
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhsedu001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhsedu001, $('#checkAllMhsedu001').prop('checked'), 'chk');
    });
    $('#searchFormMhsedu001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhsedu001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsedu001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhsedu001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhsedu001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsedu001 input[name="educourseCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'educourseCode', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="elctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'elctsctSeSn', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="educourseNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'educourseNm', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="eduSdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduSdt', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="eduShr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduShr', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="eduEdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduEdt', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="eduEhr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduEhr', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="eduDaycnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduDaycnt', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="eduPurps"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduPurps', $(this).val());
    });
    $('#saveFormMhsedu001 select[name="eduCls"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduCls', gf_FormGetValue('saveFormMhsedu001', 'eduCls', 'combo'));
    });
    $('#saveFormMhsedu001 select[name="eduKind"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        var eduKind = gf_FormGetValue('saveFormMhsedu001', 'eduKind', 'combo');
        if(eduKind == '12'){
        	$('input[name="qestnarNm"]').attr("required",false);
        }else{
        	$('input[name="qestnarNm"]').attr("required",true);
        }
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduKind', gf_FormGetValue('saveFormMhsedu001', 'eduKind', 'combo'));
    });
    $('#saveFormMhsedu001 select[name="eduMustAt"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduMustAt', gf_FormGetValue('saveFormMhsedu001', 'eduMustAt', 'combo'));
    });
    $('#saveFormMhsedu001 select[name="eduAmtBurdenSe"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduAmtBurdenSe', gf_FormGetValue('saveFormMhsedu001', 'eduAmtBurdenSe', 'combo'));
    });
    $('#saveFormMhsedu001 select[name="innerExtrlEduSe"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'innerExtrlEduSe', gf_FormGetValue('saveFormMhsedu001', 'innerExtrlEduSe', 'combo'));
    });
    $('#saveFormMhsedu001 input[name="eduZone"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduZone', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="chrgInstructorEmplAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormMhsedu001', 'chrgInstructorEmplAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'chrgInstructorEmplAt', val);
    });
    $('#saveFormMhsedu001 input[name="chrgInstructor"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'chrgInstructor', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="chrgInstructorNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'chrgInstructorNm', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="eduInstt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduInstt', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="eduInsttAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'eduInsttAdres', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="totFinishPnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'totFinishPnt', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="trgetCnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'trgetCnt', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="indvdlEducost"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'indvdlEducost', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="episRetunamt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'episRetunamt', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="cochrgedocumentIsuAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormMhsedu001', 'cochrgedocumentIsuAt', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'cochrgedocumentIsuAt', val);
    });
    $('#saveFormMhsedu001 input[name="extrlInstructorAllwnc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'extrlInstructorAllwnc', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'rm', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="elctsctDocNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'elctsctDocNo', $(this).val());
    });
    $('#saveFormMhsedu001 select[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'elctsctSttusCode', gf_FormGetValue('saveFormMhsedu001', 'elctsctSttusCode', 'combo'));
    });
    $('#saveFormMhsedu001 input[name="elctsctEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'elctsctEmpno', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="returnResn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'returnResn', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="qestnarCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'qestnarCode', $(this).val());
    });
    $('#saveFormMhsedu001 input[name="qestnarNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu001, dhxDataProcessorMhsedu001, 'qestnarNm', $(this).val());
    });
    
  //기간달력 이벤트 추가
    $('#searchFormMhsedu001 #date2').unbind('click').bind('click', function(event){
        //dhxCCalendarDate2.setPosition("bottom"); // "bottom"
        //$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
        dhxSearchCCalendarDate2.show();
    });
    //기간달력 이벤트 추가
    $('#searchFormMhsedu001 .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_DateCheck($(this));
    });
    $('#saveFormMhsedu001 .input_calen').unbind('keyup').bind('keyup', function(event){
    	gf_DateCheck($(this));
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhsedu001 = function() {
	$('#searchFormMhsedu001').resetForm();
	$('#chrgInstructorSaveFormMhsedu001').attr('disabled', true);
	$('#chrgInstructorNmSaveFormMhsedu001').attr('disabled', true);
	gf_FormSetValue('searchFormMhsedu001', 'stDate',gv_Predate, 'text');
    gf_FormSetValue('searchFormMhsedu001', 'edDate',gv_Curdate, 'text');
};

var cf_SetBindingMhsedu001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhsedu001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhsedu001 = function(userId) {
	
	var stDate = gf_FormGetValue('searchFormMhsedu001', 'stDate', 'text').replaceAll('-','');
    var edDate = gf_FormGetValue('searchFormMhsedu001', 'edDate', 'text').replaceAll('-','');
    
    var jsonParameter = {
    	stDate : stDate,
        edDate : edDate,
        searcheduCls : gf_FormGetValue('searchFormMhsedu001', 'searcheduCls', 'combo'),
        searcheduMustAt : gf_FormGetValue('searchFormMhsedu001', 'searcheduMustAt', 'combo'),
        searchelctsctSttusCode : gf_FormGetValue('searchFormMhsedu001', 'searchelctsctSttusCode', 'combo'),
        educourseNm : gf_FormGetValue('searchFormMhsedu001', 'educourseNm', 'text')
        
    };
    gf_Transaction(userId, 'mhsedu001/searchMhsedu001', jsonParameter, 'fn_CallbackSearchMhsedu001', false, 'GET');
//    gf_Transaction('', 'mhsedu001/searchMhseduTime', jsonParameter, 'fn_CallbackSearchMhseduTime', false, 'GET');
    
    var educourseCode = gf_FormGetValue('saveFormMhsedu001', 'educourseCode', 'text');
    var elctsctSeSn = gf_FormGetValue('saveFormMhsedu001', 'elctsctSeSn', 'text');
    if(!gf_IsNull(educourseCode) && !gf_IsNull(elctsctSeSn)){
    	var jsonParameter = {
      	    	educourseCode:educourseCode,
      	    	elctsctSeSn:elctsctSeSn
      	    }
        gf_Transaction('', 'mhsedu001/searchMhseduEmp', jsonParameter, 'fn_CallbackSearchMhseduEmp', false, 'GET');
    }
    
};

var fn_CallbackSearchMhsedu001 = function(strSvcID, targetID, data) {
    dhxGridMhsedu001.clearAll();
//    dhxGridMhsedu001.destructor();
    if(cf_SetComponentsMhsedu001()){ 
        fn_DhxDataProcessorMhsedu001();
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhsedu001');
            dhxGridMhsedu001.parse(data.data.records, 'js');
            if(save_Row_Num_Mhsedu001 == 0 && save_All_Sta_Mhsedu001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhsedu001.selectRow(0); 
            } else if(save_Row_Sta_Mhsedu001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhsedu001.selectRow(0);
            } else if(save_All_Sta_Mhsedu001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhsedu001.selectRow(save_Row_Num_Mhsedu001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhsedu001.selectRow(save_Row_Num_Mhsedu001);   //개발자 수정 필요  
                //var findCell = dhxGridMhsedu001.findCell(save_Row_Ids_Mhsedu001, gf_GetDhxGridColumId(dhxGridMhsedu001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhsedu001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhsedu001.selectRow(0);
                //} 
            } 
 
            fn_FindMhsedu001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhsedu001');
            gf_NoFoundDataOnGridMsg('dataListMhseduEmp');
          	gf_NoFoundDataOnGridMsg('dataListMhseduTime');
            fn_InitInputFormMhsedu001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhsedu001").text(data.data.records.length);
        cf_SetEventListenerMhsedu001();
    } 
};
var fn_DhxDataProcessorMhsedu001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhsedu001 = new dataProcessor(gv_ContextPath+'/mhsedu001/saveMhsedu001'); //lock feed url
    dhxDataProcessorMhsedu001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhsedu001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsedu001.init(dhxGridMhsedu001); //link dataprocessor to the grid
    dhxDataProcessorMhsedu001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhsedu001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhsedu001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
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
                    
//    	   			dhxGridMhseduTime.forEachRow(function(rowId) {
//        	    		dhxGridMhseduTime.cells(rowId, gf_GetDhxGridColumId(dhxGridMhseduTime, 'educourseCode')).setValue(educourseCode);
//        	    	});
//    	   			dhxDataProcessorMhseduTime.sendData();
//    	   			
//    	   			var state;
//                    dhxGridMhseduTime.forEachRow(function(rowId) {
//            			state = dhxDataProcessorMhseduTime.getState(rowId);
//            				if(state == 'updated'){
//                        	dhxDataProcessorMhsedu001.sendData();
//                        }
//            		});
                    
                    fn_SearchMhsedu001();
                    
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
var fn_FindMhsedu001 = function() {
    var rId = dhxGridMhsedu001.getSelectedRowId();
    var status = dhxDataProcessorMhsedu001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormMhsedu001", "educourseCode", gf_DhxGetValue(dhxGridMhsedu001, rId, 'educourseCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "elctsctSeSn", gf_DhxGetValue(dhxGridMhsedu001, rId, 'elctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "educourseNm", gf_DhxGetValue(dhxGridMhsedu001, rId, 'educourseNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduSdt", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduSdt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduShr", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduShr',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduEdt", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduEdt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduEhr", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduEhr',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduDaycnt", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduDaycnt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduPurps", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduPurps',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduCls", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduCls',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu001", "eduKind", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduKind',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu001", "eduMustAt", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduMustAt',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu001", "eduAmtBurdenSe", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduAmtBurdenSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu001", "innerExtrlEduSe", gf_DhxGetValue(dhxGridMhsedu001, rId, 'innerExtrlEduSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu001", "eduZone", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduZone',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "chrgInstructorEmplAt", (( gf_DhxGetValue(dhxGridMhsedu001, rId, 'chrgInstructorEmplAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMhsedu001", "chrgInstructor", gf_DhxGetValue(dhxGridMhsedu001, rId, 'chrgInstructor',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "chrgInstructorNm", gf_DhxGetValue(dhxGridMhsedu001, rId, 'chrgInstructorNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduInstt", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduInstt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "eduInsttAdres", gf_DhxGetValue(dhxGridMhsedu001, rId, 'eduInsttAdres',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "totFinishPnt", gf_DhxGetValue(dhxGridMhsedu001, rId, 'totFinishPnt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "trgetCnt", gf_DhxGetValue(dhxGridMhsedu001, rId, 'trgetCnt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "indvdlEducost", gf_DhxGetValue(dhxGridMhsedu001, rId, 'indvdlEducost',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "episRetunamt", gf_DhxGetValue(dhxGridMhsedu001, rId, 'episRetunamt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "cochrgedocumentIsuAt", (( gf_DhxGetValue(dhxGridMhsedu001, rId, 'cochrgedocumentIsuAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMhsedu001", "extrlInstructorAllwnc", gf_DhxGetValue(dhxGridMhsedu001, rId, 'extrlInstructorAllwnc',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "rm", gf_DhxGetValue(dhxGridMhsedu001, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "elctsctDocNo", gf_DhxGetValue(dhxGridMhsedu001, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "elctsctSttusCode", gf_DhxGetValue(dhxGridMhsedu001, rId, 'elctsctSttusCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu001", "elctsctEmpno", gf_DhxGetValue(dhxGridMhsedu001, rId, 'elctsctEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "returnResn", gf_DhxGetValue(dhxGridMhsedu001, rId, 'returnResn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "qestnarCode", gf_DhxGetValue(dhxGridMhsedu001, rId, 'qestnarCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu001", "qestnarNm", gf_DhxGetValue(dhxGridMhsedu001, rId, 'qestnarNm',  'grid'), '');

    gf_FormSetValue('saveFormMhsedu001', 'atchmnfl', gf_DhxGetValue(dhxGridMhsedu001, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormMhsedu001', 'atchmnflList', gf_DhxGetValue(dhxGridMhsedu001, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일
    
    var atchmnflNo = gf_DhxGetValue(dhxGridMhsedu001, rId, 'atchmnflNo', 'grid');
    if(!gf_IsNull(atchmnflNo)){
    	var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridMhsedu001, rId, 'atchmnflNo',  'grid') };
    	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
    }
    
    
    var educourseCode = gf_DhxGetValue(dhxGridMhsedu001, rId, 'educourseCode', 'grid');
    var elctsctSeSn = gf_DhxGetValue(dhxGridMhsedu001, rId, 'elctsctSeSn', 'grid');
    if(!gf_IsNull(educourseCode)){
    	var jsonParameter = {
    	    	educourseCode:educourseCode,
    	    	elctsctSeSn:elctsctSeSn
    	    }
    	gf_Transaction('', 'mhsedu001/searchMhseduTime', jsonParameter, 'fn_CallbackSearchMhseduTime', false, 'GET');
        gf_Transaction('', 'mhsedu001/searchMhseduEmp', jsonParameter, 'fn_CallbackSearchMhseduEmp', false, 'GET');
    }//else if(gf_IsNull(educourseCode)){
    	//dhxGridMhseduTime.clearAll();
    	//dhxGridMhseduEmp.clearAll();
    	//gf_NoFoundDataOnGridMsg('dataListMhseduEmp');
    	//gf_NoFoundDataOnGridMsg('dataListMhseduTime');
//    	fn_DhxDataProcessorMhseduTime();
//    	fn_DhxDataProcessorMhseduEmp();
		//var jsonParameter = {
    	//    	educourseCode:educourseCode,
    //	    	elctsctSeSn:elctsctSeSn
    //	    }
  ///  	gf_Transaction('', 'mhsedu001/searchMhseduTime', jsonParameter, 'fn_CallbackSearchMhseduTime', false, 'GET');
        //gf_Transaction('', 'mhsedu001/searchMhseduEmp', jsonParameter, 'fn_CallbackSearchMhseduEmp', false, 'GET');
  //  }
    
    
    $('#chrgInstructorSaveFormMhsedu001').attr('disabled', true);
	$('#chrgInstructorNmSaveFormMhsedu001').attr('disabled', true);
	
	
    if(status == 'inserted') {
        $('#saveFormMhsedu001 input[name="educourseCode"]').prop('disabled', false);
        $('#saveFormMhsedu001 input[name="elctsctSeSn"]').prop('disabled', false);
    } else {
        $('#saveFormMhsedu001 input[name="educourseCode"]').prop('disabled', true);
        $('#saveFormMhsedu001 input[name="elctsctSeSn"]').prop('disabled', true);
    }
    var elctsctSttusCode = gf_FormGetValue('saveFormMhsedu001', 'elctsctSttusCode', 'combo');
    var copyFlag = gf_DhxGetValue(dhxGridMhsedu001, rId, 'copyFlag', 'grid');
    
    if(elctsctSttusCode == '20' && copyFlag <= 0){
        $("#btnBugtcopy").show();             
    }
    else{
    	$("#btnBugtcopy").hide();
    }
    $('#elctsctSttusCode').attr('disabled',true);
    
};

var fn_CallbackSearchMhseduTime = function(strSvcID, targetID, data) {
	dhxGridMhseduTime.clearAll();
	fn_DhxDataProcessorMhseduTime();
    if(!gf_IsNull(data.data.records)){
    	gf_NoFoundDataOnGridMsgRemove('dataListMhseduTime');
       dhxGridMhseduTime.parse(data.data.records, 'js');
       dhxGridMhseduTime.selectRow(0);
       }
};
var fn_DhxDataProcessorMhseduTime = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhseduTime = new dataProcessor(gv_ContextPath+'/mhsedu001/saveMhseduTime'); //lock feed url
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
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    var state;
                    dhxGridMhseduTime.forEachRow(function(rowId) {
            			state = dhxDataProcessorMhseduTime.getState(rowId);
//            			if (state == 'updated') {
//            				 dhxDataProcessorMhseduTime.sendData();
//            			}else 
            				if(state == 'deleted'){
                        	dhxDataProcessorMhsedu001.sendData();
                        }
            		});
                    
                    var state001;
                    dhxGridMhsedu001.forEachRow(function(rowId) {
            			state001 = dhxDataProcessorMhsedu001.getState(rowId);
            			if(state001 == 'deleted'){
                        	dhxDataProcessorMhsedu001.sendData();
                        }
            		});
                    
                    $("#checkAllMhseduTime").prop('checked', false); //상단 체크박스 해제
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
       } 
    $("#spanCntSearchFormMhseduEmp").text(data.data.records.length);
};
var fn_DhxDataProcessorMhseduEmp = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhseduEmp = new dataProcessor(gv_ContextPath+'/mhsedu001/saveMhseduEmp'); //lock feed url
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
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    var state;
                    dhxGridMhseduEmp.forEachRow(function(rowId) {
            			state = dhxDataProcessorMhseduEmp.getState(rowId);
            		});
                    if(state == 'deleted'){
                    		dhxDataProcessorMhseduTime.sendData();
                    		console.log('Emp 삭제 Time 보내요')
                    } else {
                    	fn_SearchMhsedu001();
                    }
                    $("#checkAllMhseduEmp").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};

/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhsedu001 = function() {
    $('#saveFormMhsedu001 input[name="educourseCode"]').prop('disabled', false);
    $('#saveFormMhsedu001 input[name="elctsctSeSn"]').prop('disabled', false);
    $('#saveFormMhsedu001').resetForm();
    gf_FormSetValue('saveFormMhsedu001', 'eduSdt',nowDate , 'text');
    gf_FormSetValue('saveFormMhsedu001', 'eduEdt',nowDate, 'text');
    gf_FormSetValue('saveFormMhsedu001', 'eduDaycnt',1, 'text');
    
};

/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMhsedu001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMhsedu001 = function() {
    dhxGridMhsedu001.clearSelection();
    fn_InitInputFormMhsedu001();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //educourseCode
    initValueArr.push(''); //elctsctSeSn
    initValueArr.push(''); //educourseNm
    initValueArr.push(new Date().format('YYYY-MM-DD')); //eduSdt
    initValueArr.push('00:00'); //eduShr
    initValueArr.push(new Date().format('YYYY-MM-DD')); //eduEdt
    initValueArr.push('00:00'); //eduEhr
    initValueArr.push('1'); //eduDaycnt
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
    initValueArr.push('0'); //trgetCnt
    initValueArr.push('0'); //indvdlEducost
    initValueArr.push('0'); //episRetunamt
    initValueArr.push(''); //cochrgedocumentIsuAt
    initValueArr.push('0'); //extrlInstructorAllwnc
    initValueArr.push(''); //rm
    initValueArr.push(''); //atchmnflNo
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctSttusCode
    initValueArr.push(''); //elctsctEmpno
    initValueArr.push(''); //returnResn
    initValueArr.push(''); //qestnarCode
    initValueArr.push(''); //totFinishTime
    dhxGridMhsedu001.addRow(dhxGridMhsedu001.uid(), initValueArr, 0);
    dhxGridMhsedu001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhsedu001');
    
    gf_FormSetValue("saveFormMhsedu001","eduSdt", new Date().format('YYYY-MM-DD'), '');
    gf_FormSetValue("saveFormMhsedu001","eduEdt", (new Date()).format('YYYY-MM-DD'), '');
    
	var educourseCode = dhxGridMhsedu001.cells(dhxGridMhsedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu001,'educourseCode')).getValue();
    if(gf_IsNull(educourseCode)){
    	//dhxGridMhseduTime.clearAll();
    	dhxGridMhseduEmp.clearAll();
    	gf_NoFoundDataOnGridMsg('dataListMhseduEmp');
    	//gf_NoFoundDataOnGridMsg('dataListMhseduTime');
//    	fn_DhxDataProcessorMhseduTime();
//    	fn_DhxDataProcessorMhseduEmp();
		var jsonParameter = {
    	    	educourseCode:educourseCode,
    	    	elctsctSeSn:elctsctSeSn
    	    }
    	gf_Transaction('', 'mhsedu001/searchMhseduTime', jsonParameter, 'fn_CallbackSearchMhseduTime', false, 'GET');
        //gf_Transaction('', 'mhsedu001/searchMhseduEmp', jsonParameter, 'fn_CallbackSearchMhseduEmp', false, 'GET');
    }
    //gf_NoFoundDataOnGridMsgRemove('dataListMhseduTime');
    $('#btnPopEmpSearchMhsedu001').show();
    fn_FormDisabled(false);
    var jsonParameter = { atchFiles : 'AAAAAAAAA' };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
	$('#elctsctSttusCode').attr('disabled',true);
}
//픔목정보 Add ( 저장 / 입력,수정 ) 
var fn_AddMhseduEmp = function() {
	dhxGridMhseduEmp.clearSelection();
	gf_MultiEmpPopup("dhxPopupGrid","empNo","korNm", "" , "N", "fn_CallbackSearchMultiEmp");
    gf_NoFoundDataOnGridMsgRemove('dataListMhseduEmp');
}

var fn_RemoveMhseduEmp = function() {
	var rowId = dhxGridMhseduEmp.getSelectedRowId();
    var state = dhxDataProcessorMhseduEmp.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMhseduEmp.getRowIndex(rowId);
        dhxGridMhseduEmp.deleteRow(rowId);
        dhxGridMhseduEmp.selectRow(rowNum);
        fn_FindMhsedu001();
    }
    else dhxDataProcessorMhseduEmp.setUpdated(rowId, true, 'deleted');
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhsedu001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhsedu001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhsedu001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhsedu001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsedu001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhsedu001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhsedu001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhsedu001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsedu001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhsedu001.setSortImgState(false); 
            gf_FormSetValue('searchFormMhsedu001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhsedu001', 'sortColumId', '', 'text'); 
            dhxGridMhsedu001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhsedu001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhsedu001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhsedu001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsedu001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhseduTime = function() {
    var edCnt = 0;
    save_Add_Cnt_MhseduTime = 0; 
    save_Edt_Cnt_MhseduTime = 0; 
    save_Del_Cnt_MhseduTime = 0; 
    dhxGridMhseduTime.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhseduTime.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhseduTime.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MhseduTime += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MhseduTime += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MhseduTime += 1; 
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
        save_All_Sta_MhseduTime = 0; 
        if(save_Add_Cnt_MhseduTime > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MhseduTime + "건";
            save_All_Sta_MhseduTime = 1; 
        } 
        if(save_Edt_Cnt_MhseduTime > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MhseduTime + "건"; 
        } 
        if(save_Del_Cnt_MhseduTime > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MhseduTime + "건"; 
            save_All_Sta_MhseduTime = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhsedu001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhseduTime(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhseduTime = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhseduTime_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhseduTime_Send = function() {
    	dhxDataProcessorMhseduTime.sendData();
}

var fn_SaveMhsedu001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhsedu001 = 0; 
    save_Edt_Cnt_Mhsedu001 = 0; 
    save_Del_Cnt_Mhsedu001 = 0; 
    dhxGridMhsedu001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhsedu001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhsedu001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhsedu001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhsedu001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhsedu001 += 1; 
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
        save_All_Sta_Mhsedu001 = 0; 
        if(save_Add_Cnt_Mhsedu001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhsedu001 + "건";
            save_All_Sta_Mhsedu001 = 1; 
        } 
        if(save_Edt_Cnt_Mhsedu001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhsedu001 + "건"; 
        } 
        if(save_Del_Cnt_Mhsedu001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhsedu001 + "건"; 
            save_All_Sta_Mhsedu001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhsedu001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhsedu001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhsedu001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhsedu001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhsedu001_Send = function() {
    if(fn_GridValidation(dhxGridMhsedu001, dhxDataProcessorMhsedu001)) {
        dhxDataProcessorMhsedu001.sendData();
    }
}

var fn_SaveMhseduEmp = function() {
	var edCnt = 0;
    save_Add_Cnt_MhseduEmp = 0; 
    save_Edt_Cnt_MhseduEmp = 0; 
    save_Del_Cnt_MhseduEmp = 0; 
    dhxGridMhseduEmp.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhseduEmp.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhseduEmp.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MhseduEmp += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MhseduEmp += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MhseduEmp += 1; 
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
        save_All_Sta_MhseduEmp = 0; 
        if(save_Add_Cnt_MhseduEmp > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MhseduEmp + "건";
            save_All_Sta_MhseduEmp = 1; 
        } 
        if(save_Edt_Cnt_MhseduEmp > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MhseduEmp + "건"; 
        } 
        if(save_Del_Cnt_MhseduEmp > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MhseduEmp + "건"; 
            save_All_Sta_MhseduEmp = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhseduEmp(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhseduEmp(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhseduEmp = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhseduEmp_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhseduEmp_Send = function() {
    dhxDataProcessorMhseduEmp.sendData();
}
/**
 * 삭제
 */
var fn_RemoveMhsedu001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhsedu001, 'chk');
    
	if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhsedu001.forEachRow(function(rowId) {
            state = dhxDataProcessorMhsedu001.getState(rowId);
            if(dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001, 'chk')).isChecked()){
			var reqstCnt = dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001,'reqstCnt')).getValue();
			var reqstCnt2 = dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001,'reqstCnt2')).getValue();
			var educourseCode = dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001,'educourseCode')).getValue();
			//alert(reqstCnt);
			if(reqstCnt != '0' || reqstCnt2 != '0'){
				gf_DivMsgAlert(educourseCode+' 는 이미 신청된 교육입니다.');
        		return false;
			}
                if(state == 'inserted') {
                    var rowNum = dhxGridMhsedu001.getRowIndex(rowId);
                    dhxGridMhsedu001.deleteRow(rowId);
                    dhxGridMhsedu001.selectRow(rowNum);
                    fn_FindMhsedu001();
                }
                else dhxDataProcessorMhsedu001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhsedu001 = function () {
    var titMhsedu001 = '교육과정등록'; /* gf_LocaleTrans('default', 'titMhsedu001') */
    var jsonParameter = {
        educourseCode : gf_FormGetValue('searchFormMhsedu001', 'educourseCode', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMhsedu001', 'elctsctSeSn', 'text')
    };
    var header = [[
        '교육과정코드' /* gf_LocaleTrans('default', 'titEducourseCode') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '교육과정명' /* gf_LocaleTrans('default', 'titEducourseNm') */,
        '교육시작일자' /* gf_LocaleTrans('default', 'titEduSdt') */,
        '교육시작시간' /* gf_LocaleTrans('default', 'titEduShr') */,
        '교육종료일자' /* gf_LocaleTrans('default', 'titEduEdt') */,
        '교육종료시간' /* gf_LocaleTrans('default', 'titEduEhr') */,
        '교육일수' /* gf_LocaleTrans('default', 'titEduDaycnt') */,
        '교육목적' /* gf_LocaleTrans('default', 'titEduPurps') */,
        '교육분류' /* gf_LocaleTrans('default', 'titEduCls') */,
        '교육종류' /* gf_LocaleTrans('default', 'titEduKind') */,
        '교육필수여부' /* gf_LocaleTrans('default', 'titEduMustAt') */,
        '교육비용부담구분' /* gf_LocaleTrans('default', 'titEduAmtBurdenSe') */,
        '내외교육구분' /* gf_LocaleTrans('default', 'titInnerExtrlEduSe') */,
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
        '반려 사유' /* gf_LocaleTrans('default', 'titReturnResn') */
    ]];
    var dataId = [[ 'educourseCode', 'elctsctSeSn', 'educourseNm', 'eduSdt', 'eduShr', 'eduEdt', 'eduEhr', 'eduDaycnt', 'eduPurps', 'eduCls', 'eduKind', 'eduMustAt', 'eduAmtBurdenSe', 'innerExtrlEduSe', 'eduZone', 'chrgInstructorEmplAt', 'chrgInstructor', 'chrgInstructorNm', 'eduInstt', 'eduInsttAdres', 'totFinishPnt', 'trgetCnt', 'indvdlEducost', 'episRetunamt', 'cochrgedocumentIsuAt', 'extrlInstructorAllwnc', 'rm', 'atchmnflNo', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsedu001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsedu001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhsedu001/excelMhsedu001', jsonParameter);
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
    $('#saveFormMhsedu001 #educourseCodeSaveFormMhsedu001').parent().append(
    '<div class="error" id="educourseCodeSaveFormMhsedu001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsedu001 #elctsctSeSnSaveFormMhsedu001').parent().append(
    '<div class="error" id="elctsctSeSnSaveFormMhsedu001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhsedu001 = function(educourseCode, elctsctSeSn){
    if(!gf_IsNull(educourseCode) && !gf_IsNull(elctsctSeSn)) {
        var jsonParameter = {
            educourseCode : educourseCode,
            elctsctSeSn : elctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('mhsedu001/findMhsedu001', jsonParameter, 'GET');
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
    var state = dhxDataProcessorMhsedu001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhsedu001').validate().form()){
                if(state == 'inserted') {
                    var educourseCode = gf_FormGetValue('saveFormMhsedu001', 'educourseCode', 'text');
                    var elctsctSeSn = gf_FormGetValue('saveFormMhsedu001', 'elctsctSeSn', 'text');
                    if(fn_CheckDupMhsedu001(educourseCode, elctsctSeSn)) return true;
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
    save_Row_Sta_Mhsedu001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhsedu001 == 'deleted') {
        save_Row_Num_Mhsedu001 = 0;
        save_Row_Ids_Mhsedu001 = "";
    } else if(save_Row_Sta_Mhsedu001 == 'inserted') {
        save_Row_Num_Mhsedu001 = rowNum;
        save_Row_Ids_Mhsedu001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhsedu001 = rowNum;
        save_Row_Ids_Mhsedu001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduMustAt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduMustAt');
                    valid = false;
                }
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
                
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEducourseCode = gf_DhxGetValue(dhxGridObjet, rowId, 'educourseCode', 'grid');
                    checkElctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowId, 'elctsctSeSn', 'grid');
                    if(!gf_IsNull(checkEducourseCode, checkElctsctSeSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var educourseCode = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'educourseCode', 'grid');
                            var elctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'elctsctSeSn', 'grid');
                            if(((educourseCode == checkEducourseCode) && (elctsctSeSn == checkElctsctSeSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'educourseCode');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhsedu001( checkEducourseCode, checkElctsctSeSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'educourseCode');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
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
        dhxGridMhsedu001.selectRowById(validFalseFistRowId);
        fn_FindMhsedu001();
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


var fn_CallbackSearchMultiEmp = function(data){
	dhxGridMhseduEmp.forEachRow(function(index){
        for(row in data){
            if(gf_DhxGetValue(dhxGridMhseduEmp, index, 'empno', 'grid') == data[row].empno){
                delete data[row];
            }           
        }
    });
    for(row in data){
    	var valueArr = [];
    	valueArr.push(data[row].empno);
    	valueArr.push(data[row].korNm);          // 성명
    	valueArr.push(data[row].deptCodeNm);     // 부서 이름
    	valueArr.push(data[row].clsfCodeNm);     // 직급 이름
    	
    	dhxGridMhseduEmp.addRow(dhxGridMhseduEmp.uid(), valueArr , 0);
    	dhxGridMhseduEmp.selectRow(0);
    	
    	var educourseCode = dhxGridMhsedu001.cells(dhxGridMhsedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu001,'educourseCode')).getValue();
		var elctsctSeSn = dhxGridMhsedu001.cells(dhxGridMhsedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu001,'elctsctSeSn')).getValue();
		
    	dhxGridMhseduEmp.forEachRow(function(rowId) {
    		dhxGridMhseduEmp.cells(rowId, gf_GetDhxGridColumId(dhxGridMhseduEmp, 'educourseCode')).setValue(educourseCode);
    		dhxGridMhseduEmp.cells(rowId, gf_GetDhxGridColumId(dhxGridMhseduEmp, 'elctsctSeSn')).setValue(elctsctSeSn);
    	});
    }
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
var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.earnerNo)) {
		var earnerSeCode = data.earnerSeCode;
		if(earnerSeCode == 100){
			gf_FormSetValue('saveFormMhsedu001', 'chrgInstructor', data.bizrno, 'text');
			gf_FormSetValue('saveFormMhsedu001', 'chrgInstructorNm', data.earnerNm, 'text');

			$('#chrgInstructorSaveFormMhsedu001').attr('disabled', true);
			$('#chrgInstructorNmSaveFormMhsedu001').attr('disabled', true);

		} else if((earnerSeCode == 200)){
			gf_DivMsgAlert('기타 소득자인 경우 성명을 입력해주세요.');

			$('#chrgInstructorSaveFormMhsedu001').attr('disabled', true);
			$('#chrgInstructorNmSaveFormMhsedu001').attr('disabled', false);
//			var chrgInstructor = gf_FormGetValue('saveFormMhsedu001', 'chrgInstructor', 'text');
				rowId = dhxGridMhsedu001.getSelectedRowId();
				dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001, 'chrgInstructor')).setValue("");
				dhxGridMhsedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu001, 'chrgInstructorNm')).setValue("");
				gf_FormSetValue('saveFormMhsedu001', 'chrgInstructor', '', 'text');
				gf_FormSetValue('saveFormMhsedu001', 'chrgInstructorNm', '', 'text');
				
		}
	}
};
function fn_CallbackPopEmp1(data){
	gf_FormSetValue('saveFormMhsedu001', 'chrgInstructorNm', data.korNm, 'text');
	$('#saveFormMhsedu001 input[name="chrgInstructor"]').prop('disabled', true);
	$('#saveFormMhsedu001 input[name="chrgInstructorNm"]').prop('disabled', true);
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
		gf_FormSetValue('saveFormMhsedu001', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormMhsedu001', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
      callbacks.fire();
	}
};
var GridSend = function(){
	var selectedId = dhxGridMhseduEmp.getSelectedRowId();
	
	if (selectedId != null){
		dhxDataProcessorMhseduEmp.sendData();
	}else if(selectedId == null){
		dhxDataProcessorMhseduTime.sendData();
	}
}

var Gridreset = function(){
	dhxGridMhseduEmp.forEachRow(function(rowId) {
		dhxDataProcessorMhseduEmp.setUpdated(rowId, true, 'clear');
	});
	dhxGridMhseduTime.forEachRow(function(rowId) {
		dhxDataProcessorMhseduTime.setUpdated(rowId, true, 'clear');
	});
	dhxGridMhsedu001.forEachRow(function(rowId) {
		dhxDataProcessorMhsedu001.setUpdated(rowId, true, 'clear');
	});
}
var fn_SaveCopyMhsedu001 = function(){
	
	var educourseCode = dhxGridMhsedu001.cells(dhxGridMhsedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu001,'educourseCode')).getValue();
	var elctsctSeSn = dhxGridMhsedu001.cells(dhxGridMhsedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu001,'elctsctSeSn')).getValue();
	
	var jsonParameter = {
			educourseCode : educourseCode,
			elctsctSeSn : elctsctSeSn
    	}
	
	var dataSource = gf_NoAsyncTransaction('mhsedu001/saveCopyMhsedu', jsonParameter, 'POST');

	if (dataSource.code === '000') {
		gf_DivMsgAlert(gf_LocaleTrans('default', 'mgsProcess')); // "정상처리 되었습니다
		cf_InitParamMhsedu001();
		fn_SearchMhsedu001();
	}
	
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
		$('body').append("<div id='popupQestPopup' formid='" + formId + "'><div class='b-close' style='display:none'></div></div>");
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
	if(!gf_IsNull(data.qestnarCode)){
		gf_FormSetValue('saveFormMhsedu001', 'qestnarCode', data.qestnarCode, 'hidden');
		gf_FormSetValue('saveFormMhsedu001', 'qestnarNm', data.qestnarNm, 'text');
		dhxGridMhsedu001.cells(dhxGridMhsedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu001,'qestnarCode')).setValue(data.qestnarCode);
	}
}
