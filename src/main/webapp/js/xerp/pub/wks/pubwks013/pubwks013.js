/**
 *    프로그램       : 출장복명 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.07.07
 *    사용테이블      : MHS_BSRP
 * sourceGen version : 2020.06.29.01 (2020.07.07)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Pubwks013 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Pubwks013 = 0;  //그리드 위치 상태 
var save_All_Sta_Pubwks013 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Pubwks013 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Pubwks013 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Pubwks013 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Pubwks013 = 0;  //그리드 삭제 수량 
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
    cf_InitParamPubwks013();
    cf_SetComponentsPubwks013();
    cf_SetEventListenerPubwks013();
    cf_InitFormPubwks013();
    cf_SetBindingPubwks013();
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamPubwks013 = function() {
    gf_SetMenuPath();
    $("#saveFormPubwks013").validate({ errorElement: 'div', ignore: '' });
    fn_Calender();
    
    gf_ComboCode('divComboSearchElctsctSttus', 'elctsctSttusSe', 'elctsctSttusSe', 'search', 'EA004', '' , '', '', 'ordr', '','',''); //전자결재상태
};

var dhxGridPubwks013;
var cf_SetComponentsPubwks013 = function() {
    var dhxGridPubwks013HeaderInfo = [];
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '40', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장번호', '100', 'center', 'str', 'ro', false, 'bsrpNo', '', '')); /* gf_LocaleTrans('default', 'titBsrpNo') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('순번', '40', 'center', 'str', 'ro', true, 'excclcSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('복사 체크', '40', 'center', 'str', 'ro', true, 'copyFlag', '', '')); /* gf_LocaleTrans('default', 'titBsrpNo') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('전자결재구분순번', '100', 'center', 'str', 'ro', true, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('사업장코드', '100', 'center', 'str', 'ro', true, 'bplcCode', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('사업장', '100', 'center', 'str', 'ro', true, 'bplcCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBplcCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '100', 'center', 'str', 'ro', false, 'reqstDe', '', '')); /* gf_LocaleTrans('default', 'titReqstDe') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장명', '*', 'left', 'str', 'ro', false, 'bsrpNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpNm') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장목적', '100', 'left', 'str', 'ro', true, 'bsrpPurps', '', '')); /* gf_LocaleTrans('default', 'titBsrpPurps') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장구분코드', '100', 'center', 'str', 'ro', true, 'bsrpSeCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장구분', '100', 'center', 'str', 'ro', false, 'bsrpSeNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장자', '100', 'center', 'str', 'ro', false, 'bsrpEmpnm', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('교통구분코드', '100', 'center', 'str', 'ro', true, 'trnsportSeCode', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('교통구분', '100', 'center', 'str', 'ro', false, 'trnsportSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장지', '100', 'center', 'str', 'ro', false, 'bsrpCity', '', '')); /* gf_LocaleTrans('default', 'titBsrpSeCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('신청사원', '100', 'center', 'str', 'ro', false, 'reqstEmpNm', '', '')); /* gf_LocaleTrans('default', 'titReqstEmpno') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('신청사원번호', '100', 'center', 'str', 'ro', true, 'reqstEmpno', '', '')); /* gf_LocaleTrans('default', 'titReqstEmpno') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('직무대행사원번호', '100', 'center', 'str', 'ro', true, 'dtyVrscEmpno', '', '')); /* gf_LocaleTrans('default', 'titDtyVrscEmpno') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장시작일자', '100', 'center', 'str', 'ro', false, 'bsrpSdt', '', '')); /* gf_LocaleTrans('default', 'titBsrpSdt') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장종료일자', '100', 'center', 'str', 'ro', false, 'bsrpEdt', '', '')); /* gf_LocaleTrans('default', 'titBsrpEdt') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('숙박', '100', 'right', 'int', 'ro', true, 'stayng', '', '')); /* gf_LocaleTrans('default', 'titStayng') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장일수', '100', 'center', 'int', 'ro', false, 'stayngDaycnt', '', '')); /* gf_LocaleTrans('default', 'titStayngDaycnt') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('예산코드', '100', 'center', 'str', 'ro', true, 'bugtCode', '', '')); /* gf_LocaleTrans('default', 'titBugtCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('정산전자문서번호', '100', 'left', 'str', 'ro', true, 'excclcElctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('정산전자결재상태코드', '100', 'center', 'str', 'ro', true, 'excclcElctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '100', 'center', 'str', 'ro', false, 'excclcElctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('정산전자결재사원번호', '100', 'center', 'str', 'ro', true, 'excclcElctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridPubwks013HeaderInfo.push(gf_MakeDhxGridHeader('출장인원수', '100', 'center', 'str', 'ro', true, 'bsrpEmpCnt', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    
    
    dhxGridPubwks013 = gf_MakeDhxGrid('dataListPubwks013', dhxGridPubwks013HeaderInfo, true, false, false);
    dhxGridPubwks013.enableAutoWidth(false);
    dhxGridPubwks013.setEditable(true);

    dhxGridPubwks013.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
};

var eventIdPubwks013 = [];
var cf_SetEventListenerPubwks013 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdPubwks013 = gf_GridDetachEvent(dhxGridPubwks013, eventIdPubwks013);
    eventId = dhxGridPubwks013.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelPubwks013();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridPubwks013.getColumnsNum();
            var rowNum = dhxGridPubwks013.getRowsNum();
            var selectedId = dhxGridPubwks013.getSelectedRowId();
            var ind        = dhxGridPubwks013.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks013.getRowIndex(selectedId);
            var type       = dhxGridPubwks013.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridPubwks013.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridPubwks013.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridPubwks013.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks013.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridPubwks013.getSelectedRowId();
            var ind        = dhxGridPubwks013.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks013.getRowIndex(selectedId);
            var type       = dhxGridPubwks013.getColType(ind);
            dhxGridPubwks013.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks013.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridPubwks013.getSelectedRowId();
            var ind        = dhxGridPubwks013.getSelectedCellIndex();
            var rowIndex   = dhxGridPubwks013.getRowIndex(selectedId);
            var type       = dhxGridPubwks013.getColType(ind);
            dhxGridPubwks013.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridPubwks013.editCell();
            }
        }
        else return true;
    });
    eventIdPubwks013.push(eventId);
    eventId = dhxGridPubwks013.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Pubwks013SortGridList(ind, type, direction); 
    });
    eventIdPubwks013.push(eventId);
    eventId = dhxGridPubwks013.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdPubwks013.push(eventId);
    eventId = dhxGridPubwks013.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdPubwks013.push(eventId);
    eventId = dhxGridPubwks013.attachEvent("onEditCell", function(id, ind){
        return true;
    });
    eventIdPubwks013.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddPubwks013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $('#btnSavePubwks013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SavePubwks013();
    });
    $('#btnRemovePubwks013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemovePubwks013();
    });
    $('#btnExcelPubwks013').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelPubwks013();
    });
    $('#btnSearchPubwks013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchPubwks013('');
    });
    $('#btnResetPubwks013').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormPubwks013();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormPubwks013 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchPubwks013').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormPubwks013').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    // 달력 이벤트  ============================================================================================
    $('#searchFormPubwks013 .input_calen').unbind('keyup').bind('keyup', function(event){
    	dateChk($(this));
    });
    $('#searchFormPubwks013 #searchBsrpDt').unbind('click').bind('click', function(event){
    	searchBsrpCalender.show();
    });
    $('#searchFormPubwks013 #searchReqstDe').unbind('click').bind('click', function(event){
    	searchReqstCalender.show();
    });
    $('#searchFormPubwks013 #searchBsrpSdtPubwks013').unbind('change blur').bind('change blur', function(event){
    	var day1 = gf_FormGetValue('searchFormPubwks013', 'searchBsrpSdt', 'text');
    	var day2 = gf_FormGetValue('searchFormPubwks013', 'searchBsrpEdt', 'text');
    	if(day1 > day2){
    		gf_FormSetValue("searchFormPubwks013", "searchBsrpSdt", '' , 'text');
    		gf_FormSetValue("searchFormPubwks013", "searchBsrpEdt", '' , 'text');
    	    $('input[name=searchBsrpSdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD'));
    		$('input[name=searchBsrpEdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), +30)).format('YYYY-MM-DD'));

    		searchBsrpCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks013', 'searchBsrpSdt', 'text'));
    		searchBsrpCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks013', 'searchBsrpEdt', 'text'));	
    		gf_DivMsgAlert("출장 시작일자가 종료일자보다 큽니다.");
    	}
    });
    $('#searchFormPubwks013 #searchBsrpEdtPubwks013').unbind('change blur').bind('change blur', function(event){
       	var day1 = gf_FormGetValue('searchFormPubwks013', 'searchBsrpSdt', 'text');
    	var day2 = gf_FormGetValue('searchFormPubwks013', 'searchBsrpEdt', 'text');
    	if(day1 > day2){
    		gf_FormSetValue("searchFormPubwks013", "searchBsrpSdt", '' , 'text');
    		gf_FormSetValue("searchFormPubwks013", "searchBsrpEdt", '' , 'text');
    	    $('input[name=searchBsrpSdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD'));
    		$('input[name=searchBsrpEdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), +30)).format('YYYY-MM-DD'));

    		searchBsrpCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks013', 'searchBsrpSdt', 'text'));
    		searchBsrpCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks013', 'searchBsrpEdt', 'text'));	
    		gf_DivMsgAlert("출장 시작일자가 종료일자보다 큽니다.");
    	}    	
    });

    // 자동완성 OFF =========================================================================================
    $('#searchFormPubwks013').attr("autocomplete" , "off");
    // 그리드 이벤트================================================================================================
    // 행 더블클릭 상세 조회
    dhxGridPubwks013.attachEvent("onRowDblClicked" , function(rId , cInd){
    	var paramBsrpNo  = dhxGridPubwks013.cells(rId, dhxGridPubwks013.getColIndexById("bsrpNo")).getValue();
    	var paramElctsctSeSn  = dhxGridPubwks013.cells(rId, dhxGridPubwks013.getColIndexById("elctsctSeSn")).getValue();
    	var paramExcclcSn  = dhxGridPubwks013.cells(rId, dhxGridPubwks013.getColIndexById("excclcSn")).getValue();
    	var paramExcclcElctsctSttusCode  = dhxGridPubwks013.cells(rId, dhxGridPubwks013.getColIndexById("excclcElctsctSttusCode")).getValue();
    	var paramExcclcElctsctSttusCodeNm  = dhxGridPubwks013.cells(rId, dhxGridPubwks013.getColIndexById("excclcElctsctSttusCodeNm")).getValue();
    	var paramCopyFlag = dhxGridPubwks013.cells(rId, dhxGridPubwks013.getColIndexById("copyFlag")).getValue();
    	var param = "paramBsrpNo=" + paramBsrpNo + "&paramElctsctSeSn=" + paramElctsctSeSn + "&paramExcclcSn=" + paramExcclcSn + "&paramExcclcElctsctSttusCode=" + paramExcclcElctsctSttusCode + "&paramCopyFlag=" + paramCopyFlag + "&paramExcclcElctsctSttusCodeNm=" + paramExcclcElctsctSttusCodeNm;
    	fn_PopupDtlPubwks013('form1','','', param);
    });
    
    //사원팝업
	$('#btnSearchEmpCode').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormPubwks013","searchEmpCodePubwks013","searchEmpNmPubwks013",'', "Y", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#searchEmpCodePubwks013').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks013', 'searchEmpCodeNm', '', 'text');
		}
    });
	$('#searchEmpNmPubwks013').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks013', 'searchEmpNo', '', 'text');
		}
    });
    //부서 선택 Popup
	$('#btnSearchDeptCode').unbind('click').bind('click', function(event){
		gf_DeptPopup("searchFormPubwks013","searchDeptCodePubwks013","searchDeptNmPubwks013",'', "Y", null);  // form ID, 부서코드가 들어갈 tag의 ID, 부서명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//부서 입력 후 Enter 이벤트
	$('#searchDeptCodePubwks013').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#deptCodeNm').focus();
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks013', 'searchDeptCodeNm', '', 'text');
		}
    });
	$('#searchDeptNmPubwks013').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpDeptCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormPubwks013', 'searchDeptCode', '', 'text');
		}
    });

};

var cf_InitFormPubwks013 = function() {
    $('#searchFormPubwks013').resetForm();
    
    $('input[name=searchBsrpSdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), -30)).format('YYYY-MM-DD'));
	$('input[name=searchBsrpEdt]').val( gf_Str2Date(gf_GetDate((new Date()).format('YYYYMMDD'), +30)).format('YYYY-MM-DD'));

	searchBsrpCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks013', 'searchBsrpSdt', 'text'));
	searchBsrpCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks013', 'searchBsrpEdt', 'text'));	
	
	if("PUBMNG000" == gv_SecondLvlMenuId){
		gf_FormSetValue("searchFormPubwks013", "searchEmpNo", userEmpno , '');
		gf_FormSetValue("searchFormPubwks013", "searchEmpCodeNm", userKornm , '');
		gf_FormSetValue("searchFormPubwks013", "searchDeptCode", userDeptCode , '');
		gf_FormSetValue("searchFormPubwks013", "searchDeptCodeNm", userDeptNm , '');
	}
};

var cf_SetBindingPubwks013 = function() {
	fn_UserData();
    fn_SearchPubwks013('');
    $("#searchBsrpNmPubwks013").focus();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
//--부서 입력 후 Enter 이벤트
function fn_SearchMhsEmpDeptCode(){

	var jsonParameter = {
			deptCode : gf_FormGetValue('searchFormPubwks013', 'searchDeptCode', 'text'),
			deptKorNm : gf_FormGetValue('searchFormPubwks013', '"searchDeptCodeNm"', 'text'), 
			useAt : '1',
	};
	gf_Transaction('', 'dept/searchDeptCode', jsonParameter, 'fn_CallbackSearchMhsEmpDeptCode', false, 'GET');
}

function fn_CallbackSearchMhsEmpDeptCode (strSvcID, targetID, data){
	var totCnt = data.data.records.length;
	
    if(!gf_IsNull(data.data.records) && totCnt == 1){
    	//단건
    	var data = data.data.records[0];
   		gf_FormSetValue('searchFormPubwks013', 'searchDeptCode', data.deptCode, 'text');
   		gf_FormSetValue('searchFormPubwks013', 'searchDeptCodeNm', data.deptKorNm, 'text');
    } else {
    	//Popup 호출
    	gf_DeptPopup("searchFormPubwks013","searchDeptCode","searchDeptCodeNm", '' , "Y", null);
    }
}

//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpEmpCode(){
	
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormPubwks013', 'searchEmpNo', 'text'),
		    korNm : gf_FormGetValue('searchFormPubwks013', 'searchEmpCodeNm', 'text'),
		    bplcCode : gf_FormGetValue('searchFormPubwks013', 'searchBplcCode', 'combo') //사업장
	};
	
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
	
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormPubwks013', 'searchEmpNo', data.empno, 'text');
 		gf_FormSetValue('searchFormPubwks013', 'searchEmpCodeNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormPubwks013","searchEmpNo","searchEmpCodeNm", '' , "Y", null);
  	}
}
var fn_PopupDtlPubwks013 = function(formId, codeId, codeNmId, param) {
	var userId = ""; 
	var title  = "출장복명상세";
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
			var ajaxUrl = gv_ContextPath+'/pubwks013/popup/popupDtlRequest/view?'+param;
			var left	= 0;
			var top		= 0;
			var width	= 1150;
			var height	= 680;
			
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
 * 달력 생성
 */
