/**
 *    프로그램       : 교육조회및신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.09.01
 *    사용테이블      : MHS_EDUREQST
 * sourceGen version : 2020.08.06.01 (2020.09.01)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubedu001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubedu001 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubedu001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubedu001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubedu001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubedu001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubedu001 = 0;  //그리드 삭제 수량 
var dhxGridPubedu001;  //그리드 객체
var dhxGridPubeduEmp;  //그리드 객체
var eventIdPubedu001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorPubedu001;  //DataProcessor 객체
var dhxDataProcessorPubeduEmp;  //DataProcessor 객체

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPubedu001();
    if(cf_SetComponentsPubedu001()){
       cf_SetEventListenerPubedu001();
       cf_InitFormPubedu001();
       cf_SetBindingPubedu001();
       if(init()){   // 초기화
     	   	init1();  // 기간달력 초기화
     		Searchinit(); // 조회 기간달력
     	}
    }
});
function init(){
    
    //기간달력 이벤트 추가
    $('#searchFormPubedu001 #date2').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxSearchCCalendarDate2.show();
    });
    
	//기간달력 이벤트 추가
    $('#saveFormPubedu001 .input_calen').unbind('click').bind('click', function(event){
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
		gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduSdt', gf_FormGetValue('saveFormPubedu001', 'eduSdt', 'text'));
	});
	
	//금일 날짜표시 
	$('#eduSdt').val(nowDate);
	
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"eduEdt", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	dhxCCalendarDate1.attachEvent("onClick" , function(){
		gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduEdt', gf_FormGetValue('saveFormPubedu001', 'eduEdt', 'text'));
		deCount();
	});
	$('#eduEdt').val(nowDate);
	

	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"reqstDe", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	dhxCCalendarDate1.attachEvent("onClick" , function(){
		gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'reqstDe', gf_FormGetValue('saveFormPubedu001', 'reqstDe', 'text'));
		deCount();
	});
	$('#reqstDe').val(nowDate);
	
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
	dhxSearchCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormPubedu001', 'stDate', 'text'));
	dhxSearchCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormPubedu001', 'edDate', 'text'));	
	dhxSearchCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxSearchCCalendarDate2.rightCalendar.loadUserLanguage("ko");
}

function deCount() {
	var sdd = gf_FormGetValue('saveFormPubedu001', 'eduSdt', 'text');
	var edd = gf_FormGetValue('saveFormPubedu001', 'eduEdt', 'text');
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
		gf_FormSetValue('saveFormPubedu001', 'eduDaycnt', parseInt(dif / cDay) + 1, 'text');
	};
}
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubedu001 = function() {
    gf_SetMenuPath();
    $("#saveFormPubedu001").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboeduCls','eduCls','eduCls', 'sel', 'C206', '' , '', '', 'ordr', 'required','',''); // 교육분류
    gf_ComboCode('divComboSearcheduCls','searcheduCls','searcheduCls', 'search', 'C206', '' , '', '', 'ordr', 'required','',''); // 조회 교육분류
    gf_ComboCode('divComboeduKind','eduKind','eduKind', 'sel', 'C114', '' , '', '', 'ordr', 'required','',''); // 교육종류
    gf_ComboCode('divComboeduMustAt','eduMustAt','eduMustAt', 'sel', 'C112', '' , '', '', 'ordr', 'required','',''); // 교육필수여부
    gf_ComboCode('divComboSearcheduMustAt','searcheduMustAt','searcheduMustAt', 'search', 'C112', '' , '', '', 'ordr', 'required','',''); // 조회 교육필수여부
    gf_ComboCode('divComboeduAmtBurdenSe','eduAmtBurdenSe','eduAmtBurdenSe', 'sel', 'C111', '' , '', '', 'ordr', 'required','',''); // 교육비용부담구분
    gf_ComboCode('divComboinnerExtrlEduSe','innerExtrlEduSe','innerExtrlEduSe', 'sel', 'C208', '' , '', '', 'ordr', 'required','',''); // 내외부교육구분
    gf_ComboCode('divCombochrgInstructor','chrgInstructor','chrgInstructor', 'sel', 'C046', '' , '', '', 'ordr', 'required','',''); // 내외부교육구분
    gf_ComboCode('divComboconfmsttuscode','confmSttusCode','confmSttusCode', 'sel', 'C197', '' , '', '', 'ordr', '','',''); // 승인상태
    gf_ComboCode('divComboSearchconfmSttusCode','searchconfmSttusCode','searchconfmSttusCode', 'search', 'C197', '' , '', '', 'ordr', 'required','',''); // 승인상태
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    $("#indvdlEducostSaveFormPubedu001").number(true);
    $("#extrlInstructorAllwncSaveFormPubedu001").number(true);
    $("#episRetunamtSaveFormPubedu001").number(true);
    
    $("#deptCodeNm").focus();
    
};

var cf_SetComponentsPubedu001 = function() {
    var dhxGridPubedu001HeaderInfo = [];
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllPubedu001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', ''));
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '150', 'center', 'str', 'ro', false, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('순번', '40', 'center', 'int', 'ro', false, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육과정명', '200', 'left', 'str', 'ro', false, 'educourseNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseNm') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('상태', '0', 'center', 'str', 'coro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작일자', '0', 'left', 'str', 'ro', true, 'eduSdt', '', '')); /* gf_LocaleTrans('default', 'titEduSdt') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 시작시간', '0', 'left', 'str', 'ro', true, 'eduShr', '', '')); /* gf_LocaleTrans('default', 'titEduShr') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료일자', '0', 'left', 'str', 'ro', true, 'eduEdt', '', '')); /* gf_LocaleTrans('default', 'titEduEdt') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 종료시간', '0', 'left', 'str', 'ro', true, 'eduEhr', '', '')); /* gf_LocaleTrans('default', 'titEduEhr') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 일수', '0', 'right', 'int', 'ro', true, 'eduDaycnt', '', '')); /* gf_LocaleTrans('default', 'titEduDaycnt') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 목적', '0', 'left', 'str', 'coro', true, 'eduPurps', '', '')); /* gf_LocaleTrans('default', 'titEduPurps') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 분류 ', '0', 'left', 'str', 'coro', true, 'eduCls', '', '')); /* gf_LocaleTrans('default', 'titEduCls') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 종류 ', '0', 'left', 'str', 'coro', true, 'eduKind', '', '')); /* gf_LocaleTrans('default', 'titEduKind') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 비용 부담 구분', '0', 'right', 'str', 'coro', true, 'eduAmtBurdenSe', '', '')); /* gf_LocaleTrans('default', 'titEduAmtBurdenSe') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('내외부 교육 구분', '0', 'center', 'str', 'coro', true, 'innerExtrlEduSe', '', '')); /* gf_LocaleTrans('default', 'titInnerExtrlEduSe') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 장소', '0', 'left', 'str', 'ro', true, 'eduZone', '', '')); /* gf_LocaleTrans('default', 'titEduZone') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 사원 여부', '0', 'center', 'str', 'ch', true, 'chrgInstructorEmplAt', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructorEmplAt') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 ', '0', 'left', 'str', 'ro', true, 'chrgInstructor', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructor') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('담당 강사 명 ', '0', 'left', 'str', 'ro', true, 'chrgInstructorNm', '', '')); /* gf_LocaleTrans('default', 'titChrgInstructorNm') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육 기관', '0', 'left', 'str', 'ro', true, 'eduInstt', '', '')); /* gf_LocaleTrans('default', 'titEduInstt') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('총 이수 학점', '0', 'left', 'str', 'ro', true, 'totFinishPnt', '', '')); /* gf_LocaleTrans('default', 'titTotFinishPnt') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('개인 교육비', '0', 'right', 'str', 'edn', true, 'indvdlEducost', '', '')); /* gf_LocaleTrans('default', 'titIndvdlEducost') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('수료증 발행 여부', '0', 'center', 'str', 'ch', true, 'cochrgedocumentIsuAt', '', '')); /* gf_LocaleTrans('default', 'titCochrgedocumentIsuAt') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('비고', '0', 'left', 'str', 'ro', true, 'rm', '', '')); /* gf_LocaleTrans('default', 'titRm') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('첨부파일 번호', '0', 'left', 'str', 'ro', true, 'atchmnflNo', '', '')); /* gf_LocaleTrans('default', 'titAtchmnflNo') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호 ', '0', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호  ', '0', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('반려 사유', '0', 'left', 'str', 'ro', true, 'returnResn', '', '')); /* gf_LocaleTrans('default', 'titReturnResn') */
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '0', 'center', 'str', 'ro', true, 'empno', '', ''));
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '0', 'center', 'str', 'ro', true, 'korNm', '', ''));
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('상태', '*', 'center', 'str', 'ro', false, 'confmSttusCode', '', ''));
	/*dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('상태', '*', 'center', 'str', 'coro', false, 'confmSttusCode', '', ''));*/
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('승인 구분 순번', '0', 'center', 'str', 'ro', true, 'confmSeSn', '', ''));
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('교육신청 순번', '0', 'center', 'str', 'ro', true, 'edureqstSn', '', ''));
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('신규 과정 여부 : 신규 교육과정 신청이면 1', '0', 'center', 'str', 'ro', true, 'newCrseAt', '', ''));
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('고용보험환급액', '0', 'center', 'str', 'ro', true, 'episRetunamt', '', ''));
    dhxGridPubedu001HeaderInfo.push(gf_MakeDhxGridHeader('복사여부', '0', 'center', 'str', 'ro', true, 'copyFlag', '', ''));
    dhxGridPubedu001 = gf_MakeDhxGrid('dataListPubedu001', dhxGridPubedu001HeaderInfo, true, false, false);
    dhxGridPubedu001.enableAutoWidth(false);
    dhxGridPubedu001.setEditable(true);
    
    dhxGridPubedu001.setColumnMinWidth(80,3); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
 // 교육분류
    var eduClsjsonParameter = {codekindCode : "C206",exceptCode :"",sortOrder :"asc" };
    var eduClsdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduClsjsonParameter, '');
    gf_ComboDataSet(dhxGridPubedu001, dhxGridPubedu001.getColIndexById("eduCls"), eduClsdataSource.data, "sel");
    
    // 교육종류
    var eduKindjsonParameter = {codekindCode : "C114",exceptCode :"",sortOrder :"asc" };
    var eduKinddataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduKindjsonParameter, '');
    gf_ComboDataSet(dhxGridPubedu001, dhxGridPubedu001.getColIndexById("eduKind"), eduKinddataSource.data, "sel");
    
    // 교육필수여부
    var eduMustAtjsonParameter = {codekindCode : "C112",exceptCode :"",sortOrder :"asc" };
    var eduMustAtdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduMustAtjsonParameter, '');
    gf_ComboDataSet(dhxGridPubedu001, dhxGridPubedu001.getColIndexById("eduMustAt"), eduMustAtdataSource.data, "sel");

    // 교육 비용 부담 구분
    var eduAmtBurdenSejsonParameter = {codekindCode : "C111",exceptCode :"",sortOrder :"asc" };
    var eduAmtBurdenSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', eduAmtBurdenSejsonParameter, '');
    gf_ComboDataSet(dhxGridPubedu001, dhxGridPubedu001.getColIndexById("eduAmtBurdenSe"), eduAmtBurdenSedataSource.data, "sel");
    
    // 내외부 교육 구분
    var innerExtrlEduSejsonParameter = {codekindCode : "C208",exceptCode :"",sortOrder :"asc" };
    var innerExtrlEduSedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', innerExtrlEduSejsonParameter, '');
    gf_ComboDataSet(dhxGridPubedu001, dhxGridPubedu001.getColIndexById("innerExtrlEduSe"), innerExtrlEduSedataSource.data, "sel");
    
    // 처리상태
    var elctsctSttusCodejsonParameter = {codekindCode : "EA004",exceptCode :"",sortOrder :"asc" };
    var elctsctSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', elctsctSttusCodejsonParameter, '');
    gf_ComboDataSet(dhxGridPubedu001, dhxGridPubedu001.getColIndexById("elctsctSttusCode"), elctsctSttusCodedataSource.data, "sel");
    
    // 승인상태
    //var confmSttusCodejsonParameter = {codekindCode : "C197",exceptCode :"",sortOrder :"asc" };
    //var confmSttusCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', confmSttusCodejsonParameter, '');
    //gf_ComboDataSet(dhxGridPubedu001, dhxGridPubedu001.getColIndexById("confmSttusCode"), confmSttusCodedataSource.data, "sel");
    
    
    
    
    
    
    var dhxGridPubeduEmpHeaderInfo = [];
    dhxGridPubeduEmpHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '100', 'center', 'str', 'ro', false, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridPubeduEmpHeaderInfo.push(gf_MakeDhxGridHeader('성명', '280', 'center', 'str', 'ro', false, 'korNm', '', '')); /* gf_LocaleTrans('default', 'titEducourseCode') */
    dhxGridPubeduEmpHeaderInfo.push(gf_MakeDhxGridHeader('부서', '280', 'center', 'str', 'ro', false, 'deptCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubeduEmpHeaderInfo.push(gf_MakeDhxGridHeader('직급', '*', 'center', 'int', 'ro', false, 'clsfCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubeduEmpHeaderInfo.push(gf_MakeDhxGridHeader('부서', '0', 'center', 'int', 'ro', true, 'deptCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubeduEmpHeaderInfo.push(gf_MakeDhxGridHeader('교육과정코드', '0', 'center', 'int', 'ro', true, 'educourseCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubeduEmpHeaderInfo.push(gf_MakeDhxGridHeader('순번', '0', 'center', 'int', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridPubeduEmp = gf_MakeDhxGrid('dataListPubeduEmp', dhxGridPubeduEmpHeaderInfo, true, false, false);
    dhxGridPubeduEmp.enableAutoWidth(false);
    dhxGridPubeduEmp.setEditable(true);

    dhxGridPubeduEmp.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerPubedu001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubedu001 = gf_GridDetachEvent(dhxGridPubedu001, eventIdPubedu001);
    eventId = dhxGridPubedu001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubedu001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubedu001.getColumnsNum();
            var rowNum = dhxGridPubedu001.getRowsNum();
            var selectedId = dhxGridPubedu001.getSelectedRowId();
            var ind        = dhxGridPubedu001.getSelectedCellIndex();
            var rowIndex   = dhxGridPubedu001.getRowIndex(selectedId);
            var type       = dhxGridPubedu001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubedu001.selectRow(0);
                    //fn_FindPubedu001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubedu001.selectRow(rowIndex + 1);
                    fn_FindPubedu001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubedu001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubedu001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubedu001.getSelectedRowId();
            var ind        = dhxGridPubedu001.getSelectedCellIndex();
            var rowIndex   = dhxGridPubedu001.getRowIndex(selectedId);
            var type       = dhxGridPubedu001.getColType(ind);
            dhxGridPubedu001.selectCell(rowIndex+1, ind);
            fn_FindPubedu001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubedu001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubedu001.getSelectedRowId();
            var ind        = dhxGridPubedu001.getSelectedCellIndex();
            var rowIndex   = dhxGridPubedu001.getRowIndex(selectedId);
            var type       = dhxGridPubedu001.getColType(ind);
            dhxGridPubedu001.selectCell(rowIndex-1, ind);
            fn_FindPubedu001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubedu001.editCell();
            }
        }
        else return true;
    });
    eventIdPubedu001.push(eventId);
    eventId = dhxGridPubedu001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubedu001SortGridList(ind, type, direction); 
    });
    eventIdPubedu001.push(eventId);
    eventId = dhxGridPubedu001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubedu001.push(eventId);
    eventId = dhxGridPubedu001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindPubedu001();
    });
    eventIdPubedu001.push(eventId);
    eventId = dhxGridPubedu001.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdPubedu001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubedu001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddPubedu001()
    });
    $('#btnSavePubedu001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubedu001();
    });
    $('#btnRemovePubedu001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubedu001();
    });
    $('#btnExcelPubedu001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubedu001();
    });
    $('#btnSearchPubedu001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubedu001('');
    });
    $('#btnResetPubedu001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubedu001();
    });
    $('#btneducourseCodeSearch').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        gf_EducourseCodePopup('','','','', gBplcCode, "N", "fn_CallbackPopEducourseCode");  
    });
    // 품목정보 Save 버튼 이벤트
    $('#btnpostCodeSearch').unbind('click').bind('click', function() {
    	
    	var chrgInstructorEmplAt = gf_FormGetValue('saveFormPubedu001', 'chrgInstructorEmplAt', 'chkbox')? '0' : '1';
    	if(chrgInstructorEmplAt == '0'){
    		gf_EmpPopup("saveFormPubedu001","","", '1000', "Y", "fn_CallbackPopEmp1");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    	} else if(chrgInstructorEmplAt == '1'){
    		gf_IncomeKindPopup('','','','', gBplcCode, "N", "fn_CallbackPopComp");
    	}
    });
    $('#btnBugtAdd').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubedu001, 'chk');
        var confmSttusCode = gf_FormGetValue('saveFormPubedu001', 'confmSttusCode', 'text');
        if(gf_IsNull(rowIds)){
    		gf_DivMsgAlert("승인요청할 항목을 선택해 주세요.");
			return false;
		}
        var exit = false;
        if(!gf_IsNull(rowIds)){
        	$(rowIds).each(function(index, rowId){
        		var confmSttusCode = dhxGridPubedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridPubedu001,'confmSttusCode')).getValue();
    			if(!gf_IsNull(confmSttusCode)){
    				gf_DivMsgAlert("승인요청할 항목을 다시 선택해 주세요.");
    				return false;
    			}else{
    				exit = true;
    				return false;
    			}
    		});
        }
        if(exit==true){
        	fn_BugtAdd();
        }
        
    });
    // copy 버튼
    $('#btnBugtcopy').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveCopyPubedu001();
    });
    
    // 기타 이벤트 ==========================================================================================
    $('#checkAllPubedu001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridPubedu001, $('#checkAllPubedu001').prop('checked'), 'chk');
    });
    $('#searchFormPubedu001 input, select, button, textarea').unbind('keypress').bind('keypress',function() {
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
        		$('#btnSearchPubedu001').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true;  
    });  
    $('#saveFormPubedu001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormPubedu001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormPubedu001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubedu001 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'empno', $(this).val());
    });
    $('#saveFormPubedu001 input[name="edureqstSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'edureqstSn', $(this).val());
    });
    $('#saveFormPubedu001 input[name="confmSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'confmSeSn', $(this).val());
    });
    $('#saveFormPubedu001 input[name="reqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'reqstDe', $(this).val());
    });
    $('#saveFormPubedu001 input[name="newCrseAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'newCrseAt', $(this).val());
    });
    $('#saveFormPubedu001 input[name="educourseCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'educourseCode', $(this).val());
    });
    $('#saveFormPubedu001 input[name="elctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'elctsctSeSn', $(this).val());
    });
    $('#saveFormPubedu001 input[name="educourseNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'educourseNm', $(this).val());
    });
    $('#saveFormPubedu001 input[name="eduSdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduSdt', $(this).val());
    });
    $('#saveFormPubedu001 input[name="eduShr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduShr', $(this).val());
    });
    $('#saveFormPubedu001 input[name="eduEdt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduEdt', $(this).val());
    });
    $('#saveFormPubedu001 input[name="eduEhr"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduEhr', $(this).val());
    });
    $('#saveFormPubedu001 input[name="eduDaycnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduDaycnt', $(this).val());
    });
    $('#saveFormPubedu001 input[name="eduPurps"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduPurps', $(this).val());
    });
    $('#saveFormPubedu001 select[name="eduCls"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduCls', gf_FormGetValue('saveFormPubedu001', 'eduCls', 'combo'));
    });
    $('#saveFormPubedu001 select[name="eduKind"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduKind', gf_FormGetValue('saveFormPubedu001', 'eduKind', 'combo'));
    });
    $('#saveFormPubedu001 select[name="eduMustAt"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduMustAt', gf_FormGetValue('saveFormPubedu001', 'eduMustAt', 'combo'));
    });
    $('#saveFormPubedu001 select[name="eduAmtBurdenSe"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduAmtBurdenSe', gf_FormGetValue('saveFormPubedu001', 'eduAmtBurdenSe', 'combo'));
    });
    $('#saveFormPubedu001 select[name="innerExtrlEduSe"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'innerExtrlEduSe', gf_FormGetValue('saveFormPubedu001', 'innerExtrlEduSe', 'combo'));
    });
    $('#saveFormPubedu001 input[name="eduZone"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduZone', $(this).val());
    });
    $('#saveFormPubedu001 input[name="chrgInstructorEmplAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormPubedu001', 'chrgInstructorEmplAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'chrgInstructorEmplAt', val);
    });
    $('#saveFormPubedu001 input[name="chrgInstructor"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'chrgInstructor', $(this).val());
    });
    $('#saveFormPubedu001 input[name="chrgInstructorNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'chrgInstructorNm', $(this).val());
    });
    $('#saveFormPubedu001 input[name="eduInstt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduInstt', $(this).val());
    });
    $('#saveFormPubedu001 input[name="eduInsttAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'eduInsttAdres', $(this).val());
    });
    $('#saveFormPubedu001 input[name="indvdlEducost"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'indvdlEducost', $(this).val());
    });
    $('#saveFormPubedu001 input[name="episRetunamt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'episRetunamt', $(this).val());
    });
    $('#saveFormPubedu001 input[name="cochrgedocumentIsuAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormPubedu001', 'cochrgedocumentIsuAt', 'chkbox'))? '0' : '1';        
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'cochrgedocumentIsuAt', val);
    });
    $('#saveFormPubedu001 input[name="rm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'rm', $(this).val());
    });
    $('#saveFormPubedu001 input[name="atchmnfl"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'atchmnflNo', $(this).val());
    });
    $('#saveFormPubedu001 select[name="confmSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'confmSttusCode', gf_FormGetValue('saveFormPubedu001', 'confmSttusCode', 'combo'));
    });
    $('#saveFormPubedu001 input[name="confmDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'confmDe', $(this).val());
    });
    $('#saveFormPubedu001 input[name="confmEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'confmEmpno', $(this).val());
    });
    $('#saveFormPubedu001 input[name="returnResn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'returnResn', $(this).val());
    });
    $('#saveFormPubedu001 input[name="korNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'korNm', $(this).val());
    });
    $('#saveFormPubedu001 select[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridPubedu001, dhxDataProcessorPubedu001, 'elctsctSttusCode', $(this).val());
    });
  //사용자 찾기 
    $('#btnUseEmpSearch').unbind('click').bind('click', function(event){
    	// form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    	gf_EmpPopup("searchFormPubedu001","empnoSaveFormPubedu001","korNmSaveFormPubedu001", gBplcCode, "N", "");  //
    });
  //사원 선택 Popup
    $('#searchFormPubedu001 #btnempnoSearchSearchFormPubedu001').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubedu001","empno","korNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#searchFormPubedu001 #btnDeptCodeSearchSearchFormPubedu001').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormPubedu001","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormPubedu001', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormPubedu001', 'empno', '', 'text');
	    }
		
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormPubedu001', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormPubedu001', 'deptCode', '', 'text');
	    }
    });
    // 폼 이벤트 end ============================================================================================
};

