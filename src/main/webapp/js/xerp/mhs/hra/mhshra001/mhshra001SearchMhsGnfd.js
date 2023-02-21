/**
 * 프로그램 : 발령관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.27
 * 사용테이블 : MHS_GNFD
 **/

var dhxGridMhsGnfd;
var dhxGridMhsGnfdListInfo;

var dhxComboBplcKorNm;
var dhxComboClsfCode;
var dhxComboGnfdSe;
var dhxInputFormGnfdSeCombo;
var dhxInputFormBfchgBplcCombo;
var dhxInputFormAfchgBplcCombo;
var dhxInputFormBfchgClsfCodeCombo;
var dhxInputFormAfchgClsfCodeCombo;
var dhxInputFormBfchgSrclsCodeCombo;
var dhxInputFormAfchgSrclsCodeCombo;
var dhxInputFormBfchgOfcpsCodeCombo;
var dhxInputFormAfchgOfcpsCodeCombo;
var dhxInputFormBfchgDutyCodeCombo;
var dhxInputFormAfchgDutyCodeCombo;


var empno = '';
var gnfdDe = '';
var gnfdSn = '';
var nowZoom = 100;

var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMhsGnfd = gf_LocaleTrans('default','titMhsGnfd');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MHSHRA001");
    zoomReset();
    var handle = $( "#custom-handle" );

    $( "#slider" ).slider({
    	 value: 100,
         min: 70,
         max: 200,
         step: 1,
         create: function() {
        	 handle.text( $( this ).slider( "value" ) );
         },
        slide: function( event, ui ) {
	        handle.text( ui.value );
	        nowZoom = ui.value;
	        zooms();
      }
    });

    // $( "#slider" ).slider();
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();

    var dhxInputCalendarGnfdDe = new dhtmlXCalendarObject({input:"gnfdDe", button:"startDateIcon"});
    dhxInputCalendarGnfdDe.loadUserLanguage("ko");
    dhxInputCalendarGnfdDe.hideTime();
    var dhxInputCalendarGnfdBeginDe = new dhtmlXCalendarObject({input:"gnfdBeginDe", button:"startDateIcon"});
    dhxInputCalendarGnfdBeginDe.loadUserLanguage("ko");
    dhxInputCalendarGnfdBeginDe.hideTime();
    var dhxInputCalendarGnfdEndDe = new dhtmlXCalendarObject({input:"gnfdEndDe", button:"endDateIcon"});
    dhxInputCalendarGnfdEndDe.loadUserLanguage("ko");
    dhxInputCalendarGnfdEndDe.hideTime();

    // 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('searchSregDt', 'searchEregDt'); 
    
    
    dhxComboBplcKorNm = gf_MakeDhxCombo(
    'divComboBplcKorNm',
    'searchFormMhsGnfd',
    150,
    'mhshrm001/searchStmBizplc',
    true,
    'bplcCode',
    'bplcKorNm',
    '',
    '');
    
    dhxComboClsfCode = gf_MakeDhxCombo(
    'divComboClsfCode',
    'searchFormMhsGnfd',
    150,
    'mhshrm004/searchMhsClsfCode',
    true,
    'clsfCode',
    'clsfNm',
    '',
    '');
    
    dhxComboGnfdSe = gf_MakeDhxCombo(
    'divComboGnfdSe',
    'searchFormMhsGnfd',
    150,
    'combo/searchStmCode?codekindCode=C257',
    true,
    'code',
    'codeNm',
    '',
    '');

    dhxInputFormGnfdSeCombo = gf_MakeDhxCombo(
    'divInputFormComboGnfdSeBox',
    'saveFormMhsGnfd',
    150,
    'combo/searchStmCode?codekindCode=C257',
    true,
    'code',
    'codeNm',
    '',
    '');
    //사업장 
    dhxInputFormBfchgBplcCombo = gf_MakeDhxCombo(
    'divInputFormComboBfchgBplcBox',
    'saveFormMhsGnfd',
    150,
    'mhshrm001/searchStmBizplc',
    true,
    'bplcCode',
    'bplcKorNm',
    '',
    '');
    dhxInputFormAfchgBplcCombo = gf_MakeDhxCombo(
    'divInputFormComboAfchgBplcBox',
    'saveFormMhsGnfd',
     150,
    'mhshrm001/searchStmBizplc',
    true,
    'bplcCode',
    'bplcKorNm',
    '',
    '');
    
    
    
    dhxInputFormBfchgClsfCodeCombo =  gf_MakeDhxCombo(
    'divInputFormComboBfchgClsfCodeBox',
    'saveFormMhsGnfd',
    150,
    'mhshrm004/searchMhsClsfCode',
    true,
    'clsfCode',
    'clsfNm',
    '',
    '');
    dhxInputFormAfchgClsfCodeCombo =  gf_MakeDhxCombo(
    'divInputFormComboAfchgClsfCodeBox',
    'saveFormMhsGnfd',
    150,
    'mhshrm004/searchMhsClsfCode',
    true,
    'clsfCode',
    'clsfNm',
    '',
    '');
    
    
    
    dhxInputFormBfchgSrclsCodeCombo = gf_MakeDhxCombo(
    'divInputFormComboBfchgSrclsCodeBox',
    'saveFormMhsGnfd',
    150,
    'combo/searchStmCode?codekindCode=C285',
     true,
    'code',
    'codeNm',
    '',
    '');
    dhxInputFormAfchgSrclsCodeCombo = gf_MakeDhxCombo(
    'divInputFormComboAfchgSrclsCodeBox',
    'saveFormMhsGnfd',
    150,
    'combo/searchStmCode?codekindCode=C285',
     true,
    'code',
    'codeNm',
    '',
    '');
    
    dhxInputFormBfchgOfcpsCodeCombo = gf_MakeDhxCombo(
    'divInputFormComboBfchgOfcpsCodeBox',
    'saveFormMhsGnfd',
    150,
    'combo/searchStmCode?codekindCode=C252',
     true,
    'code',
    'codeNm',
    '',
    '');
    
    dhxInputFormAfchgOfcpsCodeCombo = gf_MakeDhxCombo(
    'divInputFormComboAfchgOfcpsCodeBox',
    'saveFormMhsGnfd',
    150,
    'combo/searchStmCode?codekindCode=C252',
    true,
    'code',
    'codeNm',
    '',
    '');
    
    
    dhxInputFormBfchgJssfcCodeCombo = gf_MakeDhxCombo(
    'divInputFormComboBfchgJssfcCodeBox',
    'saveFormMhsGnfd',
    150,
    'combo/searchStmCode?codekindCode=C197',
     true,
    'code',
    'codeNm',
    '',
    '');
    
    dhxInputFormAfchgJssfcCodeCombo = gf_MakeDhxCombo(
    'divInputFormComboAfchgJssfcCodeBox',
    'saveFormMhsGnfd',
    150,
    'combo/searchStmCode?codekindCode=C197',
    true,
    'code',
    'codeNm',
    '',
    '');

    //발령전 담당업무
    dhxInputFormBfchgDutyCodeCombo  = gf_MakeDhxCombo(
    	    'divInputFormComboBfchgDutyCodeBox',
    	    'saveFormMhsGnfd',
    	    150,
    	    'combo/searchStmCode?codekindCode=C289',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    //발령후 담당업무
    dhxInputFormAfchgDutyCodeCombo = gf_MakeDhxCombo(
    	    'divInputFormComboAfchgDutyCodeBox',
    	    'saveFormMhsGnfd',
    	    150,
    	    'combo/searchStmCode?codekindCode=C289',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
};


var cf_SetComponents = function (){

    var dhxGridMhsGnfdListInfo = [];
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'btnSelect'), '50', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '0', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmplNo'), '80', 'center', 'str', 'ro', false, 'empno', '')); // 사원번호
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmplNm'), '80', 'center', 'str', 'ro', false, 'empNm', '')); // 사원번호
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdDe'), '0', 'center', 'str', 'ro', true, 'gnfdDe', '')); // 발령 일자
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdSn'), '0', 'center', 'str', 'ro', true, 'gnfdSn', '')); // 발령 순번
//    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdDtls'), '220', 'center', 'str', 'ro', false, 'gnfdDtls', '')); // 발령 내역
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdSe'), '110', 'center', 'str', 'ro', false, 'gnfdSe', '')); // 발령 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdDe'), '110', 'center', 'str', 'ro', false, 'gnfdDe', '')); // 발령 일자
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdBeginDe'), '110', 'center', 'str', 'ro', false, 'gnfdBeginDe', '')); // 발령 시작 일자
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdEndDe'), '110', 'center', 'str', 'ro', false, 'gnfdEndDe', '')); // 발령 종료 일자
/*  dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdSn'), '150', 'center', 'str', 'ro', false, 'gnfdSn', '')); // 발령 순번
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdNo'), '150', 'center', 'str', 'ro', false, 'gnfdNo', '')); // 발령 번호
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titProcessAt'), '150', 'center', 'na', 'ch', false, 'processAt', '')); // 처리 여부
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBfchgDeptCode'), '150', 'center', 'str', 'ro', false, 'bfchgDeptCode', '')); // 변경전 부서 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBfchgClsfCode'), '150', 'center', 'str', 'ro', false, 'bfchgClsfCode', '')); // 변경전 직급 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBfchgOfcpsCode'), '150', 'center', 'str', 'ro', false, 'bfchgOfcpsCode', '')); // 변경전 직위 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBfchgJssfcCode'), '150', 'center', 'str', 'ro', false, 'bfchgJssfcCode', '')); // 변경전 직종 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBfchgJblnCode'), '150', 'center', 'str', 'ro', false, 'bfchgJblnCode', '')); // 변경전 직렬 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBfchgSrclsCode'), '150', 'center', 'str', 'ro', false, 'bfchgSrclsCode', '')); // 변경전 호봉 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAfchgDeptCode'), '150', 'center', 'str', 'ro', false, 'afchgDeptCode', '')); // 변경후 부서 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAfchgClsfCode'), '150', 'center', 'str', 'ro', false, 'afchgClsfCode', '')); // 변경후 직급 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAfchgOfcpsCode'), '150', 'center', 'str', 'ro', false, 'afchgOfcpsCode', '')); // 변경후 직위 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAfchgJssfcCode'), '150', 'center', 'str', 'ro', false, 'afchgJssfcCode', '')); // 변경후 직종 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAfchgJblnCode'), '150', 'center', 'str', 'ro', false, 'afchgJblnCode', '')); // 변경후 직렬 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAfchgSrclsCode'), '150', 'center', 'str', 'ro', false, 'afchgSrclsCode', '')); // 변경후 호봉 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdBeginDe'), '150', 'center', 'str', 'ro', false, 'gnfdBeginDe', '')); // 발령 시작 일자
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdEndDe'), '150', 'center', 'str', 'ro', false, 'gnfdEndDe', '')); // 발령 종료 일자
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titHdadptDeptCode'), '150', 'center', 'str', 'ro', false, 'hdadptDeptCode', '')); // 겸임 부서 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titHdadptAt'), '150', 'center', 'na', 'ch', false, 'hdadptAt', '')); // 겸임 여부
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdDtls'), '220', 'center', 'str', 'ro', false, 'gnfdDtls', '')); // 발령 내역
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSanctnCode'), '150', 'center', 'str', 'ro', false, 'sanctnCode', '')); // 결재 코드
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSanctnNo'), '150', 'center', 'str', 'ro', false, 'sanctnNo', '')); // 결재 번호
    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGnfdSe'), '150', 'center', 'str', 'ro', false, 'gnfdSe', '')); // 발령 코드
*/    dhxGridMhsGnfdListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMhsGnfd = gf_MakeDhxGrid('dataList', dhxGridMhsGnfdListInfo, true, false, false);

    dhxGridMhsGnfd.enableAutoWidth(true);
    dhxGridMhsGnfd.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMhsGnfd.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMhsGnfd.attachEvent('onRowSelect', fn_SaveMhsGnfd);

    $("#saveFormMhsGnfd").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMhsGnfd input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMhsGnfd .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMhsGnfd .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    //조회
    $('#searchFormMhsGnfd #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });
    $('#searchFormMhsGnfd #btnZoomIn').unbind('click').bind('click', function(event){
    	zoomIn();
    });
    $('#searchFormMhsGnfd #btnZoomOut').unbind('click').bind('click', function(event){
    	zoomOut();
    });
    //발령전 부서코드
    $('#saveFormMhsGnfd #btnBfDeptCodeSearch').unbind('click').bind('click', function(event){
    	fn_DeptPopup("saveFormMhsGnfd","bfchgDeptCode","bfchgDeptNm");
    });
    //발령후 부서코드
    $('#saveFormMhsGnfd #btnAfDeptCodeSearch').unbind('click').bind('click', function(event){
    	fn_DeptPopup("saveFormMhsGnfd","afchgDeptCode","afchgDeptNm");
    });
    //겸임부서 부서코드
    $('#saveFormMhsGnfd #btnHdadptDeptCodeSearch').unbind('click').bind('click', function(event){
    	fn_DeptPopup("saveFormMhsGnfd","hdadptDeptCode","hdadptDeptNm");
    });
    //사원팝업
    $('#saveFormMhsGnfd #btnEmpSearch').unbind('click').bind('click', function(event){
    	fn_EmpPopup("saveFormMhsGnfd","empno","empNm");
    });
    //사원팝업
    $('#searchFormMhsGnfd #btnEmpSearch').unbind('click').bind('click', function(event){
    	fn_EmpPopup("searchFormMhsGnfd","empno","empNm");
    });
    
    
    

    $('.tdl-mhshra-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMhsGnfd.clearSelection();
          if(!fadeRegs) {
              $('#saveForm').fadeOut(gv_FadeTime, function() {
                  cf_InitInputForm();
                  fadeRegs = true;
                  fadeMode = false;
              });
              $('#saveForm').fadeIn(gv_FadeTime, function() {});
          } else {
              cf_InitInputForm();
          }
    });

    $('.tdl-mhshra-1 #btnRemove').unbind('click').bind('click', function() {
        var empnos = fn_CheckMhsGnfd('empno');
        var gnfdDes = fn_CheckMhsGnfd('gnfdDe');
        var gnfdSns = fn_CheckMhsGnfd('gnfdSn');
        if( gf_IsNull(empnos) && gf_IsNull(gnfdDes) && gf_IsNull(gnfdSns) ) {
             gf_DivMsgAlert(gv_MsgDelKey);
             return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAll()', '');
        }
    });

    $('.tdl-mhshra-2 #btnFormRemove').unbind('click').bind('click', function() {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
    });

    $('.tdl-1 #btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });

    $('.tdl-mhshra-2 #btnFormSave').unbind('click').bind('click', function() {

    	if($('#saveFormMhsGnfd').validate().form()){
        	var jsonParameter = {
                empno : gf_FormGetValue('saveFormMhsGnfd', 'empno', 'text'),
                gnfdDe : gf_FormGetValue('saveFormMhsGnfd', 'gnfdDe', 'text').replaceAll('-',''),
                gnfdSn : gf_FormGetValue('saveFormMhsGnfd', 'gnfdSn', 'text'),
                gnfdNo : gf_FormGetValue('saveFormMhsGnfd', 'gnfdNo', 'text'),
                gnfdCode : dhxInputFormGnfdSeCombo.getSelectedValue(),
                processAt : gf_FormGetValue('saveFormMhsGnfd', 'processAt', 'chkboxYN'),
                bfchgBplc : dhxInputFormBfchgBplcCombo.getSelectedValue(),
                afchgBplc : dhxInputFormAfchgBplcCombo.getSelectedValue(),
                bfchgDeptCode : gf_FormGetValue('saveFormMhsGnfd', 'bfchgDeptCode', 'text'),
                afchgDeptCode : gf_FormGetValue('saveFormMhsGnfd', 'afchgDeptCode', 'text'),
                bfchgClsfCode : dhxInputFormBfchgClsfCodeCombo.getSelectedValue(),
                afchgClsfCode : dhxInputFormAfchgClsfCodeCombo.getSelectedValue(),
                bfchgOfcpsCode : dhxInputFormBfchgOfcpsCodeCombo.getSelectedValue(),
                afchgOfcpsCode : dhxInputFormAfchgOfcpsCodeCombo.getSelectedValue(),
                bfchgJssfcCode : dhxInputFormBfchgJssfcCodeCombo.getSelectedValue(),
                afchgJssfcCode : dhxInputFormAfchgJssfcCodeCombo.getSelectedValue(),
                bfchgJblnCode : gf_FormGetValue('saveFormMhsGnfd', 'bfchgJblnCode', 'text'),
                afchgJblnCode : gf_FormGetValue('saveFormMhsGnfd', 'afchgJblnCode', 'text'),
                bfchgSrclsCode :dhxInputFormBfchgSrclsCodeCombo.getSelectedValue(),
                afchgSrclsCode : dhxInputFormAfchgSrclsCodeCombo.getSelectedValue(),
                bfchgDutyCode : dhxInputFormBfchgDutyCodeCombo.getSelectedValue(),
                afchgDutyCode : dhxInputFormAfchgDutyCodeCombo.getSelectedValue(),
                gnfdBeginDe : gf_FormGetValue('saveFormMhsGnfd', 'gnfdBeginDe', 'text').replaceAll('-',''),
                gnfdEndDe : gf_FormGetValue('saveFormMhsGnfd', 'gnfdEndDe', 'text').replaceAll('-',''),
                hdadptDeptCode : gf_FormGetValue('saveFormMhsGnfd', 'hdadptDeptCode', 'text'),
                hdadptAt : gf_FormGetValue('saveFormMhsGnfd', 'hdadptAt', 'chkboxYN'),
                gnfdDtls : gf_FormGetValue('saveFormMhsGnfd', 'gnfdDtls', 'textarea'),
                sanctnCode : gf_FormGetValue('saveFormMhsGnfd', 'sanctnCode', 'text'),
                sanctnNo : gf_FormGetValue('saveFormMhsGnfd', 'sanctnNo', 'text'),
            };

            var url;

            if( !gf_IsNull(empno) && !gf_IsNull(gnfdDe) && !gf_IsNull(gnfdSn) ) {
                url = "mhshra001/modifyMhsGnfd";
            } else {
                url = "mhshra001/saveMhsGnfd";
            }
            
            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(empno) && !gf_IsNull(gnfdDe) && !gf_IsNull(gnfdSn)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMhsGnfd div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMhsGnfd.forEachRow(function(rowId) {
            dhxGridMhsGnfd.cells(rowId,0).setChecked(checkAll);
        });
    });

    $('#btnFormReset').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchGridList();
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){

    empno = '';
    gnfdDe = '';
    gnfdSn = '';

    $("#h4_pr_title").text(titMhsGnfd + ' ' + gv_TitRegist);
    //$('#saveFormMhsGnfd input[name="empno"]').removeAttr("disabled");
   // $('#saveFormMhsGnfd input[name="empNm"]').removeAttr("disabled");
    $('#saveFormMhsGnfd #btnEmpSearch').show();
    $('#saveFormMhsGnfd input[name="gnfdDe"]').removeAttr("disabled");
    $('#saveFormMhsGnfd input[name="gnfdSn"]').removeAttr("disabled");
    $('.tdl-mhshra-2  #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMhsGnfd', 'empno', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'empNm', '', 'text');
    
    gf_FormSetValue('saveFormMhsGnfd', 'gnfdDe', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'gnfdSn', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'gnfdNo', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'gnfdCode', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'processAt', false, 'chkbox');
    gf_FormSetValue('saveFormMhsGnfd', 'bfchgDeptCode', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'bfchgDeptNm', '', 'text');
    
    gf_FormSetValue('saveFormMhsGnfd', 'afchgDeptCode', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'afchgDeptNm', '', 'text');
    
    gf_FormSetValue('saveFormMhsGnfd', 'gnfdBeginDe', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'gnfdEndDe', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'hdadptDeptCode', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'hdadptDeptNm', '', 'text');
    gf_FormSetValue('saveFormMhsGnfd', 'hdadptAt', false, 'chkbox');
    gf_FormSetValue('saveFormMhsGnfd', 'gnfdDtls', '', 'textarea');
    
    gf_DhxSetValue(dhxInputFormGnfdSeCombo,         "combox",      '',   '', '');
    gf_DhxSetValue(dhxInputFormBfchgBplcCombo,      "combox",      '',   '', '');
    gf_DhxSetValue(dhxInputFormAfchgBplcCombo,      "combox",      '',   '', '');
    gf_DhxSetValue(dhxInputFormBfchgClsfCodeCombo,  "combox",      '',   '', '');
    gf_DhxSetValue(dhxInputFormAfchgClsfCodeCombo,  "combox",      '',   '', '');
    gf_DhxSetValue(dhxInputFormBfchgSrclsCodeCombo, "combox",     '',   '', '');
    gf_DhxSetValue(dhxInputFormAfchgSrclsCodeCombo, "combox",     '',   '', '');
    gf_DhxSetValue(dhxInputFormBfchgOfcpsCodeCombo, "combox",     '',   '', '');
    gf_DhxSetValue(dhxInputFormAfchgOfcpsCodeCombo, "combox",     '',   '', '');
    gf_DhxSetValue(dhxInputFormBfchgJssfcCodeCombo, "combox",     '',   '', '');
    gf_DhxSetValue(dhxInputFormAfchgJssfcCodeCombo, "combox",     '',   '', '');
    gf_DhxSetValue(dhxInputFormBfchgDutyCodeCombo,  "combox",     '',   '', '');
    gf_DhxSetValue(dhxInputFormAfchgDutyCodeCombo,  "combox",     '',   '', '');


    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
    	afchgBplc : dhxComboBplcKorNm.getSelectedValue(),
        empNm : gf_FormGetValue('searchFormMhsGnfd', 'empNm', 'text'),
    	gnfdCode : dhxComboGnfdSe.getSelectedValue(), 
    	clsfCode : dhxComboClsfCode.getSelectedValue(),
    	sRegDt : gf_FormGetValue('searchFormMhsGnfd', 'searchSregDt', 'text').replaceAll('-',''),
        eRegDt : gf_FormGetValue('searchFormMhsGnfd', 'searchEregDt', 'text').replaceAll('-','')
        
    };

    gf_Transaction('gridList', 'mhshra001/searchMhsGnfd', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMhsGnfd.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMhsGnfd.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMhsGnfd = function (rId, cInd) {
    empno = '';
    gnfdDe = '';
    gnfdSn = '';
    var title = titMhsGnfd + ' ' + gv_TitRegist;

    if (rId > 0) {
    empno = '';
    empno = dhxGridMhsGnfd.cells(rId, 2).getValue();
    gnfdDe = '';
    gnfdDe = dhxGridMhsGnfd.cells(rId, 4).getValue();
    gnfdSn = '';
    gnfdSn = dhxGridMhsGnfd.cells(rId, 5).getValue();
        title = titMhsGnfd  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMhsGnfd();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMhsGnfd();
     }
};

var fn_CheckMhsGnfd = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMhsGnfd, col);
    dhxGridMhsGnfd.forEachRow(function(rowId) {
        if(dhxGridMhsGnfd.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMhsGnfd.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var empnos = [];
    empnos.push( empno );
    var gnfdDes = [];
    gnfdDes.push( gnfdDe );
    var gnfdSns = [];
    gnfdSns.push( gnfdSn );
    fn_RemoveMhsGnfd( empnos, gnfdDes, gnfdSns );
};

var fn_RemoveAll = function(){
    var empnos = fn_CheckMhsGnfd('empno');
    var gnfdDes = fn_CheckMhsGnfd('gnfdDe');
    var gnfdSns = fn_CheckMhsGnfd('gnfdSn');
    fn_RemoveMhsGnfd( empnos, gnfdDes, gnfdSns );
};

var fn_RemoveMhsGnfd = function ( empnos, gnfdDes, gnfdSns ){
    var jsonParameter = {
        empnos : empnos.join(','),
        gnfdDes : gnfdDes.join(','),
        gnfdSns : gnfdSns.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mhshra001/removeMhsGnfd', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
    		afchgBplc : dhxComboBplcKorNm.getSelectedValue(),
            empNm : gf_FormGetValue('searchFormMhsGnfd', 'empNm', 'text'),
    		gnfdCode : dhxComboGnfdSe.getSelectedValue(), 
        	clsfCode : dhxComboClsfCode.getSelectedValue(),
        	sRegDt : gf_FormGetValue('searchFormMhsGnfd', 'searchSregDt', 'text'),
            eRegDt : gf_FormGetValue('searchFormMhsGnfd', 'searchEregDt', 'text')
     
    };

    var header = [[
                    gf_LocaleTrans('default', 'titEmpno'),
                    gf_LocaleTrans('default', 'titGnfdDe'),
                    gf_LocaleTrans('default', 'titGnfdSn'),
                    gf_LocaleTrans('default', 'titGnfdNo'),
                    gf_LocaleTrans('default', 'titGnfdCode'),
                    gf_LocaleTrans('default', 'titProcessAt'),
                    gf_LocaleTrans('default', 'titBfchgDeptCode'),
                    gf_LocaleTrans('default', 'titBfchgClsfCode'),
                    gf_LocaleTrans('default', 'titBfchgOfcpsCode'),
                    gf_LocaleTrans('default', 'titBfchgJssfcCode'),
                    gf_LocaleTrans('default', 'titBfchgJblnCode'),
                    gf_LocaleTrans('default', 'titBfchgSrclsCode'),
                    gf_LocaleTrans('default', 'titAfchgDeptCode'),
                    gf_LocaleTrans('default', 'titAfchgClsfCode'),
                    gf_LocaleTrans('default', 'titAfchgOfcpsCode'),
                    gf_LocaleTrans('default', 'titAfchgJssfcCode'),
                    gf_LocaleTrans('default', 'titAfchgJblnCode'),
                    gf_LocaleTrans('default', 'titAfchgSrclsCode'),
                    gf_LocaleTrans('default', 'titGnfdBeginDe'),
                    gf_LocaleTrans('default', 'titGnfdEndDe'),
                    gf_LocaleTrans('default', 'titHdadptDeptCode'),
                    gf_LocaleTrans('default', 'titHdadptAt'),
                    gf_LocaleTrans('default', 'titGnfdDtls'),
                    gf_LocaleTrans('default', 'titSanctnCode'),
                    gf_LocaleTrans('default', 'titSanctnNo'),
    ]];
    var dataId = [[ 'empno', 'gnfdDe', 'gnfdSn', 'gnfdNo', 'gnfdCode', 'processAt', 'bfchgDeptCode', 'bfchgClsfCode', 'bfchgOfcpsCode', 'bfchgJssfcCode', 'bfchgJblnCode', 'bfchgSrclsCode', 'afchgDeptCode', 'afchgClsfCode', 'afchgOfcpsCode', 'afchgJssfcCode', 'afchgJblnCode', 'afchgSrclsCode', 'gnfdBeginDe', 'gnfdEndDe', 'hdadptDeptCode', 'hdadptAt', 'gnfdDtls', 'sanctnCode', 'sanctnNo' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsGnfd ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsGnfd;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mhshra001/excelMhsGnfd', jsonParameter);
};

var fn_SearchInputMhsGnfd = function (){

    if( !gf_IsNull(empno) && !gf_IsNull(gnfdDe) && !gf_IsNull(gnfdSn) ) {

        var jsonParameter = {
            empno : empno ,
            gnfdDe : gnfdDe.replaceAll('-','') ,
            gnfdSn : gnfdSn 
        };

        var dataSource = gf_NoAsyncTransaction('mhshra001/findMhsGnfd', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMhsGnfd', 'empno', data.empno, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'empNm', data.empNm, 'text');
        
        gf_FormSetValue('saveFormMhsGnfd', 'gnfdDe', data.gnfdDe, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'gnfdSn', data.gnfdSn, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'gnfdNo', data.gnfdNo, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'gnfdCode', data.gnfdCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'processAt', (( data.processAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgBplc', data.bfchgBplc, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgBplc', data.afchgBplc, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgDeptCode', data.bfchgDeptCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgDeptNm', data.bfchgDeptNm, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgClsfCode', data.bfchgClsfCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgOfcpsCode', data.bfchgOfcpsCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgJssfcCode', data.bfchgJssfcCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgJblnCode', data.bfchgJblnCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgSrclsCode', data.bfchgSrclsCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgDeptCode', data.afchgDeptCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgDeptNm', data.afchgDeptNm, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgClsfCode', data.afchgClsfCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgOfcpsCode', data.afchgOfcpsCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgJssfcCode', data.afchgJssfcCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgJblnCode', data.afchgJblnCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgSrclsCode', data.afchgSrclsCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'gnfdBeginDe', data.gnfdBeginDe, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'gnfdEndDe', data.gnfdEndDe, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'hdadptDeptCode', data.hdadptDeptCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'hdadptDeptNm', data.hdadptDeptNm, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'bfchgDutyCode', data.bfchgDutyCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'afchgDutyCode', data.afchgDutyCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'hdadptAt', (( data.hdadptAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMhsGnfd', 'gnfdDtls', data.gnfdDtls, 'textarea');
        gf_FormSetValue('saveFormMhsGnfd', 'sanctnCode', data.sanctnCode, 'text');
        gf_FormSetValue('saveFormMhsGnfd', 'sanctnNo', data.sanctnNo, 'text');

        
        gf_DhxSetValue(dhxInputFormGnfdSeCombo, "combox", data.gnfdCode, '', '');
        gf_DhxSetValue(dhxInputFormBfchgBplcCombo,"combox", data.bfchgBplc,   '', '');
        gf_DhxSetValue(dhxInputFormAfchgBplcCombo,"combox",   data.afchgBplc,   '', '');
        gf_DhxSetValue(dhxInputFormBfchgClsfCodeCombo, "combox",  data.bfchgClsfCode, '', '');
        gf_DhxSetValue(dhxInputFormAfchgClsfCodeCombo, "combox",  data.afchgClsfCode, '', '');
        gf_DhxSetValue(dhxInputFormBfchgSrclsCodeCombo, "combox", data.bfchgSrclsCode, '', '');
        gf_DhxSetValue(dhxInputFormAfchgSrclsCodeCombo, "combox", data.afchgSrclsCode, '', '');
        gf_DhxSetValue(dhxInputFormBfchgOfcpsCodeCombo, "combox", data.bfchgOfcpsCode, '', '');
        gf_DhxSetValue(dhxInputFormAfchgOfcpsCodeCombo, "combox", data.afchgOfcpsCode, '', '');
        gf_DhxSetValue(dhxInputFormBfchgJssfcCodeCombo, "combox", data.bfchgJssfcCode, '', '');
        gf_DhxSetValue(dhxInputFormAfchgJssfcCodeCombo, "combox", data.afchgJssfcCode, '', '');
        gf_DhxSetValue(dhxInputFormBfchgDutyCodeCombo, "combox", data.bfchgDutyCode, '', '');
        gf_DhxSetValue(dhxInputFormAfchgDutyCodeCombo, "combox", data.afchgDutyCode, '', '');
      
        $('#saveFormMhsGnfd input[name="empno"]').attr("disabled", true);
        $('#saveFormMhsGnfd input[name="empNm"]').attr("disabled", true);
        $('#saveFormMhsGnfd input[name="gnfdDe"]').attr("disabled", true);
        $('#saveFormMhsGnfd input[name="gnfdSn"]').attr("disabled", true);
        $('#saveFormMhsGnfd #btnEmpSearch').hide();
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};

var zooms  = function (){
	//document.body.style.zoom = nowZoom + '%';
	parent.document.body.style.zoom = nowZoom + '%';
	document.body.style.zoom = nowZoom + '%';
	
	if(nowZoom == 50){
		alert('50% 축소 되었습니다 더이상 축소 할 수 없습니다.');		
	}
	if(nowZoom == 300){
		alert('300% 확대 되었습니다 더이상 확대할 수 없습니다.');		
	}
};
var zoomOut = function() {
	nowZoom = nowZoom   - 10;
	if(nowZoom <= 50) nowZoom = 50;
	zooms();
}
var zoomIn = function() {
	nowZoom = nowZoom  + 10;
	if(nowZoom >= 300) nowZoom = 300;
	zooms();
}
var zoomReset  = function() {
	nowZoom = 100;
	zooms();
}

