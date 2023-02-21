/**
 * 프로그램 : 프로젝트현황 화면 javascript
 * 작성자 : 디비비전
 * 작성일자 : 2020.01.14
 * 사용테이블 : PJT_PROJECT
 **/

var dhxGridPjtProject;
var dhxGridPjtProjectListInfo;
var dhxGridPjtProjectBcncListInfo;
var projectSn = '';
var fadeRegs = true;
var fadeMode = false;
var checkAll = false;
var titPjtProject = gf_LocaleTrans('default','titPjtProject');

var dhxCCalendarDate3;
var myTabbar;
var rowCnt = 0;

$(function() {

    cf_InitParam();
    cf_SetComponents();
    cf_SetEventListener();
    cf_SetBinding();
    cf_InitForm();

});


$(window).resize(function() {
	myTabbar.setSizes();
});

var cf_InitParam = function (){

    gf_SetMenuPath();
    //세션정보 
	var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
    gBplcCode =userInfo.data.bplcCode;      
    userEmpNo =userInfo.data.userEmpNo;      
  
    gf_FormSetValue("searchFormPjtProject", "comptAt", '0', "combo"); 
    
    $("#cntrctAmt").number(true);//폼에서  숫자 콤마처리 (계약금액)
    $("#cntrctAmtVat").number(true);
    $("#grtsMntnceMcnt").number(true);	//폼에서  숫자 콤마처리 (무상개월)
    
	//기간달력 이벤트 추가
    $('#searchFormPjtProject #searchSregDt').unbind('click').bind('click', function(event){
    	dhxCCalendarDate2.show();
    });
    $('#searchFormPjtProject #searchEregDt').unbind('click').bind('click', function(event){
    	dhxCCalendarDate2.show();
    });
    
    dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");	
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        if(side == "right"){
        	$('#searchSregDt').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        	$('#searchEregDt').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
        	dhxCCalendarDate2.hide();
        }
    });
	//dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormPjtProject', 'date22', 'text'));
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");	
	
	//기간달력 이벤트 추가
	$('#saveFormPjtProject #searchSprojDt').unbind('click').bind('click', function(event){
	    	dhxCCalendarDate3.show();
	    });
    $('#saveFormPjtProject #searchEprojDt').unbind('click').bind('click', function(event){
    	dhxCCalendarDate3.show();
    });
    // 시스템 환경설정 검색 기간 설정
    //gf_SettingDateInterval('searchSregDt', 'searchEregDt'); 

    dhxCCalendarDate3 = new dhtmlXDoubleCalendar("date3_cal");	
    dhxCCalendarDate3.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchSprojDt').val(dateFormat(dhxCCalendarDate3.leftCalendar.getDate()));
        	$('#searchEprojDt').val(dateFormat(dhxCCalendarDate3.rightCalendar.getDate()));
        	dhxCCalendarDate3.hide();
        	fn_CntrctMonth();
        }
    }); 

    dhxCCalendarDate3.leftCalendar.loadUserLanguage("ko");
    dhxCCalendarDate3.rightCalendar.loadUserLanguage("ko");    
    $('#saveFormPjtProject #searchSrealDe').unbind('click').bind('click', function(event){
    	dhxCCalendarDate4.show();
    });
    $('#saveFormPjtProject #searchErealDe').unbind('click').bind('click', function(event){
    	dhxCCalendarDate4.show();
    });        
    dhxCCalendarDate4 = new dhtmlXDoubleCalendar("date4_cal");	
    dhxCCalendarDate4.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#searchSrealDe').val(dateFormat(dhxCCalendarDate4.leftCalendar.getDate()));
        	$('#searchErealDe').val(dateFormat(dhxCCalendarDate4.rightCalendar.getDate()));
        	dhxCCalendarDate4.hide();
        }
    }); 
    dhxCCalendarDate4.rightCalendar.setDate(gf_FormGetValue('searchFormPjtProject', 'date22', 'text'));
    dhxCCalendarDate4.leftCalendar.loadUserLanguage("ko");
    dhxCCalendarDate4.rightCalendar.loadUserLanguage("ko");
    
    var dataSource = gf_NoAsyncTransaction('stmcmm001/findUser', '', 'GET');
    var data = dataSource.data;
    gf_FormSetValue('saveFormPjtProject', 'userNm', data.userNm, 'text');
    gf_FormSetValue('saveFormPjtProject', 'empno', data.empno, 'text');
    
    $("#cntrctAmt").number(true);

};

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="searchSregDt" || e.target.id =="searchEregDt") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date3_cal" || e.target.id =="searchSprojDt" || e.target.id =="searchEprojDt") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate3.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date4_cal" || e.target.id =="searchSrealDe" || e.target.id =="searchErealDe") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate4.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

