/**
 * 프로그램 : 정원등록 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.17
 * 사용테이블 : MHS_PSNCPA
 **/

var dhxGridMhsPsncpa;
var dhxGridMhsPsncpaListInfo;
var changeDe = '';
var jssfcCode = '';
var clsfCode = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMhsPsncpa = gf_LocaleTrans('default','titMhsPsncpa');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MHSHRM003");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();

    gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt', '1');

};


var cf_SetComponents = function (){

    var dhxGridMhsPsncpaListInfo = [];
    dhxGridMhsPsncpaListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '50', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMhsPsncpaListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMhsPsncpaListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titChangeDe'), '150', 'center', 'str', 'ro', false, 'changeDe', '')); // 변경 일자
    dhxGridMhsPsncpaListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titJssfcCode'), '150', 'center', 'str', 'ro', false, 'jssfcCode', '')); // 직종 코드
    dhxGridMhsPsncpaListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titClsfCode'), '150', 'center', 'str', 'ro', false, 'clsfCode', '')); // 직급 코드
    dhxGridMhsPsncpaListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPsncpaCo'), '150', 'center', 'str', 'ro', false, 'psncpaCo', '')); // 정원 수
    dhxGridMhsPsncpaListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titRm'), '150', 'center', 'str', 'ro', false, 'rm', '')); // 비고
    dhxGridMhsPsncpaListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMhsPsncpa = gf_MakeDhxGrid('dataList', dhxGridMhsPsncpaListInfo, true, false, false);

    dhxGridMhsPsncpa.enableAutoWidth(true);
    dhxGridMhsPsncpa.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMhsPsncpa.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMhsPsncpa.attachEvent('onRowSelect', fn_SaveMhsPsncpa);

    $("#saveFormMhsPsncpa").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMhsPsncpa input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMhsPsncpa .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMhsPsncpa .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMhsPsncpa #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMhsPsncpa.clearSelection();
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
        var changeDes = fn_CheckMhsPsncpa('changeDe');
        var jssfcCodes = fn_CheckMhsPsncpa('jssfcCode');
        var clsfCodes = fn_CheckMhsPsncpa('clsfCode');
        if( gf_IsNull(changeDes) && gf_IsNull(jssfcCodes) && gf_IsNull(clsfCodes) ) {
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

        if($('#saveFormMhsPsncpa').validate().form()){

            var jsonParameter = {
                changeDe : gf_FormGetValue('saveFormMhsPsncpa', 'changeDe', 'text').replaceAll('-',''),
                jssfcCode : gf_FormGetValue('saveFormMhsPsncpa', 'jssfcCode', 'text'),
                clsfCode : gf_FormGetValue('saveFormMhsPsncpa', 'clsfCode', 'text'),
                psncpaCo : gf_FormGetValue('saveFormMhsPsncpa', 'psncpaCo', 'text'),
                rm : gf_FormGetValue('saveFormMhsPsncpa', 'rm', 'text'),
            };

            var url;

            if( !gf_IsNull(changeDe) && !gf_IsNull(jssfcCode) && !gf_IsNull(clsfCode) ) {
                url = "mhshrm003/modifyMhsPsncpa";
            } else {
                url = "mhshrm003/saveMhsPsncpa";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(changeDe) && !gf_IsNull(jssfcCode) && !gf_IsNull(clsfCode)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMhsPsncpa div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMhsPsncpa.forEachRow(function(rowId) {
            dhxGridMhsPsncpa.cells(rowId,0).setChecked(checkAll);
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

    changeDe = '';
    jssfcCode = '';
    clsfCode = '';

    $("#h4_pr_title").text(titMhsPsncpa + ' ' + gv_TitRegist);
    $('#saveFormMhsPsncpa input[name="changeDe"]').removeAttr("disabled");
    $('#saveFormMhsPsncpa input[name="jssfcCode"]').removeAttr("disabled");
    $('#saveFormMhsPsncpa input[name="clsfCode"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMhsPsncpa', 'changeDe', '', 'text');
    gf_FormSetValue('saveFormMhsPsncpa', 'jssfcCode', '', 'text');
    gf_FormSetValue('saveFormMhsPsncpa', 'clsfCode', '', 'text');
    gf_FormSetValue('saveFormMhsPsncpa', 'psncpaCo', '', 'text');
    gf_FormSetValue('saveFormMhsPsncpa', 'rm', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsPsncpa', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsPsncpa', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsPsncpa', 'useAt', 'radio')
    };

    gf_Transaction('gridList', 'mhshrm003/searchMhsPsncpa', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMhsPsncpa.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMhsPsncpa.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMhsPsncpa = function (rId, cInd) {
    changeDe = '';
    jssfcCode = '';
    clsfCode = '';
    var title = titMhsPsncpa + ' ' + gv_TitRegist;

    if (rId > 0) {
    changeDe = '';
    changeDe = dhxGridMhsPsncpa.cells(rId, 2).getValue();
    jssfcCode = '';
    jssfcCode = dhxGridMhsPsncpa.cells(rId, 3).getValue();
    clsfCode = '';
    clsfCode = dhxGridMhsPsncpa.cells(rId, 4).getValue();
        title = titMhsPsncpa  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMhsPsncpa();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMhsPsncpa();
     }
};

var fn_CheckMhsPsncpa = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMhsPsncpa, col);
    dhxGridMhsPsncpa.forEachRow(function(rowId) {
        if(dhxGridMhsPsncpa.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMhsPsncpa.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var changeDes = [];
    changeDes.push( changeDe );
    var jssfcCodes = [];
    jssfcCodes.push( jssfcCode );
    var clsfCodes = [];
    clsfCodes.push( clsfCode );
    fn_RemoveMhsPsncpa( changeDes, jssfcCodes, clsfCodes );
};

var fn_RemoveAll = function(){
    var changeDes = fn_CheckMhsPsncpa('changeDe');
    var jssfcCodes = fn_CheckMhsPsncpa('jssfcCode');
    var clsfCodes = fn_CheckMhsPsncpa('clsfCode');
    fn_RemoveMhsPsncpa( changeDes, jssfcCodes, clsfCodes );
};

var fn_RemoveMhsPsncpa = function ( changeDes, jssfcCodes, clsfCodes ){
    var jsonParameter = {
        changeDes : changeDes.join(','),
        jssfcCodes : jssfcCodes.join(','),
        clsfCodes : clsfCodes.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mhshrm003/removeMhsPsncpa', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsPsncpa', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsPsncpa', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsPsncpa', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titChangeDe'),
                    gf_LocaleTrans('default', 'titJssfcCode'),
                    gf_LocaleTrans('default', 'titClsfCode'),
                    gf_LocaleTrans('default', 'titPsncpaCo'),
                    gf_LocaleTrans('default', 'titRm'),
    ]];
    var dataId = [[ 'changeDe', 'jssfcCode', 'clsfCode', 'psncpaCo', 'rm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsPsncpa ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsPsncpa;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mhshrm003/excelMhsPsncpa', jsonParameter);
};

var fn_SearchInputMhsPsncpa = function (){

    if( !gf_IsNull(changeDe) && !gf_IsNull(jssfcCode) && !gf_IsNull(clsfCode) ) {

        var jsonParameter = {
            changeDe : changeDe ,
            jssfcCode : jssfcCode ,
            clsfCode : clsfCode 
        };

        var dataSource = gf_NoAsyncTransaction('mhshrm003/findMhsPsncpa', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMhsPsncpa', 'changeDe', data.changeDe, 'text');
        gf_FormSetValue('saveFormMhsPsncpa', 'jssfcCode', data.jssfcCode, 'text');
        gf_FormSetValue('saveFormMhsPsncpa', 'clsfCode', data.clsfCode, 'text');
        gf_FormSetValue('saveFormMhsPsncpa', 'psncpaCo', data.psncpaCo, 'text');
        gf_FormSetValue('saveFormMhsPsncpa', 'rm', data.rm, 'text');

        $('#saveFormMhsPsncpa input[name="changeDe"]').attr("disabled", true);
        $('#saveFormMhsPsncpa input[name="jssfcCode"]').attr("disabled", true);
        $('#saveFormMhsPsncpa input[name="clsfCode"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
