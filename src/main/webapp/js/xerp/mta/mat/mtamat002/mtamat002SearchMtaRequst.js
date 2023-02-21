/**
 * 프로그램 : 유지보수요청요약 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.12.16
 * 사용테이블 : MTA_REQUST
 **/

var dhxGridMtaRequst;
var dhxGridMtaRequstListInfo;
var projectNo = '';
var requstNo = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMtaRequst = gf_LocaleTrans('default','titMtaRequst');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MTAMAT002");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();
    // 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('searchSregDt', 'searchEregDt'); 
};


var cf_SetComponents = function (){

    var dhxGridMtaRequstListInfo = [];
    //dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'rnum', '')); // 번호
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCompany'), '230', 'center', 'str', 'ro', false, 'compNm', '')); // 거래처
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRequst'), '100', 'center', 'str', 'ro', false, 'reqCnt', '')); // 요청
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSolve'), '100', 'center', 'str', 'ro', false, 'clearCnt', '')); // 해결
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUnsolve'), '100', 'center', 'str', 'ro', false, 'unclearCnt', '')); // 미해결
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titApprov'), '100', 'center', 'str', 'ro', false, 'compCnt', '')); // 승인
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPrgsRt'), '140', 'center', 'str', 'ro', false, 'prgsRt', '')); // 진척율
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPayperiod'), '100', 'center', 'str', 'ro', false, 'periodCnt', '')); // 납기내
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPayperiodRt'), '140', 'center', 'str', 'ro', false, 'payperiodRt', '')); // 납기율
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAvrgDistbComplt'), '130', 'center', 'str', 'ro', false, 'avgComp', '')); // 평규소요(완료일기준)
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAvrgDistbApprov'), '130', 'center', 'str', 'ro', false, 'avgConfm', '')); // 평균소요(승인일기준)
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDrctrEmpno'), '150', 'center', 'str', 'ro', false, 'drctrEmpno', '')); // 지시자 사원번호
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDrctCn'), '150', 'center', 'str', 'ro', false, 'drctCn', '')); // 지시 내용
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAtchmnfl'), '150', 'center', 'str', 'ro', false, 'atchmnfl', '')); // 첨부파일
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOpertorEmpno'), '150', 'center', 'str', 'ro', false, 'opertorEmpno', '')); // 작업자 사원번호
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOpertTy'), '150', 'center', 'str', 'ro', false, 'opertTy', '')); // 작업 유형
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titConfmerNm'), '150', 'center', 'str', 'ro', false, 'confmerNm', '')); // 승인자 성명
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titComptConfmDt'), '150', 'center', 'str', 'ro', false, 'comptConfmDt', '')); // 완료 승인 일시
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titComptConfmAt'), '150', 'center', 'na', 'ch', false, 'comptConfmAt', '')); // 완료 승인 여부
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titConfmOpn'), '150', 'center', 'str', 'ro', false, 'confmOpn', '')); // 승인 의견
  //  dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titStsfdgLevel'), '150', 'center', 'str', 'ro', false, 'stsfdgLevel', '')); // 만족도 수준
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMtaRequst = gf_MakeDhxGrid('dataList', dhxGridMtaRequstListInfo, true, false, false);

    dhxGridMtaRequst.enableAutoWidth(true);
    dhxGridMtaRequst.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMtaRequst.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMtaRequst.attachEvent('onRowSelect', fn_SaveMtaRequst);

    $("#saveFormMtaRequst").validate({
        errorElement: 'div'
    });
    
};

