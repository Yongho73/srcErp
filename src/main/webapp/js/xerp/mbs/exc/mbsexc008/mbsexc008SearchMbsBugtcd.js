/**
 * 프로그램 : 예실대비표 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.31
 * 사용테이블 : MBS_BUGTCD
 **/

var dhxGridMbsBugtcd;
var dhxGridMbsBugtcdListInfo;
var bugtYy = '';
var bugtCd = '';
var corpCd = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titMbsBugtcd = gf_LocaleTrans('default','titMbsBugtcd');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MBSEXC008");
    gf_FormSetValue("searchFormMbsBugtcd", "applcYm",    gv_ComYear, "");
    
    dhxComboBplcKorNm = gf_MakeDhxCombo(
    'divComboBplcKorNm',
    'searchFormMbsBugtcd',
     150,
    'mhshrm001/searchStmBizplc',
    true,
    'bplcCode',
    'bplcKorNm',
    '',
    '1000');
    
    
};


var cf_SetComponents = function (){

    var dhxGridMbsBugtcdListInfo = [];
    //mygrid.setNumberFormat("0,000.00",index,".",",");
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBugtNm'), '150', 'left', 'str', 'ron', false, 'articleNm', '')); // 관계정 명
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader('#cspan', '150', 'left', 'str', 'ron', false, 'itemNm', '')); // 항목 명
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader('#cspan', '150', 'left', 'str', 'ron', false, 'subitemNm', '')); //세항계정명
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader('#cspan', '150', 'left', 'str', 'ron', false, 'sectionNm', '')); // 목계정 명
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader('#cspan', '180', 'left', 'str', 'ron', false, 'subsectionNm', '')); // 세목계정 명
    //편성금액
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titMakeupPamt'), '120', 'right', 'str', 'ro', false, 'makeupAmt', ''));
    //실행예산금액(A)
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titExecutBugtAmt'), '120', 'right', 'str', 'ro', false, 'assignAmt', ''));
    //원인행위금액(B)
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCauseActAmt'), '120', 'right', 'str', 'ro', false, 'causeAmt', ''));
    //예산집행금액(C)
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBugtExecuteAmt'), '120', 'right', 'str', 'ro', false, 'executeAmt', ''));
    //통제잔액(D=A-b)
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCnrlBalance'), '120', 'right', 'str', 'ro', false, 'sumCauseAmt', ''));
    //예산집행잔액(E=A-C)
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBugtExecuteBalance'), '120', 'right', 'str', 'ro', false, 'sumExecuteAmt', ''));
    //집행율(F=(C/A)*100)
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titExecuteRt'), '120', 'center', 'str', 'ro', false, 'preAmt', ''));
    
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader('lv', '0', 'center', 'str', 'ro', true, 'lv', ''));
    dhxGridMbsBugtcdListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미
    var attachHeaderArr = [];
    attachHeaderArr.push([gf_LocaleTrans('default', 'titArticleNm'),gf_LocaleTrans('default', 'titItemNm'),gf_LocaleTrans('default', 'titSubitemNm'), gf_LocaleTrans('default', 'titSectionNm'), gf_LocaleTrans('default', 'titSubsectionNm'),"#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","#rspan"]);

	dhxGridMbsBugtcd = gf_MakeDhxGrid('dataList', dhxGridMbsBugtcdListInfo, false, true, false, attachHeaderArr);
    dhxGridMbsBugtcd.enableAutoWidth(true);
    dhxGridMbsBugtcd.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMbsBugtcd.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridMbsBugtcd.attachEvent('onRowSelect', fn_SaveMbsBugtcd);

    $("#saveFormMbsBugtcd").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

	$('input[name=bugtLv]').unbind('click').bind('click', function(event){
        fn_SearchGridList(); 
	}); 
	
    $('#searchFormMbsBugtcd input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMbsBugtcd .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMbsBugtcd .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMbsBugtcd #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridMbsBugtcd.clearSelection();
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
        var bugtYys = fn_CheckMbsBugtcd('bugtYy');
        var bugtCds = fn_CheckMbsBugtcd('bugtCd');
        var corpCds = fn_CheckMbsBugtcd('corpCd');
        if( gf_IsNull(bugtYys) && gf_IsNull(bugtCds) && gf_IsNull(corpCds) ) {
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

        if($('#saveFormMbsBugtcd').validate().form()){

            var jsonParameter = {
                bugtYy : gf_FormGetValue('saveFormMbsBugtcd', 'bugtYy', 'text'),
                bugtCd : gf_FormGetValue('saveFormMbsBugtcd', 'bugtCd', 'text'),
                corpCd : gf_FormGetValue('saveFormMbsBugtcd', 'corpCd', 'text'),
                bugtCls : gf_FormGetValue('saveFormMbsBugtcd', 'bugtCls', 'text'),
                accCls : gf_FormGetValue('saveFormMbsBugtcd', 'accCls', 'text'),
                bugtNm : gf_FormGetValue('saveFormMbsBugtcd', 'bugtNm', 'text'),
                articleNm : gf_FormGetValue('saveFormMbsBugtcd', 'articleNm', 'text'),
                itemNm : gf_FormGetValue('saveFormMbsBugtcd', 'itemNm', 'text'),
                subitemNm : gf_FormGetValue('saveFormMbsBugtcd', 'subitemNm', 'text'),
                sectionNm : gf_FormGetValue('saveFormMbsBugtcd', 'sectionNm', 'text'),
                subsectionNm : gf_FormGetValue('saveFormMbsBugtcd', 'subsectionNm', 'text'),
                subsubsectionNm : gf_FormGetValue('saveFormMbsBugtcd', 'subsubsectionNm', 'text'),
                bugtmarkYn : gf_FormGetValue('saveFormMbsBugtcd', 'bugtmarkYn', 'text'),
                bugtctrlYn : gf_FormGetValue('saveFormMbsBugtcd', 'bugtctrlYn', 'text'),
                upbugtCd : gf_FormGetValue('saveFormMbsBugtcd', 'upbugtCd', 'text'),
                useYn : gf_FormGetValue('saveFormMbsBugtcd', 'useYn', 'text'),
                offositionAcctCd : gf_FormGetValue('saveFormMbsBugtcd', 'offositionAcctCd', 'text'),
                mappingCd : gf_FormGetValue('saveFormMbsBugtcd', 'mappingCd', 'text'),
                acctCd : gf_FormGetValue('saveFormMbsBugtcd', 'acctCd', 'text'),
                oldBugtCd : gf_FormGetValue('saveFormMbsBugtcd', 'oldBugtCd', 'text'),
                smtnYn : gf_FormGetValue('saveFormMbsBugtcd', 'smtnYn', 'text'),
                startDt : gf_FormGetValue('saveFormMbsBugtcd', 'startDt', 'text'),
                endDt : gf_FormGetValue('saveFormMbsBugtcd', 'endDt', 'text'),
                makeupStd : gf_FormGetValue('saveFormMbsBugtcd', 'makeupStd', 'text'),
                regDate : gf_FormGetValue('saveFormMbsBugtcd', 'regDate', 'text'),
                uptDate : gf_FormGetValue('saveFormMbsBugtcd', 'uptDate', 'text'),
                gukgo : gf_FormGetValue('saveFormMbsBugtcd', 'gukgo', 'text'),
                printBugtNm : gf_FormGetValue('saveFormMbsBugtcd', 'printBugtNm', 'text'),
            };

            var url;

            if( !gf_IsNull(bugtYy) && !gf_IsNull(bugtCd) && !gf_IsNull(corpCd) ) {
                url = "mbsexc008/modifyMbsBugtcd";
            } else {
                url = "mbsexc008/saveMbsBugtcd";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(bugtYy) && !gf_IsNull(bugtCd) && !gf_IsNull(corpCd)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMbsBugtcd div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridMbsBugtcd.forEachRow(function(rowId) {
            dhxGridMbsBugtcd.cells(rowId,0).setChecked(checkAll);
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

    bugtYy = '';
    bugtCd = '';
    corpCd = '';

    $("#h4_pr_title").text(titMbsBugtcd + ' ' + gv_TitRegist);
    $('#saveFormMbsBugtcd input[name="bugtYy"]').removeAttr("disabled");
    $('#saveFormMbsBugtcd input[name="bugtCd"]').removeAttr("disabled");
    $('#saveFormMbsBugtcd input[name="corpCd"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormMbsBugtcd', 'bugtYy', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'bugtCd', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'corpCd', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'bugtCls', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'accCls', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'bugtNm', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'articleNm', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'itemNm', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'subitemNm', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'sectionNm', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'subsectionNm', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'subsubsectionNm', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'bugtmarkYn', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'bugtctrlYn', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'upbugtCd', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'useYn', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'offositionAcctCd', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'mappingCd', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'acctCd', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'oldBugtCd', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'smtnYn', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'startDt', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'endDt', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'makeupStd', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'regDate', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'uptDate', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'gukgo', '', 'text');
    gf_FormSetValue('saveFormMbsBugtcd', 'printBugtNm', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){
    var jsonParameter = {
    		corpCd :  dhxComboBplcKorNm.getSelectedValue(),
    		bugtYy : gf_FormGetValue('searchFormMbsBugtcd','applcYm','text'),
    		bugtLv  : gf_FormGetValue('searchFormMbsBugtcd', 'bugtLv', 'radio')
    		
    };

    gf_Transaction('gridList', 'mbsexc008/searchMbsBugtcd', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridMbsBugtcd.clearAll();
    if(!gf_IsNull(data.data.records))
    {
    	
    	for(var i=0; i< data.data.records.length;i++) {
    	
    		if (data.data.records[i].lv == 2 ) {
    			data.data.records[i].articleNm ="";
    		}
    		if (data.data.records[i].lv == 3 ) {
    			data.data.records[i].articleNm ="";
    			data.data.records[i].itemNm ="";
    		}
    		if (data.data.records[i].lv == 4 ) {
    			data.data.records[i].articleNm ="";
    			data.data.records[i].itemNm ="";
    			data.data.records[i].subitemNm ="";
    		}
    		if (data.data.records[i].lv == 5 ) {
    			data.data.records[i].articleNm ="";
    			data.data.records[i].itemNm ="";
    			data.data.records[i].subitemNm ="";
    			data.data.records[i].sectionNm ="";
    		}
    		
    	}
    	
      dhxGridMbsBugtcd.parse(data.data.records, 'js');
     //  alert(dhxGridMbsBugtcd.getRowsNum());
       for(var i = 1; i <= dhxGridMbsBugtcd.getRowsNum(); i++){
    	   var lv = dhxGridMbsBugtcd.cells(i, 12).getValue();
    	   var preAmt =  dhxGridMbsBugtcd.cells(i,11).getValue();
    	   if(preAmt < 1 && preAmt > 0 ){
    		   dhxGridMbsBugtcd.setNumberFormat("00.00",i);
    	   }
    	   if(lv == 1){
    		   dhxGridMbsBugtcd.setRowColor(i,"#ffffff");
    		   dhxGridMbsBugtcd.setRowTextBold(i);
    	   }
    	   else if (lv == 2){
    		   dhxGridMbsBugtcd.setRowColor(i,"#F5F5C1");
    		   dhxGridMbsBugtcd.setRowTextBold(i);
    	   }
    	   else if (lv == 3) {
    		   dhxGridMbsBugtcd.setRowColor(i,"#BCEAFC");
    		   dhxGridMbsBugtcd.setRowTextBold(i);
    	   }
    	  
       }
       
      
        //dhxGridMbsBugtcd.setRowColor(2,"red");
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var gridColor = function(){
	
	
};
var fn_SaveMbsBugtcd = function (rId, cInd) {
    bugtYy = '';
    bugtCd = '';
    corpCd = '';
    var title = titMbsBugtcd + ' ' + gv_TitRegist;

    if (rId > 0) {
    bugtYy = '';
    bugtYy = dhxGridMbsBugtcd.cells(rId, 2).getValue();
    bugtCd = '';
    bugtCd = dhxGridMbsBugtcd.cells(rId, 3).getValue();
    corpCd = '';
    corpCd = dhxGridMbsBugtcd.cells(rId, 4).getValue();
        title = titMbsBugtcd  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputMbsBugtcd();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputMbsBugtcd();
     }
};

var fn_CheckMbsBugtcd = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMbsBugtcd, col);
    dhxGridMbsBugtcd.forEachRow(function(rowId) {
        if(dhxGridMbsBugtcd.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMbsBugtcd.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var bugtYys = [];
    bugtYys.push( bugtYy );
    var bugtCds = [];
    bugtCds.push( bugtCd );
    var corpCds = [];
    corpCds.push( corpCd );
    fn_RemoveMbsBugtcd( bugtYys, bugtCds, corpCds );
};

var fn_RemoveAll = function(){
    var bugtYys = fn_CheckMbsBugtcd('bugtYy');
    var bugtCds = fn_CheckMbsBugtcd('bugtCd');
    var corpCds = fn_CheckMbsBugtcd('corpCd');
    fn_RemoveMbsBugtcd( bugtYys, bugtCds, corpCds );
};

var fn_RemoveMbsBugtcd = function ( bugtYys, bugtCds, corpCds ){
    var jsonParameter = {
        bugtYys : bugtYys.join(','),
        bugtCds : bugtCds.join(','),
        corpCds : corpCds.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mbsexc008/removeMbsBugtcd', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMbsBugtcd', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMbsBugtcd', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMbsBugtcd', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titBugtYy'),
                    gf_LocaleTrans('default', 'titBugtCd'),
                    gf_LocaleTrans('default', 'titCorpCd'),
                    gf_LocaleTrans('default', 'titBugtCls'),
                    gf_LocaleTrans('default', 'titAccCls'),
                    gf_LocaleTrans('default', 'titBugtNm'),
                    gf_LocaleTrans('default', 'titArticleNm'),
                    gf_LocaleTrans('default', 'titItemNm'),
                    gf_LocaleTrans('default', 'titSubitemNm'),
                    gf_LocaleTrans('default', 'titSectionNm'),
                    gf_LocaleTrans('default', 'titSubsectionNm'),
                    gf_LocaleTrans('default', 'titSubsubsectionNm'),
                    gf_LocaleTrans('default', 'titBugtmarkYn'),
                    gf_LocaleTrans('default', 'titBugtctrlYn'),
                    gf_LocaleTrans('default', 'titUpbugtCd'),
                    gf_LocaleTrans('default', 'titUseYn'),
                    gf_LocaleTrans('default', 'titOffositionAcctCd'),
                    gf_LocaleTrans('default', 'titMappingCd'),
                    gf_LocaleTrans('default', 'titAcctCd'),
                    gf_LocaleTrans('default', 'titOldBugtCd'),
                    gf_LocaleTrans('default', 'titSmtnYn'),
                    gf_LocaleTrans('default', 'titStartDt'),
                    gf_LocaleTrans('default', 'titEndDt'),
                    gf_LocaleTrans('default', 'titMakeupStd'),
                    gf_LocaleTrans('default', 'titRegDate'),
                    gf_LocaleTrans('default', 'titUptDate'),
                    gf_LocaleTrans('default', 'titGukgo'),
                    gf_LocaleTrans('default', 'titPrintBugtNm'),
    ]];
    var dataId = [[ 'bugtYy', 'bugtCd', 'corpCd', 'bugtCls', 'accCls', 'bugtNm', 'articleNm', 'itemNm', 'subitemNm', 'sectionNm', 'subsectionNm', 'subsubsectionNm', 'bugtmarkYn', 'bugtctrlYn', 'upbugtCd', 'useYn', 'offositionAcctCd', 'mappingCd', 'acctCd', 'oldBugtCd', 'smtnYn', 'startDt', 'endDt', 'makeupStd', 'regDate', 'uptDate', 'gukgo', 'printBugtNm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMbsBugtcd ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMbsBugtcd;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mbsexc008/excelMbsBugtcd', jsonParameter);
};

var fn_SearchInputMbsBugtcd = function (){

    if( !gf_IsNull(bugtYy) && !gf_IsNull(bugtCd) && !gf_IsNull(corpCd) ) {

        var jsonParameter = {
            bugtYy : bugtYy ,
            bugtCd : bugtCd ,
            corpCd : corpCd 
        };

        var dataSource = gf_NoAsyncTransaction('mbsexc008/findMbsBugtcd', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormMbsBugtcd', 'bugtYy', data.bugtYy, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'bugtCd', data.bugtCd, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'corpCd', data.corpCd, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'bugtCls', data.bugtCls, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'accCls', data.accCls, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'bugtNm', data.bugtNm, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'articleNm', data.articleNm, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'itemNm', data.itemNm, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'subitemNm', data.subitemNm, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'sectionNm', data.sectionNm, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'subsectionNm', data.subsectionNm, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'subsubsectionNm', data.subsubsectionNm, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'bugtmarkYn', data.bugtmarkYn, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'bugtctrlYn', data.bugtctrlYn, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'upbugtCd', data.upbugtCd, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'useYn', data.useYn, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'offositionAcctCd', data.offositionAcctCd, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'mappingCd', data.mappingCd, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'acctCd', data.acctCd, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'oldBugtCd', data.oldBugtCd, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'smtnYn', data.smtnYn, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'startDt', data.startDt, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'endDt', data.endDt, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'makeupStd', data.makeupStd, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'regDate', data.regDate, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'uptDate', data.uptDate, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'gukgo', data.gukgo, 'text');
        gf_FormSetValue('saveFormMbsBugtcd', 'printBugtNm', data.printBugtNm, 'text');

        $('#saveFormMbsBugtcd input[name="bugtYy"]').attr("disabled", true);
        $('#saveFormMbsBugtcd input[name="bugtCd"]').attr("disabled", true);
        $('#saveFormMbsBugtcd input[name="corpCd"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};
