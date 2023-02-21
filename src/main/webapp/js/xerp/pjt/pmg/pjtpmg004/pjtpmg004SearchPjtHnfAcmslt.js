/**
 * 프로그램 : 프로젝트별투입현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.15
 * 사용테이블 : PJT_HNF_ACMSLT
 **/

var dhxGridPjtHnfAcmslt;
var dhxGridPjtHnfAcmsltListInfo;
var hnfAcmsltSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtHnfAcmslt = gf_LocaleTrans('default','titPjtHnfAcmslt');

var nowDate = "";

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();
});


var cf_InitParam = function (){

    gf_SetMenuPath();
    
    gf_FormSetValue("searchFormPjtHnfAcmslt", "comptAt", '0', "combo");
 
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);

	fn_Calendar();
  
};


var cf_SetComponents = function (){

    var dhxGridPjtHnfAcmsltListInfo = [];
    //dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader(gv_TitSelect, '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('No', '40', 'center', 'str', 'ro', false, 'num', '')); // 번호
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('프로젝트명', '400', 'left', 'str', 'ro', false, 'projectNm', '')); // 인력 실적 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('총괄PM', '90', 'center', 'str', 'ro', false, 'projectPmNm', '')); // 실적 기준 일자
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('시작일자/종료일자', '180', 'center', 'str', 'ro', false, 'projectDe', '')); // 참여 M/M
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('총투입MM/계획MM', '140', 'center', 'str', 'ro', false, 'partcptnManMonth', '')); // 기술 등급
	dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('진행률', '60', 'center', 'str', 'ro', false, 'hnfRate', '')); // 기술 등급
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('전년', '60', 'right', 'str', 'ro', false, 'psum', '')); // 참여자 명
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('1월', '60', 'right', 'str', 'ro', false, 'c1', '')); // 역할 코드
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('2월', '60', 'right', 'str', 'ro', false, 'c2', '')); // 외부 용역 여부
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('3월', '60', 'right', 'str', 'ro', false, 'c3', '')); // 산출물 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('4월', '60', 'right', 'str', 'ro', false, 'c4', '')); // 프로젝트 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('5월', '60', 'right', 'str', 'ro', false, 'c5', '')); // 프로젝트 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('6월', '60', 'right', 'str', 'ro', false, 'c6', '')); // 프로젝트 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('7월', '60', 'right', 'str', 'ro', false, 'c7', '')); // 프로젝트 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('8월', '60', 'right', 'str', 'ro', false, 'c8', '')); // 프로젝트 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('9월', '60', 'right', 'str', 'ro', false, 'c9', '')); // 프로젝트 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('10월', '60', 'right', 'str', 'ro', false, 'c10', '')); // 프로젝트 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('11월', '60', 'right', 'str', 'ro', false, 'c11', '')); // 프로젝트 순번
    dhxGridPjtHnfAcmsltListInfo.push(gf_MakeDhxGridHeader('12월', '*', 'right', 'str', 'ro', false, 'c12', '')); // 프로젝트 순번

    dhxGridPjtHnfAcmslt = gf_MakeDhxGrid('dataList', dhxGridPjtHnfAcmsltListInfo, true, false, false);
	

    dhxGridPjtHnfAcmslt.enableAutoWidth(false);

	dhxGridPjtHnfAcmslt.setColumnMinWidth(60,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스
	dhxGridPjtHnfAcmslt.adjustColumnSize(0);
	 
    dhxGridPjtHnfAcmslt.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridPjtHnfAcmslt.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    dhxGridPjtHnfAcmslt.attachEvent('onRowSelect', fn_SavePjtHnfAcmslt);

    $("#saveFormPjtHnfAcmslt").validate({
        errorElement: 'div'
    });
};

