/**
 * 프로그램 : 유지보수요청 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2019.12.16
 * 사용테이블 : MTA_REQUST
 **/

var dhxGridMtaRequst;
var dhxGridMtaRequstListInfo;
var dhxGridMtaCompany;
var dhxGridMtaCompanyListInfo;
var projectNo = '';
var requstNo = '';
var fadeRegs = true;
var fadeMode = false;
var titMtaRequst = gf_LocaleTrans('default','titMtaRequst');

var dhxComboRequstStep;

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

    gf_IframeHeightResize(true);
});


var cf_InitParam = function (){

    fn_SetMenuPath("MTAMAT001");
 
    var dhxCalendarStartDate = new dhtmlXCalendarObject({input:"searchSregDt", button:"startDateIcon"});
    dhxCalendarStartDate.loadUserLanguage("ko");
    dhxCalendarStartDate.hideTime();
    var dhxCCalendarEndDate = new dhtmlXCalendarObject({input:"searchEregDt", button:"endDateIcon"});
    dhxCCalendarEndDate.loadUserLanguage("ko");
    dhxCCalendarEndDate.hideTime();
    // 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('searchSregDt', 'searchEregDt'); 
    
    var dhxCalendarStartRequstDate = new dhtmlXCalendarObject({input:"searchSrequstDt", button:"startDateIcon"});
    dhxCalendarStartRequstDate.loadUserLanguage("ko");
    dhxCalendarStartRequstDate.hideTime();
    var dhxCCalendarEndRequstDate = new dhtmlXCalendarObject({input:"searchErequstDt", button:"endDateIcon"});
    dhxCCalendarEndRequstDate.loadUserLanguage("ko");
    dhxCCalendarEndRequstDate.hideTime();
    // 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('searchSrequstDt', 'searchErequstDt'); 

    
    dhxComboRequstStep = gf_MakeDhxCombo(
    	    'divComboRequstStep',
    	    'searchFormMtaRequst',
    	    150,
    	    'combo/searchStmCode?codekindCode=C925',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');
   
    dhxComboComptConfmAt = gf_MakeDhxCombo(
    	    'divComboComptConfmAt',
    	    'searchFormMtaRequst',
    	    150,
    	    'combo/searchStmCode?codekindCode=C002',
    	    true,
    	    'code',
    	    'codeNm',
    	    '',
    	    '');

};


var cf_SetComponents = function (){
	
	var dhxGridMtaCompanyListInfo = [];
    //dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMtaCompanyListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'rnum', '')); // 번호
    dhxGridMtaCompanyListInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '100', 'center', 'str', 'ro', false, 'projectNo', '')); // 프로젝트 번호
	dhxGridMtaCompanyListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titCompany'), '250', 'center', 'str', 'ro', false, 'compNm', '')); // 프로젝트 번호
	
	dhxGridMtaCompanyListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMtaCompany = gf_MakeDhxGrid('companyList', dhxGridMtaCompanyListInfo, true, false, false);

    dhxGridMtaCompany.enableAutoWidth(true);
    dhxGridMtaCompany.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    
    dhxGridMtaCompany.attachEvent('onRowSelect', fn_SearchGridByItem);
    

    var dhxGridMtaRequstListInfo = [];
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAll" />', '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'rnum', '')); // 번호
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('내용', '250', 'center', 'str', 'ro', false, 'requstCn', '')); // 내용
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('요청일', '158', 'center', 'str', 'ro', false, 'requstDt', '')); // 요청일
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('완료요구일', '150', 'center', 'str', 'ro', false, 'comptRequstDt', '')); // 완료요구일
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('완료일', '150', 'center', 'str', 'ro', false, 'opertEndDt', '')); // 완료일
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('진행상태', '100', 'center', 'str', 'ro', false, 'requstStep', '')); // 진행상태
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('유지보수번호', '150', 'center', 'str', 'ro', true, 'requstNo', '')); // 유지보수번호
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '150', 'center', 'str', 'ro', true, 'projectNo', '')); // 프로젝트 번호
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('사용여부', '150', 'center', 'str', 'ro', true, 'comptConfmAt', '')); // 사용여부
    
    dhxGridMtaRequstListInfo.push(gf_MakeDhxGridHeader('', '*', 'center', 'str', 'ro', false, '', '')); // 더미

    dhxGridMtaRequst = gf_MakeDhxGrid('requestList', dhxGridMtaRequstListInfo, true, false, false);

    dhxGridMtaRequst.enableAutoWidth(true);
    dhxGridMtaRequst.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridMtaRequst.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
   
    dhxGridMtaRequst.attachEvent("onRowDblClicked", function(rId,cInd){
    	var projectNo = dhxGridMtaRequst.cells(rId, 8).getValue();
    	var requstNo  = dhxGridMtaRequst.cells(rId, 7).getValue();
    	var param = "projectNo=" + projectNo + "&requstNo=" + requstNo;
    	fn_MatUdtPopup('form1','','', param);
    });

};

