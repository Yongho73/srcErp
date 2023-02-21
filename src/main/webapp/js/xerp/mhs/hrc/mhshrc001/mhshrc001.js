/**
 *    프로그램       : 증명서신청/출력 관리 화면 javascript
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
var save_Row_Num_Mhshrc001 = 0;  //그리드 위치 저장 변수 : 저장 후 재조회 시 사용 
var save_Row_Sta_Mhshrc001 = 0;  //그리드 위치 상태 
var save_All_Sta_Mhshrc001 = 0;  //데이터 전체 상태 : 신규,삭제가 있었는지 0=신규/삭제 없음, 1=신규,삭제 있음 
var save_Row_Ids_Mhshrc001 = "";  //그리드 위치 ID, 개발자에 의해 수정 필요 
var save_Add_Cnt_Mhshrc001 = 0;  //그리드 추가 수량 
var save_Edt_Cnt_Mhshrc001 = 0;  //그리드 저장 수량 
var save_Del_Cnt_Mhshrc001 = 0;  //그리드 삭제 수량 
var dhxGridMhshrc001;  //그리드 객체
var eventIdMhshrc001 = [];  //그리드 이벤트 객체 
var dhxDataProcessorMhshrc001;  //DataProcessor 객체
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
    cf_InitParamMhshrc001();
    if(cf_SetComponentsMhshrc001()){
    	fn_Calendar();
       cf_SetEventListenerMhshrc001();
       cf_InitFormMhshrc001();
       cf_SetBindingMhshrc001();
    }
});
/******************************************************************************************************************************
 *                                                     <공통함수 구현>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 500라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통 함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
var cf_InitParamMhshrc001 = function() {
    gf_SetMenuPath();
    $("#saveFormMhshrc001").validate({ errorElement: 'div', ignore: '' });
    
    gf_ComboCode('divComboSearChcrtfKindCode', 'searchCrtfKindCode', 'searchCrtfKindCode', 'search', 'C083', '' , '', '', 'ordr', '');//증명서구분
    gf_ComboCode('divComboSearchElctsctSttusCode', 'searchElctsctSttusCode', 'searchElctsctSttusCode', 'search', 'EA004', '' , '', '', 'ordr', '');//결재구분
    
    gf_ComboCode('divComboSaveElctsctSttusCode', 'elctsctSttusCode', 'elctsctSttusCode', 'sel', 'EA004', '' , 'width:60%', '', 'ordr', '');	//
    gf_ComboCode('divComboSaveCrtfKindCode', 'crtfKindCode', 'crtfKindCode', 'sel', 'C083', '' , '', '', 'ordr', 'required' , '' , '');	//
    gf_ComboCode('divComboSaveIssuUseprpsSeCode', 'issuUseprpsSeCode', 'issuUseprpsSeCode', 'sel', 'C178', '' , '', '', 'ordr', 'required' , '' ,'');	//
};

var cf_SetComponentsMhshrc001 = function() {
    var dhxGridMhshrc001HeaderInfo = [];
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader(gv_TitNum, '30', 'center', 'str', 'ro', false, 'num', '', ''));  //자동 숫자 타입으로 하려면  타입을 cntr 으로 
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('<input type="checkbox" id="checkAllMhshrc001" />', '40', 'center', 'na', 'ch', false, 'chk', '', ''));
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('신청번호', '130', 'left', 'str', 'ro', false, 'issuno', '', '')); /* gf_LocaleTrans('default', 'titIssuno') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('순번', '60', 'center', 'int', 'ro', false, 'elctsctSeSn', '', '')); /* gf_LocaleTrans('default', 'titElctsctSeSn') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('사원명', '100', 'center', 'str', 'ro', false, 'empnm', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('신청일자', '80', 'center', 'str', 'ro', false, 'issuReqstDe', '', '')); /* gf_LocaleTrans('default', 'titIssuReqstDe') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('증명서종류', '100', 'center', 'str', 'ro', false, 'crtfKindCodeNm', '', '')); /* gf_LocaleTrans('default', 'titCrtfKindCode') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('제증명용도', '100', 'center', 'str', 'ro', false, 'issuUseprpsSeCodeNm', '', '')); /* gf_LocaleTrans('default', 'titIssuUseprpsSeCode') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '80', 'center', 'str', 'ro', false, 'elctsctSttusCodeNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */

    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('사원번호', '60', 'center', 'str', 'ro', true, 'empno', '', '')); /* gf_LocaleTrans('default', 'titEmpno') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('출력회수', '80', 'right', 'int', 'ro', true, 'outptCnt', '', '')); /* gf_LocaleTrans('default', 'titOutptCnt') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('증명서종류', '100', 'center', 'str', 'ro', true, 'crtfKindCode', '', '')); /* gf_LocaleTrans('default', 'titCrtfKindCode') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('발급일자', '100', 'left', 'str', 'ro', true, 'issuDe', '', '')); /* gf_LocaleTrans('default', 'titIssuDe') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('발급매수', '100', 'right', 'int', 'ro', true, 'issuCnt', '', '')); /* gf_LocaleTrans('default', 'titIssuCnt') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('제증명용도구분:공통코드', '100', 'center', 'str', 'ro', true, 'issuUseprpsSeCode', '', '')); /* gf_LocaleTrans('default', 'titIssuUseprpsSeCode') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('발급용도 내용', '100', 'left', 'str', 'ro', true, 'issuUseprpsCn', '', '')); /* gf_LocaleTrans('default', 'titIssuUseprpsCn') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('제출위치', '100', 'left', 'str', 'ro', true, 'submitLc', '', '')); /* gf_LocaleTrans('default', 'titSubmitLc') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('현재 주소', '100', 'left', 'str', 'ro', true, 'nowAdres', '', '')); /* gf_LocaleTrans('default', 'titNowAdres') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('주민등록번호 마스킹여부', '100', 'center', 'str', 'ro', true, 'ihidnumMaskAt', '', '')); /* gf_LocaleTrans('default', 'titIhidnumMaskAt') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('경력포함여부', '100', 'center', 'str', 'ro', true, 'careerInclsAt', '', '')); /* gf_LocaleTrans('default', 'titCareerInclsAt') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('신청상태코드', '100', 'center', 'str', 'ro', true, 'reqstSttusCode', '', '')); /* gf_LocaleTrans('default', 'titReqstSttusCode') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('출력 허용 매수 : 몇번까지 출력 가능한지', '100', 'right', 'int', 'ro', true, 'outptPermCnt', '', '')); /* gf_LocaleTrans('default', 'titOutptPermCnt') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('출력 허용 일자 : 언제까지 출력 가능한지', '100', 'left', 'str', 'ro', true, 'outptPermDe', '', '')); /* gf_LocaleTrans('default', 'titOutptPermDe') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 문서 번호', '100', 'left', 'str', 'ro', true, 'elctsctDocNo', '', '')); /* gf_LocaleTrans('default', 'titElctsctDocNo') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('전자결재 사원번호', '100', 'center', 'str', 'ro', true, 'elctsctEmpno', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('결재상태', '80', 'center', 'str', 'ro', true, 'elctsctSttusCode', '', '')); /* gf_LocaleTrans('default', 'titElctsctSttusCode') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('부서이름', '100', 'center', 'str', 'ro', true, 'ttmDeptNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    dhxGridMhshrc001HeaderInfo.push(gf_MakeDhxGridHeader('직급이름', '100', 'center', 'str', 'ro', true, 'ttmClsfNm', '', '')); /* gf_LocaleTrans('default', 'titElctsctEmpno') */

    dhxGridMhshrc001 = gf_MakeDhxGrid('dataListMhshrc001', dhxGridMhshrc001HeaderInfo, true, false, false);
    dhxGridMhshrc001.enableAutoWidth(false);
    dhxGridMhshrc001.setEditable(true);

    dhxGridMhshrc001.setColumnMinWidth(40,0); //넓이가 * 인 컬럼의 최소 넓이값 설정 : 최소값, 크기가 * 인 컬럼의 인덱스 
    return true; 
};

