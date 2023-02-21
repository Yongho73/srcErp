/**
 * 프로그램 : 인사기본 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.22
 * 사용테이블 : MHS_EMP
 **/

var dhxGridMhsEmp;

var tabbarMhsHrb001;  //Tab Bar

//var fadeRegs = true;
//var fadeMode = false;
var titMhsEmp = gf_LocaleTrans('default','titMhsEmp');

/* 우측 상단 기본 정보*/
var g_MainSearchValue = new Object(); // 우측 Main 정보 최초 조회 값

var g_MainSaveValue = new Object();	// 우측 Main 정보 저장 용
var g_NewFlag = "N"; //신규 입력중인지 구분하는 Flag

var dhxInputCalendarGnfdBeginDe;	// 입사일 달력
var dhxInputCalendarGnfdEndDe;    	// 퇴사일 달력
var dhxCCalendarBrthDy;          	// 생일 달력
var dhxInputCurClsfEmplmnday;		// 현직급 임용일 

//Tab 1
var g_Tab1SelectValue = new Object();  // Tab1 최초 조회 값
var g_Tab1SaveValue = new Object();  // Tab1 정보 저장 용

var dhxCCalendarTab1MrrgDe;            //결혼일자  tab1
var dhxCCalendarTab1LastPromtDe;       //최종승급일
var dhxCCalendarTab1LastSalclsupDe;    //최종승호일
var dhxCCalendarTab1RetireExcclcDe;    //퇴직금중간정산일자

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
  
    fn_FileUploadBtnEvent();  //사진 업로드 이벤트  
});


var cf_InitParam = function (){

	fn_SetMenuPathNew("MHSHRB001");
    
    //재직구분 	: divId, selectId(지정ID),  selectName(지정명), placeHolder(=search or add), codekindCode, exceptCode(=코드), selectStyle, selectClass, sortOrder, required
	gf_ComboCode('divComboHffsSe', 'searchComboHffsSe', 'searchComboHffsSe', 'search', 'C278', '' , '', '', 'asc', '');
	//사업장
	gf_MakeComboBasic('divComboBplcKorNm', 'searchComboStmBizplc', '', '', 'mhshrm001/searchStmBizplcCode', '', 'code', 'codeNm', '1000');    
    //양력 여부
    gf_ComboCode('divInputFormComboSlrcldAt', 'detailComboSlrcldAt', 'detailComboSlrcldAt', 'sel', 'C013', '' , '', '', 'asc', '');
    //재직구분
    gf_ComboCode('divInputFormComboHffsSeBox', 'detailComboHffsSe', 'detailComboHffsSe', 'sel', 'C278', '' , '', '', 'asc', '');
    //사원구분
    gf_ComboCode('divInputFormComboEmplSeBox', 'detailComboEmplSe', 'detailComboEmplSe', 'sel', 'C068', '' , '', '', 'asc', '');
    //직무
    gf_ComboCode('divInputFormComboDtyCodeBox', 'detailComboDtyCode', 'detailComboDtyCode', 'sel', 'C103', '' , '', '', 'asc', '');
    //직위
    gf_MakeComboBasic('divInputFormComboOfcpsCodeBox', 'detailComboOfcpsCode', 'sel', '', 'mhshrb001/searchMhshrb001OfcpsCode', '', 'ofcpsCode', 'ofcpsNm', '');
    //직급
    gf_MakeComboBasic('divInputFormComboClsfCodeBox', 'detailComboClsfCode', 'sel', '', 'mhshrb001/searchMhshrb001ClsfCode', '', 'clsfCode', 'clsfNm', '');
    //호봉
    gf_ComboCode('divInputFormComboSrclsCodeBox', 'detailComboSrclsCode', 'detailComboSrclsCode', 'sel', 'C285', '' , '', '', 'asc', '');
    //직종
    gf_ComboCode('divInputFormComboJssfcCodeBox', 'detailComboJssfcCode', 'detailComboJssfcCode', 'sel', 'C148', '' , '', '', 'asc', '');
    //성별
    gf_ComboCode('divInputFormComboSexdstnSe', 'detailComboSexdstnSe', 'detailComboSexdstnSe', 'sel', 'C286', '' , '', '', 'asc', '');
    //직책
    gf_MakeComboBasic('divInputFormComboMhsRspofcCodeBox', 'detailComboMhsRspofcCode', 'sel', '', 'mhshrb001/searchMhshrb001RspofcCode', '', 'rspofcCode', 'rspofcNm', '');
	//퇴직사유
    gf_ComboCode('divInputFormComboRetireSeBox', 'detailComboRetireSe', 'detailComboRetireSe', 'sel', 'C154', '' , '', '', 'ordr', '');

    //saveForm 입사일, 퇴직일, 생년월일
    dhxInputCalendarGnfdBeginDe = new dhtmlXCalendarObject({input:"ecnyDe", button:"startDateIcon"});
    dhxInputCalendarGnfdBeginDe.loadUserLanguage("ko");
    dhxInputCalendarGnfdBeginDe.hideTime();

    dhxInputCalendarGnfdEndDe = new dhtmlXCalendarObject({input:"retireDe", button:"endDateIcon"});
    dhxInputCalendarGnfdEndDe.loadUserLanguage("ko");
    dhxInputCalendarGnfdEndDe.hideTime();

    dhxCCalendarBrthDy = new dhtmlXCalendarObject({input:"brthdy", button:"startDateIcon"});
    dhxCCalendarBrthDy.loadUserLanguage("ko");
    dhxCCalendarBrthDy.hideTime();

	dhxInputCurClsfEmplmnday = new dhtmlXCalendarObject({input:"curClsfEmplmnday", button:"endDateIcon"});
	dhxInputCurClsfEmplmnday.loadUserLanguage("ko");
	dhxInputCurClsfEmplmnday.hideTime();
    //saveForm : 우측 상단 

  	//결혼여부
    gf_ComboCode('divInputFormTab1MrrgAt', 'tab1MrrgAt', 'tab1MrrgAt', 'sel', 'C288', '' , '', '', 'asc', '');
    //최종학력
    gf_ComboCode('divInputFormTab1LastAcdncrCode', 'tab1LastAcdncrCode', 'tab1LastAcdncrCode', '', 'C016', '' , '', '', 'asc', '');
    //휴직
    gf_ComboCode('divInputFormTab1LayoffSeCode', 'tab1LayoffSeCode', 'tab1LayoffSeCode', '', 'C190', '' , '', '', 'asc', '');
    //급여지급
    //퇴직연금
    gf_ComboCode('divInputFormTab1RetireAnntyKindCode', 'tab1RetireAnntyKindCode', 'tab1RetireAnntyKindCode', 'sel', 'C652', '' , '', '', 'asc', '');
    //소득세율
    gf_ComboCode('divInputFormTab1IncmtaxrtCode', 'tab1IncmtaxrtCode', 'tab1IncmtaxrtCode', 'sel', 'C366', '' , '', '', 'asc', '');
    //급여보수체계
    gf_ComboCode('divInputFormTab1SalaryAprpCode', 'tab1SalaryAprpCode', 'tab1SalaryAprpCode', 'sel', 'C067', '' , '', '', 'asc', '');
    
    var nowDate = gf_Date2StrDisplayFormat(new Date());
    //결혼일자
    dhxCCalendarTab1MrrgDe = new dhtmlXCalendarObject({input:"tab1MrrgDe", button:"startDateIcon"});
    dhxCCalendarTab1MrrgDe.loadUserLanguage("ko");
    dhxCCalendarTab1MrrgDe.hideTime();
    dhxCCalendarTab1MrrgDe.setDate(nowDate);
    /*
    //최종승급일
    dhxCCalendarTab1LastPromtDe = new dhtmlXCalendarObject({input:"tab1LastPromtDe", button:"startDateIcon"});
    dhxCCalendarTab1LastPromtDe.loadUserLanguage("ko");
    dhxCCalendarTab1LastPromtDe.hideTime();
    dhxCCalendarTab1LastPromtDe.setDate(nowDate);
    //최종승호일
    dhxCCalendarTab1LastSalclsupDe = new dhtmlXCalendarObject({input:"tab1LastSalclsupDe", button:"startDateIcon"});
    dhxCCalendarTab1LastSalclsupDe.loadUserLanguage("ko");
    dhxCCalendarTab1LastSalclsupDe.hideTime();
    dhxCCalendarTab1LastSalclsupDe.setDate(nowDate);
    //퇴직금중간정산일자
    dhxCCalendarTab1RetireExcclcDe = new dhtmlXCalendarObject({input:"tab1RetireExcclcDe", button:"startDateIcon"});
    dhxCCalendarTab1RetireExcclcDe.loadUserLanguage("ko");
    dhxCCalendarTab1RetireExcclcDe.hideTime();
    dhxCCalendarTab1RetireExcclcDe.setDate(nowDate);
    */
    if($("#searchComboHffsSe").val() != "J01"){
    	// value 값으로 선택
    	$("#searchComboHffsSe").val("J01").prop("selected", true); //재직구분 - 재직
	}
    
    // 페이징 환경설정 적용
    gf_SettingPgngUnit('pageingFormMhsEmp');

    $("#detailTopForm").validate({ errorElement: 'div', ignore: '' });

};