var cf_SetEventListener = function (){

    $('#searchFormPjtHnfAcmslt input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormPjtHnfAcmslt .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormPjtHnfAcmslt .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });

    $('#btnSearchPjtpmg004').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });

    $('.tdl-1 #btnAdd').unbind('click').bind('click', function(event){
          dhxGridPjtHnfAcmslt.clearSelection();
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
        var hnfAcmsltSns = fn_CheckPjtHnfAcmslt('hnfAcmsltSn');
        if( gf_IsNull(hnfAcmsltSns) ) {
             gf_DivMsgAlert(gv_MsgDelKey);
             return false;
        } else {
            gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveAll()', '');
        }
    });

    $('.tdl-2 #btnFormRemove').unbind('click').bind('click', function() {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
    });

    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });

    $('.tdl-2 #btnFormSave').unbind('click').bind('click', function() {

    });

    $('#btnCheckAll').unbind("click").bind("click",function() {
        if(checkAll) checkAll = false;
        else checkAll = true;
        dhxGridPjtHnfAcmslt.forEachRow(function(rowId) {
            dhxGridPjtHnfAcmslt.cells(rowId,0).setChecked(checkAll);
        });
    });

    $('#btnResetPjtpmg004').unbind("click").bind("click",function() {
        cf_InitInputForm();
    });

	$('#btnExcelPjtpmg004').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPjtpmg004();
    });
	$('#btnProjectSearch').unbind('click').bind('click', function() {
        fn_ProjectList('formPop1','','', '',fn_CallbackProjectPopup);
    });
};

var cf_SetBinding = function (){
    fn_SearchGridList();
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){
	
	gf_FormSetValue('searchFormPjtHnfAcmslt', 'projectNm', '', 'text');
	gf_FormSetValue('searchFormPjtHnfAcmslt', 'projectSn', '', 'text');
	$('#baseYear').val(nowDate.substring(0,4));
	gf_FormSetValue("searchFormPjtProject", "comptAt", '0', "combo");

};

