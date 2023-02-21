/**
 * 프로그램 : 직채관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.28
 * 사용테이블 : MHS_RSPOFC_CODE
 **/

var dhxGridMhsRspofcCode;
var dhxGridMhsRspofcCodeListInfo;
var rspofcCode = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMhsRspofcCode = gf_LocaleTrans('default','titMhsRspofcCode');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MHSHRM014");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();

    gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt', '1');

};


var cf_SetComponents = function (){

    var dhxGridMhsRspofcCodeListInfo = [];
    dhxGridMhsRspofcCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMhsRspofcCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMhsRspofcCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRspofcCode'), '150', 'center', 'str', 'ro', false, 'rspofcCode', '')); // 직책코
    dhxGridMhsRspofcCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRspofcNm'), '150', 'center', 'str', 'ro', false, 'rspofcNm', '')); // 직급코드의 명칭을 기록하기위한 항목
    dhxGridMhsRspofcCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'), '150', 'center', 'na', 'ch', false, 'useAt', '')); // 코드 사용 유무 check 위한 항목
    dhxGridMhsRspofcCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOutptOrdr'), '150', 'center', 'str', 'ro', false, 'outptOrdr', '')); // 직급코드의 조회 및 출력시 나타내어질 순번
    dhxGridMhsRspofcCodeListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMhsRspofcCode = gf_MakeDhxGrid('dataList', dhxGridMhsRspofcCodeListInfo, true, false, false);

    dhxGridMhsRspofcCode.enableAutoWidth(true);
    dhxGridMhsRspofcCode.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMhsRspofcCode.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMhsRspofcCode.attachEvent('onRowSelect', fn_SaveMhsRspofcCode);

    $("#saveFormMhsRspofcCode").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMhsRspofcCode input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMhsRspofcCode .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMhsRspofcCode .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMhsRspofcCode #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMhsRspofcCode.clearSelection();
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
        var rspofcCodes = fn_CheckMhsRspofcCode('rspofcCode');
        if( gf_IsNull(rspofcCodes) ) {
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

        if($('#saveFormMhsRspofcCode').validate().form()){

            var jsonParameter = {
                rspofcCode : gf_FormGetValue('saveFormMhsRspofcCode', 'rspofcCode', 'text'),
                rspofcNm : gf_FormGetValue('saveFormMhsRspofcCode', 'rspofcNm', 'text'),
                useAt : gf_FormGetValue('saveFormMhsRspofcCode', 'useAt', 'chkboxYN'),
                outptOrdr : gf_FormGetValue('saveFormMhsRspofcCode', 'outptOrdr', 'text'),
            };

            var url;

            if( !gf_IsNull(rspofcCode) ) {
                url = "mhshrm014/modifyMhsRspofcCode";
            } else {
                url = "mhshrm014/saveMhsRspofcCode";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(rspofcCode)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMhsRspofcCode div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMhsRspofcCode.forEachRow(function(rowId) {
            dhxGridMhsRspofcCode.cells(rowId,0).setChecked(checkAll);
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

    rspofcCode = '';

    $("#h4_pr_title").text(titMhsRspofcCode + ' ' + gv_TitRegist);
    $('#saveFormMhsRspofcCode input[name="rspofcCode"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMhsRspofcCode', 'rspofcCode', '', 'text');
    gf_FormSetValue('saveFormMhsRspofcCode', 'rspofcNm', '', 'text');
    gf_FormSetValue('saveFormMhsRspofcCode', 'useAt', false, 'chkbox');
    gf_FormSetValue('saveFormMhsRspofcCode', 'outptOrdr', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsRspofcCode', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsRspofcCode', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsRspofcCode', 'useAt', 'radio')
    };

    gf_Transaction('gridList', 'mhshrm014/searchMhsRspofcCode', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMhsRspofcCode.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMhsRspofcCode.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMhsRspofcCode = function (rId, cInd) {
    rspofcCode = '';
    var title = titMhsRspofcCode + ' ' + gv_TitRegist;

    if (rId > 0) {
    rspofcCode = '';
    rspofcCode = dhxGridMhsRspofcCode.cells(rId, 2).getValue();
        title = titMhsRspofcCode  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMhsRspofcCode();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMhsRspofcCode();
     }
};

var fn_CheckMhsRspofcCode = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMhsRspofcCode, col);
    dhxGridMhsRspofcCode.forEachRow(function(rowId) {
        if(dhxGridMhsRspofcCode.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMhsRspofcCode.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var rspofcCodes = [];
    rspofcCodes.push( rspofcCode );
    fn_RemoveMhsRspofcCode( rspofcCodes );
};

var fn_RemoveAll = function(){
    var rspofcCodes = fn_CheckMhsRspofcCode('rspofcCode');
    fn_RemoveMhsRspofcCode( rspofcCodes );
};

var fn_RemoveMhsRspofcCode = function ( rspofcCodes ){
    var jsonParameter = {
        rspofcCodes : rspofcCodes.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mhshrm014/removeMhsRspofcCode', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsRspofcCode', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsRspofcCode', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsRspofcCode', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titRspofcCode'),
                    gf_LocaleTrans('default', 'titRspofcNm'),
                    gf_LocaleTrans('default', 'titUseAt'),
                    gf_LocaleTrans('default', 'titOutptOrdr'),
    ]];
    var dataId = [[ 'rspofcCode', 'rspofcNm', 'useAt', 'outptOrdr' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsRspofcCode ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsRspofcCode;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mhshrm014/excelMhsRspofcCode', jsonParameter);
};

var fn_SearchInputMhsRspofcCode = function (){

    if( !gf_IsNull(rspofcCode) ) {

        var jsonParameter = {
            rspofcCode : rspofcCode 
        };

        var dataSource = gf_NoAsyncTransaction('mhshrm014/findMhsRspofcCode', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMhsRspofcCode', 'rspofcCode', data.rspofcCode, 'text');
        gf_FormSetValue('saveFormMhsRspofcCode', 'rspofcNm', data.rspofcNm, 'text');
        gf_FormSetValue('saveFormMhsRspofcCode', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMhsRspofcCode', 'outptOrdr', data.outptOrdr, 'text');

        $('#saveFormMhsRspofcCode input[name="rspofcCode"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