var cf_SetComponents = function (){
	
	gf_ComboCode('divComboProjectSe','searchComboProjectSe','searchComboProjectSe', 'search', 'C200', '' , '', '', 'asc', '');
	gf_ComboCode('divInputFormComboProjectSeCodeBox','searchProjectSe','searchProjectSe', 'add', 'C200', '' , '', '', 'asc', 'required'); //필수입력
	gf_ComboCode('divInputFormComboCntrctTyCodeBox','searchCntrctTy','searchCntrctTy', 'add', 'C203', '' , '', '', 'asc', '');
	gf_ComboCode('divInputFormComboProjectAreaCodeBox','searchProjectArea','searchProjectArea', 'add', 'C079', '' , '', '', 'asc', '');
	
    var dhxGridPjtProjectListInfo = [];
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '30', 'center', 'str', 'ro', false, 'num', '', ''));
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('구분', '60', 'center', 'str', 'ro', false, 'projectSe', '')); // 프로젝트 구분
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('거래처', '150', 'left', 'str', 'ro', false, 'bcncNm', '')); // 프로젝트 명
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('프로젝트명', '250', 'left', 'str', 'ro', false, 'projectNm', '')); // 프로젝트 명
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('상태', '*', 'center', 'str', 'ro', false, 'comptAt', '')); // 진행상태
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('', '190', 'center', 'str', 'ro', true, 'projectBeginDe', '')); // 계약시작일자
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, 'projectSn', '')); // 
    //dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('', '80', 'center', 'str', 'ro', true, 'comptAt', '')); // 
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'acmsltCnt', '')); // 실적등록여부 추가 
    dhxGridPjtProjectListInfo.push(gf_MakeDhxGridHeader('', '0', 'center', 'str', 'ro', true, 'projectPmEmpno', '')); // PM담당자  

    dhxGridPjtProject = gf_MakeDhxGrid('dataList', dhxGridPjtProjectListInfo, true, false, false);

	dhxGridPjtProject.enableAutoWidth(false);
	dhxGridPjtProject.setColumnMinWidth(40,4); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtProject.adjustColumnSize(0);	

    dhxGridPjtProject.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
        if(cInd == 0) return true;
        else return false;
    });
    dhxGridPjtProject.attachEvent("onKeyPress",function(keyCode,ctrl,shift,event_object){
        if(keyCode == 113) fn_ExcelDown();
    });
    
    dhxGridPjtProject.attachEvent("onRowSelect", fn_SavePjtProject);

    $("#saveFormPjtProject").validate({
        errorElement: 'div'
    });

    $("#saveFormPjtProject").validate({
        errorElement: 'div'
    });
    
    myTabbar = new dhtmlXTabBar({
        parent:         "tabbarObj",
        close_button:   false,
        arrows_mode :   "auto", 
        tabs: [
    	    {id:"a1",  text: '기본사항' }, 
		    {id:"a2",  text: '인력'},   
            {id:"a3",  text: '예산'},		         
		    {id:"a4",  text: '협력계약'},		         
		    {id:"a5",  text: '이슈위험'},	        
		    {id:"a6",  text: '산출물'},		
		    {id:"a7",  text: '완료'},	
		    ]
    });
   
    myTabbar.tabs("a1").attachObject("a1");
    myTabbar.tabs("a2").attachObject("a2");
    myTabbar.tabs("a3").attachObject("a3");
    myTabbar.tabs("a4").attachObject("a4");
    myTabbar.tabs("a5").attachObject("a5");
    myTabbar.tabs("a6").attachObject("a6");
    myTabbar.tabs("a7").attachObject("a7");
    
    myTabbar.attachEvent("onSelect", function(id, lastId){
    	
    	var projectSn = $("#projectSn").val();
        if(id=="a2") myTabbar.tabs("a2").attachURL("/xerp/pjtpmg001/searchPjtHnf/view?projectSn="+projectSn);
        if(id=="a3") myTabbar.tabs("a3").attachURL("/xerp/pjtpmg001/searchPjtBugtPlan/view?projectSn="+projectSn);
        if(id=="a4") myTabbar.tabs("a4").attachURL("/xerp/pjtpmg001/searchPjtCcpy/view?projectSn="+projectSn);
        if(id=="a5") myTabbar.tabs("a5").attachURL("/xerp/pjtpmg001/searchPjtIssue/view?projectSn="+projectSn);
        if(id=="a6") myTabbar.tabs("a6").attachURL("/xerp/pjtpmg001/searchPjtOutputs/view?projectSn="+projectSn);
        if(id=="a7") myTabbar.tabs("a7").attachURL("/xerp/pjtpmg001/searchPjtEnd/view?projectSn="+projectSn);
    	return true;
    });
    myTabbar.attachEvent("onTabClick", function(id, lastId){
    	var projectSn = $("#projectSn").val();
	    
	    if(gf_IsNull(projectSn)) {
	    	gf_DivMsgAlert('기본사항을 먼저 등록하세요.');
	    }
	    
    });
 
    myTabbar.tabs("a1").setActive();
    fn_titleSearch();
};

