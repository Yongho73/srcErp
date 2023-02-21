/**
 *    프로그램       : 개인별급여기준등록 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.07
 *    사용테이블      : MPS_SLNRC_STMT
 * sourceGen version : 2020.06.29.01 (2020.07.07)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mpscal022 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mpscal022 = 0;  //그리드 위치 상태 
var save_All_Sta_Mpscal022 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mpscal022 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mpscal022 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mpscal022 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mpscal022 = 0;  //그리드 삭제 수량

var save_Row_Num_MpscalEmp = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_MpscalEmp = 0;  //그리드 위치 상태 
var save_All_Sta_MpscalEmp = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_MpscalEmp = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_MpscalEmp = 0;  //그리드 추가 수량 
var save_Edt_Cnt_MpscalEmp = 0;  //그리드 저장 수량 
var save_Del_Cnt_MpscalEmp = 0;  //그리드 삭제 수량 

/* 우측 상단 기본 정보*/
var g_MainSearchValue = new Object();
var g_NewFlag = "N"; //신규 입력중인지 구분하는 Flag 
var nowDate = "";

/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMpscal022();
    cf_SetComponentsMpscal022();
    cf_SetEventListenerMpscal022();
    cf_InitFormMpscal022();
    cf_SetBindingMpscal022();
    if(init()){   // 초기화
		init1();  // 일반달력 초기화
	}
});

function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
$('#saveFormMpscalEmp .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
	dateChk($(this));
});
//금일 조회
var today = new Date();
nowDate = dateFormat(today);
return(nowDate);
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

//일반달력
function init1(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"retireAnntySbscrbDe", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	dhxCCalendarDate1.hideTime();
	
	//금일 날짜표시 billIsuDe
	$('#retireAnntySbscrbDe').val(nowDate);
}

