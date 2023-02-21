/**
 * 프로그램 : 출장결의서 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.31
 * 사용테이블 : MFS_SLIP_COMM
 **/

var dhxGridMfsSlipComm;
var dhxGridMfsSlipCommListInfo;
var dhxGridMfsBizTripExp;
var dhxGridMfsBizTripExpListInfo;

var dhxInputFormChikcCodeCombo;
var dhxSignCdCombo;

var dhxComboBizplcCd;

var dhxComboBizplcCd2;

var acctSlipNo = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMfsSlipComm = gf_LocaleTrans('default','titMfsSlipComm');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MFSRPT003");
    //사업장
    dhxComboBizplcCd = gf_MakeDhxCombo(
    	    'dixComboBizplcCd',
    	    'searchFormMfsSlipComm',
    	    100,
    	    'mhshrm001/searchStmBizplc',
    	    true,
    	    'bplcCode',
    	    'bplcKorNm',
    	    '',
    	    '');
   
    //출장구분
    dhxBizTripCombo = gf_MakeDhxCombo(															
			'divBizTripCombo', 																
			'searchForm',																				
			70, 																						
			'combo/searchStmCode?codekindCode=C096', 														
			true, 																						
			'code', 																					
			'codeNm',																					
			'',																							
			'');			
    //직종구분C197
    dhxInputFormChikcCodeCombo =  gf_MakeDhxCombo(
    	    'divInputFormChikcCodeCombo',
    	    'searchForm',
    	    80,
    	    'combo/searchStmCode?codekindCode=C197', 		
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    //결재상태 C082
    dhxSignCdCombo =  gf_MakeDhxCombo(
    	    'divSignCdCombo',
    	    'searchForm',
    	    100,
    	    'combo/searchStmCode?codekindCode=C082', 		
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
    
    //사업장
    dhxComboBizplcCd2 = gf_MakeDhxCombo(
    	    'dixComboBizplcCd2',
    	    'saveForm',
    	    100,
    	    'mhshrm001/searchStmBizplc',
    	    true,
    	    'bplcCode',
    	    'bplcKorNm',
    	    '',
    	    '');
    
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();
    
    
    var dhxCalendarBiztripSdt = new dhtmlXCalendarObject({input:"biztripSdt", button:"startDateIcon"});
    dhxCalendarBiztripSdt.loadUserLanguage("ko");
    dhxCalendarBiztripSdt.hideTime();
    var dhxCalendarBiztripEdt = new dhtmlXCalendarObject({input:"biztripEdt", button:"endDateIcon"});
    dhxCalendarBiztripEdt.loadUserLanguage("ko");
    dhxCalendarBiztripEdt.hideTime();
    // 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('searchSregDt', 'searchEregDt'); 
     
    $("#searchSregDt").val("2019-01-01");
};


var cf_SetComponents = function (){

    var dhxGridMfsSlipCommListInfo = [];
    dhxGridMfsSlipCommListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAcctSlipNo'), '100', 'center', 'str', 'ro', false, 'acctSlipNo', '')); // 결의번호
    dhxGridMfsSlipCommListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSummaryDesc'), '230', 'left', 'str', 'ro', false, 'summaryDesc', '')); // 적요
    dhxGridMfsSlipCommListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSignCd'), '80', 'center', 'str', 'ro', false, 'signNm', '')); // 결재상태
    dhxGridMfsSlipCommListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSignEmpNo'), '60', 'center', 'str', 'ro', false, 'signEmpNm', '')); // 결재자
    dhxGridMfsSlipCommListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMfsSlipComm = gf_MakeDhxGrid('dataList', dhxGridMfsSlipCommListInfo, true, false, false);

    dhxGridMfsSlipComm.enableAutoWidth(true);
    dhxGridMfsSlipComm.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMfsSlipComm.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMfsSlipComm.attachEvent('onRowSelect', fn_SaveMfsSlipComm);

    $("#saveFormMfsSlipComm").validate({
        errorElement: 'div'
    });
    
    var dhxGridMfsBizTripExpListInfo = [];
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBplcKorNm'), '100', 'center', 'str', 'ro', false, 'corpNm', '')); // 사업장
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmplNo'), '80', 'center', 'str', 'ro', false, 'empNo', '')); // 사원번호
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '60', 'center', 'str', 'ro', false, 'korNm', '')); // 성명
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCd'), '120', 'left', 'str', 'ro', false, 'deptNm', '')); // 부서명
    
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titGradeCd'), '60', 'center', 'str', 'ro', false, 'gradeNm', '')); // 직급
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titChikcCd'), '80', 'center', 'str', 'ro', false, 'chikcNm', '')); // 직종
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBsrpBeginDe'), '80', 'center', 'str', 'ro', false, 'biztripSdt', '')); // 출장 시작일
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBsrpEndDe'), '80', 'center', 'str', 'ro', false, 'biztripEdt', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDayWonAmt'), '80', 'right', 'str', 'ro', false, 'dayWonAmt', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMealWonAmt'), '70', 'right', 'str', 'ro', false, 'mealWonAmt', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titLodgingWonAmt'), '70', 'right', 'str', 'ro', false, 'lodgingWonAmt', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titFareAmt'), '80', 'right', 'str', 'ro', false, 'fareAmt', '')); // 결재자  
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titReadyWonAmt'), '80', 'right', 'str', 'ro', false, 'readyWonAmt', '')); // 결재자
   
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titReqTamt'), '70', 'right', 'str', 'ro', false, 'reqTamt', '')); // 총비용
    
    /*CHIKC_NM
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBiztripNo'), '60', 'center', 'str', 'ro', false, 'biztripNo', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBiztripSeq'), '60', 'center', 'str', 'ro', false, 'biztripSeq    ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBiztripReqDt'), '60', 'center', 'str', 'ro', false, 'biztripReqDt  ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBiztripCls     '), '60', 'center', 'str', 'ro', false, 'biztripCls    ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDepartAreaNm   '), '60', 'center', 'str', 'ro', false, 'departAreaNm  ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titTeavelNm       '), '60', 'center', 'str', 'ro', false, 'teavelNm      ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titArrivalAreaNm  '), '60', 'center', 'str', 'ro', false, 'arrivalAreaNm ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCd         '), '60', 'center', 'str', 'ro', false, 'deptCd        ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titArplnFareAmt   '), '60', 'center', 'str', 'ro', false, 'arplnFareAmt  ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDayWonAmt      '), '60', 'center', 'str', 'ro', false, 'dayWonAmt     ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMealWonAmt     '), '60', 'center', 'str', 'ro', false, 'mealWonAmt    ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titLodgingWonAmt  '), '60', 'center', 'str', 'ro', false, 'lodgingWonAmt ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titReadyWonAmt    '), '60', 'center', 'str', 'ro', false, 'readyWonAmt   ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titReq_tamt       '), '60', 'center', 'str', 'ro', false, 'req_tamt      ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAgentEmpNo     '), '60', 'center', 'str', 'ro', false, 'agentEmpNo    ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAcctSlipNo     '), '60', 'center', 'str', 'ro', false, 'acctSlipNo    ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titChikcCd        '), '60', 'center', 'str', 'ro', false, 'chikcCd       ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titFareAmt        '), '60', 'center', 'str', 'ro', false, 'fareAmt       ', '')); // 결재자
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBiztripNm      '), '60', 'center', 'str', 'ro', false, 'biztripNm', '')); // 결재자
    */
  
    dhxGridMfsBizTripExpListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMfsBizTripExp = gf_MakeDhxGrid('dataList2', dhxGridMfsBizTripExpListInfo, true, false, false);

    
};

