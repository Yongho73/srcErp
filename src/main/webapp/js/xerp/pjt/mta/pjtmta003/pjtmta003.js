/**
 *    프로그램       : 프로젝트 월간보고 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.03.05
 *    사용테이블      : PJT_MNTNCE_REPORT
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pjtmta003Pjt = 0;  //프로젝트 그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Num_Pjtmta003Report = 0;  //보고년월 그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var dhxDataProcessorPjtmta003;  //DataProcessor 객체
var dhxGridPjtmta003Pjt;  //그리드 객체
var eventIdPjtmta003Pjt = [];  //그리드 이벤트 객체 
var dhxGridPjtmta003Report;  //그리드 객체
var eventIdPjtmta003Report = [];  //그리드 이벤트 객체 
var dhxGridPjtmta003;  //그리드 객체
var eventIdPjtmta003 = [];  //그리드 이벤트 객체 

var cntPjt=0;
var cntReport=0;
var flagPjt = '';
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPjtmta003();
    if(cf_SetComponentsPjtmta003()){
       cf_SetEventListenerPjtmta003();
       cf_InitFormPjtmta003();
       cf_SetBindingPjtmta003();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPjtmta003 = function() {
    gf_SetMenuPath();
    
    //기간달력 이벤트 추가
    $('#searchFormPjtmta003 #bgnRequstDe').unbind('click').bind('click', function(event){
        dhxCCalendarDate2.show();
    });
    $('#searchFormPjtmta003 #endRequstDe').unbind('click').bind('click', function(event){
        dhxCCalendarDate2.show();
    });
    
    dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");  
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        if(side == "right"){
            $('#bgnRequstDe').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
            $('#endRequstDe').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
            dhxCCalendarDate2.hide();
        }
    });
    //dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('searchFormPjtProject', 'date22', 'text'));
    dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
    dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko"); 
};

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="bgnRequstDe" || e.target.id =="endRequstDe") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

var cf_SetComponentsPjtmta003 = function() {
	//프로젝트 그리드
    var dhxGridPjtmta003PjtHeaderInfo = [];
    dhxGridPjtmta003PjtHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPjtmta003PjtHeaderInfo.push(gf_MakeDhxGridHeader('거래처', '150', 'left', 'str', 'ro', false, 'bcncNm', '', '')); /* gf_LocaleTrans('default', 'titProjectSn') */
    dhxGridPjtmta003PjtHeaderInfo.push(gf_MakeDhxGridHeader('프로젝트명', '*', 'left', 'str', 'ro', false, 'projectNm', '', '')); /* gf_LocaleTrans('default', 'titRequstSn') */
    dhxGridPjtmta003PjtHeaderInfo.push(gf_MakeDhxGridHeader('상태', '60', 'center', 'str', 'ro', false, 'comptAt', '', '')); /* gf_LocaleTrans('default', 'titRequstDt') */
    dhxGridPjtmta003PjtHeaderInfo.push(gf_MakeDhxGridHeader('프로젝트순번', '50', 'left', 'str', 'ro', true, 'projectSn', '', '')); /* gf_LocaleTrans('default', 'titRequstDt') */
    dhxGridPjtmta003Pjt = gf_MakeDhxGrid('dataListPjtmta003Pjt', dhxGridPjtmta003PjtHeaderInfo, true, false, false);
    
    dhxGridPjtmta003Pjt.setEditable(true);
	dhxGridPjtmta003Pjt.enableSmartRendering(false);
    

	dhxGridPjtmta003Pjt.enableAutoWidth(false);
	dhxGridPjtmta003Pjt.setColumnMinWidth(80,4); /* 크기, index값 : 앞에 컬럼 수넣음 */
	dhxGridPjtmta003Pjt.adjustColumnSize(0);	
 
	
	//월간보고 그리드
    var dhxGridPjtmta003ReportHeaderInfo = [];
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader('보고년월', '*', 'center', 'str', 'ro', false, 'reportYm', '', ''));
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader('기간시작일', '80', 'center', 'str', 'ro', false, 'reportStrDt', '', ''));
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader('기간종료일', '80', 'center', 'str', 'ro', false, 'reportEndDt', '', ''));
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader('작성자', '60', 'center', 'str', 'ro', false, 'empNm', '', ''));
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader('보고내용', '80', 'center', 'str', 'ro', false, 'makeBtn1', '', '')); /* gf_LocaleTrans('default', 'titRequstCn') */
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader('보고서출력', '80', 'center', 'str', 'ro', false, 'makeBtn2', '', ''));
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader('거래처', '100', 'center', 'str', 'ro', true, 'bcncCode', '', ''));
    dhxGridPjtmta003ReportHeaderInfo.push(gf_MakeDhxGridHeader('프로젝트명', '100', 'center', 'str', 'ro', true, 'projectSn', '', ''));
    dhxGridPjtmta003Report = gf_MakeDhxGrid('dataListPjtmta003Report', dhxGridPjtmta003ReportHeaderInfo, true, false, false);
    dhxGridPjtmta003Report.enableAutoWidth(true);
    dhxGridPjtmta003Report.setEditable(true);
	dhxGridPjtmta003Report.enableSmartRendering(false);
    dhxGridPjtmta003Report.setColumnMinWidth(80,1); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
	//유지보수 요청 그리드
	var dhxGridPjtmta003HeaderInfo = [];
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('출력여부<br/><input type="checkbox" id="checkAllPjtmta003" />', '60', 'center', 'str', 'ch', false, 'printChk', '', ''));
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('출력년월', '80', 'center', 'str', 'ro', false, 'printYm', '', '')); /* gf_LocaleTrans('default', 'titComptConfmAt') */
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('요청메뉴', '100', 'left', 'str', 'ro', false, 'requstMenu', '', ''));
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('요청내용', '*', 'left', 'str', 'ro', false, 'requstCn', '', '')); /* gf_LocaleTrans('default', 'titRequstCn') */
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('요청일자', '80', 'center', 'str', 'ro', false, 'requstDt', '', '')); /* gf_LocaleTrans('default', 'titRequstDt') */
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('완료일자', '80', 'center', 'str', 'ro', false, 'comptDe', '', '')); /* gf_LocaleTrans('default', 'titProjectSn') */
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('승인', '50', 'center', 'int', 'ro', false, 'comptConfmAt', '', '')); /* gf_LocaleTrans('default', 'titRequstSn') */
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('요청 순번', '100', 'right', 'int', 'ro', true, 'requstSn', '', '')); /* gf_LocaleTrans('default', 'titRequstSn') */
    dhxGridPjtmta003HeaderInfo.push(gf_MakeDhxGridHeader('프로젝트번호', '100', 'center', 'str', 'ro', true, 'projectSn', '', '')); /* gf_LocaleTrans('default', 'titComptConfmAt') */
    dhxGridPjtmta003 = gf_MakeDhxGrid('dataListPjtmta003', dhxGridPjtmta003HeaderInfo, true, false, false);
    dhxGridPjtmta003.enableAutoWidth(true);
    dhxGridPjtmta003.setEditable(true);
	dhxGridPjtmta003.enableSmartRendering(false);
    dhxGridPjtmta003.setColumnMinWidth(250,4); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    
	return true; 
};