var cf_InitFormPubedu001 = function() {
    $('#searchFormPubedu001').resetForm();
    
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gf_FormSetValue("searchFormPubedu001", "empno", userInfo.data.userEmpNo, 'text');
	gf_FormSetValue("searchFormPubedu001", "empNm", userInfo.data.userNm, 'text');
	gf_FormSetValue("searchFormPubedu001", "deptCodeNm", userInfo.data.userDeptNm, 'text');
	gf_FormSetValue("searchFormPubedu001", "deptCode", userInfo.data.userDeptCode, 'text');
	gf_FormSetValue("saveFormPubedu001", "empno", userInfo.data.userEmpNo, 'text');
	gf_FormSetValue("saveFormPubedu001", "korNm", userInfo.data.userNm, 'text');
    $('#deptCode').prop('disabled', true);
    $('#deptCodeNm').prop('disabled', true);
    $('#empno').prop('disabled', true);
    $('#korNm').prop('disabled', true);
    $("#btnDeptCodeSearchSearchFormPubwfs008").attr('disabled',true);
    $("#btnempnoSearchSearchFormPubwfs008").attr('disabled',true);
    
};

var cf_SetBindingPubedu001 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchPubedu001('');
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchPubedu001 = function(userId) {
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
	
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
	
    var jsonParameter = {
    	empno : userInfo.data.userEmpNo,
    	stDate : gf_FormGetValue('searchFormPubedu001', 'stDate', 'text'),
        edDate : gf_FormGetValue('searchFormPubedu001', 'edDate', 'text'),
        reqststDate : gf_FormGetValue('searchFormPubedu001', 'reqststDate', 'text'),
        reqstedDate : gf_FormGetValue('searchFormPubedu001', 'reqstedDate', 'text'),
        searcheduCls : gf_FormGetValue('searchFormPubedu001', 'searcheduCls', 'combo'),
        searcheduMustAt : gf_FormGetValue('searchFormPubedu001', 'searcheduMustAt', 'combo'),
        searchconfmSttusCode : gf_FormGetValue('searchFormPubedu001', 'searchconfmSttusCode', 'combo'),
        educourseNm : gf_FormGetValue('searchFormPubedu001', 'educourseNm', 'text')
    };
    gf_Transaction(userId, 'pubedu001/searchPubedu001', jsonParameter, 'fn_CallbackSearchPubedu001', false, 'GET');
};