var cf_SetEventListener = function (rId){

    $('#searchFormPjtProject').unbind('keypress').bind('keypress', function(event){
        if(event.charCode == 13) { $('#btnSearch').click(); event.preventDefault(); }
    });	
    $('#searchFormPjtProject input[name=searchDateSet]').unbind('change').bind('change', function(event){
        gf_SetDateIntervalRadio('searchSregDt', 'searchEregDt',  $(this).val());
    });
    $('#searchFormPjtProject .input_calen').unbind('keyup').bind('keyup', function(event){
        gf_AutoDate(event, this);
    });
    $('#searchFormPjtProject .input_calen').unbind('keypress').bind('keypress', function(event){
        gf_AutoDate(event, this);
    });
    $('#btnSearch').unbind('click').bind('click', function(event){
        fn_SearchGridList();
    });
    $('#btnAppList').unbind('click').bind('click', function(event){
    	fn_SearchGridApprvList();
    });
    //검색 거래처 찾기 
    $('#searchFormPjtProject #btnCompNmSearch').unbind('click').bind('click', function(event){
    	gf_CustomerPopup("searchFormPjtProject","compCd","compNm", "01", "N","");
    });
    $('#saveFormPjtProject #btnEmpSearch').unbind('click').bind('click', function(event){
    	gf_EmpPopup("saveFormPjtProject","projectPmEmpno","projectPmNm", gBplcCode, "N","");
    });
    $('#saveFormPjtProject #cntrctAmt').unbind('focusout').bind('focusout', function(event){
    	fn_Vat();
    });
    $('#btnAdd').unbind('click').bind('click', function(event){
    	
    	if(rowCnt == 0) {
    		gf_NoFoundDataOnGridMsgRemove('dataList');  
    	}
    	
    	//신규버튼 클릭시 disabled 해제 
    	$("#saveFormPjtProject").find("input,select,checkbox,textarea").removeAttr("disabled");
    	dhxGridPjtProject.addRow(dhxGridPjtProject.uid(),['','','','',''],0);
    	
    	
    	
          dhxGridPjtProject.clearSelection();
          dhxGridPjtProject.selectRow(0);

          cf_InitInputForm();
          
          myTabbar.tabs("a1").setActive();
          if(!fadeRegs) {
              $('#saveForm').fadeOut(gv_FadeTime, function() {
                  cf_InitInputForm();

                  fn_titleSearch();
                  fadeRegs = true;
                  fadeMode = false;
              });
              $('#saveForm').fadeIn(gv_FadeTime, function() {});
          } else {
              cf_InitInputForm();

              fn_titleSearch();   
              fn_RateHide();
          }
          fn_RateHide();
          fn_IdPassRowHideinit();
    });

    $('#btnApproval').unbind('click').bind('click', function(rId) {
    	
    	var projectSn = gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text');
    	fn_ApprovalPopup(projectSn)
    });
    
    $('#btnPlanApp').unbind('click').bind('click', function(rId) {
    	
    	var jsonParameter = {
	    		projectSn : gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text')
	    };

	    var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtProjectPlanAcmsltCnt', jsonParameter, 'GET');
	    var data = dataSource.data;
	    
	    var hnfPlanCnt = data.hnfPlanCnt;
	    var bugtPlanCnt = data.bugtPlanCnt;
	    var outputCnt = data.outputCnt;
	    
	    if(hnfPlanCnt < 1) {
	    	gf_DivMsgAlert('인력계획을 1건이상 등록하세요.');
	    } else if(bugtPlanCnt < 1) {
	    	gf_DivMsgAlert('예산계획을 1건이상 등록하세요.');
	    } else if(outputCnt < 1) {
	    	gf_DivMsgAlert('산출물을 1건이상 등록하세요.');
	    } else {
	    	var projectSn = gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text');
        	fn_ApprovPopup(projectSn);
	    }	
    	
    	/*var jsonParameter = {
	    		projectSn : gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text')
	    };

	    var dataSource = gf_NoAsyncTransaction('pjtpmg001/findNewApprov', jsonParameter, 'GET');
	    var data = dataSource.data;
	    
	    var newApprvEmpno1 = data.newApprvEmpno1;
	    var newApprvDe1 = data.newApprvDe1;
	    var newApprvEmpno2 = data.newApprvEmpno2;
	    var newApprvDe2 = data.newApprvDe2;
	    
    	if($("#planApp").text() == "계획승인"){
    		if(!gf_IsNull(newApprvEmpno1) && gf_IsNull(newApprvDe1)&& !gf_IsNull(newApprvEmpno2)){
    	    	// 1번 업데이트
    			gf_DivMsgConfirm("계획승인 하시겠습니까?", 'fn_newApprovDe1Save()', '');
    	    } else if(!gf_IsNull(newApprvEmpno1) && gf_IsNull(newApprvDe1) && gf_IsNull(newApprvEmpno2)){
    	    	// 1번 업데이트 및 진행상태 변경
    	    	gf_DivMsgConfirm("계획승인 하시겠습니까?", 'fn_newApprovDe1SaveAt()', '');
    	    } else if(!gf_IsNull(newApprvDe1) && gf_IsNull(newApprvDe2)){
    	    	// 2번 업데이트 및 진행상태 변경!
    	    	gf_DivMsgConfirm("계획승인 하시겠습니까?", 'fn_newApprovDe2Save()', '');
    	    }
    	}else {*/	
    	//}
    });

    $('#btnFormRemove').unbind('click').bind('click', function() {
    	var rowId = dhxGridPjtProject.getSelectedRowId();
    	var projectNm = dhxGridPjtProject.cells(rowId, dhxGridPjtProject.getColIndexById("projectNm")).getValue();
    	if (gf_IsNull(projectNm)) {
    		dhxGridPjtProject.deleteRow(rowId);
    	} else {
    		 gf_DivMsgConfirm(gv_QueDelete, 'fn_RemoveOne()', '');
    	}
    });

    $('.tdl-1 #btnExcel').unbind('click').bind('click', function() {
        fn_ExcelDown();
    });

    $('#btnClose').unbind('click').bind('click', function() {
        gf_CloseParentActiveTab();
    });
    
    //거래처 찾기 
    $('#saveFormPjtProject #btnBcncSearch').unbind('click').bind('click', function(event){
    	gf_CustomerPopup("saveFormPjtProject","bcncCd","bcncNm", "01", "N","fn_CallbackComp");
    });


    $('#mailsend').unbind('click').bind('click', function() {
        var url = "pjtpmg001/sendProjectMail";
		var jsonParameter = {
            		email : 'hgkim@dbvision.co.kr'
            };
		var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
		console.log(dataSource);
	});
  
    $('#btnFormSave').unbind('click').bind('click', function() {
    	var rowId = dhxGridPjtProject.getSelectedRowId();
    	var comptAt = dhxGridPjtProject.cells(rowId, dhxGridPjtProject.getColIndexById("comptAt") ).getValue();
    	if (comptAt == '완료') {
        	gf_DivMsgAlert("완료된 프로젝트는 수정이 불가능 합니다.");
        	return false;
        }	
    	
    	var projectSn = gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text');

        if($('#saveFormPjtProject').validate().form()){

            var jsonParameter = {
            		projectSn : gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text'),
            		projectNm : gf_FormGetValue('saveFormPjtProject', 'projectNm', 'text'),
 	                projectCn : gf_FormGetValue('saveFormPjtProject', 'projectCn', 'textarea'),
 	                projectScope : gf_FormGetValue('saveFormPjtProject', 'projectScope', 'textarea'),
 	                projectEnvrn : gf_FormGetValue('saveFormPjtProject', 'projectEnvrn', 'textarea'),
 	                projectArea : gf_FormGetValue('saveFormPjtProject', 'searchProjectArea', 'combo'),
 	                projectPmEmpno : gf_FormGetValue('saveFormPjtProject', 'projectPmEmpno', 'text'),
 	                projectPmNm : gf_FormGetValue('saveFormPjtProject', 'projectPmNm', 'text'),
 	                bcncCode : gf_FormGetValue('saveFormPjtProject', 'bcncCd', 'text'),
 	                //bcncChargerCode : gf_FormGetValue('saveFormPjtProject', 'bcncChargerSn', 'text'),
 	                projectBeginDe : gf_FormGetValue('saveFormPjtProject', 'searchSprojDt', 'text').replaceAll('-',''),
 	                projectEndDe : gf_FormGetValue('saveFormPjtProject', 'searchEprojDt', 'text').replaceAll('-',''),
 	                realBeginDe : gf_FormGetValue('saveFormPjtProject', 'searchSrealDe', 'text').replaceAll('-',''),
 	                realEndDe : gf_FormGetValue('saveFormPjtProject', 'searchErealDe', 'text').replaceAll('-',''),
 	                cntrctAmt : gf_FormGetValue('saveFormPjtProject', 'cntrctAmt', 'text').replaceAll('\,',''),
 	                grtsMntnceMcnt : gf_FormGetValue('saveFormPjtProject', 'grtsMntnceMcnt', 'text'),
 	                grtsMntnceCn : gf_FormGetValue('saveFormPjtProject', 'grtsMntnceCn', 'text'),
 	                projectSe : gf_FormGetValue('saveFormPjtProject', 'searchProjectSe', 'combo'),
 	                comptAt :  gf_FormGetValue('saveFormPjtProject', 'comptAt', 'combo'),
 	                entrpsId : gf_FormGetValue('saveFormPjtProject', 'entrpsId', 'text'),
 	                entrpsPassword : gf_FormGetValue('saveFormPjtProject', 'entrpsPassword', 'text'),
 	                cntrctTy :  gf_FormGetValue('saveFormPjtProject', 'searchCntrctTy', 'combo'),
 	                registEmpno : gf_FormGetValue('saveFormPjtProject', 'empno', 'text'),
 	                bcncChargerNm : gf_FormGetValue('saveFormPjtProject', 'bcncChargerNm', 'text'),
 	                chargerCttpc : gf_FormGetValue('saveFormPjtProject', 'chargerCttpc', 'text'),
 	                projectUrl : gf_FormGetValue('saveFormPjtProject', 'projectUrl', 'text'),
 	                bcncChargerCode :"",
 	               
            };

            var url;

            if( !gf_IsNull(projectSn) ) {
                url = "pjtpmg001/modifyPjtProject";
            } else {
                url = "pjtpmg001/savePjtProject";
            }

            var dataSource = gf_NoAsyncTransaction(url, jsonParameter, 'POST');
            if(dataSource.code === '000') {

                if(!gf_IsNull(projectSn)) {
                    gf_DivMsgAlert(gv_MsgUpdate);
                } else {
                    gf_DivMsgAlert(gv_MsgRegist);
                    cf_InitInputForm();
                }

                fn_SearchGridList();

                fn_titleSearch();
            }
        }

        $('#saveFormPjtProject div.error').unbind("click").bind("click",function() {
            $(this).remove();
        });
    });

    $('#btnClear').unbind("click").bind("click",function() {
    	cf_InitInputSearch();
    });
	
	$('.input_calen').keypress(function(event){
		if(event.keyCode<48 || event.keyCode>57)
		return false;
	});
	
	$('#compNm').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchCompanyCode();
	    }
    });
	
	$('#divInputFormComboProjectSeCodeBox').unbind('change').bind('change', function() {
		fn_IdPassRowHideinit();
    });
	
	$('#divInputFormComboCntrctTyCodeBox').unbind('change').bind('change', function() {
		
		var selectValue = gf_FormGetValue('saveFormPjtProject', 'searchCntrctTy', 'combo');
		console.log('selectValue=['+selectValue+']');
		if(selectValue !== '400') {
    		$("#idpassw").css("display", "");
    	}
    	else if (gf_IsNull(selectValue) || selectValue == '400') {
    		$("#idpassw").css("display", "none");
    		$("#entrpsId").val("");
    		$("#entrpsPassword").val("");
    	}
    });
	
	$('#searchEprojDt').unbind('keydown').bind('keydown', function(event){
        if(event.keyCode == 9) { dhxCCalendarDate3.hide(); }
        if(event.keyCode == 13) { dhxCCalendarDate3.hide(); }
    });	
	$('#searchErealDe').unbind('keydown').bind('keydown', function(event){
        if(event.keyCode == 9) { dhxCCalendarDate4.hide(); }
        if(event.keyCode == 13) { dhxCCalendarDate4.hide(); }
    });	
	$('#searchSrealDe').unbind('focusin').bind('focusin', function(event){
		dhxCCalendarDate4.show();
    });	
	$('#searchSprojDt').unbind('focusin').bind('focusin', function(event){
		dhxCCalendarDate3.show();
    });	

	/*팝업 URL 복사*/
    $('#popupUrlCopy').unbind('click').bind('click', function() {
    	var hiddenUrl = gf_FormGetValue('saveFormPjtProject', 'popupUrlHidden', 'text');
    	gf_FormSetValue('saveFormPjtProject', 'popupUrl', hiddenUrl, 'text');
    	fn_UrlCopy();
    	gf_DivMsgAlert("URL이 클립보드에 복사되었습니다.");
    });
};