var cf_SetEventListener = function (){

    $('#searchFormMtaRequst input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMtaRequst .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMtaRequst .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMtaRequst #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });
    
    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMtaRequst.clearSelection();
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
        var projectNos = fn_CheckMtaRequst('projectNo');
        var requstNos = fn_CheckMtaRequst('requstNo');
        if( gf_IsNull(projectNos) && gf_IsNull(requstNos) ) {
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
    
    $('#searchFormMtaRequst #btnCompNmSearch').unbind('click').bind('click', function(event){
    	fn_CompPopup("searchFormMtaRequst","compCd","compNm");
    });

    $('.tdl-2 #btnFormSave').unbind('click').bind('click', function() {

        if($('#saveFormMtaRequst').validate().form()){

            var jsonParameter = {
                projectNo : gf_FormGetValue('saveFormMtaRequst', 'projectNo', 'text'),
                requstNo : gf_FormGetValue('saveFormMtaRequst', 'requstNo', 'text'),
                requstStep : gf_FormGetValue('saveFormMtaRequst', 'requstStep', 'text'),
                requstDt : gf_FormGetValue('saveFormMtaRequst', 'requstDt', 'text'),
                requstDept : gf_FormGetValue('saveFormMtaRequst', 'requstDept', 'text').replaceAll('-',''),
                requstTelno : gf_FormGetValue('saveFormMtaRequst', 'requstTelno', 'text'),
                requstEmail : gf_FormGetValue('saveFormMtaRequst', 'requstEmail', 'text'),
                comptRequstDt : gf_FormGetValue('saveFormMtaRequst', 'comptRequstDt', 'text'),
                requstCn : gf_FormGetValue('saveFormMtaRequst', 'requstCn', 'text'),
                priorTy : gf_FormGetValue('saveFormMtaRequst', 'priorTy', 'text'),
                requstTy : gf_FormGetValue('saveFormMtaRequst', 'requstTy', 'text'),
                drctrEmpno : gf_FormGetValue('saveFormMtaRequst', 'drctrEmpno', 'text'),
                drctCn : gf_FormGetValue('saveFormMtaRequst', 'drctCn', 'text'),
                atchmnfl : gf_FormGetValue('saveFormMtaRequst', 'atchmnfl', 'text'),
                opertorEmpno : gf_FormGetValue('saveFormMtaRequst', 'opertorEmpno', 'text'),
                opertTy : gf_FormGetValue('saveFormMtaRequst', 'opertTy', 'text'),
                confmerNm : gf_FormGetValue('saveFormMtaRequst', 'confmerNm', 'text'),
                comptConfmDt : gf_FormGetValue('saveFormMtaRequst', 'comptConfmDt', 'text'),
                comptConfmAt : gf_FormGetValue('saveFormMtaRequst', 'comptConfmAt', 'chkboxYN'),
                confmOpn : gf_FormGetValue('saveFormMtaRequst', 'confmOpn', 'text'),
                stsfdgLevel : gf_FormGetValue('saveFormMtaRequst', 'stsfdgLevel', 'text'),
            };

            var url;

            if( !gf_IsNull(projectNo) && !gf_IsNull(requstNo) ) {
                url = "mtamat002/modifyMtaRequst";
            } else {
                url = "mtamat002/saveMtaRequst";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(projectNo) && !gf_IsNull(requstNo)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMtaRequst div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMtaRequst.forEachRow(function(rowId) {
            dhxGridMtaRequst.cells(rowId,0).setChecked(checkAll);
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
	
    gf_FormSetValue('searchFormMtaRequst', 'compNm', '', 'text');
    gf_FormSetValue('searchFormMtaRequst', 'searchSregDt', '', 'text');
    gf_FormSetValue('searchFormMtaRequst', 'searchEregDt', '', 'text');
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMtaRequst', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMtaRequst', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMtaRequst', 'useAt', 'radio'),
        compNm : gf_FormGetValue('searchFormMtaRequst', 'compNm', 'text')
    };

    gf_Transaction('gridList', 'mtamat002/searchMtaRequst', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMtaRequst.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMtaRequst.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMtaRequst = function (rId, cInd) {
    projectNo = '';
    requstNo = '';
    var title = titMtaRequst + ' ' + gv_TitRegist;

    if (rId > 0) {
    projectNo = '';
    projectNo = dhxGridMtaRequst.cells(rId, 2).getValue();
    requstNo = '';
    requstNo = dhxGridMtaRequst.cells(rId, 3).getValue();
        title = titMtaRequst  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMtaRequst();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMtaRequst();
     }
};

var fn_CheckMtaRequst = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMtaRequst, col);
    dhxGridMtaRequst.forEachRow(function(rowId) {
        if(dhxGridMtaRequst.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMtaRequst.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var projectNos = [];
    projectNos.push( projectNo );
    var requstNos = [];
    requstNos.push( requstNo );
    fn_RemoveMtaRequst( projectNos, requstNos );
};

var fn_RemoveAll = function(){
    var projectNos = fn_CheckMtaRequst('projectNo');
    var requstNos = fn_CheckMtaRequst('requstNo');
    fn_RemoveMtaRequst( projectNos, requstNos );
};

var fn_RemoveMtaRequst = function ( projectNos, requstNos ){
    var jsonParameter = {
        projectNos : projectNos.join(','),
        requstNos : requstNos.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mtamat002/removeMtaRequst', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMtaRequst', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMtaRequst', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMtaRequst', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titProjectNo'),
                    gf_LocaleTrans('default', 'titRequstNo'),
                    gf_LocaleTrans('default', 'titRequstStep'),
                    gf_LocaleTrans('default', 'titRequstDt'),
                    gf_LocaleTrans('default', 'titRequstDept'),
                    gf_LocaleTrans('default', 'titRequstTelno'),
                    gf_LocaleTrans('default', 'titRequstEmail'),
                    gf_LocaleTrans('default', 'titComptRequstDt'),
                    gf_LocaleTrans('default', 'titRequstCn'),
                    gf_LocaleTrans('default', 'titPriorTy'),
                    gf_LocaleTrans('default', 'titRequstTy'),
                    gf_LocaleTrans('default', 'titDrctrEmpno'),
                    gf_LocaleTrans('default', 'titDrctCn'),
                    gf_LocaleTrans('default', 'titAtchmnfl'),
                    gf_LocaleTrans('default', 'titOpertorEmpno'),
                    gf_LocaleTrans('default', 'titOpertTy'),
                    gf_LocaleTrans('default', 'titConfmerNm'),
                    gf_LocaleTrans('default', 'titComptConfmDt'),
                    gf_LocaleTrans('default', 'titComptConfmAt'),
                    gf_LocaleTrans('default', 'titConfmOpn'),
                    gf_LocaleTrans('default', 'titStsfdgLevel'),
    ]];
    var dataId = [[ 'projectNo', 'requstNo', 'requstStep', 'requstDt', 'requstDept', 'requstTelno', 'requstEmail', 'comptRequstDt', 'requstCn', 'priorTy', 'requstTy', 'drctrEmpno', 'drctCn', 'atchmnfl', 'opertorEmpno', 'opertTy', 'confmerNm', 'comptConfmDt', 'comptConfmAt', 'confmOpn', 'stsfdgLevel' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMtaRequst ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMtaRequst;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mtamat002/excelMtaRequst', jsonParameter);
};

var fn_SearchInputMtaRequst = function (){

    if( !gf_IsNull(projectNo) && !gf_IsNull(requstNo) ) {

        var jsonParameter = {
            projectNo : projectNo ,
            requstNo : requstNo 
        };

        var dataSource = gf_NoAsyncTransaction('mtamat002/findMtaRequst', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMtaRequst', 'projectNo', data.projectNo, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'requstNo', data.requstNo, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'requstStep', data.requstStep, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'requstDt', data.requstDt, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'requstDept', data.requstDept, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'requstTelno', data.requstTelno, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'requstEmail', data.requstEmail, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'comptRequstDt', data.comptRequstDt, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'requstCn', data.requstCn, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'priorTy', data.priorTy, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'requstTy', data.requstTy, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'drctrEmpno', data.drctrEmpno, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'drctCn', data.drctCn, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'atchmnfl', data.atchmnfl, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'opertorEmpno', data.opertorEmpno, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'opertTy', data.opertTy, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'confmerNm', data.confmerNm, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'comptConfmDt', data.comptConfmDt, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'comptConfmAt', (( data.comptConfmAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMtaRequst', 'confmOpn', data.confmOpn, 'text');
        gf_FormSetValue('saveFormMtaRequst', 'stsfdgLevel', data.stsfdgLevel, 'text');

        $('#saveFormMtaRequst input[name="projectNo"]').attr("disabled", true);
        $('#saveFormMtaRequst input[name="requstNo"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