var cf_SetEventListenerPjtmta003 = function() {
    // 그리드 이벤트 ==========================================================================================
	//프로젝트 그리드
	var eventIdPjt;
	eventIdPjt = dhxGridPjtmta003Pjt.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
		save_Row_Num_Pjtmta003Pjt = dhxGridPjtmta003Pjt.getSelectedRowId();
		if(id!=flagPjt){
			fn_SearchPjtmta003Report();
		}
		return true;
    });
    eventIdPjtmta003Pjt.push(eventIdPjt);
	eventIdPjt = dhxGridPjtmta003Pjt.attachEvent("onRowDblClicked", function(rId,cInd){
    	var projectSn = '';
    	var check = "false";
    	if(!gf_IsNull(rId)){
        	projectSn = gf_DhxGetValue(dhxGridPjtmta003Pjt, rId, 'projectSn', 'grid');
    	}
    	var param = "projectSn="+projectSn+"&check="+check;
    	fn_MtaRequstPopup('form1','','', param);
	    return true;
	});
    eventIdPjtmta003Pjt.push(eventIdPjt);
	
	//월간보고 그리드
    var eventIdReport;
//    eventIdPjtmta003Report = gf_GridDetachEvent(dhxGridPjtmta003Report, eventIdPjtmta003Report);
    eventIdReport = dhxGridPjtmta003Report.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
		if(ind == 5){	//수정 버튼 클릭시
			var projectSn = gf_DhxGetValue(dhxGridPjtmta003Report, id, 'projectSn', 'grid');
			var reportYm = gf_DhxGetValue(dhxGridPjtmta003Report, id, 'reportYm', 'grid');
			var check = "true";
			var param = "projectSn="+projectSn+"&reportYm="+reportYm+"&check="+check;
			fn_MtaRequstPopup('form1','','', param);
		} else if(ind == 6){	//출력버튼 클릭시
			fn_ReportPrint();
		} else{
			save_Row_Num_Pjtmta003Report = id;
        	fn_SearchPjtmta003();
		}
		return true;
    });
    eventIdPjtmta003Report.push(eventIdReport);

	//유지보수 요청 그리드
	var eventIdSub;
    eventIdPjtmta003 = gf_GridDetachEvent(dhxGridPjtmta003, eventIdPjtmta003);
    eventIdSub = dhxGridPjtmta003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pjtmta003SortGridList(ind, type, direction); 
    });
    eventIdPjtmta003Report.push(eventIdSub);
    eventIdSub = dhxGridPjtmta003.attachEvent("onEditCell", function(stage, rId, cInd){
		rowIdPjt = dhxGridPjtmta003Report.getSelectedRowId();
		if(gf_IsNull(rowIdPjt)){
			return false;
		}
		var reportYm = gf_DhxGetValue(dhxGridPjtmta003Report, rowIdPjt, 'reportYm', 'grid');
		
    	if(gf_DhxGetValue(dhxGridPjtmta003, rId, 'printChk', 'grid') == '1'){
        	gf_DhxSetValue(dhxGridPjtmta003, rId, 'printYm', reportYm, 'grid');
        }
		if(gf_DhxGetValue(dhxGridPjtmta003, rId, 'printChk', 'grid') == '0'){
        	gf_DhxSetValue(dhxGridPjtmta003, rId, 'printYm', '', 'grid');
        }
        return true;
    });
    eventIdPjtmta003Report.push(eventIdSub);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPjtmta003').unbind('click').bind('click', function(event){
    	var rowIdPjt = dhxGridPjtmta003Pjt.getSelectedRowId();
    	var projectSn = '';
    	var check = "false";
    	if(!gf_IsNull(rowIdPjt)){
        	projectSn = gf_DhxGetValue(dhxGridPjtmta003Pjt, rowIdPjt, 'projectSn', 'grid');
    	}
    	var param = "projectSn="+projectSn+"&check="+check;
    	fn_MtaRequstPopup('form1','','', param);
    });
    $('#btnSearchPjtmta003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
		fn_SearchPjtmta003Pjt();
    });
    $('#btnResetPjtmta003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
		save_Row_Num_Pjtmta003Pjt = 0;
		save_Row_Num_Pjtmta003Report = 0;
        cf_InitFormPjtmta003();
    });
    $('#btnSavePrintRequest').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePjtmta003();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPjtmta003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPjtmta003').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormPjtmta003Pjt") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    
    $('#btnCompNmSearch').unbind('click').bind('click', function(event){
//    	gf_CustomerPopup("searchFormPjtmta003","compCd","compNm", '1000', "Y", fn_CallbackCustomer);
		fn_ProjectList('formPop1','','', '',fn_CallbackProject);
    });
	$('#checkAllPjtmta003').unbind('click').bind('click',function() {
        gf_errorMsgClear();
		var chk = '';
		
		rowIdPjt = dhxGridPjtmta003Report.getSelectedRowId();
		if(gf_IsNull(rowIdPjt)){
			return false;
		}
		var reportYm = gf_DhxGetValue(dhxGridPjtmta003Report, rowIdPjt, 'reportYm', 'grid');
		
		if($('input:checkbox[id="checkAllPjtmta003"]').is(":checked") == true){
			$("input:checkbox[id='checkAllPjtmta003']").prop("checked", true);
			dhxGridPjtmta003.forEachRow(function(rowId) {
				var printYm = gf_DhxGetValue(dhxGridPjtmta003, rowId, 'printYm', 'grid');
				if(gf_IsNull(printYm)||reportYm==printYm){
					gf_DhxSetValue(dhxGridPjtmta003, rowId, 'printChk', 1, 'grid');
					gf_DhxSetValue(dhxGridPjtmta003, rowId, 'printYm', reportYm, 'grid');
					dhxDataProcessorPjtmta003.setUpdated(rowId, true, 'updated');
				}
			});
		} else {
			dhxGridPjtmta003.forEachRow(function(rowId) {
			$("input:checkbox[id='checkAllPjtmta003']").prop("checked", false);
				var printYm = gf_DhxGetValue(dhxGridPjtmta003, rowId, 'printYm', 'grid');
				if(gf_IsNull(printYm)||reportYm==printYm){
					gf_DhxSetValue(dhxGridPjtmta003, rowId, 'printChk', 0, 'grid');
					gf_DhxSetValue(dhxGridPjtmta003, rowId, 'printYm', '', 'grid');
					dhxDataProcessorPjtmta003.setUpdated(rowId, true, 'updated');
				}
			});
		}
    });
};

