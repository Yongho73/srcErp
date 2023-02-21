/**
 *    프로그램       : 증명서발급대장 관리 화면 javascript
 *    작성자        : 디비비전
 *    작성일자       : 2020.08.27
 *    사용테이블      : MHS_PROOF_ISSU
 * sourceGen version : 2020.08.06.01 (2020.08.27)
 */
/******************************************************************************************************************************
 *                                                     <전역변수 선언>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var save_Row_Num_Mhshrc003 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrc003 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrc003 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrc003 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrc003 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrc003 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrc003 = 0;  //그리드 삭제 수량 
var dhxGridMhshrc003;  //그리드 객체
var eventIdMhshrc003 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrc003;  //DataProcessor 객체
var searchApplyCalendar;
var searchApplyCalendar;
var sessionUserDeptCode;		
var sessionUserDeptNm;
var sessionUserEmpno;
var sessionUserEmpnm;
var sessionUserClsfCode;
var sessionUserClsfNm;
/******************************************************************************************************************************
 *                                                     <공통함수 호출>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
$(function() {
    cf_InitParamMhshrc003();
    if(cf_SetComponentsMhshrc003()){
    	fn_Calendar();
       cf_SetEventListenerMhshrc003();
       cf_InitFormMhshrc003();
       cf_SetBindingMhshrc003();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrc003 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrc003").validate({ errorElement: 'div', ignore: '' });

};

var cf_SetComponentsMhshrc003 = function() {
    var dhxGridMhshrc003HeaderInfo = [];
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '*', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('신청번호', '130', 'center', 'str', 'ro', false, 'issuno', '', '')); /* gf_LocaleTrans('default', 'titIssuno') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('순번', '50', 'center', 'int', 'ro', false, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '80', 'center', 'str', 'ro', true , 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '100', 'center', 'str', 'ro', false, 'empnm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('부서', '100', 'center', 'str', 'ro', false, 'ttmDeptNm', '', '')); /* gf_LocaleTrans('default', 'titTtmDeptNm') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('직급', '80', 'center', 'str', 'ro', false, 'ttmClsfNm', '', '')); /* gf_LocaleTrans('default', 'titTtmClsfNm') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '80', 'center', 'str', 'ro', false, 'issuReqstDe', '', '')); /* gf_LocaleTrans('default', 'titIssuReqstDe') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('증명서종류', '100', 'center', 'str', 'ro', true, 'crtfKindCode', '', '')); /* gf_LocaleTrans('default', 'titCrtfKindCode') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('증명서종류', '100', 'center', 'str', 'ro', false, 'crtfKindCodeNm', '', '')); /* gf_LocaleTrans('default', 'titCrtfKindCode') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('용도구분', '100', 'center', 'str', 'ro', true, 'issuUseprpsSeCode', '', '')); /* gf_LocaleTrans('default', 'titIssuUseprpsSeCode') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('용도구분', '100', 'center', 'str', 'ro', false, 'issuUseprpsSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titIssuUseprpsSeCode') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('발금매수', '60', 'center', 'int', 'ro', false, 'issuCnt', '', '')); /* gf_LocaleTrans('default', 'titIssuCnt') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('발급일자', '100', 'center', 'str', 'ro', false, 'issuDe', '', '')); /* gf_LocaleTrans('default', 'titIssuDe') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('발급용도 내용', '100', 'center', 'str', 'ro', false, 'issuUseprpsCn', '', '')); /* gf_LocaleTrans('default', 'titIssuUseprpsCn') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('제출위치', '100', 'left', 'str', 'ro', false, 'submitLc', '', '')); /* gf_LocaleTrans('default', 'titSubmitLc') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('현재 주소', '100', 'left', 'str', 'ro', false, 'nowAdres', '', '')); /* gf_LocaleTrans('default', 'titNowAdres') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('주민등록번호 마스킹여부', '100', 'center', 'str', 'ro', false, 'ihidnumMaskAt', '', '')); /* gf_LocaleTrans('default', 'titIhidnumMaskAt') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('경력포함여부', '100', 'center', 'str', 'ro', false, 'careerInclsAt', '', '')); /* gf_LocaleTrans('default', 'titCareerInclsAt') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('신청상태코드', '100', 'center', 'str', 'ro', false, 'reqstSttusCode', '', '')); /* gf_LocaleTrans('default', 'titReqstSttusCode') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('출력회수', '100', 'center', 'int', 'ro', false, 'outptCnt', '', '')); /* gf_LocaleTrans('default', 'titOutptCnt') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('출력 허용 매수', '100', 'center', 'int', 'ro', false, 'outptPermCnt', '', '')); /* gf_LocaleTrans('default', 'titOutptPermCnt') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('출력 허용 일자', '100', 'center', 'str', 'ro', false, 'outptPermDe', '', '')); /* gf_LocaleTrans('default', 'titOutptPermDe') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '100', 'center', 'str', 'ro', false, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태 코드', '100', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshrc003HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 상태', '100', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshrc003 = gf_MakeDhxGrid('dataListMhshrc003', dhxGridMhshrc003HeaderInfo, true, false, false);
    dhxGridMhshrc003.enableAutoWidth(false);
    dhxGridMhshrc003.setEditable(false);

    dhxGridMhshrc003.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 

    gf_ComboCode('divComboSearChcrtfKindCodeMhshrc003', 'searchCrtfKindCode', 'searchCrtfKindCode', 'search', 'C083', '' , '', '', 'ordr', '');//증명서구분
    gf_ComboCode('divComboSearchElctsctSttusCodeMhshrc003', 'searchElctsctSttusCode', 'searchElctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', '');//결재구분
    return true; 
};

var cf_SetEventListenerMhshrc003 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrc003 = gf_GridDetachEvent(dhxGridMhshrc003, eventIdMhshrc003);
    eventId = dhxGridMhshrc003.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrc003();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrc003.getColumnsNum();
            var rowNum = dhxGridMhshrc003.getRowsNum();
            var selectedId = dhxGridMhshrc003.getSelectedRowId();
            var ind        = dhxGridMhshrc003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrc003.getRowIndex(selectedId);
            var type       = dhxGridMhshrc003.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrc003.selectRow(0);
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrc003.selectRow(rowIndex + 1);
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrc003.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrc003.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrc003.getSelectedRowId();
            var ind        = dhxGridMhshrc003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrc003.getRowIndex(selectedId);
            var type       = dhxGridMhshrc003.getColType(ind);
            dhxGridMhshrc003.selectCell(rowIndex+1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrc003.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrc003.getSelectedRowId();
            var ind        = dhxGridMhshrc003.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrc003.getRowIndex(selectedId);
            var type       = dhxGridMhshrc003.getColType(ind);
            dhxGridMhshrc003.selectCell(rowIndex-1, ind);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrc003.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrc003.push(eventId);
    eventId = dhxGridMhshrc003.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrc003SortGridList(ind, type, direction); 
    });
    eventIdMhshrc003.push(eventId);
    eventId = dhxGridMhshrc003.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrc003.push(eventId);
    eventId = dhxGridMhshrc003.attachEvent("onRowSelect", function(id, ind){
        return true;
    });
    eventIdMhshrc003.push(eventId);
    eventId = dhxGridMhshrc003.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdMhshrc003.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrc003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrc003()
    });
    $('#btnSaveMhshrc003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrc003();
    });
    $('#btnRemoveMhshrc003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrc003();
    });
    $('#btnExcelMhshrc003').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrc003();
    });
    $('#btnSearchMhshrc003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrc003('');
    });
    $('#btnResetMhshrc003').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrc003();
    });
    // 기타 이벤트 ==========================================================================================
    $('#searchFormMhshrc003 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrc003').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrc003').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    $("#searchFormMhshrc003 #searchApplyTime").unbind('click').bind('click' , function(event){
    	searchApplyCalendar.show();
    });
    // 사원 팝업
	$('#btnSearchEmpCode').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhshrc003","searchEmpCodeMhshrc003","searchEmpNmMhshrc003",'', "N", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#searchEmpCodeMhshrc003').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrc003', 'searchEmpCodeNm', '', 'text');
		}
    });
	$('#searchEmpNmMhshrc003').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrc003', 'searchEmpNo', '', 'text');
		}
    });
    // 자동완성 OFF =========================================================================================
    $('#searchFormMhshrc003').attr("autocomplete" , "off");
};

var cf_InitFormMhshrc003 = function() {
    $('#searchFormMhshrc003').resetForm();
};

var cf_SetBindingMhshrc003 = function() {
    fn_SearchMhshrc003('');
    fn_SessionCheck();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpCode(){
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMhshrc003', 'searchEmpNo', 'text'),
		    korNm : gf_FormGetValue('searchFormMhshrc003', 'searchEmpCodeNm', 'text'),
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMhshrc003', 'searchEmpNo', data.empno, 'text');
 		gf_FormSetValue('searchFormMhshrc003', 'searchEmpCodeNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormMhshrc003","searchEmpCodeMhshrc003","searchEmpNmMhshrc003", '' , "N", null);
  	}
}
var fn_SessionCheck = function(){
    var userInfo = gf_NoAsyncTransaction('stmcmm001/checkSession', {}, 'GET');
//    console.log(userInfo);
    if(userInfo.code == "000"){
    	sessionUserDeptCode = userInfo.data.userDeptCode;
    	sessionUserDeptNm = userInfo.data.userDeptNm;
    	sessionUserEmpno = userInfo.data.userEmpNo;
    	sessionUserEmpnm = userInfo.data.userNm;
    	sessionUserClsfCode = userInfo.data.userClsfCode;
    	sessionUserClsfNm = userInfo.data.userClsfNm;
    	
    	
//    	gf_FormSetValue("searchFormMhshrc001", "searchDeptCode", sessionUserDeptCode , '');
//    	gf_FormSetValue("searchFormMhshrc001", "searchDeptCodeNm", sessionUserDeptNm , '');
    	gf_FormSetValue("searchFormMhshrc003", "searchEmpNo", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormMhshrc003", "searchEmpCodeNm", sessionUserEmpnm , '');
    }
}
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="searchTime_cal" || e.target.id =="searchApplyBeginTimeMhshrc003" || e.target.id =="searchApplyEndTimeMhshrc003") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    searchApplyCalendar.hide();  //그리드 달력 컴포넌트 객체 숨기기.

});
var fn_Calendar = function(){
    //신청일자
  	searchApplyCalendar = new dhtmlXDoubleCalendar("searchTime_cal");
      searchApplyCalendar.attachEvent("onClick", function(side, date){
          //alert(side + " + " + date);
          if(side == "right"){
          	searchApplyCalendar.hide();
          }
          $('#searchApplyBeginTimeMhshrc003').val(dateFormat(searchApplyCalendar.leftCalendar.getDate()));
          $('#searchApplyEndTimeMhshrc003').val(dateFormat(searchApplyCalendar.rightCalendar.getDate()));
      });
      searchApplyCalendar.leftCalendar.loadUserLanguage("ko"); 
      searchApplyCalendar.rightCalendar.loadUserLanguage("ko"); 
}

/**
 * 조회
 */