var fn_CallbackSearchPubedu001 = function(strSvcID, targetID, data) {
    //dhxGridPubedu001.clearAll();
    dhxGridPubedu001.destructor();
    if(cf_SetComponentsPubedu001()){ 
        fn_DhxDataProcessorPubedu001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPubedu001');
            dhxGridPubedu001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Pubedu001 == 0 && save_All_Sta_Pubedu001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridPubedu001.selectRow(0); 
            } else if(save_Row_Sta_Pubedu001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridPubedu001.selectRow(0);
            } else if(save_All_Sta_Pubedu001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridPubedu001.selectRow(save_Row_Num_Pubedu001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridPubedu001.selectRow(save_Row_Num_Pubedu001);   //개발자 수정 필요  
                //var findCell = dhxGridPubedu001.findCell(save_Row_Ids_Pubedu001, gf_GetDhxGridColumId(dhxGridPubedu001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridPubedu001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridPubedu001.selectRow(0);
                //} 
            } 
 
            fn_FindPubedu001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListPubedu001');
            fn_InitInputFormPubedu001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormPubedu001").text(data.data.records.length);
        cf_SetEventListenerPubedu001();
    } 
};
var fn_DhxDataProcessorPubedu001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubedu001 = new dataProcessor(gv_ContextPath+'/pubedu001/savePubedu001'); //lock feed url
    dhxDataProcessorPubedu001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubedu001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubedu001.init(dhxGridPubedu001); //link dataprocessor to the grid
    dhxDataProcessorPubedu001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubedu001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubedu001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubedu001();
                    $("#checkAllPubedu001").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};