var cf_InitFormPjtmta003 = function() {
    $('#searchFormPjtmta003').resetForm();
	$('#projectSn').val('');
    $('#projectNm').focus();
};

var cf_SetBindingPjtmta003 = function() {
	fn_SearchPjtmta003Pjt();
//    gf_NoFoundDataOnGridMsg('dataListPjtmta003Pjt');
//	$("#spanCntSearchFormPjtmta003Pjt").text(0);
//	cf_SetEventListenerPjtmta003();
//	dhxGridPjtmta003.clearAll();
//   	gf_NoFoundDataOnGridMsg('dataListPjtmta003');
//    $("#spanCntSearchFormPjtmta003").text(0);
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 조회
 */
//유지보수 프로젝트 조회
var fn_SearchPjtmta003Pjt = function(userId){
    var jsonParameter = {
    		bcncNm : gf_FormGetValue('searchFormPjtmta003', 'compNm', 'text'),
    		comptAt : gf_FormGetValue('searchFormPjtmta003', 'comptAt', 'combo'),
			projectNm : gf_FormGetValue('searchFormPjtmta003', 'projectNm', 'text'),
    };
    gf_Transaction(userId, 'pjtmta003/searchPjtmta003Project', jsonParameter, 'fn_CallbackSearchPjtmta003Pjt', false, 'GET');
}
var fn_CallbackSearchPjtmta003Pjt = function(strSvcID, targetID, data) {
	dhxGridPjtmta003Pjt.clearAll();
    //if(cf_SetComponentsPjtmta003()){ 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListPjtmta003Pjt');
            dhxGridPjtmta003Pjt.parse(data.data.records, 'js');

			if(save_Row_Num_Pjtmta003Pjt == 0){  //0번이고, 신규/삭제 없음 = 최초 
		        dhxGridPjtmta003Pjt.selectRow(0); 
		    } else if(data.data.records>save_Row_Num_Pjtmta003Pjt-1){  //선택된 로우보다 검색된 로우가 많을때
		        dhxGridPjtmta003Pjt.selectRow(0);
		    } else {	//그외
				dhxGridPjtmta003Pjt.selectRow(save_Row_Num_Pjtmta003Pjt-1);
			}
        } else {
			save_Row_Num_Pjtmta003Pjt=0;
            gf_NoFoundDataOnGridMsg('dataListPjtmta003Pjt');
        }
        $("#spanCntSearchFormPjtmta003Pjt").text(data.data.records.length);
        cf_SetEventListenerPjtmta003();
        if(data.data.records.length > 0) {	//유지보수 프로젝트가 있을경우
        	fn_SearchPjtmta003Report();
        } else {	//없을경우 그리드 모두 초기화, 데이터 없음 표시
        	dhxGridPjtmta003Pjt.clearAll();
        	dhxGridPjtmta003Report.clearAll();
        	dhxGridPjtmta003.clearAll();
        	gf_NoFoundDataOnGridMsg('dataListPjtmta003Pjt');
        	gf_NoFoundDataOnGridMsg('dataListPjtmta003Report');
        	gf_NoFoundDataOnGridMsg('dataListPjtmta003');
	        $("#spanCntSearchFormPjtmta003Report").text('0');
	        $("#spanCntSearchFormPjtmta003").text('0');
        }
        
    //} 
};