var fn_SearchMhshrc003 = function(userId) {
    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhshrc003', 'searchApplyBeginTime', 'text').replaceAll('-',''),
        eRegDt : gf_FormGetValue('searchFormMhshrc003', 'searchApplyEndTime', 'text').replaceAll('-',''),
        empno : gf_FormGetValue('searchFormMhshrc003', 'searchEmpNo', 'text'),
        crtfKindCode : gf_FormGetValue('searchFormMhshrc003', 'searchCrtfKindCode', 'combo'),
        elctsctSttusCode : gf_FormGetValue('searchFormMhshrc003', 'searchElctsctSttusCode', 'combo')
    };
    gf_Transaction(userId, 'mhshrc003/searchMhshrc003', jsonParameter, 'fn_CallbackSearchMhshrc003', false, 'GET');
};

var fn_CallbackSearchMhshrc003 = function(strSvcID, targetID, data) {
    //dhxGridMhshrc003.clearAll();
    dhxGridMhshrc003.destructor();
    if(cf_SetComponentsMhshrc003()){ 
        fn_DhxDataProcessorMhshrc003(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrc003');
            dhxGridMhshrc003.parse(data.data.records, 'js');
 
            if(save_Row_Ids_Mhshrc003 == 0 && save_All_Sta_Mhshrc003 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrc003.selectRow(0); 
            } else if(save_Row_Sta_Mhshrc003 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrc003.selectRow(0);
            } else if(save_All_Sta_Mhshrc003 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrc003.selectRow(save_Row_Num_Mhshrc003); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrc003.selectRow(save_Row_Num_Mhshrc003);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrc003.findCell(save_Row_Ids_Mhshrc003, gf_GetDhxGridColumId(dhxGridMhshrc003,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrc003.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrc003.selectRow(0);
                //} 
            } 
 
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrc003');
        }
        $("#spanCntSearchFormMhshrc003").text(data.data.records.length);
        cf_SetEventListenerMhshrc003();
    } 
};
var fn_DhxDataProcessorMhshrc003 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrc003 = new dataProcessor(gv_ContextPath+'/mhshrc003/saveMhshrc003'); //lock feed url
    dhxDataProcessorMhshrc003.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrc003.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrc003.init(dhxGridMhshrc003); //link dataprocessor to the grid
    dhxDataProcessorMhshrc003.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrc003.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrc003.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
            } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrc003();
                    $("#checkAllMhshrc003").prop('checked', false); //상단 체크박스 해제
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
var fn_AddMhshrc003 = function() {
    dhxGridMhshrc003.clearSelection();
    var initValueArr = [];
    initValueArr.push(''); //no
    initValueArr.push(''); //checkbox
    initValueArr.push(''); //issuno
    initValueArr.push(''); //elctsctSeSn
    initValueArr.push(''); //empno
    initValueArr.push(''); //ttmDeptNm
    initValueArr.push(''); //ttmClsfNm
    initValueArr.push(''); //crtfKindCode
    initValueArr.push(''); //issuReqstDe
    initValueArr.push(''); //issuDe
    initValueArr.push(''); //issuCnt
    initValueArr.push(''); //issuUseprpsSeCode
    initValueArr.push(''); //issuUseprpsCn
    initValueArr.push(''); //submitLc
    initValueArr.push(''); //nowAdres
    initValueArr.push(''); //ihidnumMaskAt
    initValueArr.push(''); //careerInclsAt
    initValueArr.push(''); //reqstSttusCode
    initValueArr.push(''); //outptCnt
    initValueArr.push(''); //outptPermCnt
    initValueArr.push(''); //outptPermDe
    initValueArr.push(''); //elctsctDocNo
    initValueArr.push(''); //elctsctSttusCode
    initValueArr.push(''); //elctsctEmpno
    dhxGridMhshrc003.addRow(dhxGridMhshrc003.uid(), initValueArr, 0);
    dhxGridMhshrc003.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrc003');
    $('#btnPopEmpSearchMhshrc003').show();
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrc003SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrc003, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrc003', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrc003', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrc003, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrc003.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrc003', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrc003', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrc003, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrc003.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrc003', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrc003', 'sortColumId', '', 'text'); 
            dhxGridMhshrc003.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrc003.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrc003', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrc003', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrc003, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrc003 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrc003 = 0; 
    save_Edt_Cnt_Mhshrc003 = 0; 
    save_Del_Cnt_Mhshrc003 = 0; 
    dhxGridMhshrc003.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrc003.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrc003.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrc003 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrc003 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrc003 += 1; 
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
        save_All_Sta_Mhshrc003 = 0; 
        if(save_Add_Cnt_Mhshrc003 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrc003 + "건";
            save_All_Sta_Mhshrc003 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrc003 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrc003 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrc003 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrc003 + "건"; 
            save_All_Sta_Mhshrc003 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrc003(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrc003(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrc003 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrc003_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrc003_Send = function() {
    if(fn_GridValidation(dhxGridMhshrc003, dhxDataProcessorMhshrc003)) {
        dhxDataProcessorMhshrc003.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrc003 = function() {
    var rowId = dhxGridMhshrc003.getSelectedRowId();
    var state = dhxDataProcessorMhshrc003.getState(rowId);
    if(state == 'inserted') {
        var rowNum = dhxGridMhshrc003.getRowIndex(rowId);
        dhxGridMhshrc003.deleteRow(rowId);
        dhxGridMhshrc003.selectRow(rowNum);
    }
    else dhxDataProcessorMhshrc003.setUpdated(rowId, true, 'deleted');
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrc003 = function () {
    var titMhshrc003 = '증명서발급대장'; /* gf_LocaleTrans('default', 'titMhshrc003') */
    var jsonParameter = {
        issuno : gf_FormGetValue('searchFormMhshrc003', 'issuno', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMhshrc003', 'elctsctSeSn', 'text')
    };
    var header = [[
        '발급번호' /* gf_LocaleTrans('default', 'titIssuno') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '사원이름' /* gf_LocaleTrans('default', 'titEmpno') */,
        '당시부서명' /* gf_LocaleTrans('default', 'titTtmDeptNm') */,
        '당시 직급명' /* gf_LocaleTrans('default', 'titTtmClsfNm') */,
        '증명서종류' /* gf_LocaleTrans('default', 'titCrtfKindCode') */,
        '발급신청일자' /* gf_LocaleTrans('default', 'titIssuReqstDe') */,
        '발급일자' /* gf_LocaleTrans('default', 'titIssuDe') */,
        '발금매수' /* gf_LocaleTrans('default', 'titIssuCnt') */,
        '제증명용도구분' /* gf_LocaleTrans('default', 'titIssuUseprpsSeCode') */,
        '발급용도 내용' /* gf_LocaleTrans('default', 'titIssuUseprpsCn') */,
        '제출위치' /* gf_LocaleTrans('default', 'titSubmitLc') */,
        '현재 주소' /* gf_LocaleTrans('default', 'titNowAdres') */,
        '주민등록번호 마스킹여부' /* gf_LocaleTrans('default', 'titIhidnumMaskAt') */,
        '경력포함여부' /* gf_LocaleTrans('default', 'titCareerInclsAt') */,
        '신청상태코드' /* gf_LocaleTrans('default', 'titReqstSttusCode') */,
        '출력회수' /* gf_LocaleTrans('default', 'titOutptCnt') */,
        '출력 허용 매수' /* gf_LocaleTrans('default', 'titOutptPermCnt') */,
        '출력 허용 일자' /* gf_LocaleTrans('default', 'titOutptPermDe') */,
        '전자결재 문서 번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재 상태' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 사원이름' /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    ]];
    var dataId = [[ 'issuno', 'elctsctSeSn', 'empnm', 'ttmDeptNm', 'ttmClsfNm', 'crtfKindCodeNm', 'issuReqstDe', 'issuDe', 'issuCnt', 'issuUseprpsSeCodeNm', 'issuUseprpsCn', 'submitLc', 'nowAdres', 'ihidnumMaskAt', 'careerInclsAt', 'reqstSttusCode', 'outptCnt', 'outptPermCnt', 'outptPermDe', 'elctsctDocNo', 'elctsctSttusCodeNm', 'elctsctEmpnm' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrc003 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrc003;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrc003/excelMhshrc003', jsonParameter);
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
    $('#saveFormMhshrc003 #issunoSaveFormMhshrc003').parent().append(
    '<div class="error" id="issunoSaveFormMhshrc003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshrc003 #elctsctSeSnSaveFormMhshrc003').parent().append(
    '<div class="error" id="elctsctSeSnSaveFormMhshrc003-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrc003 = function(issuno, elctsctSeSn){
    if(!gf_IsNull(issuno) && !gf_IsNull(elctsctSeSn)) {
        var jsonParameter = {
            issuno : issuno,
            elctsctSeSn : elctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('mhshrc003/findMhshrc003', jsonParameter, 'GET');
        var data = dataSource.data;
        if(dataSource.code === '000') {
            if(gf_IsNull(data.issuno) && gf_IsNull(data.elctsctSeSn)) {
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
    var checkIssuno;
    var checkElctsctSeSn;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrc003 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(state == 'deleted') {
        save_Row_Num_Mhshrc003 = 0;
        save_Row_Ids_Mhshrc003 = "";
    } else if(state == 'inserted') {
        save_Row_Num_Mhshrc003 = rowNum;
        save_Row_Ids_Mhshrc003 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrc003 = rowNum;
        save_Row_Ids_Mhshrc003 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
        valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'issuno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'issuno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'elctsctSeSn', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(state == 'inserted') {
                    checkIssuno = gf_DhxGetValue(dhxGridObjet, rowId, 'issuno', 'grid');
                    checkElctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowId, 'elctsctSeSn', 'grid');
                    if(!gf_IsNull(checkIssuno, checkElctsctSeSn)) {
                        // 신규입력 key 그리드 중복 체크
                        dhxGridObjet.forEachRow(function(rowIdForCheck) {
                            var issuno = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'issuno', 'grid');
                            var elctsctSeSn = gf_DhxGetValue(dhxGridObjet, rowIdForCheck, 'elctsctSeSn', 'grid');
                            if(((issuno == checkIssuno) && (elctsctSeSn == checkElctsctSeSn)) && (rowId != rowIdForCheck)) {
                                validFalseDuplicationKey = true;
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'issuno');
                                fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
                                valid = false;
                            }
                        });
                        // 신규입력 key db 중복 체크
                        if(!fn_CheckDupMhshrc003( checkIssuno, checkElctsctSeSn )){
                            validFalseDuplicationKey = true;
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'issuno');
                            fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'elctsctSeSn');
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
        dhxGridMhshrc003.selectRowById(validFalseFistRowId);
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