var cf_SetComponents = function (){

    var dhxGridMhsEmpListInfo = [];
    //dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'right', 'int', 'edn', true, 'num', '')); // 번호
    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '50', 'right', 'int', 'edn', false, 'num', '')); // 번호
    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpno'), '80', 'center', 'str', 'ro', false, 'empno', '')); // 사원번호
    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '90', 'center', 'str', 'ro', false, 'korNm', '')); // 한글 
    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCode'), '*', 'center', 'str', 'ro', false, 'deptCodeNm', '')); // 부서
    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titClsfCode'), '90', 'center', 'str', 'ro', false, 'clsfCodeNm', '')); // 직급
    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', false, 'olEmpno', '')); // 원 사원번호
    
    dhxGridMhsEmp = gf_MakeDhxGrid('MhsEmpDataList', dhxGridMhsEmpListInfo, true, false, false);
    dhxGridMhsEmp.enableRowspan(true);
    
    $("#saveFormEmp_Tab1").validate({
        errorElement: 'div'
    });
    
    //TAB BAR 선언
    tabbarMhsHrb001 = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
    	    {id:"a1",  text: gf_LocaleTrans('default', 'titBasic') },     //기본
		    /*{id:"a2",  text: gf_LocaleTrans('default', 'titPaly')},       //신상정보 */
    	    {id:"a2",  text: "신상정보"},                                   //신상정보
            {id:"a3",  text: gf_LocaleTrans('default', 'titFamily')},	  //가족 
		    {id:"a4",  text: gf_LocaleTrans('default', 'titPaly')},		  //발령 
		    {id:"a5",  text: gf_LocaleTrans('default', 'titReward')},	  //포상 
		    {id:"a6",  text: gf_LocaleTrans('default', 'titMhsDscpl')},	  //징계 
		    {id:"a7",  text: gf_LocaleTrans('default', 'titSchool')},	  //학력 
		    {id:"a8",  text: gf_LocaleTrans('default', 'titCareer')},     //경력 
		    {id:"a9",  text: gf_LocaleTrans('default', 'titMhsCrqfs')},   //자격 
		    {id:"a10", text: gf_LocaleTrans('default', 'titEdu')},		  //교육 
		    {id:"a11", text: gf_LocaleTrans('default', 'titAcnutNo')},	  //계좌 
		    {id:"a12", text: gf_LocaleTrans('default', 'titLang')},	      //어학  titLang
		    /*
		    {id:"a13", text: gf_LocaleTrans('default', 'titForEdu')},	  //(해외)연수
		    {id:"a14", text: "자소서"},               	                  //자소서
		    {id:"a15", text: "면담"},               	                      //면담
		    {id:"a16", text: gf_LocaleTrans('default', 'titOther')}		  //기타
		    */
        ]
    });
   
    tabbarMhsHrb001.tabs("a1").attachObject("tab1");
    tabbarMhsHrb001.tabs("a2").attachObject("tab2");
    tabbarMhsHrb001.tabs("a3").attachObject("tab3");
    tabbarMhsHrb001.tabs("a4").attachObject("tab4");
    tabbarMhsHrb001.tabs("a5").attachObject("tab5");
    tabbarMhsHrb001.tabs("a6").attachObject("tab6");
    tabbarMhsHrb001.tabs("a7").attachObject("tab7");
    tabbarMhsHrb001.tabs("a8").attachObject("tab8");
    tabbarMhsHrb001.tabs("a9").attachObject("tab9");
    tabbarMhsHrb001.tabs("a10").attachObject("tab10");
    tabbarMhsHrb001.tabs("a11").attachObject("tab11");
    tabbarMhsHrb001.tabs("a12").attachObject("tab12");
    /*
    tabbarMhsHrb001.tabs("a13").attachObject("tab13");
    tabbarMhsHrb001.tabs("a14").attachObject("tab14");
    tabbarMhsHrb001.tabs("a15").attachObject("tab15");
    tabbarMhsHrb001.tabs("a16").attachObject("tab16");*/
    
    tabbarMhsHrb001.attachEvent("onSelect", function(id, lastId){
    	//alert(empno);
    	if(id=="a2") tabbarMhsHrb001.tabs("a2").attachURL("/xerp/mhshrb001/searchMhsTab2IndvdlInfo/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a3") tabbarMhsHrb001.tabs("a3").attachURL("/xerp/mhshrb001/searchMhsTab3Family/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a4") tabbarMhsHrb001.tabs("a4").attachURL("/xerp/mhshrb001/searchMhsTab4Gnfd/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a5") tabbarMhsHrb001.tabs("a5").attachURL("/xerp/mhshrb001/searchMhsTab5Rward/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a6") tabbarMhsHrb001.tabs("a6").attachURL("/xerp/mhshrb001/searchMhsTab6Dscpl/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
        if(id=="a7") tabbarMhsHrb001.tabs("a7").attachURL("/xerp/mhshrb001/searchMhsTab7Acdmcr/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a8") tabbarMhsHrb001.tabs("a8").attachURL("/xerp/mhshrb001/searchMhsTab8Career/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a9") tabbarMhsHrb001.tabs("a9").attachURL("/xerp/mhshrb001/searchMhsTab9Crqfs/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a10") tabbarMhsHrb001.tabs("a10").attachURL("/xerp/mhshrb001/searchMhsTab10Edu/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a11") tabbarMhsHrb001.tabs("a11").attachURL("/xerp/mhshrb001/searchMhsTab11Acnut/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	if(id=="a12") tabbarMhsHrb001.tabs("a12").attachURL("/xerp/mhshrb001/searchMhsTab12Fggg/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
    	return true;
    });
    tabbarMhsHrb001.tabs("a1").setActive();

};

var eventIdsMhsEmp = [];
var cf_SetEventListener = function (){
	// 그리드 이벤트 모두 삭제
	gf_GridDetachEvent(dhxGridMhsEmp, eventIdsMhsEmp);   //그리드 이벤트 해제 (중복실행방지를 위해)
	
	// 공통코드종류 그리드 이벤트
	var eventId = '';
    eventId = dhxGridMhsEmp.attachEvent("onBeforeSorting", function(ind, type, direction) { // 정렬
    	fn_MhsEmpSortGridList(ind, type, direction);
    });
    eventIdsMhsEmp.push(eventId);
    eventId = dhxGridMhsEmp.attachEvent("onEditCell", function(ind, type, direction) {
    	if(cInd == 0) return true;
        else return false;
    });
    eventIdsMhsEmp.push(eventId);
	eventId = dhxGridMhsEmp.attachEvent("onKeyPress",function(keyCode, ctrl, shift, event_object){ // 엑셀다운로드
		if(keyCode == 113) fn_MhsEmpExcelDown();
	});
	eventIdsMhsEmp.push(eventId);
	eventId = dhxGridMhsEmp.attachEvent('onRowSelect',function(id, ind) {
		fn_RowSelectMhsEmp(id, ind);
	});
	eventIdsMhsEmp.push(eventId);
	
    //초기화
    $('#searchFormMhsEmp #btnInit').unbind('click').bind('click', function(event){
    	gf_FormSetValue('searchFormMhsEmp', 'deptCodeNm', '', 'text');
    	gf_FormSetValue('searchFormMhsEmp', 'deptCode', '', 'text');
    	gf_FormSetValue('searchFormMhsEmp', 'empno', '', 'text');
    	gf_FormSetValue('searchFormMhsEmp', 'empNm', '', 'text');
    	gf_FormSetValue('searchFormMhsEmp', 'sortDirection', '', 'text');
        gf_FormSetValue('searchFormMhsEmp', 'sortColumId', '', 'text');
    	
    	// OR option 순서값으로 선택
    	//$("#searchComboHffsSe option:eq(0)").prop("selected", true); //재직구분
    	if($("#searchComboHffsSe").val() != "J01"){
	    	// value 값으로 선택
	    	$("#searchComboHffsSe").val("J01").prop("selected", true); //재직구분 - 재직
    	}
    	
    	if($("#searchComboStmBizplc").val() != "1000"){
	    	// value 값으로 선택
	    	$("#searchComboStmBizplc").val("1000").prop("selected", true); //사업장
	    	
	    	fn_SearchMhsEmpGridList(1);
    	}
    });    
    
    //조회
    $('#searchFormMhsEmp #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchMhsEmpGridList(1);
    });
    //신규
    $('#btnAddStmUsers').unbind('click').bind('click', function(event){
          /*if(!fadeRegs) {
              $('#saveForm').fadeOut(gv_FadeTime, function() {
                  cf_InitInputForm_New();
                  fadeRegs = true;
                  fadeMode = false;
              });
              $('#saveForm').fadeIn(gv_FadeTime, function() {});
          } else {
        	  cf_InitInputForm_New();
          }*/
          cf_InitInputForm_New("Y");
    });
    //삭제
    $('#btnRemoveStmUsers').unbind('click').bind('click', function() {
        if( gf_IsNull(g_MainSearchValue.g_empno) ) {
        	if(g_NewFlag == "Y"){   //신규 입력 상태
        		//신규 입력 상태
        		var selectedId = dhxGridMhsEmp.getSelectedRowId();
        		if(typeof selectedId != "undefined" && selectedId != null){
        			dhxGridMhsEmp.deleteSelectedRows();
        			dhxGridMhsEmp.selectCell(0,1);
        			fn_RowSelectMhsEmp(1, 1);
        			g_NewFlag = "N";
        		}
        	}
        	else {
        		gf_DivMsgAlert(gv_MsgDelKey);
        		return false;
        	}
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
        }
    });
    //엑셀다운로드
    $('#btnExcelStmUsers').unbind('click').bind('click', function() {
        fn_MhsEmpExcelDown();
    });
    //닫기
    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });

    //사업장 변경 시
    $('#searchComboStmBizplc').unbind('change').bind('change', function() {
    	fn_SearchMhsEmpGridList(1);
    });
    
    //페이징 수량 변경 시
    $('#pageRowSizeMhsEmp').unbind('change').bind('change', function() {
    	fn_SearchMhsEmpGridList(1);
    });
    
    //사원팝업
	$('#searchFormMhsEmp #btnEmpSearch').unbind('click').bind('click', function(event){
		var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
		var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
		gf_EmpPopup("searchFormMhsEmp","empno","empNm", stmBizplcCode, "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#empno').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
    });
	$('#empNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
    });
    
    //부서 선택 Popup
	$('#searchFormMhsEmp #btnDeptCodeSearch').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormMhsEmp","deptCode","deptCodeNm", gf_FormGetValue('searchFormMhsEmp', 'searchComboStmBizplc', 'combo'), "N", "fn_CallbackDeptPopup");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#deptCode').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
    });
	$('#deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
    });
    
    //저장
    $('#btnSaveStmUsers').unbind('click').bind('click', function() {

        if($('#detailTopForm').validate().form()){
        	
        	g_MainSaveValue.v_empno = gf_FormGetValue('detailTopForm', 'empno', 'text');
        	g_MainSaveValue.v_korNm = gf_FormGetValue('detailTopForm', 'korNm', 'text');
        	g_MainSaveValue.v_engNm = gf_FormGetValue('detailTopForm', 'engNm', 'text');
        	g_MainSaveValue.v_chcrtNm = gf_FormGetValue('detailTopForm', 'chcrtNm', 'text');
        	g_MainSaveValue.v_ihidnum = gf_FormGetValue('detailTopForm', 'ihidnum', 'text');
        	
        	g_MainSaveValue.v_SexdstnSe = gf_FormGetValue('detailTopForm', 'detailComboSexdstnSe', 'combo');
        	g_MainSaveValue.v_brthdy = gf_FormGetValue('detailTopForm', 'brthdy', 'text');
        	if(gf_FormGetValue('detailTopForm', 'detailComboSlrcldAt', 'combo')){
        		g_MainSaveValue.v_SlrcldAt = gf_FormGetValue('detailTopForm', 'detailComboSlrcldAt', 'combo');
        	} else {
        		g_MainSaveValue.v_SlrcldAt = "";
        	}
        	g_MainSaveValue.v_HffsSe = gf_FormGetValue('detailTopForm', 'detailComboHffsSe', 'combo');
        	g_MainSaveValue.v_EmplSe = gf_FormGetValue('detailTopForm', 'detailComboEmplSe', 'combo');
        	g_MainSaveValue.v_DtyCode = gf_FormGetValue('detailTopForm', 'detailComboDtyCode', 'combo');
        	g_MainSaveValue.v_OfcpsCode = gf_FormGetValue('detailTopForm', 'detailComboOfcpsCode', 'combo');
        	g_MainSaveValue.v_ClsfCode = gf_FormGetValue('detailTopForm', 'detailComboClsfCode', 'combo');
        	g_MainSaveValue.v_SrclsCode = gf_FormGetValue('detailTopForm', 'detailComboSrclsCode', 'combo');
        	g_MainSaveValue.v_JssfcCode = gf_FormGetValue('detailTopForm', 'detailComboJssfcCode', 'combo');
        	g_MainSaveValue.v_MhsRspofcCode = gf_FormGetValue('detailTopForm', 'detailComboMhsRspofcCode', 'combo');
        	g_MainSaveValue.v_deptCode = gf_FormGetValue('detailTopForm', 'deptCode', 'text');
        	g_MainSaveValue.v_ecnyDe = gf_FormGetValue('detailTopForm', 'ecnyDe', 'text');
        	g_MainSaveValue.v_hdadptDeptCode = gf_FormGetValue('detailTopForm', 'hdadptDeptCode', 'text');
        	g_MainSaveValue.v_dispDeptCode = gf_FormGetValue('detailTopForm', 'dispDeptCode', 'text');
        	g_MainSaveValue.v_retireDe = gf_FormGetValue('detailTopForm', 'retireDe', 'text');
        	g_MainSaveValue.v_empPhoto = gf_FormGetValue('detailTopForm', 'photoAtchmnflNo', 'text');
        	g_MainSaveValue.v_bplcCode = g_MainSearchValue.g_bplcCode;
			g_MainSaveValue.v_curClsfEmplmnday = gf_FormGetValue('detailTopForm', 'curClsfEmplmnday', 'text');
			g_MainSaveValue.v_retireSe = gf_FormGetValue('detailTopForm', 'detailComboRetireSe', 'combo');

        	//1. 신규인지 수정인지 확인
        	if( !gf_IsNull(g_MainSaveValue.v_empno) ) {
        		//2. 수정이면 기존과 다른게 있는지 확인  
        		if(		g_MainSaveValue.v_korNm == g_MainSearchValue.g_korNm && 
						g_MainSaveValue.v_engNm == g_MainSearchValue.g_engNm && 
						g_MainSaveValue.v_chcrtNm == g_MainSearchValue.g_chcrtNm && 
						g_MainSaveValue.v_ihidnum.substring( 0, 6 ) == g_MainSearchValue.g_ihidnum.substring( 0, 6 ) && 
						g_MainSaveValue.v_SexdstnSe == g_MainSearchValue.g_SexdstnSe && 
						g_MainSaveValue.v_brthdy == g_MainSearchValue.g_brthdy && 
        				g_MainSaveValue.v_SlrcldAt == g_MainSearchValue.g_SlrcldAt && 
						g_MainSaveValue.v_HffsSe == g_MainSearchValue.g_HffsSe && 
						g_MainSaveValue.v_EmplSe == g_MainSearchValue.g_EmplSe && 
						g_MainSaveValue.v_DtyCode == g_MainSearchValue.g_DtyCode && 
						g_MainSaveValue.v_OfcpsCode == g_MainSearchValue.g_OfcpsCode && 
						g_MainSaveValue.v_ClsfCode == g_MainSearchValue.g_ClsfCode && 
						g_MainSaveValue.v_SrclsCode == g_MainSearchValue.g_SrclsCode &&
        				g_MainSaveValue.v_JssfcCode == g_MainSearchValue.g_JssfcCode && 
						g_MainSaveValue.v_MhsRspofcCode == g_MainSearchValue.g_MhsRspofcCode && 
						g_MainSaveValue.v_deptCode == g_MainSearchValue.g_deptCode && 
						g_MainSaveValue.v_ecnyDe == g_MainSearchValue.g_ecnyDe && 
						g_MainSaveValue.v_hdadptDeptCode == g_MainSearchValue.g_hdadptDeptCode && 
						g_MainSaveValue.v_dispDeptCode == g_MainSearchValue.g_dispDeptCode &&
        				g_MainSaveValue.v_retireDe == g_MainSearchValue.g_retireDe && 
						g_MainSaveValue.v_empPhoto == g_MainSearchValue.g_empPhoto &&						
						g_MainSaveValue.v_curClsfEmplmnday == g_MainSearchValue.g_curClsfEmplmnday &&
						g_MainSaveValue.v_retireSe == g_MainSearchValue.g_retireSe
						
				) {
        			alert("수정된 정보가 없습니다.");
        			return false;
        		}

        		gf_DivMsgConfirm("수정하시겠습니까?", 'fn_SaveMain()', '');
            } else {
            	gf_DivMsgConfirm("저장하시겠습니까?", 'fn_SaveMain()', '');
            }
        }

        $('#saveFormEmp_Tab1 div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });
    
    
    
    
    //우측 상단 Detail
    $('#btndetailTopInit').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
    
    //부서 선택 Popup
	$('#detailTopForm #btnDetailDeptCodeSearch').unbind('click').bind('click', function(event){
		var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
		var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
		gf_DeptPopup("detailTopForm","deptCode","deptCodeNm", stmBizplcCode, "N", "fn_CallbackSearchMhsEmpDetailDeptCodePopup");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	$('#detailTopForm #btnDetailHdadptDeptCodeSearch').unbind('click').bind('click', function(event){
		var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
		var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
		gf_DeptPopup("detailTopForm","hdadptDeptCode","hdadptDeptCodeNm", stmBizplcCode, "N", "fn_CallbackDeptPopup");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	$('#detailTopForm #btnDetailDispDeptCodeSearch').unbind('click').bind('click', function(event){
		var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
		var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
		gf_DeptPopup("detailTopForm","dispDeptCode","dispDeptCodeNm", stmBizplcCode, "N", "fn_CallbackDeptPopup");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#detailTopForm #deptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDetailDeptCode('deptCode');
	    }
    });
	$('#hdadptDeptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDetailDeptCode('hdadptDeptCode');
	    }
    });
	$('#dispDeptCodeNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDetailDeptCode('dispDeptCode');
	    }
    });
	
	//$('#detailTopForm #ihidnum').unbind('keypress').bind('keypress', function(event){
	$('#detailTopForm #ihidnum').unbind('keyup').bind('keyup', function(event){
		var jnum = $('#detailTopForm #ihidnum').val();
		var rJnum = "";
		
		jnum = jnum.replace(/[^0-9]/g,"");  // 숫자만 남김
		if(jnum.length >= 6){
			rJnum = jnum.substring(0,6) + "-" + jnum.substring(6,13);
		}
		else rJnum = jnum;
		$('#detailTopForm #ihidnum').val(rJnum);
		
		var ch = rJnum.slice(7,8);
		if(ch == '1' || ch == '3'){
            //('남자');
			$("#detailComboSexdstnSe").val("M").prop("selected", true);
		}
        else if(ch == '2' || ch == '4'){
        	$("#detailComboSexdstnSe").val("F").prop("selected", true);
        }
        else {
        	$("#detailComboSexdstnSe").val("").prop("selected", true);
        }
    });
	
	//Tab 1
	//저장
	$('#btnSave_Tab1').unbind("click").bind("click",function() {
        if($('#saveFormEmp_Tab1').validate().form()){
        	
        	g_Tab1SaveValue.empno = gf_FormGetValue('detailTopForm', 'empno', 'text');
        	g_Tab1SaveValue.bplcCode = g_MainSearchValue.g_bplcCode;
            
            g_Tab1SaveValue.lxtnTelno = gf_FormGetValue('saveFormEmp_Tab1', 'tab1lxtnTelno', 'text');  // 내선전화번호
            g_Tab1SaveValue.mbtlnum = gf_FormGetValue('saveFormEmp_Tab1', 'tab1Mbtlnum', 'text');  // 휴대폰번호
            g_Tab1SaveValue.ownhomTelno = gf_FormGetValue('saveFormEmp_Tab1', 'tab1OwnhomTelno', 'text');  // 자택전화번호
            g_Tab1SaveValue.email = gf_FormGetValue('saveFormEmp_Tab1', 'tab1Email', 'text');  // 이메일(사내)
            g_Tab1SaveValue.indvdlEmail = gf_FormGetValue('saveFormEmp_Tab1', 'tab1IndvdlEmail', 'text');  // 이메일(개인)
            g_Tab1SaveValue.mrrgAt = gf_FormGetValue('saveFormEmp_Tab1', 'tab1MrrgAt', 'combo');  //결혼여부
            g_Tab1SaveValue.mrrgDe = gf_FormGetValue('saveFormEmp_Tab1', 'tab1MrrgDe', 'text');  // 결혼일자
            g_Tab1SaveValue.emgncTelno = gf_FormGetValue('saveFormEmp_Tab1', 'tab1EmgncTelno', 'text');  // 비상연락처
            
            if(gf_FormGetValue('saveFormEmp_Tab1', 'tab1LastAcdncrCode',  'combo')){
            	g_Tab1SaveValue.lastAcdncrCode = gf_FormGetValue('saveFormEmp_Tab1', 'tab1LastAcdncrCode',  'combo');  // 최종학력
            } else {
            	g_Tab1SaveValue.lastAcdncrCode = "";  // 최종학력
            }
            g_Tab1SaveValue.lastSchulNm = gf_FormGetValue('saveFormEmp_Tab1', 'tab1LastSchulNm', 'text');  // 최종학교
            g_Tab1SaveValue.lastPromtDe = gf_FormGetValue('saveFormEmp_Tab1', 'tab1LastPromtDe', 'text');  // 최종승급일
            g_Tab1SaveValue.lastSalclsupDe = gf_FormGetValue('saveFormEmp_Tab1', 'tab1LastSalclsupDe', 'text');  // 최종승호일
            if(gf_FormGetValue('saveFormEmp_Tab1', 'tab1LayoffSeCode', 'combo')){
            	g_Tab1SaveValue.layoffSeCode = gf_FormGetValue('saveFormEmp_Tab1', 'tab1LayoffSeCode', 'combo');  // 휴직구분
            } else {
            	g_Tab1SaveValue.layoffSeCode = "";
            }
            g_Tab1SaveValue.zip = gf_FormGetValue('saveFormEmp_Tab1', 'zip', 'text');  // 현주소
            g_Tab1SaveValue.ownhomAdres = gf_FormGetValue('saveFormEmp_Tab1', 'ownhomAdres', 'text');  // 현주소
            g_Tab1SaveValue.ownhomDetailAdres = gf_FormGetValue('saveFormEmp_Tab1', 'ownhomDetailAdres', 'text');  // 현주소
            g_Tab1SaveValue.bornZip = gf_FormGetValue('saveFormEmp_Tab1', 'bornZip', 'text');  // 본적
            g_Tab1SaveValue.bornAdres = gf_FormGetValue('saveFormEmp_Tab1', 'bornAdres', 'text');  // 본적
            g_Tab1SaveValue.bornDetailAdres = gf_FormGetValue('saveFormEmp_Tab1', 'bornDetailAdres', 'text');  // 본적
            g_Tab1SaveValue.salaryPymntAt = gf_FormGetValue('saveFormEmp_Tab1', 'tab1SalaryPymntAt', 'combo');  // 급여지급
            g_Tab1SaveValue.retireExcclcDe = gf_FormGetValue('saveFormEmp_Tab1', 'tab1RetireExcclcDe', 'text');  // 퇴직금중간정산일자
            
            if($("#saveFormEmp_Tab1 input[name='tab1CashierAt']:input[value='1']").is(":checked") == true){  // 출납업무
            	g_Tab1SaveValue.cashierAt = "1";
            } else {
            	g_Tab1SaveValue.cashierAt = "0";
            }
            g_Tab1SaveValue.retireAnntyKindCode = gf_FormGetValue('saveFormEmp_Tab1', 'tab1RetireAnntyKindCode', 'combo');  // 퇴직연금
            g_Tab1SaveValue.incmtaxrtCode = gf_FormGetValue('saveFormEmp_Tab1', 'tab1IncmtaxrtCode', 'combo');  // 소득세율선택
            g_Tab1SaveValue.salaryAprpCode = gf_FormGetValue('saveFormEmp_Tab1', 'tab1SalaryAprpCode', 'combo');  // 급여보수체계
            if($("#saveFormEmp_Tab1 input[name='tab1BabyShrtenWorkAt']:input[value='1']").is(":checked") == true){  // 육아단축근무여부
            	g_Tab1SaveValue.babyShrtenWorkAt = "1";
            } else {
            	g_Tab1SaveValue.babyShrtenWorkAt = "0";
            }
            if($("#saveFormEmp_Tab1 input[name='tab1LbunSbscrbAt']:input[value='1']").is(":checked") == true){  // 노조가입
            	g_Tab1SaveValue.lbunSbscrbAt = "1";
            } else {
            	g_Tab1SaveValue.lbunSbscrbAt = "0";
            }
            if($("#saveFormEmp_Tab1 input[name='tab1MutaidSbscrbAt']:input[value='1']").is(":checked") == true){  // 상조가입
            	g_Tab1SaveValue.mutaidSbscrbAt = "1";
            } else {
            	g_Tab1SaveValue.mutaidSbscrbAt = "0";
            }
        	
        	if( !gf_IsNull(g_Tab1SaveValue.empno) ) {
        		//2. 수정이면 기존과 다른게 있는지 확인  
        		if(g_Tab1SaveValue.lxtnTelno == g_Tab1SelectValue.lxtnTelno && g_Tab1SaveValue.mbtlnum == g_Tab1SelectValue.mbtlnum && g_Tab1SaveValue.ownhomTelno == g_Tab1SelectValue.ownhomTelno && 
        				g_Tab1SaveValue.email == g_Tab1SelectValue.email && g_Tab1SaveValue.indvdlEmail == g_Tab1SelectValue.indvdlEmail && g_Tab1SaveValue.mrrgAt == g_Tab1SelectValue.mrrgAt && 
        				g_Tab1SaveValue.mrrgDe == g_Tab1SelectValue.mrrgDe && g_Tab1SaveValue.emgncTelno == g_Tab1SelectValue.emgncTelno && g_Tab1SaveValue.lastAcdncrCode == g_Tab1SelectValue.lastAcdncrCode && 
        				g_Tab1SaveValue.lastSchulNm == g_Tab1SelectValue.lastSchulNm && g_Tab1SaveValue.lastPromtDe == g_Tab1SelectValue.lastPromtDe &&  g_Tab1SaveValue.lastSalclsupDe == g_Tab1SelectValue.lastSalclsupDe && 
        				g_Tab1SaveValue.layoffSeCode == g_Tab1SelectValue.layoffSeCode && g_Tab1SaveValue.zip == g_Tab1SelectValue.zip &&  g_Tab1SaveValue.ownhomAdres == g_Tab1SelectValue.ownhomAdres &&
        				g_Tab1SaveValue.ownhomDetailAdres == g_Tab1SelectValue.ownhomDetailAdres && g_Tab1SaveValue.bornZip == g_Tab1SelectValue.bornZip &&  g_Tab1SaveValue.bornAdres == g_Tab1SelectValue.bornAdres && 
        				g_Tab1SaveValue.bornDetailAdres == g_Tab1SelectValue.bornDetailAdres && g_Tab1SaveValue.salaryPymntAt == g_Tab1SelectValue.salaryPymntAt && g_Tab1SaveValue.retireExcclcDe == g_Tab1SelectValue.retireExcclcDe &&
        				g_Tab1SaveValue.cashierAt == g_Tab1SelectValue.cashierAt && g_Tab1SaveValue.retireAnntyKindCode == g_Tab1SelectValue.retireAnntyKindCode &&  g_Tab1SaveValue.incmtaxrtCode == g_Tab1SelectValue.incmtaxrtCode &&
        				g_Tab1SaveValue.salaryAprpCode == g_Tab1SelectValue.salaryAprpCode && g_Tab1SaveValue.babyShrtenWorkAt == g_Tab1SelectValue.babyShrtenWorkAt && g_Tab1SaveValue.lbunSbscrbAt == g_Tab1SelectValue.lbunSbscrbAt && g_Tab1SaveValue.mutaidSbscrbAt == g_Tab1SelectValue.mutaidSbscrbAt
        				) {
        			alert("수정된 정보가 없습니다.");
        			return false;
        		}
        		
        		gf_DivMsgConfirm("수정하시겠습니까?", 'cf_SaveTab1()', '');
            } else {
            	alert("정보를 확인하시기 바랍니다.");
            }
        }
    });
	//초기화
	$('#btnInit_Tab1').unbind("click").bind("click",function() {
        cf_InitTab1Form("Ori");
    });
	//주소 선택 Popup : 행안부 - juso.go.kr
	$('#saveFormEmp_Tab1 #btnTab1AddrSearch').unbind('click').bind('click', function(event){
		gf_ZipPopup("saveFormEmp_Tab1","zip","ownhomAdres", "ownhomDetailAdres", "fn_juso_go_kr_CallBack");  // form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 상세주소가 들어갈 tag의 ID, 콜백
    });
	$('#saveFormEmp_Tab1 #btnTab1BornAddrSearch').unbind('click').bind('click', function(event){
		gf_ZipPopup("saveFormEmp_Tab1","bornZip","bornAdres", "bornDetailAdres", "fn_juso_go_kr_CallBackBorn");  // form ID, 우편번호가 들어갈 tag의 ID, 주소가 들어갈 tag의 ID, 상세주소가 들어갈 tag의 ID, 콜백
    });
    
    //최종학력,휴직구분은 해당 화면에서 수정하므로 Tab1에서는 비활성화
    document.getElementById("tab1LastAcdncrCode").disabled = true;
    document.getElementById("tab1LayoffSeCode").disabled = true;
};

function fn_juso_go_kr_CallBack(data){
	console.log(data.zipno + " : " + data.roadAddr1 + " : " + data.roadAddr2 + " : " + data.roadAddrDetail);	    
    $('#saveFormEmp_Tab1 #zip').val(data.zipno);   //우편번호   		 
   	$('#saveFormEmp_Tab1 #ownhomAdres').val(data.roadAddr1 + " " + data.roadAddr2);   //주소   		 
   	$('#saveFormEmp_Tab1 #ownhomDetailAdres').val(data.roadAddrDetail);   //상세주소	   	 
}

function fn_juso_go_kr_CallBackBorn(data){
	console.log(data.zipno + " : " + data.roadAddr1 + " : " + data.roadAddr2 + " : " + data.roadAddrDetail);	    
    $('#saveFormEmp_Tab1 #bornZip').val(data.zipno);   //우편번호   		 
   	$('#saveFormEmp_Tab1 #bornAdres').val(data.roadAddr1 + " " + data.roadAddr2);   //주소   		 
   	$('#saveFormEmp_Tab1 #bornDetailAdres').val(data.roadAddrDetail);   //상세주소	   	 
}


var cf_SetBinding = function (){
    fn_SearchMhsEmpGridList(1);
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){

    //$('#detailTopForm input[name="empno"]').removeAttr("disabled");
    //$('#btnSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

	if(g_MainSearchValue.g_empPhoto != ""){
    	$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+g_MainSearchValue.g_empPhoto+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + g_MainSearchValue.g_korNm + ' (' + g_MainSearchValue.g_empno + ')" title="' + g_MainSearchValue.g_korNm + ' (' + g_MainSearchValue.g_empno + ')">');
    }
    else {
    	$('#empPhoto').html("");
    }
	
    /*
    $('detailForm').resetForm(); 
    $('detailTopForm').each(function(){
        this.reset();
    });*/

    gf_FormSetValue('detailTopForm', 'empno', g_MainSearchValue.g_empno, 'text');
    gf_FormSetValue('detailTopForm', 'korNm', g_MainSearchValue.g_korNm, 'text');
    gf_FormSetValue('detailTopForm', 'engNm', g_MainSearchValue.g_engNm, 'text');
    gf_FormSetValue('detailTopForm', 'chcrtNm', g_MainSearchValue.g_chcrtNm, 'text');

    gf_FormSetValue('detailTopForm', 'ihidnum', g_MainSearchValue.g_ihidnum, 'text');
    $("#detailComboSexdstnSe").val(g_MainSearchValue.g_SexdstnSe).prop("selected", true);
    gf_FormSetValue('detailTopForm', 'brthdy', g_MainSearchValue.g_brthdy, 'text');
    $("#detailComboSlrcldAt").val(g_MainSearchValue.g_SlrcldAt).prop("selected", true);
    $("#detailComboHffsSe").val(g_MainSearchValue.g_HffsSe).prop("selected", true);
    
    $("#detailComboEmplSe").val(g_MainSearchValue.g_EmplSe).prop("selected", true);
    $("#detailComboDtyCode").val(g_MainSearchValue.g_DtyCode).prop("selected", true);
    $("#detailComboOfcpsCode").val(g_MainSearchValue.g_OfcpsCode).prop("selected", true);

    $("#detailComboClsfCode").val(g_MainSearchValue.g_ClsfCode).prop("selected", true);
    $("#detailComboSrclsCode").val(g_MainSearchValue.g_SrclsCode).prop("selected", true);
    $("#detailComboJssfcCode").val(g_MainSearchValue.g_JssfcCode).prop("selected", true);
    $("#detailComboMhsRspofcCode").val(g_MainSearchValue.g_MhsRspofcCode).prop("selected", true);

    gf_FormSetValue('detailTopForm', 'deptCode', g_MainSearchValue.g_deptCode, 'text');
    gf_FormSetValue('detailTopForm', 'deptCodeNm', g_MainSearchValue.g_deptCodeNm, 'text');
    gf_FormSetValue('detailTopForm', 'upperDeptCode', g_MainSearchValue.g_upperDeptCode, 'text');
    gf_FormSetValue('detailTopForm', 'upperDeptCodeNm', g_MainSearchValue.g_upperDeptCodeNm, 'text');
    gf_FormSetValue('detailTopForm', 'ecnyDe', g_MainSearchValue.g_ecnyDe, 'text');

    gf_FormSetValue('detailTopForm', 'hdadptDeptCode', g_MainSearchValue.g_hdadptDeptCode, 'text');
    gf_FormSetValue('detailTopForm', 'hdadptDeptCodeNm', g_MainSearchValue.g_hdadptDeptCodeNm, 'text');
    gf_FormSetValue('detailTopForm', 'dispDeptCode', g_MainSearchValue.g_dispDeptCode, 'text');
    gf_FormSetValue('detailTopForm', 'dispDeptCodeNm', g_MainSearchValue.g_dispDeptCodeNm, 'text');
    gf_FormSetValue('detailTopForm', 'retireDe', g_MainSearchValue.g_retireDe, 'text');
    gf_FormSetValue('detailTopForm', 'photoAtchmnflNo', g_MainSearchValue.g_empPhoto, 'text');

	gf_FormSetValue('detailTopForm', 'curClsfEmplmnday', g_MainSearchValue.g_curClsfEmplmnday, 'text');
	$("#detailComboRetireSe").val(g_MainSearchValue.g_retireSe).prop("selected", true);

    //Tab 순서따라 수정
    //Tab1
};

