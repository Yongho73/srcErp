/**
 * 프로그램 : 학교코드관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.13
 * 사용테이블 : MHS_SCHUL_CODE
 **/

var dhxGridMhsSchulCode;
var dhxGridMhsSchulCodeListInfo;
var dhxComboAreaCode;
var dhxComboSchulSe;
var dhxInputFormAreaCodeCombo;
var dhxInputFormSchulSeCombo;
var schulCode = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMhsSchulCode = gf_LocaleTrans('default','titMhsSchulCode');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MHSHRM007");
    dhxComboAreaCode = gf_MakeDhxCombo(
    		'divComboAreaCode',
    		'searchFormMhsSchulCode',
    		150,
     		'combo/searchStmCode?codekindCode=C079',
    		true,
     		'code',
    		'codeNm',
    		'',
    		'');
    dhxComboSchulSe = gf_MakeDhxCombo(
    		'divComboSchulSe',
    		'searchFormMhsSchulCode',
    		150,
    		'combo/searchStmCode?codekindCode=C080',
    		true,
    		'code',
    		'codeNm',
    		'',
    		'');


    dhxInputFormAreaCodeCombo = gf_MakeDhxCombo(
			'divInputFormAreaCodeComboBox', 
			'saveFormMhsSchulCode', 
			150, 
			'combo/searchStmCode?codekindCode=C079', 
			true, 
			'code', 
			'codeNm',
			'',
			'');
    
	dhxInputFormSchulSeCombo = gf_MakeDhxCombo(
			'divInputFormSchulSeComboBox', 
			'saveFormMhsSchulCode', 
			150, 
			'combo/searchStmCode?codekindCode=C080', 
			true, 
			'code', 
			'codeNm',
			'',
			'');
};