var cf_SetEventListenerMhshrc001 = function() {
    // 그리드 이벤트 ==========================================================================================
    var eventId;
    eventIdMhshrc001 = gf_GridDetachEvent(dhxGridMhshrc001, eventIdMhshrc001);
    eventId = dhxGridMhshrc001.attachEvent("onKeyPress",  function(keyCode, ctrl, shift, event_object){
        gf_errorMsgClear();
        if(keyCode == 113) {
            fn_ExcelMhshrc001();
        }else if(keyCode == 13)  {   //ENTER  
            var colNum = dhxGridMhshrc001.getColumnsNum();
            var rowNum = dhxGridMhshrc001.getRowsNum();
            var selectedId = dhxGridMhshrc001.getSelectedRowId();
            var ind        = dhxGridMhshrc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrc001.getRowIndex(selectedId);
            var type       = dhxGridMhshrc001.getColType(ind);
            if(ind == (colNum-1)){ 
                if(rowIndex == (rowNum-1)) { 
                    //첫 행으로 가려면 주석 풀기
                    //dhxGridMhshrc001.selectRow(0);
                    //fn_FindMhshrc001();
                    //rowIndex = 0;
                    return false;
                } else {
                    dhxGridMhshrc001.selectRow(rowIndex + 1);
                    fn_FindMhshrc001();
                    rowIndex = rowIndex + 1;
                }
                ind = 0;
            }
            dhxGridMhshrc001.selectCell(rowIndex, ind+1);
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrc001.editCell();
            }
        }else if(keyCode == 40)  {   // ARROW_DOWN
            var selectedId = dhxGridMhshrc001.getSelectedRowId();
            var ind        = dhxGridMhshrc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrc001.getRowIndex(selectedId);
            var type       = dhxGridMhshrc001.getColType(ind);
            dhxGridMhshrc001.selectCell(rowIndex+1, ind);
            fn_FindMhshrc001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrc001.editCell();
            }
        }else if(keyCode == 38)  {   // ARROW_UP
            var selectedId = dhxGridMhshrc001.getSelectedRowId();
            var ind        = dhxGridMhshrc001.getSelectedCellIndex();
            var rowIndex   = dhxGridMhshrc001.getRowIndex(selectedId);
            var type       = dhxGridMhshrc001.getColType(ind);
            dhxGridMhshrc001.selectCell(rowIndex-1, ind);
            fn_FindMhshrc001();
            if(!(type == "ro" || type == "ron" || type == "rotxt")) {
                dhxGridMhshrc001.editCell();
            }
        }
        else return true;
    });
    eventIdMhshrc001.push(eventId);
    eventId = dhxGridMhshrc001.attachEvent("onBeforeSorting", function(ind, type, direction){  // 정렬  
        return fn_Mhshrc001SortGridList(ind, type, direction); 
    });
    eventIdMhshrc001.push(eventId);
    eventId = dhxGridMhshrc001.attachEvent("onBeforeSelect", function(id, ind){
        return true;
    });
    eventIdMhshrc001.push(eventId);
    eventId = dhxGridMhshrc001.attachEvent("onRowSelect", function(id, ind){
        gf_errorMsgClear();
        fn_FindMhshrc001();
    });
    eventIdMhshrc001.push(eventId);
    eventId = dhxGridMhshrc001.attachEvent("onEditCell", function(stage, rId, cInd, nValue, oValue){
        return true;
    });
    eventIdMhshrc001.push(eventId);
    // 버튼 이벤트 ==========================================================================================
    $('#btnAddMhshrc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_AddMhshrc001()
    });
    $('#btnSaveMhshrc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_SaveMhshrc001();
    });
    $('#btnRemoveMhshrc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_RemoveMhshrc001();
    });
    $('#btnExcelMhshrc001').unbind('click').bind('click', function() {
        gf_errorMsgClear();
        fn_ExcelMhshrc001();
    });
    $('#btnSearchMhshrc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
        fn_SearchMhshrc001('');
    });
    $('#btnResetMhshrc001').unbind("click").bind("click",function() {
        gf_errorMsgClear();
        cf_InitFormMhshrc001();
    });
    // 기타 이벤트 ==========================================================================================
    $('#checkAllMhshrc001').unbind('click').bind('click',function() {
        gf_errorMsgClear();
        gf_DhxCheckAllGridHeader(dhxGridMhshrc001, $('#checkAllMhshrc001').prop('checked'), 'chk');
    });
    $('#searchFormMhshrc001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { $('#btnSearchMhshrc001').click(); event.preventDefault(); return true; } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $("#searchFormMhshrc001 #searchApplyTime").unbind('click').bind('click' , function(event){
    	searchApplyCalendar.show();
    });
    $("#searchFormMhshrc001 .input_calen").unbind('keyup').bind('keyup' , function(event){
    	dateChk($(this));
    });
    $('#saveFormMhshrc001').unbind('click').bind('click', function(event){
        gf_errorMsgClear();
    });
    //사원팝업
	$('#btnSearchEmpCode').unbind('click').bind('click', function(event){
		gf_EmpPopup("searchFormMhshrc001","searchEmpCodeMhshrc001","searchEmpNmMhshrc001",'', "N", null);  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//폼 사원팝업
	$('#btnSaveEmpCode').unbind('click').bind('click', function(event){
		gf_EmpPopup("saveFormMhshrc001","empnoSaveFormMhshrc001","empnmSaveFormMhshrc001",'', "N", "fn_GetClsfAndClsfCode");  // form ID, 사원코드가 들어갈 tag의 ID, 사원명이 들어갈 tag의 ID, 사업장ID, Popup 오픈 시 넘겨받은 검색어로 검색할 지 여부, callback
    });
	//사원 입력 후 Enter 이벤트
	$('#searchEmpCodeMhshrc001').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			//$('#empNm').focus();
			fn_SearchMhsEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrc001', 'searchEmpCodeNm', '', 'text');
		}
    });
	$('#searchEmpNmMhshrc001').unbind('keydown').bind('keydown',function(event) {
		if (event.keyCode == 13)  {
			fn_SearchMhsEmpCode();
	    }
		else if(event.keyCode != 13 && event.keyCode != 9){
			gf_FormSetValue('searchFormMhshrc001', 'searchEmpNo', '', 'text');
		}
    });
    // 폼 이벤트 start ==========================================================================================
    $('#saveFormMhshrc001 input, select, button, textarea').unbind('keypress').bind('keypress',function() { 
        if(event.charCode == 13) { return gf_saveForm_NextEle("saveFormMhshrc001",this); } //if(this.id == "bizcndSaveFormMhshrb000") 으로 걸러서 별도 처리  
        else return true; 
    }); 
    $('#saveFormMhshrc001 input[name="issuno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuno', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="elctsctSeSn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'elctsctSeSn', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="empno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'empno', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="empnm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'empnm', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="ttmDeptNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'ttmDeptNm', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="ttmClsfNm"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'ttmClsfNm', $(this).val());
    });
    $('#saveFormMhshrc001 select[name="crtfKindCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() == '' || $(this).val() == null){
        	gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'crtfKindCode', '');
        	gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'crtfKindCodeNm', '');
        }
        else{
        	gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'crtfKindCode', $("#saveFormMhshrc001 select[name='crtfKindCode'] option:selected").val());
        	gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'crtfKindCodeNm', $("#saveFormMhshrc001 select[name='crtfKindCode'] option:selected").text());
        }
    });
    $('#saveFormMhshrc001 input[name="issuReqstDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuReqstDe', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="issuDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuDe', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="issuCnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuCnt', $(this).val());
    });
    $('#saveFormMhshrc001 select[name="issuUseprpsSeCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        if($(this).val() == null || $(this).val() == ''){
        	gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuUseprpsSeCode', '');
        	gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuUseprpsSeCodeNm', '');
        }
        else{
        	gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuUseprpsSeCode', $("#saveFormMhshrc001 select[name='issuUseprpsSeCode'] option:selected").val());
        	gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuUseprpsSeCodeNm', $("#saveFormMhshrc001 select[name='issuUseprpsSeCode'] option:selected").text());
        }
    });
    $('#saveFormMhshrc001 input[name="issuUseprpsCn"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'issuUseprpsCn', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="submitLc"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'submitLc', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="nowAdres"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'nowAdres', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="ihidnumMaskAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormMhshrc001', 'ihidnumMaskAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'ihidnumMaskAt', val);
    });
    $('#saveFormMhshrc001 input[name="careerInclsAt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        var val = gf_IsNull(gf_FormGetValue('saveFormMhshrc001', 'careerInclsAt', 'chkbox'))? '0' : '1';
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'careerInclsAt', val);
    });
    $('#saveFormMhshrc001 input[name="reqstSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'reqstSttusCode', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="outptCnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'outptCnt', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="outptPermCnt"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'outptPermCnt', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="outptPermDe"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'outptPermDe', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="elctsctDocNo"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'elctsctDocNo', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="elctsctSttusCode"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'elctsctSttusCode', $(this).val());
    });
    $('#saveFormMhshrc001 input[name="elctsctEmpno"]').unbind('change blur').bind('change blur',function() {
        gf_errorMsgClear();
        gf_DhxGridCellMapping(dhxGridMhshrc001, dhxDataProcessorMhshrc001, 'elctsctEmpno', $(this).val());
    });
    // 폼 이벤트 end ============================================================================================
    // 자동완성 OFF =========================================================================================
    $('#searchFormMhshrc001').attr("autocomplete" , "off");
    $('#saveFormMhshrc001').attr("autocomplete" , "off");
};