var cf_InitInputForm_New = function (Yn){
	if(Yn == "Y" && g_NewFlag == "Y"){
		alert("신규 입력은 한건씩만 가능합니다.");
		return false;
	}
	//신규
	dhxGridMhsEmp.clearSelection();
	//g_MainSearchValue = {};
	g_MainSearchValue.g_empno = '';
    
	g_MainSearchValue.g_empPhoto = "";
	g_MainSearchValue.g_empno = "";
	g_MainSearchValue.g_korNm = "";
	g_MainSearchValue.g_engNm = "";
	g_MainSearchValue.g_chcrtNm = "";
	g_MainSearchValue.g_ihidnum = "";
	g_MainSearchValue.g_SexdstnSe = "";
	g_MainSearchValue.g_brthdy = "";
	g_MainSearchValue.g_SlrcldAt = "";
	g_MainSearchValue.g_HffsSe = "";
	g_MainSearchValue.g_EmplSe = "";
	g_MainSearchValue.g_DtyCode = "";
	g_MainSearchValue.g_OfcpsCode = "";
	g_MainSearchValue.g_ClsfCode = "";
	g_MainSearchValue.g_SrclsCode = "";
	g_MainSearchValue.g_JssfcCode = "";
	g_MainSearchValue.g_MhsRspofcCode = "";
	g_MainSearchValue.g_deptCode = "";
	g_MainSearchValue.g_deptCodeNm = "";
	g_MainSearchValue.g_upperDeptCode = "";
	g_MainSearchValue.g_upperDeptCodeNm = "";
	g_MainSearchValue.g_ecnyDe = "";
	g_MainSearchValue.g_hdadptDeptCode = "";
	g_MainSearchValue.g_hdadptDeptCodeNm = "";
	g_MainSearchValue.g_dispDeptCode = "";
	g_MainSearchValue.g_dispDeptCodeNm = "";
	g_MainSearchValue.g_retireDe = "";
	g_MainSearchValue.g_curClsfEmplmnday = "";
	g_MainSearchValue.g_retireSe = "";

    $('#empPhoto').html("");

    if(Yn == "Y"){
        dhxGridMhsEmp.addRow('newRow_'+dhxGridMhsEmp.uid(),[0,'','','',''],0);
        dhxGridMhsEmp.selectCell(0,1);
	}
    
    gf_FormSetValue('detailTopForm', 'empno', '', 'text');
    gf_FormSetValue('detailTopForm', 'korNm', '', 'text');
    gf_FormSetValue('detailTopForm', 'engNm', '', 'text');
    gf_FormSetValue('detailTopForm', 'chcrtNm', '', 'text');

    gf_FormSetValue('detailTopForm', 'ihidnum', '', 'text');
    $("#detailComboSexdstnSe option:eq(0)").prop("selected", true);
    gf_FormSetValue('detailTopForm', 'brthdy', '', 'text');
    $("#detailComboSlrcldAt option:eq(0)").prop("selected", true);
    $("#detailComboHffsSe option:eq(J01)").prop("selected", true);
    
    $("#detailComboEmplSe option:eq(0)").prop("selected", true);
    $("#detailComboDtyCode option:eq(0)").prop("selected", true);
    $("#detailComboOfcpsCode option:eq(0)").prop("selected", true);

    $("#detailComboClsfCode option:eq(0)").prop("selected", true);
    $("#detailComboSrclsCode option:eq(0)").prop("selected", true);
    $("#detailComboJssfcCode option:eq(0)").prop("selected", true);
    $("#detailComboMhsRspofcCode option:eq(0)").prop("selected", true);

    gf_FormSetValue('detailTopForm', 'deptCode', '', 'text');
    gf_FormSetValue('detailTopForm', 'deptCodeNm', '', 'text');
    gf_FormSetValue('detailTopForm', 'upperDeptCode', '', 'text');
    gf_FormSetValue('detailTopForm', 'upperDeptCodeNm', '', 'text');
    gf_FormSetValue('detailTopForm', 'ecnyDe', '', 'text');

    gf_FormSetValue('detailTopForm', 'hdadptDeptCode', '', 'text');
    gf_FormSetValue('detailTopForm', 'hdadptDeptCodeNm', '', 'text');
    gf_FormSetValue('detailTopForm', 'dispDeptCode', '', 'text');
    gf_FormSetValue('detailTopForm', 'dispDeptCodeNm', '', 'text');
    gf_FormSetValue('detailTopForm', 'retireDe', '', 'text');
    gf_FormSetValue('detailTopForm', 'photoAtchmnflNo', '', 'text');

	gf_FormSetValue('detailTopForm', 'curClsfEmplmnday', '', 'text');
    $("#detailComboRetireSe option:eq(0)").prop("selected", true);
    
    if(g_MainSearchValue.g_bplcCode == ""){
    	g_MainSearchValue.g_bplcCode = gf_FormGetValue('searchFormMhsEmp', 'searchComboStmBizplc', 'combo');
    }
    
    //달력 금일로 세팅
    var nowDate = gf_Date2StrDisplayFormat(new Date());
    dhxInputCalendarGnfdBeginDe.setDate(nowDate);  //입사일 달력
    dhxInputCalendarGnfdEndDe.setDate(nowDate);    //퇴사일 달력
    dhxCCalendarBrthDy.setDate(nowDate);          // 생일 달력


    //1번 탭 선택 및 초기화
    tabbarMhsHrb001.tabs("a1").setActive();
    
    g_NewFlag = "Y";
    
    //Tab1 초기화 
    cf_InitTab1Form("New");
    //Tab 선택 안되도록 , Tab1 버튼 비활성화
    fn_TabOnOff("N");
};