var cf_SetBinding = function (){
    fn_SearchGridList();
};

var cf_InitForm = function (){};

var cf_InitInputForm = function (){
	
	gf_FormSetValue("saveFormPjtProject", "searchCntrctTy", '', "combo");
	gf_FormSetValue("saveFormPjtProject", "searchProjectSe", '', "combo");
	gf_FormSetValue("saveFormPjtProject", "searchProjectArea", '', "combo");
	gf_FormSetValue('saveFormPjtProject', 'bcncCd', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'bcncNm', '', 'text');
	//gf_FormSetValue('saveFormPjtProject', 'bcncChargerCode', '', 'text');
	//gf_FormSetValue('saveFormPjtProject', 'bcncChargerSn', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'bcncChargerNm', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'chargerCttpc', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'projectSn', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'projectNm', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'searchSprojDt', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'searchEprojDt', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'searchSrealDe', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'searchErealDe', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'grtsMntnceMcnt', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'comptAt', '3', 'combo');
	gf_FormSetValue('saveFormPjtProject', 'projectPmEmpno', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'projectPmNm', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'entrpsId', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'entrpsPassword', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'cntrctAmt', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'projectCn', '', 'textarea');
	gf_FormSetValue('saveFormPjtProject', 'projectScope', '', 'textarea');
	gf_FormSetValue('saveFormPjtProject', 'projectEnvrn', '', 'textarea');
	gf_FormSetValue('saveFormPjtProject', 'grtsMntnceCn', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'hnfRate', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'bugtRate', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'outputRate', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'cntrctAmtVat', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'projectUrl', '', 'text');

	gf_FormSetValue('saveFormPjtProject', 'popupUrl', '', 'text');
	gf_FormSetValue('saveFormPjtProject', 'popupUrlHidden', '', 'text');
	
	$("#cntrctMonth").html("");
	$('#projectNmTit').html("");
    $('#chargerNmTit').html("");
    $('#saveFormPjtProject #comptAt').attr("disabled", true);
    var v_CurDate = new Date();
	v_CurDate.setDate(v_CurDate.getDate());
	var curDate = v_CurDate.format('YYYY-MM-DD');
	var curMonth = v_CurDate.getFullYear() + '-' + (v_CurDate.getMonth() + 7) + '-' + v_CurDate.getDate();
	
    dhxCCalendarDate3.leftCalendar.setDate(curDate);
    dhxCCalendarDate3.rightCalendar.setDate(curMonth);
    dhxCCalendarDate4.leftCalendar.setDate(curDate);
    dhxCCalendarDate4.rightCalendar.setDate(curMonth);
	
	 var dataSource = gf_NoAsyncTransaction('stmcmm001/findUser', '', 'GET');
	    var data = dataSource.data;
	    gf_FormSetValue('saveFormPjtProject', 'userNm', data.userNm, 'text');
	    gf_FormSetValue('saveFormPjtProject', 'empno', data.empno, 'text');
	    fn_RateHide();
};

var cf_InitInputSearch = function (){

	gf_FormSetValue('searchFormPjtProject', 'projectNm', '', 'text');
	gf_FormSetValue('searchFormPjtProject', 'compNm', '', 'text');
	gf_FormSetValue('searchFormPjtProject', 'searchSregDt', '', 'text');
	gf_FormSetValue('searchFormPjtProject', 'searchEregDt', '', 'text');
	gf_FormSetValue("searchFormPjtProject", "searchComboProjectSe", '', "combo");
	gf_FormSetValue("searchFormPjtProject", "comptAt", '0', "combo");
    
    //dhxComboProjectSe.unSelectOption();
    //dhxComboComptAt.unSelectOption();
};

