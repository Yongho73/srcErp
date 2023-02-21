/**
 * 프로그램 : 급여지급일자등록 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.06.14
 * 사용테이블 : MPS_PYMNTDE
 **/

var dhxGridMpsPymntde;
var dhxGridMpsPymntdeListInfo;
var applcYm = '';
var pymntSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMpsPymntde = gf_LocaleTrans('default','titMpsPymntde');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MPSBSC006");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();

    gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt', '1');

};


var cf_SetComponents = function (){

	var dhxGridMpsPymntYyMmListInfo = [];
	dhxGridMpsPymntYyMmListInfo.push(gf_MakeDhxGridHeader('적용월', '150', 'center', 'str', 'ro', false, 'applcYm', '')); // 적용 년월
	dhxGridMpsPymntYyMmListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMpsPymntde = gf_MakeDhxGrid('dataList0', dhxGridMpsPymntYyMmListInfo, true, false, false);

    dhxGridMpsPymntde.enableAutoWidth(true);
    dhxGridMpsPymntde.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMpsPymntde.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMpsPymntde.attachEvent('onRowSelect', fn_SaveMpsPymntde);

    $("#saveFormMpsPymntde").validate({
        errorElement: 'div'
    });
	
    var dhxGridMpsPymntdeListInfo = [];
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '50', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titApplcYm'), '150', 'center', 'str', 'ro', false, 'applcYm', '')); // 적용 년월
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPymntSn'), '150', 'center', 'str', 'ro', false, 'pymntSn', '')); // 지급 순번
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPymntDe'), '150', 'center', 'str', 'ro', false, 'pymntDe', '')); // 지급 일자
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titPymntDtls'), '150', 'center', 'str', 'ro', false, 'pymntDtls', '')); // 지급 내역
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titClosAt'), '150', 'center', 'na', 'ch', false, 'closAt', '')); // 마감 여부
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOthbcAt'), '150', 'center', 'na', 'ch', false, 'othbcAt', '')); // 공개 여부
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOthbcDt'), '150', 'center', 'str', 'ro', false, 'othbcDt', '')); // 공개 일시
    dhxGridMpsPymntdeListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMpsPymntde = gf_MakeDhxGrid('dataList', dhxGridMpsPymntdeListInfo, true, false, false);

    dhxGridMpsPymntde.enableAutoWidth(true);
    dhxGridMpsPymntde.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMpsPymntde.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMpsPymntde.attachEvent('onRowSelect', fn_SaveMpsPymntde);

    $("#saveFormMpsPymntde").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMpsPymntde input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMpsPymntde .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMpsPymntde .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMpsPymntde #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMpsPymntde.clearSelection();
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
        var applcYms = fn_CheckMpsPymntde('applcYm');
        var pymntSns = fn_CheckMpsPymntde('pymntSn');
        if( gf_IsNull(applcYms) && gf_IsNull(pymntSns) ) {
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

        if($('#saveFormMpsPymntde').validate().form()){

            var jsonParameter = {
                applcYm : gf_FormGetValue('saveFormMpsPymntde', 'applcYm', 'text'),
                pymntSn : gf_FormGetValue('saveFormMpsPymntde', 'pymntSn', 'text'),
                pymntDe : gf_FormGetValue('saveFormMpsPymntde', 'pymntDe', 'text').replaceAll('-',''),
                pymntDtls : gf_FormGetValue('saveFormMpsPymntde', 'pymntDtls', 'text'),
                closAt : gf_FormGetValue('saveFormMpsPymntde', 'closAt', 'chkboxYN'),
                othbcAt : gf_FormGetValue('saveFormMpsPymntde', 'othbcAt', 'chkboxYN'),
                othbcDt : gf_FormGetValue('saveFormMpsPymntde', 'othbcDt', 'text'),
            };

            var url;

            if( !gf_IsNull(applcYm) && !gf_IsNull(pymntSn) ) {
                url = "mpsbsc006/modifyMpsPymntde";
            } else {
                url = "mpsbsc006/saveMpsPymntde";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(applcYm) && !gf_IsNull(pymntSn)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMpsPymntde div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMpsPymntde.forEachRow(function(rowId) {
            dhxGridMpsPymntde.cells(rowId,0).setChecked(checkAll);
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

    applcYm = '';
    pymntSn = '';

    $("#h4_pr_title").text(titMpsPymntde + ' ' + gv_TitRegist);
    $('#saveFormMpsPymntde input[name="applcYm"]').removeAttr("disabled");
    $('#saveFormMpsPymntde input[name="pymntSn"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMpsPymntde', 'applcYm', '', 'text');
    gf_FormSetValue('saveFormMpsPymntde', 'pymntSn', '', 'text');
    gf_FormSetValue('saveFormMpsPymntde', 'pymntDe', '', 'text');
    gf_FormSetValue('saveFormMpsPymntde', 'pymntDtls', '', 'text');
    gf_FormSetValue('saveFormMpsPymntde', 'closAt', false, 'chkbox');
    gf_FormSetValue('saveFormMpsPymntde', 'othbcAt', false, 'chkbox');
    gf_FormSetValue('saveFormMpsPymntde', 'othbcDt', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMpsPymntde', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMpsPymntde', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMpsPymntde', 'useAt', 'radio')
    };

    gf_Transaction('gridList', 'mpsbsc006/searchMpsPymntde', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMpsPymntde.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMpsPymntde.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMpsPymntde = function (rId, cInd) {
    applcYm = '';
    pymntSn = '';
    var title = titMpsPymntde + ' ' + gv_TitRegist;

    if (rId > 0) {
    applcYm = '';
    applcYm = dhxGridMpsPymntde.cells(rId, 2).getValue();
    pymntSn = '';
    pymntSn = dhxGridMpsPymntde.cells(rId, 3).getValue();
        title = titMpsPymntde  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMpsPymntde();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMpsPymntde();
     }
};

var fn_CheckMpsPymntde = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMpsPymntde, col);
    dhxGridMpsPymntde.forEachRow(function(rowId) {
        if(dhxGridMpsPymntde.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMpsPymntde.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var applcYms = [];
    applcYms.push( applcYm );
    var pymntSns = [];
    pymntSns.push( pymntSn );
    fn_RemoveMpsPymntde( applcYms, pymntSns );
};

var fn_RemoveAll = function(){
    var applcYms = fn_CheckMpsPymntde('applcYm');
    var pymntSns = fn_CheckMpsPymntde('pymntSn');
    fn_RemoveMpsPymntde( applcYms, pymntSns );
};

var fn_RemoveMpsPymntde = function ( applcYms, pymntSns ){
    var jsonParameter = {
        applcYms : applcYms.join(','),
        pymntSns : pymntSns.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mpsbsc006/removeMpsPymntde', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMpsPymntde', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMpsPymntde', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMpsPymntde', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titApplcYm'),
                    gf_LocaleTrans('default', 'titPymntSn'),
                    gf_LocaleTrans('default', 'titPymntDe'),
                    gf_LocaleTrans('default', 'titPymntDtls'),
                    gf_LocaleTrans('default', 'titClosAt'),
                    gf_LocaleTrans('default', 'titOthbcAt'),
                    gf_LocaleTrans('default', 'titOthbcDt'),
    ]];
    var dataId = [[ 'applcYm', 'pymntSn', 'pymntDe', 'pymntDtls', 'closAt', 'othbcAt', 'othbcDt' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMpsPymntde ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMpsPymntde;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mpsbsc006/excelMpsPymntde', jsonParameter);
};

var fn_SearchInputMpsPymntde = function (){

    if( !gf_IsNull(applcYm) && !gf_IsNull(pymntSn) ) {

        var jsonParameter = {
            applcYm : applcYm ,
            pymntSn : pymntSn 
        };

        var dataSource = gf_NoAsyncTransaction('mpsbsc006/findMpsPymntde', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMpsPymntde', 'applcYm', data.applcYm, 'text');
        gf_FormSetValue('saveFormMpsPymntde', 'pymntSn', data.pymntSn, 'text');
        gf_FormSetValue('saveFormMpsPymntde', 'pymntDe', data.pymntDe, 'text');
        gf_FormSetValue('saveFormMpsPymntde', 'pymntDtls', data.pymntDtls, 'text');
        gf_FormSetValue('saveFormMpsPymntde', 'closAt', (( data.closAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMpsPymntde', 'othbcAt', (( data.othbcAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMpsPymntde', 'othbcDt', data.othbcDt, 'text');

        $('#saveFormMpsPymntde input[name="applcYm"]').attr("disabled", true);
        $('#saveFormMpsPymntde input[name="pymntSn"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