var cf_SetEventListener = function (){

    $('#searchFormMtaRequst input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormMtaRequst input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSrequstDt', 'searchErequstDt',  $(this).val());
    });
    $('#searchFormMtaRequst .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormMtaRequst .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#searchFormMtaRequst #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
        fn_SearchGridList2();
    });

    $('.tdl-4 #btnAdd').unbind('click').bind('click', function(event){    	
    	fn_MatPopup("searchFormMtaRequst", "projectNo", "requstNo");
    });

    $('.tdl-4 #btnRemove').unbind('click').bind('click', function() {
        var projectNos = fn_CheckMtaRequst('projectNo');
        var requstNos = fn_CheckMtaRequst('requstNo');
        if( gf_IsNull(projectNos) && gf_IsNull(requstNos) ) {
             gf_DivMsgAlert(gv_MsgDelKey);
             return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAll()', '');
        }
    });

    $('.tdl-2 #btnFormRemove').unbind('click').bind('click', function() {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
    });

    $('.tdl-4 #btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

    $('.tdl-4 #btnClose').unbind('click').bind('click', function() {
    	
    });
    
    $('#searchFormMtaRequst #btnCompNmSearch').unbind('click').bind('click', function(event){
    	fn_CompPopup("searchFormMtaRequst","compCd","compNm");
    });

    $('.tdl-2 #btnFormSave11').unbind('click').bind('click', function() {

        if($('#saveFormMtaRequst11').validate().form()){

            var jsonParameter = {
                projectNo : gf_FormGetValue('saveFormMtaRequst', 'projectNo', 'text'),
                requstNo : gf_FormGetValue('saveFormMtaRequst', 'requstNo', 'text'),
                requstStep : gf_FormGetValue('saveFormMtaRequst', 'requstStep', 'text'),
                requstDt : gf_FormGetValue('saveFormMtaRequst', 'requstDt', 'text'),
                requstDept : gf_FormGetValue('saveFormMtaRequst', 'requstDept', 'text').replaceAll('-',''),
                requstTelno : gf_FormGetValue('saveFormMtaRequst', 'requstTelno', 'text'),
                requstEmail : gf_FormGetValue('saveFormMtaRequst', 'requstEmail', 'text'),
                comptRequstDt : gf_FormGetValue('saveFormMtaRequst', 'comptRequstDt', 'text'),
                requstCn : gf_FormGetValue('saveFormMtaRequst', 'requstCn', 'text'),
                priorTy : gf_FormGetValue('saveFormMtaRequst', 'priorTy', 'text'),
                requstTy : gf_FormGetValue('saveFormMtaRequst', 'requstTy', 'text'),
                drctrEmpno : gf_FormGetValue('saveFormMtaRequst', 'drctrEmpno', 'text'),
                drctCn : gf_FormGetValue('saveFormMtaRequst', 'drctCn', 'text'),
                atchmnfl : gf_FormGetValue('saveFormMtaRequst', 'atchmnfl', 'text'),
                opertorEmpno : gf_FormGetValue('saveFormMtaRequst', 'opertorEmpno', 'text'),
                opertTy : gf_FormGetValue('saveFormMtaRequst', 'opertTy', 'text'),
                confmerNm : gf_FormGetValue('saveFormMtaRequst', 'confmerNm', 'text'),
                comptConfmDt : gf_FormGetValue('saveFormMtaRequst', 'comptConfmDt', 'text'),
                comptConfmAt : gf_FormGetValue('saveFormMtaRequst', 'comptConfmAt', 'chkboxYN'),
                confmOpn : gf_FormGetValue('saveFormMtaRequst', 'confmOpn', 'text'),
                stsfdgLevel : gf_FormGetValue('saveFormMtaRequst', 'stsfdgLevel', 'text'),
            };

            var url;

            if( !gf_IsNull(projectNo) && !gf_IsNull(requstNo) ) {
                url = "mtamat001/modifyMtaRequst";
            } else {
                url = "mtamat001/saveMtaRequst";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(projectNo) && !gf_IsNull(requstNo)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();
            }
        }

        $('#saveFormMtaRequst11 div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#checkAll').unbind("click").bind("click",function() {
    	var checkAll = $("#checkAll").prop("checked");
        dhxGridMtaRequst.forEachRow(function(rowId) {
            dhxGridMtaRequst.cells(rowId,0).setChecked(checkAll);
        });
    });

    $('#btnFormReset').unbind("click").bind("click",function() {
    	cf_InitInputSearch();
    });
};

var cf_SetBinding = function (){
    fn_SearchGridList();
    fn_SearchGridList2();
};

var cf_InitForm = function (){};

var cf_InitInputSearch = function (){

    gf_FormSetValue('searchFormMtaRequst', 'compNm', '', 'text');
    gf_FormSetValue('searchFormMtaRequst', 'searchSrequstDt', '', 'text');
    gf_FormSetValue('searchFormMtaRequst', 'searchErequstDt', '', 'text');
    gf_FormSetValue('searchFormMtaRequst', 'searchSregDt', '', 'text');
    gf_FormSetValue('searchFormMtaRequst', 'searchEregDt', '', 'text');
    gf_FormSetValue('searchFormMtaRequst', 'projectNo', '', 'text');
    
    dhxComboRequstStep.unSelectOption();
    dhxComboComptConfmAt.unSelectOption();

};

var fn_SearchGridList = function (){

    var jsonParameter = {
    	compNm  : gf_FormGetValue('searchFormMtaRequst', 'compNm', 'text'),
    	sRequstDt : gf_FormGetValue('searchFormMtaRequst', 'searchSrequstDt', 'text'),
        eRequstDt : gf_FormGetValue('searchFormMtaRequst', 'searchErequstDt', 'text'),
        requstStep : dhxComboRequstStep.getSelectedValue(),
        comptConfmAt : dhxComboComptConfmAt.getSelectedValue(),
    };

    gf_Transaction('gridList', 'mtamat001/searchMtaRequst', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
	dhxGridMtaRequst.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridMtaRequst.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SearchGridList2 = function (){

    var jsonParameter = {
    	sProjectDt : gf_FormGetValue('searchFormMtaRequst', 'searchSregDt', 'text'),
    	eProjectDt : gf_FormGetValue('searchFormMtaRequst', 'searchEregDt', 'text'),
        compNm  : gf_FormGetValue('searchFormMtaRequst', 'compNm', 'text')
    };
    
    gf_Transaction('gridList2', 'mtamat001/searchMtaCompany', jsonParameter, 'fn_CallbackSearchGridList2', false, 'GET');
};

var fn_CallbackSearchGridList2 = function (strSvcID, targetID, data){
	dhxGridMtaCompany.clearAll();
    if(!gf_IsNull(data.data.records)){
    	dhxGridMtaCompany.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt2").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SearchGridByItem = function (rId, cInd){

	  console.log(">>>>>>>>>>> fn_SearchGridByItem")
	if (rId > 0) {
		 var jsonParameter = {
				 	projectNo : dhxGridMtaCompany.cells(rId, 1).getValue(),
			        compNm : dhxGridMtaCompany.cells(rId, 2).getValue()
			        
		 };
		 gf_Transaction('gridList', 'mtamat001/searchMtaRequst', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
	  }    
};

var fn_SaveMtaRequst = function (rId, cInd) {
    projectNo = '';
    requstNo = '';
    var title = titMtaRequst + ' ' + gv_TitRegist;

    if (rId > 0) {
    projectNo = '';
    projectNo = dhxGridMtaRequst.cells(rId, 2).getValue();
    requstNo = '';
    requstNo = dhxGridMtaRequst.cells(rId, 3).getValue();
        title = titMtaRequst  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm11').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            //fn_SearchInputMtaRequst();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm11').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        //fn_SearchInputMtaRequst();
     }
};

var fn_CheckMtaRequst = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridMtaRequst, col);
    dhxGridMtaRequst.forEachRow(function(rowId) {
        if(dhxGridMtaRequst.cells(rowId,0).isChecked()){
            resArr.push( dhxGridMtaRequst.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var projectNos = [];
    projectNos.push( projectNo );
    var requstNos = [];
    requstNos.push( requstNo );
    fn_RemoveMtaRequst( projectNos, requstNos );
};

var fn_RemoveAll = function(){
    var projectNos = fn_CheckMtaRequst('projectNo');
    var requstNos = fn_CheckMtaRequst('requstNo');
    fn_RemoveMtaRequst( projectNos, requstNos );
};

var fn_RemoveMtaRequst = function ( projectNos, requstNos ){
    var jsonParameter = {
        projectNos : projectNos.join(','),
        requstNos : requstNos.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('mtamat001/removeMtaRequst', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
        fn_SearchGridList2();
    }

};

var fn_ExcelDown = function () {

    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMtaRequst', 'searchSregDt', 'text'),
        eRegDt : gf_FormGetValue('searchFormMtaRequst', 'searchEregDt', 'text'),
        useAt  : gf_FormGetValue('searchFormMtaRequst', 'useAt', 'radio')
    };

    var header = [[
                    gf_LocaleTrans('default', 'titProjectNo'),
                    gf_LocaleTrans('default', 'titRequstNo'),
                    gf_LocaleTrans('default', 'titRequstStep'),
                    gf_LocaleTrans('default', 'titRequstDt'),
                    gf_LocaleTrans('default', 'titRequstDept'),
                    gf_LocaleTrans('default', 'titRequstTelno'),
                    gf_LocaleTrans('default', 'titRequstEmail'),
                    gf_LocaleTrans('default', 'titComptRequstDt'),
                    gf_LocaleTrans('default', 'titRequstCn'),
                    gf_LocaleTrans('default', 'titPriorTy'),
                    gf_LocaleTrans('default', 'titRequstTy'),
                    gf_LocaleTrans('default', 'titDrctrEmpno'),
                    gf_LocaleTrans('default', 'titDrctCn'),
                    gf_LocaleTrans('default', 'titAtchmnfl'),
                    gf_LocaleTrans('default', 'titOpertorEmpno'),
                    gf_LocaleTrans('default', 'titOpertTy'),
                    gf_LocaleTrans('default', 'titConfmerNm'),
                    gf_LocaleTrans('default', 'titComptConfmDt'),
                    gf_LocaleTrans('default', 'titComptConfmAt'),
                    gf_LocaleTrans('default', 'titConfmOpn'),
                    gf_LocaleTrans('default', 'titStsfdgLevel'),
    ]];
    var dataId = [[ 'projectNo', 'requstNo', 'requstStep', 'requstDt', 'requstDept', 'requstTelno', 'requstEmail', 'comptRequstDt', 'requstCn', 'priorTy', 'requstTy', 'drctrEmpno', 'drctCn', 'atchmnfl', 'opertorEmpno', 'opertTy', 'confmerNm', 'comptConfmDt', 'comptConfmAt', 'confmOpn', 'stsfdgLevel' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMtaRequst ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMtaRequst;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('mtamat001/excelMtaRequst', jsonParameter);
};


var fn_MatPopup = function (formId, codeId, codeNmId, param) {
	
	
	var userId = ""; 
	var title  = "유지보수요청";
	//저장팝업
	var dhxWindowObj;
	var dhxWindowsMaintRequst;
	
	if($('body').find("div[id='bpopupMaintRequst']").size() <= 0) {
		$('body').append("<div id='bpopupMaintRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupMaintRequst').bPopup({
		onOpen:function(){
			
			dhxWindowsMaintRequst = new dhtmlXWindows();
			var id 		= 'bpopupMaintRequst';
			var ajaxUrl = gv_ContextPath+'/mtamatpop/saveMtaRequst/view';
			var left	= 0;
			var top		= 0;
			var width	= 1050;
			var height	= 600;
			
			dhxWindowObj = dhxWindowsMaintRequst.createWindow(id, left, top, width, height);
			dhxWindowsMaintRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupMaintRequst .b-close').click();
			});
		},
		onClose:function(){
			dhxWindowsMaintRequst.unload();
			$('body').find("div[id='bpopupMaintRequst']").remove();
			cf_SetBinding();
			
		}
	},function(){});
	return dhxWindowObj;
};



var fn_MatUdtPopup = function (formId, codeId, codeNmId, param) {
	
	var userId = ""; 
	var title  = "유지보수요청상세";
	//저장팝업
	var dhxWindowObj;
	var dhxWindowsMaintRequst;
	if($('body').find("div[id='bpopupMaintRequst']").size() <= 0) {
		$('body').append("<div id='bpopupMaintRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupMaintRequst').bPopup({
		onOpen:function(){
			
			dhxWindowsMaintRequst = new dhtmlXWindows();
			var id 		= 'bpopupMaintRequst';
			var ajaxUrl = gv_ContextPath+'/mtamat001pop/findMtaRequst/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 1050;
			var height	= 1000;
			
			dhxWindowObj = dhxWindowsMaintRequst.createWindow(id, left, top, width, height);
			dhxWindowsMaintRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupMaintRequst .b-close').click();
			});
		},
		onClose:function(){
			dhxWindowsMaintRequst.unload();
			$('body').find("div[id='bpopupMaintRequst']").remove();
			cf_SetBinding();
			
		}
	},function(){});
	return dhxWindowObj;
};