var fn_CallbackSearchPubeduEmp = function(strSvcID, targetID, data) {
	dhxGridPubeduEmp.clearAll();
	fn_DhxDataProcessorPubeduEmp();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListPubeduEmp');
        dhxGridPubeduEmp.parse(data.data.records, 'js');
        dhxGridPubeduEmp.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListPubeduEmp');
    }
    $("#spanCntSearchFormPubeduEmp").text(data.data.records.length);
    cf_SetEventListenerPubedu001();
};

var fn_DhxDataProcessorPubeduEmp = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubeduEmp = new dataProcessor(gv_ContextPath+'/pubedu001/savePubeduEmp'); //lock feed url
    dhxDataProcessorPubeduEmp.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubeduEmp.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubeduEmp.init(dhxGridPubeduEmp); //link dataprocessor to the grid
    dhxDataProcessorPubeduEmp.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubeduEmp.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubeduEmp.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
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
var fn_FindPubedu001 = function() {
    var rId = dhxGridPubedu001.getSelectedRowId();
    var status = dhxDataProcessorPubedu001.getState(rId);

    fn_FormDisabled(false);

    gf_FormSetValue("saveFormPubedu001", "educourseCode", gf_DhxGetValue(dhxGridPubedu001, rId, 'educourseCode',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "elctsctSeSn", gf_DhxGetValue(dhxGridPubedu001, rId, 'elctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "educourseNm", gf_DhxGetValue(dhxGridPubedu001, rId, 'educourseNm',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "eduSdt", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduSdt',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "eduShr", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduShr',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "eduEdt", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduEdt',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "eduEhr", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduEhr',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "eduDaycnt", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduDaycnt',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "eduPurps", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduPurps',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "eduCls", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduCls',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubedu001", "eduKind", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduKind',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubedu001", "eduAmtBurdenSe", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduAmtBurdenSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubedu001", "innerExtrlEduSe", gf_DhxGetValue(dhxGridPubedu001, rId, 'innerExtrlEduSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubedu001", "eduZone", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduZone',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "chrgInstructorEmplAt", (( gf_DhxGetValue(dhxGridPubedu001, rId, 'chrgInstructorEmplAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormPubedu001", "chrgInstructor", gf_DhxGetValue(dhxGridPubedu001, rId, 'chrgInstructor',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "chrgInstructorNm", gf_DhxGetValue(dhxGridPubedu001, rId, 'chrgInstructorNm',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "eduInstt", gf_DhxGetValue(dhxGridPubedu001, rId, 'eduInstt',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "totFinishPnt", gf_DhxGetValue(dhxGridPubedu001, rId, 'totFinishPnt',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "indvdlEducost", gf_DhxGetValue(dhxGridPubedu001, rId, 'indvdlEducost',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "cochrgedocumentIsuAt", (( gf_DhxGetValue(dhxGridPubedu001, rId, 'cochrgedocumentIsuAt',  'grid') == '1') ? true : false), 'chkbox');
    gf_FormSetValue("saveFormPubedu001", "rm", gf_DhxGetValue(dhxGridPubedu001, rId, 'rm',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "elctsctDocNo", gf_DhxGetValue(dhxGridPubedu001, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "elctsctSttusCode", gf_DhxGetValue(dhxGridPubedu001, rId, 'elctsctSttusCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormPubedu001", "elctsctEmpno", gf_DhxGetValue(dhxGridPubedu001, rId, 'elctsctEmpno',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "returnResn", gf_DhxGetValue(dhxGridPubedu001, rId, 'returnResn',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "reqstDe", gf_DhxGetValue(dhxGridPubedu001, rId, 'reqstDe',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "empno", gf_DhxGetValue(dhxGridPubedu001, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "korNm", gf_DhxGetValue(dhxGridPubedu001, rId, 'korNm',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "confmSeSn", gf_DhxGetValue(dhxGridPubedu001, rId, 'confmSeSn',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "edureqstSn", gf_DhxGetValue(dhxGridPubedu001, rId, 'edureqstSn',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "episRetunamt", gf_DhxGetValue(dhxGridPubedu001, rId, 'episRetunamt',  'grid'), '');
    gf_FormSetValue("saveFormPubedu001", "confmSttusCode", gf_DhxGetValue(dhxGridPubedu001, rId, 'confmSttusCode',  'grid'), '');
    
    var reqstDe = gf_FormGetValue("saveFormPubedu001",'reqstDe','text');
    var confmSttusCode = gf_DhxGetValue(dhxGridPubedu001, rId, 'confmSttusCode',  'grid');
    var copyFlag = gf_DhxGetValue(dhxGridPubedu001, rId, 'copyFlag',  'grid');
	if((!gf_IsNull(reqstDe)) && (confmSttusCode == "승인")|| (!gf_IsNull(reqstDe)) &&(confmSttusCode == "승인신청")){
		$("#btnBugtAdd").hide();
		$("#btnBugtcopy").hide();
		fn_FormDisabled(false);
	} else if((!gf_IsNull(reqstDe)) && (confmSttusCode == "반려")){
		$("#btnBugtAdd").hide();
		$("#btnBugtcopy").show();
		fn_FormDisabled(false);
	} else if ((!gf_IsNull(reqstDe)) && (confmSttusCode == '')) {
		$("#btnBugtAdd").show();
		$("#btnBugtcopy").hide();
		fn_FormDisabled(false);
	} else if ((gf_IsNull(reqstDe)) && (confmSttusCode == '')){
		$("#btnBugtAdd").hide();
		$("#btnBugtcopy").hide();
		fn_FormDisabled(true);
	}
	if(copyFlag > 0){
		$("#btnBugtAdd").hide();
		$("#btnBugtcopy").hide();
	}
	
    var edureqstSn = gf_DhxGetValue(dhxGridPubedu001, rId, 'edureqstSn',  'grid');
    var confmSeSn = gf_DhxGetValue(dhxGridPubedu001, rId, 'confmSeSn',  'grid');
    var empno = gf_DhxGetValue(dhxGridPubedu001, rId, 'empno',  'grid');
    if(!gf_IsNull(edureqstSn)){
    	var jsonParameter = {
    			edureqstSn : edureqstSn,
    			confmSeSn : confmSeSn,
    			empno : empno
    	}
    	gf_Transaction('', 'pubedu001/searchPubeduEmp', jsonParameter, 'fn_CallbackSearchPubeduEmp', false , 'GET');
    }else if(gf_IsNull(edureqstSn)){
    	dhxGridPubeduEmp.clearAll();
    	gf_NoFoundDataOnGridMsg('dataListPubeduEmp');
    	fn_DhxDataProcessorPubeduEmp();
    }
    
    gf_FormSetValue('saveFormPubedu001', 'atchmnfl', gf_DhxGetValue(dhxGridPubedu001, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일 
    gf_FormSetValue('saveFormPubedu001', 'atchmnflList', gf_DhxGetValue(dhxGridPubedu001, rId, 'atchmnflNo',  'grid'), 'text');  //첨부파일
    
    $('#confmSttusCode').attr('disabled',true);
    
    var atchmnflNo = gf_DhxGetValue(dhxGridPubedu001, rId, 'atchmnflNo', 'grid');
    if(!gf_IsNull(atchmnflNo)){
    	var jsonParameter = { atchFiles : gf_DhxGetValue(dhxGridPubedu001, rId, 'atchmnflNo',  'grid') };
    	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
    }
    
	
    if(status == 'inserted') {
        $('#saveFormPubedu001 input[name="empno"]').prop('disabled', false);
        $('#saveFormPubedu001 input[name="edureqstSn"]').prop('disabled', false);
        $('#saveFormPubedu001 input[name="confmSeSn"]').prop('disabled', false);
    } else {
        $('#saveFormPubedu001 input[name="empno"]').prop('disabled', true);
        $('#saveFormPubedu001 input[name="edureqstSn"]').prop('disabled', true);
        $('#saveFormPubedu001 input[name="confmSeSn"]').prop('disabled', true);
    }
};
/**
 * 입력폼 초기화
 */
var fn_InitInputFormPubedu001 = function() {
    $('#saveFormPubedu001 input[name="empno"]').prop('disabled', false);
    $('#saveFormPubedu001 input[name="edureqstSn"]').prop('disabled', false);
    $('#saveFormPubedu001 input[name="confmSeSn"]').prop('disabled', false);
    $('#saveFormPubedu001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormPubedu001 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddPubedu001 = function() {
    dhxGridPubedu001.clearSelection();
//    dhxGridPubeduEmp.clearSelection();
    dhxGridPubeduEmp.clearAll(); 
    fn_InitInputFormPubedu001();
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //educourseCode
    initValueArr.push(''); //elctsctSeSn
    initValueArr.push(''); //educourseNm
    initValueArr.push(''); //educourseNm
    initValueArr.push(''); //educourseNm
    initValueArr.push(nowDate); //eduSdt
    initValueArr.push('00:00'); //eduShr
    initValueArr.push(nowDate); //eduEdt
    initValueArr.push('00:00'); //eduEhr
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
    initValueArr.push('1'); //returnResn
    initValueArr.push(''); //returnResn
    dhxGridPubedu001.addRow(dhxGridPubedu001.uid(), initValueArr, 0);
    dhxGridPubedu001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListPubedu001');
    $('#btnPopEmpSearchPubedu001').show();
    fn_FormDisabled(false);
    
    var initValueArrEmp = [];
	initValueArrEmp.push(userInfo.data.userEmpNo);
	initValueArrEmp.push(userInfo.data.userNm);
	initValueArrEmp.push(userInfo.data.userDeptNm);
	initValueArrEmp.push(userInfo.data.clsfCode);
	initValueArrEmp.push(userInfo.data.userDeptCode);
	dhxGridPubeduEmp.addRow(dhxGridPubeduEmp.uid(), initValueArrEmp, 0);
    dhxGridPubeduEmp.selectRow(0);
    
    gf_FormSetValue("saveFormPubedu001","reqstDe", nowDate, 'text');
    gf_FormSetValue("saveFormPubedu001","eduSdt", nowDate, 'text');
    gf_FormSetValue("saveFormPubedu001","eduEdt", nowDate, 'text');
    gf_FormSetValue("saveFormPubedu001","empno", userInfo.data.userEmpNo, 'text');
    gf_FormSetValue("saveFormPubedu001","korNm", userInfo.data.userNm, 'text');
    
    var jsonParameter = { atchFiles : 'AAAAAAAAA' };
	gf_Transaction("atchmnflList", 'file/searchFiles', jsonParameter, 'fn_SearchPrgFileList', false);
	
	 $('#confmSttusCode').attr('disabled',true);
	 
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubedu001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubedu001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubedu001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubedu001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubedu001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubedu001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubedu001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubedu001', 'sortColumId', gf_GetDhxGridColum(dhxGridPubedu001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubedu001.setSortImgState(false); 
            gf_FormSetValue('searchFormPubedu001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubedu001', 'sortColumId', '', 'text'); 
            dhxGridPubedu001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubedu001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubedu001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubedu001', 'sortColumId', gf_GetDhxGridColum(dhxGridPubedu001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubedu001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubedu001 = 0; 
    save_Edt_Cnt_Pubedu001 = 0; 
    save_Del_Cnt_Pubedu001 = 0; 
    dhxGridPubedu001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubedu001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubedu001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubedu001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubedu001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubedu001 += 1; 
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
        save_All_Sta_Pubedu001 = 0; 
        if(save_Add_Cnt_Pubedu001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pubedu001 + "건";
            save_All_Sta_Pubedu001 = 1; 
        } 
        if(save_Edt_Cnt_Pubedu001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pubedu001 + "건"; 
        } 
        if(save_Del_Cnt_Pubedu001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pubedu001 + "건"; 
            save_All_Sta_Pubedu001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPubedu001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubedu001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPubedu001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubedu001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubedu001_Send = function() {
    if(fn_GridValidation(dhxGridPubedu001, dhxDataProcessorPubedu001)) {
        dhxDataProcessorPubedu001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemovePubedu001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubedu001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridPubedu001.forEachRow(function(rowId) {
            state = dhxDataProcessorPubedu001.getState(rowId);
            if(dhxGridPubedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridPubedu001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridPubedu001.getRowIndex(rowId);
                    dhxGridPubedu001.deleteRow(rowId);
                    dhxGridPubedu001.selectRow(rowNum);
                    fn_FindPubedu001();
                }
                else dhxDataProcessorPubedu001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubedu001 = function () {
    var titPubedu001 = '교육조회및신청'; /* gf_LocaleTrans('default', 'titPubedu001') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormPubedu001', 'empno', 'text'),
        edureqstSn : gf_FormGetValue('searchFormPubedu001', 'edureqstSn', 'text'),
        confmSeSn : gf_FormGetValue('searchFormPubedu001', 'confmSeSn', 'text')
    };
    var header = [[
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '교육신청 순번' /* gf_LocaleTrans('default', 'titEdureqstSn') */,
        '승인 구분 순번' /* gf_LocaleTrans('default', 'titConfmSeSn') */,
        '신청 일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '신규 과정 여부 : 신규 교육과정 신청이면 1' /* gf_LocaleTrans('default', 'titNewCrseAt') */,
        '교육과정코드 : 선택 시에는 승인된 교육만 신청 가능, 선택 시에는 아래 내용 입력 불필요(기존에 등록되지 않은 교육 일수도 있으므로 null 가능 )' /* gf_LocaleTrans('default', 'titEducourseCode') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '교육과정 명' /* gf_LocaleTrans('default', 'titEducourseNm') */,
        '교육 시작일자' /* gf_LocaleTrans('default', 'titEduSdt') */,
        '교육 시작시간' /* gf_LocaleTrans('default', 'titEduShr') */,
        '교육 종료일자' /* gf_LocaleTrans('default', 'titEduEdt') */,
        '교육 종료시간' /* gf_LocaleTrans('default', 'titEduEhr') */,
        '교육 일수' /* gf_LocaleTrans('default', 'titEduDaycnt') */,
        '교육 목적' /* gf_LocaleTrans('default', 'titEduPurps') */,
        '교육 분류 (C206)' /* gf_LocaleTrans('default', 'titEduCls') */,
        '교육 종류 (C114)' /* gf_LocaleTrans('default', 'titEduKind') */,
        '교육 비용 부담 구분(C111)' /* gf_LocaleTrans('default', 'titEduAmtBurdenSe') */,
        '내외부 교육 구분(C208)' /* gf_LocaleTrans('default', 'titInnerExtrlEduSe') */,
        '교육 장소' /* gf_LocaleTrans('default', 'titEduZone') */,
        '담당 강사 사원 여부' /* gf_LocaleTrans('default', 'titChrgInstructorEmplAt') */,
        '담당 강사 (기타/사업소득자 코드, 기타는 입력 안함)' /* gf_LocaleTrans('default', 'titChrgInstructor') */,
        '담당 강사 명 (기타/사업소득자는 저장 안함, 기타는 입력)' /* gf_LocaleTrans('default', 'titChrgInstructorNm') */,
        '교육 기관' /* gf_LocaleTrans('default', 'titEduInstt') */,
        '교육기관주소' /* gf_LocaleTrans('default', 'titEduInsttAdres') */,
        '개인 교육비' /* gf_LocaleTrans('default', 'titIndvdlEducost') */,
        '고용 보험 환급액' /* gf_LocaleTrans('default', 'titEpisRetunamt') */,
        '수료증 발행 여부' /* gf_LocaleTrans('default', 'titCochrgedocumentIsuAt') */,
        '비고(교육내용)' /* gf_LocaleTrans('default', 'titRm') */,
        '첨부파일 번호' /* gf_LocaleTrans('default', 'titAtchmnflNo') */,
        '승인 상태 코드(C197)' /* gf_LocaleTrans('default', 'titConfmSttusCode') */,
        '승인 일자' /* gf_LocaleTrans('default', 'titConfmDe') */,
        '승인 사원번호' /* gf_LocaleTrans('default', 'titConfmEmpno') */,
        '반려 사유' /* gf_LocaleTrans('default', 'titReturnResn') */
    ]];
    var dataId = [[ 'empno', 'edureqstSn', 'confmSeSn', 'reqstDe', 'newCrseAt', 'educourseCode', 'elctsctSeSn', 'educourseNm', 'eduSdt', 'eduShr', 'eduEdt', 'eduEhr', 'eduDaycnt', 'eduPurps', 'eduCls', 'eduKind', 'eduAmtBurdenSe', 'innerExtrlEduSe', 'eduZone', 'chrgInstructorEmplAt', 'chrgInstructor', 'chrgInstructorNm', 'eduInstt', 'eduInsttAdres', 'indvdlEducost', 'episRetunamt', 'cochrgedocumentIsuAt', 'rm', 'atchmnflNo', 'confmSttusCode', 'confmDe', 'confmEmpno', 'returnResn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titPubedu001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubedu001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubedu001/excelPubedu001', jsonParameter);
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
    $('#saveFormPubedu001 #empnoSaveFormPubedu001').parent().append(
    '<div class="error" id="empnoSaveFormPubedu001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormPubedu001 #edureqstSnSaveFormPubedu001').parent().append(
    '<div class="error" id="edureqstSnSaveFormPubedu001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormPubedu001 #confmSeSnSaveFormPubedu001').parent().append(
    '<div class="error" id="confmSeSnSaveFormPubedu001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubedu001 = function(empno, edureqstSn, confmSeSn){
    if(!gf_IsNull(empno) && !gf_IsNull(edureqstSn) && !gf_IsNull(confmSeSn)) {
        var jsonParameter = {
            empno : empno,
            edureqstSn : edureqstSn,
            confmSeSn : confmSeSn
        };
        var dataSource = gf_NoAsyncTransaction('pubedu001/findPubedu001', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno) && gf_IsNull(data.edureqstSn) && gf_IsNull(data.confmSeSn)) {
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
    var state = dhxDataProcessorPubedu001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormPubedu001').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormPubedu001', 'empno', 'text');
                    var edureqstSn = gf_FormGetValue('saveFormPubedu001', 'edureqstSn', 'text');
                    var confmSeSn = gf_FormGetValue('saveFormPubedu001', 'confmSeSn', 'text');
                    if(fn_CheckDupPubedu001(empno, edureqstSn, confmSeSn)) return true;
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
    var checkEmpno;
    var checkEdureqstSn;
    var checkConfmSeSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pubedu001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Pubedu001 == 'deleted') {
        save_Row_Num_Pubedu001 = 0;
        save_Row_Ids_Pubedu001 = "";
    } else if(save_Row_Sta_Pubedu001 == 'inserted') {
        save_Row_Num_Pubedu001 = rowNum;
        save_Row_Ids_Pubedu001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubedu001 = rowNum;
        save_Row_Ids_Pubedu001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduCls', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduCls');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'eduKind', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'eduKind');
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
//                
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridPubedu001.selectRowById(validFalseFistRowId);
        fn_FindPubedu001();
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

var fn_CallbackPopEducourseCode = function(data) {
	console.log(data)
	if(!gf_IsNull(data.educourseCode)) {
	gf_FormSetValue('saveFormPubedu001', 'elctsctSeSn', data.elctsctSeSn, 'text');
	gf_FormSetValue('saveFormPubedu001', 'educourseCode', data.educourseCode, 'text');
	gf_FormSetValue('saveFormPubedu001', 'educourseNm', data.educourseNm, 'text');
	gf_FormSetValue('saveFormPubedu001', 'eduSdt', data.eduSdt, 'text');
	gf_FormSetValue('saveFormPubedu001', 'eduShr', data.eduShr, 'text');
	gf_FormSetValue('saveFormPubedu001', 'eduEdt', data.eduEdt, 'text');
	gf_FormSetValue('saveFormPubedu001', 'eduEhr', data.eduEhr, 'text');
	gf_FormSetValue('saveFormPubedu001', 'eduDaycnt', data.eduDaycnt, 'text');
	gf_FormSetValue('saveFormPubedu001', 'eduCls', data.eduCls, 'combo');
	dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'eduCls')).setValue(data.eduCls);
	gf_FormSetValue('saveFormPubedu001', 'eduKind', data.eduKind, 'combo');
	dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'eduKind')).setValue(data.eduKind);
	gf_FormSetValue('saveFormPubedu001', 'innerExtrlEduSe', data.innerExtrlEduSe, 'combo');
	dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'innerExtrlEduSe')).setValue(data.innerExtrlEduSe);
	gf_FormSetValue('saveFormPubedu001', 'eduAmtBurdenSe', data.eduAmtBurdenSe, 'combo');
	dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'eduAmtBurdenSe')).setValue(data.eduAmtBurdenSe);
	gf_FormSetValue('saveFormPubedu001', 'eduInstt', data.eduInstt, 'text');
	gf_FormSetValue('saveFormPubedu001', 'eduZone', data.eduZone, 'text');
	gf_FormSetValue('saveFormPubedu001', 'chrgInstructorEmplAt', data.chrgInstructorEmplAt, 'chkbox');
	gf_FormSetValue('saveFormPubedu001', 'chrgInstructor', data.chrgInstructor, 'text');
	gf_FormSetValue('saveFormPubedu001', 'chrgInstructorNm', data.chrgInstructorNm, 'text');
	gf_FormSetValue('saveFormPubedu001', 'indvdlEducost', data.indvdlEducost, 'text');
	gf_FormSetValue('saveFormPubedu001', 'episRetunamt', data.episRetunamt, 'text');
	gf_FormSetValue('saveFormPubedu001', 'cochrgedocumentIsuAt', data.cochrgedocumentIsuAt, 'chkbox');
	gf_FormSetValue('saveFormPubedu001', 'atchmnflNo', data.atchmnflNo, 'text');
	gf_FormSetValue('saveFormPubedu001', 'eduPurps', data.eduPurps, 'text');
	gf_FormSetValue('saveFormPubedu001', 'atchmnfl', data.atchmnflNo, 'text');
	dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'atchmnflNo')).setValue(data.atchmnflNo);
	$('#saveFormPubedu001 input[name="chrgInstructor"]').prop('disabled', true);
	$('#saveFormPubedu001 input[name="chrgInstructorNm"]').prop('disabled', true);
	dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'newCrseAt')).setValue('0');
	
	}
	
};
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var deptCode = gf_FormGetValue('searchFormPubedu001', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormPubedu001', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormPubedu001', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormPubedu001', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormPubedu001","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormPubedu001', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormPubedu001', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormPubedu001', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormPubedu001', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormPubedu001', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormPubedu001', 'korNm', 'text');
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
	 		gf_FormSetValue('searchFormPubedu001', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormPubedu001', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormPubedu001', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormPubedu001', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormPubedu001', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormPubedu001', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormPubedu001","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormPubedu001","empno","korNm", gBplcCode, "Y");
	  	}
  	}	
}


var fn_CallbackPopComp = function(data) {
	if(!gf_IsNull(data.earnerNo)) {
		var earnerSeCode = data.earnerSeCode;
		if(earnerSeCode == 100){
			gf_FormSetValue('saveFormPubedu001', 'chrgInstructor', data.bizrno, 'text');
			gf_FormSetValue('saveFormPubedu001', 'chrgInstructorNm', data.earnerNm, 'text');
			$('#saveFormPubedu001 input[name="chrgInstructor"]').prop('disabled', true);
			$('#saveFormPubedu001 input[name="chrgInstructorNm"]').prop('disabled', true);
		} else if((earnerSeCode == 200)){
			gf_DivMsgAlert('기타 소득자인 경우 성명을 입력해주세요.');
			var chrgInstructor = gf_FormGetValue('saveFormPubedu001', 'chrgInstructor', 'text');
			if(!gf_IsNull(chrgInstructor)){
//				// 체크된 값들은 가져온다.
				rowId = dhxGridPubedu001.getSelectedRowId();
				dhxGridPubedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridPubedu001, 'chrgInstructor')).setValue("");
				dhxGridPubedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridPubedu001, 'chrgInstructorNm')).setValue("");
				gf_FormSetValue('saveFormPubedu001', 'chrgInstructor', '', 'text');
				gf_FormSetValue('saveFormPubedu001', 'chrgInstructorNm', '', 'text');
			}
			$('#saveFormPubedu001 input[name="chrgInstructor"]').prop('disabled', true);
			$('#saveFormPubedu001 input[name="chrgInstructorNm"]').prop('disabled', false);
		}
	}
};