var cf_SetComponents = function (){

    var dhxGridMhsSchulCodeListInfo = [];
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '50', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '50', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSchulCode'), '50', 'center', 'str', 'ro', false, 'schulCode', '')); // 학교 코드
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSchulNm'), '150', 'center', 'str', 'ro', false, 'schulNm', '')); // 학교 명
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAreaCode'), '80', 'center', 'str', 'ro', false, 'areaCodeNm', '')); // 지역 코드
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSchulSe'), '80', 'center', 'str', 'ro', false, 'schulSeNm', '')); // 학교 구분
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titZip'), '80', 'center', 'str', 'ro', false, 'zip', '')); // 우편번호
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAdres'), '150', 'center', 'str', 'ro', false, 'adres', '')); // 주소
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titTelno'), '100', 'center', 'str', 'ro', false, 'telno', '')); // 전화번호
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titFaxTelno'), '100', 'center', 'str', 'ro', false, 'faxTelno', '')); // 팩스 전화번호
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titAreaCode'), '0', 'center', 'str', 'ro', true, 'areaCode', '')); // 지역 코드
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titSchulSe'), '0', 'center', 'str', 'ro', true, 'schulSe', '')); // 학교 구분
    
    dhxGridMhsSchulCodeListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMhsSchulCode = gf_MakeDhxGrid('dataList', dhxGridMhsSchulCodeListInfo, true, false, false);

    dhxGridMhsSchulCode.enableAutoWidth(true);
    dhxGridMhsSchulCode.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMhsSchulCode.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMhsSchulCode.attachEvent('onRowSelect', fn_SaveMhsSchulCode);

    $("#saveFormMhsSchulCode").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormMhsSchulCode input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMhsSchulCode .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMhsSchulCode .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMhsSchulCode #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMhsSchulCode.clearSelection();
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
        var schulCodes = fn_CheckMhsSchulCode('schulCode');
        if( gf_IsNull(schulCodes) ) {
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

    $('#searchFormMhsSchulCode #schulCode').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) {
            $('#searchFormMhsSchulCode #btnSearch').click();
        }
    });

    $('#searchFormMhsSchulCode #schulNm').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) {
            $('#searchFormMhsSchulCode #btnSearch').click();
        }
    });

    $('.tdl-2 #btnFormSave').unbind('click').bind('click', function() {

        if($('#saveFormMhsSchulCode').validate().form()){

            var jsonParameter = {
                schulCode : gf_FormGetValue('saveFormMhsSchulCode', 'schulCode', 'text'),
                schulNm : gf_FormGetValue('saveFormMhsSchulCode', 'schulNm', 'text'),
                areaCode  : dhxInputFormAreaCodeCombo.getSelectedValue(),
    			schulSe  :dhxInputFormSchulSeCombo.getSelectedValue(),
                zip : gf_FormGetValue('saveFormMhsSchulCode', 'zip', 'text'),
                adres : gf_FormGetValue('saveFormMhsSchulCode', 'adres', 'text'),
                telno : gf_FormGetValue('saveFormMhsSchulCode', 'telno', 'text'),
                faxTelno : gf_FormGetValue('saveFormMhsSchulCode', 'faxTelno', 'text')
            };

            var url;

            if( !gf_IsNull(schulCode) ) {
                url = "mhshrm007/modifyMhsSchulCode";
            } else {
                url = "mhshrm007/saveMhsSchulCode";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(schulCode)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMhsSchulCode div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMhsSchulCode.forEachRow(function(rowId) {
            dhxGridMhsSchulCode.cells(rowId,0).setChecked(checkAll);
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

    schulCode = '';

    $("#h4_pr_title").text(titMhsSchulCode + ' ' + gv_TitRegist);
    $('#saveFormMhsSchulCode input[name="schulCode"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMhsSchulCode', 'schulCode', '', 'text');
    gf_FormSetValue('saveFormMhsSchulCode', 'schulNm', '', 'text');
    gf_FormSetValue('saveFormMhsSchulCode', 'areaCode', '', 'text');
    gf_FormSetValue('saveFormMhsSchulCode', 'schulSe', '', 'text');
    gf_FormSetValue('saveFormMhsSchulCode', 'zip', '', 'text');
    gf_FormSetValue('saveFormMhsSchulCode', 'adres', '', 'text');
    gf_FormSetValue('saveFormMhsSchulCode', 'telno', '', 'text');
    gf_FormSetValue('saveFormMhsSchulCode', 'faxTelno', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        schulCode : gf_FormGetValue('searchFormMhsSchulCode', 'schulCode', 'text'),
        schulNm : gf_FormGetValue('searchFormMhsSchulCode', 'schulNm', 'text'),
        areaCode : dhxComboAreaCode.getSelectedValue(), 
         schulSe : dhxComboSchulSe.getSelectedValue(),
      
    };

    gf_Transaction('gridList', 'mhshrm007/searchMhsSchulCode', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMhsSchulCode.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridMhsSchulCode.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveMhsSchulCode = function (rId, cInd) {
    schulCode = '';
    var title = titMhsSchulCode + ' ' + gv_TitRegist;

    if (rId > 0) {
    schulCode = '';
    schulCode = dhxGridMhsSchulCode.cells(rId, 2).getValue();
        title = titMhsSchulCode  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMhsSchulCode();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMhsSchulCode();
     }
};

var fn_CheckMhsSchulCode = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMhsSchulCode, col);
    dhxGridMhsSchulCode.forEachRow(function(rowId) {
        if(dhxGridMhsSchulCode.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMhsSchulCode.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var schulCodes = [];
    schulCodes.push( schulCode );
    fn_RemoveMhsSchulCode( schulCodes );
};

var fn_RemoveAll = function(){
    var schulCodes = fn_CheckMhsSchulCode('schulCode');
    fn_RemoveMhsSchulCode( schulCodes );
};

var fn_RemoveMhsSchulCode = function ( schulCodes ){
    var jsonParameter = {
        schulCodes : schulCodes.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mhshrm007/removeMhsSchulCode', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        schulCode : gf_FormGetValue('searchFormMhsSchulCode', 'schulCode', 'text')

    };

    var header = [[
                    gf_LocaleTrans('default', 'titSchulCode'),
                    gf_LocaleTrans('default', 'titSchulNm'),
                    gf_LocaleTrans('default', 'titAreaCode'),
                    gf_LocaleTrans('default', 'titSchulSe'),
                    gf_LocaleTrans('default', 'titZip'),
                    gf_LocaleTrans('default', 'titAdres'),
                    gf_LocaleTrans('default', 'titTelno'),
                    gf_LocaleTrans('default', 'titFaxTelno'),
    ]];
    var dataId = [[ 'schulCode', 'schulNm', 'areaCodeNm', 'schulSeNm', 'zip', 'adres', 'telno', 'faxTelno' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhsSchulCode ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhsSchulCode;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mhshrm007/excelMhsSchulCode', jsonParameter);
};

var fn_SearchInputMhsSchulCode = function (){

    if( !gf_IsNull(schulCode) ) {

        var jsonParameter = {
            schulCode : schulCode 
        };

        var dataSource = gf_NoAsyncTransaction('mhshrm007/findMhsSchulCode', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMhsSchulCode', 'schulCode', data.schulCode, 'text');
        gf_FormSetValue('saveFormMhsSchulCode', 'schulNm', data.schulNm, 'text');
        gf_FormSetValue('saveFormMhsSchulCode', 'zip', data.zip, 'text');
        gf_FormSetValue('saveFormMhsSchulCode', 'adres', data.adres, 'text');
        gf_FormSetValue('saveFormMhsSchulCode', 'telno', data.telno, 'text');
        gf_FormSetValue('saveFormMhsSchulCode', 'faxTelno', data.faxTelno, 'text');

       
        gf_DhxSetValue(dhxInputFormAreaCodeCombo, "combox",  data.areaCode, '', '');
		gf_DhxSetValue(dhxInputFormSchulSeCombo, "combox",  data.schulSe, '', '');
		
        $('#saveFormMhsSchulCode input[name="schulCode"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
