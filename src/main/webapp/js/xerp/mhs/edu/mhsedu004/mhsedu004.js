/**
 *    프로그램       : 교육결과보고관리 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.10.07
 *    사용테이블      : MHS_EDU_RESULT_REPORT
 * sourceGen version : 2020.09.13.01 (2020.10.07)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhsedu004 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhsedu004 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhsedu004 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhsedu004 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhsedu004 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhsedu004 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhsedu004 = 0;  //그리드 삭제 수량 
var dhxGridMhsedu004;  //그리드 객체
var dhxGridMhseduTime;
var eventIdMhsedu004 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhsedu004;  //DataProcessor 객체
var eventIdSub = [];
var RegNotNum = /[^0-9]/g;  //숫자 정규식
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhsedu004();
    if(cf_SetComponentsMhsedu004()){
       cf_SetEventListenerMhsedu004();
       cf_InitFormMhsedu004();
       cf_SetBindingMhsedu004();
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
	dhxSearchCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
	dhxSearchCCalendarDate2.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#stDate').val(dateFormat(dhxSearchCCalendarDate2.leftCalendar.getDate()));
        	$('#edDate').val(dateFormat(dhxSearchCCalendarDate2.rightCalendar.getDate()));
        	dhxSearchCCalendarDate2.hide();
        }
    });
	
//    $('input[name=stDate]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -90)).format('YYYY-MM-01') );
//    $('input[name=edDate]').val( (new Date()).format('YYYY-MM-30') );
	//금일 날짜표시
	gf_SetDateIntervalRadio('stDate', 'edDate', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxSearchCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormMhsedu004', 'stDate', 'text'));
	dhxSearchCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormMhsedu004', 'edDate', 'text'));	
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


/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhsedu004 = function() {
    gf_SetMenuPath();
    $("#saveFormMhsedu004").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboeduCls','eduCls','eduCls', 'sel', 'C206', '' , '', '', 'ordr', '','',''); // 교육분류
    gf_ComboCode('divComboeduKind','eduKind','eduKind', 'sel', 'C114', '' , '', '', 'ordr', '','',''); // 교육종류
    gf_ComboCode('divComboeduMustAt','eduMustAt','eduMustAt', 'sel', 'C112', '' , '', '', 'ordr', '','',''); // 교육필수여부
    gf_ComboCode('divComboeduAmtBurdenSe','eduAmtBurdenSe','eduAmtBurdenSe', 'sel', 'C111', '' , '', '', 'ordr', '','','');
    gf_ComboCode('divComboinnerExtrlEduSe','innerExtrlEduSe','innerExtrlEduSe', 'sel', 'C208', '' , '', '', 'ordr', '','',''); // 내외부교육구분
    gf_ComboCode('divComboelctsctSttusCode','elctsctSttusCode','elctsctSttusCode', 'sel', 'EA004', '' , '', '', 'ordr', '','','');
    gf_ComboCode('divCombostsfdgCode','stsfdgCode','stsfdgCode', 'sel', 'C926', '' , '', '', 'ordr', 'required','','');
    gf_ComboCode('divComboSearchelctsctSttusCode','searchelctsctSttusCode','searchelctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', '','','');
    gf_ComboCode('divComboconfmsttusCode','elctsctSttusCode','elctsctSttusCode', 'sel', 'EA004', '' , '', '', 'ordr', '','',''); // 승인여부
    gf_ComboCode('divComboSearcheduCls','searcheduCls','searcheduCls', 'search', 'C206', '' , '', '', 'ordr', 'required','',''); // 조회 교육분류
    
    $("#indvdlEducostSaveFormMhsedu004").number(true);
    $("#episRetunamtSaveFormMhsedu004").number(true);
    
    $("#deptCodeNm").focus();
    
    fn_Date();
};

var cf_SetComponentsMhsedu004 = function() {
    var dhxGridMhsedu004HeaderInfo = [];
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '60', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '60', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '100', 'center', 'str', 'ro', false, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('순번', '40', 'center', 'int', 'ro', false, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육명', '*', 'left', 'str', 'ro', false, 'educourseNm', '', ''));
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('승인여부', '60', 'center', 'str', 'coro', false, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('마감여부', '60', 'center', 'str', 'coro', false, 'closAt', '', ''));
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육분류', '0', 'center', 'str', 'coro', true, 'eduCls', '', '')); 
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육종류', '0', 'center', 'str', 'coro', true, 'eduKind', '', '')); 
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육필수여부', '0', 'center', 'str', 'coro', true, 'eduMustAt', '', ''));
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육비용부담', '0', 'center', 'str', 'coro', true, 'eduAmtBurdenSe', '', ''));
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('내외부교육구분', '0', 'center', 'str', 'coro', true, 'innerExtrlEduSe', '', ''));
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('수료증발행여뷰', '0', 'center', 'str', 'ch', true, 'cochrgedocumentIsuAt', '', ''));
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육일수', '0', 'center', 'str', 'ro', true, 'eduDaycnt', '', ''));
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('결과 전자결재 구분 순번', '0', 'right', 'int', 'ro', true, 'resultElctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titResultElctsctSeSn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작일자', '0', 'left', 'str', 'ro', true, 'eduSdt', '', '')); /* gf_LocaleTrans('default', 'titEduSdt') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작시간', '0', 'left', 'str', 'ro', true, 'eduShr', '', '')); /* gf_LocaleTrans('default', 'titEduShr') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료일자', '0', 'left', 'str', 'ro', true, 'eduEdt', '', '')); /* gf_LocaleTrans('default', 'titEduEdt') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료시간', '0', 'left', 'str', 'ro', true, 'eduEhr', '', '')); /* gf_LocaleTrans('default', 'titEduEhr') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('총 이수 시간', '0', 'left', 'str', 'ro', true, 'totFinishTime', '', '')); /* gf_LocaleTrans('default', 'titTotFinishTime') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('총 교육비', '0', 'right', 'int', 'ro', true, 'totEducost', '', '')); /* gf_LocaleTrans('default', 'titTotEducost') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('고용보험 환급액', '0', 'right', 'int', 'ro', true, 'episRetunamt', '', '')); /* gf_LocaleTrans('default', 'titEpisRetunamt') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('개인 교육비', '0', 'right', 'int', 'ro', true, 'indvdlEducost', '', '')); /* gf_LocaleTrans('default', 'titIndvdlEducost') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('수료 여부', '0', 'center', 'str', 'ro', true, 'cochrgeAt', '', '')); /* gf_LocaleTrans('default', 'titCochrgeAt') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('만족도 코드 ', '0', 'center', 'str', 'coro', true, 'stsfdgCode', '', '')); /* gf_LocaleTrans('default', 'titStsfdgCode') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육 기관', '0', 'left', 'str', 'ro', true, 'eduInstt', '', '')); /* gf_LocaleTrans('default', 'titEduInstt') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육 기관 주소', '0', 'left', 'str', 'ro', true, 'eduInsttAdres', '', '')); /* gf_LocaleTrans('default', 'titEduInsttAdres') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교육 내용', '0', 'left', 'str', 'ro', true, 'eduCn', '', '')); /* gf_LocaleTrans('default', 'titEduCn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('업무 적용 계획', '0', 'left', 'str', 'ro', true, 'jobApplcPlan', '', '')); /* gf_LocaleTrans('default', 'titJobApplcPlan') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('요청', '0', 'left', 'str', 'ro', true, 'requstDesc', '', '')); /* gf_LocaleTrans('default', 'titRequstDesc') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('설문조사 코드', '0', 'center', 'str', 'ro', true, 'qestnarCode', '', '')); /* gf_LocaleTrans('default', 'titQestnarCode') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('설문조사 결과 순번', '0', 'right', 'int', 'ro', true, 'qestnarResultSn', '', '')); /* gf_LocaleTrans('default', 'titQestnarResultSn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('교통비', '0', 'right', 'int', 'ro', true, 'trnsportct', '', '')); /* gf_LocaleTrans('default', 'titTrnsportct') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('일비', '0', 'right', 'int', 'ro', true, 'dayct', '', '')); /* gf_LocaleTrans('default', 'titDayct') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('식대 비용', '0', 'right', 'int', 'ro', true, 'cgffdAmt', '', '')); /* gf_LocaleTrans('default', 'titCgffdAmt') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('숙박비', '0', 'left', 'str', 'ro', true, 'stayngct', '', '')); /* gf_LocaleTrans('default', 'titStayngct') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '0', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('반려 사유', '0', 'left', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('설문조사여부', '0', 'left', 'str', 'ch', true, 'requstDescOk', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('설문조사명', '0', 'left', 'str', 'ro', true, 'qestnarNm', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('관리자승인여부', '0', 'center', 'str', 'coro', true, 'confmSttusCode', '', ''));
    dhxGridMhsedu004HeaderInfo.push(gf_MakeDhxGridHeader('이수 학점', '0', 'center', 'int', 'ro', true, 'totFinishPnt', '', ''));
    dhxGridMhsedu004 = gf_MakeDhxGrid('dataListMhsedu004', dhxGridMhsedu004HeaderInfo, true, false, false);
    dhxGridMhsedu004.enableAutoWidth(false);
    dhxGridMhsedu004.setEditable(false);

    var dhxGridMhseduTimeHeaderInfo = [];
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '490', 'center', 'str', 'ro', false, 'codeKorNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '0', 'center', 'str', 'ro', true, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('전자결재구분순번', '0', 'right', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('필수이수교육구분', '0', 'right', 'int', 'ro', true, 'mustFinishEduSe', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('이수시간', '500', 'right', 'int', 'edn', false, 'finishTime', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduTimeHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '0', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhseduTime = gf_MakeDhxGrid('dataListMhseduTime', dhxGridMhseduTimeHeaderInfo, true, false, false);
    dhxGridMhseduTime.enableAutoWidth(true);
    dhxGridMhseduTime.setEditable(true);
    
    dhxGridMhseduTime.setColumnMinWidth(80,6); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
     // 교육분류
    var eduClsjsonParameter = {codekindCode : "C206",exceptCode :"",sortOrder :"asc" };
    var eduClsdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduClsjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("eduCls"), eduClsdataSource.data, "sel");
    
    // 교육종류
    var eduKindjsonParameter = {codekindCode : "C114",exceptCode :"",sortOrder :"asc" };
    var eduKinddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduKindjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("eduKind"), eduKinddataSource.data, "sel");
    
    // 교육필수여부
    var eduMustAtjsonParameter = {codekindCode : "C112",exceptCode :"",sortOrder :"asc" };
    var eduMustAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduMustAtjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("eduMustAt"), eduMustAtdataSource.data, "sel");

    // 교육 비용 부담 구분
    var eduAmtBurdenSejsonParameter = {codekindCode : "C111",exceptCode :"",sortOrder :"asc" };
    var eduAmtBurdenSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduAmtBurdenSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("eduAmtBurdenSe"), eduAmtBurdenSedataSource.data, "sel");
    
    // 내외부 교육 구분
    var innerExtrlEduSejsonParameter = {codekindCode : "C208",exceptCode :"",sortOrder :"asc" };
    var innerExtrlEduSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', innerExtrlEduSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("innerExtrlEduSe"), innerExtrlEduSedataSource.data, "sel");
    
    // 처리상태
    var elctsctSttusCodejsonParameter = {codekindCode : "EA004",exceptCode :"",sortOrder :"asc" };
    var elctsctSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', elctsctSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("elctsctSttusCode"), elctsctSttusCodedataSource.data, "sel");
    
    // 만족도조사 ( 유효성평가)
    var stsfdgCodejsonParameter = {codekindCode : "C926",exceptCode :"",sortOrder :"asc" };
    var stsfdgCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', stsfdgCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("stsfdgCode"), stsfdgCodedataSource.data, "sel");
    
    // 승인상태
    var confmSttusCodejsonParameter = {codekindCode : "C197",exceptCode :"",sortOrder :"asc" };
    var confmSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', confmSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("confmSttusCode"), confmSttusCodedataSource.data, "sel");
    
 // 교육분류
    var eduClsjsonParameter = {codekindCode : "C206",exceptCode :"",sortOrder :"asc" };
    var eduClsdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduClsjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("eduCls"), eduClsdataSource.data, "sel");
    
    // 교육종류
    var eduKindjsonParameter = {codekindCode : "C114",exceptCode :"",sortOrder :"asc" };
    var eduKinddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduKindjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("eduKind"), eduKinddataSource.data, "sel");
    
    // 교육필수여부
    var eduMustAtjsonParameter = {codekindCode : "C112",exceptCode :"",sortOrder :"asc" };
    var eduMustAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduMustAtjsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("eduMustAt"), eduMustAtdataSource.data, "sel");

    // 교육 비용 부담 구분
    var eduAmtBurdenSejsonParameter = {codekindCode : "C111",exceptCode :"",sortOrder :"asc" };
    var eduAmtBurdenSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduAmtBurdenSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("eduAmtBurdenSe"), eduAmtBurdenSedataSource.data, "sel");
    
    // 내외부 교육 구분
    var innerExtrlEduSejsonParameter = {codekindCode : "C208",exceptCode :"",sortOrder :"asc" };
    var innerExtrlEduSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', innerExtrlEduSejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("innerExtrlEduSe"), innerExtrlEduSedataSource.data, "sel");
    
    // 만족도조사 ( 유효성평가)
    var stsfdgCodejsonParameter = {codekindCode : "C926",exceptCode :"",sortOrder :"asc" };
    var stsfdgCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', stsfdgCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMhsedu004, dhxGridMhsedu004.getColIndexById("stsfdgCode"), stsfdgCodedataSource.data, "sel");
    
    dhxGridMhsedu004.setColumnMinWidth(40,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhsedu004 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhsedu004 = gf_GridDetachEvent(dhxGridMhsedu004, eventIdMhsedu004);
    eventId = dhxGridMhsedu004.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhsedu004();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhsedu004.getColumnsNum();
            var rowNum = dhxGridMhsedu004.getRowsNum();
            var selectedId = dhxGridMhsedu004.getSelectedRowId();
            var ind        = dhxGridMhsedu004.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu004.getRowIndex(selectedId);
            var type       = dhxGridMhsedu004.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhsedu004.selectRow(0);
                    //fn_FindMhsedu004();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhsedu004.selectRow(rowIndex + 1);
                    fn_FindMhsedu004();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhsedu004.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu004.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhsedu004.getSelectedRowId();
            var ind        = dhxGridMhsedu004.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu004.getRowIndex(selectedId);
            var type       = dhxGridMhsedu004.getColType(ind);
            dhxGridMhsedu004.selectCell(rowIndex+1, ind);
            fn_FindMhsedu004();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu004.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhsedu004.getSelectedRowId();
            var ind        = dhxGridMhsedu004.getSelectedCellIndex();
            var rowIndex   = dhxGridMhsedu004.getRowIndex(selectedId);
            var type       = dhxGridMhsedu004.getColType(ind);
            dhxGridMhsedu004.selectCell(rowIndex-1, ind);
            fn_FindMhsedu004();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhsedu004.editCell();
            }
        }
        else return true;
    });
    eventIdMhsedu004.push(eventId);
    eventId = dhxGridMhsedu004.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhsedu004SortGridList(ind, type, direction); 
    });
    eventIdMhsedu004.push(eventId);
    eventId = dhxGridMhsedu004.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhsedu004.push(eventId);
    eventId = dhxGridMhsedu004.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhsedu004();
    });
    eventIdMhsedu004.push(eventId);
    eventId = dhxGridMhsedu004.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdMhsedu004.push(eventId);
 // 버튼 이벤트 ==========================================================================================
    $('#btnSaveMhsedu004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhsedu004();
    });
    $('#btnRemoveMhsedu004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhsedu004();
    });
    $('#btnExcelMhsedu004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhsedu004();
    });
    $('#btnSearchMhsedu004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhsedu004('');
    });
    $('#btnResetMhsedu004').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhsedu004();
    });
    $('#btnBugtAdd').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var educourseCode = gf_FormGetValue('saveFormMhsedu004', 'educourseCode', 'text');
        if(gf_IsNull(educourseCode)){
        	gf_DivMsgAlert("해당 사항을 다시 확인해주세요.");
        	return false;
        }
        
        var totFinishTime = gf_FormGetValue('saveFormMhsedu004', 'totFinishTime', 'text');
        if(gf_IsNull(totFinishTime)){
        	gf_DivMsgAlert("교육이수시간을 입력해 주세요.");
        }else if(totFinishTime == '00:00'){
        	gf_DivMsgAlert("교육이수시간을 입력해 주세요.");
        }else{
        	gf_DivMsgConfirm("해당사항을 마감 하시겠습니까??", 'fn_BugtAdd()' ,'');
        }
    });
    $('#btnBugtcopy').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var educourseCode = gf_FormGetValue('saveFormMhsedu004', 'educourseCode', 'text');
        if(gf_IsNull(educourseCode)){
        	gf_DivMsgAlert("해당 사항을 다시 확인해주세요.");
        	return false;
        }else{
        	gf_DivMsgConfirm("해당사항을 마감해제 하시겠습니까??", 'fn_BugtRemove()' ,'');
        }
        
    });
    $('#btnBugtAddCon').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var educourseCode = gf_FormGetValue('saveFormMhsedu004', 'educourseCode', 'text');
        if(gf_IsNull(educourseCode)){
        	gf_DivMsgAlert("해당 사항을 다시 확인해주세요.");
        	return false;
        } else{
        	gf_DivMsgConfirm("해당사항을 승인 하시겠습니까??", 'fn_BugtAddCon()' ,'');        	
        }
    });
    $('#btnBugtcopyCon').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var educourseCode = gf_FormGetValue('saveFormMhsedu004', 'educourseCode', 'text');
        if(gf_IsNull(educourseCode)){
        	gf_DivMsgAlert("해당 사항을 다시 확인해주세요.");
        	return false;
        }
        var returnResn = gf_FormGetValue('saveFormMhsedu004', 'returnResn', 'text');
        if(gf_IsNull(returnResn)){
        	gf_DivMsgAlert("반려사항을 입력해주세요.");
        	return false;
        }else{
        	gf_DivMsgConfirm("해당사항을 반려 하시겠습니까??", 'fn_BugtRemoveCon()' ,'');
        }
        
    });
    $('#btneducourseCodeSearch').unbind("click").bind("click",function() {
        gf_errorMsgClear();
            gf_errorMsgClear();
            var qestnarCode  = dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), dhxGridMhsedu004.getColIndexById("qestnarCode")).getValue();
            console.log(qestnarCode)
            var qestnarResultSn  = dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), dhxGridMhsedu004.getColIndexById("qestnarResultSn")).getValue();
            var requstDescOk  = dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), dhxGridMhsedu004.getColIndexById("requstDescOk")).getValue();
            var elctsctSttusCode  = dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), dhxGridMhsedu004.getColIndexById("elctsctSttusCode")).getValue();
            if(gf_IsNull(qestnarCode)){
            	gf_DivMsgAlert("설문조사가 등록되어 있지 않습니다.");
            }else{
            	var param = "&qestnarCode=" + qestnarCode + "&qestnarResultSn=" + qestnarResultSn + "&requstDescOk=" + requstDescOk +"&elctsctSttusCode=" + elctsctSttusCode;
            	fn_PopupDtlMhseduPop('form1','','', param);
            }
        
    });
 // 기타 이벤트 ==========================================================================================
    $('#searchFormMhsedu004 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhsedu004').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsedu004').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 버튼 이벤트 ==========================================================================================
    $('#saveFormMhsedu004 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhsedu004",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhsedu004 input[name="educourseCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'educourseCode', $(this).val());
    });
    $('#saveFormMhsedu004 select[name="confmSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'confmSttusCode', gf_FormGetValue('saveFormMhsedu004', 'confmSttusCode', 'combo'));
    });
    $('#saveFormMhsedu004 input[name="elctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'elctsctSeSn', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'empno', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="resultElctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'resultElctsctSeSn', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="eduSdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduSdt', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="eduShr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduShr', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="eduEdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduEdt', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="eduEhr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduEhr', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="totFinishTime"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var totFinishTime = $("#totFinishTimeSaveFormMhsedu004").val();
        var time1 = totFinishTime.split(":");
        if(totFinishTime.length < 5){
        	gf_DivMsgAlert("00:00 형식에 맞게 입력해주세요.");
        	return false;
        }
        if(time1[0] > 24 || time1[1] > 60){
        	gf_DivMsgAlert("시간형식에 맞게 입력해주세요.");
//        	$('#totFinishTimeSaveFormMhsedu004').focus();
       	  	return false;
        }
        
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'totFinishTime', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="totEducost"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'totEducost', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="episRetunamt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'episRetunamt', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="indvdlEducost"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'indvdlEducost', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="cochrgeAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'cochrgeAt', $(this).val());
    });
    $('#saveFormMhsedu004 select[name="stsfdgCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'stsfdgCode', gf_FormGetValue('saveFormMhsedu004', 'stsfdgCode', 'combo'));
    });
    $('#saveFormMhsedu004 input[name="eduInstt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduInstt', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="eduInsttAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduInsttAdres', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="eduCn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduCn', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="jobApplcPlan"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'jobApplcPlan', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="requstDesc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'requstDesc', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="qestnarCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'qestnarCode', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="qestnarResultSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'qestnarResultSn', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="trnsportct"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'trnsportct', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="dayct"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'dayct', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="cgffdAmt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'cgffdAmt', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="stayngct"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'stayngct', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'rm', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'atchmnflNo', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="elctsctDocNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'elctsctDocNo', $(this).val());
    });
    $('#saveFormMhsedu004 select[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'elctsctSttusCode', gf_FormGetValue('saveFormMhsedu004', 'elctsctSttusCode', 'combo'));
    });
    $('#saveFormMhsedu004 input[name="elctsctEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'elctsctEmpno', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="returnResn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'returnResn', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="educourseNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'educourseNm', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="eduDaycnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduDaycnt', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="qestnarNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'qestnarNm', $(this).val());
    });
    $('#saveFormMhsedu004 input[name="totFinishPnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'totFinishPnt', $(this).val());
    });
    $('#saveFormMhsedu004 select[name="eduCls"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduCls', gf_FormGetValue('saveFormMhsedu004', 'eduCls', 'combo'));
    });
    $('#saveFormMhsedu004 select[name="eduKind"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduKind',  gf_FormGetValue('saveFormMhsedu004', 'eduKind', 'combo'));
    });
    
    $('#saveFormMhsedu004 select[name="eduMustAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduMustAt', gf_FormGetValue('saveFormMhsedu004', 'eduMustAt', 'combo'));
    });
    $('#saveFormMhsedu004 select[name="eduAmtBurdenSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'eduAmtBurdenSe', gf_FormGetValue('saveFormMhsedu004', 'eduAmtBurdenSe', 'combo'));
    });
    $('#saveFormMhsedu004 select[name="innerExtrlEduSe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'innerExtrlEduSe', gf_FormGetValue('saveFormMhsedu004', 'innerExtrlEduSe', 'combo'));
    });
    $('#saveFormMhsedu004 input[name="cochrgedocumentIsuAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormMhsedu004', 'cochrgedocumentIsuAt', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'cochrgedocumentIsuAt', val);
    });
    $('#saveFormMhsedu004 input[name="requstDescOk"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormMhsedu004', 'requstDescOk', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridMhsedu004, dhxDataProcessorMhsedu004, 'requstDescOk', val);
    });
    
  //사원 선택 Popup
    $('#btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhsedu004","empno","empNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#btnDeptSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhsedu004","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu004', 'empNm', '', 'text');
	    }
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu004', 'empno', '', 'text');
	    }
		
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu004', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMhsedu004', 'deptCode', '', 'text');
	    }
    });
	//기간달력 이벤트 추가
    $('#searchFormMhsedu004 #date2').unbind('click').bind('click', function(event){
        //dhxCCalendarDate2.setPosition("bottom"); // "bottom"
        //$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
        dhxSearchCCalendarDate2.show();
    });
    //기간달력 이벤트 추가
    $('#searchFormMhsedu004 .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_DateCheck($(this));
    });
	
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormMhsedu004 = function() {
    $('#searchFormMhsedu004').resetForm();
    gf_FormSetValue('searchFormMhsedu004', 'stDate',gv_Predate, 'text');
    gf_FormSetValue('searchFormMhsedu004', 'edDate',gv_Curdate, 'text');
    gf_SetDataAuthorSe();
};

var cf_SetBindingMhsedu004 = function() {
    fn_FormDisabled(false);  //처음부터  disabled 하려면 true로 변경
    fn_SearchMhsedu004('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMhsedu004 = function(userId) {
	
	var deptAuth = gf_GetDataAuthorSe();         //부서권한 : 엑티브 TAB의 권한 
	var exempno = gf_GetLocalStorageData('empno', false);  //사원번로
	var stDate = gf_FormGetValue('searchFormMhsedu004', 'stDate', 'text').replaceAll('-','');
    var edDate = gf_FormGetValue('searchFormMhsedu004', 'edDate', 'text').replaceAll('-','');
	
	
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMhsedu004', 'empno', 'text'),
        empNm : gf_FormGetValue('searchFormMhsedu004', 'empNm', 'text'),
        deptCode : gf_FormGetValue('searchFormMhsedu004', 'deptCode', 'text'),
        deptCodeNm : gf_FormGetValue('searchFormMhsedu004', 'deptCodeNm', 'text'),
        stDate : stDate,
        edDate : edDate,
        educourseNm : gf_FormGetValue('searchFormMhsedu004', 'educourseNm', 'text'),
        searcheduCls : gf_FormGetValue('searchFormMhsedu004', 'searcheduCls', 'combo'),
        searchelctsctSttusCode : gf_FormGetValue('searchFormMhsedu004', 'searchelctsctSttusCode', 'combo'),
        deptAuth : deptAuth,
        exempno : exempno
    };
    gf_Transaction(userId, 'mhsedu004/searchMhsedu004', jsonParameter, 'fn_CallbackSearchMhsedu004', false, 'GET');
};

var fn_CallbackSearchMhsedu004 = function(strSvcID, targetID, data) {
    //dhxGridMhsedu004.clearAll();
    dhxGridMhsedu004.destructor();
    if(cf_SetComponentsMhsedu004()){ 
        fn_DhxDataProcessorMhsedu004(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhsedu004');
            dhxGridMhsedu004.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhsedu004 == 0 && save_All_Sta_Mhsedu004 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhsedu004.selectRow(0); 
            } else if(save_Row_Sta_Mhsedu004 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhsedu004.selectRow(0);
            } else if(save_All_Sta_Mhsedu004 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhsedu004.selectRow(save_Row_Num_Mhsedu004); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhsedu004.selectRow(save_Row_Num_Mhsedu004);   //개발자 수정 필요  
                //var findCell = dhxGridMhsedu004.findCell(save_Row_Ids_Mhsedu004, gf_GetDhxGridColumId(dhxGridMhsedu004,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhsedu004.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhsedu004.selectRow(0);
                //} 
            } 
 
            fn_FindMhsedu004();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhsedu004');
            fn_InitInputFormMhsedu004();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhsedu004").text(data.data.records.length);
        cf_SetEventListenerMhsedu004();
    } 
};
var fn_DhxDataProcessorMhsedu004 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhsedu004 = new dataProcessor(gv_ContextPath+'/mhsedu004/saveMhsedu004'); //lock feed url
    dhxDataProcessorMhsedu004.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhsedu004.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhsedu004.init(dhxGridMhsedu004); //link dataprocessor to the grid
    dhxDataProcessorMhsedu004.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhsedu004.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhsedu004.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
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
                				if(state == 'updated'){
                					dhxDataProcessorMhseduTime.sendData();
                            }
                		});
                    fn_SearchMhsedu004();
                    $("#checkAllMhsedu004").prop('checked', false); //상단 체크박스 해제
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

var fn_FindMhsedu004 = function() {
    var rId = dhxGridMhsedu004.getSelectedRowId();
    var status = dhxDataProcessorMhsedu004.getState(rId);

    gf_FormSetValue("saveFormMhsedu004", "educourseCode", gf_DhxGetValue(dhxGridMhsedu004, rId, 'educourseCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "elctsctSeSn", gf_DhxGetValue(dhxGridMhsedu004, rId, 'elctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "empno", gf_DhxGetValue(dhxGridMhsedu004, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "resultElctsctSeSn", gf_DhxGetValue(dhxGridMhsedu004, rId, 'resultElctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "eduSdt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduSdt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "eduShr", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduShr',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "eduEdt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduEdt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "eduEhr", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduEhr',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "totFinishTime", gf_DhxGetValue(dhxGridMhsedu004, rId, 'totFinishTime',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "totEducost", gf_DhxGetValue(dhxGridMhsedu004, rId, 'totEducost',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "episRetunamt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'episRetunamt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "indvdlEducost", gf_DhxGetValue(dhxGridMhsedu004, rId, 'indvdlEducost',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "cochrgeAt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'cochrgeAt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "stsfdgCode", gf_DhxGetValue(dhxGridMhsedu004, rId, 'stsfdgCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu004", "eduInstt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduInstt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "eduInsttAdres", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduInsttAdres',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "eduCn", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduCn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "jobApplcPlan", gf_DhxGetValue(dhxGridMhsedu004, rId, 'jobApplcPlan',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "requstDesc", gf_DhxGetValue(dhxGridMhsedu004, rId, 'requstDesc',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "qestnarCode", gf_DhxGetValue(dhxGridMhsedu004, rId, 'qestnarCode',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "qestnarResultSn", gf_DhxGetValue(dhxGridMhsedu004, rId, 'qestnarResultSn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "trnsportct", gf_DhxGetValue(dhxGridMhsedu004, rId, 'trnsportct',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "dayct", gf_DhxGetValue(dhxGridMhsedu004, rId, 'dayct',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "cgffdAmt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'cgffdAmt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "stayngct", gf_DhxGetValue(dhxGridMhsedu004, rId, 'stayngct',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "rm", gf_DhxGetValue(dhxGridMhsedu004, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "atchmnflNo", gf_DhxGetValue(dhxGridMhsedu004, rId, 'atchmnflNo',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "elctsctDocNo", gf_DhxGetValue(dhxGridMhsedu004, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "elctsctSttusCode", gf_DhxGetValue(dhxGridMhsedu004, rId, 'elctsctSttusCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu004", "elctsctEmpno", gf_DhxGetValue(dhxGridMhsedu004, rId, 'elctsctEmpno',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "returnResn", gf_DhxGetValue(dhxGridMhsedu004, rId, 'returnResn',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "confmSttusCode", gf_DhxGetValue(dhxGridMhsedu004, rId, 'confmSttusCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu004", "eduDaycnt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduDaycnt',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "totFinishPnt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'totFinishPnt',  'grid'), '');
    
    gf_FormSetValue("saveFormMhsedu004", "educourseNm", gf_DhxGetValue(dhxGridMhsedu004, rId, 'educourseNm',  'grid'), '');
    gf_FormSetValue("saveFormMhsedu004", "eduCls", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduCls',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu004", "eduKind", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduKind',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu004", "eduMustAt", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduMustAt',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu004", "eduAmtBurdenSe", gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduAmtBurdenSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu004", "innerExtrlEduSe", gf_DhxGetValue(dhxGridMhsedu004, rId, 'innerExtrlEduSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhsedu004", "cochrgedocumentIsuAt", (( gf_DhxGetValue(dhxGridMhsedu004, rId, 'cochrgedocumentIsuAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMhsedu004", "requstDescOk", (( gf_DhxGetValue(dhxGridMhsedu004, rId, 'requstDescOk',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormMhsedu004", "qestnarNm", gf_DhxGetValue(dhxGridMhsedu004, rId, 'qestnarNm',  'grid'), '');

    gf_FormSetValue('saveFormMhsedu004', 'atchmnfl', gf_DhxGetValue(dhxGridMhsedu004, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormMhsedu004', 'atchmnflList', gf_DhxGetValue(dhxGridMhsedu004, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일
    
    var eduKind = gf_DhxGetValue(dhxGridMhsedu004, rId, 'eduKind',  'grid'); // 사이버교육
    var elctsctSttusCode = gf_DhxGetValue(dhxGridMhsedu004, rId, 'elctsctSttusCode',  'grid'); // 상태값
    var closAt = dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu004,'closAt')).getValue();
    if((eduKind == '12') && (elctsctSttusCode == '10') && (gf_IsNull(closAt))){ // 사이버 교육이면서 승인일때 마감이 아닐때
    	$("#btnBugtAdd").show(); // 마감
    	$("#btnBugtcopy").hide(); // 마감해제
    	$("#btnBugtAddCon").hide(); // 승인
    	$("#btnBugtcopyCon").hide(); // 반려
    	$("#returnResn").attr('style', "display:none;"); // 숨기기
    	
    	$("#FinishTime").attr('style', "display:;"); // 보이기
    	$("#totFinishTime").attr('style', "display:;"); // 보이기
    	$('#totFinishTimeSaveFormMhsedu004').attr('disabled', false);
    } else if((eduKind == '12') && (elctsctSttusCode == '10') && (!gf_IsNull(closAt))){ // 사이버 교육이면서 승인일때 마감일때
    	$("#btnBugtAdd").hide(); // 마감
    	$("#btnBugtcopy").show(); // 마감해제
    	$("#btnBugtAddCon").hide(); // 승인
    	$("#btnBugtcopyCon").hide(); // 반려
    	$("#returnResn").attr('style', "display:none;"); // 숨기기
    	$("#FinishTime").attr('style', "display:;"); // 보이기
    	$("#totFinishTime").attr('style', "display:;"); // 보이기
    	$('#totFinishTimeSaveFormMhsedu004').attr('disabled', true);
    }  else if((eduKind != '12') && (elctsctSttusCode == '10') && (gf_IsNull(closAt))){ // 사이버 교육이 아니면서 승인일때 마감일때
    	$("#btnBugtAdd").show(); // 마감
    	$("#btnBugtcopy").hide(); // 마감해제
    	$("#btnBugtAddCon").hide(); // 승인
    	$("#btnBugtcopyCon").hide(); // 반려
    	$("#returnResn").attr('style', "display:none;"); // 숨기기
    	$("#FinishTime").attr('style', "display:;"); // 보이기
    	$("#totFinishTime").attr('style', "display:;"); // 보이기
    	$('#totFinishTimeSaveFormMhsedu004').attr('disabled', false);
    } else if((eduKind != '12') && (elctsctSttusCode == '10') && (!gf_IsNull(closAt))){ // 사이버 교육이면서 승인일때 마감일때
    	$("#btnBugtAdd").hide(); // 마감
    	$("#btnBugtcopy").show(); // 마감해제
    	$("#btnBugtAddCon").hide(); // 승인
    	$("#btnBugtcopyCon").hide(); // 반려
    	$("#returnResn").attr('style', "display:none;"); // 숨기기
    	$("#FinishTime").attr('style', "display:;"); // 보이기
    	$("#totFinishTime").attr('style', "display:;"); // 보이기
    	$('#totFinishTimeSaveFormMhsedu004').attr('disabled', true);
    } else if((eduKind == '12') && (elctsctSttusCode == '20')){ // 사이버 교육이면서 반려 일때
    	$("#btnBugtAdd").hide(); // 마감
    	$("#btnBugtcopy").hide(); // 마감해제
    	$("#btnBugtAddCon").hide(); // 승인
    	$("#btnBugtcopyCon").hide(); // 반려
    	$("#returnResn").attr('style', "display:;"); // 보이기
    	$("#returnResnSaveFormMhsedu004").attr('disabled',true);
    	$("#FinishTime").attr('style', "display:none;"); // 숨기기
    	$("#totFinishTime").attr('style', "display:none;"); // 숨기기
    	
    }else if((eduKind == '12') && (elctsctSttusCode == '99')){ // 사이버교육이면서 결재중 일때
    	$("#btnBugtAdd").hide(); // 마감
    	$("#btnBugtcopy").hide(); // 마감해제
    	$("#btnBugtAddCon").show(); // 승인
    	$("#btnBugtcopyCon").show(); // 반려
    	$("#returnResn").attr('style', "display:;"); // 보이기
    	$("#FinishTime").attr('style', "display:none;"); // 숨기기
    	$("#totFinishTime").attr('style', "display:none;"); // 숨기기
    	$("#returnResnSaveFormMhsedu004").attr('disabled',false);
    }else if((eduKind != '12') && (elctsctSttusCode == '10')){ // 사이버 교육이 아니고 승인일때
    	$("#btnBugtAdd").show(); // 마감
    	$("#btnBugtcopy").hide(); // 마감해제
    	$("#btnBugtAddCon").hide(); // 승인
    	$("#btnBugtcopyCon").hide(); // 반려
    	$("#FinishTime").attr('style', "display:;"); // 보이기
    	$("#totFinishTime").attr('style', "display:;"); // 보이기
    	$("#returnResn").attr('style', "display:none;"); // 숨기기
    }else if((eduKind != '12') && (elctsctSttusCode == '20')){ // 사이버 교육이 아니고 반려일때
    	$("#btnBugtAdd").hide(); // 마감
    	$("#btnBugtcopy").hide(); // 마감해제
    	$("#btnBugtAddCon").hide(); // 승인
    	$("#btnBugtcopyCon").hide(); // 반려
    	$("#returnResn").attr('style', "display:;"); // 보이기
    	$("#FinishTime").attr('style', "display:none;"); // 숨기기
    	$("#totFinishTime").attr('style', "display:none;"); // 숨기기
    	$("#returnResnSaveFormMhsedu004").attr('disabled',true);
    }else if((eduKind != '12') && (elctsctSttusCode == '99')){ // 사이버 교육이 아니고 결재중일때
    	$("#btnBugtAdd").hide(); // 마감
    	$("#btnBugtcopy").hide(); // 마감해제
    	$("#btnBugtAddCon").show(); // 승인
    	$("#btnBugtcopyCon").show(); // 반려
    	$("#returnResn").attr('style', "display:;"); // 보이기
    	$("#FinishTime").attr('style', "display:none;"); // 숨기기
    	$("#totFinishTime").attr('style', "display:none;"); // 숨기기
    	$("#returnResnSaveFormMhsedu004").attr('disabled',false);
    }
    
    	eventId = dhxGridMhseduTime.attachEvent('onRowSelect', function(rId,cInd) {
    		var closAt = dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu004,'closAt')).getValue();
    		if(!gf_IsNull(closAt)){
    			if((cInd == 0)||(cInd == 4)){
        			gf_DivMsgAlert('마감되어 수정하실수 없습니다.');
        			return false;
        			}
        		eventIdSub.push(eventId)
    		} else if (gf_IsNull(closAt)){    				
    			dhxGridMhseduTime.detachEvent(eventIdSub);
    			}
         	});
    
    var jsonParameter = { 
    		atchFiles : gf_DhxGetValue(dhxGridMhsedu004, rId, 'atchmnflNo',  'grid') 
    		};
    gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
    
    var educourseCode = gf_DhxGetValue(dhxGridMhsedu004, rId, 'educourseCode', 'grid');
    var elctsctSeSn = gf_DhxGetValue(dhxGridMhsedu004, rId, 'elctsctSeSn', 'grid');
    var empno = gf_DhxGetValue(dhxGridMhsedu004, rId, 'empno', 'grid');
    var jsonParameter = {
	    	educourseCode : educourseCode,
	    	elctsctSeSn : elctsctSeSn,
	    	empno : empno
	    }
    gf_Transaction('', 'mhsedu004/searchMhseduTime', jsonParameter, 'fn_CallbackSearchMhseduTime', false, 'GET');
    
    $("#qestnarNmSaveFormMhsedu004").attr('disabled',true);
    $("#requstDescSaveFormMhsedu004").attr('disabled',true);
    $("#elctsctSttusCodeSaveFormMhsedu004").attr('disabled',true);
    $("#cochrgedocumentIsuAtSaveFormMhsedu004").attr('disabled',true);
    $("#educourseNmSaveFormMhsedu004").attr('disabled',true);
    $("#eduCls").attr('disabled',true);
    $("#eduKind").attr('disabled',true);
    $("#eduMustAt").attr('disabled',true);
    $("#eduAmtBurdenSe").attr('disabled',true);
    $("#innerExtrlEduSe").attr('disabled',true);
    $("#elctsctSttusCode").attr('disabled',true);
    $("#confmSttusCode").attr('disabled',true);
    $("#requstDescOk").attr('disabled',true);
    $("#eduSdt").attr('disabled',true);
    $("#eduShrSaveFormMhsedu004").attr('disabled',true);
    $("#eduEdt").attr('disabled',true);
    $("#eduEhrSaveFormMhsedu004").attr('disabled',true);
    $("#eduDaycntSaveFormMhsedu004").attr('disabled',true);
    $("#eduInsttSaveFormMhsedu004").attr('disabled',true);
    $("#eduInsttAdresSaveFormMhsedu004").attr('disabled',true);
    $("#indvdlEducostSaveFormMhsedu004").attr('disabled',true);
    $("#episRetunamtSaveFormMhsedu004").attr('disabled',true);
    $("#eduCnSaveFormMhsedu004").attr('disabled',true);
    $("#jobApplcPlanSaveFormMhsedu004").attr('disabled',true);
    $("#stsfdgCode").attr('disabled',true);
    $("#fileUpload3").attr('disabled',true);
    $("#totFinishPntSaveFormMhsedu004").attr('disabled',true);
    $("#educourseCodeSaveFormMhsedu004").attr('disabled',true);
    $("#elctsctSeSnSaveFormMhsedu004").attr('disabled',true);
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
    dhxDataProcessorMhseduTime = new dataProcessor(gv_ContextPath+'/mhsedu004/saveMhseduTime'); //lock feed url
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
    	   		var rowId = dhxGridMhsedu004.getSelectedRowId();
    	    	var state = dhxDataProcessorMhsedu004.getState(rowId);
    	    	if(state == 'updated'){
    	    		dhxDataProcessorMhsedu004.sendData();
    	    	} else if(state ==''){
    	    		fn_SearchMhsedu004();
    	    	}
                $("#checkAllMhsedu002").prop('checked', false); //상단 체크박스 해제
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
var fn_InitInputFormMhsedu004 = function() {
    $('#saveFormMhsedu004 input[name="educourseCode"]').prop('disabled', false);
    $('#saveFormMhsedu004 input[name="elctsctSeSn"]').prop('disabled', false);
    $('#saveFormMhsedu004 input[name="empno"]').prop('disabled', false);
    $('#saveFormMhsedu004 input[name="resultElctsctSeSn"]').prop('disabled', false);
    $('#saveFormMhsedu004').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
	$('#saveFormMhsedu004 *').prop('disabled', status);
};
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhsedu004SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhsedu004, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhsedu004', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhsedu004', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsedu004, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhsedu004.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhsedu004', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhsedu004', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsedu004, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhsedu004.setSortImgState(false); 
            gf_FormSetValue('searchFormMhsedu004', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhsedu004', 'sortColumId', '', 'text'); 
            dhxGridMhsedu004.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhsedu004.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhsedu004', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhsedu004', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsedu004, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhsedu004 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhsedu004 = 0; 
    save_Edt_Cnt_Mhsedu004 = 0; 
    save_Del_Cnt_Mhsedu004 = 0; 
    dhxGridMhsedu004.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhsedu004.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhsedu004.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhsedu004 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhsedu004 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhsedu004 += 1; 
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
        save_All_Sta_Mhsedu004 = 0; 
        if(save_Add_Cnt_Mhsedu004 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhsedu004 + "건";
            save_All_Sta_Mhsedu004 = 1; 
        } 
        if(save_Edt_Cnt_Mhsedu004 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhsedu004 + "건"; 
        } 
        if(save_Del_Cnt_Mhsedu004 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhsedu004 + "건"; 
            save_All_Sta_Mhsedu004 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhsedu004(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhsedu004(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhsedu004 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhsedu004_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhsedu004_Send = function() {
    if(fn_GridValidation(dhxGridMhsedu004, dhxDataProcessorMhsedu004)) {
        dhxDataProcessorMhsedu004.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhsedu004 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhsedu004, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhsedu004.forEachRow(function(rowId) {
            state = dhxDataProcessorMhsedu004.getState(rowId);
            if(dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMhsedu004.getRowIndex(rowId);
                    dhxGridMhsedu004.deleteRow(rowId);
                    dhxGridMhsedu004.selectRow(rowNum);
                    fn_FindMhsedu004();
                }
                else dhxDataProcessorMhsedu004.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhsedu004 = function () {
    var titMhsedu004 = '교육결과보고관리'; /* gf_LocaleTrans('default', 'titMhsedu004') */
    var jsonParameter = {
        educourseCode : gf_FormGetValue('searchFormMhsedu004', 'educourseCode', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMhsedu004', 'elctsctSeSn', 'text'),
        empno : gf_FormGetValue('searchFormMhsedu004', 'empno', 'text'),
        resultElctsctSeSn : gf_FormGetValue('searchFormMhsedu004', 'resultElctsctSeSn', 'text')
    };
    var header = [[
        '교육과정 코드' /* gf_LocaleTrans('default', 'titEducourseCode') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '결과 전자결재 구분 순번' /* gf_LocaleTrans('default', 'titResultElctsctSeSn') */,
        '교육 시작일자' /* gf_LocaleTrans('default', 'titEduSdt') */,
        '교육 시작시간' /* gf_LocaleTrans('default', 'titEduShr') */,
        '교육 종료일자' /* gf_LocaleTrans('default', 'titEduEdt') */,
        '교육 종료시간' /* gf_LocaleTrans('default', 'titEduEhr') */,
        '총 이수 시간' /* gf_LocaleTrans('default', 'titTotFinishTime') */,
        '총 교육비' /* gf_LocaleTrans('default', 'titTotEducost') */,
        '고용보험 환급액' /* gf_LocaleTrans('default', 'titEpisRetunamt') */,
        '개인 교육비' /* gf_LocaleTrans('default', 'titIndvdlEducost') */,
        '수료 여부' /* gf_LocaleTrans('default', 'titCochrgeAt') */,
        '만족도 코드' /* gf_LocaleTrans('default', 'titStsfdgCode') */,
        '교육 기관' /* gf_LocaleTrans('default', 'titEduInstt') */,
        '교육 기관 주소' /* gf_LocaleTrans('default', 'titEduInsttAdres') */,
        '교육 내용' /* gf_LocaleTrans('default', 'titEduCn') */,
        '업무 적용 계획' /* gf_LocaleTrans('default', 'titJobApplcPlan') */,
        '요청 사항' /* gf_LocaleTrans('default', 'titRequstDesc') */,
        '설문조사 코드' /* gf_LocaleTrans('default', 'titQestnarCode') */,
        '설문조사 결과 순번' /* gf_LocaleTrans('default', 'titQestnarResultSn') */,
        '교통비' /* gf_LocaleTrans('default', 'titTrnsportct') */,
        '일비' /* gf_LocaleTrans('default', 'titDayct') */,
        '식대 비용' /* gf_LocaleTrans('default', 'titCgffdAmt') */,
        '숙박비' /* gf_LocaleTrans('default', 'titStayngct') */,
        '비고' /* gf_LocaleTrans('default', 'titRm') */,
        '첨부파일 번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '전자결재 문서 번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재 상태 코드' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 사원번호' /* gf_LocaleTrans('default', 'titElctsctEmpno') */,
        '반려 사유' /* gf_LocaleTrans('default', 'titReturnResn') */
    ]];
    var dataId = [[ 'educourseCode', 'elctsctSeSn', 'empno', 'resultElctsctSeSn', 'eduSdt', 'eduShr', 'eduEdt', 'eduEhr', 'totFinishTime', 'totEducost', 'episRetunamt', 'indvdlEducost', 'cochrgeAt', 'stsfdgCode', 'eduInstt', 'eduInsttAdres', 'eduCn', 'jobApplcPlan', 'requstDesc', 'qestnarCode', 'qestnarResultSn', 'trnsportct', 'dayct', 'cgffdAmt', 'stayngct', 'rm', 'atchmnflNo', 'elctsctDocNo', 'elctsctSttusCode', 'elctsctEmpno', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsedu004 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsedu004;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhsedu004/excelMhsedu004', jsonParameter);
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
    $('#saveFormMhsedu004 #educourseCodeSaveFormMhsedu004').parent().append(
    '<div class="error" id="educourseCodeSaveFormMhsedu004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsedu004 #elctsctSeSnSaveFormMhsedu004').parent().append(
    '<div class="error" id="elctsctSeSnSaveFormMhsedu004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsedu004 #empnoSaveFormMhsedu004').parent().append(
    '<div class="error" id="empnoSaveFormMhsedu004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhsedu004 #resultElctsctSeSnSaveFormMhsedu004').parent().append(
    '<div class="error" id="resultElctsctSeSnSaveFormMhsedu004-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhsedu004 = function(educourseCode, elctsctSeSn, empno, resultElctsctSeSn){
    if(!gf_IsNull(educourseCode) && !gf_IsNull(elctsctSeSn) && !gf_IsNull(empno) && !gf_IsNull(resultElctsctSeSn)) {
        var jsonParameter = {
            educourseCode : educourseCode,
            elctsctSeSn : elctsctSeSn,
            empno : empno,
            resultElctsctSeSn : resultElctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('mhsedu004/findMhsedu004', jsonParameter, 'GET');
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
    var state = dhxDataProcessorMhsedu004.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhsedu004').validate().form()){
                if(state == 'inserted') {
                    var educourseCode = gf_FormGetValue('saveFormMhsedu004', 'educourseCode', 'text');
                    var elctsctSeSn = gf_FormGetValue('saveFormMhsedu004', 'elctsctSeSn', 'text');
                    var empno = gf_FormGetValue('saveFormMhsedu004', 'empno', 'text');
                    var resultElctsctSeSn = gf_FormGetValue('saveFormMhsedu004', 'resultElctsctSeSn', 'text');
                    if(fn_CheckDupMhsedu004(educourseCode, elctsctSeSn, empno, resultElctsctSeSn)) return true;
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
    var checkNull;
    var checkNull;
    var checkNull;
    var checkNull;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhsedu004 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhsedu004 == 'deleted') {
        save_Row_Num_Mhsedu004 = 0;
        save_Row_Ids_Mhsedu004 = "";
    } else if(save_Row_Sta_Mhsedu004 == 'inserted') {
        save_Row_Num_Mhsedu004 = rowNum;
        save_Row_Ids_Mhsedu004 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhsedu004 = rowNum;
        save_Row_Ids_Mhsedu004 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'null');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'null');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'null');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'null');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkNull = gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid');
                    checkNull = gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid');
                    checkNull = gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid');
                    checkNull = gf_DhxGetValue(dhxGridObjet, rowId, 'null', 'grid');
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
                        if(!fn_CheckDupMhsedu004( checkEducourseCode, checkElctsctSeSn, checkEmpno, checkResultElctsctSeSn )){
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
        dhxGridMhsedu004.selectRowById(validFalseFistRowId);
        fn_FindMhsedu004();
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
	var closAt = dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMhsedu004,'closAt')).getValue();
	var idx = 0;
	$.each( data.data, function( key, value ) {
		if(gf_IsNull(closAt)){
		uploadedFileKeysPrg3.push(value.atchFileId);				
		uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
		
		atchFileList.push('<tr style=\"border:0\">');
		atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
		atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');
		
		idx++;
		}else{
			uploadedFileKeysPrg3.push(value.atchFileId);				
			uploadedFileInfoPrg3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
			
			atchFileList.push('<tr style=\"border:0\">');
			atchFileList.push('<td ><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
			atchFileList.push('<td style=\"width: 15%;\" class="ar">'+gf_FileSizeExpression(value.fileSize)+'</td>');
			atchFileList.push('<td style=\"width: 15%;\" class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3" disabled><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
			atchFileList.push('</tr>');
			
			idx++;
		}
		
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
		gf_FormSetValue('saveFormMhsedu004', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormMhsedu004', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
    callbacks.fire();
	}
};

var fn_BugtAdd = function() {
	var rowId = dhxGridMhsedu004.getSelectedRowId();
    var state = dhxDataProcessorMhsedu004.getState(rowId);
    
    var empno  = dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), dhxGridMhsedu004.getColIndexById("empno")).getValue();
	dhxGridMhseduTime.forEachRow(function(rowId) {
		
		dhxGridMhseduTime.cells(rowId, dhxGridMhseduTime.getColIndexById("empno")).setValue(empno);
		dhxDataProcessorMhseduTime.setUpdated(rowId, true, 'updated');
	});
    if(state == 'updated'){
		dhxDataProcessorMhseduTime.sendData();
	}if(state ==''){
		gf_DivMsgAlert('변경된 사항이 없습니다.');
	}

};
var fn_BugtRemove = function(){
	dhxGridMhsedu004.cells(dhxGridMhsedu004.getSelectedRowId(), dhxGridMhsedu004.getColIndexById("closAt")).setValue("");
	var rowId = dhxGridMhsedu004.getSelectedRowId();
	dhxDataProcessorMhsedu004.setUpdated(rowId, true, 'deleted');
    var state = dhxDataProcessorMhsedu004.getState(rowId);
	if(state == 'deleted'){
		dhxDataProcessorMhsedu004.sendData();
	}
}

var fn_BugtAddCon = function() {
	
	var rowId = dhxGridMhsedu004.getSelectedRowId();
	
	var empno = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'empno')).getValue();
	var korNm = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'korNm')).getValue();