//월간보고 데이터 조회
var fn_SearchPjtmta003Report = function(userId) {
	var rowIdPjt = dhxGridPjtmta003Pjt.getSelectedRowId();
	if(!gf_IsNull(rowIdPjt)){
    var projectSn = gf_DhxGetValue(dhxGridPjtmta003Pjt, rowIdPjt, 'projectSn', 'grid');
	if(gf_IsNull(projectSn)){
		return false;
	} else {
		var jsonParameter = {
    		projectSn : projectSn
	    };
	    gf_Transaction(userId, 'pjtmta003/searchPjtmta003', jsonParameter, 'fn_CallbackSearchPjtmta003Report', false, 'GET');
	}
	}
	flagPjt = rowIdPjt;
};

var fn_CallbackSearchPjtmta003Report = function(strSvcID, targetID, data) {
	dhxGridPjtmta003Report.clearAll();
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListPjtmta003Report');
        dhxGridPjtmta003Report.parse(data.data.records, 'js');
        dhxGridPjtmta003Report.selectRow(0);
    } else {
        gf_NoFoundDataOnGridMsg('dataListPjtmta003Report');
    }
    $("#spanCntSearchFormPjtmta003Report").text(data.data.records.length);
    cf_SetEventListenerPjtmta003();
    if(data.data.records.length > 0) {
	
		if(save_Row_Num_Pjtmta003Report == 0){  //0번이고, 신규/삭제 없음 = 최초 
	        dhxGridPjtmta003Report.selectRow(0); 
	    } else if(data.data.records>save_Row_Num_Pjtmta003Report-1){  //선택된 로우보다 검색된 로우가 많을때
	        dhxGridPjtmta003Report.selectRow(0);
	    } else {	//그외
			save_Row_Num_Pjtmta003Report = 0;
			dhxGridPjtmta003Pjt.selectRow(save_Row_Num_Pjtmta003Report-1);
		}

    	fn_SearchPjtmta003();
    } else {
     	dhxGridPjtmta003Report.clearAll();
        dhxGridPjtmta003.clearAll();
       	gf_NoFoundDataOnGridMsg('dataListPjtmta003Report');
        gf_NoFoundDataOnGridMsg('dataListPjtmta003');
        $("#spanCntSearchFormPjtmta003Report").text(0);
        $("#spanCntSearchFormPjtmta003").text(0);
    }
};