//Tab 비활성화
var fn_TabOnOff = function (OnOff){
	var ids = tabbarMhsHrb001.getAllTabs();
	if(OnOff == "N"){
		for (var q=0; q<ids.length; q++) {
			tabbarMhsHrb001.tabs(ids[q]).disable();
		}
		$("#tabbarObj").find("input, select, button, textarea").prop("disabled",true);
	}
	else {
		for (var q=0; q<ids.length; q++) {
			tabbarMhsHrb001.tabs(ids[q]).enable();
		}
		$("#tabbarObj").find("input, select, button, textarea").prop("disabled",false);
	}
}

//조회
var fn_SearchMhsEmpGridList = function (pageNum){
	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
	var stmBizplcCodeNm   = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].text;
	if(stmBizplcCode == "" || $.trim(stmBizplcCodeNm) == ""){
		alert("사업장은 필수 검색 조건입니다");
		return false;
	}
	var stmCodeHffsSeSelect = document.getElementById("searchComboHffsSe");
	var stmCodeHffsSeCode = stmCodeHffsSeSelect.options[stmCodeHffsSeSelect.selectedIndex].value;
	
	var pageingCnt = gf_FormGetValue('pageingFormMhsEmp', 'pageRowSize', 'combo');
	var page = pageNum;
	//if(gf_IsNull(pageingCnt)) pageingCnt = 20;
	if(gf_IsNull(page)) page = 1;
	gf_FormSetValue('searchFormMhsEmp', 'selectedPageNum', page, 'text');
	
    var jsonParameter = {
    	deptCode :  gf_FormGetValue('searchFormMhsEmp', 'deptCode', 'text'),
    	deptCodeNm :  gf_FormGetValue('searchFormMhsEmp', 'deptCodeNm', 'text'),
        empno : gf_FormGetValue('searchFormMhsEmp', 'empno', 'text'),
        korNm : gf_FormGetValue('searchFormMhsEmp', 'empNm', 'text'),

        bplcCode : stmBizplcCode, //사업장
    	hffsSe : stmCodeHffsSeCode, //재직구분
    	
    	sortDirection	: gf_FormGetValue('searchFormMhsEmp', 'sortDirection', 'text'),
		sortColumId		: gf_FormGetValue('searchFormMhsEmp', 'sortColumId', 'text'),
        pageingCnt 		: pageingCnt,
        pageNum 		: page,
    	
    	gridSearchAt : 'Y'  //그리드 조회인지 구분 , 그리드 조회 시만 사용
    };

    gf_Transaction('gridList', 'mhshrb001/searchMhsEmp', jsonParameter, 'fn_CallbackSearchMhsEmpGridList', false, 'GET');
};

var fn_CallbackSearchMhsEmpGridList = function (strSvcID, targetID, data){
    dhxGridMhsEmp.clearAll();
    //나머지도 clearAll();
    
    g_NewFlag = "N";
    g_MainSearchValue.g_bplcCode = "";
    
    if(!gf_IsNull(data.data.records)){
    	dhxGridMhsEmp.parse(data.data.records, 'js');
    	
        // 정렬 컬럼이 있으면 정렬 상태 유지
    	var sortOrder = gf_FormGetValue('searchFormMhsEmp', 'sortDirection','text');
    	var sortColumId = gf_FormGetValue('searchFormMhsEmp', 'sortColumId','text');
    	if(!gf_IsNull(sortOrder) && !gf_IsNull(sortColumId)) {
    		dhxGridMhsEmp.setSortImgState(true, gf_GetDhxGridColumId(dhxGridMhsEmp, sortColumId), sortOrder);    		 
    	}

    	gf_NoFoundDataOnGridMsgRemove('MhsEmpDataList'); 
    	
        dhxGridMhsEmp.selectCell(0,1);
        fn_RowSelectMhsEmp(1, 1);
        
        g_MainSearchValue.g_empno = dhxGridMhsEmp.cells(1, 1).getValue();
        //1번 탭 선택 및 초기화
        tabbarMhsHrb001.tabs("a1").setActive();
    } else {
        //gf_DivMsgAlert(gv_MsgNoData);
    	gf_NoFoundDataOnGridMsg('MhsEmpDataList'); 
    }
    $('#spanMhsEmpCnt').text(gf_NumberWithCommas(data.data.totalRecordCount));
    
    // 페이징 버튼 생성
	gf_PageNate(data.data,'.paging','fn_SearchMhsEmpGridList');
    
	cf_SetEventListener();
};


//메인 그리드 정렬변경(헤더클릭) 시 정렬변경
var fn_MhsEmpSortGridList = function(ind, type, direction){
	if(ind != gf_GetDhxGridColumId(dhxGridMhsEmp, 'num')){
	  	var sortOrder = gf_FormGetValue('searchFormMhsEmp', 'sortDirection', 'text');
	  	var sortColumId = gf_FormGetValue('searchFormMhsEmp', 'sortColumId', 'text');
	  	var nowSortColumId = gf_GetDhxGridColum(dhxGridMhsEmp, ind);
	  	// 정렬 컬럼이 바뀌면 정렬방식 초기화
	  	if(sortColumId != nowSortColumId) sortOrder = '';	    	
	  	sortOrder = gf_IsNull(sortOrder)?direction:sortOrder;	    	
	  	if(sortOrder == 'desc' ) {
	  		dhxGridMhsEmp.setSortImgState(true, ind, 'asc');
	  		gf_FormSetValue('searchFormMhsEmp', 'sortDirection', 'asc', 'text');
	  		gf_FormSetValue('searchFormMhsEmp', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmp, ind), 'text');
	  	}  else if(sortColumId != nowSortColumId && sortOrder == 'asc' ) {
	  		dhxGridMhsEmp.setSortImgState(true, ind, 'desc');
	  		gf_FormSetValue('searchFormMhsEmp', 'sortDirection', 'desc', 'text');
	  		gf_FormSetValue('searchFormMhsEmp', 'sortColumId', gf_GetDhxGridColum(dhxGridMhsEmp, ind), 'text');
	  	}
	  	else {
	  		dhxGridMhsEmp.setSortImgState(false);
	  		gf_FormSetValue('searchFormMhsEmp', 'sortDirection', '', 'text');
	  		gf_FormSetValue('searchFormMhsEmp', 'sortColumId', '', 'text');
	  	}
	  	fn_SearchMhsEmpGridList(gf_FormGetValue('searchFormMhsEmp', 'selectedPageNum', 'text'));
	}
}