var cf_InitFormMhshrc001 = function() {
    $('#searchFormMhshrc001').resetForm();
    
    if("PUBMNG000" == gv_SecondLvlMenuId){
    	gf_FormSetValue("searchFormMhshrc001", "searchEmpNo", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormMhshrc001", "searchEmpCodeNm", sessionUserEmpnm , '');
    }
};

var cf_SetBindingMhshrc001 = function() {
//    fn_FormDisabled(true);  //처음부터  disabled 하려면 true로 변경 
    fn_SearchMhshrc001('');
    fn_SessionCheck();
};
/******************************************************************************************************************************
 *                                                     <함수 구현 부분>
 *  !! 페이지가 길어지면 유지보수 담당 개발자는 죽으라는 뜻입니다. 200라인 이상 초과시에는 먼가 붎필요한 로직이 반복되거나 공통함수를 많이 쓰지 않기 때문입니다.
 *  이럴 경우 파일을 화면에 따른 기능별로 분리하든지, 공통 함수를 최대한 많이 사용하여 라인수를 줄입시다. 소스는 깔끔하게 탭을 공백4자리로 잡아 인텐테이션을 맞춥시다.!!
 ******************************************************************************************************************************/
// 저장 폼 사원 선택 후 이벤트
var fn_GetClsfAndClsfCode = function(data){
	gf_FormSetValue("saveFormMhshrc001", "ttmClsfNm", data.clsfCodeNm , 'text');
	gf_FormSetValue("saveFormMhshrc001", "ttmDeptNm", data.deptCodeNm , 'text');
}
//--사원 입력 후 Enter 이벤트
function fn_SearchMhsEmpCode(){
	var jsonParameter = {
			empno : gf_FormGetValue('searchFormMhshrc001', 'searchEmpNo', 'text'),
		    korNm : gf_FormGetValue('searchFormMhshrc001', 'searchEmpCodeNm', 'text'),
	};
	gf_Transaction("", 'emp/searchEmp', jsonParameter, 'fn_CallbackSearchEmpCode', false, 'GET');
}

function fn_CallbackSearchEmpCode (strSvcID, targetID, data){
	
	var totCnt = data.data.records.length;
	
 	if(!gf_IsNull(data.data.records) && totCnt == 1){
	  	//단건
	  	var data = data.data.records[0];
 		gf_FormSetValue('searchFormMhshrc001', 'searchEmpNo', data.empno, 'text');
 		gf_FormSetValue('searchFormMhshrc001', 'searchEmpCodeNm', data.korNm, 'text');
 	} else {
	  	//Popup 호출
  		gf_EmpPopup("searchFormMhshrc001","searchEmpCodeMhshrc001","searchEmpNmMhshrc001", '' , "N", null);
  	}
}
/**
 * 조회
 */
var fn_SearchMhshrc001 = function(userId) {
    var jsonParameter = {
        sRegDt : gf_FormGetValue('searchFormMhshrc001', 'searchApplyBeginTime', 'text'),
        eRegDt : gf_FormGetValue('searchFormMhshrc001', 'searchApplyEndTime', 'text'),
        empno : gf_FormGetValue('searchFormMhshrc001', 'searchEmpNo', 'text'),
        crtfKindCode : gf_FormGetValue('searchFormMhshrc001', 'searchCrtfKindCode', 'combo'),
        elctsctSttusCode : gf_FormGetValue('searchFormMhshrc001', 'searchElctsctSttusCode', 'combo')
    };
    gf_Transaction(userId, 'mhshrc001/searchMhshrc001', jsonParameter, 'fn_CallbackSearchMhshrc001', false, 'GET');
};

var fn_CallbackSearchMhshrc001 = function(strSvcID, targetID, data) {
    //dhxGridMhshrc001.clearAll();
    dhxGridMhshrc001.destructor();
    if(cf_SetComponentsMhshrc001()){ 
        fn_DhxDataProcessorMhshrc001(); 
        if(!gf_IsNull(data.data.records)){
            gf_NoFoundDataOnGridMsgRemove('dataListMhshrc001');
            dhxGridMhshrc001.parse(data.data.records, 'js');
 
            if(save_Row_Num_Mhshrc001 == 0 && save_All_Sta_Mhshrc001 == 0){  //0번이고, 신규/삭제 없음 = 최초 
                dhxGridMhshrc001.selectRow(0); 
            } else if(save_Row_Sta_Mhshrc001 == "deleted") {                 // 최초 아니고, 기존 선택 상태가 삭제 행임 
                dhxGridMhshrc001.selectRow(0);
            } else if(save_All_Sta_Mhshrc001 == 0) {                         // 최초 아니고, 신규/삭제 없음 = 수정만
                dhxGridMhshrc001.selectRow(save_Row_Num_Mhshrc001); 
            } else {                                                         // 최초 아니고, 신규/삭제 있음 - ID 찾아가야 함 
                dhxGridMhshrc001.selectRow(save_Row_Num_Mhshrc001);   //개발자 수정 필요  
                //var findCell = dhxGridMhshrc001.findCell(save_Row_Ids_Mhshrc001, gf_GetDhxGridColumId(dhxGridMhshrc001,'empno'), true);  //개발자 수정 필요, 필요한 key 찾아가도록 
                //if(!gf_IsNull(findCell)) { 
                //    dhxGridMhshrc001.selectRowById(findCell[0][0]); 
                //} else { 
                //    dhxGridMhshrc001.selectRow(0);
                //} 
            } 
 
            fn_FindMhshrc001();
        } else {
            gf_NoFoundDataOnGridMsg('dataListMhshrc001');
            fn_InitInputFormMhshrc001();
            fn_FormDisabled(true);
        }
        $("#spanCntSearchFormMhshrc001").text(data.data.records.length);
        cf_SetEventListenerMhshrc001();
    } 
};
var fn_DhxDataProcessorMhshrc001 = function() {
    // 그리드입력 데이터프로세스 정의
    dhxDataProcessorMhshrc001 = new dataProcessor(gv_ContextPath+'/mhshrc001/saveMhshrc001'); //lock feed url
    dhxDataProcessorMhshrc001.setTransactionMode('POST', true); //GET|POST|REST|JSON, TRUE (한번에 전송 )
    dhxDataProcessorMhshrc001.setUpdateMode("off", false); // 데이터 저장을 트리거 할 동작을 정의합니다
    dhxDataProcessorMhshrc001.init(dhxGridMhshrc001); //link dataprocessor to the grid
    dhxDataProcessorMhshrc001.enableDataNames(true); //c0~ cN 기본 이름을  기본 이름을 Grid의 열 ID로 변경
    dhxDataProcessorMhshrc001.styles = {
                    updated:        "font-weight:normal;text-decoration:none;",
                    inserted:       "font-weight:bold; color:green;",
                    deleted:        "color:orange; text-decoration:line-through;",
                    invalid:        "color:green; text-decoration:underline;",
                    error:          "color:blue; text-decoration:underline;",
                    clear:          "font-weight:normal;text-decoration:none;"
    };
    dhxDataProcessorMhshrc001.attachEvent("onAfterUpdate", function(id, action, tid, dataSource){
            if(dataSource.code == "999" && !gf_IsNull(dataSource.message)){ 
                if(!gf_IsNull(dataSource.methodNm)){ 
                    gf_DivMsgAlert(dataSource.message + " Method 명 : " + dataSource.methodNm); 
                } else { 
                    gf_DivMsgAlert(dataSource.message); 
                } 
                return false;
           } else if (dataSource.code == "000" || dataSource.data.code !== "000"){
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgSave'));
                    fn_SearchMhshrc001();
                    $("#checkAllMhshrc001").prop('checked', false); //상단 체크박스 해제
                    return true;
            } else {
                    gf_DivMsgAlert(gf_LocaleTrans('default','msgFail'));
                    return false;
            }
    });
};
/**
 * 상세조회
 */
var fn_FindMhshrc001 = function() {
    var rId = dhxGridMhshrc001.getSelectedRowId();
    var status = dhxDataProcessorMhshrc001.getState(rId);

    var ihidnumMaskAt = gf_DhxGetValue(dhxGridMhshrc001, rId, 'ihidnumMaskAt',  'grid');
    var careerInclsAt = gf_DhxGetValue(dhxGridMhshrc001, rId, 'careerInclsAt',  'grid');
    
    if(ihidnumMaskAt == "1") gf_FormSetValue("saveFormMhshrc001", "ihidnumMaskAt", ihidnumMaskAt , 'chkbox');
    else $('#saveFormMhshrc001 #ihidnumMaskAtSaveFormMhshrc001').attr("checked" , false);
    
    if(careerInclsAt == "1") gf_FormSetValue("saveFormMhshrc001", "careerInclsAt", careerInclsAt , 'chkbox');
    else $('#saveFormMhshrc001 #careerInclsAtSaveFormMhshrc001').attr("checked" , false);

    gf_FormSetValue("saveFormMhshrc001", "issuno", gf_DhxGetValue(dhxGridMhshrc001, rId, 'issuno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "elctsctSeSn", gf_DhxGetValue(dhxGridMhshrc001, rId, 'elctsctSeSn',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "empno", gf_DhxGetValue(dhxGridMhshrc001, rId, 'empno',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "empnm", gf_DhxGetValue(dhxGridMhshrc001, rId, 'empnm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "ttmDeptNm", gf_DhxGetValue(dhxGridMhshrc001, rId, 'ttmDeptNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "ttmClsfNm", gf_DhxGetValue(dhxGridMhshrc001, rId, 'ttmClsfNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "crtfKindCode", gf_DhxGetValue(dhxGridMhshrc001, rId, 'crtfKindCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrc001", "issuReqstDe", gf_DhxGetValue(dhxGridMhshrc001, rId, 'issuReqstDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "issuDe", gf_DhxGetValue(dhxGridMhshrc001, rId, 'issuDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "issuCnt", gf_DhxGetValue(dhxGridMhshrc001, rId, 'issuCnt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "issuUseprpsSeCode", gf_DhxGetValue(dhxGridMhshrc001, rId, 'issuUseprpsSeCode',  'grid'), 'combo');
    gf_FormSetValue("saveFormMhshrc001", "issuUseprpsCn", gf_DhxGetValue(dhxGridMhshrc001, rId, 'issuUseprpsCn',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "submitLc", gf_DhxGetValue(dhxGridMhshrc001, rId, 'submitLc',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "nowAdres", gf_DhxGetValue(dhxGridMhshrc001, rId, 'nowAdres',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "reqstSttusCode", gf_DhxGetValue(dhxGridMhshrc001, rId, 'reqstSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "outptCnt", gf_DhxGetValue(dhxGridMhshrc001, rId, 'outptCnt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "outptPermCnt", gf_DhxGetValue(dhxGridMhshrc001, rId, 'outptPermCnt',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "outptPermDe", gf_DhxGetValue(dhxGridMhshrc001, rId, 'outptPermDe',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "elctsctDocNo", gf_DhxGetValue(dhxGridMhshrc001, rId, 'elctsctDocNo',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "elctsctSttusCode", gf_DhxGetValue(dhxGridMhshrc001, rId, 'elctsctSttusCode',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "elctsctSttusCodeNm", gf_DhxGetValue(dhxGridMhshrc001, rId, 'elctsctSttusCodeNm',  'grid'), '');
    gf_FormSetValue("saveFormMhshrc001", "elctsctEmpno", gf_DhxGetValue(dhxGridMhshrc001, rId, 'elctsctEmpno',  'grid'), '');

    fn_FormDisabled(false);

    if(status == 'inserted') {
        $('#saveFormMhshrc001 input[name="issuno"]').prop('disabled', false);
        $('#saveFormMhshrc001 input[name="elctsctSeSn"]').prop('disabled', false);
    } else {
        $('#saveFormMhshrc001 input[name="issuno"]').prop('disabled', true);
        $('#saveFormMhshrc001 input[name="elctsctSeSn"]').prop('disabled', true);
    }
};
$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="searchTime_cal" || e.target.id =="searchApplyBeginTimeMhshrc001" || e.target.id =="searchApplyEndTimeMhshrc001") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
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
        $('#searchApplyBeginTimeMhshrc001').val(dateFormat(searchApplyCalendar.leftCalendar.getDate()));
        $('#searchApplyEndTimeMhshrc001').val(dateFormat(searchApplyCalendar.rightCalendar.getDate()));
    });
    searchApplyCalendar.leftCalendar.loadUserLanguage("ko"); 
    searchApplyCalendar.rightCalendar.loadUserLanguage("ko");
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
    	gf_FormSetValue("searchFormMhshrc001", "searchEmpNo", sessionUserEmpno , '');
    	gf_FormSetValue("searchFormMhshrc001", "searchEmpCodeNm", sessionUserEmpnm , '');
    }
}
/**
 * 입력폼 초기화
 */
var fn_InitInputFormMhshrc001 = function() {
    $('#saveFormMhshrc001 input[name="issuno"]').prop('disabled', false);
    $('#saveFormMhshrc001 input[name="elctsctSeSn"]').prop('disabled', false);
    $('#saveFormMhshrc001').resetForm();
};
/**
 * 폼 엘리먼트 무력화
 */
var fn_FormDisabled = function(status) {
//    $('#saveFormMhshrc001 *').prop('disabled', status);
	$('#saveFormMhshrc001 #divComboSaveElctsctSttusCode').prop('disabled', status);
	$('#saveFormMhshrc001 #divComboSaveCrtfKindCode').prop('disabled', status);
	$('#saveFormMhshrc001 #divComboSaveIssuUseprpsSeCode').prop('disabled', status);
	$('#saveFormMhshrc001 #issuCntSaveFormMhshrc001').prop('disabled', status);
	$('#saveFormMhshrc001 #submitLcSaveFormMhshrc001').prop('disabled', status);
	$('#saveFormMhshrc001 #issuUseprpsCnSaveFormMhshrc001').prop('disabled', status);
	$('#saveFormMhshrc001 #ihidnumMaskAtSaveFormMhshrc001').prop('disabled', status);
	$('#saveFormMhshrc001 #careerInclsAtSaveFormMhshrc001').prop('disabled', status);
	
    if("PUBMNG000" == gv_SecondLvlMenuId){}
    else{
    	$("#searchFormMhshrc001 #searchEmpCodeMhshrc001").attr("readonly" , false);
    	$("#searchFormMhshrc001 #searchEmpNmMhshrc001").attr("readonly" , false);
    	$("#searchFormMhshrc001 #btnSearchEmpCode").attr("disabled" , false);
    	$("#saveFormMhshrc001 #btnSaveEmpCode").attr("readonly" , status);
    	var rId = dhxGridMhshrc001.getSelectedRowId();
    	var issuno = gf_DhxGetValue(dhxGridMhshrc001, rId, 'issuno',  'grid');
    	if(gf_IsNull(issuno)){
    		$("#saveFormMhshrc001 #btnSaveEmpCode").attr("disabled" , false);
    	}
    	else{
    		$("#saveFormMhshrc001 #btnSaveEmpCode").attr("disabled" , true);
    	}
    }
};
/**
 * 추가(신규) 
 */
var fn_AddMhshrc001 = function() {
	var today = new Date();   
	var year = today.getFullYear(); // 년도
	var month = today.getMonth() + 1;  // 월
	var date = today.getDate();  // 날짜
	month = (month < 10) ? "0" + month : month; 
	date =(date < 10) ? "0" + date : date; 
    dhxGridMhshrc001.clearSelection();
    fn_InitInputFormMhshrc001();
    var initValueArr = [];
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(sessionUserEmpnm); 
    initValueArr.push(year + "-" + month + "-" + date); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push('');
    
    initValueArr.push(sessionUserEmpno);
    initValueArr.push('');
    initValueArr.push('');
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push(''); 
    initValueArr.push('');
    initValueArr.push('');
    initValueArr.push('');
    initValueArr.push('');
    initValueArr.push(sessionUserDeptNm);
    initValueArr.push(sessionUserClsfNm);
    dhxGridMhshrc001.addRow(dhxGridMhshrc001.uid(), initValueArr, 0);
    dhxGridMhshrc001.selectRow(0);
    gf_NoFoundDataOnGridMsgRemove('dataListMhshrc001');
    $('#btnPopEmpSearchMhshrc001').show();
    fn_FindMhshrc001();
    fn_FormDisabled(false);
}
/**
 * 메인 그리드 정렬변경(헤더클릭) 시 정렬변경
 */
var fn_Mhshrc001SortGridList = function(ind, type, direction){ 
    if(ind != gf_GetDhxGridColumId(dhxGridMhshrc001, 'num')){ 
        var sortOrder = gf_FormGetValue('searchFormMhshrc001', 'sortDirection', 'text'); 
        var sortColumId = gf_FormGetValue('searchFormMhshrc001', 'sortColumId', 'text');
        var nowSortColumId = gf_GetDhxGridColum(dhxGridMhshrc001, ind);
        // 정렬 컬럼이 바뀌면 정렬방식 초기화 
        if(direction == "des"){ 
            dhxGridMhshrc001.setSortImgState(true, ind, 'des'); 
            gf_FormSetValue('searchFormMhshrc001', 'sortDirection', 'des', 'text');
            gf_FormSetValue('searchFormMhshrc001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrc001, ind), 'text'); 
        } else if(sortColumId == nowSortColumId && sortOrder == 'des' ) {  
            dhxGridMhshrc001.setSortImgState(false); 
            gf_FormSetValue('searchFormMhshrc001', 'sortDirection', '', 'text');
            gf_FormSetValue('searchFormMhshrc001', 'sortColumId', '', 'text'); 
            dhxGridMhshrc001.sortRows(0,"int","asc");  //번호로 강제 정렬 
            return false; 
        } else { 
            dhxGridMhshrc001.setSortImgState(true, ind, 'asc'); 
            gf_FormSetValue('searchFormMhshrc001', 'sortDirection', 'asc', 'text');
            gf_FormSetValue('searchFormMhshrc001', 'sortColumId', gf_GetDhxGridColum(dhxGridMhshrc001, ind), 'text'); 
        } 
        //재조회 필요 화면에서는 조회 함수 호출 
        return true; 
    }
    return false; 
};
/**
 * 입력데이터 서버 전송
 */
var fn_SaveMhshrc001 = function() {
    var edCnt = 0;
    save_Add_Cnt_Mhshrc001 = 0; 
    save_Edt_Cnt_Mhshrc001 = 0; 
    save_Del_Cnt_Mhshrc001 = 0; 
    dhxGridMhshrc001.forEachRow(function(rowId) {
        if(!gf_IsNull(dhxDataProcessorMhshrc001.getState(rowId))) {
            edCnt++;
        
            var state = dhxDataProcessorMhshrc001.getState(rowId); 
            if(state == 'deleted') { 
                save_Del_Cnt_Mhshrc001 += 1; 
            } else if(state == 'inserted') { 
                save_Add_Cnt_Mhshrc001 += 1; 
            } else if(state == 'updated') { 
                save_Edt_Cnt_Mhshrc001 += 1; 
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
        save_All_Sta_Mhshrc001 = 0; 
        if(save_Add_Cnt_Mhshrc001 > 0){
            confirmMsg1 = "신규 " + save_Add_Cnt_Mhshrc001 + "건";
            save_All_Sta_Mhshrc001 = 1; 
        } 
        if(save_Edt_Cnt_Mhshrc001 > 0){ 
            confirmMsg2 = "수정 " + save_Edt_Cnt_Mhshrc001 + "건"; 
        } 
        if(save_Del_Cnt_Mhshrc001 > 0){ 
            confirmMsg3 = "삭제 " + save_Del_Cnt_Mhshrc001 + "건"; 
            save_All_Sta_Mhshrc001 = 1; 
        } 
        if(confirmMsg1 != "" && (confirmMsg2 != "" || confirmMsg3 != "")){ 
            confirmMsg1 = confirmMsg1 + ", ";
        }
        if(confirmMsg2 != "" && confirmMsg3 != ""){
            confirmMsg2 = confirmMsg2 + ", ";
        }
        confirmMsg = confirmMsg1 + confirmMsg2 + confirmMsg3 + "<br>" + "저장하시겠습니까?";
        
        //if(confirmModalMhshrc001(gv_QueSave)){  //여기는 안옴 
        if(confirmModalMhshrc001(confirmMsg)){  //여기는 안옴 
        } else { 
            return false;  //반드시 있어야 함. 없으면 그냥 아래로 흐름 
        } 
    }
}
var confirmModalMhshrc001 = function (msg) { 
    var result = false; 
    gf_DivMsgConfirm2(msg, function(confirm){ 
        if(confirm){ 
            result = true;
            fn_SaveMhshrc001_Send(); 
        }else{ 
            result = false; 
        } 
    }); 
    return result; 
} 
var fn_SaveMhshrc001_Send = function() {
    if(fn_GridValidation(dhxGridMhshrc001, dhxDataProcessorMhshrc001)) {
        dhxDataProcessorMhshrc001.sendData();
    }
}
/**
 * 삭제
 */
var fn_RemoveMhshrc001 = function() {
    var rowIds = gf_GetCheckedGridRowIdArr(dhxGridMhshrc001, 'chk');
    if(gf_IsNull(rowIds)) {
        gf_DivMsgAlert('삭제할 로우를 선택해 주세요.');
        return false;
    } else {
        var state;
        dhxGridMhshrc001.forEachRow(function(rowId) {
            state = dhxDataProcessorMhshrc001.getState(rowId);
            if(dhxGridMhshrc001.cells(rowId, gf_GetDhxGridColumId(dhxGridMhshrc001, 'chk')).isChecked()){
                if(state == 'inserted') {
                    var rowNum = dhxGridMhshrc001.getRowIndex(rowId);
                    dhxGridMhshrc001.deleteRow(rowId);
                    dhxGridMhshrc001.selectRow(rowNum);
                    fn_FindMhshrc001();
                }
                else dhxDataProcessorMhshrc001.setUpdated(rowId, true, 'deleted');
            }
        });
    }
}
/**
 * 엑셀다운로드
 */
var fn_ExcelMhshrc001 = function () {
    var titMhshrc001 = '증명서신청/출력'; /* gf_LocaleTrans('default', 'titMhshrc001') */
    var jsonParameter = {
        issuno : gf_FormGetValue('searchFormMhshrc001', 'issuno', 'text'),
        elctsctSeSn : gf_FormGetValue('searchFormMhshrc001', 'elctsctSeSn', 'text')
    };
    var header = [[
        '발급번호 : 증명서신청번호 자동 체번 사용' /* gf_LocaleTrans('default', 'titIssuno') */,
        '전자결재 구분 순번' /* gf_LocaleTrans('default', 'titElctsctSeSn') */,
        '사원번호' /* gf_LocaleTrans('default', 'titEmpno') */,
        '당시부서명' /* gf_LocaleTrans('default', 'titTtmDeptNm') */,
        '당시 직급명' /* gf_LocaleTrans('default', 'titTtmClsfNm') */,
        '증명서종류코드' /* gf_LocaleTrans('default', 'titCrtfKindCode') */,
        '발급신청일자' /* gf_LocaleTrans('default', 'titIssuReqstDe') */,
        '발급일자' /* gf_LocaleTrans('default', 'titIssuDe') */,
        '발금매수' /* gf_LocaleTrans('default', 'titIssuCnt') */,
        '제증명용도구분:공통코드(MHS245)' /* gf_LocaleTrans('default', 'titIssuUseprpsSeCode') */,
        '발급용도 내용' /* gf_LocaleTrans('default', 'titIssuUseprpsCn') */,
        '제출위치' /* gf_LocaleTrans('default', 'titSubmitLc') */,
        '현재 주소' /* gf_LocaleTrans('default', 'titNowAdres') */,
        '주민등록번호 마스킹여부' /* gf_LocaleTrans('default', 'titIhidnumMaskAt') */,
        '경력포함여부' /* gf_LocaleTrans('default', 'titCareerInclsAt') */,
        '신청상태코드' /* gf_LocaleTrans('default', 'titReqstSttusCode') */,
        '출력회수' /* gf_LocaleTrans('default', 'titOutptCnt') */,
        '출력 허용 매수 : 몇번까지 출력 가능한지' /* gf_LocaleTrans('default', 'titOutptPermCnt') */,
        '출력 허용 일자 : 언제까지 출력 가능한지' /* gf_LocaleTrans('default', 'titOutptPermDe') */,
        '전자결재 문서 번호' /* gf_LocaleTrans('default', 'titElctsctDocNo') */,
        '전자결재 상태 코드' /* gf_LocaleTrans('default', 'titElctsctSttusCode') */,
        '전자결재 사원번호' /* gf_LocaleTrans('default', 'titElctsctEmpno') */
    ]];
    var dataId = [[ 'issuno', 'elctsctSeSn', 'empno', 'ttmDeptNm', 'ttmClsfNm', 'crtfKindCode', 'issuReqstDe', 'issuDe', 'issuCnt', 'issuUseprpsSeCode', 'issuUseprpsCn', 'submitLc', 'nowAdres', 'ihidnumMaskAt', 'careerInclsAt', 'reqstSttusCode', 'outptCnt', 'outptPermCnt', 'outptPermDe', 'elctsctDocNo', 'elctsctSttusCode', 'elctsctEmpno' ]];
    var dataAlign = [[ 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center' ]];
    var sheetNm = [[ titMhshrc001 ]];
    var param = [[ $.param( jsonParameter ) ]];
    var fileNm = titMhshrc001;
    jsonParameter = {
        headers : header,
        dataIds : dataId,
        dataAligns : dataAlign,
        sheetNms : sheetNm,
        fileNm : fileNm,
        params : param
    };
    gf_ExcelDown('mhshrc001/excelMhshrc001', jsonParameter);
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
    $('#saveFormMhshrc001 #issunoSaveFormMhshrc001').parent().append(
    '<div class="error" id="issunoSaveFormMhshrc001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
    $('#saveFormMhshrc001 #elctsctSeSnSaveFormMhshrc001').parent().append(
    '<div class="error" id="elctsctSeSnSaveFormMhshrc001-error" onclick="$(this).remove()">동일한 Key가 존재합니다.</div>'
    );
}
/**
 * 그리드 validation
 */
var fn_GridValidation = function(dhxGridObjet, dhxDataProcessor){
    var state;
    var valid;
    var validFalseFistRowId;
    var validFalseDuplicationKey;
    var rowIds = dhxGridObjet.getSelectedRowId();  //현재행 ID 
    var rowNum = dhxGridObjet.getRowIndex(rowIds); //현재행번호 
    save_Row_Sta_Mhshrc001 = dhxDataProcessor.getState(rowIds); //현재행상태 
    if(save_Row_Sta_Mhshrc001 == 'deleted') {
        save_Row_Num_Mhshrc001 = 0;
        save_Row_Ids_Mhshrc001 = "";
    } else if(save_Row_Sta_Mhshrc001 == 'inserted') {
        save_Row_Num_Mhshrc001 = rowNum;
        save_Row_Ids_Mhshrc001 = "";  //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'korNm', 'grid') 
    } else {   // updated 포함 
        save_Row_Num_Mhshrc001 = rowNum;
        save_Row_Ids_Mhshrc001 = "";   //개발자 수정 필요  gf_DhxGetValue(dhxGridObjet, rowIds, 'empno', 'grid') 
    } 
    dhxGridObjet.forEachRow(function(rowId) {
    	valid = true;
        state = dhxDataProcessor.getState(rowId);
        if(!gf_IsNull(state)) {
            if(state != 'deleted') {
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empno', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empno');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'empnm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'empnm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'crtfKindCodeNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'crtfKindCodeNm');
                    valid = false;
                }
                if(!gv_ValidateMethods.required( gf_DhxGetValue(dhxGridObjet, rowId, 'issuUseprpsSeCodeNm', 'grid') )){
                    fn_GridValidationSelectCell(dhxGridObjet, dhxDataProcessor, rowId, 'issuUseprpsSeCodeNm');
                    valid = false;
                }
                //gf_Trace('rowId=['+rowId+'], state=['+state+'], valid=['+valid+']');
                if(!valid && gf_IsNull(validFalseFistRowId)) {
                    validFalseFistRowId = rowId;
                }
            }
        }
    });
    //gf_Trace('validFalseDuplicationKey=['+validFalseDuplicationKey+'], validFalseFistRowId=['+validFalseFistRowId+']');
    if(!gf_IsNull(validFalseFistRowId)) {
        dhxGridMhshrc001.selectRowById(validFalseFistRowId);
        fn_FindMhshrc001();
        fn_FormValidation(validFalseFistRowId);
        if(!gf_IsNull(validFalseDuplicationKey)) fn_JqueryValidationToolTipForDuplicationKey();
    }
    if(gf_IsNull(validFalseDuplicationKey) && gf_IsNull(validFalseFistRowId)) return true;
    else return false;
}
var fn_FormValidation =  function(rowId){
    var state = dhxDataProcessorMhshrc001.getState(rowId);
    if(!gf_IsNull(rowId)) {
        if(state != 'deleted') {
            if($('#saveFormMhshrc001').validate().form()){
                if(state == 'inserted') {
                    var issuno = gf_FormGetValue('saveFormMhshrc001', 'issuno', 'text');
                    var elctsctSeSn = gf_FormGetValue('saveFormMhshrc001', 'elctsctSeSn', 'text');
                    if(fn_CheckDupMhshrc001(issuno, elctsctSeSn)) return true;
                    else return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return true;
    }
}
/**
 * 중복데이터 db 체크
 */
var fn_CheckDupMhshrc001 = function(issuno, elctsctSeSn){
    if(!gf_IsNull(issuno) && !gf_IsNull(elctsctSeSn)) {
        var jsonParameter = {
            issuno : issuno,
            elctsctSeSn : elctsctSeSn
        };
        var dataSource = gf_NoAsyncTransaction('mhshrc001/findMhshrc001', jsonParameter, 'GET');
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

