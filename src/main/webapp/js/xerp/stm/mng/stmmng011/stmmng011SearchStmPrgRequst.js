/**
 * 프로그램 : 프로그램개선요청 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.02.20
 * 사용테이블 : STM_PRG_REQUST
 **/

var dhxGridStmPrgRequst;
var dhxGridStmPrgRequstListInfo;
var imprvmrequstSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titStmPrgRequst = gf_LocaleTrans('default','titStmPrgRequst');
var comboCheck = 'STMMNG011';
var dhxCCalendarDate2; // 기간 달력(From ~ To)


$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding ();
	if(cf_calendarInit()){   // 초기화
		init2();  // 기간달력 초기화
	}
    
    gf_IframeHeightResize(true);
    
});


var cf_InitParam = function (){

    fn_SetMenuPath("STMMNG011");
 
    gf_ComboCode('divComboSysSe', 'searchComboSysSe', 'searchComboSysSe', 'search', 'C001', '' , '', '', 'asc', ''); //업무구분
    gf_ComboCode('divComboReqSe', 'searchComboReqSe', 'searchComboReqSe', 'search', 'C100', '' , '', '', 'asc', ''); //요청구분
    gf_ComboCode('divComboSttusSe', 'searchComboSttusSe', 'searchComboSttusSe', 'search', 'C099', '' , '', '', 'desc', ''); //진행상태
    
	//function(divId, selectId, selectName, placeHolder, codekindCode, exceptCode, selectStyle, selectClass, sortOrder, validation) {

};


var cf_SetComponents = function (){

    var dhxGridStmPrgRequstListInfo = [];
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'cntr', false, 'num', '')); // 일련번호
    //dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAll" />', '40', 'center', 'na', 'ch', false, 'selYn', '')); // 선택
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("일련번호", '100', 'center', 'str', 'ro', true, 'imprvmrequstSn', '')); // 개선요청일련번호
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("업무분류", '100', 'center', 'str', 'ro', false, 'jobClsCode', '')); // 업무분류코드(C001)
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("메뉴ID", '100', 'center', 'str', 'ro', false, 'progrmId', '')); // 프로그램 아이디
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("메뉴명", '120', 'center', 'str', 'ro', false, 'progrmNm', '')); // 프로그램 아이디
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("개발담당", '100', 'center', 'str', 'ro', false, 'charger', '')); // 담당
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("요청구분", '80', 'center', 'str', 'ro', false, 'requstSeCode', '')); // 요청구분코드(C100)
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("우선순위", '80', 'center', 'str', 'ro', false, 'priorRank', '')); // 우선 순위 C923
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("요청자", '100', 'center', 'str', 'ro', false, 'rqester',  ''));
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("요청일자", '100', 'center', 'str', 'ro', false, 'requstDe', '')); // 요청일자
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("진행상태", '100', 'center', 'str', 'ro', false, 'progrsSttusCode', '')); // 진행상태코드(C099)
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("접수일자", '100', 'center', 'str', 'ro', false, 'rceptDe', '')); // 접수일    
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("처리예정일자", '100', 'center', 'str', 'ro', false, 'processPdt', '')); // 처리예정일자
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("완료일자", '100', 'center', 'str', 'ro', false, 'comptDe', '')); // 완료일
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("확인일자", '100', 'center', 'str', 'ro', false, 'confirmDe', '')); // 확인일자
    dhxGridStmPrgRequstListInfo.push(gf_MakeDhxGridHeader("요청사항", '*', 'left', 'str', 'ro', false, 'requstDesc', '')); // 요청사항

    dhxGridStmPrgRequst = gf_MakeDhxGrid('dataList', dhxGridStmPrgRequstListInfo, true, false, false);

    dhxGridStmPrgRequst.enableAutoWidth(true);
    dhxGridStmPrgRequst.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridStmPrgRequst.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });

    //팝업창 
    dhxGridStmPrgRequst.attachEvent("onRowDblClicked", function(rId,cInd){
    	
    	var imprvmrequstSn  = dhxGridStmPrgRequst.cells(rId, dhxGridStmPrgRequst.getColIndexById("imprvmrequstSn")).getValue();
    	var progrmId  		= dhxGridStmPrgRequst.cells(rId, dhxGridStmPrgRequst.getColIndexById("progrmId")).getValue();
    	
    	var param = "imprvmrequstSn=" + imprvmrequstSn + "&progrmId=" + progrmId;
    	fn_PrgSearchPopup('form1','','', param);
    });    
    
   	//필수항목 체크 
	//$("#saveFormStmPrgRequst").validate({ errorElement: 'div', ignore: '' });	       

};