var fn_SearchGridList = function (){

    var jsonParameter = {
        projectSe : gf_FormGetValue('searchFormPjtProject', 'searchComboProjectSe', 'combo'),
        projectNm : gf_FormGetValue('searchFormPjtProject', 'projectNm', 'text'),
        projectBeginDe : gf_FormGetValue('searchFormPjtProject', 'searchSregDt', 'text').replaceAll('-',''),
        projectEndDe : gf_FormGetValue('searchFormPjtProject', 'searchEregDt', 'text').replaceAll('-',''),
        compNm : gf_FormGetValue('searchFormPjtProject', 'compNm', 'text'),
        comptAt : gf_FormGetValue('searchFormPjtProject', 'comptAt', 'combo'),
    };

    gf_Transaction('gridList', 'pjtpmg001/searchPjtProject', jsonParameter, 'fn_CallbackSearchGridList', false, 'GET');
};

var fn_CallbackSearchGridList = function (strSvcID, targetID, data){
    dhxGridPjtProject.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridPjtProject.parse(data.data.records, 'js');
        dhxGridPjtProject.selectRow(0);
               
        fn_SearchInputPjtProject();
        
        var nowDate = gf_GetNowDate().format('YYYYMM');
        
        dhxGridPjtProject.forEachRow(function(id){
			if( dhxGridPjtProject.cells(id,dhxGridPjtProject.getColIndexById("comptAt")).getValue() =="진행" 
				&& parseInt(dhxGridPjtProject.cells(id,dhxGridPjtProject.getColIndexById("acmsltCnt")).getValue())  == 0
				&& dhxGridPjtProject.cells(id,dhxGridPjtProject.getColIndexById("projectBeginDe")).getValue().substr(0,6) < nowDate){ //실적등록이 없으면 
				dhxGridPjtProject.setCellTextStyle(id,2,"color:RED;");	
				dhxGridPjtProject.setCellTextStyle(id,3,"color:RED;");	
				
		    	if (dhxGridPjtProject.cells(id,dhxGridPjtProject.getColIndexById("projectPmEmpno")).getValue() ==  userEmpNo){
		    		gf_DivMsgAlert("인력실적이 등록되지 않았습니다.");
		    	}    
			} 
		}); 

        gf_NoFoundDataOnGridMsgRemove('dataList');  
    } else {
    	gf_NoFoundDataOnGridMsg('dataList');
    	cf_InitInputForm();
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();
    
    rowCnt = data.data.records.length;

};

var fn_SearchGridApprvList = function (){

    var jsonParameter = {
        empno : userEmpNo
    };

    gf_Transaction('gridList', 'pjtpmg001/searchPjtProjectApprv', jsonParameter, 'fn_CallbackSearchGridApprvList', false, 'GET');
};

var fn_CallbackSearchGridApprvList = function (strSvcID, targetID, data){
    dhxGridPjtProject.clearAll();
    if(!gf_IsNull(data.data.records)){
        dhxGridPjtProject.parse(data.data.records, 'js');
        dhxGridPjtProject.selectRow(0);
               
        fn_SearchInputPjtProject();
        
        var nowDate = gf_GetNowDate().format('YYYYMM');
        
        dhxGridPjtProject.forEachRow(function(id){
			if( dhxGridPjtProject.cells(id,dhxGridPjtProject.getColIndexById("comptAt")).getValue() =="진행" 
				&& parseInt(dhxGridPjtProject.cells(id,dhxGridPjtProject.getColIndexById("acmsltCnt")).getValue())  == 0
				&& dhxGridPjtProject.cells(id,dhxGridPjtProject.getColIndexById("projectBeginDe")).getValue().substr(0,6) < nowDate){ //실적등록이 없으면 
				dhxGridPjtProject.setCellTextStyle(id,2,"color:RED;");	
				dhxGridPjtProject.setCellTextStyle(id,3,"color:RED;");	
				
		    	if (dhxGridPjtProject.cells(id,dhxGridPjtProject.getColIndexById("projectPmEmpno")).getValue() ==  userEmpNo){
		    		gf_DivMsgAlert("인력실적이 등록되지 않았습니다.");
		    	}    
			} 
		}); 

        gf_NoFoundDataOnGridMsgRemove('dataList');  
    } else {
    	gf_NoFoundDataOnGridMsg('dataList');
    	cf_InitInputForm();
    }
    $("#spanCnt").text(data.data.records.length);
    cf_SetEventListener();

    rowCnt = data.data.records.length;
};

var fn_SavePjtProject = function (rId, cInd) {
    projectSn = '';
    var title = titPjtProject + ' ' + gv_TitRegist;

    if (rId > 0) {
    projectSn = '';
    projectSn = dhxGridPjtProject.cells(rId, dhxGridPjtProject.getColIndexById("projectSn")).getValue();
        title = titPjtProject  + ' ' + gv_TitUpdate;
        
   var actvId = myTabbar.getActiveTab();
   myTabbar.tabs("a1").setActive();
   //if(actvId=="a2") myTabbar.tabs("a2").attachURL("/xerp/pjtpmg001/searchPjtProject/view?projectSn="+projectSn);
  // if(actvId=="a3") myTabbar.tabs("a3").attachURL("/xerp/pjtpmg001/searchPjtBugtPlan/view?projectSn="+projectSn);
   //if(actvId=="a6") myTabbar.tabs("a6").attachURL("/xerp/pjtpmg001/searchPjtOutputs/view?projectSn="+projectSn);
        
    }
    if(!fadeMode) {
        $('#saveFormPjtProject').fadeOut(gv_FadeTime, function() {
            $("#h4_pr_title").text(title);
            fn_SearchInputPjtProject();
            fadeMode = true;
            fadeRegs = false;
        });
        $('#saveFormPjtProject').fadeIn(gv_FadeTime, function() {});
     } else {
        $("#h4_pr_title").text(title);
        fn_SearchInputPjtProject();
     }
};

var fn_CheckPjtProject = function (col){
    var resArr = [];
    var colIdx = gf_GetDhxGridColumId(dhxGridPjtProject, col);
    dhxGridPjtProject.forEachRow(function(rowId) {
        if(dhxGridPjtProject.cells(rowId,0).isChecked()){
            resArr.push( dhxGridPjtProject.cells(rowId,colIdx).getValue() );
        }
    });
    return resArr;
};