var cf_SetEventListener = function (){

    $('#searchFormMfsSlipComm input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMfsSlipComm .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMfsSlipComm .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMfsSlipComm #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });
    $('#searchFormMfsSlipComm input').unbind('keyup').bind('keyup', function(event){
    	if(event.keyCode== 13)  {
    		fn_SearchGridList();
    	}
    });    
    

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMfsSlipComm.clearSelection();
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

    $('.tdl-1 #btnRemove').unbind('click').bind('click', function() {
        var acctSlipNos = fn_CheckMfsSlipComm('acctSlipNo');
        if( gf_IsNull(acctSlipNos) ) {
             gf_DivMsgAlert(gv_MsgDelKey);
             return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAll()', '');
        }
    });

    $('.tdl-2 #btnFormRemove').unbind('click').bind('click', function() {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
    });

    $('.tdl-1 #btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });

    $('.tdl-2 #btnFormSave').unbind('click').bind('click', function() {

        if($('#saveFormMfsSlipComm').validate().form()){

            var jsonParameter = {
                acctSlipNo : gf_FormGetValue('saveFormMfsSlipComm', 'acctSlipNo', 'text'),
                bizplcCd : gf_FormGetValue('saveFormMfsSlipComm', 'bizplcCd', 'text'),
                accCls : gf_FormGetValue('saveFormMfsSlipComm', 'accCls', 'text'),
                deptCd : gf_FormGetValue('saveFormMfsSlipComm', 'deptCd', 'text'),
                makeEmpNo : gf_FormGetValue('saveFormMfsSlipComm', 'makeEmpNo', 'text'),
                confirmEmpNo : gf_FormGetValue('saveFormMfsSlipComm', 'confirmEmpNo', 'text'),
                slipDt : gf_FormGetValue('saveFormMfsSlipComm', 'slipDt', 'text'),
                slipTypeCd : gf_FormGetValue('saveFormMfsSlipComm', 'slipTypeCd', 'text'),
                slipmakeDt : gf_FormGetValue('saveFormMfsSlipComm', 'slipmakeDt', 'text'),
                slipmakeDeptCd : gf_FormGetValue('saveFormMfsSlipComm', 'slipmakeDeptCd', 'text').replaceAll('-',''),
                amt : gf_FormGetValue('saveFormMfsSlipComm', 'amt', 'text'),
                slipModifyYn : gf_FormGetValue('saveFormMfsSlipComm', 'slipModifyYn', 'text'),
                slipApprDt : gf_FormGetValue('saveFormMfsSlipComm', 'slipApprDt', 'text'),
                slipFixDt : gf_FormGetValue('saveFormMfsSlipComm', 'slipFixDt', 'text'),
                summaryDesc : gf_FormGetValue('saveFormMfsSlipComm', 'summaryDesc', 'text').replaceAll('-',''),
                slipAutoCd : gf_FormGetValue('saveFormMfsSlipComm', 'slipAutoCd', 'text'),
                signCd : gf_FormGetValue('saveFormMfsSlipComm', 'signCd', 'text'),
                signDate : gf_FormGetValue('saveFormMfsSlipComm', 'signDate', 'text'),
                signEmpNo : gf_FormGetValue('saveFormMfsSlipComm', 'signEmpNo', 'text'),
                signNo : gf_FormGetValue('saveFormMfsSlipComm', 'signNo', 'text'),
                accsignCd : gf_FormGetValue('saveFormMfsSlipComm', 'accsignCd', 'text'),
                accsignDate : gf_FormGetValue('saveFormMfsSlipComm', 'accsignDate', 'text'),
                accsignEmpNo : gf_FormGetValue('saveFormMfsSlipComm', 'accsignEmpNo', 'text'),
                accsignNo : gf_FormGetValue('saveFormMfsSlipComm', 'accsignNo', 'text'),
                accEmpNo : gf_FormGetValue('saveFormMfsSlipComm', 'accEmpNo', 'text'),
                apprEmpNo : gf_FormGetValue('saveFormMfsSlipComm', 'apprEmpNo', 'text'),
                slipStatusCd : gf_FormGetValue('saveFormMfsSlipComm', 'slipStatusCd', 'text'),
                profitCls : gf_FormGetValue('saveFormMfsSlipComm', 'profitCls', 'text'),
                realSlipNo : gf_FormGetValue('saveFormMfsSlipComm', 'realSlipNo', 'text'),
                reqsignCd : gf_FormGetValue('saveFormMfsSlipComm', 'reqsignCd', 'text'),
                reqsignNo : gf_FormGetValue('saveFormMfsSlipComm', 'reqsignNo', 'text'),
                causeactsignCd : gf_FormGetValue('saveFormMfsSlipComm', 'causeactsignCd', 'text'),
                causeactsignNo : gf_FormGetValue('saveFormMfsSlipComm', 'causeactsignNo', 'text'),
                accSlipSignCd : gf_FormGetValue('saveFormMfsSlipComm', 'accSlipSignCd', 'text'),
                accSlipSignNo : gf_FormGetValue('saveFormMfsSlipComm', 'accSlipSignNo', 'text'),
                accSlipSignDate : gf_FormGetValue('saveFormMfsSlipComm', 'accSlipSignDate', 'text'),
                accfixDt : gf_FormGetValue('saveFormMfsSlipComm', 'accfixDt', 'text'),
                accfixNo : gf_FormGetValue('saveFormMfsSlipComm', 'accfixNo', 'text'),
                accfixEmpNo : gf_FormGetValue('saveFormMfsSlipComm', 'accfixEmpNo', 'text'),
                bigo : gf_FormGetValue('saveFormMfsSlipComm', 'bigo', 'text'),
                paymentCls : gf_FormGetValue('saveFormMfsSlipComm', 'paymentCls', 'text'),
                description : gf_FormGetValue('saveFormMfsSlipComm', 'description', 'text'),
                reqEmpNo : gf_FormGetValue('saveFormMfsSlipComm', 'reqEmpNo', 'text'),
                regDate : gf_FormGetValue('saveFormMfsSlipComm', 'regDate', 'text'),
                uptDate : gf_FormGetValue('saveFormMfsSlipComm', 'uptDate', 'text'),
                regCls : gf_FormGetValue('saveFormMfsSlipComm', 'regCls', 'text'),
                bugtAmt : gf_FormGetValue('saveFormMfsSlipComm', 'bugtAmt', 'text'),
                balanceAmt : gf_FormGetValue('saveFormMfsSlipComm', 'balanceAmt', 'text'),
                crdSlipNo : gf_FormGetValue('saveFormMfsSlipComm', 'crdSlipNo', 'text'),
            };

            var url;

            if( !gf_IsNull(acctSlipNo) ) {
                url = "mfsrpt003/modifyMfsSlipComm";
            } else {
                url = "mfsrpt003/saveMfsSlipComm";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(acctSlipNo)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMfsSlipComm div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMfsSlipComm.forEachRow(function(rowId) {
            dhxGridMfsSlipComm.cells(rowId,0).setChecked(checkAll);
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

    acctSlipNo = '';

    $("#h4_pr_title").text(titMfsSlipComm + ' ' + gv_TitRegist);
    $('#saveFormMfsSlipComm input[name="acctSlipNo"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMfsSlipComm', 'acctSlipNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'bizplcCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accCls', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'deptCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'makeEmpNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'confirmEmpNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipDt', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipTypeCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipmakeDt', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipmakeDeptCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'amt', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipModifyYn', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipApprDt', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipFixDt', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'summaryDesc', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipAutoCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'signCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'signDate', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'signEmpNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'signNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accsignCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accsignDate', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accsignEmpNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accsignNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accEmpNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'apprEmpNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'slipStatusCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'profitCls', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'realSlipNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'reqsignCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'reqsignNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'causeactsignCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'causeactsignNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accSlipSignCd', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accSlipSignNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accSlipSignDate', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accfixDt', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accfixNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'accfixEmpNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'bigo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'paymentCls', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'description', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'reqEmpNo', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'regDate', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'uptDate', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'regCls', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'bugtAmt', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'balanceAmt', '', 'text');
    gf_FormSetValue('saveFormMfsSlipComm', 'crdSlipNo', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){
	 var jsonParameter = {
    		searchSregDt : gf_FormGetValue('searchFormMfsSlipComm', 'searchSregDt', 'text').replace('-',''),
    		searchEregDt : gf_FormGetValue('searchFormMfsSlipComm', 'searchEregDt', 'text').replace('-',''),
    		bizplcCd     : dhxComboBizplcCd.getSelectedValue(),
    		summaryDesc  : gf_FormGetValue('searchFormMfsSlipComm', 'summaryDesc', 'text'),
    		acctSlipNo   : gf_FormGetValue('searchFormMfsSlipComm', 'acctSlipNo', 'text')
    };

    gf_Transaction('gridList', 'mfsrpt003/searchMfsSlipComm', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMfsSlipComm.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMfsSlipComm.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMfsSlipComm = function (rId, cInd) {
    acctSlipNo = '';
    var title = titMfsSlipComm + ' ' + gv_TitRegist;

    if (rId > 0) {
    acctSlipNo = '';
    acctSlipNo = dhxGridMfsSlipComm.cells(rId, 0).getValue();
        title = titMfsSlipComm  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMfsSlipComm();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMfsSlipComm();
     }
};

var fn_CheckMfsSlipComm = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMfsSlipComm, col);
    dhxGridMfsSlipComm.forEachRow(function(rowId) {
        if(dhxGridMfsSlipComm.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMfsSlipComm.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var acctSlipNos = [];
    acctSlipNos.push( acctSlipNo );
    fn_RemoveMfsSlipComm( acctSlipNos );
};

var fn_RemoveAll = function(){
    var acctSlipNos = fn_CheckMfsSlipComm('acctSlipNo');
    fn_RemoveMfsSlipComm( acctSlipNos );
};

var fn_RemoveMfsSlipComm = function ( acctSlipNos ){
    var jsonParameter = {
        acctSlipNos : acctSlipNos.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mfsrpt003/removeMfsSlipComm', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMfsSlipComm', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMfsSlipComm', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMfsSlipComm', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titAcctSlipNo'),
                    gf_LocaleTrans('default', 'titBizplcCd'),
                    gf_LocaleTrans('default', 'titAccCls'),
                    gf_LocaleTrans('default', 'titDeptCd'),
                    gf_LocaleTrans('default', 'titMakeEmpNo'),
                    gf_LocaleTrans('default', 'titConfirmEmpNo'),
                    gf_LocaleTrans('default', 'titSlipDt'),
                    gf_LocaleTrans('default', 'titSlipTypeCd'),
                    gf_LocaleTrans('default', 'titSlipmakeDt'),
                    gf_LocaleTrans('default', 'titSlipmakeDeptCd'),
                    gf_LocaleTrans('default', 'titAmt'),
                    gf_LocaleTrans('default', 'titSlipModifyYn'),
                    gf_LocaleTrans('default', 'titSlipApprDt'),
                    gf_LocaleTrans('default', 'titSlipFixDt'),
                    gf_LocaleTrans('default', 'titSummaryDesc'),
                    gf_LocaleTrans('default', 'titSlipAutoCd'),
                    gf_LocaleTrans('default', 'titSignCd'),
                    gf_LocaleTrans('default', 'titSignDate'),
                    gf_LocaleTrans('default', 'titSignEmpNo'),
                    gf_LocaleTrans('default', 'titSignNo'),
                    gf_LocaleTrans('default', 'titAccsignCd'),
                    gf_LocaleTrans('default', 'titAccsignDate'),
                    gf_LocaleTrans('default', 'titAccsignEmpNo'),
                    gf_LocaleTrans('default', 'titAccsignNo'),
                    gf_LocaleTrans('default', 'titAccEmpNo'),
                    gf_LocaleTrans('default', 'titApprEmpNo'),
                    gf_LocaleTrans('default', 'titSlipStatusCd'),
                    gf_LocaleTrans('default', 'titProfitCls'),
                    gf_LocaleTrans('default', 'titRealSlipNo'),
                    gf_LocaleTrans('default', 'titReqsignCd'),
                    gf_LocaleTrans('default', 'titReqsignNo'),
                    gf_LocaleTrans('default', 'titCauseactsignCd'),
                    gf_LocaleTrans('default', 'titCauseactsignNo'),
                    gf_LocaleTrans('default', 'titAccSlipSignCd'),
                    gf_LocaleTrans('default', 'titAccSlipSignNo'),
                    gf_LocaleTrans('default', 'titAccSlipSignDate'),
                    gf_LocaleTrans('default', 'titAccfixDt'),
                    gf_LocaleTrans('default', 'titAccfixNo'),
                    gf_LocaleTrans('default', 'titAccfixEmpNo'),
                    gf_LocaleTrans('default', 'titBigo'),
                    gf_LocaleTrans('default', 'titPaymentCls'),
                    gf_LocaleTrans('default', 'titDescription'),
                    gf_LocaleTrans('default', 'titReqEmpNo'),
                    gf_LocaleTrans('default', 'titRegDate'),
                    gf_LocaleTrans('default', 'titUptDate'),
                    gf_LocaleTrans('default', 'titRegCls'),
                    gf_LocaleTrans('default', 'titBugtAmt'),
                    gf_LocaleTrans('default', 'titBalanceAmt'),
                    gf_LocaleTrans('default', 'titCrdSlipNo'),
    ]];
    var dataId = [[ 'acctSlipNo', 'bizplcCd', 'accCls', 'deptCd', 'makeEmpNo', 'confirmEmpNo', 'slipDt', 'slipTypeCd', 'slipmakeDt', 'slipmakeDeptCd', 'amt', 'slipModifyYn', 'slipApprDt', 'slipFixDt', 'summaryDesc', 'slipAutoCd', 'signCd', 'signDate', 'signEmpNo', 'signNo', 'accsignCd', 'accsignDate', 'accsignEmpNo', 'accsignNo', 'accEmpNo', 'apprEmpNo', 'slipStatusCd', 'profitCls', 'realSlipNo', 'reqsignCd', 'reqsignNo', 'causeactsignCd', 'causeactsignNo', 'accSlipSignCd', 'accSlipSignNo', 'accSlipSignDate', 'accfixDt', 'accfixNo', 'accfixEmpNo', 'bigo', 'paymentCls', 'description', 'reqEmpNo', 'regDate', 'uptDate', 'regCls', 'bugtAmt', 'balanceAmt', 'crdSlipNo' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMfsSlipComm ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMfsSlipComm;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mfsrpt003/excelMfsSlipComm', jsonParameter);
};

var fn_SearchInputMfsSlipComm = function (){

    if( !gf_IsNull(acctSlipNo) ) {

        var jsonParameter = {
            acctSlipNo : acctSlipNo 
        };

        var dataSource = gf_NoAsyncTransaction('mfsrpt003/findMfsSlipComm', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMfsSlipComm', 'acctSlipNo', data.acctSlipNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'bizplcCd', data.bizplcCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accCls', data.accCls, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'deptCd', data.deptCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'bugtCd',         data.bugtNm, 'text');
     
        gf_FormSetValue('saveFormMfsSlipComm', 'crAcctCd',       data.crAcctCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'drAcctCd',       data.drAcctCd, 'text');
        
        gf_FormSetValue('saveFormMfsSlipComm', 'crAcctNm',       data.crAcctNm, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'drAcctNm',       data.drAcctNm, 'text');
        
        
        gf_DhxSetValue(dhxComboBizplcCd2, "combox", data.corpCd, '', '');
        
        gf_FormSetValue('saveFormMfsSlipComm', 'makeEmpNo',      data.makeEmpNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'confirmEmpNo',   data.confirmEmpNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipDt',         data.slipDt, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipTypeCd',     data.slipTypeCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipmakeDt',     data.slipmakeDt, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipmakeDeptCd', data.slipmakeDeptCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'amt',            data.amt, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipModifyYn', data.slipModifyYn, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipApprDt', data.slipApprDt, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipFixDt', data.slipFixDt, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'summaryDesc', data.summaryDesc, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipAutoCd', data.slipAutoCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'signCd', data.signCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'signDate', data.signDate, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'signEmpNo', data.signEmpNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'signNo', data.signNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accsignCd', data.accsignCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accsignDate', data.accsignDate, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accsignEmpNo', data.accsignEmpNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accsignNo', data.accsignNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accEmpNo', data.accEmpNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'apprEmpNo', data.apprEmpNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'slipStatusCd', data.slipStatusCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'profitCls', data.profitCls, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'realSlipNo', data.realSlipNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'reqsignCd', data.reqsignCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'reqsignNo', data.reqsignNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'causeactsignCd', data.causeactsignCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'causeactsignNo', data.causeactsignNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accSlipSignCd', data.accSlipSignCd, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accSlipSignNo', data.accSlipSignNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accSlipSignDate', data.accSlipSignDate, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accfixDt', data.accfixDt, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accfixNo', data.accfixNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'accfixEmpNo', data.accfixEmpNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'bigo', data.bigo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'paymentCls', data.paymentCls, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'description', data.description, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'reqEmpNo', data.reqEmpNo, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'regDate', data.regDate, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'uptDate', data.uptDate, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'regCls', data.regCls, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'bugtAmt', data.bugtAmt, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'balanceAmt', data.balanceAmt, 'text');
        gf_FormSetValue('saveFormMfsSlipComm', 'crdSlipNo', data.crdSlipNo, 'text');

        $('#saveFormMfsSlipComm input[name="acctSlipNo"]').attr("disabled", true);
        $('#saveFormMfsSlipComm input[name="signCd"]').attr("disabled", true);
        //$('#saveFormMfsSlipComm input').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);
        
        
        
        //
        gf_Transaction('gridList2', 'mfsrpt003/selectMfsBiztripSlip', jsonParameter, 'fn_CallbackSearchGridList2', false, 'GET');
    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};

var fn_CallbackSearchGridList2 = function (strSvcID, targetID, data){
	dhxGridMfsBizTripExp.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridMfsBizTripExp.parse(data.data.records, 'js');
    } 
   // $("#spanCnt").text(data.data.records.length);
   // cf_SetEventListener();
};