var cf_SetEventListener = function (){

	//fn_MenuList('formPop1','','', '');
	$('#searchFormStmPrgRequst #btnEmpSearch').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormStmPrgRequst","requestPersonId","requestPersonName", "", "Y");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, 콜백함수
		 
	});
	
	$('#searchFormStmPrgRequst #btnMenuSearch').unbind('click').bind('click', function(event){
		fn_MenuList('formPop1','','', '',fn_CallbackMenuPopup);
	});
	   
	
	
    $('#searchFormStmPrgRequst #btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });
    
    //검색조건 초기화 
    $('#btnFormReset').unbind("click").bind("click",function() {
    	$('#searchForm1').resetForm();
    });
      
    //신규추가 팝업
    $('#btnAdd').unbind("click").bind("click",function() {
    	var param = "imprvmrequstSn=&progrmId=";
    	fn_PrgRequstPopup('form1','','', param);
    });
    
    //엑셀 
    $('#btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

   //삭제 
    $('#btnRemove').unbind('click').bind('click', function() {
    	fn_RemoveStmPrgRequstItem();
    });    
    
    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });
    
	//프로그램개선요청  
    /*
    $('#btn_improve_request').unbind('click').bind('click', function() {
    	var param = "imprvmrequstSn=&progrmId=STMMNG011";
    	fn_PrgRequstPopup('form1','','', param);
    });	    
    */

};

var cf_SetBinding = function (){
    fn_SearchGridList();
};