function fn_CallbackPopEmp1(data){
	gf_FormSetValue('saveFormPubedu001', 'chrgInstructorNm', data.korNm, 'text');
	$('#saveFormPubedu001 input[name="chrgInstructor"]').prop('disabled', true);
	$('#saveFormPubedu001 input[name="chrgInstructorNm"]').prop('disabled', true);
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
		gf_FormSetValue('saveFormPubedu001', 'atchmnfl', keyArr.join("|"), 'text');  //첨부파일 
	    gf_FormSetValue('saveFormPubedu001', 'atchmnflList', keyArr.join("|"), 'text');  //첨부파일 
		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
    callbacks.fire();
	}
};

var fn_SaveCopyPubedu001 = function(){
	
	var educourseCode = dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'educourseCode')).getValue();
	var elctsctSeSn = dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'elctsctSeSn')).getValue();
	var empno = dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'empno')).getValue();
	var edureqstSn = dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'edureqstSn')).getValue();
	var confmSeSn = dhxGridPubedu001.cells(dhxGridPubedu001.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridPubedu001,'confmSeSn')).getValue();
	var jsonParameter = {
			educourseCode : educourseCode,
			elctsctSeSn : elctsctSeSn,
			empno : empno,
			edureqstSn : edureqstSn,
			confmSeSn : confmSeSn
    	}
	
	var dataSource = gf_NoAsyncTransaction('pubedu001/saveCopyPubedu', jsonParameter, 'POST');

	if (dataSource.code === '000') {
		gf_DivMsgAlert(gf_LocaleTrans('default', 'mgsProcess')); // "정상처리 되었습니다
		cf_InitParamPubedu001();
		fn_SearchPubedu001();
	}
	
}

var fn_BugtAdd = function() {
	// 체크된 항목을 가져온다
	var rowIds = gf_GetCheckedGridRowIdArr(dhxGridPubedu001, 'chk');
        // 체크된 항목 반복문
		$(rowIds).each(function(index, rowId){
			// 선택된 값마다 해당 지급일자 Set 해준다.
			dhxGridPubedu001.cells(rowId, gf_GetDhxGridColumId(dhxGridPubedu001, 'confmSttusCode')).setValue("001");
			// Set이 된 이후 그리드 업데이트 실행 해준다.
			dhxDataProcessorPubedu001.setUpdated(rowId, true, 'updated');
		});
		dhxDataProcessorPubedu001.sendData();
}