var fn_SearchPjtmta003 = function(userId) {
	var rowId = ''
	rowId = dhxGridPjtmta003Report.getSelectedRowId();
	if(!gf_IsNull(rowId)){
		var projectSn = gf_DhxGetValue(dhxGridPjtmta003Report, rowId, 'projectSn', 'grid');
		var reportYm = gf_DhxGetValue(dhxGridPjtmta003Report, rowId, 'reportYm', 'grid').replaceAll("-","");
		var reportStrDt = gf_DhxGetValue(dhxGridPjtmta003Report, rowId, 'reportStrDt', 'grid').replaceAll("-","");
		var reportEndDt = gf_DhxGetValue(dhxGridPjtmta003Report, rowId, 'reportEndDt', 'grid').replaceAll("-","");
		var bgnRequstDe = gf_FormGetValue('searchFormPjtmta003', 'bgnRequstDe', 'text').replaceAll("-","");
		var endRequstDe = gf_FormGetValue('searchFormPjtmta003', 'endRequstDe', 'text').replaceAll("-","");
		
	    var jsonParameter = {
	        projectSn : projectSn,
			reportStrDt : gf_IsNull(reportStrDt)?reportYm+'01':reportStrDt,
			reportEndDt : gf_IsNull(reportEndDt)?reportYm+'31':reportEndDt,
			bgnRequstDe : bgnRequstDe,
			endRequstDe : endRequstDe,
			comptConfmAt : gf_FormGetValue('searchFormPjtmta003', 'comptConfmAt', 'combo'),
			requstCn : gf_FormGetValue('searchFormPjtmta003', 'requstCn', 'text'),
	    };
	    gf_Transaction(userId, 'pjtmta003/searchPjtmta003Request', jsonParameter, 'fn_CallbackSearchPjtmta003', false, 'GET');
	}
};