var fn_SearchGridList = function (){

    var jsonParameter = {
    	baseYear : gf_FormGetValue('searchFormPjtHnfAcmslt', 'baseYear', 'text'),
        comptAt : gf_FormGetValue('searchFormPjtHnfAcmslt', 'comptAt', 'combo'),
		projectSn : gf_FormGetValue('searchFormPjtHnfAcmslt', 'projectSn', 'text')
    };

    gf_Transaction('gridList', 'pjtpmg004/searchPjtHnfAcmslt', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridPjtHnfAcmslt.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridPjtHnfAcmslt.parse(data.data.records, 'js');
    } else {
        gf_DivMsgAlert(gv_MsgNoData);
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_SavePjtHnfAcmslt = function (rId, cInd) {
    hnfAcmsltSn = '';
    var title = titPjtHnfAcmslt + ' ' + gv_TitRegist;

    if (rId > 0) {
    hnfAcmsltSn = '';
    hnfAcmsltSn = dhxGridPjtHnfAcmslt.cells(rId, 2).getValue();
        title = titPjtHnfAcmslt  + ' ' + gv_TitUpdate;
    }
    if(!fadeMode) {
        $('#saveForm').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputPjtHnfAcmslt();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveForm').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputPjtHnfAcmslt();
     }
};

var fn_CheckPjtHnfAcmslt = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridPjtHnfAcmslt, col);
    dhxGridPjtHnfAcmslt.forEachRow(function(rowId) {
        if(dhxGridPjtHnfAcmslt.cells(rowId,0).isChecked()){
            resArr.push( dhxGridPjtHnfAcmslt.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
    var hnfAcmsltSns = [];
    hnfAcmsltSns.push( hnfAcmsltSn );
    fn_RemovePjtHnfAcmslt( hnfAcmsltSns );
};

var fn_RemoveAll = function(){
    var hnfAcmsltSns = fn_CheckPjtHnfAcmslt('hnfAcmsltSn');
    fn_RemovePjtHnfAcmslt( hnfAcmsltSns );
};

var fn_RemovePjtHnfAcmslt = function ( hnfAcmsltSns ){
    var jsonParameter = {
        hnfAcmsltSns : hnfAcmsltSns.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg004/removePjtHnfAcmslt', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        gf_DivMsgAlert(gv_MsgDelete);
        fn_SearchGridList();
    }

    $('#btnAdd').click();
};

/**
 * 엑셀다운로드
 */
var fn_ExcelPjtpmg004 = function () {
    var titPjtpmg004 = '프로젝트별투입현황'; 
    var jsonParameter = {
		baseYear : gf_FormGetValue('searchFormPjtHnfAcmslt', 'baseYear', 'text'),
        projectSn : gf_FormGetValue('searchFormPjtHnfAcmslt', 'projectSn', 'text'),
        comptAt : gf_FormGetValue('searchFormPjtHnfAcmslt', 'comptAt', 'combo')
    };
    var header = [[
		'프로젝트명',
        '총괄PM',
        '시작일자/종료일자',
        '총투입MM/계획MM',
        '진행률',
		'전년',
        '1월',
        '2월',
        '3월',
        '4월',
		'5월',
		'6월',
		'7월',
		'8월',
		'9월',
		'10월',
		'11월',
		'12월'
    ]];
    var dataId = [[ 
		'projectNm',
		'projectPmNm',
		'projectDe',
		'partcptnManMonth',
		'hnfRate',
		'psum',
		'c1',
		'c2',
		'c3',
		'c4',
		'c5',
		'c6',
		'c7',
		'c8',
		'c9',
		'c10',
		'c11',
		'c12'
 	]];
    var dataAlign = [[ 'left','center','center','center','center','right','right','right','right','right','right','right','right','right','right','right','right','right', ]];
    var sheetNm = [[ titPjtpmg004 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPjtpmg004;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pjtpmg004/excelPjtHnfAcmslt', jsonParameter);
};

var fn_Calendar = function(){

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#baseYear').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
}
//날짜 포멧 처리
function dateFormat(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1; //January is 0!
  var yyyy = date.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  var nDate = yyyy+'-'+mm+'-'+dd;
  return(nDate);
}

//메뉴 팝업창 
var $projectInfo = {};  //공통코드 
var fn_ProjectList = function (formId, codeId, codeNmId, param,strCallbackFunc) {
	
	var title  = "프로젝트조회";
	
	$projectInfo = {};
	
	var dhxWindowObj;
	var dhxWindowsProjectList;
	var callbacks = $.Callbacks();
    var callFunction = null;
    
    if ( !gf_IsNull(strCallbackFunc) ) {
        if(typeof(strCallbackFunc) == "string"){
                callFunction = eval(strCallbackFunc);
                if ( typeof callFunction != "function" ) {
                    gf_DivMsgAlert("call back function "+ strCallbackFunc +" 이 구현되지 않습니다.!!");
                    return false;
                }
        }else{
                callFunction = strCallbackFunc;
        }
    }   
	if($('body').find("div[id='bpopupProjectList']").size() <= 0) {
		$('body').append("<div id='bpopupProjectList' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	
	$('#bpopupProjectList').bPopup({
		onOpen:function(){
			
			dhxWindowsProjectList = new dhtmlXWindows();
			var id 		= 'bpopupProjectList';
			var ajaxUrl = gv_ContextPath+'/pjtpmg005/popup/pjtpmg005ProjectListPopup/view?'+param;
			var left	= 500;
			var top		= 500;
			var width	= 750;
			var height	= 550;
			
			dhxWindowObj = dhxWindowsProjectList.createWindow(id, left, top, width, height);
			dhxWindowsProjectList.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupProjectList .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
                callbacks.empty();
                callbacks.add(callFunction);
                callbacks.fire($projectInfo);
            }
			dhxWindowsProjectList.unload();
			$('body').find("div[id='bpopupProjectList']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

var fn_CallbackProjectPopup = function(data) {
    gf_FormSetValue('searchFormPjtHnfAcmslt', 'projectNm', data.projectNm, 'text');
    gf_FormSetValue('searchFormPjtHnfAcmslt', 'projectSn', data.projectSn, 'text');
};
