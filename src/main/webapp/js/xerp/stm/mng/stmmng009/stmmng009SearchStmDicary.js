/**
 * 프로그램 : 다국어관리 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.05.21
 * 사용테이블 : STM_DICARY
 **/

var dhxGridStmDicary;
var dhxGridStmDicaryListInfo;
var dicaryId = '';
var progrmId = '';
var fadeRegs = false;
var fadeMode = true;
var checkAll = false;
var keyDuplication = false;
var titStmDicary = gf_LocaleTrans('default','titStmDicary');
var modifyAt = true;


$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("STMMNG009");

    gf_FormSetValue('saveFormStmDicary', 'progrmId', 'default', 'text');

};


var cf_SetComponents = function (){

    var dhxGridStmDicaryListInfo = [];
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'ro', 'cntr', false, 'rnum', '')); //번호
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="btnCheckAll" />', '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택    
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDicaryId'), '150', 'left', 'str', 'ro', false, 'dicaryId', '')); // 사전 ID
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titProgrmId'), '150', 'left', 'str', 'ro', false, 'progrmId', '')); // 프로그램 ID
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEng'), '150', 'left', 'str', 'ro', false, 'eng', '')); // 영어
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titLabl'), '150', 'left', 'str', 'ro', false, 'labl', '')); // 레이블
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titKor'), '150', 'left', 'str', 'ro', false, 'kor', '')); // 한글
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titThird'), '150', 'left', 'str', 'ro', false, 'third', '')); // 제3국
    dhxGridStmDicaryListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridStmDicary = gf_MakeDhxGrid('dataList', dhxGridStmDicaryListInfo, true, false, false);

    dhxGridStmDicary.enableAutoWidth(true);
    
    
    

    $("#saveFormStmDicary").validate({
        errorElement: 'div'
    });
};

