/**
 * 프로그램 : 직급코드관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.13
 * 사용테이블 : MHS_CLSF_CODE
 **/

var dhxGridMhsClsfCode;
var dhxGridMhsClsfCodeListInfo;
var clsfCode = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMhsClsfCode = gf_LocaleTrans('default','titMhsClsfCode');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MHSHRM004");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();

    gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt', '1');

};


var cf_SetComponents = function (){

    var dhxGridMhsClsfCodeListInfo = [];
    dhxGridMhsClsfCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '50', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMhsClsfCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMhsClsfCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titClsfCode'), '150', 'center', 'str', 'ro', false, 'clsfCode', '')); // 직급 코드
    dhxGridMhsClsfCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titClsfNm'), '150', 'center', 'str', 'ro', false, 'clsfNm', '')); // 직급 명
    dhxGridMhsClsfCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'), '150', 'center', 'na', 'ch', false, 'useAt', '')); // 사용 여부
    dhxGridMhsClsfCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOutptOrdr'), '150', 'center', 'str', 'ro', false, 'sortOrdr', '')); // 출력 순서
    dhxGridMhsClsfCodeListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMhsClsfCode = gf_MakeDhxGrid('dataList', dhxGridMhsClsfCodeListInfo, true, false, false);

    dhxGridMhsClsfCode.enableAutoWidth(true);
    dhxGridMhsClsfCode.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMhsClsfCode.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMhsClsfCode.attachEvent('onRowSelect', fn_SaveMhsClsfCode);

    $("#saveFormMhsClsfCode").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMhsClsfCode input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMhsClsfCode .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMhsClsfCode .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMhsClsfCode #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMhsClsfCode.clearSelection();
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
        var clsfCodes = fn_CheckMhsClsfCode('clsfCode');
        if( gf_IsNull(clsfCodes) ) {
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

    $('#searchFormMhsClsfCode #clsfNm').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) {
            $('#searchFormMhsClsfCode #btnSearch').click();
        }
    });

    $('.tdl-2 #btnFormSave').unbind('click').bind('click', function() {

        if($('#saveFormMhsClsfCode').validate().form()){

            var jsonParameter = {
                clsfCode : gf_FormGetValue('saveFormMhsClsfCode', 'clsfCode', 'text'),
                clsfNm : gf_FormGetValue('saveFormMhsClsfCode', 'clsfNm', 'text'),
                useAt : gf_FormGetValue('saveFormMhsClsfCode', 'useAt', 'chkboxYN'),
                sortOrdr : gf_FormGetValue('saveFormMhsClsfCode', 'sortOrdr', 'text'),
            };

            var url;

            if( !gf_IsNull(clsfCode) ) {
                url = "mhshrm004/modifyMhsClsfCode";
            } else {
                url = "mhshrm004/saveMhsClsfCode";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(clsfCode)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMhsClsfCode div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMhsClsfCode.forEachRow(function(rowId) {
            dhxGridMhsClsfCode.cells(rowId,0).setChecked(checkAll);
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

    clsfCode = '';

    $("#h4_pr_title").text(titMhsClsfCode + ' ' + gv_TitRegist);
    $('#saveFormMhsClsfCode input[name="clsfCode"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMhsClsfCode', 'clsfCode', '', 'text');
    gf_FormSetValue('saveFormMhsClsfCode', 'clsfNm', '', 'text');
    gf_FormSetValue('saveFormMhsClsfCode', 'useAt', false, 'chkbox');
    gf_FormSetValue('saveFormMhsClsfCode', 'sortOrdr', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        
        clsfNm : gf_FormGetValue('searchFormMhsClsfCode', 'clsfNm', 'text')

    };

    gf_Transaction('gridList', 'mhshrm004/searchMhsClsfCode', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMhsClsfCode.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMhsClsfCode.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMhsClsfCode = function (rId, cInd) {
    clsfCode = '';
    var title = titMhsClsfCode + ' ' + gv_TitRegist;

    if (rId > 0) {
    clsfCode = '';
    clsfCode = dhxGridMhsClsfCode.cells(rId, 2).getValue();
        title = titMhsClsfCode  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMhsClsfCode();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMhsClsfCode();
     }
};

var fn_CheckMhsClsfCode = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMhsClsfCode, col);
    dhxGridMhsClsfCode.forEachRow(function(rowId) {
        if(dhxGridMhsClsfCode.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMhsClsfCode.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var clsfCodes = [];
    clsfCodes.push( clsfCode );
    fn_RemoveMhsClsfCode( clsfCodes );
};

var fn_RemoveAll = function(){
    var clsfCodes = fn_CheckMhsClsfCode('clsfCode');
    fn_RemoveMhsClsfCode( clsfCodes );
};

var fn_RemoveMhsClsfCode = function ( clsfCodes ){
    var jsonParameter = {
        clsfCodes : clsfCodes.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mhshrm004/removeMhsClsfCode', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsClsfCode', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsClsfCode', 'searchEregDt', 'text'),
        clsfNm : gf_FormGetValue('searchFormMhsClsfCode', 'clsfNm', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsClsfCode', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titClsfCode'),
                    gf_LocaleTrans('default', 'titClsfNm'),
                    gf_LocaleTrans('default', 'titUseAt'),
                    gf_LocaleTrans('default', 'titOutptOrdr'),
    ]];
    var dataId = [[ 'clsfCode', 'clsfNm', 'useAt', 'sortOrdr' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsClsfCode ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsClsfCode;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mhshrm004/excelMhsClsfCode', jsonParameter);
};

var fn_SearchInputMhsClsfCode = function (){

    if( !gf_IsNull(clsfCode) ) {

        var jsonParameter = {
            clsfCode : clsfCode 
        };

        var dataSource = gf_NoAsyncTransaction('mhshrm004/findMhsClsfCode', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMhsClsfCode', 'clsfCode', data.clsfCode, 'text');
        gf_FormSetValue('saveFormMhsClsfCode', 'clsfNm', data.clsfNm, 'text');
        gf_FormSetValue('saveFormMhsClsfCode', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMhsClsfCode', 'sortOrdr', data.sortOrdr, 'text');

        $('#saveFormMhsClsfCode input[name="clsfCode"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