/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMpscal022 = function() {
    gf_SetMenuPath();
    $("#saveFormMpscal022").validate({ errorElement: 'div', ignore: '' });
    
    //사원구분
    gf_ComboCode('divInputFormComboEmplSeBox', 'emplSeNm', 'emplSeNm', 'sel', 'C068', '' , '', '', 'asc', '');
    //재직구분
    gf_ComboCode('divComboHffsSeBox', 'hffsSe', 'hffsSe', 'search', 'C278', '' , '', '', 'asc', '');
    //gf_MakeComboBasic('divComboHffsSeBox', 'hffsSe', 'hffsSe', 'search', 'C278', '' , '', '', 'asc', 'J01');
    //gf_MakeComboBasic('divComboHffsSeBox', 'hffsSe', 'search', '', 'mpscal022/searchMpscalEmp', '', 'hffsSe', 'hffsSe', 'J01');
//    if($("#searchFormMpscal022").val() != "J01"){
//    	// value 값으로 선택
//    	$("#searchFormMpscal022").val("J01").prop("selected", true); //재직구분 - 재직
//	}
    
    //재직구분
    gf_ComboCode('divSaveHffsSeBox', 'hffsSeNm', 'hffsSeNm', 'sel', 'C278', '' , '', '', 'asc', '');
    //임금피크제유형
    gf_ComboCode('salpeakAtSaveForm', 'salpeakAt', 'salpeakAt', 'sel', 'C124', '' , '', '', 'asc', '');
    // 유연근무제
    gf_ComboCode('flexbizAtSaveForm', 'flexbizAt', 'flexbizAt', 'sel', 'C070', '' , '', '', 'asc', '');
    // 육아휴직
    gf_ComboCode('babyShrtenWorkAtSaveForm', 'babyShrtenWorkAt', 'babyShrtenWorkAt', 'sel', 'C171', '' , '', '', 'asc', '');
    //직종
    gf_ComboCode('divInputFormComboJssfcCodeBox', 'JssfcCode', 'JssfcCode', 'sel', 'C197', '' , '', '', 'asc', '');
    //직무
    gf_ComboCode('divInputFormComboDtyCodeBox', 'dtyCodeNm', 'dtyCodeNm', 'sel', 'C103', '' , '', '', 'asc', '');
    //직책
    gf_MakeComboBasic('divInputFormComboMhsRspofcCodeBox', 'rspofcCode', 'sel', '', 'mhshrb001/searchMhshrb001RspofcCode', '', 'rspofcCode', 'rspofcNm', '');
    // 퇴직연금
    gf_ComboCode('retireSaveForm', 'retireAnntyKindCode', 'retireAnntyKindCode', 'sel', 'C086', '' , '', '', 'asc', '');
    // 급여지급형태
    gf_ComboCode('salaryAprpSaveForm', 'salaryAprpCode', 'salaryAprpCode', 'sel', 'C067', '' , '', '', 'asc', '');
    // 소득세원천징수세액
    gf_ComboCode('incmtaxrtSaveForm', 'incmtaxrtCode', 'incmtaxrtCode', 'sel', 'C366', '' , '', '', 'asc', '');
    // 은행 구분
    gf_ComboCode('retireAnntyBankCodeMpscal', 'retireAnntyBankCode', 'retireAnntyBankCode', 'sel', 'C010', '' , '', '', 'ordr', '','','');  
    
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode = userInfo.data.bplcCode;
    
    $("#deptCodeNm").focus();
    
};
var dhxGridMpscalEmp;
var dhxGridMpscal022;
var cf_SetComponentsMpscal022 = function() {
	var dhxGridMpscalEmpHeaderInfo = [];
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
	//dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMpscal022" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '*', 'center', 'str', 'ro', false, 'empno', '', '')); // 사원번호
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('성명', '150', 'center', 'str', 'ro', false, 'korNm', '', '')); // 이름
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('부서번호', '0', 'center', 'str', 'ro', true, 'deptCode', '')); // 부서번호
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('부서', '150', 'center', 'str', 'ro', false, 'deptCodeNm', '')); // 부서
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('재직', '0', 'center', 'str', 'ro', true, 'hffsSe', '')); // 재직
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('재직구분', '0', 'center', 'str', 'coro', true, 'hffsSeNm', '')); // 재직
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('사원구분', '0', 'center', 'str', 'ro', true, 'emplSe', '')); // 사원구분
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('사원구분', '0', 'center', 'str', 'coro', true, 'emplSeNm', '')); // 사원구분
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직책', '0', 'center', 'str', 'ro', true, 'rspofcCode', '')); // 직책
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직책이름', '0', 'center', 'str', 'coro', true, 'rspofcCodeNm', '')); // 직책
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직무', '0', 'center', 'str', 'coro', true, 'dtyCode', '')); // 직무
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('직무', '0', 'center', 'str', 'coro', true, 'dtyCodeNm', '')); // 직무
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('입사일', '0', 'center', 'str', 'ro', true, 'ecnyDe', '')); // 입사일
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('퇴사일자', '0', 'center', 'str', 'ro', true, 'retireDe', '')); // 퇴사일자
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('육아기간단축근무여부', '0', 'center', 'str', 'coro', true, 'babyShrtenWorkAt', '')); // 육아기간 단축근무 여부
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('임금피크제여부', '0', 'center', 'str', 'coro', true, 'salpeakAt', '')); // 임금피크제 여부
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('퇴직연금종류코드', '0', 'center', 'str', 'coro', true, 'retireAnntyKindCode', '')); // 퇴직연금종류코드
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('급여지급여부', '0', 'center', 'str', 'coro', true, 'salaryAprpCode', '')); // 급여지급여부
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('소득세율코드', '0', 'center', 'str', 'coro', true, 'incmtaxrtCode', '')); // 소득세율코드(80, 100,120)
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('유연근무제여부', '0', 'center', 'str', 'coro', true, 'flexbizAt', '')); // 유연근무제여부
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('퇴직연금가입일자', '0', 'center', 'str', 'ro', true, 'retireAnntySbscrbDe', '')); // 퇴직연금가입일자
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('퇴직연금예금명', '0', 'center', 'str', 'ro', true, 'retireAnntyDpstnm', '')); // 퇴직연금예금명
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('은행명', '0', 'center', 'str', 'coro', true, 'retireAnntyBankCode', '')); // 은행명
	dhxGridMpscalEmpHeaderInfo.push(gf_MakeDhxGridHeader('계좌번호', '0', 'center', 'str', 'ro', true, 'retireAnntyAcnutno', '')); // 계좌번호
    dhxGridMpscalEmp = gf_MakeDhxGrid('dataListMpscalEmp', dhxGridMpscalEmpHeaderInfo, true, false, false);
    dhxGridMpscalEmp.enableAutoWidth(false);
    dhxGridMpscalEmp.setEditable(true);
    dhxGridMpscalEmp.setColumnMinWidth(100,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    // 퇴직연금종류
    var retireAnntyKindCodejsonParameter = {codekindCode : "C086",exceptCode :"",sortOrder :"asc" };
    var retireAnntyKindCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', retireAnntyKindCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscalEmp, dhxGridMpscalEmp.getColIndexById("retireAnntyKindCode"), retireAnntyKindCodedataSource.data, "sel");
    // 급여지급
    var salaryAprpCodejsonParameter = {codekindCode : "C067",exceptCode :"",sortOrder :"asc" };
    var salaryAprpCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', salaryAprpCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscalEmp, dhxGridMpscalEmp.getColIndexById("salaryAprpCode"), salaryAprpCodedataSource.data, "sel");
    // 소득세원천징수세액
    var incmtaxrtCodejsonParameter = {codekindCode : "C366",exceptCode :"",sortOrder :"asc" };
    var incmtaxrtCodedataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', incmtaxrtCodejsonParameter, '');
    gf_ComboDataSet(dhxGridMpscalEmp, dhxGridMpscalEmp.getColIndexById("incmtaxrtCode"), incmtaxrtCodedataSource.data, "sel");
    //은행구분
    var bankjsonParameter = {codekindCode : "C010",exceptCode :"",sortOrder :"asc" };
    var bankdataSource = gf_NoAsyncTransaction('cmmnCode/getCmmnCode', bankjsonParameter, '');
    gf_ComboDataSet(dhxGridMpscalEmp, dhxGridMpscalEmp.getColIndexById("retireAnntyBankCode"), bankdataSource.data, "sel");
    
	
    var dhxGridMpscal022HeaderInfo = [];
    dhxGridMpscal022HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로
    dhxGridMpscal022HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '0', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titNpnLabrrAmt') */
    dhxGridMpscal022HeaderInfo.push(gf_MakeDhxGridHeader('국민연금 근로자 금액', '*', 'right', 'int', 'edn', false, 'npnLabrrAmt', '', '')); /* gf_LocaleTrans('default', 'titNpnLabrrAmt') */
    dhxGridMpscal022HeaderInfo.push(gf_MakeDhxGridHeader('건강 근로자 금액', '350', 'right', 'int', 'edn', false, 'healthLabrrAmt', '', '')); /* gf_LocaleTrans('default', 'titHealthLabrrAmt') */
    dhxGridMpscal022HeaderInfo.push(gf_MakeDhxGridHeader('고용 근로자 금액', '350', 'right', 'int', 'edn', false, 'laborLabrrAmt', '', '')); /* gf_LocaleTrans('default', 'titLaborLabrrAmt') */
    dhxGridMpscal022 = gf_MakeDhxGrid('dataListMpscal022', dhxGridMpscal022HeaderInfo, true, false, false);
    dhxGridMpscal022.enableAutoWidth(false);
    dhxGridMpscal022.setEditable(true);

    dhxGridMpscal022.setColumnMinWidth(350,2); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
    
    // 그리드 폼에 컬럼값들 숫자  
    dhxGridMpscal022.setNumberFormat("0,000", dhxGridMpscal022.getColIndexById("npnLabrrAmt"), ".", ",");
    dhxGridMpscal022.setNumberFormat("0,000", dhxGridMpscal022.getColIndexById("healthLabrrAmt"), ".", ",");
    dhxGridMpscal022.setNumberFormat("0,000", dhxGridMpscal022.getColIndexById("laborLabrrAmt"), ".", ",");
    dhxGridMpscal022.enableEditEvents(true, false, false); // 원클릭, 더블클릭, F2key
    
    //TAB BAR 선언
    tabbarMpscal022 = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
    	    {id:"a1",  text: "사회보험" },     //기본
            {id:"a2",  text: gf_LocaleTrans('default', 'titFamily')},	  //가족 
            {id:"a3",  text: gf_LocaleTrans('default', 'titAcnutNo')},    //계좌정보
            {id:"a4",  text: gf_LocaleTrans('default', 'titMhsCrqfs')},   //자격면허
            {id:"a5",  text: "지급/공제"},                                   //지급/공제
        ]
    });
   
    tabbarMpscal022.tabs("a1").attachObject("tab1");
    tabbarMpscal022.tabs("a2").attachObject("tab2");
    tabbarMpscal022.tabs("a3").attachObject("tab3");
    tabbarMpscal022.tabs("a4").attachObject("tab4");
    tabbarMpscal022.tabs("a5").attachObject("tab5");
    
    tabbarMpscal022.attachEvent("onSelect", function(id, lastId){
    	//alert(empno);
    	if(id=="a2") tabbarMpscal022.tabs("a2").attachURL("/xerp/mpscal022/searchMpsFamily/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a3") tabbarMpscal022.tabs("a3").attachURL("/xerp/mpscal022/searchMpsAcnut/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a4") tabbarMpscal022.tabs("a4").attachURL("/xerp/mpscal022/searchMpsCrqfs/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a5") tabbarMpscal022.tabs("a5").attachURL("/xerp/mpscal022/searchMpsStdr/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	return true;
    });
    tabbarMpscal022.tabs("a1").setActive();
};

