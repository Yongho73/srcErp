/**
 * 프로그램 : 부서팝업 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.06.03
 * 사용테이블 : MHS_DEPT
 **/

var dhxGridMhsDept;
var dhxGridMhsDeptListInfo;
var deptCode = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMhsDept = gf_LocaleTrans('default','titMhsDept');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MHSHRM008");
 
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

    var dhxGridMhsDeptListInfo = [];
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '50', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCode'), '150', 'center', 'str', 'ro', false, 'deptCode', '')); // 부서 코드
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptKorNm'), '150', 'center', 'str', 'ro', false, 'deptKorNm', '')); // 부서 한글 명
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptEngNm'), '150', 'center', 'str', 'ro', false, 'deptEngNm', '')); // 부서 영문 명
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptAbrv'), '150', 'center', 'str', 'ro', false, 'deptAbrv', '')); // 부서 약어
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBplcCode'), '150', 'center', 'str', 'ro', false, 'bplcCode', '')); // 사업장 코드
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUpperDeptCode'), '150', 'center', 'str', 'ro', false, 'upperDeptCode', '')); // 상위 부서 코드
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptLvl'), '150', 'center', 'str', 'ro', false, 'deptLvl', '')); // 부서 레벨
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOrgnztLvl'), '150', 'center', 'str', 'ro', false, 'orgnztLvl', '')); // 조직 레벨
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptTelno'), '150', 'center', 'str', 'ro', false, 'deptTelno', '')); // 부서 전화번호
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptFaxTelno'), '150', 'center', 'str', 'ro', false, 'deptFaxTelno', '')); // 부서 FAX 전화번호
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseBeginDe'), '150', 'center', 'str', 'ro', false, 'useBeginDe', '')); // 사용 시작 일자
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titUseAt'), '150', 'center', 'na', 'ch', false, 'useAt', '')); // 사용 여부
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptSe'), '150', 'center', 'str', 'ro', false, 'deptSe', '')); // 부서 구분
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titOutptOrdr'), '150', 'center', 'str', 'ro', false, 'outptOrdr', '')); // 출력 순서
    dhxGridMhsDeptListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMhsDept = gf_MakeDhxGrid('dataList', dhxGridMhsDeptListInfo, true, false, false);

    dhxGridMhsDept.enableAutoWidth(true);
    dhxGridMhsDept.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMhsDept.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMhsDept.attachEvent('onRowSelect', fn_SaveMhsDept);

    $("#saveFormMhsDept").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMhsDept input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMhsDept .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMhsDept .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMhsDept #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMhsDept.clearSelection();
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
        var deptCodes = fn_CheckMhsDept('deptCode');
        if( gf_IsNull(deptCodes) ) {
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

    $('#searchFormMhsDept #deptKorNm').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) {
            $('#searchFormMhsDept #btnSearch').click();
        }
    });

    $('#searchFormMhsDept #deptCode').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) {
            $('#searchFormMhsDept #btnSearch').click();
        }
    });

    $('.tdl-2 #btnFormSave').unbind('click').bind('click', function() {

        if($('#saveFormMhsDept').validate().form()){

            var jsonParameter = {
                deptCode : gf_FormGetValue('saveFormMhsDept', 'deptCode', 'text'),
                deptKorNm : gf_FormGetValue('saveFormMhsDept', 'deptKorNm', 'text'),
                deptEngNm : gf_FormGetValue('saveFormMhsDept', 'deptEngNm', 'text'),
                deptAbrv : gf_FormGetValue('saveFormMhsDept', 'deptAbrv', 'text'),
                bplcCode : gf_FormGetValue('saveFormMhsDept', 'bplcCode', 'text'),
                upperDeptCode : gf_FormGetValue('saveFormMhsDept', 'upperDeptCode', 'text').replaceAll('-',''),
                deptLvl : gf_FormGetValue('saveFormMhsDept', 'deptLvl', 'text'),
                orgnztLvl : gf_FormGetValue('saveFormMhsDept', 'orgnztLvl', 'text'),
                deptTelno : gf_FormGetValue('saveFormMhsDept', 'deptTelno', 'text'),
                deptFaxTelno : gf_FormGetValue('saveFormMhsDept', 'deptFaxTelno', 'text'),
                useBeginDe : gf_FormGetValue('saveFormMhsDept', 'useBeginDe', 'text').replaceAll('-',''),
                useAt : gf_FormGetValue('saveFormMhsDept', 'useAt', 'chkboxYN'),
                deptSe : gf_FormGetValue('saveFormMhsDept', 'deptSe', 'text'),
                outptOrdr : gf_FormGetValue('saveFormMhsDept', 'outptOrdr', 'text'),
            };

            var url;

            if( !gf_IsNull(deptCode) ) {
                url = "mhshrm008/modifyMhsDept";
            } else {
                url = "mhshrm008/saveMhsDept";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(deptCode)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMhsDept div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMhsDept.forEachRow(function(rowId) {
            dhxGridMhsDept.cells(rowId,0).setChecked(checkAll);
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

    deptCode = '';

    $("#h4_pr_title").text(titMhsDept + ' ' + gv_TitRegist);
    $('#saveFormMhsDept input[name="deptCode"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMhsDept', 'deptCode', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'deptKorNm', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'deptEngNm', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'deptAbrv', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'bplcCode', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'upperDeptCode', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'deptLvl', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'orgnztLvl', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'deptTelno', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'deptFaxTelno', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'useBeginDe', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'useAt', false, 'chkbox');
    gf_FormSetValue('saveFormMhsDept', 'deptSe', '', 'text');
    gf_FormSetValue('saveFormMhsDept', 'outptOrdr', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsDept', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsDept', 'searchEregDt', 'text'),
        deptKorNm : gf_FormGetValue('searchFormMhsDept', 'deptKorNm', 'text'),
        deptCode : gf_FormGetValue('searchFormMhsDept', 'deptCode', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsDept', 'useAt', 'radio')
    };

    gf_Transaction('gridList', 'mhshrm008/searchMhsDept', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMhsDept.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMhsDept.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMhsDept = function (rId, cInd) {
    deptCode = '';
    var title = titMhsDept + ' ' + gv_TitRegist;

    if (rId > 0) {
    deptCode = '';
    deptCode = dhxGridMhsDept.cells(rId, 2).getValue();
        title = titMhsDept  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMhsDept();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMhsDept();
     }
};

var fn_CheckMhsDept = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMhsDept, col);
    dhxGridMhsDept.forEachRow(function(rowId) {
        if(dhxGridMhsDept.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMhsDept.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var deptCodes = [];
    deptCodes.push( deptCode );
    fn_RemoveMhsDept( deptCodes );
};

var fn_RemoveAll = function(){
    var deptCodes = fn_CheckMhsDept('deptCode');
    fn_RemoveMhsDept( deptCodes );
};

var fn_RemoveMhsDept = function ( deptCodes ){
    var jsonParameter = {
        deptCodes : deptCodes.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mhshrm008/removeMhsDept', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhsDept', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhsDept', 'searchEregDt', 'text'),
        deptKorNm : gf_FormGetValue('searchFormMhsDept', 'deptKorNm', 'text'),
        deptCode : gf_FormGetValue('searchFormMhsDept', 'deptCode', 'text'),
        useAt  : gf_FormGetValue('searchFormMhsDept', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titDeptCode'),
                    gf_LocaleTrans('default', 'titDeptKorNm'),
                    gf_LocaleTrans('default', 'titDeptEngNm'),
                    gf_LocaleTrans('default', 'titDeptAbrv'),
                    gf_LocaleTrans('default', 'titBplcCode'),
                    gf_LocaleTrans('default', 'titUpperDeptCode'),
                    gf_LocaleTrans('default', 'titDeptLvl'),
                    gf_LocaleTrans('default', 'titOrgnztLvl'),
                    gf_LocaleTrans('default', 'titDeptTelno'),
                    gf_LocaleTrans('default', 'titDeptFaxTelno'),
                    gf_LocaleTrans('default', 'titUseBeginDe'),
                    gf_LocaleTrans('default', 'titUseAt'),
                    gf_LocaleTrans('default', 'titDeptSe'),
                    gf_LocaleTrans('default', 'titOutptOrdr'),
    ]];
    var dataId = [[ 'deptCode', 'deptKorNm', 'deptEngNm', 'deptAbrv', 'bplcCode', 'upperDeptCode', 'deptLvl', 'orgnztLvl', 'deptTelno', 'deptFaxTelno', 'useBeginDe', 'useAt', 'deptSe', 'outptOrdr' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsDept ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsDept;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mhshrm008/excelMhsDept', jsonParameter);
};

var fn_SearchInputMhsDept = function (){

    if( !gf_IsNull(deptCode) ) {

        var jsonParameter = {
            deptCode : deptCode 
        };

        var dataSource = gf_NoAsyncTransaction('mhshrm008/findMhsDept', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMhsDept', 'deptCode', data.deptCode, 'text');
        gf_FormSetValue('saveFormMhsDept', 'deptKorNm', data.deptKorNm, 'text');
        gf_FormSetValue('saveFormMhsDept', 'deptEngNm', data.deptEngNm, 'text');
        gf_FormSetValue('saveFormMhsDept', 'deptAbrv', data.deptAbrv, 'text');
        gf_FormSetValue('saveFormMhsDept', 'bplcCode', data.bplcCode, 'text');
        gf_FormSetValue('saveFormMhsDept', 'upperDeptCode', data.upperDeptCode, 'text');
        gf_FormSetValue('saveFormMhsDept', 'deptLvl', data.deptLvl, 'text');
        gf_FormSetValue('saveFormMhsDept', 'orgnztLvl', data.orgnztLvl, 'text');
        gf_FormSetValue('saveFormMhsDept', 'deptTelno', data.deptTelno, 'text');
        gf_FormSetValue('saveFormMhsDept', 'deptFaxTelno', data.deptFaxTelno, 'text');
        gf_FormSetValue('saveFormMhsDept', 'useBeginDe', data.useBeginDe, 'text');
        gf_FormSetValue('saveFormMhsDept', 'useAt', (( data.useAt == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormMhsDept', 'deptSe', data.deptSe, 'text');
        gf_FormSetValue('saveFormMhsDept', 'outptOrdr', data.outptOrdr, 'text');

        $('#saveFormMhsDept input[name="deptCode"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