var fn_RemoveOne = function(){
		
	var projectSn = $('#saveFormPjtProject #projectSn').val();
	
	if (gf_IsNull($('#saveFormPjtProject #projectSn').val()) ) {
    	gf_DivMsgAlert("삭제하고자 하는 프로젝트를 선택하세요.");
    	return false;
    }	
	if ($('#saveFormPjtProject #comptAt').val() == '1') {
    	gf_DivMsgAlert("완료된 프로젝트는 삭제가 불가능합니다.");
    	return false;
    }	
	
	var jsonParameter = {
		        projectSn : projectSn
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/removePjtProject', jsonParameter, 'POST');
    if(dataSource.code === '000') {
        fn_SearchGridList();
    }

    $('#btnAdd').click();
 		
};


var fn_SearchInputPjtProject = function (){
	
	var rowId = dhxGridPjtProject.getSelectedRowId();

	var projectSn = dhxGridPjtProject.cells(rowId, dhxGridPjtProject.getColIndexById("projectSn") ).getValue();
	var comptAt = dhxGridPjtProject.cells(rowId, dhxGridPjtProject.getColIndexById("comptAt") ).getValue();
	var acmsltCnt = dhxGridPjtProject.cells(rowId, dhxGridPjtProject.getColIndexById("acmsltCnt") ).getValue();
	
    if( !gf_IsNull(projectSn) ) { 

        var jsonParameter = {
            projectSn : projectSn 
        };

        var dataSource = gf_NoAsyncTransaction('pjtpmg001/findPjtProject', jsonParameter, 'GET');
        var data = dataSource.data;
        
        console.log(data);
        
        gf_FormSetValue("saveFormPjtProject", "searchProjectSe", data.projectSe,  "combo");		
        gf_FormSetValue("saveFormPjtProject", "searchCntrctTy", data.cntrctTy,  "combo");	
        gf_FormSetValue("saveFormPjtProject", "searchProjectArea", data.projectArea,  "combo");	
        gf_FormSetValue('saveFormPjtProject', 'bcncCd', data.bcncCode, 'text');
        gf_FormSetValue('saveFormPjtProject', 'bcncNm', data.bcncNm, 'text');
        //gf_FormSetValue('saveFormPjtProject', 'bcncChargerSn', data.bcncChargerCode, 'text');
        gf_FormSetValue('saveFormPjtProject', 'bcncChargerNm', data.bcncChargerNm, 'text');
        gf_FormSetValue('saveFormPjtProject', 'chargerCttpc', data.chargerCttpc, 'text');
        gf_FormSetValue('saveFormPjtProject', 'projectSn', data.projectSn, 'text');
        gf_FormSetValue('saveFormPjtProject', 'projectNm', data.projectNm, 'text');
        gf_FormSetValue('saveFormPjtProject', 'searchSprojDt', data.projectBeginDe, 'text');
        gf_FormSetValue('saveFormPjtProject', 'searchEprojDt', data.projectEndDe, 'text');
        gf_FormSetValue('saveFormPjtProject', 'searchSrealDe', data.realBeginDe, 'text');
        gf_FormSetValue('saveFormPjtProject', 'searchErealDe', data.realEndDe, 'text');
        gf_FormSetValue('saveFormPjtProject', 'grtsMntnceMcnt', data.grtsMntnceMcnt, 'text');
        gf_FormSetValue("saveFormPjtProject", "comptAt", data.comptAt, "combo");
        gf_FormSetValue('saveFormPjtProject', 'empno', data.registEmpno, 'text');
        gf_FormSetValue('saveFormPjtProject', 'userNm', data.userNm, 'text');
        gf_FormSetValue('saveFormPjtProject', 'projectPmEmpno', data.projectPmEmpno, 'text');
        gf_FormSetValue('saveFormPjtProject', 'projectPmNm', data.projectPmNm, 'text');
        gf_FormSetValue('saveFormPjtProject', 'entrpsId', data.entrpsId, 'text');
        gf_FormSetValue('saveFormPjtProject', 'entrpsPassword', data.entrpsPassword, 'text');
        gf_FormSetValue('saveFormPjtProject', 'cntrctAmt', data.cntrctAmt, 'text');
        gf_FormSetValue('saveFormPjtProject', 'projectCn', data.projectCn, 'textarea');
        gf_FormSetValue('saveFormPjtProject', 'projectScope', data.projectScope, 'textarea');
        gf_FormSetValue('saveFormPjtProject', 'projectEnvrn', data.projectEnvrn, 'textarea');
        gf_FormSetValue('saveFormPjtProject', 'grtsMntnceCn', data.grtsMntnceCn, 'text');
        gf_FormSetValue('saveFormPjtProject', 'hnfRate', data.hnfRate, 'text');
        gf_FormSetValue('saveFormPjtProject', 'bugtRate', data.bugtRate, 'text');
        gf_FormSetValue('saveFormPjtProject', 'outputRate', data.outputRate, 'text');
        gf_FormSetValue('saveFormPjtProject', 'projectUrl', data.projectUrl, 'text');
        
        gf_FormSetValue('saveFormPjtProject', 'newApprvNm1', data.newApprvNm1, 'text');
        gf_FormSetValue('saveFormPjtProject', 'newApprvNm2', data.newApprvNm2, 'text');
        gf_FormSetValue('saveFormPjtProject', 'endApprvNm1', data.endApprvNm1, 'text');
        gf_FormSetValue('saveFormPjtProject', 'endApprvNm2', data.endApprvNm2, 'text');
        gf_FormSetValue('saveFormPjtProject', 'newApprvAt1', (( data.newApprvAt1  == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormPjtProject', 'newApprvAt2', (( data.newApprvAt2  == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormPjtProject', 'endApprvAt1', (( data.endApprvAt1  == '1') ? true : false), 'chkbox');
        gf_FormSetValue('saveFormPjtProject', 'endApprvAt2', (( data.endApprvAt2  == '1') ? true : false), 'chkbox');
        

    	gf_FormSetValue('saveFormPjtProject', 'popupUrl', '', 'text');
    	gf_FormSetValue('saveFormPjtProject', 'popupUrlHidden', data.popupUrl, 'text');
        
        $('#projectNmTit').html('<p>'+ data.projectNm + '</p>');
        $('#chargerNmTit').html('<p>'+ data.bcncChargerNm + ' ' + data.chargerCttpc + '</p>');
        

        $('#saveFormPjtProject input[name="projectSn"]').attr("disabled", true);


        if(data.comptAt =='1'){//완료된 프로젝트의 경우 
        	$("#saveFormPjtProject").find("input,select,textarea").attr("disabled", true); 
        } else {
        	$("#saveFormPjtProject").find("input,select,textarea").removeAttr("disabled");
        	$("#newApprvAt1").attr("disabled", true); 
            $("#newApprvAt2").attr("disabled", true); 
            $("#endApprvAt1").attr("disabled", true); 
            $("#endApprvAt2").attr("disabled", true); 
        }
        
        if(gf_IsNull(data.newApprvNm1)){
        	$("#approvNewDiv").hide();
        } else {
        	$("#approvNewDiv").show();
        }
        
        if(gf_IsNull(data.endApprvNm1)){
        	$("#approvEndDiv").hide();
        } else {
        	$("#approvEndDiv").show();
        }
        
        
		/*
    	if (comptAt=='진행' && parseInt(acmsltCnt) > 0 && gf_FormGetValue('saveFormPjtProject', 'projectPmEmpno', 'text') ==  userEmpNo){
    		gf_DivMsgAlert("인력실적이 등록되지 않았습니다.");
    	}
    	*/       
        
    }
    
    fn_titleSearch();

    dhxCCalendarDate3.leftCalendar.setDate(gf_FormGetValue('saveFormPjtProject', 'searchSprojDt', 'text'));
    dhxCCalendarDate3.rightCalendar.setDate(gf_FormGetValue('saveFormPjtProject', 'searchEprojDt', 'text'));
    dhxCCalendarDate4.leftCalendar.setDate(gf_FormGetValue('saveFormPjtProject', 'searchSrealDe', 'text'));
    dhxCCalendarDate4.rightCalendar.setDate(gf_FormGetValue('saveFormPjtProject', 'searchErealDe', 'text'));	
    fn_IdPassRowHideinit();
    fn_RateHide();
    fn_CntrctMonth();
    fn_Vat();
    fn_newApprovHide();
};



var fn_titleSearch = function(){
    
    var projectSn = $("#projectSn").val();
    
    if(gf_IsNull(projectSn)) {
    	$(".project_tit_div").css('visibility','hidden');
    	myTabbar.tabs("a2").disable();
    	myTabbar.tabs("a3").disable();
    	myTabbar.tabs("a4").disable();
    	myTabbar.tabs("a5").disable();
    	myTabbar.tabs("a6").disable();
    
    }
    else {
    	$(".project_tit_div").css('visibility','visible');
    	myTabbar.tabs("a2").enable();
    	myTabbar.tabs("a3").enable();
    	myTabbar.tabs("a4").enable();
    	myTabbar.tabs("a5").enable();
    	myTabbar.tabs("a6").enable();
    }  
};



var  fn_empty = function(value) {
	return value != "";
};

var $customerInfo = {};  //거래처 선택용 변수
var gf_CompanyPopup = function (formId, codeId, codeNmId, stmBizplcCode, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "거래처 조회";
	var customerInfo = "customerInfo";
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof stmBizplcCode == "undefined" || stmBizplcCode == null){
		stmBizplcCode = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='contractCompanyPopup']").size() <= 0) {
		$('body').append("<div id='contractCompanyPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' stmBizplcCode='" + stmBizplcCode + "' customerInfo='" + customerInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#contractCompanyPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'contractCompanyPopup';
			var ajaxUrl = gv_ContextPath+'/pop/comp/view';
			var left	= 0;
			var top		= 0;
			var width	= 980;
			var height	= 700;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#contractCompanyPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($customerInfo);
			}
			
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='contractCompanyPopup']").remove();

		}
	},function(){});
	return dhxWindowObj;
};