var fn_SaveMain = function (){
	
	//3. 주민번호 체크및 *** 표시 사항 확인
	if(g_MainSaveValue.v_ihidnum == g_MainSearchValue.g_ihidnum){
		g_MainSaveValue.v_ihidnum = "";
	}
	
	//4. 추가 체크 사항 있으면 체크
	
    var jsonParameter = {
        empno : g_MainSaveValue.v_empno,
        korNm : g_MainSaveValue.v_korNm,
        engNm : g_MainSaveValue.v_engNm,
        chcrtNm : g_MainSaveValue.v_chcrtNm,
        brthdy : g_MainSaveValue.v_brthdy.replaceAll('-',''), //생년월일
        ecnyDe : g_MainSaveValue.v_ecnyDe.replaceAll('-',''),
        retireDe : g_MainSaveValue.v_retireDe.replaceAll('-',''),
        ihidnum : g_MainSaveValue.v_ihidnum.replaceAll('-',''),  //주민번호 확인
        deptCode : g_MainSaveValue.v_deptCode,
        hdadptDeptCode : g_MainSaveValue.v_hdadptDeptCode,
        dispDeptCode : g_MainSaveValue.v_dispDeptCode,
        sexdstnSe : g_MainSaveValue.v_SexdstnSe,
        slrcldAt : g_MainSaveValue.v_SlrcldAt,
        hffsSe : g_MainSaveValue.v_HffsSe,
        emplSe : g_MainSaveValue.v_EmplSe,
        dtyCode : g_MainSaveValue.v_DtyCode,
        ofcpsCode : g_MainSaveValue.v_OfcpsCode,
        clsfCode : g_MainSaveValue.v_ClsfCode,
        srclsCode : g_MainSaveValue.v_SrclsCode,
        jssfcCode : g_MainSaveValue.v_JssfcCode,
        rspofcCode : g_MainSaveValue.v_MhsRspofcCode,
        photoAtchmnflNo : g_MainSaveValue.v_empPhoto,
        bplcCode : g_MainSearchValue.g_bplcCode,
		curClsfEmplmnday : g_MainSaveValue.v_curClsfEmplmnday.replaceAll('-',''),
		retireSe : g_MainSaveValue.v_retireSe
    };

    var url;
	if( !gf_IsNull(g_MainSaveValue.v_empno) ) {
        url = "mhshrb001/modifyMhsEmp";
    } else {
        url = "mhshrb001/saveMhsEmp";
    }

    var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
    if(dataSource.code === '000') {

        if(!gf_IsNull(g_MainSaveValue.v_empno)) {
            gf_DivMsgAlert(gv_MsgUpdate);
        } else {
            gf_DivMsgAlert(gv_MsgRegist);
            //cf_InitInputForm();
        }
		
		if( gf_IsNull(g_MainSaveValue.v_empno) ) {
        	fn_SearchMhsEmpGridList(gf_FormGetValue('searchFormMhsEmp', 'selectedPageNum', 'text'));
		}
    }
}

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	var empno = "";
	var korNm = "";
	
	empno = gf_FormGetValue('searchFormMhsEmp', 'empno', 'text');
	korNm = gf_FormGetValue('searchFormMhsEmp', 'empNm', 'text');
	
	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
	var jsonParameter = {
			empno     : empno,
			korNm     : korNm,
			bplcCode  : stmBizplcCode
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMhsEmp', 'empno', data.empno, 'text');
 		gf_FormSetValue('searchFormMhsEmp', 'empNm', data.korNm, 'text');
 	}
  	else {
	  	//Popup 호출
		var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
		var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
  		gf_EmpPopup("searchFormMhsEmp","empno","empNm", stmBizplcCode, "Y", null);
  	}
}

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){
	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;

	var deptCode = gf_FormGetValue('searchFormMhsEmp', 'deptCode', 'text');
	var deptKorNm = gf_FormGetValue('searchFormMhsEmp', 'deptCodeNm', 'text');
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : stmBizplcCode
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}
function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormMhsEmp', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormMhsEmp', 'deptCodeNm', data.deptKorNm, 'text');

    } 
    else {
    	//Popup 호출
    	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
    	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
    	gf_DeptPopup("searchFormMhsEmp","deptCode","deptCodeNm", stmBizplcCode, "Y", "fn_CallbackDeptPopup");
    }
}


//사진 업로드
var fn_FileUploadBtnEvent = function(){
	//등록버튼
	$('#btnPhotoRec').unbind("click").bind("click",function(event){
		uploadedFileKeys2  = [];
		uploadedFileInfo2  = [];
		//File 업로드
		gf_FileUploadPopup(
			'fn_FileUploadBtnEvent', 
			'btnUploadedFiledelete2', 
			'fileList2', 
			'atchFileIds2', 
			 uploadedFileKeys2, 
			 uploadedFileInfo2, 
			 1,
		    'image',
	        'fn_FileUpLoadAfter');
    });
	
	//다운로드 버튼
	$('#btnPhotoDown').unbind("click").bind("click",function(event){
		var strimg = gf_FormGetValue('detailTopForm', 'photoAtchmnflNo', 'text');
		var strSrc = gv_ServerApiUrl + "/file/down?atchFileId=" + strimg;
		$("a#photoDownload").attr({
			"href": strSrc
		}).get(0).click();
	});
	
	//삭제버튼
	$('#btnPhotoDel').unbind("click").bind("click",function(event){
		$('#empPhoto').html("");
		gf_FormSetValue('detailTopForm', 'photoAtchmnflNo', "", 'text');
    });
};

var fn_FileUpLoadAfter = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){

	if(!gf_IsNull(data)){
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
		});
		
		//console.log(keyArr[0]);
		//console.log(keyArr[1]);
		//console.log(keyArr[2]);
		//console.log(keyArr[3]);
		var selectedId = dhxGridMhsEmp.getSelectedRowId();
		var empNo = dhxGridMhsEmp.cells(selectedId, 1).getValue();
		var empNm = dhxGridMhsEmp.cells(selectedId, 2).getValue();
		
		gf_FormSetValue('detailTopForm', 'photoAtchmnflNo', keyArr[0], 'text');
		
		$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+keyArr[0]+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + empNm + ' (' + empNo + ')" title="' + empNm + ' (' + empNo + ')">');
		//console.log(atchFileList);
	}
};

