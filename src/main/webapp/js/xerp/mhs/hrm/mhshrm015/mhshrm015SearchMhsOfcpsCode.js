/**
 * 프로그램 : 직위관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.28
 * 사용테이블 : MHS_OFCPS_CODE
 **/

var dhxGridMhsOfcpsCode;
var dhxGridMhsOfcpsCodeListInfo;
var ofcpsCode = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMhsOfcpsCode = gf_LocaleTrans('default','titMhsOfcpsCode');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MHSHRM015");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();

    gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt', '1');

};


var cf_SetComponents = function (){

    var dhxGridMhsOfcpsCodeListInfo = [];
    dhxGridMhsOfcpsCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMhsOfcpsCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMhsOfcpsCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOfcpsCode'), '150', 'center', 'str', 'ro', false, 'ofcpsCode', '')); // 직위코드
    dhxGridMhsOfcpsCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOfcpsNm'), '150', 'center', 'str', 'ro', false, 'ofcpsNm', '')); // 직급코드의 명칭을 기록하기위한 항목
    dhxGridMhsOfcpsCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'), '150', 'center', 'na', 'ch', false, 'useAt', '')); // 코드 사용 유무 check 위한 항목
    dhxGridMhsOfcpsCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOutptOrdr'), '150', 'center', 'str', 'ro', false, 'outptOrdr', '')); // 직급코드의 조회 및 출력시 나타내어질 순번
    dhxGridMhsOfcpsCodeListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMhsOfcpsCode = gf_MakeDhxGrid('dataList', dhxGridMhsOfcpsCodeListInfo, true, false, false);

    dhxGridMhsOfcpsCode.enableAutoWidth(true);
    dhxGridMhsOfcpsCode.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMhsOfcpsCode.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMhsOfcpsCode.attachEvent('onRowSelect', fn_SaveMhsOfcpsCode);

    $("#saveFormMhsOfcpsCode").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMhsOfcpsCode input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMhsOfcpsCode .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMhsOfcpsCode .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMhsOfcpsCode #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMhsOfcpsCode.clearSelection();
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
        var ofcpsCodes = fn_CheckMhsOfcpsCode('ofcpsCode');
        if( gf_IsNull(ofcpsCodes) ) {
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

        if($('#saveFormMhsOfcpsCode').validate().form()){

            var jsonParameter = {
                ofcpsCode : gf_FormGetValue('saveFormMhsOfcpsCode', 'ofcpsCode', 'text'),
                ofcpsNm : gf_FormGetValue('saveFormMhsOfcpsCode', 'ofcpsNm', 'text'),
                useAt : gf_FormGetValue('saveFormMhsOfcpsCode', 'useAt', 'chkboxYN'),
                outptOrdr : gf_FormGetValue('saveFormMhsOfcpsCode', 'outptOrdr', 'text'),
            };

            var url;

            if( !gf_IsNull(ofcpsCode) ) {
                url = "mhshrm015/modifyMhsOfcpsCode";
            } else {
                url = "mhshrm015/saveMhsOfcpsCode";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(ofcpsCode)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMhsOfcpsCode div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMhsOfcpsCode.forEachRow(function(rowId) {
            dhxGridMhsOfcpsCode.cells(rowId,0).setChecked(checkAll);
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

    ofcpsCode = '';

    $("#h4_pr_title").text(titMhsOfcpsCode + ' ' + gv_TitRegist);
    $('#saveFormMhsOfcpsCode input[name="ofcpsCode"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMhsOfcpsCode', 'ofcpsCode', '', 'text');
    gf_FormSetValue('saveFormMhsOfcpsCode', 'ofcpsNm', '', 'text');
    gf_FormSetValue('saveFormMhsOfcpsCode', 'useAt', false, 'chkbox');
    gf_FormSetValue('saveFormMhsOfcpsCode', 'outptOrdr', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsOfcpsCode', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsOfcpsCode', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsOfcpsCode', 'useAt', 'radio')
    };

    gf_Transaction('gridList', 'mhshrm015/searchMhsOfcpsCode', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMhsOfcpsCode.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMhsOfcpsCode.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMhsOfcpsCode = function (rId, cInd) {
    ofcpsCode = '';
    var title = titMhsOfcpsCode + ' ' + gv_TitRegist;

    if (rId > 0) {
    ofcpsCode = '';
    ofcpsCode = dhxGridMhsOfcpsCode.cells(rId, 2).getValue();
        title = titMhsOfcpsCode  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMhsOfcpsCode();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMhsOfcpsCode();
     }
};

var fn_CheckMhsOfcpsCode = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMhsOfcpsCode, col);
    dhxGridMhsOfcpsCode.forEachRow(function(rowId) {
        if(dhxGridMhsOfcpsCode.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMhsOfcpsCode.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var ofcpsCodes = [];
    ofcpsCodes.push( ofcpsCode );
    fn_RemoveMhsOfcpsCode( ofcpsCodes );
};

var fn_RemoveAll = function(){
    var ofcpsCodes = fn_CheckMhsOfcpsCode('ofcpsCode');
    fn_RemoveMhsOfcpsCode( ofcpsCodes );
};

var fn_RemoveMhsOfcpsCode = function ( ofcpsCodes ){
    var jsonParameter = {
        ofcpsCodes : ofcpsCodes.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mhshrm015/removeMhsOfcpsCode', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsOfcpsCode', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsOfcpsCode', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsOfcpsCode', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titOfcpsCode'),
                    gf_LocaleTrans('default', 'titOfcpsNm'),
                    gf_LocaleTrans('default', 'titUseAt'),
                    gf_LocaleTrans('default', 'titOutptOrdr'),
    ]];
    var dataId = [[ 'ofcpsCode', 'ofcpsNm', 'useAt', 'outptOrdr' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsOfcpsCode ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsOfcpsCode;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mhshrm015/excelMhsOfcpsCode', jsonParameter);
};

var fn_SearchInputMhsOfcpsCode = function (){

    if( !gf_IsNull(ofcpsCode) ) {

        var jsonParameter = {
            ofcpsCode : ofcpsCode 
        };

        var dataSource = gf_NoAsyncTransaction('mhshrm015/findMhsOfcpsCode', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMhsOfcpsCode', 'ofcpsCode', data.ofcpsCode, 'text');
        gf_FormSetValue('saveFormMhsOfcpsCode', 'ofcpsNm', data.ofcpsNm, 'text');
        gf_FormSetValue('saveFormMhsOfcpsCode', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMhsOfcpsCode', 'outptOrdr', data.outptOrdr, 'text');

        $('#saveFormMhsOfcpsCode input[name="ofcpsCode"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