var fn_SearchGridList = function (){

	var requestPersonName = gf_FormGetValue('searchFormStmPrgRequst', 'requestPersonName', 'text');
	var requestMenuId = gf_FormGetValue('searchFormStmPrgRequst', 'requestMenuId', 'text');
	var requestMenuName = gf_FormGetValue('searchFormStmPrgRequst', 'requestMenuName', 'text');
	var comboSysSe = gf_FormGetValue('searchFormStmPrgRequst', 'searchComboSysSe', 'combo');
	var comboReqSe = gf_FormGetValue('searchFormStmPrgRequst', 'searchComboReqSe', 'combo');
	var comboSttusSe = gf_FormGetValue('searchFormStmPrgRequst', 'searchComboSttusSe', 'combo');
	var sReqstDe = gf_FormGetValue('searchFormStmPrgRequst', 'bgnRequstDe', 'text').replaceAll('-','');
	var eReqstDe = gf_FormGetValue('searchFormStmPrgRequst', 'endRequstDe', 'text').replaceAll('-','');
	
    var jsonParameter = {
    	requestPersonName : requestPersonName,
    	requestMenuId : requestMenuId,
    	requestMenuName : requestMenuName,
		comboSysSe : comboSysSe,
		comboReqSe : comboReqSe,
		comboSttusSe : comboSttusSe,
		sReqstDe : sReqstDe,
		eReqstDe : eReqstDe
    };

    gf_Transaction('gridList', 'stmmng011/searchStmPrgRequst', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridStmPrgRequst.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridStmPrgRequst.parse(data.data.records, 'js');
    } else {
        gf_NoFoundDataOnGridMsg('dataList'); // 조회없음 메시지 그리드상에 표시
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
};

var fn_ExcelDown = function () {

	var comboSysSe = gf_FormGetValue('searchFormStmPrgRequst', 'searchComboSysSe', 'combo');
	var comboReqSe = gf_FormGetValue('searchFormStmPrgRequst', 'searchComboReqSe', 'combo');
	var comboSttusSe = gf_FormGetValue('searchFormStmPrgRequst', 'searchComboSttusSe', 'combo');
	var sReqstDe = gf_FormGetValue('searchFormStmPrgRequst', 'bgnRequstDe', 'text');
	var eReqstDe = gf_FormGetValue('searchFormStmPrgRequst', 'endRequstDe', 'text');
	
    var jsonParameter = {
		comboSysSe : comboSysSe,
		comboReqSe : comboReqSe,
		comboSttusSe : comboSttusSe,
		sReqstDe : sReqstDe,
		eReqstDe : eReqstDe
    };
    
    var header = [['일련번호','업무구분','프로그램ID','요청구분','우선순위','진행상태','요청자','요청일자','조치예정일자','확인일자','접수일자','완료일자','담당자','요청내용','첨부파일','처리내용',
    	 ]];	

    var dataId = [[ 'imprvmrequstSn', 'jobClsCode', 'progrmId', 'requstSeCode', 'priorRank', 'progrsSttusCode', 'rqester', 'requstDe', 'processPdt', 'confirmDe', 'rceptDe', 'comptDe', 'charger', 'requstDesc', 'atchmnflNo', 'processCn' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titStmPrgRequst ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titStmPrgRequst;

    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };

    gf_ExcelDown('stmmng011/excelStmPrgRequst', jsonParameter);
};

var fn_RemoveStmPrgRequstItem =function (){
	
    if( gf_IsNull(dhxGridStmPrgRequst.getSelectedRowId()) ) {
        gf_DivMsgAlert(gv_MsgDelKey);
        return false;
    }
	var imprvmrequstSn  = dhxGridStmPrgRequst.cells(dhxGridStmPrgRequst.getSelectedRowId(), dhxGridStmPrgRequst.getColIndexById("imprvmrequstSn")).getValue();
    if( gf_IsNull(imprvmrequstSn) ) {
         gf_DivMsgAlert(gv_MsgDelKey);
         return false;
    } else {
        gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveStmPrgRequstItemExe()', '');
    }	
}

var fn_RemoveStmPrgRequstItemExe = function (){
	var imprvmrequstSns = [];
	var imprvmrequstSn  = dhxGridStmPrgRequst.cells(dhxGridStmPrgRequst.getSelectedRowId(), dhxGridStmPrgRequst.getColIndexById("imprvmrequstSn")).getValue();
	imprvmrequstSns.push( imprvmrequstSn );
	
	var jsonParameter = {
        imprvmrequstSns : imprvmrequstSns.join(',')
    };

    var dataSource = gf_NoAsyncTransaction('stmmng011/removeStmPrgRequst', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	gf_DivMsgAlert(gv_MsgDelete);
    	fn_SearchGridList();	    
    }
   
};


// 등록화면 팝업창 
var fn_PrgRequstPopup = function (formId, codeId, codeNmId, param) {
	
	var userId = ""; 
	var title  = titStmPrgRequst + " (등록)";
	
	//저장팝업
	var dhxWindowObj;
	var dhxWindowsPrgRequst;
	if($('body').find("div[id='bpopupPrgRequst']").size() <= 0) {
		$('body').append("<div id='bpopupPrgRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupPrgRequst').bPopup({
		onOpen:function(){
			
			dhxWindowsPrgRequst = new dhtmlXWindows();
			var id 		= 'bpopupPrgRequst';
			var ajaxUrl = gv_ContextPath+'/stmmng011/popup/findStmPrgRequst/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 900;
			var height	= 420;
			
			dhxWindowObj = dhxWindowsPrgRequst.createWindow(id, left, top, width, height);
			dhxWindowsPrgRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupPrgRequst .b-close').click();
			});
		},
		onClose:function(){
			dhxWindowsPrgRequst.unload();
			$('body').find("div[id='bpopupPrgRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

//조회화면 팝업창 
var fn_PrgSearchPopup = function (formId, codeId, codeNmId, param) {
	
	var userId = ""; 
	var title  = titStmPrgRequst + " (조회)";
	
	var dhxWindowObj;
	var dhxWindowsPrgSearch;
	if($('body').find("div[id='bpopupPrgSearch']").size() <= 0) {
		$('body').append("<div id='bpopupPrgSearch' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#bpopupPrgSearch').bPopup({
		onOpen:function(){
			
			dhxWindowsPrgSearch = new dhtmlXWindows();
			var id 		= 'bpopupPrgSearch';
			var ajaxUrl = gv_ContextPath+'/stmmng011/popup/findStmPrgSearch/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 1000;
			var height	= 600;
			
			dhxWindowObj = dhxWindowsPrgSearch.createWindow(id, left, top, width, height);
			dhxWindowsPrgSearch.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupPrgSearch .b-close').click();
			});
		},
		onClose:function(){
			dhxWindowsPrgSearch.unload();
			$('body').find("div[id='bpopupPrgSearch']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};

	

//메뉴 팝업창 
var $menuInfo = {};  //공통코드 
var fn_MenuList = function (formId, codeId, codeNmId, param,strCallbackFunc) {
	
	var title  = "메뉴목록";
	
	$menuInfo = {};
	
	var dhxWindowObj;
	var dhxWindowsMenuList;
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
	
	if($('body').find("div[id='bpopupMenuList']").size() <= 0) {
		$('body').append("<div id='bpopupMenuList' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	
	$('#bpopupMenuList').bPopup({
		onOpen:function(){
			dhxWindowsMenuList = new dhtmlXWindows();
			var id 		= 'bpopupMenuList';
			var ajaxUrl = gv_ContextPath+'/stmmng002/popup/stmMenuListPopup/view?'+param;
			var left	= 500;
			var top		= 500;
			var width	= 600;
			var height	= 500;
			
			dhxWindowObj = dhxWindowsMenuList.createWindow(id, left, top, width, height);
			dhxWindowsMenuList.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupMenuList .b-close').click();
			});
		},
		onClose:function(){
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($menuInfo);
			}
			
			dhxWindowsMenuList.unload();
			$('body').find("div[id='bpopupMenuList']").remove();			
		}
	},function(){});
	return dhxWindowObj;
};


function cf_calendarInit(){
    $('#searchFormStmPrgRequst.input_calen').unbind('keyup').bind('keyup', function(event){
    	//날짜 유효성체크 
    	dateValidateChk($(this));
    });
 
    $('#searchFormStmPrgRequst #bgnRequstDe').unbind('click').bind('click', function(event){
    	dhxCCalendarDate2.show();
    });
    
    $('#searchFormStmPrgRequst #endRequstDe').unbind('click').bind('click', function(event){
    	dhxCCalendarDate2.show();
    });
    
    //금일 조회
    
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
   
}


function init2(){
	//달력 생성
	dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
	
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
       if(side == "right"){ //날짜유효성 체크때문에 두번째 달력날짜가 선택되어야  창이 닫힘 
        	$('#bgnRequstDe').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        	$('#endRequstDe').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
        	dhxCCalendarDate2.hide();
        }else  if(side == "left"){ //
        	$('#bgnRequstDe').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        	gf_DivMsgAlert("종료일자를 선택해주세요.");
        	
        }
       
       
    });
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('bgnRequstDe', 'endRequstDe', '');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('searchFormStmPrgRequst', 'bgnRequstDe', 'text'));
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormStmPrgRequst', 'endRequstDe', 'text'));	
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
	
	// 시스템 환경설정 검색 기간 설정
    gf_SettingDateInterval('bgnRequstDe', 'endRequstDe'); 
}

function dateValidateChk(objDate){
	
	var date = objDate.val();
	
	if (date.length == 10) {
		if (!gf_IsDate(date)) {
			  gf_DivMsgAlert("잘못된 날짜입니다. <br/>다시 입력하세요.");
			  objDate.val("");
			  objDate.focus();
			  return;
		}		
	}
}


var fn_CallbackMenuPopup = function(data) {

    gf_FormSetValue('searchFormStmPrgRequst', 'requestMenuId', data.menuId, 'text');
    gf_FormSetValue('searchFormStmPrgRequst', 'requestMenuName', data.menuNm, 'text');
};




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