var eventIds = [];
var cf_SetEventListener = function (){
	
	eventIds = gf_GridDetachEvent(dhxGridStmDicary, eventIds);
	var eventId = dhxGridStmDicary.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){ 
		if(keyCode == 113) fn_ExcelDown();
		if(keyCode == 67 && ctrl){		
			dhxGridStmDicary.setCSVDelimiter("\t");
			dhxGridStmDicary.copyBlockToClipboard()
		}
		if(keyCode == 86 && ctrl){
			dhxGridStmDicary.setCSVDelimiter("\t");
			dhxGridStmDicary.pasteBlockFromClipboard()
		}	    
	});
	eventIds.push(eventId);
	eventIds.push(dhxGridStmDicary.attachEvent("onRowSelect", function(keyCode,ctrl,shift,event_object){ gf_Trace('g-event'); fn_SelectedStmUsers(); }));	 

	$('#searchFormStmDicary input[name="dicaryId"]').unbind('keypress').bind('keypress', function(event) {
      	if(event.charCode == 13) {
            $('#btnSearchStmDicary').click();
       	}
    });
	
	$('#searchFormStmDicary input[name="eng"]').unbind('keypress').bind('keypress', function(event) {
      	if(event.charCode == 13) {
            $('#btnSearchStmDicary').click();
       	}
    });
	
	$('#searchFormStmDicary input[name="kor"]').unbind('keypress').bind('keypress', function(event) {
      	if(event.charCode == 13) {
            $('#btnSearchStmDicary').click();
       	}
    });
	
	$('#searchFormStmDicary input[name="third"]').unbind('keypress').bind('keypress', function(event) {
      	if(event.charCode == 13) {
            $('#btnSearchStmDicary').click();
       	}
    });
	
	$('#btnSearchStmDicary').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });
    
    $('#btnMemUpt').unbind('click').bind('click', function(event){		 
		gf_RefreshLocale();
		gf_DivMsgAlert("업데이트 되었습니다.");		
	});

    $('#btnAddStmDicary').unbind('click').bind('click', function(event){
    	modifyAt = false;
    	dhxGridStmDicary.clearSelection();
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

    $('#btnRemoveStmDicary').unbind('click').bind('click', function() {
        var dicaryIds = fn_CheckStmDicary('dicaryId');
        var progrmIds = fn_CheckStmDicary('progrmId');
        if( gf_IsNull(dicaryIds) && gf_IsNull(progrmIds) ) {
             gf_DivMsgAlert(gv_MsgDelKey);
             return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAll()', '');
        }
    });

    $('#btnRemoveStmDicary').unbind('click').bind('click', function() {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
    });

    $('#btnExcelStmDicary').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });

    $('#btnSaveStmDicary').unbind('click').bind('click', function() {
    	
    	if(keyDuplication) {
    		gf_DivMsgAlert('중복확인을 해주세요.');
    		return false;
    	}
    	
        if($('#saveFormStmDicary').validate().form()){

            var jsonParameter = {
                dicaryId : gf_FormGetValue('saveFormStmDicary', 'dicaryId', 'text'),
                progrmId : gf_FormGetValue('saveFormStmDicary', 'progrmId', 'text'),
                eng : gf_FormGetValue('saveFormStmDicary', 'eng', 'text'),
                labl : gf_FormGetValue('saveFormStmDicary', 'labl', 'text'),
                kor : gf_FormGetValue('saveFormStmDicary', 'kor', 'text'),
                third : gf_FormGetValue('saveFormStmDicary', 'third', 'text')
            };

            var url;

            if( modifyAt ) {
                url = "stmmng009/modifyStmDicary";
            } else {
                url = "stmmng009/saveStmDicary";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(dicaryId) && !gf_IsNull(progrmId)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }
                gf_RefreshLocale();
                fn_SearchGridList();
            }
        }

        $('#saveFormStmDicary div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });
   
    $('#btnCheckAll').unbind("click").bind("click",function() {        
    	if($(this).is(":checked")) checkAll = true;
        else checkAll = false;
    	dhxGridStmDicary.forEachRow(function(rowId) {
    		dhxGridStmDicary.cells(rowId,1).setChecked(checkAll);
        });
    });
    
    $('#btnCheckDupStmDicary').unbind("click").bind("click",function() {
    	fn_FindSameKey();
    });
    
    $('#btnInitStmDicary').unbind("click").bind("click",function() {
    	cf_InitForm();
    });
};

var cf_SetBinding = function (){
    fn_SearchGridList();
};

var cf_InitForm = function (){	
    $('#searchFormStmDicary input[name="dicaryId"]').val('');
    $('#searchFormStmDicary input[name="eng"]').val('');
    $('#searchFormStmDicary input[name="kor"]').val('');
    $('#searchFormStmDicary input[name="third"]').val('');
};

var cf_InitInputForm = function (){

    dicaryId = '';
    progrmId = '';

    $("#h4_pr_title").text(titStmDicary + ' ' + gv_TitRegist);
    $('#saveFormStmDicary input[name="dicaryId"]').removeAttr("disabled");
    $('#saveFormStmDicary input[name="progrmId"]').removeAttr("disabled");
    //$('.tdl-2 #btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>'+ gv_BtnSave);

    gf_FormSetValue('saveFormStmDicary', 'dicaryId', '', 'text');
    gf_FormSetValue('saveFormStmDicary', 'progrmId', 'default', 'text');
    gf_FormSetValue('saveFormStmDicary', 'eng', '', 'text');
    gf_FormSetValue('saveFormStmDicary', 'labl', '', 'text');
    gf_FormSetValue('saveFormStmDicary', 'kor', '', 'text');
    gf_FormSetValue('saveFormStmDicary', 'third', '', 'text');

    $('#spanDel').hide();
    $('#spanReset').show();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
		dicaryId : gf_FormGetValue('searchFormStmDicary', 'dicaryId', 'text'),
        eng : gf_FormGetValue('searchFormStmDicary', 'eng', 'text'),            
        kor : gf_FormGetValue('searchFormStmDicary', 'kor', 'text'),
        third : gf_FormGetValue('searchFormStmDicary', 'third', 'text')
    };

    gf_Transaction('gridList', 'stmmng009/searchStmDicary', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridStmDicary.clearAll();    
    if(!gf_IsNull(data.data.records)){
    	gf_NoFoundDataOnGridMsgRemove('dataList');
    	dhxGridStmDicary.parse(data.data.records, 'js');
    	dhxGridStmDicary.selectRow(0);
    	fn_SelectedStmUsers();
    } else {
    	gf_NoFoundDataOnGridMsg('dataList');     	 
    	$('#btnAddStmDicary').click();
    }
    $("#spanCnt").text(data.data.records.length);    
    cf_SetEventListener();
};

var fn_SelectedStmUsers = function () {	
	gf_Trace("call save..fn_SelectedStmUsers");
	if(!fadeMode) {
		$('#saveForm').fadeOut(gv_FadeTime, function() {			 
			fn_SearchInputStmDicary();			
       	   	fadeMode = true;
       	   	fadeRegs = false;	       	
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
    	 fn_SearchInputStmDicary();
     }	 
};

var fn_SearchInputStmDicary = function (){
	
	var dicaryId = dhxGridStmDicary.cells(dhxGridStmDicary.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStmDicary,'dicaryId')).getValue();
	var progrmId = dhxGridStmDicary.cells(dhxGridStmDicary.getSelectedRowId(), gf_GetDhxGridColumId(dhxGridStmDicary,'progrmId')).getValue();
    
	if( !gf_IsNull(dicaryId) && !gf_IsNull(progrmId) ) {

        var jsonParameter = {
            dicaryId : dicaryId ,
            progrmId : progrmId 
        };

        var dataSource = gf_NoAsyncTransaction('stmmng009/findStmDicary', jsonParameter, 'GET');
        var data = dataSource.data;

        gf_FormSetValue('saveFormStmDicary', 'dicaryId', data.dicaryId, 'text');
        gf_FormSetValue('saveFormStmDicary', 'progrmId', data.progrmId, 'text');
        gf_FormSetValue('saveFormStmDicary', 'eng', data.eng, 'text');
        gf_FormSetValue('saveFormStmDicary', 'labl', data.labl, 'text');
        gf_FormSetValue('saveFormStmDicary', 'kor', data.kor, 'text');
        gf_FormSetValue('saveFormStmDicary', 'third', data.third, 'text');

        $('#saveFormStmDicary input[name="dicaryId"]').attr("disabled", true);
        $('#saveFormStmDicary input[name="progrmId"]').attr("disabled", true);
        $('#spanDel').show();
        $('#spanReset').hide();
        //$('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnUpdate);

    } else {
        //$('#btnFormSave').html('<span class="glyphicon glyphicon-save mr5"></span>' + gv_BtnSave);
    }
	
	modifyAt = true;
	keyDuplication = false;
	$('.checkDupBtn').hide();
};


var fn_CheckStmDicary = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridStmDicary, col);
    dhxGridStmDicary.forEachRow(function(rowId) {
        if(dhxGridStmDicary.cells(rowId,1).isChecked()){
            resArr.push( dhxGridStmDicary.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var dicaryIds = [];
    dicaryIds.push( dicaryId );
    var progrmIds = [];
    progrmIds.push( progrmId );
    fn_RemoveStmDicary( dicaryIds, progrmIds );
};

var fn_RemoveAll = function(){
    var dicaryIds = fn_CheckStmDicary('dicaryId');
    var progrmIds = fn_CheckStmDicary('progrmId');
    fn_RemoveStmDicary( dicaryIds, progrmIds );
};

var fn_RemoveStmDicary = function ( dicaryIds, progrmIds ){
    var jsonParameter = {
        dicaryIds : dicaryIds.join(','),
        progrmIds : progrmIds.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('stmmng009/removeStmDicary', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        //gf_DivMsgAlert(gv_MsgDelete);
        gf_RefreshLocale();
        fn_SearchGridList();
    }
};

var fn_ExcelDown = function () {

	var jsonParameter = {
		dicaryId : gf_FormGetValue('searchFormStmDicary', 'dicaryId', 'text'),
        eng : gf_FormGetValue('searchFormStmDicary', 'eng', 'text'),            
        kor : gf_FormGetValue('searchFormStmDicary', 'kor', 'text'),
        third : gf_FormGetValue('searchFormStmDicary', 'third', 'text')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titDicaryId'),
                    gf_LocaleTrans('default', 'titProgrmId'),
                    gf_LocaleTrans('default', 'titEng'),
                    gf_LocaleTrans('default', 'titLabl'),
                    gf_LocaleTrans('default', 'titKor'),
                    gf_LocaleTrans('default', 'titThird'),
    ]];
    var dataId = [[ 'dicaryId', 'progrmId', 'eng', 'labl', 'kor', 'third' ]];
    var dataAlign = [[ 'left', 'left', 'left', 'left', 'left', 'left' ]];
    var sheetNm = [[ titStmDicary ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmDicary;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('stmmng009/excelStmDicary', jsonParameter);
};


var fn_FindSameKey = function(){
	
	var dicaryId = gf_FormGetValue('saveFormStmDicary', 'dicaryId', 'text');
	var progrmId = gf_FormGetValue('saveFormStmDicary', 'progrmId', 'text');

	if(gf_IsNull(dicaryId)) {
		gf_DivMsgAlert('사전 ID를 입력해 주세요.');		 
		$('#saveFormStmDicary #dicaryId').focus();
		return false;
	}
	var jsonParameter = {
            dicaryId : dicaryId ,
            progrmId : gf_IsNull(progrmId) ? 'defalut' :  progrmId
	};
	var dataSource = gf_NoAsyncTransaction('stmmng009/findStmDicary', jsonParameter, 'GET');  			
	var data = dataSource.data;
	
	if(dataSource.code === '000') {
 
		if(gf_IsNull(data.dicaryId)) {
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