var fn_IdPassRowHideinit = function() {
	
		var selectValue1 = gf_FormGetValue('saveFormPjtProject', 'searchCntrctTy', 'combo');
		var selectValue = gf_FormGetValue('saveFormPjtProject', 'searchProjectSe', 'combo');
		console.log('selectValue=['+selectValue+']');
		console.log('selectValue1=['+selectValue1+']');
		if(selectValue == '300' || selectValue == '400' || gf_IsNull(selectValue)) {
    		$("#divInputFormComboCntrctTyCodeBox").hide();
    		$("#idpassw").css("display", "none");
    		$("#entrpsId").val("");
    		$("#entrpsPassword").val("");
    		selectValue1 = '';
    		gf_FormSetValue("saveFormPjtProject", "searchCntrctTy", '', "combo");
    	}

		if(selectValue == '200') {
    		$("#divInputFormComboCntrctTyCodeBox").show();
    	}

		if((selectValue1 != '400' && !gf_IsNull(selectValue1)) || selectValue == '100') {
    		$("#idpassw").css("display", "");
    	}
    	else if (gf_IsNull(selectValue1) || selectValue1 == '400' || selectValue1 == '') {
    		$("#idpassw").css("display", "none");
    		$("#entrpsId").val("");
    		$("#entrpsPassword").val("");
    	}
};

var fn_RateHide = function() {
	
	var projectSn = $("#projectSn").val();
	
	if(gf_IsNull(projectSn)) {
		$(".rate").css("display", "none");
		$(".rates").attr("colspan", "3");
		$("#approvDiv").css("display", "none");
	} else {
		$(".rate").css("display", "");
		$(".rates").attr("colspan", "");
		$("#approvDiv").css("display", "");
	}
};

var fn_newApprovHide = function(){
	
	if(gf_FormGetValue('saveFormPjtProject', 'comptAt', 'combo') == '3'){
    	$("#div_title").show();
    	$("#planApp").text("계획승인요청");
    } else{
    	$("#div_title").hide();
    }
	
	var jsonParameter = {
    		projectSn : gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text')
    };

    var dataSource = gf_NoAsyncTransaction('pjtpmg001/findNewApprov', jsonParameter, 'GET');
    var data = dataSource.data;
    
    var newApprvEmpno1 = data.newApprvEmpno1;
    var newApprvEmpno2 = data.newApprvEmpno2;
    var endApprvEmpno1 = data.endApprvEmpno1;
    var endApprvEmpno2 = data.endApprvEmpno2;
    
    if(gf_FormGetValue('saveFormPjtProject', 'comptAt', 'combo') == '4'){
    	if(userEmpNo == newApprvEmpno1 || userEmpNo == newApprvEmpno2){
    		$("#btnApproval").css("display", "");
    	} else {
    		$("#btnApproval").css("display", "none");
    	}
    } else if(gf_FormGetValue('saveFormPjtProject', 'comptAt', 'combo') == '6'){
    	if(userEmpNo == endApprvEmpno1 || userEmpNo == endApprvEmpno2){
    		$("#btnApproval").css("display", "");
    	} else {
    		$("#btnApproval").css("display", "none");
    	}
    } else {
    	$("#btnApproval").css("display", "none");
    }
	
};

/*var fn_newApprovDe1Save = function(){
	var jsonParameter = {
			projectSn : gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text'),
			newApprvDe1 : "1",
			comptAt : "4"
    };

    var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectNewApprovDe", jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchGridList();
        gf_DivMsgAlert("계획승인이 완료되었습니다.");
        //fn_newApprovHide();
   } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
   }   
};

var fn_newApprovDe1SaveAt = function(){
	var jsonParameter = {
			projectSn : gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text'),
			newApprvDe1 : "1",
			comptAt : "0"
    };

    var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectNewApprovDe", jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchGridList();
        gf_DivMsgAlert("계획승인이 완료되었습니다.");
        //fn_newApprovHide();
   } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
   }   
};

var fn_newApprovDe2Save = function(){
	var jsonParameter = {
			projectSn : gf_FormGetValue('saveFormPjtProject', 'projectSn', 'text'),
			newApprvDe2 : "2",
			comptAt : "0"
    };

    var dataSource = gf_NoAsyncTransaction("pjtpmg001/savePjtProjectNewApprovDe", jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	fn_SearchGridList();
        gf_DivMsgAlert("계획승인이 완료되었습니다.");
        //fn_newApprovHide();
   } else {
        gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
   }   
};*/

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
};