var fn_CallbackSearchPjtmta003 = function(strSvcID, targetID, data) {
    dhxGridPjtmta003.clearAll();
        fn_DhxDataProcessorPjtmta003(); 
        if(!gf_IsNull(data.data.records)){
	        gf_NoFoundDataOnGridMsgRemove('dataListPjtmta003');
	        dhxGridPjtmta003.parse(data.data.records, 'js');
	        dhxGridPjtmta003.selectRow(0);

			rowIdPjt = dhxGridPjtmta003Report.getSelectedRowId();
			var reportYm = gf_DhxGetValue(dhxGridPjtmta003Report, rowIdPjt, 'reportYm', 'grid');
			dhxGridPjtmta003.forEachRow(function(rowId) {
				var printYm = gf_DhxGetValue(dhxGridPjtmta003, rowId, 'printYm', 'grid');
				if(!gf_IsNull(printYm)&&reportYm!=printYm){
					gf_DhxSetValue(dhxGridPjtmta003, rowId, 'printChk', 0, 'grid');
					dhxGridPjtmta003.cellById (rowId, 1).setDisabled(true);
				}
			});
			
        } else {
            gf_NoFoundDataOnGridMsg('dataListPjtmta003');
        }
        $("#spanCntSearchFormPjtmta003").text(data.data.records.length);
};

