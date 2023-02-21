/**
 * 프로그램 : 사회보험율관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.12.16
 * 사용테이블 : MPS_SNLRC_TARIFF
 **/

var dhxGridMpsSnlrcTariff;
var dhxGridMpsSnlrcTariffListInfo;
var changeDe = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMpsSnlrcTariff = gf_LocaleTrans('default','titMpsSnlrcTariff');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MPSBAS002");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();

    gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt', '1');

};


var cf_SetComponents = function (){

    var dhxGridMpsSnlrcTariffListInfo = [];
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titChangeDe'), '150', 'center', 'str', 'ro', false, 'changeDe', '')); // 변경 일자
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNpnLabrrRt'), '150', 'center', 'str', 'ro', false, 'npnLabrrRt', '')); // 국민연금 근로자 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNpnBsnmRt'), '150', 'center', 'str', 'ro', false, 'npnBsnmRt', '')); // 국민연금 사업자 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNpnLwltAmt'), '4%', 'right', 'int', 'ro', false, 'npnLwltAmt', '')); // 국민연금 하한 금액
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNpnUplmtAmt'), '4%', 'right', 'int', 'ro', false, 'npnUplmtAmt', '')); // 국민연금 상한 금액
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titHlthinsLabrrRt'), '150', 'center', 'str', 'ro', false, 'hlthinsLabrrRt', '')); // 건강보험 근로자 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titHlthinsBsnmRt'), '150', 'center', 'str', 'ro', false, 'hlthinsBsnmRt', '')); // 건강보험 사업자 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titLtciHlthinsRt'), '150', 'center', 'str', 'ro', false, 'ltciHlthinsRt', '')); // 장기요양보험 건강보험 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titLtciLabrrRt'), '150', 'center', 'str', 'ro', false, 'ltciLabrrRt', '')); // 장기요양보험 근로자 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titLtciBsnmRt'), '150', 'center', 'str', 'ro', false, 'ltciBsnmRt', '')); // 장기요양보험 사업자 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmplyminsrncLabrrRt'), '150', 'center', 'str', 'ro', false, 'emplyminsrncLabrrRt', '')); // 고용보험 근로자 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmplyminsrncBsnmRt'), '150', 'center', 'str', 'ro', false, 'emplyminsrncBsnmRt', '')); // 고용보험 사업자 비율
    dhxGridMpsSnlrcTariffListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMpsSnlrcTariff = gf_MakeDhxGrid('dataList', dhxGridMpsSnlrcTariffListInfo, true, false, false);

    dhxGridMpsSnlrcTariff.enableAutoWidth(true);
    dhxGridMpsSnlrcTariff.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMpsSnlrcTariff.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMpsSnlrcTariff.attachEvent('onRowSelect', fn_SaveMpsSnlrcTariff);

    $("#saveFormMpsSnlrcTariff").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMpsSnlrcTariff input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMpsSnlrcTariff .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMpsSnlrcTariff .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMpsSnlrcTariff #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMpsSnlrcTariff.clearSelection();
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
        var changeDes = fn_CheckMpsSnlrcTariff('changeDe');
        if( gf_IsNull(changeDes) ) {
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

        if($('#saveFormMpsSnlrcTariff').validate().form()){

            var jsonParameter = {
                changeDe : gf_FormGetValue('saveFormMpsSnlrcTariff', 'changeDe', 'text').replaceAll('-',''),
                npnLabrrRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'npnLabrrRt', 'text'),
                npnBsnmRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'npnBsnmRt', 'text'),
                npnLwltAmt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'npnLwltAmt', 'text'),
                npnUplmtAmt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'npnUplmtAmt', 'text'),
                hlthinsLabrrRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'hlthinsLabrrRt', 'text'),
                hlthinsBsnmRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'hlthinsBsnmRt', 'text'),
                ltciHlthinsRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'ltciHlthinsRt', 'text'),
                ltciLabrrRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'ltciLabrrRt', 'text'),
                ltciBsnmRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'ltciBsnmRt', 'text'),
                emplyminsrncLabrrRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'emplyminsrncLabrrRt', 'text'),
                emplyminsrncBsnmRt : gf_FormGetValue('saveFormMpsSnlrcTariff', 'emplyminsrncBsnmRt', 'text'),
            };

            var url;

            if( !gf_IsNull(changeDe) ) {
                url = "mpsbas002/modifyMpsSnlrcTariff";
            } else {
                url = "mpsbas002/saveMpsSnlrcTariff";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(changeDe)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMpsSnlrcTariff div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMpsSnlrcTariff.forEachRow(function(rowId) {
            dhxGridMpsSnlrcTariff.cells(rowId,0).setChecked(checkAll);
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

    $("#h4_pr_title").text(titMpsSnlrcTariff + ' ' + gv_TitRegist);
    $('#saveFormMpsSnlrcTariff input[name="changeDe"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMpsSnlrcTariff', 'changeDe', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'npnLabrrRt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'npnBsnmRt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'npnLwltAmt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'npnUplmtAmt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'hlthinsLabrrRt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'hlthinsBsnmRt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'ltciHlthinsRt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'ltciLabrrRt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'ltciBsnmRt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'emplyminsrncLabrrRt', '', 'text');
    gf_FormSetValue('saveFormMpsSnlrcTariff', 'emplyminsrncBsnmRt', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMpsSnlrcTariff', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMpsSnlrcTariff', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMpsSnlrcTariff', 'useAt', 'radio')
    };

    gf_Transaction('gridList', 'mpsbas002/searchMpsSnlrcTariff', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMpsSnlrcTariff.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMpsSnlrcTariff.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMpsSnlrcTariff = function (rId, cInd) {
    changeDe = '';
    var title = titMpsSnlrcTariff + ' ' + gv_TitRegist;

    if (rId > 0) {
    changeDe = '';
    changeDe = dhxGridMpsSnlrcTariff.cells(rId, 2).getValue();
        title = titMpsSnlrcTariff  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMpsSnlrcTariff();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMpsSnlrcTariff();
     }
};

var fn_CheckMpsSnlrcTariff = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMpsSnlrcTariff, col);
    dhxGridMpsSnlrcTariff.forEachRow(function(rowId) {
        if(dhxGridMpsSnlrcTariff.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMpsSnlrcTariff.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var changeDes = [];
    changeDes.push( changeDe );
    fn_RemoveMpsSnlrcTariff( changeDes );
};

var fn_RemoveAll = function(){
    var changeDes = fn_CheckMpsSnlrcTariff('changeDe');
    fn_RemoveMpsSnlrcTariff( changeDes );
};

var fn_RemoveMpsSnlrcTariff = function ( changeDes ){
    var jsonParameter = {
        changeDes : changeDes.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mpsbas002/removeMpsSnlrcTariff', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMpsSnlrcTariff', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMpsSnlrcTariff', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMpsSnlrcTariff', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titChangeDe'),
                    gf_LocaleTrans('default', 'titNpnLabrrRt'),
                    gf_LocaleTrans('default', 'titNpnBsnmRt'),
                    gf_LocaleTrans('default', 'titNpnLwltAmt'),
                    gf_LocaleTrans('default', 'titNpnUplmtAmt'),
                    gf_LocaleTrans('default', 'titHlthinsLabrrRt'),
                    gf_LocaleTrans('default', 'titHlthinsBsnmRt'),
                    gf_LocaleTrans('default', 'titLtciHlthinsRt'),
                    gf_LocaleTrans('default', 'titLtciLabrrRt'),
                    gf_LocaleTrans('default', 'titLtciBsnmRt'),
                    gf_LocaleTrans('default', 'titEmplyminsrncLabrrRt'),
                    gf_LocaleTrans('default', 'titEmplyminsrncBsnmRt'),
    ]];
    var dataId = [[ 'changeDe', 'npnLabrrRt', 'npnBsnmRt', 'npnLwltAmt', 'npnUplmtAmt', 'hlthinsLabrrRt', 'hlthinsBsnmRt', 'ltciHlthinsRt', 'ltciLabrrRt', 'ltciBsnmRt', 'emplyminsrncLabrrRt', 'emplyminsrncBsnmRt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsSnlrcTariff ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsSnlrcTariff;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mpsbas002/excelMpsSnlrcTariff', jsonParameter);
};

var fn_SearchInputMpsSnlrcTariff = function (){

    if( !gf_IsNull(changeDe) ) {

        var jsonParameter = {
            changeDe : changeDe 
        };

        var dataSource = gf_NoAsyncTransaction('mpsbas002/findMpsSnlrcTariff', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMpsSnlrcTariff', 'changeDe', data.changeDe, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'npnLabrrRt', data.npnLabrrRt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'npnBsnmRt', data.npnBsnmRt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'npnLwltAmt', data.npnLwltAmt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'npnUplmtAmt', data.npnUplmtAmt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'hlthinsLabrrRt', data.hlthinsLabrrRt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'hlthinsBsnmRt', data.hlthinsBsnmRt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'ltciHlthinsRt', data.ltciHlthinsRt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'ltciLabrrRt', data.ltciLabrrRt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'ltciBsnmRt', data.ltciBsnmRt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'emplyminsrncLabrrRt', data.emplyminsrncLabrrRt, 'text');
        gf_FormSetValue('saveFormMpsSnlrcTariff', 'emplyminsrncBsnmRt', data.emplyminsrncBsnmRt, 'text');

        $('#saveFormMpsSnlrcTariff input[name="changeDe"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