/**********************************************************거래처팝업**************************************************************/
var $customerInfo = {};  //거래처 선택용 변수
var gf_CustomerPopup = function (formId, codeId, codeNmId, bcncSe, searchFlag, strCallbackFunc) {

	var userId = ""; 
	var title  = "거래처 조회";
	var customerInfo = "customerInfo";
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

	if(typeof formId == "undefined" || formId == null){
		formId = "";
	}
	if(typeof codeId == "undefined" || codeId == null){
		codeId = "";
	}
	if(typeof codeNmId == "undefined" || codeNmId == null){
		codeNmId = "";
	}
	if(typeof bcncSe == "undefined" || bcncSe == null){
		bcncSe = "";
	}
	if(typeof searchFlag == "undefined" || searchFlag == null){
		searchFlag = "";
	}
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='contractCompanyPopup']").size() <= 0) {
		$('body').append("<div id='contractCompanyPopup' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "' bcncSe='" + bcncSe + "' customerInfo='" + customerInfo + "' searchFlag='" + searchFlag + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#contractCompanyPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'contractCompanyPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/searchPjtCustomer/view';
			var left	= 0;
			var top		= 0;
			var width	= 760;
			var height	= 730;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#contractCompanyPopup .b-close').click();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($customerInfo);
			}
			
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='contractCompanyPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

function fn_SearchCompanyCode(){
	var compNm = "";
	//var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
	//var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
	compNm = gf_FormGetValue('searchFormPjtProject', 'compNm', 'text');

	var jsonParameter = {
			bcncNm     : compNm
			//bplcCode  : stmBizplcCode
	};
	gf_Transaction("", 'pjtpmg001/searchPjtProjectBaseCustomerList', jsonParameter, 'fn_CallbackSearchCompanyCode', false, 'GET');
};

function fn_CallbackSearchCompanyCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	//alert(totCnt);
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormPjtProject', 'compNm', data.bcncNm, 'text');
 	}
  	else {
  		//var stmBizplcSelect = document.getElementById("searchComboStmBizplc");
		//var stmBizplcCode = stmBizplcSelect.options[stmBizplcSelect.selectedIndex].value;
  		gf_CustomerPopup("searchFormPjtProject","compCd","compNm", gBplcCode, "Y", null);
  	}
};

/**********************************************************계약기간 개월수**************************************************************/

var fn_CntrctMonth = function(dhxGrid, rId, cInd){
	
	var projectSn = $('#saveFormPjtProject #projectSn').val();
	
	 var sdd = document.getElementById("searchSprojDt").value;
	 var edd = document.getElementById("searchEprojDt").value;
	 var ar1 = sdd.split('-');
	 var ar2 = edd.split('-');
	 var da1 = new Date(ar1[0], ar1[1], ar1[2]);
	 var da2 = new Date(ar2[0], ar2[1], ar2[2]);
	 var dif = da2 - da1;
	 var cDay = 24 * 60 * 60 * 1000;
	 var cMonth = cDay * 30;
	 
	 var jsonParameter = {
	            projectSn : projectSn,
	            projectBeginDe : sdd,
	            projectEndDe : edd
	    };
		
		var dataSource = gf_NoAsyncTransaction('pjtpmg001/findJobDay', jsonParameter, 'GET');
	    var data = dataSource.data;
	    var jobDay = data.jobDe;

	 if(sdd && edd){
		 var month = Math.round(dif/cMonth);
		 	var html = month+" 개월";
		 	if(!gf_IsNull(jobDay)){
		 		html += " (" + jobDay + "일)"
		 	}
		 	$("#cntrctMonth").html(html)
	 }
};

var fn_Vat = function() {
	var cntrctAmtVat = document.getElementById("cntrctAmt").value;
	cntrctAmtVat = cntrctAmtVat.replaceAll(',','');
	cntrctAmtVat = cntrctAmtVat / 1.1;
	gf_FormSetValue('saveFormPjtProject', 'cntrctAmtVat', cntrctAmtVat, 'text');
	
};

var fn_CallbackComp = function(data) {
	 var tmp_nm =data.chargerNm +" "+data.chargerOfcps ;
	 if (!gf_IsNull(data.chargerNm)) {
		 gf_FormSetValue('saveFormPjtProject', 'bcncChargerNm', tmp_nm, 'text');
		 gf_FormSetValue('saveFormPjtProject', 'chargerCttpc', data.chargerTelno, 'text');
	 }
	 
	 //gf_FormSetValue('saveFormPjtProject', 'bcncChargerSn', data.bcncCode, 'text');
};	

// 계약승인요청팝업
var fn_ApprovPopup = function (projectSn) {

	var userId = ""; 
	var title  = "승인요청";
	var customerInfo = "customerInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if(typeof projectSn == "undefined" || projectSn == null){
		 projectSn = "";
    }
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='approvPopup']").size() <= 0) {
		$('body').append("<div id='approvPopup' projectSn='" + projectSn + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#approvPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'approvPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/pjtpmgApprovPopup/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 380;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#approvPopup .b-close').click();
				fn_SearchGridList();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($customerInfo);
			}
			
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='approvPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

//승인버튼 팝업
var fn_ApprovalPopup = function (projectSn) {

	var userId = ""; 
	var title  = "결재승인";
	var customerInfo = "customerInfo";
	var callbacks = $.Callbacks();
	var callFunction = null;
	
	if(typeof projectSn == "undefined" || projectSn == null){
		 projectSn = "";
    }
	
	//저장팝업\
	$customerInfo = {};
	var contractCompanyDhxWindows;
	var dhxWindowObj;
	if($('body').find("div[id='approvalPopup']").size() <= 0) {
		$('body').append("<div id='approvalPopup' projectSn='" + projectSn + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#approvalPopup').bPopup({
		onOpen:function(){
			
			contractCompanyDhxWindows = new dhtmlXWindows();
			
			var id 		= 'approvalPopup';
			var ajaxUrl = gv_ContextPath+'/pjtpmg001/popup/pjtpmgApprovalPopup/view';
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 380;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			//dhxWindowObj.attachObject('btnSearch', true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#approvalPopup .b-close').click();
				fn_SearchGridApprvList();
			});
		},
		onClose:function(){
			
			// call callback function
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire($customerInfo);
			}
			
			contractCompanyDhxWindows.unload();
			$('body').find("div[id='approvalPopup']").remove();
		}
	},function(){});
	return dhxWindowObj;
};

var fn_UrlCopy = function(){
	var copyText = document.getElementById("popupUrl");
	  copyText.select();
	  document.execCommand("Copy");
}