$(document).click(function(e){ //문서 body를 클릭했을때
    if(e.target.id =="searchBsrpDt_cal" || e.target.id =="searchBsrpSdtPubwks013" || e.target.id =="searchBsrpEdtPubwks013") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchBsrpCalender.hide();  //그리드 달력 컴포넌트 객체 숨기기.
    if(e.target.id =="searchReqstDe_cal" || e.target.id =="searchReqstDePubwks013") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchReqstCalender.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});
//기간 달력
var fn_Calender = function(){
	//출장일자 검색 달력 생성
	searchBsrpCalender = new dhtmlXDoubleCalendar("searchBsrpDt_cal");
	searchBsrpCalender.attachEvent("onClick" , function(side , date){
		//alert(side + " + " + date);
        if(side == "right"){
        	searchBsrpCalender.hide();
        }
        $('#searchBsrpSdtPubwks013').val(dateFormat(searchBsrpCalender.leftCalendar.getDate()));
        $('#searchBsrpEdtPubwks013').val(dateFormat(searchBsrpCalender.rightCalendar.getDate()));
	});
	//금일 날짜표시
	gf_SetDateIntervalRadio('searchBsrpSdtPubwks013', 'searchBsrpEdtPubwks013', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전

	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	searchBsrpCalender.leftCalendar.setDate(gf_FormGetValue('searchFormPubwks013', 'searchBsrpSdtPubwks013', 'text'));
	searchBsrpCalender.rightCalendar.setDate(gf_FormGetValue('searchFormPubwks013', 'searchBsrpEdtPubwks013', 'text'));	
	searchBsrpCalender.leftCalendar.loadUserLanguage("ko"); 
	searchBsrpCalender.rightCalendar.loadUserLanguage("ko");

	//신청일자
	searchReqstCalender = new dhtmlXCalendarObject({input:"searchReqstDePubwks013"});
	
	searchReqstCalender.attachEvent("onClick" , function(date){
        $('#searchReqstDePubwks013').val(dateFormat(searchReqstCalender.getDate()));
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
var fn_UserData = function(){
	var jsonParameter = {};
	var dataSource = gf_NoAsyncTransaction('pubwks013/userDataPubwks013', jsonParameter, 'GET');
//	console.log(dataSource);
	if(dataSource.code == "000"){
		var data = dataSource.data;
		
		userEmpno = data.empno;
		userKornm = data.korNm;
		userDeptCode = data.deptCode;
		userDeptNm = data.deptNm;
	}
	if("PUBMNG000" == gv_SecondLvlMenuId){
		gf_FormSetValue("searchFormPubwks013", "searchEmpNo", userEmpno , '');
		gf_FormSetValue("searchFormPubwks013", "searchEmpCodeNm", userKornm , '');
		gf_FormSetValue("searchFormPubwks013", "searchDeptCode", userDeptCode , '');
		gf_FormSetValue("searchFormPubwks013", "searchDeptCodeNm", userDeptNm , '');
		$("#searchFormPubwks013 #searchDeptCodePubwks013").attr("disabled" , true);
		$("#searchFormPubwks013 #searchDeptNmPubwks013").attr("disabled" , true);
		$("#searchFormPubwks013 #btnSearchDeptCode").attr("disabled" , true);
		$("#searchFormPubwks013 #searchEmpCodePubwks013").attr("disabled" , true);
		$("#searchFormPubwks013 #searchEmpNmPubwks013").attr("disabled" , true);
	}
}
/**
 * 조회
 */
var fn_SearchPubwks013 = function(userId) {
    var jsonParameter = {
        bsrpNo : gf_FormGetValue('searchFormPubwks013', 'bsrpNo', 'text'),
        reqstEmpno : gf_FormGetValue('searchFormPubwks013', 'searchEmpNo', 'text'),
        sRegDt : gf_FormGetValue('searchFormPubwks013', 'searchBsrpSdt', 'text').replaceAll('-',''),
        eRegDt : gf_FormGetValue('searchFormPubwks013', 'searchBsrpEdt', 'text').replaceAll('-',''),
        reqstDe : gf_FormGetValue('searchFormPubwks013', 'searchReqstDe', 'text').replaceAll('-',''),
        bsrpNm : gf_FormGetValue('searchFormPubwks013', 'searchBsrpNm', 'text'),
        deptCode : gf_FormGetValue('searchFormPubwks013', 'searchDeptCode', 'text'),
        excclcElctsctSttusCode : gf_FormGetValue('searchFormPubwks013', 'elctsctSttusSe', 'combo'),
    };
    gf_Transaction(userId, 'pubwks013/searchPubwks013', jsonParameter, 'fn_CallbackSearchPubwks013', false, 'GET');
};

var dhxDataProcessorPubwks013;
var fn_CallbackSearchPubwks013 = function(strSvcID, targetID, data) {
    dhxGridPubwks013.clearAll();
    fn_DhxDataProcessorPubwks013(); 
    if(!gf_IsNull(data.data.records)){
        gf_NoFoundDataOnGridMsgRemove('dataListPubwks013');
        dhxGridPubwks013.parse(data.data.records, 'js');

        if(save_Row_Ids_Pubwks013 == 0 && save_All_Sta_Pubwks013 == 0){  //0번이고, 신규/삭제 없음 = 최초 
            dhxGridPubwks013.selectRow(0); 
        } else if(save_Row_Sta_Pubwks013 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
            dhxGridPubwks013.selectRow(0);
        } else if(save_All_Sta_Pubwks013 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
            dhxGridPubwks013.selectRow(save_Row_Num_Pubwks013); 
        } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
            dhxGridPubwks013.selectRow(save_Row_Num_Pubwks013);   //개발자 수정 필요  
            //var findCell = dhxGridPubwks013.findCell(save_Row_Ids_Pubwks013, gf_GetDhxGridColumId(dhxGridPubwks013,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
            //if(!gf_IsNull(findCell)) { 
            //    dhxGridPubwks013.selectRowById(findCell[0][0]); 
            //} else { 
            //    dhxGridPubwks013.selectRow(0);
            //} 
        }
        dhxGridPubwks013.forEachRow(function(rowId){
        	var searchBsrpEmpCnt = gf_DhxGetValue(dhxGridPubwks013, rowId, 'bsrpEmpCnt', 'grid');
        	var searchBsrpEmpnm = gf_DhxGetValue(dhxGridPubwks013, rowId, 'bsrpEmpnm', 'grid');
        	if(searchBsrpEmpCnt > 1){
        		gf_DhxSetValue(dhxGridPubwks013, rowId, 'bsrpEmpnm', (searchBsrpEmpnm + ' 외 ' + (searchBsrpEmpCnt - 1) +'명') , 'grid');
        	}
        }); 
    } else {
        gf_NoFoundDataOnGridMsg('dataListPubwks013');
    }
    $("#spanCntSearchFormPubwks013").text(data.data.records.length);
    cf_SetEventListenerPubwks013();
};
var fn_DhxDataProcessorPubwks013 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorPubwks013 = new dataProcessor(gv_ContextPath+'/pubwks013/savePubwks013'); //lock feed url
    dhxDataProcessorPubwks013.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorPubwks013.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorPubwks013.init(dhxGridPubwks013); //link dataprocessor to the grid
    dhxDataProcessorPubwks013.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorPubwks013.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorPubwks013.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchPubwks013();
                    $("#checkAllPubwks013").prop('checked', false); //상단 체크박스 해제
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
var fn_Pubwks013SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridPubwks013, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormPubwks013', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormPubwks013', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridPubwks013, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridPubwks013.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormPubwks013', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormPubwks013', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks013, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridPubwks013.setSortImgState(false); 
            gf_FormSetValue('searchFormPubwks013', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormPubwks013', 'sortColumId', '', 'text'); 
            dhxGridPubwks013.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridPubwks013.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormPubwks013', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormPubwks013', 'sortColumId', gf_GetDhxGridColum(dhxGridPubwks013, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SavePubwks013 = function() {
    var edCnt = 0;
    save_Add_Cnt_Pubwks013 = 0; 
    save_Edt_Cnt_Pubwks013 = 0; 
    save_Del_Cnt_Pubwks013 = 0; 
    dhxGridPubwks013.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorPubwks013.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorPubwks013.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Pubwks013 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Pubwks013 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Pubwks013 += 1; 
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
        save_All_Sta_Pubwks013 = 0; 
        if(save_Add_Cnt_Pubwks013 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Pubwks013 + "건";
            save_All_Sta_Pubwks013 = 1; 
        } 
        if(save_Edt_Cnt_Pubwks013 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Pubwks013 + "건"; 
        } 
        if(save_Del_Cnt_Pubwks013 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Pubwks013 + "건"; 
            save_All_Sta_Pubwks013 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalPubwks013(gv_QueSave)){  //여기는 안옴 
        if(confirmModalPubwks013(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalPubwks013 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SavePubwks013_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SavePubwks013_Send = function() {
    if(fn_GridValidation(dhxGridPubwks013, dhxDataProcessorPubwks013)) {
        dhxDataProcessorPubwks013.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemovePubwks013 = function() {
    var rowId = dhxGridPubwks013.getSelectedRowId();
    var state = dhxDataProcessorPubwks013.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridPubwks013.getRowIndex(rowId);
        dhxGridPubwks013.deleteRow(rowId);
        dhxGridPubwks013.selectRow(rowNum);
    }
    else dhxDataProcessorPubwks013.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelPubwks013 = function () {
    var titPubwks013 = '출장복명'; /* gf_LocaleTrans('default', 'titPubwks013') */
    var jsonParameter = {
        bsrpNo : gf_FormGetValue('searchFormPubwks013', 'bsrpNo', 'text'),
        reqstEmpno : gf_FormGetValue('searchFormPubwks013', 'searchEmpNo', 'text'),
        sRegDt : gf_FormGetValue('searchFormPubwks013', 'searchBsrpSdt', 'text').replaceAll('-',''),
        eRegDt : gf_FormGetValue('searchFormPubwks013', 'searchBsrpEdt', 'text').replaceAll('-',''),
        reqstDe : gf_FormGetValue('searchFormPubwks013', 'searchReqstDe', 'text').replaceAll('-',''),
        bsrpNm : gf_FormGetValue('searchFormPubwks013', 'searchBsrpNm', 'text'),
        deptCode : gf_FormGetValue('searchFormPubwks013', 'searchDeptCode', 'text')
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
    var sheetNm = [[ titPubwks013 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titPubwks013;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('pubwks013/excelPubwks013', jsonParameter);
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
    $('#saveFormPubwks013 #bsrpNoSaveFormPubwks013').parent().append(
    '<div class="error" id="bsrpNoSaveFormPubwks013-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupPubwks013 = function(bsrpNo){
    if(!gf_IsNull(bsrpNo)) {
        var jsonParameter = {
            bsrpNo : bsrpNo
        };
        var dataSource = gf_NoAsyncTransaction('pubwks013/findPubwks013', jsonParameter, 'GET');
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
    save_Row_Sta_Pubwks013 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Pubwks013 = 0;
        save_Row_Ids_Pubwks013 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Pubwks013 = rowNum;
        save_Row_Ids_Pubwks013 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Pubwks013 = rowNum;
        save_Row_Ids_Pubwks013 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
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
                        if(!fn_CheckDupPubwks013( checkBsrpNo )){
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
        dhxGridPubwks013.selectRowById(validFalseFistRowId);
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