var eventIdMpscal022 = [];
var cf_SetEventListenerMpscal022 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMpscal022 = gf_GridDetachEvent(dhxGridMpscal022, eventIdMpscal022);
    eventId = dhxGridMpscal022.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMpscal022();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMpscal022.getColumnsNum();
            var rowNum = dhxGridMpscal022.getRowsNum();
            var selectedId = dhxGridMpscal022.getSelectedRowId();
            var ind        = dhxGridMpscal022.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal022.getRowIndex(selectedId);
            var type       = dhxGridMpscal022.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMpscal022.selectRow(0);
                    //fn_FindMpscal022();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMpscal022.selectRow(rowIndex + 1);
                    fn_FindMpscal022();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMpscal022.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal022.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMpscal022.getSelectedRowId();
            var ind        = dhxGridMpscal022.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal022.getRowIndex(selectedId);
            var type       = dhxGridMpscal022.getColType(ind);
            dhxGridMpscal022.selectCell(rowIndex+1, ind);
            fn_FindMpscal022();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal022.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMpscal022.getSelectedRowId();
            var ind        = dhxGridMpscal022.getSelectedCellIndex();
            var rowIndex   = dhxGridMpscal022.getRowIndex(selectedId);
            var type       = dhxGridMpscal022.getColType(ind);
            dhxGridMpscalEmp.selectCell(rowIndex-1, ind);
            fn_FindMpscalEmp();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMpscal022.editCell();
            }
        }
        else return true;
    });
    eventIdMpscal022.push(eventId);
    eventId = dhxGridMpscal022.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mpscal022SortGridList(ind, type, direction); 
    });
    eventIdMpscal022.push(eventId);
    eventId = dhxGridMpscal022.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMpscal022.push(eventId);
    eventId = dhxGridMpscalEmp.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMpscalEmp();
        fn_RowSelectMhsEmp(id, ind);
    });
    eventIdMpscal022.push(eventId);
    eventId = dhxGridMpscal022.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdMpscal022.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMpscal022').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMpscal022()
    });
    $('#btnSaveMpscal022').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMpscal022();
    });
    $('#btnSaveMpscalEmp').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        var retireAnntyAcnutno = dhxGridMpscalEmp.cells(dhxGridMpscalEmp.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalEmp,'retireAnntyAcnutno')).getValue();
        var retireAnntyBankCode = dhxGridMpscalEmp.cells(dhxGridMpscalEmp.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalEmp,'retireAnntyBankCode')).getValue();
        var retireAnntyDpstnm = dhxGridMpscalEmp.cells(dhxGridMpscalEmp.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridMpscalEmp,'retireAnntyDpstnm')).getValue();
        
        if((!gf_IsNull(retireAnntyDpstnm)) && (gf_IsNull(retireAnntyBankCode)) && (gf_IsNull(retireAnntyAcnutno))){
        	gf_DivMsgAlert("은행을 선택해주세요.");
        	return false;
        }else if((!gf_IsNull(retireAnntyDpstnm)) && (!gf_IsNull(retireAnntyBankCode)) && (gf_IsNull(retireAnntyAcnutno))){
        	gf_DivMsgAlert("계좌번호를 입력해주세요.");
    	return false;
    	}else if((gf_IsNull(retireAnntyDpstnm)) && (!gf_IsNull(retireAnntyBankCode)) && (gf_IsNull(retireAnntyAcnutno))){
        	gf_DivMsgAlert("예금자 명을 입력해주세요.");
    	return false;
    	}else if((!gf_IsNull(retireAnntyDpstnm)) && (!gf_IsNull(retireAnntyBankCode)) && (gf_IsNull(retireAnntyAcnutno))){
        	gf_DivMsgAlert("계좌번호를 입력해주세요.");
        	return false;
        }else if((gf_IsNull(retireAnntyDpstnm)) && (gf_IsNull(retireAnntyBankCode)) && (!gf_IsNull(retireAnntyAcnutno))){
        	gf_DivMsgAlert("예금자 명을 입력해주세요.");
        	return false;
        }else if((!gf_IsNull(retireAnntyDpstnm)) && (gf_IsNull(retireAnntyBankCode)) && (!gf_IsNull(retireAnntyAcnutno))){
        	gf_DivMsgAlert("은행을 선택해주세요.");
        	return false;
        }else{
        	fn_SaveMpscalEmp();
        }
    });
    $('#btnRemoveMpscal022').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMpscal022();
    });
    $('#btnExcelMpscal022').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMpscal022();
    });
    $('#btnSearchMpscal022').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMpscal022();
    });
    $('#btnResetMpscal022').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMpscal022();
        fn_SearchMpscal022();
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMpscalEmp select[name="retireAnntyKindCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpscalEmp, dhxDataProcessorMpscalEmp, 'retireAnntyKindCode', $(this).val());
    });
    $('#saveFormMpscalEmp select[name="salaryAprpCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpscalEmp, dhxDataProcessorMpscalEmp, 'salaryAprpCode', $(this).val());
    });
    $('#saveFormMpscalEmp select[name="incmtaxrtCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpscalEmp, dhxDataProcessorMpscalEmp, 'incmtaxrtCode', $(this).val());
    });
    $('#saveFormMpscalEmp select[name="retireAnntyBankCode"]').unbind('click blur').bind('click blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpscalEmp, dhxDataProcessorMpscalEmp, 'retireAnntyBankCode', $(this).val());
    });
    $('#saveFormMpscalEmp input[name="retireAnntyAcnutno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpscalEmp, dhxDataProcessorMpscalEmp, 'retireAnntyAcnutno', $(this).val());
    });
    $('#saveFormMpscalEmp input[name="retireAnntyDpstnm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpscalEmp, dhxDataProcessorMpscalEmp, 'retireAnntyDpstnm', $(this).val());
    });
    $('#saveFormMpscalEmp input[name="retireAnntySbscrbDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMpscalEmp, dhxDataProcessorMpscalEmp, 'retireAnntySbscrbDe', $(this).val());
    });
    
    // 기타 이벤트 ========================================================================================== 
    $('#checkAllMpscal022').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMpscal022, $('#checkAllMpscal022').prop('checked'), 'chk');
    });
    $('#searchFormMpscal022 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
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
        		$('#btnSearchMpscal022').click(); event.preventDefault(); return true;
        	} 
        } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true;
    }); 
    $('#saveFormMpscal022').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //사원 선택 Popup
    $('#searchFormMpscal022 #btnempnoSearchSearchFormMpscal022').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMpscal022","empno","korNm", '1000', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
    });
    
    //부서 선택 Popup
	$('#searchFormMpscal022 #btnDeptCodeSearchSearchFormMpscal022').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMpscal022","deptCode","deptCodeNm", "", "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal022', 'korNm', '', 'text');
	    }
    });
	$('#korNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchEmpCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal022', 'empno', '', 'text');
	    }
    });
	
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal022', 'deptCodeNm', '', 'text');
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpDeptCode();
	    } else if (event.keyCode != 13 && event.keyCode != 9) {
	    	gf_FormSetValue('searchFormMpscal022', 'deptCode', '', 'text');
	    }
    });
    
};