var fn_RowSelectMhsEmp = function (rId, cInd) {
	g_MainSearchValue.g_empno = '';

	if (rId > 0) {
    	g_MainSearchValue.g_empno = '';
    	g_MainSearchValue.g_empno = dhxGridMhsEmp.cells(rId, 1).getValue();
	   // gf_FormSetValue('searchFormMhsEmp', 'empno', empno, 'text');
	    title = titMhsEmp  + ' ' + gv_TitUpdate;
	    
	    var actvId = tabbarMhsHrb001.getActiveTab();
	    if(actvId=="a2") tabbarMhsHrb001.tabs("a2").attachURL("/xerp/mhshrb001/searchMhsTab2IndvdlInfo/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode); 
	    if(actvId=="a3") tabbarMhsHrb001.tabs("a3").attachURL("/xerp/mhshrb001/searchMhsTab3Family/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode); 
	    if(actvId=="a4") tabbarMhsHrb001.tabs("a4").attachURL("/xerp/mhshrb001/searchMhsTab4Gnfd/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode); 
	    if(actvId=="a5") tabbarMhsHrb001.tabs("a5").attachURL("/xerp/mhshrb001/searchMhsTab5Rward/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode); 
	    if(actvId=="a6") tabbarMhsHrb001.tabs("a6").attachURL("/xerp/mhshrb001/searchMhsTab6Dscpl/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
        if(actvId=="a7") tabbarMhsHrb001.tabs("a7").attachURL("/xerp/mhshrb001/searchMhsTab7Acdmcr/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
        if(actvId=="a8") tabbarMhsHrb001.tabs("a8").attachURL("/xerp/mhshrb001/searchMhsTab8Career/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
        if(actvId=="a9") tabbarMhsHrb001.tabs("a9").attachURL("/xerp/mhshrb001/searchMhsTab9Crqfs/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
        if(actvId=="a10") tabbarMhsHrb001.tabs("a10").attachURL("/xerp/mhshrb001/searchMhsTab10Edu/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
        if(actvId=="a11") tabbarMhsHrb001.tabs("a11").attachURL("/xerp/mhshrb001/searchMhsTab11Acnut/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
        if(actvId=="a12") tabbarMhsHrb001.tabs("a12").attachURL("/xerp/mhshrb001/searchMhsTab12Fggg/view?empno="+g_MainSearchValue.g_empno+"&bplcCode="+g_MainSearchValue.g_bplcCode);
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
	    fn_SearchInputMhsEmp();
    }
	else if(rId.substring( 0, 6 ) == "newRow" && g_NewFlag == "Y"){
		cf_InitInputForm_New("N");
	}
};

var fn_RemoveOne = function(){
    var empnos = [];
    empnos.push( g_MainSearchValue.g_empno );

    var jsonParameter = {
        empnos : empnos.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mhshrb001/removeMhsEmp', jsonParameter, 'POST');
    if(dataSource.data.code && dataSource.data.code == '999'){
    	alert(dataSource.data.msg + " 테이블에 정보가 있어서 삭제가 불가합니다.");
    }
    else if(dataSource.code == '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchMhsEmpGridList(gf_FormGetValue('searchFormMhsEmp', 'selectedPageNum', 'text'));
    } 
};

var fn_MhsEmpExcelDown = function () {
	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
	var stmBizplcCodeNm   = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].text;
	if(stmBizplcCode == "" || $.trim(stmBizplcCodeNm) == ""){
		alert("사업장은 필수 검색 조건입니다");
		return false;
	}
	var stmCodeHffsSeSelect = document.getElementById("searchComboHffsSe");
	var stmCodeHffsSeCode = stmCodeHffsSeSelect.options[stmCodeHffsSeSelect.selectedIndex].value;
	var pageingCnt = 9999999;
	var page = 1;
	
	var jsonParameter = {
	    	deptCode :  gf_FormGetValue('searchFormMhsEmp', 'deptCode', 'text'),
	    	deptCodeNm :  gf_FormGetValue('searchFormMhsEmp', 'deptCodeNm', 'text'),
	        empno : gf_FormGetValue('searchFormMhsEmp', 'empno', 'text'),
	        korNm : gf_FormGetValue('searchFormMhsEmp', 'empNm', 'text'),

	        bplcCode : stmBizplcCode, //사업장
	    	hffsSe : stmCodeHffsSeCode, //재직구분
	    	
	    	sortDirection	: gf_FormGetValue('searchFormMhsEmp', 'sortDirection', 'text'),
			sortColumId		: gf_FormGetValue('searchFormMhsEmp', 'sortColumId', 'text'),
	        pageingCnt 		: pageingCnt,
	        pageNum 		: page
	    };

    var header = [[
    				gf_LocaleTrans('default', 'titNum'),
                    gf_LocaleTrans('default', 'titEmpno'),
                    gf_LocaleTrans('default', 'titKorNm'),
                    gf_LocaleTrans('default', 'titEngNm'),
                    gf_LocaleTrans('default', 'titDeptCode'),
                    gf_LocaleTrans('default', 'titDeptNm'),                    
                    
                    gf_LocaleTrans('default', 'titChcrtNm'),
                    gf_LocaleTrans('default', 'titEcnyDe'),
                    gf_LocaleTrans('default', 'titRetireDe'),
                    gf_LocaleTrans('default', 'titIhidnum'),
                    
                    gf_LocaleTrans('default', 'titNltyCode'),
                    gf_LocaleTrans('default', 'titJssfcCode'),
                    gf_LocaleTrans('default', 'titSrclsCode'),
                    gf_LocaleTrans('default', 'titClsfCode'),
                    gf_LocaleTrans('default', 'titOfcpsCode'),
                    gf_LocaleTrans('default', 'titPositionCode'),
                    
                    gf_LocaleTrans('default', 'titZip'),
                    gf_LocaleTrans('default', 'titOwnhomAdres'),
                    gf_LocaleTrans('default', 'titOwnhomDetailAdres'),
                    gf_LocaleTrans('default', 'titOwnhomEngAdres'),
                    gf_LocaleTrans('default', 'titOwnhomTelno'),
                    gf_LocaleTrans('default', 'titLxtnTelno'),
                    gf_LocaleTrans('default', 'titMbtlnum'),
                    gf_LocaleTrans('default', 'titEmail'),
                    gf_LocaleTrans('default', 'titBrthdy'),
                    
                    gf_LocaleTrans('default', 'titSlrcldAt'),
                    gf_LocaleTrans('default', 'titMrrgAt'),
                    gf_LocaleTrans('default', 'titHdadptDeptCode'),
                    gf_LocaleTrans('default', 'titEmplSe'),
                    gf_LocaleTrans('default', 'titHffsSe'),
                    gf_LocaleTrans('default', 'titRetireSe'),
                    gf_LocaleTrans('default', 'titSexdstnSe'),
                    
                    gf_LocaleTrans('default', 'titLbunSbscrb'),
                    gf_LocaleTrans('default', 'titBplcKorNm'),
                    gf_LocaleTrans('default', 'titAnSalEli'),
                    gf_LocaleTrans('default', 'titJblnCode'),
                    gf_LocaleTrans('default', 'titDutyCode'),
                    gf_LocaleTrans('default', 'titEmgncTelno'),
                    "개인 이메일",
                    "파견 부서 명"
                    
    ]];
    var dataId = [[ 'num','empno','korNm', 'engNm', 'deptCode', 'deptCodeNm', 'chcrtNm', 'ecnyDe', 'retireDe', 'ihidnum', 'nltyCodeNm', 'jssfcCodeNm', 'srclsCode', 'clsfCodeNm', 'ofcpsCodeNm', 'rspofcCodeNm', 'zip', 'ownhomAdres', 'ownhomDetailAdres', 'ownhomEngAdres', 'ownhomTelno', 'lxtnTelno', 'mbtlnum', 'email', 'brthdy', 'slrcldAt', 'mrrgAtNm', 'hdadptDeptCodeNm', 'emplSeNm', 'hffsSeNm', 'retireSeNm', 'sexdstnSeNm', 'lbunSbscrbAtNm', 'bplcCodeNm', 'ansalsysAt', 'jblnCodeNm','dtyCodeNm','emgncTelno','indvdlEmail','dispDeptCodeNm' ]];
    var dataAlign = [[ 'right', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsEmp ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsEmp;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mhshrb001/excelMhsEmp', jsonParameter);
};

var fn_SearchInputMhsEmp = function (){
	//좌측 그리드 선택 시 우측 상세 조회 결과
    if( !gf_IsNull(g_MainSearchValue.g_empno) ) {

    	fn_TabOnOff("Y");
    	
        var jsonParameter = {
            empno : g_MainSearchValue.g_empno 
        };
 
        var dataSource = gf_NoAsyncTransaction('mhshrb001/findMhsEmp', jsonParameter, 'GET');
        var data = dataSource.data;
        
        g_MainSearchValue.g_empPhoto = "";
        g_MainSearchValue.g_empno = "";
        g_MainSearchValue.g_korNm = "";
        g_MainSearchValue.g_engNm = "";
        g_MainSearchValue.g_chcrtNm = "";
        g_MainSearchValue.g_ihidnum = "";
        g_MainSearchValue.g_SexdstnSe = "";
        g_MainSearchValue.g_brthdy = "";
        g_MainSearchValue.g_SlrcldAt = "";
        g_MainSearchValue.g_HffsSe = "";
        g_MainSearchValue.g_EmplSe = "";
        g_MainSearchValue.g_DtyCode = "";
        g_MainSearchValue.g_OfcpsCode = "";
        g_MainSearchValue.g_ClsfCode = "";
        g_MainSearchValue.g_SrclsCode = "";
        g_MainSearchValue.g_JssfcCode = "";
        g_MainSearchValue.g_MhsRspofcCode = "";
        g_MainSearchValue.g_deptCode = "";
        g_MainSearchValue.g_deptCodeNm = "";
        g_MainSearchValue.g_upperDeptCode = "";
        g_MainSearchValue.g_upperDeptCodeNm = "";
        g_MainSearchValue.g_ecnyDe = "";
        g_MainSearchValue.g_hdadptDeptCode = "";
        g_MainSearchValue.g_hdadptDeptCodeNm = "";
        g_MainSearchValue.g_dispDeptCode = "";
        g_MainSearchValue.g_dispDeptCodeNm = "";
        g_MainSearchValue.g_retireDe = "";
		g_MainSearchValue.g_curClsfEmplmnday = "";
		g_MainSearchValue.g_retireSe = "";

        gf_FormSetValue('detailTopForm', 'empno', data.empno, 'text');  //사번
        gf_FormSetValue('detailTopForm', 'korNm', data.korNm, 'text');  //성명
        gf_FormSetValue('detailTopForm', 'engNm', data.engNm, 'text');  //영문명
        gf_FormSetValue('detailTopForm', 'chcrtNm', data.chcrtNm, 'text'); //한자 명
        gf_FormSetValue('detailTopForm', 'ecnyDe', data.ecnyDe, 'text');   //입사 일자
        gf_FormSetValue('detailTopForm', 'retireDe', data.retireDe, 'text');  //퇴직 일자
        gf_FormSetValue('detailTopForm', 'ihidnum', data.ihidnum, 'text');  //주민등록번호
        gf_FormSetValue('detailTopForm', 'brthdy', data.brthdy, 'text');  // 생년월일
        gf_FormSetValue('detailTopForm', 'detailComboSlrcldAt', data.slrcldAt, 'combo');  //양력 여부
        gf_FormSetValue('detailTopForm', 'detailComboSrclsCode', data.srclsCode, 'combo');  //호봉 코드
        gf_FormSetValue('detailTopForm', 'detailComboClsfCode', data.clsfCode, 'combo');  // 직급 코드
        gf_FormSetValue('detailTopForm', 'detailComboOfcpsCode', data.ofcpsCode, 'combo');   // 직위 코드
        gf_FormSetValue('detailTopForm', 'detailComboEmplSe', data.emplSe, 'combo');  //사원 구분
        gf_FormSetValue('detailTopForm', 'detailComboHffsSe', data.hffsSe, 'combo');  // 재직 구분
        gf_FormSetValue('detailTopForm', 'detailComboJssfcCode', data.jssfcCode, 'combo');  //직종 코드
        gf_FormSetValue('detailTopForm', 'detailComboSexdstnSe', data.sexdstnSe, 'combo');   // 성별 구분
        gf_FormSetValue('detailTopForm', 'detailComboDtyCode', data.dtyCode, 'combo');   // 직무
        gf_FormSetValue('detailTopForm', 'detailComboMhsRspofcCode', data.rspofcCode, 'combo');   // 직책
        gf_FormSetValue('detailTopForm', 'deptCode', data.deptCode, 'text');   //부서코드
        gf_FormSetValue('detailTopForm', 'deptCodeNm', data.deptCodeNm, 'text');  //부서명
        gf_FormSetValue('detailTopForm', 'upperDeptCode', data.upperDeptCode, 'text');   //상위부서코드
        gf_FormSetValue('detailTopForm', 'upperDeptCodeNm', data.upperDeptCodeNm, 'text');  //상위부서명
        gf_FormSetValue('detailTopForm', 'hdadptDeptCode', data.hdadptDeptCode, 'text');  //겸임 부서 코드
        gf_FormSetValue('detailTopForm', 'hdadptDeptCodeNm', data.hdadptDeptCodeNm, 'text');  //겸임 부서 명칭
        gf_FormSetValue('detailTopForm', 'dispDeptCode', data.dispDeptCode, 'text');  //파견 부서 코드  dispDeptCode
        gf_FormSetValue('detailTopForm', 'dispDeptCodeNm', data.dispDeptCodeNm, 'text');  //파견 부서 명칭 dispDeptCodeNm
        gf_FormSetValue('detailTopForm', 'photoAtchmnflNo', data.photoAtchmnflNo, 'text');  //사진 경로   data.photoAtchmnflNo
		gf_FormSetValue('detailTopForm', 'curClsfEmplmnday', data.curClsfEmplmnday, 'text');  // 현직금 임용일
		gf_FormSetValue('detailTopForm', 'detailComboRetireSe', data.retireSe, 'combo');  // 퇴직사유
		
		console.log(data);        

        //null 이면 달력에 금일 설정
        var nowDate = gf_Date2StrDisplayFormat(new Date());
        if(gf_IsNull(data.ecnyDe)) dhxInputCalendarGnfdBeginDe.setDate(nowDate);  //입사일 달력
        if(gf_IsNull(data.retireDe)) dhxInputCalendarGnfdEndDe.setDate(nowDate);    //퇴사일 달력
        if(gf_IsNull(data.brthdy)) dhxCCalendarBrthDy.setDate(nowDate);          // 생일 달력
        
        g_MainSearchValue.g_empPhoto = gf_SetNullInit(data.photoAtchmnflNo,"");
        g_MainSearchValue.g_empno = gf_SetNullInit(data.empno,"");
        g_MainSearchValue.g_korNm = gf_SetNullInit(data.korNm,"");
        g_MainSearchValue.g_engNm = gf_SetNullInit(data.engNm,"");
        g_MainSearchValue.g_chcrtNm = gf_SetNullInit(data.chcrtNm,"");
        g_MainSearchValue.g_ihidnum = gf_SetNullInit(data.ihidnum,"");
        g_MainSearchValue.g_SexdstnSe = gf_SetNullInit(data.sexdstnSe,"");
        g_MainSearchValue.g_brthdy = gf_SetNullInit(data.brthdy,"");
        g_MainSearchValue.g_SlrcldAt = gf_SetNullInit(data.slrcldAt,"");
        g_MainSearchValue.g_HffsSe = gf_SetNullInit(data.hffsSe,"");
        g_MainSearchValue.g_EmplSe = gf_SetNullInit(data.emplSe,"");
        g_MainSearchValue.g_DtyCode = gf_SetNullInit(data.dtyCode,"");
        g_MainSearchValue.g_OfcpsCode = gf_SetNullInit(data.ofcpsCode,"");
        g_MainSearchValue.g_ClsfCode = gf_SetNullInit(data.clsfCode,"");
        g_MainSearchValue.g_SrclsCode = gf_SetNullInit(data.srclsCode,"");
        g_MainSearchValue.g_JssfcCode = gf_SetNullInit(data.jssfcCode,"");
        g_MainSearchValue.g_MhsRspofcCode = gf_SetNullInit(data.rspofcCode,"");
        g_MainSearchValue.g_deptCode = gf_SetNullInit(data.deptCode,"");
        g_MainSearchValue.g_deptCodeNm = gf_SetNullInit(data.deptCodeNm,"");
        g_MainSearchValue.g_upperDeptCode = gf_SetNullInit(data.upperDeptCode,"");
        g_MainSearchValue.g_upperDeptCodeNm = gf_SetNullInit(data.upperDeptCodeNm,"");
        g_MainSearchValue.g_ecnyDe = gf_SetNullInit(data.ecnyDe,"");
        g_MainSearchValue.g_hdadptDeptCode = gf_SetNullInit(data.hdadptDeptCode,"");
        g_MainSearchValue.g_hdadptDeptCodeNm = gf_SetNullInit(data.hdadptDeptCodeNm,"");
        g_MainSearchValue.g_dispDeptCode = gf_SetNullInit(data.dispDeptCode,"");
        g_MainSearchValue.g_dispDeptCodeNm = gf_SetNullInit(data.dispDeptCodeNm,"");
        g_MainSearchValue.g_retireDe = gf_SetNullInit(data.retireDe,"");        
        g_MainSearchValue.g_bplcCode = gf_SetNullInit(data.bplcCode,"");
		g_MainSearchValue.g_curClsfEmplmnday = gf_SetNullInit(data.curClsfEmplmnday,"");
 		g_MainSearchValue.g_retireSe = gf_SetNullInit(data.retireSe,"");
        
        if(data.photoAtchmnflNo != ""){
        	$('#empPhoto').html('<img src="'+gv_ServerApiUrl+'/file/down?atchFileId='+g_MainSearchValue.g_empPhoto+'" width="100px" height="120px" onerror="this.onerror=null; this.style.display=\'none\'" alt="' + g_MainSearchValue.g_korNm + ' (' + g_MainSearchValue.g_empno + ')" title="' + g_MainSearchValue.g_korNm + ' (' + g_MainSearchValue.g_empno + ')">');
        }
        else {
        	$('#empPhoto').html("");
        }
        // 상단 기본정보 끝
        
        
        
        // Tab 1
        g_Tab1SelectValue.lxtnTelno = "";
        g_Tab1SelectValue.mbtlnum = "";
        g_Tab1SelectValue.ownhomTelno = "";
        g_Tab1SelectValue.email = "";
        g_Tab1SelectValue.indvdlEmail = "";
        g_Tab1SelectValue.mrrgAt = "";
        g_Tab1SelectValue.mrrgDe = "";
        g_Tab1SelectValue.emgncTelno = "";
        g_Tab1SelectValue.lastAcdncrCode = "";
        g_Tab1SelectValue.lastSchulNm = "";
        g_Tab1SelectValue.lastPromtDe = "";
        g_Tab1SelectValue.lastSalclsupDe = "";
        g_Tab1SelectValue.layoffSeCode = "";
        g_Tab1SelectValue.zip = "";
        g_Tab1SelectValue.ownhomAdres = "";
        g_Tab1SelectValue.ownhomDetailAdres = "";
        g_Tab1SelectValue.bornZip = "";
        g_Tab1SelectValue.bornAdres = "";
        g_Tab1SelectValue.bornDetailAdres = "";
        g_Tab1SelectValue.salaryPymntAt = "1";
        g_Tab1SelectValue.retireExcclcDe = "";
        g_Tab1SelectValue.cashierAt = "";
        g_Tab1SelectValue.retireAnntyKindCode = "";
        g_Tab1SelectValue.incmtaxrtCode = "";
        g_Tab1SelectValue.salaryAprpCode = "";
        g_Tab1SelectValue.babyShrtenWorkAt = "";
        g_Tab1SelectValue.lbunSbscrbAt = "";
        g_Tab1SelectValue.mutaidSbscrbAt = "";
        
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1lxtnTelno', data.lxtnTelno, 'text');  // 내선전화번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1Mbtlnum', data.mbtlnum, 'text');  // 휴대폰번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1OwnhomTelno', data.ownhomTelno, 'text');  // 자택전화번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1Email', data.email, 'text');  // 이메일(사내)
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1IndvdlEmail', data.indvdlEmail, 'text');  // 이메일(개인)
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1MrrgAt', data.mrrgAt, 'combo');  //결혼여부
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1MrrgDe', data.mrrgDe, 'text');  // 결혼일자
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1EmgncTelno', data.emgncTelno, 'text');  // 비상연락처
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastAcdncrCode', data.lastAcdncrCode, 'combo');  // 최종학력
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastSchulNm', data.lastSchulNm, 'text');  // 최종학교
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastPromtDe', data.lastPromtDe, 'text');  // 최종승급일
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastSalclsupDe', data.lastSalclsupDe, 'text');  // 최종승호일
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LayoffSeCode', data.layoffSeCode, 'combo');  // 휴직구분
        gf_FormSetValue('saveFormEmp_Tab1', 'zip', data.zip, 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'ownhomAdres', data.ownhomAdres, 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'ownhomDetailAdres', data.ownhomDetailAdres, 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'bornZip', data.bornZip, 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'bornAdres', data.bornAdres, 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'bornDetailAdres', data.bornDetailadres, 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1SalaryPymntAt', data.salaryPymntAt, 'combo');  // 급여지급
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1RetireExcclcDe', data.retireExcclcDe, 'text');  // 퇴직금중간정산일자
        if(data.cashierAt == "1") {
        	//gf_FormSetValue('saveFormEmp_Tab1', 'tab1CashierAt', data.cashierAt, 'radio');  // 출납업무
        	$("#saveFormEmp_Tab1 input[name='tab1CashierAt']:input[value='1']").prop("checked", true);  // 출납업무
        } else {
        	$("#saveFormEmp_Tab1 input[name='tab1CashierAt']:input[value='1']").prop("checked", false);  // 출납업무
        }
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1RetireAnntyKindCode', data.retireAnntyKindCode, 'combo');  // 퇴직연금
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1IncmtaxrtCode', data.incmtaxrtCode, 'combo');  // 소득세율선택
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1SalaryAprpCode', data.salaryAprpCode, 'combo');  // 급여보수체계
        if(data.babyShrtenWorkAt == "1") {
        	//gf_FormSetValue('saveFormEmp_Tab1', 'tab1BabyShrtenWorkAt', data.babyShrtenWorkAt, 'radio');  // 육아단축근무여부
        	$("#saveFormEmp_Tab1 input[name='tab1BabyShrtenWorkAt']:input[value='1']").prop("checked", true);  // 육아단축근무여부
        } else {
        	$("#saveFormEmp_Tab1 input[name='tab1BabyShrtenWorkAt']:input[value='1']").prop("checked", false);  // 육아단축근무여부
        }
        if(data.lbunSbscrbAt == "1") {
        	//gf_FormSetValue('saveFormEmp_Tab1', 'tab1LbunSbscrbAt', data.lbunSbscrbAt, 'radio');  // 노조가입
        	$("#saveFormEmp_Tab1 input[name='tab1LbunSbscrbAt']:input[value='1']").prop("checked", true);  // 노조가입
        } else {
        	$("#saveFormEmp_Tab1 input[name='tab1LbunSbscrbAt']:input[value='1']").prop("checked", false);  // 노조가입
        }
        if(data.mutaidSbscrbAt == "1") {
        	//gf_FormSetValue('saveFormEmp_Tab1', 'tab1MutaidSbscrbAt', data.mutaidSbscrbAt, 'radio');  // 상조가입
        	$("#saveFormEmp_Tab1 input[name='tab1MutaidSbscrbAt']:input[value='1']").prop("checked", true);  // 상조가입
        } else {
        	$("#saveFormEmp_Tab1 input[name='tab1MutaidSbscrbAt']:input[value='1']").prop("checked", false);  // 상조가입
        }
        
        //null 이면 달력에 금일 설정
        if(gf_IsNull(data.mrrgDe)) dhxCCalendarTab1MrrgDe.setDate(nowDate);  //결혼일자 달력
        //if(gf_IsNull(data.lastPromtDe)) dhxCCalendarTab1LastPromtDe.setDate(nowDate);    //최종승급일 달력
        //if(gf_IsNull(data.lastSalclsupDe)) dhxCCalendarTab1LastSalclsupDe.setDate(nowDate);          // 최종승호일 달력
        //if(gf_IsNull(data.retireExcclcDe)) dhxCCalendarTab1RetireExcclcDe.setDate(nowDate);          // 퇴직금중간정산일자 달력
        
        g_Tab1SelectValue.lxtnTelno = gf_SetNullInit(data.lxtnTelno,"");
        g_Tab1SelectValue.mbtlnum = gf_SetNullInit(data.mbtlnum,"");
        g_Tab1SelectValue.ownhomTelno = gf_SetNullInit(data.ownhomTelno,"");
        g_Tab1SelectValue.email = gf_SetNullInit(data.email,"");
        g_Tab1SelectValue.indvdlEmail = gf_SetNullInit(data.indvdlEmail,"");
        g_Tab1SelectValue.mrrgAt = gf_SetNullInit(data.mrrgAt,"");
        g_Tab1SelectValue.mrrgDe = gf_SetNullInit(data.mrrgDe,"");
        g_Tab1SelectValue.emgncTelno = gf_SetNullInit(data.emgncTelno,"");
        g_Tab1SelectValue.lastAcdncrCode = gf_SetNullInit(data.lastAcdncrCode,"");
        g_Tab1SelectValue.lastSchulNm = gf_SetNullInit(data.lastSchulNm,"");
        g_Tab1SelectValue.lastPromtDe = gf_SetNullInit(data.lastPromtDe,"");
        g_Tab1SelectValue.lastSalclsupDe = gf_SetNullInit(data.lastSalclsupDe,"");
        g_Tab1SelectValue.layoffSeCode = gf_SetNullInit(data.layoffSeCode,"");
        g_Tab1SelectValue.zip = gf_SetNullInit(data.zip,"");
        g_Tab1SelectValue.ownhomAdres = gf_SetNullInit(data.ownhomAdres,"");
        g_Tab1SelectValue.ownhomDetailAdres = gf_SetNullInit(data.ownhomDetailAdres,"");
        g_Tab1SelectValue.bornZip = gf_SetNullInit(data.bornZip,"");
        g_Tab1SelectValue.bornAdres = gf_SetNullInit(data.bornAdres,"");
        g_Tab1SelectValue.bornDetailAdres = gf_SetNullInit(data.bornDetailAdres,"");
        g_Tab1SelectValue.salaryPymntAt = gf_SetNullInit(data.salaryPymntAt,"");
        g_Tab1SelectValue.retireExcclcDe = gf_SetNullInit(data.retireExcclcDe,"");
        g_Tab1SelectValue.cashierAt = gf_SetNullInit(data.cashierAt,"");
        g_Tab1SelectValue.retireAnntyKindCode = gf_SetNullInit(data.retireAnntyKindCode,"");
        g_Tab1SelectValue.incmtaxrtCode = gf_SetNullInit(data.incmtaxrtCode,"");
        g_Tab1SelectValue.salaryAprpCode = gf_SetNullInit(data.salaryAprpCode,"");
        g_Tab1SelectValue.babyShrtenWorkAt = gf_SetNullInit(data.babyShrtenWorkAt,"");
        g_Tab1SelectValue.lbunSbscrbAt = gf_SetNullInit(data.lbunSbscrbAt,"");
        g_Tab1SelectValue.mutaidSbscrbAt = gf_SetNullInit(data.mutaidSbscrbAt,"");
    } else {
        //$('#btnSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};

//--부서 입력 후 Enter 이벤트 : 우측 상단 상세 화면
function fn_SearchMhsEmpDetailDeptCode(gubun){
	var deptCode = "";
	var deptKorNm = "";
	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
	var strCallback = "";
	
	if(gubun == "deptCode"){
		//deptCode = gf_FormGetValue('detailTopForm', 'deptCode', 'text');
		deptCode = "";
		deptKorNm = gf_FormGetValue('detailTopForm', 'deptCodeNm', 'text');
		strCallback = "fn_CallbackSearchMhsEmpDetailDeptCode";
	} else if(gubun == "hdadptDeptCode"){
		//deptCode = gf_FormGetValue('detailTopForm', 'hdadptDeptCode', 'text');
		deptCode = "";
		deptKorNm = gf_FormGetValue('detailTopForm', 'hdadptDeptCodeNm', 'text');
		strCallback = "fn_CallbackSearchMhsEmpDetailHdadptDeptCode";
	} else if(gubun == "dispDeptCode"){
		//deptCode = gf_FormGetValue('detailTopForm', 'dispDeptCode', 'text');
		deptCode = "";
		deptKorNm = gf_FormGetValue('detailTopForm', 'dispDeptCodeNm', 'text');
		strCallback = "fn_CallbackSearchMhsEmpDetailDispDeptCode";
	}
	
	var jsonParameter = {
			deptCode : deptCode,
			deptKorNm : deptKorNm,
			useAt : '1',
			bplcCode : stmBizplcCode
	};
	
	gf_Transaction('title_box', 'dept/searchDeptCode', jsonParameter, strCallback, false, 'GET');
};
function fn_CallbackSearchMhsEmpDetailDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('detailTopForm', 'deptCode', data.deptCode, 'text');
   		gf_FormSetValue('detailTopForm', 'deptCodeNm', data.deptKorNm, 'text');
   		//상위
   		gf_FormSetValue('detailTopForm', 'upperDeptCode', data.upperDeptCode, 'text');
   		gf_FormSetValue('detailTopForm', 'upperDeptCodeNm', data.upperDeptNm, 'text');   // upperDeptEngNm
    } 
    else {
    	//Popup 호출
    	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
    	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
    	gf_DeptPopup("detailTopForm","deptCode","deptCodeNm", stmBizplcCode, "Y", "fn_CallbackSearchMhsEmpDetailDeptCodePopup");
    }
};
function fn_CallbackSearchMhsEmpDetailHdadptDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('detailTopForm', 'hdadptDeptCode', data.deptCode, 'text');
   		gf_FormSetValue('detailTopForm', 'hdadptDeptCodeNm', data.deptKorNm, 'text');
    } 
    else {
    	//Popup 호출
    	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
    	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
    	gf_DeptPopup("detailTopForm","hdadptDeptCode","hdadptDeptCodeNm", stmBizplcCode, "Y", "fn_CallbackDeptPopup");
    }
};
function fn_CallbackSearchMhsEmpDetailDispDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('detailTopForm', 'dispDeptCode', data.deptCode, 'text');
   		gf_FormSetValue('detailTopForm', 'dispDeptCodeNm', data.deptKorNm, 'text');
    } 
    else {
    	//Popup 호출
    	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
    	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
    	gf_DeptPopup("detailTopForm","dispDeptCode","dispDeptCodeNm", stmBizplcCode, "Y", "fn_CallbackDeptPopup");
    }
};
function fn_CallbackSearchMhsEmpDetailDeptCodePopup (data) {
	if(typeof data.deptCode != "undefined" && data.deptCode != null && data.deptCode != ""){
		gf_FormSetValue('detailTopForm', 'deptCode', data.deptCode, 'text');
		gf_FormSetValue('detailTopForm', 'deptCodeNm', data.deptKorNm, 'text');   //data.deptEngNm 	= 부서 영문 명
		gf_FormSetValue('detailTopForm', 'upperDeptCode', data.upperDeptCode, 'text');
		gf_FormSetValue('detailTopForm', 'upperDeptCodeNm', data.upperDeptNm, 'text');    // upperDeptEngNm
	}
};


//Tab 1 관련

//Tab1 초기화
var cf_InitTab1Form  = function (Gubun){
	if(Gubun == "New"){  //신규 초기화
		g_Tab1SelectValue.lxtnTelno = "";
        g_Tab1SelectValue.mbtlnum = "";
        g_Tab1SelectValue.ownhomTelno = "";
        g_Tab1SelectValue.email = "";
        g_Tab1SelectValue.indvdlEmail = "";
        g_Tab1SelectValue.mrrgAt = "";
        g_Tab1SelectValue.mrrgDe = "";
        g_Tab1SelectValue.emgncTelno = "";
        g_Tab1SelectValue.lastAcdncrCode = "";
        g_Tab1SelectValue.lastSchulNm = "";
        g_Tab1SelectValue.lastPromtDe = "";
        g_Tab1SelectValue.lastSalclsupDe = "";
        g_Tab1SelectValue.layoffSeCode = "";
        g_Tab1SelectValue.zip = "";
        g_Tab1SelectValue.ownhomAdres = "";
        g_Tab1SelectValue.ownhomDetailAdres = "";
        g_Tab1SelectValue.bornZip = "";
        g_Tab1SelectValue.bornAdres = "";
        g_Tab1SelectValue.bornDetailAdres = "";
        g_Tab1SelectValue.salaryPymntAt = "1";
        g_Tab1SelectValue.retireExcclcDe = "";
        g_Tab1SelectValue.cashierAt = "";
        g_Tab1SelectValue.retireAnntyKindCode = "";
        g_Tab1SelectValue.incmtaxrtCode = "";
        g_Tab1SelectValue.salaryAprpCode = "";
        g_Tab1SelectValue.babyShrtenWorkAt = "";
        g_Tab1SelectValue.lbunSbscrbAt = "";
        g_Tab1SelectValue.mutaidSbscrbAt = "";
        
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1lxtnTelno', "", 'text');  // 내선전화번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1Mbtlnum', "", 'text');  // 휴대폰번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1OwnhomTelno', "", 'text');  // 자택전화번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1Email', "", 'text');  // 이메일(사내)
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1IndvdlEmail', "", 'text');  // 이메일(개인)
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1MrrgAt', "", 'combo');  //결혼여부
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1MrrgDe', "", 'text');  // 결혼일자
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1EmgncTelno', "", 'text');  // 비상연락처
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastAcdncrCode', "", 'combo');  // 최종학력
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastSchulNm', "", 'text');  // 최종학교
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastPromtDe', "", 'text');  // 최종승급일
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastSalclsupDe', "", 'text');  // 최종승호일
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LayoffSeCode', "", 'combo');  // 휴직구분
        gf_FormSetValue('saveFormEmp_Tab1', 'zip', "", 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'ownhomAdres', "", 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'ownhomDetailAdres', "", 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'bornZip', "", 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'bornAdres', "", 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'bornDetailAdres', "", 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1SalaryPymntAt', "1", 'combo');  // 급여지급
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1RetireExcclcDe', "", 'text');  // 퇴직금중간정산일자
        //gf_FormSetValue('saveFormEmp_Tab1', 'tab1CashierAt', "", 'radio');  // 출납업무
        $("#saveFormEmp_Tab1 input[name='tab1CashierAt']:input[value='1']").prop("checked", false);  // 출납업무
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1RetireAnntyKindCode', "", 'combo');  // 퇴직연금
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1IncmtaxrtCode', "", 'combo');  // 소득세율선택
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1SalaryAprpCode', "", 'combo');  // 급여보수체계
        //gf_FormSetValue('saveFormEmp_Tab1', 'tab1BabyShrtenWorkAt', "", 'radio');  // 육아단축근무여부
        $("#saveFormEmp_Tab1 input[name='tab1BabyShrtenWorkAt']:input[value='1']").prop("checked", false);  // 육아단축근무여부
        //gf_FormSetValue('saveFormEmp_Tab1', 'tab1LbunSbscrbAt', "", 'radio');  // 노조가입
        $("#saveFormEmp_Tab1 input[name='tab1LbunSbscrbAt']:input[value='1']").prop("checked", false);  // 노조가입
        //gf_FormSetValue('saveFormEmp_Tab1', 'tab1MutaidSbscrbAt', "", 'radio');  // 상조가입
        $("#saveFormEmp_Tab1 input[name='tab1MutaidSbscrbAt']:input[value='1']").prop("checked", false);  // 상조가입
	    
	    //달력 금일로 세팅
	    //var nowDate = gf_Date2StrDisplayFormat(new Date());
	    //dhxCCalendarTab1LastPromtDe.setDate(nowDate);       // 최종승급일 달력
	    //dhxCCalendarTab1LastSalclsupDe.setDate(nowDate);    // 최종승호일 달력
	    //dhxCCalendarTab1RetireExcclcDe.setDate(nowDate);    // 퇴직금중간정산일자 달력
	}
	else {  //원 정보로 초기화
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1lxtnTelno', g_Tab1SelectValue.lxtnTelno, 'text');  // 내선전화번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1Mbtlnum', g_Tab1SelectValue.mbtlnum, 'text');  // 휴대폰번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1OwnhomTelno', g_Tab1SelectValue.ownhomTelno, 'text');  // 자택전화번호
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1Email', g_Tab1SelectValue.email, 'text');  // 이메일(사내)
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1IndvdlEmail', g_Tab1SelectValue.indvdlEmail, 'text');  // 이메일(개인)
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1MrrgAt', g_Tab1SelectValue.mrrgAt, 'combo');  //결혼여부
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1MrrgDe', g_Tab1SelectValue.mrrgDe, 'text');  // 결혼일자
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1EmgncTelno', g_Tab1SelectValue.emgncTelno, 'text');  // 비상연락처
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastAcdncrCode', g_Tab1SelectValue.lastAcdncrCode, 'combo');  // 최종학력
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastSchulNm', g_Tab1SelectValue.lastSchulNm, 'text');  // 최종학교
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastPromtDe', g_Tab1SelectValue.lastPromtDe, 'text');  // 최종승급일
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LastSalclsupDe', g_Tab1SelectValue.lastSalclsupDe, 'text');  // 최종승호일
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1LayoffSeCode', g_Tab1SelectValue.layoffSeCode, 'combo');  // 휴직구분
        gf_FormSetValue('saveFormEmp_Tab1', 'zip', g_Tab1SelectValue.zip, 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'ownhomAdres', g_Tab1SelectValue.ownhomAdres, 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'ownhomDetailAdres', g_Tab1SelectValue.ownhomDetailAdres, 'text');  // 현주소
        gf_FormSetValue('saveFormEmp_Tab1', 'bornZip', g_Tab1SelectValue.bornZip, 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'bornAdres', g_Tab1SelectValue.bornAdres, 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'bornDetailAdres', g_Tab1SelectValue.bornDetailAdres, 'text');  // 본적
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1SalaryPymntAt', g_Tab1SelectValue.salaryPymntAt, 'combo');  // 급여지급
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1RetireExcclcDe', g_Tab1SelectValue.retireExcclcDe, 'text');  // 퇴직금중간정산일자
        if(g_Tab1SelectValue.cashierAt == "1") {
        	//gf_FormSetValue('saveFormEmp_Tab1', 'tab1CashierAt', g_Tab1SelectValue.cashierAt, 'radio');  // 출납업무
        	$("#saveFormEmp_Tab1 input[name='tab1CashierAt']:input[value='1']").prop("checked", true);  // 출납업무
        } else {
        	$("#saveFormEmp_Tab1 input[name='tab1CashierAt']:input[value='1']").prop("checked", false);  // 출납업무
        }
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1RetireAnntyKindCode', g_Tab1SelectValue.retireAnntyKindCode, 'combo');  // 퇴직연금
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1IncmtaxrtCode', g_Tab1SelectValue.incmtaxrtCode, 'combo');  // 소득세율선택
        gf_FormSetValue('saveFormEmp_Tab1', 'tab1SalaryAprpCode', g_Tab1SelectValue.salaryAprpCode, 'combo');  // 급여보수체계
        if(g_Tab1SelectValue.babyShrtenWorkAt == "1") {
        	//gf_FormSetValue('saveFormEmp_Tab1', 'tab1BabyShrtenWorkAt', g_Tab1SelectValue.babyShrtenWorkAt, 'radio');  // 육아단축근무여부
        	$("#saveFormEmp_Tab1 input[name='tab1BabyShrtenWorkAt']:input[value='1']").prop("checked", true);  // 육아단축근무여부
        } else {
        	$("#saveFormEmp_Tab1 input[name='tab1BabyShrtenWorkAt']:input[value='1']").prop("checked", false);  // 육아단축근무여부
        }
        if(g_Tab1SelectValue.lbunSbscrbAt == "1") {
        	//gf_FormSetValue('saveFormEmp_Tab1', 'tab1LbunSbscrbAt', g_Tab1SelectValue.lbunSbscrbAt, 'radio');  // 노조가입
        	$("#saveFormEmp_Tab1 input[name='tab1LbunSbscrbAt']:input[value='1']").prop("checked", true);  // 노조가입
        } else {
        	$("#saveFormEmp_Tab1 input[name='tab1LbunSbscrbAt']:input[value='1']").prop("checked", false);  // 노조가입
        }
        if(g_Tab1SelectValue.mutaidSbscrbAt == "1") {
        	//gf_FormSetValue('saveFormEmp_Tab1', 'tab1MutaidSbscrbAt', g_Tab1SelectValue.mutaidSbscrbAt, 'radio');  // 상조가입
        	$("#saveFormEmp_Tab1 input[name='tab1MutaidSbscrbAt']:input[value='1']").prop("checked", true);  // 상조가입
        } else {
        	$("#saveFormEmp_Tab1 input[name='tab1MutaidSbscrbAt']:input[value='1']").prop("checked", false);  // 상조가입
        }
	}
};
//Tab1 저장
var cf_SaveTab1  = function (){
	//필수 체크
	
	var vIndvdlInfoChk = "N"; // 개인정보 테이블 수정 여부
	//개인정보 테이블에 저장 할 내용 있는지 확인 : 결혼일자, 본적()
	if(g_Tab1SaveValue.mrrgDe != g_Tab1SelectValue.mrrgDe || g_Tab1SaveValue.bornZip != g_Tab1SelectValue.bornZip ||  g_Tab1SaveValue.bornAdres != g_Tab1SelectValue.bornAdres || g_Tab1SaveValue.bornDetailAdres != g_Tab1SelectValue.bornDetailAdres) {
		vIndvdlInfoChk = "Y";
	}
	else { vIndvdlInfoChk = "N"; }
	/*//자기 화면에서 수정 :  : 개인정보 이지만 수정하면 반영 됨 : 최종승급일, 최종승호일, 휴직구분, 퇴직금중간정산일자
	if(g_Tab1SaveValue.lastPromtDe != g_Tab1SelectValue.lastPromtDe || g_Tab1SaveValue.lastSalclsupDe != g_Tab1SelectValue.lastSalclsupDe || 
			g_Tab1SaveValue.layoffSeCode != g_Tab1SelectValue.layoffSeCode || g_Tab1SaveValue.retireExcclcDe != g_Tab1SelectValue.retireExcclcDe) {
		//
	}*/
	/*//자기 화면에서 수정 : 개인정보 이지만 학력에서 수정하면 반영 됨
	if(g_Tab1SaveValue.lastAcdncrCode != g_Tab1SelectValue.lastAcdncrCode || g_Tab1SaveValue.lastSchulNm != g_Tab1SelectValue.lastSchulNm) {
		//
	}*/
	
	var jsonParameter = {
	        empno : g_Tab1SaveValue.empno,
	        bplcCode : g_Tab1SaveValue.bplcCode,

	        lxtnTelno : g_Tab1SaveValue.lxtnTelno,  // 내선전화번호
	        mbtlnum : g_Tab1SaveValue.mbtlnum,  // 휴대폰번호
	        ownhomTelno : g_Tab1SaveValue.ownhomTelno,  // 자택전화번호
	        email : g_Tab1SaveValue.email,  // 이메일(사내)
	        indvdlEmail : g_Tab1SaveValue.indvdlEmail,  // 이메일(개인)
	        mrrgAt : g_Tab1SaveValue.mrrgAt,  //결혼여부
	        mrrgDe : g_Tab1SaveValue.mrrgDe.replaceAll('-',''), //결혼일자
	        emgncTelno : g_Tab1SaveValue.emgncTelno,  // 비상연락처
	        //lastAcdncrCode : g_Tab1SaveValue.lastAcdncrCode,   // 최종학력
	        //lastSchulNm : g_Tab1SaveValue.lastSchulNm,  // 최종학교
	        //lastPromtDe : g_Tab1SaveValue.lastPromtDe,   // 최종승급일
	        //lastSalclsupDe : g_Tab1SaveValue.lastSalclsupDe,   // 최종승호일
	        //layoffSeCode : g_Tab1SaveValue.layoffSeCode,  // 휴직구분
	        zip : g_Tab1SaveValue.zip,  // 현주소
	        ownhomAdres : g_Tab1SaveValue.ownhomAdres,  // 현주소
	        ownhomDetailAdres : g_Tab1SaveValue.ownhomDetailAdres, // 현주소
	        bornZip : g_Tab1SaveValue.bornZip,   // 본적
	        bornAdres : g_Tab1SaveValue.bornAdres,   // 본적
	        bornDetailAdres : g_Tab1SaveValue.bornDetailAdres,   // 본적
	        salaryPymntAt : g_Tab1SaveValue.salaryPymntAt,  // 급여지급
	        //retireExcclcDe : g_Tab1SaveValue.retireExcclcDe,  // 퇴직금중간정산일자
	        cashierAt : g_Tab1SaveValue.cashierAt, // 출납업무
	        retireAnntyKindCode : g_Tab1SaveValue.retireAnntyKindCode,  // 퇴직연금
	        incmtaxrtCode : g_Tab1SaveValue.incmtaxrtCode,  // 소득세율선택
	        salaryAprpCode : g_Tab1SaveValue.salaryAprpCode,  // 급여보수체계
	        babyShrtenWorkAt : g_Tab1SaveValue.babyShrtenWorkAt,  // 육아단축근무여부
	        lbunSbscrbAt : g_Tab1SaveValue.lbunSbscrbAt,  // 노조가입
	        mutaidSbscrbAt : g_Tab1SaveValue.mutaidSbscrbAt,  // 상조가입
	        
	        indvdlInfoChk : vIndvdlInfoChk
	    };

	    var url = "mhshrb001/modifyMhsEmpBase";  
	    var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
	    if(dataSource.code === '000') {
            gf_DivMsgAlert(gv_MsgUpdate);

            fn_SearchInputMhsEmp();
	    }
};

//Tab 4


//첨부파일 : 조회만 하는 파일 뷰
var fn_FileUploadPopUpRward = function(atchmnfl){
	//var atchmnfl = gf_DhxGetValue(dhxGridMhsEmpRward, rowId, 'atchmnflNo', 'grid');
	var outputsFileKeyArr = gf_IsNull(atchmnfl) ? [] : atchmnfl.split('|');  
	
	gf_FileUploadPopup(
			 '', 
			 '', 
			 '', 
			 '', 
			 outputsFileKeyArr, 
			 [], 
			 0,
			 'all',
	         'gf_CallbackFileUploadRward',
	         'view');
};
var gf_CallbackFileUploadRward = function() {
	//빈 콜백
}

var g_TabNo = null;
var g_TabRowId = null;
//첨부파일 : 학력탭
var fn_FileUploadPopUpIframeOutputs = function(atchmnfl, rowId, tabNo){
	//var atchmnfl = gf_DhxGetValue(dhxGridMhsEmpRward, rowId, 'atchmnflNo', 'grid');
	var outputsFileKeyArr = gf_IsNull(atchmnfl) ? [] : atchmnfl.split('|');
	
	if(gf_IsNull(tabNo)){
		gf_DivMsgAlert("Tab번호가 불확실합니다.");
		return false;
	}
	g_TabNo = tabNo;

	gf_FileUploadPopup(
			 '', 
			 '', 
			 '', 
			 rowId, 
			 outputsFileKeyArr, 
			 [], 
			 0,
			 'all',
	         'gf_CallbackFileUploadIframe',
	         '');
};
var gf_CallbackFileUploadIframe = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){

	if(!gf_IsNull(data)){
		var idx = 0;
		var fileInfos = [];
		var atchFileList = [];
		var rtnFileKey = "";
		
		$.each( data, function( key, value ) {						
			fileInfos = value.split('|^|');			
			keyArr.push(fileInfos[0]);
			infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);
			if(gf_IsNull(rtnFileKey)){
				rtnFileKey = fileInfos[0];
			}
			else {
				rtnFileKey = rtnFileKey + "|" + fileInfos[0];
			}
		});
		
		var iframeObj =  null;
		
		if(g_TabNo == 7){
			iframeObj = tabbarMhsHrb001.tabs("a7").getAttachedObject();
		}
		else if(g_TabNo == 8){
			iframeObj = tabbarMhsHrb001.tabs("a8").getAttachedObject();
		}
		else if(g_TabNo == 9){
			iframeObj = tabbarMhsHrb001.tabs("a9").getAttachedObject();
		}
		else if(g_TabNo == 11){
			iframeObj = tabbarMhsHrb001.tabs("a11").getAttachedObject();
		}
		else if(g_TabNo == 12){
			iframeObj = tabbarMhsHrb001.tabs("a12").getAttachedObject();
		}
		
		iframeObj.contentWindow.fn_FileUploadPopUpTabReturn(dataDivId, rtnFileKey);
	}
};

//탭에서 자격증 조회
var fn_tabGridSearchCrqfsButton = function(atchmnfl, rowId, tabNo){
	if(gf_IsNull(tabNo)){
		gf_DivMsgAlert("Tab번호가 불확실합니다.");
		return false;
	}
	g_TabNo = tabNo;
	g_TabRowId = rowId;
	
	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
	
	gf_CrqfsPopup ("", "", "", stmBizplcCode, "Y", "fn_CallbacktabGridSearchCrqfsButton");
}
var fn_CallbacktabGridSearchCrqfsButton = function(){
	var iframeObj =  null;
	
	if(g_TabNo == 9){
		iframeObj = tabbarMhsHrb001.tabs("a9").getAttachedObject();
	}
	
	iframeObj.contentWindow.fn_CallbackGridSearchCrqfsButtonReturn(g_TabRowId, $crqfsInfo);
}

//공통코드
var fn_tabGridSearchComCodeButton = function(atchmnfl, rowId, tabNo, codeKind){
	if(gf_IsNull(tabNo)){
		gf_DivMsgAlert("Tab번호가 불확실합니다.");
		return false;
	}
	g_TabNo = tabNo;
	g_TabRowId = rowId;
	
	var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;

	gf_ComCodePopup ("", codeKind, "", "", stmBizplcCode, "Y", "fn_CallbacktabGridSearchComCodeButton");
}
var fn_CallbacktabGridSearchComCodeButton = function(){
	var iframeObj =  null;
	
	if(g_TabNo == 11){
		iframeObj = tabbarMhsHrb001.tabs("a11").getAttachedObject();
	}
	
	iframeObj.contentWindow.fn_CallbackGridSearchComCodeButtonReturn(g_TabRowId, $comCodeInfo);
}

var fn_CallbackDeptPopup = function(data){
	$(data.inputCodeId).val(data.deptCode);
	$(data.inputCodeNm).val(data.deptKorNm);
}
