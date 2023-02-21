/**
 *    프로그램       : 국내출장신청 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.06.29
 *    사용테이블      : MHS_BSRP
 * sourceGen version : 2020.06.29.01 (2020.06.29)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubwks016 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwks016 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwks016 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwks016 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwks016 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwks016 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwks016 = 0;  //그리드 삭제 수량 
var searchBsrpCalender; //출장일자 검색 달력
var searchReqstCalender; //신청일자 검색 달력
var userEmpno ;
var userKornm ;
var userDeptCode;
var userDeptNm;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamPubwks016();
    cf_SetComponentsPubwks016();
    cf_SetEventListenerPubwks016();
    cf_InitFormPubwks016();
    cf_SetBindingPubwks016();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwks016 = function() {
    gf_SetMenuPath();
    $("#saveFormPubwks016").validate({ errorElement: 'div', ignore: '' });
    fn_Calender();
    
    gf_ComboCode('divComboSearchElctsctSttus', 'elctsctSttusSe', 'elctsctSttusSe', 'search', 'EA004', '' , '', '', 'ordr', '','',''); //전자결재상태
};

var dhxGridPubwks016;
var cf_SetComponentsPubwks016 = function() {
    var dhxGridPubwks016HeaderInfo = [];
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('복사 체크', '40', 'center', 'str', 'ro', true, 'copyFlag', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장번호', '100', 'center', 'str', 'ro', false, 'bsrpNo', '', '')); /* gf_LocaleTrans('default', 'titBsrpNo') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('순번', '40', 'center', 'str', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '100', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('사업장', '100', 'center', 'str', 'ro', true, 'bplcCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장명', '*', 'left', 'str', 'ro', false, 'bsrpNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장목적', '100', 'left', 'str', 'ro', true, 'bsrpPurps', '', '')); /* gf_LocaleTrans('default', 'titBsrpPurps') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장구분코드', '100', 'center', 'str', 'ro', true, 'bsrpSeCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장구분', '100', 'center', 'str', 'ro', false, 'bsrpSeNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장자', '100', 'center', 'str', 'ro', false, 'bsrpEmpnm', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장인원수', '100', 'center', 'str', 'ro', true, 'bsrpEmpCnt', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('교통구분코드', '100', 'center', 'str', 'ro', true, 'trnsportSeCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('교통구분', '100', 'center', 'str', 'ro', false, 'trnsportSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장지', '100', 'center', 'str', 'ro', false, 'bsrpCity', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('신청사원', '100', 'center', 'str', 'ro', false, 'reqstEmpNm', '', '')); /* gf_LocaleTrans('default', 'titReqstEmpno') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('신청사원번호', '100', 'center', 'str', 'ro', true, 'reqstEmpno', '', '')); /* gf_LocaleTrans('default', 'titReqstEmpno') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('직무대행사원번호', '100', 'center', 'str', 'ro', true, 'dtyVrscEmpno', '', '')); /* gf_LocaleTrans('default', 'titDtyVrscEmpno') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장시작일자', '100', 'center', 'str', 'ro', false, 'bsrpSdt', '', '')); /* gf_LocaleTrans('default', 'titBsrpSdt') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장종료일자', '100', 'center', 'str', 'ro', false, 'bsrpEdt', '', '')); /* gf_LocaleTrans('default', 'titBsrpEdt') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('숙박', '100', 'right', 'int', 'ro', true, 'stayng', '', '')); /* gf_LocaleTrans('default', 'titStayng') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('출장일수', '100', 'center', 'int', 'ro', false, 'stayngDaycnt', '', '')); /* gf_LocaleTrans('default', 'titStayngDaycnt') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('예산코드', '100', 'center', 'str', 'ro', true, 'bugtCode', '', '')); /* gf_LocaleTrans('default', 'titBugtCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('전자문서번호', '100', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('전자결재상태코드', '100', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '100', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks016HeaderInfo.push(gf_MakeDhxGridHeader('전자결재사원번호', '100', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwks016 = gf_MakeDhxGrid('dataListPubwks016', dhxGridPubwks016HeaderInfo, true, false, false);
    dhxGridPubwks016.enableAutoWidth(false);
    dhxGridPubwks016.setEditable(false);

    dhxGridPubwks016.setColumnMinWidth(100,7); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
};

var eventIdPubwks016 = [];
var cf_SetEventListenerPubwks016 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubwks016 = gf_GridDetachEvent(dhxGridPubwks016, eventIdPubwks016);
    eventId = dhxGridPubwks016.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubwks016();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubwks016.getColumnsNum();
            var rowNum = dhxGridPubwks016.getRowsNum();
            var selectedId = dhxGridPubwks016.getSelectedRowId();
            var ind        = dhxGridPubwks016.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks016.getRowIndex(selectedId);
            var type       = dhxGridPubwks016.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubwks016.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubwks016.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubwks016.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks016.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubwks016.getSelectedRowId();
            var ind        = dhxGridPubwks016.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks016.getRowIndex(selectedId);
            var type       = dhxGridPubwks016.getColType(ind);
            dhxGridPubwks016.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks016.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubwks016.getSelectedRowId();
            var ind        = dhxGridPubwks016.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks016.getRowIndex(selectedId);
            var type       = dhxGridPubwks016.getColType(ind);
            dhxGridPubwks016.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks016.editCell();
            }
        }
        else return true;
    });
    eventIdPubwks016.push(eventId);
    eventId = dhxGridPubwks016.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubwks016SortGridList(ind, type, direction); 
    });
    eventIdPubwks016.push(eventId);
    eventId = dhxGridPubwks016.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubwks016.push(eventId);
    eventId = dhxGridPubwks016.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdPubwks016.push(eventId);
    eventId = dhxGridPubwks016.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPubwks016.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwks016').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_PopupDtlPubwks016();
    });
    $('#btnSavePubwks016').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubwks016();
    });
    $('#btnRemovePubwks016').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubwks016();
    });
    $('#btnExcelPubwks016').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwks016();
    });
    $('#btnSearchPubwks016').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubwks016('');
    });
    $('#btnResetPubwks016').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwks016();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPubwks016 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPubwks016').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks016').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 달력 이벤트  ============================================================================================
    //검색 출장일자
    $('#searchFormPubwks016 .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    $('#searchFormPubwks016 #searchBsrpDt').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	searchBsrpCalender.show();
    });
    $('#searchFormPubwks016 #searchReqstDe').unbind('click').bind('click', function(event){
    	searchReqstCalender.show();
    });
    $('#searchFormPubwks016 #searchBsrpSdtPubwks016').unbind('change blur').bind('change blur', function(event){
    	var day1 = gf_FormGetValue('searchFormPubwks016', 'searchBsrpSdt', 'text');
    	var day2 = gf_FormGetValue('searchFormPubwks016', 'searchBsrpEdt', 'text');
    	if(day1 > day2){
    		gf_FormSetValue("searchFormPubwks016", "searchBsrpSdt", '' , 'text');
    		gf_FormSetValue("searchFormPubwks016", "searchBsrpEdt", '' , 'text');
    	    $('input[name=searchBsrpSdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD'));
    		$('input[name=searchBsrpEdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), +30)).format('YYYY-MM-DD'));

    		searchBsrpCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks016', 'searchBsrpSdt', 'text'));
    		searchBsrpCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks016', 'searchBsrpEdt', 'text'));	
    		gf_DivMsgAlert("출장 시작일자가 종료일자보다 큽니다.");
    	}
    });
    $('#searchFormPubwks016 #searchBsrpEdtPubwks016').unbind('change blur').bind('change blur', function(event){
       	var day1 = gf_FormGetValue('searchFormPubwks016', 'searchBsrpSdt', 'text');
    	var day2 = gf_FormGetValue('searchFormPubwks016', 'searchBsrpEdt', 'text');
    	if(day1 > day2){
    		gf_FormSetValue("searchFormPubwks016", "searchBsrpSdt", '' , 'text');
    		gf_FormSetValue("searchFormPubwks016", "searchBsrpEdt", '' , 'text');
    	    $('input[name=searchBsrpSdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD'));
    		$('input[name=searchBsrpEdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), +30)).format('YYYY-MM-DD'));

    		searchBsrpCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks016', 'searchBsrpSdt', 'text'));
    		searchBsrpCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks016', 'searchBsrpEdt', 'text'));	
    		gf_DivMsgAlert("출장 시작일자가 종료일자보다 큽니다.");
    	}    	
    });
    // 그리드 이벤트================================================================================================
    // 행 더블클릭 상세 조회
    dhxGridPubwks016.attachEvent("onRowDblClicked" , function(rId , cInd){
    	var paramBsrpNo  = dhxGridPubwks016.cells(rId, dhxGridPubwks016.getColIndexById("bsrpNo")).getValue();
    	var paramElctsctSttusCode  = dhxGridPubwks016.cells(rId, dhxGridPubwks016.getColIndexById("elctsctSttusCode")).getValue();
    	var paramElctsctSeSn  = dhxGridPubwks016.cells(rId, dhxGridPubwks016.getColIndexById("elctsctSeSn")).getValue();
    	var paramCopyFlag = dhxGridPubwks016.cells(rId, dhxGridPubwks016.getColIndexById("copyFlag")).getValue();
    	
    	var param = "paramBsrpNo=" + paramBsrpNo + "&paramElctsctSttusCode=" + paramElctsctSttusCode + "&paramElctsctSeSn=" + paramElctsctSeSn + "&paramCopyFlag=" + paramCopyFlag;
    	
    	fn_PopupDtlPubwks016('form1','','', param);
    });
    
    //사원팝업
	$('#btnSearchEmpCode').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubwks016","searchEmpCodePubwks016","searchEmpNmPubwks016",'', "Y", "fn_SearchMhsEmpEmpCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#searchEmpCodePubwks016').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks016', 'searchEmpCodeNm', '', 'text');
		}
    });
	$('#searchEmpNmPubwks016').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks016', 'searchEmpNo', '', 'text');
		}		
    });
    //부서 선택 Popup
	$('#btnSearchDeptCode').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormPubwks016","searchDeptCodePubwks016","searchDeptNmPubwks016",'', "Y", "fn_SearchMhsEmpDeptCode");  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#searchDeptCodePubwks016').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks016', 'searchDeptCodeNm', '', 'text');
		}
    });
	$('#searchDeptNmPubwks016').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks016', 'searchDeptCode', '', 'text');
		}
	});
};

//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormPubwks016', 'searchDeptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormPubwks016', 'searchDeptCodeNm', 'text'), 
			useAt : '1'
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}

function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormPubwks016', 'searchDeptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormPubwks016', 'searchDeptCodeNm', data.deptKorNm, 'text');
   		
   		
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormPubwks016","searchDeptCodePubwks016","searchDeptNmPubwks016", '' , "Y", null);
    }
}

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormPubwks016', 'searchEmpNo', 'text'),
		    korNm : gf_FormGetValue('searchFormPubwks016', 'searchEmpCodeNm', 'text'),
		    
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormPubwks016', 'searchEmpNo', data.empno, 'text');
 		gf_FormSetValue('searchFormPubwks016', 'searchEmpCodeNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormPubwks016","searchEmpCodePubwks016","searchEmpNmPubwks016", '' , "Y", null);
  	}
}

var cf_InitFormPubwks016 = function() {
    $('#searchFormPubwks016').resetForm();
    $('input[name=searchBsrpSdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD'));
	$('input[name=searchBsrpEdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), +30)).format('YYYY-MM-DD'));

	searchBsrpCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks016', 'searchBsrpSdt', 'text'));
	searchBsrpCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks016', 'searchBsrpEdt', 'text'));	
	
	if("PUBMNG000" == gv_SecondLvlMenuId){
		gf_FormSetValue("searchFormPubwks016", "searchEmpNo", userEmpno , '');
		gf_FormSetValue("searchFormPubwks016", "searchEmpCodeNm", userKornm , '');
		gf_FormSetValue("searchFormPubwks016", "searchDeptCode", userDeptCode , '');
		gf_FormSetValue("searchFormPubwks016", "searchDeptCodeNm", userDeptNm, '');
	}
};

var cf_SetBindingPubwks016 = function() {
	fn_UserData();
    fn_SearchPubwks016('');
    $("#searchBsrpNmPubwks016").focus();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 달력 생성
 */
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="searchBsrpDt_cal" || e.target.id =="searchBsrpSdtPubwks016" || e.target.id =="searchBsrpEdtPubwks016") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchBsrpCalender.hide();  //그리드 달력 컴포넌트 객체 숨기기.
    if(e.target.id =="searchReqstDe_cal" || e.target.id =="searchReqstDePubwks016") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchReqstCalender.hide();  //그리드 달력 컴포넌트 객체 숨기기.

});
//기간 달력
var fn_Calender = function(){
	//신청일자 검색 달력 생성
	searchBsrpCalender = new dhtmlXDoubleCalendar("searchBsrpDt_cal");
	searchBsrpCalender.attachEvent("onClick" , function(side , date){
		//alert(side + " + " + date);
        if(side == "right"){
        	searchBsrpCalender.hide();
        }
        $('#searchBsrpSdtPubwks016').val(dateFormat(searchBsrpCalender.leftCalendar.getDate()));
        $('#searchBsrpEdtPubwks016').val(dateFormat(searchBsrpCalender.rightCalendar.getDate()));
	});
	//금일 날짜표시
	gf_SetDateIntervalRadio('searchBsrpSdtPubwks016', 'searchBsrpEdtPubwks016', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전

	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchBsrpCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks016', 'searchBsrpSdtPubwks016', 'text'));
	searchBsrpCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks016', 'searchBsrpEdtPubwks016', 'text'));	
	searchBsrpCalender.leftCalendar.loadUserLanguage("ko"); 
	searchBsrpCalender.rightCalendar.loadUserLanguage("ko");

	//신청일자
	searchReqstCalender = new dhtmlXCalendarObject({input:"searchReqstDePubwks016"});
	
	searchReqstCalender.attachEvent("onClick" , function(date){
        $('#searchReqstDePubwks016').val(dateFormat(searchReqstCalender.getDate()));
	});
	searchReqstCalender.hideTime();
	searchReqstCalender.loadUserLanguage("ko"); 
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
//입력 내용을 날짜 포멧으로
function dateChk(objDate){
	var RegNotNum = /[^0-9]/g;  //숫자 정규식
	var date = objDate.val();
	date = date.replace(RegNotNum, '');

	if (date == "" || date == null || date.length < 5) {
	  objDate.val(date);
	  return;
	}

	var DataFormat;
	var RegPhonNum;

	// 날짜 포맷(yyyy-mm-dd) 만들기 
	if (date.length <= 6) {
	  DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]+)/;
	} else if (date.length <= 8) {
	  DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
	}

	while (RegPhonNum.test(date)) {
	  date = date.replace(RegPhonNum, DataFormat);
	}

	objDate.val(date);

	// 모두 입력됐을 경우 날짜 유효성 확인
	if (date.length == 10) {
		var isVaild = true;
	
		if (isNaN(Date.parse(date))) {
			// 유효 날짜 확인 여부
			isVaild = false;
		} else {
			// 년, 월, 일 0 이상 여부 확인
			var date_sp = date.split("-");
			date_sp.forEach(function(sp) {
			  if (parseInt(sp) == 0) {
			    isVaild = false;
			  }
			});
		
			// 마지막 일 확인
			var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
			if (last.getDate() < parseInt(date_sp[2])) {
			 	isVaild = false;
			}
		}
		
		if (!isVaild) {
		  gf_DivMsgAlert("잘못된 날짜입니다. \n다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
}
/**
 * 사용자 데이터 조회
 */
var fn_UserData = function(){
	var jsonParameter = {};
	var dataSource = gf_NoAsyncTransaction('pubwks016/userDataPubwks016', jsonParameter, 'GET');
	if(dataSource.code == "000"){
		var data = dataSource.data;
		userEmpno = data.empno;
		userKornm = data.korNm;
		userDeptCode = data.deptCode;
		userDeptNm = data.deptNm;
		
	}
	if("PUBMNG000" == gv_SecondLvlMenuId){
		gf_FormSetValue("searchFormPubwks016", "searchEmpNo", userEmpno, '');
		gf_FormSetValue("searchFormPubwks016", "searchEmpCodeNm", userKorNm, '');
		gf_FormSetValue("searchFormPubwks016", "searchDeptCode", userDeptCode, '');
		gf_FormSetValue("searchFormPubwks016", "searchDeptCodeNm", userDeptNm, '');
		$("#searchFormPubwks016 #searchDeptCodePubwks016").attr("disabled", true);
		$("#searchFormPubwks016 #searchDeptNmPubwks016").attr("disabled", true);
		$("#searchFormPubwks016 #btnSearchDeptCode").attr("disabled", true);
		$("#searchFormPubwks016 #searchEmpCodePubwks016").attr("disabled", true);
		$("#searchFormPubwks016 #searchEmpNmPubwks016").attr("disabled", true);
		$("#searchFormPubwks016 #btnSearchEmpCode").attr("disabled", true);
	}
}
/**
 * 조회
 */
var fn_SearchPubwks016 = function(userId) {
	var jsonParameter = {
        bsrpNo : gf_FormGetValue('searchFormPubwks016', 'bsrpNo', 'text'),
        reqstEmpno : gf_FormGetValue('searchFormPubwks016', 'searchEmpNo', 'text'),
        sRegDt : gf_FormGetValue('searchFormPubwks016', 'searchBsrpSdt', 'text').replaceAll('-',''),
        eRegDt : gf_FormGetValue('searchFormPubwks016', 'searchBsrpEdt', 'text').replaceAll('-',''),
        reqstDe : gf_FormGetValue('searchFormPubwks016', 'searchReqstDe', 'text').replaceAll('-',''),
        bsrpNm : gf_FormGetValue('searchFormPubwks016', 'searchBsrpNm', 'text'),
        deptCode : gf_FormGetValue('searchFormPubwks016', 'searchDeptCode', 'text'),
        elctsctSttusCode : gf_FormGetValue('searchFormPubwks016', 'elctsctSttusSe', 'combo')
	};
    gf_Transaction(userId, 'pubwks016/searchPubwks016', jsonParameter, 'fn_CallbackSearchPubwks016', false, 'GET');
};

var dhxDataProcessorPubwks016;
var fn_CallbackSearchPubwks016 = function(strSvcID, targetID, data) {
    dhxGridPubwks016.clearAll();
    fn_DhxDataProcessorPubwks016(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListPubwks016');
        dhxGridPubwks016.parse(data.data.records, 'js');
 
        if(save_Row_Ids_Pubwks016 == 0 && save_All_Sta_Pubwks016 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridPubwks016.selectRow(0); 
        } else if(save_Row_Sta_Pubwks016 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridPubwks016.selectRow(0);
        } else if(save_All_Sta_Pubwks016 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridPubwks016.selectRow(save_Row_Num_Pubwks016); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridPubwks016.selectRow(save_Row_Num_Pubwks016);   //개발자 수정 필요  
            //var findCell = dhxGridPubwks016.findCell(save_Row_Ids_Pubwks016, gf_GetDhxGridColumId(dhxGridPubwks016,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridPubwks016.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridPubwks016.selectRow(0);
            //} 
        }
        dhxGridPubwks016.forEachRow(function(rowId){
        	var searchBsrpEmpCnt = gf_DhxGetValue(dhxGridPubwks016, rowId, 'bsrpEmpCnt', 'grid');
        	var searchBsrpEmpnm = gf_DhxGetValue(dhxGridPubwks016, rowId, 'bsrpEmpnm', 'grid');
        	if(searchBsrpEmpCnt > 1){
        		gf_DhxSetValue(dhxGridPubwks016, rowId, 'bsrpEmpnm', (searchBsrpEmpnm + ' 외 ' + (searchBsrpEmpCnt - 1) +'명') , 'grid');
        	}
        });
 
    } else {
        gf_NoFoundDataOnGridMsg('dataListPubwks016');
    }
    $("#spanCntSearchFormPubwks016").text(data.data.records.length);
    cf_SetEventListenerPubwks016();
};
var fn_DhxDataProcessorPubwks016 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubwks016 = new dataProcessor(gv_ContextPath+'/pubwks016/savePubwks016'); //lock feed url
    dhxDataProcessorPubwks016.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubwks016.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubwks016.init(dhxGridPubwks016); //link dataprocessor to the grid
    dhxDataProcessorPubwks016.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubwks016.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubwks016.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubwks016();
                    $("#checkAllPubwks016").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 추가(신규) 
 */
var fn_PopupDtlPubwks016 = function(formId, codeId, codeNmId, param) {
	var userId = ""; 
	var title  = "국내출장상세";
	//저장팝업
	var dhxWindowObj;
	var popupDtlRequst;
	if($('body').find("div[id='popupDtlRequst']").size() <= 0) {
		$('body').append("<div id='popupDtlRequst' formid='" + formId + "' codeId ='" + codeId + "' codeNmId='" + codeNmId + "'><div class='b-close' style='display:none'></div></div>");
	}
	$('#popupDtlRequst').bPopup({
		onOpen:function(){
			
			popupDtlRequst = new dhtmlXWindows();
			var id 		= 'popupDtlRequest';
			var ajaxUrl = gv_ContextPath+'/pubwks016/popup/popupDtlRequest/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 700;
			var height	= 640;
			
			dhxWindowObj = popupDtlRequst.createWindow(id, left, top, width, height);
			popupDtlRequst.window(id).centerOnScreen();
			dhxWindowObj.setText(title);
			dhxWindowObj.attachURL(ajaxUrl, true, true);
			dhxWindowObj.detachObject(true);
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#popupDtlRequst .b-close').click();
			});
		},
		onClose:function(){
			popupDtlRequst.unload();
			$('body').find("div[id='popupDtlRequst']").remove();			
		}
	},function(){});
	return dhxWindowObj;
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Pubwks016SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubwks016, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubwks016', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubwks016', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubwks016, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubwks016.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubwks016', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubwks016', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks016, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubwks016.setSortImgState(false); 
            gf_FormSetValue('searchFormPubwks016', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubwks016', 'sortColumId', '', 'text'); 
            dhxGridPubwks016.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubwks016.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubwks016', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubwks016', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks016, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubwks016 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubwks016 = 0; 
    save_Edt_Cnt_Pubwks016 = 0; 
    save_Del_Cnt_Pubwks016 = 0; 
    dhxGridPubwks016.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubwks016.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubwks016.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubwks016 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubwks016 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubwks016 += 1; 
            } 
        }
    });
    if(edCnt == 0){
        gf_DivMsgAlert("변경된 정보가 없습니다.");
    } else {
        var confirmMsg  = ""; 
        var confirmMsg1 = ""; 
        var confirmMsg2 = ""; 
        var confirmMsg3 = ""; 
        save_All_Sta_Pubwks016 = 0; 
        if(save_Add_Cnt_Pubwks016 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pubwks016 + "건";
            save_All_Sta_Pubwks016 = 1; 
        } 
        if(save_Edt_Cnt_Pubwks016 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pubwks016 + "건"; 
        } 
        if(save_Del_Cnt_Pubwks016 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pubwks016 + "건"; 
            save_All_Sta_Pubwks016 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPubwks016(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubwks016(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPubwks016 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubwks016_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubwks016_Send = function() {
    if(fn_GridValidation(dhxGridPubwks016, dhxDataProcessorPubwks016)) {
        dhxDataProcessorPubwks016.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemovePubwks016 = function() {
    var rowId = dhxGridPubwks016.getSelectedRowId();
    if(gf_IsNull(rowId)){
    	gf_DivMsgAlert(gv_MsgDelKey);
    	return false;
    }
    var removeBsrpNo = dhxGridPubwks016.cells(dhxGridPubwks016.getSelectedRowId(), dhxGridPubwks016.getColIndexById("bsrpNo")).getValue();
    var removeElctsctSttusCode = dhxGridPubwks016.cells(dhxGridPubwks016.getSelectedRowId(), dhxGridPubwks016.getColIndexById("elctsctSttusCode")).getValue();
    var removeElctsctSttusCodeNm = dhxGridPubwks016.cells(dhxGridPubwks016.getSelectedRowId(), dhxGridPubwks016.getColIndexById("elctsctSttusCodeNm")).getValue();
    if(gf_IsNull(removeBsrpNo)){
    	gf_DivMsgAlert(gv_MsgDelKey);
    	return false;
    }
    else if(!gf_IsNull(removeElctsctSttusCode) && removeElctsctSttusCode != '40'){
    	gf_DivMsgAlert(removeElctsctSttusCodeNm + " 상태는 삭제할 수 없습니다.");
    	return false;
    }
    
    else{
    	gf_DivMsgConfirm(gv_QueDelete, 'fn_RemovePubwks016Exe()', '');
    }
}
var fn_RemovePubwks016Exe = function (){
    var removeBsrpNo = dhxGridPubwks016.cells(dhxGridPubwks016.getSelectedRowId(), dhxGridPubwks016.getColIndexById("bsrpNo")).getValue();
	var jsonParameter = {
			bsrpNo : removeBsrpNo,
			elctsctSeSn : paramElctsctSeSn
	};
    var dataSource = gf_NoAsyncTransaction('pubwks016/removePubwks016', jsonParameter, 'POST');
    if(dataSource.code === '000') {
    	gf_DivMsgAlert(gv_MsgDelete);
    	fn_SearchPubwks016('');    
        $('#popupDtlRequst .b-close').click();
    }
};
/**
 * 엑셀다운로드
 */
var fn_ExcelPubwks016 = function () {
    var titPubwks016 = '국내출장신청'; /* gf_LocaleTrans('default', 'titPubwks016') */
    var jsonParameter = {
        bsrpNo : gf_FormGetValue('searchFormPubwks016', 'bsrpNo', 'text'),
        reqstEmpno : gf_FormGetValue('searchFormPubwks016', 'searchEmpNo', 'text'),
        sRegDt : gf_FormGetValue('searchFormPubwks016', 'searchBsrpSdt', 'text').replaceAll('-',''),
        eRegDt : gf_FormGetValue('searchFormPubwks016', 'searchBsrpEdt', 'text').replaceAll('-',''),
        reqstDe : gf_FormGetValue('searchFormPubwks016', 'searchReqstDe', 'text').replaceAll('-',''),
        bsrpNm : gf_FormGetValue('searchFormPubwks016', 'searchBsrpNm', 'text'),
        deptCode : gf_FormGetValue('searchFormPubwks016', 'searchDeptCode', 'text')
    };
    var header = [[
        '출장번호' /* gf_LocaleTrans('default', 'titBsrpNo') */,
        '사업장' /* gf_LocaleTrans('default', 'titBplcCode') */,
        '신청일자' /* gf_LocaleTrans('default', 'titReqstDe') */,
        '출장 명' /* gf_LocaleTrans('default', 'titBsrpNm') */,
        '출장 목적' /* gf_LocaleTrans('default', 'titBsrpPurps') */,
        '출장구분' /* gf_LocaleTrans('default', 'titBsrpSeCode') */,
        '출장자' /* gf_LocaleTrans('default', 'titReqstEmpno') */,
        '교통 구분',
        '출장지',
        '신청 사원',
        '출장 시작일자' /* gf_LocaleTrans('default', 'titBsrpSdt') */,
        '출장 종료일자' /* gf_LocaleTrans('default', 'titBsrpEdt') */,
        '숙박 일수' /* gf_LocaleTrans('default', 'titStayngDaycnt') */,
        '전재결재 상태' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
    ]];
    var dataId = [[ 'bsrpNo', 'bplcCodeNm', 'reqstDe', 'bsrpNm', 'bsrpPurps', 'bsrpSeNm', 'bsrpEmpnm', 'trnsportSeCodeNm', 'bsrpCity', 'reqstEmpNm' , 'bsrpSdt' ,'bsrpEdt', 'stayngDaycnt' , 'elctsctSttusCodeNm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center']];
    var sheetNm = [[ titPubwks016 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwks016;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwks016/excelPubwks016', jsonParameter);
};
/******************************************************************************************************************************
 *                                         <그리드 폼 입력 데이터 validation 체크>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
/**
 * 중복데이터 얼럿
 */
var fn_JqueryValidationToolTipForDuplicationKey = function(){
    $('#saveFormPubwks016 #bsrpNoSaveFormPubwks016').parent().append(
    '<div class="error" id="bsrpNoSaveFormPubwks016-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubwks016 = function(bsrpNo , elctsctSeSn){
    if(!gf_IsNull(bsrpNo)) {
        var jsonParameter = {
            bsrpNo : bsrpNo,
            elctsctSeSn : elctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('pubwks016/findPubwks016', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.bsrpNo)) {
                return true;
            } else {
                fn_JqueryValidationToolTipForDuplicationKey();
                return false;
            }
        }
    }
}
/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var checkBsrpNo;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Pubwks016 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Pubwks016 = 0;
        save_Row_Ids_Pubwks016 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Pubwks016 = rowNum;
        save_Row_Ids_Pubwks016 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubwks016 = rowNum;
        save_Row_Ids_Pubwks016 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'bsrpNo', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bsrpNo');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkBsrpNo = gf_DhxGetValue(dhxGridObjet, rowId, 'bsrpNo', 'grid');
                    elctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowId, 'elctsctSeSn', 'grid');
                    if(!gf_IsNull(checkBsrpNo)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var bsrpNo = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'bsrpNo', 'grid');
                            if(((bsrpNo == checkBsrpNo)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bsrpNo');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupPubwks016( checkBsrpNo , elctsctSeSn)){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'bsrpNo');
                            valid = false;
                        }
                        // 그리드 중복된 처음 추가된 row 체크
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    } else {
                        // 신규로 등록된 마지막 로우를 설정
                        if(!valid && gf_IsNull(validFalseFistRowId)) {
                            validFalseFistRowId = rowId;
                        }
                    }
                }
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridPubwks016.selectRowById(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}
/**
 * 그리드 validation 빨간색 언더바
 */
var fn_GridValidationSelectCell = function(dhxGrid, dhxDataProcessor, rId, cInd){
    dhxGrid.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessor.getState(rowId))) {
            dhxGrid.forEachCell(rowId, function(cellObj, ind){
                dhxGrid.setCellTextStyle(rowId, ind, 'border:;');
            });
        }
    });
    setTimeout(function(){
        dhxGrid.setCellTextStyle(rId, gf_GetDhxGridColumId(dhxGrid, cInd), 'border-bottom: 2px solid red');
    },1);
}