var fn_DhxDataProcessorPjtmta003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPjtmta003 = new dataProcessor(gv_ContextPath+'/pjtmta003/savePjtmta003'); //lock feed url
    dhxDataProcessorPjtmta003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPjtmta003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPjtmta003.init(dhxGridPjtmta003); //link dataprocessor to the grid
    dhxDataProcessorPjtmta003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPjtmta003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPjtmta003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPjtmta003();
                    $("#checkAllPjtmta003").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pjtmta003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPjtmta003, 'num') && ind != gf_GetDhxGridColumId(dhxGridPjtmta003, 'printChk')){ 
        var sortOrder = gf_FormGetValue('searchFormPjtmta003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPjtmta003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPjtmta003, ind);

        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPjtmta003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPjtmta003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPjtmta003', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtmta003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPjtmta003.setSortImgState(false); 
            gf_FormSetValue('searchFormPjtmta003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPjtmta003', 'sortColumId', '', 'text'); 
            dhxGridPjtmta003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPjtmta003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPjtmta003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPjtmta003', 'sortColumId', gf_GetDhxGridColum(dhxGridPjtmta003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePjtmta003 = function() {
    var edCnt = 0;
	var gridCnt = 0;
	
    dhxGridPjtmta003.forEachRow(function(rowId) {
		if(gf_DhxGetValue(dhxGridPjtmta003, rowId, 'printChk', 'grid') == '1'){
			dhxDataProcessorPjtmta003.setUpdated(rowId, true, 'updated');
			edCnt++;
		}
    });
    
	confirmMsg = "선택된 출력 내역이 " + edCnt +"개 입니다.<br>저장하시겠습니까?";
    if(confirmModalPjtmta003(confirmMsg)){  //여기는 안옴 
    } else { 
        return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
    } 
}
var confirmModalPjtmta003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePjtmta003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePjtmta003_Send = function() {
        dhxDataProcessorPjtmta003.sendData();
}

//월간보고 작성 팝업 
var fn_MtaRequstPopup = function (formId, codeId, codeNmId, param) {
    var userId = ""; 
    var title  = "유지보수 월간보고";
    
    //저장팝업
    var dhxWindowObj;
    var dhxWindowsOpert;
    if($('body').find("div[id='bpopupOpert']").size() <= 0) {
        $('body').append("<div id='bpopupOpert' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
    }
    $('#bpopupOpert').bPopup({
        onOpen:function(){
            
        	dhxWindowsOpert = new dhtmlXWindows();
            var id      = 'bpopupOpert';
            var ajaxUrl = gv_ContextPath+'/pjtmta003/popup/findPjtMtaReport/view?'+param;
            var left    = 0;
            var top     = 0;
            var width   = 750;
            var height  = 550;
            
            dhxWindowObj = dhxWindowsOpert.createWindow(id, left, top, width, height);
            dhxWindowsOpert.window(id).centerOnScreen();
            dhxWindowObj.setText(title);
            dhxWindowObj.attachURL(ajaxUrl, true, true);
            dhxWindowObj.detachObject(true);
            dhxWindowObj.attachEvent("onClose", function(win){
				$('#bpopupOpert .b-close').click();
				save_Row_Num_Pjtmta003Report = 0;
                fn_SearchPjtmta003Report();
            });
        },
        onClose:function(){
			dhxWindowsOpert.unload();
			$('body').find("div[id='bpopupOpert']").remove();          
        }
    },function(){});
    return dhxWindowObj;
};

//프로젝트 리스트 팝업
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
			var ajaxUrl = gv_ContextPath+'/pjtmta001/popup/pjtmta001ProjectListPopup/view?'+param;
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
	
var fn_CallbackProject = function(data) {
	if(!gf_IsNull(data.projectNm)){
		gf_FormSetValue('searchFormPjtmta003', 'compNm', data.bcncNm, 'text');
		gf_FormSetValue('searchFormPjtmta003', 'projectNm', data.projectNm, 'text');
	}
};

//거래처 조회
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
			var height	= 630;

			dhxWindowObj = contractCompanyDhxWindows.createWindow(id, left, top, width, height);
			contractCompanyDhxWindows.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
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
	
var fn_CallbackCustomer = function(data) {
	if(!gf_IsNull(data.bcncNm)){
		gf_FormSetValue('searchFormPjtmta003', 'projectNm', '', 'text');
		gf_FormSetValue('searchFormPjtmta003', 'compNm', data.bcncNm, 'text');
	}
};


/*pdf 다운로드 콜백*/
var fn_CallbackPdfDownload = function(strSvcID, targetID, data) {
	if(data.code == '000'){
		location.href= gv_ServerApiUrl+'/file/down?atchFileId='+data.data.atchFileId;
	}
};

var fn_DivMsgConfirm2 = function(message, callback){
	
	if($('body').find("div[id='message']").size() <= 0) {
		$('body').append('<div id="message"></div>');
	}
	
	var str ="<div id='wrap_notice' style='width:300px;'>"
		   + "<div id='header_notice'>"
		   + "<h2 class='ac'>알 림</h2>"
		   + "</div>"
		   + "<hr>"
		   + "<div id='content_notice'>"
		   + "<p class='ac'>" + message + "</p>"
		   + "<p class='ac mt10'><button class='btn_confirm' id='btnYesConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackTrue== 'string' ? callBackTrue : '' ) +"'><span class='glyphicon glyphicon-ok'></span>&nbsp;확인</button>&nbsp;&nbsp;"
		   + "<button class='btn_confirm' id='btnNoConfirm' onclick='gf_DivMsgAlertClose(); "+(typeof callBackFalse== 'string' ? callBackFalse : '' ) +"'><span class='glyphicon glyphicon-ban-circle'></span>&nbsp;취소</button></p>"
		   + "</div>"
		   + "</div>";
	$("#message").html(str);
	$("#content_notice .btn_cancel").focus();
	
	if(typeof callback == 'function') {
		$("#btnYesConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			gf_DivMsgAlertClose();
			callback(true);
	    });

		$("#btnNoConfirm").attr('onclick', '').unbind('click').bind('click', function(event){
			gf_DivMsgAlertClose();
			callback(false);
	    });
	}	
};

var fn_ReportPrint = function(){
	gf_DivMsgAlert("월간보고서를 다운로드합니다.");
	rowIdPjt = dhxGridPjtmta003Report.getSelectedRowId();
	var projectSn = gf_DhxGetValue(dhxGridPjtmta003Report, rowIdPjt, 'projectSn', 'grid');
	var reportYm = gf_DhxGetValue(dhxGridPjtmta003Report, rowIdPjt, 'reportYm', 'grid');
	
	var jsonParameter = {
	        projectSn : projectSn,
	        reportYm : reportYm
	};
	gf_Transaction('', 'pjtmta003/pdfPjtMtaOpert', jsonParameter, 'fn_CallbackPdfDownload', false, 'GET');
}