//	var eduKindNm = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'eduKindNm')).getValue(); // 교육종류
	var educourseCode = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'educourseCode')).getValue();
	var elctsctSeSn = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'elctsctSeSn')).getValue();
	var resultElctsctSeSn = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'resultElctsctSeSn')).getValue();
	var educourseNm = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'educourseNm')).getValue();

	var jsonParameter = {
			empno : empno,
			korNm : korNm,
//			eduKindNm : eduKindNm,
			elctsctSttusCode : "10",
			educourseCode : educourseCode,
			elctsctSeSn : elctsctSeSn,
			resultElctsctSeSn : resultElctsctSeSn,
			educourseNm : educourseNm
	}
	
	var url = "mhsedu004/saveMhseduSttusCode";
    var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'GET');  // 기타 입력한 값들 저장 완료
    var data = dataSource.data;
	if(dataSource.code == '000'){
		gf_DivMsgAlert(gv_MsgSave);
		fn_SearchMhsedu004('');
	}else if(data.code == '999'){
		gf_DivMsgAlert("실패 하였습니다. 다시 신청해주세요.");
	}
};
var fn_BugtRemoveCon = function(){
	var returnResn = gf_FormGetValue('saveFormMhsedu004', 'returnResn', 'text');
	if(!gf_IsNull(returnResn)){
		var rowId = dhxGridMhsedu004.getSelectedRowId();
		
		var empno = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'empno')).getValue();
		var korNm = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'korNm')).getValue();
		var educourseCode = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'educourseCode')).getValue();
		var elctsctSeSn = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'elctsctSeSn')).getValue();
		var resultElctsctSeSn = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'resultElctsctSeSn')).getValue();
		var educourseNm = dhxGridMhsedu004.cells(rowId, gf_GetDhxGridColumId(dhxGridMhsedu004,'educourseNm')).getValue();
		
		var jsonParameter = {
				empno : empno,
				korNm : korNm,
//				eduKindNm : eduKindNm,
				elctsctSttusCode : "20",
				educourseCode : educourseCode,
				elctsctSeSn : elctsctSeSn,
				resultElctsctSeSn : resultElctsctSeSn,
				educourseNm : educourseNm
		}
		var url = "mhsedu004/saveMhseduReturn";
	    var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'GET');  // 기타 입력한 값들 저장 완료
	    var data = dataSource.data;
		if(dataSource.code == '000'){
			gf_DivMsgAlert(gv_MsgSave);
			fn_SearchMhsedu004('');
		}else if(data.code == '999'){
			gf_DivMsgAlert("실패 하였습니다. 다시 신청해주세요.");
		}
	}
}

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormMhsedu004', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMhsedu004', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormMhsedu004', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMhsedu004', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMhsedu004","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMhsedu004', 'empNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMhsedu004', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMhsedu004', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMhsedu004', 'empNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMhsedu004', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMhsedu004', 'empNm', 'text');
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
	 		gf_FormSetValue('searchFormMhsedu004', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhsedu004', 'empNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMhsedu004', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMhsedu004', 'empNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMhsedu004', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMhsedu004', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMhsedu004","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMhsedu004","empno","korNm", gBplcCode, "Y");
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