var cf_InitFormMpscal022 = function() {
    $('#searchFormMpscal022').resetForm();
    //1번 탭 선택 및 초기화
    tabbarMpscal022.tabs("a1").setActive();
    gf_FormSetValue('searchFormMpscal022', 'hffsSe','J01', 'combo') //재직구분을 첫 화면 표시할때 '재직'으로 기본 설정
};

var cf_SetBindingMpscal022 = function() {
    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMpscal022();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
var fn_SearchMpscal022 = function(userId) {
	var deptCode = gf_FormGetValue('searchFormMpscal022', 'deptCode', 'text');
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscal022', 'empno', 'text'),
        hffsSe : gf_FormGetValue('searchFormMpscal022', 'hffsSe', 'combo'), //재직구분
        deptCode : deptCode
    };
    gf_Transaction(userId, 'mpscal022/searchMpscalEmp', jsonParameter, 'fn_CallbackSearchMpscalEmp', false, 'GET');
};

var fn_CallbackSearchMpscalEmp = function(strSvcID, targetID, data) {
	dhxGridMpscalEmp.clearAll();
    fn_DhxDataProcessorMpscalEmp(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscalEmp');
        dhxGridMpscalEmp.parse(data.data.records, 'js');
        
        dhxGridMpscalEmp.selectCell(0,1);
        fn_RowSelectMhsEmp(1, 1);
        //1번 탭 선택 및 초기화
        tabbarMpscal022.tabs("a1").setActive();
        
        if(save_Row_Num_MpscalEmp == 0 && save_All_Sta_MpscalEmp == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscalEmp.selectRow(0); 
        } else if(save_Row_Sta_MpscalEmp == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
        	dhxGridMpscalEmp.selectRow(0);
        } else if(save_All_Sta_MpscalEmp == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
        	dhxGridMpscalEmp.selectRow(save_Row_Num_MpscalEmp); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
        	dhxGridMpscalEmp.selectRow(save_Row_Num_MpscalEmp);   //개발자 수정 필요  
            //var findCell = dhxGridMpscal022.findCell(save_Row_Ids_Mpscal022, gf_GetDhxGridColumId(dhxGridMpscal022,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscal022.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscal022.selectRow(0);
            //} 
        } 
        fn_FindMpscalEmp();
    } else {
        gf_NoFoundDataOnGridMsg('dataListMpscalEmp');
        fn_InitInputFormMpscal022();
    }
    $("#spanCntSearchFormMpscal022").text(data.data.records.length);
    cf_SetEventListenerMpscal022();
};
var dhxDataProcessorMpscalEmp;
var fn_DhxDataProcessorMpscalEmp = function() {
    // 그리드입력 데이터프로세스 정의
	dhxDataProcessorMpscalEmp = new dataProcessor(gv_ContextPath+'/mpscal022/modifyMhsEmp'); //lock feed url
    dhxDataProcessorMpscalEmp.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscalEmp.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscalEmp.init(dhxGridMpscalEmp); //link dataprocessor to the grid
    dhxDataProcessorMpscalEmp.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscalEmp.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscalEmp.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscal022();
                    $("#checkAllMpscalEmp").prop('checked', false); //상단 체크박스 해제
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
var fn_FindMpscalEmp = function() {
    var rId = dhxGridMpscalEmp.getSelectedRowId();
    var status = dhxDataProcessorMpscalEmp.getState(rId);

    // 사원정보 
    gf_FormSetValue("saveFormMpscal022", "empno", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMpscal022", "korNm", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'korNm',  'grid'), '');
    gf_FormSetValue("saveFormMpscal022", "deptCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'deptCode',  'grid'), '');
    gf_FormSetValue("saveFormMpscal022", "deptCodeNm", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'deptCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormMpscal022", "hffsSeNm", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'hffsSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscal022", "emplSeNm", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'emplSe',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscal022", "dtyCodeNm", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'dtyCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscal022", "rspofcCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'rspofcCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscal022", "ecnyDe", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'ecnyDe',  'grid'), '');
    gf_FormSetValue("saveFormMpscal022", "retireDe", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'retireDe',  'grid'), '');
    gf_FormSetValue("saveFormMpscal022", "babyShrtenWorkAt", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'babyShrtenWorkAt',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscal022", "flexbizAt", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'flexbizAt',  'grid'), 'combo');
    
    // 급여정보 
    gf_FormSetValue("saveFormMpscalEmp", "salaryAprpCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'salaryAprpCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscalEmp", "retireAnntyKindCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'retireAnntyKindCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscalEmp", "incmtaxrtCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'incmtaxrtCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscalEmp", "retireAnntyBankCode", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'retireAnntyBankCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMpscalEmp", "retireAnntySbscrbDe", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'retireAnntySbscrbDe',  'grid'), '');
    gf_FormSetValue("saveFormMpscalEmp", "retireAnntyDpstnm", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'retireAnntyDpstnm',  'grid'), '');
    gf_FormSetValue("saveFormMpscalEmp", "retireAnntyAcnutno", gf_DhxGetValue(dhxGridMpscalEmp, rId, 'retireAnntyAcnutno',  'grid'), '');
    
    var empno = gf_FormGetValue('saveFormMpscal022', 'empno', 'text');
    var deptCode = gf_FormGetValue('searchFormMpscal022', 'deptCode', 'text');
	    
    if(!gf_IsNull(empno)){
    	var jsonParameter = {
    			empno : empno,
    	        hffsSe : gf_FormGetValue('searchFormMpscal022', 'hffsSe', 'combo'), //재직구분
    	        deptCode : deptCode
                //itemSn : gf_FormGetValue('searchFormMtxevdDetail001', 'itemSn', 'text')
            };
            gf_Transaction('', 'mpscal022/searchMpscal022', jsonParameter, 'fn_CallbackSearchMpscal022', false, 'GET');
        }
    
    if(status == 'inserted') {
        $('#saveFormMpscal022 input[name="empno"]').prop('disabled', false);
    } else {
        $('#saveFormMpscal022 input[name="empno"]').prop('disabled', true);
    }

    fn_FormDisabled(true);
};
var dhxDataProcessorMpscal022;
var fn_CallbackSearchMpscal022 = function(strSvcID, targetID, data) {
    dhxGridMpscal022.clearAll();
    fn_DhxDataProcessorMpscal022(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListMpscal022');
        dhxGridMpscal022.parse(data.data.records, 'js');
        dhxGridMpscal022.selectRow(0);
        if(save_Row_Num_Mpscal022 == 0 && save_All_Sta_Mpscal022 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridMpscal022.selectRow(0); 
        } else if(save_Row_Sta_Mpscal022 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridMpscal022.selectRow(0);
        } else if(save_All_Sta_Mpscal022 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridMpscal022.selectRow(save_Row_Num_Mpscal022); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridMpscal022.selectRow(save_Row_Num_Mpscal022);   //개발자 수정 필요  
            //var findCell = dhxGridMpscal022.findCell(save_Row_Ids_Mpscal022, gf_GetDhxGridColumId(dhxGridMpscal022,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridMpscal022.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridMpscal022.selectRow(0);
            //} 
        } 
    }else{
    	gf_NoFoundDataOnGridMsg('dataListMpscal022');
    }
    $("#spanCntSearchFormMpscalEmp").text(data.data.records.length);
};
var fn_DhxDataProcessorMpscal022 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMpscal022 = new dataProcessor(gv_ContextPath+'/mpscal022/saveMpscal022'); //lock feed url
    dhxDataProcessorMpscal022.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMpscal022.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMpscal022.init(dhxGridMpscal022); //link dataprocessor to the grid
    dhxDataProcessorMpscal022.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMpscal022.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMpscal022.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMpscal022();
                    $("#checkAllMpscal022").prop('checked', false); //상단 체크박스 해제
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
var fn_InitInputFormMpscal022 = function() {
    $('#saveFormMpscal022 input[name="empno"]').prop('disabled', false);
    $('#saveFormMpscal022').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
    $('#saveFormMpscal022 *').prop('disabled', status);
};
/**
 * 추가(신규) 
 */
var fn_AddMpscal022 = function() {
    dhxGridMpscal022.clearSelection();
    //fn_InitInputFormMpscal022();
    var empno = gf_FormGetValue('saveFormMpscal022', 'empno', 'text');
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(empno); //checkbox
    initValueArr.push('0'); //sttemntDe
    initValueArr.push('0'); //empno
    initValueArr.push('0'); //npnAcqsDe
    initValueArr.push(''); //hlthinsAcqsDe
    initValueArr.push(''); //episAcqsDe
    initValueArr.push(''); //npnAt
    initValueArr.push(''); //hlthinsAt
    initValueArr.push(''); //episAt
    initValueArr.push(''); //iaciAt
    initValueArr.push(''); //processAt
    initValueArr.push(''); //marmNpnAmt
    initValueArr.push(''); //npnLabrrAmt
    initValueArr.push(''); //npnBprprrAmt
    initValueArr.push(''); //marmHisrAmt
    initValueArr.push(''); //healthLabrrAmt
    initValueArr.push(''); //healthBprprrAmt
    initValueArr.push(''); //rcperLabrrAmt
    initValueArr.push(''); //rcperBprprrAmt
    initValueArr.push(''); //marmEpisAmt
    initValueArr.push(''); //laborLabrrAmt
    initValueArr.push(''); //laborBprprrAmt
    initValueArr.push(''); //laborStableAmt
    initValueArr.push(''); //iaciBprprrAmt
    initValueArr.push(''); //mnthlyAmtBeyearAmt
    initValueArr.push(''); //mnthlyAmtMt
    initValueArr.push(''); //ltciRdcxptAt
    initValueArr.push(''); //npnPostpneAt
    initValueArr.push(''); //hlthinsPostpneAt
    initValueArr.push(''); //episPostpneAt
    initValueArr.push(''); //iaciPostpneAt
    initValueArr.push(''); //unpaidRecknDe
    initValueArr.push(''); //payReDe
    initValueArr.push(''); //mtincomeAmt
    initValueArr.push(''); //mondeclResnCn
    initValueArr.push(''); //postpneResnCn
    initValueArr.push(''); //postpneSdt
    initValueArr.push(''); //postpneEdt
    initValueArr.push(''); //postpneTrmnatde
    initValueArr.push(''); //bfchgCn
    initValueArr.push(''); //afchgCn
    initValueArr.push(''); //insrncCancelNo
    initValueArr.push(''); //paypostpneSeCode
    initValueArr.push(''); //changeSeCode
    initValueArr.push(''); //changeInsrncCode
    dhxGridMpscal022.addRow(dhxGridMpscal022.uid(), initValueArr, 0);
    dhxGridMpscal022.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMpscal022');
    $('#btnPopEmpSearchMpscal022').show();
    //fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mpscal022SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMpscal022, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMpscal022', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMpscal022', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMpscal022, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMpscal022.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMpscal022', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMpscal022', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal022, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMpscal022.setSortImgState(false); 
            gf_FormSetValue('searchFormMpscal022', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMpscal022', 'sortColumId', '', 'text'); 
            dhxGridMpscal022.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMpscal022.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMpscal022', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMpscal022', 'sortColumId', gf_GetDhxGridColum(dhxGridMpscal022, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscalEmp = function() {
    var edCnt = 0;
    save_Add_Cnt_MpscalEmp = 0; 
    save_Edt_Cnt_MpscalEmp = 0; 
    save_Del_Cnt_MpscalEmp = 0; 
    dhxGridMpscalEmp.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscalEmp.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscalEmp.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_MpscalEmp += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_MpscalEmp += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_MpscalEmp += 1; 
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
        save_All_Sta_MpscalEmp = 0; 
        if(save_Add_Cnt_MpscalEmp > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_MpscalEmp + "건";
            save_All_Sta_MpscalEmp = 1; 
        } 
        if(save_Edt_Cnt_MpscalEmp > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_MpscalEmp + "건"; 
        } 
        if(save_Del_Cnt_MpscalEmp > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_MpscalEmp + "건"; 
            save_All_Sta_MpscalEmp = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscalEmp(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscalEmp(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscalEmp = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscalEmp_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscalEmp_Send = function() {
	if($('#saveFormMpscalEmp').validate().form()){
        var jsonParameter = {
        	empno : gf_FormGetValue('saveFormMpscal022', 'empno', 'text'),
        	retireAnntyKindCode : gf_FormGetValue('saveFormMpscalEmp', 'retireAnntyKindCode', 'combo'),
        	salaryAprpCode : gf_FormGetValue('saveFormMpscalEmp', 'salaryAprpCode', 'combo'),
        	incmtaxrtCode : gf_FormGetValue('saveFormMpscalEmp', 'incmtaxrtCode', 'combo'),
        	retireAnntySbscrbDe : gf_FormGetValue('saveFormMpscalEmp', 'retireAnntySbscrbDe', 'text'),
        	retireAnntyDpstnm : gf_FormGetValue('saveFormMpscalEmp', 'retireAnntyDpstnm', 'text'),
        	retireAnntyBankCode : gf_FormGetValue('saveFormMpscalEmp', 'retireAnntyBankCode', 'combo'),
        	retireAnntyAcnutno : gf_FormGetValue('saveFormMpscalEmp', 'retireAnntyAcnutno', 'text')
        	
        };
        gf_Transaction('', 'mpscal022/modifyMhsEmp', jsonParameter, 'fn_CallbackSaveMpscal022', false, 'POST');
	}
}
var fn_CallbackSaveMpscal022 = function(strSvcID, targetID, data) {
    if(data.code === '000') {
    	gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
    	fn_FindMpscalEmp();
    } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
    }
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMpscal022 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mpscal022 = 0; 
    save_Edt_Cnt_Mpscal022 = 0; 
    save_Del_Cnt_Mpscal022 = 0; 
    dhxGridMpscal022.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMpscal022.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMpscal022.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mpscal022 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mpscal022 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mpscal022 += 1; 
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
        save_All_Sta_Mpscal022 = 0; 
        if(save_Add_Cnt_Mpscal022 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mpscal022 + "건";
            save_All_Sta_Mpscal022 = 1; 
        } 
        if(save_Edt_Cnt_Mpscal022 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mpscal022 + "건"; 
        } 
        if(save_Del_Cnt_Mpscal022 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mpscal022 + "건"; 
            save_All_Sta_Mpscal022 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMpscal022(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMpscal022(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMpscal022 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMpscal022_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMpscal022_Send = function() {
    if(fn_GridValidation(dhxGridMpscal022, dhxDataProcessorMpscal022)) {
        dhxDataProcessorMpscal022.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMpscal022 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMpscal022, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMpscal022.forEachRow(function(rowId) {
            state = dhxDataProcessorMpscal022.getState(rowId);
            if(dhxGridMpscal022.cells(rowId, gf_GetDhxGridColumId(dhxGridMpscal022, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMpscal022.getRowIndex(rowId);
                    dhxGridMpscal022.deleteRow(rowId);
                    dhxGridMpscal022.selectRow(rowNum);
                    fn_FindMpscal022();
                }
                else dhxDataProcessorMpscal022.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMpscal022 = function () {
    var titMpscal022 = '개인별급여기준등록'; /* gf_LocaleTrans('default', 'titMpscal022') */
    var jsonParameter = {
        empno : gf_FormGetValue('searchFormMpscal022', 'empno', 'text')
    };
    var header = [[
        '신고일자' /* gf_LocaleTrans('default', 'titSttemntDe') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '국민연금취득일자' /* gf_LocaleTrans('default', 'titNpnAcqsDe') */,
        '건강보험취득일자' /* gf_LocaleTrans('default', 'titHlthinsAcqsDe') */,
        '고용보험 취득 일자' /* gf_LocaleTrans('default', 'titEpisAcqsDe') */,
        '국민연금 여부' /* gf_LocaleTrans('default', 'titNpnAt') */,
        '건강보험 여부' /* gf_LocaleTrans('default', 'titHlthinsAt') */,
        '고용보험 여부' /* gf_LocaleTrans('default', 'titEpisAt') */,
        '산재보험 여부' /* gf_LocaleTrans('default', 'titIaciAt') */,
        '처리 여부' /* gf_LocaleTrans('default', 'titProcessAt') */,
        '보수월액국민연금 금액' /* gf_LocaleTrans('default', 'titMarmNpnAmt') */,
        '국민연금 근로자 금액' /* gf_LocaleTrans('default', 'titNpnLabrrAmt') */,
        '국민연금 사업주 금액' /* gf_LocaleTrans('default', 'titNpnBprprrAmt') */,
        '보수월액건강보험 금액' /* gf_LocaleTrans('default', 'titMarmHisrAmt') */,
        '건강 근로자 금액' /* gf_LocaleTrans('default', 'titHealthLabrrAmt') */,
        '건강 사업주 금액' /* gf_LocaleTrans('default', 'titHealthBprprrAmt') */,
        '요양 근로자 금액' /* gf_LocaleTrans('default', 'titRcperLabrrAmt') */,
        '요양 사업주 금액' /* gf_LocaleTrans('default', 'titRcperBprprrAmt') */,
        '보수월액고용보험 금액' /* gf_LocaleTrans('default', 'titMarmEpisAmt') */,
        '고용 근로자 금액' /* gf_LocaleTrans('default', 'titLaborLabrrAmt') */,
        '고용 사업주 금액' /* gf_LocaleTrans('default', 'titLaborBprprrAmt') */,
        '고용 안정 금액' /* gf_LocaleTrans('default', 'titLaborStableAmt') */,
        '산재보험 사업주 금액' /* gf_LocaleTrans('default', 'titIaciBprprrAmt') */,
        '보수월액 전년도 금액' /* gf_LocaleTrans('default', 'titMnthlyAmtBeyearAmt') */,
        '보수월액 월' /* gf_LocaleTrans('default', 'titMnthlyAmtMt') */,
        '장기요양보험감면 여부' /* gf_LocaleTrans('default', 'titLtciRdcxptAt') */,
        '국민연금 유예 여부' /* gf_LocaleTrans('default', 'titNpnPostpneAt') */,
        '건강보험 유예 여부' /* gf_LocaleTrans('default', 'titHlthinsPostpneAt') */,
        '고용보험 유예 여부' /* gf_LocaleTrans('default', 'titEpisPostpneAt') */,
        '산재보험 유예 여부' /* gf_LocaleTrans('default', 'titIaciPostpneAt') */,
        '무급 기산 일자' /* gf_LocaleTrans('default', 'titUnpaidRecknDe') */,
        '납부 재개 일자' /* gf_LocaleTrans('default', 'titPayReDe') */,
        '월소득 금액' /* gf_LocaleTrans('default', 'titMtincomeAmt') */,
        '미신고 사유 내용' /* gf_LocaleTrans('default', 'titMondeclResnCn') */,
        '유예 사유 내용' /* gf_LocaleTrans('default', 'titPostpneResnCn') */,
        '유예 시작일자' /* gf_LocaleTrans('default', 'titPostpneSdt') */,
        '유예 종료일자' /* gf_LocaleTrans('default', 'titPostpneEdt') */,
        '유예 해지일자' /* gf_LocaleTrans('default', 'titPostpneTrmnatde') */,
        '변경전 내용' /* gf_LocaleTrans('default', 'titBfchgCn') */,
        '변경후 내용' /* gf_LocaleTrans('default', 'titAfchgCn') */,
        '보험 취소 번호' /* gf_LocaleTrans('default', 'titInsrncCancelNo') */,
        '납부유예 구분 코드' /* gf_LocaleTrans('default', 'titPaypostpneSeCode') */,
        '변경 구분 코드' /* gf_LocaleTrans('default', 'titChangeSeCode') */,
        '변경 보험 코드' /* gf_LocaleTrans('default', 'titChangeInsrncCode') */
    ]];
    var dataId = [[ 'sttemntDe', 'empno', 'npnAcqsDe', 'hlthinsAcqsDe', 'episAcqsDe', 'npnAt', 'hlthinsAt', 'episAt', 'iaciAt', 'processAt', 'marmNpnAmt', 'npnLabrrAmt', 'npnBprprrAmt', 'marmHisrAmt', 'healthLabrrAmt', 'healthBprprrAmt', 'rcperLabrrAmt', 'rcperBprprrAmt', 'marmEpisAmt', 'laborLabrrAmt', 'laborBprprrAmt', 'laborStableAmt', 'iaciBprprrAmt', 'mnthlyAmtBeyearAmt', 'mnthlyAmtMt', 'ltciRdcxptAt', 'npnPostpneAt', 'hlthinsPostpneAt', 'episPostpneAt', 'iaciPostpneAt', 'unpaidRecknDe', 'payReDe', 'mtincomeAmt', 'mondeclResnCn', 'postpneResnCn', 'postpneSdt', 'postpneEdt', 'postpneTrmnatde', 'bfchgCn', 'afchgCn', 'insrncCancelNo', 'paypostpneSeCode', 'changeSeCode', 'changeInsrncCode' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpscal022 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpscal022;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mpscal022/excelMpscal022', jsonParameter);
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
    $('#saveFormMpscal022 #empnoSaveFormMpscal022').parent().append(
    '<div class="error" id="empnoSaveFormMpscal022-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMpscal022 = function(empno){
    if(!gf_IsNull(empno)) {
        var jsonParameter = {
            empno : empno
        };
        var dataSource = gf_NoAsyncTransaction('mpscal022/findMpscal022', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.empno)) {
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
    var state = dhxDataProcessorMpscal022.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMpscal022').validate().form()){
                if(state == 'inserted') {
                    var empno = gf_FormGetValue('saveFormMpscal022', 'empno', 'text');
                    if(fn_CheckDupMpscal022(empno)) return true;
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
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mpscal022 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mpscal022 == 'deleted') {
        save_Row_Num_Mpscal022 = 0;
        save_Row_Ids_Mpscal022 = "";
    } else if(save_Row_Sta_Mpscal022 == 'inserted') {
        save_Row_Num_Mpscal022 = rowNum;
        save_Row_Ids_Mpscal022 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mpscal022 = rowNum;
        save_Row_Ids_Mpscal022 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'npnLabrrAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'npnLabrrAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'healthLabrrAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'healthLabrrAmt');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'laborLabrrAmt', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'laborLabrrAmt');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkEmpno = gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid');
                    if(!gf_IsNull(checkEmpno)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var empno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'empno', 'grid');
                            if(((empno == checkEmpno)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMpscal022( checkEmpno )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
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
        dhxGridMpscal022.selectRowById(validFalseFistRowId);
        fn_FindMpscalEmp();
        //fn_SearchMpscal022();
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
	var deptCode = gf_FormGetValue('searchFormMpscal022', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMpscal022', 'deptCodeNm', 'text');
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
 		gf_FormSetValue('searchFormMpscal022', 'deptCode', data.deptCode, 'text');   		
 		gf_FormSetValue('searchFormMpscal022', 'deptCodeNm', data.deptKorNm, 'text');
 		//setDateFormat("%Y-%m-%d","%Y%m%d")
  } 
  else {
  	//Popup 호출
  	gf_DeptPopup("searchFormMpscal022","deptCode","deptCodeNm", gBplcCode, "Y", null);
  }
}

function fn_CallbackPopEmp(data){
	gf_FormSetValue('searchFormMpscal022', 'korNm', data.korNm, 'text');
	gf_FormSetValue('searchFormMpscal022', 'empno', data.empno, 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchEmpCode(gubun){
	var empno = "";
	var korNm = "";
	
	if(gubun == "1"){
		empno = gf_FormGetValue('searchFormMpscal022', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal022', 'korNm', 'text');
	}
	else {
		empno = gf_FormGetValue('searchFormMpscal022', 'empno', 'text');
		korNm = gf_FormGetValue('searchFormMpscal022', 'korNm', 'text');
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
	 		gf_FormSetValue('searchFormMpscal022', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal022', 'korNm', data.korNm, 'text');
	  	}
	  	else {
	  		gf_FormSetValue('searchFormMpscal022', 'empno', data.empno, 'text');
	 		gf_FormSetValue('searchFormMpscal022', 'korNm', data.korNm, 'text');
	 		gf_FormSetValue('searchFormMpscal022', 'deptCodeNm', data.deptCodeNm, 'text');
	 		gf_FormSetValue('searchFormMpscal022', 'deptCode', data.deptCode, 'text');
	  	}
 	}
  	else {
	  	//Popup 호출
	  	if(strSvcID == "1"){
	  		gf_EmpPopup("searchFormMpscal022","empno","korNm", gBplcCode, "Y");
	  	}
	  	else {
	  		gf_EmpPopup("searchFormMpscal022","empno","korNm", gBplcCode, "Y");
	  	}
  	}
	
}

var fn_RowSelectMhsEmp = function (rId, cInd) {
	g_MainSearchValue.g_empno = '';

	if (rId > 0) {
    	g_MainSearchValue.g_empno = '';
    	g_MainSearchValue.g_empno = dhxGridMpscalEmp.cells(rId, 1).getValue();
	   // gf_FormSetValue('searchFormMhsEmp', 'empno', empno, 'text');
	    //title = titMhsEmp  + ' ' + gv_TitUpdate;
	    
	    var actvId = tabbarMpscal022.getActiveTab();
	    if(actvId=="a2") tabbarMpscal022.tabs("a2").attachURL("/xerp/mpscal022/searchMpsFamily/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode); 
	    if(actvId=="a3") tabbarMpscal022.tabs("a3").attachURL("/xerp/mpscal022/searchMpsAcnut/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode); 
	    if(actvId=="a4") tabbarMpscal022.tabs("a4").attachURL("/xerp/mpscal022/searchMpsCrqfs/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
	    if(actvId=="a5") tabbarMpscal022.tabs("a5").attachURL("/xerp/mpscal022/searchMpsStdr/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
	    //1번 탭 선택 및 초기화
	    //tabbarMhsHrb001.tabs("a1").setActive();
        
	    /*if(!fadeMode) {
	        $('#saveForm').fadeOut(gv_FadeTime, function() {
	            fn_SearchInputMhsEmp();
	            fadeMode = true;
	            fadeRegs = false;
	        });
	        $('#saveForm').fadeIn(gv_FadeTime, function() {});
	     } else {
	        fn_SearchInputMhsEmp();
	     }*/
	    //fn_SearchMpscal022();
    }
//	else if(rId.substring( 0, 6 ) == "newRow" && g_NewFlag == "Y"){
//		cf_InitInputForm_New("N");
//	}
};
