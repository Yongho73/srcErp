/**
 * 프로그램 : 버튼관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.17
 * 사용테이블 : STM_BTN
 **/

var dhxGridStmBtn;
var dhxGridStmBtnListInfo;
var btnId = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var keyDuplication = true;
var titStmBtn = gf_LocaleTrans('default','titStmBtn');

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("STMMNG008");
};


var cf_SetComponents = function (){

    var dhxGridStmBtnListInfo = [];
    dhxGridStmBtnListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridStmBtnListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', true, 'rnum', '')); // 번호
    dhxGridStmBtnListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBtnId'), '150', 'left', 'str', 'ro', false, 'btnId', '')); // 버튼 ID
    dhxGridStmBtnListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBtnNm'), '150', 'center', 'str', 'ro', false, 'btnNm', '')); // 버튼 명
    dhxGridStmBtnListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titBtnDc'), '150', 'center', 'str', 'ro', false, 'btnDc', '')); // 버튼 설명
    dhxGridStmBtnListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridStmBtn = gf_MakeDhxGrid('dataList', dhxGridStmBtnListInfo, true, false, false);

    dhxGridStmBtn.enableAutoWidth(true);
    dhxGridStmBtn.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridStmBtn.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridStmBtn.attachEvent('onRowSelect', fn_SaveStmBtn);

    $("#saveFormStmBtn").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

	$('#searchFormStmBtn input[name="btnId"]').keypress(function(event) {
      	if(event.charCode == 13) {
            $('#btnSearch').click();
       	}
    });
	
	$('#searchFormStmBtn input[name="btnNm"]').keypress(function(event) {
      	if(event.charCode == 13) {
            $('#btnSearch').click();
       	}
    });

    $('#searchFormStmBtn #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridStmBtn.clearSelection();
          if(!fadeRegs) {
              $('#saveForm').fadeOut(gv_FadeTime, function() {
                  cf_InitInputForm();
                  fadeRegs = true;
                  fadeMode = false;
                  keyDuplication = true;
                  $('.checkDupBtn').show();
              });
              $('#saveForm').fadeIn(gv_FadeTime, function() {});
          } else {
              cf_InitInputForm();
          }
    });

    $('.tdl-1 #btnRemove').unbind('click').bind('click', function() {
        var btnIds = fn_CheckStmBtn('btnId');
        if( gf_IsNull(btnIds) ) {
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

    	if(keyDuplication) {
    		gf_DivMsgAlert('중복확인을 해주세요.');
    		return false;
    	}
    	
    	if($('#saveFormStmBtn').validate().form()){

            var jsonParameter = {
                btnId : gf_FormGetValue('saveFormStmBtn', 'btnId', 'text'),
                btnNm : gf_FormGetValue('saveFormStmBtn', 'btnNm', 'text'),
                btnDc : gf_FormGetValue('saveFormStmBtn', 'btnDc', 'text'),
            };

            var url;

            if( !gf_IsNull(btnId) ) {
                url = "stmmng008/modifyStmBtn";
            } else {
                url = "stmmng008/saveStmBtn";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(btnId)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormStmBtn div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridStmBtn.forEachRow(function(rowId) {
            dhxGridStmBtn.cells(rowId,0).setChecked(checkAll);
        });
    });

    $('#btnFormReset').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });
    
    $('#btnCheckDup').unbind("click").bind("click",function() {
    	fn_FindSameKey();
    }); 
};

var cf_SetBinding = function (){
    fn_SearchGridList();
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){

    btnId = '';

    $("#h4_pr_title").text(titStmBtn + ' ' + gv_TitRegist);
    $('#saveFormStmBtn input[name="btnId"]').removeAttr("disabled");
    $('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormStmBtn', 'btnId', '', 'text');
    gf_FormSetValue('saveFormStmBtn', 'btnNm', '', 'text');
    gf_FormSetValue('saveFormStmBtn', 'btnDc', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

	var jsonParameter = {
    		btnId : gf_FormGetValue('searchFormStmBtn', 'btnId', 'text'),
            btnNm : gf_FormGetValue('searchFormStmBtn', 'btnNm', 'text')
    };

    gf_Transaction('gridList', 'stmmng008/searchStmBtn', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridStmBtn.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridStmBtn.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SaveStmBtn = function (rId, cInd) {
    btnId = '';
    var title = titStmBtn + ' ' + gv_TitRegist;

    if (rId > 0) {
    btnId = '';
    btnId = dhxGridStmBtn.cells(rId, 2).getValue();
        title = titStmBtn  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputStmBtn();
            fadeMode = true;
            fadeRegs = false;
            keyDuplication = false;
            $('.checkDupBtn').hide();
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputStmBtn();
     }
};

var fn_CheckStmBtn = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridStmBtn, col);
    dhxGridStmBtn.forEachRow(function(rowId) {
        if(dhxGridStmBtn.cells(rowId,0).isChecked()){
            resArr.push( dhxGridStmBtn.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var btnIds = [];
    btnIds.push( btnId );
    fn_RemoveStmBtn( btnIds );
};

var fn_RemoveAll = function(){
    var btnIds = fn_CheckStmBtn('btnId');
    fn_RemoveStmBtn( btnIds );
};

var fn_RemoveStmBtn = function ( btnIds ){
    var jsonParameter = {
        btnIds : btnIds.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('stmmng008/removeStmBtn', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

var fn_ExcelDown = function () {

	var jsonParameter = {
    		btnId : gf_FormGetValue('searchFormStmBtn', 'btnId', 'text'),
            btnNm : gf_FormGetValue('searchFormStmBtn', 'btnNm', 'text')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titBtnId'),
                    gf_LocaleTrans('default', 'titBtnNm'),
                    gf_LocaleTrans('default', 'titBtnDc'),
    ]];
    var dataId = [[ 'btnId', 'btnNm', 'btnDc' ]];
    var dataAlign = [[ 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmBtn ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmBtn;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('stmmng008/excelStmBtn', jsonParameter);
};

var fn_SearchInputStmBtn = function (){

    if( !gf_IsNull(btnId) ) {

        var jsonParameter = {
            btnId : btnId 
        };

        var dataSource = gf_NoAsyncTransaction('stmmng008/findStmBtn', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormStmBtn', 'btnId', data.btnId, 'text');
        gf_FormSetValue('saveFormStmBtn', 'btnNm', data.btnNm, 'text');
        gf_FormSetValue('saveFormStmBtn', 'btnDc', data.btnDc, 'text');

        $('#saveFormStmBtn input[name="btnId"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        $('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
};


var fn_FindSameKey = function(){
	
	var key = gf_FormGetValue('saveFormStmBtn', 'btnId', 'text');

	if(gf_IsNull(key)) {
		gf_DivMsgAlert('버튼 ID를 입력해 주세요.');		 
		$('#saveFormStmBtn #btnId').focus();
		return false;
	}
	var jsonParameter = {
			btnId: key
	};	
	var dataSource = gf_NoAsyncTransaction('stmmng008/findStmBtn', jsonParameter, 'GET');  			
	var data = dataSource.data;
	
	if(dataSource.code === '000') {
 
		if(gf_IsNull(data.btnId)) {
			gf_DivMsgAlert('등록 가능한 KEY입니다.');
			keyDuplication = false;
			return true;
		} else {
			gf_DivMsgAlert('동일한 KEY가 존재합니다.');
			keyDuplication = true;
			return false;
		}
	} else {
		gf_DivMsgAlert('중복확인이 되지 않습니다.');
		return false;
	}
}